Write-Host "[*] Setting up Influencore UI theme..."

# Paths
$tailwind = "tailwind.config.ts"
$indexcss = "src/index.css"

# Ensure src folder exists
if (-Not (Test-Path "src")) {
  New-Item -ItemType Directory -Path "src" | Out-Null
}

# Tailwind config
@"
import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        bg: '#0f1113',
        surface: '#16181a',
        muted: '#9aa4ad',
        text: '#e6eef8',
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
"@ | Set-Content $tailwind -Encoding UTF8

# index.css
@"
@tailwind base;
@tailwind components;
@tailwind utilities;

:root{
  --bg: #0f1113;
  --surface: #16181a;
  --muted: #9aa4ad;
  --text: #e6eef8;
  --primary: #4A90E2;
  --accent-2: #7C3AED;
  --glass: rgba(255,255,255,0.03);
  --radius: 12px;
  --shadow-1: 0 6px 18px rgba(2,6,23,0.6);
  --shadow-2: 0 10px 30px rgba(2,6,23,0.75);
}

body {
  background: linear-gradient(180deg, var(--bg), #0b0c0d 60%);
  color: var(--text);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
"@ | Set-Content $indexcss -Encoding UTF8

Write-Host "[*] Influencore UI theme files updated successfully."
