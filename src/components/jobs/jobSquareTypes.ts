export type SignalKind = 'founding' | 'hiring-fast' | 'new-team' | 'expansion'
export type JSSource = 'linkedin' | 'platform'

export type JSItem = {
  id: number
  source: JSSource
  manager: { name: string; title: string; initials: string; color: string }
  company: string
  companyInitials: string
  companyColor: string
  role: string
  signal: { kind: SignalKind; label: string; sub: string }
  /** 展示格式与 JobCard 一致：美国 City, ST；国际 City, Region, Country；多点用「 / 」分隔 */
  location: string
  salary: string
  posted: string
}

export const SIGNAL_META: Record<SignalKind, { emoji: string; bg: string; color: string }> = {
  founding: { emoji: '⭐', bg: '#f3e8ff', color: '#7c3aed' },
  'hiring-fast': { emoji: '⚡', bg: '#dcfce7', color: '#15803d' },
  'new-team': { emoji: '🟡', bg: '#fef9c3', color: '#a16207' },
  expansion: { emoji: '🌱', bg: '#dcfce7', color: '#166534' },
}
