# ZzFX - Zuper Zmall Zound Zynth

# [ZzFX Sound Designer](https://zzfx.3d2k.com)
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
((t=1,a=.05,e=220,n=0,f=0,z=.1,h=0,M=1,r=0,x=0,o=0,s=0,i=0,u=0,c=0,d=0,X=0,b=1,m=0,g=2*Math.PI,l=44100,B=(t=>2*t*Math.random()-t),C=(t=>0<t?1:-1),V=(r*=500*g/l**2),w=(e*=(1+B(a))*g/l),A=C(c)*g/4,D=[],I=0,P=0,S=0,j=1,k=0,p=0,q=0,v,y,E,F=zzfxX.createBufferSource())=>{for(y=(n=99+n*l|0)+(m=m*l|0)+(f=f*l|0)+(z=z*l|0)+(X=X*l|0),x*=500*g/l**3,c*=g/l,o*=g/l,s*=l,i*=l;S<y;D[S++]=q)++p>100*d&&(p=0,q=I*e*Math.sin(P*c-A),q=C(q=h?1<h?2<h?3<h?Math.sin((q%g)**3):Math.max(Math.min(Math.tan(q),1),-1):1-(2*q/g%2+2)%2:1-4*Math.abs(Math.round(q/g)-q/g):Math.sin(q))*Math.abs(q)**M,q*=t*zzfxV*(S<n?S/n:S<n+m?1-(S-n)/m*(1-b):S<n+m+f?b:S<y-X?(y-S+z)/z*b:0),q=X?q/2+(X>S?0:(S<y-X?1:(S-y)/X)*D[S-X]/2):q),I+=1+B(u),P+=1+B(u),e+=r+=x,j&&++j>s&&(e+=o,w+=o,j=0),i&&++k>i&&(e=w,r=V,k=1,j=j||1);(E=zzfxX.createBuffer(1,D.length,l)).getChannelData(0).set(D),F.buffer=E,F.connect(zzfxX.destination),F.start()}),zzfxX=new AudioContext
```

![ZzFX Image](/screenshot.jpg)

## ZzFX Features

- Tiny synth engine with 17 controllable parameters.
- Play sounds via code, no need for sound asset files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte.
- Can produce a massive variety of sound effect types.
- Sounds can be played with a short call. zzfx(...[,,,,.1,,,,9])
- Use ZZFX.GetNote to get frequencies on a standard diatonic scale.
- Supports saving sounds as wav files for offline playback.
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

## [ZzFX Community Soundboard](https://codepen.io/KilledByAPixel/full/dyYVwGP)

- Just for fun I created a soundboard where everyone can have one sound.
- Send me a zzfx code and emoji to get your sound added!

![ZzFX Image](/favicon.png) 
