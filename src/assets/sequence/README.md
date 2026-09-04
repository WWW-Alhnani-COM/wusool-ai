# Scroll Sequence Assets — Placeholders

These 8 `frame-0N.svg` files are **temporary placeholders** (abstract
brass/line motif) standing in for the real photographic/illustrated
sequence described in the brief (customer message → understanding →
analysis → action → update → follow-up → result).

## How to replace them with real assets

1. Export your final frames as `.webp` (preferred) or `.jpg`, optimized
   (aim under ~150KB each for mobile).
2. Name them to match the existing ids **exactly**:
   `frame-01.webp`, `frame-02.webp`, ... `frame-08.webp`
   (or keep `.svg` if you're using vector art).
3. Drop them into this folder, replacing the placeholders.
4. Open `src/data/process.ts` and update each `src` path's extension to
   match (e.g. `/src/assets/sequence/frame-01.webp`).

No component code needs to change — `ScrollSequence.tsx` reads the frame
list from `sequenceFrames` in `src/data/process.ts` and has no hardcoded
filenames. You can also add/remove frames there; the component adapts the
scroll-progress mapping automatically to however many frames exist.

## Notes

- Keep all frames the same aspect ratio (the component assumes a shared
  ratio to avoid layout shift while scrolling).
- If you swap to raster images, consider adding 2x resolution for retina
  and let the build pipeline compress them (see the note in
  `vite.config.ts` if you add an image-optimization plugin later).
