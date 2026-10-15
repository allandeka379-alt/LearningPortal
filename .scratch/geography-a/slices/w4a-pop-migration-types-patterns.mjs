// W4a: pop.migration-types-patterns (ZIMSEC Form 6; Cambridge AS). Illustrative data; UN 2020 migrant stock (about 280 million, 3.6%) rounded.
import { concept, P, t, chk, rnd, table, geographyLevels, sum } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const migShare = (3.5 / 41) * 100; // 8.54
const gravB = ((80 / 20 ** 2) / (500 / 100 ** 2 + 80 / 20 ** 2 + 180 / 60 ** 2)) * 100; // 66.67
chk(Math.round(gravB * 10) / 10, 66.7, 1e-9);
const popChange = chk(((15000 - 5000 + 8000 - 3000) / 500000) * 100, 3, 1e-9);
// Struct 1: survey in Mutare
const ORIG = [["Rural districts of Manicaland", 112], ["Other towns in Zimbabwe", 40], ["Mozambique", 36], ["Elsewhere", 12]];
const REAS = [["Work", 98], ["Education", 40], ["Family", 34], ["Conflict or disaster", 28]];
chk(sum(ORIG.map((r) => r[1])), 200);
chk(sum(REAS.map((r) => r[1])), 200);
const pctRural = chk((112 / 200) * 100, 56);
const pctWorkEd = chk(((98 + 40) / 200) * 100, 69);
const tabO = table(["Place of origin", "Migrants"], ORIG);
const tabR = table(["Main reason for moving", "Migrants"], REAS);
// Struct 2: gravity
const ratioY = chk(75 / 15 ** 2 / (300 / 60 ** 2), 4, 1e-9);

concept("ageo.pop.migration-types-patterns", { file: "pop/migration-types-patterns", keyPrefix: "pop.migration-types-patterns" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which term describes a person who has fled their home because of conflict but remains inside their own country?",
    ok: ["Internally displaced person", "Correct: they have not crossed an international border."],
    bad: [["Refugee", "A refugee has crossed an international border."], ["Economic migrant seeking work abroad", "An economic migrant moves mainly for work."], ["Asylum seeker", "An asylum seeker applies for protection in another country."]],
    explanation: "An internally displaced person (IDP) is forced to flee but stays in their own country.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which example is forced migration?",
    ok: ["Families leaving Chimanimani after Cyclone Idai destroyed their homes in 2019", "Correct: the disaster compelled them to move."],
    bad: [["A graduate moving to Harare after finishing university to take a better-paid job", "This is a voluntary move for work."], ["A family moving to a resettlement farm by choice", "This was a choice, even if influenced by policy."], ["A teacher accepting a post in another province", "This is a voluntary move for work."]],
    explanation: "Forced migration is caused by conflict, persecution or disaster. Moves for work, education or family are voluntary.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "According to Ravenstein, which statement about migration is correct?",
    ok: ["Most migrants move only a short distance", "Correct: short-distance moves are the commonest."],
    bad: [["Most migrants travel directly to the largest city", "Ravenstein described step-by-step migration."], ["Urban people migrate more than rural people", "Rural people were found to migrate more."], ["Migration is mainly caused by war", "Economic reasons were seen as dominant."]],
    explanation: "Ravenstein's laws include short-distance movement, step migration and the dominance of economic motives.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In Lee's push–pull model, which of these is an intervening obstacle?",
    ok: ["The cost of travel and immigration controls at a border", "Correct: obstacles lie between the origin and destination."],
    bad: [["Unemployment and low wages in the home area before leaving", "This is a push factor at the origin."], ["Higher wages in the destination", "This is a pull factor."], ["A person's age and family ties", "These are personal factors."]],
    explanation: "Intervening obstacles include distance, cost, laws and borders. Personal factors such as age and family are a separate group.",
    hints: ["Obstacles lie between the origin and the destination."],
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A family moves from a village to a small town, and later a child moves on to a large city. Which idea does this illustrate?",
    ok: ["Step migration", "Correct: migration often proceeds stage by stage up the settlement hierarchy."],
    bad: [["Circular migration", "Circular migration involves repeated return to the origin."], ["Forced migration", "No force is described."], ["Counter-flow", "A counter-flow is movement in the opposite direction."]],
    explanation: "Ravenstein observed step migration from villages to towns to cities.",
    hints: ["Think of moving in stages."],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "According to the gravity model, which place will attract the most migrants from a rural district?",
    ok: ["A moderately sized town that is very near", "Correct: distance is squared, so closeness has a very strong effect."],
    bad: [["The largest city, wherever it is", "Distance reduces attraction."], ["A small village far from the district", "It is small and far."], ["The place with the highest wages, whatever its size or distance", "The simple gravity model uses only size and distance."]],
    explanation: "Attraction is proportional to population and inversely proportional to distance squared, so a nearby town can outweigh a larger one that is far away.",
    hints: ["Which factor is squared?"],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Country G has a population of 41 million, of whom 3.5 million were born in another country (illustrative data). What percentage of the population is foreign-born? Give the answer to one decimal place.",
    value: migShare, dp: 1, unit: "%", wrong: [11.7, 0.85],
    explanation: "3.5 million ÷ 41 million × 100 = 8.5%. 11.7 comes from dividing by the number of foreign-born people (41 ÷ 3.5), and 0.85 from a decimal error.",
    hints: ["Use the same units for both numbers."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Rural district R sends migrants to three towns. The attraction index is population (in thousands) ÷ distance squared (km²). Town A has 500 thousand people at 100 km, Town B 80 thousand at 20 km and Town C 180 thousand at 60 km. Calculate Town B's share of the total attraction, as a percentage to one decimal place.",
    value: gravB, dp: 1, unit: "%", wrong: [0.2, 33.3],
    explanation: "A: 500 ÷ 10 000 = 0.05. B: 80 ÷ 400 = 0.20. C: 180 ÷ 3 600 = 0.05. Total = 0.30. Share of B = 0.20 ÷ 0.30 = 66.7%. 0.2 is the index, not the share, and 33.3% is the combined share of A and C.",
    hints: ["Work out the index for each town first."],
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A district of 500 000 people had 15 000 births, 5 000 deaths, 8 000 immigrants and 3 000 emigrants in one year. Calculate the total population growth rate, as a percentage.",
    value: popChange, unit: "%", wrong: [2, 1],
    explanation: "Natural increase = 15 000 − 5 000 = 10 000. Net migration = 8 000 − 3 000 = 5 000. Total change = 15 000. Growth rate = 15 000 ÷ 500 000 × 100 = 3%. Ignoring migration gives 2%.",
    hints: ["Add natural increase and net migration."],
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "More people migrate within countries than between countries.",
    answer: true,
    explanation: "True. Internal migration, especially rural to urban, involves far more people than international migration.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Most refugees in the world are hosted by countries far from their homeland.",
    answer: false,
    explanation: "False. Most refugees are hosted by neighbouring countries, for example Mozambicans in Zimbabwe's Tongogara camp.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [
      ["Asylum seeker", "A person who has applied for protection and awaits a decision"],
      ["Circular migration", "Repeated movement between home and a place of work"],
      ["Brain drain", "Emigration of skilled and educated people"],
      ["Net migration", "Immigrants minus emigrants"],
    ],
    explanation: "Each term describes a different aspect of migration.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "People who move because of conflict or disaster are {{blank:a}} migrants, while people who choose to move for work are {{blank:b}} migrants.",
    blanks: [
      { id: "a", accepted: ["forced"], choices: ["forced", "voluntary", "seasonal"] },
      { id: "b", accepted: ["voluntary"], choices: ["forced", "voluntary", "refugee"] },
    ],
    explanation: "The key difference is whether the move was a choice.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term describes the emigration of skilled and educated people such as nurses and teachers?",
    accepted: ["brain drain", "the brain drain", "skills drain"],
    wrong: ["step migration", "counter-urbanisation"],
    explanation: "The brain drain is the loss of skilled workers to other countries.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which type of migrant has been forced to flee but has not crossed an international border? Give the full term or its abbreviation.",
    accepted: ["internally displaced person", "IDP", "internally displaced people", "internally displaced persons", "internally displaced"],
    wrong: ["refugee", "asylum seeker"],
    explanation: "Internally displaced persons stay inside their own country.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the pattern of labour migration within southern Africa.",
    points: ["South Africa is the main destination for migrants from neighbouring countries such as Zimbabwe, Mozambique, Malawi and Lesotho", "Long-established flows to the mines and farms, including seasonal and circular movement", "Smaller flows to Botswana and other countries, and movement to towns and cities within countries"],
    modelAnswer: "South Africa is the main destination, drawing migrants from Zimbabwe, Mozambique, Malawi and Lesotho to its mines and farms, often seasonally. Smaller flows go to Botswana and other countries, and many people also move from rural areas to towns within their own countries.",
    explanation: "Name the main destination, the sources and the types of movement.",
    hints: ["Which country is the main destination?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what Lee meant by intervening obstacles.",
    points: ["Intervening obstacles lie between the place of origin and the destination", "Examples are distance, the cost of travel, border controls and visas, language and information", "A move occurs only if the pull of the destination is great enough to overcome them"],
    modelAnswer: "Intervening obstacles lie between the origin and the destination. They include distance, the cost of travel, border controls and visas, and language. A move occurs only if the pull of the destination is great enough to overcome them.",
    explanation: "Define, give examples and link to the decision to move.",
    hints: ["Think of what stands in the way of a move."],
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Distinguish between a refugee and an economic migrant.",
    points: ["A refugee has crossed a border to escape persecution or conflict and cannot safely return", "An economic migrant moves mainly to find work or a higher income, and can usually return", "Refugees are protected by international law, while economic migrants are subject to the immigration laws of the destination"],
    modelAnswer: "A refugee has crossed a border to escape persecution or conflict and cannot safely return. An economic migrant moves mainly to find work or a higher income and can usually return home. Refugees are protected by international law, but economic migrants are subject to the destination's immigration laws.",
    explanation: "Reason for the move, ability to return and legal status.",
    hints: ["Compare the reason for leaving."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain why most migrants from rural areas to towns are young adults.",
    points: ["Young adults are looking for their first job or for further education, which are mainly in towns", "They have fewer family ties and are more willing to take risks", "They are physically able to travel and work and can adapt to new conditions", "They have more years in which to gain from the move, so the benefit outweighs the cost"],
    modelAnswer: "Young adults are looking for their first job or for further education, which are mainly in towns. They have fewer family ties and are more willing to take risks, and they are physically able to travel and work. They also have more years in which to gain from the move.",
    explanation: "Jobs and education, flexibility and benefit over time.",
    hints: ["What stage of life are they at?"],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `A survey of 200 recent migrants to Mutare asked where they came from and why they moved (illustrative data).\n\n${tabO}\n\n${tabR}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of migrants who came from the rural districts of Manicaland.", value: pctRural, unit: "%", wrong: [112, 28], explanation: "112 ÷ 200 × 100 = 56%." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of migrants who moved for work or education.", value: pctWorkEd, unit: "%", wrong: [138, 49], explanation: "(98 + 40) ÷ 200 × 100 = 69%." }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which term describes the 36 migrants from Mozambique?", options: [["International migrants", "Correct: they crossed a national border."], ["Internal migrants", "They moved between countries, not within one."], ["Internally displaced persons", "They did not stay within their own country."], ["Seasonal migrants only", "The table does not say that their stay is seasonal."]], answer: "A", explanation: "People crossing a border are international migrants; the table does not say whether they are refugees." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why more than half the migrants came from nearby rural districts.", points: ["Short distances cost less and keep contact with family, as Ravenstein found", "Rural areas have few jobs, schools and services (push factors), so people look to the nearest large town (pull)", "Information flows from earlier migrants from the same area, who help new arrivals"], modelAnswer: "Short distances cost less and keep contact with family, so most migrants move a short distance. Rural areas have few jobs and services, and Mutare is the nearest large town, and earlier migrants from the same area pass on information and help newcomers.", explanation: "Distance, push and pull, and networks." }),
      P.manual({ label: "(e)", marks: 4, stem: "Assess the problems that the arrival of migrants may cause for Mutare, and one way the council could respond.", points: ["Pressure on housing, leading to overcrowding or informal settlement", "Pressure on water, sanitation, schools and clinics", "Competition for jobs and growth of the informal sector", "A response, such as planning serviced stands, investing in services or creating jobs in the surrounding districts, which will reduce pressure only if resources are available"], modelAnswer: "Migrants add pressure on housing, causing overcrowding or informal settlement, and on water, sanitation, schools and clinics. There is competition for jobs and the informal sector grows. The council could plan serviced stands and invest in services and jobs in the surrounding districts, but this works only if resources are available.", explanation: "Two or more problems and a response." }),
    ],
    explanation: "Calculate percentages from a migrant survey and explain the pattern and its effects.",
    hints: ["Divide by the total of 200 migrants."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: "A rural district can send migrants to Town X (population 300 000, 60 km away) or Town Y (population 75 000, 15 km away). Use the attraction index, population (in thousands) ÷ distance squared (km²) (illustrative data).",
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate how many times greater the attraction of Town Y is than that of Town X.", value: ratioY, unit: "times", wrong: [0.25, 16], explanation: "X: 300 ÷ 3 600 = 0.0833. Y: 75 ÷ 225 = 0.3333. 0.3333 ÷ 0.0833 = 4 times." }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which town is likely to receive more migrants from the district?", options: [["Town Y", "Correct: its index is four times that of X."], ["Town X", "Its index is lower because of the distance."], ["Both equally", "The indices are different."], ["Neither", "Both towns attract migrants."]], answer: "A", explanation: "The nearer town has the higher index." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why distance has such a strong effect on migration.", points: ["Travel costs and time rise with distance", "People know less about distant places and have fewer contacts there", "Leaving a nearby place keeps ties with family and allows return visits"], modelAnswer: "Travel costs and time rise with distance, people know less about distant places and have fewer contacts there, and moving nearby keeps ties with family and allows return visits.", explanation: "Cost, information and family ties." }),
      P.manual({ label: "(d)", marks: 2, stem: "State two reasons why the gravity model may not predict actual migration well.", points: ["It ignores jobs, wages and living conditions", "It ignores roads, laws, networks of earlier migrants and personal factors"], modelAnswer: "It ignores jobs, wages and living conditions, and it ignores roads, laws, networks of earlier migrants and personal factors.", explanation: "The model uses only size and distance." }),
    ],
    explanation: "Apply the gravity model and judge its limitations.",
    hints: ["Divide the population by the square of the distance."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the usefulness of Ravenstein's laws and Lee's push–pull model in explaining migration in southern Africa. [8]",
    points: [
      "Ravenstein's short-distance and step migration fit rural to urban movement, for example from villages to nearby towns and then Harare or Bulawayo",
      "Economic motives dominate, as in Ravenstein's laws and in labour migration to South African mines and farms",
      "Counter-flows exist: workers return home, and circular and seasonal movement is common",
      "Lee's model explains why people move: push factors (drought, unemployment) and pull factors (jobs, services)",
      "Lee's intervening obstacles explain why many do not move: borders, visas, costs and information",
      "Neither model explains forced migration well, such as refugees from conflict or people displaced by Cyclone Idai",
      "The laws were based on 19th-century Britain, and long-distance international migration to South Africa does not fit the short-distance idea",
      "Judgement: both models are useful starting points, but they need to be combined with data on policy, conflict and networks",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Ravenstein's laws fit much migration in southern Africa: most people move short distances from villages to nearby towns and later to larger cities, and economic reasons dominate, as in the long-established labour migration to South African mines and farms. Counter-flows also occur, as with circular and seasonal workers. Lee's model explains why people move, because of push factors such as drought and unemployment and pull factors such as jobs and services, and why many do not move, because of obstacles such as borders, visas and costs. However, neither model deals well with forced migration, such as refugees fleeing conflict or people displaced by Cyclone Idai, and Ravenstein's laws were based on 19th-century Britain, so long-distance migration to South Africa does not fit the short-distance idea. Overall they are useful starting points that need to be combined with evidence on policy, conflict and migrant networks.",
    wordLimit: { max: 300 },
    explanation: "Apply each model to southern Africa, note its limits and judge.",
    hints: ["Which kinds of migration do the models explain badly?"],
  });

  b.card("DEFINITION", "Refugee?", "A person outside their country of nationality who cannot or will not return because of a well-founded fear of persecution (race, religion, nationality, social group or political opinion).");
  b.card("DEFINITION", "Asylum seeker and IDP?", "Asylum seeker: has applied for protection and awaits a decision. IDP: forced to flee but remains inside their own country.");
  b.card("CONCEPT", "Types of migration?", "Internal or international; voluntary or forced; permanent, temporary, seasonal or circular; skilled or unskilled; documented or undocumented.");
  b.card("FACT", "Share of the world's people who are international migrants?", "About 3.6% (about 280 million in 2020, United Nations, rounded).");
  b.card("CONCEPT", "Ravenstein's laws (outline)?", "Most migrants move short distances; step migration; every flow has a counter-flow; economic motives dominate; rural people migrate more than urban people.");
  b.card("CONCEPT", "Lee's push-pull model?", "Push factors at the origin, pull factors at the destination, intervening obstacles (distance, cost, laws) and personal factors.");
  b.card("FORMULA", "Gravity model of migration?", t`Flow $\propto \dfrac{P_1 \times P_2}{d^2}$: large, near places attract the most migrants.`);
  b.card("FACT", "Main destination of labour migrants in southern Africa?", "South Africa (mines, farms, cities), with workers from Zimbabwe, Mozambique, Malawi and Lesotho; Botswana is also a destination.");
  b.card("CONCEPT", "Brain drain?", "Emigration of skilled and educated people such as nurses and teachers, which weakens the source country.");
});
