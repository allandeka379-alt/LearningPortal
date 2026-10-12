// W1a: Boolean algebra and De Morgan's laws. Cambridge A Level only.
import { concept, P, L, truthRows, equivalent, minimise, minterms, chk, same } from "../lib.mjs";

const { and: AND, or: OR, not: NOT, nand: NAND, nor: NOR } = L;
const ab = ["A", "B"];
const abc = ["A", "B", "C"];
const eqv = (inputs, f, g) => (equivalent(inputs, f, g) ? 1 : 0);

concept("acs.logic.boolean-algebra", { file: "logic/boolean-algebra", keyPrefix: "logic.boolean-algebra" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "According to De Morgan's laws, which expression is equivalent to NOT (A AND B)?",
    options: [
      ["(NOT A) OR (NOT B)", "Correct: the AND becomes OR and each term is inverted."],
      ["(NOT A) AND (NOT B)", "The operation must change from AND to OR."],
      ["NOT A OR B", "Only A has been inverted."],
      ["A OR B", "Neither term has been inverted."],
    ],
    answer: "A",
    explanation: "De Morgan: NOT (A AND B) = (NOT A) OR (NOT B). Change the operation and invert each term.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The expression `A OR 1` always has the value 1, whatever the value of A.",
    answer: true,
    feedbackTrue: "Correct: this is the null (domination) law: A + 1 = 1.",
    feedbackFalse: "An OR gate with one input permanently 1 always outputs 1.",
    explanation: "Null law: A OR 1 = 1 and A AND 0 = 0.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "What is the value of the expression `A OR (NOT A)` for any value of A, as 0 or 1?",
    value: 1,
    workedSolution: "1. If A = 0 then NOT A = 1, so 0 OR 1 = 1.\n2. If A = 1 then 1 OR 0 = 1.\n3. The value is always 1 (the complement law).",
    explanation: "A OR NOT A is always 1: one of A and NOT A must be 1.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Using the absorption law, what does `A OR (A AND B)` simplify to?",
    options: [
      ["A", "Correct: whenever A is 1 the whole expression is 1, and when A is 0 the AND term is 0."],
      ["B", "B only matters when A is 1, and then the result is already 1."],
      ["A AND B", "This is the second term only."],
      ["A OR B", "This would be 1 when B = 1 and A = 0, but the original gives 0 there."],
    ],
    answer: "A",
    explanation: "Absorption law: A + A·B = A(1 + B) = A.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each Boolean law to an example of it.",
    pairs: [
      ["Idempotent law", "A AND A = A"],
      ["Complement law", "A AND (NOT A) = 0"],
      ["Identity law", "A OR 0 = A"],
      ["Null law", "A AND 0 = 0"],
    ],
    explanation: "Each law gives a simple identity involving 0, 1, a variable and its complement.",
  });
  {
    const f = (a, bb, c) => OR(OR(AND(a, bb), AND(AND(a, NOT(bb)), c)), AND(NOT(a), bb));
    const correct = (a, bb, c) => OR(AND(a, c), bb);
    const opts = [
      ["(A AND C) OR B", correct],
      ["A OR B", (a, bb) => OR(a, bb)],
      ["(A AND B) OR C", (a, bb, c) => OR(AND(a, bb), c)],
      ["B AND C", (a, bb, c) => AND(bb, c)],
    ];
    const ok = opts.map(([, g]) => eqv(abc, f, g));
    same(ok, [1, 0, 0, 0], "simplify mcq");
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "Which expression is equivalent to `(A AND B) OR (A AND (NOT B) AND C) OR ((NOT A) AND B)`?",
      options: opts.map(([t], i) => [t, ok[i] ? "Correct: B absorbs the first and third terms, and A AND (NOT B) AND C leaves A AND C." : "Its truth table differs from the original in at least one row."]),
      answer: "A",
      hints: ["The first and third terms together are B AND (A OR NOT A).", "Then use B OR (A AND (NOT B) AND C) = B OR (A AND C)."],
      explanation: "(A AND B) OR ((NOT A) AND B) = B. Then B OR (A AND (NOT B) AND C) = B OR (A AND C), because a term is absorbed when B is 1 and otherwise NOT B is 1.",
    });
  }
  b.truth({
    d: 3, skill: "APPLICATION",
    stem: "Complete the truth table for `X = NOT (A OR (NOT B))`.",
    inputs: ["A", "B"], fn: (a, bb) => NOT(OR(a, NOT(bb))),
    hints: ["Find NOT B first, then OR it with A, then invert."],
    explanation: "By De Morgan's law X = (NOT A) AND B, which is 1 only when A = 0 and B = 1.",
  });
  {
    const f = (a, bb, c) => NOT(AND(a, OR(bb, c)));
    const opts = [
      ["(NOT A) OR ((NOT B) AND (NOT C))", (a, bb, c) => OR(NOT(a), AND(NOT(bb), NOT(c)))],
      ["(NOT A) AND ((NOT B) OR (NOT C))", (a, bb, c) => AND(NOT(a), OR(NOT(bb), NOT(c)))],
      ["(NOT A) OR (NOT B) OR C", (a, bb, c) => OR(OR(NOT(a), NOT(bb)), c)],
      ["A OR ((NOT B) AND (NOT C))", (a, bb, c) => OR(a, AND(NOT(bb), NOT(c)))],
    ];
    const ok = opts.map(([, g]) => eqv(abc, f, g));
    same(ok, [1, 0, 0, 0], "demorgan mcq");
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "Use De Morgan's laws to find an expression equivalent to `NOT (A AND (B OR C))`.",
      options: opts.map(([t], i) => [t, ok[i] ? "Correct: NOT (A AND X) = (NOT A) OR (NOT X), and NOT (B OR C) = (NOT B) AND (NOT C)." : "The operations are not all changed correctly, so the truth table differs."]),
      answer: "A",
      hints: ["Apply the law to the outer AND first, then to the OR inside the bracket."],
      explanation: "NOT (A AND (B OR C)) = (NOT A) OR (NOT (B OR C)) = (NOT A) OR ((NOT B) AND (NOT C)).",
    });
  }
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the justification of each step in the simplification of `A OR ((NOT A) AND B)`.",
    template: "Step 1: A OR ((NOT A) AND B)\n\nStep 2: (A OR (NOT A)) AND (A OR B). Law: {{blank:l1}}\n\nStep 3: 1 AND (A OR B). Law: {{blank:l2}}\n\nStep 4: A OR B. Law: {{blank:l3}}",
    blanks: [
      { id: "l1", choices: ["Distributive law", "Complement law", "Identity law", "Absorption law"], accepted: ["Distributive law"] },
      { id: "l2", choices: ["Distributive law", "Complement law", "Identity law", "Absorption law"], accepted: ["Complement law"] },
      { id: "l3", choices: ["Distributive law", "Complement law", "Identity law", "Absorption law"], accepted: ["Identity law"] },
    ],
    hints: ["A OR (NOT A) = 1 is the complement law; X AND 1 = X is the identity law."],
    explanation: "The OR distributes over AND in step 2; A OR NOT A = 1 is the complement law; 1 AND X = X is the identity law.",
  });
  {
    const orFn = (a, bb) => OR(a, bb);
    const opts = [
      ["(A NAND A) NAND (B NAND B)", (a, bb) => NAND(NAND(a, a), NAND(bb, bb))],
      ["(A NAND B) NAND (A NAND B)", (a, bb) => NAND(NAND(a, bb), NAND(a, bb))],
      ["(A NAND B) NAND B", (a, bb) => NAND(NAND(a, bb), bb)],
      ["(A NAND A) NAND B", (a, bb) => NAND(NAND(a, a), bb)],
    ];
    const ok = opts.map(([, g]) => eqv(ab, orFn, g));
    same(ok, [1, 0, 0, 0], "nand or");
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: "Which expression uses only NAND gates to give `A OR B`?",
      options: opts.map(([t], i) => [t, ok[i] ? "Correct: each input is inverted by a NAND with joined inputs; NAND of the inverted inputs gives OR (De Morgan)." : "Its truth table differs from OR in at least one row."]),
      answer: "A",
      hints: ["OR = NOT (NOT A AND NOT B)."],
      explanation: "A OR B = NOT ((NOT A) AND (NOT B)) = (NOT A) NAND (NOT B), and NOT A = A NAND A.",
    });
  }
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "How many NAND gates are needed to build an OR gate if only NAND gates may be used?",
    value: 3,
    hints: ["Two gates invert the inputs; one more combines them."],
    workedSolution: "1. A NAND A gives NOT A (one gate).\n2. B NAND B gives NOT B (one gate).\n3. (NOT A) NAND (NOT B) gives A OR B (one gate).\n4. Total = 3 gates.",
    explanation: "Two NAND gates act as inverters and one combines the two results: 3 gates.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do engineers simplify a Boolean expression before building the circuit?",
    options: [
      ["A simpler expression needs fewer gates, so the circuit costs less and works faster", "Correct: fewer gates mean less cost, less power and a shorter signal delay."],
      ["The simplified circuit gives a different, more useful output", "The simplified expression must be equivalent to the original."],
      ["Simplified expressions never need to be tested", "Every circuit is tested after it is designed."],
      ["Gates cannot be joined unless the expression is simplified first", "Any expression can be built, but not as efficiently."],
    ],
    answer: "A",
    explanation: "Each term in an expression is a gate. Fewer gates means lower cost, less power and less delay, and the behaviour is unchanged.",
  });
  {
    const f = (a, bb, c) => OR(OR(AND(AND(a, NOT(bb)), c), AND(a, bb)), AND(AND(a, NOT(bb)), NOT(c)));
    chk(eqv(abc, f, (a) => a), 1);
    b.manualShort({
      d: 4, skill: "ANALYSIS", marks: 4,
      stem: "Simplify `(A AND (NOT B) AND C) OR (A AND B) OR (A AND (NOT B) AND (NOT C))`. Name the law used at each step.",
      points: [
        "Group the first and third terms and factorise: A AND (NOT B) AND (C OR (NOT C)) (distributive law).",
        "C OR (NOT C) = 1 (complement law), giving A AND (NOT B) AND 1 = A AND (NOT B) (identity law).",
        "The expression is now (A AND (NOT B)) OR (A AND B); factorise A: A AND ((NOT B) OR B) (distributive law).",
        "(NOT B) OR B = 1 and A AND 1 = A (complement and identity laws). The answer is A.",
      ],
      modelAnswer: "(A AND (NOT B) AND C) OR (A AND B) OR (A AND (NOT B) AND (NOT C)) = (A AND (NOT B) AND (C OR (NOT C))) OR (A AND B) (distributive) = (A AND (NOT B) AND 1) OR (A AND B) (complement) = (A AND (NOT B)) OR (A AND B) (identity) = A AND ((NOT B) OR B) (distributive) = A AND 1 (complement) = A (identity).",
      hints: ["Start by pairing the two terms that differ only in C.", "The result is a single variable."],
      explanation: "The three terms cover every case where A = 1: with B = 1, or B = 0 with either value of C.",
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a truth table can be used to prove that NOT (A OR B) is equivalent to (NOT A) AND (NOT B).",
    points: [
      "Write all four combinations of A and B.",
      "Work out NOT (A OR B) and (NOT A) AND (NOT B) for each row.",
      "The two output columns are identical in every row, so the expressions are equivalent.",
    ],
    modelAnswer: "List the rows 00, 01, 10 and 11 for A and B. For each row calculate NOT (A OR B) and (NOT A) AND (NOT B). Both are 1 only in the row 00 and 0 in the others, so the columns are identical and the expressions are equivalent.",
    hints: ["Say how many rows and what must be true of the two output columns."],
    explanation: "Equivalent expressions have identical output columns.",
  });
  b.manualShort({
    d: 4, skill: "CREATION", marks: 3,
    stem: "Show how `NOT (A AND B)` can be built using only NOR gates.",
    points: [
      "A NOR A gives NOT A, and B NOR B gives NOT B.",
      "NOT A and NOT B go into a NOR gate, which gives NOT ((NOT A) OR (NOT B)) = A AND B.",
      "The output of that gate is joined to both inputs of a further NOR gate, which inverts it to give NOT (A AND B).",
    ],
    modelAnswer: "Join both inputs of a NOR gate to A to give NOT A, and the same for B. These feed a third NOR gate, whose output is A AND B (De Morgan). A fourth NOR gate with its inputs joined inverts this, giving NOT (A AND B).",
    hints: ["First build AND from NOR gates, then add an inverter."],
    explanation: "NOR with joined inputs is NOT; two inverted inputs through NOR give AND; a final inverter gives NAND.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State De Morgan's two laws.",
    points: ["NOT (A AND B) = (NOT A) OR (NOT B).", "NOT (A OR B) = (NOT A) AND (NOT B)."],
    modelAnswer: "NOT (A AND B) is equal to (NOT A) OR (NOT B), and NOT (A OR B) is equal to (NOT A) AND (NOT B).",
    explanation: "In both laws the operation changes and each term is inverted.",
  });
  {
    const f = (a, bb, c) => AND(OR(a, bb), OR(NOT(a), c));
    const m = minimise(abc, minterms(abc, f));
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: "A logic circuit has inputs A, B and C. Inputs A and B go into an OR gate (output P). Input A goes into a NOT gate and its output and input C go into an OR gate (output Q). The outputs P and Q go into an AND gate, whose output is X. So `X = (A OR B) AND ((NOT A) OR C)`.",
      parts: [
        P.truth({ label: "(a)", marks: 4, stem: "Complete the truth table for X.", inputs: abc, fn: f, explanation: "Work out P and Q for each row, then X = P AND Q." }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "In how many rows is X equal to 1?", value: truthRows(abc, f).filter((r) => r.out).length, explanation: "Count the 1s in the output column." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which expression is equivalent to X?", options: [["(A AND C) OR (B AND (NOT A))", "Correct: same table."], ["(A OR C) AND (B OR C) AND B", "It differs from X in the row 110, where it gives 1 but X is 0."], ["A AND B AND C AND (A OR B)", "This is 1 in only one row."], ["(A AND B) OR C", "This differs from X in several rows."]], answer: "A", explanation: `The simplified form from the truth table is ${m.expression}.` }),
      ],
      hints: ["Fill the table column by column: P, Q, then X.", "Compare the options by testing a row where X = 1."],
      explanation: `X = ${m.expression}.`,
    });
  }
  {
    const f = (a, bb) => NOT(OR(AND(a, bb), NOT(a)));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: "A circuit is described by `X = NOT ((A AND B) OR (NOT A))`.",
      parts: [
        P.truth({ label: "(a)", marks: 4, stem: "Complete the truth table for X.", inputs: ab, fn: f, explanation: "(A AND B) OR NOT A is 0 only when A = 1 and B = 0; X is the inverse." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which single expression is equivalent to X?", options: [["A AND (NOT B)", "Correct: X is 1 only when A = 1 and B = 0."], ["A AND B", "This is 1 for A = 1, B = 1, where X is 0."], ["(NOT A) AND B", "This is 1 for A = 0, B = 1, where X is 0."], ["A OR B", "This is 1 for three rows."]], answer: "A", explanation: "From the truth table X is 1 only for A = 1, B = 0." }),
        P.manual({ label: "(c)", marks: 3, stem: "Use De Morgan's law and other laws to show algebraically that the expression simplifies to your answer to part (b).", points: ["De Morgan: NOT (P OR Q) = (NOT P) AND (NOT Q), giving (NOT (A AND B)) AND A.", "De Morgan again: ((NOT A) OR (NOT B)) AND A.", "Distribute: (NOT A AND A) OR (NOT B AND A) = 0 OR (A AND NOT B) = A AND (NOT B)."], modelAnswer: "NOT ((A AND B) OR (NOT A)) = (NOT (A AND B)) AND (NOT (NOT A)) = ((NOT A) OR (NOT B)) AND A = ((NOT A) AND A) OR ((NOT B) AND A) = 0 OR (A AND (NOT B)) = A AND (NOT B)." }),
      ],
      hints: ["Apply De Morgan's law to the whole expression first.", "Remember that A AND (NOT A) = 0."],
      explanation: "X = A AND (NOT B).",
    });
  }
  {
    const f = (a, bb, c) => NOT(AND(NOT(a), OR(bb, NOT(c))));
    const nandForm = (a, bb, c) => NAND(NOT(a), NAND(NOT(bb), c));
    chk(eqv(abc, f, nandForm), 1);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 720,
      stem: "A designer wants to build the expression `X = NOT ((NOT A) AND (B OR (NOT C)))` using only NAND gates.",
      parts: [
        P.manual({ label: "(a)", marks: 3, stem: "Apply De Morgan's laws to rewrite X without any OR gates, using only AND, NOT and the outer inversion.", points: ["B OR (NOT C) = NOT ((NOT B) AND C) by De Morgan.", "So X = NOT ((NOT A) AND NOT ((NOT B) AND C)).", "The inner part NOT ((NOT B) AND C) is (NOT B) NAND C."], modelAnswer: "B OR (NOT C) = NOT((NOT B) AND C). So X = NOT((NOT A) AND ((NOT B) NAND C)) = (NOT A) NAND ((NOT B) NAND C)." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which expression uses NAND gates for every operation, with NOT A written as (A NAND A)?", options: [["(A NAND A) NAND (((B NAND B)) NAND C)", "Correct: NOT A = A NAND A and NOT B = B NAND B; X = (NOT A) NAND ((NOT B) NAND C)."], ["(A NAND A) NAND (B NAND C)", "The input B must be inverted first."], ["A NAND ((B NAND B) NAND C)", "The input A must be inverted first."], ["(A NAND A) NAND (B NAND B NAND C)", "A NAND gate has two inputs, so this is not a valid expression."]], answer: "A", explanation: "Replace each NOT by a NAND with joined inputs." }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "How many NAND gates does the expression in part (b) need?", value: 4, explanation: "A NAND A, B NAND B, (B NAND B) NAND C, and the final NAND: four gates." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe how you would check that the NAND-only circuit has the same behaviour as the original expression.", points: ["Write the truth table for the original expression (eight rows).", "Write the truth table for the NAND-only expression with the same input order.", "The output columns must be identical in every row."], modelAnswer: "Complete an eight-row truth table for each version using the same order of A, B and C. If the two output columns match in every row the circuits are equivalent." }),
      ],
      hints: ["De Morgan: NOT (P OR Q) = (NOT P) AND (NOT Q) and NOT (P AND Q) = (NOT P) OR (NOT Q).", "A NAND A is NOT A."],
      explanation: "X = (NOT A) NAND ((NOT B) NAND C); with inverters made from NAND gates it uses four gates.",
    });
  }

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does `NOT (NOT A)` simplify to?",
    options: [
      ["A", "Correct: two inversions cancel (double negation)."],
      ["NOT A", "One inversion has been lost."],
      ["0", "The result depends on A."],
      ["1", "The result depends on A."],
    ],
    answer: "A",
    explanation: "Inverting twice returns the original value: NOT (NOT A) = A.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which law is shown by `A OR A = A`?",
    options: [
      ["Idempotent law", "Correct: repeating a variable with OR or AND gives the variable."],
      ["Complement law", "The complement law involves A and NOT A."],
      ["Absorption law", "Absorption involves a second variable."],
      ["Distributive law", "The distributive law involves three terms."],
    ],
    answer: "A",
    explanation: "A OR A = A and A AND A = A are the idempotent laws.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Using the distributive law, which expression is equivalent to `A AND (B OR C)`?",
    options: [
      ["(A AND B) OR (A AND C)", "Correct: AND distributes over OR."],
      ["(A OR B) AND (A OR C)", "This is the other distributive law, for A OR (B AND C)."],
      ["(A AND B) AND (A AND C)", "This is A AND B AND C, which needs both B and C."],
      ["A OR (B AND C)", "The operations have been swapped."],
    ],
    answer: "A",
    hints: ["Multiply A into each term of the bracket."],
    explanation: "A AND (B OR C) = (A AND B) OR (A AND C).",
  });

  b.card("DEFINITION", "De Morgan's laws", "NOT (A AND B) = (NOT A) OR (NOT B); NOT (A OR B) = (NOT A) AND (NOT B). Change the operation and invert each term.");
  b.card("FACT", "Complement law", "A AND (NOT A) = 0 and A OR (NOT A) = 1.");
  b.card("FACT", "Identity and null laws", "Identity: A AND 1 = A, A OR 0 = A. Null: A AND 0 = 0, A OR 1 = 1.");
  b.card("FACT", "Idempotent law", "A AND A = A and A OR A = A.");
  b.card("FACT", "Absorption law", "A OR (A AND B) = A and A AND (A OR B) = A.");
  b.card("FACT", "Distributive law (two forms)", "A AND (B OR C) = (A AND B) OR (A AND C); A OR (B AND C) = (A OR B) AND (A OR C).");
  b.card("CONCEPT", "Why simplify a Boolean expression?", "Fewer gates: lower cost, less power and a faster circuit, with exactly the same behaviour.");
  b.card("CONCEPT", "Making NOT, AND and OR from NAND", "NOT A = A NAND A. A AND B = (A NAND B) NAND (A NAND B). A OR B = (A NAND A) NAND (B NAND B).");
  b.card("CONCEPT", "How to prove two expressions equivalent", "Apply Boolean laws step by step (naming each law), or show identical truth tables.");
});
