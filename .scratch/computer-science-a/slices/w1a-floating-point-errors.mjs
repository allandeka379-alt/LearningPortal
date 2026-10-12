// W1a: computer arithmetic errors (rounding, overflow, underflow). Both boards (A Level for Cambridge).
import { concept, P, fpEncode, fpDecode, fpRange, fromTwos, twos, toBase, fromBase, py, codeBlock, chk } from "../lib.mjs";

const mn = (v) => String(v).replace("-", "−");

concept("acs.data.floating-point-errors", { file: "data/floating-point-errors", keyPrefix: "data.floating-point-errors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main cause of a rounding error when a real number is stored in floating point?",
    options: [
      ["The mantissa has a limited number of bits", "Correct: the binary expansion is cut off, so only an approximation is stored."],
      ["The processor makes arithmetic mistakes", "The arithmetic is correct for the stored values; the stored values are the problem."],
      ["The exponent is stored in the wrong order", "The order of the exponent does not cause rounding errors."],
      ["The number has too many digits before the point", "A large integer part causes overflow, not rounding errors in the fraction."],
    ],
    answer: "A",
    explanation: "A finite mantissa cannot hold every digit of numbers with a long or never-ending binary expansion, so the stored value is the nearest approximation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The number 0.625 (five eighths) can be stored exactly in a binary floating-point format with enough mantissa bits.",
    answer: true,
    feedbackTrue: "Correct: 0.625 = 0.101 in binary, a short expansion that ends.",
    feedbackFalse: "0.625 = ½ + ⅛ = 0.101 in binary, which ends after three places, so it can be stored exactly.",
    explanation: "Fractions whose denominators are powers of 2 have finite binary expansions.",
  });
  {
    const vals = [0.75, 0.375, 0.6, 2.25];
    const exact = vals.map((v) => Number.isInteger(v * 2 ** 12));
    chk(exact.filter((x) => !x).length, 1);
    const options = vals.map((v, i) => [String(v), exact[i] ? `${v} is a sum of powers of 2, so its binary expansion ends and it is stored exactly.` : "Correct: 0.6 is 0.1001 1001 … in binary, which recurs and is cut off."]);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: "Which of these numbers can **not** be stored exactly with a finite number of mantissa bits?",
      options: [options[2], options[0], options[1], options[3]],
      answer: "A",
      explanation: "Only fractions that are sums of powers of 2 (halves, quarters, eighths …) end in binary. 0.6 recurs, like 1/3 in denary.",
    });
  }
  {
    const t = 0.35, s = 0.34375;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `The number ${t} is stored in a computer as ${s}. What is the absolute error?`,
      value: Number((t - s).toFixed(6)),
      tol: 0.0001,
      workedSolution: `1. Absolute error = |true value − stored value|.\n2. |${t} − ${s}| = ${Number((t - s).toFixed(6))}.`,
      explanation: `The absolute error is the size of the difference: ${t} − ${s} = ${Number((t - s).toFixed(6))}.`,
    });
  }
  {
    const t = 0.7, s = 0.6875;
    const rel = ((t - s) / t) * 100;
    b.calc({
      d: 3, skill: "APPLICATION", unit: "%", tol: 0.05,
      stem: `The number ${t} is stored as ${s}. Calculate the relative error as a percentage, to 2 significant figures.`,
      value: Number(rel.toPrecision(2)),
      hints: ["First find the absolute error.", "Divide the absolute error by the true value, then multiply by 100."],
      explanation: `Absolute error = ${Number((t - s).toFixed(6))}. Relative error = ${Number((t - s).toFixed(6))} ÷ ${t} = ${(rel / 100).toPrecision(3)}, which is ${Number(rel.toPrecision(2))}%.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A program multiplies two very small positive real numbers and the result is stored as zero, because it is smaller than the smallest value the format can hold. What is this called?",
    options: [
      ["Underflow", "Correct: the result is too small to be represented."],
      ["Overflow", "Overflow is when the result is too large."],
      ["Truncation error in the exponent", "The exponent could not hold the value; that is underflow, not truncation."],
      ["Rounding up", "Rounding up would give a larger number, not zero."],
    ],
    answer: "A",
    explanation: "Underflow occurs when the exponent would have to be smaller than the format allows. The number is replaced by zero (or a less precise number).",
  });
  {
    const range = fpRange(6, 3);
    b.fib({
      d: 3, skill: "APPLICATION",
      stem: `A format with a 6-bit mantissa and a 3-bit exponent (both two's complement) stores positive values from ${range.minPositive} up to ${range.maxPositive}. Say what happens in each calculation.`,
      template: "A result of 40 gives {{blank:a}}. A result of 0.01 gives {{blank:b}}. The number 0.45 stored as 0.4375 is {{blank:c}}.",
      blanks: [
        { id: "a", choices: ["overflow", "underflow", "a rounding error"], accepted: ["overflow"] },
        { id: "b", choices: ["overflow", "underflow", "a rounding error"], accepted: ["underflow"] },
        { id: "c", choices: ["overflow", "underflow", "a rounding error"], accepted: ["a rounding error"] },
      ],
      hints: ["Compare each result with the largest and smallest values the format can store."],
      explanation: `40 is above the largest value ${range.maxPositive} (overflow); 0.01 is below the smallest normalised value ${range.minPositive} (underflow); 0.4375 is close to but not equal to 0.45, a rounding error.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A program for a Chipinge cooperative stores prices and balances. Which method avoids rounding errors in the amounts?",
    options: [
      ["Store each amount as a whole number of cents and convert for display", "Correct: integers are exact, so additions and subtractions give exact results."],
      ["Store each amount as a real number with more decimal places", "More digits reduce but do not remove errors like 0.1."],
      ["Store each amount as a real number and compare using =", "Equality tests on reals can fail because of the stored approximation."],
      ["Store each amount as a real number and round only at the end of the year", "Errors accumulate in the meantime."],
    ],
    answer: "A",
    hints: ["Which data type holds whole numbers exactly?"],
    explanation: "Money has a fixed smallest unit (the cent), so whole-number arithmetic in cents is exact. Conversion to dollars and cents is only for display.",
  });
  {
    const out = py("print(0.1 + 0.7 == 0.8)");
    b.short({
      d: 3, skill: "APPLICATION",
      stem: "A Python program contains the statement `print(0.1 + 0.7 == 0.8)`. State the output (True or False).",
      accepted: [out],
      hints: ["Think about whether 0.1 and 0.7 can be stored exactly in binary."],
      wrong: ["True"],
      explanation: `The output is ${out}: 0.1 + 0.7 is stored as 0.7999999999999999, which is not equal to the stored value of 0.8.`,
    });
  }
  {
    const out = py("total = 0.0\nfor i in range(4):\n    total = total + 0.25\nprint(total == 1.0)");
    b.short({
      d: 3, skill: "ANALYSIS",
      stem: "A program starts a total at 1.5, adds 0.5 to it three times, and then outputs `total == 3.0`. State the output (True or False) and give a reason.",
      accepted: [out],
      hints: ["Can 0.25 be stored exactly in binary?"],
      wrong: ["False"],
      explanation: `The output is ${out}. 0.5 is ½ = 0.1 in binary and 1.5 is 1.1, so they are stored exactly, and so are all the sums. There is no rounding error.`,
    });
  }
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Overflow", "The result is larger than the largest value that can be stored"],
      ["Underflow", "The result is smaller than the smallest non-zero value that can be stored"],
      ["Absolute error", "The size of the difference between the true and stored values"],
      ["Relative error", "The absolute error divided by the true value"],
    ],
    explanation: "Overflow and underflow concern the size of a result; absolute and relative error measure how far the stored value is from the true value.",
  });
  {
    const [x, y] = [250, 20];
    const r = (x + y) % 256;
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `An 8-bit unsigned register holds ${x}. A program adds ${y} to it and the carry out of the register is lost. What denary value is now stored?`,
      value: r,
      workedSolution: `1. ${x} + ${y} = ${x + y}, which is more than 255.\n2. The register keeps the remainder after dividing by 256: ${x + y} − 256 = ${r}.`,
      explanation: `The true sum ${x + y} needs nine bits. The register keeps the low eight bits, giving ${r}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A mantissa of 8 bits is cut so that the extra bits are simply dropped. Another system instead chooses the nearest representable value. How do the two methods compare?",
    options: [
      ["Rounding gives a smaller average error than truncation", "Correct: truncation always moves the value towards zero, while rounding can go either way."],
      ["Truncation gives a smaller error because no bits are changed", "Dropping bits always makes the value smaller in size, so errors are larger on average."],
      ["The two methods always give the same stored value", "They differ whenever the dropped bits are 1 in the first place."],
      ["Rounding removes the error completely", "Rounding reduces the error but cannot remove it."],
    ],
    answer: "A",
    hints: ["Which method always moves the stored value in the same direction?"],
    explanation: "Truncation always rounds towards zero in size, so its error is always in one direction and is larger on average. Rounding to nearest picks the closer of two stored values.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Overflow in floating-point arithmetic happens when the result is too close to zero to be stored.",
    answer: false,
    feedbackTrue: "That describes underflow. Overflow is when the result is too large in size.",
    feedbackFalse: "Correct: results too close to zero cause underflow; overflow is when the size of the result is too great for the exponent.",
    explanation: "Overflow: too large. Underflow: too small and close to zero.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the denary number 0.1 cannot be stored exactly in a binary floating-point number.",
    points: [
      "0.1 is a recurring fraction in binary (0.0001100110011…).",
      "The mantissa has a finite number of bits, so the recurring pattern must be cut off.",
      "The stored value is therefore only the nearest approximation to 0.1.",
    ],
    modelAnswer: "In binary 0.1 is 0.00011001100…, a recurring pattern that never ends. A mantissa has only a fixed number of bits, so the pattern is cut off and the stored value is a close approximation, not exactly 0.1.",
    hints: ["Compare with writing 1/3 in denary."],
    explanation: "Only fractions with denominators that are powers of 2 have finite binary expansions.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "A programmer wants a loop to stop when a real-number variable `Balance` becomes equal to `Target`. Explain why testing `Balance = Target` may not work, and describe a better test.",
    points: [
      "Real numbers are stored as approximations, so Balance may differ very slightly from Target.",
      "The equality test can then never become true (the loop may run for ever or end at the wrong time).",
      "Better: test whether the absolute difference between them is smaller than a small tolerance, or use <= / >= comparisons, or use integers.",
    ],
    modelAnswer: "Because of rounding errors, Balance may become 9.999999999 instead of 10, so the equality is never true. A safer test is IF ABS(Balance - Target) < 0.000001 THEN, or to use >= so the loop stops once the target is reached. Integer cents would avoid the error altogether.",
    hints: ["Think about the stored value of a number like 0.1."],
    explanation: "Comparing reals with = is unreliable; compare with a tolerance or use integers.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "A loop adds 0.01 to a total one million times. Explain why the final total may differ from 10 000.",
    points: [
      "0.01 cannot be stored exactly in binary, so each addition adds a value with a tiny error.",
      "The small error is repeated every time round the loop.",
      "The errors accumulate, so the total can drift away from the exact value.",
    ],
    modelAnswer: "0.01 is stored as an approximation. Each addition also rounds the running total. Over a million additions, the tiny errors add up so that the result differs from 10 000. Using integers (counting hundredths) would give an exact result.",
    hints: ["Think about what happens to a tiny error that is repeated many times."],
    explanation: "Accumulating rounding errors is a common source of wrong totals in loops.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between overflow and underflow in floating-point arithmetic.",
    points: ["Overflow: the result is too large (the exponent is too big) to be stored.", "Underflow: the result is too close to zero (the exponent is too small) to be stored, so it becomes zero or a less precise value."],
    modelAnswer: "Overflow is when the size of the result exceeds the largest value the exponent allows. Underflow is when a non-zero result is smaller than the smallest value that can be stored, so it is stored as zero.",
    explanation: "Both are about the exponent range of the format.",
  });
  {
    const lines = "a = 0.6\nb = 0.3\ntotal = a + b\nprint(total)\nif total == 0.9:\n    print(\"Equal\")\nelse:\n    print(\"Not equal\")\nif abs(total - 0.9) < 0.000001:\n    print(\"Close enough\")";
    const out = py(lines).split("\n");
    chk(out.length, 3);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480,
      stem: `A Python program is run on a computer that stores real numbers in binary floating point.\n\n${codeBlock(lines, "python")}`,
      parts: [
        P.short({ label: "(a)", marks: 2, stem: "State the first line of output.", accepted: [out[0]], explanation: `0.6 and 0.3 are stored as approximations; their sum prints as ${out[0]}.` }),
        P.short({ label: "(b)", marks: 1, stem: "State the second line of output.", accepted: [out[1]], explanation: "The stored sum is not equal to the stored value of 0.9." }),
        P.short({ label: "(c)", marks: 1, stem: "State the third line of output.", accepted: [out[2]], explanation: "The difference is about 1.1 × 10^-16, which is less than 0.000001." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the second line is not \"Equal\".", points: ["0.6, 0.3 and 0.9 cannot be stored exactly in binary.", "The stored sum differs very slightly from the stored 0.9, so the = test is false."], modelAnswer: "These decimal fractions recur in binary so are stored as approximations. The sum of the approximations is not exactly the approximation of 0.9." }),
      ],
      hints: ["The first output is not exactly 0.9.", "Which test uses a tolerance?"],
      explanation: `The outputs are ${out.join(", ")}: the equality test fails because of rounding errors, while the tolerance test succeeds.`,
    });
  }
  {
    const x = 5.3;
    const a = fpEncode(x, 8, 4, { approx: true });
    const sc = (x / 2 ** fromTwos(a.exp)) * 128;
    const trunc = Math.floor(sc);
    const truncVal = (trunc / 128) * 2 ** fromTwos(a.exp);
    const err = Number((x - a.value).toFixed(6));
    const terr = Number((x - truncVal).toFixed(6));
    chk(trunc, 84);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600,
      stem: `A sensor reading of **${x}** is to be stored using a floating-point format with an 8-bit two's complement mantissa and a 4-bit two's complement exponent. In this format ${x} = 101.0100110011… in binary, so it cannot be stored exactly. The exponent used is ${fromTwos(a.exp)} (${a.exp}).`,
      parts: [
        P.bits({ label: "(a)", marks: 2, stem: "The mantissa is rounded to the nearest 8-bit value. Write it.", value: fromBase(a.mant, 2), width: 8, explanation: `${x} ÷ 8 × 128 = ${sc.toFixed(1)}, which rounds to 85 = ${a.mant}.` }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the value actually stored.", value: a.value, explanation: `${a.mant} = 85/128; × 8 = ${a.value}.` }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", stem: "Calculate the absolute error.", value: Math.abs(err), tol: 0.0005, explanation: `|${x} − ${a.value}| = ${Math.abs(err)}.` }),
        P.num({ label: "(d)", marks: 2, type: "CALCULATION", stem: "If the mantissa had been truncated instead of rounded, the absolute error would be different. Calculate it.", value: Math.abs(terr), tol: 0.0005, explanation: `Truncating gives 84/128 × 8 = ${truncVal}; |${x} − ${truncVal}| = ${Math.abs(terr)}.` }),
      ],
      hints: ["Scale ×128 after dividing by 2 to the power of the exponent to find the integer mantissa.", "Compare the rounded and truncated integers."],
      explanation: `Rounded: ${a.mant}, value ${a.value}, error ${Math.abs(err)}. Truncated: error ${Math.abs(terr)} (larger).`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement describes overflow in floating-point arithmetic?",
    options: [
      ["The result is larger than the exponent can represent", "Correct: the size of the result exceeds the largest storable value."],
      ["The result is too small to store and is replaced by zero", "That describes underflow."],
      ["The mantissa has more bits than the exponent", "The sizes of the two parts do not decide overflow."],
      ["The last digit of the result is rounded up", "That is a rounding error."],
    ],
    answer: "A",
    explanation: "Overflow occurs when a result is too large in size for the exponent to cover.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A program must test whether two real numbers, X and Y, are equal. Which approach is most reliable?",
    options: [
      ["Check whether the absolute difference is smaller than a small tolerance", "Correct: this allows for the tiny rounding errors in stored real numbers."],
      ["Test whether X = Y directly", "Rounding errors can make equal values differ in the last digit."],
      ["Round X and Y to one decimal place and never compare them again", "Rounding too far changes the values being compared."],
      ["Convert both numbers to binary text and compare the text", "The binary patterns are subject to the same rounding errors."],
    ],
    answer: "A",
    hints: ["Remember that 0.1 + 0.2 is not stored exactly as 0.3."],
    explanation: "Stored reals are approximations, so compare with a tolerance rather than with =.",
  });

  b.card("DEFINITION", "Rounding error", "The difference between a real number and the nearest value that can be stored, caused by the limited number of mantissa bits.");
  b.card("FORMULA", "Absolute error and relative error", "Absolute error = |true value − stored value|. Relative error = absolute error ÷ true value (× 100 for a percentage).");
  b.card("DEFINITION", "Overflow (floating point)", "The result is larger in size than the exponent allows, so it cannot be stored.");
  b.card("DEFINITION", "Underflow", "The result is smaller in size than the smallest non-zero stored value, so it is stored as zero.");
  b.card("FACT", "Which fractions are stored exactly in binary?", "Those that are sums of powers of 2, such as 0.5, 0.25 and 0.375. Fractions like 0.1 and 0.6 recur and are approximated.");
  b.card("CONCEPT", "How should two real numbers be compared in a program?", "Test whether the absolute difference is smaller than a small tolerance, rather than using =.");
  b.card("CONCEPT", "How should money be stored?", "As a whole number of the smallest unit (for example cents), so calculations are exact; convert for display only.");
  b.card("CONCEPT", "Truncation versus rounding", "Truncation drops extra bits (always towards zero); rounding chooses the nearest stored value and has a smaller average error.");
  b.card("FACT", "What happens to an 8-bit unsigned register that overflows?", "The carry out is lost and the register keeps the low eight bits (the sum modulo 256).");
});
