/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      "base": "#1B1B21",
      "primary": "#84A59D",
      "secondary": "#F28482",
      "accent": "#F6BD60",
      "content": "#F7EDE2",
    },
    extend: {
      fontFamily: {
        spacemono: ["SpaceMono"],
        chillax: ["Chillax"],
        poppins: ["Poppins"],
        quicksand: ["Quicksand"],
      }
    }
  },
  plugins: [],
}
