// Slice G4a: types of industry and employment structure (ZIMSEC 7.10.1; Cambridge 9.1.1-9.1.2).
import { concept, P, ZIM, CAM, geographyLevels } from "../lib.mjs";

concept("geo.industry.classification-employment", { file: "industry/classification-employment", keyPrefix: "industry.classification-employment" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which activity is an example of **primary** industry?",
    options: [
      ["Fishing for kapenta on Lake Kariba", "Correct: fishing takes a raw material directly from nature."],
      ["Smelting chrome ore into ferrochrome", "Smelting processes a raw material, so it is secondary industry."],
      ["Selling fish at a market in Mbare", "Selling is a service, so it is tertiary industry."],
      ["Developing software for a mobile bank", "Software development is knowledge-based, so it is quaternary industry."],
    ],
    answer: "A",
    explanation: "Primary industry extracts or grows raw materials: farming, mining, forestry and fishing.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A factory in Bulawayo turns cotton yarn into cloth. To which sector does it belong?",
    options: [
      ["Secondary", "Correct: weaving changes a material into a manufactured product."],
      ["Primary", "Primary industry grows or extracts raw materials; the factory does not grow the cotton."],
      ["Tertiary", "Tertiary industry provides services rather than making goods."],
      ["Quaternary", "Quaternary industry produces knowledge and information, not cloth."],
    ],
    answer: "A",
    explanation: "Manufacturing and processing are secondary industry.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which job belongs to the **quaternary** sector?",
    options: [
      ["A scientist breeding drought-tolerant maize varieties", "Correct: research and development is a knowledge-based (quaternary) activity."],
      ["A nurse working in a district hospital", "Health care is a service to people, so it is tertiary."],
      ["A miner drilling at a platinum mine", "Mining extracts a raw material, so it is primary."],
      ["A builder constructing a new school block", "Construction is usually counted as secondary industry."],
    ],
    answer: "A",
    explanation: "Quaternary industry covers research, ICT, consultancy and other knowledge-based services.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In most **low-income countries**, which sector employs the largest share of workers?",
    options: [
      ["Primary, because most people farm small plots with little machinery", "Correct: subsistence and small-scale farming need many workers."],
      ["Secondary, because factories are cheap to build in poor countries", "Factories need capital, which LICs have little of."],
      ["Tertiary, because most people work in offices and shops", "Services dominate in HICs, not LICs."],
      ["Quaternary, because research jobs are spread evenly across the world", "Research jobs are concentrated in HICs."],
    ],
    answer: "A",
    explanation: "LICs have most workers in the primary sector, mainly farming done by hand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do **high-income countries** have a very small percentage of workers in primary industry?",
    options: [
      ["Farming and mining are highly mechanised, so few workers are needed", "Correct: machines replace labour, so output can stay high with few workers."],
      ["They have no farmland or minerals left to use", "HICs still farm and mine on a large scale; they simply use fewer workers."],
      ["Primary industry is banned to protect the environment", "Primary industry is regulated, not banned."],
      ["All their food and raw materials are imported from LICs", "HICs import some raw materials but produce much of their own food."],
    ],
    answer: "A",
    explanation: "Mechanisation means a small share of workers can produce large amounts in HICs.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Think about the shape of each line as a country develops.", "Which sector rises, peaks and then falls?"],
    stem: "In the Clark-Fisher model, which sector's share of employment **rises to a peak and then falls** as a country develops?",
    options: [
      ["Secondary", "Correct: manufacturing grows during industrialisation, then falls with automation and competition from abroad."],
      ["Primary", "Primary employment falls steadily throughout."],
      ["Tertiary", "Tertiary employment rises throughout."],
      ["Quaternary", "Quaternary employment grows mainly in the later stages and keeps rising."],
    ],
    answer: "A",
    explanation: "Primary falls, secondary rises then falls, tertiary (and quaternary) rise throughout.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: CAM,
    hints: ["Add the three percentages for each country.", "Which country has most workers in services?"],
    stem: "A fictional country's employment structure is 4% primary, 22% secondary and 74% tertiary and quaternary (fictional data). Which description fits it best?",
    options: [
      ["A high-income country with a post-industrial economy", "Correct: a tiny primary share and a large service sector show a HIC."],
      ["A low-income country where most people farm", "An LIC would have most workers in primary industry, not 4%."],
      ["A middle-income country in the middle of industrialising", "An industrialising MIC would still have a sizeable primary sector and a growing secondary one."],
      ["A country that depends on subsistence agriculture", "Subsistence farming would give a very large primary share."],
    ],
    answer: "A",
    explanation: "4% primary and 74% services are typical of an HIC at the post-industrial stage.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    hints: ["Which sector earns foreign currency from overseas visitors?"],
    stem: "Hotels and safari lodges in Hwange earn money from foreign visitors. How does this mainly help Zimbabwe's economy?",
    options: [
      ["It brings in foreign currency from a tertiary industry", "Correct: tourism is a service (tertiary) industry and an export of services."],
      ["It adds value to raw materials before they are exported", "That describes secondary processing, not tourism."],
      ["It increases the supply of raw materials for factories", "Tourism does not produce raw materials."],
      ["It replaces the need for primary industry in rural areas", "Rural areas still depend on farming; lodges employ relatively few people."],
    ],
    answer: "A",
    explanation: "Tourism is a tertiary industry that earns foreign currency and creates service jobs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Construction is usually classified as a tertiary industry.",
    answer: false,
    explanation: "False. Construction builds physical things and is usually counted as secondary industry.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "As a country industrialises, the percentage of its workers in primary industry usually falls.",
    answer: true,
    explanation: "True. Farming becomes mechanised and people move to factory and service jobs in towns.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each activity with its sector of industry.",
    pairs: [
      ["Felling pine trees in a plantation near Nyanga", "Primary"],
      ["Milling sugar cane in the Lowveld", "Secondary"],
      ["Driving a long-distance bus", "Tertiary"],
      ["Designing a weather-forecasting computer model", "Quaternary"],
    ],
    explanation: "Forestry is primary; milling is secondary; transport is tertiary; research and ICT are quaternary.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Turning raw materials into products of higher value is called adding {{blank:a}}. A country's employment structure shows the {{blank:b}} of workers in each sector. In high-income countries most people work in the {{blank:c}} sector.",
    blanks: [
      { id: "a", accepted: ["value"], choices: ["value", "labour", "capital", "weight"] },
      { id: "b", accepted: ["percentage"], choices: ["percentage", "wages", "age", "location"] },
      { id: "c", accepted: ["tertiary"], choices: ["tertiary", "primary", "secondary", "informal"] },
    ],
    explanation: "Processing adds value; employment structure is a percentage breakdown; HICs are dominated by tertiary employment.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "In a fictional country, 41% of workers are in primary industry and 17% in secondary industry (fictional data). The rest work in tertiary and quaternary industry. What percentage is that?",
    value: 42,
    wrong: [58, 24],
    explanation: "100 − 41 − 17 = 42%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    hints: ["Divide the sector total by the total workforce.", "Multiply by 100."],
    stem: "A fictional district has 64,000 workers, of whom 11,520 work in manufacturing (fictional data). Calculate the percentage of the workforce in manufacturing.",
    value: 18,
    tol: 0.05,
    wrong: [5.56, 82],
    workedSolution: "1. 11,520 ÷ 64,000 = 0.18.\n2. 0.18 × 100 = 18%.",
    explanation: "11,520 ÷ 64,000 × 100 = 18%.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the sector of industry that provides services such as banking, retail and transport.",
    accepted: ["tertiary", "tertiary sector", "tertiary industry", "the tertiary sector"],
    wrong: ["secondary"],
    explanation: "Services are tertiary industry.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3, applies: ZIM,
    stem: "Explain why secondary (manufacturing) industry is important to Zimbabwe.",
    points: [
      "It adds value to raw materials (e.g. sugar cane, cotton, chrome), so exports earn more.",
      "It creates jobs, especially in towns, and wages are spent in other businesses.",
      "It produces goods locally (e.g. fertiliser, food, building materials), reducing imports and saving foreign currency.",
    ],
    modelAnswer: "Manufacturing adds value to Zimbabwe's raw materials, so processed sugar or ferrochrome earns more than raw cane or ore. Factories employ many people in towns such as Harare and Bulawayo, and their wages support shops and transport. Making goods such as fertiliser locally also means less foreign currency is spent on imports.",
    explanation: "Each point needs a reason: value added, jobs, import substitution.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4, applies: CAM,
    hints: ["Think about factories moving abroad and machines replacing workers.", "Think about what richer people spend money on."],
    stem: "Explain why the percentage of workers in secondary industry has **fallen** in many HICs while the tertiary percentage has risen.",
    points: [
      "Automation / robots in factories mean fewer workers are needed.",
      "Many factories have relocated to countries with lower labour costs (deindustrialisation / global shift).",
      "Rising incomes increase demand for services such as leisure, health, finance and tourism.",
      "An ageing, more educated workforce and growth of ICT create service and quaternary jobs.",
    ],
    modelAnswer: "In HICs many factories now use robots, so they need fewer workers, and many manufacturers have moved production to Asian countries where wages are lower. At the same time people are richer and spend more on services such as holidays, health care and banking, and better-educated workers take jobs in offices and ICT.",
    explanation: "Give two reasons for the fall in secondary and two for the rise in tertiary.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the employment structure of three fictional countries (percentage of workers, fictional data).\n\n| Country | Primary | Secondary | Tertiary and quaternary |\n|---|---|---|---|\n| X | 72 | 7 | 21 |\n| Y | 35 | 24 | ? |\n| Z | 3 | 18 | 79 |",
    hints: ["The three sectors must add up to 100%."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the missing percentage for tertiary and quaternary employment in Country Y.", value: 41, wrong: [59, 65], explanation: "100 − 35 − 24 = 41%." }),
      P.mcq({
        label: "(b)", stem: "Which country is most likely to be a low-income country, and why?",
        options: [
          ["X, because most of its workers are in primary industry", "Correct: 72% in primary industry shows an economy based on farming."],
          ["Y, because it has the largest secondary share", "A growing secondary sector is typical of a middle-income country."],
          ["Z, because most of its workers are in services", "A large service sector is typical of a high-income country."],
          ["Z, because it has the smallest primary share", "A tiny primary share shows mechanised farming in a high-income country."],
        ],
        answer: "A", explanation: "A very large primary share indicates a low-income country.",
      }),
      P.num({ label: "(c)", stem: "How many times larger is Country X's primary percentage than Country Z's? Give your answer as a whole number.", value: 24, wrong: [69, 3], explanation: "72 ÷ 3 = 24 times." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why Country Z has so few workers in primary industry.",
        points: ["Farming and mining are mechanised, so few workers are needed.", "Higher wages and better jobs in towns attract people out of farming.", "Some food and raw materials are imported rather than produced at home."],
        modelAnswer: "Country Z's farms and mines use machinery, so they need very few workers. Better-paid jobs in services pull people into towns. It may also import some food and raw materials.",
        explanation: "Link the low primary share to mechanisation, urban jobs and imports.",
      }),
    ],
    explanation: "This item practises completing and interpreting employment-structure data for countries at different levels of development.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480, applies: ZIM,
    stem: "Read this description of a fictional Zimbabwean town.\n\n\"Around the town, farmers grow cotton and maize. In the town a ginnery separates cotton lint from the seed, and a mill grinds maize into mealie-meal. Lorries carry bales of lint to Harare. The town has a bank, a hospital, two secondary schools and a busy market. An agricultural research station nearby tests new cotton varieties.\"",
    hints: ["Decide what each activity does: grows, processes, serves or researches."],
    parts: [
      P.match({
        label: "(a)", stem: "Match each activity in the town with its sector.",
        pairs: [["Growing cotton", "Primary"], ["Grinding maize into mealie-meal", "Secondary"], ["Running the hospital", "Tertiary"], ["Testing new cotton varieties", "Quaternary"]],
        explanation: "Growing is primary, processing is secondary, health care is tertiary and research is quaternary.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain how a drought that ruins the cotton crop would affect workers in other sectors in the town.",
        points: ["The ginnery has less cotton to process, so secondary workers lose hours or jobs.", "Less cotton to transport and lower farm incomes mean less spending, so lorry drivers, shops and the market (tertiary) lose business."],
        modelAnswer: "With little cotton to gin, the ginnery would lay off workers. Lorry owners would have less to carry, and farmers with no income would spend less at the market and shops.",
        explanation: "The sectors are linked: a fall in primary output spreads to secondary and tertiary jobs.",
      }),
    ],
    explanation: "This item practises classifying activities and seeing the links between sectors.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6, applies: CAM,
    hints: ["Describe what the Clark-Fisher model predicts.", "Then give cases where real countries do not follow it."],
    stem: "\"All countries pass through the same changes in employment structure as they develop.\" Discuss this statement.",
    points: [
      "Clark-Fisher model: primary falls, secondary rises then falls, tertiary rises as countries develop.",
      "Many HICs (e.g. the UK) did follow this sequence: industrialisation then deindustrialisation.",
      "Many MICs (e.g. in East Asia) show a growing secondary sector as factories relocate there, as predicted.",
      "Some countries move from primary straight to services (tourism, finance) without a large factory stage.",
      "Global shift means today's LICs compete with established manufacturers, so the path differs from the one HICs took; government policy and investment matter.",
      "Judgement: the model describes a general trend but not a fixed sequence for every country.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "The Clark-Fisher model suggests that as a country develops, primary employment falls, secondary rises to a peak and then falls, and tertiary rises throughout. Countries such as the UK followed this path, with factory jobs peaking and then declining as automation and overseas competition grew. Many Asian MICs are now in the industrial stage, with factory employment growing as TNCs move production there. However, not all countries follow the same path. Some small countries have moved from farming straight into tourism or financial services, and today's LICs find it hard to build up manufacturing because they compete with established producers. Government policy and foreign investment also shape the changes. So the statement is only partly true: the general direction of change is common, but the stages and timing differ from country to country.",
    explanation: "Discuss means give both sides and reach a judgement.",
  });

  b.card("DEFINITION", "Primary industry", "Extracting or growing raw materials: farming, mining, quarrying, forestry and fishing.");
  b.card("DEFINITION", "Secondary industry", "Manufacturing and processing raw materials or parts into finished goods; construction is usually included.");
  b.card("DEFINITION", "Tertiary industry", "Providing services to people and businesses, such as retail, transport, banking, health, education and tourism.");
  b.card("DEFINITION", "Quaternary industry", "Knowledge-based services: research and development, ICT, consultancy and specialist information processing.");
  b.card("DEFINITION", "Employment structure", "The percentage of a country's workers employed in each sector of industry.");
  b.card("CONCEPT", "Typical employment structure of an LIC", "Most workers in primary industry (mainly farming by hand); small secondary and tertiary sectors.");
  b.card("CONCEPT", "Typical employment structure of an HIC", "Very few primary workers (mechanised), a shrinking secondary sector, and most workers in tertiary and quaternary jobs.");
  b.card("CONCEPT", "Clark-Fisher model", "As a country develops: primary employment falls, secondary rises then falls, tertiary rises throughout.");
  b.card("VOCABULARY", "Deindustrialisation", "The decline of manufacturing employment in a country, through automation and factories moving abroad.");
  b.card("FACT", "Why industry matters to Zimbabwe", "Primary (minerals, tobacco) earns most foreign currency; secondary adds value and creates urban jobs; tertiary (tourism, transport, banking) supports the economy.", undefined, { applies: ZIM });
});
