// W4a: econ.development.international-differences (Cambridge only) — reasons for differences in living standards and
// income distribution within and between countries; factors causing differences in development.
// Figures differ from the lesson's worked examples.
import { concept, P, table, nationalIncome, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.development.international-differences", { file: "development/international-differences", keyPrefix: "development.international-differences" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a typical feature of a developing economy compared with a developed economy?",
    options: [
      ["A larger share of workers in the primary sector", "Correct: many work in farming and mining."],
      ["A lower rate of population growth", "Developing economies usually have faster population growth."],
      ["A higher level of output per worker", "Productivity is usually lower."],
      ["A larger share of workers in financial services", "This is typical of developed economies."],
    ],
    answer: "A",
    explanation: "Developing economies tend to have large primary sectors, lower productivity and faster population growth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does low saving tend to keep living standards low in a poor country?",
    options: [
      ["Low saving means little finance for investment, so productivity stays low", "Correct: saving funds investment in capital."],
      ["Low saving means households spend more, causing a rise in unemployment", "More spending would tend to raise output and jobs."],
      ["Low saving means the government collects more tax and spends less", "Saving does not directly change tax revenue this way."],
      ["Low saving means interest rates fall and firms stop borrowing money", "Lower interest rates would encourage borrowing."],
    ],
    answer: "A",
    explanation: "Low income → low saving → low investment → low productivity → low income: the cycle of poverty.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a reason why income is unequally distributed **within** a country?",
    options: [
      ["Some people own land and businesses that earn rent and profit", "Correct: wealth produces extra income for its owners."],
      ["All workers in every job are paid the same wage by law", "Equal wages would reduce inequality."],
      ["The government taxes high incomes at higher rates than low ones", "Progressive taxes reduce inequality."],
      ["Everyone has equal access to free secondary education", "Equal access to education reduces inequality."],
    ],
    answer: "A",
    explanation: "Differences in wealth ownership, skills, employment and region create unequal incomes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does better healthcare help a country to develop?",
    options: [
      ["Healthier workers are more productive and absent less often", "Correct: health raises productivity as well as welfare."],
      ["It increases the birth rate, so the labour force shrinks", "More births would enlarge the future labour force; this is not how healthcare helps."],
      ["It reduces government spending on health services", "Better healthcare usually needs more spending."],
      ["It lowers life expectancy and so the dependency ratio falls", "Better healthcare raises life expectancy."],
    ],
    answer: "A",
    explanation: "Healthcare raises life expectancy and welfare directly and improves the productivity of the labour force.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A country has rich mineral deposits but remains poor. Which is the most likely reason?",
    options: [
      ["Mineral earnings go to a few and are not invested in skills or infrastructure", "Correct: resources do not guarantee development."],
      ["The minerals raise productivity in every sector of the economy equally and at once", "Mining usually employs few people."],
      ["Minerals can never be sold on world markets at any price", "Minerals are widely traded."],
      ["Mineral exports always reduce the country's real GDP over time", "Exports add to GDP."],
    ],
    answer: "A",
    hints: ["Who receives the income from the mines, and what is it used for?"],
    explanation: "If earnings are concentrated, lost to corruption or not invested, resource wealth does little for most people.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might rapid population growth slow development?",
    options: [
      ["More income goes on children, leaving less to save and invest", "Correct: a high dependency ratio reduces saving."],
      ["A larger population always reduces the country's total GDP", "Total GDP may rise; GDP per head is the problem."],
      ["A larger population means fewer children need to go to school", "Rapid growth means more children."],
      ["Rapid population growth raises output per worker in agriculture", "More workers on the same land usually lowers output per worker."],
    ],
    answer: "A",
    hints: ["Think about dependants and saving."],
    explanation: "Rapid growth raises the dependency ratio, spreads output over more people and stretches schools and clinics.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which policy would most directly reduce income inequality within a country?",
    options: [
      ["Cash transfers to the poorest households paid for by a progressive income tax", "Correct: it takes a larger share from high incomes and gives to low incomes."],
      ["A rise in value added tax on all goods, including basic foods such as maize meal", "VAT on necessities is regressive and widens inequality."],
      ["A cut in the top rate of income tax", "This benefits high earners most."],
      ["A reduction in spending on free primary schools", "Poorer families lose most from cuts in free services."],
    ],
    answer: "A",
    hints: ["Which option takes more from the rich and gives more to the poor?"],
    explanation: "Progressive taxes combined with transfers redistribute income from richer to poorer households.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In a fictional country, 70% of workers are in agriculture, which produces 25% of output. What does this show?",
    options: [
      ["Output per worker is much lower in agriculture than in other sectors", "Correct: 70% of workers produce only 25% of output."],
      ["Output per worker is higher in agriculture than in other sectors", "The reverse is true."],
      ["Agriculture is the most productive sector of the economy", "It produces much less per worker."],
      ["Workers in agriculture produce 70% of the country's output", "They produce 25% of output."],
    ],
    answer: "A",
    hints: ["Compare each sector's share of output with its share of workers."],
    explanation: "Agriculture's share of output (25%) is far below its share of workers (70%), so its productivity is low; other sectors produce 75% with 30% of workers.",
  });

  // Numericals.
  const top = 48, bottom = 6, ratio = top / bottom;
  check("ratio", ratio, 8);
  b.num({
    d: 2, skill: "APPLICATION", kind: "plain", value: ratio, daily: true,
    stem: `In a fictional country, the richest 20% of households receive ${top}% of total income and the poorest 20% receive ${bottom}%. How many times larger is the income share of the richest 20% than that of the poorest 20%?`,
    wrong: [top - bottom, bottom / top],
    explanation: `${top} ÷ ${bottom} = **${ratio} times**. The difference (${top - bottom} percentage points) is a different measure.`,
  });
  const shares = [3, 7, 11, 19];
  const richest = 100 - shares.reduce((a, b) => a + b, 0);
  check("richest", richest, 60);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: richest, dp: 0, tol: 0,
    stem: `In a fictional country, the four poorest fifths of households receive ${shares[0]}%, ${shares[1]}%, ${shares[2]}% and ${shares[3]}% of total income. What percentage of total income does the richest fifth receive?`,
    wrong: [shares[3]],
    explanation: `The five shares add up to 100%: 100 − (${shares.join(" + ")}) = 100 − ${100 - richest} = **${richest}%**.`,
  });
  const gdp = 7350, workers = 3.5, agShareW = 0.6, agShareY = 0.24;
  const agW = workers * agShareW, agY = gdp * agShareY, agP = (agY / agW) * 1, otP = (gdp - agY) / (workers - agW);
  check("agP", agP, 840); check("otP", otP, 3990);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: agP, calculator: true,
    stem: `A fictional country's GDP is US\\$${fmt(gdp)} million and it has ${fmt(workers, 1)} million workers. Agriculture employs 60% of the workers and produces 24% of GDP. Calculate output per worker in agriculture, in US\\$.`,
    wrong: [gdp / workers, agY / workers],
    hints: ["Find agricultural output and the number of agricultural workers first."],
    explanation: `1. Agricultural output = 24% × ${fmt(gdp)} = US\\$${fmt(agY)} million.\n2. Agricultural workers = 60% × ${fmt(workers, 1)} = ${fmt(agW, 1)} million.\n3. Output per worker = ${fmt(agY)} million ÷ ${fmt(agW, 1)} million = **US\\$${fmt(agP)}**.\n4. ${fmt(gdp / workers)} is output per worker for the whole economy.`,
  });
  const gdp2 = 11700, workers2 = 4.5;
  const agW2 = workers2 * 0.64, agY2 = gdp2 * 0.16, agP2 = agY2 / agW2, otP2 = (gdp2 - agY2) / (workers2 - agW2);
  check("agP2", agP2, 650); check("otP2", otP2, 6066.6666667);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "plain", value: otP2 / agP2, dp: 2, tol: 0.005, calculator: true,
    stem: `Another fictional country has GDP of US\\$${fmt(gdp2)} million and ${fmt(workers2, 1)} million workers. Agriculture employs 64% of the workers and produces 16% of GDP. How many times greater is output per worker in the rest of the economy than in agriculture? Give your answer to two decimal places.`,
    wrong: [agP2 / otP2, 0.84 / 0.16],
    hints: ["The rest of the economy has 36% of workers and 84% of output."],
    explanation: `1. Agriculture: 16% × ${fmt(gdp2)} = US\\$${fmt(agY2)} million produced by 64% × ${fmt(workers2, 1)} = ${fmt(agW2, 2)} million workers, so US\\$${fmt(agP2)} per worker.
2. Rest of economy: ${fmt(gdp2 - agY2)} ÷ ${fmt(workers2 - agW2, 2)} = US\\$${fmt(otP2, 2)} per worker.
3. Ratio = ${fmt(otP2, 2)} ÷ ${fmt(agP2)} = **${fmt(otP2 / agP2, 2)} times**. (Comparing output shares only, 84 ÷ 16, ignores the number of workers.)`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A country with plentiful natural resources is always more developed than a country with few natural resources.",
    answer: false,
    explanation: "False. Development depends on how resources are used: education, investment and governance matter as much.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Living standards in rural areas of a country are often lower than in towns because there are fewer jobs and services.",
    answer: true,
    explanation: "True. Towns usually have more formal jobs, higher wages, and better access to water, electricity, schools and clinics.",
  });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each factor with the way it leads to higher living standards.",
    pairs: [
      ["More secondary-school graduates", "Higher skills raise productivity and wages"],
      ["Higher household saving", "More funds available for investment in capital"],
      ["Slower population growth", "Output is shared among fewer people, raising income per head"],
      ["Shift of workers from subsistence farming to manufacturing", "Workers move to a sector with higher output per worker"],
    ],
    hints: ["Each factor works through productivity, investment or output per person."],
    explanation: "Education raises skills; saving funds investment; slower population growth raises income per head; moving to higher-productivity sectors raises average output.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Low incomes lead to low {{blank:a}}, which leads to low investment and low {{blank:b}}, which keeps incomes low. This is called the cycle of {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["saving"], choices: ["saving", "spending", "taxation"] },
      { id: "b", accepted: ["productivity"], choices: ["productivity", "inflation", "unemployment"] },
      { id: "c", accepted: ["poverty"], choices: ["poverty", "growth", "trade"] },
    ],
    wrong: [["spending", "inflation", "growth"]],
    explanation: "Low income → low saving → low investment → low productivity → low income.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Explain **two** reasons why living standards may differ between people living in the same country.",
    points: [
      "Identifies: differences in education and skills.",
      "Explains: skilled workers earn higher wages than unskilled workers.",
      "Identifies a second reason: wealth ownership / unemployment / urban-rural differences / age or health / informal work.",
      "Explains it, e.g. owners of land and businesses receive rent and profit as well as wages.",
    ],
    modelAnswer: "First, people have different levels of education and skills: an engineer earns much more than an unskilled labourer, because skills are scarce and raise productivity. Second, some people own wealth such as land, property and shares, which brings rent, interest and profit in addition to wages, while others own nothing and depend on low or irregular earnings.",
    hints: ["Think about skills, wealth and where people live."],
    explanation: "Each reason: identify (1) + explain (1).",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how dependence on a few primary exports can lead to lower living standards.",
    points: [
      "Primary sectors (farming, mining) usually have low productivity / employ many low-paid workers or few workers.",
      "World prices of commodities are volatile, so export earnings and incomes rise and fall sharply.",
      "Unstable earnings make planning and investment difficult; government revenue is unstable.",
      "Little value is added at home: processing jobs and profits go abroad, so incomes stay low.",
    ],
    modelAnswer: "Primary sectors such as farming and mining tend to have low productivity or employ few workers, so they generate low incomes for most people. The world prices of commodities rise and fall sharply, so export earnings, wages and tax revenue are unstable, which makes it hard for firms and the government to plan and invest. Because the raw materials are processed abroad, the jobs and profits from adding value go to other countries, so living standards at home stay low.",
    hints: ["Think about productivity, price changes and where value is added."],
    explanation: "One mark per developed point.",
  });

  // Structured 1: comparing two countries.
  const C = {
    E: { gdp: 22800, pop: 12.0, primW: 62, sav: 9, le: 60 },
    F: { gdp: 39600, pop: 11.0, primW: 18, sav: 24, le: 74 },
  };
  const phE = nationalIncome.perHead(C.E.gdp, C.E.pop), phF = nationalIncome.perHead(C.F.gdp, C.F.pop);
  check("phE", phE, 1900); check("phF", phF, 3600);
  const T1 = table(["Indicator", "Country E", "Country F"], [
    ["Real GDP (US\\$ million)", C.E.gdp, C.F.gdp],
    ["Population (million)", fmt(C.E.pop, 1), fmt(C.F.pop, 1)],
    ["Workers in the primary sector (%)", C.E.primW, C.F.primW],
    ["Saving (% of GDP)", C.E.sav, C.F.sav],
    ["Life expectancy (years)", C.E.le, C.F.le],
  ]);
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows data for two fictional countries.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: phE, stem: "Calculate real GDP per head in Country E, in US\\$.", wrong: [C.E.gdp / C.F.pop], explanation: `${fmt(C.E.gdp)} million ÷ ${fmt(C.E.pop, 1)} million = US\\$${fmt(phE)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(phE, phF), stem: "By what percentage is Country F's real GDP per head higher than Country E's? Give your answer to one decimal place.", wrong: [((phF - phE) / phF) * 100], explanation: `F: ${fmt(C.F.gdp)} ÷ ${fmt(C.F.pop, 1)} = US\\$${fmt(phF)}. (${fmt(phF)} − ${fmt(phE)}) ÷ ${fmt(phE)} × 100 = ${pct(pctChange(phE, phF), 1)}.` }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Using the data, explain **two** reasons why Country F has higher living standards than Country E.",
        points: [
          "Identifies: F has a smaller primary sector (18% against 62% of workers).",
          "Explains: more workers in secondary/tertiary sectors with higher productivity and wages.",
          "Identifies: F saves a larger share of GDP (24% against 9%).",
          "Explains: more saving finances investment in capital, raising productivity and income.",
        ],
        modelAnswer: "First, only 18% of F's workers are in the primary sector, against 62% in E, so most of F's workers are in manufacturing and services, where output per worker and wages are higher. Second, F saves 24% of its GDP compared with 9% in E, so more funds are available for investment in machinery and infrastructure, which raises productivity and incomes over time.",
        explanation: "Each reason must use the data: identify (1) + explain (1).",
      }),
      P.manual({
        label: "(d)", marks: 4, levels: LV(4),
        stem: "Discuss whether raising the rate of saving is the most important way for Country E to raise its living standards.",
        points: [
          "For: more saving finances investment in capital and infrastructure, raising productivity (breaking the cycle of poverty).",
          "Against: with low incomes households cannot easily save more; saving may go abroad or into unproductive uses.",
          "Other factors may matter more: education and health (life expectancy 60), moving workers out of low-productivity farming, foreign investment.",
          "Justified conclusion, e.g. saving helps but education, health and diversification are needed for the investment to raise living standards.",
        ],
        modelAnswer: "Higher saving would provide funds for investment in machinery, irrigation and infrastructure, raising productivity and breaking the cycle of low income and low investment. However, with incomes of only about US$1,900 per head, many households must spend nearly all they earn on necessities, so saving cannot rise quickly, and saving only helps if it is invested productively at home. E also needs better health, since life expectancy is only 60, more education, and a shift of workers out of low-productivity farming. Saving is important, but on its own it is not the most important factor: investment in people and the movement of workers into more productive sectors are needed for higher saving to raise living standards.".replace(/US\$/g, "US\\$"),
        explanation: "Weigh saving against other factors; conclude.",
      }),
    ],
    hints: ["Real GDP per head = real GDP ÷ population.", "Look at each row of the table for a reason."],
    explanation: `Real GDP per head: E US\\$${fmt(phE)}, F US\\$${fmt(phF)}.`,
  });

  // Structured 2: income distribution within a country.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country, most of the income from mining and commercial farming goes to a small number of owners, while many rural households depend on small plots of land and informal trading. Unemployment among young people is high, and secondary schools in rural districts are short of teachers.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which feature of this country is a cause of unequal income distribution?",
        options: [
          ["Ownership of mines and farms is concentrated among a few people", "Correct: profits and rents go to a small group."],
          ["The country has a mining sector that earns export revenue", "Having mining is not itself the cause; who owns it matters."],
          ["Rural households grow some of their own food on small plots", "This helps poor households survive."],
          ["Secondary schools exist in rural districts", "The shortage of teachers is the problem, not the schools."],
        ],
        answer: "A",
        explanation: "Concentrated ownership of wealth means profit and rent go to few people.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain how high youth unemployment adds to inequality.",
        points: ["Households with unemployed members have little or no earned income.", "Long spells without work reduce skills and future earnings, so the gap with employed households widens."],
        modelAnswer: "Young people without jobs earn little or nothing, so their households have low incomes. The longer they are unemployed, the more skills and experience they miss, so their future earnings stay low and the gap with households in work widens.",
        explanation: "Two linked points.",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss whether improving rural secondary schools would reduce inequality in this country.",
        points: [
          "For: education raises skills and productivity, so rural young people can get better-paid jobs.",
          "For: reduces the gap between rural and urban opportunities over time; educated parents invest in their children (long-term).",
          "Against: takes many years; jobs must exist for graduates (youth unemployment is already high).",
          "Against: does not change concentrated ownership of mines and farms; other policies (progressive tax, transfers, land access, job creation) may act faster.",
          "Justified conclusion, e.g. important long-term but needs combining with job creation and redistribution.",
        ],
        modelAnswer: "Better rural schools would raise the skills of young people in the countryside, allowing them to get better-paid work and narrowing the gap between rural and urban households; over generations, educated parents also invest more in their children. However, the effect takes many years, and with youth unemployment already high, more qualified school leavers will not earn more unless jobs are created. Better schools also do nothing about the concentration of mining and farming income among a few owners, which progressive taxes, transfers or wider ownership would address more directly. Improving rural schools would reduce inequality in the long run, but only alongside job creation and redistribution.",
        explanation: "Benefits of education versus time lags, job shortages and wealth concentration; conclude.",
      }),
    ],
    hints: ["Think about who receives income now and how that could change."],
    explanation: "Inequality here comes from wealth concentration, unemployment and unequal education.",
  });

  b.card("DEFINITION", "What is the **distribution of income**?", "How a country's total income is shared among its households or people.");
  b.card("CONCEPT", "Give four reasons for unequal income within a country.", "Differences in skills and wages; wealth ownership (rent, profit, interest); unemployment; urban-rural differences; age, health; tax and benefit policies.");
  b.card("CONCEPT", "Name eight factors that cause differences in development between countries.", "Income, productivity, population growth, the size of the sectors, saving and investment, education, healthcare and natural resources.");
  b.card("CONCEPT", "What is the **cycle of poverty**?", "Low income → low saving → low investment → low productivity → low income.");
  b.card("FACT", "Why does a large primary sector often mean lower living standards?", "Primary activities (especially subsistence farming) have low productivity, and commodity prices are unstable.");
  b.card("CONCEPT", "How does rapid population growth affect development?", "Output is shared among more people, the dependency ratio rises, saving falls and schools and clinics are stretched.");
  b.card("CONCEPT", "Do natural resources guarantee development?", "No: if earnings go to a few, are lost to corruption or are not invested, resource-rich countries can stay poor.");
  b.card("CONCEPT", "How can income shares show inequality?", "Compare the share of income received by the richest 20% of households with that of the poorest 20% (for example as a ratio).");
});
