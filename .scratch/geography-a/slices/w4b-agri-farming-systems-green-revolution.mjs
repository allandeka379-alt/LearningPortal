// W4b: agri.farming-systems-green-revolution (ZIMSEC only). All data are illustrative.
// Computed: wheat yield 1.2 -> 3.0 t/ha (+150%), 800 ha: 960 -> 2 400 t (+1 440); profit trad 250, HYV 400 (gain 150), drought HYV -100;
// ranch 2 400 ha / 8 ha per beast = 300; district totals.
import { concept, P, geographyLevels, chk, rnd } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const yPct = chk(((3.0 - 1.2) / 1.2) * 100, 150, 1e-9);
const p65 = chk(800 * 1.2, 960, 1e-9);
const p85 = chk(800 * 3.0, 2400, 1e-9);
const pGain = chk(p85 - p65, 1440, 1e-9);
const profT = chk(1.8 * 250 - 200, 250, 1e-9);
const profH = chk(4.0 * 250 - 600, 400, 1e-9);
const gain = chk(profH - profT, 150, 1e-9);
const drought = chk(2.0 * 250 - 600, -100, 1e-9);
const cattle = chk(2400 / 8, 300, 1e-9);
const hYield = chk((4.0 - 1.8) / 1.8 * 100, 122.2222222, 1e-6);
const WT = tbl(["Year", "Wheat area (ha)", "Mean yield (t/ha)", "Production (t)"], [[1965, 800, "1.2", p65], [1985, 800, "3.0", p85]]);

concept("ageo.agri.farming-systems-green-revolution", { file: "agri/farming-systems-green-revolution", keyPrefix: "agri.farming-systems-green-revolution" }, (b) => {
  mc(b, 1, "RECALL", "Which farming system involves moving herds of livestock seasonally in search of grazing and water?", [
    ["Pastoral nomadism", "Correct: herders move with their animals."],
    ["Shifting cultivation", "This moves crop fields, not herds."],
    ["Plantation farming", "Plantations are fixed, large cash-crop farms."],
    ["Market gardening", "Market gardens are small, fixed and near towns."],
  ], "**Pastoral nomadism** is the seasonal movement of herds.");
  mc(b, 2, "UNDERSTANDING", "Which is a characteristic of shifting cultivation?", [
    ["Land is cleared, cropped for a few years, then left to recover", "Correct: fallow restores soil nutrients."],
    ["Large areas are planted to one crop with hired labour and machinery", "That describes a plantation."],
    ["Crops are grown on the same field each year with fertiliser", "That describes permanent cultivation."],
    ["Most output is sold to supermarkets and exporters for cash", "That describes commercial horticulture."],
  ], "Shifting cultivation clears a plot, uses it briefly and then **moves on**.");
  mc(b, 2, "UNDERSTANDING", "Which crop is grown on large estates in the south-east lowveld of Zimbabwe under irrigation?", [
    ["Sugarcane", "Correct: the lowveld is hot and dry, so irrigation supports cane."],
    ["Tea", "Tea needs the cool, wet Eastern Highlands."],
    ["Pearl millet", "Millet is a small grain grown by smallholders."],
    ["Winter barley", "Barley is not a lowveld estate crop."],
  ], "**Sugarcane** estates use irrigation in the hot lowveld.");
  mc(b, 2, "RECALL", "Which change is a biochemical part of the Green Revolution?", [
    ["High-yielding seed varieties supplied with fertiliser", "Correct: seed and chemical inputs are biochemical changes."],
    ["Tractors and combine harvesters replacing animal power", "These are mechanical changes."],
    ["Credit schemes and farmer cooperatives", "These are socio-economic changes."],
    ["Rural roads and electricity supply to villages", "These are socio-economic support."],
  ], "HYVs, fertilisers and pesticides are the **biochemical** package.");
  mc(b, 3, "APPLICATION", "Why did many poor farmers gain little from the early Green Revolution?", [
    ["They lacked money for seed and fertiliser and had no irrigation", "Correct: HYVs need purchased inputs and reliable water."],
    ["The new varieties gave lower yields than traditional ones", "Yields were higher when inputs were supplied."],
    ["Governments forbade small farms from using the new seed in all areas", "There was no such general ban."],
    ["The varieties could not be grown on irrigated land", "They were mostly grown on irrigated land."],
  ], "HYVs need **inputs and water**, which poor farmers often could not afford.", { hints: ["Think about what the new seed needs in order to perform."] });
  mc(b, 3, "ANALYSIS", "Which is an environmental problem linked to the Green Revolution?", [
    ["Fertiliser runoff polluting rivers and groundwater", "Correct: nutrients run off and cause pollution and eutrophication."],
    ["Soils becoming more fertile without any inputs", "Soils needed continued inputs."],
    ["A rise in the number of local crop varieties grown on farms", "Diversity fell as uniform varieties spread."],
    ["A fall in the amount of irrigation water used", "Irrigation use rose."],
  ], "Fertiliser and pesticide **runoff** pollutes water.", { hints: ["Think about what happens to chemicals that crops do not take up."] });
  mc(b, 4, "EVALUATION", "A district's wheat yield rises from 1.2 to 3.0 t/ha, but half the small farmers have left farming because of debt. Which is the best judgement?", [
    ["Output success is clear, but the benefits were unevenly shared", "Correct: it recognises both the yield gain and the social cost."],
    ["The programme succeeded because yield is the only measure that matters", "Success includes who benefits and for how long."],
    ["The programme failed because yields cannot rise with new varieties", "Yields did rise."],
    ["No judgement is possible because the data are about wheat only", "A judgement can be made from the evidence."],
  ], "A balanced judgement recognises the **yield gain** and the **unequal distribution of benefit**.", { hints: ["Look for the option that uses both pieces of evidence."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Most of the output of subsistence farms is consumed by the farm family.", answer: true,
    feedbackTrue: "Correct: that is the meaning of subsistence farming.",
    feedbackFalse: "Not so: subsistence farming mainly feeds the household.",
    explanation: "Subsistence output is eaten at home, with any surplus sold." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Ranching in Zimbabwe uses a large number of workers per hectare.", answer: false,
    feedbackFalse: "Correct: ranching is extensive and uses few workers per hectare.",
    feedbackTrue: "Not so: extensive ranching needs little labour per hectare.",
    explanation: "Ranches cover large areas with low labour input." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "In shifting cultivation the land is left to {{blank:a}} after a few years of cropping. The most widely grown staple cereal in Zimbabwe is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["recover"], choices: ["recover", "flood", "mine"] },
      { id: "b", accepted: ["maize"], choices: ["maize", "rice", "barley"] },
    ], explanation: "Fallow lets the soil **recover**; **maize** is the staple." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each system to the example or location with which it is usually linked.",
    pairs: [
      ["Plantation", "Sugarcane estate in the lowveld"],
      ["Pastoral nomadism", "Herding cattle and camels in the Sahel"],
      ["Communal farming", "Households growing maize on customary land in a communal area"],
      ["Green Revolution", "Short-strawed wheat and rice varieties from the 1960s"],
    ], explanation: "Each term is linked to a typical example." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%",
    stem: "In this exercise (illustrative data) average wheat yield rose from 1.2 t/ha in 1965 to 3.0 t/ha in 1985. Calculate the percentage increase in yield.",
    hints: ["Percentage change = change ÷ original × 100."],
    value: yPct, wrong: [60, 1.8],
    explanation: "Change = 3.0 − 1.2 = 1.8. 1.8 ÷ 1.2 × 100 = **150%**. The value 60 divides by the new yield." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "The district grows wheat on 800 ha. Using yields of 1.2 t/ha (1965) and 3.0 t/ha (1985), calculate the increase in total production, in tonnes.",
    hints: ["Production = area × yield for each year.", "Subtract the earlier from the later."],
    value: pGain, wrong: [2400, 1.8],
    explanation: "1965: 800 × 1.2 = 960 t. 1985: 800 × 3.0 = 2 400 t. Increase = **1 440 t**. The value 2 400 is the 1985 total, not the increase." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "Per hectare a high-yielding variety yields 4.0 t at US\\$250 per tonne and costs US\\$600 to grow. A traditional variety yields 1.8 t and costs US\\$200. Calculate the extra profit per hectare from the HYV, in US\\$.",
    hints: ["Profit = yield × price − cost, for each variety.", "Then find the difference."],
    value: gain, wrong: [400, 250, 1000],
    explanation: "HYV: 4.0 × 250 − 600 = 400. Traditional: 1.8 × 250 − 200 = 250. Extra profit = 400 − 250 = **US\\$150 per hectare**." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the Mexican-based plant breeder who developed short-strawed, high-yielding wheat in the 1940s and 1950s.",
    accepted: ["Norman Borlaug", "Borlaug", "Dr Norman Borlaug"], wrong: ["Weber"],
    explanation: "**Norman Borlaug**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Give the term for a large farm growing a single cash crop such as tea or sugarcane, often with processing on site.",
    accepted: ["plantation", "estate", "plantation farm", "a plantation", "plantation or estate"], wrong: ["ranch"],
    explanation: "A **plantation** (or estate)." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe the main differences between subsistence and commercial farming.",
    hints: ["Think about purpose, labour, inputs and size."],
    points: [
      "Subsistence farming mainly feeds the family; commercial farming mainly sells for profit.",
      "Subsistence farms are generally small; commercial farms are medium to very large.",
      "Subsistence farms use family labour; commercial farms use hired workers.",
      "Subsistence farms use few purchased inputs and have lower yields; commercial farms use fertiliser, machinery or irrigation and have higher yields.",
    ],
    modelAnswer: "Subsistence farming mainly feeds the family, whereas commercial farming mainly sells for profit. Subsistence farms are small and use family labour, with few purchased inputs and lower yields. Commercial farms are larger, use hired workers, and use fertiliser, machinery or irrigation, giving higher yields.",
    explanation: "Compare the two on purpose, size, labour and inputs." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why shifting cultivation becomes less sustainable as population density increases.",
    hints: ["Think about how long the land is left to recover."],
    points: [
      "More people need more food, so the fallow period is shortened.",
      "Soil nutrients and organic matter are not restored before the field is cropped again, so yields fall.",
      "Repeated clearing increases erosion and loss of woodland, so the land is degraded.",
    ],
    modelAnswer: "More people need more food, so fields are cropped again before the soil has recovered. Nutrients and organic matter are not restored and yields fall, and repeated clearing causes erosion and loss of woodland.",
    explanation: "Shorter fallow leads to soil exhaustion and degradation." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why the Green Revolution brought fewer benefits to many parts of sub-Saharan Africa than to Asia.",
    hints: ["Think about irrigation, markets, varieties and credit."],
    points: [
      "A smaller share of farmland is irrigated, and HYVs depend on reliable water.",
      "Input supplies, credit and extension services were weaker, so few farmers could afford or find the package.",
      "Suitable improved varieties of local staples such as sorghum, millet and cassava were fewer at first.",
      "Poor roads and markets raised input prices and made it hard to sell a surplus, and drought risk is high.",
    ],
    modelAnswer: "Less land is irrigated and HYVs depend on reliable water. Credit, input supply and extension services were weaker, improved varieties of local staples such as sorghum and millet were fewer at first, and poor roads and markets made inputs dear and made it hard to sell a surplus.",
    explanation: "Water, inputs, varieties and markets limited the gains." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `The table shows wheat production in an irrigated district before and after the introduction of high-yielding varieties (data invented for this exercise).\n\n${WT}`,
    hints: ["Percentage change = change ÷ original × 100.", "Think of seed, fertiliser, pesticides and water."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage increase in mean yield between 1965 and 1985.", value: yPct, unit: "%", wrong: [60, 1.8],
        explanation: "(3.0 − 1.2) ÷ 1.2 × 100 = 150%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the increase in production between 1965 and 1985, in tonnes.", value: pGain, unit: "t", wrong: [2400, 800],
        explanation: "2 400 − 960 = 1 440 t." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain two biochemical changes that could account for the rise in yield.",
        points: [
          "High-yielding varieties are short and strong and respond to fertiliser with larger grain yields.",
          "Fertiliser and pesticides supply nutrients and reduce losses to pests and weeds.",
        ],
        modelAnswer: "High-yielding varieties are short-strawed and respond to fertiliser with more grain, and fertiliser and pesticides supply nutrients and reduce losses to pests and weeds.",
        explanation: "Seed and chemical inputs explain the rise." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two reasons why some small farmers in the district may not have shared in the gain.",
        points: [
          "They lacked money or credit for seed, fertiliser and chemicals.",
          "They had no access to irrigation water or to advice and markets.",
        ],
        modelAnswer: "They lacked money or credit to buy the seed, fertiliser and chemicals, and had no reliable irrigation water or access to advice and markets.",
        explanation: "Cost and access limited the benefit." }),
    ], explanation: "Calculate yield and production change and explain the causes and unequal gains." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A cattle ranch in the Zimbabwean lowveld covers 2 400 ha and is stocked at one beast per 8 ha (illustrative data). A tea estate in the Eastern Highlands covers 600 ha, grows one crop and has a factory on the estate.",
    hints: ["Number of cattle = area ÷ area per beast.", "Compare labour needs of the two systems."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of cattle on the ranch.", value: cattle, unit: "units", wrong: [19200, 8],
        explanation: "2 400 ÷ 8 = 300 cattle. Multiplying gives 19 200, which is wrong." }),
      P.manual({ label: "(b)", marks: 2, stem: "State two features of plantation or estate farming shown by the tea estate.",
        points: [
          "It grows a single cash crop over a large area.",
          "It processes the crop on site and uses hired labour.",
        ],
        modelAnswer: "It grows one cash crop over a large area and processes it in a factory on the estate using hired labour.",
        explanation: "Large single-crop farm with on-site processing." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the tea estate employs many more workers per hectare than the ranch.",
        points: [
          "Tea leaves are picked by hand, which needs many pickers at frequent intervals through the season.",
          "The factory, nursery and maintenance need further workers.",
          "Ranching is extensive, with few workers needed to look after widely spread animals.",
        ],
        modelAnswer: "Tea leaves are picked by hand at frequent intervals, which needs many pickers, and the factory and nursery need more workers. Ranching is extensive, and a few herders can look after widely spread animals.",
        explanation: "Intensive crop work versus extensive livestock." }),
      P.manual({ label: "(d)", marks: 5, stem: "Compare commercial farming with communal farming in Zimbabwe.",
        points: [
          "Purpose: commercial farming aims at profit, whereas communal farming mainly feeds the household.",
          "Size: commercial farms are larger, communal plots are small.",
          "Labour: commercial farms hire workers; communal households use family labour.",
          "Inputs: commercial farms use irrigation, machinery and fertiliser; communal farms use fewer, often manure and saved seed.",
          "Yields and risk: commercial yields are higher and steadier, while communal yields vary with rainfall.",
        ],
        modelAnswer: "Commercial farming aims at profit while communal farming mainly feeds the household. Commercial farms are larger and use hired labour, with irrigation, machinery and fertiliser, whereas communal plots are small and worked by the family with fewer inputs. Commercial yields are higher and steadier, while communal yields vary with rainfall.",
        explanation: "Compare on purpose, size, labour, inputs and yield." }),
    ], explanation: "Calculate stocking and compare farming systems." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the success of the Green Revolution.",
    hints: ["Give successes and problems, and say for whom.", "Reach a judgement."],
    points: [
      "Yields of wheat and rice rose sharply where HYVs were grown with fertiliser and water.",
      "Countries such as India moved towards self-sufficiency in cereals, which improved food supply.",
      "Higher yields reduced the pressure to clear new land for farming.",
      "Wealthier farmers with irrigation and credit gained most, widening inequality, and some poor farmers fell into debt.",
      "Heavy irrigation lowered water tables and caused salinisation and waterlogging in places.",
      "Fertiliser and pesticide runoff polluted water, and pests became resistant.",
      "Uniform varieties reduced crop diversity, and gains were small where water and inputs were scarce, as in much of sub-Saharan Africa.",
      "Judgement: successful in raising output, but its benefits were unevenly shared and sustainability was weak without careful management.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "The Green Revolution raised yields of wheat and rice sharply where high-yielding varieties were grown with fertiliser and water, and countries such as India moved towards self-sufficiency in cereals, which improved food supply and reduced pressure to clear new land. However, wealthier farmers with irrigation and credit gained most, widening inequality, and some poor farmers fell into debt. Heavy irrigation lowered water tables and caused salinisation, fertiliser and pesticide runoff polluted water, and uniform varieties reduced crop diversity. Where water and inputs were scarce, as in much of sub-Saharan Africa, the gains were small. I conclude that it succeeded in raising output but its benefits were uneven and it was not sustainable without careful management.",
    wordLimit: { max: 300 }, explanation: "Weigh output gains against social and environmental costs and judge." });

  b.card("DEFINITION", "Subsistence farming", "Farming in which most of the output is eaten by the farm family; any surplus is sold.");
  b.card("DEFINITION", "Green Revolution", "Rapid rise in cereal yields from the 1960s through high-yielding varieties, fertiliser, pesticides, irrigation and machinery.");
  b.card("CONCEPT", "Shifting cultivation", "Clear a plot, crop it for a few years, then move on and let it recover; sustainable only at low population density.");
  b.card("CONCEPT", "Pastoral nomadism", "Seasonal movement of herds in search of grazing and water, as in the Sahel and parts of East Africa.");
  b.card("FACT", "Commercial farming systems", "Dairy, horticulture, ranching, plantations and estates.");
  b.card("FACT", "Zimbabwe's cereals", "Maize (staple), wheat (irrigated winter crop), sorghum and millets (drought-tolerant small grains), and minor rice.");
  b.card("CONCEPT", "Three kinds of Green Revolution change", "Biochemical (HYVs, fertiliser, pesticides), mechanical (tractors, pumps, irrigation) and socio-economic (credit, advice, markets).");
  b.card("CONCEPT", "Problems of the Green Revolution", "Inequality and debt, falling water tables and salinisation, chemical pollution, pest resistance and loss of crop diversity.");
  b.card("FACT", "Pioneers of high-yielding varieties", "Norman Borlaug (wheat, Mexico) and the International Rice Research Institute (IR8 rice, Philippines).");
});
