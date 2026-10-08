// W4a: econ.development.meaning-indicators — development versus growth, signs and causes of development, real GDP
// per head and the HDI with their advantages and disadvantages. Figures differ from the lesson's worked examples.
import { concept, P, table, nationalIncome, pctChange, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.development.meaning-indicators", { file: "development/meaning-indicators", keyPrefix: "development.meaning-indicators" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes **economic development**?",
    options: [
      ["A lasting improvement in people's welfare, health and education", "Correct: development is broader than output."],
      ["An increase in a country's real GDP from one year to the next", "That is economic growth."],
      ["An increase in the number of firms operating in a country", "More firms may or may not improve welfare."],
      ["An increase in the total value of a country's exports over time", "Exports are one part of output only."],
    ],
    answer: "A",
    explanation: "Development is a broad improvement in economic and social welfare; growth is an increase in real output.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three dimensions are combined in the Human Development Index (HDI)?",
    options: [
      ["Health, education and income per head", "Correct: life expectancy, years of schooling and GNI per head."],
      ["Income per head, inflation and unemployment", "Inflation and unemployment are not in the HDI."],
      ["Literacy, access to safe water and housing", "These are signs of development but not HDI components."],
      ["Population growth, exports and investment", "None of these is an HDI dimension."],
    ],
    answer: "A",
    explanation: "The HDI combines a long and healthy life, knowledge and a decent standard of living.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change is a **sign of development** rather than only of growth?",
    options: [
      ["A fall in the infant mortality rate", "Correct: fewer infant deaths show better health and welfare."],
      ["A rise in the output of a foreign-owned mine", "Output can rise without people's welfare improving."],
      ["A rise in nominal GDP", "Nominal GDP may rise only because of inflation."],
      ["A rise in the number of cars imported by the richest households", "This benefits a small group only."],
    ],
    answer: "A",
    explanation: "Lower death rates, higher literacy and better infrastructure are signs of development.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is real GDP per head a better indicator of living standards than real GDP?",
    options: [
      ["It takes account of the size of the population", "Correct: it shows average output per person."],
      ["It takes account of how income is distributed", "Real GDP per head is an average; it ignores distribution."],
      ["It includes health and education", "Those are in the HDI, not GDP per head."],
      ["It removes the effect of inflation", "Real GDP is already adjusted for inflation."],
    ],
    answer: "A",
    explanation: "Dividing by population shows output per person, which is closer to what an average person can consume.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Country M has a high real GDP per head but a low HDI. What is the most likely explanation?",
    options: [
      ["Its income is unequally shared and little is spent on health and education", "Correct: income is high on average, but health and schooling are poor."],
      ["Its population is very large compared with its output", "That would give a low GDP per head."],
      ["Its people live long lives and spend many years in school", "That would give a high HDI."],
      ["Its prices have been rising rapidly", "Real GDP per head is adjusted for inflation."],
    ],
    answer: "A",
    hints: ["Which HDI dimensions are not income?"],
    explanation: "If income is high but the HDI is low, the health and education dimensions must be weak, often because income is concentrated or not spent on services.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why may real GDP per head **understate** living standards in a country with a large informal sector?",
    options: [
      ["Much informal and subsistence output is not recorded in GDP", "Correct: unrecorded output lowers measured GDP."],
      ["Informal workers pay more tax than formal workers", "Informal workers usually pay little direct tax."],
      ["The informal sector is counted twice in GDP", "It is under-counted, not double counted."],
      ["Informal output is valued at higher prices than formal output", "It is mostly missed, not over-valued."],
    ],
    answer: "A",
    hints: ["What happens to output that nobody records?"],
    explanation: "Vendors' sales, home-grown food and other unrecorded activity are missing from GDP, so measured income is lower than true income.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is a weakness of the HDI as a measure of development?",
    options: [
      ["It does not show how income is distributed within a country", "Correct: it uses national averages."],
      ["It measures only income and ignores health", "It includes life expectancy."],
      ["It cannot be used to compare countries", "It is designed for international comparison."],
      ["It is measured in a different currency for each country", "It is an index between 0 and 1."],
    ],
    answer: "A",
    hints: ["The HDI uses averages."],
    explanation: "The HDI is built from averages, so it hides inequality, and it leaves out freedom, the environment and the quality of education.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Two countries have the same real GDP per head. Country S has a much higher HDI than Country T. Which conclusion is best supported?",
    options: [
      ["People in S probably have better health and education", "Correct: with income equal, the HDI difference comes from health and education."],
      ["S must have a larger total GDP and population than T", "Equal GDP per head says nothing about total GDP."],
      ["T's income must be more equally distributed than S's", "The HDI does not measure distribution."],
      ["S must have grown faster than T over the last year", "The HDI is a level, not a growth rate."],
    ],
    answer: "A",
    hints: ["If income is the same, which dimensions differ?"],
    explanation: "The income dimension is the same, so S scores higher on life expectancy and/or schooling.",
  });

  // Numericals.
  const g1 = 16800, p1 = 4.8, ph1 = nationalIncome.perHead(g1, p1);
  check("ph1", ph1, 3500);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: ph1, daily: true,
    stem: `A fictional country has a real GDP of US\\$${fmt(g1)} million and a population of ${fmt(p1, 1)} million. Calculate its real GDP per head, in US\\$.`,
    wrong: [p1 / g1, g1 * p1],
    explanation: `Real GDP per head = real GDP ÷ population = ${fmt(g1)} million ÷ ${fmt(p1, 1)} million = **US\\$${fmt(ph1)}**.`,
  });
  const h0 = 2650, h1 = 2915, phG = pctChange(h0, h1);
  check("phG", phG, 10);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: phG, calculator: true,
    stem: `Real GDP per head in a fictional country rose from US\\$${fmt(h0)} to US\\$${fmt(h1)} over five years. Calculate the percentage increase. Give your answer to one decimal place.`,
    wrong: [((h1 - h0) / h1) * 100],
    explanation: `(${fmt(h1)} − ${fmt(h0)}) ÷ ${fmt(h0)} × 100 = ${h1 - h0} ÷ ${fmt(h0)} × 100 = **${pct(phG, 1)}**.`,
  });
  // Population needed for a given GDP per head.
  const gA = 44100, phTarget = 2100, popA = gA / phTarget;
  check("popA", popA, 21);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "plain", value: popA, dp: 1, tol: 0.05,
    stem: `A fictional country's real GDP is US\\$${fmt(gA)} million and its real GDP per head is US\\$${fmt(phTarget)}. Calculate its population, in millions, to one decimal place.`,
    wrong: [gA * phTarget, phTarget / gA],
    hints: ["Rearrange: GDP per head = GDP ÷ population."],
    explanation: `1. Population = real GDP ÷ real GDP per head.\n2. = ${fmt(gA)} million ÷ ${fmt(phTarget)} = **${fmt(popA, 1)} million** people.`,
  });
  const yG = 6, pG = 2.5, approx = yG - pG;
  const exact = ((1 + yG / 100) / (1 + pG / 100) - 1) * 100;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "pct", value: exact, calculator: true,
    stem: `In a fictional country, real GDP grows by ${yG}% in a year and the population grows by ${fmt(pG, 1)}%. Calculate the percentage change in real GDP per head. Give your answer to one decimal place.`,
    wrong: [yG + pG, yG],
    hints: ["Suppose real GDP was 100 and the population was 100 at the start.", "Real GDP per head = real GDP ÷ population."],
    explanation: `1. Take real GDP = 100 and population = 100 at the start, so GDP per head = 1.\n2. After a year: real GDP = 106, population = 102.5, so GDP per head = 106 ÷ 102.5 = ${fmt(1 + exact / 100, 4)}.\n3. Change = (${fmt(1 + exact / 100, 4)} − 1) × 100 = **${pct(exact, 1)}**. (A quick estimate is ${yG} − ${fmt(pG, 1)} = ${fmt(approx, 1)}%; adding the two rates is wrong.)`,
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Economic growth always leads to economic development.",
    answer: false,
    explanation: "False. Growth may benefit only a few people, or the extra income may not be spent on health, education and services.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The HDI is a number between 0 and 1, and a higher value shows a higher level of human development.",
    answer: true,
    explanation: "True. The HDI combines health, education and income into an index between 0 and 1.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each HDI dimension with the indicator used to measure it.",
    pairs: [
      ["A long and healthy life", "Life expectancy at birth"],
      ["Knowledge", "Mean and expected years of schooling"],
      ["A decent standard of living", "Gross national income per head (adjusted for purchasing power)"],
    ],
    extraRight: ["Adult unemployment rate"],
    explanation: "Health = life expectancy; education = years of schooling; living standard = GNI per head at purchasing power parity.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "Economic growth is a {{blank:a}} change, measured by the rise in real GDP. Economic development is a broader, {{blank:b}} improvement in people's welfare.",
    blanks: [
      { id: "a", accepted: ["quantitative"], choices: ["quantitative", "qualitative"] },
      { id: "b", accepted: ["qualitative"], choices: ["qualitative", "quantitative"] },
    ],
    wrong: [["qualitative", "quantitative"]],
    explanation: "Growth is about how much is produced; development is about how well people live.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of using real GDP per head to compare living standards between countries.",
    points: [
      "Identifies: it is an average and ignores the distribution of income.",
      "Explains: a few very rich people can raise the average while most people remain poor.",
      "Identifies another: ignores informal/subsistence output / quality of life / exchange-rate and cost-of-living differences.",
      "Explains it, e.g. countries with large informal sectors appear poorer than they are.",
    ],
    modelAnswer: "First, real GDP per head is an average, so it does not show how income is shared: a country where a small group earns most of the income can have a high figure while most people are poor. Second, it ignores output that is not recorded, such as subsistence farming and informal trading, so a country with a large informal sector looks poorer than it really is.",
    hints: ["Think about what an average hides and what GDP leaves out."],
    explanation: "Each disadvantage: identify (1) + explain (1). Ignoring health, leisure, pollution, or exchange-rate problems are also creditworthy.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 3,
    stem: "Explain how investment in education can cause economic development.",
    points: [
      "Education raises literacy and skills (human capital).",
      "Skilled workers are more productive and earn higher incomes; they find better jobs.",
      "Educated people make better choices about health and family size / can take part in society: welfare improves beyond income.",
    ],
    modelAnswer: "Education raises literacy and skills, so workers become more productive and can earn higher incomes in better jobs. Educated people also tend to make better decisions about health, nutrition and family size and can take a fuller part in society, so their quality of life improves as well as their income.",
    hints: ["Think about income and about quality of life."],
    explanation: "One mark per point in the chain.",
  });

  // Structured 1: data comparison of three countries.
  const C = [
    { n: "Country J", gdp: 13950, pop: 3.1, le: 62, sch: 6.8 },
    { n: "Country K", gdp: 19800, pop: 9.0, le: 69, sch: 8.7 },
    { n: "Country L", gdp: 52800, pop: 16.0, le: 66, sch: 7.2 },
  ];
  const ph = C.map((c) => c.gdp / c.pop);
  check("phJ", ph[0], 4500); check("phK", ph[1], 2200); check("phL", ph[2], 3300);
  const T1 = table(["Country", "Real GDP (US\\$ million)", "Population (million)", "Life expectancy (years)", "Mean years of schooling"], C.map((c) => [c.n, c.gdp, fmt(c.pop, 1), c.le, fmt(c.sch, 1)]));
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows data for three fictional countries.\n\n${T1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: ph[2], stem: "Calculate real GDP per head in Country L, in US\\$.", wrong: [C[2].pop / C[2].gdp], explanation: `${fmt(C[2].gdp)} million ÷ ${fmt(C[2].pop, 1)} million = US\\$${fmt(ph[2])}.` }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which country has the **highest** real GDP per head?",
        options: [
          ["Country J", `Correct: US\\$${fmt(ph[0])}.`],
          ["Country K", `US\\$${fmt(ph[1])}.`],
          ["Country L", `US\\$${fmt(ph[2])}: it has the largest total GDP but a large population.`],
          ["All three are equal", "The figures differ."],
        ],
        answer: "A",
        explanation: `J US\\$${fmt(ph[0])}, L US\\$${fmt(ph[2])}, K US\\$${fmt(ph[1])}.`,
      }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Which country is likely to rank **highest** on the health and education dimensions of the HDI?",
        options: [
          ["Country K", "Correct: it has the highest life expectancy (69) and the most schooling (8.7 years)."],
          ["Country J", "It has the lowest life expectancy and least schooling."],
          ["Country L", "Its life expectancy and schooling are below K's."],
          ["It cannot be judged from the table", "Life expectancy and schooling are both given."],
        ],
        answer: "A",
        explanation: "Health and education are measured by life expectancy and years of schooling, where K leads.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Explain why Country J's high real GDP per head may not mean a high standard of living for most of its people.",
        points: [
          "Real GDP per head is an average; income may be concentrated among a few.",
          "Its life expectancy and schooling are the lowest of the three, suggesting poor health and education services.",
          "It ignores other aspects of welfare, e.g. pollution, working hours, access to water.",
        ],
        modelAnswer: "Real GDP per head is only an average, so a small group may receive most of Country J's income. J also has the lowest life expectancy and the fewest years of schooling of the three, which suggests that many people lack good health care and education. GDP per head also ignores things such as pollution and access to safe water.",
        explanation: "One mark per point.",
      }),
      P.manual({
        label: "(e)", marks: 5, levels: LV(5),
        stem: "Discuss whether Country K is more developed than Country J.",
        points: [
          "K: higher life expectancy and more schooling, so better health and education, which are central to development.",
          `J: real GDP per head (US\\$${fmt(ph[0])}) is much higher than K's (US\\$${fmt(ph[1])}), so more income per person is available.`,
          "The HDI combines both: K's lead in health and education may outweigh J's income lead.",
          "Missing information: income distribution, poverty, access to water and housing, freedom; data may be estimates.",
          "Justified conclusion: K is probably more developed in human terms, though J has more resources.",
        ],
        modelAnswer: `Country K's people live seven years longer than J's and have almost two more years of schooling, so they enjoy better health and education, which are central to development. On the other hand, J's real GDP per head of US\\$${fmt(ph[0])} is well above K's US\\$${fmt(ph[1])}, so J has more income per person that could be used to raise welfare. We do not know how income is shared, how many people are poor or whether households have safe water and decent housing. On the evidence given, K appears more developed in human terms, because development is about how people live, not only income, but J has the resources to catch up if it spends them on health and education.`,
        explanation: "Weigh income against health and education, note missing data, conclude.",
      }),
    ],
    hints: ["Real GDP per head = real GDP ÷ population.", "Development includes health and education as well as income."],
    explanation: `Real GDP per head: J US\\$${fmt(ph[0])}, K US\\$${fmt(ph[1])}, L US\\$${fmt(ph[2])}. K has the best health and education indicators.`,
  });

  // Structured 2: which indicator.
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A government department wants to decide which districts should receive extra money for development. One official suggests ranking districts by average income per head. Another suggests using an index that combines income, life expectancy and years of schooling, like the HDI.",
    parts: [
      P.tf({
        label: "(a)", marks: 1,
        stem: "An index like the HDI includes a measure of health as well as income.",
        answer: true,
        explanation: "True: life expectancy measures the health dimension.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Explain **one** advantage of using average income per head to rank the districts.",
        points: ["Identifies: simple / data easily available / easy to compare.", "Explains: the department can rank all districts quickly and cheaply and see which have least income to spend."],
        modelAnswer: "Income per head is simple to calculate from existing data, so the department can rank all districts quickly and cheaply and see where households have least money to spend.",
        explanation: "Identify (1) + explain (1).",
      }),
      P.manual({
        label: "(c)", marks: 5, levels: LV(5),
        stem: "Discuss which method the department should use.",
        points: [
          "Income per head: simple and available, but an average that ignores distribution and informal output.",
          "Income per head misses health and education, which is where development money is often most needed.",
          "Index: broader, shows districts with poor health or schooling even if income is moderate.",
          "Index: more data needed (costly, may be out of date); still ignores distribution, water, housing; years of schooling ignore quality.",
          "Justified conclusion, e.g. use the index, supported by data on poverty and access to services.",
        ],
        modelAnswer: "Average income per head is simple and uses data that are easy to obtain, but it is an average that hides poverty within a district, misses informal and subsistence income, and ignores health and education. An HDI-style index is broader: a district with a moderate income but a short life expectancy and little schooling would be identified as needing help. However, the index needs more data, which may be costly or out of date, it still ignores how income is shared and access to water and housing, and years of schooling say nothing about the quality of teaching. The department should use the index, because development money aims to improve health and education as well as income, but it should add data on poverty and access to basic services.",
        explanation: "Compare the two methods' strengths and weaknesses; conclude.",
      }),
    ],
    hints: ["What does each method leave out?"],
    explanation: "Income per head is simple but narrow; a composite index is broader but needs more data and still leaves things out.",
  });

  b.card("DEFINITION", "Define **economic development**.", "A sustained improvement in people's economic and social welfare: higher real incomes plus better health, education, services and choice.");
  b.card("CONCEPT", "How does economic development differ from economic growth?", "Growth is an increase in real output (quantitative); development is a broad improvement in welfare (qualitative). Growth can happen without development.");
  b.card("CONCEPT", "Give four signs of development.", "Higher literacy; lower death rates and longer life expectancy; better infrastructure (water, power, roads); better housing; less poverty.");
  b.card("FORMULA", "Real GDP per head = ?", "Real GDP ÷ population.");
  b.card("DEFINITION", "What is the **Human Development Index**?", "A UNDP index from 0 to 1 combining life expectancy, years of schooling and GNI per head (at purchasing power parity).");
  b.card("CONCEPT", "Two advantages of real GDP per head as an indicator.", "Data widely available and comparable; adjusted for inflation and population size.");
  b.card("CONCEPT", "Three disadvantages of real GDP per head.", "An average that ignores distribution; misses informal and subsistence output; ignores health, education, leisure and pollution.");
  b.card("CONCEPT", "One advantage and two disadvantages of the HDI.", "Broader than income (includes health and education); but ignores distribution, freedom and the environment, and years of schooling ignore quality.");
  b.card("CONCEPT", "Give four causes of development.", "Economic growth; investment in education and health; infrastructure; good governance; technology and diversification.");
});
