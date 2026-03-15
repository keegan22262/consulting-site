interface OutcomeBlockProps {
  index: number;
  metric: string;
  statement: string;
}

export default function OutcomeBlock({ index, metric, statement }: OutcomeBlockProps) {
  return (
    <div
      style={{
        borderLeft: "2px solid var(--a700)",
        paddingLeft: "24px",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--n400)",
          letterSpacing: "0.02em",
          fontVariantNumeric: "tabular-nums",
          display: "block",
          marginBottom: "8px",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-body)",
          fontWeight: 600,
          lineHeight: "var(--line-height-body)",
          color: "var(--n900)",
        }}
      >
        {metric}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          lineHeight: "1.55",
          color: "var(--n600)",
          marginTop: "8px",
          maxWidth: "48ch",
        }}
      >
        {statement}
      </p>
    </div>
  );
}
