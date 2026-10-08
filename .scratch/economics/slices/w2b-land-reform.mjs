// W2b: econ.production.land-reform (ZIMSEC only) — aims and balanced economic effects of Zimbabwe's land reform.
import { concept, P, table, pctChange, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.production.land-reform", { file: "production/land-reform", keyPrefix: "production.land-reform" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **land reform**?",
    options: [
      ["A deliberate government change in the ownership, distribution or use of land", "Correct: the standard definition."],
      ["The natural improvement of soil fertility over time", "This is not a policy."],
      ["A rise in the market price of farmland", "A price change is not reform."],
      ["The conversion of farmland into housing estates by private developers", "This is a change of land use by developers, not land reform."],
    ],
    answer: "A",
    explanation: "Land reform is deliberate government action to change who owns or uses land and how it is used.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did Zimbabwe's **fast-track** land reform programme begin?",
    options: [
      ["2000", "Correct: the fast-track programme began in 2000."],
      ["1980", "1980 was independence; earlier resettlement followed."],
      ["2009", "2009 was the year of the multi-currency system."],
      ["2019", "2019 was the year a local currency was re-introduced."],
    ],
    answer: "A",
    explanation: "Resettlement took place from the 1980s, but the fast-track programme began in 2000.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was a main **aim** of Zimbabwe's land reform programme?",
    options: [
      ["To resettle landless and land-short families", "Correct: a stated aim."],
      ["To reduce the number of people who farm", "The aim was to increase access to land."],
      ["To convert farmland to mining", "This was not an aim."],
      ["To increase imports of food", "Food imports rose in some years, but that was not an aim."],
    ],
    answer: "A",
    explanation: "Aims included correcting unequal land distribution, resettling the landless, decongesting communal areas and broadening ownership.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why did many new farmers find it hard to borrow money to invest in their farms?",
    options: [
      ["They often held land under permits or leases that banks would not accept as collateral", "Correct: insecure tenure limited borrowing."],
      ["Banks were not allowed to lend to farmers by law", "There was no such general ban."],
      ["Farmers did not need any inputs or equipment", "New farmers needed seed, fertiliser and equipment."],
      ["Interest rates had fallen to zero, so banks refused to lend to anyone at all", "This is not the recognised reason."],
    ],
    answer: "A",
    explanation: "Without title deeds that can be used as collateral, farmers find it difficult to obtain loans for irrigation and machinery.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Fewer farm products are delivered to processors after a fall in commercial farm output. Which group is **most directly** affected next?",
    options: [
      ["Agro-processing firms such as millers and oil expressers", "Correct: they depend on farm output as raw material."],
      ["Gold-mining companies", "Mining does not depend on farm output."],
      ["Commercial banks' branches in other countries of the region", "Not the most direct link."],
      ["Firms that build roads", "Not directly dependent on farm output."],
    ],
    answer: "A",
    hints: ["Who uses farm output as an input?"],
    explanation: "Agro-industries depend on agricultural raw materials, showing the interdependence of the stages of production.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement gives the most **balanced** view of the effects of land reform on output?",
    options: [
      ["Some crops fell at first while smallholder tobacco output grew", "Correct: recognises both effects."],
      ["Land reform caused every fall in farm output since 2000", "Ignores droughts, the economic crisis and input shortages."],
      ["Land reform had no effect at all on farm output", "Ignores well-recognised changes in output."],
      ["Farm output rose in every year after land reform", "Not supported: output of several crops fell at first."],
    ],
    answer: "A",
    hints: ["A balanced answer recognises more than one effect."],
    explanation: "Examiners reward answers that recognise both the falls in some commercial output and the growth of smallholder production, and other causes such as drought.",
  });
  // Fictional district data, different from the lesson.
  const d0 = { hh: 800, soy: 6400, cotton: 1500, jobs: 1600 }, d1 = { hh: 2000, soy: 4800, cotton: 1950, jobs: 1120 };
  const tD = table(["Indicator (fictional district)", "Before reform", "Five years later"], [["Households farming", d0.hh, d1.hh], ["Soya bean output (tonnes)", d0.soy, d1.soy], ["Cotton output (tonnes)", d0.cotton, d1.cotton], ["Permanent farm workers", d0.jobs, d1.jobs]]);
  const pSoy = pctChange(d0.soy, d1.soy);
  check("soy", pSoy, -25);
  const gn0 = 3600, gn1 = 2970, pGn = pctChange(gn0, gn1);
  check("gn", pGn, -17.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: pGn, daily: true,
    stem: `In a fictional farming district, groundnut output fell from ${fmt(gn0)} tonnes to ${fmt(gn1)} tonnes after land was redistributed. Calculate the percentage change in groundnut output. Give a fall as a negative number, to one decimal place.`,
    wrong: [Math.abs(pGn), ((gn1 - gn0) / gn1) * 100],
    explanation: `(${fmt(gn1)} − ${fmt(gn0)}) ÷ ${fmt(gn0)} × 100 = **${fmt(pGn, 1)}%**, a fall. Writing ${fmt(Math.abs(pGn), 1)} drops the sign; dividing by the new output (${fmt(gn1)}) gives ${fmt(((gn1 - gn0) / gn1) * 100, 1)}%, the wrong base.`,
  });
  const mz = { out0: 5250, hh0: 700, out1: 4550, hh1: 1820 };
  const per0 = mz.out0 / mz.hh0, per1 = mz.out1 / mz.hh1;
  check("per0", per0, 7.5);
  check("per1", per1, 2.5);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: per0 - per1, dp: 1,
    stem: `In a fictional district, ${fmt(mz.hh0)} farming households produced ${fmt(mz.out0)} tonnes of maize before a land reform. Some years later, ${fmt(mz.hh1)} households produced ${fmt(mz.out1)} tonnes. Calculate the fall in maize output per farming household, in tonnes, to one decimal place.`,
    wrong: [(mz.out0 - mz.out1) / mz.hh1, per1],
    hints: ["Output per household = output ÷ households, for each period."],
    explanation: `1. Before: ${fmt(mz.out0)} ÷ ${fmt(mz.hh0)} = ${fmt(per0, 1)} tonnes per household.\n2. Later: ${fmt(mz.out1)} ÷ ${fmt(mz.hh1)} = ${fmt(per1, 1)} tonnes per household.\n3. Fall: ${fmt(per0, 1)} − ${fmt(per1, 1)} = **${fmt(per0 - per1, 1)}** tonnes per household.\n4. Dividing the fall in total output by the new number of households (${fmt((mz.out0 - mz.out1) / mz.hh1, 1)}) mixes the two periods.`,
  });
  const jb0 = 2250, jb1 = 1710, pJb = pctChange(jb0, jb1);
  check("jb", pJb, -24);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: pJb, calculator: true,
    stem: `In a fictional district, the number of permanent farm workers fell from ${fmt(jb0)} to ${fmt(jb1)} after large farms were subdivided. Calculate the percentage change in the number of permanent farm workers. Give a fall as a negative number, to one decimal place.`,
    wrong: [Math.abs(pJb), ((jb1 - jb0) / jb1) * 100],
    hints: ["Change ÷ original number × 100."],
    explanation: `(${fmt(jb1)} − ${fmt(jb0)}) ÷ ${fmt(jb0)} × 100 = **${fmt(pJb, 1)}%**, a fall. Dropping the minus sign or dividing by ${fmt(jb1)} are common errors.`,
  });
  const pJobs = pctChange(d0.jobs, d1.jobs);
  b.tf({
    d: 1, skill: "RECALL",
    stem: "One aim of Zimbabwe's land reform was to reduce overcrowding in communal areas.",
    answer: true,
    explanation: "True. Decongesting communal areas by resettling families was an aim.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Every change in Zimbabwe's farm output after 2000 can be explained by land reform alone.",
    answer: false,
    explanation: "False. Droughts, the economic crisis and hyperinflation of 2007-2008, and shortages of inputs and finance also affected output.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each effect of land reform with whether it is generally recognised as a benefit or a problem.",
    pairs: ["Many landless families gained land", "Many former farm workers lost their jobs", "Growth of smallholder tobacco growing", "Agro-processing firms lost supplies"],
    right: ["Recognised benefit", "Recognised problem"],
    rightIndex: [0, 1, 0, 1],
    explanation: "Wider access to land and growth of smallholder production are recognised benefits; job losses and effects on agro-industries are recognised problems.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Farmers without title deeds cannot easily use land as {{blank:a}}, so they find it hard to get {{blank:b}}, which limits {{blank:c}} in irrigation and machinery.",
    blanks: [
      { id: "a", accepted: ["collateral"], choices: ["collateral", "income"] },
      { id: "b", accepted: ["loans"], choices: ["loans", "subsidies"] },
      { id: "c", accepted: ["investment"], choices: ["investment", "consumption"] },
    ],
    wrong: [["income", "subsidies", "consumption"]],
    explanation: "Secure tenure lets land be used as collateral for loans, which finance investment.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Identify and explain **two** aims of Zimbabwe's land reform programme.",
    points: [
      "Identifies correcting the unequal distribution of land / broadening ownership.",
      "Explains: much of the best land had been held by relatively few large farms at independence.",
      "Identifies resettling the landless / decongesting communal areas / reducing rural poverty.",
      "Explains: crowded communal areas had poor soils and too little land per family.",
    ],
    modelAnswer: "One aim was to correct the unequal distribution of land inherited from the colonial period, when much of the best-watered land was held by relatively few large commercial farms, and so broaden ownership. Another was to resettle landless and land-short families and reduce overcrowding in communal areas, where soils were poorer and there was too little land per family, so as to reduce rural poverty.",
    hints: ["Think about who held the land and who needed it."],
    explanation: "One mark for each aim and one for explaining why it was pursued.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a fall in commercial agricultural output can affect the rest of Zimbabwe's economy.",
    points: [
      "Agro-processing firms receive fewer raw materials, so they cut output and jobs.",
      "Export earnings from farm products fall, so less foreign currency comes in.",
      "More food may need to be imported, using scarce foreign currency.",
      "Lower incomes in farming reduce spending / tax revenue across the economy.",
    ],
    modelAnswer: "Millers, oil expressers and other agro-processors receive fewer raw materials, so they cut output and jobs. Exports of farm products fall, so less foreign currency enters the economy, while more food may have to be imported. Lower farm and factory incomes reduce spending in shops and services and the government's tax revenue.",
    hints: ["Follow the effects to processors, exports and incomes."],
    explanation: "One mark for each developed link to another part of the economy.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 14,
    stem: `The table shows fictional figures for one farming district in a southern African country that redistributed large farms to many smaller farmers.\n\n${tD}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: pctChange(d0.hh, d1.hh), stem: "Calculate the percentage increase in households farming, to one decimal place.", wrong: [((d1.hh - d0.hh) / d1.hh) * 100], explanation: `(${d1.hh} − ${d0.hh}) ÷ ${d0.hh} × 100 = ${fmt(pctChange(d0.hh, d1.hh), 1)}%.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(d0.cotton, d1.cotton), stem: "Calculate the percentage change in cotton output, to one decimal place.", wrong: [((d1.cotton - d0.cotton) / d1.cotton) * 100], explanation: `(${d1.cotton} − ${d0.cotton}) ÷ ${d0.cotton} × 100 = ${fmt(pctChange(d0.cotton, d1.cotton), 1)}%.` }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain **two** possible reasons, other than land reform itself, why soya bean output fell.", points: ["Drought / poor rainfall reduced yields.", "Explains the effect on yields or planting.", "Shortage or high cost of inputs (seed, fertiliser, fuel) or finance.", "Explains: farmers planted less or used fewer inputs, lowering yields."], modelAnswer: "A drought in the period could have reduced yields, since soya beans need adequate rain. Shortages or high prices of seed, fertiliser and fuel, or lack of loans, could also have forced farmers to plant smaller areas or use fewer inputs, so output fell." }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "Using the data, discuss whether the reform has benefited the district.",
        points: [
          `Many more households farm (${d0.hh} to ${d1.hh}): wider access to land and self-employment.`,
          `Cotton output rose by ${fmt(pctChange(d0.cotton, d1.cotton), 1)}%, suggesting smallholders can expand some crops.`,
          `Soya output fell by ${fmt(Math.abs(pSoy), 1)}% and permanent farm jobs fell by ${fmt(Math.abs(pJobs), 1)}%: lost output and wage employment.`,
          "Other causes / the time period / no data on incomes or food security limit the judgement.",
          "Considers what support (finance, inputs, tenure) would raise output.",
          "Justified conclusion.",
        ],
        hints: ["Use figures for both gains and losses."],
        modelAnswer: `The reform has widened access to land: households farming rose from ${d0.hh} to ${d1.hh}, giving many families self-employment and food. Cotton output rose by ${fmt(pctChange(d0.cotton, d1.cotton), 1)}%, showing that small farmers can expand some crops. However, soya output fell by ${fmt(Math.abs(pSoy), 1)}% and permanent farm jobs by ${fmt(Math.abs(pJobs), 1)}%, so some output and wage employment were lost. The data do not show incomes or food security, and drought or input shortages may explain part of the fall. Overall the district has gained in access and some crops but lost in others; with secure tenure, finance and inputs the benefits are likely to grow over time.`,
      }),
    ],
    explanation: `(a) ${fmt(pctChange(d0.hh, d1.hh), 1)}%. (b) ${fmt(pctChange(d0.cotton, d1.cotton), 1)}%. (c) Drought, inputs, finance. (d) Wider access and cotton growth against lost soya output and jobs.`,
    hints: ["Percentage change = change ÷ original × 100."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A new A1 farmer in Mashonaland has 6 hectares of land under a permit, little equipment and no access to bank loans.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain why the permit makes it hard for the farmer to borrow.", points: ["A permit is not a title deed that a bank accepts as collateral.", "So the bank has no security if the loan is not repaid and refuses or charges more."], modelAnswer: "The permit does not give ownership that the farmer can pledge as collateral, so a bank has no security if the loan is not repaid and is unwilling to lend." }),
      P.manual({ label: "(b)", marks: 6, levels: LV(6), stem: "Discuss whether contract farming (a buyer supplies inputs on credit and buys the crop) is a good solution to the farmer's problems.", points: ["For: gives access to seed, fertiliser and advice without a bank loan.", "For: a guaranteed buyer reduces marketing risk.", "Against: the buyer may set a low price / deduct input costs, leaving little profit.", "Against: farmer may become dependent on one buyer and one crop.", "Against/limit: does not solve long-term investment needs such as irrigation or equipment.", "Justified conclusion."], hints: ["Who sets the price in a contract?"], modelAnswer: "Contract farming lets the farmer obtain seed, fertiliser and advice on credit without needing collateral, and a guaranteed buyer reduces the risk of being unable to sell. However, the buyer may pay a low price and deduct the input costs, leaving little profit, and the farmer may become dependent on one buyer and one crop. It also does not finance long-term investment such as irrigation. It is a useful short-term solution, but secure tenure and access to credit are needed for the farm to grow." }),
    ],
    explanation: "(a) No collateral. (b) Inputs and a market against low prices, dependence and no long-term investment.",
    hints: ["Think about collateral and risk."],
  });

  b.card("DEFINITION", "Land reform", "A deliberate change by government in the ownership, distribution or use of land.");
  b.card("FACT", "When did Zimbabwe's fast-track land reform programme begin?", "In 2000.");
  b.card("CONCEPT", "Aims of Zimbabwe's land reform", "Correct the unequal distribution of land, resettle the landless, decongest communal areas, broaden ownership, reduce rural poverty.");
  b.card("CONCEPT", "Recognised benefits of land reform", "Wider access to land, many new farmers, self-employment, growth of smallholder production of some crops such as tobacco.");
  b.card("CONCEPT", "Recognised problems of land reform", "Falls in commercial output and exports in the early years, job losses for farm workers, effects on agro-industries, limited finance where tenure could not be used as collateral.");
  b.card("DEFINITION", "Land tenure", "The terms on which land is held: freehold title, leasehold, permits or communal land.");
  b.card("CONCEPT", "Why does secure tenure matter for output?", "Land that can be used as collateral helps farmers borrow to invest in irrigation, machinery and inputs.");
  b.card("CONCEPT", "Other causes of changes in farm output after 2000", "Droughts, the economic crisis and hyperinflation of 2007-2008, and shortages of inputs and finance.");
});
