/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: '#000000', // Pure black
        wqf: '#ffffff', // Pure white
        'wqf-gray': '#1a1a1a', 
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'], 
      }
    },
  },
  plugins: [],
}