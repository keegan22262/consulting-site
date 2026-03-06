"use client";

/**
 * AtmosphericLayer — Subtle institutional depth layer.
 * Renders a faint diagonal gradient + an ultra-blurred geometric texture.
 * All layers use aria-hidden, pointer-events-none, and sit below content.
 */
export default function AtmosphericLayer() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Institutional diagonal gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,28,46,0.05) 0%, rgba(12,28,46,0.02) 40%, rgba(12,28,46,0) 100%)",
          willChange: "transform",
        }}
      />

      {/* Ultra-blurred architectural geometry — CSS-generated */}
      <div
        className="absolute"
        style={{
          top: "-10%",
          right: "-15%",
          width: "70%",
          height: "120%",
          opacity: 0.06,
          filter: "blur(40px)",
          transform: "scale(1.1)",
          willChange: "transform",
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(12,28,46,0.5) 0%, rgba(12,28,46,0.15) 50%, transparent 80%)",
        }}
      />
    </div>
  );
}
