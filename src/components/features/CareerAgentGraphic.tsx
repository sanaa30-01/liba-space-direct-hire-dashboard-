'use client'

import {
  ADVOCATE_SLIDE_COUNT,
  EMAIL_BODY,
  EMAIL_SUBJECT,
  activeSlideIndex,
  calendarCursor,
  emailCursor,
  linearTypedLength,
  matchCursor,
  pipelineCursor,
  progressForSlide,
  slideOpacity,
} from './advocateAnimation'
import { useAdvocateClock } from './useAdvocateClock'
import { useSmoothedCursor } from './useSmoothedCursor'

function AdvocateCursor({
  x,
  y,
  tip,
  clicking,
  dragging,
  visible,
}: {
  x: number
  y: number
  tip: string
  clicking: boolean
  dragging?: boolean
  visible: boolean
}) {
  if (!visible) return null

  return (
    <div
      className={[
        'advocate-cursor',
        clicking ? ' is-clicking' : '',
        dragging ? ' is-dragging' : '',
      ].filter(Boolean).join(' ')}
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-hidden="true"
    >
      {tip ? <span className="advocate-cursor__tip">{tip}</span> : null}
      <span className="advocate-cursor__ring" />
      <svg className="advocate-cursor__ptr" width="22" height="26" viewBox="0 0 22 26" fill="none">
        <path
          d="M1 1L1 19.5L6.2 14.8L10.5 24.5L13.5 23.2L9.2 13.5L15.5 13.5L1 1Z"
          fill="var(--color-text-default)"
          stroke="var(--color-surface)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

function SlideEmail({ progress, opacity }: { progress: number; opacity: number }) {
  const subjectLen = linearTypedLength(progress, 0.05, 0.16, EMAIL_SUBJECT.length)
  const bodyLen = linearTypedLength(progress, 0.18, 0.72, EMAIL_BODY.length)
  const target = emailCursor(progress)
  const active = opacity > 0.5
  const smooth = useSmoothedCursor(target, active)

  return (
    <div
      className="advocate-slide"
      style={{
        opacity,
        visibility: opacity > 0.02 ? 'visible' : 'hidden',
        zIndex: opacity > 0.5 ? 2 : 1,
      }}
    >
      <p className="advocate-slide__status">Replying to recruiter at Linear</p>
      <div className="advocate-card advocate-card--email">
        <div className="advocate-email__hd">
          <span className="advocate-email__new">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 4h16v16H4z" />
              <path d="m4 7 8 6 8-6" />
            </svg>
            New message
          </span>
          <span className="advocate-email__to">to: sarah@linear.app</span>
        </div>
        <div className="advocate-email__field advocate-email__field--subject">
          <span className="advocate-email__label">Subject</span>
          <p className="advocate-email__line">
            {EMAIL_SUBJECT.slice(0, subjectLen)}
            {subjectLen < EMAIL_SUBJECT.length ? <span className="advocate-email__caret" /> : null}
          </p>
        </div>
        <div className="advocate-email__body">
          <p className="advocate-email__line advocate-email__line--body">
            {EMAIL_BODY.slice(0, bodyLen)}
            {bodyLen < EMAIL_BODY.length ? <span className="advocate-email__caret" /> : null}
          </p>
        </div>
        <button
          type="button"
          className={`advocate-email__send${progress >= 0.82 && progress < 0.92 ? ' is-pressed' : ''}`}
          aria-hidden="true"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
          Send
        </button>
        <AdvocateCursor
          x={smooth.x}
          y={smooth.y}
          tip={target.tip}
          clicking={target.clicking}
          visible={active}
        />
      </div>
    </div>
  )
}

function SlideCalendar({ progress, opacity }: { progress: number; opacity: number }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const hours = ['10', '11', '12', '1', '2', '3', '4']
  const target = calendarCursor(progress)
  const active = opacity > 0.5
  const smooth = useSmoothedCursor(target, active)
  const booked = progress >= 0.68
  const hoverCell = progress >= 0.55 && progress < 0.68

  return (
    <div
      className="advocate-slide"
      style={{
        opacity,
        visibility: opacity > 0.02 ? 'visible' : 'hidden',
        zIndex: opacity > 0.5 ? 2 : 1,
      }}
    >
      <p className="advocate-slide__status">Scheduling intro call with Vercel</p>
      <div className="advocate-card advocate-card--cal">
        <div className="advocate-cal__hd">
          <span className="advocate-cal__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            This week
          </span>
          <span className="advocate-cal__finding">{booked ? 'Slot confirmed' : 'Finding a slot…'}</span>
        </div>
        <div className="advocate-cal__grid">
          <div className="advocate-cal__corner" />
          {days.map((d, i) => (
            <span key={d} className={`advocate-cal__day${i === 1 ? ' is-today' : ''}`}>{d}</span>
          ))}
          {hours.map(h => (
            <div key={h} className="advocate-cal__row">
              <span className="advocate-cal__hour">{h}</span>
              {days.map((d, di) => (
                <span
                  key={`${h}-${d}`}
                  className={[
                    'advocate-cal__cell',
                    di === 1 && h === '3' && hoverCell && !booked ? ' is-hover' : '',
                    di === 1 && h === '3' && booked ? ' is-booked' : '',
                  ].filter(Boolean).join(' ')}
                >
                  {di === 1 && h === '3' && booked ? (
                    <span className="advocate-cal__event">Intro · Vercel</span>
                  ) : null}
                </span>
              ))}
            </div>
          ))}
        </div>
        <AdvocateCursor
          x={smooth.x}
          y={smooth.y}
          tip={target.tip}
          clicking={target.clicking}
          visible={active}
        />
      </div>
    </div>
  )
}

function SlidePipeline({ progress, opacity }: { progress: number; opacity: number }) {
  const target = pipelineCursor(progress)
  const active = opacity > 0.5
  const smooth = useSmoothedCursor(target, active)
  const dragging = progress >= 0.28 && progress < 0.65
  const moved = progress >= 0.65

  return (
    <div
      className="advocate-slide"
      style={{
        opacity,
        visibility: opacity > 0.02 ? 'visible' : 'hidden',
        zIndex: opacity > 0.5 ? 2 : 1,
      }}
    >
      <p className="advocate-slide__status">Advancing Stripe to onsite</p>
      <div className="advocate-card advocate-card--pipe">
        <div className="advocate-pipe__hd">
          <span className="advocate-pipe__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            Pipeline
          </span>
          <span className="advocate-pipe__sub">{dragging ? 'Advancing Stripe…' : moved ? 'Stripe → Onsite' : 'Advancing Stripe…'}</span>
        </div>
        <div className="advocate-pipe__board">
          <div className="advocate-pipe__col">
            <span className="advocate-pipe__label">Applied</span>
            <div className="advocate-pipe__job"><strong>Figma</strong><span>Sr. PM</span></div>
            <div className="advocate-pipe__job"><strong>Datadog</strong><span>Sr. PM</span></div>
          </div>
          <div className="advocate-pipe__col">
            <span className="advocate-pipe__label">Phone</span>
            <div className="advocate-pipe__job"><strong>Notion</strong><span>Sr. PM</span></div>
            <div className={`advocate-pipe__job advocate-pipe__job--stripe${dragging || moved ? ' is-hidden' : ''}`}>
              <strong>Stripe</strong><span>Sr. PM</span>
            </div>
          </div>
          <div className="advocate-pipe__col advocate-pipe__col--onsite">
            <span className="advocate-pipe__label">Onsite</span>
            <div className="advocate-pipe__job"><strong>Linear</strong><span>Sr. PM</span></div>
            <div className={`advocate-pipe__job advocate-pipe__job--stripe${moved && !dragging ? ' is-placed' : ' is-slot'}`}>
              <strong>Stripe</strong><span>Sr. PM</span>
            </div>
          </div>
          {dragging ? (
            <div
              className="advocate-pipe__job advocate-pipe__job--float"
              style={{ left: `${smooth.x}%`, top: `${smooth.y}%` }}
            >
              <strong>Stripe</strong><span>Sr. PM</span>
            </div>
          ) : null}
        </div>
        <AdvocateCursor
          x={smooth.x}
          y={smooth.y}
          tip={target.tip}
          clicking={target.clicking}
          dragging={target.dragging}
          visible={active}
        />
      </div>
    </div>
  )
}

function SlideMatches({ progress, opacity }: { progress: number; opacity: number }) {
  const rows = [
    { co: 'Notion', letter: 'N', match: '94%', saved: true },
    { co: 'Vercel', letter: 'V', match: '91%', saved: false },
    { co: 'Replit', letter: 'R', match: '88%', saved: false },
  ]
  const target = matchCursor(progress)
  const active = opacity > 0.5
  const smooth = useSmoothedCursor(target, active)
  const reviewing = progress >= 0.2 && progress < 0.62
  const saveVercel = progress >= 0.76

  return (
    <div
      className="advocate-slide"
      style={{
        opacity,
        visibility: opacity > 0.02 ? 'visible' : 'hidden',
        zIndex: opacity > 0.5 ? 2 : 1,
      }}
    >
      <p className="advocate-slide__status">Saving a new role match</p>
      <div className="advocate-card advocate-card--matches">
        <div className="advocate-match__hd">
          <span className="advocate-match__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.8 5.7 21l2.3-7-6-4.6h7.6z" />
            </svg>
            New matches
          </span>
          <span className="advocate-match__count">3 roles · today</span>
        </div>
        <ul className="advocate-match__list">
          {rows.map(row => (
            <li
              key={row.co}
              className={[
                'advocate-match__row',
                row.co === 'Notion' && reviewing ? ' is-active' : '',
                row.co === 'Vercel' && progress >= 0.62 && progress < 0.8 ? ' is-active' : '',
              ].filter(Boolean).join(' ')}
            >
              <span className="advocate-match__logo">{row.letter}</span>
              <div className="advocate-match__info">
                <strong>{row.co}</strong>
                <span>Sr. Product Manager</span>
              </div>
              <span className="advocate-match__pct">{row.match}</span>
              <span
                className={[
                  'advocate-match__heart',
                  row.saved || (row.co === 'Vercel' && saveVercel) ? ' is-saved' : '',
                ].filter(Boolean).join(' ')}
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={row.saved || (row.co === 'Vercel' && saveVercel) ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </span>
            </li>
          ))}
        </ul>
        <AdvocateCursor
          x={smooth.x}
          y={smooth.y}
          tip={target.tip}
          clicking={target.clicking}
          visible={active}
        />
      </div>
    </div>
  )
}

export default function CareerAgentGraphic() {
  const phase = useAdvocateClock()

  const opacities = Array.from({ length: ADVOCATE_SLIDE_COUNT }, (_, i) => slideOpacity(i, phase))
  const dotActive = activeSlideIndex(phase)

  return (
    <div
      className="advocate"
      role="img"
      aria-label="AI advocate typing recruiter replies, scheduling intro calls, advancing your pipeline, and saving role matches"
    >
      <header className="advocate__bar">
        <span className="advocate__brand">
          <span className="advocate__live-dot" />
          Advocate · Live
        </span>
        <span className="advocate__hours">24 / 7</span>
      </header>

      <div className="advocate__stage">
        <SlideEmail progress={progressForSlide(phase, 0)} opacity={opacities[0]} />
        <SlideCalendar progress={progressForSlide(phase, 1)} opacity={opacities[1]} />
        <SlidePipeline progress={progressForSlide(phase, 2)} opacity={opacities[2]} />
        <SlideMatches progress={progressForSlide(phase, 3)} opacity={opacities[3]} />
      </div>

      <div className="advocate__dots" aria-hidden="true">
        {[0, 1, 2, 3].map(i => (
          <span key={i} className={`advocate__dot${dotActive === i ? ' is-active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
