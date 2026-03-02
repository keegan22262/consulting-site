

import type { Config } from "tailwindcss";
import tokens from "./tokens/tokens.json" assert { type: "json" };

const extract = (obj: Record<string, any>) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v.value]));


const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          50: 'var(--n50)',
          100: 'var(--n100)',
          200: 'var(--n200)',
          300: 'var(--n300)',
          400: 'var(--n400)',
          500: 'var(--n500)',
          600: 'var(--n600)',
          700: 'var(--n700)',
          800: 'var(--n800)',
          900: 'var(--n900)'
        },
        accent: {
          50: 'var(--a50)',
          100: 'var(--a100)',
          200: 'var(--a200)',
          300: 'var(--a300)',
          500: 'var(--a500)',
          600: 'var(--a600)',
          700: 'var(--a700)',
          800: 'var(--a800)',
          900: 'var(--a900)'
        },
        orange: {
          500: 'var(--o500)',
          600: 'var(--o600)',
          700: 'var(--o700)'
        },
        white: 'var(--white)',
        semantic: {
          success: 'var(--semantic-success)',
          successLight: 'var(--semantic-success-light)',
          warning: 'var(--semantic-warning)',
          warningLight: 'var(--semantic-warning-light)',
          error: 'var(--semantic-error)',
          errorLight: 'var(--semantic-error-light)'
        },
        // Figma-aligned semantic color keys
        background: {
          primary: 'var(--bg-primary)',
          inverse: 'var(--bg-inverse)'
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
          inverse: 'var(--text-inverse)'
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)'
        },
        accentSemantic: {
          primary: 'var(--accent-primary)',
          hover: 'var(--accent-hover)'
        }
      },
      spacing: {
        section: 'var(--section-vertical)',
        container: 'var(--container-padding)'
      },
      borderRadius: {
        sm: tokens.radius.sm.value,
        card: 'var(--radius-card)'
      },
      boxShadow: {
        card: tokens.shadow.card.hover.value,
        cardSemantic: 'var(--shadow-card-hover)'
      },

      // Motion tokens from Figma
      transitionDuration: {
        fast: '120ms',
        normal: '200ms',
        slow: '320ms',
      },
      transitionTimingFunction: {
        standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
        emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
