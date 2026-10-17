import { D, fig } from "./lib.mjs";
const C = D.C;

// 1. binary to denary: 11010110 = 214
{
  const bits = "11010110", places = [128, 64, 32, 16, 8, 4, 2, 1];
  const terms = places.filter((p, i) => bits[i] === "1");
  const total = terms.reduce((a, b) => a + b, 0);
  if (total !== 214) throw new Error("total");
  let b = D.text(10, 22, "Binary 11010110 to denary: add the place values that have a 1", { weight: 700, size: 14 });
  const x0 = 60, cw = 56, y0 = 44;
  places.forEach((p, i) => {
    const on = bits[i] === "1";
    b += D.text(x0 + i * cw + cw / 2, y0 + 16, String(p), { anchor: "middle", size: 15, fill: C.muted, weight: 700 });
    b += D.rect(x0 + i * cw, y0 + 26, cw, 44, { fill: on ? C.fillBlue : "#fff", stroke: C.axis, width: 1.6 });
    b += D.text(x0 + i * cw + cw / 2, y0 + 56, bits[i], { anchor: "middle", size: 22, weight: 700 });
    if (on) b += D.arrow(x0 + i * cw + cw / 2, y0 + 70, x0 + i * cw + cw / 2, y0 + 100, { width: 1.8, stroke: C.blue });
    else b += D.text(x0 + i * cw + cw / 2, y0 + 92, "0", { anchor: "middle", size: 14, fill: C.muted });
  });
  b += D.text(10, y0 + 54, "bits", { size: 13, fill: C.muted });
  b += D.text(x0, y0 + 126, terms.join(" + ") + " = " + total, { size: 18, weight: 700, fill: C.blue });
  b += D.text(x0, y0 + 150, "Ends in 0, so the number is even: 214 is even.", { size: 13, fill: C.muted });
  await fig("binary-place-values-11010110", D.svg(540, y0 + 166, b),
    "Place-value grid for the binary number 11010110: the 1s are under 128, 64, 16, 4 and 2, and 128 + 64 + 16 + 4 + 2 = 214; the places holding 0 add nothing",
    "Figure: converting 11010110 to denary by adding the place values that hold a 1", "data/binary-denary", "## Binary to denary");
}

// 2. hex <-> binary (3F9C)
{
  const hex = "3F9C";
  const nib = [...hex].map((h) => parseInt(h, 16).toString(2).padStart(4, "0"));
  if (nib.join(" ") !== "0011 1111 1001 1100") throw new Error("nibbles");
  let b = D.text(10, 22, "Each hex digit is exactly one 4-bit nibble", { weight: 700, size: 14 });
  const x0 = 50, cw = 120;
  [...hex].forEach((h, i) => {
    const x = x0 + i * cw;
    b += D.node(x + 25, 40, 60, 46, h, { fill: C.fillAmber, size: 24, weight: 700 });
    b += D.text(x + 55, 106, `${parseInt(h, 16)} in denary`, { anchor: "middle", size: 13, fill: C.muted });
    b += D.arrow(x + 55, 112, x + 55, 134, { width: 2 });
    [...nib[i]].forEach((c, k) => (b += D.rect(x + k * 28 - 2 + 0, 138, 28, 36, { fill: c === "1" ? C.fillBlue : "#fff", stroke: C.axis, width: 1.4 }) + D.text(x + k * 28 + 12, 163, c, { anchor: "middle", size: 18, weight: 700 })));
  });
  b += D.text(x0, 206, "3F9C = 0011 1111 1001 1100  (16 bits)", { size: 15, weight: 700, fill: C.blue });
  b += D.text(x0, 228, "Reading the other way: split the bits into groups of four from the right.", { size: 13, fill: C.muted });
  await fig("hex-binary-nibbles-3f9c", D.svg(560, 242, b),
    "Hexadecimal 3F9C converts to binary by replacing each hex digit with its 4-bit nibble: 3 is 0011, F is 1111, 9 is 1001 and C is 1100, giving 0011111110011100",
    "Figure: 3F9C written as four nibbles of binary", "data/hexadecimal", "## Hexadecimal and binary");
}
