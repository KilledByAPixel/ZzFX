# ZzFX - Zuper Zmall Zeeded Zound Zynth
By Frank Force - 2019

# [LIVE DEMO!](http://zzfx.3d2k.com)

    
ZzFX Features

- Micro synth engine with 9 controllable parameters.
- Tiny code footprint and the micro version is under 500 bytes!
- Can produce a wide variety of sound effect types.
- Seeded sounds can be played with a tiny function call, ex: ZZFX.z(3)
- Seeded sound paramerters can be overridden.

ZzFX UI Features

- Generate random sounds from seed.
- Stores sounds in list with local storage persistence.
- Parameters can be modified for more control.
- Lock, reset and mutate buttons for each parameter.
- Sounds can be download as a wave file.

ZzFX Features

- Micro synth engine with 9 controllable parameters.
- Tiny code footprint (<1k) for the minified version.
- Smaller ZzFXmicro version provided without seeds.
- Can produce a wide variety of sound effect types.
- Seeded sounds can be played with a tiny function call, ex: ZZFX.z(3)
- Seeded sound paramerters can be overridden.

ZzFX UI Features

- Generate random sounds from seed.
- Stores sounds in list with local storage persistence.
- Parameters can be modified for more control.
- Lock, reset and mutate buttons for each parameter.
- Sounds can be download as a wave file.

Additional notes...
- You can use ZZFX.R() as a random number generator.
- Try playing multiple sounds simultaneously for unique effects.
- You can change the master volume and frequency randomness.
- Feel free to modify any or all of this code!

**Here's the latest version of the ZzFXmicro you can use directly!**

```
// ZzFX - Zuper Zmall Zound Zynth - Micro Version (488 bytes) - MIT License - Copyright 2019 Frank Force
zzfx_v=.5;zzfx_x=new AudioContext;
zzfx=(e,f,a,g,b,d,h,k,l)=>{let S=44100,P=Math.PI;a*=2*P/S;a*=1+f*(2*Math.random()-1);g*=1E3*P/(S**2);b=0<b?S*(10<b?10:b)|0:1;d*=b|0;k*=2*P/S;l*=P;f=[];for(var m=0,n=0,c=0;c<b;++c)f[c]=e*zzfx_v*Math.cos(m*a*Math.cos(n*k+l))*(c<d?c/d:1-(c-d)/(b-d)),m+=1+h*(2*Math.random()-1),n+=1+h*(2*Math.random()-1),a+=g;e=zzfx_x.createBuffer(1,b,S);a=zzfx_x.createBufferSource();e.getChannelData(0).set(f);a.buffer=e;a.connect(zzfx_x.destination);a.start();return a};
```
