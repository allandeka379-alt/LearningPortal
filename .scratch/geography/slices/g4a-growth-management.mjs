// Slice G4a: the growth and management of tourism (Cambridge 9.3). Cambridge-only concept.
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.tourism.growth-management", { file: "tourism/growth-management", keyPrefix: "tourism.growth-management" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is the **first** stage of the Butler model of resort development?",
    options: [
      ["Exploration", "Correct: a few adventurous visitors arrive and there are no special facilities."],
      ["Development", "Development is the third stage, when outside investment arrives."],
      ["Consolidation", "Consolidation is the fourth stage, when growth slows."],
      ["Stagnation", "Stagnation comes after consolidation, when capacity is reached."],
    ],
    answer: "A",
    explanation: "Exploration → involvement → development → consolidation → stagnation → decline or rejuvenation.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **ecotourism**?",
    options: [
      ["Small-scale nature tourism that conserves the environment and benefits local people", "Correct: all three features are needed."],
      ["Any holiday at all that includes a game drive, a boat trip or a visit to a national park", "A crowded park holiday with large hotels is not ecotourism."],
      ["Cheap package holidays to large beach resorts with hotels", "That is mass tourism."],
      ["Business travel to attend international conferences", "That is business tourism."],
    ],
    answer: "A",
    explanation: "Ecotourism is small scale, conserves the environment, benefits local people and educates visitors.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which change has done most to make international travel cheaper for ordinary people?",
    options: [
      ["Jet aircraft and low-cost airlines", "Correct: cheaper, faster flights opened distant destinations to many more people."],
      ["Longer working hours in high-income countries", "Longer hours would reduce leisure time, not travel costs."],
      ["Higher taxes on aviation fuel", "Higher fuel taxes would make flights more expensive."],
      ["Fewer hotels in popular destinations", "Fewer hotels would push prices up."],
    ],
    answer: "A",
    explanation: "Cheaper air transport is a major cause of tourism growth.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **leakage** in tourism?",
    options: [
      ["Tourist spending that leaves the host country, for example to foreign-owned hotels", "Correct: leakage reduces the benefit kept by the host country."],
      ["Water lost from hotel swimming pools by evaporation", "This is not the economic meaning of leakage."],
      ["Tourists leaving a resort before their holiday ends", "This is not leakage."],
      ["Local hotel and lodge workers moving abroad to work in tourist resorts in other countries", "This is emigration, not leakage."],
    ],
    answer: "A",
    explanation: "Leakage is money from tourism that flows out of the destination country.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In which Butler stage do outside companies build large hotels and visitor numbers rise rapidly?",
    options: [
      ["Development", "Correct: outside investment and marketing bring rapid growth."],
      ["Exploration", "Exploration has only a few visitors and no special facilities."],
      ["Involvement", "In involvement, local people provide simple services and growth is slow."],
      ["Decline", "In decline, visitor numbers fall."],
    ],
    answer: "A",
    explanation: "The development stage has the steepest growth and the loss of local control.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Look at what is happening to visitor numbers and why.", "Which stage follows stagnation when new attractions are added?"],
    stem: "A resort's visitor numbers stopped growing for ten years. A new marina and conference centre were then built and numbers began rising again. Which Butler stage has the resort entered?",
    options: [
      ["Rejuvenation", "Correct: new attractions revive a stagnating resort."],
      ["Exploration", "Exploration is the very first stage, with almost no facilities."],
      ["Consolidation", "Consolidation comes before stagnation, while growth is slowing."],
      ["Decline", "In decline, numbers fall; here they are rising."],
    ],
    answer: "A",
    explanation: "After stagnation a resort may decline or be rejuvenated by investment.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    hints: ["Which strategy keeps the income in the community?"],
    stem: "Which strategy would most reduce leakage from tourism in a rural area of an LIC?",
    options: [
      ["Community-owned lodges using local guides, food and crafts", "Correct: local ownership and supplies keep spending in the area."],
      ["An all-inclusive resort owned by a foreign hotel chain", "All-inclusive foreign resorts increase leakage."],
      ["Importing food for hotels from overseas suppliers", "Imported supplies increase leakage."],
      ["Selling holidays only through foreign tour operators", "Foreign operators keep a large share of the price."],
    ],
    answer: "A",
    explanation: "Local ownership and local supply chains are the main ways to reduce leakage.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["Think about events outside the resort's control."],
    stem: "Which is a **limitation** of the Butler model?",
    options: [
      ["It does not allow for sudden shocks such as pandemics or political crises", "Correct: real resorts can lose visitors suddenly for outside reasons."],
      ["It suggests that tourism growth may not continue for ever, so resorts must plan ahead", "This is a strength: it warns planners."],
      ["It is simple and can be applied to many resorts", "Simplicity is a strength."],
      ["It encourages planners to act before stagnation", "This is a strength."],
    ],
    answer: "A",
    explanation: "The model assumes gradual change and cannot predict shocks or timing.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Rising disposable incomes have helped tourism to grow.",
    answer: true,
    explanation: "True. People with more money left after essentials spend more on travel.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In the Butler model, every resort must eventually decline.",
    answer: false,
    explanation: "False. After stagnation a resort may decline, be rejuvenated or stay roughly stable.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tourism impact with the scale at which it mainly operates.",
    pairs: [
      ["Litter on a footpath near a waterfall", "Local"],
      ["Foreign currency earned by the whole country", "National"],
      ["Carbon dioxide emissions from long-haul flights", "Global"],
    ],
    explanation: "Some impacts affect a place, others a country, others the whole planet.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "The largest number of visitors a place can take without damage is its {{blank:a}} capacity. Large numbers of tourists visiting the same places on package holidays is called {{blank:b}} tourism.",
    blanks: [
      { id: "a", accepted: ["carrying"], choices: ["carrying", "holding", "visitor", "tourist"] },
      { id: "b", accepted: ["mass"], choices: ["mass", "eco", "sustainable", "adventure"] },
    ],
    explanation: "Carrying capacity and mass tourism are key terms in tourism management.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A fictional resort had 240,000 visitors in Year 1 and 312,000 in Year 2 (fictional data). Calculate the percentage increase.",
    value: 30,
    tol: 0.05,
    wrong: [23.1, 72],
    explanation: "Increase = 72,000; 72,000 ÷ 240,000 × 100 = 30%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    hints: ["Find the amount that leaks out first.", "Subtract it from the total."],
    stem: "Tourists spend US\\$85 million in a fictional LIC in a year. 60% of this leaks out of the country (fictional data). How much, in US\\$ million, stays in the country?",
    value: 34,
    tol: 0.05,
    wrong: [51, 25],
    workedSolution: "1. Leakage = 60% of 85 = 0.6 × 85 = 51.\n2. Retained = 85 − 51 = US\\$34 million.",
    explanation: "40% of 85 = 34, so US\\$34 million stays in the country.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the Butler stage that comes straight after consolidation.",
    accepted: ["stagnation", "the stagnation stage", "stagnation stage"],
    wrong: ["decline"],
    explanation: "Consolidation is followed by stagnation, when carrying capacity is reached.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons for the growth of tourism as an industry.",
    points: [
      "Rising incomes / more disposable income.",
      "Development: people can afford holidays and travel abroad after paying for essentials.",
      "Cheaper, faster transport / internet booking / more leisure time / package holidays (any one).",
      "Development: e.g. low-cost airlines make distant places affordable / online booking and reviews make travel easier / paid holidays give time to travel.",
    ],
    modelAnswer: "As incomes have risen, people have more money left after essentials, so they can afford holidays. Air travel has become cheaper and faster, with low-cost airlines making distant countries reachable for ordinary families.",
    explanation: "Each reason needs a statement and an explanation.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    hints: ["Think about each scale: local, national, global."],
    stem: "Describe the problems that tourism can cause at **local** and **national** scales.",
    points: [
      "Local: litter, noise, congestion, erosion of paths or damage to habitats.",
      "Local: seasonal, low-paid jobs / higher land and food prices / loss of traditional culture or crime.",
      "National: leakage of profits to foreign companies.",
      "National: over-dependence on tourism, so the economy suffers when visitor numbers fall.",
    ],
    modelAnswer: "Locally, tourists cause litter, congestion and erosion of paths, and jobs are often seasonal and low paid while prices of land and food rise. Nationally, much of the money leaks out to foreign hotel chains and tour companies, and countries that depend on tourism suffer badly when visitors stop coming.",
    explanation: "Two problems at each scale.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows visitor numbers at a fictional coastal resort (thousands, fictional data).\n\n| Year | 1972 | 1982 | 1992 | 2002 | 2012 | 2022 |\n|---|---|---|---|---|---|---|\n| Visitors (thousands) | 5 | 20 | 140 | 260 | 270 | 210 |",
    hints: ["Look at how fast numbers change between each pair of years."],
    parts: [
      P.num({ label: "(a)", stem: "By how many thousand did visitor numbers increase between 1982 and 1992?", value: 120, wrong: [160, 7], explanation: "140 − 20 = 120 thousand." }),
      P.mcq({
        label: "(b)", stem: "Which Butler stage best describes 2002 to 2012?",
        options: [
          ["Stagnation", "Correct: numbers barely changed (260 to 270)."],
          ["Exploration", "Exploration has only a handful of visitors, as in 1972."],
          ["Development", "Development is rapid growth, as between 1982 and 1992."],
          ["Rejuvenation", "Rejuvenation would show a renewed rise."],
        ],
        answer: "A", explanation: "Very little change after rapid growth indicates stagnation.",
      }),
      P.num({ label: "(c)", unit: "%", stem: "Calculate the percentage decrease in visitors from 2012 to 2022. Give your answer to one decimal place.", value: 22.2222, answer: "22.2", tol: 0.05, wrong: [28.6, 60], explanation: "Fall = 60; 60 ÷ 270 × 100 = 22.2%." }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** strategies the resort could use to rejuvenate.",
        points: ["Build new attractions (e.g. a conference centre, marina, cultural or adventure activities).", "Upgrade old hotels and clean up beaches and streets.", "Target new markets / market the resort online / attract off-season visitors."],
        modelAnswer: "The resort could add new attractions such as a conference centre, refurbish its ageing hotels and beachfront, and advertise online to new groups of tourists and in the off-season.",
        explanation: "Rejuvenation needs investment and new markets.",
      }),
    ],
    explanation: "This item practises applying the Butler model to data.",
  });
  b.struct({
    d: 3, skill: "EVALUATION", secs: 480,
    stem: "A fictional national park in an LIC receives 90,000 visitors a year. Paths near its waterfall are eroded and litter is a problem. Most visitors stay in a large hotel owned by a foreign company. Three management strategies are proposed:\n\n- **Strategy 1:** raise the entry fee and limit daily visitor numbers.\n- **Strategy 2:** support villages to open small, community-owned lodges.\n- **Strategy 3:** build a second large hotel inside the park.",
    hints: ["Which strategies make tourism more sustainable?"],
    parts: [
      P.mcq({
        label: "(a)", stem: "Which strategy would be **least** sustainable?",
        options: [
          ["Strategy 3", "Correct: a large hotel inside the park adds visitors and damage, and more leakage."],
          ["Strategy 1", "Limits and fees reduce pressure and raise conservation funds."],
          ["Strategy 2", "Community lodges keep income local and are small scale."],
          ["Strategies 1 and 2 equally", "Both of these are sustainable strategies."],
        ],
        answer: "A", explanation: "Building more mass-tourism capacity inside the park is unsustainable.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Evaluate Strategies 1 and 2 for managing the park sustainably.",
        points: ["Strategy 1 keeps numbers within carrying capacity, reducing erosion and litter.", "But higher fees may exclude poorer and local visitors / reduce total income.", "Strategy 2 keeps income in local villages and reduces leakage, giving people a reason to protect the park.", "But lodges need training and capital, and serve few visitors; judgement on which is better or that both are needed."],
        modelAnswer: "Strategy 1 would cut erosion and litter by keeping visitor numbers within carrying capacity, and fees fund path repair, but higher prices could exclude local visitors. Strategy 2 would keep tourist spending in the villages and give people a reason to protect the park, but villages need money and training to start lodges. Using both together would be most effective.",
        explanation: "Evaluate means strengths, weaknesses and a judgement.",
      }),
    ],
    explanation: "This item practises evaluating sustainable tourism strategies.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    hints: ["Use a detailed specific example.", "Cover growth, impacts and management, then judge."],
    stem: "For a named country or area, describe the growth of tourism and evaluate how successfully it has been managed.",
    points: [
      "Names a country or area (e.g. Victoria Falls, Zambia-Zimbabwe border).",
      "Growth: e.g. railway and bridge in 1905, World Heritage status (1989), adventure tourism in the 1990s.",
      "Fluctuation/rejuvenation: fall during the 2000s crisis, recovery helped by the 2013 UNWTO General Assembly, KAZA visa and airport upgrade.",
      "Benefits: jobs, foreign currency, infrastructure.",
      "Problems: pressure on the rainforest and paths, litter, competition for land and water, leakage.",
      "Management: park fees, marked paths, World Heritage building limits, community projects; their strengths and limits.",
      "Judgement on overall success with reason.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Tourism at Victoria Falls grew after the railway and the Victoria Falls Bridge reached the falls in 1905. The site became a World Heritage Site in 1989, and in the 1990s bungee jumping and white-water rafting brought rapid growth. Visitor numbers on the Zimbabwean side fell during the economic crisis of the 2000s, but recovered after 2009, helped by the UNWTO General Assembly hosted with Zambia in 2013, the KAZA visa and an upgraded airport. Tourism provides jobs in lodges, rafting and craft markets and earns foreign currency, but the rainforest paths suffer heavy use, litter increases and much income leaks to foreign operators. Management includes park entry fees, marked paths and World Heritage rules limiting building near the falls, with some community projects sharing income. These measures have protected the falls themselves fairly well, but leakage and pressure on the surrounding area remain, so management has been only partly successful.",
    explanation: "Combine growth, impacts and management in a detailed specific example and judge.",
  });

  b.card("DEFINITION", "Sustainable tourism", "Tourism that meets the needs of today's tourists and host communities while protecting environment and culture for the future.");
  b.card("DEFINITION", "Ecotourism", "Small-scale nature tourism that conserves the environment, benefits local people and educates visitors.");
  b.card("DEFINITION", "Carrying capacity", "The largest number of visitors a place can take before its environment, facilities or visitor experience are damaged.");
  b.card("VOCABULARY", "Leakage (tourism)", "Tourist spending that leaves the host country, for example to foreign hotel chains, airlines and tour operators.");
  b.card("CONCEPT", "Butler model stages", "Exploration, involvement, development, consolidation, stagnation, then decline, rejuvenation or stability.");
  b.card("CONCEPT", "Limitations of the Butler model", "Not all resorts follow every stage; stages are hard to identify at the time; cannot predict timing; ignores sudden shocks.");
  b.card("CONCEPT", "Causes of tourism growth", "Rising incomes, more leisure time, cheaper air travel, internet booking, package holidays, marketing and media.");
  b.card("CONCEPT", "Sustainable tourism strategies", "Visitor limits and fees, zoning, ecotourism lodges, community-based tourism, visitor education, spreading visitors.");
  b.card("FACT", "Victoria Falls tourism", "World Heritage Site since 1989; adventure tourism from the 1990s; decline in the 2000s then rejuvenation (2013 UNWTO General Assembly, KAZA visa).");
});
