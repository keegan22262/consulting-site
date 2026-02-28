import React, { useState } from "react";
import Link from "next/link";

const F = "inherit";
const C = { a800: "#333", a700: "#555", a200: "#ccc" };
const M_DUR = "200ms";
const M_CURVE = "ease";

export default function GatewayLink({ label, href }: { label: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: F, fontSize: 'var(--text-body)', fontWeight: 600,
        color: hovered ? C.a800 : C.a700,
        textDecoration: 'underline', textUnderlineOffset: '4px',
        textDecorationThickness: hovered ? '2px' : '1px',
        textDecorationColor: hovered ? C.a200 : C.a700,
        cursor: 'pointer',
        transition: `color ${M_DUR} ${M_CURVE}, text-decoration-thickness ${M_DUR} ${M_CURVE}, text-decoration-color ${M_DUR} ${M_CURVE}`,
        display: 'inline-flex', alignItems: 'center', gap: '8px',
      }}
    >
      {label}
      <span style={{ fontSize: '1em' }}>→</span>
    </Link>
  );
}