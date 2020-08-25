# ZzFX - Zuper Zmall Zound Zynth

# [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX)
# [ZzFX Music](https://keithclark.github.io/ZzFXM/)
# [ZzFX Sound Board Demo](https://codepen.io/KilledByAPixel/full/BaowKzv)

### ZzFX is a JavaScript sound effect engine and creation tool

- Sound effects can be generated or manually created using the web based sound designer.

- Just include ZzFX.min.js to load ZzFX, it does not need to be initialized.

- Or you can use ZzFX.micro.js a tiny (<1k) version that has only the ability to play sounds.

To play a sound in code, just call a simple function! Here are some examples...

```
zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]); // Game Over
zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]); // Heart
zzfx(...[1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]); // Piano
zzfx(...[,,129,.01,,.15,,,,,,,,5]); // Drum
```

### Here's the code for the ZzFXmicro, this all you need to play ZzFX sounds!

```
zzfxV=.3    // volume
zzfx=       // play sound
(E=1,k=.05,p=220,d=0,t=0,u=.1,q=0,F=1,v=0,G=0,y=0,H=0,g=0,z=0,A=0,I=0,c=0,w=1,l=0,B=0)=>{d=99+d*zzfxR;t*=zzfxR;u=99+u*zzfxR;l*=zzfxR;c*=zzfxR;g=g*zzfxR|0;let b=2*Math.PI,h=d+l+t+u+c|0,J=v*=500*b/zzfxR**2,Z=p*=(1+2*k*Math.random()-k)*b/zzfxR,K=(0<A?1:-1)*b/4,f=0,C=0,a=0,L=0,M=0,e=0,m=1,x=[],n,r=zzfxX.createBufferSource(),D=zzfxX.createBuffer(1,h,zzfxR);for(r.connect(zzfxX.destination);a<h;x[a++]=e)++M%(100*I|0)||(e=q?1<q?2<q?3<q?Math.sin((f%b)**3):Math.max(Math.min(Math.tan(f),1),-1):1-(2*f/b%2+2)%2:1-4*Math.abs(Math.round(f/b)-f/b):Math.sin(f),e=(0<e?1:-1)*Math.abs(e)**F*(g?1-B+B*Math.sin(2*Math.PI*a/g):1)*E*zzfxV*(a<d?a/d:a<d+l?1-(a-d)/l*(1-w):a<d+l+t?w:a<h-c?(h-a-c)/u*w:0),e=c?e/2+(c>a?0:(a<h-c?1:(a-h)/c)*x[a-c|0]/2):e),n=(p+=v+=500*G*b/zzfxR**3)*Math.sin(C*A*b/zzfxR-K),f+=n-n*z*(1-1E9*(Math.sin(a)+1)%2),C+=n-n*z*(1-1E9*(Math.sin(a)**2+1)%2),m&&++m>H*zzfxR&&(p+=y*b/zzfxR,Z+=y*b/zzfxR,m=0),!g||++L%g||(p=Z,v=J,m=m||1);D.getChannelData(0).set(x);r.buffer=D;r.start();return r};zzfxX=new(window.AudioContext||webkitAudioContext);zzfxR=44100
```

![ZzFX Image](/screenshot.jpg)

## ZzFX Features

- Tiny synth engine with 20 controllable parameters.
- Play sounds via code, no need for sound asset files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte uncompressed.
- Can produce a large variety of sound effect types.
- Sounds can be played with a short function call. zzfx(...[,,,,.1,,,,9])
- Both ZzFX and ZzFXMicro run in strict mode.
- No additional libraries or dependencies are required.
- Open source with MIT license, you can use this for anything!

## ZzFX Music

- [ZzFX now supports music via ZzFXM by Keith Clark!](https://github.com/keithclark/ZzFXM/)
- [ZzFXM Demo](https://keithclark.github.io/ZzFXM/)
- Both the songs and player are super tiny! 
- ZzFX also has the GetNote function that converts a musical note to a freqeuency.

## ZzFX UI Features

- Generates random sounds from presets.
- Sound list is automatically saved.
- Each parameter can be modified with constraints.
- Lock and mutate buttons for each parameter.
- Sounds can be renamed.
- Shortens code for zzfx sound calls.
- Displays image of sound wave when played.
- Sounds can be marked as favorites to prevent removal.
- Sounds can be loaded by pasting zzfx code for easy sharing.
- List of sounds can be exported and imported.
- Supports drag-and-drop of exported files into sound list.
- Supports saving sounds as wav files for offline playback.

## Games Using ZzFX

- [Bogus Roads](https://www.newgrounds.com/portal/view/747570)
- [The Wandering Wraith](https://js13kgames.com/entries/the-wandering-wraith)
- [Bounce Back](https://js13kgames.com/entries/bounce-back)
- [Egg Time Rewind](https://killedbyapixel.itch.io/egg-time)
- [Hue Jumper](https://killedbyapixel.itch.io/hue-jumper)
- [Bubba's Back Room](https://js13kgames.com/entries/bubbas-back-room)
- [Backstabber Hero](https://js13kgames.com/entries/backstabber-hero)
- [Spendotron: 2019](https://killedbyapixel.itch.io/currency-wars)
- [Dioretsa](https://js13kgames.com/entries/20461-dioretsa)
- [Back 2 Back](https://js13kgames.com/entries/back-2-back)
- [Quick Wins](https://js13kgames.com/entries/quick-wins)
- [Back Relax](http://js13kgames.com/entries/back-relax)
- [Back To The Island](https://js13kgames.com/entries/back-to-the-island)
- [Backspace It](http://js13kgames.com/entries/backspace-it)
- [Back To The Stars](https://js13kgames.com/entries/back-to-the-stars)
- [Can't Get Back](https://js13kgames.com/entries/cant-get-back)
- [Letchworth Village](https://js13kgames.com/entries/letchworth-village)
- [Noegnud](https://js13kgames.com/entries/noegnud)
- [Sausage Redemption](https://gogoprog.itch.io/sausage-redemption)
- [Marshmallow Sky](https://github.com/baturinsky/marshmallow-sky) 

![ZzFX Image](/favicon.png) 
