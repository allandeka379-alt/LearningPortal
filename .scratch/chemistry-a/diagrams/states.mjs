// chemistry-a states of matter: lattice types. Run: node .scratch/chemistry-a/diagrams/states.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, atom, wedge, hash, pol, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);

{
  const w = 600, h = 520, pw = 300, ph = 260;
  const title = (i, t, sub) => D.text((i % 2) * pw + pw / 2, Math.floor(i / 2) * ph + 24, t, { anchor: "middle", size: 15, weight: 700 }) + D.text((i % 2) * pw + pw / 2, Math.floor(i / 2) * ph + 242, sub, { anchor: "middle", size: 13, fill: C.muted });
  let body = "";
  // 1: ionic lattice layer, alternating Na+ (smaller) and Cl- (larger)
  {
    const ox = 90, oy = 70, s = 44;
    body += title(0, "Giant ionic (sodium chloride)", "ions alternate; strong bonds in all directions");
    for (let r = 0; r < 4; r += 1) for (let c = 0; c < 4; c += 1) {
      const pos = (r + c) % 2 === 0;
      body += (r < 3 ? D.line(ox + c * s, oy + r * s, ox + c * s, oy + (r + 1) * s, { stroke: C.grid, width: 1.5 }) : "") + (c < 3 ? D.line(ox + c * s, oy + r * s, ox + (c + 1) * s, oy + r * s, { stroke: C.grid, width: 1.5 }) : "");
    }
    for (let r = 0; r < 4; r += 1) for (let c = 0; c < 4; c += 1) {
      const pos = (r + c) % 2 === 0;
      body += atom(ox + c * s, oy + r * s, pos ? "Na⁺" : "Cl⁻", { r: pos ? 15 : 19, size: 12, fill: pos ? C.fillBlue : C.fillAmber });
    }
  }
  // 2: metallic lattice
  {
    const ox = pw + 75, oy = 66, s = 48;
    body += title(1, "Giant metallic (copper)", "positive ions in a sea of delocalised electrons");
    for (let r = 0; r < 4; r += 1) for (let c = 0; c < 4; c += 1) {
      body += atom(ox + c * s, oy + r * s, "+", { r: 15, size: 15, fill: C.fillBlue });
      if (r < 3 && c < 3) body += D.text(ox + c * s + s / 2, oy + r * s + s / 2 + 4, "e⁻", { anchor: "middle", size: 13, fill: C.amber, weight: 700 });
    }
  }
  // 3: graphite layers, side view
  {
    const cx = 150, oy = ph + 70;
    body += title(2, "Graphite (giant covalent)", "strong bonds in layers; weak forces between");
    for (let k = 0; k < 3; k += 1) {
      const y = oy + k * 50, pts = [];
      for (let i = 0; i < 9; i += 1) pts.push([cx - 110 + i * 27.5, y + (i % 2 ? -9 : 9)]);
      body += D.polyline(pts, { stroke: C.blue, width: 3 });
    }
    body += D.line(cx + 40, oy + 9, cx + 40, oy + 50 - 9, { stroke: C.red, width: 1.6, dash: true }) + D.line(cx + 40, oy + 59, cx + 40, oy + 91, { stroke: C.red, width: 1.6, dash: true });
    body += D.tag(cx + 50, oy + 54, "weak forces", { size: 13, fill: C.red });
  }
  // 4: diamond tetrahedral unit
  {
    const cx = pw + 150, cy = ph + 125, R = 60;
    body += title(3, "Diamond (giant covalent)", "each C bonded to 4 others, tetrahedrally");
    const arm = (a, kind) => {
      const [x, y] = pol(cx, cy, R, a), [sx, sy] = pol(cx, cy, 14, a), [ex, ey] = pol(cx, cy, R - 14, a);
      const [fx, fy] = pol(x, y, 26, a);
      return (kind === "wedge" ? wedge(sx, sy, ex, ey, 8) : kind === "hash" ? hash(sx, sy, ex, ey, 8) : D.line(sx, sy, ex, ey)) + D.line(x, y, fx, fy, { stroke: C.muted, width: 1.6, dash: true }) + atom(x, y, "C", { r: 14, size: 14 });
    };
    body += arm(90) + arm(235) + arm(325, "wedge") + arm(160, "hash") + atom(cx, cy, "C", { r: 14, size: 14, fill: C.fillBlue });
  }
  const alt = "Four lattice types: a giant ionic layer with alternating Na+ and Cl- ions; a giant metallic lattice of positive ions with delocalised electrons between them; graphite as stacked layers with strong covalent bonds inside each layer and weak forces between layers; and diamond with each carbon bonded tetrahedrally to four others.";
  const cap = "Figure: ionic, metallic, graphite and diamond lattices (schematic)";
  await D.figure(F, "lattice-types", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("states/lattice-structures"), "| giant metallic | positive ions", D.md("lattice-types", alt, cap));
}
