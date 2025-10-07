# ZzFX - Zuper Zmall Zound Zynth

[![NPM Package][npm]][npm-url]
[![Build Size][build-size]][build-size-url]
[![NPM Downloads][npm-downloads]][npmtrends-url]
[![DeepScan][deepscan]][deepscan-url]

ZzFX is a tiny sound generator designed to produce a wide variety of sound effects with minimal code overhead. It's perfect for games, prototypes, and any web application that needs sound without the bulk of traditional sound files.

# [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX) - [Soundboard Demo](https://codepen.io/KilledByAPixel/full/BaowKzv)

![ZzFX Image](/screenshot.png)

## 🌟 Features

- Compact: Less than 1 kilobyte when compressed!
- Versatile: 20 controllable parameters for diverse sound effects.
- No Dependencies: Standalone with no external libraries.
- Fast: Precache generated sounds and play them later instantly.
- Cross-Browser: Compatible with nearly all web browsers.
- Open Source: MIT licensed, use it anywhere!

## 🔊 Why Use ZzFX?

- Code-Driven Sound: Add or change sound effects with just one line of code.
- Lightweight: No sound asset files mean faster download times.
- Prototyping: Ideal for placeholder sound effects.
- Game Jams: Minimal overhead for size-limited competitions like [JS13K](https://js13kgames.com/).
- Not Just for Games: Enhance any website with sound!

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

## 🎶 ZzFX Music

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
let // ZzFXMicro - Zuper Zmall Zound Zynth - v1.3.2 by Frank Force
zzfxV=.3,               // volume
zzfxX=new AudioContext, // audio context
zzfx=                   // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0
,N=0)=>{let M=Math,d=2*M.PI,R=44100,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,
g=0,H=0,a=0,n=1,I=0,J=0,f=0,h=N<0?-1:1,x=d*h*N*2/R,L=M.cos(x),Z=M.sin,K=Z(x)/4,O=1+K,
X=-2*L/O,Y=(1-K)/O,P=(1+h*L)/2/O,Q=-(h+L)/O,S=P,T=0,U=0,V=0,W=0;e=R*e+9;m*=R;r*=R;t*=
R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;p*=zzfxV;for(h=e+m+r+t+c|0;a<h;k[a++]
=f*p)++J%(100*F|0)||(f=q?1<q?2<q?3<q?4<q?(g/d%1<D/2)*2-1:Z(g**3):M.max(M.min(M.tan(g)
,1),-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):Z(g),f=(l?1-B+B*Z(d*a/l):1)*(4<q?
s:(f<0?-1:1)*M.abs(f)**D)*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:
0),f=c?f/2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2/p):f,N?f=W=S*T+Q*(T=U)+P*(U=f)-Y*V-X*(
V=W):0),x=(b+=u+=y)*M.cos(A*H++),g+=x+x*E*Z(a**5),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l
||(b=C,u=G,n=n||1);X=zzfxX,p=X.createBuffer(1,h,R);p.getChannelData(0).set(k);b=X.
createBufferSource();b.buffer=p;b.connect(X.destination);b.start()}
```

## 🎮 Games Using ZzFX

[Space Huggers](https://js13kgames.com/entries/space-huggers) / [Driven Wild](https://www.newgrounds.com/portal/view/972740) / [Clawstrike](https://js13kgames.com/2025/games/clawstrike) / [Cat Survivors](https://js13kgames.com/2025/games/cat-survivors) / [Triska the Ninja Cat](https://js13kgames.com/2025/games/triska-the-ninja-cat) / [Black Cat Squadron](https://js13kgames.com/2025/games/black-cat-squadron) / [Kuro Neko Market](https://js13kgames.com/2025/games/kuro-neko-market) / [The Way of the Dodo](https://js13kgames.com/games/the-way-of-the-dodo) / [Squad 13](https://js13kgames.com/2024/games/squad-13) / [Coup Ahoo](https://js13kgames.com/2024/games/coup-ahoo) / [Bubble Burst](https://js13kgames.com/games/bubble-burst) / [Packabunchas](https://js13kgames.com/entries/packabunchas) / [Galaxy Rider](https://js13kgames.com/entries/galaxy-rider) / [The Adventures of Captain Callisto](https://js13kgames.com/entries/the-adventures-of-captain-callisto) / [Welcome to Space](https://js13kgames.com/entries/welcome-to-space) / [Bogus Roads](https://www.newgrounds.com/portal/view/747570) / [NoteCraft](https://js13kgames.com/entries/notecraft) / [The Wandering Wraith](https://js13kgames.com/entries/the-wandering-wraith) / [Bounce Back](https://www.newgrounds.com/portal/view/755171) / [Hue Jumper](https://killedbyapixel.itch.io/hue-jumper) / [Bubba's Back Room](https://js13kgames.com/entries/bubbas-back-room) / [Backstabber Hero](https://js13kgames.com/entries/backstabber-hero) / [Spendotron: 2019](https://killedbyapixel.itch.io/currency-wars) / [Dioretsa](https://js13kgames.com/entries/20461-dioretsa) / [Back 2 Back](https://js13kgames.com/entries/back-2-back) / [Quick Wins](https://js13kgames.com/entries/quick-wins) / [Back Relax](http://js13kgames.com/entries/back-relax) / [Back To The Island](https://js13kgames.com/entries/back-to-the-island) / [Backspace It](http://js13kgames.com/entries/backspace-it) / [Back To The Stars](https://js13kgames.com/entries/back-to-the-stars) / [Can't Get Back](https://js13kgames.com/entries/cant-get-back) / [Letchworth Village](https://js13kgames.com/entries/letchworth-village) / [Noegnud](https://js13kgames.com/entries/noegnud) / [Sausage Redemption](https://gogoprog.itch.io/sausage-redemption) / [Marshmallow Sky](https://github.com/baturinsky/marshmallow-sky) / [Big Champ](https://js13kgames.com/entries/big-champ) / [I want to google the game](https://js13kgames.com/entries/i-want-to-google-the-game) / [Edge Not Found](https://js13kgames.com/entries/edge-not-found) / [Stolen Sword](https://js13kgames.com/entries/stolen-sword) / [Highway 404](https://js13kgames.com/entries/highway-404) / [The Last Spartan](https://js13kgames.com/entries/the-last-spartan) / [OS13k](https://github.com/KilledByAPixel/OS13k) / [Crab Story](https://www.crabstory.io/) / [Cooking for Skully](https://github.com/gheja/js13k2022) / [Egg Time Rewind](https://js13kgames.com/entries/egg-time-rewind) / [Charon Jr.](https://js13kgames.com/entries/charon-jr) / [13](https://js13kgames.com/entries/13) / [Soul Surf](https://js13kgames.com/entries/soul-surf) / [Dead Again](https://js13kgames.com/entries/dead-again) / [Trench Fisher](https://swashvirus.github.io/trench-fisher) / [Path to Glory](https://js13kgames.com/entries/path-to-glory) / [Merlin vs Alfonso](https://js13kgames.com/entries/merlin-vs-alfonso) / [Casual Crusade](https://js13kgames.com/entries/casual-crusade) / [Squirtcopter](https://joachimford.uk/squirtcopter/) / [Wendol Village](https://js13kgames.com/2024/games/wendol-village) / [Brewing Disaster](https://js13kgames.com/2024/games/brewing-disaster) / [Data Warrior: 13kb limit](https://js13kgames.com/2024/games/data-warrior-13kb-limit) / [Unblock](https://js13kgames.com/games/unblock) / [204Snake!](https://www.newgrounds.com/portal/view/960100) / [GATOR](https://www.newgrounds.com/portal/view/960757) / [A Hedgehog's Search](https://willsm1111.itch.io/a-hedgehogs-search)


![ZzFX Image](/icon.png)

[npm]: https://img.shields.io/npm/v/zzfx
[npm-url]: https://www.npmjs.com/package/zzfx
[build-size]: https://badgen.net/bundlephobia/minzip/zzfx?3
[build-size-url]: https://bundlephobia.com/result?p=zzfx
[npm-downloads]: https://img.shields.io/npm/dw/zzfx
[npmtrends-url]: https://www.npmtrends.com/zzfx
[deepscan]: https://deepscan.io/api/teams/22950/projects/26379/branches/838286/badge/grade.svg
[deepscan-url]: https://deepscan.io/dashboard#view=project&tid=22950&pid=26379&bid=838286
