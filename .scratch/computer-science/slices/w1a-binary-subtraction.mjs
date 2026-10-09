// W1a: binary subtraction with borrowing (ZIMSEC only).
import { concept, P, toBase, fromBase } from "../lib.mjs";

const d = (s) => fromBase(s, 2);
const diff = (a, c) => {
  const v = d(a) - d(c);
  if (v < 0) throw new Error("negative difference");
  return v;
};

concept("comp.data.binary-subtraction", { file: "data/binary-subtraction", keyPrefix: "data.binary-subtraction" }, (b) => {
  {
    const [x, y] = ["1110", "0100"];
    const v = diff(x, y);
    b.bits({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Work out the binary subtraction **${x} − ${y}**.`,
      value: v, width: 4, acceptUnpadded: true, wrong: ["1011", "0110"],
      explanation: `No borrows are needed: ${toBase(v, 2, 4)}. Check: $${d(x)} - ${d(y)} = ${v}$.`,
    });
  }
  {
    const [x, y] = ["10110", "00101"];
    const v = diff(x, y);
    b.bits({
      d: 2, skill: "APPLICATION",
      stem: `Work out **${x} − ${y}** in binary.`,
      value: v, width: 5, acceptUnpadded: true, wrong: ["10011"],
      explanation: `1s: 0 − 1 needs a borrow from the 2s (which becomes 0): 2 − 1 = 1. 2s: 0 − 0 = 0. 4s: 1 − 1 = 0. 8s: 0 − 0 = 0. 16s: 1 − 0 = 1. Answer ${toBase(v, 2, 5)}; check $${d(x)} - ${d(y)} = ${v}$.`,
    });
  }
  {
    const [x, y] = ["11000101", "01010011"];
    const v = diff(x, y);
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `Work out the 8-bit subtraction **${x} − ${y}**. Give an 8-bit answer.`,
      value: v, width: 8,
      hints: ["Start in the 1s column and borrow whenever the top digit is 0 and the bottom digit is 1.", "Check by converting both numbers to denary."],
      explanation: `The answer is ${toBase(v, 2, 8)}. Check: $${d(x)} - ${d(y)} = ${v}$.`,
    });
  }
  {
    const [x, y] = ["10000000", "00000001"];
    const v = diff(x, y);
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `Work out **${x} − ${y}**. Give an 8-bit answer.`,
      value: v, width: 8, wrong: ["10000001", "11111111"],
      hints: ["The nearest 1 to borrow from is in the 128s column.", "Every 0 you pass over becomes 1."],
      explanation: `Borrow from the 128s: it becomes 0 and every lower column becomes 1, with the 1s column becoming 10; 10 − 1 = 1. Answer ${toBase(v, 2, 8)} ($128 - 1 = 127$).`,
    });
  }
  {
    const [x, y] = ["11010000", "00111001"];
    const v = diff(x, y);
    b.bits({
      d: 4, skill: "APPLICATION",
      stem: `Work out **${x} − ${y}**. Give an 8-bit answer.`,
      value: v, width: 8,
      hints: ["The first borrow has to cross several zeros.", "After each borrow, write the new top digits above the old ones."],
      explanation: `Answer ${toBase(v, 2, 8)}. Check: $${d(x)} - ${d(y)} = ${v}$.`,
    });
  }
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In binary subtraction, what is **0 − 1** after borrowing from the next column?",
    options: [
      ["1", "Correct: the borrowed 1 makes the column 10 (two), and 2 − 1 = 1."],
      ["9", "That treats the borrow as ten, as in denary."],
      ["0", "0 is the result of 1 − 1."],
      ["−1", "Borrowing avoids a negative digit; binary digits are only 0 and 1."],
    ],
    answer: "A",
    explanation: "After borrowing, the column holds binary 10 = 2, and $2 - 1 = 1$.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When you borrow 1 from the next column in binary subtraction, how much is it worth in the column that receives it?",
    options: [
      ["2", "Correct: each binary place value is double the one to its right."],
      ["10", "In denary a borrow is worth ten; binary uses base 2."],
      ["1", "It is worth 1 of the left column, which is 2 of the column to its right."],
      ["16", "16 is a place value in binary, not the value of a borrow."],
    ],
    answer: "A",
    explanation: "Place values double from right to left, so 1 in the left column equals 2 in the column to its right.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is **1011 − 0110** in binary?",
    options: [
      [toBase(d("1011") - d("0110"), 2, 4), `Correct: 11 − 6 = 5 = ${toBase(5, 2, 4)}.`],
      ["0001", "0001 is 1; check in denary: 11 − 6 = 5, not 1."],
      ["1101", "This subtracts the smaller digit from the larger in every column."],
      ["0111", "0111 is 7; check in denary: 11 − 6 = 5."],
    ],
    answer: "A",
    explanation: "1s: 1 − 0 = 1. 2s: 1 − 1 = 0. 4s: 0 − 1 → borrow from 8s: 2 − 1 = 1. 8s: 0 − 0 = 0. Answer 0101 = 5.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "When working out **1000 − 0011**, Chipo borrows for the 1s column. What happens to the 8s, 4s and 2s columns?",
    options: [
      ["8s becomes 0; 4s and 2s become 1", "Correct: the nearest 1 (the 8s) gives up 1; the zeros passed over become 1."],
      ["8s becomes 0; 4s and 2s become 2", "Only the column that needs the borrow becomes 10 (two); passed-over zeros become 1."],
      ["8s stays 1; 4s and 2s become 1", "The column you borrow from must drop by 1."],
      ["Nothing changes because 0 − 1 is 1", "0 − 1 needs a borrow; the columns to the left change."],
    ],
    answer: "A",
    hints: ["Find the nearest 1 to the left of the 1s column."],
    explanation: "Borrowing across zeros: 8s → 0, 4s → 1, 2s → 1, 1s → 10. Then 2 − 1 = 1, 1 − 1 = 0, 1 − 0 = 1, 0 − 0 = 0: 0101 (8 − 3 = 5).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Tatenda says **11010 − 00110 = 11100**. How can you tell immediately that he is wrong?",
    options: [
      ["The answer is bigger than the number he started with", "Correct: 11100 (28) is more than 11010 (26); a difference cannot be larger."],
      ["The answer has more 1s than the bottom number", "The number of 1s does not decide whether an answer is right."],
      ["The answer ends in 0, and differences must be odd", "Differences can be even or odd."],
      ["Binary answers must always have eight bits", "Answers can use any number of bits unless a size is stated."],
    ],
    answer: "A",
    hints: ["Compare the size of the answer with the top number."],
    explanation: `Subtracting a positive number makes the result smaller. The correct answer is ${toBase(d("11010") - d("00110"), 2, 5)} ($26 - 6 = 20$).`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In binary subtraction, 1 − 1 = 0 and no borrow is needed.",
    answer: true,
    explanation: "True. Only 0 − 1 needs a borrow.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Adding the answer of a binary subtraction to the bottom number should give the top number.",
    answer: true,
    explanation: "True. Subtraction and addition are inverse operations, so this is a quick check that needs no conversion.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each column subtraction with its result.",
    pairs: [["0 − 0", "0, no borrow"], ["1 − 0", "1, no borrow"], ["1 − 1", "0, no borrow"], ["0 − 1", "1, borrow from the left"]],
    explanation: "Only 0 − 1 needs a borrow; it then becomes 10 − 1 = 1.",
  });
  {
    const [x, y] = ["101101", "010110"];
    const v = diff(x, y);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `Nyasha works out **${x} − ${y}**. Complete her working and check.`,
      template: `The answer in binary is {{blank:a}}. In denary this is ${d(x)} − ${d(y)} = {{blank:b}}.`,
      blanks: [
        { id: "a", accepted: [toBase(v, 2, 6), toBase(v, 2)], normalise: ["trim", "remove_whitespace"], wrong: toBase(v + 2, 2, 6) },
        { id: "b", accepted: [String(v)], wrong: String(v + 2) },
      ],
      hints: ["Work column by column from the right, borrowing when needed.", "Your denary answer should match your binary answer."],
      explanation: `${x} − ${y} = ${toBase(v, 2, 6)}, and $${d(x)} - ${d(y)} = ${v}$.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Describe how to borrow in binary subtraction when the column to the left of a 0 − 1 column also contains 0.",
    points: [
      "Move left to the nearest column with a 1; that 1 becomes 0.",
      "Every 0 passed over becomes 1, and the column that needed the borrow becomes 10 (two), so 10 − 1 = 1.",
    ],
    modelAnswer: "Go left until you find a column whose top digit is 1 and change it to 0. Each 0 you passed over becomes 1, and the column that needed the borrow becomes 10, so 0 − 1 becomes 2 − 1 = 1.",
    hints: ["Think of 1000 − 1 in denary: the zeros become 9s."],
    explanation: "Borrowing across zeros works like denary 1000 − 1, except the passed-over zeros become 1s (the largest binary digit).",
  });
  {
    const [x, y] = ["10101010", "01011100"];
    const v = diff(x, y);
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540,
      stem: `A vending machine at a Gweru college stores the number of drinks in binary. At 08:00 it held **${x}** drinks; by 16:00 **${y}** had been sold.`,
      parts: [
        P.bits({ label: "(a)", marks: 3, stem: "Work out, in binary, the number of drinks left. Give an 8-bit answer.", value: v, width: 8, explanation: `${x} − ${y} = ${toBase(v, 2, 8)}.` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 2, stem: "Check your answer by converting all three numbers to denary. Give the number of drinks left in denary.", value: v, wrong: [v + 2], explanation: `$${d(x)} - ${d(y)} = ${v}$; ${toBase(v, 2, 8)} = ${v}. ✓` }),
        P.mcq({ label: "(c)", stem: "Which check gives back the starting number without converting to denary?", options: [[`Add ${toBase(v, 2, 8)} and ${y}`, "Correct: difference + amount sold = starting stock."], [`Subtract ${toBase(v, 2, 8)} from ${y}`, "Taking the answer away from the number sold does not undo the subtraction."], [`Add ${x} and ${y}`, "This adds the starting stock to the sales, which means nothing here."], [`Subtract ${y} from ${toBase(v, 2, 8)}`, "This does not undo the subtraction."]], answer: "A", explanation: "Addition undoes subtraction: answer + bottom number = top number." }),
      ],
      hints: ["Several columns need borrows.", "Convert to denary to check."],
      explanation: `${d(x)} − ${d(y)} = ${v} = ${toBase(v, 2, 8)}.`,
    });
  }
  {
    const [x, y] = ["01100100", "00011111"];
    const v = diff(x, y);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, marks: 5, secs: 450,
      stem: `Farai's stock program subtracts the binary number of bags sold from the stock level. The stock was **${x}** bags and **${y}** bags were sold. Farai's answer was **01001011**.`,
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: "Work out the correct 8-bit answer.", value: v, width: 8, wrong: ["01001011"], explanation: `${x} − ${y} = ${toBase(v, 2, 8)} ($${d(x)} - ${d(y)} = ${v}$).` }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 1, stem: "Convert Farai's answer to denary.", value: d("01001011"), wrong: [v], explanation: `$64 + 8 + 2 + 1 = ${d("01001011")}$.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain how Farai could have checked his answer without converting to denary, and what the check would show.", points: ["Add his answer to the number sold (01001011 + 00011111).", `The sum would be ${toBase(d("01001011") + d(y), 2, 8)}, not the stock level ${x}, so the answer is wrong.`], modelAnswer: `Add his answer to the bags sold: 01001011 + ${y} = ${toBase(d("01001011") + d(y), 2, 8)}. This should equal the stock ${x}, but it does not, so his subtraction is wrong.` }),
      ],
      hints: ["Borrow across the zeros carefully.", "Answer + amount sold should give back the stock level."],
      explanation: `Correct: ${toBase(v, 2, 8)} (${v}). Farai's ${d("01001011")} is ${d("01001011") - v} too many.`,
    });
  }

  b.card("FACT", "Binary subtraction rules", "0 − 0 = 0; 1 − 0 = 1; 1 − 1 = 0; 0 − 1 = 1 with a borrow from the left.");
  b.card("CONCEPT", "Value of a borrow in binary", "A borrowed 1 is worth **2** in the column that receives it (not 10 as in denary).");
  b.card("CONCEPT", "Borrowing across zeros", "Take 1 from the nearest 1 on the left (it becomes 0); passed-over 0s become 1; the needy column becomes 10.");
  b.card("CONCEPT", "Checking a binary subtraction", "Convert to denary, or add the answer to the bottom number: you should get the top number.");
  b.card("DEFINITION", "Borrowing", "Taking 1 from the next column on the left when the top digit is smaller than the bottom digit.");
  b.card("FACT", "Which board examines binary subtraction?", "ZIMSEC (Form 2). Cambridge 0478 uses two's complement instead.");
  b.card("CONCEPT", "After borrowing", "Reduce the top digit of the column you borrowed from (1 → 0) before you subtract in that column.");
  b.card("FACT", "Sense check", "A difference is never larger than the top number; if it is, a borrow was missed.");
});
