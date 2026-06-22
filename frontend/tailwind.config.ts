import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Gold colors
        gold: {
          DEFAULT: '#F59E0B',
          light: '#FCD34D',
          dark: '#D97706',
        },
        // Dark theme colors (COMPLETE SPEC)
        dark: {
          950: '#0A0F1E',
          900: '#1A1F35',
          800: '#2A2F45',
          700: '#3A3F55',
          600: '#2A2F45',
        },
        // Semantic colors (COMPLETE)
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#3B82F6',
        // Text colors
        'text-primary': '#FFFFFF',
        'text-secondary': '#D1D5DB',
        'text-tertiary': '#9CA3AF',
        'text-muted': '#6B7280',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'gold': '0 10px 30px -5px rgba(245, 158, 11, 0.3)',
        'card-hover': '0 20px 40px -10px rgba(245, 158, 11, 0.2)',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
        '3xl': '48px',
      },
      fontSize: {
        'xs': '12px',
        'sm': '14px',
        'base': '16px',
        'lg': '18px',
        'xl': '20px',
        '2xl': '24px',
        '3xl': '28px',
        '4xl': '36px',
        '5xl': '48px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'base': '8px',
        'md': '12px',
        'lg': '12px',
        'xl': '16px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
export default config
