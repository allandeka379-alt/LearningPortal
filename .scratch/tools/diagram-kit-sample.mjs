// Visual self-test of the diagram kit: node .scratch/tools/diagram-kit-sample.mjs <outDir>
import sharp from "sharp";
import * as D from "./diagram-kit.mjs";
const out = process.argv[2];
const ax = D.axes({ x: [0, 10], y: [0, 10], xLabel: "Quantity", yLabel: "Price (US$)", w: 560, h: 420, xTicks: 2, yTicks: 2 });
const g1 = D.svg(560, 420, ax.frame + ax.line([[1, 9], [9, 1]]) + ax.line([[1, 1], [9, 9]], { stroke: D.C.amber }) + ax.guides(5, 5) + ax.point(5, 5) + ax.label(9, 1, "D", { dx: 8, weight: 700 }) + ax.label(9, 9, "S", { dx: 8, weight: 700, fill: D.C.amber }) + ax.tag(5, 5, "E (5, 5)", { dx: 10, dy: -8 }));
const { sym } = D;
const g2 = D.svg(460, 300, sym.wire([[80, 60], [380, 60], [380, 240], [80, 240], [80, 60]]).replace(/stroke="#1f1d1a"/, 'stroke="#1f1d1a"') + sym.cell(230, 240, { label: "6 V" }) + sym.resistor(160, 60, { label: "R₁ = 4 Ω" }) + sym.lamp(300, 60, { label: "L" }) + sym.meter(380, 150, "A", { vertical: true }) + sym.switch_(80, 150, { vertical: true }));
const ax3 = D.axes({ x: [-3, 3], y: [-4, 6], xLabel: "x", yLabel: "y", w: 520, h: 420, xTicks: 1, yTicks: 2 });
const g3 = D.svg(520, 420, ax3.frame + ax3.area((x) => x * x - 1, null, [1, 2.5]) + ax3.plot((x) => x * x - 1) + ax3.label(2.2, 4.5, "y = x² − 1", { fill: D.C.blue, weight: 700 }));
for (const [name, s] of [["sd", g1], ["circuit", g2], ["parabola", g3]]) await sharp(Buffer.from(s), { density: 144 }).png().toFile(`${out}/${name}.png`);
console.log("ok");
