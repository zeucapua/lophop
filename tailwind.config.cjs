/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        spacemono: ["SpaceMono"],
        chillax: ["Chillax"],
        poppins: ["Poppins"],
        quicksand: ["Quicksand"],
      }
    }
  },
  plugins: [require("daisyui")],
}
