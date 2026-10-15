// W2b: bio.vegetation-biomes (ZIMSEC only; items are tagged to ZIMSEC automatically).
// Computed: savanna station total 850 mm, Nov-Mar 745 mm = 88%, 5 dry months, range 9; NPP 2200/90 = 24; savanna biomass 4/45 = 8.9%;
// rainforest station total and range; table of biomes.
import { concept, P, geographyLevels, chk, rnd, sum, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const M = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SR = [190, 170, 100, 35, 8, 2, 1, 2, 12, 45, 110, 175];
const ST = [24, 24, 23, 21, 18, 15, 15, 17, 21, 24, 24, 24];
const STAB = tbl(["Month", ...M], [["Rainfall (mm)", ...SR], ["Mean temperature (°C)", ...ST]]);
const sTotal = chk(sum(SR), 850);
const wetSum = chk(SR[10] + SR[11] + SR[0] + SR[1] + SR[2], 745);
const wetPct = rnd((wetSum / sTotal) * 100, 0, 88, "wetPct");
const dryMonths = chk(SR.filter((x) => x < 25).length, 5);
const sRange = chk(Math.max(...ST) - Math.min(...ST), 9);
const nppRatio = 2200 / 90; chk(Math.round(nppRatio), 24);
const bioPct = rnd((4 / 45) * 100, 1, 8.9, "bioPct");

// Rainforest station (illustrative)
const RR = [230, 210, 250, 260, 240, 150, 100, 120, 190, 270, 280, 250];
const RT = [26, 26, 26, 26, 26, 25, 25, 25, 26, 26, 26, 26];
const RTAB = tbl(["Month", ...M], [["Rainfall (mm)", ...RR], ["Mean temperature (°C)", ...RT]]);
const rTotal = chk(sum(RR), 2550);
const rRange = chk(Math.max(...RT) - Math.min(...RT), 1);
const driest = chk(Math.min(...RR), 100);
const rWettest = chk(Math.max(...RR), 280);
const rDiff = chk(rWettest - driest, 180);

const BIO = tbl(["Biome", "Biomass (kg per m²)", "NPP (g per m² per year)"], [["Tropical rainforest", 45, "2 200"], ["Savanna", 4, 900], ["Hot desert", 0.7, 90]]);
const sPct = rnd((900 / 2200) * 100, 0, 41, "sPct");

concept("ageo.bio.vegetation-biomes", { file: "bio/vegetation-biomes", keyPrefix: "bio.vegetation-biomes" }, (b) => {
  mc(b, 1, "RECALL", "What is a **biome**?", [
    ["A large ecosystem defined by its dominant vegetation and climate", "Correct: examples are savanna and tropical rainforest."],
    ["The total mass of living material in one hectare of land", "That describes biomass."],
    ["A single food chain within a pond or stream", "A food chain is much smaller than a biome."],
    ["A layer of soil rich in humus beneath the surface", "That is a soil horizon, not a biome."],
  ], "A **biome** is a large-scale ecosystem identified by its vegetation and climate.");
  mc(b, 1, "RECALL", "Which of these is an **edaphic** factor that affects vegetation?", [
    ["Soil depth and drainage", "Correct: edaphic means relating to the soil."],
    ["The mean annual temperature", "Temperature is a climatic factor."],
    ["Grazing by elephants and cattle", "Grazing is a biotic factor."],
    ["The angle and direction of a slope", "Slope and aspect belong to relief."],
  ], "Edaphic factors are soil factors: depth, texture, drainage, pH and nutrients.");
  mc(b, 2, "UNDERSTANDING", "Which statement about biomass and net primary productivity (NPP) is correct?", [
    ["Biomass is a store of living material; NPP is a rate of growth", "Correct: one is a store and the other a flow."],
    ["Biomass is a rate in g per m² per year; NPP is a mass in kg", "The two definitions are reversed."],
    ["Biomass and NPP are two names for the same measurement", "They measure different things, a store and a flow."],
    ["NPP measures the total animal mass in an ecosystem", "NPP concerns plant growth, not animal mass."],
  ], "**Biomass** is a store (kg per m²); **NPP** is a flow (g per m² per year).");
  mc(b, 2, "UNDERSTANDING", "Why do many savanna trees have thick, corky bark?", [
    ["It insulates living tissue from grass fires", "Correct: fire is frequent in the dry season."],
    ["It stores large amounts of water for the dry season", "Water storage is a feature of baobab trunks, not bark thickness in general."],
    ["It helps the tree to shed rain quickly", "Shedding rain is the job of drip tips in rainforest leaves."],
    ["It lets the tree lose heat in cold nights", "Savanna nights are not cold enough to need this."],
  ], "Thick bark protects the cambium from the heat of savanna fires.");
  mc(b, 2, "UNDERSTANDING", "Which feature is an adaptation to **water shortage** in a hot desert plant?", [
    ["Spines or very small leaves that reduce water loss", "Correct: less leaf area means less transpiration."],
    ["Buttress roots that support a tall trunk", "Buttress roots are a rainforest feature on shallow soils."],
    ["Drip tips that carry rain off the leaf", "Drip tips help a wet environment, not a dry one."],
    ["Leaves that are shed to avoid winter frost", "That is a temperate deciduous adaptation."],
  ], "Small leaves, spines, waxy cuticles and water storage reduce loss in deserts.");
  mc(b, 3, "APPLICATION", "A station has 2 400 mm of rain a year, spread through all twelve months, and a mean temperature of 26 °C every month. Which biome is most likely?", [
    ["Tropical rainforest", "Correct: warm all year with rain in every month."],
    ["Savanna", "Savanna has a distinct dry season."],
    ["Hot desert", "A desert receives less than about 250 mm."],
    ["Temperate deciduous forest", "Temperate stations have a cool season."],
  ], "High, evenly spread rainfall and constant warmth indicate **tropical rainforest**.", { hints: ["Check for a dry season and a cool season."] });
  mc(b, 3, "ANALYSIS", "Two hillsides have the same climate but different vegetation. One is deep, moist soil and the other thin, stony soil. Which factor best explains the difference?", [
    ["Edaphic factors: soil depth and water retention", "Correct: soil differs while climate is the same."],
    ["Climatic factors: temperature, sunshine and rainfall", "The question says the climate is the same."],
    ["Global position: distance from the equator or the sea", "Both hillsides lie at the same latitude."],
    ["Sea currents: warm water offshore", "Ocean currents act at much larger scales."],
  ], "With the same climate, **soil** (an edaphic factor) explains the local difference.", { hints: ["Climate is the same, so look for a local factor."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Tropical rainforest has the highest biomass and productivity of the four biomes in this lesson.", answer: true,
    feedbackTrue: "Correct: warmth, light and water are available all year.",
    feedbackFalse: "Not so: the rainforest leads on both measures.",
    explanation: "Rainforest: about 45 kg per m² biomass and about 2 200 g per m² per year NPP." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Savanna has a high biomass because grasses and trees accumulate large stores of material.", answer: false,
    feedbackFalse: "Correct: grazing and annual fires keep the savanna biomass low, even though growth is fast.",
    feedbackTrue: "Not so: savanna biomass is only about 4 kg per m².",
    explanation: "Savanna productivity is moderate to high but biomass is low because material is eaten or burnt." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "A leaf with a {{blank:a}} tip sheds water in the rainforest. {{blank:b}} roots help tall rainforest trees to stand on shallow soil. In the hot desert a {{blank:c}} stores water in its stem.",
    blanks: [
      { id: "a", accepted: ["drip"], choices: ["drip", "spiny", "waxy"] },
      { id: "b", accepted: ["Buttress"], choices: ["Buttress", "Tap", "Aerial"] },
      { id: "c", accepted: ["succulent"], choices: ["succulent", "liana", "epiphyte"] },
    ], explanation: "Drip tips, buttress roots and succulent stems are standard adaptations." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each biome to a typical feature.",
    pairs: [
      ["Tropical rainforest", "Several layers and very high species diversity"],
      ["Savanna", "Grassland with scattered trees and a dry season"],
      ["Hot desert", "Rainfall below about 250 mm and a large daily temperature range"],
      ["Temperate deciduous forest", "Trees lose their leaves in winter"],
    ], explanation: "Each biome has a characteristic climate and structure." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "mm",
    stem: `Illustrative savanna station (data invented for this exercise):\n\n${STAB}\n\nCalculate the annual rainfall, in mm.`,
    hints: ["Add the twelve monthly values."],
    value: sTotal, wrong: [745, 4250],
    explanation: "190 + 170 + 100 + 35 + 8 + 2 + 1 + 2 + 12 + 45 + 110 + 175 = **850 mm**. The value 745 mm is only the wet-season (November to March) total." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: `Use the savanna table:\n\n${STAB}\n\nCalculate the percentage of the annual rainfall that falls from November to March, to the nearest whole number.`,
    hints: ["Add the five wet-season months first.", "Divide by the annual total, then multiply by 100."],
    value: wetPct, dp: 0, wrong: [745, 12],
    explanation: "Nov–Mar: 110 + 175 + 190 + 170 + 100 = 745 mm. 745 ÷ 850 × 100 = **88%**. Dividing by 745 instead of 850 is a common slip." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "times", dp: 0,
    stem: "The net primary productivity of a tropical rainforest is about 2 200 g per m² per year and of a hot desert about 90 g per m² per year. About how many times greater is the rainforest value? Give the nearest whole number.",
    hints: ["Divide the larger value by the smaller one."],
    value: nppRatio, wrong: [2110, 41],
    explanation: "2 200 ÷ 90 = 24.4, which is **24** to the nearest whole number. Subtracting (2 110) gives a difference, not a ratio." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the type of plant, such as a cactus, that stores water in its stem or leaves.",
    accepted: ["succulent", "a succulent", "succulents"], wrong: ["epiphyte"],
    explanation: "A **succulent** stores water in fleshy tissue." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the layer of tall trees that stands above the main canopy in a tropical rainforest.",
    accepted: ["emergent", "emergents", "emergent layer", "the emergent layer", "emergent trees"], wrong: ["understorey"],
    explanation: "The **emergent** layer rises above the continuous canopy." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how altitude affects the vegetation on a mountain in the Eastern Highlands.",
    hints: ["Think about temperature and what happens to it as height increases."],
    points: [
      "Temperature falls with height, by about 6.5 °C per 1 000 m on average.",
      "Cooler air shortens the growing season and slows photosynthesis, so trees become smaller or change in type.",
      "Higher slopes may also be wetter or more exposed to wind and have thinner soils, so the vegetation changes from forest to grassland and heath.",
    ],
    modelAnswer: "Temperature falls by about 6.5 °C for every 1 000 m of height, so the growing season is shorter and photosynthesis slower. Forest therefore gives way to smaller plants, and thin, exposed upper slopes carry grassland or heath.",
    explanation: "Altitude changes temperature and exposure, so vegetation zones change with height." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how plants are adapted to survive the dry season in the savanna.",
    hints: ["Choose two adaptations and give the reason for each."],
    points: [
      "Many trees drop their leaves in the dry season, which reduces water loss by transpiration.",
      "Deep taproots reach water stored far below the surface, so the plant keeps a supply when the topsoil is dry.",
      "Grasses die back above ground but regrow from buds or roots at or below ground level when the rains return.",
      "Thick bark protects against dry-season fires, and baobabs store water in their trunks.",
    ],
    modelAnswer: "Many savanna trees shed their leaves in the dry season, which cuts water loss. Deep taproots reach water below the dry topsoil. Grasses die back but regrow from buds at ground level when the rains return, and thick bark protects trees from dry-season fires.",
    explanation: "Each adaptation reduces water loss, finds water or survives fire." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative rainforest station (data invented for this exercise):\n\n${RTAB}\n\nDescribe the climate shown.`,
    hints: ["Quote the total rainfall, the wettest and driest months and the temperature range."],
    points: [
      "Annual rainfall is very high: 2 550 mm.",
      "Every month receives at least 100 mm, with no dry season; the driest month is July (100 mm) and the wettest November (280 mm).",
      "Temperature is high all year, 25–26 °C.",
      "The annual temperature range is very small, only 1 °C.",
    ],
    modelAnswer: "The station has a total of 2 550 mm of rain, with every month receiving at least 100 mm (July is the driest at 100 mm; November the wettest at 280 mm). Mean temperature is 25–26 °C all year, so the range is only 1 °C.",
    explanation: "Describe totals, seasonality and range with quoted figures." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Illustrative climate data for a station in a tropical rainforest (data invented for this exercise):\n\n${RTAB}`,
    hints: ["Add all twelve months for the total.", "Subtract the driest month from the wettest month."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the annual rainfall, in mm.", value: rTotal, unit: "mm", wrong: [212, 280],
        explanation: "230 + 210 + 250 + 260 + 240 + 150 + 100 + 120 + 190 + 270 + 280 + 250 = 2 550 mm." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the difference between the wettest and the driest month, in mm.", value: rDiff, unit: "mm", wrong: [100, 380],
        explanation: "280 − 100 = 180 mm." }),
      P.mcq({ label: "(c)", stem: "Which statement about temperature is correct?", options: [
        ["The annual range is only 1 °C", "Correct: monthly means are 25 °C or 26 °C."],
        ["The annual range is about 10 °C", "That is not shown by the table."],
        ["Mean temperature falls below 15 °C in July", "July is 25 °C."],
        ["The coolest month has frost", "Temperatures are far too high for frost."],
      ], answer: "A", explanation: "26 − 25 = 1 °C." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how this climate leads to a very high biomass in the forest.",
        points: [
          "Warmth and light all year allow photosynthesis in every month.",
          "Rain in every month means water is never a limit on growth.",
          "A continuous growing season produces a large, tall, layered plant cover that stores a lot of organic matter.",
        ],
        modelAnswer: "Temperatures of 25–26 °C and rain in every month mean there is no season when growth must stop. Photosynthesis continues all year and the plants accumulate a large, tall, layered store of living material.",
        explanation: "No limiting factor means continuous growth and a large store." }),
    ], explanation: "Calculate from the table, interpret the pattern, then explain the link to biomass." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Typical, rounded values for three biomes:\n\n${BIO}`,
    hints: ["For a percentage, divide the part by the whole.", "Link productivity to the supply of water."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the biomass of savanna as a percentage of the biomass of tropical rainforest, to 1 decimal place.", value: bioPct, dp: 1, unit: "%", wrong: [11.3, 88.9],
        explanation: "4 ÷ 45 × 100 = 8.9%. Dividing 45 by 4 gives the ratio 11.25, not the percentage." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the NPP of savanna as a percentage of that of tropical rainforest, to the nearest whole number.", value: sPct, dp: 0, unit: "%", wrong: [244, 59],
        explanation: "900 ÷ 2 200 × 100 = 40.9, which is 41%." }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why savanna biomass is a much smaller percentage of the rainforest value than its productivity is.",
        points: [
          "Savanna NPP is 41% of the rainforest value, but biomass only 8.9%, so growth is fast compared with storage.",
          "Fire burns the grass and many seedlings each year, which removes stored material.",
          "Grazing and browsing animals eat much of the new growth before it accumulates.",
          "The dry season stops growth and trees are smaller and more widely spaced than in the rainforest, so less is stored.",
        ],
        modelAnswer: "Savanna NPP is 41% of the rainforest value, but biomass is only 8.9%. Fire burns grass and seedlings every year and grazers eat much of the new growth, so little accumulates. The dry season also limits tree size and density.",
        explanation: "Fire, grazing and the dry season stop biomass building up." }),
    ], explanation: "Calculate two percentages and explain the difference between a store and a flow." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the importance of climate compared with other factors in explaining the distribution of vegetation in Zimbabwe.",
    hints: ["Give climate first (temperature, rainfall seasons), then soil, relief and people.", "End with a judgement."],
    points: [
      "Rainfall and its seasonal pattern largely decide whether vegetation is woodland, savanna or semi-desert, as natural regions I to V show.",
      "Temperature falls with altitude, so the cool, wet Eastern Highlands support evergreen forest and montane grassland while the hot lowveld has mopane.",
      "Soil: sandy granite soils carry miombo woodland, clay soils carry mopane, and waterlogged dambos carry grass and sedges.",
      "Relief: slope and aspect change moisture and soil depth, so a dwala has lichens and thin soils while footslopes have woodland.",
      "Biotic factors: fire, grazing and browsing keep much of the savanna open, and elephants thin woodland.",
      "People: clearance for farming, firewood and settlement have replaced natural vegetation over large areas.",
      "Interactions: climate sets the broad zones, but local soil, relief and people explain the pattern inside each zone.",
      "Judgement: climate is the most important at the national scale, but at the local scale soils, fire and human activity are often decisive.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Climate is the main control at the national scale. Rainfall and its seasonality decide whether the vegetation is woodland, savanna or dry bush, and falling temperature with altitude explains the evergreen forest and grassland of the Eastern Highlands compared with mopane in the hot lowveld. At a smaller scale soil matters: sandy granite soils carry miombo, clays carry mopane and waterlogged dambos carry grass. Relief changes soil depth and moisture, so a dwala has only lichens and thin soil. Fire and grazing keep much savanna open, and people have cleared large areas for farming and fuel. I conclude that climate is the most important at the national scale, but soils, relief, fire and human activity are often decisive within each zone.",
    wordLimit: { max: 300 }, explanation: "Weigh climate against edaphic, relief and biotic factors at different scales." });

  b.card("DEFINITION", "Biome", "A large-scale ecosystem identified by its dominant vegetation and its climate, such as savanna or tropical rainforest.");
  b.card("CONCEPT", "Factors affecting vegetation distribution", "Climatic (temperature, rainfall, light), edaphic (soil), relief (altitude, slope, aspect) and biotic (competition, grazing, fire, people).");
  b.card("DEFINITION", "Biomass versus NPP", "Biomass is a store of living material (kg per m²); net primary productivity is the rate of new growth (g per m² per year).");
  b.card("FACT", "Rainforest layers", "Emergent trees, canopy, understorey, shrub layer and ground layer.");
  b.card("CONCEPT", "Savanna adaptations", "Thick fire-resistant bark, deep taproots, leaf-drop in the dry season, grasses that regrow from ground-level buds, and migration of grazers.");
  b.card("CONCEPT", "Hot desert plant adaptations", "Succulents store water; spines and small or waxy leaves reduce loss; wide shallow roots; ephemerals germinate only after rain.");
  b.card("FACT", "Typical NPP of rainforest and desert", "Tropical rainforest about 2 200 g per m² per year; hot desert about 90 g per m² per year (textbook values, rounded).");
  b.card("CONCEPT", "Why altitude changes vegetation", "Temperature falls about 6.5 °C per 1 000 m, shortening the growing season and changing the plant types.");
  b.card("FACT", "Where hot deserts occur", "Around 15–30° from the equator, where air sinks and rainfall is below about 250 mm.");
});
