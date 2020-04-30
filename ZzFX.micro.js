// ZzFX - Zuper Zmall Zound Zynth - MIT License - Copyright 2019 Frank Force

// This build of zzfx is minified for used in tiny games.
// It has only a zzfx to play sounds and zzfxV to set volume.
// There is a small bit of optional code that increases compatibility.
// Feel free to minify it further for your own needs!

zzfxV=.3
zzfxP=(J=1,K=.05,g=220,e=.1,f=.1,l=.1,m=0,L=1,q=0,y=0,r=0,z=0,t=0,A=0,B=0,C=0,n=0,h=0,c=2*Math.PI,b=44100,u=D=>2*D*Math.random()-D,M=q*=500*c/b**2,E=g*=(1+u(K))*c/b,F,p=[],G=0,H=0,d=0,k=1,I=0,N=0,a=0,v,w,x=zzfxX.createBufferSource())=>{e=50+e*b|0;f=f*b|0;l=l*b|0;h=h*b/1E3|0;y*=500*c/b**3;F=e+f+l;B*=c/b;r*=c/b;z*=b;t*=b;for(C*=c;d<F;p[d++]=a)++N>n&&(a=G*g*Math.cos(H*B+C),a=m?1<m?2<m?3<m?Math.sign(Math.cos((a%c)**3)):Math.max(Math.min(Math.tan(a),1),-1):1-(2*a/c%2+2)%2:1-4*Math.abs(Math.round(a/c)-a/c):Math.cos(a),a=Math.sign(a)*Math.abs(a)**L,v=d<e?d/e:d<e+f?1:1-(d-e-f)/l,a*=v*J*zzfxV,a=n?(a/n*9|0)*n/9:a,a=h?a/2+(h>d?0:(d<e+f?1:v)*p[d-h]/2):a),G+=1+u(A),H+=1+u(A),g+=q+=y,k&&++k>z&&(E+=r,g+=r,k=0),t&&++I>t&&(g=E,q=M,I=1,k=k||1);w=zzfxX.createBuffer(1,p.length,b);w.getChannelData(0).set(p);x.buffer=w;x.connect(zzfxX.destination);x.start()}
zzfxX=new AudioContext

// fix compatibility issues with old web audio (optional)
// if this is used, you must remove the zzfxX=new AudioContext line above!
//zzfxX=new(window.AudioContext||webkitAudioContext);zzfxX.Z=zzfxX.createBufferSource;zzfxX.createBufferSource=(s=zzfxX.Z())=>(s.start=s.start||(t=>zzfxX.noteOn(t)),s)