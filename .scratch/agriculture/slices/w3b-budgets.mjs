// Slice W3b: farm budgets and gross margins (ZIMSEC only).
import { concept, P, grossMargin, partialBudget, round, check, table, agricultureLevels } from "../lib.mjs";

// Num: sorghum GM per ha.
const s1 = grossMargin({ output: [["Sorghum (t)", 3 * 2.4, 260]], variable: [["All variable costs", 690]], areaHa: 3 });
for (const k of ["grossOutput","grossMargin","perHa"]) s1[k] = round(s1[k], 2);
check(Math.abs(s1.grossOutput - 1872) < 1e-9 && Math.abs(s1.grossMargin - 1182) < 1e-9 && Math.abs(s1.perHa - 394) < 1e-9, "s1");
// Num: goats GM per doe.
const g1 = grossMargin({ output: [["Kids sold", 18, 45], ["Cull does", 3, 60]], variable: [["Supplementary feed", 150], ["Dip and veterinary", 96]], head: 12 });
check(g1.grossOutput === 990 && g1.grossMargin === 744 && g1.perHead === 62, "g1");
// Num: gross output 1.8 t x US$350.
const go = round(1.8 * 350, 2);
check(go === 630, "go");
// Num: whole farm.
const wf = 2300 + 1150 + 480 - 1980;
check(wf === 1950, "wf");
// Calc: partial budget, 2 ha sunflower -> sugar beans.
const pb = partialBudget({
  extraIncome: [["Sugar beans 2 ha x 1.6 t x 700", 2 * 1.6 * 700]],
  costsSaved: [["Sunflower variable costs 2 x 180", 2 * 180]],
  extraCosts: [["Bean variable costs 2 x 420", 2 * 420]],
  incomeLost: [["Sunflower 2 ha x 1.2 t x 400", 2 * 1.2 * 400]],
});
for (const k of ["gains","losses","net"]) pb[k] = round(pb[k], 2);
check(Math.abs(pb.gains - 2600) < 1e-9 && Math.abs(pb.losses - 1800) < 1e-9 && Math.abs(pb.net - 800) < 1e-9, "pb");

// Structured 12: two crops per ha.
const GN = grossMargin({ output: [["Groundnuts (t)", 1.5, 850]], variable: [["Seed", 240], ["Gypsum", 45], ["Chemicals", 60], ["Labour", 220], ["Transport and bags", 75]], areaHa: 1 });
for (const k of ["grossOutput","grossMargin"]) GN[k] = round(GN[k], 2);
const CT = grossMargin({ output: [["Seed cotton (t)", 1.3, 550]], variable: [["Seed", 35], ["Fertiliser", 170], ["Chemicals", 140], ["Labour", 240], ["Transport and bags", 40]], areaHa: 1 });
for (const k of ["grossOutput","grossMargin"]) CT[k] = round(CT[k], 2);
check(Math.abs(GN.grossOutput - 1275) < 1e-9 && GN.variableCosts === 640 && Math.abs(GN.grossMargin - 635) < 1e-9, "GN");
check(Math.abs(CT.grossOutput - 715) < 1e-9 && CT.variableCosts === 625 && Math.abs(CT.grossMargin - 90) < 1e-9, "CT");
const GC_TABLE = table(["Item (per ha)", "Groundnuts", "Cotton"], [
  ["Expected yield (t/ha)", "1.5", "1.3"],
  ["Price (US\\$ per t)", 850, 550],
  ["Seed (US\\$)", 240, 35],
  ["Fertiliser or gypsum (US\\$)", 45, 170],
  ["Chemicals (US\\$)", 60, 140],
  ["Casual labour (US\\$)", 220, 240],
  ["Transport and bags (US\\$)", 75, 40],
]);
// Structured 8: partial budget for buying a sheller instead of hiring.
const SH = partialBudget({ costsSaved: [["Hire of sheller", 260]], extraIncome: [["Shelling for neighbours", 150]], extraCosts: [["Depreciation", 120], ["Repairs and fuel", 95]] });
check(SH.gains === 410 && SH.losses === 215 && SH.net === 195, "SH");
const SH_TABLE = table(["Item for one year", "US\\$"], [["Hire of a sheller, no longer needed", 260], ["Income from shelling neighbours' maize", 150], ["Depreciation of the new sheller", 120], ["Repairs and fuel for the sheller", 95]]);

concept("agri.business.budgets", { file: "business/budgets", keyPrefix: "business.budgets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **variable** cost of a maize enterprise?",
    options: [
      ["Seed", "Correct: it rises with the area planted."],
      ["Rent of the farm", "Rent is a fixed cost shared by the whole farm."],
      ["Depreciation of the tractor", "Depreciation is a fixed cost."],
      ["Wages of the permanent foreman", "Permanent wages are fixed costs."],
    ],
    answer: "A",
    explanation: "Variable costs change with enterprise size: seed, fertiliser, chemicals, casual labour, transport.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **fixed** cost?",
    options: [
      ["Insurance of the farm buildings", "Correct: it does not change with the size of an enterprise."],
      ["Fertiliser for the wheat", "This is a variable cost of wheat."],
      ["Feed for the broilers", "This is a variable cost of broilers."],
      ["Packaging for the tomatoes sold in town", "This is a variable cost of tomatoes."],
    ],
    answer: "A",
    explanation: "Fixed costs (rent, insurance, depreciation, permanent wages, interest) are shared by the whole farm.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How is the gross margin of an enterprise calculated?",
    options: [
      ["Gross output minus variable costs", "Correct."],
      ["Gross output minus fixed costs", "Fixed costs are not subtracted in a gross margin."],
      ["Gross output minus all costs", "That gives net profit, not gross margin."],
      ["Variable costs minus fixed costs", "This has no meaning."],
    ],
    answer: "A",
    explanation: "Gross margin = gross output − variable costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why are fixed costs left out when gross margins are used to compare enterprises?",
    options: [
      ["They are paid whichever enterprise is chosen", "Correct: they do not change between the choices."],
      ["They are always too small to matter", "Fixed costs can be large."],
      ["They are already counted in the expected yields", "Yields do not include costs."],
      ["They are paid by the government", "Farmers pay their own fixed costs."],
    ],
    answer: "A",
    explanation: "Fixed costs are shared by the whole farm and do not change with the choice, so leaving them out gives a fair comparison.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", daily: true,
    stem: "Which source gives a farmer the best yield figures for budgeting on **her own** farm?",
    options: [
      ["Her own records from past seasons", "Correct: they reflect her own soil, rainfall and skill."],
      ["A seed advertisement on the radio", "Adverts may show the best results, not typical ones."],
      ["The yield of a farm in another region", "Conditions differ between regions."],
      ["The highest yield she has ever heard of", "A budget needs realistic, typical figures."],
    ],
    answer: "A",
    hints: ["Which figures come from the same land and management?"],
    explanation: "Past records are the most realistic guide; extension officers and handbooks help where records are missing.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farmer prepares a partial budget for buying a planter instead of hiring one. In which part of the budget does the hire charge he will no longer pay belong?",
    options: [
      ["Costs saved", "Correct: it is a gain from the change."],
      ["Extra costs", "These are new costs the change causes, such as depreciation."],
      ["Income lost", "No income is lost by not hiring."],
      ["Extra income", "Saving a cost is not new income."],
    ],
    answer: "A",
    hints: ["Is it a gain or a loss, income or cost?"],
    explanation: "A cost that disappears because of the change is a cost saved, on the gains side.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A partial budget for replacing 1 ha of maize with sunflowers gives a net change of −US\\$85. What should the farmer conclude?",
    options: [
      ["On these figures the change would reduce profit", "Correct: losses exceed gains."],
      ["The change would raise profit by US\\$85", "A negative net change is a fall in profit."],
      ["Sunflower is always less profitable than maize", "The result applies to these figures only."],
      ["The budget must be wrong, since budgets cannot be negative", "Negative results are normal."],
    ],
    answer: "A",
    hints: ["Net change = gains − losses."],
    explanation: "A negative net change means the change is expected to lower profit; other factors such as rotation or risk may still be weighed.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In which situation is a **whole-farm** budget, rather than a partial budget, needed?",
    options: [
      ["Planning a new farm with several enterprises", "Correct: every enterprise and the fixed costs must be included."],
      ["Changing the feed given to the broilers", "A partial budget tests one change."],
      ["Deciding whether to buy a knapsack sprayer", "A partial budget is enough."],
      ["Replacing one field of maize with soya beans", "This is a typical partial budget."],
    ],
    answer: "A",
    hints: ["Does the change affect one part or the whole farm?"],
    explanation: "Whole-farm budgets are used when starting a farm, making major changes or applying for large loans.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Expressing gross margins per hectare allows enterprises of different sizes to be compared fairly.",
    answer: true,
    explanation: "True. Per hectare (or per head) figures remove the effect of size.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Classify each cost of a mixed farm as fixed or variable.",
    pairs: ["Dairy meal for the cows", "Depreciation of farm buildings", "Wheat seed", "Interest on a long-term loan", "Casual labour for harvesting", "Salary of the permanent manager"],
    right: ["Variable cost", "Fixed cost"],
    rightIndex: [0, 1, 0, 1, 0, 1],
    explanation: "Variable costs belong to one enterprise and change with its size; fixed costs are shared by the whole farm.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "In a whole-farm budget, net farm income = total gross margin − {{blank:a}} costs.",
    blanks: [{ id: "a", accepted: ["fixed", "overhead", "overheads"] }],
    explanation: "Total gross margin minus fixed costs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of budget used to test a change to only one part of the farm.",
    accepted: ["partial budget", "a partial budget", "partial"],
    keywords: { all: ["partial"] },
    explanation: "A **partial budget**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A farmer expects to harvest 1.8 t of sugar beans. Assume the price is US\\$350 per tonne. Calculate the gross output.",
    value: go, prefix: "US$", wrong: [350, round(350 / 1.8, 2)],
    explanation: `1.8 × 350 = US\\$${go}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Rudo plans 3 ha of sorghum yielding 2.4 t/ha. Assume a price of US\\$260 per tonne and total variable costs of US\\$690 for the 3 ha. Calculate the gross margin **per hectare**.",
    value: s1.perHa, prefix: "US$", wrong: [s1.grossMargin, round(2.4 * 260 - 690, 2)],
    hints: ["Find total gross output first, then subtract, then divide by the area."],
    explanation: `Gross output = 3 × 2.4 × 260 = US\\$${s1.grossOutput.toLocaleString("en-GB")}; gross margin = ${s1.grossOutput.toLocaleString("en-GB")} − 690 = US\\$${s1.grossMargin.toLocaleString("en-GB")}; per ha = ${s1.grossMargin.toLocaleString("en-GB")} ÷ 3 = US\\$${s1.perHa}. US\\$1,182 is the margin for all 3 ha.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A goat enterprise of 12 does sells 18 kids at US\\$45 each and 3 cull does at US\\$60 each. Variable costs are US\\$150 for supplementary feed and US\\$96 for dipping and veterinary care. Calculate the gross margin per doe.",
    value: g1.perHead, prefix: "US$", wrong: [g1.grossMargin, round(g1.grossMargin / 21, 2)],
    hints: ["Gross output includes both kinds of sales.", "Divide by the number of does kept."],
    explanation: `Gross output = 18 × 45 + 3 × 60 = 810 + 180 = US\\$${g1.grossOutput}; variable costs = 150 + 96 = US\\$${g1.variableCosts}; gross margin = US\\$${g1.grossMargin}; per doe = ${g1.grossMargin} ÷ 12 = US\\$${g1.perHead}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION",
    stem: "A farm's enterprises have expected gross margins of US\\$2,300 (wheat), US\\$1,150 (beef) and US\\$480 (vegetables). Fixed costs are US\\$1,980. Calculate the expected net farm income.",
    value: wf, prefix: "US$", wrong: [2300 + 1150 + 480, 2300 + 1150 + 480 + 1980],
    hints: ["Total the gross margins, then subtract the fixed costs."],
    explanation: `Total gross margin = 2,300 + 1,150 + 480 = US\\$3,930; net farm income = 3,930 − 1,980 = US\\$${wf.toLocaleString("en-GB")}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Sipho is thinking of replacing 2 ha of sunflowers with sugar beans. Assume: sugar beans 1.6 t/ha at US\\$700 per tonne with variable costs of US\\$420 per ha; sunflowers 1.2 t/ha at US\\$400 per tonne with variable costs of US\\$180 per ha. Prepare a partial budget and calculate the net change in profit for the 2 ha.",
    value: pb.net, prefix: "US$", wrong: [round(2 * 1.6 * 700 - 2 * 420, 2), pb.gains],
    hints: ["Gains = extra income + costs saved.", "Losses = extra costs + income lost."],
    explanation: `Extra income = 2 × 1.6 × 700 = US\\$2,240; costs saved = 2 × 180 = US\\$360; extra costs = 2 × 420 = US\\$840; income lost = 2 × 1.2 × 400 = US\\$960. Net change = (2,240 + 360) − (840 + 960) = 2,600 − 1,800 = US\\$${pb.net}, so the change should raise profit. Ignoring the sunflower income lost gives a figure far too high.`,
    workedSolution: `1. Extra income (beans) = 2 × 1.6 × US\\$700 = US\\$2,240.\n2. Costs saved (sunflower variable costs) = 2 × US\\$180 = US\\$360.\n3. Extra costs (bean variable costs) = 2 × US\\$420 = US\\$840.\n4. Income lost (sunflowers) = 2 × 1.2 × US\\$400 = US\\$960.\n5. Gains = 2,240 + 360 = US\\$2,600; losses = 840 + 960 = US\\$1,800.\n6. Net change = 2,600 − 1,800 = +US\\$${pb.net}.`,
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State **three** reasons why a farmer should prepare a budget before the season.",
    points: [
      "To plan which enterprises to run and their size / compare alternatives.",
      "To know how much money is needed and when (cash needs) / whether a loan is needed.",
      "To obtain credit or a contract / to control the season by comparing actual results with the budget.",
    ],
    modelAnswer: "A budget helps the farmer choose and size enterprises by comparing them, shows how much money is needed and when so a loan can be arranged, and gives a target against which actual costs and yields can be checked during the season.",
    explanation: "Plan, cash needs, credit and control.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A farmer finds that soya beans have a lower gross margin per hectare than maize, but still grows some soya beans. Suggest **two** reasons, explaining each.",
    hints: ["What do gross margins leave out?"],
    points: [
      "Rotation benefit: soya beans fix nitrogen.",
      "So the following maize needs less fertiliser / yields more, which the soya gross margin does not show.",
      "Spreading risk: two crops with different needs and markets.",
      "So a drought, pest or price fall is less likely to ruin the whole income (or: labour peaks are spread / contract gives a secure market).",
    ],
    modelAnswer: "Soya beans fix nitrogen, so the next maize crop needs less fertiliser and yields better, a benefit not shown in the soya gross margin. Growing two crops also spreads risk, so a bad season or price fall for one crop does not ruin the whole income.",
    explanation: "Gross margins ignore rotation effects and risk.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `Thandeka, near Gokwe, must choose between groundnuts and cotton for one hectare. Her budget figures are shown (assume these prices).\n\n${GC_TABLE}`,
    hints: ["Gross output = yield × price.", "Gross margin = gross output − total variable costs."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the gross output of the groundnuts.",
        value: GN.grossOutput, prefix: "US$", wrong: [850, round(850 / 1.5, 2)],
        explanation: `1.5 × 850 = US\\$${GN.grossOutput.toLocaleString("en-GB")}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the gross margin of the groundnuts.",
        value: GN.grossMargin, prefix: "US$", wrong: [GN.grossOutput - 240, GN.variableCosts],
        explanation: `Variable costs = 240 + 45 + 60 + 220 + 75 = US\\$${GN.variableCosts}; ${GN.grossOutput.toLocaleString("en-GB")} − ${GN.variableCosts} = US\\$${GN.grossMargin}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the gross margin of the cotton.",
        value: CT.grossMargin, prefix: "US$", wrong: [CT.grossOutput, CT.variableCosts],
        explanation: `Gross output = 1.3 × 550 = US\\$${CT.grossOutput}; variable costs = 35 + 170 + 140 + 240 + 40 = US\\$${CT.variableCosts}; gross margin = US\\$${CT.grossMargin}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which variable cost is much higher for groundnuts than for cotton?",
        options: [
          ["Seed", "Correct: US\\$240 against US\\$35."],
          ["Fertiliser or gypsum", "Cotton's is higher."],
          ["Chemicals", "Cotton's is higher."],
          ["Casual labour", "Cotton's is higher."],
        ],
        answer: "A",
        explanation: "Groundnut seed (the kernels planted) is costly; cotton needs more fertiliser, chemicals and labour.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Explain why the figures in a budget may differ from what actually happens.",
        points: ["Yields depend on rainfall, pests and diseases, which cannot be known in advance.", "Prices of inputs and produce can change during the season."],
        explanation: "Budgets are estimates.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Apart from the gross margin, suggest **three** factors Thandeka should consider before choosing.",
        points: ["Cash available at planting (groundnut seed is costly) / access to credit or a contract.", "Labour available at peak times (cotton picking, groundnut lifting and shelling).", "Rotation (groundnuts fix nitrogen), market reliability, risk of drought or pests, her skills."],
        explanation: "Cash, labour, rotation, market and risk.",
      }),
    ],
    explanation: "Calculate and compare gross margins of two crops and consider other factors in the choice.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8, calculator: true,
    stem: `Farai hires a maize sheller every year. He is considering buying his own. His estimates for one year are shown (assume these figures).\n\n${SH_TABLE}`,
    hints: ["Sort each item into gains (extra income, costs saved) and losses (extra costs, income lost)."],
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Calculate the total gains from buying the sheller.",
        value: SH.gains, prefix: "US$", wrong: [260, 150],
        explanation: "Costs saved 260 + extra income 150 = US\\$410.",
      }),
      P.num({
        label: "(b)", marks: 1, stem: "Calculate the total losses.",
        value: SH.losses, prefix: "US$", wrong: [120, 95],
        explanation: "Depreciation 120 + repairs and fuel 95 = US\\$215.",
      }),
      P.num({
        label: "(c)", marks: 2, stem: "Calculate the net change in profit per year.",
        value: SH.net, prefix: "US$", wrong: [260 - 120 - 95, 410 + 215],
        explanation: `410 − 215 = +US\\$${SH.net} per year.`,
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Evaluate whether Farai should buy the sheller.",
        points: [
          "The partial budget shows a gain of about US\\$195 a year, so buying appears profitable.",
          "Owning gives timely shelling when he needs it, reducing storage losses.",
          "But it needs a large sum of money now (or a loan with interest), and the US\\$150 from neighbours is uncertain.",
          "Judgement: buy if he can afford it and neighbours' demand is reliable; otherwise keep hiring or buy jointly.",
        ],
        levels: agricultureLevels(4),
        explanation: "Use the budget result and weigh non-budget factors.",
      }),
    ],
    explanation: "Prepare a partial budget for buying a machine and evaluate the decision.",
  });

  b.card("DEFINITION", "Budget", "A plan in figures of the expected income and costs of a farm or enterprise for a future period.");
  b.card("DEFINITION", "Variable costs", "Costs that change with enterprise size and belong to one enterprise: seed, fertiliser, feed, chemicals, casual labour, transport.");
  b.card("DEFINITION", "Fixed costs", "Costs shared by the whole farm that do not change with enterprise size in the short term: rent, depreciation, permanent wages, insurance, interest.");
  b.card("FORMULA", "Gross margin", "Gross output (yield × price) − variable costs; per ha or per head.");
  b.card("FORMULA", "Partial budget", "Net change = (extra income + costs saved) − (extra costs + income lost).");
  b.card("FORMULA", "Whole-farm budget", "Net farm income = total gross margin − fixed costs.");
  b.card("CONCEPT", "Why budget?", "Plan and compare enterprises, know cash needs, obtain credit, control the season, reduce risk.");
  b.card("CONCEPT", "Sources of budget information", "Own records, AGRITEX officers, farm management handbooks, input suppliers, buyers and marketing boards, banks, other farmers.");
  b.card("CONCEPT", "What gross margins leave out", "Fixed costs, rotation benefits, risk, labour peaks and cash timing.");
});
