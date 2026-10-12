import { mdTable, py, pyBlock, codeBlock, same, chk, traceTable } from "../lib.mjs";

// 1. Logic error: the loop starts at 1, so the first mark is left out.
const buggy = `marks = [60, 72, 48, 80]
total = 0
for i in range(1, len(marks)):
    total = total + marks[i]
average = total / len(marks)
print("Average:", average)`;
const fixed = buggy.replace("range(1, len(marks))", "range(0, len(marks))");
const rb = pyBlock(buggy);
const rf = pyBlock(fixed);
same(rb.text, "Average: 50.0");
same(rf.text, "Average: 65.0");
chk((60 + 72 + 48 + 80) / 4, 65);
chk((72 + 48 + 80) / 4, 50);
const tt = traceTable(["i", "marks[i]", "total"], { i: "", "marks[i]": "", total: 0 }, (() => {
  let i = 0;
  const m = [60, 72, 48, 80];
  let total = 0;
  return (st) => {
    i += 1;
    if (i > 3) return null;
    total += m[i];
    return { i, "marks[i]": m[i], total };
  };
})(), { showUnchanged: true });
// 2. Run-time error
const rtCode = `marks = []
total = 0
count = len(marks)
average = total / count
print(average)`;
let rtMsg = "";
try { py(rtCode); } catch (e) { rtMsg = String(e.message).trim().split("\n").filter(Boolean).pop(); }
same(rtMsg, "ZeroDivisionError: division by zero");
// 3. Syntax error
const synCode = `for i in range(3)
    print(i)`;
let synMsg = "";
try { py(synCode); } catch (e) { synMsg = String(e.message); }
same(/SyntaxError/.test(synMsg), true);

// 4. Test data for a range rule 0..100
const valid = `def check(mark):
    if type(mark) is not int:
        return "rejected"
    if mark >= 0 and mark <= 100:
        return "accepted"
    return "rejected"`;
const cases = [
  ["Normal", "57", 57],
  ["Extreme (boundary)", "0", 0],
  ["Extreme (boundary)", "100", 100],
  ["Abnormal", "-1", -1],
  ["Abnormal", "101", 101],
  ["Abnormal", "\"abc\"", "abc"],
];
const results = cases.map(([k, shown, v]) => {
  const out = py(`${valid}\nprint(check(${typeof v === "string" ? JSON.stringify(v) : v}))`);
  return [k, shown, out];
});
same(results.map((r) => r[2]), ["accepted", "accepted", "accepted", "rejected", "rejected", "rejected"]);
const testData = mdTable(["Type of test data", "Test value", "Expected result"], results);

// 5. Test plan example
const plan = mdTable(["Test", "Purpose", "Test data", "Expected result", "Actual result", "Pass?"], [
  ["1", "Normal mark accepted", "57", "accepted", "", ""],
  ["2", "Lower boundary accepted", "0", "accepted", "", ""],
  ["3", "Upper boundary accepted", "100", "accepted", "", ""],
  ["4", "Just below range rejected", "-1", "rejected with message", "", ""],
  ["5", "Just above range rejected", "101", "rejected with message", "", ""],
  ["6", "Wrong type rejected", "abc", "rejected with message", "", ""],
]);

export const snips = {
  buggy: rb.code, buggyOut: rb.output, fixed: rf.code, fixedOut: rf.output,
  trace: tt.md,
  rtCode: codeBlock(rtCode, "python"), rtMsg,
  synCode: codeBlock(synCode, "python"),
  validCode: codeBlock(valid, "python"),
  testData, plan,
};
if (process.argv[1].endsWith("w3b-testing-maintenance.mjs")) console.log(snips);
