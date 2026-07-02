import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import StarField from './components/StarField'
import Header from './components/Header'
import Logo from './components/Logo'
import AboutUs from './components/AboutUs'
import Projects from './components/Projects'
import Contact from './components/Contact'
import useTypewriter from './hooks/useTypewriter'

export default function App() {
  const heroRef = useRef(null)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll progress across the hero spacer drives the logo → header handoff.
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Logo travels from dead-center (large) to the top-left header slot (small).
  const logoScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.28])
  const logoLeft = useTransform(scrollYProgress, [0, 0.5], ['50%', '19%'])
  const logoTop = useTransform(scrollYProgress, [0, 0.5], ['45%', '4.2%'])

  // Central headline clears the stage early in the scroll.
  const textOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 0.22], [0, -40])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])

  // Hero headline types itself out on mount.
  const { output, done } = useTypewriter('Level Five Studio', true, 90)

  // Scroll-spy for the header underline.
  useEffect(() => {
    const ids = ['home', 'projects', 'about', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative w-full">
      <StarField />
      <Header activeSection={activeSection} />

      {/* ---- Moving logo: fixed, glides from center into the header slot ---- */}
      <motion.div
        style={{
          left: logoLeft,
          top: logoTop,
          scale: logoScale,
          x: '-50%',
          y: '-50%',
        }}
        className="pointer-events-none fixed z-[60] flex h-[210px] w-[280px] items-center justify-center"
      >
        <Logo className="h-full w-full" />
      </motion.div>

      {/* ---- Central headline + typing cursor (fades out on scroll) ---- */}
      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="pointer-events-none fixed inset-x-0 top-[62%] z-40 flex flex-col items-center px-6 text-center"
      >
        <h1 className="font-display text-3xl font-bold tracking-[0.14em] text-slate-50 neon-text sm:text-5xl md:text-6xl">
          {output}
          <span
            className={`ml-1 inline-block h-[1em] w-[3px] translate-y-[0.12em] bg-cyan-glow align-middle ${
              done ? 'animate-blink' : ''
            }`}
          />
        </h1>
        <p className="mt-5 font-display text-xs uppercase tracking-[0.4em] text-cyan-glow/70">
          Software Development &middot; Design
        </p>
      </motion.div>

      {/* ---- Scroll hint ---- */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex flex-col items-center gap-2 text-cyan-glow/70"
      >
        <span className="font-display text-[10px] uppercase tracking-[0.35em]">
          Scroll to Explore
        </span>
        <span className="flex h-8 w-5 justify-center rounded-full border border-cyan-glow/50 pt-1.5">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-cyan-glow" />
        </span>
      </motion.div>

      {/* ---- Hero scroll spacer: provides the runway for the transition ---- */}
      <section id="home" ref={heroRef} className="h-[150vh]" />

      {/* ---- Content ---- */}
      <main className="relative">
        <AboutUs />
        <Projects />
        <Contact />
      </main>

      <footer className="relative z-10 border-t border-cyan-glow/10 py-8 text-center font-display text-xs uppercase tracking-[0.3em] text-slate-400/70">
        © 2026 Level Five Studio — Building beyond the atmosphere
      </footer>
    </div>
  )
}
