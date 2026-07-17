interface DiamondMotifProps {
  left: string;
  top: string;
  size: string;
  /** Applies a slow drift animation to the innermost ring (respects reduced motion via the `playing` flag). */
  animate?: boolean;
  playing?: boolean;
  /** Ring border color set — "blue" (default, used on navy/paper backgrounds) or "paper" (cream-tinted, used over the Hero's darkened video panel). */
  tone?: "blue" | "paper" | "photo";
}

const RING_COLORS: Record<"blue" | "paper" | "photo", [string, string, string, string]> = {
  blue: ["rgba(125,160,202,.14)", "rgba(125,160,202,.18)", "rgba(125,160,202,.22)", "rgba(193,122,70,.7)"],
  paper: ["rgba(247,246,242,.14)", "rgba(247,246,242,.18)", "rgba(247,246,242,.22)", "rgba(247,246,242,.7)"],
  photo: ["rgba(193,122,70,.14)", "rgba(193,122,70,.18)", "rgba(193,122,70,.22)", "rgba(193,122,70,.7)"],
};

/**
 * The repeated 45°-rotated concentric-square motif — the African textile-derived
 * structural signature from the Cycle 4 homepage design. Purely decorative.
 */
export default function DiamondMotif({ left, top, size, animate = false, playing = true, tone = "blue" }: DiamondMotifProps) {
  const [c1, c2, c3, c4] = RING_COLORS[tone];
  const ring = (scale: number, border: string) => ({
    position: "absolute" as const,
    left,
    top,
    width: `calc(${size} * ${scale})`,
    aspectRatio: "1",
    transform: "translate(-50%, -50%) rotate(45deg)",
    border,
  });

  return (
    <>
      <div aria-hidden="true" style={ring(1, `1px solid ${c1}`)} />
      <div aria-hidden="true" style={ring(0.75, `1px solid ${c2}`)} />
      <div aria-hidden="true" style={ring(0.52, `1px solid ${c3}`)} />
      <div
        aria-hidden="true"
        style={ring(0.33, `1.5px solid ${c4}`)}
        className={animate ? "animate-diamond-drift" : undefined}
        data-playing={animate ? (playing ? "true" : "false") : undefined}
      />
    </>
  );
}
