// geography-o second pass: ecosystems diagrams. Run from repo root: node .scratch/geography-o/diagrams/ecosystems2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, lab, fig, poly } from "./kit2.mjs";

// ---------- 1. Pyramid of energy (ecosystems/components.md): 30,000 units in the grass, 10 % passed on
{
  const levels = ["Grass", "Grasshopper", "Lizard", "Hawk"]; // producer, primary, secondary, tertiary consumers
  const roles = ["Producer (level 1)", "Primary consumer (level 2)", "Secondary consumer (level 3)", "Tertiary consumer (level 4)"];
  const cx = 235;
  let e = 30000;
  const energy = levels.map(() => { const v = e; e = Math.round(e * 0.1); return v; }); // 30000, 3000, 300, 30
  const fills = [C.fillGreen, "#fbe3c4", C.fillAmber, "#f6c691"];
  let b = D.text(280, 24, "Energy stored (units a year); only about 10 % passes to the next level", { anchor: "middle", size: 13.5, weight: 600 });
  const baseW = 340, step = 70, h = 62, y0 = 40;
  levels.forEach((name, i) => {
    const row = 3 - i; // level 1 at the bottom
    const w = baseW - i * step, y = y0 + row * (h + 4);
    b += D.rect(cx - w / 2, y, w, h, { fill: fills[i], stroke: C.axis, width: 1.8 });
    b += D.text(cx, y + 26, `${energy[i].toLocaleString("en-GB")} units`, { anchor: "middle", weight: 700, size: 15 });
    b += D.text(cx, y + 46, name, { anchor: "middle", size: 13.5 });
    b += D.text(418, y + 30, roles[i].replace(" (", "\n("), { size: 12.5, fill: C.muted });
    if (i > 0) b += D.text(418, y + h + 3, "× 0.1", { size: 12.5, fill: C.red, weight: 600 }).replace("<text", "<text");
  });
  b += D.text(280, 330, "Not to scale: each level holds one tenth of the energy of the level below.", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("energy-pyramid-food-chain",
    D.svg(560, 346, b),
    `Pyramid of energy for the food chain grass, grasshopper, lizard, hawk: the grass stores ${energy[0].toLocaleString("en-GB")} units a year and each level passes on only about 10 %, giving ${energy[1].toLocaleString("en-GB")}, ${energy[2]} and ${energy[3]} units, which is why food chains are short.`,
    "Figure: a pyramid of energy (fictional data) for a four-level food chain",
    "ecosystems/components", "As a rough rule, only **about 10%**");
}

// ---------- 2. Nutrient cycle: three stores, three ecosystems (ecosystems/nutrient-cycles.md)
{
  const cases = [
    { t: "Tropical rainforest", r: { bio: 38, lit: 11, soil: 14 }, note: "Largest store: biomass" },
    { t: "Savanna", r: { bio: 22, lit: 20, soil: 36 }, note: "Largest store: soil" },
    { t: "Hot desert", r: { bio: 10, lit: 8, soil: 11 }, note: "All stores small" },
  ];
  let b = "";
  const W = 186;
  cases.forEach((c, k) => {
    const ox = 4 + k * (W + 4), top = { x: ox + W / 2, y: 92 }, left = { x: ox + 42, y: 196 }, right = { x: ox + W - 42, y: 196 };
    b += D.rect(ox, 6, W, 268, { stroke: C.grid, width: 1.5 }) + D.text(ox + W / 2, 28, c.t, { anchor: "middle", weight: 700, size: 14 });
    const link = (a, ra, z, rz) => {
      const dx = z.x - a.x, dy = z.y - a.y, d = Math.hypot(dx, dy);
      return D.arrow(a.x + (dx / d) * (ra + 4), a.y + (dy / d) * (ra + 4), z.x - (dx / d) * (rz + 8), z.y - (dy / d) * (rz + 8), { stroke: C.muted, width: 2 });
    };
    const flow = { bio: c.r.bio / 12 + 1, lit: c.r.lit / 12 + 1, soil: c.r.soil / 12 + 1 };
    b += link(top, c.r.bio, left, c.r.lit) + link(left, c.r.lit, right, c.r.soil) + link(right, c.r.soil, top, c.r.bio);
    b += D.circle(top.x, top.y, c.r.bio, { fill: C.fillGreen, stroke: C.green, width: 2 }) + D.circle(left.x, left.y, c.r.lit, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + D.circle(right.x, right.y, c.r.soil, { fill: "#e9d5b8", stroke: "#8a6a3b", width: 2 });
    b += D.text(top.x, top.y - c.r.bio - 6, "Biomass", { anchor: "middle", size: 12.5 }) + D.text(left.x, left.y + c.r.lit + 16, "Litter", { anchor: "middle", size: 12.5 }) + D.text(right.x, right.y + c.r.soil + 16, "Soil", { anchor: "middle", size: 12.5 });
    b += D.text(ox + W / 2, 262, c.note, { anchor: "middle", size: 12.5, fill: C.muted, weight: 600 });
  });
  b += D.text(280, 296, "Arrows: biomass to litter = leaf fall; litter to soil = decomposition; soil to biomass = uptake.", { anchor: "middle", size: 12.5 });
  b += D.text(280, 314, "Circle size shows the size of the store (schematic, no units).", { anchor: "middle", size: 12.5, fill: C.muted });
  await fig("nutrient-cycle-three-stores",
    D.svg(574, 326, b),
    "Three-store nutrient cycle (biomass, litter, soil) for three ecosystems: in the tropical rainforest the biomass store is largest, in the savanna the soil store is largest, and in the hot desert all three stores are small.",
    "Figure: the nutrient cycle in a rainforest, a savanna and a hot desert (circle size shows store size)",
    "ecosystems/nutrient-cycles", "The size of the circles and arrows changes from one ecosystem to another.");
}

// ---------- 3. Nitrogen cycle (ecosystems/nutrient-cycles.md)
{
  const N = (x, y, w, h, s, fill) => D.node(x, y, w, h, s, { fill, size: 13.5 });
  let b = N(170, 14, 220, 46, "Nitrogen gas in the air\n(78 % of air)", C.fillBlue);
  b += N(10, 150, 150, 46, "Plants\n(proteins)", C.fillGreen) + N(10, 270, 150, 46, "Animals", C.fillGreen);
  b += N(400, 150, 150, 46, "Nitrates in the soil", "#e9d5b8") + N(400, 270, 150, 46, "Ammonium in the soil", "#e9d5b8");
  b += N(170, 330, 220, 46, "Dead matter and waste", C.fillGrey);
  const ar = (x1, y1, x2, y2, o = {}) => D.arrow(x1, y1, x2, y2, { stroke: o.stroke ?? C.ink, width: 2 });
  b += ar(320, 62, 425, 148, { stroke: C.blue }) + lab(318, 104, "1 Fixation", { anchor: "end", stroke: C.blue, fill: C.blue }) + D.text(318, 122, "(legume bacteria,\nlightning, fertiliser)", { size: 12.5, fill: C.blue, anchor: "end" });
  b += ar(398, 173, 162, 173) + lab(236, 160, "2 Uptake by roots", {});
  b += ar(85, 198, 85, 268) + lab(92, 238, "3 Feeding", {});
  b += ar(155, 196, 250, 328) + ar(160, 300, 215, 330);
  b += lab(212, 266, "death, waste", { anchor: "start", fill: C.muted });
  b += ar(388, 356, 440, 318) + lab(300, 404, "4 Decomposition (ammonification)", { anchor: "middle" });
  b += ar(475, 268, 475, 198) + lab(464, 238, "5 Nitrification", { anchor: "end" });
  b += D.path_("M495,148 C 505,90 470,48 392,44", { stroke: C.red, width: 2, arrow: true }) + D.text(556, 22, "6 Denitrification", { anchor: "end", size: 13.5, fill: C.red, weight: 600 }) + D.text(556, 40, "(waterlogged soil)", { size: 13, fill: C.red, anchor: "end" });
  await fig("nitrogen-cycle",
    D.svg(560, 410, b),
    "Nitrogen cycle in six steps: fixation turns nitrogen gas into nitrates (legume bacteria, lightning, fertiliser), plants take up nitrates, animals eat plants, decomposers release ammonium from dead matter, nitrification makes nitrates again, and denitrification in waterlogged soil returns nitrogen gas to the air.",
    "Figure: the nitrogen cycle (steps 1 to 6 as in the lesson)",
    "ecosystems/nutrient-cycles", "6. **Denitrification:**");
}

// ---------- 4. Antarctic marine food web (ecosystems/antarctic.md)
{
  const rows = [
    { y: 18, label: "Higher consumers", items: [["Leopard seal", 40], ["Emperor penguin", 160], ["Weddell seal", 290], ["Killer whale", 410]] },
    { y: 118, label: "Secondary consumers", items: [["Baleen whales", 8], ["Crabeater seal", 138], ["Adélie penguin", 268], ["Fish and squid", 398]] },
    { y: 218, label: "Primary consumer", items: [["Krill", 235]] },
    { y: 318, label: "Producers", items: [["Phytoplankton", 130], ["Ice algae", 330]] },
  ];
  const W = 118, H = 44, pos = {};
  let b = "";
  const fills = [C.fillAmber, "#fbe3c4", C.fillBlue, C.fillGreen];
  rows.forEach((r, i) => r.items.forEach(([n, x]) => { pos[n] = { x, y: r.y, w: W, cx: x + W / 2 }; }));
  const link = (from, to) => { const a = pos[from], z = pos[to]; b += D.arrow(a.cx, a.y, z.cx, z.y + H + 2, { stroke: C.muted, width: 1.6 }); };
  // arrows point from food to feeder (direction of energy flow)
  link("Phytoplankton", "Krill"); link("Ice algae", "Krill");
  for (const s of ["Baleen whales", "Crabeater seal", "Adélie penguin", "Fish and squid"]) link("Krill", s);
  link("Fish and squid", "Emperor penguin"); link("Fish and squid", "Weddell seal"); link("Crabeater seal", "Leopard seal"); link("Adélie penguin", "Leopard seal"); link("Crabeater seal", "Killer whale"); link("Adélie penguin", "Killer whale");
  rows.forEach((r, i) => r.items.forEach(([n, x]) => { b += D.node(x, r.y, W, H, n.replace(" ", "\n"), { fill: fills[3 - i === 3 ? 3 : i === 0 ? 0 : i === 1 ? 1 : i === 2 ? 2 : 3], size: 13 }); }));
  rows.forEach((r) => (b += D.text(6, r.y - 5, r.label, { size: 12, fill: C.muted, weight: 600 })));
  b += D.text(556, 392, "Arrows point from food to feeder (energy flow).", { anchor: "end", size: 12, fill: C.muted });
  await fig("antarctic-food-web",
    D.svg(560, 400, b),
    "Antarctic marine food web: phytoplankton and ice algae feed krill, and krill feed baleen whales, crabeater seals, Adélie penguins and fish; leopard seals, emperor penguins, Weddell seals and killer whales feed higher up, so krill is the keystone species.",
    "Figure: a simplified Antarctic marine food web with krill at the centre",
    "ecosystems/antarctic", "Krill is the **keystone species**");
}
