import { D, C, bx, arr, timeline, factors, place } from "../../history-o/diagrams/hlib.mjs";
const F = "history-a";
const T = (lesson, after, name, title, items, dateW, alt, caption) => place(F, lesson, after, name, timeline(items, { title, dateW }), alt, caption);

await T("precolonial/mutapa", "## Relations with the Portuguese", "mutapa-timeline", "The Mutapa state and the Portuguese", [
  { d: "c. 1430-1450", t: "Mutota moves north from Great Zimbabwe (approximate)" },
  { d: "c. 1450-1480", t: "Matope expands the state (approximate)" },
  { d: "1505", t: "Portuguese take Sofala" },
  { d: "1561", t: "Silveira killed at the Mutapa's court" },
  { d: "1569-1572", t: "Barreto expedition fails" },
  { d: "1607", t: "Treaty with Gatsi Rusere", hi: true },
  { d: "1629", t: "Mavura Mhande accepts vassal status", hi: true },
  { d: "Late 1600s", t: "Changamire Dombo and the Rozvi drive the Portuguese from the plateau" },
], 120, "Timeline of the Mutapa state: Mutota's move north in about 1430-1450, Portuguese at Sofala in 1505, the treaty of 1607, Mavura's vassal status in 1629 and the Rozvi expulsion of the Portuguese in the late 1600s.", "Figure: timeline of the Mutapa state and the Portuguese");

await T("precolonial/ndebele-state", "## Migration and founding", "ndebele-timeline", "The Ndebele state", [
  { d: "c. 1820s", t: "Mzilikazi leaves Shaka" },
  { d: "1830s", t: "War with Griqua, Zulu and Boers in the Transvaal" },
  { d: "1837-1839", t: "The Ndebele cross the Limpopo" },
  { d: "c. 1840", t: "Settlement near Bulawayo" },
  { d: "1868", t: "Death of Mzilikazi" },
  { d: "1870", t: "Lobengula becomes king", hi: true },
  { d: "1888", t: "Rudd Concession" },
  { d: "1893-94", t: "Anglo-Ndebele War", hi: true },
], 108, "Timeline of the Ndebele state from Mzilikazi's break with Shaka in the 1820s and the crossing of the Limpopo in 1837-1839 to Lobengula's accession in 1870, the Rudd Concession of 1888 and the war of 1893-94.", "Figure: timeline of the Ndebele state");

await T("colonial/company-rule", "## How the Company governed", "company-rule-timeline", "Company rule, 1890-1923", [
  { d: "1890", t: "Occupation; Company administration begins" },
  { d: "1894", t: "Matabeleland Order in Council" },
  { d: "1896-97", t: "Risings; Native Department reorganised" },
  { d: "1897-99", t: "Railways reach Bulawayo and Salisbury" },
  { d: "1898", t: "Southern Rhodesia Order in Council" },
  { d: "1903", t: "Settlers gain an elected majority in the Legislative Council" },
  { d: "1918", t: "Privy Council ruling on land" },
  { d: "27 Oct 1922", t: "Referendum", hi: true },
  { d: "1 Oct 1923", t: "Responsible government begins; Company rule ends", hi: true },
], 108, "Timeline of Company rule: occupation in 1890, the 1898 Order in Council, settlers' elected majority in 1903, the 1918 land ruling, the referendum of 27 October 1922 and responsible government on 1 October 1923.", "Figure: timeline of Company rule in Southern Rhodesia");

await T("colonial/udi-rhodesian-front", "## The Rhodesian Front and the road to UDI", "udi-rf-timeline", "The Rhodesian Front, UDI and settlement attempts", [
  { d: "Dec 1962", t: "Rhodesian Front wins the election" },
  { d: "April 1964", t: "Smith becomes prime minister" },
  { d: "11 Nov 1965", t: "UDI", hi: true },
  { d: "Dec 1966", t: "UN selective sanctions; talks on HMS Tiger" },
  { d: "May 1968", t: "UN comprehensive sanctions" },
  { d: "Oct 1968", t: "Talks on HMS Fearless" },
  { d: "1969", t: "Land Tenure Act and new constitution" },
  { d: "2 March 1970", t: "Republic proclaimed" },
  { d: "1971-72", t: "Smith-Home proposals; Pearce Commission" },
  { d: "3 March 1978", t: "Internal settlement agreement" },
  { d: "June 1979", t: "Muzorewa becomes prime minister of Zimbabwe-Rhodesia" },
], 112, "Timeline from the Rhodesian Front's election win in December 1962 and UDI on 11 November 1965 through sanctions, the 1969 constitution and the 1970 republic to the internal settlement of March 1978 and Muzorewa's premiership in June 1979.", "Figure: timeline of the Rhodesian Front years, 1962-1979");

await T("liberation/armed-struggle-1966-72", "## Preparing for war", "armed-struggle-1966-72-timeline", "The first phase of the armed struggle", [
  { d: "1964", t: "ZANU and the PCC banned; leaders detained" },
  { d: "28 April 1966", t: "Battle of Chinhoyi", hi: true },
  { d: "1967", t: "South African police units sent to Rhodesia" },
  { d: "Aug-Sept 1967", t: "Wankie campaign" },
  { d: "March-April 1968", t: "Sipolilo campaign" },
  { d: "1969", t: "Dare reChimurenga formed by ZANU" },
  { d: "1970-72", t: "ZANLA reorganises, with FRELIMO help in Tete" },
], 124, "Timeline of the first phase of the armed struggle: bans and detentions in 1964, the Battle of Chinhoyi on 28 April 1966, the Wankie and Sipolilo campaigns of 1967-68 and ZANLA's reorganisation in 1970-72.", "Figure: timeline of the first phase, 1964-1972");

await T("liberation/lancaster-house", "## Why was the conference convened?", "lancaster-house-timeline", "The road to Lancaster House and independence", [
  { d: "March 1978", t: "Internal settlement" },
  { d: "April 1979", t: "Elections; Muzorewa prime minister" },
  { d: "Aug 1979", t: "Commonwealth meeting at Lusaka" },
  { d: "10 Sept 1979", t: "Lancaster House opens" },
  { d: "21 Dec 1979", t: "Agreement signed", hi: true },
  { d: "28 Dec 1979", t: "Ceasefire begins" },
  { d: "27-29 Feb 1980", t: "General election" },
  { d: "18 April 1980", t: "Independence", hi: true },
], 116, "Timeline from the internal settlement of March 1978 and the Lusaka Commonwealth meeting of August 1979 to the opening of Lancaster House on 10 September, the agreement of 21 December 1979, the February 1980 election and independence on 18 April 1980.", "Figure: timeline of Lancaster House and independence");

await T("france/terror-directory", "## Introduction", "french-revolution-timeline", "The French Revolution, 1789-1799", [
  { d: "5 May 1789", t: "Estates-General opens" },
  { d: "14 July 1789", t: "Storming of the Bastille", hi: true },
  { d: "26 Aug 1789", t: "Declaration of the Rights of Man and of the Citizen" },
  { d: "20-21 June 1791", t: "Flight to Varennes" },
  { d: "20 April 1792", t: "War declared on Austria" },
  { d: "10 Aug 1792", t: "Tuileries attacked; king suspended" },
  { d: "20-22 Sept 1792", t: "Valmy; Convention meets; republic proclaimed", hi: true },
  { d: "21 Jan 1793", t: "Louis XVI executed", hi: true },
  { d: "April 1793", t: "Committee of Public Safety set up" },
  { d: "27-28 July 1794", t: "Fall and execution of Robespierre" },
  { d: "Oct 1795", t: "The Directory begins" },
  { d: "9 Nov 1799", t: "Coup of 18 Brumaire: the Directory overthrown", hi: true },
], 130, "Timeline of the French Revolution from the opening of the Estates-General on 5 May 1789 and the Bastille, through the republic of September 1792 and the king's execution on 21 January 1793, to Robespierre's fall in July 1794 and the coup of 18 Brumaire on 9 November 1799.", "Figure: key events of the French Revolution, 1789-1799");

await T("germany/unification-1871", "## Introduction", "german-unification-timeline", "German unification, 1861-1871", [
  { d: "1861", t: "Wilhelm I becomes king" },
  { d: "23 Sept 1862", t: "Bismarck becomes Minister-President" },
  { d: "Feb-Oct 1864", t: "War against Denmark" },
  { d: "14 Aug 1865", t: "Convention of Gastein" },
  { d: "3 July 1866", t: "Königgrätz", hi: true },
  { d: "23 Aug 1866", t: "Treaty of Prague" },
  { d: "1867", t: "Zollparlament; Luxemburg crisis" },
  { d: "13 July 1870", t: "Ems Telegram; war declared 19 July" },
  { d: "1-2 Sept 1870", t: "Sedan" },
  { d: "18 Jan 1871", t: "Empire proclaimed at Versailles", hi: true },
  { d: "10 May 1871", t: "Treaty of Frankfurt" },
], 116, "Timeline of German unification: Bismarck becomes Minister-President in 1862, Prussia wins at Königgrätz on 3 July 1866, the Ems Telegram of 13 July 1870 leads to war and Sedan, and the Empire is proclaimed at Versailles on 18 January 1871.", "Figure: timeline of German unification, 1861-1871");

await T("ww1/july-crisis", "## The assassination", "july-crisis-timeline", "The July Crisis, 1914", [
  { d: "28 June", t: "Assassination at Sarajevo", hi: true },
  { d: "5-6 July", t: "German blank cheque" },
  { d: "23 July", t: "Austrian ultimatum to Serbia" },
  { d: "25 July", t: "Serbia's reply; Austria breaks off relations" },
  { d: "28 July", t: "Austria declares war on Serbia", hi: true },
  { d: "29-30 July", t: "Russian partial, then general, mobilisation" },
  { d: "1 August", t: "Germany declares war on Russia" },
  { d: "3 August", t: "Germany declares war on France" },
  { d: "4 August", t: "Germany invades Belgium; Britain declares war", hi: true },
  { d: "6 August", t: "Austria declares war on Russia" },
], 106, "Timeline of the July Crisis of 1914 from the Sarajevo assassination on 28 June, the German blank cheque and the Austrian ultimatum to Austria's declaration of war on 28 July, Russian mobilisation, and German and British declarations of war in early August.", "Figure: the July Crisis, 28 June-6 August 1914");

await T("russia/revolutions-1917", "## The impact of the First World War", "russia-revolutions-timeline", "Russia, 1914-1917 (Western dates; Russian old-style in brackets)", [
  { d: "Aug 1914", t: "Russia enters the war" },
  { d: "Sept 1915", t: "Tsar takes command of the army" },
  { d: "8 March 1917", t: "Strikes begin in Petrograd (23 Feb)" },
  { d: "15 March 1917", t: "Tsar abdicates; Provisional Government formed (2 March)", hi: true },
  { d: "16 April 1917", t: "Lenin returns; April Theses (3 April)" },
  { d: "16-17 July 1917", t: "July Days (3-4 July)" },
  { d: "Sept 1917", t: "Kornilov affair (late August)" },
  { d: "23 Oct 1917", t: "Bolshevik Central Committee votes for rising (10 October)" },
  { d: "7-8 Nov 1917", t: "Winter Palace taken; Sovnarkom formed (25-26 October)", hi: true },
], 112, "Timeline of Russia from 1914 to 1917 with Western dates and old-style Russian dates: the March 1917 strikes and abdication, Lenin's return in April, the July Days, the Kornilov affair and the Bolshevik seizure of power on 7-8 November 1917.", "Figure: timeline of the Russian revolutions, 1914-1917");

await T("coldwar/origins-1941-49", "## The wartime alliance and its strains", "cold-war-origins-timeline", "The origins of the Cold War, 1945-1949", [
  { d: "Feb 1945", t: "Yalta Conference" },
  { d: "July-Aug 1945", t: "Potsdam Conference" },
  { d: "March 1946", t: "Churchill's Iron Curtain speech", hi: true },
  { d: "March 1947", t: "Truman Doctrine" },
  { d: "June 1947", t: "Marshall Plan announced" },
  { d: "Feb 1948", t: "Communist takeover in Czechoslovakia" },
  { d: "June 1948", t: "Berlin Blockade begins", hi: true },
  { d: "April 1949", t: "NATO formed" },
  { d: "May 1949", t: "End of the Blockade; West Germany created" },
], 108, "Timeline of the origins of the Cold War: Yalta in February 1945, Potsdam, Churchill's Iron Curtain speech in March 1946, the Truman Doctrine and Marshall Plan of 1947, the Berlin Blockade from June 1948 and NATO in April 1949.", "Figure: timeline of the origins of the Cold War, 1945-1949");

await T("china/mao-1949-76", "## Consolidation, 1949-1957", "mao-china-timeline", "Mao's China, 1950-1976", [
  { d: "1950", t: "Agrarian Reform Law; Marriage Law" },
  { d: "1953-57", t: "First Five-Year Plan" },
  { d: "1957", t: "Anti-Rightist Campaign" },
  { d: "1958-62", t: "Great Leap Forward", hi: true },
  { d: "1959-61", t: "Famine" },
  { d: "1960", t: "Soviet advisers withdrawn" },
  { d: "1966", t: "Cultural Revolution begins", hi: true },
  { d: "1971", t: "Lin Biao dies" },
  { d: "Sept 1976", t: "Mao dies" },
  { d: "Oct 1976", t: "Gang of Four arrested" },
], 100, "Timeline of Mao's China from the 1950 Agrarian Reform Law and the First Five-Year Plan to the Great Leap Forward of 1958-62, the famine of 1959-61, the Cultural Revolution from 1966, Mao's death in September 1976 and the arrest of the Gang of Four.", "Figure: timeline of Mao's China, 1950-1976");

await T("nazi/governance", "## Nazi foreign policy", "nazi-foreign-policy-timeline", "Nazi foreign policy, 1933-1941", [
  { d: "Oct 1933", t: "Germany leaves the Disarmament Conference and the League of Nations" },
  { d: "Jan 1934", t: "Non-aggression pact with Poland" },
  { d: "Jan 1935", t: "The Saar votes to return to Germany" },
  { d: "March 1935", t: "Conscription announced, breaking Versailles" },
  { d: "June 1935", t: "Anglo-German Naval Agreement" },
  { d: "March 1936", t: "German troops enter the Rhineland" },
  { d: "Oct-Nov 1936", t: "Rome-Berlin Axis; Anti-Comintern Pact with Japan" },
  { d: "March 1938", t: "Anschluss with Austria" },
  { d: "Sept 1938", t: "Munich Agreement: the Sudetenland", hi: true },
  { d: "March 1939", t: "Germany occupies the rest of Bohemia and Moravia" },
  { d: "23 Aug 1939", t: "Nazi-Soviet Pact" },
  { d: "1 Sept 1939", t: "Invasion of Poland", hi: true },
  { d: "22 June 1941", t: "Invasion of the Soviet Union (Barbarossa)" },
], 104, "Timeline of Nazi foreign policy: leaving the League in October 1933, conscription in 1935, the Rhineland in 1936, the Anschluss and Munich in 1938, the Nazi-Soviet Pact and the invasion of Poland in 1939 and Barbarossa on 22 June 1941.", "Figure: timeline of Nazi foreign policy, 1933-1941");

// ---- factor diagrams
await place(F, "risings/causes", "## Causes in Matabeleland and Mashonaland", "risings-causes-chart", factors([
  { t: "Loss of land and cattle; loss of independence after 1893-94" },
  { t: "Forced labour, taxes and the Native Police; reserves and Native Commissioners from 1894" },
  { t: "Drought and locusts (1895) and rinderpest (early 1896), with cattle shot to stop its spread", fill: C.fillAmber, stroke: C.amber },
  { t: "Opportunity: the Jameson Raid (December 1895 - January 1896) removed many police", fill: C.fillGreen, stroke: C.green },
  { t: "Leadership and purpose: Mkwati, Kaguvi, Nehanda and the Mwari cult", fill: C.fillBlue, stroke: C.blue },
], "Risings of 1896-97", { fw: 330, rh: 80, title: "Causes of the 1896-97 risings" }),
  "Five groups of causes of the 1896-97 risings: long-term grievances (loss of land, cattle and independence; forced labour, taxes and the Native Police), the 1895-96 disasters, the opportunity of the Jameson Raid and religious leadership, all leading to the risings.",
  "Figure: grievances (grey), disasters (amber), opportunity (green) and leadership (blue) behind the 1896-97 risings");

await place(F, "ww1/long-term-causes", "## The alliance system and the diplomatic revolution", "ww1-long-term-causes-chart", factors([
  { t: "Alliance system: Dual Alliance 1879, Triple Alliance 1882, Franco-Russian alliance 1894, Entente Cordiale 1904, Anglo-Russian Convention 1907" },
  { t: "Militarism and the arms and naval race: German Navy Laws 1898-1900" },
  { t: "Imperial and economic rivalry: Moroccan crises 1905-06 and 1911 (Agadir)" },
  { t: "The Balkans: annexation of Bosnia-Herzegovina 1908; Balkan Wars 1912-13" },
  { t: "War plans and nationalism" },
], "Long-term causes of war in 1914", { fw: 340, rh: 80, title: "Long-term causes of the First World War" }),
  "Five long-term causes of the First World War: the alliance system of 1879 to 1907, militarism and the naval race, imperial and economic rivalry, the Balkans and war plans with nationalism, all leading to war in 1914.",
  "Figure: the long-term causes of the First World War");

await place(F, "ww2/causes", "## Long-term causes", "ww2-causes-chart", factors([
  { t: "Versailles grievances in Germany, Italy and Japan" },
  { t: "The Depression brought extremists to power" },
  { t: "Fascist and militarist expansion; the League failed over Manchuria and Ethiopia" },
  { t: "Appeasement by Britain and France: fear of war, weak forces, belief parts of Versailles were unjust" },
  { t: "Anschluss, Munich and Prague showed Hitler's aims were unlimited", fill: C.fillAmber, stroke: C.amber },
  { t: "The Nazi-Soviet Pact (23 August 1939) made the attack on Poland possible", fill: C.fillAmber, stroke: C.amber },
], "War: Germany invades Poland, 1 Sept 1939; Britain and France declare war, 3 Sept", { fw: 330, rh: 110, title: "Causes of the Second World War" }),
  "Causes of the Second World War: Versailles grievances, the Depression, fascist and militarist expansion with League failures, and appeasement (long-term, grey), then the Anschluss, Munich, Prague and the Nazi-Soviet Pact (short-term, amber), leading to the invasion of Poland on 1 September 1939.",
  "Figure: long-term (grey) and short-term (amber) causes of the Second World War");

// ---- UN and SADC organs
{
  const top = bx(110, 16, 340, "United Nations: its six main organs", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const y1 = top.y + top.h + 36;
  const ga = bx(14, y1, 258, "General Assembly: all members, one vote each; debates any matter, recommends, approves the budget, elects non-permanent Council members");
  const sc = bx(282, y1, 264, "Security Council: 15 members, five permanent with a veto and ten elected for two years; its decisions bind members; nine votes needed, with no veto from a permanent member");
  const y2 = y1 + Math.max(ga.h, sc.h) + 16;
  const w = 128, g = 10;
  const t = ["International Court of Justice: The Hague, 15 judges; settles disputes between states that accept its jurisdiction", "Economic and Social Council: 54 members; co-ordinates economic and social work and the specialised agencies", "Secretariat: led by the Secretary-General; the administration", "Trusteeship Council: work suspended in 1994"];
  const hh = Math.max(...t.map((s, i) => bx(14 + i * (w + g), y2, w, s, { size: 12 }).h));
  const row = t.map((s, i) => bx(14 + i * (w + g), y2, w, s, { size: 12, h: hh }));
  const gaH = Math.max(ga.h, sc.h);
  let b = top.svg + bx(ga.x, y1, ga.w, "General Assembly: all members, one vote each; debates any matter, recommends, approves the budget, elects non-permanent Council members", { h: gaH }).svg + bx(sc.x, y1, sc.w, "Security Council: 15 members, five permanent with a veto and ten elected for two years; its decisions bind members; nine votes needed, with no veto from a permanent member", { h: gaH, fill: C.fillAmber, stroke: C.amber }).svg + row.map((r) => r.svg).join("");
  b += D.line(top.cx, top.y + top.h, top.cx, y1 - 18, { stroke: C.axis, width: 1.6 }) + D.line(ga.cx, y1 - 18, sc.cx, y1 - 18, { stroke: C.axis, width: 1.6 });
  b += D.arrow(ga.cx, y1 - 18, ga.cx, y1, { stroke: C.axis, width: 1.6 }) + D.arrow(sc.cx, y1 - 18, sc.cx, y1, { stroke: C.axis, width: 1.6 });
  await place(F, "orgs/united-nations", "## The organs", "un-organs", D.svg(560, y2 + hh + 16, b),
    "Chart of the six main organs of the United Nations: the General Assembly, the Security Council with its five permanent veto-holding members, the International Court of Justice, the Economic and Social Council, the Secretariat and the Trusteeship Council.",
    "Figure: the main organs of the United Nations");
}
{
  const top = bx(110, 16, 340, "SADC: main institutions", { fill: C.fillAmber, stroke: C.amber, bold: true });
  const summit = bx(130, top.y + top.h + 34, 300, "Summit of Heads of State or Government: supreme policy-making body, meets once a year", { bold: true });
  const y2 = summit.y + summit.h + 40;
  const w = 128, g = 10;
  const t = ["Council of Ministers: oversees implementation; prepares for the Summit", "Organ on Politics, Defence and Security Co-operation", "Secretariat in Gaborone, led by the Executive Secretary", "SADC Tribunal: regional court at Windhoek, suspended in 2010 and restructured later"];
  const hh = Math.max(...t.map((s, i) => bx(14 + i * (w + g), y2, w, s, { size: 12 }).h));
  const row = t.map((s, i) => bx(14 + i * (w + g), y2, w, s, { size: 12, h: hh }));
  const nc = bx(14, y2 + hh + 26, 532, "National Committees and the SADC Parliamentary Forum link member states and parliaments to the community", { fill: C.fillGreen, stroke: C.green, size: 13 });
  let b = top.svg + summit.svg + row.map((r) => r.svg).join("") + nc.svg;
  b += D.arrow(top.cx, top.y + top.h, summit.cx, summit.y, { stroke: C.axis, width: 1.6 });
  const ty = y2 - 20;
  b += D.line(summit.cx, summit.y + summit.h, summit.cx, ty, { stroke: C.axis, width: 1.6 }) + D.line(row[0].cx, ty, row[3].cx, ty, { stroke: C.axis, width: 1.6 });
  for (const r of row) b += D.arrow(r.cx, ty, r.cx, y2, { stroke: C.axis, width: 1.6 });
  await place(F, "orgs/sadc", "## Aims and structure of SADC", "sadc-institutions", D.svg(560, nc.y + nc.h + 16, b),
    "Chart of SADC institutions: the Summit of Heads of State or Government above the Council of Ministers, the Organ on Politics, Defence and Security, the Secretariat in Gaborone and the SADC Tribunal, with National Committees and the Parliamentary Forum linking member states.",
    "Figure: institutions of SADC");
}
