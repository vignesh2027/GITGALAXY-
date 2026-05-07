// GitGalaxy - Web Audio Engine
export class AudioEngine {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.musicGain = null;
    this.sfxGain = null;
    this.volume = 0.5;
    this.initialized = false;
    this.musicOsc = null;
    this.musicLFO = null;
    this.flowState = false;
  }

  init() {
    if (this.initialized) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.ctx.destination);
      
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0.15;
      this.musicGain.connect(this.masterGain);
      
      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.value = 0.6;
      this.sfxGain.connect(this.masterGain);
      
      this.initialized = true;
    } catch(e) { console.warn('Audio init failed:', e); }
  }

  setVolume(v) {
    this.volume = v;
    if (this.masterGain) this.masterGain.gain.value = v;
  }

  playNote(freq, duration = 0.15, type = 'square', gainVal = 0.3) {
    if (!this.initialized) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playCorrect() {
    if (!this.initialized) return;
    this.playNote(523.25, 0.1, 'square', 0.2);
    setTimeout(() => this.playNote(659.25, 0.1, 'square', 0.2), 60);
    setTimeout(() => this.playNote(783.99, 0.15, 'square', 0.25), 120);
  }

  playWrong() {
    if (!this.initialized) return;
    this.playNote(200, 0.3, 'sawtooth', 0.2);
    setTimeout(() => this.playNote(150, 0.3, 'sawtooth', 0.15), 100);
  }

  playClick() {
    if (!this.initialized) return;
    this.playNote(800, 0.05, 'sine', 0.15);
  }

  playAchievement() {
    if (!this.initialized) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.2, 'sine', 0.25), i * 100);
    });
  }

  playLevelComplete() {
    if (!this.initialized) return;
    const notes = [392, 440, 523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, i) => {
      setTimeout(() => this.playNote(n, 0.25, 'triangle', 0.2), i * 80);
    });
  }

  startMusic() {
    if (!this.initialized || this.musicOsc) return;
    // Ambient deep space synth pad
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.value = 55;
    osc2.type = 'triangle';
    osc2.frequency.value = 82.41;
    
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    lfoGain.gain.value = 10;
    
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    filter.Q.value = 2;
    
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.musicGain);
    
    osc1.start();
    osc2.start();
    lfo.start();
    
    this.musicOsc = { osc1, osc2, lfo, lfoGain, filter };
  }

  stopMusic() {
    if (!this.musicOsc) return;
    try {
      this.musicOsc.osc1.stop();
      this.musicOsc.osc2.stop();
      this.musicOsc.lfo.stop();
    } catch(e) {}
    this.musicOsc = null;
  }

  setFlowState(active) {
    if (!this.musicOsc) return;
    this.flowState = active;
    const t = this.ctx.currentTime;
    if (active) {
      this.musicOsc.osc1.frequency.setTargetAtTime(110, t, 0.3);
      this.musicOsc.osc2.frequency.setTargetAtTime(164.81, t, 0.3);
      this.musicOsc.lfo.frequency.setTargetAtTime(0.3, t, 0.3);
      this.musicOsc.filter.frequency.setTargetAtTime(800, t, 0.3);
      this.musicGain.gain.setTargetAtTime(0.2, t, 0.3);
    } else {
      this.musicOsc.osc1.frequency.setTargetAtTime(55, t, 0.5);
      this.musicOsc.osc2.frequency.setTargetAtTime(82.41, t, 0.5);
      this.musicOsc.lfo.frequency.setTargetAtTime(0.1, t, 0.5);
      this.musicOsc.filter.frequency.setTargetAtTime(400, t, 0.5);
      this.musicGain.gain.setTargetAtTime(0.15, t, 0.5);
    }
  }
}
