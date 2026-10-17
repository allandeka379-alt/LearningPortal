// Product life cycle, Boston matrix, Ansoff, force field, segmentation (mix/, strategy/, marketing/).
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

// ---- 1. Product life cycle with Tsitsi Solar's lamp ----
{
  const sales = [2000, 6500, 14000, 22000, 24000, 23500, 19000, 12000];
  const yrs = sales.map((_, i) => i + 1);
  const ax = D.axes({ x: [0.5, 8.5], y: [0, 32000], w: 600, h: 400, xTicks: yrs, yTicks: [0, 5000, 10000, 15000, 20000, 25000, 30000], xLabel: "Year", yLabel: "Sales (units)", pad: { l: 76, r: 24, t: 30, b: 56 } });
  let b = "";
  const stageBand = (a, z, label, fill) => {
    b += D.rect(ax.X(a), ax.Y(32000), ax.X(z) - ax.X(a), ax.Y(0) - ax.Y(32000), { fill, stroke: "none" });
  };
  stageBand(0.5, 4.5, "", C.fillBlue); stageBand(4.5, 5.5, "", C.fillAmber); stageBand(5.5, 8.5, "", C.fillGrey);
  b += ax.frame;
  b += ax.line(sales.map((v, i) => [i + 1, v]), { stroke: C.blue });
  sales.forEach((v, i) => { b += ax.point(i + 1, v, { r: 4.5, stroke: C.blue }); });
  sales.forEach((v, i) => { b += D.text(ax.X(i + 1), ax.Y(v) + (i >= 5 ? 26 : -12), v.toLocaleString("en-GB"), { anchor: "middle", size: 12, fill: C.ink }); });
  b += D.text(ax.X(2.5), ax.Y(32000) + 20, "Introduction and growth", { anchor: "middle", size: 13, weight: 700, fill: C.blue });
  b += D.text(ax.X(2.5), ax.Y(32000) + 37, "(years 1 to 4)", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(ax.X(5), ax.Y(32000) + 20, "Maturity", { anchor: "middle", size: 13, weight: 700, fill: C.amber });
  b += D.text(ax.X(5), ax.Y(32000) + 37, "(year 5)", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(ax.X(7), ax.Y(32000) + 20, "Decline", { anchor: "middle", size: 13, weight: 700, fill: C.muted });
  b += D.text(ax.X(7), ax.Y(32000) + 37, "(years 6 to 8)", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Product life cycle of the solar lamp: sales rise from 2,000 units in year 1 to a peak of 24,000 in year 5 (introduction and growth in years 1 to 4, maturity in year 5), then fall to 23,500, 19,000 and 12,000 in years 6 to 8, the decline stage; year 8 sales are half the year 5 peak.";
  const cap = "Figure: the life cycle of the Tsitsi Solar lamp, drawn from the sales table";
  await D.figure(FAM, "product-life-cycle-lamp", D.svg(600, 400, b), { alt, caption: cap });
  place(L("mix/life-cycle-portfolio"), "| Year 8 | 12,000 |", D.md("product-life-cycle-lamp", alt, cap), { block: true });
}

// ---- 2. Boston matrix with Mhofu Foods ----
{
  const items = [
    { n: "Maize meal", sales: 480000, rival: 300000, g: 2 },
    { n: "Peanut butter", sales: 210000, rival: 350000, g: 14 },
    { n: "Chilli sauce", sales: 300000, rival: 250000, g: 12 },
    { n: "Dried fruit", sales: 60000, rival: 240000, g: 3 },
  ];
  items.forEach((i) => { i.rs = i.sales / i.rival; });
  const ax = D.axes({ x: [0, 2], y: [0, 16], w: 600, h: 440, xTicks: [0, 0.5, 1, 1.5, 2], yTicks: [0, 4, 8, 12, 16], xLabel: "Relative market share", yLabel: "Market growth (% a year)", pad: { l: 64, r: 24, t: 34, b: 56 }, yFormat: (v) => v + "%", grid: false });
  let b = "";
  b += D.rect(ax.X(0), ax.Y(16), ax.X(1) - ax.X(0), ax.Y(10) - ax.Y(16), { fill: C.fillAmber, stroke: "none" });
  b += D.rect(ax.X(1), ax.Y(16), ax.X(2) - ax.X(1), ax.Y(10) - ax.Y(16), { fill: C.fillGreen, stroke: "none" });
  b += D.rect(ax.X(0), ax.Y(10), ax.X(1) - ax.X(0), ax.Y(0) - ax.Y(10), { fill: C.fillGrey, stroke: "none" });
  b += D.rect(ax.X(1), ax.Y(10), ax.X(2) - ax.X(1), ax.Y(0) - ax.Y(10), { fill: C.fillBlue, stroke: "none" });
  b += ax.frame;
  b += D.line(ax.X(1), ax.Y(0), ax.X(1), ax.Y(16), { stroke: C.axis, width: 1.4, dash: true });
  b += D.line(ax.X(0), ax.Y(10), ax.X(2), ax.Y(10), { stroke: C.axis, width: 1.4, dash: true });
  const q = (x, y, s) => D.text(ax.X(x), ax.Y(y), s, { anchor: "middle", size: 13, weight: 700, fill: C.muted });
  b += D.text(ax.X(0.03), ax.Y(15.2), "QUESTION MARK", { size: 13, weight: 700, fill: C.muted }) + q(1.5, 15.2, "STAR") + q(0.5, 0.9, "DOG") + D.text(ax.X(1.03), ax.Y(0.9), "CASH COW", { size: 13, weight: 700, fill: C.muted });
  const k = 30 / Math.sqrt(480000);
  const lab = { "Maize meal": [0, -42, "middle"], "Peanut butter": [0, 44, "middle"], "Chilli sauce": [0, -34, "middle"], "Dried fruit": [18, 5, "start"] };
  for (const i of items) {
    const r = k * Math.sqrt(i.sales);
    b += D.circle(ax.X(i.rs), ax.Y(i.g), r, { fill: C.teal + "99", stroke: C.blue, width: 2 });
    const [dx, dy, an] = lab[i.n];
    b += D.text(ax.X(i.rs) + dx, ax.Y(i.g) + dy, `${i.n} (${i.rs.toFixed(2)}, ${i.g}%)`, { anchor: an, size: 13, weight: 700 });
  }
  b += D.text(ax.X(2), 22, "Bubble area = sales", { anchor: "end", size: 12, fill: C.muted });
  const alt = "Boston matrix for Mhofu Foods: chilli sauce (relative share 1.20, growth 12%) is a star; maize meal (1.60, 2%) is a cash cow; peanut butter (0.60, 14%) is a question mark; dried fruit (0.25, 3%) is a dog. The dividing lines are relative share 1.0 and growth of 10% a year.";
  const cap = "Figure: the four Mhofu Foods products placed on the Boston matrix (bubble area is sales)";
  await D.figure(FAM, "boston-matrix-mhofu", D.svg(600, 440, b), { alt, caption: cap });
  place(L("mix/life-cycle-portfolio"), "| Dried fruit | 60,000 |", D.md("boston-matrix-mhofu", alt, cap), { block: true });
}

// ---- 3. Ansoff matrix with Thandeka's options ----
{
  const W = 600, H = 296, x0 = 120, y0 = 58, cw = 230, ch = 112;
  let b = "";
  b += D.text(x0 + cw / 2, 30, "Existing products", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(x0 + cw * 1.5, 30, "New products", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(x0 - 10, y0 + ch / 2 - 4, "Existing\nmarkets", { anchor: "end", size: 14, weight: 700 });
  b += D.text(x0 - 10, y0 + ch * 1.5 - 4, "New\nmarkets", { anchor: "end", size: 14, weight: 700 });
  const cells = [
    [0, 0, "Market penetration", "Lowest risk", "1: loyalty discount to\nshops that already buy", C.fillGreen],
    [1, 0, "Product development", "Medium risk", "2: yoghurt for the\nsame shops", C.fillBlue],
    [0, 1, "Market development", "Medium risk", "3: fresh milk to\nshops in Gweru", C.fillBlue],
    [1, 1, "Diversification", "Highest risk", "4: farm shop for tourists\nselling cheese and crafts", C.fillAmber],
  ];
  for (const [i, j, t, r, ex, fill] of cells) {
    const x = x0 + i * cw, y = y0 + j * ch;
    b += D.rect(x + 3, y + 3, cw - 6, ch - 6, { fill, stroke: C.axis, width: 1.6, r: 8 });
    b += D.text(x + cw / 2, y + 28, t, { anchor: "middle", size: 15, weight: 700 });
    b += D.text(x + cw / 2, y + 48, r, { anchor: "middle", size: 13, fill: C.muted });
    b += D.text(x + cw / 2, y + 74, ex, { anchor: "middle", size: 13 });
  }
  const alt = "Ansoff matrix with Thandeka's four options: loyalty discount to existing shops is market penetration (lowest risk); yoghurt for the same shops is product development and milk to Gweru is market development (both medium risk); a tourist farm shop selling cheese and crafts is diversification (highest risk).";
  const cap = "Figure: Thandeka's four growth options placed on the Ansoff matrix";
  await D.figure(FAM, "ansoff-matrix-milk", D.svg(W, H, b), { alt, caption: cap });
  place(L("strategy/models"), "| 4 | New | New | Diversification | Highest |", D.md("ansoff-matrix-milk", alt, cap), { block: true });
}

// ---- 4. Force field analysis (scores before and after) ----
{
  const drive = [["Parents want to order from home", 4], ["Saves time on paper orders", 3], ["Head supports the idea", 2]];
  const before = [["Staff fear extra work", 3], ["Poor network at school", 4], ["Cost of phones", 2]];
  const after = [["Staff fear extra work", 1], ["Poor network at school", 4], ["Cost of phones", 1]];
  const sum = (a) => a.reduce((s, x) => s + x[1], 0);
  const W = 640, H = 340, mid = 345, u = 34;
  let b = "";
  const side = (rows, dir, col, fill, y) => rows.forEach(([n, v], i) => {
    const yy = y + i * 38;
    const w = v * u;
    b += D.rect(dir > 0 ? mid + 6 : mid - 6 - w, yy, w, 28, { fill, stroke: col, width: 1.6, r: 4 });
    b += D.text(dir > 0 ? mid + 6 + w / 2 : mid - 6 - w / 2, yy + 19, String(v), { anchor: "middle", size: 14, weight: 700 });
  });
  b += D.text(mid - 14, 22, "Driving forces (total " + sum(drive) + ")", { anchor: "end", size: 14, weight: 700, fill: C.green });
  b += D.text(mid + 14, 22, "Restraining (total " + sum(before) + ")", { size: 14, weight: 700, fill: C.red });
  side(drive, -1, C.green, C.fillGreen, 36);
  side(before, 1, C.red, "#fde3e0", 36);
  drive.forEach(([n], i) => { b += D.text(mid - 6 - 4 * u - 6, 36 + i * 38 + 19, "", {}); });
  b += D.line(mid, 30, mid, 150, { stroke: C.axis, width: 1.6 });
  drive.forEach(([n, v], i) => { b += D.text(mid - 12 - v * u, 36 + i * 38 + 19, n, { anchor: "end", size: 12, fill: C.muted }); });
  before.forEach(([n, v], i) => { b += D.text(mid + 12 + v * u, 36 + i * 38 + 19, n, { size: 12, fill: C.muted }); });
  b += D.text(W / 2, 178, "After training and a tablet on the school network", { anchor: "middle", size: 14, weight: 700 });
  b += D.text(mid + 14, 202, "Restraining (total " + sum(after) + ")", { size: 14, weight: 700, fill: C.red });
  b += D.text(mid - 14, 202, "Driving (total " + sum(drive) + ")", { anchor: "end", size: 14, weight: 700, fill: C.green });
  side(drive, -1, C.green, C.fillGreen, 214);
  side(after, 1, C.red, "#fde3e0", 214);
  b += D.line(mid, 208, mid, 328, { stroke: C.axis, width: 1.6 });
  drive.forEach(([n, v], i) => { b += D.text(mid - 12 - v * u, 214 + i * 38 + 19, n, { anchor: "end", size: 12, fill: C.muted }); });
  after.forEach(([n, v], i) => { b += D.text(mid + 12 + v * u, 214 + i * 38 + 19, n, { size: 12, fill: C.muted }); });
  const alt = `Force field analysis for the school's phone ordering: driving forces score 4, 3 and 2 (total ${sum(drive)}) against restraining forces of 3, 4 and 2 (total ${sum(before)}), so the change stalls; cutting staff fears to 1 and phone cost to 1 reduces the restraining total to ${sum(after)} and the change can go ahead.`;
  const cap = "Figure: force field scores before and after reducing two restraining forces";
  await D.figure(FAM, "force-field-scores", D.svg(W, H, b), { alt, caption: cap });
  place(L("strategy/models"), "4. If staff fears fall from 3 to 1", D.md("force-field-scores", alt, cap), { block: true });
}

// ---- 5. Segmentation: revenue by segment ----
{
  const seg = [["Students\n(18-24)", 6000, 0.05, 15], ["Young professionals\n(25-40)", 4000, 0.10, 30], ["Retired people\n(60+)", 1500, 0.20, 20]]
    .map(([n, p, r, f]) => ({ n, members: p * r, rev: p * r * f * 12, f }));
  const W = 600, H = 380;
  const yMax = 160000;
  const ax = D.axes({ x: [0, 3], y: [0, yMax], w: W, h: H, xTicks: [], yTicks: [0, 40000, 80000, 120000, 160000], yLabel: "Annual revenue (US$)", origin: false, arrows: false, pad: { l: 84, r: 24, t: 30, b: 64 } });
  let b = ax.frame;
  const bw = (ax.X(1) - ax.X(0)) * 0.55;
  seg.forEach((s, i) => {
    const cx = ax.X(i + 0.5);
    const top = s.rev === Math.max(...seg.map((z) => z.rev));
    b += D.rect(cx - bw / 2, ax.Y(s.rev), bw, ax.Y(0) - ax.Y(s.rev), { fill: top ? C.teal : C.fillBlue, stroke: C.blue, width: 1.6 });
    b += D.text(cx, ax.Y(s.rev) - 22, "US$" + s.rev.toLocaleString("en-GB"), { anchor: "middle", size: 14, weight: 700 });
    b += D.text(cx, ax.Y(s.rev) - 6, `${s.members} members at US$${s.f}`, { anchor: "middle", size: 12, fill: C.muted });
    b += D.text(cx, ax.Y(0) + 20, s.n, { anchor: "middle", size: 13 });
  });
  const alt = "Bar chart of the gym's expected annual revenue by segment: students US$54,000 (300 members at US$15 a month), young professionals US$144,000 (400 members at US$30) and retired people US$72,000 (300 members at US$20); young professionals give the highest revenue.";
  const cap = "Figure: expected annual revenue from each target segment (members x monthly fee x 12)";
  await D.figure(FAM, "segment-revenue-gym", D.svg(W, H, b), { alt, caption: cap });
  place(L("marketing/segmentation-niche"), "3. Young professionals give the highest revenue", D.md("segment-revenue-gym", alt, cap), { block: true });
}
