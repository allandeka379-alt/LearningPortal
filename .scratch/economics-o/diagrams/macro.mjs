// Market-structure, forex, macro, population, tax and labour diagrams. Run: node .scratch/economics-o/diagrams/macro.mjs
import { D, C, put, lab, dotted } from "./common.mjs";

const two = (f, a, b) => [[f(a), a], [f(b), b]];
const R = (ax, qa, pa, qb, pb, o) => D.rect(ax.X(qa), ax.Y(pb), ax.X(qb) - ax.X(qa), ax.Y(pa) - ax.Y(pb), o);

// --- Monopoly: cement (structures/monopoly)
{
  const price = [110, 120, 130, 140, 150, 160, 170];
  const qty = [14000, 13000, 12000, 10500, 9000, 7000, 5000];
  const cost = 110;
  const ax = D.axes({ x: [0, 16000], y: [100, 180], xTicks: 4000, yTicks: 10, xLabel: "Tonnes per month", yLabel: "Price and cost (US$ per tonne)", w: 600, h: 440 });
  const profit = (150 - cost) * 9000;
  const body = ax.frame + R(ax, 0, cost, 9000, 150, { fill: C.fillAmber, stroke: C.amber, width: 1.2 }) +
    dotted(ax, price.map((p, i) => [qty[i], p]), { stroke: C.blue }) +
    ax.line([[0, cost], [16000, cost]], { stroke: C.muted, dash: true, width: 2 }) +
    ax.point(9000, 150, { stroke: C.red, r: 5 }) + ax.point(14000, 110, { stroke: C.green, r: 5 }) +
    lab(ax, 5000, 170, "D", { dx: -22, dy: 4, fill: C.blue }) +
    ax.label(4500, 129, "Abnormal profit\n40 x 9,000\n= US$360,000", { anchor: "middle", size: 14, weight: 700, fill: C.amber }) +
    ax.tag(9000, 150, "Monopoly: US$150, 9,000", { dx: 12, dy: -8, fill: C.red }) +
    ax.tag(14000, 110, "Competition: US$110, 14,000", { dx: 8, dy: -12, anchor: "end", fill: C.green }) +
    ax.label(16000, 110, "Cost US$110", { anchor: "end", dy: 18, size: 13, fill: C.muted });
  const alt = `Demand for cement from the single supplier slopes down; with a cost of US$110 a tonne the profit-maximising point is US$150 and 9,000 tonnes, giving abnormal profit of 40 x 9,000 = US$${profit.toLocaleString("en-GB")} a month, while a competitive market would charge US$110 and sell 14,000 tonnes.`;
  await put("monopoly-cement-profit", D.svg(600, 440, body), alt, "Figure: a monopoly restricts output and charges more than a competitive market would", "structures/monopoly", "- **Profit:** **abnormal profits**");
}

// --- Exchange rate (forex/exchange-rates): kora demand 1100 - 100P, after exports 1300 - 100P, supply 300 + 100P
{
  const d1 = (p) => 1100 - 100 * p, d2 = (p) => 1300 - 100 * p, s = (p) => 300 + 100 * p;
  const ax = D.axes({ x: [400, 1200], y: [1, 7], xTicks: 100, yTicks: 1, xLabel: "Kora per day (million)", yLabel: "Price of 1 kora (US cents)", w: 600, h: 440 });
  const body = ax.frame + ax.line(two(d1, 1.8, 6.4), { stroke: C.blue }) + ax.line(two(d2, 1.8, 6.4), { stroke: C.red }) + ax.line(two(s, 1.8, 6.4), { stroke: C.amber }) +
    ax.point(700, 4) + ax.point(800, 5) + ax.guides(700, 4) + ax.guides(800, 5) +
    ax.line([[700, 4], [900, 4]], { stroke: C.red, dash: true, width: 2 }) +
    lab(ax, d1(6.4), 6.4, "D1", { dx: -4, dy: -8, fill: C.blue }) + lab(ax, d2(6.4), 6.4, "D2", { dx: 8, dy: 4, fill: C.red }) + lab(ax, s(6.4), 6.4, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(700, 4, "4 cents, 700 (US$1 = 25 kora)", { dx: -10, dy: 30, anchor: "end" }) +
    ax.tag(800, 5, "5 cents, 800 (US$1 = 20 kora)", { dx: 12, dy: -12 }) +
    ax.tag(900, 4, "excess demand 200", { dx: 4, dy: 30, fill: C.red });
  const alt = "Foreign exchange market for the kora: higher export demand shifts demand right from D1 to D2, so at 4 US cents there is excess demand of 200 million kora and the price of the kora rises to 5 cents with 800 million traded, an appreciation of 25 percent (US$1 = 25 kora becomes US$1 = 20 kora).";
  await put("kora-appreciation", D.svg(600, 440, body), alt, "Figure: a rise in export demand shifts the demand for a currency right and it appreciates", "forex/exchange-rates", "## How a floating exchange rate is determined");
}

// --- Demand-pull and cost-push (inflation/meaning-causes): schematic AD/AS, no numbers
{
  const panel = (ox, title, build) => {
    const ax = D.axes({ x: [0, 10], y: [0, 10], w: 290, h: 330, pad: { l: 30, r: 10, t: 58, b: 40 }, xTicks: [], yTicks: [], xLabel: "Real output", yLabel: "Price level", grid: false });
    return D.group(ax.frame.replaceAll('font-size="14"', 'font-size="13"') + build(ax) + D.text(145, 16, title, { anchor: "middle", weight: 700, size: 14 }), { translate: [ox, 0] });
  };
  const as = [[1, 2.2], [4, 2.8], [6.5, 4.2], [8, 7], [8.6, 9.4]]; // flat at first, steep near full capacity
  const sh = (pts, dx) => pts.map(([x, y]) => [x + dx, y]);
  const adLine = (c) => [[1.5, c + 4.5], [9, c - 3]];
  let body = "";
  // intersection of a straight AD line (price = a - b * output) with the piecewise AS curve, found by scanning
  const asAt = (x) => { for (let i = 0; i < as.length - 1; i += 1) { const [x0, y0] = as[i], [x1, y1] = as[i + 1]; if (x >= x0 && x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0); } return NaN; };
  const meet = (f, curve = asAt) => { let best = null, bd = 1e9; for (let x = 1; x <= 8.6; x += 0.005) { const d = Math.abs(f(x) - curve(x)); if (d < bd) { bd = d; best = [x, f(x)]; } } return best; };
  const ad1 = (x) => 9.2 - 0.8 * x, ad2 = (x) => 12.6 - 0.8 * x, adc = (x) => 10.2 - 0.75 * x;
  const as2 = (x) => asAt(x + 1.8);
  const as2pts = [[0.3, as2(0.3)], ...sh(as, -1.8).filter((q) => q[0] > 0.3)];
  const e1 = meet(ad1), e2 = meet(ad2), c1 = meet(adc), c2 = meet(adc, as2);
  body += panel(5, "Demand-pull: AD shifts right", (ax) =>
    ax.line(as, { stroke: C.amber }) + ax.line([[1, ad1(1)], [8.5, ad1(8.5)]], { stroke: C.blue }) + ax.line([[3.5, ad2(3.5)], [9.3, ad2(9.3)]], { stroke: C.red }) +
    ax.label(8.6, 9.6, "AS", { dx: 4, weight: 700, fill: C.amber }) + ax.label(1, ad1(1), "AD1", { dx: 6, dy: -6, weight: 700, fill: C.blue }) + ax.label(3.5, ad2(3.5), "AD2", { dx: 6, dy: -6, weight: 700, fill: C.red }) +
    ax.point(e1[0], e1[1], { stroke: C.blue, r: 5 }) + ax.point(e2[0], e2[1], { stroke: C.red, r: 5 }) +
    ax.label(e1[0], e1[1], "E1", { dx: -30, dy: -8, size: 13 }) + ax.label(e2[0], e2[1], "E2", { dx: 9, dy: 4, size: 13 }));
  body += panel(305, "Cost-push: AS shifts left", (ax) =>
    ax.line(as, { stroke: C.amber }) + ax.line(as2pts, { stroke: C.red }) + ax.line([[1.5, adc(1.5)], [9, adc(9)]], { stroke: C.blue }) +
    ax.label(8.6, 9.6, "AS1", { dx: 4, weight: 700, fill: C.amber }) + ax.label(0.3, as2(0.3), "AS2", { dx: 6, dy: -8, weight: 700, fill: C.red }) + ax.label(1.5, adc(1.5), "AD", { dx: 6, dy: -8, weight: 700, fill: C.blue }) +
    ax.point(c1[0], c1[1], { stroke: C.amber, r: 5 }) + ax.point(c2[0], c2[1], { stroke: C.red, r: 5 }) +
    ax.label(c1[0], c1[1], "E1", { dx: 8, dy: 4, size: 13 }) + ax.label(c2[0], c2[1], "E2", { dx: -26, dy: 4, size: 13 }));
  const alt = "Two aggregate demand and supply sketches: in demand-pull inflation the AD curve shifts right near full capacity, so the price level rises a lot while output rises only a little; in cost-push inflation the AS curve shifts left, so the price level rises and output falls.";
  await put("demand-pull-cost-push", D.svg(600, 330, body), alt, "Figure: demand-pull inflation comes from a shift of AD to the right; cost-push from a shift of AS to the left", "inflation/meaning-causes", "In words, a diagram of demand-pull inflation");
}

// --- Population pyramids (population/growth-distribution): illustrative values, % of total population
{
  const groups = ["0-14", "15-29", "30-44", "45-59", "60+"];
  const young = { m: [20.5, 14, 9, 4.5, 2], f: [19.5, 14, 9, 4.5, 3] };
  const older = { m: [8.7, 11, 11.3, 10.5, 6.5], f: [8.3, 11, 11.7, 11.5, 9.5] };
  const sum = (o) => o.m.reduce((a, b) => a + b, 0) + o.f.reduce((a, b) => a + b, 0);
  if (Math.abs(sum(young) - 100) > 1e-9 || Math.abs(sum(older) - 100) > 1e-9) throw new Error("pyramid values must total 100");
  const pyramid = (ox, title, data, max) => {
    const cx = 150, bar = 34, gap = 24, top = 52, scale = 110 / max;
    let g = D.text(cx, 18, title, { anchor: "middle", weight: 700, size: 14 });
    g += D.text(cx - 8, 40, "Male %", { anchor: "end", size: 13, fill: C.muted }) + D.text(cx + 8, 40, "Female %", { size: 13, fill: C.muted });
    groups.forEach((name, i) => {
      const y = top + (groups.length - 1 - i) * (bar + gap);
      const mw = data.m[i] * scale, fw = data.f[i] * scale;
      g += D.rect(cx - mw, y, mw, bar, { fill: C.fillBlue, stroke: C.blue, width: 1.5 }) + D.rect(cx, y, fw, bar, { fill: C.fillAmber, stroke: C.amber, width: 1.5 });
      g += D.text(cx - mw - 4, y + bar / 2 + 5, String(data.m[i]), { anchor: "end", size: 13 }) + D.text(cx + fw + 4, y + bar / 2 + 5, String(data.f[i]), { size: 13 });
      g += D.tag(cx, y + bar + 20, name, { anchor: "middle", size: 12, fill: C.muted });
    });
    return D.group(g + D.line(cx, top - 4, cx, top + groups.length * (bar + gap) - gap + 2, { stroke: C.axis, width: 1.5 }), { translate: [ox, 0] });
  };
  const body = pyramid(0, "Young, fast-growing population", young, 20.5) + pyramid(300, "Older, slow-growing population", older, 20.5) +
    D.text(300, 372, "Age group, bars show % of total population (illustrative values)", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Two illustrative population pyramids: the young population has a wide base, 40 percent aged 0 to 14, narrowing quickly to 5 percent aged 60 and over, while the older population has straighter sides, 17 percent aged 0 to 14 and 16 percent aged 60 and over.";
  await put("population-pyramids", D.svg(600, 385, body), alt, "Figure: a wide base means a young, fast-growing population; straighter sides mean an older, slow-growing one", "population/growth-distribution", "ZIMSEC students also study the **population pyramid**");
}

// --- LRAC (firms/economies-of-scale)
{
  const out = [1000, 3000, 6000, 10000, 12000], tc = [20000, 45000, 66000, 100000, 132000];
  const ac = tc.map((t, i) => t / out[i]); // 20,15,11,10,11
  const ax = D.axes({ x: [0, 14000], y: [0, 24], xTicks: 2000, yTicks: 4, xLabel: "Output (units per year)", yLabel: "Average cost (US$ per unit)", w: 600, h: 420 });
  let body = ax.frame + dotted(ax, out.map((q, i) => [q, ac[i]]), { stroke: C.blue });
  out.forEach((q, i) => { if (i === 3) return; body += ax.label(q, ac[i], `Plant ${i + 1}: US$${ac[i]}`, i === 4 ? { dx: 8, dy: -14, size: 13, anchor: "end" } : { dx: 12, dy: -10, size: 13 }); });
  body += ax.point(10000, 10, { stroke: C.red, r: 5.5 }) +
    ax.tag(7500, 18, "Economies of scale: AC falls", { anchor: "middle", fill: C.green }) +
    ax.tag(13800, 4.5, "Diseconomies: AC rises", { anchor: "end", fill: C.red }) +
    ax.tag(10000, 8, "Plant 4: US$10, lowest cost", { anchor: "middle", dy: 24, fill: C.red });
  const alt = "Long-run average cost curve from the five plant sizes: average cost falls from US$20 at 1,000 units to US$10 at 10,000 units (economies of scale), then rises to US$11 at 12,000 units (diseconomies of scale), so the most efficient scale is 10,000 units.";
  await put("lrac-plant-sizes", D.svg(600, 420, body), alt, "Figure: the long-run average cost curve falls, reaches a minimum, then rises", "firms/economies-of-scale", "To describe the diagram: put **average cost** on the vertical axis");
}

// --- Externalities: smelter batches (market-failure/externalities)
{
  const batch = [1, 2, 3, 4, 5];
  const rev = 900, priv = [500, 600, 700, 850, 950], ext = 250, soc = priv.map((v) => v + ext);
  const ax = D.axes({ x: [0, 6], y: [400, 1300], xTicks: 1, yTicks: 100, xLabel: "Batches per week", yLabel: "US$ per extra batch", w: 600, h: 440 });
  const body = ax.frame + ax.line([[0.5, rev], [5.6, rev]], { stroke: C.green, width: 2.4 }) +
    dotted(ax, batch.map((b, i) => [b, priv[i]]), { stroke: C.blue }) + dotted(ax, batch.map((b, i) => [b, soc[i]]), { stroke: C.amber }) +
    ax.line([[2, 400], [2, 850]], { stroke: C.muted, dash: true, width: 1.6 }) + ax.line([[4, 400], [4, 850]], { stroke: C.muted, dash: true, width: 1.6 }) +
    ax.label(0.55, rev, "Extra revenue 900", { anchor: "start", dy: -8, fill: C.green, weight: 700, size: 13 }) +
    lab(ax, 5, priv[4], "Private cost", { dx: 10, dy: 4, fill: C.blue, size: 13 }) + lab(ax, 5, soc[4], "Social cost", { dx: 10, dy: 4, fill: C.amber, size: 13 }) +
    ax.tag(2, 440, "Best for society: 2", { anchor: "middle", fill: C.amber }) + ax.tag(4, 440, "Firm produces: 4", { anchor: "middle", fill: C.blue });
  const alt = "Smelter example: each extra batch earns US$900; extra private cost (500, 600, 700, 850, 950) stays below 900 up to the 4th batch, so the firm produces 4, but extra social cost (private plus US$250 external cost) stays below 900 only up to the 2nd batch, so the best output for society is 2 batches.";
  await put("smelter-social-cost", D.svg(600, 440, body), alt, "Figure: the firm compares revenue with private cost; society should compare it with social cost", "market-failure/externalities", "- The market over-produces by 2 batches.");
}

// --- Current account balances (bop/current-account)
{
  const cats = ["Goods", "Services", "Primary\nincome", "Secondary\nincome", "Current\naccount"];
  const goods = 4200 - 5100, services = 900 - 1150, primary = 300 - 850, secondary = 1400 - 200;
  const vals = [goods, services, primary, secondary, goods + services + primary + secondary]; // -900,-250,-550,1200,-500
  const ax = D.axes({ x: [0, 5], y: [-1200, 1600], xTicks: [], yTicks: 400, xLabel: "", yLabel: "Balance (US$ million)", w: 600, h: 440, pad: { b: 70 } });
  let body = ax.frame;
  vals.forEach((v, i) => {
    const cx = i + 0.5, w = 0.6;
    const x = ax.X(cx - w / 2), wpx = ax.X(cx + w / 2) - x;
    const y0 = ax.Y(0), y1 = ax.Y(v);
    body += D.rect(x, Math.min(y0, y1), wpx, Math.abs(y1 - y0), { fill: v < 0 ? "#fbe3e0" : C.fillGreen, stroke: v < 0 ? C.red : C.green, width: i === 4 ? 3 : 1.6 });
    body += D.text(ax.X(cx), v < 0 ? y1 + 18 : y1 - 8, (v > 0 ? "+" : "−") + Math.abs(v).toLocaleString("en-GB"), { anchor: "middle", size: 14, weight: 700, fill: v < 0 ? C.red : C.green });
    body += D.text(ax.X(cx), ax.Y(-1200) + 24, cats[i], { anchor: "middle", size: 13 });
  });
  const alt = "Current account of a fictional country in US$ million: goods balance -900, services -250, primary income -550 and secondary income +1,200 add up to a current account deficit of 500; the large remittances in secondary income reduce the deficit but do not remove it.";
  await put("current-account-balances", D.svg(600, 440, body), alt, "Figure: the four balances add up to the current account balance (negative bars are deficits)", "bop/current-account", "## Interpreting a deficit or a surplus");
}

// --- Labour market (labour/wage-determination): Qd = 900 - 30W, Qs = 45W - 150
{
  const qd = (w) => 900 - 30 * w, qs = (w) => 45 * w - 150;
  const ax = D.axes({ x: [200, 800], y: [8, 20], xTicks: 100, yTicks: 2, xLabel: "Bricklayers", yLabel: "Daily wage (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line(two(qd, 9, 19), { stroke: C.blue }) + ax.line(two(qs, 9, 19), { stroke: C.amber }) +
    ax.line([[qs(12), 12], [qd(12), 12]], { stroke: C.red, width: 4 }) + ax.line([[qd(16), 16], [qs(16), 16]], { stroke: C.red, width: 4 }) +
    ax.point(480, 14) + ax.guides(480, 14) +
    lab(ax, qd(19), 19, "DL", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, qs(19), 19, "SL", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(480, 14, "Equilibrium: US$14, 480", { dx: 14, dy: 22 }) +
    ax.tag(qd(12), 12, "Shortage 150 at US$12", { dx: 10, dy: 8, fill: C.red }) +
    ax.tag(qs(16), 16, "Surplus 150 at US$16", { dx: -10, dy: -10, anchor: "end", fill: C.red });
  const alt = "Labour market for bricklayers: demand DL slopes down and supply SL slopes up and they cross at a wage of US$14 a day with 480 workers; at US$12 there is a shortage of 150 workers (540 wanted, 390 offered) and at US$16 a surplus of 150 (570 offered, 420 wanted).";
  await put("bricklayers-wage-equilibrium", D.svg(600, 440, body), alt, "Figure: the equilibrium wage is where the demand for and supply of labour cross", "labour/wage-determination", "**Describing the diagram.** Put the wage rate");
}

// --- Nominal vs real GDP (growth/economic-growth): Country X
{
  const nominal = [48000, 54000], price = [100, 110], real = nominal.map((n, i) => (n / price[i]) * 100); // 48000, 49090.9
  const ax = D.axes({ x: [0, 4], y: [0, 60000], xTicks: [], yTicks: 10000, xLabel: "", yLabel: "US$ million", w: 600, h: 420, pad: { b: 62 } });
  const bar = (cx, v, fill, stroke) => {
    const x = ax.X(cx - 0.35), w = ax.X(cx + 0.35) - x;
    return D.rect(x, ax.Y(v), w, ax.Y(0) - ax.Y(v), { fill, stroke, width: 1.6 }) + D.text(ax.X(cx), ax.Y(v) - 7, v.toLocaleString("en-GB", { maximumFractionDigits: 1 }), { anchor: "middle", size: 13, weight: 700 });
  };
  let body = ax.frame + bar(0.6, nominal[0], C.fillBlue, C.blue) + bar(1.4, real[0], C.fillAmber, C.amber) + bar(2.6, nominal[1], C.fillBlue, C.blue) + bar(3.4, real[1], C.fillAmber, C.amber);
  body += D.text(ax.X(1), ax.Y(0) + 24, "2025", { anchor: "middle", size: 14, weight: 700 }) + D.text(ax.X(3), ax.Y(0) + 24, "2026", { anchor: "middle", size: 14, weight: 700 });
  body += D.text(ax.X(0.6), ax.Y(0) + 44, "nominal", { anchor: "middle", size: 13, fill: C.blue }) + D.text(ax.X(1.4), ax.Y(0) + 44, "real", { anchor: "middle", size: 13, fill: C.amber }) +
    D.text(ax.X(2.6), ax.Y(0) + 44, "nominal", { anchor: "middle", size: 13, fill: C.blue }) + D.text(ax.X(3.4), ax.Y(0) + 44, "real", { anchor: "middle", size: 13, fill: C.amber });
  body += ax.tag(3, 58000, "nominal +12.5%, real +2.3%", { anchor: "middle", fill: C.red });
  const alt = "Country X GDP: nominal GDP rises from US$48,000 million in 2025 to US$54,000 million in 2026 (12.5 percent) but real GDP in 2025 prices rises only from 48,000 to 49,090.9 million (2.3 percent), because prices rose 10 percent.";
  await put("nominal-real-gdp", D.svg(600, 420, body), alt, "Figure: most of the rise in nominal GDP is higher prices; real GDP grew far less", "growth/economic-growth", "## Measuring growth: why real GDP?");
}

// --- Average tax rate (fiscal/taxation): first 300 free, 20% to 1,000, 30% above
{
  const tax = (y) => 0.2 * Math.max(0, Math.min(y, 1000) - 300) + 0.3 * Math.max(0, y - 1000);
  const avg = (y) => (tax(y) / y) * 100;
  const pts = [];
  for (let y = 300; y <= 3000; y += 100) pts.push([y, avg(y)]);
  const ax = D.axes({ x: [0, 3000], y: [0, 30], xTicks: 500, yTicks: 5, xLabel: "Monthly income (US$)", yLabel: "Average tax rate (%)", w: 600, h: 420 });
  const body = ax.frame + ax.line([[0, 10], [3000, 10]], { stroke: C.muted, dash: true, width: 2 }) + ax.line(pts, { stroke: C.blue }) +
    ax.point(800, avg(800), { stroke: C.red, r: 5 }) + ax.point(2000, avg(2000), { stroke: C.red, r: 5 }) +
    ax.tag(800, avg(800), `US$800: ${avg(800)}%`, { dx: 12, dy: 22, fill: C.red }) + ax.tag(2000, avg(2000), `US$2,000: ${avg(2000)}%`, { dx: -10, dy: 44, anchor: "end", fill: C.red }) +
    ax.tag(3000, 10, "Proportional 10%: flat", { anchor: "end", dy: 22, fill: C.muted }) + ax.label(3000, avg(3000), "Progressive", { anchor: "end", dy: -12, weight: 700, fill: C.blue });
  const alt = "Average tax rate against monthly income for a banded income tax (first US$300 free, 20 percent up to US$1,000, 30 percent above): it rises from 12.5 percent at US$800 to 22.0 percent at US$2,000, so the tax is progressive, whereas a proportional tax stays at a flat rate.";
  await put("progressive-tax-average-rate", D.svg(600, 420, body), alt, "Figure: under a progressive tax the average rate rises with income; a proportional tax stays flat", "fiscal/taxation", "A **proportional** (flat) tax charges");
}
