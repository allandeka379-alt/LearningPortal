// Slice G3c: small-scale mining and gold panning (ZIMSEC 7.7.3).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.mining.small-scale", { file: "mining/small-scale", keyPrefix: "mining.small-scale" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **prospecting**?",
    options: [
      ["Searching for mineral deposits worth mining", "Correct: prospecting comes before any decision to mine."],
      ["Crushing ore to release the mineral", "Crushing is part of processing."],
      ["Filling old pits after mining has ended", "This is rehabilitation."],
      ["Selling minerals to an authorised buyer", "This is marketing, not prospecting."],
    ],
    answer: "A",
    explanation: "Prospecting is the search for minerals, using maps, sampling, surveys, drilling and indigenous knowledge.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which property of gold makes it sink to the bottom of a pan while sand is washed away?",
    options: [
      ["Its high density", "Correct: gold is about 19 times as dense as water, far denser than sand."],
      ["Its yellow colour", "Colour helps identify gold but does not make it sink."],
      ["Its softness", "Softness (malleability) is used to identify gold, not to separate it."],
      ["Its good conduction of electricity", "Conductivity plays no part in panning."],
    ],
    answer: "A",
    explanation: "Panning depends on the difference in density between heavy gold and light sand and mud.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where in a river is alluvial gold **most likely** to collect?",
    options: [
      ["On the inside bend of a meander", "Correct: the water slows on the inside bend, so heavy grains are deposited."],
      ["On the outside bend, where flow is fastest", "Fast water keeps material moving and erodes the bank."],
      ["In the middle of a straight, fast stretch", "Fast flow carries grains on rather than dropping them."],
      ["On the surface of the floodplain far from the channel", "Heavy gold is dropped close to the channel, not carried far onto the floodplain."],
    ],
    answer: "A",
    explanation: "Gold is deposited where velocity drops: inside bends, behind boulders, in potholes and below rapids.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How can a prospector tell real gold from iron pyrite (\"fool's gold\")?",
    options: [
      ["Gold can be dented with a pin; pyrite is hard and brittle", "Correct: gold is soft and malleable, while pyrite is hard and shatters."],
      ["Gold is dull grey; pyrite is bright yellow", "Gold is bright yellow; both look yellow, which is why they are confused."],
      ["Gold slowly dissolves in river water; pyrite does not dissolve", "Gold does not dissolve in water."],
      ["Gold rusts quickly; pyrite never changes", "Gold does not rust or tarnish."],
    ],
    answer: "A",
    explanation: "Gold is malleable and leaves a golden-yellow streak; pyrite is harder, brittle and leaves a greenish-black streak.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of **indigenous knowledge** used in prospecting?",
    options: [
      ["Sampling termite mounds for mineral grains", "Correct: termites bring up soil from depth, a clue long used by local prospectors."],
      ["Measuring magnetism from an aircraft", "This is a modern geophysical survey."],
      ["Drilling cores and testing them in a laboratory", "This is modern exploration drilling."],
      ["Studying satellite images of rock colour", "This is modern remote sensing."],
    ],
    answer: "A",
    explanation: "Indigenous clues include ancient workings, termite mounds, rock and soil colour and indicator plants.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why is the use of **mercury** by small-scale gold miners a serious problem?",
    options: [
      ["Its vapour and waste poison people, water and fish", "Correct: heating amalgam releases toxic vapour, and spilt mercury contaminates rivers and food chains."],
      ["It makes the recovered gold much less pure", "The mercury is driven off; the problem is pollution and health."],
      ["It is a costly import that adds to Zimbabwe's trade deficit", "Cost is not the main problem; health and environmental damage are."],
      ["It causes the gold grains to dissolve in river water", "Mercury binds gold into an amalgam; it does not dissolve it into the river."],
    ],
    answer: "A",
    explanation: "Mercury damages the nervous system and kidneys and builds up in fish; mercury-free methods are encouraged.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A government wants to increase the **contribution** of small-scale gold miners to the economy. Which measure would do most to raise the gold sold legally?",
    options: [
      ["Opening nearby buying centres that pay fair prices promptly", "Correct: miners are more likely to sell legally when buyers are close and pay well, so less gold is smuggled."],
      ["Banning all gold panning in every river in the gold belts", "A ban would cut output and push miners into illegal work."],
      ["Raising the fees for registering a claim", "Higher fees discourage registration and formal selling."],
      ["Allowing gold to be sold to any foreign buyer", "This would remove the national refinery's role and encourage smuggling out of the country."],
    ],
    answer: "A",
    hints: ["Think about why miners might sell gold illegally.", "Which option makes legal selling easier and more attractive?"],
    explanation: "Convenient buying centres with fair prices, together with registration, training and loans, draw small-scale gold into the formal economy.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Gold specks are found in gravel just downstream of a waterfall. What is the best explanation?",
    options: [
      ["The river slows in the plunge pool and drops its heavy load", "Correct: the sudden fall in velocity below the falls deposits dense grains."],
      ["The waterfall erodes gold from the air above it", "Gold comes from weathered rock upstream, not from the air."],
      ["Gold floats on the water and collects in foam", "Gold is very dense and sinks; it does not float."],
      ["Chemical reactions in the spray slowly turn quartz sand into gold", "Gold is an element; it cannot form from sand."],
    ],
    answer: "A",
    hints: ["What happens to river speed below a waterfall?", "Which grains are dropped first when a river slows?"],
    explanation: "Heavy minerals are deposited first wherever a river loses energy.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gold does not rust or tarnish, which helps it survive being carried by rivers.",
    answer: true,
    explanation: "True. Gold is chemically stable, so grains survive weathering and transport unchanged.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In Zimbabwe, anyone may dig for gold anywhere without a licence or registered claim.",
    answer: false,
    explanation: "False. Under the Mines and Minerals Act a person needs a prospecting licence and a registered claim; gold must be sold to authorised buyers.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each problem of small-scale mining with a suitable solution.",
    pairs: [
      ["Mercury pollution", "Training in mercury-free gravity methods"],
      ["Unfilled pits and trenches", "Backfilling and replanting worked-out land"],
      ["Collapsing shafts", "Timber or steel supports and safety inspections"],
      ["Gold smuggled out of the country", "Buying centres that pay fair, prompt prices"],
    ],
    explanation: "Each solution tackles the cause of the problem: mercury use, abandoned workings, unsupported shafts and the pull of illegal markets.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of gold panning. Choose the correct word for each gap.",
    template: "Gravel and water are swirled in a shallow pan. The {{blank:a}} sand and mud are washed over the rim, while the {{blank:b}} gold stays at the bottom. Some miners add {{blank:c}}, which binds to the gold to form an amalgam.",
    blanks: [
      { id: "a", accepted: ["light"], choices: ["light", "heavy", "hard", "shiny"] },
      { id: "b", accepted: ["heavy"], choices: ["light", "heavy", "soluble", "magnetic"] },
      { id: "c", accepted: ["mercury"], choices: ["mercury", "cyanide", "lime", "sulphur"] },
    ],
    explanation: "Panning separates by density; mercury amalgamation is a common but dangerous final step.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "A group of panners washes 8 tonnes of gravel containing 2.5 g of gold per tonne and recovers all the gold (fictional figures). How many grams of gold do they obtain?",
    value: 20,
    wrong: [3.2, 10.5],
    explanation: "8 × 2.5 = 20 g.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "%",
    stem: "A syndicate's gravel contained 30 g of gold, but it recovered only 19.5 g (fictional figures). What percentage of the gold was **lost**?",
    value: 35, tol: 0.05,
    wrong: [65, 10.5],
    hints: ["Find the mass lost first.", "Express it as a percentage of the gold in the gravel."],
    workedSolution: "1. Gold lost = 30 − 19.5 = 10.5 g.\n2. 10.5 ÷ 30 × 100 = 35%.",
    explanation: "10.5 g of 30 g is lost, which is 35%.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline **four** problems caused by gold panning and small-scale gold mining in Zimbabwe.",
    points: [
      "Land degradation: pits and trenches left open / stream banks dug away.",
      "Siltation of rivers and dams from loose gravel and soil.",
      "Mercury pollution of water and poisoning of people and fish.",
      "Deaths and injuries when unsupported shafts collapse or flood / violence, illegal mining or children leaving school (any one).",
    ],
    modelAnswer: "Panners dig pits and undercut river banks, leaving degraded land. Loose soil washes into rivers and dams, causing siltation. Mercury used to collect the gold poisons the water and the miners. Unsupported shafts often collapse, killing miners.",
    explanation: "Each problem should be stated with a short reason or effect.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about income, gold output and rural areas."],
    stem: "Explain the contribution of small-scale mining to Zimbabwe's economy.",
    points: [
      "It provides jobs and incomes for many people in rural areas, especially where farming is unreliable or in drought years.",
      "It produces a large share of the gold delivered to the national refinery, earning foreign currency.",
      "Miners' spending supports local businesses (shops, transport, equipment suppliers) / it can grow into formal mining.",
    ],
    modelAnswer: "Small-scale mining employs hundreds of thousands of people in rural areas, giving them an income when crops fail. In recent years it has delivered a large share of the country's gold, which earns foreign currency. The miners spend their earnings locally, supporting shops and transport operators.",
    explanation: "Link each contribution to the economy, not only to the miner.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 600,
    stem: "Table 1 shows gold delivered to a fictional national refinery by large-scale and small-scale producers (kg, fictional data).\n\n| Year | Large-scale producers | Small-scale producers | Total |\n|---|---|---|---|\n| 1 | 14,000 | 10,000 | 24,000 |\n| 2 | 13,500 | 16,500 | 30,000 |\n| 3 | 13,000 | 19,000 | 32,000 |",
    hints: ["Share = part ÷ total × 100."],
    parts: [
      P.num({ label: "(a)", unit: "%", marks: 2, stem: "Calculate the percentage of the total delivered by small-scale producers in Year 3. Give your answer to one decimal place.", value: 59.375, answer: "59.4", tol: 0.05, wrong: [40.6, 146.2], explanation: "19,000 ÷ 32,000 × 100 = 59.375, which is 59.4%." }),
      P.mcq({
        label: "(b)", stem: "Which statement describes the trend shown in Table 1?",
        options: [
          ["Small-scale deliveries rose while large-scale deliveries fell slightly", "Correct: small-scale rose from 10,000 to 19,000 kg; large-scale fell from 14,000 to 13,000 kg."],
          ["Both groups delivered more gold every year", "Large-scale deliveries fell each year."],
          ["Large-scale producers delivered most of the gold in every one of the three years", "From Year 2, small-scale producers delivered more."],
          ["Total deliveries fell over the three years", "The total rose from 24,000 to 32,000 kg."],
        ],
        answer: "A", explanation: "The growth in total deliveries came entirely from small-scale producers.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Suggest **two** reasons why small-scale gold deliveries might rise in this way.",
        points: ["More people turn to gold mining because of drought / unemployment / poor farming returns.", "Better incentives to sell legally: buying centres, fairer prices, prompt payment or registration drives."],
        modelAnswer: "A drought or loss of jobs pushes more people into gold mining, and new buying centres paying prompt, fair prices encourage them to sell legally instead of smuggling.",
        explanation: "Both push factors (lack of other income) and pull factors (incentives) can raise deliveries.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Suggest **two** problems the government may face as small-scale mining grows.",
        points: ["Greater land degradation, siltation and mercury pollution that must be controlled.", "More accidents, illegal mining, violence or smuggling to police / loss of royalties if gold is not declared."],
        modelAnswer: "More small-scale mining means more pits, siltation and mercury pollution, and more accidents, illegal mining and smuggling for the authorities to control.",
        explanation: "Growth brings environmental and social costs alongside income.",
      }),
    ],
    explanation: "This item uses a data table to examine the growing role of small-scale gold producers.",
  });
  b.struct({
    d: 2, skill: "UNDERSTANDING", secs: 480,
    stem: "A Form 3 class describes a stretch of river where panners work (fictional site): \"The river winds through three meanders. Below a 2 m rapid there is a pool. Panners dig holes on the inside of each bend and in cracks in the bedrock below the rapid.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Explain why the panners choose the inside of each bend.",
        points: ["The water flows more slowly on the inside of a bend.", "So dense gold grains are deposited there on the point bar."],
        modelAnswer: "Water slows on the inside bend, so it drops its heaviest load, including gold, on the point bar.",
        explanation: "Deposition happens where velocity falls.",
      }),
      P.mcq({
        label: "(b)", stem: "Which property of gold explains why it is trapped in cracks in the bedrock?",
        options: [
          ["High density", "Correct: dense grains sink through lighter sand into cracks and stay there."],
          ["Bright colour", "Colour does not affect where gold settles."],
          ["Good conductivity", "Conductivity has no effect on deposition."],
          ["Low melting point", "Gold's melting point is high, and it is irrelevant here."],
        ],
        answer: "A", explanation: "Dense grains work their way down to bedrock and lodge in cracks.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe how the panners separate gold from the gravel they dig.",
        points: ["Gravel and water are put in a shallow pan and large stones removed.", "The pan is swirled and tilted so light sand and mud wash over the rim.", "The heavy gold remains at the bottom and is picked out (sometimes collected with mercury)."],
        modelAnswer: "They place gravel and water in a pan, throw out stones, then swirl and tilt it so the light sand washes over the edge. The heavy gold stays at the bottom and is picked out.",
        explanation: "Panning separates by density.",
      }),
    ],
    explanation: "Apply the properties of alluvial gold to a river and describe panning.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"The benefits of small-scale gold mining in Zimbabwe outweigh its costs.\" Discuss.",
    hints: ["Give benefits to people and the economy.", "Give environmental and social costs, then judge whether management can change the balance."],
    points: [
      "Benefit: jobs and incomes for many rural people, especially in drought years.",
      "Benefit: a large share of national gold deliveries and foreign currency; spending supports local businesses.",
      "Cost: land degradation, open pits, deforestation and siltation of rivers and dams.",
      "Cost: mercury pollution and poisoning; accidents in unsafe shafts.",
      "Cost: illegal mining, violence, smuggling and children leaving school.",
      "Judgement: benefits can outweigh costs only if the sector is formalised, trained, financed and made to rehabilitate land.",
    ],
    levels: geographyLevels(6),
    modelAnswer: "Small-scale gold mining gives work to hundreds of thousands of rural people and has delivered a large share of Zimbabwe's gold, earning foreign currency. Miners' spending keeps shops and transport operators in business. However, the costs are serious. Pits and trenches are often left open, trees are cut for pit props and rivers such as the Mazowe are silted. Mercury poisons water and miners, and unsupported shafts collapse. Illegal mining brings violence and smuggling, and children may leave school. At present the costs are high because much of the work is unregulated. With registration, training in mercury-free methods, loans and enforced rehabilitation, the benefits could clearly outweigh the costs.",
    explanation: "Balance economic benefits against environmental and social costs and give a conditional judgement.",
  });

  b.card("DEFINITION", "**Prospecting**", "Searching for mineral deposits that may be worth mining.", undefined);
  b.card("DEFINITION", "**Alluvial (placer) deposit**", "Heavy, durable minerals concentrated in river sand and gravel.", "Gold and diamonds.");
  b.card("CONCEPT", "Properties of alluvial minerals", "High density, resistant to weathering, durable and insoluble.", undefined);
  b.card("CONCEPT", "Where alluvial gold collects", "Where rivers slow: inside bends, behind boulders, in potholes, below rapids and waterfalls.", undefined);
  b.card("CONCEPT", "Gold or pyrite?", "Gold is soft, malleable, golden streak; pyrite is hard, brittle, greenish-black streak.", undefined);
  b.card("CONCEPT", "Indigenous prospecting clues", "Ancient workings, termite mounds, rock and soil colour, indicator plants.", undefined);
  b.card("CONCEPT", "Problems of small-scale mining", "Land degradation, siltation, mercury pollution, unsafe shafts, illegal mining and smuggling.", undefined);
  b.card("CONCEPT", "Raising small-scale mining's contribution", "Registration, cooperatives, training, loans, equipment, buying centres, mercury-free methods.", undefined);
  b.card("FACT", "Mining rights in Zimbabwe", "A prospecting licence and a registered claim under the Mines and Minerals Act; gold sold only to authorised buyers.", undefined);
});
