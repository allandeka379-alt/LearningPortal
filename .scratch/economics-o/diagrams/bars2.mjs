// Second pass: bank credit creation, value chain, unemployment types, free riders, labour- vs capital-intensive cost.
// Run: node .scratch/economics-o/diagrams/bars2.mjs
import { D, C, lab } from "./common.mjs";
import { putB as put } from "./place.mjs";

/** Category axes: n slots, returns slot-centre x helper and bar width in pixels. */
const cat = (n, yMax, o) => {
  const ax = D.axes({ x: [0, n], y: [0, yMax], xTicks: [], origin: false, arrows: false, ...o });
  return { ax, cx: (i) => ax.X(i + 0.5), bw: (ax.X(1) - ax.X(0)) * (o.bwFrac ?? 0.6) };
};
const bar = (c, i, y0, y1, fill, stroke = "none") => D.rect(c.cx(i) - c.bw / 2, c.ax.Y(y1), c.bw, c.ax.Y(y0) - c.ax.Y(y1), { fill, stroke, width: 1.2 });
const fmt = (v) => v.toLocaleString("en-GB");

// --- Credit creation (money/banking): 20% reserve ratio, US$5,000 new deposit, four banks
{
  const ratio = 0.2;
  let dep = 5000;
  const rows = [];
  for (let i = 0; i < 4; i += 1) { rows.push({ bank: String.fromCharCode(65 + i), dep, res: dep * ratio, lent: dep * (1 - ratio) }); dep = dep * (1 - ratio); }
  const total = rows.reduce((a, r) => a + r.dep, 0);
  if (Math.round(total) !== 14760) throw new Error("credit total must be 14,760");
  const max = 5000 / ratio;
  const c = cat(4, 6000, { w: 600, h: 440, yTicks: 1000, yLabel: "US$", xLabel: "", pad: { l: 70, r: 20, t: 30, b: 70 } });
  let body = c.ax.frame;
  rows.forEach((r, i) => {
    body += bar(c, i, 0, r.res, C.amber) + bar(c, i, r.res, r.dep, C.teal);
    body += D.text(c.cx(i), c.ax.Y(0) + 20, `Bank ${r.bank}`, { anchor: "middle", size: 14 });
    body += D.text(c.cx(i), c.ax.Y(r.dep) - 8, `${fmt(r.dep)} deposited`, { anchor: "middle", size: 13, weight: 700 });
    body += D.text(c.cx(i), c.ax.Y(r.res / 2) + 5, `kept ${fmt(r.res)}`, { anchor: "middle", size: 13, fill: "#ffffff", weight: 700 });
    body += D.text(c.cx(i), c.ax.Y(r.res + r.lent / 2) + 5, `lent ${fmt(r.lent)}`, { anchor: "middle", size: 13, fill: "#ffffff", weight: 700 });
  });
  body += D.text(300, 428, `Deposits after four banks: ${fmt(total)}. Limit: 5,000 / 0.2 = ${fmt(max)}`, { anchor: "middle", size: 14, weight: 700 });
  const alt = `Credit creation with a 20 percent reserve ratio: a US$5,000 deposit in Bank A is split into 1,000 kept and 4,000 lent; the 4,000 becomes Bank B's deposit (800 kept, 3,200 lent), then Bank C 3,200 (640 and 2,560), then Bank D 2,560 (512 and 2,048); total deposits after four banks are ${fmt(total)} and the maximum is 5,000 divided by 0.2, which is US$${fmt(max)}.`;
  await put("credit-creation-rounds", D.svg(600, 440, body), alt, "Figure: each bank keeps 20% as reserves and lends the rest, so every new deposit is 80% of the last", "money/banking", "Tatenda deposits US\\$5,000 of new cash");
}

// --- Value added (production/stages): cotton chain table
{
  const st = [
    { n: "Farmer\n(primary)", inp: 0, out: 120 },
    { n: "Ginnery\n(secondary)", inp: 120, out: 200 },
    { n: "Mill\n(secondary)", inp: 200, out: 340 },
    { n: "Factory\n(secondary)", inp: 340, out: 560 },
    { n: "Retailer\n(tertiary)", inp: 560, out: 700 },
  ];
  const sum = st.reduce((a, s) => a + (s.out - s.inp), 0);
  if (sum !== 700) throw new Error("value added must total 700");
  const c = cat(5, 800, { w: 600, h: 440, yTicks: 100, yLabel: "US$", bwFrac: 0.62, pad: { l: 60, r: 20, t: 30, b: 70 } });
  let body = c.ax.frame;
  st.forEach((s, i) => {
    body += bar(c, i, 0, s.inp, C.fillGrey, C.muted) + bar(c, i, s.inp, s.out, C.teal);
    body += D.text(c.cx(i), c.ax.Y(0) + 20, s.n, { anchor: "middle", size: 13 });
    body += D.text(c.cx(i), c.ax.Y(s.out) - 8, `+${s.out - s.inp}`, { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  });
  body += D.text(c.ax.X(5) - 4, c.ax.Y(780) + 4, "Grey: cost of inputs bought. Blue: value added. Sum of the blue parts = 700", { anchor: "end", size: 13, fill: C.muted });
  const alt = "Value added along a cotton-to-shirt chain: the farmer adds 120, the ginnery 80, the mill 140, the clothing factory 220 and the retailer 140; each bar rises from the cost of inputs to the value of output and the total value added is 700, the price consumers pay for the shirts.";
  await put("value-added-cotton-chain", D.svg(600, 440, body), alt, "Figure: value is added at every stage, and the parts add up to the final price of US$700", "production/stages", "Value is added at each stage when a firm sells its output for more than it paid for its inputs.");
}

// --- Unemployment types (unemployment/types): district table, labour force 200 thousand
{
  const q = [["Jan-Mar", 6, 14, 4], ["Apr-Jun", 6, 14, 2], ["Jul-Sep", 6, 14, 15], ["Oct-Dec", 6, 14, 9]];
  const lf = 200;
  const c = cat(4, 45, { w: 600, h: 440, yTicks: 5, yLabel: "Unemployed (thousand)", bwFrac: 0.55, pad: { l: 64, r: 20, t: 34, b: 66 } });
  let body = c.ax.frame;
  q.forEach(([name, f, s, se], i) => {
    const tot = f + s + se;
    body += bar(c, i, 0, f, C.teal) + bar(c, i, f, f + s, C.blue) + bar(c, i, f + s, tot, C.amber);
    body += D.text(c.cx(i), c.ax.Y(0) + 20, name, { anchor: "middle", size: 14 });
    body += D.text(c.cx(i), c.ax.Y(tot) - 20, `${tot} thousand`, { anchor: "middle", size: 13, weight: 700 });
    body += D.text(c.cx(i), c.ax.Y(tot) - 5, `${Math.round((tot / lf) * 1000) / 10}%`, { anchor: "middle", size: 13, weight: 700, fill: C.red });
    body += D.text(c.cx(i), c.ax.Y(f / 2) + 5, `${f}`, { anchor: "middle", size: 13, fill: "#fff", weight: 700 });
    body += D.text(c.cx(i), c.ax.Y(f + s / 2) + 5, `${s}`, { anchor: "middle", size: 13, fill: "#fff", weight: 700 });
    if (se >= 4) body += D.text(c.cx(i), c.ax.Y(f + s + se / 2) + 5, `${se}`, { anchor: "middle", size: 13, fill: "#fff", weight: 700 });
  });
  body += D.rect(c.ax.X(0) + 12, c.ax.Y(44), 14, 14, { fill: C.teal, stroke: "none" }) + D.text(c.ax.X(0) + 32, c.ax.Y(44) + 12, "Frictional", { size: 13 });
  body += D.rect(c.ax.X(0) + 112, c.ax.Y(44), 14, 14, { fill: C.blue, stroke: "none" }) + D.text(c.ax.X(0) + 132, c.ax.Y(44) + 12, "Structural", { size: 13 });
  body += D.rect(c.ax.X(0) + 212, c.ax.Y(44), 14, 14, { fill: C.amber, stroke: "none" }) + D.text(c.ax.X(0) + 232, c.ax.Y(44) + 12, "Seasonal", { size: 13 });
  const alt = "Stacked bars of unemployment in a farming district with a labour force of 200 thousand: frictional (6 thousand) and structural (14 thousand) stay the same every quarter, while seasonal unemployment is 4, 2, 15 and 9 thousand, so the total is 24, 22, 35 and 29 thousand, a rate of 12.0, 11.0, 17.5 and 14.5 percent, highest in July to September.";
  await put("unemployment-types-district", D.svg(600, 440, body), alt, "Figure: only the seasonal part of unemployment changes through the year; frictional and structural stay at 20 thousand", "unemployment/types", "The table shows estimated unemployment (in thousands) in a fictional farming district");
}

// --- Free riders (market-failure/goods): street-lighting example
{
  const traders = 60, value = 55, cost = 2400, pay = 40, payers = 25;
  const vals = [["Value to the\n60 traders", traders * value, C.green], ["Cost of\nlighting", cost, C.red], [`Collected if only\n${payers} pay`, payers * pay, C.amber]];
  const c = cat(3, 3600, { w: 560, h: 420, yTicks: 600, yLabel: "US$ a year", bwFrac: 0.5, pad: { l: 70, r: 20, t: 30, b: 70 } });
  let body = c.ax.frame;
  vals.forEach(([n, v, col], i) => {
    body += bar(c, i, 0, v, col) + D.text(c.cx(i), c.ax.Y(v) - 8, fmt(v), { anchor: "middle", size: 14, weight: 700 }) + D.text(c.cx(i), c.ax.Y(0) + 20, n, { anchor: "middle", size: 13 });
  });
  body += D.line(c.ax.X(0), c.ax.Y(cost), c.ax.X(3), c.ax.Y(cost), { stroke: C.red, dash: true, width: 1.5 });
  const alt = `Street lighting for 60 traders: it is worth ${traders} x ${value} = US$${fmt(traders * value)} a year to them and costs US$${fmt(cost)}, so it should be provided, but if only ${payers} traders pay US$${pay} each the firm collects US$${fmt(payers * pay)}, far below the cost, because the others free ride.`;
  await put("free-rider-street-lighting", D.svg(560, 420, body), alt, "Figure: the lighting is worth more than it costs, but free riders leave the firm with less than half the cost", "market-failure/goods", "Some goods are **quasi-public**");
}

// --- Labour- vs capital-intensive cost (production/factor-demand): 60 workers + 200, 15 workers + 680
{
  const L = (w) => 60 * w + 200, K = (w) => 15 * w + 680;
  const cross = (680 - 200) / (60 - 15);
  const ax = D.axes({ x: [4, 16], y: [600, 1000], xTicks: 2, yTicks: 100, xLabel: "Daily wage (US$)", yLabel: "Total daily cost (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line([[4, L(4)], [16, L(16)]].filter(([, y]) => y <= 1000 || true), { stroke: C.amber }) + ax.line([[4, K(4)], [16, K(16)]], { stroke: C.blue }) +
    ax.point(12, L(12), { stroke: C.amber, r: 5 }) + ax.point(12, K(12), { stroke: C.blue, r: 5 }) + ax.point(8, L(8), { stroke: C.amber, r: 5 }) + ax.point(8, K(8), { stroke: C.blue, r: 5 }) +
    ax.point(cross, L(cross), { stroke: C.red, r: 5 }) + ax.guides(cross, L(cross)) +
    ax.tag(12, L(12), "12: labour 920", { dx: -8, dy: -8, anchor: "end", fill: C.amber }) + ax.tag(12, K(12), "12: capital 860", { dx: 8, dy: 26, fill: C.blue }) +
    ax.tag(8, L(8), "8: labour 680", { dx: 8, dy: 28, fill: C.amber }) + ax.tag(8, K(8), "8: capital 800", { dx: -8, dy: -10, anchor: "end", fill: C.blue }) +
    ax.tag(cross, L(cross), `equal cost at about ${cross.toFixed(2)}`, { dx: 10, dy: 44, fill: C.red }) +
    ax.label(4.2, 975, "Labour-intensive (60 workers)", { size: 13, weight: 700, fill: C.amber }) +
    ax.label(4.2, 950, "Capital-intensive (15 workers)", { size: 13, weight: 700, fill: C.blue });
  const alt = `Total daily cost against the daily wage for two methods: labour-intensive (60 workers plus US$200 of machinery) costs 60w + 200 and capital-intensive (15 workers plus US$680) costs 15w + 680; at a wage of US$12 they cost 920 and 860 so capital is cheaper, at US$8 they cost 680 and 800 so labour is cheaper, and the costs are equal at about US$${cross.toFixed(2)}.`;
  await put("labour-capital-cost-lines", D.svg(600, 440, body), alt, "Figure: below a wage of about US$10.67 the labour-intensive method is cheaper; above it the capital-intensive method is", "production/factor-demand", "Relative factor prices decide the choice.");
}
