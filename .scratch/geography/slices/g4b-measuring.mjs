// Slice G4b: measuring development (Cambridge 8.1; Cambridge only).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.development.measuring", { file: "development/measuring", keyPrefix: "development.measuring" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **social** indicator of development?",
    options: [
      ["Adult literacy rate", "Correct: it measures access to education."],
      ["GNI per capita", "This is an economic indicator."],
      ["GDP", "This is an economic indicator."],
      ["Energy use per person", "This is usually treated as an economic indicator."],
    ],
    answer: "A",
    explanation: "Social indicators measure health, education and well-being.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which three things are combined in the Human Development Index?",
    options: [
      ["Life expectancy, schooling and income per person", "Correct: health, knowledge and standard of living."],
      ["Birth rate, death rate and migration", "These are population measures."],
      ["GDP, exports and imports", "These are only economic measures."],
      ["Literacy, calorie intake and car ownership", "These are not the HDI's three dimensions."],
    ],
    answer: "A",
    explanation: "HDI = life expectancy + education (years of schooling) + GNI per capita.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does a **high** infant mortality rate suggest about a country?",
    options: [
      ["It has a low level of development", "Correct: poor health care and sanitation cause infant deaths."],
      ["It has a high level of development", "Developed countries have very low infant mortality."],
      ["It has an ageing population", "Ageing is linked to low infant mortality and low birth rates."],
      ["It has a large manufacturing sector", "Infant mortality measures health, not industry."],
    ],
    answer: "A",
    explanation: "Infant mortality is one of the most sensitive indicators of health and development.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is GNI per capita often adjusted for **purchasing power parity (PPP)**?",
    options: [
      ["To allow for differences in the cost of living", "Correct: a dollar buys more in some countries than others."],
      ["To include the value of exports only", "GNI already includes all income."],
      ["To remove the income of foreign companies", "That is the difference between GDP and GNI, not PPP."],
      ["To count only people in formal jobs", "PPP has nothing to do with employment."],
    ],
    answer: "A",
    explanation: "PPP converts incomes into what they can actually buy locally.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main weakness of using an **average** such as GNI per capita?",
    options: [
      ["It hides inequality between rich and poor", "Correct: a few very rich people raise the average."],
      ["It cannot be compared between countries", "It is widely used for comparisons."],
      ["It measures only health", "It measures income."],
      ["It is always higher in LICs", "It is higher in HICs."],
    ],
    answer: "A",
    explanation: "Averages do not show how income is shared.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How does the World Bank currently classify Zimbabwe?",
    options: [
      ["Lower-middle-income country", "Correct: by its GNI per capita."],
      ["High-income country", "Its GNI per capita is far below the high-income threshold."],
      ["Upper-middle-income country", "Its GNI per capita is below this band."],
      ["Newly industrialised country", "This is not a World Bank income group."],
    ],
    answer: "A",
    explanation: "The World Bank uses four income groups; Zimbabwe is in the lower-middle group.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which indicator shows people's well-being beyond money?"],
    stem: "Two fictional countries have the same GNI per capita, but Country A has a life expectancy of 74 years and Country B of 58 years. What does this show?",
    options: [
      ["Income alone does not show quality of life", "Correct: health outcomes differ at the same income."],
      ["Life expectancy depends only on income", "The same income gives different life expectancies here."],
      ["Country B must have a higher HDI", "Lower life expectancy lowers B's HDI."],
      ["GNI data must be wrong for one country", "The data can both be correct."],
    ],
    answer: "A",
    explanation: "This is why composite measures such as the HDI are used.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about subsistence farming and street trading."],
    stem: "Why may GNI per capita **underestimate** the real income of people in many LICs?",
    options: [
      ["Informal work is not counted", "Correct: much activity is outside official records."],
      ["Remittances are counted twice over", "Remittances are not double counted."],
      ["It is adjusted for the cost of living", "PPP adjustment makes it more realistic, not lower."],
      ["Foreign companies' profits are included", "Profits sent abroad are excluded from GNI."],
    ],
    answer: "A",
    explanation: "Much of the economy in LICs is informal or subsistence, so it is missing from official figures.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "HDI values range from 0 to 1, and a higher value means a higher level of human development.",
    answer: true,
    explanation: "True. Countries such as Norway score above 0.95.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Quality of life and standard of living mean exactly the same thing.",
    answer: false,
    explanation: "False. Standard of living is material wealth; quality of life also includes health, safety, freedom and environment.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each indicator with what it measures.",
    pairs: [
      ["Infant mortality rate", "Deaths under 1 year per 1,000 live births"],
      ["Life expectancy", "Average years a newborn is expected to live"],
      ["Calorie intake", "Average food energy per person per day"],
      ["People per doctor", "Access to health care"],
    ],
    explanation: "Each social indicator measures one aspect of well-being.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The total value of goods and services produced within a country in a year is its gross domestic {{blank:a}}. The HDI is published by the United Nations Development {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["product"], choices: ["product", "income", "index", "output"] },
      { id: "b", accepted: ["Programme"], choices: ["Programme", "Bank", "Council", "Fund"] },
    ],
    explanation: "GDP = gross domestic product; the UNDP publishes the HDI.",
  });
  b.calc({
    d: 2, skill: "APPLICATION",
    stem: "A fictional country has a GNI of US\\$27,300 million and a population of 21 million. Calculate its GNI per capita in US\\$.",
    value: 1300, prefix: "US$",
    wrong: [573300, 13000],
    workedSolution: "1. GNI per capita = GNI ÷ population.\n2. 27,300 ÷ 21 = US\\$1,300.",
    explanation: "27,300 million ÷ 21 million = US\\$1,300.",
  });
  b.num({
    d: 3, skill: "APPLICATION",
    hints: ["Population ÷ doctors."],
    stem: "A fictional country of 6,300,000 people has 18,000 doctors. How many people are there per doctor?",
    value: 350,
    wrong: [2857, 3500],
    explanation: "6,300,000 ÷ 18,000 = 350 people per doctor.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** factors that affect a person's quality of life.",
    points: [
      "Health / access to health care and clean water.",
      "Education / employment and income.",
      "Safety and political stability / freedom / environmental quality / housing / family and community.",
    ],
    modelAnswer: "Quality of life depends on good health and access to clinics and safe water, on having education and a job, and on living in a safe, unpolluted environment with freedom.",
    explanation: "Three distinct factors.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    hints: ["What does each indicator miss?"],
    stem: "Explain why the HDI is a more useful measure of development than GNI per capita alone.",
    points: [
      "GNI per capita only measures income / wealth.",
      "The HDI also includes health (life expectancy) and education (schooling).",
      "Countries with similar incomes can differ greatly in health and education, so HDI gives a fuller picture.",
      "But HDI still uses averages / misses inequality, freedom or environment (limitation noted).",
    ],
    modelAnswer: "GNI per capita measures only average income. The HDI adds life expectancy and years of schooling, so it shows whether income is turned into better lives; countries with similar incomes can have very different HDIs. However, the HDI is still an average and ignores inequality and freedom.",
    explanation: "Compare what each measures and note a limitation.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Discuss economic and social indicators, then judge."],
    stem: "'No single indicator can measure development.' Evaluate this statement.",
    points: [
      "Economic indicators (GDP/GNI per capita) are easy to compare but measure only income.",
      "Averages hide inequality between rich and poor, regions, rural and urban.",
      "GNI misses the informal economy / subsistence; exchange rates distort without PPP.",
      "Social indicators (life expectancy, infant mortality, literacy) show health and education outcomes.",
      "Exceptions: some high-income countries have weaker social indicators, and some poorer ones have good health.",
      "Composite indices (HDI) combine measures but still miss freedom, happiness, environment.",
      "Judgement: agree - use a range of economic and social indicators / HDI plus others.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "GNI per capita is the most widely used indicator because it is easy to compare, but it measures only average income. It hides inequality, so a country with a few very rich people can look developed while most people are poor, and it misses the informal economy and subsistence farming that are important in LICs. Social indicators such as life expectancy, infant mortality and literacy show whether people are healthy and educated, and they sometimes tell a different story: some oil-rich countries have high incomes but weaker education, while some poorer countries have long life expectancy. The HDI combines income, health and education, so it is more useful than any single indicator, but it is still an average and leaves out freedom, safety and the environment. The statement is therefore correct: development is many-sided, so a range of economic and social indicators should be used together.",
    explanation: "Weigh several indicators and conclude.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: "Table 1 shows development indicators for three fictional countries (fictional data).\n\n| Indicator | Country R | Country S | Country T |\n|---|---|---|---|\n| GNI per capita (US\\$, PPP) | 2,100 | 15,800 | 54,000 |\n| Life expectancy (years) | 61 | 76 | 82 |\n| Infant mortality (per 1,000) | 48 | 12 | 3 |\n| Adult literacy (%) | 66 | 94 | 99 |",
    hints: ["Higher GNI and life expectancy, lower infant mortality."],
    parts: [
      P.num({ label: "(a)", stem: "How many times greater is Country T's GNI per capita than Country R's? Give your answer to one decimal place.", value: 54000 / 2100, answer: "25.7", tol: 0.05, wrong: [51900, 2.6], explanation: "54,000 ÷ 2,100 = 25.7." }),
      P.num({ label: "(b)", unit: "years", stem: "Calculate the difference in life expectancy between Country T and Country R.", value: 21, wrong: [143, 6], explanation: "82 − 61 = 21 years." }),
      P.mcq({
        label: "(c)", stem: "Which country is most likely to be a LIC or lower-MIC?",
        options: [
          ["Country R", "Correct: lowest income, shortest lives, highest infant mortality."],
          ["Country S", "S has middle values on every indicator."],
          ["Country T", "T has the highest values on every indicator."],
          ["All three equally", "The indicators differ greatly."],
        ],
        answer: "A", explanation: "All four indicators place R lowest.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Describe the relationship between GNI per capita and infant mortality shown in Table 1, and suggest a reason for it.",
        points: ["As GNI per capita rises, infant mortality falls (negative relationship).", "Uses data, e.g. R US\\$2,100 and 48 per 1,000; T US\\$54,000 and 3 per 1,000.", "Reason: richer countries afford clinics, vaccinations, safe water, better diets."],
        modelAnswer: "Infant mortality falls as income rises: R (US\\$2,100) has 48 per 1,000 but T (US\\$54,000) only 3. Richer countries can afford clinics, vaccinations and safe water.",
        explanation: "Describe with data and explain.",
      }),
      P.manual({
        label: "(e)", marks: 2, stem: "Suggest **two** limitations of using the data in Table 1 to compare the countries.",
        points: ["They are national averages that hide inequality / regional differences.", "Informal economy not counted / data may be unreliable or out of date / miss freedom and environment."],
        modelAnswer: "The figures are averages that hide gaps between rich and poor, and income figures miss informal work.",
        explanation: "Two distinct limitations.",
      }),
    ],
    explanation: "This item practises comparing countries with indicators.",
  });
  b.struct({
    d: 2, skill: "APPLICATION", secs: 420,
    stem: "Resource: a Form 4 class surveyed two fictional households. Household 1 (city) earns US\\$900 a month and owns a car, but lives on a noisy, polluted main road and fears crime. Household 2 (rural) earns US\\$150 a month, grows its own food, lives in a quiet village with clean air and has strong support from neighbours.",
    hints: ["Separate money from well-being."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which household has the higher **standard of living**?",
        options: [
          ["Household 1", "Correct: it has higher income and more possessions."],
          ["Household 2", "It has lower income and fewer possessions."],
          ["Both the same", "Their incomes are very different."],
          ["It cannot be judged from income", "Standard of living is mainly material wealth."],
        ],
        answer: "A", explanation: "Standard of living measures material wealth.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Explain why Household 2 might have as good a **quality of life** as Household 1.",
        points: ["Clean air / quiet environment (no noise or pollution).", "Safety / less fear of crime.", "Strong community support / food security from own crops."],
        modelAnswer: "Household 2 has clean air and quiet surroundings, feels safe, and has food from its own fields and support from neighbours, which improve well-being even with a lower income.",
        explanation: "Quality of life includes non-material factors.",
      }),
    ],
    explanation: "This item practises distinguishing standard of living and quality of life.",
  });

  b.card("DEFINITION", "Development", "Progress in economic growth, health, education, technology and people's well-being and freedom.");
  b.card("DEFINITION", "GNI per capita", "Total income of a country's people and businesses (including from abroad) divided by population; often PPP-adjusted.");
  b.card("DEFINITION", "Human Development Index", "UNDP index from 0 to 1 combining life expectancy, years of schooling and GNI per capita (PPP).");
  b.card("DEFINITION", "Infant mortality rate", "Deaths of babies under 1 year old per 1,000 live births.");
  b.card("VOCABULARY", "Purchasing power parity (PPP)", "An adjustment that allows for differences in the cost of living between countries.");
  b.card("CONCEPT", "Limitations of indicators", "Averages hide inequality; informal economy missed; unreliable data; exchange rates; miss freedom and environment.");
  b.card("CONCEPT", "Standard of living vs quality of life", "Standard of living: material wealth. Quality of life: overall well-being incl. health, safety, freedom, environment.");
  b.card("FACT", "World Bank income groups", "Low, lower-middle, upper-middle and high income, by GNI per capita; thresholds updated yearly. Zimbabwe: lower-middle.");
  b.card("VOCABULARY", "LIC, MIC, HIC", "Low-income, middle-income and high-income countries.");
});
