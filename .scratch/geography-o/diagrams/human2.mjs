// geography-o second pass: human, tectonics and land diagrams. Run from repo root: node .scratch/geography-o/diagrams/human2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, figBefore, poly, SOIL, SAND, GRASS, ROCK } from "./kit2.mjs";

// ---------- 1. Network of six towns (transport/networks.md): P-Q, Q-R, R-S, Q-T, T-U, R-T, S-U
{
  const pos = { P: [70, 170], Q: [180, 170], R: [300, 90], T: [300, 250], S: [440, 90], U: [440, 250] };
  const links = [["P", "Q"], ["Q", "R"], ["R", "S"], ["Q", "T"], ["T", "U"], ["R", "T"], ["S", "U"]];
  const nodes = Object.keys(pos);
  const adj = Object.fromEntries(nodes.map((n) => [n, []]));
  for (const [a, z] of links) { adj[a].push(z); adj[z].push(a); }
  const total = {};
  for (const s of nodes) { // fewest links from s to every other node (breadth-first search)
    const dist = { [s]: 0 }, queue = [s];
    while (queue.length) { const v = queue.shift(); for (const w of adj[v]) if (!(w in dist)) { dist[w] = dist[v] + 1; queue.push(w); } }
    total[s] = Object.values(dist).reduce((x, y) => x + y, 0);
  }
  const beta = (links.length / nodes.length).toFixed(2), cyclo = links.length - nodes.length + 1;
  let b = "";
  for (const [a, z] of links) b += D.line(pos[a][0], pos[a][1], pos[z][0], pos[z][1], { stroke: C.axis, width: 3 });
  for (const n of nodes) {
    b += D.circle(pos[n][0], pos[n][1], 20, { fill: n === "P" ? "#f3b4ad" : C.fillBlue, stroke: C.axis, width: 2.2 }) + D.text(pos[n][0], pos[n][1] + 6, n, { anchor: "middle", weight: 700, size: 17 });
    const off = n === "P" ? [0, 40] : n === "Q" ? [0, 40] : n === "R" || n === "S" ? [0, -30] : [0, 42];
    b += D.text(pos[n][0] + off[0], pos[n][1] + off[1], `${total[n]} links`, { anchor: "middle", size: 12.5, fill: C.muted });
  }
  b += D.text(280, 336, `Links = ${links.length}, nodes = ${nodes.length}: beta index = ${links.length} ÷ ${nodes.length} = ${beta}`, { anchor: "middle", size: 13.5, weight: 600 });
  b += D.text(280, 356, `Circuits (cyclomatic number) = ${links.length} − ${nodes.length} + 1 = ${cyclo}`, { anchor: "middle", size: 13.5 });
  b += D.text(280, 20, "Grey figure under each town: fewest links needed to reach all five other towns", { anchor: "middle", size: 12.5, fill: C.muted });
  await figBefore("transport-network-six-towns",
    D.svg(560, 370, b),
    `Topological diagram of six towns P to U joined by seven roads: beta index 7 divided by 6 is ${beta}, there are ${cyclo} circuits, and the total links needed to reach every other town is ${total.Q} for Q, R and T but ${total.P} for P, so P is the least accessible.`,
    "Figure: a topological network of six towns with its beta index and accessibility",
    "transport/networks", "**Beta index** measures connectivity");
}

// ---------- 2. Butler model (tourism/growth-management.md)
{
  const L = 95, mid = 38, k = 10;
  const V = (t) => L / (1 + Math.exp(-(t - mid) / k));
  const ax = D.axes({ x: [0, 100], y: [0, 140], w: 560, h: 400, xTicks: [], yTicks: [], xLabel: "Time", yLabel: "Number of visitors", pad: { l: 40, r: 20, t: 62, b: 44 }, grid: false });
  let b = ax.frame;
  const stages = [[0, 12, "Explor-\nation"], [12, 30, "Involve-\nment"], [30, 55, "Development"], [55, 70, "Consolid-\nation"], [70, 82, "Stagna-\ntion"]];
  for (const [t0, t1, name] of stages) {
    b += D.line(ax.X(t1), ax.Y(0), ax.X(t1), ax.Y(124), { stroke: C.grid, width: 1.4, dash: true });
    b += D.text(ax.X((t0 + t1) / 2), ax.Y(132), name, { anchor: "middle", size: 11.5, weight: 600 });
  }
  b += D.line(ax.X(82), ax.Y(0), ax.X(82), ax.Y(124), { stroke: C.grid, width: 1.4, dash: true });
  b += D.text(ax.X(91), ax.Y(132), "After", { anchor: "middle", size: 11.5, weight: 600 }) + D.text(ax.X(91), ax.Y(132) + 13, "stagnation", { anchor: "middle", size: 11.5, weight: 600 });
  const pts = []; for (let t = 0; t <= 82; t += 2) pts.push([t, V(t)]);
  b += ax.line(pts, { stroke: C.blue });
  const t0 = 82, v0 = V(82);
  b += ax.line([[t0, v0], [92, 105], [100, 118]], { stroke: C.green }) + ax.line([[t0, v0], [100, v0 - 2]], { stroke: C.amber }) + ax.line([[t0, v0], [92, 70], [100, 42]], { stroke: C.red });
  b += ax.label(92, 112, "Rejuvenation", { dx: -4, dy: -6, anchor: "end", size: 12.5, fill: C.green, weight: 600 });
  b += ax.label(100, v0 - 2, "Stable", { dx: -6, dy: -8, anchor: "end", size: 12.5, fill: C.amber, weight: 600 });
  b += ax.label(100, 42, "Decline", { dx: -6, dy: 18, anchor: "end", size: 12.5, fill: C.red, weight: 600 });
  b += D.text(280, 392, "Schematic S-curve: the model shows a pattern, not real visitor numbers.", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("butler-model-curve",
    D.svg(560, 400, b),
    "Butler model: visitor numbers follow an S-shaped curve through exploration, involvement, development, consolidation and stagnation, then either rejuvenate, stay stable or decline.",
    "Figure: the Butler model of resort development (schematic)",
    "tourism/growth-management", "The Butler model (1980) describes");
}

// ---------- 3. Lee's model of migration (population/migration.md)
{
  let b = D.circle(110, 160, 90, { fill: "#fbe3c4", stroke: C.amber, width: 2.4 }) + D.circle(450, 160, 90, { fill: C.fillBlue, stroke: C.blue, width: 2.4 });
  b += D.text(110, 54, "ORIGIN", { anchor: "middle", weight: 700, size: 15, fill: C.amber }) + D.text(450, 54, "DESTINATION", { anchor: "middle", weight: 700, size: 15, fill: C.blue });
  const sign = (x, y, ch, fill) => D.text(x, y, ch, { anchor: "middle", size: 24, weight: 700, fill });
  for (const [x, y, c] of [[70, 130, "−"], [110, 118, "−"], [150, 130, "−"], [80, 175, "−"], [140, 175, "+"], [110, 205, "+"]]) b += sign(x, y, c, c === "+" ? C.green : C.red);
  for (const [x, y, c] of [[410, 130, "+"], [450, 118, "+"], [490, 130, "+"], [420, 175, "+"], [480, 175, "−"], [450, 205, "−"]]) b += sign(x, y, c, c === "+" ? C.green : C.red);
  b += D.text(110, 270, "push factors: unemployment,", { anchor: "middle", size: 12.5 }) + D.text(110, 286, "drought, land shortage", { anchor: "middle", size: 12.5 });
  b += D.text(450, 270, "pull factors: jobs, schools,", { anchor: "middle", size: 12.5 }) + D.text(450, 286, "clinics, safety", { anchor: "middle", size: 12.5 });
  b += D.rect(256, 90, 48, 140, { fill: ROCK, stroke: C.axis, width: 2 });
  for (let y = 100; y < 230; y += 20) b += D.line(256, y, 304, y, { stroke: C.axis, width: 1 });
  b += D.text(280, 250, "Intervening obstacles", { anchor: "middle", size: 12.5, weight: 600 }) + D.text(280, 266, "cost, distance,", { anchor: "middle", size: 12.5 }) + D.text(280, 282, "borders, visas", { anchor: "middle", size: 12.5 });
  b += D.arrow(206, 160, 252, 160, { stroke: C.ink, width: 2.4 }) + D.arrow(308, 160, 352, 160, { stroke: C.ink, width: 2.4 });
  b += D.text(280, 326, "A person moves only if the pull is strong enough to outweigh the push and the obstacles.", { anchor: "middle", size: 12.5, fill: C.muted });
  await figBefore("lee-migration-model",
    D.svg(560, 340, b),
    "Lee's model of migration: an origin with mostly minus signs (push factors) and a destination with mostly plus signs (pull factors) are separated by a wall of intervening obstacles such as cost, distance, borders and visas.",
    "Figure: Lee's model of migration with push, pull and intervening obstacles",
    "population/migration", ':::example{title="Diagram in words: Lee');
}

// ---------- 4. Focus and epicentre (tectonics/earthquakes.md)
{
  const gy = 150;
  let b = D.rect(0, gy, 560, 250, { fill: SOIL, stroke: "none" }) + D.line(0, gy, 560, gy, { stroke: "#8a6a3b", width: 2.4 });
  const fx = 300, fy = 300;
  b += D.line(213, gy + 4, 352, 390, { stroke: C.red, width: 4 });
  b += `<clipPath id="belowGround"><rect x="0" y="${gy + 2}" width="560" height="250"/></clipPath><g clip-path="url(#belowGround)">`;
  for (const r of [34, 74, 114, 154]) b += D.circle(fx, fy, r, { stroke: C.amber, width: 2, dash: true });
  b += "</g>";
  b += D.line(fx, gy, fx, fy, { stroke: C.muted, width: 1.6, dash: true });
  b += D.dot(fx, fy, { stroke: C.red, r: 7 }) + D.polyline([[fx - 9, gy - 2], [fx, gy - 16], [fx + 9, gy - 2]], { fill: C.ink, close: true });
  b += lab(fx + 16, fy + 6, "Focus: where the rocks slip", { size: 13 }) + lab(fx + 16, gy - 50, "Epicentre: on the surface,", { size: 13 }) + lab(fx + 16, gy - 26, "directly above the focus", { size: 13 });
  b += lab(40, 230, "Fault", { size: 13, fill: C.red }) + D.line(84, 226, 238, 214, { stroke: C.red, width: 1.2 });
  b += lab(fx + 6, 230, "Depth of focus", { size: 12.5 });
  b += lab(24, 384, "Seismic waves spread out from the focus (dashed rings)", { size: 12.5, fill: C.amber });
  b += D.text(24, 50, "Shallow focus (less than about 70 km): more surface damage", { size: 12.5, fill: C.muted });
  await fig("earthquake-focus-epicentre",
    D.svg(560, 400, b),
    "Cross-section of an earthquake: rocks slip along a fault at the focus underground, seismic waves spread out from the focus, and the epicentre is the point on the surface directly above it; the shallower the focus, the more surface damage.",
    "Figure: focus, epicentre, fault and seismic waves",
    "tectonics/earthquakes", "4. The stored energy is released");
}

// ---------- 5. S-P time gap and distance (tectonics/earthquakes.md): 25 s gap, 8 km per second of gap = 200 km
{
  const rate = 8, gap = 25, dist = gap * rate;
  const ax = D.axes({ x: [0, 40], y: [0, 320], w: 560, h: 380, xTicks: 5, yTicks: 40, xLabel: "S minus P arrival gap (seconds)", yLabel: "Distance to the epicentre (km)", pad: { l: 70, r: 24, t: 30, b: 62 } });
  let b = ax.frame + ax.line([[0, 0], [40, 40 * rate]], { stroke: C.blue }) + ax.guides(gap, dist, { stroke: C.red }) + ax.point(gap, dist, { stroke: C.red, r: 5 });
  b += ax.tag(gap, dist, `${gap} s gap = ${dist} km`, { dx: 12, dy: 28, fill: C.red });
  b += ax.tag(40, 60, `${rate} km per second`, { anchor: "end", size: 12.5 });
  await figBefore("seismic-gap-distance-graph",
    D.svg(560, 380, b),
    `Straight-line graph of distance to an earthquake against the gap between S and P wave arrivals, using 8 km per second: a 25 second gap means the epicentre is 200 km away; a longer gap means a more distant earthquake.`,
    "Figure: distance from the S-P time gap (8 km per second, fictional station)",
    "tectonics/earthquakes", "## Measuring earthquakes");
}
