# ZzFX - Zuper Zmall Zound Zynth

# [ZzFX Sound Designer](https://killedbyapixel.github.io/ZzFX) - Use this to make sounds

## ZzFX Features

- Tiny sound generator with 20 controllable parameters
- Play audio via code, no need for sound asset files
- Compatible with nearly all web browsers
- Small code footprint, the micro version is under 1 kilobyte uncompressed
- Can produce a large variety of sound effect types
- Sounds can be played with a short function call
- No additional libraries or dependencies are required
- Open source with MIT license, you can use this for anything!

# Why Use ZzFX?

- You can quickly add or change sound effects with just one line of code
- Without sound asset files your game is smaller and faster for users to download
- While prototyping you can use ZzFX for placeholder sound effects
- For size limited game jams like [JS13K](https://js13kgames.com/), ZzFX uses very minimal overhead
- ZzFX is not just for games, you can use it to easily add sounds to any website

# How to Use

* Download from github or use `npm install zzfx`
* Import ZZFX as a module with using `import {ZZFX, zzfx} from './ZzFX.js'`
* Or paste the code from [ZzFXMicro.min.js](https://github.com/KilledByAPixel/ZzFX/blob/master/ZzFXMicro.min.js)
* To play a sound just call zzfx(), something like `zzfx(...[,,,,.1,,,,9])`
* Use [the ZzFX sound designer web app](https://killedbyapixel.github.io/ZzFX) to create new sounds
* Check out [this soundboard demo](https://codepen.io/KilledByAPixel/full/BaowKzv) for some examples

Here are a few more examples examples...

```javascript
zzfx(...[,,925,.04,.3,.6,1,.3,,6.27,-184,.09,.17]); // Game Over
zzfx(...[,,537,.02,.02,.22,1,1.59,-6.98,4.97]); // Heart
zzfx(...[1.5,.8,270,,.1,,1,1.5,,,,,,,,.1,.01]); // Piano
zzfx(...[,,129,.01,,.15,,,,,,,,5]); // Drum
```

![ZzFX Image](/screenshot.png)

## [ZzFX Music](https://keithclark.github.io/ZzFXM/)

- [ZzFX now supports music via ZzFXM by Keith Clark!](https://keithclark.github.io/ZzFXM/)
- Both the player and songs are super tiny and compress well
- [NoteCraft](https://killedbyapixel.github.io/NoteCraft/) can also export to ZzFXM

# ZzFX Micro Code

Here's all the code you need to play ZzFX sounds with JavaScript!

```javascript
// ZzFXMicro - Zuper Zmall Zound Zynth - v1.1.7 ~ 900 bytes minified
zzfxV=.3 // volume
zzfx=    // play sound
(p=1,k=.05,b=220,e=0,r=0,t=.1,q=0,D=1,u=0,y=0,v=0,z=0,l=0,E=0,A=0,F=0,c=0,w=1,m=0,B=0)=>{let
M=Math,R=44100,d=2*M.PI,G=u*=500*d/R/R,C=b*=(1-k+2*k*M.random(k=[]))*d/R,g=0,H=0,a=0,n=1,I=0
,J=0,f=0,x,h;e=R*e+9;m*=R;r*=R;t*=R;c*=R;y*=500*d/R**3;A*=d/R;v*=d/R;z*=R;l=R*l|0;for(h=e+m+
r+t+c|0;a<h;k[a++]=f)++J%(100*F|0)||(f=q?1<q?2<q?3<q?M.sin((g%d)**3):M.max(M.min(M.tan(g),1)
,-1):1-(2*g/d%2+2)%2:1-4*M.abs(M.round(g/d)-g/d):M.sin(g),f=(l?1-B+B*M.sin(d*a/l):1)*(0<f?1:
-1)*M.abs(f)**D*p*zzfxV*(a<e?a/e:a<e+m?1-(a-e)/m*(1-w):a<e+m+r?w:a<h-c?(h-a-c)/t*w:0),f=c?f/
2+(c>a?0:(a<h-c?1:(h-a)/c)*k[a-c|0]/2):f),x=(b+=u+=y)*M.cos(A*H++),g+=x-x*E*(1-1E9*(M.sin(a)
+1)%2),n&&++n>z&&(b+=v,C+=v,n=0),!l||++I%l||(b=C,u=G,n=n||1);p=zzfxX.createBuffer(1,h,R);p.
getChannelData(0).set(k);b=zzfxX.createBufferSource();b.buffer=p;b.connect(zzfxX.destination
);b.start();return b};zzfxX=new(window.AudioContext||webkitAudioContext) // audio context
```

## ZzFX UI Features

- Generates random sounds from presets
- Sound list is automatically saved
- Each parameter can be modified with constraints
- Lock and mutate buttons for each parameter
- Sounds can be renamed
- Shortens code for zzfx sound calls
- Displays image of sound wave when played
- Sounds can be marked as favorites to prevent removal
- Sounds can be loaded by pasting zzfx code for easy sharing
- List of sounds can be exported and imported
- Supports drag-and-drop of exported files into sound list
- Supports saving sounds as wav files for offline playback

## Games Using ZzFX

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
- [Egg Time Rewind](https://js13kgames.com/entries/egg-time-rewind)
- [Charon Jr.](https://js13kgames.com/entries/charon-jr)
- [13](https://js13kgames.com/entries/13)
- [Soul Surf](https://js13kgames.com/entries/soul-surf)
- [Dead Again](https://js13kgames.com/entries/dead-again)

![ZzFX Image](/favicon.png) 
