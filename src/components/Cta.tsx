'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Search, Send, Sparkles, Zap } from 'lucide-react'

const ROTATE_WORDS = ['stressing', 'refreshing', 'applying', 'waiting'] as const
const WORD_MS = 2800
const COUNT_TICK_MS = 4200

export default function Cta() {
  const [wordIndex, setWordIndex] = useState(0)
  const [appCount, setAppCount] = useState(12_419)

  useEffect(() => {
    const id = window.setInterval(() => {
      setWordIndex(i => (i + 1) % ROTATE_WORDS.length)
    }, WORD_MS)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setAppCount(c => c + Math.floor(Math.random() * 4) + 1)
    }, COUNT_TICK_MS)
    return () => window.clearInterval(id)
  }, [])

  const activeWord = ROTATE_WORDS[wordIndex]

  return (
    <section className="cta" id="cta">
      <div className="cta-stage">
        <div className="cta-grid" aria-hidden="true" />
        <div className="cta-glow" aria-hidden="true" />

        <div className="cta-float cta-float--tl">
          <Send size={16} strokeWidth={2.25} aria-hidden="true" />
          Senior PM @ Stripe
        </div>
        <div className="cta-float cta-float--tr">
          <Zap size={16} strokeWidth={2.25} aria-hidden="true" />
          Applied · 2s ago
        </div>
        <div className="cta-float cta-float--bl">
          <Sparkles size={16} strokeWidth={2.25} aria-hidden="true" />
          Interview booked
        </div>
        <div className="cta-float cta-float--br">
          <Search size={16} strokeWidth={2.25} aria-hidden="true" />
          Scanning 12,481 roles
        </div>

        <div className="container cta-inner">
          <p className="cta-live-pill">
            <span className="cta-live-pill__dot" aria-hidden="true" />
            {appCount.toLocaleString()} applications sent today
          </p>

          <h2 className="cta-heading">
            <span className="cta-heading__line">
              Stop{' '}
              <span className="cta-highlight">
                <span key={activeWord} className="cta-word">
                  {activeWord}.
                </span>
              </span>
            </span>
            <span className="cta-heading__line">
              Start <em className="cta-getting">getting</em>
            </span>
            <span className="cta-heading__line">hired.</span>
          </h2>

          <p className="cta-body">
            Your AI agent is already searching. Join professionals who let{' '}
            <strong>JobNova</strong> do the work.
          </p>

          <a href="#" className="cta-action">
            <span>Let AI Apply for Me</span>
            <span className="cta-action__icon" aria-hidden="true">
              <ArrowRight size={20} strokeWidth={2.5} />
            </span>
          </a>

          <p className="cta-trust">
            <span>✦ No credit card</span>
            <span>✦ Setup in 60 seconds</span>
            <span>✦ Cancel anytime</span>
          </p>
        </div>
      </div>
    </section>
  )
}
