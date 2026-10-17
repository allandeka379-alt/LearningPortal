import { D, fig, place, C, T, ln, dt, poly } from "./lib2.mjs";

// ---- Joint and partial variation: C = 90 + 5n
{
  const a = 90, bb = 5;
  const f = (n) => a + bb * n;
  const ax = D.axes({ x: [0, 120], y: [0, 700], xTicks: 20, yTicks: 100, xLabel: "guests n", yLabel: "cost C (US$)", w: 540, h: 400, pad: { l: 66, r: 28, t: 40, b: 56 } });
  let b = ax.frame + ax.line([[0, f(0)], [120, f(120)]], { stroke: C.blue });
  for (const n of [40, 70, 100]) b += ax.point(n, f(n), { stroke: C.amber, r: 5 });
  b += ax.point(0, a, { stroke: C.red, r: 5 });
  b += ax.tag(41, 250, "(40, 290)", { size: 13, anchor: "end", dx: -6 }).replace("", "") + ax.tag(71, 400, "(70, 440)", { size: 13, anchor: "end", dx: -6 }) + ax.tag(101, 550, "(100, 590)", { size: 13, anchor: "end", dx: -6 });
  b += ax.tag(3, 160, "fixed fee a = 90", { size: 13, fill: C.red, dx: 10 }) + ax.tag(62, 150, "C = 90 + 5n, gradient 5", { fill: C.blue, size: 13 });
  const alt = "Graph of the hall cost C = 90 + 5n for partial variation: a straight line with gradient 5 (US$5 per guest) that cuts the vertical axis at US$90, the fixed fee, so it does not pass through the origin; it passes through (40, 290), (70, 440) and (100, 590).";
  const cap = "Figure: partial variation is a straight line that does not start at the origin";
  await fig("partial-variation-hall-cost-graph", b, 540, 400, alt, cap);
  place("algebra/joint-and-partial-variation", "- The partial variation $y = c + kx$ has a **straight-line** graph", "partial-variation-hall-cost-graph", alt, cap);
}

// ---- Ratio and proportion: bar model for US$360 shared 2 : 3 : 4
{
  const parts = [2, 3, 4], total = 360, one = total / 9, names = ["Tendai", "Rudo", "Farai"];
  const fills = [C.fillBlue, C.fillAmber, C.fillGreen], strokes = [C.blue, C.amber, C.green];
  const w = 560, x0 = 20, unit = 40;
  let b = D.text(x0, 24, `US$${total} in 9 equal parts, one part = US$${one}`, { size: 15, weight: 700 });
  // top: total bar
  b += D.rect(x0, 40, 9 * unit, 34, { fill: C.fillGrey, stroke: C.axis, width: 2 }) + D.text(x0 + 4.5 * unit, 63, `US$${total}`, { anchor: "middle", size: 16, weight: 700 });
  let px = x0;
  const rows = [];
  parts.forEach((p, i) => {
    const y = 100 + i * 52;
    for (let k = 0; k < p; k += 1) b += D.rect(x0 + (px - x0) + k * unit, y, unit, 34, { fill: fills[i], stroke: strokes[i], width: 2 }) + D.text(x0 + (px - x0) + k * unit + unit / 2, y + 22, `${one}`, { anchor: "middle", size: 14, fill: strokes[i], weight: 600 });
    b += D.text(x0 + (px - x0) + p * unit + 10, y + 22, `${names[i]}: ${p} × ${one} = US$${p * one}`, { size: 14, weight: 600 });
    px += p * unit;
  });
  // fix the offsets: each person's bar starts where the previous ends
  const h = 100 + 3 * 52 + 6;
  const alt = `Bar model for sharing US$${total} in the ratio 2 : 3 : 4: the total is 9 equal parts of US$${one}, so Tendai gets 2 parts = US$${2 * one}, Rudo 3 parts = US$${3 * one} and Farai 4 parts = US$${4 * one}, which add to US$${total}.`;
  const cap = "Figure: a bar model shows the 9 equal parts behind the ratio 2 : 3 : 4";
  await fig("ratio-bar-model-share-360", b, w, h, alt, cap);
  place("number/ratio-and-proportion", ":::worked-solution[Example 3", "ratio-bar-model-share-360", alt, cap, { before: true });
}

// ---- Laws of indices: y = 2^x shows x^0 = 1 and negative indices as reciprocals
{
  const ax = D.axes({ x: [-3, 4], y: [0, 16], xTicks: 1, yTicks: 2, xLabel: "x", yLabel: "y", w: 540, h: 400, pad: { l: 56, r: 28, t: 40, b: 56 } });
  let b = ax.frame + ax.plot((x) => 2 ** x, { stroke: C.blue });
  const pts = [[-2, "2⁻² = ¼", -4, -12], [-1, "2⁻¹ = ½", 0, 0], [0, "2⁰ = 1", 0, 0], [1, "2¹ = 2", 0, 0], [2, "2² = 4", 0, 0], [3, "2³ = 8", 0, 0]];
  for (const [x] of pts) b += ax.point(x, 2 ** x, { stroke: C.amber, r: 4.5 });
  b += ax.point(0, 1, { stroke: C.red, r: 6 });
  const lab = [[-2, "2⁻² = 1/4", -2.7, 1.9], [-1, "2⁻¹ = 1/2", -1.7, 3.4], [1, "2¹ = 2", 0.3, 4.2], [2, "2² = 4", 1.2, 6.6], [3, "2³ = 8", 2.0, 10.0]];
  for (const [x, t, tx, ty] of lab) b += ax.line([[x, 2 ** x], [tx + 0.5, ty - 0.2]], { stroke: C.muted, width: 1, dash: "3 3" }) + ax.tag(tx, ty, t, { size: 13 });
  b += ax.line([[0, 1], [0.8, 0.8]], { stroke: C.red, width: 1, dash: "3 3" }) + ax.tag(0.8, 0.3, "2⁰ = 1", { size: 13, fill: C.red }) + ax.tag(-2.9, 13.0, "y = 2ˣ: always positive", { size: 13, fill: C.blue });
  const alt = "Graph of y = 2ˣ: it passes through (0, 1), showing that any base to the power 0 is 1, and through (−1, 1/2) and (−2, 1/4), showing that a negative index gives a reciprocal; the curve is always above the x-axis and never negative.";
  const cap = "Figure: y = 2ˣ shows that x⁰ = 1 and that a negative index gives a small positive reciprocal";
  await fig("indices-exponential-graph-2-to-x", b, 540, 400, alt, cap);
  place("algebra/laws-of-indices", "A negative index means a **reciprocal**", "indices-exponential-graph-2-to-x", alt, cap);
}

// ---- Factorising: difference of two squares as an area, 32.5^2 - 7.5^2 = 25 x 40
{
  const A = 32.5, B = 7.5, s = 4.2;
  let b = "";
  // left: square of side A with a B x B corner removed (top right)
  const x0 = 24, y0 = 50;
  b += D.rect(x0, y0 + B * s, A * s, (A - B) * s, { fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + D.rect(x0, y0, (A - B) * s, B * s, { fill: C.fillAmber, stroke: C.amber, width: 2.4 });
  b += D.rect(x0 + (A - B) * s, y0, B * s, B * s, { fill: "none", stroke: C.muted, dash: true, width: 1.8 });
  b += D.text(x0 + (A * s) / 2, y0 - 12, `${A} m`, { anchor: "middle", size: 14, weight: 600 }) + D.text(x0 + (A - B) * s + (B * s) / 2, y0 + (B * s) / 2 + 5, `${B}`, { anchor: "middle", size: 14, fill: C.muted });
  b += D.text(x0 + (A * s) / 2, y0 + B * s + ((A - B) * s) / 2 + 5, `${A} × ${A - B}`, { anchor: "middle", size: 14, fill: C.blue, weight: 700 }) + D.text(x0 + ((A - B) * s) / 2, y0 + (B * s) / 2 + 5, `${A - B} × ${B}`, { anchor: "middle", size: 13, fill: C.amber, weight: 700 });
  b += D.text(x0 + (A * s) / 2, y0 + A * s + 24, `${A}² − ${B}²`, { anchor: "middle", size: 16, weight: 700 });
  // right: rectangle (A+B) wide, (A-B) tall
  const x1 = 220, y1 = y0 + B * s;
  b += D.rect(x1, y1, A * s, (A - B) * s, { fill: C.fillBlue, stroke: C.blue, width: 2.4 }) + D.rect(x1 + A * s, y1, B * s, (A - B) * s, { fill: C.fillAmber, stroke: C.amber, width: 2.4 });
  b += D.text(x1 + ((A + B) * s) / 2, y1 - 12, `${A + B} m`, { anchor: "middle", size: 14, weight: 600 }) + D.text(x1 + (A + B) * s + 8, y1 + ((A - B) * s) / 2 + 5, `${A - B} m`, { size: 14, weight: 600 });
  b += D.text(x1 + ((A + B) * s) / 2, y1 + (A - B) * s + 34 - 10, `(${A} − ${B})(${A} + ${B}) = ${A - B} × ${A + B} = ${(A - B) * (A + B)} m²`, { anchor: "middle", size: 15, weight: 700 }).replace("", "");
  const w = 560, h = y0 + A * s + 40;
  const alt = `Difference of two squares as area: a square of side ${A} m with a ${B} m square removed has area ${A}² − ${B}²; cutting off the top piece and moving it to the side makes a rectangle ${A + B} m by ${A - B} m, so ${A}² − ${B}² = (${A} − ${B})(${A} + ${B}) = ${A - B} × ${A + B} = ${(A - B) * (A + B)} m².`;
  const cap = "Figure: a² − b² cut and rearranged into the rectangle (a − b)(a + b)";
  await fig("factorising-difference-of-squares-area", b, w, h, alt, cap);
  place("algebra/factorising", "Two square terms with a minus sign between them factorise", "factorising-difference-of-squares-area", alt, cap);
}

// ---- Matrix operations: row times column
{
  const A = [[2, -1], [1, 3]], B = [[3, 1], [4, -2]];
  const Cm = [[0, 0], [0, 0]];
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) Cm[i][j] = A[i][0] * B[0][j] + A[i][1] * B[1][j];
  const cell = 52, rowH = 44, w = 560, h = 230, y0 = 70;
  const drawM = (M, x, hiRow, hiCol, hiCell) => {
    let s = "";
    if (hiRow !== undefined) s += D.rect(x - 4, y0 + hiRow * rowH - 2, cell * 2 + 8, rowH - 4, { fill: C.fillAmber, stroke: "none" });
    if (hiCol !== undefined) s += D.rect(x + hiCol * cell - 2, y0 - 6, cell - 4, rowH * 2 + 4, { fill: C.fillBlue, stroke: "none" });
    if (hiCell) s += D.rect(x + hiCell[1] * cell - 2, y0 + hiCell[0] * rowH - 2, cell - 4, rowH - 4, { fill: C.fillGreen, stroke: C.green, width: 2 });
    s += D.path_(`M${x - 10},${y0 - 8} L${x - 16},${y0 - 8} L${x - 16},${y0 + 2 * rowH} L${x - 10},${y0 + 2 * rowH}`, { stroke: C.ink, width: 2 }) + D.path_(`M${x + 2 * cell + 4},${y0 - 8} L${x + 2 * cell + 10},${y0 - 8} L${x + 2 * cell + 10},${y0 + 2 * rowH} L${x + 2 * cell + 4},${y0 + 2 * rowH}`, { stroke: C.ink, width: 2 });
    M.forEach((r, i) => r.forEach((v, j) => (s += D.text(x + j * cell + cell / 2 - 2, y0 + i * rowH + 28, String(v).replace("-", "−"), { anchor: "middle", size: 20 }))));
    return s;
  };
  let b = drawM(A, 40, 0, undefined) + D.text(150, y0 + 28 + 0, "×", { anchor: "middle", size: 22, weight: 700 }).replace("", "") ;
  b = drawM(A, 40, 0, undefined);
  b += D.text(178, y0 + 50, "×", { anchor: "middle", size: 24, weight: 700 });
  b += drawM(B, 225, undefined, 1);
  b += D.text(352, y0 + 50, "=", { anchor: "middle", size: 24, weight: 700 });
  b += drawM(Cm, 395, undefined, undefined, [0, 1]);
  b += D.text(40, 36, "A", { size: 17, weight: 700 }) + D.text(225, 36, "B", { size: 17, weight: 700 }) + D.text(395, 36, "AB", { size: 17, weight: 700 });
  b += D.text(w / 2, 190, `row 1 of A × column 2 of B:  2 × 1 + (−1) × (−2) = ${Cm[0][1]}`, { anchor: "middle", size: 15, weight: 700, fill: C.green }) + D.text(w / 2, 214, `AB = (${Cm[0].join(", ").replace("-", "−")} ; ${Cm[1].join(", ").replace("-", "−")}) read row by row`, { anchor: "middle", size: 13, fill: C.muted });
  const alt = `Matrix multiplication: in the product of A = (2, −1; 1, 3) and B = (3, 1; 4, −2), row 1 of A (shaded amber) times column 2 of B (shaded blue) gives the top-right element of AB, 2 × 1 + (−1) × (−2) = 4; the whole product is (2, 4; 15, −5).`;
  const cap = "Figure: each element of a product is a row of the first matrix times a column of the second";
  await fig("matrix-row-times-column", b, w, h, alt, cap);
  place("matrices/matrix-operations", ":::worked-solution[Example 4", "matrix-row-times-column", alt, cap, { before: true });
}
