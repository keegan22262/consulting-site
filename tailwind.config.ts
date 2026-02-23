

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
        neutral: extract(tokens.color.neutral),
        accent: extract(tokens.color.accent),
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
      fontSize: extract(tokens.font.size),
      lineHeight: extract(tokens.font.line),
      letterSpacing: extract(tokens.font.tracking),

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
