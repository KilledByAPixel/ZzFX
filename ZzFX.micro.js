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
(t=1,a=.05,e=220,n=0,f=0,z=.1,r=0,h=1,s=0,M=0,o=0,x=0,i=0,u=0,c=0,d=0,X=0,b=1,l=0,m=44100,B=[],C=zzfxX.createBufferSource(),P)=>{n=99+n*m,f*=m,z*=m,l*=m,X*=m;for(let C=2*Math.PI,P=t=>1+2*t*Math.random()-t,V=t=>0<t?1:-1,g=n+l+f+z+X,w=s*=500*C/m**2,A=e*=P(a)*C/m,D=V(c)*C/4,I=0,S=0,j=0,k=1,p=0,q=0,v=0;j<g;B[j++]=v)++q>100*d&&(q=0,v=I*e*Math.sin(S*c*C/m-D),v=V(v=r?1<r?2<r?3<r?Math.sin((v%C)**3):Math.max(Math.min(Math.tan(v),1),-1):1-(2*v/C%2+2)%2:1-4*Math.abs(Math.round(v/C)-v/C):Math.sin(v))*Math.abs(v)**h,v*=t*zzfxV*(j<n?j/n:j<n+l?1-(j-n)/l*(1-b):j<n+l+f?b:j<g-X?(g-j-X)/z*b:0),v=X?v/2+(X>j?0:(j<g-X?1:(j-g)/X)*B[j-X|0]/2):v),I+=P(u),S+=P(u),e+=s+=500*M*C/m**3,k&&++k>x*m&&(e+=o*C/m,A+=o*C/m,k=0),i&&++p>i*m&&(e=A,s=w,p=1,k=k||1);return(P=zzfxX.createBuffer(1,n+l+f+z+X,m)).getChannelData(0).set(B),C.buffer=P,C.connect(zzfxX.destination),C.start(),C},zzfxX=new AudioContext;

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)