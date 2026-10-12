import { mdTable, codeBlock, pyBlock, chk, same, bubbleSort, linearSearch } from "../lib.mjs";
import { arrayMd } from "./w4a-util.mjs";

const data = [34, 12, 27, 9, 41, 18];
const lsPseudo = `DECLARE Data : ARRAY[1:6] OF INTEGER
DECLARE Target, Index : INTEGER
DECLARE Found : BOOLEAN
INPUT Target
Found ← FALSE
Index ← 1
WHILE Found = FALSE AND Index <= 6 DO
    IF Data[Index] = Target THEN
        Found ← TRUE
    ELSE
        Index ← Index + 1
    ENDIF
ENDWHILE
IF Found = TRUE THEN
    OUTPUT "Found at position ", Index
ELSE
    OUTPUT "Not found"
ENDIF`;
const lsPy = `data = [34, 12, 27, 9, 41, 18]
target = int(input())
found = False
index = 0
while not found and index < len(data):
    if data[index] == target:
        found = True
    else:
        index = index + 1
if found:
    print("Found at position", index + 1)
else:
    print("Not found")`;
const r41 = pyBlock(lsPy, "41\n");
const r50 = pyBlock(lsPy, "50\n");
same(r41.text, "Found at position 5"); same(r50.text, "Not found");
const s41 = linearSearch(data, 41), s50 = linearSearch(data, 50);
chk(s41.comparisons, 5); chk(s50.comparisons, 6);
const searchTable = mdTable(["Target", "Result", "Comparisons made"], [[41, "found at position 5", s41.comparisons], [34, "found at position 1", linearSearch(data, 34).comparisons], [18, "found at position 6", linearSearch(data, 18).comparisons], [50, "not found", s50.comparisons]]);

const bsPseudo = `DECLARE Data : ARRAY[1:6] OF INTEGER
DECLARE Pass, Index, Temp : INTEGER
DECLARE Swapped : BOOLEAN
Pass ← 1
REPEAT
    Swapped ← FALSE
    FOR Index ← 1 TO 6 - Pass
        IF Data[Index] > Data[Index + 1] THEN
            Temp ← Data[Index]
            Data[Index] ← Data[Index + 1]
            Data[Index + 1] ← Temp
            Swapped ← TRUE
        ENDIF
    NEXT Index
    Pass ← Pass + 1
UNTIL Swapped = FALSE OR Pass = 6`;
const bs = bubbleSort(data);
const bsPy = `data = [34, 12, 27, 9, 41, 18]
n = len(data)
passes = 0
swapped = True
while swapped and passes < n - 1:
    swapped = False
    for i in range(n - 1 - passes):
        if data[i] > data[i + 1]:
            temp = data[i]
            data[i] = data[i + 1]
            data[i + 1] = temp
            swapped = True
    passes = passes + 1
print(data)
print(passes)`;
const bsRun = pyBlock(bsPy);
same(bsRun.text, `[9, 12, 18, 27, 34, 41]\n${bs.passes.length}`);
const passRows = [["start", data.join(", "), "", ""], ...bs.passes.map((p) => [p.pass, p.state.join(", "), p.comparisons, p.swaps])];
const passTable = mdTable(["Pass", "Array after the pass", "Comparisons", "Swaps"], passRows);
const totals = `${bs.comparisons} comparisons and ${bs.swaps} swaps in ${bs.passes.length} passes`;
// effect of initial order
const orders = [["already sorted", [9, 12, 18, 27, 34, 41]], ["reverse order", [41, 34, 27, 18, 12, 9]], ["the data above", data]];
const orderRows = orders.map(([name, arr]) => { const r = bubbleSort(arr); return [name, arr.join(", "), r.passes.length, r.comparisons, r.swaps]; });
const orderTable = mdTable(["Starting order", "Array", "Passes", "Comparisons", "Swaps"], orderRows);
chk(orderRows[0][3], 5); chk(orderRows[0][4], 0); chk(orderRows[1][3], 15); chk(orderRows[1][4], 15);
const notImproved = bubbleSort(data, { improved: false });
chk(notImproved.comparisons, 15);

export const snips = {
  dataTable: arrayMd(data, { name: "Data" }),
  lsPseudo: codeBlock(lsPseudo), lsPy: r41.code, lsOut41: r41.output, lsOut50: codeBlock(r50.text), searchTable,
  bsPseudo: codeBlock(bsPseudo), bsPy: bsRun.code, bsOut: bsRun.output, passTable, totals, orderTable,
  nPasses: bs.passes.length, nComp: bs.comparisons, nSwaps: bs.swaps,
};
if (process.argv[1].endsWith("w4a-linear-search-bubble-sort.mjs")) console.log(Object.values(snips).join("\n\n"));
