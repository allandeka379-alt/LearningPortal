// Helpers: adjacency matrix/list, hash tables with probing and chaining, stack-in-array and queue-in-linked-list traces.
import { mdTable, hashMod, chk, same, codeBlock } from "../lib.mjs";
export function adjacency(nodes, edges, directed = false) {
  const idx = Object.fromEntries(nodes.map((n, i) => [n, i]));
  const m = nodes.map(() => nodes.map(() => 0));
  const list = Object.fromEntries(nodes.map((n) => [n, []]));
  for (const [a, b, w] of edges) { m[idx[a]][idx[b]] = w; list[a].push([b, w]); if (!directed) { m[idx[b]][idx[a]] = w; list[b].push([a, w]); } }
  return { m, list };
}
export const matrixMd = (nodes, m, blank = "–") => mdTable(["", ...nodes], nodes.map((n, i) => [`**${n}**`, ...m[i].map((v) => (v === 0 ? blank : v))]));
export const listMd = (nodes, list) => mdTable(["Node", "Neighbours (weight)"], nodes.map((n) => [n, list[n].length ? list[n].map(([b, w]) => `${b} (${w})`).join(", ") : "none"]));
export function hashProbe(keys, size) {
  const t = Array(size).fill(null); const steps = [];
  for (const k of keys) { let h = hashMod(k, size), probes = 1; const first = h; while (t[h] !== null) { h = (h + 1) % size; probes++; } t[h] = k; steps.push({ key: k, hash: first, slot: h, probes }); }
  return { t, steps };
}
export function hashChain(keys, size) { const t = Array.from({ length: size }, () => []); for (const k of keys) t[hashMod(k, size)].push(k); return t; }
export const slotsMd = (t, size) => mdTable(["Slot", "Contents"], t.map((v, i) => [i, v ?? "(empty)"]));
export const chainMd = (t) => mdTable(["Slot", "Chain"], t.map((v, i) => [i, v.length ? v.join(" → ") : "(empty)"]));
export function stackTrace(ops, size = 6) {
  const a = Array(size).fill(""); let top = -1; const rows = [];
  for (const [op, v] of ops) { if (op === "push") { if (top === size - 1) throw new Error("full"); a[++top] = v; } else { if (top < 0) throw new Error("empty"); a[top--] = a[top + 1] && ""; } rows.push([op === "push" ? `push ${v}` : "pop", top, a.map((x) => (x === "" ? "·" : x)).join(" ")]); }
  return rows;
}
export function queueTrace(ops) {
  const q = []; const rows = [];
  for (const [op, v] of ops) { let out = ""; if (op === "enqueue") q.push(v); else out = String(q.shift()); rows.push([op === "enqueue" ? `enqueue ${v}` : `dequeue (returns ${out})`, q[0] ?? "null", q.at(-1) ?? "null", q.length ? q.join(" → ") + " → null" : "empty"]); }
  return rows;
}
