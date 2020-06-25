# ZzFX - Zuper Zmall Zound Zynth

# [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX)
# [ZzFX Sound Board Demo](https://codepen.io/KilledByAPixel/full/BaowKzv)

### ZzFX is a JavaScript sound effect engine and creation tool supported by most modern broswers.

- Sound effects can be generated or manually created using the web based sound effect creation tool.

- Just include ZzFX.min.js to load ZzFX, it does not need to be initialized.

- Or you can use ZzFX.micro.js a tiny (<1k) version that has only the ability to play sounds.

To play a sound in code, just call a simple function! Here are some examples...

```
zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]); // Heart
zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]); // Game Over
zzfx(...[,,539,,.04,.29,1,1.92,,,567,.02,.02,,,,.04]); // Twinkle
zzfx(...[,0,1600,.13,.52,.61,1,1.1,,,,,,.1,,.14]); // Phone Ring
zzfx(...[,,709,,,.07,,,,3.7,,,,3.6,,,.11]); // Echo Click
zzfx(...[1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]); // Piano
zzfx(...[,,129,.01,,.15,,,,,,,,5]); // Drum
```

### Here's the code for the ZzFXmicro, this all you need to play ZzFX sounds!

```
zzfxV=.3 // volume
zzfx=    // play sound
(t=1,a=.05,e=220,n=0,f=0,z=.1,r=0,h=1,s=0,M=0,o=0,x=0,i=0,u=0,c=0,d=0,X=0,b=1,l=0,m=44100,B=[],C=zzfxX.createBufferSource(),P)=>{n=99+n*m,f*=m,z*=m,l*=m,X*=m;for(let C=2*Math.PI,P=t=>1+2*t*Math.random()-t,V=t=>0<t?1:-1,g=n+l+f+z+X,w=s*=500*C/m**2,A=e*=P(a)*C/m,D=V(c)*C/4,I=0,S=0,j=0,k=1,p=0,q=0,v=0;j<g;B[j++]=v)++q>100*d&&(q=0,v=I*e*Math.sin(S*c*C/m-D),v=V(v=r?1<r?2<r?3<r?Math.sin((v%C)**3):Math.max(Math.min(Math.tan(v),1),-1):1-(2*v/C%2+2)%2:1-4*Math.abs(Math.round(v/C)-v/C):Math.sin(v))*Math.abs(v)**h,v*=t*zzfxV*(j<n?j/n:j<n+l?1-(j-n)/l*(1-b):j<n+l+f?b:j<g-X?(g-j-X)/z*b:0),v=X?v/2+(X>j?0:(j<g-X?1:(j-g)/X)*B[j-X|0]/2):v),I+=P(u),S+=P(u),e+=s+=500*M*C/m**3,k&&++k>x*m&&(e+=o*C/m,A+=o*C/m,k=0),i&&++p>i*m&&(e=A,s=w,p=1,k=k||1);return(P=zzfxX.createBuffer(1,n+l+f+z+X,m)).getChannelData(0).set(B),C.buffer=P,C.connect(zzfxX.destination),C.start(),C},zzfxX=new AudioContext
```

![ZzFX Image](/screenshot.jpg)

## ZzFX Features

- Tiny synth engine with 19 controllable parameters.
- Play sounds via code, no need for sound asset files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte.
- Can produce a massive variety of sound effect types.
- Sounds can be played with a short call. zzfx(...[,,,,.1,,,,9])
- Supports saving sounds as wav files for offline playback.
- Use ZZFX.GetNote to get frequencies on a musical scale.
- Both ZzFX and ZzFXMicro run in strict mode.
- No additional libraries or dependencies are required.
- Open source with MIT license, you can use this for anything!

## ZzFX UI Features

- Generates random sounds from presets.
- Sound list is saved automatically.
- Each parameter can be modified with constraints.
- Lock and mutate buttons for each parameter.
- Sound name can be changed for easier workflow.
- Shortens code for zzfx sound calls.
- Displays image of sound wave when played.
- Sounds can be download as a wave file.
- Sounds can be marked as favorites to prevent removal.
- Sounds can be loaded by pasting zzfx code for easy sharing.
- List of sounds can be exported and imported.
- Supports drag-and-drop of exported files into sound list.

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
