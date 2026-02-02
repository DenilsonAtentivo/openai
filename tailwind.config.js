/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        night: {
          900: '#0b0f17',
          800: '#111827',
          700: '#1f2937'
        },
        neon: {
          orange: '#ff7a00',
          blue: '#5aa7ff',
          green: '#5ee6a8',
          yellow: '#ffd166',
          red: '#ff5f6d'
        }
      },
      boxShadow: {
        glow: '0 0 25px rgba(90,167,255,0.25)',
        soft: '0 20px 60px rgba(3,7,18,0.65)'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: []
};
