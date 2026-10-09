// W3b: econ.fiscal.budget-fiscal-policy — the government (national) budget, deficits and surpluses (calculations),
// areas of spending, fiscal policy and the macroeconomic aims. Figures differ from the lesson's worked examples.
import { concept, P, table, budgetBalance, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.fiscal.budget-fiscal-policy", { file: "fiscal/budget-fiscal-policy", keyPrefix: "fiscal.budget-fiscal-policy" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A government has a **budget deficit** when",
    options: [
      ["its spending is greater than its revenue in a year.", "Correct: the shortfall is usually financed by borrowing."],
      ["its revenue is greater than its spending in a year.", "That is a budget surplus."],
      ["the value of imports is greater than the value of exports.", "That describes a trade deficit, not the budget."],
      ["the total amount it owes from past borrowing rises above GDP.", "That describes the size of the national debt."],
    ],
    answer: "A",
    explanation: "Budget deficit: government spending > government revenue in a year.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The tools of **fiscal policy** are",
    options: [
      ["government spending and taxation.", "Correct: fiscal policy changes spending and taxes."],
      ["interest rates and the money supply.", "These are monetary policy tools."],
      ["tariffs and import quotas only.", "These are trade restrictions, not the main fiscal tools."],
      ["the exchange rate and foreign currency reserves.", "These are managed through monetary or exchange rate policy."],
    ],
    answer: "A",
    explanation: "Fiscal policy uses government spending and taxation to influence the economy.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A country is in a recession with rising unemployment. Which fiscal policy is most suitable?",
    options: [
      ["Increase government spending on road building", "Correct: this raises aggregate demand and creates jobs."],
      ["Raise the rate of value added tax", "Higher taxes reduce spending and worsen the recession."],
      ["Cut spending on public-sector wages", "Lower spending reduces demand further."],
      ["Raise income tax to reduce the budget deficit", "This is contractionary and would deepen the recession."],
    ],
    answer: "A",
    explanation: "Expansionary fiscal policy (more spending or lower taxes) raises demand, output and employment in a recession.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the difference between a budget deficit and the national debt?",
    options: [
      ["The deficit is one year's shortfall; the debt is the total owed from past borrowing", "Correct: deficits add to the debt."],
      ["The deficit is owed to foreign lenders; the debt is owed to local banks and households", "Both can be owed to residents or foreigners."],
      ["The deficit is the total owed; the debt is one year's shortfall", "This reverses the two terms."],
      ["They are two names for exactly the same figure", "One is a yearly flow, the other a total stock."],
    ],
    answer: "A",
    explanation: "A deficit is a flow for one year; the national debt is the accumulated stock of borrowing.",
  });
  {
    const R = 7350, E = 6980, bal = budgetBalance(R, E);
    check("bal", bal, 370);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `A fictional government collects US\\$${fmt(R)} million in revenue and spends US\\$${fmt(E)} million. What is its budget position?`,
      options: [
        [`A surplus of US\\$${bal} million`, `Correct: ${fmt(R)} − ${fmt(E)} = +${bal}.`],
        [`A deficit of US\\$${bal} million`, "Revenue is larger than spending, so it is a surplus."],
        [`A surplus of US\\$${fmt(R + E)} million`, "This adds revenue and spending."],
        ["A balanced budget", "Revenue and spending are not equal."],
      ],
      answer: "A",
      explanation: `Budget balance = revenue − spending = ${fmt(R)} − ${fmt(E)} = US\\$${bal} million (surplus).`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Demand-pull inflation is rising in a fictional country. Which fiscal measure would help to reduce it?",
    options: [
      ["Raising income tax rates", "Correct: lower disposable income reduces consumer spending and aggregate demand."],
      ["Increasing grants to households", "This raises spending and adds to inflation."],
      ["Cutting value added tax", "This makes goods cheaper and raises spending."],
      ["Increasing spending on public-sector wages", "This raises incomes and demand."],
    ],
    answer: "A",
    hints: ["Demand-pull inflation is caused by too much spending."],
    explanation: "Contractionary fiscal policy (higher taxes or lower spending) reduces aggregate demand and so demand-pull inflation.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government increases spending on new dams and irrigation schemes. Which is the most likely **long-run** effect?",
    options: [
      ["Higher productive capacity in farming, supporting economic growth", "Correct: irrigation raises output per hectare and reduces dependence on rain."],
      ["A permanent rise in the rate of inflation", "Higher capacity tends to reduce, not raise, inflation pressure in the long run."],
      ["A fall in agricultural output as farmers stop working the land they own", "Irrigation makes farming more productive."],
      ["A permanent budget surplus", "The spending adds to the budget deficit in the short run."],
    ],
    answer: "A",
    hints: ["Think beyond the construction jobs: what does the dam allow farmers to do?"],
    explanation: "Infrastructure spending raises demand now and productive capacity later, supporting long-run growth.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A government cuts income tax to raise spending in a recession, but the effect on domestic output is much smaller than expected. Which is the most likely reason?",
    options: [
      ["Households spent much of the extra income on imported goods", "Correct: spending on imports creates output abroad, not at home."],
      ["The tax cut increased households' disposable income as planned", "That is how the policy is meant to work, not why it failed."],
      ["Firms hired more workers to meet higher demand", "This would make the effect larger, not smaller."],
      ["Government spending on schools stayed the same", "Unchanged spending does not reduce the effect of the tax cut."],
    ],
    answer: "A",
    hints: ["Where is the extra spending going?"],
    explanation: "If extra disposable income is saved or spent on imports, little of it boosts domestic output: a limitation of fiscal policy.",
  });

  // Numericals.
  {
    const R = 3450, E = 3920, bal = budgetBalance(R, E);
    check("bal2", bal, -470);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: bal, daily: true,
      stem: `A fictional government's revenue is US\\$${fmt(R)} million and its spending is US\\$${fmt(E)} million. Calculate the budget balance, in US\\$ million. Give a deficit as a negative number.`,
      wrong: [-bal, R + E],
      explanation: `Balance = revenue − spending = ${fmt(R)} − ${fmt(E)} = **−${-bal}**: a deficit of US\\$${-bal} million.`,
    });
  }
  {
    const R = 8200, E = 9190, gdp = 33000, def = E - R, share = (def / gdp) * 100;
    check("share", share, 3);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: share, calculator: true,
      stem: `A fictional government expects revenue of US\\$${fmt(R)} million and spending of US\\$${fmt(E)} million. GDP is US\\$${fmt(gdp)} million. Calculate the budget deficit as a percentage of GDP. Give your answer to one decimal place.`,
      wrong: [(E / gdp) * 100, (def / R) * 100],
      hints: ["Find the deficit first, then divide by GDP."],
      explanation: `1. Deficit = ${fmt(E)} − ${fmt(R)} = US\\$${def} million.\n2. ${def} ÷ ${fmt(gdp)} × 100 = **${pct(share, 1)}** of GDP.\n3. Dividing by revenue (${pct((def / R) * 100, 1)}) uses the wrong base.`,
    });
  }
  {
    const R = 6400, E = 6900, incomeTax = 2600, wages = 2500;
    const R2 = R + incomeTax * 0.05, E2 = E - wages * 0.04, bal2 = budgetBalance(R2, E2);
    check("bal3", bal2, -270);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: bal2, calculator: true,
      stem: `A fictional government has revenue of US\\$${fmt(R)} million (including income tax of US\\$${fmt(incomeTax)} million) and spending of US\\$${fmt(E)} million (including public-sector wages of US\\$${fmt(wages)} million). It raises income tax revenue by 5% and cuts the wage bill by 4%. Calculate the new budget balance, in US\\$ million. Give a deficit as a negative number.`,
      wrong: [R - E, -(R2 - E2)],
      hints: ["Work out the extra revenue and the spending cut in US\\$ million.", "New balance = new revenue − new spending."],
      explanation: `1. Extra income tax = 5% × ${fmt(incomeTax)} = ${incomeTax * 0.05}; new revenue = ${fmt(R2)}.\n2. Wage cut = 4% × ${fmt(wages)} = ${wages * 0.04}; new spending = ${fmt(E2)}.\n3. New balance = ${fmt(R2)} − ${fmt(E2)} = **−${-bal2}**: the deficit falls from US\\$${E - R} million to US\\$${-bal2} million.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Cutting taxes and raising government spending is an example of expansionary fiscal policy.",
    answer: true,
    explanation: "True. Both raise aggregate demand.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Changing interest rates is a fiscal policy measure.",
    answer: false,
    explanation: "False. Interest rates are a monetary policy tool; fiscal policy uses taxes and government spending.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each area of government spending with its main reason.",
    pairs: [
      ["Education", "Builds a skilled, productive labour force"],
      ["Infrastructure", "Lowers firms' transport and power costs"],
      ["Social protection", "Supports the poor and elderly"],
      ["Interest on debt", "Pays for past government borrowing"],
    ],
    explanation: "Each area has its own reason and effect on the economy.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "To reduce a large budget deficit, a government can {{blank:a}} taxes or {{blank:b}} its spending. This is {{blank:c}} fiscal policy, and in the short run it is likely to {{blank:d}} unemployment.",
    blanks: [
      { id: "a", accepted: ["raise"], choices: ["raise", "cut"] },
      { id: "b", accepted: ["cut"], choices: ["raise", "cut"] },
      { id: "c", accepted: ["contractionary"], choices: ["expansionary", "contractionary"] },
      { id: "d", accepted: ["increase"], choices: ["increase", "reduce"] },
    ],
    wrong: [["cut", "raise", "expansionary", "reduce"]],
    hints: ["Closing a deficit takes spending power out of the economy."],
    explanation: "Higher taxes and lower spending reduce the deficit but also reduce aggregate demand, so unemployment may rise.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain how expansionary fiscal policy can reduce unemployment.",
    points: [
      "Higher government spending and/or lower taxes.",
      "Raises disposable income / government demand, so aggregate demand rises.",
      "Firms sell more and increase output.",
      "Labour is a derived demand, so firms hire more workers.",
    ],
    modelAnswer: "The government raises its spending, for example on roads, or cuts taxes so that households have more disposable income. Aggregate demand in the economy rises, so firms sell more and increase their output. To produce more they need more workers, so they hire, and unemployment falls.",
    hints: ["Follow the chain: policy → demand → output → jobs."],
    explanation: "A four-step chain earns four marks.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain **two** possible disadvantages of a government running a large budget deficit for many years.",
    points: [
      "Identifies: the national debt grows.",
      "Explains: interest payments rise and take money from schools, health, etc. (opportunity cost).",
      "Identifies: may lead to inflation if financed by creating money / excess demand.",
      "Explains: higher taxes may be needed in future, or lenders lose confidence and charge higher interest.",
    ],
    modelAnswer: "First, each deficit adds to the national debt, so the government has to pay more interest every year, money that cannot be spent on schools or clinics. Second, if the deficit is financed by the central bank creating money, or adds to demand when the economy is near capacity, it can cause inflation; and in the future taxes may have to rise, or lenders may lose confidence and charge higher interest rates.",
    hints: ["Think about debt interest and how the deficit is financed."],
    explanation: "Identify (1) + explain (1) for each disadvantage.",
  });

  // Structured 1: a fictional budget.
  {
    const rev = [["Income tax", 1850], ["VAT", 1420], ["Customs duties", 380], ["Other", 210]];
    const exp = [["Education", 1150], ["Health", 640], ["Infrastructure", 820], ["Social protection", 410], ["Defence", 360], ["Debt interest", 390], ["Other", 530]];
    const R = rev.reduce((s, x) => s + x[1], 0), E = exp.reduce((s, x) => s + x[1], 0), bal = budgetBalance(R, E), gdp = 26000;
    check("R", R, 3860); check("E", E, 4300); check("bal", bal, -440);
    const share = (-bal / gdp) * 100;
    const T = table(["Revenue", "US\\$ million", "Spending", "US\\$ million"], rev.map((r, i) => [r[0], r[1], exp[i][0], exp[i][1]]).concat(exp.slice(rev.length).map((e) => ["", "", e[0], e[1]])));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The table shows the planned budget of a fictional country for next year. GDP is expected to be US\\$${fmt(gdp)} million. The economy is growing slowly and unemployment is high, but the national debt is already large.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: R, stem: "Calculate total planned revenue, in US\\$ million.", wrong: [R - 210], explanation: `${rev.map((r) => fmt(r[1])).join(" + ")} = ${fmt(R)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: bal, stem: "Calculate the planned budget balance, in US\\$ million. Give a deficit as a negative number.", wrong: [-bal], explanation: `Spending = ${fmt(E)}; balance = ${fmt(R)} − ${fmt(E)} = −${-bal} (a deficit).` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: share, stem: "Calculate the deficit as a percentage of GDP. Give your answer to one decimal place.", wrong: [(E / gdp) * 100], explanation: `${-bal} ÷ ${fmt(gdp)} × 100 = ${pct(share, 1)}.` }),
        P.manual({
          label: "(d)", marks: 3,
          stem: "Explain how the planned spending on infrastructure could help reduce unemployment.",
          points: ["Construction projects employ workers directly.", "Workers spend their wages, raising demand for other firms (multiplier).", "Better roads and power lower firms' costs, encouraging investment and more jobs in the long run."],
          modelAnswer: "Building roads, dams and power lines employs construction workers directly. These workers spend their wages in shops and markets, so other firms sell more and hire. In the long run, better infrastructure lowers firms' transport and electricity costs, encouraging them to invest and expand, creating further jobs.",
          explanation: "Direct jobs, spending effects, long-run capacity.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should cut spending to reduce the deficit.",
          points: [
            "For: the debt is already large; debt interest (US\\$390 million) uses revenue; lower borrowing maintains confidence.",
            "Against: growth is slow and unemployment high; cutting spending reduces aggregate demand and may cause a recession, lowering tax revenue.",
            "Depends on what is cut: cutting infrastructure or education harms long-run growth; cutting waste less harmful.",
            "Justified conclusion (e.g. gradual cuts or wait until growth recovers; protect productive spending).",
          ],
          modelAnswer: `The national debt is already large and debt interest takes US\\$390 million, more than is spent on social protection, so reducing the ${pct(share, 1)} deficit would slow the growth of the debt and maintain lenders' confidence. However, the economy is growing slowly and unemployment is high: cutting spending would reduce aggregate demand, cost jobs and reduce tax revenue, so the deficit might fall by less than planned. Cutting infrastructure or education would also harm long-run growth. The government should not make large cuts now; it should cut wasteful spending, protect productive spending, and reduce the deficit gradually as growth recovers.`,
          explanation: "Debt and interest versus demand and jobs; conclude.",
        }),
      ],
      hints: ["Budget balance = revenue − spending.", "Deficit as % of GDP = deficit ÷ GDP × 100."],
      explanation: `Revenue US\\$${fmt(R)} million, spending US\\$${fmt(E)} million: a deficit of US\\$${-bal} million (${pct(share, 1)} of GDP).`,
    });
  }
  // Structured 2: fiscal policy to curb inflation.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country consumer spending has risen rapidly, factories are working at full capacity and inflation has climbed from 4% to 11% in a year. The government is considering raising income tax and delaying some new building projects.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "What type of fiscal policy is the government considering?",
        options: [
          ["Contractionary fiscal policy", "Correct: higher taxes and lower spending reduce aggregate demand."],
          ["Expansionary fiscal policy", "Expansionary policy raises spending or cuts taxes."],
          ["Expansionary monetary policy", "Monetary policy uses interest rates and the money supply."],
          ["Supply-side policy", "Supply-side policy aims to raise productive capacity."],
        ],
        answer: "A",
        explanation: "Raising taxes and delaying spending is contractionary.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how the proposed measures would reduce inflation.",
        points: ["Higher income tax lowers disposable income, so consumer spending falls.", "Delaying projects reduces government spending, so aggregate demand falls.", "With less demand and spare capacity returning, firms have less reason to raise prices: demand-pull inflation falls."],
        modelAnswer: "Higher income tax reduces households' disposable income, so they spend less, and delaying building projects reduces government spending. Aggregate demand therefore falls. With demand no longer greater than what factories can produce, firms cannot raise prices as easily, so demand-pull inflation slows.",
        explanation: "Lower demand reduces demand-pull inflation.",
      }),
      P.manual({
        label: "(c)", marks: 4, levels: LV(4),
        stem: "Discuss whether fiscal policy is the best way to reduce this inflation.",
        points: [
          "For: the inflation is demand-pull (spending rising, full capacity), which contractionary fiscal policy targets; also reduces the deficit.",
          "Against: time lags; higher income tax may reduce incentives to work; delaying projects harms long-run growth; unpopular.",
          "Alternative: higher interest rates (monetary policy) can act faster; supply-side policy raises capacity in the long run.",
          "Justified conclusion.",
        ],
        modelAnswer: "The inflation appears to be demand-pull, since spending is rising fast and factories are at full capacity, so reducing aggregate demand through higher taxes and lower spending tackles its cause, and it also improves the budget balance. However, budget changes take time to approve and have their effect, higher income tax may discourage work, and delaying building projects could harm long-run growth. A rise in interest rates by the central bank might act faster on borrowing and spending, and supply-side policies could raise capacity over time. Fiscal policy is an appropriate part of the response, but it works best combined with tighter monetary policy rather than on its own.",
        explanation: "Weigh suitability for demand-pull inflation against lags and side effects; conclude.",
      }),
    ],
    hints: ["What is causing this inflation?"],
    explanation: "The inflation is demand-pull; contractionary fiscal policy reduces aggregate demand but has lags and side effects.",
  });

  b.card("DEFINITION", "Define the **government (national) budget**.", "A statement of the government's planned revenue and planned spending for the coming year.");
  b.card("DEFINITION", "Define a **budget deficit**.", "When government spending is greater than government revenue in a year.");
  b.card("DEFINITION", "Define a **budget surplus**.", "When government revenue is greater than government spending in a year.");
  b.card("FORMULA", "Budget balance = ?", "Government revenue − government spending (negative = deficit).");
  b.card("DEFINITION", "Define **fiscal policy**.", "The use of changes in government spending and taxation to influence economic activity and achieve macroeconomic aims.");
  b.card("CONCEPT", "What is **expansionary** fiscal policy and when is it used?", "Higher government spending and/or lower taxes; used in a recession to raise demand, output and employment.");
  b.card("CONCEPT", "What is **contractionary** fiscal policy and when is it used?", "Lower government spending and/or higher taxes; used to reduce demand-pull inflation or close a deficit.");
  b.card("DEFINITION", "What is the **national debt**?", "The total amount the government owes from past borrowing.");
  b.card("CONCEPT", "Give three limitations of fiscal policy.", "Time lags; larger deficits and debt; spending leaks into imports; tax rises reduce incentives.");
});
