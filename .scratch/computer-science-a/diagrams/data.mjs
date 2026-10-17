import { D, fig } from "./lib.mjs";
const { C, text, line, rect, node, arrow } = D;

/** A row of bit boxes with a weight under each; returns svg. */
function bitsRow(x, y, bits, weights, o = {}) {
  const w = o.w ?? 50;
  let s = "";
  [...bits].forEach((bit, i) => {
    const on = bit === "1";
    s += rect(x + i * w, y, w, 40, { fill: on ? C.fillBlue : "#fff", stroke: C.axis, width: 1.5 });
    s += text(x + i * w + w / 2, y + 27, bit, { anchor: "middle", size: 20, weight: on ? 700 : 400, fill: on ? C.blue : C.muted });
    s += text(x + i * w + w / 2, y - 8, weights[i], { anchor: "middle", size: 13, fill: i === 0 && o.signNeg ? C.red : C.muted, weight: i === 0 && o.signNeg ? 700 : 400 });
  });
  return s;
}

// ---- two's complement place values
{
  const W = [-128, 64, 32, 16, 8, 4, 2, 1];
  const val = (bits) => [...bits].reduce((t, bit, i) => t + (bit === "1" ? W[i] : 0), 0);
  const rows = [["11010011", -45], ["10110100", -76]];
  for (const [bits, want] of rows) if (val(bits) !== want) throw new Error(`${bits} ${val(bits)}`);
  let b = text(20, 22, "Two's complement place values (left bit = −128)", { size: 14, weight: 700 });
  const wl = W.map((v) => String(v).replace("-", "−"));
  rows.forEach(([bits, v], k) => {
    const y = 70 + k * 120;
    b += bitsRow(20, y, bits, wl, { signNeg: true });
    const terms = [...bits].map((bit, i) => (bit === "1" ? W[i] : null)).filter((t) => t !== null);
    b += text(20, y + 70, `${terms.map((t) => String(t).replace("-", "−")).join(" + ").replace(/\+ −/g, "+ (−").replace(/\(−(\d+)/g, "(−$1)")} = ${String(v).replace("-", "−")}`, { size: 15, weight: 700 });
  });
  await fig("data-twos-complement-places", D.svg(440, 280, b),
    "Two's complement place values for 8 bits: 11010011 is -128 + 64 + 16 + 2 + 1 = -45 and 10110100 is -128 + 32 + 16 + 4 = -76, because the leftmost bit is worth -128",
    "Figure: reading 11010011 (−45) and 10110100 (−76) with a left-most place value of −128", "data/binary-arithmetic", "**Two's complement** removes both problems");
}
// ---- floating point layout: 13.25 = 01101010 | 0100
{
  const man = "01101010", exp = "0100";
  const mw = [-1, 0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625, 0.0078125];
  const mv = [...man].reduce((t, bit, i) => t + (bit === "1" ? mw[i] : 0), 0);
  const ev = parseInt(exp, 2);
  if (mv * 2 ** ev !== 13.25) throw new Error("fp " + mv);
  const wl = ["−1", "1/2", "1/4", "1/8", "1/16", "1/32", "1/64", "1/128"];
  let b = text(20, 24, "13.25 stored with an 8-bit mantissa and a 4-bit exponent", { size: 14, weight: 700 });
  b += bitsRow(20, 80, man, wl, { w: 36, signNeg: true });
  const ex = ["−8", "4", "2", "1"];
  b += bitsRow(350, 80, exp, ex, { w: 36, signNeg: true });
  b += text(38, 136, "sign bit", { anchor: "middle", size: 13, fill: C.muted }) + D.circle(56, 100, 5, { fill: C.red, stroke: C.red, width: 1 });
  b += line(20, 150, 20 + 8 * 36, 150, { stroke: C.blue, width: 2 }) + text(20 + 144, 170, "mantissa 01101010", { anchor: "middle", size: 14, fill: C.blue, weight: 700 });
  b += line(350, 150, 350 + 4 * 36, 150, { stroke: C.amber, width: 2 }) + text(350 + 72, 170, "exponent 0100 = 4", { anchor: "middle", size: 14, fill: C.amber, weight: 700 });
  b += text(20, 205, "Mantissa = 0.1101010 in binary = 1/2 + 1/4 + 1/16 + 1/64 = 0.828125", { size: 14 });
  b += text(20, 228, "Value = 0.828125 × 2^4 = 0.828125 × 16 = 13.25", { size: 14, weight: 700 });
  b += text(20, 250, "The binary point (red) sits just after the sign bit.", { size: 13, fill: C.muted });
  await fig("data-floating-point-layout", D.svg(520, 266, b),
    "Floating-point layout for 13.25: the 8-bit mantissa 01101010 has the binary point after the sign bit and equals 0.828125, the 4-bit exponent 0100 is 4, so the value is 0.828125 times 16 = 13.25",
    "Figure: 13.25 as mantissa 01101010 and exponent 0100", "data/floating-point-representation", "## Converting from denary to binary");
}
