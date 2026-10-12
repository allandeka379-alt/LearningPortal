import { chk, same, mdTable, pyBlock } from "../lib.mjs";
import { needs } from "./w3a-q.mjs";

// Mark allocation as printed in the ZIMSEC project guide (our reading; a reviewer must check it against the current guide).
export const sections = [
  { id: "A", name: "Selection, investigation and analysis", items: [["Define a problem", 3], ["Investigation of the current system", 5], ["Feasibility study", 5], ["Requirements specification", 4], ["Aims and objectives", 5], ["Evidence that research was carried out", 3]], total: 25 },
  { id: "B", name: "Design", items: [["Alternative methods", 3], ["Justification of the proposed solution", 2], ["Input design", 4], ["Data structures or file design", 5], ["Overall plan", 3], ["Output and interface design", 5], ["Test strategy or test plan", 3]], total: 25 },
  { id: "C", name: "Software development", items: [["Code structure and clarity", 10], ["Technical documentation", 7], ["User documentation", 8]], total: 25 },
  { id: "D", name: "Testing and evaluation", items: [["User testing", 5], ["System testing", 5], ["Evaluation", 5]], total: 15 },
  { id: "E", name: "General expectations", items: [["Depth of knowledge", 2], ["Originality", 2], ["Overall conduct", 1], ["Quality of the report", 5]], total: 10 },
];
for (const s of sections) chk(s.items.reduce((a, [, m]) => a + m, 0), s.total, 0, s.id);
export const grand = sections.reduce((a, s) => a + s.total, 0);
chk(grand, 100);
export const marksMd = mdTable(["Section", "Title", "Marks"], [...sections.map((s) => [s.id, s.name, s.total]), ["", "**Total**", "**100**"]]);

// A test plan for a fee-balance routine, with real output.
export const fnCode = `def fee_status(fee, paid_text):
    try:
        paid = float(paid_text)
    except ValueError:
        return "Invalid: not a number"
    if paid < 0 or paid > fee:
        return "Invalid: out of range"
    if paid == fee:
        return "Paid in full"
    if paid == 0:
        return "Not paid"
    return "Part paid, balance " + str(fee - paid)


for item in ["150", "0", "300", "-20", "abc", "350"]:
    print(item, "->", fee_status(300, item))`;
export const run = pyBlock(fnCode);
same(run.text.split("\n"), ["150 -> Part paid, balance 150.0", "0 -> Not paid", "300 -> Paid in full", "-20 -> Invalid: out of range", "abc -> Invalid: not a number", "350 -> Invalid: out of range"]);
export const testMd = mdTable(["Test", "Type of data", "Input (fee 300)", "Expected result"], [
  [1, "Standard", "150", "Part paid, balance 150.0"],
  [2, "Extreme (lower limit)", "0", "Not paid"],
  [3, "Extreme (upper limit)", "300", "Paid in full"],
  [4, "Abnormal", "-20", "Invalid: out of range"],
  [5, "Abnormal", "abc", "Invalid: not a number"],
  [6, "Abnormal", "350", "Invalid: out of range"],
]);

if (process.argv[1]?.endsWith("w3a-project-report.mjs")) {
  console.log(marksMd);
  console.log(run.output);
  needs("skills/project-report", [marksMd, run.code, run.output, testMd]);
  console.log("lesson values OK");
}
