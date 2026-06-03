export const RESUME_CYCLE_MS = 20000
export const RESUME_SLIDE_COUNT = 5

export const JD_KEYWORDS = [
  'Senior Product Manager',
  'B2B SaaS',
  'roadmap',
  'engineering',
  'SQL',
  'experimentation',
] as const

export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function slideProgress(phase: number) {
  return (phase * RESUME_SLIDE_COUNT) % 1
}

export function activeSlideIndex(phase: number) {
  return Math.floor(phase * RESUME_SLIDE_COUNT) % RESUME_SLIDE_COUNT
}

export function progressForSlide(phase: number, slideIndex: number) {
  const current = activeSlideIndex(phase)
  const diff = (slideIndex - current + RESUME_SLIDE_COUNT) % RESUME_SLIDE_COUNT
  if (diff === 0) return slideProgress(phase)
  if (diff === RESUME_SLIDE_COUNT - 1) return 1
  return 0
}

export function slideOpacity(slideIndex: number, phase: number) {
  const current = activeSlideIndex(phase)
  if (slideIndex !== current) return 0
  const t = slideProgress(phase)
  const fade = 0.06
  if (t < fade) return t / fade
  if (t > 1 - fade) return (1 - t) / fade
  return 1
}

export function linearStep(progress: number, start: number, end: number) {
  return clamp01((progress - start) / (end - start))
}

export type CursorState = {
  x: number
  y: number
  tip: string
  clicking: boolean
}

/** Slide 0: scanning JD — how many keywords highlighted in text (0–6) */
export function jdHighlightCount(progress: number) {
  if (progress < 0.1) return 0
  if (progress < 0.85) return Math.min(6, Math.ceil(linearStep(progress, 0.1, 0.85) * 6))
  return 6
}

export function scanLineProgress(progress: number) {
  return clamp01(progress) * 100
}

export function scanCursor(progress: number): CursorState {
  const scanY = 38 + scanLineProgress(progress) * 0.42
  if (progress < 0.2) {
    return { x: 72, y: 28, tip: '', clicking: false }
  }
  if (progress < 0.75) {
    const p = linearStep(progress, 0.2, 0.75)
    return {
      x: 68 - p * 20,
      y: scanY,
      tip: 'Scanning…',
      clicking: false,
    }
  }
  return { x: 48, y: scanY, tip: 'Scanning…', clicking: false }
}

export function keywordsFoundCursor(progress: number): CursorState {
  if (progress < 0.15) {
    return { x: 28, y: 72, tip: '', clicking: false }
  }
  return {
    x: 32,
    y: 78,
    tip: '6 keywords found',
    clicking: progress > 0.2 && progress < 0.28,
  }
}

export function tailorCursor(progress: number): CursorState {
  if (progress < 0.15) {
    return { x: 18, y: 35, tip: '', clicking: false }
  }
  if (progress < 0.75) {
    const p = linearStep(progress, 0.15, 0.75)
    return {
      x: 55 + p * 22,
      y: 48 + p * 14,
      tip: 'Injecting keywords',
      clicking: p > 0.35 && p < 0.42,
    }
  }
  return { x: 78, y: 64, tip: 'Injecting keywords', clicking: false }
}

export function tailorHighlightCount(progress: number) {
  if (progress < 0.2) return 0
  if (progress < 0.8) return Math.min(5, Math.ceil(linearStep(progress, 0.2, 0.8) * 5))
  return 5
}

export function showReformatBar(progress: number) {
  return progress >= 0.72
}

export function atsRunningScore(progress: number) {
  if (progress < 0.15) return 12
  if (progress < 0.85) return Math.round(12 + linearStep(progress, 0.15, 0.85) * 35)
  return 47
}

export function atsRunningChecks(progress: number) {
  if (progress < 0.2) return 0
  if (progress < 0.8) return Math.min(2, Math.floor(linearStep(progress, 0.2, 0.8) * 3))
  return 2
}

export function atsRunningCursor(progress: number): CursorState {
  if (progress < 0.2) {
    return { x: 42, y: 58, tip: '', clicking: false }
  }
  if (progress < 0.7) {
    const p = linearStep(progress, 0.2, 0.7)
    return {
      x: 42 + p * 18,
      y: 58 + p * 16,
      tip: 'Running checks…',
      clicking: false,
    }
  }
  return { x: 58, y: 74, tip: 'Running checks…', clicking: progress > 0.72 && progress < 0.78 }
}

export function atsPassedScore(progress: number) {
  if (progress < 0.2) return 47
  if (progress < 0.55) return Math.round(47 + linearStep(progress, 0.2, 0.55) * 51)
  return 98
}

export function atsPassedChecks(progress: number) {
  if (progress < 0.25) return 2
  if (progress < 0.6) return Math.min(5, 2 + Math.floor(linearStep(progress, 0.25, 0.6) * 3))
  return 5
}

export function atsPassedCursor(progress: number): CursorState {
  if (progress < 0.55) {
    return { x: 78, y: 72, tip: '', clicking: false }
  }
  if (progress < 0.85) {
    return { x: 82, y: 88, tip: '', clicking: progress > 0.78 && progress < 0.84 }
  }
  return { x: 82, y: 88, tip: '', clicking: false }
}

export function showPassedBanner(progress: number) {
  return progress >= 0.45
}

export function showSubmitPressed(progress: number) {
  return progress >= 0.78 && progress < 0.86
}
