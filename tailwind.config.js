/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'Arial', 'sans-serif'],
        display: ['"Space Grotesk"', 'Arial', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'serif'],
        mono: ['"DM Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        mecha: {
          black: '#0B0B0E',
          white: '#FFFFFF',
          dark1: '#111317',
          dark2: '#1A1D23',
          dark3: '#2A2D34',
          light1: '#E5E5E7',
          light2: '#F5F5F5',
        }
      }
    },
  },
  plugins: [],
}
