const social = [
  { href: '#', src: '/img/footer/social/twitter.svg', alt: 'Twitter' },
  { href: '#', src: '/img/footer/social/facebook.svg', alt: 'Facebook' },
  { href: '#', src: '/img/footer/social/instagram.svg', alt: 'Instagram' },
  { href: '#', src: '/img/footer/social/linkedin.svg', alt: 'LinkedIn' },
]

const FOOTER_LOGO_ICON = '/img/footer/logo_icon.png'
const FOOTER_LOGO_WORDMARK = '/img/footer/logo_wordmark.png'
const FOOTER_HELP_QR = '/img/footer/help_qr.png'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-brand">
          <img src={FOOTER_LOGO_ICON} alt="JobNova icon" width={48} height={48} />
          <img src={FOOTER_LOGO_WORDMARK} alt="JobNova" width={129} height={26} />
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Address</p>
          <p className="footer-col-body">1055 N Capitol Ave,<br />San Jose, CA, 95133</p>
          <p className="footer-col-title" style={{ marginTop: 24 }}>Contact</p>
          <p className="footer-col-body">support@jobnova.ai</p>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Navigation</p>
          <nav className="footer-nav">
            <a href="#features">Feature</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQs</a>
            <a href="#">Affiliate 30%</a>
          </nav>
        </div>

        <div className="footer-col">
          <p className="footer-col-title">Help</p>
          <img
            src={FOOTER_HELP_QR}
            alt="QR Code — Scan to download app"
            width={146}
            height={146}
            className="footer-qr"
          />
        </div>

      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          {social.map((s) => (
            <a key={s.alt} href={s.href} aria-label={s.alt}>
              <img src={s.src} alt={s.alt} width={24} height={24} />
            </a>
          ))}
        </div>
        <p className="footer-copy">© 2026 JobNova. All rights reserved.</p>
      </div>
    </footer>
  )
}
