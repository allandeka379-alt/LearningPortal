// Slice G4b: uneven development and the development gap (Cambridge 8.2; Cambridge only).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.development.uneven", { file: "development/uneven", keyPrefix: "development.uneven" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **development gap**?",
    options: [
      ["The difference in wealth and well-being between rich and poor countries", "Correct: this is the definition."],
      ["The time between independence and industrialisation", "This is not what the term means."],
      ["The distance between a country and its nearest port", "This relates to being landlocked."],
      ["The difference between a country's birth and death rates in a given year", "That is natural increase."],
    ],
    answer: "A",
    explanation: "The gap can be measured with income, life expectancy and other indicators.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which world region are most low-income countries found today?",
    options: [
      ["Sub-Saharan Africa", "Correct: most LICs are in this region."],
      ["Western Europe", "Western Europe is mostly high-income."],
      ["North America", "The USA and Canada are high-income."],
      ["Australasia", "Australia and New Zealand are high-income."],
    ],
    answer: "A",
    explanation: "A few LICs are in Asia, but most are in sub-Saharan Africa.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does being **landlocked** slow a country's development?",
    options: [
      ["Trade must pass through a neighbour's ports", "Correct: transport costs and delays rise."],
      ["Landlocked countries cannot grow crops", "Many landlocked countries farm successfully."],
      ["Landlocked countries never have large rivers", "Zimbabwe has the Zambezi and Limpopo."],
      ["Landlocked countries cannot build airports", "They can and do build them."],
    ],
    answer: "A",
    explanation: "Zimbabwe, Zambia and Malawi rely on ports in Mozambique, South Africa and Tanzania.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an **economic** reason for uneven development?",
    options: [
      ["Dependence on a few primary exports", "Correct: their prices rise and fall on world markets."],
      ["Frequent tropical cyclones and floods", "This is an environmental reason."],
      ["High rates of malaria", "This is a social or environmental reason."],
      ["Civil war", "This is a political reason."],
    ],
    answer: "A",
    explanation: "Primary exports earn little and their prices are unstable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the Brandt Line now considered **out of date**?",
    options: [
      ["Some 'South' countries are now rich", "Correct: e.g. South Korea and Singapore."],
      ["It was first drawn after 2015", "It was drawn in 1980."],
      ["It placed all of Asia in the 'North'", "It placed most of Asia in the 'South'."],
      ["It left the USA off the map", "The USA was in the 'North'."],
    ],
    answer: "A",
    explanation: "Development is now seen as a continuum (LIC, MIC, HIC) rather than a North-South divide.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How did colonialism contribute to uneven development in many African countries?",
    options: [
      ["Railways were built to export raw materials", "Correct: economies were geared to exporting minerals and crops."],
      ["It led to rapid industrialisation of colonies", "Industry was mostly kept in the colonial powers."],
      ["It reduced the export of raw materials", "It increased raw-material exports."],
      ["It created strong trade links between neighbours", "Links ran to ports and the colonial power."],
    ],
    answer: "A",
    explanation: "Colonial economies were organised to supply raw materials to Europe.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Link income, saving and services."],
    stem: "Which sequence best describes the **cycle of poverty**?",
    options: [
      ["Low income → little tax → poor services → low productivity", "Correct: each step leads to the next."],
      ["High income → more saving → better schools → more jobs", "This is a cycle of growth, not poverty."],
      ["Low income → high tax → many schools → high productivity", "Low incomes produce little tax."],
      ["Drought → high income → more clinics → low productivity", "Drought lowers income."],
    ],
    answer: "A",
    explanation: "Low incomes limit investment in people and infrastructure, which keeps incomes low.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Divide the tractor price by the coffee price each year."],
    stem: "A fictional country needed 10 tonnes of coffee to buy one tractor in Year 1 and 15 tonnes in Year 10. What has happened?",
    options: [
      ["Its terms of trade have worsened", "Correct: it must export more for the same import."],
      ["Its terms of trade have improved", "It now needs more coffee, so they worsened."],
      ["Coffee prices rose faster than tractor prices", "Then fewer tonnes would be needed."],
      ["Its trade is now balanced", "The data show a worsening, not balance."],
    ],
    answer: "A",
    explanation: "Falling export prices and rising import prices widen the development gap.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Uneven development can exist within a single country, for example between cities and rural areas.",
    answer: true,
    explanation: "True. In Zimbabwe, Harare and Bulawayo have more jobs and services than remote communal areas.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The development gap is fixed: no country has moved from low income to high income.",
    answer: false,
    explanation: "False. South Korea and Singapore, for example, moved from low to high income.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each reason for uneven development with its type.",
    pairs: [
      ["Cyclones destroy roads and crops", "Environmental"],
      ["Corruption discourages investment", "Political"],
      ["Low literacy limits skills", "Social"],
      ["Borders drawn by colonial powers", "Historical"],
    ],
    explanation: "Classify each reason by its cause.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "The value of a country's exports compared with its imports is its terms of {{blank:a}}. A country with no coastline is described as {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["trade"], choices: ["trade", "aid", "debt", "development"] },
      { id: "b", accepted: ["landlocked"], choices: ["landlocked", "isolated", "peripheral", "rural"] },
    ],
    explanation: "Terms of trade and landlocked status both affect development.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A fictional country's tractor costs US\\$42,000 and coffee sells for US\\$2,800 per tonne. How many tonnes of coffee are needed to buy one tractor?",
    value: 15, unit: "t",
    wrong: [1.5, 150],
    explanation: "42,000 ÷ 2,800 = 15 tonnes.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Divide the larger by the smaller."],
    stem: "Fictional data: Country H has a GNI per capita of US\\$61,200 and Country L of US\\$680. How many times greater is H's GNI per capita than L's?",
    value: 90,
    wrong: [60520, 0.011],
    workedSolution: "1. 61,200 ÷ 680 = 90.\n2. H's GNI per capita is 90 times L's.",
    explanation: "61,200 ÷ 680 = 90 times.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the current global pattern of HICs and LICs.",
    points: [
      "HICs are concentrated in North America, Europe, Japan/East Asia and Australasia (and some Gulf states).",
      "LICs are mostly in sub-Saharan Africa (e.g. Sahel, Central Africa).",
      "MICs in Latin America, much of Asia, North Africa / a few LICs in Asia (e.g. Afghanistan).",
    ],
    modelAnswer: "HICs are mainly in North America, Europe, Japan and Australia. Most LICs are in sub-Saharan Africa, with a few in Asia. MICs cover most of Latin America and Asia.",
    explanation: "Name regions for each group.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    hints: ["One environmental and one social reason; explain each."],
    stem: "Explain how **one** environmental and **one** social factor can slow a country's development.",
    points: [
      "Environmental factor identified (e.g. drought, cyclones, tropical disease, poor soils, landlocked).",
      "Explained: e.g. destroys crops and infrastructure / money spent on rebuilding not development.",
      "Social factor identified (e.g. low literacy, poor health, rapid population growth).",
      "Explained: e.g. low skills reduce productivity / sick workers absent / resources spread thinly.",
    ],
    modelAnswer: "Cyclones such as Idai in 2019 destroy roads, homes and crops, so money must be spent on rebuilding rather than new development. Low literacy means workers lack skills, so productivity and wages stay low and industry is not attracted.",
    explanation: "Each factor identified and explained.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Consider several types of reason, then decide which matter most."],
    stem: "'Historical factors are the main cause of the development gap.' To what extent do you agree?",
    points: [
      "Historical: colonialism, raw-material economies, export railways, borders, late industrialisation.",
      "Economic: primary product dependence, poor terms of trade, debt.",
      "Social: low literacy, poor health, rapid population growth.",
      "Environmental: hazards, tropical disease, landlocked location.",
      "Political: conflict, corruption, unstable policies.",
      "Counter-evidence: former colonies such as Singapore and South Korea / Botswana have narrowed the gap.",
      "Judgement: history matters but factors interact; present-day economic and political factors also crucial.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Colonialism shaped many African economies to export raw materials through railways leading to ports, drew borders without regard to people, and delayed industrialisation, so many countries still depend on primary exports. This links to economic causes: primary product prices are unstable and terms of trade are poor, and many countries carry heavy debts. Social factors such as low literacy and diseases like malaria and HIV reduce productivity, while environmental hazards such as droughts and cyclones destroy crops and infrastructure, and landlocked countries pay more to trade. Political factors, including conflict and corruption, discourage investment. However, history is not destiny: former colonies such as Singapore and South Korea became high-income, and Botswana used diamond revenue well. I agree only partly: historical factors explain the starting point, but present-day economic, social and political factors decide whether the gap widens or narrows.",
    explanation: "Weigh historical against other factors and judge.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows GNI per capita for two fictional countries (US\\$, fictional data).\n\n| Year | Country H | Country L |\n|---|---|---|\n| 1990 | 24,000 | 400 |\n| 2005 | 36,000 | 450 |\n| 2020 | 48,600 | 540 |",
    hints: ["Gap = H − L."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the gap in GNI per capita (US\\$) between the two countries in 1990.", value: 23600, wrong: [24400, 60], explanation: "24,000 − 400 = 23,600." }),
      P.num({ label: "(b)", stem: "Calculate the gap (US\\$) in 2020.", value: 48060, wrong: [49140, 90], explanation: "48,600 − 540 = 48,060." }),
      P.num({ label: "(c)", unit: "%", stem: "Calculate the percentage increase in Country L's GNI per capita from 1990 to 2020.", value: 35, wrong: [140, 25], explanation: "(540 − 400) ÷ 400 × 100 = 35%." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Using the data, describe what has happened to the development gap, and suggest **two** reasons why it might have widened.",
        points: ["The gap has widened (from US\\$23,600 to US\\$48,060), although L's income rose.", "Reason: L depends on primary exports with falling prices / poor terms of trade / debt.", "Reason: H invests in technology and services / L affected by conflict, hazards or disease."],
        modelAnswer: "The gap more than doubled, from US\\$23,600 to US\\$48,060, even though L's income rose by 35%. L may depend on low-value primary exports with poor terms of trade, while H invests in high-value technology and services.",
        explanation: "Use data, then explain.",
      }),
    ],
    explanation: "This item practises measuring the development gap.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 420,
    stem: "Resource: a fictional landlocked country exports copper and tobacco. Its main roads to the nearest port cross a neighbouring country and take about four days by lorry. Floods in the last rainy season washed away two bridges (fictional data).",
    hints: ["Think about cost, time and hazards."],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of export does the country depend on?",
        options: [
          ["Primary products", "Correct: copper and tobacco are raw materials."],
          ["Manufactured goods", "Neither export is manufactured."],
          ["Financial services", "No services are mentioned."],
          ["High-technology goods", "No high-technology exports are mentioned."],
        ],
        answer: "A", explanation: "Minerals and crops are primary products.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain how the factors in the resource could slow the country's development.",
        points: ["Primary exports have low value / unstable prices.", "Landlocked: long distance to port raises transport costs and makes exports less competitive.", "Dependence on a neighbour's roads, ports and policies / delays at borders.", "Floods destroy infrastructure; money diverted to repairs; trade disrupted."],
        modelAnswer: "Copper and tobacco earn little and their prices change, so income is unreliable. Being landlocked, the country pays more to move goods four days to a foreign port, so its exports are less competitive and it depends on its neighbour. Floods that wash away bridges disrupt trade and divert money to repairs.",
        explanation: "Explain each factor.",
      }),
    ],
    explanation: "This item practises explaining reasons for uneven development.",
  });

  b.card("DEFINITION", "Development gap", "The difference in wealth and well-being between the richest and poorest countries.");
  b.card("DEFINITION", "Uneven development", "Development happening faster and further in some countries and regions than in others.");
  b.card("DEFINITION", "Terms of trade", "The value of a country's exports compared with its imports.");
  b.card("VOCABULARY", "Brandt Line", "A 1980 line dividing a rich 'North' from a poor 'South'; now out of date.");
  b.card("CONCEPT", "Historical and economic reasons", "Colonialism; dependence on primary exports; poor terms of trade; debt; little manufacturing.");
  b.card("CONCEPT", "Social, environmental and political reasons", "Low literacy and poor health; hazards, tropical disease, landlocked location; conflict and corruption.");
  b.card("CONCEPT", "Cycle of poverty", "Low income → little saving and tax → poor services and infrastructure → low productivity → low income.");
  b.card("FACT", "Global pattern", "HICs: North America, Europe, Japan, Australasia. LICs: mostly sub-Saharan Africa. MICs: Latin America, much of Asia.");
  b.card("FACT", "Narrowing the gap", "South Korea and Singapore rose to high income; Botswana used diamond revenue for development.");
});
