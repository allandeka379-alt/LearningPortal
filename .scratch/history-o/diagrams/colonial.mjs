import { D, C, bx, arr, timeline, factors, place } from "./hlib.mjs";
const F = "history-o";

// ---- 1. BSAC administration after 1898
{
  const crown = bx(14, 16, 236, "British government: grants the Royal Charter (29 October 1889)", { fill: C.fillGrey, stroke: C.axis });
  const bsac = bx(310, 16, 236, "British South Africa Company: rules Southern Rhodesia 1890-1923", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const rc = bx(14, crown.y + crown.h + 30, 236, "Resident Commissioner (1898): British official who watches the Company, especially its treatment of Africans", { fill: C.fillGreen, stroke: C.green });
  const y2 = Math.max(rc.y + rc.h, bsac.y + bsac.h) + 46;
  const w3 = 176;
  const adm = bx(14, y2, w3, "Administrator: chief official (Jameson, 1891-96)");
  const leg = bx(14 + w3 + 9, y2, w3, "Legislative Council (1898): members nominated by the Company and elected by settlers");
  const nad = bx(14 + 2 * (w3 + 9), y2, w3, "Native Affairs Department");
  const nc = bx(nad.x, y2 + Math.max(adm.h, leg.h, nad.h) + 34, w3, "Native Commissioners in each district: collect tax, recruit labour, hear cases, control chiefs", { fill: C.fillGrey, stroke: C.axis });
  let b = crown.svg + bsac.svg + rc.svg + adm.svg + leg.svg + nad.svg + nc.svg;
  b += arr(crown.right, bsac.left, { stroke: C.blue });
  b += D.text(280, 14 + 12 - 22 + 40, "", {});
  b += D.arrow(crown.cx, crown.y + crown.h, rc.cx, rc.y, { stroke: C.blue, width: 1.8 });
  b += D.line(rc.right[0], rc.cy, bsac.x + 30, rc.cy, { stroke: C.green, width: 1.8, dash: true });
  b += D.arrow(bsac.x + 30, rc.cy, bsac.x + 30, bsac.y + bsac.h + 2, { stroke: C.green, width: 1.8, dash: true });
  b += D.text(bsac.x + 38, rc.cy - 8, "oversight", { size: 12, fill: C.green });
  for (const t of [adm, leg, nad]) b += D.line(bsac.cx, bsac.y + bsac.h, bsac.cx, y2 - 18, { stroke: C.axis, width: 1.6 }) + "" ;
  b += D.line(adm.cx, y2 - 18, nad.cx, y2 - 18, { stroke: C.axis, width: 1.6 });
  for (const t of [adm, leg, nad]) b += D.arrow(t.cx, y2 - 18, t.cx, y2, { stroke: C.axis, width: 1.6 });
  b += arr(nad.bottom, nc.top, { stroke: C.blue });
  await place(F, "colonial/company-rule", "### Political structure", "bsac-administration", D.svg(560, nc.y + nc.h + 16, b),
    "Chart of Company government after the 1898 Order in Council: the British government's Royal Charter gave the BSAC power, the Resident Commissioner supervised it, and the Company governed through an Administrator, a Legislative Council and a Native Affairs Department with Native Commissioners.",
    "Figure: how the BSAC governed Southern Rhodesia after 1898");
}

// ---- 2. Federation timeline
await place(F, "colonial/federation", "## Steps to federation", "federation-timeline", timeline([
  { d: "1949", t: "Settler leaders meet at Victoria Falls to discuss closer union" },
  { d: "1951", t: "Officials' conference in London; second Victoria Falls conference" },
  { d: "1952-1953", t: "London conferences draft the federal constitution" },
  { d: "April 1953", t: "Referendum in Southern Rhodesia approves federation", hi: true },
  { d: "1953", t: "Federation established; Huggins becomes Federal Prime Minister", hi: true },
  { d: "1955-1959", t: "Kariba Dam built on the Zambezi" },
  { d: "Feb-Mar 1959", t: "States of emergency in Southern Rhodesia and Nyasaland" },
  { d: "1960", t: "Monckton Commission reports" },
  { d: "1962-1963", t: "Britain accepts the right of Nyasaland and Northern Rhodesia to secede" },
  { d: "31 Dec 1963", t: "Federation dissolved", hi: true },
], { title: "The Federation of Rhodesia and Nyasaland", dateW: 130 }),
  "Timeline of the Federation of Rhodesia and Nyasaland: conferences from 1949, the Southern Rhodesian referendum of April 1953, Kariba Dam in 1955-59, emergencies in 1959 and dissolution on 31 December 1963.",
  "Figure: timeline of the Federation, 1949-1963");

// ---- 3. UDI timeline
await place(F, "colonial/udi", "## Reactions to UDI", "udi-timeline", timeline([
  { d: "11 Nov 1965", t: "UDI declared by Ian Smith's government", hi: true },
  { d: "1965-1966", t: "Britain declares UDI illegal and imposes sanctions, including an oil embargo" },
  { d: "Dec 1966", t: "HMS Tiger talks fail; NIBMAR adopted; UN mandatory sanctions on key goods" },
  { d: "1968", t: "HMS Fearless talks fail; UN extends sanctions to almost all trade" },
  { d: "1969", t: "New constitution and Land Tenure Act approved" },
  { d: "2 March 1970", t: "Rhodesia declares itself a republic", hi: true },
  { d: "1971", t: "Smith-Home proposals agreed by the two governments" },
  { d: "1972", t: "Pearce Commission reports that Africans reject the proposals" },
], { title: "UDI and its aftermath, 1965-1972", dateW: 124 }),
  "Timeline from the Unilateral Declaration of Independence on 11 November 1965 through sanctions, the failed HMS Tiger and Fearless talks and the 1969 constitution to the 1970 republic and the Pearce Commission of 1972.",
  "Figure: timeline of UDI, 1965-1972");

// ---- 4. Nationalist parties chain
{
  const cw = 300, x = 14;
  const items = [
    ["City Youth League formed 1955", "bus boycott in Salisbury, 1956"],
    ["SRANC formed 12 September 1957", "banned 26 February 1959; hundreds detained"],
    ["NDP formed 1 January 1960", "banned 9 December 1961"],
    ["ZAPU formed 17 December 1961", "banned September 1962"],
  ];
  let y = 40, b = D.text(280, 24, "Nationalist parties, 1957-1964", { anchor: "middle", size: 16, weight: 700 });
  const boxes = [];
  for (const [n, note] of items) {
    const bb = bx(90, y, 380, n + "\n" + note, { fill: C.fillBlue, minH: 40 });
    boxes.push(bb); b += bb.svg;
    y += bb.h + 44;
  }
  const last = boxes.at(-1);
  const zanu = bx(x, y, 250, "ZANU formed 8 August 1963 (split from ZAPU leadership)", { fill: C.fillBlue, bold: true, minH: 40 });
  const pcc = bx(x + 296, y, 250, "People's Caretaker Council (ZAPU supporters continue, 1963)", { fill: C.fillBlue, bold: true, minH: 40 });
  b += zanu.svg + pcc.svg;
  for (let i = 0; i < boxes.length - 1; i += 1) b += arr(boxes[i].bottom, boxes[i + 1].top, { stroke: C.blue });
  b += D.arrow(last.cx - 40, last.y + last.h, zanu.cx + 40, zanu.y, { stroke: C.blue, width: 1.8 });
  b += D.arrow(last.cx + 40, last.y + last.h, pcc.cx, pcc.y, { stroke: C.blue, width: 1.8 });
  b += D.text(280, zanu.y + Math.max(zanu.h, pcc.h) + 30, "ZANU and the PCC were both banned in August 1964; leaders were detained or restricted.", { anchor: "middle", size: 13, fill: C.red });
  b += D.text(14, zanu.y - 14, "", {});
  await place(F, "liberation/nationalist-movements", "## The movements", "nationalist-parties-chain", D.svg(560, zanu.y + Math.max(zanu.h, pcc.h) + 46, b),
    "Chart of the nationalist parties: SRANC (1957, banned 1959), NDP (1960, banned 1961), ZAPU (1961, banned 1962), then ZANU (1963) and the People's Caretaker Council, both banned in August 1964.",
    "Figure: each nationalist party was banned and replaced, 1957-1964");
}

// ---- 5. Second phase timeline
await place(F, "liberation/second-phase", "## Main events", "second-phase-timeline", timeline([
  { d: "21 Dec 1972", t: "ZANLA attack on Altena Farm, Centenary", hi: true },
  { d: "1973", t: "Rhodesia introduces collective fines and begins protected villages" },
  { d: "1974-1975", t: "Detente: leaders released; ceasefire efforts fail" },
  { d: "25 June 1975", t: "Mozambique becomes independent" },
  { d: "1976", t: "Mozambique closes its border with Rhodesia (March); Patriotic Front formed (October)" },
  { d: "9 Aug 1976", t: "Raid on Nyadzonia camp" },
  { d: "23 Nov 1977", t: "Raid on Chimoio" },
  { d: "1978", t: "ZIPRA shoots down an Air Rhodesia civilian aircraft (September); Freedom Camp raid (October)" },
  { d: "1979", t: "War at its height; martial law over most of the country; Lancaster House conference" },
], { title: "The second phase of the armed struggle, 1972-1979", dateW: 124 }),
  "Timeline of the second phase of the armed struggle from the Altena Farm attack of 21 December 1972 and Mozambique's independence in 1975 to the Patriotic Front of 1976, the camp raids of 1976-78 and the Lancaster House conference of 1979.",
  "Figure: timeline of the second phase, 1972-1979");

// ---- 6. 1980 election bars
{
  const svg = D.barChart([
    { label: "ZANU-PF", value: 57, fill: C.blue },
    { label: "PF-ZAPU", value: 20, fill: C.amber },
    { label: "UANC", value: 3, fill: C.purple },
  ], { w: 480, h: 340, yMax: 80, yLabel: "Common-roll seats (of 80)", yTicks: [0, 20, 40, 60, 80] });
  await place(F, "independence/reconciliation", "| UANC (Abel Muzorewa) | 3 |", "election-1980-seats", svg,
    "Bar chart of the 1980 common-roll election: ZANU-PF won 57 of the 80 seats, PF-ZAPU 20 and the UANC 3; the 20 white-roll seats all went to the Rhodesian Front.",
    "Figure: common-roll seats won in the February 1980 election (of 80)");
}

// ---- 7. Road to independence timeline
await place(F, "independence/reconciliation", "## Events leading to independence", "road-to-independence-timeline", timeline([
  { d: "21 Dec 1979", t: "Lancaster House Agreement signed", hi: true },
  { d: "Late Dec 1979", t: "Ceasefire begins; guerrillas move to assembly points" },
  { d: "Jan-Feb 1980", t: "Refugees and exiled leaders return; election campaign" },
  { d: "27-29 Feb 1980", t: "Common-roll elections" },
  { d: "4 March 1980", t: "Results announced; Mugabe asked to form a government" },
  { d: "18 April 1980", t: "Independence celebrated at Rufaro Stadium", hi: true },
  { d: "1980-1981", t: "Integration of the three armies begins" },
  { d: "18 April 1982", t: "Salisbury renamed Harare" },
], { title: "The road to independence, 1979-1982", dateW: 132 }),
  "Timeline from the Lancaster House Agreement of 21 December 1979 and the common-roll elections of 27-29 February 1980 to independence on 18 April 1980 and the renaming of Salisbury as Harare in 1982.",
  "Figure: timeline of the road to independence");
