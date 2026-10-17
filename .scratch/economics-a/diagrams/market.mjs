// economics-a: PPC and market lessons. Run: node .scratch/economics-a/diagrams/market.mjs
import { D, C, put, lab, dotted, seg, dash } from "./common.mjs";

// ---- PPC (basics/ppc.md): Zandia schedule
{
  const sched = [[0, 100], [20, 98], [40, 92], [60, 80], [80, 56], [100, 0]];
  const g = 1.25;
  const grown = sched.map(([a, b]) => [a * g, b * g]);
  const ax = D.axes({ x: [0, 140], y: [0, 140], xTicks: 20, yTicks: 20, xLabel: "Consumer goods (thousand units)", yLabel: "Capital goods (thousand units)", w: 600, h: 470 });
  const body = ax.frame + dotted(ax, sched) + ax.line(grown, { stroke: C.amber, dash: true, width: 2.2 }) +
    ["A", "B", "C", "D", "E", "F"].map((l, i) => ax.label(sched[i][0], sched[i][1], l, { dx: 8, dy: -8, weight: 700, size: 14 })).join("") +
    ax.point(60, 70, { stroke: C.red, r: 5 }) + ax.tag(60, 70, "Inside: 60, 70", { dx: -118, dy: 22, fill: C.red }) +
    ax.point(80, 70, { stroke: C.green, r: 5 }) + ax.tag(80, 70, "Outside: 80, 70", { dx: 10, dy: -4, fill: C.green }) +
    ax.tag(30, 131, "Dashed: PPC after a 25% rise in capacity", { fill: C.amber }) +
    ax.tag(46, 24, "Original PPC", { dx: -4, dy: 0, fill: C.blue });
  const alt = "Production possibility curve for Zandia, bowed outwards from capital goods 100 and consumer goods 100 at the axes through points A to F; a point inside the curve at 60 and 70 wastes resources, a point outside at 80 and 70 is unattainable, and a dashed curve shows all maxima rising 25% to 125.";
  await put("ppc-zandia", D.svg(600, 470, body), alt, "Figure: Zandia's production possibility curve (concave, so opportunity cost rises) and an outward shift after a 25% rise in capacity", "basics/ppc", "Moving along the curve shows the");
}

// ---- demand shift (market/demand.md): maize meal
{
  const d1 = [[3, 5], [7, 4], [12, 3], [18, 2], [25, 1]];
  const d2 = d1.map(([q, p]) => [q + 4, p]);
  const ax = D.axes({ x: [0, 35], y: [0, 6], xTicks: 5, yTicks: 1, xLabel: "Quantity (bags per week)", yLabel: "Price (US$ per bag)", w: 580, h: 420 });
  const body = ax.frame + dotted(ax, d1) + dotted(ax, d2, { stroke: C.amber }) +
    lab(ax, 25, 1, "D1", { dx: 8, dy: 18, fill: C.blue }) + lab(ax, 29, 1, "D2", { dx: 8, dy: -4, fill: C.amber }) +
    dash(ax, [[12, 3], [16, 3]]) + dash(ax, [[12, 3], [12, 0]]) + dash(ax, [[16, 3], [16, 0]]) +
    ax.tag(16, 3, "16 bags at US$3", { dx: 10, dy: -6, fill: C.amber }) + ax.tag(12, 0, "12", { dx: -28, dy: -6, size: 12 });
  const alt = "Demand for maize meal: D1 slopes down from 3 bags at US$5 to 25 bags at US$1; a rise in income shifts the whole curve right to D2, 4 bags more at every price, so at US$3 quantity demanded rises from 12 to 16 bags.";
  await put("maize-demand-shift", D.svg(580, 420, body), alt, "Figure: an increase in demand shifts the curve right from D1 to D2 (4 more bags at every price), unlike a price fall which moves along D1", "market/demand", "**Describing the diagram.** D1 and D2");
}

// ---- supply shifts (market/supply.md)
{
  const s1 = [[3, 1], [10, 2], [18, 3], [26, 4], [35, 5]];
  const s2 = s1.map(([q, p]) => [q + 6, p]);
  const s3 = [[1, 1], [8, 2], [16, 3], [24, 4], [33, 5]];
  const ax = D.axes({ x: [0, 45], y: [0, 6], xTicks: 5, yTicks: 1, xLabel: "Quantity (crates per week)", yLabel: "Price (US$ per crate)", w: 580, h: 420 });
  const body = ax.frame + dotted(ax, s3, { stroke: C.red }) + dotted(ax, s1) + dotted(ax, s2, { stroke: C.green }) +
    lab(ax, 33, 5, "S3", { dx: -32, dy: 4, fill: C.red }) + lab(ax, 35, 5, "S1", { dx: -4, dy: -12, fill: C.blue }) + lab(ax, 41, 5, "S2", { dx: 8, dy: 4, fill: C.green }) +
    dash(ax, [[0, 3], [24, 3]]) + ax.tag(16, 3, "S3: 16", { dx: -62, dy: 26, fill: C.red, size: 12 }) +
    ax.tag(24, 3, "S2: 24", { dx: 10, dy: 26, fill: C.green, size: 12 }) + ax.tag(18, 3, "S1: 18", { dx: -4, dy: -10, size: 12 });
  const alt = "Supply of tomatoes: S1 slopes up from 3 crates at US$1 to 35 at US$5; lower costs shift supply right to S2 (6 more crates at every price, 24 at US$3) and higher costs shift it left to S3 (2 fewer at every price, 16 at US$3).";
  await put("tomato-supply-shifts", D.svg(580, 420, body), alt, "Figure: lower costs shift supply right (S1 to S2), higher costs shift it left (S1 to S3)", "market/supply", "**Describing the diagram.** S2 lies to the right");
}

// ---- equilibrium (market/equilibrium.md): Qd = 165-15P, Qs = 15P-15
{
  const qd = (p) => 165 - 15 * p, qs = (p) => 15 * p - 15;
  const ax = D.axes({ x: [0, 160], y: [2, 10], xTicks: 20, yTicks: 1, xLabel: "Quantity (thousand bags per week)", yLabel: "Price (US$ per bag)", w: 600, h: 430 });
  const body = ax.frame + ax.line([[qd(9.5), 9.5], [qd(2.5), 2.5]]) + ax.line([[qs(2.5), 2.5], [qs(9.5), 9.5]], { stroke: C.amber }) +
    lab(ax, qd(2.5), 2.5, "D", { dx: 6, dy: 4, fill: C.blue }) + lab(ax, qs(9.5), 9.5, "S", { dx: 6, dy: 4, fill: C.amber }) +
    ax.guides(75, 6) + ax.point(75, 6) + ax.tag(75, 6, "Equilibrium: US$6, 75", { dx: 14, dy: 4 }) +
    ax.line([[qs(4), 4], [qd(4), 4]], { stroke: C.red, width: 2.4 }) + ax.tag(45, 4, "Shortage 60 at US$4", { dx: 8, dy: 26, fill: C.red }) +
    ax.line([[qd(8), 8], [qs(8), 8]], { stroke: C.red, width: 2.4 }) + ax.tag(45, 8, "Surplus 60 at US$8", { dx: -2, dy: -10, fill: C.red });
  const alt = "Market for maize meal: demand Qd = 165 - 15P and supply Qs = 15P - 15 cross at US$6 and 75 thousand bags; at US$4 demand 105 exceeds supply 45, a shortage of 60, and at US$8 supply 105 exceeds demand 45, a surplus of 60, so price moves toward US$6.";
  await put("maize-meal-equilibrium", D.svg(600, 430, body), alt, "Figure: equilibrium at US$6 and 75 thousand bags; below it there is a shortage, above it a surplus", "market/equilibrium", "At US\\$6 the quantity demanded equals");
}
// ---- shifts (market/equilibrium.md)
{
  const qd1 = (p) => 165 - 15 * p, qd2 = (p) => 195 - 15 * p, qs1 = (p) => 15 * p - 15, qs2 = (p) => 15 * p - 45;
  const ax = D.axes({ x: [0, 160], y: [2, 12], xTicks: 20, yTicks: 1, xLabel: "Quantity (thousand bags per week)", yLabel: "Price (US$ per bag)", w: 600, h: 460 });
  const L = (f, p0, p1, o) => ax.line([[f(p0), p0], [f(p1), p1]], o);
  const body = ax.frame + L(qd1, 9, 2.5) + L(qd2, 9.5, 3.5, { stroke: C.teal }) + L(qs1, 2.5, 9.5, { stroke: C.amber }) + L(qs2, 3.5, 9.5, { stroke: C.red }) +
    lab(ax, qd1(2.5), 2.5, "D1", { dx: 6, dy: 4, fill: C.blue }) + lab(ax, qd2(3.5), 3.5, "D2", { dx: 6, dy: 4, fill: C.teal }) +
    lab(ax, qs1(9.5), 9.5, "S1", { dx: 6, dy: 4, fill: C.amber }) + lab(ax, qs2(9.5), 9.5, "S2", { dx: 6, dy: 4, fill: C.red }) +
    ax.point(75, 6) + ax.label(75, 6, "E1", { dx: 8, dy: 20, weight: 700 }) +
    ax.point(90, 7) + ax.label(90, 7, "E2", { dx: 10, dy: -8, weight: 700 }) +
    ax.point(60, 7) + ax.label(60, 7, "E3", { dx: -28, dy: -6, weight: 700 }) +
    ax.label(2, 11.6, "E1: D1 and S1, US$6 and 75", { size: 14 }) + ax.label(2, 11.0, "E2: D2 and S1, US$7 and 90", { size: 14, fill: C.teal }) + ax.label(2, 10.4, "E3: D1 and S2, US$7 and 60", { size: 14, fill: C.red });
  const alt = "Shifts in the maize meal market from equilibrium E1 at US$6 and 75: a demand increase to D2 gives E2 at US$7 and 90, a supply decrease to S2 gives E3 at US$7 and 60, so the same price rise comes with a rise in quantity if demand shifts and a fall if supply shifts.";
  await put("maize-meal-shifts", D.svg(600, 460, body), alt, "Figure: a rightward demand shift (E2) and a leftward supply shift (E3) both raise price, but quantity rises in one case and falls in the other", "market/equilibrium", "The demand curve D shifts to the right, from D1 to D2");
}

// ---- PED along a straight demand curve (market/ped-revenue.md): P = 20 - 0.1Q
{
  const ax = D.axes({ x: [0, 220], y: [0, 22], xTicks: 20, yTicks: 2, xLabel: "Quantity (units per week)", yLabel: "Price (US$)", w: 600, h: 430 });
  const body = ax.frame + ax.line([[0, 20], [200, 0]]) + dash(ax, [[0, 10], [100, 10]]) + dash(ax, [[100, 10], [100, 0]]) + ax.point(100, 10) +
    ax.tag(100, 10, "PED = -1 at US$10", { dx: 12, dy: -6 }) +
    ax.tag(36, 16, "Elastic: PED below -1", { dx: 40, dy: 8, fill: C.green }) + ax.tag(20, 4, "Inelastic: PED between 0 and -1", { fill: C.amber }) +
    ax.tag(20, 18, "US$18, PED -9", { dx: 8, dy: -2, size: 12 }) + ax.point(20, 18, { r: 3.5 }) +
    ax.point(180, 2, { r: 3.5 }) + ax.tag(180, 2, "US$2, PED -0.11", { dx: -90, dy: -16, size: 12 }) +
    lab(ax, 0, 20, "D", { dx: 10, dy: 2 });
  const alt = "Straight-line demand P = 20 - 0.1Q: elasticity falls down the curve, from PED -9 at US$18 and 20 units, through exactly -1 at US$10 and 100 units, to -0.11 at US$2 and 180 units; demand is elastic above US$10 and inelastic below.";
  await put("linear-demand-ped", D.svg(600, 430, body), alt, "Figure: on a straight-line demand curve PED changes from point to point, equalling -1 at the mid-point", "market/ped-revenue", "Reading the schedule:");
  const tr = (q) => q * (20 - 0.1 * q);
  const ax2 = D.axes({ x: [0, 220], y: [0, 1200], xTicks: 20, yTicks: 200, xLabel: "Quantity (units per week)", yLabel: "Total revenue (US$)", w: 600, h: 400 });
  const data = [20, 40, 60, 80, 100, 120, 140, 160, 180].map((q) => [q, tr(q)]);
  const b2 = ax2.frame + ax2.plot(tr, { domain: [0, 200] }) + data.map(([a, b]) => ax2.point(a, b, { r: 3 })).join("") +
    ax2.guides(100, 1000) + ax2.point(100, 1000, { stroke: C.amber, r: 5 }) + ax2.tag(100, 1000, "Maximum TR US$1,000 at 100 units", { dx: 14, dy: -16 }) +
    ax2.tag(26, 260, "TR rises if price cut", { fill: C.green, size: 13 }) +
    ax2.tag(112, 440, "TR falls if price cut", { fill: C.amber, size: 13 });
  const alt2 = "Total revenue for the demand curve P = 20 - 0.1Q is an arch: it rises from US$360 at 20 units to a maximum of US$1,000 at 100 units, where PED is -1, then falls to US$360 at 180 units, so revenue is highest at the elasticity of exactly 1.";
  await put("linear-demand-revenue", D.svg(600, 400, b2), alt2, "Figure: total revenue peaks where PED = -1 (100 units, US$10)", "market/ped-revenue", "Two points follow.");
}

// ---- PED shapes (market/ped.md): schematic
{
  const panel = (ox, oy, title, curve, note) => {
    const a = D.axes({ x: [0, 10], y: [0, 10], xTicks: [], yTicks: [], tickLabels: false, grid: false, w: 280, h: 150, pad: { l: 28, r: 10, t: 18, b: 22 } });
    return D.group(a.frame + curve(a) + D.text(140, 12, title, { anchor: "middle", weight: 700, size: 14 }) + D.text(140, 166, note, { anchor: "middle", size: 13, fill: C.muted }), { translate: [ox, oy] });
  };
  const blue = { stroke: C.blue, width: 3 };
  const body =
    panel(10, 0, "Perfectly inelastic: PED = 0", (a) => a.line([[5, 0.5], [5, 9.5]], blue), "vertical: quantity never changes") +
    panel(310, 0, "Perfectly elastic: PED = infinity", (a) => a.line([[0.5, 5], [9.5, 5]], blue), "horizontal: any rise loses all sales") +
    panel(10, 190, "Inelastic: size of PED below 1", (a) => a.line([[4, 9.5], [6, 0.5]], blue), "steep: quantity responds little") +
    panel(310, 190, "Elastic: size of PED above 1", (a) => a.line([[0.5, 6], [9.5, 4]], blue), "shallow: quantity responds a lot");
  const alt = "Four schematic demand curves: vertical is perfectly inelastic (PED 0), horizontal is perfectly elastic (PED infinity), a steep line is relatively inelastic and a shallow line relatively elastic, drawn for equal axes scales.";
  await put("ped-curve-shapes", D.svg(600, 380, body), alt, "Figure: schematic demand curves showing the range of PED (a straight line's elasticity still changes along it)", "market/ped", "Do not confuse the *slope*");
}

// ---- Consumer and producer surplus (market/surplus.md)
{
  const dmd = (q) => 12 - 0.05 * q, sup = (q) => 2 + 0.05 * q;
  const ax = D.axes({ x: [0, 260], y: [0, 14], xTicks: 20, yTicks: 2, xLabel: "Quantity (units per week)", yLabel: "Price (US$)", w: 600, h: 430 });
  const body = ax.area(dmd, () => 7, [0, 100], { fill: C.fillBlue }) + ax.area(() => 7, sup, [0, 100], { fill: C.fillAmber }) + ax.frame +
    ax.line([[0, 12], [240, 0]]) + ax.line([[0, 2], [200, 12]], { stroke: C.amber }) +
    ax.guides(100, 7) + ax.point(100, 7) +
    ax.tag(8, 9.4, "Consumer surplus = 250", { fill: C.blue }) + ax.tag(8, 4.6, "Producer surplus = 250", { fill: C.amber }) +
    lab(ax, 240, 0, "D", { dx: -22, dy: -10, fill: C.blue }) + lab(ax, 200, 12, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(100, 7, "E: US$7, 100", { dx: 14, dy: -8 });
  const alt = "Equilibrium at US$7 and 100 units with demand P = 12 - 0.05Q and supply P = 2 + 0.05Q: consumer surplus is the triangle between demand and the price line, half of 5 times 100 = 250; producer surplus is the triangle between price line and supply, 250; total surplus 500.";
  await put("surplus-equilibrium", D.svg(600, 430, body), alt, "Figure: consumer surplus (blue) lies below demand and above the price; producer surplus (amber) lies above supply and below the price", "market/surplus", "## Measuring the areas");

  const ax2 = D.axes({ x: [0, 260], y: [0, 14], xTicks: 20, yTicks: 2, xLabel: "Quantity (units per week)", yLabel: "Price (US$)", w: 600, h: 430 });
  const dwl = D.polyline([[ax2.X(60), ax2.Y(9)], [ax2.X(60), ax2.Y(5)], [ax2.X(100), ax2.Y(7)]], { fill: "#f8d4cf", stroke: C.red, close: true, width: 1.5 });
  const b2 = ax2.area(dmd, () => 5, [0, 60], { fill: C.fillBlue }) + ax2.area(() => 5, sup, [0, 60], { fill: C.fillAmber }) + dwl + ax2.frame +
    ax2.line([[0, 12], [240, 0]]) + ax2.line([[0, 2], [200, 12]], { stroke: C.amber }) +
    D.line(ax2.X(0), ax2.Y(5), ax2.X(240), ax2.Y(5), { stroke: C.red, width: 2.4 }) + ax2.tag(170, 5, "Maximum price US$5", { dy: -8, fill: C.red }) +
    dash(ax2, [[60, 0], [60, 9]]) + ax2.point(140, 5, { r: 3.5 }) + ax2.point(60, 5, { r: 3.5 }) +
    ax2.tag(60, 0.1, "Qs = 60", { dx: -66, dy: -6, size: 12 }) + ax2.tag(140, 5, "Qd = 140", { dx: -6, dy: 26, size: 12 }) +
    ax2.tag(104, 10.8, "Deadweight loss = 80", { fill: C.red }) + ax2.arrow(100, 10.2, 76, 7.4, { stroke: C.red, width: 1.6 }) +
    ax2.tag(6, 10.6, "Consumer surplus 330", { fill: C.blue, size: 13 }) + ax2.tag(6, 3.6, "PS 90", { fill: C.amber, size: 13 }) +
    lab(ax2, 240, 0, "D", { dx: -22, dy: -10, fill: C.blue }) + lab(ax2, 200, 12, "S", { dx: 8, dy: 4, fill: C.amber });
  const alt2 = "A maximum price of US$5 on the same market: only 60 units are supplied while 140 are demanded (a shortage of 80); consumer surplus 330 plus producer surplus 90 totals 420 instead of 500, so the triangle of deadweight loss between 60 and 100 units is 80.";
  await put("surplus-price-ceiling", D.svg(600, 430, b2), alt2, "Figure: a maximum price of US$5 cuts trade to 60 units and creates a deadweight loss of 80 (red triangle)", "market/surplus", "Several caveats apply.");
}
console.log("done");
