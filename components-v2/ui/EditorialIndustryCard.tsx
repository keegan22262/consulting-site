"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";

interface EditorialIndustryCardProps {
  title: string;
  description: string;
  slug: string;
  image?: string;
  height?: string;
  className?: string;
  routePrefix?: string;
}

const CARD_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const FALLBACK_IMAGE = "/images/industries/sectors/financial-services.jpg";

export default function EditorialIndustryCard({
  title,
  description,
  slug,
  image,
  height,
  className,
  routePrefix = "/industries/",
}: EditorialIndustryCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [lightPos, setLightPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setLightPos({ x, y });
  }, []);

  return (
    <Link
      href={`${routePrefix}${slug}`}
      className={className}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        style={{
          position: "relative",
          height: height ?? "100%",
          borderRadius: "8px",
          overflow: "hidden",
          cursor: "pointer",
          transform: hovered ? "scale(1.015)" : "scale(1)",
          boxShadow: hovered
            ? "0 24px 64px rgba(0,0,0,0.18)"
            : "0 4px 16px rgba(0,0,0,0.08)",
          transition: `transform 300ms ${CARD_EASING}, box-shadow 300ms ${CARD_EASING}`,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${image ?? FALLBACK_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(12,28,46,0.72) 0%, rgba(12,28,46,0.20) 50%, rgba(12,28,46,0.08) 100%)",
            zIndex: 1,
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `radial-gradient(circle at ${lightPos.x}% ${lightPos.y}%, rgba(255,255,255,${hovered ? 0.16 : 0.06}), transparent 40%)`,
            opacity: hovered ? 1 : 0.5,
            transition: "opacity 120ms ease",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
        <div
          aria-hidden={!hovered}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(12,28,46,0.78)",
            opacity: hovered ? 1 : 0,
            transition: `opacity 300ms ${CARD_EASING}`,
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "24px",
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1.25rem",
              fontWeight: 600,
              lineHeight: "1.3",
              color: "#FFFFFF",
              marginBottom: "10px",
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "0.9375rem",
              lineHeight: "1.6",
              fontWeight: 400,
              color: "rgba(255,255,255,0.85)",
              marginBottom: "20px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span
              style={{
                fontFamily: "var(--font-primary)",
                fontSize: "0.8125rem",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: "rgba(255,255,255,0.15)",
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "rgba(255,255,255,0.3)",
                borderRadius: "4px",
                paddingTop: "10px",
                paddingBottom: "10px",
                paddingLeft: "20px",
                paddingRight: "20px",
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateY(0px)" : "translateY(6px)",
                transition: `opacity 300ms ${CARD_EASING}, transform 300ms ${CARD_EASING}`,
              }}
            >
              Explore Industry -&gt;
            </span>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "24px",
            zIndex: 4,
            opacity: hovered ? 0 : 1,
            transition: `opacity 300ms ${CARD_EASING}`,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "1.25rem",
              fontWeight: 600,
              lineHeight: "1.3",
              color: "#FFFFFF",
              textShadow: "0 1px 4px rgba(0,0,0,0.4)",
            }}
          >
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
}
