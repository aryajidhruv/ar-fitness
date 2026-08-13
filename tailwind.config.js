/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        iron: { DEFAULT: "#131110", 2: "#1c1817", 3: "#262120" },
        bone: { DEFAULT: "#EDE6DA", dim: "#9a938a" },
        brass: { DEFAULT: "#D69B3F", lite: "#F0C878" },
        rust: "#8C4A2F"
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        cond: ["var(--font-cond)", "sans-serif"]
      }
    }
  },
  plugins: []
};
