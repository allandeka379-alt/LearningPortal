import { mdTable, codeBlock, pyBlock, chk, same, insertionSort, binarySearch } from "../lib.mjs";
import { arrayMd, bsearch1, Trace } from "./w4a-util.mjs";

const data = [5, 11, 14, 22, 27, 31, 38, 45, 52, 60, 71, 88];
const bsPseudo = `DECLARE Data : ARRAY[1:12] OF INTEGER   // in ascending order
DECLARE Low, High, Mid, Target : INTEGER
DECLARE Found : BOOLEAN
INPUT Target
Low ← 1
High ← 12
Found ← FALSE
WHILE Found = FALSE AND Low <= High DO
    Mid ← DIV(Low + High, 2)
    IF Data[Mid] = Target THEN
        Found ← TRUE
    ELSE
        IF Data[Mid] < Target THEN
            Low ← Mid + 1
        ELSE
            High ← Mid - 1
        ENDIF
    ENDIF
ENDWHILE
IF Found = TRUE THEN
    OUTPUT "Found at position ", Mid
ELSE
    OUTPUT "Not found"
ENDIF`;
const bsPy = `data = [5, 11, 14, 22, 27, 31, 38, 45, 52, 60, 71, 88]
target = int(input())
low = 0
high = len(data) - 1
found = False
while not found and low <= high:
    mid = (low + high) // 2
    if data[mid] == target:
        found = True
    elif data[mid] < target:
        low = mid + 1
    else:
        high = mid - 1
if found:
    print("Found at position", mid + 1)
else:
    print("Not found")`;
const r45 = pyBlock(bsPy, "45\n"), r30 = pyBlock(bsPy, "30\n");
same(r45.text, "Found at position 8"); same(r30.text, "Not found");
function traceOf(target) {
  const r = bsearch1(data, target);
  const t = new Trace(["Low", "High", "Mid", "Data[Mid]", "Found"]);
  r.steps.forEach((s, i) => t.row({ Low: s.low, High: s.high, Mid: s.mid, "Data[Mid]": s.value, Found: i === r.steps.length - 1 && r.found ? "TRUE" : "FALSE" }));
  return { r, md: mdTable(["Low", "High", "Mid", "Data[Mid]", "Compare with " + target], r.steps.map((s) => [s.low, s.high, s.mid, s.value, s.value === target ? "equal: found" : s.value < target ? "less: Low ← Mid + 1" : "greater: High ← Mid - 1"])) };
}
const t45 = traceOf(45), t30 = traceOf(30);
chk(t45.r.comparisons, 4); chk(t30.r.comparisons, 4);
// check against lib helper (0-based)
chk(binarySearch(data, 45).comparisons, 4); chk(binarySearch(data, 30).comparisons, 4);
t30.r.steps.forEach((s, i) => chk(s.mid, binarySearch(data, 30).steps[i].mid + 1));
// worst-case comparisons by size
const sizes = [12, 100, 1000, 1000000];
const worst = (n) => { let c = 0, lo = 1, hi = n; while (lo <= hi) { const m = Math.floor((lo + hi) / 2); c++; lo = m + 1; } return c; };
for (const n of sizes) chk(worst(n), Math.floor(Math.log2(n)) + 1);
const sizeTable = mdTable(["Items in the list", "Linear search, worst case", "Binary search, worst case"], sizes.map((n) => [n.toLocaleString("en-GB").replace(/,/g, " "), n.toLocaleString("en-GB").replace(/,/g, " "), worst(n)]));

const isPseudo = `DECLARE Data : ARRAY[1:6] OF INTEGER
DECLARE Index, Position, Key : INTEGER
FOR Index ← 2 TO 6
    Key ← Data[Index]
    Position ← Index - 1
    WHILE Position >= 1 AND Data[Position] > Key DO
        Data[Position + 1] ← Data[Position]
        Position ← Position - 1
    ENDWHILE
    Data[Position + 1] ← Key
NEXT Index`;
const isPy = `data = [34, 12, 27, 9, 41, 18]
for index in range(1, len(data)):
    key = data[index]
    position = index - 1
    while position >= 0 and data[position] > key:
        data[position + 1] = data[position]
        position = position - 1
    data[position + 1] = key
print(data)`;
const isRun = pyBlock(isPy);
const arr = [34, 12, 27, 9, 41, 18];
const ins = insertionSort(arr);
same(isRun.text, `[${ins.sorted.join(", ")}]`);
const insTable = mdTable(["Pass", "Key", "Array after the pass", "Comparisons", "Shifts"], [["start", "", arr.join(", "), "", ""], ...ins.passes.map((p, i) => [i + 1, p.key, p.state.join(", "), p.comparisons, p.shifts])]);
const orders = [["already sorted", [9, 12, 18, 27, 34, 41]], ["reverse order", [41, 34, 27, 18, 12, 9]], ["the data above", arr]];
const orderRows = orders.map(([n, a]) => { const r = insertionSort(a); return [n, a.join(", "), r.comparisons, r.shifts]; });
const orderTable = mdTable(["Starting order", "Array", "Comparisons", "Shifts"], orderRows);
chk(orderRows[0][2], 5); chk(orderRows[0][3], 0); chk(orderRows[1][2], 15); chk(orderRows[1][3], 15);

export const snips = {
  dataTable: arrayMd(data, { name: "Data" }),
  bsPseudo: codeBlock(bsPseudo), bsPy: r45.code, out45: r45.output, out30: codeBlock(r30.text),
  trace45: t45.md, trace30: t30.md, c45: t45.r.comparisons, c30: t30.r.comparisons, sizeTable,
  isPseudo: codeBlock(isPseudo), isPy: isRun.code, isOut: isRun.output, insTable, orderTable, insComp: ins.comparisons, insShifts: ins.shifts,
};
if (process.argv[1].endsWith("w4a-binary-search-insertion-sort.mjs")) console.log(Object.values(snips).join("\n\n"));
