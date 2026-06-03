const iconStroke = 'var(--color-text-default)'

const stats = [
  {
    id: 'search',
    icon: (
      <svg width="24" height="24" fill="none" stroke={iconStroke} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    value: '90%',
    label: 'less time spent on manual search',
  },
  {
    id: 'visibility',
    icon: (
      <svg width="24" height="24" fill="none" stroke={iconStroke} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    value: '3x',
    label: 'higher visibility to recruiters',
  },
  {
    id: 'apply',
    icon: (
      <svg width="24" height="24" fill="none" stroke={iconStroke} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    value: '300+',
    label: 'jobs auto-applied per week',
  },
  {
    id: 'opportunities',
    icon: (
      <svg width="24" height="24" fill="none" stroke={iconStroke} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      </svg>
    ),
    value: '∞',
    label: 'insider-only opportunities',
  },
]

export default function Why() {
  return (
    <section className="why" id="why">
      <div className="container">
        <div className="why-grid">
          {stats.map((stat, i) => (
            <div key={stat.id} className={`why-card fade-up d${i + 1}`}>
              <div className="why-icon">{stat.icon}</div>
              <div className="why-stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
              <div className="why-bar" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
