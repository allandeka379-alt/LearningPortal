// SWOT, five forces, stakeholder profit split and influence map, profitability ratio comparison.
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

const num = (v) => v.toLocaleString("en-GB");

// ---- 1. SWOT for Nyasha's bakery ----
{
  const W = 620, H = 400, x0 = 90, y0 = 52, cw = 258, ch = 150;
  let b = "";
  b += D.text(x0 + cw / 2, 34, "Helpful", { anchor: "middle", size: 15, weight: 700, fill: C.green });
  b += D.text(x0 + cw * 1.5, 34, "Harmful", { anchor: "middle", size: 15, weight: 700, fill: C.red });
  b += D.text(x0 - 8, y0 + ch / 2 + 5, "Internal", { anchor: "end", size: 15, weight: 700 });
  b += D.text(x0 - 8, y0 + ch * 1.5 + 5, "External", { anchor: "end", size: 15, weight: 700 });
  const cells = [
    [0, 0, "Strengths", "loyal customers\nmodern oven", C.fillGreen],
    [1, 0, "Weaknesses", "little cash for expansion", "#fde3e0"],
    [0, 1, "Opportunities", "rising demand for wholesale\nbread from small shops", C.fillBlue],
    [1, 1, "Threats", "a supermarket plans to\nopen nearby", C.fillAmber],
  ];
  for (const [i, j, t, d, f] of cells) {
    const x = x0 + i * cw, y = y0 + j * ch;
    b += D.rect(x + 3, y + 3, cw - 6, ch - 6, { fill: f, stroke: C.axis, width: 1.6, r: 8 });
    b += D.text(x + 16, y + 34, t, { size: 16, weight: 700 });
    b += D.text(x + 16, y + 64, d, { size: 14 });
  }
  b += D.text(x0 + cw, y0 + 2 * ch + 26, "Match: oven + wholesale demand; loyalty vs supermarket;", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(x0 + cw, y0 + 2 * ch + 44, "fix: little cash blocks fast expansion (deposits, supplier credit)", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "SWOT grid for Nyasha's bakery: strengths are loyal customers and a modern oven; the weakness is little cash for expansion; the opportunity is rising demand for wholesale bread from small shops; the threat is a supermarket opening nearby. The strategy matches the oven to wholesale demand and finances expansion in stages.";
  const cap = "Figure: the bakery's SWOT, with internal factors on top and external factors below";
  await D.figure(FAM, "swot-bakery", D.svg(W, H, b), { alt, caption: cap });
  place(L("strategy/environment-scanning"), "**Strategy from the SWOT.**", D.md("swot-bakery", alt, cap), { block: true });
}

// ---- 2. Five forces for the minibus route ----
{
  const W = 620, H = 440;
  let b = "";
  const box = (x, y, w, h, title, rating, fill, stroke) => {
    let s = D.rect(x, y, w, h, { fill, stroke, width: 2, r: 8 });
    s += D.text(x + w / 2, y + 26, title, { anchor: "middle", size: 14, weight: 700 });
    s += D.text(x + w / 2, y + 48, rating, { anchor: "middle", size: 13 });
    return s;
  };
  const strong = ["#fde3e0", C.red], mod = [C.fillAmber, C.amber], weak = [C.fillGreen, C.green];
  const bx = 200, bw = 220, bh = 80;
  b += box(bx, 170, bw, bh, "Rivalry", "STRONG: many operators,\nsame service", ...strong).replace("", "");
  b += box(bx, 20, bw, bh, "New entrants", "STRONG: a second-hand\nvehicle is cheap", ...strong);
  b += box(bx, 330, bw, bh, "Substitutes", "MODERATE: slower, cheaper\nrail service", ...mod);
  b += box(10, 170, 170, bh, "Buyers", "WEAK alone, but can\nswitch at no cost", ...weak);
  b += box(440, 170, 170, bh, "Suppliers", "STRONG: few fuel\nsuppliers", ...strong);
  b += D.arrow(310, 100, 310, 170, { stroke: C.axis, width: 2 }) + D.arrow(310, 330, 310, 250, { stroke: C.axis, width: 2 });
  b += D.arrow(180, 210, 200, 210, { stroke: C.axis, width: 2 }) + D.arrow(440, 210, 420, 210, { stroke: C.axis, width: 2 });
  b += D.text(310, 432, "Red: strong force. Amber: moderate. Green: weak. Strong forces lower profit.", { anchor: "middle", size: 12, fill: C.muted });
  const alt = "Porter's five forces for Chipo's minibus route: rivalry is strong (many operators, the same service), new entrants are a strong threat (a second-hand vehicle is cheap), substitutes are moderate (a slower, cheaper rail service), buyers are weak individually but can switch at no cost, and suppliers are strong (few fuel suppliers), so profit in the industry is likely to be low.";
  const cap = "Figure: five forces for the Masvingo to Mutare minibus route";
  await D.figure(FAM, "five-forces-minibus", D.svg(W, H, b), { alt, caption: cap });
  place(L("strategy/environment-scanning"), "5. Supplier power is strong", D.md("five-forces-minibus", alt, cap), { block: true });
}

// ---- 3. Profit sharing: two plans ----
{
  const profit = 48000;
  const plans = [
    ["Plan 1", [["Dividends", 60, C.fillBlue], ["Workers' bonus", 10, C.fillAmber], ["Community fund", 5, C.fillGreen], ["Retained", 25, C.fillGrey]]],
    ["Plan 2", [["Dividends", 40, C.fillBlue], ["Workers' bonus", 25, C.fillAmber], ["Community fund", 10, C.fillGreen], ["Retained", 25, C.fillGrey]]],
  ];
  plans.forEach(([, p]) => { if (p.reduce((s, x) => s + x[1], 0) !== 100) throw new Error("100%"); });
  const W = 620, H = 300, x0 = 80, w = 520, bh = 64;
  let b = D.text(x0, 24, `Sharing a profit of US$${num(profit)}`, { size: 15, weight: 700 });
  plans.forEach(([n, parts], i) => {
    const y = 48 + i * 110;
    b += D.text(x0 - 10, y + bh / 2 + 5, n, { anchor: "end", size: 15, weight: 700 });
    let x = x0;
    parts.forEach(([l, pc, f]) => {
      const ww = (pc / 100) * w;
      b += D.rect(x, y, ww, bh, { fill: f, stroke: C.axis, width: 1.4 });
      const dollars = (profit * pc) / 100;
      b += D.text(x + ww / 2, y + 26, `${pc}%`, { anchor: "middle", size: 14, weight: 700 });
      b += D.text(x + ww / 2, pc < 8 ? y + bh + 15 : y + 45, num(dollars), { anchor: "middle", size: 12 });
      x += ww;
    });
  });
  // legend
  let lx = x0, ly = 270;
  plans[0][1].forEach(([l, , f]) => { b += D.rect(lx, ly - 11, 14, 14, { fill: f, stroke: C.axis, width: 1.2 }) + D.text(lx + 20, ly, l, { size: 13 }); lx += l.length * 7.4 + 44; });
  const alt = "Two ways to share Masimba Brick Works' US$48,000 profit: Plan 1 pays 60% (US$28,800) in dividends, 10% (US$4,800) as a workers' bonus, 5% (US$2,400) to a community fund and keeps 25% (US$12,000); Plan 2 pays 40% (US$19,200), 25% (US$12,000), 10% (US$4,800) and keeps the same 25%, so US$9,600 moves from shareholders to workers and the community.";
  const cap = "Figure: the two plans for sharing the profit between shareholders, workers, the community and the business";
  await D.figure(FAM, "profit-sharing-plans", D.svg(W, H, b), { alt, caption: cap });
  place(L("stakeholders/roles-influence"), "**Interpretation.** The plans transfer money from owners", D.md("profit-sharing-plans", alt, cap), { block: true });
}

// ---- 4. Stakeholder influence map (Dube Poultry) ----
{
  const W = 600, H = 460;
  const ax = D.axes({ x: [0, 10], y: [0, 10], w: W, h: H, xTicks: [], yTicks: [], xLabel: "Interest in the decision", yLabel: "Power over the decision", pad: { l: 40, r: 24, t: 34, b: 56 }, grid: false });
  let b = "";
  const q = (x0, y0, x1, y1, f) => D.rect(ax.X(x0), ax.Y(y1), ax.X(x1) - ax.X(x0), ax.Y(y0) - ax.Y(y1), { fill: f, stroke: "none" });
  b += q(0, 5, 5, 10, C.fillAmber) + q(5, 5, 10, 10, "#fde3e0") + q(0, 0, 5, 5, C.fillGrey) + q(5, 0, 10, 5, C.fillBlue);
  b += ax.frame;
  b += D.line(ax.X(5), ax.Y(0), ax.X(5), ax.Y(10), { stroke: C.axis, width: 1.2, dash: true }) + D.line(ax.X(0), ax.Y(5), ax.X(10), ax.Y(5), { stroke: C.axis, width: 1.2, dash: true });
  const qt = (x, y, s) => D.text(ax.X(x), ax.Y(y), s, { anchor: "middle", size: 13, weight: 700, fill: C.muted });
  b += qt(2.5, 9.3, "Keep satisfied") + qt(7.5, 9.3, "Manage closely") + qt(2.5, 0.6, "Monitor") + qt(7.5, 0.6, "Keep informed");
  const pts = [["Council", 6.0, 8.8, "start"], ["Bank", 3.6, 8.0, "end"], ["Workers", 8.6, 3.6, "end"], ["Residents (unorganised)", 9.3, 1.8, "end"]];
  const pos = [[4.4, 8.4, "Bank (lender)", "end"], [6.6, 8.4, "Council", "start"], [8.0, 3.8, "Workers (40)", "end"], [8.7, 1.8, "Residents", "end"]];
  for (const [x, y, s, an] of pos) {
    b += ax.point(x, y, { r: 7, stroke: C.blue });
    b += ax.label(x, y, s, { dx: an === "end" ? -12 : 12, dy: 5, anchor: an, size: 13, weight: 700, fill: C.blue });
  }
  b += D.text(ax.X(10), 18, "Positions are a judgement from the case, not measurements", { anchor: "end", size: 12, fill: C.muted });
  const alt = "Stakeholder map for Dube Poultry's move to a river site: the bank (lender) and the council hold high power and sit in the upper half; the 40 workers have high interest but lower power; the downstream residents have strong interest but the least power until they organise. Quadrants are keep satisfied, manage closely, monitor and keep informed.";
  const cap = "Figure: where the four stakeholders sit on a power and interest map (a judgement, not a measurement)";
  await D.figure(FAM, "stakeholder-power-interest", D.svg(W, H, b), { alt, caption: cap });
  place(L("stakeholders/roles-influence"), "**Judgement.** Dube Poultry should consult the council", D.md("stakeholder-power-interest", alt, cap), { block: true });
}

// ---- 5. Profitability ratios: two firms ----
{
  const firms = [["Rudo's Hardware", 1200000, 300000, 72000, 400000, C.blue], ["Sipho's Furniture", 500000, 225000, 45000, 450000, C.amber]];
  const r = (n) => Math.round(n * 10) / 10;
  const vals = firms.map(([, rev, gp, op, ce]) => [r((gp / rev) * 100), r((op / rev) * 100), r((op / ce) * 100)]);
  if (vals[0].join() !== "25,6,18" || vals[1].join() !== "45,9,10") throw new Error("ratios " + vals);
  const labels = ["Gross profit margin", "Operating profit margin", "ROCE"];
  const W = 620, H = 400;
  const ax = D.axes({ x: [0, 3], y: [0, 50], w: W, h: H, xTicks: [], yTicks: 10, yLabel: "Per cent (%)", origin: false, arrows: false, pad: { l: 56, r: 20, t: 34, b: 60 } });
  let b = ax.frame;
  const slot = ax.X(1) - ax.X(0), bw = slot * 0.3;
  labels.forEach((l, i) => {
    const cx = ax.X(i + 0.5);
    firms.forEach(([n, , , , , col], k) => {
      const v = vals[k][i];
      const x = cx + (k === 0 ? -bw - 2 : 2);
      b += D.rect(x, ax.Y(v), bw, ax.Y(0) - ax.Y(v), { fill: col, stroke: "none" });
      b += D.text(x + bw / 2, ax.Y(v) - 6, v.toFixed(1), { anchor: "middle", size: 13, weight: 700 });
    });
    b += D.text(cx, ax.Y(0) + 20, l, { anchor: "middle", size: 13 });
  });
  const lx = ax.X(1.75), ly = ax.Y(48);
  firms.forEach(([n, , , , , col], k) => { b += D.rect(lx, ly + k * 22 - 11, 14, 14, { fill: col, stroke: "none" }) + D.text(lx + 22, ly + k * 22, n, { size: 13 }); });
  const alt = "Profitability of two firms: Sipho's Furniture has the higher gross margin (45.0% against 25.0%) and operating margin (9.0% against 6.0%), but Rudo's Hardware has the higher return on capital employed (18.0% against 10.0%) because it earns a modest profit on a large revenue from US$400,000 of capital.";
  const cap = "Figure: the same two firms ranked differently by margins and by return on capital employed";
  await D.figure(FAM, "profitability-two-firms", D.svg(W, H, b), { alt, caption: cap });
  place(L("ratios/profitability"), "**Analysis.** Rudo's sells at low margins", D.md("profitability-two-firms", alt, cap), { block: true });
}
