/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#4cd137',
        primaryFocus: '#d3f1cd',
        primaryHover: '#3cb52a',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
