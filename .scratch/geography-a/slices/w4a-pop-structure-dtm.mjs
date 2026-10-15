// W4a: pop.structure-dtm (ZIMSEC Form 5; Cambridge AS). Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, geographyLevels, dependencyRatio, naturalIncreasePct } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const depR = chk(dependencyRatio(31, 9, 60), 200 / 3, 1e-9); // 66.67
const youthT = (36 / 58) * 100; // 62.07
const oldS = (22 / 67) * 100; // 32.84
const dep2000 = dependencyRatio(40, 4, 56); // 78.57
const dep2040 = dependencyRatio(28, 6, 66); // 51.52
const tabK = table(["Age group", "2000 (%)", "2040, projected (%)"], [["Under 15", 40, 28], ["Working age", 56, 66], ["Older people (65+)", 4, 6]]);
const W = [[1970, 38, 20], [1995, 36, 12], [2020, 22, 7]];
const ni95 = chk(naturalIncreasePct(36, 12), 2.4);
const tabW = table(["Year", "Birth rate (per 1 000)", "Death rate (per 1 000)"], W);
chk(naturalIncreasePct(38, 20), 1.8);
chk(naturalIncreasePct(22, 7), 1.5);

concept("ageo.pop.structure-dtm", { file: "pop/structure-dtm", keyPrefix: "pop.structure-dtm" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which shape of population pyramid is typical of a country in stage 2 of the demographic transition model?",
    ok: ["A wide base and steep sides that taper quickly", "Correct: high fertility and many early deaths give a youthful population."],
    bad: [["A narrow base with a wide top and many old people", "That shape fits a stage 4 or 5 country with an ageing population."], ["Almost straight sides from bottom to top", "That shape fits a stationary stage 4 population."], ["A wide middle and narrow base and top", "This happens only after migration of workers or a past baby boom."]],
    explanation: "A wide base shows many children and steep sides show that many people die before old age.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What mainly causes the death rate to fall at the start of stage 2?",
    ok: ["Better food supply, clean water and medicine", "Correct: these reduce deaths from hunger and infectious disease."],
    bad: [["Wider use of contraception and family planning", "Contraception lowers the birth rate, which falls later."], ["A rise in the status of women", "This mainly affects fertility in stage 3."], ["Movement of people into cities", "Urbanisation mainly affects birth rates and may even raise death rates at first."]],
    explanation: "Stage 2 begins when public health, food and medicine reduce deaths while births stay high.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In which stage of the demographic transition model is the birth rate below the death rate?",
    ok: ["Stage 5 (the optional declining stage)", "Correct: natural change is negative."],
    bad: [["Stage 2", "In stage 2 the birth rate is far above the death rate."], ["Stage 3", "The birth rate is falling but still above the death rate."], ["Stage 4 (the low stationary stage, with equal births and deaths)", "Both rates are low and roughly equal."]],
    explanation: "Stage 5 is not part of the original model. It describes countries such as Japan where deaths exceed births.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which is a genuine limitation of the demographic transition model?",
    ok: ["It is based on European history and leaves out migration", "Correct: other regions have had different timing, and migration can matter more than natural change."],
    bad: [["It cannot be used to compare countries because every country is different", "It is widely used for comparison, as a simple framework."], ["It shows only the birth rate, not the death rate", "It shows both rates."], ["It says all countries remain in stage 2", "It says that countries move through stages."]],
    explanation: "The model was built from the experience of Europe, assumes a similar path for all countries and ignores migration, epidemics such as HIV/AIDS and government policy.",
    hints: ["Where did the model come from, and what does it leave out?"],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A pyramid has a narrow base and its widest bands are at ages 55 to 74. What does this suggest?",
    ok: ["An ageing population with a low birth rate", "Correct: few children and many older people."],
    bad: [["A rapidly expanding youthful population with a wide base", "That would have a wide base."], ["A population in stage 1", "Stage 1 has a wide base and few old people."], ["A population with high infant mortality", "High infant mortality goes with few old people, not a wide top."]],
    explanation: "A narrow base means few births in recent years; large bands at older ages mean many elderly people.",
    hints: ["Is the base wide or narrow?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "The pyramid of a country shows a deep notch in the 20 to 24 age band for both sexes. What is the most likely cause?",
    ok: ["A period of very low births about 20 to 24 years earlier, for example a famine or war", "Correct: a gap in births shows as a notch that moves up the pyramid."],
    bad: [["A recent rise in the birth rate", "A rise in births would widen the lowest bands."], ["Large-scale immigration of young adults who arrived in the country about twenty years earlier", "Immigration would add to the band, not create a notch."], ["Better health care for the elderly", "This would widen the top, not create a notch in a young band."]],
    explanation: "Events that cut births, such as a famine, war or epidemic, leave a notch in the cohort born then.",
    hints: ["The age band shows when the people were born."],
  });

  b.num({
    d: 3, skill: "APPLICATION", daily: true, calculator: true,
    stem: "In Country R, 31% of the population is under 15, 60% is of working age and 9% is of pension age. Calculate the dependency ratio, to one decimal place.",
    value: depR, dp: 1, wrong: [40, 0.7],
    explanation: "Dependants = 31 + 9 = 40. Dependency ratio = 40 ÷ 60 × 100 = 66.7. Giving 40 forgets to divide by the working-age share.",
    hints: ["Add the young and the old before dividing."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In Country T, 36% of the population is under 15 and 58% is of working age. Calculate the youth dependency ratio (under 15 ÷ working-age population × 100), to one decimal place.",
    value: youthT, dp: 1, wrong: [36, 72.4],
    explanation: "Youth dependency ratio = 36 ÷ 58 × 100 = 62.1. Using the 6% of older people as well would give a total dependency ratio of 72.4, which is not what was asked.",
    hints: ["Use only the under-15 group as the numerator."],
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "In Country S, 22% of the population is aged 65 and over and 67% is of working age. Calculate the old-age dependency ratio (65 and over ÷ working-age population × 100), to one decimal place.",
    value: oldS, dp: 1, wrong: [22, 67],
    explanation: "Old-age dependency ratio = 22 ÷ 67 × 100 = 32.8.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Stage 5 is part of the original four-stage demographic transition model.",
    answer: false,
    explanation: "False. The original model has four stages. A fifth stage, with a birth rate below the death rate, was added later and is optional.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A high dependency ratio always means that a country is poor.",
    answer: false,
    explanation: "False. The ratio counts age groups only, not income or employment. A rich country with many pensioners can have a high ratio.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each stage of the demographic transition model to its description.",
    pairs: [
      ["Stage 1", "High birth rate and high, fluctuating death rate"],
      ["Stage 2", "High birth rate and rapidly falling death rate"],
      ["Stage 3", "Falling birth rate and low death rate"],
      ["Stage 4", "Low birth rate and low death rate"],
    ],
    explanation: "The death rate falls first (stage 2); the birth rate falls later (stage 3).",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Natural increase is highest in stage {{blank:a}} of the DTM because the {{blank:b}} rate has fallen but the {{blank:c}} rate is still high.",
    blanks: [
      { id: "a", accepted: ["2"], choices: ["1", "2", "3", "4"] },
      { id: "b", accepted: ["death"], choices: ["birth", "death", "marriage"] },
      { id: "c", accepted: ["birth"], choices: ["birth", "death", "migration"] },
    ],
    explanation: "In stage 2 death rates fall quickly while birth rates remain high, so the gap and growth are at a maximum.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which stage of the demographic transition model has high birth rates and rapidly falling death rates? Give the stage number.",
    accepted: ["2", "stage 2", "two", "stage two", "early expanding"],
    wrong: ["1", "3"],
    explanation: "Stage 2 (early expanding): the death rate falls rapidly while the birth rate remains high.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of graph that shows the number or percentage of males and females in each age group.",
    accepted: ["population pyramid", "age-sex pyramid", "age sex pyramid", "population pyramids", "age-sex structure graph", "age and sex pyramid"],
    wrong: ["line graph", "scatter graph"],
    explanation: "A population (age-sex) pyramid shows structure by age and sex.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the death rate falls in stage 2 of the demographic transition model.",
    points: ["Improved food supply and nutrition reduce deaths from hunger and make people resistant to disease", "Clean water, sanitation and public health measures cut deaths from diarrhoea and cholera", "Medical advances, vaccination and clinics reduce deaths from infectious disease and infant mortality"],
    modelAnswer: "A better food supply improves nutrition so fewer people die of hunger or disease. Clean water and sanitation reduce deaths from diarrhoea and cholera, and vaccination and clinics reduce infectious disease and infant deaths.",
    explanation: "Food, public health and medicine.",
    hints: ["Think of food, water and medicine."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "In Country U, 29% of the population is under 15, 63% is of working age and 8% is aged 65 and over. Describe the structure of the population.",
    points: ["A fairly youthful population with 29% under 15, so a broad base to the pyramid", "A small elderly population (8%), so a narrow top", "A dependency ratio of about 59, mostly young dependants"],
    modelAnswer: "The population is fairly youthful, with 29% under 15, so the pyramid has a broad base. Only 8% are aged 65 and over, so the top is narrow. The dependency ratio is about 59, mainly young dependants.",
    explanation: "Quote the figures for each group and give the dependency ratio.",
    hints: ["Use all three percentages."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain two limitations of the demographic transition model.",
    points: ["It is based on the experience of European countries, but death rates in other regions fell much faster because medicine was imported", "Development paths differ, so countries do not all move through the same stages at the same speed", "It ignores migration, which can change the population more than births and deaths", "It cannot account for epidemics such as HIV/AIDS or for government policy such as China's one-child policy"],
    modelAnswer: "The model is based on European history, but in other regions death rates fell much faster because medicine was imported, so the pattern differs. It also ignores migration, which can change a population more than natural change, and cannot account for events such as HIV/AIDS or government policy.",
    explanation: "Give two limitations, each developed.",
    hints: ["Where did the model come from, and what does it ignore?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four problems that an ageing population can cause for a country.",
    points: ["Rising cost of pensions and health care for the elderly", "A shrinking workforce and fewer taxpayers to support dependants", "Labour shortages in some sectors, which may need immigration", "Falling demand for schools and child services, under-used facilities, or the need for more care homes for older people"],
    modelAnswer: "An ageing population raises the cost of pensions and health care, and a shrinking workforce means fewer taxpayers to pay for it. There may be labour shortages that require immigration, and schools may close for lack of children.",
    explanation: "Link the age structure to costs, workers and services.",
    hints: ["Think of money, workers and services."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the age structure of Country K in 2000 and a projection for 2040 (illustrative data).\n\n${tabK}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the dependency ratio in 2000, to one decimal place.", value: dep2000, dp: 1, wrong: [44, 0.8], explanation: "(40 + 4) ÷ 56 × 100 = 78.6." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the projected dependency ratio in 2040, to one decimal place.", value: dep2040, dp: 1, wrong: [34, 0.5], explanation: "(28 + 6) ÷ 66 × 100 = 51.5." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which statement describes the change from 2000 to 2040?", options: [["The share of children falls and the share of working-age adults rises", "Correct: under 15 falls from 40% to 28% and 15 to 64 rises from 56% to 66%."], ["The share of children rises while the share of working-age adults falls", "It falls from 40% to 28%."], ["The share of older people falls", "It rises from 4% to 6%."], ["The dependency ratio rises", "It falls from 78.6 to 51.5."]], answer: "A", explanation: "Falling fertility reduces the share of children and increases the working-age share." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the share of children is projected to fall.", points: ["Falling birth rates as women's education and use of contraception increase", "Urbanisation and the rising cost of children lead to smaller families", "Lower infant mortality means fewer births are needed to reach the desired family size"], modelAnswer: "Birth rates are expected to fall as women become more educated and use contraception more. Urban living and the cost of raising children also lead to smaller families, and lower infant mortality means parents need fewer births.", explanation: "Social and economic causes of falling fertility." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess the possible benefits and risks of the projected change in structure for Country K's economy.", points: ["A larger working-age share and fewer dependants could raise output and savings per person (a demographic dividend)", "Benefit only if enough jobs are created for the working-age group", "The share of older people is rising, so pension and health costs will increase", "Falling child numbers allow spending on school quality, but the population will eventually age further"], modelAnswer: "The larger working-age share and fewer dependants could raise output and savings per person, a demographic dividend, but only if enough jobs are created. The rising share of older people will increase pension and health costs, and the population will eventually age further.", explanation: "Weigh the dividend against jobs and ageing." }),
    ],
    explanation: "Calculate dependency ratios from a projected structure and explain the change.",
    hints: ["Add under 15 and 65 and over before dividing by the 15 to 64 share."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows birth and death rates for Country W (illustrative data).\n\n${tabW}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the natural increase in 1995, as a percentage.", value: ni95, unit: "%", wrong: [24, 1.8], explanation: "(36 − 12) ÷ 10 = 2.4%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which stage of the demographic transition model was Country W in by 1995?", options: [["Stage 2", "Correct: the death rate had fallen sharply (20 to 12) while the birth rate stayed high (36)."], ["Stage 1", "The death rate had fallen, so it was no longer stage 1."], ["Stage 4", "Birth rates were still high."], ["Stage 5", "Births were far above deaths."]], answer: "A", explanation: "A high birth rate with a falling death rate is stage 2." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the death rate fell between 1970 and 1995.", points: ["Better health care and vaccination reduced deaths from infectious disease", "Improved water supply and sanitation", "Better food supply and nutrition"], modelAnswer: "Better health care and vaccination reduced deaths from infectious disease, clean water and sanitation reduced diarrhoeal disease, and a better food supply improved nutrition.", explanation: "Health care, water and food." }),
      P.manual({ label: "(d)", marks: 2, stem: "Describe how the natural increase changed between 1995 and 2020.", points: ["Natural increase fell from 2.4% to 1.5%", "Because the birth rate fell much faster (36 to 22) than the death rate (12 to 7)"], modelAnswer: "Natural increase fell from 2.4% in 1995 to 1.5% in 2020, because the birth rate fell from 36 to 22 while the death rate fell only from 12 to 7.", explanation: "Quote the change and reason." }),
    ],
    explanation: "Calculate natural increase and place a country on the DTM.",
    hints: ["Natural increase = (birth rate − death rate) ÷ 10."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the usefulness of the demographic transition model for understanding population change in a low-income African country. [8]",
    points: [
      "The model links falling death and birth rates to development and helps explain why growth is fastest in stage 2",
      "It is simple, so it helps in comparing countries and in expecting needs such as schools, then jobs, then pensions",
      "Many African countries show high birth rates and falling death rates, as in stage 2 or 3",
      "The model is based on Europe: death rates fell much faster in Africa because medicine was imported, so natural increase was higher",
      "It ignores migration, which may be important in southern Africa",
      "Epidemics such as HIV/AIDS raised death rates and delayed the transition in southern Africa",
      "Government policies on family planning, conflict and economic change can alter timing",
      "Judgement: a useful general framework, but each country needs its own data and the model should not be used for prediction",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The model is useful because it links falling death and birth rates to development and explains why natural increase is highest in stage 2, which is where many African countries are. It is simple and helps planners to expect the changing needs for schools, jobs and pensions. However, it is based on the history of Europe, whereas in Africa death rates fell much faster because medicine was imported, so growth has been faster than in Europe. It also ignores migration, and events such as HIV/AIDS in southern Africa raised death rates and delayed the transition, while government policy and conflict can change the timing. Overall it is a useful general framework, but each country needs its own data and the model should not be used to predict the future.",
    wordLimit: { max: 300 },
    explanation: "Usefulness and limitations followed by a judgement.",
    hints: ["Compare the African experience with the European one the model was built on."],
  });

  b.card("DEFINITION", "Dependency ratio?", "(Under 15 + 65 and over) ÷ ages 15 to 64 × 100.");
  b.card("CONCEPT", "DTM stage 1?", "High birth rate and high, fluctuating death rate: little growth.");
  b.card("CONCEPT", "DTM stage 2?", "High birth rate, rapidly falling death rate: natural increase and population growth are fastest.");
  b.card("CONCEPT", "DTM stage 3?", "Birth rate falls (contraception, education, urbanisation), death rate low: growth slows.");
  b.card("CONCEPT", "DTM stages 4 and 5?", "Stage 4: low birth and death rates, stable population. Stage 5 (optional): birth rate below death rate, population falls without immigration.");
  b.card("CONCEPT", "What does a wide base on a pyramid show?", "A high birth rate: a youthful, expanding population.");
  b.card("CONCEPT", "Limitations of the DTM?", "Based on Europe; ignores migration, HIV/AIDS and policy; assumes all countries follow one path; stage 5 uncertain.");
  b.card("CONCEPT", "Problems of an ageing population?", "Rising pension and health costs, a shrinking workforce and tax base, labour shortages.");
  b.card("CONCEPT", "Problems of a youthful population?", "Pressure on schools, clinics, food, housing and jobs; a possible demographic dividend if jobs are created.");
});
