import { D, fig } from "./lib.mjs";
const C = D.C;
const both = (x1, y1, x2, y2, o = {}) => D.line(x1, y1, x2, y2, { arrow: true, arrowStart: true, width: 2, ...o });

// 1. Von Neumann CPU, registers and buses
{
  let b = "";
  b += D.rect(10, 36, 335, 334, { fill: "#fff", stroke: C.muted, dash: true, r: 10 }) + D.text(22, 56, "CPU", { weight: 700, size: 15, fill: C.muted });
  const regs = [["PC", "program counter"], ["MAR", "memory address"], ["MDR", "memory data"], ["CIR", "current instruction"], ["ACC", "accumulator"]];
  const ry = [70, 128, 186, 244, 302];
  regs.forEach(([a, f], i) => (b += D.node(190, ry[i], 140, 42, `${a}\n${f}`, { fill: C.fillAmber, size: 13 })));
  b += D.arrow(260, 112, 260, 128) + D.arrow(260, 228, 260, 244) ;
  b += D.node(22, 170, 130, 70, "Control unit\ndecodes and\ncontrols", { size: 13 });
  b += D.node(22, 290, 130, 54, "ALU\ncalculates", { size: 13 });
  b += D.arrow(190, 265, 170, 265, { width: 2 }).replace("", "");
  b += D.polyline([[190, 265], [170, 265], [170, 215], [152, 215]], { width: 2, arrow: true });
  b += both(152, 322, 190, 322);
  // control line from CU up and out to RAM
  b += D.polyline([[87, 170], [87, 52], [440, 52]], { width: 2, arrow: true, stroke: C.blue });
  b += D.text(100, 46, "control bus", { size: 13, fill: C.blue, weight: 700 });
  b += D.node(440, 40, 140, 330, "RAM\n\nprogram\ninstructions\nand data", { fill: C.fillGrey, size: 14 });
  b += D.arrow(330, 149, 440, 149, { width: 2.4, stroke: C.blue }) + D.text(385, 140, "address bus", { size: 13, anchor: "middle", fill: C.blue, weight: 700 }) + D.text(385, 168, "one way", { size: 13, anchor: "middle", fill: C.muted });
  b += both(330, 207, 440, 207, { stroke: C.blue, width: 2.4 }) + D.text(385, 198, "data bus", { size: 13, anchor: "middle", fill: C.blue, weight: 700 }) + D.text(385, 226, "both ways", { size: 13, anchor: "middle", fill: C.muted });
  b += D.text(10, 20, "Von Neumann: one memory holds both instructions and data", { size: 14, weight: 700 });
  await fig("von-neumann-cpu-registers-buses", D.svg(590, 384, b),
    "Von Neumann CPU: the PC holds the next address and passes it to the MAR, which sends it on the one-way address bus to RAM; the instruction returns on the two-way data bus into the MDR, then the CIR, where the control unit decodes it; the ALU puts results in the ACC",
    "Figure: the Von Neumann CPU with its registers, units and the three buses to RAM", "hardware/fetch-execute", "## The components of a Von Neumann CPU");
}

// 2. fetch-decode-execute cycle
{
  let b = "";
  const w = 184, gap = 18, y = 26, h = 190;
  const boxes = [
    ["FETCH", ["PC copied to MAR", "Address sent on the address", "bus; read signal on the", "control bus", "Instruction comes into MDR", "PC increased by 1", "MDR copied to CIR"]],
    ["DECODE", ["The control unit works out", "what the instruction in", "the CIR means, for example", "add the value at address 31", "to the accumulator"]],
    ["EXECUTE", ["If data is needed, its", "address goes to MAR and the", "data returns in the MDR", "The ALU calculates", "Result is stored in the ACC"]],
  ];
  boxes.forEach(([t, ls], i) => {
    const x = 6 + i * (w + gap);
    b += D.rect(x, y, w, h, { fill: [C.fillBlue, C.fillAmber, C.fillGreen][i], stroke: C.axis, r: 10 });
    b += D.text(x + w / 2, y + 26, `${i + 1}. ${t}`, { anchor: "middle", weight: 700, size: 15 });
    b += D.text(x + 10, y + 52, ls.join("\n"), { size: 13 });
    if (i < 2) b += D.arrow(x + w, y + h / 2, x + w + gap, y + h / 2, { width: 2.4 });
  });
  b += D.polyline([[6 + 2 * (w + gap) + w / 2, y + h], [6 + 2 * (w + gap) + w / 2, y + h + 30], [6 + w / 2, y + h + 30], [6 + w / 2, y + h + 2]], { width: 2.4, arrow: true });
  b += D.tag(300, y + h + 36, "then the cycle starts again", { anchor: "middle", size: 14 });
  await fig("fetch-decode-execute-cycle", D.svg(600, y + h + 50, b),
    "Fetch-decode-execute cycle: fetch copies the PC to the MAR, reads the instruction into the MDR, adds 1 to the PC and copies the instruction to the CIR; decode is done by the control unit; execute fetches any data and the ALU stores its result in the ACC; then the cycle repeats",
    "Figure: the fetch-decode-execute cycle as three repeating stages", "hardware/fetch-execute", "7. The instruction is carried out");
}

// 3. input - process - output - storage (CPU lesson)
{
  let b = "";
  b += D.node(10, 92, 130, 76, "INPUT\nbarcode scanner", { fill: C.fillGreen });
  b += D.rect(190, 30, 220, 120, { fill: "#fff", stroke: C.muted, dash: true, r: 10 }) + D.text(200, 50, "CPU", { weight: 700, fill: C.muted });
  b += D.node(200, 62, 94, 76, "Control\nunit\n(directs)", { size: 13 }) + D.node(306, 62, 94, 76, "ALU\n(adds,\ncompares)", { size: 13 });
  b += D.node(190, 190, 220, 54, "MAIN MEMORY (RAM)\nprogram and prices", { fill: C.fillGrey, size: 14 });
  b += D.node(190, 290, 220, 54, "STORAGE\nSSD or hard disk", { fill: C.fillAmber, size: 14 });
  b += D.node(460, 92, 130, 76, "OUTPUT\nscreen, receipt\nprinter", { fill: C.fillGreen, size: 14 });
  b += D.arrow(140, 130, 190, 130, { width: 2.4 }) + D.arrow(410, 130, 460, 130, { width: 2.4 });
  b += both(300, 150, 300, 190) + both(300, 244, 300, 290);
  b += D.text(312, 174, "instructions and data", { size: 13, fill: C.muted }) + D.text(312, 272, "load / save", { size: 13, fill: C.muted });
  await fig("input-process-output-storage", D.svg(600, 360, b),
    "Input, process, output and storage: a barcode scanner sends input to the CPU (control unit directs, ALU calculates), which exchanges instructions and data with main memory, sends results to the screen and printer, and main memory loads from and saves to the SSD or hard disk",
    "Figure: input, processing (CPU and main memory), output and storage at a supermarket till", "hardware/cpu", "The CPU does **not** store your files");
}
