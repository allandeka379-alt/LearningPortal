// Slice G4b: ZIMSEC Paper 2 Section C (population, settlement, transport and trade): settlement (2 × 25 marks) and
// population (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

// ---------------------------------------------------------------------------------------------------------------------
// Settlement
concept("geo.settlement.urban-land-use", { file: "exam/zim-p2-c-settlement", keyPrefix: "exam.zim-p2-c-settlement", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.settlement.urbanisation", "geo.settlement.urban-land-use", "geo.settlement.unplanned"],
    stem: "Table 1 shows census results for a fictional growth point that has become a town in Zimbabwe (fictional data).\n\n| Census year | Population |\n|---|---|\n| 1992 | 18,400 |\n| 2002 | 31,200 |\n| 2012 | 46,000 |\n| 2022 | 64,400 |\n\nResource: the town's council reports that a group of shacks has appeared on a stream bank between the high-density suburb and the industrial area, with no piped water or toilets. The town centre has banks, supermarkets and the council offices, and the tallest buildings in the town.",
    hints: ["Percentage increase = increase ÷ original × 100.", "Think of the push and pull factors in Zimbabwe."],
    parts: [
      P.num({ label: "(a)", marks: 2, unit: "%", stem: "Calculate the percentage increase in the town's population between 1992 and 2022.", value: 250, wrong: [46000, 71.4], explanation: "(64,400 − 18,400) ÷ 18,400 × 100 = 250%." }),
      P.mcq({
        label: "(b)", stem: "Which urban zone is described by 'banks, supermarkets, council offices and the tallest buildings'?",
        options: [
          ["The central business district (CBD)", "Correct: the CBD has the highest land values, so offices and shops build upwards."],
          ["The low-density residential zone", "This has large plots and big houses, not tall offices."],
          ["The industrial zone", "This has factories and warehouses."],
          ["The rural-urban fringe", "The fringe mixes farmland and new development on the edge of town."],
        ],
        answer: "A", explanation: "Accessibility and high land values give the CBD tall commercial buildings.",
      }),
      P.short({
        label: "(c)", stem: "Name the urban land-use model in which zones form rings around the CBD.",
        accepted: ["concentric zone model", "concentric zone", "concentric model", "concentric ring model", "concentric", "Burgess model", "Burgess", "Burgess concentric zone model", "Burgess's model", "Burgess' model"],
        wrong: ["sector model"], explanation: "Burgess's concentric zone model has rings of land use around the CBD.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using the resource, describe **three** characteristics of the unplanned settlement.",
        points: [
          "Shacks made of temporary or scrap materials.",
          "No piped water or toilets / no services.",
          "Built on unsuitable land (stream bank, liable to flooding) between other zones / unauthorised by the council.",
        ],
        modelAnswer: "The homes are shacks, there is no piped water or toilets, and they are on a stream bank that may flood, on land not planned for housing.",
        explanation: "Use the resource.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain the causes of the town's rapid growth.",
        points: [
          "Rural-urban migration: push factors in surrounding communal areas (drought, land shortage, few jobs).",
          "Pull factors: jobs in industry, trade, services and the informal sector; better schools and clinics.",
          "Natural increase: young migrants have children in the town.",
          "Government investment as a growth point (roads, electricity, services) attracting business.",
        ],
        modelAnswer: "People from surrounding communal areas are pushed by drought and land shortage and pulled by jobs in shops, factories and the informal sector, and by better schools and clinics. Young migrants then have children in the town, and investment in the growth point's roads and electricity attracted businesses.",
        explanation: "Migration, natural increase and investment.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe **four** effects of rapid urbanisation on a town in Zimbabwe.",
        points: [
          "Housing shortages / growth of unplanned settlements / overcrowding and lodgers.",
          "Shortage of water and overloaded sewers / disease outbreaks.",
          "Unemployment and growth of the informal sector / crime.",
          "Traffic congestion, pollution, uncollected refuse / pressure on schools and clinics.",
        ],
        modelAnswer: "Housing runs short so families take lodgers or build shacks; water supplies and sewers are overloaded; many people cannot find formal jobs and turn to vending; and roads become congested and refuse piles up.",
        explanation: "Four effects.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Name **one** high-density and **one** low-density residential suburb in a named Zimbabwean city.",
        points: [
          "High-density suburb correctly named (e.g. Harare: Mbare, Highfield, Glen View, Mufakose, Kuwadzana; Bulawayo: Makokoba, Mzilikazi, Nkulumane, Entumbane).",
          "Low-density suburb correctly named (e.g. Harare: Borrowdale, Mount Pleasant, Highlands, Greendale; Bulawayo: Suburbs, Hillside, Burnside).",
        ],
        modelAnswer: "Harare: Mbare (high density) and Borrowdale (low density).",
        explanation: "One of each, in the same named city.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "With reference to a named urban centre in Zimbabwe, explain the measures that can be taken to solve the problems of unplanned settlements.",
        points: [
          "Names an urban centre and an unplanned settlement (e.g. Harare: Epworth or Caledonia).",
          "Upgrading (in situ): water pipes, toilets, roads, electricity in the existing settlement.",
          "Regularisation: giving residents legal title / planning layouts so they invest in better homes.",
          "Site-and-service schemes: serviced plots for self-built houses.",
          "Low-cost housing schemes / cooperatives / building brigades / low-cost loans.",
          "Growth points and rural development to reduce rural-urban migration.",
          "Enforcing planning laws to stop building on unsafe land (wetlands, stream banks).",
          "Evaluates: cost, demand exceeding supply, affordability; judgement on most effective.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Harare has several unplanned or partly planned settlements, such as Epworth on its south-eastern edge. One measure is upgrading the settlement where it stands, by laying water pipes, building toilets and grading roads, which improves health without moving people away from their jobs. Regularisation, in which plots are surveyed and residents receive legal title, encourages families to replace shacks with brick houses. The council can also provide site-and-service schemes, where plots with water and sewer connections are allocated for people to build on, and support housing cooperatives and low-cost loans. Planning laws should be enforced to stop people building on wetlands and stream banks, where floods and disease are a risk. In the long term, developing growth points and rural services reduces the migration that creates unplanned settlements. These measures cost money and demand is greater than supply, so upgrading and regularisation, which are cheaper and keep communities together, are probably the most effective.",
        explanation: "Measures explained with a named Zimbabwean example.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section C settlement question: urban growth data, land-use zones and models, unplanned settlements and their solutions.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.settlement.types-site-patterns", "geo.settlement.urban-challenges", "geo.settlement.urban-management"],
    stem: "Resource: a description of part of a fictional 1:50,000 map extract of rural Zimbabwe. In the north, homesteads are spread out singly across a gently sloping plateau with sandy soils. In the centre, about thirty homesteads are clustered around a borehole, a school and a clinic. In the south, homesteads are strung out in a line along both sides of a gravel road that follows a ridge. A river with a wide, flat floodplain flows west to east across the extract; there are no homesteads on the floodplain.\n\nOn the map, the distance by road from the clustered village to the main road junction measures 4.6 cm.\n\n![Schematic map extract of rural Zimbabwe: homesteads are scattered singly on the plateau in the north, clustered around a borehole, school and clinic in the centre, strung along a gravel road on a ridge in the south, with none on the river floodplain; the road from the village to the main road junction measures 4.6 cm.](media:diagrams/settlement-extract-zimsec-p2c.png \"Figure: schematic map extract showing dispersed, nucleated and linear homesteads (fictional)\")",
    hints: ["At 1:50,000, 1 cm on the map = 0.5 km on the ground.", "Think about why people avoid the floodplain."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which settlement pattern is shown by the homesteads in the south?",
        options: [
          ["Linear", "Correct: they follow the line of the road along the ridge."],
          ["Nucleated", "Nucleated homesteads are clustered around a central point."],
          ["Dispersed", "Dispersed homesteads are spread out singly."],
          ["Planned grid", "No grid layout is described."],
        ],
        answer: "A", explanation: "Linear settlements follow roads, rivers or ridges.",
      }),
      P.short({
        label: "(b)", stem: "Name the settlement pattern shown by the homesteads in the centre of the extract.",
        accepted: ["nucleated", "nucleated settlement", "nucleated pattern", "clustered", "cluster", "clustered settlement", "compact", "compact settlement", "agglomerated"],
        rejected: ["dispersed", "linear", "scattered"],
        wrong: ["dispersed"], explanation: "Homesteads grouped around a borehole, school and clinic form a nucleated pattern.",
      }),
      P.num({ label: "(c)", marks: 2, unit: "km", stem: "Calculate the distance on the ground from the clustered village to the road junction.", value: 2.3, tol: 0.01, wrong: [23, 4.6], explanation: "4.6 cm × 50,000 = 230,000 cm = 2.3 km." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons for the nucleated pattern in the centre of the extract.",
        points: [
          "A reliable water supply (the borehole) attracts homesteads.",
          "Services such as the school and clinic are shared / easy to reach.",
          "Security / social ties / planned village layout / scarce water elsewhere.",
        ],
        modelAnswer: "Families cluster round the borehole for water, and the school and clinic are close by; living together also gives security and community support.",
        explanation: "Three reasons.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Explain why there are no homesteads on the river's floodplain, and how settlements can be sited and built more safely.",
        points: [
          "The floodplain floods in the wet season / cyclones, so homes and lives are at risk.",
          "Settlements should be sited on higher ground, away from rivers and steep unstable slopes.",
          "Disaster-resilient building: strong foundations, raised floors, firmly fixed roofs, strong bridges and drains.",
        ],
        modelAnswer: "The floodplain is flooded in heavy rains, as happened in the east during Cyclone Idai in 2019, so people build on higher ground. Homes should be away from rivers and steep slopes, with strong foundations and roofs tied down.",
        explanation: "Site safety and resilient building.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe **four** challenges caused by rapid growth in a named Zimbabwean city.",
        points: [
          "Water shortages and overloaded sewers / water-borne disease (e.g. Harare cholera 2008-2009).",
          "Housing shortages / overcrowding / unplanned settlements (e.g. Epworth).",
          "Traffic congestion in and around the CBD / overcrowded commuter transport.",
          "Uncollected refuse and illegal dumping / unemployment and informal trading / pollution.",
        ],
        modelAnswer: "In Harare, water supply has not kept pace with growth, so many suburbs depend on boreholes and vendors; housing shortages lead to lodgers and settlements such as Epworth; the CBD is badly congested with minibuses; and refuse is often uncollected.",
        explanation: "Four challenges for a named city.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Suggest **three** ways of reducing traffic congestion in a Zimbabwean city.",
        points: [
          "Improve and expand public transport (large buses, commuter trains).",
          "Build bypasses, ring roads or widen roads / improve traffic lights.",
          "Designated ranks and loading zones / park-and-ride / staggered working hours / decentralise services.",
        ],
        modelAnswer: "Provide more large buses and commuter trains, build bypasses to keep through traffic out of the CBD, and enforce designated ranks for minibuses.",
        explanation: "Three ways.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain how urban authorities in Zimbabwe can manage rapid urban growth. Refer to a named urban centre.",
        points: [
          "Names the urban centre (e.g. Harare or Bulawayo).",
          "Housing: site-and-service schemes, upgrading, low-cost housing, satellite towns (e.g. Chitungwiza, Ruwa).",
          "Water and sanitation: new or repaired treatment works, boreholes, sewer repairs.",
          "Transport: buses, commuter trains, road improvements, managing minibuses.",
          "Waste: regular refuse collection, recycling, controlled landfills.",
          "Jobs: designated vending sites and support for the informal sector; attracting industry.",
          "Rural development / growth points to reduce rural-urban migration.",
          "Evaluates: lack of funds, demand exceeding supply; judgement.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Harare has grown far faster than its services. To manage housing, the council can provide site-and-service plots and upgrade informal areas, while satellite towns such as Chitungwiza and Ruwa take some of the population. Water treatment works and sewers need repair and expansion, with boreholes as a short-term supply. Congestion can be reduced with more large buses and commuter trains, bypasses and designated ranks for minibuses. Regular refuse collection, recycling projects and controlled landfill sites reduce illegal dumping and disease. Designated vending sites give informal traders space without blocking pavements. In the long term, developing growth points and rural services reduces rural-urban migration. These measures all need money, which councils often lack, so priority should go to water and sanitation, which protect public health.",
        explanation: "Management strategies explained with a named Zimbabwean centre.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section C settlement question: rural settlement patterns and siting from a described map, scale, urban challenges and management.",
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Population
concept("geo.population.structure", { file: "exam/zim-p2-c-population", keyPrefix: "exam.zim-p2-c-population", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.population.structure", "geo.population.terms-data", "geo.population.growth-dtm"],
    stem: "Table 1 shows the population structure of a fictional developing country (percentage of the total population, fictional data).\n\n| Age group | Male (%) | Female (%) | Total (%) |\n|---|---|---|---|\n| 0-14 | 21.1 | 20.9 | 42 |\n| 15-64 | 26.7 | 27.3 | 54 |\n| 65 and over | 1.8 | 2.2 | 4 |\n\nThe country's birth rate is 32 per 1,000 and its death rate is 8 per 1,000.",
    hints: ["Dependency ratio = (0-14 + 65 and over) ÷ 15-64 × 100.", "Natural increase as a percentage = (birth rate − death rate) ÷ 10."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the dependency ratio. Give your answer to one decimal place.", value: (46 / 54) * 100, answer: "85.2", tol: 0.05, wrong: [46, 117.4], explanation: "(42 + 4) ÷ 54 × 100 = 85.2." }),
      P.mcq({
        label: "(b)", stem: "Which description best fits the population pyramid that Table 1 would produce?",
        options: [
          ["A wide base narrowing quickly to a small top", "Correct: 42% are children and only 4% elderly."],
          ["A narrow base with wide upper bars", "That shape shows an ageing population."],
          ["Straight vertical sides from base to top", "That shows a stable population with low death rates at all ages."],
          ["A narrow base widening to a wide middle", "That shape shows falling births in an HIC."],
        ],
        answer: "A", explanation: "A youthful population gives a triangular pyramid.",
      }),
      P.num({ label: "(c)", unit: "%", stem: "Calculate the natural increase as a percentage.", value: 2.4, tol: 0.01, wrong: [24, 4], explanation: "(32 − 8) ÷ 10 = 2.4%." }),
      P.short({
        label: "(d)", stem: "Name the official count of the whole population, carried out in Zimbabwe every ten years.",
        accepted: ["census", "a census", "the census", "population census", "national census", "population and housing census", "national population census"],
        rejected: ["survey", "registration"],
        wrong: ["survey"], explanation: "Zimbabwe holds a census every ten years (1982, 1992, 2002, 2012, 2022).",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe **three** problems a country faces when 42% of its population is aged under 15.",
        points: [
          "Large demand for schools, teachers and clinics (maternal and child health).",
          "High dependency: workers must support many children / government spending stretched.",
          "Future pressure: many school leavers need jobs and housing / continued rapid growth as children reach child-bearing age.",
        ],
        modelAnswer: "So many children need schools, teachers and clinics, the working population supports many dependants, and in a few years large numbers of school leavers will need jobs and homes.",
        explanation: "Three problems.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain why birth rates are higher in rural areas of Zimbabwe than in urban areas.",
        points: [
          "Children provide labour on family farms / support for parents in old age.",
          "Less access to family planning / clinics further away in rural areas.",
          "Girls in rural areas often leave school earlier and marry younger.",
          "Cultural and religious values favouring large families / higher infant mortality / lower cost of raising children in rural areas.",
        ],
        modelAnswer: "In rural areas children help with farm work and care for parents in old age; clinics and family planning are further away; girls often leave school and marry earlier; and traditional values favour large families, while in towns children are expensive to house and educate.",
        explanation: "Four reasons.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe the changes in birth and death rates in stages 2 and 3 of the demographic transition model, and state which stage Zimbabwe is in today.",
        points: [
          "Stage 2: the death rate falls rapidly (health care, clean water, food) while the birth rate stays high.",
          "Stage 2: rapid population growth.",
          "Stage 3: the birth rate falls (family planning, education, urbanisation) while the death rate continues to fall slowly; growth slows.",
          "Zimbabwe is in stage 3.",
        ],
        modelAnswer: "In stage 2 better health care, water and food make the death rate fall quickly while the birth rate stays high, so the population grows rapidly. In stage 3 the birth rate falls with family planning, education and urbanisation, and growth slows. Zimbabwe is in stage 3.",
        explanation: "Stages described and applied.",
      }),
      P.manual({
        label: "(h)", marks: 9, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Explain the effects of rapid population growth on Zimbabwe.",
        points: [
          "Pressure on education: overcrowded classrooms, teacher shortages.",
          "Pressure on health services and housing; growth of unplanned settlements.",
          "Unemployment, especially among school leavers; growth of the informal sector; emigration.",
          "Land shortage in communal areas: subdivision of plots, farming on marginal land.",
          "Environmental degradation: deforestation for firewood, overgrazing, soil erosion, siltation.",
          "Rapid urbanisation and pressure on urban water, sanitation and transport.",
          "High dependency ratio; government spending stretched.",
          "Positive effects: large labour force and market / future workforce (demographic dividend if jobs are created).",
          "Links effects together / judgement on overall effect.",
        ],
        levels: geographyLevels(9),
        modelAnswer: "Rapid population growth means more children every year, so classrooms are overcrowded, there are not enough teachers, and clinics struggle to cope. Many families need housing, and in towns shortages lead to lodging and unplanned settlements. Each year many school leavers enter a job market that cannot absorb them, so unemployment is high, many turn to vending in the informal sector, and many emigrate to South Africa and elsewhere. In communal areas, land is divided into smaller plots and people farm steep slopes and stream banks, which, with deforestation for firewood and overgrazing, causes soil erosion and silts rivers and dams. Rural people then move to towns, adding to pressure on urban water, sanitation and transport. The high proportion of children raises the dependency ratio and stretches government spending. On the other hand, a growing population provides a large labour force and market, which could benefit the country if enough jobs are created. Overall, because jobs and services have not kept pace with growth, its effects on Zimbabwe have mainly been negative.",
        explanation: "Effects on services, employment, land and environment, with a judgement.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section C population question: population structure, dependency, natural increase, census, birth rates, the DTM and effects of rapid growth.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.population.distribution-density", "geo.population.migration", "geo.population.policies", "geo.population.diseases"],
    stem: "Table 1 shows the area and population of three fictional districts of Zimbabwe (fictional data).\n\n| District | Area (km²) | Population | Location |\n|---|---|---|---|\n| K | 1,200 | 84,000 | Highveld, near a city |\n| L | 3,500 | 105,000 | Middleveld communal area |\n| M | 6,000 | 54,000 | Zambezi valley |\n\nResource: a survey (fictional) found that in District L many young men and women had left for Harare and South Africa, leaving mainly children, women and older people in the villages.",
    hints: ["Density = population ÷ area.", "Consider who leaves and who stays behind."],
    parts: [
      P.num({ label: "(a)", unit: "people/km²", stem: "Calculate the population density of District K.", value: 70, wrong: [0.014, 85200], explanation: "84,000 ÷ 1,200 = 70 people per km²." }),
      P.num({ label: "(b)", unit: "people/km²", stem: "Calculate the population density of District M.", value: 9, wrong: [0.11, 60000], explanation: "54,000 ÷ 6,000 = 9 people per km²." }),
      P.mcq({
        label: "(c)", stem: "Which reason best explains the sparse population of District M?",
        options: [
          ["High temperatures, low rainfall and tsetse fly", "Correct: these limit farming and settlement in the valley."],
          ["Cool temperatures and very high rainfall", "These describe the Eastern Highlands, not the Zambezi valley."],
          ["Fertile soils and reliable rainfall", "These would attract settlement."],
          ["Being next to a large city", "District M is in the remote Zambezi valley."],
        ],
        answer: "A", explanation: "Heat, drought and disease vectors discourage dense settlement in the Zambezi valley.",
      }),
      P.short({
        label: "(d)", stem: "Name the insect that carries malaria.",
        accepted: ["mosquito", "the mosquito", "anopheles mosquito", "female anopheles mosquito", "anopheles", "the anopheles mosquito", "a mosquito", "mosquitoes", "female anopheles"],
        rejected: ["tsetse fly", "tsetse", "housefly"],
        wrong: ["tsetse fly"], explanation: "The female Anopheles mosquito carries the malaria parasite.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe **four** push factors that cause young people to leave District L.",
        points: [
          "Lack of paid jobs / unemployment.",
          "Land shortage / small plots / poor soils / overcrowding.",
          "Drought and poor harvests.",
          "Poor services (secondary schools, electricity, clinics, entertainment).",
        ],
        modelAnswer: "There are few paid jobs, plots are small and overused, droughts cause poor harvests, and there are few secondary schools, little electricity and few clinics.",
        explanation: "Push factors at the origin.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain the effects of this out-migration on District L.",
        points: [
          "Positive: remittances of money and goods support families and pay school fees.",
          "Positive: less pressure on land and resources.",
          "Negative: shortage of labour for farming; fields left uncultivated; lower output.",
          "Negative: unbalanced population (mainly children, women and elderly); family separation; spread of HIV through returning migrants / brain drain.",
        ],
        modelAnswer: "Remittances help families buy food and pay school fees, and there is less pressure on land. But with young adults gone there are too few workers to farm, villages are left with children, women and older people, and families are separated.",
        explanation: "Positive and negative effects on the sending area.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe the social and economic effects of HIV and AIDS on a rural district.",
        points: [
          "Deaths of adults of working age reduce farm labour and household income.",
          "Orphans / child-headed households / grandparents caring for children.",
          "Money spent on treatment and funerals reduces savings.",
          "Children (often girls) leave school to care for the sick / pressure on clinics / stigma.",
        ],
        modelAnswer: "Working-age adults fall sick or die, so less land is farmed and incomes fall; many children are orphaned and cared for by grandparents; families spend savings on treatment and funerals; and some children leave school to care for sick relatives.",
        explanation: "Social and economic effects.",
      }),
      P.manual({
        label: "(h)", marks: 9, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Explain the effects of population policies in a named developed country and a named developing country.",
        points: [
          "Names a developing country and its policy (e.g. Zimbabwe: voluntary family planning through the ZNFPC; or China: one-child policy).",
          "Describes measures (e.g. community-based distributors, child spacing, contraception, education).",
          "Effects on birth rates (e.g. Zimbabwe's fertility fell from over 6 to about 4 children per woman, approximate).",
          "Other effects / limitations (e.g. rural-urban differences, supply shortages; or China: gender imbalance, ageing).",
          "Names a developed country and its pro-natalist policy (e.g. France).",
          "Describes measures (family allowances, tax reductions, subsidised childcare, parental leave).",
          "Effects (fertility relatively high for Europe but below replacement; costly; hard to separate from other factors).",
          "Compares the two: lowering births easier than raising them / voluntary approaches fairer.",
          "Supported judgement on success.",
        ],
        levels: geographyLevels(9),
        modelAnswer: "Zimbabwe, a developing country, has a voluntary anti-natalist policy run by the Zimbabwe National Family Planning Council. Contraception and advice are offered at clinics and by community-based distributors who visit rural homes, and family planning is presented as child spacing to protect mothers and children. Contraceptive use is among the highest in sub-Saharan Africa and fertility has fallen from more than 6 children per woman in the early 1980s to about 4 (approximate), helped also by girls' education and urbanisation. However, fertility remains higher in rural areas and supplies are sometimes short. France, a developed country, has a pro-natalist policy because of low fertility and an ageing population. It pays family allowances for second and later children, gives tax reductions that increase with family size, subsidises childcare and offers paid parental leave. As a result France's fertility has stayed among the highest in the European Union, though still slightly below replacement, and the policy is expensive. Comparing the two, Zimbabwe's voluntary policy has achieved a large fall in births without coercion, whereas France has only kept fertility from falling further, which suggests that it is easier to lower birth rates than to raise them.",
        explanation: "Two named countries, measures and effects, with a comparison.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section C population question: density, distribution, migration, disease and population policies.",
  });
});
