// Elasticity lesson diagrams. Run: node .scratch/economics-o/diagrams/elasticity.mjs
import { D, C, put, lab, dotted } from "./common.mjs";

// --- PED curve shapes (elasticity/ped): five small panels
{
  const W = 600, H = 400, pw = 180, ph = 175;
  const panel = (title, build, ox, oy) => {
    const ax = D.axes({ x: [0, 10], y: [0, 10], w: pw, h: ph, pad: { l: 28, r: 10, t: 34, b: 30 }, xTicks: [], yTicks: [], xLabel: "Quantity", yLabel: "Price", grid: false });
    return D.group(ax.frame.replaceAll('font-size="14"', 'font-size="13"') + build(ax) + D.text(pw / 2, 14, title, { anchor: "middle", weight: 700, size: 14 }), { translate: [ox, oy] });
  };
  const pts = (f, a, b, n = 30) => Array.from({ length: n + 1 }, (_, i) => { const q = a + ((b - a) * i) / n; return [q, f(q)]; });
  let body = "";
  body += panel("PED = 0", (ax) => ax.line([[5, 0], [5, 9.3]]) + ax.label(5.4, 9, "D", { weight: 700, fill: C.blue }), 10, 0);
  body += panel("0 < PED < 1", (ax) => ax.line([[3.5, 9], [6.5, 1.5]]) + ax.label(6.8, 1.5, "D", { weight: 700, fill: C.blue }), 210, 0);
  body += panel("PED = 1", (ax) => ax.line(pts((q) => 20 / q, 2.2, 9.5)) + ax.label(9.6, 2.2, "D", { weight: 700, fill: C.blue }), 410, 0);
  body += panel("PED > 1", (ax) => ax.line([[1.5, 6.5], [9, 3.5]]) + ax.label(9.2, 3.2, "D", { weight: 700, fill: C.blue }), 110, 205);
  body += panel("PED = infinity", (ax) => ax.line([[0.5, 5], [9.3, 5]]) + ax.label(9.4, 5.4, "D", { weight: 700, fill: C.blue }), 310, 205);
  const alt = "Five demand curve shapes for price elasticity of demand: PED 0 is a vertical line, between 0 and 1 a steep line, exactly 1 a curve bending to both axes with price times quantity constant, above 1 a gentle line, and infinity a horizontal line.";
  await put("ped-curve-shapes", D.svg(W, H, body), alt, "Figure: the shape of the demand curve for each value of PED, drawn on the same scale", "elasticity/ped", "- **Perfectly elastic:**");
}

// --- Revenue rectangles (elasticity/ped-revenue): repair kiosk, price 10 -> 8, quantity 100 -> 150
{
  const P0 = 10, Q0 = 100, P1 = 8, Q1 = 150;
  const slope = (P1 - P0) / (Q1 - Q0); // -0.04
  const dp = (q) => P0 + slope * (q - Q0);
  const lost = (P0 - P1) * Q0, gained = P1 * (Q1 - Q0); // 200, 400
  const ax = D.axes({ x: [0, 200], y: [0, 14], xTicks: 50, yTicks: 2, xLabel: "Repairs per week", yLabel: "Price (US$)", w: 600, h: 430 });
  const R = (qa, pa, qb, pb, o) => D.rect(ax.X(qa), ax.Y(pb), ax.X(qb) - ax.X(qa), ax.Y(pa) - ax.Y(pb), o);
  const body = ax.frame + R(0, 0, Q0, P1, { fill: C.fillGrey, stroke: "none" }) + R(0, P1, Q0, P0, { fill: C.fillAmber, stroke: C.amber, dash: true, width: 1.5 }) + R(Q0, 0, Q1, P1, { fill: C.fillGreen, stroke: C.green, dash: true, width: 1.5 }) +
    ax.line([[30, dp(30)], [200, dp(200)]]) + ax.point(Q0, P0) + ax.point(Q1, P1) + lab(ax, 200, dp(200), "D", { dx: 8, dy: 4, fill: C.blue }) +
    ax.label(50, 4, "Kept: 8 x 100", { anchor: "middle", size: 14 }) +
    ax.label(50, 9.05, "Lost: 2 x 100 = US$200", { anchor: "middle", size: 13, fill: C.amber }) +
    ax.label(125, 4, "Gained:\n8 x 50 =\nUS$400", { anchor: "middle", size: 14, fill: C.green }) +
    ax.tag(Q0, P0, "US$10, 100", { dx: 10, dy: -8 }) + ax.tag(Q1, P1, "US$8, 150", { dx: 10, dy: -8 });
  const alt = `Demand for screen repairs is elastic: when the price is cut from US$10 to US$8, weekly repairs rise from 100 to 150; the revenue lost on existing sales is ${lost} dollars (2 x 100) but the revenue gained on extra sales is ${gained} dollars (8 x 50), so total revenue rises from US$1,000 to US$1,200.`;
  await put("ped-revenue-rectangles", D.svg(600, 430, body), alt, "Figure: revenue gained (green) and lost (amber) when an elastic price is cut", "elasticity/ped-revenue", "**steep (inelastic)** curve a price cut");
}

// --- PES curves (elasticity/pes): parallel lines cutting the quantity axis, the origin and the price axis
{
  const inel = (q) => 0.02 * (q - 100), uni = (q) => 0.02 * q, el = (q) => 2 + 0.02 * q;
  const ax = D.axes({ x: [0, 450], y: [0, 10], xTicks: [], yTicks: [], xLabel: "Quantity supplied", yLabel: "Price", w: 600, h: 400, grid: false });
  const seg = (f, a, b, o) => ax.line([[a, f(a)], [b, f(b)]], o);
  const body = ax.frame + seg(inel, 100, 300, { stroke: C.blue }) + seg(uni, 0, 300, { stroke: C.amber }) + seg(el, 0, 300, { stroke: C.green }) +
    ax.label(304, el(300), "S3 cuts the price\naxis: PES > 1", { fill: C.green, weight: 700, dy: -4 }) +
    ax.label(304, uni(300), "S2 through the\norigin: PES = 1", { fill: C.amber, weight: 700, dy: -4 }) +
    ax.label(304, inel(300), "S1 cuts the quantity\naxis: PES < 1", { fill: C.blue, weight: 700, dy: -4 });
  const alt = "Three parallel straight supply curves: S1 cuts the quantity axis and is price inelastic (PES less than 1), S2 passes through the origin and has PES exactly 1, S3 cuts the price axis and is price elastic (PES greater than 1).";
  await put("pes-curve-tests", D.svg(600, 400, body), alt, "Figure: where a straight supply curve meets the axes tells you its elasticity", "elasticity/pes", "A useful test for straight-line supply curves");
}
