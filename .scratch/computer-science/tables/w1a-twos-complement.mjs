// Tables for lessons/data/twos-complement.md
import { twos, fromTwos, toBase } from "../lib.mjs";
const inv = (s) => s.replace(/[01]/g, (c) => (c === "0" ? "1" : "0"));
for (const n of [-45, -100, 77]) {
  const pos = toBase(Math.abs(n), 2, 8); const i = inv(pos); const r = twos(n);
  console.log(n, "pos", pos, "inv", i, "+1 ->", toBase((parseInt(i, 2) + 1) % 256, 2, 8), "twos", r);
}
for (const s of ["11101010", "10000001", "01011100"]) console.log(s, fromTwos(s), [...s].map((c, k) => c === "1" ? (k === 0 ? -128 : 2 ** (7 - k)) : 0).filter(Boolean).join(" + "));
console.log(twos(-128), twos(127), twos(-1));
// -45 via -128 method: -128 + 83
console.log(-45 + 128, toBase(83, 2, 7));
