/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#17211f",
        eucalyptus: "#2f7d66",
        mint: "#dff4eb",
        coral: "#f27d65",
        paper: "#fbfaf6",
        gold: "#e2b04b",
        ocean: "#2978a0"
      },
      boxShadow: {
        soft: "0 16px 40px rgba(23, 33, 31, 0.10)"
      }
    }
  },
  plugins: []
};
