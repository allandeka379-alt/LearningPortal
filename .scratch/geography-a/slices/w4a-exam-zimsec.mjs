// W4a exam rows (ZIMSEC): ZIM_STRUCT25 x 5 — Paper 2: population x 2 (topic 8: indicators and policy; migration), settlement x 2 (topic 9:
// hierarchy and growth points; land reform and resettlement), regional inequalities x 1 (topic 15). All datasets are invented for this
// exercise; every number is computed in code. The 8-mark final parts are self-marked with levels of response.
import { concept, P, chk, rnd, table, dpStr, sum, spearman, per1000, naturalIncreasePct, dependencyRatio, rankSize, checkExam, EXAM, geographyLevels, ZIM } from "../lib.mjs";
import { fmt } from "../tables/w4a-_h.mjs";

const BASE = { d: 4, skill: EXAM.ZIM_STRUCT25.skill, secs: EXAM.ZIM_STRUCT25.secs, examStyle: true, paper: "Paper 2", applies: EXAM.ZIM_STRUCT25.applies };

// ---- Item 1: District X indicators and family planning (topic 8)
const X = { pop: 420000, births: 16800, deaths: 4200, infant: 840, u15: 189000, w: 214000, o65: 17000 };
chk(X.u15 + X.w + X.o65, X.pop);
const cbrX = chk(per1000(X.births, X.pop), 40);
const cdrX = chk(per1000(X.deaths, X.pop), 10);
const niX = chk(naturalIncreasePct(cbrX, cdrX), 3);
const imrX = chk(per1000(X.infant, X.births), 50);
const depX = dependencyRatio(X.u15, X.o65, X.w); // 96.26
const XT = table(["Indicator for District X (one year)", "Value"], [
  ["Population", fmt(X.pop)], ["Live births", fmt(X.births)], ["Deaths (all ages)", fmt(X.deaths)], ["Deaths of children under one year", fmt(X.infant)],
  ["People under 15", fmt(X.u15)], ["People of working age", fmt(X.w)], ["People aged 65 and over", fmt(X.o65)],
]);

// ---- Item 2: net migration in three provinces (topic 8)
const PR = [["H (includes the capital)", 64000, 22000, 2100000], ["M (farming)", 18000, 30000, 1500000], ["N (dry, remote)", 6000, 21000, 900000]];
const netH = chk(64000 - 22000, 42000);
const rateH = chk(per1000(netH, 2100000), 20, 1e-9);
const rateN = per1000(6000 - 21000, 900000); // -16.67
const PT = table(["Province", "People moving in", "People moving out", "Population"], PR.map((r) => [r[0], fmt(r[1]), fmt(r[2]), fmt(r[3])]));
const rateM = chk(per1000(18000 - 30000, 1500000), -8, 1e-9);

// ---- Item 3: hierarchy and growth point services (topic 9)
const TOWNS = [1, 2, 3, 4, 5].map((rk, i) => [rk, [1600, 480, 390, 310, 190][i]]);
const exp4 = chk(rankSize(1600, 4), 400);
const prim = 1600 / 480; // 3.33
const TT = table(["Rank", "Population (thousands)"], TOWNS);
const gpPct = (8 / 12) * 100; // 66.7

// ---- Item 4: resettlement ward (topic 9)
const W = [["A1 villagised", 66], ["A1 self-contained", 44], ["A2", 30]];
chk(sum(W.map((w) => w[1])), 140);
const a1pct = (110 / 140) * 100; // 78.57
const avgPlot = chk(7000 / 140, 50, 1e-9);
const perBh = chk(66 / 6, 11, 1e-9);
const WT = table(["Type of holding", "Number of holdings"], W);

// ---- Item 5: districts, distance to a tarred road and poverty (topic 15)
const DS = ["D1", "D2", "D3", "D4", "D5", "D6"];
const dist = [5, 12, 20, 33, 47, 60];
const pov = [38, 45, 61, 52, 74, 82];
const sp = spearman(dist, pov);
chk(sp.sumD2, 2);
chk(sp.crit, 0.886);
const meanPov = (38 + 45 + 61 + 52 + 74 + 82) / 6; // 58.67
const RT = table(["District", "Distance to nearest tarred road (km)", "Households below the poverty line (%)"], DS.map((d, i) => [d, dist[i], pov[i]]));
const RK = table(["District", "Rank of distance", "Rank of poverty", "d", "d²"], sp.rows.map((r, i) => [DS[i], r.rx, r.ry, r.d, r.d2]));

concept("ageo.pop.indicators-components", { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  // ============================================================ Item 1
  b.struct({
    ...BASE,
    concepts: ["ageo.pop.indicators-components", "ageo.pop.policies"],
    hints: ["Rates are per 1 000 people; natural increase as a percentage is the difference divided by 10.", "In (e) weigh the success of voluntary family planning against other factors and reach a judgement."],
    stem: `The table gives data for District X, a rural district in Zimbabwe (data invented for this exercise).\n\n${XT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the crude birth rate, per 1 000 people.", value: cbrX, unit: "per 1000", wrong: [4, 0.04], explanation: "16 800 ÷ 420 000 × 1 000 = 40 per 1 000." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the natural increase, as a percentage. The crude death rate is 10 per 1 000.", value: niX, unit: "%", wrong: [30, 5], explanation: "(40 − 10) ÷ 10 = 3.0%. Giving 30 forgets to convert from per 1 000 to a percentage." }),
          P.num({ label: "(iii)", marks: 2, type: "CALCULATION", stem: "Calculate the infant mortality rate, per 1 000 live births.", value: imrX, unit: "per 1000", wrong: [2, 840], explanation: "840 ÷ 16 800 × 1 000 = 50 per 1 000 live births. Dividing by the total population gives 2." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why the birth rate and the infant mortality rate are both high in District X.",
        points: [
          "Limited access to contraception and family planning services in rural areas keeps fertility high.",
          "Children provide farm labour and security in old age, so large families are valued.",
          "Many babies die, so parents have more children to be sure that some survive.",
          "Poor access to clinics, safe water and nutrition causes infant deaths from diarrhoea, malaria and malnutrition.",
        ],
        modelAnswer: "Limited access to family planning keeps fertility high, and children provide farm labour and security in old age. Because many babies die, parents have more children. Infant deaths are high because clinics are far away and water and nutrition are poor.",
        explanation: "Link fertility and infant deaths to rural economic and health conditions." }),
      P.group({
        label: "(c)", stem: "Age structure of District X.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the dependency ratio, to one decimal place.", value: depX, dp: 1, wrong: [45, 0.9], explanation: "(189 000 + 17 000) ÷ 214 000 × 100 = 96.3." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which shape of population pyramid is most likely?", options: [
            ["A wide base and steep sides", "Correct: a high birth rate gives a large youthful population."],
            ["A narrow base and a wide top", "That shape belongs to an ageing population."],
            ["Straight sides", "That shape belongs to a stationary population."],
            ["A wide middle only", "That would suggest migration of workers."],
          ], answer: "A", explanation: "With 45% of the population under 15, the pyramid has a wide base." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest four measures that could reduce the infant mortality rate in District X.",
        points: [
          "Build or upgrade clinics and provide trained midwives and antenatal care.",
          "Run vaccination programmes and treat diarrhoea and malaria.",
          "Provide boreholes and sanitation to give safe water.",
          "Educate mothers on nutrition and breastfeeding, or provide food support for poor families.",
        ],
        modelAnswer: "Build or upgrade clinics with trained midwives and antenatal care, run vaccination programmes and treat diarrhoea and malaria, provide boreholes and sanitation for safe water, and educate mothers on nutrition and breastfeeding.",
        explanation: "Health care, disease control, water and nutrition." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the success of voluntary family planning programmes in reducing population growth in Zimbabwe.",
        points: [
          "Zimbabwe's programme, run through the National Family Planning Council, clinics and community distribution, relies on voluntary use of contraception.",
          "Contraceptive use rose and fertility fell from more than five children per woman in the 1980s to about four in the 2010s.",
          "Voluntary methods respect choice and are acceptable, and are more lasting than coercion.",
          "Fertility is still above replacement level, so natural increase remains high.",
          "Other factors also lowered fertility: education of girls, urbanisation, cost of children and the effect of HIV/AIDS.",
          "Access is limited in remote areas where clinics are far away and supplies are unreliable.",
          "Cultural and religious beliefs, and the need for children in farming families, limit the effect.",
          "Judgement: the programme has been partly successful in reducing fertility, but it works best together with education, health care and economic change.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Zimbabwe's programme relies on voluntary use of contraception, supplied through clinics and community distribution by the National Family Planning Council. Contraceptive use rose and fertility fell from more than five children per woman in the 1980s to about four in the 2010s, and voluntary methods respect choice and last longer than coercion. However, fertility is still above replacement level, so natural increase remains high. Education of girls, urbanisation, the cost of children and HIV/AIDS also lowered fertility, so the programme cannot take all the credit. Access is limited in remote areas where clinics are far away and supplies are unreliable, and cultural beliefs and the need for children on farms limit its effect. Overall the programme has been partly successful, and works best together with education, health care and economic change.",
        explanation: "Weigh the achievements of voluntary family planning against other factors and limits, and judge." }),
    ]),
    explanation: "Calculate demographic indicators from data, explain high fertility and infant mortality, and assess a population policy.",
  });

  // ============================================================ Item 2
  b.struct({
    ...BASE,
    concepts: ["ageo.pop.migration-types-patterns", "ageo.pop.migration-causes-impacts"],
    hints: ["Net migration = in − out; the rate is per 1 000 of the population.", "In (e) cover both source and destination areas and give a judgement."],
    stem: `The table shows migration in three provinces of a country in one year (data invented for this exercise).\n\n${PT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the net migration of Province H.", value: netH, unit: "people", wrong: [86000, -42000], explanation: "64 000 − 22 000 = +42 000 people." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the net migration rate of Province H, per 1 000 people.", value: rateH, unit: "per 1000", wrong: [2, 42], explanation: "42 000 ÷ 2 100 000 × 1 000 = +20 per 1 000." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which province has a net loss of people?", options: [
            ["Both M and N", "Correct: M loses 12 000 and N loses 15 000."],
            ["H only", "H gains 42 000 people."],
            ["M only", "N also loses people."],
            ["N only", "M also loses people."],
          ], answer: "A", explanation: "M: 18 000 − 30 000 = −12 000. N: 6 000 − 21 000 = −15 000." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which term describes the movement of people from Province N to Province H?", options: [
            ["Internal rural-urban migration", "Correct: within the country, from a rural area to a city."],
            ["International migration", "The movement is within one country."],
            ["Counter-urbanisation", "That is movement from a city to the countryside."],
            ["Seasonal circular migration", "The table does not say that the moves are temporary."],
          ], answer: "A", explanation: "It is internal, and from a rural province to the province containing the capital." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why many people leave Province N.",
        points: [
          "Low and unreliable rainfall and poor soils make farming risky and incomes low.",
          "Few jobs outside farming, so young adults look for work elsewhere.",
          "Poor schools, clinics and roads in a remote province.",
          "Relatives and information about jobs in Province H attract migrants (pull factors).",
        ],
        modelAnswer: "Low and unreliable rainfall and poor soils make farming risky and incomes low, and there are few other jobs. Schools, clinics and roads are poor. Relatives and information about jobs in Province H attract young adults.",
        explanation: "Push factors in the source area and pull factors from the destination." }),
      P.group({
        label: "(c)", stem: "Province N.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the net migration rate of Province N, per 1 000 people, to one decimal place (give a negative sign for a net loss).", value: rateN, dp: 1, unit: "per 1000", wrong: [16.7, -15000], explanation: "(6 000 − 21 000) ÷ 900 000 × 1 000 = −16.7 per 1 000." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "How does Province N's net migration rate compare with that of Province M (−8 per 1 000)?", options: [
            ["Province N loses people at about twice the rate", "Correct: −16.7 is about twice −8."],
            ["Province N loses people at half the rate", "N's loss is larger."],
            ["Both lose people at the same rate", "The rates are different."],
            ["Province N gains people", "Its net migration is negative."],
          ], answer: "A", explanation: "16.7 ÷ 8 is about 2." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain how the loss of young adults affects Province N.",
        points: [
          "A shortage of labour on farms, so fields may be left uncultivated.",
          "The population is older, with more women and children, so the dependency ratio rises.",
          "Remittances may raise incomes and pay for school fees and food.",
          "Schools and clinics may have too few users and may close, so services decline.",
        ],
        modelAnswer: "There is a shortage of labour on farms, so fields may be left uncultivated, and the population becomes older with a higher dependency ratio. Remittances may raise incomes, but schools and clinics may close for lack of users.",
        explanation: "Labour, age structure, money and services." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the impacts of rural-urban migration on the source and destination areas in Zimbabwe.",
        points: [
          "Source areas lose young and skilled people, leaving an older population and labour shortages on farms.",
          "Remittances raise incomes, pay school fees and food bills, and reduce pressure on land.",
          "Destination cities gain workers, spending and a younger population, which can support industry and services.",
          "Rapid growth causes shortages of housing, informal settlements and pressure on water and sanitation, for example around Harare.",
          "Unemployment and the informal sector grow in cities, and competition for jobs may keep wages low.",
          "Migrants may gain income and services, but may also face poor housing and insecurity.",
          "The size of the impact depends on the numbers, skills and age of the migrants and on the capacity of the city to cope.",
          "Judgement: migration benefits migrants and brings some gains to both areas, but the costs, especially pressure on cities and loss of workers in rural areas, are large unless rural development and urban planning keep pace.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Source areas lose young and skilled people, leaving an older population and labour shortages on farms, although remittances raise incomes, pay school fees and reduce pressure on land. Destination cities gain workers, spending and a younger population, which can support industry and services. But rapid growth causes shortages of housing, informal settlements and pressure on water and sanitation, for example around Harare, and unemployment and the informal sector grow. Migrants gain income and services but may face poor housing and insecurity. The size of the impact depends on the numbers, skills and age of the migrants and on the capacity of the city to cope. Overall migration brings gains to migrants and to both areas, but the costs are large unless rural development and urban planning keep pace.",
        explanation: "Weigh benefits and costs for source and destination areas and judge." }),
    ]),
    explanation: "Calculate net migration, explain push factors and assess the impacts of rural-urban migration.",
  });

  // ============================================================ Item 3
  b.struct({
    ...BASE,
    concepts: ["ageo.settle.hierarchy-theories", "ageo.settle.growth-points"],
    hints: ["Rank-size rule: the town of rank n has 1/n of the population of the largest.", "In (e) give successes, problems and a judgement about the growth point policy."],
    stem: `The table shows the populations of the five largest urban centres of a country (data invented for this exercise).\n\n${TT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Use the rank-size rule to calculate the expected population (in thousands) of the fourth-ranked centre.", value: exp4, wrong: [1600, 533], explanation: "1 600 ÷ 4 = 400 thousand." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the primacy index (largest ÷ second-largest), to one decimal place.", value: prim, dp: 1, wrong: [0.3, 1600], explanation: "1 600 ÷ 480 = 3.3." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "What do the results show about the largest centre?", options: [
            ["It is much larger than the rank-size rule predicts for the second centre (800 thousand)", "Correct: 480 is far below 800, which suggests a primate city."],
            ["It is smaller than expected", "It is far larger than the other centres."],
            ["It follows the rank-size rule exactly", "Rank 2 should be 800 thousand but is only 480."],
            ["It has the same size as the second centre", "The sizes are very different."],
          ], answer: "A", explanation: "Expected rank 2 = 1 600 ÷ 2 = 800; the actual 480 is only 60% of that." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which of these is a reason why a primate city develops?", options: [
            ["Concentration of government, investment and services in one place", "Correct: this attracts further growth."],
            ["An even spread of services over all towns", "Even spread works against primacy."],
            ["A policy of closing the largest city", "No such policy applies."],
            ["A very low rate of rural-urban migration", "Strong migration contributes to primacy."],
          ], answer: "A", explanation: "Concentration of investment and services in one place leads to cumulative growth." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain two problems that a primate city can cause for the rest of the country.",
        points: [
          "Services, jobs and investment are concentrated in the primate city, so other towns and rural areas are poorer (regional inequality).",
          "Migration to the city drains rural areas of young people.",
          "The primate city suffers congestion, housing shortages and informal settlements.",
          "Pressure on water, sanitation and transport in the city.",
        ],
        modelAnswer: "Services, jobs and investment are concentrated in the primate city, so other towns and rural areas are poorer. Migration to the city also drains rural areas of young people, while the city suffers congestion, housing shortages and informal settlements.",
        explanation: "Any two problems, each developed." }),
      P.group({
        label: "(c)", stem: "A student used a checklist of 12 services to assess a growth point.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "The growth point has 8 of the 12 services. Calculate the percentage present, to one decimal place.", value: gpPct, dp: 1, unit: "%", wrong: [8, 150], explanation: "8 ÷ 12 × 100 = 66.7%." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is a limitation of a simple checklist?", options: [
            ["It counts each service equally and ignores quality and size", "Correct: a small kiosk counts the same as a large hospital."],
            ["It cannot be used in the field", "It is easy to use in the field."],
            ["It gives a different answer for every observer", "Counting present or absent services is reliable."],
            ["It measures only the age of buildings", "It does not measure age."],
          ], answer: "A", explanation: "A checklist records presence or absence only." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest four projects or measures to speed up the growth of a growth point using local resources.",
        points: [
          "Agro-processing such as milling, oil pressing or fruit drying using local crops.",
          "Provide reliable electricity, water and roads to attract investors.",
          "Offer serviced land, credit and tax incentives to small businesses.",
          "Train local people in skills and business management, and improve markets and transport links to farmers.",
        ],
        modelAnswer: "Set up agro-processing such as milling or oil pressing using local crops, provide reliable electricity, water and roads, offer serviced land and credit to small businesses, and train local people and improve markets and transport links to farmers.",
        explanation: "Local processing, infrastructure, incentives and skills." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the growth point policy as a way of reducing the dominance of the largest city.",
        points: [
          "Growth points aim to provide services and jobs in rural centres, so that fewer people migrate to the largest city.",
          "They have brought schools, clinics, markets and shops closer to rural people, improving access.",
          "Some growth points have grown into service and market centres.",
          "Many growth points have little industry and few jobs, so migration to the largest city continues.",
          "Shortages of electricity, water and roads, and limited funds, have slowed growth.",
          "Investors prefer the large city because its market, skills and infrastructure are better (cumulative causation).",
          "Success depends on local resources, links with farmers and the quality of local leadership.",
          "Judgement: the policy has improved rural services but has not removed the dominance of the largest city, because it did not create enough jobs.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Growth points aim to provide services and jobs in rural centres so that fewer people migrate to the largest city. They have brought schools, clinics, markets and shops closer to rural people, and some have grown into service and market centres. However, many have little industry and few jobs, so migration to the largest city continues. Shortages of electricity, water and roads and limited funds have slowed growth, and investors still prefer the large city because its market, skills and infrastructure are better. Success depends on local resources, links with farmers and the quality of local leadership. Overall the policy has improved rural services but has not removed the dominance of the largest city, because it did not create enough jobs.",
        explanation: "Weigh the policy's aims and achievements against its limits and judge." }),
    ]),
    explanation: "Apply rank-size and primacy measures, explain primacy and assess the growth point policy.",
  });

  // ============================================================ Item 4
  b.struct({
    ...BASE,
    concepts: ["ageo.settle.land-reform-resettlement"],
    hints: ["A1 holdings are both villagised and self-contained.", "In (e) give effects on services, patterns and different groups, in neutral language, and a judgement."],
    stem: `A resettlement ward of 7 000 ha has 140 holdings of three types. The villagised A1 area has 6 working boreholes (data invented for this exercise).\n\n${WT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the percentage of holdings that are A1 (villagised and self-contained together), to one decimal place.", value: a1pct, dp: 1, unit: "%", wrong: [110, 21.4], explanation: "(66 + 44) ÷ 140 × 100 = 78.6%. 21.4% is the A2 share." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate the average area per holding, in hectares.", value: avgPlot, unit: "ha", wrong: [0.02, 980000], explanation: "7 000 ÷ 140 = 50 ha." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which holding type has a nucleated settlement pattern?", options: [
            ["A1 villagised", "Correct: homes are grouped in a village."],
            ["A1 self-contained", "The house stands on the household's own farm."],
            ["A2", "A2 homesteads are dispersed on separate farms."],
            ["Self-contained A1 and A2 together", "Both are dispersed."],
          ], answer: "A", explanation: "Villagised layouts cluster homes." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Which was a main aim of the A1 model?", options: [
            ["To give land to many households and reduce pressure on communal areas", "Correct: A1 was for household farming."],
            ["To create large estates for export crops only", "A2 was aimed at commercial farming."],
            ["To remove all farming from the area", "Farming was the basis of the scheme."],
            ["To move households to towns", "The aim was settlement on farmland."],
          ], answer: "A", explanation: "A1 aimed to decongest communal areas and give land to many families." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why land reform took place in Zimbabwe.",
        points: [
          "At independence the better land with good soils and rainfall was mainly in large commercial farms.",
          "Most people lived in communal areas, which were crowded with poorer soils and unreliable rain.",
          "Pressure on communal land caused land degradation and landlessness.",
          "The liberation struggle created expectations of redistribution, and early resettlement was slower than expected.",
        ],
        modelAnswer: "At independence the better land was mainly in large commercial farms, while most people lived in crowded communal areas with poorer soils and unreliable rain. Pressure on communal land caused degradation and landlessness, and the liberation struggle created expectations of redistribution while early resettlement was slower than expected.",
        explanation: "Inequality, pressure and expectations." }),
      P.group({
        label: "(c)", stem: "Services in the villagised A1 area.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "The villagised A1 area has 66 households and 6 working boreholes. Calculate the number of households per borehole.", value: perBh, wrong: [396, 0.09], explanation: "66 ÷ 6 = 11 households per borehole." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Why are services easier to provide to a villagised layout than to self-contained farms?", options: [
            ["Households live close together, so one facility serves many people", "Correct: costs per household are lower."],
            ["Each household needs its own school", "A shared school serves a cluster."],
            ["Villages are always larger than towns", "Villages are small settlements."],
            ["Roads are not needed", "Roads are needed in both layouts."],
          ], answer: "A", explanation: "Clustering shortens distances and reduces the cost per household." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest four ways of improving services and infrastructure in resettlement areas.",
        points: [
          "Build schools and clinics within walking distance, or provide transport.",
          "Drill and maintain boreholes and protect water sources.",
          "Repair roads and bridges to link farms to markets and growth points.",
          "Extend electricity and mobile coverage, possibly using solar systems.",
        ],
        modelAnswer: "Build schools and clinics within walking distance, drill and maintain boreholes, repair roads and bridges to link farms to markets, and extend electricity and mobile coverage using solar systems.",
        explanation: "Social services, water, roads and energy." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the effects of land reform on the development of rural settlements in Zimbabwe.",
        points: [
          "New settlements were created on former commercial farmland, and population density there increased.",
          "Villagised A1 areas have a clustered pattern that makes services easier to provide, whereas dispersed farms are costlier to serve.",
          "Schools, clinics and boreholes were built over time, but provision lagged behind the arrival of households.",
          "Roads and farm infrastructure were often in poor condition, and electricity was limited.",
          "New business centres and markets grew at junctions, while some existing centres lost the demand of former commercial farms.",
          "Farm workers in compounds faced loss of jobs or housing, and some moved to towns or informal settlements.",
          "Tenure security and access to credit affected investment in houses and farms.",
          "Judgement: land reform extended access to land and created many settlements, but services and infrastructure developed slowly and unevenly, so the effect has been mixed.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Land reform created new settlements on former commercial farmland and increased population density there. Villagised A1 areas have a clustered pattern that makes services easier to provide, whereas dispersed farms are costlier to serve. Schools, clinics and boreholes were built over time but lagged behind the arrival of households, and roads and electricity were often inadequate. New business centres grew at junctions, while some existing centres lost the demand of former commercial farms, and farm workers in compounds faced loss of jobs or housing. Secure tenure and access to credit affect investment in houses and farms. Overall, land reform extended access to land and created many settlements, but services and infrastructure developed slowly and unevenly, so the effect has been mixed.",
        explanation: "Balanced assessment of effects on settlement pattern, services and groups." }),
    ]),
    explanation: "Calculate shares and plot sizes, explain land reform and assess its settlement effects.",
  });

  // ============================================================ Item 5
  b.struct({
    ...BASE,
    concepts: ["ageo.dev.regional-inequalities"],
    hints: ["Σd² is the sum of the last column; rs = 1 − 6Σd² ÷ (n³ − n).", "In (e) give successes, limits and a judgement about policies to reduce regional inequality."],
    stem: `A student tested the hypothesis that districts further from a tarred road have more households below the poverty line. The null hypothesis is that there is no relationship. Data for six districts of a province are shown (data invented for this exercise).\n\n${RT}\n\nThe ranks (1 = lowest) are:\n\n${RK}\n\nThe critical value of Spearman's rank coefficient for n = 6 at the 5% significance level is 0.886.`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the data.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate Σd².", value: sp.sumD2, wrong: [0, 12], explanation: "d² is 1 for D3 and D4 and 0 for the others, so Σd² = 2." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", stem: "Calculate Spearman's rank coefficient, to three decimal places.", value: sp.rs, dp: 3, wrong: [0.057, 0.886], explanation: "rs = 1 − (6 × 2) ÷ (216 − 6) = 1 − 12 ÷ 210 = 1 − 0.057 = 0.943." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "What is the correct conclusion at the 5% level?", options: [
            ["There is a significant positive relationship, because 0.943 is greater than 0.886", "Correct: the null hypothesis is rejected."],
            ["There is no significant relationship, because 0.943 is greater than 0.886", "A value above the critical value is significant."],
            ["There is a significant negative relationship", "The coefficient is positive."],
            ["The test cannot be used with six pairs", "Six pairs can be used, with a high critical value."],
          ], answer: "A", explanation: "0.943 exceeds 0.886, so the relationship is significant." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "What does the positive coefficient mean in this study?", options: [
            ["Districts further from a tarred road tend to have more poverty", "Correct: poverty rises with distance."],
            ["Districts further from a tarred road tend to have less poverty", "That would be a negative coefficient."],
            ["Distance causes poverty directly in every district", "Correlation does not prove cause."],
            ["Poverty has no connection with roads", "The relationship is significant."],
          ], answer: "A", explanation: "Both ranks rise together: greater distance goes with a higher poverty rate." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why districts far from a tarred road tend to have more poverty.",
        points: [
          "High transport costs for inputs and produce reduce farm profits.",
          "Fewer traders, firms and investors reach remote districts, so there are few jobs outside farming.",
          "Schools, clinics and electricity are fewer and harder to provide.",
          "Poor access to information, markets and credit keeps households in subsistence farming.",
        ],
        modelAnswer: "High transport costs for inputs and produce reduce farm profits. Fewer traders and investors reach remote districts, so there are few jobs outside farming, and schools, clinics and electricity are fewer. Poor access to markets and credit keeps households in subsistence farming.",
        explanation: "Cost, investment, services and market access." }),
      P.group({
        label: "(c)", stem: "Poverty in the province.",
        parts: [
          P.num({ label: "(i)", marks: 2, type: "CALCULATION", stem: "Calculate the mean percentage of households below the poverty line in the six districts, to one decimal place.", value: meanPov, dp: 1, unit: "%", wrong: [352, 61], explanation: "(38 + 45 + 61 + 52 + 74 + 82) ÷ 6 = 352 ÷ 6 = 58.7%." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Why might the mean hide important differences?", options: [
            ["Districts range from 38% to 82%, so the average does not describe any one district", "Correct: it hides the range."],
            ["The mean is always the same as the highest value", "The mean is lower than the highest value."],
            ["The mean cannot be calculated from percentages", "It can be calculated."],
            ["All districts have the same poverty rate", "The rates range widely."],
          ], answer: "A", explanation: "An average hides the spread between districts." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 4, stem: "Suggest how the student could improve the reliability of the study.",
        points: [
          "Use more districts, since six pairs give a high critical value and weak evidence.",
          "Use recent data from ZimStat surveys and check the definition of the poverty line.",
          "Measure other variables such as income, rainfall and school distance that may also explain poverty.",
          "Use a scatter graph to check that the relationship is monotonic, and state that correlation does not prove cause.",
        ],
        modelAnswer: "Use more districts, since six pairs give weak evidence. Use recent ZimStat data and check the poverty line definition, measure other variables such as income and rainfall, and use a scatter graph to check the pattern, remembering that correlation does not prove cause.",
        explanation: "Sample size, data quality, other variables and cause." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the success of policies intended to reduce regional inequalities in Zimbabwe.",
        points: [
          "Names policies such as growth points, devolution under the 2013 Constitution, and investment in rural roads, water and electricity.",
          "Growth points have brought services and markets closer to rural people.",
          "Devolution can transfer funds and decisions to provinces and districts, so local needs are met.",
          "Better roads and electricity reduce the cost disadvantage of remote districts.",
          "Funds are limited, capacity is weak and implementation is slow.",
          "Firms still prefer the core, where markets, skills and infrastructure are better, so jobs grow slowly in the periphery.",
          "Migration to the cities continues, and averages hide differences within districts.",
          "Judgement: policies have improved services in some places but have not removed the gap, which needs sustained funding and job creation.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Policies such as growth points, devolution under the 2013 Constitution and investment in rural roads, water and electricity aim to reduce the gap between the core and the periphery. Growth points have brought services and markets closer to rural people, devolution can transfer funds and decisions to provinces and districts, and better roads and electricity reduce the cost disadvantage of remote districts. However, funds are limited, capacity is weak and implementation is slow, and firms still prefer the core, where markets, skills and infrastructure are better, so jobs in the periphery grow slowly. Migration to the cities continues. Overall the policies have improved services in some places but have not removed the gap, which needs sustained funding and job creation.",
        explanation: "Weigh successes against limits for several policies and judge." }),
    ]),
    explanation: "Test a hypothesis with Spearman's rank coefficient, explain remoteness and poverty and evaluate policies.",
  });
});
