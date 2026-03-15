"use client";

import { useState } from "react";
import Link from "next/link";

export interface TOCEntry {
  id: string;
  label: string;
}

interface ArticleSidebarProps {
  toc: TOCEntry[];
  relatedServices: { slug: string; label: string }[];
  relatedIndustries: { id: string; label: string }[];
  shareUrl?: string;
  shareTitle?: string;
  discussionCTA?: { label: string; to: string };
}

export function ArticleSidebar({
  toc,
  relatedServices,
  relatedIndustries,
  shareUrl = "",
  shareTitle = "",
  discussionCTA,
}: ArticleSidebarProps) {
  return (
    <aside
      style={{
        position: "sticky",
        top: "120px",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
      }}
    >
      {toc.length > 0 ? (
        <SidebarSection title="Contents">
          <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {toc.map((item) => (
              <TOCLink key={item.id} entry={item} />
            ))}
          </nav>
        </SidebarSection>
      ) : null}

      <SidebarSection title="Share">
        <div style={{ display: "flex", gap: "12px" }}>
          <ShareButton
            label="LinkedIn"
            icon="in"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
          />
          <ShareButton
            label="X"
            icon="X"
            href={`https://x.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
          />
          <ShareButton
            label="Email"
            icon="M"
            href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareUrl)}`}
          />
        </div>
      </SidebarSection>

      {relatedServices.length > 0 ? (
        <SidebarSection title="Related Services">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {relatedServices.map((svc) => (
              <SidebarLink key={svc.slug} to={`/services/${svc.slug}`} label={svc.label} />
            ))}
          </div>
        </SidebarSection>
      ) : null}

      {relatedIndustries.length > 0 ? (
        <SidebarSection title="Related Industries">
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {relatedIndustries.map((ind) => (
              <SidebarLink key={ind.id} to={`/industries/${ind.id}`} label={ind.label} />
            ))}
          </div>
        </SidebarSection>
      ) : null}

      {discussionCTA ? (
        <SidebarSection title="Discuss">
          <Link
            href={discussionCTA.to}
            style={{
              fontFamily: "var(--font-primary)",
              fontSize: "var(--text-caption)",
              lineHeight: "1.4",
              color: "var(--a700)",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              textDecorationColor: "var(--a200)",
              transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
          >
            {discussionCTA.label}
          </Link>
        </SidebarSection>
      ) : null}
    </aside>
  );
}

export default ArticleSidebar;

export function CollapsibleTOC({ toc }: { toc: TOCEntry[] }) {
  const [open, setOpen] = useState(false);

  if (toc.length === 0) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--n50)",
        borderRadius: "4px",
        border: "1px solid var(--n200)",
        marginBottom: "32px",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 20px",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-primary)",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            color: "var(--a700)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          Contents
        </span>
        <span
          style={{
            fontFamily: "var(--font-primary)",
            fontSize: "var(--text-body)",
            color: "var(--n400)",
            lineHeight: "1",
          }}
        >
          {open ? "-" : "+"}
        </span>
      </button>
      {open ? (
        <nav
          style={{
            padding: "0 20px 16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {toc.map((item) => (
            <TOCLink key={item.id} entry={item} />
          ))}
        </nav>
      ) : null}
    </div>
  );
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <span
        style={{
          fontFamily: "var(--font-primary)",
          fontSize: "0.6875rem",
          fontWeight: 600,
          color: "var(--a700)",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          display: "block",
          marginBottom: "12px",
        }}
      >
        {title}
      </span>
      {children}
    </div>
  );
}

function TOCLink({ entry }: { entry: TOCEntry }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={`#${entry.id}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption)",
        lineHeight: "1.4",
        color: hovered ? "var(--a700)" : "var(--n600)",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: "3px",
        textDecorationThickness: hovered ? "2px" : "1px",
        textDecorationColor: "var(--a200)",
        borderLeft: "2px solid transparent",
        paddingLeft: "8px",
        paddingBottom: "2px",
        transition:
          "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), text-decoration-thickness 120ms cubic-bezier(0.25, 0.1, 0.25, 1), border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        display: "block",
        alignSelf: "flex-start",
      }}
    >
      {entry.label}
    </a>
  );
}

function ShareButton({ label, icon, href }: { label: string; icon: string; href: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={label}
      style={{
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "4px",
        border: `1px solid ${hovered ? "var(--n300)" : "var(--n200)"}`,
        backgroundColor: hovered ? "var(--n50)" : "#FFFFFF",
        color: "var(--n600)",
        textDecoration: "none",
        fontFamily: "var(--font-primary)",
        fontSize: "0.75rem",
        fontWeight: 600,
        transition: "background-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1), border-color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
        cursor: "pointer",
      }}
    >
      {icon}
    </a>
  );
}

function SidebarLink({ to, label }: { to: string; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={to}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-primary)",
        fontSize: "var(--text-caption)",
        lineHeight: "1.4",
        color: hovered ? "var(--a700)" : "var(--n700)",
        textDecoration: hovered ? "underline" : "none",
        textUnderlineOffset: "3px",
        textDecorationColor: "var(--a200)",
        transition: "color 120ms cubic-bezier(0.25, 0.1, 0.25, 1)",
      }}
    >
      {label}
    </Link>
  );
}
