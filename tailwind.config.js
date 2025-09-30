/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        bg: 'var(--bg)',
        'text-headers': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-accent': 'var(--accent-color)',
        btn: 'var(--btn-color)',
      },
      borderRadius: {
        br: 'var(--border)',
      },
    },
  },
  plugins: [],
}
