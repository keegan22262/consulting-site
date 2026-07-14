interface DiamondMotifProps {
  left: string;
  top: string;
  size: string;
  /** Applies a slow drift animation to the innermost ring (respects reduced motion via the `playing` flag). */
  animate?: boolean;
  playing?: boolean;
}

/**
 * The repeated 45°-rotated concentric-square motif — the African textile-derived
 * structural signature from the Cycle 4 homepage design. Purely decorative.
 */
export default function DiamondMotif({ left, top, size, animate = false, playing = true }: DiamondMotifProps) {
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
      <div aria-hidden="true" style={ring(1, "1px solid rgba(125,160,202,.14)")} />
      <div aria-hidden="true" style={ring(0.75, "1px solid rgba(125,160,202,.18)")} />
      <div aria-hidden="true" style={ring(0.52, "1px solid rgba(125,160,202,.22)")} />
      <div
        aria-hidden="true"
        style={ring(0.33, "1.5px solid rgba(193,122,70,.7)")}
        className={animate ? "animate-diamond-drift" : undefined}
        data-playing={animate ? (playing ? "true" : "false") : undefined}
      />
    </>
  );
}
