/*

ZzFX - Zuper Zmall Zound Zynth
By Frank Force 2019

ZzFX Features

- Tiny synth engine with 17 controllable parameters.
- Play sounds via code, no need for wave files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte!
- Can produce a huge variety of sound effect types.
- Sounds can be played with a short call. zzfx(...[,,,,.1,,,,9])
- A small bit of randomness appied to sounds when played.
- Use ZZFX.GetNote to get frequencies on a standard diatonic scale.
- Sounds can be saved out as wav files for offline playback.
- Both ZzFX and ZzFXMicro run in strict mode.
- No additional libraries or dependencies are required.
- Open source with MIT license, you can use this for anything!

*/
/*

  ZzFX MIT License
  
  Copyright (c) 2019 - Frank Force
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  
*/

'use strict';

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name zzfx.min.js
// @js_externs zzfx, ZZFX, _ZZFX.samples, _ZZFX.volume
// @js_externs _ZZFX, _ZZFX.Play, _ZZFX.PlaySamples, _ZZFX.BuildSamples
// @js_externs _ZZFX.BuildRandomSound, _ZZFX.BuildSound, _ZZFX.GetNote
// @js_externs _ZZFX.SoundToArray, _ZZFX.CreateAudioContext, _ZZFX.randomness
// @language_out ECMASCRIPT_2019
// ==/ClosureCompiler==

class _ZZFX
{
constructor()
{
    this.x = this.CreateAudioContext(); // shared audio context
    this.samples = 0;                   // last played samples
    this.volume = .3;                   // master volume scale
    this.sampleRate = 44100;            // sample rate for audio
}

Play(sound)
{
    // check if sound object was passed in
    if (!sound || typeof sound != 'object')
    {
        // replace with defaults
        const defaultSound = this.BuildSound();
        sound = this.BuildSound(...arguments);
        for (const key in sound)
            if (typeof sound[key] == 'undefined')
                sound[key] = defaultSound[key];
    }

    // build samples and start sound
    const params = this.SoundToArray(sound);
    const samples = this.BuildSamples(...params, this.volume);
    return this.PlaySamples(samples);
}

PlaySamples(samples)
{
    const buffer = this.x.createBuffer(1, samples.length, this.sampleRate);
    const source = this.x.createBufferSource();
    buffer.getChannelData(0).set(samples);
    source.buffer = buffer;
    source.connect(this.x.destination);
    source.start();
    this.samples = samples;
    return source;
}

BuildSamples
(
    volume, 
    randomness,
    frequency,
    attack,
    sustain,
    release,
    shape,
    shapeCurve,
    slide, 
    deltaSlide,
    pitchJump,
    pitchJumpTime,
    repeatTime,
    noise,
    modulation,
    bitCrush,
    delay,
    volumeScale = 1
)
{
    // init parameters
    const PI2 = Math.PI*2;
    const sampleRate = this.sampleRate;
    const random = r => r*(Math.random()*2-1);
    const sign = v => v>0?1:-1;
    const startSlide = slide *= PI2 * 500 / sampleRate**2;
    const modPhase = sign(modulation) * PI2/4
    let startFrequency = frequency *= 
        (1 + random(randomness)) * PI2 / sampleRate;
    attack = 50 + attack * sampleRate | 0;
    sustain = sustain * sampleRate | 0;
    release = release * sampleRate | 0;
    delay = delay * sampleRate | 0;
    deltaSlide *= PI2 * 500 / sampleRate**3;
    modulation *= PI2 / sampleRate;
    pitchJump *= PI2 / sampleRate;
    pitchJumpTime = pitchJumpTime * sampleRate;
    repeatTime = repeatTime * sampleRate;
    const length = Math.max(1, Math.min(attack+sustain+release+delay, sampleRate * 10));

    // generate waveform
    let b=[], t=0, tm=0, i=0, j=1, r=0, c=0, s=0, d=.5;
    for(; i < length;b[i++] = s)
    {
        if (++c>bitCrush*100)                          // bit crush
        {
            c = 0;
            s = t * frequency *                        // frequency
                Math.sin(tm * modulation - modPhase);  // modulation

            s = shape? shape>1? shape>2? shape>3?   // wave shape
              Math.sin((s%PI2)**3) :                // 4 noise
              Math.max(Math.min(Math.tan(s),1),-1): // 3 tan
              1-(2*s/PI2%2+2)%2:                    // 2 saw
              1-4*Math.abs(Math.round(s/PI2)-s/PI2):// 1 triangle
              Math.sin(s);                          // 0 sin
            s = sign(s)*(Math.abs(s)**shapeCurve);  // curve 0=square, 2=pointy

            s *= volume * volumeScale * (                // envelope
                i<attack ? i/attack :                    // attack
                i<attack+sustain ? 1 :                   // sustain
                i<length-delay ?                         // post release
                1 - (i-attack-sustain)/release : 0);     // release

            s = delay ?                                  // delay
                s/2 + (delay > i ? 0 :
                (i<length-delay? 1 : (i-length)/delay) * // release delay 
                b[i-delay]/2) : s;
        }

        t += 1 + random(noise);                      // noise
        tm += 1 + random(noise);                     // modulation noise
        frequency += slide += deltaSlide;            // frequency slide

        if (j && ++j > pitchJumpTime)                // pitch jump
        {
            startFrequency += pitchJump;
            frequency += pitchJump;
            j = 0;
        };

        if (repeatTime && ++r > repeatTime)           // repeat
        {
            frequency = startFrequency;
            slide = startSlide;
            r = 1;
            j = j||1;
        }
    }

    return b;
}

BuildRandomSound()
{
    // generate a random sound
    function R() { return Math.random() }
    const sound = this.BuildSound
    (
       1,                                    // volume
       .05,                                  // randomness
       R()**2*2e3|0,                         // frequency
       .01 + R()**3,                         // attack
       R()**3,                               // sustain
       .01 + R()**3,                         // release
       R()*5|0,                              // shape
       R()<.2?1: R()*2,                      // shapeCurve
       R()<.5?0: R()**3*100*(R()<.5?-1:1),   // slide
       R()<.5?0: R()**3*100*(R()<.5?-1:1),   // deltaSlide
       0,                                    // pitchJump
       0,                                    // pitchJumpTime
       0,                                    // repeatTime
       R()<.5?0: R()**3*3,                   // noise
       R()<.5?0: R()**4*1e3,                 // modulation
       R()<.5?0: R()**3*5,                   // bitCrush
       R()<.5?0: R()**3*.5,                  // delay
    );

    if (R() < .1)
        sound['shapeCurve'] = R()**2*10;     // larger shape curve
    if (sound['shapeCurve'] >= 2)
        sound['shapeCurve'] = sound['shapeCurve']|0;

    if (R() < .5)
        sound['modulation'] *= -1;           // flip mod phase
        
    const length = sound['attack'] + sound['sustain'] + sound['release'];
    if (R() < .5)
    {
        sound['pitchJump'] = R()**2*1e3*(R()<.5?-1:1)|0; // pitchJump
        sound['pitchJumpTime'] = R()*length;             // pitchJumpTime  
    }

    if (R() < .5)
        sound['repeatTime'] = R()*length;    // repeatTime

    return sound;
}

// build sound object
BuildSound
(
    volume = 1, 
    randomness = .05,
    frequency = 220,
    attack = 0,
    sustain = 0,
    release = .1,
    shape = 0,
    shapeCurve = 1,
    slide = 0, 
    deltaSlide = 0, 
    pitchJump = 0, 
    pitchJumpTime = 0, 
    repeatTime = 0, 
    noise = 0,
    modulation = 0,
    bitCrush = 0,
    delay = 0
)
{
    const sound = 
    {
        'volume':       volume,
        'randomness':   randomness,
        'frequency':    frequency,
        'attack':       attack,
        'sustain':      sustain,
        'release':      release,
        'shape':        shape,
        'shapeCurve':   shapeCurve,
        'slide':        slide,
        'deltaSlide':   deltaSlide,
        'pitchJump':    pitchJump,
        'pitchJumpTime':pitchJumpTime,
        'repeatTime':   repeatTime,
        'noise':        noise,
        'modulation':   modulation,
        'bitCrush':     bitCrush,
        'delay':        delay
    };

    return sound;
}

// get frequency of a musical note
GetNote(rootNoteFrequency, semitoneOffset)
{
    return rootNoteFrequency * 2**(semitoneOffset/12);
}

// convert sound parameters object to array
SoundToArray(sound)
{
    // use default sound for keys and order
    const defaultSound = this.BuildSound();
    const array = [];
    for(const key in defaultSound)
        array.push(sound[key]);
    return array
}

CreateAudioContext()
{
    // fix compatibility issues with old web audio
    const audioContext = new (window.AudioContext || webkitAudioContext);
    audioContext.Z = audioContext.createBufferSource;
    audioContext.createBufferSource =
    (s = audioContext.Z())=>
    (
        s.start = s.start || (t => audioContext.noteOn (t)),
        s.stop  = s.stop  || (t => audioContext.noteOff(t)),
        s
    );

    return audioContext;
}
}

const ZZFX = new _ZZFX;
function zzfx() { ZZFX.Play(...arguments) }

///////////////////////////////////////////////////////////////////////////////

// ZzFXMicro - super tiny version with only a function to play sounds

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name zzfx.micro.js
// @js_externs zzfxP, zzfxV, zzfxX
// @language_out ECMASCRIPT_2019
// ==/ClosureCompiler==

let zzfxV = .3; // volume
let zzfxP =     // play a sound
(
    volume = 1, 
    randomness = .05,
    frequency = 220,
    attack = 0,
    sustain = 0,
    release = .1,
    shape = 0,
    shapeCurve = 1,
    slide = 0, 
    deltaSlide = 0, 
    pitchJump = 0, 
    pitchJumpTime = 0, 
    repeatTime = 0, 
    noise = 0,
    modulation = 0,
    bitCrush = 0,
    delay = 0,

    // locals
    PI2 = Math.PI*2,
    sampleRate = 44100,
    random = r => r*2*Math.random()-r,
    sign = v => v>0?1:-1,
    startSlide = slide *= PI2 * 500 / sampleRate**2,
    startFrequency = frequency *= 
        (1 + random(randomness)) * PI2 / sampleRate,
    modPhase = sign(modulation) * PI2/4,
    b=[], t=0, tm=0, i=0, j=1, r=0, c=0, s=0, d=.5,
    length, buffer,
    source = zzfxX.createBufferSource()
) =>
{
    // init parameters
    attack = 50 + attack * sampleRate | 0;
    sustain = sustain * sampleRate | 0;
    release = release * sampleRate | 0;
    delay = delay * sampleRate | 0;
    deltaSlide *= PI2 * 500 / sampleRate**3;
    length = attack + sustain + release + delay;
    modulation *= PI2 / sampleRate;
    pitchJump *= PI2 / sampleRate;
    pitchJumpTime = pitchJumpTime * sampleRate;
    repeatTime = repeatTime * sampleRate;

    // generate waveform
    for(; i < length;b[i++] = s)
    {
        if (++c>bitCrush*100)                            // bit crush
        {
            c = 0;
            s = t * frequency *                          // frequency
                Math.sin(tm * modulation - modPhase);    // modulation

            s = shape? shape>1? shape>2? shape>3?   // wave shape
              Math.sin((s%PI2)**3) :                // 4 noise
              Math.max(Math.min(Math.tan(s),1),-1): // 3 tan
              1-(2*s/PI2%2+2)%2:                    // 2 saw
              1-4*Math.abs(Math.round(s/PI2)-s/PI2):// 1 triangle
              Math.sin(s);                          // 0 sin
            s = sign(s)*(Math.abs(s)**shapeCurve);  // curve 0=square, 2=pointy

            s *= volume * zzfxV * (                      // envelope
                i<attack ? i/attack :                    // attack
                i<attack+sustain ? 1 :                   // sustain
                i<length-delay ?                         // post release
                1 - (i-attack-sustain)/release : 0);     // release
                
            s = delay ?                                  // delay
                s/2 + (delay > i ? 0 :
                (i<length-delay? 1 : (i-length)/delay) * // release delay 
                b[i-delay]/2) : s;
        }

        t += 1 + random(noise);                      // noise
        tm += 1 + random(noise);                     // modulation noise
        frequency += slide += deltaSlide;            // frequency slide

        if (j && ++j > pitchJumpTime)                // pitch jump
        {
            startFrequency += pitchJump;
            frequency += pitchJump;
            j = 0;
        };

        if (repeatTime && ++r > repeatTime)           // repeat
        {
            frequency = startFrequency;
            slide = startSlide;
            r = 1;
            j = j||1;
        }
    }

    buffer = zzfxX.createBuffer(1, b.length, sampleRate);
    buffer.getChannelData(0).set(b);
    source.buffer = buffer;
    source.connect(zzfxX.destination);
    source.start();
}
const zzfxX = new AudioContext;