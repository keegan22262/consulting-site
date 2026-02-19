import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: colors.white,
          muted: colors.slate[50],
        },
        text: {
          DEFAULT: colors.slate[900],
          muted: colors.slate[600],
        },
        border: {
          DEFAULT: colors.slate[200],
          strong: colors.slate[300],
        },
        brand: {
          DEFAULT: colors.blue[700],
          hover: colors.blue[800],
          subtle: colors.blue[50],
        },
      },
      fontSize: {
        display: ["2.75rem", { lineHeight: "1.1" }],
        h1: ["2.25rem", { lineHeight: "1.2" }],
        h2: ["1.875rem", { lineHeight: "1.3" }],
        h3: ["1.5rem", { lineHeight: "1.35" }],
        body: ["1rem", { lineHeight: "1.6" }],
        meta: ["0.875rem", { lineHeight: "1.25rem" }],
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.6" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.9" }],
        "2xl": ["1.5rem", { lineHeight: "2.1" }],
        "3xl": ["1.875rem", { lineHeight: "2.35" }],
        "4xl": ["2.25rem", { lineHeight: "2.6" }],
      },
      spacing: {
        gutter: "1.5rem",
        "gutter-lg": "2rem",
        "section-sm": "3rem",
        section: "4rem",
        "section-lg": "6rem",
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      transitionDuration: {
        fast: "120ms",
        base: "200ms",
        slow: "320ms",
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
