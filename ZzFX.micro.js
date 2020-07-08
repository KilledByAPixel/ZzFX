// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
// https://github.com/KilledByAPixel/ZzFX

// This is a tiny build of zzfx with only a zzfx function to play sounds.
// You can use zzfxV to set volume.
// There is a small bit of optional code to improve compatibility.
// Feel free to minify it further for your own needs!

'use strict';let zzfx,zzfxV,zzfxX

// ZzFXMicro - Zuper Zmall Zound Zynth 
zzfxV=.3 // volume
zzfx=    // play sound
(t=1,a=.05,n=220,e=0,f=0,r=.1,h=0,o=1,M=0,s=0,z=0,i=0,u=0,c=0,x=0,d=0,X=0,b=1,m=0,l=44100,B=99+e*l,C=f*l,P=r*l,g=m*l,w=X*l,A=2*Math.PI,D=(t=>1+2*t*Math.random()-t),I=(t=>0<t?1:-1),S=B+g+C+P+w,j=(M*=500*A/l**2),k=(n*=D(a)*A/l),p=I(x)*A/4,q=0,v=0,y=0,E=0,F=0,G=0,H=1,J=[],K=zzfxX.createBufferSource(),L=zzfxX.createBuffer(1,S,l))=>{for(K.connect(zzfxX.destination);y<S;J[y++]=G)++F>100*d&&(F=0,G=q*n*Math.sin(v*x*A/l-p),G=I(G=h?1<h?2<h?3<h?Math.sin((G%A)**3):Math.max(Math.min(Math.tan(G),1),-1):1-(2*G/A%2+2)%2:1-4*Math.abs(Math.round(G/A)-G/A):Math.sin(G))*Math.abs(G)**o*t*.3*(y<B?y/B:y<B+g?1-(y-B)/g*(1-b):y<B+g+C?b:y<S-w?(S-y-w)/P*b:0),G=w?G/2+(w>y?0:(y<S-w?1:(y-S)/w)*J[y-w|0]/2):G),q+=D(c),v+=D(c),n+=M+=500*s*A/l**3,H&&++H>i*l&&(n+=z*A/l,k+=z*A/l,H=0),u&&++E>u*l&&(n=k,M=j,E=1,H=H||1);return L.getChannelData(0).set(J),K.buffer=L,K.start(),K};zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.Z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.Z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s.stop=s.stop||(t=>zzfxX.noteOff(t)),s)