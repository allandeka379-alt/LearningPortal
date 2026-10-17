// agriculture-o plant diagrams: seed structure, germination, leaf, flower, root hair. Run: node .scratch/agriculture-o/diagrams/plants.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });
const SOIL = "#efe2cc", BROWN = "#7a5a2f";

// ---------------------------------------------------------------- bean seed and maize grain (longitudinal sections)
{
  const W = 620, H = 320;
  let b = "";
  b += D.text(10, 24, "Bean seed (dicotyledon)", { size: 15, weight: 700 });
  const bx = 150, by = 150;
  b += D.path_(`M${bx - 80},${by} C${bx - 80},${by - 65} ${bx + 80},${by - 65} ${bx + 85},${by} C${bx + 80},${by + 62} ${bx - 70},${by + 62} ${bx - 80},${by} Z`, { fill: "#d8b98a", stroke: BROWN, width: 4 });
  b += D.path_(`M${bx - 70},${by} C${bx - 68},${by - 52} ${bx + 70},${by - 52} ${bx + 76},${by} C${bx + 70},${by + 50} ${bx - 60},${by + 50} ${bx - 70},${by} Z`, { fill: C.fillAmber, stroke: C.amber, width: 1.5 });
  b += D.line(bx - 66, by, bx + 74, by, { stroke: C.amber, width: 1.5 });
  // embryo axis: radicle (points left-down) and plumule (between cotyledons)
  b += D.polyline([[bx - 66, by + 2], [bx - 50, by + 20], [bx - 42, by + 6]], { close: true, fill: "#f4efe6", stroke: C.axis, width: 1.6 });
  b += D.path_(`M${bx - 44},${by - 2} C${bx - 30},${by - 26} ${bx - 10},${by - 26} ${bx - 2},${by - 8}`, { stroke: C.green, width: 4 });
  // hilum and micropyle on the testa
  b += D.circle(bx - 78, by - 14, 4, { fill: C.ink, stroke: C.ink, width: 1 });
  b += D.circle(bx - 80, by + 8, 2.5, { fill: "#fff", stroke: C.ink, width: 1.2 });
  b += leader(bx - 78, by - 18, 60, 66) + D.text(10, 62, "Hilum (scar)", { size: 13 });
  b += leader(bx - 80, by + 10, 52, 196) + D.text(10, 212, "Micropyle (pore:\nwater enters here)", { size: 13 });
  b += leader(bx - 52, by + 18, 80, 246) + D.text(10, 262, "Radicle (embryo root)", { size: 13 });
  b += leader(bx - 20, by - 24, 190, 50) + D.text(150, 40, "Plumule (embryo shoot)", { size: 13 });
  b += leader(bx + 40, by + 24, 200, 232) + D.text(176, 246, "Two cotyledons\n(store the food)", { size: 13 });
  b += leader(bx - 20, by + 52, 60, 288) + D.text(10, 304, "Testa (seed coat). No endosperm.", { size: 13 });

  b += D.text(330, 24, "Maize grain (monocotyledon)", { size: 15, weight: 700 });
  const mx = 390, my = 160;
  b += D.path_(`M${mx - 55},${my - 90} C${mx - 30},${my - 110} ${mx + 30},${my - 110} ${mx + 55},${my - 90} C${mx + 62},${my - 20} ${mx + 40},${my + 70} ${mx + 18},${my + 100} L${mx - 18},${my + 100} C${mx - 40},${my + 70} ${mx - 62},${my - 20} ${mx - 55},${my - 90} Z`, { fill: C.fillBlue, stroke: BROWN, width: 4 });
  b += D.path_(`M${mx - 36},${my + 8} C${mx - 40},${my + 60} ${mx - 22},${my + 84} ${mx - 6},${my + 84} C${mx + 6},${my + 60} ${mx + 4},${my + 20} ${mx - 6},${my + 4} Z`, { fill: C.fillAmber, stroke: C.amber, width: 1.8 });
  b += D.polyline([[mx - 30, my + 12], [mx - 18, my - 14], [mx - 8, my + 10]], { close: true, fill: "#e0f0d0", stroke: C.green, width: 1.8 });
  b += D.polyline([[mx - 28, my + 80], [mx - 20, my + 98], [mx - 10, my + 80]], { close: true, fill: "#f4efe6", stroke: C.axis, width: 1.6 });
  b += leader(mx + 54, my - 84, 478, 56) + D.text(480, 50, "Pericarp (fused\nwith the testa)", { size: 13 });
  b += leader(mx + 20, my - 40, 478, 110) + D.text(480, 106, "Endosperm\n(starchy food store)", { size: 13 });
  b += leader(mx - 12, my - 10, 478, 160) + D.text(480, 160, "Plumule inside\na coleoptile", { size: 13 });
  b += leader(mx - 4, my + 40, 478, 214) + D.text(480, 214, "Scutellum (the one\ncotyledon: passes\nfood to the embryo)", { size: 13 });
  b += leader(mx - 14, my + 96, 478, 290) + D.text(480, 290, "Radicle inside\na coleorhiza", { size: 13 });
  const alt = "Longitudinal sections of a bean seed and a maize grain: the bean has a testa, hilum, micropyle, two food-storing cotyledons, plumule and radicle and no endosperm; the maize grain has a pericarp fused with the testa, a large starchy endosperm, a scutellum, a plumule in a coleoptile and a radicle in a coleorhiza.";
  const cap = "Figure: sections of a bean seed and a maize grain with their parts labelled";
  await D.figure(FAMILY, "bean-maize-seed-structure", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/plants/germination.md`, "| Type of germination | Epigeal | Hypogeal |", D.md("bean-maize-seed-structure", alt, cap));
}

// ---------------------------------------------------------------- epigeal (bean) and hypogeal (maize) germination, three stages each
{
  const W = 620, H = 500;
  let b = "";
  const panel = (cx, g, kind, stage) => {
    let o = D.rect(cx - 90, g, 180, 100, { fill: SOIL, stroke: "none" }) + D.line(cx - 90, g, cx + 90, g, { stroke: BROWN, width: 2.5 });
    const sy = g + 48; // seed depth
    if (kind === "bean") {
      const seed = (y) => D.circle(cx, y, 11, { fill: C.fillAmber, stroke: BROWN, width: 2 });
      if (stage === 1) { o += D.path_(`M${cx},${sy + 10} C${cx - 4},${sy + 30} ${cx + 6},${sy + 40} ${cx},${sy + 50}`, { stroke: C.ink, width: 2.5 }) + seed(sy); }
      if (stage === 2) { o += D.path_(`M${cx},${sy + 10} L${cx},${sy + 50}`, { stroke: C.ink, width: 2.5 }) + D.path_(`M${cx - 3},${sy - 8} C${cx - 8},${g - 26} ${cx + 28},${g - 26} ${cx + 24},${sy - 8}`, { stroke: C.green, width: 5 }) + seed(sy); }
      if (stage === 3) {
        o += D.path_(`M${cx},${sy + 6} L${cx},${sy + 52}`, { stroke: C.ink, width: 2.5 }) + D.path_(`M${cx - 20},${sy + 30} L${cx},${sy + 18} L${cx + 20},${sy + 32}`, { stroke: C.ink, width: 1.5 });
        o += D.path_(`M${cx},${sy + 6} L${cx},${g - 60}`, { stroke: C.green, width: 5 });
        o += D.path_(`M${cx},${g - 60} C${cx - 36},${g - 78} ${cx - 40},${g - 52} ${cx},${g - 56}`, { fill: C.fillAmber, stroke: BROWN, width: 2 }) + D.path_(`M${cx},${g - 60} C${cx + 36},${g - 78} ${cx + 40},${g - 52} ${cx},${g - 56}`, { fill: C.fillAmber, stroke: BROWN, width: 2 });
        o += D.path_(`M${cx},${g - 62} L${cx},${g - 84}`, { stroke: C.green, width: 3 });
      }
    } else {
      const grain = (y) => D.path_(`M${cx - 9},${y - 11} L${cx + 9},${y - 11} L${cx + 6},${y + 11} L${cx - 6},${y + 11} Z`, { fill: C.fillBlue, stroke: BROWN, width: 2 });
      o += grain(sy);
      if (stage === 1) o += D.path_(`M${cx - 2},${sy + 11} C${cx - 6},${sy + 30} ${cx + 4},${sy + 38} ${cx},${sy + 48}`, { stroke: C.ink, width: 2.5 });
      if (stage === 2) { o += D.path_(`M${cx - 2},${sy + 11} L${cx - 2},${sy + 50}`, { stroke: C.ink, width: 2.5 }) + D.polyline([[cx - 5, sy - 11], [cx + 1, g - 12], [cx + 5, sy - 11]], { close: true, fill: "#e0f0d0", stroke: C.green, width: 2 }); }
      if (stage === 3) {
        o += D.path_(`M${cx - 4},${sy + 11} L${cx - 14},${sy + 48}`, { stroke: C.ink, width: 2 }) + D.path_(`M${cx},${sy + 11} L${cx},${sy + 52}`, { stroke: C.ink, width: 2 }) + D.path_(`M${cx + 4},${sy + 11} L${cx + 15},${sy + 48}`, { stroke: C.ink, width: 2 });
        o += D.path_(`M${cx},${sy - 11} L${cx},${g - 20}`, { stroke: C.green, width: 4 }) + D.path_(`M${cx},${g - 20} C${cx - 24},${g - 34} ${cx - 30},${g - 52} ${cx - 24},${g - 62}`, { stroke: C.green, width: 3 }) + D.path_(`M${cx},${g - 20} C${cx + 12},${g - 40} ${cx + 18},${g - 52} ${cx + 12},${g - 64}`, { stroke: C.green, width: 3 });
      }
    }
    return o;
  };
  const xs = [105, 310, 515];
  b += D.text(10, 22, "Bean: epigeal (cotyledons carried above ground)", { size: 15, weight: 700 });
  const g1 = 110;
  xs.forEach((x, i) => { b += panel(x, g1, "bean", i + 1); });
  ["1 Radicle grows out", "2 Hypocotyl hook pushes up", "3 Cotyledons above ground"].forEach((s, i) => { b += D.text(xs[i], g1 + 120, s, { anchor: "middle", size: 13 }); });
  b += D.text(10, 262, "Maize: hypogeal (grain stays below ground)", { size: 15, weight: 700 });
  const g2 = 408;
  xs.forEach((x, i) => { b += panel(x, g2 - 78, "maize", i + 1); });
  ["1 Radicle grows out", "2 Coleoptile pushes up", "3 Leaves open, grain stays"].forEach((s, i) => { b += D.text(xs[i], g2 + 42, s, { anchor: "middle", size: 13 }); });
  b += D.text(10, 490, "Soil is shown shaded; the line at the top of each panel is the soil surface.", { size: 12, fill: C.muted });
  const alt = "Germination in three stages: the bean (epigeal) forms a hypocotyl hook that pulls its cotyledons above the soil surface, while the maize grain (hypogeal) stays below ground and its coleoptile pushes the first leaves up through the soil.";
  const cap = "Figure: epigeal germination in the bean and hypogeal germination in maize";
  await D.figure(FAMILY, "epigeal-hypogeal-germination", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/plants/germination.md`, "- In **maize (hypogeal)**", D.md("epigeal-hypogeal-germination", alt, cap));
}
console.log("plants done");
