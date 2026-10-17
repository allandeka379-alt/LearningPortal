// Price controls, taxes/subsidies and price-change lesson diagrams. Run: node .scratch/economics-o/diagrams/markets2.mjs
import { D, C, put, lab } from "./common.mjs";

const two = (f, a, b) => [[f(a), a], [f(b), b]]; // straight line through the quantities at prices a and b

// --- Maximum price on maize meal (markets/price-controls): Qd = 2000 - 100P, Qs = 200 + 100P, ceiling US$7
{
  const qd = (p) => 2000 - 100 * p, qs = (p) => 200 + 100 * p, cap = 7;
  const ax = D.axes({ x: [600, 1500], y: [5, 12], xTicks: 100, yTicks: 1, xLabel: "Bags per week", yLabel: "Price per 10 kg bag (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line(two(qd, 5.6, 11.4), { stroke: C.blue }) + ax.line(two(qs, 5.6, 11.4), { stroke: C.amber }) +
    ax.line([[600, cap], [1450, cap]], { stroke: C.red, width: 2.2 }) +
    ax.line([[qs(cap), cap], [qd(cap), cap]], { stroke: C.red, width: 5 }) +
    ax.guides(qs(cap), cap) + ax.guides(qd(cap), cap) + ax.point(qs(cap), cap) + ax.point(qd(cap), cap) + ax.point(1100, 9) +
    lab(ax, qd(5.6), 5.6, "D", { dx: 8, dy: -2, fill: C.blue }) + lab(ax, qs(11.4), 11.4, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(1100, 9, "Equilibrium: US$9, 1,100", { dx: 12, dy: 6 }) +
    ax.tag(1450, cap, "Maximum price US$7", { anchor: "end", dx: 0, dy: -10, fill: C.red }) +
    ax.tag((qs(cap) + qd(cap)) / 2, cap, "Shortage 400", { anchor: "middle", dy: 32, fill: C.red });
  const alt = "Maize meal market with a maximum price of US$7, below the equilibrium of US$9 and 1,100 bags: at US$7 only 900 bags are supplied but 1,300 are demanded, a shortage of 400 bags a week.";
  await put("maximum-price-maize-meal", D.svg(600, 440, body), alt, "Figure: a maximum price below equilibrium creates a shortage", "markets/price-controls", "Only Qs is actually bought and sold.");
}

// --- Minimum price for wheat (markets/price-controls): Qd = 1600 - 3P, Qs = 2P, floor US$350
{
  const qd = (p) => 1600 - 3 * p, qs = (p) => 2 * p, floor = 350;
  const ax = D.axes({ x: [400, 900], y: [240, 380], xTicks: 100, yTicks: 20, xLabel: "Tonnes per month", yLabel: "Price per tonne (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line(two(qd, 250, 370), { stroke: C.blue }) + ax.line(two(qs, 250, 370), { stroke: C.amber }) +
    ax.line([[400, floor], [870, floor]], { stroke: C.red, width: 2.2 }) + ax.line([[qd(floor), floor], [qs(floor), floor]], { stroke: C.red, width: 5 }) +
    ax.guides(qd(floor), floor) + ax.guides(qs(floor), floor) + ax.point(qd(floor), floor) + ax.point(qs(floor), floor) + ax.point(640, 320) +
    lab(ax, qd(370), 370, "D", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, qs(370), 370, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(640, 320, "Equilibrium: US$320, 640", { dx: 0, dy: 34, anchor: "middle" }) +
    ax.tag(870, floor, "Minimum price US$350", { anchor: "end", dy: -10, fill: C.red }) +
    ax.tag((qd(floor) + qs(floor)) / 2, floor, "Surplus 150", { anchor: "middle", dy: 32, fill: C.red });
  const alt = "Wheat market with a minimum price of US$350 a tonne, above the equilibrium of US$320 and 640 tonnes: at US$350 farmers supply 700 tonnes but only 550 tonnes are demanded, a surplus of 150 tonnes a month.";
  await put("minimum-price-wheat", D.svg(600, 440, body), alt, "Figure: a minimum price above equilibrium creates a surplus", "markets/price-controls", "the gap Qd to Qs is the surplus.");
}

// --- Specific tax on a sugary drink (markets/taxes-subsidies): Qd = 3000 - 800P, Qs = 1200P - 1000, tax 0.50
{
  const tax = 0.5;
  const qd = (p) => 3000 - 800 * p, qs = (p) => 1200 * p - 1000, qs2 = (p) => qs(p - tax);
  const ax = D.axes({ x: [0, 1800], y: [1.6, 2.6], xTicks: 300, yTicks: 0.2, xLabel: "Bottles per day", yLabel: "Price per bottle (US$)", w: 600, h: 440, yFormat: (v) => v.toFixed(2) });
  const q2 = 1160, p2 = 2.3, pk = p2 - tax;
  const body = ax.frame +
    D.rect(ax.X(0), ax.Y(p2), ax.X(q2) - ax.X(0), ax.Y(pk) - ax.Y(p2), { fill: C.fillAmber, stroke: C.amber, width: 1.2 }) +
    ax.line(two(qd, 1.7, 2.5), { stroke: C.blue }) + ax.line(two(qs, 1.7, 2.3), { stroke: C.green }) + ax.line(two(qs2, 1.9, 2.55), { stroke: C.amber }) +
    ax.point(1400, 2.0) + ax.point(q2, p2) + ax.guides(1400, 2.0) + ax.guides(q2, p2) +
    lab(ax, qd(2.5), 2.5, "D", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, qs(2.3), 2.3, "S1", { dx: 8, dy: 4, fill: C.green }) + lab(ax, qs2(2.55), 2.55, "S2 (S1 + 0.50 tax)", { dx: -8, dy: -8, fill: C.amber, anchor: "end" }) +
    ax.tag(1400, 2.0, "US$2.00, 1,400", { dx: 10, dy: 22 }) + ax.tag(q2, p2, "US$2.30, 1,160", { dx: -10, dy: -10, anchor: "end" }) +
    ax.label(560, 2.1, "Tax revenue\n0.50 x 1,160\n= US$580", { anchor: "middle", size: 13, fill: C.amber, weight: 700 });
  const alt = "A tax of US$0.50 a bottle shifts supply left from S1 to S2: the price paid by consumers rises from US$2.00 to US$2.30 and quantity falls from 1,400 to 1,160 bottles; producers keep US$1.80 and the tax revenue rectangle is 0.50 x 1,160 = US$580 a day.";
  await put("specific-tax-sugary-drink", D.svg(600, 440, body), alt, "Figure: a specific tax shifts supply up by the tax; price rises and quantity falls", "markets/taxes-subsidies", "**Describing the diagram.** Price on the vertical axis, quantity on the horizontal axis. Demand D slopes down");
}

// --- Subsidy on fertiliser (markets/taxes-subsidies): Qd = 4800 - 40P, Qs = 40P*? check: 22->1840, 30->2800 => slope 120, Qs = 120P - 800
{
  const sub = 10;
  const d = (p) => 3440 - 80 * (p - 22), s = (p) => 1840 + 120 * (p - 22), s2 = (p) => s(p + sub);
  const ax = D.axes({ x: [1500, 4500], y: [18, 36], xTicks: 500, yTicks: 2, xLabel: "Bags per month", yLabel: "Price per bag (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line(two(d, 18, 34), { stroke: C.blue }) + ax.line(two(s, 20, 34), { stroke: C.green }) + ax.line(two(s2, 20, 30), { stroke: C.amber }) +
    ax.point(2800, 30) + ax.point(3280, 24) + ax.guides(2800, 30) + ax.guides(3280, 24) +
    lab(ax, d(34), 34, "D", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, s(34), 34, "S1", { dx: 8, dy: 4, fill: C.green }) + lab(ax, s2(30), 30, "S2 (S1 - 10 subsidy)", { dx: 4, dy: -10, fill: C.amber, anchor: "end" }) +
    ax.tag(2800, 30, "US$30, 2,800", { dx: -10, dy: -10, anchor: "end" }) + ax.tag(3280, 24, "US$24, 3,280", { dx: 10, dy: 24 });
  const alt = "A subsidy of US$10 a bag shifts the supply of fertiliser right from S1 to S2: the price farmers pay falls from US$30 to US$24 and the quantity rises from 2,800 to 3,280 bags a month; the cost to the government is 10 x 3,280 = US$32,800.";
  await put("fertiliser-subsidy", D.svg(600, 440, body), alt, "Figure: a subsidy shifts supply right; price falls and quantity rises", "markets/taxes-subsidies", "## How a subsidy affects the market");
}

// --- Shoes: increase in demand (markets/price-changes): Qd1 = 1000 - 20P, Qd2 = 1200 - 20P, Qs = 20P
{
  const d1 = (p) => 1000 - 20 * p, d2 = (p) => 1200 - 20 * p, s = (p) => 20 * p;
  const ax = D.axes({ x: [200, 1000], y: [10, 40], xTicks: 100, yTicks: 5, xLabel: "Pairs per week", yLabel: "Price per pair (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line(two(d1, 14, 36), { stroke: C.blue }) + ax.line(two(d2, 14, 36), { stroke: C.red }) + ax.line(two(s, 14, 36), { stroke: C.amber }) +
    ax.line([[s(25), 25], [d2(25), 25]], { stroke: C.red, dash: true, width: 2 }) +
    ax.point(500, 25) + ax.point(600, 30) + ax.guides(500, 25) + ax.guides(600, 30) +
    lab(ax, d1(36), 36, "D1", { dx: -4, dy: -8, fill: C.blue }) + lab(ax, d2(36), 36, "D2", { dx: 8, dy: 4, fill: C.red }) + lab(ax, s(36), 36, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(d2(25), 25, "Shortage 200 at US$25", { dx: 8, dy: 28, fill: C.red }) +
    ax.tag(500, 25, "US$25, 500", { dx: -10, dy: 28, anchor: "end" }) + ax.tag(600, 30, "US$30, 600", { dx: -10, dy: -10, anchor: "end" });
  const alt = "School shoes market: demand rises from D1 to D2 in January; at the old price of US$25 quantity demanded is 700 but only 500 are supplied, a shortage of 200, so the equilibrium moves to US$30 and 600 pairs a week.";
  await put("shoes-demand-increase", D.svg(600, 440, body), alt, "Figure: an increase in demand raises both the equilibrium price and quantity", "markets/price-changes", "- D2 crosses S at a higher price P2");
}
