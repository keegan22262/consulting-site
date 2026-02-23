

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
      },
      borderRadius: {
        sm: tokens.radius.sm.value,
      },
      boxShadow: {
        card: tokens.shadow.card.hover.value,
      },
      fontSize: extract(tokens.font.size),
      lineHeight: extract(tokens.font.line),
      letterSpacing: extract(tokens.font.tracking),
    },
  },
  plugins: [],
};

export default config;
