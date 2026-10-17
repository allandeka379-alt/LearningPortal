// agriculture-o land and farm-planning diagrams. Run: node .scratch/agriculture-o/diagrams/land.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lab, C, L as LP } from "./lib.mjs";
const FAMILY = "agriculture-o";
const L = LP(FAMILY);

// ---------------------------------------------------------------- four-course rotation (12 ha, four fields of 3 ha)
{
  const seq = ["Maize", "Soya beans", "Sunflower", "Grass ley"];
  const offset = { A: 0, B: 3, C: 2, D: 1 };
  const crop = (f, year) => seq[(year - 1 + offset[f]) % 4];
  // must match the table in the lesson
  const table = { A: ["Maize", "Soya beans", "Sunflower", "Grass ley"], B: ["Grass ley", "Maize", "Soya beans", "Sunflower"], C: ["Sunflower", "Grass ley", "Maize", "Soya beans"], D: ["Soya beans", "Sunflower", "Grass ley", "Maize"] };
  for (const f of "ABCD") for (let y = 1; y <= 4; y += 1) if (crop(f, y) !== table[f][y - 1]) throw new Error(`rotation mismatch ${f}${y}`);
  const total = 12, courses = 4, area = total / courses; // 3 ha
  const manure = 10 * area; // 30 t
  const W = 640, H = 400;
  let b = "";
  const fill = { Maize: C.fillAmber, "Soya beans": C.fillGreen, Sunflower: "#fff4c2", "Grass ley": "#e3f0d3" };
  const grid = (x0, y0, year) => {
    let o = D.text(x0, y0 - 8, `Year ${year}`, { size: 14, weight: 700 });
    [["A", 0, 0], ["B", 1, 0], ["C", 0, 1], ["D", 1, 1]].forEach(([f, cx, cy]) => {
      const c = crop(f, year);
      o += D.rect(x0 + cx * 92, y0 + cy * 76, 92, 76, { fill: fill[c], stroke: C.axis, width: 1.6 });
      o += D.text(x0 + cx * 92 + 6, y0 + cy * 76 + 16, `Field ${f}`, { size: 12, fill: C.muted });
      o += D.text(x0 + cx * 92 + 46, y0 + cy * 76 + 42, c, { size: 13, anchor: "middle", weight: c === "Maize" ? 700 : 400 });
      o += D.text(x0 + cx * 92 + 46, y0 + cy * 76 + 66, `${area} ha`, { size: 12, anchor: "middle", fill: C.muted });
    });
    return o;
  };
  b += grid(14, 40, 1) + grid(14, 224, 2).replace(/^/, "");
  // cycle on the right
  const nodes = [[390, 40], [510, 120], [390, 200], [270, 120]]; // top, right, bottom, left (clockwise)
  const nw = 112, nh = 46;
  const pos = [[375, 38], [510, 130], [375, 222], [240, 130]];
  seq.forEach((s, i) => { b += D.node(pos[i][0], pos[i][1], nw, nh, s + (i === 0 ? "\n(heavy feeder)" : i === 1 ? "\n(legume)" : i === 3 ? "\n(rests the soil)" : "\n(deep taproot)"), { fill: fill[s], size: 13 }); });
  const mid = (i) => [pos[i][0] + nw / 2, pos[i][1] + nh / 2];
  b += D.arrow(pos[0][0] + nw, pos[0][1] + nh / 2 + 6, pos[1][0] + nw / 2, pos[1][1] - 2, { width: 2 });
  b += D.arrow(pos[1][0] + nw / 2, pos[1][1] + nh + 2, pos[2][0] + nw, pos[2][1] + nh / 2 - 4, { width: 2 });
  b += D.arrow(pos[2][0], pos[2][1] + nh / 2 - 4, pos[3][0] + nw / 2, pos[3][1] + nh + 2, { width: 2 });
  b += D.arrow(pos[3][0] + nw / 2, pos[3][1] - 2, pos[0][0], pos[0][1] + nh / 2 + 6, { width: 2 });
  b += D.text(431, 190, "On each field the crops follow", { size: 12, anchor: "middle", fill: C.muted });
  b += D.text(431, 206, "this order, one field along each year", { size: 12, anchor: "middle", fill: C.muted });
  b += D.text(245, 310, `${total} ha divided into ${courses} fields of ${area} ha.`, { size: 13 });
  b += D.text(245, 330, `Manure at 10 t/ha on the maize field: ${manure} t each year.`, { size: 13 });
  b += D.text(245, 350, "After four years every field has carried every crop.", { size: 13 });
  const alt = "Four-course rotation on 12 ha: four fields of 3 ha carry maize, soya beans, sunflower and grass ley, shown for year 1 and year 2 as each crop moves one field along; on every field the order is maize, soya beans, sunflower, ley, and the maize field gets 30 t of manure a year.";
  const cap = "Figure: a four-course rotation on four 3 ha fields, years 1 and 2, and the order of crops on each field";
  await D.figure(FAMILY, "four-course-rotation-plan", D.svg(W, H, b), { alt, caption: cap });
  D.insertAfter(`${L}/land/crop-rotation.md`, "| D | Soya beans | Sunflower | Grass ley | Maize (manure + fertiliser) |", D.md("four-course-rotation-plan", alt, cap));
}
console.log("land done");
