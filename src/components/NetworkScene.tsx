import { useEffect, useRef, useState } from 'react'
import { media } from '../data/media'

const towers = Array.from({ length: 40 }, (_, i) => {
  const x = i % 8
  const z = Math.floor(i / 8)
  const height = 20 + ((i * 47 + x * 31) % 130)
  return { x: 405 + (x - z) * 52, y: 180 + (x + z) * 25, h: height, key: i }
}).sort((a, b) => a.y - b.y)

export function NetworkScene() {
  return (
    <svg className="network-scene" viewBox="0 0 1050 720" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="tower-front" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#163942" stopOpacity=".85" />
          <stop offset="1" stopColor="#081216" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="tower-side">
          <stop stopColor="#10232a" />
          <stop offset="1" stopColor="#0b1218" />
        </linearGradient>
        <linearGradient id="tower-top">
          <stop stopColor="#5de7ef" stopOpacity=".2" />
          <stop offset="1" stopColor="#172d33" stopOpacity=".7" />
        </linearGradient>
        <radialGradient id="scene-glow">
          <stop stopColor="#1fb7ce" stopOpacity=".2" />
          <stop offset="1" stopColor="#0c1014" stopOpacity="0" />
        </radialGradient>
        <filter id="node-glow">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <ellipse cx="535" cy="370" rx="470" ry="290" fill="url(#scene-glow)" />
      <g stroke="#41899a" strokeOpacity=".16" strokeWidth=".7">
        {Array.from({ length: 19 }, (_, i) => (
          <g key={i}>
            <path d={`M${70 + i * 52} 240 l-400 200`} />
            <path d={`M${70 + i * 52} 240 l400 200`} />
          </g>
        ))}
      </g>
      <g className="data-paths" stroke="#5ce4ee" strokeWidth="1.1" strokeOpacity=".7">
        <path d="m145 440 156-78 104 52 208-104 156 78 156-78" />
        <path d="m250 545 156-78 104 52 156-78 104 52" />
        <path d="m300 258 156 78 156-78 208 104" />
      </g>
      {towers.map(({ x, y, h, key }) => (
        <g key={key} className="network-tower" style={{ animationDelay: `${key * -0.31}s` }}>
          <path
            d={`M${x} ${y - h} l24 12 v${h} l-24 -12 Z`}
            fill="url(#tower-front)"
            stroke="#4fb8ca"
            strokeOpacity=".35"
            strokeWidth=".7"
          />
          <path
            d={`M${x + 24} ${y - h + 12} l24 -12 v${h} l-24 12 Z`}
            fill="url(#tower-side)"
            stroke="#4fb8ca"
            strokeOpacity=".24"
            strokeWidth=".7"
          />
          <path
            d={`M${x} ${y - h} l24 -12 24 12 -24 12 Z`}
            fill="url(#tower-top)"
            stroke="#63dbea"
            strokeOpacity=".55"
            strokeWidth=".7"
          />
          {Array.from({ length: Math.floor(h / 12) }, (_, j) => (
            <path
              key={j}
              d={`m${x + 5} ${y - h + 10 + j * 12} 13 6`}
              stroke="#6be9ef"
              strokeOpacity={j % 3 === 0 ? '.7' : '.15'}
              strokeWidth="1"
            />
          ))}
          {key % 4 === 0 && (
            <>
              <circle
                cx={x + 24}
                cy={y - h}
                r="7"
                fill="#51e1f1"
                opacity=".3"
                filter="url(#node-glow)"
              />
              <circle cx={x + 24} cy={y - h} r="2" fill="#a5f8ff" />
            </>
          )}
        </g>
      ))}
      <g stroke="#6ae1ec" strokeOpacity=".7">
        <path d="M585 77v40m-20-20h40M830 460v20m-10-10h20M240 302v20m-10-10h20" />
      </g>
      <g fill="#75b6bf" fontFamily="monospace" fontSize="9" letterSpacing="2">
        <text x="700" y="170">
          NODE_019 / CONNECTED
        </text>
        <text x="200" y="595">
          PIPELINE_004 / DATA STREAM
        </text>
        <text x="760" y="555">
          SYSTEMS IN SYNC
        </text>
      </g>
      <path d="m660 175 25 12h150M360 572h170l38-19" stroke="#4d8b96" strokeOpacity=".5" />
    </svg>
  )
}

/** Only mounts a video after its HEAD request succeeds. Missing generated media never creates a broken player. */
export function HeroMedia() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasVideo, setHasVideo] = useState(false)
  const [failed, setFailed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(true)
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!media.hero.src) return
    if (reducedMotion || navigator.connection?.saveData) {
      setHasVideo(false)
      return
    }
    const controller = new AbortController()
    void fetch(media.hero.src, { method: 'HEAD', signal: controller.signal })
      .then((response) => {
        if (response.ok && response.headers.get('content-type')?.startsWith('video/'))
          setHasVideo(true)
      })
      .catch(() => {})
    return () => controller.abort()
  }, [reducedMotion])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !hasVideo || failed) return
    let disposed = false
    let cleanup: (() => void) | undefined
    const init = async () => {
      if (!Number.isFinite(video.duration) || video.duration <= 0) return
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ])
      if (disposed) return
      gsap.registerPlugin(ScrollTrigger)
      const animation = gsap.to(video, {
        currentTime: Math.max(0, video.duration - 0.05),
        ease: 'none',
        scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
      cleanup = () => {
        animation.scrollTrigger?.kill()
        animation.kill()
      }
    }
    video.addEventListener('loadedmetadata', init, { once: true })
    if (video.readyState >= 1) void init()
    return () => {
      disposed = true
      video.removeEventListener('loadedmetadata', init)
      cleanup?.()
    }
  }, [hasVideo, failed])

  return (
    <div className="hero-art">
      <NetworkScene />
      {hasVideo && !failed && (
        <video
          className="hero-video"
          ref={videoRef}
          src={media.hero.src ?? undefined}
          muted
          playsInline
          loop
          preload="metadata"
          aria-hidden="true"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  )
}
