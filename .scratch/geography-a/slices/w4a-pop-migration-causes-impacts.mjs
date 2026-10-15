// W4a: pop.migration-causes-impacts (ZIMSEC Form 6; Cambridge AS). Illustrative data; Qatar facts general and rounded (to be verified).
import { concept, P, t, chk, table, geographyLevels, dependencyRatio, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const remitMill = chk((250000 * 1800) / 1e6, 450);
const remitPct = chk((450 / 9000) * 100, 5, 1e-9);
const depBefore = chk(dependencyRatio(32000, 8000, 40000), 100);
const depAfter = dependencyRatio(32000, 8000, 35000); // 114.3
const USE = [["Food and daily needs", 54], ["School fees", 30], ["Housing", 18], ["Farm inputs or a small business", 12], ["Savings", 6]];
chk(sum(USE.map((r) => r[1])), 120);
const pctFood = chk((54 / 120) * 100, 45, 1e-9);
const pctFeeHouse = chk(((30 + 18) / 120) * 100, 40, 1e-9);
const tabU = table(["Main use of remittances", "Households"], USE);
const migWorkers = chk(0.18 * 4.5e6, 810000, 1e-6);

concept("ageo.pop.migration-causes-impacts", { file: "pop/migration-causes-impacts", keyPrefix: "pop.migration-causes-impacts" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a pull factor?",
    ok: ["Better-paid jobs in the destination", "Correct: pull factors attract migrants to a destination."],
    bad: [["Unemployment and low wages in the home area", "This pushes people out of the origin."], ["Drought in the home district", "This is a push factor."], ["Armed conflict at home", "This is a push factor."]],
    explanation: "Pull factors act at the destination; push factors act at the origin.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the main benefit of remittances for a source area?",
    ok: ["They raise household incomes and pay for food, school fees and housing", "Correct: money sent home improves living standards."],
    bad: [["They increase the number of young people who live permanently in the area", "Migration reduces the number of young people."], ["They reduce the dependency ratio of the area", "Emigration of workers tends to raise it."], ["They stop all further emigration", "Remittances often help others to migrate."]],
    explanation: "Remittances are a major source of income, but they do not replace the lost workers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a likely negative impact of emigration on a source area?",
    ok: ["Loss of young and skilled workers", "Correct: the area loses people who would be most productive."],
    bad: [["Less money entering the area from abroad", "Emigration usually increases money sent in."], ["More competition for scarce land", "Fewer people reduces competition."], ["A younger age structure", "The age structure becomes older."]],
    explanation: "Emigration is often selective, taking young, skilled and enterprising people.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why are the poorest households often unable to migrate to another country?",
    ok: ["The costs of travel, documents and finding work are too high", "Correct: costs and lack of information are obstacles to migration."],
    bad: [["They have no push factors at all that could drive them to move", "Poor households often face strong push factors."], ["Immigration laws only apply to the rich", "Laws apply to everyone."], ["Remittances are not allowed", "Remittances are allowed."]],
    explanation: "Migration requires money for travel, documents and the early weeks without a wage, so the poorest are often held back.",
    hints: ["What does it cost to travel and find work abroad?"],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the kafala (sponsorship) system in Qatar was a criticism made of it?",
    ok: ["It tied workers to their employers and limited their freedom to change jobs", "Correct: this is the main criticism, and reforms in 2020 removed the need for permission."],
    bad: [["It banned all foreign workers", "Qatar relies heavily on foreign workers."], ["It paid migrants more than citizens and gave them the same full legal rights", "Critics cited low pay and poor housing."], ["It gave all migrants citizenship", "Citizenship rights are very limited."]],
    explanation: "Critics said that the sponsorship system gave employers great power over workers. Reforms from 2020 allowed workers to change jobs and leave without permission.",
    hints: ["The system gave power to employers."],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which factor would increase the benefit of remittances to a source area's development?",
    ok: ["Money invested in farming, business and education, not just consumption", "Correct: investment creates lasting income."],
    bad: [["Remittances sent through informal and costly channels with high transfer fees", "High transfer costs reduce the amount that arrives."], ["Emigration of the area's remaining skilled workers", "This increases the loss of skills."], ["Spending only on imported goods", "This gives little local benefit."]],
    explanation: "Remittances help development most when they are invested and when transfer costs are low.",
    hints: ["Which use creates lasting income?"],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Country E has 250 000 emigrants who each send home an average of US\\$1 800 a year. Calculate the total annual remittances, in US\\$ million.",
    value: remitMill, unit: "US$ million", wrong: [4.5, 45],
    explanation: "250 000 × 1 800 = 450 000 000, which is US\\$450 million.",
    hints: ["Multiply the number of emigrants by the average amount."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Country E's remittances are US\\$450 million a year and its GDP is US\\$9 000 million. Calculate remittances as a percentage of GDP.",
    value: remitPct, unit: "%", wrong: [20, 0.05],
    explanation: "450 ÷ 9 000 × 100 = 5%. Dividing GDP by remittances gives 20, which is the wrong way round.",
    hints: ["Remittances are the part, GDP is the whole."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "A district has 32 000 children, 8 000 older people and 40 000 working-age adults. Then 5 000 working-age adults emigrate. Calculate the new dependency ratio, to one decimal place.",
    value: depAfter, dp: 1, wrong: [100, 87.5],
    explanation: "After emigration the working-age group is 35 000. Dependency ratio = (32 000 + 8 000) ÷ 35 000 × 100 = 114.3. The ratio was 100 before. Giving 87.5 inverts the fraction.",
    hints: ["Subtract the emigrants from the working-age group only."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Emigration of young adults tends to make the age structure of the source area older.",
    answer: true,
    explanation: "True. When young adults leave, the proportion of children and older people left behind rises.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Push factors act at the destination and pull factors act at the origin.",
    answer: false,
    explanation: "False. Push factors act at the origin (they drive people out) and pull factors act at the destination (they attract people).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each factor to its type.",
    pairs: [
      ["Failed harvests after drought", "Environmental push factor"],
      ["Better schools in the city", "Social pull factor"],
      ["Persecution of a minority group", "Political push factor"],
      ["Labour shortage in an ageing country", "Demographic pull factor"],
    ],
    explanation: "Classify each factor by type (economic, environmental, social, political, demographic) and by where it acts.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "Money sent home by migrants is called {{blank:a}}. Emigration of skilled professionals is called the {{blank:b}} drain.",
    blanks: [
      { id: "a", accepted: ["remittances"], choices: ["remittances", "grants", "subsidies", "loans"] },
      { id: "b", accepted: ["brain"], choices: ["brain", "skill", "capital", "youth"] },
    ],
    explanation: "Remittances are transfers from migrants; the brain drain is the loss of skilled workers.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the term for money sent home by migrants to their families?",
    accepted: ["remittances", "remittance", "remittances."],
    wrong: ["wages", "aid"],
    explanation: "Remittances are a major source of foreign income for many countries.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "Name the sponsorship system in Qatar, reformed from 2020, that tied migrant workers to their employers.",
    accepted: ["kafala", "the kafala system", "kafala system"],
    wrong: ["apartheid", "pass laws"],
    explanation: "The kafala system gave employers a high degree of control over migrant workers.",
    hints: ["The system is named after the Arabic word for sponsorship."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why many young people migrate from rural areas to towns in Zimbabwe.",
    points: ["Few jobs, small plots and low farm incomes in rural areas (push factors)", "Towns offer more jobs, higher wages and business opportunities (pull factors)", "Better schools, clinics and entertainment, and relatives already in town to help"],
    modelAnswer: "There are few jobs and small plots in rural areas, so farm incomes are low. Towns offer more jobs, higher wages and business opportunities, better schools and clinics, and relatives already there to help newcomers.",
    explanation: "Link push and pull factors to the decision.",
    hints: ["Think of jobs, services and contacts."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the positive impacts of emigration on a source country.",
    points: ["Remittances raise household incomes and support national income", "Reduced pressure on jobs, land and services", "Migrants return with new skills, savings and ideas"],
    modelAnswer: "Remittances raise household incomes and foreign exchange. Emigration reduces pressure on jobs, land and services, and returning migrants bring skills, savings and ideas.",
    explanation: "Money, pressure and skills.",
    hints: ["Think of money, pressure and skills."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why immigration can cause problems in a destination city.",
    points: ["Sudden growth increases demand for housing, leading to overcrowding and informal settlement", "Water, sanitation, schools, clinics and transport are overstretched", "Competition for jobs may lower wages and create tension between groups", "Rapid growth makes it hard for the city council to collect enough revenue to provide services"],
    modelAnswer: "Sudden growth increases demand for housing, leading to overcrowding and informal settlement. Water, sanitation, schools and clinics become overstretched, competition for jobs can lower wages and create tension between groups, and the council struggles to raise enough revenue.",
    explanation: "Housing, services, jobs and finance.",
    hints: ["Think of what a city must provide for each new resident."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest two ways in which a government might reduce the negative effects of emigration of skilled workers.",
    points: ["Raise pay and improve working conditions and career opportunities for skilled workers at home", "Agreements with destination countries to train replacements or to share the cost of training", "Encourage migrants to return or to invest by giving incentives or recognising diaspora contributions", "Train more people so that emigration does not leave gaps"],
    modelAnswer: "A government could improve pay, conditions and career opportunities for skilled workers so that fewer leave, and could train more people so that emigration does not leave gaps in services. It could also encourage return and investment by migrants through incentives.",
    explanation: "Any two valid measures, each developed.",
    hints: ["Think of keeping workers, replacing them and benefiting from those who leave."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `A survey of 120 households in a rural district asked how they used money sent by a family member working abroad (illustrative data).\n\n${tabU}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of households whose main use was food and daily needs.", value: pctFood, unit: "%", wrong: [54, 22], explanation: "54 ÷ 120 × 100 = 45%." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of households whose main use was school fees or housing.", value: pctFeeHouse, unit: "%", wrong: [48, 25], explanation: "(30 + 18) ÷ 120 × 100 = 40%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which use of remittances is most likely to create a lasting increase in income?", options: [["Farm inputs or a small business", "Correct: investment in production raises future income."], ["Food, clothing and other daily needs", "This meets current needs but does not create income."], ["Savings", "Savings provide security but are not themselves investment in production unless lent or invested."], ["Housing", "Better housing improves living standards but does not by itself create income."]], answer: "A", explanation: "Investment in farming or business can raise future income, whereas consumption does not." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why remittances are important for rural households.", points: ["Farm incomes are low and unreliable, so remittances provide a steady income", "They pay for food, school fees and health care, improving living standards", "They help households to survive droughts and other shocks"], modelAnswer: "Farm incomes are low and unreliable, so remittances provide a steady income. They pay for food, school fees and health care, and they help households to survive droughts and other shocks.", explanation: "Reliability, living standards and resilience." }),
      P.manual({ label: "(e)", marks: 4, stem: "Suggest negative effects of the migration of working-age adults on the district.", points: ["Fewer workers to farm, so fields may be left uncultivated", "Older people and women left with more work and a higher dependency ratio", "Loss of skills and enterprising people", "Dependence on remittances and widening differences between households with and without a migrant"], modelAnswer: "There are fewer workers to farm, so fields may be left uncultivated, and older people and women have more work and a higher dependency ratio. The district loses skilled and enterprising people and becomes dependent on remittances, and inequality grows between households with and without a migrant.", explanation: "Labour, dependency, skills and inequality." }),
    ],
    explanation: "Interpret a survey of remittance use and assess the effects of migration on a source area.",
    hints: ["Divide the number of households by 120."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "Country D has an ageing population and a workforce of 4.5 million. Migrants make up 18% of the workforce, mainly in construction, farming and care (illustrative data).",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which demographic factor is the main pull for migrant workers in Country D?", options: [["A labour shortage caused by an ageing population", "Correct: too few young workers for the jobs available."], ["Rapid natural increase", "An ageing country has slow natural increase."], ["A high youth dependency ratio and rapid natural increase", "An ageing country has more old than young dependants."], ["A high infant mortality rate", "This is not a pull factor."]], answer: "A", explanation: "Ageing countries often need workers from abroad." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the number of migrant workers.", value: migWorkers, unit: "people", wrong: [81000, 18], explanation: "18% of 4 500 000 = 0.18 × 4 500 000 = 810 000." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the benefits of migrant workers to Country D.", points: ["They fill labour shortages in jobs that local workers do not want or cannot fill", "They pay taxes, which help to fund pensions and services for the ageing population", "They spend money locally and start businesses, supporting growth"], modelAnswer: "They fill labour shortages in jobs that local workers do not want or cannot fill. They pay taxes that help to fund pensions and services for the ageing population, and they spend money locally and start businesses.", explanation: "Labour, taxes and spending." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain two problems that migrants may face in Country D.", points: ["Low pay, poor housing or unsafe working conditions", "Discrimination, language barriers or limited rights"], modelAnswer: "Migrants may face low pay, poor housing or unsafe working conditions, and discrimination, language barriers or limited rights.", explanation: "Two valid problems." }),
    ],
    explanation: "Identify a pull factor, calculate the size of the migrant workforce and explain benefits and problems.",
    hints: ["Multiply the workforce by 0.18."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Using a detailed example of one country, assess the impacts of international migration. [8]",
    points: [
      "Names the country (for example Qatar) and gives context: migrants are the great majority of residents (roughly 85 to 90%), mostly working men from Asia and Africa",
      "Positive economic impact: a large labour force for construction and services, including the World Cup building programme (2022)",
      "Positive for source countries: remittances to families in countries such as Nepal and the Philippines",
      "Demographic impact: a very male and young population",
      "Social impact: a divide between citizens and migrants, and limited citizenship rights",
      "Negative: the kafala system tied workers to employers, with low pay, poor housing and limited freedom to change jobs",
      "Management: reforms in 2020 removed the need for permission to change jobs and to leave, and a minimum wage was introduced in 2021",
      "Judgement: the economic gains are large, but they are unequally shared, and benefits depend on enforcing the reforms",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Migrants make up the great majority of Qatar's residents, roughly 85 to 90%, and most are working men from Asia and Africa. They have been essential to the construction boom, including the building for the 2022 World Cup, and to services, so the economic impact has been large, and remittances support families in countries such as Nepal and the Philippines. However, the population is strongly male, and there is a social divide between citizens and migrants, who have limited rights. Under the kafala system workers were tied to employers and faced low pay, poor housing and limited freedom to change jobs. Reforms in 2020 removed the need for permission to change jobs or leave the country and a minimum wage followed in 2021. Overall the economic gains are large but unequally shared, and the benefits depend on enforcing the reforms.",
    wordLimit: { max: 300 },
    explanation: "Use accurate facts about one country, weigh gains against costs and judge.",
    hints: ["Cover economic, social and management points, then judge."],
  });

  b.card("DEFINITION", "Push and pull factors?", "Push factors drive people away from the origin (unemployment, drought, conflict); pull factors attract them to the destination (jobs, services, safety).");
  b.card("DEFINITION", "Remittances?", "Money sent home by migrants to their families.");
  b.card("CONCEPT", "Obstacles to migration?", "Cost, distance, immigration laws, language, lack of information and family ties.");
  b.card("CONCEPT", "Positive impacts on a source area?", "Remittances, less pressure on jobs and land, skills and savings brought back by returning migrants.");
  b.card("CONCEPT", "Negative impacts on a source area?", "Loss of young and skilled people (brain drain), older age structure, labour shortages and family separation.");
  b.card("CONCEPT", "Impacts on a destination area?", "Gains: workers, taxes, diversity. Costs: pressure on housing and services, job competition, social tension.");
  b.card("CONCEPT", "Which people gain least from migration?", "Migrants who work in poor conditions and face discrimination or exploitation.");
  b.card("FACT", "Qatar as an example of international migration?", "Migrants are roughly 85 to 90% of residents; kafala system criticised; reforms in 2020 (changing jobs, leaving) and a minimum wage in 2021.");
  b.card("FORMULA", "Effect of emigration on the dependency ratio?", "Working-age emigrants lower the denominator, so the dependency ratio rises.");
});
