interface HeroImagePlaceholderProps {
  width?: string;
  aspectRatio?: string;
  label?: string;
  marginTop?: string;
}

export default function HeroImagePlaceholder({
  width = "280px",
  aspectRatio = "4 / 3",
  label = "Image Placeholder",
  marginTop = "48px",
}: HeroImagePlaceholderProps) {
  return (
    <div
      style={{
        width,
        flexShrink: 0,
        aspectRatio,
        backgroundColor: "var(--n100)",
        border: "1px solid var(--n200)",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.6875rem",
          fontWeight: 400,
          color: "var(--n400)",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </span>
    </div>
  );
}
