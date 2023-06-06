/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    
    borderRadius: {
      none: '0',
      sm: '0.125rem',
      DEFAULT: '0.85rem',
      md: '0.375rem',
      lg: '0.5rem',
      xl: '0.75rem',
    },
    extend: {
      fontFamily: {
        apercu: ['var(--font-apercu)'],
        apercuMedium: ['var(--font-apercu-medium)'],
        apercuBold: ['var(--font-apercu-bold)'],
        montserrat: ['var(--font-montserrat)'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
