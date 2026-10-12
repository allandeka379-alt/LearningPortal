import { mdTable, codeBlock, pyBlock, chk, same, truthRows, L } from "../lib.mjs";

// Worked example 1: average mark and result for one pupil (five marks)
const marks = [62, 48, 71, 55, 39];
const total = marks.reduce((a, b) => a + b, 0);
const average = total / marks.length;
chk(total, 275); chk(average, 55);
const result = average >= 50 ? "Pass" : "Fail";
const pseudo = `DECLARE Total, Mark, Count : INTEGER
DECLARE Average : REAL
Total ← 0
FOR Count ← 1 TO 5
    INPUT Mark
    Total ← Total + Mark
NEXT Count
Average ← Total / 5
OUTPUT "Average is ", Average
IF Average >= 50 THEN
    OUTPUT "Pass"
ELSE
    OUTPUT "Fail"
ENDIF`;
const pyCode = `total = 0
for count in range(1, 6):
    mark = int(input())
    total = total + mark
average = total / 5
print("Average is", average)
if average >= 50:
    print("Pass")
else:
    print("Fail")`;
const run = pyBlock(pyCode, marks.join("\n") + "\n");
same(run.text, `Average is 55.0\nPass`);
const idTable = mdTable(["Identifier", "Data type", "Purpose"], [["Total", "INTEGER", "running total of the marks"], ["Mark", "INTEGER", "the mark just entered"], ["Count", "INTEGER", "loop counter, 1 to 5"], ["Average", "REAL", "total divided by 5"]]);

// Worked example 2: flowchart to pseudocode (count positive numbers until 0)
const data = [4, -2, 7, 0];
let count = 0;
for (const n of data) { if (n === 0) break; if (n > 0) count++; }
chk(count, 2);
const flow = mdTable(["Box", "Shape", "Text", "Next box"], [
  [1, "Start", "Start", 2],
  [2, "Process", "`Count ← 0`", 3],
  [3, "Input", "`INPUT Number`", 4],
  [4, "Decision", "`Number = 0`?", "Yes → 7, No → 5"],
  [5, "Decision", "`Number > 0`?", "Yes → 6, No → 3"],
  [6, "Process", "`Count ← Count + 1`", 3],
  [7, "Output", "`OUTPUT Count`", 8],
  [8, "End", "End", "none"],
]);
const flowPseudo = `Count ← 0
REPEAT
    INPUT Number
    IF Number > 0 THEN
        Count ← Count + 1
    ENDIF
UNTIL Number = 0
OUTPUT Count`;
// logic statement: bus pass
const passRows = truthRows(["Far", "Boarder"], (f, bd) => L.and(f, L.not(bd)));
const passTable = mdTable(["Far", "Boarder", "Far AND NOT Boarder"], passRows.map((r) => [...r.vals, r.out]));
same(passRows.map((r) => r.out), [0, 0, 1, 0]);
// refinement levels
export const snips = { pseudo: codeBlock(pseudo), pyCode: run.code, pyOut: run.output, idTable, flow, flowPseudo: codeBlock(flowPseudo), passTable, total: total, average: average, marksList: marks.join(", "), count };
if (process.argv[1].endsWith("w4a-algorithm-design.mjs")) console.log(Object.values(snips).join("\n\n"));
