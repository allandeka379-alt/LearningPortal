// W3a: tropical.vegetation-soils (Cambridge only, A Level Paper 3 option 7). Data are illustrative (invented for this exercise); every number is computed in code.
import { concept, P, geographyLevels, chk, rnd, sum, CAM } from "../lib.mjs";
import { mc, tbl } from "../tables/w3a-_q.mjs";

// Singles
const P1 = { biomass: 2100, litter: 80, soil: 520 };
const tot1 = chk(P1.biomass + P1.litter + P1.soil, 2700);
const soilPct = rnd((P1.soil / tot1) * 100, 1, 19.3, "soilPct");
const turnDays = rnd((1.2 / 8) * 365, 0, 55, "turnDays");
const turnYrs = rnd(2.4 / 3.0, 1, 0.8, "turnYrs");
// Struct 1: red-brown earth profile
const PROF = [["0–15", 3.0, 6.1, 12], ["15–60", 1.0, 6.0, 30], ["60–150", 0.4, 5.9, 34]];
const PROFTAB = tbl(["Horizon depth (cm)", "Organic matter (%)", "pH", "Clay (%)"], PROF.map((r) => [r[0], r[1].toFixed(1), r[2].toFixed(1), r[3]]));
const clayTimes = rnd(30 / 12, 1, 2.5, "clayTimes");
// Struct 2: yields after clearing
const YLD = [3.2, 2.4, 1.5, 0.9];
const yFall = rnd(((YLD[0] - YLD[3]) / YLD[0]) * 100, 1, 71.9, "yFall");
const YTAB = tbl(["Year after clearing", "Maize yield (t/ha)"], YLD.map((y, i) => [i + 1, y.toFixed(1)]));

concept("ageo.tropical.vegetation-soils", { file: "tropical/vegetation-soils", keyPrefix: "tropical.vegetation-soils", applies: CAM }, (b) => {
  mc(b, 1, "RECALL", "Which layer of the rainforest receives the most sunlight?", [
    ["The emergent trees", "Correct: they stand above the canopy in full light."],
    ["The shrub layer near the ground", "The shrub layer is shaded by the trees above it."],
    ["The forest floor beneath the trees", "Only a few per cent of the light reaches the floor."],
    ["The understorey below the canopy", "The understorey grows in shade beneath the canopy."],
  ], "The **emergent trees** rise above the canopy and receive full light.");
  mc(b, 2, "UNDERSTANDING", "What is the function of drip-tip leaves in a tropical rainforest?", [
    ["They shed water quickly from the leaf surface", "Correct: this reduces fungal growth and helps gas exchange."],
    ["They store water for use in the dry season", "That is a feature of succulents; the forest has no dry season."],
    ["They trap fog so that the plant can absorb it", "Fog-trapping is a desert adaptation, not a rainforest one."],
    ["They protect the leaf from attack by fire", "Fire resistance is a savanna feature and not a rainforest one."],
  ], "Drip tips **shed water quickly** in a climate with heavy rain.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which feature helps savanna trees to survive regular grass fires?", [
    ["Thick bark that protects the living tissue", "Correct: bark insulates the trunk, and buds can re-sprout afterwards."],
    ["Large thin leaves that evaporate heat quickly", "Large thin leaves would lose water and burn easily."],
    ["Shallow roots that spread near the surface", "Shallow roots would be damaged by the heat."],
    ["Evergreen leaves that stay on all year round", "Evergreen leaves would add to the fuel and increase the risk."],
  ], "**Thick bark** protects the trunk and buds in a fire.");
  mc(b, 2, "RECALL", "What is a plagioclimax?", [
    ["A community whose development is arrested by human activity", "Correct: for example, grassland kept by regular burning or grazing."],
    ["A community in equilibrium with the climate of the region", "That is the climatic climax."],
    ["A community held back by natural fires or grazing animals", "That is a subclimax."],
    ["A pioneer community on newly exposed rock or sand", "That is an early seral stage, not a climax of any kind."],
  ], "A plagioclimax is **human-induced**.");
  mc(b, 3, "ANALYSIS", "Why are oxisols infertile even though they lie beneath dense rainforest?", [
    ["Leaching removes bases and most nutrients are held in the biomass", "Correct: the soil store is small and the forest recycles what it has."],
    ["The rainfall is too low to weather the parent rock deeply", "Rainfall is very high and the weathering is deep."],
    ["Dead leaves accumulate for many years and are not broken down", "Litter decomposes within weeks in the rainforest."],
    ["The soil is thin and quickly saturated with calcium and potassium", "Oxisols are very deep and are poor in calcium and potassium."],
  ], "Heavy rain **leaches** bases and the nutrients are stored in the vegetation.", { hints: ["Where are most nutrients stored in a rainforest?"] });
  mc(b, 3, "ANALYSIS", "In which way does a tropical red earth under savanna differ from an oxisol under rainforest?", [
    ["It has a thicker humus layer and clearer horizons", "Correct: grass roots supply humus and leaching is weaker."],
    ["It is deeper, with more intense leaching of silica", "Oxisols are deeper and more intensely leached."],
    ["It has a lower content of iron oxides and kaolinite", "Both soils contain iron oxides and kaolinite."],
    ["It forms in a climate that has no dry season at all", "Savanna soils form where there is a dry season."],
  ], "Savanna soils have **more humus** and **clearer horizons** than oxisols.", { hints: ["Think of the effect of the dry season on leaching."] });
  mc(b, 3, "APPLICATION", "A rainforest plot is cleared by burning and used for crops. Why does yield often fall steeply after two or three years?", [
    ["The nutrients were stored in the biomass and have been removed", "Correct: the soil has little reserve and heavy rain leaches the rest."],
    ["The ash left by the fire makes the soil too fertile for crops", "Ash gives a short-term boost; it does not harm crops."],
    ["The deep soil becomes too dry for the roots of the crops", "The soil is deep and moist for most of the year."],
    ["The crops take up the water that is needed by the forest", "The problem is nutrients, not a shortage of water."],
  ], "Most nutrients were held in the **vegetation**, so clearing removes the store.", { hints: ["Look at where the nutrients were stored before clearing."] });

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A subclimax is a plant community held back from the climatic climax by a natural factor such as fire or grazing animals.", answer: true,
    feedbackTrue: "Correct: a plagioclimax is the human equivalent.", feedbackFalse: "Not so: this is the definition of a subclimax.",
    explanation: "A **subclimax** has a natural limiting factor; a **plagioclimax** has a human one." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a tropical rainforest most of the nutrient store is in the soil.", answer: false,
    feedbackTrue: "Not so: in rainforest the biomass is the largest store.", feedbackFalse: "Correct: the largest store is in the living biomass.",
    explanation: "Rapid decomposition and uptake leave a **small soil store** and a large biomass store." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each adaptation to its main function.",
    pairs: [
      ["Buttress roots", "Support tall trees in shallow soil"],
      ["Drip-tip leaves", "Shed heavy rain quickly"],
      ["Thick fire-resistant bark", "Protect the tree in grass fires"],
      ["Deep tap roots", "Reach water deep below the surface in the dry season"],
      ["Baobab trunk", "Store water through the dry season"],
    ], explanation: "Each adaptation answers a particular problem of the rainforest or savanna." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The stable community in equilibrium with the climate is the {{blank:a}} climax. Grassland kept by people burning it each year is a {{blank:b}}. The intense chemical weathering that leaves iron and aluminium oxides in hot, wet climates is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["climatic"], choices: ["climatic", "edaphic", "seral"] },
      { id: "b", accepted: ["plagioclimax"], choices: ["plagioclimax", "subclimax", "pioneer stage"] },
      { id: "c", accepted: ["laterisation"], choices: ["laterisation", "podzolisation", "salinisation"] },
    ], explanation: "Climatic climax; plagioclimax for human control; laterisation for the weathering of oxisols." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Name the deep, red, leached soil of the humid tropics that is dominated by iron and aluminium oxides and kaolinite.",
    accepted: ["oxisol", "latosol", "ferralsol", "oxisols", "latosols", "ferralsols"],
    explanation: "**Oxisol** (latosol) is the soil of the humid tropics." });

  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "Illustrative nitrogen stores in a rainforest plot are: biomass 2 100 kg/ha, litter 80 kg/ha and soil 520 kg/ha (data invented for this exercise). Calculate the percentage of the total store that is in the soil, to one decimal place.",
    hints: ["Find the total of the three stores first."],
    value: soilPct, dp: 1, wrong: [24.8, 520, 77.8],
    explanation: "Total = 2 100 + 80 + 520 = 2 700 kg/ha. Soil share = 520 ÷ 2 700 × 100 = **19.3%**. The value 77.8 is the biomass share." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true,
    stem: "In a rainforest plot the litter store is 1.2 t/ha and the annual litter input is 8 t/ha (illustrative data). Turnover time = store ÷ annual input. Calculate the turnover time in days, to the nearest day (365 days in a year).",
    hints: ["Divide the store by the input to find the time in years, then convert to days."],
    value: turnDays, dp: 0, wrong: [0.15, 6.7, 3],
    explanation: "1. Turnover time = 1.2 ÷ 8 = 0.15 years.\n2. In days: 0.15 × 365 = 54.75, which is **55 days**. The value 0.15 is in years." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "years",
    stem: "In a savanna woodland the litter store is 2.4 t/ha and the annual litter input is 3.0 t/ha (illustrative data). Calculate the turnover time (store ÷ input), in years, to one decimal place.",
    hints: ["Store divided by annual input."],
    value: turnYrs, dp: 1, wrong: [1.25, 7.2],
    explanation: "2.4 ÷ 3.0 = **0.8 years**. The value 1.25 divides the input by the store." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the structure of a tropical rainforest.",
    points: [
      "Several layers: emergent trees above the continuous canopy, then an understorey and shrub layer, and a dark forest floor.",
      "The canopy is a closed roof of leaves, about 25–40 m above the ground, which intercepts most of the light.",
      "The forest is evergreen, with many species, lianas and epiphytes, and little undergrowth on the shaded floor.",
    ],
    modelAnswer: "A rainforest has several layers: emergent trees above a continuous canopy about 25–40 m high, then an understorey and shrub layer, and a dark forest floor. The canopy intercepts most of the light, so the floor has little undergrowth. The forest is evergreen, with many species, lianas and epiphytes.",
    explanation: "Name the layers, give heights and add other features." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how an oxisol (latosol) forms under tropical rainforest.",
    hints: ["Use stages: weathering, leaching, decomposition and uptake."],
    points: [
      "Heat and heavy rain cause rapid chemical weathering (hydrolysis), so the parent rock is broken down to a great depth.",
      "Percolating water leaches silica and bases (calcium, magnesium, potassium) from the soil.",
      "Iron and aluminium oxides remain and give the red or yellow colour, with kaolinite clay (laterisation).",
      "Leaf litter decomposes rapidly and nutrients are quickly taken up by roots, so little humus accumulates.",
    ],
    modelAnswer: "Heat and heavy rain cause rapid chemical weathering, so the rock is broken down to a great depth. Percolating water leaches silica and bases, leaving iron and aluminium oxides and kaolinite, which give the red colour. Litter decomposes quickly and nutrients are taken up by roots, so the humus layer is thin.",
    explanation: "Weathering, leaching, residual oxides and rapid recycling make the oxisol." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain how savanna trees and grasses are adapted to the dry season and to fire.",
    hints: ["Give the adaptation and the way it helps."],
    points: [
      "Trees are deciduous or semi-deciduous and shed leaves in the dry season to reduce transpiration.",
      "Deep tap roots reach water deep in the soil, and grass roots are dense near the surface to absorb light rain.",
      "Thick bark and protected buds allow trees to survive grass fires and re-sprout.",
      "Grasses grow from the base or from underground stems, so fire or grazing does not kill the growing point; small leaves, thorns and water-storing trunks reduce water loss and browsing.",
    ],
    modelAnswer: "Many trees shed their leaves in the dry season to reduce transpiration. Deep tap roots reach water deep in the soil while grass roots absorb light rain near the surface. Thick bark and protected buds help trees to survive fire and re-sprout. Grasses grow from the base, so fire and grazing do not kill the growing point, and thorns and small leaves reduce water loss and browsing.",
    explanation: "Each adaptation answers the dry season, fire or grazing." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Suggest why the soil store of nutrients is a larger share of the total in a savanna than in a rainforest.",
    hints: ["Think of litter decay and the dry season."],
    points: [
      "Decomposition is slower in the dry season, so more organic matter is added to the soil.",
      "Grass roots die and decay in the soil each year, adding humus and nutrients.",
      "Leaching is weaker with less rainfall, so nutrients stay in the soil, and the biomass is smaller so it holds a smaller share.",
    ],
    modelAnswer: "Decomposition slows in the dry season, and grass roots die and decay in the soil each year, adding humus. Leaching is weaker because rainfall is lower, so nutrients remain in the soil, while the smaller biomass holds a smaller share of the total.",
    explanation: "The savanna soil receives more organic matter and loses fewer nutrients; the biomass is smaller." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `The table shows an illustrative profile of a tropical red-brown earth under savanna woodland (data invented for this exercise).\n\n${PROFTAB}`,
    hints: ["In (a) divide the clay percentage of the middle horizon by that of the top horizon.", "Clay moves downwards when water drains through the soil."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "How many times greater is the clay content of the 15–60 cm horizon than that of the top horizon, to one decimal place?", value: clayTimes, dp: 1, wrong: [18, 0.4, 1.7],
        explanation: "30 ÷ 12 = 2.5 times. The value 18 is the difference in percentage points, not the ratio." }),
      P.manual({ label: "(b)", marks: 3, stem: "Describe the changes in the soil with depth shown in the table.",
        points: [
          "Organic matter falls with depth, from 3.0% in the top horizon to 0.4% at 60–150 cm.",
          "Clay increases with depth, from 12% to 34%, with the largest jump between the top two horizons.",
          "The pH is almost constant, falling only slightly from 6.1 to 5.9, so the soil is weakly acid throughout.",
        ],
        modelAnswer: "Organic matter falls from 3.0% in the top horizon to 0.4% at 60–150 cm. Clay increases from 12% to 34%, mostly between the top two horizons. The pH hardly changes, falling from 6.1 to 5.9.",
        explanation: "Describe each column with figures." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the clay content increases with depth.",
        points: [
          "In the wet season water percolates downwards and carries fine clay particles out of the top horizon (eluviation).",
          "The clay is deposited lower down in the B horizon (illuviation), where the water slows or the pores are smaller.",
          "Weathering in the wet and warm conditions also produces clay minerals, which build up at depth, and humus-rich soil near the top reduces the share of clay.",
        ],
        modelAnswer: "In the wet season percolating water carries fine clay particles out of the top horizon and deposits them lower down in the B horizon. Weathering also produces clay minerals at depth, while the humus-rich top horizon dilutes the clay content.",
        explanation: "Eluviation and illuviation, plus clay formed by weathering." }),
    ], explanation: "Calculate a ratio, describe a profile and explain clay movement." });

  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true,
    stem: `A farmer clears a rainforest plot and grows maize. Illustrative yields over four years are shown below (data invented for this exercise).\n\n${YTAB}`,
    hints: ["In (a)(i): fall ÷ original × 100.", "Think of where the nutrients were stored before the forest was cleared."],
    parts: [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the percentage fall in yield between year 1 and year 4, to one decimal place.", value: yFall, dp: 1, unit: "%", wrong: [2.3, 28.1, 71.9 / 2],
            explanation: "(3.2 − 0.9) ÷ 3.2 × 100 = 71.9%. The value 2.3 is the fall in t/ha." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is the most likely cause of the decline?", options: [
            ["Nutrients held in the forest biomass have been lost and leached", "Correct: the soil itself has few nutrients."],
            ["The soil has become too rich in humus for the crop to grow", "The humus layer of a tropical soil is thin."],
            ["The rainfall has changed from a heavy to a very light amount", "The rainfall is still heavy and causes leaching."],
            ["The maize crop has been shaded by the trees of the old forest", "The forest was cleared and does not shade the crop."],
          ], answer: "A", explanation: "The nutrient store was in the biomass, which has been removed; the rest is leached." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why yields fall when rainforest is cleared for crops.",
        points: [
          "Most of the nutrient store was in the biomass, so clearing and burning removes it (ash gives only a short-term supply).",
          "Without the canopy and roots, heavy rain hits the bare soil, leaching nutrients and causing erosion of the thin humus layer.",
          "Crops remove nutrients at harvest and the soil is naturally low in bases, so fertility declines quickly.",
        ],
        modelAnswer: "Most of the nutrient store was in the biomass, so clearing and burning removes it, and the ash gives only a short supply. Without the canopy and roots, heavy rain leaches nutrients and erodes the thin humus layer. Crops take up more nutrients at harvest, and the soil, which is naturally low in bases, cannot replace them.",
        explanation: "Loss of the nutrient store, leaching and erosion, and crop removal." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest ways of keeping the plot productive for longer.",
        points: [
          "Add organic matter (mulch, compost, manure) or fertiliser to replace nutrients.",
          "Keep the soil covered with crops or mulch, or plant on contours, to reduce erosion and leaching.",
          "Use agroforestry or fallow periods (rotate the plot) so that trees recycle nutrients and the soil recovers.",
        ],
        modelAnswer: "The farmer can add mulch, compost, manure or fertiliser to replace nutrients. Keeping the soil covered and planting along the contours reduces erosion and leaching. Agroforestry or fallow periods allow trees to recycle nutrients and the soil to recover.",
        explanation: "Replace nutrients, protect the soil and let it recover." }),
      P.manual({ label: "(d)", marks: 3, stem: "Describe what happens to the vegetation if the plot is abandoned.",
        points: [
          "Fast-growing pioneer species colonise the cleared ground first, giving a secondary forest.",
          "The community is less diverse and has a different structure from the original forest, and a closed canopy takes decades to form.",
          "Recovery to a forest resembling the climax may take centuries or may not happen if the soil is degraded or if burning continues (a plagioclimax).",
        ],
        modelAnswer: "Fast-growing pioneer species colonise first, forming a secondary forest. It has fewer species and a different structure from the original forest, and it takes decades to form a closed canopy. Full recovery may take centuries, or may not happen if the soil is degraded or burning continues, when the vegetation becomes a plagioclimax.",
        explanation: "Succession gives a secondary forest that recovers slowly." }),
    ], explanation: "Calculate the fall in yield, explain the cause and suggest management." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the view that savanna vegetation is the result of human activity rather than of climate.",
    hints: ["Give climatic, natural and human controls.", "Use the ideas of climatic climax, subclimax and plagioclimax."],
    points: [
      "Climate sets the broad pattern: a long dry season and moderate rainfall favour grass with scattered trees rather than rainforest.",
      "Natural fires started by lightning and grazing by large herbivores maintain open savanna and prevent woodland from developing (a fire subclimax).",
      "Soil conditions such as poor drainage, shallow soil or low nutrients also restrict tree growth.",
      "Humans have used fire for thousands of years to clear land and promote new grass, which extends the savanna into areas that might be woodland (a plagioclimax).",
      "Grazing by cattle and clearing for fuel and farming change tree density and species, and can cause bush encroachment or loss of grass.",
      "Where fire is excluded some savannas turn into woodland, which supports the importance of fire; however, whether the fire is natural or set by people is hard to separate.",
      "Evidence: the savanna belts match the seasonal climate on every continent, which suggests that climate is the primary control.",
      "Judgement: climate sets the broad limits, and fire, grazing and soil keep many savannas open; people have extended and altered the savanna, so human activity is important but not the whole explanation.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Climate is the primary control. Savanna belts match the seasonal tropical climate on every continent, and a long dry season favours grasses and drought-tolerant trees over rainforest. However, fire, grazing and soils keep many savannas open when the climate would allow woodland. Natural fires started by lightning and grazing by large herbivores maintain a fire subclimax, and shallow or poorly drained soils restrict trees. People have used fire for thousands of years and have grazed livestock and cleared woodland, which has extended the savanna and in places changed it to a plagioclimax. Where fire is excluded some savannas turn into woodland, which shows how important fire is, but it is hard to separate natural fire from fire set by people. I conclude that climate sets the broad limits, natural factors maintain the open savanna and people have altered it, so human activity is important but not the whole explanation.",
    wordLimit: { max: 300 }, explanation: "Weigh climate, natural subclimax factors and human activity, then judge." });

  b.card("DEFINITION", "Climatic climax", "The stable plant community in equilibrium with the regional climate. Rainforest is the climax of the humid tropics.");
  b.card("DEFINITION", "Subclimax and plagioclimax", "A subclimax is held back by a natural factor such as fire or grazing animals; a plagioclimax is held back or altered by human activity such as burning or clearing.");
  b.card("CONCEPT", "Rainforest layers", "Emergent trees, canopy (about 25–40 m), understorey and shrub layer, and a dark forest floor.");
  b.card("CONCEPT", "Rainforest adaptations", "Drip-tip leaves shed water, buttress roots support tall trees, lianas and epiphytes reach the light, and the leaves are evergreen.");
  b.card("CONCEPT", "Savanna adaptations", "Deciduous leaves, deep tap roots, thick fire-resistant bark, thorns and small leaves, and grasses that grow from the base.");
  b.card("DEFINITION", "Oxisol (latosol)", "A deep, red or yellow, leached and acid soil of the humid tropics, rich in iron and aluminium oxides and kaolinite, with a thin humus layer and low fertility.");
  b.card("DEFINITION", "Laterisation", "Intense chemical weathering in a hot, wet climate in which silica and bases are leached out and iron and aluminium oxides remain.");
  b.card("CONCEPT", "Tropical red and brown earths", "Savanna soils: shallower than oxisols, with clearer horizons, more humus from grass roots, moderate fertility and a risk of erosion.");
  b.card("FORMULA", "Litter turnover time", "Turnover time = litter store ÷ annual litter input (for example 0.9 t/ha ÷ 10 t/ha a year = 0.09 years).");
});
