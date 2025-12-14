/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'zigzag-top': "radial-gradient(circle at 10px bottom, transparent 10px, currentColor 11px)",
        'zigzag-bottom': "radial-gradient(circle at 10px top, transparent 10px, currentColor 11px)",
      }
      // I might add more extensions later as needed for the receipts
    },
  },
  plugins: [],
}
