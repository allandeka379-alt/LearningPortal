// Slice W1a: farming systems (both boards).
import { concept, P, grossMargin, yieldPerHa, fmtNum, money, table, agricultureLevels } from "../lib.mjs";

const y14 = yieldPerHa({ kg: 18000, areaHa: 6 });

const inter = grossMargin({ output: [["Maize", 2800, 0.25], ["Cowpeas", 400, 0.8]], variable: [] });
const alone = grossMargin({ output: [["Maize", 3600, 0.25]], variable: [] });

const fx = yieldPerHa({ kg: 30000, areaHa: 5 });
const fy = yieldPerHa({ kg: 40000, areaHa: 40 });
const ratio = fx.kgPerHa / fy.kgPerHa;

const FARMS = [
  ["Area", "600 ha", "4 ha"],
  ["Enterprises", "Cotton only, every season", "Maize with beans, groundnuts, 8 cattle, 50 indigenous chickens"],
  ["Labour", "Tractors and hired workers", "Family; oxen for ploughing"],
  ["Cotton or maize harvested", "720,000 kg of seed cotton", "6,000 kg of maize"],
];
const cottonPerHa = 720000 / 600;
const maizePerHa = 6000 / 4;

const SITUATION = "Rudo has 5 ha of good land near Marondera, a borehole, some savings and a ready market in Harare. She is deciding between (1) growing maize alone on all 5 ha every season and (2) a mixed system: 3 ha of maize intercropped with beans, 1 ha of irrigated vegetables and a small dairy herd fed partly on crop residues.";
const veg = yieldPerHa({ kg: 25000, areaHa: 1 });

concept("agri.land.farming-systems", { file: "land/farming-systems", keyPrefix: "land.farming-systems" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **monoculture**?",
    options: [
      ["Growing one crop on the same land, often season after season", "Correct: monoculture is the growing of a single crop."],
      ["Keeping crops and livestock together on one farm", "This is mixed farming."],
      ["Growing two crops together in alternate rows", "This is intercropping."],
      ["Growing different crops in turn on the same land", "This is crop rotation."],
    ],
    answer: "A",
    explanation: "Monoculture means one crop only, usually on a large scale, often on the same land every season.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A farmer plants alternate rows of maize and cowpeas in the same field in the same season. What is this practice called?",
    options: [
      ["Intercropping", "Correct: two crops grow at the same time on the same land in a definite pattern."],
      ["Crop rotation", "Rotation grows crops one after another in different seasons."],
      ["Monoculture", "Monoculture is one crop only."],
      ["Mixed cropping", "Mixed cropping has no definite row pattern; alternate rows are a definite pattern."],
    ],
    answer: "A",
    explanation: "Intercropping uses a definite pattern such as alternate rows; mixed cropping scatters the crops with no pattern.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of mixed farming?",
    options: [
      ["Manure from the livestock helps maintain soil fertility", "Correct: animals return nutrients and organic matter to the fields."],
      ["The farmer needs to manage only one enterprise", "Mixed farming has several enterprises, which needs more skills."],
      ["Less capital is needed than on any other farm", "Fences, pens and water points add to the capital needed."],
      ["Pests build up because one crop is always grown", "This is a disadvantage of monoculture."],
    ],
    answer: "A",
    explanation: "In mixed farming, crops and livestock support each other: residues feed animals, and manure and draught power serve the crops. Several enterprises also spread the risk.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of growing the same crop on the same land every season?",
    options: [
      ["Pests and diseases of that crop build up in the field", "Correct: the pests always find their host plant, so their numbers grow."],
      ["The farmer cannot specialise in the crop", "Monoculture allows specialisation; that is an advantage."],
      ["Machinery cannot be used on the crop", "Large uniform crops are easy to mechanise."],
      ["The crop can no longer be sold under contract", "Monocultures often suit contract farming."],
    ],
    answer: "A",
    explanation: "Monoculture leads to the build-up of pests, diseases and weeds, falling fertility, and dependence on one crop.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is an example of **extensive** farming?",
    options: [
      ["Cattle ranching on large areas of natural veld", "Correct: large areas, low inputs per hectare, low output per hectare."],
      ["An irrigated vegetable garden near a town", "This uses high inputs on a small area: intensive."],
      ["A broiler house of 2,000 birds", "Housed poultry is intensive."],
      ["A dairy unit fed on irrigated pasture and concentrates", "Dairy units with irrigation and concentrates are intensive."],
    ],
    answer: "A",
    explanation: "Extensive farming uses much land with few inputs per hectare, typical of ranching in dry regions.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why do farmers often intercrop maize with a legume such as beans or cowpeas?",
    options: [
      ["The legume fixes nitrogen that can benefit the maize", "Correct: Rhizobium bacteria in legume root nodules fix nitrogen from the air."],
      ["The legume stops the maize from competing for water", "Intercrops compete for water; they do not stop competition."],
      ["Legumes make the maize easier to harvest by machine", "Intercrops make mechanised harvesting harder."],
      ["Legumes need much more nitrogen fertiliser than maize", "Legumes need little nitrogen because they fix their own."],
    ],
    answer: "A",
    explanation: "A legume adds nitrogen to the soil, gives a second product, improves ground cover and spreads risk.",
    hints: ["Think about the root nodules of legumes."],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A farm near Harare keeps 3,000 broilers in two houses and grows irrigated tomatoes and cabbages on 2 ha, all for sale. Which description fits this farm best?",
    options: [
      ["Intensive commercial farming", "Correct: high inputs on a small area, producing for sale."],
      ["Extensive subsistence farming", "The farm uses high inputs on a small area and sells its produce."],
      ["Extensive commercial farming", "The farm is commercial, but its small area and high inputs make it intensive."],
      ["Shifting cultivation", "Shifting cultivation moves to new land when fertility falls; this farm is permanent."],
    ],
    answer: "A",
    explanation: "Housed poultry and irrigated vegetables on a small area near a market are typical of intensive commercial farming.",
    hints: ["Consider the area, the inputs and who the produce is for."],
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A large commercial farm with tractors, boom sprayers and combine harvesters is considering intercropping its 400 ha of maize with cowpeas. What is the main practical drawback?",
    options: [
      ["Machinery is hard to use on two different crops", "Correct: the crops mature, are sprayed and are harvested differently, which complicates mechanisation."],
      ["Cowpeas will remove nitrogen from the soil", "Cowpeas fix nitrogen; they do not remove it in the way cereals do."],
      ["Total output from the land will fall to zero", "Intercrops usually give at least as much total output; it does not fall to zero."],
      ["Intercropping is forbidden on commercial farms", "There is no such rule."],
    ],
    answer: "A",
    explanation: "Intercropping suits hand labour. On large mechanised farms, different heights, maturity dates, spraying needs and harvest methods make it difficult, so monoculture with rotation is usual.",
    hints: ["Think about the machines the farm uses."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In mixed cropping, the crops are planted in a definite pattern such as alternate rows.",
    answer: false,
    explanation: "False. Mixed cropping has no definite pattern. A definite pattern such as alternate rows is intercropping.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A 1 ha irrigated vegetable garden that uses a lot of fertiliser and labour is an example of intensive farming.",
    answer: true,
    explanation: "True. Intensive means high inputs and high output per hectare, whatever the size of the farm.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each farming system with an example.",
    pairs: [
      ["Mixed farming", "Maize fields plus cattle fed on the stover"],
      ["Monoculture", "Cotton grown alone on 500 ha"],
      ["Intercropping", "Alternate rows of sorghum and cowpeas"],
      ["Extensive farming", "Game ranching on a large area of dry veld"],
      ["Subsistence farming", "A small plot of mixed food crops for the family"],
    ],
    explanation: "Each system is defined by how crops and livestock are combined, the scale and inputs, and the purpose of the produce.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each blank.",
    template: "Farming mainly to feed the family is {{blank:a}} farming. Using high inputs on a small area is {{blank:b}} farming.",
    blanks: [
      { id: "a", accepted: ["subsistence"], choices: ["subsistence", "commercial", "extensive", "mixed"] },
      { id: "b", accepted: ["intensive"], choices: ["intensive", "extensive", "subsistence", "shifting"] },
    ],
    explanation: "Subsistence farming feeds the family; commercial farming sells for profit. Intensive farming uses high inputs per hectare; extensive farming uses large areas with low inputs.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the farming system in which crops and livestock are kept on the same farm and support each other.",
    accepted: ["mixed farming", "mixed farming system", "mixed"],
    wrong: ["mixed cropping"],
    explanation: "Mixed farming links crops and livestock. Mixed cropping is a different practice: two or more crops grown together without a pattern.",
  });
  b.num({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A farmer harvests 18,000 kg of maize from 6 ha. Calculate the yield in kg/ha.",
    value: y14.kgPerHa, unit: "kg/ha", wrong: [108000],
    explanation: `Yield = 18,000 ÷ 6 = ${fmtNum(y14.kgPerHa)} kg/ha. (Multiplying gives 108,000, which is wrong.)`,
  });
  b.calc({
    d: 3, skill: "APPLICATION",
    stem: "On 1 ha, an intercrop gives 2,800 kg of maize and 400 kg of cowpeas. Assume maize sells at US\\$0.25 per kg and cowpeas at US\\$0.80 per kg. Calculate the total value of the intercrop in US\\$.",
    value: inter.grossOutput, prefix: "US$", wrong: [alone.grossOutput, 700],
    explanation: `Maize: 2,800 × 0.25 = ${money(inter.outputRows[0][3])}. Cowpeas: 400 × 0.80 = ${money(inter.outputRows[1][3])}. Total = ${money(inter.grossOutput)}.`,
    workedSolution: `1. Value of maize = 2,800 × 0.25 = ${money(inter.outputRows[0][3])}.\n2. Value of cowpeas = 400 × 0.80 = ${money(inter.outputRows[1][3])}.\n3. Total = ${money(inter.outputRows[0][3])} + ${money(inter.outputRows[1][3])} = ${money(inter.grossOutput)}.`,
    hints: ["Value = quantity × price for each crop, then add."],
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: "Farm X irrigates 5 ha and harvests 30,000 kg of maize. Farm Y grows rain-fed maize with few inputs on 40 ha and harvests 40,000 kg. How many times greater is Farm X's yield per hectare than Farm Y's?",
    value: ratio, wrong: [0.75, fy.kgPerHa / fx.kgPerHa],
    explanation: `Farm X: 30,000 ÷ 5 = ${fmtNum(fx.kgPerHa)} kg/ha. Farm Y: 40,000 ÷ 40 = ${fmtNum(fy.kgPerHa)} kg/ha. Ratio = ${fmtNum(fx.kgPerHa)} ÷ ${fmtNum(fy.kgPerHa)} = ${ratio}. Farm Y produces more in total (40,000 kg against 30,000 kg, a ratio of 0.75), but Farm X is far more intensive.`,
    workedSolution: `1. Farm X yield = 30,000 ÷ 5 = ${fmtNum(fx.kgPerHa)} kg/ha.\n2. Farm Y yield = 40,000 ÷ 40 = ${fmtNum(fy.kgPerHa)} kg/ha.\n3. Ratio = ${fmtNum(fx.kgPerHa)} ÷ ${fmtNum(fy.kgPerHa)} = ${ratio}.`,
    hints: ["Compare yields per hectare, not total harvests.", "Divide Farm X's yield by Farm Y's."],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** advantages of mixed farming for a smallholder.",
    points: [
      "Livestock provide manure.",
      "Explains that manure maintains soil fertility and structure, reducing fertiliser costs.",
      "Several enterprises spread risk / crop residues feed animals / oxen provide draught power.",
      "Explains the benefit: income continues if one enterprise fails / waste is used / ploughing without a tractor.",
    ],
    modelAnswer: "Cattle provide manure, which keeps the soil fertile so less fertiliser has to be bought. Having both crops and animals spreads the risk: if drought ruins the maize, cattle can still be sold.",
    explanation: "Each advantage needs a reason.",
    hints: ["Think about how crops and animals help each other."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A farmer has grown tobacco on the same field for six seasons and yields are falling. Explain **two** reasons, linked to monoculture, for the falling yields.",
    points: [
      "Pests and diseases (e.g. nematodes, soil-borne diseases) build up.",
      "Explains that the host crop is always present, so their numbers increase each season.",
      "The same nutrients are removed from the same soil depth.",
      "Explains that fertility (and soil structure/organic matter) declines, so the crop is less well fed.",
    ],
    modelAnswer: "Pests and soil-borne diseases of tobacco build up because their host is grown on the field every season. The crop also removes the same nutrients from the same depth each year, so the soil becomes less fertile.",
    explanation: "Monoculture leads to pest and disease build-up and nutrient depletion; rotation would break both.",
    hints: ["What happens to pests when their host is always present?"],
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", calculator: true,
    stem: `Table 1 compares two fictional farms.\n\n**Table 1**\n\n${table(["Feature", "Farm A", "Farm B"], FARMS)}`,
    hints: ["Yield per hectare = total harvest ÷ area.", "Use the clues in each row to name the system."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the yield of seed cotton on Farm A in kg/ha.", value: cottonPerHa, unit: "kg/ha", wrong: [720000], explanation: `720,000 ÷ 600 = ${fmtNum(cottonPerHa)} kg/ha.` }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the maize yield on Farm B in kg/ha.", value: maizePerHa, unit: "kg/ha", wrong: [6000], explanation: `6,000 ÷ 4 = ${fmtNum(maizePerHa)} kg/ha.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "Which farming system does Farm B follow?", options: [
        ["Mixed farming", "Correct: crops and livestock on one farm."],
        ["Monoculture", "Farm B grows several crops."],
        ["Extensive ranching", "Farm B is a small crop and livestock farm."],
        ["Plantation farming", "Farm B is a small family farm."],
      ], answer: "A", explanation: "Farm B combines crops (maize, beans, groundnuts) and livestock (cattle, chickens)." }),
      P.manual({ label: "(d)", marks: 4, stem: "Explain **two** risks that Farm A faces because of its farming system.", points: [
        "All income depends on one crop.",
        "So a drought, a pest outbreak or a fall in the cotton price could cause heavy losses.",
        "Pests and diseases of cotton build up / soil fertility falls.",
        "Because cotton is grown on the same land every season.",
      ], explanation: "Monoculture concentrates risk and builds up pests and diseases." }),
    ],
    explanation: "Farm A is a large commercial monoculture; Farm B is a small mixed farm.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, paper: "Paper 2", calculator: true,
    stem: SITUATION,
    hints: ["For (a), think about what each enterprise supplies to the others.", "For (c), weigh up output, risk, soil fertility, capital and skills, then decide."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Rudo's neighbour harvests 25,000 kg of vegetables from 1 ha of irrigated land. State this yield in t/ha.", value: veg.tPerHa, unit: "t/ha", wrong: [25000], explanation: `25,000 kg ÷ 1 ha = 25,000 kg/ha = ${veg.tPerHa} t/ha (1 t = 1,000 kg).` }),
      P.manual({ label: "(b)", marks: 4, stem: "Describe **two** ways in which the enterprises in option (2) would support each other.", points: [
        "Maize stover and bean residues feed the dairy cows.",
        "So less purchased feed is needed.",
        "Cow manure is spread on the maize and vegetables.",
        "So soil fertility is maintained and less fertiliser is bought / beans fix nitrogen for the maize.",
      ], explanation: "Enterprise links are the key strength of mixed farming." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss which option Rudo should choose.", points: [
        "Option 1 (maize alone): simple to manage and mechanise; one market (e.g. GMB or contract).",
        "But all income depends on maize; drought, pests or a low price cause heavy losses; pests build up and fertility falls.",
        "Option 2: several incomes spread risk; milk and vegetables give regular cash and use the Harare market.",
        "Option 2 uses residues and manure, maintaining fertility; the borehole makes irrigated vegetables possible.",
        "But option 2 needs more capital (dairy cows, housing), more skills and more labour.",
        "Reasoned conclusion, e.g. option 2 suits her land, water, savings and market better, provided she has the skills and labour.",
      ], levels: agricultureLevels(6), explanation: "A good answer weighs advantages and disadvantages of both and reaches a justified decision." }),
    ],
    explanation: "Mixed, intensive systems suit small farms with water, capital and a nearby market, if the farmer has the skills.",
  });

  b.card("DEFINITION", "Mixed farming", "Crops and livestock on the same farm, supporting each other (residues feed animals; manure and draught power serve crops).");
  b.card("DEFINITION", "Monoculture", "Growing one crop only, often on the same land every season.");
  b.card("DEFINITION", "Intercropping", "Two or more crops grown at the same time on the same land in a definite pattern, e.g. alternate rows.");
  b.card("DEFINITION", "Mixed cropping", "Two or more crops grown together at the same time with no definite pattern.");
  b.card("CONCEPT", "Intensive versus extensive", "Intensive: high inputs and output per hectare on a small area. Extensive: large area, low inputs and output per hectare.");
  b.card("CONCEPT", "Subsistence versus commercial", "Subsistence: mainly to feed the family. Commercial: mainly for sale at a profit.");
  b.card("CONCEPT", "Disadvantages of monoculture", "Pest, disease and weed build-up; falling fertility; all income depends on one crop.");
  b.card("CONCEPT", "Advantages of intercropping", "Higher total output, nitrogen from legumes, better ground cover, less risk; but crops compete and mechanisation is harder.");
  b.card("FORMULA", "Yield per hectare", "Yield (kg/ha) = total harvest (kg) ÷ area (ha); 1 t/ha = 1,000 kg/ha.");
});
