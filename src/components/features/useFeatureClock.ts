'use client'

import { useEffect, useState } from 'react'

export function useFeatureClock(cycleMs: number) {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - start) % cycleMs
      setPhase(elapsed / cycleMs)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [cycleMs])

  return phase
}
