// GitGalaxy - Infinite Neon Runner Game Engine
import { generateQuestions } from './levels.js';

export class RunnerGame {
  constructor(canvas, onAnswer, onGameOver, onCombo) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.onAnswer = onAnswer;
    this.onGameOver = onGameOver;
    this.onCombo = onCombo;
    this.running = false;
    this.animFrame = null;
    this.lastTime = 0;
    
    // Player
    this.player = { x: 0, y: 0, lane: 1, targetLane: 1, width: 30, height: 40, jumpY: 0, jumping: false };
    this.lanes = [0.25, 0.5, 0.75];
    
    // Game state
    this.speed = 3;
    this.baseSpeed = 3;
    this.lives = 3;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.flowState = false;
    this.distance = 0;
    
    // Obstacles / Questions
    this.questions = [];
    this.currentQuestion = null;
    this.questionTimer = 0;
    this.questionTimeout = 5000;
    this.obstacles = [];
    this.particles = [];
    this.pipeSegments = [];
    this.answeredCount = 0;
    this.correctCount = 0;
    
    // Visual
    this.scanlineOffset = 0;
    this.shakeAmount = 0;
    this.flashColor = null;
    this.flashAlpha = 0;
    this.glitchTimer = 0;
    
    // Pipeline segments
    for (let i = 0; i < 20; i++) {
      this.pipeSegments.push({ z: i * 100, x: Math.random() * 0.4 - 0.2 });
    }
    
    this.bindInputs();
  }

  bindInputs() {
    this._keyHandler = (e) => {
      if (!this.running) return;
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        this.switchLane(-1);
        e.preventDefault();
      }
      if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        this.switchLane(1);
        e.preventDefault();
      }
      if (e.key >= '1' && e.key <= '4' && this.currentQuestion) {
        this.answerQuestion(parseInt(e.key) - 1);
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', this._keyHandler);
    
    // Touch
    let touchStartX = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    this.canvas.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 30) {
        this.switchLane(dx > 0 ? 1 : -1);
      }
    }, { passive: true });
  }

  destroy() {
    document.removeEventListener('keydown', this._keyHandler);
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  switchLane(dir) {
    this.player.targetLane = Math.max(0, Math.min(2, this.player.targetLane + dir));
  }

  startLevel(commands, difficulty = 1) {
    this.questions = generateQuestions(commands);
    this.lives = 3;
    this.score = 0;
    this.combo = 0;
    this.maxCombo = 0;
    this.flowState = false;
    this.distance = 0;
    this.answeredCount = 0;
    this.correctCount = 0;
    this.speed = this.baseSpeed + difficulty * 0.3;
    this.questionTimeout = Math.max(3000, 6000 - difficulty * 200);
    this.obstacles = [];
    this.particles = [];
    this.currentQuestion = null;
    this.questionTimer = 0;
    this.player.lane = 1;
    this.player.targetLane = 1;
    this.player.jumpY = 0;
    this.flashColor = null;
    this.flashAlpha = 0;
    this.shakeAmount = 0;
    this.glitchTimer = 0;
    this.questionQueue = [...this.questions];
    this.spawnTimer = 0;
    this.spawnInterval = Math.max(1500, 3000 - difficulty * 100);
    this.running = true;
    this.lastTime = performance.now();
    this.loop();
  }

  stop() {
    this.running = false;
    if (this.animFrame) cancelAnimationFrame(this.animFrame);
  }

  answerQuestion(index) {
    if (!this.currentQuestion) return;
    const q = this.currentQuestion;
    const correct = q.answers[index] === q.correct;
    this.answeredCount++;
    
    if (correct) {
      this.correctCount++;
      this.combo++;
      if (this.combo > this.maxCombo) this.maxCombo = this.combo;
      this.score += 100 * (1 + this.combo * 0.5);
      this.spawnCorrectParticles();
      this.flashColor = '#00f5ff';
      this.flashAlpha = 0.3;
      
      if (this.combo >= 5 && !this.flowState) {
        this.flowState = true;
        this.onCombo && this.onCombo('flow', true);
      }
      this.onAnswer && this.onAnswer(true, this.score, this.combo);
    } else {
      this.combo = 0;
      this.lives--;
      this.shakeAmount = 10;
      this.glitchTimer = 300;
      this.flashColor = '#ff2d55';
      this.flashAlpha = 0.4;
      if (this.flowState) {
        this.flowState = false;
        this.onCombo && this.onCombo('flow', false);
      }
      this.onAnswer && this.onAnswer(false, this.score, this.combo);
      
      if (this.lives <= 0) {
        this.running = false;
        setTimeout(() => {
          this.onGameOver && this.onGameOver(this.score, this.correctCount, this.answeredCount, this.maxCombo);
        }, 500);
      }
    }
    this.currentQuestion = null;
  }

  spawnCorrectParticles() {
    const cx = this.canvas.width / 2;
    const cy = this.canvas.height * 0.6;
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: cx, y: cy,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        color: this.flowState ? '#f5a623' : '#00f5ff',
        size: 2 + Math.random() * 4
      });
    }
  }

  loop() {
    if (!this.running) return;
    const now = performance.now();
    const dt = Math.min(now - this.lastTime, 33);
    this.lastTime = now;
    this.update(dt);
    this.render();
    this.animFrame = requestAnimationFrame(() => this.loop());
  }

  update(dt) {
    this.distance += this.speed * dt * 0.01;
    this.scanlineOffset = (this.scanlineOffset + 1) % 4;
    
    // Player lane interpolation
    const targetX = this.lanes[this.player.targetLane] * this.canvas.width;
    this.player.x += (targetX - this.player.x) * 0.15;
    this.player.y = this.canvas.height * 0.65;
    this.player.lane = this.player.targetLane;
    
    // Spawn questions
    this.spawnTimer += dt;
    if (this.spawnTimer >= this.spawnInterval && !this.currentQuestion && this.questionQueue.length > 0) {
      this.currentQuestion = this.questionQueue.shift();
      this.questionTimer = this.questionTimeout;
      this.spawnTimer = 0;
    }
    
    // Question timer
    if (this.currentQuestion) {
      this.questionTimer -= dt;
      if (this.questionTimer <= 0) {
        this.answerQuestion(-1); // timeout = wrong
      }
    }
    
    // Check if level complete
    if (this.questionQueue.length === 0 && !this.currentQuestion && this.answeredCount >= this.questions.length) {
      this.running = false;
      setTimeout(() => {
        this.onGameOver && this.onGameOver(this.score, this.correctCount, this.answeredCount, this.maxCombo);
      }, 300);
    }
    
    // Particles
    this.particles = this.particles.filter(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.life -= p.decay;
      return p.life > 0;
    });
    
    // Shake decay
    if (this.shakeAmount > 0) this.shakeAmount *= 0.9;
    if (this.flashAlpha > 0) this.flashAlpha *= 0.95;
    if (this.glitchTimer > 0) this.glitchTimer -= dt;
    
    // Pipeline segments
    this.pipeSegments.forEach(s => {
      s.z -= this.speed * dt * 0.1;
      if (s.z < -10) {
        s.z = 180;
        s.x = Math.random() * 0.4 - 0.2;
      }
    });
  }

  render() {
    const W = this.canvas.width;
    const H = this.canvas.height;
    const ctx = this.ctx;
    
    // Shake offset
    const sx = this.shakeAmount > 0.5 ? (Math.random() - 0.5) * this.shakeAmount : 0;
    const sy = this.shakeAmount > 0.5 ? (Math.random() - 0.5) * this.shakeAmount : 0;
    
    ctx.save();
    ctx.translate(sx, sy);
    
    // Background
    ctx.fillStyle = '#0a0d1a';
    ctx.fillRect(0, 0, W, H);
    
    // Stars
    ctx.fillStyle = 'rgba(0,245,255,0.3)';
    for (let i = 0; i < 50; i++) {
      const hash = (i * 7919 + Math.floor(this.distance * 0.01)) % 10000;
      const x = (hash % W);
      const y = ((hash * 3) % H) * 0.5;
      ctx.fillRect(x, y, 1, 1);
    }
    
    // Pipeline / Tunnel
    this.renderPipeline(ctx, W, H);
    
    // Player
    this.renderPlayer(ctx, W, H);
    
    // Particles
    this.particles.forEach(p => {
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color;
      ctx.shadowBlur = 8;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    });
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    
    // Scanlines
    ctx.fillStyle = 'rgba(0,245,255,0.03)';
    for (let y = this.scanlineOffset; y < H; y += 4) {
      ctx.fillRect(0, y, W, 1);
    }
    
    // Vignette
    const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.8);
    vg.addColorStop(0, 'transparent');
    vg.addColorStop(1, 'rgba(10,13,26,0.7)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
    
    // Flash
    if (this.flashAlpha > 0.01) {
      ctx.fillStyle = this.flashColor;
      ctx.globalAlpha = this.flashAlpha;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
    
    // Glitch effect
    if (this.glitchTimer > 0) {
      for (let i = 0; i < 3; i++) {
        const gy = Math.random() * H;
        const gh = 2 + Math.random() * 10;
        const gx = (Math.random() - 0.5) * 20;
        ctx.drawImage(this.canvas, 0, gy, W, gh, gx, gy, W, gh);
      }
    }
    
    // HUD - Lives
    ctx.font = '16px monospace';
    ctx.fillStyle = '#00f5ff';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 10;
    const livesStr = '█'.repeat(this.lives) + '░'.repeat(3 - this.lives);
    ctx.fillText(`LIVES: ${livesStr}`, 15, 30);
    
    // HUD - Score & Combo
    ctx.fillText(`SCORE: ${Math.floor(this.score)}`, W - 180, 30);
    if (this.combo > 1) {
      ctx.fillStyle = this.flowState ? '#f5a623' : '#39ff14';
      ctx.fillText(`COMBO x${this.combo}`, W - 180, 55);
    }
    
    // Flow state indicator
    if (this.flowState) {
      ctx.font = 'bold 20px monospace';
      ctx.fillStyle = '#f5a623';
      ctx.shadowColor = '#f5a623';
      ctx.shadowBlur = 20;
      ctx.textAlign = 'center';
      ctx.fillText('★ FLOW STATE ★', W / 2, 35);
      ctx.textAlign = 'left';
    }
    
    ctx.shadowBlur = 0;
    
    // Question overlay
    if (this.currentQuestion) {
      this.renderQuestion(ctx, W, H);
    }
    
    ctx.restore();
  }

  renderPipeline(ctx, W, H) {
    const vanishY = H * 0.25;
    const vanishX = W / 2;
    const baseColor = this.flowState ? '#f5a623' : '#00f5ff';
    
    // Draw converging lines
    ctx.strokeStyle = baseColor;
    ctx.globalAlpha = 0.15;
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 3; i++) {
      const x = this.lanes[i] * W;
      ctx.beginPath();
      ctx.moveTo(x, H);
      ctx.lineTo(vanishX, vanishY);
      ctx.stroke();
    }
    
    // Horizontal segments (depth lines)
    this.pipeSegments.forEach(seg => {
      if (seg.z < 0) return;
      const perspective = 1 / (seg.z * 0.01 + 0.1);
      const y = vanishY + (H - vanishY) * (1 - perspective * 0.5);
      const width = W * perspective * 0.4;
      
      ctx.globalAlpha = Math.min(0.3, perspective * 0.5);
      ctx.strokeStyle = baseColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(vanishX - width, y);
      ctx.lineTo(vanishX + width, y);
      ctx.stroke();
      
      // Commit nodes
      if (Math.abs(seg.z % 40) < 5) {
        ctx.fillStyle = baseColor;
        ctx.globalAlpha = Math.min(0.6, perspective);
        ctx.beginPath();
        ctx.arc(vanishX + seg.x * W * perspective, y, 3 * perspective * 10, 0, Math.PI * 2);
        ctx.fill();
      }
    });
    ctx.globalAlpha = 1;
  }

  renderPlayer(ctx, W, H) {
    const px = this.player.x;
    const py = this.player.y - this.player.jumpY;
    const pw = this.player.width;
    const ph = this.player.height;
    const baseColor = this.flowState ? '#f5a623' : '#00f5ff';
    
    // Glow
    ctx.shadowColor = baseColor;
    ctx.shadowBlur = 15;
    
    // Body
    ctx.fillStyle = baseColor;
    ctx.fillRect(px - pw / 2, py - ph, pw, ph);
    
    // Head
    ctx.fillRect(px - pw * 0.3, py - ph - 12, pw * 0.6, 10);
    
    // Eyes
    ctx.fillStyle = '#0a0d1a';
    ctx.fillRect(px - 6, py - ph - 8, 4, 4);
    ctx.fillRect(px + 2, py - ph - 8, 4, 4);
    
    // Trail particles
    if (this.running) {
      for (let i = 0; i < 2; i++) {
        this.particles.push({
          x: px + (Math.random() - 0.5) * pw,
          y: py + Math.random() * 5,
          vx: (Math.random() - 0.5) * 1,
          vy: Math.random() * 2 + 1,
          life: 0.5,
          decay: 0.03,
          color: this.flowState ? '#f5a623' : 'rgba(0,245,255,0.5)',
          size: 1 + Math.random() * 2
        });
      }
    }
    ctx.shadowBlur = 0;
  }

  renderQuestion(ctx, W, H) {
    const q = this.currentQuestion;
    if (!q) return;
    
    // Background panel
    const panelX = W * 0.05;
    const panelY = H * 0.72;
    const panelW = W * 0.9;
    const panelH = H * 0.26;
    
    ctx.fillStyle = 'rgba(10,13,26,0.85)';
    ctx.strokeStyle = 'rgba(0,245,255,0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, panelW, panelH, 8);
    ctx.fill();
    ctx.stroke();
    
    // Timer bar
    const timerPct = Math.max(0, this.questionTimer / this.questionTimeout);
    ctx.fillStyle = timerPct > 0.3 ? '#00f5ff' : '#ff2d55';
    ctx.fillRect(panelX + 2, panelY + 2, (panelW - 4) * timerPct, 3);
    
    // Question text
    ctx.font = '14px monospace';
    ctx.fillStyle = '#00f5ff';
    ctx.shadowColor = '#00f5ff';
    ctx.shadowBlur = 5;
    ctx.textAlign = 'center';
    
    const maxChars = Math.floor(panelW / 9);
    const qText = q.q.length > maxChars ? q.q.substring(0, maxChars - 3) + '...' : q.q;
    ctx.fillText(qText, W / 2, panelY + 25);
    
    // Answers
    ctx.textAlign = 'left';
    ctx.font = '13px monospace';
    const ansY = panelY + 48;
    const ansH = 22;
    
    q.answers.forEach((a, i) => {
      const ax = panelX + 15;
      const ay = ansY + i * ansH;
      
      ctx.fillStyle = 'rgba(0,245,255,0.08)';
      ctx.strokeStyle = 'rgba(0,245,255,0.2)';
      ctx.beginPath();
      ctx.roundRect(ax, ay - 14, panelW - 30, 20, 4);
      ctx.fill();
      ctx.stroke();
      
      ctx.fillStyle = '#f5a623';
      ctx.fillText(`[${i + 1}]`, ax + 5, ay);
      ctx.fillStyle = '#00f5ff';
      const aText = a.length > maxChars - 8 ? a.substring(0, maxChars - 11) + '...' : a;
      ctx.fillText(aText, ax + 35, ay);
    });
    
    ctx.textAlign = 'left';
    ctx.shadowBlur = 0;
  }
}
