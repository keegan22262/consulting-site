"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ── Canvas Animation ─────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulseTime: number;
  isPulsing: boolean;
}

function createParticles(count: number, w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const r = 1.5 + Math.random();
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.15 + Math.random() * 0.15;
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      radius: r,
      baseRadius: r,
      pulseTime: 0,
      isPulsing: false,
    });
  }
  return particles;
}

function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const animFrameRef = useRef<number>(0);
  const lastPulseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const dpr = window.devicePixelRatio || 1;
    const particleCount = isMobile ? 30 : 70;

    function resize() {
      if (!canvas) return;
      const w = canvas.parentElement!.clientWidth;
      const h = canvas.parentElement!.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Reinit particles if canvas resized significantly
      if (
        particlesRef.current.length === 0 ||
        Math.abs(w - (particlesRef.current[0]?.x ?? 0) * 2) > w
      ) {
        particlesRef.current = createParticles(particleCount, w, h);
      }
    }

    resize();
    if (particlesRef.current.length === 0) {
      const w = canvas.parentElement!.clientWidth;
      const h = canvas.parentElement!.clientHeight;
      particlesRef.current = createParticles(particleCount, w, h);
    }

    // Mouse interaction (desktop only)
    function onMouseMove(e: MouseEvent) {
      if (isMobile) return;
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    }
    function onMouseLeave() {
      mouseRef.current.active = false;
    }

    if (!isMobile) {
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);
    }

    window.addEventListener("resize", resize);

    const CONNECTION_DIST = 180;

    function animate(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.parentElement!.clientWidth;
      const h = canvas.parentElement!.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Pulse logic: trigger a random pulse every 3-4 seconds
      if (time - lastPulseRef.current > 3000 + Math.random() * 1000) {
        const idx = Math.floor(Math.random() * particles.length);
        particles[idx].isPulsing = true;
        particles[idx].pulseTime = time;
        lastPulseRef.current = time;
      }

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Mouse repulsion
        if (mouse.active && !isMobile) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120;
            p.x += (dx / dist) * force * 2;
            p.y += (dy / dist) * force * 2;
          }
        }

        // Pulse animation
        if (p.isPulsing) {
          const elapsed = time - p.pulseTime;
          if (elapsed < 500) {
            const progress = elapsed / 500;
            p.radius = p.baseRadius + (6 - p.baseRadius) * Math.sin(progress * Math.PI);
          } else {
            p.radius = p.baseRadius;
            p.isPulsing = false;
          }
        }
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const opacity = (1 - dist / CONNECTION_DIST) * 0.6;
            const isPulseConnection =
              particles[i].isPulsing || particles[j].isPulsing;
            const lineOpacity = isPulseConnection
              ? Math.min(opacity * 2, 0.8)
              : opacity;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(84, 131, 179, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isPulsing) {
          ctx.fillStyle = "rgba(125, 160, 202, 0.8)";
        } else {
          ctx.fillStyle = "rgba(84, 131, 179, 0.5)";
        }
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      if (!isMobile) {
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="constellation-canvas" />;
}

// ── Hero Component ───────────────────────────────────────────────────────────

export default function ConstellationHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [phase, setPhase] = useState(0);
  // phase 0: initial (nothing visible)
  // phase 1: label fading in (300ms)
  // phase 2: typing headline (1100ms)
  // phase 3: typing complete, cursor blinking
  // phase 4: subtext fading in
  // phase 5: CTA fading in
  // phase 6: scroll indicator fading in
  // phase 7: all done
  const [typingProgress, setTypingProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [showCursor, setShowCursor] = useState(false);
  const skippedRef = useRef(false);
  const phaseRef = useRef(0);

  const headline =
    "Institutional Advisory Built for Growth, Transformation, and Execution.";
  const charCount = headline.length;

  // Skip-to-end on scroll
  const skipToEnd = useCallback(() => {
    if (skippedRef.current) return;
    skippedRef.current = true;
    setTypingProgress(charCount);
    setShowCursor(false);
    setCursorVisible(false);
    setPhase(7);
    phaseRef.current = 7;
    if (sectionRef.current) {
      sectionRef.current.classList.add("hero-loaded");
    }
  }, [charCount]);

  useEffect(() => {
    const onScroll = () => {
      if (phaseRef.current < 7 && window.scrollY > 50) {
        skipToEnd();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [skipToEnd]);

  // Animation timeline
  useEffect(() => {
    if (skippedRef.current) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: label fades in at 300ms
    timers.push(
      setTimeout(() => {
        if (skippedRef.current) return;
        setPhase(1);
        phaseRef.current = 1;
      }, 300)
    );

    // Phase 2: typing starts at 1100ms
    timers.push(
      setTimeout(() => {
        if (skippedRef.current) return;
        setPhase(2);
        phaseRef.current = 2;
        setShowCursor(true);

        // Type characters
        for (let i = 1; i <= charCount; i++) {
          timers.push(
            setTimeout(() => {
              if (skippedRef.current) return;
              setTypingProgress(i);
              if (i === charCount) {
                // Typing complete
                setPhase(3);
                phaseRef.current = 3;

                // Cursor blinks for 1000ms then disappears
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setShowCursor(false);
                  }, 1000)
                );

                // Phase 4: subtext at typing complete + 500ms
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(4);
                    phaseRef.current = 4;
                  }, 500)
                );

                // Phase 5: CTA at subtext + 1100ms (800ms fade + 300ms gap)
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(5);
                    phaseRef.current = 5;
                  }, 1600)
                );

                // Phase 6: scroll indicator at CTA + 1100ms
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(6);
                    phaseRef.current = 6;
                  }, 2500)
                );

                // Phase 7: all done
                timers.push(
                  setTimeout(() => {
                    if (skippedRef.current) return;
                    setPhase(7);
                    phaseRef.current = 7;
                    if (sectionRef.current) {
                      sectionRef.current.classList.add("hero-loaded");
                    }
                  }, 3000)
                );
              }
            }, i * 35)
          );
        }
      }, 1100)
    );

    return () => timers.forEach(clearTimeout);
  }, [charCount]);

  // Cursor blink interval
  useEffect(() => {
    if (!showCursor) return;
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, [showCursor]);

  const done = phase >= 7 || skippedRef.current;

  return (
    <section
      ref={sectionRef}
      className={`constellation-hero${done ? " hero-loaded" : ""}`}
    >
      {/* Canvas background */}
      <div className="constellation-hero__canvas-wrap">
        <ConstellationCanvas />
      </div>

      {/* Gradient overlay */}
      <div className="constellation-hero__gradient" />

      {/* Text content */}
      <div className="constellation-hero__content">
        {/* Label */}
        <p
          className="constellation-hero__label"
          style={{
            opacity: done || phase >= 1 ? 1 : 0,
            transition: done ? "none" : "opacity 800ms ease",
          }}
        >
          PAN-AFRICAN INSTITUTIONAL ADVISORY
        </p>

        {/* Headline with typing effect */}
        <h1 className="constellation-hero__headline">
          <span className="constellation-hero__headline-inner">
            <span>{done ? headline : headline.slice(0, typingProgress)}</span>
            {!done && typingProgress < charCount && (
              <span style={{ color: "transparent" }}>
                {headline.slice(typingProgress)}
              </span>
            )}
          </span>
          {showCursor && (
            <span
              className="constellation-hero__cursor"
              style={{ opacity: cursorVisible ? 1 : 0 }}
            >
              |
            </span>
          )}
        </h1>

        {/* Subtext */}
        <p
          className="constellation-hero__subtext"
          style={{
            opacity: done || phase >= 4 ? 1 : 0,
            transition: done ? "none" : "opacity 800ms ease",
          }}
        >
          We advise growth-stage companies, institutional operators, and
          public-sector leaders navigating structural complexity — delivering
          measurable outcomes with discipline.
        </p>

        {/* CTA */}
        <div
          style={{
            opacity: done || phase >= 5 ? 1 : 0,
            transition: done ? "none" : "opacity 600ms ease",
          }}
        >
          <Link href="/services" className="constellation-hero__cta">
            Explore Our Capabilities
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="constellation-hero__scroll"
        style={{
          opacity: done || phase >= 6 ? 1 : 0,
          transition: done ? "none" : "opacity 400ms ease",
        }}
      >
        <div className="constellation-hero__scroll-line" />
        <span className="constellation-hero__scroll-text">SCROLL</span>
      </div>
    </section>
  );
}
