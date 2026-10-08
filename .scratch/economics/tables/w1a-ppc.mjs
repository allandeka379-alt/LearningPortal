import { table, fmt, check } from "../lib.mjs";
export function ppc(labels, x, y, xName, yName) {
  const oc = [];
  for (let i = 1; i < x.length; i++) {
    if (!(x[i] > x[i - 1] && y[i] < y[i - 1])) throw new Error("PPC must trade off");
    oc.push({ from: labels[i - 1], to: labels[i], dx: x[i] - x[i - 1], dy: y[i - 1] - y[i], per: (y[i - 1] - y[i]) / (x[i] - x[i - 1]) });
  }
  const md = table(["Combination", xName, yName], labels.map((l, i) => [l, x[i], y[i]]));
  return { md, oc };
}
const L = ["A", "B", "C", "D", "E", "F"], maize = [0, 20, 40, 60, 80, 100], tractors = [50, 48, 44, 36, 22, 0];
const r = ppc(L, maize, tractors, "Consumer goods (thousand units)", "Capital goods (thousand units)");
console.log(r.md);
console.log(table(["Movement", "Extra consumer goods (thousand units)", "Capital goods given up (thousand units)", "Capital goods given up per unit of consumer goods"], r.oc.map((o) => [`${o.from} to ${o.to}`, o.dx, o.dy, fmt(o.per, 1)])));
