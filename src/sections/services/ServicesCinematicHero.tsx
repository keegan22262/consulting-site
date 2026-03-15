"use client";

import Image from "next/image";
import Breadcrumb from "@/components-v2/ui/Breadcrumb";
import { useResponsiveValue } from "@/components-v2/foundation/useResponsiveValue";

const HERO_IMAGE = "/images/services/hero-services.jpg";

/**
 * ServicesCinematicHero
 *
 * Full-width cinematic image with dark gradient overlay and bottom-left text.
 * Layout: Figma reference - figma-reference/rslservices.tsx -> CinematicHero
 * Spacing: hero padding 128px (space-128) -> responsive fixed heights and container padding
 * Typography: H1 display, body-lg description, caption breadcrumb
 */
export default function ServicesCinematicHero() {
  const heroHeight = useResponsiveValue({ desktop: "520px", tablet: "420px", mobile: "340px" });
  const px = useResponsiveValue({ desktop: "48px", tablet: "32px", mobile: "24px" });
  const pb = useResponsiveValue({ desktop: "56px", tablet: "44px", mobile: "36px" });
  const h1Size = useResponsiveValue({ desktop: "3.5rem", tablet: "2.75rem", mobile: "2rem" });
  const h1LineHeight = useResponsiveValue({ desktop: "1.06", tablet: "1.1", mobile: "1.18" });
  const h1LetterSpacing = useResponsiveValue({ desktop: "-0.03em", tablet: "-0.02em", mobile: "-0.01em" });
  const descSize = useResponsiveValue({ desktop: "1.0625rem", tablet: "1rem", mobile: "0.9375rem" });
  const descMaxW = useResponsiveValue({ desktop: "540px", tablet: "440px", mobile: "100%" });

  return (
    <section
      className="relative w-full overflow-hidden bg-(--a900)"
      style={{ height: heroHeight }}
    >
      {/* Background image */}
      <Image
        src={HERO_IMAGE}
        alt="Global infrastructure and economic activity - institutional services overview"
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

      {/* Text content - bottom-left */}
      <div className="absolute inset-x-0 bottom-0">
        <div
          className="mx-auto w-full max-w-[1280px]"
          style={{ paddingLeft: px, paddingRight: px, paddingBottom: pb }}
        >

          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: "RSL", href: "/" },
                { label: "Services" },
              ]}
              light
            />
          </div>

          {/* H1 */}
          <h1
            className="font-semibold text-white"
            style={{
              fontSize: h1Size,
              lineHeight: h1LineHeight,
              letterSpacing: h1LetterSpacing,
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
                fontSize: descSize,
                maxWidth: descMaxW,
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

