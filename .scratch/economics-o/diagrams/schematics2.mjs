// Second pass: circular flow, interest-rate chain, division of labour output, integration ladder (schematics are labelled as such).
// Run: node .scratch/economics-o/diagrams/schematics2.mjs
import { D, C } from "./common.mjs";
import { putB as put } from "./place.mjs";

// --- Circular flow (national-income/measurement): schematic, no numbers
{
  let b = "";
  b += D.node(195, 20, 230, 56, "FIRMS\nproduce goods and services", { fill: C.fillBlue, weight: 700 });
  b += D.node(195, 324, 230, 56, "HOUSEHOLDS\nown the factors of production", { fill: C.fillAmber, weight: 700 });
  // outer loop: income flows (factor payments) firms -> households on the right; spending flows households -> firms on the left
  b += D.path_("M425,48 L460,48 L460,352 L425,352", { stroke: C.blue, width: 2.6, arrow: true });
  b += D.path_("M195,352 L160,352 L160,48 L195,48", { stroke: C.amber, width: 2.6, arrow: true });
  b += D.text(472, 160, "INCOME\nwages, rent,\ninterest, profit\npaid for the\nfactors", { size: 13, fill: C.blue, weight: 700, anchor: "start" });
  b += D.text(148, 160, "SPENDING\nconsumers buy\nfinal goods and\nservices\n(C, I, G, X - M)", { size: 13, fill: C.amber, weight: 700, anchor: "end" });
  b += D.text(310, 205, "OUTPUT = INCOME = EXPENDITURE", { anchor: "middle", size: 15, weight: 700 });
  b += D.text(310, 228, "the three methods of measuring", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(310, 248, "GDP count the same flow", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(310, 268, "at three different points", { anchor: "middle", size: 13, fill: C.muted });
  b += D.text(310, 404, "Schematic: shows the idea, not measured values", { anchor: "middle", size: 13, fill: C.muted });
  const alt = "Circular flow of income as a schematic: firms pay wages, rent, interest and profit to households for the factors of production (income, on one side), and households spend their income on the goods and services firms produce (spending, on the other), so output, income and expenditure measure the same flow and give the same total.";
  await put("circular-flow-schematic", D.svg(620, 420, b), alt, "Figure: schematic of the circular flow; output, income and expenditure are the same flow measured at different points", "national-income/measurement", "Spending by one person is income to another");
}

// --- Interest-rate chain (monetary/monetary-policy): Worked example numbers
{
  const loan = [8, 12], sav = [4, 7];
  const i1 = (r) => Math.round(r * 100), s1 = (r) => Math.round(r * 50);
  const boxes = [
    [`Central bank raises interest rates\nLoans ${loan[0]}% to ${loan[1]}%; savings ${sav[0]}% to ${sav[1]}%`, C.fillBlue],
    [`Borrowing costs more: interest on a US$10,000 loan\nUS$${i1(loan[0])} to US$${i1(loan[1]).toLocaleString("en-GB")} (+US$${i1(loan[1]) - i1(loan[0])}); saving pays more:\nUS$5,000 earns US$${s1(sav[0])} to US$${s1(sav[1])}`, C.fillGrey],
    ["Firms cut investment (the new oven no longer pays)\nHouseholds save more and spend less", C.fillGrey],
    ["Aggregate demand falls", C.fillAmber],
    ["Pressure on prices eases (less demand-pull inflation)", C.fillGreen],
  ];
  const hs = [58, 76, 58, 40, 40];
  let y = 14, b = "";
  boxes.forEach(([t, f], k) => {
    b += D.node(20, y, 560, hs[k], t, { fill: f, size: 14, weight: k === 0 || k === 4 ? 700 : undefined });
    if (k < boxes.length - 1) b += D.arrow(300, y + hs[k], 300, y + hs[k] + 20, { width: 2.2 });
    y += hs[k] + 20;
  });
  const alt = "Chain of effects of a rise in interest rates using the lesson's numbers: loan rates rise from 8 to 12 percent so interest on a US$10,000 loan rises from US$800 to US$1,200 a year and savings rates rise from 4 to 7 percent so US$5,000 earns US$350 instead of US$200; firms cut investment and households spend less, aggregate demand falls and pressure on prices eases.";
  await put("interest-rate-chain", D.svg(600, y - 6, b), alt, "Figure: how a rise in interest rates works through spending to lower inflation pressure (a flow, using the worked example's numbers)", "monetary/monetary-policy", "4. With less borrowing and spending");
}

// --- Division of labour (labour/division-of-labour): furniture workshop
{
  const workers = 5, before = 15, after = 24;
  const bw = (v) => (v / after) * 250;
  let b = D.text(20, 28, "Chairs made in a day by the same five carpenters", { size: 15, weight: 700 });
  b += D.text(20, 76, "Each makes\nwhole chairs", { size: 13 }) + D.rect(150, 52, bw(before), 40, { fill: C.teal, stroke: "none" }) + D.text(158 + bw(before), 77, `${before} chairs (${before / workers} per worker)`, { size: 14, weight: 700 });
  b += D.text(20, 146, "Cut, shape, join,\nsand, finish", { size: 13 }) + D.rect(150, 122, bw(after), 40, { fill: C.blue, stroke: "none" }) + D.text(158 + bw(after), 147, `${after} chairs (${after / workers} per worker)`, { size: 14, weight: 700 });
  b += D.text(20, 206, `Output rises by (${after} - ${before}) / ${before} = ${Math.round(((after - before) / before) * 100)}% with the same workers and wages.`, { size: 14, fill: C.red, weight: 700 });
  const alt = `Output of a furniture workshop with five carpenters: when each makes whole chairs the output is ${before} chairs a day (${before / workers} per worker), and after dividing the work into cutting, shaping, joining, sanding and finishing it is ${after} chairs a day (${after / workers} per worker), a rise of 60 percent with the same workers.`;
  await put("division-of-labour-output", D.svg(640, 230, b), alt, "Figure: dividing the work raised the workshop's output from 15 to 24 chairs a day", "labour/division-of-labour", "4. With the same five workers and the same wages");
}

// --- Integration ladder (trade/economic-integration): the lesson's table as a staircase
{
  const steps = [
    ["Preferential trade area", "tariffs between members reduced"],
    ["Free trade area", "tariffs between members removed"],
    ["Customs union", "plus a common external tariff"],
    ["Common market", "plus free movement of labour and capital"],
    ["Economic (and monetary) union", "plus common policies or currency"],
  ];
  const sw = 108, sh = 50, h = 330;
  let b = "";
  steps.forEach(([n, d], k) => {
    const x = 20 + k * sw, top = h - 40 - (k + 1) * sh;
    b += D.rect(x, top, sw, (k + 1) * sh, { fill: k % 2 ? C.fillBlue : C.fillGrey, stroke: C.axis, width: 1.4 });
    b += D.text(x + sw / 2, top + 20, n.replace("Economic (and monetary) union", "Economic\n(and monetary)\nunion").replace("Preferential trade area", "Preferential\ntrade area").replace("Free trade area", "Free trade\narea").replace("Common market", "Common\nmarket").replace("Customs union", "Customs\nunion"), { anchor: "middle", size: 13, weight: 700 });
  });
  const notes = ["Each step keeps everything below it and adds one more:", "1 reduced tariffs  2 removed tariffs  3 common external tariff", "4 free movement of labour and capital  5 common policies or currency"];
  notes.forEach((t, i) => (b += D.text(20, h - 16 + i * 0 - (2 - i) * 0 + (i === 0 ? -10 : i === 1 ? 6 : 22), t, { size: 13, fill: i === 0 ? C.ink : C.muted, weight: i === 0 ? 700 : undefined })));
  const alt = "Ladder of economic integration, each step adding to the one below: preferential trade area (reduced tariffs between members), free trade area (tariffs removed), customs union (plus a common external tariff), common market (plus free movement of labour and capital) and economic and monetary union (plus common economic policies or a common currency).";
  await put("integration-ladder", D.svg(580, h + 20, b), alt, "Figure: the five forms of economic integration, each adding one feature to the step before (schematic of the lesson's table)", "trade/economic-integration", "| Economic (and monetary) union");
}
