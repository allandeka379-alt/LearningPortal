// Demand and supply lesson diagrams. Run: node .scratch/economics-o/diagrams/demand-supply.mjs
import { D, C, put, lab, dotted } from "./common.mjs";

// --- Bread market demand (demand/law-of-demand): schedule in the lesson
{
  const prices = [0.8, 1.0, 1.2, 1.4, 1.6];
  const hh = [[10, 6, 4], [8, 5, 4], [7, 4, 3], [5, 3, 3], [4, 2, 2]];
  const q = hh.map((r) => r.reduce((a, b) => a + b, 0)); // 20,17,14,11,8
  const pts = prices.map((p, i) => [q[i], p]);
  const ax = D.axes({ x: [0, 24], y: [0.6, 1.8], xTicks: 4, yTicks: [0.8, 1.0, 1.2, 1.4, 1.6, 1.8], xLabel: "Loaves per week", yLabel: "Price per loaf (US$)", w: 600, h: 420, yFormat: (v) => v.toFixed(2) });
  const body = ax.frame + dotted(ax, pts) + lab(ax, q[0], prices[0], "D", { dx: 10, dy: 4, fill: C.blue }) +
    ax.guides(17, 1.0) + ax.guides(11, 1.4) +
    ax.arrow(16.5, 1.153, 11.5, 1.487, { stroke: C.red, width: 2.2 }) +
    ax.tag(17.2, 1.0, "US$1.00: 17 loaves", { dx: 8, dy: 4 }) + ax.tag(11, 1.4, "US$1.40: 11 loaves", { dx: -10, dy: -14, anchor: "end" }) +
    ax.tag(15.5, 1.5, "contraction", { fill: C.red, dx: 0, dy: 0 });
  const alt = "Market demand curve for bread in Gweru plotted from the schedule: it slopes down from 8 loaves a week at US$1.60 to 20 loaves at US$0.80; a price rise from US$1.00 (17 loaves) to US$1.40 (11 loaves) is a contraction, a movement up along the same curve.";
  await put("bread-demand-curve", D.svg(600, 420, body), alt, "Figure: the market demand curve for bread; a rise in price is a movement along it", "demand/law-of-demand", "**slopes downwards from left to right**");
}

// --- Chicken demand shift (demand/shifts): D1 and D2 +150 at each price
{
  const prices = [3, 4, 5, 6];
  const d1 = [500, 400, 300, 200], d2 = d1.map((v) => v + 150);
  const ax = D.axes({ x: [0, 800], y: [2, 7], xTicks: 100, yTicks: 1, xLabel: "Chicken (kg per week)", yLabel: "Price (US$ per kg)", w: 600, h: 420 });
  const body = ax.frame + dotted(ax, prices.map((p, i) => [d1[i], p]), { stroke: C.blue }) + dotted(ax, prices.map((p, i) => [d2[i], p]), { stroke: C.amber }) +
    ax.line([[300, 5], [450, 5]], { stroke: C.red, dash: true, width: 2, arrow: true }) +
    lab(ax, 200, 6, "D1", { dx: -34, dy: 4, fill: C.blue }) + lab(ax, 350, 6, "D2", { dx: 8, dy: 4, fill: C.amber }) +
    ax.tag(300, 5, "300 to 450 kg at US$5", { dx: -10, dy: 30, fill: C.red, anchor: "end" });
  const alt = "Demand for chicken shifts right from D1 to D2 after a pay rise: at every price 150 kg a week more is demanded, for example at US$5 quantity demanded rises from 300 kg to 450 kg, an increase in demand.";
  await put("chicken-demand-shift", D.svg(600, 420, body), alt, "Figure: a pay rise shifts demand for chicken right, from D1 to D2", "demand/shifts", "**Increase in demand:**");
}

// --- Tomato supply curve (supply/law-of-supply)
{
  const prices = [4, 6, 8, 10];
  const q = [[20, 10, 0], [30, 16, 5], [38, 22, 10], [45, 28, 14]].map((r) => r.reduce((a, b) => a + b, 0)); // 30,51,70,87
  const ax = D.axes({ x: [0, 100], y: [2, 12], xTicks: 10, yTicks: 2, xLabel: "Crates per week", yLabel: "Price per crate (US$)", w: 600, h: 420 });
  const body = ax.frame + dotted(ax, prices.map((p, i) => [q[i], p]), { stroke: C.amber }) + lab(ax, q[3], 10, "S", { dx: 10, dy: 4, fill: C.amber }) +
    ax.guides(51, 6) + ax.guides(87, 10) +
    ax.arrow(57, 5.67, 85, 8.78, { stroke: C.red, width: 2.2 }) +
    ax.tag(51, 6, "US$6: 51 crates", { dx: 8, dy: 64 }) + ax.tag(87, 10, "US$10: 87 crates", { dx: -8, dy: -12, anchor: "end" }) +
    ax.tag(72, 6.9, "extension", { fill: C.red, dx: 10, dy: 0 });
  const alt = "Market supply curve for tomatoes: it slopes up from 30 crates a week at US$4 to 87 crates at US$10; a price rise from US$6 (51 crates) to US$10 (87 crates) is an extension, a movement up along the same curve.";
  await put("tomato-supply-curve", D.svg(600, 420, body), alt, "Figure: the market supply curve for tomatoes; a rise in price is a movement along it", "supply/law-of-supply", "**slopes upwards from left to right**");
}

// --- Maize supply shift (supply/shifts): S1 normal, S2 drought (-300)
{
  const prices = [200, 250, 300, 350];
  const s1 = [800, 1000, 1200, 1400], s2 = s1.map((v) => v - 300);
  const ax = D.axes({ x: [0, 1600], y: [150, 400], xTicks: 200, yTicks: 50, xLabel: "Maize (tonnes)", yLabel: "Price (US$ per tonne)", w: 600, h: 420 });
  const body = ax.frame + dotted(ax, prices.map((p, i) => [s1[i], p]), { stroke: C.blue }) + dotted(ax, prices.map((p, i) => [s2[i], p]), { stroke: C.amber }) +
    ax.line([[1200, 300], [900, 300]], { stroke: C.red, dash: true, width: 2, arrow: true }) +
    lab(ax, 1400, 350, "S1", { dx: 10, dy: 4, fill: C.blue }) + lab(ax, 1100, 350, "S2", { dx: 10, dy: 4, fill: C.amber }) +
    ax.tag(900, 300, "1,200 to 900 t at US$300", { dx: -50, dy: 44, fill: C.red, anchor: "end" });
  const alt = "Supply of maize shifts left from S1 to S2 in a drought: at every price 300 tonnes less is supplied, for example at US$300 quantity supplied falls from 1,200 to 900 tonnes, a decrease in supply of 25 percent.";
  await put("maize-supply-shift", D.svg(600, 420, body), alt, "Figure: a drought shifts the supply of maize left, from S1 to S2", "supply/shifts", "**Decrease in supply:**");
}
