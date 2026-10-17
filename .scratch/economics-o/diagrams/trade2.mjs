// Second pass: trade diagrams (comparative advantage, tariff, quota, terms of trade). Run: node .scratch/economics-o/diagrams/trade2.mjs
import { D, C, lab } from "./common.mjs";
import { putB as put } from "./place.mjs";

// --- Comparative advantage (trade/comparative-advantage): same numbers as Worked example 2
{
  const A = { maize: 60, cloth: 30 }, B = { maize: 20, cloth: 20 };
  const ax = D.axes({ x: [0, 70], y: [0, 35], xTicks: 10, yTicks: 5, xLabel: "Maize (tonnes)", yLabel: "Cloth (thousand metres)", w: 600, h: 430 });
  const ocA = A.cloth / A.maize, ocB = B.cloth / B.maize;
  const body = ax.frame +
    ax.line([[0, A.cloth], [A.maize, 0]], { stroke: C.blue }) + ax.line([[0, B.cloth], [B.maize, 0]], { stroke: C.amber }) +
    ax.point(30, 15, { stroke: C.blue, r: 5 }) + ax.point(10, 10, { stroke: C.amber, r: 5 }) +
    ax.point(50, 5, { stroke: C.blue, r: 5, fill: "#fff" }) + ax.point(0, 20, { stroke: C.amber, r: 5, fill: "#fff" }) +
    ax.tag(30, 15, "A half and half: 30, 15", { dx: 10, dy: -4, fill: C.blue }) +
    ax.tag(10, 10, "B half and half: 10, 10", { dx: 10, dy: 6, fill: C.amber }) +
    ax.tag(50, 5, "A after: 50, 5", { dx: 4, dy: -14, fill: C.blue }) +
    ax.tag(0, 20, "B after: 0, 20", { dx: 10, dy: -8, fill: C.amber }) +
    lab(ax, 60, 0, "A", { dx: 6, dy: -8, fill: C.blue }) + lab(ax, 20, 0, "B", { dx: -2, dy: -10, fill: C.amber }) +
    ax.label(70, 33, `A gives up ${ocA} thousand m of cloth for 1 t of maize`, { anchor: "end", size: 13, fill: C.blue }) +
    ax.label(70, 31, `B gives up ${ocB} thousand m of cloth for 1 t of maize`, { anchor: "end", size: 13, fill: C.amber, dy: 8 });
  const alt = `Production possibility lines for the same resources: Country A (maize 60 tonnes or cloth 30 thousand metres) has a flatter line than Country B (maize 20 or cloth 20), so A's opportunity cost of 1 tonne of maize is ${ocA} thousand metres of cloth against B's ${ocB}; A has the comparative advantage in maize and B in cloth, and specialising lifts total maize from 40 to 50 tonnes with cloth unchanged at 25.`;
  await put("comparative-advantage-ppc-lines", D.svg(600, 430, body), alt, "Figure: the flatter line shows the lower opportunity cost of maize, so Country A specialises in maize and Country B in cloth", "trade/comparative-advantage", "Divide the output of the good given up by the output of the good gained.");
}

// --- Tariff (trade/protection): Worked example 1 numbers. Qd = 900 - 500(P-1), Qs = 100 + 500(P-1)
const Pd = (q) => 2.8 - q / 500, Ps = (q) => 0.8 + q / 500;
const world = 1.0, tariff = 0.4, wt = world + tariff;
{
  const qs0 = 100, qd0 = 900, qs1 = 300, qd1 = 700;
  const ax = D.axes({ x: [0, 1000], y: [0.8, 2.0], xTicks: 200, yTicks: [1.0, 1.2, 1.4, 1.6, 1.8, 2.0], xLabel: "Cooking oil (thousand litres a week)", yLabel: "Price (US$ per litre)", w: 600, h: 440, yFormat: (v) => v.toFixed(2) });
  const rev = tariff * (qd1 - qs1) * 1000;
  const body = ax.frame +
    D.rect(ax.X(qs1), ax.Y(wt), ax.X(qd1) - ax.X(qs1), ax.Y(world) - ax.Y(wt), { fill: C.fillAmber, stroke: C.amber, width: 1.2 }) +
    ax.line([[0, Pd(0)], [1000, Pd(1000)]], { stroke: C.blue }) +
    ax.line([[0, Ps(0)], [1000, Ps(1000)]], { stroke: C.green }) +
    ax.line([[0, world], [1000, world]], { stroke: C.muted, dash: true, width: 2 }) +
    ax.line([[0, wt], [1000, wt]], { stroke: C.red, dash: true, width: 2 }) +
    ax.point(qs0, world, { stroke: C.green }) + ax.point(qd0, world, { stroke: C.blue }) + ax.point(qs1, wt, { stroke: C.green }) + ax.point(qd1, wt, { stroke: C.blue }) +
    ax.guides(qs1, wt) + ax.guides(qd1, wt) +
    lab(ax, 400, 2.0, "D", { dx: -22, dy: 14, fill: C.blue }) + lab(ax, 600, 2.0, "S (local)", { dx: 8, dy: 14, fill: C.green }) +
    ax.label(460, world, "World price 1.00", { dy: 18, size: 13, fill: C.muted }) +
    ax.label(1000, wt, "With tariff 1.40", { anchor: "end", dy: -8, size: 13, fill: C.red }) +
    ax.label((qs1 + qd1) / 2, (world + wt) / 2, "Tariff revenue\n0.40 x 400 = US$160,000", { anchor: "middle", size: 13, weight: 700, fill: C.amber, dy: -6 });
  const alt = `Cooking oil market: at the world price of US$1.00 local firms supply ${qs0} and consumers demand ${qd0} thousand litres, so imports are ${qd0 - qs0}; a US$0.40 tariff lifts the price to US$1.40, local supply rises to ${qs1}, demand falls to ${qd1}, imports fall to ${qd1 - qs1} thousand litres and the government collects US$${rev.toLocaleString("en-GB")} a week.`;
  await put("tariff-cooking-oil", D.svg(600, 440, body), alt, "Figure: a tariff raises the price, cuts imports and raises local output and government revenue", "trade/protection", "Draw a diagram with **price** on the vertical axis");
}

// --- Quota (trade/protection): Worked example 2. Local supply + quota of 200
{
  const quota = 200, pq = 1.6;
  const ax = D.axes({ x: [0, 1000], y: [0.8, 2.0], xTicks: 200, yTicks: [1.0, 1.2, 1.4, 1.6, 1.8, 2.0], xLabel: "Cooking oil (thousand litres a week)", yLabel: "Price (US$ per litre)", w: 600, h: 440, yFormat: (v) => v.toFixed(2) });
  const Sq = (q) => Ps(q - quota);
  const qd = Math.round(2.8 * 500 - 500 * pq), qs = Math.round(100 + 500 * (pq - 1));
  if (qd - qs !== quota) throw new Error("quota check failed");
  const body = ax.frame +
    ax.line([[0, Pd(0)], [1000, Pd(1000)]], { stroke: C.blue }) + ax.line([[0, Ps(0)], [1000, Ps(1000)]], { stroke: C.green }) +
    ax.line([[300, world], [1000, Sq(1000)]], { stroke: C.amber, dash: true }) +
    ax.line([[0, world], [1000, world]], { stroke: C.muted, dash: true, width: 1.6 }) +
    ax.point(qs, pq, { stroke: C.green }) + ax.point(qd, pq, { stroke: C.red, r: 5 }) + ax.guides(qd, pq) +
    ax.line([[qs, pq], [qd, pq]], { stroke: C.red, width: 3 }) +
    lab(ax, 400, 2.0, "D", { dx: -22, dy: 14, fill: C.blue }) + lab(ax, 600, 2.0, "S (local)", { dx: 8, dy: 14, fill: C.green }) +
    lab(ax, 700, Sq(700), "S + quota", { dx: 10, dy: 6, fill: C.amber }) +
    ax.label(40, world, "World price 1.00", { dy: 18, size: 13, fill: C.muted }) +
    ax.label(640, 1.34, "At US$1.60:\ndemand 600,\nlocal supply 400,\nimports 200 (red)", { anchor: "middle", size: 13, weight: 700 });
  const alt = `Cooking oil with an import quota of ${quota} thousand litres: the supply available to the market is local supply plus the quota, which meets demand at US$1.60, where consumers buy ${qd}, local firms supply ${qs} and imports fill the ${quota} gap; the price is higher than with the 0.40 tariff and the government collects no revenue.`;
  await put("quota-cooking-oil", D.svg(600, 440, body), alt, "Figure: a quota limits imports to 200 thousand litres and the price rises to US$1.60", "trade/protection", "Using the same table, the government instead sets an import quota");
}

// --- Terms of trade (trade/terms-of-trade): the table
{
  const years = [2023, 2024, 2025, 2026], xi = [100, 104, 98, 112], mi = [100, 108, 112, 105];
  const tot = xi.map((e, i) => Math.round((e / mi[i]) * 1000) / 10);
  const ax = D.axes({ x: [2022.6, 2026.4], y: [80, 120], xTicks: years, yTicks: 10, xLabel: "Year", yLabel: "Index (2023 = 100)", w: 600, h: 420, xFormat: (v) => String(v) });
  const pts = (a) => years.map((y, i) => [y, a[i]]);
  const mk = (a, col) => ax.line(pts(a), { stroke: col }) + pts(a).map(([x, y]) => ax.point(x, y, { stroke: col, r: 4 })).join("");
  const body = ax.frame + ax.line([[2022.6, 100], [2026.4, 100]], { stroke: C.muted, dash: true, width: 1.4 }) +
    mk(xi, C.blue) + mk(mi, C.amber) + mk(tot, C.red) +
    years.map((y, i) => ax.label(y, tot[i], String(tot[i]), { anchor: "middle", dy: tot[i] < 100 ? 20 : -10, size: 13, weight: 700, fill: C.red })).join("") +
    ax.label(2022.7, 118, "Export price index (blue)", { fill: C.blue, weight: 700, size: 13 }) +
    ax.label(2022.7, 115.5, "Import price index (amber)", { fill: C.amber, weight: 700, size: 13 }) +
    ax.label(2022.7, 113, "Terms of trade (red, values shown)", { fill: C.red, weight: 700, size: 13 });
  const alt = `Price indices (2023 = 100): export prices 100, 104, 98, 112 and import prices 100, 108, 112, 105 give terms of trade of ${tot.join(", ")} for 2023 to 2026; they fall below 100 in 2024 and 2025 (unfavourable) and recover to ${tot[3]} in 2026 (favourable).`;
  await put("terms-of-trade-indices", D.svg(600, 420, body), alt, "Figure: the terms of trade are the export price index divided by the import price index, times 100", "trade/terms-of-trade", "The table shows price indices for a fictional mineral-exporting country");
}
