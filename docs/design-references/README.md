# Design reference screenshots

Drop PNG/JPG/WebP screenshots here when you want layouts or visuals matched in code.

## How to add files

1. Save images from the clipboard into this folder (e.g. right‑click → Paste in File Explorer, or Save As from an editor).
2. Use clear names, for example:
   - `about-section-two-column.png`
   - `homepage-hero-reference.png`

## How Claude (terminal) uses them

The terminal session is **text-only**. It does not load image pixels from a path by itself.

**Do this:**

1. Keep the files **in this folder** so paths are stable and the repo stays the single source of truth.
2. In **Cursor chat** (Composer / Agent), **@ mention** the image file or **drag the file into the chat** so the model **sees** the picture.
3. In the same message, say what to build (e.g. “Implement the About block to match `docs/design-references/about-section-two-column.png`”).
4. Terminal-based Claude can then edit files using the **written spec** you give after you’ve shown the image in chat, or you paste a short bullet list of layout/colors copied from what you see.

**Optional:** Add a one-line note in your prompt: `See docs/design-references/<filename> — match layout and spacing.` That keeps everyone aligned on which file is the reference.
