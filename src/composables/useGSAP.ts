import { onUnmounted } from 'vue'
import gsap from 'gsap'

export function useGSAP() {
  const tweens: gsap.core.Tween[] = []
  const timelines: gsap.core.Timeline[] = []

  function to(target: any, vars: gsap.TweenVars) {
    const t = gsap.to(target, vars)
    tweens.push(t)
    return t
  }

  function from(target: any, vars: gsap.TweenVars) {
    const t = gsap.from(target, vars)
    tweens.push(t)
    return t
  }

  function fromTo(target: any, from: gsap.TweenVars, to: gsap.TweenVars) {
    const t = gsap.fromTo(target, from, to)
    tweens.push(t)
    return t
  }

  function timeline(vars?: gsap.TimelineVars) {
    const tl = gsap.timeline(vars)
    timelines.push(tl)
    return tl
  }

  function pageReveal(container: HTMLElement) {
    const tl = timeline()
    const children = container.querySelectorAll('[data-reveal]')
    tl.from(container, { opacity: 0, duration: 0.4 })
    tl.from(children, {
      opacity: 0, y: 30, stagger: 0.08,
      duration: 0.5, ease: 'power2.out'
    }, '-=0.2')
    timelines.push(tl)
    return tl
  }

  function magneticHover(el: HTMLElement) {
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * 0.2
      const dy = (e.clientY - cy) * 0.2
      gsap.to(el, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' })
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
  }

  function glitchIn(el: HTMLElement) {
    const tl = timeline()
    tl.fromTo(el,
      { clipPath: 'inset(0 100% 0 0)', skewX: 5 },
      { clipPath: 'inset(0 0% 0 0)', skewX: 0, duration: 0.6, ease: 'power4.out' }
    )
    timelines.push(tl)
    return tl
  }

  function warpOut(el: HTMLElement, onComplete?: () => void) {
    const tl = timeline({ onComplete })
    tl.to(el, { scale: 0.1, opacity: 0, filter: 'blur(20px)', duration: 0.5, ease: 'power3.in' })
    timelines.push(tl)
    return tl
  }

  function floatLoop(el: HTMLElement, amplitude = 15) {
    const t = gsap.to(el, {
      y: amplitude, duration: 3, yoyo: true, repeat: -1,
      ease: 'sine.inOut'
    })
    tweens.push(t)
    return t
  }

  onUnmounted(() => {
    tweens.forEach(t => t.kill())
    timelines.forEach(t => t.kill())
  })

  return { to, from, fromTo, timeline, pageReveal, magneticHover, glitchIn, warpOut, floatLoop }
}
