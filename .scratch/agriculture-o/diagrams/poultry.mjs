// agriculture-o poultry diagrams: hen oviduct, egg, flower. Run: node .scratch/agriculture-o/diagrams/poultry.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LP, insertAfterBlock } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);
const leader = (x1, y1, x2, y2) => D.line(x1, y1, x2, y2, { stroke: C.muted, width: 1 });
const ellipse = (cx, cy, rx, ry, o = {}) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${o.fill ?? "none"}" stroke="${o.stroke ?? C.ink}" stroke-width="${o.width ?? 2}"/>`;

// ---------------------------------------------------------------- hen oviduct with times, and a proportional time bar
{
  const parts = [["Infundibulum", 0.25, "catches the yolk; fertilisation here"], ["Magnum", 3, "adds the albumen (egg white)"], ["Isthmus", 1.25, "adds the shell membranes"], ["Uterus (shell gland)", 20, "adds water, then the shell"]];
  const total = parts.reduce((s, p) => s + p[1], 0);
  if (total !== 24.5) throw new Error("oviduct time");
  const W = 620, H = 560;
  let b = "";
  const cx = 190;
  // ovary: bunch of yolks
  for (const [dx, dy, r] of [[-60, 10, 16], [-30, -4, 11], [-80, 40, 9], [-48, 40, 7], [-14, 22, 6], [-62, -14, 6]]) b += D.circle(cx + dx, 56 + dy, r, { fill: "#f7d66b", stroke: C.amber, width: 1.5 });
  // infundibulum (funnel)
  b += D.polyline([[cx - 40, 76], [cx + 40, 76], [cx + 12, 120], [cx - 12, 120]], { close: true, fill: "#f6dcd9", stroke: C.axis, width: 2 });
  b += D.rect(cx - 12, 120, 24, 8, { fill: "#f6dcd9", stroke: C.axis, width: 2 });
  // magnum
  b += D.rect(cx - 22, 128, 44, 108, { fill: "#fbe9e6", stroke: C.axis, width: 2 });
  for (let y = 138; y < 232; y += 12) b += D.line(cx - 22, y, cx + 22, y + 4, { stroke: "#e6bdb7", width: 1 });
  // isthmus
  b += D.rect(cx - 14, 236, 28, 46, { fill: "#f6dcd9", stroke: C.axis, width: 2 });
  // uterus with an egg
  b += ellipse(cx, 332, 40, 52, { fill: "#f6dcd9", stroke: C.axis, width: 2 }) + ellipse(cx, 332, 24, 34, { fill: "#fff", stroke: C.muted, width: 1.4 });
  // vagina, cloaca
  b += D.rect(cx - 12, 384, 24, 44, { fill: "#f6dcd9", stroke: C.axis, width: 2 });
  b += D.polyline([[cx - 18, 428], [cx, 450], [cx + 18, 428]], { close: true, fill: "#e7b9b3", stroke: C.axis, width: 2 });
  // labels (right)
  const lx = 290;
  const lab = (y, name, desc, tx, ty) => { b += leader(tx, ty, lx - 6, y - 5) + D.text(lx, y, name, { size: 14, weight: 700 }) + D.text(lx, y + 16, desc, { size: 12, fill: C.muted }); };
  lab(64, "Ovary (left only)", "many yolks, like a bunch of grapes", cx - 20, 60);
  lab(108, "Infundibulum: 15 min", "catches the yolk; fertilisation here", cx + 30, 100);
  lab(188, "Magnum: 3 h", "longest part; adds the albumen", cx + 22, 180);
  lab(262, "Isthmus: 1 1/4 h", "adds the shell membranes", cx + 14, 258);
  lab(334, "Uterus (shell gland): about 20 h", "adds water, then the hard shell", cx + 40, 332);
  lab(412, "Vagina: minutes", "adds the cuticle, pushes the egg out", cx + 12, 406);
  b += D.text(cx, 470, "Cloaca and vent", { size: 13, anchor: "middle", weight: 700 });
  // proportional time bar
  const bx0 = 20, bw = 580, by = 500;
  const X = (h) => bx0 + (h / total) * bw;
  let acc = 0;
  const fills = ["#e7b9b3", "#fbd5cf", "#f0c6bf", "#f6dcd9"];
  parts.forEach(([name, h], i) => { b += D.rect(X(acc), by, X(acc + h) - X(acc), 26, { fill: fills[i], stroke: C.axis, width: 1.2 }); acc += h; });
  b += D.text(X(0.25 + 3 / 2), by + 17, "3 h", { size: 12, anchor: "middle" }) + D.text(X(0.25 + 3 + 1.25 + 10), by + 17, "uterus 20 h", { size: 13, anchor: "middle" });
  b += D.text(bx0, by + 46, `About ${total} h in all (15 min + 3 h + 1 1/4 h + 20 h, plus minutes in the vagina): roughly one egg a day.`, { size: 12, fill: C.muted });
  const alt = "Hen's reproductive tract in order: the left ovary with many yolks, the infundibulum (15 minutes, fertilisation), the magnum (3 hours, albumen), the isthmus (1 1/4 hours, shell membranes), the uterus or shell gland (about 20 hours, shell) and the vagina to the cloaca; the times add to about 24.5 hours, which is why a layer lays about one egg a day.";
  const cap = "Figure: the hen's oviduct, what each part adds and the time an egg spends in it";
  await D.figure(FAMILY, "hen-oviduct-egg-formation", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/livestock/poultry-reproduction.md`, "Altogether an egg takes about a day", D.md("hen-oviduct-egg-formation", alt, cap));
}

// ---------------------------------------------------------------- egg structure and the 60 g egg proportions
{
  const shell = 6, albumen = 36, yolk = 18, mass = 60;
  if (shell + albumen + yolk !== mass) throw new Error("egg mass");
  const W = 600, H = 470;
  let b = "";
  const cx = 170, cy = 190;
  b += ellipse(cx, cy, 104, 138, { fill: "#fbf4e2", stroke: "#b59a6a", width: 6 });
  b += ellipse(cx, cy, 97, 131, { fill: "none", stroke: C.muted, width: 1.4 });
  b += ellipse(cx, cy, 93, 127, { fill: "#fffdf6", stroke: C.muted, width: 1.4 });
  // air cell at the broad (top) end
  b += D.path_(`M${cx - 52},${cy - 112} Q${cx},${cy - 148} ${cx + 52},${cy - 112} Q${cx},${cy - 126} ${cx - 52},${cy - 112} Z`, { fill: "#ffffff", stroke: C.muted, width: 1.4 });
  // chalazae
  b += D.path_(`M${cx},${cy - 50} q-6,-14 0,-26 q6,-14 0,-26`, { stroke: "#b8a98a", width: 2.5 }) + D.path_(`M${cx},${cy + 50} q-6,14 0,26 q6,14 0,26`, { stroke: "#b8a98a", width: 2.5 });
  // yolk
  b += D.circle(cx, cy, 52, { fill: "#f7c948", stroke: "#c99a1c", width: 2 }) + D.circle(cx, cy, 56, { fill: "none", stroke: C.muted, width: 1 });
  b += ellipse(cx - 6, cy - 30, 14, 6, { fill: "#fff", stroke: C.muted, width: 1.2 });
  const lx = 330;
  const lab = (y, name, ex, ey) => { b += leader(ex, ey, lx - 6, y - 5) + D.text(lx, y, name, { size: 14 }); };
  lab(40, "Air cell (broad end)", cx + 30, cy - 122);
  lab(76, "Shell (pores) and cuticle", cx + 100, cy - 80);
  lab(112, "Shell membranes (two)", cx + 94, cy - 55);
  lab(158, "Chalaza (holds the yolk)", cx + 2, cy - 66);
  lab(206, "Albumen (thick and thin)", cx + 70, cy - 30);
  lab(250, "Germinal disc (becomes the chick)", cx - 2, cy - 30);
  lab(294, "Vitelline membrane", cx + 52, cy + 14);
  lab(338, "Yolk (food store)", cx + 40, cy + 34);
  // proportions bar for the 60 g egg
  const bx0 = 20, bw = 560, by = 398;
  const X = (g) => bx0 + (g / mass) * bw;
  const segs = [["Shell", shell, "#dcc9a0"], ["Albumen", albumen, "#fffdf6"], ["Yolk", yolk, "#f7c948"]];
  let acc = 0;
  for (const [name, g, fill] of segs) {
    b += D.rect(X(acc), by, X(acc + g) - X(acc), 30, { fill, stroke: C.axis, width: 1.2 });
    b += D.text((X(acc) + X(acc + g)) / 2, by + 50, `${name} ${g} g`, { size: 12, anchor: "middle" }) + D.text((X(acc) + X(acc + g)) / 2, by + 20, `${(g / mass) * 100}%`, { size: 13, anchor: "middle", weight: 700 });
    acc += g;
  }
  b += D.text(20, by - 10, "A 60 g egg by mass", { size: 13, weight: 700 });
  const alt = "Section through a hen's egg: shell with pores and cuticle, two shell membranes, an air cell at the broad end, thick and thin albumen, chalazae holding the yolk in the centre, the vitelline membrane, the yolk and the germinal disc; for a 60 g egg the shell is 6 g (10%), albumen 36 g (60%) and yolk 18 g (30%).";
  const cap = "Figure: the parts of an egg, and the shell, albumen and yolk shares of a 60 g egg";
  await D.figure(FAMILY, "egg-structure-proportions", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/livestock/poultry-reproduction.md`, "## Parts of the egg", D.md("egg-structure-proportions", alt, cap));
}
console.log("poultry done");
