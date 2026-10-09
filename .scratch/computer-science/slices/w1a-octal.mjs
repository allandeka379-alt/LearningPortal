// W1a: octal (ZIMSEC only): place values, octal <-> denary, octal <-> binary, comparison with hexadecimal.
import { concept, P, toBase, fromBase } from "../lib.mjs";

const g3 = (o) => [...o].map((c) => toBase(fromBase(c, 8), 2, 3)).join(" ");
const divSteps = (n, base = 8) => {
  const out = [];
  let q = n;
  while (q > 0) {
    out.push(`${q} ÷ ${base} = ${Math.floor(q / base)} r ${q % base}`);
    q = Math.floor(q / base);
  }
  return out;
};

concept("comp.data.octal", { file: "data/octal", keyPrefix: "data.octal" }, (b) => {
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Convert the octal number **52** to denary.",
    value: fromBase("52", 8), wrong: [52, 82],
    explanation: `$5 \\times 8 + 2 = 40 + 2 = ${fromBase("52", 8)}$.`,
    workedSolution: `1. Place values: 8 and 1.\n2. $5 \\times 8 = 40$.\n3. $40 + 2 = ${fromBase("52", 8)}$.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Convert the octal number **416** to denary.",
    value: fromBase("416", 8), wrong: [416, 4 * 64 + 1 * 8],
    hints: ["The place values are 64, 8 and 1."],
    explanation: `$4 \\times 64 + 1 \\times 8 + 6 = 256 + 8 + 6 = ${fromBase("416", 8)}$.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION",
    stem: "Convert the octal number **2017** to denary.",
    value: fromBase("2017", 8), wrong: [2017, 1024 + 8 + 7 - 1],
    hints: ["Four digits: the place values are 512, 64, 8 and 1.", "The zero still takes up the 64s place."],
    explanation: `$2 \\times 512 + 0 \\times 64 + 1 \\times 8 + 7 = 1024 + 8 + 7 = ${fromBase("2017", 8)}$.`,
  });
  b.bits({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Convert the denary number **60** to octal.",
    value: 60, base: 8, wrong: ["47", "704"],
    explanation: `$60 \\div 8 = 7$ remainder 4, so 60 is ${toBase(60, 8)} in octal. Check: $7 \\times 8 + 4 = 60$.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION",
    stem: "Convert the denary number **300** to octal.",
    value: 300, base: 8, wrong: ["455", "464"],
    hints: ["Divide by 8 repeatedly and keep the remainders.", "Read the remainders from the bottom up."],
    explanation: `${divSteps(300).join("; ")}. Bottom up: ${toBase(300, 8)}. Check: $4 \\times 64 + 5 \\times 8 + 4 = 300$.`,
  });
  b.bits({
    d: 4, skill: "APPLICATION",
    stem: "Convert the denary number **1000** to octal.",
    value: 1000, base: 8,
    hints: ["The place value 512 fits once into 1000.", "Or divide by 8 four times."],
    explanation: `${divSteps(1000).join("; ")}. Bottom up: ${toBase(1000, 8)}. Check: $512 + 7 \\times 64 + 5 \\times 8 + 0 = 1000$.`,
  });
  b.bits({
    d: 2, skill: "APPLICATION",
    stem: "Convert the octal number **53** to binary.",
    value: fromBase("53", 8), acceptUnpadded: true, wrong: ["10111", "1010011"],
    explanation: `5 → 101 and 3 → 011: ${g3("53")}, so the answer is ${toBase(fromBase("53", 8), 2)}. Writing 3 as 11 (not 011) gives the wrong value; 1010011 converts each digit to 4 bits.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION",
    stem: "Convert the binary number **1101011** to octal.",
    value: fromBase("1101011", 2), base: 8, wrong: ["653", "152"],
    hints: ["Group the bits in threes starting from the right.", "The leftmost group has only one bit."],
    explanation: `From the right: 1 101 011 → 001 101 011 → 1, 5, 3 = ${toBase(fromBase("1101011", 2), 8)}. Grouping from the left (110 101 1) gives the wrong digits.`,
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which digits are used in the **octal** number system?",
    options: [
      ["0 to 7", "Correct: base 8 has eight digits, 0 to 7."],
      ["0 to 8", "That is nine digits; 8 is written as 10 in octal."],
      ["1 to 8", "Every base includes 0; the largest digit is one less than the base."],
      ["0 to 9 and A to F", "These are the hexadecimal digits."],
    ],
    answer: "A",
    explanation: "In base $b$ the digits run from 0 to $b - 1$. Octal: 0, 1, 2, 3, 4, 5, 6, 7.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What are the first four place values of octal, from the right?",
    options: [
      ["1, 8, 64, 512", "Correct: each place is 8 times the one to its right."],
      ["1, 8, 16, 24", "This adds 8 each time; place values multiply by the base."],
      ["8, 64, 512, 4096", "The rightmost place in every base is worth 1."],
      ["1, 3, 9, 27", "These are powers of 3, not 8."],
    ],
    answer: "A",
    explanation: "Octal place values are powers of 8: $8^0 = 1$, $8^1 = 8$, $8^2 = 64$, $8^3 = 512$.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How many bits does **one** octal digit represent?",
    options: [
      ["3", "Correct: $2^3 = 8$, so three bits give exactly the eight octal digits."],
      ["4", "Four bits make one hexadecimal digit."],
      ["8", "8 is the base, not the number of bits per digit."],
      ["2", "Two bits give only four patterns."],
    ],
    answer: "A",
    explanation: "Each octal digit matches one 3-bit group: 0 = 000 … 7 = 111.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these **cannot** be an octal number?",
    options: [
      ["1729", "Correct: it contains the digit 9, which does not exist in octal."],
      ["1777", "All its digits are from 0 to 7, so it is a valid octal number (1023 in denary)."],
      ["7000", "All its digits are from 0 to 7, so it is valid."],
      ["10", "10 is valid in octal: it means one eight, denary 8."],
    ],
    answer: "A",
    hints: ["Look for a digit that is too big for base 8."],
    explanation: "Octal digits stop at 7. Any number containing 8 or 9 is not octal.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is hexadecimal used more widely than octal in modern computers?",
    options: [
      ["A byte divides exactly into two hex digits but not into octal digits", "Correct: 8 bits = 2 × 4 bits, but 8 is not a multiple of 3."],
      ["Hexadecimal values take up less memory than octal values", "Both are display formats; the computer stores binary either way."],
      ["Octal cannot represent numbers larger than 511", "Octal can represent any whole number by adding more digits."],
      ["Processors carry out arithmetic in hexadecimal", "Processors work in binary only."],
    ],
    answer: "A",
    hints: ["Think about how many bits each digit stands for, and how big a byte is."],
    explanation: "Data is organised in bytes (8 bits). Two 4-bit hex digits fit a byte exactly; octal would need three digits with one bit to spare.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "What is the denary number **8** written in octal?",
    options: [
      ["10", "Correct: one eight and no units."],
      ["8", "There is no digit 8 in octal."],
      ["1000", "1000 is 8 in binary."],
      ["7", "7 is the largest single octal digit; 8 needs two digits."],
    ],
    answer: "A",
    explanation: "Counting in octal: … 6, 7, 10. The 10 means $1 \\times 8 + 0$.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "To convert binary to octal, the bits are split into groups of three, starting from the right.",
    answer: true,
    explanation: "True. Three bits make one octal digit; grouping from the right keeps the place values correct.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each octal number with its denary value.",
    pairs: [["17", String(fromBase("17", 8))], ["20", String(fromBase("20", 8))], ["77", String(fromBase("77", 8))], ["100", String(fromBase("100", 8))]],
    explanation: `17 = 8 + 7 = 15; 20 = 2 × 8 = 16; 77 = 7 × 8 + 7 = 63; 100 = 64.`,
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda converts the octal number 715 to binary. Complete his working.",
    template: "7 → {{blank:a}}, 1 → {{blank:b}}, 5 → {{blank:c}}, so 715 in binary is {{blank:d}}.",
    blanks: [
      { id: "a", accepted: [g3("7")], wrong: "0111" },
      { id: "b", accepted: [g3("1")], wrong: "1" },
      { id: "c", accepted: [g3("5")], wrong: "0101" },
      { id: "d", accepted: [toBase(fromBase("715", 8), 2)], normalise: ["trim", "remove_whitespace"], wrong: "1111101" },
    ],
    hints: ["Each octal digit becomes exactly three bits.", "Keep the zeros inside each group: 1 is 001."],
    explanation: `${g3("715")} → ${toBase(fromBase("715", 8), 2)} (denary ${fromBase("715", 8)}).`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Compare octal and hexadecimal by giving **one** similarity and **one** difference.",
    points: [
      "Similarity: both are shorthands for binary that are easier for people to read; or both convert directly to binary digit by digit.",
      "Difference: octal is base 8 (digits 0-7, 3 bits per digit) while hexadecimal is base 16 (digits 0-9 and A-F, 4 bits per digit); or hex fits a byte exactly in two digits.",
    ],
    modelAnswer: "Both octal and hexadecimal are shorter ways of writing binary that people read more easily. Octal is base 8 and each digit stands for 3 bits, whereas hexadecimal is base 16 and each digit stands for 4 bits.",
    hints: ["Think about why both are used at all.", "Then think about bits per digit."],
    explanation: "Both exist to make binary readable; they differ in base, digits used and bits per digit.",
  });
  {
    const v = 0o635;
    b.struct({
      d: 4, skill: "APPLICATION", examStyle: true, marks: 6, secs: 540,
      stem: `A technician at a Harare company reads a value from an old control system. It is shown in octal as **635**.`,
      parts: [
        P.num({ type: "CALCULATION", label: "(a)", marks: 2, stem: "Convert the octal value 635 to denary.", value: v, wrong: [635], explanation: `$6 \\times 64 + 3 \\times 8 + 5 = 384 + 24 + 5 = ${v}$.` }),
        P.bits({ label: "(b)", marks: 2, stem: "Convert the octal value 635 to binary.", value: v, acceptUnpadded: true, explanation: `6 → 110, 3 → 011, 5 → 101: ${g3("635")} = ${toBase(v, 2)}.` }),
        P.bits({ label: "(c)", marks: 2, stem: "Use your answer to (b) to write the value in hexadecimal.", value: v, base: 16, acceptUnpadded: true, explanation: `Regroup ${toBase(v, 2)} in fours from the right: ${toBase(v, 2, 12).match(/.{4}/g).join(" ")} → ${toBase(v, 16)}.` }),
      ],
      hints: ["Octal place values are 64, 8 and 1.", "For (c), regroup the bits in fours from the right."],
      explanation: `635 (octal) = ${v} (denary) = ${toBase(v, 2)} (binary) = ${toBase(v, 16)} (hexadecimal).`,
    });
  }
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 5, secs: 450,
    stem: "Rudo's Form 3 class is practising number bases using the denary number **90**.",
    parts: [
      P.bits({ label: "(a)", marks: 2, stem: "Convert 90 to octal.", value: 90, base: 8, wrong: ["231"], explanation: `${divSteps(90).join("; ")} → ${toBase(90, 8)}.` }),
      P.bits({ label: "(b)", marks: 1, stem: "Convert 90 to hexadecimal.", value: 90, base: 16, wrong: ["A5"], explanation: `$90 \\div 16 = 5$ r 10 → ${toBase(90, 16)}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Rudo writes 90 in octal as 1132. Explain how you can tell immediately that her answer is wrong.", points: ["A 4-digit octal number is at least 512 (its leftmost place value), which is far more than 90.", "So 90 needs only three octal digits (64 ≤ 90 < 512)."], modelAnswer: "The leftmost digit of a four-digit octal number is worth 512s, so 1132 is at least 512, but 90 is less than 512. A number between 64 and 511 has exactly three octal digits." }),
    ],
    hints: ["Divide by 8 for octal and by 16 for hexadecimal.", "What is the place value of the fourth octal digit?"],
    explanation: `90 = ${toBase(90, 8)} (octal) = ${toBase(90, 16)} (hex). Octal 1132 = ${fromBase("1132", 8)} in denary.`,
  });

  b.card("DEFINITION", "Octal", "Base 8: digits 0-7; place values 1, 8, 64, 512, 4096.");
  b.card("CONCEPT", "Octal → denary", "Multiply each digit by its place value (… 64, 8, 1) and add.");
  b.card("CONCEPT", "Denary → octal", "Divide by 8 repeatedly; read the remainders (0-7) from the bottom up.");
  b.card("CONCEPT", "Octal ↔ binary", "Each octal digit = **3 bits** (0 = 000 … 7 = 111). Group binary in threes from the right.");
  b.card("FACT", "Octal 10", "Octal 10 = denary 8 (one eight, no units).");
  b.card("CONCEPT", "Octal vs hexadecimal", "Octal: base 8, 3 bits per digit, no letters. Hex: base 16, 4 bits per digit, a byte = exactly 2 digits, so hex is more common.");
  b.card("FACT", "A use of octal", "File permissions on some operating systems (e.g. 7 = 111 = read, write, execute).");
  b.card("FACT", "Octal mistake check", "An octal number never contains 8 or 9; a remainder of 8 or more means a division slip.");
});
