// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
// https://github.com/KilledByAPixel/ZzFX

// This is a tiny build of zzfx with only a zzfx function to play sounds.
// You can use zzfxV to set volume.
// There is a small bit of optional code to improve compatibility.
// Feel free to minify it further for your own needs!

'use strict';let zzfx,zzfxV,zzfxX,zzfxR

// ZzFXMicro - Zuper Zmall Zound Zynth 
zzfxV=.3    // volume
zzfx=       // play sound
(E=1,k=.05,p=220,d=0,t=0,u=.1,q=0,F=1,v=0,G=0,y=0,H=0,g=0,z=0,A=0,I=0,c=0,w=1,l=0,B=0)=>{d=99+d*zzfxR;t*=zzfxR;u=99+u*zzfxR;l*=zzfxR;c*=zzfxR;g=g*zzfxR|0;let b=2*Math.PI,h=d+l+t+u+c|0,J=v*=500*b/zzfxR**2,Z=p*=(1+2*k*Math.random()-k)*b/zzfxR,K=(0<A?1:-1)*b/4,f=0,C=0,a=0,L=0,M=0,e=0,m=1,x=[],n,r=zzfxX.createBufferSource(),D=zzfxX.createBuffer(1,h,zzfxR);for(r.connect(zzfxX.destination);a<h;x[a++]=e)++M%(100*I|0)||(e=q?1<q?2<q?3<q?Math.sin((f%b)**3):Math.max(Math.min(Math.tan(f),1),-1):1-(2*f/b%2+2)%2:1-4*Math.abs(Math.round(f/b)-f/b):Math.sin(f),e=(0<e?1:-1)*Math.abs(e)**F*(g?1-B+B*Math.sin(2*Math.PI*a/g):1)*E*zzfxV*(a<d?a/d:a<d+l?1-(a-d)/l*(1-w):a<d+l+t?w:a<h-c?(h-a-c)/u*w:0),e=c?e/2+(c>a?0:(a<h-c?1:(a-h)/c)*x[a-c|0]/2):e),n=(p+=v+=500*G*b/zzfxR**3)*Math.sin(C*A*b/zzfxR-K),f+=n-n*z*(1-1E9*(Math.sin(a)+1)%2),C+=n-n*z*(1-1E9*(Math.sin(a)**2+1)%2),m&&++m>H*zzfxR&&(p+=y*b/zzfxR,Z+=y*b/zzfxR,m=0),!g||++L%g||(p=Z,v=J,m=m||1);D.getChannelData(0).set(x);r.buffer=D;r.start();return r}
zzfxX=new(window.AudioContext||webkitAudioContext) // audio context
zzfxR=44100 // sample rate