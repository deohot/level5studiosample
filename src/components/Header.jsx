import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

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
 *
 * On md+ the nav links sit inline. Below md they collapse into a neon glass
 * hamburger panel that matches the card / hover language used across the app.
 */
export default function Header({ activeSection }) {
  const [open, setOpen] = useState(false)

  // Close the mobile menu on Escape and lock scroll while it's open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-[68px] items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Reserved slot for the logo landing zone */}
        <div className="h-10 w-28" aria-hidden="true" />

        {/* ---- Desktop nav (md+) ---- */}
        <ul className="hidden items-center gap-6 font-display text-sm tracking-[0.2em] md:flex md:gap-10 md:text-base">
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

        {/* ---- Mobile hamburger trigger (below md) ---- */}
        <button
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-glow/25 bg-cyan-deep/20 backdrop-blur-md transition-all duration-300 hover:border-cyan-glow/90 hover:shadow-neon md:hidden"
        >
          <span className="relative block h-4 w-5">
            <span
              className={`absolute left-0 h-px w-full bg-cyan-glow shadow-neon-soft transition-all duration-300 ${
                open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-cyan-glow shadow-neon-soft transition-all duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-px w-full bg-cyan-glow shadow-neon-soft transition-all duration-300 ${
                open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : 'bottom-0'
              }`}
            />
          </span>
        </button>
      </nav>

      {/* ---- Mobile dropdown panel ---- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Click-away backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 top-[68px] z-40 bg-cyan-deep/10 backdrop-blur-[2px] md:hidden"
              aria-hidden="true"
            />

            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-x-4 top-[64px] z-50 overflow-hidden rounded-2xl border border-cyan-glow/25 bg-cyan-deep/30 backdrop-blur-xl shadow-neon md:hidden"
            >
              <ul className="flex flex-col p-2 font-display text-sm tracking-[0.2em]">
                {NAV.map(({ label, href }, i) => {
                  const id = href.slice(1)
                  const active = activeSection === id
                  return (
                    <motion.li
                      key={label}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.05 }}
                    >
                      <a
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`group flex items-center justify-between rounded-xl border px-4 py-3.5 uppercase transition-all duration-300 ${
                          active
                            ? 'border-cyan-glow/60 bg-cyan-glow/10 text-cyan-glow neon-text'
                            : 'border-transparent text-slate-200/80 hover:border-cyan-glow/60 hover:bg-cyan-glow/5 hover:text-cyan-glow'
                        }`}
                      >
                        {label}
                        <span
                          className={`h-1.5 w-1.5 rounded-full bg-cyan-glow shadow-neon-soft transition-all duration-300 ${
                            active
                              ? 'scale-100 opacity-100'
                              : 'scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                          }`}
                        />
                      </a>
                    </motion.li>
                  )
                })}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
