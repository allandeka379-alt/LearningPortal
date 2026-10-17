// agriculture-o crop protection and drainage diagrams. Run: node .scratch/agriculture-o/diagrams/protection.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);

// ---------------------------------------------------------------- complete vs incomplete metamorphosis
{
  const W = 640, H = 380;
  let b = "";
  const nw = 128, nh = 56;
  const dmg = "#fbd9d5";
  // complete: four stages in a ring
  b += D.text(10, 22, "Complete: fall armyworm (moth)", { size: 15, weight: 700 });
  const pw = 120;
  const stages = [["Egg\nmass on a leaf", C.fillGrey], ["Larva\neats the funnel", dmg], ["Pupa\nin the soil", C.fillAmber], ["Adult moth\nflies at night", C.fillBlue]];
  const p1 = [[100, 40], [208, 140], [100, 240], [-8, 140]].map(([x, y]) => [x + 14, y + 10]);
  stages.forEach(([t, f], i) => { b += D.node(p1[i][0], p1[i][1], pw, nh, t, { fill: f, size: 13 }); });
  b += D.arrow(p1[0][0] + pw, p1[0][1] + nh / 2 + 6, p1[1][0] + pw / 2 + 10, p1[1][1], { width: 2 });
  b += D.arrow(p1[1][0] + pw / 2, p1[1][1] + nh, p1[2][0] + pw, p1[2][1] + nh / 2 - 6, { width: 2 });
  b += D.arrow(p1[2][0], p1[2][1] + nh / 2 - 4, p1[3][0] + pw / 2, p1[3][1] + nh, { width: 2 });
  b += D.arrow(p1[3][0] + pw / 2, p1[3][1], p1[0][0], p1[0][1] + nh / 2 + 6, { width: 2 });
  b += D.text(p1[0][0] + 20, 330, "Pink box = the stage that does most damage.", { size: 12, fill: C.muted });
  b += D.text(10, 350, "Pupa is a resting stage: no feeding.", { size: 12, fill: C.muted });
  // incomplete: three stages
  const ox = 336;
  b += D.text(ox, 22, "Incomplete: locust", { size: 15, weight: 700 });
  const p2 = [[ox + 90, 60], [ox + 170, 170], [ox + 10, 170]];
  const st2 = [["Egg pod\nin the soil", C.fillGrey], ["Adult\nswarms strip crops", dmg], ["Nymph (hopper)\nwingless, moults", dmg]];
  st2.forEach(([t, f], i) => { b += D.node(p2[i][0], p2[i][1], pw + 10, nh, t, { fill: f, size: 13 }); });
  b += D.arrow(p2[0][0] + 20, p2[0][1] + nh, p2[2][0] + 60, p2[2][1], { width: 2 });
  b += D.arrow(p2[2][0] + pw + 10, p2[2][1] + nh / 2, p2[1][0], p2[1][1] + nh / 2, { width: 2 });
  b += D.arrow(p2[1][0] + 100, p2[1][1], p2[0][0] + pw + 10 - 18, p2[0][1] + nh, { width: 2 });
  b += D.text(ox, 270, "No pupa: the nymph looks like a small,", { size: 13 }) + D.text(ox, 288, "wingless adult and feeds on the same crops.", { size: 13 });
  const alt = "Life cycles compared: the fall armyworm has complete metamorphosis (egg mass on a leaf, larva that eats the funnel and does the damage, pupa resting in the soil, adult moth) while the locust has incomplete metamorphosis (egg pod in the soil, wingless nymph or hopper, adult), with no pupa and damage by both nymphs and adults.";
  const cap = "Figure: complete metamorphosis (fall armyworm) and incomplete metamorphosis (locust)";
  await D.figure(FAMILY, "pest-life-cycles-compared", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/protection/pests.md`, "| Examples | Moths (stalk borer", D.md("pest-life-cycles-compared", alt, cap));
}

// ---------------------------------------------------------------- storm water balance (worked example)
{
  const rain = 60, runoff = 12, evap = 6, stored = 22;
  const drained = rain - runoff - evap - stored;
  if (drained !== 20) throw new Error("water balance");
  const svg = D.barChart([
    { label: "Rain", value: rain, fill: C.blue },
    { label: "Runoff", value: runoff, fill: C.red },
    { label: "Evaporation", value: evap, fill: C.amber },
    { label: "Stored in soil", value: stored, fill: C.green },
    { label: "Drained below roots", value: drained, fill: C.teal },
  ], { w: 620, h: 370, yMax: 70, yLabel: "Water depth (mm)", yTicks: 10 });
  const alt = "Bar chart of a 60 mm storm: 12 mm runs off, 6 mm evaporates, 22 mm is stored in the soil to field capacity and 20 mm drains below the root zone, and 12 + 6 + 22 + 20 equals the 60 mm of rain.";
  const cap = "Figure: where the 60 mm of rain goes (12 + 6 + 22 + 20 = 60 mm)";
  await D.figure(FAMILY, "storm-water-balance-bars", svg, { alt, caption: cap });
  insertAfterBlock(`${L}/water/drainage-leaching.md`, "A soil water balance after a storm", D.md("storm-water-balance-bars", alt, cap));
}

// ---------------------------------------------------------------- herringbone and gridiron drain layouts (plan view)
{
  const W = 640, H = 330;
  let b = "";
  const drain = { stroke: C.blue, width: 3 };
  const panel = (x0, title, kind) => {
    let o = D.text(x0, 22, title, { size: 15, weight: 700 });
    const w = 260, h = 230, y0 = 40;
    o += D.rect(x0, y0, w, h, { fill: "#f5efe0", stroke: C.axis, width: 1.6 });
    if (kind === "herring") {
      const mx = x0 + w / 2;
      o += D.line(mx, y0 + 8, mx, y0 + h, { ...drain, width: 5 });
      for (let k = 0; k < 6; k += 1) {
        const y = y0 + 30 + k * 34;
        o += D.line(mx, y + 20, x0 + 14, y - 10, drain) + D.line(mx, y + 20, x0 + w - 14, y - 10, drain);
      }
      o += D.text(mx + 8, y0 + 20, "main drain", { size: 12, fill: C.blue });
    } else {
      const my = y0 + h - 22;
      o += D.line(x0, my, x0 + w + 14, my, { ...drain, width: 5 });
      for (let k = 0; k < 5; k += 1) { const x = x0 + 30 + k * 52; o += D.line(x, y0 + 12, x, my, drain); }
      o += D.text(x0 + 8, my + 16, "main drain", { size: 12, fill: C.blue });
    }
    return o;
  };
  b += panel(10, "Herringbone", "herring") + panel(340, "Gridiron", "grid");
  b += D.arrow(145, 270, 145, 306, { stroke: C.blue, width: 2 }) + D.text(155, 300, "outlet", { size: 13, fill: C.blue });
  b += D.arrow(612, 248, 636, 248, { stroke: C.blue, width: 2 }) + D.text(598, 236, "outlet", { size: 13, fill: C.blue });
  b += D.text(10, 324, "Blue lines are the drains: side drains join the main drain at an angle (herringbone) or run parallel (gridiron).", { size: 12, fill: C.muted });
  const alt = "Plan views of field drainage layouts: a herringbone pattern with side drains joining a central main drain at an angle, and a gridiron pattern of parallel drains running into a main drain that leads to the outlet.";
  const cap = "Figure: herringbone and gridiron patterns for field drains (plan view)";
  await D.figure(FAMILY, "field-drain-layouts", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/water/drainage-leaching.md`, "Field drains are often laid in a **herringbone** pattern", D.md("field-drain-layouts", alt, cap));
}
console.log("protection done");
