/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'space-black': '#050816',
        'galaxy-navy': '#0B1026',
        'neon-cyan': '#00F5FF',
        'github-green': '#39FF14',
        'terminal-emerald': '#00FFB3',
        'cosmic-white': '#EAFBFF',
        'plasma-purple': '#7B61FF',
        'solar-amber': '#FFB703',
        'stellar-red': '#FF3366',
        'nebula-pink': '#FF61D8'
      },
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        space: ['Space Grotesk', 'sans-serif'],
        terminal: ['Share Tech Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-neon': 'pulse-neon 2s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out infinite',
        'warp': 'warp 1s ease-in-out',
        'scanline': 'scanline 4s linear infinite',
        'spin-slow': 'spin 8s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-neon': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.7', filter: 'brightness(1.5)' }
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' }
        },
        warp: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.5)', opacity: '0.5' },
          '100%': { transform: 'scale(0.8)', opacity: '0' }
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        },
        orbit: {
          'from': { transform: 'rotate(0deg) translateX(var(--orbit-radius, 150px)) rotate(0deg)' },
          'to': { transform: 'rotate(360deg) translateX(var(--orbit-radius, 150px)) rotate(-360deg)' }
        }
      },
      backdropBlur: {
        xs: '2px'
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00F5FF, 0 0 20px #00F5FF, 0 0 40px rgba(0,245,255,0.5)',
        'neon-purple': '0 0 10px #7B61FF, 0 0 20px #7B61FF, 0 0 40px rgba(123,97,255,0.5)',
        'neon-green': '0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px rgba(57,255,20,0.5)',
        'glass': '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
      }
    }
  },
  plugins: []
}
