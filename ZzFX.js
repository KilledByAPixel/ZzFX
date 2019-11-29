/*
    ZzFX - Zuper Zmall Zeeded Zound Zynth
    By Frank Force 2019
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

"use strict"; // strict mode

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name ZzFx.min.js
// @js_externs ZZFX, ZZFXLib, ZZFXLib.z, ZZFXLib.Z, ZZFXLib.Generate, ZZFXLib.Note
// @js_externs ZZFXLib.R, ZZFXLib.x, ZZFXLib.r, ZZFXLib.buffer, ZZFXLib.volume, ZZFXLib.randomness
// ==/ClosureCompiler==
class ZZFXLib
{
    constructor()
    {
        this.x = new AudioContext;      // shared audio context
        this.r = Date.now();            // starting value for random numbers
        this.buffer = 0;                // last sound buffer
        this.volume = .5;               // master volume scale
        this.randomness = .1;           // default frequency randomness
    }

    // play seeded sound with overrides applied
    z(seed, soundOverrides) 
    {
        // generate sound from seed
        let sound = this.Generate(seed);
        
        // copy overrides to sound
        for(let setting in soundOverrides)
            sound[setting] = soundOverrides[setting];
    
        // play sound
        return this.Z
        (
            sound.volume, 
            sound.randomness,
            sound.frequency, 
            sound.length,
            sound.attack,
            sound.slide, 
            sound.noise,
            sound.modulation,
            sound.modulationPhase
        );
    }
    
    // play sound with full parameter control
    Z
    (
        volume, 
        randomness,
        frequency,
        length=1,
        attack=.1,
        slide=0, 
        noise=0,
        modulation=0,
        modulationPhase=0
    )
    {
        // normalize parameters
        const random = r=>r*(Math.random()*2-1);
        const sampleRate = 44100;
        const PI2 = Math.PI*2;
        volume *= this.volume;
        frequency *= PI2 / sampleRate;
        frequency *= 1 + random(randomness);
        slide *= PI2 * 500 / sampleRate**2;
        length = length>0? (length>10?10:length) * sampleRate | 0 : 1;
        attack = attack*length | 0;
        modulation *= PI2 / sampleRate;
        modulationPhase *= PI2/2;
         
        // generate waveform
        let b = [], f = 0, fm = 0;
        for(let F = 0; F < length; ++F)
        {
            b[F] = volume *                                    // volume
                Math.cos(f * frequency *                       // frequency
                Math.cos(fm * modulation + modulationPhase)) * // modulation
                (F < attack ? F / attack:                      // attack
                1 - (F - attack)/(length - attack));           // decay
            f += 1+random(noise);                              // noise
            fm += 1+random(noise);                             // modulation noise
            frequency += slide;                                // frequency slide
        }
        
        // play sound
        this.buffer = b;
        let B = this.x.createBuffer(1, b.length, sampleRate);
        let S = this.x.createBufferSource();
        B.getChannelData(0).set(b);
        S.buffer = B;
        S.connect(this.x.destination);
        S.start();
        return S;
    }
    
    // generate sound from seed
    Generate(seed)
    {
        let rSave = this.r;         // save the seed
        this.r = seed;              // set our seed
        for(let i=9;i--;)this.R();  // warm it up
        
        // generate parameters
        let sound = 
        {
            seed:               seed,
            volume:             1,
            randomness:         seed?this.randomness:0,
            frequency:          seed?this.R()**2*2e3|0:220,
            slide:              seed?(this.R()**3*10).toFixed(1):0,
            length:             seed?(.1+this.R()).toFixed(1):1,
            attack:             seed?(this.R()).toFixed(2):.1,
            noise:              seed?(this.R()**3*5).toFixed(1):0,
            modulation:         seed?(this.R()**5*99).toFixed(1):0,
            modulationPhase:    seed?(this.R()).toFixed(2):0,
        };
        
        this.r = rSave;             // restore rand seed
        return sound;
    }
    
    // get frequency of a musical note
    Note(rootNoteFrequency, semitoneOffset)
    {
        return rootNoteFrequency*2**(semitoneOffset/12);
    }
    
    // random seeded float
    R()
    { 
        this.r^=this.r<<13
        this.r^=this.r>>7
        this.r^=this.r<<17
        return Math.abs(this.r)%1e9/1e9;
    }
}

let ZZFX = new ZZFXLib;

//////////////////////////////////////////////////////////////////////////////////////

// ZZFXmicro - lightweight version with just a Z function to play sounds

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name ZzFx.micro.js
// @js_externs zzfx, zzfx_x, zzfx_v
// ==/ClosureCompiler==
let zzfx_v = .5;               // volume
let zzfx_x = new AudioContext; // audio context
function zzfx                  // play a sound
(
    volume, 
    randomness,
    frequency, 
    length=1,
    attack=.1,
    slide=0,
    noise=0,
    modulation=0,
    modulationPhase=0
)
{   
    let random = r=>r*(Math.random()*2-1);
    let sampleRate = 44100;
    let PI2 = Math.PI*2;
    frequency *= PI2 / sampleRate;
    frequency *= 1 + random(randomness);
    slide *= PI2 * 500 / sampleRate**2;
    length = length * sampleRate | 0;
    attack = attack * length | 0;
    modulation *= PI2 / sampleRate;
    modulationPhase *= PI2 / 2;

    // generate the waveform
    let b = [], f = 0, fm = 0;
    for(let F = 0; F < length; ++F)
    {
        b[F] = volume * zzfx_v *                           // volume
            Math.cos(f * frequency *                       // frequency
            Math.cos(fm * modulation + modulationPhase)) * // modulation
            (F < attack ? F / attack:                      // attack
            1 - (F - attack)/(length - attack));           // decay
        f += 1+random(noise);                              // noise
        fm += 1+random(noise);                             // modulation noise
        frequency += slide;                                // frequency slide
    }

    // play the sound
    let B = zzfx_x.createBuffer(1, length, sampleRate);
    let S = zzfx_x.createBufferSource();
    B.getChannelData(0).set(b);
    S.buffer = B;
    S.connect(zzfx_x.destination);
    S.start();
    return S;
}