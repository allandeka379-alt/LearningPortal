// W4a: dev.regional-inequalities (ZIMSEC Form 5). Illustrative data; numbers computed in code with the lib helpers.
import { concept, P, t, chk, table, geographyLevels, mean, gini, spearman } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const inc = [2400, 1500, 1100, 800, 600, 300];
const meanInc = mean(inc); // 1116.67
const ratioInc = chk(2400 / 150, 16, 1e-9);
const gi = gini(inc); // 0.336
const pctAbove = chk(((2400 - 300) / 300) * 100, 700, 1e-9);
const D = ["D1", "D2", "D3", "D4", "D5", "D6"];
const X = [80, 65, 58, 50, 35, 22];
const Y = [76, 88, 54, 63, 31, 45];
const sp = spearman(X, Y);
chk(sp.sumD2, 6);
chk(sp.crit, 0.886);
const tabS = table(["District", "Households with piped water (%)", "Secondary school attendance (%)"], D.map((d, i) => [d, X[i], Y[i]]));
const tabP = table(["Rank of water", "Rank of attendance", "d", "d²"], sp.rows.map((r) => [r.rx, r.ry, r.d, r.d2]));
const clin = [["Core district 1", 3.2], ["Core district 2", 2.8], ["Periphery district 1", 0.9], ["Periphery district 2", 0.6]];
const tabC = table(["District", "Clinics per 10 000 people"], clin);
const ratioClin = chk(((3.2 + 2.8) / 2) / ((0.9 + 0.6) / 2), 4, 1e-9);

concept("ageo.dev.regional-inequalities", { file: "dev/regional-inequalities", keyPrefix: "dev.regional-inequalities" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the core in the core-periphery model?",
    ok: ["The region with the greatest concentration of wealth, industry, services and power", "Correct: it is the dominant region."],
    bad: [["The poorest and most remote region, which supplies labour and raw materials to others and has few services", "That is the periphery."], ["The region with the highest rainfall", "Rainfall does not define the core."], ["The region with the largest farms", "Farm size does not define the core."]],
    explanation: "The core is the dominant economic and political region; the periphery is poorer and more remote.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which writer used the idea of cumulative causation to explain regional inequality?",
    ok: ["Myrdal", "Correct: he argued that advantage feeds on itself."],
    bad: [["Christaller", "Christaller developed central place theory."], ["Malthus", "Malthus wrote about population and food."], ["Ravenstein", "Ravenstein wrote laws of migration."]],
    explanation: "Myrdal (1957): a region that gains an advantage attracts investment and workers, so it grows further.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What are backwash effects?",
    ok: ["The movement of workers, money and firms from the periphery to the core", "Correct: resources are drawn into the growing region."],
    bad: [["The spread of wealth, demand for produce and jobs from the core to the surrounding areas", "Those are spread effects."], ["The return of migrants to their home villages", "Return migration is not backwash."], ["The flow of water down a river", "This is physical geography."]],
    explanation: "Backwash effects take resources from the periphery to the core and widen the gap.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which is a historical cause of regional inequality in Zimbabwe?",
    ok: ["Colonial investment in railways, towns and farms in some areas and little in others", "Correct: it shaped the pattern of infrastructure and services."],
    bad: [["The recent growth of mobile phone use and mobile money services across many districts", "This is a recent change, not a historical cause."], ["The size of Lake Kariba", "A lake is physical, not historical."], ["The popularity of football", "This has no connection."]],
    explanation: "Colonial decisions on where to build railways, roads and towns left uneven infrastructure.",
    hints: ["Think of what was built before independence."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why does migration from the periphery to the core tend to widen the gap?",
    ok: ["The periphery loses young and skilled people while the core gains labour and spending", "Correct: this is a backwash effect."],
    bad: [["The periphery gains more skilled workers and the core loses young people and spending power", "The periphery loses workers."], ["The core loses its labour force", "The core gains labour."], ["Migration has no effect on either region", "Migration changes both regions."]],
    explanation: "Loss of young, skilled people reduces output in the periphery and adds to the core's market and labour supply.",
    hints: ["Who moves, and where do they go?"],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which policy would most directly reduce differences in access to services between regions?",
    ok: ["Devolving funds to districts to build roads, clinics and schools in under-served areas", "Correct: it targets investment where it is lacking."],
    bad: [["Locating all new investment and government services in the capital and a few large towns", "This would widen the gap."], ["Reducing the number of rural schools", "This would reduce services in the periphery."], ["Raising taxes only in poor districts", "This would burden poorer areas."]],
    explanation: "Policies that direct funds and infrastructure to under-served districts address the cause of the inequality.",
    hints: ["Which option moves resources towards the periphery?"],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Income per person (US\\$ a year) in six provinces is 2 400, 1 500, 1 100, 800, 600 and 300. Calculate the mean income per person, to the nearest US\\$.",
    value: meanInc, dp: 0, unit: "US$", wrong: [6700, 1100],
    explanation: "Sum = 6 700. Mean = 6 700 ÷ 6 = US\\$1 117. 6 700 is the total, and 1 100 is the median.",
    hints: ["Add all six values and divide by 6."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The highest provincial income per person is US\\$2 400 and the lowest is US\\$150. How many times greater is the highest than the lowest?",
    value: ratioInc, unit: "times", wrong: [2250, 0.0625],
    explanation: "2 400 ÷ 150 = 16 times. 2 250 is the difference, not the ratio.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Using the same data, by what percentage is the highest provincial income above the lowest?",
    value: pctAbove, unit: "%", wrong: [87.5, 800],
    explanation: "(2 400 − 300) ÷ 300 × 100 = 700%. 87.5% divides by the highest value, and 800% forgets to subtract the starting 100%.",
    hints: ["Divide the difference by the lowest value."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Regional inequalities exist only in low-income countries.",
    answer: false,
    explanation: "False. Every country has regional differences, for example between a capital region and remote rural areas.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A Gini coefficient of 0 means perfect equality between regions.",
    answer: true,
    explanation: "True. 0 means all regions have the same value and 1 means the greatest possible inequality.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cause to its type.",
    pairs: [
      ["Dry, infertile land far from a port", "Physical"],
      ["Concentration of firms in the capital", "Economic"],
      ["Railways built to serve only some farming areas", "Historical"],
      ["Decisions to site services in the capital", "Political"],
    ],
    explanation: "Regional inequality has physical, economic, historical and political causes.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Benefits that flow from the core to the periphery are called {{blank:a}} effects, whereas resources drawn into the core are called {{blank:b}} effects.",
    blanks: [
      { id: "a", accepted: ["spread"], choices: ["spread", "backwash", "multiplier"] },
      { id: "b", accepted: ["backwash"], choices: ["spread", "backwash", "multiplier"] },
    ],
    explanation: "Spread effects help the periphery; backwash effects drain it.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a region of low income and few opportunities that supplies labour and raw materials to a richer region?",
    accepted: ["periphery", "the periphery", "peripheral region"],
    wrong: ["core", "hinterland city"],
    explanation: "The periphery is the poorer, often remote region in the core-periphery model.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Which statistic, from 0 to 1, measures how unequally a quantity such as income is shared?",
    accepted: ["Gini coefficient", "Gini", "the Gini coefficient", "Gini index"],
    wrong: ["Spearman", "Moran's I"],
    explanation: "The Gini coefficient is 0 for equality and 1 for the greatest inequality.",
    hints: ["It is named after an Italian statistician."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the pattern of regional inequality in a country such as Zimbabwe.",
    points: ["The cities, such as Harare and Bulawayo, and the Highveld have the best incomes, services and infrastructure", "Remote, dry and border districts have lower incomes and fewer schools, clinics and roads", "Inequality falls with distance from the main cities and routes, so there is a core and a periphery"],
    modelAnswer: "The cities, such as Harare and Bulawayo, and the Highveld have the best incomes, services and infrastructure. Remote, dry and border districts have lower incomes and fewer schools, clinics and roads. Inequality increases with distance from the main cities and routes, giving a core and a periphery.",
    explanation: "Core, periphery and the gradient between them.",
    hints: ["Name the best and worst areas."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why migration from the periphery to the core can increase regional inequality.",
    points: ["Young, skilled and enterprising people leave the periphery, so its output and tax base fall", "The core gains labour and a bigger market, so firms invest there", "The periphery is left with older people, women and children, so its dependency ratio rises"],
    modelAnswer: "Young, skilled and enterprising people leave the periphery, so its output and tax base fall. The core gains labour and a bigger market, so firms invest there, and the periphery is left with older people, women and children, so its dependency ratio rises.",
    explanation: "Backwash effects of migration.",
    hints: ["Who leaves, and what happens to each region?"],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain two physical or economic reasons why a remote district may be poorer than a district near the capital.",
    points: ["Low and unreliable rainfall and poor soils limit farm income", "Distance from markets and poor roads raise transport costs and discourage investment", "Few jobs outside farming, so young people migrate", "Fewer services such as electricity and clinics make it hard to attract businesses"],
    modelAnswer: "Low and unreliable rainfall and poor soils limit farm income. Distance from markets and poor roads raise transport costs and discourage investment, so there are few jobs outside farming and young people migrate.",
    explanation: "Any two reasons, each developed.",
    hints: ["Think of farming and access."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest how you would carry out a survey of regional disparities in access to services in a province.",
    points: ["State the aim or hypothesis and choose indicators such as distance to the nearest clinic, school and water point", "Select a sample of wards or villages using stratified or systematic sampling to cover core and periphery", "Collect data by household questionnaires and use ZimStat and council records for secondary data", "Present results with maps and graphs, test relationships with Spearman, and evaluate limits such as small samples"],
    modelAnswer: "State the aim and choose indicators such as distance to the nearest clinic, school and water point. Select a sample of wards or villages by stratified or systematic sampling to cover core and periphery, and collect data by household questionnaires and from ZimStat and council records. Present results with maps and graphs, test relationships with Spearman and evaluate limits such as small samples.",
    explanation: "Aim, indicators, sampling, data, presentation, evaluation.",
    hints: ["Follow the stages of an enquiry."],
  });

  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A student tested the hypothesis that districts with more households with piped water have higher secondary school attendance. The data for six districts are below (illustrative data).\n\n${tabS}\n\nThe ranks of the two variables (1 = lowest) and the differences are:\n\n${tabP}\n\nThe null hypothesis is that there is no relationship between the two variables. The critical value of Spearman's rank correlation coefficient for n = 6 at the 5% significance level is 0.886.`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the sum of d² (Σd²).", value: sp.sumD2, wrong: [0, 36], explanation: "Each of the six districts has d = +1 or −1, so each d² is 1 and Σd² = 6 × 1 = 6." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: t`Calculate $r_s = 1 - \dfrac{6 \sum d^2}{n^3 - n}$, to three decimal places.`, value: sp.rs, dp: 3, wrong: [0.171, 0.943], explanation: t`$r_s = 1 - \dfrac{6 \times 6}{216 - 6} = 1 - \dfrac{36}{210} = 1 - 0.171 = 0.829$. 0.171 forgets to subtract from 1.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "What is the correct conclusion at the 5% level?", options: [["The positive relationship is not significant, because 0.829 is less than 0.886", "Correct: the null hypothesis is not rejected."], ["The relationship is significant, because 0.829 is close to 1 and is a strong positive value", "Significance depends on the critical value, not closeness to 1."], ["There is a significant negative relationship", "The coefficient is positive."], ["There is no relationship at all", "There is a positive coefficient, but it is not significant for six pairs."]], answer: "A", explanation: "0.829 < 0.886, so we cannot reject the null hypothesis of no correlation." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why a small sample of six districts makes it hard to prove a relationship.", points: ["With few pairs, a high coefficient can occur by chance, so the critical value is high (0.886)", "One or two unusual districts can change the result", "Six districts may not represent the whole province"], modelAnswer: "With few pairs a high coefficient can occur by chance, so the critical value is high at 0.886. One or two unusual districts can change the result, and six districts may not represent the whole province.", explanation: "Chance, outliers and representativeness." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest how the survey could be improved and what other factors could explain school attendance.", points: ["Increase the sample to more districts or wards to give a more reliable test", "Use more recent or primary data from households", "Consider other factors such as distance to school, household income, road quality and the number of teachers", "Use another test or a scatter graph to check whether the relationship is linear, and state that correlation does not prove cause"], modelAnswer: "The sample could be increased to more districts or wards to give a more reliable test, and primary data collected from households. Other factors such as distance to school, household income, road quality and the number of teachers could explain attendance, and a scatter graph would show whether the relationship is linear. Correlation does not prove cause.", explanation: "Sample size, data quality, other variables, cause." }),
    ],
    explanation: "Calculate and interpret a Spearman rank correlation for regional data.",
    hints: ["Use the formula with n = 6."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the number of clinics per 10 000 people in four districts (illustrative data).\n\n${tabC}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate how many times greater the mean of the two core districts is than the mean of the two periphery districts.", value: ratioClin, unit: "times", wrong: [2.4, 0.25], explanation: "Core mean = (3.2 + 2.8) ÷ 2 = 3.0. Periphery mean = (0.9 + 0.6) ÷ 2 = 0.75. 3.0 ÷ 0.75 = 4 times." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which concept does the table illustrate?", options: [["Core-periphery inequality in services", "Correct: the core districts have much better access."], ["Primacy of one city over the other towns", "Primacy compares city sizes."], ["Counter-urbanisation", "This is about movement out of cities."], ["The demographic transition", "This is about birth and death rates."]], answer: "A", explanation: "Services are concentrated in the core and sparse in the periphery." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why clinics are fewer in the periphery.", points: ["Population is sparse, so each clinic serves few people and costs more per patient", "Poor roads and lack of electricity make clinics harder and costlier to build and staff", "Health workers prefer to work in towns with better housing, schools and pay"], modelAnswer: "Population is sparse, so each clinic serves few people and costs more per patient. Poor roads and lack of electricity make clinics harder and costlier to build and staff, and health workers prefer to work in towns with better housing, schools and pay.", explanation: "Threshold, infrastructure and staffing." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways of improving access to health care in the periphery.", points: ["Build or upgrade clinics and provide transport such as ambulances or mobile clinics", "Offer incentives to health workers and train village health workers"], modelAnswer: "Build or upgrade clinics and provide mobile clinics and ambulances, and offer incentives to health workers while training village health workers.", explanation: "Any two valid measures." }),
    ],
    explanation: "Compare core and periphery access to services and suggest improvements.",
    hints: ["Find each mean first."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of policies intended to reduce regional inequalities in Zimbabwe. [8]",
    points: [
      "Names policies such as growth points, devolution under the 2013 Constitution, and investment in rural infrastructure and services",
      "Growth points have brought schools, clinics and markets nearer to rural people",
      "Devolution can transfer funds and decisions to provinces and districts, so local needs are met",
      "Rural electrification, roads and water projects reduce the disadvantage of remote areas",
      "Limits: limited funds, weak capacity and slow implementation",
      "Limits: firms still prefer the core, where markets, skills and infrastructure are better, so jobs grow slowly in the periphery",
      "Migration to the cities continues, and averages hide differences within districts",
      "Judgement: policies have improved access to services in some areas but have not removed the gap, which needs sustained funding and job creation",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Policies such as growth points, devolution under the 2013 Constitution and investment in rural infrastructure aim to reduce the gap between the core and the periphery. Growth points have brought schools, clinics and markets nearer to rural people, devolution can transfer funds and decisions to provinces and districts, and electrification, roads and water projects reduce the disadvantage of remote areas. However, funds are limited, capacity is weak and implementation is slow, and firms still prefer the core, where markets, skills and infrastructure are better, so jobs grow slowly in the periphery. Migration to the cities continues. Overall the policies have improved access to services in some areas but have not removed the gap, which needs sustained funding and job creation.",
    wordLimit: { max: 300 },
    explanation: "Weigh successes against limits for several policies and judge.",
    hints: ["Cover services, funding and jobs."],
  });

  b.card("DEFINITION", "Regional inequality?", "Differences between regions in income, employment, services, infrastructure and living standards.");
  b.card("DEFINITION", "Core and periphery?", "Core: region of concentrated wealth, industry, services and power. Periphery: poorer, often remote region supplying labour and raw materials (Friedmann, 1966).");
  b.card("CONCEPT", "Cumulative causation (Myrdal, 1957)?", "A region that gains an advantage attracts investment and workers, so it grows further; backwash effects usually outweigh spread effects at first.");
  b.card("CONCEPT", "Causes of regional inequality?", "Physical (climate, relief, remoteness), economic (agglomeration), historical (colonial investment), political and social.");
  b.card("CONCEPT", "Impacts of regional inequality?", "Poverty and low services in the periphery, migration to the core, congestion there, political tension.");
  b.card("CONCEPT", "Solutions to regional inequality?", "Devolution, growth points, infrastructure, rural industries, incentives, social programmes.");
  b.card("FORMULA", "Gini coefficient?", "Measure of inequality from 0 (perfect equality) to 1 (greatest inequality).");
  b.card("FORMULA", "Spearman's rank coefficient?", t`$r_s = 1 - \dfrac{6 \sum d^2}{n^3 - n}$; compare with the critical value (0.886 for n = 6 at the 0.05 level).`);
  b.card("FACT", "Brandt Line (1980)?", "A line used to show the divide between richer countries (mostly north) and poorer countries (mostly south).");
});
