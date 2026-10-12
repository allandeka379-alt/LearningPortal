import { fpDecode, fpEncode, fpNormalise, fpRange, fpMantissaValue, fromTwos, twos, toBase, negateTwos, mdTable, chk, same, group, bin } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const mn = (v) => String(v).replace("-", "−");
const sci = (x) => (x < 1 ? (1 / x <= 1e6 ? `1/${1 / x}` : `2^−${Math.round(Math.log2(1 / x))}`) : x >= 1e9 ? `${x} (about ${x.toPrecision(3).replace("e+", " × 10^")})` : String(x));

// 1: decode a positive number
const m1 = "01101000", e1 = "0011";
const v1 = fpDecode(m1, e1);
chk(v1, 6.5);
chk(fpMantissaValue(m1), 0.8125);
// 2: decode a negative number with a negative exponent
const m2 = "10100000", e2 = "1110";
const v2 = fpDecode(m2, e2);
chk(v2, -0.1875);
chk(fpMantissaValue(m2), -0.75);
chk(fromTwos(e2), -2);
// 3: encode 13.25
const enc = fpEncode(13.25, 8, 4);
same([enc.mant, enc.exp], ["01101010", "0100"], "enc");
// 4: encode -3.25
const encPos = fpEncode(3.25, 8, 4);
const encNeg = fpEncode(-3.25, 8, 4);
same(negateTwos(encPos.mant), encNeg.mant, "neg mantissa");
same(encPos.exp, encNeg.exp, "same exponent");
// 5: normalise
const un = { m: "00011010", e: "0100" };
const nm = fpNormalise(un.m, un.e);
chk(fpDecode(un.m, un.e), fpDecode(nm.mant, nm.exp));
// 6: formats
const formats = [[10, 2], [8, 4], [6, 6]].map(([m, e]) => ({ m, e, r: fpRange(m, e) }));
const fmtTable = mdTable(
  ["Mantissa bits", "Exponent bits", "Largest positive", "Smallest positive normalised", "Smallest step in the mantissa"],
  formats.map(({ m, e, r }) => [m, e, sci(r.maxPositive), sci(r.minPositive), sci(2 ** -(m - 1))]),
);

const body = `
## Introduction

Whole numbers are not enough. A weather station near Kariba records 27.35 degrees, an engineer at Hwange works with 0.0004 volts, and a scientist uses 6.02 × 10^23. A computer stores such **real numbers** using a form of standard form called **floating point**: one pattern of bits for the significant digits (the mantissa) and another for the power of two by which they are scaled (the exponent). The "point" is said to float because the exponent moves it.

You should be able to convert fractions to binary and understand two's complement from the previous lessons. This lesson covers the format, converting in both directions, normalisation, and the trade-off between range and precision. Errors and overflow are in the next lesson.

## Key definitions

:::definition{term="Floating-point number"}
A real number stored as a mantissa and an exponent, with value = mantissa × 2^exponent.
:::

:::definition{term="Mantissa"}
The part of a floating-point number that holds its significant digits. Here it is a two's complement fraction with the binary point immediately after the sign bit.
:::

:::definition{term="Exponent"}
The part of a floating-point number, a two's complement integer, that gives the power of 2 by which the mantissa is multiplied.
:::

:::definition{term="Normalised floating-point number"}
A number whose mantissa has been shifted so that its first two bits are different: it starts 01 for a positive number or 10 for a negative number.
:::

:::keyfact{title="The format used in this course"}
The mantissa is a two's complement number with the binary point after the first (sign) bit, so a positive mantissa starts 0.… and a negative one starts 1.…. The exponent is a two's complement integer. Questions state how many bits each part has, for example "8 bits for the mantissa and 4 bits for the exponent".
:::

## Converting from binary to denary

1. Read the exponent as a two's complement integer.
2. Read the mantissa as a two's complement fraction: the first bit has place value −1, then ½, ¼, ⅛ …
3. Multiply the mantissa by 2 raised to the exponent (move the binary point right if the exponent is positive, left if it is negative).

:::worked-solution{title="Convert mantissa ${m1} with exponent ${e1} to denary"}
1. Exponent ${e1} is +${fromTwos(e1)}.
2. Mantissa ${m1} is 0.${m1.slice(1)} with the point after the sign bit: ½ + ¼ + 1/16, which equals ${fpMantissaValue(m1)}.
3. Value = ${fpMantissaValue(m1)} × 2^${fromTwos(e1)} = ${fpMantissaValue(m1)} × ${2 ** fromTwos(e1)} = **${v1}**.
4. Check by moving the point: 0.1101 × 2^3 = 110.1 in binary = 4 + 2 + 0.5 = ${v1}.
:::

:::worked-solution{title="Convert mantissa ${m2} with exponent ${e2} to denary"}
1. Exponent ${e2} is ${mn(fromTwos(e2))} (the leftmost bit is worth −8: −8 + 4 + 2 = −2).
2. The mantissa starts with 1, so it is negative. The leftmost bit is worth −1, the second bit (0) would be worth ½ and the third bit (1) is worth ¼: −1 + 0 + 0.25 = **${mn(fpMantissaValue(m2))}**.
3. Value = ${mn(fpMantissaValue(m2))} × 2^${mn(fromTwos(e2))} = ${mn(fpMantissaValue(m2))} × ${2 ** fromTwos(e2)} = **${mn(v2)}**.
:::

## Converting from denary to binary

1. Convert the number to binary, with a fractional part.
2. Write it as 0.… × 2^n so that the mantissa fits the form 0.1… (positive) by moving the point.
3. Write the mantissa in the stated number of bits, padding with zeros on the right.
4. Write the exponent n in two's complement.
5. For a negative number, find the positive pattern and take the two's complement of the mantissa only.

:::worked-solution{title="Store 13.25 using 8 bits for the mantissa and 4 bits for the exponent"}
1. 13.25 = 8 + 4 + 1 + 0.25 = 1101.01 in binary.
2. Move the point left four places to put it after the sign bit: 0.110101 × 2^4.
3. Mantissa (8 bits, padded with zeros): **${enc.mant}**.
4. Exponent 4 in 4 bits: **${enc.exp}**.
5. Check: ${enc.mant} × 2^4 = 0.828125 × 16 = ${enc.value}.
:::

:::worked-solution{title="Store −3.25 using 8 bits for the mantissa and 4 bits for the exponent"}
1. +3.25 = 11.01 in binary = 0.1101 × 2^2. Mantissa ${encPos.mant}, exponent ${encPos.exp}.
2. To make the number negative, change the mantissa to its two's complement: invert ${encPos.mant} to ${encPos.mant.split("").map((c) => (c === "0" ? "1" : "0")).join("")} and add 1 to get **${encNeg.mant}**.
3. The exponent stays **${encNeg.exp}**.
4. Check: ${encNeg.mant} is ${mn(fpMantissaValue(encNeg.mant))}; × 4 = ${mn(encNeg.value)}.
:::

## Normalisation

A number can be written in several ways, such as 0.0011010 × 2^4 and 0.1101 × 2^2, which have the same value. **Normalising** removes the duplicates: shift the mantissa left until the first two bits differ, and reduce the exponent by 1 for every place moved. A normalised number uses all the bits of the mantissa for significant digits, giving **maximum precision**, and each value has only **one representation**, which makes comparing numbers easier.

:::worked-solution{title="Normalise mantissa ${un.m} with exponent ${un.e}"}
1. The mantissa starts 00, so it is not normalised.
2. Shift left one place: ${un.m.slice(1)}0. Exponent ${un.e} (+4) becomes +3.
3. Still starts 00. Shift left again: ${nm.mant}. Exponent becomes +2: ${nm.exp}.
4. The mantissa now starts 01, so it is normalised: **${nm.mant}, ${nm.exp}**.
5. The value is unchanged: ${fpDecode(un.m, un.e)} = ${fpDecode(nm.mant, nm.exp)}.
:::

For a negative number the mantissa must start 10. A mantissa starting 11 is shifted left until the first two bits differ. Zero cannot be normalised in this way.

## Range against precision

A fixed number of bits has to be split between the mantissa and the exponent. More bits for the mantissa give more significant digits (**precision**); more bits for the exponent give a bigger **range** of values. For 12 bits in total:

${fmtTable}

Allocating more bits to the mantissa gives smaller gaps between neighbouring numbers; allocating more bits to the exponent lets the number be far larger or far smaller. You cannot improve both without using more bits.

:::keyfact{title="ZIMSEC and Cambridge"}
This is A Level for Cambridge (Paper 3) and Form 5 for ZIMSEC. Both boards use the idea of mantissa and exponent, normalisation and the range–precision trade-off. Use the layout stated in the question; this course uses the Cambridge layout with a two's complement mantissa and exponent. Do not mix it with the IEEE 754 layout unless the question names it.
:::

## Common mistakes

:::mistake{title="Treating the mantissa as a whole number"}
The binary point is after the sign bit. 01101000 is 0.8125, not 104.
:::

:::mistake{title="Forgetting that the exponent is two's complement"}
An exponent such as 1110 is −2, not 14. Check the leftmost bit of the exponent.
:::

:::mistake{title="Shifting the mantissa without changing the exponent"}
Each shift left of the mantissa must be matched by subtracting 1 from the exponent, otherwise the value changes.
:::

:::mistake{title="Changing the sign of the exponent for negative numbers"}
A negative number has a negative mantissa. The exponent only depends on the size of the number.
:::

## Exam tips

:::exam-tip{title="Which papers test this"}
Cambridge Paper 3 asks for conversions both ways, normalisation, and explanations of range and precision. ZIMSEC Paper 1 asks for floating-point conversions and normalisation. For **convert**, show the exponent value, the mantissa value and the multiplication. For **explain why numbers are normalised** give "maximum precision" and "one representation of each value".
:::

:::exam-tip{title="Check by moving the point"}
After converting, move the binary point by the exponent and add the place values to see that you get the same number.
:::

:::exam-tip{title="Say what a change does"}
If a question asks what happens when a bit moves from the exponent to the mantissa, say: precision increases and the range decreases.
:::

## Summary

:::summary
- A floating-point number is mantissa × 2^exponent; the mantissa has its binary point after the sign bit.
- Mantissa and exponent are both two's complement.
- To store a number, write it as 0.… × 2^n, fit the mantissa to the bits, and write n in two's complement.
- Normalised numbers start 01 (positive) or 10 (negative): maximum precision and one representation.
- More mantissa bits give more precision; more exponent bits give more range.
:::
`;
writeLesson({ key: "data.floating-point-representation", title: "Floating-point real numbers: mantissa and exponent", summary: "Store and read real numbers as a two's complement mantissa and exponent, convert both ways, normalise, and explain the trade-off between range and precision.", concept: "acs.data.floating-point-representation", minutes: 55 }, body);
