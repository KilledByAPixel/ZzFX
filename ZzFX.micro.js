// ZzFX - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force

// This build of zzfx is minified for used in tiny games.
// It has only a zzfx to play sounds and zzfxV to set volume.
// There is a small bit of optional code that increases compatibility.
// Feel free to minify it further for your own needs!

'use strict'
let zzfx, zzfxV, zzfxX

// ZzFXMicro - Zuper Zmall Zound Zynth 
zzfxV=.3 // volume
zzfx=    // play sound
(I=1,J=.05,g=220,f=.1,h=.1,m=.1,n=0,K=1,r=0,A=0,t=0,B=0,u=0,C=0,v=0,L=0,e=0,d=2*Math.PI,b=44100,w=p=>2*p*Math.random()-p,x=p=>0<p?1:-1,M=r*=500*d/b**2,D=g*=(1+w(J))*d/b,N=x(v)*d/4,q=[],E=0,F=0,c=0,k=1,G=0,H=0,a=0,l,y,z=zzfxX.createBufferSource())=>{f=50+f*b|0;h=h*b|0;m=m*b|0;e=e*b|0;A*=500*d/b**3;l=f+h+m+e;v*=d/b;t*=d/b;B*=b;for(u*=b;c<l;q[c++]=a)++H>100*L&&(H=0,a=E*g*Math.sin(F*v-N),a=n?1<n?2<n?3<n?x(Math.sin((a%d)**3)):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/d%2+2)%2:1-4*Math.abs(Math.round(a/d)-a/d):Math.sin(a),a=x(a)*Math.abs(a)**K,a*=I*zzfxV*(c<f?c/f:c<f+h?1:c<l-e?1-(c-f-h)/m:0),a=e?a/2+(e>c?0:(c<l-e?1:(c-l)/e)*q[c-e]/2):a),E+=1+w(C),F+=1+w(C),g+=r+=A,k&&++k>B&&(D+=t,g+=t,k=0),u&&++G>u&&(g=D,r=M,G=1,k=k||1);y=zzfxX.createBuffer(1,q.length,b);y.getChannelData(0).set(q);z.buffer=y;z.connect(zzfxX.destination);z.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s)