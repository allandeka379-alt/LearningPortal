// economics-a: international trade lessons. Run: node .scratch/economics-a/diagrams/trade.mjs
import { D, C, put, putAfterBlock, lab, dotted, dash } from "./common.mjs";

const lineF = (ax, f, x0, x1, o = {}) => ax.line([[x0, f(x0)], [x1, f(x1)]], o);
const poly = (ax, pts, o) => D.polyline(pts.map(([a, b]) => [ax.X(a), ax.Y(b)]), { close: true, ...o });
const hline = (ax, y, x0, x1, o = {}) => ax.line([[x0, y], [x1, y]], o);
const vline = (ax, x, y0, y1, o = {}) => ax.line([[x, y0], [x, y1]], { stroke: C.muted, dash: true, width: 1.4, ...o });
const mk = (o) => D.axes({ w: 600, h: 450, ...o });

// ---- floating exchange rate (exchange-rates-floating.md): D1 Q = 1000 - 100P, S Q = 150P - 500, D2 = D1 + 125
{
  const ax = mk({ x: [200, 650], y: [4.5, 7.5], xTicks: 50, yTicks: 0.5, xLabel: "Rand traded (R million per day)", yLabel: "Price of R1 (US cents)" });
  const d1 = (p) => 1000 - 100 * p, d2 = (p) => 1125 - 100 * p, s = (p) => 150 * p - 500;
  const body = ax.frame + ax.line([[d1(7.2), 7.2], [d1(4.8), 4.8]]) + ax.line([[d2(7.2), 7.2], [d2(4.8), 4.8]], { stroke: C.teal, dash: true }) + ax.line([[s(4.8), 4.8], [s(7.2), 7.2]], { stroke: C.amber }) +
    lab(ax, d1(4.8), 4.8, "D1", { dx: 6, dy: -4, fill: C.blue }) + lab(ax, d2(4.8), 4.8, "D2", { dx: 6, dy: -4, fill: C.teal }) + lab(ax, s(7.2), 7.2, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.point(400, 6, { r: 5.5 }) + ax.label(400, 6, "E1", { dx: -30, dy: 22, weight: 700, size: 15 }) +
    ax.point(475, 6.5, { r: 5.5, stroke: C.teal }) + ax.label(475, 6.5, "E2", { dx: 10, dy: -12, weight: 700, size: 15, fill: C.teal }) +
    hline(ax, 6, 200, 400, { stroke: C.muted, dash: true, width: 1.4 }) + hline(ax, 6.5, 200, 475, { stroke: C.muted, dash: true, width: 1.4 }) +
    ax.label(205, 5.75, "Red bar: excess demand", { size: 13, fill: C.red }) + ax.label(205, 5.6, "of 125 at 6.0 cents", { size: 13, fill: C.red }) + ax.label(205, 5.35, "E1: 6.0 cents, R400m", { size: 12 }) + ax.label(205, 5.2, "E2: 6.5 cents, R475m", { size: 12, fill: C.teal }) + ax.line([[400, 6], [525, 6]], { stroke: C.red, width: 4 });
  const alt = "Market for South African rand: demand D1 and supply S meet at 6.0 US cents and R400 million; a rise in foreign demand of 125 at every price shifts demand to D2, creating excess demand of 125 at 6.0 cents, so the rand appreciates 8.3% to 6.5 cents with R475 million traded.";
  await putAfterBlock("rand-appreciation", D.svg(600, 450, body), alt, "Figure: higher foreign demand shifts D1 to D2 and the rand appreciates from 6.0 to 6.5 cents", "trade/exchange-rates-floating", "An appreciation");
}

// ---- tariff (protectionism.md): D P = 120 - Q, S P = 20 + Q, world price 50, tariff 10
{
  const ax = mk({ x: [0, 100], y: [30, 100], xTicks: 10, yTicks: 10, xLabel: "Quantity (units)", yLabel: "Price (US$)" });
  const ps = poly(ax, [[0, 50], [30, 50], [40, 60], [0, 60]], { fill: C.fillAmber, stroke: C.amber, width: 1.2 });
  const rev = poly(ax, [[40, 50], [60, 50], [60, 60], [40, 60]], { fill: C.fillBlue, stroke: C.blue, width: 1.2 });
  const dw1 = poly(ax, [[30, 50], [40, 50], [40, 60]], { fill: "#f8d4cf", stroke: C.red, width: 1.2 });
  const dw2 = poly(ax, [[60, 60], [70, 50], [60, 50]], { fill: "#f8d4cf", stroke: C.red, width: 1.2 });
  const body = ps + rev + dw1 + dw2 + ax.frame + lineF(ax, (q) => 120 - q, 20, 90) + lineF(ax, (q) => 20 + q, 10, 80, { stroke: C.amber }) +
    hline(ax, 50, 0, 100, { stroke: C.green, width: 2.2 }) + hline(ax, 60, 0, 100, { stroke: C.red, width: 2.2 }) +
    lab(ax, 20, 100, "D", { dx: 8, dy: 4, fill: C.blue }) + lab(ax, 80, 100, "S", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(100, 50, "World price US$50", { anchor: "end", dy: 26, size: 13, fill: C.green }) + ax.tag(100, 60, "Price with tariff US$60", { anchor: "end", dy: -8, size: 13, fill: C.red }) +
    vline(ax, 30, 30, 50) + vline(ax, 40, 30, 60) + vline(ax, 60, 30, 60) + vline(ax, 70, 30, 50) +
    ax.tag(30, 31.5, "Qs 30", { anchor: "end", dx: -3, size: 12 }) + ax.tag(40, 31.5, "Qs 40", { dx: 3, size: 12 }) + ax.tag(60, 31.5, "Qd 60", { anchor: "end", dx: -3, size: 12 }) + ax.tag(70, 31.5, "Qd 70", { dx: 3, size: 12 }) +
    ax.tag(4, 56, "Producer gain 350", { size: 12, fill: C.amber }) + ax.tag(41, 82, "Revenue 200 (blue)", { size: 12, fill: C.blue }) + ax.arrow(50, 79, 50, 61, { stroke: C.blue, width: 1.5 }) +
    ax.tag(5, 92, "Red triangles: welfare loss 50 + 50 = 100", { size: 12, fill: C.red });
  const alt = "Tariff on a small country's imports: world price US$50, domestic demand P = 120 - Q and supply P = 20 + Q; a US$10 tariff raises the price to US$60, cuts quantity demanded from 70 to 60 and raises home supply from 30 to 40, so imports fall from 40 to 20; producers gain 350, the government collects 200, consumers lose 650 and the two triangles are a welfare loss of 50 each.";
  await putAfterBlock("tariff-welfare-effects", D.svg(600, 450, body), alt, "Figure: a tariff raises the domestic price; producer gain (amber), tariff revenue (blue) and two welfare-loss triangles (red) account for the consumers' loss of 650", "trade/protectionism", "The effects of the tariff");
}

// ---- comparative advantage and trading possibility curve (absolute-comparative.md)
{
  const ax = mk({ x: [0, 100], y: [0, 36], xTicks: 10, yTicks: 4, xLabel: "Maize (tonnes)", yLabel: "Cotton (tonnes)" });
  const body = ax.frame + ax.line([[0, 30], [60, 0]], { stroke: C.blue, width: 2.8 }) + ax.line([[0, 30], [90, 0]], { stroke: C.amber, width: 2.4, dash: true }) + ax.line([[0, 10], [40, 0]], { stroke: C.muted, width: 2 }) +
    ax.tag(36, 9, "Zandia PPC", { anchor: "end", size: 13, fill: C.blue }) + ax.tag(60, 17, "Trading possibility curve", { size: 13, fill: C.amber }) + ax.tag(8, 3.4, "Mbira PPC", { size: 13 }) +
    ax.point(12, 24, { r: 5.5 }) + ax.label(12, 24, "A", { dx: -18, dy: 18, weight: 700, size: 15 }) + ax.point(15, 25, { r: 5.5, stroke: C.amber }) + ax.label(15, 25, "B", { dx: 8, dy: -10, weight: 700, size: 15, fill: C.amber }) +
    ax.label(40, 34, "A: before trade, 12 maize and 24 cotton", { size: 13 }) + ax.label(40, 32, "B: after trade, 15 maize and 25 cotton", { size: 13, fill: C.amber }) + ax.label(40, 30, "Trade at 3 maize per cotton: cotton axis 30 to maize 90", { size: 12, fill: C.muted });
  const alt = "Zandia's production possibility curve joins 60 tonnes of maize to 30 tonnes of cotton; specialising in cotton and trading at 3 maize per cotton gives a trading possibility curve out to 90 tonnes of maize, outside the PPC, so Zandia can consume 15 maize and 25 cotton (point B) instead of 12 and 24 (A); Mbira's flatter PPC runs from 40 maize to 10 cotton.";
  await putAfterBlock("trading-possibility-curve", D.svg(600, 450, body), alt, "Figure: trade lets Zandia consume beyond its PPC; the dashed trading possibility curve lies outside it", "trade/absolute-comparative", "The trading possibility curve");
}

// ---- J-curve (exchange-rate-effects.md)
{
  const pts = [[0, -100], [1, -140], [2, -120], [3, -60], [4, 10], [5, 40]];
  const ax = mk({ x: [0, 5.8], y: [-160, 60], xTicks: 1, yTicks: 40, origin: false, xLabel: "Quarters after the depreciation", yLabel: "Trade balance (US$ million)" });
  const body = ax.frame + ax.line([[0, 0], [5.8, 0]], { stroke: C.ink, width: 1.6 }) + dotted(ax, pts) +
    ax.tag(1, -140, "Quarter 1: -140 (worst)", { dx: 14, dy: 24, size: 13, fill: C.red }) + ax.tag(0, -100, "Before: -100", { dx: 6, dy: -22, size: 13 }) + ax.tag(4, 10, "Quarter 4: +10 (surplus)", { dx: -160, dy: -26, size: 13, fill: C.green }) + ax.tag(5, 40, "+40", { dx: 8, dy: -4, size: 13, fill: C.green }) +
    ax.tag(3, -60, "Volumes adjust: deficit narrows", { dx: 14, dy: 30, size: 13 });
  const alt = "J-curve: after a depreciation the trade balance first worsens from a deficit of US$100 million to US$140 million in quarter 1, then improves to -120, -60, a surplus of +10 in quarter 4 and +40 in quarter 5, tracing a J shape.";
  await putAfterBlock("j-curve-trade-balance", D.svg(600, 450, body), alt, "Figure: the J-curve, where the trade balance worsens before it improves", "trade/exchange-rate-effects", "Reading the J-curve");
}
console.log("done");
