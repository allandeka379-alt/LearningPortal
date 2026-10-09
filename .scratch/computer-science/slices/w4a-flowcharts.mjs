// Slice w4a: flowcharts (comp.algorithms.flowcharts). Flowcharts are numbered tables; outputs come from JS mirrors.
import { concept, P } from "../lib.mjs";
import { fence, mdTable } from "./w4a-0-kit.mjs";

const fc = (rows) => mdTable(["Box", "Shape", "Text", "Next"], rows);

// Flowchart A: courier charge by weight (selection).
const chartA = fc([
  ["1", "Terminator", "START", "2"],
  ["2", "Input/Output", "INPUT Weight", "3"],
  ["3", "Decision", "Weight > 20?", "Yes → 4, No → 5"],
  ["4", "Process", "Charge ← 15", "8"],
  ["5", "Decision", "Weight > 5?", "Yes → 6, No → 7"],
  ["6", "Process", "Charge ← 8", "8"],
  ["7", "Process", "Charge ← 4", "8"],
  ["8", "Input/Output", "OUTPUT Charge", "9"],
  ["9", "Terminator", "STOP", ""],
]);
const chargeA = (w) => (w > 20 ? 15 : w > 5 ? 8 : 4);
const wA = [3, 5, 12, 20, 25];
const outA = wA.map(chargeA);

// Flowchart B: doubling loop (pre-condition).
const chartB = fc([
  ["1", "Terminator", "START", "2"],
  ["2", "Input/Output", "INPUT Limit", "3"],
  ["3", "Process", "Value ← 1, Steps ← 0", "4"],
  ["4", "Decision", "Value >= Limit?", "Yes → 6, No → 5"],
  ["5", "Process", "Value ← Value * 2, Steps ← Steps + 1", "4"],
  ["6", "Input/Output", "OUTPUT Steps, \" \", Value", "7"],
  ["7", "Terminator", "STOP", ""],
]);
const runB = (limit) => {
  let v = 1;
  let s = 0;
  while (!(v >= limit)) {
    v *= 2;
    s++;
  }
  return { steps: s, value: v };
};
const limB = 50;
const rB = runB(limB);
const limB1 = 1;
const rB1 = runB(limB1);

// Flowchart C: PIN with at most three attempts (post-condition).
const chartC = fc([
  ["1", "Terminator", "START", "2"],
  ["2", "Process", "Attempts ← 0", "3"],
  ["3", "Input/Output", "INPUT Pin", "4"],
  ["4", "Process", "Attempts ← Attempts + 1", "5"],
  ["5", "Decision", "Pin = 2580 OR Attempts = 3?", "Yes → 6, No → 3"],
  ["6", "Input/Output", "OUTPUT Attempts", "7"],
  ["7", "Terminator", "STOP", ""],
]);
const runC = (pins) => {
  let a = 0;
  let k = 0;
  let pin;
  do {
    pin = pins[k++];
    a++;
  } while (!(pin === 2580 || a === 3));
  return a;
};
const pinsC1 = [1111, 2580, 9999];
const outC1 = runC(pinsC1);
const pinsC2 = [1234, 4321, 5555, 2580];
const outC2 = runC(pinsC2);

// Struct: flowchart to pseudocode, counting even numbers.
const chartD = fc([
  ["1", "Terminator", "START", "2"],
  ["2", "Process", "Evens ← 0, Counter ← 1", "3"],
  ["3", "Decision", "Counter > 5?", "Yes → 8, No → 4"],
  ["4", "Input/Output", "INPUT Number", "5"],
  ["5", "Decision", "MOD(Number, 2) = 0?", "Yes → 6, No → 7"],
  ["6", "Process", "Evens ← Evens + 1", "7"],
  ["7", "Process", "Counter ← Counter + 1", "3"],
  ["8", "Input/Output", "OUTPUT Evens", "9"],
  ["9", "Terminator", "STOP", ""],
]);
const inD = [14, 7, 22, 9, 30];
const evensD = inD.filter((n) => n % 2 === 0).length;
const box5D = inD.length; // decision 5 is reached once per input

concept("comp.algorithms.flowcharts", { file: "algorithms/flowcharts", keyPrefix: "algorithms.flowcharts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which flowchart symbol is a **diamond**?",
    options: [
      ["Decision", "Correct: the diamond asks a Yes/No question."],
      ["Process", "A process is a rectangle."],
      ["Input/Output", "Input/output is a parallelogram."],
      ["Terminator", "A terminator has rounded ends."],
    ],
    answer: "A",
    explanation: "A decision is a diamond with two exits, labelled Yes and No (or True and False).",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "Which flowchart symbol should contain `INPUT Mark`?",
    options: [
      ["Input/Output (parallelogram)", "Correct: data entering or leaving uses the parallelogram."],
      ["Process (rectangle)", "The rectangle is for calculations and assignments."],
      ["Decision (diamond)", "A decision asks a question."],
      ["Terminator (rounded ends)", "Terminators are only START and STOP."],
    ],
    answer: "A",
    explanation: "Both INPUT and OUTPUT go in the parallelogram-shaped input/output symbol.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a **subroutine** symbol in a flowchart show?",
    options: [
      ["A call to a module that has its own flowchart", "Correct: a rectangle with double side lines."],
      ["The point where the whole algorithm starts or ends", "That is a terminator."],
      ["A question with a Yes or No answer", "That is a decision."],
      ["Data being entered from the keyboard by the user", "That is input/output."],
    ],
    answer: "A",
    explanation: "The subroutine symbol (a rectangle with an extra vertical line inside each side) refers to a separate, non-linked flowchart.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each flowchart shape to the symbol's name.",
    pairs: [
      ["A rectangle with fully rounded ends", "Terminator"],
      ["A plain rectangle", "Process"],
      ["A parallelogram", "Input/Output"],
      ["A rectangle with an extra vertical line inside each side", "Subroutine"],
    ],
    explanation: "Rounded ends: terminator. Rectangle: process. Parallelogram: input/output. Double side lines: subroutine.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is a **loop** shown in a flowchart?",
    options: [
      ["A flow line from a decision leads back to an earlier box", "Correct: control returns so the boxes repeat."],
      ["A special loop symbol shaped like a circle", "There is no loop symbol in the standard set."],
      ["Two terminator symbols placed next to each other", "Terminators only start and stop the flowchart."],
      ["A process box containing the word REPEAT", "Loops are shown by the flow of control, not by a keyword in a box."],
    ],
    answer: "A",
    explanation: "Iteration is a decision with one exit returning to an earlier point, so the steps in between are repeated.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A decision symbol in a flowchart has exactly two exits.",
    answer: true,
    explanation: "True. Each decision has two flow lines leaving it, one for Yes (True) and one for No (False).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a flowchart, an assignment such as `Total ← Total + Price` is written in an input/output symbol.",
    answer: false,
    explanation: "False. Calculations and assignments go in the process symbol (a rectangle); only INPUT and OUTPUT use the parallelogram.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `A courier in Gweru uses this flowchart (weight in kilograms):\n\n${chartA}\n\nWhat is output when the input is ${wA[2]}?`,
    value: outA[2],
    wrong: [chargeA(30)],
    explanation: `${wA[2]} > 20 is No; ${wA[2]} > 5 is Yes, so box 6 sets Charge to ${outA[2]}.`,
    workedSolution: `1. Box 3: ${wA[2]} > 20? No → box 5.\n2. Box 5: ${wA[2]} > 5? Yes → box 6.\n3. Charge ← ${outA[2]}; output ${outA[2]}.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["Check the boundary values carefully: is 5 greater than 5?"],
    stem: `Use the courier flowchart:\n\n${chartA}\n\nState the output for each input.`,
    template: [0, 1, 3, 4].map((i) => `Weight ${wA[i]}: {{blank:w${i}}}`).join("\n\n"),
    blanks: [0, 1, 3, 4].map((i) => ({ id: `w${i}`, accepted: [String(outA[i])], input: "number", wrong: String(outA[i] === 8 ? 15 : 8) })),
    explanation: [0, 1, 3, 4].map((i) => `${wA[i]} → ${outA[i]}`).join("; ") + ". 5 is not greater than 5 and 20 is not greater than 20.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Both decisions must be represented; the second is inside the No branch of the first."],
    stem: `Which pseudocode matches the courier flowchart?\n\n${chartA}`,
    options: [
      ["`IF Weight > 20 THEN Charge ← 15 ELSE IF Weight > 5 THEN Charge ← 8 ELSE Charge ← 4`", "Correct: the second test is only reached when the first is No."],
      ["`IF Weight > 5 THEN Charge ← 8 ELSE IF Weight > 20 THEN Charge ← 15 ELSE Charge ← 4`", "With this order a weight of 25 gets 8, and Charge ← 15 is never reached."],
      ["`IF Weight > 20 THEN Charge ← 15 ELSE Charge ← 8`", "This leaves out the second decision and Charge ← 4."],
      ["`IF Weight < 20 THEN Charge ← 15 ELSE IF Weight < 5 THEN Charge ← 8 ELSE Charge ← 4`", "The comparisons are reversed."],
    ],
    answer: "A",
    explanation: "Box 5 is on the No path of box 3, so it becomes a nested IF inside the ELSE of the first IF (shown on one line here; in full pseudocode THEN and ELSE go on their own lines).",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Keep track of Value and Steps each time round the loop."],
    stem: `Follow this flowchart with the input ${limB}:\n\n${chartB}\n\nWhat value of \`Steps\` is output?`,
    value: rB.steps,
    wrong: [rB.steps - 1],
    explanation: `Value doubles 1, 2, 4, … until it reaches ${rB.value}, which is at least ${limB}; that takes ${rB.steps} steps.`,
    workedSolution: `1. Value: ${Array.from({ length: rB.steps + 1 }, (_, i) => 2 ** i).join(", ")}.\n2. ${rB.value} >= ${limB} is the first Yes.\n3. Box 5 ran ${rB.steps} times, so Steps = ${rB.steps}.`,
  });
  b.num({
    d: 4, skill: "ANALYSIS",
    hints: ["The decision is tested before box 5 runs at all."],
    stem: `Use the same flowchart:\n\n${chartB}\n\nHow many times is box 5 carried out when the input is ${limB1}?`,
    value: rB1.steps,
    wrong: [1],
    explanation: `Value starts at 1 and 1 >= ${limB1} is Yes the first time box 4 is reached, so box 5 never runs.`,
    workedSolution: `1. Value ← 1.\n2. Box 4: 1 >= ${limB1}? Yes → box 6.\n3. Box 5 runs ${rB1.steps} times.`,
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Is the decision before or after the box that repeats?"],
    stem: `Which loop structure does this flowchart represent?\n\n${chartB}`,
    options: [
      ["A pre-condition loop (`WHILE … DO … ENDWHILE`)", "Correct: the condition is tested before box 5 runs."],
      ["A post-condition loop (`REPEAT … UNTIL`)", "In a post-condition loop the body comes before the test."],
      ["A count-controlled loop with a fixed number of repetitions", "The number of repetitions depends on the input."],
      ["No loop: the flowchart is a sequence", "The flow line from box 5 back to box 4 makes a loop."],
    ],
    answer: "A",
    explanation: "Box 4 tests the condition before box 5, so box 5 may run zero times, which is how a WHILE loop behaves.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    hints: ["The decision is tested after Attempts is increased."],
    stem: `A door lock uses this flowchart:\n\n${chartC}\n\nComplete the outputs.`,
    template: `Inputs ${pinsC1.join(", ")}: output {{blank:a}}\n\nInputs ${pinsC2.join(", ")}: output {{blank:b}}`,
    blanks: [
      { id: "a", accepted: [String(outC1)], input: "number", wrong: "3" },
      { id: "b", accepted: [String(outC2)], input: "number", wrong: "4" },
    ],
    explanation: `First set: the correct PIN arrives on attempt ${outC1}. Second set: the loop stops when Attempts = 3, before the fourth input is read, so ${outC2} is output.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Where does the flow line from the decision go back to?"],
    stem: `Which pseudocode matches this flowchart?\n\n${chartC}`,
    options: [
      ["`Attempts ← 0`, then `REPEAT` `INPUT Pin`, `Attempts ← Attempts + 1` `UNTIL Pin = 2580 OR Attempts = 3`, then `OUTPUT Attempts`", "Correct: the body runs before the test, so it is a post-condition loop."],
      ["`Attempts ← 0`, then `WHILE Pin = 2580 OR Attempts = 3 DO` `INPUT Pin`, `Attempts ← Attempts + 1` `ENDWHILE`, then `OUTPUT Attempts`", "This loops while the stopping condition is true, and Pin has no value at the first test."],
      ["`REPEAT` `Attempts ← 0`, `INPUT Pin`, `Attempts ← Attempts + 1` `UNTIL Pin = 2580 OR Attempts = 3`, then `OUTPUT Attempts`", "Attempts is reset to 0 on every pass, so it never reaches 3."],
      ["`Attempts ← 0`, `INPUT Pin`, `Attempts ← Attempts + 1`, `IF Pin = 2580 OR Attempts = 3 THEN OUTPUT Attempts ENDIF`", "An IF checks once; the flowchart loops back to box 3."],
    ],
    answer: "A",
    explanation: "Box 2 is outside the loop; boxes 3 and 4 repeat; the test in box 5 comes after them, which is REPEAT … UNTIL.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 5,
    hints: ["Box 2 is outside the loop.", "Box 3 tests before the body, so use a pre-condition or count-controlled loop."],
    stem: `Write pseudocode for this flowchart.\n\n${chartD}`,
    points: [
      "Initialises Evens to 0 (and Counter to 1) before the loop",
      "Loop that runs 5 times (FOR Counter ← 1 TO 5 … NEXT, or WHILE Counter <= 5 with Counter ← Counter + 1 inside)",
      "INPUT Number inside the loop",
      "IF MOD(Number, 2) = 0 THEN Evens ← Evens + 1 ENDIF inside the loop",
      "OUTPUT Evens after the loop",
    ],
    explanation: "The flow line from box 7 back to box 3 is the loop; box 5's two paths rejoin at box 7, which is an IF with no ELSE.",
    modelAnswer: "```\nEvens ← 0\nFOR Counter ← 1 TO 5\n    INPUT Number\n    IF MOD(Number, 2) = 0\n        THEN\n            Evens ← Evens + 1\n    ENDIF\nNEXT Counter\nOUTPUT Evens\n```",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    hints: ["Give each statement its own numbered box and shape.", "The decision needs two labelled exits."],
    stem: `Describe a flowchart for this pseudocode as a numbered list of boxes, giving each box's shape, its text and where its arrows go.\n\n${fence(`INPUT Mark\nIF Mark >= 50\n    THEN\n        OUTPUT "Pass"\n    ELSE\n        OUTPUT "Fail"\nENDIF`)}`,
    points: [
      "START and STOP terminators",
      "INPUT Mark in an input/output symbol",
      "Decision Mark >= 50? with exits labelled Yes and No",
      "OUTPUT \"Pass\" on the Yes path and OUTPUT \"Fail\" on the No path, both in input/output symbols, both leading to STOP",
    ],
    explanation: "Each statement maps to one shape; the IF becomes a decision whose two paths rejoin at STOP.",
    modelAnswer: "1 Terminator START → 2. 2 Input/Output INPUT Mark → 3. 3 Decision Mark >= 50? Yes → 4, No → 5. 4 Input/Output OUTPUT \"Pass\" → 6. 5 Input/Output OUTPUT \"Fail\" → 6. 6 Terminator STOP.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8, secs: 720,
    hints: ["Box 5 is reached once for every number input.", "Box 7's flow line back to box 3 is the loop."],
    stem: `Nyasha draws this flowchart:\n\n${chartD}`,
    parts: [
      P.num({
        label: "(a)", stem: `The inputs are ${inD.join(", ")}. State the value output.`, value: evensD, wrong: [inD.length - evensD],
        explanation: `The even inputs are ${inD.filter((n) => n % 2 === 0).join(", ")}, so Evens = ${evensD}.`,
        workedSolution: `1. MOD(n, 2) = 0 for ${inD.filter((n) => n % 2 === 0).join(", ")}.\n2. Evens is increased ${evensD} times.`,
      }),
      P.num({
        label: "(b)", stem: "State how many times box 5 is carried out.", value: box5D, wrong: [box5D + 1],
        explanation: `Box 5 follows each of the ${box5D} inputs.`,
        workedSolution: `1. Counter takes the values 1 to 5 inside the loop.\n2. Each pass reaches box 5 once: ${box5D} times.`,
      }),
      P.mcq({
        label: "(c)", stem: "What is the shape of box 3?",
        options: [["Diamond", "Correct: it is a decision."], ["Parallelogram", "That is input/output."], ["Rectangle", "That is a process."], ["Rectangle with rounded ends", "That is a terminator."]],
        answer: "A", explanation: "Box 3 asks a question, so it is a decision (diamond).",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "State the purpose of the flowchart.",
        points: ["Inputs five numbers", "Counts (and outputs) how many of them are even"],
        modelAnswer: "It inputs five numbers and counts how many of them are even, then outputs the count.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Nyasha wants the flowchart to also add up the odd numbers and output the total at the end. Describe the changes.",
        points: [
          "Add a process box setting OddTotal ← 0 with the other initial values (box 2)",
          "On the No exit of box 5 add a process box OddTotal ← OddTotal + Number, leading to box 7",
          "Output OddTotal as well, after the loop (in box 8 or a new output box)",
        ],
        modelAnswer: "Box 2 becomes Evens ← 0, OddTotal ← 0, Counter ← 1. The No exit of box 5 goes to a new process box OddTotal ← OddTotal + Number, which leads to box 7. Box 8 becomes OUTPUT Evens, OddTotal.",
      }),
    ],
    explanation: `(a) ${evensD}. (b) ${box5D}. (c) Diamond.`,
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", examStyle: true, marks: 5, secs: 450,
    hints: ["Name the shape for each kind of step."],
    stem: "A learner is converting this pseudocode into a flowchart:\n\n```\nTotal ← 0\nFOR Day ← 1 TO 7\n    INPUT Sales\n    Total ← Total + Sales\nNEXT Day\nOUTPUT Total\n```",
    parts: [
      P.match({
        label: "(a)", stem: "Match each statement to the flowchart symbol it needs.",
        pairs: ["`Total ← 0`", "`INPUT Sales`", "The test of whether all 7 days are done", "`OUTPUT Total`"],
        right: ["Process", "Input/Output", "Decision", "Terminator"],
        rightIndex: [0, 1, 2, 1],
        explanation: "Assignment: process. INPUT and OUTPUT: input/output. The loop test: decision.",
      }),
      P.short({
        label: "(b)", stem: "Name the symbol used for START and STOP.",
        accepted: ["terminator", "terminal", "terminator symbol"], rejected: ["process", "decision"], wrong: ["process"],
        explanation: "START and STOP use the terminator.",
      }),
    ],
    explanation: "Process, input/output, decision, input/output; START and STOP are terminators.",
  });

  b.card("CONCEPT", "Terminator", "Rectangle with rounded ends: START and STOP.");
  b.card("CONCEPT", "Process", "Rectangle: a calculation or assignment, e.g. `Total ← Total + Price`.");
  b.card("CONCEPT", "Input/Output", "Parallelogram: INPUT or OUTPUT of data.");
  b.card("CONCEPT", "Decision", "Diamond: a Yes/No (True/False) question with exactly two labelled exits.");
  b.card("CONCEPT", "Subroutine", "Rectangle with an extra vertical line inside each side: calls a procedure or function with its own flowchart.");
  b.card("DEFINITION", "Flow line", "An arrow showing control passing from one shape to the next.");
  b.card("CONCEPT", "Loops in flowcharts", "A flow line back to an earlier box. Test before the body: like WHILE. Test after the body: like REPEAT … UNTIL.");
  b.card("CONCEPT", "Selection in flowcharts", "A decision whose Yes and No paths lead to different boxes and then rejoin: IF … THEN … ELSE … ENDIF.");
  b.card("FACT", "Cambridge flowchart symbols", "Exactly six: flow line, process, subroutine, input/output, decision, terminator.");
});
