// accounting-a: cost, standard costing and investment appraisal diagrams.
// Run: node .scratch/accounting-a/diagrams/cost.mjs   (lessons are hand-edited; if a w*-cost-* / w*-invest-* table
// generator in .scratch/accounting-a/tables is re-run, re-run this script too; insertBefore is idempotent)
import { D, money, assertEq, waterfall, grouped, publishBefore } from "./lib.mjs";
const F = "accounting-a";
const C = D.C;

// ---------------------------------------------------------------- break-even chart (Tendai's bricks)
{
  const fc = 27000, price = 12, vc = 7.5, bep = fc / (price - vc), act = 8000;
  assertEq(bep, 6000, "bep"); assertEq(bep * price, 72000, "bep revenue"); assertEq(act * (price - vc) - fc, 9000, "profit");
  assertEq(act * price, 96000, "rev8000"); assertEq(fc + vc * act, 87000, "tc8000"); assertEq((act - bep) / act, 0.25, "mos");
  const ax = D.axes({ x: [0, 10000], y: [0, 120000], xTicks: 2000, yTicks: 20000, xLabel: "Bricks sold", yLabel: "US$", w: 600, h: 430, pad: { l: 76 } });
  let b = ax.frame;
  b += ax.line([[0, 0], [10000, price * 10000]], { stroke: C.blue });
  b += ax.line([[0, fc], [10000, fc + vc * 10000]], { stroke: C.amber });
  b += ax.line([[0, fc], [10000, fc]], { stroke: C.muted, width: 1.8, dash: true });
  b += ax.guides(bep, bep * price);
  b += ax.point(bep, bep * price);
  b += ax.line([[act, price * act], [act, fc + vc * act]], { stroke: C.green, width: 3 });
  b += ax.line([[bep, 6000], [act, 6000]], { stroke: C.red, width: 2.4, arrow: true, arrowStart: true });
  b += ax.tag(6150, 63000, "Break-even: 6,000 bricks", {}) + ax.tag(0, 72000, "72,000", { dx: 10, dy: -2 });
  b += ax.tag(8100, 80000, "Profit 9,000", { fill: C.green });
  b += ax.tag(bep + 150, 16000, "Margin of safety: 2,000", { fill: C.red });
  b += ax.tag(7500, 114000, "Revenue", { fill: C.blue });
  b += ax.tag(1000, 50500, "Total cost", { fill: C.amber });
  b += ax.label(10000, 27000, "Fixed cost 27,000", { dx: -150, dy: -10, fill: C.muted });
  const alt = "Break-even chart for Tendai's bricks: revenue (US$12 a brick) crosses total cost (US$27,000 fixed plus US$7.50 a brick) at 6,000 bricks and US$72,000; at 8,000 bricks revenue is 96,000 and total cost 87,000, a profit of 9,000, and the margin of safety is 2,000 bricks (25%).";
  await publishBefore(F, "break-even-chart-bricks", D.svg(600, 430, b), alt, "Figure: break-even chart for Tendai's bricks, with the margin of safety at 8,000 bricks", "cost/break-even.md", "## Changes in price, cost and mix");
}

// ---------------------------------------------------------------- cost behaviour: water bottles
{
  const fixed = 12000, v = 0.4;
  assertEq(v * 30000, 12000, "var 30k"); assertEq(fixed + v * 20000, 20000, "total 20k"); assertEq(fixed + v * 10000, 16000, "total 10k");
  const ax = D.axes({ x: [0, 30000], y: [0, 26000], xTicks: 10000, yTicks: 4000, xLabel: "Bottles made", yLabel: "US$ per month", w: 580, h: 400, pad: { l: 74 } });
  let b = ax.frame;
  b += ax.line([[0, fixed], [30000, fixed]], { stroke: C.muted, dash: true });
  b += ax.line([[0, 0], [30000, v * 30000]], { stroke: C.blue });
  b += ax.line([[0, fixed], [30000, fixed + v * 30000]], { stroke: C.amber });
  [10000, 20000, 30000].forEach((x) => (b += ax.point(x, fixed + v * x, { stroke: C.amber })));
  b += ax.tag(12500, 15000, "Fixed cost 12,000 at every output", { fill: C.muted });
  b += ax.tag(30000, 25800, "Total 24,000", { anchor: "end", fill: C.amber });
  b += ax.tag(30000, 5000, "Variable 12,000 at 30,000", { anchor: "end", fill: C.blue });
  b += ax.tag(10000, 16000, "16,000", { dx: -75, dy: -12, fill: C.amber }) + ax.tag(20000, 20000, "20,000", { dx: -75, dy: -12, fill: C.amber });
  const alt = "Cost behaviour at Harare Spring Water: the fixed cost is a flat US$12,000; variable cost at US$0.40 a bottle rises from nil to 12,000 at 30,000 bottles; total cost starts at 12,000 and reaches 16,000 at 10,000 bottles, 20,000 at 20,000 and 24,000 at 30,000.";
  await publishBefore(F, "cost-behaviour-fixed-variable-total", D.svg(580, 400, b), alt, "Figure: fixed, variable and total cost for the water bottler", "cost/behaviour.md", "## Graphs described in words");
}

// ---------------------------------------------------------------- stepped cost
{
  const cost = (bottles) => 1200 * Math.ceil(bottles / 5000);
  assertEq(cost(4000), 1200, "4000"); assertEq(cost(5000), 1200, "5000"); assertEq(cost(6000), 2400, "6000"); assertEq(cost(10000), 2400, "10000"); assertEq(cost(11000), 3600, "11000");
  const ax = D.axes({ x: [0, 15000], y: [0, 4800], xTicks: 5000, yTicks: 1200, xLabel: "Bottles made", yLabel: "Supervision cost (US$)", w: 580, h: 380, pad: { l: 74 } });
  let b = ax.frame;
  [[0, 5000, 1200], [5000, 10000, 2400], [10000, 15000, 3600]].forEach(([a, z, c]) => (b += ax.line([[a, c], [z, c]], { stroke: C.blue, width: 3 })));
  [[5000, 1200, 2400], [10000, 2400, 3600]].forEach(([x, lo, hi]) => (b += ax.line([[x, lo], [x, hi]], { stroke: C.muted, width: 1.4, dash: true })));
  [[4000, 1200], [5000, 1200], [6000, 2400], [10000, 2400], [11000, 3600]].forEach(([x, y]) => (b += ax.point(x, y, { stroke: C.amber })));
  b += ax.tag(500, 1200 - 200, "1 supervisor: 1,200", { dy: 40 });
  b += ax.tag(5500, 2400 - 200, "2 supervisors: 2,400", { dy: 40 });
  b += ax.tag(10200, 3600 - 200, "3: 3,600", { dy: 40 });
  const alt = "Stepped cost of supervision: one supervisor at US$1,200 covers up to 5,000 bottles, two at 2,400 cover 5,001 to 10,000, and three at 3,600 are needed from 10,001, so the cost is flat within a step and jumps between steps.";
  await publishBefore(F, "cost-behaviour-stepped-supervision", D.svg(580, 380, b), alt, "Figure: supervision is a stepped cost, rising by US$1,200 every 5,000 bottles", "cost/behaviour.md", "## Graphs described in words");
}

// ---------------------------------------------------------------- high-low
{
  const pts = [[2000, 1900], [3000, 2500], [3800, 2980], [4500, 3400], [2600, 2260]];
  const vcu = (3400 - 1900) / (4500 - 2000), fixed = 3400 - vcu * 4500;
  assertEq(vcu, 0.6, "var per unit"); assertEq(fixed, 700, "fixed"); assertEq(fixed + vcu * 2000, 1900, "check low");
  pts.forEach(([x, y]) => assertEq(fixed + vcu * x, y, `point ${x}`));
  assertEq(fixed + vcu * 3400, 2740, "estimate");
  const ax = D.axes({ x: [0, 5000], y: [0, 4000], xTicks: 1000, yTicks: 1000, xLabel: "Units of printing", yLabel: "Electricity bill (US$)", w: 580, h: 400, pad: { l: 74 } });
  let b = ax.frame;
  b += ax.line([[0, fixed], [5000, fixed + vcu * 5000]], { stroke: C.blue, width: 2, dash: true });
  pts.forEach(([x, y]) => (b += ax.point(x, y, { stroke: C.amber, r: 5 })));
  b += ax.point(0, fixed, { stroke: C.blue });
  b += ax.tag(250, fixed - 80, "Fixed element 700", { dy: 30 });
  b += ax.tag(2000, 1900, "Lowest activity: 2,000 units, 1,900", { dx: 12, dy: 30 });
  b += ax.tag(4500, 3400, "Highest: 4,500 units, 3,400", { anchor: "end", dx: -12, dy: -14 });
  b += ax.tag(300, 3000, "Slope = 1,500 ÷ 2,500 = 0.60 a unit", { fill: C.blue });
  const alt = "High-low method for the Mutare printing shop's electricity: the line through the lowest point (2,000 units, US$1,900) and the highest (4,500 units, US$3,400) has slope 0.60 a unit and meets the vertical axis at US$700, the fixed element; all five months lie on it.";
  await publishBefore(F, "high-low-electricity-line", D.svg(580, 400, b), alt, "Figure: the high-low line separates a fixed US$700 from US$0.60 a unit", "cost/behaviour.md", "## Why cost behaviour matters");
}

// ---------------------------------------------------------------- operating statement (Sibanda Biscuits)
{
  const budget = 3000 * 9 - 18000;
  assertEq(budget, 9000, "budget");
  const v = { vol: (3200 - 3000) * 9, price: (19.4 - 20) * 3200, mp: (4 - 4.2) * 5000, mu: (4800 - 5000) * 4, lr: (5 - 5.2) * 3350, le: (3200 - 3350) * 5, fc: 18000 - 18400 };
  const r = (x) => Math.round(x);
  assertEq(r(v.vol), 1800, "vol"); assertEq(r(v.price), -1920, "price"); assertEq(r(v.mp), -1000, "mp"); assertEq(r(v.mu), -800, "mu"); assertEq(r(v.lr), -670, "lr"); assertEq(r(v.le), -750, "le"); assertEq(r(v.fc), -400, "fc");
  const actual = budget + Object.values(v).reduce((a, x) => a + r(x), 0);
  assertEq(actual, 5260, "actual profit");
  assertEq(3200 * 19.4 - 21000 - 17420 - 18400, 5260, "proof");
  const svg = waterfall(
    [
      { label: "Budget\nprofit", value: budget, kind: "total", first: true },
      { label: "Sales\nvolume", value: r(v.vol), kind: "delta" },
      { label: "Sales\nprice", value: r(v.price), kind: "delta" },
      { label: "Material\nprice", value: r(v.mp), kind: "delta" },
      { label: "Material\nusage", value: r(v.mu), kind: "delta" },
      { label: "Labour\nrate", value: r(v.lr), kind: "delta" },
      { label: "Labour\nefficiency", value: r(v.le), kind: "delta" },
      { label: "Fixed\ncosts", value: r(v.fc), kind: "delta" },
      { label: "Actual\nprofit", value: actual, kind: "total" },
    ],
    { w: 640, h: 400, yMax: 12000, yTick: 2000, yLabel: "US$", padL: 62, valSize: 12, labelSize: 13 },
  );
  const alt = "Operating statement for Sibanda Biscuits: budgeted profit of US$9,000 rises by the favourable sales volume variance of 1,800 and falls by adverse variances of 1,920 (sales price), 1,000 and 800 (materials), 670 and 750 (labour) and 400 (fixed costs), leaving actual profit of US$5,260.";
  await publishBefore(F, "variances-operating-statement-biscuits", svg, alt, "Figure: budgeted profit of 9,000 to actual profit of 5,260 through the variances", "cost/variances-analysis.md", "## Reconciling standard cost to actual cost");
}

// ---------------------------------------------------------------- fixed overhead variance tree (Ncube Furniture)
{
  const budgetOh = 24000, actualOh = 25100, rate = 4, absorbed = 5600 * rate;
  const exp = budgetOh - actualOh, vol = (5600 - 6000) * rate, cap = (11500 - 12000) * 2, eff = (11200 - 11500) * 2;
  assertEq(absorbed, 22400, "absorbed"); assertEq(exp, -1100, "exp"); assertEq(vol, -1600, "vol"); assertEq(cap, -1000, "cap"); assertEq(eff, -600, "eff");
  assertEq(cap + eff, vol, "cap+eff"); assertEq(exp + vol, absorbed - actualOh, "total");
  let b = "";
  const nd = (x, y, w, h, t, f) => D.node(x, y, w, h, t, { fill: f, size: 14 });
  b += nd(150, 10, 300, 58, "Fixed overhead variance\n2,700 A (absorbed 22,400 − actual 25,100)", C.fillAmber);
  b += nd(40, 120, 220, 58, "Expenditure\n1,100 A (24,000 − 25,100)", C.fillBlue);
  b += nd(340, 120, 220, 58, "Volume\n1,600 A ((5,600 − 6,000) × 4)", C.fillBlue);
  b += D.arrow(260, 68, 150, 120, { stroke: C.muted, width: 1.6 }) + D.arrow(340, 68, 450, 120, { stroke: C.muted, width: 1.6 });
  b += nd(300, 232, 130, 58, "Capacity\n1,000 A", C.fillGreen) + nd(450, 232, 130, 58, "Efficiency\n600 A", C.fillGreen);
  b += D.arrow(420, 178, 365, 232, { stroke: C.muted, width: 1.6 }) + D.arrow(480, 178, 515, 232, { stroke: C.muted, width: 1.6 });
  b += D.text(20, 252, "Volume = capacity + efficiency", { size: 14, fill: C.muted }) + D.text(20, 274, "1,000 + 600 = 1,600", { size: 14, fill: C.muted });
  b += D.text(300, 320, "Capacity: (11,500 − 12,000) h × 2.  Efficiency: (11,200 − 11,500) h × 2", { size: 13, fill: C.muted, anchor: "middle" });
  const alt = "Fixed overhead variance tree for Ncube Furniture: the total under-absorbed overhead of US$2,700 adverse splits into expenditure 1,100 adverse and volume 1,600 adverse, and the volume variance splits into capacity 1,000 adverse and efficiency 600 adverse.";
  await publishBefore(F, "fixed-overhead-variance-tree", D.svg(600, 340, b), alt, "Figure: the fixed overhead variance of 2,700 A broken into expenditure, capacity and efficiency", "cost/variances-fixed-overhead.md", "## Interpreting the variances");
}

// ---------------------------------------------------------------- ABC: gates costed two ways
{
  const oh = 120000, hrs = 8000, rate = oh / hrs;
  const tradStd = 1.5 * rate, tradCus = 4 * rate;
  const abcStd = (10 * 1200 + 40 * 240 + 100 * 100 + 6000 * 5) / 4000, abcCus = (20 * 1200 + 60 * 240 + 100 * 100 + 2000 * 5) / 500;
  assertEq(36000 + 24000 + 20000 + 40000, oh, "pools");
  assertEq(abcStd, 15.4, "abc std"); assertEq(abcCus, 116.8, "abc cus");
  const profit = (price, direct, ohd) => Math.round((price - direct - ohd) * 100) / 100;
  const p = { ts: profit(105, 70, tradStd), as: profit(105, 70, abcStd), tc: profit(190, 120, tradCus), ac: profit(190, 120, abcCus) };
  assertEq(p.ts, 12.5, "trad std profit"); assertEq(p.as, 19.6, "abc std profit"); assertEq(p.tc, 10, "trad cus profit"); assertEq(p.ac, -46.8, "abc cus profit");
  const svg = grouped(
    [
      { label: "Standard gate", bars: [{ value: p.ts, fill: C.teal, text: "12.50" }, { value: p.as, fill: C.blue, text: "19.60" }] },
      { label: "Custom gate", bars: [{ value: p.tc, fill: C.teal, text: "10.00" }, { value: p.ac, fill: C.blue, text: "−46.80" }] },
    ],
    { w: 560, h: 400, yMin: -60, yMax: 30, yTick: 15, yLabel: "Profit or loss per gate (US$)", legend: [{ fill: C.teal, label: "Traditional costing" }, { fill: C.blue, label: "ABC" }], legendW: 190, valSize: 14 },
  );
  const alt = "Profit per gate at Bulawayo Metal Works: traditional costing gives US$12.50 on a standard gate and US$10.00 on a custom gate, but activity-based costing gives US$19.60 on a standard gate and a loss of US$46.80 on a custom gate, because custom gates cause most of the set-ups and inspections.";
  await publishBefore(F, "abc-gate-profit-comparison", svg, alt, "Figure: traditional costing hides a loss on custom gates that ABC reveals", "cost/activity-based.md", "## Comparison with traditional absorption costing");
  // share of each cost driver
  const share = (std, cus) => [{ value: Math.round((std / (std + cus)) * 1000) / 10, fill: C.teal }, { value: Math.round((cus / (std + cus)) * 1000) / 10, fill: C.amber }];
  const g = (label, s, c) => ({ label, bars: share(s, c).map((x) => ({ ...x, text: x.value + "%" })) });
  assertEq(2000 / 8000, 0.25, "custom hours share");
  const svg2 = grouped([g("Labour\nhours", 6000, 2000), g("Set-ups", 10, 20), g("Inspections", 40, 60), g("Material\nmovements", 100, 100)], {
    w: 600, h: 400, yMax: 100, yTick: 20, yLabel: "Share of the driver (%)", legend: [{ fill: C.teal, label: "Standard gates" }, { fill: C.amber, label: "Custom gates" }], legendW: 190, valSize: 13,
  });
  const alt2 = "Share of each cost driver used by the two gates: custom gates use only 25% of labour hours but 66.7% of set-ups, 60% of inspections and 50% of material movements, so absorbing overhead on labour hours undercharges them.";
  await publishBefore(F, "abc-driver-shares", svg2, alt2, "Figure: custom gates use a quarter of the labour hours but most of the set-ups", "cost/activity-based.md", "## Comparison with traditional absorption costing");
}

// ---------------------------------------------------------------- payback (Mutare Dairy cooler)
{
  const flows = [-40000, 12000, 15000, 18000, 14000, 10000];
  const cum = []; flows.reduce((a, f, i) => ((cum[i] = a + f), a + f), 0);
  assertEq(cum[2], -13000, "cum y2"); assertEq(cum[3], 5000, "cum y3"); assertEq(cum[5], 29000, "cum y5");
  const pb = 2 + 13000 / 18000;
  assertEq(Math.round(pb * 100) / 100, 2.72, "payback");
  const ax = D.axes({ x: [0, 5.4], y: [-45000, 35000], xTicks: [0, 1, 2, 3, 4, 5], yTicks: 15000, xLabel: "Year", yLabel: "Cumulative cash flow (US$)", w: 580, h: 400, pad: { l: 78 } });
  let b = ax.frame;
  b += ax.line(cum.map((c, i) => [i, c]), { stroke: C.blue });
  cum.forEach((c, i) => (b += ax.point(i, c)));
  b += ax.point(pb, 0, { stroke: C.red, r: 6 });
  b += ax.tag(pb, 0, "Payback 2.72 years", { dx: 14, dy: 46, fill: C.red });
  b += ax.tag(0, -40000, "−40,000", { dx: 12, dy: 6 });
  b += ax.tag(2, -13000, "−13,000", { dx: 12, dy: 34 });
  b += ax.tag(3, 5000, "+5,000", { dx: -66, dy: -14 });
  b += ax.tag(5, 29000, "+29,000", { dx: -30, dy: -14 });
  const alt = "Payback of the Mutare Dairy cooler: cumulative cash flow starts at −40,000, reaches −28,000 after year 1 and −13,000 after year 2, then crosses zero part-way through year 3 (13,000 ÷ 18,000 = 0.72), so payback is 2.72 years; it ends at +29,000 after year 5.";
  await publishBefore(F, "payback-cumulative-cash-cooler", D.svg(580, 400, b), alt, "Figure: cumulative cash flow crosses zero at 2.72 years", "invest/payback-arr.md", "## Accounting rate of return");
}

// ---------------------------------------------------------------- NPV (bakery oven at 12%)
{
  const cf = [16000, 20000, 22000, 14000], df = [0.893, 0.797, 0.712, 0.636];
  const pv = cf.map((c, i) => Math.round(c * df[i]));
  assertEq(pv[0], 14288, "pv1"); assertEq(pv[1], 15940, "pv2"); assertEq(pv[2], 15664, "pv3"); assertEq(pv[3], 8904, "pv4");
  const npv = pv.reduce((a, v) => a + v, 0) - 50000;
  assertEq(npv, 4796, "npv");
  const svg = waterfall(
    [
      { label: "Year 0\noutlay", value: -50000, kind: "total", first: true },
      ...pv.map((v, i) => ({ label: `Year ${i + 1}\n(${money(cf[i])})`, value: v, kind: "delta" })),
      { label: "NPV", value: npv, kind: "total" },
    ],
    { w: 620, h: 400, yMin: -60000, yMax: 20000, yTick: 20000, yLabel: "Present value (US$)", padL: 80, labelSize: 13 },
  );
  const alt = "NPV of the Mutare bakery oven at 12%: the outlay of US$50,000 is recovered by discounted inflows of 14,288, 15,940, 15,664 and 8,904 (from cash flows of 16,000, 20,000, 22,000 and 14,000 in years 1 to 4), so the net present value is a positive US$4,796.";
  await publishBefore(F, "npv-oven-discounted-flows", svg, alt, "Figure: discounted inflows against the 50,000 outlay give an NPV of 4,796", "invest/npv-irr.md", "## Internal rate of return");
}

// ---------------------------------------------------------------- IRR by interpolation (delivery van)
{
  const npv10 = 8383, npv20 = -2373;
  const irr = 10 + (npv10 / (npv10 - npv20)) * 10;
  assertEq(Math.round(irr * 10) / 10, 17.8, "irr");
  const ax = D.axes({ x: [5, 25], y: [-4000, 12000], xTicks: 5, yTicks: 4000, xLabel: "Discount rate (%)", yLabel: "NPV (US$)", w: 580, h: 400, pad: { l: 74 } });
  let b = ax.frame;
  b += ax.line([[10, npv10], [20, npv20]], { stroke: C.blue });
  b += ax.point(10, npv10) + ax.point(20, npv20);
  b += ax.point(irr, 0, { stroke: C.red, r: 6 });
  b += ax.tag(10, npv10, "10%: NPV 8,383", { dx: 12, dy: -10 });
  b += ax.tag(20, npv20, "20%: NPV −2,373", { dx: -150, dy: 34 });
  b += ax.tag(irr, 0, "IRR 17.8%", { dx: 12, dy: -34, fill: C.red });
  const alt = "IRR of the Chinhoyi delivery van by interpolation: the NPV is +8,383 at 10% and −2,373 at 20%, so the straight line between them crosses zero at 17.8%; the van is acceptable if the cost of capital is below that.";
  await publishBefore(F, "irr-interpolation-van", D.svg(580, 400, b), alt, "Figure: the NPV line crosses zero at an IRR of 17.8%", "invest/npv-irr.md", "## Cost of capital and the decision rules");
}
console.log("cost done");
