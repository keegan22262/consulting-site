// FIGMA REFERENCE FILE
// Do not import from this file.
// This file is used only as a migration reference.
// =============================================================================
// RSL Homepage - Hero Section
// Cinematic 4-image crossfade sequence with dark institutional overlay.
// =============================================================================

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { C, F, M_CURVE, M_DUR, MAX_WIDTH, BORDER_RADIUS } from '../../lib/tokens';
import { r } from '../../lib/breakpoints';
import { useHeroEntrance, useButtonHover, usePrefersReducedMotion, MOTION_EASE } from '../../lib/motion';
import { analytics } from '../../lib/analytics';

// --- Cinematic Hero Sequence - 4 thematic images, crossfade loop ---
const HERO_SEQUENCE = [
  'https://images.unsplash.com/photo-1717256770124-e053bebb13b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjaXR5JTIwc2t5bGluZSUyMG5pZ2h0JTIwZmluYW5jaWFsJTIwdG93ZXJzJTIwZHVza3xlbnwxfHx8fDE3NzI1NzY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1709803857154-d20ee16ff763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGVjdXRpdmUlMjBib2FyZHJvb20lMjBBZnJpY2FuJTIwbGVhZGVyc2hpcCUyMHNlcmlvdXMlMjBtZWV0aW5nfGVufDF8fHx8MTc3MjU3NjU2OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1599923142561-ee85cfb5550d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwZ2l0YWwlMjMinZnJhc3RydWN0dXJlJTIwbmV0d29yayUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzcyNTc2NTY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'https://images.unsplash.com/photo-1761926002909-781a45b71030?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBzaGlwcGluZyUyMHBvcnQlMjBpbmR1c3RyaWFsJTIwaW5mcmFzdHJ1Y3R1cmUlMjBjb3JyaWRvcnxlbnwxfHx8fDE3NzI1NzY1NzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
];

const HERO_SLIDE_DURATION = 10000;
const HERO_CROSSFADE_MS = 1400;

const HERO_OVERLAY_TUNING: Record<number, string> = {
  0: 'linear-gradient(to bottom, rgba(12,28,46,0.72) 0%, rgba(12,28,46,0.82) 50%, rgba(12,28,46,0.92) 100%)',
  1: 'linear-gradient(to bottom, rgba(12,28,46,0.72) 0%, rgba(12,28,46,0.88) 50%, rgba(12,28,46,0.92) 100%)',
  2: 'linear-gradient(to bottom, rgba(12,28,46,0.72) 0%, rgba(12,28,46,0.82) 50%, rgba(12,28,46,0.92) 100%)',
  3: 'linear-gradient(to bottom, rgba(12,28,46,0.72) 0%, rgba(12,28,46,0.82) 50%, rgba(12,28,46,0.92) 100%)',
};

const HERO_OVERLAY_MOBILE = 'linear-gradient(to bottom, rgba(12,28,46,0.88) 0%, rgba(12,28,46,0.91) 50%, rgba(12,28,46,0.94) 100%)';

function useHeroSequence(disabled: boolean) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (disabled) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SEQUENCE.length);
    }, HERO_SLIDE_DURATION);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [disabled]);

  return activeIndex;
}

export function HeroSection() {
  const [secondaryHover, setSecondaryHover] = useState(false);
  const heroEntrance = useHeroEntrance();
  const primaryBtn = useButtonHover();
  const prefersReducedMotion = usePrefersReducedMotion();

  const isMobile = r(false, false, true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = HERO_SEQUENCE[0];
    (link as any).fetchPriority = 'high';
    document.head.appendChild(link);

    const timer = setTimeout(() => {
      HERO_SEQUENCE.slice(1).forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }, 2000);

    return () => {
      clearTimeout(timer);
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  const px = r('32px', '32px', '24px');
  const padTop = r('144px', '112px', '80px');
  const padBot = r('96px', '64px', '48px');

  const sequenceDisabled = isMobile || prefersReducedMotion;
  const activeSlide = useHeroSequence(sequenceDisabled);

  const overlayGradient = isMobile
    ? HERO_OVERLAY_MOBILE
    : HERO_OVERLAY_TUNING[activeSlide] ?? HERO_OVERLAY_TUNING[0];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: r('85vh', '75vh', '70vh') as string }}>
      {prefersReducedMotion ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `url(${HERO_SEQUENCE[0]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
      ) : isMobile ? (
        HERO_SEQUENCE.map((src, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: i === activeSlide ? 1 : 0,
              transform: 'none',
              transition: `opacity 6000ms ease-in-out`,
              zIndex: 0,
            }}
          />
        ))
      ) : (
        HERO_SEQUENCE.map((src, i) => {
          const isActive = i === activeSlide;
          return (
            <div
              key={i}
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: 0, left: 0, right: 0, bottom: 0,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'scale(1.12)' : 'scale(1)',
                transition: `opacity ${HERO_CROSSFADE_MS}ms ease-in-out, transform ${HERO_SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                willChange: 'opacity, transform',
                zIndex: 0,
              }}
            />
          );
        })
      )}

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: overlayGradient,
          transition: prefersReducedMotion ? 'none' : `background ${HERO_CROSSFADE_MS}ms ease-in-out`,
          zIndex: 1,
        }}
      />

      <div style={{
        position: 'relative',
        zIndex: 2,
        paddingTop: padTop,
        paddingBottom: padBot,
        paddingLeft: '0',
        paddingRight: '0',
      }}>
        <div style={{ maxWidth: MAX_WIDTH, marginLeft: 'auto', marginRight: 'auto', paddingLeft: px, paddingRight: px }}>
          <div style={{ maxWidth: r('780px', '100%', '100%') as string }}>
            <span style={{
              fontFamily: F,
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'rgba(255, 255, 255, 0.7)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              display: 'block',
              marginBottom: '6px',
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              ...heroEntrance.overline,
            }}>
              Pan-African Institutional Advisory
            </span>

            <h1 style={{
              fontFamily: F,
              fontSize: r('4rem', '3rem', '2.5rem'),
              fontWeight: 600,
              lineHeight: r('1.08', '1.12', '1.15'),
              letterSpacing: r('-0.02em', '-0.015em', '-0.005em'),
              color: '#FFFFFF',
              maxWidth: '780px',
              textShadow: '0 2px 6px rgba(0,0,0,0.25)',
              ...heroEntrance.heading,
            }}>
              Institutional Advisory Built for Growth, Transformation, and Execution.
            </h1>

            <p style={{
              fontFamily: F,
              fontSize: '1.25rem',
              lineHeight: '1.55',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.92)',
              marginTop: '24px',
              maxWidth: '60ch',
              textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              ...heroEntrance.paragraph,
            }}>
              We advise growth-stage companies, institutional operators, and public-sector leaders navigating structural complexity across strategy, technology, finance, and governance - delivering measurable outcomes with discipline.
            </p>

            <div style={{
              marginTop: '48px',
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'stretch' : 'center',
              gap: '24px',
              ...heroEntrance.cta,
            }}>
              <Link
                to="/rsl/services"
                {...primaryBtn.handlers}
                onClick={() => analytics.ctaClick('See How We Deliver', 'homepage-hero')}
                style={{
                  display: 'inline-block',
                  fontFamily: F,
                  fontSize: 'var(--text-body)',
                  fontWeight: 600,
                  lineHeight: '1',
                  color: C.a700,
                  backgroundColor: primaryBtn.hovered ? '#F0F0F0' : '#FFFFFF',
                  borderStyle: 'none',
                  borderRadius: BORDER_RADIUS,
                  paddingTop: '16px',
                  paddingBottom: '16px',
                  paddingLeft: '24px',
                  paddingRight: '24px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: `background-color ${M_DUR} ${M_CURVE}, transform 240ms ${MOTION_EASE}, box-shadow 240ms ${MOTION_EASE}`,
                  textAlign: 'center' as const,
                  width: isMobile ? '100%' : 'auto',
                  transform: primaryBtn.style.transform,
                  boxShadow: primaryBtn.style.boxShadow,
                }}
              >
                See How We Deliver
              </Link>

              <Link
                to="/rsl/services"
                onMouseEnter={() => setSecondaryHover(true)}
                onMouseLeave={() => setSecondaryHover(false)}
                style={{
                  fontFamily: F,
                  fontSize: 'var(--text-body)',
                  fontWeight: 400,
                  lineHeight: '1',
                  color: secondaryHover ? '#FFFFFF' : 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  transition: `color ${M_DUR} ${M_CURVE}, text-decoration-thickness ${M_DUR} ${M_CURVE}, text-decoration-color ${M_DUR} ${M_CURVE}`,
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                  textDecorationColor: secondaryHover ? '#FFFFFF' : 'rgba(255, 255, 255, 0.4)',
                  textDecorationThickness: secondaryHover ? '2px' : '1px',
                  paddingTop: '0',
                  paddingBottom: '0',
                  paddingLeft: '0',
                  paddingRight: '0',
                  textAlign: isMobile ? 'center' as const : undefined,
                }}
              >
                Explore Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}