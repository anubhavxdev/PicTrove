/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        primary: '#1f1f1f',
        accent: '#00ffd0',
        card: '#181818',
        text: '#f3f3f3',
        secondary: '#23272f',
      },
    },
  },
  plugins: [],
};
