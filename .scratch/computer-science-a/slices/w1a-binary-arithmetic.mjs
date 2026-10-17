// W1a: negative binary integers and binary arithmetic. Both boards; multiplication and division are ZIMSEC detail.
import { concept, P, ZIM, toBase, fromBase, twos, fromTwos, onesComp, negateTwos, addTwos, subTwos, binaryMultiply, binaryDivide, group, chk } from "../lib.mjs";

const mn = (v) => String(v).replace("-", "−");

concept("acs.data.binary-arithmetic", { file: "data/binary-arithmetic", keyPrefix: "data.binary-arithmetic" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What range of denary integers can be stored in an 8-bit two's complement register?",
    options: [
      ["−128 to 127", "Correct: the leftmost bit is worth −128, so the range is −128 to +127."],
      ["−127 to 127", "That is the range for sign-and-magnitude, which wastes a pattern on −0."],
      ["0 to 255", "That is the range for unsigned binary."],
      ["−128 to 128", "There are only 256 patterns; if −128 is included the top value is 127."],
    ],
    answer: "A",
    explanation: "With n bits, two's complement covers −2^(n−1) to 2^(n−1) − 1. For n = 8 this is −128 to 127.",
  });
  {
    const v = -37;
    b.bits({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `Write the denary number **${mn(v)}** as an 8-bit two's complement binary number.`,
      value: v, width: 8, twosComplement: true,
      explanation: `+37 = ${toBase(37, 2, 8)}. Invert: ${onesComp(toBase(37, 2, 8))}. Add 1: ${twos(v, 8)}.`,
    });
  }
  {
    const s = "11001110";
    const v = fromTwos(s);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `What is the denary value of the 8-bit two's complement number **${s}**?`,
      value: v,
      workedSolution: `1. The leftmost bit is 1, so it is worth −128.
2. The other 1s are worth 64, 8, 4 and 2, which add to 78.
3. −128 + 78 = ${mn(v)}.`,
      explanation: `The leftmost bit is worth −128. The other 1s are 64 + 8 + 4 + 2 = 78. So −128 + 78 = ${mn(v)}.`,
    });
  }
  {
    const s = "01101001";
    b.bits({
      d: 1, skill: "RECALL",
      stem: `Write the one's complement of the 8-bit binary number **${s}**.`,
      value: fromBase(onesComp(s), 2), width: 8,
      explanation: `Change every bit: ${s} becomes ${onesComp(s)}.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In two's complement there are two different bit patterns for zero, so +0 and −0 are stored differently.",
    answer: false,
    feedbackTrue: "That describes sign-and-magnitude and one's complement. Two's complement has a single zero.",
    feedbackFalse: "Correct: all zeros is the only zero, which is one of the reasons two's complement is used.",
    explanation: "Inverting 00000000 gives 11111111 and adding 1 gives 100000000; the carry out of the register is lost, leaving 00000000 again.",
  });
  {
    const [x, y] = [85, -34];
    const r = addTwos(twos(x, 8), twos(y, 8));
    chk(r.trueValue, 51);
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `Using 8-bit two's complement, add **${x}** and **${mn(y)}**. Give the 8-bit result.`,
      value: r.value, width: 8, twosComplement: true,
      hints: ["Write both numbers as 8-bit patterns first.", "Discard any carry out of the leftmost column."],
      explanation: `${x} = ${twos(x, 8)} and ${mn(y)} = ${twos(y, 8)}. Their sum is ${r.sum} (carry out discarded), which is ${r.value} = ${x} − ${-y}.`,
    });
  }
  {
    const [x, y] = [40, 75];
    const r = subTwos(twos(x, 8), twos(y, 8));
    b.bits({
      d: 3, skill: "APPLICATION",
      stem: `Work out **${x} − ${y}** in 8-bit two's complement by adding the two's complement of ${y}. Give the 8-bit result.`,
      value: r.value, width: 8, twosComplement: true,
      hints: ["Negate the second number first: invert and add 1.", "The answer is negative, so it starts with 1."],
      explanation: `${y} = ${twos(y, 8)}; its two's complement is ${r.negated}. ${twos(x, 8)} + ${r.negated} = ${r.sum}, which is ${mn(r.value)}.`,
    });
  }
  {
    const pairs = [["90 + 50", 90, 50], ["90 + (−50)", 90, -50], ["−90 + 50", -90, 50], ["−60 + (−60)", -60, -60]];
    const flags = pairs.map(([, p, q]) => addTwos(twos(p, 8), twos(q, 8)).overflow);
    if (flags.filter(Boolean).length !== 1 || !flags[0]) throw new Error("exactly the first pair should overflow");
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: "Which of these additions causes overflow in an 8-bit two's complement register?",
      options: pairs.map(([t, p, q], i) => [t, flags[i] ? `Correct: the true answer ${mn(p + q)} is outside −128 to 127.` : `The true answer ${mn(p + q)} is inside the range, so no overflow.`]),
      answer: "A",
      hints: ["Overflow needs two numbers of the same sign.", "Check whether the true answer lies between −128 and 127."],
      explanation: "Two positive numbers 90 and 50 give 140, which is more than 127, so the result would wrongly appear negative. The others are inside the range (−120 is within −128 to 127).",
    });
  }
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: "What is the smallest (most negative) integer that can be stored in a 6-bit two's complement register?",
    value: -(2 ** 5),
    explanation: "The leftmost bit is worth −2^5 = −32 and all other bits are 0 for the smallest value: 100000 = −32.",
  });
  {
    const n = 52;
    const p = toBase(n, 2, 8);
    const inv = onesComp(p);
    const neg = twos(-n, 8);
    if (toBase(fromBase(inv, 2) + 1, 2, 8) !== neg) throw new Error("negation check");
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `Complete the working to find the 8-bit two's complement of **${mn(-n)}**. The positive number ${n} is ${p} in 8 bits.`,
      template: `Invert every bit: {{blank:inv}}\n\nAdd 1: {{blank:neg}}`,
      blanks: [
        { id: "inv", accepted: [inv] },
        { id: "neg", accepted: [neg] },
      ],
      hints: ["Change every 0 to 1 and every 1 to 0, then add binary 1."],
      explanation: `${p} inverted is ${inv}; adding 1 gives ${neg}. Check: −128 + ${fromBase(neg, 2) - 128} = ${fromTwos(neg)}.`,
    });
  }
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: "How many different integers can a 10-bit two's complement register store?",
    value: 1024,
    explanation: "Ten bits give 2^10 = 1024 patterns and every pattern is a different integer in two's complement (−512 to 511).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each representation to its description.",
    pairs: [
      ["Sign and magnitude", "First bit is a sign, the rest give the size; two patterns for zero"],
      ["One's complement", "Negative numbers are the inverted bits of the positive number"],
      ["Two's complement", "Invert the bits and add 1; one pattern for zero"],
      ["Unsigned binary", "No negative numbers; 8 bits give 0 to 255"],
    ],
    explanation: "Only two's complement has a single zero and lets the same adder handle addition and subtraction.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do computers use two's complement for signed integers?",
    options: [
      ["One adder circuit can add and subtract, and zero has one pattern", "Correct: subtraction becomes addition of the negation, and −0 does not exist."],
      ["It needs fewer bits than sign and magnitude for the same range", "Both use the same number of bits for the same count of patterns."],
      ["It can store fractions exactly as well as whole numbers", "Two's complement integers cannot hold fractions."],
      ["It guarantees that no addition can ever overflow", "Overflow is still possible if the result is outside the range."],
    ],
    answer: "A",
    explanation: "Two's complement removes the need for a separate subtraction circuit and wastes no pattern on a second zero.",
  });
  {
    const [x, y] = [11, 5];
    const m = binaryMultiply(x, y);
    b.bits({
      d: 3, skill: "APPLICATION", applies: ZIM,
      stem: `Multiply the binary numbers **${toBase(x, 2)}** and **${toBase(y, 2)}**. Give the product in binary.`,
      value: m.product, acceptUnpadded: true,
      hints: ["Write the multiplicand shifted left once for each 1 in the multiplier, then add.", "Check by converting to denary."],
      explanation: `The multiplier ${toBase(y, 2)} has 1s in the 1s and 4s places, so add ${m.partials.join(" + ")} = ${m.productBin}. Check: ${x} × ${y} = ${m.product}.`,
    });
  }
  {
    const [x, y] = [53, 5];
    const dv = binaryDivide(x, y);
    b.bits({
      d: 3, skill: "APPLICATION", applies: ZIM,
      stem: `Divide the binary number **${toBase(x, 2)}** by **${toBase(y, 2)}**. Give the quotient (the whole-number part of the answer) in binary.`,
      value: dv.quotient, acceptUnpadded: true,
      hints: ["Use long division: subtract the divisor wherever it fits.", "Convert to denary to check: the divisor is 5."],
      explanation: `${x} ÷ ${y} = ${dv.quotient} remainder ${dv.remainder}, so the quotient is ${dv.quotientBin} and the remainder is ${dv.remainderBin}.`,
    });
  }
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by overflow when two numbers are added in a fixed-width register, and how it can be detected for two's complement numbers.",
    points: [
      "The result is too large (or too small) to be stored in the number of bits available.",
      "The stored result is wrong (for example, it has the wrong sign).",
      "It is detected when two numbers of the same sign give a result of the opposite sign.",
    ],
    modelAnswer: "Overflow happens when the true result lies outside the range the register can hold, so the stored bits represent a wrong value. For two's complement addition it is detected when adding two positive numbers gives a negative-looking result, or two negative numbers give a positive-looking result.",
    hints: ["Think about the range of an 8-bit register and the sign bit of the answer."],
    explanation: "Overflow is about range, not about the carry out of the leftmost column.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Compare sign-and-magnitude with two's complement for storing negative integers.",
    points: [
      "Sign-and-magnitude uses the first bit as the sign and the rest as the size; two's complement gives the first bit a negative place value.",
      "Sign-and-magnitude has two zeros (+0 and −0); two's complement has one.",
      "Two's complement lets the same adder do addition and subtraction; sign-and-magnitude needs extra logic.",
    ],
    modelAnswer: "In sign-and-magnitude the first bit is only a sign and the other bits give the size, so there are two patterns for zero and addition needs the signs to be checked. In two's complement the leftmost bit is worth a negative power of two, there is one zero, and the same addition circuit handles negative numbers.",
    hints: ["Compare the number of patterns for zero and the circuits needed."],
    explanation: "These are the reasons sign-and-magnitude is rejected in modern processors.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain how a processor with no subtraction circuit can work out A − B using only addition.",
    points: [
      "It finds the two's complement of B (invert the bits and add 1) to get −B.",
      "It adds A and −B, discarding any carry out of the leftmost column.",
    ],
    modelAnswer: "It converts B to −B by inverting every bit and adding 1, then adds this to A in the normal adder and ignores any carry out.",
    explanation: "Because A − B = A + (−B).",
  });
  {
    const v = -66;
    const [x, y] = [90, 50];
    const r = addTwos(twos(x, 8), twos(y, 8));
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: `A counter in a stock program for a Kariba fishing co-operative is held as an 8-bit two's complement integer. A negative value shows fish owed to customers.`,
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: `Show the counter value **${mn(v)}** as an 8-bit two's complement number.`, value: v, width: 8, twosComplement: true, explanation: `+${-v} = ${toBase(-v, 2, 8)}; invert and add 1 to get ${twos(v, 8)}.` }),
        P.bits({ label: "(b)", marks: 2, stem: `The counter holds ${x} and ${y} more are added. Give the 8-bit pattern stored after the addition.`, value: r.value, width: 8, twosComplement: true, explanation: `${twos(x, 8)} + ${twos(y, 8)} = ${r.sum}.` }),
        P.mcq({ label: "(c)", marks: 2, stem: "Which statement about the result in part (b) is correct?", options: [["No overflow: a sum of " + r.trueValue + " fits in 8 bits", "That is true for unsigned 8 bits but not for two's complement."], ["Overflow has occurred because the true total, " + r.trueValue + ", is more than 127", "Correct: two positive numbers gave a result that looks negative."], ["Overflow has occurred because a carry came out of the leftmost column", "Carry out is not the test for overflow."], ["Underflow has occurred because the total is negative", "The true total is positive; the stored pattern only looks negative."]], answer: "B", explanation: "Two positive numbers gave a result that appears negative, so overflow occurred." }),
      ],
      hints: ["Part (b) uses the two patterns added column by column.", "The largest 8-bit two's complement value is 127."],
      explanation: `${mn(v)} = ${twos(v, 8)}. ${x} + ${y} = 140 is above 127, so the stored pattern ${r.sum} is read as ${mn(r.value)}: overflow.`,
    });
  }
  {
    const start = twos(-100, 8);
    const steps = [["add", 30], ["add", 45], ["subtract", 120]];
    let v = -100;
    const rows = [];
    for (const [op, n] of steps) {
      const r = op === "add" ? addTwos(twos(v, 8), twos(n, 8)) : subTwos(twos(v, 8), twos(n, 8));
      rows.push({ op, n, r });
      v = r.value;
    }
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: `A register in a prototype electricity-meter chip is an 8-bit two's complement integer that starts at ${mn(-100)} (${start}). The chip adds 30, then adds 45, then subtracts 120.`,
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: "Give the 8-bit register contents after adding 30.", value: rows[0].r.value, width: 8, twosComplement: true, explanation: `${start} + ${twos(30, 8)} = ${rows[0].r.sum} (${mn(rows[0].r.value)}).` }),
        P.bits({ label: "(b)", marks: 2, stem: "Give the 8-bit register contents after adding 45 to the result of part (a).", value: rows[1].r.value, width: 8, twosComplement: true, explanation: `${rows[0].r.sum} + ${twos(45, 8)} = ${rows[1].r.sum} (${mn(rows[1].r.value)}).` }),
        P.bits({ label: "(c)", marks: 2, stem: "The chip now subtracts 120 by adding the two's complement of 120. Give the 8-bit pattern of −120.", value: -120, width: 8, twosComplement: true, explanation: `120 = ${toBase(120, 2, 8)}; invert ${onesComp(toBase(120, 2, 8))}; add 1: ${twos(-120, 8)}.` }),
        P.mcq({ label: "(d)", marks: 2, stem: "What happens in the final subtraction?", options: [["The answer is " + mn(rows[1].r.value + 120) + " and it fits in 8 bits", "That adds 120 instead of subtracting it."], ["The answer is a positive " + (-rows[1].r.value + 120) + " in 8 bits", "Subtracting 120 from a negative number cannot give a positive number."], ["The answer " + mn(rows[1].r.value - 120) + " is below −128: overflow", "Correct: the stored pattern would be read as a large positive number."], ["Subtraction in a register can never overflow", "Overflow can occur in subtraction as well as addition."]], answer: "C", explanation: "The register holds " + mn(rows[1].r.value) + " before the last step; " + mn(rows[1].r.value) + " − 120 = " + mn(rows[1].r.value - 120) + ", which is below −128." }),
      ],
      hints: ["Track the value in denary as well as in binary to check each step.", "Work out the true result of the last step before deciding about overflow."],
      explanation: `The register goes ${mn(-100)} → ${mn(rows[0].r.value)} → ${mn(rows[1].r.value)}; subtracting 120 would give ${mn(rows[1].r.value - 120)}, which is below −128 so negative overflow occurs.`,
    });
  }

  {
    const s = "00010100";
    const neg = negateTwos(s);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `What is the two's complement of the 8-bit binary number **${s}** (which represents ${fromTwos(s)})?`,
      options: [
        [neg, `Correct: invert to ${onesComp(s)}, then add 1.`],
        [onesComp(s), "That is only the one's complement; 1 has not been added."],
        [toBase(fromBase(s, 2) + 1, 2, 8), "This just adds 1 to the original number without inverting."],
        ["1" + s.slice(1), "Only the sign bit has been changed: that is sign and magnitude."],
      ],
      answer: "A",
      explanation: `${s} inverted is ${onesComp(s)}; adding 1 gives ${neg}, which represents ${mn(fromTwos(neg))}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What denary value does the 8-bit two's complement pattern 10000000 represent?",
    options: [
      ["−128", "Correct: the leftmost bit is worth −128 and all other bits are 0."],
      ["−0", "Two's complement has no negative zero."],
      ["−127", "That is the value of 10000001."],
      ["128", "128 needs nine bits in two's complement; the leftmost bit is negative."],
    ],
    answer: "A",
    hints: ["The leftmost bit has a negative place value."],
    explanation: "The sign bit is worth −128 and the other bits add nothing, so the value is −128, the smallest 8-bit two's complement value.",
  });

  b.card("DEFINITION", "Two's complement", "A signed integer code in which the leftmost bit has a negative place value; negate a number by inverting the bits and adding 1.");
  b.card("FORMULA", "Range of an n-bit two's complement integer", "−2^(n−1) to 2^(n−1) − 1 (8 bits: −128 to 127).");
  b.card("CONCEPT", "How do you find the two's complement of a positive number?", "Write it in the required number of bits, invert every bit, and add 1.");
  b.card("CONCEPT", "How does a processor calculate A − B?", "It adds A to the two's complement of B and ignores any carry out of the leftmost column.");
  b.card("DEFINITION", "Overflow", "The result of an operation is outside the range the register can store, so the stored value is wrong.");
  b.card("FACT", "When does two's complement addition overflow?", "When two numbers of the same sign give a result of the opposite sign. Numbers of different signs never overflow.");
  b.card("FACT", "Why is two's complement used rather than sign and magnitude?", "One pattern for zero, and the same adder works for addition and subtraction.");
  b.card("CONCEPT", "Binary multiplication by shift and add", "For each 1 in the multiplier write the multiplicand shifted left by that place, then add the rows.", undefined, { applies: ZIM });
  b.card("FACT", `One's complement of ${"10110010"}`, `${onesComp("10110010")} (every bit changed).`);
});
