// geography-o second pass: weather diagrams. Run from repo root: node .scratch/geography-o/diagrams/weather2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, cloud, rain, sun, poly, SOIL, SEA, GRASS, ROCK, DCLOUD } from "./kit2.mjs";

// ---------- 1. Stevenson screen (weather/elements-instruments.md)
{
  const gy = 372, per = 120; // ground y, pixels per metre (1.2 m thermometer height = 144 px)
  const th = gy - 1.2 * per;
  let b = D.rect(0, gy, 560, 28, { fill: GRASS, stroke: "none" }) + D.line(0, gy, 560, gy, { stroke: C.green, width: 2 });
  b += D.rect(214, th + 46, 10, gy - th - 46, { fill: "#f4f1ec", stroke: C.axis, width: 1.6 }) + D.rect(336, th + 46, 10, gy - th - 46, { fill: "#f4f1ec", stroke: C.axis, width: 1.6 });
  b += D.rect(190, th - 46, 180, 92, { fill: "#ffffff", stroke: C.axis, width: 2.4 });
  for (let i = 0; i < 8; i++) b += D.line(196, th - 36 + i * 11, 364, th - 36 + i * 11 + 5, { stroke: C.muted, width: 1.6 });
  b += poly([[182, th - 62], [378, th - 62], [374, th - 70], [186, th - 70]], { fill: "#ffffff", width: 2 });
  b += poly([[190, th - 46], [370, th - 46], [372, th - 52], [188, th - 52]], { fill: "#f4f1ec", width: 1.6 });
  b += D.rect(246, th - 36, 68, 74, { fill: "#ffffff", stroke: C.axis, width: 1.6 }) + D.circle(305, th, 3, { fill: C.ink });
  b += D.line(280, th - 14, 280, th + 20, { stroke: C.red, width: 3 }) + D.circle(280, th + 22, 4, { fill: C.red, stroke: C.red, width: 1 });
  b += D.line(112, gy, 112, th, { stroke: C.axis, width: 1.6, arrow: true, arrowStart: true }) + D.line(106, th, 280, th, { stroke: C.muted, width: 1.2, dash: true });
  b += lab(104, (gy + th) / 2 + 4, "1.2 m", { anchor: "end" });
  b += D.line(184, th - 66, 120, 40, { stroke: C.muted, width: 1.2 }) + lab(8, 44, "Double roof: insulates");
  b += D.line(192, th - 20, 100, 98, { stroke: C.muted, width: 1.2 }) + lab(8, 102, "White paint: reflects sun");
  b += D.line(368, th - 10, 420, 90, { stroke: C.muted, width: 1.2 }) + lab(330, 84, "Louvres: air flows, sun kept out");
  b += D.line(285, th + 10, 420, th + 80, { stroke: C.muted, width: 1.2 }) + lab(400, th + 98, "Thermometers inside");
  b += D.line(344, gy - 40, 400, gy - 20, { stroke: C.muted, width: 1.2 }) + lab(360, gy - 6, "Legs: clear of hot ground");
  b += D.text(280, 22, "Door opens to the south (away from the sun)", { anchor: "middle", size: 13, fill: C.amber, weight: 600 });
  await fig("stevenson-screen",
    D.svg(560, 400, b),
    "Stevenson screen: a white, louvred wooden box with a double roof on legs so that the thermometers sit 1.2 m above short grass, in shade with free air flow; the door opens to the south so the sun never shines on the thermometers when it is opened.",
    "Figure: a Stevenson screen and the reason for each feature",
    "weather/elements-instruments", "## The weather station and the Stevenson screen");
}

// ---------- 2. Rain gauge (weather/elements-instruments.md)
{
  const gy = 230;
  let b = D.rect(0, gy, 330, 150, { fill: SOIL, stroke: "none" }) + D.line(0, gy, 330, gy, { stroke: C.green, width: 2.4 });
  const cx = 150, rimY = gy - 30; // 30 cm above ground at 1 px per cm
  b += D.rect(cx - 38, rimY, 76, 150 + 30, { fill: "#f4f1ec", stroke: C.axis, width: 2 });
  b += poly([[cx - 38, rimY], [cx + 38, rimY], [cx + 8, rimY + 34], [cx - 8, rimY + 34]], { fill: C.fillBlue, width: 2 });
  b += D.rect(cx - 22, gy + 30, 44, 70, { fill: "#ffffff", stroke: C.axis, width: 1.8 }) + D.rect(cx - 20, gy + 70, 40, 28, { fill: "#a9d6e5", stroke: "none" });
  b += D.line(cx, rimY + 34, cx, gy + 30, { stroke: C.blue, width: 2, arrow: true });
  b += D.arrow(cx - 20, rimY - 28, cx - 10, rimY - 4, { stroke: C.blue, width: 1.8 }) + D.arrow(cx + 20, rimY - 32, cx + 12, rimY - 4, { stroke: C.blue, width: 1.8 });
  b += D.text(cx, rimY - 38, "rain", { anchor: "middle", fill: C.blue, size: 13 });
  b += D.line(312, gy, 312, rimY, { stroke: C.axis, width: 1.4, arrow: true, arrowStart: true }) + lab(304, gy - 8, "30 cm", { anchor: "end" });
  b += lab(8, rimY - 30, "Funnel: collects the rain") + D.line(60, rimY - 28, cx - 30, rimY + 8, { stroke: C.muted, width: 1.2 });
  b += lab(8, gy + 56, "Collecting jar") + D.line(90, gy + 52, cx - 22, gy + 62, { stroke: C.muted, width: 1.2 });
  b += lab(196, gy + 140, "Can sunk in the ground");
  const mx = 440, my = 60, mh = 220, level = 0.45;
  b += D.rect(mx - 22, my, 44, mh, { fill: "#ffffff", stroke: C.axis, width: 2 });
  b += D.rect(mx - 20, my + mh * (1 - level), 40, mh * level - 2, { fill: "#a9d6e5", stroke: "none" });
  for (let i = 0; i <= 20; i += 1) b += D.line(mx + 22, my + mh - (i * mh) / 20, mx + (i % 5 === 0 ? 8 : 14), my + mh - (i * mh) / 20, { stroke: C.axis, width: 1.2 });
  b += D.text(mx + 28, my + mh * (1 - level) + 5, "reading", { size: 13, fill: C.blue }) + D.line(mx + 22, my + mh * (1 - level), mx + 8, my + mh * (1 - level), { stroke: C.blue, width: 2 });
  b += D.text(mx, my - 14, "Measuring cylinder (mm)", { anchor: "middle", weight: 600, size: 14 });
  b += D.text(mx, my + mh + 26, "Read at eye level,", { anchor: "middle", size: 13 }) + D.text(mx, my + mh + 43, "same time every day", { anchor: "middle", size: 13 });
  b += D.path_(`M${cx + 44},${gy + 60} C 260,${gy + 80} 300,${my + 200} ${mx - 28},${my + 190}`, { stroke: C.amber, width: 1.8, arrow: true }) + D.text(222, gy + 96, "pour the water", { size: 13, fill: C.amber });
  await fig("rain-gauge-and-cylinder",
    D.svg(560, 400, b),
    "Rain gauge: rain enters a funnel set with its rim 30 cm above the ground, collects in the jar inside a can sunk in the ground, and is poured into a measuring cylinder read in millimetres at eye level at the same time each day.",
    "Figure: a rain gauge and its measuring cylinder",
    "weather/elements-instruments", "### Rainfall");
}

// ---------- 3. Condensation level (weather/precipitation.md): 28 C at ground, dew point 18 C
{
  const T0 = 28, DP = 18, dryRate = 1, satRate = 0.5; // degrees C per 100 m
  const cloudBase = ((T0 - DP) / dryRate) * 100; // 1000 m
  const top = 1600, Ttop = DP - satRate * ((top - cloudBase) / 100); // 15 C
  const ax = D.axes({ x: [10, 30], y: [0, 1800], w: 560, h: 420, xTicks: 2, yTicks: 200, xLabel: "Temperature of the rising air (°C)", yLabel: "Height above ground (m)", pad: { l: 70, r: 20, t: 36, b: 62 } });
  let b = ax.frame;
  b += D.line(ax.X(10), ax.Y(cloudBase), ax.X(30), ax.Y(cloudBase), { stroke: C.muted, width: 1.6, dash: true });
  b += D.line(ax.X(DP), ax.Y(0), ax.X(DP), ax.Y(cloudBase), { stroke: C.muted, width: 1.4, dash: true });
  b += ax.line([[T0, 0], [DP, cloudBase]], { stroke: C.amber });
  b += ax.line([[DP, cloudBase], [Ttop, top]], { stroke: C.blue });
  b += ax.point(T0, 0, { stroke: C.amber }) + ax.point(DP, cloudBase, { stroke: C.red, r: 5 });
  b += ax.tag(T0, 0, "28 °C at the ground", { dx: 0, dy: -14, anchor: "end" });
  b += ax.tag(DP, cloudBase, `Dew point 18 °C: cloud base ${cloudBase.toLocaleString("en-GB")} m`, { dx: 12, dy: -12 });
  b += ax.tag(26.5, 500, "Dry air: 1 °C per 100 m", { anchor: "middle", fill: C.amber });
  b += ax.tag(Ttop - 0.5, 1450, "Saturated: 0.5 °C per 100 m", { dx: 34, anchor: "start", fill: C.blue });
  b += cloud(ax.X(12.6), ax.Y(cloudBase) - 22, 1.1, DCLOUD);
  await fig("condensation-level-graph",
    D.svg(560, 420, b),
    `Graph of height against temperature: air at 28 °C cools at 1 °C per 100 m until it reaches its dew point of 18 °C after rising 1,000 m, where cloud forms; above the cloud base it cools more slowly, about 0.5 °C per 100 m, reaching ${Ttop} °C at ${top.toLocaleString("en-GB")} m.`,
    "Figure: cooling of rising air and the condensation level (28 °C at the ground, dew point 18 °C)",
    "weather/precipitation", "6. **Precipitation**");
}

// ---------- 4. Three types of rainfall (weather/precipitation.md)
{
  const W = 560, H = 190;
  let b = "";
  const panel = (oy, title) => D.rect(4, oy + 4, W - 8, H - 8, { stroke: C.grid, width: 1.5 }) + D.text(14, oy + 24, title, { weight: 700, size: 14 });
  { // A convectional
    const oy = 0;
    b += panel(oy, "A  Convectional rainfall") + D.rect(5, oy + 150, W - 10, 35, { fill: SOIL, stroke: "none" }) + sun(500, oy + 56, 15);
    b += D.arrow(490, oy + 76, 450, oy + 144, { stroke: C.amber, width: 1.6 }) + D.text(330, oy + 172, "ground heated by the sun", { size: 12.5, fill: C.amber });
    for (const x of [200, 260, 320]) b += D.arrow(x, oy + 146, x, oy + 124, { stroke: C.red, width: 2 });
    b += D.text(20, oy + 100, "Warm moist air rises", { size: 12.5, fill: C.red }) + D.text(20, oy + 116, "(convection currents)", { size: 12.5, fill: C.red });
    b += cloud(262, oy + 62, 1.8, DCLOUD) + rain(224, oy + 96, 6, 12, 18) + D.text(20, oy + 48, "Heavy afternoon showers", { size: 12.5, fill: C.blue });
    b += D.text(380, oy + 58, "cumulonimbus", { size: 12.5 });
  }
  { // B relief
    const oy = 190;
    b += panel(oy, "B  Relief (orographic) rainfall");
    b += D.rect(5, oy + 150, W - 10, 35, { fill: SOIL, stroke: "none" }) + D.rect(5, oy + 150, 120, 35, { fill: SEA, stroke: "none" }) + D.text(65, oy + 172, "Indian Ocean", { size: 12.5, anchor: "middle" });
    b += poly([[130, oy + 150], [290, oy + 62], [430, oy + 150]], { fill: ROCK, stroke: C.axis, width: 1.8 });
    b += D.path_(`M30,${oy + 128} C100,${oy + 126} 150,${oy + 112} 196,${oy + 104}`, { stroke: C.red, width: 2.2, arrow: true });
    b += cloud(250, oy + 60, 1, DCLOUD) + rain(236, oy + 82, 4, 11, 14);
    b += D.path_(`M330,${oy + 84} C380,${oy + 92} 410,${oy + 112} 440,${oy + 134}`, { stroke: C.amber, width: 2.2, arrow: true });
    b += D.text(18, oy + 48, "Windward: moist air rises,", { size: 12.5 }) + D.text(18, oy + 64, "cools: heavy rain", { size: 12.5 });
    b += D.text(380, oy + 66, "Leeward: air sinks", { size: 12.5 }) + D.text(380, oy + 82, "and warms: dry", { size: 12.5 }) + D.text(442, oy + 120, "RAIN SHADOW", { size: 12.5, weight: 700, fill: C.amber });
  }
  { // C frontal
    const oy = 380;
    b += panel(oy, "C  Frontal rainfall") + D.rect(5, oy + 150, W - 10, 35, { fill: SOIL, stroke: "none" });
    b += poly([[40, oy + 150], [520, oy + 150], [520, oy + 90], [440, oy + 96], [40, oy + 150]], { fill: C.fillBlue, stroke: C.blue, width: 2 });
    b += D.text(430, oy + 140, "cold, dense air", { size: 12.5, fill: C.blue, anchor: "middle" });
    b += D.path_(`M30,${oy + 110} C120,${oy + 108} 240,${oy + 80} 370,${oy + 56}`, { stroke: C.red, width: 2.2, arrow: true });
    b += cloud(390, oy + 58, 1, DCLOUD) + cloud(300, oy + 66, 0.9, "#dde3e7") + rain(268, oy + 90, 4, 14, 12);
    b += D.text(20, oy + 54, "Warm moist air rises", { size: 12.5, fill: C.red }) + D.text(20, oy + 70, "over the cold wedge", { size: 12.5, fill: C.red });
    b += D.text(20, oy + 140, "front", { size: 12.5, weight: 600 });
  }
  await fig("three-rainfall-types",
    D.svg(W, 570, b),
    "Three cross-sections of rainfall: convectional (sun heats the ground, warm air rises to cumulonimbus and afternoon storms), relief (moist air rises over the windward slope, rain falls, air sinks and warms in the rain shadow) and frontal (warm air rises over a wedge of cold air).",
    "Figure: convectional, relief and frontal rainfall compared",
    "weather/precipitation", "## Comparing the three types");
}

// ---------- 5. ITCZ and the seasons (weather/air-masses.md)
{
  const jan = -15, jul = 15; // ITCZ latitude (+N): 15 S in January, 15 N in July (the lesson's example)
  const shift = jul - jan;
  const ax = D.axes({ x: [0, 3], y: [-30, 25], w: 560, h: 430, xTicks: [], yTicks: [-30, -20, -10, 0, 10, 20], origin: false, yLabel: "Latitude", pad: { l: 90, r: 20, t: 30, b: 30 }, yFormat: (v) => (v === 0 ? "Equator" : v > 0 ? v + "° N" : -v + "° S"), arrows: false });
  let b = ax.frame;
  b += D.rect(ax.X(0.02), ax.Y(-15.5), ax.X(2.98) - ax.X(0.02), ax.Y(-22.5) - ax.Y(-15.5), { fill: C.fillGreen, stroke: C.green, width: 1.4 });
  b += D.text(ax.X(0.08), ax.Y(-22.5) + 16, "Zimbabwe: 15.5° S to 22.5° S", { size: 13, fill: C.green, weight: 600 });
  const band = (c, x0, x1, fill, stroke, t1, t2) => D.rect(ax.X(x0), ax.Y(c + 5), ax.X(x1) - ax.X(x0), ax.Y(c - 5) - ax.Y(c + 5), { fill, stroke, width: 2, r: 10 }) + D.text((ax.X(x0) + ax.X(x1)) / 2, ax.Y(c) - 2, t1, { anchor: "middle", weight: 700, size: 14 }) + D.text((ax.X(x0) + ax.X(x1)) / 2, ax.Y(c) + 15, t2, { anchor: "middle", size: 13 });
  b += band(jan, 0.1, 1.4, C.fillAmber, C.amber, "ITCZ in January", "about 15° S");
  b += band(jul, 1.6, 2.9, C.fillBlue, C.blue, "ITCZ in July", "about 15° N");
  b += D.arrow(ax.X(1.4) + 4, ax.Y(jan), ax.X(1.6) - 4, ax.Y(jul), { stroke: C.ink, width: 1.8 });
  b += lab(ax.X(1.5) + 90, ax.Y(0) - 22, `${shift}° shift`, { anchor: "middle" }) + D.text(ax.X(1.5) + 90, ax.Y(0) + 4, `${shift} × 111 km ≈ ${(shift * 111).toLocaleString("en-GB")} km`, { anchor: "middle", size: 12.5 });
  b += D.text(ax.X(0.1), ax.Y(-5.4), "Rising air, heavy rain", { size: 12.5, fill: C.amber }) + D.text(ax.X(0.1), ax.Y(-7.4), "over Zimbabwe (wet season)", { size: 12.5, fill: C.amber });
  b += D.text(ax.X(1.6), ax.Y(-27), "High pressure over Zimbabwe: dry", { size: 12.5, fill: C.blue });
  await fig("itcz-seasonal-shift",
    D.svg(560, 430, b),
    `Latitude chart: the ITCZ lies about 15° S in January, over Zimbabwe (15.5° to 22.5° S), giving the hot wet season, and about 15° N in July, giving the cool dry season; the shift is ${shift}° of latitude, about ${(shift * 111).toLocaleString("en-GB")} km.`,
    "Figure: the ITCZ follows the overhead sun between January and July",
    "weather/air-masses", "The ITCZ follows the **overhead sun**");
}
