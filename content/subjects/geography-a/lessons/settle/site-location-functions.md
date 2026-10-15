---
{
  "key": "settle.site-location-functions",
  "title": "Site, situation and functions of settlements, and rural-urban interaction",
  "summary": "Distinguish site from situation and explain the factors that influence them, assess the suitability of a site, describe the functions and patterns of rural and urban settlements, and explain the flows of people, goods, money and information between rural and urban areas.",
  "concepts": [
    "ageo.settle.site-location-functions"
  ],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

Why is Harare where it is, and why is Beitbridge a border town on the Limpopo? Why did Kariba grow where a dam was being built, and why is Victoria Falls a town of hotels and tour operators? Every settlement began for reasons that can be traced to its **site** (the exact place it stands on) and its **situation** (its position relative to other places). As settlements grow, they take on **functions**, the jobs they do for their own people and for the surrounding area, and they exchange people, goods, money and information with each other. This lesson explains the factors behind site and situation, how to judge whether a site is suitable, the functions of rural and urban settlements, and the links between them.

You should already know the terms settlement, rural and urban, and be able to read a simple map. Hierarchy and growth points follow in later lessons.

## Key definitions

:::definition{term="Site and situation"}
The site is the actual land on which a settlement is built, described by its physical features (slope, soil, water, shelter). The situation is the location of the settlement in relation to its surroundings, such as roads, rivers, other towns and resources.
:::

:::definition{term="Settlement function"}
The main economic or social activity of a settlement, such as administration, marketing, mining, manufacturing, tourism, transport or residence. Most settlements have several functions.
:::

:::definition{term="Rural-urban interaction"}
The movement of people, goods, money, information and services between rural and urban areas, which links their economies.
:::

## Factors influencing site

| Factor | Why it matters | Zimbabwean or southern African example |
|---|---|---|
| Water supply | Needed for drinking, farming and industry; springs, rivers, boreholes or dams | Harare grew on the Highveld near small rivers such as the Mukuvisi and Makabusi; Lake Chivero later supplied the city |
| Flat or gently sloping land | Easy and cheap for building and roads | Settlements on the Highveld plateau |
| Well-drained, safe ground | Avoids flooding and waterlogging | Building above the flood line of a river |
| Fertile soil and farmland | Supports food supply | Farming towns on the Highveld |
| Building materials and fuel | Stone, clay, timber for construction | Brick fields near towns |
| Defence | High ground or a bend of a river protected early settlements | Hill sites; kopjes |
| Aspect and shelter | South-facing slopes in the southern hemisphere get less sun; shelter from strong winds | Settlements on sheltered slopes |

Early settlements were often at a **wet point** (a spring or river) or a **dry point** (higher ground above a marsh or floodplain), at a **bridging point** (the lowest or narrowest crossing of a river) or a **nodal point** (a meeting of routes).

## Factors influencing situation

1. **Accessibility:** roads, railways and borders. Beitbridge developed where the main road and railway to South Africa cross the Limpopo; Mutare lies close to the Mozambique border on the route to Beira.
2. **Resources:** mining towns grow around minerals, such as Hwange (coal) and Kwekwe (gold and later steel).
3. **Political and administrative factors:** colonial and later planning decisions placed capitals and district centres, such as Harare (founded in 1890 as Fort Salisbury) and Bulawayo (1894).
4. **Specific projects:** Kariba town was established for the construction of the dam in the 1950s.
5. **Tourism and environment:** Victoria Falls grew beside the waterfall; its situation attracts visitors.
6. **Central position:** Gweru is placed near the centre of the country on the main road and rail routes.

## Assessing the suitability of a site

Planners compare possible sites against criteria such as water, flood risk, slope, soil, access, cost and environmental impact. A **weighted score** gives each criterion a weight for its importance and each site a score for how well it meets the criterion; the weighted scores are added. A GIS can combine layers of slope, rivers, soils and roads in the same way (weighted overlay). The result is only as good as the weights and the data, and it should be checked in the field.

## Functions and settlement patterns

**Rural settlements** are small and depend on primary activities: farming, fishing, forestry, mining, and the services these people need (a school, clinic, shop, grinding mill). **Urban settlements** have many people, a variety of functions and secondary, tertiary and quaternary activities: administration, manufacturing, trade, finance, transport, education and health. Many urban functions serve not only the town but the region around it.

Patterns of rural settlement:

- **Nucleated (clustered):** houses close together around a water source or crossroads.
- **Dispersed (scattered):** isolated homesteads, usual where farms are large or water is widespread.
- **Linear:** along a road, river or railway.

Functions can be shown on a map or in a GIS with symbols or colours for each type of land use, or by a table of employment by sector, so the main functions can be identified.

## Rural-urban interaction

| Flow | From rural to urban | From urban to rural |
|---|---|---|
| People | Migrants seeking work and services; commuters, traders | Visitors, teachers, health workers, extension officers |
| Goods | Food, firewood, raw materials, minerals | Manufactured goods, fertiliser, seed, tools, fuel |
| Money | Payments for crops and labour | Remittances and wages, payments for goods and services |
| Information | Local knowledge, requests for services | News, prices, ideas, mobile services |

Interaction benefits both: towns provide markets and services; rural areas supply food, labour and raw materials. Problems arise when towns draw people and resources without giving enough in return, causing rural depopulation and urban crowding.

## Worked examples

:::worked-solution[Weighted site scores]
Three sites for a new rural service centre (illustrative data). Each site is scored from 1 (poor) to 5 (excellent) for four criteria. The weights show importance.

| Criterion | Weight | Site A | Site B | Site C |
|---|---|---|---|---|
| Water supply | 4 | 5 | 4 | 2 |
| Flood safety | 3 | 2 | 4 | 5 |
| Flat land | 2 | 4 | 3 | 5 |
| Road access | 3 | 3 | 4 | 2 |
| **Weighted total** | | **43** | **46** | **39** |

1. Site A: 4 × 5 + 3 × 2 + 2 × 4 + 3 × 3 = 20 + 6 + 8 + 9 = 43.
2. Site B: 4 × 4 + 3 × 4 + 2 × 3 + 3 × 4 = 16 + 12 + 6 + 12 = 46.
3. Site C: 4 × 2 + 3 × 5 + 2 × 5 + 3 × 2 = 8 + 15 + 10 + 6 = 39.
4. The maximum possible is 5 × (4 + 3 + 2 + 3) = 60, so Site B scores 46 ÷ 60 = 77%. Site B is best overall, though A has the best water; the result depends on the weights, which should be justified.
:::

:::worked-solution[Identifying the main function from employment]
Illustrative employment in a town of 10 000 jobs.

| Sector | Jobs | Share of jobs |
|---|---|---|
| Retail and wholesale | 3 600 | 36% |
| Government and services | 2 800 | 28% |
| Manufacturing | 1 900 | 19% |
| Transport and storage | 700 | 7% |
| Mining | 400 | 4% |
| Other | 600 | 6% |

1. Share of retail = 3 600 ÷ 10 000 × 100 = 36%, and the same method for the others.
2. Retail and wholesale with government services make up 36 + 28 = 64% of jobs, so the main function is that of a market and service centre.
3. Manufacturing (19%) is a secondary function. A town with 4% in mining is not a mining town.
:::

:::example{title="Why Beitbridge is where it is"}
Beitbridge is on the Limpopo River, which forms the boundary with South Africa. Its situation at the crossing of the main road and railway to South Africa gave it its function as a border and transport town: customs, immigration, clearing agents, fuel stations, hotels and freight services. Its site on the river bank gives access to water, but the town depends on its position on the trade route, not on farmland or minerals.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Site, situation, functions and rural-urban interaction are ZIMSEC Form 5 content. Cambridge covers settlement under urban areas (growth, structure and sustainability) and does not set site and situation as a separate topic.
:::

## Common mistakes

:::mistake{title="Confusing site with situation"}
Site is the actual ground a settlement stands on (water, slope, soil). Situation is its position relative to other places (roads, resources, other towns).
:::

:::mistake{title="Giving one function for every settlement"}
Most towns have several functions. Identify the main one with figures (such as the share of jobs).
:::

:::mistake{title="Describing rural-urban links in one direction only"}
Flows go both ways: people, goods, money and information move from rural to urban areas and back.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Paper 2 (topic 9), including data-response questions. *Describe* a settlement's site and situation using a map description; *explain* why it grew with site and situation factors; *assess* sites using weighted scores or criteria and a justified judgement; *suggest* ways of improving rural-urban links such as transport, markets and mobile services.
:::

## Summary

:::summary
- Site is the ground a settlement stands on; situation is its position in relation to other places.
- Water, flat well-drained land, building materials and defence influence site; roads, resources and projects influence situation.
- Suitability can be judged with weighted scores or a GIS overlay, but weights must be justified.
- Functions (administration, trade, mining, transport, tourism, manufacturing) can be identified from employment or land use.
- People, goods, money and information flow between rural and urban areas in both directions.
:::
