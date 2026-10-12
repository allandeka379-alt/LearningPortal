// Diagrams for economics-o markets lessons (reference example for the diagram pass; kit: .scratch/tools/diagram-kit.mjs).
// Run: node .scratch/economics-o/diagrams/markets.mjs
import * as D from "../../tools/diagram-kit.mjs";

const FAMILY = "economics-o";
const LESSONS = `content/subjects/${FAMILY}/lessons`;

// Tomato market from the schedule in markets/equilibrium.md: Qd = 1200 - 75P, Qs = 75P (P in US$ per crate).
{
  const qd = (p) => 1200 - 75 * p;
  const qs = (p) => 75 * p;
  const ax = D.axes({ x: [0, 1000], y: [0, 14], xTicks: 200, yTicks: 2, xLabel: "Quantity (crates per day)", yLabel: "Price per crate (US$)", w: 600, h: 430 });
  const demand = [4, 12].map((p) => [qd(p), p]);
  const supply = [4, 12].map((p) => [qs(p), p]);
  const body =
    ax.frame +
    ax.line(demand) +
    ax.line(supply, { stroke: D.C.amber }) +
    ax.guides(600, 8) +
    ax.point(600, 8) +
    ax.label(qd(12), 12, "D", { dx: -22, dy: 4, weight: 700, fill: D.C.blue }) +
    ax.label(qs(12), 12, "S", { dx: 10, dy: 4, weight: 700, fill: D.C.amber }) +
    ax.tag(600, 8, "Equilibrium: US$8, 600 crates", { dx: 12, dy: 26 }) +
    // shortage at US$4: from Qs = 300 to Qd = 900
    ax.line([[qs(4), 4], [qd(4), 4]], { stroke: D.C.red, width: 2, dash: true }) +
    ax.tag(qs(4) + 120, 4, "Shortage of 600 at US$4", { dy: -10, fill: D.C.red });
  const svg = D.svg(600, 430, body);
  const alt =
    "Demand and supply diagram for the tomato market: the downward demand curve D and upward supply curve S cross at a price of US$8 and 600 crates a day; at US$4 the gap between 300 crates supplied and 900 demanded is a shortage of 600.";
  await D.figure(FAMILY, "tomato-market-equilibrium", svg, { alt, caption: "Figure: the tomato market finds its equilibrium at US$8 and 600 crates" });
  D.insertAfter(`${LESSONS}/markets/equilibrium.md`, "## Describing the equilibrium diagram", D.md("tomato-market-equilibrium", alt, "Figure: the tomato market finds its equilibrium at US$8 and 600 crates"));
}
console.log("economics-o markets diagrams written");
