// Dev-only checks for the pure DSP functions. Node built-ins only.
// Run: node scripts/spectrogram-check.mjs
import assert from 'node:assert/strict';

const SAMPLE_RATE = 44100;
const FFT_SIZE = 1024, F_MIN = 30, F_MAX = 18000, DB_FLOOR = -60;

// ---- functions under test (authored here, then pasted into index.html) ----

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

checkFFT(); checkHann(); checkMagma(); checkDbNorm(); checkFreqMap();
console.log('all checks passed');
