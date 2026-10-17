import { D, C, bx, arr, ln, timeline, factors, place } from "./hlib.mjs";
const F = "history-o";

// ---- 1. Mutapa organisation
{
  const mainX = 176, mainW = 370;
  const k = bx(mainX, 16, mainW, "Mwene Mutapa: supreme ruler, believed to be close to the ancestors; capital inside a wooden palisade", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const court = bx(mainX, k.y + k.h + 38, mainW, "Court: royal relatives, advisers, the queen mother and senior wives, officers of the army, the treasury and the king's household");
  const chiefs = bx(mainX, court.y + court.h + 38, mainW, "Provincial chiefs (relatives or loyal followers): rule outlying areas and relight their fires from the royal fire each year");
  const people = bx(mainX, chiefs.y + chiefs.h + 38, mainW, "Commoners (farmers, herders, miners, craftsmen) and conquered peoples, organised by kinship and totems", { fill: C.fillGrey, stroke: C.axis });
  const med = bx(14, k.y + 30, 140, "Mhondoro mediums: advise the king, help choose a successor, lead rain ceremonies", { fill: C.fillGreen, stroke: C.green });
  let b = k.svg + court.svg + chiefs.svg + people.svg + med.svg;
  for (const [a, c] of [[k, court], [court, chiefs], [chiefs, people]]) {
    b += D.arrow(a.cx - 60, a.y + a.h, c.cx - 60, c.y, { stroke: C.blue, width: 1.8 });
    b += D.arrow(c.cx + 60, c.y, a.cx + 60, a.y + a.h, { stroke: C.amber, width: 1.8 });
  }
  const lab = (a, up) => D.text(mainX + 20, a.y + a.h + 24, "orders", { size: 13, fill: C.blue }) + D.text(mainX + 185 + 68, a.y + a.h + 24, up, { size: 13, fill: C.amber });
  b += lab(k, "tribute") + lab(court, "tribute, soldiers") + lab(chiefs, "tribute, labour");
  b += D.arrow(med.x + med.w, med.cy, k.x, k.y + k.h / 2 + 20, { stroke: C.green, width: 1.8, dash: true });
  const h = people.y + people.h + 16;
  await place(F, "precolonial/mutapa", "## How the state was organised", "mutapa-organisation", D.svg(560, h, b),
    "Organisation chart of the Mutapa state: the Mwene Mutapa rules through a court and provincial chiefs over commoners and conquered peoples, orders go down, tribute and soldiers come up, and mhondoro spirit mediums advise the king.",
    "Figure: how the Mutapa state was organised (political structure)");
}

// ---- 2. Mutapa decline causes
{
  const svg = factors([
    "Succession disputes and civil wars divided the ruling family",
    "Portuguese interference: treaties (1607, 1629), puppet kings, prazos",
    "Provinces broke away (the Changamire line became independent)",
    "Rise of the Rozvi under Changamire Dombo in the later 1600s",
    "Loss of trade income as gold output fell and trade passed to the Portuguese",
    "Nguni invasions in the nineteenth century",
  ], "Decline of the Mutapa state", { rh: 70, fw: 330 });
  await place(F, "precolonial/mutapa", "## Why the Mutapa state declined", "mutapa-decline-causes", svg,
    "Six causes of the decline of the Mutapa state: succession disputes, Portuguese interference, breakaway provinces, the rise of the Rozvi, loss of trade income and Nguni invasions, all feeding into one outcome.",
    "Figure: causes of the decline of the Mutapa state");
}

// ---- 3. Rozvi timeline
{
  const svg = timeline([
    { d: "c. 1450", t: "The Torwa state rises in the south-west; capital at Khami" },
    { d: "1680s", t: "Changamire Dombo takes over the Torwa lands" },
    { d: "1684", t: "Dombo defeats the Portuguese at Maungwe", hi: true },
    { d: "1693", t: "Dombo destroys the Portuguese settlement at Dambarare", hi: true },
    { d: "mid-1690s", t: "Death of Dombo; Portuguese now trade only at fairs on the edge of the plateau" },
    { d: "1830s", t: "Nguni groups cross and raid the Rozvi state; the state collapses" },
    { d: "c. 1838-1840", t: "The Ndebele settle in the south-west" },
  ], { title: "From the Torwa to the Rozvi and the Ndebele" });
  await place(F, "precolonial/rozvi", "## Timeline", "rozvi-timeline", svg,
    "Timeline from the Torwa state of about 1450, through Changamire Dombo's victories at Maungwe in 1684 and Dambarare in 1693, to the Nguni invasions of the 1830s and the Ndebele settlement of about 1838 to 1840.",
    "Figure: timeline of the Torwa and Rozvi states");
}

// ---- 5. Ndebele state structure
{
  const king = bx(150, 16, 260, "King (inkosi): head of state, commander, chief judge, religious leader", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const ind = bx(150, king.y + king.h + 34, 260, "Izinduna: senior officials who govern regiments and areas; the senior ones advise in council");
  const reg = bx(150, ind.y + ind.h + 34, 260, "Regiments (amabutho): each lives in its own regimental town, farms and herds, and fights when called");
  const trib = bx(14, ind.y + 4, 120, "Tributary Shona communities keep their chiefs and pay tribute", { fill: C.fillGrey, stroke: C.axis });
  const inx = bx(426, ind.y + 4, 120, "Inxwala: yearly ceremony renewing the king's authority", { fill: C.fillGreen, stroke: C.green });
  const gw = 168, gy = reg.y + reg.h + 40;
  const zan = bx(14, gy, gw, "Zansi: Nguni from the south (highest)");
  const enh = bx(14 + gw + 10, gy, gw, "Enhla: Sotho and Tswana incorporated on the Highveld (middle)");
  const hol = bx(14 + 2 * (gw + 10), gy, gw, "Hole: Shona incorporated in Zimbabwe (lowest)");
  let b = king.svg + ind.svg + reg.svg + trib.svg + inx.svg + zan.svg + enh.svg + hol.svg;
  b += arr(king.bottom, ind.top, { stroke: C.blue }) + arr(ind.bottom, reg.top, { stroke: C.blue });
  b += D.arrow(trib.cx, trib.y, king.x, king.cy + 10, { stroke: C.amber, width: 1.8 });
  b += D.text(trib.cx + 4, trib.y - 12, "tribute", { size: 12, fill: C.amber });
  b += D.line(inx.cx, inx.y, king.x + king.w, king.cy + 10, { stroke: C.green, width: 1.8, dash: true });
  const hh = gy + Math.max(zan.h, enh.h, hol.h);
  b += D.text(280, gy - 12, "Three social groups: the regiments mixed young men from all three", { anchor: "middle", size: 13 });
  await place(F, "precolonial/ndebele-state", "## Political organisation", "ndebele-state-structure", D.svg(560, hh + 16, b),
    "Chart of the Ndebele state: the king rules through izinduna and regiments living in regimental towns, Shona tributary communities pay tribute, and society has three groups, Zansi, Enhla and Hole.",
    "Figure: organisation of the Ndebele state");
}
