// W2b: bio.nutrient-cycles (both boards; items suit both unless tagged).
// Computed: rainforest total 735, biomass share 82%, savanna total 660, biomass 23%, soil 68%; clearing loss 50 kg/ha = 42%;
// CO2 rise 420 - 280 = 140 ppm = 50%; savanna after fire: litter 60 -> 0, soil 450 -> 470.
import { concept, P, geographyLevels, chk, rnd, sum } from "../lib.mjs";
import { mc, tbl } from "../tables/w2b-_q.mjs";

const RF = { B: 600, L: 15, S: 120 };
const SV = { B: 150, L: 60, S: 450 };
const rfTotal = chk(sum(Object.values(RF)), 735);
const svTotal = chk(sum(Object.values(SV)), 660);
const rfB = rnd((RF.B / rfTotal) * 100, 0, 82, "rfB");
const svB = rnd((SV.B / svTotal) * 100, 0, 23, "svB");
const svS = rnd((SV.S / svTotal) * 100, 0, 68, "svS");
const rfLitterPct = rnd((RF.L / rfTotal) * 100, 1, 2.0, "rfL");
const clearLoss = chk(120 - 70, 50);
const clearPct = rnd((clearLoss / 120) * 100, 0, 42, "clearPct");
const co2Rise = chk(420 - 280, 140);
const co2Pct = chk((co2Rise / 280) * 100, 50);
const TAB = tbl(["Ecosystem", "Biomass", "Litter", "Soil", "Total"], [["Tropical rainforest", RF.B, RF.L, RF.S, rfTotal], ["Savanna", SV.B, SV.L, SV.S, svTotal]]);
const svSoilAfter = chk(SV.S + 20, 470);
const svBurnTotal = chk(SV.B + 0 + svSoilAfter, 620);

concept("ageo.bio.nutrient-cycles", { file: "bio/nutrient-cycles", keyPrefix: "bio.nutrient-cycles" }, (b) => {
  mc(b, 1, "RECALL", "In a Gersmehl diagram, what does the **area of a circle** show?", [
    ["The amount of nutrient held in that compartment", "Correct: bigger circle, bigger store."],
    ["The number of plant species in that compartment", "Species numbers are not shown."],
    ["The speed at which nutrients move each year", "That is shown by the width of the arrows."],
    ["The depth of soil beneath the vegetation", "Soil depth is not shown by circle size."],
  ], "Circle **area** shows the nutrient store; arrow **width** shows the annual flow.");
  mc(b, 1, "RECALL", "Which are the three compartments (stores) of the Gersmehl model?", [
    ["Biomass, litter and soil", "Correct: nutrients move between these three."],
    ["Air, water and rock", "These are global stores, not the three Gersmehl compartments."],
    ["Producers, consumers and decomposers", "These are trophic groups, not the model's stores."],
    ["Roots, stems and leaves", "These are plant parts."],
  ], "The model has **biomass**, **litter** and **soil** compartments.");
  mc(b, 2, "UNDERSTANDING", "Why is the litter store small in a tropical rainforest?", [
    ["Warm, wet conditions decompose litter within weeks", "Correct: decomposers work quickly in the heat and damp."],
    ["Trees in the rainforest do not shed leaves at all", "Trees shed leaves throughout the year."],
    ["Frequent fires burn all of the litter each season", "Rainforest fires are rare."],
    ["Heavy rain washes all the litter into the sea", "Litter is recycled in place, not washed away."],
  ], "Rapid decomposition keeps the **litter store small** in the rainforest.");
  mc(b, 2, "UNDERSTANDING", "Which process turns ammonium into nitrate in the soil?", [
    ["Nitrification", "Correct: soil bacteria oxidise ammonium to nitrite and nitrate."],
    ["Nitrogen fixation", "Fixation converts nitrogen gas into ammonium or nitrate."],
    ["Denitrification", "Denitrification returns nitrate to nitrogen gas."],
    ["Ammonification", "Ammonification releases ammonium from dead matter."],
  ], "**Nitrification** changes ammonium to nitrate.");
  mc(b, 2, "UNDERSTANDING", "Why do farmers include groundnuts or cowpeas in crop rotations?", [
    ["Root bacteria fix nitrogen that later crops can use", "Correct: legumes add nitrogen to the soil."],
    ["Their roots release carbon dioxide into the air above the soil", "That is not their role in a rotation."],
    ["They remove nitrates by denitrification", "Legumes do not remove nitrogen from the soil."],
    ["They convert litter into ash for the next crop", "Litter is not converted to ash by legumes."],
  ], "Legumes host nitrogen-fixing bacteria in root nodules.");
  mc(b, 3, "APPLICATION", "After a rainforest is cleared, soil fertility falls quickly. What is the best reason?", [
    ["The nutrients were stored mainly in the biomass and are lost with it", "Correct: the soil store was small, so little remains."],
    ["The soil already held a very large store of nutrients that was used up", "In the rainforest the soil store is small, not large."],
    ["Litter increases greatly and locks up nutrients", "Clearing reduces, not increases, the litter."],
    ["Heavy rain stops once the trees have gone", "Rainfall continues and leaches nutrients from bare soil."],
  ], "Clearing removes the **biomass store**, and leaching and erosion remove much of what is left.", { hints: ["Where were most nutrients stored before clearing?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Nitrogen-fixing bacteria in the root nodules of legumes convert nitrogen gas into forms that plants can use.", answer: true,
    feedbackTrue: "Correct: this is nitrogen fixation.",
    feedbackFalse: "Not so: legumes host bacteria that fix nitrogen.",
    explanation: "*Rhizobium* bacteria fix atmospheric nitrogen in legume root nodules." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a tropical rainforest most of the nutrients are stored in the soil.", answer: false,
    feedbackFalse: "Correct: most are held in the biomass, and the soil store is small.",
    feedbackTrue: "Not so: the biomass store is by far the largest.",
    explanation: "Rainforest nutrients are mainly in the **biomass**." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Bacteria that turn nitrate back into nitrogen gas carry out {{blank:a}}. Plants use carbon dioxide in {{blank:b}}. The removal of soluble nutrients by drainage water is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["denitrification"], choices: ["denitrification", "nitrification", "fixation"] },
      { id: "b", accepted: ["photosynthesis"], choices: ["photosynthesis", "respiration", "combustion"] },
      { id: "c", accepted: ["leaching"], choices: ["leaching", "litterfall", "uptake"] },
    ], explanation: "Denitrification, photosynthesis and leaching." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each process to what it does.",
    pairs: [
      ["Photosynthesis", "Takes carbon dioxide from the air into plants"],
      ["Respiration", "Returns carbon dioxide to the air from living things"],
      ["Litterfall", "Moves nutrients from biomass to the litter store"],
      ["Nitrogen fixation", "Converts nitrogen gas into ammonium or nitrates"],
    ], explanation: "Each process is a transfer between stores." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%", dp: 0,
    stem: `Illustrative nutrient stores in kg per hectare (data invented for this exercise):\n\n${TAB}\n\nCalculate the percentage of the rainforest's nutrients held in the biomass, to the nearest whole number.`,
    hints: ["Divide the biomass store by the total, then multiply by 100."],
    value: rfB, wrong: [600, 12],
    explanation: "600 ÷ 735 × 100 = **82%**. Quoting 600 gives the store, not the percentage." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 0,
    stem: `Use the table:\n\n${TAB}\n\nCalculate the percentage of the savanna's nutrients held in the soil, to the nearest whole number.`,
    hints: ["Use the savanna total, not the rainforest total."],
    value: svS, wrong: [61, 23],
    explanation: "450 ÷ 660 × 100 = **68%**. Using the rainforest total (735) gives 61%, the wrong base." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, unit: "%", dp: 0,
    stem: "After three years of cultivation on cleared rainforest the soil nutrient store falls from 120 to 70 kg per hectare (illustrative data). Calculate the percentage loss of the original soil store, to the nearest whole number.",
    hints: ["Find the loss in kg per hectare first.", "Divide by the original store."],
    value: clearPct, wrong: [50, 71],
    explanation: "1. Loss = 120 − 70 = 50 kg per hectare.\n2. As a percentage of the original: 50 ÷ 120 × 100 = **42%**.\n3. Dividing by the final store (70) gives 71%, which is the wrong base." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "%", dp: 0,
    stem: "The concentration of carbon dioxide in the air rose from about 280 ppm before industrialisation to about 420 ppm in recent years. Calculate the percentage increase.",
    hints: ["Find the rise, then divide by the starting value."],
    value: co2Pct, wrong: [140, 33],
    explanation: "Rise = 420 − 280 = 140 ppm. 140 ÷ 280 × 100 = **50%**. Dividing by 420 gives 33%, the wrong base." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the process in which plants take carbon dioxide from the air to make sugars.",
    accepted: ["photosynthesis", "photo synthesis"], wrong: ["respiration"],
    explanation: "**Photosynthesis** takes in carbon dioxide." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the type of bacteria in the root nodules of legumes that fix nitrogen.",
    accepted: ["rhizobium", "rhizobia", "nitrogen-fixing bacteria", "nitrogen fixing bacteria"], wrong: ["nitrosomonas"],
    explanation: "*Rhizobium* lives in legume root nodules." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why soil fertility falls quickly when tropical rainforest is cleared for farming.",
    hints: ["Where were the nutrients stored before clearing?"],
    points: [
      "Most nutrients were held in the large biomass store, which is removed or burnt.",
      "The soil store is small, so little fertility remains once the trees have gone.",
      "Without tree roots, heavy rain leaches nutrients down and out of the soil.",
      "Bare soil is eroded by rain splash and run-off, and crops remove nutrients in the harvest.",
    ],
    modelAnswer: "In the rainforest most nutrients are in the trees. When these are cleared or burnt the biomass store is lost and only a small soil store remains. Without roots to take up nutrients, heavy rain leaches them away, and bare soil is eroded. The crops also remove nutrients, so fertility falls within a few years.",
    explanation: "Loss of the biomass store, leaching, erosion and crop removal." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Illustrative nutrient stores in kg per hectare (data invented for this exercise):\n\n${TAB}\n\nCompare the nutrient stores of the two ecosystems.`,
    hints: ["Compare each compartment in turn and quote figures."],
    points: [
      "Biomass is much larger in the rainforest (600 kg per hectare) than in the savanna (150).",
      "The soil store is much smaller in the rainforest (120) than in the savanna (450).",
      "The litter store is smaller in the rainforest (15) than in the savanna (60).",
      "Overall the rainforest holds most of its nutrients in biomass (82%), whereas the savanna holds most in the soil (68%).",
    ],
    modelAnswer: "The rainforest biomass store (600 kg per hectare) is four times that of the savanna (150), but its soil store (120) is much smaller than the savanna's (450), and its litter store is smaller too (15 compared with 60). The rainforest holds 82% of its nutrients in biomass, whereas the savanna holds 68% in the soil.",
    explanation: "Compare each store with figures and summarise." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `Illustrative nutrient stores in two ecosystems, in kg per hectare (data invented for this exercise):\n\n${TAB}`,
    hints: ["Divide each store by the total of its ecosystem.", "Think about where the nutrients are before and after clearing."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of the rainforest's nutrients held in the litter, to 1 decimal place.", value: rfLitterPct, dp: 1, unit: "%", wrong: [15, 20],
        explanation: "15 ÷ 735 × 100 = 2.0%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the percentage of the savanna's nutrients held in the biomass, to the nearest whole number.", value: svB, dp: 0, unit: "%", wrong: [25, 150],
        explanation: "150 ÷ 660 × 100 = 23%." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the rainforest litter store is so small.",
        points: [
          "High temperatures and moisture give rapid decomposition by bacteria and fungi.",
          "Nutrients are released and taken up again quickly by roots, so little accumulates as litter.",
        ],
        modelAnswer: "Warm, wet conditions let decomposers break down litter within weeks, and roots take up the nutrients straight away, so litter does not build up.",
        explanation: "Fast decomposition and fast uptake." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why burning savanna grass may increase crop yields in the following year but not in later years.",
        points: [
          "Ash adds nutrients to the soil in a form plants can use at once.",
          "Nutrients such as nitrogen are lost in smoke, and ash is blown or washed away, so the benefit is short-lived.",
        ],
        modelAnswer: "Burning puts nutrients into the soil as ash, which helps the next crop. But nitrogen is lost in smoke and much of the ash is blown or washed away, so the gain does not last.",
        explanation: "A short-term nutrient pulse followed by loss." }),
    ], explanation: "Interpret store sizes and explain differences between rainforest and savanna." });

  b.struct({ d: 3, skill: "ANALYSIS",
    stem: "A farmer rotates maize with groundnuts in a field. In the year after groundnuts she applies no nitrogen fertiliser and obtains a good maize yield (illustrative scenario).",
    hints: ["Think about the root nodules of legumes.", "Think about what leaching does to nitrate."],
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Name the process by which bacteria in groundnut roots convert nitrogen gas into usable compounds.", accepted: ["nitrogen fixation", "fixation", "nitrogen-fixation"], explanation: "Nitrogen fixation." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how the groundnuts benefit the following maize crop.",
        points: [
          "Nodule bacteria fix nitrogen, which is added to the soil as the groundnut residues decay.",
          "Decomposers convert it to ammonium and then nitrate, which the maize roots can take up.",
        ],
        modelAnswer: "Bacteria in the groundnut roots fix nitrogen, and when the residues decay, decomposers and nitrifying bacteria convert it to nitrate that the maize takes up.",
        explanation: "Fixation, decay and nitrification supply nitrate." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why heavy rain on bare soil may reduce the benefit.",
        points: [
          "Nitrate is soluble, so heavy rain leaches it below the root zone.",
          "In waterlogged soil, denitrification converts nitrate to nitrogen gas, which escapes.",
          "Run-off and erosion of bare soil also remove nutrient-rich topsoil.",
        ],
        modelAnswer: "Nitrate dissolves easily, so heavy rain can wash it below the roots. If the soil is waterlogged, bacteria change nitrate back to nitrogen gas, and run-off from bare soil also carries topsoil away.",
        explanation: "Leaching, denitrification and erosion are the losses." }),
    ], explanation: "Apply the nitrogen cycle to a farming situation." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effects of burning and deforestation on nutrient cycling in tropical ecosystems.",
    hints: ["Consider rainforest and savanna, short-term gains and long-term losses.", "Reach a judgement."],
    points: [
      "Burning releases nutrients from biomass and litter as ash, giving a short-term increase in soil fertility.",
      "Nitrogen and sulphur are lost as gases and smoke, and ash may be blown or washed away.",
      "In the savanna, fire is natural and many species are adapted, so the effect on nutrient cycling is limited if fires are not too frequent.",
      "Frequent fire reduces the litter and biomass stores and the supply of humus, so soil fertility declines.",
      "Deforestation of rainforest removes the main nutrient store (the biomass), and the soil store is small.",
      "Without roots, rain leaches nutrients from the soil, and bare soil is eroded, so fertility falls within a few years.",
      "Loss of tree cover also changes the microclimate, so decomposition and nutrient recycling slow and carbon is released.",
      "Judgement: the long-term effects of deforestation on the rainforest are severe, whereas savanna can tolerate occasional burning, but frequent burning is also damaging.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Burning converts biomass and litter into ash, which gives a short-term increase in soil nutrients, but nitrogen and sulphur are lost as gases and the ash may be blown or washed away. In the savanna, fire is natural and many species are adapted to it, so occasional burning has a limited effect, but frequent fires reduce litter and biomass and so the supply of humus. In the rainforest, deforestation removes the main nutrient store, the biomass, while the soil store is small; without roots, heavy rain leaches nutrients and bare soil is eroded, so fertility falls within a few years. I conclude that the long-term effects of deforestation on rainforest nutrient cycling are more severe than those of occasional burning in the savanna, though frequent burning can also be damaging.",
    wordLimit: { max: 300 }, explanation: "Weigh short-term gains against long-term losses in two ecosystems." });

  b.card("DEFINITION", "Gersmehl diagram", "Three circles (biomass, litter, soil) with areas proportional to nutrient stores, joined by arrows proportional to annual flows.");
  b.card("CONCEPT", "Rainforest nutrient pattern", "Large biomass store, small litter and soil stores, fast cycling, high leaching losses.");
  b.card("CONCEPT", "Savanna nutrient pattern", "Medium biomass, moderate litter, larger soil store; slower cycling because of the dry season, fire and grazing.");
  b.card("CONCEPT", "Carbon cycle", "Photosynthesis, respiration, decomposition, combustion and ocean exchange move carbon between air, living things, soil, oceans and fossil fuels.");
  b.card("CONCEPT", "Nitrogen cycle", "Fixation, ammonification, nitrification, assimilation, denitrification and leaching.");
  b.card("DEFINITION", "Nitrogen fixation", "Conversion of nitrogen gas into ammonium or nitrates by bacteria (such as Rhizobium in legumes), lightning or industry.");
  b.card("DEFINITION", "Leaching", "The removal of soluble nutrients from the soil by drainage water.");
  b.card("CONCEPT", "Effects of clearing rainforest", "The biomass store is lost; leaching and erosion remove nutrients; fertility falls within a few years.");
  b.card("FACT", "Atmospheric gases", "Air is about 78% nitrogen and about 21% oxygen; carbon dioxide has risen from about 280 ppm to above 420 ppm.");
});
