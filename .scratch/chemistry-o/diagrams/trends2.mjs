// Run from repo root: node .scratch/chemistry-o/diagrams/trends2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put } from "./_h.mjs";

// ---- Group I melting points
{
  const data = [["Li", 181], ["Na", 98], ["K", 63], ["Rb", 39], ["Cs", 28]];
  const w = 560, h = 380;
  const ax = D.axes({ x: [0, 5], y: [0, 200], w, h, xTicks: [], yTicks: [0, 50, 100, 150, 200], origin: false, arrows: false, yLabel: "Melting point / °C" });
  let b = ax.frame;
  const bw = 54;
  data.forEach(([s, v], i) => {
    const cx = ax.X(i + 0.5);
    b += D.rect(cx - bw / 2, ax.Y(v), bw, ax.Y(0) - ax.Y(v), { fill: C.teal, stroke: "none" });
    b += T(cx, ax.Y(v) - 7, String(v), { anchor: "middle", size: 14, weight: 700 });
    b += T(cx, ax.Y(0) + 22, s, { anchor: "middle", size: 15, weight: 700 });
  });
  b += T(ax.X(5) - 6, 50, "going down the group", { anchor: "end", size: 13, fill: C.muted });
  b += T(ax.X(5) - 6, 68, "melting point falls", { anchor: "end", size: 13, fill: C.muted });
  await put("group-i-melting-points-trend", w, h, b,
    "Bar chart: the melting points of the Group I metals fall down the group, lithium 181, sodium 98, potassium 63, rubidium 39 and caesium 28 degrees Celsius (measured), so the decreases get smaller.",
    "Figure: melting points of lithium, sodium, potassium, rubidium and caesium",
    "periodic/group-i", "Because all Group I elements have one outer electron");
}

// ---- Group VII melting and boiling points
{
  const data = [["F₂", -220, -188, "gas"], ["Cl₂", -101, -34, "gas"], ["Br₂", -7, 59, "liquid"], ["I₂", 114, 184, "solid"]];
  const rt = 25;
  const w = 600, h = 430;
  const ax = D.axes({ x: [0, 4], y: [-250, 200], w, h, xTicks: [], yTicks: [-250, -200, -150, -100, -50, 0, 50, 100, 150, 200], origin: true, arrows: false, yLabel: "Temperature / °C", pad: { l: 70, r: 20, t: 30, b: 64 } });
  let b = ax.frame;
  const bw = 40;
  data.forEach(([f, mp, bp, st], i) => {
    const cx = ax.X(i + 0.5);
    [[mp, -bw / 2 - 3, C.teal], [bp, bw / 2 + 3, C.amber]].forEach(([v, dx, fill]) => {
      const x = cx + dx - bw / 2;
      b += D.rect(x, Math.min(ax.Y(v), ax.Y(0)), bw, Math.abs(ax.Y(v) - ax.Y(0)), { fill, stroke: "none" });
      b += T(x + bw / 2, v < 0 ? ax.Y(v) + 16 : ax.Y(v) - 6, String(v).replace("-", "−"), { anchor: "middle", size: 12, weight: 700 });
    });
    b += T(cx, h - 38, f, { anchor: "middle", size: 15, weight: 700 });
    b += T(cx, h - 18, st + " at 25 °C", { anchor: "middle", size: 13 });
  });
  b += D.line(ax.X(0), ax.Y(rt), ax.X(4), ax.Y(rt), { stroke: C.red, width: 1.6, dash: true });
  b += T(ax.X(0) + 8, ax.Y(rt) - 6, "25 °C", { size: 12, fill: C.red, weight: 700 });
  b += D.rect(ax.X(0) + 70, 38, 14, 14, { fill: C.teal, stroke: "none" }) + T(ax.X(0) + 90, 50, "melting point", { size: 13 });
  b += D.rect(ax.X(0) + 200, 38, 14, 14, { fill: C.amber, stroke: "none" }) + T(ax.X(0) + 220, 50, "boiling point", { size: 13 });
  await put("group-vii-melting-boiling-points", w, h, b,
    "Group VII melting and boiling points rise down the group: fluorine −220 and −188, chlorine −101 and −34, bromine −7 and 59, iodine 114 and 184 degrees Celsius, so at 25 degrees Celsius fluorine and chlorine are gases, bromine a liquid and iodine a solid.",
    "Figure: melting and boiling points of the halogens against 25 °C",
    "periodic/group-vii", "## The halogens at room temperature");
}

// ---- chlorine isotopes and the weighted average
{
  const iso = [[35, 75], [37, 25]];
  const ar = iso.reduce((a, [m, p]) => a + m * p, 0) / 100; // 35.5
  const w = 560, h = 380;
  const ax = D.axes({ x: [34, 38], y: [0, 100], w, h, xTicks: [34, 35, 36, 37, 38], yTicks: [0, 25, 50, 75, 100], xLabel: "Mass number", yLabel: "Abundance / %", origin: false, arrows: false });
  let b = ax.frame;
  const bw = 60;
  iso.forEach(([m, p]) => {
    b += D.rect(ax.X(m) - bw / 2, ax.Y(p), bw, ax.Y(0) - ax.Y(p), { fill: C.teal, stroke: "none" });
    b += T(ax.X(m), ax.Y(p) - 22, `chlorine-${m}`, { anchor: "middle", size: 13 });
    b += T(ax.X(m), ax.Y(p) - 7, `${p}%`, { anchor: "middle", size: 14, weight: 700 });
  });
  b += D.line(ax.X(ar), ax.Y(0), ax.X(ar), ax.Y(100), { stroke: C.red, width: 2, dash: true });
  b += D.tag(ax.X(ar) + 8, ax.Y(88), `Ar = ${ar} (nearer 35)`, { size: 13, stroke: C.red });
  b += T(ax.X(35.6), ax.Y(55), "(75 × 35 + 25 × 37) ÷ 100", { anchor: "start", size: 12, fill: C.muted });
  await put("isotopes-chlorine-relative-atomic-mass", w, h, b,
    `Bar chart of chlorine isotopes: chlorine-35 is 75% and chlorine-37 is 25% abundant, so the weighted average relative atomic mass is (35 × 75 + 37 × 25) ÷ 100 = ${ar}, nearer 35 than 37.`,
    "Figure: the relative atomic mass of chlorine is the abundance-weighted average, 35.5",
    "atoms/isotopes", "## Calculating relative atomic mass");
}

// ---- ammonia and hydrogen chloride diffusion tube
{
  const w = 600, h = 300;
  const L = 100, ring = 59; // cm
  const px = 5, x0 = 50, y = 130;
  const xr = x0 + ring * px;
  let b = D.rect(x0, y - 24, L * px, 48, { fill: "#fff", stroke: C.axis, width: 2 });
  b += D.rect(x0 - 12, y - 18, 12, 36, { fill: C.fillAmber, stroke: C.axis, width: 1.6 });
  b += D.rect(x0 + L * px, y - 18, 12, 36, { fill: C.fillAmber, stroke: C.axis, width: 1.6 });
  b += D.rect(x0 + 2, y - 20, 30, 40, { fill: "#d9d4cc", stroke: "none" });
  b += D.rect(x0 + L * px - 32, y - 20, 30, 40, { fill: "#d9d4cc", stroke: "none" });
  b += T(x0 + 17, y - 52, "cotton wool\nwith NH₃", { anchor: "middle", size: 12 });
  b += T(x0 + L * px - 17, y - 52, "cotton wool\nwith HCl", { anchor: "middle", size: 12 });
  b += D.rect(xr - 6, y - 22, 12, 44, { fill: "#f2f0ec", stroke: C.muted, width: 1.5 });
  b += T(xr, y + 46, "white ring of NH₄Cl", { anchor: "middle", size: 14, weight: 700 });
  b += D.line(xr, y + 26, xr, y + 32, { stroke: C.muted, width: 1.4 });
  b += D.line(x0, 222, xr, 222, { stroke: C.blue, width: 2, arrow: true });
  b += D.line(xr, 222, x0 + L * px, 222, { stroke: C.amber, width: 2, arrow: true });
  b += T((x0 + xr) / 2, 246, `NH₃ travels ${ring} cm`, { anchor: "middle", size: 14 }) + T((x0 + xr) / 2, 266, "Mr = 17: faster", { anchor: "middle", size: 13, fill: C.blue, weight: 700 });
  b += T((xr + x0 + L * px) / 2, 246, `HCl travels ${L - ring} cm`, { anchor: "middle", size: 14 }) + T((xr + x0 + L * px) / 2, 266, "Mr = 36.5: slower", { anchor: "middle", size: 13, fill: C.amber, weight: 700 });
  b += T(x0, 22, `100 cm glass tube; ring forms ${ring} cm from the ammonia end`, { size: 14, weight: 700 });
  await put("diffusion-ammonia-hydrogen-chloride-tube", w, h, b,
    `Diffusion tube: ammonia (Mr 17) from the left travels ${ring} cm and hydrogen chloride (Mr 36.5) from the right travels ${L - ring} cm before they meet and form a white ring of ammonium chloride, so the lighter ammonia diffuses faster, about ${Math.round((ring / (L - ring)) * 10) / 10} times as far.`,
    "Figure: the ring of ammonium chloride forms nearer the HCl end, showing ammonia diffuses faster",
    "matter/diffusion", "The ring forms **closer to the hydrochloric acid end**");
}

// ---- water treatment flow
{
  const w = 600, h = 320;
  const st = [
    ["Screening", "removes sticks,\nleaves, plastic", C.fillGrey],
    ["Flocculation", "aluminium sulfate\nclumps fine particles", C.fillAmber],
    ["Sedimentation", "flocs settle in\nlarge tanks", C.fillBlue],
    ["Filtration", "sand and gravel trap\nsmall particles", C.fillBlue],
    ["Activated carbon", "removes tastes\nand odours", C.fillGrey],
    ["Chlorination", "kills bacteria and\nother microbes", C.fillGreen],
  ];
  const pos = [[20, 30], [220, 30], [420, 30], [420, 170], [220, 170], [20, 170]];
  let b = "";
  st.forEach(([t, n, fill], i) => {
    const [x, y] = pos[i];
    b += D.rect(x, y, 160, 90, { fill, stroke: C.axis, r: 8 });
    b += T(x + 80, y + 26, `${i + 1}  ${t}`, { anchor: "middle", size: 14, weight: 700 });
    b += T(x + 80, y + 50, n, { anchor: "middle", size: 12 });
  });
  b += D.arrow(182, 75, 218, 75, { width: 2 }) + D.arrow(382, 75, 418, 75, { width: 2 });
  b += D.arrow(500, 122, 500, 168, { width: 2 });
  b += D.arrow(418, 215, 382, 215, { width: 2 }) + D.arrow(218, 215, 182, 215, { width: 2 });
  b += D.arrow(100, 262, 100, 290, { width: 2 });
  b += T(100, 312, "safe to drink (potable)", { anchor: "middle", size: 14, weight: 700 });
  b += T(240, 312, "Flocculation: ZIMSEC. Activated carbon: Cambridge.", { size: 12, fill: C.muted });
  await put("water-treatment-works-stages", w, h, b,
    "Flow chart of water treatment: screening removes litter, aluminium sulfate makes fine particles clump (flocculation), flocs settle in tanks (sedimentation), sand and gravel filter the rest, activated carbon removes tastes and odours, and chlorine kills microbes, giving safe drinking water.",
    "Figure: the stages of treating river water and what each one removes",
    "environment/water-treatment", "## The stages of treatment");
}
