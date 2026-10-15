// W4b: agri.land-reform-food-security (ZIMSEC only). Neutral wording; all production data are illustrative (labelled in stems).
// Computed: self-sufficiency 1 400/1 800 = 77.8%; shortfall season 2 = 700; mean output 1 550; season 4 -> 5 change +137.5%.
import { concept, P, geographyLevels, chk, rnd, mean } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const REQ = 1800;
const OUT = [2200, 1100, 1400, 800, 1900, 1900];
const RAIN = ["normal", "poor", "below normal", "drought", "normal", "normal"];
const ss3 = rnd((OUT[2] / REQ) * 100, 1, 77.8, "ss3");
const short2 = chk(REQ - OUT[1], 700);
const meanOut = chk(mean(OUT), 1550);
const meanSS = rnd((meanOut / REQ) * 100, 1, 86.1, "meanSS");
const chg45 = chk(((OUT[4] - OUT[3]) / OUT[3]) * 100, 137.5, 1e-9);
const ss1 = rnd((OUT[0] / REQ) * 100, 1, 122.2, "ss1");
const TAB = tbl(["Season", "Rainfall", "Maize output (000 t)", "Requirement (000 t)"], OUT.map((o, i) => [i + 1, RAIN[i], o.toLocaleString("en").replace(/,/g, " "), "1 800"]));
const TAB2 = tbl(["Group of farms", "Maize yield (t/ha)"], [["A1 farms", "0.9"], ["A2 farms", "1.4"], ["Communal areas", "0.6"]]);

concept("ageo.agri.land-reform-food-security", { file: "agri/land-reform-food-security", keyPrefix: "agri.land-reform-food-security" }, (b) => {
  mc(b, 1, "RECALL", "Which colonial law of 1930 divided the land of Southern Rhodesia on racial lines?", [
    ["The Land Apportionment Act", "Correct: it reserved areas for European and African ownership."],
    ["The Land Acquisition Act", "This was passed in 1992 to allow compulsory acquisition."],
    ["The Environmental Management Act", "This deals with environmental protection."],
    ["The Mines and Minerals Act", "This deals with mining rights."],
  ], "The **Land Apportionment Act (1930)** divided land by race.");
  mc(b, 2, "RECALL", "In the Fast Track Land Reform Programme, what were A1 farms?", [
    ["Smallholder farms, villagised or self-contained", "Correct: A1 was the smallholder model."],
    ["Large estates growing tea and coffee for export", "These are plantations, not the A1 model."],
    ["Communal grazing areas held by a chief", "Communal areas existed before the programme."],
    ["Farms owned only by foreign companies", "A1 beneficiaries were individual households."],
  ], "**A1** farms were smallholder plots; **A2** were small to medium commercial farms.");
  mc(b, 2, "UNDERSTANDING", "Which part of food security concerns whether people can buy or reach the food that is available?", [
    ["Access", "Correct: it depends on income, prices and transport."],
    ["Availability", "This concerns how much food exists in the country."],
    ["Stability", "This concerns whether supply and access continue over time."],
    ["Fertility", "This is not one of the four parts."],
  ], "**Access** is about incomes, prices and distance to food.");
  mc(b, 3, "APPLICATION", "A table shows maize output falling in a drought season while the land system is unchanged. What does this suggest?", [
    ["Rainfall strongly affects output whatever the land system", "Correct: the fall is explained by the weather, not the land system."],
    ["The land system has no effect on output in any season, wet or dry", "One season cannot show that."],
    ["Maize farmers stopped growing the crop on purpose", "A fall in a drought year is not evidence of this."],
    ["Food security depends only on the size of the harvest", "Access, utilisation and stability also matter."],
  ], "Drought lowers output in any system; **rainfall** must be considered.", { hints: ["Ask what changed between the seasons being compared."] });
  mc(b, 3, "ANALYSIS", "Which statement shows neutral, evidence-based wording about land reform?", [
    ["Supporters argue that more households now hold land, while critics point to lower early output", "Correct: both views are attributed and linked to evidence."],
    ["The reform was a complete success and every criticism of it is simply wrong", "This takes a side."],
    ["The reform was a total failure and its supporters are foolish", "This takes a side and is insulting."],
    ["Nobody has any opinion about land reform in Zimbabwe", "People hold different views."],
  ], "Neutral wording **attributes** positions to groups and links them to evidence.", { hints: ["Look for the option that names both groups."] });
  mc(b, 4, "EVALUATION", "Which evidence would best test the claim that land reform raised national maize output?", [
    ["Yields of different farm types in seasons of similar rainfall", "Correct: it controls for the weather."],
    ["The total output in one drought season", "One season with unusual weather proves little."],
    ["The number of new farms created with no data on their yields at all", "Farm numbers do not show output."],
    ["Newspaper opinions about the reform", "Opinions are not measurements of output."],
  ], "Compare **yield or output** for different farms under **similar rainfall**.", { hints: ["Which option removes the effect of the weather?"] });
  b.tf({ d: 1, skill: "RECALL", stem: "Food security means only that a country grows enough maize.", answer: false,
    feedbackFalse: "Correct: food security also needs access, utilisation and stability.",
    feedbackTrue: "Not so: it has four parts, including access and stability.",
    explanation: "Food security has availability, access, utilisation and stability." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Droughts reduce maize output in Zimbabwe whatever the system of land ownership.", answer: true,
    feedbackTrue: "Correct: maize depends on rain, so droughts lower output in all systems.",
    feedbackFalse: "Not so: drought affects all rain-fed maize.",
    explanation: "Rain-fed maize is vulnerable to drought on any type of farm." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "The Lancaster House agreement of {{blank:a}} allowed land to be acquired only from willing sellers for the first ten years. The Fast Track programme began in the year {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["1979"], choices: ["1979", "1990", "2008"] },
      { id: "b", accepted: ["2000"], choices: ["2000", "1980", "2015"] },
    ], explanation: "Lancaster House was in **1979**; Fast Track began in **2000**." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Land Apportionment Act (1930)", "Divided land into areas for European and African ownership"],
      ["Willing seller, willing buyer", "Land bought by the state only when owners agreed to sell"],
      ["A2 model", "Small to medium commercial farms"],
      ["Self-sufficiency ratio", "National production divided by national requirement"],
    ], explanation: "Each is a key term of the topic." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "%", dp: 1,
    stem: "In a season (illustrative data) national maize output was 1 400 thousand tonnes and the requirement was 1 800 thousand tonnes. Calculate the self-sufficiency ratio, as a percentage to 1 decimal place.",
    hints: ["Output ÷ requirement × 100."],
    value: ss3, wrong: [128.6, 400],
    explanation: "1 400 ÷ 1 800 × 100 = **77.8%**. The value 128.6 divides the requirement by the output." });
  b.num({ d: 2, skill: "APPLICATION", calculator: true, unit: "t",
    stem: "In a season (illustrative data) maize output was 1 100 thousand tonnes against a requirement of 1 800 thousand tonnes. Calculate the shortfall, in thousand tonnes.",
    hints: ["Shortfall = requirement − output."],
    value: short2, wrong: [61.1, 2900],
    explanation: "1 800 − 1 100 = **700 thousand tonnes**." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 1,
    stem: `Maize output over six seasons is shown (illustrative data).\n\n${TAB}\n\nCalculate the percentage increase in output from season 4 to season 5.`,
    hints: ["Change ÷ original × 100.", "The original is season 4."],
    value: chg45, wrong: [57.9, 1100],
    explanation: "1. Change = 1 900 − 800 = 1 100.\n2. 1 100 ÷ 800 × 100 = **137.5%**.\n3. The value 57.9 divides by the later figure." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the 1979 conference whose agreement included the first ten years of market-based land purchase in Zimbabwe.",
    accepted: ["Lancaster House", "Lancaster House Conference", "Lancaster House Agreement", "the Lancaster House Agreement"], wrong: ["Harare"],
    explanation: "The **Lancaster House** conference and agreement." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "Give the term for national food production divided by national food requirement, multiplied by 100.",
    accepted: ["self-sufficiency ratio", "self sufficiency ratio", "food self-sufficiency ratio", "self-sufficiency", "self sufficiency"], wrong: ["dependency ratio"],
    explanation: "The **self-sufficiency ratio**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why there was a need for land reform in Zimbabwe at independence in 1980.",
    hints: ["Think about colonial land laws and the condition of communal areas."],
    points: [
      "Colonial laws such as the Land Apportionment Act (1930) and Land Tenure Act (1969) reserved the best-watered land for commercial farms.",
      "Most African households lived in communal areas in drier regions with poorer soils.",
      "Communal areas were overcrowded, which led to soil erosion and low yields.",
      "Landless households and many who had lost land wanted access to land for food and income.",
    ],
    modelAnswer: "Colonial laws such as the Land Apportionment Act and the Land Tenure Act reserved the best-watered land for commercial farms, while most African households lived in communal areas in drier regions with poorer soils. These areas were overcrowded, with erosion and low yields, and many households had no land at all and wanted it for food and income.",
    explanation: "Unequal distribution, poor communal land, overcrowding and landlessness." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the Fast Track Land Reform Programme that began in 2000.",
    hints: ["Mention the two main models and what happened to commercial farmland."],
    points: [
      "It acquired a large share of commercial farmland, mostly white-owned, for redistribution.",
      "Land was allocated under two models: A1 smallholder farms and A2 small to medium commercial farms.",
      "Beneficiaries received offer letters or leases, and the process was disputed and followed by compensation and tenure arrangements.",
    ],
    modelAnswer: "The programme acquired a large share of commercial farmland, mostly white-owned, and redistributed it as A1 smallholder farms and A2 small to medium commercial farms. Beneficiaries received offer letters or leases, and the process was disputed and followed by compensation and tenure arrangements.",
    explanation: "Acquisition, two models and tenure documents." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: `Seasonal maize output (illustrative data):\n\n${TAB}\n\nDescribe the pattern in output and its relationship to rainfall.`,
    hints: ["Quote the highest and lowest output and the rainfall in those seasons."],
    points: [
      "Output is highest in season 1 (2 200 thousand tonnes) when rainfall is normal.",
      "Output is lowest in season 4 (800 thousand tonnes), which is a drought season.",
      "Output exceeds the requirement of 1 800 thousand tonnes only in the three seasons with normal rainfall (1, 5 and 6).",
      "Output is below requirement in the poor, below-normal and drought seasons (2, 3 and 4), so rainfall and output vary together.",
    ],
    modelAnswer: "Output is highest in season 1 (2 200 thousand tonnes) when rainfall is normal and lowest in season 4 (800 thousand tonnes), a drought season. Output exceeds the requirement of 1 800 thousand tonnes only in the three seasons with normal rainfall, and is below it in seasons 2, 3 and 4 when rainfall is poor, below normal or drought, so output and rainfall vary together.",
    explanation: "Describe with figures, then link output to rainfall." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: `The table shows maize output and national requirement over six seasons (illustrative data, not official statistics).\n\n${TAB}`,
    hints: ["Mean = total ÷ 6.", "Self-sufficiency = output ÷ requirement × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the mean maize output over the six seasons, in thousand tonnes.", value: meanOut, unit: "t", wrong: [9300, 1800],
        explanation: "(2 200 + 1 100 + 1 400 + 800 + 1 900 + 1 900) ÷ 6 = 9 300 ÷ 6 = 1 550." }),
      P.num({ label: "(b)", marks: 2, stem: "Express the mean output as a percentage of the requirement, to 1 decimal place.", value: meanSS, dp: 1, unit: "%", wrong: [116.1, 1550],
        explanation: "1 550 ÷ 1 800 × 100 = 86.1%." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why a good maize harvest does not guarantee food security for every household.",
        points: [
          "Food access depends on income and prices, and poor households may not be able to buy food.",
          "Food utilisation depends on nutrition, safe water and health, so maize alone does not give a balanced diet.",
          "Stability: supply and access may be interrupted by drought, price rises or poor roads in other seasons.",
        ],
        modelAnswer: "Poor households may not have the income to buy maize because access depends on prices and incomes. A balanced diet needs more than maize and safe water and health, and supply and access may be broken in later seasons by drought, price rises or poor roads.",
        explanation: "Access, utilisation and stability are needed as well as availability." }),
      P.manual({ label: "(d)", marks: 5, stem: "Suggest five measures that could reduce the risk of food shortage in drought seasons.",
        points: [
          "Grow drought-tolerant small grains such as sorghum and millets in the drier regions.",
          "Expand irrigation and water harvesting.",
          "Adopt conservation farming, mulching and early planting to save soil moisture.",
          "Keep grain reserves at national and household level.",
          "Use early warning systems and seasonal forecasts so that planting and imports can be planned.",
        ],
        modelAnswer: "Grow drought-tolerant small grains such as sorghum and millets in the drier regions, expand irrigation and water harvesting, adopt conservation farming and early planting, keep grain reserves, and use early warning systems and seasonal forecasts to plan planting and imports.",
        explanation: "Crops, water, soil moisture, stocks and forecasts reduce drought risk." }),
    ], explanation: "Calculate average output and self-sufficiency and discuss food security." });

  b.struct({ d: 5, skill: "EVALUATION",
    stem: `A survey in one season of similar rainfall found the following mean maize yields (data invented for this exercise).\n\n${TAB2}`,
    hints: ["Quote values from the table.", "Remember the survey covers only one season."],
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the differences in yield shown in the table.",
        points: [
          "A2 farms have the highest yield (1.4 t/ha), followed by A1 farms (0.9 t/ha).",
          "Communal areas have the lowest yield (0.6 t/ha).",
        ],
        modelAnswer: "A2 farms have the highest yield at 1.4 t/ha, then A1 farms at 0.9 t/ha, and communal areas have the lowest at 0.6 t/ha.",
        explanation: "Order the groups with quoted figures." }),
      P.manual({ label: "(b)", marks: 4, stem: "Suggest reasons why the yields differ between the three groups.",
        points: [
          "A2 farmers are more likely to have capital for fertiliser, seed and mechanisation.",
          "Some farms have access to irrigation or better soils, which raises yields.",
          "Communal areas have older, smaller and more eroded fields with fewer inputs.",
          "Access to credit, extension advice and markets differs between groups.",
        ],
        modelAnswer: "A2 farmers are more likely to have capital for fertiliser, seed and machinery, and some farms have irrigation or better soils. Communal areas have smaller, more eroded fields with fewer inputs, and access to credit, advice and markets differs between the groups.",
        explanation: "Capital, water, soils and services explain the differences." }),
      P.manual({ label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Using the table and your own knowledge, assess how far land reform has improved food production in Zimbabwe.",
        points: [
          "More households hold land, so more people produce food directly.",
          "A1 farms yield more than communal areas in the survey, which suggests some gain in output per hectare.",
          "A2 farms yield most, but the table covers one season only, so a trend cannot be proved.",
          "Rainfall, inputs, credit and irrigation affect yields in all groups.",
          "Limited tenure security and shortage of capital restrict investment on many new farms.",
          "Judgement: land reform has widened access to land and may have raised yields in some groups, but overall food production also depends on rainfall, inputs and support.",
        ],
        wordLimit: { max: 220 },
        modelAnswer: "Land reform means more households hold land and produce food directly, and in the survey A1 farms yield more than communal areas, while A2 farms yield most. However, one season cannot prove a trend, and rainfall, inputs, credit and irrigation affect yields in every group. Limited tenure security and shortage of capital restrict investment on many new farms. I conclude that land reform has widened access to land and may have raised yields in some groups, but overall food production depends equally on rainfall, inputs and support.",
        explanation: "Use the table and weigh the evidence, noting its limits." }),
    ], explanation: "Interpret yields by farm type and assess the contribution of land reform." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Evaluate the contribution of land reform to food security in Zimbabwe.",
    hints: ["Cover availability, access, utilisation and stability.", "Give supporters' and critics' arguments and a judgement."],
    points: [
      "Land reform gave more households direct access to land for growing food, which can improve household availability and access.",
      "Smallholder crops such as tobacco and cotton, grown under contract, raised incomes for many beneficiaries.",
      "Disruption and loss of experienced farmers, and shortage of inputs, lowered output in the early 2000s, according to critics.",
      "Insecure tenure limits loans and long-term investment on new farms.",
      "Droughts and variable rainfall, not land policy alone, cause large swings in maize output.",
      "Food security also depends on incomes, prices, nutrition and stable supply, which land alone does not provide.",
      "Support such as irrigation, inputs, credit, conservation farming and grain reserves can raise the benefit of access to land.",
      "Judgement: land reform widened access to land, but its contribution to national food security depends on tenure, investment, climate and support.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Supporters argue that land reform gave many more households direct access to land for growing food, which improves household availability and access, and smallholder crops such as tobacco and cotton under contract raised incomes for many beneficiaries. Critics argue that disruption, loss of experienced farmers and shortages of inputs lowered output in the early 2000s, and insecure tenure still limits loans and investment. Droughts cause large swings in maize output whatever the land system, and food security also depends on incomes, prices, nutrition and stable supply. Irrigation, inputs, credit, conservation farming and grain reserves can increase the benefit of land access. I conclude that land reform widened access to land, but its contribution to national food security depends on tenure, investment, climate and support.",
    wordLimit: { max: 300 }, explanation: "Weigh benefits against limits using the four parts of food security." });

  b.card("DEFINITION", "Food security", "All people at all times have physical and economic access to enough safe and nutritious food; it has availability, access, utilisation and stability.");
  b.card("FORMULA", "Self-sufficiency ratio", "National production ÷ national requirement × 100. Below 100% means a shortfall.");
  b.card("FACT", "Land Apportionment Act (1930)", "Divided Southern Rhodesia's land into areas for European and African ownership; the best-watered land went to commercial farms.");
  b.card("FACT", "Lancaster House (1979)", "The independence agreement allowed land to be acquired only on a willing-seller, willing-buyer basis for the first ten years.");
  b.card("FACT", "Fast Track Land Reform Programme", "From 2000, a large share of commercial farmland was acquired and redistributed in A1 (smallholder) and A2 (small to medium commercial) models.");
  b.card("CONCEPT", "Contribution of land reform", "More households hold land and grow food; smallholders such as tobacco and cotton contract farmers raised incomes.");
  b.card("CONCEPT", "Limits on food production after land reform", "Insecure tenure, shortage of inputs and credit, limited irrigation, drought and an unstable economy.");
  b.card("CONCEPT", "Neutral wording", "Write 'supporters argue … critics argue …' and back each point with evidence.");
  b.card("FACT", "Conservation farming scheme", "Pfumvudza (Intwasa): a conservation-farming approach promoted from the 2020/21 season to raise household yields.");
});
