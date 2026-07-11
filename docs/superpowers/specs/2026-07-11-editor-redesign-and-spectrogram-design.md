# Editor visual redesign (3-column) — as built

**Date:** 2026-07-11
**Status:** Implemented. The scrolling spectrogram was **deferred** during
implementation (see "Spectrogram — deferred" below); everything else here
reflects what shipped on the `editor-redesign-spectrogram` branch.

> This document was originally an up-front design for a "hero band + full-width
> scrolling spectrogram" (layout B). It was rewritten after the layout was
> iterated live with the author. The git history and
> `docs/superpowers/plans/2026-07-11-editor-redesign-and-spectrogram.md` retain
> the original approach.

## Goal

Give the ZzFX editor a bolder, cohesive dark redesign that uses the full desktop
width and fits on one screen. Stay **library-free** and keep everything in the
single `index.html`. `ZzFX.js`, `ZzFXMicro.js`, and `wav.js` are untouched, and
the generated-code and localStorage/export formats are unchanged, so existing
saved sounds and shared `zzfx(...)` snippets keep working. All pre-existing
features are preserved 1:1.

## Layout (as built)

A header, then three **equal-width columns**, then a footer:

- **Left — Library.** One panel: the sound list (`select_soundList`) on top, then
  below a divider the library/file actions (Favorite, Top, Remove, Save Wav,
  Load Sound, Copy Sound, Import, Export, Clear, Clear All).
- **Middle — Parameters.** The ~20-row parameter grid (`div_settingsTable`).
- **Right.** Generate presets (Random, Mutate, Copy, Pickup, Powerup, Shoot,
  Note, Jump, Blip, Hit, Explosion) on top; then master volume + the waveform;
  then the **ZzFX code box** (style radios + `textarea_code`) at the bottom.

Columns stretch to equal height (`.cols` is a grid with `align-items:stretch`).
The shorter columns fill vertically: the **library list grows** to fill its
column, and the **code box grows** to fill the right column (giving a large
copy/paste area). The waveform is a fixed, modest height.

**Responsive.** Below 900px the three columns collapse to a single vertical
stack; below 480px the parameter grid and logo tighten. The viewport meta is
`width=device-width, initial-scale=1` (zoom allowed).

## Visual system — "Signature Spectrum"

A single `<style>` block driven by CSS variables:

```
--bg:#0b0b11; --surface:#14141d; --surface-2:#0f0f16; --border:#272733;
--text:#eaecf4; --muted:#8890a4;
--accent-cyan:#4df3ff; --accent-violet:#9b6bff; --accent-magenta:#ff6bd0;
--accent-grad: linear-gradient(90deg,#4df3ff,#9b6bff,#ff6bd0);
```

Monospace is kept as the identity (`'Courier New', ui-monospace, monospace`).
Reusable classes: `.panel`, `.label`, `.btn-primary`, `.cols`, `.col`, `.hero`,
`.hero-canvas`, `.lib-panel`, `.lib-actions`, `.param-grid`, `.param-row`,
`.codebar`. Buttons, range sliders, `<select>`, inputs, and the textarea are all
restyled to the palette.

**Logo.** Plain `ZzFX` text (regular monospace — no Unicode glyphs), rendered as
gradient-clipped text. `RandomizeLogo()` re-randomizes the three colors the text
blends between on **every play** (restoring the original play-recolor feel). The
tagline stays muted grey.

## Parameter panel

`BuildSettingsTable()` emits one **shared** CSS grid: `.param-grid` is a single
5-track grid and each `.param-row` is `display:contents`, so every row's five
cells (label, value, lock, mutate, reset) share the same column tracks. This
makes the header's lock-all / mutate-all / reset-all buttons line up exactly
above each parameter row's lock checkbox / mutate dot / reset dot. The
"modified from default" indicator uses the magenta accent.

## Waveform

`DrawSoundWave` uses the palette (faint accent-tinted attack/decay/sustain/
release bands and a cyan trace; the old random-HSL coloring is gone). Before
drawing, `fitCanvas(canvas_soundWave)` sizes the canvas backing store to its
on-screen size, so the waveform renders crisply at any height instead of being
scaled up from a fixed internal buffer. It still renders even at volume 0.

## Behavior fixes

- **Filter mutate.** In ZzFX, `filter` is a cutoff where positive = high-pass and
  negative = low-pass, with magnitude `|filter|`. A tiny negative filter (−1, −2)
  is a low-pass at ~1–2 Hz that silences the sound. `MutateSetting` now detects a
  mutation crossing `filter` from ≥0 into negative and lands it in **−1000…−2000**
  (a musically useful low-pass) instead. Covers the per-parameter mutate and
  mutate-all.

## Preserved 1:1

All generation presets; per-parameter lock / mutate / reset and lock-all /
mutate-all / reset-all; favorites (with confirm-on-remove); the note selector and
frequency↔note syncing; copy & mutate; move-to-top; import / export; drag-and-
drop of exported files; all four code styles (Compact / Full / LittleJS / Lua);
wav download; keyboard shortcuts (space, ins, del, f, c, m); and localStorage
save/load — all unchanged in behavior.

## Spectrogram — deferred

The originally-planned scrolling spectrogram and animated playhead were dropped
from this pass at the author's request: the three-column layout reads better
without a large visualization panel, and the spectrogram was judged non-essential
for now. No spectrogram canvas or draw code ships in `index.html`.

The library-free DSP it would need is already **built and unit-checked** in
`scripts/spectrogram-check.mjs` (dev-only): a radix-2 FFT, Hann window, magma
colormap, dB normalization, and log-frequency mapping, each with assertions
(pure-sine peak bin, colormap endpoints, dB clamping, log-axis endpoints). Wiring
it into a `canvas_spectrogram` is a future task, not a from-scratch effort.

## Out of scope

- Any change to `ZzFX.js`, `ZzFXMicro.js`, `wav.js`, or the synth algorithm.
- New sound parameters, presets, or code-output formats.
- Changes to the saved-data schema / migration (existing saves load as-is).
- Splitting the app into separate JS/CSS files, any build step, or any framework.
