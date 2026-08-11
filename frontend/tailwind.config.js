/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand cyan (primary accent)
        cyan: {
          50: '#e6f9ff',
          100: '#ccf3ff',
          200: '#99e7ff',
          300: '#66dbff',
          400: '#33cfff',
          500: '#00CBFF',
          600: '#00a3cc',
          700: '#007a99',
          800: '#005266',
          900: '#002933',
        },
        // Brand magenta (secondary accent)
        magenta: {
          50: '#ffe6f4',
          100: '#ffcce9',
          200: '#ff99d3',
          300: '#ff69b4',
          400: '#ff3d9e',
          500: '#FF1493',
          600: '#C71585',
          700: '#9b1068',
          800: '#6e0c4a',
          900: '#42072d',
        },
        // Brand green (tertiary accent)
        neon: {
          50: '#eaffed',
          100: '#d4ffdb',
          200: '#a8ffb7',
          300: '#7dff93',
          400: '#5cff73',
          500: '#39FF14',
          600: '#2DD60F',
          700: '#22a80c',
          800: '#177a08',
          900: '#0c4d05',
        },
        // Warm earth tones
        earth: {
          50: '#faf8f4',
          100: '#f7f4ef',
          200: '#e8d5b7',
          300: '#c4b5a0',
          400: '#a8a39d',
          500: '#8B7355',
          600: '#6B5D4F',
          700: '#4A5D4F',
          800: '#3E3731',
          900: '#1A1614',
        },
      },
      fontFamily: {
        sans: ['Futura', 'Avenir Next', 'Century Gothic', '-apple-system', 'sans-serif'],
        serif: ['Libre Baskerville', 'Georgia', 'serif'],
        code: ['JetBrains Mono', 'monospace'],
        dyslexic: ['OpenDyslexic', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      boxShadow: {
        'cantilever': '0 12px 40px rgba(62, 55, 49, 0.15)',
        'horizontal': '0 2px 8px rgba(62, 55, 49, 0.08)',
        'deep': '0 24px 60px rgba(62, 55, 49, 0.25)',
        'subtle': '0 4px 12px rgba(62, 55, 49, 0.08)',
        'medium': '0 8px 24px rgba(62, 55, 49, 0.12)',
      },
      animation: {
        'cantilever': 'cantilever 6s ease-in-out infinite',
        'organic-grow': 'organic-grow 8s ease-in-out infinite',
        'slow-pulse': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        cantilever: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-8px) translateX(4px)' },
        },
        'organic-grow': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.2' },
          '50%': { transform: 'scale(1.2)', opacity: '0.4' },
        },
      },
    },
  },
  plugins: [],
  darkMode: ['selector', '[data-theme="dark"]'],
}
