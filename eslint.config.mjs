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
      "figma-reference/**",
    ],
  },
  ...nextConfig,
];

export default config;
