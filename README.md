# ZzFX - Zuper Zmall Zound Zynth

ZzFX is a tiny sound generator designed to produce a wide variety of sound effects with minimal code overhead. It's perfect for games, prototypes, and any web application that needs sound without the bulk of traditional sound files.

# [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX) - [Soundboard Demo](https://codepen.io/KilledByAPixel/full/BaowKzv)

![ZzFX Image](/screenshot.png)

## 🌟 Features

- Compact: The micro version is under 1 kilobyte uncompressed.
- Versatile: 20 controllable parameters for diverse sound effects.
- No Dependencies: Standalone with no external libraries.
- Cross-Browser: Compatible with nearly all web browsers.
- Open Source: MIT licensed, use it anywhere!

## 🔊 Why Use ZzFX?

- Code-Driven Sound: Add or change sound effects with just one line of code.
- Lightweight: No sound asset files mean faster download times.
- Prototyping: Ideal for placeholder sound effects.
- Game Jams: Minimal overhead for size-limited competitions like [JS13K](https://js13kgames.com/).
- Not Just for Games: Enhance any website with sound.

## 🚀 How to Use

* Download from github or use `npm install zzfx`
* Import ZZFX as a module with using `import {ZZFX, zzfx} from './ZzFX.js'`
* Or paste the code from [ZzFXMicro.min.js](https://github.com/KilledByAPixel/ZzFX/blob/master/ZzFXMicro.min.js)
* To play a sound just call zzfx(), something like `zzfx(...[,,,,.1,,,,9])`
* Use [the ZzFX sound designer web app](https://killedbyapixel.github.io/ZzFX) to craft new sounds.

Sample sounds...

```javascript
zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]); // Game Over
zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]); // Heart
zzfx(...[1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]); // Piano
zzfx(...[,,129,.01,,.15,,,,,,,,5]); // Drum
```

## 🎶 [ZzFX Music](https://keithclark.github.io/ZzFXM/)

- [ZzFX now supports music via ZzFXM by Keith Clark!](https://keithclark.github.io/ZzFXM/)
- Super tiny player and songs.
- Compatible with [NoteCraft](https://killedbyapixel.github.io/NoteCraft/) exports.

## 🛠️ ZzFX UI Features

- Random Sound Generation: Create sounds from presets.
- Sound Management: Auto-save, rename, and favorite sounds.
- Sound Visualization: View sound wave images on playback.
- Sharing: Load sounds via pasted zzfx code.
- Export/Import: Drag-and-drop support for sound lists.
- Offline Playback: Save sounds as .wav files.

## 🖥️ ZzFX Micro Code

Here's all the code you need to play ZzFX sounds with JavaScript!

```javascript
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.2.1 by Frank Force ~ 880 bytes
zzfxV=.3    // volume
zzfx=       // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=
0,B=0,M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g
=0,H=0,a=0,n=1,I=0,J=0,f=0,x,h)=>{e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d
/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<
q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.
round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:-1)*M.abs(f)**D*zzfxV
*p*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/2+(c>a?0:
(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin
(a)+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.
createBuffer(1,h,R);p.getChannelData(0).set(k);b=zzfxX.createBufferSource();b.
buffer=p;b.connect(zzfxX.destination);b.start();return b};zzfxX=new AudioContext
```

## 🎮 Games Using ZzFX

- [Space Huggers](https://js13kgames.com/entries/space-huggers)
- [Packabunchas](https://js13kgames.com/entries/packabunchas)
- [Galaxy Rider](https://js13kgames.com/entries/galaxy-rider)
- [The Adventures of Captain Callisto](https://js13kgames.com/entries/the-adventures-of-captain-callisto)
- [Welcome to Space](https://js13kgames.com/entries/welcome-to-space)
- [Bogus Roads](https://www.newgrounds.com/portal/view/747570)
- [NoteCraft](https://js13kgames.com/entries/notecraft)
- [The Wandering Wraith](https://js13kgames.com/entries/the-wandering-wraith)
- [Bounce Back](https://www.newgrounds.com/portal/view/755171)
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
- [Big Champ](https://js13kgames.com/entries/big-champ)
- [I want to google the game](https://js13kgames.com/entries/i-want-to-google-the-game)
- [Edge Not Found](https://js13kgames.com/entries/edge-not-found)
- [Stolen Sword](https://js13kgames.com/entries/stolen-sword)
- [Highway 404](https://js13kgames.com/entries/highway-404)
- [The Last Spartan](https://js13kgames.com/entries/the-last-spartan)
- [OS13k](https://github.com/KilledByAPixel/OS13k)
- [Crab Story](https://www.crabstory.io/)
- [Cooking for Skully](https://github.com/gheja/js13k2022)
- [Egg Time Rewind](https://js13kgames.com/entries/egg-time-rewind)
- [Charon Jr.](https://js13kgames.com/entries/charon-jr)
- [13](https://js13kgames.com/entries/13)
- [Soul Surf](https://js13kgames.com/entries/soul-surf)
- [Dead Again](https://js13kgames.com/entries/dead-again)

![ZzFX Image](/icon.png)
