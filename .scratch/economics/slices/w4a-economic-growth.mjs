// W4a: econ.growth.economic-growth — meaning, real GDP measurement, signs, causes, benefits and costs.
// Figures differ from the lesson's worked examples.
import { concept, P, table, prices, pctChange, nationalIncome, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.growth.economic-growth", { file: "growth/economic-growth", keyPrefix: "growth.economic-growth" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Economic growth is best defined as",
    options: [
      ["an increase in a country's real output of goods and services over time.", "Correct: growth is a rise in real GDP."],
      ["an increase in the general level of prices over time.", "That is inflation, not growth."],
      ["an increase in the amount of money circulating in the economy.", "More money does not mean more goods and services."],
      ["an increase in the value of a country's exports over time.", "Exports are one part of spending; growth concerns total real output."],
    ],
    answer: "A",
    explanation: "Economic growth is an increase in the real output (real GDP) of an economy over a period of time.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do economists measure economic growth using real GDP rather than nominal GDP?",
    options: [
      ["Real GDP removes the effect of price changes, so it shows changes in output", "Correct: nominal GDP can rise just because prices rise."],
      ["Real GDP includes the value of the informal sector, while nominal GDP does not", "Both measures face the same problem in recording informal output."],
      ["Real GDP is divided by the population, while nominal GDP is not", "That describes GDP per head, not real GDP."],
      ["Real GDP is always larger than nominal GDP, so it is easier to read", "After inflation, real GDP is usually smaller than nominal GDP."],
    ],
    answer: "A",
    explanation: "Real GDP is GDP at constant prices, so a change in it reflects a change in the quantity of goods and services produced.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which change would be a **sign** that an economy is growing?",
    options: [
      ["New factories and shops open and firms employ more workers", "Correct: more firms and jobs show output is rising."],
      ["The general price level rises by 15% in a year", "Rising prices show inflation, not more output."],
      ["Many skilled workers emigrate to neighbouring countries", "Emigration of workers reduces productive capacity."],
      ["Firms close mines because world mineral prices have fallen", "Closures reduce output."],
    ],
    answer: "A",
    explanation: "Signs of growth include new and expanding firms, more jobs, more goods in shops and higher incomes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which would increase the **productive capacity** of an economy?",
    options: [
      ["A programme that trains thousands of young people as electricians and welders", "Correct: better-skilled labour raises the quality of resources."],
      ["A rise in consumer spending when there is already full employment", "At full employment extra spending mainly raises prices; capacity is unchanged."],
      ["A rise in the price of imported fuel", "Dearer inputs raise costs; they do not add resources."],
      ["A fall in investment in new machinery", "Less investment slows the growth of the capital stock."],
    ],
    answer: "A",
    explanation: "Productive capacity rises when the quantity or quality of resources rises: training improves the quality of labour.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Country Y's growth rate of real GDP falls from 6% in one year to 2% the next year. Which statement is correct?",
    options: [
      ["Real output still increased, but more slowly than before", "Correct: a positive growth rate means output is still rising."],
      ["Real output fell by 4% between the two years", "A fall in the growth rate is not a fall in output."],
      ["Real output fell, because the growth rate fell", "Output falls only when the growth rate is negative."],
      ["Real output stayed the same in the second year", "A 2% growth rate means output rose by 2%."],
    ],
    answer: "A",
    hints: ["Is a 2% growth rate positive or negative?"],
    explanation: "With growth of 2%, real GDP is still rising; it is rising more slowly than when growth was 6%.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In a fictional country, nominal GDP rises by 9% in a year and prices rise by 9%. What has happened to real GDP?",
    options: [
      ["It has stayed roughly the same", "Correct: the whole rise in nominal GDP is due to higher prices."],
      ["It has risen by about 9%", "This ignores inflation."],
      ["It has risen by about 18%", "Inflation is subtracted, not added."],
      ["It has fallen by about 9%", "Output has not fallen; nominal GDP rose as much as prices."],
    ],
    answer: "A",
    hints: ["Real growth is roughly nominal growth minus inflation."],
    explanation: "If nominal GDP and prices both rise by 9%, the quantity of output is unchanged: real growth is about zero.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country's real GDP rose by 4% in a year. Which further information would best show whether the **average person** is better off?",
    options: [
      ["The growth rate of the population over the same year", "Correct: real GDP per head depends on population growth too."],
      ["The rate of inflation over the same year", "Real GDP has already been adjusted for inflation."],
      ["The value of nominal GDP in the same year", "Nominal GDP adds no information about output per person."],
      ["The country's exchange rate against the US dollar", "The exchange rate does not show output per person."],
    ],
    answer: "A",
    hints: ["What do you need to calculate real GDP per head?"],
    explanation: "If population grew by more than 4%, real GDP per head fell. Even then, distribution and quality of life also matter.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Growth in a country is driven mainly by a mining boom using foreign-owned machinery and a small, highly skilled workforce. Which cost of this growth is **most likely**?",
    options: [
      ["Incomes become more unequal because few local workers share in the gains", "Correct: the gains go to a small workforce and to foreign owners."],
      ["Unemployment rises sharply because mines need many unskilled workers", "The stem says the workforce is small and highly skilled."],
      ["Government tax revenue falls because output is rising", "Rising output usually raises tax revenue."],
      ["Mineral reserves increase because more is being mined", "Mining depletes reserves."],
    ],
    answer: "A",
    hints: ["Who receives the income from this kind of growth?"],
    explanation: "Capital-intensive mining growth benefits owners and a few skilled workers, so inequality may widen; the minerals are also depleted.",
  });

  // Numericals.
  const n1 = 36400, idx1 = 112, r1 = prices.realValue(n1, idx1);
  check("r1", r1, 32500);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r1, daily: true,
    stem: `In a fictional country, nominal GDP in 2026 is US\\$${fmt(n1)} million and the price index is ${idx1} (base year 2025 = 100). Calculate real GDP in 2026 at 2025 prices, in US\\$ million.`,
    wrong: [(n1 * idx1) / 100],
    explanation: `Real GDP = nominal GDP ÷ price index × 100 = ${fmt(n1)} ÷ ${idx1} × 100 = **US\\$${fmt(r1)} million**. Multiplying by the index (${fmt((n1 * idx1) / 100, 0)}) inflates rather than removes the price rise.`,
  });
  const g0 = 8400, g1 = 8862, gr = pctChange(g0, g1);
  check("gr", gr, 5.5);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: gr, calculator: true,
    stem: `Real GDP in a fictional country rose from US\\$${fmt(g0)} million to US\\$${fmt(g1)} million. Calculate the rate of economic growth. Give your answer to one decimal place.`,
    wrong: [((g1 - g0) / g1) * 100],
    explanation: `Growth = (${fmt(g1)} − ${fmt(g0)}) ÷ ${fmt(g0)} × 100 = ${g1 - g0} ÷ ${fmt(g0)} × 100 = **${pct(gr, 1)}**. Dividing by the new value (${pct(((g1 - g0) / g1) * 100, 1)}) uses the wrong base.`,
  });
  const a0 = 62000, a1 = 69440, ix0 = 100, ix1 = 108;
  const realA1 = prices.realValue(a1, ix1), rgA = pctChange(a0, realA1), ngA = pctChange(a0, a1);
  check("ngA", ngA, 12);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: rgA, calculator: true,
    stem: `A fictional country's nominal GDP rose from US\\$${fmt(a0)} million in 2025 to US\\$${fmt(a1)} million in 2026. The price index rose from ${ix0} to ${ix1}. Calculate the rate of real economic growth between 2025 and 2026. Give your answer to one decimal place.`,
    wrong: [ngA, ngA - 8],
    hints: ["First turn 2026 nominal GDP into real GDP at 2025 prices."],
    explanation: `1. Real GDP 2026 = ${fmt(a1)} ÷ ${ix1} × 100 = US\\$${fmt(realA1, 2)} million.\n2. Real growth = (${fmt(realA1, 2)} − ${fmt(a0)}) ÷ ${fmt(a0)} × 100 = **${pct(rgA, 1)}**.\n3. ${pct(ngA, 0)} is nominal growth, which includes the price rise. Subtracting inflation from nominal growth (${pct(ngA - 8, 0)}) is only an approximation.`,
  });
  const gdpP0 = 9600, gdpP1 = 9888, pop0 = 12.0, pop1 = 12.48;
  const ph0 = nationalIncome.perHead(gdpP0, pop0), ph1 = nationalIncome.perHead(gdpP1, pop1), phCh = pctChange(ph0, ph1);
  check("ph0", ph0, 800); check("ph1", ph1, 792.3076923);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: phCh, calculator: true,
    stem: `In a fictional country, real GDP rose from US\\$${fmt(gdpP0)} million to US\\$${fmt(gdpP1)} million while the population rose from ${fmt(pop0, 1)} million to ${fmt(pop1, 2)} million. Calculate the percentage change in real GDP per head. Give your answer to one decimal place and include a minus sign if it fell.`,
    wrong: [pctChange(gdpP0, gdpP1), -phCh],
    hints: ["Work out real GDP per head in each year first.", "Then find the percentage change from the first year."],
    explanation: `1. Real GDP per head before = ${fmt(gdpP0)} ÷ ${fmt(pop0, 1)} = US\\$${fmt(ph0)}.\n2. After = ${fmt(gdpP1)} ÷ ${fmt(pop1, 2)} = US\\$${fmt(ph1, 2)}.\n3. Change = (${fmt(ph1, 2)} − ${fmt(ph0)}) ÷ ${fmt(ph0)} × 100 = **${pct(phCh, 1)}**.\n4. Real GDP grew by ${pct(pctChange(gdpP0, gdpP1), 0)}, but the population grew by ${pct(pctChange(pop0, pop1), 0)}, so output per person fell.`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "If nominal GDP rises, the economy must have experienced economic growth.",
    answer: false,
    explanation: "False. Nominal GDP can rise only because prices rise. Growth requires a rise in real GDP.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Depletion of non-renewable resources, such as minerals, is a possible cost of economic growth.",
    answer: true,
    explanation: "True. Faster production often means mining and using up resources that cannot be replaced.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change with the way it causes economic growth.",
    pairs: [
      ["A mining company buys new drilling machines", "Increases the quantity of capital"],
      ["Vocational colleges train more mechanics", "Improves the quality of labour"],
      ["A new, faster way of curing tobacco is adopted", "Improves technology"],
      ["Foreign buyers order more of the country's exports when there is spare capacity", "Increases total demand"],
    ],
    explanation: "Growth comes from more resources (capital), better resources (skills, technology) or more total demand when resources are idle.",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "An increase in the quantity or quality of resources shifts the production possibility curve {{blank:a}}. An increase in total demand when many workers are unemployed moves the economy from a point {{blank:b}} the curve towards it.",
    blanks: [
      { id: "a", accepted: ["outwards"], choices: ["outwards", "inwards"] },
      { id: "b", accepted: ["inside"], choices: ["inside", "outside", "on"] },
    ],
    wrong: [["inwards", "outside"]],
    hints: ["Unemployed resources mean the economy is not producing at its maximum."],
    explanation: "More or better resources raise potential output (the PPC shifts outwards). Using idle resources moves the economy from inside the curve towards it.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** causes of economic growth.",
    points: [
      "Identifies a first cause, e.g. investment in capital / machinery / infrastructure.",
      "Explains it, e.g. more capital per worker raises productivity, so more output can be produced.",
      "Identifies a second cause, e.g. education and training / better healthcare / new technology / more total demand.",
      "Explains it, e.g. more skilled workers produce more per hour, raising real output.",
    ],
    modelAnswer: "First, investment in new machinery and infrastructure such as roads and electricity increases the quantity of capital, so each worker can produce more and the economy's productive capacity rises. Second, education and training improve workers' skills, so they make fewer mistakes, use technology better and produce more in each hour, raising real output.",
    hints: ["Think about the quantity and the quality of resources."],
    explanation: "Each cause: identify (1) + explain how it raises real output (1).",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why economic growth may not improve the living standards of everyone in a country.",
    points: [
      "Population may grow faster than real GDP, so real GDP per head falls.",
      "The gains may be unequally distributed: owners, skilled workers or some regions gain most.",
      "Growth may bring pollution, congestion or longer working hours, lowering quality of life.",
      "Extra output may be capital goods, exports or military spending rather than goods people consume.",
    ],
    modelAnswer: "If the population grows faster than real GDP, output per person falls. Even when real GDP per head rises, the extra income may go mainly to firm owners, skilled workers or the cities, so poor rural households may gain little. Growth can also bring pollution, congestion and stress that lower quality of life. Finally, the extra output may be capital goods or exports rather than goods that people consume now.",
    hints: ["Think about population, distribution and the type of output."],
    explanation: "One mark per developed reason, up to four.",
  });

  // Structured 1: growth data for two fictional countries.
  const C = {
    P: { g0: 14000, g1: 14630, pop0: 7.0, pop1: 7.07 },
    Q: { g0: 31500, g1: 32760, pop0: 21.0, pop1: 22.05 },
  };
  const gP = pctChange(C.P.g0, C.P.g1), gQ = pctChange(C.Q.g0, C.Q.g1);
  const phP = [C.P.g0 / C.P.pop0, C.P.g1 / C.P.pop1], phQ = [C.Q.g0 / C.Q.pop0, C.Q.g1 / C.Q.pop1];
  check("gP", gP, 4.5); check("gQ", gQ, 4); check("phP0", phP[0], 2000); check("phQ0", phQ[0], 1500);
  const phQch = pctChange(phQ[0], phQ[1]), phPch = pctChange(phP[0], phP[1]);
  const T1 = table(["", "Real GDP 2025 (US\\$ million)", "Real GDP 2026 (US\\$ million)", "Population 2025 (million)", "Population 2026 (million)"], [
    ["Country P", C.P.g0, C.P.g1, fmt(C.P.pop0, 2), fmt(C.P.pop1, 2)],
    ["Country Q", C.Q.g0, C.Q.g1, fmt(C.Q.pop0, 2), fmt(C.Q.pop1, 2)],
  ]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows real GDP and population for two fictional countries.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: gP, stem: "Calculate the rate of economic growth of Country P between 2025 and 2026. Give your answer to one decimal place.", wrong: [((C.P.g1 - C.P.g0) / C.P.g1) * 100], explanation: `(${fmt(C.P.g1)} − ${fmt(C.P.g0)}) ÷ ${fmt(C.P.g0)} × 100 = ${pct(gP, 1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: phQ[1], dp: 2, tol: 0.006, stem: "Calculate real GDP per head in Country Q in 2026, in US\\$ to two decimal places.", wrong: [C.Q.g1 / C.Q.pop0], explanation: `${fmt(C.Q.g1)} million ÷ ${fmt(C.Q.pop1, 2)} million = US\\$${fmt(phQ[1], 2)}.` }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "What happened to real GDP per head between 2025 and 2026?",
        options: [
          ["It rose in Country P and fell in Country Q", `Correct: P US\\$2,000 → US\\$${fmt(phP[1], 2)}; Q US\\$1,500 → US\\$${fmt(phQ[1], 2)}.`],
          ["It rose in both countries", "Q's population grew faster (5%) than its real GDP (4%)."],
          ["It fell in both countries", "P's real GDP grew faster (4.5%) than its population (1%)."],
          ["It fell in Country P and rose in Country Q", "This reverses the result."],
        ],
        answer: "A",
        explanation: `P: ${pct(phPch, 1)}; Q: ${pct(phQch, 1)}.`,
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain why Country Q's real GDP grew but its real GDP per head fell.",
        points: [
          "Real GDP grew by 4%.",
          "Population grew by 5%, faster than real GDP.",
          "So output had to be shared among relatively more people: output per person fell.",
        ],
        modelAnswer: "Country Q's real GDP rose by 4%, but its population rose by 5%. Because the number of people grew faster than output, each person's share of output, real GDP per head, fell slightly.",
        explanation: "Compare the two growth rates.",
      }),
      P.manual({
        label: "(e)", marks: 4, levels: LV(4),
        stem: "Discuss whether the people of Country P are better off in 2026 than in 2025.",
        points: [
          `Yes: real GDP per head rose by about ${pct(phPch, 1)}, so on average there are more goods and services per person.`,
          "But: real GDP per head is an average and does not show how income is distributed.",
          "But: growth may have brought pollution, longer hours or depletion; it ignores leisure, health and education.",
          "Justified conclusion: probably better off on average, but more information (distribution, HDI) is needed.",
        ],
        modelAnswer: `Real GDP per head in Country P rose by about ${pct(phPch, 1)}, so on average each person had more goods and services in 2026. However, this is an average: if the extra income went to a small group, many people may be no better off. Real GDP also ignores pollution, working hours, health and education. On balance the average person is probably slightly better off, but we would need data on income distribution and indicators such as life expectancy to be sure.`,
        explanation: "Rising real GDP per head versus the limits of an average; conclude.",
      }),
    ],
    hints: ["Growth rate = change in real GDP ÷ earlier real GDP × 100.", "Real GDP per head = real GDP ÷ population."],
    explanation: `Country P: growth ${pct(gP, 1)}, population +1%, real GDP per head up ${pct(phPch, 1)}. Country Q: growth ${pct(gQ, 1)}, population +5%, real GDP per head ${pct(phQch, 1)}.`,
  });

  // Structured 2: costs and benefits of growth (context).
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional country in southern Africa has grown quickly for five years, led by new lithium and coal mines. Tax revenue has risen and a new highway has been built. Villagers near the mines complain about dust, polluted rivers and the loss of grazing land, and many mine jobs have gone to skilled workers from the cities.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which is a **benefit** of this growth shown in the information?",
        options: [
          ["Higher tax revenue that paid for a new highway", "Correct: more output raised tax revenue, which financed infrastructure."],
          ["Polluted rivers near the mines", "This is a cost (an external cost)."],
          ["The loss of grazing land", "This is a cost to villagers."],
          ["Jobs going to workers from the cities rather than villagers", "This shows uneven distribution of the gains, a cost for local people."],
        ],
        answer: "A",
        explanation: "Growth raises tax revenue without higher tax rates; here it paid for a highway.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain **one** cost of this growth for people living near the mines.",
        points: ["Identifies a cost: pollution (dust, rivers) / loss of grazing land / few local jobs.", "Explains the effect, e.g. dirty water harms health and livestock, reducing incomes and quality of life."],
        modelAnswer: "Polluted rivers are a cost: villagers and their cattle depend on the water, so illness rises and livestock may die, lowering both health and income.",
        explanation: "Identify (1) + explain (1).",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether the benefits of this country's growth outweigh its costs.",
        points: [
          "Benefits: higher incomes and output, tax revenue, infrastructure such as the highway, exports and foreign currency.",
          "Benefits can be long-lasting if tax revenue is invested in education, health and roads.",
          "Costs: pollution and health damage, loss of grazing land, depletion of non-renewable minerals.",
          "Costs: gains unequally shared; local villagers receive few jobs, so inequality may widen.",
          "Justified conclusion, e.g. depends on whether the government regulates pollution, compensates villagers and invests mineral revenue.",
        ],
        modelAnswer: "The growth has raised output and tax revenue, which paid for a new highway that lowers transport costs for everyone, and mineral exports earn foreign currency. If the revenue is invested in schools, clinics and roads, the benefits could last after the minerals run out. However, villagers suffer dust and polluted rivers, which harm health and livestock, and have lost grazing land, while most mine jobs went to outsiders, so the gains are unequally shared. Lithium and coal are non-renewable, so the growth cannot last for ever. The benefits outweigh the costs only if the government enforces pollution controls, compensates and trains local people, and saves or invests the mineral revenue.",
        explanation: "Benefits versus costs, with a conclusion that states what the answer depends on.",
      }),
    ],
    hints: ["Think about who gains and who loses from the mining boom."],
    explanation: "Growth brings tax revenue and infrastructure but also pollution, depletion and uneven gains.",
  });

  b.card("DEFINITION", "Define **economic growth**.", "An increase in the real output of goods and services (real GDP) of an economy over time.");
  b.card("DEFINITION", "What is the difference between **nominal** and **real** GDP?", "Nominal GDP is at current prices; real GDP is adjusted for inflation (at constant, base-year prices).");
  b.card("FORMULA", "Real GDP = ?", "Nominal GDP ÷ price index × 100.");
  b.card("FORMULA", "Economic growth rate = ?", "(Real GDP this year − real GDP last year) ÷ real GDP last year × 100.");
  b.card("CONCEPT", "Name four causes of economic growth.", "Investment in capital; a larger or better-skilled labour force; new technology; discovery of natural resources; more total demand when resources are idle.");
  b.card("CONCEPT", "Give three signs of economic growth.", "New and expanding firms; rising employment; more goods in shops; higher incomes and spending; more tax revenue.");
  b.card("CONCEPT", "Give four benefits of economic growth.", "Higher living standards; more jobs; more tax revenue for public services; less poverty; more investment.");
  b.card("CONCEPT", "Give four costs of economic growth.", "Pollution; depletion of non-renewable resources; wider inequality; inflation; opportunity cost of lower consumption now.");
  b.card("FACT", "Can real GDP rise while real GDP per head falls?", "Yes: if the population grows faster than real GDP.");
  b.card("FACT", "If the growth rate falls from 5% to 2%, does output fall?", "No: output still rises, only more slowly. Output falls only when growth is negative.");
});
