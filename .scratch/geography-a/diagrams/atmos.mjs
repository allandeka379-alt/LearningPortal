// geography-a atmosphere figures. Run: node .scratch/geography-a/diagrams/atmos.mjs
import { D, C, make, lab, T } from "./_h.mjs";

// ---------- 1. Energy budget of 100 units
{
  const w = 580, h = 400;
  const U = { cloud: 26, surf: 4, atm: 20, land: 50 };
  const total = U.cloud + U.surf + U.atm + U.land; // 100
  const out = U.cloud + U.surf; // 30
  const lw = U.atm + U.land; // 70
  let b = "";
  b += D.node(10, 150, 100, 70, `Incoming\nsunlight\n${total} units`, { fill: C.fillAmber, weight: 700 });
  const rows = [
    ["Cloud and air reflect", U.cloud, C.teal],
    ["Surface reflects", U.surf, C.teal],
    ["Atmosphere absorbs", U.atm, C.amber],
    ["Land and oceans absorb", U.land, C.amber],
  ];
  const ys = [40, 120, 220, 320];
  rows.forEach(([l, v, col], i) => {
    const y = ys[i];
    const sw = Math.max(3, v * 0.28);
    b += D.line(110, 185, 190, y + 20, { stroke: col, width: sw });
    b += D.node(190, y, 200, 40, `${l}: ${v}`, { fill: col === C.teal ? C.fillBlue : C.fillAmber, size: 13 });
  });
  // outputs
  b += D.line(390, 60, 440, 100, { stroke: C.teal, width: out * 0.28 }) + D.line(390, 140, 440, 110, { stroke: C.teal, width: 3 });
  b += D.node(440, 70, 130, 70, `Shortwave back\nto space: ${out}\n(albedo ${out / total})`, { fill: C.fillBlue, size: 13 });
  b += D.line(390, 240, 440, 290, { stroke: C.amber, width: U.atm * 0.28 }) + D.line(390, 340, 440, 320, { stroke: C.amber, width: U.land * 0.28 });
  b += D.node(440, 260, 130, 90, `Longwave to\nspace: ${lw}\n(${U.atm} + ${U.land})`, { fill: C.fillAmber, size: 13 });
  b += D.text(290, 392, `Balance: ${total} in = ${out} shortwave out + ${lw} longwave out. Arrow thickness shows the units.`, { anchor: "middle", size: 13, fill: C.muted });
  await make("energy-budget-100-units", w, h, b,
    "Global energy budget of 100 units of sunlight: 26 are reflected by clouds and the air and 4 by the surface (albedo 0.30), 20 are absorbed by the atmosphere and 50 by land and oceans, and the 70 absorbed units must leave as longwave radiation so that inputs equal outputs.",
    "Figure: what happens to 100 units of incoming solar energy (simplified, rounded values)",
    "atmos/energy-budget", "## What happens to incoming radiation");
}

// ---------- 2. Diurnal temperature, clear vs cloudy
{
  const t = [0, 3, 6, 9, 12, 15, 18, 21];
  const clear = [11, 9, 8, 16, 25, 28, 22, 14];
  const cloudy = [15, 14, 14, 17, 21, 22, 20, 17];
  const w = 560, h = 400;
  const ax = D.axes({ x: [0, 21], y: [0, 32], w, h, xTicks: 3, yTicks: 4, xLabel: "Time of day", yLabel: "Temperature (°C)", xFormat: (v) => String(v).padStart(2, "0") + ":00" });
  let b = ax.frame;
  b += ax.line(t.map((x, i) => [x, clear[i]]), { stroke: C.red }) + ax.line(t.map((x, i) => [x, cloudy[i]]), { stroke: C.blue });
  t.forEach((x, i) => { b += ax.point(x, clear[i], { stroke: C.red, r: 3.5 }) + ax.point(x, cloudy[i], { stroke: C.blue, r: 3.5 }); });
  b += lab(ax.X(15) + 8, ax.Y(28) - 4, "Clear: max 28", { anchor: "start", fill: C.red, size: 13 });
  b += lab(ax.X(6) - 8, ax.Y(8) + 22, "Clear: min 8", { anchor: "end", fill: C.red, size: 13 });
  b += lab(ax.X(14), ax.Y(18), "Cloudy: max 22", { anchor: "middle", fill: C.blue, size: 13 });
  b += lab(ax.X(0.6), ax.Y(15) - 8, "Cloudy: min 14", { anchor: "start", fill: C.blue, size: 13 });
  b += D.text(ax.X(10.5), ax.Y(1.4), "Diurnal range: clear 28 − 8 = 20 °C; cloudy 22 − 14 = 8 °C", { anchor: "middle", size: 13, weight: 700 });
  await make("diurnal-temperature-clear-cloudy", w, h, b,
    "Temperature through a day: on the clear day it falls to 8 degrees C at 06:00 and peaks at 28 degrees C at 15:00, a range of 20 degrees; on the cloudy day it stays between 14 and 22 degrees, a range of 8 degrees, because cloud cuts daytime heating and traps heat at night.",
    "Figure: temperature every three hours on a clear day and a cloudy day (illustrative highveld data)",
    "atmos/energy-budget", "Describing and explaining a day and night comparison");
}

// ---------- 3. Net radiation by latitude
{
  const bands = ["0–10", "10–20", "20–30", "30–40", "40–50", "50–60", "60–70", "70–80", "80–90"];
  const net = [45, 45, 35, 10, -30, -70, -95, -110, -115];
  const w = 580, h = 420;
  const ax = D.axes({ x: [0, 9], y: [-130, 60], w, h, xTicks: [], yTicks: 20, yLabel: "Net radiation (W/m²)", pad: { b: 40, t: 28 } });
  let b = ax.frame;
  net.forEach((v, i) => {
    const x0 = ax.X(i + 0.15), x1 = ax.X(i + 0.85);
    b += D.rect(x0, Math.min(ax.Y(v), ax.Y(0)), x1 - x0, Math.abs(ax.Y(v) - ax.Y(0)), { fill: v >= 0 ? C.teal : C.amber, stroke: "none" });
    b += D.text((x0 + x1) / 2, v >= 0 ? ax.Y(v) - 5 : ax.Y(v) + 15, (v > 0 ? "+" : "−") + Math.abs(v), { anchor: "middle", size: 12 });
    b += D.text((x0 + x1) / 2, ax.Y(0) + (v >= 0 ? 16 : -6), bands[i], { anchor: "middle", size: 11, fill: C.ink });
  });
  b += D.text(ax.X(9), ax.Y(0) + 34, "Latitude band (°)", { anchor: "end", size: 14, weight: 600 }).replace(/y="[\d.]+"/, `y="${h - 8}"`);
  b += lab(ax.X(0.2), ax.Y(-100), "Blue bars: surplus (above zero)", { anchor: "start", size: 12, fill: C.blue });
  b += lab(ax.X(0.2), ax.Y(-118), "Amber bars: deficit (below zero)", { anchor: "start", size: 12, fill: C.amber });
  const bal = 35 + (10 / 40) * 10; // 37.5
  b += D.line(ax.X(3.75), ax.Y(52), ax.X(3.75), ax.Y(-60), { stroke: C.ink, width: 1.6, dash: true }) + lab(ax.X(3.75) + 6, ax.Y(52), `Balance at about ${bal}°`, { anchor: "start", size: 12 });
  await make("net-radiation-by-latitude", w, h, b,
    "Net radiation by latitude: a surplus of +45, +45, +35 and +10 W/m2 in the bands from 0 to 40 degrees, and a deficit growing from -30 W/m2 at 40 to 50 degrees to -115 W/m2 at 80 to 90 degrees; the balance point is at about 37.5 degrees.",
    "Figure: net radiation by latitude band (illustrative values from the lesson table)",
    "atmos/global-transfers", "Illustrative net radiation (approximate pattern");
}

// ---------- 4. Tri-cellular model
{
  const w = 580, h = 430;
  const gx = (lat) => 50 + (lat / 90) * 480;
  const yT = 130, yB = 300;
  let b = "";
  b += D.line(gx(0), 98, gx(90), 98, { stroke: C.muted, width: 1.5, dash: true }) + T(gx(90), 90, "Top of the troposphere", { anchor: "end", fill: C.muted, size: 12 });
  b += D.rect(gx(0), 326, gx(90) - gx(0), 14, { fill: "#e9d5b8", stroke: C.ink, width: 1.5 });
  [0, 30, 60, 90].forEach((l) => { b += D.line(gx(l), 340, gx(l), 352, { stroke: C.ink, width: 1.5 }) + D.text(gx(l), 370, l === 0 ? "0° equator" : l + "°", { anchor: l === 0 ? "start" : l === 90 ? "end" : "middle", size: 13, weight: 600 }).replace(/x="[\d.]+"/g, (m) => (l === 0 ? `x="${gx(0) - 10}"` : m)); });
  const W = 2.2;
  // Hadley: surface flow to the equator (left), rises at left, sinks at right
  const cell = (x1, x2, surf, name, col) => {
    let r = "";
    if (surf === "left") {
      r += D.arrow(x2, yB, x1 + 4, yB, { stroke: col, width: W }) + D.arrow(x1, yB - 4, x1, yT + 4, { stroke: col, width: W }) + D.arrow(x1 + 4, yT, x2, yT, { stroke: col, width: W }) + D.arrow(x2, yT + 4, x2, yB - 4, { stroke: col, width: W });
    } else {
      r += D.arrow(x1 + 4, yB, x2, yB, { stroke: col, width: W }) + D.arrow(x2, yB - 4, x2, yT + 4, { stroke: col, width: W }) + D.arrow(x2, yT, x1 + 4, yT, { stroke: col, width: W }) + D.arrow(x1, yT + 4, x1, yB - 4, { stroke: col, width: W });
    }
    return r + D.text((x1 + x2) / 2, (yT + yB) / 2 + 5, name, { anchor: "middle", size: 15, weight: 700, fill: col });
  };
  b += cell(gx(0) + 14, gx(30) - 12, "left", "Hadley cell", C.red);
  b += cell(gx(30) + 12, gx(60) - 12, "right", "Ferrel cell", C.green);
  b += cell(gx(60) + 12, gx(90) - 14, "left", "Polar cell", C.blue);
  b += lab(gx(15), 292, "Trade winds", { anchor: "middle", size: 12, fill: C.red });
  b += lab(gx(45), 292, "Westerlies", { anchor: "middle", size: 12, fill: C.green });
  b += lab(gx(75), 292, "Polar easterlies", { anchor: "middle", size: 12, fill: C.blue });
  b += T(gx(0) - 10, 396, "Low: air rises (ITCZ)", { size: 12.5 }) + T(gx(30), 396, "High: air sinks", { size: 12.5, anchor: "middle" }) + T(gx(60), 396, "Low: air rises", { size: 12.5, anchor: "middle" }) + T(gx(90), 396, "High: sinks", { size: 12.5, anchor: "end" });
  b += D.text(290, 24, "One hemisphere, side view: arrows along the ground are the surface winds", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(290, 418, "Air sinks under high pressure (dry) and rises under low pressure (cloud, rain)", { anchor: "middle", size: 12.5, fill: C.muted });
  await make("tricellular-circulation", w, h, b,
    "Tri-cellular model for one hemisphere: in the Hadley cell air rises at the equatorial low and sinks at about 30 degrees, returning as the trade winds; in the polar cell air sinks at the pole and rises at 60 degrees, flowing out as polar easterlies; the Ferrel cell between them has westerlies at the surface.",
    "Figure: the three cells of the global atmospheric circulation, with pressure belts and surface winds",
    "atmos/global-transfers", "## The tri-cellular model");
}

// ---------- 5. Cold front passage: pressure and temperature
{
  const times = ["06:00", "09:00", "12:00", "15:00", "18:00"];
  const P = [1010, 1007, 1004, 1009, 1014];
  const Tm = [24, 26, 27, 17, 15];
  const w = 560, h = 520;
  const mk = (data, y, label, col) => {
    const ax = D.axes({ x: [0, 4], y, w, h: 250, xTicks: [0, 1, 2, 3, 4], xFormat: (v) => times[v], yFormat: (v) => String(v), yLabel: label, pad: { t: 30, b: 44, l: 70 } });
    let s = ax.frame + ax.line(data.map((d, i) => [i, d]), { stroke: col });
    data.forEach((d, i) => { s += ax.point(i, d, { stroke: col, r: 4 }) + ax.label(i, d, String(d), { dx: i === 4 ? -34 : 8, dy: (label[0] === "P" && i === 2) || (label[0] === "P" && i === 3) ? 22 : -9, size: 13, weight: 700 }); });
    return { s, ax };
  };
  const p = mk(P, [1000, 1016], "Pressure (hPa)", C.blue);
  const t = mk(Tm, [10, 30], "Temperature (°C)", C.red);
  let b = p.s + D.group(t.s, { translate: [0, 260] });
  // front passage band 12:00-15:00
  b += D.rect(p.ax.X(2), 30, p.ax.X(3) - p.ax.X(2), 250 - 30 - 44, { fill: "none", stroke: C.amber, width: 1.5, dash: true });
  b += D.group(D.rect(t.ax.X(2), 30, t.ax.X(3) - t.ax.X(2), 250 - 30 - 44, { fill: "none", stroke: C.amber, width: 1.5, dash: true }), { translate: [0, 260] });
  b += lab(p.ax.X(2) + 6, 60, "Front passes", { anchor: "start", size: 12, fill: C.amber });
  b += D.group(lab(t.ax.X(3) + 4, 70, "Fall of 12 °C", { anchor: "start", size: 12, fill: C.red }), { translate: [0, 260] });
  b += lab(p.ax.X(3) + 14, p.ax.Y(1003), "Rise of 10 hPa", { anchor: "start", size: 12, fill: C.blue }).replace("", "");
  await make("cold-front-passage-graph", w, h, b,
    "Passage of a cold front at a station: pressure falls to a minimum of 1004 hPa at 12:00 then rises 10 hPa to 1014 hPa by 18:00, while temperature falls 12 degrees C from 27 at 12:00 to 15 at 18:00, most of it between 12:00 and 15:00 when the front passes.",
    "Figure: pressure and temperature readings during the passage of a cold front (data from the worked example)",
    "atmos/air-masses-pressure-systems", "Passage of a cold front");
}

// ---------- 6. Fronts in cross-section
{
  const w = 580, h = 330;
  const g = 270;
  let b = "";
  b += D.rect(10, 20, 560, 250, { fill: "#f8f6f2", stroke: C.grid, width: 1 });
  // cold front: wedge of cold air behind (left)
  b += D.polyline([[10, g], [250, g], [160, 70], [10, 70]], { fill: C.fillBlue, stroke: C.blue, width: 2.4, close: true });
  // warm front: cold air ahead (right) under gentle slope
  b += D.polyline([[570, g], [380, g], [570, 150]], { fill: C.fillBlue, stroke: C.blue, width: 2.4, close: true });
  b += D.rect(10, g, 560, 16, { fill: "#e9d5b8", stroke: C.ink, width: 1.5 });
  const cloud = (x, y, s = 1) => D.circle(x, y, 14 * s, { fill: "#fff", stroke: C.muted, width: 1.5 }) + D.circle(x + 16 * s, y + 4 * s, 12 * s, { fill: "#fff", stroke: C.muted, width: 1.5 }) + D.circle(x - 16 * s, y + 4 * s, 12 * s, { fill: "#fff", stroke: C.muted, width: 1.5 });
  b += cloud(238, 130, 1.2) + cloud(225, 175, 1.2) + cloud(205, 100, 1.1);
  b += cloud(440, 220, 0.9) + cloud(480, 195, 0.9) + cloud(520, 170, 0.9);
  for (const x of [215, 235, 255, 275, 295]) b += D.arrow(x, 210, x - 6, 262, { stroke: C.blue, width: 1.6 });
  for (const x of [395, 415, 435, 455]) b += D.arrow(x, 245, x - 3, 266, { stroke: C.blue, width: 1.6 });
  b += D.text(100, 160, "Cold air", { anchor: "middle", size: 15, weight: 700, fill: C.blue });
  b += D.text(530, 240, "Cold air", { anchor: "middle", size: 15, weight: 700, fill: C.blue });
  b += D.text(330, 92, "Warm air (warm sector)", { anchor: "middle", size: 15, weight: 700, fill: C.amber });
  b += D.arrow(330, 190, 300, 120, { stroke: C.amber, width: 2.2 }).replace("", "") ;
  b += lab(250, 52, "Cold front: steep, tall cloud,", { anchor: "middle", size: 12 }) + lab(250, 72, "heavy showers, then cold", { anchor: "middle", size: 12 });
  b += lab(480, 118, "Warm front: gentle slope,", { anchor: "middle", size: 12 }) + lab(480, 138, "thickening cloud, steady rain", { anchor: "middle", size: 12 });
  b += D.arrow(30, 302, 120, 302, { stroke: C.ink, width: 2 }) + T(130, 307, "Depression moves west to east (southern hemisphere)");
  await make("fronts-cross-section", w, h, b,
    "Cross-section of a depression: a cold front undercuts the warm air steeply, lifting it into tall cloud with heavy showers, while at the warm front warm air rises gently over cold air ahead, giving thickening cloud and steady rain.",
    "Figure: a cold front and a warm front in cross-section (schematic)",
    "atmos/air-masses-pressure-systems", "## Cyclones (depressions)");
}
