import { chk, round, seriesR, parallelR } from "../lib.mjs";
// Ohm's law examples
const s = seriesR(100, 200, 300);
const iS = 12 / s;
chk(s, 600);
chk(iS, 0.02);
const p = parallelR(60, 30);
chk(p, 20);
const iP = 12 / p;
chk(iP, 0.6);
const iBranch1 = 12 / 60, iBranch2 = 12 / 30;
const led = (9 - 2) / 0.02;
chk(led, 350);
const vDrop = [100, 200, 300].map((r) => r * iS);
export const snips = {
  s: String(s), iS: String(iS), iSmA: String(iS * 1000),
  v1: String(vDrop[0]), v2: String(vDrop[1]), v3: String(vDrop[2]),
  p: String(p), iP: String(iP), i1: String(iBranch1), i2: String(iBranch2),
  led: String(led), ledPowerMw: String(round(0.02 * 0.02 * led * 1000, 1)),
};
if (process.argv[1].endsWith("w1b-electronic-components.mjs")) console.log(snips);
