/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend:
    {
      fontFamily: {
        'grotesk': ['Space Grotesk', 'sans-serif']
      },
    },
    colors: {
      transparent: 'transparent',
      'white': '#f0f0f0',
      'background': '#000f17',
      'black': '#0f0f0f',
      'purple': '#9000ff',
    },
  },
  plugins: [],
}

