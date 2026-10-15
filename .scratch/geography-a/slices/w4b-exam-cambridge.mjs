// W4b exam rows (Cambridge), topic 13 (Trade, aid and tourism, Paper 4): CAM_STRUCT10 x 2 (tourism growth and leakage; terms of trade and tied aid)
// and CAM_ESSAY20 x 2 (sustainability of tourism in two contrasting areas: Victoria Falls and the Maldives; trade and development in two contrasting
// countries: Zambia and South Korea). Resource data are invented for this exercise (labelled in the stems); every number is computed in code.
import { concept, P, chk, rnd, checkExam, EXAM, geographyLevels, CAM } from "../lib.mjs";
import { tbl } from "../tables/w4b-_q.mjs";

const BASE = (plan) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper: "Paper 4", applies: plan.applies });

// ---- Struct 10 #1: tourism growth (13.1 and 13.2)
const T = [[2010, 400, 120], [2014, 520, 182], [2018, 650, 260]];
const arrUp = chk(((650 - 400) / 400) * 100, 62.5, 1e-9);
const sp10 = chk((120e6) / (400e3), 300, 1e-9);
const sp18 = chk((260e6) / (650e3), 400, 1e-9);
const TT = tbl(["Year", "International arrivals (thousands)", "Tourism receipts (US\\$ million)"], T.map((r) => [r[0], r[1], r[2]]));

// ---- Struct 10 #2: terms of trade and aid (13.1 and 13.3)
const E = { 2000: 100, 2010: 130, 2020: 104 };
const I = { 2000: 100, 2010: 120, 2020: 130 };
const tot10 = rnd((E[2010] / I[2010]) * 100, 1, 108.3, "tot10");
const tot20 = chk((E[2020] / I[2020]) * 100, 80, 1e-9);
const PT = tbl(["Year", "Export price index", "Import price index"], [2000, 2010, 2020].map((y) => [y, E[y], I[y]]));

concept("ageo.tourism.impacts-management", { file: "exam/w4b-cambridge", keyPrefix: "exam.w4b-cambridge", applies: CAM }, (b) => {
  // ============================================================ CAM_STRUCT10 #1: tourism growth
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10),
    concepts: ["ageo.tourism.patterns-trends", "ageo.tourism.impacts-management"],
    hints: ["Percentage increase = change ÷ original × 100.", "Think about who receives the money in (b), and about the limits to growth in (c)."],
    stem: `Insert, Table 1 shows international tourism in Country R (data invented for this exercise).\n\n${TT}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage increase in arrivals between 2010 and 2018.", value: arrUp, dp: 1, unit: "%", wrong: [250, 38.5],
            explanation: "(650 − 400) ÷ 400 × 100 = 62.5%. Giving 250 is the increase in thousands." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which statement about spending per arrival is correct?", options: [
            ["It rose from US\\$300 in 2010 to US\\$400 in 2018", "Correct: 120 million ÷ 400 thousand = 300; 260 million ÷ 650 thousand = 400."],
            ["It fell from US\\$400 to US\\$300", "It rose."],
            ["It stayed at US\\$300 throughout", "It increased."],
            ["It rose from US\\$120 to US\\$260", "These are total receipts, not spending per arrival."],
          ], answer: "A", explanation: "Spending per arrival rose from US\\$300 to US\\$400." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Economic impacts.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What is leakage in tourism?", options: [
            ["Tourist spending that leaves the host country, such as profits sent abroad", "Correct: the host area does not keep this money."],
            ["Water lost from hotel pipes", "That is a different meaning."],
            ["A fall in the number of arrivals in the low season", "That is seasonality."],
            ["Wages paid to local guides", "That stays in the area."],
          ], answer: "A", explanation: "Leakage is spending that leaves the host area." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain why leakage may be high at resorts owned by foreign companies.",
            points: [
              "Profits are paid to owners and shareholders overseas.",
              "Food, drink and equipment are imported, and some managers and skilled staff are foreign so their pay is sent abroad.",
            ],
            modelAnswer: "Profits are paid to owners and shareholders overseas, food, drink and equipment are imported, and some managers and skilled staff are foreign so their pay is sent abroad.",
            explanation: "Overseas profits, imports and foreign staff." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Assess whether the growth shown in Table 1 can be sustained.",
        points: [
          "Growth has been steady, with arrivals rising by 62.5% and receipts more than doubling, which suggests strong demand.",
          "Rising numbers may exceed carrying capacity, causing damage to sites and crowding.",
          "Growth depends on flights, which have a high carbon cost and may face limits or taxes, and on safety and global events.",
          "Management through limits, fees, local ownership and conservation could keep growth sustainable.",
        ],
        modelAnswer: "Arrivals rose by 62.5% and receipts more than doubled, which suggests strong demand. However, rising numbers may exceed the carrying capacity of sites, and growth depends on flights, which have a high carbon cost and are affected by safety and global events. Management through limits, fees, local ownership and conservation could keep growth sustainable, so it can continue only if it is managed.",
        explanation: "Weigh strong demand against capacity, carbon and management." }),
    ]),
    explanation: "Interpret tourism growth and leakage data and assess sustainability.",
  });

  // ============================================================ CAM_STRUCT10 #2: terms of trade and aid
  b.struct({
    ...BASE(EXAM.CAM_STRUCT10),
    concepts: ["ageo.trade.global-flows-balance", "ageo.trade.igos-aid"],
    hints: ["Terms of trade = export price index ÷ import price index × 100.", "Think about how tied aid sends money back to the donor."],
    stem: `Insert, Table 1 shows price indices (2000 = 100) for Country Q, which depends on one mineral for most of its exports and receives aid (data invented for this exercise).\n\n${PT}`,
    parts: checkExam(EXAM.CAM_STRUCT10, [
      P.group({
        label: "(a)", stem: "Use Table 1.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the terms of trade for 2010, to 1 decimal place.", value: tot10, dp: 1, wrong: [92.3, 130],
            explanation: "130 ÷ 120 × 100 = 108.3." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What happened to the terms of trade between 2010 and 2020?", options: [
            ["They worsened, falling to 80", "Correct: 104 ÷ 130 × 100 = 80."],
            ["They improved, rising to 125", "125 is the inverse figure."],
            ["They stayed at 108", "They changed."],
            ["They cannot be found from the table", "They can be found from the two indices."],
          ], answer: "A", explanation: "The terms of trade fell from 108.3 to 80." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Aid.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "What is tied aid?", options: [
            ["Aid that must be spent on goods and services from the donor country", "Correct: it limits the recipient's choices."],
            ["Aid sent only in the form of food", "Tied aid is not defined by the type of goods."],
            ["Aid provided only by non-governmental organisations", "NGOs provide many types of aid."],
            ["Aid that has no conditions at all", "That is untied aid."],
          ], answer: "A", explanation: "Tied aid must be spent on goods and services from the donor." }),
          P.manual({ label: "(ii)", marks: 2, stem: "Explain how tied aid can reduce the benefit to the recipient country.",
            points: [
              "Much of the money returns to the donor's firms, so local businesses and workers gain less.",
              "The goods and services may cost more or be unsuited to local needs.",
            ],
            modelAnswer: "Much of the money returns to the donor's firms, so local businesses and workers gain less, and the goods and services may cost more or be unsuited to local needs.",
            explanation: "Money returns to the donor and choice is limited." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Suggest how Country Q could reduce the effects of its dependence on one mineral.",
        points: [
          "Process the mineral in the country to export higher-value products.",
          "Develop other exports, such as farm products, manufactures and tourism.",
          "Save income in good years in a fund to cushion falls in price.",
          "Use trade agreements and regional markets to widen the range of buyers.",
        ],
        modelAnswer: "Process the mineral in the country to export higher-value products, develop other exports such as farm products, manufactures and tourism, save income in good years in a fund to cushion falls in price, and use trade agreements and regional markets to widen the range of buyers.",
        explanation: "Value addition, diversification, saving and markets." }),
    ]),
    explanation: "Calculate terms of trade, explain tied aid and suggest ways to reduce dependence.",
  });

  // ============================================================ CAM_ESSAY20 #1: sustainability of tourism in two areas
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.tourism.impacts-management", "ageo.tourism.patterns-trends"],
    hints: ["Use two contrasting areas with dated facts (here Victoria Falls and the Maldives).", "Weigh what management has achieved against what remains unsustainable."],
    stem: "Using detailed specific examples of two contrasting tourist areas, assess the extent to which management has made tourism sustainable.",
    points: [
      "Defines sustainable tourism as meeting present needs of visitors and hosts without harming the needs of the future, and names the two areas: Victoria Falls (Zimbabwe and Zambia) and the Maldives.",
      "Victoria Falls lies on the Zambezi on the Zimbabwe–Zambia border and became a World Heritage Site in 1989.",
      "Development: the rail bridge opened in 1905, the town of Victoria Falls grew, the airport was expanded in the 2010s and activities include rafting, bungee jumping and helicopter flights.",
      "Economic benefit: jobs in hotels and activities, foreign exchange, and income for informal curio sellers.",
      "Economic problem: leakage where operators are foreign-owned, seasonal work, and pressure on water and waste services.",
      "Environmental problem: wear on rainforest paths near the Falls, and noise from aircraft.",
      "Management: entrance fees and controlled access to the park and rainforest, and regulation of activities.",
      "Management: protected status, environmental assessment of developments and regional co-operation under KAZA.",
      "Evaluation of Victoria Falls: the Falls themselves are protected, but growth in numbers and flights needs limits, and local benefit depends on local ownership.",
      "The Maldives has about 1 200 coral islands in 26 atolls, with an average height of about 1.5 m above sea level.",
      "Development: tourism started in the early 1970s with the first resorts in 1972, under a policy of 'one island, one resort'.",
      "Development: guesthouses on inhabited islands have been allowed since about 2009, spreading income more widely.",
      "Economic benefit: tourism is the largest part of the economy, a major source of foreign exchange and jobs.",
      "Economic problem: most food and materials are imported, so leakage is high.",
      "Environmental problem: reefs damaged by anchors, dredging and visitors, and sewage and waste are difficult to manage, with waste dumped on Thilafushi.",
      "Management: limits on building density, marine protected areas, a tax on tourists' nights and waste and sewage rules.",
      "Threats beyond management: sea-level rise and the carbon cost of long-haul flights.",
      "Comparison: Victoria Falls manages a single natural attraction and its town, whereas the Maldives manages a national economy that depends on reefs and flights.",
      "Evaluation: management has limited social impacts and raised income in both, but environmental and climate pressures limit sustainability, particularly in the Maldives.",
      "Judgement: management has made tourism partly sustainable; the degree depends on local ownership, limits on numbers and action on climate and flights.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Sustainable tourism meets the needs of visitors and host communities today without harming what future generations need. I assess this for Victoria Falls on the Zimbabwe–Zambia border and for the Maldives in the Indian Ocean, and I argue that management has made tourism only partly sustainable.\n\nVictoria Falls lies on the Zambezi and became a World Heritage Site in 1989. Tourism grew after the rail bridge opened in 1905, the town of Victoria Falls developed, the airport was expanded in the 2010s, and activities such as rafting, bungee jumping and helicopter flights were added. The benefits are jobs in hotels and activities, foreign exchange, and income for informal curio sellers. However, leakage occurs where operators are foreign-owned, work is seasonal, water and waste services are under pressure, paths in the rainforest are worn, and aircraft add noise. Management includes entrance fees and controlled access to the park and rainforest, regulation of activities, protected status, environmental assessment of developments, and regional co-operation under the Kavango-Zambezi Transfrontier Conservation Area. The Falls themselves are protected, but growth in numbers and flights needs limits, and the benefit to local people depends on local ownership and employment.\n\nThe Maldives has about 1 200 coral islands in 26 atolls, with an average height of about 1.5 m above sea level. Tourism began in the early 1970s, with the first resorts opening in 1972, under a policy of one island, one resort which kept visitors apart from inhabited islands. Since about 2009 guesthouses on local islands have spread income more widely. Tourism is now the largest part of the economy and a major source of foreign exchange and jobs, but most food and materials are imported, so leakage is high. Reefs are damaged by anchors, dredging and visitors, and sewage and waste are hard to manage on small islands, with waste dumped on Thilafushi. Management includes limits on building density, marine protected areas, a tax on tourists' nights, and waste and sewage rules. Even so, the country is threatened by sea-level rise, and long-haul flights have a large carbon cost that island management cannot control.\n\nThe two areas differ: Victoria Falls manages one natural attraction and its town, and has a land border and many other economic activities, whereas the Maldives manages a national economy that depends on reefs and flights. In both, management has limited social impacts and raised incomes, and has protected the main attractions. But environmental and climate pressures set limits to sustainability, especially in the Maldives, where there is little room to grow without harming reefs.\n\nIn conclusion, management has made tourism partly sustainable in both places. The extent depends on local ownership to keep more money in the area, firm limits on numbers and building, and action on climate and flights. Without these, the benefits are likely to be harder to maintain in the long term.",
    explanation: "Compare two detailed examples, weigh management against remaining threats and judge.",
  });

  // ============================================================ CAM_ESSAY20 #2: trade and development in two countries
  b.ext({
    ...BASE(EXAM.CAM_ESSAY20), marks: 20, skill: "EVALUATION",
    concepts: ["ageo.trade.global-factors-cases", "ageo.trade.global-flows-balance"],
    hints: ["Use two contrasting countries with dated facts (here Zambia and South Korea).", "Compare what is traded, the policies and the results, then judge."],
    stem: "Using detailed specific examples of two contrasting countries, assess the extent to which trade has contributed to their development.",
    points: [
      "Defines development as improvement in incomes, services and living standards and names the countries: Zambia (primary commodity exporter) and South Korea (exporter of manufactures).",
      "Zambia is landlocked, became independent in 1964, and copper from the Copperbelt provides well over half of export earnings in most years.",
      "Zambia: a rise in copper prices in the 2000s brought growth and investment, especially after the privatisation of the mines from the 1990s to 2000.",
      "Zambia: it has few other large exports (cobalt and farm products), and little processing, so it captures little of the value.",
      "Zambia: copper is priced on world exchanges, so Zambia is a price taker and its earnings are unstable.",
      "Zambia: copper prices fell from 2014 and 2015, which weakened the currency and strained government finances.",
      "Zambia: heavy borrowing and a missed payment on a foreign bond in 2020 led to debt restructuring talks.",
      "Zambia: being landlocked means goods depend on neighbours' ports and routes, which raises transport costs.",
      "Zambia: so trade has contributed to growth in booms but has not brought stable or broad-based development.",
      "South Korea has a coastal location with major ports such as Busan, and few mineral resources.",
      "South Korea was one of the poorer countries in Asia in the early 1960s.",
      "South Korea: governments pursued export-led industrialisation through five-year plans from the early 1960s.",
      "South Korea: large family-owned firms (chaebol) such as Samsung, Hyundai and LG received credit and were pushed to export.",
      "South Korea: heavy investment in education supplied skilled workers.",
      "South Korea: exports are manufactures such as vehicles, semiconductors, ships and petrochemicals, which carry higher value per tonne.",
      "South Korea: incomes rose to those of a high-income country, trade agreements with the United States and the European Union were made in the early 2010s, and its firms became TNCs.",
      "South Korea's weaknesses: dependence on imported energy and materials, on a few large firms and on foreign demand.",
      "Comparison: trade contributed more to South Korea's development because of what it sold (higher value goods), policy and skills.",
      "Resources and location alone do not explain the difference: South Korea had few resources, while Zambia had a valuable one; history, policy and skills matter.",
      "Judgement: trade is necessary for development but not sufficient; its contribution depends on the value of what is traded, policy, skills and the stability of earnings.",
    ],
    levels: geographyLevels(20), wordLimit: { min: 600, max: 800 },
    modelAnswer: "Development means improvement in incomes, services and living standards. Trade can help by earning foreign currency, but I argue that its contribution depends on what is traded and how the income is used. I compare Zambia, which depends on a primary commodity, with South Korea, which exports manufactures.\n\nZambia is landlocked and became independent in 1964. Copper from the Copperbelt provides well over half of its export earnings in most years. A rise in copper prices in the 2000s, together with the privatisation of the mines from the 1990s to 2000, brought growth and investment. But Zambia has few other large exports, such as cobalt and farm products, and little processing, so it captures little of the value. Copper is priced on world exchanges, so Zambia is a price taker and its earnings are unstable. When prices fell from 2014 and 2015 the currency weakened and government finances were strained, and heavy borrowing and a missed payment on a foreign bond in 2020 led to talks on restructuring the debt. Because the country has no coast, goods depend on neighbours' ports and routes, which raises costs. Trade has therefore contributed to growth in booms, but it has not brought stable or broad-based development.\n\nSouth Korea has a coastal location with major ports such as Busan, and few mineral resources. In the early 1960s it was one of the poorer countries in Asia. Governments then pursued export-led industrialisation through five-year plans. Large family-owned firms, the chaebol, such as Samsung, Hyundai and LG, received credit and were pushed to export, and heavy investment in education supplied skilled workers. Its exports are manufactures such as vehicles, semiconductors, ships and petrochemicals, which carry much higher value per tonne than raw materials. Incomes rose to those of a high-income country, agreements with the United States and the European Union were made in the early 2010s, and its firms became transnational corporations. South Korea still has weaknesses: it imports energy and materials, depends on a few large firms, and is exposed to falls in foreign demand.\n\nThe comparison shows that trade contributed more to South Korea's development because of what it sold, the policies it followed and the skills of its workers. Resources and location do not explain the difference on their own, because South Korea had few resources while Zambia had a valuable one. History also matters, since Zambia's economy was organised around exporting a raw material, while South Korea's government deliberately changed its pattern of trade.\n\nIn conclusion, trade is necessary for development but it is not sufficient. Its contribution depends on the value of what is traded, on policy and skills, and on the stability of earnings, so trade has contributed strongly in South Korea but only unevenly in Zambia.",
    explanation: "Compare two contrasting countries, weigh the value, policy and stability of trade, and judge.",
  });
});
