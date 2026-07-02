const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Fixed transparent header. The top-left logo slot is intentionally left empty
 * here — the hero logo physically glides into it via the scroll transition
 * (see App.jsx). `activeSection` drives the neon underline.
 */
export default function Header({ activeSection }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-[68px] items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Reserved slot for the logo landing zone */}
        <div className="h-10 w-28" aria-hidden="true" />

        <ul className="flex items-center gap-6 font-display text-sm tracking-[0.2em] md:gap-10 md:text-base">
          {NAV.map(({ label, href }) => {
            const id = href.slice(1)
            const active = activeSection === id
            return (
              <li key={label} className="group relative">
                <a
                  href={href}
                  className={`relative inline-block py-1 uppercase transition-colors duration-300 ${
                    active
                      ? 'text-cyan-glow neon-text'
                      : 'text-slate-200/80 hover:text-cyan-glow'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-cyan-glow shadow-neon-soft transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              </li>
            )
          })}
        </ul>

        {/* Balancer to keep nav visually centered on wide screens */}
        <div className="hidden h-10 w-28 md:block" aria-hidden="true" />
      </nav>
    </header>
  )
}
