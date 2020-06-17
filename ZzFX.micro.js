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
(t=1,a=.05,n=220,e=0,f=0,z=.1,h=0,M=1,r=0,o=0,s=0,x=0,i=0,c=0,u=0,d=0,X=0,b=1,m=0,B=2*Math.PI,C=44100,P=t=>2*t*Math.random()-t,V=t=>0<t?1:-1,g=r*=500*B/C**2,l=V(u)*B/4,w=n*=(1+P(a))*B/C,A=99+e*C|0,D=m*C|0,I=f*C|0,S=z*C|0,j=X*C|0,k=500*o*B/C**3,p=u*B/C,q=s*B/C,v=x*C,y=i*C,E=A+D+I+S+j,F=[],G=0,H=0,J=0,K=1,L=0,N=0,O=0,Q,R=zzfxX.createBufferSource(),T=zzfxX.createBuffer(1,E,C))=>{for(;J<E;F[J++]=O)++N>100*d&&(N=0,O=G*n*Math.sin(H*p-l),O=V(O=h?1<h?2<h?3<h?Math.sin((O%B)**3):Math.max(Math.min(Math.tan(O),1),-1):1-(2*O/B%2+2)%2:1-4*Math.abs(Math.round(O/B)-O/B):Math.sin(O))*Math.abs(O)**M,O*=t*zzfxV*(J<A?J/A:J<A+D?1-(J-A)/D*(1-b):J<A+D+I?b:J<E-j?(E-J-j)/S*b:0),O=j?O/2+(j>J?0:(J<E-j?1:(J-E)/j)*F[J-j]/2):O),G+=1+P(c),H+=1+P(c),n+=r+=k,K&&++K>v&&(n+=q,w+=q,K=0),y&&++L>y&&(n=w,r=g,L=1,K=K||1);T.getChannelData(0).set(F),R.buffer=T,R.connect(zzfxX.destination),R.start()},zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||s.noteOn,s)