// W3b: ZIMSEC exam-format items. Paper 2 data response (STRUCTURED 20, ANALYSIS) x2: national income by expenditure;
// weighted price index and inflation. Paper 3 essays (STRUCTURED 10 = (a) explain 4 + (b) discuss 6, EVALUATION) x3.
// Fictional data, computed and checked here.
import { concept, P, ZIM, table, nationalIncome, prices, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.national-income.measurement", { file: "exam/w3b-zimsec", keyPrefix: "exam.w3b-zimsec", applies: ZIM }, (b) => {
  // ---------------- Paper 2 (1): national income by the expenditure method.
  {
    const y = { c: [9750, 10850], i: [2150, 2500], g: [2600, 2800], x: [3200, 3350], m: [3700, 4100] };
    const gdp = [0, 1].map((k) => nationalIncome.expenditure({ c: y.c[k], i: y.i[k], g: y.g[k], x: y.x[k], m: y.m[k] }));
    const nfia = -600, gnp1 = nationalIncome.gnp(gdp[1], nfia), pop = [14.0, 14.4], idx = [100, 108];
    const ph1 = nationalIncome.perHead(gdp[1], pop[1]);
    const real1 = prices.realValue(gdp[1], idx[1]), rg = pctChange(gdp[0], real1), ng = pctChange(gdp[0], gdp[1]);
    check("gdp0", gdp[0], 14000); check("gdp1", gdp[1], 15400); check("gnp1", gnp1, 14800); check("ng", ng, 10);
    const incr = { C: y.c[1] - y.c[0], I: y.i[1] - y.i[0], G: y.g[1] - y.g[0] };
    check("incrC", incr.C, 1100);
    const T = table(["US\\$ million (current prices)", "2025", "2026"], [
      ["Consumption (C)", y.c[0], y.c[1]],
      ["Investment (I)", y.i[0], y.i[1]],
      ["Government spending (G)", y.g[0], y.g[1]],
      ["Exports (X)", y.x[0], y.x[1]],
      ["Imports (M)", y.m[0], y.m[1]],
      ["Net income from abroad", "−480", "−600"],
      ["Population (million)", fmt(pop[0], 1), fmt(pop[1], 1)],
      ["Price index (2025 = 100)", idx[0], idx[1]],
    ]);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2", calculator: true,
      concepts: ["econ.national-income.measurement", "econ.national-income.uses-limitations"],
      stem: `Country K is a fictional country in southern Africa. Its main exports are tobacco, gold and chrome, and many of its mines are foreign-owned. About half of its workers earn their living in the informal sector, as vendors, small-scale farmers and artisans. In 2026 the government told Parliament that "national income rose by 10%, so our people are better off".\n\n**Table 1: National accounts of Country K**\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: gdp[0], stem: "Calculate GDP in 2025 using the expenditure method, in US\\$ million.", wrong: [y.c[0] + y.i[0] + y.g[0] + y.x[0] + y.m[0]], explanation: `GDP = C + I + G + (X − M) = ${fmt(y.c[0])} + ${fmt(y.i[0])} + ${fmt(y.g[0])} + (${fmt(y.x[0])} − ${fmt(y.m[0])}) = ${fmt(gdp[0])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: gdp[1], stem: "Calculate GDP in 2026, in US\\$ million.", wrong: [y.c[1] + y.i[1] + y.g[1] + y.x[1] + y.m[1]], explanation: `${fmt(y.c[1])} + ${fmt(y.i[1])} + ${fmt(y.g[1])} + (${fmt(y.x[1])} − ${fmt(y.m[1])}) = ${fmt(gdp[1])}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: gnp1, stem: "Calculate GNP in 2026, in US\\$ million.", wrong: [gdp[1] - nfia], explanation: `GNP = GDP + net income from abroad = ${fmt(gdp[1])} + (−600) = ${fmt(gnp1)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: ph1, dp: 2, tol: 0.006, stem: "Calculate GDP per head in 2026, in US\\$ to two decimal places.", wrong: [gdp[1] / pop[0]], explanation: `${fmt(gdp[1])} million ÷ ${fmt(pop[1], 1)} million = US\\$${fmt(ph1, 2)}.` }),
        P.num({ label: "(e)", marks: 3, kind: "pct", value: rg, stem: "Using the price index, calculate the percentage change in real GDP between 2025 and 2026 (in 2025 prices). Give your answer to one decimal place.", wrong: [ng, ng - 8], explanation: `Real GDP 2026 = ${fmt(gdp[1])} ÷ ${idx[1]} × 100 = ${fmt(real1, 2)}. Change = (${fmt(real1, 2)} − ${fmt(gdp[0])}) ÷ ${fmt(gdp[0])} × 100 = ${pct(rg, 1)}. The 10% rise is nominal.` }),
        P.mcq({
          label: "(f)", marks: 1,
          stem: "Which component of spending increased by the largest amount between 2025 and 2026?",
          options: [
            ["Consumption", `Correct: +${incr.C}.`],
            ["Investment", `+${incr.I}, less than consumption.`],
            ["Government spending", `+${incr.G}, less than consumption.`],
            ["Exports", `+${y.x[1] - y.x[0]} only.`],
          ],
          answer: "A",
          explanation: "Compare the change in each row of Table 1.",
        }),
        P.manual({
          label: "(g)", marks: 2,
          stem: "Explain why GNP was smaller than GDP in Country K.",
          points: ["Net income from abroad was negative (−600): more income was paid abroad than received.", "Profits of the foreign-owned mines are produced in Country K (in GDP) but paid to foreign owners."],
          modelAnswer: "Net income from abroad was negative, US\\$600 million in 2026, because more income left the country than came in. The profits of the foreign-owned mines are part of GDP, since the mining happens in Country K, but they are paid to owners abroad, so they are not part of GNP.",
          explanation: "Negative net income from abroad, linked to foreign-owned mines.",
        }),
        P.manual({
          label: "(h)", marks: 3,
          stem: "Explain **three** reasons why the GDP figures for Country K may be inaccurate.",
          points: ["Large informal sector: vendors and artisans keep no records, so output is under-recorded.", "Subsistence farming and other non-market output are not recorded.", "Other: double counting errors / inaccurate data and estimates / under-reporting to avoid tax."],
          modelAnswer: "First, about half of the workers are in the informal sector, and vendors and artisans keep few records, so much of their output is missed. Second, small-scale farmers grow food for their own families, which is never sold and so is not recorded. Third, the data rely on surveys and estimates, and firms may under-report income to pay less tax, so the figures are inaccurate.",
          explanation: "One mark per explained reason.",
        }),
        P.manual({
          label: "(i)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government is right to say that \"national income rose by 10%, so our people are better off\".",
          points: [
            `Partly supported: nominal GDP rose ${pct(ng, 0)}; spending, especially consumption, rose.`,
            `But prices rose 8%: real GDP rose only ${pct(rg, 1)}; population rose about ${pct(pctChange(pop[0], pop[1]), 1)}, so real GDP per head fell.`,
            "GNP is smaller because profits go abroad; GDP per head is an average and ignores distribution, the informal sector and quality of life.",
            "Justified conclusion: the claim is not justified; people are probably no better off on average.",
          ],
          modelAnswer: `Nominal GDP did rise by ${pct(ng, 0)}, and consumption increased, which might suggest people are better off. However, prices rose by 8%, so real GDP grew by only ${pct(rg, 1)}, and the population grew by about ${pct(pctChange(pop[0], pop[1]), 1)}, so real GDP per head actually fell slightly. Much of the income from the mines also goes to foreign owners, which is why GNP is lower than GDP. GDP per head is an average, so it does not show how income is shared, and it misses informal and subsistence output. The government's claim is not justified: once inflation and population growth are allowed for, the average person is probably slightly worse off.`,
          explanation: "Nominal versus real, per head, distribution; conclude.",
        }),
      ],
      explanation: `GDP: US\\$${fmt(gdp[0])} million (2025) and US\\$${fmt(gdp[1])} million (2026); GNP 2026 US\\$${fmt(gnp1)} million; GDP per head 2026 US\\$${fmt(ph1, 2)}; real growth ${pct(rg, 1)} against nominal ${pct(ng, 0)}.`,
      hints: ["GDP = C + I + G + (X − M).", "GNP = GDP + net income from abroad.", "Real GDP = nominal GDP ÷ price index × 100."],
    });
  }

  // ---------------- Paper 2 (2): weighted price index and inflation.
  {
    const items = [
      { name: "Food (maize meal, cooking oil, sugar)", weight: 35, p0: 8, p1: 8.96 },
      { name: "Rent and energy", weight: 25, p0: 120, p1: 129 },
      { name: "Transport", weight: 15, p0: 1, p1: 1.2 },
      { name: "Clothing and footwear", weight: 10, p0: 25, p1: 24.5 },
      { name: "Education and health", weight: 15, p0: 200, p1: 214 },
    ];
    const W = prices.weightedTable(items), idx = W.index, inf = prices.inflationRate(100, idx);
    check("idx", idx, 109.925);
    const foodIdx = prices.simpleIndex(8, 8.96), w0 = 380, w1 = 410, realW = prices.realValue(w1, idx), wCh = pctChange(w0, realW);
    check("foodIdx", foodIdx, 112);
    const T = table(["Item", "Weight", "Average price in 2025 (US\\$)", "Average price in 2026 (US\\$)"], items.map((x) => [x.name, x.weight, fmt(x.p0, 2), fmt(x.p1, 2)]));
    const contrib = items.map((x) => x.weight * ((x.p1 / x.p0) * 100 - 100));
    check("contrib food", contrib[0], 420);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, secs: 2100, paper: "Paper 2", calculator: true,
      concepts: ["econ.inflation.measurement", "econ.inflation.meaning-causes", "econ.inflation.effects-policies"],
      stem: `The statistics office of a fictional country, Country L, measures inflation with a consumer price index (2025 = 100). During 2026 a drought reduced the maize harvest, and the price of imported fuel rose. Workers in a large factory received a pay rise from US\\$380 to US\\$410 a month.\n\n**Table 2: Basket and prices used for the consumer price index**\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "index", value: foodIdx, stem: "Calculate the 2026 price index for food. Give your answer to one decimal place.", wrong: [(8 / 8.96) * 100], explanation: `8.96 ÷ 8.00 × 100 = ${fmt(foodIdx, 1)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "index", value: idx, stem: "Calculate the weighted consumer price index for 2026. Give your answer to one decimal place.", wrong: [items.reduce((s, x) => s + (x.p1 / x.p0) * 100, 0) / items.length], explanation: `Item indices: 112, 107.5, 120, 98, 107. Weighted total = 35 × 112 + 25 × 107.5 + 15 × 120 + 10 × 98 + 15 × 107 = 3,920 + 2,687.5 + 1,800 + 980 + 1,605 = 10,992.5; ÷ 100 = ${fmt(idx, 1)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: inf, stem: "Calculate the rate of inflation between 2025 and 2026. Give your answer to one decimal place.", wrong: [idx], explanation: `(${fmt(idx, 2)} − 100) ÷ 100 × 100 = ${pct(inf, 1)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: realW, dp: 2, tol: 0.006, stem: "Calculate the real value of the factory workers' 2026 wage in 2025 prices, in US\\$ to two decimal places.", wrong: [w1 * idx / 100], explanation: `${w1} ÷ ${fmt(idx, 3)} × 100 = US\\$${fmt(realW, 2)}.` }),
        P.mcq({
          label: "(e)", marks: 1,
          stem: "Which item added most to the rise in the index?",
          options: [
            ["Food", "Correct: weight 35 × 12% rise = 420, the largest contribution."],
            ["Transport", "Its price rose most (20%), but its weight is only 15 (contribution 300)."],
            ["Rent and energy", "Weight 25 × 7.5% = 187.5."],
            ["Education and health", "Weight 15 × 7% = 105."],
          ],
          answer: "A",
          explanation: "Contribution = weight × percentage price rise: food 420, transport 300, rent and energy 187.5, education and health 105, clothing −20.",
        }),
        P.fib({
          label: "(f)", marks: 2,
          stem: "Complete the sentence.",
          template: "The drought and the dearer imported fuel are causes of {{blank:a}} inflation, because they raise firms' {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["cost-push"], choices: ["cost-push", "demand-pull"] },
            { id: "b", accepted: ["costs"], choices: ["costs", "sales", "profits"] },
          ],
          wrong: [["demand-pull", "sales"]],
          explanation: "Supply shocks and dearer inputs raise costs, which firms pass on in prices: cost-push inflation.",
        }),
        P.manual({
          label: "(g)", marks: 4,
          stem: "Explain how the inflation in 2026 affected (i) the factory workers and (ii) people who had saved money in banks.",
          points: [
            `Workers: their money wage rose ${pct(pctChange(w0, w1), 1)}, less than inflation (${pct(inf, 1)}).`,
            `So their real wage fell (to about US\\$${fmt(realW, 2)} in 2025 prices): they can buy less.`,
            "Savers: if the interest rate was below the rate of inflation, the real interest rate was negative.",
            "So the purchasing power of their savings fell; money is a poor store of value.",
          ],
          modelAnswer: `The factory workers' pay rose by ${pct(pctChange(w0, w1), 1)}, but prices rose by ${pct(inf, 1)}, so their real wage fell to about US\\$${fmt(realW, 2)} in 2025 prices: they could buy fewer goods than before. Savers lost if the interest paid by banks was lower than the inflation rate, because the real interest rate was negative and their savings would buy less at the end of the year than at the start, so money was a poorer store of value.`,
          explanation: "Two marks for each group: effect + explanation.",
        }),
        P.manual({
          label: "(h)", marks: 5, levels: LV(5),
          stem: "Discuss whether raising interest rates is the best way for Country L to reduce this inflation.",
          points: [
            "For: higher rates reduce borrowing and spending, lowering demand; can stop expectations and wage-price spiral; may strengthen the currency, making fuel imports cheaper.",
            "Against: the inflation is mainly cost-push (drought, fuel), so lower demand reduces output and jobs without tackling the cause.",
            "Against: harms borrowers and investment; time lags.",
            "Alternatives: supply-side (irrigation, drought-resistant seed, fuel efficiency); fiscal measures; targeted help; wait for the harvest to recover.",
            "Justified conclusion.",
          ],
          modelAnswer: "Raising interest rates would make borrowing dearer, so spending would fall and firms would find it harder to raise prices; it could also stop people expecting more inflation, preventing a wage-price spiral, and a stronger currency would make imported fuel cheaper. However, the table shows that the inflation comes mainly from food and transport, caused by the drought and dearer fuel: cost-push inflation. Cutting demand would reduce inflation only by reducing output and jobs, and it would hurt borrowers and investment. Supply-side measures such as irrigation and drought-resistant seed would deal with the cause, although they take time, and food prices should fall when harvests recover. A small rise in interest rates may help stop the inflation spreading, but it is not the best main policy: measures that raise food supply and help households cope are more suitable.",
          explanation: "Match the policy to the cause; conclude.",
        }),
      ],
      explanation: `Weighted CPI 2026 = ${fmt(idx, 1)}, inflation ${pct(inf, 1)}; the workers' real wage fell to US\\$${fmt(realW, 2)} (${fmt(wCh, 1)}%). Food made the largest contribution; the inflation is mainly cost-push.`,
      hints: ["Item index = 2026 price ÷ 2025 price × 100.", "Weighted index = Σ(weight × index) ÷ Σweights.", "Real wage = money wage ÷ price index × 100."],
    });
  }

  // ---------------- Paper 3 essays.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.national-income.measurement", "econ.national-income.uses-limitations"],
    stem: "National income statistics are published every year by the national statistics office.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain the three methods used to measure national income.",
        points: [
          "Output method: adds the value added by each sector (agriculture, mining, manufacturing, services); final goods only to avoid double counting.",
          "Income method: adds factor incomes (wages, rent, interest, profits); excludes transfer payments.",
          "Expenditure method: adds spending on final output, C + I + G + (X − M); imports subtracted.",
          "The three should give the same total (output = income = expenditure).",
        ],
        modelAnswer: "The output method adds up the value of output of every sector, such as agriculture, mining, manufacturing and services, counting only the value added at each stage so that intermediate goods are not counted twice. The income method adds up the incomes earned by the factors of production: wages, rent, interest and profits, leaving out transfer payments such as pensions, which are not payments for output. The expenditure method adds up spending on final goods and services: consumption, investment, government spending and exports, minus imports, which were produced abroad. Because output creates income, which is then spent on the output, all three methods should give the same total.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss the usefulness of national income statistics for comparing the standard of living in Zimbabwe with that of other countries.",
        points: [
          "Useful: GDP per head gives a simple, widely available measure of average income; real GDP per head can be compared over time.",
          "Useful: international bodies use it for loans and aid decisions; shows the size and structure of economies.",
          "Limitation: large informal and subsistence sectors are under-recorded, so Zimbabwe's figure may be understated.",
          "Limitation: averages hide income distribution; different prices/cost of living and exchange rates distort comparisons.",
          "Limitation: ignores quality of life: health, education, leisure, pollution; other indicators (e.g. HDI, life expectancy) needed.",
          "Justified conclusion: a useful starting point but must be used with other indicators.",
        ],
        modelAnswer: "National income statistics, especially real GDP per head, give a simple measure of average income that is published for almost every country, so they allow quick comparisons, and international lenders and aid agencies use them to decide on support. However, Zimbabwe has a large informal sector and many households grow their own food; this output is poorly recorded, so Zimbabwe's GDP per head may understate living standards compared with countries where most activity is formal. GDP per head is also an average that hides how income is shared, and converting figures at exchange rates ignores differences in the cost of living. Nor does it measure health, education, leisure or environmental damage. National income statistics are therefore useful as a starting point, but a fair comparison also needs other indicators, such as life expectancy, literacy and measures of inequality.",
      }),
    ],
    explanation: "Part (a) explains output, income and expenditure methods; part (b) weighs the usefulness of GDP per head against its limitations for international comparison.",
    hints: ["(a) For each method say what is added and one adjustment.", "(b) Think about the informal sector, distribution and quality of life."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.inflation.meaning-causes", "econ.inflation.effects-policies"],
    stem: "Inflation has been a serious problem in Zimbabwe at different times.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Distinguish between demand-pull and cost-push inflation.",
        points: [
          "Demand-pull: aggregate demand rises faster than the economy's ability to produce.",
          "Causes/example: higher consumer or government spending, credit or money supply growth; output and employment usually rising.",
          "Cost-push: rising costs of production are passed on in higher prices.",
          "Causes/example: higher wages, fuel, imported inputs after depreciation, drought; output usually falling.",
        ],
        modelAnswer: "Demand-pull inflation happens when total spending in the economy rises faster than firms can increase output, so they raise prices; it is caused, for example, by rapid growth in consumer credit, government spending or the money supply, and usually comes with rising output and employment. Cost-push inflation starts with a rise in firms' costs, such as wages above productivity, fuel, or imported inputs after the currency falls, or a drought that reduces food supply; firms pass the costs on in higher prices, and output and employment often fall.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss the effects of high inflation on consumers, producers, the government and the functions of money.",
        points: [
          "Consumers: real incomes fall, especially fixed-income earners and pensioners; savers lose; borrowers gain.",
          "Producers: higher selling prices and lower real debts may help; but rising costs, uncertainty, menu costs, less competitive exports.",
          "Government: more tax revenue and lower real debt; but higher costs of wages and goods, pressure to protect the poor, loss of confidence.",
          "Functions of money: store of value fails first; then standard of deferred payment, unit of account and medium of exchange (foreign currency, barter in hyperinflation, e.g. 2008).",
          "Effects depend on the rate and whether it is expected: low, stable inflation causes few problems.",
          "Justified conclusion.",
        ],
        modelAnswer: "High inflation reduces consumers' real incomes, especially those on fixed incomes such as pensioners, and savers lose when interest rates are below inflation, although borrowers gain because their debts fall in real terms. Producers may benefit at first from higher selling prices and lower real debts, but rising costs, frequent price changes and uncertainty discourage investment, and exports become less competitive. The government collects more tax in money terms and the real value of its debt falls, but its own costs rise and it faces pressure to protect the poor. Most seriously, high inflation destroys the functions of money: money stops being a store of value, lenders refuse to lend in it, prices are quoted in other currencies and, in hyperinflation, as in Zimbabwe in 2008, people turn to foreign currency or barter. Overall, low and predictable inflation does little harm, but high and unstable inflation harms most groups and the economy as a whole.",
      }),
    ],
    explanation: "Part (a) contrasts the two causes; part (b) weighs effects on each group and on money's functions.",
    hints: ["(a) One starts with spending, the other with costs.", "(b) Who gains and who loses? Which function of money fails first?"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1080, paper: "Paper 3",
    concepts: ["econ.fiscal.taxation", "econ.fiscal.budget-fiscal-policy", "econ.monetary.monetary-policy", "econ.inflation.effects-policies"],
    stem: "Governments use taxation and other policies to manage the economy.",
    parts: [
      P.manual({
        label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Explain the difference between direct and indirect taxes, giving an example of each.",
        points: [
          "Direct tax: a tax on income or wealth, paid directly to the government by the person or firm that bears it.",
          "Example: income tax (PAYE) or corporate tax; often progressive.",
          "Indirect tax: a tax on spending on goods and services, collected by the seller.",
          "Example: VAT, excise or customs duty; often regressive.",
        ],
        modelAnswer: "A direct tax is a tax on income or wealth that is paid directly to the government by the person or firm that bears it, for example income tax deducted from wages (PAYE) or corporate tax on company profits; income tax is usually progressive. An indirect tax is a tax on spending on goods and services, collected by the seller and passed on in prices, for example VAT or excise duty on fuel; such taxes are often regressive because poorer households spend a larger share of their income.",
      }),
      P.manual({
        label: "(b)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 }, levels: LV(6),
        stem: "Discuss whether fiscal policy is more effective than monetary policy in reducing inflation.",
        points: [
          "Fiscal: higher taxes and lower government spending reduce aggregate demand; can cut the deficit and stop money-financed spending (a cause of very high inflation).",
          "Fiscal limits: slow (annual budget), politically unpopular, may cut useful services; higher VAT raises prices at first; incentives.",
          "Monetary: interest rates can be changed quickly by the central bank; reduce borrowing and spending; may strengthen the currency.",
          "Monetary limits: time lags; weak when few people borrow from banks or use foreign currency; hurts borrowers and investment.",
          "Both reduce demand: neither solves cost-push inflation well; supply-side measures needed.",
          "Justified conclusion.",
        ],
        modelAnswer: "Fiscal policy reduces inflation by raising taxes and cutting government spending, which lowers aggregate demand; where inflation is caused by a large deficit financed by creating money, cutting the deficit tackles the cause directly. However, budget changes take time, are unpopular and may cut useful services, and raising VAT pushes prices up at first. Monetary policy can be changed quickly by the central bank: higher interest rates reduce borrowing and spending and may strengthen the currency, making imports cheaper. But it works with long time lags and is weak in an economy where few people borrow from banks or many use foreign currency, and it hurts investment. Both policies work mainly on demand, so neither is very effective against cost-push inflation, which needs supply-side measures. Where government deficits are the root cause, fiscal discipline is more effective; otherwise monetary policy acts faster, so the best results come from using both together.",
      }),
    ],
    explanation: "Part (a) distinguishes direct and indirect taxes; part (b) compares fiscal and monetary policy against inflation.",
    hints: ["(a) Income versus spending.", "(b) Consider speed, causes of inflation and side effects."],
  });
});
