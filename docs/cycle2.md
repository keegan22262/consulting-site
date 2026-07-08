# Cycle 2 — Homepage Rebuild: Spec + Principles

> Scope: full rebuild of the homepage BODY (hero → CTA) in app/HomepageClient.tsx.
> Deferred to later cycles: header/footer rebuild (SiteHeader.tsx/SiteFooter.tsx),
> data-source consolidation (the triple-duplicated service/industry lists).
> Governing rule: evolution not greenfield — reuse existing data wiring; use only
> Cycle-1 type tokens (no raw font-size/line-height literals); small verifiable
> commits; nothing merges to main without a build pass + visual confirmation.

## Typography decision
- Headings: Source Serif 4 (site-wide, replaces Playfair). Body: DM Sans (unchanged).
- HomepageClient must consume --font-heading / --font-body (not raw font vars).

## Palette (audited + one addition)
- Navy 950 #021024 (hero, CTA band) · Navy 800 #052659 (industries band)
- Blue 500 #5483B3 (links/kickers on light) · Blue 300 #7DA0CA (links/kickers on dark)
- Paper #F7F6F2 (warm off-white, alternating sections) · Footer #010B18
- Body-on-light #37424F / #5B6472 · Body-on-dark #C3D0DF
- One accent, reserved for interactive elements only.

## Grid & rhythm
- 12-col grid, max-width 72rem. 8pt spacing throughout.
- Section padding 6rem desktop / 4rem mobile.
- Background cadence: navy → paper → white → navy800 → white → paper → navy.
- Buttons: 2px radius. Links: arrow →, 2px right-shift on hover, underline on hover only.

## Service clusters (4, from the 10 disciplines in src/sections/services/data.ts)
Read from the new `cluster` field / CLUSTERS const added in Phase 1:
- Strategy & transformation — strategy, digital, people —
  "Direction, operating models, and the digital and human systems that carry them."
- Finance, risk & regulation — finance, tax, legal —
  "Financial clarity and compliance that hold up under scrutiny."
- Sustainability & public impact — esg, public —
  "ESG and public-sector work that moves policy into practice."
- Growth & communications — sme, comms —
  "Positioning and growth systems for enterprises and SMEs."

## Section-by-section (build in place in HomepageClient.tsx)
1. HERO (navy) — kicker "PAN-AFRICAN INSTITUTIONAL ADVISORY"; H1 (display token,
   serif): "Institutional advisory, built for African markets."; lead (max ~48ch):
   "We advise governments, investors, and enterprises across ten disciplines and
   eleven sectors — with the rigor boards expect and the ground truth execution
   demands."; primary CTA "Start a conversation" → /contact; text link "Explore our
   services →" → /services; fine concentric-arc decoration (pure CSS, no image);
   stat strip: 10 disciplines · 11 sectors · Nairobi. Focal point = the H1.
2. DIFFERENTIATORS (paper) — kicker WHY RILL SINGH; H2 "Built to advise. Structured
   to deliver."; 3-up with hairline top rules:
   - Institutional rigor — "Analysis and governance built to withstand board,
     investor, and regulator scrutiny."
   - Ground truth — "Judgment formed inside the markets where you operate — not
     observed from a distance."
   - Execution focus — "Engagements measured by what actually changes — not by the
     weight of the deck."
3. SERVICE CLUSTERS (white) — kicker SERVICES; H2 "Ten disciplines. Four ways in.";
   4 numbered editorial rows (ghost serif numerals), each: cluster name, one-liner,
   discipline links to /services/{slug}. Section link "Explore all ten disciplines
   →" → /services. Data-driven from the cluster field — no hardcoded lists.
4. INDUSTRIES BAND (navy 800) — kicker INDUSTRIES; H2 "Sector depth across the real
   economy."; chips for ALL 11 sectors pulled from INDUSTRIES (src/sections/
   industries/data.ts), link /industries/{id}; final chip "All 11 sectors →".
5. INSIGHTS (white) — kicker INSIGHTS; H2 "Latest thinking."; latest 3, data-driven
   from the existing app/page.tsx Sanity query + fallbacks (featured + supporting);
   each card: 2px navy top rule, date → serif title → one-line dek → "Read →".
   Link "All insights →" → /insights.
6. POINT-OF-VIEW (paper, centered) — NEW section, no current equivalent. Large serif
   statement: "Africa's next decade belongs to institutions that can execute." +
   link "Our point of view, and the work behind it →" → /about.
7. CTA BAND (navy) — H2 "Let's discuss what's next for your institution."; optional
   support line "A first conversation is free of charge — and free of theatre.";
   primary → /contact; secondary "Prefer WhatsApp? Message us directly →" → the
   existing wa.me link.

## Principles enforced every section (Sommerville + graphic design + UI/UX)
- Design for maintainability; reuse data wiring; only Cycle-1 tokens.
- One focal point per section; single accent for interactive only; tight proximity
  of related items; whitespace as structure (8pt); repetition of kicker/card/CTA
  patterns for consistency.
- Progressive disclosure (10 services → 4 clusters; summary before detail); mental
  models (familiar institutional B2B patterns); recognition over recall (clear
  wayfinding); multiple classification (reach content by discipline OR sector OR
  search); Fitts's law (large unmistakable primary CTA, ≥44px tap targets).

## Copy status
All copy above is PROPOSED. Nothing ships to main until the user approves:
client-base phrasing, all 11 sector names (from data), insight deks, CTA support
line, hero H1, and the point-of-view statement.

## Responsive + a11y (Phase 3)
- Hero H1 uses clamp(); test 360/768/1280px; 12-col → single-col cleanly.
- Focus-visible outlines everywhere; body-on-navy contrast ≥ #C3D0DF; #7DA0CA only
  for large/kicker text; respect prefers-reduced-motion; transitions ≤200ms; no
  parallax/carousels. Lighthouse a11y ≥ 95.

## Definition of done
Homepage body matches this spec on the Vercel preview at mobile + desktop; only
Cycle-1 type tokens used (grep-clean); Source Serif reaches the homepage headings;
all links resolve; copy checklist approved; merged to main after visual confirmation.
