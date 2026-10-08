// Slice G4b: sustainable development, trade, aid and debt relief (Cambridge 8.3; Cambridge only).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.development.sustainable", { file: "development/sustainable", keyPrefix: "development.sustainable" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best defines **sustainable development**?",
    options: [
      ["Meeting present needs without harming future generations' ability to meet theirs", "Correct: this is the Brundtland idea."],
      ["Increasing GDP as quickly as possible whatever the cost to the environment", "This ignores the future."],
      ["Stopping all economic growth to protect nature everywhere", "Sustainable development still allows growth."],
      ["Giving emergency food aid to countries after every drought or flood", "Emergency aid is short-term relief."],
    ],
    answer: "A",
    explanation: "Sustainable development balances social, economic and environmental needs now and in the future.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does **fair trade** guarantee to producers?",
    options: [
      ["A minimum price plus a premium", "Correct: the premium funds community projects."],
      ["Free transport to Europe", "Fair trade does not provide transport."],
      ["The highest world market price", "It guarantees a minimum, not the highest price."],
      ["Exemption from all taxes", "Fair trade has nothing to do with taxes."],
    ],
    answer: "A",
    explanation: "Producers get a guaranteed minimum price and an extra premium in return for meeting standards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is **tied aid**?",
    options: [
      ["Aid that must be spent on the donor's goods", "Correct: it benefits the donor's firms."],
      ["Aid given through the United Nations", "That is multilateral aid."],
      ["Aid given by charities", "That is voluntary (NGO) aid."],
      ["Aid given straight after a disaster", "That is emergency aid."],
    ],
    answer: "A",
    explanation: "Tied aid comes with conditions that the recipient buys from the donor.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **appropriate technology**?",
    options: [
      ["A hand pump on a village borehole", "Correct: cheap, simple and locally repairable."],
      ["A large nuclear power station", "Too costly and complex for local people to maintain."],
      ["A fully automated car factory", "Needs high skills and investment."],
      ["A satellite launch centre", "Far beyond local needs and skills."],
    ],
    answer: "A",
    explanation: "Appropriate technology suits local skills, money and needs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main **benefit** of debt relief for a LIC?",
    options: [
      ["Money is freed for health and education", "Correct: less is spent on repayments."],
      ["It always ends corruption", "Debt relief does not end corruption."],
      ["It raises world prices of exports", "Debt relief does not change world prices."],
      ["It removes the need for any taxes", "Governments still need tax revenue."],
    ],
    answer: "A",
    explanation: "Lower repayments allow more spending on services.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "How many Sustainable Development Goals did the United Nations adopt in 2015?",
    options: [
      ["17", "Correct: 17 goals with targets for 2030."],
      ["8", "There were 8 earlier Millennium Development Goals."],
      ["5", "There are more than five goals."],
      ["25", "There are fewer than 25 goals."],
    ],
    answer: "A",
    explanation: "The 17 SDGs include ending poverty, zero hunger, clean water and climate action.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Which option increases the value of exports?"],
    stem: "Which strategy would most increase a mineral-exporting country's earnings in the long term?",
    options: [
      ["Processing ores into refined metals before export", "Correct: adding value raises prices and skilled jobs."],
      ["Exporting more raw ore at the same price", "Earnings rise only while the ore lasts."],
      ["Relying on emergency food aid", "Aid does not raise export earnings."],
      ["Borrowing to pay existing debts", "This increases debt."],
    ],
    answer: "A",
    explanation: "Value-added processing improves terms of trade and creates jobs.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Which aid builds local capacity?"],
    stem: "Which type of aid is usually the most **sustainable**?",
    options: [
      ["Small bottom-up projects run with local communities", "Correct: they meet local needs and are maintained locally."],
      ["Large top-down projects designed by donors", "They may not meet local needs or be maintained."],
      ["Tied aid spent on donor goods", "This benefits the donor more."],
      ["Long periods of free food aid", "This can undercut local farmers and create dependency."],
    ],
    answer: "A",
    explanation: "Local involvement and appropriate technology make projects last.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Emergency aid is short-term help such as food, shelter and medicine after a disaster.",
    answer: true,
    explanation: "True. Long-term development aid aims at permanent improvements.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Food aid always helps local farmers by raising the price of their crops.",
    answer: false,
    explanation: "False. Large amounts of free food can lower local prices and hurt farmers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of aid with its description.",
    pairs: [
      ["Bilateral", "From one government to another"],
      ["Multilateral", "Through international organisations"],
      ["Voluntary (NGO)", "From charities funded by donations"],
      ["Emergency", "Short-term relief after a disaster"],
    ],
    explanation: "Aid is classified by who gives it and how long it lasts.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Zimbabwe's conservation agriculture programme is called {{blank:a}}. Zimbabwe's Vision 2030 aims for an upper-{{blank:b}}-income society.",
    blanks: [
      { id: "a", accepted: ["Pfumvudza"], choices: ["Pfumvudza", "CAMPFIRE", "Brundtland", "HIPC"] },
      { id: "b", accepted: ["middle"], choices: ["middle", "high", "low", "fair"] },
    ],
    explanation: "Pfumvudza/Intwasa promotes conservation farming; Vision 2030 targets upper-middle income.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%", daily: true,
    stem: "A fictional LIC earns US\\$3,200 million a year and spends US\\$640 million on debt repayments. What percentage of its revenue goes on debt?",
    value: 20, tol: 0.05,
    wrong: [5, 64],
    explanation: "640 ÷ 3,200 × 100 = 20%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Premium per tonne × tonnes."],
    stem: "A fictional fair trade cooperative sells 180 tonnes of coffee and receives a premium of US\\$200 per tonne for community projects. Calculate the total premium in US\\$.",
    value: 36000, prefix: "US$",
    wrong: [380, 3600],
    workedSolution: "1. Premium = 180 × 200.\n2. = US\\$36,000.",
    explanation: "180 × 200 = US\\$36,000.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **one** social, **one** economic and **one** environmental strategy for sustainable development.",
    points: [
      "Social: e.g. free primary education / community health workers / clean water and sanitation.",
      "Economic: e.g. diversifying the economy / adding value to raw materials / microfinance / skills training.",
      "Environmental: e.g. conservation farming / renewable energy / reforestation / protected areas / recycling.",
    ],
    modelAnswer: "Social: training community health workers. Economic: processing minerals locally before export. Environmental: conservation farming with mulching and minimum tillage.",
    explanation: "One strategy per pillar.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    hints: ["Who benefits, and how much of world trade is fair trade?"],
    stem: "Explain **two** advantages and **two** limitations of fair trade for producers in LICs.",
    points: [
      "Advantage: guaranteed minimum price protects against falling world prices.",
      "Advantage: premium funds schools, clinics or wells / better working conditions.",
      "Limitation: only a small share of world trade / few producers benefit.",
      "Limitation: certification costs / products cost more so demand is limited.",
    ],
    modelAnswer: "Fair trade guarantees a minimum price, so farmers are protected when world prices fall, and the premium pays for community projects such as wells. However, it is a small share of world trade, so few producers benefit, and certification is costly.",
    explanation: "Two of each.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Weigh benefits and problems of each, then decide."],
    stem: "Evaluate trade, aid and debt relief as ways of reducing uneven development.",
    points: [
      "Trade: earns most; adding value / trade blocs raise income; but raw-material exports have low unstable prices and poor terms of trade.",
      "Fair trade: minimum price and premium, but small scale.",
      "Aid: emergency aid saves lives; long-term aid funds health, education, water.",
      "Aid problems: dependency, tied aid, top-down projects, corruption, undercutting farmers.",
      "Debt relief (HIPC): frees money for services.",
      "Debt relief problems: conditions, risk of new borrowing, needs good governance.",
      "Judgement: trade with added value is most sustainable; aid and debt relief help when targeted and combined.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Trade can earn far more than aid, especially when countries process raw materials before exporting them or join trade blocs that open bigger markets. However, exporting raw materials earns low and unstable prices, so the terms of trade often work against LICs. Fair trade guarantees a minimum price and premium, but only for a small share of trade. Aid saves lives in emergencies, such as after Cyclone Idai, and long-term projects fund clinics, schools and wells; but it can create dependency, tied aid benefits donors, and large top-down projects may fail. Debt relief under the HIPC initiative freed money for health and education in many African countries, but it came with conditions and needs good governance. Overall, trade that adds value is the most sustainable way to reduce uneven development, while well-targeted, bottom-up aid and debt relief are useful supports rather than solutions on their own.",
    explanation: "All three, two-sided, with a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows a fictional LIC government's annual spending (US\\$ million, fictional data).\n\n| Item | Before debt relief | After debt relief |\n|---|---|---|\n| Debt repayments | 600 | 300 |\n| Health | 350 | 500 |\n| Education | 450 | 560 |\n| Other | 1,400 | 1,440 |",
    hints: ["Total revenue is the same in both columns."],
    parts: [
      P.num({ label: "(a)", stem: "Calculate the total spending before debt relief (US\\$ million).", value: 2800, wrong: [2500, 1400], explanation: "600 + 350 + 450 + 1,400 = 2,800." }),
      P.num({ label: "(b)", unit: "%", stem: "Calculate the percentage increase in health spending after debt relief. Give your answer to one decimal place.", value: (150 / 350) * 100, answer: "42.9", tol: 0.05, wrong: [150, 30], explanation: "(500 − 350) ÷ 350 × 100 = 42.9%." }),
      P.manual({
        label: "(c)", marks: 2, stem: "Describe how the money saved on debt repayments was used.",
        points: ["Debt repayments fell by US\\$300 million.", "Most went to health (+150) and education (+110), with 40 to other items."],
        modelAnswer: "Repayments fell by US\\$300 million; health rose by 150 million, education by 110 million and other spending by 40 million.",
        explanation: "Quote the changes.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** reasons why debt relief might not reduce poverty as much as these figures suggest.",
        points: ["Money may be lost to corruption or poor management.", "Conditions attached (e.g. spending cuts, reforms) may hurt the poor.", "The country may borrow again / benefits reach towns more than rural areas / other causes of poverty remain."],
        modelAnswer: "Some money may be lost to corruption, the conditions attached may force cuts elsewhere, and the country may simply borrow again.",
        explanation: "Three limitations.",
      }),
    ],
    explanation: "This item practises evaluating debt relief with data.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 480,
    stem: "Resource: in a fictional dry rural district, an aid charity worked with villagers to drill boreholes fitted with hand pumps, trained a local committee to repair them, and taught farmers to dig planting holes and use mulch.",
    hints: ["Who controls and maintains the project?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which term best describes this kind of project?",
        options: [
          ["Bottom-up development", "Correct: local people are involved and in control."],
          ["Top-down development", "It was not imposed by a distant authority."],
          ["Tied aid", "No condition to buy donor goods is mentioned."],
          ["Emergency aid", "It is long-term, not disaster relief."],
        ],
        answer: "A", explanation: "Community involvement makes it bottom-up.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why this project is likely to be sustainable.",
        points: ["Hand pumps are appropriate technology: cheap and simple.", "A trained local committee can repair them, so no reliance on outsiders.", "Villagers involved from the start, so the project meets their needs.", "Planting holes and mulch conserve soil and water, raising yields in drought."],
        modelAnswer: "Hand pumps are cheap and simple, and a trained local committee can repair them. Villagers helped plan the project so it meets their needs, and conservation farming keeps soil moisture, so yields rise even in dry years.",
        explanation: "Link features to sustainability.",
      }),
    ],
    explanation: "This item practises judging aid projects.",
  });

  b.card("DEFINITION", "Sustainable development", "Development that meets present needs without reducing future generations' ability to meet theirs (Brundtland Report, 1987).");
  b.card("DEFINITION", "Fair trade", "Producers get a guaranteed minimum price plus a premium for community projects, in return for meeting standards.");
  b.card("DEFINITION", "Debt relief", "Cancelling or reducing a poor country's debts or the interest on them, e.g. under the HIPC initiative (from 1996).");
  b.card("VOCABULARY", "Types of aid", "Emergency vs long-term; bilateral, multilateral, voluntary (NGO); tied aid.");
  b.card("VOCABULARY", "Appropriate technology", "Simple, affordable technology local people can use and repair, e.g. hand pumps, solar lanterns.");
  b.card("CONCEPT", "Problems of aid", "Dependency, tied aid, top-down projects, corruption, food aid undercutting farmers.");
  b.card("CONCEPT", "Three pillars", "Social (education, health), economic (lasting jobs, value added), environmental (conservation, renewables).");
  b.card("FACT", "Sustainable Development Goals", "17 UN goals adopted in 2015 with targets for 2030.");
  b.card("FACT", "Zimbabwe's strategies", "Vision 2030 (upper-middle income), NDS1 (2021-2025), mineral beneficiation, Pfumvudza conservation farming, tourism.");
});
