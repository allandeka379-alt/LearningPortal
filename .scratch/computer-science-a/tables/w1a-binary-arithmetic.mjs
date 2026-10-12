import { toBase, fromBase, twos, fromTwos, onesComp, negateTwos, addTwos, subTwos, binaryMultiply, binaryDivide, group, mdTable, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// 1: -45 in 8-bit two's complement
const mn = (v) => String(v).replace("-", "−");
const pos45 = toBase(45, 2, 8);
const inv45 = onesComp(pos45);
const neg45 = twos(-45, 8);
same(negateTwos(pos45), neg45, "neg45");
same(toBase(fromBase(inv45, 2) + 1, 2, 8), neg45, "inv+1");
// 2: value of a pattern
const pat = "10110100";
const patVal = fromTwos(pat);
chk(patVal, -128 + 32 + 16 + 4);
// 3: 58 + (-23)
const a = twos(58, 8);
const bN = twos(-23, 8);
const add = addTwos(a, bN);
chk(add.value, 35);
// carry-by-column working
function columns(x, y) {
  let carry = 0;
  const rows = [];
  for (let i = 7; i >= 0; i--) {
    const s = Number(x[i]) + Number(y[i]) + carry;
    rows.push({ bit: 2 ** (7 - i), x: x[i], y: y[i], cin: carry, sum: s % 2, cout: Math.floor(s / 2) });
    carry = Math.floor(s / 2);
  }
  return rows;
}
const cols = columns(a, bN);
const colTable = mdTable(["Place", "Top", "Bottom", "Carry in", "Sum bit", "Carry out"], cols.map((c) => [c.bit, c.x, c.y, c.cin, c.sum, c.cout]));
same(cols.map((c) => c.sum).reverse().join(""), add.sum, "col sum");
// 4: 71 - 96
const sub = subTwos(twos(71, 8), twos(96, 8));
chk(sub.value, -25);
// 5: overflow 100 + 60
const ov = addTwos(twos(100, 8), twos(60, 8));
chk(ov.trueValue, 160);
// 6: multiply 13 x 6 and divide 109 / 5
const mul = binaryMultiply(13, 6);
const div = binaryDivide(109, 5);
const ranges = [4, 8, 16].map((n) => [n, -(2 ** (n - 1)), 2 ** (n - 1) - 1]);

const body = `
## Introduction

A school fees system in Harare must record both money received (positive) and refunds (negative), and the processor has to add and subtract such values using only bits. There is no minus sign in a register, so negative integers need a coding. This lesson covers the coding used by almost every modern computer, **two's complement**, and then shows how binary addition, subtraction and (for ZIMSEC) multiplication and division work, and how a result that is too big for the register is detected as **overflow**.

You should already be able to convert between binary and denary and to add two positive binary numbers column by column.

## Key definitions

:::definition{term="One's complement"}
The pattern obtained by changing every bit of a binary number: each 0 becomes 1 and each 1 becomes 0.
:::

:::definition{term="Two's complement"}
A way of storing signed integers in which the most significant bit has a negative place value. A negative number is found by inverting every bit of the positive number and adding 1.
:::

:::definition{term="Overflow"}
The condition in which the result of an arithmetic operation is too large (or too small) to be held in the number of bits available, so the stored result is wrong.
:::

:::keyfact{title="Range for n bits"}
In two's complement, n bits store the integers from −2^(n−1) to 2^(n−1) − 1. There is exactly one pattern for zero and one more negative value than positive values.
:::

${mdTable(["Bits", "Smallest", "Largest"], ranges.map(([n, lo, hi]) => [n, lo, hi]))}

## Representing negative numbers

Sign-and-magnitude uses the first bit as a sign and the rest as the size. It is mentioned only to be rejected: it gives two patterns for zero (+0 and −0) and needs different circuits for adding and subtracting.

In **one's complement** a negative number is the inverted pattern of the positive one. It still has two zeros (all 0s and all 1s) and needs an extra "end-around carry" when adding, so it is rarely used.

**Two's complement** removes both problems. The leftmost bit is worth −128 in an 8-bit number (and −2^(n−1) in general), and the other bits keep their positive place values.

:::worked-solution{title="Write −45 as an 8-bit two's complement number"}
1. Write +45 in 8 bits: ${pos45}.
2. Invert every bit (one's complement): ${inv45}.
3. Add 1: ${inv45} + 1 = **${neg45}**.
4. Check with place values: −128 + 64 + 16 + 2 + 1 = −45.
:::

:::worked-solution{title="Find the denary value of the 8-bit two's complement pattern ${pat}"}
1. The leftmost bit is 1, so the number is negative and that bit is worth −128.
2. The other 1s are worth 32, 16 and 4.
3. Add: −128 + 32 + 16 + 4 = **${mn(patVal)}**.
:::

A quick check: if the leftmost bit is 1 the number is negative; if it is 0 the number is zero or positive.

## Binary addition and carries

Add column by column from the right using 0 + 0 = 0, 0 + 1 = 1, 1 + 1 = 10 (write 0, carry 1) and 1 + 1 + 1 = 11 (write 1, carry 1). Any carry out of the leftmost column is discarded in a fixed-width register.

:::worked-solution{title="Add 58 and −23 using 8-bit two's complement"}
1. 58 = ${a} and −23 = ${bN}.
2. Add column by column from the right:

${colTable}

3. The carry out of the leftmost column is discarded. The 8-bit result is **${add.sum}**.
4. Its value is ${add.value}, which equals 58 − 23.
:::

## Subtraction as addition

The processor has no separate subtracter. To work out $A - B$, it adds the two's complement of $B$ to $A$.

:::worked-solution{title="Work out 71 − 96 in 8 bits"}
1. 71 = ${twos(71, 8)} and 96 = ${twos(96, 8)}.
2. Negate 96: invert to ${onesComp(twos(96, 8))} and add 1 to give ${sub.negated}.
3. Add ${twos(71, 8)} + ${sub.negated} = **${sub.sum}**.
4. The leftmost bit is 1 so the answer is negative: ${mn(sub.value)}. Check: 71 − 96 = −25.
:::

## Overflow

An 8-bit register holds −128 to 127. If the true answer is outside that range, the stored pattern is wrong. Overflow in two's complement addition happens when two numbers with the **same sign** produce a result with the **opposite sign**. Adding numbers of different signs can never overflow.

:::worked-solution{title="Add 100 and 60 in 8 bits"}
1. 100 = ${twos(100, 8)} and 60 = ${twos(60, 8)}.
2. The sum of the bits is **${ov.sum}**.
3. Both numbers were positive, but the result starts with 1, so it is shown as ${mn(ov.value)}. The true answer, ${ov.trueValue}, is bigger than 127, so overflow has occurred.
:::

Programs can respond to overflow by raising an error or by using more bits. Note that a carry out of the leftmost column is not the same as overflow: the carry was discarded in the 58 + (−23) example and the answer was still correct.

## Multiplication and division (ZIMSEC)

ZIMSEC asks for the binary multiplication and long division of small positive values. Multiplication is shift and add: for each 1 in the multiplier, write the multiplicand shifted left by that bit's position, then add the rows.

:::worked-solution{title="Multiply 1101 (13) by 110 (6)"}
1. Multiplier 110 has 1s in the 2s and 4s positions.
2. Partial products: ${mul.partials.map((p) => p).join(" and ")}.
3. Add them: ${mul.partials.join(" + ")} = **${mul.productBin}**.
4. Check: 13 × 6 = ${mul.product}.
:::

Division by long division works like denary long division, using subtraction of the divisor where it fits.

:::example{title="Binary long division"}
${toBase(109, 2)} (109) divided by 101 (5) gives quotient ${div.quotientBin} (${div.quotient}) and remainder ${div.remainderBin} (${div.remainder}). Check: 5 × ${div.quotient} + ${div.remainder} = 109.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards test two's complement representation, the value of a pattern, range, addition, subtraction by adding the negation, and overflow. Binary multiplication and long division are ZIMSEC detail. Cambridge also expects you to use a stated number of bits and to say why two's complement is used (one representation of zero, addition and subtraction use the same circuit).
:::

## Common mistakes

:::mistake{title="Forgetting to add 1"}
Inverting the bits gives only the one's complement. The two's complement needs the extra +1.
:::

:::mistake{title="Treating the leftmost bit as a separate sign"}
In two's complement the leftmost bit has a negative place value. 10000001 is −127, not "−1".
:::

:::mistake{title="Confusing carry with overflow"}
A carry out of the top column does not mean overflow. Check the signs: overflow occurs only when two same-sign numbers give a result of the opposite sign.
:::

:::mistake{title="Using the wrong number of bits"}
Pad to the stated width before inverting. Inverting a 4-bit pattern when the question says 8 bits gives the wrong answer.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
ZIMSEC Paper 1 and Cambridge Paper 1 give conversions to and from two's complement, binary addition and subtraction, and overflow. For **calculate** show the inversion, the +1 and the final addition. For **explain why overflow occurred** state the range of the register and the true answer.
:::

:::exam-tip{title="Check with denary"}
After any binary calculation convert the operands and the answer to denary and make sure they agree, or that the answer is clearly out of range.
:::

:::exam-tip{title="State the bits"}
Always give an answer with the number of bits the question asks for, including leading zeros.
:::

## Summary

:::summary
- Two's complement: invert the bits and add 1; the leftmost bit has a negative place value.
- n bits hold −2^(n−1) to 2^(n−1) − 1, with one pattern for zero.
- Subtraction is done by adding the two's complement of the second number.
- Overflow occurs when two numbers of the same sign give a result of the opposite sign (the true result is outside the range).
- Multiplication and division of small values by shift-and-add and long division are ZIMSEC detail.
:::
`;
writeLesson({ key: "data.binary-arithmetic", title: "Negative binary integers and binary arithmetic", summary: "Represent negative integers in one's and two's complement, add and subtract in a fixed-width register, detect overflow, and (ZIMSEC) multiply and divide small binary values.", concept: "acs.data.binary-arithmetic", minutes: 50 }, body);
