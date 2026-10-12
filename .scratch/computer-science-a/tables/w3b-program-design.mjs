import { mdTable, codeBlock, pyBlock, same, chk } from "../lib.mjs";

// Structure chart modules (described as a table).
const modules = [
  ["Main", "InputMarks, FindAverage, FindHighest, OutputResults", "none", "none"],
  ["InputMarks", "none", "none", "Marks"],
  ["FindAverage", "none", "Marks", "Average"],
  ["FindHighest", "none", "Marks", "Highest"],
  ["OutputResults", "none", "Average, Highest", "none"],
];
const moduleTable = mdTable(["Module", "Calls", "Data passed to the module", "Data returned"], modules);

// pseudocode derived from the chart
const pseudo = `DECLARE ClassMarks : ARRAY[1:5] OF INTEGER
DECLARE Average, Highest : REAL

PROCEDURE InputMarks(BYREF Marks : ARRAY[1:5] OF INTEGER)
    DECLARE Index : INTEGER
    FOR Index ← 1 TO 5
        INPUT Marks[Index]
    NEXT Index
ENDPROCEDURE

FUNCTION FindAverage(Marks : ARRAY[1:5] OF INTEGER) RETURNS REAL
    DECLARE Total : INTEGER
    DECLARE Index : INTEGER
    Total ← 0
    FOR Index ← 1 TO 5
        Total ← Total + Marks[Index]
    NEXT Index
    RETURN Total / 5
ENDFUNCTION

FUNCTION FindHighest(Marks : ARRAY[1:5] OF INTEGER) RETURNS INTEGER
    DECLARE Best : INTEGER
    DECLARE Index : INTEGER
    Best ← Marks[1]
    FOR Index ← 2 TO 5
        IF Marks[Index] > Best THEN
            Best ← Marks[Index]
        ENDIF
    NEXT Index
    RETURN Best
ENDFUNCTION

PROCEDURE OutputResults(Average : REAL, Highest : INTEGER)
    OUTPUT "Average mark: ", Average
    OUTPUT "Highest mark: ", Highest
ENDPROCEDURE

// main program
CALL InputMarks(ClassMarks)
Average ← FindAverage(ClassMarks)
Highest ← FindHighest(ClassMarks)
CALL OutputResults(Average, Highest)`;

const mirror = `marks = [54, 71, 38, 90, 65]

def find_average(marks):
    total = 0
    for m in marks:
        total = total + m
    return total / 5

def find_highest(marks):
    best = marks[0]
    for m in marks[1:]:
        if m > best:
            best = m
    return best

print("Average mark:", find_average(marks))
print("Highest mark:", find_highest(marks))`;
const run = pyBlock(mirror);
same(run.text, "Average mark: 63.6\nHighest mark: 90");
chk((54 + 71 + 38 + 90 + 65) / 5, 63.6);

// state-transition table: wallet PIN entry
const states = ["Start", "OneWrong", "TwoWrong", "Blocked", "Menu"];
const trans = {
  Start: { correct: "Menu", wrong: "OneWrong" },
  OneWrong: { correct: "Menu", wrong: "TwoWrong" },
  TwoWrong: { correct: "Menu", wrong: "Blocked" },
  Blocked: { correct: "Blocked", wrong: "Blocked" },
  Menu: { correct: "Menu", wrong: "Menu" },
};
const stateTable = mdTable(["Current state", "Input: correct PIN", "Input: wrong PIN"], ["Start", "OneWrong", "TwoWrong", "Blocked", "Menu"].map((s) => [s, trans[s].correct, trans[s].wrong]));
const runSeq = (seq) => {
  let s = "Start";
  const steps = [["Start", "", "Start"]];
  for (const i of seq) {
    const next = trans[s][i];
    steps.push([s, i, next]);
    s = next;
  }
  return { final: s, steps };
};
const t1 = runSeq(["wrong", "wrong", "correct"]);
const t2 = runSeq(["wrong", "wrong", "wrong"]);
same(t1.final, "Menu");
same(t2.final, "Blocked");
const traceMd = (r) => mdTable(["Step", "State before", "Input", "State after"], r.steps.slice(1).map((st, i) => [i + 1, st[0], st[1], st[2]]));

export const snips = {
  moduleTable,
  pseudo: codeBlock(pseudo),
  mirror: run.code,
  mirrorOut: run.output,
  stateTable,
  trace1: traceMd(t1),
  trace2: traceMd(t2),
  final1: t1.final,
  final2: t2.final,
};
if (process.argv[1].endsWith("w3b-program-design.mjs")) console.log(snips);
