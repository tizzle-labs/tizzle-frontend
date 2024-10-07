/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00EC97',
        cortez: {
          blue: '#203088',
        },
        akira: {
          gold: '#A78450',
        },
        bale: {
          taro: '#525B88',
        },
      },
    },
  },
  plugins: [],
};
