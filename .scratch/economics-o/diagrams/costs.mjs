// Costs and revenue lesson diagrams. Run: node .scratch/economics-o/diagrams/costs.mjs
import { D, C, put, lab, dotted } from "./common.mjs";

// Bakery table (costs/costs-of-production): fixed cost 600, TVC at each output
const out = [0, 200, 400, 600, 800, 1000];
const TFC = 600;
const TVC = [0, 300, 500, 750, 1080, 1600];
const TC = TVC.map((v) => v + TFC);

// --- Total cost curves
{
  const ax = D.axes({ x: [0, 1100], y: [0, 2400], xTicks: 200, yTicks: 400, xLabel: "Output (loaves per week)", yLabel: "Cost (US$)", w: 600, h: 440 });
  const body = ax.frame + ax.line(out.map((q) => [q, TFC]), { stroke: C.muted }) + dotted(ax, out.map((q, i) => [q, TVC[i]]), { stroke: C.amber }) + dotted(ax, out.map((q, i) => [q, TC[i]]), { stroke: C.blue }) +
    ax.line([[1000, TVC[5]], [1000, TC[5]]], { stroke: C.red, dash: true, width: 2 }) +
    lab(ax, 1000, TFC, "TFC", { dx: 8, dy: 18, fill: C.muted }) + lab(ax, 1000, TVC[5], "TVC", { dx: -46, dy: 4, fill: C.amber }) + lab(ax, 1000, TC[5], "TC", { dx: 10, dy: 4, fill: C.blue }) +
    ax.tag(1000, 1900, "gap = TFC = 600", { dx: -10, dy: 0, anchor: "end", fill: C.red });
  const alt = "Total cost curves of Chipo's bakery: total fixed cost is a horizontal line at US$600; total variable cost starts at zero and reaches US$1,600 at 1,000 loaves; total cost starts at US$600 and reaches US$2,200, always exactly US$600 above total variable cost.";
  await put("bakery-total-cost-curves", D.svg(600, 440, body), alt, "Figure: TFC is flat, TVC starts at the origin and TC sits TFC above TVC", "costs/costs-of-production", "- **TC** has the same shape as TVC");
}

// --- Average cost curves
{
  const q = out.slice(1);
  const AFC = q.map((x) => TFC / x), AVC = q.map((x, i) => TVC[i + 1] / x), ATC = q.map((x, i) => TC[i + 1] / x);
  const ax = D.axes({ x: [0, 1100], y: [0, 5], xTicks: 200, yTicks: 1, xLabel: "Output (loaves per week)", yLabel: "Cost per loaf (US$)", w: 600, h: 440 });
  const body = ax.frame + dotted(ax, q.map((x, i) => [x, ATC[i]]), { stroke: C.blue }) + dotted(ax, q.map((x, i) => [x, AVC[i]]), { stroke: C.amber }) + dotted(ax, q.map((x, i) => [x, AFC[i]]), { stroke: C.green }) +
    lab(ax, 200, ATC[0], "ATC", { dx: 8, dy: -4, fill: C.blue }) + lab(ax, 1000, AVC[4], "AVC", { dx: 10, dy: 4, fill: C.amber }) + lab(ax, 1000, AFC[4], "AFC", { dx: 10, dy: 4, fill: C.green }) + lab(ax, 1000, ATC[4], "ATC", { dx: 10, dy: 4, fill: C.blue }) +
    ax.point(800, ATC[3], { stroke: C.red, r: 5 }) + ax.arrow(800, 3.15, 800, 2.2, { stroke: C.red, width: 1.8 }) + ax.tag(800, 3.45, "lowest ATC: US$2.10 at 800", { anchor: "middle", dx: 0, dy: 0, fill: C.red });
  const alt = "Average cost curves from the bakery table: average fixed cost falls from US$3.00 at 200 loaves to US$0.60 at 1,000; average variable cost and average total cost are U-shaped, and average total cost is lowest, US$2.10, at 800 loaves before rising to US$2.20.";
  await put("bakery-average-cost-curves", D.svg(600, 440, body), alt, "Figure: AFC falls throughout while AVC and ATC are U-shaped", "costs/costs-of-production", "- **AVC** and **ATC** are usually **U-shaped**");
}

// --- AR and MR for the car wash (costs/revenue)
{
  const q = [1, 2, 3, 4, 5, 6];
  const price = q.map((x) => 13 - x), tr = q.map((x, i) => x * price[i]);
  const mr = q.map((x, i) => tr[i] - (i === 0 ? 0 : tr[i - 1])); // 12,10,8,6,4,2
  const ax = D.axes({ x: [0, 8], y: [0, 14], xTicks: 1, yTicks: 2, xLabel: "Washes per hour", yLabel: "Price, AR and MR (US$)", w: 600, h: 440 });
  const body = ax.frame + dotted(ax, q.map((x, i) => [x, price[i]]), { stroke: C.blue }) + dotted(ax, q.map((x, i) => [x, mr[i]]), { stroke: C.amber }) +
    lab(ax, 6, price[5], "AR = D", { dx: 10, dy: 4, fill: C.blue }) + lab(ax, 6, mr[5], "MR", { dx: 10, dy: 4, fill: C.amber }) +
    ax.line([[4, mr[3]], [4, price[3]]], { stroke: C.red, dash: true, width: 2 }) +
    ax.tag(4, 3.5, "4th wash: AR 9, MR 6", { dx: -8, dy: 0, anchor: "end", fill: C.red });
  const alt = "Revenue per unit for the car wash: the average revenue (price) curve falls from US$12 for 1 wash to US$7 for 6, and marginal revenue falls faster, from US$12 to US$2, so MR is below AR after the first unit; at 4 washes AR is US$9 and MR is US$6.";
  await put("car-wash-ar-mr", D.svg(600, 440, body), alt, "Figure: when a firm must cut its price to sell more, marginal revenue lies below average revenue", "costs/revenue", "Described as a diagram, the AR curve slopes downwards");
}
