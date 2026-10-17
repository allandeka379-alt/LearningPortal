import { D, fig } from "./lib.mjs";
const { C, text, line, rect, node, arrow } = D;
const dbl = (x1, y1, x2, y2, o = {}) => line(x1, y1, x2, y2, { arrow: true, arrowStart: true, ...o });
const circ = (x, y, n) => D.circle(x, y, 11, { fill: C.fillAmber, stroke: C.amber, width: 1.5 }) + text(x, y + 5, String(n), { anchor: "middle", size: 13, weight: 700 });

// ---- Von Neumann architecture
{
  let b = "";
  b += rect(15, 28, 405, 262, { stroke: C.blue, r: 10, width: 2.5 }) + text(25, 20, "Processor (CPU)", { size: 14, weight: 700, fill: C.blue });
  b += node(30, 45, 110, 48, "System\nclock", { fill: C.fillGrey }) + node(160, 45, 110, 48, "ALU", { fill: C.fillGreen }) + node(290, 45, 110, 48, "Control unit", { fill: C.fillAmber });
  b += node(160, 118, 110, 34, "ACC") + dbl(215, 93, 215, 118);
  b += node(30, 170, 110, 34, "PC") + node(30, 214, 110, 34, "CIR") + node(290, 170, 110, 34, "MAR") + node(290, 214, 110, 34, "MDR");
  b += arrow(140, 187, 290, 187) + text(215, 181, "PC to MAR", { anchor: "middle", size: 12, fill: C.muted });
  b += arrow(290, 231, 140, 231) + text(215, 225, "MDR to CIR", { anchor: "middle", size: 12, fill: C.muted });
  b += text(215, 275, "Registers: PC, CIR, MAR, MDR, ACC", { anchor: "middle", size: 12, fill: C.muted });
  // memory and buses
  b += rect(515, 28, 120, 262, { stroke: C.ink, r: 10, width: 2.5, fill: C.fillBlue }) + text(575, 120, "Main memory", { anchor: "middle", size: 14, weight: 700 }) + text(575, 142, "instructions", { anchor: "middle", size: 14 }) + text(575, 162, "and data", { anchor: "middle", size: 14 }) + text(575, 182, "in ONE memory", { anchor: "middle", size: 13, fill: C.muted });
  b += dbl(400, 69, 515, 69, { stroke: C.amber }) + text(458, 60, "Control bus", { anchor: "middle", size: 13 });
  b += arrow(400, 187, 515, 187) + text(458, 178, "Address bus", { anchor: "middle", size: 13 });
  b += dbl(400, 231, 515, 231) + text(458, 222, "Data bus", { anchor: "middle", size: 13 });
  b += text(458, 250, "one set of buses", { anchor: "middle", size: 12, fill: C.muted });
  await fig("cpu-von-neumann", D.svg(650, 300, b),
    "Von Neumann architecture: the processor (clock, ALU, control unit, registers PC, CIR, MAR, MDR and ACC) is joined to a single main memory holding both instructions and data by one address bus (one-way), one data bus and one control bus (two-way)",
    "Figure: the Von Neumann model with one memory and one set of buses", "cpu/architecture-registers", "## The Von Neumann model");
}
// ---- Harvard
{
  let b = "";
  b += rect(15, 20, 230, 235, { stroke: C.blue, r: 10, width: 2.5 }) + text(25, 14, "Processor", { size: 14, weight: 700, fill: C.blue });
  b += node(35, 40, 90, 44, "Control\nunit", { fill: C.fillAmber }) + node(135, 40, 90, 44, "ALU", { fill: C.fillGreen });
  b += node(35, 110, 190, 34, "Registers (PC, CIR, ACC ...)") + text(130, 175, "can fetch an instruction", { anchor: "middle", size: 13 }) + text(130, 193, "and read or write data", { anchor: "middle", size: 13 }) + text(130, 211, "at the same time", { anchor: "middle", size: 13 });
  b += rect(390, 25, 200, 80, { stroke: C.ink, r: 10, width: 2.5, fill: C.fillBlue }) + text(490, 62, "Instruction memory", { anchor: "middle", size: 14, weight: 700 }) + text(490, 82, "(program only)", { anchor: "middle", size: 13 });
  b += rect(390, 145, 200, 80, { stroke: C.ink, r: 10, width: 2.5, fill: C.fillGreen }) + text(490, 182, "Data memory", { anchor: "middle", size: 14, weight: 700 }) + text(490, 202, "(data only)", { anchor: "middle", size: 13 });
  b += dbl(245, 55, 390, 55) + text(318, 46, "buses 1", { anchor: "middle", size: 13 }) + dbl(245, 185, 390, 185) + text(318, 176, "buses 2", { anchor: "middle", size: 13 });
  b += text(318, 275, "Separate address and data buses for each memory", { anchor: "middle", size: 13, fill: C.muted });
  await fig("cpu-harvard", D.svg(610, 290, b),
    "Harvard architecture: separate instruction memory and data memory each have their own buses to the processor, so an instruction can be fetched while data is read or written",
    "Figure: the Harvard architecture, with separate memories and buses for instructions and data", "cpu/architecture-registers", "## The Harvard architecture");
}
// ---- Fetch stage with registers (LDM #20 at address 100)
{
  const pc = 100, instr = "LDM #20";
  let b = "";
  b += node(30, 30, 130, 50, `PC\n${pc + 1}`, { fill: C.fillAmber });
  b += node(30, 130, 130, 50, `MAR\n${pc}`);
  b += node(30, 235, 130, 50, `CIR\n${instr}`, { fill: C.fillGreen });
  b += node(250, 235, 140, 50, `MDR\n${instr}`);
  b += rect(450, 100, 180, 120, { stroke: C.ink, r: 8, fill: C.fillBlue, width: 2.5 }) + text(540, 124, "Main memory", { anchor: "middle", size: 14, weight: 700 }) +
    rect(460, 136, 160, 26, { fill: "#fff", stroke: C.amber, width: 2 }) + text(470, 154, `${pc}`, { size: 14, weight: 700 }) + text(515, 154, instr, { size: 14 }) +
    text(470, 186, `${pc + 1}`, { size: 14 }) + text(515, 186, "ADD Fee", { size: 14 }) + text(470, 208, "...", { size: 14 });
  b += arrow(95, 80, 95, 130) + circ(75, 105, 1) + text(115, 100, "MAR gets", { size: 12, fill: C.muted }) + text(115, 114, `[PC] = ${pc}`, { size: 12, fill: C.muted });
  b += D.path_("M160,45 H230 V62 H163", { stroke: C.ink, arrow: true });
  b += text(235, 56, `PC increases by 1`, { size: 12, fill: C.muted }) + circ(245, 80, 2);
  b += arrow(160, 155, 450, 155) + circ(300, 155, 3) + text(172, 145, `address ${pc} on address bus`, { size: 12, fill: C.muted });
  b += D.path_("M540,220 V260 H390", { stroke: C.ink, arrow: true }) + text(470, 252, `data bus: ${instr}`, { anchor: "middle", size: 12, fill: C.muted }) + circ(540, 240, 3);
  b += arrow(250, 260, 160, 260) + circ(205, 245, 4) + text(205, 296, "", { size: 1 });
  b += text(330, 308, "Numbers show the order of the fetch steps; PC is shown after the fetch.", { anchor: "middle", size: 12, fill: C.muted });
  await fig("cpu-fetch-stage", D.svg(650, 322, b),
    "Fetch stage for the instruction LDM #20 stored at address 100: 1 the address in the PC (100) is copied to the MAR, 2 the PC increases to 101, 3 the instruction at that address travels on the data bus into the MDR, 4 it is copied to the CIR",
    "Figure: the four fetch steps, with the register contents for the program stored from address 100", "cpu/fetch-execute-interrupts", "## The fetch-decode-execute cycle");
}
