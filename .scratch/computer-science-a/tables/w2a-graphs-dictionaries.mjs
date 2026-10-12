import { pyBlock, mdTable, chk, same, codeBlock, hashMod } from "../lib.mjs";
import { adjacency, matrixMd, listMd, hashProbe, hashChain, slotsMd, chainMd, stackTrace, queueTrace } from "./w2a-adt.mjs";
const nodes = ["A", "B", "C", "D", "E"];
const edges = [["A", "B", 4], ["A", "C", 2], ["B", "D", 5], ["C", "D", 8], ["D", "E", 3]];
const { m, list } = adjacency(nodes, edges);
chk(m[0][1], 4); chk(m[1][0], 4); chk(m[0][3], 0);
const dEdges = [["A", "B", 4], ["B", "D", 5], ["C", "A", 2], ["D", "E", 3]];
const dir = adjacency(nodes, dEdges, true);
chk(dir.m[0][2], 0); chk(dir.m[2][0], 2);
const cells = nodes.length * nodes.length; chk(cells, 25);
const entries = edges.length * 2; chk(entries, 10);
const keys = ["Tendai", "Rudo", "Farai", "Chipo", "Nyasha"];
const hashRows = mdTable(["Key", "Sum of ASCII codes", "Sum MOD 7 (index)"], keys.map((k) => [k, [...k].reduce((a, c) => a + c.charCodeAt(0), 0), hashMod(k, 7)]));
const probe = hashProbe(keys, 7); const chain = hashChain(keys, 7);
same(probe.steps.map((s) => s.slot), [2, 4, 0, 3, 5]);
same(probe.steps.map((s) => s.probes), [1, 1, 1, 2, 3]);
const py1 = pyBlock(`marks = {"Tendai": 62, "Rudo": 78}
marks["Farai"] = 55
print(marks["Rudo"])
print("Chipo" in marks)
del marks["Tendai"]
for name in marks:
    print(name, marks[name])
print(len(marks))`);
same(py1.text, "78\nFalse\nRudo 78\nFarai 55\n2");
const stack = stackTrace([["push", 7], ["push", 3], ["push", 9], ["pop"], ["push", 4]], 5);
same(stack.map((r) => r[1]), [0, 1, 2, 1, 2]);
const queue = queueTrace([["enqueue", 5], ["enqueue", 8], ["dequeue"], ["enqueue", 2], ["dequeue"]]);
same(queue.map((r) => r[3]), ["5 → null", "5 → 8 → null", "8 → null", "8 → 2 → null", "2 → null"]);
export const snips = {
  matrix: matrixMd(nodes, m), list: listMd(nodes, list), dMatrix: matrixMd(nodes, dir.m), dList: listMd(nodes, dir.list),
  cells: String(cells), entries: String(entries), hashRows, probe: slotsMd(probe.t), chain: chainMd(chain),
  pyCode: py1.code, pyOut: py1.output, edgesList: mdTable(["Edge", "Weight"], edges.map(([a, b, w]) => [`${a} – ${b}`, w])),
  stack: mdTable(["Operation", "Top pointer", "Array contents (index 0 to 4)"], stack),
  queue: mdTable(["Operation", "Head", "Tail", "Linked list"], queue),
};
if (process.argv[1].endsWith("w2a-graphs-dictionaries.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
