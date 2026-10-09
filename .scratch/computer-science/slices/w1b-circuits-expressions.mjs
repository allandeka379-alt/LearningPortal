// Slice w1b: designing circuits and writing logic expressions (comp.logic.circuits-expressions).
import { concept, P, L, truthRows, truthTableMd } from "../lib.mjs";

const ABC = ["A", "B", "C"];
const col = (inputs, f) => truthRows(inputs, f).map((r) => r.out).join("");

const irrig = (a, b, c) => L.and(a, L.or(b, c)); // A AND (B OR C)
const lift = (a, b, c) => L.and(a, L.xor(b, c)); // A AND (B XOR C)
const car = (a, b) => L.and(L.not(a), b); // (NOT A) AND B
const majority = (a, b, c) => L.or(L.or(L.and(a, b), L.and(a, c)), L.and(b, c));
const tableFn = (a, b, c) => (a === 1 && b === 0 && c === 1) || (a === 0 && b === 0 && c === 0) ? 1 : 0; // rows 000 and 101

concept("comp.logic.circuits-expressions", { file: "logic/circuits-expressions", keyPrefix: "logic.circuits-expressions" }, (b) => {
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A car's warning lamp X comes on when the engine is **not** running and the headlights are on. A = 1 when the engine is running; B = 1 when the headlights are on. Which expression is correct?",
    options: [["`X = (NOT A) AND B`", "Correct: engine not running is NOT A, and the lights must also be on."], ["`X = A AND B`", "This lights the lamp while the engine is running."], ["`X = NOT (A AND B)`", "This is NAND: the lamp would be on in three of the four situations."], ["`X = (NOT A) OR B`", "OR would light the lamp whenever the lights are on, even while driving."]],
    answer: "A",
    explanation: `"Engine not running" is NOT A; "and the headlights are on" joins B with AND: X = (NOT A) AND B (output ${col(["A", "B"], car)}).`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "An irrigation valve X opens when the soil is dry (A = 1) and either it is night (B = 1) or the storage tank is full (C = 1). Which expression is correct?",
    options: [["`X = A AND (B OR C)`", "Correct: dry soil is needed in every case, together with night or a full tank."], ["`X = (A AND B) OR C`", "This opens the valve whenever the tank is full, even if the soil is wet."], ["`X = A OR (B AND C)`", "This opens the valve whenever the soil is dry, at any time."], ["`X = A AND B AND C`", "This needs night and a full tank together, but either one is enough."]],
    answer: "A",
    hints: ["Which condition is needed in every case?", "\"either … or\" joins B and C."],
    explanation: `A must always be 1, so A is ANDed with the group (B OR C): X = A AND (B OR C), output ${col(ABC, irrig)}.`,
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A circuit is described as follows. Inputs A and B go into an OR gate. Input C goes into a NOT gate. The outputs of the OR gate and the NOT gate go into a NAND gate, whose output is X. Which expression represents the circuit?",
    options: [["`X = (A OR B) NAND (NOT C)`", "Correct: the two gate outputs are the inputs of the final NAND gate."], ["`X = NOT ((A OR B) AND C)`", "This applies NOT after the AND; in the circuit NOT acts on C before the NAND."], ["`X = (A OR B) AND (NOT C)`", "The final gate is NAND, not AND."], ["`X = (A NOR B) NAND C`", "The first gate is OR, and C passes through a NOT gate first."]],
    answer: "A",
    hints: ["Write each gate's output in brackets, then join them with the last gate."],
    explanation: "OR gate: (A OR B). NOT gate: (NOT C). Final NAND: X = (A OR B) NAND (NOT C).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A truth table has X = 1 only in the rows A = 0, B = 0, C = 0 and A = 1, B = 0, C = 1. Which expression produces this table?",
    options: [["`X = (NOT A AND NOT B AND NOT C) OR (A AND NOT B AND C)`", `Correct: each AND term is 1 in exactly one of the two rows (column ${col(ABC, tableFn)}).`], ["`X = (A AND B AND C) OR (NOT A AND B AND NOT C)`", "This builds the terms with the 0s and 1s swapped; it is 1 in rows 111 and 010."], ["`X = (NOT A OR NOT B OR NOT C) AND (A OR NOT B OR C)`", "This mixes the operators; it is 1 in several other rows as well."], ["`X = (NOT A AND NOT B AND C) OR (A AND NOT B AND NOT C)`", "These terms match rows 001 and 100, not 000 and 101."]],
    answer: "A",
    hints: ["Use only the rows where X = 1.", "An input that is 0 in a row appears with NOT in that row's term."],
    explanation: "Row 000 gives (NOT A AND NOT B AND NOT C); row 101 gives (A AND NOT B AND C). OR the two terms together.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In Cambridge 0478 logic circuits, which statement is correct?",
    options: [["Every gate except NOT has exactly two inputs", "Correct: NOT has one input; all other gates are limited to two."], ["Circuits must be simplified before they are drawn", "Circuits are drawn for the statement as given, without simplification."], ["Circuits may have up to four inputs", "Circuits are limited to three inputs and one output."], ["A circuit may have several separate outputs", "Circuits have a single output, X."]],
    answer: "A",
    explanation: "0478 circuits have at most three inputs and one output, use two-input gates (NOT has one) and follow the statement without simplification.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A lift motor X runs when the door is closed (A = 1) and exactly one of the buttons UP (B = 1) or DOWN (C = 1) is pressed. Which expression is correct?",
    options: [["`X = A AND (B XOR C)`", "Correct: XOR is 1 when exactly one button is pressed."], ["`X = A AND (B OR C)`", "OR would also run the motor with both buttons pressed."], ["`X = A XOR (B AND C)`", "This could run the motor with the door open."], ["`X = A OR (B XOR C)`", "OR would run the motor whenever the door is closed."]],
    answer: "A",
    hints: ["\"Exactly one\" is a clue for one particular gate."],
    explanation: `"Exactly one of B or C" is B XOR C, and the closed door must also be 1: X = A AND (B XOR C), output ${col(ABC, lift)}.`,
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "How many two-input gates are needed to build `X = (A AND B) OR (A AND C) OR (B AND C)` exactly as written, without simplifying?",
    options: [["5", "Correct: three AND gates for the terms and two OR gates to join three terms."], ["4", "Three terms need two OR gates (two inputs each), plus three AND gates."], ["3", "This counts only the AND gates."], ["6", "Joining three terms needs two OR gates, not three."]],
    answer: "A",
    hints: ["Count one gate per operator in the expression."],
    explanation: "There are five operators: three ANDs and two ORs. With two-input gates, joining three terms takes two OR gates, so five gates in total.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "To write a logic expression from a truth table, you can AND together the inputs for each row where X = 1 (using NOT for inputs that are 0) and then OR these terms together.",
    answer: true, daily: true,
    explanation: "True. Each AND term is 1 for exactly one row; ORing the terms gives 1 in exactly the rows required.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "`X = (A AND B) OR C` and `X = A AND (B OR C)` describe the same circuit.",
    answer: false,
    explanation: `False. The brackets change the gates' order. (A AND B) OR C gives ${col(ABC, (a, b, c) => L.or(L.and(a, b), c))}; A AND (B OR C) gives ${col(ABC, irrig)}.`,
  });
  b.truth({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A lift motor X runs when the door is closed (A = 1) and exactly one of the buttons UP (B = 1) or DOWN (C = 1) is pressed. Complete the truth table for X.",
    inputs: ABC, fn: lift,
    hints: ["The expression is X = A AND (B XOR C).", "Every row with A = 0 gives X = 0."],
    explanation: `X = A AND (B XOR C): ${col(ABC, lift)}.\n\n${truthTableMd(ABC, [["B XOR C", (a, b, c) => L.xor(b, c)], ["X", lift]])}`,
  });
  b.truth({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Three judges at a school music competition in Bulawayo each press a button (A, B, C = 1 for \"pass\"). A contestant goes through (X = 1) when **at least two** judges press their buttons. Complete the truth table for X.",
    inputs: ABC, fn: majority,
    hints: ["Count the 1s in each row.", "X = 1 when there are two or three 1s."],
    explanation: `X is 1 in rows with two or more 1s: ${col(ABC, majority)}. As an expression: X = (A AND B) OR (A AND C) OR (B AND C).`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the description of the circuit for `X = (A NOR B) AND (NOT C)`.",
    template: "Inputs A and B go into a {{blank:g1}} gate. Input C goes into a {{blank:g2}} gate. The outputs of these two gates go into an {{blank:g3}} gate, whose output is X.",
    blanks: [
      { id: "g1", accepted: ["NOR"], choices: ["NOR", "OR", "NAND", "XOR"] },
      { id: "g2", accepted: ["NOT"], choices: ["NOT", "NOR", "AND", "OR"] },
      { id: "g3", accepted: ["AND"], choices: ["AND", "OR", "NAND", "XOR"] },
    ],
    hints: ["Each operator becomes one gate; the final operator is the last gate."],
    explanation: "A NOR B is a NOR gate; NOT C is a NOT gate; the AND joining the brackets is the final gate.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "In a factory, A = 1 means the guard is closed, B = 1 means the start button is pressed and C = 1 means the stop button is pressed. Match each condition to its logic expression.",
    pairs: [
      ["The guard is open", "`NOT A`"],
      ["The guard is closed and start is pressed", "`A AND B`"],
      ["Neither button is pressed", "`B NOR C`"],
      ["Exactly one button is pressed", "`B XOR C`"],
    ],
    explanation: "\"Open\" is the opposite of A = 1 (closed), so NOT A; \"and\" is AND; \"neither … nor\" is NOR; \"exactly one\" is XOR.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 3,
    hints: ["Decide which conditions are grouped together.", "\"not\" conditions need NOT."],
    stem: "A greenhouse fan X switches on when the temperature is high (T = 1) and the window is closed (W = 1), or when the humidity is high (H = 1) and the window is **not** closed. Write the logic expression for X. [3]",
    points: ["`T AND W` as one term", "`H AND (NOT W)` as the second term", "The two terms joined with OR (correct brackets)"],
    modelAnswer: "X = (T AND W) OR (H AND (NOT W))",
    explanation: `X = (T AND W) OR (H AND NOT W). Output in the order T, W, H: ${col(["T", "W", "H"], (t, w, h) => L.or(L.and(t, w), L.and(h, L.not(w))))}.`,
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 3,
    hints: ["Each operator in the expression becomes one gate.", "Say which signals enter each gate and where its output goes."],
    stem: "Describe in words the logic circuit for `X = (A XOR B) OR (B AND C)`, naming each gate and stating its inputs. [3]",
    points: ["A and B go into an XOR gate", "B and C go into an AND gate", "The outputs of the XOR and AND gates go into an OR gate whose output is X"],
    modelAnswer: "Inputs A and B go into an XOR gate. Inputs B and C go into an AND gate. The outputs of the XOR gate and the AND gate go into an OR gate, whose output is X.",
    explanation: "Each operator becomes one gate; the bracketed gates feed the final OR gate.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Translate each condition into an operator.", "Check your expression on a row where the alarm must be off."],
    stem: "A cold room at a dairy in Gweru has an alarm X. Inputs: D = 1 when the door is open, T = 1 when the temperature is too high, S = 1 when the alarm has been silenced by staff. The alarm sounds when the door is open **or** the temperature is too high, but only if it has **not** been silenced.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which expression is correct?", options: [["`X = (D OR T) AND (NOT S)`", "Correct: either problem, and not silenced."], ["`X = D OR (T AND (NOT S))`", "This lets an open door sound the alarm even when silenced."], ["`X = (D AND T) AND (NOT S)`", "This needs both problems at once."], ["`X = (D OR T) OR (NOT S)`", "This sounds the alarm whenever it is not silenced."]], answer: "A", explanation: "Group (D OR T), then AND with NOT S." }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X (inputs in the order D, T, S).", inputs: ["D", "T", "S"], fn: (d, t, s) => L.and(L.or(d, t), L.not(s)), explanation: `X = ${col(["D", "T", "S"], (d, t, s) => L.and(L.or(d, t), L.not(s)))}.` }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the logic circuit for your expression, naming each gate and its inputs.", points: ["D and T go into an OR gate", "S goes into a NOT gate", "The outputs of the OR and NOT gates go into an AND gate, output X"], modelAnswer: "D and T go into an OR gate; S goes into a NOT gate; both outputs go into an AND gate whose output is X." }),
    ],
    explanation: "X = (D OR T) AND (NOT S).",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Use the rows where X = 1 to build AND terms.", "Each row with X = 1 gives one term."],
    stem: "A truth table for a circuit with inputs A, B and C is shown.\n\n" + truthTableMd(ABC, [["X", (a, b, c) => (a === 0 && b === 1 && c === 0) || (a === 1 && b === 1 && c === 1) ? 1 : 0]]),
    parts: [
      P.num({ label: "(a)", stem: "State how many rows give X = 1.", value: truthRows(ABC, (a, b, c) => (a === 0 && b === 1 && c === 0) || (a === 1 && b === 1 && c === 1)).filter((r) => r.out).length, explanation: "Rows 010 and 111.", workedSolution: "1. Read down the X column.\n2. X = 1 in rows 010 and 111, so 2 rows." }),
      P.manual({ label: "(b)", marks: 4, stem: "Write a logic expression for X.", points: ["Term for row 010: `(NOT A) AND B AND (NOT C)`", "Term for row 111: `A AND B AND C`", "Terms joined with OR", "Correct use of brackets so each term is one group"], modelAnswer: "X = ((NOT A) AND B AND (NOT C)) OR (A AND B AND C)" }),
      P.mcq({ label: "(c)", stem: "Which input must be 1 whenever X is 1?", options: [["B", "Correct: B is 1 in both rows that give X = 1."], ["A", "A is 0 in row 010."], ["C", "C is 0 in row 010."], ["None of the inputs", "B is 1 in both rows."]], answer: "A", explanation: "In both rows with X = 1, B = 1." }),
    ],
    explanation: "X = ((NOT A) AND B AND (NOT C)) OR (A AND B AND C).",
  });
  b.struct({
    d: 4, skill: "CREATION", examStyle: true,
    hints: ["Each gate's output becomes a bracketed part of the expression."],
    stem: "A circuit is described as follows. Input A goes into a NOT gate. Inputs B and C go into a NAND gate. The outputs of the NOT gate and the NAND gate go into an XOR gate, whose output is X.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which expression represents the circuit?", options: [["`X = (NOT A) XOR (B NAND C)`", "Correct: the two gate outputs feed the XOR gate."], ["`X = NOT (A XOR (B AND C))`", "The NOT acts only on A, and the gate on B and C is NAND."], ["`X = (NOT A) OR (B NAND C)`", "The final gate is XOR, not OR."], ["`X = (A NAND B) XOR (NOT C)`", "The NAND gate takes B and C, and the NOT gate takes A."]], answer: "A", explanation: "NOT A and B NAND C are joined by XOR." }),
      P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ABC, fn: (a, b, c) => L.xor(L.not(a), L.nand(b, c)), explanation: `NOT A: ${col(ABC, (a) => L.not(a))}; B NAND C: ${col(ABC, (a, b, c) => L.nand(b, c))}; X: ${col(ABC, (a, b, c) => L.xor(L.not(a), L.nand(b, c)))}.` }),
      P.short({ label: "(c)", stem: "State the output X when A = 0, B = 1 and C = 1.", accepted: [String(L.xor(L.not(0), L.nand(1, 1)))], wrong: [String(1 - L.xor(L.not(0), L.nand(1, 1)))], explanation: `NOT 0 = 1; 1 NAND 1 = 0; 1 XOR 0 = ${L.xor(1, 0)}.` }),
    ],
    explanation: "X = (NOT A) XOR (B NAND C).",
  });

  b.card("DEFINITION", "What is a **logic circuit**?", "Logic gates connected so that some gates' outputs are inputs of others, giving one final output from the inputs.");
  b.card("CONCEPT", "Four ways to describe the same logic", "Problem statement, logic expression, logic circuit and truth table.");
  b.card("CONCEPT", "Problem statement → expression: first steps", "Name the inputs and what 1 means, then translate \"and\", \"or\", \"not\", \"exactly one\" (XOR), \"neither … nor\" (NOR), keeping the grouping in brackets.");
  b.card("CONCEPT", "Truth table → expression", "For each row with X = 1, AND the inputs (NOT for a 0); then OR all these terms together.");
  b.card("CONCEPT", "Circuit → expression", "Write each gate's output in brackets, working from the inputs towards X.");
  b.card("FACT", "0478 circuit limits", "At most three inputs and one output; two-input gates (NOT has one); drawn as stated, without simplification.");
  b.card("FACT", "Phrase \"exactly one of B or C\"", "`B XOR C`");
  b.card("FACT", "Phrase \"neither B nor C\"", "`B NOR C` (the same as `NOT (B OR C)`).");
  b.card("CONCEPT", "How many two-input gates for `A AND B AND C`?", "Two AND gates in a chain: `(A AND B) AND C`.");
});
