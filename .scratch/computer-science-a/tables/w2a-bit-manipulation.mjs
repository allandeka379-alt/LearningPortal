import { runAsm, mdTable, chk, same, codeBlock, toBase, fromBase, fromTwos, twos } from "../lib.mjs";
import { lsl, lsr, asr, rol, ror, andS, orS, xorS, notS, g4 } from "./w2a-bits.mjs";
const row = (name, v, n, f, signed = false) => { const r = f(v, n); return [name, g4(v), n, g4(r), signed ? fromTwos(v) + " → " + fromTwos(r) : fromBase(v, 2) + " → " + fromBase(r, 2)]; };
const shifts = mdTable(["Shift", "Before", "Places", "After", "Value"], [
  row("Logical left", "00101101", 2, lsl),
  row("Logical right", "10110110", 3, lsr),
  row("Arithmetic right (signed)", "11010100", 2, asr, true),
  row("Cyclic left", "10010110", 1, rol),
  row("Cyclic right", "00001011", 3, ror),
]);
chk(fromBase(lsl("00101101", 2), 2), 180); chk(fromBase("00101101", 2) * 4, 180);
chk(fromTwos("11010100"), -44); chk(fromTwos(asr("11010100", 2)), -11);
// overflow with LSL
const ov = mdTable(["Start value", "Binary", "After LSL #1 (8 bits)", "Value", "Doubled correctly?"], [13, 100, 200].map((n) => { const b = toBase(n, 2, 8); const r = lsl(b, 1); return [n, g4(b), g4(r), fromBase(r, 2), fromBase(r, 2) === 2 * n ? "yes" : "no: the top bit was lost"]; }));
chk(fromBase(lsl(toBase(200, 2, 8), 1), 2), 144);
// masks
const val = "10110110";
const masks = mdTable(["Operation", "Instruction", "Mask", "Result", "What it does"], [
  ["Test a bit", "`AND B00000100`", "00000100", g4(andS(val, "00000100")), "Keeps only bit 2; non-zero means bit 2 was 1"],
  ["Clear bits", "`AND B11110000`", "11110000", g4(andS(val, "11110000")), "Sets the low four bits to 0, keeps the high four"],
  ["Set bits", "`OR B00001001`", "00001001", g4(orS(val, "00001001")), "Sets bits 0 and 3 to 1, keeps the others"],
  ["Toggle bits", "`XOR B00000110`", "00000110", g4(xorS(val, "00000110")), "Flips bits 1 and 2"],
]);
same(andS(val, "00000100"), "00000100"); same(andS(val, "11110000"), "10110000"); same(orS(val, "00001001"), "10111111"); same(xorS(val, "00000110"), "10110000");
// pump controller program (base 800)
const src = ["LDD Status", "AND B00000001", "CMP #0", "JPE Off", "LDD Control", "OR B00010000", "STO Control", "JMP Done", "Off: LDD Control", "AND B11101111", "STO Control", "Done: END", "Status: B00000101", "Control: B00000000"];
const withStatus = (s, c) => src.map((l) => (l.startsWith("Status:") ? `Status: B${s}` : l.startsWith("Control:") ? `Control: B${c}` : l));
const run1 = runAsm(withStatus("00000101", "00000000"), { base: 800, watch: ["Control"] });
const run2 = runAsm(withStatus("00000110", "00010010"), { base: 800, watch: ["Control"] });
same(toBase(run1.mem[run1.labels.Control], 2, 8), "00010000");
same(toBase(run2.mem[run2.labels.Control], 2, 8), "00000010");
const prog = codeBlock(src.map((l, i) => `${800 + i}  ${l}`).join("\n"));
const outcomes = mdTable(["Status (sensor bits)", "Control before", "Bit 0 of Status", "Control after"], [
  ["00000101", "00000000", "1 (water low)", g4(toBase(run1.mem[run1.labels.Control], 2, 8))],
  ["00000110", "00010010", "0 (water not low)", g4(toBase(run2.mem[run2.labels.Control], 2, 8))],
]);
// shifts as multiplication and division
const mulDiv = mdTable(["Start value", "Instruction", "Result", "Same as"], [[13, "LSL #3", 13 * 8, "13 × 8"], [44, "LSR #2", Math.floor(44 / 4), "44 ÷ 4"], [45, "LSR #2", Math.floor(45 / 4), "45 ÷ 4, remainder lost"]].map((r) => {
  const [v, ins, res] = r; const n = +ins.split("#")[1]; const out = ins.startsWith("LSL") ? fromBase(lsl(toBase(v, 2, 8), n), 2) : fromBase(lsr(toBase(v, 2, 8), n), 2); chk(out, res); return r;
}));
const trace = (r) => r.trace.map((t) => `${t.addr} ${t.text} → ACC ${toBase(t.acc, 2, 8)}`).join("\n");
export const snips = { shifts, ov, masks, prog, outcomes, mulDiv, trace1: codeBlock(trace(run1)), steps1: String(run1.steps) };
if (process.argv[1].endsWith("w2a-bit-manipulation.mjs")) for (const [k, v] of Object.entries(snips)) console.log(`--- ${k}\n${v}`);
