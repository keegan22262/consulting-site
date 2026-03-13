import Image from "next/image";

// Image sourced from Figma reference (figma-reference/rslservices.tsx â†’ CreativeDeliverySection).
const DELIVERY_IMAGE = "/images/services/creative-delivery.jpg";

/**
 * ServicesDeliveryBand
 *
 * Full-width cinematic image band with dark gradient overlay and bottom-left text.
 * Positioned between CapabilityFrameworkMap and the CTA block.
 *
 * Layout: Figma reference â€” figma-reference/rslservices.tsx â†’ CreativeDeliverySection
 * Spacing: my-24 (96px) vertical margin; px-6/px-12 container; pb-10/pb-16 text inset
 * Typography: 11px overline, H2 headline (clamp 2â€“3rem), 16â€“18px body
 */
export default function ServicesDeliveryBand() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "clamp(440px, 45vw, 600px)" }}
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

      {/* Text overlay â€” bottom-left */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto max-w-7xl px-6 pb-10 md:px-12 md:pb-14 lg:pb-16">

          {/* Overline */}
          <span className="mb-4 block text-[11px] font-semibold uppercase tracking-widest text-white/60">
            Integrated Delivery
          </span>

          {/* Headline */}
          <h2
            className="font-semibold text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: "1.1",
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
              fontSize: "clamp(1rem, 1.3vw, 1.125rem)",
              maxWidth: "560px",
            }}
          >
            Delivering transformation at scale. Our ten disciplines operate within a shared delivery
            framework â€” ensuring strategic, digital, financial, people, and regulatory workstreams
            are coordinated from diagnostic through institutional handover.
          </p>
        </div>
      </div>
    </section>
  );
}


