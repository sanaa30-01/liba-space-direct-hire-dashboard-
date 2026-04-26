'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

const LottiePlayer = dynamic(
  () => import('@lottiefiles/react-lottie-player').then(mod => mod.Player),
  { ssr: false }
)

type Feature = {
  id: string
  label: string
  title: string
  body: string
  duration: number   // ms
  lottie?: string
}

const FEATURES: Feature[] = [
  {
    id: 'notification',
    label: 'Instant Job Notification',
    title: 'Be first before the listing goes public',
    body: 'Our neural network scans 50,000+ sources per second. Precision-matched alerts arrive before the job hits public boards — giving you a critical head start every time.',
    duration: 8620,
    lottie: '/animations/Instant Job Notification.json',
  },
  {
    id: 'agent',
    label: 'AI Agent Support',
    title: 'A career advocate that never clocks out',
    body: 'A persistent AI agent that learns your goals, handles recruiter outreach, and manages your entire pipeline — all while you focus on life.',
    duration: 5000,
  },
  {
    id: 'resume',
    label: 'AI Resume Customizer',
    title: '100% ATS-optimized, 0% effort',
    body: 'Instantly re-tune your resume for every role. Tailored keywords and perfect formatting — automatically adapted to pass every ATS filter.',
    duration: 5000,
  },
  {
    id: 'auto-apply',
    label: 'AI Auto Apply',
    title: '300+ jobs applied while you live your life',
    body: 'Set your criteria once. Our agent automatically applies to matching positions around the clock — no forms, no repetition, no burnout.',
    duration: 5000,
  },
]

export default function Features() {
  const [active, setActive] = useState(0)
  const [started, setStarted] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Start animations when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.25 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let ticking = false

    const updateByScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const viewportH = window.innerHeight || 1
      const lastIndex = FEATURES.length - 1

      if (rect.top < viewportH && rect.bottom > 0) {
        setStarted(true)
      }

      // 进入区段初期优先稳定展示第一条，避免因滚动位置抖动被过早切走
      if (rect.top >= viewportH * 0.12) {
        setActive(prev => (prev === 0 ? prev : 0))
        return
      }

      // 离开区段前固定最后一条，避免尾段回跳
      if (rect.bottom <= viewportH * 0.42) {
        setActive(prev => (prev === lastIndex ? prev : lastIndex))
        return
      }

      const start = viewportH * 0.12
      const end = -(rect.height - viewportH * 0.42)
      const progress = (start - rect.top) / (start - end)
      const clamped = Math.min(1, Math.max(0, progress))
      const nextActive = Math.min(lastIndex, Math.floor(clamped * FEATURES.length))

      setActive(prev => (prev === nextActive ? prev : nextActive))
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateByScroll()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  const handleProgressEnd = () => {
    setActive(prev => (prev + 1) % FEATURES.length)
  }

  return (
    <section ref={sectionRef} className="features" id="features">
      <div className="features-pin">
        {/* Section header */}
        <div className="container">
          <div className="section-header section-header--center">
            <p className="section-label">✦ How It Works</p>
            <h2 className="section-title">Discover. Optimize. Apply.</h2>
            <p className="section-body">
              Your AI agent handles every step — you just show up to interviews.
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="container features-body">

          {/* Left: feature list */}
          <div className="features-list">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className={`features-item${i === active ? ' is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <div className="features-item-content">
                  <p className="features-item-label">{f.label}</p>
                  <h3 className="features-item-title">{f.title}</h3>
                  <div className="features-item-desc">
                    <div className="features-item-desc-inner">
                      <p>{f.body}</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar — mounts fresh each time active changes */}
                <div className="features-progress">
                  {started && i === active && (
                    <div
                      key={`pb-${active}`}
                      className="features-progress-bar"
                      style={{ animationDuration: `${f.duration}ms` }}
                      onAnimationEnd={handleProgressEnd}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right: preview */}
          <div className="features-preview-wrap">
            {FEATURES.map((f, i) => (
              <div
                key={f.id}
                className={`features-preview${i === active ? ' is-active' : ''}`}
              >
                {f.lottie ? (
                  <LottiePlayer
                    autoplay
                    loop
                    src={f.lottie}
                    className="features-lottie"
                  />
                ) : (
                  <div className={`features-preview-card features-preview-card--${f.id}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
