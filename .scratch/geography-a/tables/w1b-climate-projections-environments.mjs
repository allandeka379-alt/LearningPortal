import { rnd, chk } from "../lib.mjs";
const w={vl:1.4,l:1.8,i:2.7,h:3.6,vh:4.4}; const s={vl:0.38,l:0.44,i:0.56,h:0.68,vh:0.77};
console.log(rnd((w.vh-w.l)/w.vh*100,1), w.vh-w.vl, rnd((w.vh-w.vl)/w.vl*100,0));
console.log(s.vh-s.vl, rnd((s.vh-s.vl)/s.vl*100,0), s.vh/s.vl);
console.log(w.i-1.1);
