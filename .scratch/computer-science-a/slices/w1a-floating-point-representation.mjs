// W1a: floating-point representation (Cambridge layout: two's complement mantissa with the point after the sign bit, two's complement exponent).
import { concept, P, fpDecode, fpEncode, fpNormalise, fpMantissaValue, fpRange, fromTwos, twos, toBase, fromBase, group, chk } from "../lib.mjs";

const mn = (v) => String(v).replace("-", "−");

concept("acs.data.floating-point-representation", { file: "data/floating-point-representation", keyPrefix: "data.floating-point-representation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In the floating-point format used in this course, where is the binary point in the mantissa?",
    options: [
      ["Immediately after the sign bit", "Correct: a positive mantissa is written 0.… and a negative mantissa 1.…."],
      ["At the right-hand end of the mantissa", "That would make the mantissa a whole number."],
      ["Immediately before the sign bit", "The sign bit is the leftmost bit; the point cannot be before it."],
      ["In the exponent", "The exponent is a separate integer that moves the point."],
    ],
    answer: "A",
    explanation: "The mantissa is a two's complement fraction with the binary point after the sign bit, so its value lies from −1 up to just below 1.",
  });
  {
    const e = "1101";
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A 4-bit exponent is stored in two's complement as **${e}**. What is its denary value?`,
      value: fromTwos(e),
      workedSolution: `1. The leftmost bit of ${e} is worth −8.\n2. The other 1s are worth 4 and 1.\n3. −8 + 4 + 1 = ${mn(fromTwos(e))}.`,
      explanation: `${e} = −8 + 4 + 1 = ${mn(fromTwos(e))}.`,
    });
  }
  {
    const [m, e] = ["01010000", "0011"];
    const v = fpDecode(m, e);
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: `A floating-point number has an 8-bit mantissa **${m}** and a 4-bit exponent **${e}**, both in two's complement. What is its denary value?`,
      value: v,
      workedSolution: `1. Mantissa: 0.${m.slice(1)} = ${fpMantissaValue(m)}.\n2. Exponent: ${e} = ${fromTwos(e)}.\n3. Value = ${fpMantissaValue(m)} × 2^${fromTwos(e)} = ${fpMantissaValue(m)} × ${2 ** fromTwos(e)} = ${v}.`,
      explanation: `The mantissa is ½ + ⅛ = ${fpMantissaValue(m)}; the exponent is ${fromTwos(e)}; so the value is ${fpMantissaValue(m)} × ${2 ** fromTwos(e)} = ${v}.`,
    });
  }
  {
    const [m, e] = ["10110000", "0100"];
    const v = fpDecode(m, e);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Convert the floating-point number with 8-bit mantissa **${m}** and 4-bit exponent **${e}** (both two's complement) to denary.`,
      value: v,
      hints: ["The mantissa starts with 1, so it is negative: the leftmost bit is worth −1.", "Multiply the mantissa value by 2 to the power of the exponent."],
      explanation: `Mantissa: −1 + ¼ + ⅛ = ${fpMantissaValue(m)}. Exponent ${e} = ${fromTwos(e)}. Value = ${mn(fpMantissaValue(m))} × ${2 ** fromTwos(e)} = ${mn(v)}.`,
    });
  }
  {
    const x = 10.5;
    const enc = fpEncode(x, 8, 4);
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `A floating-point number uses an 8-bit two's complement mantissa and a 4-bit two's complement exponent. Write the normalised **mantissa** for the denary number **${x}**.`,
      value: fromBase(enc.mant, 2), width: 8,
      hints: ["Write 10.5 in binary: 1010.1.", "Move the point to just after the sign bit: 0.10101 × 2 to the power 4."],
      explanation: `${x} = 1010.1 in binary = 0.10101 × 2^4. The mantissa padded to 8 bits is ${enc.mant}. The exponent is ${enc.exp}.`,
    });
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `For the same format (8-bit mantissa, 4-bit exponent), write the **exponent** for the number **${x}** when its mantissa is normalised.`,
      value: fromBase(enc.exp, 2), width: 4,
      hints: ["How many places must the binary point move to sit after the sign bit?"],
      explanation: `The point moves four places left, so the exponent is +4 = ${enc.exp} in 4-bit two's complement.`,
    });
  }
  {
    const x = -2.5;
    const enc = fpEncode(x, 8, 4);
    const pos = fpEncode(-x, 8, 4);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `Complete the steps to store **${mn(x)}** with an 8-bit mantissa and a 4-bit exponent. The positive number ${-x} is stored with mantissa ${pos.mant} and exponent ${pos.exp}.`,
      template: `Mantissa of ${mn(x)}: {{blank:m}}\n\nExponent of ${mn(x)}: {{blank:e}}`,
      blanks: [{ id: "m", accepted: [enc.mant] }, { id: "e", accepted: [enc.exp] }],
      hints: ["For a negative number take the two's complement of the mantissa only.", "The exponent does not change."],
      explanation: `Invert ${pos.mant} to ${pos.mant.split("").map((c) => (c === "0" ? "1" : "0")).join("")} and add 1 to give ${enc.mant}. The exponent stays ${enc.exp}. Check: ${mn(fpMantissaValue(enc.mant))} × ${2 ** fromTwos(enc.exp)} = ${mn(enc.value)}.`,
    });
  }
  {
    const m = "00101100", e = "0110";
    const n = fpNormalise(m, e);
    chk(fpDecode(m, e), fpDecode(n.mant, n.exp));
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `The floating-point number with mantissa **${m}** and exponent **${e}** is not normalised. Write its normalised 8-bit mantissa.`,
      value: fromBase(n.mant, 2), width: 8,
      hints: ["Shift the mantissa left until the first two bits are different.", "The value must not change, so lower the exponent for each shift."],
      explanation: `One shift left gives ${n.mant}, which starts 01. The exponent falls from ${fromTwos(e)} to ${fromTwos(n.exp)} (${n.exp}). Value unchanged: ${fpDecode(n.mant, n.exp)}.`,
    });
  }
  {
    const m = "00001010", e = "0111";
    const n = fpNormalise(m, e);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: `How many places must the mantissa **${m}** (exponent ${e}) be shifted left to normalise it?`,
      value: n.shifts,
      hints: ["Count the leading digits that are equal to the sign bit before the first different bit."],
      workedSolution: `1. ${m} starts 0000, so shift left until it starts 01.\n2. Three shifts give ${n.mant}.\n3. The exponent falls by 3, from ${fromTwos(e)} to ${fromTwos(n.exp)}.`,
      explanation: `Shifting left ${n.shifts} places gives ${n.mant}, which begins 01.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are floating-point numbers normalised?",
    options: [
      ["To give the maximum precision and a single representation for each value", "Correct: all the mantissa bits carry significant digits, and each number has one pattern."],
      ["To make the exponent as large as possible so that the range is bigger", "Normalising lowers the exponent when it shifts the mantissa; it does not enlarge the range."],
      ["To make the number occupy fewer bits in memory", "The number of bits stays the same."],
      ["To avoid the need to store a sign for the number", "The sign is still stored as the first mantissa bit."],
    ],
    answer: "A",
    explanation: "Normalisation removes wasted leading bits from the mantissa. This increases precision and means each number has only one representation.",
  });
  {
    const opts = [["00110100", "0001"], ["01001100", "0010"], ["11011000", "0010"], ["00010110", "0011"]];
    const ok = opts.map(([m]) => m[0] !== m[1]);
    chk(ok.filter(Boolean).length, 1);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "Which of these 8-bit mantissas is in normalised form?",
      options: opts.map(([m, e], i) => [`${m} (exponent ${e})`, ok[i] ? "Correct: it starts 01, so the first two bits differ." : `It starts ${m.slice(0, 2)}, so the first two bits are the same and it is not normalised.`]).sort((p, q) => (q[1].startsWith("Correct") ? 1 : 0) - (p[1].startsWith("Correct") ? 1 : 0)),
      answer: "A",
      explanation: "A normalised mantissa starts 01 (positive) or 10 (negative). Patterns starting 00 or 11 can still be shifted left.",
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A system stores each real number in 12 bits. A designer moves 2 bits from the mantissa to the exponent. What is the effect?",
    options: [
      ["The range increases and the precision decreases", "Correct: more exponent bits allow bigger and smaller numbers, but fewer mantissa bits means fewer significant digits."],
      ["The range decreases and the precision increases", "That is the effect of moving bits from the exponent to the mantissa."],
      ["Both the range and the precision increase", "The total number of bits is fixed, so one gain costs the other."],
      ["Neither the range nor the precision changes", "The split between the two parts decides both."],
    ],
    answer: "A",
    hints: ["Which part of the number controls the size of the biggest value?", "Which part controls the number of significant digits?"],
    explanation: "The exponent controls the range and the mantissa controls the precision. With a fixed total, moving bits to the exponent widens the range at the cost of precision.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A normalised negative mantissa starts with the bits 10.",
    answer: true,
    feedbackTrue: "Correct: for negative numbers, normalised means the first two bits differ, and the sign bit is 1.",
    feedbackFalse: "A negative mantissa has sign bit 1, and normalised means the second bit differs from it, so it starts 10.",
    explanation: "Normalised positive mantissas start 01; normalised negative mantissas start 10.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Mantissa", "The part that holds the significant digits"],
      ["Exponent", "The power of two by which the mantissa is multiplied"],
      ["Normalisation", "Shifting the mantissa so its first two bits differ"],
      ["Precision", "The number of significant bits available to represent a value"],
    ],
    explanation: "A floating-point value is mantissa × 2^exponent; normalising maximises precision.",
  });
  {
    const r = fpRange(6, 3);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: "A format has a 6-bit mantissa and a 3-bit exponent, both two's complement. What is the largest positive value that it can store?",
      value: r.maxPositive,
      hints: ["The largest mantissa is 011111, which is just under 1.", "The largest exponent in 3-bit two's complement is 3."],
      explanation: `Largest mantissa 011111 = 31/32 = ${31 / 32}; largest exponent 011 = 3; 31/32 × 2^3 = ${r.maxPositive}.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what happens to the range and the precision of numbers when one bit is moved from the mantissa to the exponent in a fixed-length floating-point format.",
    points: [
      "The range increases because a larger exponent can be stored.",
      "The precision decreases because there are fewer bits in the mantissa for significant digits.",
      "The total number of bits does not change, so there is a trade-off.",
    ],
    modelAnswer: "With one more exponent bit, larger and smaller numbers can be stored, so the range increases. With one fewer mantissa bit, each number has one fewer significant binary digit, so the precision decreases. The total length is fixed, so range is gained at the cost of precision.",
    hints: ["Think about what each part of the number controls."],
    explanation: "Range depends on the exponent; precision depends on the mantissa.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how an unnormalised positive floating-point number is normalised.",
    points: [
      "Shift the mantissa left until the first two bits are 01 (different).",
      "Reduce the exponent by 1 for each place the mantissa is shifted.",
      "The value of the number is unchanged by the process.",
    ],
    modelAnswer: "Shift the mantissa left, filling with zeros on the right, until it starts 01. For each shift, subtract one from the exponent so that the number keeps the same value.",
    hints: ["What must be done to the exponent each time the mantissa moves?"],
    explanation: "A shift left doubles the mantissa, so the exponent must fall by 1 to compensate.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give two benefits of storing floating-point numbers in normalised form.",
    points: ["Maximum precision (all mantissa bits are significant digits).", "Each value has a single representation, which makes comparison easier."],
    modelAnswer: "A normalised number has no wasted leading bits, so its precision is the greatest possible. Each number also has one unique representation.",
    explanation: "These two reasons are what examiners look for.",
  });
  {
    const x = 6.75;
    const e = fpEncode(x, 8, 4);
    const m1 = "01011000", e1 = "0010";
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: "A weather logger at a Mutare school stores readings as floating-point numbers with an 8-bit two's complement mantissa and a 4-bit two's complement exponent.",
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: `One reading is stored with mantissa **${m1}** and exponent **${e1}**. Calculate its denary value.`, value: fpDecode(m1, e1), explanation: `Mantissa ${fpMantissaValue(m1)}, exponent ${fromTwos(e1)}: ${fpMantissaValue(m1)} × 4 = ${fpDecode(m1, e1)}.` }),
        P.bits({ label: "(b)", marks: 2, stem: `The reading **${x}** must be stored. Write its normalised 8-bit mantissa.`, value: fromBase(e.mant, 2), width: 8, explanation: `${x} = 110.11 in binary = 0.11011 × 2^3, so the mantissa is ${e.mant}.` }),
        P.bits({ label: "(c)", marks: 2, stem: `Write the 4-bit exponent for ${x}.`, value: fromBase(e.exp, 2), width: 4, explanation: `The exponent is +3 = ${e.exp}.` }),
      ],
      hints: ["For (b), convert the whole and fractional parts to binary and move the point after the sign bit.", "The exponent is the number of places the point moved."],
      explanation: `(a) ${fpDecode(m1, e1)}. (b) and (c): ${x} is stored as ${e.mant} and ${e.exp}.`,
    });
  }
  {
    const f1 = { m: 10, e: 2 }, f2 = { m: 6, e: 6 };
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: "A designer is choosing between two formats for storing real numbers in 12 bits: Format X with a 10-bit mantissa and a 2-bit exponent, and Format Y with a 6-bit mantissa and a 6-bit exponent. Both use two's complement for the mantissa and the exponent.",
      parts: [
        P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Find the largest positive exponent value that Format X can store.", value: 2 ** (f1.e - 1) - 1, explanation: "A 2-bit two's complement number ranges from −2 to +1, so the largest exponent is 1." }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Find the largest positive exponent value that Format Y can store.", value: 2 ** (f2.e - 1) - 1, explanation: "A 6-bit two's complement number ranges from −32 to +31, so the largest exponent is 31." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which format can store numbers with the greater precision?", options: [["Format Y, because it has more exponent bits", "More exponent bits increase the range, not the precision."], ["Format X, because it has more mantissa bits", "Correct: more mantissa bits mean more significant digits."], ["Both have the same precision because they use 12 bits", "The split of the bits matters, not only the total."], ["Neither, because precision does not depend on the mantissa", "Precision depends on the number of mantissa bits."]], answer: "B", explanation: "The mantissa holds the significant digits." }),
        P.manual({ label: "(d)", marks: 3, stem: "A scientific program must store very large and very small measurements. Explain which format the designer should choose.", points: ["Format Y should be chosen.", "It has more exponent bits so the range of values is much larger.", "The cost is lower precision because it has fewer mantissa bits."], modelAnswer: "Format Y, because the 6-bit exponent allows exponents up to 31 and down to −32, so a vast range of large and small values can be stored. The disadvantage is that the 6-bit mantissa gives fewer significant digits." }),
      ],
      hints: ["A 2-bit two's complement number has the values −2, −1, 0 and 1.", "More exponent bits increase range; more mantissa bits increase precision."],
      explanation: "Format X has exponents up to 1 and 10 mantissa bits (precise, small range); Format Y has exponents up to 31 and 6 mantissa bits (wide range, less precise).",
    });
  }

  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which bit pattern does the mantissa of a normalised positive floating-point number always begin with?",
    options: [
      ["01", "Correct: the sign bit is 0 and the first bit after the point is 1, so the first two bits differ."],
      ["00", "A mantissa starting 00 can still be shifted left."],
      ["11", "A mantissa starting 11 is negative and not normalised."],
      ["10", "A mantissa starting 10 is a normalised negative number."],
    ],
    answer: "A",
    explanation: "A normalised positive mantissa starts 01 and a normalised negative one starts 10.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A floating-point number has the exponent 1110 in 4-bit two's complement. How is the binary point of the mantissa moved to give the value?",
    options: [
      ["Two places to the left", "Correct: 1110 is −2, so the point moves 2 places left."],
      ["Fourteen places to the right", "1110 is 14 only if read as an unsigned number."],
      ["Two places to the right", "A negative exponent moves the point left."],
      ["It is not moved", "An exponent of zero would leave the point where it is."],
    ],
    answer: "A",
    hints: ["Read the exponent as a two's complement number first."],
    explanation: "In 4-bit two's complement, 1110 = −8 + 4 + 2 = −2, so the mantissa is multiplied by 2^−2: the point moves two places to the left.",
  });

  b.card("DEFINITION", "Floating-point number", "A real number stored as a mantissa and an exponent: value = mantissa × 2^exponent.");
  b.card("CONCEPT", "Mantissa layout in this course", "Two's complement fraction with the binary point after the sign bit; positive starts 0.…, negative starts 1.….");
  b.card("CONCEPT", "How do you convert a floating-point number to denary?", "Read the exponent (two's complement integer) and the mantissa (a fraction), then multiply the mantissa by 2 to the power of the exponent.");
  b.card("CONCEPT", "How do you store a negative real number?", "Store the positive number first, then take the two's complement of the mantissa only. The exponent is unchanged.");
  b.card("DEFINITION", "Normalised floating-point number", "The first two mantissa bits differ (01 for positive, 10 for negative); the exponent is adjusted so that the value is unchanged.");
  b.card("FACT", "Why normalise?", "It gives maximum precision and a single representation for each value.");
  b.card("CONCEPT", "How do you normalise a mantissa?", "Shift it left until the first two bits differ, and subtract 1 from the exponent for every place shifted.");
  b.card("FACT", "Range and precision trade-off", "More mantissa bits: greater precision. More exponent bits: greater range. The total number of bits is fixed.");
  b.card("FACT", "Range of an n-bit two's complement exponent", "−2^(n−1) to 2^(n−1) − 1, e.g. 4 bits gives −8 to +7.");
});
