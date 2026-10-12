// Graph helpers for the ai.graphs-search lesson and slice: stepwise Dijkstra and A* traces, checked against lib.mjs.
import { dijkstra, aStar, pathTo, mdTable, same, chk } from "../lib.mjs";
export const edgesToGraph = (edges) => { const g = {}; for (const [a, b, w] of edges) { (g[a] ??= {})[b] = w; (g[b] ??= {})[a] = w; } return g; };
export function dijkstraSteps(graph, start) {
  const names = Object.keys(graph).sort();
  const dist = Object.fromEntries(names.map((n) => [n, Infinity])); dist[start] = 0;
  const prev = {}, done = new Set(), rows = [];
  while (done.size < names.length) {
    const cand = names.filter((v) => !done.has(v) && dist[v] < Infinity).sort((a, b) => dist[a] - dist[b] || a.localeCompare(b));
    if (!cand.length) break;
    const u = cand[0]; done.add(u);
    for (const [v, w] of Object.entries(graph[u])) if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; prev[v] = u; }
    rows.push({ visited: u, dist: { ...dist }, done: new Set(done), order: [...done] });
  }
  const ref = dijkstra(graph, start);
  const srt = (o) => Object.fromEntries(Object.entries(o).sort(([a], [b]) => a.localeCompare(b)));
  same(srt(dist), srt(ref.dist), "dijkstra dist"); same(srt(prev), srt(ref.prev), "dijkstra prev");
  return { rows, dist, prev, names };
}
export function dijkstraMd(graph, start) {
  const { rows, names } = dijkstraSteps(graph, start);
  const cell = (r, n) => (r.dist[n] === Infinity ? "∞" : r.done.has(n) && n === r.visited ? `**${r.dist[n]}**` : r.done.has(n) ? `${r.dist[n]}✓` : r.dist[n]);
  return mdTable(["Visit", ...names], rows.map((r) => [r.visited, ...names.map((n) => cell(r, n))]));
}
/** A* with open-list snapshots; verified against lib.aStar */
export function aStarSteps(graph, start, goal, h) {
  const g = { [start]: 0 }, prev = {}, open = new Set([start]), closed = new Set(), rows = [];
  while (open.size) {
    const u = [...open].sort((a, b) => g[a] + h[a] - (g[b] + h[b]) || h[a] - h[b] || a.localeCompare(b))[0];
    open.delete(u);
    rows.push({ node: u, g: g[u], h: h[u], f: g[u] + h[u], open: [...open].map((n) => `${n}(${g[n] + h[n]})`).sort() });
    if (u === goal) break;
    closed.add(u);
    for (const [v, w] of Object.entries(graph[u])) { if (closed.has(v)) continue; if (g[v] === undefined || g[u] + w < g[v]) { g[v] = g[u] + w; prev[v] = u; open.add(v); } }
    rows[rows.length - 1].openAfter = [...open].map((n) => `${n}(${g[n] + h[n]})`).sort();
  }
  const ref = aStar(graph, start, goal, h);
  same(rows.map((r) => r.node), ref.expanded, "aStar order"); chk(g[goal], ref.cost);
  return { rows, cost: g[goal], path: ref.path };
}
export const aStarMd = (graph, start, goal, h) => { const { rows } = aStarSteps(graph, start, goal, h); return mdTable(["Expand", "g", "h", "f = g + h", "Open list after (node(f))"], rows.map((r) => [r.node, r.g, r.h, r.f, (r.openAfter ?? ["goal reached"]).join(", ") || "(empty)"])); };
export const edgeMd = (edges) => mdTable(["Edge", "Weight"], edges.map(([a, b, w]) => [`${a} – ${b}`, w]));
