import { neuron, leastSquares, mdTable, chk, same, round, codeBlock } from "../lib.mjs";
// forward pass: 2 inputs, 2 hidden ReLU neurons, 1 ReLU output
export const net = { h1: { w: [1, 2], b: -4 }, h2: { w: [-1, 1], b: 0 }, out: { w: [0.5, 1], b: -1 } };
export function forward(x, n = net) {
  const a = neuron(x, n.h1.w, n.h1.b, "relu"), b = neuron(x, n.h2.w, n.h2.b, "relu");
  const o = neuron([a.output, b.output], n.out.w, n.out.b, "relu");
  return { a, b, o };
}
const f = forward([2, 3]);
chk(f.a.sum, 4); chk(f.b.sum, 1); chk(f.o.output, 2);
const fwdTable = mdTable(["Neuron", "Inputs", "Weights", "Bias", "Weighted sum + bias", "Output (ReLU)"], [
  ["Hidden 1", "2, 3", "1, 2", -4, `1×2 + 2×3 − 4 = ${f.a.sum}`, f.a.output],
  ["Hidden 2", "2, 3", "−1, 1", 0, `−1×2 + 1×3 + 0 = ${f.b.sum}`, f.b.output],
  ["Output", `${f.a.output}, ${f.b.output}`, "0.5, 1", -1, `0.5×${f.a.output} + 1×${f.b.output} − 1 = ${f.o.sum}`, f.o.output],
]);
const actTable = mdTable(["Activation function", "Rule", "Output for sums −2, 0 and 3"], [
  ["Step", "1 if the sum is 0 or more, otherwise 0", [-2, 0, 3].map((s) => (s >= 0 ? 1 : 0)).join(", ")],
  ["ReLU", "the sum if positive, otherwise 0", [-2, 0, 3].map((s) => Math.max(0, s)).join(", ")],
  ["Sigmoid", "1 ÷ (1 + e^(−sum)), between 0 and 1", [-2, 0, 3].map((s) => round(1 / (1 + Math.exp(-s)), 2)).join(", ")],
]);
same([-2, 0, 3].map((s) => round(1 / (1 + Math.exp(-s)), 2)), [0.12, 0.5, 0.95]);
// one weight update by gradient descent on a single linear neuron out = w*x
const w = 0.5, x = 3, target = 6, lr = 0.1;
const out = w * x, err = target - out, w2 = w + lr * err * x, out2 = w2 * x;
chk(out, 1.5); chk(err, 4.5); chk(w2, 1.85); chk(round(out2, 3), 5.55);
chk(Math.abs(target - out2) < Math.abs(target - out) ? 1 : 0, 1);
const bpTable = mdTable(["Quantity", "Working", "Value"], [["Output", `${w} × ${x}`, out], ["Error", `${target} − ${out}`, err], ["Weight change", `${lr} × ${err} × ${x}`, round(lr * err * x, 2)], ["New weight", `${w} + ${round(lr * err * x, 2)}`, w2], ["New output", `${w2} × ${x}`, round(out2, 2)]]);
// regression
const xs = [1, 2, 3, 4, 5, 6], ys = [35, 42, 50, 53, 61, 68];
const ls = leastSquares(xs, ys);
chk(ls.intercept, 29); chk(round(ls.slope, 2), 6.43); chk(ls.intercept + ls.slope * 7, 74, 1e-9);
const n = xs.length, sx = xs.reduce((a, b) => a + b), sy = ys.reduce((a, b) => a + b), sxy = xs.reduce((a, v, i) => a + v * ys[i], 0), sxx = xs.reduce((a, v) => a + v * v, 0);
chk(sx, 21); chk(sy, 309); chk(sxy, 1194); chk(sxx, 91);
const sums = mdTable(["Hours x", "Score y", "x × y", "x²"], [...xs.map((v, i) => [v, ys[i], v * ys[i], v * v]), ["**Sum 21**", "**Sum 309**", `**Sum ${sxy}**`, `**Sum ${sxx}**`]]);
const slopeNum = n * sxy - sx * sy, slopeDen = n * sxx - sx * sx;
chk(slopeNum, 6 * 1194 - 21 * 309); chk(slopeDen, 6 * 91 - 441);
export const snips = { fwdTable, actTable, bpTable, sums, slopeNum: String(slopeNum), slopeDen: String(slopeDen), slope: String(round(ls.slope, 2)), icpt: String(ls.intercept), pred7: String(round(ls.intercept + ls.slope * 7, 1)), outFinal: String(f.o.output), w2: String(w2), n: String(n) };
if (process.argv[1].endsWith("w2a-machine-learning.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
