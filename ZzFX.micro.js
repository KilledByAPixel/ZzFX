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
(t=1,a=.05,e=220,n=0,f=0,z=.1,h=0,r=1,s=0,M=0,o=0,x=0,i=0,c=0,u=0,d=0,X=0,b=0,l=2*Math.PI,m=44100,g=(t=>2*t*Math.random()-t),B=(t=>0<t?1:-1),C=(s*=500*l/m**2),V=(e*=(1+g(a))*l/m),w=B(u)*l/4,A=[],D=0,I=0,P=0,S=1,j=0,k=0,p=0,q,v,y,E=zzfxX.createBufferSource())=>{for(M*=500*l/m**3,v=(n=99+n*m|0)+(f=f*m|0)+(z=z*m|0)+(X=X*m|0),u*=l/m,o*=l/m,x*=m,i*=m;P<v;A[P++]=p)++k>100*d&&(k=0,p=D*e*Math.sin(I*u-w),p=B(p=h?1<h?2<h?3<h?Math.sin((p%l)**3):Math.max(Math.min(Math.tan(p),1),-1):1-(2*p/l%2+2)%2:1-4*Math.abs(Math.round(p/l)-p/l):Math.sin(p))*Math.abs(p)**r,p*=t*zzfxV*(P<n?P/n:P<n+f?1+(n-P)*b/f:P<v-X?(1-(P-n-f)/z)*(1-b):0),p=X?p/2+(X>P?0:(P<v-X?1:(P-v)/X)*A[P-X]/2):p),D+=1+g(c),I+=1+g(c),e+=s+=M,S&&++S>x&&(e+=o,V+=o,S=0),i&&++j>i&&(e=V,s=C,j=1,S=S||1);(y=zzfxX.createBuffer(1,A.length,m)).getChannelData(0).set(A),E.buffer=y,E.connect(zzfxX.destination),E.start()},zzfxX=new AudioContext;

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)