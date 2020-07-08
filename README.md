# ZzFX - Zuper Zmall Zound Zynth

# [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX)
# [ZzFX Music](https://github.com/keithclark/ZzFXM)
# [ZzFX Sound Board Demo](https://codepen.io/KilledByAPixel/full/BaowKzv)

### ZzFX is a JavaScript sound effect engine and creation tool

- Sound effects can be generated or manually created using the web based sound designer.

- Just include ZzFX.min.js to load ZzFX, it does not need to be initialized.

- Or you can use ZzFX.micro.js a tiny (<1k) version that has only the ability to play sounds.

To play a sound in code, just call a simple function! Here are some examples...

```
zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]); // Heart
zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]); // Game Over
zzfx(...[1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]); // Piano
zzfx(...[,,129,.01,,.15,,,,,,,,5]); // Drum
```

### Here's the code for the ZzFXmicro, this all you need to play ZzFX sounds!

```
zzfxV=.3 // volume
zzfx=    // play sound
(t=1,a=.05,n=220,e=0,f=0,r=.1,h=0,o=1,M=0,s=0,z=0,i=0,u=0,c=0,x=0,d=0,X=0,b=1,m=0,l=44100,B=99+e*l,C=f*l,P=r*l,g=m*l,w=X*l,A=2*Math.PI,D=(t=>1+2*t*Math.random()-t),I=(t=>0<t?1:-1),S=B+g+C+P+w,j=(M*=500*A/l**2),k=(n*=D(a)*A/l),p=I(x)*A/4,q=0,v=0,y=0,E=0,F=0,G=0,H=1,J=[],K=zzfxX.createBufferSource(),L=zzfxX.createBuffer(1,S,l))=>{for(K.connect(zzfxX.destination);y<S;J[y++]=G)++F>100*d&&(F=0,G=q*n*Math.sin(v*x*A/l-p),G=I(G=h?1<h?2<h?3<h?Math.sin((G%A)**3):Math.max(Math.min(Math.tan(G),1),-1):1-(2*G/A%2+2)%2:1-4*Math.abs(Math.round(G/A)-G/A):Math.sin(G))*Math.abs(G)**o*t*.3*(y<B?y/B:y<B+g?1-(y-B)/g*(1-b):y<B+g+C?b:y<S-w?(S-y-w)/P*b:0),G=w?G/2+(w>y?0:(y<S-w?1:(y-S)/w)*J[y-w|0]/2):G),q+=D(c),v+=D(c),n+=M+=500*s*A/l**3,H&&++H>i*l&&(n+=z*A/l,k+=z*A/l,H=0),u&&++E>u*l&&(n=k,M=j,E=1,H=H||1);return L.getChannelData(0).set(J),K.buffer=L,K.start(),K};zzfxX=new AudioContext
```

![ZzFX Image](/screenshot.jpg)

## ZzFX Features

- Tiny synth engine with 19 controllable parameters.
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
