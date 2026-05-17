/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mahogany-wine palette — pulls the existing "chocolate" usage toward
        // the warm dark tones of the logo's ribbon and gives the dark hero
        // section a richer, jewel-toned feel.
        chocolate: {
          DEFAULT: '#4A1F23',
          50: '#F8EFEC',
          100: '#EAD6D2',
          200: '#C9A6A1',
          300: '#A47570',
          400: '#7A4742',
          500: '#4A1F23',
          600: '#3D171C',
          700: '#2F1015',
          800: '#210A0F',
          900: '#14060A',
        },
        // Burgundy/wine — matches the logo's ribbon. Use for badges, accents,
        // hover states, decorative chips.
        wine: {
          DEFAULT: '#8B1F2A',
          50: '#FCEAEC',
          100: '#F4C7CC',
          200: '#E68A92',
          300: '#C84F5C',
          400: '#A82F3D',
          500: '#8B1F2A',
          600: '#6E1620',
          700: '#511019',
        },
        // Warm cream — softened slightly to match the cake-board ivory in
        // the new logo and About hero image.
        cream: {
          DEFAULT: '#FBF1D6',
          50: '#FEF8E6',
          100: '#FBF1D6',
          200: '#F6E6BC',
          300: '#EFD89A',
        },
        // Gold — unchanged. Already matches the cupcake and lettering in the
        // logo and reads well on the new mahogany dark surfaces.
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
        lexend: ['"Lexend"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        cake: '0 12px 30px -12px rgba(62, 39, 35, 0.35)',
      },
    },
  },
  plugins: [],
}
