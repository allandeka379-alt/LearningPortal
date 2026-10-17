// W1a: number systems (binary, denary, hexadecimal, octal, BCD, storage prefixes). Both boards; octal is ZIMSEC detail.
import { concept, P, ZIM, toBase, fromBase, bcd, fromBcd, bytesTo, toBytes, group, chk } from "../lib.mjs";

concept("acs.data.number-bases", { file: "data/number-bases", keyPrefix: "data.number-bases" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the denary value of the hexadecimal digit **F**?",
    options: [
      [String(fromBase("F", 16)), "Correct: A to F stand for 10 to 15, so F is 15."],
      ["16", "16 is the base itself; the largest hexadecimal digit is one less."],
      ["14", "14 is E."],
      ["6", "F is the sixth letter of the alphabet, but its value is 15."],
    ],
    answer: "A",
    explanation: "Hexadecimal uses 0-9 and then A=10, B=11, C=12, D=13, E=14, F=15.",
  });
  {
    const v = 202;
    b.bits({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Convert the denary number **${v}** to an 8-bit binary number.`,
      value: v, width: 8,
      explanation: `${v} = 128 + 64 + 8 + 2, so the bits are ${toBase(v, 2, 8)}. Check by adding the place values.`,
    });
  }
  {
    const s = "11010110";
    const v = fromBase(s, 2);
    b.bits({
      d: 2, skill: "APPLICATION",
      stem: `Convert the binary number **${s}** to hexadecimal.`,
      value: v, base: 16, width: 2,
      explanation: `Groups of four: ${group(s)}. 1101 = 13 = D and 0110 = 6, so the answer is ${toBase(v, 16, 2)}.`,
    });
  }
  {
    const h = "7C";
    const v = fromBase(h, 16);
    b.bits({
      d: 2, skill: "APPLICATION",
      stem: `Convert the hexadecimal number **${h}** to an 8-bit binary number.`,
      value: v, width: 8,
      explanation: `7 = 0111 and C (12) = 1100, so ${h} = ${toBase(v, 2, 8)}.`,
    });
  }
  {
    const s = "00110101";
    const v = fromBase(s, 2);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `What is the denary value of the binary number **${s}**?`,
      value: v,
      wrong: [v + 1],
      workedSolution: `1. Place values under the 1s: 32, 16, 4 and 1.
2. Add them: 32 + 16 + 4 + 1 = ${v}.`,
      explanation: `Add the place values under the 1s: 32 + 16 + 4 + 1 = ${v}.`,
    });
  }
  {
    const v = 156;
    b.bits({
      d: 3, skill: "APPLICATION", applies: ZIM,
      stem: `Convert the denary number **${v}** to octal.`,
      value: v, base: 8,
      hints: ["Convert to binary first, then group the bits in threes from the right.", "Or divide by 8 repeatedly and read the remainders from last to first."],
      explanation: `${v} in binary is ${toBase(v, 2, 9)}; in threes that is ${group(toBase(v, 2, 9), 3)}, which gives octal ${toBase(v, 8)}. Check: ${toBase(v, 8).split("").map((d, i, a) => `${d} × ${8 ** (a.length - 1 - i)}`).join(" + ")} = ${v}.`,
    });
  }
  {
    const s = "101011101";
    const v = fromBase(s, 2);
    b.bits({
      d: 3, skill: "APPLICATION", applies: ZIM,
      stem: `Convert the binary number **${s}** to octal.`,
      value: v, base: 8,
      hints: ["Group the bits in threes starting from the right-hand end."],
      explanation: `Groups of three: ${group(s, 3)}. These are ${group(s, 3).split(" ").map((g) => fromBase(g, 2)).join(", ")}, so the octal number is ${toBase(v, 8)}.`,
    });
  }
  {
    const n = 5391;
    const code = bcd(n);
    b.short({
      d: 2, skill: "APPLICATION",
      stem: `Write the denary number **${n}** in Binary Coded Decimal (BCD), using four bits for each digit.`,
      accepted: [code, code.replace(/ /g, "")],
      normalise: ["trim", "remove_whitespace"],
      wrong: ["1010100001111"],
      explanation: `Each digit has its own group: ${String(n).split("").map((d) => `${d} = ${toBase(Number(d), 2, 4)}`).join(", ")}. The BCD is ${code}.`,
    });
  }
  {
    const code = "0111 0010 0100";
    const n = fromBcd(code);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A digital meter stores a reading in BCD as **${code}**. What denary number does it show?`,
      value: n,
      workedSolution: `1. Split into groups of four bits: ${code}.
2. Convert each group to a denary digit: ${code.split(" ").map((g) => fromBase(g, 2)).join(", ")}.
3. Join the digits: ${n}.`,
      explanation: `Decode each group of four bits: ${code.split(" ").map((g) => `${g} = ${fromBase(g, 2)}`).join(", ")}. The reading is ${n}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do programmers often write memory addresses in hexadecimal rather than in binary?",
    options: [
      ["It is shorter, and each digit is four bits", "Correct: the grouping makes conversion exact and reduces transcription errors."],
      ["The processor can only run hexadecimal numbers", "Hardware works in binary; hexadecimal is only a human-friendly notation."],
      ["Hexadecimal numbers take less space in memory", "The stored bits are identical; only the way humans write them differs."],
      ["Hexadecimal avoids needing any conversion", "Conversion is still needed, but it is a simple grouping."],
    ],
    answer: "A",
    explanation: "Hexadecimal is a shorthand for binary: one digit stands for four bits, so long bit patterns become short and easier to read and check.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "One hexadecimal digit represents exactly four binary digits.",
    answer: true,
    feedbackTrue: "Correct: 16 = 2^4, so four bits give 16 values, one per hexadecimal digit.",
    feedbackFalse: "Four bits can hold 16 different values, which is exactly the number of hexadecimal digits.",
    explanation: "Because 16 = 2^4, each hexadecimal digit corresponds to one group of four bits (a nibble).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each number system to the group of bits that one of its digits represents.",
    pairs: [
      ["Binary", "1 bit"],
      ["Octal (ZIMSEC)", "3 bits"],
      ["Hexadecimal", "4 bits"],
      ["BCD digit", "4 bits holding a value 0 to 9 only"],
    ],
    explanation: "A binary digit is one bit; an octal digit is three bits; a hexadecimal digit is four bits; a BCD group is four bits but only 0000 to 1001 are valid.",
  });
  {
    const v = bytesTo(toBytes(12, "MiB"), "KiB");
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: "A song file is 12 MiB. How many KiB is this? (1 MiB = 1024 KiB.)",
      value: v, unit: "KiB",
      wrong: [12000],
      workedSolution: `1. 1 MiB = 1024 KiB.
2. 12 × 1024 = ${v} KiB.`,
      explanation: `Multiply by 1024: 12 × 1024 = ${v} KiB. Using 1000 would be the decimal prefix.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A student writes four groups of four bits as possible BCD digits. Which group can **not** be a BCD digit?",
    options: [
      ["1100", "Correct: 1100 is 12, which is not a single denary digit, so it cannot appear in BCD."],
      ["1001", "1001 is 9, the largest valid BCD digit."],
      ["0111", "0111 is 7, a valid digit."],
      ["0000", "0000 is the digit 0, which is valid."],
    ],
    answer: "A",
    hints: ["BCD stores one denary digit, 0 to 9, in each group."],
    explanation: "Only the patterns 0000 to 1001 (0 to 9) are valid in BCD. 1010 to 1111 are never used.",
  });
  {
    const hex = "3C9A52";
    const rgb = [0, 2, 4].map((i) => fromBase(hex.slice(i, i + 2), 16));
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `A web page colour is written in hexadecimal as **#${hex}**: two hexadecimal digits each for red, green and blue. Give the denary value of each component.`,
      template: `Red = {{blank:r}}, green = {{blank:g}}, blue = {{blank:bl}}`,
      blanks: [
        { id: "r", input: "number", accepted: [String(rgb[0])] },
        { id: "g", input: "number", accepted: [String(rgb[1])] },
        { id: "bl", input: "number", accepted: [String(rgb[2])] },
      ],
      hints: ["Each pair of hexadecimal digits is worth 16 × (first digit) + (second digit).", "A = 10, C = 12."],
      explanation: `${hex.slice(0, 2)} = 3 × 16 + 12 = ${rgb[0]}; ${hex.slice(2, 4)} = 9 × 16 + 10 = ${rgb[1]}; ${hex.slice(4)} = 5 × 16 + 2 = ${rgb[2]}.`,
    });
    chk(rgb[0], 60); chk(rgb[1], 154); chk(rgb[2], 82);
  }
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why hexadecimal is used to display the contents of memory in a debugging tool.",
    points: [
      "Each hexadecimal digit represents four bits, so a byte needs only two digits.",
      "The display is much shorter than binary, so it is quicker to read and compare.",
      "It is less error-prone to copy or type, and converts to and from binary by simple grouping.",
    ],
    modelAnswer: "A byte of eight bits is shown as just two hexadecimal digits, so a long memory dump is much shorter than in binary. Because each digit stands for exactly four bits, a programmer can convert to binary without arithmetic, and there are fewer chances of mistakes when copying values.",
    explanation: "Hexadecimal is a compact human-readable form of binary, not a different way of storing data.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "A clock chip stores the time 0759 as BCD and a different chip stores it as an ordinary binary integer. Compare the two methods.",
    points: [
      "BCD stores each denary digit in its own four bits (four digits need 16 bits).",
      "Pure binary stores the whole value in as few bits as needed, so it uses fewer bits.",
      "BCD makes it easy to show each digit on a display without division, but arithmetic on it is harder.",
    ],
    modelAnswer: "In BCD the digits 0, 7, 5 and 9 are stored as 0000 0111 0101 1001, using 16 bits, and each group can be sent straight to a display digit. The same value as a binary integer needs only 11 bits, but the digits have to be extracted by division before they can be displayed.",
    hints: ["Think about the number of bits used and about how easily each digit can be displayed."],
    explanation: "BCD trades storage efficiency for easy display of single digits; pure binary is compact and suits arithmetic.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3, calculator: false,
    stem: "A shop in Gweru buys a flash drive labelled 32 GB (decimal gigabytes). The computer reports less capacity. Explain why.",
    points: [
      "The manufacturer uses decimal gigabytes (1 GB = 1 000 000 000 bytes).",
      "The computer reports in gibibytes (binary units, 1 GiB = 1 073 741 824 bytes), which are larger.",
      "The same number of bytes therefore gives a smaller number of GiB, so the displayed figure is lower.",
    ],
    modelAnswer: "The label counts in decimal gigabytes of 10^9 bytes, but the operating system divides by 2^30 bytes per gibibyte. Because a gibibyte is larger than a gigabyte, the same number of bytes is a smaller number of gibibytes (about 29.8), so the drive appears to have less space.",
    hints: ["Compare the number of bytes in 1 GB and in 1 GiB."],
    explanation: `32 × 10^9 bytes divided by 2^30 is about ${(32e9 / 2 ** 30).toFixed(1)} GiB.`,
  });
  // structured practice 1 (6 marks)
  {
    const bytes = ["A7", "5E"];
    const [x, y] = bytes.map((h) => fromBase(h, 16));
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: "A technician at a Mutare clinic reads two consecutive bytes from a memory dump of a patient-records program. The dump shows the bytes in hexadecimal as **" + bytes.join("** and **") + "**.",
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `Write the first byte, **${bytes[0]}**, as an 8-bit binary number.`, value: x, width: 8 }),
        P.num({ label: "(b)", marks: 2, stem: `Give the denary value of the second byte, **${bytes[1]}**.`, value: y, explanation: `${bytes[1]} = 5 × 16 + 14 = ${y}.`, workedSolution: `1. 5E has two digits: 5 is worth 16 each and E is 14.
2. 5 × 16 + 14 = ${y}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Give two reasons why a memory dump is displayed in hexadecimal instead of binary.", points: ["It is shorter, so easier to read.", "Each digit converts directly to four bits, so there are fewer copying errors."], modelAnswer: "It is much shorter than binary. Each digit stands for exactly four bits so it is easy to convert and less likely to be mistyped." }),
      ],
      hints: ["Convert each hexadecimal digit to four bits.", "Remember that E is 14."],
      explanation: `${bytes[0]} = ${toBase(x, 2, 8)} and ${bytes[1]} = ${y}. Hexadecimal is used because it is compact and groups exactly four bits per digit.`,
    });
  }
  // structured practice 2 (8 marks)
  {
    const n = 4708;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: `A fuel pump in Masvingo shows the amount sold in litres. Its display chip stores the amount **${n}** (in tenths of a litre) in Binary Coded Decimal. The same value could also be stored as a pure binary integer.`,
      parts: [
        P.short({ label: "(a)", marks: 2, stem: `Write ${n} in BCD using four bits for each digit.`, accepted: [bcd(n), bcd(n).replace(/ /g, "")], normalise: ["trim", "remove_whitespace"], wrong: [toBase(n, 2)] }),
        P.num({ label: "(b)", marks: 2, stem: `How many bits does the pure binary form of ${n} need (without leading zeros)?`, value: toBase(n, 2).length, unit: "bits", explanation: `${n} is between 2^12 = 4096 and 2^13 = 8192, so it needs ${toBase(n, 2).length} bits.`, workedSolution: `1. 2^12 = 4096 and 2^13 = 8192.
2. ${n} lies between them, so the highest 1 is in the 2^12 place and ${toBase(n, 2).length} bits are needed.` }),
        P.num({ label: "(c)", marks: 1, stem: "How many more bits does the BCD form use than the pure binary form?", value: 16 - toBase(n, 2).length, unit: "bits", explanation: `BCD uses 16 bits; binary needs ${toBase(n, 2).length}.`, workedSolution: `1. BCD: 4 digits × 4 bits = 16 bits.
2. 16 − ${toBase(n, 2).length} = ${16 - toBase(n, 2).length}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Give three advantages or disadvantages of storing the amount in BCD rather than as a binary integer.", points: ["Each digit can be displayed directly without dividing by 10.", "It uses more bits than binary for the same value.", "Arithmetic is more complicated on BCD, or only 10 of 16 patterns per group are used."], modelAnswer: "Advantage: each group drives one display digit directly. Disadvantage: 16 bits instead of 13. Disadvantage: arithmetic on BCD needs extra correction steps, and six of the sixteen patterns in each group are wasted." }),
      ],
      hints: ["For (b), find the powers of 2 either side of the number.", "BCD always uses 4 bits per digit."],
      explanation: `BCD: ${bcd(n)} (16 bits). Pure binary: ${toBase(n, 2)} (${toBase(n, 2).length} bits). BCD is easy to display but wasteful.`,
    });
  }

  {
    const s = "10100111";
    const v = fromBase(s, 2);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `Which hexadecimal number is equal to the binary number **${s}**?`,
      options: [
        [toBase(v, 16, 2), `Correct: ${group(s)} is ${toBase(v, 16, 2)}.`],
        [toBase(v, 16, 2).split("").reverse().join(""), "The digits have been written in the wrong order."],
        [toBase(v - 1, 16, 2), "The last digit is one too small: 0111 is 7, so the second digit is 7."],
        [toBase(v + 16, 16, 2), "The first digit is one too large: 1010 is A."],
      ],
      answer: "A",
      explanation: `Split into groups of four: ${group(s)}. 1010 = 10 = A and 0111 = 7, so the hexadecimal number is ${toBase(v, 16, 2)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A memory address is written with four hexadecimal digits. How many bits does the address contain?",
    options: [
      ["16", "Correct: each hexadecimal digit stands for 4 bits, so 4 × 4 = 16 bits."],
      ["4", "This counts the digits, not the bits."],
      ["8", "That is two hexadecimal digits, one byte."],
      ["32", "That would be eight hexadecimal digits."],
    ],
    answer: "A",
    hints: ["How many bits does one hexadecimal digit represent?"],
    explanation: "One hexadecimal digit is 4 bits, so four digits are 16 bits.",
  });

  b.card("DEFINITION", "Binary Coded Decimal (BCD)", "Each denary digit is stored as its own 4-bit binary group (e.g. 59 = 0101 1001).", "Used for displays such as clocks and calculators; groups 1010 to 1111 are never used.");
  b.card("FACT", "How many bits does one hexadecimal digit represent?", "Four bits (a nibble), because 16 = 2^4.");
  b.card("FACT", "How many bits does one octal digit represent?", "Three bits, because 8 = 2^3.", undefined, { applies: ZIM });
  b.card("FACT", "Denary values of the hexadecimal digits A, B, C, D, E and F", "A = 10, B = 11, C = 12, D = 13, E = 14, F = 15.");
  b.card("CONCEPT", "How do you convert denary to binary by repeated division?", "Divide by 2 repeatedly, recording each remainder, until the quotient is 0. Read the remainders from last to first.");
  b.card("CONCEPT", "How do you convert binary to hexadecimal?", "Split the bits into groups of four from the right (pad the left group with zeros) and convert each group to one hexadecimal digit.");
  b.card("FACT", "Binary prefixes versus decimal prefixes", "KiB, MiB, GiB, TiB are powers of 1024 (2^10 each step). kB, MB, GB, TB are powers of 1000.", "ZIMSEC writes KB, MB, GB for 1024-based sizes.");
  b.card("FACT", "Place values of an 8-bit binary number", "128, 64, 32, 16, 8, 4, 2, 1 (each worth double the place to its right).");
  b.card("CONCEPT", "Why is hexadecimal used by programmers?", "It is a short, readable form of binary: each digit is four bits, conversion is by simple grouping, and it causes fewer copying errors.");
});
