// Fixer pass: break-even chart for business-a lessons/finance/break-even.md (run from the repo root).
import * as D from "../../tools/diagram-kit.mjs";
const C = D.C;

/** Break-even chart; every line and label is computed from fc, price, vc. Exported for the business-commerce-o script. */
export function breakEvenSvg({ fc, price, vc, maxQ, expected, qStep, yStep, yMax }) {
  const beq = fc / (price - vc), beRev = beq * price;
  const ax = D.axes({ x: [0, maxQ], y: [0, yMax], w: 600, h: 420, xTicks: qStep, yTicks: yStep, xLabel: "Output (units)", yLabel: "Costs and revenue (US$)", pad: { l: 76, r: 96, t: 34 } });
  let b = ax.frame;
  b += ax.area((q) => price * q, (q) => fc + vc * q, [beq, maxQ], { fill: C.fillGreen });
  b += ax.area((q) => fc + vc * q, (q) => price * q, [0, beq], { fill: C.fillAmber });
  b += ax.line([[0, fc], [maxQ, fc]], { stroke: C.muted, dash: true, width: 2 });
  b += ax.line([[0, fc], [maxQ, fc + vc * maxQ]], { stroke: C.red });
  b += ax.line([[0, 0], [maxQ, price * maxQ]], { stroke: C.blue });
  b += ax.guides(beq, beRev);
  b += ax.point(beq, beRev, { r: 5, stroke: C.ink });
  b += ax.label(maxQ, price * maxQ, "Total revenue", { dx: 8, dy: 4, size: 13, fill: C.blue, weight: 700 });
  b += ax.label(maxQ, fc + vc * maxQ, "Total cost", { dx: 8, dy: 4, size: 13, fill: C.red, weight: 700 });
  b += ax.label(maxQ, fc, "Fixed costs", { dx: 8, dy: 4, size: 13, fill: C.muted, weight: 700 });
  b += ax.tag(beq, beRev, `Break-even: ${beq.toLocaleString("en-GB")} units`, { anchor: "end", dx: -12, dy: -10 });
  b += ax.label(beq * 0.5, (fc + vc * beq * 0.5 + price * beq * 0.5) / 2, "Loss", { anchor: "middle", fill: C.amber, weight: 700, size: 14, dy: 4 });
  const mid = beq + (maxQ - beq) * 0.7;
  b += ax.label(mid, (fc + vc * mid + price * mid) / 2, "Profit", { anchor: "middle", fill: C.green, weight: 700, size: 13, dy: 4 });
  if (expected) {
    const rv = price * expected, tc = fc + vc * expected;
    b += D.line(ax.X(expected), ax.Y(0), ax.X(expected), ax.Y(tc), { stroke: C.muted, dash: true, width: 1.4 });
    const yy = ax.Y(yMax * 0.16);
    b += D.line(ax.X(beq), yy, ax.X(expected), yy, { stroke: C.ink, width: 1.6, arrow: true, arrowStart: true });
    b += D.text((ax.X(beq) + ax.X(expected)) / 2, yy + 20, "Margin of safety", { anchor: "middle", size: 13 });
    b += D.text((ax.X(beq) + ax.X(expected)) / 2, yy + 36, `${(expected - beq).toLocaleString("en-GB")} units`, { anchor: "middle", size: 13 });
    b += ax.point(expected, rv, { stroke: C.blue }) + ax.point(expected, tc, { stroke: C.red });
  }
  return D.svg(600, 420, b);
}

if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, "/")}` || process.argv[1].endsWith("business-a\\diagrams\\fixer.mjs") || process.argv[1].endsWith("business-a/diagrams/fixer.mjs")) {
  const o = { fc: 15000, price: 3.2, vc: 1.7, maxQ: 15000, expected: 12500, qStep: 2500, yStep: 10000, yMax: 50000 };
  const alt = "Break-even chart: fixed costs are flat at US$15,000; the total cost line starts there and rises by US$1.70 a bottle; the revenue line starts at zero and rises by US$3.20 a bottle; they cross at 10,000 bottles and US$32,000. Loss to the left, profit to the right; at 12,500 bottles the margin of safety is 2,500 bottles.";
  const cap = "Figure: break-even chart for the bottle example (fixed costs US$15,000, price US$3.20, variable cost US$1.70)";
  await D.figure("business-a", "break-even-chart", breakEvenSvg(o), { alt, caption: cap });
  D.insertAfter("content/subjects/business-a/lessons/finance/break-even.md", "**Reading a break-even chart.**", D.md("break-even-chart", alt, cap));
}
