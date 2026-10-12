import { edgesToGraph, dijkstraMd, dijkstraSteps, aStarMd, aStarSteps, edgeMd } from "./w2a-graph.mjs";
import { dijkstra, pathTo, mdTable, chk, same } from "../lib.mjs";
export const edges = [["H", "C", 100], ["H", "M", 70], ["C", "K", 60], ["K", "W", 90], ["W", "G", 55], ["G", "B", 165], ["W", "B", 220], ["M", "G", 250], ["K", "G", 140], ["M", "R", 75], ["R", "T", 85], ["T", "N", 60]];
export const names = { H: "Harare", C: "Chegutu", K: "Kadoma", W: "Kwekwe", G: "Gweru", B: "Bulawayo", M: "Marondera", R: "Rusape", T: "Mutare", N: "Nyanga" };
export const graph = edgesToGraph(edges);
const dB = dijkstra(graph, "B").dist;
export const h = Object.fromEntries(Object.entries(dB).map(([k, v]) => [k, Math.floor((v * 0.9) / 5) * 5]));
for (const [k, v] of Object.entries(h)) if (v > dB[k]) throw new Error("heuristic not admissible " + k);
const dj = dijkstraSteps(graph, "H");
same(dj.rows.map((r) => r.visited).join(""), "HMCRKTWNGB");
chk(dj.dist.B, 465);
same(pathTo(dj.prev, "H", "B"), ["H", "C", "K", "G", "B"]);
const as = aStarSteps(graph, "H", "B", h);
chk(as.cost, 465); same(as.rows.map((r) => r.node).join(""), "HCKMGWB");
const hTable = mdTable(["Node", "Estimate h to Bulawayo", "True distance (for checking)"], Object.keys(h).sort().map((k) => [`${k} (${names[k]})`, h[k], dB[k]]));
export const snips = {
  keyNodes: mdTable(["Letter", "Town"], Object.entries(names)),
  edges: edgeMd(edges), dj: dijkstraMd(graph, "H"), as: aStarMd(graph, "H", "B", h), hTable,
  djOrder: dj.rows.map((r) => r.visited).join(", "), asOrder: as.rows.map((r) => r.node).join(", "),
  nDj: String(dj.rows.length), nAs: String(as.rows.length), path: "H, C, K, G, B", cost: "465",
};
if (process.argv[1].endsWith("w2a-graphs-search.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
