// chemistry-a: SN1/SN2 energy profiles and sub-shell filling. Run: node .scratch/chemistry-a/diagrams/mechanisms.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { C, L as LL } from "./_h.mjs";
const F = "chemistry-a";
const L = LL(F);

// ---- SN2 (one peak, transition state) and SN1 (two peaks, carbocation intermediate)
{
  const w = 620, h = 330;
  const mk = () => D.axes({ x: [0, 10], y: [0, 100], xTicks: [], yTicks: [], tickLabels: false, xLabel: "Progress of reaction", yLabel: "Energy", w: 310, h, pad: { l: 30, r: 14, t: 56, b: 52 } });
  const g = (x, c, wd, ht) => ht * Math.exp(-(((x - c) / wd) ** 2));
  const step = (x) => 0.5 * (1 + Math.tanh((x - 5) / 1.2));
  const R = 55, P = 35;
  const sn2 = (x) => R + (P - R) * step(x) + g(x, 5, 1.2, 38);
  const sn1 = (x) => R + (P - R) * step(x) + g(x, 3.0, 0.85, 34) + g(x, 7.0, 0.85, 14) - g(x, 5, 0.9, 10) * 0 + 0;
  // build SN1 with explicit intermediate dip: sum of two bumps over a plateau at carbocation level
  const I = 66;
  const sn1b = (x) => (x < 5 ? R + (I - R) * (0.5 * (1 + Math.tanh((x - 3.2) / 1.0))) + g(x, 2.4, 0.9, 20) : I + (P - I) * (0.5 * (1 + Math.tanh((x - 6.8) / 1.0))) + g(x, 7.6, 0.9, 8));
  const sg = (x, c, wd) => 0.5 * (1 + Math.tanh((x - c) / wd));
  const sn2f = (x) => R + (P - R) * sg(x, 5, 1.1) + 38 * Math.exp(-(((x - 5) / 1.25) ** 2));
  const sn1f = (x) => R + (I - R) * sg(x, 3.5, 0.6) + (P - I) * sg(x, 7.0, 0.6) + 30 * Math.exp(-(((x - 2.6) / 0.75) ** 2)) + 20 * Math.exp(-(((x - 6.4) / 0.75) ** 2));
  const a = mk(), b = mk();
  const pa = a.plot(sn2f, { stroke: C.blue, width: 2.8 }) + a.tag(5, 104, "transition state", { size: 13, anchor: "middle" }) +
    a.tag(0.2, R + 14, "RX + OH⁻", { size: 13 }) + a.tag(6.4, P - 10, "ROH + X⁻", { size: 13 });
  const pb = b.plot(sn1f, { stroke: C.amber, width: 2.8 }) +
    b.tag(3.2, 100, "slow step (higher peak)", { size: 13, anchor: "start" }) + b.label(5, I - 14, "carbocation R⁺
(intermediate)", { size: 13, anchor: "middle", dy: 4 }) +
    b.tag(0.2, R + 14, "RX", { size: 13 }) + b.tag(6.6, P - 10, "ROH", { size: 13 });
  const body = D.group(a.frame + pa, { translate: [0, 24] }) + D.group(b.frame + pb, { translate: [310, 24] }) +
    D.text(155, 22, "SN2: one step, one peak", { anchor: "middle", size: 14, weight: 700 }) + D.text(465, 22, "SN1: two steps, an intermediate", { anchor: "middle", size: 14, weight: 700 });
  const alt = "Two reaction profiles for halogenoalkane hydrolysis: SN2 has a single peak at the transition state, with the reactants RX and hydroxide passing directly to products; SN1 has two peaks with a dip between them for the carbocation intermediate, and the first step, forming the carbocation, has the higher peak so it is the slow step.";
  const cap = "Figure: SN2 has a transition state; SN1 has a real intermediate and a slow first step";
  await D.figure(F, "sn1-sn2-energy-profiles", D.svg(w, h + 24, body), { alt, caption: cap });
  D.insertAfter(L("halogen/sn1-sn2"), "## Why primary prefers SN2 and tertiary prefers SN1", D.md("sn1-sn2-energy-profiles", alt, cap));
}

// ---- sub-shell energy ladder with orbital boxes: iron, Z = 26
{
  const w = 600, h = 430;
  const rows = [["1s", 1, 2], ["2s", 1, 2], ["2p", 3, 6], ["3s", 1, 2], ["3p", 3, 6], ["4s", 1, 2], ["3d", 5, 6]];
  const yOf = [380, 335, 290, 238, 193, 148, 108];
  let body = D.arrow(40, 400, 40, 56, { width: 2 }) + D.text(48, 62, "Energy (not to scale)", { size: 13, fill: C.muted });
  const bx = 150, bwid = 38;
  rows.forEach(([name, nBox, nEl], i) => {
    const y = yOf[i];
    body += D.text(bx - 12, y + 6, name, { anchor: "end", size: 15, weight: 700 });
    const fill = Array(nBox).fill(0);
    let e = nEl;
    for (let k = 0; k < nBox && e > 0; k += 1) { fill[k] = 1; e -= 1; }
    for (let k = 0; k < nBox && e > 0; k += 1) { fill[k] = 2; e -= 1; }
    fill.forEach((n, k) => {
      const x = bx + k * (bwid + 4);
      body += D.rect(x, y - 16, bwid, 32, { stroke: C.axis, width: 1.8 });
      if (n >= 1) body += D.text(x + (n === 2 ? 11 : bwid / 2), y + 7, "↑", { anchor: "middle", size: 20, weight: 700, fill: C.blue });
      if (n === 2) body += D.text(x + 27, y + 7, "↓", { anchor: "middle", size: 20, weight: 700, fill: C.blue });
    });
  });
  body += D.text(bx + 5 * 42 + 20, yOf[5] + 6, "4s fills before 3d", { size: 14, fill: C.amber, weight: 700 }) +
    D.text(bx + 5 * 42 + 20, yOf[6] - 6, "3d⁶: one pair and", { size: 13 }) + D.text(bx + 5 * 42 + 20, yOf[6] + 12, "four unpaired electrons", { size: 13 }) +
    D.text(300, 424, "Fe: 1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²", { anchor: "middle", size: 14, weight: 700 });
  const alt = "Sub-shell energy ladder for iron (26 electrons) drawn as orbital boxes with spin arrows: 1s, 2s, 2p, 3s and 3p are full, 4s is full and sits slightly below 3d, and the five 3d boxes hold six electrons, one paired and four unpaired, giving 1s2 2s2 2p6 3s2 3p6 3d6 4s2.";
  const cap = "Figure: electron configuration of iron in boxes; 4s is below 3d, and singly occupied boxes fill before pairing";
  await D.figure(F, "orbital-boxes-iron", D.svg(w, h, body), { alt, caption: cap });
  D.insertAfter(L("atoms/orbitals-configurations"), "Filling order up to krypton", D.md("orbital-boxes-iron", alt, cap));
}
