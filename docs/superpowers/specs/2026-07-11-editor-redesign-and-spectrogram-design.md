# Editor visual redesign + scrolling spectrogram

**Date:** 2026-07-11
**Status:** Approved

## Goal

Give the ZzFX editor a bolder, cohesive visual redesign and add an **active
scrolling spectrogram** to the visualization. Everything stays **library-free**
and lives in the single `index.html`. The synth (`ZzFX.js`, `ZzFXMicro.js`) and
`wav.js` are not touched, and the generated-code and saved-data formats are
unchanged so existing shared `zzfx(...)` snippets and users' saved sounds keep
working.

This is polish + one new feature, not a rethink of functionality. **Every
existing feature is preserved 1:1** (see "Preserved behavior" below).

## Locked-in decisions

- **Layout B — hero band on top.** A full-width hero visualization band across
  the top; below it a two-column split (library/presets/actions on the left,
  parameter panel on the right); a full-width code-output bar at the bottom.
- **Hero = stacked.** Waveform above, scrolling spectrogram below, both
  full-width and sharing one aligned left→right time axis. Master volume + a
  play affordance live in the hero.
- **Palette A — "Signature Spectrum".** Near-black surfaces with one fixed
  cyan→violet→magenta accent used consistently (logo, active states, playhead),
  and a **magma** colormap for the spectrogram.
- **Spectrogram engine = full image + playhead**, precomputed from the sample
  buffer via a hand-written FFT (chosen over a live AnalyserNode), so it renders
  even at volume 0 — consistent with today's waveform.

---

## 1. Visual design system

Replace the current inline-styles-everywhere approach with a single organized
`<style>` block driven by CSS custom properties.

**Palette (CSS variables):**

```
--bg:            #0b0b11   /* page background          */
--surface:       #14141d   /* panels                   */
--surface-2:     #0f0f16   /* recessed / code bar      */
--border:        #272733
--text:          #eaecf4
--muted:         #8890a4
--accent-cyan:   #4df3ff
--accent-violet: #9b6bff
--accent-magenta:#ff6bd0
--accent-grad:   linear-gradient(90deg, #4df3ff, #9b6bff, #ff6bd0)
```

**Typography.** Keep monospace as the identity (`'Courier New', ui-monospace,
monospace`) but with consistent sizing and spacing. Section headers use a small,
uppercase, letter-spaced label style (`.label`). The `ℤ𝕫𝔽𝕏` logo uses the fixed
`--accent-grad` (background-clip text) instead of today's per-play random hue.

**Components (reusable classes):**

- `.panel` — bordered rounded surface used for the hero, library, params, code.
- Buttons — base = `--surface` + `--border`; primary actions (Random / Mutate /
  Copy) get an accent-tinted fill; hover raises an accent border + subtle glow.
  Preset buttons share the base style; favorite/remove keep their meaning.
- Range sliders — restyle track + thumb (`-webkit-`/`-moz-`) with the accent.
- `<select>` sound list and inputs — dark fields with accent focus ring; the
  selected list row uses an accent highlight (replacing today's raw `#444`).

**Logo behavior.** `RandomizeLogo()` no longer randomizes hue every play; the
logo is a static gradient. The function is either removed or repurposed to a
subtle idle shimmer — it must not fight the fixed palette. All current callers
stay valid (a no-op is acceptable).

## 2. Layout structure

Rebuild the `<body>` markup from the current `<table>` into semantic `<div>`s
using CSS grid/flex. Structure top-to-bottom:

1. **Header** — logo + "Zuper Zmall Zound Zynth" subtitle. The GitHub corner SVG
   stays (recolored to the palette).
2. **Hero band** (`.panel`, full width) — master-volume label + slider; the
   waveform `<canvas>` (`canvas_soundWave`); the new spectrogram `<canvas>`
   (`canvas_spectrogram`) directly beneath it, same width. **Play:** clicking
   *either* canvas plays the selected sound (extend the existing
   `canvas_soundWave.onmousedown` handler to `canvas_spectrogram`), and the
   space shortcut still plays. A small ▶ hint/button in the hero is optional
   polish, not required.
3. **Main split** (CSS grid, 2 columns on wide screens):
   - **Left — Library** — the sound list (`select_soundList`), the generation
     presets (Random / Mutate / Copy / Pickup / Powerup / Shoot / Note / Jump /
     Blip / Hit / Explosion), list actions (Favorite / Top / Remove), and file
     actions (Save Wav / Load Sound / Copy Sound / Import / Export / Clear /
     Clear All).
   - **Right — Parameters** — `div_settingsTable` (regenerated markup, section 4).
4. **Code bar** (`.panel`, full width) — code-style radios (Compact / Full /
   LittleJS / Lua) + the read-only `textarea_code`.
5. **Footer** — existing copyright line.

**Responsive.** The main split is a grid that collapses from two columns to one
below ~800px; hero canvases are `width:100%` and scale down. Replace the current
`user-scalable=no` viewport with `width=device-width, initial-scale=1` (allow
zoom for accessibility).

## 3. Waveform restyle

Keep `DrawSoundWave(b, volume, sound)` and its ADSR-region logic, but recolor to
the palette: background `--surface-2`, ADSR regions as low-alpha accent-tinted
bands (instead of random HSL), and the wave trace in the accent (cyan, or an
accent gradient stroke). Drop the seeded-random hue machinery used only for
coloring. The canvas still renders on every play, including at volume 0.

## 4. Parameter panel — `BuildSettingsTable` changes

`BuildSettingsTable()` currently emits an HTML `<table>`. Regenerate it as a
container of parameter rows (grid/flex) with the new classes, **preserving every
element id and handler** so the rest of the JS is untouched:

- Per-parameter row keeps: label, value input (`input_${name}`), lock checkbox
  (`input_lock_${name}`), mutate button (`input_mutate_${name}`), reset button
  (`input_reset_${name}`).
- Special controls preserved: the shape `<select>` (`input_shape`), the note
  `<select>` (`input_note`), the Name field (`input_name`), and the header row's
  lock-all / mutate-all / reset-all buttons.
- The "modified from default" indicator (today `elementReset.style.background =
  '#f3f'`) switches to an accent color.

## 5. Spectrogram engine (the "active spectrograph")

A new, self-contained visualization unit. Keep it in `index.html` but grouped as
a clearly-bounded set of functions (conceptually a "Spectrogram" module) with a
small, obvious interface.

**Input.** The same `samples` array `PlaySelected()` already builds via
`ZZFX.buildSamples(...)`. No AnalyserNode; deterministic; works at volume 0.

**FFT.** A compact iterative radix-2 Cooley–Tukey (~30 lines) over real input
(imaginary = 0), operating on power-of-two frames. No dependencies.

**STFT.**
- `FFT_SIZE = 1024`, `HOP = 256` (75% overlap), **Hann** window — all named
  constants so they're tunable.
- Frames = `floor((N - FFT_SIZE)/HOP) + 1`; zero-pad short sounds so at least a
  few columns render.
- Per frame, compute the magnitude spectrum for the first `FFT_SIZE/2` bins
  (0 … `sampleRate/2` = 22050 Hz).

**Mapping to pixels.**
- **Frequency axis: log-scaled** (constants `F_MIN ≈ 30 Hz`, `F_MAX ≈ 18 kHz`),
  so low frequencies — where most game SFX energy sits — get more vertical room.
  Top of canvas = high freq. Interpolate between bins.
- **Magnitude → color:** convert to dB, normalize against the frame/global max
  over a fixed dynamic range (constant `DB_FLOOR ≈ -60 dB` … 0), clamp to
  `[0,1]`, map through a compact `magma(t)` function (a small array of RGB stops
  interpolated).

**Render pipeline.**
- Compute the spectrogram whenever the sample buffer is (re)built — i.e. in the
  same place `DrawSoundWave` is called from `PlaySelected()` — and cache the
  result as an offscreen canvas / `ImageData` at the display resolution.
- Draw by blitting the cached image; the animation loop reuses the cache so it
  never recomputes the FFT per frame.

**Active playhead.**
- `duration = samples.length / ZZFX.sampleRate`.
- On play, record `startTime = ZZFX.audioContext.currentTime` and run a
  `requestAnimationFrame` loop: `t = audioContext.currentTime - startTime`;
  `x = (t/duration) * width`; each frame re-blit the cached spectrogram + redraw
  a glowing accent playhead. Draw the same playhead x on the waveform too (shared
  time axis). When `t ≥ duration`, stop the loop and leave the finished image.
- The sweep runs on every play **regardless of volume** (driven by
  `audioContext.currentTime`), so muted sounds still show it.
- Rapid replays (e.g. dragging a slider fires `PlaySelected` repeatedly) must
  cancel the prior loop: keep one animation handle and `cancelAnimationFrame`
  before starting a new sweep. Recompute the cached spectrogram only when the
  samples actually change.

**Correctness check.** A pure sine (e.g. shape 0 at 440 Hz, no effects) must show
a single horizontal band at ~440 Hz; a rising slide must show an upward-sloping
band.

## 6. Element ids preserved (JS wiring contract)

The restructure must keep these ids/handlers so existing logic is unchanged:
`UI`, `div_logo`, `div_logo2`, `div_masterVolume`, `slider_masterVolume`,
`canvas_soundWave`, `select_soundList`, `div_settingsTable`, `textarea_code`,
`input_codeStyleCompact` / `Full` / `LittleJS` / `Lua`, `a_downloadLink`,
`input_importFile`, and every generated `input_${name}`, `input_lock_${name}`,
`input_mutate_${name}`, `input_reset_${name}`, plus `input_note`. New id added:
`canvas_spectrogram`.

## Preserved behavior (nothing removed)

All generation presets; per-parameter lock / mutate / reset and lock-all /
mutate-all / reset-all; favorites (with confirm-on-remove); the note selector;
frequency↔note syncing; copy & mutate; move-to-top; import / export; drag-and-
drop of exported files; all four code styles (Compact / Full / LittleJS / Lua);
wav download; keyboard shortcuts (space, ins, del, f, c, m); and localStorage
save/load — all unchanged in behavior.

## Implementation approach & risks

- **Single biggest risk:** the markup rewrite breaking JS wiring. **Mitigation:**
  preserve all ids (section 6); after the rewrite, manually exercise every
  interaction — play, each preset, lock/mutate/reset (single + all), favorite,
  list select, note select, import/export, drag-drop, all code styles, keyboard
  shortcuts, save/reload.
- **Spectrogram cost on rapid plays:** sounds are short, but slider-drag fires
  `PlaySelected` repeatedly. Cache the image and recompute the FFT only when the
  sample buffer changes; the playhead loop never recomputes.
- **Spectrogram correctness:** validate with the pure-sine / slide checks above.

## Out of scope

- Any change to `ZzFX.js`, `ZzFXMicro.js`, `wav.js`, or the synth algorithm.
- New sound parameters, presets, or code-output formats.
- Changes to the saved-data schema / migration (existing saves must load as-is).
- A live-audio AnalyserNode spectrogram (precomputed path chosen instead).
- Splitting into separate JS/CSS files, any build step, or any framework.
- New export formats or audio recording.
