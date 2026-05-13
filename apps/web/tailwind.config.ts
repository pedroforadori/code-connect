import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'app-bg': '#0a0d14',
        'card': '#1f242e',
        'input-bg': '#171b23',
        'input-border': '#2a2f3a',
        'divider': '#2a2f3a',
        'brand': {
          DEFAULT: '#84F573',
          hover: '#9bff8a',
          ink: '#0a0d14',
        },
        'content': {
          primary: '#FFFFFF',
          secondary: '#B7BDC9',
          muted: '#7A8290',
          link: '#84F573',
        },
      },
      borderRadius: {
        card: '24px',
        field: '12px',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 30px 80px -20px rgba(0,0,0,0.6)',
      },
    },
  },
} satisfies Config