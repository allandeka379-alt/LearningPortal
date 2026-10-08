// Self-test of lib.mjs: builds sample items in memory and marks their model and wrong responses with the real marker.
// Run from the repo root: npx tsx --conditions=react-server .scratch/computer-science/selftest.ts  (writes nothing)
import { markResponse } from "../../src/server/marking/mark";
import { validateQuestionDefinition } from "../../src/lib/questions/validate";
import * as lib from "./lib.mjs";

const { P, concept, allModules, toBase, fromBase, twos, fromTwos, shift, addBinary, truthTableMd, traceTable, L, rle, group } = lib as any;
const eq = (a: unknown, b: unknown, m: string) => { if (JSON.stringify(a) !== JSON.stringify(b)) throw new Error(`${m}: ${JSON.stringify(a)} != ${JSON.stringify(b)}`); };
eq(toBase(45, 2, 8), "00101101", "toBase"); eq(toBase(255, 16), "FF", "hex"); eq(fromBase("1010 1100", 2), 172, "fromBase");
eq(twos(-1), "11111111", "twos -1"); eq(twos(-128), "10000000", "twos -128"); eq(fromTwos("10000011"), -125, "fromTwos");
eq(shift("00010110", 2), "01011000", "shl"); eq(shift("00010110", -3), "00000010", "shr");
eq(addBinary("11001000", "01100100"), { sum: "00101100", value: 300, overflow: true }, "add");
eq(group("01101100"), "0110 1100", "group"); eq(rle("AAAB"), [[3, "A"], [1, "B"]], "rle");
console.log(truthTableMd(["A", "B"], [["P", L.and], ["X", (a: number, b: number) => L.not(L.and(a, b))]]));
console.log(traceTable(["Count", "Total", "OUTPUT"], { Count: 1, Total: 0 }, (s: any) => (s.Count > 3 ? null : { ...s, Total: s.Total + s.Count, Count: s.Count + 1 })).md);

concept("comp.data.binary-denary", { file: "selftest/x", keyPrefix: "selftest.x" }, (b: any) => {
  b.bits({ d: 2, stem: "Convert 45 to an 8-bit binary number.", value: 45, width: 8, explanation: "32 + 8 + 4 + 1 = 45." });
  b.bits({ d: 2, stem: "Convert 200 to hexadecimal.", value: 200, base: 16, explanation: "200 = 12 × 16 + 8 → C8." });
  b.bits({ d: 3, stem: "Write -20 in 8-bit two's complement.", value: -20, twosComplement: true, explanation: "x", hints: ["h"] });
  b.truth({ d: 2, stem: "Complete the truth table for X = A XOR B.", inputs: ["A", "B"], fn: L.xor, explanation: "x" });
  b.truth({ d: 3, marks: 4, stem: "Complete for X = (A AND B) OR NOT C.", inputs: ["A", "B", "C"], fn: (a: number, bb: number, c: number) => L.or(L.and(a, bb), L.not(c)), explanation: "x", hints: ["h"] });
  b.calc({ d: 3, stem: "An image is 1024 × 512 pixels with a colour depth of 8 bits. Give its size in KiB.", value: 512, unit: "KiB", explanation: "1024 × 512 × 8 / 8 / 1024 = 512 KiB.", hints: ["h"], wrong: [4096] });
  b.ext({ d: 5, marks: 15, applies: lib.CAM, skill: "CREATION", hints: ["h"], explanation: "x", stem: "Scenario.", points: Array.from({ length: 15 }, (_, i) => `point ${i + 1}`), levels: lib.SCENARIO_LEVELS, modelAnswer: "```\nOUTPUT \"Hi\"\n```", wordLimit: { max: 600 } });
  b.struct({ d: 3, examStyle: true, hints: ["h"], explanation: "x", stem: "```\nDECLARE Count : INTEGER\nCount ← 0\n```", parts: [
    P.bits({ label: "(a)", stem: "Give 13 in binary.", value: 13, acceptUnpadded: true, explanation: "8+4+1" }),
    P.manual({ label: "(b)", marks: 2, stem: "Explain.", points: ["one", "two"] }),
  ] });
});
let fails = 0;
for (const m of allModules()) for (const q of m.questions) {
  const def = { type: q.type, markingMode: q.markingMode ?? "AUTO", marks: q.marks, payload: q.payload ?? null, answerSpec: q.answerSpec ?? null,
    options: (q.options ?? []).map((o: any) => ({ key: o.key, isCorrect: !!o.correct })),
    parts: q.parts?.map((p: any) => ({ type: p.type, markingMode: p.markingMode ?? "AUTO", marks: p.marks, payload: p.payload ?? null, answerSpec: p.answerSpec ?? null, partLabel: p.label })) } as any;
  const v = validateQuestionDefinition(def);
  if (!v.valid) { fails++; console.log(q.key, "INVALID", JSON.stringify((v as any).issues ?? v)); }
  if (q.modelResponse) {
    const r = markResponse({ ...def, response: q.modelResponse, parts: def.parts?.map((p: any) => ({ ...p, options: [] })) });
    const full = q.type === "STRUCTURED" ? true : r.marksAwarded === q.marks;
    if (!full) { fails++; console.log(q.key, "MODEL", r.status, r.marksAwarded, "/", q.marks); }
    else console.log(q.key, q.type, "model ok", r.status, r.marksAwarded);
  }
  for (const w of q.wrongResponses ?? []) {
    const r = markResponse({ ...def, response: w, parts: def.parts?.map((p: any) => ({ ...p, options: [] })) });
    if (q.type !== "STRUCTURED" && r.marksAwarded === q.marks) { fails++; console.log(q.key, "WRONG gets full marks"); }
  }
}
console.log(fails ? `${fails} FAIL(S)` : "selftest passed");
if (fails) process.exit(1);
