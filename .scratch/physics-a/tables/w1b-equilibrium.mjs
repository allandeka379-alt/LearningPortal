import { sfStr, rad, deg } from "../lib.mjs";
// WE1 plank bridge
const L=4.0,Wp=300,Wm=700,x=1.0; const RB=(Wp*L/2+Wm*x)/L; console.log("WE1 RB",RB,"RA",Wp+Wm-RB);
// WE2 hinged boom + cable
const l=1.2,Wr=40,Ws=60,th=30; const T=(Wr*l/2+Ws*l)/(l*Math.sin(rad(th))); const H=T*Math.cos(rad(th)); const V=Wr+Ws-T*Math.sin(rad(th));
console.log("WE2 T",T,"H",sfStr(H,3),"V",V,"R",sfStr(Math.hypot(H,V),3),"ang",sfStr(deg(Math.atan2(V,H)),2));
// WE3 ladder
const Ll=5.0,W=200,a=60; const Nw=W*(Ll/2)*Math.cos(rad(a))/(Ll*Math.sin(rad(a))); console.log("WE3 Nw",sfStr(Nw,3), "min mu", sfStr(Nw/W,3));
// WE4 two strings 30,60 deg
const Wl=50; const T1=Wl/2, T2=T1*Math.cos(rad(30))/Math.cos(rad(60)); console.log("WE4",T1,sfStr(T2,3), "check", T1*Math.sin(rad(30))+T2*Math.sin(rad(60)));
