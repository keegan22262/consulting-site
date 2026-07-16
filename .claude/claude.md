# CLAUDE.md — Project conventions and constraints

Read this before starting any task. These rules apply to every session unless a specific prompt explicitly overrides one of them.

## Stack

- Next.js (App Router), React, Tailwind CSS v4
- Sanity CMS — schemas in `sanity/schemaTypes/`
- Deployed via Vercel, connected to the `main` branch on GitHub

## Design system — check before implementing any visual change

- `TOKENS.md` — colors, typography, spacing, breakpoints, radii/shadow/motion durations
- `PRIMITIVES.md` — `Container`, `Section`, `SplitLayout`
- `BASE-UI.md` — `Button`, `ArrowLink`, `Eyebrow`, `DiamondMotif`
- `COMPOSITE-PATTERNS.md` — `Card`, `NavyPanel`, `Carousel`
- `CONTENT-ARCHITECTURE.md` — which sections are CMS-driven vs. hardcoded

**Do not invent a new color, spacing value, radius, or component pattern that isn't already defined in these files.** Check for a matching token first. If nothing matches, flag it rather than guessing.

## Efficiency rules — follow on every task

1. **Scope discipline.** Only read and modify the file(s) explicitly named in the current prompt. Do not scan, search, or read other parts of the repository unless the task explicitly requires it (e.g., confirming an existing hook exists before reusing it).
2. **No unsolicited builds or lint runs.** Do not run `npm run build`, `npm run lint`, or the test suite unless explicitly asked. Verify changes by confirming the target file compiles and the dev server hot-reloads without errors — nothing broader.
3. **No unsolicited dependency changes.** Never install, upgrade, or remove a package without being explicitly asked.
4. **No unrelated improvements.** Do not refactor, "clean up," or touch code outside what was explicitly requested, even if you notice something else that looks improvable. Mention it in your summary instead of changing it.
5. **Don't re-read files you just wrote.** If you edited a file earlier in this same session, don't re-fetch or re-view it again unless verifying one specific, genuinely uncertain detail.
6. **Diagnose before re-fixing.** If a previous attempt at the same issue didn't work, investigate why before reapplying a similar change — don't guess repeatedly at the same class of fix.
7. **Reuse existing hooks and components rather than creating new ones** — e.g., `useReducedMotionPreference` already exists in this codebase; use it, don't write a second version.

## Reporting

End every task with a short summary: which file(s) were changed, and explicit confirmation that no other files were touched.