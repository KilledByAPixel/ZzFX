# ZzFX - Zuper Zmall Zound Zynth

# [TRY THE LIVE DEMO!](https://zzfx.3d2k.com)


## Here's the code for the ZzFXmicro, this all you need to play ZzFX sounds!

```
zzfxV=.3 // volume
zzfx=    // play sound
(I=1,J=.05,g=220,f=.1,h=.1,l=.1,m=0,K=1,r=0,A=0,t=0,B=0,u=0,C=0,v=0,L=0,e=0,c=2*Math.PI,b=44100,w=n=>2*n*Math.random()-n,x=n=>0<n?1:-1,M=r*=500*c/b**2,D=g*=(1+w(J))*c/b,N=x(v)*c/4,p,q=[],E=0,F=0,d=0,k=1,G=0,H=0,a=0,y,z=zzfxX.createBufferSource())=>{f=50+f*b|0;h=h*b|0;l=l*b|0;e=e*b|0;A*=500*c/b**3;p=f+h+l+e;v*=c/b;t*=c/b;B*=b;for(u*=b;d<p;q[d++]=a)++H>100*L&&(H=0,a=E*g*Math.sin(F*v-N),a=m?1<m?2<m?3<m?x(Math.sin((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/c%2+2)%2:1-4*Math.abs(Math.round(a/c)-a/c):Math.sin(a),a=x(a)*Math.abs(a)**K,a*=I*zzfxV*(d<f?d/f:d<f+h?1:1-(d-f-h)/l),a=e?a/2+(e>d?0:(d<p-e?1:(d-p)/e)*q[d-e]/2):a),E+=1+w(C),F+=1+w(C),g+=r+=A,k&&++k>B&&(D+=t,g+=t,k=0),u&&++G>u&&(g=D,r=M,G=1,k=k||1);y=zzfxX.createBuffer(1,q.length,b);y.getChannelData(0).set(q);z.buffer=y;z.connect(zzfxX.destination);z.start()};zzfxX=new AudioContext
```

## ZzFX Features

- Tiny synth engine with 17 controllable parameters.
- Play sounds via code, no need for wave files!
- Compatible with nearly all web browsers.
- Small code footprint, the micro version is under 1 kilobyte!
- Can produce a huge variety of sound effect types.
- Sounds can be played with a short function call.
- Use ZZFX.GetNote to get frequencies on a standard diatonic scale.
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

![ZzFX Image](/favicon.png) 
