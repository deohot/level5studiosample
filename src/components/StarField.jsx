import { useEffect, useRef } from 'react'

/**
 * Full-screen canvas overlay: twinkling stars + occasional slow shooting stars.
 * Driven by a single requestAnimationFrame loop and drawn onto a fixed,
 * pointer-events-none canvas so it never interferes with scroll performance.
 */
export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let width = 0
    let height = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let stars = []
    let meteors = []
    let rafId = null
    let running = true

    const rand = (min, max) => min + Math.random() * (max - min)

    const buildStars = () => {
      // Density scales with viewport area, capped for performance.
      const count = Math.min(260, Math.floor((width * height) / 6500))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(0.3, 1.4),
        base: rand(0.2, 0.9),
        // twinkle phase + speed
        phase: rand(0, Math.PI * 2),
        speed: rand(0.6, 2.2),
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      buildStars()
    }

    const spawnMeteor = () => {
      // Enter from the top edge, drift diagonally down-right, slow and subtle.
      meteors.push({
        x: rand(width * 0.1, width * 0.9),
        y: rand(-40, height * 0.2),
        len: rand(80, 160),
        speed: rand(2.2, 4.2),
        angle: rand(Math.PI / 6, Math.PI / 3.5),
        life: 0,
        maxLife: rand(90, 150),
      })
    }

    let last = 0
    const draw = (t) => {
      if (!running) return
      const dt = (t - last) / 1000 || 0
      last = t
      ctx.clearRect(0, 0, width, height)

      // --- twinkling stars ---
      for (const s of stars) {
        s.phase += s.speed * dt
        const twinkle = s.base * (0.55 + 0.45 * Math.sin(s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(190, 240, 255, ${twinkle})`
        ctx.fill()
      }

      // --- shooting stars ---
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.life += 1
        m.x += Math.cos(m.angle) * m.speed
        m.y += Math.sin(m.angle) * m.speed

        const tailX = m.x - Math.cos(m.angle) * m.len
        const tailY = m.y - Math.sin(m.angle) * m.len
        const fade =
          Math.min(m.life / 15, 1) * Math.min((m.maxLife - m.life) / 20, 1)

        const grad = ctx.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, `rgba(200, 245, 255, ${0.9 * fade})`)
        grad.addColorStop(1, 'rgba(200, 245, 255, 0)')
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(m.x, m.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()

        // bright head
        ctx.beginPath()
        ctx.arc(m.x, m.y, 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(230, 250, 255, ${fade})`
        ctx.fill()

        if (m.life > m.maxLife || m.x > width + 200 || m.y > height + 200) {
          meteors.splice(i, 1)
        }
      }

      // Randomly spawn a meteor (~ every few seconds).
      if (meteors.length < 2 && Math.random() < 0.004) spawnMeteor()

      rafId = requestAnimationFrame(draw)
    }

    // Pause the loop when the tab is hidden to save cycles.
    const onVisibility = () => {
      running = !document.hidden
      if (running) {
        last = 0
        rafId = requestAnimationFrame(draw)
      } else if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    document.addEventListener('visibilitychange', onVisibility)
    rafId = requestAnimationFrame(draw)

    return () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
