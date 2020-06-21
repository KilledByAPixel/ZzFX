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
(H=1,I=.05,h=220,f=0,m=0,n=.1,p=0,J=1,t=0,K=0,x=0,L=0,y=0,z=0,A=0,M=0,e=0,u=1,g=0,b=44100,v=[],q=zzfxX.createBufferSource())=>{f=99+f*b;m*=b;n*=b;g*=b;e*=b;for(let d=2*Math.PI,w=r=>1+2*r*Math.random()-r,B=r=>0<r?1:-1,k=f+g+m+n+e,N=t*=500*d/b**2,C=h*=w(I)*d/b,O=B(A)*d/4,D=0,E=0,c=0,l=1,F=0,G=0,a=0;c<k;v[c++]=a)++G>100*M&&(G=0,a=D*h*Math.sin(E*A*d/b-O),a=p?1<p?2<p?3<p?Math.sin((a%d)**3):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/d%2+2)%2:1-4*Math.abs(Math.round(a/d)-a/d):Math.sin(a),a=B(a)*Math.abs(a)**J,a*=H*zzfxV*(c<f?c/f:c<f+g?1-(c-f)/g*(1-u):c<f+g+m?u:c<k-e?(k-c-e)/n*u:0),a=e?a/2+(e>c?0:(c<k-e?1:(c-k)/e)*v[c-e|0]/2):a),D+=w(z),E+=w(z),h+=t+=500*K*d/b**3,l&&++l>L*b&&(h+=x*d/b,C+=x*d/b,l=0),y&&++F>y*b&&(h=C,t=N,F=1,l=l||1);(q.buffer=zzfxX.createBuffer(1,f+g+m+n+e,b)).getChannelData(0).set(v);q.connect(zzfxX.destination);q.start();return q},zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)