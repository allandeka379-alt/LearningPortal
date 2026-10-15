// W4b: population (both boards; ZIMSEC Form 5, Cambridge A Level only).
import { concept, P, chk, table, population, dependencyRatio, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.dev.population", { file: "dev/population", keyPrefix: "dev.population" }, (b) => {
  mc(b, [2, "RECALL"], "The birth rate is the number of",
    ["live births per 1,000 of the population in a year", "Correct: the standard definition."],
    [["live births per 1,000 women of any age in a given year", "That is closer to a fertility measure."],
     ["children born per woman in her lifetime", "That is the total fertility rate."],
     ["deaths of infants per 1,000 live births", "That is the infant mortality rate."]],
    "The crude birth rate is births per 1,000 of the total population.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is most likely to reduce the death rate in a developing country?",
    ["Improved access to clean water and vaccination", "Correct: fewer deaths from infectious disease."],
    [["A rise in the number of births", "Births do not reduce deaths."],
     ["A rise in the average age of the whole population", "An older population tends to have a higher death rate."],
     ["A fall in government spending on health", "That would tend to raise the death rate."]],
    "Better health care and sanitation reduce deaths.", { daily: true });

  mc(b, [3, "APPLICATION"], "In a year a country has a birth rate of 28 per 1,000 and a death rate of 9 per 1,000, with no migration. The population grows by",
    ["1.9%", "Correct: natural increase is 19 per 1,000."],
    [["19%", "That ignores the conversion from per 1,000 to a percentage."],
     ["3.1%", "That adds the rates."],
     ["0.19%", "That divides by 100 twice."]],
    "28 − 9 = 19 per 1,000 = 1.9%.", { hints: ["Natural increase per 1,000 ÷ 10 gives a percentage."] });

  mc(b, [2, "UNDERSTANDING"], "A country has high emigration of skilled workers. The most likely effect is",
    ["fewer skilled workers, partly offset by remittances", "Correct: loss of skills, some money sent home."],
    [["a higher birth rate in the following years", "Emigration does not directly raise births."],
     ["a lower dependency ratio in every case", "It may raise the ratio."],
     ["a fall in the death rate among those who remain", "Emigration is unrelated to the death rate."]],
    "Emigration removes workers (a 'brain drain'); remittances give some benefit.", { daily: true });

  mc(b, [3, "APPLICATION"], "Which population has the highest dependency ratio (dependants per 100 of working age)?",
    ["Aged 0-14: 40, aged 15-64: 50, aged 65 and over: 10", "Correct: 50 ÷ 50 × 100 = 100."],
    [["Aged 0-14: 30, aged 15-64: 60, aged 65 and over: 10", "40 ÷ 60 = 66.7."],
     ["Aged 0-14: 20, aged 15-64: 65, aged 65 and over: 15", "35 ÷ 65 = 53.8."],
     ["Aged 0-14: 25, aged 15-64: 60, aged 65 and over: 15", "40 ÷ 60 = 66.7."]],
    "Dependency ratio = (young + old) ÷ working age × 100.", { hints: ["Add the young and the old, then divide by the working-age group."] });

  mc(b, [3, "UNDERSTANDING"], "The optimum population of a country is the size at which",
    ["output per head is highest", "Correct: the standard definition."],
    [["total output is highest", "Total output can still rise while output per head falls."],
     ["the birth rate equals the death rate", "That is a stationary population."],
     ["unemployment is zero", "Optimum refers to output per head."]],
    "Optimum population maximises output per head, given resources and technology.", { hints: ["Is it total output or average output?"] });

  mc(b, [2, "UNDERSTANDING"], "Which is a pull factor in rural-urban migration?",
    ["The expectation of better-paid jobs in towns", "Correct: it attracts people to cities."],
    [["Shortage of farmland in the countryside", "That is a push factor."],
     ["A drought that destroys crops", "That is a push factor."],
     ["Low prices for farm products", "That is a push factor."]],
    "Pull factors attract people to the destination.");

  mc(b, [3, "ANALYSIS"], "A fall in the infant mortality rate is likely to",
    ["raise life expectancy and in time reduce the birth rate", "Correct: the usual demographic transition pattern."],
    [["raise the birth rate immediately and permanently", "Birth rates usually fall later."],
     ["raise the dependency ratio by reducing the working population", "More children survive to become workers."],
     ["have no effect on population growth or structure", "It affects natural increase."]],
    "Lower infant mortality raises survival, and later reduces the desired number of births.", { hints: ["Think about what parents expect when children are more likely to survive."] });

  {
    const br = population.ratePerThousand(175000, 5_000_000); chk(br, 35);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: br, unit: "per 1,000", dp: 0, tol: 0.5, daily: true,
      stem: "A country has a population of 5,000,000 and 175,000 live births in a year. Calculate the birth rate per 1,000 of the population.",
      wrong: [3.5, 350, 28.6], explanation: "175,000 ÷ 5,000,000 × 1,000 = 35 per 1,000." });
    const nm = 12000 - 30000; chk(nm, -18000);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: nm, unit: "people", dp: 0, tol: 0.5,
      stem: "In a year 12,000 people immigrate to a country and 30,000 emigrate. Calculate net migration (a net outflow is negative).",
      wrong: [18000, 42000, -42000], explanation: "12,000 − 30,000 = −18,000." });
    const dr = dependencyRatio(2.1 + 0.3, 3.6); chk(roundTo(dr, 1), 66.7);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: dr, dp: 1, hints: ["Dependants = under 15 plus 65 and over."],
      stem: "A country has 2.1 million people aged under 15, 3.6 million aged 15 to 64 and 0.3 million aged 65 and over. Calculate the dependency ratio, to one decimal place.",
      wrong: [58.3, 83.3, 66.0], explanation: "(2.1 + 0.3) ÷ 3.6 × 100 = 66.7." });
    const ch = (210000 - 78000 - 24000) / 6_000_000 * 100; chk(roundTo(ch, 6), 1.8);
    b.calc({ d: 3, skill: "APPLICATION", kind: "pct", value: roundTo(ch, 6), unit: "%", hints: ["Population change = births − deaths + net migration."],
      stem: "A country has a population of 6,000,000. In a year there are 210,000 births and 78,000 deaths, and net migration is −24,000. Calculate the percentage change in the population, to one decimal place.",
      wrong: [2.2, 2.2 - 0.4 + 1.8, 0.4],
      explanation: "1. Natural increase = 210,000 − 78,000 = 132,000.\n2. Add net migration: 132,000 − 24,000 = 108,000.\n3. Percentage change = 108,000 ÷ 6,000,000 × 100 = 1.8%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true, stem: "A country can have a positive natural increase and yet a falling population if net emigration is large enough.",
    explanation: "Population change = natural increase + net migration; large net emigration can outweigh natural increase." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Infant mortality rate", "Deaths of children under one year per 1,000 live births"], ["Dependency ratio", "Dependants per 100 people of working age"], ["Natural increase", "Birth rate minus death rate"], ["Net migration", "Immigrants minus emigrants"]],
    explanation: "Standard demographic definitions." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "Population change equals natural increase plus net {{blank:a}}. A population in which output per head is highest is at its {{blank:b}} size.",
    blanks: [{ id: "a", accepted: ["migration"], choices: ["migration", "mortality", "fertility"] }, { id: "b", accepted: ["optimum"], choices: ["optimum", "maximum", "minimum"] }],
    explanation: "Change = natural increase + net migration; optimum = highest output per head." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the movement of people from the countryside to towns and cities?",
    accepted: ["urbanisation", "rural-urban migration", "rural urban migration", "urbanization", "rural to urban migration"], wrong: ["emigration"],
    explanation: "Urbanisation (rural-urban migration)." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define the dependency ratio.",
    points: ["The number of dependants (people under 15 and over 64)", "per 100 people of working age (15 to 64)"],
    modelAnswer: "The dependency ratio is the number of dependants, people under 15 and over 64, per 100 people of working age, 15 to 64.",
    explanation: "Dependants relative to the working-age group." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think of health care, income and education."],
    stem: "Explain two reasons why the birth rate often falls as a country develops.",
    points: ["Higher incomes and education, especially for women, raise the opportunity cost of having children.", "So women have fewer children and have them later.", "Lower infant mortality means parents expect children to survive.", "Access to family planning and urbanisation (children are costlier and less useful as farm labour) reduce family size."],
    modelAnswer: "As incomes and education, especially for women, rise, the opportunity cost of having children increases, so women have fewer children and have them later. Lower infant mortality also means that parents expect their children to survive, so they need fewer births, and access to family planning reduces family size.",
    explanation: "Two reasons explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Think of consumers, workers and public services."],
    stem: "Analyse the economic effects of a rapidly growing and young population on a developing economy.",
    points: ["A growing population provides a bigger labour force and market in the future.", "A high proportion of children means a high dependency ratio.", "Households and government must spend a large share of income on food, education and health.", "This reduces saving and investment and may strain schools and clinics.", "If jobs are not created, unemployment and poverty rise."],
    modelAnswer: "A growing population provides a bigger labour force and market in the future. However, a high proportion of children means a high dependency ratio, so households and government must spend a large share of income on food, education and health, which reduces saving and investment and strains schools and clinics. If jobs are not created for the growing labour force, unemployment and poverty will rise.",
    explanation: "Benefits and strains." });

  {
    const pop = 12_000_000, births = 360_000, deaths = 144_000, imm = 20_000, emi = 8_000;
    const br = population.ratePerThousand(births, pop), dr = population.ratePerThousand(deaths, pop);
    chk(br, 30); chk(dr, 12);
    const ch = ((births - deaths) + (imm - emi)) / pop * 100; chk(roundTo(ch, 6), 1.9);
    const t1 = table(["Item (one year)", "Number"], [["Population", pop], ["Births", births], ["Deaths", deaths], ["Immigrants", imm], ["Emigrants", emi]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Rates per 1,000 = number ÷ population × 1,000.", "Population change = births − deaths + immigrants − emigrants."],
      stem: "**Population of Tamba (fictional, illustrative)**\n\n" + t1 + "\n\nTamba's government is concerned about the pressure on primary schools.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: br, unit: "per 1,000", dp: 0, tol: 0.5, stem: "Calculate the birth rate per 1,000.", wrong: [3, 360, 33], explanation: "360,000 ÷ 12,000,000 × 1,000 = 30." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: br - dr, unit: "per 1,000", dp: 0, tol: 0.5, stem: "Calculate the natural increase per 1,000.", wrong: [12, 42, 1.8], explanation: "Birth rate 30 − death rate 12 = 18 per 1,000." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: roundTo(ch, 6), unit: "%", stem: "Calculate the percentage change in the population during the year, to one decimal place.", wrong: [1.8, 2.0, 18], explanation: "Natural increase 216,000 + net migration 12,000 = 228,000; 228,000 ÷ 12,000,000 × 100 = 1.9%." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain two effects of a high birth rate on the economy of Tamba.",
          points: ["A large number of children raises the dependency ratio.", "So government must spend more on schools and health, reducing funds for investment.", "A large young population will enter the labour force.", "Unless jobs are created, unemployment will rise (or output per head fall)."],
          modelAnswer: "A high birth rate produces a large number of children, which raises the dependency ratio, so the government must spend more on schools and health and has less to invest. The large young population will also enter the labour force, and unless enough jobs are created, unemployment will rise." }),
      ],
      explanation: "Birth rate 30; natural increase 18 per 1,000; population grew 1.9%; high births raise dependency and need jobs." });
  }
  {
    const y = [[3.6, 5.2, 0.2], [3.9, 6.4, 0.4]];
    const d1 = dependencyRatio(3.6 + 0.2, 5.2), d2 = dependencyRatio(3.9 + 0.4, 6.4); chk(roundTo(d1, 1), 73.1); chk(roundTo(d2, 1), 67.2);
    const t1 = table(["Age group (millions)", "Year 1", "Year 2"], [["0–14", 3.6, 3.9], ["15–64", 5.2, 6.4], ["65 and over", 0.2, 0.4]], { dp: [undefined, 1, 1] });
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Dependency ratio = (young + old) ÷ working age × 100.", "In (d) consider jobs, saving and the quality of education."],
      stem: "**A changing population in Kavala (fictional, illustrative)**\n\nThe table shows the age structure of Kavala's population in two years ten years apart. Birth rates have fallen and health has improved. Some economists say that Kavala can gain a 'demographic dividend' if it creates enough jobs.\n\n" + t1,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: d1, dp: 1, stem: "Calculate the dependency ratio in year 1, to one decimal place.", wrong: [69.2, 3.8, 5.2], explanation: "(3.6 + 0.2) ÷ 5.2 × 100 = 73.1." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: d2, dp: 1, stem: "Calculate the dependency ratio in year 2, to one decimal place.", wrong: [61.0, 4.3, 6.4], explanation: "(3.9 + 0.4) ÷ 6.4 × 100 = 67.2." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain what the change in the dependency ratio means for the workers of Kavala.",
          points: ["Each 100 workers support fewer dependants (73.1 in year 1, 67.2 in year 2).", "So more income per worker can be saved, invested or spent on goods."],
          modelAnswer: "The ratio has fallen, so each 100 workers support fewer dependants, 67.2 instead of 73.1, which leaves more income per worker to be saved, invested or spent." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether the change in the age structure will necessarily benefit the Kavalan economy.",
          points: ["The working-age group rose from 5.2 to 6.4 million and the dependency ratio fell, which can raise saving, investment and output per head.", "The benefit depends on enough jobs for the larger labour force; otherwise unemployment rises.", "Education and skills determine productivity.", "The number of old people has doubled (0.2 to 0.4 million), raising future spending on pensions and health.", "Policies for investment and training are needed to realise the dividend.", "Judgement."],
          modelAnswer: "The working-age population has increased from 5.2 to 6.4 million and the dependency ratio has fallen from 73.1 to 67.2, which can raise saving, investment and output per head. However, the gain depends on whether enough jobs are created for the larger labour force, because otherwise unemployment will rise, and on whether workers have the education and skills to be productive. The number of old people has also doubled, so spending on pensions and health will rise in the future. The change is therefore an opportunity rather than a guaranteed benefit, and it requires investment and training to realise." }),
      ],
      explanation: "Dependency ratios 73.1 and 67.2; fewer dependants per worker; assess the demographic dividend against jobs, skills and ageing." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both sides of rapid population growth."],
    stem: "Assess whether rapid population growth is a barrier to economic development.",
    points: ["A larger population provides more workers and a bigger market for firms.", "A high proportion of children raises the dependency ratio and reduces saving.", "More spending is needed on food, schools and health.", "Pressure on land, water and jobs; unemployment and urbanisation problems.", "If resources, capital and technology expand, output per head can still rise.", "Women's education, health and family planning can slow growth.", "Depends on whether jobs and investment keep pace.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Rapid population growth can provide more workers and a bigger market for firms, which may help development if jobs and investment keep pace. However, a high proportion of children raises the dependency ratio and reduces saving, and more must be spent on food, schools and health. There may be pressure on land, water and jobs, leading to unemployment and rapid urbanisation. If capital, technology and resources expand as quickly, output per head can still rise. Overall rapid growth is more likely to hinder development where investment, jobs and public services cannot keep pace, but it need not be a barrier if they can.",
    explanation: "Weigh the labour and market benefits against dependency, pressure on resources and jobs." });

  b.card("FORMULA", "Natural increase?", "Birth rate − death rate (per 1,000; ÷ 10 for a percentage).");
  b.card("FORMULA", "Population change?", "Natural increase + net migration.");
  b.card("FORMULA", "Dependency ratio?", "(Population under 15 + population 65 and over) ÷ population aged 15 to 64 × 100.");
  b.card("DEFINITION", "Define the **infant mortality rate**.", "Deaths of children under one year of age per 1,000 live births in a year.");
  b.card("DEFINITION", "Define **optimum population**.", "The population size at which output per head is highest, given resources, capital and technology.");
  b.card("CONCEPT", "Push and pull factors in rural-urban migration?", "Push: low farm incomes, drought, land shortage. Pull: jobs, schools, services in towns.");
  b.card("CONCEPT", "Why does a high dependency ratio hold back development?", "Income goes to supporting dependants, leaving less for saving and investment.");
  b.card("CONCEPT", "What is the demographic dividend?", "The gain when the working-age share rises and the dependency ratio falls, if there are jobs and skills.");
  b.card("CONCEPT", "Effect of skilled emigration?", "Loss of skills and labour (brain drain), partly offset by remittances.");
});
