interface PullQuoteProps {
  quote: string;
  attribution?: string;
}

export default function PullQuote({ quote, attribution }: PullQuoteProps) {
  return (
    <blockquote
      style={{
        margin: "48px 0",
        padding: "0 0 0 24px",
        borderLeft: "3px solid var(--a700)",
        maxWidth: "720px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "var(--text-body-lg)",
          lineHeight: "1.65",
          color: "var(--n800)",
          fontStyle: "normal",
        }}
      >
        {quote}
      </p>
      {attribution ? (
        <cite
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-caption)",
            color: "var(--n500)",
            fontStyle: "normal",
            display: "block",
            marginTop: "12px",
          }}
        >
          - {attribution}
        </cite>
      ) : null}
    </blockquote>
  );
}
