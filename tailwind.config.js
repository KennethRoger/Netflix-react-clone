/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
      },
      backgroundImage: {
        'hero-pattern': "url('./src/assets/stocks/image/netflix-login-bg.webp')"
      }
    },
  },
  plugins: [],
}

