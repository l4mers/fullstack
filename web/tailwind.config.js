/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/styles/*.css'],
  theme: {
    extend: {
      colors: {
        primaryRed: '#EB737A',
        secondaryOrange: '#FD7E40',
        textBlack: '#282828',
        holidazeGrey: '#9A9A9A',
        background: '#F8F4F2',
        inactiveBackground: '#E7E7E7',
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif'],
        josefinsSans: ['Josefin Sans', 'sans-serif'],
        carena: ['Carena', 'sans-serif'],
      },
      screens: {
        smallScreen: '394px',
        profileSmallScreen: '474px',
      },
      animation: {
        'bounce-right': 'bounce-right 1.5s ease-in-out infinite',
      },
      keyframes: {
        'bounce-right': {
          '0%, 100%': {
            transform: 'translateX(25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '50%': {
            transform: 'none',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
      },
    },
  },
  plugins: [],
};
