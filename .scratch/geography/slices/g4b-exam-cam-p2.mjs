// Slice G4b: Cambridge Paper 2 (Human Geography) exam-format questions: topic 6 Changing populations (2 × 25 marks),
// topic 7 Changing towns and cities (2 × 25 marks) and topic 8 Development (2 × 25 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

// ---------------------------------------------------------------------------------------------------------------------
// Topic 6: Changing populations
concept("geo.population.growth-dtm", { file: "exam/cam-p2-population", keyPrefix: "exam.cam-p2-population", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.population.growth-dtm", "geo.population.terms-data", "geo.population.policies"],
    stem: "Table 1 shows population data for three fictional countries (fictional data).\n\n| Country | Birth rate (per 1,000) | Death rate (per 1,000) | Total fertility rate (children per woman) |\n|---|---|---|---|\n| X (LIC) | 42 | 9 | 5.6 |\n| Y (MIC) | 18 | 6 | 2.0 |\n| Z (HIC) | 8 | 12 | 1.3 |",
    hints: ["Natural increase = birth rate − death rate; divide by 10 for a percentage.", "Natural decrease happens when deaths exceed births."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the natural increase of Country X per 1,000.", value: 33, unit: "‰", wrong: [51, 3.3], explanation: "42 − 9 = 33 per 1,000." }),
      P.num({ label: "(b)", unit: "%", stem: "Express the natural increase of Country X as a percentage.", value: 3.3, tol: 0.01, wrong: [33, 0.33], explanation: "33 ÷ 10 = 3.3%." }),
      P.mcq({
        label: "(c)", stem: "Which stage of the demographic transition model does Country Z best represent?",
        options: [
          ["Stage 5", "Correct: the death rate (12) is above the birth rate (8), so the population is declining."],
          ["Stage 2", "Stage 2 has a high birth rate and a falling death rate."],
          ["Stage 3", "In stage 3 births are still above deaths."],
          ["Stage 1", "Stage 1 has high birth and death rates."],
        ],
        answer: "A", explanation: "Natural decrease is the mark of stage 5.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why the birth rate in Country X is high.",
        points: [
          "Children are needed to work on farms / support parents in old age.",
          "High infant mortality, so parents have more children to ensure some survive.",
          "Limited access to or use of contraception / early marriage / low female education / religious or cultural views.",
        ],
        modelAnswer: "Many families farm and need children's labour and support in old age; infant mortality is high, so parents have extra children; and few women have access to contraception or stay long in school.",
        explanation: "Three distinct reasons.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe **two** strengths and **two** limitations of the demographic transition model.",
        points: [
          "Strength: simple to understand; shows how birth and death rates change with development.",
          "Strength: allows countries to be compared / used to predict future change.",
          "Limitation: based on European experience; LICs may not follow the same path or timescale.",
          "Limitation: ignores migration / disease such as HIV and AIDS / government policies / no timescale.",
        ],
        modelAnswer: "The DTM is simple and shows clearly how birth and death rates change as countries develop, and it lets us compare countries and predict change. However, it is based on Europe, so LICs may not follow the same path or speed, and it ignores migration, epidemics and policies.",
        explanation: "Two of each.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain **two** problems that Country Z may face because its population is declining.",
        points: [
          "Fewer young workers / labour shortages.",
          "Explains: e.g. businesses cannot fill jobs, tax income falls.",
          "Ageing population / more elderly dependants.",
          "Explains: e.g. rising cost of pensions and health care paid by fewer workers / schools close.",
        ],
        modelAnswer: "With few births, the number of young workers falls, so businesses struggle to fill jobs and the government collects less tax. At the same time the population ages, so pensions and health care for the elderly cost more and are paid for by fewer workers.",
        explanation: "Two problems, each explained.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe **four** measures a government like Country Z's could use to raise its birth rate.",
        points: [
          "Cash payments for each birth (baby bonus).",
          "Child allowances / tax reductions for families with children.",
          "Long paid maternity and paternity leave.",
          "Subsidised childcare / cheaper housing for large families.",
        ],
        modelAnswer: "It could pay a bonus for each baby, give monthly child allowances and tax cuts, offer long paid parental leave, and subsidise nursery places.",
        explanation: "Pro-natalist measures.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named country, evaluate the impact of a population policy on its birth rate. You should refer to a detailed specific example.",
        points: [
          "Names the country and policy type (e.g. China, anti-natalist one-child policy from about 1979-1980).",
          "Describes measures (one-child rule for most urban couples; benefits for compliance; fines and penalties; exceptions).",
          "Impact on birth rate / fertility: fell sharply; slower population growth.",
          "Other factors also lowered births (economic growth, urbanisation, education), so not all due to policy.",
          "Side effects: gender imbalance, ageing, 4-2-1 problem, human-rights concerns.",
          "Later changes (two-child 2016, three-child 2021) and continued low births.",
          "Supported judgement on how effective the policy was.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "China introduced its one-child policy in about 1979-1980 because it feared that a population of nearly 1 billion would grow faster than food supply and jobs. Most urban couples were allowed one child; those who complied received benefits such as bonuses and priority housing, while those who did not faced fines and could lose jobs. Fertility fell sharply and population growth slowed, although rapid economic growth, urbanisation and education would also have reduced births, so not all of the fall was due to the policy. The policy caused a strong gender imbalance because of son preference, a rapidly ageing population and the 4-2-1 problem, and there were serious human-rights concerns. It was replaced by a two-child policy in 2016 and a three-child policy in 2021, but births have stayed low. The policy was very effective at lowering the birth rate in the short term, but its long-term social costs were high.",
        explanation: "A detailed specific example of a population policy, with evidence and a judgement.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 6 question: population data, the DTM, population decline and an evaluation of a named population policy.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.population.migration", "geo.population.structure"],
    stem: "Table 1 shows people arriving to live in a fictional HIC in one year, by category (fictional data).\n\n| Category | Number of people |\n|---|---|\n| Economic migrants | 42,000 |\n| Refugees given protection | 15,000 |\n| Asylum seekers awaiting a decision | 8,000 |\n| Joining family members | 10,000 |\n\nTable 2 shows the age of the economic migrants: 0-14 years 9%, 15-34 years 68%, 35-64 years 21%, 65 and over 2% (fictional data).",
    hints: ["Add the four categories for the total.", "Most economic migrants are young adults."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement correctly describes a refugee?",
        options: [
          ["A person forced to flee their country by war or persecution", "Correct: refugees cannot safely return home."],
          ["A person who moves abroad to earn higher wages", "That describes an economic migrant."],
          ["A person waiting for a decision on a claim for protection", "That describes an asylum seeker."],
          ["A person who moves within their own country", "That is internal migration."],
        ],
        answer: "A", explanation: "Refugees are forced international migrants.",
      }),
      P.num({ label: "(b)", stem: "Calculate the total number of people arriving.", value: 75000, wrong: [65000, 57000], explanation: "42,000 + 15,000 + 8,000 + 10,000 = 75,000." }),
      P.num({ label: "(c)", unit: "%", stem: "Calculate economic migrants as a percentage of all arrivals.", value: 56, wrong: [42, 44], explanation: "42,000 ÷ 75,000 × 100 = 56%." }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain **two** push factors that cause people to become refugees.",
        points: [
          "War or armed conflict.",
          "Explains: homes destroyed / risk of death or injury, so people must flee.",
          "Persecution because of religion, ethnicity or political views / natural disasters destroying livelihoods.",
          "Explains: people are threatened, imprisoned or attacked, so they cannot stay safely.",
        ],
        modelAnswer: "War destroys homes and puts lives at risk, so people flee across borders for safety. Persecution because of religion, ethnic group or political views means people may be attacked or imprisoned, so they cannot safely stay.",
        explanation: "Two push factors, each explained.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Using Table 2, describe how the arrival of economic migrants is likely to affect the population structure of the HIC.",
        points: [
          "Most migrants are aged 15-34 (68%), so the working-age population increases.",
          "The pyramid widens in the young adult bars / the population becomes slightly younger.",
          "Births may rise later as young migrants have children; dependency ratio of the elderly falls.",
        ],
        modelAnswer: "With 68% aged 15-34, migrants enlarge the young working-age groups, widening those bars of the pyramid and making the population younger; later, their children may raise the birth rate.",
        explanation: "Migration is age-selective.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe the positive and negative impacts of emigration on the country the migrants leave.",
        points: [
          "Positive: remittances sent home support families / pay for education and housing.",
          "Positive: less pressure on jobs, land and services / returning migrants bring skills and savings.",
          "Negative: loss of young and skilled workers (brain drain), e.g. nurses, teachers.",
          "Negative: ageing population left behind / families separated / labour shortages on farms.",
        ],
        modelAnswer: "Remittances help families pay school fees and build houses, and there is less pressure on jobs. But the country loses young, skilled workers such as nurses, and rural areas are left with older people and fewer farm workers.",
        explanation: "Two positive and two negative impacts.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Evaluate **two** strategies that a destination country could use to manage international migration.",
        points: [
          "Strategy 1 described (e.g. points-based or skills-based visas).",
          "Evaluated: fills skills gaps but may cause brain drain from origin / excludes low-skilled.",
          "Strategy 2 described (e.g. border controls, work permits, integration programmes, aid to origin countries).",
          "Evaluated: e.g. border controls costly and push migrants to dangerous routes; aid tackles causes but is slow.",
        ],
        modelAnswer: "A points-based visa system lets in people with skills the country needs, which helps its economy, but it drains skilled workers from poorer countries. Giving aid to origin countries can reduce the push factors that make people leave, but it is slow and depends on good governance there.",
        explanation: "Two strategies, each with a judgement.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named example of international migration, explain its causes and its impacts on the destination country. You should refer to a detailed specific example.",
        points: [
          "Names the migration flow (e.g. Zimbabwe to South Africa).",
          "Push factors at the origin (e.g. economic decline after about 2000, unemployment, hyperinflation in 2007-2008, drought).",
          "Pull factors at the destination (e.g. jobs, higher wages, proximity via Beitbridge, family networks).",
          "Positive impacts on destination: labour for construction, farming, services; skills; new businesses.",
          "Negative impacts on destination: competition for low-paid jobs, pressure on housing and services.",
          "Social tension, e.g. xenophobic violence (2008, 2015); management by permits and border controls.",
          "Supported conclusion on the overall impact.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Since about 2000 many Zimbabweans have migrated to South Africa. They were pushed by economic decline, very high unemployment, hyperinflation in 2007-2008 and droughts that hit farming, and pulled by jobs and higher wages in southern Africa's largest economy, which is close by road through Beitbridge and where relatives already lived. In South Africa migrants provide labour in construction, farming, hospitality and domestic work, bring skills such as teaching and nursing, and start small businesses. However, they compete for low-paid jobs and housing in poorer urban areas, and there have been outbreaks of xenophobic violence, notably in 2008 and 2015. South Africa has used special permits from about 2010 to let many Zimbabweans work legally, alongside border controls. Overall the migration benefits South Africa's economy, but it has caused social tension that must be managed.",
        explanation: "A detailed specific example of international migration.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 6 question: migrant categories, migration data, impacts and management, and a named international migration.",
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Topic 7: Changing towns and cities
concept("geo.settlement.urbanisation", { file: "exam/cam-p2-towns", keyPrefix: "exam.cam-p2-towns", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.settlement.urbanisation", "geo.settlement.urban-challenges", "geo.settlement.unplanned"],
    stem: "Table 1 shows the percentage of the population living in urban areas in three fictional countries (fictional data).\n\n| Country | 1980 | 2020 |\n|---|---|---|\n| A (HIC) | 74 | 82 |\n| B (MIC) | 35 | 61 |\n| C (LIC) | 12 | 30 |\n\nResource: on the edge of the largest city of Country C, an unplanned settlement has grown on steep land beside a river. Homes are built of scrap metal and plastic sheeting, there are few toilets, and water is bought from vendors.",
    hints: ["Percentage-point change = 2020 value − 1980 value.", "Think about migration and natural increase."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the change in the percentage urban in Country B between 1980 and 2020 (in percentage points).", value: 26, wrong: [96, 74], explanation: "61 − 35 = 26 percentage points." }),
      P.mcq({
        label: "(b)", stem: "Which country had the smallest increase in its percentage urban?",
        options: [
          ["Country A", "Correct: it rose by only 8 points (74 to 82)."],
          ["Country B", "B rose by 26 points."],
          ["Country C", "C rose by 18 points."],
          ["All rose by the same amount", "The increases are 8, 26 and 18 points."],
        ],
        answer: "A", explanation: "HICs are already highly urbanised, so growth is slow.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the rate of urban growth is slow in HICs such as Country A.",
        points: [
          "Most people already live in towns, so few rural people are left to migrate.",
          "Low birth rates mean little natural increase in cities.",
          "Counter-urbanisation: some people move from cities to rural areas or small towns.",
        ],
        modelAnswer: "Most people in A already live in towns, so few remain in rural areas to migrate; birth rates are low; and some city dwellers move out to the countryside.",
        explanation: "Three reasons.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain the causes of rapid urban growth in LICs such as Country C.",
        points: [
          "Rural-urban migration due to push factors (poverty, drought, lack of land, few services).",
          "Pull factors: jobs (including informal), higher wages, schools, hospitals in cities.",
          "High natural increase in cities: many young migrants of child-bearing age; high birth rates.",
          "Falling death rates in cities due to better health care, adding to growth.",
        ],
        modelAnswer: "Rural people are pushed out by poverty, drought and land shortage and pulled to cities by jobs, higher wages and better schools and hospitals. Because most migrants are young adults, they have children in the city, and with better health care death rates are low, so natural increase adds greatly to growth.",
        explanation: "Migration and natural increase.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Using the resource, describe **three** characteristics of the unplanned settlement.",
        points: [
          "Built on unsafe land (steep slopes, beside a river - risk of landslides or floods).",
          "Homes of scrap or temporary materials (metal, plastic sheeting).",
          "Poor services: few toilets, no piped water (water bought from vendors).",
        ],
        modelAnswer: "It is on steep land by a river, homes are made of scrap metal and plastic, and there are few toilets and no piped water.",
        explanation: "Use the resource.",
      }),
      P.manual({
        label: "(f)", marks: 3, stem: "Describe **three** opportunities of urban living for migrants arriving in the city.",
        points: [
          "More jobs, in both formal and informal sectors, and higher incomes.",
          "Better access to schools, hospitals and clinics.",
          "Electricity, water, entertainment, transport / chance to send remittances home.",
        ],
        modelAnswer: "Migrants can find work, even informal jobs such as trading, and earn more than in rural areas; children can attend better schools; and health care, electricity and transport are easier to reach.",
        explanation: "Three opportunities.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Describe the impacts of urban sprawl on the rural-urban fringe.",
        points: [
          "Loss of farmland and natural habitats to housing, roads and industry.",
          "Rising land prices / farmers sell land; traffic and pollution increase.",
          "Unplanned settlements or out-of-town developments spread; services overstretched; dumping of waste.",
        ],
        modelAnswer: "As the city spreads, farmland and woodland are built over, land prices rise and traffic and pollution increase, while unplanned settlements and illegal dumping spread on the edge.",
        explanation: "Impacts on the fringe.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named urban area in an LIC or MIC, describe the challenges caused by its rapid growth. You should refer to a detailed specific example.",
        points: [
          "Names the city and gives its context (e.g. Mumbai, India: one of the world's largest cities).",
          "Causes of growth: migration from rural states / natural increase.",
          "Housing: unplanned settlements such as Dharavi, overcrowded, on marginal land.",
          "Water and sanitation: shortages, shared toilets, water-borne disease.",
          "Traffic congestion and overcrowded trains; air pollution.",
          "Waste: large dumps, uncollected refuse; flooding when drains block (e.g. 2005 floods).",
          "Employment: many in informal work with low, insecure incomes; inequality.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Mumbai in India has grown rapidly because of migration from poorer rural states and high natural increase, and its urban area now holds many millions of people (approximate). A large share of people live in unplanned settlements such as Dharavi, one of Asia's largest, where houses are crowded close together, many families share toilets and water supply is limited, so water-borne diseases spread. Roads are badly congested and suburban trains are severely overcrowded, adding to air pollution. Refuse collection cannot keep up, so waste piles up at large dumps and blocks drains, which made the 2005 floods worse. Many residents work in the informal sector with low, insecure incomes, while the city also has very wealthy areas, so inequality is great. Rapid growth has therefore created challenges for housing, services, transport and the environment.",
        explanation: "A detailed specific example of the challenges of urban growth.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 7 question: urban growth rates, causes of growth in LICs, unplanned settlements, sprawl and a named city's challenges.",
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.settlement.urban-management", "geo.settlement.unplanned", "geo.settlement.urban-challenges"],
    stem: "Resource: a fictional city in an MIC has introduced three strategies to manage its rapid growth: (1) a bus rapid transit (BRT) system with dedicated bus lanes; (2) upgrading of an unplanned settlement by laying water pipes, building toilet blocks and giving residents legal title; (3) a green belt around the city.\n\nTable 1 shows average morning journey times on one main route (fictional data).\n\n| | Before BRT | After BRT |\n|---|---|---|\n| By bus (minutes) | 75 | 45 |\n| By car (minutes) | 58 | 52 |",
    hints: ["Percentage change = change ÷ original × 100.", "Upgrading improves homes where people already live."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage reduction in bus journey time after the BRT opened.", value: 40, wrong: [30, 66.7], explanation: "(75 − 45) ÷ 75 × 100 = 40%." }),
      P.mcq({
        label: "(b)", stem: "What is the main purpose of a green belt?",
        options: [
          ["To limit urban sprawl into the countryside", "Correct: building is strictly controlled in the belt."],
          ["To provide space for new factories", "Industry is restricted in green belts."],
          ["To house migrants in new settlements", "Housing is restricted in green belts."],
          ["To widen roads into the city centre", "Green belts are about land use, not roads."],
        ],
        answer: "A", explanation: "Green belts protect open land around a city.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Using Table 1, explain why BRT can reduce traffic congestion.",
        points: [
          "Dedicated lanes let buses avoid traffic, so bus journeys are much faster (75 to 45 minutes).",
          "Faster buses persuade some car users to switch to public transport.",
          "Fewer cars on the road, so car journeys also become slightly faster (58 to 52 minutes).",
        ],
        modelAnswer: "With their own lanes, buses avoid jams and journey times fell from 75 to 45 minutes, so some drivers switch to the bus and fewer cars use the road; car times also fell from 58 to 52 minutes.",
        explanation: "Use data in the explanation.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain why upgrading an unplanned settlement may be better than demolishing it.",
        points: [
          "Residents keep their homes, jobs and community networks close by.",
          "Cheaper than building new housing for everyone.",
          "Legal title gives security, so residents invest in improving their homes.",
          "Water pipes and toilets reduce disease quickly / demolition makes people homeless and they rebuild elsewhere.",
        ],
        modelAnswer: "Upgrading lets people stay near their jobs and neighbours, costs far less than new housing, and legal title encourages them to improve their homes. Piped water and toilets cut disease, whereas demolition leaves people homeless and they simply build elsewhere.",
        explanation: "Four reasons.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Describe how a site-and-service scheme works.",
        points: [
          "The authority provides plots of land.",
          "Plots have basic services (water, sewer connections, roads, sometimes electricity).",
          "Residents build their own houses, often gradually, sometimes with low-cost loans or a small rent.",
        ],
        modelAnswer: "The city provides serviced plots with water, sewerage and access roads, and families build their own homes on them as they can afford, sometimes with small loans.",
        explanation: "Three steps.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Describe **four** features of a sustainable city.",
        points: [
          "Efficient public transport, cycle lanes and walkable neighbourhoods.",
          "Renewable energy and energy-efficient buildings.",
          "Waste reduction, recycling and composting; water conservation and recycling.",
          "Green spaces / affordable housing and services for all / local participation in decisions.",
        ],
        modelAnswer: "A sustainable city has good public transport and cycle lanes, uses solar and other renewable energy, recycles waste and water, and has green spaces and affordable housing for everyone.",
        explanation: "Four features.",
      }),
      P.manual({
        label: "(g)", marks: 2, stem: "Suggest **two** reasons why strategies like these may fail in an LIC or MIC city.",
        points: [
          "Lack of money / high cost of building and maintaining schemes.",
          "Population grows faster than schemes can be provided / corruption / poor people cannot afford the plots or fares.",
        ],
        modelAnswer: "The city may lack funds to build and maintain them, and growth may outpace what is provided.",
        explanation: "Two reasons.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named urban area, evaluate the strategies used to manage its growth. You should refer to a detailed specific example.",
        points: [
          "Names the urban area and the growth problems it faces (e.g. Harare: housing, water, transport, waste).",
          "Housing strategy described (e.g. site-and-service schemes, upgrading, satellite towns such as Chitungwiza).",
          "Evaluation of housing strategy (e.g. demand exceeds supply; unplanned settlements such as Epworth persist).",
          "Water and sanitation strategy and its success or limits (e.g. treatment works, boreholes; shortages remain).",
          "Transport strategy and evaluation (e.g. buses, road improvements; congestion from minibuses).",
          "Waste management strategy and evaluation (e.g. collection, recycling; illegal dumping).",
          "Supported overall judgement on how successful management has been.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Harare, Zimbabwe's capital, has grown rapidly through rural-urban migration and natural increase. To house people, the city has used site-and-service schemes, where plots with water and sewer connections are provided for families to build on, and satellite towns such as Chitungwiza, which house many workers who commute to Harare. These have provided homes for many, but demand has always exceeded supply, and unplanned or partly planned settlements such as Epworth have continued to grow on the edge of the city. Water treatment has not kept pace with the population, so many suburbs rely on boreholes and water vendors; the failure of water and sewage systems contributed to the 2008-2009 cholera outbreak. Commuter buses and minibuses carry most people, but congestion in the CBD is severe. Refuse collection is irregular, and illegal dumping is common. Overall, management has achieved some successes in housing but has not kept up with growth, mainly because of a lack of funds, so challenges remain.",
        explanation: "A detailed specific example of managing urban growth.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 7 question: transport, upgrading, site-and-service, green belts, sustainable cities and an evaluation of a named city's management.",
  });
});

// ---------------------------------------------------------------------------------------------------------------------
// Topic 8: Development
concept("geo.development.measuring", { file: "exam/cam-p2-development", keyPrefix: "exam.cam-p2-development", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.development.measuring", "geo.development.uneven"],
    stem: "Table 1 shows development indicators for three fictional countries (fictional data).\n\n| Indicator | Country P | Country Q | Country R |\n|---|---|---|---|\n| GNI per capita (US\\$, PPP) | 1,450 | 11,600 | 46,400 |\n| Life expectancy (years) | 59 | 72 | 81 |\n| Infant mortality (per 1,000 live births) | 52 | 15 | 4 |\n| Adult literacy (%) | 58 | 91 | 99 |",
    hints: ["Divide the larger GNI by the smaller.", "A high infant mortality rate means low development."],
    parts: [
      P.num({ label: "(a)", unit: "years", stem: "Calculate the difference in life expectancy between Country R and Country P.", value: 22, wrong: [140, 9], explanation: "81 − 59 = 22 years." }),
      P.num({ label: "(b)", stem: "How many times greater is Country R's GNI per capita than Country P's?", value: 32, wrong: [44950, 4], explanation: "46,400 ÷ 1,450 = 32." }),
      P.mcq({
        label: "(c)", stem: "Which indicator in Table 1 is an **economic** indicator?",
        options: [
          ["GNI per capita", "Correct: it measures income."],
          ["Life expectancy", "This is a social (health) indicator."],
          ["Infant mortality", "This is a social (health) indicator."],
          ["Adult literacy", "This is a social (education) indicator."],
        ],
        answer: "A", explanation: "Economic indicators measure wealth and income.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using Table 1, describe the relationship between GNI per capita and infant mortality.",
        points: [
          "As GNI per capita increases, infant mortality decreases (negative / inverse relationship).",
          "Quotes data for the lowest: P US\\$1,450 and 52 per 1,000.",
          "Quotes data for the highest: R US\\$46,400 and 4 per 1,000.",
        ],
        modelAnswer: "Infant mortality falls as income rises: P has a GNI per capita of US\\$1,450 and 52 deaths per 1,000, while R has US\\$46,400 and only 4.",
        explanation: "Describe with data.",
      }),
      P.manual({
        label: "(e)", marks: 3, stem: "Suggest **three** limitations of using GNI per capita to measure development.",
        points: [
          "It is an average that hides inequality between rich and poor.",
          "The informal economy and subsistence farming are not counted.",
          "It measures only income, not health, education, freedom or the environment / data may be unreliable.",
        ],
        modelAnswer: "GNI per capita is an average that hides inequality, it misses informal work and subsistence farming, and it says nothing about health, education or freedom.",
        explanation: "Three limitations.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain why the Human Development Index (HDI) is often considered a better measure of development than GNI per capita.",
        points: [
          "HDI combines three dimensions: health (life expectancy), education (years of schooling) and income (GNI per capita).",
          "It shows whether income is turned into better lives.",
          "Countries with similar GNI can have very different HDI, revealing differences in health and education.",
          "Limitation noted: still an average / ignores inequality, freedom, environment.",
        ],
        modelAnswer: "The HDI combines life expectancy, years of schooling and GNI per capita, so it shows whether wealth is turned into health and education. Two countries with the same income can have very different HDIs. However, it is still an average and ignores inequality and freedom.",
        explanation: "Explain and qualify.",
      }),
      P.manual({
        label: "(g)", marks: 5, stem: "Explain how historical, economic and environmental factors can cause differences in development between countries.",
        points: [
          "Historical: colonialism organised economies to export raw materials / borders / late industrialisation.",
          "Economic: dependence on primary exports with low, unstable prices.",
          "Economic: poor terms of trade / debt repayments reduce spending on services.",
          "Environmental: hazards such as droughts, floods, cyclones destroy crops and infrastructure.",
          "Environmental: tropical diseases / being landlocked raises transport costs.",
        ],
        modelAnswer: "Colonialism geared many economies to exporting raw materials. Many LICs still depend on primary exports whose prices are low and unstable, and poor terms of trade and debt repayments leave little money for schools and clinics. Droughts, floods and cyclones destroy crops and roads, diseases such as malaria reduce productivity, and landlocked countries pay more to trade.",
        explanation: "Range of factors, each explained.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named LIC or MIC, explain the factors that have affected its level of development. You should refer to a detailed specific example.",
        points: [
          "Names the country and its level (e.g. Zimbabwe, lower-middle-income).",
          "Historical factors (e.g. colonial economy based on mining and commercial farming exports; railways to ports).",
          "Economic factors (e.g. dependence on minerals and tobacco; economic crisis and hyperinflation 2007-2008; debt arrears).",
          "Environmental factors (e.g. landlocked; droughts; Cyclone Idai 2019).",
          "Social factors (e.g. relatively high literacy; HIV and AIDS reduced the workforce; emigration of skilled workers).",
          "Positive factors (e.g. mineral wealth, tourism such as Victoria Falls, educated workforce).",
          "Links factors together / overall judgement on the most important.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Zimbabwe is classed by the World Bank as a lower-middle-income country. During the colonial period its economy was built around exporting minerals and farm products, with railways leading to ports in neighbouring countries, and it still depends heavily on primary exports such as gold, platinum and tobacco, whose prices vary. Being landlocked, it must move exports through Mozambique or South Africa, which raises costs. A severe economic crisis, including hyperinflation in 2007-2008, closed many businesses, and large external debt arrears limit new lending. Droughts reduce harvests in a country where many people farm, and Cyclone Idai in 2019 destroyed roads, homes and farms in the east. HIV and AIDS reduced the working-age population, and many skilled workers have emigrated. On the other hand, Zimbabwe has rich mineral resources, major tourist attractions such as Victoria Falls, and relatively high literacy. Economic instability and dependence on primary products have probably held back development most.",
        explanation: "A detailed specific example of the factors affecting development.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 8 question: development indicators, HDI, reasons for the development gap and a named country's development.",
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.development.sustainable", "geo.development.uneven"],
    stem: "Table 1 shows the world market price of a fictional crop and the fair trade minimum price paid to cooperative members (US\\$ per tonne, fictional data). Fair trade buyers pay the minimum price or the market price, whichever is higher, plus a premium of US\\$200 per tonne.\n\n| Year | World market price | Fair trade minimum price |\n|---|---|---|\n| 1 | 3,300 | 3,000 |\n| 2 | 2,600 | 3,000 |\n| 3 | 2,150 | 3,000 |",
    hints: ["In Year 3 the minimum price is higher than the market price.", "Premium = tonnes × US\\$200."],
    parts: [
      P.num({ label: "(a)", stem: "In Year 3, how much more per tonne (US\\$, excluding the premium) did a fair trade farmer receive than the world market price?", value: 850, wrong: [3000, 650], explanation: "3,000 − 2,150 = US\\$850." }),
      P.num({ label: "(b)", stem: "A cooperative sold 65 tonnes in Year 3. Calculate the total premium it received (US\\$).", value: 13000, wrong: [195000, 265], explanation: "65 × 200 = US\\$13,000." }),
      P.mcq({
        label: "(c)", stem: "Which statement best defines sustainable development?",
        options: [
          ["Meeting present needs without harming the ability of future generations to meet theirs", "Correct: this is the Brundtland idea."],
          ["Raising GDP as fast as possible, whatever the long-term cost to the environment", "This ignores future generations."],
          ["Stopping all economic growth so that natural resources are never used again", "Sustainable development allows growth."],
          ["Relying on emergency aid from richer countries to meet basic needs every year", "Dependence on aid is not sustainable."],
        ],
        answer: "A", explanation: "Present and future needs are balanced.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using Table 1, explain how fair trade can help farmers in LICs.",
        points: [
          "The minimum price protects farmers when market prices fall (e.g. Year 3: US\\$3,000 instead of US\\$2,150).",
          "A stable income lets farmers plan, invest and avoid debt.",
          "The premium (US\\$200 per tonne) pays for community projects such as schools, clinics or wells.",
        ],
        modelAnswer: "When the market price fell to US\\$2,150 in Year 3, fair trade farmers still got US\\$3,000, giving them a stable income to plan and invest, and the US\\$200 premium per tonne paid for community projects.",
        explanation: "Use the data.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe **two** types of international aid and **one** problem of each.",
        points: [
          "Type 1 described (e.g. emergency / short-term aid: food, shelter, medicine after a disaster).",
          "Problem of type 1 (e.g. food aid can undercut local farmers / creates dependency).",
          "Type 2 described (e.g. long-term development aid, bilateral, multilateral, NGO or tied aid).",
          "Problem of type 2 (e.g. tied aid benefits donor firms / top-down projects unsuited to local needs / corruption).",
        ],
        modelAnswer: "Emergency aid provides food and shelter after disasters, but large food aid can lower local crop prices. Tied bilateral aid must be spent on goods from the donor, so it benefits the donor's firms more than the recipient.",
        explanation: "Two types, each with a problem.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain the advantages and disadvantages of debt relief for LICs.",
        points: [
          "Advantage: money previously spent on repayments can go to health, education and infrastructure.",
          "Advantage: breaks the cycle of borrowing to repay old debts.",
          "Disadvantage: conditions attached (reforms, spending cuts) can hurt the poor.",
          "Disadvantage: money saved may be lost to corruption / may encourage new borrowing.",
        ],
        modelAnswer: "Debt relief, such as under the HIPC initiative, frees money for schools and clinics and ends borrowing to repay old debts. However, it often came with conditions such as spending cuts, and without good governance the savings may be wasted or new debts built up.",
        explanation: "Two advantages and two disadvantages.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe social, economic and environmental strategies that can help a country achieve sustainable development.",
        points: [
          "Social: e.g. free primary education / health care for all / gender equality.",
          "Economic: e.g. diversification / adding value to raw materials / microfinance.",
          "Environmental: e.g. conservation farming / renewable energy / reforestation.",
          "Appropriate technology / community (bottom-up) projects so local people can maintain them.",
        ],
        modelAnswer: "Socially, countries can provide free primary schooling and community health care. Economically, they can process raw materials before export and support small businesses with microfinance. Environmentally, they can promote conservation farming and solar power, using appropriate technology that local people can maintain.",
        explanation: "All three pillars plus appropriate technology.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named LIC or MIC, evaluate the strategies it has used to develop. You should refer to a detailed specific example.",
        points: [
          "Names the country (e.g. Zimbabwe, lower-middle-income) and its development aims (e.g. Vision 2030: upper-middle income).",
          "Economic strategy: mining with local processing of minerals; agriculture; tourism.",
          "Agricultural / environmental strategy: Pfumvudza/Intwasa conservation agriculture; solar alongside Kariba HEP.",
          "Social strategy: health care and HIV treatment (often aid-supported); education.",
          "Trade and aid: SADC and AfCFTA membership; humanitarian aid after droughts and Cyclone Idai.",
          "Obstacles: drought, debt arrears, power shortages, dependence on primary exports.",
          "Supported judgement on which strategies are most effective and sustainable.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Zimbabwe, a lower-middle-income country, aims through Vision 2030 to become an upper-middle-income society, carried out through plans such as NDS1 (2021-2025). It relies on mining of gold, platinum, lithium and other minerals and is trying to process more ore locally rather than export it raw, which adds value and jobs. In farming, the Pfumvudza/Intwasa conservation agriculture programme uses small plots, minimum tillage and mulching to raise yields and resist drought. Tourism at Victoria Falls, Hwange and Great Zimbabwe earns foreign currency. Health programmes, often supported by multilateral aid, have expanded HIV treatment. Zimbabwe trades through SADC and the African Continental Free Trade Area, and has received humanitarian aid during droughts and after Cyclone Idai. However, debt arrears limit new loans, droughts and power shortages hit output, and the economy still depends on primary exports. Value-added processing and conservation farming are the most sustainable strategies, but progress depends on economic stability.",
        explanation: "A detailed specific example of development strategies, evaluated.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 8 question: fair trade, aid, debt relief, sustainable development strategies and a named country's strategies.",
  });
});
