// Slice G4a: ZIMSEC Paper 2 Section B (economic geography) exam-format questions: industry and tourism (2 × 25 marks).
import { concept, P, ZIM, geographyLevels } from "../lib.mjs";

concept("geo.industry.zimbabwe-industry", { file: "exam/zim-p2-b-industry", keyPrefix: "exam.zim-p2-b-industry", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.industry.zimbabwe-industry", "geo.industry.location-factors", "geo.industry.classification-employment", "geo.industry.small-informal"],
    stem: "Table 1 shows the number of manufacturing firms in five towns of a fictional country (fictional data).\n\n| Town | Description | Manufacturing firms |\n|---|---|---|\n| A | Capital city; railway and airport junction | 465 |\n| B | Second city; railway workshops | 290 |\n| C | Mining town on the main railway | 125 |\n| D | Small town 90 km from the railway | 25 |\n| E | Rural growth point | 15 |",
    hints: ["Add all five towns for the total.", "Think about markets, labour and transport in the capital."],
    parts: [
      P.mcq({
        label: "(a)", stem: "To which sector of industry does sugar milling belong?",
        options: [
          ["Secondary", "Correct: milling processes cane into sugar."],
          ["Primary", "Growing the cane is primary; milling is not."],
          ["Tertiary", "Tertiary industries provide services."],
          ["Quaternary", "Quaternary industries are research and ICT."],
        ],
        answer: "A", explanation: "Processing is secondary industry.",
      }),
      P.num({ label: "(b)", stem: "Calculate the total number of manufacturing firms in the five towns.", value: 920, wrong: [880, 905], explanation: "465 + 290 + 125 + 25 + 15 = 920." }),
      P.num({ label: "(c)", marks: 2, unit: "%", stem: "Calculate the percentage of the firms that are in Town A. Give your answer to one decimal place.", value: 50.5435, answer: "50.5", tol: 0.05, wrong: [46.5, 49.5], explanation: "465 ÷ 920 × 100 = 50.5%." }),
      P.manual({
        label: "(d)", marks: 4, stem: "Describe the distribution of manufacturing industry in Zimbabwe.",
        points: [
          "Uneven: concentrated in a few large urban centres.",
          "Harare is the largest centre, followed by Bulawayo.",
          "A belt along the Harare–Bulawayo railway through the Midlands towns (Kadoma, Kwekwe, Gweru).",
          "Smaller centres such as Mutare and the Lowveld (Triangle, Hippo Valley); little industry in most rural/communal areas.",
        ],
        modelAnswer: "Manufacturing in Zimbabwe is very unevenly distributed. Most is concentrated in Harare, the largest centre, and Bulawayo. There is a belt of industry along the railway between them through Kadoma, Kwekwe and Gweru. Smaller centres include Mutare and the sugar towns of Triangle and Hippo Valley, while most communal areas have very little manufacturing.",
        explanation: "Say where industry is concentrated and where it is sparse, with named places.",
      }),
      P.mcq({
        label: "(e)", stem: "Which industry is the best example of a **raw-material-oriented** industry in Zimbabwe?",
        options: [
          ["Ferrochrome smelting near the Great Dyke", "Correct: heavy chrome ore is processed close to where it is mined."],
          ["Bread baking in Harare", "Bakeries are market-oriented because bread is perishable."],
          ["Printing daily newspapers in Bulawayo", "Printing is market-oriented."],
          ["Software development in Harare", "Software is footloose."],
        ],
        answer: "A", explanation: "Weight-losing processing of minerals locates near the raw material.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain why many manufacturing industries are located in Harare.",
        points: [
          "Largest market in the country: many consumers and businesses.",
          "Large labour supply, both skilled and semi-skilled.",
          "Hub of road, rail and air transport, so inputs and products move easily.",
          "Capital city with banks, head offices and government / reliable services and agglomeration with other firms.",
        ],
        modelAnswer: "Harare is the country's largest market, so factories making food, drinks and clothing are close to their customers. It has a large pool of skilled and semi-skilled workers. Main roads, the railway and the international airport meet there, and as the capital it has banks, head offices and government departments, so firms gain from clustering together.",
        explanation: "Explain several human factors with development.",
      }),
      P.manual({
        label: "(g)", marks: 4, stem: "Describe **four** measures that a factory can use to promote occupational safety and health.",
        points: [
          "Provide PPE such as gloves, goggles, ear protectors, overalls and boots.",
          "Fit guards to machines and maintain equipment.",
          "Train workers in safe methods and first aid; display warning signs.",
          "Provide ventilation, fire extinguishers, clear exits and first-aid kits / safety committees and inspections / register with NSSA for compensation.",
        ],
        modelAnswer: "The factory should give workers protective equipment such as goggles, gloves and ear protectors, fit guards to moving machinery, train workers in safe methods and first aid, and keep fire extinguishers, clear exits and good ventilation, with regular inspections.",
        explanation: "Four distinct measures.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "With reference to named examples, discuss the importance of manufacturing and processing industries to Zimbabwe's economy.",
        points: [
          "Adds value to raw materials: e.g. ferrochrome rather than chrome ore; sugar and ethanol from cane at Triangle.",
          "Export earnings and foreign currency from processed goods.",
          "Employment in towns (Harare, Bulawayo, Midlands) and in agro-processing areas (Lowveld estates).",
          "Import substitution: local fertiliser, food, building materials save foreign currency.",
          "Linkages: buys from farms and mines, supplies other sectors; multiplier effect on services.",
          "Government revenue from taxes; development of towns and infrastructure.",
          "Limits: industry concentrated in a few centres; problems (power, old machinery, imports) reduce its contribution.",
          "Judgement on the overall importance.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Manufacturing and processing are important because they add value to Zimbabwe's raw materials. Chrome ore from the Great Dyke is smelted into ferrochrome in the Midlands, and cane from the Lowveld estates is milled into sugar at Triangle and Hippo Valley, where molasses is also turned into ethanol. Processed goods earn more foreign currency than raw materials. Factories employ many people in Harare, Bulawayo and the Midlands towns, and the sugar estates support whole settlements with schools and clinics. Producing fertiliser, food and building materials locally saves foreign currency that would be spent on imports. Industries also create linkages: mills buy cane from outgrowers and ginneries buy cotton from small-scale farmers, while transport, banking and retail grow on the back of factory wages. Taxes from industry fund government services. However, the benefits are concentrated along the Harare–Bulawayo railway, and power cuts, obsolete machinery and cheap imports have reduced output. Overall manufacturing remains very important, because it adds value, creates jobs and links the other sectors of the economy, although it contributes less than it could.",
        explanation: "Discuss several aspects of importance with named examples and reach a judgement.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section B industry question: classification, data on industrial distribution, location factors, occupational safety and an extended discussion of the importance of manufacturing.",
  });
});

concept("geo.tourism.zimbabwe", { file: "exam/zim-p2-b-tourism", keyPrefix: "exam.zim-p2-b-tourism", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 2250,
    concepts: ["geo.tourism.zimbabwe", "geo.industry.classification-employment"],
    stem: "Table 1 shows international tourist arrivals at a fictional resort town in Zimbabwe in one year, by region of origin (thousands, fictional data).\n\n| Region of origin | Arrivals (thousands) |\n|---|---|\n| Africa | 210 |\n| Europe | 95 |\n| The Americas | 45 |\n| Asia | 40 |\n| Other | 10 |",
    hints: ["Add the regions for the total.", "Percentage = part ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total number of international arrivals (thousands).", value: 400, wrong: [390, 350], explanation: "210 + 95 + 45 + 40 + 10 = 400 thousand." }),
      P.num({ label: "(b)", marks: 2, unit: "%", stem: "Calculate the percentage of arrivals that came from Europe.", value: 23.75, tol: 0.05, wrong: [95, 45.2], explanation: "95 ÷ 400 × 100 = 23.75%." }),
      P.mcq({
        label: "(c)", stem: "Which tourist attraction is found near Bulawayo?",
        options: [
          ["The Matobo Hills", "Correct: the Matobo Hills lie south of Bulawayo."],
          ["Mana Pools", "Mana Pools is in the Zambezi valley in the north."],
          ["Great Zimbabwe", "Great Zimbabwe is near Masvingo."],
          ["Mount Nyangani", "Mount Nyangani is in the Eastern Highlands."],
        ],
        answer: "A", explanation: "The Matobo Hills, with kopjes and rock art, are near Bulawayo.",
      }),
      P.match({
        label: "(d)", stem: "Match each attraction with what draws tourists to it.",
        pairs: [
          ["Great Zimbabwe", "Ancient dry-stone walls of a Shona capital"],
          ["Hwange National Park", "Large herds of elephant in the largest national park"],
          ["Lake Kariba", "Houseboats and tiger-fishing on a man-made lake"],
          ["Victoria Falls", "A waterfall on the Zambezi with white-water rafting"],
        ],
        explanation: "Each attraction has a distinctive draw: heritage, wildlife, lake recreation or adventure.",
      }),
      P.manual({
        label: "(e)", marks: 4, stem: "Distinguish between tertiary and quaternary industries, giving a Zimbabwean example of each.",
        points: [
          "Tertiary industries provide services to people and businesses.",
          "Tertiary example: e.g. hotels at Victoria Falls, banking, transport, retail, health or education.",
          "Quaternary industries are knowledge-based: research, ICT and specialist information services.",
          "Quaternary example: e.g. university or agricultural research, software or mobile-money development.",
        ],
        modelAnswer: "Tertiary industries provide services, such as the hotels and safari operators at Victoria Falls or banks and bus companies. Quaternary industries produce and process knowledge, such as research at universities and agricultural research stations or developing mobile-money software.",
        explanation: "A definition and an example for each.",
      }),
      P.manual({
        label: "(f)", marks: 4, stem: "Explain the importance of tourism to Zimbabwe.",
        points: [
          "Earns foreign currency from international visitors, used to pay for imports.",
          "Creates jobs in hotels, lodges, guiding, crafts and transport, including in rural areas.",
          "Multiplier effect: spending supports farmers, curio makers and other businesses / government revenue from taxes and fees.",
          "Funds conservation (park fees, CAMPFIRE) / improves infrastructure such as airports and roads.",
        ],
        modelAnswer: "International tourists bring foreign currency that pays for fuel and machinery imports. Tourism creates jobs in lodges, guiding and craft markets, and this spending spreads to farmers and transport operators. Park fees and community schemes fund conservation, and airports and roads built for tourism serve local people too.",
        explanation: "Each point should be explained, not just listed.",
      }),
      P.short({
        label: "(g)", stem: "Name the river on which Lake Kariba was formed.",
        accepted: ["Zambezi", "the Zambezi", "Zambezi River", "the Zambezi River", "Zambesi"],
        wrong: ["Save"],
        explanation: "Lake Kariba formed behind the Kariba dam on the Zambezi.",
      }),
      P.manual({
        label: "(h)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "With reference to **one** named tourist area in Zimbabwe, discuss the benefits and problems that tourism brings to the area.",
        points: [
          "Names the area and describes its attractions (e.g. Victoria Falls: the falls, rainforest, adventure activities).",
          "Benefit: jobs in hotels, lodges, guiding, rafting and craft markets.",
          "Benefit: foreign currency and business for local suppliers (multiplier effect).",
          "Benefit: infrastructure, e.g. the upgraded airport and roads; funds for conservation.",
          "Problem: environmental pressure (paths and rainforest, litter, water use, waste).",
          "Problem: dependence on foreign visitors; seasonality and shocks (e.g. COVID-19, low water late in the dry season).",
          "Problem: human-wildlife conflict, rising costs for residents, leakage to foreign operators.",
          "Judgement on whether benefits outweigh problems.",
        ],
        levels: geographyLevels(8),
        modelAnswer: "Victoria Falls town has grown around the falls, the rainforest and adventure activities such as bungee jumping, white-water rafting and sunset cruises on the Zambezi. Tourism provides most of the jobs in the town, in hotels, lodges, rafting companies and craft markets, and brings in foreign currency. Spending by tourists supports local suppliers, transport operators and curio carvers. The airport was upgraded to take larger aircraft, which also benefits residents. However, heavy use damages the rainforest paths and increases litter and demand for water. The town depends almost entirely on foreign visitors, so arrivals and jobs fall sharply in shocks such as the COVID-19 pandemic or when the country's image suffers, and the falls carry much less water late in the dry season. Elephants and other animals sometimes damage gardens and threaten people, and much of the money paid to foreign tour companies leaks out of the country. Overall the benefits outweigh the problems because tourism is the town's main source of income, but managing the environment and reducing dependence on foreign visitors are essential.",
        explanation: "Benefits and problems for a named area, with a judgement.",
      }),
    ],
    explanation: "A ZIMSEC Paper 2 Section B tourism question: data on arrivals, Zimbabwe's attractions, service and quaternary industries, the importance of tourism and an extended discussion of a named tourist area.",
  });
});
