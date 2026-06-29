# Lua output format for the ZzFX editor

**Date:** 2026-06-29
**Status:** Approved

## Goal

Add a **Lua** output option to the editor's code-style selector, alongside the
existing JavaScript styles (Compact / Full / LittleJS). It emits a Playdate-style
Lua call so sounds can be pasted directly into a Lua/Playdate ZzFX wrapper.

Scope is intentionally a single Lua format (the recommended "Playdate" form).
A sparse `{[3]=...}` variant was considered and dropped.

## Output format

- A Lua array-like table wrapped in a call: `zzfx({...}) -- name`.
- Trailing parameters equal to their default are trimmed.
- Interior parameters equal to their default become `nil` gaps
  (Compact-style), e.g. `zzfx({1.5,nil,220,nil,nil,.2}) -- Laser`.
- Genuine non-default values are emitted verbatim, including real `0`s — only
  default-equal params become `nil`, never a meaningful value.
- Number formatting is reused from the JS formatter: strip a leading `0`
  (`.06`) and use exponential notation when shorter (`1e3`). Both are valid
  Lua numeric literals.
- The comment delimiter is `--` (Lua), not `//`.
- An empty / all-default sound renders as `zzfx({}) -- name`.

The `nil` gaps round-trip correctly through a Playdate wrapper that iterates a
fixed parameter count, e.g. `for i=1,21 do p = params[i] or default[i] end`.
The wrapper must use a numeric `for` loop — `#`/`ipairs` are unreliable on a
table with interior `nil`s. Canonical parameter count stays at 21.

## Changes (all in `index.html`)

1. **UI** — Add radio `input_codeStyleLua` to the existing `radio_codeStyle`
   group, after `input_codeStyleLittleJS`, labelled `Lua`. It shares the group,
   so picking it deselects the JS styles. Default selection stays Compact.

2. **`GetCode(sound)`** —
   - `const lua = input_codeStyleLua.checked;`
   - Fold `lua` into `shorten` so Lua uses the same trailing-trim + interior-blank
     logic as Compact.
   - In the parameter-join loop, when `lua` and the entry is a blanked gap,
     emit `nil` instead of an empty string. Leave the existing number formatting
     untouched for real values.
   - Return `zzfx({${code}}) -- ${name}` in Lua mode (`zzfx({})` when empty).

3. **Persistence** — `BuildSaveData` writes `codeStyle:'lua'` when the Lua radio
   is checked; `LoadSaveData` restores `input_codeStyleLua.checked` for that
   value. No migration needed for existing saved data.

## Out of scope

- Sparse `{[index]=value}` Lua output.
- A language dropdown / multi-language UI restructure.
- Changes to the ZzFX library itself or any wrapper code.
