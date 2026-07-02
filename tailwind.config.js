/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      colors: {
        cyan: {
          glow: '#4fe3ff',
          deep: '#0a2a3a',
        },
      },
      boxShadow: {
        neon: '0 0 5px #4fe3ff, 0 0 20px rgba(79,227,255,0.6), 0 0 45px rgba(79,227,255,0.35)',
        'neon-soft': '0 0 2px #4fe3ff, 0 0 12px rgba(79,227,255,0.35)',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(79,227,255,0.5)' },
          '50%': { boxShadow: '0 0 22px rgba(79,227,255,0.95)' },
        },
        glare: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '60%, 100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        blink: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        glare: 'glare 3.5s ease-in-out infinite',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
