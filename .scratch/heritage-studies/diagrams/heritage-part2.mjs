// heritage-studies-o diagrams, part 2 (imported by heritage-o.mjs would be circular; run separately).
// Run from the repo root: node .scratch/heritage-studies/diagrams/heritage-part2.mjs
import * as D from "../../tools/diagram-kit.mjs";
import { lessonPath, wrap, stack, vTimeline, insertAfterBlock } from "../../english/diagrams/_h.mjs";
const { C } = D;
const FAM = "heritage-studies-o";
const put = async (name, svg, alt, cap, lesson, after) => {
  await D.figure(FAM, name, svg, { alt, caption: cap });
  insertAfterBlock(lessonPath(FAM, lesson), after, D.md(name, alt, cap));
};

// 3. Second Chimurenga key dates (liberation/second-chimurenga.md)
await put("second-chimurenga-timeline", vTimeline([
  { date: "11 November 1965", text: "UDI: Smith declares independence from Britain." },
  { date: "28 April 1966", text: "Battle of Chinhoyi." },
  { date: "21 December 1972", text: "Attack on Altena Farm." },
  { date: "9 August 1976", text: "Nyadzonia." },
  { date: "23 November 1977", text: "Chimoio." },
  { date: "19 October 1978", text: "Freedom Camp." },
  { date: "21 December 1979", text: "Lancaster House Agreement signed." },
  { date: "18 April 1980", text: "Independence." },
], { w: 580, dateW: 190, note: "Not drawn to scale." }),
  "Timeline of the Second Chimurenga: UDI on 11 November 1965, Battle of Chinhoyi 28 April 1966, Altena Farm 21 December 1972, Nyadzonia 9 August 1976, Chimoio 23 November 1977, Freedom Camp 19 October 1978, Lancaster House Agreement signed 21 December 1979 and independence on 18 April 1980.",
  "Figure: key dates of the Second Chimurenga, 1965 to 1980 (not to scale)", "liberation/second-chimurenga.md", ":::keyfact{title=\"Dates to learn\"}");

// 4. constitution timeline (constitution/lancaster-to-2013.md)
await put("constitution-timeline", vTimeline([
  { date: "Sept-Dec 1979", text: "Lancaster House conference in London; agreement signed 21 December 1979." },
  { date: "18 April 1980", text: "Independence under the Lancaster House constitution." },
  { date: "1987", text: "Reserved seats for whites abolished; executive presidency replaces the ceremonial President and Prime Minister." },
  { date: "1990", text: "Senate abolished, leaving a single house of Parliament." },
  { date: "February 2000", text: "Draft constitution rejected in a referendum." },
  { date: "2005", text: "A Senate is brought back." },
  { date: "2008-09", text: "Global Political Agreement (2008); COPAC consultations from 2009." },
  { date: "16 March 2013", text: "Draft approved in a referendum." },
  { date: "22 May 2013", text: "New Constitution signed into law." },
], { w: 580, dateW: 170, note: "Not drawn to scale." }),
  "Timeline from the Lancaster House constitution to 2013: conference and agreement of 21 December 1979, independence on 18 April 1980, reserved seats abolished and executive presidency in 1987, Senate abolished 1990, draft rejected February 2000, Senate brought back 2005, Global Political Agreement 2008 and COPAC from 2009, referendum approval 16 March 2013 and signing on 22 May 2013.",
  "Figure: from Lancaster House to the 2013 Constitution (not to scale)", "constitution/lancaster-to-2013.md", "| Date | Change (in outline) |");

// 5. three arms of government (governance/central-government.md)
{
  const arms = [
    ["Executive", "Chapter 5", "President, Vice-Presidents, Cabinet, ministries and civil service", "Carries out laws and policies; prepares the budget; conducts foreign relations", C.fillBlue],
    ["Legislature", "Chapter 6", "Parliament: the Senate and the National Assembly", "Makes laws; approves the budget and taxes; oversees the Executive", C.fillAmber],
    ["Judiciary", "Chapter 8", "Judges and magistrates; headed by the Chief Justice", "Interprets laws; settles disputes; decides whether laws and actions follow the Constitution", C.fillGreen],
  ];
  let b = D.text(290, 22, "Separation of powers under the 2013 Constitution", { anchor: "middle", weight: 700 });
  arms.forEach(([n, ch, who, what, f], i) => {
    const x = 20 + i * 184;
    b += D.rect(x, 40, 172, 330, { fill: f, r: 8, width: 1.6 });
    b += D.text(x + 86, 68, n, { anchor: "middle", weight: 700, size: 16 }) + D.text(x + 86, 88, ch, { anchor: "middle", size: 13, fill: C.muted });
    b += D.text(x + 10, 120, "Who", { weight: 700, size: 13 }) + D.text(x + 10, 138, wrap(who, 22), { size: 13 });
    b += D.text(x + 10, 230, "Main functions", { weight: 700, size: 13 }) + D.text(x + 10, 248, wrap(what, 22), { size: 13 });
  });
  b += D.text(290, 396, "Each arm can check the others, so that no single arm holds all power.", { anchor: "middle", size: 13, fill: C.muted });
  await put("three-arms-of-government", D.svg(580, 410, b),
    "The three arms of government under the 2013 Constitution: the Executive (Chapter 5: President, Vice-Presidents, Cabinet and civil service), the Legislature (Chapter 6: Parliament, made up of the Senate and National Assembly) and the Judiciary (Chapter 8: judges and magistrates headed by the Chief Justice); each checks the others.",
    "Figure: the three arms of central government and their main functions", "governance/central-government.md", "## The three arms at a glance");
}

// 6. traditional leadership hierarchy (precolonial/political-structures.md)
{
  const rows = [
    ["King or\nparamount ruler","Shona: mambo (the Mutapa or Rozvi rulers). Ndebele: inkosi. Ruled the whole state; controlled land, trade and the army.", C.fillAmber],
    ["Chief", "Shona: ishe / mambo of a chiefdom. Ndebele: inkosi / induna. Allocated land; judged serious cases; led rain and harvest ceremonies.", C.fillBlue],
    ["Headman", "Shona: sadunhu. Ndebele: induna of a smaller area. Ruled a ward (dunhu) under the chief; settled disputes.", C.fillBlue],
    ["Village head", "Shona: sabhuku. Led a village; settled small disputes; welcomed newcomers; reported births and deaths.", C.fillGreen],
  ];
  const { svg } = stack(rows, { w: 580, labelW: 150, chars: 52, gap: 22 });
  await put("indigenous-leadership-hierarchy", svg,
    "Hierarchy of indigenous leaders from top to bottom: king or paramount ruler (mambo, inkosi), chief (ishe, inkosi or induna), headman (sadunhu, induna of a smaller area) and village head (sabhuku), each with its own area and roles.",
    "Figure: the hierarchy of indigenous leaders, from king to village head", "precolonial/political-structures.md", "## The hierarchy of indigenous leaders");
}

// 7. Great Zimbabwe and Mutapa dates (precolonial/great-zimbabwe-mutapa.md)
await put("great-zimbabwe-mutapa-timeline", vTimeline([
  { date: "1100s", text: "Great Zimbabwe begins to grow." },
  { date: "About 1300-1450 CE", text: "Great Zimbabwe at its height." },
  { date: "Fifteenth century", text: "The Mutapa state is founded in northern Zimbabwe." },
  { date: "1986", text: "Great Zimbabwe becomes a UNESCO World Heritage Site." },
], { w: 580, dateW: 190, note: "Approximate dates; not drawn to scale." }),
  "Timeline of Great Zimbabwe and the Mutapa state: Great Zimbabwe grew from the 1100s and was at its height between about 1300 and 1450 CE, the Mutapa state was founded in the fifteenth century in northern Zimbabwe, and Great Zimbabwe became a World Heritage Site in 1986.",
  "Figure: approximate dates for Great Zimbabwe and the Mutapa state (not to scale)", "precolonial/great-zimbabwe-mutapa.md", ":::keyfact{title=\"Key facts (approximate dates)\"}");

// 8. schematic map of the five World Heritage Sites (heritage/world-heritage-sites.md)
{
  const sites = [
    ["Victoria Falls", 1989, "natural", 70, 130, "start"],
    ["Mana Pools, Sapi and Chewore", 1984, "natural", 380, 110, "end"],
    ["Khami", 1986, "cultural", 70, 245, "start"],
    ["Matobo Hills", 2003, "cultural", 190, 345, "start"],
    ["Great Zimbabwe", 1986, "cultural", 530, 330, "end"],
  ];
  let b = D.text(20, 26, "Schematic map: positions are approximate, not to scale", { size: 13, fill: C.muted, italic: true });
  b += D.path_("M30,70 C150,60 250,80 330,62 C430,45 500,70 560,66", { stroke: C.teal, width: 5 });
  b += D.text(560, 54, "Zambezi River (north)", { anchor: "end", size: 13, fill: C.teal, weight: 700 });
  b += D.text(30, 54, "Zambia", { size: 13, fill: C.muted }) + D.text(30, 96, "Zimbabwe", { size: 13, fill: C.muted, weight: 700 });
  const towns = [["Bulawayo", 160, 285], ["Masvingo", 440, 300]];
  towns.forEach(([n, x, y]) => (b += D.rect(x - 5, y - 5, 10, 10, { fill: "#ffffff", width: 1.6 }) + D.text(x + 10, y + 5, n, { size: 13, fill: C.muted })));
  sites.forEach(([n, yr, t, x, y, a]) => {
    const fill = t === "natural" ? C.green : C.amber;
    b += D.circle(x, y, 8, { fill, stroke: C.ink, width: 1.5 });
    b += D.text(a === "start" ? x + 14 : x - 14, y - 2, n, { anchor: a, size: 14, weight: 700 });
    b += D.text(a === "start" ? x + 14 : x - 14, y + 15, `${t}, ${yr}`, { anchor: a, size: 13, fill: C.muted });
  });
  b += D.circle(40, 392, 7, { fill: C.green, stroke: C.ink, width: 1.5 }) + D.text(54, 397, "natural site", { size: 13 });
  b += D.circle(160, 392, 7, { fill: C.amber, stroke: C.ink, width: 1.5 }) + D.text(174, 397, "cultural site", { size: 13 });
  b += D.text(540, 397, "N ↑", { anchor: "end", size: 14, weight: 700 });
  await put("world-heritage-sites-schematic-map", D.svg(580, 410, b),
    "Schematic map of Zimbabwe's five World Heritage Sites, not to scale: Victoria Falls (natural, 1989) on the Zambezi in the north-west, Mana Pools, Sapi and Chewore (natural, 1984) in the Middle Zambezi valley, Khami (cultural, 1986) near Bulawayo, Matobo Hills (cultural, 2003) south of Bulawayo and Great Zimbabwe (cultural, 1986) near Masvingo.",
    "Figure: where Zimbabwe's five World Heritage Sites lie (schematic, not to scale)", "heritage/world-heritage-sites.md", "## Zimbabwe's World Heritage Sites");
}
