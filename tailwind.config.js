/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      colors: {
        mecha: {
          blue: '#2563EB',
          red: '#DC2626',
          yellow: '#EAB308',
          dark: '#18181B',
          light: '#FAFAFA',
          panel: '#FFFFFF',
          border: '#E4E4E7'
        }
      },
      boxShadow: {
        'hard': '4px 4px 0px 0px #18181B',
        'hard-hover': '2px 2px 0px 0px #18181B',
      }
    },
  },
  plugins: [],
}
