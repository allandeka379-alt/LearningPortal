// Finance and investment: cash-flow forecast, working capital, variances, break-even plans, payback, NPV.
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

const money = (v) => "US$" + v.toLocaleString("en-GB", { maximumFractionDigits: 2 });
const num = (v) => v.toLocaleString("en-GB");

/** Waterfall: steps [{ l, v, total? }]; totals are absolute, others are changes (positive = favourable/up). */
function waterfall(steps, { y0, y1, w = 640, h = 440, step = 1000, tagA = "A", tagF = "F" }) {
  const ax = D.axes({ x: [0, steps.length], y: [y0, y1], w, h, xTicks: [], yTicks: step, yLabel: "Profit (US$)", origin: false, arrows: false, pad: { l: 72, r: 16, t: 34, b: 64 } });
  let b = ax.frame, run = 0;
  const bw = (ax.X(1) - ax.X(0)) * 0.62;
  steps.forEach((s, i) => {
    const cx = ax.X(i + 0.5);
    let a, z, fill, stroke, lab;
    if (s.total) { a = y0; z = s.v; run = s.v; fill = C.fillBlue; stroke = C.blue; lab = num(s.v); }
    else { a = run; z = run + s.v; run = z; fill = s.v >= 0 ? C.fillGreen : "#fde3e0"; stroke = s.v >= 0 ? C.green : C.red; lab = `${num(Math.abs(s.v))} ${s.v >= 0 ? tagF : tagA}`; }
    const top = Math.max(a, z), bot = Math.min(a, z);
    b += D.rect(cx - bw / 2, ax.Y(top), bw, Math.max(2, ax.Y(bot) - ax.Y(top)), { fill, stroke, width: 1.8 });
    b += D.text(cx, ax.Y(top) - 7, lab, { anchor: "middle", size: 13, weight: 700, fill: s.total ? C.blue : stroke });
    b += D.text(cx, ax.Y(y0) + 19, s.l, { anchor: "middle", size: 12 });
    if (i < steps.length - 1) b += D.line(cx + bw / 2, ax.Y(run), ax.X(i + 1.5) - bw / 2, ax.Y(run), { stroke: C.muted, width: 1, dash: true });
  });
  b += D.text(ax.X(steps.length), 20, `Axis starts at US$${num(y0)}`, { anchor: "end", size: 12, fill: C.muted }) + D.text(ax.X(steps.length), 36, "A = adverse, F = favourable", { anchor: "end", size: 12, fill: C.muted });
  return { svg: D.svg(w, h, b), end: run };
}

// ---- 1. Cash-flow: original and amended closing balances ----
{
  const open = 4000;
  const nets = { orig: [-350, 250, -5150, 1550, 2450, 1800], late: [-600, -250, -5650, 1050, 1450, 2300] };
  const close = (n) => { let r = open; return n.map((v) => (r += v)); };
  const co = close(nets.orig), cl = close(nets.late);
  if (co.join() !== "3650,3900,-1250,300,2750,4550" || cl.join() !== "3400,3150,-2500,-1450,0,2300") throw new Error("cash flow mismatch");
  const mo = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const ax = D.axes({ x: [0.5, 6.5], y: [-3000, 6000], w: 620, h: 420, xTicks: [1, 2, 3, 4, 5, 6], yTicks: 1000, xLabel: "", yLabel: "Closing balance (US$)", pad: { l: 74, r: 24, t: 34, b: 50 }, xFormat: (v) => mo[v - 1], yFormat: (v) => num(v) });
  let b = D.rect(ax.X(0.5), ax.Y(0), ax.X(6.5) - ax.X(0.5), ax.Y(-3000) - ax.Y(0), { fill: "#fde3e0", stroke: "none" });
  b += ax.frame;
  b += ax.line(co.map((v, i) => [i + 1, v]), { stroke: C.blue, width: 3 });
  b += ax.line(cl.map((v, i) => [i + 1, v]), { stroke: C.red, width: 3, dash: true });
  co.forEach((v, i) => { b += ax.point(i + 1, v, { r: 4.5, stroke: C.blue }); });
  cl.forEach((v, i) => { b += ax.point(i + 1, v, { r: 4.5, stroke: C.red }); });
  b += ax.label(3, co[2], num(co[2]).replace("-", "(") + ")", { dx: 12, dy: 5, size: 13, weight: 700, fill: C.blue });
  b += ax.label(3, cl[2], "(" + num(-cl[2]) + ")", { dx: 12, dy: 5, size: 13, weight: 700, fill: C.red });
  b += ax.label(4, cl[3], "(" + num(-cl[3]) + ")", { dx: 12, dy: 16, size: 13, weight: 700, fill: C.red });
  b += ax.label(6, co[5], num(co[5]), { dx: -8, dy: -10, size: 13, weight: 700, fill: C.blue, anchor: "end" });
  b += ax.label(6, cl[5], num(cl[5]), { dx: 0, dy: -14, size: 13, weight: 700, fill: C.red, anchor: "middle" });
  b += ax.label(4.15, -2600, "Overdraft zone (below zero)", { size: 13, weight: 700, fill: C.red });
  const lx = ax.X(0.7), ly = ax.Y(5800);
  b += D.line(lx, ly, lx + 30, ly, { stroke: C.blue, width: 3 }) + D.text(lx + 36, ly + 4, "Original forecast", { size: 13 });
  b += D.line(lx, ly + 20, lx + 30, ly + 20, { stroke: C.red, width: 3, dash: true }) + D.text(lx + 36, ly + 24, "Customer pays after two months", { size: 13 });
  const alt = "Closing cash balances month by month: the original forecast dips to an overdraft of US$1,250 in March and recovers to US$4,550 by June; when a major customer pays after two months the overdraft doubles to US$2,500 in March, is still US$1,450 in April, reaches nil in May and US$2,300 in June.";
  const cap = "Figure: closing cash balance in the original forecast and when one customer pays a month later";
  await D.figure(FAM, "cash-flow-closing-balances", D.svg(620, 420, b), { alt, caption: cap });
  place(L("finance/cash-flow-forecast"), "3. Slower payment by one customer turns", D.md("cash-flow-closing-balances", alt, cap), { block: true });
}

// ---- 2. Working capital composition ----
{
  const ca = [["Inventory", 8400, C.fillBlue], ["Receivables", 6100, C.fillGrey], ["Cash", 1500, C.fillGreen]];
  const cl = [["Payables", 5200, C.fillAmber], ["Overdraft", 3000, "#fde3e0"], ["Tax owing", 1000, C.fillGrey]];
  const tca = ca.reduce((s, x) => s + x[1], 0), tcl = cl.reduce((s, x) => s + x[1], 0);
  if (tca !== 16000 || tcl !== 9200) throw new Error("wc totals");
  const W = 600, H = 420;
  const ax = D.axes({ x: [0, 4], y: [0, 18000], w: W, h: H, xTicks: [], yTicks: 2000, yLabel: "US$", origin: false, arrows: false, pad: { l: 66, r: 20, t: 34, b: 56 }, yFormat: num });
  let b = ax.frame;
  const stack = (rows, cx, bw, total, title) => {
    let base = 0;
    rows.forEach(([n, v, f]) => {
      b += D.rect(cx - bw / 2, ax.Y(base + v), bw, ax.Y(base) - ax.Y(base + v), { fill: f, stroke: C.axis, width: 1.4 });
      b += D.text(cx, ax.Y(base + v / 2) + 4, `${n} ${num(v)}`, { anchor: "middle", size: 13 });
      base += v;
    });
    b += D.text(cx, ax.Y(total) - 8, `${title} ${num(total)}`, { anchor: "middle", size: 14, weight: 700 });
  };
  const bw = (ax.X(1) - ax.X(0)) * 0.8;
  stack(ca, ax.X(1), bw, tca, "Current assets");
  stack(cl, ax.X(3), bw, tcl, "Current liabilities");
  const x = ax.X(2), y1 = ax.Y(tca), y2 = ax.Y(tcl);
  b += D.line(ax.X(1) + bw / 2, y1, ax.X(3) - bw / 2, y1, { stroke: C.muted, dash: true, width: 1.2 });
  b += D.line(ax.X(3) - bw / 2, y2, ax.X(3) + bw / 2, y2, { stroke: C.muted, dash: true, width: 1.2 });
  b += D.line(x, y1, x, y2, { stroke: C.blue, width: 2.4, arrow: true, arrowStart: true });
  b += D.text(x + 8, (y1 + y2) / 2 - 4, "Working capital", { size: 13, weight: 700, fill: C.blue }) + D.text(x + 8, (y1 + y2) / 2 + 13, `${num(tca - tcl)}`, { size: 14, weight: 700, fill: C.blue });
  b += D.text(ax.X(1), ax.Y(0) + 20, "only 1,500 of it is cash", { anchor: "middle", size: 12, fill: C.muted });
  const alt = "Nyasha's bakery: current assets of US$16,000 (inventory 8,400, receivables 6,100, cash 1,500) less current liabilities of US$9,200 (payables 5,200, overdraft 3,000, tax 1,000) leave working capital of US$6,800, but only US$1,500 of the assets is cash while US$3,000 is an overdraft repayable on demand.";
  const cap = "Figure: working capital is current assets less current liabilities, but most of the assets are not cash";
  await D.figure(FAM, "working-capital-bakery", D.svg(W, H, b), { alt, caption: cap });
  place(L("finance/working-capital"), "4. The figure is positive, but only", D.md("working-capital-bakery", alt, cap), { block: true });
}

// ---- 3. Variance bridges ----
{
  const r1 = waterfall([
    { l: "Budget\nprofit", v: 16000, total: true }, { l: "Sales\nrevenue", v: -1500 }, { l: "Direct\nmaterials", v: -1500 },
    { l: "Direct\nlabour", v: 600 }, { l: "Fixed\noverheads", v: -400 }, { l: "Actual\nprofit", v: 13200, total: true },
  ], { y0: 10000, y1: 17000 });
  if (r1.end !== 13200 || 16000 - 1500 - 1500 + 600 - 400 !== 13200) throw new Error("bridge 1");
  const alt1 = "Profit bridge for Sengwa Furniture: budget profit of US$16,000 falls by US$1,500 adverse on sales revenue, US$1,500 adverse on materials and US$400 adverse on fixed overheads, and rises by US$600 favourable on labour, giving actual profit of US$13,200, US$2,800 adverse overall.";
  const cap1 = "Figure: from budgeted to actual profit, variance by variance (A adverse, F favourable)";
  await D.figure(FAM, "variance-bridge-desks", r1.svg, { alt: alt1, caption: cap1 });
  place(L("finance/budgets-variances"), "7. **Judgement.** The comparison is not fair", D.md("variance-bridge-desks", alt1, cap1), { block: true });

  const r2 = waterfall([
    { l: "Original\nbudget", v: 16000, total: true }, { l: "200 fewer\ndesks", v: -1200 }, { l: "Flexed\nbudget", v: 14800, total: true },
    { l: "Sales\nrevenue", v: 900 }, { l: "Direct\nmaterials", v: -2220 }, { l: "Direct\nlabour", v: 120 }, { l: "Fixed\noverheads", v: -400 }, { l: "Actual\nprofit", v: 13200, total: true },
  ], { y0: 10000, y1: 17000 });
  if (r2.end !== 13200 || 14800 + 900 - 2220 + 120 - 400 !== 13200) throw new Error("bridge 2");
  const alt2 = "Flexed budget bridge: the original profit budget of US$16,000 falls US$1,200 to US$14,800 because 200 fewer desks were made; against the flexed budget, revenue is US$900 favourable, materials US$2,220 adverse, labour US$120 favourable and fixed overheads US$400 adverse, giving actual profit of US$13,200, so the true profit variance is US$1,600 adverse and materials are the real problem.";
  const cap2 = "Figure: separating the volume effect (US$1,200) from the cost and price variances once the budget is flexed";
  await D.figure(FAM, "variance-bridge-flexed", r2.svg, { alt: alt2, caption: cap2 });
  place(L("finance/budgets-variances"), "**Judgement.** The sales shortfall is partly a matter of volume", D.md("variance-bridge-flexed", alt2, cap2), { block: true });
}

// ---- 4. Break-even: profit lines for the three plans ----
{
  const plans = [
    { n: "Current", fc: 15000, c: 1.5, q: 12500, col: C.blue, dash: false },
    { n: "Price cut", fc: 15000, c: 1.2, q: 14000, col: C.red, dash: true },
    { n: "New machine", fc: 18000, c: 1.8, q: 12500, col: C.green, dash: false },
  ];
  const expect = [[10000, 3750], [12500, 1800], [10000, 4500]];
  plans.forEach((p, i) => { p.be = p.fc / p.c; p.pr = p.c * p.q - p.fc; if (p.be !== expect[i][0] || Math.abs(p.pr - expect[i][1]) > 1e-6) throw new Error("plan " + p.n); });
  const ax = D.axes({ x: [0, 16000], y: [-20000, 8000], w: 620, h: 440, xTicks: 2000, yTicks: 4000, xLabel: "Output (bottles a month)", yLabel: "Monthly profit (US$)", origin: false, pad: { l: 78, r: 24, t: 34, b: 56 }, xFormat: num, yFormat: num });
  let b = ax.frame + ax.line([[0, 0], [16000, 0]], { stroke: C.muted, width: 1.6, dash: true }) + ax.label(4500, 0, "profit = 0 (break-even)", { dy: -6, size: 12, fill: C.muted });
  for (const p of plans) b += ax.line([[0, -p.fc], [16000, p.c * 16000 - p.fc]], { stroke: p.col, width: 2.6, dash: p.dash ? "7 5" : undefined });
  for (const p of plans) { b += ax.point(p.q, p.pr, { r: 5.5, stroke: p.col }); }
  const lx = ax.X(0.4), ly = ax.Y(7000) + 6;
  plans.forEach((p, i) => {
    b += D.line(lx, ly + i * 20, lx + 28, ly + i * 20, { stroke: p.col, width: 2.6, dash: p.dash ? "7 5" : undefined });
    b += D.text(lx + 34, ly + i * 20 + 4, `${p.n}: break-even ${num(p.be)}, profit ${num(p.pr)}`, { size: 13 });
  });
  b += D.text(lx, ly + 3 * 20 + 4, "Dots: profit at the expected output of each plan", { size: 12, fill: C.muted });
  b += D.text(ax.X(16000), ax.Y(-17500), "Fixed costs are where each line meets the vertical axis", { anchor: "end", size: 12, fill: C.muted });
  const alt = "Monthly profit against output for three plans for Mazowe Juice: current (break-even 10,000 bottles, profit US$3,750 at 12,500), a price cut to US$2.90 (break-even 12,500, profit only US$1,800 at 14,000) and a new machine (break-even 10,000, profit US$4,500 at 12,500, but steeper losses below break-even because fixed costs are US$18,000).";
  const cap = "Figure: profit lines for the current plan, the price cut and the new machine, with expected profit marked";
  await D.figure(FAM, "break-even-plans-profit", D.svg(620, 440, b), { alt, caption: cap });
  place(L("finance/break-even"), "**Judgement.** The machine is the better plan", D.md("break-even-plans-profit", alt, cap), { block: true });
}

// ---- 5. Payback: cumulative cash flow (poultry project) ----
{
  const cf = [-72000, 21000, 27000, 29000, 25000, 22000];
  const cum = []; cf.reduce((r, v, i) => (cum[i] = r + v), 0);
  if (cum.join() !== "-72000,-51000,-24000,5000,30000,52000") throw new Error("cum");
  const pb = 2 + 24000 / 29000;
  const ax = D.axes({ x: [0, 5.4], y: [-80000, 60000], w: 620, h: 420, xTicks: [0, 1, 2, 3, 4, 5], yTicks: 20000, xLabel: "Year", yLabel: "Cumulative cash flow (US$)", pad: { l: 78, r: 24, t: 34, b: 56 }, yFormat: (v) => num(v) });
  let b = ax.frame;
  b += ax.line(cum.map((v, i) => [i, v]), { stroke: C.blue, width: 3 });
  cum.forEach((v, i) => { b += ax.point(i, v, { r: 4.5, stroke: C.blue }); b += ax.label(i, v, v < 0 ? `(${num(-v)})` : num(v), { dx: v < 0 ? 12 : -10, dy: v < 0 ? 20 : -8, anchor: v < 0 ? "start" : "end", size: 12, weight: 700 }); });
  b += ax.point(pb, 0, { r: 6, stroke: C.red });
  b += ax.tag(pb + 0.1, 30000, `Payback ${pb.toFixed(2)} years (2 years 10 months)`, { anchor: "end", size: 12 });
  b += D.line(ax.X(pb), ax.Y(30000) + 4, ax.X(pb), ax.Y(0) - 6, { stroke: C.red, width: 1.4, arrow: true });
  const alt = "Cumulative cash flow for the US$72,000 poultry project: it starts at minus 72,000, is minus 51,000 after year 1, minus 24,000 after year 2, then plus 5,000 after year 3 and plus 52,000 after year 5; it crosses zero at 2.83 years, the payback period (24,000 divided by the year 3 inflow of 29,000 is 0.83).";
  const cap = "Figure: payback is the point where the cumulative cash flow reaches zero";
  await D.figure(FAM, "payback-cumulative-poultry", D.svg(620, 420, b), { alt, caption: cap });
  place(L("invest/payback-arr"), "6. **Judgement.** If Tatenda's bank charges", D.md("payback-cumulative-poultry", alt, cap), { block: true });
}

// ---- 6. Payback: two ovens ----
{
  const A = [-100000, 34000, 34000, 34000, 34000], B = [-100000, 14000, 24000, 44000, 64000];
  const cum = (a) => { let r = 0; return a.map((v) => (r += v)); };
  const ca = cum(A), cb = cum(B);
  const pbA = 2 + 32000 / 34000, pbB = 3 + 18000 / 64000;
  if (ca.at(-1) !== 36000 || cb.at(-1) !== 46000 || Math.round((pbA - 2) * 12) !== 11 || Math.round((pbB - 3) * 12) !== 3) throw new Error("ovens");
  const ax = D.axes({ x: [0, 4.4], y: [-100000, 60000], w: 620, h: 420, xTicks: [0, 1, 2, 3, 4], yTicks: 20000, xLabel: "Year", yLabel: "Cumulative cash flow (US$)", pad: { l: 78, r: 24, t: 34, b: 56 }, yFormat: num });
  let b = ax.frame;
  b += ax.line(ca.map((v, i) => [i, v]), { stroke: C.blue, width: 3 });
  b += ax.line(cb.map((v, i) => [i, v]), { stroke: C.amber, width: 3, dash: "7 5" });
  ca.forEach((v, i) => { b += ax.point(i, v, { r: 4.5, stroke: C.blue }); });
  cb.forEach((v, i) => { b += ax.point(i, v, { r: 4.5, stroke: C.amber }); });
  b += ax.point(pbA, 0, { r: 6, stroke: C.ink }) + ax.point(pbB, 0, { r: 6, stroke: C.ink });
  b += ax.tag(pbA + 0.1, 28000, "A pays back in 2 years 11 months", { anchor: "end", size: 12, fill: C.blue }) + D.line(ax.X(pbA), ax.Y(28000) + 4, ax.X(pbA), ax.Y(0) - 9, { stroke: C.blue, width: 1.4, arrow: true });
  b += ax.tag(4.35, -60000, "B pays back in 3 years 3 months", { anchor: "end", size: 12, fill: C.amber }) + D.line(ax.X(pbB), ax.Y(-60000) - 20, ax.X(pbB), ax.Y(0) + 9, { stroke: C.amber, width: 1.4, arrow: true });
  b += ax.label(4, ca[4], num(ca[4]), { dx: 8, dy: 4, size: 12, weight: 700, fill: C.blue });
  b += ax.label(4, cb[4], num(cb[4]), { dx: 8, dy: 4, size: 12, weight: 700, fill: C.amber });
  const lx = ax.X(0.15), ly = ax.Y(54000);
  b += D.line(lx, ly, lx + 28, ly, { stroke: C.blue, width: 3 }) + D.text(lx + 34, ly + 4, "Project A (US$34,000 a year)", { size: 13 });
  b += D.line(lx, ly + 20, lx + 28, ly + 20, { stroke: C.amber, width: 3, dash: "7 5" }) + D.text(lx + 34, ly + 24, "Project B (14,000 to 64,000)", { size: 13 });
  const alt = "Cumulative cash flow of two US$100,000 ovens: Project A rises steadily and crosses zero after 2 years 11 months, finishing year 4 at US$36,000; Project B starts slower, crosses zero after 3 years 3 months, but its large year 4 inflow takes it higher to US$46,000, so A wins on payback and B on total return.";
  const cap = "Figure: Project A pays back sooner but Project B ends year 4 with more cash";
  await D.figure(FAM, "payback-two-ovens", D.svg(620, 420, b), { alt, caption: cap });
  place(L("invest/payback-arr"), "**Analysis.** A produces steady cash of", D.md("payback-two-ovens", alt, cap), { block: true });
}

// ---- 7. NPV: cash flows and present values ----
{
  const cf = [13500, 16500, 18000, 17000], df = [0.909, 0.826, 0.751, 0.683];
  const pv = cf.map((v, i) => v * df[i]);
  const npv = pv.reduce((s, v) => s + v, 0) - 46000;
  if (Math.abs(npv - 5029.5) > 1e-6) throw new Error("npv " + npv);
  const ax = D.axes({ x: [0, 4], y: [0, 20000], w: 620, h: 420, xTicks: [], yTicks: 5000, yLabel: "US$", origin: false, arrows: false, pad: { l: 70, r: 20, t: 40, b: 56 }, yFormat: num });
  let b = ax.frame;
  const slot = ax.X(1) - ax.X(0), bw = slot * 0.3;
  cf.forEach((v, i) => {
    const cx = ax.X(i + 0.5);
    b += D.rect(cx - bw - 2, ax.Y(v), bw, ax.Y(0) - ax.Y(v), { fill: C.fillGrey, stroke: C.axis, width: 1.4 });
    b += D.rect(cx + 2, ax.Y(pv[i]), bw, ax.Y(0) - ax.Y(pv[i]), { fill: C.fillBlue, stroke: C.blue, width: 1.6 });
    b += D.text(cx - bw / 2 - 2, ax.Y(v) - 6, num(v), { anchor: "middle", size: 11 });
    b += D.text(cx + bw / 2 + 2, ax.Y(pv[i]) - 6, num(Math.round(pv[i])), { anchor: "middle", size: 11, weight: 700, fill: C.blue });
    b += D.text(cx, ax.Y(0) + 19, `Year ${i + 1}`, { anchor: "middle", size: 13 });
    b += D.text(cx, ax.Y(0) + 35, `factor ${df[i].toFixed(3)}`, { anchor: "middle", size: 12, fill: C.muted });
  });
  b += D.text(ax.X(4), 22, "Grey: cash inflow. Blue: present value at 10%.", { anchor: "end", size: 12, fill: C.muted });
  b += D.text(ax.X(0.1), ax.Y(19200), `Present values total US$51,029.50; outlay US$46,000; NPV US$5,029.50`, { size: 13, weight: 700, fill: C.blue });
  const alt = "NPV of the pumping system at 10%: the inflows of US$13,500, 16,500, 18,000 and 17,000 in years 1 to 4 are worth US$12,272, 13,629, 13,518 and 11,611 in today's money (discount factors 0.909, 0.826, 0.751, 0.683); they total US$51,029.50, so after the US$46,000 outlay the NPV is plus US$5,029.50.";
  const cap = "Figure: discounting shrinks each later cash inflow; the present values total US$51,029.50 against an outlay of US$46,000";
  await D.figure(FAM, "npv-discounting-pump", D.svg(620, 420, b), { alt, caption: cap });
  place(L("invest/npv-decisions"), "5. **Judgement.** She should go ahead", D.md("npv-discounting-pump", alt, cap), { block: true });
}
