/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'purple-primary': '#cc73f8',
        'purple-secondary': '#b44fe0',
        'purple-dark': '#2d1b69',
        'rich-black': '#0a0014',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
};