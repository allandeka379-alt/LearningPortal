// Local bit-string helpers for the w2a bit-manipulation lesson and slice (kept in tables/; checked against runAsm).
import { fromBase, toBase, fromTwos, runAsm, same, group } from "../lib.mjs";
const clean = (s) => String(s).replace(/\s+/g, "");
export const lsl = (s, n = 1) => { const c = clean(s); return (c + "0".repeat(n)).slice(n, n + c.length); };
export const lsr = (s, n = 1) => { const c = clean(s); return ("0".repeat(n) + c).slice(0, c.length); };
export const asr = (s, n = 1) => { const c = clean(s); return (c[0].repeat(n) + c).slice(0, c.length); };
export const rol = (s, n = 1) => { const c = clean(s); const k = n % c.length; return c.slice(k) + c.slice(0, k); };
export const ror = (s, n = 1) => { const c = clean(s); const k = n % c.length; return k ? c.slice(-k) + c.slice(0, -k) : c; };
const bitwise = (f) => (a, b) => { const x = clean(a), y = clean(b); return [...x].map((ch, i) => f(+ch, +y[i])).join(""); };
export const andS = bitwise((p, q) => p & q);
export const orS = bitwise((p, q) => p | q);
export const xorS = bitwise((p, q) => p ^ q);
export const notS = (s) => [...clean(s)].map((c) => (c === "1" ? "0" : "1")).join("");
export const g4 = group;
// self-check against the assembler
{
  const r = (op, v, arg) => toBase(runAsm([`LDM #${fromBase(v, 2)}`, `${op} ${arg}`, "END"]).acc, 2, 8);
  same(r("LSL", "00101101", "#2"), lsl("00101101", 2));
  same(r("LSR", "10110110", "#3"), lsr("10110110", 3));
  same(r("AND", "10110110", "B00001111"), andS("10110110", "00001111"));
  same(r("OR", "10110110", "B00001111"), orS("10110110", "00001111"));
  same(r("XOR", "10110110", "B00001111"), xorS("10110110", "00001111"));
}
