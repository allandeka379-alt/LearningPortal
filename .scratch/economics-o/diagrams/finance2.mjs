// Second pass: market-structure cost curves, budget, wage differentials, development indicators, occupational shares, YED/XED scales.
// Run: node .scratch/economics-o/diagrams/finance2.mjs
import { D, C, lab } from "./common.mjs";
import { putB as put } from "./place.mjs";

const fmt = (v) => v.toLocaleString("en-GB");
const cat = (n, yMax, o) => {
  const ax = D.axes({ x: [0, n], y: [0, yMax], xTicks: [], origin: false, arrows: false, ...o });
  return { ax, cx: (i) => ax.X(i + 0.5), bw: (ax.X(1) - ax.X(0)) * (o.bwFrac ?? 0.6) };
};
const bar = (c, i, y0, y1, fill, stroke = "none") => D.rect(c.cx(i) - c.bw / 2, c.ax.Y(y1), c.bw, c.ax.Y(y0) - c.ax.Y(y1), { fill, stroke, width: 1.2 });

// --- Perfect competition (structures/equilibrium): the table in Worked example 1
{
  const tc = [30, 50, 64, 75, 86, 100, 126];
  const q = [1, 2, 3, 4, 5, 6];
  const mc = q.map((n) => tc[n] - tc[n - 1]);
  const atc = q.map((n) => tc[n] / n);
  const price = 24;
  if (mc.join() !== "20,14,11,11,14,26") throw new Error("MC mismatch");
  const out = 5, profit = (price - atc[out - 1]) * out; // 20
  const ax = D.axes({ x: [0, 7], y: [0, 55], xTicks: 1, yTicks: 10, xLabel: "Output (batches a day)", yLabel: "Price and cost (US$)", w: 600, h: 440 });
  const dots = (arr, col) => ax.line(q.map((n, i) => [n, arr[i]]), { stroke: col }) + q.map((n, i) => ax.point(n, arr[i], { stroke: col, r: 3.5 })).join("");
  const body = ax.frame +
    D.rect(ax.X(0), ax.Y(price), ax.X(out) - ax.X(0), ax.Y(atc[out - 1]) - ax.Y(price), { fill: C.fillAmber, stroke: C.amber, width: 1.2 }) +
    dots(atc, C.blue) + dots(mc, C.green) +
    ax.line([[0, price], [7, price]], { stroke: C.red, width: 2.4 }) +
    ax.guides(out, price) + ax.point(out, price, { stroke: C.red, r: 5 }) +
    lab(ax, 6, atc[5], "ATC", { dx: 8, dy: 12, fill: C.blue }) + lab(ax, 6, mc[5], "MC", { dx: 8, dy: 4, fill: C.green }) +
    ax.label(0.1, price, "P = AR = MR = 24", { dy: -8, size: 13, weight: 700, fill: C.red }) +
    ax.label(0.15, 8, `Shaded: abnormal profit
(24 - 20) x 5 = US$${profit}`, { size: 13, weight: 700, fill: C.amber }) +
    ax.tag(out, 20, "ATC at 5 = 20", { dx: -10, dy: 28, anchor: "end", fill: C.blue });
  const alt = `Cost curves for a firm in perfect competition: the price is US$24 so marginal revenue is 24; marginal cost (20, 14, 11, 11, 14, 26) is below 24 up to the 5th batch and above it for the 6th, so output is 5 batches; average total cost at 5 batches is US$20, so the firm earns abnormal profit of (24 - 20) x 5 = US$${profit} a day.`;
  await put("perfect-competition-profit", D.svg(600, 440, body), alt, "Figure: the firm produces where MC meets the price line, and profit is the gap between price and ATC times output", "structures/equilibrium", "1. MR = US");
}

// --- Monopoly (structures/equilibrium): the table in Worked example 2
{
  const q = [1, 2, 3, 4, 5, 6];
  const ar = [46, 42, 38, 34, 30, 26];
  const tc = [60, 74, 86, 100, 118, 142];
  const tcPrev = [40, ...tc];
  const mc = q.map((n, i) => tc[i] - tcPrev[i]);
  const tr = ar.map((p, i) => p * q[i]);
  const mr = tr.map((t, i) => t - (i ? tr[i - 1] : 0));
  const atc = tc.map((t, i) => t / q[i]);
  if (mc.join() !== "20,14,12,14,18,24" || mr.join() !== "46,38,30,22,14,6") throw new Error("table mismatch");
  const out = 4, p = ar[3], a = atc[3], profit = (p - a) * out;
  const ax = D.axes({ x: [0, 7], y: [0, 65], xTicks: 1, yTicks: 10, xLabel: "Output (units)", yLabel: "Price and cost (US$)", w: 600, h: 440 });
  const dots = (arr, col) => ax.line(q.map((n, i) => [n, arr[i]]), { stroke: col }) + q.map((n, i) => ax.point(n, arr[i], { stroke: col, r: 3.5 })).join("");
  const body = ax.frame +
    D.rect(ax.X(0), ax.Y(p), ax.X(out) - ax.X(0), ax.Y(a) - ax.Y(p), { fill: C.fillAmber, stroke: C.amber, width: 1.2 }) +
    dots(ar, C.blue) + dots(mr, C.purple) + dots(mc, C.green) + dots(atc, C.muted) +
    ax.guides(out, p) + ax.point(out, p, { stroke: C.red, r: 5 }) + ax.point(out, mr[3], { stroke: C.red, r: 5 }) +
    lab(ax, 5, ar[4], "AR = D", { dx: -10, dy: -10, fill: C.blue }) + lab(ax, 6, mr[5], "MR", { dx: 8, dy: 4, fill: C.purple }) +
    lab(ax, 6, mc[5], "MC", { dx: 8, dy: -2, fill: C.green }) + lab(ax, 5, atc[4], "ATC", { dx: -6, dy: -10, fill: C.muted }) +
    ax.tag(out, p, "Price 34", { dx: 12, dy: -10, fill: C.red }) +
    ax.label(2, 29.5, `Abnormal profit\n(34 - 25) x 4 = US$${profit}`, { anchor: "middle", size: 13, weight: 700, fill: C.amber, dy: 0 });
  const alt = `Monopoly cost and revenue curves from the table: marginal revenue (46, 38, 30, 22, 14, 6) is above marginal cost (20, 14, 12, 14, 18, 24) up to the 4th unit, so output is 4 units; the price is read up to the demand curve (AR) at US$${p}, average total cost is US$${a}, and abnormal profit is (34 - 25) x 4 = US$${profit}.`;
  await put("monopoly-profit-table", D.svg(600, 440, body), alt, "Figure: the monopoly produces where MR = MC (4 units) but charges the price on the demand curve, US$34", "structures/equilibrium", "1. MR > MC up to the 4th unit");
}

// --- Budget (fiscal/budget-fiscal-policy): Worked example 1
{
  const rev = [["Income tax", 2400], ["VAT", 1800], ["Customs and excise", 600], ["Other revenue", 300]];
  const spend = [["Education", 1500], ["Infrastructure", 1100], ["Health", 900], ["Social protection", 650], ["Other spending", 650], ["Defence and security", 500], ["Interest on debt", 400]];
  const tR = rev.reduce((a, r) => a + r[1], 0), tS = spend.reduce((a, r) => a + r[1], 0);
  if (tR !== 5100 || tS !== 5700) throw new Error("budget totals");
  const c = cat(2, 6200, { w: 600, h: 560, yTicks: 1000, yLabel: "US$ million", bwFrac: 0.7, pad: { l: 70, r: 20, t: 30, b: 60 } });
  const fills = [C.blue, C.teal, "#7fb7cb", "#b6d8e4"], fills2 = [C.amber, "#d98a3f", "#e6a867", "#efc293", "#f3d1b0", "#f7dfc8", "#fbece0"];
  let body = c.ax.frame;
  const stack = (i, items, cols, dark) => {
    let y = 0;
    items.forEach(([n, v], k) => {
      body += bar(c, i, y, y + v, cols[k], "#ffffff");
      body += D.text(c.cx(i), c.ax.Y(y + v / 2) + 5, `${n} ${fmt(v)}`, { anchor: "middle", size: 13, fill: k < dark ? "#ffffff" : C.ink, weight: 600 });
      y += v;
    });
  };
  stack(0, rev, fills, 3);
  stack(1, spend, fills2, 2);
  body += D.text(c.cx(0), c.ax.Y(0) + 22, "Revenue", { anchor: "middle", size: 14, weight: 700 }) + D.text(c.cx(1), c.ax.Y(0) + 22, "Spending", { anchor: "middle", size: 14, weight: 700 });
  body += D.text(c.cx(0), c.ax.Y(tR) - 8, fmt(tR), { anchor: "middle", size: 14, weight: 700 }) + D.text(c.cx(1), c.ax.Y(tS) - 8, fmt(tS), { anchor: "middle", size: 14, weight: 700 });
  body += D.line(c.cx(0) + c.bw / 2, c.ax.Y(tR), c.cx(1) - c.bw / 2, c.ax.Y(tR), { stroke: C.red, dash: true, width: 1.6 });
  body += D.text((c.cx(0) + c.cx(1)) / 2, c.ax.Y(tR) + 18, `Deficit
${fmt(tS - tR)}`, { anchor: "middle", size: 13, weight: 700, fill: C.red });
  const alt = "Government budget in a worked example: revenue of US$5,100 million (income tax 2,400, VAT 1,800, customs and excise 600, other 300) against spending of US$5,700 million (education 1,500, infrastructure 1,100, health 900, social protection 650, other 650, defence 500, interest 400), giving a budget deficit of US$600 million.";
  await put("budget-revenue-spending", D.svg(600, 560, body), alt, "Figure: spending of US$5,700 million is above revenue of US$5,100 million, a deficit of US$600 million", "fiscal/budget-fiscal-policy", "2. Total spending = 1,500");
}

// --- Wage differentials (labour/wage-differentials): table
{
  const rows = [["Farm hand", "primary,\nunskilled", 150], ["Machine\noperator", "secondary,\nsemi-skilled", 320], ["Electrician", "secondary,\nskilled", 640], ["Bank teller", "tertiary,\nsemi-skilled", 450], ["Doctor", "tertiary,\nskilled", 1200]];
  const c = cat(5, 1400, { w: 600, h: 460, yTicks: 200, yLabel: "Average monthly earnings (US$)", bwFrac: 0.6, pad: { l: 70, r: 20, t: 30, b: 96 } });
  let body = c.ax.frame;
  rows.forEach(([n, s, v], i) => {
    body += bar(c, i, 0, v, C.teal) + D.text(c.cx(i), c.ax.Y(v) - 8, fmt(v), { anchor: "middle", size: 14, weight: 700 });
    body += D.text(c.cx(i), c.ax.Y(0) + 20, n, { anchor: "middle", size: 13, weight: 700 }) + D.text(c.cx(i), c.ax.Y(0) + 54, s, { anchor: "middle", size: 12, fill: C.muted });
  });
  const alt = "Average monthly earnings in five jobs: farm hand 150, machine operator 320, electrician 640, bank teller 450 and doctor 1,200 US dollars; the skilled job earns most in each sector, and the doctor earns 8 times the farm hand.";
  await put("wage-differentials-earnings", D.svg(600, 460, body), alt, "Figure: pay rises with skill within each sector, and the doctor earns 8 times as much as the farm hand", "labour/wage-differentials", "## Patterns of differentials");
}

// --- Development: comparing two countries (development/meaning-indicators): Worked example 1
{
  const A = { gdp: 27300 / 6.5, life: 58, school: 5.1, hdi: 0.561 }, B = { gdp: 31200 / 13, life: 71, school: 9.4, hdi: 0.684 };
  if (Math.round(A.gdp) !== 4200 || Math.round(B.gdp) !== 2400) throw new Error("GDP per head");
  const panels = [["Real GDP per head (US$)", A.gdp, B.gdp, fmt], ["Life expectancy (years)", A.life, B.life, String], ["Mean years of schooling", A.school, B.school, (v) => v.toFixed(1)], ["HDI", A.hdi, B.hdi, (v) => v.toFixed(3)]];
  const pw = 290, ph = 120;
  let body = "";
  panels.forEach(([t, a, b, f], k) => {
    const ox = (k % 2) * pw + 10, oy = Math.floor(k / 2) * ph + 40;
    const max = Math.max(a, b), bw = (v) => (v / max) * 170;
    body += D.text(ox, oy - 14, t, { size: 14, weight: 700 });
    body += D.text(ox, oy + 22, "A", { size: 14, weight: 700, fill: C.blue }) + D.rect(ox + 22, oy + 6, bw(a), 24, { fill: C.blue, stroke: "none" }) + D.text(ox + 28 + bw(a), oy + 24, f(a), { size: 13, weight: 700 });
    body += D.text(ox, oy + 58, "B", { size: 14, weight: 700, fill: C.amber }) + D.rect(ox + 22, oy + 42, bw(b), 24, { fill: C.amber, stroke: "none" }) + D.text(ox + 28 + bw(b), oy + 60, f(b), { size: 13, weight: 700 });
  });
  body += D.text(300, 286, `Each panel has its own scale starting at zero.
Country A has more income; Country B scores higher on the other three.`, { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Four comparisons of two fictional countries: Country A has the higher real GDP per head (US$4,200 against US$2,400) but Country B has longer life expectancy (71 against 58 years), more schooling (9.4 against 5.1 years) and a higher HDI (0.684 against 0.561), so income alone ranks them the wrong way round for welfare.";
  await put("development-two-countries", D.svg(600, 330, body), alt, "Figure: Country A has the higher income per head, but Country B does better on health, education and the HDI", "development/meaning-indicators", "Both countries are fictional.");
}

// --- Occupational distribution (population/growth-distribution): Worked example 2
{
  const rows = [["Primary", 3150], ["Secondary", 630], ["Tertiary", 1470]];
  const total = rows.reduce((a, r) => a + r[1], 0);
  if (total !== 5250) throw new Error("workers total");
  const c = cat(3, 70, { w: 560, h: 400, yTicks: 10, yLabel: "Share of workers (%)", bwFrac: 0.5, pad: { l: 70, r: 20, t: 30, b: 60 } });
  let body = c.ax.frame;
  rows.forEach(([n, v], i) => {
    const s = Math.round((v / total) * 1000) / 10;
    body += bar(c, i, 0, s, C.teal) + D.text(c.cx(i), c.ax.Y(s) - 24, `${s.toFixed(1)}%`, { anchor: "middle", size: 14, weight: 700 }) + D.text(c.cx(i), c.ax.Y(s) - 8, `${fmt(v)} thousand`, { anchor: "middle", size: 13, fill: C.muted });
    body += D.text(c.cx(i), c.ax.Y(0) + 20, n, { anchor: "middle", size: 14 });
  });
  const alt = "Occupational distribution of 5,250 thousand workers in a fictional country: 60.0 percent in the primary sector (3,150 thousand), 12.0 percent in the secondary sector (630 thousand) and 28.0 percent in the tertiary sector (1,470 thousand), typical of a developing economy.";
  await put("occupational-distribution-sectors", D.svg(560, 400, body), alt, "Figure: most workers are in the primary sector, as in a typical developing economy", "population/growth-distribution", "3. With 60% of workers in the primary sector");
}

// --- YED scale (elasticity/income-cross): beef +1.2, cheapest maize meal -0.4
const scale = (min, max, pts, zones, name, alt, caption, anchor) => {
  const w = 600, h = 170, l = 40, r = 560, X = (v) => l + ((v - min) / (max - min)) * (r - l), y = 90;
  let body = "";
  zones.forEach(([a, b, label, fill]) => { body += D.rect(X(a), y - 24, X(b) - X(a), 48, { fill, stroke: C.grid, width: 1 }) + D.text((X(a) + X(b)) / 2, y + 5, label, { anchor: "middle", size: 13, fill: C.muted }); });
  body += D.arrow(l - 10, y + 24, r + 14, y + 24, { stroke: C.axis, width: 1.6 });
  for (let v = Math.ceil(min * 2) / 2; v <= max + 1e-9; v += 0.5) body += D.line(X(v), y + 24, X(v), y + 30, { stroke: C.axis, width: 1.2 }) + D.text(X(v), y + 46, (Math.round(v * 10) / 10).toString().replace("-", "−"), { anchor: "middle", size: 13, fill: C.muted });
  pts.forEach(([v, label, col, up]) => {
    body += D.line(X(v), y - 24, X(v), up ? y - 50 : y + 24, { stroke: col, width: 2 }) + D.dot(X(v), y - 24, { stroke: col, r: 5 });
    body += D.text(X(v), y - 56, label, { anchor: "middle", size: 13, weight: 700, fill: col });
  });
  return { svg: D.svg(w, h, body), alt, caption, name, anchor };
};
{
  const yed = (q0, q1, i0, i1) => ((q1 - q0) / q0) / ((i1 - i0) / i0);
  const beef = yed(20, 26, 400, 500), maize = yed(40, 36, 400, 500);
  if (Math.abs(beef - 1.2) > 1e-9 || Math.abs(maize + 0.4) > 1e-9) throw new Error("YED values");
  const s = scale(-1, 2, [[beef, "Beef +1.2", C.blue, true], [maize, "Cheapest maize meal −0.4", C.amber, true]],
    [[-1, 0, "inferior", C.fillGrey], [0, 1, "normal: necessity", C.fillBlue], [1, 2, "normal: luxury", C.fillAmber]],
    "yed-scale", "Number line of income elasticity of demand: negative values (inferior goods) lie below 0, values between 0 and 1 are normal necessities, values above 1 are luxuries; beef at +1.2 is a luxury and the cheapest maize meal at −0.4 is an inferior good.",
    "Figure: where the two worked examples fall on the income elasticity scale (schematic scale, values from the examples)", "| Greater than 1 | Normal good, luxury");
  await put(s.name, s.svg, s.alt, s.caption, "elasticity/income-cross", s.anchor);
}
{
  const kombi = (900 - 800) / 800 / ((1.25 - 1) / 1), cars = (45 - 50) / 50 / ((1.8 - 1.5) / 1.5);
  if (Math.abs(kombi - 0.5) > 1e-9 || Math.abs(cars + 0.5) > 1e-9) throw new Error("XED values");
  const s = scale(-1, 1, [[kombi, "Kombi and bus +0.5", C.blue, true], [cars, "Cars and petrol −0.5", C.amber, true]],
    [[-1, 0, "complements", C.fillAmber], [0, 1, "substitutes", C.fillBlue]],
    "xed-scale", "Number line of cross elasticity of demand: negative values mean complements and positive values mean substitutes; kombi and bus rides at +0.5 are weak substitutes and cars and petrol at −0.5 are complements.",
    "Figure: where the two worked examples fall on the cross elasticity scale (schematic scale, values from the examples)", "| Zero (or close to zero)");
  await put(s.name, s.svg, s.alt, s.caption, "elasticity/income-cross", s.anchor);
}
