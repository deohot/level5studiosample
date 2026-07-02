import { useEffect, useRef, useState } from 'react'

/**
 * Types out `text` one character at a time whenever `active` becomes true.
 * Resets to empty when `active` is false so the effect replays on re-entry.
 *
 * @param {string} text   Full string to reveal.
 * @param {boolean} active Whether the typing should be running.
 * @param {number} speed  Milliseconds per character.
 */
export default function useTypewriter(text, active, speed = 28) {
  const [output, setOutput] = useState('')
  const frameRef = useRef(null)

  useEffect(() => {
    // Clear any in-flight timer whenever inputs change or on unmount.
    const clear = () => frameRef.current && clearTimeout(frameRef.current)

    if (!active) {
      clear()
      setOutput('')
      return clear
    }

    let i = 0
    const tick = () => {
      setOutput(text.slice(0, i))
      if (i <= text.length) {
        i += 1
        frameRef.current = setTimeout(tick, speed)
      }
    }
    tick()

    return clear
  }, [text, active, speed])

  const done = output.length >= text.length
  return { output, done }
}
