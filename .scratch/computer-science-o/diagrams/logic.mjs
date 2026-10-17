import { D, gate, wire, dotAt, fig, inLabel, outLabel } from "./lib.mjs";

// 1. six gates
{
  const pats = { NOT: "10", AND: "0001", OR: "0111", NAND: "1110", NOR: "1000", XOR: "0110" };
  const order = ["NOT", "AND", "OR", "NAND", "NOR", "XOR"];
  let b = "";
  order.forEach((t, i) => {
    const ox = 20 + (i % 2) * 280, oy = 14 + Math.floor(i / 2) * 118;
    b += D.rect(ox - 8, oy - 6, 264, 108, { fill: D.C.fillGrey, stroke: D.C.grid, width: 1, r: 8 });
    b += D.text(ox + 4, oy + 18, t, { weight: 700, size: 16 });
    const g = gate(t, ox + 56, oy + 32);
    b += g.svg;
    g.in.forEach((p, k) => { b += wire([[ox + 26, p[1]], p]) + D.text(ox + 16, p[1] + 5, t === "NOT" ? "A" : "AB"[k], { size: 13, anchor: "end" }); });
    b += wire([g.out, [g.out[0] + 20, g.out[1]]]) + D.text(g.out[0] + 26, g.out[1] + 5, "X", { size: 14, weight: 700 });
    b += D.text(ox + 4, oy + 92, `${t === "NOT" ? "A = 0, 1" : "AB = 00, 01, 10, 11"}  gives  ${pats[t]}`, { size: 13, fill: D.C.muted });
  });
  await fig("logic-gate-symbols", D.svg(580, 366, b),
    "The six logic gate symbols with the output pattern each gives for inputs 00, 01, 10, 11: NOT 10, AND 0001, OR 0111, NAND 1110, NOR 1000, XOR 0110; a bubble at the output means invert",
    "Figure: the six gate symbols and the output pattern each gives (a bubble means invert)", "logic/gates", "## The six gates");
}

// 2. truth tables: X = (A OR B) AND NOT C
{
  let b = "";
  const or = gate("OR", 150, 24), nt = gate("NOT", 150, 108), an = gate("AND", 340, 64);
  b += inLabel("A", 78, or.in[0][1]) + inLabel("B", 78, or.in[1][1]) + inLabel("C", 78, nt.in[0][1]);
  [or.in[0], or.in[1], nt.in[0]].forEach((p) => (b += wire([[86, p[1]], p])));
  b += wire([or.out, [300, or.out[1]], [300, an.in[0][1]], an.in[0]]);
  b += wire([nt.out, [300, nt.out[1]], [300, an.in[1][1]], an.in[1]]);
  b += wire([an.out, [an.out[0] + 34, an.out[1]]]) + outLabel(an.out[0] + 40, an.out[1]);
  b += D.text(236, or.out[1] - 10, "P = A OR B", { size: 13, anchor: "middle", fill: D.C.blue, weight: 700 });
  b += D.text(236, nt.out[1] + 22, "Q = NOT C", { size: 13, anchor: "middle", fill: D.C.blue, weight: 700 });
  b += or.svg + nt.svg + an.svg;
  await fig("truth-table-circuit-or-not-and", D.svg(500, 180, b),
    "Logic circuit for X = (A OR B) AND NOT C: A and B enter an OR gate giving P, C enters a NOT gate giving Q, and P and Q enter an AND gate whose output is X",
    "Figure: the circuit for X = (A OR B) AND NOT C, with working signals P and Q", "logic/truth-tables", "Brackets show the order: in");
}

// 3. truth tables: X = (A NAND B) AND (B XOR C)
{
  let b = "";
  const nd = gate("NAND", 150, 20), xr = gate("XOR", 150, 112), an = gate("AND", 350, 66);
  b += inLabel("A", 70, nd.in[0][1]) + inLabel("B", 70, nd.in[1][1]) + inLabel("C", 70, xr.in[1][1]);
  b += wire([[78, nd.in[0][1]], nd.in[0]]);
  // B feeds NAND input 2 and XOR input 1 via a junction
  b += wire([[78, nd.in[1][1]], nd.in[1]]);
  b += dotAt(100, nd.in[1][1]) + wire([[100, nd.in[1][1]], [100, xr.in[0][1]], xr.in[0]]);
  b += wire([[78, xr.in[1][1]], xr.in[1]]);
  b += wire([nd.out, [310, nd.out[1]], [310, an.in[0][1]], an.in[0]]);
  b += wire([xr.out, [310, xr.out[1]], [310, an.in[1][1]], an.in[1]]);
  b += wire([an.out, [an.out[0] + 34, an.out[1]]]) + outLabel(an.out[0] + 40, an.out[1]);
  b += D.text(268, nd.out[1] - 14, "P = A NAND B", { size: 13, anchor: "middle", fill: D.C.blue, weight: 700 });
  b += D.text(248, xr.out[1] + 22, "Q = B XOR C", { size: 13, anchor: "middle", fill: D.C.blue, weight: 700 });
  b += nd.svg + xr.svg + an.svg;
  await fig("truth-table-circuit-nand-xor-and", D.svg(520, 190, b),
    "Logic circuit for X = (A NAND B) AND (B XOR C): input B feeds both the NAND gate and the XOR gate, and their outputs P and Q enter an AND gate that gives X",
    "Figure: the circuit for X = (A NAND B) AND (B XOR C); input B is shared by two gates", "logic/truth-tables", "## Reading a circuit description");
}

// 4. circuits-expressions: silo alarm (A AND B) OR C
{
  let b = "";
  const an = gate("AND", 150, 24), or = gate("OR", 340, 70);
  b += inLabel("A", 78, an.in[0][1]) + inLabel("B", 78, an.in[1][1]) + inLabel("C", 78, or.in[1][1]);
  b += wire([[86, an.in[0][1]], an.in[0]]) + wire([[86, an.in[1][1]], an.in[1]]) + wire([[86, or.in[1][1]], or.in[1]]);
  b += wire([an.out, [300, an.out[1]], [300, or.in[0][1]], or.in[0]]);
  b += wire([or.out, [or.out[0] + 34, or.out[1]]]) + outLabel(or.out[0] + 40, or.out[1], "X (alarm)");
  b += D.text(236, an.out[1] - 10, "A AND B", { size: 13, anchor: "middle", fill: D.C.blue, weight: 700 });
  b += D.text(40, 150, "A = temperature too high;  B = fan failed;  C = button pressed", { size: 13, fill: D.C.muted });
  b += an.svg + or.svg;
  await fig("silo-alarm-circuit", D.svg(520, 166, b),
    "Grain silo alarm circuit X = (A AND B) OR C: A and B enter an AND gate, its output and C enter an OR gate, so the alarm sounds if temperature is high and the fan has failed, or the button is pressed",
    "Figure: the grain silo alarm circuit, X = (A AND B) OR C", "logic/circuits-expressions", "The circuit is then built gate by gate");
}

// 5. circuits-expressions: X = ((NOT A) AND B) OR (B NOR C)
{
  let b = "";
  const nt = gate("NOT", 120, 10), an = gate("AND", 230, 26), nr = gate("NOR", 230, 112), or = gate("OR", 390, 70);
  b += inLabel("A", 56, nt.in[0][1]) + inLabel("B", 56, an.in[1][1] + 30) + inLabel("C", 56, nr.in[1][1]);
  b += wire([[64, nt.in[0][1]], nt.in[0]]);
  b += wire([nt.out, [200, nt.out[1]], [200, an.in[0][1]], an.in[0]]);
  // B line down: feeds AND in1 and NOR in0
  const by = an.in[1][1] + 30; // y of B
  b += wire([[64, by], [190, by], [190, an.in[1][1]], an.in[1]]);
  b += dotAt(100, by) + wire([[100, by], [100, nr.in[0][1]], nr.in[0]]);
  b += wire([[64, nr.in[1][1]], nr.in[1]]);
  b += wire([an.out, [360, an.out[1]], [360, or.in[0][1]], or.in[0]]);
  b += wire([nr.out, [360, nr.out[1] ], [360, or.in[1][1]], or.in[1]]);
  b += wire([or.out, [or.out[0] + 34, or.out[1]]]) + outLabel(or.out[0] + 40, or.out[1]);
  b += D.text(332, an.out[1] - 8, "P", { size: 13, weight: 700, fill: D.C.blue }) + D.text(332, nr.out[1] + 22, "Q", { size: 13, weight: 700, fill: D.C.blue });
  b += D.text(20, 176, "P = (NOT A) AND B", { size: 13, fill: D.C.muted }) + D.text(200, 176, "Q = B NOR C", { size: 13, fill: D.C.muted });
  b += nt.svg + an.svg + nr.svg + or.svg;
  await fig("circuit-not-and-nor-or", D.svg(540, 190, b),
    "Circuit for X = ((NOT A) AND B) OR (B NOR C): A goes through NOT then AND with B to give P, B and C enter a NOR gate to give Q, and P and Q enter an OR gate that gives X",
    "Figure: the circuit for X = ((NOT A) AND B) OR (B NOR C)", "logic/circuits-expressions", "## From a circuit to an expression");
}
