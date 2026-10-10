import { sfStr, rad, deg } from "../lib.mjs";
console.log("75deg", rad(75), "2.5rad", deg(2.5));
const w = (2 * Math.PI) / 86400; const r = 6.4e6 * Math.cos(rad(18)); console.log("Earth w", w, "r", r, "v", w * r, "equator", w * 6.4e6);
const v = 25, R = 0.3; const om = v / R; console.log("wheel w", om, "f", om / (2 * Math.PI), "rpm", (om / (2 * Math.PI)) * 60);
const om2 = (3000 * 2 * Math.PI) / 60; console.log("centrifuge", om2, om2 * 0.12);
