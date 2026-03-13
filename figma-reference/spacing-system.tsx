// FIGMA MIGRATION REFERENCE
// This file stores the original code exported from Figma
// Used by Copilot as a dictionary during migration
// Do NOT import this file into the Next.js application
// Do NOT modify application logic here

// ─── Spacing Token Scale (8px grid) ─────────────────────────────────────────
//
// Base unit: 8px
// Scale: 9 tokens — 4px through 128px
// Max content width: 1280px
// Principle: Every spatial decision resolves to a multiple of 8px.
//            The 4px half-step exists only for optical micro-adjustments.
//
// Token        px     rem    grid
// ─────────────────────────────────
// space-4       4    0.25    0.5x
// space-8       8    0.5     1x
// space-16     16    1       2x
// space-24     24    1.5     3x
// space-32     32    2       4x
// space-48     48    3       6x
// space-64     64    4       8x
// space-96     96    6       12x
// space-128   128    8       16x

// ─── CSS Custom Properties (apply in globals.css) ───────────────────────────
//
// --space-4:   0.25rem;
// --space-8:   0.5rem;
// --space-16:  1rem;
// --space-24:  1.5rem;
// --space-32:  2rem;
// --space-48:  3rem;
// --space-64:  4rem;
// --space-96:  6rem;
// --space-128: 8rem;
// --content-max-width: 80rem;          /* 1280px */
// --container-padding-x: 2rem;         /* 32px  */

// ─── Usage Rules ─────────────────────────────────────────────────────────────
//
// Context                    Token               Value       Notes
// ──────────────────────────────────────────────────────────────────────────────
// Hero Section Padding       space-128           128px       py on hero wrapper
// Standard Section Padding   space-96            96px        py on section wrapper
// Compact Section Padding    space-64            64px        py on condensed sections
// Block Spacing              space-48            48px        gap between content blocks within a section
// Card Internal Padding      space-32            32px        p on card; space-24 in mobile/compact
// Grid Gutter                space-32            32px        gap on multi-column grid layouts
// Container Horizontal Pad   space-32            32px        px on max-width container
// Paragraph Spacing          space-24            24px        mb between consecutive body paragraphs
// Heading-to-Body Spacing    space-16            16px        gap between a heading and its paragraph
// Button Padding             space-16 / space-24 16px v / 24px h  py / px on button elements
// Micro-adjustment           space-4             4px         icon-to-text, badge insets, optical fixes

// ─── Tailwind Equivalents ────────────────────────────────────────────────────
//
// space-4   → p-1   / gap-1   / m-1
// space-8   → p-2   / gap-2   / m-2
// space-16  → p-4   / gap-4   / m-4
// space-24  → p-6   / gap-6   / m-6
// space-32  → p-8   / gap-8   / m-8
// space-48  → p-12  / gap-12  / m-12
// space-64  → p-16  / gap-16  / m-16
// space-96  → p-24  / gap-24  / m-24
// space-128 → p-32  / gap-32  / m-32
//
// Max content width → max-w-[1280px] or max-w-7xl (1280px)
// Container padding → px-8 (32px)

// ─── Section Wrapper Pattern ─────────────────────────────────────────────────
//
// Standard section:  <section className="py-24 px-8">          (96px vertical)
// Hero section:      <section className="py-32 px-8">          (128px vertical)
// Compact section:   <section className="py-16 px-8">          (64px vertical)
// Inner container:   <div className="max-w-[1280px] mx-auto">

// ─── Spatial Philosophy ──────────────────────────────────────────────────────
//
// Space is not the absence of content. It is a structural element that
// communicates hierarchy, separates concerns, and governs the pace at which
// information is consumed.
//
// Three density zones:
//   Macro  — hero/section padding (128px, 96px, 64px)
//            Architecture of the page; where one idea ends and another begins.
//   Meso   — block spacing / card padding (48px, 32px, 24px)
//            Organises content into digestible groups.
//   Micro  — heading-to-body, paragraph, button padding (16px, 8px, 4px)
//            Fine-grain relationships within those groups.

export default function FigmaReferencePlaceholder() {
  return null
}
