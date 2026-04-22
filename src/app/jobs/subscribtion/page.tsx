'use client'

import Link from 'next/link'
import { useMemo, useState, type CSSProperties } from 'react'
import {
  BriefcaseBusiness,
  Bot,
  ChevronDown,
  CircleUserRound,
  FileUser,
  SlidersHorizontal,
  HandCoins,
  ChartNoAxesColumn,
  Settings,
  CreditCard,
  LogOut,
  Sparkles
} from 'lucide-react'

type Billing = 'monthly' | 'quarterly'

const FIG_LOGO_ICON = '/img/nav/logo_icon.png'
const FIG_LOGO_WORDMARK = '/img/nav/logo_wordmark.png'

const checkSrc = '/img/Check.svg'
const AVAILABLE_PLANS = [
  {
    name: 'Basic',
    desc: 'For basic features to kickstart your job search efficiency',
    badge: 'Save 38%',
    price: { monthly: '$9.99', quarterly: '$6.99' },
    original: { monthly: '', quarterly: '$9.99/monthly' },
    billing: { monthly: '', quarterly: 'BILLED QUARTERLY, $20.99' },
    cta: 'dark' as const,
    features: ['50 Auto Apply per month', '10 Resume Credits'],
  },
  {
    name: 'Pro',
    desc: 'Unlock advanced AI capacities, maximize your job hunting success',
    popular: true,
    current: true,
    price: { monthly: '$25.99', quarterly: '$15.99' },
    original: { monthly: '', quarterly: '$25.99/monthly' },
    billing: { monthly: '', quarterly: 'BILLED QUARTERLY, $47.99' },
    cta: 'primary' as const,
    features: ['150 Auto Apply per month', '50 Resume Credits'],
  },
  {
    name: 'Pro+',
    desc: 'Unlock advanced AI capacities, maximize your job hunting success',
    badge: 'Save 50%',
    price: { monthly: '$59.99', quarterly: '$29.99' },
    original: { monthly: '', quarterly: '$59.99/monthly' },
    billing: { monthly: '', quarterly: 'BILLED QUARTERLY, $89.99' },
    cta: 'dark' as const,
    features: ['300 Auto Apply per month', '150 Resume Credits'],
  },
]

const BILLING_HISTORY = [
  { id: 'INV-22041', date: 'Apr 01, 2026', amount: '$47.99', status: 'Paid' },
  { id: 'INV-21408', date: 'Jan 01, 2026', amount: '$47.99', status: 'Paid' },
  { id: 'INV-20811', date: 'Oct 01, 2025', amount: '$47.99', status: 'Paid' },
]

const CURRENT_MEMBER = {
  name: 'Nova User',
  tier: 'Mentee',
  serviceStart: '2024-12-04',
  serviceEnd: '2026-12-31',
}

const AVATAR_TONES = [
  { bg: 'var(--color-main-tint-sm)', fg: 'var(--color-text-green-dark)', ring: 'var(--color-main-tint-md)' },
  { bg: 'var(--color-secondary-icon-bg)', fg: 'var(--color-secondary-text)', ring: 'rgba(99, 102, 241, 0.18)' },
  { bg: 'var(--color-amber-100)', fg: 'var(--color-warning-text)', ring: 'rgba(217, 119, 6, 0.18)' },
  { bg: 'var(--color-saved-pill-bg)', fg: 'var(--color-saved-pill)', ring: 'rgba(225, 29, 72, 0.16)' },
  { bg: 'var(--color-linkedin-bg)', fg: 'var(--color-linkedin)', ring: 'rgba(10, 102, 194, 0.16)' },
]

export default function SubscribtionPage() {
  const [billing, setBilling] = useState<Billing>('monthly')
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(true)
  const amountPeriodLabel = billing === 'monthly' ? '/Month' : '/quarter'
  const currentPlan = useMemo(() => AVAILABLE_PLANS.find(item => item.current), [])
  const activePlanName = currentPlan?.name ?? 'Free'
  const activeTierLabel = currentPlan ? ` (${CURRENT_MEMBER.tier})` : ''
  const serviceRange = `${CURRENT_MEMBER.serviceStart} - ${CURRENT_MEMBER.serviceEnd}`
  const subTitleText = `Hi ${CURRENT_MEMBER.name}, you are currently using the ${activePlanName}${activeTierLabel} plan. Service time: ${serviceRange}.`
  const memberInitial = CURRENT_MEMBER.name.trim().charAt(0).toUpperCase() || 'U'
  const memberAvatarTone = useMemo(() => {
    const idx = memberInitial.charCodeAt(0) % AVATAR_TONES.length
    return AVATAR_TONES[idx]
  }, [memberInitial])
  const memberAvatarStyle = useMemo(
    () =>
      ({
        background: memberAvatarTone.bg,
        color: memberAvatarTone.fg,
        border: `1px solid ${memberAvatarTone.ring}`,
      }) as CSSProperties,
    [memberAvatarTone],
  )

  return (
    <div className="jb-layout">
      <aside className="jb-sidebar">
        <div className="jb-brand">
          <img className="nav-brand-icon" src={FIG_LOGO_ICON} alt="JobNova icon" />
          <img className="nav-brand-wordmark" src={FIG_LOGO_WORDMARK} alt="JobNova" />
        </div>

        <nav className="jb-nav">
          <Link href="/jobs" className="jb-nav-item jb-nav-font-main">
            <BriefcaseBusiness size={20} strokeWidth={1.9} />
            <span>Jobs</span>
          </Link>
          <a href="#" className="jb-nav-item jb-nav-font-main">
            <Bot size={20} strokeWidth={1.9} />
            <span>Auto Apply</span>
          </a>
          <a href="#" className="jb-nav-item jb-nav-font-main">
            <CircleUserRound size={20} strokeWidth={1.9} />
            <span>Profile</span>
          </a>
          <a href="#" className="jb-nav-item jb-nav-font-main">
            <FileUser size={20} strokeWidth={1.9} />
            <span>Resume</span>
          </a>
          <a href="#" className="jb-nav-item jb-nav-font-main">
            <SlidersHorizontal size={20} strokeWidth={1.9} />
            <span>Job Preference</span>
          </a>
        </nav>

        <div className="jb-refer-card">
          <HandCoins size={18} strokeWidth={1.8} />
          <div className="jb-refer-text">
            <p className="jb-refer-title">Share JobNova with a friend</p>
            <p className="jb-refer-sub">Get 500 credits each</p>
          </div>
        </div>

        <div className="jb-user-wrap">
          <button
            type="button"
            className="jb-user-row sub-profile-toggle"
            aria-expanded={isProfileMenuOpen}
            aria-controls="sub-profile-menu"
            onClick={() => setIsProfileMenuOpen(open => !open)}
          >
              <div className="jb-user-av" style={memberAvatarStyle}>{memberInitial}</div>
            <div className="sub-profile-meta">
                <p className="jb-user-name">{CURRENT_MEMBER.name}</p>
                <p className="jb-user-plan">{activePlanName} Plan</p>
            </div>
            <ChevronDown className="sub-profile-chevron" size={16} strokeWidth={2} />
          </button>
          {isProfileMenuOpen ? (
            <div className="jb-user-menu" id="sub-profile-menu">
              <a href="#" className="jb-user-menu-item"><ChartNoAxesColumn size={18} strokeWidth={1.9} /><span>Usage</span></a>
              <a href="#" className="jb-user-menu-item"><Settings size={18} strokeWidth={1.9} /><span>Setting</span></a>
              <a href="/jobs/subscribtion" className="jb-user-menu-item sub-user-menu-item--active">
                <CreditCard size={18} strokeWidth={1.9} />
                <span className="sub-menu-label-row">
                  <span>subscribtion</span>
                  <span className="sub-menu-trial-pill">3-days free trial</span>
                </span>
              </a>
              <a href="/" className="jb-user-menu-item"><LogOut size={18} strokeWidth={1.9} /><span>Log out</span></a>
            </div>
          ) : null}
        </div>
      </aside>

      <section className="jb-content sub-content">
        <div className="sub-page">
          <div className="sub-header">
            <div>
              <p className="sub-kicker">Subscribtion</p>
              <h1 className="sub-title">
                We've got a plan that's <span className="text-accent-underline">Perfect</span> for you
              </h1>
              <p className="sub-subtitle">{subTitleText}</p>
            </div>
            <button className="btn btn-dark sub-header-btn">Download Invoices</button>
          </div>

          <div className="sub-plans-head">
            <div>
              <p className="sub-trial-note">
                Start with <span className="sub-trial-pill">3-days free trial</span>
              </p>
            </div>
            <div className="pricing-toggle">
              <button
                className={`toggle-btn${billing === 'monthly' ? ' toggle-btn--active' : ''}`}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>
              <button
                className={`toggle-btn${billing === 'quarterly' ? ' toggle-btn--active' : ''}`}
                onClick={() => setBilling('quarterly')}
              >
                Quarterly <span className="toggle-save">Save up to 50%</span>
              </button>
            </div>
          </div>

          <div className="sub-plan-grid">
            {AVAILABLE_PLANS.map(plan => (
              <article key={plan.name} className={`plan-card${plan.popular ? ' plan-card--featured' : ''}`}>
                {plan.popular && (
                  <div className="plan-popular">
                    <Sparkles size={12} strokeWidth={2.2} />
                    <span>Most Popular{billing === 'quarterly' ? ' (Save 38%)' : ''}</span>
                  </div>
                )}
                {plan.badge && billing === 'quarterly' && <span className="plan-badge">{plan.badge}</span>}

                <div className="sub-plan-name-row">
                  <p className="plan-name">{plan.name}</p>
                  {plan.current ? <span className="sub-current-pill">Current Plan</span> : null}
                </div>
                <p className="plan-desc">{plan.desc}</p>

                <div className="plan-price">
                  <span className="plan-amount">
                    {plan.price[billing]}
                    <span className="plan-amount-period">{amountPeriodLabel}</span>
                  </span>
                  <div className="plan-price-meta">
                    <span className={`plan-original${plan.original[billing] ? '' : ' is-empty'}`}>
                      {plan.original[billing] || '\u00A0'}
                    </span>
                    <span className={`plan-billing${plan.billing[billing] ? '' : ' is-empty'}`}>
                      {plan.billing[billing] || '\u00A0'}
                    </span>
                  </div>
                </div>

                {plan.current ? (
                  <button
                    className={`btn btn-${plan.cta} plan-cta is-current`}
                    disabled
                  >
                    Current Plan
                  </button>
                ) : (
                  <Link
                    href={`/jobs/subscribtion/upgrade?plan=${encodeURIComponent(plan.name)}`}
                    className={`btn btn-${plan.cta} plan-cta`}
                  >
                    Upgrade
                  </Link>
                )}

                <div className="plan-features">
                  <p className="plan-features-label">Features</p>
                  <p className="plan-features-note">Everything in our free plan plus...</p>
                  <ul className="plan-list">
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <span className="plan-check">
                          <img src={checkSrc} alt="" width="12" height="12" />
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <section className="sub-section">
            <div className="sub-section-head">
              <h3>Billing history</h3>
              <p>Your recent invoices and payment status.</p>
            </div>
            <div className="sub-history">
              {BILLING_HISTORY.map(item => (
                <div className="sub-history-row" key={item.id}>
                  <div className="sub-history-main">
                    <p className="sub-history-id">{item.id}</p>
                    <span>{item.date}</span>
                  </div>
                  <p className="sub-history-amount">{item.amount}</p>
                  <span className="sub-history-status">{item.status}</span>
                  <button className="btn btn-ghost sub-mini-btn">View</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  )
}
