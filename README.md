# ZzFX - Zuper Zmall Zeeded Zound Zynth
By Frank Force - 2019

ZzFX Seed Browser and Demo
- **http://zzfx.3d2k.com**

ZzFX Features
- Micro synth engine with 6 controllable parameters, you can add more.
- Seeded sounds can also be played using as few as 4 bytes, ex: z(3)
- Able to produce a wide variety of sound effect types.
- Tiny footprint, after being minified, ZzFX is only 352 bytes!

ZzFX UI Features
- The UI is just a seed browser for ZzFX.
- When the page loads it is filled with cards each corresponding to a seed.
- Click on a card to play the sound for that seed.
- Each card also has a unique visual apearance tied to that seed.
- You can click on the ZzFX logo to copy the last played seed or change it!
- There is a section in code to create a preset card layout.

Additional notes...
- Be careful of variable name collisions! vars used are ZzFfXRr, don't use them.
- If you use closure compiler, it will shorten the internal variable names.
- You can use R() instead of Math.Random() to save space.
- Feel free to completely modify any of this code!
- Try playing multiple sounds at once for unique effects.
- You can also use negative seeds.
- There is built in 5% frequency randomness in z(), you can change it.
- You may want to add parameters to z(), like a volume setting for example.

**Here's the latest version of the minfied code you can use directly!**

```
// ZzFX - Zuper Zmall Zound Zynth - Minified (352 bytes) - MIT License - Copyright 2019 Frank Force
z=e=>{h=R(5E3);s=r;r=e;R(R());e=(R(Z=1E5)+h)/1E6;l=R(Z);m=R(9);g=R(l);n=R(Z)/1E9;p=R(Z);h=[];for(F=f=0;++F<l;f+=1+R(m))h[F]=Math.cos(f*e*Math.cos(f*n+p))*(F<g?F/g:1-(F-g)/(l-g))
F=X.createBuffer(1,Z,Z);F.getChannelData(0).set(h);h=X.createBufferSource();h.buffer=F;h.connect(X.destination);h.start();r=s}
X=new AudioContext;r=0;R=e=>(r^=r<<3,r^=r>>2,r%e)
```
