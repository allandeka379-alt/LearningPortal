import { runAsm, mdTable, chk } from "../lib.mjs";
// ---- Part 1: register transfers for a short program, built from a small register-level simulation, checked against runAsm.
const src = ["LDM #20", "ADD Fee", "STO Total", "END", "Fee: 15", "Total: 0"];
const base = 100;
const r = runAsm(src, { base });
const L = r.labels;
const prog = {};
src.forEach((line, i) => { prog[base + i] = line.replace(/^\w+:\s*/, "").trim(); });
const mem = { [L.Fee]: 15, [L.Total]: 0 };
let PC = base, MAR = "", MDR = "", CIR = "", ACC = 0;
const rows = [];
const snap = (rtn) => rows.push([rtn, PC, MAR, MDR, CIR, ACC]);
for (let n = 0; n < 3; n++) {
  const at = PC;
  MAR = PC; snap("MAR ← [PC]");
  PC = PC + 1; snap("PC ← [PC] + 1");
  MDR = `\`${prog[MAR]}\``; snap("MDR ← [[MAR]]");
  CIR = MDR; snap("CIR ← [MDR]");
  const [op, arg] = prog[at].split(" ");
  if (op === "LDM") { ACC = Number(arg.slice(1)); snap("ACC ← operand in CIR"); }
  else if (op === "ADD") {
    MAR = L[arg]; snap("MAR ← address in CIR");
    MDR = mem[MAR]; snap("MDR ← [[MAR]]");
    ACC = ACC + MDR; snap("ACC ← [ACC] + [MDR]");
  } else if (op === "STO") {
    MAR = L[arg]; snap("MAR ← address in CIR");
    MDR = ACC; snap("MDR ← [ACC]");
    mem[MAR] = MDR; snap("[[MAR]] ← [MDR]");
  }
}
chk(ACC, 35);
chk(mem[L.Total], 35);
chk(r.mem[L.Total], 35);
const rtnTable = mdTable(["Step (register transfer)", "PC", "MAR", "MDR", "CIR", "ACC"], rows);
// ---- Part 2: interrupt trace
// Main program at 300..306, interrupt request arrives during the third instruction, ISR at 900..902.
const mainProg = [300, 301, 302, 303, 304, 305];
const isr = [900, 901, 902];
const events = [];
let stack = [];
let pc = 300;
let pending = false;
let step = 0;
const executed = [];
while (pc <= 305) {
  const at = pc;
  pc = pc + 1;
  step++;
  executed.push(at);
  if (at === 302) pending = true; // request arrives while this instruction executes
  let action = "none";
  let pcShown = pc;
  if (pending) {
    stack.push(pc);
    action = `interrupt detected at the end of the cycle: PC (${pc}) and the other registers are saved on the stack`;
    events.push([step, at, pcShown, "YES", action, stack.join(", ")]);
    pending = false;
    for (const i of isr) {
      step++;
      pc = i + 1;
      events.push([step, i, pc, "no", i === 900 ? "PC loaded with 900, the start of the interrupt service routine" : i === 902 ? "last instruction of the ISR, registers restored" : "ISR runs", stack.join(", ")]);
    }
    pc = stack.pop();
    events.push(["", "", pc, "no", `PC restored from the stack: ${pc}`, stack.join(", ") || "empty"]);
  } else {
    events.push([step, at, pcShown, "no", "none", stack.join(", ") || "empty"]);
  }
}
chk(executed.length, 6);
const intTable = mdTable(["Step", "Instruction address executed", "PC after fetch", "Interrupt pending?", "What happens", "Stack (saved PC)"], events.map((e) => e.map((c) => (c === "" ? "" : c))));
export const snips = {
  rtnTable,
  intTable,
  total: String(mem[L.Total]),
  isrStart: "900",
  returnPc: "303",
};
if (process.argv[1].endsWith("w1b-fetch-execute.mjs")) console.log(rtnTable + "\n\n" + intTable);
