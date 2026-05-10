/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        chocolate: {
          DEFAULT: '#3E2723',
          50: '#F5EFEC',
          100: '#E8DCD7',
          200: '#C9AFA5',
          300: '#A98274',
          400: '#7A5446',
          500: '#3E2723',
          600: '#33201D',
          700: '#281917',
          800: '#1C1210',
          900: '#110B0A',
        },
        cream: {
          DEFAULT: '#FFFDD0',
          50: '#FFFEF0',
          100: '#FFFDD0',
          200: '#FBF6B4',
          300: '#F4ED98',
        },
        gold: {
          DEFAULT: '#D4AF37',
          50: '#FAF3D9',
          100: '#F2E2A4',
          200: '#E6CB6C',
          300: '#D4AF37',
          400: '#B0902A',
          500: '#8C7220',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cake: '0 12px 30px -12px rgba(62, 39, 35, 0.35)',
      },
    },
  },
  plugins: [],
}
