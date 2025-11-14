// ...existing code...
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      container: { center: true, padding: '1rem' },
      colors: {
        brand: {
          DEFAULT: '#2563EB',
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A'
        },
        muted: '#94A3B8',
        glass: 'rgba(255,255,255,0.6)'
      },
      boxShadow: {
        glass: '0 2px 15px rgba(0,0,0,0.06)',
        soft: '0 6px 24px rgba(15,23,42,0.08)'
      },
      borderRadius: {
        xl: '1rem'
      }
    },
  },
  plugins: [],
}