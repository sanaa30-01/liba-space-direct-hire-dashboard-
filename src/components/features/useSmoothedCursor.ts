'use client'

import { useEffect, useRef, useState } from 'react'

export type CursorPoint = { x: number; y: number }

/** Eases cursor toward target each frame so movement reads like a real mouse */
export function useSmoothedCursor(target: CursorPoint, active: boolean) {
  const [pos, setPos] = useState(target)
  const targetRef = useRef(target)

  useEffect(() => {
    targetRef.current = target
  }, [target.x, target.y])

  useEffect(() => {
    if (!active) {
      setPos(targetRef.current)
      return
    }

    let raf = 0
    const smooth = 0.24
    const epsilon = 0.01

    const tick = () => {
      setPos(prev => {
        const t = targetRef.current
        const dx = t.x - prev.x
        const dy = t.y - prev.y
        if (Math.abs(dx) < epsilon && Math.abs(dy) < epsilon) {
          return prev
        }
        return {
          x: prev.x + dx * smooth,
          y: prev.y + dy * smooth,
        }
      })
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return pos
}
