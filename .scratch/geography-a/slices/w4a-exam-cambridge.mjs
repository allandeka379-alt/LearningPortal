// W4a exam rows (Cambridge): CAM_SECTION_A x 2 and CAM_ESSAY15 x 2 — AS topic 4 (population and migration, Paper 2) and topic 6 (urban areas
// and management, Paper 2). Resource data are invented for this exercise (labelled in the stems); every number is computed in code.
// Qatar and Curitiba facts are general and dated; to be verified by a reviewer.
import { concept, P, chk, table, dependencyRatio, naturalIncreasePct, checkExam, EXAM, geographyLevels, CAM } from "../lib.mjs";
import { fmt } from "../tables/w4a-_h.mjs";

const BASE = (plan) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper: "Paper 2", applies: plan.applies });

// ---- Section A, topic 4
const depP = dependencyRatio(36, 4, 60); // 66.67
const niP = chk(naturalIncreasePct(34, 9), 2.5);
const T4 = table(["Indicator for Country P", "Value"], [
  ["People under 15 (% of population)", 36], ["People of working age (% of population)", 60], ["People of pension age (% of population)", 4],
  ["Crude birth rate (per 1 000 people)", 34], ["Crude death rate (per 1 000 people)", 9], ["Total fertility rate (children per woman)", 4.6], ["Infant mortality rate (per 1 000 live births)", 48],
]);

// ---- Section A, topic 6
const areaPct = ((345 - 190) / 190) * 100; // 81.58
const dens20 = 3.6e6 / 345; // 10434.8
const T6 = table(["", "1998", "2018"], [["Population (millions)", 2.2, 3.6], ["Built-up area (km²)", 190, 345], ["Households in informal settlements (%)", 18, 31]]);

concept("ageo.pop.structure-dtm", { file: "exam/w4a-cambridge", keyPrefix: "exam.w4a-cambridge", applies: CAM }, (b) => {
  // ============================================================ CAM_SECTION_A: topic 4
  b.struct({
    ...BASE(EXAM.CAM_SECTION_A),
    concepts: ["ageo.pop.indicators-components", "ageo.pop.structure-dtm", "ageo.pop.policies"],
    hints: ["Dependency ratio = (under 15 + 65 and over) ÷ 15 to 64 × 100.", "In (c) weigh policy measures against other influences on fertility and reach a judgement."],
    stem: `Insert, Table 1 shows population data for Country P (data invented for this exercise).\n\n${T4}`,
    parts: checkExam(EXAM.CAM_SECTION_A, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the dependency ratio, to one decimal place.", value: depP, dp: 1, wrong: [40, 0.7], explanation: "(36 + 4) ÷ 60 × 100 = 66.7." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "At which stage of the demographic transition model is Country P most likely to be?", options: [
            ["Stage 2, with a high birth rate and a falling death rate", "Correct: the birth rate is 34 and the death rate is only 9."],
            ["Stage 1, with high birth and death rates", "The death rate is low."],
            ["Stage 4, with low birth and death rates", "The birth rate is high."],
            ["Stage 5, with a birth rate below the death rate", "Births are far above deaths."],
          ], answer: "A", explanation: "Large natural increase from a high birth rate and low death rate points to stage 2 (or early stage 3)." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the natural increase of Country P.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the natural increase, as a percentage.", value: niP, unit: "%", wrong: [25, 4], explanation: "(34 − 9) ÷ 10 = 2.5%." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why the total fertility rate is high.",
            points: ["Limited contraception and family planning and early marriage, with low female education.", "Children provide farm labour and security in old age, and high infant mortality encourages larger families."],
            modelAnswer: "Contraception is not widely used, marriage is early and girls have little education. Children provide farm labour and security in old age, and high infant mortality encourages parents to have more children.",
            explanation: "Social and economic reasons for high fertility." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Using Table 1 and your own knowledge, to what extent can government policies reduce the rate of natural increase in a country like Country P?",
        points: [
          "Natural increase is 2.5% a year, which would double the population in about 28 years, so there is pressure on resources and services.",
          "Family planning services, clinics and free contraceptives can lower the birth rate, as in Zimbabwe.",
          "Educating girls and raising the age of marriage reduce the total fertility rate (4.6) over time.",
          "Reducing infant mortality (48 per 1 000) makes parents more willing to have fewer children.",
          "Strict policies, such as China's one-child policy, reduced fertility quickly but had costs such as ageing and a gender imbalance.",
          "Fertility depends also on culture, religion, poverty and the economic value of children, which policy cannot change quickly.",
          "Fertility fell in many countries as incomes rose and women worked, so policy works best when it supports social change.",
          "Judgement: policy can reduce natural increase significantly where it is voluntary and combined with education and health care, but it is not enough alone.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "A natural increase of 2.5% a year would double the population in about 28 years, so there is strong pressure to reduce it. Family planning services and free contraceptives can lower the birth rate, as in Zimbabwe, and educating girls and raising the age of marriage reduce the total fertility rate, which is 4.6. Reducing infant mortality, which is 48 per 1 000, makes parents more willing to have fewer children. Strict policies such as China's one-child policy reduced fertility quickly but caused ageing and a gender imbalance. However, fertility also depends on culture, religion, poverty and the economic value of children, which policy cannot change quickly, and in many countries fertility fell as incomes rose and women went out to work. Policy can therefore reduce natural increase significantly where it is voluntary and combined with education and health care, but it is not enough alone.",
        explanation: "Weigh the power of policies against other influences, using the table, and judge." }),
    ]),
    explanation: "Calculate a dependency ratio and natural increase, explain high fertility and evaluate population policy.",
  });

  // ============================================================ CAM_SECTION_A: topic 6
  b.struct({
    ...BASE(EXAM.CAM_SECTION_A),
    concepts: ["ageo.urban.urbanisation-processes", "ageo.urban.sustainability-management"],
    hints: ["Percentage increase = (new − old) ÷ old × 100.", "In (c) set the problems of sprawl against its benefits and reach a judgement."],
    stem: `Insert, Table 1 shows changes in a city between 1998 and 2018 (data invented for this exercise).\n\n${T6}`,
    parts: checkExam(EXAM.CAM_SECTION_A, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage increase in the built-up area between 1998 and 2018, to one decimal place.", value: areaPct, dp: 1, unit: "%", wrong: [155, 44.9], explanation: "(345 − 190) ÷ 190 × 100 = 81.6%." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What process is shown by the built-up area growing faster than the population?", options: [
            ["Urban sprawl", "Correct: the population increased by 64% but the area by 82%."],
            ["Counter-urbanisation", "People are not moving out of the urban area."],
            ["Re-urbanisation", "There is no sign of inner-city redevelopment."],
            ["Rural depopulation", "No rural data are given."],
          ], answer: "A", explanation: "Population rose from 2.2 to 3.6 million (64%) while area rose by 82%, so density fell." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Explain the changes in the city.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the population density in 2018, in people per km², to the nearest whole number.", value: dens20, dp: 0, unit: "people/km²", wrong: [0.0001, 1043], explanation: "3 600 000 ÷ 345 = 10 435 people per km²." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why the share of households in informal settlements has increased.",
            points: ["Rapid migration to the city has outpaced the supply of affordable formal housing and serviced land.", "Low-income migrants cannot afford formal housing and settle on cheap or unplanned land at the edge."],
            modelAnswer: "Rapid migration to the city has outpaced the supply of affordable formal housing and serviced land, and low-income migrants who cannot afford formal housing settle on cheap or unplanned land at the edge.",
            explanation: "Supply of housing against demand and affordability." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Using Table 1 and your own knowledge, assess the extent to which urban sprawl creates more problems than benefits.",
        points: [
          "Sprawl takes over farmland, woodland and wetlands around the city, reducing food production and biodiversity.",
          "Longer journeys and dependence on vehicles increase congestion and emissions.",
          "The cost of extending water, sewers, roads and electricity over a larger area is high (the area grew by 82% for a 64% population increase).",
          "Informal settlements at the edge (31% of households) lack services and are exposed to risks such as flooding.",
          "Benefits: more space and lower land prices, which allow low-density housing, gardens and room for industry.",
          "Benefits: the city can house a growing population at lower cost than high-rise building, and edge sites suit new retail and industry.",
          "Planning, green belts, public transport and higher density in new areas can reduce the problems.",
          "Judgement: sprawl creates more problems than benefits when it is unplanned, but planned expansion with services can provide some benefits.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Sprawl takes over farmland, woodland and wetlands around the city, reducing food production and biodiversity, and longer journeys and dependence on vehicles increase congestion and emissions. The cost of extending water, sewers, roads and electricity over a larger area is high, since the area grew by 82% for a 64% increase in population. Informal settlements at the edge, which now hold 31% of households, lack services and are exposed to risks such as flooding. There are some benefits: more space and lower land prices allow low-density housing and room for industry, and the city can house a growing population at lower cost than by building upwards. Planning, green belts, public transport and higher density in new areas can reduce the problems. Sprawl therefore creates more problems than benefits when it is unplanned, although planned expansion with services can provide some benefits.",
        explanation: "Weigh problems and benefits using the table and judge." }),
    ]),
    explanation: "Calculate urban growth and density, explain informal settlement and assess urban sprawl.",
  });

  // ============================================================ CAM_ESSAY15: topic 4
  b.ext({
    ...BASE(EXAM.CAM_ESSAY15), marks: 15, skill: "EVALUATION",
    concepts: ["ageo.pop.migration-causes-impacts", "ageo.pop.migration-types-patterns"],
    hints: ["Use a detailed example of one destination country with dated facts, and give benefits, costs and a judgement."],
    stem: "Assess the extent to which international migration brings more benefits than costs to destination countries.",
    points: [
      "Defines international migration and its benefits and costs, and names the example used (for example Qatar).",
      "Economic benefit: migrants fill labour shortages, for example in construction and services in Qatar, where migrants are roughly 85 to 90% of residents.",
      "Economic benefit: migrants pay taxes and spend money locally, and may start businesses.",
      "Demographic benefit: migrants are mostly young adults, which offsets an ageing population in many high-income countries.",
      "Cultural benefit: diversity, new ideas, food and skills.",
      "Cost: pressure on housing, schools, health services and transport where numbers are large.",
      "Cost: competition for jobs and downward pressure on wages in some sectors.",
      "Cost: social tension, discrimination and sometimes xenophobia, as in violence against migrants in some cities.",
      "Qatar: sponsorship (kafala) tied workers to employers, with low pay, poor housing and limited freedom to change jobs.",
      "Qatar: reforms in 2020 removed the need for permission to change jobs or leave the country, and a minimum wage followed in 2021.",
      "The cost of the system falls mostly on the migrants, not on the destination country itself.",
      "The balance depends on the skills of the migrants, the numbers, the speed of arrival and the policies of the government.",
      "Source countries also gain remittances but lose skilled workers, so the question is about destination countries only.",
      "Management: integration policies, planning for housing and services, and fair labour laws increase the benefits.",
      "Judgement: benefits usually outweigh costs for the destination economy, but the costs to migrants and local pressure on services are real, so the extent depends on management.",
    ],
    levels: geographyLevels(15), wordLimit: { min: 400, max: 600 },
    modelAnswer: "International migration usually brings more benefits than costs to destination countries, particularly economic benefits, but the balance depends on how migration is managed and on who is counted.\n\nThe economic benefits can be large. Migrants fill labour shortages that local workers cannot or will not fill. In Qatar, migrants make up roughly 85 to 90% of residents, and their labour in construction, services and domestic work made possible the building boom, including the stadiums and roads for the 2022 World Cup. Migrants pay taxes where the law allows and spend their wages locally, and some start businesses. In many high-income countries the migrants are mostly young adults, who offset an ageing population and help to pay for pensions and health care. Migration also adds cultural diversity, new skills and ideas.\n\nThere are costs. Where numbers are large and arrive quickly, there is pressure on housing, schools, health services and transport. Migrants can compete with local workers for jobs and in some sectors hold down wages. Tension can arise between groups, and in some cities migrants have suffered discrimination and violence. In Qatar, the sponsorship (kafala) system tied workers to their employers, and critics reported low pay, poor housing and limited freedom to change jobs. These are costs mainly to the migrants, but they also damage the reputation of the destination and create a divided society with limited citizenship rights.\n\nThe balance depends on management. In Qatar, reforms in 2020 removed the need for an employer's permission to change jobs or to leave the country, and a minimum wage was introduced in 2021, though critics say that enforcement is uneven. In other countries, planning for housing and services, language teaching and fair labour laws help to realise the benefits. The balance also depends on the skills of the migrants, their numbers and the speed of their arrival.\n\nIn conclusion, the economic and demographic benefits to destination countries are usually larger than the costs, particularly where migrants fill real labour shortages. But the costs to migrants and the pressures on local services are real, so to a large extent the benefits outweigh the costs only when migration is well managed and the rights of migrants are protected.",
    explanation: "Weigh benefits and costs to destination countries with a detailed example, and judge.",
  });

  // ============================================================ CAM_ESSAY15: topic 6
  b.ext({
    ...BASE(EXAM.CAM_ESSAY15), marks: 15, skill: "EVALUATION",
    concepts: ["ageo.urban.sustainability-management"],
    hints: ["Use a detailed example of one city (for example Curitiba) with strategies, dates, successes and limits."],
    stem: "To what extent is sustainable urban development achievable in a city you have studied?",
    points: [
      "Defines sustainable urban development (meeting present needs without harming future generations; environment, society and economy) and names the city, for example Curitiba in Brazil.",
      "Planning: a master plan in the 1960s guided growth along main transport corridors.",
      "Transport: an integrated bus network with dedicated lanes, high-capacity articulated buses and boarding tubes, from 1974, carries many people at lower cost than rail.",
      "Green space: parks, including parks on floodplains, store water and reduce flood risk and provide recreation.",
      "Waste: recycling programmes such as exchanging recyclables for bus tokens or food engage low-income households and reduce landfill.",
      "Social: the programmes aim to benefit low-income residents as well as protect the environment.",
      "Limitation: car ownership has grown, so traffic and emissions remain concerns.",
      "Limitation: informal settlements and inequality exist at the edge of the city.",
      "Limitation: sustainability is hard to measure and depends on indicators, scale and time.",
      "Limitation: the city also depends on resources and waste sites beyond its boundary (ecological footprint).",
      "Conflicting priorities: residents, businesses and governments want different things, and planning requires compromise.",
      "Success depended on consistent planning, strong leadership and funding over many years.",
      "Transferability: some features, such as bus rapid transit, have been copied in other cities, but the political and financial conditions may not exist elsewhere.",
      "Comparison: other cities with weaker planning and funding find sustainability harder to achieve, for example in rapidly growing cities with large informal settlements.",
      "Judgement: sustainability is partly achievable, since the city has made progress in transport, green space and waste, but not fully, because environmental, social and economic goals still conflict.",
    ],
    levels: geographyLevels(15), wordLimit: { min: 400, max: 600 },
    modelAnswer: "Sustainable urban development means meeting the needs of the present population without harming the ability of future generations to meet theirs, which requires a balance of environmental, social and economic goals. In Curitiba, in southern Brazil, a good deal has been achieved, but sustainability has been only partly achieved.\n\nThe city is known for planning. A master plan in the 1960s guided growth along main transport corridors. From 1974 an integrated bus network with dedicated lanes, high-capacity articulated buses and boarding tubes was developed, which carries many passengers at a far lower cost than a rail system and reduces the need for private cars. Parks, including those built on floodplains, store water in heavy rain and reduce flood risk, while giving residents recreation. Recycling programmes, such as exchanging collected recyclables for bus tokens or food, engage low-income households and reduce the waste sent to landfill. These measures link the environmental, social and economic goals, because they reduce pollution and also help poor residents.\n\nHowever, there are limits. Car ownership has grown, so traffic and emissions remain concerns despite the bus system. Informal settlements and inequality exist at the edge of the city, which shows that social sustainability has not been fully achieved. Sustainability is also difficult to measure, because it depends on the indicators chosen, the scale and the time period, and the city relies on resources and waste sites beyond its boundary, so its ecological footprint is larger than its area. Residents, businesses and governments have different priorities, and planning needs compromise.\n\nCuritiba's success depended on consistent planning, strong leadership and funding over many years. Some features, such as bus rapid transit, have been copied in other cities, but the conditions may not exist elsewhere. Cities with weaker planning and funding, and with large and fast-growing informal settlements, find it much harder.\n\nIn conclusion, sustainable urban development is partly achievable, as Curitiba shows through progress in transport, green space and waste. But it is not fully achieved, because rising car use and inequality remain and the goals still conflict, so to a moderate extent it is achievable where there is consistent planning and funding.",
    explanation: "Evaluate a city's strategies with accurate facts, weigh success and limits and judge.",
  });
});
