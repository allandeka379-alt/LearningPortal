import { cpa, cpaNodes, cpaTable, table } from "../lib.mjs";
const ex1 = [
  { id: "A", dur: 3, after: [] }, { id: "B", dur: 4, after: ["A"] }, { id: "C", dur: 2, after: [] },
  { id: "D", dur: 6, after: ["B", "C"] }, { id: "E", dur: 3, after: ["D"] }, { id: "F", dur: 5, after: ["D"] },
  { id: "G", dur: 4, after: ["E", "F"] }, { id: "H", dur: 2, after: ["G"] },
];
const r1 = cpa(ex1);
console.log(table(["Activity", "Description", "Duration (days)", "Follows"], [
  ["A", "Clear the site", 3, "-"], ["B", "Lay foundations", 4, "A"], ["C", "Order materials", 2, "-"], ["D", "Build walls", 6, "B, C"],
  ["E", "Fit electrics", 3, "D"], ["F", "Put on roof", 5, "D"], ["G", "Plaster inside", 4, "E, F"], ["H", "Paint", 2, "G"],
].map(r=>r.map(x=>typeof x==="number"?String(x):x)), ["l","l","r","l"]));
console.log(cpaTable(r1)); console.log(r1.duration, r1.critical);
// example 2 arcs with dummy
const arcs = [
  { id: "A", from: 1, to: 2, dur: 4 }, { id: "B", from: 1, to: 3, dur: 6 }, { id: "C", from: 2, to: 4, dur: 5 },
  { id: "D", from: 3, to: 4, dur: 3 }, { id: "X1", from: 2, to: 3, dur: 0 }, { id: "E", from: 3, to: 5, dur: 7 }, { id: "F", from: 4, to: 5, dur: 2 },
];
const r2n = cpaNodes(arcs); console.log(cpaTable(r2n)); console.log(r2n.nodes, r2n.duration, r2n.critical);
console.log(table(["Node", "Earliest start time (EST)", "Latest finish time (LFT)"], r2n.nodes.map(n=>[String(n.node),String(n.est),String(n.lft)])));
console.log(table(["Activity", "Duration (days)", "Follows"], [["A","4","-"],["B","6","-"],["C","5","A"],["D","3","B and A (dummy)"],["E","7","B, and A through the dummy"],["F","2","C, D"]],["l","r","l"]));
