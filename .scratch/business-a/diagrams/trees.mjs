// Decision trees (strategy/decision-trees.md): Tendai's poultry options and the mushroom pilot.
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, place } from "./lib.mjs";

const money = (v) => "US$" + v.toLocaleString("en-GB");
const sq = (cx, cy) => D.rect(cx - 13, cy - 13, 26, 26, { fill: C.fillAmber, stroke: C.ink, width: 2 });
const ci = (cx, cy) => D.circle(cx, cy, 13, { fill: C.fillBlue, stroke: C.ink, width: 2 });
const br = (pts, o = {}) => D.polyline(pts, { stroke: o.stroke ?? C.axis, width: o.width ?? 2 });

// ---- 1. Tendai's tree (values computed) ----
{
  const p = 0.6, q = 0.4;
  const opts = [
    { n: "A: build", cost: 30000, hi: 70000, lo: 35000, y: 72 },
    { n: "B: upgrade", cost: 10000, hi: 40000, lo: 22000, y: 214 },
  ];
  for (const o of opts) { o.ev = p * o.hi + q * o.lo; o.net = o.ev - o.cost; }
  if (opts[0].ev !== 56000 || opts[0].net !== 26000 || Math.abs(opts[1].ev - 32800) > 1e-6 || Math.abs(opts[1].net - 22800) > 1e-6) throw new Error("tree arithmetic");
  const W = 640, H = 330, dx = 33, dy = 160, cx = 260;
  let b = sq(dx, dy);
  b += D.text(dx, dy + 34, "Decision", { anchor: "middle", size: 12, fill: C.muted });
  for (const o of opts) {
    b += br([[dx + 13, dy], [90, dy], [90, o.y], [cx - 13, o.y]], { stroke: o.net === Math.max(...opts.map((z) => z.net)) ? C.green : C.axis, width: 2.6 });
    b += D.text(100, o.y - 24, o.n, { size: 13, weight: 700 }) + D.text(100, o.y - 8, `cost ${money(o.cost)}`, { size: 13, fill: C.red });
    b += ci(cx, o.y);
    b += br([[cx + 13, o.y - 3], [350, o.y - 34]]) + br([[cx + 13, o.y + 3], [350, o.y + 34]]);
    b += D.text(300, o.y - 30, String(p), { size: 13, weight: 700, fill: C.blue }) + D.text(300, o.y + 44, String(q), { size: 13, weight: 700, fill: C.blue });
    b += D.text(358, o.y - 30, money(o.hi), { size: 13 }) + D.text(358, o.y + 38, money(o.lo), { size: 13 });
    const best = o.net === Math.max(...opts.map((z) => z.net));
    b += D.rect(448, o.y - 36, 184, 78, { fill: best ? C.fillGreen : C.fillGrey, stroke: best ? C.green : C.grid, width: best ? 2 : 1.4, r: 6 });
    b += D.text(456, o.y - 16, `EV ${money(o.ev)}`, { size: 13 }) + D.text(456, o.y + 2, `less cost ${money(o.cost)}`, { size: 13 }) + D.text(456, o.y + 22, `Net EV ${money(o.net)}`, { size: 13, weight: 700 });
  }
  const cy = 300;
  b += br([[dx + 13, dy], [90, dy], [90, cy], [350, cy]]) + D.text(100, cy - 8, "C: do nothing (cost US$0)", { size: 13, weight: 700 }) + D.text(358, cy + 5, "US$0 extra: net EV US$0", { size: 13 });
  b += D.text(cx, 20, "Chance: strong demand 0.6, weak demand 0.4", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Decision tree for Tendai: build (cost US$30,000) gives US$70,000 with probability 0.6 or US$35,000 with 0.4, expected value US$56,000 and net US$26,000; upgrade (cost US$10,000) gives US$40,000 or US$22,000, expected value US$32,800 and net US$22,800; doing nothing gives US$0. Building has the highest net expected value.";
  const cap = "Figure: Tendai's decision tree with probabilities, expected values and net expected values";
  await D.figure(FAM, "decision-tree-poultry", D.svg(W, H, b), { alt, caption: cap });
  place(L("strategy/decision-trees"), "4. Check the worst case:", D.md("decision-tree-poultry", alt, cap), { block: true });
}

// ---- 2. Two-stage tree (pilot then roll-out) ----
{
  const ps = 0.6, pf = 0.4, pr = 0.7, pq = 0.3;
  const roll = pr * 60000 + pq * 25000, rollNet = roll - 20000, small = 12000;
  const choice = Math.max(rollNet, small);
  const pilot = ps * choice + pf * 5000, pilotNet = pilot - 5000;
  if (roll !== 49500 || rollNet !== 29500 || Math.abs(pilot - 19700) > 1e-6 || Math.abs(pilotNet - 14700) > 1e-6) throw new Error("tree2 arithmetic");
  const W = 640, H = 350;
  let b = sq(30, 190);
  b += D.text(30, 224, "Decision 1", { anchor: "middle", size: 12, fill: C.muted });
  // pilot
  b += br([[43, 190], [70, 190], [70, 150], [137, 150]], { stroke: C.green, width: 2.6 });
  b += D.text(74, 126, "Pilot", { size: 13, weight: 700 }) + D.text(74, 142, "-5,000", { size: 13, fill: C.red });
  b += ci(150, 150);
  b += D.text(150, 188, `EV ${pilot.toLocaleString("en-GB")}`, { anchor: "middle", size: 12 }) + D.text(150, 203, `net ${pilotNet.toLocaleString("en-GB")}`, { anchor: "middle", size: 12, weight: 700 });
  // success -> decision 2
  b += br([[162, 143], [300, 95 + 0]].slice(0, 1).concat([[250, 95], [287, 95]]), { stroke: C.green, width: 2.6 });
  b += D.text(188, 112, "success 0.6", { size: 12, weight: 700, fill: C.blue });
  b += br([[162, 157], [250, 220], [440, 220]]) + D.text(190, 232, "fail 0.4", { size: 12, weight: 700, fill: C.blue }) + D.text(448, 225, "US$5,000", { size: 13 });
  b += sq(300, 95);
  b += D.text(300, 128, "Decision 2", { anchor: "middle", size: 12, fill: C.muted });
  // roll-out
  b += br([[313, 95], [340, 95], [340, 52], [407, 52]], { stroke: C.green, width: 2.6 });
  b += D.text(344, 28, "Roll out", { size: 13, weight: 700 }) + D.text(344, 44, "-20,000", { size: 13, fill: C.red }).replace("", "");
  b += ci(420, 52);
  b += br([[432, 46], [500, 24]]) + br([[432, 58], [500, 80]]);
  b += D.text(470, 25, "0.7", { size: 12, weight: 700, fill: C.blue }) + D.text(470, 90, "0.3", { size: 12, weight: 700, fill: C.blue });
  b += D.text(508, 28, "US$60,000", { size: 13 }) + D.text(508, 84, "US$25,000", { size: 13 });
  b += D.text(420, 86, "", {});
  b += D.rect(500, 36, 134, 34, { fill: "none", stroke: "none" });
  b += D.text(420, 100, `EV ${roll.toLocaleString("en-GB")}`, { anchor: "middle", size: 12 }) + D.text(420, 115, `net ${rollNet.toLocaleString("en-GB")}`, { anchor: "middle", size: 12, weight: 700 });
  // stay small
  b += br([[313, 95], [340, 95], [340, 150], [440, 150]]) + D.text(344, 168, "Stay small", { size: 13, weight: 700 }).replace("", "") + D.text(448, 155, "US$12,000", { size: 13 });
  // do nothing
  b += br([[43, 190], [70, 190], [70, 300], [440, 300]]) + D.text(80, 292, "Do nothing", { size: 13, weight: 700 }) + D.text(448, 305, "US$0", { size: 13 });
  const alt = `Two-stage decision tree for the mushroom grower: after a successful pilot (probability 0.6) rolling out has expected value US$49,500 and net US$29,500, better than staying small at US$12,000; a failed pilot (0.4) gives US$5,000; the pilot has expected value US$19,700 and net US$14,700, which beats doing nothing (US$0).`;
  const cap = "Figure: the pilot-then-roll-out tree, solved from the right-hand decision first";
  await D.figure(FAM, "decision-tree-pilot", D.svg(W, H, b), { alt, caption: cap });
  place(L("strategy/decision-trees"), "4. The pilot beats doing nothing", D.md("decision-tree-pilot", alt, cap), { block: true });
}
