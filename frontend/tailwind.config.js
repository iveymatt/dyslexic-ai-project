/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ffe6f7',
          100: '#ffccef',
          200: '#ffb3e7',
          300: '#ff99df',
          400: '#ff80d7',
          500: '#FF66CC', // Main Pink
          600: '#e052b8',
          700: '#c23d9f',
          800: '#a32986',
          900: '#85146d',
        },
        accent: {
          50: '#e6f7ff',
          100: '#ccefff',
          200: '#b3e7ff',
          300: '#99dfff',
          400: '#80d7ff',
          500: '#66CCFF', // Baby Blue
          600: '#52b8e6',
          700: '#3da3cc',
          800: '#298fb3',
          900: '#147a99',
        },
        highlight: {
          50: '#e6fff0',
          100: '#ccffe0',
          200: '#99ffc2',
          300: '#66ffa3',
          400: '#33ff85',
          500: '#19EF22', // Neon Green
          600: '#15d91f',
          700: '#12c01b',
          800: '#0ea617',
          900: '#0b8d13',
        },
        orange: {
          50: '#ffe8e0',
          100: '#ffd1c2',
          200: '#ffb399',
          300: '#ff9470',
          400: '#ff7638',
          500: '#FF5C00', // Orange Highlight
          600: '#e65200',
          700: '#cc4900',
          800: '#b33f00',
          900: '#993600',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        dyslexic: ['OpenDyslexic', 'Comic Sans MS', 'Verdana', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}
