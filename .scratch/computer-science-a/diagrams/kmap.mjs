import { D, figBefore } from "./lib.mjs";
const { C, text, line, rect } = D;

/** Draws a K-map. grid[r][c]; rows/cols are Gray-code labels. groups: {cells:[[r,c],...] rect pieces as [r0,c0,r1,c1], color, dash}. */
function kmap(x, y, grid, rowLab, colLab, corner, groups, cell = 64) {
  const ch = 46;
  let s = text(x + cell * 0.5, y + 18, corner, { anchor: "middle", size: 13, fill: C.muted });
  colLab.forEach((c, i) => (s += text(x + cell + cell * i + cell / 2, y + 18, c, { anchor: "middle", size: 14, weight: 700 })));
  rowLab.forEach((r, j) => (s += text(x + cell / 2, y + 28 + ch * (j + 0.5) + 5, r, { anchor: "middle", size: 14, weight: 700 })));
  const gx = x + cell, gy = y + 28;
  grid.forEach((row, j) => row.forEach((v, i) => {
    s += rect(gx + cell * i, gy + ch * j, cell, ch, { stroke: C.axis, width: 1.2 });
    s += text(gx + cell * i + cell / 2, gy + ch * j + ch / 2 + 6, String(v), { anchor: "middle", size: 18, weight: v === 1 ? 700 : 400, fill: v === 1 ? C.ink : C.muted });
  }));
  for (const g of groups) for (const [r0, c0, r1, c1] of g.rects) {
    s += rect(gx + cell * c0 + g.in, gy + ch * r0 + g.in, cell * (c1 - c0 + 1) - 2 * g.in, ch * (r1 - r0 + 1) - 2 * g.in, { stroke: g.color, width: 3, r: 14, dash: g.dash });
  }
  return s;
}

// ---- 3-variable map of the lesson (X = (A AND B) OR (NOT C))
{
  const grid = [[1, 0, 0, 1], [1, 0, 1, 1]];
  let b = kmap(20, 10, grid, ["0", "1"], ["00", "01", "11", "10"], "A \\ BC", [
    { rects: [[0, 0, 1, 0], [0, 3, 1, 3]], color: C.amber, in: 4 },
    { rects: [[1, 2, 1, 3]], color: C.blue, in: 9, dash: true },
  ]);
  b += text(20, 160, "Amber: first and last columns joined by wrap-around,\nC = 0 in all four cells, term NOT C", { size: 13, fill: C.amber });
  b += text(20, 200, "Blue dashed: cells 111 and 110, A = 1 and B = 1: A AND B", { size: 13, fill: C.blue });
  b += text(20, 232, "X = (A AND B) OR (NOT C)", { size: 15, weight: 700 });
  await figBefore("kmap-three-variable", D.svg(420, 244, b),
    "Three-variable Karnaugh map with rows A and columns BC in Gray order: the four 1s in the first and last columns wrap around to give NOT C, the pair at A=1, B=1 gives A AND B, so X = (A AND B) OR (NOT C)",
    "Figure: grouping the 1s on a 3-variable K-map, including a wrap-around group", "logic/karnaugh-maps", ":::worked-solution{title=\"Simplify the 3-variable");
}
// ---- fix anchor: place after the table of the worked solution (done below by a second anchor if first fails)

// ---- 4-variable map: corners and middle
{
  const grid = [[1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1]];
  let b = kmap(20, 10, grid, ["00", "01", "11", "10"], ["00", "01", "11", "10"], "AB \\ CD", [
    { rects: [[0, 0, 0, 0], [0, 3, 0, 3], [3, 0, 3, 0], [3, 3, 3, 3]], color: C.amber, in: 4 },
    { rects: [[1, 1, 2, 2]], color: C.blue, in: 9, dash: true },
  ], 62);
  b += text(20, 245, "Amber: four corners join by wrap-around,\nB = 0 and D = 0: NOT B AND NOT D", { size: 13, fill: C.amber });
  b += text(20, 285, "Blue dashed: the centre block, B = 1 and D = 1: B AND D", { size: 13, fill: C.blue });
  b += text(20, 312, "X = (B AND D) OR (NOT B AND NOT D)", { size: 15, weight: 700 });
  await figBefore("kmap-four-variable", D.svg(420, 328, b),
    "Four-variable Karnaugh map: the four corner cells form one wrap-around group giving NOT B AND NOT D, and the centre four cells give B AND D, so X is 1 when B and D are equal",
    "Figure: a 4-variable K-map with a corner group and a centre group", "logic/karnaugh-maps", ":::worked-solution{title=\"A four-variable map");
}
