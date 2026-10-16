import { evaluateTree, expectedValue, table, fmt, r2, chk } from "../lib.mjs";
// Example 1
const A = { kind: "chance", name: "A", branches: [{ p: 0.6, node: { kind: "leaf", value: 70000 } }, { p: 0.4, node: { kind: "leaf", value: 35000 } }] };
const B = { kind: "chance", name: "B", branches: [{ p: 0.6, node: { kind: "leaf", value: 40000 } }, { p: 0.4, node: { kind: "leaf", value: 22000 } }] };
const t1 = evaluateTree({ kind: "decision", options: [{ name: "Build a new house", cost: 30000, node: A }, { name: "Upgrade", cost: 10000, node: B }, { name: "Do nothing", cost: 0, node: { kind: "leaf", value: 0 } }] });
console.log(JSON.stringify(t1.options), t1.choice, t1.ev);
// Example 2 two-stage
const roll = { kind: "chance", name: "roll", branches: [{ p: 0.7, node: { kind: "leaf", value: 60000 } }, { p: 0.3, node: { kind: "leaf", value: 25000 } }] };
const succ = { kind: "decision", name: "succ", options: [{ name: "Roll out", cost: 20000, node: roll }, { name: "Stay small", cost: 0, node: { kind: "leaf", value: 12000 } }] };
const fail = { kind: "leaf", value: 5000 };
const pilot = { kind: "chance", name: "pilot", branches: [{ p: 0.6, node: succ }, { p: 0.4, node: fail }] };
const t2 = evaluateTree({ kind: "decision", options: [{ name: "Pilot", cost: 5000, node: pilot }, { name: "Do nothing", cost: 0, node: { kind: "leaf", value: 0 } }] });
console.log(JSON.stringify(t2.options), t2.choice, t2.ev, JSON.stringify(t2.detail));
