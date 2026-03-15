import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import { useHeroEntrance } from "@/components-v2/foundation/useHeroEntrance";
import { useResponsiveValue } from "@/lib/breakpoints";

const HERO_BG =
  "https://images.unsplash.com/photo-1771495604392-2008757fb32a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwc2t5bGluZSUyMGJ1c2luZXNzJTIwZGlzdHJpY3QlMjBkdXNrfGVufDF8fHx8MTc3MzIzMjQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export default function InsightsHeroSection() {
  const entrance = useHeroEntrance();
  const px = useResponsiveValue("32px", "32px", "24px");
  const padTop = useResponsiveValue("160px", "120px", "96px");
  const padBot = useResponsiveValue("120px", "88px", "72px");

  return (
    <section style={{ position: "relative", overflow: "hidden", backgroundColor: "var(--a900)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${HERO_BG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.35,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(12,28,46,0.7) 0%, rgba(27,58,92,0.93) 60%, rgba(12,28,46,1) 100%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          marginLeft: "auto",
          marginRight: "auto",
          paddingTop: padTop,
          paddingBottom: padBot,
          paddingLeft: px,
          paddingRight: px,
        }}
      >
        <div style={{ marginBottom: "32px", ...entrance.overline }}>
          <Breadcrumb
            items={[
              { label: "RSL", href: "/" },
              { label: "Insights" },
            ]}
            light
          />
        </div>

        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "rgba(255,255,255,0.5)",
            display: "block",
            marginBottom: "16px",
            ...entrance.overline,
          }}
        >
          Research & Strategic Analysis
        </span>

        <h1
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue("3.5rem", "2.75rem", "2rem"),
            fontWeight: 600,
            lineHeight: useResponsiveValue("1.08", "1.1", "1.2"),
            letterSpacing: useResponsiveValue("-0.03em", "-0.02em", "-0.01em"),
            color: "#FFFFFF",
            maxWidth: "720px",
            ...entrance.heading,
          }}
        >
          Insights & Perspectives
        </h1>

        <p
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: useResponsiveValue("1.25rem", "1.125rem", "1rem"),
            lineHeight: "1.65",
            color: "rgba(255,255,255,0.72)",
            marginTop: "20px",
            maxWidth: "580px",
            ...entrance.paragraph,
          }}
        >
          Strategic analysis on the forces shaping institutions, markets, and transformation across Africa.
        </p>
      </div>
    </section>
  );
}
