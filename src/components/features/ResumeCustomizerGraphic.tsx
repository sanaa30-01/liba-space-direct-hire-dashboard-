'use client'

import { memo } from 'react'
import FeatureCursor from './FeatureCursor'
import {
  JD_KEYWORDS,
  RESUME_CYCLE_MS,
  RESUME_SLIDE_COUNT,
  activeSlideIndex,
  atsPassedChecks,
  atsPassedCursor,
  atsPassedScore,
  atsRunningChecks,
  atsRunningCursor,
  atsRunningScore,
  jdHighlightCount,
  keywordsFoundCursor,
  progressForSlide,
  scanCursor,
  scanLineProgress,
  showPassedBanner,
  showReformatBar,
  showSubmitPressed,
  slideOpacity,
  tailorCursor,
  tailorHighlightCount,
} from './resumeAnimation'
import { useFeatureClock } from './useFeatureClock'
import { useSmoothedCursor } from './useSmoothedCursor'

const ATS_CHECKS = [
  'Parseable structure',
  'Keyword match: 9/10',
  'Standard section headings',
  'No tables or graphics',
  'Contact info detected',
] as const

const RESUME_BULLETS = [
  { parts: ['Led cross-functional product development for a ', 'B2B SaaS', ' platform, owning the product ', 'roadmap', ' and partnering with ', 'engineering', ' to ship ', 'experimentation', ' at scale using ', 'SQL', '.'] },
]

function ResumeShell({
  status,
  opacity,
  children,
  atsReady = false,
}: {
  status: string
  opacity: number
  children: React.ReactNode
  atsReady?: boolean
}) {
  return (
    <div
      className="advocate-slide resume-tool"
      style={{
        opacity,
        visibility: opacity > 0.02 ? 'visible' : 'hidden',
        zIndex: opacity > 0.5 ? 2 : 1,
      }}
    >
      <p className="advocate-slide__status">{status}</p>
      <div className="resume-tool__frame">
        <header className="resume-tool__bar">
          <span className="resume-tool__brand">
            <span className="advocate__live-dot" />
            Resume · Auto-tailor
          </span>
          <span className={`resume-tool__ats${atsReady ? ' is-ready' : ''}`}>ATS ✓</span>
        </header>
        {children}
      </div>
    </div>
  )
}

const JD_PARTS: { text: string; kw?: number }[] = [
  { text: "We're hiring a " },
  { text: 'Senior Product Manager', kw: 0 },
  { text: ' to lead our ' },
  { text: 'B2B SaaS', kw: 1 },
  { text: ' platform. Drive ' },
  { text: 'roadmap', kw: 2 },
  { text: ' strategy, partner with ' },
  { text: 'engineering', kw: 3 },
  { text: ', and ship features using ' },
  { text: 'SQL', kw: 4 },
  { text: ' and ' },
  { text: 'experimentation', kw: 5 },
  { text: ' frameworks.' },
]

function JobDescriptionBody({ highlightCount }: { highlightCount: number }) {
  return (
    <p className="resume-jd__text">
      {JD_PARTS.map((part, i) =>
        part.kw !== undefined && part.kw < highlightCount ? (
          <mark key={i}>{part.text}</mark>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </p>
  )
}

const SlideScanJd = memo(function SlideScanJd({ progress, opacity }: { progress: number; opacity: number }) {
  const active = opacity > 0.5
  const target = scanCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const hl = jdHighlightCount(progress)
  const scanPct = scanLineProgress(progress)

  return (
    <ResumeShell status="Reading the job description" opacity={opacity}>
      <div className="resume-panel">
        <div className="resume-panel__hd">
          <span className="resume-panel__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 10h10M4 14h12M4 18h8" />
            </svg>
            Job description · Linear
          </span>
          <span className="resume-panel__meta">Extracting keywords…</span>
        </div>
        <JobDescriptionBody highlightCount={hl} />
        <div className="resume-jd__scan-wrap">
          <div className="resume-jd__scan-beam" style={{ top: `${scanPct}%` }} />
        </div>
        <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
      </div>
    </ResumeShell>
  )
})

const SlideKeywordsFound = memo(function SlideKeywordsFound({ progress, opacity }: { progress: number; opacity: number }) {
  const active = opacity > 0.5
  const target = keywordsFoundCursor(progress)
  const smooth = useSmoothedCursor(target, active)

  return (
    <ResumeShell status="Reading the job description" opacity={opacity}>
      <div className="resume-panel">
        <div className="resume-panel__hd">
          <span className="resume-panel__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 6h16M4 10h10M4 14h12M4 18h8" />
            </svg>
            Job description · Linear
          </span>
          <span className="resume-panel__meta">Extracting keywords…</span>
        </div>
        <JobDescriptionBody highlightCount={6} />
        <div className="resume-jd__pills">
          {JD_KEYWORDS.map(kw => (
            <span key={kw} className="resume-jd__pill is-visible">
              {kw}
            </span>
          ))}
        </div>
        <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
      </div>
    </ResumeShell>
  )
})

function ResumeBullet({ highlightCount }: { highlightCount: number }) {
  const { parts } = RESUME_BULLETS[0]
  let ki = 0
  const keywords = ['B2B SaaS', 'roadmap', 'engineering', 'experimentation', 'SQL']

  return (
    <ul className="resume-pdf__bullets">
      <li>
        {parts.map((part, i) => {
          const isKw = keywords.includes(part)
          if (!isKw) return <span key={i}>{part}</span>
          const on = ki < highlightCount
          ki += 1
          return on ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
        })}
      </li>
    </ul>
  )
}

const SlideTailor = memo(function SlideTailor({ progress, opacity }: { progress: number; opacity: number }) {
  const active = opacity > 0.5
  const target = tailorCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const hl = tailorHighlightCount(progress)
  const reformat = showReformatBar(progress)

  return (
    <ResumeShell status="Re-tuning your resume" opacity={opacity}>
      <div className="resume-panel resume-panel--pdf">
        <div className="resume-panel__hd">
          <span className="resume-panel__title">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 4h9l3 3v13H6z" />
              <path d="M15 4v3h3" />
            </svg>
            resume_linear_v3.pdf
          </span>
          <span className="resume-panel__meta resume-panel__meta--spark">✦ Auto-tailoring</span>
        </div>
        <div className="resume-pdf__header">
          <strong>Alex Morgan</strong>
          <span>Senior Product Manager · B2B SaaS</span>
        </div>
        <p className="resume-pdf__section-label">Experience</p>
        <ResumeBullet highlightCount={hl} />
        {reformat ? (
          <p className="resume-pdf__reformat">✓ Reformatted · single column · ATS-safe fonts</p>
        ) : null}
        <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
      </div>
    </ResumeShell>
  )
})

const SlideAtsRunning = memo(function SlideAtsRunning({ progress, opacity }: { progress: number; opacity: number }) {
  const active = opacity > 0.5
  const target = atsRunningCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const score = atsRunningScore(progress)
  const checksOn = atsRunningChecks(progress)

  return (
    <ResumeShell status="Passing the ATS filter" opacity={opacity}>
      <div className="resume-panel resume-panel--ats">
        <div className="resume-ats__hd">
          <span className="resume-ats__title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l2 4h4l-2 10h-4L8 6h4l-2-4z" fill="var(--color-main-default)" stroke="var(--color-text-default)" strokeWidth="1" />
            </svg>
            ATS check · Greenhouse
          </span>
          <span className="resume-ats__pct">{score}%</span>
        </div>
        <div className="resume-ats__bar">
          <div className="resume-ats__bar-fill" style={{ width: `${score}%` }} />
        </div>
        <ul className="resume-ats__list">
          {ATS_CHECKS.map((label, i) => (
            <li key={label} className={i < checksOn ? ' is-pass' : ''}>
              <span className="resume-ats__check" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
      </div>
    </ResumeShell>
  )
})

const SlideAtsPassed = memo(function SlideAtsPassed({ progress, opacity }: { progress: number; opacity: number }) {
  const active = opacity > 0.5
  const target = atsPassedCursor(progress)
  const smooth = useSmoothedCursor(target, active)
  const score = atsPassedScore(progress)
  const checksOn = atsPassedChecks(progress)
  const banner = showPassedBanner(progress)
  const submitPress = showSubmitPressed(progress)

  return (
    <ResumeShell status="Passing the ATS filter" opacity={opacity} atsReady>
      <div className="resume-panel resume-panel--ats">
        <div className="resume-ats__hd">
          <span className="resume-ats__title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2l2 4h4l-2 10h-4L8 6h4l-2-4z" fill="var(--color-main-default)" stroke="var(--color-text-default)" strokeWidth="1" />
            </svg>
            ATS check · Greenhouse
          </span>
          <span className="resume-ats__pct">{score}%</span>
        </div>
        <div className="resume-ats__bar">
          <div className="resume-ats__bar-fill" style={{ width: `${score}%` }} />
        </div>
        <ul className="resume-ats__list">
          {ATS_CHECKS.map((label, i) => (
            <li key={label} className={i < checksOn ? ' is-pass' : ''}>
              <span className="resume-ats__check" aria-hidden="true" />
              {label}
            </li>
          ))}
        </ul>
        {banner ? (
          <div className="resume-ats__pass">
            <div>
              <strong>Passed ATS filter</strong>
              <span>Ready to submit · {score}% match</span>
            </div>
            <span className="resume-ats__shield" aria-hidden="true">✓</span>
          </div>
        ) : null}
        <button
          type="button"
          className={`resume-ats__submit${submitPress ? ' is-pressed' : ''}`}
          aria-hidden="true"
        >
          Submit
        </button>
        <FeatureCursor x={smooth.x} y={smooth.y} tip={target.tip} clicking={target.clicking} visible={active} />
      </div>
    </ResumeShell>
  )
})

export default function ResumeCustomizerGraphic() {
  const phase = useFeatureClock(RESUME_CYCLE_MS)
  const opacities = Array.from({ length: RESUME_SLIDE_COUNT }, (_, i) => slideOpacity(i, phase))
  const slide = activeSlideIndex(phase)
  const dotActive = slide <= 1 ? 0 : slide === 2 ? 1 : 2

  return (
    <div
      className="advocate resume-tool-root"
      role="img"
      aria-label="Resume auto-tailor scans a job description, injects keywords, and passes ATS filters"
    >
      <div className="advocate__stage">
        <SlideScanJd progress={progressForSlide(phase, 0)} opacity={opacities[0]} />
        <SlideKeywordsFound progress={progressForSlide(phase, 1)} opacity={opacities[1]} />
        <SlideTailor progress={progressForSlide(phase, 2)} opacity={opacities[2]} />
        <SlideAtsRunning progress={progressForSlide(phase, 3)} opacity={opacities[3]} />
        <SlideAtsPassed progress={progressForSlide(phase, 4)} opacity={opacities[4]} />
      </div>

      <div className="advocate__dots resume-tool__dots" aria-hidden="true">
        {[0, 1, 2].map(i => (
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
