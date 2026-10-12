import { fpEncode, fpDecode, fpRange, fracToBinary, fromBase, toBase, twos, addBinary, pyBlock, mdTable, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const mn = (v) => String(v).replace("-", "−");
const pct = (x) => `${Number((Math.abs(x) * 100).toPrecision(3))}%`;

// 0.1 recurring
const f01 = fracToBinary(0.1, 16);
same(f01.bits, "0001100110011001", "0.1 bits");
const e01 = fpEncode(0.1, 8, 4, { approx: true });
const abs01 = 0.1 - e01.value;
const rel01 = abs01 / 0.1;
// 0.3 truncation vs rounding
const sc = (0.3 / 2 ** -1) * 128;
const tr = Math.floor(sc);
const ro = Math.round(sc);
const trMant = twos(tr, 8);
const roMant = twos(ro, 8);
const trVal = fpDecode(trMant, twos(-1, 4));
const roVal = fpDecode(roMant, twos(-1, 4));
chk(roVal, fpEncode(0.3, 8, 4, { approx: true }).value);
const range = fpRange(8, 4);
// integer overflow
const ib = addBinary("11001000", "01100100", 8);
chk(ib.value, 300);
const p1 = pyBlock("total = 0.1 + 0.2\nprint(total)\nprint(total == 0.3)\nprint(abs(total - 0.3) < 1e-9)");
const p2 = pyBlock("total = 0.0\nfor i in range(10):\n    total = total + 0.1\nprint(total)\nprint(total == 1.0)");
const p3 = pyBlock('price_cents = 1999\nquantity = 3\ntotal_cents = price_cents * quantity\nprint(f"Total: {total_cents // 100}.{total_cents % 100:02d}")');
same(p1.text.split("\n"), ["0.30000000000000004", "False", "True"], "p1");
same(p3.text, "Total: 59.97", "p3");

const body = `
## Introduction

A shop in Masvingo adds up a till roll of prices with cents. A school clerk in Gweru adds one thousand fees of US dollars and cents, and the total is a cent out. Neither is a programming mistake: the computer is working with **approximations**. A finite number of bits cannot store every real number exactly, and a result can be too big, or too small, for the format. This lesson explains rounding errors, overflow and underflow in floating-point arithmetic, why they matter in programs, and what to do about them.

You should already understand the mantissa and exponent format from the previous lesson, and two's complement overflow of integers.

## Key definitions

:::definition{term="Rounding error"}
The difference between the true value of a number and the nearest value that can be stored, caused by the limited number of mantissa bits.
:::

:::definition{term="Absolute error and relative error"}
Absolute error is the size of the difference, |true value − stored value|. Relative error is the absolute error divided by the true value, often written as a percentage.
:::

:::definition{term="Overflow (floating point)"}
The result of a calculation is larger in size than the largest value the exponent allows, so it cannot be stored.
:::

:::definition{term="Underflow"}
The result of a calculation is smaller in size than the smallest non-zero value that can be stored, so it is stored as zero (or as a less precise number).
:::

## Why some numbers cannot be stored exactly

In denary, 1/3 is 0.3333… and never ends. In binary, many fractions that are short in denary also recur. The number 0.1 is 0.${f01.bits}… in binary, the group 0011 repeating for ever. A mantissa has only a few bits, so the pattern is cut off and the stored value is slightly different from the number the programmer typed.

:::worked-solution{title="Store 0.1 with an 8-bit mantissa and a 4-bit exponent"}
1. 0.1 = 0.0001100110011… in binary. Normalised, this is 0.1100110011… × 2^−3.
2. Keep 8 bits of mantissa: **${e01.mant}** with exponent ${mn(-3)} = **${e01.exp}**.
3. The stored value is ${e01.value}.
4. Absolute error = ${Number(abs01.toPrecision(3))} (the true value minus the stored value).
5. Relative error = ${Number(abs01.toPrecision(3))} ÷ 0.1 = ${pct(rel01)}.
:::

More mantissa bits give a smaller error, but the error cannot be removed for numbers whose binary expansion never ends.

## Truncation and rounding

When bits do not fit, the remainder can be **truncated** (dropped) or **rounded** (to the nearest stored value). Rounding gives a smaller error on average.

:::worked-solution{title="Store 0.3 by truncating and by rounding (8-bit mantissa, 4-bit exponent)"}
1. 0.3 = 0.0100110011… in binary = 0.100110011… × 2^−1, so the exponent is −1 (${twos(-1, 4)}).
2. The mantissa with seven places is 0.1001100|11…. Scaled by 128, the mantissa is ${sc}, which lies between ${tr} and ${ro}.
3. Truncating gives ${trMant}, a value of ${trVal} and an absolute error of ${Number((0.3 - trVal).toPrecision(3))}.
4. Rounding to the nearest gives ${roMant}, a value of ${roVal} and an absolute error of ${Number(Math.abs(0.3 - roVal).toPrecision(3))}.
5. Rounding is closer here, so its error is smaller.
:::

## Overflow and underflow

Take the format with an 8-bit mantissa and a 4-bit exponent. The largest exponent is +7 and the largest positive mantissa is just under 1, so the largest positive number is **${range.maxPositive}**. The smallest positive normalised number is **${range.minPositive}** (2^−9).

- **Overflow:** a calculation such as 100 × 3 gives 300, which is above ${range.maxPositive}. No exponent is big enough, so the program gets an error, or an infinity value, instead of a correct result.
- **Underflow:** a result such as 0.0005 is smaller than ${range.minPositive}. It is rounded to zero (or to a denormal, a less precise number below the normal range). If that zero is then used as a divisor or a multiplier, the final answer can be wrong.

Fixed-width **integers** also overflow, but by wrapping round. Adding the 8-bit unsigned numbers 11001000 (200) and 01100100 (100) gives 300, which needs nine bits; the register keeps the low eight bits, ${ib.sum} (${fromBase(ib.sum, 2)}), and the carry is lost.

:::example{title="A counter that wraps"}
A pump in Harare counts litres in an 8-bit unsigned register. After 255 litres the next litre makes the counter wrap to 0. A program that does not check for overflow reports a very small total instead of a large one. The fix is to use a larger register or to test the value before it overflows.
:::

## Practical consequences

**Equality tests on real numbers.** Because 0.1 + 0.2 is not stored exactly as 0.3, comparing two real results with = can fail. Compare the difference with a small tolerance instead.

${p1.code}

${p1.output}

**Accumulating error.** Each addition can add a tiny error, and a loop repeats it many times.

${p2.code}

${p2.output}

Ten additions of 0.1 do not give exactly 1.0. In a program that repeats millions of times the error can grow until it matters.

**Money.** Prices and balances must be exact, so programs store money as a whole number of cents (an integer) and only convert to dollars and cents for display.

${p3.code}

${p3.output}

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards cover rounding errors, overflow and underflow of floating-point numbers, and overflow of fixed-width integers. Cambridge examines this at A Level (Paper 3). ZIMSEC calls it "computer arithmetic errors". Neither expects you to compute IEEE 754 patterns; use the format given in the question.
:::

## Common mistakes

:::mistake{title="Saying the computer made a mistake"}
The result is the correct answer for the stored values. The error comes from the limited number of bits, not from a faulty calculation.
:::

:::mistake{title="Mixing up overflow and underflow"}
Overflow means too large in size; underflow means too small, close to zero. A large negative number overflows; it does not underflow.
:::

:::mistake{title="Using = to compare real numbers"}
Do not test whether two real results are equal. Test whether their difference is smaller than a chosen tolerance.
:::

:::mistake{title="Confusing absolute and relative error"}
Relative error divides by the true value. The same absolute error is much more serious for a small number than for a large one.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
Cambridge Paper 3 and ZIMSEC Paper 1 ask you to explain why a number cannot be stored exactly, to describe overflow and underflow, and to suggest solutions. For **explain**, give the cause (a limited number of mantissa bits, or a limited exponent) and the effect (a stored value near, but not equal to, the true value). For **suggest**, use more bits, use integers for money or compare with a tolerance.
:::

:::exam-tip{title="Name the exponent"}
Overflow and underflow are about the exponent, rounding is about the mantissa. Say which part of the number is the problem.
:::

:::exam-tip{title="Show the error calculation"}
Write the true value, the stored value, their difference, and (for relative error) the division by the true value.
:::

## Summary

:::summary
- Many real numbers have recurring binary expansions, so only an approximation is stored.
- Absolute error = |true − stored|; relative error = absolute error ÷ true value.
- Rounding to the nearest value usually gives a smaller error than truncating.
- Overflow: too large for the exponent. Underflow: too small, stored as zero. Integers wrap around.
- Do not compare reals with =; store money as integer cents; errors can accumulate in loops.
:::
`;
writeLesson({ key: "data.floating-point-errors", title: "Computer arithmetic errors: overflow, underflow and rounding", summary: "Explain why real numbers are stored approximately, calculate rounding errors, describe overflow and underflow, and avoid their practical consequences in programs.", concept: "acs.data.floating-point-errors", minutes: 45 }, body);
