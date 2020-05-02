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
(J=1,K=.05,g=220,f=0,h=0,n=.1,k=0,A=1,t=0,B=0,u=0,C=0,v=0,D=0,w=0,L=0,e=0,c=2*Math.PI,b=44100,x=p=>2*p*Math.random()-p,q=p=>0<p?1:-1,M=t*=500*c/b**2,E=g*=(1+x(K))*c/b,N=q(w)*c/4,r=[],F=0,G=0,d=0,l=1,H=0,I=0,a=0,O=.5,m,y,z=zzfxX.createBufferSource())=>{f=50+f*b|0;h=h*b|0;n=n*b|0;e=e*b|0;B*=500*c/b**3;m=f+h+n+e;w*=c/b;u*=c/b;C*=b;for(v*=b;d<m;r[d++]=a)++I>100*L&&(I=0,a=F*g*Math.sin(G*w-N),4<k?a=q(a/c%1-(O+=100*A/b)%1):(a=k?1<k?2<k?3<k?q(Math.sin((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/c%2+2)%2:1-4*Math.abs(Math.round(a/c)-a/c):Math.sin(a),a=q(a)*Math.abs(a)**A),a*=J*zzfxV*(d<f?d/f:d<f+h?1:d<m-e?1-(d-f-h)/n:0),a=e?a/2+(e>d?0:(d<m-e?1:(d-m)/e)*r[d-e]/2):a),F+=1+x(D),G+=1+x(D),g+=t+=B,l&&++l>C&&(E+=u,g+=u,l=0),v&&++H>v&&(g=E,t=M,H=1,l=l||1);y=zzfxX.createBuffer(1,r.length,b);y.getChannelData(0).set(r);z.buffer=y;z.connect(zzfxX.destination);z.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s)