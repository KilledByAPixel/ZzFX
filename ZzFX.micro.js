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
(J=1,K=.05,h=220,f=0,k=0,n=.1,g=0,A=1,r=0,B=0,t=0,C=0,u=0,D=0,v=0,L=0,e=0,c=2*Math.PI,b=44100,w=p=>2*p*Math.random()-p,x=p=>0<p?1:-1,M=r*=500*c/b**2,E=h*=(1+w(K))*c/b,N=x(v)*c/4,q=[],F=0,G=0,d=0,l=1,H=0,I=0,a=0,O=.5,m,y,z=zzfxX.createBufferSource())=>{f=50+f*b|0;k=k*b|0;n=n*b|0;e=e*b|0;B*=500*c/b**3;m=f+k+n+e;v*=c/b;t*=c/b;C*=b;for(u*=b;d<m;q[d++]=a)++I>100*L&&(I=0,a=F*h*Math.sin(G*v-N),a=g?1<g?2<g?3<g?4<g?x((a/c%1+1)%1-(O+=1e3*A/b)%1):Math.sin((a%c)**3):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/c%2+2)%2:1-4*Math.abs(Math.round(a/c)-a/c):Math.sin(a),5>g&&(a=x(a)*Math.abs(a)**A),a*=J*zzfxV*(d<f?d/f:d<f+k?1:d<m-e?1-(d-f-k)/n:0),a=e?a/2+(e>d?0:(d<m-e?1:(d-m)/e)*q[d-e]/2):a),F+=1+w(D),G+=1+w(D),h+=r+=B,l&&++l>C&&(E+=t,h+=t,l=0),u&&++H>u&&(h=E,r=M,H=1,l=l||1);y=zzfxX.createBuffer(1,q.length,b);y.getChannelData(0).set(q);z.buffer=y;z.connect(zzfxX.destination);z.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s)