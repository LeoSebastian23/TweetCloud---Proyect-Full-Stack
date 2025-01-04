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
        mountainMeadow: {
          50: 'var(--mountain-meadow-50)',
          100: 'var(--mountain-meadow-100)',
          200: 'var(--mountain-meadow-200)',
          300: 'var(--mountain-meadow-300)',
          400: 'var(--mountain-meadow-400)',
          500: 'var(--mountain-meadow-500)',
          600: 'var(--mountain-meadow-600)',
          700: 'var(--mountain-meadow-700)',
          800: 'var(--mountain-meadow-800)',
          900: 'var(--mountain-meadow-900)',
          950: 'var(--mountain-meadow-950)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
