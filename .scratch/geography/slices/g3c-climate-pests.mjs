// Slice G3c: farming challenges: climate change, pests and diseases (ZIMSEC 7.9.6).
import { concept, P, geographyLevels } from "../lib.mjs";

concept("geo.agriculture.climate-pests", { file: "agriculture/climate-pests", keyPrefix: "agriculture.climate-pests" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pest is the caterpillar of a moth that attacks **maize** leaves and cobs?",
    options: [
      ["Fall armyworm", "Correct: fall armyworm larvae feed on maize and other cereals."],
      ["Quelea bird", "Quelea are birds that eat small grains."],
      ["Brown ear tick", "Ticks attack livestock, not maize."],
      ["Tsetse fly", "Tsetse flies bite animals and spread trypanosomiasis."],
    ],
    answer: "A",
    explanation: "Fall armyworm was first reported in southern Africa in 2016 and is now a major maize pest.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which crops do **quelea birds** mainly damage?",
    options: [
      ["Small grains such as sorghum, millets and wheat", "Correct: huge flocks eat ripening small grains."],
      ["Root crops such as sweet potatoes", "Quelea eat seeds, not roots."],
      ["Tea bushes in the Eastern Highlands", "Tea is not a quelea target."],
      ["Pine and eucalyptus trees in the plantations", "Quelea do not damage trees."],
    ],
    answer: "A",
    explanation: "Quelea are seed-eaters; small-grain farmers in dry regions suffer most.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which measure is an example of climate change **adaptation** by farmers?",
    options: [
      ["Growing drought-tolerant sorghum instead of maize", "Correct: it helps the farmer cope with drier conditions."],
      ["Reducing the burning of grassland to cut emissions", "This reduces causes, so it is mitigation."],
      ["Planting a woodlot to absorb carbon dioxide", "Storing carbon is mitigation."],
      ["Using less fuel in farm vehicles", "Cutting emissions is mitigation."],
    ],
    answer: "A",
    explanation: "Adaptation copes with effects; mitigation tackles causes.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is **January disease** (theileriosis) in cattle mainly spread?",
    options: [
      ["By the brown ear tick", "Correct: the tick transmits the parasite, especially in the rainy season."],
      ["By mosquitoes", "Mosquitoes spread malaria, not January disease."],
      ["By contaminated maize meal", "It is a tick-borne disease."],
      ["By quelea birds", "Quelea are crop pests, not disease vectors for cattle."],
    ],
    answer: "A",
    explanation: "Regular dipping to kill ticks is the main control.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which practice is part of **conservation agriculture** such as Pfumvudza/Intwasa?",
    options: [
      ["Planting in basins and covering the soil with mulch", "Correct: minimum tillage and mulch conserve moisture and soil."],
      ["Deep ploughing of the whole field every year", "Conservation agriculture disturbs the soil as little as possible."],
      ["Burning crop residues after harvest", "Residues are kept as mulch, not burnt."],
      ["Growing the same crop on the same plot every year", "Crop rotation is a principle of conservation agriculture."],
    ],
    answer: "A",
    explanation: "Minimum tillage, mulch cover and rotation are its three principles.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does an outbreak of **foot-and-mouth disease** harm Zimbabwe's beef industry?",
    options: [
      ["Importing countries ban beef from affected areas", "Correct: export markets close and cattle movements are restricted."],
      ["It makes beef sweeter and less popular", "The disease does not change the taste of beef."],
      ["It only affects goats and sheep", "Cattle are badly affected."],
      ["It increases the number of cattle for sale", "Movement controls reduce sales."],
    ],
    answer: "A",
    explanation: "The disease causes weight loss and lameness, and export bans cut ranch income.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the **main disadvantage** of relying only on chemical pesticides to control fall armyworm?",
    options: [
      ["Pests can become resistant and natural enemies are killed", "Correct: heavy spraying selects resistant pests and removes predators."],
      ["Chemicals take several years to start working", "Most pesticides act within days."],
      ["Chemicals raise soil fertility so much that crops are harmed", "Pesticides do not add fertility."],
      ["Chemicals attract more quelea birds", "There is no such effect."],
    ],
    answer: "A",
    hints: ["What happens to insects that survive spraying?", "What happens to the pest's predators?"],
    explanation: "Integrated pest management combines manual, biological and chemical methods to avoid these problems.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rainfall records show that the rains in a fictional district now start about three weeks later than they did 30 years ago. Which farming response is **most suitable**?",
    options: [
      ["Plant short-season, early-maturing varieties", "Correct: they can mature in a shorter rainy season."],
      ["Plant long-season maize much earlier, before the rains", "Seed planted into dry soil may fail to germinate or die."],
      ["Increase the cattle herd to use the extra grass", "A shorter season means less grass, not more."],
      ["Stop all crop rotation", "Rotation helps soil health; stopping it does not address the shorter season."],
    ],
    answer: "A",
    hints: ["A later start means a shorter growing season."],
    explanation: "Shorter seasons call for early-maturing varieties and moisture conservation.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Dipping cattle in an acaricide is a chemical method of controlling ticks.",
    answer: true,
    explanation: "True. Acaricides kill ticks that spread diseases such as January disease and redwater.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Planting a woodlot to absorb carbon dioxide is an example of climate change adaptation.",
    answer: false,
    explanation: "False. Storing carbon reduces a cause of climate change, so it is mitigation.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each control method with its type.",
    pairs: [
      ["Hand-picking caterpillars from maize", "Manual"],
      ["Encouraging parasitic wasps that attack armyworm", "Biological"],
      ["Spraying a quelea roost with avicide", "Chemical"],
    ],
    explanation: "Manual methods use labour; biological methods use living organisms; chemical methods use pesticides.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Conservation agriculture rests on three principles: minimum {{blank:a}}, permanent soil cover with {{blank:b}}, and crop {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["tillage"], choices: ["tillage", "rainfall", "grazing", "spraying"] },
      { id: "b", accepted: ["mulch"], choices: ["mulch", "plastic", "concrete", "ash"] },
      { id: "c", accepted: ["rotation"], choices: ["rotation", "burning", "monoculture", "irrigation"] },
    ],
    explanation: "These principles conserve moisture, reduce erosion and improve soil fertility.",
  });
  b.num({
    d: 2, skill: "APPLICATION", unit: "%",
    stem: "A farmer expected 4.0 t/ha of maize, but fall armyworm reduced the yield to 3.0 t/ha (fictional figures). What is the percentage loss?",
    value: 25, tol: 0.05,
    wrong: [33.3, 1],
    explanation: "Loss = 1.0 t/ha; 1.0 ÷ 4.0 × 100 = 25%.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", unit: "°C",
    stem: "A fictional station's mean January temperature was 22.4 °C in 1981–1990 and 23.5 °C in 2011–2020. If it continues to rise at the same rate per decade, what would the mean be in 2041–2050?",
    value: 24.6, tol: 0.05,
    wrong: [23.5, 25.7],
    hints: ["Work out the rise over the three decades between the two periods.", "Find the rise per decade, then add three more decades."],
    workedSolution: "1. Rise from 1981–1990 to 2011–2020 = 23.5 − 22.4 = 1.1 °C over 3 decades.\n2. Rise per decade ≈ 0.367 °C.\n3. 2041–2050 is 3 decades later: 23.5 + 1.1 = 24.6 °C.",
    explanation: "The same 1.1 °C rise over the next three decades gives 24.6 °C.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe **four** effects of climate change on farming in Zimbabwe.",
    points: [
      "Higher temperatures increase evaporation and crop water stress / heat stress in livestock.",
      "Later, more erratic rains and longer mid-season dry spells cause crop failure.",
      "More frequent droughts reduce grazing and water, causing livestock deaths and food shortages.",
      "Stronger storms, floods or cyclones (e.g. Idai, 2019) destroy crops and erode soil / pests spread / natural regions shift.",
    ],
    modelAnswer: "Higher temperatures dry out soils and stress crops and cattle. Rains start later and dry spells are longer, so maize often fails. Droughts such as those of El Niño years kill grazing and cattle, and storms such as Cyclone Idai wash away fields.",
    explanation: "Link each climate change to a farming effect.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Give one control from each group."],
    stem: "Suggest a manual, a biological and a chemical method of controlling **fall armyworm**.",
    points: [
      "Manual: hand-picking or crushing larvae / early planting / destroying crop residues.",
      "Biological: encouraging natural enemies (parasitic wasps, birds, ants) / intercropping / tolerant varieties.",
      "Chemical: spraying a recommended insecticide into the maize funnel when infestation is found.",
    ],
    modelAnswer: "Hand-pick and crush the caterpillars; encourage natural enemies such as parasitic wasps and ants; spray an approved insecticide into the funnel when many plants are infested.",
    explanation: "One correct method from each group.",
  });
  b.struct({
    d: 3, skill: "ANALYSIS", secs: 660,
    hints: ["Mean = total ÷ number of years.", "Count the years below the threshold."],
    stem: "Table 1 shows rainfall (mm) and maize yield (t/ha) in a fictional communal area over six seasons (fictional data).\n\n| Season | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Rainfall (mm) | 720 | 510 | 690 | 380 | 640 | 460 |\n| Maize yield (t/ha) | 1.8 | 0.9 | 1.6 | 0.3 | 1.5 | 0.7 |",
    parts: [
      P.num({ label: "(a)", unit: "mm", stem: "Calculate the mean rainfall over the six seasons.", value: 566.6666666666666, answer: "567", tol: 0.5, wrong: [3400, 340], explanation: "(720 + 510 + 690 + 380 + 640 + 460) ÷ 6 = 3,400 ÷ 6 = 566.7 mm (567 mm)." }),
      P.num({ label: "(b)", stem: "In how many seasons was the maize yield below 1.0 t/ha?", value: 3, wrong: [2, 4], explanation: "Seasons 2 (0.9), 4 (0.3) and 6 (0.7): 3 seasons." }),
      P.mcq({
        label: "(c)", stem: "What relationship does the table show?",
        options: [
          ["Higher rainfall is linked with higher maize yields", "Correct: the wettest seasons have the highest yields and the driest the lowest."],
          ["Higher rainfall is linked with lower maize yields", "The opposite is shown."],
          ["Rainfall has no link with maize yield", "Yields clearly rise and fall with rainfall."],
          ["Yields rose steadily every season", "Yields go up and down from season to season."],
        ],
        answer: "A", explanation: "A positive relationship: rain-fed maize depends on rainfall.",
      }),
      P.manual({
        label: "(d)", marks: 3, stem: "Suggest **three** ways farmers in this area could adapt to the variable rainfall.",
        points: ["Grow drought-tolerant crops (sorghum, millets) or early-maturing maize.", "Use conservation agriculture / mulching / planting basins to hold moisture.", "Harvest water (tied ridges, small dams) or irrigate / diversify into livestock and gardens."],
        modelAnswer: "Plant sorghum and millet alongside short-season maize, use planting basins with mulch to keep moisture, and build tied ridges and small dams to harvest rainwater.",
        explanation: "Adaptation reduces the risk of crop failure in dry seasons.",
      }),
    ],
    explanation: "Analyse rainfall and yield data and suggest adaptations.",
  });
  b.struct({
    d: 3, skill: "UNDERSTANDING", secs: 540,
    hints: ["Think about how ticks and disease spread through a herd."],
    stem: "A fictional village's dip tank has been out of use for one rainy season. Many cattle are carrying ticks, and several have died of a fever.",
    parts: [
      P.short({ label: "(a)", stem: "Name a tick-borne cattle disease that causes high fever and death, most common in the rainy season.", accepted: ["january disease", "theileriosis", "east coast fever", "january disease (theileriosis)"], wrong: ["foot-and-mouth disease"], explanation: "January disease (theileriosis) is spread by the brown ear tick." }),
      P.manual({
        label: "(b)", marks: 2, stem: "Explain why the dip tank being out of use has caused these deaths.",
        points: ["Without regular dipping, ticks are not killed and multiply on the cattle.", "More ticks spread tick-borne diseases such as January disease, which kill cattle."],
        modelAnswer: "With no dipping, ticks survived and multiplied, and they spread January disease through the herd.",
        explanation: "Dipping breaks the tick-disease cycle.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Describe **three** effects of cattle deaths on the households in the village.",
        points: ["Loss of draught power for ploughing, so less land is planted.", "Loss of milk, meat and manure / lower food security.", "Loss of wealth and income (cattle as savings, lobola, sales)."],
        modelAnswer: "Families lose oxen for ploughing, so they plant less; they lose milk and manure; and they lose their main store of wealth.",
        explanation: "Cattle have many roles in communal farming.",
      }),
    ],
    explanation: "Apply knowledge of livestock disease and its control.",
  });
  b.ext({
    d: 4, skill: "EVALUATION", marks: 7,
    stem: "\"Conservation agriculture is the most effective way for Zimbabwe's smallholder farmers to adapt to climate change.\" Discuss.",
    hints: ["Explain how conservation agriculture works and its benefits.", "Compare it with other adaptations and consider its limits."],
    points: [
      "Conservation agriculture (Pfumvudza/Intwasa): minimum tillage, mulch, rotation, planting basins.",
      "It conserves soil moisture through dry spells and reduces erosion, so yields are more stable.",
      "It is low-cost and suits small plots; it also stores carbon (mitigation benefit).",
      "Limits: labour-intensive (digging basins, finding mulch); mulch competes with livestock feed; benefits build up over several seasons.",
      "It cannot overcome a complete drought; other measures are needed.",
      "Alternatives: drought-tolerant crops and breeds, irrigation and water harvesting, diversification, insurance and early warning.",
      "Judgement: very effective as part of a package, but no single measure is enough.",
    ],
    levels: geographyLevels(7),
    modelAnswer: "Conservation agriculture, promoted through Pfumvudza/Intwasa, keeps the soil covered with mulch, avoids ploughing and rotates crops in small plots with planting basins. This holds moisture during mid-season dry spells, reduces erosion and gives more stable yields, at low cost, and it also stores carbon. However, digging basins is hard work, mulch is often eaten by livestock, and the benefits build up over several seasons. In a severe drought, such as in El Niño years, even well-mulched maize may fail. Other adaptations are also important: drought-tolerant sorghum and millets, hardy cattle and goats, water harvesting, small irrigation schemes and diversification into gardens and livestock. Conservation agriculture is one of the most effective and affordable measures for smallholders, but it works best combined with these other strategies.",
    explanation: "Explain, weigh limits and alternatives, then judge.",
  });

  b.card("DEFINITION", "**Mitigation**", "Reducing the causes of climate change, e.g. planting trees, less burning.", undefined);
  b.card("DEFINITION", "**Adaptation**", "Coping with the effects of climate change, e.g. drought-tolerant crops, water harvesting.", undefined);
  b.card("DEFINITION", "**Conservation agriculture**", "Minimum tillage, permanent mulch cover and crop rotation.", "Promoted as Pfumvudza/Intwasa.");
  b.card("FACT", "Fall armyworm", "Moth caterpillar that attacks maize; first reported in southern Africa in 2016.", undefined);
  b.card("FACT", "Quelea birds", "Huge flocks that eat ripening sorghum, millets and wheat.", undefined);
  b.card("FACT", "January disease", "Theileriosis: tick-borne cattle disease spread by the brown ear tick; controlled by dipping.", undefined);
  b.card("FACT", "Foot-and-mouth disease", "Viral disease of cattle; leads to movement controls and beef export bans.", undefined);
  b.card("CONCEPT", "Methods of pest control", "Manual/cultural, biological (natural enemies, resistant varieties) and chemical (pesticides, acaricides).", "Integrated pest management combines them.");
  b.card("CONCEPT", "Effects of climate change on farming", "Heat stress, erratic rains, dry spells, droughts, storms, shifting natural regions, changing pests.", undefined);
});
