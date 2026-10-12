// Slice w3b: Program design: structure charts and state-transition diagrams (acs.sdlc.program-design, Cambridge only).
import { concept, P, chk, same, mdTable, codeBlock, py } from "../lib.mjs";
import { mc, pm } from "../tables/w3b-q.mjs";

// Water tank pump: state machine
const trans = {
  Off: { LowLevel: "On", HighLevel: "Off", Overheat: "Off", Reset: "Off" },
  On: { LowLevel: "On", HighLevel: "Off", Overheat: "Fault", Reset: "On" },
  Fault: { LowLevel: "Fault", HighLevel: "Fault", Overheat: "Fault", Reset: "Off" },
};
const inputs = ["LowLevel", "HighLevel", "Overheat", "Reset"];
const stateTable = mdTable(["Current state", ...inputs.map((i) => `Input: ${i}`)], Object.keys(trans).map((s) => [s, ...inputs.map((i) => trans[s][i])]));
const runSeq = (seq, start = "Off") => {
  let s = start;
  const rows = [];
  for (const i of seq) {
    const next = trans[s][i];
    rows.push([s, i, next]);
    s = next;
  }
  return { final: s, rows };
};
const seqA = ["LowLevel", "HighLevel", "LowLevel", "Overheat", "LowLevel", "Reset"];
const rA = runSeq(seqA);
same(rA.final, "Off");
const traceA = mdTable(["Step", "State before", "Input", "State after"], rA.rows.map((r, i) => [i + 1, ...r]));
const seqB = ["LowLevel", "Overheat", "HighLevel"];
const rB = runSeq(seqB);
same(rB.final, "Fault");
const nTransitions = Object.keys(trans).length * inputs.length;
chk(nTransitions, 12);
const onCount = rA.rows.filter((r) => r[2] === "On").length;
chk(onCount, 2);

// Till program with discount
const tillMirror = `prices = [12.5, 40.0, 55.5, 30.0]

def calculate_total(prices):
    total = 0
    for p in prices:
        total = total + p
    return total

def apply_discount(total):
    if total > 100:
        return total * 0.9
    return total

total = calculate_total(prices)
payable = apply_discount(total)
print("Total:", total)
print("Payable:", payable)`;
const tillOut = py(tillMirror);
same(tillOut, "Total: 138.0\nPayable: 124.2");
chk(18 + 42.5 + 9.5 + 36, 106);
chk(106 * 0.9, 95.4, 1e-9);
const tillPseudo = `FUNCTION CalculateTotal(Prices : ARRAY[1:4] OF REAL) RETURNS REAL
    DECLARE Total : REAL
    DECLARE Index : INTEGER
    Total ← 0
    FOR Index ← 1 TO 4
        Total ← Total + Prices[Index]
    NEXT Index
    RETURN Total
ENDFUNCTION

FUNCTION ApplyDiscount(Total : REAL) RETURNS REAL
    IF Total > 100 THEN
        RETURN Total * 0.9
    ELSE
        RETURN Total
    ENDIF
ENDFUNCTION`;
const modTable = mdTable(["Module", "Calls", "Data passed to the module", "Data returned"], [
  ["Main", "ReadPrices, CalculateTotal, ApplyDiscount, PrintReceipt", "none", "none"],
  ["ReadPrices", "none", "none", "Prices"],
  ["CalculateTotal", "none", "Prices", "Total"],
  ["ApplyDiscount", "none", "Total", "Payable"],
  ["PrintReceipt", "none", "Payable", "none"],
]);

concept("acs.sdlc.program-design", { file: "sdlc/program-design", keyPrefix: "sdlc.program-design" }, (b) => {
  mc(b, 1, "RECALL", "What does a structure chart show?",
    ["The modules of a program and the data passed between them", "Correct."],
    [["The order in which every instruction of a program is executed", "That is a flowchart."], ["The relationships between the tables of a database", "That is an entity-relationship diagram."], ["The cables that join the computers of a network", "That is a network diagram."]],
    "A structure chart documents the modular design of a program.");
  mc(b, 2, "RECALL", "In a structure chart, what does an arrow pointing down beside a line to a module show?",
    ["Data passed into the module", "Correct."],
    [["Data returned from the module", "Returned data is shown by an arrow pointing up."], ["That the module is called repeatedly", "Repetition is shown by a curved arrow."], ["That the module is optional", "Selection is shown by a diamond."]],
    "Down = passed in; up = returned.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a benefit of dividing a program into modules?",
    ["Each module can be written and tested separately", "Correct."],
    [["The program runs more slowly but uses less memory", "Modules are not designed to slow a program."], ["The program does not need to be tested", "All programs need testing."], ["Variables do not need names", "Every variable still needs a name."]],
    "Modules can be written, tested and reused separately.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In a structure chart, which symbol shows that a module is called only if a condition is true?",
    ["A diamond on the line", "Correct: selection."],
    [["A curved arrow around the line", "That shows iteration."], ["A double line", "A double line is not used for selection."], ["A dotted box", "A dotted box is not a structure chart symbol."]],
    "Selection is a diamond; iteration is a curved arrow.");
  mc(b, 3, "APPLICATION", "A structure chart shows `CalculateTotal` with an arrow down labelled `Prices` and an arrow up labelled `Total`. How should it be written in pseudocode?",
    ["A function `CalculateTotal` with the parameter `Prices`", "Correct."],
    [["A procedure `CalculateTotal` with no parameters at all", "Prices must be passed in."], ["A function with the parameter `Total` that returns `Prices`", "The labels are the wrong way round."], ["A variable called CalculateTotal that stores the prices", "A module is a procedure or function, not a variable."]],
    "Data in becomes parameters; one value out becomes the return value of a function.", { hints: ["Which data is passed in, and which is returned?"] });
  mc(b, 3, "APPLICATION", "A state-transition table has 3 states and 4 possible inputs. How many entries (next states) does the table have?",
    ["12", "Correct: one for every state and input pair."],
    [["7", "That adds the numbers instead of multiplying them."], ["3", "There are more entries than states."], ["4", "There are more entries than inputs."]],
    "Each state needs a next state for each input: 3 × 4 = 12.", { hints: ["Each state has a next state for every input."] });
  mc(b, 3, "ANALYSIS", "A program is designed with a module `InputAndCalculate` that reads the marks and finds the average. What is wrong with this design?",
    ["The module does two jobs and should be split", "Correct."],
    [["The module name contains a capital letter", "Capital letters are normal in module names."], ["The module cannot take parameters", "A module can take parameters."], ["Modules should not read any input from the user", "A module can read input."]],
    "Each module should have one clear purpose.", { hints: ["How many tasks does the name describe?"] });
  mc(b, 4, "ANALYSIS", "A state-transition table for a turnstile has the states `Locked` and `Open`, and the inputs `Coin` and `Push`. Which row is correct?",
    ["`Locked` + `Coin` gives `Open`", "Correct: a coin unlocks the turnstile."],
    [["`Locked` + `Push` gives `Open`", "Pushing a locked turnstile does not open it."], ["`Open` + `Coin` gives `Locked`", "Another coin does not lock it."], ["`Open` + `Push` gives `Open`", "After someone pushes through, it locks again."]],
    "A coin unlocks it; a push through returns it to Locked.", { hints: ["What should each input do to a locked and an open turnstile?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a state-transition table, every state must have a next state for every possible input.", answer: true, explanation: "True. Otherwise the design does not say what happens for that input." });
  b.tf({ d: 3, skill: "ANALYSIS", hints: ["Does a structure chart show the detail of an algorithm?"],
    stem: "A structure chart shows every step of the algorithm inside each module.", answer: false, explanation: "False. It shows the modules and the data passed; the steps are written in each module's pseudocode or flowchart." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each structure chart feature to its meaning.",
    pairs: [["Rectangle", "A module"], ["Line between two rectangles", "The upper module calls the lower module"], ["Arrow pointing down with a label", "Data passed into a module"], ["Arrow pointing up with a label", "Data returned from a module"], ["Diamond on a line", "The module is called only if a condition is true"]],
    explanation: "These are the features of a structure chart." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Use the table of the pump states."],
    stem: `A water tank pump is controlled by this state-transition table.\n\n${stateTable}\n\nComplete the next states.`,
    template: "Off + LowLevel gives {{blank:a}}\n\nOn + Overheat gives {{blank:b}}\n\nFault + Reset gives {{blank:c}}\n\nOn + HighLevel gives {{blank:d}}",
    blanks: [
      { id: "a", accepted: [trans.Off.LowLevel], choices: ["Off", "On", "Fault"] },
      { id: "b", accepted: [trans.On.Overheat], choices: ["Off", "On", "Fault"] },
      { id: "c", accepted: [trans.Fault.Reset], choices: ["Off", "On", "Fault"] },
      { id: "d", accepted: [trans.On.HighLevel], choices: ["Off", "On", "Fault"] },
    ], explanation: "Read each pair from the table: On, Fault, Off, Off." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Follow the inputs one at a time, starting in the Off state."],
    stem: `The pump (table below) starts in the state Off.\n\n${stateTable}\n\nThe inputs LowLevel, Overheat, HighLevel arrive in that order.`,
    template: "State after LowLevel: {{blank:a}}\n\nState after Overheat: {{blank:b}}\n\nState after HighLevel: {{blank:c}}",
    blanks: rB.rows.map((r, i) => ({ id: "abc"[i], accepted: [r[2]], choices: ["Off", "On", "Fault"] })),
    explanation: "On, then Fault, and a Fault state ignores HighLevel." });
  b.short({ d: 2, skill: "RECALL", stem: "Give the name of the design technique in which a problem is divided into smaller and smaller sub-tasks.",
    accepted: ["top-down design", "top down design", "stepwise refinement", "top-down", "structured design", "modular design", "decomposition"], explanation: "Top-down design (stepwise refinement)." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Multiply the number of states by the number of inputs."],
    stem: `The pump's state-transition table has ${Object.keys(trans).length} states and ${inputs.length} inputs. How many next-state entries does it contain?`,
    value: nTransitions, wrong: [7, 4], workedSolution: `${Object.keys(trans).length} × ${inputs.length} = ${nTransitions}.`, explanation: `${Object.keys(trans).length} × ${inputs.length} = ${nTransitions}.` });
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Follow each input; count how many times the state after the input is On."],
    stem: `${stateTable}\n\nThe pump starts in Off and receives these inputs in order: ${seqA.join(", ")}. In how many of the six steps is the state after the input equal to On?`,
    value: onCount, wrong: [3, 4], workedSolution: `${traceA}`, explanation: `The states after the six inputs are ${rA.rows.map((r) => r[2]).join(", ")}; On occurs ${onCount} times.` });
  b.num({ d: 3, skill: "APPLICATION", unit: undefined, hints: ["Add the prices first; the discount applies if the total is above 100."],
    stem: `A shop's program adds the prices 18.00, 42.50, 9.50 and 36.00 and then applies a 10% discount if the total is more than 100. What is the amount payable, in dollars?`,
    value: 95.4, answer: "95.4", tol: 0.001, wrong: [106, 10.6], workedSolution: "1. Total = 18 + 42.5 + 9.5 + 36 = 106.\n2. 106 is above 100, so the amount payable is 106 × 0.9 = 95.4.", explanation: "106 × 0.9 = 95.40." });
  b.manualShort({ d: 3, skill: "CREATION", marks: 4, hints: ["The function takes the total and returns the amount payable."],
    stem: "A structure chart shows the module `ApplyDiscount`, with the arrow `Total` down and the arrow `Payable` up. A 10% discount is given if the total is more than 100. Write the pseudocode for this module. [4]",
    points: ["FUNCTION header with the parameter Total : REAL and RETURNS REAL", "IF Total > 100 THEN", "RETURN Total * 0.9 in the discount case (and RETURN Total otherwise)", "ENDIF and ENDFUNCTION correctly placed"],
    modelAnswer: `\n${codeBlock(tillPseudo.split("\n\n")[1])}`,
    explanation: "A function with a selection that returns the right amount." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about writing, testing and reuse."],
    stem: "Give three benefits of designing a program as separate modules. [3]",
    points: ["Each module can be written by a different programmer, so the work is shared", "Each module can be tested separately, so faults are easier to find", "A module can be reused in other programs (or the program is easier to maintain)"],
    modelAnswer: "The work can be shared between programmers, each module can be tested separately so faults are easier to find, and a module can be reused in other programs.",
    explanation: "Sharing, testing, reuse." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Check each state for every input."],
    stem: "A designer has written a state-transition table for the pump with no entry for the input Reset in the state On. Explain what is wrong with the design and how it should be corrected. [3]",
    points: ["The table is incomplete because every state needs a next state for every input", "The pump's behaviour for Reset while On is not defined", "An entry should be added, for example On + Reset gives On, so that the behaviour is specified"],
    modelAnswer: "The table is incomplete because every state must have a next state for every input. The behaviour for Reset while the pump is On is not defined. An entry such as On + Reset gives On should be added.",
    explanation: "A complete table covers every pair." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Total the prices, then test whether the total is over 100."],
    explanation: "Total 138.0; payable 124.2; ApplyDiscount takes Total and returns Payable.",
    stem: `A shop's till program is designed with this structure chart, shown as a table.\n\n${modTable}\n\nThe prices of one customer are 12.50, 40.00, 55.50 and 30.00. A 10% discount applies if the total is more than 100.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the total calculated by `CalculateTotal`.", value: 138, wrong: [124.2, 13.8], explanation: "12.5 + 40 + 55.5 + 30 = 138.", workedSolution: "1. " + ("12.5 + 40 + 55.5 + 30 = 138.") }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "State the amount payable that is passed to `PrintReceipt`.", value: 124.2, answer: "124.2", tol: 0.001, wrong: [138, 13.8], workedSolution: "138 × 0.9 = 124.2.", explanation: "The total is above 100, so the discount applies: 124.2." }),
      P.short({ label: "(c)", marks: 1, stem: "Name the module that receives `Total` and returns `Payable`.", accepted: ["ApplyDiscount", "Apply Discount"], explanation: "ApplyDiscount." }),
      P.manual({ label: "(d)", marks: 2, stem: "State the symbol used on the structure chart to show that `ApplyDiscount` is called only when a condition is true, and give the condition.", points: ["A diamond on the line to ApplyDiscount", "Total > 100"], modelAnswer: "A diamond on the line to ApplyDiscount, with the condition Total > 100.", explanation: "Selection." }),
    ] });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Write the state after each input in a table."],
    explanation: "The pump goes On, then Fault, and stays in Fault until Reset; the table design allows the Fault state to be left only by Reset.",
    stem: `A water tank pump is controlled by this state-transition table. The pump starts in the state Off.\n\n${stateTable}`,
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "The inputs LowLevel, Overheat and HighLevel arrive in that order. Give the state after each input.", template: "After LowLevel: {{blank:a}}\n\nAfter Overheat: {{blank:b}}\n\nAfter HighLevel: {{blank:c}}", blanks: rB.rows.map((r, i) => ({ id: "abc"[i], accepted: [r[2]], choices: ["Off", "On", "Fault"] })), explanation: "On, Fault, Fault." }),
      P.short({ label: "(b)", marks: 1, stem: "Name the only input that moves the pump out of the Fault state.", accepted: ["Reset"], explanation: "Reset." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the design has the pump staying in Fault when LowLevel is received.", points: ["The pump has overheated and must not run until the fault is cleared", "Only a deliberate Reset by a person should return it to normal operation, so other inputs are ignored"], modelAnswer: "The pump has overheated and must not run until the fault is cleared, so only a deliberate Reset returns it to normal and the other inputs are ignored.", explanation: "Safety design." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe how this table could be implemented in a program.", points: ["A variable stores the current state", "A CASE statement (or nested IFs) on the state and the input chooses the next state"], modelAnswer: "A variable stores the current state, and a CASE statement on the state and the input sets the next state.", explanation: "State variable and selection." }),
    ] });
  b.card("DEFINITION", "Structure chart", "A diagram of the modules of a program, which calls which, and the parameters passed between them.");
  b.card("FACT", "Structure chart symbols", "Rectangle: module. Arrow down: data passed in. Arrow up: data returned. Diamond: selection. Curved arrow: iteration.");
  b.card("DEFINITION", "Top-down design", "Breaking a problem into smaller and smaller sub-tasks until each can be coded directly.");
  b.card("CONCEPT", "Benefits of modules", "Shared work, separate testing, reuse and easier maintenance.");
  b.card("CONCEPT", "Structure chart to pseudocode", "Each module becomes a procedure (no value) or a function (one value); parameters come from the arrows.");
  b.card("DEFINITION", "State-transition diagram", "Shows the states of a system, the inputs that cause transitions and any output.");
  b.card("CONCEPT", "Complete state-transition table", "Every state must have a next state for every possible input.");
  b.card("CONCEPT", "Tracing a state machine", "Write state before, input and state after for each step in a table.");
});
