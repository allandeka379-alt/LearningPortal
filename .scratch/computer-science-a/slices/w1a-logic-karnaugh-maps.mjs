// W1a: Karnaugh maps. Cambridge A Level only.
import { concept, P, L, truthRows, equivalent, minimise, minterms, toBase, mdTable, chk, same } from "../lib.mjs";

const GRAY = ["00", "01", "11", "10"];
function kmap(inputs, ones, dcs = []) {
  const n = inputs.length;
  const rowBits = n === 4 ? 2 : 1;
  const colBits = n - rowBits;
  const rowLabels = rowBits === 2 ? GRAY : ["0", "1"];
  const colLabels = colBits === 2 ? GRAY : ["0", "1"];
  const rows = rowLabels.map((rl) => [rl, ...colLabels.map((cl) => {
    const m = parseInt(rl + cl, 2);
    return ones.includes(m) ? 1 : dcs.includes(m) ? "X" : 0;
  })]);
  return mdTable([`${inputs.slice(0, rowBits).join("")} ↓ / ${inputs.slice(rowBits).join("")} →`, ...colLabels], rows);
}
const fnOf = (n, ones) => (...v) => (ones.includes(parseInt(v.join(""), 2)) ? 1 : 0);
const abc = ["A", "B", "C"];
const abcd = ["A", "B", "C", "D"];
const bin = (m, n) => toBase(m, 2, n);

concept("acs.logic.karnaugh-maps", { file: "logic/karnaugh-maps", keyPrefix: "logic.karnaugh-maps" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which order are the row and column labels written on a Karnaugh map for two variables?",
    options: [
      ["00, 01, 11, 10 (Gray code)", "Correct: only one variable changes between neighbouring cells."],
      ["00, 01, 10, 11 (binary order)", "In binary order two bits change between 01 and 10."],
      ["11, 10, 01, 00 (reverse binary)", "This is just binary counting backwards; two bits change between 10 and 01."],
      ["Any order, as long as every label is used", "The order matters because neighbouring cells must differ in one variable."],
    ],
    answer: "A",
    explanation: "Gray code makes each label differ from the next in one bit, so adjacent cells can be merged.",
  });
  b.num({
    d: 2, skill: "RECALL", daily: true, calculator: false,
    stem: "How many cells does a Karnaugh map for four variables have?",
    value: 16,
    workedSolution: "1. Four variables have 2^4 combinations.\n2. 2^4 = 16 cells.",
    explanation: "One cell for each combination of the inputs: 2^4 = 16.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A group of three adjacent 1s may be drawn on a Karnaugh map.",
    answer: false,
    feedbackTrue: "Groups must contain 1, 2, 4, 8 or 16 cells.",
    feedbackFalse: "Correct: group sizes are powers of 2; three adjacent 1s must be covered by a group of two and another group that overlaps.",
    explanation: "A group of size 2^k removes exactly k variables, so sizes are 1, 2, 4, 8, 16.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: false,
    stem: "In a Karnaugh map for four variables, a group of 8 cells is formed. How many of the four variables appear in the term for that group?",
    value: 1,
    workedSolution: "1. A group of 2^k cells removes k variables.\n2. 8 = 2^3, so 3 variables are removed.\n3. 4 − 3 = 1 variable remains.",
    explanation: "A group of 8 cells removes 3 variables, leaving 1.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a four-variable Karnaugh map, match the size of a group to the number of variables left in its term.",
    pairs: [
      ["A single cell", "4 variables"],
      ["A group of 2 cells", "3 variables"],
      ["A group of 4 cells", "2 variables"],
      ["A group of 8 cells", "1 variable"],
    ],
    explanation: "Each doubling of the group removes one more variable from the term.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the column labels for the K-map of a two-variable expression written in Gray code order.",
    template: "00, 01, {{blank:c3}}, {{blank:c4}}",
    blanks: [{ id: "c3", accepted: ["11"], choices: ["10", "11", "00"] }, { id: "c4", accepted: ["10"], choices: ["10", "11", "00"] }],
    hints: ["Each label differs from the one before it in exactly one bit."],
    explanation: "After 01 the next label that changes one bit is 11, and then 10.",
  });
  {
    const ones = [1, 2, 5, 6];
    const f = fnOf(3, ones);
    const m = minimise(abc, ones);
    const opts = [
      ["(B AND NOT C) OR (NOT B AND C)", (a, bb, c) => L.or(L.and(bb, L.not(c)), L.and(L.not(bb), c))],
      ["(B AND C) OR (NOT B AND NOT C)", (a, bb, c) => L.or(L.and(bb, c), L.and(L.not(bb), L.not(c)))],
      ["B OR C", (a, bb, c) => L.or(bb, c)],
      ["A AND (B OR C)", (a, bb, c) => L.and(a, L.or(bb, c))],
    ];
    const ok = opts.map(([, g]) => (equivalent(abc, f, g) ? 1 : 0));
    same(ok, [1, 0, 0, 0], "kmap mcq 1");
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `The Karnaugh map for an expression X is shown.\n\n${kmap(abc, ones)}\n\nWhich expression is the simplified form of X?`,
      options: opts.map(([t], i) => [t, ok[i] ? "Correct: the pairs 001 + 101 and 010 + 110 give these terms." : "Its truth table does not match the map in at least one cell."]),
      answer: "A",
      hints: ["Look for pairs of adjacent 1s, including cells in the first and last columns.", "In each pair, keep the variables that stay the same."],
      explanation: `The 1s in cells 001 and 101 give NOT B AND C (A changes). The 1s in cells 010 and 110 give B AND NOT C. X = ${m.expression}.`,
    });
  }
  {
    const ones = [0, 1, 4, 5, 10, 11, 14, 15];
    const f = fnOf(4, ones);
    const opts = [
      ["(A AND C) OR (NOT A AND NOT C)", (a, bb, c, d) => L.or(L.and(a, c), L.and(L.not(a), L.not(c)))],
      ["(A AND NOT C) OR (NOT A AND C)", (a, bb, c, d) => L.or(L.and(a, L.not(c)), L.and(L.not(a), c))],
      ["(B AND D) OR (NOT B AND NOT D)", (a, bb, c, d) => L.or(L.and(bb, d), L.and(L.not(bb), L.not(d)))],
      ["A OR C", (a, bb, c, d) => L.or(a, c)],
    ];
    const ok = opts.map(([, g]) => (equivalent(abcd, f, g) ? 1 : 0));
    same(ok, [1, 0, 0, 0], "kmap mcq 2");
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: `The Karnaugh map for a four-variable expression X is shown.\n\n${kmap(abcd, ones)}\n\nWhich expression is the simplified form of X?`,
      options: opts.map(([t], i) => [t, ok[i] ? "Correct: the top-left block gives NOT A AND NOT C and the bottom-right block gives A AND C." : "Its truth table does not match the map."]),
      answer: "A",
      hints: ["Look for two blocks of four cells.", "For each block find which variables do not change."],
      explanation: "The block of cells 0000, 0001, 0100, 0101 has A = 0 and C = 0. The block 1010, 1011, 1110, 1111 has A = 1 and C = 1.",
    });
  }
  {
    const ones = [1, 3, 9, 11, 4, 6, 12, 14];
    const m = minimise(abcd, ones);
    same(m.terms.slice().sort(), ["B AND NOT D", "NOT B AND D"], "wrap");
    b.num({
      d: 3, skill: "ANALYSIS", calculator: false,
      stem: `A four-variable Karnaugh map is shown.

${kmap(abcd, ones)}

The four 1s in the rows AB = 01 and AB = 11, in the columns CD = 00 and CD = 10, form one group using wrap-around. How many variables appear in the term for this group?`,
      value: 2,
      hints: ["Find which variables have the same value in all four cells."],
      workedSolution: "1. In the four cells B is 1 and D is 0 in every cell.\n2. A and C change.\n3. The term is B AND NOT D, which has 2 variables.",
      explanation: "B = 1 and D = 0 throughout the group, so the term is B AND NOT D with 2 variables.",
    });
  }
  {
    const ones = [1, 5, 9, 13, 3, 7], dcs = [0, 15];
    const m = minimise(abcd, ones, dcs);
    same(m.terms.slice().sort(), ["NOT A AND D", "NOT C AND D"], "dc1");
    b.mcq({
      d: 4, skill: "ANALYSIS",
      stem: `The Karnaugh map for X is shown. A cell marked X is a don't care condition.\n\n${kmap(abcd, ones, dcs)}\n\nWhich is the simplest expression for X?`,
      options: [
        ["(NOT A AND D) OR (NOT C AND D)", "Correct: cells 0001, 0011, 0101, 0111 give NOT A AND D and cells 0001, 0101, 1001, 1101 give NOT C AND D."],
        ["D", "D would also be 1 for cell 1011, which is a 0 in the map."],
        ["(NOT A AND NOT B AND NOT C) OR (B AND D)", "This misses the 1s in cells 0011 and 1001."],
        ["NOT C AND D", "This does not cover the 1s in cells 0011 and 0111."],
      ],
      answer: "A",
      hints: ["Find the largest groups of 1s; use a don't care only if it makes a group larger.", "Test D alone against the cells that are 0."],
      explanation: "The 1s are in cells with D = 1 and either A = 0 or C = 0. The don't care cells 0000 and 1111 are not needed in any group.",
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "What is the purpose of a don't care condition (X) in a Karnaugh map?",
    options: [
      ["It may join a group if that enlarges it, or be ignored", "Correct: it lets the designer choose 0 or 1 to get the simplest expression."],
      ["It must always be included in some group in case it is really a 1", "A don't care need not be covered by any group."],
      ["It shows that the circuit contains an error for that row of inputs", "It means the output for that input does not matter."],
      ["It must be treated as a 0 in every map that has one", "A don't care can be either 0 or 1, whichever helps."],
    ],
    answer: "A",
    hints: ["Think about why the designer does not care about those cells."],
    explanation: "Because the output does not matter, the cell may be taken as 1 to enlarge a group, or ignored.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are the row and column labels of a Karnaugh map written in Gray code?",
    options: [
      ["So neighbouring cells differ in one variable", "Correct: this is what makes the simplification by grouping work."],
      ["So that the whole map takes up less space on the paper", "The size of the map is the same."],
      ["So that the cells run in the numerical order of the minterms", "In Gray code the minterm numbers are not in order along a row."],
      ["So that no row of the map has more than one 1 in it", "A map can have any number of 1s."],
    ],
    answer: "A",
    explanation: "Adjacent cells differing in one variable means that a pair of 1s can be combined, removing that variable.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "State three rules for forming groups on a Karnaugh map.",
    points: [
      "Groups must contain 1, 2, 4, 8 or 16 cells, forming a rectangle of adjacent cells.",
      "Groups may wrap around the edges of the map and may overlap.",
      "Every 1 must be in a group, and each group should be as large as possible (with the fewest groups).",
    ],
    modelAnswer: "A group must be a rectangle of adjacent cells containing 1, 2, 4, 8 or 16 cells. Groups can wrap round the edges and can overlap. All 1s must be covered, using as few and as large groups as possible.",
    hints: ["Think about the size, the shape and the coverage of groups."],
    explanation: "These are the standard grouping rules.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Give three benefits of using a Karnaugh map instead of Boolean algebra to simplify an expression.",
    points: [
      "It shows the groupings visually, so patterns can be found quickly.",
      "The method is systematic and does not depend on spotting which law to use.",
      "It is less likely that a possible simplification is missed or that a mistake is made.",
    ],
    modelAnswer: "A map shows the adjacent 1s at a glance, so it is quicker. It follows fixed rules for grouping, so it does not rely on the user guessing which algebraic law to apply next. This makes errors and missed simplifications less likely.",
    hints: ["Compare speed, method and reliability."],
    explanation: "A Karnaugh map turns simplification into a visual, rule-based task.",
  });
  {
    const ones = [3, 7, 11, 15, 12, 13];
    const m = minimise(abcd, ones);
    b.manualShort({
      d: 4, skill: "ANALYSIS", marks: 4,
      stem: `A four-variable expression is shown on this Karnaugh map.

${kmap(abcd, ones)}

List the groups that you would draw, giving the rows and columns that each covers, and write the simplified expression.`,
      points: [
        "A group of four cells 0011, 0111, 1011, 1111 (C = 1, D = 1).",
        "The term for this group is C AND D.",
        "A group of the remaining cells 1100 and 1101 (A = 1, B = 1, C = 0), giving A AND B AND NOT C.",
        "Expression: (C AND D) OR (A AND B AND NOT C).",
      ],
      modelAnswer: "Group 1 is the four cells 0011, 0111, 1011, 1111 where C = 1 and D = 1, so the term is C AND D. Group 2 is the pair 1100 and 1101 where A = 1, B = 1 and C = 0 (D changes), so the term is A AND B AND NOT C. X = (C AND D) OR (A AND B AND NOT C).",
      hints: ["The largest group is a column of four cells.", "Cell 1111 can also be used for a pair with 1101, but this is not the simplest cover."],
      explanation: `The simplified expression is ${m.expression}.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how a don't care condition can make the simplified expression shorter. Use an example from a BCD digit decoder.",
    points: [
      "In BCD the inputs 1010 to 1111 never occur, so the output for them does not matter.",
      "These cells can be treated as 1s to make a group larger.",
      "A larger group removes more variables, so the term is shorter and fewer gates are needed.",
    ],
    modelAnswer: "A BCD digit decoder never receives the patterns 1010 to 1111, so those outputs are don't cares. They can be used as 1s to make groups larger, and a larger group has fewer variables in its term, so the circuit needs fewer gates.",
    hints: ["Say which cells are don't cares and what you do with them."],
    explanation: "Don't cares give extra freedom in grouping.",
  });
  {
    const ones = [0, 2, 3, 8, 10, 11];
    const f = fnOf(4, ones);
    const m = minimise(abcd, ones);
    const rows = truthRows(abcd, f).filter((r) => r.out).length;
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: `A controller at a bottling plant in Mutare has four inputs A, B, C and D. Its output X is 1 for the input combinations marked 1 on the Karnaugh map for X, and 0 for every other combination.

${kmap(abcd, ones)}`,
      parts: [
        P.num({ label: "(a)", marks: 1, type: "CALCULATION", stem: "How many cells of the map contain a 1?", value: rows, explanation: `The 1s are in ${rows} cells.` }),
        P.mcq({ label: "(b)", marks: 2, stem: "Which expression is the simplified form of X?", options: [["(NOT B AND NOT D) OR (NOT B AND C)", "Correct: the corner group gives NOT B AND NOT D; the group 0011, 0010, 1011, 1010 gives NOT B AND C."], ["(NOT B AND D) OR (B AND NOT C)", "This does not match the cells containing a 1."], ["NOT B", "NOT B would also be 1 for cell 0001, which is a 0 in the map."], ["(NOT A AND NOT C) OR (B AND D)", "This is 1 for cells that are 0 in the map."]], answer: "A", explanation: `X = ${m.expression}.` }),
        P.manual({ label: "(c)", marks: 3, stem: "Describe the two groups used, giving the cells in each group.", points: ["Group 1: the four corner cells 0000, 0010, 1000, 1010 (B = 0, D = 0) using wrap-around.", "Group 2: the cells 0010, 0011, 1010, 1011 (B = 0, C = 1).", "The two groups overlap in cells 0010 and 1010, which is allowed."], modelAnswer: "Group 1 is the four corners 0000, 0010, 1000 and 1010, where B and D are both 0. Group 2 is the four cells 0010, 0011, 1010 and 1011, where B is 0 and C is 1. The groups overlap in two cells." }),
      ],
      hints: ["Look at the corners and at the cells next to them.", "Check that every 1 is in a group."],
      explanation: `The simplified expression is ${m.expression}.`,
    });
  }
  {
    const ones = [4, 5, 6, 7, 12, 13, 14, 15, 0, 8];
    const m = minimise(abcd, ones);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: `A safety system has four sensor inputs A, B, C and D. Its output X is 1 when B is 1, or when both C and D are 0. The Karnaugh map for X is:\n\n${kmap(abcd, ones)}`,
      parts: [
        P.mcq({ label: "(a)", marks: 1, stem: "Which cells make the group for the term B?", options: [["Only the four corner cells of the map", "The corners have B = 0 or B = 1 and give a different term."], ["The eight cells in the two middle rows", "Correct: the rows AB = 01 and AB = 11 have B = 1 and form one group of eight."], ["The left-hand column of the map", "The left-hand column is C = 0 and D = 0."], ["The cells in the top row only", "The top row has A = 0 and B = 0."]], answer: "B", explanation: "A group of 8 cells with B = 1 removes three variables." }),
        P.manual({ label: "(b)", marks: 2, stem: "Describe the second group and its term.", points: ["The group of cells where C = 0 and D = 0 (the left-hand column: 0000, 0100, 1100, 1000).", "The term is NOT C AND NOT D."], modelAnswer: "The left-hand column of four cells 0000, 0100, 1100 and 1000, in which C = 0 and D = 0. The term is NOT C AND NOT D." }),
        P.short({ label: "(c)", marks: 2, stem: "Write the simplified expression for X, using AND, OR and NOT.", accepted: ["B OR (NOT C AND NOT D)", "B OR NOT C AND NOT D", "(NOT C AND NOT D) OR B", "NOT C AND NOT D OR B"], explanation: `X = ${m.expression}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "The cell 1100 is in both groups. Explain why this is allowed and whether it changes the expression.", points: ["Groups are allowed to overlap.", "A cell that is 1 can be covered by more than one group.", "The expression is the OR of the terms, so a cell covered twice does not change the output."], modelAnswer: "Groups may overlap, because each group only has to cover 1s and the final expression is the OR of the terms. A cell covered twice still gives 1, so the expression is not changed." }),
      ],
      hints: ["The row labels are AB and the column labels are CD.", "A group with B = 1 spans two rows of the map."],
      explanation: `X = ${m.expression}.`,
    });
  }
  {
    const ones = [2, 6, 10, 14, 3, 7, 11], dcs = [15, 13];
    const m = minimise(abcd, ones, dcs);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true, secs: 720,
      stem: `A decoder for a four-bit code (A is the most significant bit) has the Karnaugh map shown. A cell marked 1 must give X = 1. A cell marked X is a don't care condition: that code never occurs.

${kmap(abcd, ones, dcs)}`,
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "How many cells are 1s or don't cares in total?", value: ones.length + dcs.length, explanation: `${ones.length} ones plus ${dcs.length} don't cares.` }),
        P.manual({ label: "(b)", marks: 3, stem: "Describe how the don't care cells are used to form the group for the simplest expression.", points: ["The eight cells where C = 1 form one group.", "The don't care cell 1111 is included, so the group is a complete block of eight.", "The group needs only the variable C."], modelAnswer: "All eight cells in which C = 1 are grouped. This group includes the don't care cell 1111, treated as a 1, which makes the block complete. Every cell in the group has C = 1, so the term is just C." }),
        P.short({ label: "(c)", marks: 1, stem: "Write the simplified expression for X.", accepted: ["C"], explanation: `X = ${m.expression}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how the answer would be different if the don't care cells were not used, and why the designer prefers the answer using them.", points: ["Without the don't care cells, the 1s would need smaller groups (several terms with more variables).", "The expression would need more gates.", "Using the don't cares gives a single variable and so a much simpler and cheaper circuit."], modelAnswer: "Without the don't care cells the 1s could not form one group of eight, so the expression would need several terms with more than one variable each, and more gates. Using the don't cares gives X = C, which needs no gates at all, so it is simpler and cheaper." }),
      ],
      hints: ["Count the cells where C = 1.", "Compare the group sizes with and without the don't care cells."],
      explanation: `With the don't care cells X = ${m.expression}.`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a three-variable Karnaugh map, a group of four adjacent 1s is formed. How many variables appear in the term for this group?",
    options: [
      ["1", "Correct: a group of 4 removes 2 of the 3 variables."],
      ["2", "That would be the term for a group of 2."],
      ["3", "A single cell gives a term with all 3 variables."],
      ["0", "A term with no variables corresponds to all 8 cells."],
    ],
    answer: "A",
    explanation: "A group of 2^k cells removes k variables: 4 = 2^2 removes 2, leaving 1 of the 3.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A group in a three-variable Karnaugh map covers the two cells in which A = 1 and C = 0 (B is 0 in one cell and 1 in the other). What is the term for this group?",
    options: [
      ["A AND (NOT C)", "Correct: A and C are the same in both cells; B changes and is left out."],
      ["A AND B AND (NOT C)", "B changes between the cells, so it must be left out."],
      ["A OR (NOT C)", "A group gives an AND term, not an OR."],
      ["(NOT A) AND C", "A is 1 and C is 0 in the cells, so the letters are inverted wrongly."],
    ],
    answer: "A",
    hints: ["Which variables have the same value in both cells?"],
    explanation: "A = 1 and C = 0 in both cells, so the term is A AND NOT C.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Every cell of a three-variable Karnaugh map contains a 1. What is the simplified expression?",
    options: [
      ["1", "Correct: one group of all 8 cells removes all three variables."],
      ["0", "A map full of 0s would give 0."],
      ["A OR B OR C", "This would be 0 when all three inputs are 0."],
      ["A AND B AND C", "This would be 1 in only one cell."],
    ],
    answer: "A",
    explanation: "A single group of eight cells has no variable that stays constant, so the term is the constant 1.",
  });

  b.card("DEFINITION", "Karnaugh map", "A grid of the truth table arranged in Gray code so that neighbouring cells differ in one variable; used to simplify logic expressions.");
  b.card("DEFINITION", "Gray code", "A sequence in which each value differs from the next in one bit (00, 01, 11, 10).");
  b.card("CONCEPT", "Rules for grouping 1s in a K-map", "Rectangles of 1, 2, 4, 8 or 16 adjacent cells; may wrap round the edges and corners; may overlap; cover every 1 with the fewest, largest groups.");
  b.card("CONCEPT", "Term for a group", "Keep the variables that stay the same in every cell of the group (inverted if 0); drop the variables that change. OR the terms together.");
  b.card("FACT", "Size of group and variables removed", "A group of 2^k cells removes k variables (4 cells remove 2).");
  b.card("DEFINITION", "Don't care condition", "An input combination that cannot occur or whose output does not matter (X); it may be treated as 0 or 1 to make groups larger.");
  b.card("FACT", "Number of cells in a K-map", "2^n cells for n variables: 4 for two variables, 8 for three, 16 for four.");
  b.card("CONCEPT", "Benefits of K-maps over algebra", "Visual and systematic, quicker, and less likely to miss a simplification.");
  b.card("CONCEPT", "Wrap-around", "Cells on opposite edges of the map, and the four corners, are neighbours and can be grouped.");
});
