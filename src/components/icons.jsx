/**
 * Inline line-icons used by the About Us cards. They inherit color via
 * `currentColor`, so glow/active states are controlled entirely by the parent.
 */
export function SatelliteIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="15" y="15" width="10" height="10" transform="rotate(45 20 20)" />
      <path d="M6 14l6 6M28 8l6 6" />
      <path d="M30 22a8 8 0 0 1 0 8M34 18a14 14 0 0 1 0 16" />
      <path d="M20 28l-6 12" />
    </svg>
  )
}

export function RocketIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="14" cy="16" r="5" />
      <circle cx="12" cy="30" r="4" />
      <path d="M28 34c8-2 14-10 14-20 0 0-10 0-16 8-3 4-3 9 2 12z" />
      <path d="M30 30l-6-6" />
      <path d="M26 40l4-4" />
    </svg>
  )
}

export function TeamIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="16" r="5" />
      <circle cx="32" cy="20" r="4" />
      <path d="M10 34c0-5 4-8 8-8s8 3 8 8" />
      <path d="M28 30c1-2 3-3 5-3 3 0 6 2 6 6" />
    </svg>
  )
}
