// W1b: agri.threats-responses (ZIMSEC only; items tagged to ZIMSEC automatically). All data are illustrative.
// Computed: 80 000 x 125 kg = 10 000 t; 7 400/10 000 = 74%; post-harvest saving 2 500 x (0.12 - 0.02) = 250 t; sorghum 1.9 vs maize 1.1 =
// 72.7% higher; struct 8: means 1.05 and 1.75 (66.7% higher); struct 12: mean production 8 100, deficit 3 900, 61%.
import { concept, P, geographyLevels, chk, rnd, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w1b-_q.mjs";

const need = chk((80000 * 125) / 1000, 10000);
const ss = chk((7400 / 10000) * 100, 74);
const saved = chk(2500 * (0.12 - 0.02), 250);
const higher = rnd(((1.9 - 1.1) / 1.1) * 100, 1, 72.7, "higher");
const CONV = [1.8, 0.5, 1.5, 0.4];
const CF = [2.6, 1.2, 2.2, 1.0];
const mConv = rnd(mean(CONV), 2, 1.05, "mConv");
const mCF = rnd(mean(CF), 2, 1.75, "mCF");
const cfHigher = rnd(((mean(CF) - mean(CONV)) / mean(CONV)) * 100, 1, 66.7, "cfHigher");
const PROD = [9200, 6100, 9700, 7400];
const mProd = chk(mean(PROD), 8100);
const defic = chk(10000 - 6100, 3900);
const ssY2 = chk((6100 / 10000) * 100, 61);

concept("ageo.agri.threats-responses", { file: "agri/threats-responses", keyPrefix: "agri.threats-responses" }, (b) => {
  mc(b, 1, "RECALL", "Which list gives the four dimensions of food security?", [
    ["Availability, access, use and stability", "Correct: enough food, ability to obtain it, good use of it and reliability over time."],
    ["Production, processing, packaging and pricing of food", "These are stages in the food chain, not the dimensions."],
    ["Rainfall, soil, seed and labour for farming", "These are inputs to farming."],
    ["Exports, imports, food aid and grain storage", "These are sources of food, not dimensions of security."],
  ], "**Food security** has four dimensions: availability, access, utilisation and stability.");
  mc(b, 1, "RECALL", "Which of these crops is a drought-tolerant small grain?", [
    ["Sorghum", "Correct: it has deep roots and tolerates heat and dry spells."],
    ["Sugarcane", "Sugarcane needs a lot of water."],
    ["Tea", "Tea needs high, reliable rainfall."],
    ["Rice grown in paddies", "Paddy rice needs flooded fields."],
  ], "**Sorghum**, pearl millet and finger millet are drought-tolerant small grains.");
  mc(b, 2, "UNDERSTANDING", "Why does fall armyworm threaten food security in Zimbabwe?", [
    ["It attacks maize, the staple crop", "Correct: heavy damage cuts yields of the crop that most households depend on."],
    ["It causes floods in the river valleys", "Armyworm is a pest, not a flood cause."],
    ["It poisons the water in the boreholes", "Armyworm does not contaminate water supplies."],
    ["It only attacks the crops stored in silos", "It damages growing plants in the field."],
  ], "**Fall armyworm** feeds on maize leaves and cobs, so it reduces the main staple harvest.");
  mc(b, 2, "UNDERSTANDING", "How does a mulch cover help crops in a dry spell?", [
    ["It reduces evaporation from the soil", "Correct: the soil stays moist for longer."],
    ["It increases the temperature of the soil surface", "Mulch tends to keep the soil cooler."],
    ["It stops all of the rain from entering the soil", "Mulch helps rain to soak in."],
    ["It adds salt to the soil so that it holds water", "Mulch does not add salt."],
  ], "**Mulch** reduces evaporation, keeps the soil cooler and protects against erosion.");
  mc(b, 2, "UNDERSTANDING", "How do hermetic (airtight) storage bags reduce post-harvest losses?", [
    ["Little oxygen remains, so insects cannot survive", "Correct: pests die or stop feeding and moulds are slowed."],
    ["They allow the grain to absorb moisture from the air", "Moisture increases mould and losses."],
    ["They attract insects to feed away from the grain", "They do not attract insects."],
    ["They make the grain grow in the bag", "Stored grain should not germinate."],
  ], "**Hermetic bags** limit oxygen and moisture, so pests and moulds cannot develop.");
  mc(b, 2, "ANALYSIS", "Why are rain-fed smallholders especially exposed to climate change?", [
    ["Their harvest depends on the timing of rainfall", "Correct: dry spells or heat at the wrong stage can cause crop failure."],
    ["They never use any seed or fertiliser at all", "Many use inputs, but rainfall remains the key control."],
    ["They are always located on the river floodplains", "Most are not on floodplains."],
    ["Their crops grow best during a severe drought", "Most food crops suffer in drought."],
  ], "Rain-fed smallholders are **sensitive** to rainfall changes and often have **low adaptive capacity**.");
  mc(b, 3, "EVALUATION", "Which response is best suited to a smallholder in a dry region (natural region V)?", [
    ["Drought-tolerant small grains with water harvesting", "Correct: they match low and variable rainfall and need few inputs."],
    ["A large area of high-yielding maize with no irrigation", "Maize is likely to fail in the dry region without irrigation."],
    ["Rice paddies flooded for most of the year", "Rice paddies need large, reliable water supplies."],
    ["Tea grown on large estates", "Tea needs high rainfall and cool conditions."],
  ], "In regions IV and V, **small grains and water harvesting** give the best chance of a harvest.", { hints: ["Think about rainfall and what each crop requires."] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Planting basins concentrate water and nutrients near the plant.", answer: true, daily: true,
    feedbackTrue: "Correct: small basins catch rainfall and put compost or fertiliser right at the plant.",
    feedbackFalse: "Not so: the basins are designed to capture water and nutrients where the roots are.",
    explanation: "**Planting basins** are a key part of conservation farming such as Pfumvudza/Intwasa." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Keeping a layer of crop residue on the soil is called {{blank:a}}. Airtight storage is described as {{blank:b}} storage. The lack of reliable access to enough food is food {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["mulching"], choices: ["mulching", "tilling", "grazing"] },
      { id: "b", accepted: ["hermetic"], choices: ["hermetic", "open", "wet"] },
      { id: "c", accepted: ["insecurity"], choices: ["insecurity", "security", "surplus"] },
    ], explanation: "Mulching; hermetic; food insecurity." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each threat to a suitable response.",
    pairs: [
      ["Drought and dry spells", "Drought-tolerant crops and water harvesting"],
      ["Fall armyworm", "Integrated pest management and early scouting"],
      ["Post-harvest grain losses", "Hermetic bags and metal silos"],
      ["Soil erosion and moisture loss", "Conservation farming with mulch"],
      ["Livestock disease (theileriosis)", "Dipping, vaccination and veterinary extension"],
    ], explanation: "Responses must be matched to the threat." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "t",
    stem: "A district has 80 000 people, each needing about 125 kg of cereal a year. Calculate the district's annual cereal need, in tonnes.",
    value: need, wrong: [10, 1000000],
    explanation: "80 000 × 125 kg = 10 000 000 kg = **10 000 tonnes**." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%",
    stem: "A district needs 10 000 tonnes of cereal a year and produces 7 400 tonnes. Calculate its self-sufficiency, as a percentage of the need.",
    hints: ["Self-sufficiency = production ÷ need × 100."],
    value: ss, wrong: [26, 135],
    explanation: "7 400 ÷ 10 000 × 100 = **74%**. The value 26% is the shortfall." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "A district harvests 2 500 tonnes of grain. Traditional stores lose 12% and hermetic bags lose 2%. Calculate the tonnes of grain saved by using hermetic bags.",
    hints: ["Find the difference between the two loss percentages.", "Apply it to the harvest."],
    value: saved, wrong: [300, 50],
    explanation: "Traditional loss = 2 500 × 0.12 = 300 t. Hermetic loss = 2 500 × 0.02 = 50 t. Saved = 300 − 50 = **250 tonnes**." });
  b.calc({ d: 4, skill: "ANALYSIS", calculator: true, dp: 1, unit: "%",
    stem: "In a dry season maize yields 1.1 t/ha and sorghum yields 1.9 t/ha. Calculate by what percentage the sorghum yield is higher than the maize yield, to 1 decimal place.",
    hints: ["Find the difference, then divide by the maize yield."],
    value: higher, wrong: [42.1, 0.8],
    explanation: "1. Difference = 1.9 − 1.1 = 0.8 t/ha.\n2. 0.8 ÷ 1.1 × 100 = **72.7%**. Dividing by the sorghum yield (1.9) gives 42.1%, the wrong base." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the conservation agriculture programme in Zimbabwe that uses planting holes on a small plot with mulch.",
    accepted: ["Pfumvudza", "Intwasa", "Pfumvudza/Intwasa", "Pfumvudza Intwasa"], wrong: ["Green Revolution"],
    explanation: "**Pfumvudza/Intwasa**." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how droughts reduce food security in rural Zimbabwe.",
    hints: ["Link availability, access and household coping."],
    points: [
      "Rain-fed crops fail or yields are low, so the amount of food available falls (availability).",
      "Grain prices rise and household income falls (crops and livestock lost), so people cannot afford food (access).",
      "Households reduce meals or sell assets, leading to malnutrition and instability from year to year.",
    ],
    modelAnswer: "In a drought, rain-fed crops fail, so less food is available. Prices rise while incomes fall because crops and cattle are lost, so poor households cannot buy enough. They cut meals or sell assets, which leads to malnutrition and makes it harder to recover next season.",
    explanation: "Availability, access and stability are all affected." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how conservation farming helps crops to survive dry spells.",
    hints: ["Think about water capture, evaporation and soil structure."],
    points: [
      "Planting basins or rip lines catch and hold rainfall near the plant instead of letting it run off.",
      "Mulch shades the soil and reduces evaporation, keeping moisture for longer.",
      "Minimum tillage and organic matter improve soil structure, so more water infiltrates and is stored.",
      "Crop rotation and compost improve fertility so that crops grow stronger roots and tolerate stress better.",
    ],
    modelAnswer: "Basins catch rain next to the plants. Mulch cuts evaporation and keeps the soil moist for longer. Minimum tillage and organic matter improve soil structure so more water soaks in and is stored, and rotation and compost make plants stronger and better able to resist dry spells.",
    explanation: "Capture water, reduce evaporation, improve infiltration and fertility." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest reasons why many smallholders do not adopt conservation farming.",
    hints: ["Think about labour, materials, knowledge and risk."],
    points: [
      "It needs a lot of labour to dig basins at the start of the season, which is hard for older or sick farmers.",
      "Mulch may be scarce or used as livestock feed or fuel.",
      "Farmers may lack training and extension support or may not trust the new methods.",
      "Benefits take time and the cost of inputs (seed, fertiliser) is high, so poor farmers fear the risk.",
    ],
    modelAnswer: "Digging basins takes a lot of labour, which is difficult for older farmers, and mulch is often scarce because crop residues feed livestock. Farmers may not have received training and may fear the risk of trying a new method with costly seed and fertiliser when benefits take several seasons to appear.",
    explanation: "Barriers to adoption: labour, materials, knowledge and risk." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "Illustrative maize yields (t/ha) on two plots in four seasons, one with conventional ploughing and one with conservation farming:\n\n" + tbl(["Season", "1 (good rains)", "2 (dry spell)", "3 (normal)", "4 (dry spell)"], [["Conventional", 1.8, 0.5, 1.5, 0.4], ["Conservation farming", 2.6, 1.2, 2.2, 1.0]]),
    hints: ["Add the four values and divide by 4.", "Percentage = difference ÷ conventional mean × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean yield with conventional ploughing, in t/ha.", value: mConv, dp: 2, unit: "t/ha", wrong: [4.2, 1.5],
        explanation: "(1.8 + 0.5 + 1.5 + 0.4) ÷ 4 = 4.2 ÷ 4 = 1.05 t/ha." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the mean yield with conservation farming, in t/ha.", value: mCF, dp: 2, unit: "t/ha", wrong: [7, 2.4],
        explanation: "(2.6 + 1.2 + 2.2 + 1.0) ÷ 4 = 7.0 ÷ 4 = 1.75 t/ha." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate by what percentage the conservation farming mean is higher than the conventional mean, to 1 decimal place.", value: cfHigher, dp: 1, unit: "%", wrong: [40, 0.7],
        explanation: "(1.75 − 1.05) ÷ 1.05 × 100 = 66.7%." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest why the advantage of conservation farming is greatest in the dry-spell seasons.",
        points: [
          "In dry spells the basins and mulch conserve soil moisture, so crops continue to grow when rainfall is low (e.g. 1.2 against 0.5 t/ha in Season 2).",
          "Conventional plots lose more water by runoff and evaporation, so yields collapse in the dry seasons.",
        ],
        modelAnswer: "In dry seasons the basins and mulch hold moisture for the plants, so yields are 1.2 and 1.0 t/ha, whereas conventional fields lose water by runoff and evaporation and yield only 0.5 and 0.4 t/ha.",
        explanation: "Moisture conservation matters most when rain is short." }),
    ], explanation: "Calculate means and compare, then explain the pattern." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "Illustrative cereal production for a district whose annual need is 10 000 tonnes:\n\n" + tbl(["Year", "1", "2", "3", "4"], [["Production (tonnes)", ...PROD]]),
    hints: ["Mean = total ÷ 4.", "Self-sufficiency = production ÷ need × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean annual production, in tonnes.", value: mProd, unit: "t", wrong: [32400, 9025],
        explanation: "(9 200 + 6 100 + 9 700 + 7 400) ÷ 4 = 32 400 ÷ 4 = 8 100 tonnes." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the largest annual deficit (need minus production), in tonnes.", value: defic, unit: "t", wrong: [2600, 6100],
        explanation: "Year 2 has the lowest production: 10 000 − 6 100 = 3 900 tonnes." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the district's self-sufficiency in Year 2, as a percentage.", value: ssY2, unit: "%", wrong: [39, 6100],
        explanation: "6 100 ÷ 10 000 × 100 = 61%." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why production varies much more than the district's need from year to year.",
        points: [
          "Need depends on population, which changes slowly, so it is almost constant.",
          "Production depends on rainfall and its timing, which varies a lot between seasons in a rain-fed system.",
          "Pests, floods and heat can cut yields in some years, so output changes widely while needs do not.",
        ],
        modelAnswer: "The need for cereal depends on population, which changes only slowly. Production depends on rainfall, dry spells and pests, which differ greatly between seasons, so harvests rise and fall while the need stays almost constant.",
        explanation: "Production is variable; need is stable." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest measures to stabilise the district's food supply across years.",
        points: [
          "Use drought-tolerant crops and conservation farming to make yields less sensitive to poor seasons.",
          "Reduce post-harvest losses with better storage and build grain reserves in good years for use in poor years.",
          "Improve water management (small dams, boreholes, irrigation) and use seasonal forecasts to plan.",
        ],
        modelAnswer: "The district should grow drought-tolerant crops and use conservation farming so yields fall less in poor seasons. It can also reduce storage losses, build a grain reserve in good years, and improve water management and the use of seasonal forecasts.",
        explanation: "Reduce yield variability and store surplus for poor years." }),
    ], explanation: "Calculate production changes and suggest ways to stabilise supply." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the effectiveness of responses to climate change threats to food security in Zimbabwe.",
    hints: ["Pick at least three responses and evaluate each.", "Reach a judgement."],
    points: [
      "Drought-tolerant small grains and varieties are suited to regions IV and V and reduce crop failure, but markets and processing may be limited.",
      "Conservation farming (Pfumvudza/Intwasa) conserves water and raises yields in dry spells, but needs labour, mulch and training.",
      "Better post-harvest storage cuts losses cheaply (e.g. hermetic bags) and increases availability without new land.",
      "Improved water management (harvesting, boreholes, irrigation) stabilises production but costs money and needs maintenance.",
      "Pest control (integrated pest management) limits losses to pests such as fall armyworm but needs knowledge and inputs.",
      "Effectiveness depends on adoption: extension support, credit and markets are needed, and poor households are least able to adopt.",
      "Floods and severe droughts can overwhelm any single measure, so combined measures and safety nets are needed.",
      "Judgement: responses are effective where they are combined and supported, with conservation farming and storage most cost-effective for smallholders, but they cannot fully protect against extreme seasons.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Several responses are effective. Drought-tolerant small grains suit regions IV and V and reduce crop failure, although markets for them are small. Conservation farming conserves water and improves yields in dry spells but needs labour, mulch and training. Better storage is cheap and cuts losses so that more food is available without new land. Water harvesting and irrigation stabilise production but are costly to build and maintain, and pest control reduces losses to armyworm if farmers have knowledge and inputs. The success of each depends on extension support, credit and markets, and poor households find adoption hardest. Severe droughts and floods can overwhelm single measures. I conclude that responses are effective when combined and supported, with conservation farming and better storage the most cost-effective for smallholders, but they cannot fully protect against extreme seasons.",
    wordLimit: { max: 300 }, explanation: "Evaluate several responses for effectiveness, cost and adoption, then judge." });

  b.card("DEFINITION", "Food security", "Everyone, at all times, has physical, social and economic access to enough safe, nutritious food: availability, access, utilisation, stability.");
  b.card("CONCEPT", "Threats to food security", "Climate change, droughts, floods, pests and diseases (fall armyworm, quelea, theileriosis), soil degradation and post-harvest losses.");
  b.card("CONCEPT", "Drought-tolerant and indigenous crops", "Sorghum, pearl and finger millet, cowpeas, bambara nuts and early-maturing maize: suited to regions IV and V.");
  b.card("DEFINITION", "Conservation farming", "Minimum soil disturbance (planting basins), a mulch cover and rotation; saves water and soil. Zimbabwe: Pfumvudza/Intwasa.");
  b.card("CONCEPT", "Post-harvest techniques", "Proper drying, hermetic bags and metal silos, pest control: cut losses and raise food availability without new land.");
  b.card("CONCEPT", "Improved water management", "Rainwater harvesting (tied ridges, pits, small dams), drip irrigation, boreholes with solar pumps, scheduling.");
  b.card("FORMULA", "Self-sufficiency", "Self-sufficiency (%) = production ÷ need × 100; need = population × per-person requirement.");
  b.card("CONCEPT", "Evaluating a response", "Judge effectiveness, cost, labour and knowledge needed, suitability to region, speed and sustainability.");
});
