// W1a exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on data representation, media and logic.
import { concept, P, EXAM, checkExam, CAM, L, truthRows, truthTableMd, toBase, fromBase, twos, fromTwos, addTwos, bcd, fpDecode, fpEncode, fpNormalise, fpMantissaValue, rle, rleText, minimise, soundBits, bitmapBits, chk, same } from "../lib.mjs";

const mn = (v) => String(v).replace("-", "−");
const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;

concept(C("data.number-bases"), { file: "exam/w1a-theory", keyPrefix: "exam.w1a-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. Number bases and binary arithmetic with overflow (both)
  {
    const hex = "9C";
    const p = fromBase(hex, 16);
    const pBin = toBase(p, 2, 8);
    const q = "01101110", r = "00110111";
    const add = addTwos(q, r);
    chk(add.trueValue, 165);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("data.number-bases"), C("data.binary-arithmetic")],
      stem: `An 8-bit register in a till at a shop in Gweru holds the value P, written in hexadecimal as **${hex}**. Two other 8-bit registers hold Q = ${q} and R = ${r}, both in binary.`,
      parts: checkExam(EXAM.THEORY10, [
        P.bits({ label: "(a)", marks: 2, stem: `Write P as an 8-bit binary number.`, value: p, width: 8, explanation: `9 = 1001 and C (12) = 1100, so ${hex} = ${pBin}.` }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: "P is an unsigned binary number. Give its denary value.", value: p, explanation: `${hex} = 9 × 16 + 12 = ${p}.` }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "P is now read as an 8-bit two's complement number. Give its denary value.", value: fromTwos(pBin), explanation: `The leftmost bit is worth −128 and the other 1s are worth 16, 8 and 4: −128 + 28 = ${mn(fromTwos(pBin))}.`, workedSolution: `1. The leftmost bit of ${pBin} is 1, so it is worth −128.\n2. The other 1s are worth 16, 8 and 4, which total 28.\n3. −128 + 28 = ${mn(fromTwos(pBin))}.` }),
        P.bits({ label: "(d)", marks: 2, stem: "Add Q and R in an 8-bit register. Give the 8-bit result stored.", value: fromBase(add.sum, 2), width: 8, explanation: `${q} + ${r} = ${add.sum}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Q and R are two's complement numbers. Which statement about the result in (d) is correct?", options: [["It is correct because the carry out of the register is zero", "The carry out is not the test for overflow."], ["Overflow: two positive numbers gave a negative result", "Correct: Q = 110 and R = 55 are positive, but the stored result is negative."], ["It is correct because the result is a valid 8-bit pattern", "Every 8-bit pattern is valid; the test is whether the value is right."], ["Underflow has occurred because the result is too small", "Underflow concerns real numbers; this is integer overflow."]], answer: "B", explanation: "A negative-looking result from two positive numbers shows overflow." }),
        P.manual({ label: "(f)", marks: 2, stem: "Explain what is meant by overflow.", points: ["The result of the calculation is too large (outside the range) for the number of bits available.", "So the value stored is incorrect."], modelAnswer: "Overflow is when the true result lies outside the range that the register can store, so the pattern stored represents a wrong value." }),
      ]),
      hints: ["Convert each hexadecimal digit to four bits.", "For two's complement, the leftmost bit is worth −128."],
      explanation: `P = ${pBin}; unsigned ${p}, two's complement ${mn(fromTwos(pBin))}. Q + R = ${add.sum}: the true sum ${add.trueValue} exceeds 127, so overflow.`,
    });
  }
  // ------------------------------------------------------------------ 2. Floating point (both)
  {
    const m1 = "01010100", e1 = "0010";
    const v1 = fpDecode(m1, e1);
    const x = 9.5;
    const enc = fpEncode(x, 8, 4);
    const un = { m: "00010110", e: "0101" };
    const nm = fpNormalise(un.m, un.e);
    chk(v1, 2.625);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P3",
      concepts: [C("data.floating-point-representation"), C("data.floating-point-errors")],
      stem: "A weather logger at a school in Chipinge stores real numbers in floating point. The mantissa has 8 bits and the exponent has 4 bits; both are two's complement, and the binary point of the mantissa is after the sign bit.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: `A reading is stored with mantissa **${m1}** and exponent **${e1}**. Calculate its denary value.`, value: v1, explanation: `Mantissa ${fpMantissaValue(m1)}, exponent ${fromTwos(e1)}: ${fpMantissaValue(m1)} × 4 = ${v1}.` }),
        P.bits({ label: "(b)", marks: 2, stem: `The temperature **${x}** is to be stored as a normalised number. Write its 8-bit mantissa.`, value: fromBase(enc.mant, 2), width: 8, explanation: `${x} = 1001.1 in binary = 0.10011 × 2^4, so the mantissa is ${enc.mant}.` }),
        P.bits({ label: "(c)", marks: 1, stem: `Write the 4-bit exponent for ${x}.`, value: fromBase(enc.exp, 2), width: 4, explanation: `The point moves four places, so the exponent is +4 = ${enc.exp}.` }),
        P.bits({ label: "(d)", marks: 2, stem: `A calculation leaves an unnormalised mantissa **${un.m}** with exponent **${un.e}**. Write the normalised 8-bit mantissa.`, value: fromBase(nm.mant, 2), width: 8, explanation: `Shift left ${nm.shifts} places to ${nm.mant}; the exponent falls to ${nm.exp}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which of these is a reason for normalising floating-point numbers?", options: [["It makes the exponent larger so that bigger values fit", "Normalising lowers the exponent when it shifts the mantissa."], ["It gives maximum precision for the bits used", "Correct: no mantissa bits are wasted on leading digits."], ["It removes all rounding errors from the stored numbers", "Rounding errors remain whenever a value is not exactly representable."], ["It stores the same number in fewer bits than before", "The number of bits is the same."]], answer: "B", explanation: "Normalisation gives the greatest precision and a single representation." }),
        P.manual({ label: "(f)", marks: 2, stem: "The logger cannot store 0.1 exactly. Explain why.", points: ["0.1 is a recurring fraction in binary.", "The mantissa has a limited number of bits, so only an approximation can be stored."], modelAnswer: "0.1 is 0.000110011… in binary, which never ends, and the 8-bit mantissa can hold only a limited number of digits, so a rounded value is stored." }),
      ]),
      hints: ["The exponent is a two's complement integer that moves the binary point.", "Normalised means the first two mantissa bits differ."],
      explanation: `(a) ${v1}. (b)-(c) ${x} is stored as ${enc.mant} and ${enc.exp}. (d) ${nm.mant}. Limited mantissa bits cause rounding errors.`,
    });
  }
  // ------------------------------------------------------------------ 3. Logic circuit and truth table (both)
  {
    const f = (a, bb, c) => L.or(L.nor(a, bb), L.and(bb, c));
    const ones = truthRows(["A", "B", "C"], f).filter((r) => r.out).length;
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("logic.gates-truth-tables"), C("logic.circuits-expressions")],
      stem: "A greenhouse controller in Marondera uses a logic circuit with three inputs A, B and C. Inputs A and B go into a NOR gate (output P). Inputs B and C go into an AND gate (output Q). The outputs P and Q go into an OR gate whose output is X.",
      parts: checkExam(EXAM.THEORY10, [
        P.mcq({ label: "(a)", marks: 1, stem: "Which expression describes X?", options: [["X = (A NOR B) OR (B AND C)", "Correct: P = A NOR B, Q = B AND C and X = P OR Q."], ["X = (A OR B) AND (B OR C)", "This does not use a NOR gate."], ["X = (A NOR B) AND (B AND C)", "The final gate is OR, not AND."], ["X = NOT (A OR B OR C)", "This ignores the AND gate."]], answer: "A", explanation: "Follow the signals through the three gates." }),
        P.truth({ label: "(b)", marks: 4, stem: "Complete the truth table for X.", inputs: ["A", "B", "C"], fn: f, explanation: "P is 1 only when A = 0 and B = 0; Q is 1 only when B = 1 and C = 1; X is 1 if either is 1." }),
        P.num({ label: "(c)", marks: 1, type: "CALCULATION", stem: "In how many of the eight rows is X = 1?", value: ones, explanation: `X is 1 in ${ones} rows.` }),
        P.short({ label: "(d)", marks: 1, stem: "Name the gate whose output is 1 only when both of its inputs are 0.", accepted: ["NOR", "NOR gate"], explanation: "NOR is OR followed by NOT." }),
        P.manual({ label: "(e)", marks: 3, stem: "A second circuit has an output Y that must be 1 when switch S is on AND either the door sensor D or the window sensor W is on. Write the logic expression for Y and state the two kinds of gate needed.", points: ["Y = S AND (D OR W).", "An OR gate for D and W.", "An AND gate combining S with the output of the OR gate."], modelAnswer: "Y = S AND (D OR W). An OR gate takes D and W; an AND gate takes S and the output of the OR gate." }),
      ]),
      hints: ["Label the output of each gate P and Q first.", "Fill the table column by column."],
      explanation: `X = (A NOR B) OR (B AND C); it is 1 in ${ones} rows.`,
    });
  }
  // ------------------------------------------------------------------ 4. Boolean algebra and K-maps (Cambridge)
  {
    const abc = ["A", "B", "C"];
    const f = (a, bb, c) => L.or(L.or(L.or(L.and(L.and(L.not(a), L.not(bb)), c), L.and(L.and(L.not(a), bb), c)), L.and(L.and(a, L.not(bb)), L.not(c))), L.and(L.and(a, bb), L.not(c)));
    const m = minimise(abc, truthRows(abc, f).flatMap((r, i) => (r.out ? [i] : [])));
    same(m.terms.slice().sort(), ["A AND NOT C", "NOT A AND C"], "t10-4");
    b.struct({
      ...TH10, d: 4, paper: "Cambridge Paper 3", applies: CAM,
      concepts: [C("logic.boolean-algebra"), C("logic.karnaugh-maps")],
      stem: "A logic circuit has inputs A, B and C. Its output is given by `X = (NOT A AND NOT B AND C) OR (NOT A AND B AND C) OR (A AND NOT B AND NOT C) OR (A AND B AND NOT C)`.",
      parts: checkExam(EXAM.THEORY10, [
        P.truth({ label: "(a)", marks: 4, stem: "Complete the truth table for X.", inputs: abc, fn: f, explanation: "Each term is 1 for exactly one row: 001, 011, 100 and 110." }),
        P.mcq({ label: "(b)", marks: 2, stem: "Which expression is the simplified form of X?", options: [["(NOT A AND C) OR (A AND NOT C)", "Correct: it is 1 when A and C differ, whatever B is."], ["(A AND C) OR (NOT A AND NOT C)", "This is 1 when A and C are the same."], ["(NOT B AND C) OR (B AND NOT C)", "This depends on B and C, but X does not depend on B."], ["A OR C", "This is also 1 when A and C are both 1."]], answer: "A", explanation: `The simplified expression is ${m.expression}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "Describe the groups that would be drawn on a Karnaugh map of X.", points: ["A group of two cells 001 and 011, where A = 0 and C = 1 and B changes (term NOT A AND C).", "A group of two cells 100 and 110, where A = 1 and C = 0 and B changes (term A AND NOT C)."], modelAnswer: "One group covers the cells 001 and 011, where A = 0 and C = 1 (B changes), giving NOT A AND C. The other covers 100 and 110, where A = 1 and C = 0, giving A AND NOT C." }),
        P.manual({ label: "(d)", marks: 2, stem: "Show using Boolean algebra that the first two terms of X simplify to `NOT A AND C`. Name the laws.", points: ["Factorise: (NOT A AND C) AND (NOT B OR B) (distributive law).", "NOT B OR B = 1, so the result is NOT A AND C (complement and identity laws)."], modelAnswer: "(NOT A AND NOT B AND C) OR (NOT A AND B AND C) = (NOT A AND C) AND (NOT B OR B) by the distributive law = (NOT A AND C) AND 1 by the complement law = NOT A AND C by the identity law." }),
      ]),
      hints: ["The terms in B and NOT B pair up.", "X depends on only two of the three inputs."],
      explanation: `X = ${m.expression}, which is 1 when A and C are different.`,
    });
  }

  // ------------------------------------------------------------------ THEORY5 items
  {
    const w = "CHIPO";
    const n = 906;
    b.struct({
      ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("data.character-sets"), C("data.number-bases")],
      stem: "A clinic in Hwange stores a patient's name and a three-digit ward code in a computer.",
      parts: checkExam(EXAM.THEORY5, [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "bits", stem: `The name **${w}** is stored in 7-bit ASCII. Calculate the number of bits used.`, value: w.length * 7, explanation: `${w.length} characters × 7 bits = ${w.length * 7} bits.` }),
        P.short({ label: "(b)", marks: 1, stem: `The ward code **${n}** is stored in Binary Coded Decimal using four bits for each digit. Write the BCD.`, accepted: [bcd(n), bcd(n).replace(/ /g, "")], normalise: ["trim", "remove_whitespace"], explanation: `${String(n).split("").map((d) => `${d} = ${toBase(Number(d), 2, 4)}`).join(", ")}: ${bcd(n)}.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State two ways in which Unicode differs from 7-bit ASCII.", points: ["Unicode can represent many more characters (many languages and symbols).", "Unicode characters use more bits (for example 8 to 32 bits in UTF-8 and UTF-16) and have code points."], modelAnswer: "Unicode represents the characters of many languages and symbols, while 7-bit ASCII has only 128. Unicode uses more bits per character (up to 32 bits) than ASCII's 7." }),
      ]),
      explanation: `(a) ${w.length * 7} bits. (b) ${bcd(n)}. (c) Unicode has far more characters and uses more bits.`,
    });
  }
  {
    const [w, h, d] = [256, 128, 4];
    const [rate, res, sec] = [4000, 8, 10];
    b.struct({
      ...TH5, d: 3, paper: "Cambridge Paper 1", applies: CAM, calculator: false,
      concepts: [C("media.graphics"), C("media.sound")],
      stem: `A museum in Bulawayo digitises a picture and an oral history recording. The picture is a bitmap of ${w} × ${h} pixels with a colour depth of ${d} bits. The recording is mono and lasts ${sec} seconds, sampled at ${rate} Hz with ${res} bits per sample.`,
      hints: ["File size in bits = width × height × colour depth.", "Sound size in bits = rate × resolution × time."],
      parts: checkExam(EXAM.THEORY5, [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the size of the bitmap in bytes (ignore the header).", value: (w * h * d) / 8, explanation: `${w} × ${h} × ${d} = ${w * h * d} bits; ÷ 8 = ${(w * h * d) / 8} bytes.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the size of the sound file in bytes.", value: soundBits(rate, res, sec) / 8, explanation: `${rate} × ${res} × ${sec} = ${soundBits(rate, res, sec)} bits; ÷ 8 = ${soundBits(rate, res, sec) / 8} bytes.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "The sampling rate of the recording is doubled. What happens to the file size?", options: [["It is halved", "More samples mean a larger file."], ["It stays the same", "The number of samples changes."], ["It is doubled", "Correct: the size is proportional to the sampling rate."], ["It is quadrupled", "Only the rate has changed, so the size doubles."]], answer: "C", explanation: "File size is proportional to the sampling rate." }),
      ]),
      explanation: `Bitmap: ${(w * h * d) / 8} bytes. Sound: ${soundBits(rate, res, sec) / 8} bytes. Doubling the rate doubles the sound file.`,
    });
  }
  {
    const s = "MMMMMMMNNNMMMMMM";
    const pairs = rle(s.split(""));
    const code = rleText(pairs);
    b.struct({
      ...TH5, d: 2, paper: "Cambridge Paper 1", applies: CAM,
      concepts: [C("media.compression")],
      stem: "A map file in Mutare stores a row of pixels as the text below, where M is the colour of the map background and N is a road.",
      parts: checkExam(EXAM.THEORY5, [
        P.short({ label: "(a)", marks: 2, stem: `Write the run-length encoding of the row **${s}**, as the count followed by the character for each run.`, accepted: [code, pairs.map(([n, c]) => `${n}${c}`).join(" "), pairs.map(([n, c]) => `${n}${c}`).join(",")], normalise: ["trim", "lowercase", "remove_whitespace"], explanation: `The runs are ${pairs.map(([n, c]) => c.repeat(n)).join(", ")}: ${code}.` }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", unit: "bytes", stem: "Each count and each character uses one byte. How many bytes does the encoded row use?", value: pairs.length * 2, explanation: `${pairs.length} pairs × 2 bytes = ${pairs.length * 2} bytes.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State whether run-length encoding is lossless or lossy, and give a reason.", points: ["Lossless.", "The original row can be restored exactly by repeating each character by its count."], modelAnswer: "It is lossless, because the original data can be rebuilt exactly from the counts and characters." }),
      ]),
      explanation: `${code} uses ${pairs.length * 2} bytes; the method is lossless.`,
    });
  }
});
