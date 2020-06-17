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
(t=1,a=.05,n=220,e=0,f=0,z=.1,h=0,M=1,r=0,o=0,s=0,x=0,i=0,c=0,u=0,d=0,X=0,b=1,m=0,B=2*Math.PI,C=44100,P=t=>2*t*Math.random()-t,V=t=>0<t?1:-1,g=r*=500*B/C**2,l=V(u)*B/4,w=n*=(1+P(a))*B/C,A=99+e*C|0,D=m*C|0,I=f*C|0,S=z*C|0,j=X*C|0,k=500*o*B/C**3,p=u*B/C,q=s*B/C,v=x*C,y=i*C,E=A+D+I+S+j,F=[],G=0,H=0,J=0,K=1,L=0,N=0,O=0,Q,R=zzfxX.createBufferSource(),T=zzfxX.createBuffer(1,E,C))=>{for(;J<E;F[J++]=O)++N>100*d&&(N=0,O=G*n*Math.sin(H*p-l),O=V(O=h?1<h?2<h?3<h?Math.sin((O%B)**3):Math.max(Math.min(Math.tan(O),1),-1):1-(2*O/B%2+2)%2:1-4*Math.abs(Math.round(O/B)-O/B):Math.sin(O))*Math.abs(O)**M,O*=t*zzfxV*(J<A?J/A:J<A+D?1-(J-A)/D*(1-b):J<A+D+I?b:J<E-j?(E-J-j)/S*b:0),O=j?O/2+(j>J?0:(J<E-j?1:(J-E)/j)*F[J-j]/2):O),G+=1+P(c),H+=1+P(c),n+=r+=k,K&&++K>v&&(n+=q,w+=q,K=0),y&&++L>y&&(n=w,r=g,L=1,K=K||1);T.getChannelData(0).set(F),R.buffer=T,R.connect(zzfxX.destination),R.start()},zzfxX=new AudioContext
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
