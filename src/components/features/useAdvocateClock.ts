'use client'

import { useEffect, useState } from 'react'
import { ADVOCATE_CYCLE_MS } from './advocateAnimation'

export function useAdvocateClock() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - start) % ADVOCATE_CYCLE_MS
      setPhase(elapsed / ADVOCATE_CYCLE_MS)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return phase
}
