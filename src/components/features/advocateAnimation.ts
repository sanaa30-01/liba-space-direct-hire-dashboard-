export const ADVOCATE_CYCLE_MS = 18000
export const ADVOCATE_SLIDE_COUNT = 4

export const EMAIL_SUBJECT = 'Re: Senior PM role at Linear'
export const EMAIL_BODY =
  'Hi Sarah — thanks for reaching out. I\'d love to learn more. Tuesday afternoon works well on my end…'

export function clamp01(n: number) {
  return Math.min(1, Math.max(0, n))
}

export function slideProgress(phase: number) {
  return (phase * ADVOCATE_SLIDE_COUNT) % 1
}

export function activeSlideIndex(phase: number) {
  return Math.floor(phase * ADVOCATE_SLIDE_COUNT) % ADVOCATE_SLIDE_COUNT
}

export function progressForSlide(phase: number, slideIndex: number) {
  const current = activeSlideIndex(phase)
  const diff = (slideIndex - current + ADVOCATE_SLIDE_COUNT) % ADVOCATE_SLIDE_COUNT
  if (diff === 0) return slideProgress(phase)
  if (diff === ADVOCATE_SLIDE_COUNT - 1) return 1
  return 0
}

/** One slide visible at a time — quick fade at edges only */
export function slideOpacity(slideIndex: number, phase: number) {
  const current = activeSlideIndex(phase)
  if (slideIndex !== current) return 0

  const t = slideProgress(phase)
  const fade = 0.07
  if (t < fade) return t / fade
  if (t > 1 - fade) return (1 - t) / fade
  return 1
}

export function linearTypedLength(
  progress: number,
  start: number,
  end: number,
  charCount: number
) {
  const p = clamp01((progress - start) / (end - start))
  return Math.min(charCount, Math.floor(p * charCount))
}

export type CursorState = {
  x: number
  y: number
  tip: string
  clicking: boolean
  dragging?: boolean
}

export function emailCursor(progress: number): CursorState {
  const subjectLen = linearTypedLength(progress, 0.05, 0.16, EMAIL_SUBJECT.length)
  const bodyLen = linearTypedLength(progress, 0.18, 0.72, EMAIL_BODY.length)
  const subjectRatio = subjectLen / EMAIL_SUBJECT.length
  const bodyRatio = bodyLen / EMAIL_BODY.length

  if (progress < 0.17) {
    return {
      x: 20 + subjectRatio * 38,
      y: 30,
      tip: 'Drafting…',
      clicking: progress > 0.14 && progress < 0.17,
    }
  }

  if (progress < 0.78) {
    const lineWrap = Math.floor(bodyRatio * 3)
    return {
      x: 18 + bodyRatio * 46,
      y: 48 + lineWrap * 5,
      tip: 'Drafting…',
      clicking: false,
    }
  }

  if (progress < 0.9) {
    return {
      x: 78,
      y: 88,
      tip: 'Sending…',
      clicking: progress > 0.82 && progress < 0.88,
    }
  }

  return { x: 78, y: 88, tip: '', clicking: false }
}

export function calendarCursor(progress: number): CursorState {
  if (progress < 0.12) {
    return { x: 72, y: 22, tip: '', clicking: false }
  }
  if (progress < 0.35) {
    const p = (progress - 0.12) / 0.23
    return {
      x: 72 - p * 32,
      y: 22 + p * 28,
      tip: '',
      clicking: false,
    }
  }
  if (progress < 0.55) {
    const p = (progress - 0.35) / 0.2
    return {
      x: 40 - p * 4,
      y: 50 + p * 18,
      tip: '',
      clicking: false,
    }
  }
  if (progress < 0.68) {
    return { x: 36, y: 70, tip: '', clicking: false }
  }
  if (progress < 0.75) {
    return {
      x: 36,
      y: 72,
      tip: 'Booked Tue 3:00 PM',
      clicking: true,
    }
  }
  return { x: 36, y: 72, tip: 'Booked Tue 3:00 PM', clicking: false }
}

export function pipelineCursor(progress: number): CursorState {
  if (progress < 0.15) {
    return { x: 48, y: 30, tip: '', clicking: false }
  }
  if (progress < 0.28) {
    const p = (progress - 0.15) / 0.13
    return {
      x: 48 + p * 6,
      y: 30 + p * 32,
      tip: '',
      clicking: false,
    }
  }
  if (progress < 0.65) {
    const p = clamp01((progress - 0.28) / 0.37)
    return {
      x: 54 + p * 30,
      y: 62 - p * 6,
      tip: 'Dragging…',
      clicking: progress < 0.34,
      dragging: true,
    }
  }
  if (progress < 0.78) {
    return {
      x: 86,
      y: 78,
      tip: 'Moved to Onsite',
      clicking: true,
    }
  }
  return { x: 86, y: 78, tip: 'Moved to Onsite', clicking: false }
}

export function matchCursor(progress: number): CursorState {
  if (progress < 0.2) {
    return { x: 88, y: 28, tip: '', clicking: false }
  }
  if (progress < 0.5) {
    const p = (progress - 0.2) / 0.3
    return {
      x: 90,
      y: 28 + p * 14,
      tip: 'Reviewing matches',
      clicking: false,
    }
  }
  if (progress < 0.62) {
    return {
      x: 91,
      y: 48,
      tip: 'Reviewing matches',
      clicking: false,
    }
  }
  if (progress < 0.72) {
    const p = (progress - 0.62) / 0.1
    return {
      x: 91 + p * 2,
      y: 48 + p * 16,
      tip: '',
      clicking: false,
    }
  }
  if (progress < 0.8) {
    return {
      x: 93,
      y: 66,
      tip: 'Saved · learning goals',
      clicking: true,
    }
  }
  return { x: 93, y: 66, tip: 'Saved · learning goals', clicking: false }
}
