// Lesson tables for asm.assembly-programs (every program is run with runAsm; every trace comes from the run).
import { runAsm, asmTraceMd, asmListingMd, mdTable, chk, same, codeBlock } from "../lib.mjs";
const block = (lines) => codeBlock(lines.join("\n"));
// Program 1: sum of four marks with the index register (base 300)
export const sumSrc = ["Start: LDR #0", "LDM #0", "STO Total", "Next: LDX Marks", "ADD Total", "STO Total", "INC IX", "LDD Left", "DEC ACC", "STO Left", "CMP #0", "JPN Next", "END", "Marks: 12", "7", "20", "5", "Left: 4", "Total: 0"];
export const sum = runAsm(sumSrc, { base: 300, watch: ["Total", "Left"] });
chk(sum.mem[sum.labels.Total], 44);
chk(sum.labels.Marks, 313); chk(sum.labels.Left, 317); chk(sum.labels.Total, 318);
// Program 2: print A to E (base 400)
export const abcSrc = ["LDM #65", "Again: OUT", "INC ACC", "CMP #70", "JPN Again", "END"];
export const abc = runAsm(abcSrc, { base: 400 });
same(abc.output, "ABCDE");
// Program 3: search a table for a target (base 500)
export const findSrc = ["LDR #0", "Next: LDX List", "CMP Target", "JPE Found", "INC IX", "LDD Left", "DEC ACC", "STO Left", "CMP #0", "JPN Next", "JMP Done", "Found: LDM #1", "STO Result", "Done: END", "List: 31", "18", "44", "27", "Left: 4", "Target: 44", "Result: 0"];
export const find = runAsm(findSrc, { base: 500, watch: ["Result"] });
chk(find.mem[find.labels.Result], 1);
const findMiss = runAsm(findSrc.map((l) => (l === "Target: 44" ? "Target: 50" : l)), { base: 500 });
chk(findMiss.mem[findMiss.labels.Result], 0);
const list = (src, base) => block(src.map((l, i) => `${String(base + i).padEnd(5)}${/^\s*\w+:/.test(l) || /^[A-Z]/.test(l) || /^\d/.test(l) ? l : l}`));
const codeAt = (src, base) => block(src.map((l, i) => `${base + i}  ${l}`));
const passes = mdTable(["Pass", "Value loaded (ACC after `LDX Marks`)", "Total after the pass", "IX after the pass", "Left after the pass"], sum.trace.filter((t) => t.addr === 311).map((t, i) => [i + 1, sum.trace.filter((x) => x.addr === 303)[i].acc, t.mem[sum.labels.Total], t.ix, t.mem[sum.labels.Left]]));
const cmpRows = find.trace.filter((t) => t.addr === 502);
const findPasses = mdTable(["Pass", "IX", "Value loaded (ACC)", "Flag after `CMP Target`"], cmpRows.map((t, i) => [i + 1, t.ix, t.acc, t.flag ? "TRUE" : "FALSE"]));
export const snips = {
  passes, findPasses,
  sumListing: codeAt(sumSrc, 300),
  sumTrace: asmTraceMd(sum, { watch: ["Total", "Left"], ix: true }).split("\n").slice(0, 2 + 13).join("\n"),
  sumFull: asmTraceMd(sum, { watch: ["Total", "Left"] }),
  sumSteps: String(sum.steps),
  abcListing: codeAt(abcSrc, 400),
  abcTrace: asmTraceMd(abc, { ix: false, flag: true }),
  findListing: codeAt(findSrc, 500),
  findSteps: String(find.steps),
  findTrace: asmTraceMd(find, { watch: ["Result"], flag: true }),
};
if (process.argv[1].endsWith("w2a-assembly-programs.mjs")) { for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`); }
