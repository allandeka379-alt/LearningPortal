// Run from repo root: node .scratch/chemistry-o/diagrams/bonding.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put } from "./_h.mjs";

const rad = (d) => (d * Math.PI) / 180;
const polar = (cx, cy, r, deg) => [cx + r * Math.cos(rad(deg)), cy - r * Math.sin(rad(deg))];
const cross = (x, y, o = {}) => D.line(x - 4, y - 4, x + 4, y + 4, { stroke: o.stroke ?? C.blue, width: 2 }) + D.line(x - 4, y + 4, x + 4, y - 4, { stroke: o.stroke ?? C.blue, width: 2 });
const edot = (x, y, o = {}) => D.dot(x, y, { r: 3.5, fill: o.fill ?? C.amber, stroke: o.fill ?? C.amber });
const mark = (kind, x, y) => (kind === "x" ? cross(x, y) : edot(x, y));
/** Electron at slot (0 right, 90 top, 180 left, 270 bottom) offset +/-1 on a circle. */
const slot = (cx, cy, r, base, side, kind) => { const [x, y] = polar(cx, cy, r, base + side * 13); return mark(kind, x, y); };
/** Draw outer-shell circle with electrons list [[base, side, kind], ...] */
const shellCircle = (cx, cy, r, els, o = {}) => D.circle(cx, cy, r, { stroke: C.axis, width: 1.8, fill: o.fill ?? "#fff" }) + els.map(([b, s, k]) => slot(cx, cy, r, b, s, k)).join("");
const bracket = (cx, cy, r, charge) => {
  const h = r + 10, w = r + 10;
  return D.polyline([[cx - w + 8, cy - h], [cx - w, cy - h], [cx - w, cy + h], [cx - w + 8, cy + h]], { stroke: C.ink, width: 2 }) +
    D.polyline([[cx + w - 8, cy - h], [cx + w, cy - h], [cx + w, cy + h], [cx + w - 8, cy + h]], { stroke: C.ink, width: 2 }) +
    T(cx + w + 4, cy - h + 12, charge, { size: 16, weight: 700 });
};

// ---- ionic: NaCl and MgO dot-and-cross
{
  const r = 34;
  const row = (y, aSym, aEls, bSym, bEls, aIon, aIonEls, aCh, bIon, bIonEls, bCh, formula, note) => {
    const a = 70, bx = 156, i1 = 345, i2 = 465;
    return shellCircle(a, y, r, aEls) + T(a, y + 5, aSym, { anchor: "middle", weight: 700 }) +
      shellCircle(bx, y, r, bEls) + T(bx, y + 5, bSym, { anchor: "middle", weight: 700 }) +
      D.arrow(228, y, 288, y, { width: 2 }) + T(258, y - 26, note, { anchor: "middle", size: 12, fill: C.muted }) +
      bracket(i1, y, r, aCh) + shellCircle(i1, y, r, aIonEls, { fill: "none" }) + T(i1, y + 5, aIon, { anchor: "middle", weight: 700 }) +
      bracket(i2, y, r, bCh) + shellCircle(i2, y, r, bIonEls, { fill: "none" }) + T(i2, y + 5, bIon, { anchor: "middle", weight: 700 }) +
      T(570, y + 5, formula, { weight: 700, size: 16 });
  };
  // Na (1 cross at right facing Cl); Cl (7 dots: top pair, bottom pair, right pair, left single)
  const clAtom = [[90, -1, "."], [90, 1, "."], [270, -1, "."], [270, 1, "."], [0, -1, "."], [0, 1, "."], [180, 1, "."]];
  const clIon = [...clAtom, [180, -1, "x"]];
  const eight = (kinds) => kinds;
  const naPlus = [[0, -1, "x"], [0, 1, "x"], [90, -1, "x"], [90, 1, "x"], [180, -1, "x"], [180, 1, "x"], [270, -1, "x"], [270, 1, "x"]];
  let b = row(70, "Na", [[0, 0, "x"]], "Cl", clAtom, "Na", naPlus, "+", "Cl", clIon, "−", "NaCl", "1 electron\ntransferred");
  // Mg (2 crosses at right); O (6 dots: top pair, bottom pair, right single... leave left two gaps)
  const oAtom = [[90, -1, "."], [90, 1, "."], [270, -1, "."], [270, 1, "."], [0, -1, "."], [0, 1, "."]];
  const oIon = [...oAtom, [180, -1, "x"], [180, 1, "x"]];
  b += row(190, "Mg", [[0, -1, "x"], [0, 1, "x"]], "O", oAtom, "Mg", naPlus, "2+", "O", oIon, "2−", "MgO", "2 electrons\ntransferred");
  b += T(20, 262, "× = electrons from the metal atom     • = electrons from the non-metal atom", { size: 13, fill: C.muted });
  b += T(20, 20, "Only the outer shells are drawn.", { size: 13, fill: C.muted });
  await put("ionic-bonding-dot-cross-nacl-mgo", 640, 280, b,
    "Dot-and-cross diagrams: sodium transfers its one outer electron to chlorine, giving Na+ (outer shell of 8 crosses) and Cl- (8 outer electrons, 7 dots and 1 cross), formula NaCl; magnesium transfers two electrons to oxygen, giving Mg2+ and O2- each with a full outer shell, formula MgO.",
    "Figure: electron transfer in sodium chloride and magnesium oxide", "bonding/ionic-bonding", "## Dot-and-cross diagrams");
}

// ---- NaCl lattice (2D slice)
{
  let b = "";
  const n = 5, s = 62, x0 = 70, y0 = 60;
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    const x = x0 + i * s, y = y0 + j * s;
    if (i < n - 1) b += D.line(x, y, x + s, y, { stroke: C.grid, width: 3 });
    if (j < n - 1) b += D.line(x, y, x, y + s, { stroke: C.grid, width: 3 });
  }
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    const x = x0 + i * s, y = y0 + j * s, pos = (i + j) % 2 === 0;
    b += D.circle(x, y, pos ? 15 : 22, { fill: pos ? C.fillBlue : C.fillAmber, stroke: pos ? C.blue : C.amber, width: 2 }) + T(x, y + 5, pos ? "+" : "−", { anchor: "middle", weight: 700, size: 16 });
  }
  b += D.circle(420, 80, 15, { fill: C.fillBlue, stroke: C.blue, width: 2 }) + T(420, 85, "+", { anchor: "middle", weight: 700, size: 16 }) + T(446, 85, "Na⁺ ion (smaller)", { size: 14 }) +
    D.circle(420, 130, 22, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + T(420, 135, "−", { anchor: "middle", weight: 700, size: 16 }) + T(452, 135, "Cl⁻ ion (larger)", { size: 14 }) +
    T(400, 200, "Each ion is surrounded by\nions of the opposite charge,\nso the ions alternate in\nevery direction.", { size: 14 }) +
    T(400, 290, "Ratio Na⁺ : Cl⁻ = 1 : 1,\nso the formula is NaCl", { size: 14, weight: 700 });
  await put("ionic-lattice-sodium-chloride", 620, 360, b,
    "A slice through a sodium chloride lattice: smaller positive sodium ions and larger negative chloride ions alternate in rows and columns, each ion surrounded by ions of opposite charge, in the ratio 1 to 1.",
    "Figure: a layer of the giant ionic lattice of sodium chloride", "bonding/ionic-bonding", "## The giant ionic lattice (Supplement)");
}

// ---- covalent: NH3 and CO2
{
  // Ammonia centred (170,150): N r=38, H r=26 at distance 54 left, right, below
  const N = [170, 100], rN = 38, rH = 26, d = 54;
  let b = "";
  const Hs = [[N[0] - d, N[1]], [N[0] + d, N[1]], [N[0], N[1] + d]];
  Hs.forEach(([x, y]) => (b += D.circle(x, y, rH, { fill: "#fff", stroke: C.axis, width: 1.8 })));
  b += D.circle(N[0], N[1], rN, { fill: "#fff", stroke: C.axis, width: 1.8 });
  // lone pair (top)
  b += edot(...polar(N[0], N[1], rN - 9, 77)) + edot(...polar(N[0], N[1], rN - 9, 103));
  // shared pairs: N dot and H cross in lens
  const lens = (hx, hy) => {
    const vx = hx - N[0], vy = hy - N[1], L = Math.hypot(vx, vy), ux = vx / L, uy = vy / L, px = -uy, py = ux;
    const c = (rN - 8 + (L - rH)) / 2 + 2; // lens centre along axis
    const mx = N[0] + ux * c, my = N[1] + uy * c;
    return edot(mx - px * 6, my - py * 6) + cross(mx + px * 6, my + py * 6);
  };
  b += Hs.map(([x, y]) => lens(x, y)).join("");
  b += T(N[0], N[1] + 5, "N", { anchor: "middle", weight: 700 }) + Hs.map(([x, y]) => T(x, y + 5, "H", { anchor: "middle", weight: 700 })).join("");
  b += T(170, 205, "NH₃: 3 shared pairs\n+ 1 non-bonding pair", { anchor: "middle", weight: 700, size: 14 });
  // CO2 centred (460,140)
  const Cc = [455, 100], rC = 36, dO = 58;
  const Os = [[Cc[0] - dO, Cc[1]], [Cc[0] + dO, Cc[1]]];
  Os.forEach(([x, y]) => (b += D.circle(x, y, 36, { fill: "#fff", stroke: C.axis, width: 1.8 })));
  b += D.circle(Cc[0], Cc[1], rC, { fill: "#fff", stroke: C.axis, width: 1.8 });
  [-1, 1].forEach((s) => {
    const mx = Cc[0] + s * 29;
    b += edot(mx - s * 4, Cc[1] - 9) + edot(mx - s * 4, Cc[1] + 9) + cross(mx + s * 4, Cc[1] - 9) + cross(mx + s * 4, Cc[1] + 9);
    const ox = Cc[0] + s * dO;
    b += edot(ox + s * 12, Cc[1] - 22) + edot(ox + s * 12 + s * 9, Cc[1] - 17).replace("", "") + edot(ox + s * 12, Cc[1] + 22) + edot(ox + s * 12 + s * 9, Cc[1] + 17);
    b += T(ox + s * 0, Cc[1] + 5, "O", { anchor: "middle", weight: 700 });
  });
  b += T(Cc[0], Cc[1] + 5, "C", { anchor: "middle", weight: 700 });
  b += T(455, 205, "CO₂: two double bonds\n(2 shared pairs each)", { anchor: "middle", weight: 700, size: 14 });
  b += T(20, 262, "• = electrons from the N and O atoms     × = electrons from the H and C atoms", { size: 13, fill: C.muted });
  await put("covalent-dot-cross-nh3-co2", 640, 280, b,
    "Dot-and-cross diagrams: ammonia NH3 has nitrogen sharing one pair with each of three hydrogen atoms, leaving one non-bonding pair; carbon dioxide has carbon sharing two pairs with each oxygen atom (two double bonds); every atom ends with a full outer shell.",
    "Figure: shared pairs in ammonia and carbon dioxide (outer shells only)", "bonding/covalent-bonding", "## Dot-and-cross diagrams");
}

// ---- giant covalent: diamond, graphite
{
  let b = "";
  // diamond: central atom with 4 tetrahedral neighbours, each with 3 further stubs
  const c = [150, 160];
  const nb = [[-70, -55], [70, -55], [-70, 60], [70, 60]];
  nb.forEach(([dx, dy]) => {
    const [x, y] = [c[0] + dx, c[1] + dy];
    b += D.line(c[0], c[1], x, y, { stroke: C.axis, width: 3 });
    [[-1, -1], [1, -1], [0, 1.2]].forEach(([sx, sy]) => (b += D.line(x, y, x + sx * 28 * Math.sign(dx || 1), y + sy * 26 * Math.sign(dy || 1), { stroke: C.muted, width: 2, dash: true })));
  });
  nb.forEach(([dx, dy]) => (b += D.circle(c[0] + dx, c[1] + dy, 11, { fill: C.fillGrey, stroke: C.axis, width: 1.8 }) + T(c[0] + dx, c[1] + dy + 5, "C", { anchor: "middle", size: 13, weight: 700 })));
  b += D.circle(c[0], c[1], 13, { fill: C.fillBlue, stroke: C.blue, width: 2 }) + T(c[0], c[1] + 5, "C", { anchor: "middle", size: 13, weight: 700 });
  b += T(150, 25, "Diamond", { anchor: "middle", weight: 700, size: 16 }) + T(150, 262, "each C bonded to 4 others\nin a 3-D network", { anchor: "middle", size: 14 });
  // graphite top view: 3 hexagons in a sheet
  const hexR = 30, hx = 400, hy = 130;
  const hex = (cx, cy) => Array.from({ length: 6 }, (_, k) => polar(cx, cy, hexR, 30 + 60 * k));
  const centres = [[hx - 26, hy - 45], [hx + 26, hy - 45 + 0], [hx - 52, hy + 0], [hx, hy], [hx + 52, hy]].slice(0, 0);
  const hcs = [[hx, hy - 26 - 26], [hx - 52, hy], [hx, hy], [hx + 52, hy]].map(([x, y]) => [x, y]);
  // proper hexagonal packing (pointy-top hexes): width sqrt3*R
  const w = Math.sqrt(3) * hexR;
  const cells = [[hx - w, hy], [hx, hy], [hx + w, hy], [hx - w / 2, hy - 1.5 * hexR], [hx + w / 2, hy - 1.5 * hexR], [hx - w / 2, hy + 1.5 * hexR], [hx + w / 2, hy + 1.5 * hexR]];
  const drawn = new Set();
  cells.forEach(([cx, cy]) => {
    const pts = Array.from({ length: 6 }, (_, k) => polar(cx, cy, hexR, 90 + 60 * k));
    pts.forEach((p, k) => { const q = pts[(k + 1) % 6]; const key = [p, q].map((z) => z.map((v) => Math.round(v)).join(",")).sort().join("|"); if (!drawn.has(key)) { drawn.add(key); b += D.line(p[0], p[1], q[0], q[1], { stroke: C.axis, width: 3 }); } });
  });
  const atoms = new Set();
  cells.forEach(([cx, cy]) => Array.from({ length: 6 }, (_, k) => polar(cx, cy, hexR, 90 + 60 * k)).forEach(([x, y]) => { const key = `${Math.round(x)},${Math.round(y)}`; if (!atoms.has(key)) { atoms.add(key); b += D.circle(x, y, 6, { fill: C.fillGrey, stroke: C.axis, width: 1.5 }); } }));
  b += T(400, 25, "Graphite: one layer from above", { anchor: "middle", weight: 700, size: 16 }) + T(400, 262, "each C bonded to 3 others in a flat\nlayer of hexagons", { anchor: "middle", size: 14 });
  // graphite layers side view
  for (let k = 0; k < 3; k += 1) {
    const y = 60 + k * 40;
    b += D.line(520, y, 620, y, { stroke: C.axis, width: 3 });
    for (let i = 0; i < 6; i += 1) b += D.circle(526 + i * 18, y, 5, { fill: C.fillGrey, stroke: C.axis, width: 1.3 });
  }
  b += D.line(570, 62, 570, 98, { stroke: C.red, width: 1.5, dash: true, arrowStart: true, arrow: true }) + T(522, 178, "weak forces between\nlayers: layers slide", { size: 13, fill: C.red }) + T(520, 40, "side view", { size: 13, fill: C.muted });
  await put("giant-covalent-diamond-graphite", 650, 290, b,
    "Giant covalent structures: in diamond each carbon atom bonds to four others in a rigid three-dimensional network; in graphite each carbon bonds to three others in flat hexagonal layers, with only weak forces between the layers so they slide over each other.",
    "Figure: the structures of diamond and graphite", "bonding/giant-covalent-structures", "## Graphite");
}

// ---- metallic bonding
{
  let b = "";
  const cols = 5, rows = 4, s = 56, x0 = 70, y0 = 70;
  const rng = (() => { let t = 7; return () => ((t = (t * 9301 + 49297) % 233280) / 233280); })();
  for (let i = 0; i < cols; i += 1) for (let j = 0; j < rows; j += 1) {
    const x = x0 + i * s, y = y0 + j * s;
    b += D.circle(x, y, 17, { fill: C.fillBlue, stroke: C.blue, width: 2 }) + T(x, y + 5, "+", { anchor: "middle", weight: 700, size: 16 });
  }
  for (let i = 0; i < cols - 1; i += 1) for (let j = 0; j < rows; j += 1) { const jy = j < rows - 1 ? 0.5 : 0; if (j < rows - 1 || i % 2 === 0) b += cross(x0 + (i + 0.5) * s + (rng() - 0.5) * 8, y0 + (j + jy) * s + (rng() - 0.5) * 8, { stroke: C.amber }); }
  b += T(x0 - 40, 30, "Metal: positive ions in a 'sea' of delocalised electrons", { weight: 700, size: 14 });
  b += T(x0 - 40, 306, "+ = positive metal ion     × = delocalised electron (free to move)", { size: 13, fill: C.muted });
  // bending: layers sliding
  const bx = 420;
  for (let j = 0; j < 3; j += 1) for (let i = 0; i < 4; i += 1) {
    const x = bx + i * 40 + (j === 1 ? 24 : 0), y = 90 + j * 44;
    b += D.circle(x, y, 14, { fill: C.fillBlue, stroke: C.blue, width: 2 }) + T(x, y + 5, "+", { anchor: "middle", weight: 700, size: 14 });
  }
  b += D.arrow(bx + 190, 134, bx + 222, 134, { stroke: C.red, width: 2 }) + T(bx + 190, 120, "force", { size: 13, fill: C.red }) + T(bx - 10, 30, "Force: a layer slides", { weight: 700, size: 14 }) + T(bx - 10, 235, "the layers slip over each other and the\nelectron 'sea' keeps holding them\ntogether: the metal bends, not shatters", { size: 13 });
  await put("metallic-bonding-sea-of-electrons", 650, 320, b,
    "Metallic bonding: a regular lattice of positive metal ions surrounded by a sea of delocalised electrons that are free to move; when a force is applied, layers of ions slide over each other while the electrons still hold the structure together, so the metal bends instead of shattering.",
    "Figure: positive ions in a sea of delocalised electrons, and layers sliding", "bonding/metallic-bonding", "## The structure of a metal");
}

// ---- shell diagrams: Li, Al, Cl
{
  let b = "";
  const panel = (cx, cy, sym, z, shells) => {
    const radii = [28, 52, 76];
    let s = D.circle(cx, cy, 14, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + T(cx, cy + 4, `${z}+`, { anchor: "middle", size: 12, weight: 700 });
    shells.forEach((n, i) => {
      s += D.circle(cx, cy, radii[i], { stroke: C.axis, width: 1.6 });
      for (let k = 0; k < n; k += 1) { const [x, y] = polar(cx, cy, radii[i], 90 + (360 / n) * k + i * 20); s += D.dot(x, y, { r: 5, fill: C.blue, stroke: C.blue }); }
    });
    return s + T(cx, cy + 108, `${sym}   ${shells.join(",")}`, { anchor: "middle", weight: 700, size: 15 });
  };
  b += panel(110, 120, "Li", 3, [2, 1]) + panel(310, 120, "Al", 13, [2, 8, 3]) + panel(510, 120, "Cl", 17, [2, 8, 7]);
  b += T(310, 262, "● = electron (one dot per electron on its shell);  centre = nucleus with its proton number", { anchor: "middle", size: 13, fill: C.muted });
  await put("electron-shell-diagrams-li-al-cl", 620, 280, b,
    "Shell diagrams: lithium 2,1 has two occupied shells and one outer electron; aluminium 2,8,3 has three shells and three outer electrons; chlorine 2,8,7 has three shells and seven outer electrons. The number of shells gives the period and the outer electrons give the group.",
    "Figure: electrons in shells for lithium (2,1), aluminium (2,8,3) and chlorine (2,8,7)", "atoms/electronic-configuration", "A **shell diagram** shows the same information");
}

// ---- potassium-39 atom (lesson Example 1)
{
  const cx = 160, cy = 150, radii = [44, 72, 100, 128], shells = [2, 8, 8, 1];
  let b = "";
  shells.forEach((n, i) => {
    b += D.circle(cx, cy, radii[i], { stroke: C.axis, width: 1.6 });
    for (let k = 0; k < n; k += 1) { const [x, y] = polar(cx, cy, radii[i], 90 + (360 / n) * k + i * 17); b += D.dot(x, y, { r: 5, fill: C.blue, stroke: C.blue }); }
  });
  b += D.circle(cx, cy, 28, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + T(cx, cy - 2, "19 p", { anchor: "middle", size: 13, weight: 700 }) + T(cx, cy + 14, "20 n", { anchor: "middle", size: 13, weight: 700 });
  b += T(330, 60, "Potassium-39", { weight: 700, size: 17 }) + T(330, 90, "nucleus: 19 protons + 20 neutrons\n(mass number 39)", { size: 14 }) +
    T(330, 145, "19 electrons in shells: 2,8,8,1", { size: 14 }) + T(330, 175, "protons = electrons, so the\natom has no overall charge", { size: 14 }) +
    D.dot(338, 230, { r: 5, fill: C.blue, stroke: C.blue }) + T(352, 235, "electron", { size: 13 }) + D.circle(430, 230, 9, { fill: C.fillAmber, stroke: C.amber, width: 2 }) + T(446, 235, "nucleus", { size: 13 });
  await put("atom-structure-potassium-39", 640, 300, b,
    "Atom of potassium-39: a nucleus of 19 protons and 20 neutrons (mass number 39) surrounded by 19 electrons in shells of 2, 8, 8 and 1; the numbers of protons and electrons are equal so the atom is neutral.",
    "Figure: the particles in an atom of potassium-39", "atoms/atomic-structure", "## Nuclide notation");
}
