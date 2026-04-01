import type { JSItem } from './jobSquareTypes'

type JobSquareCardProps = {
  item: JSItem
  onContact: (item: JSItem) => void
}

export default function JobSquareCard({ item, onContact }: JobSquareCardProps) {
  const isLinkedin = item.source === 'linkedin'

  return (
    <div className="js-card">
      <div className="js-card-top">
        <div className="js-manager">
          <div className="js-manager-av" style={{ background: item.manager.color }}>
            {item.manager.initials}
          </div>
          <div className="js-manager-info">
            <p className="js-manager-name">{item.manager.name}</p>
            <p className="js-manager-title">{item.manager.title}</p>
          </div>
        </div>
        <span className="js-posted">{item.posted}</span>
      </div>

      <div className="js-card-mid">
        <div className="js-job-info">
          <p className="js-role">{item.role}</p>
          <p className="js-company">{item.company}</p>
        </div>
      </div>

      <div className="js-card-ft">
        <div className="jb-loc-row js-card-ft-loc">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          <span className="jb-loc">{item.location}</span>
        </div>
        <div className="js-ft-actions">
          {isLinkedin ? (
            <button className="js-btn js-btn--linkedin" onClick={() => onContact(item)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              Apply
            </button>
          ) : (
            <button className="js-btn js-btn--contact" onClick={() => onContact(item)}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Contact
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
