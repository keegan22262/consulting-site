import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components-v2/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        overline: ["var(--text-overline)", { lineHeight: "var(--line-height-overline)", letterSpacing: "0.06em", fontWeight: "500" }],
        caption: ["var(--text-caption)", { lineHeight: "var(--line-height-caption)" }],
        body: ["var(--text-body)", { lineHeight: "var(--line-height-body)" }],
        lead: ["var(--text-lead)", { lineHeight: "var(--line-height-lead)" }],
        h3: ["var(--text-h3)", { lineHeight: "var(--line-height-h3)", fontWeight: "600" }],
        h2: ["var(--text-h2)", { lineHeight: "var(--line-height-h2)" }],
        h1: ["var(--text-h1)", { lineHeight: "var(--line-height-h1)", letterSpacing: "-0.02em" }],
        display: ["var(--text-display)", { lineHeight: "var(--line-height-display)", letterSpacing: "-0.02em" }],
      },
      colors: {
        navy: {
          darkest: "#021024",
          dark: "#052659",
        },
        blue: {
          mid: "#5483B3",
          light: "#7DA0CA",
          ice: "#C1E8FF",
        },
        terracotta: {
          DEFAULT: "#C17A46",
          hover: "#CB8752",
        },
        eyebrow: "#3D6690",
        rsl: {
          offwhite: "#F8FBFF",
          textDark: "#1A1A2E",
          textMuted: "#6B7280",
        },
        neutral: {
          50: "var(--n50)",
          100: "var(--n100)",
          200: "var(--n200)",
          300: "var(--n300)",
          400: "var(--n400)",
          500: "var(--n500)",
          600: "var(--n600)",
          700: "var(--n700)",
          800: "var(--n800)",
          900: "var(--n900)",
        },
        semantic: {
          success: "var(--semantic-success)",
          successLight: "var(--semantic-success-light)",
          warning: "var(--semantic-warning)",
          warningLight: "var(--semantic-warning-light)",
          error: "var(--semantic-error)",
          errorLight: "var(--semantic-error-light)",
        },
      },
      maxWidth: {
        content: "1200px",
        prose: "65ch",
      },
      borderRadius: {
        card: "4px",
      },
      transitionDuration: {
        fast: "120ms",
        normal: "200ms",
        slow: "320ms",
      },
    },
  },
  plugins: [],
};

export default config;
