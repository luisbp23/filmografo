/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#F08A5D',
          purple: '#6A2C70',
          yellow: '#F9ED69',
        }
      }
    }
  },
  plugins: [],
}