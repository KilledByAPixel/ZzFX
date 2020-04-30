# ZzFX - Zuper Zmall Zound Zynth

# [TRY THE LIVE DEMO!](https://zzfx.3d2k.com)


## Here's the code for the ZzFXmicro, this all you need to play ZzFX sounds!

```
zzfxV=.3 // volume
zzfx=    // play sound
(I=1,J=.05,g=220,e=.1,f=.1,l=.1,m=0,K=1,p=0,y=0,q=0,z=0,r=0,A=0,t=0,L=0,h=0,c=2*Math.PI,b=44100,u=B=>2*B*Math.random()-B,M=p*=500*c/b**2,C=g*=(1+u(J))*c/b,N=(0<t?1:-1)*c/4,D,n=[],E=0,F=0,d=0,k=1,G=0,H=0,a=0,v,w,x=zzfxX.createBufferSource())=>{e=50+e*b|0;f=f*b|0;l=l*b|0;h=100*h|0;y*=500*c/b**3;D=e+f+l;t*=c/b;q*=c/b;z*=b;for(r*=b;d<D;n[d++]=a)++H>100*L&&(H=0,a=E*g*Math.sin(F*t+N),a=m?1<m?2<m?3<m?Math.sign(Math.sin((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/c%2+2)%2:1-4*Math.abs(Math.round(a/c)-a/c):Math.sin(a),a=Math.sign(a)*Math.abs(a)**K,v=d<e?d/e:d<e+f?1:1-(d-e-f)/l,a*=v*I*zzfxV,a=h?a/2+(h>d?0:(d<e+f?1:v)*n[d-h]/2):a),E+=1+u(A),F+=1+u(A),g+=p+=y,k&&++k>z&&(C+=q,g+=q,k=0),r&&++G>r&&(g=C,p=M,G=1,k=k||1);w=zzfxX.createBuffer(1,n.length,b);w.getChannelData(0).set(n);x.buffer=w;x.connect(zzfxX.destination);x.start()};zzfxX=new AudioContext
```

## ZzFX Features

- Tiny synth engine with 17 controllable parameters.
- Play sounds via code, no need for wave files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte!
- Can produce a huge variety of sound effect types.
- Sounds can be played with a short function call.
- Use ZZFX.GetNote to get frequencies on a 12 tone scale.
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
