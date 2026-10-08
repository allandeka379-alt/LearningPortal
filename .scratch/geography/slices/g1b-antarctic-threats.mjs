// Slice G1b: ecosystems — threats to Antarctica and its management (Cambridge 3.2).
import { concept, P, geographyLevels } from "../lib.mjs";

const TOUR =
  "Table 1: visitors landing at a fictional Antarctic Peninsula site each summer season (fictional data).\n\n| Season | 1 | 2 | 3 | 4 | 5 |\n| --- | --- | --- | --- | --- | --- |\n| Visitors | 38,000 | 44,000 | 51,000 | 56,000 | 63,000 |";

concept("geo.ecosystems.antarctic-threats", { file: "ecosystems/antarctic-threats", keyPrefix: "ecosystems.antarctic-threats" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was the Antarctic Treaty signed?",
    options: [
      ["1959", "Correct: signed by 12 countries; in force from 1961."],
      ["1991", "1991 is the year of the Protocol on Environmental Protection."],
      ["1971", "1971 is the year of the Ramsar Convention on wetlands."],
      ["2002", "2002 is when much of the Larsen B ice shelf collapsed."],
    ],
    answer: "A",
    explanation: "The Antarctic Treaty was signed in 1959 and came into force in 1961. It reserves Antarctica for peace and science.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "What does the Protocol on Environmental Protection (1991) do about mining in Antarctica?",
    options: [
      ["It bans mineral resource activities except scientific research", "Correct: mining is prohibited."],
      ["It allows mining if a country pays a tax", "There is no mining tax; mining is banned."],
      ["It allows only coal and oil to be extracted", "No minerals, oil or gas may be extracted commercially."],
      ["It gives each claimant country its own mining zone", "Territorial claims are on hold and mining is banned."],
    ],
    answer: "A",
    explanation: "The Protocol designates Antarctica as a natural reserve and bans all mineral resource activities other than scientific research.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why could large-scale krill fishing threaten the whole Antarctic ecosystem?",
    options: [
      ["Many whales, seals and penguins depend on krill for food", "Correct: krill is the keystone species."],
      ["Krill produce most of the oxygen in the Southern Ocean", "Phytoplankton photosynthesise; krill are consumers."],
      ["Krill fishing boats break up the ice sheet", "Fishing boats do not affect the land ice sheet."],
      ["Krill are the top predators of the food web", "Krill are primary consumers near the base of the web."],
    ],
    answer: "A",
    explanation: "Krill link the producers to almost every larger animal. Removing too many leaves less food for whales, seals, penguins, fish and seabirds.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a likely impact of tourism at a penguin colony?",
    options: [
      ["Disturbance of breeding birds, lowering breeding success", "Correct: noise and approaching people stress the birds."],
      ["A large increase in the krill swarms around the colony", "Tourists do not increase krill numbers."],
      ["Faster growth of the ice sheet nearby", "Visitors do not make ice sheets grow."],
      ["A rise in the winter air temperatures at the colony", "Tourism does not raise local temperatures."],
    ],
    answer: "A",
    explanation: "People approaching too closely can disturb breeding penguins; tourists can also trample mosses and bring in seeds or microbes.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why is climate change the threat that the Antarctic Treaty system is **least** able to control?",
    options: [
      ["Its causes are greenhouse gas emissions from around the world", "Correct: the Treaty controls activities in Antarctica only."],
      ["The Treaty allows unlimited use of fossil fuels in Antarctica", "The Protocol limits fuel use and requires EIA."],
      ["Scientists in Antarctica cause most global emissions", "Antarctic stations produce a tiny share of global emissions."],
      ["Climate change affects only the Arctic, not Antarctica", "The Antarctic Peninsula has warmed markedly."],
    ],
    answer: "A",
    hints: ["Where do most greenhouse gases come from?"],
    explanation: "The Treaty and Protocol regulate what happens in Antarctica. Warming is caused by emissions elsewhere, so it needs global climate agreements.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Before a country builds a new research station, the Protocol requires it to:",
    options: [
      ["carry out an environmental impact assessment", "Correct: effects must be predicted and reduced first."],
      ["buy the land from the nearest claimant country", "Claims are on hold; land cannot be bought."],
      ["build a military base to protect the station", "Military activity is banned under the Treaty."],
      ["remove a nearby penguin colony to make space", "Wildlife must be protected, not removed."],
    ],
    answer: "A",
    hints: ["Which rule applies to all activities under the Protocol?"],
    explanation: "Under the Protocol, all activities, including building stations, need an environmental impact assessment before they go ahead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does pollution damage in Antarctica take a very long time to recover?",
    options: [
      ["Cold temperatures slow decomposition and plant growth", "Correct: spills break down slowly and mosses regrow slowly."],
      ["Strong sunlight breaks pollutants down very quickly", "Quick breakdown would speed recovery, not slow it."],
      ["Heavy rainfall washes pollution into the soil", "Precipitation is very low."],
      ["Large forests absorb all the pollutants", "Antarctica has no forests."],
    ],
    answer: "A",
    explanation: "In extreme cold, bacteria break down oil and waste very slowly, and mosses and lichens grow very slowly, so damage can last for decades.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under the Antarctic Treaty, military bases may be built in Antarctica.",
    answer: false,
    explanation: "False. The Treaty reserves Antarctica for peaceful purposes; military bases and weapons testing are banned (military people and equipment may only support science).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Melting of land ice in Antarctica contributes to rising global sea level.",
    answer: true,
    explanation: "True. Ice on land that melts or flows into the sea adds water to the oceans. Melting of floating sea ice does not raise sea level much.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Visitors landing at a fictional site on an Antarctic island over four summer seasons were 21,500, 24,300, 26,800 and 29,400 (fictional data). Calculate the mean number of visitors per season.",
    value: 25500,
    wrong: [102000, 25550],
    explanation: "Total = 102,000; mean = $102\\,000 \\div 4 = 25\\,500$ visitors.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Ship-borne tourists visiting a fictional part of the Antarctic Peninsula rose from 47,000 in one season to 71,000 six seasons later (fictional data). Calculate the percentage increase. Give your answer to the nearest whole number.",
    value: 51, tol: 0.5, unit: "%", answer: "51",
    wrong: [24000, 34],
    hints: ["Increase = later figure − earlier figure.", "Divide by the earlier figure and multiply by 100."],
    workedSolution: "1. Increase = 71,000 − 47,000 = 24,000.\n2. Percentage increase = $\\dfrac{24\\,000}{47\\,000} \\times 100 = 51.1\\%$.\n3. To the nearest whole number: 51%.",
    explanation: "$24\\,000 \\div 47\\,000 \\times 100 = 51.1$, so about 51%.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each management measure to what it does.",
    pairs: [
      ["Antarctic Treaty", "reserves Antarctica for peace and science"],
      ["Environmental Protocol", "bans mining and requires environmental impact assessment"],
      ["Fishing conservation agreement (CCAMLR)", "sets catch limits for krill and toothfish"],
      ["Tourism guidelines", "limit numbers ashore and keep visitors away from wildlife"],
    ],
    explanation: "Each part of the Antarctic Treaty system deals with a different set of activities.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Part of the Larsen {{blank:a}} ice shelf on the Antarctic {{blank:b}} collapsed in 2002, a sign of regional warming.",
    blanks: [
      { id: "a", accepted: ["B"], wrong: "Z" },
      { id: "b", accepted: ["Peninsula"], wrong: "Plateau" },
    ],
    explanation: "Much of the Larsen B ice shelf on the Antarctic Peninsula broke up in 2002; the Peninsula has warmed markedly in recent decades.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe **three** ways in which tourists can damage the Antarctic environment.",
    points: [
      "Disturbing breeding penguins or seals",
      "Trampling slow-growing mosses and lichens",
      "Introducing non-native seeds or microbes / fuel spills from ships / leaving waste",
    ],
    modelAnswer: "Tourists may go too close to penguin colonies and disturb breeding birds, trample mosses that take decades to recover, and bring in seeds on their clothing that could spread.",
    explanation: "Each point must be a different type of damage.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Evaluate tourism guidelines as a way of protecting Antarctica.",
    points: [
      "Strength: limits on numbers ashore / distances from wildlife reduce disturbance",
      "Strength: boot and clothing cleaning reduces the risk of invasive species",
      "Limitation: they are voluntary / self-regulated, and tourist numbers keep growing",
      "Judgement on overall effectiveness",
    ],
    hints: ["Give strengths, a limitation and a judgement."],
    modelAnswer: "Guidelines limit how many people land at once and how close they go to animals, which reduces disturbance, and cleaning boots stops seeds being brought in. However, they are voluntary, and visitor numbers keep rising. They work well for now but may need legal limits if numbers continue to grow.",
    explanation: "Evaluation weighs strengths and limitations and reaches a judgement.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: TOUR,
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "Calculate the increase in visitors between season 3 and season 5.",
        value: 12000,
        explanation: "$63\\,000 - 51\\,000 = 12\\,000$ visitors.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Describe the trend shown in Table 1.",
        points: [
          "Visitor numbers increased every season",
          "Uses figures, e.g. from 38,000 in season 1 to 63,000 in season 5",
        ],
        modelAnswer: "The number of visitors rose every season, from 38,000 in season 1 to 63,000 in season 5.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Suggest **three** rules that could reduce the impact of these visitors.",
        points: [
          "A limit on the number of people ashore at one time / ships above a certain size not allowed to land passengers",
          "A minimum distance from wildlife / no visits during the most sensitive breeding period",
          "Cleaning boots and clothing / staying on marked paths / taking all waste away",
        ],
        modelAnswer: "Only a limited number of people should be ashore at once; visitors must keep a set distance from penguins; and boots must be cleaned before and after landing.",
      }),
    ],
    hints: ["Subtract the season 3 figure from the season 5 figure."],
    explanation: "Growing visitor numbers increase pressure on landing sites, which guidelines try to manage.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 600,
    stem: "Read the fictional fisheries report.\n\n*In one area of the Southern Ocean the krill catch limit is 620,000 tonnes a year. Fishing fleets now concentrate near the coast of the Antarctic Peninsula, close to penguin colonies, in the same months that the penguins feed their chicks. Some vessels have been seen fishing without reporting their catch.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which organisation sets catch limits for krill in the Southern Ocean?",
        options: [
          ["CCAMLR, the Antarctic marine resources commission", "Correct: the Commission for the Conservation of Antarctic Marine Living Resources manages fishing on an ecosystem basis."],
          ["The Ramsar Convention on wetlands of importance", "Ramsar deals with wetlands, not ocean fisheries."],
          ["The World Health Organization", "WHO deals with health, not fishing."],
          ["The national park service of the Peninsula", "There is no national government or park service in Antarctica."],
        ],
        answer: "A",
        explanation: "CCAMLR, part of the Antarctic Treaty system, sets catch limits for krill and toothfish.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Explain why fishing near penguin colonies at chick-rearing time is a concern, even if the total catch is below the limit.",
        points: [
          "Penguins need large amounts of krill close to their colonies to feed chicks",
          "Local concentration of fishing can deplete krill where and when penguins need it, lowering chick survival",
        ],
        modelAnswer: "Penguins feeding chicks can only travel a limited distance, so if fleets take krill close to the colonies at that time, local food runs short and fewer chicks survive, even if the total catch is within the limit.",
      }),
      P.manual({
        label: "(c)",
        marks: 3,
        stem: "Suggest how the problem of unreported fishing could be reduced.",
        points: [
          "Observers on board fishing vessels / satellite tracking of vessels",
          "Inspections at sea or in ports / refusing to let unreported catches be landed or sold",
          "Penalties for vessels or countries that break the rules / international cooperation",
        ],
        modelAnswer: "All vessels could carry observers and satellite trackers, ports could refuse to land catches without proper records, and countries could fine or ban vessels caught fishing illegally.",
      }),
    ],
    hints: ["Think about where and when penguins feed."],
    explanation: "Fishing management must consider not only total catch but also where and when it is taken, and how it is enforced.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "Evaluate how successful international agreements have been in protecting Antarctica.",
    points: [
      "The Antarctic Treaty (1959) has kept Antarctica peaceful and for science; claims are on hold",
      "The Environmental Protocol (1991) bans mining and requires EIA; no commercial mining has taken place",
      "Fishing agreements (CCAMLR) set catch limits and marine protected areas (e.g. Ross Sea)",
      "Whaling moratorium: some whale populations recovering",
      "Limitations: illegal fishing hard to police; decisions by consensus are slow",
      "Climate change is outside the Treaty's control; Peninsula warming, ice-shelf collapse",
      "Judgement: highly successful for local activities, but cannot protect against global threats alone",
    ],
    levels: geographyLevels(7),
    hints: ["Separate local threats from global ones."],
    wordLimit: { max: 400 },
    modelAnswer: "International agreements have been very successful at controlling activities in Antarctica. The Antarctic Treaty of 1959 has kept the continent peaceful and devoted to science for over sixty years, with territorial claims on hold. The 1991 Environmental Protocol bans mining and requires an environmental impact assessment for every activity, so no commercial mining has happened. CCAMLR sets catch limits for krill and toothfish and has created large marine protected areas such as in the Ross Sea, and the whaling moratorium has allowed some whale populations to recover. However, illegal fishing is hard to police across a vast ocean, and decisions need consensus, so they can be slow. Most importantly, the agreements cannot stop climate change, which is warming the Peninsula and causing ice shelves such as Larsen B to collapse. Overall they are a strong success for local threats, but global action on emissions is also needed.",
    explanation: "A strong answer names the agreements, gives evidence of success and limitations, and distinguishes local from global threats in its judgement.",
  });
  b.card("FACT", "Antarctic Treaty", "Signed 1959 (in force 1961) by 12 countries; reserves Antarctica for peace and science; territorial claims on hold.");
  b.card("FACT", "Protocol on Environmental Protection", "Signed 1991 in Madrid (in force 1998): Antarctica a natural reserve; mining banned; EIA required for all activities.");
  b.card("CONCEPT", "Main threats to Antarctica", "Climate change, fishing (krill, toothfish), possible resource exploitation, tourism, pollution from stations and ships.");
  b.card("CONCEPT", "How does climate change affect Antarctica?", "Warming on the Peninsula, ice-shelf collapse (e.g. Larsen B, 2002), sea-ice change affecting krill, melting land ice raising sea level.");
  b.card("VOCABULARY", "What does CCAMLR do?", "The Commission for the Conservation of Antarctic Marine Living Resources sets catch limits for krill and toothfish and creates marine protected areas.");
  b.card("DEFINITION", "What is an **environmental impact assessment**?", "A study before an activity that predicts its environmental effects and decides whether and how it can go ahead.");
  b.card("CONCEPT", "Tourism guidelines in Antarctica", "Limit people ashore, keep distance from wildlife, clean boots and clothing, remove waste; voluntary and self-regulated.");
  b.card("CONCEPT", "Why does damage in Antarctica last a long time?", "Cold slows decomposition and plant growth, so spills, waste and trampled moss recover only over decades.");
  b.card("CONCEPT", "Biggest limitation of the Antarctic Treaty system", "It controls activities in Antarctica but cannot stop climate change caused by emissions elsewhere.");
});
