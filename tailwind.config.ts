import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          600: '#4c00fb',
          700: 'rgb(47, 0, 210)',
        },
        'ds-dark': 'rgba(19, 0, 50, 0.9)',
      },
      fontFamily: {
        'ds-indigo': ['"DS Indigo"', 'DSIndigo', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'ds-h3': ['20px', '25px'],
      },
      spacing: {
        '70': '17.5rem',
        '50': '12.5rem',
      },
    },
  },
  plugins: [],
} satisfies Config;