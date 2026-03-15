"use client";

import Image from "next/image";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const DELIVERY_IMAGE = "/images/services/creative-delivery.jpg";

/**
 * ServicesDeliveryBand
 *
 * Full-width cinematic image band with dark gradient overlay and bottom-left text.
 * Positioned between CapabilityFrameworkMap and the CTA block.
 *
 * Layout: Figma reference - figma-reference/rslservices.tsx -> CreativeDeliverySection
 * Spacing: my-24 (96px) vertical margin; px-6/px-12 container; pb-10/pb-16 text inset
 * Typography: 11px overline, H2 headline (clamp 2-3rem), 16-18px body
 */
export default function ServicesDeliveryBand() {
  const sectionHeight = useResponsiveValue({ desktop: "600px", tablet: "520px", mobile: "440px" });
  const marginY = useResponsiveValue({ desktop: "96px", tablet: "80px", mobile: "64px" });
  const px = useResponsiveValue({ desktop: "48px", tablet: "48px", mobile: "24px" });
  const pb = useResponsiveValue({ desktop: "64px", tablet: "52px", mobile: "40px" });
  const h2Size = useResponsiveValue({ desktop: "3rem", tablet: "2.5rem", mobile: "2rem" });
  const h2LineHeight = useResponsiveValue({ desktop: "1.1", tablet: "1.1", mobile: "1.15" });
  const bodySize = useResponsiveValue({ desktop: "1.125rem", tablet: "1.125rem", mobile: "1rem" });

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: sectionHeight, marginTop: marginY, marginBottom: marginY }}
    >
      {/* Background image */}
      <Image
        src={DELIVERY_IMAGE}
        alt="Executive advisory team collaborating on transformation strategy"
        fill
        className="object-cover object-center"
        style={{ filter: "contrast(1.05)" }}
        sizes="100vw"
      />

      {/* Dark gradient for text readability */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[65%]"
        style={{
          background:
            "linear-gradient(to top, rgba(12,28,46,0.92) 0%, rgba(12,28,46,0.60) 50%, transparent 100%)",
        }}
      />

      {/* Text overlay - bottom-left */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-[1280px]" style={{ paddingLeft: px, paddingRight: px, paddingBottom: pb }}>

          {/* Overline */}
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-widest text-white/60">
            Integrated Delivery
          </span>

          {/* Headline */}
          <h2
            className="font-semibold text-white"
            style={{
              fontSize: h2Size,
              lineHeight: h2LineHeight,
              letterSpacing: "-0.02em",
              maxWidth: "640px",
            }}
          >
            One coordinated team.
          </h2>

          {/* Supporting body */}
          <p
            className="mt-4 leading-[1.6] text-white/85"
            style={{
              fontSize: bodySize,
              maxWidth: "560px",
            }}
          >
            Delivering transformation at scale. Our ten disciplines operate within a shared delivery
            framework — ensuring strategic, digital, financial, people, and regulatory workstreams
            are coordinated from diagnostic through institutional handover.
          </p>
        </div>
      </div>
    </section>
  );
}


