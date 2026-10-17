// economics-a: labour market and factor reward lessons. Run: node .scratch/economics-a/diagrams/labour.mjs
import { D, C, putAfterBlock, lab, dotted, dash } from "./common.mjs";

const lineF = (ax, f, x0, x1, o = {}) => ax.line([[x0, f(x0)], [x1, f(x1)]], o);
const poly = (ax, pts, o) => D.polyline(pts.map(([a, b]) => [ax.X(a), ax.Y(b)]), { close: true, ...o });
const hline = (ax, y, x0, x1, o = {}) => ax.line([[x0, y], [x1, y]], o);
const vline = (ax, x, y0, y1, o = {}) => ax.line([[x, y0], [x, y1]], { stroke: C.muted, dash: true, width: 1.4, ...o });
const mk = (o) => D.axes({ w: 600, h: 450, ...o });

// ---- MRP as the demand for labour (demand-mrp.md): tomato farm
{
  const mpp = [16, 14, 12, 10, 8, 6, 4, 2];
  const mrp4 = mpp.map((m, i) => [i + 1, m * 4]);
  const mrp5 = mpp.map((m, i) => [i + 1, m * 5]);
  const ax = mk({ x: [0, 10], y: [0, 90], xTicks: 1, yTicks: 10, xLabel: "Workers employed", yLabel: "US$ per day" });
  const body = ax.frame + dotted(ax, mrp5, { stroke: C.green }) + dotted(ax, mrp4) + hline(ax, 36, 0, 9.5, { stroke: C.red, width: 2.4 }) +
    lab(ax, 8, 10, "MRP, price US$5", { dx: 8, dy: -8, fill: C.green, size: 13 }) + lab(ax, 8, 8, "MRP, price US$4", { dx: 8, dy: 16, fill: C.blue, size: 13 }) +
    ax.tag(0.1, 36, "Wage US$36", { size: 13, fill: C.red }) +
    vline(ax, 4, 0, 40) + ax.point(4, 40, { r: 5.5 }) + vline(ax, 5, 0, 40, { stroke: C.green }) + ax.point(5, 40, { r: 5.5, stroke: C.green }) +
    ax.tag(0.1, 20, "Price US$4: hires 4 (4th MRP 40, 5th 32)", { size: 13, fill: C.blue }) + ax.tag(0.1, 14, "Price US$5: hires 5 (5th MRP 40, 6th 30)", { size: 13, fill: C.green });
  const alt = "The farm's demand for labour is its MRP curve: with crates at US$4 the MRP falls 64, 56, 48, 40, 32 for the first five workers, so at a wage of US$36 it hires 4 workers; if the price rises to US$5 the MRP curve shifts right (MRP 80, 70, 60, 50, 40) and the farm hires 5.";
  await putAfterBlock("mrp-demand-for-labour", D.svg(600, 450, body), alt, "Figure: the firm hires up to the worker whose MRP is at least the wage (4 workers); a higher product price shifts demand right (5 workers)", "labour/demand-mrp", "How many workers will the farm hire?");
}

// ---- minimum wage in a competitive market (wage-determination.md): D W = 14 - 0.02L, S W = 2 + 0.01L
{
  const ax = mk({ x: [0, 800], y: [0, 15], xTicks: 100, yTicks: 1, xLabel: "Workers", yLabel: "Wage (US$ an hour)" });
  const body = ax.frame + lineF(ax, (l) => 14 - 0.02 * l, 100, 650, { stroke: C.blue }) + lineF(ax, (l) => 2 + 0.01 * l, 0, 750, { stroke: C.amber }) +
    lab(ax, 100, 12, "D = MRP", { dx: 10, dy: -8, fill: C.blue }) + lab(ax, 750, 9.5, "S", { dx: 6, dy: 0, fill: C.amber }) +
    ax.point(400, 6, { r: 5 }) + ax.tag(400, 6, "Equilibrium: US$6, 400 workers", { dx: 90, dy: 26, size: 13 }) +
    hline(ax, 7, 0, 780, { stroke: C.red, width: 2.4 }) + ax.tag(780, 7, "Minimum wage US$7", { anchor: "end", dy: -8, size: 13, fill: C.red }) +
    ax.line([[350, 7], [500, 7]], { stroke: C.red, width: 6 }) + vline(ax, 350, 0, 7) + vline(ax, 500, 0, 7) +
    ax.tag(350, 1.3, "Demand 350", { anchor: "end", dx: -6, size: 12 }) + ax.tag(500, 1.3, "Supply 500", { dx: 6, size: 12 }) +
    ax.tag(425, 8.9, "Unemployment 150", { anchor: "middle", size: 13, fill: C.red });
  const alt = "Minimum wage in a competitive labour market: demand W = 14 - 0.02L and supply W = 2 + 0.01L meet at US$6 and 400 workers; a minimum wage of US$7 cuts the number demanded to 350 while 500 want jobs, so employment falls by 50 and unemployment is 150.";
  await putAfterBlock("minimum-wage-competitive", D.svg(600, 450, body), alt, "Figure: a minimum wage above equilibrium reduces employment and creates unemployment of 150 (the red bar)", "labour/wage-determination", "A minimum wage of US\\$7");

  // monopsony
  const ax2 = mk({ x: [0, 800], y: [0, 15], xTicks: 100, yTicks: 1, xLabel: "Workers", yLabel: "Wage (US$ an hour)" });
  const b2 = ax2.frame + lineF(ax2, (l) => 14 - 0.02 * l, 0, 650, { stroke: C.blue }) + lineF(ax2, (l) => 2 + 0.01 * l, 0, 750, { stroke: C.amber }) + lineF(ax2, (l) => 2 + 0.02 * l, 0, 600, { stroke: C.red, width: 2.4 }) +
    lab(ax2, 0, 14, "MRP", { dx: 10, dy: 12, fill: C.blue }) + lab(ax2, 750, 9.5, "S = AC of labour", { dx: -110, dy: -10, fill: C.amber, size: 13 }) + lab(ax2, 600, 14, "MCL", { dx: 6, dy: 6, fill: C.red }) +
    ax2.point(300, 8, { r: 5, stroke: C.red }) + ax2.point(300, 5, { r: 5.5 }) + ax2.point(400, 6, { r: 4.5, stroke: C.green }) +
    vline(ax2, 300, 0, 8) + hline(ax2, 5, 0, 300, { stroke: C.muted, dash: true, width: 1.4 }) + ax2.tag(300, 8, "MRP = MCL: 300 workers", { dx: 12, dy: -14, size: 13, fill: C.red }) +
    ax2.tag(300, 5, "Monopsony wage US$5", { dx: -170, dy: 28, size: 13 }) + ax2.tag(400, 6, "Competitive: US$6, 400", { dx: 24, dy: 40, size: 13, fill: C.green }) + vline(ax2, 400, 0, 6);
  const alt2 = "Monopsony: with MRP = 14 - 0.02L, labour supply W = 2 + 0.01L and marginal cost of labour MCL = 2 + 0.02L, the employer hires 300 workers where MRP equals MCL (US$8) but pays only US$5 from the supply curve, below the competitive wage of US$6 and employment of 400.";
  await putAfterBlock("monopsony-labour-market", D.svg(600, 450, b2), alt2, "Figure: a monopsonist hires where MRP = MCL and pays the lower wage read from the supply curve", "labour/wage-determination", "A minimum wage in a monopsony");
}

// ---- economic rent (rent-transfer-earnings.md): S: W = 4 + 0.05L, wage 10
{
  const ax = mk({ x: [0, 220], y: [0, 14], xTicks: 20, yTicks: 2, xLabel: "Welders", yLabel: "Wage (US$ an hour)" });
  const rent = poly(ax, [[0, 4], [120, 10], [0, 10]], { fill: C.fillBlue, stroke: C.blue, width: 1.2 });
  const transfer = poly(ax, [[0, 0], [0, 4], [120, 10], [120, 0]], { fill: C.fillAmber, stroke: C.amber, width: 1.2 });
  const body = rent + transfer + ax.frame + lineF(ax, (l) => 4 + 0.05 * l, 0, 200, { stroke: C.amber, width: 2.6 }) + hline(ax, 10, 0, 200, { stroke: C.red, width: 2.2 }) +
    lab(ax, 200, 14, "S", { dx: 6, dy: 0, fill: C.amber }) + ax.tag(200, 10, "Wage US$10", { anchor: "end", dy: 26, size: 13, fill: C.red }) + vline(ax, 120, 0, 10) +
    ax.tag(10, 8.8, "Economic rent: 360", { size: 14, fill: C.blue }) + ax.tag(40, 3.2, "Transfer earnings: 840", { size: 14, fill: C.amber }) +
    ax.tag(120, 0.1, "120 welders", { dx: 6, dy: -4, size: 13 });
  const alt = "Economic rent for welders with supply W = 4 + 0.05L and a market wage of US$10: 120 welders are employed; the triangle between the wage line and the supply curve (half of 6 times 120 = US$360 an hour) is economic rent and the area under the supply curve (US$840) is transfer earnings, out of a total payment of US$1,200.";
  await putAfterBlock("economic-rent-supply-curve", D.svg(600, 450, body), alt, "Figure: economic rent (blue) is the area above the supply curve and below the wage; transfer earnings (amber) lie under the supply curve", "distribution/rent-transfer-earnings", "Rent in a labour market");
}
console.log("done");
