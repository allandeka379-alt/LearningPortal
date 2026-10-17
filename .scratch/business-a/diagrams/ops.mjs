// Operations: critical path network, inventory saw-tooth, unit cost and scale, capacity, added value.
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

// ---- 1. Critical path network (Chipo's hall) ----
{
  const acts = [
    ["A", 3, []], ["B", 4, ["A"]], ["C", 2, []], ["D", 6, ["B", "C"]],
    ["E", 3, ["D"]], ["F", 5, ["D"]], ["G", 4, ["E", "F"]], ["H", 2, ["G"]],
  ];
  const m = Object.fromEntries(acts.map(([n, d, p]) => [n, { n, d, p, succ: [] }]));
  acts.forEach(([n, , p]) => p.forEach((q) => m[q].succ.push(n)));
  for (const [n] of acts) { const a = m[n]; a.es = Math.max(0, ...a.p.map((q) => m[q].ef)); a.ef = a.es + a.d; }
  const dur = Math.max(...acts.map(([n]) => m[n].ef));
  for (const [n] of [...acts].reverse()) { const a = m[n]; a.lf = a.succ.length ? Math.min(...a.succ.map((s) => m[s].ls)) : dur; a.ls = a.lf - a.d; }
  for (const [n] of acts) { const a = m[n]; a.tf = a.ls - a.es; a.ff = (a.succ.length ? Math.min(...a.succ.map((s) => m[s].es)) : dur) - a.ef; }
  const want = { A: [0, 3, 0, 3, 0, 0], B: [3, 7, 3, 7, 0, 0], C: [0, 2, 5, 7, 5, 5], D: [7, 13, 7, 13, 0, 0], E: [13, 16, 15, 18, 2, 2], F: [13, 18, 13, 18, 0, 0], G: [18, 22, 18, 22, 0, 0], H: [22, 24, 22, 24, 0, 0] };
  for (const [n, w] of Object.entries(want)) { const a = m[n]; if ([a.es, a.ef, a.ls, a.lf, a.tf, a.ff].join() !== w.join()) throw new Error("CPA mismatch " + n); }
  if (dur !== 24) throw new Error("duration");
  const bw = 82, bh = 70, gx = 26, x0 = 8, rows = { 0: 28, 1: 140, 2: 252 };
  const pos = { A: [0, 1], B: [1, 1], C: [0, 2], D: [2, 1], E: [3, 0], F: [3, 1], G: [4, 1], H: [5, 1] };
  const bx = (n) => x0 + pos[n][0] * (bw + gx), by = (n) => rows[pos[n][1]];
  const W = x0 * 2 + 6 * bw + 5 * gx, H = 352;
  let b = "";
  const crit = (n) => m[n].tf === 0;
  const arrowTo = (a, c) => {
    const x1 = bx(a) + bw, y1 = by(a) + bh / 2, x2 = bx(c), y2 = by(c) + bh / 2;
    const col = crit(a) && crit(c) ? C.red : C.axis, w = crit(a) && crit(c) ? 2 : 1.6;
    const ar = col === C.red ? "arrow-red" : "arrow";
    if (y1 === y2) return D.arrow(x1, y1, x2, y2, { stroke: col, width: w });
    const xm = x1 + gx / 2;
    return `<path d="M${x1},${y1} L${xm},${y1} L${xm},${y2} L${x2},${y2}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linejoin="round" marker-end="url(#${ar})"/>`;
  };
  // C -> D needs to avoid crossing B: route under B then up
  b += `<path d="M${bx("C") + bw},${by("C") + bh / 2} L${bx("D") - gx / 2},${by("C") + bh / 2} L${bx("D") - gx / 2},${by("D") + bh / 2 + 14} L${bx("D")},${by("D") + bh / 2 + 14}" fill="none" stroke="${C.axis}" stroke-width="1.6" stroke-linejoin="round" marker-end="url(#arrow)"/>`;
  for (const [n, , p] of acts) for (const q of p) if (!(q === "C" && n === "D")) b += arrowTo(q, n);
  // E -> G: route over the top then down into G
  for (const [n] of acts) {
    const a = m[n], x = bx(n), y = by(n), cr = crit(n);
    b += D.rect(x, y, bw, bh, { fill: cr ? C.fillAmber : "#fff", stroke: cr ? C.red : C.axis, width: cr ? 2.6 : 1.6, r: 6 });
    b += D.text(x + bw / 2, y + 16, `${n}: ${a.d} days`, { anchor: "middle", size: 12, weight: 700 });
    b += D.text(x + 6, y + 32, `ES ${a.es}`, { size: 11 }) + D.text(x + bw - 6, y + 32, `EF ${a.ef}`, { size: 11, anchor: "end" });
    b += D.text(x + 6, y + 47, `LS ${a.ls}`, { size: 11 }) + D.text(x + bw - 6, y + 47, `LF ${a.lf}`, { size: 11, anchor: "end" });
    b += D.text(x + bw / 2, y + 63, `float ${a.tf}`, { anchor: "middle", size: 11, fill: cr ? C.red : C.muted, weight: cr ? 700 : 400 });
  }
  b += D.text(8, 22, "Red boxes and arrows: critical path A, B, D, F, G, H (float 0), 24 days", { size: 13, weight: 700, fill: C.red });
  b += D.text(8, 344, "ES, EF: earliest start and finish. LS, LF: latest start and finish (days).", { size: 12, fill: C.muted });
  const alt = "Network for Chipo's hall: A (3 days), B (4), D (6), F (5), G (4) and H (2) all have zero float and form the critical path of 24 days; C (2 days, earliest start 0, latest start 5) has 5 days of float and E (3 days, earliest start 13, latest start 15) has 2 days of float.";
  const cap = "Figure: the hall project as a network with earliest and latest times and float for each activity";
  await D.figure(FAM, "critical-path-network", D.svg(W, H, b), { alt, caption: cap });
  place(L("operations/critical-path"), "5. C has 5 days of float", D.md("critical-path-network", alt, cap), { block: true });
}

// ---- 2. Inventory saw-tooth (cement) ----
{
  const usage = 30, lead = 4, buffer = 60, qty = 300;
  const rol = usage * lead + buffer, max = buffer + qty;
  if (rol !== 180 || max !== 360) throw new Error("inventory values");
  const daysToRol = (max - rol) / usage; // 6
  const cycle = lead + daysToRol; // 10
  const pts = [[0, max]];
  let t0 = 0;
  for (let c = 0; c < 2; c += 1) { pts.push([t0 + cycle, buffer]); pts.push([t0 + cycle, max]); t0 += cycle; }
  pts.push([t0 + 4, max - usage * 4]); // continue to day 24 (stock 240)
  const xMax = 24;
  const ax = D.axes({ x: [0, xMax], y: [0, 420], w: 620, h: 420, xTicks: 2, yTicks: 60, xLabel: "Day", yLabel: "Stock (bags of cement)", pad: { l: 64, r: 20, t: 34, b: 56 } });
  let b = ax.frame;
  b += D.rect(ax.X(daysToRol), ax.Y(rol), ax.X(cycle) - ax.X(daysToRol), ax.Y(buffer) - ax.Y(rol), { fill: C.fillAmber, stroke: "none" });
  b += ax.line([[0, max], [xMax, max]], { stroke: C.muted, dash: true, width: 1.6 });
  b += ax.line([[0, rol], [xMax, rol]], { stroke: C.amber, dash: true, width: 1.6 });
  b += ax.line([[0, buffer], [xMax, buffer]], { stroke: C.red, dash: true, width: 1.6 });
  b += ax.line(pts, { stroke: C.blue, width: 3 });
  b += ax.label(0, max, "Maximum 360", { anchor: "start", dx: 8, dy: -6, size: 13, weight: 700, fill: C.muted });
  b += ax.label(0, rol, "Re-order level 180", { anchor: "start", dx: 8, dy: -6, size: 13, weight: 700, fill: C.amber });
  b += ax.label(0, buffer, "Buffer stock 60", { anchor: "start", dx: 8, dy: -6, size: 13, weight: 700, fill: C.red });
  b += ax.point(daysToRol, rol, { r: 5, stroke: C.amber });
  b += ax.tag(daysToRol - 0.3, 130, "order placed, day 6", { anchor: "end", size: 12 });
  b += ax.point(cycle, buffer, { r: 5, stroke: C.red });
  b += ax.tag(cycle + 0.3, 405, "delivery of 300 bags, day 10", { anchor: "start", size: 12 });
  b += D.text(ax.X(8.9), ax.Y(150), "lead time", { anchor: "middle", size: 12, weight: 700 });
  b += D.text(ax.X(8.9), ax.Y(150) + 15, "4 days", { anchor: "middle", size: 12, weight: 700 });
  const alt = "Inventory control chart for Chipo's cement: stock falls 30 bags a day from the maximum of 360, reaches the re-order level of 180 on day 6 when the order is placed, and falls to the buffer of 60 bags when the delivery of 300 bags arrives after the 4-day lead time on day 10, lifting stock back to 360.";
  const cap = "Figure: the inventory control chart for cement (usage 30 a day, lead time 4 days, buffer 60, order 300)";
  await D.figure(FAM, "inventory-control-chart", D.svg(620, 420, b), { alt, caption: cap });
  place(L("operations/inventory-control"), "| Day 12 | 300 |", D.md("inventory-control-chart", alt, cap), { block: true });
}

// ---- 3. Unit cost and scale (bottler) ----
{
  const rows = [[10000, 90000], [20000, 150000], [40000, 240000], [80000, 520000]].map(([q, tc]) => [q, tc / q]);
  const exp = [9, 7.5, 6, 6.5];
  rows.forEach(([, u], i) => { if (Math.abs(u - exp[i]) > 1e-9) throw new Error("unit cost"); });
  const ax = D.axes({ x: [0, 90000], y: [0, 10], w: 620, h: 420, xTicks: 10000, yTicks: 2, xLabel: "Output (units)", yLabel: "Cost per unit (US$)", pad: { l: 64, r: 24, t: 34, b: 56 }, xFormat: (v) => (v === 0 ? "0" : v / 1000 + "k") });
  let b = ax.frame;
  b += D.rect(ax.X(0), ax.Y(10), ax.X(40000) - ax.X(0), ax.Y(0) - ax.Y(10), { fill: C.fillGreen, stroke: "none" });
  b += D.rect(ax.X(40000), ax.Y(10), ax.X(90000) - ax.X(40000), ax.Y(0) - ax.Y(10), { fill: "#fde3e0", stroke: "none" });
  b = ax.frame + b.replace(ax.frame, "");
  b += ax.line(rows, { stroke: C.blue, width: 3 });
  rows.forEach(([q, u]) => { b += ax.point(q, u, { r: 5, stroke: C.blue }); b += ax.label(q, u, `US$${u.toFixed(2)}`, { anchor: "start", dx: 10, dy: -12, size: 13, weight: 700 }); });
  b += D.text(ax.X(20000), ax.Y(0.8), "Economies of scale:", { anchor: "middle", size: 13, weight: 700, fill: C.green });
  b += D.text(ax.X(20000), ax.Y(0.8) + 16, "unit cost falls", { anchor: "middle", size: 13, fill: C.green });
  b += D.text(ax.X(65000), ax.Y(0.8), "Diseconomies of scale:", { anchor: "middle", size: 13, weight: 700, fill: C.red });
  b += D.text(ax.X(65000), ax.Y(0.8) + 16, "unit cost rises", { anchor: "middle", size: 13, fill: C.red });
  b += D.line(ax.X(40000), ax.Y(6), ax.X(40000), ax.Y(0), { stroke: C.muted, dash: true, width: 1.4 });
  const alt = "Unit cost against output for the bottler: cost per unit falls from US$9.00 at 10,000 units to US$7.50 at 20,000 and US$6.00 at 40,000 (economies of scale), then rises to US$6.50 at 80,000 units (diseconomies of scale); the lowest cost, and best scale, is about 40,000 units.";
  const cap = "Figure: cost per unit at four outputs, showing economies then diseconomies of scale";
  await D.figure(FAM, "unit-cost-scale-curve", D.svg(620, 420, b), { alt, caption: cap });
  place(L("operations/location-scale"), "**Judgement.** The best scale on these figures is about 40,000 units", D.md("unit-cost-scale-curve", alt, cap), { block: true });
}

// ---- 4. Capacity utilisation and unit cost (pottery) ----
{
  const cap_ = 10000, fc = 24000, vc = 3, price = 6.5;
  const be = fc / (price - vc);
  const rows = [4000, 6000, 8000, 10000].map((q) => [q, fc / q + vc]);
  const exp = [9, 7, 6, 5.4];
  rows.forEach(([, u], i) => { if (Math.abs(u - exp[i]) > 1e-9) throw new Error("pottery"); });
  const ax = D.axes({ x: [2000, 10000], y: [0, 14], w: 620, h: 420, xTicks: [2000, 4000, 6000, 8000, 10000], yTicks: 2, xLabel: "Output a month (units)", yLabel: "Cost per unit (US$)", pad: { l: 64, r: 28, t: 34, b: 70 }, xFormat: (v) => v.toLocaleString("en-GB") });
  let b = ax.frame;
  b += ax.area((q) => fc / q + vc, () => price, [3000, be], { fill: "#fde3e0" });
  b += ax.area(() => price, (q) => fc / q + vc, [be, 10000], { fill: C.fillGreen });
  b += ax.line([[2000, price], [10000, price]], { stroke: C.amber, width: 2, dash: true });
  b += ax.label(10000, price, "Price US$6.50", { anchor: "end", dy: -8, size: 13, weight: 700, fill: C.amber });
  b += ax.plot((q) => fc / q + vc, { domain: [3000, 10000], stroke: C.blue, width: 3 });
  rows.forEach(([q, u]) => { b += ax.point(q, u, { r: 5, stroke: C.blue }); b += ax.label(q, u, `${u.toFixed(2)}`, { anchor: q === 10000 ? "end" : "start", dx: q === 10000 ? -10 : 12, dy: 24, size: 13, weight: 700 }); });
  b += ax.guides(be, price);
  b += ax.tag(be, 1.4, `Break-even ${Math.round(be).toLocaleString("en-GB")} units (69%)`, { anchor: "middle", dx: 0, size: 12 });
  b += D.text(ax.X(4900), ax.Y(11), "Loss: cost above price", { size: 13, weight: 700, fill: C.red }) + D.text(ax.X(8800), ax.Y(6.1) + 5, "Profit", { anchor: "middle", size: 13, weight: 700, fill: C.green });
  for (const [q] of rows) b += D.text(ax.X(q), ax.Y(0.65), `${q / cap_ * 100}%`, { anchor: "middle", size: 12, fill: C.muted });
  b += D.text(ax.X(2000) + 8, ax.Y(0.65), "Capacity used:", { size: 12, fill: C.muted });
  const alt = "Unit cost against capacity used for the pottery (maximum 10,000 mugs, fixed cost US$24,000, variable cost US$3): cost per mug falls from US$9.00 at 40% to US$7.00 at 60%, US$6.00 at 80% and US$5.40 at 100%; against the US$6.50 price the pottery loses money below about 6,857 mugs (69% of capacity) and profits above it.";
  const cap = "Figure: spreading fixed costs over more output lowers the cost per mug as capacity utilisation rises";
  await D.figure(FAM, "capacity-utilisation-unit-cost", D.svg(620, 420, b), { alt, caption: cap });
  place(L("operations/capacity-outsourcing"), "4. **Interpretation.** If the mugs sell at", D.md("capacity-utilisation-unit-cost", alt, cap), { block: true });
}

// ---- 5. Added value along the maize supply chain ----
{
  const st = [["Farm\n(primary)", 0.12, 0.30], ["Mill\n(secondary)", 0.30, 0.50], ["Packing and shop\n(tertiary)", 0.50, 0.75]];
  const W = 620, H = 400;
  const ax = D.axes({ x: [0, 3], y: [0, 0.9], w: W, h: H, xTicks: [], yTicks: 0.1, yLabel: "US$ per kg", origin: false, arrows: false, pad: { l: 60, r: 24, t: 34, b: 66 }, yFormat: (v) => v.toFixed(2) });
  let b = ax.frame;
  const bw = (ax.X(1) - ax.X(0)) * 0.5;
  st.forEach(([n, inp, price], i) => {
    const cx = ax.X(i + 0.5), va = Math.round((price - inp) * 100) / 100;
    b += D.rect(cx - bw / 2, ax.Y(inp), bw, ax.Y(0) - ax.Y(inp), { fill: C.fillGrey, stroke: C.axis, width: 1.4 });
    b += D.rect(cx - bw / 2, ax.Y(price), bw, ax.Y(inp) - ax.Y(price), { fill: C.fillGreen, stroke: C.green, width: 1.8 });
    b += D.text(cx, ax.Y(inp / 2) + 5, `inputs ${inp.toFixed(2)}`, { anchor: "middle", size: 12 });
    b += D.text(cx, ax.Y((inp + price) / 2) - 2, `value added
${va.toFixed(2)}`, { anchor: "middle", size: 12, weight: 700, fill: C.green });
    b += D.text(cx, ax.Y(price) - 8, `price ${price.toFixed(2)}`, { anchor: "middle", size: 13, weight: 700 });
    b += D.text(cx, ax.Y(0) + 20, n, { anchor: "middle", size: 13 });
  });
  const alt = "Added value along the maize meal chain, per kilogram: the farm buys inputs worth US$0.12 and sells at US$0.30 (value added US$0.18); the mill buys at US$0.30 and sells at US$0.50 (US$0.20); packing and the shop buy at US$0.50 and sell at US$0.75 (US$0.25); total value added is US$0.63.";
  const cap = "Figure: each stage buys inputs and adds value; the three amounts of value added total US$0.63 a kilogram";
  await D.figure(FAM, "added-value-maize-chain", D.svg(W, H, b), { alt, caption: cap });
  place(L("operations/transformation"), "4. Added value is not profit", D.md("added-value-maize-chain", alt, cap), { block: true });
}
