// Self-test of the helpers in lib.mjs (known textbook results). Run from the repo root:
//   node --no-warnings .scratch/computer-science-a/selftest.mjs
// Prints "OK n checks" when every helper still gives the expected value. Writers never edit this file.
import assert from "node:assert/strict";
import * as L from "./lib.mjs";

let n = 0;
const eq = (a, b, msg) => {
  assert.deepEqual(a, b, msg);
  n++;
};

// Binary integers
eq(L.toBase(255, 2, 8), "11111111");
eq(L.twos(-5, 8), "11111011");
eq(L.negateTwos("00000101"), "11111011");
eq(L.onesComp("00101101"), "11010010");
eq(L.addTwos("01111111", "00000001").overflow, true);
eq(L.addTwos("11111110", "00000001").value, -1);
eq(L.subTwos("00001010", "00000111").value, 3);
eq(L.binaryMultiply(13, 5).productBin, "1000001");
eq(L.bcd(259), "0010 0101 1001");
eq(L.fromBcd("0010 0101 1001"), 259);
eq(L.fracToBinary(0.5, 4).bits, "1000");
eq(L.fracToBinary(0.1, 8).bits, "00011001");

// Floating point (8-bit mantissa, 4-bit exponent)
eq(L.fpDecode("01101000", "0011"), 6.5);
eq(L.fpEncode(6.5, 8, 4).mant, "01101000");
eq(L.fpEncode(6.5, 8, 4).exp, "0011");
eq(L.fpDecode("10011000", "0011"), -6.5);
eq(L.fpEncode(-6.5, 8, 4).mant, "10011000");
eq(L.fpEncode(-0.5, 8, 4).mant, "10000000");
eq(L.fpEncode(-0.5, 8, 4).exp, "1111");
eq(L.fpNormalise("00011010", "0100"), { mant: "01101000", exp: "0010", shifts: 2 });
eq(L.fpNormalise("11100100", "0011").mant, "10010000");
assert.throws(() => L.fpEncode(0.1, 8, 4));
eq(L.fpEncode(0.1, 8, 4, { approx: true }).mant, "01100110");
eq(L.fpRange(8, 4).maxPositive, (1 - 1 / 128) * 128);
assert.throws(() => L.fpEncode(1e6, 8, 4));

// Sizes
eq(L.bitmapBits(1024, 768, 24) / 8, 2359296);
eq(L.bytesTo(L.bitmapBits(1024, 768, 24) / 8, "MiB"), 2.25);
eq(L.soundBits(44100, 16, 60, 2) / 8, 10584000);
eq(L.depthFor(256), 8);
eq(L.rleText(L.rle("WWWBBW".split(""))), "3W2B1W");

// Integrity and hashing
eq(L.parityBit("1011001", "even"), "0");
eq(L.parityBit("1011000", "even"), "1");
eq(L.mod11CheckDigit("030640615").check, "2");
eq(L.checksum8([200, 100, 50]), 94);
eq(L.hashMod("AB", 10), 1);
eq(L.caesar("HELLO", 3), "KHOOR");
eq(L.caesar("KHOOR", -3), "HELLO");
eq(L.modPow(4, 13, 497), 445);

// Networking
eq(L.subnet("192.168.1.130", 26), { mask: "255.255.255.192", network: "192.168.1.128", broadcast: "192.168.1.191", first: "192.168.1.129", last: "192.168.1.190", hosts: 62, addresses: 64 });
eq(L.ipBinary("192.168.1.10"), "11000000.10101000.00000001.00001010");
eq(L.ipv6Abbrev("2001:0db8:0000:0000:0000:ff00:0042:8329"), "2001:db8::ff00:42:8329");

// Scheduling and paging
const P4 = [{ id: "P1", arrival: 0, burst: 5 }, { id: "P2", arrival: 1, burst: 3 }, { id: "P3", arrival: 2, burst: 8 }, { id: "P4", arrival: 3, burst: 6 }];
eq(L.schedule(P4, "FCFS").table.map((r) => r.waiting), [0, 4, 6, 13]);
eq(L.schedule(P4, "SJF").table.map((r) => r.completion), [5, 8, 22, 14]);
const P3q = [{ id: "P1", arrival: 0, burst: 5 }, { id: "P2", arrival: 1, burst: 3 }, { id: "P3", arrival: 2, burst: 1 }];
eq(L.schedule(P3q, "RR", 2).table.map((r) => r.completion), [9, 8, 5]);
eq(L.schedule(P3q, "SRT").table.map((r) => r.completion), [9, 5, 3]);
const refs = [7, 0, 1, 2, 0, 3, 0, 4, 2, 3, 0, 3, 2, 1, 2, 0, 1, 7, 0, 1];
eq(L.pageReplace(refs, 3, "FIFO").faults, 15);
eq(L.pageReplace(refs, 3, "LRU").faults, 12);
eq(L.pageReplace(refs, 3, "OPT").faults, 9);

// Assembly (sum 1..5 with a loop)
const prog = [
  "      LDM #0",
  "      STO Total",
  "      LDM #1",
  "      STO Count",
  "LOOP: LDD Total",
  "      ADD Count",
  "      STO Total",
  "      LDD Count",
  "      INC ACC",
  "      STO Count",
  "      CMP #6",
  "      JPN LOOP",
  "      LDD Total",
  "      END",
  "Total: 0",
  "Count: 0",
];
const r = L.runAsm(prog, { watch: ["Total", "Count"] });
eq(r.acc, 15);
eq(r.mem[r.labels.Total], 15);
eq(r.trace[r.trace.length - 1].text, "END");
eq(L.runAsm(["IN", "ADD #1", "OUT", "END"], { input: "A" }).output, "B");
eq(L.runAsm(["LDM B00001111", "LSL #2", "XOR &FF", "END"]).acc, 0b11000011);
eq(L.runAsm(["LDR #2", "LDX Arr", "END", "Arr: 5", "6", "7"]).acc, 7);
eq(L.runAsm(["LDI Ptr", "END", "Ptr: 203", "9"], {}).acc, 9);
eq(L.asmTraceMd(r, { watch: ["Total"] }).split("\n")[0], "| Address | Instruction | ACC | IX | Total |");

// Searching and sorting
eq(L.bubbleSort([5, 1, 4, 2, 8]).sorted, [1, 2, 4, 5, 8]);
eq(L.bubbleSort([5, 1, 4, 2, 8]).swaps, 4);
eq(L.bubbleSort([1, 2, 3], { improved: true }).passes.length, 1);
eq(L.insertionSort([5, 1, 4, 2, 8]).sorted, [1, 2, 4, 5, 8]);
eq(L.quickSort([9, 3, 7, 1, 8, 2]).sorted, [1, 2, 3, 7, 8, 9]);
eq(L.binarySearch([2, 4, 6, 8, 10, 12, 14], 12).steps.map((s) => s.mid), [3, 5]);
eq(L.linearSearch([4, 8, 15], 15).comparisons, 3);
eq(L.toRpn(["3", "+", "4", "*", "2"]), ["3", "4", "2", "*", "+"]);
eq(L.toRpn(["(", "3", "+", "4", ")", "*", "2"]), ["3", "4", "+", "2", "*"]);
eq(L.evalRpn(["3", "4", "+", "2", "*"]).value, 14);

// Trees and graphs
const tree = L.bstFrom([50, 30, 70, 20, 40, 60, 80]);
eq(L.inorder(tree), [20, 30, 40, 50, 60, 70, 80]);
eq(L.preorder(tree), [50, 30, 20, 40, 70, 60, 80]);
eq(L.postorder(tree), [20, 40, 30, 60, 80, 70, 50]);
eq(L.inorder(L.bstDelete(L.bstFrom([50, 30, 70, 20, 40]), 30)), [20, 40, 50, 70]);
eq(L.bstTable([50, 30, 70]).map((x) => [x.left, x.right]), [[2, 3], [0, 0], [0, 0]]);
const G = { A: { B: 4, C: 2 }, B: { A: 4, C: 1, D: 5 }, C: { A: 2, B: 1, D: 8 }, D: { B: 5, C: 8 } };
const dj = L.dijkstra(G, "A");
eq(dj.dist, { A: 0, B: 3, C: 2, D: 8 });
eq(L.pathTo(dj.prev, "A", "D"), ["A", "C", "B", "D"]);
eq(L.aStar(G, "A", "D", { A: 6, B: 4, C: 5, D: 0 }).cost, 8);

// Logic
eq(L.minimise(["A", "B", "C"], [1, 3, 5, 7]).expression, "C");
eq(L.minimise(["A", "B"], [1, 2, 3]).expression, "A OR B");
eq(L.minimise(["A", "B", "C"], [3, 5, 6, 7]).terms.length, 3);
eq(L.equivalent(["A", "B"], (a, b) => L.L.nand(a, b), (a, b) => L.L.or(L.L.not(a), L.L.not(b))), true);
eq(L.kmapMd(["A", "B"], (a, b) => L.L.and(a, b)).split("\n").length, 4);
eq(L.L.xnor(1, 1), 1);

// Misc
eq(L.leastSquares([1, 2, 3], [2, 4, 6]), { slope: 2, intercept: 0 });
eq(L.parallelR(100, 100), 50);

// Real code
eq(L.py("print(2 + 3)"), "5");
eq(L.py("n = int(input())\nprint(n * 2)", "21\n"), "42");
eq(L.sql("CREATE TABLE T (a INTEGER, b TEXT); INSERT INTO T VALUES (1,'x'),(2,'y');", "SELECT b FROM T WHERE a = 2").rows, [["y"]]);
eq(L.sql("CREATE TABLE T (a INTEGER); INSERT INTO T VALUES (1),(2),(3);", "SELECT SUM(a) AS total FROM T").md.split("\n")[2], "| 6 |");

// Builders: a small module with a bits item, a truth item and an exam item
const m = L.concept("acs.data.number-bases", { file: "data/selftest", keyPrefix: "data.selftest" }, (b) => {
  b.bits({ stem: "Write 37 in 8-bit binary.", value: 37, width: 8, d: 1, explanation: "37 = 32 + 4 + 1." });
  b.truth({ stem: "Complete the truth table for X = A AND B.", inputs: ["A", "B"], fn: (a, c) => L.L.and(a, c), d: 2, explanation: "AND is 1 only when both inputs are 1.", marks: 4 });
  b.struct({
    stem: "Exam style item.",
    d: 4,
    hints: ["h"],
    examStyle: true,
    skill: L.EXAM.THEORY10.skill,
    secs: L.EXAM.THEORY10.secs,
    explanation: "x",
    parts: L.checkExam(L.EXAM.THEORY10, [
      L.P.num({ label: "(a)", marks: 4, stem: "2 + 2", value: 4, explanation: "four" }),
      L.P.group({ label: "(b)", stem: "Convert.", parts: [L.P.bits({ label: "(i)", marks: 3, stem: "13 in binary", value: 13, acceptUnpadded: true }), L.P.short({ label: "(ii)", marks: 3, stem: "Name the base", accepted: ["binary"] })] }),
    ]),
  });
  assert.throws(() => b.struct({ stem: "bad", d: 3, hints: ["h"], skill: "ANALYSIS", explanation: "x", parts: [L.P.num({ label: "(a)", marks: 10, stem: "s", value: 1, explanation: "e" })] }));
});
eq(m.questions.length, 3);
eq(m.questions[2].marks, 10);

console.log(`OK ${n} checks`);
