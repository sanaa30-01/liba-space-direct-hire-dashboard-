'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Bell,
  LifeBuoy,
  MessageCircle,
  Rocket,
  Search,
  Sparkles,
  Target,
  Wallet,
} from 'lucide-react'

type FaqCategory = 'all' | 'getting-started' | 'matching' | 'billing' | 'alerts' | 'support'

type FaqItem = {
  q: string
  a: string
  category: Exclude<FaqCategory, 'all'>
  popular?: boolean
}

const categories: { id: FaqCategory; label: string; icon: typeof Sparkles }[] = [
  { id: 'all', label: 'All', icon: Sparkles },
  { id: 'getting-started', label: 'Getting started', icon: Rocket },
  { id: 'matching', label: 'Matching & jobs', icon: Target },
  { id: 'billing', label: 'Billing', icon: Wallet },
  { id: 'alerts', label: 'Alerts', icon: Bell },
  { id: 'support', label: 'Support', icon: LifeBuoy },
]

const faqs: FaqItem[] = [
  {
    q: 'How does it work?',
    a: 'JobNova uses advanced AI algorithms to match your skills and interests to global jobs that are difficult to find on mainstream job sites. You\'ll receive daily, personalized recommendations. Nearly all jobs we surface are postings listed within the past 8 hours.',
    category: 'getting-started',
    popular: true,
  },
  {
    q: 'Which areas and functions do you support for job searching?',
    a: 'JobNova covers 30+ industries including tech, finance, consulting, design, and marketing — across product, engineering, operations, and more. New categories are added regularly based on user demand.',
    category: 'matching',
  },
  {
    q: 'Can I cancel my subscription at any time?',
    a: 'Yes — all paid plans can be cancelled anytime. Your access remains active until the end of the current billing period, with no additional charges.',
    category: 'billing',
  },
  {
    q: 'Who can I contact for support or queries?',
    a: 'You can reach our support team at support@jobnova.ai or via the in-app chat. We typically respond within a few hours on business days.',
    category: 'support',
  },
  {
    q: 'How many job recommendations will I receive?',
    a: 'Free plan users receive up to 5 curated matches daily. Pro and Pro+ users receive unlimited personalized recommendations with priority delivery before listings go public.',
    category: 'matching',
  },
  {
    q: 'How often will I receive job alerts?',
    a: 'You can configure your alert frequency — instantly, daily digest, or weekly summary. Most users opt for real-time alerts so they can be first to apply.',
    category: 'alerts',
  },
]

export default function Faq() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqs[0].q)
  const [activeCategory, setActiveCategory] = useState<FaqCategory>('all')
  const [query, setQuery] = useState('')

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase()
    return faqs.filter(item => {
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory
      const searchMatch =
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q)
      return categoryMatch && searchMatch
    })
  }, [activeCategory, query])

  useEffect(() => {
    if (openQuestion && !filteredFaqs.some(f => f.q === openQuestion)) {
      setOpenQuestion(filteredFaqs[0]?.q ?? null)
    }
  }, [filteredFaqs, openQuestion])

  const toggle = (question: string) => {
    setOpenQuestion(prev => (prev === question ? null : question))
  }

  return (
    <section className="faq" id="faq">
      <div className="container faq-container">
        <header className="faq-hero">
          <span className="faq-badge">
            <Sparkles size={14} aria-hidden="true" />
            FAQ
          </span>
          <h2 className="faq-title">
            Got <span className="faq-title__mark">questions?</span> We&apos;ve got answers.
          </h2>
          <p className="faq-lead">
            Search, browse by topic, or just start scrolling — everything you need to know is here.
          </p>
          <label className="faq-search">
            <Search size={18} aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Ask anything — try &quot;ATS&quot;, &quot;trial&quot;, &quot;alerts&quot;..."
              aria-label="Search frequently asked questions"
            />
          </label>
        </header>

        <div className="faq-filters" role="tablist" aria-label="FAQ categories">
          {categories.map(cat => {
            const Icon = cat.icon
            const active = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                className={`faq-filter${active ? ' is-active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon size={15} aria-hidden="true" />
                {cat.label}
                {active ? <span className="faq-filter__dot" aria-hidden="true" /> : null}
              </button>
            )
          })}
        </div>

        <div className="faq-layout">
          <div className="faq-list">
            {filteredFaqs.length === 0 ? (
              <p className="faq-empty">No questions match your search. Try another keyword or category.</p>
            ) : (
              filteredFaqs.map((faq, i) => {
                const open = openQuestion === faq.q
                return (
                  <article key={faq.q} className={`faq-item${open ? ' is-open' : ''}`}>
                    <button
                      type="button"
                      className="faq-question"
                      aria-expanded={open}
                      onClick={() => toggle(faq.q)}
                    >
                      <span className="faq-item__index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="faq-item__text">
                        {faq.q}
                        {faq.popular ? (
                          <span className="faq-item__popular">Popular</span>
                        ) : null}
                      </span>
                      <span className="faq-icon" aria-hidden="true">
                        +
                      </span>
                    </button>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </article>
                )
              })
            )}
          </div>

          <aside className="faq-aside">
            <span className="faq-aside__live">
              <span className="faq-aside__live-dot" aria-hidden="true" />
              Live · avg 4 min reply
            </span>
            <h3 className="faq-aside__title">Still curious?</h3>
            <p className="faq-aside__body">
              Talk to a real human on our team — no bots, no forms, no wait queues.
            </p>
            <a href="mailto:support@jobnova.ai" className="faq-aside__cta">
              <MessageCircle size={18} aria-hidden="true" />
              Chat with us
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <div className="faq-aside__stats">
              <div>
                <strong>98%</strong>
                <span>Resolved</span>
              </div>
              <div>
                <strong>4m</strong>
                <span>Avg reply</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>Coverage</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
