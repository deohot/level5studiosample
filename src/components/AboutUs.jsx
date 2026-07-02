import { useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import useTypewriter from '../hooks/useTypewriter'
import { aboutCards, orbitals } from '../data/about'

export default function AboutUs() {
  const sectionRef = useRef(null)
  const [scrollActive, setScrollActive] = useState(0)
  const [hovered, setHovered] = useState(null)

  // Scrub the active card to scroll position across the section.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const idx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2
    setScrollActive(idx)
  })

  // Hover overrides the scroll-driven state entirely.
  const activeIndex = hovered !== null ? hovered : scrollActive

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 mx-auto flex min-h-[200vh] max-w-6xl flex-col items-center px-6 pt-[12vh] md:px-12"
    >
      <div className="sticky top-[16vh] w-full">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          className="mb-12 text-center font-display text-3xl uppercase tracking-[0.35em] text-cyan-glow neon-text md:text-4xl"
        >
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {aboutCards.map((card, i) => (
            <Card
              key={card.key}
              card={card}
              active={activeIndex === i}
              onEnter={() => setHovered(i)}
              onLeave={() => setHovered(null)}
            />
          ))}
        </div>

        {/* Orbital tech-dot row */}
        <div className="mt-14 flex flex-wrap items-start justify-center gap-x-10 gap-y-8">
          {orbitals.map((label, i) => (
            <Orbital key={label} label={label} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Card({ card, active, onEnter, onLeave }) {
  const { Icon } = card
  // Type the body only for the active card; retypes on re-activation.
  const { output } = useTypewriter(card.body, active, 16)

  return (
    <motion.article
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={{
        y: active ? -5 : 0,
        scale: active ? 1.03 : 1,
        borderColor: active ? 'rgba(79,227,255,0.95)' : 'rgba(79,227,255,0.18)',
        boxShadow: active
          ? '0 0 18px rgba(79,227,255,0.55), 0 0 45px rgba(79,227,255,0.28), inset 0 0 22px rgba(79,227,255,0.12)'
          : '0 0 0 rgba(79,227,255,0)',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
      className="glass relative flex min-h-[340px] flex-col rounded-2xl border p-6"
    >
      {/* faint tech grid */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(79,227,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(79,227,255,0.6) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <div
        className={`relative mb-5 flex h-16 w-16 items-center justify-center transition-all duration-300 ${
          active ? 'text-cyan-glow' : 'text-slate-300/70'
        }`}
        style={active ? { filter: 'drop-shadow(0 0 8px #4fe3ff)' } : undefined}
      >
        <Icon />
      </div>
      <h3
        className={`relative mb-3 font-display text-xl uppercase tracking-[0.15em] transition-colors duration-300 ${
          active ? 'text-cyan-glow neon-text' : 'text-slate-200'
        }`}
      >
        {card.title}
      </h3>
      <p className="relative min-h-[7rem] font-mono text-sm leading-relaxed text-slate-200/85">
        {active ? output : ''}
        {active && (
          <span className="ml-0.5 inline-block h-4 w-2 -translate-y-0.5 animate-blink bg-cyan-glow align-middle" />
        )}
      </p>
    </motion.article>
  )
}

function Orbital({ label, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ delay }}
      className="flex w-24 flex-col items-center text-center"
    >
      <span className="mb-2 font-display text-[11px] uppercase leading-tight tracking-[0.12em] text-slate-200/80">
        {label}
      </span>
      <svg viewBox="0 0 60 30" className="h-6 w-16">
        <ellipse
          cx="30"
          cy="15"
          rx="26"
          ry="9"
          fill="none"
          stroke="rgba(79,227,255,0.5)"
          strokeWidth="1.2"
        />
        <circle cx="30" cy="15" r="4" fill="#4fe3ff">
          <animate
            attributeName="opacity"
            values="0.5;1;0.5"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </motion.div>
  )
}
