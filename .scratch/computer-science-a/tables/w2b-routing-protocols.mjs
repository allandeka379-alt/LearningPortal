import { dijkstra, pathTo, mdTable, same } from "../lib.mjs";
export const edges = [["A","B",50],["B","F",50],["A","C",10],["C","D",10],["D","E",10],["E","F",10]];
export const graph = (useCost = true) => { const g = {}; for (const [a,b,c] of edges) { (g[a] ??= {})[b] = useCost ? c : 1; (g[b] ??= {})[a] = useCost ? c : 1; } return g; };
export const route = (from, to, useCost) => { const r = dijkstra(graph(useCost), from); return { path: pathTo(r.prev, from, to), metric: r.dist[to] }; };
if (process.argv[1].endsWith("w2b-routing-protocols.mjs")) {
  console.log(mdTable(["Link","OSPF cost"], edges.map(e=>[`${e[0]} - ${e[1]}`, e[2]])));
  for (const to of ["B","C","D","E","F"]) console.log(to, JSON.stringify(route("A",to,false)), JSON.stringify(route("A",to,true)));
}
