// W4a: settle.site-location-functions (ZIMSEC Form 5). Illustrative data; settlement facts general. Numbers computed in code.
import { concept, P, t, chk, table, geographyLevels, sum } from "../lib.mjs";
import { mc, fmt } from "../tables/w4a-_h.mjs";

const W = [["Water supply", 5, 3, 5, 4], ["Gentle slope", 2, 5, 3, 4], ["Well-drained soil", 3, 4, 2, 5], ["Road access", 4, 5, 3, 2]];
const tot = (i) => sum(W.map((r) => r[1] * r[i]));
const totP = chk(tot(2), 57);
chk(tot(3), 49);
const totQ2 = chk(4 * 5 + 3 * 2 + 2 * 4 + 1 * 3, 37);
const totR = chk(tot(4), 51);
const maxScore = chk(5 * sum(W.map((r) => r[1])), 70);
const pctP = (totP / maxScore) * 100; // 81.43
const tabS = table(["Criterion", "Weight", "Site P", "Site Q", "Site R"], W);
const J = [["Mining", 3040], ["Retail and wholesale", 1520], ["Government and services", 1360], ["Transport and storage", 640], ["Manufacturing", 560], ["Other", 880]];
chk(sum(J.map((r) => r[1])), 8000);
const pctMining = chk((3040 / 8000) * 100, 38, 1e-9);
const pctRG = chk(((1520 + 1360) / 8000) * 100, 36, 1e-9);
const tabJ = table(["Sector", "Jobs"], J.map((r) => [r[0], fmt(r[1])]));

concept("ageo.settle.site-location-functions", { file: "settle/site-location-functions", keyPrefix: "settle.site-location-functions" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which statement correctly defines the site of a settlement?",
    ok: ["The actual land on which the settlement is built", "Correct: the site is described by slope, soil, water and shelter."],
    bad: [["Its position relative to roads, rivers and other towns", "That is its situation."], ["The main activity of its people", "That is its function."], ["The area from which it draws customers", "That is its sphere of influence."]],
    explanation: "Site is the ground a settlement stands on; situation is its position in relation to surroundings.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which feature is part of the situation, not the site, of Beitbridge?",
    ok: ["It lies where the main road and railway to South Africa cross the Limpopo", "Correct: this describes its position on a trade route."],
    bad: [["It is built on a river bank with access to water for people and for farming", "This describes the physical site."], ["Its ground is flat and well drained", "This describes the physical site."], ["Its soils are suitable for building", "This describes the physical site."]],
    explanation: "Situation describes position relative to routes, borders and other places; site describes the local ground.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a bridging point?",
    ok: ["A place where a river can easily be crossed", "Correct: routes meet at a crossing and settlements grow there."],
    bad: [["A spring or river giving a reliable water supply", "That is a wet point."], ["A hilltop above a marsh", "That is a dry point."], ["A place where minerals are found", "That is a resource site."]],
    explanation: "Bridging points are crossings of rivers where routes converge, so trade and settlement concentrate there.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Kariba town was established in the 1950s. Which factor explains its location?",
    ok: ["The construction of the dam on the Zambezi, which needed a workers' town", "Correct: a specific project created the settlement."],
    bad: [["The surrounding Highveld farmland", "Kariba lies in the hot Zambezi valley, not on the Highveld."], ["A central position on the national railway", "Its position is at the edge of the country, not central."], ["Coal reserves close to the surface, which led to the growth of Hwange", "Coal is the reason for Hwange."]],
    explanation: "Kariba was built for the people constructing and then operating the dam and power station.",
    hints: ["Think of what was being built there."],
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which flow is from a town to the rural area around it?",
    ok: ["Manufactured goods, fertiliser and mobile phone services", "Correct: towns supply goods and services to rural areas."],
    bad: [["Maize and vegetables for sale", "These flow from rural to urban areas."], ["Young migrants looking for jobs and services in the towns", "This flows from rural to urban areas."], ["Firewood and raw materials", "These flow from rural to urban areas."]],
    explanation: "Rural areas supply food, labour and raw materials; towns supply manufactured goods, services, information and money (wages, payments).",
    hints: ["Which goods does a rural area not produce for itself?"],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A town has 38% of jobs in mining, 19% in retail and 17% in government. What is its main function?",
    ok: ["Mining, with a secondary role as a service centre", "Correct: mining has the largest share of jobs."],
    bad: [["Manufacturing, with a secondary role as a service centre", "Manufacturing has only a small share."], ["Tourism", "No tourism jobs are mentioned."], ["Agriculture", "No farm jobs are mentioned."]],
    explanation: "The sector with the largest share of jobs identifies the main function; retail and government give the town a service role.",
    hints: ["Which sector has the largest share?"],
  });

  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Three possible sites for a village clinic are scored from 1 (poor) to 5 (excellent) on four criteria. Each criterion has a weight. Scores for Site Q are: water 5, slope 2, drainage 4, access 3 and the weights are: water 4, slope 3, drainage 2, access 1. Calculate the weighted total for Site Q.`,
    value: totQ2, wrong: [14, 10], explanation: "Weighted total = 4 × 5 + 3 × 2 + 2 × 4 + 1 × 3 = 20 + 6 + 8 + 3 = 37. Adding the unweighted scores gives 14.",
    hints: ["Multiply each score by its weight before adding."],
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "The maximum weighted score for a site is 70 and Site P scores 57. Express Site P's score as a percentage of the maximum, to one decimal place.",
    value: pctP, dp: 1, unit: "%", wrong: [12.3, 57],
    explanation: "57 ÷ 70 × 100 = 81.4%. Giving 12.3 divides the difference (13) by 70 wrongly, and 57 forgets to convert to a percentage.",
    hints: ["Divide the score by the maximum."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "A town has 8 000 jobs, of which 3 040 are in mining. Calculate the percentage of jobs in mining.",
    value: pctMining, unit: "%", wrong: [3.04, 62],
    explanation: "3 040 ÷ 8 000 × 100 = 38%.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A town can have more than one function.",
    answer: true,
    explanation: "True. Most towns have several functions, such as trade, administration and manufacturing, though one is usually dominant.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rural-urban interaction involves flows from rural areas to towns only.",
    answer: false,
    explanation: "False. Flows go both ways: food, labour and raw materials from rural areas; goods, services, money and information from towns.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each early settlement site to its description.",
    pairs: [
      ["Wet point", "A spring or river giving a water supply"],
      ["Dry point", "Higher ground above a marsh or floodplain"],
      ["Bridging point", "Where a river can be crossed"],
      ["Nodal point", "Where several routes meet"],
    ],
    explanation: "Each term describes a physical or route-related advantage.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "The actual ground on which a settlement stands is its {{blank:a}}, whereas its position relative to other places is its {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["site"], choices: ["site", "situation", "function"] },
      { id: "b", accepted: ["situation"], choices: ["site", "situation", "hierarchy"] },
    ],
    explanation: "Site is the local ground; situation is the wider position.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which pattern of rural settlement has houses close together around a water source or crossroads?",
    accepted: ["nucleated", "clustered", "nucleated settlement", "nucleated pattern", "clustered pattern"],
    wrong: ["dispersed", "linear"],
    explanation: "Nucleated (clustered) settlements have houses grouped together; dispersed ones are scattered; linear ones follow a road or river.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to a settlement pattern in which homes are strung out along a road or river?",
    accepted: ["linear", "linear settlement", "linear pattern", "ribbon", "ribbon settlement"],
    wrong: ["nucleated", "dispersed"],
    explanation: "Linear settlements follow a line such as a road, railway or river.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a reliable water supply is important in choosing the site of a settlement.",
    points: ["People need water for drinking, cooking and washing", "Water is needed for crops, livestock and, later, industry", "A source close by saves time and reduces the risk of disease"],
    modelAnswer: "People need water for drinking, cooking and washing. It is also needed for crops, livestock and later for industry, and a nearby source saves time and reduces the risk of disease.",
    explanation: "Link water to people, production and health.",
    hints: ["Think of households, farming and health."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the flows of goods between a town and the rural area around it.",
    points: ["Food such as maize, vegetables and livestock flows from rural areas to the town market", "Raw materials and firewood flow from rural areas to the town", "Manufactured goods, fertiliser, seed and fuel flow from the town to rural areas"],
    modelAnswer: "Food such as maize, vegetables and livestock flows from rural areas to the town market, together with raw materials and firewood. In the other direction manufactured goods, fertiliser, seed and fuel flow from the town to rural areas.",
    explanation: "Name goods in each direction.",
    hints: ["Think of both directions."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why Beitbridge developed as a transport and trade centre.",
    points: ["It lies on the Limpopo on the border with South Africa", "The main road and railway to South Africa cross the river there, so it is a nodal and bridging point", "Border customs, immigration and clearing agents create jobs", "Trucks and travellers need fuel, accommodation and food, which supports services"],
    modelAnswer: "Beitbridge lies on the Limpopo on the border, where the main road and railway to South Africa cross the river. Customs, immigration and clearing agents create jobs, and the trucks and travellers passing through need fuel, accommodation and food.",
    explanation: "Situation on a route, border functions and services.",
    hints: ["Which route crosses the river there?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four ways of improving links between a rural area and the nearest town.",
    points: ["Upgrade roads and bridges and improve public transport", "Build rural markets and storage so farmers can sell produce", "Improve mobile network coverage and mobile money for information and payments", "Locate clinics, schools, agro-dealers and extension services in rural service centres, with electricity"],
    modelAnswer: "Roads, bridges and public transport can be upgraded so farmers and customers can travel easily. Rural markets and storage let farmers sell produce, better mobile coverage and mobile money give access to information and payments, and rural service centres can provide clinics, schools and extension services.",
    explanation: "Any four valid improvements.",
    hints: ["Think of transport, markets, communication and services."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Planners scored three possible sites (P, Q and R) for a new market town. Scores run from 1 (poor) to 5 (excellent) and each criterion has a weight (illustrative data).\n\n${tabS}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the weighted total for Site R.", value: totR, wrong: [15, 54], explanation: "5 × 4 + 2 × 4 + 3 × 5 + 4 × 2 = 20 + 8 + 15 + 8 = 51." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which site has the highest weighted total?", options: [["Site P", "Correct: P scores 57, Q scores 49 and R scores 51."], ["Site Q", "Q has the lowest total (49)."], ["Site R", "R scores 51, below P."], ["Sites P and R tie", "Their totals are different."]], answer: "A", explanation: "P: 15 + 10 + 12 + 20 = 57." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why water supply has the highest weight.", points: ["Settlements cannot survive without a reliable supply for drinking and sanitation", "Water is needed for farming and other activities that give people a livelihood", "Supplying water from far away is very costly, so a good local supply saves money"], modelAnswer: "A settlement cannot survive without a reliable supply for drinking and sanitation. Water is also needed for farming and other livelihoods, and bringing water from far away is very costly.", explanation: "Link water to survival, livelihood and cost." }),
      P.manual({ label: "(d)", marks: 3, stem: "Give three limitations of a weighted-score method.", points: ["The weights are a matter of judgement and different planners would choose different ones", "Scores of 1 to 5 hide differences in the data and may be inaccurate", "The method leaves out costs, local opinion and environmental or cultural factors, and a poor score on one criterion can be hidden by good scores on others"], modelAnswer: "The weights are a matter of judgement, so different planners would choose different ones. The 1 to 5 scores hide differences in the data. The method also leaves out costs, local opinion and environmental or cultural factors, and a very poor score on one criterion can be hidden by good scores on others.", explanation: "Subjectivity, simplification and omissions." }),
      P.manual({ label: "(e)", marks: 3, stem: "Describe how a GIS could be used to help choose between the sites.", points: ["Layers of rivers, slope, soils, flood zones and roads are stored in the GIS", "Each layer is scored and weighted and the layers are combined (weighted overlay) to give a suitability map", "The map is checked against field visits and local knowledge before a decision is made"], modelAnswer: "A GIS stores layers of rivers, slope, soils, flood zones and roads. Each layer is scored and weighted and the layers are combined in a weighted overlay to give a suitability map, which is then checked against field visits and local knowledge.", explanation: "Layers, overlay and checking." }),
    ],
    explanation: "Weighted site-suitability scores and the limits of the method.",
    hints: ["Multiply each score by its weight, then add."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows employment in a mining town (illustrative data).\n\n${tabJ}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the combined percentage of jobs in retail and wholesale and in government and services.", value: pctRG, unit: "%", wrong: [2880, 19], explanation: "(1 520 + 1 360) ÷ 8 000 × 100 = 36%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which is the main function of the town?", options: [["Mining", "Correct: it has the largest share (3 040 of 8 000 jobs)."], ["Manufacturing", "Only 560 jobs are in manufacturing."], ["Transport", "Only 640 jobs are in transport and storage."], ["Retail", "Retail is second, with 1 520 jobs."]], answer: "A", explanation: "Mining has 38% of the jobs." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two other functions of the town shown in the table.", points: ["Retail and wholesale (a market or shopping function)", "Government and services (administration, education or health)"], modelAnswer: "Retail and wholesale, and government and services such as administration, education or health.", explanation: "Any two of the secondary functions." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the closure of the mine would affect the other functions of the town.", points: ["Mine workers lose their jobs and wages, so spending in shops and services falls", "Retail, transport and service jobs are lost because of the reduced demand (multiplier effect)", "Some families move away and the population and tax base fall, so services decline"], modelAnswer: "Mine workers would lose their wages, so spending in shops and services would fall. Jobs in retail, transport and services would then be lost, and some families would move away, reducing the population and the money available for services.", explanation: "Loss of income spreads to other sectors." }),
    ],
    explanation: "Identify functions from employment data and assess dependence on one activity.",
    hints: ["Add the two jobs figures before dividing by the total."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of situation compared with site in the growth of Beitbridge or another named Zimbabwean town. [8]",
    points: [
      "States the town chosen and defines site and situation",
      "Situation: position on a key route or border or near a resource (for example Beitbridge on the main road and railway to South Africa)",
      "Situation creates its functions: customs, transport services, fuel, accommodation",
      "Site: access to river water and land suitable for building",
      "Site is necessary but not sufficient: many places have water and flat land but did not become towns",
      "Situation attracts investment and migrants, which increases size and the number of functions",
      "Risks of dependence on one route or on policy and trade volumes, shown by the effect of border delays or changes in trade",
      "Judgement: situation is the main reason for growth, with site providing the basic conditions",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Site is the ground on which a town stands and situation is its position relative to other places. Beitbridge's situation, where the main road and railway to South Africa cross the Limpopo, is the main reason for its growth because it gave the town its functions in customs, transport, fuel, accommodation and trade, and attracted investment and migrants. Its site on the river bank provides water and land for building, but many places have water and flat land and never became towns, so site was necessary but not sufficient. The town is also dependent on a single route and on trade volumes, so border delays or policy changes affect it. Overall situation was more important than site, with site providing the basic conditions.",
    wordLimit: { max: 300 },
    explanation: "Compare the roles of site and situation with specific facts and judge.",
    hints: ["What did the town need that the site alone could not give?"],
  });

  b.card("DEFINITION", "Site?", "The actual land a settlement is built on, described by slope, soil, water and shelter.");
  b.card("DEFINITION", "Situation?", "The position of a settlement relative to its surroundings: routes, resources, borders and other settlements.");
  b.card("DEFINITION", "Settlement function?", "The main activity a settlement performs (administration, trade, mining, manufacturing, transport, tourism or residence).");
  b.card("CONCEPT", "Wet point, dry point, bridging point, nodal point?", "Wet point: spring or river. Dry point: high ground above marsh. Bridging point: river crossing. Nodal point: meeting of routes.");
  b.card("CONCEPT", "Patterns of rural settlement?", "Nucleated (clustered), dispersed (scattered) and linear (along a road or river).");
  b.card("CONCEPT", "Flows between rural and urban areas?", "People, goods, money and information move both ways: food, labour and raw materials to towns; goods, services, wages and information to rural areas.");
  b.card("CONCEPT", "Weighted site-suitability score?", "Multiply each criterion's score by its weight and add; the highest total is the most suitable, but weights are a judgement.");
  b.card("FACT", "Why did Kariba town grow?", "It was established in the 1950s for the construction and operation of the Kariba dam on the Zambezi.");
  b.card("FACT", "Why is Beitbridge a border town?", "It lies where the main road and railway to South Africa cross the Limpopo: customs, transport and trade services.");
});
