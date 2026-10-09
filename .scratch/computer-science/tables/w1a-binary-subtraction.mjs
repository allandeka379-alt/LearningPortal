// Tables for lessons/data/binary-subtraction.md: column subtraction with borrowing, computed.
import { toBase, fromBase } from "../lib.mjs";
export function subSteps(a, b) {
  const w = a.length; const top = a.split("").map(Number); const bot = b.padStart(w, "0").split("").map(Number);
  const res = Array(w).fill(0); const borrowIn = Array(w).fill(0); const steps = [];
  let borrow = 0;
  for (let i = w - 1; i >= 0; i--) {
    let t = top[i] - borrow; let note = "";
    if (t < bot[i]) { t += 2; borrowIn[i] = 1; note = " (borrow 1 from the next column)"; borrow = 1; } else borrow = 0;
    res[i] = t - bot[i];
    steps.push(`col ${2 ** (w - 1 - i)}: top ${top[i]}${i < w - 1 && borrowIn[i + 1] ? " minus borrowed 1" : ""} - ${bot[i]} -> ${res[i]}${note}`);
  }
  const r = res.join(""); if (fromBase(r, 2) !== fromBase(a, 2) - fromBase(b, 2)) throw new Error("bad");
  return { r, steps, borrowIn };
}
for (const [a, b] of [["11010110", "01011011"], ["10110", "01011"], ["1100", "0111"]]) {
  const s = subSteps(a, b); console.log(a, b, "=", s.r, fromBase(a, 2), "-", fromBase(b, 2), "=", fromBase(s.r, 2)); console.log(s.steps.join("\n")); console.log("borrows from", s.borrowIn.join(""));
}
console.log("---- lesson examples");
for (const [a, b] of [["11101", "01010"], ["10100100", "00110110"], ["10000", "00011"]]) {
  const s = subSteps(a, b); console.log(a, b, "=", s.r, fromBase(a, 2), "-", fromBase(b, 2), "=", fromBase(s.r, 2)); console.log(s.steps.join("\n"));
}
console.log("---- md tables");
function md(a, b) {
  const w = a.length; const top = a.split("").map(Number); const bot = b.split("").map(Number);
  const rows = []; let borrow = 0;
  for (let i = w - 1; i >= 0; i--) {
    const avail = top[i] - borrow; let t = avail; let need = 0;
    if (t < bot[i]) { t += 2; need = 1; }
    rows.push(`| ${2 ** (w - 1 - i)} | ${top[i]} | ${borrow ? `${top[i]} − 1 = ${avail}` : "–"} | ${bot[i]} | ${need ? `yes: ${t} − ${bot[i]}` : "no"} | ${t - bot[i]} |`);
    borrow = need;
  }
  return "| Column | Top digit | After paying back a borrow | Bottom digit | Borrow from the left? | Result |\n|:-:|:-:|:-:|:-:|:-:|:-:|\n" + rows.join("\n");
}
console.log(md("11101", "01010")); console.log(md("10100100", "00110110"));
