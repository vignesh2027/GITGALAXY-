import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  let ctx: AudioContext | null = null
  let droneGain: GainNode | null = null
  let masterGain: GainNode | null = null
  const muted = ref(false)
  const volume = ref(0.5)
  const initialized = ref(false)

  function init() {
    if (initialized.value) return
    ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    masterGain = ctx.createGain()
    masterGain.gain.value = volume.value
    masterGain.connect(ctx.destination)

    // Ambient drone
    droneGain = ctx.createGain()
    droneGain.gain.value = 0.04
    droneGain.connect(masterGain)

    const freqs = [55, 82.5, 110, 165]
    freqs.forEach((f, i) => {
      const osc = ctx!.createOscillator()
      const g = ctx!.createGain()
      osc.type = i % 2 === 0 ? 'sine' : 'triangle'
      osc.frequency.value = f
      osc.detune.value = (Math.random() - 0.5) * 5
      g.gain.value = 1 / (i + 1)
      osc.connect(g)
      g.connect(droneGain!)
      osc.start()
    })

    initialized.value = true
  }

  function playUI(type: 'click' | 'hover' | 'success' | 'error' | 'xp') {
    if (!ctx || muted.value) return
    const g = ctx.createGain()
    g.connect(masterGain!)

    const osc = ctx.createOscillator()
    osc.connect(g)

    const configs = {
      click:   { freq: 440, type: 'square' as OscillatorType, dur: 0.08, gain: 0.15 },
      hover:   { freq: 880, type: 'sine'   as OscillatorType, dur: 0.06, gain: 0.06 },
      success: { freq: 660, type: 'sine'   as OscillatorType, dur: 0.3,  gain: 0.2  },
      error:   { freq: 220, type: 'sawtooth'as OscillatorType, dur: 0.2, gain: 0.2  },
      xp:      { freq: 528, type: 'sine'   as OscillatorType, dur: 0.5,  gain: 0.25 }
    }
    const c = configs[type]
    osc.type = c.type
    osc.frequency.setValueAtTime(c.freq, ctx.currentTime)
    if (type === 'success') osc.frequency.exponentialRampToValueAtTime(c.freq * 1.5, ctx.currentTime + c.dur)
    if (type === 'xp') osc.frequency.exponentialRampToValueAtTime(c.freq * 2, ctx.currentTime + c.dur)
    g.gain.setValueAtTime(c.gain, ctx.currentTime)
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + c.dur)
    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + c.dur)
  }

  function playAchievement() {
    if (!ctx || muted.value) return
    const notes = [523.25, 659.25, 783.99, 1046.5]
    notes.forEach((freq, i) => {
      setTimeout(() => {
        const g = ctx!.createGain()
        const osc = ctx!.createOscillator()
        g.connect(masterGain!)
        osc.connect(g)
        osc.type = 'sine'
        osc.frequency.value = freq
        g.gain.setValueAtTime(0.3, ctx!.currentTime)
        g.gain.exponentialRampToValueAtTime(0.001, ctx!.currentTime + 0.4)
        osc.start(ctx!.currentTime)
        osc.stop(ctx!.currentTime + 0.4)
      }, i * 120)
    })
  }

  function toggleMute() {
    muted.value = !muted.value
    if (masterGain) masterGain.gain.value = muted.value ? 0 : volume.value
  }

  function setVolume(v: number) {
    volume.value = v
    if (masterGain && !muted.value) masterGain.gain.value = v
  }

  return { init, playUI, playAchievement, toggleMute, setVolume, muted, volume, initialized }
})
