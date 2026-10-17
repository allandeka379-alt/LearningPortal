import { D, C, bx, arr, timeline, factors, place } from "./hlib.mjs";
const F = "history-o";

// ---- 1. Alliance blocs 1914 (schematic)
{
  const w = 560, h = 520;
  const P = { Britain: [95, 80], France: [90, 285], Germany: [270, 160], Russia: [470, 150], "Austria-Hungary": [420, 300], Italy: [250, 440] };
  const AL = [C.fillBlue, C.blue]; // Triple Alliance
  const EN = [C.fillAmber, C.amber]; // Triple Entente
  const kind = { Britain: EN, France: EN, Russia: EN, Germany: AL, "Austria-Hungary": AL, Italy: AL };
  let b = D.text(14, 28, "Europe's two camps before 1914", { size: 16, weight: 700 });
  const edge = (a, c, o) => D.line(P[a][0], P[a][1], P[c][0], P[c][1], { stroke: o.col, width: 3, dash: o.dash });
  b += edge("Germany", "Austria-Hungary", { col: C.blue }) + edge("Italy", "Germany", { col: C.blue }) + edge("Italy", "Austria-Hungary", { col: C.blue });
  b += edge("France", "Russia", { col: C.amber }) + edge("Britain", "France", { col: C.amber, dash: true }) + edge("Britain", "Russia", { col: C.amber, dash: true });
  const tag = (x, y, s, col) => D.tag(x, y, s, { anchor: "middle", size: 13, stroke: col });
  b += tag(92, 196, "Entente Cordiale, 1904", C.amber);
  b += tag(282, 124, "Anglo-Russian Entente, 1907", C.amber);
  b += tag(176, 259, "Franco-Russian, 1894", C.amber);
  b += tag(358, 238, "Dual Alliance, 1879", C.blue);
  b += tag(335, 384, "Italy joins, 1882", C.blue);
  for (const [n, [x, y]] of Object.entries(P)) {
    const bw = n === "Austria-Hungary" ? 140 : 100;
    b += D.rect(x - bw / 2, y - 18, bw, 36, { fill: kind[n][0], stroke: kind[n][1], r: 8, width: 2 }) + D.text(x, y + 5, n, { anchor: "middle", size: 14, weight: 700 });
  }
  b += D.line(30, 486, 70, 486, { stroke: C.ink, width: 3 }) + D.text(78, 491, "alliance (promise of help)", { size: 13 });
  b += D.line(280, 486, 320, 486, { stroke: C.ink, width: 3, dash: true }) + D.text(328, 491, "entente (friendly understanding)", { size: 13 });
  b += D.rect(30, 500, 14, 12, { fill: C.fillBlue, stroke: C.blue, width: 1.5 }) + D.text(50, 511, "Triple Alliance", { size: 12 });
  b += D.rect(160, 500, 14, 12, { fill: C.fillAmber, stroke: C.amber, width: 1.5 }) + D.text(180, 511, "Triple Entente", { size: 12 });
  b += D.text(540, 511, "Schematic, not to scale", { size: 12, fill: C.muted, anchor: "end" });
  await place(F, "ww1-origins/alliances-arms-race", "## How Europe divided into two camps", "alliances-1914-map", D.svg(w, 524, b),
    "Schematic map of Europe's two camps: the Triple Alliance of Germany, Austria-Hungary and Italy (Dual Alliance 1879, Italy 1882) and the Triple Entente of Britain, France and Russia (Franco-Russian Alliance 1894, Entente Cordiale 1904, Anglo-Russian Entente 1907); the ententes were friendly understandings, not promises to fight.",
    "Figure: the alliance system before 1914 (schematic, not to scale)");
}

// ---- 2. July crisis timeline
await place(F, "ww1-origins/july-crisis", "## From Sarajevo to world war", "july-crisis-timeline", timeline([
  { d: "28 June", t: "Franz Ferdinand and his wife Sophie shot in Sarajevo by Gavrilo Princip", hi: true },
  { d: "5-6 July", t: "Germany gives Austria-Hungary the 'blank cheque'" },
  { d: "23 July", t: "Austria-Hungary sends Serbia an ultimatum with a 48-hour deadline" },
  { d: "25 July", t: "Serbia accepts most demands but not all; Serbia mobilises" },
  { d: "28 July", t: "Austria-Hungary declares war on Serbia", hi: true },
  { d: "30 July", t: "Russia orders general mobilisation" },
  { d: "1 August", t: "Germany declares war on Russia" },
  { d: "3 August", t: "Germany declares war on France" },
  { d: "4 August", t: "German troops enter Belgium; Britain declares war on Germany", hi: true },
], { title: "The July Crisis, 1914", dateW: 100 }),
  "Timeline of the July Crisis of 1914: the Sarajevo assassination on 28 June, the blank cheque on 5-6 July, the ultimatum on 23 July, Austria-Hungary's declaration of war on 28 July, Russian mobilisation on 30 July and Britain's entry on 4 August.",
  "Figure: from Sarajevo to world war, 28 June-4 August 1914");

// ---- 3. Causes of WW1
{
  const svg = factors([
    { t: "Alliance system: Triple Alliance (1882) against the Triple Entente (completed 1907)" },
    { t: "Arms race: German Navy Laws, HMS Dreadnought (1906), conscript armies, the Schlieffen Plan" },
    { t: "Colonial rivalry: Fashoda 1898, Morocco 1905-06 and 1911" },
    { t: "Balkan nationalism: Bosnian crisis 1908-09, Balkan Wars 1912-13" },
    { t: "Trigger: assassination at Sarajevo, 28 June 1914", fill: C.fillAmber, stroke: C.amber },
  ], "First World War, August 1914", { fw: 330, rh: 80, title: "Causes of the First World War" });
  await place(F, "ww1-origins/july-crisis", "## Who was responsible? A historians' debate", "ww1-causes", svg,
    "Five factors behind the First World War: the alliance system, the arms race, colonial rivalry, Balkan nationalism (long-term, grey) and the Sarajevo assassination of 28 June 1914 (trigger, amber), all leading to war in August 1914.",
    "Figure: long-term causes (grey) and the trigger (amber) of the First World War");
}

// ---- 4. Russia 1917 timeline
await place(F, "russia/revolutions-1917", "## The impact of the First World War", "russia-1917-timeline", timeline([
  { d: "Sept 1915", t: "Nicholas II takes command of the army" },
  { d: "Dec 1916", t: "Rasputin murdered" },
  { d: "March 1917", t: "February (March) Revolution; the Tsar abdicates", hi: true },
  { d: "April 1917", t: "Lenin returns; April Theses" },
  { d: "July 1917", t: "Failed offensive; July Days; Kerensky becomes Prime Minister" },
  { d: "Sept 1917", t: "Kornilov affair" },
  { d: "7 Nov 1917", t: "October (November) Revolution", hi: true },
], { title: "Russia, 1915-1917", dateW: 112 }),
  "Timeline of Russia from 1915 to 1917: the Tsar takes command, Rasputin is murdered, the February (March) Revolution brings abdication, Lenin returns in April, and the Bolsheviks take power in the October (November) Revolution on 7 November 1917.",
  "Figure: timeline of Russia, 1915-1917");

// ---- 5. German unification: the road to 1867
await place(F, "german-unification/bismarck-austria", "## The army and the constitutional crisis", "unification-austria-timeline", timeline([
  { d: "1861", t: "Wilhelm I becomes King of Prussia" },
  { d: "Sept 1862", t: "Bismarck becomes Minister-President" },
  { d: "1863", t: "Prussia helps Russia during the Polish rising" },
  { d: "1864", t: "Austria and Prussia defeat Denmark" },
  { d: "Aug 1865", t: "Convention of Gastein" },
  { d: "Oct 1865", t: "Bismarck meets Napoleon III at Biarritz" },
  { d: "April 1866", t: "Prussian alliance with Italy" },
  { d: "3 July 1866", t: "Battle of Koniggratz", hi: true },
  { d: "23 Aug 1866", t: "Treaty of Prague" },
  { d: "1867", t: "North German Confederation" },
], { title: "Prussia and Austria, 1861-1867", dateW: 104 }).replace("Koniggratz", "Königgrätz"),
  "Timeline of Prussia's rise: Bismarck becomes Minister-President in 1862, Austria and Prussia defeat Denmark in 1864, Prussia wins at Königgrätz on 3 July 1866, the Treaty of Prague follows and the North German Confederation is formed in 1867.",
  "Figure: timeline of Prussia and Austria, 1861-1867");

// ---- 6. Ems to Empire
await place(F, "german-unification/bismarck-france", "## The Spanish throne and the Ems telegram", "unification-france-timeline", timeline([
  { d: "1867", t: "Luxembourg crisis" },
  { d: "1868", t: "Isabella II of Spain overthrown" },
  { d: "12 July 1870", t: "Leopold's candidature withdrawn" },
  { d: "13 July 1870", t: "Meeting at Ems; Bismarck edits and publishes the telegram", hi: true },
  { d: "19 July 1870", t: "France declares war on Prussia" },
  { d: "1-2 Sept 1870", t: "Battle of Sedan; Napoleon III surrenders" },
  { d: "4 Sept 1870", t: "Republic proclaimed in Paris" },
  { d: "18 Jan 1871", t: "German Empire proclaimed at Versailles", hi: true },
  { d: "10 May 1871", t: "Treaty of Frankfurt" },
], { title: "From the Ems telegram to the German Empire", dateW: 116 }),
  "Timeline from the Luxembourg crisis of 1867 and the Ems telegram of 13 July 1870 through France's declaration of war, the defeat at Sedan and the Republic of 4 September 1870 to the proclamation of the German Empire at Versailles on 18 January 1871.",
  "Figure: timeline of the war with France and the Empire, 1867-1871");

// ---- 7. Cold war blocs
{
  const w = 560;
  let b = D.text(w / 2, 26, "The two blocs and the Iron Curtain", { anchor: "middle", size: 16, weight: 700 });
  const lx = 14, rx = 306, cw = 240;
  const west = bx(lx, 44, cw, "WEST: USA, Britain, France and allies", { fill: C.fillBlue, stroke: C.blue, bold: true, h: 76 });
  const east = bx(rx, 44, cw, "EAST: USSR and the communist states of eastern Europe", { fill: C.fillAmber, stroke: C.amber, bold: true, h: 76 });
  const rows = [
    [bx(lx, 130, cw, "NATO (1949): USA, Canada, Britain, France and other western European states"), bx(rx, 130, cw, "Warsaw Pact (1955): USSR and the communist states of eastern Europe")],
    [bx(lx, 130, cw, "SEATO (1954): USA, Britain, France, Australia and others in South-East Asia"), bx(rx, 130, cw, "Comecon (1949): the economic partnership of the USSR and its allies")],
    [bx(lx, 130, cw, "Marshall Aid: approved by Congress, April 1948"), bx(rx, 130, cw, "Cominform: founded September 1947")],
    [bx(lx, 130, cw, "West Germany (Federal Republic): set up May 1949"), bx(rx, 130, cw, "East Germany (GDR): set up October 1949")],
  ];
  let y = 130;
  let body = "";
  for (const [l, r] of rows) {
    const hh = Math.max(l.h, r.h);
    body += bx(lx, y, cw, l.svg ? "" : "", { h: hh }).svg.replace(/<text[\s\S]*$/, "");
    y += hh + 12;
  }
  // rebuild properly with common heights
  y = 130; body = "";
  const texts = [
    ["NATO (1949): USA, Canada, Britain, France and other western European states", "Warsaw Pact (1955): USSR and the communist states of eastern Europe"],
    ["SEATO (1954): USA, Britain, France, Australia and others in South-East Asia", "Comecon (1949): economic partnership of the USSR and its allies"],
    ["Marshall Aid: approved by Congress, April 1948", "Cominform: founded September 1947"],
    ["West Germany (Federal Republic): set up May 1949", "East Germany (German Democratic Republic): set up October 1949"],
  ];
  for (const [lt, rt] of texts) {
    const hh = Math.max(bx(lx, y, cw, lt).h, bx(rx, y, cw, rt).h);
    body += bx(lx, y, cw, lt, { h: hh, size: 13 }).svg + bx(rx, y, cw, rt, { h: hh, size: 13, fill: C.fillAmber, stroke: C.amber }).svg;
    y += hh + 10;
  }
  b += west.svg + east.svg + body;
  b += D.line(280, 40, 280, y - 4, { stroke: C.red, width: 3, dash: true });
  b += D.text(280, y + 18, "Iron Curtain: in his speech of 5 March 1946 Churchill said it had\ndescended across Europe from the Baltic to the Adriatic", { anchor: "middle", size: 13, fill: C.red });
  b += D.text(14, y + 62, "Schematic: a summary of the two sides, not a map.", { size: 12, fill: C.muted });
  await place(F, "cold-war/manifestations-impact", "### Alliances", "cold-war-blocs", D.svg(w, y + 74, b),
    "Chart of the two Cold War blocs divided by the Iron Curtain: NATO (1949), SEATO (1954), Marshall Aid and West Germany against the Warsaw Pact (1955), Comecon (1949), the Cominform and East Germany.",
    "Figure: the western and eastern blocs and the Iron Curtain");
}

// ---- 8. Mao timeline
await place(F, "china/mao", "## Policies and campaigns", "mao-timeline", timeline([
  { d: "1950", t: "Agrarian Reform Law; Marriage Law; China enters the Korean War" },
  { d: "1953", t: "First Five-Year Plan begins" },
  { d: "1955-1956", t: "Peasants organised into co-operatives (collectivisation)" },
  { d: "1956-1957", t: "Hundred Flowers campaign" },
  { d: "1957", t: "Anti-Rightist Campaign" },
  { d: "1958", t: "Great Leap Forward and people's communes", hi: true },
  { d: "1959-1961", t: "Famine" },
  { d: "1966", t: "Cultural Revolution begins", hi: true },
  { d: "1972", t: "US President Nixon visits China" },
  { d: "1976", t: "Death of Mao (9 September); the Gang of Four arrested (October)" },
], { title: "Mao's China, 1950-1976", dateW: 104 }),
  "Timeline of Mao's China from the 1950 Agrarian Reform Law and the First Five-Year Plan of 1953 through the Hundred Flowers campaign, the Great Leap Forward of 1958 and the famine of 1959-1961 to the Cultural Revolution of 1966 and Mao's death in 1976.",
  "Figure: timeline of Mao's China, 1950-1976");

// ---- 9. Nazi control methods
{
  const fh = bx(130, 16, 300, "Hitler: Fuhrer from 2 August 1934, after the Enabling Act (23 March 1933) and the Night of the Long Knives (30 June 1934)".replace("Fuhrer", "Führer"), { fill: C.fillAmber, stroke: C.amber, bold: true });
  const y = fh.y + fh.h + 44, w = 172;
  const t = bx(14, y, w, "Terror and repression: the SS under Himmler; the Gestapo; concentration camps from Dachau (March 1933); controlled courts and the People's Court; block wardens", { size: 13, fill: C.fillGrey, stroke: C.axis });
  const p = bx(14 + w + 10, y, w, "Propaganda and culture: Goebbels, Minister of Propaganda (March 1933); cheap radios; a controlled press; Nuremberg rallies; book burning (May 1933)", { size: 13, fill: C.fillGrey, stroke: C.axis });
  const c = bx(14 + 2 * (w + 10), y, w, "The churches: Concordat with the Pope (July 1933), soon broken; a Reich Church; the Confessing Church of Niemoller".replace("Niemoller", "Niemöller"), { size: 13, fill: C.fillGrey, stroke: C.axis });
  const hh = Math.max(t.h, p.h, c.h);
  const fix = [t, p, c].map((q, i) => bx(q.x, y, w, [
    "Terror and repression: the SS under Himmler; the Gestapo; concentration camps from Dachau (March 1933); controlled courts and the People's Court; block wardens",
    "Propaganda and culture: Goebbels, Minister of Propaganda (March 1933); cheap radios; a controlled press; Nuremberg rallies; book burning (May 1933)",
    "The churches: Concordat with the Pope (July 1933), soon broken; a Reich Church; the Confessing Church of Niemöller",
  ][i], { size: 13, h: hh, fill: C.fillGrey, stroke: C.axis }));
  let b = fh.svg + fix.map((q) => q.svg).join("");
  b += D.line(fh.cx, fh.y + fh.h, fh.cx, y - 22, { stroke: C.axis, width: 1.6 }) + D.line(fix[0].cx, y - 22, fix[2].cx, y - 22, { stroke: C.axis, width: 1.6 });
  for (const q of fix) b += D.arrow(q.cx, y - 22, q.cx, y, { stroke: C.axis, width: 1.6 });
  await place(F, "germany/nazi-control", "## Methods of control", "nazi-control-methods", D.svg(560, y + hh + 16, b),
    "Chart of how the Nazi state controlled Germany after Hitler became Führer in 1934: terror and repression (SS, Gestapo, camps, courts), propaganda and culture (Goebbels, radio, press, rallies) and pressure on the churches.",
    "Figure: methods of Nazi control");
}

// ---- 10. Road to war 1933-1939
await place(F, "road-to-war/outbreak-1939", "## The end of appeasement: March 1939", "road-to-war-timeline", timeline([
  { d: "Oct 1933", t: "Germany leaves the Disarmament Conference and the League" },
  { d: "7 March 1936", t: "Remilitarisation of the Rhineland" },
  { d: "Nov 1936", t: "Rome-Berlin Axis; Anti-Comintern Pact" },
  { d: "12 March 1938", t: "German troops enter Austria; the Anschluss is proclaimed next day" },
  { d: "29-30 Sept 1938", t: "Munich: the Sudetenland goes to Germany", hi: true },
  { d: "15 March 1939", t: "German troops occupy Bohemia and Moravia" },
  { d: "31 March 1939", t: "Britain and France guarantee Poland's independence" },
  { d: "23 Aug 1939", t: "Nazi-Soviet Pact signed", hi: true },
  { d: "1 Sept 1939", t: "Germany invades Poland", hi: true },
  { d: "3 Sept 1939", t: "Britain and France declare war" },
], { title: "Steps to war, 1933-1939", dateW: 128 }),
  "Timeline of the steps to the Second World War: Germany leaves the League in 1933, the Rhineland in 1936, the Anschluss in March 1938, Munich in September 1938, Prague in March 1939, the Nazi-Soviet Pact of 23 August and the invasion of Poland on 1 September 1939.",
  "Figure: timeline of the steps to war, 1933-1939");
