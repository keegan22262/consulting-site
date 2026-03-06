/**
 * SectionDivider — Subtle gradient divider between major homepage sections.
 * Renders a 1px line with a centered fade-glow effect.
 */
export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none"
      style={{
        margin: "64px auto",
        maxWidth: "100%",
        height: "1px",
        background:
          "linear-gradient(90deg, transparent, rgba(12,28,46,0.12), transparent)",
      }}
    />
  );
}
