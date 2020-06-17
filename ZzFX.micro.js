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
(H=1,I=.05,g=220,J=0,K=0,L=.1,l=0,M=1,q=0,N=0,O=0,P=0,Q=0,v=0,w=0,R=0,S=0,r=1,T=0,d=2*Math.PI,b=44100,t=m=>2*m*Math.random()-m,x=m=>0<m?1:-1,U=q*=500*d/b**2,V=x(w)*d/4,y=g*=(1+t(I))*d/b,f=99+J*b|0,n=T*b|0,z=K*b|0,A=L*b|0,e=S*b|0,W=500*N*d/b**3,X=w*d/b,B=O*d/b,Y=P*b,C=Q*b,h=f+n+z+A+e,p=[],D=0,E=0,c=0,k=1,F=0,G=0,a=0,Z,u=zzfxX.createBufferSource())=>{for(;c<h;p[c++]=a)++G>100*R&&(G=0,a=D*g*Math.sin(E*X-V),a=l?1<l?2<l?3<l?Math.sin((a%d)**3):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/d%2+2)%2:1-4*Math.abs(Math.round(a/d)-a/d):Math.sin(a),a=x(a)*Math.abs(a)**M,a*=H*zzfxV*(c<f?c/f:c<f+n?1-(c-f)/n*(1-r):c<f+n+z?r:c<h-e?(h-c-e)/A*r:0),a=e?a/2+(e>c?0:(c<h-e?1:(c-h)/e)*p[c-e]/2):a),D+=1+t(v),E+=1+t(v),g+=q+=W,k&&++k>Y&&(g+=B,y+=B,k=0),C&&++F>C&&(g=y,q=U,F=1,k=k||1);buffer=zzfxX.createBuffer(1,p.length,b);buffer.getChannelData(0).set(p);u.buffer=buffer;u.connect(zzfxX.destination);u.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)