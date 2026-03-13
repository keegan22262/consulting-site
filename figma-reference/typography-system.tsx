// FIGMA MIGRATION REFERENCE
// This file stores the original code exported from Figma
// Used by Copilot as a dictionary during migration
// Do NOT import this file into the Next.js application
// Do NOT modify application logic here

// ─── Font Strategy ───────────────────────────────────────────────────────────
//
// Typeface:  Inter (unified — display + body)
// Weights:   400 (Regular), 600 (SemiBold)
// Usage:     All headings, body text, and UI elements
// Notes:     Highly readable, neutral, professional.
//            Optimised for both display and extended reading at all sizes.
// Variable:  --font-primary (set via next/font/google in app/layout.tsx)

// ─── Type Scale ──────────────────────────────────────────────────────────────
//
// Level          CSS Variable              px / rem    Weight  Line-height   Letter-spacing  Usage
// ──────────────────────────────────────────────────────────────────────────────────────────────────────
// Display XL     --text-display-xl         64px/4rem   600     1.08/108%     -0.015em/-1.5%  Hero statement
// Heading 1      --text-h1                 48px/3rem   600     1.12/112%     -0.005em/-0.5%  Primary section heading
// Heading 2      --text-h2                 32px/2rem   600     1.2/120%       0em/0%         Secondary section heading
// Heading 3      --text-h3                 22px/1.375rem 600   1.25/125%      0em/0%         Subsection heading
// Body Large     --text-body-lg            20px/1.25rem 400    1.55/155%      0em/0%         Lead paragraph, introductions
// Body Standard  --text-body               16px/1rem   400     1.65/165%      0em/0%         Body text, paragraphs
// Caption/Small  --text-caption            13px/0.8125rem 400  1.5/150%       0em/0%         Metadata, labels, footnotes

// ─── CSS Custom Properties (apply in globals.css) ────────────────────────────
//
// /* Display XL */
// --text-display-xl:         4rem;
// --weight-display-xl:       600;
// --line-height-display-xl:  1.08;
// --letter-spacing-display-xl: -0.015em;
//
// /* Heading 1 */
// --text-h1:                 3rem;
// --weight-h1:               600;
// --line-height-h1:          1.12;
// --letter-spacing-h1:       -0.005em;
//
// /* Heading 2 */
// --text-h2:                 2rem;
// --weight-h2:               600;
// --line-height-h2:          1.2;
// --letter-spacing-h2:       0em;
//
// /* Heading 3 */
// --text-h3:                 1.375rem;
// --weight-h3:               600;
// --line-height-h3:          1.25;
// --letter-spacing-h3:       0em;
//
// /* Body Large */
// --text-body-lg:            1.25rem;
// --weight-body-lg:          400;
// --line-height-body-lg:     1.55;
// --letter-spacing-body-lg:  0em;
//
// /* Body Standard */
// --text-body:               1rem;
// --weight-body:             400;
// --line-height-body:        1.65;
// --letter-spacing-body:     0em;
//
// /* Caption / Small */
// --text-caption:            0.8125rem;
// --weight-caption:          400;
// --line-height-caption:     1.5;
// --letter-spacing-caption:  0em;

// ─── Colour Roles ────────────────────────────────────────────────────────────
//
// Heading text:   #0A0A0A  (near-black)
// Body text:      #404040  (dark grey)
// Meta / caption: #6B6B6B  (mid grey)
// On-dark text:   #FFFFFF

// ─── Tailwind Equivalents ────────────────────────────────────────────────────
//
// Display XL  → text-[4rem] leading-[1.08] tracking-[-0.015em] font-semibold
// H1          → text-[3rem] leading-[1.12] tracking-[-0.005em] font-semibold
// H2          → text-[2rem] leading-[1.2]  tracking-normal     font-semibold
// H3          → text-[1.375rem] leading-[1.25] tracking-normal font-semibold
// Body Large  → text-[1.25rem] leading-[1.55] tracking-normal  font-normal
// Body        → text-base leading-[1.65] tracking-normal        font-normal
// Caption     → text-[0.8125rem] leading-[1.5] tracking-normal  font-normal
//
// Heading colour:  text-[#0A0A0A]
// Body colour:     text-[#404040]
// Meta colour:     text-[#6B6B6B]

// ─── Shared Style Objects (reference only — mirrors spacingsystem.tsx) ────────
//
// All components should use the CSS variables above, not hard-coded values.
// For inline styles where Tailwind is insufficient:
//
// pageTitle:   { fontSize: 'var(--text-h2)', fontWeight: 600, lineHeight: 'var(--line-height-h2)', letterSpacing: 'var(--letter-spacing-h2)', color: '#0A0A0A' }
// sectionTitle:{ fontSize: 'var(--text-h3)', fontWeight: 600, lineHeight: 'var(--line-height-h3)', letterSpacing: 'var(--letter-spacing-h3)', color: '#0A0A0A' }
// label:       { fontSize: 'var(--text-body)', fontWeight: 600, color: '#0A0A0A' }
// meta:        { fontSize: '0.75rem', fontWeight: 600, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.05em' }
// caption:     { fontSize: 'var(--text-caption)', color: '#6B6B6B' }
// body:        { fontSize: 'var(--text-body)', lineHeight: 'var(--line-height-body)', color: '#404040' }
// bodyLg:      { fontSize: 'var(--text-body-lg)', lineHeight: 'var(--line-height-body-lg)', color: '#404040' }

// ─── Violation Checklist ─────────────────────────────────────────────────────
//
// When auditing components, flag any of these as violations:
//
// ✗  Hard-coded font sizes (e.g. text-2xl, text-lg) that don't map to the scale
// ✗  Font weights other than 400 or 600
// ✗  Line-heights not matching the scale values above
// ✗  Letter-spacing on body/caption text (only Display XL and H1 have tracking)
// ✗  Fonts other than Inter (--font-primary)
// ✗  Text colours outside { #0A0A0A, #404040, #6B6B6B, #FFFFFF }

export default function FigmaReferencePlaceholder() {
  return null
}
