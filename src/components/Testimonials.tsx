'use client'

import { useState } from 'react'
import {
  ArrowUpRight,
  Briefcase,
  Clock,
  Sparkles,
  TrendingUp,
} from 'lucide-react'

type CompanyId = 'zoom' | 'canva' | 'microsoft'

type MiniStat = {
  icon: 'clock' | 'briefcase' | 'trend'
  value: string
  label: string
}

type TestimonialStory = {
  id: CompanyId
  name: string
  initial: string
  brandColor: string
  logoSrc?: string
  headline: string
  quote: string
  avatar: string
  person: string
  role: string
  hiredValue: string
  hiredUnit: string
  miniStats: MiniStat[]
}

const stories: TestimonialStory[] = [
  {
    id: 'zoom',
    name: 'Zoom',
    initial: 'Z',
    brandColor: '#2D8CFF',
    logoSrc: '/img/testimonials/zoom.svg',
    headline: 'Found my dream internship fast.',
    quote:
      "As a student, timing is everything. JobNova's real-time updates meant I applied to openings right when they went live. The global coverage helped me land a remote internship with Zoom, something I might have missed entirely without the platform.",
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDjHWvTVf5Z-8iD2_X_a6SsFxwEbSdF9erycA38WKsOf-fRxPVSUSNdMrbyhsSumH15hzn34k0111PZpmmLeji7lCUHJUMBsfBlooujn4YkrnrGcUunHzo88rvDN1eFhhWuVb74CkCdFD-P14GoXCxrN8EMTb_dIdXeCKrqIsxug0Wn-EFTmz3S6i9wFaSAuSWbmquebU4qsPLqxWaRPp99VqTkcu4Tdyb4NW_6rpB51Sbw-TFTvyIWODIENe0Tr0YqPCbDp3mI48o',
    person: 'Liam Thompson',
    role: 'Software Developer (Intern)',
    hiredValue: '11',
    hiredUnit: 'days',
    miniStats: [
      { icon: 'clock', value: '11 days', label: 'Time to offer' },
      { icon: 'briefcase', value: '23', label: 'Applications' },
      { icon: 'trend', value: '48%', label: 'Response rate' },
    ],
  },
  {
    id: 'canva',
    name: 'Canva',
    initial: 'C',
    brandColor: '#00C4CC',
    headline: 'Precision that saves you time.',
    quote:
      "I've used job boards before, but nothing compares to JobNova's accuracy. The match percentages were spot-on. Within two weeks, I was interviewing for positions that aligned perfectly with my design background.",
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCx_1jla1l90mCleTexVwExreSl8RoLki5ZpNe8lH9g51R-UWmiQqcUOAj2p4lWMIGH9OAolFXBzH30wnfwr-BDK6rUwHfR93S6tbKJ6COgl98bMAJbWlgSTzyNF18esyYVqMlNs06bVkxPOYBDB4YLy62IcCS-1xNa5BqSZLBCGDWbHiuKcFNm45OoSELo8OasPIXE9PslnyyTL61UYJzhrpM6-97FYD3lnfplfn7XlVPk3fL_eBbej5xDDaVv3oX8Pt7W1sSOra8',
    person: 'Emily Carter',
    role: 'UI/UX Designer (Full time)',
    hiredValue: '2',
    hiredUnit: 'weeks',
    miniStats: [
      { icon: 'clock', value: '2 weeks', label: 'Time to offer' },
      { icon: 'briefcase', value: '96%', label: 'Match score' },
      { icon: 'trend', value: '7', label: 'Interviews' },
    ],
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    initial: 'M',
    brandColor: '#F25022',
    logoSrc: '/img/testimonials/microsoft.svg',
    headline: 'The most efficient job hunt ever.',
    quote:
      'With JobNova, I no longer had to juggle multiple job sites. It pulled the most relevant openings into one place and kept them updated in real time. I secured my role at Microsoft in less than a month.',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA8X9fN_UTMTLjx6wIvJ3rjVRD9fYQz9YDHzglxWgrPVnYLhoA_pFOeCf1cB8H6iUW9wo5_uk_VGDJdT9Sn4XomPD1mSu25QtOINAw65a1G4FulwPzYFt4scOThG9MzHaaTZlDyP9EocJKzs871MwN46P21aZ1T6f3cL7A5qmZuN8wcCBusx8vOvwlCcMAbZLfk7CAxFwteSWv5r5MqNQPf8pwYZS86LtmoeRs40nvwOZcqgwNeRNxtT_OIpPce0BFqu9kP103r0b0',
    person: 'Sofia Martinez',
    role: 'Software Developer (Full time)',
    hiredValue: '27',
    hiredUnit: 'days',
    miniStats: [
      { icon: 'clock', value: '27 days', label: 'Time to offer' },
      { icon: 'briefcase', value: '41', label: 'Applications' },
      { icon: 'trend', value: '3', label: 'Offers' },
    ],
  },
]

const marqueeLogos = [
  'Canva',
  'Microsoft',
  'Stripe',
  'Figma',
  'Notion',
  'Vercel',
  'Linear',
  'Airbnb',
  'Shopify',
]

function MiniStatIcon({ type }: { type: MiniStat['icon'] }) {
  const props = { size: 18, strokeWidth: 2, 'aria-hidden': true as const }
  if (type === 'clock') return <Clock {...props} />
  if (type === 'briefcase') return <Briefcase {...props} />
  return <TrendingUp {...props} />
}

function CompanyMark({ story, size = 'md' }: { story: TestimonialStory; size?: 'md' | 'lg' }) {
  if (story.logoSrc) {
    return (
      <img
        src={story.logoSrc}
        alt=""
        className={`testimonials-brand-img testimonials-brand-img--${size}${story.id === 'zoom' ? ' is-zoom' : ''}`}
      />
    )
  }
  return (
    <span
      className={`testimonials-brand-mark testimonials-brand-mark--${size}`}
      style={{ background: story.brandColor }}
    >
      {story.initial}
    </span>
  )
}

export default function Testimonials() {
  const [activeId, setActiveId] = useState<CompanyId>('zoom')
  const active = stories.find(s => s.id === activeId) ?? stories[0]
  const marqueeTrack = [...marqueeLogos, ...marqueeLogos]

  return (
    <section className="testimonials" id="testimonials">
      <div className="container testimonials-container">
        <header className="testimonials-hero">
          <span className="testimonials-badge">
            <Sparkles size={14} aria-hidden="true" />
            Testimonials
          </span>
          <h2 className="testimonials-title">
            Trusted by <span className="testimonials-title__mark">Talent</span> Worldwide
          </h2>
          <p className="testimonials-lead">
            Real success stories from our community — click a logo to hear theirs.
          </p>
        </header>

        <div className="testimonials-tabs" role="tablist" aria-label="Company testimonials">
          {stories.map(story => {
            const selected = story.id === activeId
            return (
              <button
                key={story.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`testimonials-tab${selected ? ' is-active' : ''}`}
                onClick={() => setActiveId(story.id)}
              >
                <CompanyMark story={story} size="md" />
                {story.name}
              </button>
            )
          })}
        </div>

        <div className="testimonials-layout">
          <article className="testimonials-quote-card">
            <span className="testimonials-quote-icon" aria-hidden="true">
              “
            </span>
            <div className="testimonials-rating">
              <span className="testimonials-stars" aria-hidden="true">
                ★★★★★
              </span>
              <span>Verified hire</span>
            </div>
            <h3 className="testimonials-quote-headline">{active.headline}</h3>
            <p className="testimonials-quote-body">{active.quote}</p>
            <footer className="testimonials-quote-foot">
              <div className="testimonials-author">
                <img src={active.avatar} alt="" className="testimonials-avatar" />
                <div>
                  <strong>{active.person}</strong>
                  <span>{active.role}</span>
                </div>
              </div>
              <a href="#testimonials" className="testimonials-read-btn">
                Read story
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </footer>
          </article>

          <aside className="testimonials-stats">
            <div className="testimonials-stats-hero">
              <div className="testimonials-stats-hero__top">
                <CompanyMark story={active} size="lg" />
                <div>
                  <span>Hired at</span>
                  <strong>{active.name}</strong>
                </div>
              </div>
              <p className="testimonials-stats-hero__value">
                <span>{active.hiredValue}</span>
                {active.hiredUnit}
              </p>
              <p className="testimonials-stats-hero__caption">from first login to signed offer</p>
            </div>
            <div className="testimonials-stats-row">
              {active.miniStats.map(stat => (
                <div key={stat.label} className="testimonials-stat-card">
                  <span className="testimonials-stat-card__icon">
                    <MiniStatIcon type={stat.icon} />
                  </span>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="testimonials-marquee" aria-hidden="true">
          <div className="testimonials-marquee__track">
            {marqueeTrack.map((name, i) => (
              <span key={`${name}-${i}`}>{name}</span>
            ))}
          </div>
        </div>

        <div className="testimonials-global-stats">
          <div>
            <strong>12,400+</strong>
            <span>Successful hires</span>
          </div>
          <div>
            <strong>94%</strong>
            <span>Land an interview</span>
          </div>
          <div>
            <strong>
              4.9<span className="testimonials-global-stats__star">★</span>
            </strong>
            <span>Avg. user rating</span>
          </div>
        </div>
      </div>
    </section>
  )
}
