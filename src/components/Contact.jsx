import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Wire this to your backend / form service. Demo: local confirmation only.
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <section
      id="contact"
      className="relative z-10 mx-auto max-w-2xl px-6 py-[16vh] md:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        className="mb-4 text-center font-display text-3xl uppercase tracking-[0.35em] text-cyan-glow neon-text md:text-4xl"
      >
        Contact
      </motion.h2>
      <p className="mb-12 text-center text-sm tracking-wide text-slate-300/70">
        Open a channel. We usually respond within one orbit.
      </p>

      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="glass space-y-6 rounded-2xl border border-cyan-glow/20 p-8"
      >
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            type="text"
            required
            placeholder="Commander Name"
            className="w-full rounded-lg border border-cyan-glow/25 bg-slate-950/40 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            type="email"
            required
            placeholder="you@station.io"
            className="w-full rounded-lg border border-cyan-glow/25 bg-slate-950/40 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </Field>

        <Field label="Message" htmlFor="message">
          <textarea
            id="message"
            required
            rows={4}
            placeholder="Transmit your mission brief…"
            className="w-full resize-none rounded-lg border border-cyan-glow/25 bg-slate-950/40 px-4 py-3 text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400"
          />
        </Field>

        <button
          type="submit"
          className="relative w-full overflow-hidden rounded-lg border border-cyan-glow/60 bg-cyan-glow/10 py-3.5 font-display text-sm uppercase tracking-[0.3em] text-cyan-glow transition-colors duration-300 hover:bg-cyan-glow/20"
        >
          {/* continuous scanning glare */}
          <span className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-glare bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <span className="relative">
            {sent ? 'Signal Transmitted ✓' : 'Transmit Message'}
          </span>
        </button>
      </motion.form>
    </section>
  )
}

function Field({ label, htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-2 block font-display text-xs uppercase tracking-[0.2em] text-slate-300/80">
        {label}
      </span>
      {children}
    </label>
  )
}
