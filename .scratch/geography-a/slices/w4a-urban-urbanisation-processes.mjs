// W4a: urban.urbanisation-processes (ZIMSEC Form 5; Cambridge AS). Illustrative data; numbers computed in code.
import { concept, P, t, chk, rnd, table, geographyLevels } from "../lib.mjs";
import { mc } from "../tables/w4a-_h.mjs";

const grow = ((5.4 / 3.0) ** (1 / 20) - 1) * 100; // 2.98
const incr = chk(((6.0 - 2.4) / 2.4) * 100, 150, 1e-9);
const natPct = chk((1.35 / 3.0) * 100, 45, 1e-9);
const areaPct = chk(((128 - 80) / 80) * 100, 60, 1e-9);
// struct 1
const Y = [[1996, 9.0, 1.8], [2006, 10.4, 3.1], [2016, 12.0, 4.8]];
const share2010 = (3.1 / 10.4) * 100; // 29.8
const tabY = table(["Year", "Total population (millions)", "Urban population (millions)"], Y);
chk(Math.round((12.0 - 4.8) * 10) / 10, 7.2);
chk(Math.round((9.0 - 1.8) * 10) / 10, 7.2);
// struct 2
const area2 = chk(((270 - 150) / 150) * 100, 80, 1e-9);
const tabC = table(["", "1995", "2022"], [["Population (millions)", 1.5, 2.1], ["Built-up area (km²)", 150, 270]]);

concept("ageo.urban.urbanisation-processes", { file: "urban/urbanisation-processes", keyPrefix: "urban.urbanisation-processes" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is urbanisation?",
    ok: ["An increase in the proportion of a country's people living in urban areas", "Correct: it is about the share, not only the numbers."],
    bad: [["The movement of people from a large city to the countryside or a small town", "That is counter-urbanisation."], ["The building of more shops in a city centre", "This is a land use change, not urbanisation."], ["The decline of a city's population", "Urbanisation refers to a rising urban share."]],
    explanation: "Urbanisation is the rising proportion of people living in towns and cities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which example is counter-urbanisation?",
    ok: ["Families moving from a large city to a small town or village within commuting distance", "Correct: the movement is out of the urban area."],
    bad: [["Rural households moving to a city for work", "That is rural-urban migration."], ["A city centre being redeveloped for apartments", "That is regeneration (re-urbanisation)."], ["A city expanding over farmland at its edge as new housing estates and roads are built on it", "That is urban sprawl."]],
    explanation: "Counter-urbanisation is a move from large urban areas to smaller settlements or the countryside.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "What is urban sprawl?",
    ok: ["Uncontrolled low-density spread of a city over surrounding rural land", "Correct: the built-up area grows outwards."],
    bad: [["Crowding of more people into the city centre as old buildings are made taller", "That is densification."], ["Closure of shops in the city centre", "That is not what sprawl means."], ["The flow of people from farms to the city", "That is migration, which may contribute to sprawl."]],
    explanation: "Sprawl means that the city spreads outwards at low density, usually unplanned.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why did Zimbabwe's urban population grow rapidly after 1980?",
    ok: ["Colonial limits on African residence in towns ended, so rural people moved for jobs", "Correct: removal of restrictions allowed families to move."],
    bad: [["The government closed all rural schools and clinics, forcing families to move to towns", "No such closure took place."], ["Natural increase stopped in rural areas", "Rural populations continued to grow."], ["Cities stopped being centres of employment", "Employment in cities attracted migrants."]],
    explanation: "Independence removed controls on African urban residence, and the pull of jobs and services, with rural push factors, led to rapid growth.",
    hints: ["Think of the laws before independence."],
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why do informal settlements grow around many cities in developing countries?",
    ok: ["Migrants cannot afford formal housing and the supply of serviced land is too small", "Correct: people build where land is cheap or unregulated."],
    bad: [["Everyone prefers to live without water or electricity", "People settle there from lack of choice."], ["Formal housing is always cheaper than informal housing for low-income migrants arriving", "Formal housing is usually more expensive."], ["Cities forbid people to work in the centre", "Cities do not forbid work in the centre."]],
    explanation: "Rapid growth outpaces housing supply, and low-income migrants settle on cheap or unplanned land.",
    hints: ["Think about cost and supply of land."],
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Which policy would best reduce rural-urban migration to a large city?",
    ok: ["Developing jobs, services and markets in growth points and rural towns", "Correct: it removes some of the push and pull factors."],
    bad: [["Closing the city's schools", "This would harm residents and not help rural areas."], ["Building more roads only into the city centre", "This would make migration easier, not reduce it."], ["Removing all services from rural areas so that people cannot live there anyway", "This would increase the push factors."]],
    explanation: "Providing jobs and services in rural areas and smaller centres reduces the push from the countryside and the pull of the big city.",
    hints: ["Which option changes the reasons people leave rural areas?"],
  });

  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "In Country Z the urban population was 2.4 million in 1995 and 6.0 million in 2015. Calculate the percentage increase in the urban population, to the nearest whole number.",
    value: incr, dp: 0, unit: "%", wrong: [3.6, 60],
    explanation: "Increase = 6.0 − 2.4 = 3.6 million. 3.6 ÷ 2.4 × 100 = 150%. Giving 60 divides by the 2015 value.",
    hints: ["Divide the increase by the 1995 value."],
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: t`The urban population of Country W grew from 3.0 million (1993) to 5.4 million (2013). Calculate the average annual growth rate, as a percentage to one decimal place, using $r = \left[(P_1/P_0)^{1/n} - 1\right] \times 100$.`,
    value: grow, dp: 1, unit: "%", wrong: [4.0, 1.8],
    explanation: t`1. $P_1/P_0 = 5.4/3.0 = 1.8$ and $n = 20$.\n2. $1.8^{1/20} = 1.0298$.\n3. $r = 3.0\%$ a year.\n4. 4.0 divides the total percentage increase (80%) by 20, which ignores compounding, and 1.8 is the ratio itself.`,
    hints: ["Take the 20th root of the ratio."],
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "The urban population of a country rose by 3.0 million in 20 years. Natural increase accounted for 1.35 million of the rise. What percentage of the rise was due to natural increase?",
    value: natPct, unit: "%", wrong: [55, 0.45],
    explanation: "1.35 ÷ 3.0 × 100 = 45%. The other 55% was due to migration and reclassification of areas as urban.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: "The built-up area of a city increased from 80 km² to 128 km². Calculate the percentage increase in area.",
    value: areaPct, unit: "%", wrong: [48, 37.5],
    explanation: "Increase = 128 − 80 = 48 km². 48 ÷ 80 × 100 = 60%. 37.5 divides by the new area.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A country can have urban growth without urbanisation.",
    answer: true,
    explanation: "True. If urban and rural populations grow at the same rate, the urban population grows but its share of the total stays the same.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Suburbanisation is the movement of people out of the urban area altogether into the countryside.",
    answer: false,
    explanation: "False. Suburbanisation is movement from the centre to the edges of the same city. Moving out of the urban area is counter-urbanisation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each process to its description.",
    pairs: [
      ["Suburbanisation", "Movement of people and activities from the centre to the city edge"],
      ["Counter-urbanisation", "Movement from large urban areas to smaller towns and villages"],
      ["Urban sprawl", "Uncontrolled low-density spread of a city over rural land"],
      ["Re-urbanisation", "Return of people and investment to the inner city"],
    ],
    explanation: "Each process changes where people live in and around cities.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statement.",
    template: "The world's urban population passed {{blank:a}}% of the total in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["50"], choices: ["25", "50", "75"] },
      { id: "b", accepted: ["2007"], choices: ["1950", "1980", "2007", "2020"] },
    ],
    explanation: "More than half of the world's people lived in urban areas from 2007 (United Nations).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term describes the return of people and investment to the inner areas of cities after redevelopment?",
    accepted: ["re-urbanisation", "reurbanisation", "regeneration", "urban regeneration", "re-urbanization"],
    wrong: ["suburbanisation", "sprawl"],
    explanation: "Re-urbanisation or regeneration brings people and investment back into inner cities.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name is given to cities with more than 10 million inhabitants?",
    accepted: ["megacities", "megacity", "mega-city", "mega-cities", "mega cities"],
    wrong: ["conurbations", "primate cities"],
    explanation: "Megacities have more than 10 million people.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why many young people move from rural areas to towns and cities.",
    points: ["Farm incomes are low and unreliable (drought, small plots), so people look for work", "Towns offer more jobs, higher wages and informal business opportunities", "Better schools, clinics and entertainment, and relatives already in town"],
    modelAnswer: "Farm incomes are low and unreliable because of drought and small plots, so young people look for work elsewhere. Towns offer more jobs, higher wages and informal business opportunities, as well as better schools and clinics and relatives who can help.",
    explanation: "Push and pull factors.",
    hints: ["Think of both rural and urban conditions."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the problems caused by rapid urban growth in a city such as Harare.",
    points: ["Shortage of housing, leading to overcrowding and informal settlements", "Pressure on water supply, sanitation and waste collection, and risk of disease outbreaks", "Traffic congestion, pollution, unemployment and a large informal sector"],
    modelAnswer: "There is a shortage of housing, which leads to overcrowding and informal settlements. Water supply, sanitation and waste collection are overstretched, which increases the risk of disease outbreaks, and there is traffic congestion, pollution and unemployment with a large informal sector.",
    explanation: "Housing, services and economic problems.",
    hints: ["Group them as housing, services and jobs."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain the effects of rural-urban migration on the rural areas that people leave.",
    points: ["Loss of young adults reduces the labour force for farming, and fields may be left uncultivated", "Remaining population is older and has more women and children, so the dependency ratio rises", "Remittances raise incomes and pay for education and farm inputs", "Pressure on land and services falls, but schools and clinics may close for lack of users"],
    modelAnswer: "Loss of young adults reduces the labour force for farming, and the remaining population is older with a higher dependency ratio. Remittances raise household incomes and pay for education and inputs, and pressure on land and services falls, though schools and clinics may close for lack of users.",
    explanation: "Labour, age structure, money and services.",
    hints: ["Who is left behind?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest four ways in which the problems of rapid urbanisation might be reduced.",
    points: ["Develop jobs, services and markets in rural areas and growth points to reduce migration", "Provide serviced stands and low-cost housing, and upgrade informal settlements", "Improve public transport and plan the expansion of the city with land-use plans and green belts", "Improve water, sanitation and waste services, and support small businesses in the informal sector"],
    modelAnswer: "Develop jobs, services and markets in rural areas and growth points to reduce migration. Provide serviced stands and low-cost housing, and upgrade informal settlements. Improve public transport and plan the city's expansion with land-use plans, and improve water, sanitation and waste services and support small businesses.",
    explanation: "Any four valid solutions.",
    hints: ["Consider rural development, housing, transport and services."],
  });

  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the population of Country Y (illustrative data).\n\n${tabY}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the urban share of the total population in 2006, to one decimal place.", value: share2010, dp: 1, unit: "%", wrong: [3.1, 70.2], explanation: "3.1 ÷ 10.4 × 100 = 29.8%. 70.2% is the rural share." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the change in the urban population and its share between 1996 and 2016.", points: ["The urban population rose from 1.8 million in 1996 to 4.8 million in 2016", "Its share rose from 20% to 40%, so the country became more urbanised", "The increase was larger in the second decade (1.7 million added) than in the first (1.3 million)"], modelAnswer: "The urban population rose from 1.8 million in 1996 to 3.1 million in 2006 and 4.8 million in 2016, so its share doubled from 20% to 40%. The increase was faster in the second decade, when 1.7 million were added, compared with 1.3 million in the first.", explanation: "Quote the figures for numbers and share." }),
      P.mcq({ label: "(c)", marks: 1, stem: "What happened to the rural population between 1996 and 2016?", options: [["It stayed at about 7.2 million", "Correct: 9.0 − 1.8 = 7.2 million in 1996 and 12.0 − 4.8 = 7.2 million in 2016."], ["It fell to zero as all rural people left", "Rural population remained large."], ["It doubled", "It did not change."], ["It fell by 3 million", "It stayed the same."]], answer: "A", explanation: "All the growth in total population (3.0 million) went into urban areas." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the urban population grew faster than the rural population.", points: ["Rural-urban migration, because of low farm incomes and the attraction of jobs and services", "Natural increase in cities, since many migrants are young adults who have children there", "Growing settlements near the edge being reclassified as urban"], modelAnswer: "Many people moved from rural to urban areas because of low farm incomes and the attraction of jobs and services. Natural increase in cities was high because many migrants are young adults who have children there, and growing settlements at the edge were reclassified as urban.", explanation: "Migration, natural increase and reclassification." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest ways in which the country could cope with its growing urban population.", points: ["Plan and service land for housing, and extend water, sanitation and electricity", "Develop public transport and jobs in industry and services", "Develop rural areas and smaller towns to share growth"], modelAnswer: "The country could plan and service land for housing and extend water, sanitation and electricity to new areas. It could develop public transport and jobs in industry and services, and develop rural areas and smaller towns to share the growth.", explanation: "Housing and services, transport and jobs, balanced development." }),
    ],
    explanation: "Calculate urban shares, describe urbanisation and explain its causes.",
    hints: ["Divide the urban population by the total population."],
  });
  b.struct({
    d: 3, skill: "ANALYSIS", calculator: true,
    stem: `The table shows the growth of a city (illustrative data).\n\n${tabC}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage increase in the built-up area between 1995 and 2022.", value: area2, unit: "%", wrong: [120, 44], explanation: "(270 − 150) ÷ 150 × 100 = 80%." }),
      P.mcq({ label: "(b)", marks: 1, stem: "What process is shown by the area growing faster (80%) than the population (40%)?", options: [["Urban sprawl", "Correct: the city is spreading at lower density."], ["Counter-urbanisation", "People are not leaving the urban area."], ["Re-urbanisation", "The inner city is not being redeveloped here."], ["Rural depopulation", "No rural data are given."]], answer: "A", explanation: "Population density falls when area grows faster than population." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain the problems caused by urban sprawl.", points: ["Loss of farmland, woodland and wetlands around the city", "Longer journeys and greater dependence on vehicles, causing congestion and pollution", "High cost of extending water, sewers, roads and electricity over a large area"], modelAnswer: "Sprawl takes over farmland, woodland and wetlands around the city. It also leads to longer journeys and dependence on vehicles, which cause congestion and pollution, and the cost of extending water, sewers, roads and electricity over a large area is high.", explanation: "Environmental loss, transport and cost of services." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which sprawl could be controlled.", points: ["Land-use plans and green belts that limit building on farmland", "Encourage higher-density housing and redevelopment of derelict inner-city land, with good public transport"], modelAnswer: "Land-use plans and green belts could limit building on farmland, and higher-density housing and redevelopment of derelict inner-city land could be encouraged, with good public transport.", explanation: "Any two valid controls." }),
    ],
    explanation: "Calculate area growth and explain the causes and control of urban sprawl.",
    hints: ["Compare the growth of area and population."],
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the success of one strategy for dealing with the problems of rapid urban growth in a named city. [8]",
    points: [
      "Names a strategy (such as serviced stands and housing schemes, upgrading informal settlements, or growth points to reduce migration) and a city such as Harare",
      "Describes what the strategy does and where it has been applied",
      "Success: provides some people with secure housing, water and sanitation",
      "Success: reduces health risks and improves living conditions where applied",
      "Limitation: the scale is too small for the numbers needing housing, and land and funds are limited",
      "Limitation: the cost of housing and stands is too high for the poorest households",
      "Limitation: poor enforcement, corruption or lack of services after the stands are allocated",
      "Judgement: the strategy helps in the places where it is applied, but without enough funds and planning it cannot keep up with growth",
    ],
    levels: geographyLevels(8),
    modelAnswer: "In Harare, one strategy has been to provide serviced stands and housing schemes so that families can build legal homes. Where applied, it gives households secure tenure, water and sanitation, and reduces health risks. However, the scale is too small for the numbers needing housing, land and funds are limited, and the cost of stands and building materials is too high for the poorest households. Where stands are allocated before services are provided, residents still lack water and roads, and poor enforcement or corruption can undermine allocation. Overall the strategy helps people in the places where it is applied, but without enough funds and planning it cannot keep up with the rate of growth.",
    wordLimit: { max: 300 },
    explanation: "Describe a strategy, weigh success against limits and judge.",
    hints: ["Name the strategy and city, then give success and limitations."],
  });

  b.card("DEFINITION", "Urbanisation?", "An increase in the proportion of a country's population living in urban areas.");
  b.card("DEFINITION", "Urban growth versus urbanisation?", "Urban growth is a rise in the number of urban people or built-up area; urbanisation is a rise in the urban share.");
  b.card("DEFINITION", "Suburbanisation and urban sprawl?", "Suburbanisation: movement from the centre to the city edge. Sprawl: uncontrolled low-density spread over rural land.");
  b.card("DEFINITION", "Counter-urbanisation and re-urbanisation?", "Counter-urbanisation: movement out of large urban areas to smaller settlements. Re-urbanisation: return of people and investment to inner cities.");
  b.card("FACT", "When did the world become more than half urban?", "In 2007 (United Nations); about two-thirds is projected by 2050.");
  b.card("CONCEPT", "Causes of urbanisation?", "Rural-urban migration (push and pull), natural increase, jobs and services, colonial history and policy, reclassification.");
  b.card("CONCEPT", "Consequences for urban areas?", "Housing shortage, informal settlements, pressure on water and sanitation, congestion, pollution, unemployment, disease risk.");
  b.card("CONCEPT", "Solutions to rapid urbanisation?", "Rural development and growth points, serviced stands and low-cost housing, upgrading, public transport, planning and greenbelts.");
  b.card("FACT", "Urban share of Zimbabwe's population?", "Roughly one third (ZimStat census 2022, rounded).");
});
