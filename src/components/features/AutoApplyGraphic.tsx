'use client'

import { memo } from 'react'
import FeatureCursor from './FeatureCursor'
import {
  AUTO_APPLY_CYCLE_MS,
  activeSlideIndex,
  autoAppliedCount,
  autoApplyCursor,
  criteriaExperienceLen,
  criteriaStepOneCursor,
  criteriaStepThreeCursor,
  criteriaStepTwoCursor,
  criteriaWorkTypeLen,
  progressForSlide,
  scanningMatchCount,
  scanMatchesCursor,
  submittedCursor,
  submittedListCount,
} from './autoApplyAnimation'
import { useFeatureClock } from './useFeatureClock'
import { useSmoothedCursor } from './useSmoothedCursor'

const MATCH_ROWS = [
  { company: 'Figma', role: 'Sr. Product Manager', meta: 'Remote · US', pct: 96, match: true },
  { company: 'Stripe', role: 'Product Manager, Platform', meta: 'Remote · US', pct: 94, match: true },
  { company: 'Notion', role: 'PM, Growth', meta: 'New York / Remote', pct: 71, match: false },
  { company: 'Vercel', role: 'Product Manager', meta: 'Remote · US', pct: 91, match: true },
  { company: 'Linear', role: 'Sr. PM, Collaboration', meta: 'Remote · EU', pct: 68, match: false },
] as const

const APPLIED_ROWS = [
  { company: 'Figma', role: 'Sr. Product Manager' },
  { company: 'Stripe', role: 'Product Manager, Platform' },
  { company: 'Vercel', role: 'Product Manager' },
] as const

const SUBMITTED_ROWS = [
  { company: 'Figma', role: 'Sr. Product Manager', time: '2m ago' },
  { company: 'Stripe', role: 'Product Manager, Platform', time: '14m ago' },
  { company: 'Vercel', role: 'Product Manager', time: '1h ago' },
  { company: 'Linear', role: 'Sr. PM, Collaboration', time: '3h ago' },
  { company: 'Notion', role: 'PM, Growth', time: '5h ago' },
] as const

function Shell({
  status,
  opacity,
  children,
}: {
  status: string
  opacity: number
  children: React.ReactNode
}) {
  return (
    <div
      className="advocate-slide auto-apply-slide"
      style={{
        opacity,
        visibility: opacity > 0.02 ? 'visible' : 'hidden',
        zIndex: opacity > 0.5 ? 2 : 1,
      }}
    >
      <p className="advocate-slide__status">{status}</p>
      <div className="auto-apply-card">
        <header className="auto-apply-card__bar">
          <span className="auto-apply-card__brand">
            <span className="advocate__live-dot" />
            Apply · Auto
          </span>
          <span className="auto-apply-card__uptime">24 / 7</span>
        </header>
        {children}
      </div>
    </div>
  )
}

function PreferencesPanel({
  workType,
  experience,
  lockMode,
}: {
  workType: string
  experience: string
  lockMode?: boolean
}) {
  return (
    <div className="auto-pane auto-pane--prefs">
      <div className="auto-pane__hd">
        <span className="auto-pane__title">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16M7 7v2M12 12v2M17 17v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Job preferences
        </span>
        <span className="auto-pane__meta">Set once · run forever</span>
      </div>

      <div className="auto-pref-grid">
        <article className="auto-pref auto-pref--active">
          <p className="auto-pref__label">Role</p>
          <strong>Senior Product Manager</strong>
        </article>
        <article className="auto-pref auto-pref--filled">
          <p className="auto-pref__label">Location</p>
          <strong>Remote · US</strong>
        </article>
        <article className={`auto-pref${workType ? ' auto-pref--filled' : ''}`}>
          <p className="auto-pref__label">Work type</p>
          <strong>{workType || '|'}</strong>
        </article>
        <article className={`auto-pref${experience ? ' auto-pref--filled' : ''}`}>
          <p className="auto-pref__label">Experience</p>
          <strong>{experience || ''}</strong>
        </article>
      </div>

      <footer className="auto-pane__foot">
        <button type="button" className={`auto-save-btn${lockMode ? ' is-locked' : ''}`} aria-hidden="true">
          {lockMode ? '✓ Saved' : '⚡ Save criteria'}
        </button>
      </footer>
    </div>
  )
}

const SlideCriteriaWorkType = memo(function SlideCriteriaWorkType({
  progress,
  opacity,
}: {
  progress: number
  opacity: number
}) {
  const active = opacity > 0.5
  const target = criteriaStepOneCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const typed = criteriaWorkTypeLen(progress)

  return (
    <Shell status="Setting your criteria" opacity={opacity}>
      <PreferencesPanel workType={'Full-time'.slice(0, typed)} experience="" />
      <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
    </Shell>
  )
})

const SlideCriteriaExperience = memo(function SlideCriteriaExperience({
  progress,
  opacity,
}: {
  progress: number
  opacity: number
}) {
  const active = opacity > 0.5
  const target = criteriaStepTwoCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const workType = 'Full-time'
  const expLen = criteriaExperienceLen(progress)

  return (
    <Shell status="Setting your criteria" opacity={opacity}>
      <PreferencesPanel workType={workType} experience={'5+ years'.slice(0, expLen)} />
      <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
    </Shell>
  )
})

const SlideCriteriaLocked = memo(function SlideCriteriaLocked({
  progress,
  opacity,
}: {
  progress: number
  opacity: number
}) {
  const active = opacity > 0.5
  const target = criteriaStepThreeCursor(progress)
  const smooth = useSmoothedCursor(target, active)

  return (
    <Shell status="Setting your criteria" opacity={opacity}>
      <PreferencesPanel workType="Full-time" experience="5+ years" lockMode />
      <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
    </Shell>
  )
})

const SlideScanning = memo(function SlideScanning({
  progress,
  opacity,
}: {
  progress: number
  opacity: number
}) {
  const active = opacity > 0.5
  const target = scanMatchesCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const found = scanningMatchCount(progress)

  return (
    <Shell status="Scanning for matches" opacity={opacity}>
      <div className="auto-pane auto-pane--list">
        <div className="auto-pane__hd">
          <span className="auto-pane__title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            New openings
          </span>
          <span className="auto-pane__meta">Scanning 42 boards...</span>
        </div>
        <ul className="auto-list">
          {MATCH_ROWS.map((row, i) => (
            <li key={row.company} className={i < found && row.match ? 'is-match' : ''}>
              <span className={`auto-list__logo${i < found && row.match ? ' is-match' : ''}`}>{row.company[0]}</span>
              <span className="auto-list__info">
                <strong>
                  {row.company}
                  {i < found && row.match ? <em>Match</em> : null}
                </strong>
                <small>{row.role} · {row.meta}</small>
              </span>
              <b>{row.pct}%</b>
            </li>
          ))}
        </ul>
      </div>
      <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
    </Shell>
  )
})

const SlideApplying = memo(function SlideApplying({
  progress,
  opacity,
}: {
  progress: number
  opacity: number
}) {
  const active = opacity > 0.5
  const target = autoApplyCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const applied = autoAppliedCount(progress)

  return (
    <Shell status="Auto-applying to roles" opacity={opacity}>
      <div className="auto-pane auto-pane--apply">
        <div className="auto-pane__hd">
          <span className="auto-pane__title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M13 3L4 14h6l-1 7 9-11h-6l1-7z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
            Auto-apply
          </span>
          <span className="auto-pane__meta">Filling forms...</span>
        </div>
        <ul className="auto-apply-list">
          {APPLIED_ROWS.map((row, i) => (
            <li key={row.company} className={i < applied ? 'is-applied' : ''}>
              <span className={`auto-list__logo${i < applied ? ' is-match' : ''}`}>{row.company[0]}</span>
              <span className="auto-list__info">
                <strong>{row.company}</strong>
                <small>{row.role}</small>
              </span>
              {i < applied ? (
                <span className="auto-apply-list__status">
                  <small>Auto-filled</small>
                  <b>◌ Applied</b>
                </span>
              ) : (
                <span className="auto-apply-list__pending">Apply</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
    </Shell>
  )
})

const SlideSubmitted = memo(function SlideSubmitted({
  progress,
  opacity,
}: {
  progress: number
  opacity: number
}) {
  const active = opacity > 0.5
  const target = submittedCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const count = submittedListCount(progress)

  return (
    <Shell status="Applications submitted" opacity={opacity}>
      <div className="auto-pane auto-pane--submitted">
        <div className="auto-pane__hd">
          <span className="auto-pane__title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12l2.6 2.6L16 9.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Applications
          </span>
          <span className="auto-pane__meta">Today</span>
        </div>
        <article className="auto-summary">
          <span className="auto-summary__icon">⚡</span>
          <span>
            <strong>5 applications submitted</strong>
            <small>While you were offline · zero manual work</small>
          </span>
        </article>
        <ul className="auto-submitted-list">
          {SUBMITTED_ROWS.slice(0, count).map(row => (
            <li key={row.company}>
              <span className="auto-submitted-list__icon">◌</span>
              <span className="auto-list__info">
                <strong>{row.company}</strong>
                <small>{row.role}</small>
              </span>
              <small className="auto-submitted-list__time">{row.time}</small>
            </li>
          ))}
        </ul>
      </div>
      <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
    </Shell>
  )
})

export default function AutoApplyGraphic() {
  const phase = useFeatureClock(AUTO_APPLY_CYCLE_MS)
  const slide = activeSlideIndex(phase)
  const dotActive = slide <= 2 ? 0 : slide === 3 ? 1 : slide === 4 ? 2 : 3
  const slideProgress = progressForSlide(phase, slide)

  let currentSlide: React.ReactNode = null
  if (slide === 0) currentSlide = <SlideCriteriaWorkType progress={slideProgress} opacity={1} />
  else if (slide === 1) currentSlide = <SlideCriteriaExperience progress={slideProgress} opacity={1} />
  else if (slide === 2) currentSlide = <SlideCriteriaLocked progress={slideProgress} opacity={1} />
  else if (slide === 3) currentSlide = <SlideScanning progress={slideProgress} opacity={1} />
  else if (slide === 4) currentSlide = <SlideApplying progress={slideProgress} opacity={1} />
  else currentSlide = <SlideSubmitted progress={slideProgress} opacity={1} />

  return (
    <div
      className="advocate auto-apply-root"
      role="img"
      aria-label="Auto-apply agent saves criteria, scans matches, applies in bulk, and logs submitted applications"
    >
      <div className="advocate__stage">
        {currentSlide}
      </div>

      <div className="advocate__dots auto-apply__dots" aria-hidden="true">
        {[0, 1, 2, 3].map(i => (
          <span
            key={i}
            className={[
              'advocate__dot',
              dotActive === i ? ' is-active' : '',
              dotActive > i ? ' is-done' : '',
            ].join('')}
          />
        ))}
      </div>
    </div>
  )
}
