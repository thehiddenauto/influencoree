import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // keep your canonical colors
        primary: '#4A90E2',
        bg: '#0f1113',
        surface: '#16181a',
        muted: '#9aa4ad',
        text: '#e6eef8',

        // compatibility aliases & theme tokens (added)
        // these let components that expect `brand`, `brand-hover`, `text-text`, etc. work
        brand: '#4A90E2',           // same as primary (alias)
        'brand-hover': '#357ab8',   // darker hover tone for brand CTA
        'text-text': '#e6eef8',     // alias for text
        'muted-foreground': '#9aa4ad',
        'primary-foreground': '#e6eef8' // if components reference primary-foreground
      },
      borderRadius: { xl: '12px' },
      boxShadow: {
        'elev-1': '0 6px 18px rgba(2,6,23,0.6)',
        'elev-2': '0 10px 30px rgba(2,6,23,0.75)',
      },
      fontFamily: { inter: ['Inter','ui-sans-serif','system-ui'] }
    }
  },
  plugins: [],
}
export default config
