'use client'

export default function FeatureCursor({
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
