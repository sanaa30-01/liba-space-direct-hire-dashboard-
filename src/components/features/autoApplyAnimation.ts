export const AUTO_APPLY_CYCLE_MS = 19500
export const AUTO_APPLY_SLIDE_COUNT = 6

export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

function slideProgress(phase: number) {
  return (phase * AUTO_APPLY_SLIDE_COUNT) % 1
}

export function activeSlideIndex(phase: number) {
  return Math.floor(phase * AUTO_APPLY_SLIDE_COUNT) % AUTO_APPLY_SLIDE_COUNT
}

export function progressForSlide(phase: number, slideIndex: number) {
  const current = activeSlideIndex(phase)
  const diff = (slideIndex - current + AUTO_APPLY_SLIDE_COUNT) % AUTO_APPLY_SLIDE_COUNT
  if (diff === 0) return slideProgress(phase)
  if (diff === AUTO_APPLY_SLIDE_COUNT - 1) return 1
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

export function linearTypedLength(progress: number, start: number, end: number, charCount: number) {
  const p = clamp01((progress - start) / (end - start))
  return Math.min(charCount, Math.floor(p * charCount))
}

export type CursorState = {
  x: number
  y: number
  tip: string
  clicking: boolean
}

function easeInOut(t: number) {
  const p = clamp01(t)
  return p * p * (3 - 2 * p)
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function between(progress: number, start: number, end: number) {
  return easeInOut((progress - start) / (end - start))
}

export function criteriaStepOneCursor(progress: number): CursorState {
  if (progress < 0.08) return { x: 70, y: 58, tip: '', clicking: false }
  if (progress < 0.62) {
    const p = between(progress, 0.08, 0.62)
    return {
      x: mix(70, 46, p),
      y: mix(58, 60, p),
      tip: 'Filling Work type',
      clicking: false,
    }
  }
  if (progress < 0.82) {
    const p = between(progress, 0.62, 0.82)
    return {
      x: mix(46, 50, p),
      y: mix(60, 61, p),
      tip: 'Filling Work type',
      clicking: progress > 0.69 && progress < 0.74,
    }
  }
  return { x: 50, y: 61, tip: 'Filling Work type', clicking: false }
}

export function criteriaStepTwoCursor(progress: number): CursorState {
  if (progress < 0.08) return { x: 60, y: 70, tip: '', clicking: false }
  if (progress < 0.6) {
    const p = between(progress, 0.08, 0.6)
    return {
      x: mix(60, 74, p),
      y: mix(70, 77, p),
      tip: 'Filling Experience',
      clicking: false,
    }
  }
  if (progress < 0.82) {
    const p = between(progress, 0.6, 0.82)
    return {
      x: mix(74, 76, p),
      y: mix(77, 78, p),
      tip: 'Filling Experience',
      clicking: progress > 0.69 && progress < 0.74,
    }
  }
  return { x: 76, y: 78, tip: 'Filling Experience', clicking: false }
}

export function criteriaStepThreeCursor(progress: number): CursorState {
  if (progress < 0.12) return { x: 74, y: 86, tip: '', clicking: false }
  if (progress < 0.64) {
    const p = between(progress, 0.12, 0.64)
    return {
      x: mix(74, 82, p),
      y: mix(86, 88, p),
      tip: 'Criteria locked in',
      clicking: false,
    }
  }
  return { x: 82, y: 88, tip: 'Criteria locked in', clicking: progress > 0.72 && progress < 0.77 }
}

export function scanMatchesCursor(progress: number): CursorState {
  if (progress < 0.08) return { x: 86, y: 18, tip: '', clicking: false }
  if (progress < 0.72) {
    const p = between(progress, 0.08, 0.72)
    return {
      x: mix(86, 81, p),
      y: mix(18, 76, p),
      tip: '3 matches found',
      clicking: false,
    }
  }
  return { x: 81, y: 76, tip: '3 matches found', clicking: progress > 0.78 && progress < 0.83 }
}

export function autoApplyCursor(progress: number): CursorState {
  if (progress < 0.08) return { x: 84, y: 32, tip: '', clicking: false }
  if (progress < 0.7) {
    const p = between(progress, 0.08, 0.7)
    return {
      x: mix(84, 75, p),
      y: mix(32, 76, p),
      tip: 'Applying to Vercel',
      clicking: false,
    }
  }
  return { x: 75, y: 76, tip: 'Applying to Vercel', clicking: progress > 0.78 && progress < 0.84 }
}

export function submittedCursor(progress: number): CursorState {
  if (progress < 0.08) return { x: 16, y: 82, tip: '', clicking: false }
  if (progress < 0.8) {
    const p = between(progress, 0.08, 0.8)
    return {
      x: mix(16, 23, p),
      y: mix(82, 85, p),
      tip: 'Running 24/7',
      clicking: false,
    }
  }
  return { x: 23, y: 85, tip: 'Running 24/7', clicking: false }
}

export function criteriaWorkTypeLen(progress: number) {
  return linearTypedLength(progress, 0.28, 0.72, 'Full-time'.length)
}

export function criteriaExperienceLen(progress: number) {
  return linearTypedLength(progress, 0.3, 0.74, '5+ years'.length)
}

export function scanningMatchCount(progress: number) {
  if (progress < 0.15) return 0
  if (progress < 0.76) return Math.min(3, Math.floor(clamp01((progress - 0.15) / 0.61) * 4))
  return 3
}

export function autoAppliedCount(progress: number) {
  if (progress < 0.2) return 0
  if (progress < 0.82) return Math.min(2, Math.floor(clamp01((progress - 0.2) / 0.62) * 3))
  return 2
}

export function submittedListCount(progress: number) {
  if (progress < 0.18) return 3
  if (progress < 0.72) return 3 + Math.min(2, Math.floor(clamp01((progress - 0.18) / 0.54) * 3))
  return 5
}
