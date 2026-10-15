// W4a: settle.growth-points (ZIMSEC Form 5). Illustrative data; policy facts general. Numbers computed in code.
import { concept, P, t, chk, rnd, table, geographyLevels, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const compound = (p0, p1, years) => ((p1 / p0) ** (1 / years) - 1) * 100;
const rate = compound(3600, 6300, 15); // 3.80
chk(Math.round(rate * 10) / 10, 3.8, 1e-9);
const incr = chk(((6300 - 3600) / 3600) * 100, 75, 1e-9);
// services checklist
const SV = [
  ["Primary school", 1, 1], ["Secondary school", 1, 1], ["Clinic", 1, 1], ["Bank agency or mobile money outlet", 0, 1],
  ["Produce market", 1, 1], ["Bus terminus", 1, 1], ["Police station", 0, 1], ["Grinding mill", 1, 0],
  ["Fuel outlet", 0, 1], ["Piped water", 0, 1], ["Electricity", 0, 0], ["Mobile network coverage", 1, 1],
];
const cC = sum(SV.map((r) => r[1]));
const cD = sum(SV.map((r) => r[2]));
chk(cC, 7);
chk(cD, 10);
const pctC = (cC / 12) * 100; // 58.33
const pctD = (cD / 12) * 100; // 83.33
const tabSv = table(["Service", "Growth point C", "Growth point D"], SV.map((r) => [r[0], r[1] ? "Yes" : "No", r[2] ? "Yes" : "No"]));
const pctStands = chk((96 / 160) * 100, 60, 1e-9);
const J = [["Trade and hospitality", 120], ["Government, schools and clinics", 210], ["Transport", 45], ["Milling, carpentry and brickmaking", 60], ["Construction", 35]];
chk(sum(J.map((r) => r[1])), 470);
const pctServ = (210 / 470) * 100; // 44.68
const tabJ = table(["Type of employment", "Jobs"], J);

concept("ageo.settle.growth-points", { file: "settle/growth-points", keyPrefix: "settle.growth-points" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a growth point in Zimbabwe?",
    ok: ["A rural centre designated by government for planned development of services and jobs", "Correct: it is meant to stimulate development in the surrounding area."],
    bad: [["Any large city with a rapidly growing population", "Growth points are planned rural centres, not large cities."], ["A farm that produces high yields", "A growth point is a settlement, not a farm."], ["A temporary mining camp that closes after the minerals are exhausted and the workers have left", "Growth points are intended to be permanent centres."]],
    explanation: "Growth points are rural settlements chosen for planned development as service and market centres.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which was an aim of the growth point policy?",
    ok: ["To bring services and jobs to rural areas and reduce migration to big cities", "Correct: this is the central aim."],
    bad: [["To close small rural schools and clinics and move the staff to the large cities", "The policy aimed to provide services, not close them."], ["To move all rural people into the capital", "It aimed to reduce, not increase, movement to the capital."], ["To stop all farming near towns", "Farming remained the basis of the rural economy."]],
    explanation: "Growth points were intended to spread development, create jobs and provide services near rural people.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "In growth pole theory, what are spread effects?",
    ok: ["Benefits that move from the growth centre to the surrounding area", "Correct: demand for food, labour and services spreads the gains."],
    bad: [["Resources drawn from the surrounding area into the centre", "That describes backwash effects."], ["The expansion of the built-up area of a town into the surrounding farmland", "That is urban sprawl."], ["The spread of disease from town to country", "This is not the meaning in the theory."]],
    explanation: "Spread effects are the positive effects on the region around a centre; backwash effects are the negative ones.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which problem has most often limited the growth of growth points?",
    ok: ["Shortages of investment and basic infrastructure such as electricity and water", "Correct: investors will not locate where services are unreliable."],
    bad: [["Too many factories competing for workers", "Few industries were attracted to them."], ["An excess of money for local councils", "Funding has been limited."], ["A government ban on all new businesses and all new investment in rural areas and towns", "No such ban exists; the problem was too little investment."]],
    explanation: "Without reliable electricity, water and roads, firms prefer the big cities, so jobs did not grow fast enough.",
    hints: ["What do investors need before they build a factory?"],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A growth point lies in a district that grows cotton and sunflowers. Which project best uses local resources?",
    ok: ["A ginnery and oil press that process the district's cotton and sunflower seed", "Correct: it adds value to local crops and creates jobs."],
    bad: [["A car assembly plant using imported parts and selling to distant markets", "It relies on imported inputs and a distant market."], ["A deep-sea fishing company", "There is no sea; this does not use local resources."], ["A luxury ski resort", "The climate and resources do not support it."]],
    explanation: "Processing local crops uses local resources, supports farmers and creates jobs near where the raw material is produced.",
    hints: ["Which option uses what the district produces?"],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which measure would do most to attract firms to a growth point?",
    ok: ["Reliable electricity, water and roads together with serviced land", "Correct: infrastructure lowers the cost of doing business."],
    bad: [["Closing the local market to outside traders and travelling buyers", "This reduces trade."], ["Removing the local clinic and secondary school", "Services attract workers and firms."], ["Raising business licence fees", "Higher costs would discourage new firms."]],
    explanation: "Firms need reliable energy, water, transport and land, as well as a market and skilled workers.",
    hints: ["What lowers costs for a new firm?"],
  });

  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`A growth point had 3 600 people in 2008 and 6 300 in 2023 (illustrative data). Calculate the annual compound growth rate, as a percentage to one decimal place, using $r = \left[(P_1/P_0)^{1/n} - 1\right] \times 100$.`,
    value: rate, dp: 1, unit: "%", wrong: [5, 75],
    explanation: t`1. $P_1/P_0 = 6\,300 / 3\,600 = 1.75$ and $n = 15$.\n2. $1.75^{1/15} = 1.0380$.\n3. $r = (1.0380 - 1) \times 100 = 3.8\%$ a year.\n4. 5% divides the total increase by the number of years (75 ÷ 15), which ignores compounding; 75% is the total increase.`,
    hints: ["Take the 15th root of the ratio of the two populations."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true, calculator: true,
    stem: "Of 160 serviced stands in a growth point, 96 have buildings on them. Calculate the percentage of stands that have been developed.",
    value: pctStands, unit: "%", wrong: [64, 1.67],
    explanation: "96 ÷ 160 × 100 = 60%. 64 is the number of undeveloped stands.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A growth point has 470 jobs, of which 210 are in government, schools and clinics. Calculate the percentage of jobs in these services, to the nearest whole number.",
    value: pctServ, dp: 0, unit: "%", wrong: [210, 22],
    explanation: "210 ÷ 470 × 100 = 44.7%, which is 45% to the nearest whole number.",
    hints: ["Divide the number of service jobs by the total number of jobs."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The growth point policy completely stopped migration from rural areas to the large cities.",
    answer: false,
    explanation: "False. Growth points improved services in some places, but many did not create enough jobs, and migration to the large cities continued.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Growth points are located in the hierarchy between rural service centres and towns.",
    answer: true,
    explanation: "True. They offer more services than a rural service centre, but fewer than a large town.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each project to the local resource it uses.",
    pairs: [
      ["Maize milling", "Locally grown maize"],
      ["Brickmaking", "Local clay and sand"],
      ["Cotton ginning", "Locally grown cotton"],
      ["Craft and tourism enterprises", "Local culture and scenery"],
    ],
    explanation: "Successful rural enterprises add value to what the local area already produces.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "The growth pole idea was proposed by {{blank:a}}. The benefits that spread to the surrounding region are called {{blank:b}} effects.",
    blanks: [
      { id: "a", accepted: ["Perroux"], choices: ["Perroux", "Christaller", "Malthus", "Burgess"] },
      { id: "b", accepted: ["spread"], choices: ["spread", "backwash", "multiplier"] },
    ],
    explanation: "François Perroux developed the growth pole idea in the 1950s; positive effects on the region are spread effects.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to the benefits that spread from a growth centre to the area around it?",
    accepted: ["spread effects", "spread effect", "spread"],
    wrong: ["backwash effects", "trickle"],
    explanation: "Spread effects are the positive influences on the surrounding area; backwash effects are the negative ones.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which type of local authority administers many growth points in Zimbabwe?",
    accepted: ["rural district council", "RDC", "rural district councils", "a rural district council"],
    wrong: ["city council", "provincial council"],
    explanation: "Rural district councils administer many growth points, with local boards in some cases.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the Zimbabwean government introduced the growth point policy.",
    points: ["To spread development to rural areas and reduce the gap between rural and urban living standards", "To create jobs and slow migration to the big cities", "To concentrate investment in a few centres so that services reach people efficiently"],
    modelAnswer: "The government wanted to spread development to rural areas and reduce the gap between rural and urban living standards. Growth points were to create jobs and slow migration to the big cities, and concentrating investment in a few centres allowed services to reach people efficiently.",
    explanation: "Development gap, jobs and migration, and efficient use of investment.",
    hints: ["Think of rural living standards and migration."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the services and facilities that a typical growth point provides.",
    points: ["Social services such as primary and secondary schools, a clinic and a police station", "Economic services such as shops, a produce market, a grinding mill, a bank agency or mobile money outlet and fuel", "Infrastructure such as roads, a bus terminus, piped water and electricity"],
    modelAnswer: "A growth point has schools, a clinic and a police station. It also has shops, a produce market, a grinding mill, a bank agency or mobile money outlet and fuel, and infrastructure such as roads, a bus terminus, piped water and electricity.",
    explanation: "Social, economic and infrastructure services.",
    hints: ["Group them as social, economic and infrastructure."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain two reasons why some growth points have grown slowly.",
    points: ["Few investors have been attracted because electricity, water and roads are unreliable", "Government funds for infrastructure and housing have been limited", "There are weak links with farmers, so few local products are processed", "Better markets, services and infrastructure in the large cities attract firms and migrants"],
    modelAnswer: "Few investors have been attracted because electricity, water and roads are unreliable, and government funds for infrastructure and housing have been limited. Markets and services are also better in the large cities, which continue to attract firms and migrants.",
    explanation: "Any two reasons, each developed.",
    hints: ["Think about what firms need and who pays for it."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four ways in which the growth of a named growth point could be speeded up.",
    points: ["Provide reliable electricity, water and roads", "Set up agro-processing such as milling, oil pressing or fruit drying using local crops", "Offer incentives such as cheaper serviced land, tax breaks and credit to small businesses", "Train local people in skills and business management and improve public transport and internet access"],
    modelAnswer: "Provide reliable electricity, water and roads, set up agro-processing such as milling or oil pressing using local crops, offer incentives such as cheaper serviced land and credit to small businesses, and train local people and improve public transport and internet access.",
    explanation: "Infrastructure, local processing, incentives and skills.",
    hints: ["Start with what investors need."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `Researchers used a checklist of 12 services to compare two growth points (illustrative data).\n\n${tabSv}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of the 12 services that are present in Growth point D, to one decimal place.", value: pctD, dp: 1, unit: "%", wrong: [10, 8.3], explanation: "Growth point D has 10 of the 12 services: 10 ÷ 12 × 100 = 83.3%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which statement is correct?", options: [["Growth point D is better provided with services than Growth point C", "Correct: D has 10 of 12 services and C has 7."], ["Growth point C is better provided with services than Growth point D", "C has fewer services."], ["Both have the same number of services", "The totals are different."], ["Neither has a clinic", "Both have a clinic."]], answer: "A", explanation: "Counting the Yes answers gives D 10 and C 7." }),
      P.manual({ label: "(c)", marks: 3, stem: "Describe the differences in services between the two growth points.", points: ["Growth point D has 10 of the 12 services and C has only 7", "C lacks a bank agency or mobile money, a police station, a fuel outlet and piped water, which D has", "Neither has electricity, and D lacks a grinding mill, which C has"], modelAnswer: "Growth point D has 10 of the 12 services and C has only 7. C lacks a bank agency or mobile money outlet, a police station, a fuel outlet and piped water, which D has. Neither has electricity, and D lacks a grinding mill, which C has.", explanation: "Quote the counts and name differences." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the lack of electricity could limit the growth of both centres.", points: ["Firms using machinery, such as mills, welders and cold rooms, cannot operate without power", "Businesses such as shops and hair salons cannot keep goods cold or work in the evening, and pupils cannot study at night", "Investors choose places with power, so the growth points will continue to lose firms to larger centres"], modelAnswer: "Firms using machinery cannot operate without power. Shops and salons cannot keep goods cold or work in the evening, and pupils cannot study at night. Investors choose places with power, so the growth points will keep losing firms to larger centres.", explanation: "Link power to production, services and investment." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest measures that would bring electricity and more services to Growth point C.", points: ["Extend the grid or install solar mini-grids with funds from government, the rural electrification fund or donors", "Encourage private investment in banks, fuel and water supply through incentives and serviced land", "Give the rural district council more funds and allow it to retain local revenue for services"], modelAnswer: "The grid could be extended or solar mini-grids installed with funds from government or donors. Private investment in banks, fuel and water supply could be encouraged through incentives and serviced land, and the rural district council could be given more funds and allowed to retain local revenue.", explanation: "Funding, private investment and local authority capacity." }),
    ],
    explanation: "Use a services checklist to compare growth points and plan improvements.",
    hints: ["Count the Yes answers for each growth point."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `A growth point grew from 3 600 people to 6 300 people in 15 years. Its employment is shown below (illustrative data).\n\n${tabJ}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage increase in population over the 15 years.", value: incr, unit: "%", wrong: [2700, 57], explanation: "(6 300 − 3 600) ÷ 3 600 × 100 = 75%. 57 divides by the new value." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which sector provides the largest number of jobs?", options: [["Government, schools and clinics", "Correct: 210 jobs, the largest group."], ["Trade and hospitality", "Trade has 120 jobs."], ["Milling, carpentry and brickmaking", "Industry has only 60 jobs."], ["Transport", "Transport has only 45 jobs."]], answer: "A", explanation: "210 of the 470 jobs are in government services." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the small number of jobs in milling, carpentry and brickmaking is a problem for the growth point.", points: ["Few jobs in production means that the growth point depends on government spending and local trade", "It adds little value to local crops and resources, so incomes in the surrounding area stay low", "Without industrial jobs, young people may leave for the big cities, so population growth may slow"], modelAnswer: "Few jobs in production means that the growth point depends on government spending and local trade. It adds little value to local crops and resources, so incomes in the surrounding area stay low, and without industrial jobs young people may leave for the big cities.", explanation: "Dependence, low value added and migration." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two industries that the growth point could develop using local resources.", points: ["Agro-processing such as grain milling, oil pressing or fruit drying using local crops", "Brick, furniture or leather products using local clay, timber and hides"], modelAnswer: "Agro-processing such as grain milling, oil pressing or fruit drying, and brick, furniture or leather products using local clay, timber and hides.", explanation: "Any two sensible industries tied to local resources." }),
    ],
    explanation: "Calculate population change and interpret employment in a growth point.",
    hints: ["Find the increase, then divide by the starting value."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the success of the growth point policy in Zimbabwe. [8]",
    points: [
      "States the aims: spread development, create jobs, provide services and reduce migration to the big cities",
      "Success: schools, clinics, markets, shops and transport have been provided to rural people",
      "Success: some growth points have grown into thriving service and market centres and attracted some local enterprises",
      "Problem: many growth points have limited industry and jobs, so people still migrate to the cities",
      "Problem: shortages of electricity, water, roads and housing, and unsold or undeveloped serviced stands",
      "Problem: limited funding and weak links with farmers, so little value is added to local crops",
      "Success depended on local resources and the quality of local leadership, so results differ between growth points",
      "Judgement: partly successful in bringing services but less successful in creating employment, so mixed overall",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The policy aimed to spread development, create jobs, provide services and reduce migration to the big cities. It has been successful in bringing schools, clinics, markets, shops and transport to rural people, and some growth points have grown into thriving service and market centres with local enterprises. However, many have limited industry and jobs, so people still migrate to the cities. Shortages of electricity, water, roads and housing, unsold serviced stands, limited funding and weak links with farmers have also held growth back, so little value is added to local crops. Results differ between growth points according to their local resources and leadership. Overall the policy has been partly successful in providing services but less successful in creating employment.",
    wordLimit: { max: 300 },
    explanation: "Weigh successes against problems with evidence and give a judgement.",
    hints: ["Compare the aims with the results."],
  });

  b.card("DEFINITION", "Growth point?", "A rural settlement designated by the government for planned development of services, infrastructure and jobs, to serve and stimulate the surrounding area.");
  b.card("CONCEPT", "Growth pole theory?", "Perroux (1950s): development concentrates in a centre and spreads to the region (spread effects); backwash effects are the negative drain on the region.");
  b.card("CONCEPT", "Aims of the growth point policy?", "Spread development, create jobs, provide services near people, reduce rural-urban migration, concentrate investment efficiently.");
  b.card("CONCEPT", "Typical services at a growth point?", "Schools, clinic, police, shops, produce market, mill, bank agency or mobile money, fuel, bus terminus, water, electricity.");
  b.card("CONCEPT", "Successes of the policy?", "Better access to services and markets for rural people; some jobs; some centres have grown into towns.");
  b.card("CONCEPT", "Problems of the policy?", "Limited jobs and industry, unreliable electricity and water, unsold stands, limited funds, weak links with farmers, continued migration.");
  b.card("CONCEPT", "Projects using local resources?", "Grain milling, oil pressing, cotton ginning, brick and furniture making, fruit drying, crafts and tourism, solar services.");
  b.card("CONCEPT", "Measures for future growth?", "Reliable infrastructure, incentives, links with farmers, skills training, more funds for local authorities, better transport.");
  b.card("FORMULA", "Annual compound growth rate?", t`$r = \left[(P_1 / P_0)^{1/n} - 1\right] \times 100$`);
});
