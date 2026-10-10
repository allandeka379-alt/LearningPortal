import { round, dpStr, sfStr, VM_RTP, AR, Mr } from "../lib.mjs";
const V = (t) => 72 * (1 - Math.exp(-0.025 * t));
const ts = [0, 20, 40, 60, 80, 100, 120, 160, 200];
console.log(ts.map((t) => `${t}:${round(V(t), 0)}`).join(" "));
const v20 = round(V(20), 0); console.log("avg first 20 s", v20 / 20, "avg 20-40", (round(V(40), 0) - v20) / 20);
// tangent at t=0 has gradient 72*0.025 = 1.8 cm3/s; a drawn tangent through (0,0) and (30,54)
console.log("initial rate", 72 * 0.025, "tangent pts (0,0),(30,54)", 54 / 30);
// mass of CaCO3 needed for 72 cm3 CO2 at rtp
console.log("n CO2", 0.072 / VM_RTP, "mass CaCO3", 0.072 / VM_RTP * Mr("CaCO3"));
// clock: times 40 s and 25 s -> 1/t
console.log("1/t", 1 / 40, 1 / 25, "ratio", 40 / 25);
