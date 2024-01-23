/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          background: '#0F0F0F',
          'button-back': '#1B1C1D',
          'active-component': '#28292B',
          text: '#ECECEC',
          icon: '#A5A6A6',
        },
        light: {
          background: '#E9E9E9',
          'button-back': '#FFFFFF',
          'active-component': '#E9E9EB',
          text: '#060609',
          icon: '#6E727F',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')
  ],
}

