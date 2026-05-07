<template>
  <canvas ref="canvas" class="fixed inset-0 z-0 w-full h-full pointer-events-none" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let animId = 0
let resizeHandler: () => void

onMounted(() => {
  const c = canvas.value!
  const ctx = c.getContext('2d')!

  function resize() {
    c.width = window.innerWidth
    c.height = window.innerHeight
    rebuildGrid()
  }

  // Stars — fixed normalized coords
  const STAR_COUNT = 320
  let stars: { nx: number; ny: number; r: number; base: number; phase: number; spd: number }[] = []

  function rebuildGrid() {
    stars = Array.from({ length: STAR_COUNT }, () => ({
      nx: Math.random(), ny: Math.random(),
      r: 0.4 + Math.random() * 1.2,
      base: 0.12 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
      spd: 0.004 + Math.random() * 0.01
    }))
  }

  // Ambient blobs — very dim color orbs
  const blobs = [
    { nx: 0.12, ny: 0.25, nr: 0.55, r: 0, g: 245, b: 255, op: 0.022 },
    { nx: 0.88, ny: 0.72, nr: 0.45, r: 123, g: 97,  b: 255, op: 0.022 },
    { nx: 0.50, ny: 0.05, nr: 0.38, r: 57,  g: 255, b: 20,  op: 0.014 },
    { nx: 0.25, ny: 0.90, nr: 0.40, r: 255, g: 183, b: 3,   op: 0.012 }
  ]

  // Shooting stars
  let shooters: { x: number; y: number; vx: number; vy: number; life: number }[] = []
  let shootTimer = 0

  // Constellation lines between nearby stars (computed once per resize)
  let constellations: [number, number][] = []
  function buildConstellations() {
    constellations = []
    const sample = stars.slice(0, 60)
    sample.forEach((a, i) => {
      sample.slice(i + 1).forEach(b => {
        const dx = a.nx - b.nx, dy = a.ny - b.ny
        if (Math.sqrt(dx*dx + dy*dy) < 0.12) constellations.push([i, sample.indexOf(b)])
      })
    })
  }

  resize()
  buildConstellations()

  resizeHandler = () => { resize(); buildConstellations() }
  window.addEventListener('resize', resizeHandler)

  let t = 0

  function frame() {
    animId = requestAnimationFrame(frame)
    t += 0.016
    const W = c.width, H = c.height

    // Pure dark base
    ctx.fillStyle = '#030609'
    ctx.fillRect(0, 0, W, H)

    // Dot grid
    ctx.fillStyle = 'rgba(255,255,255,0.018)'
    for (let x = 0; x <= W; x += 55) {
      for (let y = 0; y <= H; y += 55) {
        ctx.beginPath()
        ctx.arc(x, y, 0.7, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Ambient color blobs
    blobs.forEach(b => {
      const grd = ctx.createRadialGradient(
        b.nx * W, b.ny * H, 0,
        b.nx * W, b.ny * H, b.nr * Math.min(W, H)
      )
      grd.addColorStop(0, `rgba(${b.r},${b.g},${b.b},${b.op})`)
      grd.addColorStop(0.5, `rgba(${b.r},${b.g},${b.b},${b.op * 0.3})`)
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, W, H)
    })

    // Constellation lines
    const sample = stars.slice(0, 60)
    ctx.strokeStyle = 'rgba(255,255,255,0.025)'
    ctx.lineWidth = 0.6
    constellations.forEach(([ai, bi]) => {
      const a = sample[ai], b = sample[bi]
      ctx.beginPath()
      ctx.moveTo(a.nx * W, a.ny * H)
      ctx.lineTo(b.nx * W, b.ny * H)
      ctx.stroke()
    })

    // Stars with twinkle
    stars.forEach(s => {
      const tw = Math.sin(t * s.spd * 60 + s.phase) * 0.35 + 0.65
      ctx.beginPath()
      ctx.arc(s.nx * W, s.ny * H, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(255,255,255,${s.base * tw})`
      ctx.fill()
    })

    // Shooting stars
    shootTimer++
    if (shootTimer > 260 + Math.random() * 300) {
      shootTimer = 0
      const spd = 9 + Math.random() * 7
      const angle = Math.PI * (0.12 + Math.random() * 0.18)
      shooters.push({
        x: Math.random() * W * 0.7,
        y: Math.random() * H * 0.45,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        life: 1
      })
    }
    shooters = shooters.filter(s => {
      s.x += s.vx; s.y += s.vy; s.life -= 0.025
      const tailLen = 60 * s.life
      const grd = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * tailLen * 0.14, s.y - s.vy * tailLen * 0.14)
      grd.addColorStop(0, `rgba(255,255,255,${s.life * 0.75})`)
      grd.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.strokeStyle = grd; ctx.lineWidth = 1.2
      ctx.beginPath(); ctx.moveTo(s.x, s.y)
      ctx.lineTo(s.x - s.vx * tailLen * 0.14, s.y - s.vy * tailLen * 0.14)
      ctx.stroke()
      return s.life > 0 && s.x < W + 60 && s.y < H + 60
    })
  }

  frame()
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  window.removeEventListener('resize', resizeHandler)
})
</script>
