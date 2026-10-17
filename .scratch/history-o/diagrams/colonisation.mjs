import { D, C, bx, arr, timeline, factors, place } from "./hlib.mjs";
const F = "history-o";

// ---- 1. Treaties and concessions timeline (occupation)
await place(F, "colonisation/occupation", "## Timeline", "treaties-to-occupation-timeline", timeline([
  { d: "July 1887", t: "Grobler Treaty with the South African Republic" },
  { d: "February 1888", t: "Moffat Treaty: Lobengula places his kingdom in the British sphere of influence" },
  { d: "30 October 1888", t: "Rudd Concession: mining rights granted; verbal promises not written down", hi: true },
  { d: "1889", t: "Lobengula's envoys Babayane and Mshete visit London" },
  { d: "29 October 1889", t: "Royal Charter granted to the British South Africa Company", hi: true },
  { d: "June-September 1890", t: "The Pioneer Column marches to Mashonaland" },
  { d: "12 September 1890", t: "Flag raised at Fort Salisbury", hi: true },
], { title: "From the Grobler Treaty to Fort Salisbury", dateW: 140 }),
  "Timeline of colonisation: Grobler Treaty (July 1887), Moffat Treaty (February 1888), Rudd Concession (30 October 1888), Royal Charter (29 October 1889) and the flag raised at Fort Salisbury on 12 September 1890.",
  "Figure: treaties, concession and occupation, 1887-1890");

// ---- 2. Pioneer Column route (schematic)
{
  const w = 560, h = 520;
  let b = D.rect(0, 0, w, h, { fill: "#fff", stroke: C.grid, width: 1 });
  b += D.text(14, 28, "The Pioneer Column, June-September 1890", { size: 16, weight: 700 });
  b += D.polyline([[20, 70], [140, 84], [260, 66], [400, 82], [540, 64]], { stroke: C.teal, width: 2.4 });
  b += D.text(540, 56, "Zambezi River", { anchor: "end", size: 13, fill: C.teal });
  b += D.polyline([[20, 430], [150, 414], [280, 436], [420, 418], [540, 430]], { stroke: C.teal, width: 2.4 });
  b += D.text(540, 456, "Limpopo River", { anchor: "end", size: 13, fill: C.teal });
  b += D.rect(24, 110, 190, 270, { fill: C.fillAmber, stroke: C.amber, dash: true, r: 14 });
  b += D.text(119, 146, "MATABELELAND\n(Lobengula's kingdom)", { anchor: "middle", size: 13, weight: 700, fill: C.amber });
  b += D.dot(110, 240, { r: 5 }) + D.text(120, 245, "koBulawayo", { size: 13 });
  b += D.text(420, 118, "MASHONALAND", { anchor: "middle", size: 14, weight: 700, fill: C.blue });
  b += D.text(14, 48, "Schematic, not to scale: positions are approximate.", { size: 12, fill: C.muted });
  const pts = [[150, 490, "Macloutsie (Bechuanaland),\nJune 1890"], [235, 405, "Fort Tuli"], [330, 310, "Fort Victoria"], [385, 220, "Fort Charter"], [430, 150, "Fort Salisbury,\n12 September 1890"]];
  for (let i = 0; i < pts.length - 1; i += 1) b += D.arrow(pts[i][0], pts[i][1] - (i === 0 ? 4 : 0), pts[i + 1][0] - (i === 0 ? -2 : 0), pts[i + 1][1] + 8, { stroke: C.blue, width: 2.6 });
  for (const [x, y] of pts) b += D.dot(x, y, { r: 6, stroke: C.blue, fill: C.blue });
  b += D.text(165, 476, "Macloutsie (Bechuanaland),\nJune 1890", { size: 13 });
  b += D.text(250, 400, "Fort Tuli", { size: 13 });
  b += D.text(345, 306, "Fort Victoria", { size: 13 });
  b += D.text(400, 218, "Fort Charter", { size: 13 });
  b += D.text(418, 134, "Fort Salisbury,", { size: 13, weight: 700, anchor: "end" }) + D.text(418, 150, "12 September 1890", { size: 13, weight: 700, anchor: "end" });
  b += D.text(345, 372, "The column went round the\neast of Matabeleland and\ndid not enter it", { size: 12, fill: C.muted });
  await place(F, "colonisation/occupation", "## The occupation of Mashonaland (1890)", "pioneer-column-route", D.svg(w, h, b),
    "Schematic map of the Pioneer Column of 1890: from Macloutsie in Bechuanaland past Fort Tuli, Fort Victoria and Fort Charter to Fort Salisbury, keeping to the east of Matabeleland and avoiding the Ndebele heartland.",
    "Figure: route of the Pioneer Column to Fort Salisbury (schematic, not to scale)");
}

// ---- 3. Scramble and Berlin timeline
await place(F, "colonisation/scramble-berlin", "## Timeline", "scramble-timeline", timeline([
  { d: "1867", t: "Diamonds found near Kimberley" },
  { d: "1884", t: "Germany claims South West Africa" },
  { d: "Nov 1884 to Feb 1885", t: "Berlin Conference", hi: true },
  { d: "1885", t: "Bechuanaland becomes a British protectorate" },
  { d: "1886", t: "Gold found on the Witwatersrand" },
  { d: "1889", t: "Royal Charter granted to Rhodes's British South Africa Company" },
  { d: "1890", t: "British Ultimatum forces Portugal to give up claims to the land between Angola and Mozambique" },
  { d: "1891", t: "Anglo-Portuguese Treaty fixes the border between Mozambique and British territory" },
], { title: "The scramble for southern Africa", dateW: 160 }),
  "Timeline of the scramble for southern Africa from the Kimberley diamonds of 1867 and the Berlin Conference of 1884-85 to the British Ultimatum of 1890 and the Anglo-Portuguese Treaty of 1891.",
  "Figure: key events in the scramble for southern Africa, 1867-1891");

// ---- 4. Anglo-Ndebele war timeline
await place(F, "colonisation/anglo-ndebele-war", "## The course of the war", "anglo-ndebele-war-timeline", timeline([
  { d: "July 1893", t: "Victoria incident near Fort Victoria" },
  { d: "August 1893", t: "Victoria Agreement promises land, gold claims and cattle to volunteers" },
  { d: "October 1893", t: "Columns from Fort Salisbury and Fort Victoria advance into Matabeleland" },
  { d: "Late October 1893", t: "Battle of Shangani: Ndebele attacks on the laager beaten back by machine-gun fire" },
  { d: "1 November 1893", t: "Battle of Bembesi: heavy Ndebele losses" },
  { d: "4 November 1893", t: "Company forces enter Bulawayo, already burnt on Lobengula's orders", hi: true },
  { d: "4 December 1893", t: "The Shangani Patrol is wiped out near the Shangani River" },
  { d: "Early 1894", t: "Death of Lobengula in the north" },
], { title: "The Anglo-Ndebele War, 1893-94", dateW: 140 }),
  "Timeline of the Anglo-Ndebele War from the Victoria incident of July 1893, through the battles of Shangani and Bembesi, to the entry into Bulawayo on 4 November 1893 and Lobengula's death in early 1894.",
  "Figure: timeline of the Anglo-Ndebele War, 1893-94");

// ---- 5. First Chimurenga causes
{
  const g = C.fillGrey, a = C.fillAmber, gr = C.fillGreen;
  const svg = factors([
    { t: "Land: settlers took the best land; Ndebele pushed into Gwaai and Shangani reserves" },
    { t: "Cattle: most Ndebele cattle seized after 1893-94" },
    { t: "Forced labour for farms, mines and roads" },
    { t: "Hut tax (1894) collected harshly" },
    { t: "Native Police abused their power; chiefs and indunas lost authority" },
    { t: "Triggers 1896: rinderpest, drought and locusts", fill: a, stroke: C.amber },
    { t: "Opportunity: Jameson Raid (Dec 1895 to Jan 1896) took the police away", fill: gr, stroke: C.green },
  ], "Risings of 1896-97", { fw: 330, rh: 90, title: "Causes of the 1896-97 risings" });
  await place(F, "colonisation/first-chimurenga", "## Causes of the risings", "first-chimurenga-causes", svg,
    "Causes of the 1896-97 risings: long-term grievances (land, cattle, forced labour, hut tax, Native Police), the 1896 triggers (rinderpest, drought, locusts) and the opportunity created by the Jameson Raid, which led to the risings.",
    "Figure: grievances (grey), triggers (amber) and opportunity (green) behind the 1896-97 risings");
}

// ---- 6. First Chimurenga course timeline
await place(F, "colonisation/first-chimurenga", "## The course of the risings", "first-chimurenga-timeline", timeline([
  { d: "Dec 1895 to Jan 1896", t: "Jameson Raid; most Company police leave the country" },
  { d: "March 1896", t: "Rising begins in Matabeleland; settlers gather in laagers", hi: true },
  { d: "June 1896", t: "Rising spreads to Mashonaland", hi: true },
  { d: "Aug to Oct 1896", t: "Rhodes holds indabas with Ndebele leaders in the Matopo hills" },
  { d: "1897", t: "Shona communities fight on from fortified hills and caves until overcome one by one" },
  { d: "April 1898", t: "Execution of Nehanda and Kaguvi" },
], { title: "The course of the risings", dateW: 140 }),
  "Timeline of the 1896-97 risings: the Jameson Raid, the Matabeleland rising in March 1896, the spread to Mashonaland in June, the Matopo indabas of August to October 1896 and the executions of April 1898.",
  "Figure: timeline of the First Chimurenga/Umvukela");
