/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
    "animation": {
    "background-shine": "background-shine 2s linear infinite"
  },
  "keyframes": {
    "background-shine": {
      "from": {
        "backgroundPosition": "0 0"
      },
      "to": {
        "backgroundPosition": "-200% 0"
      }
    }
  }
    },
    colors: {
      'black': '#141414',
      'ash-black': '#222424',
      'white': '#f4f4f2',
      'ultra-light-gray': '#9c9c9c',
      'apple': '#e1e1e1',
      'green': '#00ff00',
      'red': '#ff0000',
      'yellow': '#ffd500',
      'silver': '#d2d4d6',
      'white-smoke': '#d8d8d8',
    },
  },
  
  plugins: [],
}

