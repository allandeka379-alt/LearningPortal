// Slice w1b: error detection (comp.transmission.error-detection, Cambridge only).
import { concept, P, fromBase, group } from "../lib.mjs";

const ones = (s) => [...s].filter((c) => c === "1").length;
const parityBit = (bits7, kind) => (kind === "even" ? ones(bits7) % 2 : 1 - (ones(bits7) % 2));
const withParity = (bits7, kind) => `${parityBit(bits7, kind)}${bits7}`;
const isbnCheck = (d12) => {
  const sum = [...d12].reduce((s, c, i) => s + Number(c) * (i % 2 === 0 ? 1 : 3), 0);
  return { sum, check: (10 - (sum % 10)) % 10, products: [...d12].map((c, i) => Number(c) * (i % 2 === 0 ? 1 : 3)) };
};
const checksum = (bytes) => bytes.reduce((a, b) => a + b, 0) % 256;

// A parity block for questions (even parity), with one flipped bit.
const blockData = ["0101100", "1110001", "0011011", "1001110"];
const sent = blockData.map((r) => withParity(r, "even"));
const parityByte = Array.from({ length: 8 }, (_, i) => String(sent.reduce((s, r) => s + Number(r[i]), 0) % 2)).join("");
const flipRow = 1; // byte 2
const flipCol = 6; // column "6" (index 6: P,1,2,3,4,5,6,7)
const recv = sent.map((r, i) => (i === flipRow ? r.slice(0, flipCol) + (r[flipCol] === "1" ? "0" : "1") + r.slice(flipCol + 1) : r));
const blockMd = ["| Byte | P | 1 | 2 | 3 | 4 | 5 | 6 | 7 |", "|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|", ...[...recv, parityByte].map((r, i) => `| ${i < 4 ? i + 1 : "Parity byte"} | ${r.split("").join(" | ")} |`)].join("\n");
const badRows = [...recv].map((r, i) => (ones(r) % 2 ? i + 1 : null)).filter(Boolean);
const badCols = Array.from({ length: 8 }, (_, i) => ([...recv, parityByte].reduce((s, r) => s + Number(r[i]), 0) % 2 ? i : null)).filter((x) => x !== null);
if (badRows.length !== 1 || badRows[0] !== flipRow + 1 || badCols.length !== 1 || badCols[0] !== flipCol) throw new Error("parity block set-up");
const correctedByte = sent[flipRow];

if (ones("01101011") % 2 !== 1 || ones("01101001") % 2 || ones("11110000") % 2) throw new Error("parity MCQ");
const isbnQ = "978077111203";
const iq = isbnCheck(isbnQ);
const isbnQ2 = "978155192370";
const iq2 = isbnCheck(isbnQ2);
const csBytes = [90, 150, 64, 17];
const cs = checksum(csBytes);

concept("comp.transmission.error-detection", { file: "transmission/error-detection", keyPrefix: "transmission.error-detection" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which method is used to detect errors when a number such as an ISBN is **typed in**?",
    options: [["Check digit", "Correct: a check digit detects data-entry errors."], ["Echo check", "An echo check is for transmitted data."], ["Parity check", "Parity checks are for transmitted bytes."], ["Automatic repeat query", "ARQ makes sure transmitted data arrives correctly."]],
    answer: "A",
    explanation: "Check digits (on ISBNs and bar codes) detect data-entry errors; the other three methods check data after transmission.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In an echo check, what happens to the data after it is received?",
    options: [["It is sent back to the sender to be compared", "Correct."], ["It is checked against its parity bit", "That is a parity check."], ["A value is calculated from it and compared", "That is a checksum."], ["The receiver sends an acknowledgement only", "That is part of ARQ."]],
    answer: "A",
    explanation: "In an echo check the receiver returns a copy of the data and the sender compares it with the original.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under **even** parity, which byte has definitely been received with an error?",
    options: [["01101011", `Correct: it has ${ones("01101011")} ones, an odd number.`], ["01101001", `It has ${ones("01101001")} ones, an even number.`], ["00000000", "It has 0 ones, which is even."], ["11110000", `It has ${ones("11110000")} ones, an even number.`]],
    answer: "A",
    explanation: `Under even parity every byte must contain an even number of 1s. 01101011 has ${ones("01101011")} ones, which is odd, so an error has occurred.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which error would a single parity bit **fail** to detect?",
    options: [["Two bits in the byte are flipped", "Correct: the count of 1s changes by 0 or 2, so its parity stays the same."], ["One bit in the byte is flipped", "One flipped bit changes the parity, so it is detected."], ["The parity bit itself is flipped", "The count of 1s changes by one, so it is detected."], ["Three bits in the byte are flipped", "An odd number of flips changes the parity, so it is detected."]],
    answer: "A",
    explanation: "Parity detects any odd number of flipped bits, but an even number of flips leaves the parity unchanged.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In an automatic repeat query (ARQ), what does the sender do if no acknowledgement arrives before the timeout?",
    options: [["It resends the data", "Correct: it assumes the data was lost or damaged."], ["It sends the next packet", "Moving on would leave lost data unreplaced."], ["It sends an echo of the data", "Echo checks are a different method."], ["It recalculates the parity bit", "Parity is not used to handle a timeout."]],
    answer: "A",
    explanation: "ARQ: the sender waits for an acknowledgement; on a negative acknowledgement or a timeout, it resends the data.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "What is a drawback of an echo check?",
    options: [["An error found may have happened on the return journey", "Correct: the sender cannot tell whether the error was in the original transmission or in the echo."], ["It cannot detect errors in more than one bit", "Comparing whole copies can detect many bit errors."], ["It only works with even parity", "Echo checks do not use parity."], ["The receiver must calculate a check digit", "Check digits are for data entry, not echo checks."]],
    answer: "A",
    hints: ["The data travels twice. What could go wrong on the second trip?"],
    explanation: "Echo checks double the traffic, and if the copies differ the sender cannot tell which journey caused the error, so it simply resends.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which method could detect that a cashier keyed in a product code with two neighbouring digits swapped?",
    options: [["A check digit", "Correct: weighted check digits change when two neighbouring digits are swapped."], ["A parity check", "Parity checks bytes after transmission, not the code keyed in."], ["An echo check", "Echo checks compare transmitted data, not the cashier's input."], ["A checksum", "Checksums check transmitted blocks of data."]],
    answer: "A",
    hints: ["Which method is for data entry?"],
    explanation: "Because digits are multiplied by different weights, swapping two neighbouring digits normally changes the calculated check digit, so the error is detected.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A parity block with a parity byte can locate the exact bit that is wrong when one bit has changed.",
    answer: true, daily: true,
    explanation: "True. The faulty bit is where the row (byte) and the column that both fail the parity check cross.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In ARQ, a positive acknowledgement tells the sender that the data must be sent again.",
    answer: false,
    explanation: "False. A positive acknowledgement means the data arrived correctly. A negative acknowledgement (or a timeout) causes a resend.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each method to its description.",
    pairs: [
      ["Parity check", "An extra bit makes the number of 1s even or odd"],
      ["Checksum", "A value calculated from a block of data is recalculated and compared"],
      ["Echo check", "The receiver sends the data back to be compared with the original"],
      ["Check digit", "An extra digit calculated from a number detects keying errors"],
      ["ARQ", "Acknowledgements and timeouts trigger resending"],
    ],
    explanation: "Each method in one line: parity (count of 1s), checksum (calculated value), echo (send back), check digit (data entry), ARQ (acknowledgements and timeouts).",
  });
  b.bits({
    d: 2, skill: "APPLICATION",
    stem: "The 7-bit data 0110101 is sent using **odd** parity, with the parity bit as the left-most bit. Write the 8-bit byte that is sent.",
    value: fromBase(withParity("0110101", "odd"), 2), width: 8,
    wrong: [withParity("0110101", "even")],
    explanation: `0110101 has ${ones("0110101")} ones. For odd parity the total must be odd, so the parity bit is ${parityBit("0110101", "odd")}: ${withParity("0110101", "odd")}.`,
  });
  b.bits({
    d: 2, skill: "APPLICATION",
    stem: "The 7-bit data 1100110 is sent using **even** parity, with the parity bit as the left-most bit. Write the 8-bit byte that is sent.",
    value: fromBase(withParity("1100110", "even"), 2), width: 8,
    wrong: [withParity("1100110", "odd")],
    explanation: `1100110 has ${ones("1100110")} ones, already even, so the parity bit is ${parityBit("1100110", "even")}: ${withParity("1100110", "even")}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: `The first 12 digits of an ISBN-13 are ${isbnQ}. The digits are multiplied alternately by 1 and 3 (starting with 1), the products are added, and the check digit is 10 minus the remainder after dividing the sum by 10 (or 0 if the remainder is 0). Calculate the check digit.`,
    value: iq.check,
    wrong: [iq.sum % 10],
    hints: ["Multiply the 1st, 3rd, 5th … digits by 1 and the 2nd, 4th, 6th … by 3.", "Find the remainder of the sum after dividing by 10."],
    explanation: `Products: ${iq.products.join(" + ")} = ${iq.sum}. Remainder ${iq.sum % 10}; $10 - ${iq.sum % 10} = ${iq.check}$${iq.sum % 10 === 0 ? " (remainder 0, so 0)" : ""}.`,
    workedSolution: `1. Products: ${iq.products.join(", ")}.\n2. Sum: ${iq.sum}.\n3. Remainder after dividing by 10: ${iq.sum % 10}.\n4. Check digit: ${iq.check}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: `A checksum is calculated by adding the denary values of the bytes in a block and keeping the remainder after dividing by 256. A block contains the bytes ${csBytes.join(", ")}. Calculate the checksum.`,
    value: cs,
    wrong: [csBytes.reduce((a, b2) => a + b2, 0)],
    hints: ["Add the four values first.", "If the sum is 256 or more, subtract 256."],
    explanation: `${csBytes.join(" + ")} = ${csBytes.reduce((a, b2) => a + b2, 0)}; the remainder after dividing by 256 is ${cs}.`,
    workedSolution: `1. Sum: ${csBytes.join(" + ")} = ${csBytes.reduce((a, b2) => a + b2, 0)}.\n2. Remainder after dividing by 256: ${cs}.`,
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of ARQ.",
    template: "After receiving data, the receiver sends a positive or negative {{blank:a}}. The sender starts a timer when it sends data; if nothing comes back before the {{blank:b}}, the data is sent again.",
    blanks: [
      { id: "a", accepted: ["acknowledgement"], choices: ["acknowledgement", "checksum", "parity bit", "echo"] },
      { id: "b", accepted: ["timeout"], choices: ["timeout", "trailer", "header", "check digit"] },
    ],
    explanation: "ARQ uses acknowledgements and a timeout.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    hints: ["Who calculates, what is sent, who recalculates, what happens if they differ?"],
    stem: "Describe how a checksum is used to detect errors in transmitted data. [4]",
    points: ["The sender calculates a checksum from the block of data using an agreed method", "The checksum is sent with the data", "The receiver recalculates the checksum from the data received", "The two are compared: if they differ, an error has occurred and the data is requested again"],
    modelAnswer: "Before sending, the sender calculates a value from the data using an agreed method and sends it with the data. The receiver calculates the value again from the data it received and compares it with the checksum sent. If they do not match, there is an error and the data is sent again.",
    explanation: "Calculate, send, recalculate, compare, re-request.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Count the 1s in each row, then in each column.", "The error is where the failing row and failing column cross."],
    stem: `Four bytes and a parity byte are received using **even** parity. The left-most bit (P) of each byte is its parity bit, and each bit of the parity byte is the parity bit for its column.\n\n${blockMd}`,
    parts: [
      P.num({ label: "(a)", stem: "State the number of the byte (1 to 4) that contains the error.", value: badRows[0], explanation: `Byte ${badRows[0]} has an odd number of 1s.`, workedSolution: `1. Count the 1s in each byte: ${recv.map((r) => ones(r)).join(", ")}.\n2. Only byte ${badRows[0]} has an odd count.` }),
      P.short({ label: "(b)", stem: "State the column (P or 1 to 7) that contains the error.", accepted: [String(flipCol)], wrong: [String(flipCol - 1)], explanation: `Column ${flipCol} has an odd number of 1s.` }),
      P.bits({ label: "(c)", marks: 2, stem: `Write the corrected byte ${badRows[0]}.`, value: fromBase(correctedByte, 2), width: 8, wrong: [recv[flipRow]], explanation: `Flip the bit at byte ${badRows[0]}, column ${flipCol}: ${recv[flipRow]} → ${correctedByte}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why using a parity block is better than using a parity bit on each byte alone.", points: ["A parity bit alone shows a byte is wrong but not which bit", "The parity byte (column check) locates the exact bit, so it can be corrected without resending"], modelAnswer: "A single parity bit shows only that a byte is wrong. With the parity byte, the failing column identifies which bit, so the receiver can correct it without asking for the data again." }),
    ],
    explanation: `Byte ${badRows[0]}, column ${flipCol}: corrected byte ${correctedByte}.`,
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true,
    hints: ["Weights alternate 1, 3, 1, 3, …", "A changed digit changes the sum, so the calculated check digit will not match."],
    stem: `A library in Bulawayo enters ISBN-13 numbers into its catalogue. For a new book the first 12 digits are ${isbnQ2}. The check digit is found by multiplying the digits alternately by 1 and 3, adding the products, finding the remainder after dividing by 10 and subtracting it from 10 (a remainder of 0 gives 0).`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the sum of the products.", value: iq2.sum, type: "CALCULATION", explanation: `${iq2.products.join(" + ")} = ${iq2.sum}.`, workedSolution: `1. Products: ${iq2.products.join(", ")}.\n2. Sum: ${iq2.sum}.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the check digit.", value: iq2.check, type: "CALCULATION", explanation: `Remainder ${iq2.sum % 10}; check digit ${iq2.check}.`, workedSolution: `1. ${iq2.sum} ÷ 10 leaves remainder ${iq2.sum % 10}.\n2. Check digit ${iq2.check}.` }),
      P.manual({ label: "(c)", marks: 3, stem: "A librarian types the ISBN with one digit wrong. Explain how the computer detects the error.", points: ["The computer recalculates the check digit from the first 12 digits entered", "using the same weights and method", "and compares it with the 13th digit entered; they do not match, so an error is reported"], modelAnswer: "The computer repeats the calculation on the first 12 digits typed and compares its result with the check digit typed. Because one digit is wrong, the sum changes, the results differ and the number is rejected." }),
    ],
    explanation: `Check digit ${iq2.check}.`,
  });

  b.card("FACT", "Three ways interference can corrupt data", "Data loss, data gain and data change.");
  b.card("DEFINITION", "**Parity check**", "An extra bit makes the number of 1s even (even parity) or odd (odd parity); the receiver counts the 1s.");
  b.card("CONCEPT", "Weakness of a single parity bit", "An even number of flipped bits is not detected, and it cannot show which bit is wrong.");
  b.card("CONCEPT", "How a parity block locates an error", "The wrong bit is where the failing byte (row) and failing column (from the parity byte) cross.");
  b.card("DEFINITION", "**Checksum**", "A value calculated from a block of data, sent with it, recalculated by the receiver and compared.");
  b.card("DEFINITION", "**Echo check**", "The receiver sends the data back; the sender compares it with the original.");
  b.card("DEFINITION", "**Check digit**", "An extra digit calculated from the others in a number (ISBN, bar code) to detect data-entry errors.");
  b.card("DEFINITION", "**ARQ** (automatic repeat query)", "Receiver sends positive/negative acknowledgements; a negative acknowledgement or a timeout makes the sender resend.");
  b.card("FORMULA", "ISBN-13 check digit", "Multiply digits alternately by 1 and 3, add, take the remainder after ÷ 10, subtract from 10 (0 stays 0).");
});
