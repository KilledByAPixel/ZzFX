// Dev-only checks for the pure DSP functions. Node built-ins only.
// Run: node scripts/spectrogram-check.mjs
import assert from 'node:assert/strict';

const SAMPLE_RATE = 44100;

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
