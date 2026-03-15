"use client";

import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

interface MidPageImageBandProps {
  aspectRatio?: string;
  label?: string;
}

export default function MidPageImageBand({
  aspectRatio = "3 / 1",
  label = "Image Zone - Reserved",
}: MidPageImageBandProps) {
  const px = useResponsiveValue({ desktop: "32px", tablet: "32px", mobile: "24px" });

  return (
    <section>
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: `0 ${px}`,
        }}
      >
        <div
          style={{
            width: "100%",
            aspectRatio,
            backgroundColor: "var(--n100)",
            border: "1px solid var(--n200)",
            borderRadius: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
      </div>
    </section>
  );
}
