import { mdTable, chk } from "../lib.mjs";
// A 12-week project delivered as one waterfall build or as three 4-week iterations (equal increments).
const weeks = 12;
const iterations = 3;
const iterLen = weeks / iterations;
chk(iterLen, 4);
const waterfallFirstUse = weeks;
const iterFirstUse = iterLen;
const rows = [];
for (let i = 1; i <= iterations; i++) {
  rows.push([`Iteration ${i}`, `weeks ${(i - 1) * iterLen + 1} to ${i * iterLen}`, `${Math.round((i / iterations) * 100)}%`]);
}
chk(Math.round((2 / 3) * 100), 67);
const stages = [
  ["1", "Preliminary investigation", "Is there a problem worth solving? Who asked for it?"],
  ["2", "Feasibility study", "Is the solution possible, affordable and acceptable?"],
  ["3", "Analysis", "What must the new system do? How does the present system work?"],
  ["4", "Design", "How will the system work? Inputs, outputs, files, screens, test plan"],
  ["5", "Development", "Write and build the programs and files"],
  ["6", "Testing", "Find and remove faults; check against the requirements"],
  ["7", "Implementation", "Install the system, convert the data, train the users"],
  ["8", "Maintenance", "Correct faults, adapt to change and improve the system"],
  ["9", "Evaluation", "Judge whether the system meets its objectives"],
];
export const snips = {
  stages: mdTable(["No.", "Stage", "Main question answered"], stages),
  iterTable: mdTable(["Iteration", "Weeks", "Share of the final system working"], rows),
  weeks: String(weeks),
  iterLen: String(iterLen),
  waterfallFirstUse: String(waterfallFirstUse),
  iterFirstUse: String(iterFirstUse),
};
if (process.argv[1].endsWith("w3b-life-cycles.mjs")) console.log(snips);
