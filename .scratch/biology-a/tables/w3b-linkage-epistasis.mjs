// Lesson numbers for inheritance/linkage-epistasis.
import { chk } from "../lib.mjs";
const lk = [412, 398, 87, 103]; const tot = lk.reduce((s, x) => s + x, 0); chk(tot, 1000);
const rec = ((87 + 103) / tot) * 100; chk(rec, 19); console.log("recombinants %", rec);
// Labrador: B black / b brown; E deposits pigment, ee yellow.
const gam = ["BE", "Be", "bE", "be"]; const c = {};
for (const x of gam) for (const y of gam) {
  const E = x[1] === "E" || y[1] === "E"; const B = x[0] === "B" || y[0] === "B";
  const ph = !E ? "yellow" : B ? "black" : "brown"; c[ph] = (c[ph] ?? 0) + 1;
}
console.log(c); chk(c.black, 9); chk(c.brown, 3); chk(c.yellow, 4);
console.log("expected from 96:", 96 * 9 / 16, 96 * 3 / 16, 96 * 4 / 16);
