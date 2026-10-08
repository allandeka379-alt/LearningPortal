// W4b: limitations of accounting statements (Cambridge 6.5). Cambridge-only concept: tagged automatically.
import { concept, P, money } from "../lib.mjs";
import { ratios, table, fmt, r2, check, d1 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.limitations", { file: "analysis/limitations", keyPrefix: "analysis.limitations" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Recording a building at the price paid for it many years ago is an example of …",
    options: [
      ["historic cost", "Correct: assets are kept at their original cost."],
      ["net realisable value", "This is the expected selling price less costs, used for inventory."],
      ["the going concern concept", "Going concern assumes the business will continue; it is not about the purchase price."],
      ["the realisation concept", "Realisation is about when revenue is recognised."],
    ],
    answer: "A",
    explanation: "Historic cost is objective but may be out of date.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a **non-financial** factor that the statements do not show?",
    options: [
      ["The skills and experience of the workforce", "Correct: these cannot be measured reliably in money."],
      ["The wages paid during the year", "Wages are an expense in the income statement."],
      ["The value of inventory at the year end", "Inventory appears in the statement of financial position."],
      ["The amount owed by credit customers", "Trade receivables are a current asset."],
    ],
    answer: "A",
    explanation: "Money measurement means only items with a money value are recorded; staff skills are left out.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A business owns land bought in 2005, shown at cost. Its current value is much higher. What effect does historic cost have on ROCE?",
    options: [
      ["ROCE is overstated because capital employed is too low", "Correct: the same profit is divided by an undervalued capital employed."],
      ["ROCE is understated because capital employed is too high", "Undervalued assets make capital employed too low, not too high."],
      ["ROCE is overstated because profit is too low", "A lower profit would reduce ROCE."],
      ["ROCE is unaffected because land is not depreciated", "Land is still part of capital employed."],
    ],
    answer: "A",
    hints: ["ROCE = profit before interest ÷ capital employed."],
    explanation: "Assets at old costs understate capital employed, so ROCE looks better than the return on current values.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two businesses make identical sales and purchases, but one estimates a shorter useful life for its vehicles. Compared with the other, its statements will show …",
    options: [
      ["lower profit and lower vehicle net book value", "Correct: a shorter life means a larger annual depreciation charge."],
      ["higher profit and higher vehicle net book value", "This is the effect of a longer life."],
      ["lower gross profit", "Depreciation is below gross profit."],
      ["no difference, because cash spent is the same", "Profit depends on the depreciation estimate, not the cash spent."],
    ],
    answer: "A",
    explanation: "Estimates such as useful life change profit and asset values from the same transactions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which accounting concept explains why a business's good reputation is not shown in its statements?",
    options: [
      ["Money measurement", "Correct: only items that can be measured reliably in money are recorded."],
      ["Duality", "Duality is about the two-sided effect of transactions."],
      ["Consistency", "Consistency is about using the same methods each year."],
      ["Matching", "Matching relates expenses to the income of the period."],
    ],
    answer: "A",
    explanation: "Reputation cannot be measured reliably in money, so it is left out.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An investor is studying a Harare taxi company's latest statements. Which piece of information would the statements **not** reveal?",
    options: [
      ["Fuel prices will rise next year", "Correct: future economic conditions are not in historical statements."],
      ["The cost of fuel used in the year", "Fuel is an expense in the income statement."],
      ["The net book value of the vehicles", "This is in the statement of financial position."],
      ["The loan outstanding at the year end", "Loans are liabilities in the statement of financial position."],
    ],
    answer: "A",
    hints: ["Statements record what has already happened."],
    explanation: "Statements are historical; expected changes in the economic climate are not recorded.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do accountants use historic cost despite its limitations?",
    options: [
      ["It is objective and can be checked against invoices", "Correct: the original price is a fact, not an opinion."],
      ["It always shows the current value of assets", "It does not; that is its main limitation."],
      ["It gives the highest possible profit", "Historic cost is used for reliability, not to raise profit."],
      ["It is required only for service businesses", "Historic cost applies to all businesses."],
    ],
    answer: "A",
    explanation: "Historic cost is reliable and verifiable, even if it becomes out of date.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "A bank is deciding whether to lend to a small poultry farm. Which non-financial factor is likely to matter most alongside the farm's ratios?",
    options: [
      ["The owner's experience and the reliability of feed supplies", "Correct: these affect the farm's future ability to repay but are not in the statements."],
      ["The farm's profit margin last year", "This is a financial figure already available from the statements."],
      ["The farm's current ratio", "This is a financial ratio."],
      ["The depreciation method used for the fowl runs", "This is an accounting policy, shown in the notes, not a non-financial factor."],
    ],
    answer: "A",
    hints: ["Non-financial factors cannot be found in the statements."],
    explanation: "Skills, supply chains, disease risk and the economic climate all affect repayment but are outside the statements.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Financial statements show the value of a business's skilled workforce as an asset.",
    answer: false,
    explanation: "False. Staff skills cannot be measured reliably in money, so they are not recorded.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Two businesses with identical transactions can report different profits because they choose different depreciation methods.",
    answer: true,
    explanation: "True. Accounting policies and estimates change reported profit.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each situation with the limitation of accounting statements it illustrates.",
    right: ["Historic cost", "Accounting policies and estimates", "Non-financial factors"],
    pairs: ["Premises bought in 2010 are shown at their 2010 price", "One shop allows 2% for irrecoverable debts, another 6%", "A key manager is about to leave", "Machinery is depreciated over 4 years by one firm and 8 years by another", "A new road will take customers away from the shop"],
    rightIndex: [0, 1, 2, 1, 2],
    explanation: "Old prices are a historic cost issue; allowances and useful lives are estimates; staff and location changes are non-financial.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Financial statements are {{blank:a}}: they record past transactions in money, at the {{blank:b}} cost of assets, using {{blank:c}} chosen by the business.",
    blanks: [
      { id: "a", accepted: ["historical"], choices: ["historical", "forecasts", "budgets"] },
      { id: "b", accepted: ["historic"], choices: ["historic", "replacement", "selling"] },
      { id: "c", accepted: ["accounting policies"], choices: ["accounting policies", "bank statements", "selling prices"] },
    ],
    explanation: "These are the main limitations examined.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const profit = 21600, ce = 144000, landCost = 30000, landValue = 96000;
    const hist = ratios.roce(profit, ce), curr = ratios.roce(profit, ce - landCost + landValue);
    b.calc({
      d: 4, kind: "pct", value: curr, calculator: true, wrong: [d1(hist), d1(ratios.roce(profit, ce + landValue))],
      stem: `A business has capital employed of ${money(ce)}, which includes land at its cost of ${money(landCost)}. The land is now worth ${money(landValue)}. Profit before interest was ${money(profit)}. Calculate the ROCE if the land were shown at its current value, to one decimal place.`,
      hints: ["Replace the land's cost with its current value in capital employed."],
      explanation: `Capital employed at current value = ${fmt(ce)} − ${fmt(landCost)} + ${fmt(landValue)} = ${fmt(ce - landCost + landValue)}. ROCE = ${fmt(profit)} ÷ ${fmt(ce - landCost + landValue)} × 100 = ${d1(curr)}% (compared with ${d1(hist)}% at historic cost). Adding the value without removing the cost gives ${d1(ratios.roce(profit, ce + landValue))}%.`,
    });
  }
  {
    const cost = 48000, lifeA = 4, lifeB = 8;
    const diff = r2(cost / lifeA - cost / lifeB);
    check("lim num2", diff, 6000);
    b.num({
      d: 3, kind: "money", value: diff, wrong: [r2(cost / lifeA)],
      stem: `Two firms each buy machinery for ${money(cost)} with no residual value and use straight-line depreciation. Firm A estimates a useful life of ${lifeA} years; Firm B estimates ${lifeB} years. By how much is Firm A's annual profit lower than Firm B's, all else being equal?`,
      hints: ["Find each annual charge."],
      explanation: `A: ${fmt(cost)} ÷ ${lifeA} = ${fmt(cost / lifeA)}; B: ${fmt(cost)} ÷ ${lifeB} = ${fmt(cost / lifeB)}. Difference ${fmt(diff)}.`,
    });
  }
  {
    const recv = 26400, pA = 2, pB = 5;
    const diff = r2((recv * (pB - pA)) / 100);
    b.num({
      d: 2, kind: "money", value: diff, wrong: [r2((recv * pB) / 100)],
      stem: `In their first year, two shops each have trade receivables of ${money(recv)}. One makes an allowance for irrecoverable debts of ${pA}%, the other ${pB}%. What is the difference between their profits caused by this estimate?`,
      explanation: `${pB}% − ${pA}% = 3% of ${fmt(recv)} = ${fmt(diff)}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** limitation of using historic cost in the statement of financial position.",
    points: ["Assets bought long ago are shown at old prices / below current value", "So the statement understates the business's worth (or overstates ROCE / makes comparisons misleading)"],
    modelAnswer: "Premises bought years ago are still shown at their original price, which may be far below their value today, so the statement understates the resources of the business and makes its ROCE look higher than it really is.",
    explanation: "Name it and explain its effect.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Thandeka plans to buy a grocery shop in Bulawayo. Its statements show strong ratios. Suggest **three** non-financial factors she should investigate before buying.",
    points: ["Workforce: skills, experience, whether key staff will stay", "Location: customer numbers, competition nearby, lease terms, security", "Economic climate / reputation / supplier relationships / condition of premises"],
    modelAnswer: "She should find out whether the experienced staff will stay after the sale, whether a new supermarket is planned nearby or the lease is about to end, and how changes in prices and customers' incomes could affect sales.",
    hints: ["People, place and the wider economy."],
    explanation: "Non-financial factors affect future success but are not in the statements.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const ce = 175000, premCost = 40000, premValue = 120000, profit = 26250, interest = 0;
    const roceHist = ratios.roce(profit + interest, ce);
    const roceCurr = ratios.roce(profit + interest, ce - premCost + premValue);
    b.struct({
      d: 4, examStyle: true, skill: "EVALUATION", calculator: true,
      stem: `Mutare Hardware Ltd's statement of financial position at 31 December 2025 shows capital employed of ${money(ce)}. This includes premises bought in 2009 at a cost of ${money(premCost)}; an estate agent values them at ${money(premValue)} today. Profit for the year was ${money(profit)}; the company has no loans. Its machinery is depreciated over 10 years, whereas most similar businesses use 6 years. Its most experienced manager retires next month.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: roceHist, stem: "Calculate the ROCE based on the statement of financial position, to one decimal place.", explanation: `${fmt(profit)} ÷ ${fmt(ce)} × 100 = ${d1(roceHist)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: roceCurr, wrong: [d1(ratios.roce(profit, ce + premValue))], stem: "Calculate the ROCE if the premises were shown at their current value, to one decimal place.", explanation: `Capital employed ${fmt(ce)} − ${fmt(premCost)} + ${fmt(premValue)} = ${fmt(ce - premCost + premValue)}; ROCE ${d1(roceCurr)}%.` }),
        P.mcq({ label: "(c)", stem: "If the company used a 6-year life for its machinery like similar businesses, its profit for the year would be …", options: [["lower", "Correct: a shorter life means a bigger annual depreciation charge."], ["higher", "A shorter life increases depreciation and reduces profit."], ["unchanged", "Depreciation is an expense, so profit would change."], ["unchanged, but gross profit would fall", "Depreciation is below gross profit."]], answer: "A", explanation: "A shorter useful life raises the depreciation charge." }),
        P.manual({ label: "(d)", marks: 4, stem: "Using the information, explain **two** limitations of relying on the company's statements to judge its performance.", points: ["Historic cost: premises at 2009 cost understate capital employed", `So ROCE of ${d1(roceHist)}% overstates the true return (${d1(roceCurr)}% on current values)`, "Accounting policy/estimate: 10-year machinery life is longer than usual, so depreciation is low and profit flattered / not comparable with similar businesses", "Non-financial: the experienced manager's retirement is not shown but may hurt future results"], modelAnswer: `First, historic cost: the premises are shown at their 2009 price, so capital employed is understated and the ROCE of ${d1(roceHist)}% looks better than the ${d1(roceCurr)}% earned on current values. Second, the company's depreciation estimate is generous: a 10-year life gives a lower charge than the 6 years used by similar firms, so its profit is flattered and cannot be compared directly. (Also, the statements say nothing about the experienced manager retiring.)`, explanation: "Two limitations, each named and linked to the case (2 marks each)." }),
      ],
      hints: ["Replace the premises' cost with their current value in capital employed."],
      explanation: `ROCE ${d1(roceHist)}% at historic cost; ${d1(roceCurr)}% on current values.`,
    });
  }
  // ---------------------------------------------------------------- Practice structured 2 (estimates)
  {
    const rev = 124000, gp = 37200, other = 18600, van = 24000, recv = 15000;
    const A = { life: 4, pct: 4 }, B = { life: 6, pct: 1 };
    const np = (x) => r2(gp - other - van / x.life - (recv * x.pct) / 100);
    const nA = np(A), nB = np(B);
    check("lim s2", r2(nB - nA), 2450);
    b.struct({
      d: 3, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Two new courier businesses in Harare each had revenue of ${money(rev)}, gross profit of ${money(gp)}, other expenses of ${money(other)}, a van costing ${money(van)} (no residual value, straight-line depreciation) and trade receivables of ${money(recv)} at the end of their first year.\n\n${table(["Estimate", "Courier A", "Courier B"], [["Useful life of van", "4 years", "6 years"], ["Allowance for irrecoverable debts", "4%", "1%"]])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: nA, stem: "Calculate Courier A's profit for the year.", explanation: `${fmt(gp)} − ${fmt(other)} − ${fmt(van / 4)} − ${fmt((recv * 4) / 100)} = ${fmt(nA)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: nB, stem: "Calculate Courier B's profit for the year.", explanation: `${fmt(gp)} − ${fmt(other)} − ${fmt(van / 6)} − ${fmt((recv * 1) / 100)} = ${fmt(nB)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "pct", value: ratios.profitMargin(nB, rev), stem: "Calculate Courier B's profit margin, to one decimal place.", explanation: `${fmt(nB)} ÷ ${fmt(rev)} × 100 = ${d1(ratios.profitMargin(nB, rev))}% (Courier A ${d1(ratios.profitMargin(nA, rev))}%).` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why the difference in profit does not show that Courier B is better managed.", points: ["Both businesses had identical trading results", "The difference comes only from estimates (useful life, allowance) chosen by each owner"], modelAnswer: `Their revenue, gross profit and expenses were the same. Courier B reports ${money(r2(nB - nA))} more profit only because it estimates a longer van life and a smaller allowance for irrecoverable debts.`, explanation: "Accounting estimates limit comparability." }),
      ],
      hints: ["Depreciation = cost ÷ useful life; allowance = % × receivables."],
      explanation: `Courier A ${fmt(nA)}; Courier B ${fmt(nB)}.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Historic cost", "Recording assets at the price originally paid, not at current value.");
  b.card("CONCEPT", "Limitation of historic cost", "Old assets may be undervalued, so capital employed is too low and ROCE looks too high; comparisons may mislead.");
  b.card("CONCEPT", "Accounting policies and estimates as a limitation", "Depreciation method and life, allowances and inventory valuation change profit and assets from the same transactions.");
  b.card("FACT", "Non-financial factors not in the statements", "Workforce skills, location, economic climate, competition, reputation, supplier relationships.");
  b.card("CONCEPT", "Money measurement", "Only items that can be measured reliably in money are recorded, so non-financial factors are left out.");
  b.card("FACT", "Why use historic cost at all?", "It is objective and can be checked against source documents.");
  b.card("FACT", "Statements look backwards", "They record past transactions, but users want to predict future performance.");
  b.card("CONCEPT", "Effect of a longer estimated useful life", "Lower depreciation each year, so higher profit and higher net book value.");
});
