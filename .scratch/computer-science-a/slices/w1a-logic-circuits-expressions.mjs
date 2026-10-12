// W1a: logic circuits, expressions and truth tables. Both boards (up to three inputs for ZIMSEC).
import { concept, P, L, truthRows, truthTableMd, equivalent, minterms, chk, same } from "../lib.mjs";

concept("acs.logic.circuits-expressions", { file: "logic/circuits-expressions", keyPrefix: "logic.circuits-expressions" }, (b) => {
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "A logic circuit has four inputs. How many rows must its complete truth table have?",
    value: 16,
    workedSolution: "1. Each input can be 0 or 1.\n2. Rows = 2^4 = 16.",
    explanation: "A truth table has 2^n rows for n inputs, so 2^4 = 16.",
  });
  {
    const f = (a, bb, c) => L.and(L.or(a, bb), L.not(c));
    b.truth({
      d: 3, skill: "APPLICATION", marks: 4,
      stem: "A circuit has inputs A, B and C. A and B go into an OR gate. C goes into a NOT gate. The outputs of these two gates go into an AND gate whose output is X. This is `X = (A OR B) AND (NOT C)`. Complete the truth table.",
      inputs: ["A", "B", "C"], fn: f,
      hints: ["Work out A OR B and NOT C for each row first.", "X is 1 only when both of those are 1."],
      explanation: "X is 1 when C = 0 and at least one of A and B is 1: rows 010, 100 and 110.",
    });
  }
  b.truth({
    d: 2, skill: "APPLICATION",
    stem: "A circuit has two inputs A and B. They go into an XOR gate and its output goes into a NOT gate whose output is X. Complete the truth table for `X = NOT (A XOR B)`.",
    inputs: ["A", "B"], fn: (a, bb) => L.not(L.xor(a, bb)),
    explanation: "XOR is 1 when the inputs differ; the NOT gate reverses this, so X is 1 when the inputs are the same.",
  });
  {
    const f = (a, bb, c) => L.or(L.and(a, L.not(bb)), L.and(bb, c));
    b.truth({
      d: 4, skill: "ANALYSIS", marks: 4,
      stem: "A circuit has inputs A, B and C and output X, where `X = (A AND (NOT B)) OR (B AND C)`. Complete the truth table.",
      inputs: ["A", "B", "C"], fn: f,
      hints: ["Find A AND (NOT B) and B AND C separately for each of the eight rows.", "X is 1 if either term is 1."],
      explanation: "The first term is 1 for A = 1 and B = 0; the second term is 1 for B = 1 and C = 1. X is 1 in rows 100, 101, 011 and 111.",
    });
  }
  {
    const [a, bb, c] = [1, 1, 0];
    const f = (x, y, z) => L.and(L.or(x, y), L.not(z));
    b.num({
      d: 2, skill: "APPLICATION", calculator: false,
      stem: `A circuit is described by \`X = (A OR B) AND (NOT C)\`. Work out X when A = ${a}, B = ${bb} and C = ${c}.`,
      value: f(a, bb, c),
      workedSolution: `1. A OR B = ${a} OR ${bb} = ${L.or(a, bb)}.\n2. NOT C = NOT ${c} = ${L.not(c)}.\n3. X = ${L.or(a, bb)} AND ${L.not(c)} = ${f(a, bb, c)}.`,
      explanation: `A OR B = ${L.or(a, bb)} and NOT C = ${L.not(c)}, so X = ${f(a, bb, c)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "In a logic circuit, input A and input B go into an OR gate. Input C goes into a NOT gate. The outputs of these two gates go into an AND gate, whose output is X. Which expression describes the circuit?",
    options: [
      ["X = (A OR B) AND (NOT C)", "Correct: the OR gate and the NOT gate feed the AND gate."],
      ["X = (A AND B) OR (NOT C)", "This swaps the OR and AND gates."],
      ["X = NOT ((A OR B) AND C)", "The NOT gate acts only on C, not on the whole expression."],
      ["X = (A OR B) OR (NOT C)", "The final gate is AND, not OR."],
    ],
    answer: "A",
    explanation: "Follow the signals: P = A OR B, Q = NOT C, X = P AND Q.",
  });
  {
    const g1 = (a, bb) => L.nand(a, bb);
    const opts = [
      ["(NOT A) AND (NOT B)", (a, bb) => L.and(L.not(a), L.not(bb))],
      ["(NOT A) OR (NOT B)", (a, bb) => L.or(L.not(a), L.not(bb))],
      ["A OR B", L.or],
      ["A XOR B", L.xor],
    ];
    const eq = opts.map(([, f]) => equivalent(["A", "B"], g1, f));
    same(eq, [false, true, false, false], "equivalence");
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "Which expression is equivalent to `A NAND B` (the output of a NAND gate with inputs A and B)?",
      options: opts.map(([t], i) => [t, eq[i] ? "Correct: its truth table has 1 in every row except 11." : "Its truth table differs from NAND in at least one row."]),
      answer: "B",
      hints: ["Write the NAND truth table, then test each option on the row 11 and the row 00."],
      explanation: "NAND is 0 only for 11. (NOT A) OR (NOT B) is also 0 only when A and B are both 1. The other options are 1 for 00 or 0 for 01 or 10.",
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The expressions `NOT (A AND B)` and `(NOT A) AND (NOT B)` always give the same output.",
    answer: false,
    feedbackTrue: "Check row 01: NOT (0 AND 1) = 1, but (NOT 0) AND (NOT 1) = 1 AND 0 = 0.",
    feedbackFalse: "Correct: for A = 0 and B = 1, the first is 1 but the second is 0.",
    explanation: "The truth tables differ in the rows 01 and 10, so the expressions are not equivalent.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each statement to the correct logic expression.",
    pairs: [
      ["An alarm sounds when the door is open and the system is armed", "X = D AND S"],
      ["A fan runs when either the temperature is high or the manual switch is on", "X = T OR M"],
      ["A gate opens when the sensor is not blocked", "X = NOT B"],
      ["A lamp is on when exactly one of two switches is pressed", "X = S1 XOR S2"],
    ],
    explanation: "Translate the key words: and → AND, either/or → OR, not → NOT, exactly one → XOR.",
  });
  {
    const [a, bb, c] = [1, 0, 1];
    const f = (x, y, z) => L.or(L.and(x, y), L.not(z));
    const p = L.and(a, bb), q = L.not(c), x = f(a, bb, c);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `For the circuit \`X = (A AND B) OR (NOT C)\`, complete the intermediate values when A = ${a}, B = ${bb} and C = ${c}.`,
      template: "P = A AND B = {{blank:p}}\n\nQ = NOT C = {{blank:q}}\n\nX = P OR Q = {{blank:x}}",
      blanks: [
        { id: "p", choices: ["0", "1"], accepted: [String(p)] },
        { id: "q", choices: ["0", "1"], accepted: [String(q)] },
        { id: "x", choices: ["0", "1"], accepted: [String(x)] },
      ],
      hints: ["Work out P and Q first, then combine them."],
      explanation: `P = ${a} AND ${bb} = ${p}; Q = NOT ${c} = ${q}; X = ${p} OR ${q} = ${x}.`,
    });
  }
  {
    const f = (a, bb, c) => L.or(L.and(a, bb), L.and(L.not(a), c));
    const n = truthRows(["A", "B", "C"], f).filter((r) => r.out).length;
    b.num({
      d: 3, skill: "ANALYSIS", calculator: false,
      stem: "A circuit has the expression `X = (A AND B) OR ((NOT A) AND C)`. In how many of the eight rows of its truth table is X equal to 1?",
      value: n,
      hints: ["List the rows where A = 1 and B = 1, then the rows where A = 0 and C = 1."],
      workedSolution: `1. A AND B is 1 for 110 and 111 (2 rows).\n2. (NOT A) AND C is 1 for 001 and 011 (2 rows).\n3. These rows are different, so X is 1 in ${n} rows.`,
      explanation: `X is 1 in the rows 001, 011, 110 and 111: ${n} rows.`,
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A school computer lab has an alarm that sounds if a window is open (W = 1) and the system is armed (S = 1), or if the panic button is pressed (P = 1). Which expression describes the alarm?",
    options: [
      ["X = (W AND S) OR P", "Correct: the panic button works on its own; the window needs the armed system."],
      ["X = W AND (S OR P)", "This would need the window open even when the panic button is pressed."],
      ["X = (W OR S) AND P", "This needs the panic button every time."],
      ["X = W OR S OR P", "This would sound whenever the system is armed, even with all windows shut."],
    ],
    answer: "A",
    hints: ["Which condition is enough on its own, and which two must happen together?"],
    explanation: "The panic button alone sounds the alarm (OR P); the window sensor sounds it only if the system is armed (W AND S).",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 4,
    stem: "A water pump at a school in Chivi should run (X = 1) when the tank is low (T = 1) AND the power is available (P = 1) AND the manual shutdown is not pressed (M = 0). Write the logic expression and describe a circuit that does this.",
    points: [
      "Expression: X = T AND P AND (NOT M).",
      "A NOT gate has input M.",
      "T, P and the output of the NOT gate are inputs to AND gates (a three-input AND gate, or two AND gates).",
      "The output of the final AND gate is X.",
    ],
    modelAnswer: "X = T AND P AND (NOT M). Input M goes into a NOT gate. Input T and input P go into an AND gate, and its output and the output of the NOT gate go into a second AND gate. The output of the second AND gate is X.",
    hints: ["Write the expression first, then name each gate and say what goes into it."],
    explanation: "Each condition becomes an input; NOT is needed for the shutdown that must not be pressed.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how you can show that two logic circuits are equivalent.",
    points: [
      "Write the truth table for each circuit using the same inputs in the same order.",
      "Work out the output of each circuit for every row.",
      "If the output columns are identical in every row, the circuits are equivalent.",
    ],
    modelAnswer: "Complete a truth table for each circuit with the same input combinations in the same order. If the output of both circuits is the same for every combination, the circuits are equivalent.",
    hints: ["Think about what must be the same in every row."],
    explanation: "Equivalence means identical behaviour for all inputs.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a truth table for a circuit with five inputs is hard to write by hand.",
    points: ["It needs 2^5 = 32 rows.", "Each row needs several intermediate values, so there is a high chance of an error."],
    modelAnswer: "With five inputs there are 32 rows, and each row needs every gate worked out, so the table is long and mistakes are easy to make.",
    explanation: "The number of rows doubles with every extra input.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 3,
    stem: "A lift door at a hospital in Mutare opens (X = 1) when the lift has stopped (S = 1) and either the door button (B) is pressed or a person is detected (P). Write the expression and the number of gates of each type needed.",
    points: [
      "Expression: X = S AND (B OR P).",
      "One OR gate (inputs B and P).",
      "One AND gate (inputs S and the output of the OR gate).",
    ],
    modelAnswer: "X = S AND (B OR P). One OR gate takes B and P; one AND gate takes S and the output of the OR gate.",
    hints: ["Brackets are needed so that the OR is worked out first."],
    explanation: "The brackets show that B and P are combined before S.",
  });
  {
    const f = (a, bb, c) => L.and(L.nand(a, bb), L.or(bb, c));
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: "A control circuit at a farm in Marondera has three inputs A, B and C. Inputs A and B go into a NAND gate (output P). Inputs B and C go into an OR gate (output Q). P and Q go into an AND gate whose output is X.",
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which expression describes X?", options: [["X = (A OR B) AND (B NAND C)", "The gates are swapped between the pairs of inputs."], ["X = (A AND B) OR (B AND C)", "This uses AND and OR in the wrong places."], ["X = (A NAND B) AND (B OR C)", "Correct: P = A NAND B, Q = B OR C and X = P AND Q."], ["X = NOT (A AND B AND C)", "This ignores the OR gate."]], answer: "C", explanation: "P = A NAND B and Q = B OR C, so X = P AND Q." }),
        P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ["A", "B", "C"], fn: f, explanation: "Work out P and Q for each row and combine with AND." }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", stem: "How many of the eight rows give X = 1?", value: truthRows(["A", "B", "C"], f).filter((r) => r.out).length, explanation: "Count the 1s in the output column." }),
      ],
      hints: ["Label the outputs of the first two gates P and Q.", "Fill the table column by column."],
      explanation: "X = (A NAND B) AND (B OR C).",
    });
  }
  {
    const f = (a, bb, c) => L.or(L.and(a, L.not(c)), L.and(bb, c));
    const inputs3 = ["A", "B", "C"];
    const ones = truthRows(inputs3, f).filter((r) => r.out).length;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: "A door at a bank in Bulawayo opens (X = 1) when a staff card is read (A = 1) and the lock is not in night mode (C = 0), or when the manager's override key is turned (B = 1) and the lock is in night mode (C = 1). So `X = (A AND (NOT C)) OR (B AND C)`.",
      parts: [
        P.truth({ label: "(a)", marks: 4, stem: "Complete the truth table for X.", inputs: ["A", "B", "C"], fn: f, explanation: "X is 1 for A = 1 with C = 0, and for B = 1 with C = 1." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "In how many rows is the door open (X = 1)?", value: ones, explanation: `X is 1 in ${ones} rows.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which statement about the door is correct?", options: [["The door stays shut whenever A = 0 and B = 0, whatever C is", "Correct: each term of the expression needs A = 1 or B = 1."], ["The door opens whenever the lock is in night mode, because C = 1 makes the second term true", "The second term also needs B = 1."], ["The door opens whenever a staff card is read, because A = 1 makes the first term true", "The first term also needs C = 0."], ["The door opens whenever both terms are false, because the OR gate reverses them", "An OR gate outputs 0 when both its inputs are 0."]], answer: "A", explanation: "Each term contains A or B as an AND input, so X = 0 when A = 0 and B = 0." }),
        P.manual({ label: "(d)", marks: 2, stem: "List the types and number of gates needed to build the circuit.", points: ["One NOT gate (for C) and two AND gates.", "One OR gate to combine the outputs of the AND gates."], modelAnswer: "A NOT gate for C, two AND gates (A with NOT C, and B with C) and one OR gate to combine them: four gates." }),
      ],
      hints: ["The table has eight rows in binary order.", "Count the gates by following the expression."],
      explanation: `X is 1 in the ${ones} rows ${minterms(inputs3, f).map((m) => m.toString(2).padStart(3, "0")).join(", ")}.`,
    });
  }
  {
    const inputs = ["A", "B", "C"];
    const lamp = (a, bb, c) => L.xor(L.xor(a, bb), c);
    const ones = truthRows(inputs, lamp).filter((r) => r.out).length;
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 720,
      stem: "A stairwell lamp in a block of flats in Harare has three two-way switches A, B and C. The lamp X must change state whenever any one switch is changed. This is achieved by `X = (A XOR B) XOR C`.",
      parts: [
        P.truth({ label: "(a)", marks: 4, stem: "Complete the truth table for X.", inputs, fn: lamp, explanation: "X is 1 when an odd number of the switches are 1." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "In how many rows is the lamp on?", value: ones, explanation: `The lamp is on in ${ones} rows (those with an odd number of 1s).` }),
        P.short({ label: "(c)", marks: 1, stem: "From row 000 you change only switch A to give row 100. Does the lamp change state? Answer yes or no.", accepted: ["yes", "y"], explanation: "X is 0 for 000 and 1 for 100, so the lamp changes." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the design satisfies the requirement that changing any one switch changes the lamp.", points: ["Changing one input changes the number of 1s by exactly one.", "X is 1 when the number of 1s is odd and 0 when even.", "So the output always flips when one input is changed."], modelAnswer: "The output is 1 exactly when an odd number of inputs are 1. Changing one switch adds or removes one 1, so the count changes between odd and even, and the lamp changes state." }),
      ],
      hints: ["Write down the output for rows that differ in a single input and compare.", "Count the number of 1s in each row."],
      explanation: "A chain of XOR gates outputs 1 for an odd number of 1s, so any single change flips the output.",
    });
  }

  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A circuit is described by `X = (NOT A) AND B`. What is X when A = 0 and B = 1?",
    options: [
      ["1", "Correct: NOT 0 = 1 and 1 AND 1 = 1."],
      ["0", "This would be the output if A were 1."],
      ["A", "X is a 0 or a 1, not a letter."],
      ["B", "X is a 0 or a 1, not a letter."],
    ],
    answer: "A",
    explanation: "NOT A = NOT 0 = 1, and 1 AND B = 1 AND 1 = 1.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A heater at a clinic in Gweru must be on if the room is cold (C = 1) or the manual switch is on (M = 1), but must be off whenever the safety switch is on (S = 1). Which expression describes the heater H?",
    options: [
      ["H = (C OR M) AND (NOT S)", "Correct: either condition turns it on and S switches it off."],
      ["H = (C AND M) AND (NOT S)", "This needs both C and M."],
      ["H = (C OR M) OR (NOT S)", "This turns the heater on when S is 0 whatever C and M are."],
      ["H = (C OR M) AND S", "This turns the heater on only when S is 1."],
    ],
    answer: "A",
    hints: ["Which conditions turn it on, and which condition forces it off?"],
    explanation: "The heater needs (C OR M) to be true and the safety switch not active: (C OR M) AND (NOT S).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How many logic gates are in a circuit described by `X = (A AND B) OR (NOT C)`, if each AND, OR and NOT counts as one gate?",
    options: [
      ["3", "Correct: one AND, one NOT and one OR."],
      ["2", "This misses one of the gates."],
      ["4", "There are only three operations in the expression."],
      ["5", "This counts the inputs as well."],
    ],
    answer: "A",
    hints: ["Count each operation in the expression once."],
    explanation: "The expression uses AND, NOT and OR once each, so there are three gates.",
  });

  b.card("DEFINITION", "Logic expression", "A statement using AND, OR, NOT and other gate names that gives the output of a circuit in terms of its inputs.");
  b.card("CONCEPT", "From a circuit to a truth table", "Label the output of each gate, write the expression, then add one column per gate and fill them column by column in binary order.");
  b.card("CONCEPT", "Translating a statement", "Use AND for 'and' / 'both', OR for 'either' / 'or', NOT for 'not'. Brackets show which conditions are combined first.");
  b.card("FACT", "Rows in a truth table", "n inputs give 2^n rows: 2 inputs 4 rows, 3 inputs 8, 4 inputs 16.");
  b.card("DEFINITION", "Equivalent circuits", "Circuits that give the same output for every combination of inputs; their truth tables are identical.");
  b.card("FACT", "Order of evaluation", "Brackets first, then NOT, then AND, then OR. Write brackets to avoid ambiguity.");
  b.card("CONCEPT", "How to check that a design meets a statement", "Write the truth table of the circuit and compare each row with what the statement requires.");
  b.card("FACT", "Parity of XOR chain", "A chain of XOR gates outputs 1 when an odd number of inputs are 1.");
  b.card("CONCEPT", "Describing a circuit in words", "Name each gate type and state exactly which signals go into it and where its output goes.");
});
