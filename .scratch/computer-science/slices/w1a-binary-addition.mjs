// W1a: adding positive 8-bit binary integers; overflow.
import { concept, P, toBase, fromBase, addBinary } from "../lib.mjs";

const d = (s) => fromBase(s, 2);
const sum = (a, c, w = 8) => addBinary(a, c, w);

concept("comp.data.binary-addition", { file: "data/binary-addition", keyPrefix: "data.binary-addition" }, (b) => {
  {
    const [x, y] = ["00100110", "00011001"]; // no carries clash
    const r = sum(x, y);
    b.bits({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: `Add the 8-bit binary numbers **${x}** and **${y}**. Give your answer as an 8-bit binary number.`,
      value: r.value, width: 8, wrong: ["00111110", "00111101"].filter((w) => w !== r.sum),
      explanation: `No column has two 1s, so there are no carries: ${r.sum}. Check: $${d(x)} + ${d(y)} = ${r.value}$.`,
    });
  }
  {
    const [x, y] = ["01011011", "00100110"];
    const r = sum(x, y);
    b.bits({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Add the 8-bit binary numbers **${x}** and **${y}**. Give your answer as an 8-bit binary number.`,
      value: r.value, width: 8,
      hints: ["Start with the right-hand column.", "1 + 1 = 10: write 0 and carry 1; 1 + 1 + 1 = 11: write 1 and carry 1."],
      explanation: `Column addition with carries gives ${r.sum}. Check in denary: $${d(x)} + ${d(y)} = ${r.value}$.`,
    });
  }
  {
    const [x, y] = ["01110111", "00111101"];
    const r = sum(x, y);
    b.bits({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Add **${x}** and **${y}**. Give your answer as an 8-bit binary number.`,
      value: r.value, width: 8,
      hints: ["There are several carries in a row; write each one above the next column.", "Check by converting all three numbers to denary."],
      explanation: `The answer is ${r.sum}. Check: $${d(x)} + ${d(y)} = ${r.value}$, which is at most 255, so there is no overflow.`,
    });
  }
  {
    const [x, y, z] = ["00010101", "00001110", "00000111"];
    const v = d(x) + d(y) + d(z);
    b.bits({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: `Add the three binary numbers **${x}**, **${y}** and **${z}**. Give your answer as an 8-bit binary number.`,
      value: v, width: 8,
      hints: ["Add the first two numbers, then add the third to your result.", "Or add all three in each column: 1 + 1 + 1 = 11."],
      explanation: `${x} + ${y} = ${sum(x, y).sum}; then ${sum(x, y).sum} + ${z} = ${toBase(v, 2, 8)}. Check: $${d(x)} + ${d(y)} + ${d(z)} = ${v}$.`,
    });
  }
  {
    const [x, y] = ["10101100", "01100101"];
    const r = sum(x, y);
    b.bits({
      d: 4, skill: "ANALYSIS", calculator: false,
      stem: `The 8-bit numbers **${x}** and **${y}** are added in an 8-bit register. What 8 bits are left in the register?`,
      value: d(r.sum), width: 8, wrong: [toBase(r.value, 2), "11111111"],
      hints: ["Work out the full 9-bit answer first.", "The register keeps only the 8 right-hand bits."],
      explanation: `The full sum is ${toBase(r.value, 2)} ($${d(x)} + ${d(y)} = ${r.value}$), which needs 9 bits. The register keeps ${r.sum} (${d(r.sum)}) and an overflow occurs.`,
    });
  }
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In binary addition, what is **1 + 1**?",
    options: [
      ["10 (write 0, carry 1)", "Correct: 2 in binary is 10."],
      ["2 (write 2)", "Binary has no digit 2."],
      ["11 (write 1, carry 1)", "11 is 3, the result of 1 + 1 + 1."],
      ["1 (write 1, no carry)", "That would be 0 + 1 or 1 + 0."],
    ],
    answer: "A",
    explanation: "1 + 1 = 2 = binary 10: write 0 in this column and carry 1 to the next.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A column contains 1 + 1 and a carry of 1 from the previous column. What is written in the column and what is carried?",
    options: [
      ["Write 1, carry 1", "Correct: 1 + 1 + 1 = 3 = binary 11."],
      ["Write 0, carry 1", "That is for a total of 2 (binary 10)."],
      ["Write 1, carry 0", "That is for a total of 1."],
      ["Write 3, carry 0", "Binary uses only 0 and 1; 3 is written 11."],
    ],
    answer: "A",
    explanation: "Three 1s total 3, which is 11 in binary: write 1 and carry 1.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which result of adding two numbers would cause an **overflow** in an 8-bit register?",
    options: [
      ["260", "Correct: 260 is greater than 255, the largest 8-bit value."],
      ["255", "255 = 11111111 fits exactly in 8 bits."],
      ["128", "128 = 10000000 fits in 8 bits."],
      ["200", "200 = 11001000 fits in 8 bits."],
    ],
    answer: "A",
    explanation: "An 8-bit register holds 0 to 255. Any result above 255 needs a ninth bit, so it overflows.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", calculator: false,
    stem: "Which pair of 8-bit numbers will cause an overflow when added in an 8-bit register?",
    options: [
      ["10000000 and 10000001", "Correct: 128 + 129 = 257, which is greater than 255."],
      ["01111111 and 01111111", "127 + 127 = 254, which fits."],
      ["11110000 and 00001111", "240 + 15 = 255, the largest value that fits."],
      ["11000000 and 00111111", "192 + 63 = 255, which fits exactly."],
    ],
    answer: "A",
    hints: ["Convert each pair to denary and add.", "Overflow means the sum is more than 255."],
    explanation: "Only 128 + 129 = 257 exceeds 255; the other sums are 254 and 255.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does an overflow error occur in binary addition?",
    options: [
      ["The register has a fixed number of bits and the result needs more", "Correct: the extra bit has nowhere to go, so it is lost."],
      ["The two numbers being added have different numbers of 1s", "The number of 1s does not matter; only the size of the result does."],
      ["The processor cannot add more than two 1s in one column", "Columns with three 1s are normal: write 1, carry 1."],
      ["Binary numbers are always converted to denary before adding", "The ALU adds directly in binary."],
    ],
    answer: "A",
    hints: ["Think about the size of a register."],
    explanation: "A register stores a fixed number of bits. If a result is larger than the maximum (255 for 8 bits), the carry out of the leftmost column is lost and the stored value is wrong.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "When an overflow occurs in an 8-bit register, the value stored is still the correct sum.",
    answer: false,
    explanation: "False. The ninth bit is lost, so the stored value is the true sum minus 256: it is wrong.",
  });
  b.tf({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: "Adding 01111111 and 00000001 in an 8-bit register causes an overflow.",
    answer: false,
    explanation: "False. $127 + 1 = 128 = 10000000$, which fits in 8 bits. There are many carries, but nothing is carried out of the 128s column.",
  });
  {
    const [x, y] = ["00101011", "00011010"];
    const r = sum(x, y);
    b.fib({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Tendai adds **${x}** and **${y}**. Complete the missing values.`,
      template: `The 2s column is 1 + 1, so he writes {{blank:a}} and carries {{blank:b}}. The final 8-bit answer is {{blank:c}}, which is {{blank:d}} in denary.`,
      blanks: [
        { id: "a", accepted: ["0"], choices: ["0", "1", "2"] },
        { id: "b", accepted: ["1"], choices: ["0", "1"] },
        { id: "c", accepted: [r.sum], normalise: ["trim", "remove_whitespace"], wrong: toBase(r.value + 2, 2, 8) },
        { id: "d", accepted: [String(r.value)], wrong: String(r.value + 2) },
      ],
      hints: ["1 + 1 = 10 in binary.", "Check by adding the two numbers in denary."],
      explanation: `${x} (${d(x)}) + ${y} (${d(y)}) = ${r.sum} (${r.value}).`,
    });
  }
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each column total with what is written and carried.",
    pairs: [["0 + 0", "write 0, carry 0"], ["1 + 0", "write 1, carry 0"], ["1 + 1", "write 0, carry 1"], ["1 + 1 + 1", "write 1, carry 1"]],
    explanation: "Totals of 0, 1, 2 (10) and 3 (11) give these results.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: "Two values are added in an 8-bit register and their true sum is **300**. What denary value is left in the register?",
    value: 300 - 256, wrong: [255, 300],
    hints: ["The lost ninth bit is worth 256."],
    explanation: "The register keeps only the lower 8 bits; the lost bit is worth 256, so $300 - 256 = 44$ is stored.",
    workedSolution: "1. 300 in binary is 100101100 (9 bits).\n2. The register keeps the right-hand 8 bits: 00101100.\n3. $00101100 = 32 + 8 + 4 = 44$ (or $300 - 256 = 44$).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by an **overflow error** in an 8-bit register and why it happens.",
    points: [
      "The result of a calculation is too large to be stored in the register / is greater than 255.",
      "The register has a fixed size of 8 bits, so the result needs a ninth bit that is not available.",
      "The extra (carry) bit is lost, so the stored result is incorrect (an overflow flag may be set).",
    ],
    modelAnswer: "An overflow error happens when the result of a calculation is bigger than the largest number the register can store, which is 255 for 8 bits. The register has a fixed size, so the ninth bit needed for the answer is lost and the value stored is wrong.",
    hints: ["What is the largest 8-bit value?", "What happens to the carry out of the leftmost column?"],
    explanation: "Overflow = result > maximum for the number of bits; fixed register size; extra bit lost; wrong value stored.",
  });
  {
    const [x, y] = ["01101100", "01011010"];
    const r = sum(x, y);
    const [p, q] = ["11001001", "01000111"];
    const r2 = sum(p, q);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, calculator: false, marks: 8, secs: 720,
      stem: "A processor stores whole numbers in 8-bit registers and adds them in binary.",
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `Add ${x} and ${y}. Give the 8-bit result.`, value: r.value, width: 8, explanation: `${r.sum}: $${d(x)} + ${d(y)} = ${r.value}$.` }),
        P.bits({ label: "(b)", marks: 2, stem: `Add ${p} and ${q}. Give the 8 bits that are stored in the register.`, value: d(r2.sum), width: 8, wrong: [toBase(r2.value, 2)], explanation: `The full sum is ${toBase(r2.value, 2)} (${r2.value}); the register keeps ${r2.sum}.` }),
        P.mcq({ label: "(c)", stem: "Name the error that occurs in part (b).", options: [["Overflow", "Correct: the result is too large for 8 bits."], ["Syntax error", "A syntax error is a mistake in the grammar of a program."], ["Rounding error", "Rounding errors happen with real numbers, not here."], ["Underflow", "Underflow is for results too small to represent, not too large."]], answer: "A", explanation: "The sum is greater than 255, so it overflows." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the error in (b) occurred and suggest how the processor or program could avoid it.", points: ["The true result (" + r2.value + ") is greater than 255, the largest 8-bit value.", "The register has a fixed size, so the ninth bit / final carry is lost and the stored result is wrong.", "Avoid it by using a larger register (e.g. 16 bits) or by checking/flagging overflow before using the result."], modelAnswer: `${p} + ${q} = ${r2.value}, which is more than 255. The 8-bit register cannot hold the ninth bit, so the carry is lost and the stored value is wrong. A 16-bit register could store the result, or the program could check the overflow flag and report an error.` }),
      ],
      hints: ["Remember to carry 1 whenever a column adds to 2 or 3.", "Compare each sum with 255."],
      explanation: `(a) ${r.sum}. (b) ${r2.sum} stored; true sum ${r2.value}. (c) Overflow.`,
    });
  }
  {
    const [x, y] = ["10010110", "00111011"];
    const r = sum(x, y);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: false, marks: 6, secs: 540,
      stem: `A ticket machine at a Harare bus terminus counts tickets sold in an 8-bit register. In the morning it sold **${x}** tickets and in the afternoon **${y}** tickets.`,
      parts: [
        P.num({ type: "CALCULATION", label: "(a)", marks: 1, stem: "Convert the morning figure to denary.", value: d(x), wrong: [d(x) + 1], explanation: `$128 + 16 + 4 + 2 = ${d(x)}$.` }),
        P.bits({ label: "(b)", marks: 2, stem: "Add the two binary numbers to find the day's total. Give an 8-bit answer.", value: r.value, width: 8, explanation: `${x} + ${y} = ${r.sum} (${d(x)} + ${d(y)} = ${r.value}).` }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, stem: `How many more tickets could be sold that day before the register overflows? (The register overflows when the total goes above 255.)`, value: 255 - r.value, wrong: [256 - r.value], explanation: `$255 - ${r.value} = ${255 - r.value}$.` }),
        P.manual({ label: "(d)", marks: 2, stem: "State what would be shown if one more ticket than your answer to (c) were sold, and why.", points: ["The register would show 0 (00000000).", "Because 256 needs 9 bits: the carry out of the 128s column is lost (overflow)."], modelAnswer: "The total would be 256 = 100000000, which needs nine bits. The ninth bit is lost, so the register would show 00000000 (zero)." }),
      ],
      hints: ["Convert each number to check your binary addition.", "The largest 8-bit value is 255."],
      explanation: `Total ${r.value} = ${r.sum}; ${255 - r.value} more tickets fit; one more after that gives 256, which overflows to 0.`,
    });
  }

  b.card("FACT", "Binary addition rules", "0 + 0 = 0; 0 + 1 = 1; 1 + 1 = 10 (write 0, carry 1); 1 + 1 + 1 = 11 (write 1, carry 1).");
  b.card("DEFINITION", "Overflow", "An error when a result needs more bits than the register holds (for 8 bits: a result greater than 255).");
  b.card("CONCEPT", "Why does overflow happen?", "Registers have a **fixed size**; the carry out of the most significant bit has nowhere to go, so it is lost and the stored value is wrong.");
  b.card("FACT", "Largest 8-bit unsigned value", "255 = 11111111.");
  b.card("CONCEPT", "Value left after 8-bit overflow", "The true sum minus 256 (only the lower 8 bits are kept).");
  b.card("CONCEPT", "How to check a binary sum", "Convert both numbers and the answer to denary; the denary sum must match.");
  b.card("DEFINITION", "Register", "A small, fast storage location in the processor holding a fixed number of bits.");
  b.card("CONCEPT", "Preventing overflow", "Use more bits (e.g. a 16-bit register) or check the overflow flag and handle the error.");
});
