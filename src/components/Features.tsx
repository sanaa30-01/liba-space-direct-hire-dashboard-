export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">

        <div className="section-header">
          <p className="section-label">✦ Core Features</p>
          <h2 className="section-title">Precision Powered by Intelligence</h2>
        </div>

        {/* Row 1 */}
        <div className="features-row features-row--2col">

          {/* Feature 1: Instant Job Notification */}
          <div className="feature-card feature-card--large scroll-fade">
            <div className="feature-icon">
              <svg width="24" height="24" fill="none" stroke="var(--color-text-default)" viewBox="0 0 24 24">
                <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="feature-title">Instant Job Notification</h3>
            <p className="feature-body">
              Our neural network scans 50,000+ sources per second. Be the first to apply with precision-matched alerts that arrive before the job hits public boards.
            </p>
            <div className="feature-preview">
              <img src="/Instant_Job_Notification.png" alt="Instant Job Notification preview" loading="lazy" />
            </div>
          </div>

          {/* Feature 2: AI Agent Support */}
          <div className="feature-card feature-card--dark scroll-fade">
            <div className="feature-icon feature-icon--lime">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="feature-title feature-title--white">AI Agent Support</h3>
            <p className="feature-body feature-body--muted">
              A persistent career advocate that learns your goals, handles outreach, and manages your entire pipeline while you sleep.
            </p>
            <div className="feature-glow" />
          </div>

        </div>

        {/* Row 2 */}
        <div className="features-row features-row--3col">

          {/* Feature 3: AI Resume Customizer */}
          <div className="feature-card scroll-fade">
            <div className="feature-icon">
              <svg width="24" height="24" fill="none" stroke="var(--color-text-default)" viewBox="0 0 24 24">
                <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="feature-title">AI Resume Customizer</h3>
            <p className="feature-body">
              Instantly re-tune your resume for every application. 100% ATS-optimized, 0% effort.
            </p>
          </div>

          {/* Feature 4: AI Auto Apply — Figma node 47-2265 */}
          <div className="feature-card feature-card--auto-apply scroll-fade">
            <div className="auto-apply-grid">
              <div className="auto-apply-content">
                <div className="auto-apply-icon">
                  <img src="/img/features/auto_apply_icon.svg" alt="" />
                </div>
                <h3 className="feature-title">AI Auto Apply</h3>
                <p className="feature-body">
                  Scale your search effortlessly. Our agent automatically applies to over 3,000 curated positions that fit your criteria perfectly.
                </p>
              </div>
              <div className="auto-apply-gradient">
                <div className="auto-apply-ui">
                  <div className="aau-header">
                    <span className="aau-title">Auto Applying</span>
                    <span className="aau-live"><span className="aau-dot" />LIVE</span>
                  </div>
                  <div className="aau-list">
                    {[
                      { role: 'Product Manager', co: 'Stripe',    status: 'Sent' },
                      { role: 'UX Designer',     co: 'Figma',     status: 'Sent' },
                      { role: 'Data Analyst',    co: 'Airwallex', status: 'Queued' },
                    ].map((item) => (
                      <div key={item.role} className="aau-item">
                        <div className="aau-item-info">
                          <span className="aau-role">{item.role}</span>
                          <span className="aau-co">{item.co}</span>
                        </div>
                        <span className={`aau-status aau-status--${item.status.toLowerCase()}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <div className="aau-footer">
                    <span>315 Applied this week</span>
                    <span className="aau-rate">94% match rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
