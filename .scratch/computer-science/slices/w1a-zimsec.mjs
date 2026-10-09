// W1a: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS): number bases; binary arithmetic and ASCII;
// storage units. Every value is computed below.
import { concept, P, ZIM, toBase, fromBase, addBinary } from "../lib.mjs";

const d = (s) => fromBase(s, 2);
const code = (ch) => ch.charCodeAt(0);
const bin8 = (n) => toBase(n, 2, 8);
const K = 1024;

concept("comp.data.binary-denary", { file: "exam/w1a-zimsec", keyPrefix: "exam.w1a-zimsec", applies: ZIM }, (b) => {
  // 1. Number bases
  {
    const n = 163;
    const h = "7D";
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
      concepts: ["comp.data.number-systems", "comp.data.binary-denary", "comp.data.octal", "comp.data.hexadecimal"],
      stem: `A stock-control program at a hardware shop in Gweru stores the number of items in each bin as a binary number. One bin holds **${n}** items.`,
      parts: [
        P.manual({ label: "(a)", marks: 2, stem: "Explain why the computer stores the number in binary.", points: ["The computer's circuits/switches/transistors (or logic gates, memory cells) have only two states, on and off.", "The two states represent the binary digits 1 and 0, so all data must be converted to binary to be stored and processed."], modelAnswer: "A computer is built from electronic switches that can only be on or off. These two states stand for 1 and 0, so every number has to be held in binary." }),
        P.bits({ label: "(b)", marks: 2, stem: `Convert ${n} to an 8-bit binary number.`, value: n, width: 8, explanation: `$128 + 32 + 2 + 1 = ${n}$ → ${bin8(n)}.` }),
        P.bits({ label: "(c)", marks: 2, stem: `Convert ${n} to octal.`, value: n, base: 8, wrong: [toBase(n, 8).split("").reverse().join("")], explanation: `${n} ÷ 8 = 20 r 3; 20 ÷ 8 = 2 r 4; 2 ÷ 8 = 0 r 2 → ${toBase(n, 8)}. (Or group ${bin8(n)} in threes from the right: 010 100 011.)` }),
        P.bits({ label: "(d)", marks: 1, stem: `Convert ${n} to hexadecimal.`, value: n, base: 16, explanation: `${n} ÷ 16 = 10 r 3 → A3 (or 1010 0011 → A3).` }),
        P.num({ type: "CALCULATION", label: "(e)", marks: 1, stem: `Another bin's count is shown on a technician's screen in hexadecimal as ${h}. Convert it to denary.`, value: fromBase(h, 16), wrong: [73], explanation: `$7 \\times 16 + 13 = ${fromBase(h, 16)}$.` }),
        P.manual({ label: "(f)", marks: 2, stem: "Give two reasons why the technician's screen shows values in hexadecimal rather than binary.", points: ["Hexadecimal is shorter (one hex digit represents 4 bits), so it takes less space on screen.", "It is easier for people to read/remember/copy, so fewer errors are made; it converts easily to and from binary."], modelAnswer: "A hex value is a quarter of the length of the binary, so it is quicker to read. It is also easier to remember and copy without mistakes, and each digit converts straight to four bits." }),
      ],
      hints: ["Use place values 128 to 1 for binary.", "Divide by 8 for octal and by 16 for hexadecimal; read remainders from the bottom up."],
      explanation: `${n} = ${bin8(n)} (binary) = ${toBase(n, 8)} (octal) = ${toBase(n, 16)} (hex). ${h} = ${fromBase(h, 16)}.`,
    });
  }
  // 2. Binary arithmetic and ASCII
  {
    const [x, y] = ["01011101", "00110110"];
    const s = addBinary(x, y);
    const [p, q] = ["10010011", "00101110"];
    const diff = d(p) - d(q);
    const word = "WIN";
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
      concepts: ["comp.data.binary-addition", "comp.data.binary-subtraction", "comp.data.text-character-sets", "comp.data.binary-denary"],
      stem: "A school's computer club in Bulawayo is practising binary arithmetic and character codes. The ASCII code for **A** is 65.",
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `Add the binary numbers ${x} and ${y}. Give an 8-bit answer.`, value: s.value, width: 8, explanation: `${x} + ${y} = ${s.sum} ($${d(x)} + ${d(y)} = ${s.value}$).` }),
        P.bits({ label: "(b)", marks: 2, stem: `Work out ${p} − ${q} in binary. Give an 8-bit answer.`, value: diff, width: 8, explanation: `${p} − ${q} = ${bin8(diff)} ($${d(p)} - ${d(q)} = ${diff}$).` }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, stem: "Convert your answer to (b) to denary.", value: diff, wrong: [diff + 2], explanation: `${bin8(diff)} = $64 + 32 + 4 + 1 = ${diff}$.` }),
        P.bits({ label: "(d)", marks: 2, stem: "Give the 8-bit binary ASCII code for the letter R.", value: code("R"), width: 8, explanation: `R is 17 letters after A: $65 + 17 = ${code("R")}$ → ${bin8(code("R"))}.` }),
        P.fib({ label: "(e)", marks: 1, stem: "Decode this ASCII message.", template: `${[...word].map((c) => bin8(code(c))).join(" ")} → {{blank:w}}`, blanks: [{ id: "w", accepted: [word], normalise: ["trim", "collapse_whitespace"], wrong: "VHM" }], explanation: `${[...word].map((c) => `${bin8(code(c))} = ${code(c)} = ${c}`).join("; ")}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "The club wants to send messages that include emojis. Explain why ASCII cannot be used and what should be used instead.", points: ["ASCII uses 7 (or 8) bits, so it has only 128 (or 256) codes, none of which are emojis.", "Unicode should be used: it uses more bits per character, so it has codes for emojis and characters of many languages."], modelAnswer: "ASCII only has 128 characters (256 in extended ASCII), and emojis are not among them. Unicode uses more bits per character, giving enough codes for emojis and other languages." }),
      ],
      hints: ["Carry 1 when a column adds to 2 or 3; borrow 2 when a column needs it.", "Count on through the alphabet from A = 65."],
      explanation: `(a) ${s.sum}. (b) ${bin8(diff)} = ${diff}. (d) ${bin8(code("R"))}. (e) ${word}.`,
    });
  }
  // 3. Storage units
  {
    const UNITS = ["bit", "nibble", "byte", "kilobyte", "megabyte", "gigabyte", "terabyte"];
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 900,
      concepts: ["comp.data.storage-units"],
      stem: "A secondary school in Masvingo is buying storage for its computer laboratory. Use 1 KB = 1024 bytes, 1 MB = 1024 KB, 1 GB = 1024 MB and 1 TB = 1024 GB.",
      parts: [
        P.fib({ label: "(a)", marks: 2, stem: "Complete the units of storage in order from smallest to largest.", template: "bit, {{blank:a}}, byte, kilobyte, {{blank:b}}, gigabyte, {{blank:c}}", blanks: [{ id: "a", accepted: ["nibble"], choices: UNITS }, { id: "b", accepted: ["megabyte"], choices: UNITS }, { id: "c", accepted: ["terabyte"], choices: UNITS }], explanation: "bit → nibble → byte → kilobyte → megabyte → gigabyte → terabyte." }),
        P.num({ type: "CALCULATION", label: "(b)", marks: 1, stem: "How many nibbles are there in 6 bytes?", value: 12, wrong: [3, 48], explanation: "1 byte = 2 nibbles, so $6 \\times 2 = 12$." }),
        P.num({ type: "CALCULATION", label: "(c)", marks: 1, unit: "MB", stem: "Convert 6 GB to MB.", value: 6 * K, wrong: [6000], explanation: `$6 \\times 1024 = ${6 * K}$ MB.` }),
        P.num({ type: "CALCULATION", label: "(d)", marks: 2, stem: "Each pupil's folder may use up to 128 MB. How many pupils' folders fit on an 8 GB flash drive?", value: (8 * K) / 128, wrong: [62, 8 * 128], explanation: `8 GB = $8 \\times 1024 = ${8 * K}$ MB; $${8 * K} \\div 128 = ${(8 * K) / 128}$ folders.` }),
        P.num({ type: "CALCULATION", label: "(e)", marks: 1, unit: "MB", stem: "A school report is 5120 KB. Give its size in MB.", value: 5120 / K, wrong: [5120 * K, 5.12], explanation: `$5120 \\div 1024 = ${5120 / K}$ MB.` }),
        P.manual({ label: "(f)", marks: 3, stem: "The school can buy either a 750 GB drive or a 2 TB drive. It must store 600 GB of files now and expects this to grow. Recommend a drive and justify your answer with a calculation.", points: ["2 TB = 2 × 1024 = 2048 GB.", "The 750 GB drive leaves only 150 GB for growth (or would soon be full).", "Recommends the 2 TB drive: 2048 − 600 = 1448 GB spare for growth."], modelAnswer: "2 TB is 2 × 1024 = 2048 GB. The 750 GB drive would leave only 150 GB for growth. The 2 TB drive holds today's files with 2048 − 600 = 1448 GB to spare, so it allows for growth: buy the 2 TB drive." }),
      ],
      hints: ["Multiply by 1024 to go to a smaller unit and divide to go to a larger one.", "Put sizes in the same unit before comparing or dividing."],
      explanation: `(b) 12. (c) ${6 * K} MB. (d) ${(8 * K) / 128}. (e) ${5120 / K} MB. (f) 2 TB = 2048 GB.`,
    });
  }
});
