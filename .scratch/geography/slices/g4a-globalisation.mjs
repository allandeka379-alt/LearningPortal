// Slice G4a: globalisation (Cambridge 9.2.1-9.2.3). Cambridge-only concept.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.industry.globalisation", { file: "industry/globalisation", keyPrefix: "industry.globalisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the best definition of **globalisation**?",
    options: [
      ["The growing connection and interdependence of countries through trade, communications and investment", "Correct: it stresses both connections and interdependence."],
      ["The spread of a single world government that makes laws for every country on Earth", "Globalisation is economic, cultural and social; it does not create one government."],
      ["The movement of people from rural areas into cities", "That is urbanisation (rural-urban migration)."],
      ["The process of mapping the whole surface of the globe accurately using satellites and aerial photographs", "That is cartography, not globalisation."],
    ],
    answer: "A",
    explanation: "Globalisation means places become more connected and interdependent.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **trade liberalisation**?",
    options: [
      ["Reducing barriers to trade such as tariffs and quotas", "Correct: it makes trade between countries easier and cheaper."],
      ["Banning all imports to protect local industry and its jobs", "That is protectionism, the opposite."],
      ["Allowing only government firms to trade", "This restricts trade rather than freeing it."],
      ["Paying workers more in export industries", "Wages are not part of trade liberalisation."],
    ],
    answer: "A",
    explanation: "Trade liberalisation removes tariffs, quotas and other barriers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How has **containerisation** helped globalisation?",
    options: [
      ["Goods transfer quickly between ships, trains and lorries, cutting transport costs", "Correct: standard containers made long-distance trade cheaper and faster."],
      ["It allows most manufactured goods to be sent electronically instead of by sea", "Physical goods still travel by ship, rail and road."],
      ["It has removed the need for ports and harbours", "Containers still pass through ports, which have grown larger."],
      ["It makes every product cost the same everywhere", "Prices still differ between countries."],
    ],
    answer: "A",
    explanation: "Containerisation reduced loading time and cost, encouraging global trade.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **cultural** impact of globalisation?",
    options: [
      ["The same fast-food chains and films are found in many countries", "Correct: this is the spread of a global culture."],
      ["A rise in the number of containers passing through ports", "This is a transport and trade impact."],
      ["Lower tariffs between members of a trading bloc", "This is a cause linked to trade policy."],
      ["Factories relocating to countries with lower wages and taxes", "This is an economic impact on production."],
    ],
    answer: "A",
    explanation: "Cultural impacts include the spread of brands, music, food, films and languages.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organisation works to reduce barriers to trade between countries worldwide?",
    options: [
      ["The World Trade Organization", "Correct: the WTO, set up in 1995, negotiates trade rules between members."],
      ["The World Health Organization", "The WHO deals with international public health."],
      ["The Southern African Development Community", "SADC is a regional community, not a worldwide one."],
      ["The United Nations Children's Fund", "UNICEF works for children's welfare."],
    ],
    answer: "A",
    explanation: "The WTO is the global body for trade rules.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which change allows managers to control distant factories day to day?"],
    stem: "Which development has most allowed a company to run factories on several continents from one headquarters?",
    options: [
      ["Instant communication by internet, email and video calls", "Correct: managers can monitor and direct distant operations in real time."],
      ["The invention of the steam locomotive and the early railways", "Railways helped trade within continents long before global production networks."],
      ["Higher tariffs on imported components", "Higher tariffs discourage spreading production across countries."],
      ["Growth of subsistence farming in LICs", "Subsistence farming is not linked to managing global production."],
    ],
    answer: "A",
    explanation: "Modern communications are a key cause of global production networks.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["What is the gap between groups with and without access?"],
    stem: "In a fictional LIC, 70% of city residents but only 15% of rural residents use the internet (fictional data). Which term describes this difference?",
    options: [
      ["The digital divide", "Correct: an unequal gap in access to communications technology."],
      ["Trade liberalisation", "This refers to removing trade barriers."],
      ["Containerisation", "This refers to moving goods in standard containers."],
      ["Deindustrialisation", "This refers to the decline of manufacturing."],
    ],
    answer: "A",
    explanation: "The digital divide is the gap between people who have access to digital technology and those who do not.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Think about who gains and who loses from cheaper imports."],
    stem: "Cheap imported clothing floods the market of an LIC. Which statement is the most balanced judgement?",
    options: [
      ["Consumers gain lower prices, but local clothing firms and their workers may lose out", "Correct: it weighs both the gains and the losses."],
      ["Everyone in the country gains, because the prices of all clothing in the shops fall sharply", "Local producers and their workers can lose jobs."],
      ["Nobody gains, because imports always damage an economy", "Consumers gain from lower prices and wider choice."],
      ["Only the government gains, from higher tariffs", "Cheap imports usually follow lower, not higher, tariffs."],
    ],
    answer: "A",
    explanation: "Globalisation creates winners and losers within the same country.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mobile phones and the internet are causes of globalisation.",
    answer: true,
    explanation: "True. Instant, cheap communication links people and businesses worldwide.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Globalisation affects only the economy and has no effect on culture.",
    answer: false,
    explanation: "False. It spreads music, films, food, brands and languages, and can weaken local traditions.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the aspect of globalisation it shows.",
    pairs: [
      ["A Zimbabwean family receives money from a relative in the UK by mobile transfer", "Flows of money"],
      ["A container ship carries cars from Japan to Durban", "Transport and trade"],
      ["Young people in many countries follow the same international football clubs", "Global culture"],
      ["A video call joins managers in three continents", "Communications"],
    ],
    explanation: "Remittances are money flows; container shipping is trade and transport; shared sport is culture; video calls are communications.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "When countries rely on each other for goods, money and markets, they are {{blank:a}}. China opened special economic zones such as {{blank:b}} from 1980 to attract foreign companies.",
    blanks: [
      { id: "a", accepted: ["interdependent"], choices: ["interdependent", "independent", "landlocked", "isolated"] },
      { id: "b", accepted: ["Shenzhen"], choices: ["Shenzhen", "Durban", "Mumbai", "Lagos"] },
    ],
    explanation: "Interdependence is a key feature of globalisation; Shenzhen was one of China's first special economic zones.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional country's exports rose from US\\$40 billion to US\\$58 billion over ten years (fictional data). Calculate the percentage increase.",
    value: 45,
    tol: 0.05,
    wrong: [18, 31],
    explanation: "Increase = 18; 18 ÷ 40 × 100 = 45%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Work out how many days the slow method takes.", "Subtract the fast method."],
    stem: "Loading a ship by hand with loose cargo took a fictional port 12 days for one ship. With containers the same cargo is loaded in 18 hours. How many hours are saved? (Fictional data.)",
    value: 270,
    unit: "h",
    wrong: [6, 288],
    workedSolution: "1. 12 days = 12 × 24 = 288 hours.\n2. Saving = 288 − 18 = 270 hours.",
    explanation: "12 days is 288 hours; 288 − 18 = 270 hours saved.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the type of company that operates in more than one country.",
    accepted: ["transnational corporation", "TNC", "transnational company", "multinational", "multinational corporation", "multinational company", "MNC"],
    wrong: ["parastatal"],
    explanation: "A transnational (multinational) corporation operates in several countries.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** key features of globalisation.",
    points: [
      "Growth of international trade in goods and services / global production networks.",
      "Rapid global flows of money, information and communications.",
      "Movement of people (migration, tourism) and spread of a global culture or brands.",
    ],
    modelAnswer: "World trade has grown, with products made from parts from many countries. Money and information flow around the world instantly over the internet. More people travel and migrate, and the same brands, music and films are found almost everywhere.",
    explanation: "Describe features (what globalisation looks like), not causes.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Give one positive and one negative for each aspect."],
    stem: "Describe the positive and negative impacts of globalisation on **communications** and **technology**.",
    points: [
      "Communications positive: instant, cheap contact; information and education reach remote areas.",
      "Communications negative: digital divide between connected and unconnected people / misinformation spreads quickly.",
      "Technology positive: new technologies such as mobile money spread to LICs and MICs.",
      "Technology negative: automation replaces jobs / dependence on technology controlled by a few firms.",
    ],
    modelAnswer: "Globalisation has made communication instant and cheap, so farmers can check prices and students can study online, but people without internet access are left behind by the digital divide. Technologies such as mobile banking have spread quickly to LICs, yet automation replaces some jobs and a few large firms control much of the technology.",
    explanation: "Two aspects, each with a positive and a negative.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows the value of a fictional MIC's exports (US\\$ billion, fictional data).\n\n| Year | Manufactured goods | Raw materials | Total |\n|---|---|---|---|\n| 2000 | 12 | 18 | 30 |\n| 2020 | 54 | 21 | 75 |",
    hints: ["Percentage = part ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", unit: "%", stem: "Calculate the percentage of total exports that were manufactured goods in 2000.", value: 40, wrong: [60, 12], explanation: "12 ÷ 30 × 100 = 40%." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage of total exports that were manufactured goods in 2020.", value: 72, wrong: [28, 54], explanation: "54 ÷ 75 × 100 = 72%." }),
      P.mcq({
        label: "(c)", stem: "Which statement best describes the change shown in Table 1?",
        options: [
          ["Manufactured goods became the main export as total exports grew", "Correct: manufacturing rose from 40% to 72% of a larger total."],
          ["Raw materials became the main export while manufacturing declined", "Raw materials fell from 60% to 28% of exports."],
          ["Total exports fell over the period", "Total exports rose from 30 to 75 billion."],
          ["Both types of export fell in value", "Both rose in value (12 to 54 and 18 to 21)."],
        ],
        answer: "A", explanation: "The economy shifted towards manufactured exports.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons, linked to globalisation, for the growth of manufactured exports.",
        points: ["TNCs set up factories to use cheaper labour / land.", "Trade liberalisation or membership of the WTO / trading blocs opened export markets.", "Containerisation and better communications cut costs of reaching distant markets / special economic zones offered tax incentives."],
        modelAnswer: "TNCs moved factories there to use cheaper labour. Lower trade barriers opened markets abroad. Containers and the internet made it cheaper to sell to distant customers, and tax incentives in economic zones attracted investment.",
        explanation: "Link the change to causes of globalisation.",
      }),
    ],
    explanation: "This item practises interpreting export data and linking change to globalisation.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 420,
    stem: "Read this description of a fictional town in an LIC.\n\n\"Ten years ago the town had no mobile signal. Now most adults have a phone. Farmers check maize prices before selling, traders pay suppliers by mobile money, and young people follow foreign music and fashion online. Some older residents say traditional songs and dances are disappearing.\"",
    hints: ["Separate positive and negative impacts."],
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Describe **two** economic benefits that mobile phones have brought to the town.",
        points: ["Farmers get price information and sell at better prices.", "Mobile money allows quick, safe payments without banks."],
        modelAnswer: "Farmers check prices and avoid selling too cheaply, and traders pay suppliers instantly with mobile money.",
        explanation: "Use evidence from the description.",
      }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain **one** negative cultural impact of globalisation shown in the description.",
        points: ["Foreign music and fashion spread through the internet.", "Local traditions (songs, dances) are lost / culture becomes more uniform."],
        modelAnswer: "Young people adopt foreign music and fashion seen online, so traditional songs and dances are performed less and may be lost.",
        explanation: "A point plus its development.",
      }),
    ],
    explanation: "This item practises applying impacts of globalisation to a described place.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Use a detailed specific example such as China.", "Weigh benefits against problems before judging."],
    stem: "For a named country or area you have studied, evaluate the extent to which globalisation has brought more benefits than problems.",
    points: [
      "Names a country or area and its links to the global economy (e.g. China, Shenzhen special economic zone).",
      "Benefit: foreign investment and factories created jobs and raised incomes.",
      "Benefit: exports grew (e.g. China joining the WTO in 2001), infrastructure and skills improved.",
      "Benefit: people lifted out of poverty / access to technology and goods.",
      "Problem: low pay and long hours in some factories / loss of local firms to competition.",
      "Problem: air and water pollution / rising inequality / cultural change.",
      "Judgement on the balance, with a reason (e.g. who gains and who loses).",
    ],
    levels: geographyLevels(7),
    modelAnswer: "China opened to the global economy from 1980 by creating special economic zones such as Shenzhen, where foreign firms received low taxes, land and a large labour force. Factories making electronics and clothing created millions of jobs, and Shenzhen grew into a city of more than ten million people. After China joined the World Trade Organization in 2001 its exports rose rapidly, and incomes, roads, ports and skills improved; hundreds of millions of people escaped extreme poverty. However, there were problems. Many factory workers, especially migrants from rural areas, worked long hours for low pay, families were separated, and industrial cities suffered serious air and water pollution. The gap between rich coastal cities and the poorer interior widened. Overall, globalisation has brought China more benefits than problems, because living standards rose for most people, but the benefits were unequal and the environmental costs were high.",
    explanation: "Evaluate means weigh benefits against problems and reach a supported judgement.",
  });

  b.card("DEFINITION", "Globalisation", "The growing connection and interdependence of the world's economies, cultures and people through trade, investment, communications, transport and migration.");
  b.card("DEFINITION", "Interdependence", "Countries relying on each other for goods, services, money, workers and markets.");
  b.card("DEFINITION", "Trade liberalisation", "Removing or reducing barriers to trade such as tariffs and quotas.");
  b.card("VOCABULARY", "Digital divide", "The gap between people or places with access to digital technology and those without it.");
  b.card("CONCEPT", "Causes of globalisation", "Containerisation and cheaper transport; internet, mobile phones and satellites; trade liberalisation (WTO, trading blocs); growth of TNCs.");
  b.card("CONCEPT", "Features of globalisation", "Growing world trade, global production networks, flows of money, global communications, migration and tourism, global culture.");
  b.card("CONCEPT", "Impacts of globalisation", "On trade, transport, culture, communications and technology; each has positive and negative effects.");
  b.card("FACT", "China and globalisation", "Special economic zones such as Shenzhen from 1980; joined the WTO in 2001; became the world's largest exporter of manufactured goods.");
  b.card("FACT", "World Trade Organization", "Set up in 1995 to reduce barriers to trade between member countries.");
});
