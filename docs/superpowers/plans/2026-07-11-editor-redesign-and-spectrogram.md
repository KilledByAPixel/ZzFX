# Editor Redesign + Scrolling Spectrogram Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the ZzFX editor a bolder, cohesive dark redesign (layout B, stacked hero, "Signature Spectrum" palette) and add a library-free, precomputed scrolling spectrogram with an animated playhead.

**Architecture:** All app UI/logic stays inline in the single `index.html`. The `<head>` gets a CSS-variable design system; the `<body>` is restructured from `<table>` into semantic grid/flex containers **preserving every element id** so existing JS keeps working. A new, self-contained Spectrogram section (hand-written radix-2 FFT → Hann STFT → log-frequency axis → magma colormap → cached `ImageData`) draws into a new `canvas_spectrogram`, with a `requestAnimationFrame` playhead synced to `ZZFX.audioContext.currentTime`. The synth files (`ZzFX.js`, `ZzFXMicro.js`) and `wav.js` are untouched.

**Tech Stack:** Vanilla HTML/CSS/JS (no libraries, no build step). Node's built-in modules only, for two dev-only helper scripts (a static server and a DSP check). Verification via a local browser.

**Spec:** [docs/superpowers/specs/2026-07-11-editor-redesign-and-spectrogram-design.md](../specs/2026-07-11-editor-redesign-and-spectrogram-design.md)

## Global Constraints

- **Library-free.** No runtime dependencies added to the shipped page. (Dev-only helper scripts may use Node built-ins.)
- **Single file for app code.** All editor UI/logic stays in `index.html`. Do **not** split the app into new JS/CSS files, add a build step, or add a framework.
- **Do not modify** `ZzFX.js`, `ZzFXMicro.js`, `ZzFXMicro.min.js`, `wav.js`, or the synth algorithm.
- **Preserve every element id** and inline handler the JS depends on: `UI`, `div_logo`, `div_logo2`, `div_masterVolume`, `slider_masterVolume`, `canvas_soundWave`, `select_soundList`, `div_settingsTable`, `textarea_code`, `input_codeStyleCompact` / `Full` / `LittleJS` / `Lua`, `a_downloadLink`, `input_importFile`, and every generated `input_${name}`, `input_lock_${name}`, `input_mutate_${name}`, `input_reset_${name}`, plus `input_note`. **New id added:** `canvas_spectrogram`.
- **No behavior/format changes.** All existing features preserved 1:1; generated-code formats (Compact/Full/LittleJS/Lua) and the localStorage/export saved-data schema are unchanged (existing saves and shared `zzfx(...)` snippets must still load).
- **Palette (CSS variables), verbatim:**
  `--bg:#0b0b11; --surface:#14141d; --surface-2:#0f0f16; --border:#272733; --text:#eaecf4; --muted:#8890a4; --accent-cyan:#4df3ff; --accent-violet:#9b6bff; --accent-magenta:#ff6bd0;` accent gradient = `linear-gradient(90deg,#4df3ff,#9b6bff,#ff6bd0)`.
- **DSP constants, verbatim:** `FFT_SIZE=1024; HOP=256; F_MIN=30; F_MAX=18000; DB_FLOOR=-60;` frequency axis is **log-scaled**; colormap is **magma**.

---

## File Structure

- **Modify: `index.html`** — the entire app. Touched regions: `<head>` `<style>` (Task 2), `<body>` markup (Task 3), and inline `<script>` functions `BuildSettingsTable` (Task 4), `DrawSoundWave` + `RandomizeLogo` (Task 5), the new Spectrogram section + `PlaySelected` wiring (Tasks 8–9), and the viewport `<meta>` + responsive CSS (Task 10).
- **Create: `scripts/serve.mjs`** — dev-only static file server (Node built-in `http`/`fs`), so `index.html`'s ES-module imports load over `http://`. Not shipped, not imported by the page.
- **Create: `scripts/spectrogram-check.mjs`** — dev-only automated checks for the pure DSP functions (`fft`, `hann`, `magma`, `dbNorm`, `freqForY`/`binForFreq`). **This file is the development oracle for the DSP math:** author + verify each function here first, then paste the verified function verbatim into `index.html`'s Spectrogram section. The two copies are pure and stable; keep them in sync.

> **Verification model.** DSP math → automated Node checks (`scripts/spectrogram-check.mjs`). Visual/DOM/interaction → observe in a browser against an explicit checklist. Both are real, evidence-based checks appropriate to a single-file browser app; do not claim a step passes without running/observing it.

---

## Task 1: Dev static server + baseline smoke

**Files:**
- Create: `scripts/serve.mjs`
- Test: manual browser observation

**Interfaces:**
- Produces: a running static server at `http://localhost:8000/` serving the repo root, used by every later task's browser verification.

- [ ] **Step 1: Create the dev server**

Create `scripts/serve.mjs`:

```js
// Dev-only static file server (Node built-ins only). Not part of the shipped app.
// Usage: node scripts/serve.mjs   ->  http://localhost:8000/
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, normalize, join } from 'node:path';

const ROOT = process.cwd();
const PORT = 8000;
const TYPES = {
  '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.png': 'image/png',
  '.ico': 'image/x-icon', '.wav': 'audio/wav', '.txt': 'text/plain',
};

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(req.url.split('?')[0]);
    if (path === '/') path = '/index.html';
    const file = normalize(join(ROOT, path));
    if (!file.startsWith(ROOT)) { res.writeHead(403).end('forbidden'); return; }
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('not found');
  }
}).listen(PORT, () => console.log(`serving ${ROOT} at http://localhost:${PORT}/`));
```

- [ ] **Step 2: Run the server**

Run: `node scripts/serve.mjs`
Expected: prints `serving <repo> at http://localhost:8000/` and stays running. (Leave it running in a background terminal for all later tasks.)

- [ ] **Step 3: Baseline smoke test in the browser**

Open `http://localhost:8000/` in a browser. Expected: the current (un-redesigned) editor loads with no console errors, the sound list has at least one entry, and clicking the waveform (or pressing space) plays a sound. This confirms module imports work over `http://` before any redesign.

- [ ] **Step 4: Commit**

```bash
git add scripts/serve.mjs
git commit -m "Add dev-only static server for local verification"
```

---

## Task 2: Design-system stylesheet

Replace the `<head>` `<style>` with the palette-variable design system + reusable component classes. **Leave the existing `<body>` table markup unchanged in this task** — only styling changes, so you can confirm the app still works before restructuring.

**Files:**
- Modify: `index.html` (the `<style>` block, currently ~lines 64–82)

**Interfaces:**
- Produces: CSS variables and classes consumed by Tasks 3–5, 8–10: `--bg --surface --surface-2 --border --text --muted --accent-cyan --accent-violet --accent-magenta --accent-grad`; classes `.panel`, `.label`, `.btn`, `.btn-primary`, `.hero`, `.hero-canvas`, `.app`, `.split`, `.col`, `.codebar`, `.param-grid`, `.param-row`, `.param-label`, `.param-cell`, `.lock`, `.rand`, `.reset`, `.soundSelect`, `.logo`.

- [ ] **Step 1: Replace the `<style>` block**

Replace the entire existing `<style>…</style>` in `<head>` with:

```html
<style>
:root{
  --bg:#0b0b11; --surface:#14141d; --surface-2:#0f0f16; --border:#272733;
  --text:#eaecf4; --muted:#8890a4;
  --accent-cyan:#4df3ff; --accent-violet:#9b6bff; --accent-magenta:#ff6bd0;
  --accent-grad:linear-gradient(90deg,var(--accent-cyan),var(--accent-violet),var(--accent-magenta));
}
*{ box-sizing:border-box; font-family:'Courier New',ui-monospace,monospace; }
html,body{ margin:0; }
body{ background:var(--bg); color:var(--text); font-size:16px; user-select:none; }
a{ color:var(--accent-cyan); text-decoration:none; }
a:hover{ text-decoration:underline; }

.app{ max-width:1080px; margin:0 auto; padding:18px 16px 40px; }

/* header */
.header{ display:flex; align-items:baseline; gap:14px; margin-bottom:16px; }
.logo{ font-size:40px; font-weight:bold; letter-spacing:1px;
  background:var(--accent-grad); -webkit-background-clip:text; background-clip:text; color:transparent; }
.tagline{ font-style:italic; font-size:20px; color:var(--muted); }

/* panels + labels */
.panel{ background:var(--surface); border:1px solid var(--border); border-radius:12px; padding:14px; }
.label{ font-size:11px; letter-spacing:1.4px; text-transform:uppercase; color:var(--muted); margin:0 0 8px; }

/* hero */
.hero{ margin-bottom:14px; }
.hero-top{ display:flex; align-items:center; gap:14px; margin-bottom:12px; }
.hero-top .label{ margin:0; white-space:nowrap; }
.hero-canvas{ display:block; width:100%; background:var(--surface-2);
  border:1px solid var(--border); border-radius:8px; cursor:pointer; }
#canvas_soundWave{ margin-bottom:10px; }

/* layout split */
.split{ display:grid; grid-template-columns:minmax(0,360px) minmax(0,1fr); gap:14px; align-items:start; }
.col{ display:flex; flex-direction:column; gap:12px; }

/* buttons */
button{ font:inherit; font-size:15px; color:var(--text); cursor:pointer;
  background:var(--surface); border:1px solid var(--border); border-radius:8px;
  padding:7px 12px; margin:3px; transition:border-color .12s, box-shadow .12s, background .12s; }
button:hover{ border-color:var(--accent-cyan); box-shadow:0 0 0 1px rgba(77,243,255,.25); }
button.large{ padding:8px 12px; }
.btn-primary{ background:linear-gradient(90deg,rgba(77,243,255,.18),rgba(155,107,255,.18));
  border-color:#39506a; color:#eafcff; }
button.rand{ width:16px; height:16px; padding:0; background:var(--accent-cyan); border:none; }
button.reset{ width:16px; height:16px; padding:0; background:#3ad16b; border:none; }

/* inputs + sliders + select */
input,select,textarea{ font:inherit; color:var(--text);
  background:var(--surface-2); border:1px solid var(--border); border-radius:7px; }
input[type=number]{ padding:3px 6px; }
input:focus,select:focus,textarea:focus{ outline:none; border-color:var(--accent-cyan);
  box-shadow:0 0 0 2px rgba(77,243,255,.25); }
textarea{ height:52px; cursor:text; resize:none; padding:8px; width:90%; }
select option:checked{ background:#23283a; }
input.lock{ width:16px; height:16px; accent-color:var(--accent-violet); }

/* range sliders */
input[type=range]{ -webkit-appearance:none; appearance:none; height:8px; border:none;
  border-radius:5px; background:#20202c; cursor:pointer; }
input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; width:16px; height:16px;
  border-radius:50%; background:#eafcff; box-shadow:0 0 6px var(--accent-cyan); }
input[type=range]::-moz-range-thumb{ width:16px; height:16px; border:none; border-radius:50%;
  background:#eafcff; box-shadow:0 0 6px var(--accent-cyan); }

/* sound list */
.soundSelect{ overflow-x:hidden; height:300px; width:100%; }

/* parameter grid */
.param-grid{ display:flex; flex-direction:column; gap:4px; }
.param-row{ display:grid; grid-template-columns:120px 1fr auto auto auto; align-items:center; gap:8px; }
.param-label{ text-align:right; font-size:13px; color:var(--muted); }
.param-cell input.setting,.param-cell select.setting{ width:100%; }
.param-cell{ display:flex; gap:6px; }

/* code bar */
.codebar{ margin-top:14px; text-align:center; }
.codebar .styles{ display:flex; flex-wrap:wrap; gap:10px 16px; justify-content:center;
  align-items:center; margin-bottom:10px; }
.codebar label{ cursor:pointer; }
.footer{ text-align:center; color:var(--muted); margin-top:20px; font-size:13px; }
</style>
```

- [ ] **Step 2: Verify in the browser**

Reload `http://localhost:8000/`. Expected: the page is now dark near-black with the gradient `ℤ𝕫𝔽𝕏` logo, restyled buttons/sliders/inputs, and rounded panels — but the overall arrangement is still the old table. No console errors. Play still works, presets still add sounds. (Some spacing will look rough until Task 3 restructures the markup — that's expected.)

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add Signature Spectrum design-system stylesheet"
```

---

## Task 3: Restructure body into layout B

Rewrite the `<body>` markup from the `<table>` into semantic containers, **keeping every id and inline handler identical**. Add the new `canvas_spectrogram` in the hero, under `canvas_soundWave`.

**Files:**
- Modify: `index.html` (the visible `<center>…</center>` block inside `#UI`, currently ~lines 86–141)

**Interfaces:**
- Consumes: classes from Task 2.
- Produces: DOM element `canvas_spectrogram` (consumed by Tasks 8–9); preserved ids for all existing JS.

- [ ] **Step 1: Replace the inner markup**

Replace the `<center>…</center>` block (the visible UI, ~lines 86–141) with the markup below. **Leave `<div id=UI style=display:none>` open above it, and leave everything below it unchanged** — the three `<script>` tags, the GitHub-corner `<a>`/`<style>`, and the final `</div></body>` that closes `#UI`. (Do not add or remove a `#UI` wrapper here; only the visible content changes.)

```html
<div class=app>

  <div class=header>
    <div class=logo id=div_logo>ℤ𝕫𝔽𝕏</div>
    <div class=tagline id=div_logo2>Zuper Zmall Zound Zynth</div>
  </div>

  <div class="panel hero">
    <div class=hero-top>
      <div class=label id=div_masterVolume>Master Volume</div>
      <input id=slider_masterVolume title='Volume to scale all sounds by in percent' type=range min=0 max=100 value=25 style=flex:1 oninput=UpdateSettings();SaveLocalStorage()>
    </div>
    <canvas title='Waveform — click to play [SPACE]' id=canvas_soundWave class=hero-canvas width=700 height=90></canvas>
    <div class=label>Spectrogram · frequency × time</div>
    <canvas title='Spectrogram — click to play [SPACE]' id=canvas_spectrogram class=hero-canvas width=700 height=170></canvas>
  </div>

  <div class=split>
    <div class=col>
      <div class=panel>
        <div class=label>Library</div>
        <select id=select_soundList class=soundSelect onclick='loadedSound=0;LoadSelected(1)' onchange=LoadSelected(1) size=2></select>
      </div>
      <div class=panel>
        <div class=label>Generate</div>
        <button class="large btn-primary" title='Create new random sound [INS]' onclick=AddPresetSound()>Random</button><button class="large btn-primary" title='Make a new sound with mutated parameters [M]' onclick=CopySelected(1)>Mutate</button><button class="large btn-primary" title='Make copy of selected sound [C]' onclick=CopySelected()>Copy</button>
        <button class=large title='Generate random pickup sound' onclick="AddPresetSound('Pickup')">Pickup</button><button class=large title='Generate random powerup sound' onclick="AddPresetSound('Powerup')">Powerup</button><button class=large title='Generate random shoot sound' onclick="AddPresetSound('Shoot')">Shoot</button><button class=large title='Generate a tonal sound for music' onclick="AddPresetSound('Music')">Note</button>
        <button class=large title='Generate random jump sound' onclick="AddPresetSound('Jump')">Jump</button><button class=large title='Generate random blip sound' onclick="AddPresetSound('Blip')">Blip</button><button class=large title='Generate random hit sound' onclick="AddPresetSound('Hit')">Hit</button><button class=large title='Generate random explosion sound' onclick="AddPresetSound('Explosion')">Explosion</button>
      </div>
      <div class=panel>
        <div class=label>Sound</div>
        <button class=large title='Toggle favorite on current sound [F]' onclick=FavoriteSelected()>Favorite</button><button class=large title='Move selected to top of the list' onclick="SelectedToTop()">Top</button><button title='Remove selected sound [DEL]' class=large onclick=RemoveSelected()>Remove</button>
        <button title='Download the selected wave file' onclick=SaveWave()>Save Wav</button>
        <button title='Load sound from zzfx code' onclick=LoadSound()>Load Sound</button>
        <button title='Copy ZzFX code to clipboard' onclick=if(CopyToCliboard(textarea_code.value))PlaySelected()>Copy Sound</button>
        <button title='Import all sounds from a text file.' onclick=Import()>Import</button>
        <button title='Export all sounds to a text file.' onclick=Export()>Export</button>
        <button title='Clear non-favorite sounds' onclick=ClearSoundsButton()>Clear</button>
        <button title='Clear all sounds' onclick=ClearSoundsButton(1)>Clear All</button>
      </div>
    </div>

    <div class=panel>
      <div class=label>Parameters</div>
      <div id=div_settingsTable></div>
    </div>
  </div>

  <div class="panel codebar">
    <div class=styles>
      <span class=label style=margin:0>ZzFX Code</span>
      <label><input type=radio name=radio_codeStyle id=input_codeStyleCompact checked onchange="SaveLocalStorage();textarea_code.value=GetCode(GetSelectedSound())">Compact</label>
      <label><input type=radio name=radio_codeStyle id=input_codeStyleFull onchange="SaveLocalStorage();textarea_code.value=GetCode(GetSelectedSound())">Full</label>
      <label><input type=radio name=radio_codeStyle id=input_codeStyleLittleJS onchange="SaveLocalStorage();textarea_code.value=GetCode(GetSelectedSound())">LittleJS</label>
      <label><input type=radio name=radio_codeStyle id=input_codeStyleLua onchange="SaveLocalStorage();textarea_code.value=GetCode(GetSelectedSound())">Lua</label>
    </div>
    <textarea title='Use this code to play the selected sound' id=textarea_code readonly></textarea>
  </div>

  <div class=footer>ZzFX © <a href=https://www.frankforce.com target=_blank>Frank Force</a> 2019 ☮♥☻␌</div>
  <a hidden id=a_downloadLink></a>
  <input hidden id=input_importFile type=file accept=.txt>

</div>
```

> Note: this block closes only `<div class=app>`. The original `</div>` that closes `#UI` (near the end of the file, after the scripts and the GitHub corner) stays where it is — leave the GitHub-corner `<a class=github-corner …>` and its `<style>` untouched.

- [ ] **Step 2: Verify the full interaction checklist**

Reload `http://localhost:8000/`. Confirm layout B: header, hero panel (volume + waveform + empty spectrogram canvas), a two-column split (library/generate/sound-actions left, parameters right), code bar, footer. Then verify **each** interaction (spec §"Preserved behavior") with no console errors:

- Click the waveform canvas → plays; press space → plays.
- Each preset button (Random, Mutate, Copy, Pickup, Powerup, Shoot, Note, Jump, Blip, Hit, Explosion) adds a sound and plays it.
- Select a different list row → loads its params.
- Edit a number param → updates + plays; shape `<select>` and note `<select>` work.
- Per-param lock / mutate (cyan) / reset (green); header lock-all / mutate-all / reset-all.
- Favorite / Top / Remove (favorite shows removal confirm).
- Save Wav downloads; Load Sound prompts; Copy Sound copies; Import/Export; Clear / Clear All (Clear All confirms).
- Code-style radios switch output; drag-drop an exported `.txt` onto the list loads it.
- Reload the page → sounds, volume, and code style persist.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Restructure editor into layout B (hero band + split + code bar)"
```

---

## Task 4: Rebuild the parameter panel markup

Update `BuildSettingsTable()` to emit the new grid markup with the Task 2 classes, **preserving all ids/handlers**. Also recolor the "modified from default" indicator in `UpdateSettings` from `#f3f` to the accent.

**Files:**
- Modify: `index.html` — `BuildSettingsTable()` (currently ~lines 287–366) and the indicator line in `UpdateSettings()` (currently ~line 476).

**Interfaces:**
- Consumes: `settings`, `noteScale`, classes `.param-grid .param-row .param-label .param-cell .lock .rand .reset`.
- Produces: same ids as before (`input_${name}`, `input_lock_${name}`, `input_mutate_${name}`, `input_reset_${name}`, `input_note`, `input_name`).

- [ ] **Step 1: Replace `BuildSettingsTable`**

Replace the whole `BuildSettingsTable` function body's HTML-building section with this (keep the `NoteName` helper and `noteScale` construction at the top exactly as they are):

```js
    const s = settings[0];
    let html = '<div class=param-grid>';

    // header row: name + lock-all / mutate-all / reset-all
    html += '<div class=param-row>';
    html += `<div class=param-label>${s.niceName}</div>`;
    html += `<div class=param-cell><input title='${s.help}' class=setting step=${s.step} id=input_${s.name} oninput=SelectedWasChanged('${s.name}')></div>`;
    html += '<button title="Toggle lock all parameters" onclick=ToggleLockAll()>🔒</button>';
    html += '<button title="Mutate all unlocked parameters" onclick=if(MutateAllSettings())PlaySelected()>🎲</button>';
    html += '<button title="Sets all unlocked parameters to their default values." onclick=if(ResetAllSettings())PlaySelected()>♻️</button>';
    html += '</div>';

    for(const i in settings)
    {
        const s = settings[i];
        if (s.name == 'name')
            continue;

        const isFrequency = s.name == 'frequency';
        html += '<div class=param-row>';
        html += `<div class=param-label>${s.niceName}</div>`;
        html += '<div class=param-cell>';

        if (!s.type)
            html += `<input id=input_${s.name} class=setting title='${s.help}' type=number step=${s.step} oninput=SelectedWasChanged('${s.name}') min=${s.min} max=${s.max} onfocusout=UpdateSettings()>`;
        else if (s.type == SETTING_TYPE_SHAPE)
        {
            html += `<select id=input_${s.name} class=setting title='${s.help}' oninput=SelectedWasChanged('${s.name}')>`;
            html += `<option value=0>sine</option><option value=1>triangle</option><option value=2>saw</option><option value=3>tan</option><option value=4>noise</option><option value=5>square</option>`;
            html += `</select>`;
        }

        if (isFrequency)
        {
            html += `<select id=input_note class=setting title='Set frequency to note' oninput=SetFrequencyToNote()>`;
            html += `<option value=-1></option>`;
            noteScale.map((note,i)=>html += `<option value=${i}>${note[1]}</option>`);
            html += `</select>`;
        }

        html += '</div>';
        html += `<input id=input_lock_${s.name} class=lock title='Lock ${s.niceName}' oninput=SelectedWasChanged('${s.name}') type=checkbox>`;
        html += `<button id=input_mutate_${s.name} class=rand title='Mutate ${s.niceName}' onclick=MutateSetting(settings[${i}]);PlaySelected()></button>`;
        html += `<button id=input_reset_${s.name} class=reset title='Reset ${s.niceName}' onclick=ResetSetting(settings[${i}]);PlaySelected()></button>`;
        html += '</div>';
    }

    html += '</div>';
    div_settingsTable.innerHTML = html;
```

- [ ] **Step 2: Recolor the modified indicator**

In `UpdateSettings`, change:

```js
                elementReset.style.background = isDefault ? '' : '#f3f';
```

to:

```js
                elementReset.style.background = isDefault ? '' : 'var(--accent-magenta)';
```

- [ ] **Step 3: Verify in the browser**

Reload. Expected: parameter rows render as an aligned grid (right-aligned label, input, lock, cyan mutate dot, green reset dot). Verify: editing a value plays + updates code; the reset dot turns magenta when a value differs from default; shape select changes waveform; note select sets frequency; lock/mutate/reset per-row and the header 🔒/🎲/♻️ all work.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Rebuild parameter panel as aligned grid, preserve ids"
```

---

## Task 5: Restyle the waveform + fix the logo hue

Recolor `DrawSoundWave` to the palette (subtle accent ADSR bands, cyan trace, no random HSL) and make `RandomizeLogo` stop recoloring the logo per play (the logo is a fixed CSS gradient now).

**Files:**
- Modify: `index.html` — `DrawSoundWave()` (~lines 1256–1297) and `RandomizeLogo()` (~lines 1299–1304).

**Interfaces:**
- Consumes: `canvas_soundWave`, `sound`, `ZZFX.sampleRate`.
- Produces: unchanged signature `DrawSoundWave(b, volume, sound)`.

- [ ] **Step 1: Replace `DrawSoundWave`**

```js
function DrawSoundWave(b, volume, sound)
{
    const x = canvas_soundWave.getContext('2d');
    const w = canvas_soundWave.width;
    const h = canvas_soundWave.height;
    canvas_soundWave.width |= 0; // clear

    if (!volume) return;

    const sr = ZZFX.sampleRate, len = b.length;
    // ADSR region shading (subtle accent tint)
    const regions = [
        [sound.attack,  'rgba(77,243,255,.10)'],
        [sound.decay,   'rgba(155,107,255,.10)'],
        [sound.sustain, 'rgba(255,107,208,.10)'],
        [sound.release, 'rgba(77,243,255,.10)'],
    ];
    let X = 0;
    x.fillStyle = 'rgba(255,255,255,.03)';
    x.fillRect(0,0,w,h);
    if (!len) return;
    for(const [dur,color] of regions)
    {
        const W = w * dur * sr / len;
        x.fillStyle = color;
        x.fillRect(X,0,W,h);
        x.strokeStyle = 'rgba(255,255,255,.08)';
        x.strokeRect(X,0,W,h);
        X += W;
    }

    // wave trace
    x.strokeStyle = '#4df3ff';
    x.lineWidth = 1.2;
    x.beginPath();
    for(let i=0; i<len; i+=10)
        x.lineTo(w*i/len, .8*b[i]*h/2/volume + h/2);
    x.stroke();
}
```

- [ ] **Step 2: Neutralize `RandomizeLogo`**

Replace `RandomizeLogo` with a no-op that keeps callers valid (the logo gradient is set in CSS):

```js
function RandomizeLogo(){ /* logo uses a fixed CSS gradient in the Signature Spectrum palette */ }
```

- [ ] **Step 3: Verify in the browser**

Reload. Play several sounds. Expected: the waveform shows faint accent-tinted ADSR bands and a cyan trace on a near-black panel (no more random rainbow fills); the logo stays a fixed cyan→violet→magenta gradient and no longer flickers colors on each play.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Restyle waveform to palette; fix logo to static gradient"
```

---

## Task 6: DSP — FFT (automated check)

Build and verify the radix-2 FFT in `scripts/spectrogram-check.mjs` first.

**Files:**
- Create: `scripts/spectrogram-check.mjs`

**Interfaces:**
- Produces: `fft(re, im)` — in-place iterative radix-2 FFT; `re`/`im` are equal-length arrays whose length is a power of two.

- [ ] **Step 1: Write the failing check**

Create `scripts/spectrogram-check.mjs`:

```js
// Dev-only checks for the pure DSP functions. Node built-ins only.
// Run: node scripts/spectrogram-check.mjs
import assert from 'node:assert/strict';

const SAMPLE_RATE = 44100;

// ---- functions under test (authored here, then pasted into index.html) ----
// fft: added in Step 3.

// ---- checks ----
function checkFFT(){
  const N = 1024, k = 50;                 // bin 50 -> f = k*SR/N = 2153.32 Hz
  const re = new Array(N), im = new Array(N).fill(0);
  for(let n=0;n<N;n++) re[n] = Math.sin(2*Math.PI*k*n/N);
  fft(re, im);
  let maxBin = 1, maxMag = 0;
  for(let i=1;i<N/2;i++){
    const m = Math.hypot(re[i], im[i]);
    if (m > maxMag){ maxMag = m; maxBin = i; }
  }
  assert.equal(maxBin, k, `expected peak at bin ${k}, got ${maxBin}`);
  console.log('FFT ok: peak bin', maxBin);
}

checkFFT();
console.log('all checks passed');
```

- [ ] **Step 2: Run to verify it fails**

Run: `node scripts/spectrogram-check.mjs`
Expected: `ReferenceError: fft is not defined`.

- [ ] **Step 3: Implement `fft`**

Add above the checks:

```js
// In-place iterative radix-2 Cooley–Tukey FFT. Length must be a power of two.
function fft(re, im){
  const n = re.length;
  for(let i=1, j=0; i<n; i++){          // bit-reversal permutation
    let bit = n >> 1;
    for(; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j){ [re[i],re[j]]=[re[j],re[i]]; [im[i],im[j]]=[im[j],im[i]]; }
  }
  for(let len=2; len<=n; len<<=1){       // butterflies
    const ang = -2*Math.PI/len, wr = Math.cos(ang), wi = Math.sin(ang);
    for(let i=0; i<n; i+=len){
      let cr = 1, ci = 0;
      for(let k=0; k<len/2; k++){
        const ur = re[i+k],           ui = im[i+k];
        const vr = re[i+k+len/2]*cr - im[i+k+len/2]*ci;
        const vi = re[i+k+len/2]*ci + im[i+k+len/2]*cr;
        re[i+k]=ur+vr;        im[i+k]=ui+vi;
        re[i+k+len/2]=ur-vr;  im[i+k+len/2]=ui-vi;
        [cr,ci] = [cr*wr - ci*wi, cr*wi + ci*wr];
      }
    }
  }
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node scripts/spectrogram-check.mjs`
Expected: `FFT ok: peak bin 50` then `all checks passed`.

- [ ] **Step 5: Commit**

```bash
git add scripts/spectrogram-check.mjs
git commit -m "Add radix-2 FFT with automated check"
```

---

## Task 7: DSP — window, magma, dB-normalize, log-frequency map

Extend the check script with the remaining pure functions.

**Files:**
- Modify: `scripts/spectrogram-check.mjs`

**Interfaces:**
- Produces:
  - `hann(N)` → `Array` of length `N`, Hann window weights.
  - `magma(t)` → `[r,g,b]` in 0..255 for `t` in `[0,1]`.
  - `dbNorm(mag, maxMag)` → normalized `[0,1]` over `DB_FLOOR..0` dB.
  - `freqForY(y, height)` → frequency in Hz (log axis, top=high); `binForFreq(freq)` → float bin index into `FFT_SIZE/2` bins.
  - Constants `FFT_SIZE=1024`, `F_MIN=30`, `F_MAX=18000`, `DB_FLOOR=-60`.

- [ ] **Step 1: Add failing checks**

Add these constants near the top (below `SAMPLE_RATE`) and these checks before the final `console.log('all checks passed')`:

```js
const FFT_SIZE = 1024, F_MIN = 30, F_MAX = 18000, DB_FLOOR = -60;

function checkHann(){
  const w = hann(8);
  assert.ok(w[0] < 1e-9 && w[7] < 1e-9, 'hann ends ~0');
  assert.ok(Math.abs(w[4] - 1) < 0.15, 'hann peak near center');
  console.log('hann ok');
}
function checkMagma(){
  const a = magma(0), b = magma(1);
  assert.deepEqual(a, [0,0,4]);
  assert.deepEqual(b, [252,253,191]);
  const m = magma(0.5);
  assert.ok(m.every(v=>v>=0 && v<=255), 'magma in range');
  console.log('magma ok');
}
function checkDbNorm(){
  assert.equal(dbNorm(1,1), 1);
  assert.equal(dbNorm(0,1), 0);
  const half = dbNorm(Math.pow(10,-30/20), 1); // -30 dB -> 0.5
  assert.ok(Math.abs(half - 0.5) < 1e-6, `mid ${half}`);
  console.log('dbNorm ok');
}
function checkFreqMap(){
  const H = 170;
  assert.ok(Math.abs(freqForY(H-1,H) - F_MIN) < 1e-6, 'bottom = F_MIN');
  assert.ok(Math.abs(freqForY(0,H)   - F_MAX) < 1e-6, 'top = F_MAX');
  assert.ok(freqForY(0,H) > freqForY(H-1,H), 'top higher than bottom');
  const bin = binForFreq(SAMPLE_RATE/2);
  assert.ok(Math.abs(bin - FFT_SIZE/2) < 1e-6, 'nyquist -> last bin');
  console.log('freq map ok');
}
checkHann(); checkMagma(); checkDbNorm(); checkFreqMap();
```

- [ ] **Step 2: Run to verify it fails**

Run: `node scripts/spectrogram-check.mjs`
Expected: `ReferenceError: hann is not defined`.

- [ ] **Step 3: Implement the functions**

Add above the checks:

```js
function hann(N){
  const w = new Array(N);
  for(let i=0;i<N;i++) w[i] = 0.5 - 0.5*Math.cos(2*Math.PI*i/(N-1));
  return w;
}

// magma colormap: interpolate between sampled control stops.
const MAGMA = [
  [0,0,4],[28,16,68],[79,18,123],[129,37,129],
  [181,54,122],[229,80,100],[251,135,97],[254,194,135],[252,253,191]
];
function magma(t){
  t = Math.max(0, Math.min(1, t));
  const s = t*(MAGMA.length-1), i = Math.floor(s), f = s-i;
  if (i >= MAGMA.length-1) return MAGMA[MAGMA.length-1].slice();
  const a = MAGMA[i], b = MAGMA[i+1];
  return [0,1,2].map(c => Math.round(a[c] + (b[c]-a[c])*f));
}

function dbNorm(mag, maxMag){
  const db = 20*Math.log10(mag/(maxMag||1) + 1e-9); // relative dB, <= 0
  return Math.max(0, Math.min(1, 1 + db/(-DB_FLOOR)));
}

function freqForY(y, height){
  return F_MIN * Math.pow(F_MAX/F_MIN, 1 - y/(height-1)); // top(y=0)=F_MAX
}
function binForFreq(freq){
  return freq / (SAMPLE_RATE/2) * (FFT_SIZE/2);
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node scripts/spectrogram-check.mjs`
Expected: `hann ok`, `magma ok`, `dbNorm ok`, `freq map ok`, then `all checks passed`.

- [ ] **Step 5: Commit**

```bash
git add scripts/spectrogram-check.mjs
git commit -m "Add Hann/magma/dbNorm/log-freq DSP with checks"
```

---

## Task 8: Integrate the spectrogram into the page + draw on play

Paste the verified DSP functions into `index.html` as a bounded Spectrogram section, add `computeSpectrogram`/`drawSpectrogram`, and call them from `PlaySelected` so the spectrogram renders whenever the waveform does (including at volume 0).

**Files:**
- Modify: `index.html` — add a Spectrogram section in the inline `<script>` (place it just above `function DrawSoundWave`), and edit `PlaySelected()` (~lines 376–417).

**Interfaces:**
- Consumes: `canvas_spectrogram`, `ZZFX.sampleRate`, the sample buffer `samples`.
- Produces: `computeSpectrogram(samples)` → caches `spectrogramImage` (`ImageData`) sized to the canvas; `drawSpectrogram()` blits it. Constants `FFT_SIZE HOP F_MIN F_MAX DB_FLOOR`. Shared state `spectrogramImage` (consumed by Task 9).

- [ ] **Step 1: Add the Spectrogram section**

Insert above `function DrawSoundWave(...)`:

```js
///////////////////////////////////////////////////////////////////////////////
// spectrogram (precomputed STFT, magma colormap, log-frequency axis)

const FFT_SIZE = 1024, HOP = 256, F_MIN = 30, F_MAX = 18000, DB_FLOOR = -60;
const HANN = hann(FFT_SIZE);
let spectrogramImage = 0; // cached ImageData of the last computed spectrogram

function hann(N){
  const w = new Array(N);
  for(let i=0;i<N;i++) w[i] = 0.5 - 0.5*Math.cos(2*Math.PI*i/(N-1));
  return w;
}

function fft(re, im){
  const n = re.length;
  for(let i=1, j=0; i<n; i++){
    let bit = n >> 1;
    for(; j & bit; bit >>= 1) j ^= bit;
    j ^= bit;
    if (i < j){ [re[i],re[j]]=[re[j],re[i]]; [im[i],im[j]]=[im[j],im[i]]; }
  }
  for(let len=2; len<=n; len<<=1){
    const ang = -2*Math.PI/len, wr = Math.cos(ang), wi = Math.sin(ang);
    for(let i=0; i<n; i+=len){
      let cr = 1, ci = 0;
      for(let k=0; k<len/2; k++){
        const ur = re[i+k], ui = im[i+k];
        const vr = re[i+k+len/2]*cr - im[i+k+len/2]*ci;
        const vi = re[i+k+len/2]*ci + im[i+k+len/2]*cr;
        re[i+k]=ur+vr;       im[i+k]=ui+vi;
        re[i+k+len/2]=ur-vr; im[i+k+len/2]=ui-vi;
        [cr,ci] = [cr*wr - ci*wi, cr*wi + ci*wr];
      }
    }
  }
}

const MAGMA = [
  [0,0,4],[28,16,68],[79,18,123],[129,37,129],
  [181,54,122],[229,80,100],[251,135,97],[254,194,135],[252,253,191]
];
function magma(t){
  t = Math.max(0, Math.min(1, t));
  const s = t*(MAGMA.length-1), i = Math.floor(s), f = s-i;
  if (i >= MAGMA.length-1) return MAGMA[MAGMA.length-1];
  const a = MAGMA[i], b = MAGMA[i+1];
  return [a[0]+(b[0]-a[0])*f, a[1]+(b[1]-a[1])*f, a[2]+(b[2]-a[2])*f];
}
function dbNorm(mag, maxMag){
  const db = 20*Math.log10(mag/(maxMag||1) + 1e-9);
  return Math.max(0, Math.min(1, 1 + db/(-DB_FLOOR)));
}
function freqForY(y, height){ return F_MIN * Math.pow(F_MAX/F_MIN, 1 - y/(height-1)); }
function binForFreq(freq){ return freq / (ZZFX.sampleRate/2) * (FFT_SIZE/2); }

function computeSpectrogram(samples)
{
    const cv = canvas_spectrogram, w = cv.width, h = cv.height;
    const N = samples.length, bins = FFT_SIZE/2;

    // STFT: one magnitude column per frame
    const frames = [];
    let maxMag = 1e-9;
    for(let start=0; start + FFT_SIZE <= N || (start===0); start += HOP)
    {
        const re = new Array(FFT_SIZE), im = new Array(FFT_SIZE).fill(0);
        for(let i=0;i<FFT_SIZE;i++)
            re[i] = (start+i < N ? samples[start+i] : 0) * HANN[i];
        fft(re, im);
        const mag = new Array(bins);
        for(let i=0;i<bins;i++){
            const m = Math.hypot(re[i], im[i]);
            mag[i] = m;
            if (m > maxMag) maxMag = m;
        }
        frames.push(mag);
        if (start + FFT_SIZE > N) break; // ensure at least one frame for short sounds
    }

    // paint pixels: x -> frame (time), y -> log frequency
    const ctx = cv.getContext('2d');
    const img = ctx.createImageData(w, h);
    const nf = frames.length;
    for(let x=0; x<w; x++)
    {
        const frame = frames[Math.round(x/(w-1||1) * (nf-1))];
        for(let y=0; y<h; y++)
        {
            const bin = binForFreq(freqForY(y, h));
            const i0 = Math.min(bins-1, Math.floor(bin)), i1 = Math.min(bins-1, i0+1);
            const fr = bin - i0;
            const mag = frame[i0]*(1-fr) + frame[i1]*fr;         // interpolate bins
            const [r,g,b] = magma(dbNorm(mag, maxMag));
            const p = (y*w + x)*4;
            img.data[p]=r; img.data[p+1]=g; img.data[p+2]=b; img.data[p+3]=255;
        }
    }
    spectrogramImage = img;
    ctx.putImageData(img, 0, 0);
}

function drawSpectrogram(){ if (spectrogramImage) canvas_spectrogram.getContext('2d').putImageData(spectrogramImage,0,0); }
```

- [ ] **Step 2: Call it from `PlaySelected`**

In `PlaySelected`, after each `DrawSoundWave(samples, …)` call, add a matching `computeSpectrogram(samples)`. Both the volume>0 branch and the muted (`else`) branch build `samples`; add the call in both so the spectrogram renders even at volume 0:

```js
    if (ZZFX.volume > 0)
    {
        const samples = ZZFX.buildSamples(...params);
        lastPlayedSound = ZZFX.play(...params);
        DrawSoundWave(samples, ZZFX.volume, sound);
        computeSpectrogram(samples);
    }
    else
    {
        const saveVolume = ZZFX.volume;
        ZZFX.volume = 1;
        const samples = ZZFX.buildSamples(...params);
        DrawSoundWave(samples, 1, sound);
        computeSpectrogram(samples);
        ZZFX.volume = saveVolume;
    }
```

- [ ] **Step 3: Make the spectrogram canvas play on click**

Find the existing `canvas_soundWave.onmousedown` handler (~line 1437) and add the same for the new canvas, directly below it:

```js
canvas_soundWave.onmousedown = e=> { PlaySelected(); e.preventDefault(); }
canvas_spectrogram.onmousedown = e=> { PlaySelected(); e.preventDefault(); }
```

- [ ] **Step 4: Verify correctness in the browser**

Reload. Then:
- Select/create a **sine** (shape `sine`, frequency ~440, no noise/slide/modulation): the spectrogram shows a **single horizontal band** low in the frame; raise frequency → the band moves **up**.
- Add a **rising slide** (positive Slide): the band **slopes upward** left→right.
- Set shape **noise**: the image is **broadband** (energy spread vertically).
- Set Master Volume to 0: the spectrogram **still renders** on play.
No console errors.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "Render precomputed magma spectrogram on play"
```

---

## Task 9: Active playhead sweep

Add a `requestAnimationFrame` playhead that sweeps across both canvases in sync with `audioContext.currentTime`, cancels on replay, and leaves the finished image.

**Files:**
- Modify: `index.html` — add playhead code in the Spectrogram section; call `startPlayhead(samples)` from `PlaySelected`.

**Interfaces:**
- Consumes: `spectrogramImage` (Task 8), `canvas_soundWave`, `canvas_spectrogram`, `ZZFX.audioContext`, `ZZFX.sampleRate`.
- Produces: `startPlayhead(samples)`; internal `playheadAnim`, `waveImage`.

- [ ] **Step 1: Add playhead functions**

Add to the Spectrogram section:

```js
let playheadAnim = 0, waveImage = 0;

function drawPlayhead(ctx, canvas, cachedImage, x)
{
    if (cachedImage) ctx.putImageData(cachedImage, 0, 0);
    ctx.save();
    ctx.strokeStyle = '#eafcff';
    ctx.shadowColor = '#4df3ff';
    ctx.shadowBlur = 8;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
    ctx.restore();
}

function startPlayhead(samples)
{
    cancelAnimationFrame(playheadAnim);
    // cache the freshly-drawn waveform so the playhead can redraw over it
    const wc = canvas_soundWave.getContext('2d');
    waveImage = wc.getImageData(0, 0, canvas_soundWave.width, canvas_soundWave.height);

    const duration = samples.length / ZZFX.sampleRate;
    const start = ZZFX.audioContext.currentTime;

    const tick = ()=>
    {
        const t = ZZFX.audioContext.currentTime - start;
        if (t >= duration || duration <= 0)
        {
            // restore clean final images
            if (waveImage) wc.putImageData(waveImage, 0, 0);
            drawSpectrogram();
            return;
        }
        const f = t / duration;
        drawPlayhead(wc, canvas_soundWave, waveImage, f*canvas_soundWave.width);
        drawPlayhead(canvas_spectrogram.getContext('2d'), canvas_spectrogram, spectrogramImage, f*canvas_spectrogram.width);
        playheadAnim = requestAnimationFrame(tick);
    };
    playheadAnim = requestAnimationFrame(tick);
}
```

- [ ] **Step 2: Call `startPlayhead` from `PlaySelected`**

Add `startPlayhead(samples)` immediately after each `computeSpectrogram(samples)` call (both branches), so the sweep starts once both images exist:

```js
        DrawSoundWave(samples, ZZFX.volume, sound);
        computeSpectrogram(samples);
        startPlayhead(samples);
```
and likewise in the muted branch (after its `computeSpectrogram(samples)`).

- [ ] **Step 3: Verify in the browser**

Reload. Then:
- Play a longer sound (e.g. an Explosion or a Note with long release): a glowing cyan **playhead sweeps left→right** across **both** the waveform and the spectrogram, roughly in time with the audio, then disappears leaving the clean images.
- Set Master Volume to 0 and play: the playhead **still sweeps** (driven by the audio clock).
- Drag a parameter slider rapidly (fires many plays): playheads **do not stack or flicker into multiples** — each new play cancels the previous sweep.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add animated playhead synced to audio clock"
```

---

## Task 10: Responsive layout + full regression

Make the split collapse on narrow screens, allow page zoom, and run the whole interaction checklist once more.

**Files:**
- Modify: `index.html` — viewport `<meta>` (~line 61) and add a responsive `@media` block to the `<style>`.

- [ ] **Step 1: Allow zoom**

Replace:

```html
<meta name="viewport" content="user-scalable=no" />
```

with:

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

- [ ] **Step 2: Add responsive rules**

Append to the `<style>` block (before `</style>`):

```css
@media (max-width:800px){
  .split{ grid-template-columns:1fr; }
  .logo{ font-size:32px; }
  .tagline{ font-size:16px; }
  .header{ flex-wrap:wrap; gap:6px; }
  .param-row{ grid-template-columns:96px 1fr auto auto auto; }
}
```

- [ ] **Step 3: Verify responsive + full regression**

Reload at a wide window: two-column split, hero full width. Narrow the window below 800px: the split becomes a **single column** (library stacks above parameters), canvases shrink to fit, nothing overflows horizontally, and the page can pinch/ctrl-zoom.

Then re-run the **entire** interaction checklist from Task 3 Step 2 once more (play, every preset, list select, param edit, shape/note, lock/mutate/reset single + all, favorite/top/remove, save/load/copy/import/export/clear/clear-all, code styles, drag-drop, reload persistence) **plus** the spectrogram + playhead behaviors from Tasks 8–9. Confirm no console errors and that saved data from before the redesign still loads.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Add responsive layout and allow zoom"
```

---

## Self-Review (completed during planning)

- **Spec coverage:** design system → T2; layout B + hero stacked + `canvas_spectrogram` → T3; parameter panel → T4; waveform restyle + fixed logo → T5; FFT/STFT/magma/log-freq/dB → T6–T8; playhead synced to `audioContext.currentTime` + cancel-on-replay + muted sweep → T9; responsive + viewport → T10; id-preservation contract → Global Constraints + T3/T4; correctness checks (sine→band, slide→slope) → T8 Step 4. All spec sections map to a task.
- **Placeholder scan:** every code step contains complete, ready-to-paste code; no TBD/TODO/"handle edge cases".
- **Type consistency:** `fft(re,im)`, `hann(N)`, `magma(t)→[r,g,b]`, `dbNorm(mag,maxMag)`, `freqForY(y,height)`, `binForFreq(freq)`, `computeSpectrogram(samples)`→`spectrogramImage`, `drawSpectrogram()`, `startPlayhead(samples)`/`playheadAnim`/`waveImage` are used identically across Tasks 6–9. `binForFreq` uses `SAMPLE_RATE` in the check script and `ZZFX.sampleRate` in the page (same value, 44100) — intentional and noted.
```
