# ZzFX - Zuper Zmall Zeeded Zound Zynth
By Frank Force 2019

# [LIVE DEMO!](https://zzfx.3d2k.com)

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


**Here's the latest version of the ZzFXmicro you can use directly!**

```
// ZzFXmicro - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force
zzfx_v=.5;zzfx_x=new AudioContext;zzfx=(e,f,a,b=1,d=.1,g=0,h=0,k=0,l=0)=>{let S=44100,P=Math.PI;a*=2*P/S;a*=1+f*(2*Math.random()-1);g*=1E3*P/(S**2);b=0<b?S*(10<b?10:b)|0:1;d*=b|0;k*=2*P/S;l*=P;f=[];for(var m=0,n=0,c=0;c<b;++c)f[c]=e*zzfx_v*Math.cos(m*a*Math.cos(n*k+l))*(c<d?c/d:1-(c-d)/(b-d)),m+=1+h*(2*Math.random()-1),n+=1+h*(2*Math.random()-1),a+=g;e=zzfx_x.createBuffer(1,b,S);a=zzfx_x.createBufferSource();e.getChannelData(0).set(f);a.buffer=e;a.connect(zzfx_x.destination);a.start();return a}
```

![ZzFX Image](/favicon.png) 
