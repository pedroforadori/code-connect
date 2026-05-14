import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Design system palette (Figma)
        grafite: '#00090E',
        'cinza-escuro': '#171D1F',
        'cinza-medio': '#888888',
        offwhite: '#E1E1E1',
        'verde-destaque': '#81FE88',
        'verde-petroleo': '#132E35',

        // Semantic tokens
        'app-bg': '#00090E',
        card: '#171D1F',
        'input-bg': '#888888',
        'input-border': '#666666',
        'input-text': '#171D1F',
        divider: '#2a2f3a',
        brand: {
          DEFAULT: '#81FE88',
          hover: '#9bff8a',
          ink: '#132E35',
        },
        content: {
          primary: '#E1E1E1',
          secondary: '#B7BDC9',
          muted: '#888888',
          link: '#81FE88',
        },
      },
      borderRadius: {
        card: '32px',
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