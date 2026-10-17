import { D, C, bx, arr, timeline, factors, place } from "./hlib.mjs";
const F = "history-o";

// ---- 1. League of Nations structure
{
  const top = bx(110, 16, 340, "League of Nations: Covenant, headquarters Geneva, began work 10 January 1920", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const y1 = top.y + top.h + 40;
  const asm = bx(14, y1, 266, "Assembly: every member, one vote, met once a year; discussed policy, admitted members, voted the budget, elected non-permanent Council members");
  const cou = bx(290, y1, 256, "Council: permanent members (at first Britain, France, Italy, Japan) plus elected members; dealt with crises, could apply sanctions; each permanent member could block a decision");
  const y2 = y1 + Math.max(asm.h, cou.h) + 40;
  const w = 128, g = 10;
  const sec = bx(14, y2, w, "Secretariat: civil servants in Geneva; records, reports, administration", { size: 13 });
  const pcij = bx(14 + (w + g), y2, w, "Permanent Court of International Justice: judges at The Hague (from 1922); could not enforce rulings", { size: 13 });
  const ilo = bx(14 + 2 * (w + g), y2, w, "International Labour Organisation: hours, wages, child labour", { size: 13 });
  const com = bx(14 + 3 * (w + g), y2, w, "Commissions: mandates, refugees, slavery, health, disarmament, drugs", { size: 13 });
  const row2 = [sec, pcij, ilo, com];
  const hh = Math.max(...row2.map((b) => b.h));
  let b = top.svg + asm.svg + cou.svg;
  for (const r of row2) b += bx(r.x, r.y, r.w, "", { h: hh }).svg.replace(/<text[\s\S]*$/, "");
  b = top.svg + asm.svg + cou.svg;
  const fixed = [
    ["Secretariat: civil servants in Geneva; records, reports, administration"],
    ["Permanent Court of International Justice: judges at The Hague (from 1922); could not enforce rulings"],
    ["International Labour Organisation: hours, wages, child labour"],
    ["Commissions: mandates, refugees, slavery, health, disarmament, drugs"],
  ].map(([t], i) => bx(14 + i * (w + g), y2, w, t, { size: 13, h: hh }));
  for (const r of fixed) b += r.svg;
  b += D.line(top.cx, top.y + top.h, top.cx, y1 - 20, { stroke: C.axis, width: 1.6 });
  b += D.line(asm.cx, y1 - 20, cou.cx, y1 - 20, { stroke: C.axis, width: 1.6 });
  b += D.arrow(asm.cx, y1 - 20, asm.cx, y1, { stroke: C.axis, width: 1.6 }) + D.arrow(cou.cx, y1 - 20, cou.cx, y1, { stroke: C.axis, width: 1.6 });
  const ty = y2 - 20;
  b += D.text(280, y2 - 12, "Other bodies of the League", { anchor: "middle", size: 14, weight: 700, fill: C.muted });
  await place(F, "league/organisation", "## The structure of the League", "league-organs", D.svg(560, y2 + hh + 16, b),
    "Chart of the League of Nations: the Assembly (all members) and the Council (permanent and elected members), with the Secretariat, Permanent Court of International Justice, International Labour Organisation and commissions below.",
    "Figure: organs of the League of Nations");
}

// ---- 2. UN organs
{
  const top = bx(110, 16, 340, "United Nations: Charter signed 26 June 1945, UN founded 24 October 1945", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const y1 = top.y + top.h + 40;
  const ga = bx(14, y1, 240, "General Assembly: all members, one vote each; discusses any world issue, makes recommendations, approves the budget");
  const sc = bx(264, y1, 282, "Security Council: 15 members, 5 permanent (USA, Britain, France, Russia, China) with a veto and 10 elected for two years; can order sanctions, authorise force, set up peacekeeping");
  const y2 = y1 + Math.max(ga.h, sc.h) + 40;
  const w = 128, g = 10;
  const texts = [
    "Secretariat: staff led by the Secretary-General",
    "International Court of Justice: 15 judges at The Hague",
    "Economic and Social Council: 54 members; co-ordinates economic and social work",
    "Trusteeship Council: suspended its work in 1994",
  ];
  const probe = texts.map((t, i) => bx(14 + i * (w + g), y2, w, t, { size: 13 }));
  const hh = Math.max(...probe.map((p) => p.h));
  const row = texts.map((t, i) => bx(14 + i * (w + g), y2, w, t, { size: 13, h: hh }));
  const ag = bx(14, y2 + hh + 30, 532, "Specialised agencies linked to the UN include WHO, UNICEF, UNESCO, FAO and ILO", { fill: C.fillGreen, stroke: C.green });
  let b = top.svg + ga.svg + sc.svg;
  for (const r of row) b += r.svg;
  b += ag.svg;
  b += D.line(top.cx, top.y + top.h, top.cx, y1 - 20, { stroke: C.axis, width: 1.6 });
  b += D.line(ga.cx, y1 - 20, sc.cx, y1 - 20, { stroke: C.axis, width: 1.6 });
  b += D.arrow(ga.cx, y1 - 20, ga.cx, y1, { stroke: C.axis, width: 1.6 }) + D.arrow(sc.cx, y1 - 20, sc.cx, y1, { stroke: C.axis, width: 1.6 });
  const ty = y2 - 20;
  b += D.text(280, y2 - 12, "Other main organs", { anchor: "middle", size: 14, weight: 700, fill: C.muted });
  b += D.line(row[2].cx, y2 + hh, row[2].cx, ag.y, { stroke: C.green, width: 1.6, dash: true });
  await place(F, "cooperation/united-nations", "## Structure: the main organs", "un-organs", D.svg(560, ag.y + ag.h + 16, b),
    "Chart of the main organs of the United Nations: the General Assembly and the Security Council (five permanent members with a veto), with the Secretariat, International Court of Justice, Economic and Social Council and Trusteeship Council, and the specialised agencies WHO, UNICEF, UNESCO, FAO and ILO.",
    "Figure: main organs of the United Nations");
}

// ---- 3. OAU to AU organs side by side
{
  const colW = 262;
  const col = (x, title, rows, fill, stroke) => {
    let out = bx(x, 16, colW, title, { fill, stroke, bold: true });
    let y = out.y + out.h + 12;
    let svg = out.svg;
    for (const r of rows) {
      const bb = bx(x, y, colW, r, { size: 13, fill: C.fillGrey, stroke: C.axis });
      svg += bb.svg;
      y += bb.h + 8;
    }
    return { svg, bottom: y };
  };
  const o = col(14, "OAU (1963-2002)", [
    "Assembly of Heads of State and Government: supreme organ, met once a year",
    "Council of Ministers: foreign ministers",
    "General Secretariat (Addis Ababa), led by the Secretary-General",
    "Commission of Mediation, Conciliation and Arbitration",
    "Specialised commissions (economic and social, education and culture, health, defence)",
  ], C.fillAmber, C.amber);
  const a = col(284, "African Union (from 2002)", [
    "Assembly: Heads of State and Government, supreme organ",
    "Executive Council: ministers co-ordinate policy",
    "AU Commission (Addis Ababa), led by a Chairperson",
    "Pan-African Parliament (Midrand, South Africa): consultative",
    "Peace and Security Council: decides on conflicts and peace-support operations",
    "African Court on Human and Peoples' Rights",
    "Economic, Social and Cultural Council: civil society",
  ], C.fillBlue, C.blue);
  const h = Math.max(o.bottom, a.bottom) + 6;
  await place(F, "cooperation/oau-au", "## Organs of the OAU", "oau-au-organs", D.svg(560, h, o.svg + a.svg),
    "Two lists side by side: the five organs of the OAU (Assembly, Council of Ministers, General Secretariat, Commission of Mediation, specialised commissions) and the seven organs of the African Union, which adds a Pan-African Parliament, Peace and Security Council, Court and civil-society council.",
    "Figure: organs of the OAU compared with the African Union");
}

// ---- 4. SADC organs
{
  const top = bx(110, 16, 340, "SADC (Treaty signed at Windhoek, 17 August 1992)", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const y1 = top.y + top.h + 40;
  const summit = bx(130, y1, 300, "Summit of Heads of State and Government: supreme policy-making body, meets every year", { bold: true });
  const y2 = summit.y + summit.h + 40;
  const w = 128, g = 10;
  const t = [
    "Organ on Politics, Defence and Security Co-operation",
    "Council of Ministers: oversees how policies are carried out",
    "Secretariat (Gaborone), led by the Executive Secretary",
    "SADC Tribunal: suspended in 2010, role later reduced",
  ];
  const probe = t.map((s, i) => bx(14 + i * (w + g), y2, w, s, { size: 13 }));
  const hh = Math.max(...probe.map((p) => p.h));
  const row = t.map((s, i) => bx(14 + i * (w + g), y2, w, s, { size: 13, h: hh }));
  const nc = bx(14, y2 + hh + 30, 532, "National Committees link SADC with each member country", { fill: C.fillGreen, stroke: C.green, size: 13 });
  let b = top.svg + summit.svg + row.map((r) => r.svg).join("") + nc.svg;
  b += D.arrow(top.cx, top.y + top.h, summit.cx, summit.y, { stroke: C.axis, width: 1.6 });
  const ty = y2 - 20;
  b += D.line(summit.cx, summit.y + summit.h, summit.cx, ty, { stroke: C.axis, width: 1.6 });
  b += D.line(row[0].cx, ty, row[3].cx, ty, { stroke: C.axis, width: 1.6 });
  for (const r of row) b += D.arrow(r.cx, ty, r.cx, y2, { stroke: C.axis, width: 1.6 });
  await place(F, "cooperation/sadc", "## Structure in outline", "sadc-organs", D.svg(560, nc.y + nc.h + 16, b),
    "Chart of SADC organs: the Summit of Heads of State and Government is the supreme body, with the Organ on Politics, Defence and Security, the Council of Ministers, the Secretariat in Gaborone and the SADC Tribunal, and National Committees in each member state.",
    "Figure: organs of SADC");
}
