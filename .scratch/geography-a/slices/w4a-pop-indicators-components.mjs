// W4a: pop.indicators-components (ZIMSEC Form 5; Cambridge AS). Illustrative data; numbers computed in code.
import { concept, P, t, chk, table, geographyLevels, per1000, naturalIncreasePct, dependencyRatio, sum } from "../lib.mjs";
import { mc, fmt } from "../tables/w4a-_h.mjs";

const cbr = chk(per1000(20480, 640000), 32);
const imr = chk(per1000(1820, 36400), 50);
const dep = chk(dependencyRatio(1650000, 150000, 3000000), 60);
const nmr = chk(per1000(12000 - 30000, 1800000), -10);
const niPct = chk(naturalIncreasePct(41, 13), 2.8);
// Struct 1: countries P and Q
const P_ = { pop: 8000000, births: 296000, deaths: 88000, infant: 17760 };
const Q_ = { pop: 5000000, births: 55000, deaths: 60000, infant: 165 };
const niP = chk(naturalIncreasePct(per1000(P_.births, P_.pop), per1000(P_.deaths, P_.pop)), 2.6);
const imrP = chk(per1000(P_.infant, P_.births), 60);
const tab1 = table(["", "Country P", "Country Q"], [
  ["Population", fmt(P_.pop), fmt(Q_.pop)],
  ["Live births in the year", fmt(P_.births), fmt(Q_.births)],
  ["Deaths in the year", fmt(P_.deaths), fmt(Q_.deaths)],
  ["Deaths of children under one year", fmt(P_.infant), fmt(Q_.infant)],
]);
// Struct 2: age-specific fertility
const ASFR = [["G1 (youngest mothers)", 40], ["G2", 140], ["G3", 160], ["G4", 110], ["G5", 60], ["G6", 20], ["G7 (oldest mothers)", 4]];
const tfr = chk((5 * sum(ASFR.map((r) => r[1]))) / 1000, 2.67);
const tab2 = table(["Five-year age group of mother", "Births per 1 000 women a year"], ASFR);

concept("ageo.pop.indicators-components", { file: "pop/indicators-components", keyPrefix: "pop.indicators-components" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "How is the crude birth rate calculated?",
    ok: ["Live births ÷ total population × 1 000", "Correct: it is expressed per 1 000 people per year."],
    bad: [["Live births ÷ number of women aged 15 to 49 × 1 000", "That is the general fertility rate, not the crude birth rate."], ["Live births ÷ deaths × 1 000", "Comparing births and deaths gives a ratio, not a rate per population."], ["Births minus deaths ÷ total population × 100", "That is the natural increase as a percentage."]],
    explanation: "CBR = live births ÷ total population × 1 000. It is crude because it uses the whole population.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "The infant mortality rate is the number of deaths of children under one year old per...",
    ok: ["1 000 live births in a year", "Correct: the base is live births."],
    bad: [["1 000 people in the population in a year", "That is the form of the crude death rate."], ["100 children under five in a year", "This is not the standard definition."], ["1 000 deaths of all ages in a year", "Infant deaths are compared with births, not with all deaths."]],
    explanation: "IMR uses live births as its base because it measures the risk of dying in the first year of life.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "About what total fertility rate is the replacement level in a country with low child mortality?",
    ok: ["2.1 children per woman", "Correct: two to replace the parents plus a small allowance for early deaths."],
    bad: [["1.0 child per woman", "One child per woman halves each generation."], ["3.5 children per woman", "This would produce rapid growth."], ["5.0 children per woman", "This is a high-fertility level."]],
    explanation: "A TFR of about 2.1 keeps the population stable in the long run when child mortality is low.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which change is most likely to lead to a fall in a country's total fertility rate?",
    ok: ["More girls completing secondary school and more women in paid work", "Correct: educated women marry later and choose smaller families."],
    bad: [["A rise in the infant mortality rate", "Parents tend to have more children when many die."], ["A move of families from towns back to rural farms and larger households", "Rural families usually have more children."], ["A fall in the cost of raising children", "Lower costs tend to raise the number of children."]],
    explanation: "Women's education and employment, delayed marriage and access to contraception are the main drivers of lower fertility.",
    hints: ["Which option gives women more choices?"],
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Country X has a crude death rate of 11 per 1 000 and Country Y has 7 per 1 000, yet life expectancy is higher in X. What is the best explanation?",
    ok: ["X has an older age structure, so more deaths occur even though health is good", "Correct: the crude death rate is affected by the share of older people."],
    bad: [["X has a higher infant mortality rate than Y, so many more babies die each year", "A higher IMR would lower life expectancy."], ["Death rates and life expectancy are unrelated", "They are related but affected differently by age structure."], ["X has recorded its deaths wrongly", "There is no evidence of error; age structure explains the pattern."]],
    explanation: "An ageing population has more deaths per 1 000 because it has more old people, so a good health system can still have a higher CDR.",
    hints: ["Which group dies in greatest numbers in an ageing country?"],
  });

  b.calc({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "A district has a population of 640 000 and 20 480 live births in a year. Calculate the crude birth rate, per 1 000 people.",
    value: cbr, unit: "per 1000", wrong: [3.2, 0.032],
    explanation: "CBR = 20 480 ÷ 640 000 × 1 000 = 32 per 1 000. Giving 3.2 divides by 10 000 instead of multiplying by 1 000.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In one year a district had 36 400 live births and 1 820 deaths of children under one year old. The district population is 640 000. Calculate the infant mortality rate, per 1 000 live births.",
    value: imr, unit: "per 1000", wrong: [2.84, 5],
    explanation: "IMR = 1 820 ÷ 36 400 × 1 000 = 50 per 1 000 live births. Dividing by the total population (640 000) gives 2.84, which is the wrong base.",
    hints: ["Which number is the base for IMR?"],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A country has a crude birth rate of 41 per 1 000 and a crude death rate of 13 per 1 000. Calculate its natural increase, as a percentage.",
    value: niPct, unit: "%", wrong: [28, 0.28],
    explanation: "Natural increase = 41 − 13 = 28 per 1 000. Dividing by 10 gives 2.8%. Giving 28 forgets to convert to a percentage.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A country has 1 650 000 children, 3 000 000 working-age adults and 150 000 people of pension age. Calculate the dependency ratio.",
    value: dep, wrong: [55, 0.6],
    explanation: "Dependants = 1 650 000 + 150 000 = 1 800 000. Dependency ratio = 1 800 000 ÷ 3 000 000 × 100 = 60. Using only children gives 55; leaving out × 100 gives 0.6.",
    hints: ["Include both young and old dependants."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A region of 1 800 000 people received 12 000 immigrants and lost 30 000 emigrants in a year. Calculate the net migration rate, per 1 000 people (give a negative sign if more people left than arrived).",
    value: nmr, unit: "per 1000", wrong: [10, -18000],
    explanation: "Net migration = 12 000 − 30 000 = −18 000. Rate = −18 000 ÷ 1 800 000 × 1 000 = −10 per 1 000. A positive 10 reverses the sign.",
    hints: ["Subtract emigrants from immigrants."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A negative net migration figure means that more people entered the country than left it.",
    answer: false,
    explanation: "False. Net migration is immigrants minus emigrants, so a negative value means more people left than arrived.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each indicator to what it measures.",
    pairs: [
      ["Total fertility rate", "Average number of children a woman would have in her lifetime"],
      ["Infant mortality rate", "Deaths of children under one year per 1 000 live births"],
      ["Life expectancy", "Average years a newborn would live at current death rates"],
      ["Dependency ratio", "Dependants per 100 people of working age"],
    ],
    explanation: "Each indicator measures a different aspect of fertility, health or age structure.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements.",
    template: "Birth rates and death rates are given per {{blank:a}} people. Natural increase equals the birth rate minus the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1000"], choices: ["100", "1000", "10000"] },
      { id: "b", accepted: ["death rate"], choices: ["death rate", "infant mortality rate", "net migration rate", "fertility rate"] },
    ],
    explanation: "Rates are per 1 000 people; natural increase = birth rate − death rate.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the indicator that gives the average number of children a woman would have in her lifetime.",
    accepted: ["total fertility rate", "TFR", "the total fertility rate", "fertility rate"],
    wrong: ["birth rate", "natural increase"],
    explanation: "The total fertility rate (TFR) gives children per woman; the crude birth rate is per 1 000 people.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the measure of population health that counts deaths of babies under one year per 1 000 live births.",
    accepted: ["infant mortality rate", "IMR", "the infant mortality rate", "infant mortality"],
    wrong: ["crude death rate", "life expectancy"],
    explanation: "The infant mortality rate (IMR) is a sensitive indicator of health care, nutrition and sanitation.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why fertility tends to fall as women's education improves.",
    points: ["Educated women marry later, so they have fewer years in which to bear children", "They are more likely to have paid jobs, which compete with childcare and make children costly", "They know more about family planning and have more say in decisions about family size"],
    modelAnswer: "Educated women marry later, so they have fewer child-bearing years. They are more likely to work for pay, which makes having many children costly, and they know more about family planning and have a greater say in family size.",
    explanation: "Link education to later marriage, employment and family planning.",
    hints: ["Think of age at marriage, jobs and knowledge."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the infant mortality rate is a good indicator of a country's level of health care.",
    points: ["Babies are very sensitive to poor health care, so deaths show weakness in maternity and child services", "It also reflects mothers' nutrition, clean water, sanitation and vaccination", "It is not affected by age structure, so comparisons between countries are fair"],
    modelAnswer: "Babies are very sensitive to poor health care, so infant deaths reveal weak maternity and child services. The rate also reflects nutrition, clean water, sanitation and vaccination, and it is not distorted by age structure, so countries can be compared fairly.",
    explanation: "Link IMR to the quality of care, to wider conditions and to its comparability.",
    hints: ["Why are babies more vulnerable than adults?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four ways in which a government could reduce infant mortality.",
    points: ["Free or low-cost antenatal care and trained birth attendants in clinics", "Vaccination programmes and treatment of diarrhoea and malaria", "Clean water and sanitation in rural and urban areas", "Education of mothers on nutrition and breastfeeding, and food support for poor families, or prevention of mother-to-child transmission of HIV"],
    modelAnswer: "A government could provide antenatal care and trained birth attendants at clinics, run vaccination programmes and treat diarrhoea and malaria, provide clean water and sanitation, and educate mothers on nutrition and breastfeeding.",
    explanation: "Any four valid measures, linked to causes of infant death.",
    hints: ["Think of care at birth, disease, water and nutrition."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    stem: "Explain why the crude death rate of a high-income country with an ageing population may be higher than that of a low-income country with a young population.",
    points: ["An ageing population has a large share of older people, who die in greater numbers", "A young population has few older people, so fewer deaths per 1 000 even if health care is poorer", "The crude death rate ignores age structure, so life expectancy and IMR are better health measures"],
    modelAnswer: "An ageing population has many older people, who die in greater numbers, so deaths per 1 000 are high even with good health care. A young population has few older people, so its death rate can be lower despite poorer health. The crude death rate ignores age structure.",
    explanation: "Age structure affects the crude death rate.",
    hints: ["Which age group has the most deaths?"],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows illustrative data for two countries for one year.\n\n${tab1}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the natural increase of Country P, as a percentage.", value: niP, unit: "%", wrong: [26, 3.7], explanation: "CBR = 296 000 ÷ 8 000 000 × 1 000 = 37. CDR = 88 000 ÷ 8 000 000 × 1 000 = 11. Natural increase = 37 − 11 = 26 per 1 000 = 2.6%." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the infant mortality rate of Country P, per 1 000 live births.", value: imrP, unit: "per 1000", wrong: [2.2, 6], explanation: "17 760 ÷ 296 000 × 1 000 = 60 per 1 000 live births." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is the natural change of Country Q?", options: [["A decrease of 1 per 1 000", "Correct: CBR 11 and CDR 12 give −1 per 1 000."], ["An increase of 1 per 1 000", "Deaths exceed births, so the change is negative."], ["An increase of 5 000 per 1 000", "This mixes up the totals and the rate."], ["No change", "Births (55 000) and deaths (60 000) are not equal."]], answer: "A", explanation: "CBR = 55 000 ÷ 5 000 000 × 1 000 = 11; CDR = 60 000 ÷ 5 000 000 × 1 000 = 12; 11 − 12 = −1 per 1 000." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why Country Q has more deaths than births although its infant mortality rate (3 per 1 000) is very low.", points: ["Its population is ageing, with a large share of older people who die each year", "Its birth rate is low because couples have few children", "Good health care keeps infant deaths low but does not stop deaths at old age"], modelAnswer: "Country Q has an ageing population, with many older people who die each year, and a low birth rate because couples have few children. Good health care keeps infant deaths low, but it cannot prevent deaths at old age.", explanation: "Low fertility and an older age structure." }),
      P.manual({ label: "(e)", marks: 4, stem: "Explain why Country P has a high birth rate and a high infant mortality rate.", points: ["Limited access to contraception and family planning keeps fertility high", "Children are needed for farm work and security in old age", "Many babies die, so parents have more children to be sure some survive", "Poor health care, unsafe water, malnutrition and disease cause infant deaths"], modelAnswer: "Limited family planning and the need for children to work on the farm and to support parents in old age keep fertility high. Because many babies die, parents have more children. Poor health care, unsafe water, malnutrition and disease cause the high infant mortality.", explanation: "Link fertility and mortality to economic and health conditions." }),
    ],
    explanation: "Calculate and compare indicators for two countries and explain the differences.",
    hints: ["Convert births and deaths to rates per 1 000 first."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows age-specific fertility rates for one country, for seven five-year age groups of mothers from the youngest (G1) to the oldest (G7) (illustrative data).\n\n${tab2}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the total fertility rate, in children per woman. TFR = 5 × the sum of the rates ÷ 1 000.", value: tfr, dp: 2, wrong: [534, 2.14], explanation: "Sum of rates = 40 + 140 + 160 + 110 + 60 + 20 + 4 = 534. TFR = 5 × 534 ÷ 1 000 = 2.67 children per woman." }),
      P.mcq({ label: "(b)", marks: 1, stem: "How does this TFR compare with the replacement level of about 2.1?", options: [["It is above replacement level", "Correct: 2.67 is greater than 2.1."], ["It is below replacement level", "2.67 is larger than 2.1."], ["It is exactly the replacement level", "The figures are not equal."], ["The two cannot be compared", "TFR is compared with replacement level directly."]], answer: "A", explanation: "A TFR above 2.1 means each generation is larger than the last unless mortality or migration changes." }),
      P.manual({ label: "(c)", marks: 2, stem: "Describe the pattern of fertility by age shown in the table.", points: ["Fertility is highest in group G3 (160 births per 1 000 women) and rises steeply from G1", "It falls after G3 and is very low (4 per 1 000) in the oldest group, G7"], modelAnswer: "Fertility rises from 40 per 1 000 in group G1 to a peak of 160 in G3, then falls steadily to only 4 per 1 000 in G7.", explanation: "Quote the peak and the lowest values." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest reasons why the TFR of a country may fall over twenty years.", points: ["More women in education and paid employment, marrying later", "Wider use of contraception and family planning services", "Lower infant mortality, urban living and higher costs of raising children"], modelAnswer: "More women are educated and in paid work, so they marry later. Contraception becomes more widely available. Lower infant mortality, urban living and the rising cost of raising children also reduce family size.", explanation: "Social, economic and health reasons." }),
    ],
    explanation: "Calculate TFR, compare it with replacement level and interpret the age pattern.",
    hints: ["Add all seven rates before multiplying by 5."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess how useful the crude birth rate and the total fertility rate are for a planner deciding how many primary schools a district will need in ten years. [8]",
    points: [
      "The crude birth rate shows how many babies are born each year (per 1 000 people), so it gives the size of the future school intake",
      "Births this year become the six- or seven-year-olds who start school later, so the number can be projected",
      "The total fertility rate shows the average family size and whether birth numbers are likely to rise or fall",
      "The CBR is crude: it depends on the age structure, so a district with many young women may have a high CBR even if the TFR is falling",
      "Both are averages for a district and hide differences between wards or between urban and rural areas",
      "Neither includes migration, which may add or remove school-age children",
      "Child mortality and fertility change over time, so projections may be wrong over ten years",
      "Judgement: useful for a first estimate, but planners also need actual birth registrations, migration data and local population forecasts",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The crude birth rate tells a planner how many babies are born in a district each year, and these children will reach school age in about six years, so it gives a direct estimate of future demand. The total fertility rate shows whether family size is rising or falling and so whether the intake will grow. However, the CBR depends on age structure and may be high where there are many young women even when the TFR is falling, and both measures are averages that hide differences between wards or between town and countryside. Neither includes migration, and fertility can change in ten years. They are therefore useful for a first estimate, but a planner also needs local birth registrations, migration data and a population forecast.",
    wordLimit: { max: 300 },
    explanation: "Uses and limitations of the indicators for planning, followed by a judgement.",
    hints: ["How soon do babies become pupils, and what do these rates leave out?"],
  });

  b.card("DEFINITION", "Crude birth rate?", "Live births per 1 000 people in a year = births ÷ population × 1 000.");
  b.card("DEFINITION", "Natural increase?", "Birth rate minus death rate. Divide the per 1 000 figure by 10 to give a percentage.");
  b.card("DEFINITION", "Infant mortality rate?", "Deaths of children under one year old per 1 000 live births in a year.");
  b.card("DEFINITION", "Total fertility rate?", "Average number of children a woman would have in her lifetime at the current age-specific fertility rates. Replacement level is about 2.1.");
  b.card("DEFINITION", "Life expectancy?", "Average number of years a newborn would live if current death rates stayed the same.");
  b.card("FORMULA", "Dependency ratio?", "(Under 15 + 65 and over) ÷ ages 15 to 64 × 100.");
  b.card("FORMULA", "Total population growth rate?", "Natural increase (%) + net migration (%).");
  b.card("CONCEPT", "Why does fertility fall?", "Women's education and work, contraception, lower infant mortality, urban living and higher cost of children.");
  b.card("CONCEPT", "Why is the crude death rate misleading?", "It depends on age structure: an ageing population has more deaths per 1 000 even with good health care.");
});
