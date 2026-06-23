/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        pumpkin: {
          DEFAULT: '#FE7F2D',
          deep: '#D9591A',
          light: '#FFB454',
        },
        charcoal: {
          DEFAULT: '#233D4D',
          deep: '#172A36',
        },
        forge: {
          base: 'var(--bg-base)',
          surface: 'var(--bg-surface)',
          elevated: 'var(--bg-elevated)',
          card: 'var(--bg-card)',
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          accent: 'var(--accent)',
          'accent-alt': 'var(--accent-alt)',
          border: 'var(--border)',
        },
      },
    },
  },
  plugins: [],
};
