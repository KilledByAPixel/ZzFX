// ZzFX - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force

// This build of zzfx is minified for used in tiny games.
// It has only a zzfx to play sounds and zzfxV to set volume.
// There is a small bit of optional code that increases compatibility.
// Feel free to minify it further for your own needs!

zzfxV=.3 // volume
zzfx=    // play sound
(I=1,J=.05,g=220,e=.1,f=.1,l=.1,m=0,K=1,p=0,y=0,q=0,z=0,r=0,A=0,t=0,L=0,h=0,c=2*Math.PI,b=44100,u=B=>2*B*Math.random()-B,M=p*=500*c/b**2,C=g*=(1+u(J))*c/b,N=(0<t?1:-1)*c/4,D,n=[],E=0,F=0,d=0,k=1,G=0,H=0,a=0,v,w,x=zzfxX.createBufferSource())=>{e=50+e*b|0;f=f*b|0;l=l*b|0;h=100*h|0;y*=500*c/b**3;D=e+f+l;t*=c/b;q*=c/b;z*=b;for(r*=b;d<D;n[d++]=a)++H>100*L&&(H=0,a=E*g*Math.sin(F*t+N),a=m?1<m?2<m?3<m?Math.sign(Math.sin((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/c%2+2)%2:1-4*Math.abs(Math.round(a/c)-a/c):Math.sin(a),a=Math.sign(a)*Math.abs(a)**K,v=d<e?d/e:d<e+f?1:1-(d-e-f)/l,a*=v*I*zzfxV,a=h?a/2+(h>d?0:(d<e+f?1:v)*n[d-h]/2):a),E+=1+u(A),F+=1+u(A),g+=p+=y,k&&++k>z&&(C+=q,g+=q,k=0),r&&++G>r&&(g=C,p=M,G=1,k=k||1);w=zzfxX.createBuffer(1,n.length,b);w.getChannelData(0).set(n);x.buffer=w;x.connect(zzfxX.destination);x.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s)