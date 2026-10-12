import { py, pyBlock, mdTable, chk, same, traceTable, codeBlock } from "../lib.mjs";
// break-even between compiling once and interpreting every time (invented figures for a teaching example)
const compile = 12, runC = 0.4, runI = 3;
const n = Math.ceil(compile / (runI - runC));
chk(n, 5);
const rows = [1, 2, 3, 4, 5, 6].map((k) => [k, +(compile + runC * k).toFixed(1), +(runI * k).toFixed(1), compile + runC * k < runI * k ? "compiled" : "interpreted"]);
same(rows.map((r) => r[3]), ["interpreted", "interpreted", "interpreted", "interpreted", "compiled", "compiled"]);
const breakTable = mdTable(["Runs", "Compile once, then run (s)", "Interpret each time (s)", "Faster overall"], rows);
// single-stepping a loop
const pseudo = codeBlock("Total ← 0\nFOR Count ← 1 TO 4\n    Total ← Total + Count * Count\nNEXT Count\nOUTPUT Total");
const py1 = pyBlock("total = 0\nfor count in range(1, 5):\n    total = total + count * count\nprint(total)");
same(py1.text, "30");
const watch = traceTable(["Count", "Total"], { Count: 0, Total: 0 }, (s) => { if (s.Count === 4) return null; s.Count++; s.Total += s.Count * s.Count; return s; }, { showUnchanged: true });
same(watch.rows.map((r) => r[1]), ["0", "1", "5", "14", "30"]);
// a pretty-printed example of a collapsed block is described in words
export const snips = { breakTable, n: String(n), pseudo, pyCode: py1.code, pyOut: py1.output, watch: watch.md.replace(/\| Count \| Total \|/, "| Count | Total |") };
if (process.argv[1].endsWith("w2a-translators-ide.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
