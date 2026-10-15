// W4a: settle.land-reform-resettlement (ZIMSEC Form 5). Illustrative data only; neutral wording; numbers computed in code.
import { concept, P, t, chk, rnd, table, geographyLevels, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const area = 160; // km2
const denBefore = chk(960 / area, 6, 1e-9);
const denAfter = chk((320 * 5) / area, 10, 1e-9);
const denIncr = ((denAfter - denBefore) / denBefore) * 100; // 66.67
const arablePct = chk(((240 * 4.5) / 12000) * 100, 9, 1e-9);
const avgPlot = chk(16000 / 320, 50, 1e-9);
const V = [["V1", 80, 2, 14, 4], ["V2", 120, 6, 9, 3], ["V3", 60, 1, 20, 5]];
const perBh = V.map((v) => v[1] / v[4]); // 20, 40, 12
chk(perBh[1], 40);
const tabV = table(["Village", "Households", "Distance to nearest school (km)", "Distance to nearest clinic (km)", "Working boreholes"], V);
const M = [["A1 villagised", 90], ["A1 self-contained", 60], ["A2", 50]];
chk(sum(M.map((m) => m[1])), 200);
const pctSelf = chk((60 / 200) * 100, 30, 1e-9);
const tabM = table(["Type of holding", "Number of holdings"], M);

concept("ageo.settle.land-reform-resettlement", { file: "settle/land-reform-resettlement", keyPrefix: "settle.land-reform-resettlement" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which model of the Fast Track Land Reform Programme gave plots for small and medium commercial farming?",
    ok: ["A2", "Correct: A2 plots were intended for commercial farming."],
    bad: [["A1 villagised", "A1 plots are for household farming."], ["A1 self-contained", "A1 plots are for household farming."], ["The communal model", "Communal areas were not part of the models."]],
    explanation: "A1 was for small household farms; A2 was for small and medium commercial farms.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What describes the villagised A1 layout?",
    ok: ["Homes are grouped in a village, with fields and grazing around it", "Correct: it is a nucleated pattern that makes services easier to provide."],
    bad: [["Each family lives alone in the middle of its own farm, away from neighbours", "That describes the self-contained layout."], ["Houses are strung out along a river only", "That is a linear pattern."], ["All families share a single large farm", "Each household had its own arable plot."]],
    explanation: "In a villagised layout homes are clustered in villages and arable plots are separate, with shared grazing.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which was a major reason for land reform in Zimbabwe?",
    ok: ["Unequal distribution of land at independence, with crowding in communal areas", "Correct: this inequality was the main historical reason."],
    bad: [["Shortage of tourists visiting farms", "Tourism was not the cause."], ["A fall in the number of people in rural areas", "Rural populations were growing."], ["A requirement by the Lancaster House agreement to close all commercial farms in 1980", "The agreement did not require closing farms."]],
    explanation: "Land was unevenly shared: the best land was mainly in large commercial farms and communal areas were overcrowded.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why did many new resettlement areas have problems of service provision?",
    ok: ["Schools, clinics and water points had to be built after households were settled", "Correct: the services lagged behind the arrival of settlers."],
    bad: [["Settlers refused to use schools and clinics", "Settlers wanted these services."], ["Services were already complete on all former farms and ready for many more families", "Farm infrastructure was designed for few workers and did not meet the needs of many households."], ["There were no roads on any former commercial farm", "Many farms had roads, though they were in poor condition."]],
    explanation: "Settlement happened faster than the provision of social services and infrastructure for many more households.",
    hints: ["Did the services come before or after the people?"],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Which group faced a particular settlement problem when commercial farms were acquired?",
    ok: ["Farm workers living in compounds, who lost jobs or housing in some cases", "Correct: their employment and housing depended on the former farm."],
    bad: [["A1 farmers, who were given houses in the town", "A1 farmers were settled on the land."], ["Town councils, which received all farm workers as employees in the municipal service", "There was no such arrangement."], ["Tourists on the farms", "Tourists were not the group affected."]],
    explanation: "Workers on commercial farms depended on the farm for jobs and housing, so their position changed when ownership changed.",
    hints: ["Who lived on the farms but did not receive a plot?"],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Why is secure tenure important for the development of resettlement settlements?",
    ok: ["It makes farmers willing to invest and to borrow money using the land as support", "Correct: investment in housing and farming needs security."],
    bad: [["It removes the need for any services, since farmers can provide their own schools", "Services are still needed."], ["It prevents anyone from moving", "Tenure does not stop movement."], ["It reduces the need for roads", "Roads are unaffected."]],
    explanation: "Farmers who are sure of their rights invest in buildings, boreholes and equipment and can use their land documents to access credit.",
    hints: ["Think about whether people invest in land they might lose."],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A former commercial farming district of 160 km² had 960 people before resettlement. After resettlement it has 320 households with 5 people each (illustrative data). Calculate the percentage increase in population density, to one decimal place.",
    value: denIncr, dp: 1, unit: "%", wrong: [66, 4],
    explanation: "Density before = 960 ÷ 160 = 6.0 per km². After: 320 × 5 = 1 600 people, so 1 600 ÷ 160 = 10 per km². Increase = (10 − 6) ÷ 6 × 100 = 66.7%. Giving 4 is the increase in density, not a percentage.",
    hints: ["Work out the density before and after first."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A farming area of 16 000 ha is divided into 320 equal A1 plots. Calculate the average size of a plot, in hectares.",
    value: avgPlot, unit: "ha", wrong: [0.02, 5120000],
    explanation: "16 000 ÷ 320 = 50 ha per plot (including grazing).",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A smaller A1 scheme of 12 000 ha has 240 households, each with 4.5 ha of arable land. What percentage of the scheme is arable land?",
    value: arablePct, unit: "%", wrong: [90, 0.9],
    explanation: "Arable area = 240 × 4.5 = 1 080 ha. Share = 1 080 ÷ 12 000 × 100 = 9%.",
    hints: ["First find the total arable area."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A villagised A1 layout makes it easier to provide services than a dispersed layout.",
    answer: true,
    explanation: "True. Clustered homes mean that a school, clinic or borehole can serve many households within a short distance.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The Lancaster House agreement of 1979 required land to be acquired on a willing buyer, willing seller basis during the first ten years of independence.",
    answer: true,
    explanation: "True. This limited compulsory acquisition in the 1980s, and resettlement was slower than many expected.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Villagised A1", "Homes clustered in a village, with separate fields and shared grazing"],
      ["Self-contained A1", "House, fields and grazing together on one household farm"],
      ["A2", "A larger plot for small to medium commercial farming"],
      ["Communal area", "Land farmed by households under customary arrangements, often crowded"],
    ],
    explanation: "Each term describes a type of land holding or settlement pattern.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "The Land Apportionment Act was passed in {{blank:a}}. The Fast Track Land Reform Programme began in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1930"], choices: ["1930", "1969", "1980", "2000"] },
      { id: "b", accepted: ["2000"], choices: ["1930", "1980", "1992", "2000"] },
    ],
    explanation: "The Land Apportionment Act (1930) reserved land by race; the Fast Track Land Reform Programme began in 2000.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which A1 layout has houses grouped in a village with fields separate from the homes?",
    accepted: ["villagised", "villagised A1", "villagised layout", "the villagised model", "villagised model"],
    wrong: ["self-contained", "A2"],
    explanation: "The villagised model groups homes in a village; the self-contained model places the house on the farm.",
  });
  b.short({
    d: 3, skill: "RECALL",
    stem: "What name was given to the land of black Zimbabweans before independence, now called communal areas?",
    accepted: ["Tribal Trust Lands", "tribal trust land", "tribal trust areas", "Tribal Trust Land", "TTL", "TTLs"],
    wrong: ["resettlement areas", "commercial farms"],
    explanation: "Communal areas were formerly called Tribal Trust Lands.",
    hints: ["The old name has the word 'Trust' in it."],
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why land reform took place in Zimbabwe.",
    points: ["At independence the best land with good soils and rainfall was mainly in large commercial farms, while most people lived on poorer communal land", "Communal areas were overcrowded with soil degradation and landlessness", "The liberation struggle created expectations of redistribution, and early resettlement was slower than expected"],
    modelAnswer: "At independence the best land with good soils and rainfall was mainly in large commercial farms, while most people lived on poorer communal land. Communal areas were overcrowded, with soil degradation and landlessness. The liberation struggle created expectations of redistribution, and early resettlement was slower than expected.",
    explanation: "Inequality, pressure and expectations.",
    hints: ["Compare commercial farms and communal areas."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Compare the A1 and A2 resettlement models.",
    points: ["A1 gave small plots for household farming, while A2 gave larger plots for commercial farming", "A1 could be villagised (clustered homes) or self-contained, while A2 farms were dispersed with existing farm buildings", "A1 aimed to relieve pressure on communal areas, while A2 aimed to create small to medium commercial farmers"],
    modelAnswer: "A1 gave small plots for household farming, while A2 gave larger plots for commercial farming. A1 could be villagised or self-contained, while A2 farms were dispersed and often used existing farm buildings. A1 aimed to relieve pressure on communal areas, whereas A2 aimed to create small to medium commercial farmers.",
    explanation: "Plot size, layout and aim.",
    hints: ["Think of size, layout and purpose."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain two problems of service provision in newly settled areas.",
    points: ["Schools and clinics were built after the settlers arrived, so children walked long distances", "Boreholes and water points were too few for the number of households", "Roads and bridges built for a few commercial farms were in poor condition for many users", "The government and councils had limited funds to build services in many places at once"],
    modelAnswer: "Schools and clinics were built after settlers arrived, so children walked long distances to school and sick people travelled far for care. Roads and bridges built for a few commercial farms were in poor condition for many users, and councils had limited funds to build services in many places at once.",
    explanation: "Any two problems, each developed.",
    hints: ["Which services lagged behind the settlers?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four ways of improving services and infrastructure in resettlement areas.",
    points: ["Build schools and clinics within walking distance, or provide transport", "Drill and maintain boreholes and protect water sources", "Repair and maintain roads and bridges to link farms to markets and growth points", "Extend electricity and mobile coverage, possibly using solar systems, or plan rural service centres with markets, inputs and finance"],
    modelAnswer: "Schools and clinics could be built within walking distance or transport provided, and boreholes could be drilled and maintained. Roads and bridges could be repaired to link farms to markets, and electricity and mobile coverage extended using solar systems or the grid.",
    explanation: "Any four valid improvements.",
    hints: ["Think of social services, water, roads and energy."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows services in three villages of a villagised A1 area (illustrative data).\n\n${tabV}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the number of households per working borehole in V2.", value: perBh[1], unit: "units", wrong: [120, 0.025], explanation: "120 ÷ 3 = 40 households per borehole." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which village has the poorest access to water?", options: [["V2", "Correct: 40 households share each borehole, compared with 20 in V1 and 12 in V3."], ["V1", "V1 has 20 households per borehole."], ["V3", "V3 has the best access, with 12 households per borehole."], ["They are the same", "The ratios are different."]], answer: "A", explanation: "V1: 80 ÷ 4 = 20; V2: 120 ÷ 3 = 40; V3: 60 ÷ 5 = 12." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the differences in distance to the nearest clinic.", points: ["V3 is furthest from a clinic, at 20 km", "V2 is closest, at 9 km, and V1 is at 14 km", "All three villages are far from a clinic, much further than from a school (1 to 6 km)"], modelAnswer: "V3 is furthest from a clinic at 20 km, V1 is at 14 km and V2 is closest at 9 km. All three villages are much further from a clinic than from a school, which is between 1 and 6 km away.", explanation: "Quote the distances and compare with schools." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why long distances to a clinic matter for these households.", points: ["Sick people, pregnant women and children may not reach treatment in time", "Transport is costly and public transport is infrequent", "People may rely on traditional or informal care, and diseases spread more easily without treatment"], modelAnswer: "Sick people, pregnant women and children may not reach treatment in time. Transport is costly and public transport is infrequent, so people may rely on informal care, and diseases spread more easily without treatment.", explanation: "Access, cost and health consequences." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest how the access of these villages to a clinic could be improved.", points: ["Build a clinic or a satellite clinic in a central village, with a mobile clinic visiting regularly", "Improve roads and provide an ambulance or community transport", "Train village health workers to give first aid and basic care"], modelAnswer: "A clinic or satellite clinic could be built in a central village, with a mobile clinic visiting regularly. Roads could be improved and an ambulance or community transport provided, and village health workers could be trained to give first aid and basic care.", explanation: "Locate services nearer, improve transport, train local people." }),
    ],
    explanation: "Interpret a table of services and propose improvements.",
    hints: ["Divide households by boreholes."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `A resettlement ward has 200 holdings of three types (illustrative data).\n\n${tabM}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of holdings that are A1 self-contained.", value: pctSelf, unit: "%", wrong: [60, 3], explanation: "60 ÷ 200 × 100 = 30%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which type of holding has a nucleated settlement pattern?", options: [["A1 villagised", "Correct: homes are clustered in a village."], ["A1 self-contained", "The house stands on the household's own farm."], ["A2", "A2 homesteads are dispersed on separate farms."], ["Self-contained A1 and A2 equally", "Both of those are dispersed."]], answer: "A", explanation: "Only the villagised A1 layout groups homes together." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why services are easier to provide to the villagised A1 area than to the self-contained farms.", points: ["Households live close together, so one school, clinic or borehole serves many people", "The cost of roads, water and electricity per household is lower for a clustered settlement", "Villages can be planned with sites for markets and public buildings"], modelAnswer: "Households live close together, so one school, clinic or borehole serves many people. The cost of roads, water and electricity per household is lower for a clustered settlement, and villages can be planned with sites for markets and public buildings.", explanation: "Clustering reduces cost and distance." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two problems that A2 farmers may face in this ward.", points: ["Lack of capital and credit to restock, repair buildings and buy inputs", "Insecure or unclear tenure, so lenders will not accept the land as collateral, or poor infrastructure"], modelAnswer: "A2 farmers may lack capital and credit to restock, repair buildings and buy inputs, and unclear tenure may mean that lenders will not accept the land as collateral.", explanation: "Any two valid problems." }),
    ],
    explanation: "Calculate shares of holdings and explain the effect of layout on services.",
    hints: ["Divide the number of self-contained holdings by the total."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effects of land reform on the development of rural settlements in Zimbabwe. [8]",
    points: [
      "Redistribution created new settlements and settled many households on former commercial farmland, increasing rural population density there",
      "Villagised A1 areas have a clustered pattern, which makes services easier to deliver",
      "New schools, clinics and boreholes were built over time, but early provision lagged behind the arrival of households",
      "Roads and farm infrastructure were often in poor condition, and electricity was limited",
      "New business centres and markets grew at junctions, while some existing centres lost the demand of former commercial farms",
      "Farm workers in compounds faced loss of jobs or housing, and some moved to towns or informal settlements",
      "Tenure security and access to credit affected investment in houses and farms",
      "Judgement: the reform created many new settlements and extended land access, but the development of services and infrastructure lagged, so its effect has been mixed and depends on local conditions",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Land reform created many new rural settlements by settling households on former commercial farms, which raised population density there. In villagised A1 areas homes are clustered, so services are easier to deliver, but in dispersed self-contained and A2 areas they cost more. New schools, clinics and boreholes were built over time, but provision lagged behind the arrival of households, and roads and electricity were often inadequate. New business centres grew at junctions, while some existing centres lost the demand of former commercial farms, and farm workers in compounds faced loss of jobs or housing. Secure tenure and access to credit affect how much people invest in their houses and farms. Overall the effects on settlement development have been mixed: many more households have access to land, but services and infrastructure have developed slowly and unevenly.",
    wordLimit: { max: 300 },
    explanation: "Balanced assessment of effects on settlements, services and different groups.",
    hints: ["Cover settlement pattern, services, groups affected and a judgement."],
  });

  b.card("DEFINITION", "Land reform?", "A change in the ownership, control or use of land to make its distribution more equal or more productive.");
  b.card("CONCEPT", "Why did land reform take place in Zimbabwe?", "Unequal land distribution at independence, overcrowded communal areas, expectations after the liberation struggle, and slow early resettlement.");
  b.card("FACT", "Early land laws?", "Land Apportionment Act (1930) and Land Tenure Act (1969) reserved the better land mainly for white commercial farmers.");
  b.card("FACT", "Lancaster House (1979) and land?", "For the first ten years land acquisition had to be on a willing buyer, willing seller basis.");
  b.card("CONCEPT", "A1 model?", "Small plots for household farming, either villagised (clustered homes, shared grazing) or self-contained (house and fields on one farm).");
  b.card("CONCEPT", "A2 model?", "Larger plots for small to medium commercial farming, with dispersed homesteads.");
  b.card("CONCEPT", "Settlement effects of resettlement?", "New settlements and higher density on former farms; services lagged; new business centres; changes for farm workers.");
  b.card("CONCEPT", "Why does a villagised layout help service provision?", "Clustered households share a school, clinic or borehole and reduce the cost per household.");
  b.card("CONCEPT", "Why does secure tenure matter?", "Farmers invest in buildings and equipment and can borrow money if they are sure of their land rights.");
});
