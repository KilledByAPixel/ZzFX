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

// ==ClosureCompiler==
// @compilation_level ADVANCED_OPTIMIZATIONS
// @output_file_name ZzFx.min.js
// @js_externs ZZFX, ZZFXLib, ZZFXLib.z, ZZFXLib.Z, ZZFXLib.G, ZZFXLib.M
// @js_externs ZZFXLib.R, ZZFXLib.x, ZZFXLib.r, ZZFXLib.b, ZZFXLib.volume, ZZFXLib.randomness
// ==/ClosureCompiler==
class ZZFXLib
{
    constructor()
    {
        this.x = new AudioContext;      // shared audio context (prevents running out)
        this.r = Date.now();            // starting value for random numbers
        this.b = 0;                     // last sound buffer
        this.volume = .5;               // master volume scale
        this.randomness = .1;           // default frequency randomness
    }

    // play a seeded sound with overrides applied
    z(sound) 
    {
        if (typeof sound == 'number')
        {
            // play seed
            let seededSound = {};
            seededSound['seed']=sound;
            this.z(seededSound);
            return;
        }
    
        // build the sound
        let soundBuild = sound;
        if (sound['seed'] !== undefined)
        {
            soundBuild = this.G(sound['seed']);
            for(let setting in sound)
                soundBuild[setting] = sound[setting];
        }
    
        // copy default settings
        let s = this.G(0);
        for (let setting in soundBuild)
            s[setting] = soundBuild[setting];
    
        return this.Z
        (
            s['volume'], 
            s['randomness'],
            s['frequency'], 
            s['frequencySlide'], 
            s['length'],
            s['attack'],
            s['noise'],
            s['modulation'],
            s['modulationPhase']
        );
    }
    
    // play a sound with full parameter control
    Z
    (
        volume, 
        randomness,
        frequency, 
        frequencySlide, 
        length,
        attack,
        noise,
        modulation,
        modulationPhase
    )
    {
        let sampleRate = 44100;
        volume *= this.volume;
        frequency *= 2*Math.PI / sampleRate;
        frequency *= (1 + randomness*(this.R()*2-1));
        frequencySlide *= Math.PI * 1e3 / sampleRate**2;
        length = length>0? (length>10?10:length) * sampleRate | 0 : 1;
        attack *= length | 0;
        modulation *= 2*Math.PI / sampleRate;
        modulationPhase *= Math.PI;
         
        // generate the waveform
        let b = [], f = 0, fm = 0;
        for(let F = 0; F < length; ++F)
        {
            b[F] = volume *                                    // volume
                Math.cos(f * frequency *                       // frequency
                Math.cos(fm * modulation + modulationPhase)) * // modulation
                (F < attack ? F / attack:                      // attack
                1 - (F - attack)/(length - attack));           // decay
            f += 1+noise*(this.R()*2-1);                       // noise
            fm += 1+noise*(this.R()*2-1);                      // modulation noise
            frequency += frequencySlide;                       // frequency slide
        }
        
        // play the sound
        this.b = b;
        let B = this.x.createBuffer(1, b.length, sampleRate);
        let S = this.x.createBufferSource();
        B.getChannelData(0).set(b);
        S.buffer = B;
        S.connect(this.x.destination);
        S.start();
        return S;
    }
    
    // generate a sound from seed
    G(seed)
    {
        let rSave = this.r;         // save the seed
        this.r = seed;              // set our seed
        for(let i=9;i--;)this.R();  // warm it up
        
        // generate parameters
        let sound = {};
        sound['seed']               = seed;
        sound['volume']             = 1;
        sound['randomness']         = seed?this.randomness:0;
        sound['frequency']          = seed?this.R()**2*2e3|0:220;
        sound['frequencySlide']     = seed?parseFloat(((this.R()**3)*10).toFixed(1)):0;
        sound['length']             = seed?parseFloat((.1+this.R()).toFixed(1)):1;
        sound['attack']             = seed?parseFloat((this.R()).toFixed(2)):.1;
        sound['noise']              = seed?parseFloat((this.R()**2*5).toFixed(1)):0; 
        sound['modulation']         = seed?parseFloat((this.R()**3*99).toFixed(1)):0; 
        sound['modulationPhase']    = seed?parseFloat((this.R()).toFixed(2)):0;
        
        this.r = rSave;             // restore rand seed
        return sound;
    }
    
    // get the frequency of a musical note
    M(rootNoteFrequency, semitoneOffset)
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
zzfx_v = .5;               // volume
zzfx_x = new AudioContext; // audio context
zzfx = function            // play a sound
(
    volume, 
    randomness,
    frequency, 
    frequencySlide, 
    length,
    attack,
    noise,
    modulation,
    modulationPhase
)
{
    let sampleRate = 44100;
    frequency *= 2*Math.PI / sampleRate;
    frequency *= (1 + randomness*(Math.random()*2-1));
    frequencySlide *= Math.PI * 1e3 / sampleRate**2;
    length = length>0? (length>10?10:length) * sampleRate | 0 : 1;
    attack *= length | 0;
    modulation *= 2*Math.PI / sampleRate;
    modulationPhase *= Math.PI;

    // generate the waveform
    let b = [], f = 0, fm = 0;
    for(let F = 0; F < length; ++F)
    {
        b[F] = volume * zzfx_v *                           // volume
            Math.cos(f * frequency *                       // frequency
            Math.cos(fm * modulation + modulationPhase)) * // modulation
            (F < attack ? F / attack:                      // attack
            1 - (F - attack)/(length - attack));           // decay
        f += 1+noise*(Math.random()*2-1);                  // noise
        fm += 1+noise*(Math.random()*2-1);                 // modulation noise
        frequency += frequencySlide;                       // frequency slide
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