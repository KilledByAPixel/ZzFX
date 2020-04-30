// ZzFX - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force

// This build of zzfx is minified for used in tiny games.
// It has only a zzfx to play sounds and zzfxV to set volume.
// There is a small bit of optional code that increases compatibility.
// Feel free to minify it further for your own needs!

zzfxV=.3
zzfx=(I=1,J=.05,g=220,e=.1,f=.1,l=.2,m=0,K=1,r=0,z=0,t=0,u=0,n=0,A=0,B=0,C=0,v=0,h=0,c=2*Math.PI,b=44100,w=L=>L*2*Math.random()-L,M=r*=500*c/b**2,D=g*=(1+w(J))*c/b,E,p=[],F=0,G=0,d=0,k=1,H=0,a,x,y,q=zzfxX.createBufferSource())=>{e=50+e*b|0;f=f*b|0;l=l*b|0;h=h*b/1e3|0;z*=500*c/b**3;E=e+f+l;B*=c/b;t*=c/b;u=u*b|0;n=n*b|0;for(C*=c;d<E;p[d++]=a)a=F*g*Math.cos(G*B+C),a=m?1<m?2<m?3<m?Math.sign(Math.cos((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):2*a/c%2+(0>a?1:-1):1-4*Math.abs(Math.round(a/c)-a/c):Math.cos(a),a=Math.sign(a)*Math.abs(a)**K,x=d<e?d/e:d<e+f?1:1-(d-e-f)/l,a*=x*I*zzfxV,a=v?(a/v*9|0)*v/9:a,a=h?a/2+(h>d?0:(d<e+f?1:x)*p[d-h]/2):a,F+=1+w(A),G+=1+w(A),g+=r+=z,k&&++k>u&&(D+=t,g+=t,k=0),n&&++H>n&&(g=D,r=M,H=1,k=k||1);y=zzfxX.createBuffer(1,p.length,b);y.getChannelData(0).set(p);q.buffer=y;q.connect(zzfxX.destination);q.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.Z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.Z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s.stop=s.stop||(t=>zzfxX.noteOff(t)),s)