// W4a: econ.growth.recession-policies (Cambridge only) — recession: definition, causes, consequences; policies to
// promote growth and their effectiveness. Figures differ from the lesson's worked examples.
import { concept, P, table, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.growth.recession-policies", { file: "growth/recession-policies", keyPrefix: "growth.recession-policies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A recession is",
    options: [
      ["a period in which real GDP falls, commonly for two consecutive quarters.", "Correct: negative economic growth."],
      ["a period in which the rate of economic growth slows down.", "Slower growth still means output is rising."],
      ["a period in which the general price level falls.", "That is deflation."],
      ["a period in which the budget deficit rises above a set limit.", "A deficit may widen in a recession, but that is not the definition."],
    ],
    answer: "A",
    explanation: "A recession is a period of negative economic growth: real GDP falls, usually over two consecutive quarters.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which would be most likely to cause a recession through a fall in total demand?",
    options: [
      ["A recession in the country's main export markets", "Correct: foreign buyers purchase fewer exports, so total demand falls."],
      ["A fall in interest rates by the central bank", "Lower interest rates usually raise borrowing and spending."],
      ["A cut in income tax rates", "Tax cuts raise disposable income and spending."],
      ["An increase in government spending on roads", "More government spending raises total demand."],
    ],
    answer: "A",
    explanation: "Exports are part of total demand; a recession abroad reduces them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a cause of recession through a fall in the **quantity or quality of resources**?",
    options: [
      ["A severe drought that destroys crops and livestock", "Correct: a supply shock reduces what the economy can produce."],
      ["A fall in consumer confidence", "This reduces demand, not resources."],
      ["A cut in government spending on public-sector wages", "This reduces demand."],
      ["A rise in the exchange rate that reduces exports", "This reduces export demand."],
    ],
    answer: "A",
    explanation: "Drought, floods, power shortages and emigration of workers reduce the resources available for production.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is most likely to happen to a government's budget during a recession, if tax rates and policies are unchanged?",
    options: [
      ["The deficit widens, because tax revenue falls and welfare spending rises", "Correct: lower incomes and spending reduce tax receipts."],
      ["The deficit narrows, because people spend less", "Lower spending reduces indirect tax revenue, worsening the budget."],
      ["The budget balance does not change, because tax rates are unchanged", "Revenue depends on incomes and spending, which fall."],
      ["A surplus appears, because imports fall", "Fewer imports do not raise government revenue."],
    ],
    answer: "A",
    explanation: "Less income, spending and profit to tax, and more people needing support, widen the deficit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which type of unemployment rises most directly in a recession?",
    options: [
      ["Cyclical unemployment", "Correct: falling total demand reduces the demand for labour."],
      ["Frictional unemployment", "This is caused by people moving between jobs."],
      ["Seasonal unemployment", "This follows the seasons, not the economic cycle."],
      ["Structural unemployment", "This comes from long-term changes in industries, though a recession can speed them up."],
    ],
    answer: "A",
    hints: ["Which type is linked to a lack of total demand?"],
    explanation: "Cyclical (demand-deficient) unemployment rises when total demand and output fall.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a cut in interest rates fail to end a recession?",
    options: [
      ["Households and firms are so pessimistic that they do not borrow more", "Correct: low confidence weakens the effect of cheaper credit."],
      ["Lower interest rates make borrowing more expensive", "Lower rates make borrowing cheaper."],
      ["Lower interest rates raise the exchange rate and so increase exports", "Lower rates tend to lower the exchange rate; and more exports would help."],
      ["Lower interest rates increase the income of savers, who then spend less", "Lower rates reduce savers' interest income."],
    ],
    answer: "A",
    hints: ["Cheaper loans only help if people want to borrow."],
    explanation: "If confidence is very low, firms and households may not borrow even when loans are cheap, so spending rises little.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A fictional country's recession is caused mainly by long power cuts that stop mines and factories working. Which policy would be **most** effective?",
    options: [
      ["Government investment in electricity generation and transmission", "Correct: it removes the cause by restoring productive capacity."],
      ["A large cut in interest rates to encourage consumer borrowing", "Extra demand cannot be met while firms cannot produce; prices would rise."],
      ["A rise in income tax to reduce the budget deficit", "This reduces demand and does not restore power."],
      ["Printing money to pay higher wages to public servants", "Extra demand without extra output mainly causes inflation."],
    ],
    answer: "A",
    hints: ["Is this recession caused by too little demand or too little capacity?"],
    explanation: "When output falls because of a supply problem, supply-side measures that restore capacity work best.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A government cuts taxes to end a recession, but most of the extra spending by households goes on imported goods. What is the most likely result?",
    options: [
      ["Domestic output rises only a little, and the current account worsens", "Correct: spending on imports does not create domestic output."],
      ["Domestic output rises strongly, because total spending has risen", "Spending on imports leaks out of the economy."],
      ["The budget deficit falls, because spending has risen", "Lower tax rates widen the deficit."],
      ["Unemployment rises, because imports are dearer", "Imports have not become dearer."],
    ],
    answer: "A",
    hints: ["Imports are subtracted in total demand: C + I + G + (X − M)."],
    explanation: "Imports are a leakage: extra spending on them boosts foreign output, not domestic output, and raises the import bill.",
  });

  // Numericals.
  const q = [7200, 7128, 7092];
  const c1 = pctChange(q[0], q[1]), c2 = pctChange(q[1], q[2]);
  check("c1", c1, -1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: c1, daily: true, calculator: true,
    stem: `Real GDP in a fictional country fell from US\\$${fmt(q[0])} million in one quarter to US\\$${fmt(q[1])} million in the next. Calculate the percentage change in real GDP. Give your answer to one decimal place and include the minus sign.`,
    wrong: [-c1],
    explanation: `(${fmt(q[1])} − ${fmt(q[0])}) ÷ ${fmt(q[0])} × 100 = −${q[0] - q[1]} ÷ ${fmt(q[0])} × 100 = **${pct(c1, 1)}**. The minus sign shows negative growth.`,
  });
  const peak = 12600, trough = 11970, fallPct = pctChange(peak, trough);
  check("fallPct", fallPct, -5);
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: fallPct, calculator: true,
    stem: `During a recession, real GDP in a fictional country fell from a peak of US\\$${fmt(peak)} million to a low point of US\\$${fmt(trough)} million. Calculate the total percentage fall. Give your answer to one decimal place and include the minus sign.`,
    wrong: [-fallPct, pctChange(trough, peak) * -1],
    hints: ["Use the peak as the base."],
    explanation: `(${fmt(trough)} − ${fmt(peak)}) ÷ ${fmt(peak)} × 100 = −${peak - trough} ÷ ${fmt(peak)} × 100 = **${pct(fallPct, 1)}**. Using the low point as the base gives ${pct(-pctChange(trough, peak), 2)}, which is wrong.`,
  });
  const lf = 2400, u0 = 192, jobsLost = 84, r0 = (u0 / lf) * 100, r1 = ((u0 + jobsLost) / lf) * 100;
  check("r0", r0, 8); check("r1", r1, 11.5);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: r1 - r0, dp: 1, tol: 0.05, calculator: true,
    stem: `A fictional town has a labour force of ${fmt(lf)} people, of whom ${u0} are unemployed. During a recession, ${jobsLost} workers lose their jobs and look for new ones; the labour force does not change. By how many **percentage points** does the unemployment rate rise? Give your answer to one decimal place.`,
    wrong: [pctChange(r0, r1)],
    hints: ["Work out the unemployment rate before and after.", "A percentage-point change is the difference between two percentages."],
    explanation: `1. Before: ${u0} ÷ ${fmt(lf)} × 100 = ${pct(r0, 1)}.\n2. After: ${u0 + jobsLost} ÷ ${fmt(lf)} × 100 = ${pct(r1, 1)}.\n3. Rise = ${fmt(r1, 1)} − ${fmt(r0, 1)} = **${fmt(r1 - r0, 1)} percentage points**. (The rate rose by ${pct(pctChange(r0, r1), 2)} in percentage terms, a different measure.)`,
  });
  const taxShare = 0.18, gdpA = 26000, fallA = 0.04;
  const revLoss = taxShare * gdpA * fallA;
  check("revLoss", revLoss, 187.2);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: revLoss, dp: 1, tol: 0.05, calculator: true,
    stem: `In a fictional country, tax revenue is always 18% of GDP. GDP is US\\$${fmt(gdpA)} million and then falls by 4% in a recession. Calculate the fall in tax revenue, in US\\$ million, to one decimal place.`,
    wrong: [gdpA * fallA, taxShare * gdpA * (1 - fallA)],
    hints: ["Find the fall in GDP first.", "Tax revenue is 18% of GDP before and after."],
    explanation: `1. Fall in GDP = 4% × ${fmt(gdpA)} = US\\$${fmt(gdpA * fallA)} million.\n2. Fall in tax revenue = 18% × ${fmt(gdpA * fallA)} = **US\\$${fmt(revLoss, 1)} million**.\n3. ${fmt(gdpA * fallA)} is the fall in GDP, not in tax; ${fmt(taxShare * gdpA * (1 - fallA), 1)} is the new tax revenue.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "If the economic growth rate falls from 3% to 1%, the economy is in recession.",
    answer: false,
    explanation: "False. Output is still growing at 1%. A recession requires negative growth.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Supply-side policies, such as training programmes, usually take a long time to raise an economy's output.",
    answer: true,
    explanation: "True. Training, education and infrastructure projects take years to raise productive capacity.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each policy with its type.",
    pairs: [
      ["The central bank cuts its interest rate", "Monetary policy"],
      ["The government builds new rural roads and cuts VAT", "Fiscal policy"],
      ["The government funds apprenticeships for school leavers", "Supply-side policy"],
      ["The central bank increases the money supply", "Monetary policy (quantity of money)"],
    ],
    explanation: "Interest rates and the money supply are monetary; government spending and taxes are fiscal; training raises capacity (supply-side). Building roads is fiscal spending that also has supply-side effects.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "In a recession, firms' sales {{blank:a}}, so they demand {{blank:b}} workers. Tax revenue {{blank:c}} and spending on support for the unemployed {{blank:d}}.",
    blanks: [
      { id: "a", accepted: ["fall"], choices: ["fall", "rise"] },
      { id: "b", accepted: ["fewer"], choices: ["fewer", "more"] },
      { id: "c", accepted: ["falls"], choices: ["falls", "rises"] },
      { id: "d", accepted: ["rises"], choices: ["rises", "falls"] },
    ],
    wrong: [["rise", "more", "rises", "falls"]],
    hints: ["Start from falling output."],
    explanation: "Falling output means lower sales and less demand for labour; the government collects less tax and pays out more support.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** consequences of a recession for firms.",
    points: [
      "Identifies: sales and profits fall.",
      "Explains: lower incomes mean households buy less, so revenue falls and some firms make losses or close.",
      "Identifies: investment is postponed / workers are laid off.",
      "Explains: with poor expected sales firms do not expand capacity and cut costs by reducing staff.",
    ],
    modelAnswer: "First, sales and profits fall, because households with lower incomes and less confidence buy fewer goods, especially luxuries and durable goods; some firms make losses and close. Second, firms postpone investment in new machinery, because they do not expect sales to grow, and they lay off workers to cut costs.",
    hints: ["Think about revenue, costs and plans."],
    explanation: "Each consequence: identify (1) + explain (1). Firms selling cheap necessities may gain customers, which is also creditworthy.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** reasons why an increase in government spending may not end a recession quickly.",
    points: [
      "Time lags: projects take time to plan, approve and start.",
      "So spending reaches the economy months or years later.",
      "Extra income may be spent on imports or saved / the deficit and debt may become too large to sustain.",
      "So the rise in domestic output is smaller than the rise in spending / the policy may have to be reversed.",
    ],
    modelAnswer: "First, there are time lags: road or dam projects take months to plan and approve, so the extra spending reaches workers and firms long after the recession began. Second, much of the extra income may be spent on imports or saved by worried households, so domestic output rises much less than government spending; and financing the spending by borrowing raises debt, which may force the government to cut spending again.",
    hints: ["Think about timing and about where the extra money goes."],
    explanation: "Each reason: identify (1) + explain (1).",
  });

  // Structured 1: quarterly data.
  const qs = [["Q1", 8800], ["Q2", 8932], ["Q3", 8843], ["Q4", 8710], ["Q5 (next year Q1)", 8754]];
  const chg = qs.map(([, v], i) => (i === 0 ? null : pctChange(qs[i - 1][1], v)));
  check("chg3", chg[3], -1.5040145);
  const T1 = table(["Quarter", "Real GDP (US\\$ million)"], qs);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows quarterly real GDP for a fictional country, Country R, whose main exports are minerals.\n\n${T1}\n\nDuring Q3 and Q4 the world price of the country's minerals fell sharply.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: chg[1], stem: "Calculate the percentage change in real GDP from Q1 to Q2. Give your answer to one decimal place.", wrong: [((qs[1][1] - qs[0][1]) / qs[1][1]) * 100], explanation: `(${fmt(qs[1][1])} − ${fmt(qs[0][1])}) ÷ ${fmt(qs[0][1])} × 100 = ${pct(chg[1], 1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: chg[3], stem: "Calculate the percentage change in real GDP from Q3 to Q4. Give your answer to one decimal place and include the minus sign.", wrong: [-chg[3]], explanation: `(${fmt(qs[3][1])} − ${fmt(qs[2][1])}) ÷ ${fmt(qs[2][1])} × 100 = ${pct(chg[3], 1)}.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Using the common definition, when was Country R in recession?",
        options: [
          ["In Q3 and Q4, when real GDP fell in two consecutive quarters", `Correct: Q3 ${pct(chg[2], 1)}, Q4 ${pct(chg[3], 1)}.`],
          ["Only in Q4, when the fall was largest", "Q3 also showed a fall; two consecutive falls make a recession."],
          ["In Q5, because output was still below its Q2 level", "Real GDP rose in Q5, so the recession had ended."],
          ["At no time, because real GDP in Q5 was almost as high as in Q1", "Two consecutive quarters of falling output meet the definition."],
        ],
        answer: "A",
        explanation: "Real GDP fell in Q3 and in Q4, then rose in Q5.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain how the fall in world mineral prices could have caused the recession.",
        points: [
          "Lower prices reduce the value of mineral exports / mining firms' revenue and profits.",
          "Mines cut output, investment and jobs; export demand (part of total demand) falls.",
          "Laid-off workers spend less, so demand for other firms' goods also falls (knock-on effect).",
        ],
        modelAnswer: "When world mineral prices fell, the country's mines earned less from their exports, so some cut output, postponed investment and laid off workers. Lower export earnings mean lower total demand. The workers who lost their jobs then spent less in local shops, so other firms' sales fell too, spreading the fall in output through the economy.",
        explanation: "Export earnings → output and jobs in mining → knock-on fall in spending.",
      }),
      P.manual({
        label: "(e)", marks: 4, levels: LV(4),
        stem: "Discuss whether a cut in interest rates would be the best way for Country R's government to promote recovery.",
        points: [
          "For: cheaper borrowing encourages consumer spending and investment, raising total demand.",
          "For: a lower exchange rate makes exports more competitive, helping exporters.",
          "Against: if confidence is low, firms may not borrow; it cannot raise world mineral prices; time lags; savers lose income.",
          "Justified conclusion, e.g. helpful but combined with fiscal support and diversification away from minerals.",
        ],
        modelAnswer: "Lower interest rates make loans cheaper, which may encourage households to buy more and firms to invest, raising total demand. A lower exchange rate would also help exporters. However, the recession came from a fall in world mineral prices, which interest rates cannot change, and if firms expect poor sales they will not borrow even at low rates. The policy also takes many months to work and reduces savers' incomes. A rate cut would help, but on its own it is unlikely to be the best policy: it should be combined with government spending on infrastructure and with measures to diversify exports so that the economy depends less on minerals.",
        explanation: "Weigh how the policy works against its limits given the cause; conclude.",
      }),
    ],
    hints: ["Percentage change = change ÷ earlier value × 100.", "A recession means real GDP falls."],
    explanation: `Changes: Q2 ${pct(chg[1], 1)}, Q3 ${pct(chg[2], 1)}, Q4 ${pct(chg[3], 1)}, Q5 ${pct(chg[4], 1)}. Recession in Q3-Q4.`,
  });

  // Structured 2: supply-side vs demand-side.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country has come out of recession, but growth is slow. Employers say they cannot find skilled technicians, roads in farming areas are in poor condition, and small firms find it hard to get loans. The government is choosing between cutting income tax for all workers and spending the same amount on technical colleges and rural roads.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Spending on technical colleges and rural roads is best described as",
        options: [
          ["a supply-side policy that raises productive capacity.", "Correct: it improves the quality of labour and infrastructure."],
          ["a monetary policy that lowers interest rates.", "Monetary policy is run by the central bank."],
          ["a contractionary fiscal policy.", "Higher spending is expansionary."],
          ["a protectionist trade policy.", "It does not restrict imports."],
        ],
        answer: "A",
        explanation: "Training and infrastructure raise the quantity and quality of resources.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain how a cut in income tax could raise economic growth.",
        points: ["Disposable income rises, so consumer spending (total demand) rises, and firms raise output.", "It may also increase the incentive to work longer hours or to take jobs."],
        modelAnswer: "A cut in income tax leaves workers with more disposable income, so they spend more and firms produce more to meet the extra demand. Lower tax may also encourage people to work more hours, increasing the supply of labour.",
        explanation: "Demand effect (1) + incentive effect or development (1).",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss which of the two options is more likely to raise long-term economic growth.",
        points: [
          "Colleges and roads tackle the stated problems: skill shortages and poor infrastructure; they raise productive capacity.",
          "Growth from more capacity can continue without inflation; roads also lower farmers' transport costs.",
          "But they take years to have effects and projects may be badly managed or over budget.",
          "Tax cut acts faster on demand, but some extra income is saved or spent on imports, and it does not remove skill shortages, so growth may be limited / inflationary.",
          "Justified conclusion: colleges and roads are more likely to raise long-term growth, possibly with help for small-firm finance.",
        ],
        modelAnswer: "Spending on technical colleges and rural roads tackles the problems employers describe: a shortage of skilled technicians and poor roads. More skilled workers and better roads raise the economy's productive capacity, so growth can continue without causing inflation, and farmers' transport costs fall. However, the benefits take years to appear and projects can be mismanaged. A tax cut would raise spending more quickly, but some of the extra income would be saved or spent on imports, and it does nothing about the skill shortage, so firms could not expand output much and prices might rise instead. For long-term growth the colleges and roads are the better choice, because they remove the constraints on supply, ideally combined with schemes to help small firms obtain loans.",
        explanation: "Compare demand-side and supply-side effects over time; conclude.",
      }),
    ],
    hints: ["What is holding growth back: demand or capacity?"],
    explanation: "Supply-side spending removes the constraints (skills, roads); a tax cut mainly raises demand.",
  });

  b.card("DEFINITION", "Define **recession**.", "A period of negative economic growth: real GDP falls, commonly for two consecutive quarters.");
  b.card("CONCEPT", "What are the two broad causes of recession?", "A fall in total (aggregate) demand, or a fall in the quantity or quality of resources (a supply shock).");
  b.card("CONCEPT", "Give three demand-side causes of recession.", "Falling consumer confidence; lower investment; cuts in government spending; falling exports; higher interest rates or taxes.");
  b.card("CONCEPT", "How does a recession affect workers?", "Job losses and fewer hours (cyclical unemployment), smaller pay rises, loss of skills, emigration.");
  b.card("FACT", "What usually happens to the budget deficit in a recession?", "It widens: tax revenue falls while spending on support for the poor and unemployed rises.");
  b.card("CONCEPT", "Name three types of policy to promote growth.", "Fiscal (spending and taxes), monetary (interest rates and money supply) and supply-side (training, infrastructure, incentives).");
  b.card("CONCEPT", "Give two limits of expansionary fiscal policy.", "Wider budget deficit and debt; time lags; extra income saved or spent on imports; inflation at full capacity.");
  b.card("CONCEPT", "Why may lower interest rates not end a recession?", "Low confidence means people and firms do not borrow; banks may not lend; time lags.");
  b.card("CONCEPT", "What is the main strength and the main limit of supply-side policy?", "It raises productive capacity, so growth without inflation; but it takes years and can be costly.");
});
