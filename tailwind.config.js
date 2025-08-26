// tailwind.config.js
/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  /* Add this safelist to ensure dynamically-built class names are generated */
  safelist: [
    // generic color patterns used in your templates
    // adjust list of colors if you use additional names
    {
      pattern: /(bg|text|border)-(primary|secondary|muted|accent|card|popover|chart|sidebar|green|red|yellow|blue|gray|purple|pink)-(100|200|300|400|500|600|700)/,
      variants: ['hover', 'sm', 'md', 'lg', 'xl', 'dark']
    },
    {
      pattern: /(bg|text|border)-(primary|secondary|muted|accent|card|popover|chart|sidebar)(\/\d{1,3})?/,
    },
    // specific utility with opacity syntax
    { pattern: /bg-(card|primary|muted)\/(5|10|20|30|50|75|90)/ },
    // any explicit tokens used in components (muted-foreground, text-muted-foreground etc.)
    { pattern: /(text|bg|border)-(muted-foreground|card-foreground|background|foreground)/ }
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      /* ... rest of your theme ... */
    },
  },
  plugins: [animate],
};
