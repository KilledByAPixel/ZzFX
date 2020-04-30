/*

ZzFX - Zuper Zmall Zound Zynth
By Frank Force 2019

ZzFX Features

- Tiny synth engine with 18 controllable parameters.
- Play sounds via code, no need for wave files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte!
- Can produce a huge variety of sound effect types.
- Sounds can be played with a short function call.
- Use ZZFX.GetNote to make music, ex: ZZFX.GetNote(440, 7) // 7 semitons above A4
- Sounds can be saved out as wav files for offline playback.
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
// @js_externs zzfx, _ZZFX.samples, _ZZFX.volume, _ZZFX.randomness, ZZFX, _ZZFX, _ZZFX.Play, _ZZFX.PlaySamples, _ZZFX.BuildSamples, _ZZFX.BuildRandomSound, _ZZFX.BuildSound, _ZZFX.GetNote, _ZZFX.SoundToArray, _ZZFX.CreateAudioContext
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
        modPhase,
        bitCrush,
        delay,
        volumeScale = 1
    )
    {
        // init parameters
        const PI2 = Math.PI*2;
        const sampleRate = this.sampleRate;
        const random = r => r*(Math.random()*2-1);
        const startSlide = slide *= PI2 * 500 / sampleRate**2;
        let startFrequency = frequency *= 
            (1 + random(randomness)) * PI2 / sampleRate;
        attack = 50 + attack*sampleRate | 0;
        sustain = sustain*sampleRate | 0;
        release = release*sampleRate | 0;
        delay = delay*sampleRate / 1e3 | 0;
        deltaSlide *= PI2 * 500 / sampleRate**3;
        modulation *= PI2 / sampleRate;
        pitchJump *= PI2 / sampleRate;
        pitchJumpTime = pitchJumpTime*sampleRate | 0;
        repeatTime = repeatTime*sampleRate | 0;
        modPhase *= PI2;
        const length = Math.max(1, Math.min(attack + sustain + release, sampleRate * 10));
        
        // generate waveform
        let b=[], t=0, tm=0, i=0, j=1, r=0, s, e;
        for(; i < length;b[i++] = s)
        {
            s = t * frequency *                          // frequency
                Math.cos(tm * modulation + modPhase);    // modulation

            s = shape ? shape>1 ? shape>2 ? shape>3 ?    // wave shape
                 Math.sign(Math.cos((s%PI2)**3)) :       // 4 noise
                 Math.max(Math.min(Math.tan(s),1),-1) :  // 3 tan
                 1-(2*s/PI2%2+2)%2:                      // 2 saw
                 1-4*Math.abs(Math.round(s/PI2)-s/PI2) : // 1 triangle
                 Math.cos(s);                            // 0 sin
            s = Math.sign(s)*(Math.abs(s)**shapeCurve);  // shape curve (0=square)
            
            e =                                          // envelope
                i<attack ? i/attack :                    // attack
                i<attack+sustain ? 1 :                   // sustain
                1 - (i-attack-sustain)/release;          // release
            s *= e * volume * volumeScale;               // envelope
            s = bitCrush?(s/bitCrush*9|0)*bitCrush/9:s;  // bit crush
            s = delay ?                                  // delay
                s/2 + (delay > i ? 0 :
                (i<attack+sustain?1:e)*b[i-delay]/2) :   // release delay  
                s;
            
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
        const Fixed =(v,l=1)=>
        {
            const f = v.toFixed(l);
            return !parseFloat(f) ? '0': f;
        }
        const sound = this.BuildSound
        (
           1,                                        // volume
           .05,                                      // randomness
           R()**2*2e3|0,                             // frequency
           Fixed(.01 + R()**2,2),                    // attack
           Fixed(R()**2,2),                          // sustain
           Fixed(.01 + R()**2,2),                    // release
           R()*5|0,                                  // shape
           R()<.2?1: Fixed(R()*2),                   // shape curve
           R()<.5?0: Fixed(R()**3*10*(R()<.5?-1:1)), // slide
           R()<.5?0: Fixed(R()**3*10*(R()<.5?-1:1)), // deltaSlide
           0,                                        // pitchJump
           0,                                        // pitchJumpTime
           0,                                        // repeatTime
           R()<.5?0: Fixed(R()**3*5),                // noise
           R()<.8?0: Fixed(R()**4*99),               // modulation
           0,                                        // modPhase
           R()<.5?0: Fixed(R()**2,2),                // bitCrush
           R()<.5?0: Fixed(R()**2*3,2),              // delay
        );
        
        const length = parseFloat(sound['attack']) 
            + parseFloat(sound['sustain']) 
            + parseFloat(sound['release']);
        
        if (parseFloat(sound['smodulation']))
            sound['smodPhase'] = Fixed(R(),2);               // modPhase
            
        if (R() < .3)
        {
            sound['pitchJump'] = R()**2*1e3*(R()<.5?-1:1)|0;// pitchJump
            sound['pitchJumpTime'] = Fixed(R()*length,2);   // pitchJumpTime  
        }
        
        if (R() < .3)
            sound['repeatTime'] = Fixed(R()*length,2);      // repeatTime
        
        return sound;
    }
    
    // build sound object
    BuildSound
    (
        volume = 1, 
        randomness = .05,
        frequency = 220,
        attack = .1,
        sustain = .1,
        release = .2,
        shape = 0,
        shapeCurve = 1,
        slide = 0, 
        deltaSlide = 0, 
        pitchJump = 0, 
        pitchJumpTime = 0, 
        repeatTime = 0, 
        noise = 0,
        modulation = 0,
        modPhase = 0,
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
            'modPhase':     modPhase,
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

// shortcut to play sounds
function zzfx() { ZZFX.Play(...arguments); }

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
    attack = .1,
    sustain = .1,
    release = .2,
    shape = 0,
    shapeCurve = 1,
    slide = 0, 
    deltaSlide = 0, 
    pitchJump = 0, 
    pitchJumpTime = 0, 
    repeatTime = 0, 
    noise = 0,
    modulation = 0,
    modPhase = 0,
    bitCrush = 0,
    delay = 0,

    // locals
    PI2 = Math.PI*2,
    sampleRate = 44100,
    random = r => r*2*Math.random()-r,
    startSlide = slide *= PI2 * 500 / sampleRate**2,
    startFrequency = frequency *= 
        (1 + random(randomness)) * PI2 / sampleRate,
    length,
    b=[], t=0, tm=0, i=0, j=1, r=0, s, e,
    buffer,
    source = zzfxX.createBufferSource()
) =>
{
    // init parameters
    attack = 50 + attack*sampleRate | 0;
    sustain = sustain*sampleRate | 0;
    release = release*sampleRate | 0;
    delay = delay*sampleRate / 1e3 | 0;
    deltaSlide *= PI2 * 500 / sampleRate**3;
    length = attack + sustain + release;
    modulation *= PI2 / sampleRate;
    pitchJump *= PI2 / sampleRate;
    pitchJumpTime = pitchJumpTime*sampleRate | 0;
    repeatTime = repeatTime*sampleRate | 0;
    modPhase *= PI2;

    // generate waveform
    for(; i < length;b[i++] = s)
    {
        s = t * frequency *                          // frequency
            Math.cos(tm * modulation + modPhase);    // modulation

        s = shape ? shape>1 ? shape>2 ? shape>3 ?    // wave shape
             Math.sign(Math.cos((s%PI2)**3)) :       // 4 noise
             Math.max(Math.min(Math.tan(s),1),-1) :  // 3 tan
             1-(2*s/PI2%2+2)%2 :                     // 2 saw
             1-4*Math.abs(Math.round(s/PI2)-s/PI2) : // 1 triangle
             Math.cos(s);                            // 0 sin
        s = Math.sign(s)*(Math.abs(s)**shapeCurve);  // shape curve (0=square)

        e =                                          // envelope
            i<attack ? i/attack :                    // attack
            i<attack+sustain ? 1 :                   // sustain
            1 - (i-attack-sustain)/release;          // release
        s *= e * volume * zzfxV;                     // envelope
        s = bitCrush?(s/bitCrush*9|0)*bitCrush/9:s;  // bit crush
        s = delay ?                                  // delay
            s/2 + (delay > i ? 0 :
            (i<attack+sustain?1:e)*b[i-delay]/2) :   // release delay  
            s;

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

// fix compatibility issues with old web audio (optional)
//const zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.Z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.Z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s.stop=s.stop||(t=>zzfxX.noteOff(t)),s)