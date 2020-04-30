# ZzFX - Zuper Zmall Zound Zynth
By Frank Force 2019

# [TRY THE LIVE DEMO!](https://zzfx.3d2k.com)


## Here's the latest version of the ZzFXmicro, all you need to play ZzFX sounds!

```
zzfxV=.3
zzfx=(I=1,J=.05,g=220,e=.1,f=.1,l=.2,m=0,K=1,r=0,z=0,t=0,u=0,n=0,A=0,B=0,C=0,v=0,h=0,c=2*Math.PI,b=44100,w=L=>L*2*Math.random()-L,M=r*=500*c/b**2,D=g*=(1+w(J))*c/b,E,p=[],F=0,G=0,d=0,k=1,H=0,a,x,y,q=zzfxX.createBufferSource())=>{e=50+e*b|0;f=f*b|0;l=l*b|0;h=h*b/1e3|0;z*=500*c/b**3;E=e+f+l;B*=c/b;t*=c/b;u=u*b|0;n=n*b|0;for(C*=c;d<E;p[d++]=a)a=F*g*Math.cos(G*B+C),a=m?1<m?2<m?3<m?Math.sign(Math.cos((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):2*a/c%2+(0>a?1:-1):1-4*Math.abs(Math.round(a/c)-a/c):Math.cos(a),a=Math.sign(a)*Math.abs(a)**K,x=d<e?d/e:d<e+f?1:1-(d-e-f)/l,a*=x*I*zzfxV,a=v?(a/v*9|0)*v/9:a,a=h?a/2+(h>d?0:(d<e+f?1:x)*p[d-h]/2):a,F+=1+w(A),G+=1+w(A),g+=r+=z,k&&++k>u&&(D+=t,g+=t,k=0),n&&++H>n&&(g=D,r=M,H=1,k=k||1);y=zzfxX.createBuffer(1,p.length,b);y.getChannelData(0).set(p);q.buffer=y;q.connect(zzfxX.destination);q.start()}
zzfxX=new AudioContext
```

## ZzFX Features

- Tiny synth engine with 18 controllable parameters.
- Play sounds via code, no need for wave files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte!
- Can produce a huge variety of sound effect types.
- Sounds can be played with a short function call.
- Use ZZFX.GetNote to make music, ex: ZZFX.GetNote(440, 7) // 7 semitons above A4
- Sounds can be saved out as wav files for offline playback.
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

![ZzFX Image](/favicon.png) 
