/*

ZzFX - Zuper Zmall Zound Zynth
By Frank Force 2019

ZzFX Features

- Tiny synth engine with 17 controllable parameters.
- Play sounds via code, no need for sound assed files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte.
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

class _ZZFX
{

constructor()
{
    this.x = new (window.AudioContext || webkitAudioContext); // shared audio context
    this.volume = .3;                   // master volume scale
    this.sampleRate = 44100;            // sample rate for audio
    this.samples = 0;                   // last played samples
}

Play(sound)
{
    // check if sound object was passed in
    const params = sound && typeof sound == 'object' ? 
        this.SoundToArray(sound) : arguments;

    // build samples and start sound
    const samples = this.BuildSamples(...params);
    return this.PlaySamples(samples);
}

PlaySamples(samples)
{
    // play an array of audio samples
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
    sustainVolume = 1,
    decay = 0
)
{
    // init parameters
    let PI2 = Math.PI*2,
    sampleRate = this.sampleRate,
    sign = v => v>0?1:-1,
    startSlide = slide *= 500 * PI2 / sampleRate**2,
    modPhase = sign(modulation) * PI2/4,
    startFrequency = frequency *= (1 + randomness*2*Math.random() - randomness) 
        * PI2 / sampleRate;
        
    // scale by sample rate
    attack = 99 + attack * sampleRate; // soften attack
    decay = decay * sampleRate;
    sustain = sustain * sampleRate;
    release = release * sampleRate;
    delay = delay * sampleRate;
    deltaSlide *= 500 * PI2 / sampleRate**3;
    modulation *= PI2 / sampleRate;
    pitchJump *= PI2 / sampleRate;
    pitchJumpTime *= sampleRate;
    repeatTime *= sampleRate;
    const length = attack + decay + sustain + release + delay;

    // generate waveform
    let b=[], t=0, tm=0, i=0, j=1, r=0, c=0, s=0;
    for(; i < length; b[i++] = s)
    {
        if (++c>bitCrush*100)                            // bit crush
        {
            c = 0;                                       // reset bit crush
            s = t * frequency *                          // frequency
                Math.sin(tm * modulation - modPhase);    // modulation

            s = shape? shape>1? shape>2? shape>3?        // wave shape
                Math.sin((s%PI2)**3) :                   // 4 noise
                Math.max(Math.min(Math.tan(s),1),-1):    // 3 tan
                1-(2*s/PI2%2+2)%2:                       // 2 saw
                1-4*Math.abs(Math.round(s/PI2)-s/PI2):   // 1 triangle
                Math.sin(s);                             // 0 sin
            s = sign(s)*(Math.abs(s)**shapeCurve);       // curve 0=square, 2=pointy

            s *= volume * this.volume * (                // envelope
                i < attack ? i/attack :                  // attack
                i < attack + decay ?                     // decay
                1-((i-attack)/decay)*(1-sustainVolume) : // decay falloff
                i < attack  + decay + sustain ?          // sustain
                sustainVolume :                          // sustain volume
                i < length - delay ?                     // release
                (length - i - delay)/release *           // release falloff
                sustainVolume :                          // release volume
                0);                                      // post release

            s = delay ? s/2 + (delay > i ? 0 :           // delay
                (i<length-delay? 1 : (i-length)/delay) * // release delay 
                b[i-delay|0]/2) : s;                     // sample delay
        }

        t += 1 - noise + (Math.sin(i)+1)*1e9%2*noise;     // noise
        tm += 1 - noise + (Math.sin(i)**2+1)*1e9%2*noise; // modulation noise
        frequency += slide += deltaSlide;                 // frequency slide

        if (j && ++j > pitchJumpTime)                // pitch jump
        {
            frequency += pitchJump;                  // apply pitch jump
            startFrequency += pitchJump;             // also apply to start
            j = 0;                                   // reset pitch jump time
        }

        if (repeatTime && ++r > repeatTime)           // repeat
        {
            frequency = startFrequency;               // reset frequency
            slide = startSlide;                       // reset slide
            r = 1;                                    // reset repeat time
            j = j || 1;                               // reset pitch jump time
        }
    }

    return b;
}

BuildRandomSound(lengthScale=1, volume=1, randomness=.05)
{
    // generate a random sound
    const R=()=>Math.random(), C=()=>R()<.5?R():0, S=()=>C()?1:-1,

    // randomize sound length
    attack  = R()**3/4*lengthScale,
    decay   = R()**3/4*lengthScale,
    sustain = R()**3/4*lengthScale,
    release = R()**3/4*lengthScale,
    length  = attack + decay + sustain + release;

    // create random sound
    return this.BuildSound
    (
       volume,           // volume
       randomness,       // randomness
       R()**2*2e3,       // frequency
       attack,           // attack
       sustain,          // sustain
       release,          // release
       R()*5|0,          // shape
       R()**2*3,         // shapeCurve
       C()**3*99*S(),    // slide
       C()**3*99*S(),    // deltaSlide
       C()**2*1e3*S(),   // pitchJump
       R()**2 * length,  // pitchJumpTime
       C() * length,     // repeatTime
       C()**4,           // noise
       C()**3*9*S(),     // modulation
       C()**4,           // bitCrush
       C()**3/2,         // delay
       1 - C(),          // sustain volume
       decay             // decay
    );
}

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
    delay = 0,
    sustainVolume = 1,
    decay = 0
)
{
    // build sound object
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
        'delay':        delay,
        'sustainVolume':sustainVolume,
        'decay':        decay
    };

    return sound;
}

GetNote(semitoneOffset=0, rootNoteFrequency=440)
{
    // get frequency of a musical note on a diatonic scale
    return rootNoteFrequency * 2**(semitoneOffset/12);
}

SoundToArray(sound)
{
    // convert sound parameters object to array
    // use default sound for keys and order
    const defaultSound = this.BuildSound();
    const array = [];
    for(const key in defaultSound)
        array.push(sound[key]);
    return array;
}

} // class _ZZFX

const ZZFX = new _ZZFX;
function zzfx() { return ZZFX.Play(...arguments) }

///////////////////////////////////////////////////////////////////////////////

// ZzFXMicro - super tiny version with only a function to play sounds

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name zzfx.micro.js
// @js_externs zzfxP, zzfxV, zzfxX
// @language_out ECMASCRIPT_2019
// ==/ClosureCompiler==

let zzfxV = .3;   // volume
const zzfxP =     // play a sound
(
    // parameters
    volume = 1, randomness = .05, frequency = 220, attackIn = 0, sustainIn = 0, releaseIn = .1, shape = 0, shapeCurve = 1, slide = 0, deltaSlide = 0, pitchJump = 0, pitchJumpTime = 0, repeatTime = 0, noise = 0, modulation = 0, bitCrush = 0, delayIn = 0, sustainVolume = 1, decayIn = 0, sampleRate = 44100,
    
    // init parameters and helper functions
    attack = 99 + attackIn * sampleRate, // soften attack
    sustain = sustainIn * sampleRate,
    release = releaseIn * sampleRate,
    decay = decayIn * sampleRate,
    delay = delayIn * sampleRate,
    PI2 = Math.PI*2,
    sign =v=> v>0? 1 : -1,
    length = attack + decay + sustain + release + delay,
    startSlide = slide *= 500 * PI2 / sampleRate**2,
    startFrequency = frequency *= (1 + randomness*2*Math.random() - randomness) 
        * PI2 / sampleRate,
    modPhase = sign(modulation) * PI2/4,
    t=0, tm=0, i=0, r=0, c=0, s=0, j=1, b = [],
    source = zzfxX.createBufferSource(), 
    buffer = zzfxX.createBuffer(1, length, sampleRate)
)=>
{
    // loop and generate waveform
    for(source.connect(zzfxX.destination); i < length; b[i++] = s)
    {
        if (++c>bitCrush*100)                            // bit crush
        {
            c = 0;                                       // reset bit crush
            s = t * frequency *                          // frequency
                Math.sin(tm * modulation * PI2 / sampleRate - modPhase); // modulation

            s = shape? shape>1? shape>2? shape>3?        // wave shape
                Math.sin((s%PI2)**3) :                   // 4 noise
                Math.max(Math.min(Math.tan(s), 1), -1):  // 3 tan
                1-(2*s/PI2%2+2)%2:                       // 2 saw
                1-4*Math.abs(Math.round(s/PI2)-s/PI2):   // 1 triangle
                Math.sin(s);                             // 0 siny

            s = sign(s) * (Math.abs(s)**shapeCurve) *       // curve 0=square
                volume * zzfxV * (                          // envelope
                    i < attack ? i/attack :                 // attack
                    i < attack + decay ?                    // decay
                    1-((i-attack)/decay)*(1-sustainVolume) :// decay falloff
                    i < attack + decay + sustain ?          // sustain
                    sustainVolume :                         // sustain volume
                    i < length - delay ?                    // release
                    (length - i - delay)/release *          // release falloff
                    sustainVolume :                         // release volume
                0);                                         // post release

            s = delay ? s/2 + (delay > i ? 0 :           // delay
                (i<length-delay? 1 : (i-length)/delay) * // release delay 
                b[i - delay|0]/2) : s;                   // sample delay
        }

        t += 1 - noise + (Math.sin(i)+1)*1e9%2*noise;     // noise
        tm += 1 - noise + (Math.sin(i)**2+1)*1e9%2*noise; // modulation noise
        frequency += slide += deltaSlide             // frequency slide
            * 500 * PI2 / sampleRate**3;             // apply sample rate

        if (j && ++j > pitchJumpTime * sampleRate)   // pitch jump
        {
            frequency += pitchJump                   // apply pitch jump
                * PI2 / sampleRate;                  // apply sample rate
            startFrequency += pitchJump              // also apply to start
                * PI2 / sampleRate;                  // apply sample rate
            j = 0;                                   // reset pitch jump time
        }

        if (repeatTime && ++r > repeatTime*sampleRate)// repeat
        {
            frequency = startFrequency;               // reset frequency
            slide = startSlide;                       // reset slide
            r = 1;                                    // reset repeat time
            j = j || 1;                               // reset pitch jump time
        }
    }

    // create buffer and set source
    buffer.getChannelData(0).set(b);
    source.buffer = buffer;
    source.start();
    return source;
}
const zzfxX = new (window.AudioContext||webkitAudioContext);