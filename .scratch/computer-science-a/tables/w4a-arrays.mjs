import { mdTable, codeBlock, pyBlock, chk, same, round } from "../lib.mjs";
import { arrayMd } from "./w4a-util.mjs";

const marks = [56, 71, 48, 90, 63, 39, 77, 82];
const total = marks.reduce((a, b) => a + b, 0), avg = total / marks.length;
const maxV = Math.max(...marks), maxI = marks.indexOf(maxV) + 1;
const pass = marks.filter((m) => m >= 50).length;
chk(total, 526); chk(avg, 65.75); chk(maxV, 90); chk(maxI, 4); chk(pass, 6);
const above = marks.filter((m) => m > avg).length; chk(above, 4);
const oneD = `DECLARE Marks : ARRAY[1:8] OF INTEGER
DECLARE Index, Total, Largest, Position, Passes : INTEGER
DECLARE Average : REAL
// Marks[1] to Marks[8] have already been filled
Total ← 0
Largest ← Marks[1]
Position ← 1
Passes ← 0
FOR Index ← 1 TO 8
    Total ← Total + Marks[Index]
    IF Marks[Index] > Largest THEN
        Largest ← Marks[Index]
        Position ← Index
    ENDIF
    IF Marks[Index] >= 50 THEN
        Passes ← Passes + 1
    ENDIF
NEXT Index
Average ← Total / 8
OUTPUT "Total ", Total
OUTPUT "Average ", Average
OUTPUT "Highest ", Largest, " at position ", Position
OUTPUT "Passes ", Passes`;
const oneDpy = `marks = [56, 71, 48, 90, 63, 39, 77, 82]
total = 0
largest = marks[0]
position = 1
passes = 0
for index in range(8):
    total = total + marks[index]
    if marks[index] > largest:
        largest = marks[index]
        position = index + 1
    if marks[index] >= 50:
        passes = passes + 1
print("Total", total)
print("Average", total / 8)
print("Highest", largest, "at position", position)
print("Passes", passes)`;
const run1 = pyBlock(oneDpy);
same(run1.text, "Total 526\nAverage 65.75\nHighest 90 at position 4\nPasses 6");

// 2D
const pupils = ["Tendai", "Rudo", "Farai"], subjects = ["Maths", "English", "Science", "History"];
const grid = [[62, 55, 71, 48], [80, 67, 59, 73], [45, 52, 38, 61]];
const rowT = grid.map((r) => r.reduce((a, b) => a + b, 0));
const colT = subjects.map((_, c) => grid.reduce((a, r) => a + r[c], 0));
same(rowT, [236, 279, 196]); same(colT, [187, 174, 168, 182]);
const gridMd = mdTable(["", ...subjects.map((s, i) => `Column ${i + 1}: ${s}`)], grid.map((r, i) => [`Row ${i + 1}: ${pupils[i]}`, ...r]));
const twoD = `DECLARE Scores : ARRAY[1:3, 1:4] OF INTEGER
DECLARE Row, Col, RowTotal : INTEGER
// Scores has already been filled
FOR Row ← 1 TO 3
    RowTotal ← 0
    FOR Col ← 1 TO 4
        RowTotal ← RowTotal + Scores[Row, Col]
    NEXT Col
    OUTPUT "Row ", Row, " total ", RowTotal
NEXT Row`;
const twoDpy = `scores = [[62, 55, 71, 48], [80, 67, 59, 73], [45, 52, 38, 61]]
for row in range(3):
    row_total = 0
    for col in range(4):
        row_total = row_total + scores[row][col]
    print("Row", row + 1, "total", row_total)
col_totals = []
for col in range(4):
    column_sum = 0
    for row in range(3):
        column_sum = column_sum + scores[row][col]
    col_totals.append(column_sum)
print(col_totals)
print(scores[1][2])`;
const run2 = pyBlock(twoDpy);
same(run2.text, "Row 1 total 236\nRow 2 total 279\nRow 3 total 196\n[187, 174, 168, 182]\n59");
chk(grid[1][2], 59);
const declTable = mdTable(["Pseudocode", "Python"], [
  ["`DECLARE Marks : ARRAY[1:8] OF INTEGER`", "`marks = [0] * 8`"],
  ["`Marks[3] ← 48`", "`marks[2] = 48`"],
  ["`DECLARE Scores : ARRAY[1:3, 1:4] OF INTEGER`", "`scores = [[0] * 4 for row in range(3)]`"],
  ["`Scores[2, 3] ← 59`", "`scores[1][2] = 59`"],
]);
const initPy = pyBlock(`marks = [0] * 8
scores = [[0] * 4 for row in range(3)]
scores[1][2] = 59
print(marks)
print(scores)`);
same(initPy.text, "[0, 0, 0, 0, 0, 0, 0, 0]\n[[0, 0, 0, 0], [0, 0, 59, 0], [0, 0, 0, 0]]");
export const snips = { dataTable: arrayMd(marks, { name: "Marks" }), oneD: codeBlock(oneD), oneDpy: run1.code, oneDout: run1.output, gridMd, twoD: codeBlock(twoD), twoDpy: run2.code, twoDout: run2.output, declTable, initPy: initPy.code, initOut: initPy.output };
if (process.argv[1].endsWith("w4a-arrays.mjs")) console.log(Object.values(snips).join("\n\n"));
