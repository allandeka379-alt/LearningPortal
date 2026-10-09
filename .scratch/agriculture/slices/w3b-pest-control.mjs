// Slice W3b: pest control methods and integrated pest management.
import { concept, P, pctChange, round, check, table, agricultureLevels } from "../lib.mjs";

// Calc: does spraying pay? 1.5 ha, 5 t/ha, 8% loss, US$280/t, spray US$38/ha.
const cArea = 1.5, cYield = 5, cLoss = 8, cPrice = 280, cSpray = 38;
const cSavedT = (cArea * cYield * cLoss) / 100;
const cValue = cSavedT * cPrice;
const cCost = cArea * cSpray;
const cNet = cValue - cCost;
check(Math.abs(cSavedT - 0.6) < 1e-9 && Math.abs(cValue - 168) < 1e-9 && Math.abs(cCost - 57) < 1e-9 && Math.abs(cNet - 111) < 1e-9, "calc");
// Num: aphids per plant 40 -> 14 after release of ladybirds.
const aphidDrop = -pctChange(40, 14);
check(Math.abs(aphidDrop - 65) < 1e-9, "aphid drop");

// Structured: cabbage trial.
const PRICE = 0.25, SPRAY = 40;
const TRIAL = [
  ["A: no control", 0, 21000, 14],
  ["B: broad-spectrum spray every week", 10, 33000, 1],
  ["C: IPM (scouting, selective spray at threshold)", 3, 32000, 9],
];
const T_TABLE = table(["Treatment", "Sprays", "Marketable heads per ha", "Ladybirds per 10 plants"], TRIAL.map(([n, s, h, l]) => [n, s, h.toLocaleString("en-GB"), l]));
const net = TRIAL.map(([, s, h]) => h * PRICE - s * SPRAY);
check(net[0] === 5250 && net[1] === 7850 && net[2] === 7880, "trial net");

concept("agri.protection.pest-control", { file: "protection/pest-control", keyPrefix: "protection.pest-control" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **biological** pest control?",
    options: [
      ["Releasing parasitic wasps", "Correct: a living natural enemy kills the pest."],
      ["Spraying a contact insecticide", "This is chemical control."],
      ["Hand-picking caterpillars", "This is mechanical control."],
      ["Rotating maize with soya beans", "This is cultural control."],
    ],
    answer: "A",
    explanation: "Biological control uses living predators, parasitoids or disease organisms.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Aphids are feeding under the leaves of a crop where sprays rarely reach. Which type of insecticide is most suitable?",
    options: [
      ["A systemic insecticide", "Correct: it moves in the sap the aphids suck."],
      ["A contact insecticide", "The spray will not touch aphids hidden under leaves."],
      ["A fumigant", "Fumigants are gases used in sealed stores."],
      ["A stomach-poison bait", "Aphids do not chew baits; they suck sap."],
    ],
    answer: "A",
    explanation: "Systemic pesticides are absorbed and carried in the sap, so sap-sucking pests are poisoned wherever they feed.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main use of pheromone traps on a maize farm?",
    options: [
      ["To show when pest moths arrive", "Correct: catches in the trap guide scouting and timing."],
      ["To kill every caterpillar in the field", "Traps catch adult males, not larvae."],
      ["To feed the crop through its leaves", "Pheromones are scents, not nutrients."],
      ["To stop the rain washing off sprays", "Pheromones have nothing to do with sprays."],
    ],
    answer: "A",
    explanation: "A sex pheromone lure attracts male moths; counting catches tells the farmer when moths arrive and when to scout closely.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does destroying old maize stalks after harvest help to control maize stalk borer?",
    options: [
      ["It kills the larvae resting in them over the dry season", "Correct."],
      ["It adds nitrogen that makes the next crop resistant", "Burning or removing stalks does not make maize resistant."],
      ["It attracts birds that eat the adult moths in flight", "This is not how residue destruction works."],
      ["It removes all of the eggs that the moths have laid in the soil", "Stalk borer eggs are laid on the plant, not in soil."],
    ],
    answer: "A",
    explanation: "Stalk borer larvae survive the dry season inside old stalks; destroying the stalks breaks the life cycle.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Grain stored in airtight (hermetic) bags stays free of live weevils. Why?",
    options: [
      ["The insects die from lack of oxygen", "Correct: respiration uses up the oxygen in the sealed bag."],
      ["The plastic of the bag is poisonous to insects", "The bags are not treated with poison."],
      ["The bag keeps the grain too cold for insects", "The bags do not cool the grain."],
      ["Light passing through the bag kills the larvae", "The larvae are inside the grain."],
    ],
    answer: "A",
    hints: ["What do insects and grain both use up when they respire?"],
    explanation: "In a sealed bag, respiration uses up oxygen and insects die or stop developing, without chemicals.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "In a push-pull system for maize, what is the role of the Napier grass planted around the field?",
    options: [
      ["It attracts stem borer moths away from the maize", "Correct: it is the \"pull\" (a trap plant)."],
      ["It repels moths from between the maize rows", "That is the \"push\" plant, desmodium."],
      ["It fixes nitrogen for the maize crop", "Napier grass is a grass, not a legume."],
      ["It produces a gas that kills the larvae in the stems", "It does not fumigate the maize."],
    ],
    answer: "A",
    hints: ["Push = repel from the crop; pull = attract to the edge."],
    explanation: "Desmodium between rows repels moths (push); Napier grass around the field attracts them (pull).",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "For which job is a **fumigant** the right type of pesticide?",
    options: [
      ["Killing weevils in grain in a sealed store", "Correct: the gas penetrates the grain, reaching larvae inside."],
      ["Killing aphids on growing cabbages", "A systemic or contact spray is used in the field."],
      ["Killing cutworms in a seedbed", "Baits or soil treatments are used for cutworms."],
      ["Protecting new leaves of cotton from bollworms", "Field sprays are used on growing crops."],
    ],
    answer: "A",
    hints: ["A fumigant is a gas; where can a gas be held in?"],
    explanation: "Fumigants are toxic gases used in sealed stores by trained operators; they kill all stages, including those inside grains.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A farmer used the same insecticide on his tomatoes all season. Early sprays killed most bollworms, but by the end the same dose killed very few. What is the most likely explanation?",
    options: [
      ["The pests had become resistant to that chemical", "Correct: survivors bred, and their offspring were also hard to kill."],
      ["The bollworms had moved into the soil to pupate", "Pupation does not explain larvae surviving sprays."],
      ["The tomato plants had broken down the insecticide", "This does not explain a change in the pests."],
      ["Natural enemies had eaten all the insecticide", "Natural enemies do not remove pesticide."],
    ],
    answer: "A",
    hints: ["Which insects survive each spray, and what do they pass on?"],
    explanation: "Each spray leaves the most tolerant insects to breed, so the population becomes resistant. Rotating chemical groups and IPM slow this.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "After weekly broad-spectrum sprays against caterpillars, a crop is suddenly attacked by large numbers of red spider mites, which were rare before. Which is the best explanation?",
    options: [
      ["The sprays killed the predators of the mites", "Correct: a secondary pest outbreak."],
      ["The sprays contained mite eggs", "Pesticides do not carry pests."],
      ["Red spider mites feed only on dead caterpillars", "Mites suck plant sap."],
      ["The caterpillars were the main food of the crop", "The crop does not feed on pests."],
    ],
    answer: "A",
    hints: ["Think of what else a broad-spectrum spray kills."],
    explanation: "Broad-spectrum sprays kill natural enemies; pests that were kept in check by them can then multiply (secondary pest outbreak).",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Stomach poisons are most effective against biting and chewing pests.",
    answer: true,
    explanation: "True. They must be eaten with treated leaves or baits.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Integrated pest management means that no pesticides are ever used.",
    answer: false,
    explanation: "False. IPM uses pesticides only when scouting shows they are needed, chosen and applied to do least harm.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each control measure with its group of methods.",
    pairs: [
      ["Planting at the recommended time", "Cultural"],
      ["Crushing egg masses by hand", "Mechanical"],
      ["Ladybird beetles eating aphids", "Biological"],
      ["Sex-scent lures catching male moths", "Biotechnical"],
      ["A systemic insecticide spray", "Chemical"],
    ],
    explanation: "Know at least one example of each group.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence.",
    template: "A {{blank:a}} pesticide kills only insects it touches, while a {{blank:b}} pesticide is absorbed and carried in the sap of the plant.",
    blanks: [
      { id: "a", accepted: ["contact"] },
      { id: "b", accepted: ["systemic", "translocated"] },
    ],
    explanation: "Contact; systemic.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In IPM, what is the name given to the pest level at which the cost of control becomes less than the value of the crop it saves?",
    accepted: ["economic threshold", "action threshold", "the economic threshold", "economic threshold level"],
    keywords: { any: ["threshold"] },
    explanation: "The **economic (action) threshold**.",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Before ladybirds were released, Chipo counted an average of 40 aphids per plant. Two weeks later the average was 14. Calculate the percentage decrease in aphids per plant.",
    value: aphidDrop, unit: "%", tol: 0, wrong: [round(pctChange(14, 40), 1), 26],
    hints: ["% decrease = decrease ÷ original × 100."],
    explanation: `Decrease = 40 − 14 = 26; 26 ÷ 40 × 100 = ${aphidDrop}%. Dividing by 14 (the new value) gives the wrong base.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", calculator: true,
    stem: `Sipho has ${cArea} ha of maize expected to yield ${cYield} t/ha. Scouting suggests he will lose ${cLoss}% of the crop without control. Assume maize sells at US\\$${cPrice} per tonne, a spray costs US\\$${cSpray} per hectare and one spray prevents the loss. Calculate the net gain (value saved minus cost) from spraying, in US dollars.`,
    value: cNet, prefix: "US$", wrong: [cValue, cValue + cCost],
    hints: ["Find the tonnes saved first.", "Cost is per hectare."],
    explanation: `Crop = ${cArea} × ${cYield} = ${cArea * cYield} t; saved = ${cArea * cYield} × ${cLoss}% = ${cSavedT} t; value = ${cSavedT} × ${cPrice} = US\\$${cValue}; cost = ${cArea} × ${cSpray} = US\\$${cCost}; net gain = US\\$${cValue} − US\\$${cCost} = US\\$${cNet}. Forgetting to subtract the cost gives US\\$${cValue}.`,
    workedSolution: `1. Expected crop = ${cArea} × ${cYield} = ${cArea * cYield} t.\n2. Crop saved = ${cArea * cYield} × ${cLoss} ÷ 100 = ${cSavedT} t.\n3. Value saved = ${cSavedT} × US\\$${cPrice} = US\\$${cValue}.\n4. Cost of spraying = ${cArea} × US\\$${cSpray} = US\\$${cCost}.\n5. Net gain = US\\$${cValue} − US\\$${cCost} = US\\$${cNet}.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "State **two** advantages and **two** disadvantages of biological pest control.",
    hints: ["Think of residues, cost over time, speed and other sprays."],
    points: [
      "Advantage: no poisonous residues on food / safe for people, livestock and the environment.",
      "Advantage: often specific to the pest / can keep working season after season / pests do not become resistant easily.",
      "Disadvantage: slow to act; does not eradicate the pest.",
      "Disadvantage: natural enemies are killed by broad-spectrum sprays / needs knowledge and may be costly to obtain.",
    ],
    modelAnswer: "Biological control leaves no poisonous residues and natural enemies can keep working season after season. However, it is slow, never wipes the pest out, and the enemies are killed if broad-spectrum insecticides are sprayed.",
    explanation: "Two of each.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how crop rotation helps to control pests.",
    hints: ["Many pests feed on only one crop or crop family."],
    points: [
      "Many pests feed on one crop or crop family only.",
      "Growing a different crop next season leaves them without food / breaks their life cycle.",
      "So pest numbers carried over in the soil or residues fall (e.g. nematodes, soil pests).",
    ],
    modelAnswer: "Many pests attack only one crop family. When an unrelated crop follows, the pests that survived in the soil or residues have no food, their life cycle is broken and their numbers fall.",
    explanation: "Host-specific pests starve when the crop changes.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 14, calculator: true,
    stem: `A farm near Marondera tested three ways of controlling caterpillars and aphids on cabbages. Assume each head sells for US\\$${PRICE.toFixed(2)} and each spray costs US\\$${SPRAY} per hectare.\n\n${T_TABLE}`,
    hints: ["Net income = heads × price − sprays × cost.", "Compare B and C, then think beyond this one season."],
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the net income per hectare (sales minus spray costs) for treatment B.",
        value: net[1], prefix: "US$", wrong: [33000 * PRICE, 33000 * PRICE - SPRAY],
        explanation: `33,000 × 0.25 = US\\$8,250; 10 × 40 = US\\$400; 8,250 − 400 = US\\$${net[1].toLocaleString("en-GB")}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: "Calculate the net income per hectare for treatment C.",
        value: net[2], prefix: "US$", wrong: [32000 * PRICE, 32000 * PRICE - SPRAY],
        explanation: `32,000 × 0.25 = US\\$8,000; 3 × 40 = US\\$120; 8,000 − 120 = US\\$${net[2].toLocaleString("en-GB")}.`,
      }),
      P.mcq({
        label: "(c)", stem: "Which statement is supported by the results?",
        options: [
          ["C gave slightly more net income than B with fewer sprays", "Correct: US\\$7,880 against US\\$7,850, with 3 sprays instead of 10."],
          ["B gave the most marketable heads and the most net income", "B had the most heads but slightly less net income than C."],
          ["A gave the most income because it used no sprays", "A earned only US\\$5,250."],
          ["Ladybirds were most numerous where most sprays were used", "Treatment B had the fewest ladybirds."],
        ],
        answer: "A",
        explanation: "Net incomes: A US\\$5,250, B US\\$7,850, C US\\$7,880.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Explain the difference in ladybird numbers between treatments B and C, and why it matters.",
        points: [
          "Broad-spectrum weekly sprays in B killed ladybirds as well as pests.",
          "C used few, selective sprays only when needed, so natural enemies survived.",
          "Ladybirds eat aphids, so in C they help control pests and reduce the need for sprays (in B pests may resurge or secondary pests appear).",
        ],
        explanation: "Effect of sprays on natural enemies.",
      }),
      P.manual({
        label: "(e)", marks: 6, stem: "Discuss whether the farm should adopt treatment C (IPM) on all its vegetables.",
        points: [
          "C gave the highest net income in this trial with far fewer sprays.",
          "Fewer sprays mean lower costs, less risk of poisoning workers and less residue on food, which buyers value.",
          "Natural enemies survive, so pests are partly controlled for free; less chance of secondary pest outbreaks.",
          "Fewer sprays slow the development of resistance, so chemicals keep working in future seasons.",
          "But IPM needs trained staff, regular scouting and time; one season and one crop is limited evidence and results may differ by season and pest.",
          "Judgement: adopt IPM, with scouting and thresholds set for each crop, and keep testing / train workers.",
        ],
        levels: agricultureLevels(6),
        explanation: "Weigh income, safety, natural enemies and resistance against the demands of IPM; reach a judgement.",
      }),
    ],
    explanation: "Compare control strategies from trial data and evaluate integrated pest management.",
  });
  b.struct({
    d: 4, skill: "APPLICATION", examStyle: true, marks: 8,
    stem: "A school near Gweru stores maize from its plot in a room for several months. Last year many grains were found with round holes and the bags were full of fine powder.",
    hints: ["Think of how the grain is prepared, the store, the bags and any treatment."],
    parts: [
      P.short({
        label: "(a)", stem: "Name the pest that most likely caused the damage.",
        accepted: ["weevil", "weevils", "grain weevil", "maize weevil", "grain weevils", "maize weevils"],
        keywords: { any: ["weevil"] },
        explanation: "Grain (maize) weevils.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Describe **three** non-chemical measures the school could take to protect this year's grain.",
        points: [
          "Dry the grain well before storage (low moisture content).",
          "Clean the store and remove old grain and residues before filling / sieve and winnow the grain.",
          "Store in airtight (hermetic) bags or metal silos / on pallets off the floor, checking regularly.",
        ],
        explanation: "Drying, hygiene and hermetic storage.",
      }),
      P.mcq({
        label: "(c)", stem: "A fumigant is used in a large grain store. Which precaution is essential?",
        options: [
          ["Only trained operators apply it in a sealed store", "Correct: fumigant gases are extremely toxic."],
          ["Pupils open the windows while it is applied", "The store must be sealed for the gas to work, and pupils kept out."],
          ["It is mixed into the grain by hand with gloves", "Fumigants are not handled this way by untrained people."],
          ["The store is used as a classroom during treatment", "Nobody may enter during fumigation."],
        ],
        answer: "A",
        explanation: "Fumigation is for trained operators only, with the store sealed and people kept out until it is aired.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why fumigation reaches pests that a contact insecticide dusted on the grain surface may not.",
        points: ["The weevil eggs, larvae and pupae develop inside the grain.", "A gas penetrates into the grains and kills the hidden stages; a surface dust does not reach them."],
        explanation: "Hidden stages inside grain.",
      }),
      P.manual({
        label: "(e)", marks: 1, stem: "State **one** reason why stored grain must not be treated with a field insecticide.",
        points: ["It may leave poisonous residues in food / it is not approved for food grain."],
        explanation: "Residues in food.",
      }),
    ],
    explanation: "Identify a storage pest and plan safe control of stored grain.",
  });

  b.card("DEFINITION", "Integrated pest management (IPM)", "Combining compatible control methods, guided by scouting, to keep pests below the economic threshold with least use of chemicals.");
  b.card("DEFINITION", "Economic threshold", "Pest level at which the cost of control is less than the value of crop saved; act above it.");
  b.card("CONCEPT", "Cultural pest control", "Rotation, timely planting, field hygiene and closed seasons, trap crops, push-pull, deep ploughing, healthy crops.");
  b.card("CONCEPT", "Biological control", "Predators (ladybirds), parasitoid wasps, disease organisms (Bt). Safe, no residues, but slow and killed by broad-spectrum sprays.");
  b.card("CONCEPT", "Biotechnical control", "Pheromone traps (monitoring, mating disruption), resistant and Bt varieties, sterile insect technique.");
  b.card("FACT", "Contact vs systemic pesticides", "Contact: kills on touch, must cover the pest. Systemic: absorbed and carried in sap; good for sucking pests.");
  b.card("FACT", "Stomach poisons and fumigants", "Stomach poison: eaten with leaves or bait, for chewing pests. Fumigant: toxic gas in sealed stores, kills stages inside grain.");
  b.card("CONCEPT", "Problems of relying on chemicals", "Cost, poisoning, residues, pollution, resistance, death of natural enemies and secondary pest outbreaks.");
  b.card("FORMULA", "Does spraying pay?", "Net gain = value of crop saved − cost of control. Spray only if positive.");
});
