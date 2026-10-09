// Slice G1b: ecosystems — savanna and hot desert biomes (ZIMSEC 7.3.3).
import { concept, P, geographyLevels } from "../lib.mjs";

const SAV =
  "Table 1: mean monthly rainfall at a fictional highveld station in Zimbabwe (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Rainfall (mm) | 190 | 165 | 95 | 35 | 8 | 2 | 1 | 3 | 10 | 38 | 92 | 170 |";

concept("geo.ecosystems.savanna-desert", { file: "ecosystems/savanna-desert", keyPrefix: "ecosystems.savanna-desert" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which biome covers most of Zimbabwe?",
    options: [
      ["Savanna (tropical continental)", "Correct: miombo and mopane woodland and wooded grassland."],
      ["Tropical rainforest", "Zimbabwe has a long dry season, so rainforest cannot grow."],
      ["Hot desert", "Even the driest parts of Zimbabwe receive more rain than a true desert."],
      ["Mediterranean scrub (warm temperate)", "This biome is found near 30-40° on west coasts, such as the Cape."],
    ],
    answer: "A",
    explanation: "Zimbabwe lies in the savanna belt, with a hot wet season and a long dry season. Its natural vegetation is mainly miombo and mopane woodland.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Roughly how much rain does a hot desert receive in a year?",
    options: [
      ["Less than about 250 mm", "Correct: and it is very unreliable."],
      ["About 500-1,500 mm", "This is typical of the savanna."],
      ["More than about 2,000 mm", "This is typical of the equatorial rainforest."],
      ["About 750-1,000 mm", "This is about the range of Zimbabwe's natural region II."],
    ],
    answer: "A",
    explanation: "Hot deserts receive less than about 250 mm of rain a year, and some years may have almost none.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do hot deserts receive so little rain?",
    options: [
      ["Air sinks under subtropical high pressure, so clouds rarely form", "Correct: sinking air warms and dries."],
      ["The sun is too low in the sky for water to evaporate from the sea", "The sun is high and evaporation is strong."],
      ["Strong convection lifts air every afternoon", "Convection brings rain; it is typical of the rainforest."],
      ["Warm ocean currents flow along their coasts", "Desert coasts usually have cold currents, such as the Benguela."],
    ],
    explanation: "Hot deserts lie under the subtropical high pressure belt. Sinking air warms as it descends, so relative humidity falls and clouds rarely form.",
    answer: "A",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the desert have a very large daily (diurnal) temperature range?",
    options: [
      ["Clear skies let the ground heat up by day and lose heat at night", "Correct: there is no cloud blanket."],
      ["The desert is close to the sea, which heats and cools quickly", "The sea heats and cools slowly, so nearness to it reduces the range."],
      ["Thick vegetation traps heat during the night", "Desert vegetation is sparse."],
      ["Heavy rain cools the ground every afternoon", "Rain is rare in deserts."],
    ],
    answer: "A",
    explanation: "Without cloud, strong sunshine heats the ground by day, and at night heat radiates quickly into space, so nights can be cold.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How does the thick, corky bark of many savanna trees help them survive?",
    options: [
      ["It protects them from veld fires", "Correct: the bark insulates the living tissue."],
      ["It helps them catch weak light", "Light is not limited in open savanna."],
      ["It allows them to climb other trees", "Climbing is a feature of rainforest lianas."],
      ["It lets them float in seasonal floods", "Bark does not help trees float."],
    ],
    answer: "A",
    explanation: "Thick bark insulates the living layer under it, so trees survive the dry-season fires that sweep through savanna grass.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "In which part of Zimbabwe is mopane woodland most common?",
    options: [
      ["Hot, low-lying areas such as the Zambezi valley and the Lowveld", "Correct: mopane tolerates heat and drought."],
      ["The cool, wet slopes of the Eastern Highlands", "These high-rainfall areas have montane forest, grassland and plantations."],
      ["The central watershed around Harare", "The higher, wetter plateau is mainly miombo woodland."],
      ["The high grassland and heath around the summit of Mount Nyangani", "Mopane does not grow in the cool highlands."],
    ],
    answer: "A",
    explanation: "Mopane grows in the hotter, drier low-lying areas such as the Zambezi valley and the Lowveld; miombo covers much of the higher plateau.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A savanna area is fenced off from both fire and grazing animals for twenty years. What is the **most likely** change?",
    options: [
      ["Trees and shrubs spread and the woodland becomes denser", "Correct: fire and grazing normally kill seedlings."],
      ["The area turns into a hot desert with sparse plants", "Rainfall, not fire, decides whether an area is desert."],
      ["All the trees die and only tall grass remains across the area", "Without fire, trees are more likely to spread, not die."],
      ["The soil becomes waterlogged like a vlei", "Excluding fire does not raise the water table."],
    ],
    answer: "A",
    hints: ["What do fire and grazing do to young trees?"],
    explanation: "Fire and grazing kill tree seedlings and keep savanna open. Without them, more young trees survive and the woodland becomes thicker.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Mopane leaves fold together in the midday heat. How does this help the tree?",
    options: [
      ["It reduces the leaf area exposed to the sun, so less water is lost", "Correct: less transpiration in the hottest hours."],
      ["It traps insects for extra nutrients from the soil", "Mopane is not an insect-trapping plant."],
      ["It makes the leaves too bitter for elephants and all other browsing animals", "Elephants and other animals browse mopane."],
      ["It allows the leaves to catch more of the sunlight", "Folding exposes less leaf to the sun, not more."],
    ],
    answer: "A",
    hints: ["Think about transpiration."],
    explanation: "Folding the paired leaflets reduces the surface facing the sun and the heat they absorb, so the tree loses less water by transpiration.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Many savanna trees are deciduous, shedding their leaves in the dry season.",
    answer: true,
    explanation: "True. Shedding leaves in the dry season reduces water loss by transpiration when soil water is scarce.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Mean monthly rainfall at a fictional station in Zimbabwe's Midlands (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Rainfall (mm) | 175 | 150 | 88 | 30 | 6 | 1 | 0 | 2 | 12 | 41 | 98 | 182 |\n\nCalculate the total annual rainfall.",
    value: 785, unit: "mm",
    wrong: [685, 65],
    explanation: "Adding the twelve months gives 785 mm.",
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "Mean monthly rainfall at a fictional station in Mashonaland (fictional data).\n\n| Month | J | F | M | A | M | J | J | A | S | O | N | D |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Rainfall (mm) | 196 | 178 | 110 | 44 | 11 | 3 | 2 | 4 | 15 | 47 | 105 | 184 |\n\nWhat percentage of the annual rainfall falls in the five months November to March? Give your answer to the nearest whole number.",
    value: 86, tol: 0.5, unit: "%", answer: "86",
    wrong: [773, 14],
    hints: ["Add November, December, January, February and March.", "Divide by the annual total and multiply by 100."],
    workedSolution: "1. November to March = 105 + 184 + 196 + 178 + 110 = 773 mm.\n2. Annual total = 899 mm.\n3. Percentage = $\\dfrac{773}{899} \\times 100 = 86.0\\%$, so 86%.",
    explanation: "$773 \\div 899 \\times 100 = 86\\%$: almost all the rain falls in the hot wet season.",
  });
  b.num({
    d: 2, skill: "APPLICATION",
    stem: "At a fictional station in the Namib Desert, the temperature reached 38 °C at 14:00 and fell to 11 °C at 05:00 the next morning. Calculate the diurnal range.",
    value: 27, unit: "°C",
    wrong: [49, 24.5],
    explanation: "Diurnal range = maximum − minimum = $38 - 11 = 27$ °C.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each adaptation to the plant or animal that shows it.",
    pairs: [
      ["Stores water in a massive spongy trunk", "baobab"],
      ["Large ears that lose heat", "fennec fox"],
      ["Butterfly-shaped leaves that fold in the heat", "mopane"],
      ["Fat stored in a hump; can go long periods without drinking", "camel"],
    ],
    explanation: "The baobab stores water; the fennec fox loses heat through large ears; mopane leaves fold; camels store fat and survive without water.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Plants adapted to drought are called {{blank:a}}; desert plants that germinate, flower and set seed within a few weeks of rain are called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["xerophytes", "xerophyte"], wrong: "epiphytes" },
      { id: "b", accepted: ["ephemerals", "ephemeral", "ephemeral plants"], wrong: "perennials" },
    ],
    explanation: "Xerophytes survive drought; ephemerals avoid it by completing their life cycle quickly after rain.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Identify **one** input, **one** process and **one** output of the savanna ecosystem.",
    points: [
      "Input, e.g. sunlight / seasonal rainfall / nutrients from weathered rock",
      "Process, e.g. photosynthesis / grazing and browsing / decomposition / burning",
      "Output, e.g. water vapour by evapotranspiration / carbon dioxide and ash from fires / runoff",
    ],
    modelAnswer: "Input: rainfall in the wet season. Process: grazing of grass by zebra and buffalo. Output: water vapour from evapotranspiration.",
    explanation: "Inputs enter the ecosystem, processes happen within it and outputs leave it.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which savanna grasses are adapted to the long dry season and to fire.",
    points: [
      "Grasses die back above ground in the dry season",
      "Their roots / underground parts survive and regrow when the rains come",
      "Growing points are at or below ground level",
      "So fire burns the dead leaves but does not kill the plant",
    ],
    hints: ["Where is the living part of the grass in the dry season?"],
    modelAnswer: "Savanna grasses die back in the dry season, but their roots stay alive underground and send up new shoots when the rains arrive. Their growing points are at ground level, so a fire burns the dry leaves without killing the plant.",
    explanation: "Grasses survive drought and fire by keeping their living parts underground.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    stem: SAV,
    parts: [
      P.num({
        label: "(a)",
        marks: 1,
        stem: "How many months receive less than 50 mm of rain?",
        value: 7,
        explanation: "April (35), May (8), June (2), July (1), August (3), September (10) and October (38): seven months.",
      }),
      P.short({
        label: "(b)",
        stem: "Name the wettest month.",
        accepted: ["January", "Jan"],
        wrong: ["December"],
        explanation: "January has the most rain, 190 mm.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Describe the pattern of rainfall shown in Table 1.",
        points: [
          "A hot wet season from about November to March and a long dry season from about April to October",
          "Uses figures, e.g. a peak of 190 mm in January and only 1 mm in July",
        ],
        modelAnswer: "Rain falls mainly from November to March, peaking at 190 mm in January, while April to October is dry, with only 1 mm in July.",
      }),
      P.manual({
        label: "(d)",
        marks: 3,
        stem: "Explain how the trees of the miombo woodland are adapted to this rainfall pattern.",
        points: [
          "They are deciduous / shed leaves in the dry season",
          "To reduce water loss by transpiration when soil water is scarce",
          "Deep roots reach water stored lower in the soil / thick bark resists dry-season fires",
        ],
        modelAnswer: "Miombo trees are deciduous: they drop their leaves in the long dry season to cut water loss by transpiration. Deep roots tap water stored lower in the soil, and thick bark protects them from dry-season fires.",
      }),
      P.manual({
        label: "(e)",
        marks: 2,
        stem: "Explain why rain falls mainly between November and March in Zimbabwe.",
        points: [
          "The overhead sun / ITCZ moves south over Zimbabwe in the southern summer",
          "Bringing rising, moist air and convectional rain; the rest of the year is dominated by high pressure / sinking dry air",
        ],
        modelAnswer: "In the southern summer the ITCZ moves south over Zimbabwe, bringing rising moist air and convectional storms; in winter high pressure and sinking air keep the weather dry.",
      }),
    ],
    hints: ["Count the months carefully in (a)."],
    explanation: "The table shows the savanna's wet and dry seasons, which explain deciduous trees, fire and grazing patterns.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", secs: 540,
    stem: "Read this description of a desert (fictional field notes).\n\n*Along the coast, fog rolls in from the cold sea most mornings, but it almost never rains. Inland there are dunes and gravel plains. A few low plants with fleshy leaves grow between the stones, and after a rare storm the gravel plains are briefly covered with flowers. Beetles climb dune crests at dawn and tilt their bodies into the fog.*",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which plants in the notes are ephemerals?",
        options: [
          ["The flowers that appear after a rare storm", "Correct: they complete their life cycle quickly after rain."],
          ["The low plants with fleshy leaves", "These store water: succulents."],
          ["Trees along dry river beds", "Trees are long-lived and are not mentioned in the notes."],
          ["Grasses that grow tall each wet season", "That describes savanna grasses, not this desert."],
        ],
        answer: "A",
        explanation: "Ephemerals germinate, flower and set seed quickly after rain, then survive as seeds.",
      }),
      P.manual({
        label: "(b)",
        marks: 2,
        stem: "Explain why fog forms along this coast but rain is rare.",
        points: [
          "A cold ocean current cools the air above it / air is cooled to its dew point near the surface, forming fog",
          "The cooled air is stable / under high pressure, so it does not rise to form rain clouds",
        ],
        modelAnswer: "The cold current cools the air just above the sea to its dew point, so fog forms. The air is cool and stable under high pressure, so it does not rise to form rain clouds.",
      }),
      P.manual({
        label: "(c)",
        marks: 2,
        stem: "Explain how the beetles described are adapted to the desert.",
        points: [
          "They collect fog droplets on their bodies",
          "Which run down to their mouths, giving them water where there is no rain",
        ],
        modelAnswer: "By tilting into the fog the beetles collect water droplets on their backs, which run down to their mouths, so they can drink in a place with almost no rain.",
      }),
    ],
    hints: ["Ephemerals appear only after rain."],
    explanation: "The notes describe a coastal desert like the Namib: cold current, fog, succulents, ephemerals and fog-collecting animals.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 6,
    stem: "\"Fire does more good than harm in the savanna.\" Discuss this statement with reference to Zimbabwe.",
    points: [
      "Fire removes dead grass and encourages fresh green growth for grazing",
      "Fire kills tree seedlings and stops bush encroachment, keeping savanna open",
      "Fire-adapted plants (thick bark, underground grass roots) survive, so it is a natural part of the system",
      "Too frequent or hot late-season fires destroy woodland, seedlings and wildlife / release carbon and smoke",
      "Burning leaves the soil bare before the rains, causing erosion and loss of nutrients",
      "A reasoned judgement, e.g. controlled, occasional early burning is beneficial; frequent uncontrolled fires are harmful",
    ],
    levels: geographyLevels(6),
    hints: ["Consider timing and how often the veld burns."],
    wordLimit: { max: 300 },
    modelAnswer: "Fire is a natural part of Zimbabwe's savanna. It removes old dead grass, so fresh green shoots grow for cattle and wildlife, and it kills tree seedlings, stopping bush encroachment. Grasses with underground roots and trees with thick bark survive it. However, uncontrolled fires late in the dry season burn very hot, destroying miombo trees, killing small animals and nesting birds, and releasing smoke and carbon. Burnt ground is bare when the first storms arrive, so soil and nutrients are washed away. Fire therefore does more good than harm only when it is controlled, early in the dry season and not too frequent; frequent, uncontrolled veld fires do more harm than good.",
    explanation: "A good answer weighs ecological benefits against damage and makes a judgement that depends on how and when burning happens.",
  });
  b.card("DEFINITION", "What is a **savanna**?", "A tropical biome of grassland with scattered trees or open woodland, with a hot wet season and a long dry season.");
  b.card("FACT", "Where are hot deserts found?", "About 15-30° N and S, often on west coasts beside cold currents: the Sahara, the Namib, and the Kalahari semi-desert.");
  b.card("CONCEPT", "Why are hot deserts dry?", "They lie under subtropical high pressure: sinking air warms and dries, so clouds rarely form; cold currents add to the dryness on west coasts.");
  b.card("VOCABULARY", "Miombo and mopane woodland", "Miombo: deciduous woodland of the higher, wetter plateau, with red new leaves before the rains. Mopane: woodland of hot, dry low-lying areas such as the Zambezi valley and Lowveld.");
  b.card("CONCEPT", "Savanna tree adaptations", "Deep roots, small or feathery leaves, thorns, thick fire-resistant bark, deciduous leaves; the baobab stores water in its trunk.");
  b.card("CONCEPT", "Desert plant adaptations", "Succulence (water storage), long tap roots or wide shallow roots, small waxy or spiny leaves, ephemeral life cycles.");
  b.card("DEFINITION", "What is a **xerophyte**?", "A plant adapted to survive drought.");
  b.card("CONCEPT", "Role of fire in the savanna", "Removes dead grass, kills tree seedlings and keeps savanna open; too much fire causes erosion and woodland loss.");
  b.card("VOCABULARY", "What is **bush encroachment**?", "The spread of woody shrubs into grassland, often after overgrazing or the absence of fire.");
});
