/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridColumn: {
        "span-2by1": "span 2 / 1 ",
      },
    },
  },
  plugins: [],
};
