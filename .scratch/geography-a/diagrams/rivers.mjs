// geography-a river process figures. Run: node .scratch/geography-a/diagrams/rivers.mjs
import { D, C, make, lab, T } from "./_h.mjs";

/** Smooth path through points (quadratic through midpoints). */
const smooth = (pts) => {
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length - 1; i += 1) {
    const mx = (pts[i][0] + pts[i + 1][0]) / 2, my = (pts[i][1] + pts[i + 1][1]) / 2;
    d += ` Q${pts[i][0]},${pts[i][1]} ${mx},${my}`;
  }
  const l = pts[pts.length - 1];
  return d + ` L${l[0]},${l[1]}`;
};

// ---------- 1. Hjulstrom curve (schematic)
{
  const w = 580, h = 440, pl = 70, pr = 24, pt = 30, pb = 70;
  const X = (mm) => pl + ((Math.log10(mm) + 3) / 5) * (w - pl - pr); // 0.001 .. 100 mm
  const Y = (v) => h - pb - ((Math.log10(v) + 2) / 5) * (h - pt - pb); // 0.1 .. 1000 cm/s
  const erosion = [[0.001, 700], [0.004, 250], [0.01, 110], [0.06, 40], [0.3, 20], [1, 30], [10, 100], [100, 450]];
  const settle = [[0.001, 0.02], [0.01, 0.25], [0.06, 1.8], [0.3, 7], [1, 14], [10, 50], [100, 200]];
  let b = "";
  for (const e of [-3, -2, -1, 0, 1, 2]) b += D.line(X(10 ** e), Y(0.01), X(10 ** e), Y(1000), { stroke: C.grid, width: 1 }) + D.text(X(10 ** e), h - pb + 20, String(10 ** e), { anchor: "middle", size: 13, fill: C.muted });
  for (const e of [-2, -1, 0, 1, 2, 3]) b += D.line(X(0.001), Y(10 ** e), X(100), Y(10 ** e), { stroke: C.grid, width: 1 }) + D.text(pl - 8, Y(10 ** e) + 4, String(10 ** e), { anchor: "end", size: 13, fill: C.muted });
  b += D.line(pl, Y(0.01), w - pr, Y(0.01), { stroke: C.axis, width: 1.6 }) + D.line(pl, Y(0.01), pl, Y(1000), { stroke: C.axis, width: 1.6 });
  b += D.text(pl + 8, 18, "Flow velocity (cm/s)", { size: 14, weight: 600 });
  b += D.text(w - pr, h - 8, "Particle size (mm)", { anchor: "end", size: 14, weight: 600 });
  // size classes
  const cls = [["clay", 0.001, 0.004], ["silt", 0.004, 0.06], ["sand", 0.06, 2], ["gravel", 2, 64], ["cobbles", 64, 100]];
  for (const [n, a, z] of cls) { b += D.line(X(a), h - pb + 30, X(z), h - pb + 30, { stroke: C.muted, width: 1.2 }) + D.text((X(a) + X(z)) / 2, h - pb + 46, n, { anchor: "middle", size: 12, fill: C.muted }); }
  b += D.path_(smooth(erosion.map(([m, v]) => [X(m), Y(v)])), { stroke: C.red, width: 3 });
  b += D.path_(smooth(settle.map(([m, v]) => [X(m), Y(v)])), { stroke: C.blue, width: 3 });
  b += lab(X(0.0013), Y(500) - 4, "Critical erosion velocity", { anchor: "start", fill: C.red, size: 13 });
  b += lab(X(0.002), Y(0.03) - 4, "Settling velocity", { anchor: "start", fill: C.blue, size: 13 });
  b += lab(X(0.3), Y(500), "EROSION", { anchor: "middle", size: 14, fill: C.red });
  b += lab(X(2.5), Y(2.5), "DEPOSITION", { anchor: "middle", size: 14, fill: C.blue });
  b += lab(X(0.02), Y(8), "TRANSPORT", { anchor: "middle", size: 14, fill: C.ink });
  b += D.circle(X(0.3), Y(20), 5, { fill: C.red, stroke: C.red });
  b += D.line(X(0.3), Y(20) - 6, X(0.3), Y(140) + 6, { stroke: C.muted, width: 1.2 }) + lab(X(0.3), Y(140), "Sand: lowest erosion velocity, about 20 cm/s", { anchor: "middle", size: 12 });
  await make("hjulstrom-curve", w, h, b,
    "Hjulstrom curve (schematic, log scales): medium sand needs the lowest velocity to be eroded, about 20 cm/s; finer silt and clay need higher velocities because particles stick together, and gravel needs more because it is heavy; transport continues at velocities below the erosion curve until the settling curve is crossed and deposition occurs.",
    "Figure: schematic Hjulstrom curve (approximate values) linking flow velocity, particle size and erosion, transport and deposition",
    "hydro/river-processes-landforms", "### The Hjulström curve");
}

// ---------- 2. Meander plan view and cross-section
{
  const w = 580, h = 470;
  const yc = (x, A = 45) => 120 - A * Math.sin((2 * Math.PI * (x - 30)) / 250);
  const xs = []; for (let x = 20; x <= 560; x += 6) xs.push(x);
  let b = "";
  b += D.rect(10, 30, 560, 200, { fill: "#f6f2ea", stroke: C.grid, width: 1 });
  b += D.path_(smooth(xs.map((x) => [x, yc(x)])), { stroke: C.axis, width: 36 });
  b += D.path_(smooth(xs.map((x) => [x, yc(x)])), { stroke: "#bfe6f1", width: 32 });
  b += D.path_(smooth(xs.map((x) => [x, yc(x, 56)])), { stroke: C.blue, width: 2.4, dash: true });
  // point bars (inside of bends)
  b += D.polyline([[62, yc(92) + 20], [92, yc(92) + 30], [124, yc(92) + 20], [100, yc(92) + 12], [80, yc(92) + 12]], { fill: "#f1d9a8", stroke: C.amber, width: 1.5, close: true });
  b += D.polyline([[188, yc(217) - 20], [217, yc(217) - 30], [249, yc(217) - 20], [225, yc(217) - 12], [205, yc(217) - 12]], { fill: "#f1d9a8", stroke: C.amber, width: 1.5, close: true });
  b += lab(112, 226, "Point bars: deposition", { anchor: "start", size: 12 });
  b += lab(104, 50, "River cliff (outer bank): erosion", { anchor: "start", size: 12, fill: C.red });
  b += lab(560, 226, "Thalweg (dashed): fastest flow", { anchor: "end", size: 12, fill: C.blue });
  b += D.arrow(480, 46, 545, 46, { stroke: C.blue, width: 2 }) + T(470, 51, "Flow", { fill: C.blue, anchor: "end" });
  // A-B line through the first bend apex
  b += D.line(92, 34, 92, 200, { stroke: C.muted, width: 1.4, dash: true }) + T(84, 28, "A", { weight: 700 }) + T(86, 216, "B", { weight: 700 });
  // cross-section panel
  b += D.text(290, 268, "Cross-section A to B through the bend (outer bank on the left)", { anchor: "middle", size: 14, weight: 700 });
  const g = 300;
  b += D.polyline([[20, g], [150, g], [160, 400], [185, 410], [280, 392], [420, 330], [440, g], [560, g], [560, 440], [20, 440]], { fill: "#e9d5b8", stroke: C.ink, width: 2.4, close: true });
  b += D.polyline([[150, g], [160, 400], [185, 410], [280, 392], [420, 330], [440, g]], { fill: "#bfe6f1", stroke: C.ink, width: 2.4, close: true });
  b += D.polyline([[150, g + 2], [440, g + 2]], { stroke: C.blue, width: 2 });
  b += D.arrow(400, 320, 200, 326, { stroke: C.blue, width: 2.4 }) + D.arrow(220, 396, 410, 350, { stroke: C.blue, width: 2.4 });
  b += D.arrow(222, 330, 224, 392, { stroke: C.blue, width: 1.8 }) + D.arrow(406, 346, 400, 326, { stroke: C.blue, width: 1.8 });
  b += lab(30, 360, "River cliff:", { anchor: "start", size: 12, fill: C.red }) + lab(30, 380, "steep, eroded", { anchor: "start", size: 12, fill: C.red });
  b += lab(556, 332, "Point bar: gentle,", { anchor: "end", size: 12 }) + lab(556, 352, "deposited sand", { anchor: "end", size: 12 });
  b += lab(300, 316, "Helicoidal flow (corkscrew)", { anchor: "middle", size: 12, fill: C.blue });
  b += lab(185, 432, "Deepest point (thalweg)", { anchor: "start", size: 12 });
  await make("meander-plan-cross-section", w, h, b,
    "Meander in plan and cross-section: the fastest flow (thalweg) swings to the outer bank of each bend, cutting a steep river cliff, while slow flow on the inside deposits a gently sloping point bar; helicoidal flow carries water to the outer bank at the surface and sediment back along the bed to the inner bank.",
    "Figure: a meander in plan view and in cross-section, showing erosion on the outside and deposition on the inside",
    "hydro/river-processes-landforms", "2. **Meander, river cliff and point bar.**");
}

// ---------- 3. Waterfall and gorge formation
{
  const w = 580, h = 330;
  let b = "";
  b += D.polyline([[20, 150], [255, 150], [255, 300], [20, 300]], { fill: "#e9d5b8", stroke: C.ink, width: 1.8, close: true });
  b += D.polyline([[20, 110], [255, 110], [255, 150], [20, 150]], { fill: "#b9b4ab", stroke: C.ink, width: 2, close: true });
  b += D.polyline([[255, 232], [560, 232], [560, 300], [255, 300]], { fill: "#e9d5b8", stroke: C.ink, width: 1.8, close: true });
  b += D.polyline([[255, 168], [228, 190], [228, 226], [255, 232]], { fill: "#ffffff", stroke: C.ink, width: 1.5, close: true });
  b += D.polyline([[255, 110], [430, 110], [430, 150], [255, 150]], { stroke: C.muted, width: 1.5, dash: true, close: true });
  b += D.polyline([[255, 150], [430, 150], [430, 232]], { stroke: C.muted, width: 1.5, dash: true });
  b += D.polyline([[20, 104], [255, 104], [258, 110]], { stroke: C.blue, width: 4 });
  b += D.path_("M255,104 Q285,106 290,150 L290,226", { stroke: C.blue, width: 4 });
  b += D.polyline([[262, 232], [300, 214], [340, 226], [360, 232]], { fill: "#bfe6f1", stroke: C.blue, width: 1.5, close: true });
  b += D.polyline([[360, 226], [420, 224], [540, 224]], { stroke: C.blue, width: 3 });
  b += D.arrow(60, 94, 150, 94, { stroke: C.blue, width: 2.2 });
  b += D.arrow(450, 214, 530, 214, { stroke: C.blue, width: 2.2 });
  b += D.text(30, 134, "Hard rock (resistant, eroded slowly)", { size: 13 });
  b += D.text(30, 200, "Soft rock", { size: 13, weight: 600 }) + D.text(30, 218, "(eroded faster)", { size: 13 });
  b += lab(20, 66, "River flows from the left", { anchor: "start", size: 12, fill: C.blue });
  b += lab(272, 40, "Gorge: lengthens as the fall retreats", { anchor: "start", size: 12 });
  b += lab(272, 74, "Dashed: former position of the fall", { anchor: "start", size: 12 });
  b += lab(20, 280, "Undercutting by hydraulic action and abrasion", { anchor: "start", size: 12 }) + D.line(150, 262, 228, 214, { stroke: C.muted, width: 1.3 });
  b += lab(300, 262, "Plunge pool", { anchor: "start", size: 12 });
  b += D.arrow(430, 182, 296, 182, { stroke: C.red, width: 2.4 }) + lab(440, 186, "Retreat upstream", { anchor: "start", size: 12, fill: C.red });
  await make("waterfall-gorge-formation", w, h, b,
    "Waterfall formation: where resistant hard rock overlies softer rock the soft rock is undercut, the overhanging hard rock collapses, and the fall retreats upstream, leaving a steep-sided gorge downstream and a plunge pool at its base.",
    "Figure: how a waterfall forms and retreats upstream, leaving a gorge",
    "hydro/river-processes-landforms", "1. **Waterfall and gorge.**");
}

// ---------- 4. Channel efficiency (worked example values)
{
  const ch = [{ name: "Upper course", wd: 3, dp: 0.5 }, { name: "Lower course", wd: 20, dp: 3 }];
  const sc = 11; // px per metre
  const w = 580, h = 250;
  let b = "";
  ch.forEach((c, i) => {
    const area = c.wd * c.dp, wp = c.wd + 2 * c.dp, R = area / wp;
    const cx = i === 0 ? 120 : 400, top = 70, wpx = c.wd * sc, dpx = c.dp * sc;
    b += D.text(cx, 24, c.name, { anchor: "middle", size: 15, weight: 700 });
    b += D.line(cx - wpx / 2 - 30, top, cx - wpx / 2, top, { stroke: C.ink, width: 2 }) + D.line(cx + wpx / 2, top, cx + wpx / 2 + 30, top, { stroke: C.ink, width: 2 });
    b += D.rect(cx - wpx / 2, top, wpx, dpx, { fill: "#bfe6f1", stroke: "none" });
    b += D.polyline([[cx - wpx / 2, top], [cx - wpx / 2, top + dpx], [cx + wpx / 2, top + dpx], [cx + wpx / 2, top]], { stroke: C.amber, width: 4 });
    b += D.text(cx, top + dpx + 24, `width ${c.wd} m, depth ${c.dp} m`, { anchor: "middle", size: 13 });
    b += D.text(cx, top + dpx + 46, `Area = ${c.wd} × ${c.dp} = ${area} m²`, { anchor: "middle", size: 13 });
    b += D.text(cx, top + dpx + 68, `Wetted perimeter = ${c.wd} + 2(${c.dp}) = ${wp} m`, { anchor: "middle", size: 13, fill: C.amber });
    b += D.text(cx, top + dpx + 92, `Hydraulic radius = ${area} ÷ ${wp} = ${R === 0.375 ? "0.375" : (Math.round(R * 100) / 100)} m`, { anchor: "middle", size: 14, weight: 700 });
  });
  b += D.text(290, 240, `Same scale for both channels. The lower channel is ${(60 / 26 / (1.5 / 4)).toFixed(1)} times as efficient.`, { anchor: "middle", size: 13, fill: C.muted });
  await make("channel-efficiency-hydraulic-radius", w, h, b,
    "Two channels drawn to the same scale: the upper-course channel (3 m wide, 0.5 m deep) has a hydraulic radius of 0.375 m, while the lower-course channel (20 m wide, 3 m deep) has 2.31 m, about six times more efficient because less of the water touches the bed and banks; the wetted perimeter is the thick line.",
    "Figure: wetted perimeter and hydraulic radius of an upper and a lower channel (worked-example values)",
    "hydro/river-processes-landforms", "Comparing channel efficiency");
}

// ---------- 5. Flood hydrograph before / after clearance (bankfull 45)
{
  const bank = 45, pkB = 38, pkA = 61, base = 8;
  const w = 560, h = 400;
  const ax = D.axes({ x: [0, 24], y: [0, 70], w, h, xTicks: 4, yTicks: 10, xLabel: "Time (hours)", yLabel: "Discharge (m³/s)" });
  const f = (pk, tp) => (t) => base + (pk - base) * (t / tp) * Math.exp(1 - t / tp);
  let b = ax.frame;
  b += ax.area((t) => Math.max(f(pkA, 5)(t), bank), () => bank, [0, 24], { fill: "#fbd5d0" });
  b += D.line(ax.X(0), ax.Y(bank), ax.X(24), ax.Y(bank), { stroke: C.amber, width: 2.4, dash: true });
  b += ax.plot(f(pkB, 7), { stroke: C.green });
  b += ax.plot(f(pkA, 5), { stroke: C.red });
  b += lab(ax.X(24), ax.Y(bank) - 8, "Bankfull discharge 45 m³/s", { anchor: "end", fill: C.amber, size: 13 });
  b += lab(ax.X(7.5), ax.Y(14), "Before clearance: peak 38 (stays in channel)", { anchor: "start", fill: C.green, size: 12 });
  b += lab(ax.X(5) + 14, ax.Y(pkA) - 6, "After clearance: peak 61", { anchor: "start", fill: C.red, size: 12 });
  b += ax.point(5, pkA, { stroke: C.red }) + ax.point(7, pkB, { stroke: C.green });
  b += lab(ax.X(10), ax.Y(52), "Flood: 16 m³/s over the banks", { anchor: "start", fill: C.red, size: 12 });
  await make("flood-hydrograph-bankfull", w, h, b,
    "Flood hydrograph: before the catchment was cleared of trees the peak of 38 m3/s stayed below the bankfull discharge of 45 m3/s, but afterwards the peak of 61 m3/s, 60.5 percent higher, exceeds bankfull by 16 m3/s and the river overflows.",
    "Figure: peak discharge before and after clearance against bankfull discharge (peaks and bankfull from the worked example; curve shapes illustrative)",
    "hydro/river-floods", "Change in peak discharge");
}
