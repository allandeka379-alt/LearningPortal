import { D, fig, gate, wire, dotAt, lab, F, table, bin2 } from "./lib.mjs";
const { C, text, line, rect, node, arrow } = D;

// ---- 1. gate symbols with truth tables
{
  const types = ["NOT", "AND", "OR", "NAND", "NOR", "XOR", "XNOR"];
  const cw = 280, ch = 120;
  let b = "";
  const cell = (t, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x0 = col * cw + 10, y0 = row * ch + 6, cy = y0 + 64;
    const g = gate(t, x0 + 40, cy);
    let s = text(x0 + 4, y0 + 18, t, { size: 15, weight: 700, fill: C.blue }) + g.svg;
    if (t === "NOT") {
      s += wire([[x0 + 16, cy], [x0 + 40, cy]]) + text(x0 + 4, cy + 5, "A", { size: 14, anchor: "start" });
    } else {
      s += wire([[x0 + 20, cy - 11], [x0 + 40, cy - 11]]) + wire([[x0 + 20, cy + 11], [x0 + 40, cy + 11]]) +
        text(x0 + 4, cy - 6, "A", { size: 14 }) + text(x0 + 4, cy + 16, "B", { size: 14 });
    }
    s += wire([g.out, [g.out[0] + 16, cy]]) + text(g.out[0] + 20, cy + 5, "X", { size: 14 });
    if (t === "NOT") s += table(x0 + 172, cy - 33, ["A", "X"], [[0, 1], [1, 0]], { cw: 34, rh: 22, hi: 1 });
    else s += table(x0 + 160, cy - 56, ["A", "B", "X"], bin2.map(([a, c]) => [a, c, F[t](a, c)]), { cw: 34, rh: 22, hi: 2 });
    return s;
  };
  types.forEach((t, i) => (b += cell(t, i)));
  await fig("logic-gate-symbols", D.svg(570, 4 * ch + 6, b),
    "The seven logic gate symbols with their truth tables: NOT inverts; AND is 1 only for 11; OR is 0 only for 00; NAND is 0 only for 11; NOR is 1 only for 00; XOR is 1 when A and B differ; XNOR is 1 when they are the same",
    "Figure: the NOT, AND, OR, NAND, NOR, XOR and XNOR symbols, each with its truth table", "logic/gates-truth-tables", "| 1 | 1 | 1 | 1 | 0 | 0 | 0 | 1 |");
}

// ---- 2. NAND universal
{
  let b = "";
  const nand = (x, y) => gate("NAND", x, y);
  // NOT
  let y = 50;
  let g = nand(120, y);
  b += g.svg + text(20, y + 5, "A") + wire([[40, y], [90, y]]) + dotAt(90, y) + wire([[90, y - 11], [90, y + 11]]) + wire([[90, y - 11], [120, y - 11]]) + wire([[90, y + 11], [120, y + 11]]) +
    wire([g.out, [g.out[0] + 40, y]]) + text(g.out[0] + 46, y + 5, "X = NOT A", { weight: 700 }) + text(20, y - 28, "NOT: one NAND with its inputs joined", { size: 14, fill: C.blue, weight: 700 });
  // AND
  y = 150;
  g = nand(110, y);
  const g2 = nand(240, y);
  b += text(20, y - 40, "AND: a NAND followed by a NAND used as NOT", { size: 14, fill: C.blue, weight: 700 }) + g.svg + g2.svg +
    text(20, y - 6, "A") + text(20, y + 16, "B") + wire([[40, y - 11], [110, y - 11]]) + wire([[40, y + 11], [110, y + 11]]) +
    wire([g.out, [200, y]]) + dotAt(200, y) + wire([[200, y - 11], [200, y + 11]]) + wire([[200, y - 11], [240, y - 11]]) + wire([[200, y + 11], [240, y + 11]]) +
    wire([g2.out, [g2.out[0] + 40, y]]) + text(g2.out[0] + 46, y + 5, "X = A AND B", { weight: 700 });
  // OR
  y = 275;
  const ya = y - 34, yb = y + 34;
  const na = nand(90, ya), nb = nand(90, yb), nc = nand(250, y);
  const joined = (yy) => wire([[40, yy], [60, yy]]) + dotAt(60, yy) + wire([[60, yy - 11], [60, yy + 11]]) + wire([[60, yy - 11], [90, yy - 11]]) + wire([[60, yy + 11], [90, yy + 11]]);
  b += text(20, y - 64, "OR: invert each input with a NAND, then NAND the results", { size: 14, fill: C.blue, weight: 700 }) +
    na.svg + nb.svg + nc.svg + text(20, ya + 5, "A") + text(20, yb + 5, "B") + joined(ya) + joined(yb) +
    wire([na.out, [215, ya], [215, y - 11], [250, y - 11]]) + wire([nb.out, [215, yb], [215, y + 11], [250, y + 11]]) +
    wire([nc.out, [nc.out[0] + 40, y]]) + text(nc.out[0] + 46, y + 5, "X = A OR B", { weight: 700 });
  await fig("logic-nand-universal", D.svg(560, 345, b),
    "NAND gates can build every other gate: NOT is a NAND with joined inputs, AND is a NAND followed by a NAND used as NOT, and OR is two NAND-as-NOT gates feeding a third NAND",
    "Figure: NOT, AND and OR built from NAND gates only", "logic/gates-truth-tables", "## NAND and NOR as universal gates");
}

// ---- 3. circuit (A AND B) OR (NOT C)
{
  let b = "";
  const and = gate("AND", 150, 70), not = gate("NOT", 150, 155), or = gate("OR", 310, 112);
  b += and.svg + not.svg + or.svg +
    text(24, 64, "A") + text(24, 86, "B") + text(24, 160, "C") +
    wire([[44, 59], [150, 59]]) + wire([[44, 81], [150, 81]]) + wire([[44, 155], [150, 155]]) +
    wire([and.out, [265, 70], [265, 101], [310, 101]]) + wire([not.out, [265, 155], [265, 123], [310, 123]]) +
    wire([or.out, [440, 112]]) + text(448, 117, "X", { weight: 700 }) +
    text(214, 62, "P", { fill: C.blue, weight: 700 }) + text(214, 147, "Q", { fill: C.blue, weight: 700 }) +
    text(150, 28, "P = A AND B", { fill: C.blue }) + text(150, 205, "Q = NOT C", { fill: C.blue }) + text(310, 160, "X = P OR Q", { fill: C.blue });
  await fig("logic-circuit-and-or-not", D.svg(520, 225, b),
    "Logic circuit for X = (A AND B) OR (NOT C): A and B feed an AND gate giving P, C feeds a NOT gate giving Q, and P and Q feed an OR gate giving X",
    "Figure: the circuit for X = (A AND B) OR (NOT C), with the gate outputs P and Q labelled", "logic/circuits-expressions", "## From a circuit to an expression and a truth table");
}
// ---- 4. motor M = G AND (S OR R)
{
  let b = "";
  const or = gate("OR", 130, 62), and = gate("AND", 280, 115);
  b += or.svg + and.svg + text(24, 56, "S") + text(24, 78, "R") + text(24, 126, "G") +
    wire([[44, 51], [130, 51]]) + wire([[44, 73], [130, 73]]) + wire([[44, 126], [280, 126]]) +
    wire([or.out, [235, 62], [235, 104], [280, 104]]) + wire([and.out, [410, 115]]) + text(418, 120, "M", { weight: 700 }) +
    text(205, 54, "P", { fill: C.blue, weight: 700 }) + text(100, 28, "P = S OR R", { fill: C.blue }) + text(280, 165, "M = G AND P", { fill: C.blue });
  await fig("logic-circuit-motor-guard", D.svg(500, 185, b),
    "Logic circuit for M = G AND (S OR R): the start button S and the remote R feed an OR gate, and its output P goes to an AND gate with the guard signal G, so the motor M runs only when G is 1 and S or R is 1",
    "Figure: the conveyor circuit M = G AND (S OR R)", "logic/circuits-expressions", "## From a statement to an expression, a circuit and a truth table");
}
// ---- 5. half adder
{
  let b = "";
  const x = gate("XOR", 200, 60), a = gate("AND", 200, 150);
  b += x.svg + a.svg + text(24, 54, "A") + text(24, 166, "B") +
    wire([[44, 49], [200, 49]]) + dotAt(90, 49) + wire([[90, 49], [90, 139], [200, 139]]) +
    wire([[44, 161], [200, 161]]) + dotAt(120, 161) + wire([[120, 161], [120, 71], [200, 71]]) +
    wire([x.out, [320, 60]]) + text(328, 65, "S = A XOR B", { weight: 700 }) +
    wire([a.out, [320, 150]]) + text(328, 155, "C = A AND B", { weight: 700 });
  b += table(40, 205, ["A", "B", "S", "C"], bin2.map(([p, q]) => [p, q, p ^ q, p & q]), { cw: 40, rh: 22 });
  await fig("logic-half-adder", D.svg(520, 340, b),
    "Half adder: an XOR gate gives the sum S and an AND gate gives the carry C from the same inputs A and B; 1 + 1 gives sum 0 and carry 1",
    "Figure: a half adder is one XOR gate (sum) and one AND gate (carry), with its truth table", "logic/adders-flip-flops", "The half adder is therefore");
}
// ---- 6. full adder
{
  let b = "";
  const x1 = gate("XOR", 120, 60), a1 = gate("AND", 120, 140), x2 = gate("XOR", 330, 60), a2 = gate("AND", 330, 200), or = gate("OR", 470, 170);
  b += x1.svg + a1.svg + x2.svg + a2.svg + or.svg;
  b += rect(70, 26, 175, 150, { stroke: C.muted, dash: true, r: 6 }) + text(75, 20, "half adder 1", { size: 13, fill: C.muted });
  b += rect(305, 26, 110, 215, { stroke: C.muted, dash: true, r: 6 }) + text(310, 20, "half adder 2", { size: 13, fill: C.muted });
  b += text(10, 54, "A") + text(10, 156, "B") +
    wire([[30, 49], [120, 49]]) + dotAt(80, 49) + wire([[80, 49], [80, 129], [120, 129]]) +
    wire([[30, 151], [120, 151]]) + dotAt(100, 151) + wire([[100, 151], [100, 71], [120, 71]]);
  b += wire([x1.out, [215, 60]]) + dotAt(215, 60) + wire([[215, 60], [215, 49], [330, 49]]) + wire([[215, 60], [215, 189], [330, 189]]) + text(188, 54, "P", { fill: C.blue, weight: 700 });
  b += wire([a1.out, [440, 140], [440, 159], [470, 159]]) + text(190, 133, "Q", { fill: C.blue, weight: 700 });
  b += text(10, 266, "Cin") + wire([[40, 261], [285, 261]]) + wire([[285, 261], [285, 71], [330, 71]]) + dotAt(285, 211) + wire([[285, 211], [330, 211]]);
  b += wire([a2.out, [440, 200], [440, 181], [470, 181]]) + text(392, 194, "R", { fill: C.blue, weight: 700 });
  b += wire([x2.out, [480, 60]]) + text(488, 65, "S", { weight: 700 }) + wire([or.out, [550, 170]]) + text(558, 175, "Cout", { weight: 700 });
  b += text(10, 292, "P = A XOR B, S = P XOR Cin, Q = A AND B, R = P AND Cin, Cout = Q OR R", { size: 13, fill: C.blue });
  await fig("logic-full-adder", D.svg(620, 305, b),
    "Full adder: two half adders and an OR gate; the first half adder adds A and B to give P and Q, the second adds P and the carry in Cin to give the sum S and R, and Cout = Q OR R",
    "Figure: a full adder built from two half adders and an OR gate", "logic/adders-flip-flops", "Check any row: A = 1");
}
// ---- 7. ripple-carry 0110 + 0111
{
  const A = "0110", B = "0111";
  const stages = [];
  let carry = 0;
  for (let i = 0; i < 4; i += 1) {
    const a = Number(A[3 - i]), bb = Number(B[3 - i]);
    const s = a ^ bb ^ carry, co = (a & bb) | (carry & (a ^ bb));
    stages.push({ a, b: bb, cin: carry, s, co });
    carry = co;
  }
  let b = "";
  const bw = 90, by = 105, bh = 70;
  const xs = [430, 300, 170, 40]; // stage 0..3 left x
  stages.forEach((st, i) => {
    const x = xs[i];
    b += node(x, by, bw, bh, `Full adder\nstage ${i}`, { size: 14 });
    b += arrow(x + 25, by - 40, x + 25, by, { stroke: C.ink }) + arrow(x + 65, by - 40, x + 65, by) +
      text(x + 25, by - 48, `A=${st.a}`, { anchor: "middle", size: 14 }) + text(x + 65, by - 48, `B=${st.b}`, { anchor: "middle", size: 14 });
    b += arrow(x + 45, by + bh, x + 45, by + bh + 38) + text(x + 45, by + bh + 56, `S=${st.s}`, { anchor: "middle", size: 14, weight: 700 });
    const rx = i === 0 ? x + bw + 50 : xs[i - 1];
    b += arrow(rx, by + bh / 2, x + bw, by + bh / 2, { stroke: C.amber });
    b += text(i === 0 ? rx - 22 : x + bw + 20, by + bh / 2 - 8, `${st.cin}`, { anchor: "middle", size: 14, fill: C.amber, weight: 700 });
  });
  b += arrow(40, by + bh / 2, 8, by + bh / 2, { stroke: C.amber }) + text(8, by + bh / 2 - 8, `${stages[3].co}`, { size: 14, fill: C.amber, weight: 700 });
  b += text(560, by + bh / 2 + 22, "carry in", { anchor: "end", size: 13, fill: C.amber });
  b += text(290, 250, "Sum read left to right: 1101 (6 + 7 = 13), carry out 0. Orange numbers are the carries.", { anchor: "middle", size: 13 });
  await fig("logic-ripple-carry-adder", D.svg(580, 270, b),
    "Four-stage ripple-carry adder adding 0110 and 0111: the carry out of each full adder is the carry in of the next stage to the left, giving the sum bits 1101 and a final carry out of 0",
    "Figure: a 4-stage ripple-carry adder working out 0110 + 0111 = 1101", "logic/adders-flip-flops", "## The ripple-carry adder");
}
// ---- 8. SR flip-flop
{
  let b = "";
  const n1 = gate("NOR", 200, 60), n2 = gate("NOR", 200, 180);
  b += n1.svg + n2.svg + text(24, 54, "R", { weight: 700 }) + text(24, 196, "S", { weight: 700 }) +
    wire([[44, 49], [200, 49]]) + wire([[44, 191], [200, 191]]) +
    wire([n1.out, [420, 60]]) + dotAt(300, 60) + wire([[300, 60], [300, 115], [165, 115], [165, 169], [200, 169]]) + text(428, 65, "Q", { weight: 700 }) +
    wire([n2.out, [420, 180]]) + dotAt(320, 180) + wire([[320, 180], [320, 125], [175, 125], [175, 71], [200, 71]]) + text(428, 185, "NOT Q", { weight: 700 });
  b += text(10, 240, "S=1, R=0: set (Q=1)", { size: 14 }) + text(270, 240, "S=0, R=1: reset (Q=0)", { size: 14 }) + text(10, 262, "S=0, R=0: hold the old Q", { size: 14 }) + text(270, 262, "S=1, R=1: not allowed", { size: 14 });
  await fig("logic-sr-flip-flop", D.svg(520, 280, b),
    "SR flip-flop built from two NOR gates whose outputs feed back to each other: S=1 sets Q to 1, R=1 resets Q to 0, S=R=0 holds the stored bit, and S=R=1 is not allowed",
    "Figure: an SR flip-flop from two cross-coupled NOR gates", "logic/adders-flip-flops", "## The SR flip-flop");
}
