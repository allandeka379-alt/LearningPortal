import { mdTable, codeBlock, pyBlock, chk, same, quickSort, bubbleSort } from "../lib.mjs";

const data = [45, 12, 38, 7, 29, 51, 20, 33];
const pseudo = `DECLARE Data : ARRAY[1:8] OF INTEGER

FUNCTION Partition(Low : INTEGER, High : INTEGER) RETURNS INTEGER
    DECLARE Pivot, Boundary, Index, Temp : INTEGER
    Pivot ← Data[High]
    Boundary ← Low
    FOR Index ← Low TO High - 1
        IF Data[Index] < Pivot THEN
            Temp ← Data[Index]
            Data[Index] ← Data[Boundary]
            Data[Boundary] ← Temp
            Boundary ← Boundary + 1
        ENDIF
    NEXT Index
    Temp ← Data[Boundary]
    Data[Boundary] ← Data[High]
    Data[High] ← Temp
    RETURN Boundary
ENDFUNCTION

PROCEDURE QuickSort(Low : INTEGER, High : INTEGER)
    DECLARE P : INTEGER
    IF Low < High THEN
        P ← Partition(Low, High)
        CALL QuickSort(Low, P - 1)
        CALL QuickSort(P + 1, High)
    ENDIF
ENDPROCEDURE

CALL QuickSort(1, 8)`;
const py = `data = [45, 12, 38, 7, 29, 51, 20, 33]

def partition(low, high):
    pivot = data[high]
    boundary = low
    for index in range(low, high):
        if data[index] < pivot:
            data[index], data[boundary] = data[boundary], data[index]
            boundary = boundary + 1
    data[boundary], data[high] = data[high], data[boundary]
    return boundary

def quick_sort(low, high):
    if low < high:
        p = partition(low, high)
        quick_sort(low, p - 1)
        quick_sort(p + 1, high)

quick_sort(0, len(data) - 1)
print(data)`;
const run = pyBlock(py);
const qs = quickSort(data);
same(run.text, `[${qs.sorted.join(", ")}]`);
const steps = qs.steps;
const stepTable = mdTable(["Step", "Sub-list before", "Pivot", "Sub-list after partition", "Pivot position in the sub-list"], steps.map((s, i) => [i + 1, s.sub.join(", "), s.pivot, s.result.join(", "), s.pivotIndex + 1]));
const first = steps[0];
chk(first.pivot, 33);
// split of the first partition
const leftOf = first.result.slice(0, first.pivotIndex), rightOf = first.result.slice(first.pivotIndex + 1);
// orders table
const mk = (arr) => { const r = quickSort(arr); return { c: r.comparisons, b: bubbleSort(arr, { improved: false }).comparisons }; };
const sortedA = [7, 12, 20, 29, 33, 38, 45, 51], rev = [...sortedA].reverse();
const rows = [["a mixed order", data], ["already sorted", sortedA], ["reverse order", rev]].map(([n, a]) => [n, a.join(", "), mk(a).c, mk(a).b]);
chk(rows[1][2], 28); chk(rows[2][2], 28);
const ordersTable = mdTable(["Starting order", "Array", "Quick sort comparisons", "Simple bubble sort comparisons"], rows);
export const snips = {
  dataList: data.join(", "), pseudo: codeBlock(pseudo), py: run.code, out: run.output,
  stepTable, nSteps: steps.length, nComp: qs.comparisons,
  firstPivot: first.pivot, firstResult: first.result.join(", "), firstPos: first.pivotIndex + 1, leftOf: leftOf.join(", "), rightOf: rightOf.join(", "),
  ordersTable, mixedComp: rows[0][2],
};
if (process.argv[1].endsWith("w4a-quick-sort.mjs")) console.log(Object.values(snips).join("\n\n"));
