// Slice G4a: Cambridge Paper 2 (Human Geography) exam-format questions: topic 9 Changing economies (2 × 25 marks)
// and topic 10 Resource provision, food (2 × 25 marks).
import { concept, P, CAM, geographyLevels } from "../lib.mjs";

concept("geo.industry.tncs", { file: "exam/cam-p2-economies", keyPrefix: "exam.cam-p2-economies", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.industry.classification-employment", "geo.industry.tncs", "geo.industry.globalisation", "geo.industry.location-factors"],
    stem: "Table 1 shows the employment structure of three fictional countries (percentage of workers, fictional data).\n\n| Country | Primary | Secondary | Tertiary and quaternary |\n|---|---|---|---|\n| A (LIC) | 64 | 12 | 24 |\n| B (MIC) | 28 | 32 | ? |\n| C (HIC) | 3 | 19 | 78 |\n\nThe resource below describes a fictional transnational corporation (TNC) that makes mobile phones.\n\n- Headquarters and research centre: a capital city in Country C.\n- Component factories: Country B, employing 9,000 people.\n- Assembly plant: Country A, employing 14,000 people, in a special economic zone near a container port.",
    hints: ["The three sectors in each row add up to 100%.", "Think about where each part of a TNC usually locates and why."],
    parts: [
      P.mcq({
        label: "(a)", stem: "To which sector of industry does a worker on the phone assembly line in Country A belong?",
        options: [
          ["Secondary", "Correct: assembling products is manufacturing."],
          ["Primary", "Primary industry extracts raw materials."],
          ["Tertiary", "Tertiary industry provides services."],
          ["Quaternary", "Quaternary industry is research and ICT, done at the headquarters."],
        ],
        answer: "A", explanation: "Assembly is secondary (manufacturing) industry.",
      }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the missing percentage of workers in tertiary and quaternary industry in Country B.", value: 40, wrong: [60, 72], explanation: "100 − 28 − 32 = 40%." }),
      P.num({ label: "(c)", stem: "How many percentage points higher is primary employment in Country A than in Country C?", value: 61, wrong: [67, 21.3], explanation: "64 − 3 = 61 percentage points." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using Table 1, describe how employment structure changes as countries develop from LIC to HIC.",
        points: [
          "Primary employment falls (from 64% in A to 3% in C).",
          "Secondary employment rises to a peak in the MIC (32% in B) and then falls (19% in C).",
          "Tertiary and quaternary employment rises throughout (24% to 40% to 78%).",
        ],
        modelAnswer: "As countries develop, the primary share falls sharply, from 64% in A to only 3% in C. Secondary employment rises to 32% in the MIC and then falls to 19% in the HIC. Tertiary and quaternary employment rises throughout, from 24% to 78%.",
        explanation: "Describe each sector's trend and quote figures.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain why the percentage of workers in primary industry is much lower in Country C than in Country A.",
        points: [
          "Farming and mining in HICs are highly mechanised, so few workers are needed.",
          "In LICs most people practise labour-intensive subsistence or small-scale farming with little machinery.",
          "Higher wages and more jobs in factories and services in HICs draw workers out of farming.",
          "Better education in HICs leads people into skilled service jobs / HICs import some food and raw materials.",
        ],
        modelAnswer: "In Country C farms and mines use machinery, so very few people are needed. In Country A most people farm small plots by hand because they cannot afford machines. Workers in C have been drawn into better-paid factory and service jobs, and better education prepares them for skilled service work.",
        explanation: "Contrast the reasons in the HIC and the LIC.",
      }),
      P.mcq({
        label: "(f)", stem: "Which is the most likely reason the TNC located its assembly plant in Country A?",
        options: [
          ["Low labour costs for work that needs many people", "Correct: assembly is labour-intensive, so low wages cut costs."],
          ["A large supply of research scientists", "Research is done at the headquarters in Country C."],
          ["The largest market for mobile phones", "The resource gives no evidence of this; LIC incomes are low."],
          ["Strict environmental laws that raise production costs", "Strict, costly regulations would discourage location."],
        ],
        answer: "A", explanation: "Labour-intensive assembly is drawn to low-wage countries.",
      }),
      P.manual({
        label: "(g)", marks: 3, stem: "Suggest why the TNC keeps its headquarters and research centre in Country C.",
        points: [
          "Highly skilled and educated workers, universities and research facilities.",
          "Access to finance, banks, legal and marketing services in a capital city.",
          "Good communications and international transport links / the company began there.",
        ],
        modelAnswer: "Country C has many highly educated workers and universities for research. The capital provides banks, lawyers and advertising firms, and has excellent airports and communications. The company may also have started there.",
        explanation: "Headquarters and research need skills, services and communications.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "Describe the impacts of globalisation on trade and communications for countries such as Country A.",
        points: [
          "Trade: more exports of manufactured goods / growth of container ports.",
          "Trade: dependence on TNC decisions and on world demand / competition can close local firms.",
          "Communications: internet and mobile phones connect businesses and people quickly.",
          "Communications: a digital divide between connected urban areas and rural areas.",
        ],
        modelAnswer: "Globalisation allows countries like A to export manufactured goods through container ports, but their trade depends on decisions by TNCs and on world demand. Mobile phones and the internet connect firms and families quickly, although rural areas without coverage fall behind.",
        explanation: "Positive and negative impacts for trade and for communications.",
      }),
      P.manual({
        label: "(i)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named TNC in a named country or area, evaluate the impacts of the TNC on that country. You should refer to a detailed specific example.",
        points: [
          "Names the TNC and host country, and describes its operations there (e.g. Nike's subcontracted factories in Vietnam).",
          "Positive: jobs and wages, often above local alternatives.",
          "Positive: export earnings, taxes, infrastructure and skills / multiplier effect on suppliers.",
          "Negative: low pay, long hours or poor conditions; skilled jobs kept in the home country.",
          "Negative: profit leakage to headquarters and shareholders.",
          "Negative: footloose production may move elsewhere / pollution / influence over government.",
          "Supported judgement on whether the benefits outweigh the costs, and for whom.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Nike, whose headquarters is in Beaverton in the USA, subcontracts much of its footwear production to independent factories in Vietnam, one of its largest producing countries. These factories employ very large numbers of people, many of them young women from rural areas, and wages are often higher than in farming. The exports earn foreign currency, and local firms supply packaging, transport and materials. Workers gain factory skills. However, Nike's design, marketing and research jobs remain in the USA, and most of the profit flows to the headquarters and shareholders. In the past campaigners exposed long hours and low pay in some supplier factories, and although codes of conduct and audits have improved conditions, wages remain low compared with the price of the shoes. Because Nike does not own the factories, it can move orders to cheaper countries, so jobs are insecure. Overall the TNC has brought Vietnam more benefits than costs, mainly jobs and exports, but much of the value is captured abroad and workers gain least.",
        explanation: "A detailed specific example of a TNC, impacts weighed, and a judgement.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 9 question: employment structure data, TNC location and organisation, globalisation, and an extended evaluation of a named TNC.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.tourism.growth-management"],
    stem: "Table 1 shows the number of visitors to a fictional island resort (thousands, fictional data).\n\n| Year | 1976 | 1986 | 1996 | 2006 | 2011 | 2016 |\n|---|---|---|---|---|---|---|\n| Visitors (thousands) | 12 | 45 | 160 | 230 | 235 | 190 |\n\nTable 2 shows where every US\\$100 spent by visitors to the island goes (fictional data).\n\n| Destination of spending | US\\$ |\n|---|---|\n| Foreign-owned hotels, airlines and tour companies | 55 |\n| Locally owned businesses | 30 |\n| Taxes to the island government | 15 |",
    hints: ["Look at the rate of change between each pair of years.", "Money paid to foreign companies leaves the island."],
    parts: [
      P.num({ label: "(a)", stem: "By how many thousand did visitor numbers increase between 1986 and 1996?", value: 115, wrong: [205, 3.6], explanation: "160 − 45 = 115 thousand." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage decrease in visitors between 2011 and 2016. Give your answer to one decimal place.", value: 19.1489, answer: "19.1", tol: 0.05, wrong: [23.7, 45], explanation: "Fall = 45; 45 ÷ 235 × 100 = 19.1%." }),
      P.mcq({
        label: "(c)", stem: "Which stage of the Butler model best describes the period 1986 to 1996?",
        options: [
          ["Development", "Correct: visitor numbers rose rapidly, from 45 to 160 thousand."],
          ["Exploration", "Exploration has very few visitors, as around 1976."],
          ["Stagnation", "Stagnation shows little change, as from 2006 to 2011."],
          ["Decline", "Numbers rose, so this is not decline."],
        ],
        answer: "A", explanation: "Rapid growth with outside investment is the development stage.",
      }),
      P.mcq({
        label: "(d)", stem: "Which stage of the Butler model best describes the period 2006 to 2011?",
        options: [
          ["Stagnation", "Correct: numbers hardly changed (230 to 235 thousand)."],
          ["Involvement", "Involvement is an early stage with slow growth from a low base."],
          ["Development", "Development is rapid growth."],
          ["Rejuvenation", "Rejuvenation would show a renewed rise after stagnation or decline."],
        ],
        answer: "A", explanation: "Levelling off at a high level indicates stagnation.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain the growth of tourism as an industry.",
        points: [
          "Rising incomes give people more money to spend on holidays.",
          "More leisure time: paid holidays, earlier retirement.",
          "Cheaper and faster air travel / low-cost airlines / package holidays.",
          "Internet booking, reviews and social media / marketing make destinations familiar and easy to book.",
        ],
        modelAnswer: "People in many countries now earn more and have paid holidays, so they can afford to travel. Jet aircraft and low-cost airlines have made flights cheaper and faster, and package holidays reduce costs further. The internet makes it easy to find, compare and book destinations.",
        explanation: "Explain several reasons, each developed.",
      }),
      P.num({ label: "(f)", unit: "%", stem: "Use Table 2. What percentage of visitor spending stays on the island?", value: 45, wrong: [55, 30], explanation: "30 + 15 = 45%." }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe the benefits that tourism can bring to the people of the island.",
        points: [
          "Jobs in hotels, restaurants, guiding, transport and crafts.",
          "Income for local businesses and farmers who supply food (multiplier effect).",
          "Taxes fund services such as schools, clinics and roads.",
          "Improved infrastructure (airport, roads, water, electricity) also used by residents / cultural exchange.",
        ],
        modelAnswer: "Tourism creates jobs in hotels, restaurants and transport, and local farmers and craft sellers earn money from visitors. Taxes from tourism pay for schools and clinics, and the airport, roads and water supply built for tourists are also used by local people.",
        explanation: "Describe several benefits for local people.",
      }),
      P.manual({
        label: "(h)", marks: 4, stem: "Evaluate **two** strategies the island could use to manage tourism sustainably.",
        points: [
          "Strategy 1 named and explained (e.g. limiting visitor numbers or charging entry fees for sensitive sites).",
          "Evaluation of strategy 1 (e.g. protects the environment and funds conservation, but may reduce income or exclude some visitors).",
          "Strategy 2 named and explained (e.g. community-owned lodges / ecotourism / zoning).",
          "Evaluation of strategy 2 (e.g. reduces leakage and benefits locals, but small scale and needs capital and training).",
        ],
        modelAnswer: "The island could limit visitor numbers at fragile reefs and charge entry fees; this keeps numbers within carrying capacity and funds conservation, but higher prices may cut visitor spending. It could also support community-owned guesthouses, which would keep more money on the island and reduce leakage, but they need loans and training and can serve only small numbers.",
        explanation: "Each strategy needs an explanation and an evaluation.",
      }),
      P.manual({
        label: "(i)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "For a named country or area, describe the growth and impacts of tourism and evaluate how it has been managed. You should refer to a detailed specific example.",
        points: [
          "Names the country or area and describes its main attractions (e.g. Victoria Falls on the Zambia-Zimbabwe border).",
          "Growth with detail: e.g. railway and bridge (1905), World Heritage status (1989), adventure tourism in the 1990s.",
          "Change over time: fall in the 2000s and rejuvenation (2013 UNWTO General Assembly, KAZA visa, airport upgrade).",
          "Positive impacts: jobs, foreign currency, infrastructure.",
          "Negative impacts: pressure on the rainforest and paths, litter, competition with wildlife and local people, leakage.",
          "Management: park fees, marked paths, World Heritage building limits, community projects, with evaluation.",
          "Overall judgement on the success of management.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Victoria Falls, on the Zambezi between Zambia and Zimbabwe, became accessible to visitors when the railway and the Victoria Falls Bridge were completed in 1905. It became a World Heritage Site in 1989, and in the 1990s adventure activities such as bungee jumping and white-water rafting led to rapid growth. Arrivals on the Zimbabwean side fell during the economic crisis of the 2000s, but recovered after the two countries jointly hosted the UNWTO General Assembly in 2013, the KAZA visa allowed easy travel between them, and the airport was upgraded. Tourism provides jobs in lodges, guiding, rafting and crafts and earns foreign currency, but the rainforest paths are heavily used, litter and water use increase, and a large share of spending goes to foreign tour operators. The parks authorities charge entry fees and keep visitors on marked paths, and World Heritage rules restrict building close to the falls. These measures have protected the falls well, but leakage and pressure on the town and surrounding wildlife areas remain, so management has been only partly successful.",
        explanation: "A detailed specific example of growth, impacts and management, with a judgement.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 9 question on tourism: data skills, the Butler model, causes of growth, benefits, sustainable management and an extended detailed specific example.",
  });
});

concept("geo.food.food-security", { file: "exam/cam-p2-resources", keyPrefix: "exam.cam-p2-resources", applies: CAM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.food.global-patterns", "geo.food.food-security"],
    stem: "Table 1 shows average daily calorie intake in six fictional countries (kcal per person per day, fictional data).\n\n| Country | Income level | Calorie intake |\n|---|---|---|\n| A | HIC | 3,480 |\n| B | HIC | 3,310 |\n| C | MIC | 2,920 |\n| D | MIC | 2,640 |\n| E | LIC | 2,230 |\n| F | LIC | 1,980 |\n\nThe resource below describes the shelves of a supermarket in Europe in January.\n\n\"Green beans from Kenya, grapes from South Africa, apples from New Zealand, mangoes from Brazil, and roses from Zimbabwe.\"",
    hints: ["Mean = total ÷ number of values.", "Think about why perishable food is flown."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the range of calorie intake in Table 1.", value: 1500, wrong: [1250, 5460], explanation: "3,480 − 1,980 = 1,500 kcal." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean calorie intake of the six countries.", value: 2760, tol: 0.5, wrong: [2730, 16560], explanation: "Total = 16,560; 16,560 ÷ 6 = 2,760 kcal." }),
      P.num({ label: "(c)", marks: 2, unit: "%", stem: "Calculate Country F's calorie intake as a percentage of Country A's. Give your answer to one decimal place.", value: 56.8966, answer: "56.9", tol: 0.05, wrong: [175.8, 43.1], explanation: "1,980 ÷ 3,480 × 100 = 56.9%." }),
      P.manual({
        label: "(d)", marks: 4, stem: "Explain the variations in calorie intake shown in Table 1.",
        points: [
          "HICs have high incomes, so people can afford plenty of food, including energy-rich processed food.",
          "HICs have productive, mechanised farming and can import food.",
          "LICs have widespread poverty; farmers have few inputs, so yields are low.",
          "LICs are more affected by drought, pests, conflict, poor roads and storage / rapid population growth.",
        ],
        modelAnswer: "Intake is highest in the HICs because incomes are high, farming is productive and food can be imported, and diets include a lot of processed, energy-rich food. In the LICs many people are poor, farmers use few fertilisers and little irrigation, and drought, pests, conflict and poor storage reduce supplies, while populations grow rapidly.",
        explanation: "Explain both high and low values.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Explain how and why global food consumption is changing.",
        points: [
          "Population growth increases total demand for food.",
          "Rising incomes in MICs increase demand for meat, dairy and oils.",
          "Meat production needs much more grain and water, raising demand for feed crops.",
          "Urbanisation and global tastes increase consumption of processed and fast food / food waste in HICs.",
        ],
        modelAnswer: "The world population is still growing, so more food is needed. In MICs such as China and India, rising incomes mean people eat more meat and dairy, which takes large amounts of grain and water to produce. City dwellers buy more processed and fast food, and global brands spread similar diets.",
        explanation: "Describe the changes and give reasons.",
      }),
      P.mcq({
        label: "(f)", stem: "Why are the green beans from Kenya most likely to have been transported by air?",
        options: [
          ["They are perishable and high in value", "Correct: speed keeps them fresh and their value pays for air freight."],
          ["They are too heavy to carry by ship", "Beans are light; ships carry much heavier cargoes."],
          ["Kenya has no road links to its ports", "Kenya has road and rail links to Mombasa."],
          ["Air freight is the cheapest form of transport", "Air freight is the most expensive form of transport."],
        ],
        answer: "A", explanation: "Air freight suits perishable, high-value produce.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe the impacts of the globalisation of food supplies on **producers** in LICs.",
        points: [
          "Jobs on export farms and in pack-houses, many for women.",
          "Export earnings / foreign currency and new skills or technology.",
          "Low wages, seasonal contracts and dependence on a few foreign buyers or supermarkets.",
          "Land and water used for export crops rather than local food / pesticide exposure.",
        ],
        modelAnswer: "Export horticulture gives many people jobs in farms and pack-houses and earns foreign currency. However, much of the work is seasonal and poorly paid, farms depend on a few supermarket buyers, and scarce land and water are used for export crops instead of food for local people.",
        explanation: "Positive and negative impacts.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Evaluate the strategies used to increase food supply. You should refer to a detailed specific example of a named country or area.",
        points: [
          "Names a country or area and its food-supply situation (e.g. Zimbabwe; India in the Green Revolution).",
          "Irrigation: raises and stabilises output, but costly and risks salinisation.",
          "High-yielding / drought-tolerant varieties and fertilisers: higher yields but recurring costs, pollution.",
          "Mechanisation or GM crops: higher productivity but cost, fewer jobs or concerns about control and safety.",
          "Support for small-scale farmers / conservation agriculture / land reform: reach many farmers, but need sustained funding and skills.",
          "Uses specific detail from the named example (e.g. Pfumvudza; Punjab wheat yields).",
          "Overall judgement on which strategies are most effective and why.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "In Zimbabwe most food is grown by small-scale farmers on rain-fed land, so harvests rise and fall with the rainfall. Irrigation schemes allow crops in the dry season and protect harvests in drought years, but they are expensive to build and maintain and reach only a small share of farmers. Hybrid maize seed and fertiliser have raised yields, but farmers must buy them every season, which many cannot afford when prices rise. The Pfumvudza conservation agriculture programme teaches farmers to plant in basins with mulch, which holds water in the soil and has improved yields in dry years, although it needs a lot of labour at first. Drought-tolerant small grains such as sorghum and millet reduce the risk of crop failure in the drier regions. Input support schemes help poorer farmers but depend on government funding. Overall, strategies that help large numbers of small-scale farmers to cope with drought, such as conservation agriculture, small grains and small irrigation schemes, are the most effective, because the main threat to food supply is unreliable rainfall.",
        explanation: "Evaluate several strategies with detail from a named country and conclude.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 10 question on global food supply and demand: calorie data, explaining variations, changing consumption, globalisation of food and evaluating strategies.",
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2100,
    concepts: ["geo.food.food-security"],
    stem: "Table 1 shows data for a fictional LIC over four years (fictional data).\n\n| Year | Rainfall (% of average) | Maize production (thousand tonnes) | People needing food aid (thousands) |\n|---|---|---|---|\n| 1 | 105 | 1,450 | 120 |\n| 2 | 62 | 780 | 1,900 |\n| 3 | 88 | 1,210 | 650 |\n| 4 | 97 | 1,380 | 300 |",
    hints: ["Percentage change = change ÷ original × 100.", "Compare how the three columns change together."],
    parts: [
      P.mcq({
        label: "(a)", stem: "In which year did the most people need food aid?",
        options: [
          ["Year 2", "Correct: 1,900 thousand people needed food aid."],
          ["Year 1", "Only 120 thousand needed aid in Year 1."],
          ["Year 3", "650 thousand needed aid in Year 3."],
          ["Year 4", "300 thousand needed aid in Year 4."],
        ],
        answer: "A", explanation: "Year 2 had the lowest rainfall and the most people needing aid.",
      }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage decrease in maize production from Year 1 to Year 2. Give your answer to one decimal place.", value: 46.2069, answer: "46.2", tol: 0.05, wrong: [85.9, 670], explanation: "Fall = 670; 670 ÷ 1,450 × 100 = 46.2%." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe the relationship between rainfall and maize production shown in Table 1.",
        points: ["Positive relationship: as rainfall increases, maize production increases (and vice versa).", "Uses data, e.g. 62% rainfall gave 780 thousand tonnes, while 105% gave 1,450 thousand tonnes."],
        modelAnswer: "There is a positive relationship: the wetter the year, the higher the production. In Year 2, with 62% of average rainfall, production fell to 780 thousand tonnes, compared with 1,450 thousand tonnes in Year 1 with 105%.",
        explanation: "State the relationship and support it with figures.",
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Describe **two** natural and **two** human factors, other than low rainfall, that can reduce food supply.",
        points: [
          "Natural: pests such as locusts or fall armyworm / crop or livestock diseases.",
          "Natural: floods or tropical cyclones / infertile or eroded soils / climate change.",
          "Human: conflict destroying crops and displacing farmers.",
          "Human: poverty and high input prices / land degradation / poor roads and storage / population growth.",
        ],
        modelAnswer: "Natural factors include pests such as fall armyworm that eat crops, and floods or cyclones that wash away fields. Human factors include conflict, which drives farmers from their land, and poverty, which stops farmers buying seed and fertiliser.",
        explanation: "Two natural and two human factors.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Describe the problems that food insecurity causes for people in LICs.",
        points: [
          "Undernutrition and deficiency diseases such as kwashiorkor or marasmus.",
          "Stunted growth and poor learning in children.",
          "Weak immunity, more illness and higher child mortality.",
          "Reduced ability to work / sale of livestock and tools / migration.",
        ],
        modelAnswer: "Hungry people suffer undernutrition and diseases such as kwashiorkor. Children's growth is stunted and they do less well at school. Illness and child deaths increase, and weak adults cannot work, so families sell animals and tools or migrate in search of food.",
        explanation: "Describe several problems.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Evaluate the role of food aid in improving food security.",
        points: [
          "Saves lives quickly in emergencies such as Year 2's drought.",
          "Food-for-work or locally bought aid can build assets and support local farmers.",
          "But free imported aid can lower local prices and create dependency / may not reach the neediest / tied aid.",
          "Judgement: effective as short-term relief, but long-term development is needed to tackle causes.",
        ],
        modelAnswer: "Food aid saved lives in Year 2, when nearly two million people needed help. Food-for-work can also build dams and terraces. However, large amounts of free imported grain can lower prices for local farmers and create dependency, and aid may arrive late or not reach the poorest. Food aid is valuable in emergencies but does not solve the causes of food insecurity on its own.",
        explanation: "Weigh strengths and weaknesses and judge.",
      }),
      P.mcq({
        label: "(g)", stem: "Which strategy would most reduce the country's dependence on rainfall for maize production?",
        options: [
          ["Building small irrigation schemes", "Correct: irrigation supplies water when rain fails."],
          ["Importing more maize every year", "Imports supply food but do not change production's dependence on rain."],
          ["Growing more tobacco for export", "Tobacco is a cash crop, not a solution to rain dependence."],
          ["Increasing the number of cattle", "More cattle could lead to overgrazing."],
        ],
        answer: "A", explanation: "Irrigation reduces the effect of drought on harvests.",
      }),
      P.manual({
        label: "(h)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Using a detailed specific example of a named country or area, explain why food insecurity occurs there and assess how successful attempts to reduce it have been.",
        points: [
          "Names a country or area (e.g. Zimbabwe) and describes its dependence on rain-fed staple crops.",
          "Natural causes with detail: droughts (e.g. 1991-92, 2015-16, 2023-24), Cyclone Idai (2019), pests.",
          "Human causes with detail: economic instability and input prices, land degradation, poor storage and roads.",
          "Effects: poor harvests, high food prices, undernutrition, need for food aid.",
          "Attempts: conservation agriculture (Pfumvudza), small grains, irrigation, input support, GMB reserves, WFP aid.",
          "Assessment of the success and limits of each attempt.",
          "Overall judgement.",
        ],
        levels: geographyLevels(7),
        modelAnswer: "Zimbabwe's food security depends on rain-fed maize grown by small-scale farmers. Droughts such as those of 1991-92, 2015-16 and 2023-24 caused harvests to fail, and Cyclone Idai in 2019 destroyed crops and food stores in Chimanimani and Chipinge. Economic instability has made seed and fertiliser expensive, land degradation has lowered yields in crowded communal areas, and poor roads and storage cause losses. In bad years food prices rise, families eat fewer meals and child undernutrition increases. Attempts to reduce insecurity include the Pfumvudza conservation agriculture programme, which has helped many farmers keep moisture in the soil and harvest more in dry years, though it is labour-intensive. Promoting small grains reduces the risk of total crop failure in the dry south and west. Rehabilitating irrigation schemes stabilises output, but only for a small share of farmers. In severe droughts the GMB grain reserve and food assistance from the World Food Programme have prevented famine, but they are short-term measures. These attempts have reduced the worst effects of drought, but because most farming still depends on rainfall, food insecurity returns whenever the rains fail.",
        explanation: "A detailed specific example of causes and responses, assessed.",
      }),
    ],
    explanation: "A Cambridge Paper 2 topic 10 question on the challenges of food supply: data analysis, factors reducing supply, problems of insecurity, food aid and a detailed specific example.",
  });
});
