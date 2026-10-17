// W3b: econ.macro.aims-conflicts (Cambridge only) — the six macroeconomic aims, reasons and targets, conflicts.
// Figures differ from the lesson's worked example.
import { concept, P, table, prices, pctChange, unemploymentRate, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.macro.aims-conflicts", { file: "macro/aims-conflicts", keyPrefix: "macro.aims-conflicts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **macroeconomic** aim of government?",
    options: [
      ["Low and stable inflation", "Correct: price stability is an aim for the whole economy."],
      ["Higher profits for a state-owned bus company", "This concerns one firm, a microeconomic matter."],
      ["A lower price of bread in one city", "This concerns one market in one place."],
      ["More sales for a clothing retailer", "This concerns one firm."],
    ],
    answer: "A",
    explanation: "Macroeconomic aims concern the whole economy: growth, employment, stable prices, the balance of payments, income distribution and sustainability.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Economic growth is best defined as",
    options: [
      ["an increase in real GDP over time.", "Correct: growth is a rise in the volume of output."],
      ["an increase in the general price level.", "That is inflation."],
      ["an increase in the number of firms in the economy.", "More firms do not necessarily mean more output."],
      ["an increase in nominal GDP caused by higher prices.", "A price-driven rise is not real growth."],
    ],
    answer: "A",
    explanation: "Economic growth is an increase in real GDP, the volume of goods and services produced.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do governments aim for **price stability**?",
    options: [
      ["It protects the value of savings and helps firms plan ahead", "Correct: predictable prices reduce uncertainty."],
      ["It guarantees that every worker has a job", "Stable prices do not guarantee full employment."],
      ["It makes sure that prices fall every year", "Price stability means low, steady inflation, not falling prices."],
      ["It removes the need for a central bank to manage the money supply", "Central banks usually pursue price stability."],
    ],
    answer: "A",
    explanation: "Low, steady inflation protects the purchasing power of money and makes planning easier for households and firms.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rising incomes in a fictional country lead to much higher spending on imported cars and electronic goods. Which two aims are most likely to conflict?",
    options: [
      ["Economic growth and balance of payments stability", "Correct: growth raises imports, widening the current account deficit."],
      ["Price stability and redistribution of income", "Imports bought with higher incomes do not link these aims directly."],
      ["Full employment and environmental sustainability", "The described change is about spending on imports."],
      ["Redistribution of income and balance of payments stability", "The change is caused by rising incomes in general."],
    ],
    answer: "A",
    explanation: "When incomes rise, spending on imports rises, so growth can worsen the current account.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fictional country, the unemployment rate falls from 8% to 6% while inflation rises from 3% to 7%. Which conflict does this illustrate?",
    options: [
      ["Full employment versus price stability", "Correct: falling unemployment came with rising inflation."],
      ["Economic growth versus environmental sustainability", "The data say nothing about the environment."],
      ["Redistribution of income versus economic growth", "The data are about jobs and prices."],
      ["Balance of payments stability versus price stability", "No current account data are given."],
    ],
    answer: "A",
    hints: ["Which two indicators moved in opposite directions relative to their aims?"],
    explanation: "As demand rose, firms hired more workers and also raised prices: lower unemployment, higher inflation.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does a government set a **numerical target**, such as an inflation rate of 3%, for an aim?",
    options: [
      ["It makes progress measurable and holds policymakers accountable", "Correct: a target shows whether the aim has been met."],
      ["It means the aim will be achieved automatically", "Targets can be missed."],
      ["It removes any conflict with other aims", "Setting a target does not remove conflicts."],
      ["It allows the government to stop collecting statistics on the economy", "Statistics are needed to check the target."],
    ],
    answer: "A",
    hints: ["How would anyone know whether the aim had been reached?"],
    explanation: "A clear number guides policy, allows performance to be judged and makes the government (or central bank) accountable.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government raises the top rate of income tax to fund cash transfers to poor households. Which conflict might arise?",
    options: [
      ["Redistribution may reduce incentives to work and invest, slowing growth", "Correct: higher taxes on high earners can weaken incentives."],
      ["Redistribution will raise the rate of inflation directly", "A transfer from rich to poor does not directly raise prices."],
      ["Redistribution will improve the environment but cut employment in towns", "There is no direct link to the environment here."],
      ["Redistribution will make the current account surplus larger", "Poor households may spend more, including on imports."],
    ],
    answer: "A",
    hints: ["How might high earners and entrepreneurs react to a higher tax rate?"],
    explanation: "Making income more equal through taxes can reduce the reward for extra work, saving and enterprise, which may slow growth.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which policy is **least** likely to create a conflict between economic growth and price stability?",
    options: [
      ["Training programmes that raise workers' productivity", "Correct: raising productive capacity lets output grow without extra price pressure."],
      ["A large cut in income tax when the economy is near full capacity", "Extra demand at full capacity causes demand-pull inflation."],
      ["A large rise in government spending when unemployment is very low", "More demand with few spare workers pushes up wages and prices."],
      ["A sharp cut in interest rates when consumer spending is already rising fast", "Cheaper credit adds to demand that is already strong."],
    ],
    answer: "A",
    hints: ["Which option increases the economy's capacity to produce rather than spending?"],
    explanation: "Supply-side measures raise productive capacity, so growth need not push up prices; demand boosts near capacity cause inflation.",
  });

  // Numericals.
  {
    const r0 = 28500, r1 = 29640, g = pctChange(r0, r1);
    check("g", g, 4);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: g, daily: true, calculator: true,
      stem: `A fictional country's real GDP rises from US\\$${fmt(r0)} million to US\\$${fmt(r1)} million in one year. Calculate the rate of economic growth. Give your answer to one decimal place.`,
      wrong: [pctChange(r1, r0), ((r1 - r0) / r1) * 100],
      explanation: `(${fmt(r1)} − ${fmt(r0)}) ÷ ${fmt(r0)} × 100 = **${pct(g, 1)}**. Using the new value as the base gives ${pct(((r1 - r0) / r1) * 100, 1)}.`,
    });
  }
  {
    const def = 1260, gdp = 36000, share = (def / gdp) * 100;
    check("share", share, 3.5);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: share, calculator: true,
      stem: `A fictional government's target is a current account deficit no larger than 3% of GDP. This year the deficit is US\\$${fmt(def)} million and GDP is US\\$${fmt(gdp)} million. Calculate the deficit as a percentage of GDP. Give your answer to one decimal place.`,
      wrong: [(gdp / def), 3],
      hints: ["Deficit ÷ GDP × 100."],
      explanation: `1. ${fmt(def)} ÷ ${fmt(gdp)} × 100 = **${pct(share, 1)}**.\n2. This is larger than the 3% limit, so the target was missed by ${fmt(share - 3, 1)} percentage points.`,
    });
  }
  {
    const lf = 5600, u0 = 476, u1 = 392;
    const r0 = unemploymentRate({ unemployed: u0, labourForce: lf }), r1 = unemploymentRate({ unemployed: u1, labourForce: lf });
    check("r0", r0, 8.5); check("r1", r1, 7);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "plain", value: r0 - r1, dp: 1, calculator: true,
      stem: `A fictional country's labour force stays at ${fmt(lf)} thousand while the number unemployed falls from ${u0} thousand to ${u1} thousand. By how many percentage points does the unemployment rate fall? Give your answer to one decimal place.`,
      wrong: [((u0 - u1) / u0) * 100],
      hints: ["Work out the unemployment rate in each year first."],
      explanation: `1. Before: ${u0} ÷ ${fmt(lf)} × 100 = ${pct(r0, 1)}.\n2. After: ${u1} ÷ ${fmt(lf)} × 100 = ${pct(r1, 1)}.\n3. Fall = **${fmt(r0 - r1, 1)} percentage points**. The number unemployed fell by ${pct(((u0 - u1) / u0) * 100, 1)}, which is a different measure.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Price stability means that the prices of goods and services should fall every year.",
    answer: false,
    explanation: "False. Price stability means a low and steady rate of inflation, not falling prices (deflation).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Faster economic growth can make a current account deficit larger, because people spend more on imports.",
    answer: true,
    explanation: "True. Higher incomes raise spending on imports, so the current account may worsen.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each aim with a reason a government pursues it.",
    pairs: [
      ["Economic growth", "Higher incomes and more tax revenue for public services"],
      ["Full employment", "Less poverty and no wasted labour"],
      ["Redistribution of income", "A smaller gap between rich and poor"],
      ["Environmental sustainability", "Resources are kept for future generations"],
    ],
    explanation: "Each aim aims to raise living standards in a different way.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "When aggregate demand rises in an economy that is close to full capacity, unemployment is likely to {{blank:a}} and inflation is likely to {{blank:b}}. This is a conflict between full employment and {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["fall"], choices: ["rise", "fall"] },
      { id: "b", accepted: ["rise"], choices: ["rise", "fall"] },
      { id: "c", accepted: ["price stability"], choices: ["price stability", "economic growth", "redistribution"] },
    ],
    wrong: [["rise", "fall", "economic growth"]],
    hints: ["Firms near capacity hire more and raise prices."],
    explanation: "Extra demand creates jobs but, near capacity, also pushes up prices (demand-pull inflation).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a government aims for full employment.",
    points: [
      "Identifies: workers earn incomes / less poverty.",
      "Explains: households can afford basic needs; fewer people need government support.",
      "Identifies: output is higher / resources not wasted.",
      "Explains: more output and more tax revenue; less spending on support for the unemployed.",
    ],
    modelAnswer: "First, when people have jobs they earn incomes, so fewer households live in poverty and fewer need help from the government. Second, unemployed labour is a wasted resource: with full employment the economy produces more goods and services, and the government collects more income tax and spends less on supporting the unemployed.",
    hints: ["Think of households, output and the government budget."],
    explanation: "Identify (1) + explain (1) for each reason; reduced social problems and skills kept up-to-date are also creditworthy.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a policy to increase economic growth may conflict with environmental sustainability.",
    points: [
      "Growth policy raises output in industry, mining or farming.",
      "More output uses more non-renewable resources (minerals, fossil fuels) and land.",
      "It creates more pollution / emissions / deforestation.",
      "So the ability of future generations to meet their needs is reduced.",
    ],
    modelAnswer: "A policy to raise growth, such as subsidies for mining and manufacturing, increases output. Producing more uses up more non-renewable resources such as minerals and fossil fuels, and clears land for factories and mines. It also creates more air and water pollution and carbon emissions. The environment is damaged and resources are depleted, so future generations may be worse off.",
    hints: ["Follow the chain from more output to the effect on resources and pollution."],
    explanation: "A chain of four linked steps from policy to the environment.",
  });

  // Structured 1: performance against targets.
  {
    const realGdp = [64000, 65280, 68544];
    const g1 = pctChange(realGdp[0], realGdp[1]), g2 = pctChange(realGdp[1], realGdp[2]);
    const cpi = [120, 123, 131.61];
    const inf2 = prices.inflationRate(cpi[1], cpi[2]);
    check("g1", g1, 2); check("g2", g2, 5); check("inf2", inf2, 7);
    const T = table(["", "2024", "2025", "2026"], [["Real GDP (US\\$ million)", realGdp[0], realGdp[1], realGdp[2]], ["Consumer Prices Index", fmt(cpi[0], 2), fmt(cpi[1], 2), fmt(cpi[2], 2)], ["Unemployment rate (%)", "9.5", "9.1", "7.4"]]);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `The government of a fictional country has targets of 4% real GDP growth and inflation no higher than 4% a year. The table shows data for three years. In 2026 the government cut income tax and raised spending on public-sector wages.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: g2, stem: "Calculate the rate of economic growth in 2026. Give your answer to one decimal place.", wrong: [pctChange(realGdp[0], realGdp[2])], explanation: `(${fmt(realGdp[2])} − ${fmt(realGdp[1])}) ÷ ${fmt(realGdp[1])} × 100 = ${pct(g2, 1)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: inf2, stem: "Calculate the rate of inflation in 2026. Give your answer to one decimal place.", wrong: [cpi[2] - cpi[1], pctChange(cpi[0], cpi[2])], explanation: `(${fmt(cpi[2], 2)} − ${cpi[1]}) ÷ ${cpi[1]} × 100 = ${pct(inf2, 1)}.` }),
        P.mcq({
          label: "(c)", marks: 1,
          stem: "Which statement about 2026 is correct?",
          options: [
            ["The growth target was met but the inflation target was missed", `Correct: growth ${pct(g2, 1)} ≥ 4%; inflation ${pct(inf2, 1)} > 4%.`],
            ["Both the growth and the inflation targets were met", `Inflation of ${pct(inf2, 1)} is above the 4% limit.`],
            ["Neither the growth nor the inflation target was met", `Growth of ${pct(g2, 1)} beat the 4% target.`],
            ["The inflation target was met but the growth target was missed", "This reverses the results."],
          ],
          answer: "A",
          explanation: "Compare each figure with its target.",
        }),
        P.manual({
          label: "(d)", marks: 3,
          stem: "Explain how the government's policies in 2026 may have caused both faster growth and higher inflation.",
          points: [
            "Lower income tax and higher wages raise disposable income and consumer spending (aggregate demand).",
            "Firms raise output and hire workers: growth and lower unemployment.",
            "As the economy nears capacity, costs and prices rise: demand-pull inflation.",
          ],
          modelAnswer: "The income tax cut and the higher public-sector wages raised households' disposable income, so consumer spending and aggregate demand increased. Firms responded by producing more and hiring workers, so growth rose and unemployment fell. But as firms approached full capacity and competed for scarce workers and materials, costs rose and they put up prices, causing demand-pull inflation.",
          explanation: "Demand rises → output and jobs rise → near capacity, prices rise.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should now reduce aggregate demand to bring inflation back to its target.",
          points: [
            "For: inflation is above target; it erodes savings and real wages and harms competitiveness; acting early prevents expectations rising.",
            "Against: growth and falling unemployment would be reversed; unemployment is still above 7%.",
            "Alternatives: supply-side measures to raise capacity; wait to see whether inflation is temporary.",
            "Justified conclusion.",
          ],
          modelAnswer: `Inflation of ${pct(inf2, 1)} is well above target; if it continues it reduces the real value of savings and wages and makes exports less competitive, and acting early stops people expecting further price rises. However, reducing demand would slow growth, which has only just reached ${pct(g2, 1)}, and unemployment of 7.4% is still high, so jobs would be lost. Supply-side policies could raise capacity instead, though they take time. A small, gradual reduction in demand is justified to stop inflation rising further, combined with supply-side policies, rather than a sharp cut that would cause a recession.`,
          explanation: "Weigh lower inflation against slower growth and higher unemployment; conclude.",
        }),
      ],
      hints: ["Growth uses real GDP; inflation uses the price index.", "Use the previous year as the base."],
      explanation: `2026: growth ${pct(g2, 1)} (target met), inflation ${pct(inf2, 1)} (target missed): a conflict between growth and price stability. (2025 growth was ${pct(g1, 1)}.)`,
    });
  }
  // Structured 2: growth versus environment.
  {
    b.struct({
      d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
      stem: "A fictional country plans to double the output of its coal mines and build a new coal-fired power station. The government says that cheaper, more reliable electricity will help factories expand and create jobs. Environmental groups say the plan will increase air pollution and carbon emissions.",
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "Which two macroeconomic aims are in conflict in this case?",
          options: [
            ["Economic growth and environmental sustainability", "Correct: more output versus more pollution."],
            ["Price stability and redistribution of income", "Neither is the main issue here."],
            ["Full employment and balance of payments stability", "Jobs are a benefit; the conflict is with the environment."],
            ["Redistribution of income and full employment", "These are not in conflict in the case."],
          ],
          answer: "A",
          explanation: "Expanding coal raises output and jobs but harms the environment.",
        }),
        P.manual({
          label: "(b)", marks: 3,
          stem: "Explain how the plan could help the aim of full employment.",
          points: ["Jobs are created directly in mining and in building and running the power station.", "Cheaper, reliable electricity lowers firms' costs, so factories expand output.", "Expanding firms hire more workers; incomes are spent, creating more jobs elsewhere."],
          modelAnswer: "The plan creates jobs directly in the mines and in building and running the power station. More reliable and cheaper electricity also lowers factories' costs, so they can expand production and hire more workers. These workers spend their incomes, creating further jobs in shops and services.",
          explanation: "Direct jobs + lower costs for factories + spending effects.",
        }),
        P.manual({
          label: "(c)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should go ahead with the plan.",
          points: [
            "For: growth, jobs and reliable electricity; may reduce imports of power or fuel.",
            "Against: air pollution harms health; carbon emissions; land damage; costs for future generations.",
            "Middle way: cleaner technology, renewable energy (solar), pollution taxes or regulation.",
            "Justified conclusion.",
          ],
          modelAnswer: "The plan would raise output and create many jobs, and reliable electricity is essential for factories to grow. However, more coal burning increases air pollution, which harms health and adds medical costs, raises carbon emissions and damages land and water near the mines, costs that future generations will bear. The government could reduce the conflict by requiring cleaner technology, taxing pollution or investing part of the money in solar power. On balance it should go ahead only with strict pollution controls and a plan to shift towards renewable energy, so that growth does not come at an unsustainable cost.",
          explanation: "Growth and jobs versus environmental costs; conclude, possibly with conditions.",
        }),
      ],
      hints: ["Who gains now, and who bears the costs later?"],
      explanation: "The case shows the conflict between economic growth (and employment) and environmental sustainability.",
    });
  }

  b.card("CONCEPT", "List the six macroeconomic aims.", "Economic growth; full employment; price stability; balance of payments stability; redistribution of income; environmental sustainability.");
  b.card("DEFINITION", "Define **price stability**.", "A low and steady rate of inflation (not falling prices).");
  b.card("DEFINITION", "Define **balance of payments stability**.", "A current account close to balance over time, without large or lasting deficits or surpluses.");
  b.card("DEFINITION", "Define **environmental sustainability**.", "Producing and using resources in a way that does not harm future generations' ability to meet their needs.");
  b.card("CONCEPT", "Why do governments set targets for their aims?", "To make the aim clear, measure progress and hold policymakers accountable.");
  b.card("CONCEPT", "Explain the conflict between growth and price stability.", "Rising demand near full capacity raises output but also costs and prices: demand-pull inflation.");
  b.card("CONCEPT", "Explain the conflict between growth and the balance of payments.", "Higher incomes raise spending on imports, widening the current account deficit.");
  b.card("FACT", "Which kind of policy can raise growth with less conflict with inflation?", "Supply-side policy, because it raises productive capacity.");
});
