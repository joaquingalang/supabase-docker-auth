/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'neomorphic-dark': `
          inset 5px 5px 16px -1px #000000,
          inset -3px -3px 18px -6px #C9B7C5,
          5px 5px 10px 0px rgba(43, 26, 38, 0.55)
        `,
      },
    },
  },
  plugins: [],
}
