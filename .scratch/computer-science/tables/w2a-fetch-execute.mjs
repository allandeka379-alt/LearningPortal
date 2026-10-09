// Tables for lessons/hardware/fetch-execute.md: register contents during two FDE cycles (simulated, not typed).
import { traceTable } from "../lib.mjs";

function run(mem, start, n) {
  const steps = [];
  let s = { Step: "Start", PC: start, MAR: "", MDR: "", CIR: "", ACC: 0 };
  steps.push({ ...s });
  for (let i = 0; i < n; i++) {
    s = { ...s, Step: "MAR ← PC", MAR: s.PC }; steps.push(s);
    s = { ...s, Step: "MDR ← [MAR]; PC ← PC + 1", MDR: mem[s.MAR], PC: s.PC + 1 }; steps.push(s);
    s = { ...s, Step: "CIR ← MDR", CIR: s.MDR }; steps.push(s);
    const [op, a] = s.CIR.split(" ");
    const addr = Number(a);
    s = { ...s, Step: "Decode; MAR ← address", MAR: addr }; steps.push(s);
    s = { ...s, Step: "MDR ← [MAR]", MDR: mem[addr] }; steps.push(s);
    if (op === "LDA") s = { ...s, Step: "ACC ← MDR", ACC: s.MDR };
    else if (op === "ADD") s = { ...s, Step: "ACC ← ACC + MDR (ALU)", ACC: s.ACC + s.MDR };
    steps.push(s);
  }
  let i = 0;
  return traceTable(["Step", "PC", "MAR", "MDR", "CIR", "ACC"], steps[0], () => steps[++i] ?? null, { showUnchanged: true });
}
const mem = { 20: "LDA 30", 21: "ADD 31", 30: 15, 31: 27 };
console.log(run(mem, 20, 2).md);
