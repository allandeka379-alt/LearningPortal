// Values for lessons/prog/selection.md, computed from JS mirrors.
import { mdTable } from "../slices/w4b-0-kit.mjs";
const grade = (m) => (m >= 75 ? "Distinction" : m >= 50 ? "Pass" : "Fail");
const wrongOrder = (m) => (m >= 50 ? "Pass" : m >= 75 ? "Distinction" : "Fail");
console.log(mdTable(["Mark", "Mark >= 75?", "Mark >= 50?", "Output"], [82, 61, 50, 49].map((m) => [m, m >= 75 ? "TRUE" : "FALSE", m >= 75 ? "(not tested)" : m >= 50 ? "TRUE" : "FALSE", grade(m)])));
console.log(mdTable(["Mark", "Correct order", "Wrong order"], [82, 61].map((m) => [m, grade(m), wrongOrder(m)])));
// CASE menu: units of airtime
const menu = (c) => { switch (c) { case 'B': return "Balance"; case 'T': return "Top up"; case 'S': return "Send money"; default: return "Invalid choice"; } };
console.log(mdTable(["Choice", "Output"], ["T", "S", "X"].map((c) => [`'${c}'`, menu(c)])));
// Electricity tariff example: units -> cost (nested)
