import { motion } from 'framer-motion'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative z-10 mx-auto max-w-6xl px-6 py-[16vh] md:px-12"
    >
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        className="mb-14 text-center font-display text-3xl uppercase tracking-[0.35em] text-cyan-glow neon-text md:text-4xl"
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ delay: index * 0.12, type: 'spring', stiffness: 90 }}
      className="group relative overflow-hidden rounded-2xl border border-cyan-glow/20 bg-cyan-deep/20 backdrop-blur-md transition-all duration-300 hover:border-cyan-glow/90 hover:shadow-neon"
    >
      {/* preview panel */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-cyan-glow/15 bg-gradient-to-br from-cyan-glow/10 to-transparent">
        <span className="font-display text-6xl font-bold text-cyan-glow/30 transition-all duration-500 group-hover:text-cyan-glow/60">
          0{index + 1}
        </span>

        {/* holographic stack overlay on hover */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cyan-deep/70 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <span className="font-display text-xs uppercase tracking-[0.3em] text-cyan-glow/80">
            Tech Stack
          </span>
          <div className="flex flex-wrap justify-center gap-2 px-4">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-cyan-glow/50 px-3 py-1 font-mono text-xs text-cyan-glow neon-text"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 font-display text-lg uppercase tracking-[0.12em] text-slate-100">
          {project.name}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-300/80">
          {project.tagline}
        </p>
        <button
          type="button"
          className="w-full rounded-lg border border-cyan-glow/60 bg-cyan-glow/5 py-2.5 font-display text-xs uppercase tracking-[0.25em] text-cyan-glow transition-all duration-300 hover:bg-cyan-glow/15 group-hover:animate-pulse-glow"
        >
          Launch Project
        </button>
      </div>
    </motion.article>
  )
}
