// W3b: inflation, deflation and disinflation: causes, consequences and control (both boards).
import { concept, P, chk, table, fmt, prices, realInterest, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w3b-kit.mjs";

concept("aecon.macro.inflation", { file: "macro/inflation", keyPrefix: "macro.inflation" }, (b) => {
  mc(b, [1, "RECALL"], "Disinflation is",
    ["a fall in the rate of inflation, so that prices still rise but more slowly", "Correct: the rate has fallen but remains positive."],
    [["a fall in the general price level from one year to the next", "That is deflation."],
     ["a rise in the rate of inflation from one year to the next", "That is accelerating inflation."],
     ["a rise in the price of one good relative to the prices of others", "That is a change in a relative price."]],
    "Disinflation is a lower rate of inflation, not falling prices.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is most likely to cause demand-pull inflation?",
    ["A cut in income tax rates that raises consumer spending", "Correct: it shifts aggregate demand to the right."],
    [["A rise in the world price of imported oil used in transport", "That raises costs, causing cost-push inflation."],
     ["A rise in money wages that is larger than the rise in productivity", "That raises costs of production."],
     ["A fall in the exchange rate that raises the price of imported inputs", "That raises firms' costs."]],
    "Demand-pull inflation comes from a rise in aggregate demand.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "In an AD and AS diagram, cost-push inflation is shown by",
    ["a leftward shift of the short-run aggregate supply curve", "Correct: costs rise, so SRAS decreases."],
    [["a rightward shift of the aggregate demand curve", "That shows demand-pull inflation."],
     ["a rightward shift of the short-run aggregate supply curve", "That lowers the price level."],
     ["a leftward shift of the aggregate demand curve", "That lowers the price level."]],
    "Higher costs shift SRAS to the left, raising prices and lowering output.");

  mc(b, [2, "UNDERSTANDING"], "Unexpected inflation is most likely to benefit",
    ["a borrower who took out a loan at a fixed rate of interest", "Correct: the real value of the debt falls."],
    [["a pensioner who receives a fixed pension each month of the year", "Real value of a fixed pension falls."],
     ["a saver whose interest rate is below the inflation rate", "The real return is negative."],
     ["a lender who has made a loan at a fixed rate of interest", "The real value of repayments falls."]],
    "Inflation reduces the real value of fixed debts, so borrowers gain and lenders lose.", { daily: true });

  mc(b, [3, "ANALYSIS"], "In a fictional economy prices rise by 8% while real output falls and unemployment rises. This is most consistent with",
    ["cost-push inflation caused by a fall in short-run supply", "Correct: higher prices with lower output point to a leftward shift in SRAS."],
    [["demand-pull inflation caused by a rise in aggregate demand", "Demand-pull would raise output and lower unemployment."],
     ["deflation caused by a fall in consumer confidence", "Prices are rising."],
     ["disinflation caused by a fall in the money supply", "Prices are rising faster, not more slowly."]],
    "Rising prices with falling output suggest cost-push inflation (stagflation).", { hints: ["What happens to output in demand-pull and in cost-push inflation?"] });

  {
    const ri = realInterest(5, 8);
    mc(b, [3, "APPLICATION"], "A saver earns 5% a year in a bank account while inflation is 8% a year. The real interest rate is approximately",
      ["−3%", "Correct: 5 − 8."],
      [["+3%", "The sign is reversed."],
       ["+13%", "Adding the two rates is a common mistake."],
       ["+5%", "That is the nominal rate and ignores the effect of inflation."]],
      `Real interest rate is approximately nominal minus inflation: 5 − 8 = −3% (exactly ${ri.exact.toFixed(1)}%).`, { hints: ["Real = nominal − inflation (approximately)."] });
  }

  mc(b, [3, "ANALYSIS"], "Why might deflation harm an economy?",
    ["Consumers may delay purchases expecting lower prices, so demand and output fall", "Correct: falling demand can lead to a downward spiral."],
    [["It raises the real value of money so that governments must borrow less", "That is not the main concern."],
     ["It always raises employment, because firms hire workers more cheaply", "Falling revenue usually reduces jobs."],
     ["It lowers the real value of debts, so borrowers can spend more", "Deflation raises the real value of debt."]],
    "Deflation can reduce spending and raise the real burden of debt.", { hints: ["How would you behave if you expected prices to fall?"] });

  mc(b, [4, "EVALUATION"], "A rise in interest rates is a poor way to reduce cost-push inflation caused by higher imported fuel prices mainly because",
    ["it reduces demand but not the cost rise, so output and jobs fall", "Correct: the policy treats the symptom."],
    [["it always raises the price of imported fuel by a larger amount", "Interest rates do not change fuel prices directly."],
     ["cost-push inflation is not affected by any government policy", "Supply-side policies can affect it."],
     ["higher interest rates reduce the unemployment rate at the same time", "Higher interest rates raise unemployment."]],
    "Reducing demand lowers prices at the cost of output and employment, since costs are the cause.", { hints: ["Does the policy change the source of the inflation?"] });

  {
    const ir = prices.inflationRate(120, 127.2); chk(ir, 6, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: ir, dp: 1, unit: "%",
      stem: "The consumer price index of a fictional economy is 120.0 in one year and 127.2 the next. Calculate the rate of inflation, to one decimal place.",
      wrong: [7.2, 5.7, 6.4], explanation: "Inflation = (127.2 − 120.0) ÷ 120.0 × 100 = 6.0%. Dividing by 127.2 gives 5.7%." });
    const rv = prices.realValue(450, 125); chk(rv, 360, 1e-9);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: rv,
      stem: "A worker earns US\\$450 a month. The consumer price index is 125 (base year = 100). Calculate her monthly wage in the base year's prices, in US\\$.",
      wrong: [562.5, 450, 325], explanation: "Real wage = 450 ÷ 125 × 100 = US\\$360. Multiplying by 1.25 gives 562.50, which goes the wrong way." });
    const rw = (1.09 / 1.06 - 1) * 100; chk(roundTo(rw, 1), 2.8, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: rw, dp: 1, unit: "%", hints: ["Real wage = nominal wage ÷ price index."],
      stem: "Nominal wages in a fictional economy rise by 9% in a year when the price level rises by 6%. Calculate the percentage rise in real wages, to one decimal place (use (1 + w) ÷ (1 + p) − 1).",
      wrong: [3.0, 15.0, 9.0], explanation: "1. Real wages change by 1.09 ÷ 1.06 = 1.0283.\n2. The rise is 2.8%.\n3. The approximation 9 − 6 = 3.0% is close but not exact." });
    const rr = realInterest(12, 15); chk(roundTo(rr.exact, 1), -2.6, 1e-9);
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "pct", value: rr.exact, dp: 1, unit: "%", hints: ["Real rate = (1 + nominal) ÷ (1 + inflation) − 1."],
      stem: "A bank pays a nominal interest rate of 12% when inflation is 15%. Calculate the exact real rate of interest, to one decimal place (a negative number if savers lose).",
      wrong: [-3.0, 2.6, 27.0], explanation: "1. 1.12 ÷ 1.15 = 0.9739.\n2. Real rate = 0.9739 − 1 = −2.6%. The approximation 12 − 15 = −3% is close. Savers lose purchasing power." });
  }

  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Which items have a fixed money value?"], stem: "Unexpected inflation reduces the real value of debts, so it helps borrowers and harms lenders.", answer: true,
    explanation: "True. Repayments are fixed in money terms, so they are worth less in real terms when prices rise." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each cost of inflation with its description.",
    pairs: [["Menu costs", "The cost of changing price lists and labels"], ["Shoe-leather costs", "Time and effort spent protecting money from losing value"], ["Redistribution", "Gains for borrowers and losses for people on fixed incomes"], ["Loss of competitiveness", "Exports become dearer relative to foreign goods"]],
    explanation: "Each is a different cost of inflation." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Demand-pull inflation is caused by a {{blank:a}} in aggregate demand, while cost-push inflation is caused by a {{blank:b}} in short-run aggregate supply.",
    blanks: [{ id: "a", accepted: ["rise"], choices: ["rise", "fall"] }, { id: "b", accepted: ["fall"], choices: ["rise", "fall"] }],
    explanation: "Demand-pull: AD rises. Cost-push: SRAS falls (shifts left)." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the term for extremely rapid inflation in which money loses its value so fast that people stop using it.",
    accepted: ["hyperinflation", "hyper-inflation", "hyper inflation"], wrong: ["deflation"],
    explanation: "Hyperinflation is extremely rapid inflation." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define inflation.",
    points: ["A sustained rise in the general level of prices.", "Measured by the percentage change in a price index (such as the CPI) over time."],
    modelAnswer: "Inflation is a sustained rise in the general level of prices, measured by the percentage change in a price index such as the CPI.",
    explanation: "One mark for sustained rise in the general price level and one for measurement." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name two sources of rising costs."],
    stem: "Explain two causes of cost-push inflation.",
    points: ["A rise in the price of imported raw materials or fuel raises firms' costs.", "Firms pass the higher costs on in higher prices (SRAS shifts left).", "Wage rises above productivity raise unit labour costs.", "Firms raise prices to protect profits, leading to a rise in the price level."],
    modelAnswer: "A rise in the price of imported raw materials or fuel raises firms' costs of production, and they pass this on in higher prices. A rise in wages that is faster than productivity raises unit labour costs, which firms also pass on, so the short-run aggregate supply curve shifts to the left and the price level rises.",
    explanation: "Two causes with the link to costs and prices." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Use the chain from interest rates to demand to prices."],
    stem: "Analyse how a rise in the interest rate might reduce demand-pull inflation.",
    points: ["A higher interest rate raises the cost of borrowing.", "Consumption and investment financed by credit fall.", "Saving becomes more attractive, so consumption falls.", "Aggregate demand falls (AD shifts left).", "The price level rises more slowly or falls, reducing demand-pull inflation."],
    modelAnswer: "A higher interest rate makes borrowing more expensive and saving more attractive. Households spend less on credit-financed goods, and firms postpone investment, so consumption and investment fall. Aggregate demand shifts to the left, which reduces pressure on the price level and so lowers demand-pull inflation.",
    explanation: "Chain from interest rate to AD to prices." });

  {
    const cpi = [150.0, 159.0, 170.1, 176.9, 174.0];
    const rate = cpi.map((c, i) => (i ? prices.inflationRate(cpi[i - 1], c) : null));
    chk(roundTo(rate[2], 1), 7.0, 1e-9); chk(roundTo(rate[3], 1), 4.0, 1e-9); chk(roundTo(rate[4], 1), -1.6, 1e-9);
    const rv = prices.realValue(340, cpi[2]); chk(roundTo(rv, 1), 199.9, 1e-9);
    const t1 = table(["Year", "Consumer price index"], cpi.map((c, i) => [String(i + 1), fmt(c, 1)]), { align: ["l", "r"] });
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Inflation = (new − old) ÷ old × 100.", "Disinflation: the rate falls but is still positive."],
      stem: `**Prices in Country Mbira (fictional, illustrative data)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: rate[2], dp: 1, unit: "%", stem: "Calculate the rate of inflation in year 3, to one decimal place.", wrong: [11.4, 6.5, 6.0], explanation: "Inflation = (170.1 − 159.0) ÷ 159.0 × 100 = 7.0%." }),
        P.manual({ label: "(b)", marks: 2, stem: "Identify the year in which disinflation occurred and the year in which deflation occurred.",
          points: ["Disinflation in year 4 (inflation fell from 7.0% to 4.0%).", "Deflation in year 5 (the price level fell by 1.6%)."],
          modelAnswer: "Disinflation occurred in year 4, when the rate fell from 7.0% to 4.0% but prices still rose, and deflation occurred in year 5, when the price level fell by 1.6%." }),
        P.num({ label: "(c)", marks: 2, kind: "index", value: rv, dp: 1, stem: "A worker earns US\\$340 a month in year 3. Calculate her wage in year-1 prices (real wage), in US\\$ to one decimal place.", wrong: [226.7, 340, 578.3], explanation: "Real wage = 340 ÷ 170.1 × 100 = US\\$199.9. Using year 1 = 150 as 100 means the index must be divided as it stands." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain two possible causes of the rise in inflation in year 3.",
          points: ["Rise in aggregate demand (demand-pull), for example from lower interest rates or higher government spending.", "Prices rise because demand is greater than capacity.", "Rise in costs (cost-push), for example higher import prices after a fall in the exchange rate or wage rises.", "Firms pass on the higher costs in higher prices."],
          modelAnswer: "Aggregate demand may have risen, for example because of lower interest rates or higher government spending. If demand grows faster than capacity, firms raise prices, which is demand-pull inflation. Costs may also have risen, for example because the exchange rate fell and raised import prices or because wages rose, and firms passed the higher costs on in higher prices, which is cost-push inflation." }),
      ],
      explanation: "Year 3 inflation 7.0%; year 4 disinflation (4.0%); year 5 deflation (−1.6%); real wage US\\$199.9." });
  }
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["In (c) consider cause, time lags and side effects."],
    stem: "**Inflation in Dambo (fictional)**\n\nA severe drought has halved the maize harvest in Dambo, and the price of food has risen sharply. The country's currency has also fallen in value, which has raised the price of imported fuel and fertiliser. Workers are demanding higher wages to keep up with prices. The central bank is thinking of raising its interest rate to bring inflation down. Economists say that raising the rate will reduce spending but will not make rain fall or bring down world fuel prices, and that it may raise unemployment.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why the drought and the fall in the currency are likely to cause cost-push inflation.",
        points: ["The drought reduces supply of maize and raises its price and the cost of food.", "The fall in the currency raises the price of imported fuel and fertiliser, raising costs.", "Higher costs shift short-run aggregate supply to the left and raise the price level."],
        modelAnswer: "The drought reduces the supply of maize and raises food prices, and the fall in the currency raises the price of imported fuel and fertiliser. Both raise firms' costs, so the short-run aggregate supply curve shifts to the left and the price level rises." }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain how wage rises could make inflation worse.",
        points: ["Higher wages raise firms' costs.", "Firms raise prices to cover the higher costs.", "Higher prices lead workers to ask for further wage rises: a wage–price spiral."],
        modelAnswer: "Higher wages raise firms' costs, so firms raise prices to cover them. Higher prices then lead workers to demand further wage rises, creating a wage–price spiral that makes inflation worse." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
        stem: "Assess whether the central bank should raise the interest rate to reduce inflation.",
        points: ["A higher rate reduces borrowing, spending and AD, which can reduce inflationary pressure and expectations.", "A higher rate may attract capital inflows and raise the currency, lowering import prices.", "The inflation here is cost-push, caused by supply shocks that interest rates do not remove.", "Output and jobs may fall further because the economy is already weakened by the drought.", "Time lags; the drought may pass anyway.", "Judgement: of limited use; perhaps support through supply-side measures (food imports, subsidies for inputs) is better."],
        modelAnswer: "A higher interest rate reduces borrowing and spending, so aggregate demand falls, and it might also strengthen the currency by attracting capital, which lowers import prices and may help to reduce expectations of inflation. But the inflation in Dambo is mainly cost-push, caused by the drought and the weak currency, and interest rates do not bring rain or lower world fuel prices. Output and jobs could fall further in an economy already weakened by the drought, and the effects take time. Overall the policy is likely to be of limited use; measures that deal with the supply problem, such as food imports or support for farmers' inputs, would probably be more effective." }),
    ],
    explanation: "Supply shocks cause cost-push inflation; wages can start a spiral; higher interest rates treat demand, not the cause." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Costs for different groups and for the economy; then judge how serious."],
    stem: "Assess the costs of high inflation to an economy.",
    points: ["Redistribution: people on fixed incomes and savers lose; borrowers gain.", "Menu and shoe-leather costs waste resources.", "Uncertainty reduces investment and growth.", "Loss of competitiveness if inflation is higher than in other countries: exports fall and imports rise.", "Wage–price spiral and loss of confidence in money.", "Hyperinflation destroys money's functions and savings.", "Costs depend on how high and how predictable inflation is: low, stable inflation is much less costly.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "High inflation redistributes income: people with fixed incomes, such as pensioners, and savers lose, while borrowers gain. It wastes resources through menu costs and shoe-leather costs, and its unpredictability makes firms less willing to invest, which may reduce growth. If domestic inflation is higher than in trading partners, exports become dearer and imports cheaper, so the current account may worsen. A wage–price spiral may develop and confidence in the currency may be lost, and in extreme cases of hyperinflation money stops working as a store of value and a means of payment, savings are destroyed and output falls. However, the costs depend on the size of inflation and on whether it is predicted: low and stable inflation has small costs and can even help adjustment. Overall, high and unpredictable inflation is very costly, while low, stable inflation is much less so.",
    explanation: "Weigh the costs for different groups against how high and how predictable inflation is." });

  b.card("DEFINITION", "Define **inflation**.", "A sustained rise in the general level of prices, measured by the percentage change in a price index such as the CPI.");
  b.card("DEFINITION", "What is **disinflation**?", "A fall in the rate of inflation: prices still rise, but more slowly.");
  b.card("DEFINITION", "What is **deflation**?", "A sustained fall in the general price level (negative inflation).");
  b.card("CONCEPT", "What causes demand-pull inflation?", "A rise in aggregate demand faster than capacity: AD shifts to the right (low interest rates, tax cuts, higher spending, exports, credit).");
  b.card("CONCEPT", "What causes cost-push inflation?", "A rise in firms' costs (wages above productivity, raw materials, fuel, imports after depreciation): SRAS shifts to the left.");
  b.card("FORMULA", "How is the **inflation rate** calculated?", "(Price index this year − last year) ÷ last year × 100.");
  b.card("CONCEPT", "Name four costs of inflation.", "Redistribution, menu costs, shoe-leather costs and uncertainty (also lost competitiveness).");
  b.card("CONCEPT", "Why can deflation be harmful?", "Consumers delay purchases, demand and output fall, and the real value of debts rises.");
  b.card("CONCEPT", "Name four policies to reduce inflation.", "Higher interest rates (monetary), higher taxes or lower spending (fiscal), supply-side policy, and wage and price controls.");
});
