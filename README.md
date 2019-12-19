# ZzFX - Zuper Zmall Zeeded Zound Zynth
By Frank Force 2019

# [TRY THE LIVE DEMO!](https://zzfx.3d2k.com)


## Here's the latest version of the ZzFXmicro you can use directly!

```
// ZzFXmicro - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force
zzfx_v=.5;zzfx_x=new AudioContext;zzfx=(g,h,a,b=1,c=.1,k=0,f=0,l=0,m=0)=>{let q=44100,Q=Q=>Q*(Math.random()*2-1),d=2*Math.PI;a=d/q*a*(1+Q(h));k*=500*d/q**2;b=q*b|0;c=c*b|0;l=d/q*l;m=d/2*m;h=[];for(let n=d=0,e=0;e<b;++e)h[e]=g*zzfx_v*Math.cos(d*a*Math.cos(n*l+m))*(e<c?e/c:1-(e-c)/(b-c)),d+=1+Q(f),n+=1+Q(f),a+=k;g=zzfx_x.createBuffer(1,b,q);a=zzfx_x.createBufferSource();g.getChannelData(0).set(h);a.buffer=g;a.connect(zzfx_x.destination);a.start()}
```

## ZzFX Features

- Tiny synth engine with 9 controllable parameters.
- Small code footprint for full version and the micro version is under 500 bytes!
- Can produce a wide variety of sound effect types.
- Seeded sounds can be played with a tiny function call, ex: ZZFX.z(6)
- Seeded sound paramerters can be overridden, ex: ZZFX.z(26,{frequency:600})
- Random number generator ZZFX.R() can be used in place of Math.random().
- Use ZZFX.Note to make music notes, ex: ZZFX.Note(440, 7) // 7 semitons above A4

## ZzFX UI Features

- Generate random sounds from seed.
- Stores sounds in list with local storage persistence.
- Parameters can be modified for more control.
- Lock, reset and mutate buttons for each parameter.
- Displays image of sound wave when played.
- Sounds can be download as a wave file.
- Mark sounds as favorites to keep them from being cleared.
- List of sounds can be exported and imported.
- Supports drag-and-drop of exported files into sound list.

## Games Using ZzFX

- [The Wandering Wraith](https://js13kgames.com/entries/the-wandering-wraith)
- [Bounce Back](https://js13kgames.com/entries/bounce-back)
- [Bubba's Back Room](https://js13kgames.com/entries/bubbas-back-room)
- [Bogus Roads](https://killedbyapixel.itch.io/bogus-roads)
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

![ZzFX Image](/favicon.png) 
