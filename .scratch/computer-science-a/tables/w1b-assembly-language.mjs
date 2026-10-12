import { runAsm, mdTable, toBase, chk, codeBlock } from "../lib.mjs";
// Program (base 100) run for real; two-pass assembly done in code with an invented opcode table for this lesson.
const src = [
  "LDD Count",
  "CMP #0",
  "JPE Done",
  "Loop: LDD Total",
  "ADD Count",
  "STO Total",
  "LDD Count",
  "DEC ACC",
  "STO Count",
  "CMP #0",
  "JPN Loop",
  "Done: LDD Total",
  "END",
  "Count: 4",
  "Total: 0",
];
const r = runAsm(src, { base: 100 });
chk(r.mem[r.labels.Total], 10);
const opcode = { LDM: 0x01, LDD: 0x02, STO: 0x03, ADD: 0x04, SUB: 0x05, CMPI: 0x06, JPE: 0x07, JPN: 0x08, JMP: 0x09, DEC: 0x0a, INC: 0x0b, END: 0x0c };
// pass 1: addresses and symbol table
const lines = src.map((raw, i) => {
  const m = /^(?:(\w+):\s*)?(.*)$/.exec(raw);
  return { addr: 100 + i, label: m[1] ?? "", text: m[2] };
});
const symbols = lines.filter((l) => l.label).map((l) => [l.label, l.addr]);
const symMap = Object.fromEntries(symbols);
const pass1Listing = mdTable(["Address", "Label", "Instruction or data"], lines.map((l) => [l.addr, l.label, `\`${l.text}\``]));
const symTable = mdTable(["Label", "Address (denary)", "Address (hex)"], symbols.map(([n, a]) => [n, a, toBase(a, 16, 2)]));
// pass 2: machine code
const hex = (n) => toBase(n, 16, 2);
const code = lines.map((l) => {
  const [op, arg] = l.text.split(" ");
  if (opcode[op] === undefined && op !== "CMP") {
    return { ...l, mc: `${hex(Number(l.text))}`, note: "data value" };
  }
  let o = op, operand = "";
  if (op === "CMP") { o = "CMPI"; operand = Number(arg.slice(1)); }
  else if (op === "DEC" || op === "END") operand = 0;
  else operand = symMap[arg];
  return { ...l, mc: `${hex(opcode[o])} ${hex(operand)}`, note: "" };
});
const pass2 = mdTable(["Address", "Instruction", "Opcode (hex)", "Operand (hex)", "Operand meaning"], code.map((c) => {
  const [op, arg] = c.text.split(" ");
  const parts = c.mc.split(" ");
  const meaning = c.note ? "the stored value" : (arg === undefined || arg === "ACC") ? "not used" : arg.startsWith("#") ? "the number itself" : `address of ${arg}`;
  return [c.addr, `\`${c.text}\``, c.note ? "" : parts[0], c.note ? parts[0] : parts[1], meaning];
}));
chk(symMap.Done, 111);
chk(symMap.Loop, 103);
export const snips = {
  pass1Listing, symTable, pass2,
  loop: String(symMap.Loop), done: String(symMap.Done), count: String(symMap.Count), total: String(symMap.Total),
  result: String(r.mem[r.labels.Total]),
  jpeCode: code[2].mc,
  steps: String(r.steps),
};
if (process.argv[1].endsWith("w1b-assembly-language.mjs")) console.log(snips);
