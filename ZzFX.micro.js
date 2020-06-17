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
((t=1,a=.05,e=220,n=0,f=0,z=.1,h=0,M=1,r=0,x=0,o=0,s=0,i=0,u=0,c=0,d=0,X=0,b=1,m=0,g=2*Math.PI,l=44100,B=(t=>2*t*Math.random()-t),C=(t=>0<t?1:-1),V=(r*=500*g/l**2),w=(e*=(1+B(a))*g/l),A=C(c)*g/4,D=[],I=0,P=0,S=0,j=1,k=0,p=0,q=0,v,y,E,F=zzfxX.createBufferSource())=>{for(y=(n=99+n*l|0)+(m=m*l|0)+(f=f*l|0)+(z=z*l|0)+(X=X*l|0),x*=500*g/l**3,c*=g/l,o*=g/l,s*=l,i*=l;S<y;D[S++]=q)++p>100*d&&(p=0,q=I*e*Math.sin(P*c-A),q=C(q=h?1<h?2<h?3<h?Math.sin((q%g)**3):Math.max(Math.min(Math.tan(q),1),-1):1-(2*q/g%2+2)%2:1-4*Math.abs(Math.round(q/g)-q/g):Math.sin(q))*Math.abs(q)**M,q*=t*zzfxV*(S<n?S/n:S<n+m?1-(S-n)/m*(1-b):S<n+m+f?b:S<y-X?(y-S+z)/z*b:0),q=X?q/2+(X>S?0:(S<y-X?1:(S-y)/X)*D[S-X]/2):q),I+=1+B(u),P+=1+B(u),e+=r+=x,j&&++j>s&&(e+=o,w+=o,j=0),i&&++k>i&&(e=w,r=V,k=1,j=j||1);(E=zzfxX.createBuffer(1,D.length,l)).getChannelData(0).set(D),F.buffer=E,F.connect(zzfxX.destination),F.start()}),zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)