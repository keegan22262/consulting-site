interface IndustryTagProps {
  label: string;
}

export default function IndustryTag({ label }: IndustryTagProps) {
  return (
    <div
      style={{
        padding: "16px 24px",
        border: "1px solid var(--n200)",
        borderRadius: "4px",
        backgroundColor: "#FFFFFF",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-caption)",
          fontWeight: 600,
          color: "var(--n700)",
        }}
      >
        {label}
      </span>
    </div>
  );
}
