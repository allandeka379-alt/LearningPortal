// Run from repo root: node .scratch/chemistry-o/diagrams/electro.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker } from "./_h.mjs";

const ELECTRODE = "#4a4742";
const bubbles = (pts, r = 4) => pts.map(([x, y]) => D.circle(x, y, r, { fill: "#fff", stroke: C.muted, width: 1.3 })).join("");

// ---- molten lead(II) bromide cell
{
  const b = D.sym.wire([[170, 105], [170, 50], [250, 50]]) + D.sym.cell(280, 50) + D.sym.wire([[310, 50], [320, 50]]) + D.sym.lamp(350, 50) + D.sym.wire([[380, 50], [390, 50], [390, 105]]) +
    T(280, 22, "d.c. supply", { anchor: "middle", size: 13, fill: C.muted }) + T(350, 20, "bulb", { anchor: "middle", size: 13, fill: C.muted }) +
    T(246, 40, "+", { size: 16, weight: 700, anchor: "end" }) + T(316, 40, "−", { size: 16, weight: 700 }) +
    beaker(110, 200, 320, 120, 85, "#ffe3c0") +
    D.rect(160, 100, 20, 190, { fill: ELECTRODE, stroke: C.ink, width: 1.5 }) + D.rect(380, 100, 20, 190, { fill: ELECTRODE, stroke: C.ink, width: 1.5 }) +
    T(170, 88, "anode (+)", { anchor: "middle", weight: 700, size: 14 }) + T(390, 88, "cathode (−)", { anchor: "middle", weight: 700, size: 14 }) +
    // ions
    [[230, 255], [270, 275], [320, 255]].map(([x, y], i) => (i === 2 ? "" : D.circle(x, y, 14, { fill: C.fillAmber, stroke: C.amber, width: 1.8 }) + T(x, y + 4, "Br⁻", { anchor: "middle", size: 11, weight: 700 }))).join("") +
    [[300, 250], [330, 285]].map(([x, y]) => D.circle(x, y, 11, { fill: C.fillBlue, stroke: C.blue, width: 1.8 }) + T(x, y + 4, "Pb²⁺", { anchor: "middle", size: 10, weight: 700 })).join("") +
    D.arrow(215, 262, 190, 262, { stroke: C.amber, width: 1.8 }) + D.arrow(340, 262, 370, 262, { stroke: C.blue, width: 1.8 }) +
    D.dot(390, 308, { r: 8, fill: "#9aa3a8", stroke: C.ink }) + T(430, 345, "Pb: molten lead collects\nat the bottom", { size: 13, anchor: "end" }) +
    bubbles([[172, 220], [176, 240], [166, 205]], 5) + T(110, 190, "", {}) +
    T(10, 180, "Br₂: brown\nvapour", { size: 13, fill: C.amber, weight: 700 }) + D.arrow(60, 205, 150, 222, { stroke: C.amber, width: 1.3 }) +
    T(120, 350, "molten lead(II) bromide, heated strongly", { size: 13, fill: C.muted }) +
    T(445, 205, "Pb²⁺ ions move to the\ncathode and gain electrons:\nPb²⁺ + 2e⁻ → Pb", { size: 12, fill: C.blue }) +
    T(445, 255, "", {}) + T(445, 292, "Br⁻ ions move to the anode\nand lose electrons:\n2Br⁻ → Br₂ + 2e⁻", { size: 12, fill: C.amber }).replace("", "");
  await put("electrolysis-molten-lead-bromide-cell", 640, 380, b.replace(/T\(445, 292[^]*?$/, ""),
    "Electrolysis of molten lead(II) bromide: graphite electrodes dip into the melt, connected through a bulb to a d.c. supply; positive lead ions move to the negative cathode and form molten lead, negative bromide ions move to the positive anode and form brown bromine vapour.",
    "Figure: an electrolytic cell for molten lead(II) bromide", "electrochemistry/electrolysis-principles", "- the **electrolyte** in a container");
}
