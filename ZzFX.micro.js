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
(t=1,a=.05,e=220,n=0,f=0,z=.1,h=0,r=1,s=0,M=0,o=0,x=0,i=0,c=0,u=0,d=0,X=0,b=1,l=0,m=2*Math.PI,g=44100,B=(t=>2*t*Math.random()-t),C=(t=>0<t?1:-1),P=(s*=500*m/g**2),V=(e*=(1+B(a))*m/g),w=C(u)*m/4,A=[],D=0,I=0,S=0,j=1,k=0,p=0,q=0,v,y,E,F=zzfxX.createBufferSource())=>{for(M*=500*m/g**3,y=(n=99+n*g|0)+(f=f*g|0)+(z=z*g|0)+(X=X*g|0),u*=m/g,o*=m/g,x*=g,i*=g;S<y;A[S++]=q)++p>100*d&&(p=0,q=D*e*Math.sin(I*u-w),q=C(q=h?1<h?2<h?3<h?Math.sin((q%m)**3):Math.max(Math.min(Math.tan(q),1),-1):1-(2*q/m%2+2)%2:1-4*Math.abs(Math.round(q/m)-q/m):Math.sin(q))*Math.abs(q)**r,q*=t*zzfxV*(S<n?S/n:S<n+l?1-(S-n)/l*(1-b):S<n+l+f?b:S<y-X?(1-(y-S+z)/z)*b:0),q=X?q/2+(X>S?0:(S<y-X?1:(S-y)/X)*A[S-X]/2):q),D+=1+B(c),I+=1+B(c),e+=s+=M,j&&++j>x&&(e+=o,V+=o,j=0),i&&++k>i&&(e=V,s=P,k=1,j=j||1);(E=zzfxX.createBuffer(1,A.length,g)).getChannelData(0).set(A),F.buffer=E,F.connect(zzfxX.destination),F.start()},zzfxX=new AudioContext;

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)