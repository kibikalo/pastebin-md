/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,}"],
  content: ["./index.html", "./src/**/*.{html,js,ts,jsx,tsx,}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light: {
          background: '#E9E9E9',
          'button-back': '#FFFFFF',
          'active-component': '#CDCDD7',
          text: '#060609',
          icon: '#6E727F',
          border: '#C4C4C7',
        },
        dark: {
          background: '#212121',
          'button-back': '#232326',
          'active-component': '#41414d',
          text: '#E6E6ED',
          icon: '#A5A6A6',
          border: '#434346',
        },
      },
    },
  },
  variants: {
    extend: {
      borderRadius: ['first', 'last'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar')
  ],
}

