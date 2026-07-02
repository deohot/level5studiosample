/**
 * Level Five Studio mark — an arrow-"L" fused with a circuit-style "5".
 * Rendered as inline SVG so it stays razor-sharp while it scales during the
 * hero → header scroll transition. Swap this file's paths for your own vector
 * export whenever you have a production logo ready.
 */
export default function Logo({ className = '', glow = 1 }) {
  return (
    <svg
      viewBox="0 0 220 170"
      className={className}
      style={{
        filter: `drop-shadow(0 0 ${6 * glow}px #7fefff) drop-shadow(0 0 ${
          22 * glow
        }px rgba(79,227,255,${0.75 * glow}))`,
        overflow: 'visible',
      }}
      fill="none"
      stroke="#9df3ff"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Level Five Studio logo"
    >
      {/* ---- Arrow "L" ---- */}
      {/* upward arrowhead */}
      <path d="M50 16 L30 50 L44 50 L44 150 L120 150 L120 136 L58 136 L58 50 L70 50 Z" />
      {/* inner arrow shaft accent */}
      <path d="M50 34 L50 120" strokeWidth="3" opacity="0.85" />

      {/* ---- Circuit "5" ---- */}
      <path d="M170 46 L108 46 L108 92 L146 92 C168 92 176 104 176 120 C176 142 158 152 134 150 L116 150" />
      {/* circuit nodes + traces */}
      <path d="M132 60 L150 60" strokeWidth="3" />
      <circle cx="156" cy="60" r="5" fill="#9df3ff" stroke="none" />
      <path d="M120 74 L138 74" strokeWidth="3" />
      <circle cx="144" cy="74" r="5" fill="#9df3ff" stroke="none" />
      <circle cx="150" cy="122" r="5" fill="#9df3ff" stroke="none" />
    </svg>
  )
}
