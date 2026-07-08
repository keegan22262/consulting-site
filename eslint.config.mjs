import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "sanity/dist/**",
      "sanity/.sanity/**",
      "public/**",
      "scripts/**",
      "tokens/**",
      "design-tokens/**",
    ],
  },
  ...nextConfig,
  {
    rules: {
      "react-hooks/refs": "off",
    },
  },
];

export default config;
