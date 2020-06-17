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
(t=1,a=.05,n=220,e=0,f=0,z=.1,h=0,o=1,M=0,r=0,x=0,i=0,s=0,u=0,c=0,d=0,X=0,b=1,l=0,m=2*Math.PI,g=44100,B=t=>2*t*Math.random()-t,C=t=>0<t?1:-1,V=M*=500*m/g**2,w=n*=(1+B(a))*m/g,A=C(c)*m/4,D=[],I=0,P=0,S=0,j=1,k=0,p=0,q=0,v,y,E,F=zzfxX.createBufferSource())=>{for(y=(e=99+e*g|0)+(l=l*g|0)+(f=f*g|0)+(z=z*g|0)+(X=X*g|0),r*=500*m/g**3,c*=m/g,x*=m/g,i*=g,s*=g;S<y;D[S++]=q)++p>100*d&&(p=0,q=I*n*Math.sin(P*c-A),q=C(q=h?1<h?2<h?3<h?Math.sin((q%m)**3):Math.max(Math.min(Math.tan(q),1),-1):1-(2*q/m%2+2)%2:1-4*Math.abs(Math.round(q/m)-q/m):Math.sin(q))*Math.abs(q)**o,q*=t*zzfxV*(S<e?S/e:S<e+l?1-(S-e)/l*(1-b):S<e+l+f?b:S<y-X?(y-S+z)/z*b:0),q=X?q/2+(X>S?0:(S<y-X?1:(S-y)/X)*D[S-X]/2):q),I+=1+B(u),P+=1+B(u),n+=M+=r,j&&++j>i&&(n+=x,w+=x,j=0),s&&++k>s&&(n=w,M=V,k=1,j=j||1);(E=zzfxX.createBuffer(1,D.length,g)).getChannelData(0).set(D),F.buffer=E,F.connect(zzfxX.destination),F.start()},zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)