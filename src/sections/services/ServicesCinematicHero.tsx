import Image from "next/image";
import Link from "next/link";

// Hero image sourced from Figma reference (figma-reference/rslservices.tsx).
const HERO_IMAGE = "/images/services/hero-services.jpg";

/**
 * ServicesCinematicHero
 *
 * Full-width cinematic image with dark gradient overlay and bottom-left text.
 * Layout: Figma reference â€” figma-reference/rslservices.tsx â†’ CinematicHero
 * Spacing: hero padding 128px (space-128) â†’ clamp via height; px-8 container
 * Typography: H1 display, body-lg description, caption breadcrumb
 */
export default function ServicesCinematicHero() {
  return (
    <section
      className="relative w-full overflow-hidden bg-(--a900)"
      style={{ height: "clamp(340px, 42vw, 520px)" }}
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Global infrastructure and economic activity â€” institutional services overview"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark gradient for text legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[70%]"
        style={{
          background:
            "linear-gradient(to top, rgba(12,28,46,0.92) 0%, rgba(12,28,46,0.60) 50%, transparent 100%)",
        }}
      />

      {/* Text content â€” bottom-left */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-7xl px-6 pb-10 md:px-8 md:pb-12 lg:pb-14">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2">
            <Link
              href="/"
              className="text-[13px] text-white/60 transition-colors hover:text-white/90"
            >
              RSL
            </Link>
            <span className="text-[13px] text-white/40">/</span>
            <span className="text-[13px] text-white/90 font-medium">Services</span>
          </nav>

          {/* H1 */}
          <h1
            className="font-semibold text-white"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: "1.08",
              letterSpacing: "-0.02em",
            }}
          >
            Services
          </h1>

          {/* Accent bar + description */}
          <div className="mt-5 flex items-start gap-4">
            <div
              aria-hidden="true"
              className="mt-1 w-0.75 shrink-0 rounded-sm bg-(--o500)"
              style={{ minHeight: "48px" }}
            />
            <p
              className="leading-[1.6] text-white/88"
              style={{
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                maxWidth: "540px",
              }}
            >
              Our full spectrum of advisory capabilities across sectors and globally connected teams
              helps transform challenges into opportunities for business, people, and lasting impact.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

