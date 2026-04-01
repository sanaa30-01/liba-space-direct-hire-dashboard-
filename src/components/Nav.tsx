'use client'

import { useEffect, useState } from 'react'

const NAV_LOGO_ICON = '/img/nav/logo_icon.png'
const NAV_LOGO_WORDMARK = '/img/nav/logo_wordmark.png'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <a href="#" className="nav-brand">
        <img className="nav-brand-icon" src={NAV_LOGO_ICON} alt="JobNova icon" />
        <img className="nav-brand-wordmark" src={NAV_LOGO_WORDMARK} alt="JobNova" />
      </a>

      <div className="nav-tabs">
        <a href="#features" className="nav-link">Feature</a>
        <a href="#pricing"  className="nav-link">Pricing</a>
        <a href="#faq"      className="nav-link">FAQs</a>
        <div className="nav-affiliate">
          <a href="#" className="nav-link">Affiliate</a>
          <span className="nav-badge">30%</span>
        </div>
      </div>

      <div className="nav-actions">
        <a href="#" className="btn btn-dark">Find Talents</a>
        <div className="nav-divider" />
        <a href="/jobs" className="btn btn-ghost">Login</a>
        <a href="#" className="btn btn-primary">
          Sign Up
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <button className="nav-hamburger" aria-label="Menu">
        <span /><span /><span />
      </button>
    </nav>
  )
}
