/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: '#root',
  theme: {
    extend: {
      colors: {
        primary: '#23314B',
        customPrimaryWhite: '#F8FFF7',
        customSecondaryWhite: '#FFFEF1',
        secondary: '#0E121A',
        customSecondaryGray: '#3F4A5D',
        base: '#F7F7F7',
        baseDark: '#303131',
         customBlue: '#23314B',
         customGrey: '#3F4A5D',
      },
      fontFamily: {
        serif: ['serif'],
        sans: ['Roboto'],
      },
    },
  },
  plugins: [],
};
