// chemistry-a: infrared and gas chromatography. Run: node .scratch/chemistry-a/diagrams/analysis2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, note, fig } from "./_m.mjs";

// ---- IR absorption ranges (lesson table)
{
  const rows = [
    ["O–H hydroxy (alcohol)", 3200, 3600], ["O–H carboxyl (acid)", 2500, 3000], ["N–H amine, amide", 3300, 3500], ["C–H alkane", 2850, 2950], ["C≡N nitrile", 2200, 2250],
    ["C=O ester", 1710, 1750], ["C=O carbonyl, carboxyl", 1670, 1740], ["C=O amide", 1640, 1690], ["C=C alkene, arene", 1500, 1680], ["C–O alcohol, ester", 1040, 1300],
  ];
  const w = 640, h = 440, l = 190, r = 20, t = 36, b = 50, pw = w - l - r, ph = h - t - b, rh = ph / rows.length;
  const X = (v) => l + ((4000 - v) / 3500) * pw;
  let s = "";
  for (const v of [4000, 3500, 3000, 2500, 2000, 1500, 1000, 500]) s += D.line(X(v), t, X(v), t + ph, { stroke: C.grid, width: 1 }) + D.text(X(v), t + ph + 20, String(v), { anchor: "middle", size: 13, fill: C.muted });
  s += D.text(X(4000), 22, "Wavenumber / cm⁻¹ (decreasing to the right)", { weight: 600, size: 14 });
  s += D.rect(X(1500), t, X(500) - X(1500), ph, { fill: C.fillGrey, stroke: "none" }) + D.text((X(1500) + X(500)) / 2, t + 16, "fingerprint", { anchor: "middle", size: 13, fill: C.muted });
  rows.forEach(([n, lo, hi], i) => {
    const y = t + i * rh + rh / 2, col = n.startsWith("O–H") || n.startsWith("N–H") ? C.blue : n.startsWith("C=O") ? C.amber : n.startsWith("C≡N") ? C.purple : C.teal;
    s += D.text(l - 10, y + 5, n, { anchor: "end", size: 13 }) + D.rect(X(hi), y - 9, Math.max(X(lo) - X(hi), 4), 18, { fill: col, stroke: "none", r: 3 }) + D.text(X(lo) + 6, y + 5, `${lo}–${hi}`, { size: 12, fill: C.muted });
  });
  s += D.line(X(4000), t + ph, X(500), t + ph, { stroke: C.axis, width: 1.5 });
  // labels to the right of bars would overflow for low wavenumbers: handled by placing text after the bar end (left side of the chart for small wavenumbers is the right edge)
  const alt = "Chart of characteristic infrared absorption ranges in cm-1: O-H alcohol 3200-3600, O-H acid 2500-3000, N-H 3300-3500, C-H 2850-2950, C≡N 2200-2250, C=O ester 1710-1750, carbonyl 1670-1740, amide 1640-1690, C=C 1500-1680 and C-O 1040-1300; the fingerprint region lies below 1500.";
  const cap = "Figure: characteristic IR absorption ranges from the data table; the C=O ranges overlap, so position is only a hint";
  await fig("ir-absorption-ranges", w, h, s, alt, cap, "analysis/infrared", "## Reading an IR spectrum");
}
// ---- IR spectrum of the Example 1 unknown, C4H8O2 (2950, 1740, 1240; no broad O-H)
{
  const pk = [[2950, 25, 70, "C–H 2950"], [1740, 80, 28, "C=O 1740"], [1240, 65, 45, "C–O 1240"]];
  const T = (x) => 95 - pk.reduce((a, [c, d, sd]) => a + d * Math.exp(-(((-x - c) / sd) ** 2)), 0);
  const ax = D.axes({ x: [-4000, -500], y: [0, 100], xTicks: [-4000, -3500, -3000, -2500, -2000, -1500, -1000, -500], yTicks: 20, xFormat: (v) => String(-v), xLabel: "Wavenumber / cm⁻¹", yLabel: "Transmittance / %", w: 620, h: 400, pad: { l: 66, r: 24, t: 34, b: 58 } });
  const body = D.rect(ax.X(-1500), ax.Y(100), ax.X(-500) - ax.X(-1500), ax.Y(0) - ax.Y(100), { fill: C.fillGrey, stroke: "none" }) + ax.frame +
    ax.plot(T, { domain: [-4000, -500], steps: 700, stroke: C.blue }) +
    ax.tag(-3960, 100, "no broad O–H at 2500–3600", { size: 13 }) +
    ax.label(-2950, 55, "C–H 2950", { size: 13, anchor: "middle", fill: C.blue }) + ax.label(-1790, 22, "C=O 1740", { size: 13, anchor: "end", fill: C.amber, weight: 700 }) + ax.label(-1790, 22, "ester range 1710–1750", { size: 13, anchor: "end", fill: C.amber, dy: 18 }) +
    ax.label(-1180, 28, "C–O 1240", { size: 13, anchor: "start", fill: C.blue }) + ax.label(-760, 86, "fingerprint region", { size: 13, anchor: "middle", fill: C.muted });
  const alt = "Infrared spectrum of the unknown C4H8O2 from the worked example: a medium C-H trough at 2950 cm-1, a strong sharp C=O trough at 1740 (ester range 1710-1750) and a strong C-O trough at 1240, with no broad O-H absorption between 2500 and 3600, so the compound is an ester, not an acid or alcohol.";
  const cap = "Figure: IR spectrum of the ester in Example 1 (peaks at 2950, 1740 and 1240 cm⁻¹; no O–H)";
  await fig("ir-spectrum-ester-unknown", 620, 400, body, alt, cap, "analysis/infrared", "## A method for identifying functional groups");
}

// ---- gas chromatograph layout
{
  const w = 620, h = 300;
  let s = D.node(20, 30, 150, 64, "Carrier gas\n(mobile phase)", { fill: C.fillGrey }) + D.node(240, 30, 150, 64, "Injection port\n(heated: sample\nvaporises)", { fill: C.fillAmber, size: 13 }) + D.node(450, 20, 160, 84, "Column in an oven\n(liquid stationary\nphase on a solid)", { fill: C.fillBlue, size: 13 });
  s += D.arrow(170, 62, 238, 62, { width: 2 }) + D.arrow(390, 62, 448, 62, { width: 2 });
  s += D.arrow(530, 106, 530, 168, { width: 2 }) + D.node(450, 170, 160, 64, "Detector", { fill: C.fillGreen }) + D.arrow(448, 202, 392, 202, { width: 2 }) + D.node(240, 170, 150, 64, "Recorder:\nchromatogram", { fill: C.fillGrey }) + D.text(542, 144, "components leave", { size: 13, fill: C.muted }) ;
  s += D.text(310, 270, "each component spends a different time dissolved in the liquid, so leaves at its own retention time", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Layout of a gas chromatograph: carrier gas sweeps the vaporised sample from the heated injection port into a column in an oven, where components partition between the gas and a liquid stationary phase; each leaves at its own retention time and is sensed by the detector, which sends a signal to the recorder that draws the chromatogram.";
  const cap = "Figure: how a gas-liquid chromatograph is arranged, from injection to chromatogram";
  await fig("gas-chromatograph-layout", w, h, s, alt, cap, "analysis/chromatography-glc", "## How a gas-liquid chromatograph works");
}
// ---- chromatogram of the alcohol mixture (lesson Example 2)
{
  const peaks = [["ethanol", 0.6, 52, 1.4], ["propan-1-ol", 0.8, 18, 3.2], ["butan-1-ol", 1.0, 9.6, 5.0]];
  const areas = peaks.map(([, b, hh]) => (0.5 * b * hh)), tot = areas.reduce((a, b) => a + b, 0);
  if (areas.map((a) => a.toFixed(1)).join() !== "15.6,7.2,4.8") throw new Error("areas differ from lesson");
  const ax = D.axes({ x: [0, 7], y: [0, 60], xTicks: [], yTicks: 10, yLabel: "Peak height / mm", w: 600, h: 380, pad: { l: 64, r: 24, t: 34, b: 60 } });
  let body = ax.frame + D.text(ax.X(7), 372, "Time (positions of peaks are illustrative; widths are to scale)", { anchor: "end", size: 13, weight: 600 });
  const pts = [[0, 0]];
  peaks.forEach(([, b, hh, c]) => { pts.push([c - b / 2, 0], [c, hh], [c + b / 2, 0]); });
  pts.push([7, 0]);
  body += ax.line(pts, { stroke: C.blue });
  peaks.forEach(([n, b, hh, c], i) => {
    const pct = (areas[i] / tot) * 100;
    body += D.text(i === 0 ? ax.X(c) + 14 : ax.X(c), ax.Y(hh) + (i === 0 ? 16 : -50), `${n}\nbase ${b} min, height ${hh} mm\narea ${areas[i].toFixed(1)} → ${pct.toFixed(1)}%`, { size: 13, fill: C.ink, anchor: i === 0 ? "start" : "middle" });
  });
  const alt = "Gas chromatogram of three alcohols as triangular peaks: ethanol (base 0.6 min, height 52 mm, area 15.6, 56.5 percent), propan-1-ol (0.8 min, 18 mm, 7.2, 26.1 percent) and butan-1-ol (1.0 min, 9.6 mm, 4.8, 17.4 percent); percentages come from peak areas, not heights.";
  const cap = "Figure: composition from peak areas (half base times height) for the mixture in Example 2";
  await fig("gc-peak-areas-alcohols", 600, 380, body, alt, cap, "analysis/chromatography-glc", "## Percentage composition from peak areas");
}
