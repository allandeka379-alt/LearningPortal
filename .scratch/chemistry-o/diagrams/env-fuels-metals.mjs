// Run from repo root: node .scratch/chemistry-o/diagrams/env-fuels-metals.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, T, put, beaker, tube, WATER, GLASS } from "./_h.mjs";

// ---- hard water: soap needed before/after boiling (worked example table)
{
  const data = [["Distilled", 0.5, 0.5], ["Borehole", 11.0, 4.0]];
  const w = 560, h = 380;
  const ax = D.axes({ x: [0, 2], y: [0, 14], w, h, xTicks: [], yTicks: [0, 2, 4, 6, 8, 10, 12, 14], origin: false, arrows: false, yLabel: "Soap solution needed / cm³" });
  let b = ax.frame;
  const bw = 60;
  data.forEach(([lab, before, after], i) => {
    const cx = ax.X(i + 0.5);
    [[before, -bw / 2 - 4, C.teal, "before boiling"], [after, bw / 2 + 4, C.amber, "after boiling"]].forEach(([v, dx, fill]) => {
      const x = cx + dx - bw / 2;
      b += D.rect(x, ax.Y(v), bw, ax.Y(0) - ax.Y(v), { fill, stroke: "none" });
      b += T(x + bw / 2, ax.Y(v) - 6, v.toFixed(1), { anchor: "middle", size: 14, weight: 700 });
    });
    b += T(cx, ax.Y(0) + 22, lab + " water", { anchor: "middle", size: 14 });
  });
  b += D.rect(ax.X(0) + 30, 36, 14, 14, { fill: C.teal, stroke: "none" }) + T(ax.X(0) + 50, 48, "before boiling", { size: 13 });
  b += D.rect(ax.X(0) + 190, 36, 14, 14, { fill: C.amber, stroke: "none" }) + T(ax.X(0) + 210, 48, "after boiling", { size: 13 });
  await put("hard-water-soap-test-results", w, h, b,
    "Bar chart of soap solution needed for a lasting lather: distilled water 0.5 cm3 before and after boiling; borehole water 11.0 cm3 before boiling and 4.0 cm3 after, so it has temporary hardness (the drop) and permanent hardness (still more than 0.5).",
    "Figure: soap needed for a lasting lather, before and after boiling",
    "environment/hard-water", "### With soap solution");
}

// ---- lime cycle with masses
{
  const w = 600, h = 320;
  let b = "";
  const nd = (x, y, ww, hh, s, fill) => D.node(x, y, ww, hh, s, { fill, size: 15 });
  b += nd(205, 20, 190, 66, "Limestone\nCaCO₃  (100 t)", C.fillGrey);
  b += nd(410, 230, 170, 66, "Quicklime\nCaO  (56 t)", C.fillAmber);
  b += nd(20, 230, 170, 66, "Slaked lime\nCa(OH)₂", C.fillBlue);
  b += D.arrow(380, 88, 470, 228, { stroke: C.amber, width: 2.4 });
  b += T(445, 125, "heat in a kiln\n(endothermic)\ngives off CO₂ (44 t)", { size: 13 });
  b += D.arrow(408, 263, 194, 263, { stroke: C.blue, width: 2.4 });
  b += T(300, 252, "add water", { anchor: "middle", size: 13 });
  b += T(300, 290, "(very exothermic)", { anchor: "middle", size: 13 });
  b += D.arrow(110, 228, 220, 90, { stroke: C.ink, width: 2.4 });
  b += T(10, 140, "takes in CO₂ from the air\n(mortar, limewash)", { size: 13 });
  await put("lime-cycle-limestone-quicklime-slaked-lime", w, h, b,
    "The lime cycle: heating 100 t of limestone (CaCO3) in a kiln gives 56 t of quicklime (CaO) and 44 t of carbon dioxide; adding water gives slaked lime Ca(OH)2 exothermically; slaked lime takes in carbon dioxide from the air and turns back into calcium carbonate.",
    "Figure: the lime cycle with the reacting masses from the worked example",
    "industry/lime", "→ heat →");
}
