import type { Metadata } from 'next'
import '../tokens.css'
import '../style.css'
import '../agent-workstation.css'
import '../resume-workstation.css'
import '../auto-apply-workstation.css'

export const metadata: Metadata = {
  title: 'JobNova — AI Career Intelligence',
  description: 'The new way talent meets opportunity in the AI era. Navigate your career rise with effortless intelligence.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Inter:wght@400;500;600;700&family=Lexend:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
