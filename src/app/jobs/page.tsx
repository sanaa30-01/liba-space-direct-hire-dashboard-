'use client'
import { useState, useEffect, useRef } from 'react'

// ── Types ──────────────────────────────────────────────────────────
type Job = {
  id: number; match: number; posted: string; applicants: number
  title: string; company: string; companyColor: string
  location: string; workMode: 'On-site' | 'Remote' | 'Hybrid'
  type: string; level: string; exp: string; salary: string
  appliedDate: string | null; badges: string[]; saved: boolean; hot?: boolean
}
type AppStatus = 'pending' | 'applied'
type AutoApp = {
  id: number; title: string; company: string; companyColor: string
  status: AppStatus; date: string; salary: string
}

// ── Data ───────────────────────────────────────────────────────────
const JOBS: Job[] = [
  { id: 1, match: 64, posted: '1h ago', applicants: 25, title: 'Web Application Developer', company: 'Backd Business Funding', companyColor: '#6366f1', location: 'Austin, TX', workMode: 'On-site', type: 'Full time', level: 'Mid Level', exp: '3+ yrs', salary: '$65k–$70k/yr', appliedDate: null, badges: [], saved: false },
  { id: 2, match: 64, posted: '1h ago', applicants: 25, title: 'Web Application Developer', company: 'Backd Business Funding', companyColor: '#6366f1', location: 'Austin, TX / Milan, Lombardy, Italy', workMode: 'Hybrid', type: 'Full time', level: 'Mid Level', exp: '3+ yrs', salary: '$65k–$70k/yr', appliedDate: 'Nov 26, 2025', badges: ['Referral', 'Auto Applied'], saved: false },
  { id: 3, match: 78, posted: '3h ago', applicants: 41, title: 'Senior Frontend Engineer', company: 'Linear', companyColor: '#5b5bd6', location: 'San Francisco, CA', workMode: 'Hybrid', type: 'Full time', level: 'Senior', exp: '5+ yrs', salary: '$140k–$180k/yr', appliedDate: null, badges: [], saved: true, hot: true },
  { id: 4, match: 93, posted: '1h ago', applicants: 25, title: 'Web Application Developer', company: 'Cursor AI', companyColor: '#09090b', location: 'Lake Mary, FL / Milan, Lombardy, Italy', workMode: 'On-site', type: 'Internship', level: 'Entry–Mid', exp: '3+ yrs', salary: '$22–$25/hr', appliedDate: null, badges: ['Referral'], saved: true },
  { id: 5, match: 96, posted: '30m ago', applicants: 12, title: 'AI Product Designer', company: 'Anthropic', companyColor: '#cc6c24', location: 'San Francisco, CA', workMode: 'Remote', type: 'Full time', level: 'Senior', exp: '4+ yrs', salary: '$160k–$200k/yr', appliedDate: null, badges: [], saved: false, hot: true },
]

const AUTO_APPS: AutoApp[] = [
  { id: 1, title: 'Frontend Engineer', company: 'Vercel', companyColor: '#000000', status: 'pending', date: 'Just now', salary: '$130k–$160k' },
  { id: 2, title: 'Product Designer', company: 'Figma', companyColor: '#a259ff', status: 'pending', date: '3m ago', salary: '$120k–$150k' },
  { id: 3, title: 'React Developer', company: 'Stripe', companyColor: '#635bff', status: 'applied', date: '8m ago', salary: '$140k–$170k' },
  { id: 4, title: 'UI Engineer', company: 'Notion', companyColor: '#000000', status: 'applied', date: '15m ago', salary: '$110k–$140k' },
  { id: 5, title: 'Full Stack Dev', company: 'Railway', companyColor: '#7b2bf9', status: 'applied', date: '22m ago', salary: '$100k–$130k' },
]

// ── Job Square types & data ─────────────────────────────────────────
type SignalKind = 'founding' | 'hiring-fast' | 'new-team' | 'expansion'
type JSSource  = 'linkedin' | 'platform'
type JSItem = {
  id: number; source: JSSource
  manager: { name: string; title: string; initials: string; color: string }
  company: string; companyInitials: string; companyColor: string
  role: string
  signal: { kind: SignalKind; label: string; sub: string }
  location: string; salary: string; posted: string
}

const SIGNAL_META: Record<SignalKind, { emoji: string; bg: string; color: string }> = {
  'founding':    { emoji: '⭐', bg: '#f3e8ff', color: '#7c3aed' },
  'hiring-fast': { emoji: '⚡', bg: '#dcfce7', color: '#15803d' },
  'new-team':    { emoji: '🟡', bg: '#fef9c3', color: '#a16207' },
  'expansion':   { emoji: '🌱', bg: '#dcfce7', color: '#166534' },
}

const JOB_SQUARE: JSItem[] = [
  { id: 1, source: 'linkedin', manager: { name: 'Sarah Chen', title: 'Head of Engineering', initials: 'SC', color: '#ddd6fe' }, company: 'Agency AI', companyInitials: 'A', companyColor: '#7c3aed', role: 'Founding AI Engineer', signal: { kind: 'founding', label: 'Founding', sub: '$200K–$280K + Equity' }, location: 'Remote', salary: '$200K–$260K', posted: '2d ago' },
  { id: 2, source: 'linkedin', manager: { name: 'David Kim', title: 'Head of Research', initials: 'DK', color: '#bfdbfe' }, company: 'Cognition', companyInitials: 'C', companyColor: '#2563eb', role: 'Sr. Research Scientist', signal: { kind: 'hiring-fast', label: 'Hiring Fast', sub: 'Leading 6th new projects' }, location: 'SF Bay Area', salary: '$200K + Equity', posted: '1w ago' },
  { id: 3, source: 'platform', manager: { name: 'Emily Nguyen', title: 'Head of ML', initials: 'EN', color: '#fde68a' }, company: 'Zoox', companyInitials: 'Z', companyColor: '#d97706', role: 'ML Infrastructure Lead', signal: { kind: 'new-team', label: 'New Team', sub: 'Building fast, 5 engineers' }, location: 'Foster City', salary: '$650K+', posted: '3d ago' },
  { id: 4, source: 'platform', manager: { name: 'Jessica Lee', title: 'Head of Product', initials: 'JL', color: '#bbf7d0' }, company: 'Barrios A2I', companyInitials: 'B', companyColor: '#16a34a', role: 'AI Product Manager', signal: { kind: 'expansion', label: 'Expansion', sub: 'Updating to new markets' }, location: 'NYC', salary: '$280K + Equity', posted: '4d ago' },
  { id: 5, source: 'linkedin', manager: { name: 'Alex Rivera', title: 'Head of Data', initials: 'AR', color: '#e0e7ff' }, company: 'Robust.AI', companyInitials: 'R', companyColor: '#4f46e5', role: 'Lead Data Scientist', signal: { kind: 'founding', label: 'Founding', sub: 'Replacing key engineer' }, location: 'SF Bay Area', salary: '$200K + Equity', posted: 'Today' },
]

// ── Contact modal ────────────────────────────────────────────────────
const USER = { name: 'Alex Johnson', title: 'Senior Full Stack Engineer', exp: '5 years' }

function buildMessages(item: JSItem): string[] {
  const first = item.manager.name.split(' ')[0]
  const { role, company, signal } = item
  if (signal.kind === 'founding') return [
    `Hi ${first}! I came across the ${role} opportunity at ${company} and couldn't scroll past it — founding-stage roles with real equity upside are exactly what I've been holding out for.\n\nI'm ${USER.name}, a ${USER.title} with ${USER.exp} building production systems end-to-end. I'd love a quick 15-min call to see if there's a fit. Would that work?`,
    `Hey ${first} — the ${role} listing at ${company} caught my eye straight away. ${signal.sub} is a strong signal and the kind of early-stage bet I'm actively looking for.\n\nI bring ${USER.exp} of hands-on engineering across the full stack. Happy to share my work or jump on a call whenever you're free.`,
    `Hi ${first}! Saw you're building the founding team at ${company} for the ${role} role. ${signal.sub} — that's the story I want to be part of.\n\nI'm ${USER.name}, ${USER.title} with ${USER.exp}. Would love to connect and learn more about the team's direction.`,
  ]
  if (signal.kind === 'hiring-fast') return [
    `Hi ${first}! ${company} is clearly moving fast — the ${role} role and "${signal.sub}" tells me you need someone who can hit the ground running.\n\nI'm ${USER.name}, ${USER.title} with ${USER.exp}. I thrive in high-velocity environments. Worth a quick chat?`,
    `Hey ${first} — saw ${company} is hiring fast for ${role}. Speed matters and so does fit. I'm ${USER.name}, a ${USER.title} with ${USER.exp} who's used to shipping in fast-moving teams.\n\nWould love to connect if the timing works.`,
    `Hi ${first}! The ${role} role at ${company} jumped out at me — ${signal.sub} signals a team that moves with intention. I love that.\n\nI'm ${USER.name} with ${USER.exp} of experience. Happy to do a quick intro call on your schedule.`,
  ]
  if (signal.kind === 'new-team') return [
    `Hi ${first}! Building a new team at ${company} from scratch for ${role} — that's exactly the kind of 0→1 challenge I've been looking for.\n\nI'm ${USER.name}, ${USER.title} with ${USER.exp}. ${signal.sub}. I'd love to be part of that story. Open to a quick call?`,
    `Hey ${first} — a brand-new team, ${role}, at ${company}. ${signal.sub} — I'm in.\n\nI'm ${USER.name} with ${USER.exp} building teams and systems from the ground up. Would love to connect.`,
    `Hi ${first}! Spotted the ${role} opportunity at ${company} — ${signal.sub} is the kind of mandate where I do my best work.\n\nI'm ${USER.name}, ${USER.title} with ${USER.exp}. Let's find 15 minutes to chat?`,
  ]
  return [
    `Hi ${first}! The ${role} role at ${company} aligns really well with where I want to go next — ${signal.sub} resonates a lot.\n\nI'm ${USER.name}, ${USER.title} with ${USER.exp}. Would love to connect and hear more about the team's direction.`,
    `Hey ${first} — saw ${company} is expanding into new territory with ${role}. ${signal.sub} sounds like meaningful work.\n\nI'm ${USER.name} with ${USER.exp} and would love a quick chat to explore if there's a fit.`,
    `Hi ${first}! ${signal.sub} at ${company} caught my attention. I'm ${USER.name}, ${USER.title} with ${USER.exp} of relevant experience.\n\nHappy to share more — would a short intro call work?`,
  ]
}

function ContactModal({ item, onClose }: { item: JSItem; onClose: () => void }) {
  const [variant, setVariant]   = useState(0)
  const [isTyping, setIsTyping] = useState(true)
  const [msg, setMsg]           = useState('')
  const [copied, setCopied]     = useState(false)
  const overlayRef              = useRef<HTMLDivElement>(null)
  const messages                = buildMessages(item)
  const sig                     = SIGNAL_META[item.signal.kind]

  useEffect(() => {
    const fullMsg = messages[variant % messages.length]
    setMsg('')
    setIsTyping(true)
    let startTimer: ReturnType<typeof setTimeout>
    const raf = { id: null as ReturnType<typeof setTimeout> | null }

    startTimer = setTimeout(() => {
      let i = 0
      const tick = () => {
        const progress = i / fullMsg.length
        // Burst-style: slow ramp-up → fast middle → gentle taper — mirrors real LLM streaming
        const chunk = progress < 0.06 ? 1 : progress > 0.9 ? 3 : 7
        // Brief beat at sentence boundaries for natural rhythm
        const prevChar = fullMsg[i - 1] ?? ''
        const atBoundary = '.!?\n'.includes(prevChar) && i > 4
        const delay = atBoundary ? 90 + Math.random() * 60 : 12 + Math.random() * 8

        i += chunk
        if (i >= fullMsg.length) {
          setMsg(fullMsg)
          setIsTyping(false)
        } else {
          setMsg(fullMsg.slice(0, i))
          raf.id = setTimeout(tick, delay)
        }
      }
      tick()
    }, 280)

    return () => {
      clearTimeout(startTimer)
      if (raf.id) clearTimeout(raf.id)
    }
  }, [variant])

  // close on overlay click
  const handleOverlay = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  const copy = () => {
    navigator.clipboard.writeText(msg)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="cm-overlay" ref={overlayRef} onClick={handleOverlay}>
      <div className="cm-card">
        {/* Header */}
        <div className="cm-header">
          <div className="cm-manager-row">
            <div className="cm-av" style={{ background: item.manager.color }}>{item.manager.initials}</div>
            <div className="cm-manager-info">
              <p className="cm-manager-name">{item.manager.name}</p>
              <p className="cm-manager-title">{item.manager.title} · {item.company}</p>
            </div>
          </div>
          <button className="cm-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Job chip */}
        <div className="cm-job-chip">
          <span className="cm-job-role">{item.role}</span>
          <span className="cm-chip-sep">·</span>
          <span className="cm-signal-tag" style={{ background: sig.bg, color: sig.color }}>{sig.emoji} {item.signal.label}</span>
        </div>

        {/* Message */}
        <div className={`cm-msg-wrap${isTyping ? ' is-typing' : ''}`}>
          {isTyping ? (
            <div className="cm-typeout" aria-live="polite">
              {msg}<span className="cm-cursor" aria-hidden="true" />
            </div>
          ) : (
            <textarea
              className="cm-textarea"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              rows={9}
            />
          )}
        </div>

        {/* Footer */}
        <div className="cm-footer">
          <button className="cm-regen" onClick={() => setVariant(v => v + 1)} disabled={isTyping}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>
            Regenerate
          </button>
          <div className="cm-footer-right">
            <button className="cm-copy" onClick={copy} disabled={isTyping}>
              {copied ? (
                <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>Copied</>
              ) : (
                <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy</>
              )}
            </button>
            <a
              className="cm-open"
              href={item.source === 'linkedin' ? 'https://linkedin.com' : '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.source === 'linkedin' ? (
                <><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>Message on LinkedIn</>

              ) : (
                <><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>Contact them</>
              )}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function JobSquareCard({ item, onContact }: { item: JSItem; onContact: (item: JSItem) => void }) {
  const sig = SIGNAL_META[item.signal.kind]
  const isLinkedin = item.source === 'linkedin'
  return (
    <div className="js-card">
      <div className="js-card-top">
        {/* Manager */}
        <div className="js-manager">
          <div className="js-manager-av" style={{ background: item.manager.color }}>
            {item.manager.initials}
          </div>
          <div className="js-manager-info">
            <p className="js-manager-name">{item.manager.name}</p>
            <p className="js-manager-title">{item.manager.title}</p>
          </div>
        </div>
        {/* Signal */}
        <div className="js-signal" style={{ background: sig.bg, color: sig.color }}>
          <span>{sig.emoji}</span>
          <span>{item.signal.label}</span>
        </div>
        {/* Meta */}
        <span className="js-posted">{item.posted}</span>
      </div>

      <div className="js-card-mid">
        <div className="js-job-info">
          <p className="js-role">{item.role}</p>
          <p className="js-company">{item.company} · {item.signal.sub}</p>
        </div>
      </div>

      <div className="js-card-ft">
        <div className="js-ft-meta">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{item.location}</span>
        </div>
        <div className="js-ft-actions">
          {isLinkedin ? (
            <button className="js-btn js-btn--linkedin" onClick={() => onContact(item)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Apply
            </button>
          ) : (
            <button className="js-btn js-btn--contact" onClick={() => onContact(item)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contact
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const SIGNALS = [
  { key: 'founding',    label: 'Founding',    emoji: '⭐', count: 12, total: 57, color: '#7c3aed' },
  { key: 'hiring-fast', label: 'Hiring Fast', emoji: '⚡', count: 8,  total: 57, color: '#059669' },
  { key: 'new-team',    label: 'New Team',    emoji: '🟡', count: 15, total: 57, color: '#d97706' },
  { key: 'expansion',   label: 'Expansion',   emoji: '🌱', count: 22, total: 57, color: '#16a34a' },
]

const TOP_COMPANIES = [
  { name: 'Anthropic',  initials: 'An', color: '#f97316', roles: 4, source: 'platform' },
  { name: 'Stripe',     initials: 'St', color: '#6366f1', roles: 3, source: 'platform' },
  { name: 'Vercel',     initials: 'Ve', color: '#171717', roles: 2, source: 'linkedin' },
  { name: 'Figma',      initials: 'Fi', color: '#a21caf', roles: 2, source: 'linkedin' },
  { name: 'Linear',     initials: 'Li', color: '#5e6ad2', roles: 1, source: 'platform' },
]

function JobSquarePanel() {
  return (
    <div className="jsq-panel">
      {/* Post a Job — prominent CTA, top */}
      <div className="jsq-post-card">
        <div className="jsq-post-card-text">
          <p className="jsq-post-card-title">Post your opening</p>
          <p className="jsq-post-card-desc">Reach 2.4K active candidates directly — no middleman.</p>
        </div>
        <button className="jsq-post-card-btn">Post a Job →</button>
      </div>

      {/* Overview stats */}
      <div className="jsq-hd">
        <span className="jsq-hd-title">Market Pulse</span>
        <span className="jsq-hd-sub">Updated 2h ago</span>
      </div>
      <div className="jsq-stats-row">
        <div className="jsq-stat"><strong>57</strong><span>Jobs available</span></div>
        <div className="jsq-stat"><strong>9</strong><span>New today</span></div>
        <div className="jsq-stat"><strong>38%</strong><span>Direct contact</span></div>
      </div>

      {/* Signal breakdown */}
      <div className="jsq-section">
        <p className="jsq-section-title">Signal Breakdown</p>
        <div className="jsq-signals">
          {SIGNALS.map(s => (
            <div key={s.key} className="jsq-signal-row">
              <span className="jsq-signal-emoji">{s.emoji}</span>
              <span className="jsq-signal-label">{s.label}</span>
              <div className="jsq-signal-bar">
                <div className="jsq-signal-fill" style={{ width: `${(s.count / s.total) * 100}%`, background: s.color + '33' }}>
                  <div className="jsq-signal-fill-inner" style={{ background: s.color }} />
                </div>
              </div>
              <span className="jsq-signal-count">{s.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Top companies */}
      <div className="jsq-section">
        <p className="jsq-section-title">Actively Hiring</p>
        <div className="jsq-companies">
          {TOP_COMPANIES.map(c => (
            <div key={c.name} className="jsq-company-row">
              <span className="jsq-co-av" style={{ background: c.color + '22', color: c.color }}>{c.initials}</span>
              <span className="jsq-co-name">{c.name}</span>
              <span className="jsq-co-roles">{c.roles} role{c.roles > 1 ? 's' : ''}</span>
              <span className={`jsq-co-src jsq-co-src--${c.source}`}>{c.source === 'linkedin' ? 'LinkedIn' : 'Platform'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Response time by source */}
      <div className="jsq-section">
        <p className="jsq-section-title">Avg. Response Time</p>
        <div className="jsq-resp-row">
          <div className="jsq-resp-item">
            <span className="jsq-resp-src jsq-resp-src--platform">Platform</span>
            <strong className="jsq-resp-val">~12h</strong>
            <span className="jsq-resp-tag">Faster</span>
          </div>
          <div className="jsq-resp-divider" />
          <div className="jsq-resp-item">
            <span className="jsq-resp-src jsq-resp-src--linkedin">LinkedIn</span>
            <strong className="jsq-resp-val">~48h</strong>
          </div>
        </div>
      </div>

    </div>
  )
}

// ── Figma icon assets (node 8-2884) ────────────────────────────────
const FIG_LOGO      = 'https://www.figma.com/api/mcp/asset/9d629858-9234-493d-9671-3f1d3dec7396'
const FIG_JOB_BODY  = 'https://www.figma.com/api/mcp/asset/f6b54cef-4b85-4d1c-a2e6-06e20ec36b97'
const FIG_JOB_SIDE  = 'https://www.figma.com/api/mcp/asset/307b6c66-c311-444f-97ec-43f1351bd4f6'
const FIG_JOB_TOP   = 'https://www.figma.com/api/mcp/asset/f34cd908-d94f-492c-aa5b-5b469aa0eb9e'
const FIG_AUTO      = 'https://www.figma.com/api/mcp/asset/666eafec-9df9-4c81-be34-45bdb3411510'
const FIG_PROF      = 'https://www.figma.com/api/mcp/asset/7187f84a-4368-4c89-bd4f-fa9562cc4491'
const FIG_RESUME    = 'https://www.figma.com/api/mcp/asset/763ea0e6-86d1-4a07-8a09-580317b98e3c'
const FIG_PREF      = 'https://www.figma.com/api/mcp/asset/7cca0475-9dd6-4e73-9ae6-be42e520dc43'
const FIG_REFER     = 'https://www.figma.com/api/mcp/asset/8ff2bb3b-d3be-43c4-937b-43f3ca4ac9fc'
const FIG_USAGE     = 'https://www.figma.com/api/mcp/asset/39e73a81-1258-4470-90b2-b6797b717114'
const FIG_SET       = 'https://www.figma.com/api/mcp/asset/d3c93eac-1edc-4cb2-9341-ae7f9f2a3f98'

// Jobs icon: 4-part composition matching Figma exactly
const JobsIcon = () => (
  <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
    <div style={{ position: 'absolute', top: '28.57%', right: '3.57%', bottom: '3.57%', left: '3.57%' }}>
      <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={FIG_JOB_BODY} />
    </div>
    <div style={{ position: 'absolute', top: '28.57%', right: '71.43%', bottom: '3.57%', left: '28.57%' }}>
      <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={FIG_JOB_SIDE} />
    </div>
    <div style={{ position: 'absolute', top: '28.57%', right: '28.57%', bottom: '3.57%', left: '71.43%' }}>
      <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={FIG_JOB_SIDE} />
    </div>
    <div style={{ position: 'absolute', top: '10.71%', right: '32.14%', bottom: '71.43%', left: '32.14%' }}>
      <img alt="" style={{ display: 'block', width: '100%', height: '100%' }} src={FIG_JOB_TOP} />
    </div>
  </div>
)

const FigIcon = ({ src }: { src: string }) => (
  <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0, overflow: 'hidden' }}>
    <img alt="" style={{ position: 'absolute', inset: '-0.67%', display: 'block', width: '101.34%', height: '101.34%', objectFit: 'contain' }} src={src} />
  </div>
)

// ── Sidebar nav ────────────────────────────────────────────────────
const NAV_MAIN = [
  { label: 'Jobs',           active: true,  icon: <JobsIcon />,                fontClass: 'jb-nav-font-main' },
  { label: 'Auto Apply',     active: false, icon: <FigIcon src={FIG_AUTO} />,  fontClass: 'jb-nav-font-main' },
  { label: 'Profile',        active: false, icon: <FigIcon src={FIG_PROF} />,  fontClass: 'jb-nav-font-main' },
  { label: 'Resume',         active: false, icon: <FigIcon src={FIG_RESUME} />,fontClass: 'jb-nav-font-main' },
  { label: 'Job Preference', active: false, icon: <FigIcon src={FIG_PREF} />,  fontClass: 'jb-nav-font-main' },
]
const NAV_USER_MENU = [
  { label: 'Refer & Affiliate', icon: <FigIcon src={FIG_REFER} /> },
  { label: 'Usage',             icon: <FigIcon src={FIG_USAGE} /> },
  { label: 'Setting',           icon: <FigIcon src={FIG_SET} />   },
]

// ── Helpers ────────────────────────────────────────────────────────
function CompanyAvatar({ name, color, size = 36 }: { name: string; color: string; size?: number }) {
  const initials = name.split(' ').slice(0, 2).map(w => w[0]).join('')
  return (
    <div className="jb-co-av" style={{ '--co': color, '--sz': `${size}px` } as React.CSSProperties}>
      {initials}
    </div>
  )
}

function MatchRing({ pct }: { pct: number }) {
  const tier = pct >= 90 ? 'elite' : pct >= 80 ? 'high' : pct >= 65 ? 'mid' : 'low'
  return (
    <div className={`jb-ring jb-ring--${tier}`} style={{ '--p': `${pct}%` } as React.CSSProperties}>
      <div className="jb-ring-inner">
        <span className="jb-ring-pct">{pct}<span className="jb-ring-pc">%</span></span>
        <span className="jb-ring-lbl">match</span>
      </div>
    </div>
  )
}

function WorkModeBadge({ mode }: { mode: Job['workMode'] }) {
  const cls = { Remote: 'jb-wm--remote', Hybrid: 'jb-wm--hybrid', 'On-site': 'jb-wm--onsite' }[mode]
  return <span className={`jb-wm ${cls}`}>{mode}</span>
}

const STATUS_META: Record<AppStatus, { label: string; cls: string }> = {
  pending: { label: 'Pending', cls: 'aa-s--pending' },
  applied: { label: 'Applied', cls: 'aa-s--applied' },
}

// ── Job Card ───────────────────────────────────────────────────────
function JobCard({ job, onSave }: { job: Job; onSave: (id: number) => void }) {
  const isApplied = !!job.appliedDate

  return (
    <article className="jb-card">

      {/* Top row: time · applicants + save / link icons */}
      <div className="jb-card-top">
        <div className="jb-card-top-meta">
          <span className="jb-mt">{job.posted}</span>
          <span className="jb-mtsep" />
          <span className="jb-mt">{job.applicants} applicants</span>
          {job.hot && <span className="jb-hot">🔥 Hot</span>}
        </div>
        <div className="jb-card-top-actions">
          <button
            className={`jb-ico${job.saved ? ' is-saved' : ''}`}
            onClick={() => onSave(job.id)}
            aria-label="Save job"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round"
              fill={job.saved ? 'var(--color-main-default)' : 'none'}
              stroke={job.saved ? 'var(--color-main-default)' : 'currentColor'}>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <a className="jb-ico" href="#" aria-label="Open original listing">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Header: company avatar + name/title | match ring */}
      <div className="jb-card-hd">
        <div className="jb-card-hd-left">
          <CompanyAvatar name={job.company} color={job.companyColor} size={40} />
          <div className="jb-card-hd-info">
            <p className="jb-co">{job.company}</p>
            <h3 className="jb-title">{job.title}</h3>
          </div>
        </div>
        <MatchRing pct={job.match} />
      </div>

      {/* Location */}
      <div className="jb-loc-row">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        <span className="jb-loc">{job.location}</span>
      </div>

      {/* Tags: work mode · type · level · exp · salary */}
      <div className="jb-card-tags">
        <WorkModeBadge mode={job.workMode} />
        <span className="jb-tag">{job.type}</span>
        <span className="jb-tag">{job.level}</span>
        <span className="jb-tag">{job.exp} exp</span>
        <span className="jb-tag jb-tag--salary">{job.salary}</span>
      </div>

      {/* Footer: primary actions */}
      <div className="jb-card-ft">
        <div className="jb-ft-actions">
          <button className="jb-ref-btn">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Referral
          </button>
          {isApplied ? (
            <span className="jb-applied-btn">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Applied {job.appliedDate}
              {job.badges.includes('Auto Applied') && <span className="jb-applied-auto">· Auto</span>}
            </span>
          ) : (
            <button className="jb-apply-btn">
              Apply Now
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </article>
  )
}

// ── Auto Apply Panel ───────────────────────────────────────────────
function AutoApplyPanel() {
  const [enabled, setEnabled] = useState(true)
  const creditsRemaining = 103, creditsTotal = 150

  return (
    <div className="aa-panel">
      {/* Header */}
      <div className="aa-hd">
        <div className="aa-hd-left">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          <span className="aa-hd-title">Auto Apply</span>
        </div>
        <button className={`aa-toggle${enabled ? ' is-on' : ''}`} onClick={() => setEnabled(v => !v)} aria-label="Toggle Auto Apply">
          <span className="aa-toggle-knob" />
        </button>
      </div>

      {/* Live status */}
      <div className={`aa-status${enabled ? ' aa-status--on' : ''}`}>
        <div className="aa-status-row">
          <span className={`aa-pulse${enabled ? ' is-live' : ''}`} />
          <span className="aa-status-label">{enabled ? 'Running' : 'Paused'}</span>
          <div className="aa-credit-pill" tabIndex={0}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="aa-credit-bolt">
              <polygon points="13,2 4,14 11,14 11,22 20,10 13,10" fill="var(--color-text-default)"/>
            </svg>
            <span className="aa-credit-num">{creditsRemaining}</span>
            {/* Hover popover */}
            <div className="aa-credit-popover">
              <div className="aa-cp-card">
                <div className="aa-cp-row aa-cp-plan">
                  <span className="aa-cp-plan-name">Free</span>
                  <button className="aa-cp-upgrade">Upgrade</button>
                </div>
                <div className="aa-cp-divider" />
                <div className="aa-cp-row aa-cp-credits-row">
                  <div className="aa-cp-credits-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <polygon points="13,2 4,14 11,14 11,22 20,10 13,10" fill="var(--color-text-default)"/>
                    </svg>
                    <span>Credits</span>
                  </div>
                  <span className="aa-cp-credits-val">{creditsRemaining}</span>
                </div>
                <button className="aa-cp-usage">Usage detail <span>→</span></button>
              </div>
            </div>
          </div>
        </div>
        <div className="aa-steps">
          {['Scanning', 'Matching', 'Applying'].flatMap((s, i) => {
            const delay = i * 0.9
            const items = []
            if (i > 0) items.push(
              <span key={`arrow-${i}`} className={`aa-step-arrow${enabled ? ' is-active' : ''}`}
                style={enabled ? { animationDelay: `${delay - 0.45}s` } : undefined}>›</span>
            )
            items.push(
              <div key={s} className={`aa-step${enabled ? ' is-active' : ''}`}
                style={enabled ? { animationDelay: `${delay}s` } : undefined}>
                <span className="aa-step-dot" />
                {s}
              </div>
            )
            return items
          })}
        </div>
        <div className="aa-today-stats">
          <div className="aa-tstat">
            <strong>12</strong>
            <span>Today</span>
          </div>
          <div className="aa-tstat">
            <strong>315</strong>
            <span>Total</span>
          </div>
          <div className="aa-tstat">
            <strong>3</strong>
            <span>Pending</span>
          </div>
        </div>
      </div>

      {/* Credit alerts */}
      <div className="aa-alert aa-alert--error">
        <span className="aa-alert-msg">You are out of credit</span>
        <button className="aa-alert-cta">Upgrade</button>
      </div>
      <div className="aa-alert aa-alert--warn">
        <span className="aa-alert-msg">You've used 90% of credit</span>
        <button className="aa-alert-cta">Upgrade</button>
      </div>

      {/* Live Workspace */}
      <div className="aa-list-hd">
        <div className="aa-list-hd-left">
          <span className={`aa-pulse${enabled ? ' is-live' : ''}`} style={{ width: 7, height: 7 }} />
          <span className="aa-list-title">Live Workspace</span>
        </div>
        <span className="aa-list-count">{AUTO_APPS.length}</span>
      </div>
      <div className="aa-list">
        {AUTO_APPS.map((app, i) => {
          const s = STATUS_META[app.status]
          return (
            <div
              key={app.id}
              className={`aa-item aa-item--${app.status}`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`aa-item-av-wrap${app.status === 'applied' ? ' aa-item--applied' : ''}`}>
                <CompanyAvatar name={app.company} color={app.companyColor} size={32} />
              </div>
              <div className="aa-item-info">
                <p className="aa-item-title">{app.title}</p>
                <p className="aa-item-co">{app.company} · {app.date}</p>
              </div>
              <span className={`aa-status-badge ${s.cls}`}>{s.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Floating Nova Chat ─────────────────────────────────────────────
const NOVA_CHIPS = ['Explore Company Questions', 'Analyze My Resume', 'Connect with Employees']

function FloatingChat() {
  const [open, setOpen] = useState(false)
  const [msg, setMsg] = useState('')

  return (
    <div className="nova-float">
      {open && (
        <div className="nova-float-panel">
          <div className="nova-float-hd">
            <div className="nova-float-av">
              <img src="https://www.figma.com/api/mcp/asset/ba1b2d6c-a0cd-4a03-a34c-87e122c90c3b" alt="" width={20} height={20} />
            </div>
            <div>
              <p className="nova-float-name">Nova</p>
              <p className="nova-float-sub">AI Career Assistant</p>
            </div>
            <span className="nova-float-online" />
            <button className="nova-float-close" onClick={() => setOpen(false)} aria-label="Close">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="nova-float-body">
            <div className="nova-float-bubble">
              <p><strong>Hi! 👋 I&apos;m Nova.</strong></p>
              <p>Your personal AI career assistant. Let&apos;s get started!</p>
            </div>
            <div className="nova-float-chips">
              {NOVA_CHIPS.map(c => (
                <button key={c} className="nova-float-chip">{c}</button>
              ))}
            </div>
          </div>
          <div className="nova-float-input-row">
            <input
              className="nova-float-input"
              placeholder="Ask me anything…"
              value={msg}
              onChange={e => setMsg(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') setMsg('') }}
            />
            <button className={`nova-float-send${msg ? ' is-ready' : ''}`} aria-label="Send">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            </button>
          </div>
        </div>
      )}

      <button className={`nova-float-btn${open ? ' is-open' : ''}`} onClick={() => setOpen(v => !v)} aria-label="Open Nova AI chat">
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        ) : (
          <img src="https://www.figma.com/api/mcp/asset/ba1b2d6c-a0cd-4a03-a34c-87e122c90c3b" alt="Nova" width={24} height={24} />
        )}
        {!open && <span className="nova-float-pip" />}
      </button>
    </div>
  )
}

// ── Location data ──────────────────────────────────────────────────
const LOC_QUICK = ['United States', 'Canada', 'United Kingdom', 'Europe', 'Asia Pacific']
const LOC_ALL = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Seattle, WA',
  'Los Angeles, CA', 'Chicago, IL', 'Boston, MA', 'Denver, CO',
  'Atlanta, GA', 'Miami, FL', 'Dallas, TX', 'Portland, OR', 'San Diego, CA',
  'Toronto, ON', 'Vancouver, BC', 'Montreal, QC', 'Calgary, AB',
  'London, UK', 'Manchester, UK', 'Edinburgh, UK', 'Bristol, UK',
  'Berlin, Germany', 'Munich, Germany', 'Hamburg, Germany',
  'Amsterdam, Netherlands', 'Paris, France', 'Stockholm, Sweden',
  'Zurich, Switzerland', 'Dublin, Ireland', 'Barcelona, Spain',
  'Madrid, Spain', 'Milan, Italy', 'Rome, Italy', 'Lisbon, Portugal',
  'Copenhagen, Denmark', 'Oslo, Norway', 'Helsinki, Finland',
  'Warsaw, Poland', 'Prague, Czech Republic', 'Vienna, Austria',
  'Singapore', 'Tokyo, Japan', 'Osaka, Japan',
  'Sydney, Australia', 'Melbourne, Australia', 'Brisbane, Australia',
  'Seoul, South Korea', 'Hong Kong', 'Taipei, Taiwan',
  'Shanghai, China', 'Beijing, China', 'Shenzhen, China',
  'Bangalore, India', 'Mumbai, India', 'Delhi, India', 'Hyderabad, India',
  'Dubai, UAE', 'Abu Dhabi, UAE', 'Tel Aviv, Israel',
  'São Paulo, Brazil', 'Buenos Aires, Argentina', 'Mexico City, Mexico',
  'Bogotá, Colombia', 'Santiago, Chile',
]

// ── Filter label helpers ────────────────────────────────────────────
const WORK_MODE_DISPLAY: Record<string, string> = { remote: 'Remote', hybrid: 'Hybrid', onsite: 'On-site' }

function fdropLabel(selected: Set<string>, fallback: string, map?: Record<string, string>): React.ReactNode {
  if (selected.size === 0) return fallback
  const first = Array.from(selected)[0]
  const label = map ? (map[first] ?? first) : first
  if (selected.size === 1) return label
  return <>{label}<span className="jb-fdrop-count">+{selected.size - 1}</span></>
}

// ── Page ───────────────────────────────────────────────────────────
export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<'recommend' | 'square'>('recommend')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [jobs, setJobs] = useState(JOBS)
  const [workModes, setWorkModes] = useState<Set<string>>(new Set())
  const [sources, setSources] = useState<Set<string>>(new Set())
  const [referralOnly, setReferralOnly] = useState(false)
  const [manualOnly, setManualOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'recommended' | 'match' | 'recent'>('recommended')
  const [jsSortBy, setJsSortBy] = useState<'recommended' | 'recent'>('recommended')
  const [contactItem, setContactItem] = useState<JSItem | null>(null)
  const [openFilter, setOpenFilter] = useState<string | null>(null)
  const [jobTypes, setJobTypes] = useState<Set<string>>(new Set())
  const [levels, setLevels] = useState<Set<string>>(new Set())
  const [locSearch, setLocSearch] = useState('')
  const [selectedLocations, setSelectedLocations] = useState<Set<string>>(new Set())
  const [jsSignals, setJsSignals] = useState<Set<string>>(new Set())
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenFilter(null)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const toggleSave = (id: number) => setJobs(prev => prev.map(j => j.id === id ? { ...j, saved: !j.saved } : j))
  const toggleMode = (m: string) => setWorkModes(prev => {
    const next = new Set(prev); next.has(m) ? next.delete(m) : next.add(m); return next
  })
  const toggleSource = (s: string) => setSources(prev => {
    const next = new Set(prev); next.has(s) ? next.delete(s) : next.add(s); return next
  })
  const toggleJobType = (t: string) => setJobTypes(prev => {
    const n = new Set(prev); n.has(t) ? n.delete(t) : n.add(t); return n
  })
  const toggleLevel = (l: string) => setLevels(prev => {
    const n = new Set(prev); n.has(l) ? n.delete(l) : n.add(l); return n
  })
  const toggleLocation = (loc: string) => setSelectedLocations(prev => {
    const n = new Set(prev); n.has(loc) ? n.delete(loc) : n.add(loc); return n
  })
  const toggleJsSignal = (s: string) => setJsSignals(prev => {
    const n = new Set(prev); n.has(s) ? n.delete(s) : n.add(s); return n
  })

  const SORT_LABELS: Record<string, string> = { recommended: 'Recommended', match: 'Top matched', recent: 'Most recent' }

  return (
    <div className="jb-layout">

      {/* Sidebar */}
      <aside className="jb-sidebar">
        <div className="jb-brand">
          <img src={FIG_LOGO} alt="JobNova" width={126} height={36} style={{ objectFit: 'contain' }} />
        </div>
        <nav className="jb-nav">
          {NAV_MAIN.map(item => (
            <a key={item.label} href="#" className={`jb-nav-item${item.active ? ' is-active' : ''} ${item.fontClass}`}>
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        {/* Referral card */}
        <div className="jb-refer-card">
          <svg className="jb-refer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <div className="jb-refer-text">
            <p className="jb-refer-title">Share JobNova with a friend</p>
            <p className="jb-refer-sub">Get 500 credits each</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, color: 'var(--color-text-second-2)' }}><polyline points="9 18 15 12 9 6"/></svg>
        </div>

        {/* User row with dropdown */}
        <div className="jb-user-wrap">
          <div className="jb-user-row" onClick={() => setUserMenuOpen(v => !v)}>
            <div className="jb-user-av">N</div>
            <div><p className="jb-user-name">Nova User</p><p className="jb-user-plan">Pro Plan</p></div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ marginLeft: 'auto', color: 'var(--color-text-second-2)', transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(90deg)' : 'none' }}><polyline points="9 18 15 12 9 6"/></svg>
          </div>
          {userMenuOpen && (
            <div className="jb-user-menu">
              {NAV_USER_MENU.map(item => (
                <a key={item.label} href="#" className="jb-user-menu-item">
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="jb-main">
        {/* Tab bar — fixed header */}
        <div className="jb-main-hd">
          <div className="jb-tab-bar">
            <div className="jb-seg">
              <button className={`jb-seg-item${activeTab === 'recommend' ? ' is-active' : ''}`} onClick={() => setActiveTab('recommend')}>
                Recommend Jobs
                <span className="jb-seg-n">{JOBS.length}</span>
              </button>
              <button className={`jb-seg-item${activeTab === 'square' ? ' is-active' : ''}`} onClick={() => setActiveTab('square')}>
                Job Square
              </button>
            </div>
            <button className="jb-fpill jb-fpill--saved">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              Saved
            </button>
          </div>
        </div>

        {/* Scrollable content: filters + results + cards */}
        <div className="jb-list">
          <div className="jb-filters" ref={filterRef}>
            {/* Row 1: Search + Sort dropdown */}
            <div className="jb-filter-row1">
              <div className={`jb-search${searchQuery ? ' is-filled' : ''}`}>
                <svg className="jb-search-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input className="jb-search-input" placeholder="Search roles, companies…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                {searchQuery && (
                  <button className="jb-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                )}
              </div>
              <div className="jb-drop-wrap">
                <button className={`jb-fdrop jb-fdrop--sort${openFilter === 'sort' ? ' is-open' : ''}`}
                  onClick={() => setOpenFilter(f => f === 'sort' ? null : 'sort')}>
                  {SORT_LABELS[sortBy]}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'sort' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                </button>
                {openFilter === 'sort' && (
                  <div className="jb-filter-panel jb-filter-panel--right">
                    {(['recommended', 'match', 'recent'] as const)
                      .filter(v => activeTab === 'recommend' || v !== 'match')
                      .map(v => (
                        <button key={v} className={`jb-panel-item${sortBy === v ? ' is-selected' : ''}`}
                          onClick={() => { setSortBy(v); setOpenFilter(null) }}>
                          {SORT_LABELS[v]}
                        </button>
                      ))}
                  </div>
                )}
              </div>
            </div>

            {/* Row 2: dynamic filters per tab */}
            {activeTab === 'recommend' ? (
              <div className="jb-filter-row2">
                {/* Work Mode dropdown */}
                <div className="jb-drop-wrap">
                  <button className={`jb-fdrop${openFilter === 'workmode' ? ' is-open' : ''}${workModes.size > 0 ? ' is-active' : ''}`}
                    onClick={() => setOpenFilter(f => f === 'workmode' ? null : 'workmode')}>
                    {fdropLabel(workModes, 'Work Mode', WORK_MODE_DISPLAY)}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'workmode' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFilter === 'workmode' && (
                    <div className="jb-filter-panel">
                      <p className="jb-panel-label">Work Mode</p>
                      {([['Remote', 'remote'], ['Hybrid', 'hybrid'], ['On-site', 'onsite']] as const).map(([label, key]) => (
                        <button key={key} className="jb-panel-check-row" onClick={() => toggleMode(key)}>
                          <span className={`jb-panel-checkbox${workModes.has(key) ? ' is-checked' : ''}`}>
                            {workModes.has(key) && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </span>
                          {label}
                        </button>
                      ))}
                      <div className="jb-panel-footer jb-panel-footer--single">
                        <button className="jb-panel-confirm" onClick={() => setOpenFilter(null)}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>
                <div className="jb-filter-sep" />

                {/* Job Type dropdown */}
                <div className="jb-drop-wrap">
                  <button className={`jb-fdrop${openFilter === 'jobtype' ? ' is-open' : ''}${jobTypes.size > 0 ? ' is-active' : ''}`}
                    onClick={() => setOpenFilter(f => f === 'jobtype' ? null : 'jobtype')}>
                    {fdropLabel(jobTypes, 'Job Type')}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'jobtype' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFilter === 'jobtype' && (
                    <div className="jb-filter-panel">
                      <p className="jb-panel-label">Job Type</p>
                      {['Full-time', 'Contract', 'Part-time', 'Internship'].map(t => (
                        <button key={t} className="jb-panel-check-row" onClick={() => toggleJobType(t)}>
                          <span className={`jb-panel-checkbox${jobTypes.has(t) ? ' is-checked' : ''}`}>
                            {jobTypes.has(t) && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </span>
                          {t}
                        </button>
                      ))}
                      <div className="jb-panel-footer jb-panel-footer--single">
                        <button className="jb-panel-confirm" onClick={() => setOpenFilter(null)}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Level dropdown */}
                <div className="jb-drop-wrap">
                  <button className={`jb-fdrop${openFilter === 'level' ? ' is-open' : ''}${levels.size > 0 ? ' is-active' : ''}`}
                    onClick={() => setOpenFilter(f => f === 'level' ? null : 'level')}>
                    {fdropLabel(levels, 'Level')}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'level' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFilter === 'level' && (
                    <div className="jb-filter-panel">
                      <p className="jb-panel-label">Level</p>
                      {['Intern / New Grad', 'Entry-Mid', 'Mid', 'Senior', 'Lead', 'Director+'].map(l => (
                        <button key={l} className="jb-panel-check-row" onClick={() => toggleLevel(l)}>
                          <span className={`jb-panel-checkbox${levels.has(l) ? ' is-checked' : ''}`}>
                            {levels.has(l) && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </span>
                          {l}
                        </button>
                      ))}
                      <div className="jb-panel-footer jb-panel-footer--single">
                        <button className="jb-panel-confirm" onClick={() => setOpenFilter(null)}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location dropdown */}
                <div className="jb-drop-wrap">
                  <button className={`jb-fdrop${openFilter === 'location' ? ' is-open' : ''}${selectedLocations.size > 0 ? ' is-active' : ''}`}
                    onClick={() => setOpenFilter(f => f === 'location' ? null : 'location')}>
                    {fdropLabel(selectedLocations, 'Location')}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'location' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFilter === 'location' && (
                    <div className="jb-filter-panel jb-filter-panel--loc jb-filter-panel--right">
                      {/* Quick pick */}
                      <p className="jb-panel-label">Quick pick</p>
                      <div className="jb-loc-quick">
                        {LOC_QUICK.map(r => (
                          <button key={r} className={`jb-loc-qpill${selectedLocations.has(r) ? ' is-on' : ''}`} onClick={() => toggleLocation(r)}>
                            {r}
                          </button>
                        ))}
                      </div>

                      {/* Combobox: chips inside input + floating results dropdown */}
                      <div className="jb-loc-combobox">
                        <div className="jb-loc-input-area">
                          {Array.from(selectedLocations).map(loc => (
                            <span key={loc} className="jb-loc-inline-chip">
                              {loc}
                              <button className="jb-loc-inline-chip-x" onClick={e => { e.stopPropagation(); toggleLocation(loc) }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                              </button>
                            </span>
                          ))}
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--color-text-second-2)', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          <input
                            className="jb-loc-text-input"
                            placeholder={selectedLocations.size === 0 ? 'Search city or country…' : ''}
                            value={locSearch}
                            onChange={e => setLocSearch(e.target.value)}
                          />
                          {locSearch && (
                            <button className="jb-loc-searchbox-clear" onClick={() => setLocSearch('')}>
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                            </button>
                          )}
                        </div>
                        {locSearch && (
                          <div className="jb-loc-dropdown">
                            {LOC_ALL.filter(c => c.toLowerCase().includes(locSearch.toLowerCase())).map(city => (
                              <button key={city} className={`jb-loc-result-row${selectedLocations.has(city) ? ' is-selected' : ''}`} onClick={() => { toggleLocation(city); setLocSearch('') }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                {city}
                                {selectedLocations.has(city) && <svg className="jb-loc-check" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                              </button>
                            ))}
                            {LOC_ALL.filter(c => c.toLowerCase().includes(locSearch.toLowerCase())).length === 0 && (
                              <p className="jb-loc-no-results">No cities found</p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="jb-panel-footer">
                        <button className="jb-panel-reset" onClick={() => { setSelectedLocations(new Set()); setLocSearch('') }}>Reset</button>
                        <button className="jb-panel-confirm" onClick={() => setOpenFilter(null)}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="jb-filter-sep" />
                <button className={`jb-fpill jb-fpill--manual${manualOnly ? ' is-on' : ''}`} onClick={() => setManualOnly(v => !v)} style={{ marginLeft: 'auto', flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
                  Manual apply
                </button>
                <button className={`jb-fpill jb-fpill--referral${referralOnly ? ' is-on' : ''}`} onClick={() => setReferralOnly(v => !v)} style={{ flexShrink: 0 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  Referral only
                </button>
              </div>
            ) : (
              <div className="jb-filter-row2">
                {/* Signal dropdown */}
                <div className="jb-drop-wrap">
                  <button className={`jb-fdrop${openFilter === 'signal' ? ' is-open' : ''}${jsSignals.size > 0 ? ' is-active' : ''}`}
                    onClick={() => setOpenFilter(f => f === 'signal' ? null : 'signal')}>
                    {fdropLabel(jsSignals, 'Signal')}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'signal' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFilter === 'signal' && (
                    <div className="jb-filter-panel">
                      <p className="jb-panel-label">Signal</p>
                      {['Founding', 'Hiring Fast', 'New Team', 'Expansion'].map(s => (
                        <button key={s} className="jb-panel-check-row" onClick={() => toggleJsSignal(s)}>
                          <span className={`jb-panel-checkbox${jsSignals.has(s) ? ' is-checked' : ''}`}>
                            {jsSignals.has(s) && <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                          </span>
                          {s}
                        </button>
                      ))}
                      <div className="jb-panel-footer jb-panel-footer--single">
                        <button className="jb-panel-confirm" onClick={() => setOpenFilter(null)}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Location dropdown — same panel as Recommend Jobs */}
                <div className="jb-drop-wrap">
                  <button className={`jb-fdrop${openFilter === 'js-location' ? ' is-open' : ''}${selectedLocations.size > 0 ? ' is-active' : ''}`}
                    onClick={() => setOpenFilter(f => f === 'js-location' ? null : 'js-location')}>
                    {fdropLabel(selectedLocations, 'Location')}
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ transition: 'transform 0.2s', transform: openFilter === 'js-location' ? 'rotate(180deg)' : 'none' }}><polyline points="6 9 12 15 18 9"/></svg>
                  </button>
                  {openFilter === 'js-location' && (
                    <div className="jb-filter-panel jb-filter-panel--loc">
                      <p className="jb-panel-label">Quick pick</p>
                      <div className="jb-loc-quick">
                        {LOC_QUICK.map(r => (
                          <button key={r} className={`jb-loc-qpill${selectedLocations.has(r) ? ' is-on' : ''}`} onClick={() => toggleLocation(r)}>{r}</button>
                        ))}
                      </div>
                      <div className="jb-loc-combobox">
                        <div className="jb-loc-input-area">
                          {Array.from(selectedLocations).map(loc => (
                            <span key={loc} className="jb-loc-inline-chip">
                              {loc}
                              <button className="jb-loc-inline-chip-x" onClick={e => { e.stopPropagation(); toggleLocation(loc) }}>
                                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                              </button>
                            </span>
                          ))}
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ color: 'var(--color-text-second-2)', flexShrink: 0 }}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                          <input className="jb-loc-text-input" placeholder={selectedLocations.size === 0 ? 'Search city or country…' : ''} value={locSearch} onChange={e => setLocSearch(e.target.value)} />
                          {locSearch && <button className="jb-loc-searchbox-clear" onClick={() => setLocSearch('')}><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>}
                        </div>
                        {locSearch && (
                          <div className="jb-loc-dropdown">
                            {LOC_ALL.filter(c => c.toLowerCase().includes(locSearch.toLowerCase())).map(city => (
                              <button key={city} className={`jb-loc-result-row${selectedLocations.has(city) ? ' is-selected' : ''}`} onClick={() => { toggleLocation(city); setLocSearch('') }}>
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                {city}
                                {selectedLocations.has(city) && <svg className="jb-loc-check" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="jb-panel-footer">
                        <button className="jb-panel-reset" onClick={() => { setSelectedLocations(new Set()); setLocSearch('') }}>Reset</button>
                        <button className="jb-panel-confirm" onClick={() => setOpenFilter(null)}>Confirm</button>
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, flexShrink: 0 }}>
                  {([['LinkedIn', 'linkedin'], ['Platform', 'platform']] as const).map(([label, key]) => (
                    <button key={key} className={`jb-fpill jb-fpill--remote${sources.has(key) ? ' is-on' : ''}`} onClick={() => toggleSource(key)}>
                      {sources.has(key) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {activeTab === 'recommend'
            ? jobs.map(job => <JobCard key={job.id} job={job} onSave={toggleSave} />)
            : <div className="js-grid">{JOB_SQUARE.map(item => <JobSquareCard key={item.id} item={item} onContact={setContactItem} />)}</div>
          }
        </div>
      </main>

      {/* Right panel — toggles based on active tab */}
      <aside className="jb-panel">
        {activeTab === 'recommend' ? <AutoApplyPanel /> : <JobSquarePanel />}
      </aside>

      {/* Floating Nova Chat */}
      <FloatingChat />

      {/* Contact modal */}
      {contactItem && <ContactModal key={contactItem.id} item={contactItem} onClose={() => setContactItem(null)} />}
    </div>
  )
}
