// Organisation: chart, span/levels, matrix (lessons/organisation/*).
import * as D from "../../tools/diagram-kit.mjs";
import { C, FAM, L, tree, place } from "./lib.mjs";

// ---- 1. Nyasha's chart (structure-features) ----
{
  const t = {
    label: "Managing director\n(Nyasha)", fill: C.fillAmber, children: [
      { label: "Production\nmanager", children: [
        { label: "Supervisor\ncutting\n(4 carpenters)", fill: C.fillGrey },
        { label: "Supervisor\nassembly\n(6 workers)", fill: C.fillGrey },
        { label: "Supervisor\nfinishing\n(4 workers)", fill: C.fillGrey }] },
      { label: "Sales\nmanager", children: [{ label: "3 showroom\nmanagers (each\nwith 3 sales staff)", fill: C.fillGrey }] },
      { label: "Finance\nmanager", children: [{ label: "Accountant\n(1 clerk)", fill: C.fillGrey }] },
    ],
  };
  const bh = 60, gy = 40;
  const r = tree(t, { bw: 118, bh, gx: 8, gy });
  let b = r.body;
  const W = r.width + 74, H = r.height;
  b += D.line(r.width + 2, 6, r.width + 2, H - 8, { stroke: C.grid, width: 1 });
  for (let d = 0; d < 4; d += 1) b += D.text(W - 6, 12 + d * (bh + gy) + bh / 2 + 4, `Level ${d + 1}`, { anchor: "end", size: 13, weight: 700, fill: C.muted });
  // span notes beside the two managers with spans
  b += D.text(t.cx + 64, t.y + bh / 2 + 4, "span 3", { size: 13, weight: 700, fill: C.amber });
  const prod = t.children[0];
  b += D.text(prod.cx + 64, prod.y + bh / 2 + 4, "span 3", { size: 13, weight: 700, fill: C.amber });
  b += D.text(W - 6, 12 + 2 * (bh + gy) + bh / 2 + 22, "(workers: level 4)", { anchor: "end", size: 12, fill: C.muted });
  const alt = "Organisational chart of Nyasha's workshop: the managing director has a span of control of 3 (production, sales and finance managers); the production manager also has a span of 3 supervisors; a cutting carpenter's chain of command is carpenter (level 4), supervisor, production manager, managing director; the workers sit one level below the supervisors.";
  const cap = "Figure: the organisational chart of Nyasha's workshop, with spans of control and levels of hierarchy";
  await D.figure(FAM, "org-chart-workshop", D.svg(W, H, b), { alt, caption: cap });
  place(L("organisation/structure-features"), "- Managing director (Nyasha)", D.md("org-chart-workshop", alt, cap));
}

// ---- 2. Span and levels (delegation-control) ----
{
  const operatives = 64;
  const mk = (span) => { const lv = [1]; while (lv.at(-1) < operatives) lv.push(lv.at(-1) * span); return lv; };
  const a = mk(4), c = mk(8); // [1,4,16,64], [1,8,64]
  const mgrs = (lv) => lv.slice(0, -1).reduce((s, v) => s + v, 0);
  const W = 600, H = 340;
  let b = "";
  const col = (lv, x, title) => {
    b += D.text(x + 130, 28, title, { anchor: "middle", size: 15, weight: 700 });
    lv.forEach((n, i) => {
      const y = 44 + i * 62;
      const w = 60 + 190 * (Math.log(n + 1) / Math.log(operatives + 1));
      const last = i === lv.length - 1;
      b += D.rect(x + 130 - w / 2, y, w, 40, { fill: last ? C.fillGreen : i === 0 ? C.fillAmber : C.fillBlue, r: 6 });
      b += D.text(x + 130, y + 25, `${n}${i === 0 ? " director" : last ? " operatives" : " managers"}`, { anchor: "middle", size: 13 });
      if (i < lv.length - 1) b += D.arrow(x + 130, y + 40, x + 130, y + 62, { stroke: C.axis, width: 1.4 });
    });
    b += D.text(x + 130, 44 + lv.length * 62 + 8, `${lv.length} levels, ${mgrs(lv)} managers`, { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  };
  col(a, 10, "Span of control 4");
  col(c, 310, "Span of control 8");
  b += D.line(300, 36, 300, H - 20, { stroke: C.grid, width: 1 });
  const alt = `The same ${operatives} operatives organised two ways: with a span of 4 there are 4 levels (1, 4, 16 and 64 people) and ${mgrs(a)} managers; with a span of 8 there are 3 levels (1, 8 and 64) and ${mgrs(c)} managers, so widening the span removes a level and ${mgrs(a) - mgrs(c)} managers.`;
  const cap = "Figure: a wider span of control gives fewer levels and fewer managers for the same 64 operatives";
  await D.figure(FAM, "span-levels-comparison", D.svg(W, H, b), { alt, caption: cap });
  place(L("organisation/delegation-control"), "3. Widening the span from 4 to 8", D.md("span-levels-comparison", alt, cap), { block: true });
}

// ---- 3. Matrix (structure-types) ----
{
  const W = 600, H = 330;
  let b = "";
  const fns = ["Design", "Engineering", "Finance"], prj = ["Project A", "Project B", "Project C"];
  const x0 = 130, y0 = 70, cw = 150, ch = 58;
  b += D.text(x0 + (3 * cw) / 2, 22, "Department heads (functional managers)", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  fns.forEach((f, i) => { b += D.node(x0 + i * cw + 6, 32, cw - 12, 30, f, { fill: C.fillBlue, size: 13 }); });
  prj.forEach((p, j) => { b += D.node(8, y0 + j * ch + 6, 108, ch - 12, p + "\nmanager", { fill: C.fillAmber, size: 13 }); });
  b += D.text(62, y0 + 3 * ch + 18, "Project managers", { anchor: "middle", size: 13, weight: 700, fill: C.amber });
  for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
    const hl = i === 1 && j === 1;
    b += D.rect(x0 + i * cw + 6, y0 + j * ch + 6, cw - 12, ch - 12, { fill: hl ? C.fillGreen : "#fff", stroke: hl ? C.green : C.grid, width: hl ? 2.4 : 1.4, r: 6 });
    b += D.text(x0 + i * cw + cw / 2, y0 + j * ch + ch / 2 + (hl ? -2 : 5), hl ? "engineer:\ntwo bosses" : "team member", { anchor: "middle", size: 13, fill: hl ? C.green : C.muted, weight: hl ? 700 : 400 });
  }
  const yb = y0 + 3 * ch + 24;
  b += D.text(x0 + (3 * cw) / 2, yb + 14, "Each member reports to the department head (standards, pay)", { anchor: "middle", size: 13 });
  b += D.text(x0 + (3 * cw) / 2, yb + 32, "and to the project manager (day-to-day schedule)", { anchor: "middle", size: 13 });
  const alt = "Matrix structure: departments (design, engineering, finance) run across the top and projects A, B and C down the side; each team member in a cell has two bosses, the department head for professional standards and pay and the project manager for the schedule, which can cause conflicting instructions.";
  const cap = "Figure: a matrix structure, where every team member sits in a department and on a project";
  await D.figure(FAM, "matrix-structure", D.svg(W, H, b), { alt, caption: cap });
  place(L("organisation/structure-types"), "A **matrix** structure has the same functional managers", D.md("matrix-structure", alt, cap));
}
