// economics-a: government intervention lessons. Run: node .scratch/economics-a/diagrams/intervention.mjs
import { D, C, putAfterBlock, lab, dash } from "./common.mjs";

const lineF = (ax, f, x0, x1, o = {}) => ax.line([[x0, f(x0)], [x1, f(x1)]], o);
const poly = (ax, pts, o) => D.polyline(pts.map(([a, b]) => [ax.X(a), ax.Y(b)]), { close: true, ...o });
const hline = (ax, y, x0, x1, o = {}) => ax.line([[x0, y], [x1, y]], o);
const vline = (ax, x, y0, y1, o = {}) => ax.line([[x, y0], [x, y1]], { stroke: C.muted, dash: true, width: 1.4, ...o });
const mk = (o) => D.axes({ w: 600, h: 450, ...o });

// ---- specific tax (taxes-subsidies.md): D 24 - 0.02Q, S 4 + 0.02Q, tax 4
{
  const d = (q) => 24 - 0.02 * q, s = (q) => 4 + 0.02 * q, st = (q) => 8 + 0.02 * q;
  const ax = mk({ x: [0, 700], y: [0, 28], xTicks: 100, yTicks: 4, xLabel: "Quantity (units)", yLabel: "Price (US$)" });
  const cons = poly(ax, [[0, 14], [400, 14], [400, 16], [0, 16]], { fill: C.fillBlue, stroke: C.blue, width: 1.2 });
  const prod = poly(ax, [[0, 12], [400, 12], [400, 14], [0, 14]], { fill: C.fillAmber, stroke: C.amber, width: 1.2 });
  const dwl = poly(ax, [[400, 16], [400, 12], [500, 14]], { fill: "#f8d4cf", stroke: C.red, width: 1.2 });
  // consumer and producer burden rectangles sit between 12 and 16 at Q 0-400
  const body = cons + prod + dwl + ax.frame + lineF(ax, d, 0, 600) + lineF(ax, s, 0, 600, { stroke: C.amber }) + lineF(ax, st, 0, 600, { stroke: C.red, width: 2.2 }) +
    lab(ax, 600, d(600), "D", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, 600, s(600), "S", { dx: 8, dy: 4, fill: C.amber }) + lab(ax, 600, st(600), "S + tax", { dx: 8, dy: 4, fill: C.red }) +
    vline(ax, 400, 0, 16) + vline(ax, 500, 0, 14) + ax.point(500, 14, { r: 4.5 }) + ax.point(400, 16, { r: 4.5 }) + ax.point(400, 12, { r: 4.5, stroke: C.amber }) +
    ax.tag(500, 14, "Before: 500, US$14", { dx: 10, dy: 26, size: 13 }) + ax.tag(400, 16, "After: 400, consumers pay US$16", { dx: -300, dy: -14, size: 13 }) + ax.tag(400, 12, "Producers keep US$12", { dx: -250, dy: 28, size: 13, fill: C.amber }) +
    ax.label(20, 15.4, "Consumer burden 800", { size: 13, fill: C.blue, weight: 700 }) + ax.label(20, 13.1, "Producer burden 800", { size: 13, fill: C.amber, weight: 700 }) +
    ax.tag(402, 6, "Deadweight loss 200", { dx: 10, dy: 0, size: 13, fill: C.red });
  const alt = "A specific tax of US$4 per unit shifts supply up from S to S + tax: equilibrium moves from 500 units at US$14 to 400 units at US$16; consumers pay US$2 more and producers keep US$12, US$2 less, so the burden is split 800 each of the 1,600 revenue, and the small triangle is a deadweight loss of 200.";
  await putAfterBlock("tax-incidence-specific", D.svg(600, 450, body), alt, "Figure: a US$4 specific tax shifts supply up by the tax; the revenue rectangle (blue plus amber) is shared equally and the red triangle is the deadweight loss", "intervention/taxes-subsidies", "A specific tax of four dollars per unit");
}

// ---- subsidy (taxes-subsidies.md): S - 3
{
  const d = (q) => 24 - 0.02 * q, s = (q) => 4 + 0.02 * q, ss = (q) => 1 + 0.02 * q;
  const ax = mk({ x: [0, 800], y: [0, 28], xTicks: 100, yTicks: 4, xLabel: "Quantity (units)", yLabel: "Price (US$)" });
  const dwl = poly(ax, [[500, 14], [575, 12.5], [575, 15.5]], { fill: "#f8d4cf", stroke: C.red, width: 1.2 });
  const body = dwl + ax.frame + lineF(ax, d, 0, 600) + lineF(ax, s, 0, 600, { stroke: C.amber }) + lineF(ax, ss, 0, 600, { stroke: C.green, width: 2.2 }) +
    lab(ax, 40, d(40), "D", { dx: 8, dy: -6, fill: C.blue }) + lab(ax, 60, s(60), "S", { dx: 4, dy: -10, fill: C.amber }) + lab(ax, 600, ss(600), "S + subsidy", { dx: 8, dy: 4, fill: C.green }) +
    vline(ax, 500, 0, 14) + vline(ax, 575, 0, 15.5) + ax.point(500, 14, { r: 4.5 }) + ax.point(575, 12.5, { r: 4.5 }) + ax.point(575, 15.5, { r: 4.5, stroke: C.amber }) +
    ax.tag(500, 14, "Before: 500, US$14", { dx: -250, dy: -14, size: 13 }) + ax.tag(575, 15.5, "Producers: US$15.50", { dx: 14, dy: -10, size: 13, fill: C.amber }) +
    ax.tag(575, 4.4, "After: 575, consumers pay US$12.50", { anchor: "end", size: 13 }) +
    ax.tag(575, 2.3, "Welfare loss 112.50 (red); cost 3 x 575 = 1,725", { anchor: "end", size: 13, fill: C.red });
  const alt = "A subsidy of US$3 per unit shifts supply down to S + subsidy: equilibrium moves from 500 units at US$14 to 575 units at US$12.50; consumers pay US$1.50 less and producers receive US$15.50, US$1.50 more, at a cost to government of 1,725 with a welfare loss triangle of 112.50.";
  await putAfterBlock("subsidy-effect", D.svg(600, 450, body), alt, "Figure: a US$3 subsidy shifts supply down; output rises to 575, consumers and producers share the benefit equally and the red triangle is the welfare loss", "intervention/taxes-subsidies", "A subsidy of three dollars per unit (original market)");
}

// ---- maximum price (price-controls-buffer-stocks.md): D 60 - 0.1Q, S 20 + 0.1Q
{
  const d = (q) => 60 - 0.1 * q, s = (q) => 20 + 0.1 * q;
  const ax = mk({ x: [0, 600], y: [0, 70], xTicks: 100, yTicks: 10, xLabel: "Quantity (tonnes)", yLabel: "Price (US$ per tonne)" });
  const body = ax.frame + lineF(ax, d, 0, 600 - 0, { stroke: C.blue }) + lineF(ax, s, 0, 480, { stroke: C.amber }) +
    lab(ax, 600, d(600), "D", { dx: -22, dy: -10, fill: C.blue }) + lab(ax, 480, s(480), "S", { dx: 8, dy: 4, fill: C.amber }) +
    hline(ax, 30, 0, 560, { stroke: C.red, width: 2.4 }) + ax.tag(560, 30, "Maximum price US$30", { anchor: "end", dy: 26, size: 13, fill: C.red }) +
    ax.line([[100, 30], [300, 30]], { stroke: C.red, width: 5 }) + ax.tag(200, 30, "Shortage 200", { dx: -50, dy: -10, size: 13, fill: C.red }) +
    ax.point(200, 40, { r: 4.5 }) + ax.tag(200, 40, "Equilibrium: 200, US$40", { dx: 10, dy: -14, size: 13 }) +
    vline(ax, 100, 0, 50) + ax.point(100, 50, { r: 4.5, stroke: C.red }) + ax.tag(100, 50, "Black-market price up to US$50", { dx: 10, dy: -10, size: 13, fill: C.red }) +
    ax.tag(100, 2, "Qs = 100", { dx: -34, dy: 0, size: 12 }) + ax.tag(300, 2, "Qd = 300", { dx: -34, dy: 0, size: 12 }) + vline(ax, 300, 0, 30);
  const alt = "A maximum price of US$30 below the equilibrium of US$40 and 200 tonnes: quantity demanded is 300 tonnes but only 100 tonnes are supplied, a shortage of 200, and at 100 tonnes buyers would pay up to US$50, so a black market can exceed the original equilibrium price.";
  await putAfterBlock("maximum-price-shortage", D.svg(600, 450, body), alt, "Figure: a maximum price below equilibrium creates a shortage (red bar) and an incentive for black-market trade", "intervention/price-controls-buffer-stocks", "A maximum price of 30 dollars");

  const ax2 = mk({ x: [0, 600], y: [0, 70], xTicks: 100, yTicks: 10, xLabel: "Quantity (tonnes)", yLabel: "Price (US$ per tonne)" });
  const b2 = ax2.frame + lineF(ax2, d, 0, 600, { stroke: C.blue }) + lineF(ax2, s, 0, 480, { stroke: C.amber }) +
    lab(ax2, 600, d(600), "D", { dx: -22, dy: -10, fill: C.blue }) + lab(ax2, 480, s(480), "S", { dx: 8, dy: 4, fill: C.amber }) +
    hline(ax2, 50, 0, 560, { stroke: C.red, width: 2.4 }) + ax2.tag(560, 50, "Minimum price US$50", { anchor: "end", dy: -8, size: 13, fill: C.red }) +
    ax2.line([[100, 50], [300, 50]], { stroke: C.red, width: 5 }) + ax2.tag(200, 50, "Surplus 200", { dx: -40, dy: 26, size: 13, fill: C.red }) +
    ax2.point(200, 40, { r: 4.5 }) + ax2.tag(200, 40, "Equilibrium: 200, US$40", { dx: -40, dy: 40, size: 13 }) +
    vline(ax2, 100, 0, 50) + vline(ax2, 300, 0, 50) + ax2.tag(100, 2, "Qd = 100", { dx: -34, dy: 0, size: 12 }) + ax2.tag(300, 2, "Qs = 300", { dx: -34, dy: 0, size: 12 });
  const alt2 = "A minimum price of US$50 above the equilibrium of US$40 and 200 tonnes: quantity demanded falls to 100 tonnes while quantity supplied rises to 300, a surplus of 200 tonnes that the government would have to buy at a cost of US$10,000 to hold the price.";
  await putAfterBlock("minimum-price-surplus", D.svg(600, 450, b2), alt2, "Figure: a minimum price above equilibrium creates a surplus (red bar) that must be bought, stored or exported", "intervention/price-controls-buffer-stocks", "A minimum price of 50 dollars");

  // buffer stock
  const sg = (q) => 4 + 0.1 * q, sb = (q) => 36 + 0.1 * q;
  const ax3 = mk({ x: [0, 400], y: [0, 70], xTicks: 50, yTicks: 10, xLabel: "Quantity (tonnes)", yLabel: "Price (US$ per tonne)" });
  const b3 = ax3.frame + lineF(ax3, d, 0, 400, { stroke: C.blue }) + lineF(ax3, sg, 0, 400, { stroke: C.green }) + lineF(ax3, sb, 0, 270, { stroke: C.red }) +
    lab(ax3, 400, d(400), "D", { dx: -20, dy: -10, fill: C.blue }) + lab(ax3, 380, sg(380), "S good", { dx: -56, dy: -12, fill: C.green }) + lab(ax3, 270, sb(270), "S poor", { dx: 6, dy: -4, fill: C.red }) +
    hline(ax3, 35, 0, 400, { stroke: C.muted, width: 1.8, dash: true }) + hline(ax3, 45, 0, 400, { stroke: C.muted, width: 1.8, dash: true }) +
    ax3.label(5, 35, "Floor US$35", { dy: 18, size: 13 }) + ax3.label(5, 45, "Ceiling US$45", { dy: -6, size: 13 }) +
    ax3.line([[250, 35], [310, 35]], { stroke: C.green, width: 5 }) + ax3.tag(310, 35, "Agency buys 60", { dx: 8, dy: 38, size: 13, fill: C.green }) +
    ax3.line([[90, 45], [150, 45]], { stroke: C.red, width: 5 }) + ax3.tag(150, 45, "Agency sells 60", { dx: 8, dy: -12, size: 13, fill: C.red }) +
    ax3.point(280, 32, { r: 4 }) + ax3.tag(280, 32, "No scheme: US$32", { dx: 6, dy: 52, size: 12 }) + ax3.point(120, 48, { r: 4 }) + ax3.tag(120, 48, "No scheme: US$48", { dx: -150, dy: -12, size: 12 });
  const alt3 = "A buffer stock with a floor of US$35 and a ceiling of US$45: in a good harvest the market price would be US$32, so at US$35 the agency buys the 60 tonnes by which supply of 310 exceeds demand of 250; in a poor harvest the price would be US$48, so at US$45 it sells 60 tonnes from stock to meet demand of 150 against supply of 90.";
  await putAfterBlock("buffer-stock-scheme", D.svg(600, 450, b3), alt3, "Figure: the agency buys 60 tonnes in a good harvest (green) and sells 60 in a poor one (red) to hold price between US$35 and US$45", "intervention/price-controls-buffer-stocks", "A poor harvest: the agency sells");
}

// ---- externalities (externalities.md)
{
  const ax = mk({ x: [0, 260], y: [0, 110], xTicks: 20, yTicks: 10, xLabel: "Quantity (units)", yLabel: "US$" });
  const mpb = (q) => 100 - 0.5 * q, mpc = (q) => 10 + 0.25 * q, msc = (q) => 25 + 0.25 * q;
  const dwl = poly(ax, [[100, 50], [120, 40], [120, 55]], { fill: "#f8d4cf", stroke: C.red, width: 1.2 });
  const body = dwl + ax.frame + lineF(ax, mpb, 0, 200, { stroke: C.blue }) + lineF(ax, mpc, 0, 240, { stroke: C.amber }) + lineF(ax, msc, 0, 240, { stroke: C.red }) +
    lab(ax, 10, mpb(10), "MPB = MSB", { dx: 10, dy: 22, fill: C.blue }) + lab(ax, 240, mpc(240), "MPC", { dx: 6, dy: 4, fill: C.amber }) + lab(ax, 240, msc(240), "MSC", { dx: 6, dy: -4, fill: C.red }) +
    vline(ax, 100, 0, 50) + vline(ax, 120, 0, 55) + ax.point(120, 40, { r: 4.5 }) + ax.point(100, 50, { r: 4.5, stroke: C.red }) +
    ax.tag(120, 40, "Market: 120, US$40", { dx: 12, dy: 8, size: 13 }) + ax.tag(100, 50, "Optimum: 100, US$50", { dx: -170, dy: -12, size: 13, fill: C.red }) +
    ax.tag(120, 12, "Welfare loss 150", { dx: 10, dy: 0, size: 13, fill: C.red }) + ax.line([[120, 40], [120, 55]], { stroke: C.red, width: 4.5 }) + ax.label(122, 49, "MEC 15", { dx: 10, size: 13, fill: C.red, weight: 700 });
  const alt = "Negative externality of production: with MPB = 100 - 0.5Q, MPC = 10 + 0.25Q and an external cost of US$15 a unit (MSC = 25 + 0.25Q), the market produces 120 units at US$40 where MPB meets MPC, but the social optimum is 100 units where MSB meets MSC, so over-production of 20 units causes a welfare loss triangle of US$150.";
  await putAfterBlock("negative-externality-welfare-loss", D.svg(600, 450, body), alt, "Figure: with an external cost the market over-produces (120 against 100); the red triangle is the welfare loss", "intervention/externalities", "Welfare loss from linear curves");

  const ax2 = mk({ x: [0, 260], y: [0, 110], xTicks: 20, yTicks: 10, xLabel: "Quantity (units)", yLabel: "US$" });
  const b = (q) => 94 - 0.5 * q, sb = (q) => 106 - 0.5 * q, c = (q) => 10 + 0.25 * q;
  const dwl2 = poly(ax2, [[112, 38], [112, 50], [128, 42]], { fill: "#f8d4cf", stroke: C.red, width: 1.2 });
  const b2 = dwl2 + ax2.frame + lineF(ax2, b, 0, 188, { stroke: C.blue }) + lineF(ax2, sb, 0, 212, { stroke: C.green }) + lineF(ax2, c, 0, 240, { stroke: C.amber }) +
    lab(ax2, 0, 94, "MPB", { dx: 12, dy: 20, fill: C.blue }) + lab(ax2, 0, 106, "MSB", { dx: 12, dy: -6, fill: C.green }) + lab(ax2, 240, c(240), "MPC = MSC", { dx: -40, dy: -10, fill: C.amber }) +
    vline(ax2, 112, 0, 50) + vline(ax2, 128, 0, 42) + ax2.point(112, 38, { r: 4.5 }) + ax2.point(128, 42, { r: 4.5, stroke: C.green }) +
    ax2.tag(112, 38, "Market: 112, US$38", { dx: -190, dy: 8, size: 13 }) + ax2.tag(128, 42, "Optimum: 128, US$42", { dx: 14, dy: 14, size: 13, fill: C.green }) +
    ax2.tag(112, 12, "Welfare loss 96", { dx: -128, dy: 0, size: 13, fill: C.red });
  const alt2 = "Positive externality of consumption: with MPB = 94 - 0.5Q, MPC = 10 + 0.25Q and an external benefit of US$12 a unit (MSB = 106 - 0.5Q), the market produces 112 units at US$38 but the social optimum is 128 units at US$42, so there is under-provision of 16 units and a welfare loss triangle of US$96.";
  await putAfterBlock("positive-externality-under-provision", D.svg(600, 450, b2), alt2, "Figure: with an external benefit the market under-provides (112 against 128); the red triangle is the welfare loss", "intervention/externalities", "Under-provision of a positive externality");
}
console.log("done");
