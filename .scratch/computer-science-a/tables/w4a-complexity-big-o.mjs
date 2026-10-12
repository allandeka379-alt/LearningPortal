import { mdTable, codeBlock, pyBlock, chk, same } from "../lib.mjs";

const fmt = (x) => (typeof x === "bigint" ? x.toString() : Number.isInteger(x) ? String(x) : x.toFixed(1)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// growth table with exact values
const ns = [4, 8, 16, 32, 64];
const growthRows = ns.map((n) => [n, Math.log2(n), n * Math.log2(n), n * n, 2n ** BigInt(n)]);
chk(growthRows[2][2], 64); chk(growthRows[3][4] === 4294967296n ? 1 : 0, 1);
const growthTable = mdTable(["n", "log₂ n", "n × log₂ n", "n²", "2ⁿ"], growthRows.map((r) => [r[0], r[1], r[2], fmt(r[3]), fmt(r[4])]));

// instrumented fragments
const A = (n) => { let c = 0; for (let i = 1; i <= n; i++) c++; return c; };
const B = (n) => { let c = 0; for (let r = 1; r <= n; r++) for (let k = 1; k <= n; k++) c++; return c; };
const C = (n) => { let c = 0; while (n > 1) { n = Math.floor(n / 2); c++; } return c; };
const D = (n) => { let c = 0; for (let r = 1; r <= n; r++) for (let k = 1; k <= r; k++) c++; return c; };
const sizes = [8, 16, 32, 64];
const opsTable = mdTable(["n", "Fragment 1 (one loop)", "Fragment 2 (loop in loop)", "Fragment 3 (halving)", "Fragment 4 (inner limit is the outer variable)"], sizes.map((n) => [n, fmt(A(n)), fmt(B(n)), fmt(C(n)), fmt(D(n))]));
chk(A(64), 64); chk(B(64), 4096); chk(C(64), 6); chk(D(8), 36); chk(D(16), 136);
const frag1 = codeBlock(`FOR Index ← 1 TO N
    Total ← Total + Data[Index]
NEXT Index`);
const frag2 = codeBlock(`FOR Row ← 1 TO N
    FOR Col ← 1 TO N
        Count ← Count + 1
    NEXT Col
NEXT Row`);
const frag3 = codeBlock(`WHILE N > 1 DO
    N ← DIV(N, 2)
    Steps ← Steps + 1
ENDWHILE`);
const frag4 = codeBlock(`FOR Row ← 1 TO N
    FOR Col ← 1 TO Row
        Count ← Count + 1
    NEXT Col
NEXT Row`);

// crossing point of 50n and n^2
let cross = 0; for (let n = 1; n < 1000; n++) if (n * n > 50 * n) { cross = n; break; }
chk(cross, 51);
const crossRows = [10, 50, 51, 100].map((n) => [n, 50 * n, n * n, 50 * n < n * n ? "A" : n * n < 50 * n ? "B" : "equal"]);
const crossTable = mdTable(["n", "Algorithm A: 50 × n steps", "Algorithm B: n² steps", "Fewer steps"], crossRows.map(([n, a, b, w]) => [n, a, b, w === "A" ? "A" : w === "B" ? "B" : "equal"]));

// Fibonacci calls
const fibPy = `calls = 0

def fib(n):
    global calls
    calls = calls + 1
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

for n in (5, 10, 20):
    calls = 0
    result = fib(n)
    print(n, result, calls)`;
const fibRun = pyBlock(fibPy);
const fibC = (n) => (n <= 1 ? 1 : 1 + fibC(n - 1) + fibC(n - 2));
same(fibRun.text, [5, 10, 20].map((n) => { const f = (m) => (m <= 1 ? m : f(m - 1) + f(m - 2)); return `${n} ${f(n)} ${fibC(n)}`; }).join("\n"));
chk(fibC(10), 177);

const algoTable = mdTable(["Algorithm", "Best case", "Average case", "Worst case"], [
  ["Linear search", "O(1)", "O(n)", "O(n)"],
  ["Binary search", "O(1)", "O(log n)", "O(log n)"],
  ["Bubble sort (with a swap flag)", "O(n)", "O(n²)", "O(n²)"],
  ["Insertion sort", "O(n)", "O(n²)", "O(n²)"],
  ["Quick sort (good pivot)", "O(n log n)", "O(n log n)", "O(n²)"],
]);
export const snips = { growthTable, opsTable, frag1, frag2, frag3, frag4, crossTable, fibPy: fibRun.code, fibOut: fibRun.output, algoTable, cross };
if (process.argv[1].endsWith("w4a-complexity-big-o.mjs")) console.log(Object.values(snips).join("\n\n"));
