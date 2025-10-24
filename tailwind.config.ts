import type { Config } from 'tailwindcss';
import lineClamp from '@tailwindcss/line-clamp';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3490dc',
          50: '#e7f2fc',
          100: '#d2e7fa',
          200: '#a7cff5',
          300: '#7cb7ef',
          400: '#519fe9',
          500: '#3490dc',
          600: '#2872af',
          700: '#1d5481',
          800: '#113553',
          900: '#061726'
        },
        secondary: '#f9f9f9',
        accent: '#f97316'
      }
    }
  },
  plugins: [lineClamp]
};

export default config;
