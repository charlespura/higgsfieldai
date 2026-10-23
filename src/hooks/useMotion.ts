import { useEffect } from 'react'

export function useMotion() {
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let dispose: (() => void) | undefined
    let cancelled = false
    let generation = 0
    const start = async () => {
      const currentGeneration = ++generation
      if (media.matches) return
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (cancelled || media.matches || currentGeneration !== generation) return
      gsap.registerPlugin(ScrollTrigger)
      const lenis = new Lenis({ duration: 1.05, anchors: true, smoothWheel: true })
      lenis.on('scroll', ScrollTrigger.update)
      const tick = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          gsap.fromTo(
            element,
            { y: 24 },
            {
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: { trigger: element, start: 'top 94%', once: true },
            },
          )
        })
        gsap.to('.hero-art', {
          y: 100,
          ease: 'none',
          scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 1 },
        })
      })
      dispose = () => {
        context.revert()
        gsap.ticker.remove(tick)
        lenis.destroy()
      }
    }
    const change = () => {
      dispose?.()
      dispose = undefined
      void start()
    }
    void start()
    media.addEventListener('change', change)
    return () => {
      cancelled = true
      dispose?.()
      media.removeEventListener('change', change)
    }
  }, [])
}
