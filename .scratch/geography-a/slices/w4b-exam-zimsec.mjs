// W4b exam rows (ZIMSEC): ZIM_STRUCT25 x 4 (Paper 2: agriculture x 1, mining x 1, industry x 1, transport and trade x 1) and
// ZIM_P3 x 1 (Paper 3 research techniques, human component). All datasets are invented for this exercise; every number is computed in code.
// Each 25-mark item has at least 8 auto-marked marks (ZIM_P3: exactly 15) and a self-marked 8-mark final part with levels.
import { concept, P, chk, rnd, mean, sum, spearman, checkExam, EXAM, geographyLevels, ZIM, dpStr } from "../lib.mjs";
import { tbl } from "../tables/w4b-_q.mjs";

const BASE = (plan, paper) => ({ d: 4, skill: plan.skill, secs: plan.secs, examStyle: true, paper, applies: plan.applies });
const fmt = (n) => n.toLocaleString("en").replace(/,/g, " ");

// ---- Item 1: agriculture (topic 10)
const DIST = [["D1", "II", 880, 3.2], ["D2", "III", 700, 1.8], ["D3", "IV", 520, 1.0], ["D4", "V", 380, 0.4]];
const meanYield = chk(mean(DIST.map((d) => d[3])), 1.6, 1e-9);
const fallPct = chk(((3.2 - 0.4) / 3.2) * 100, 87.5, 1e-9);
const rentAt = (d) => 500 - 350 - 10 * d;
const rent8 = chk(rentAt(8), 70);
const margin = chk((500 - 350) / 10, 15, 1e-9);
const DT = tbl(["District", "Agro-ecological region", "Mean annual rainfall (mm)", "Mean maize yield (t/ha)"], DIST.map((d) => [d[0], d[1], d[2], d[3].toFixed(1)]));

// ---- Item 2: mining (topic 11)
const goldIn = chk(800 * 3.5, 2800, 1e-9);
const goldRec = chk(goldIn * 0.88, 2464, 1e-9);
const goldVal = chk(goldRec * 65, 160160, 1e-9);

// ---- Item 3: industry (topic 11)
const miCost = (d) => 0.12 * (3 * d + (80 - d));
const cR = chk(miCost(0), 9.6, 1e-9);
const cM = chk(miCost(80), 28.8, 1e-9);
const avgLow = chk(900000 / 150000 + 5, 11, 1e-9);
const avgHigh = chk(900000 / 450000 + 5, 7, 1e-9);
const avgFall = rnd(((avgLow - avgHigh) / avgLow) * 100, 1, 36.4, "avgFall");

// ---- Item 4: transport and trade (topics 12 and 14)
const TC = [["06:00–07:00", 60, 40, 100], ["09:00–10:00", 80, 50, 120], ["13:00–14:00", 70, 30, 140], ["17:00–18:00", 50, 20, 110]];
const tTot = TC.map((r) => r[1] + r[2] + r[3]);
const tAll = chk(sum(tTot), 870);
const tMean = chk(mean(tTot), 217.5, 1e-9);
const tTrucks = chk(sum(TC.map((r) => r[3])), 470);
const truckPct = rnd((tTrucks / tAll) * 100, 1, 54.0, "truckPct");
const trBal = chk(4000 - 4800, -800);
const trCover = rnd((4000 / 4800) * 100, 1, 83.3, "trCover");
const CT = tbl(["Hour", "Cars", "Buses and kombis", "Trucks"], TC);
const TR = tbl(["Visible trade", "US\\$ million"], [["Exports", fmt(4000)], ["Imports", fmt(4800)]]);

// ---- Item 5: P3 research, human (Spearman)
const V = [["A", 2, 9], ["B", 4, 7], ["C", 6, 8], ["D", 8, 6], ["E", 10, 4], ["F", 12, 5], ["G", 14, 3], ["H", 16, 2]];
const sp = spearman(V.map((v) => v[1]), V.map((v) => v[2]));
const rs = rnd(sp.rs, 3, -0.952, "rs");
const visitMean = chk(mean(V.map((v) => v[2])), 5.5, 1e-9);
chk(sp.sumD2, 164);
chk(sp.crit, 0.738);
const interval = chk(600 / 60, 10);
const returned = chk((54 / 60) * 100, 90, 1e-9);
const VT = tbl(["Village", "Distance from the growth point (km)", "Mean visits to the growth point market per household per month"], V.map((v) => [v[0], v[1], v[2]]));

concept("ageo.agri.factors-location", { file: "exam/w4b-zimsec", keyPrefix: "exam.w4b-zimsec", applies: ZIM }, (b) => {
  // ============================================================ Item 1: agriculture
  b.struct({
    ...BASE(EXAM.ZIM_STRUCT25, "Paper 2"),
    concepts: ["ageo.agri.factors-location", "ageo.agri.land-reform-food-security"],
    hints: ["Mean = total ÷ 4; percentage fall = fall ÷ original × 100.", "Economic rent = price − production cost − transport cost."],
    stem: `Four districts of Zimbabwe lie in different agro-ecological regions (data invented for this exercise).\n\n${DT}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean maize yield of the four districts, in t/ha.", value: meanYield, unit: "t/ha", wrong: [6.4, 1.575],
            explanation: "(3.2 + 1.8 + 1.0 + 0.4) ÷ 4 = 6.4 ÷ 4 = 1.6 t/ha." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage fall in yield from D1 to D4.", value: fallPct, unit: "%", wrong: [12.5, 2.8],
            explanation: "(3.2 − 0.4) ÷ 3.2 × 100 = 87.5%." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which district is in the Region IV rainfall range (about 450–650 mm)?", options: [
            ["D3", "Correct: 520 mm."],
            ["D1", "D1 has 880 mm (Region II)."],
            ["D2", "D2 has 700 mm (Region III)."],
            ["D4", "D4 has 380 mm (Region V)."],
          ], answer: "A", explanation: "Only D3, with 520 mm, lies in the range 450–650 mm." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why maize yields fall from D1 to D4.",
        points: [
          "Rainfall falls from 880 mm to 380 mm, so maize receives less water in the growing season.",
          "Rainfall becomes less reliable with mid-season dry spells and droughts in Regions IV and V, so crops fail more often.",
          "Higher temperatures in the drier lowveld increase evaporation and water stress.",
          "Farmers in the drier districts use fewer inputs and prefer small grains or livestock, since maize is a high-risk crop there.",
        ],
        modelAnswer: "Rainfall falls from 880 mm to 380 mm, so maize gets less water in the growing season. Rainfall also becomes less reliable, with dry spells and droughts in Regions IV and V, and higher temperatures increase evaporation. Farmers in the drier districts use fewer inputs and prefer small grains or livestock because maize is risky there.",
        explanation: "Rainfall amount and reliability, temperature and input choices." }),
      P.group({
        label: "(c)", stem: "Near the town in D1, vegetables sell at US\\$500 per tonne, cost US\\$350 per tonne to produce, and transport costs US\\$10 per tonne per kilometre (von Thünen's model).",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the economic rent per tonne at 8 km from the town, in US\\$.", value: rent8, unit: "US$", wrong: [150, 80],
            explanation: "500 − 350 − (10 × 8) = 150 − 80 = US\\$70." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the margin of cultivation for vegetables, in km.", value: margin, unit: "km", wrong: [150, 10],
            explanation: "Rent is zero when 150 − 10d = 0, so d = 15 km." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which assumption of von Thünen's model is needed for this calculation?", options: [
            ["Transport cost rises in proportion to distance from a single market", "Correct: this gives a straight-line rent."],
            ["Farmers deliberately sell at a loss", "Farmers aim for profit."],
            ["Governments set the price of vegetables", "The model has no government."],
            ["The land is covered by rugged mountains", "The model assumes a flat plain."],
          ], answer: "A", explanation: "The model assumes transport cost rises in proportion to distance." }),
        ],
      }),
      P.fib({
        label: "(d)", marks: 3, stem: "Complete the statement about farming in Zimbabwe.",
        template: "Tea and coffee are grown in Region {{blank:a}}, intensive tobacco and maize in Region {{blank:b}}, and extensive {{blank:c}} in Region V.",
        blanks: [
          { id: "a", accepted: ["I"], choices: ["I", "III", "V"] },
          { id: "b", accepted: ["II"], choices: ["II", "IV", "V"] },
          { id: "c", accepted: ["ranching"], choices: ["ranching", "dairying", "forestry"] },
        ],
        explanation: "Region I tea and coffee; Region II intensive crops; Region V extensive ranching.",
      }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the extent to which land reform has improved food production in Zimbabwe.",
        points: [
          "Land reform gave more households direct access to land to grow food.",
          "Smallholders, particularly under contract, expanded crops such as tobacco and cotton.",
          "Critics argue that disruption, loss of experienced farmers and shortages of inputs reduced output early in the 2000s.",
          "Insecure tenure limits loans and long-term investment on new farms.",
          "Droughts and variable rainfall cause swings in maize output in any land system, as the table's rainfall pattern suggests.",
          "Inputs, irrigation, credit and extension advice affect yields as much as land ownership.",
          "Food security also depends on access, utilisation and stability, not only the size of the harvest.",
          "Judgement: land reform widened access to land, but its effect on production depends on tenure, support and climate.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Supporters argue that land reform gave many more households direct access to land to grow food, and smallholders, particularly under contract, expanded crops such as tobacco and cotton. Critics argue that disruption, loss of experienced farmers and shortages of inputs reduced output in the early 2000s, and insecure tenure still limits loans and long-term investment. Droughts and variable rainfall, as the table suggests, cause swings in maize output in any land system, and inputs, irrigation, credit and advice affect yields as much as ownership. Food security also depends on access, utilisation and stability. I conclude that land reform widened access to land, but its effect on production depends on tenure, support and climate.",
        explanation: "Weigh access to land against tenure, inputs and climate, and judge." }),
    ]),
    explanation: "Interpret regional yield data, explain the pattern, apply economic rent and assess land reform.",
  });

  // ============================================================ Item 2: mining
  b.struct({
    ...BASE(EXAM.ZIM_STRUCT25, "Paper 2"),
    concepts: ["ageo.mining.beneficiation-marketing"],
    hints: ["Gold in the ore = tonnes × grade; recovered = gold × recovery rate.", "In (e) consider value, jobs, power, capital and markets."],
    stem: "A gold plant in Zimbabwe treats 800 t of ore of grade 3.5 g per tonne. The plant recovers 88% of the gold. Gold is sold at US\\$65 per gram (illustrative data).",
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Calculations.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mass of gold in the ore, in grams.", value: goldIn, wrong: [3.5, 228.6],
            explanation: "800 × 3.5 = 2 800 g." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the mass of gold recovered, in grams.", value: goldRec, wrong: [2800, 336],
            explanation: "2 800 × 0.88 = 2 464 g." }),
          P.num({ label: "(iii)", marks: 2, stem: "Calculate the value of the gold recovered, in US\\$.", value: goldVal, unit: "US$", wrong: [182000, 2464],
            explanation: "2 464 × 65 = US\\$160 160." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain how crushing, grinding and cyanide leaching work together to recover gold from ore.",
        points: [
          "Crushing and grinding break the ore into fine particles, which frees (liberates) the tiny gold grains from the rock.",
          "The finer particles have a large surface area, so the leaching solution can reach the gold.",
          "A cyanide solution dissolves the gold from the powdered ore.",
          "Carbon (or another method) captures the dissolved gold, which is then smelted into bars and refined.",
        ],
        modelAnswer: "Crushing and grinding break the ore into fine particles, freeing tiny gold grains from the rock and giving a large surface area. A cyanide solution then dissolves the gold from the powder, carbon captures the dissolved gold, and it is smelted into bars and refined.",
        explanation: "Liberation, surface area, dissolving and capture." }),
      P.group({
        label: "(c)", stem: "Processing methods.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which method is most suitable for concentrating dense chromite grains?", options: [
            ["Gravity separation", "Correct: chromite is dense."],
            ["Flotation of sulphides", "Chromite is an oxide, not a sulphide."],
            ["Cutting and polishing", "That is for diamonds."],
            ["Evaporation in salt pans", "That is for dissolved salts."],
          ], answer: "A", explanation: "Gravity separation uses density." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which method is most widely used to concentrate sulphide ores of nickel and platinum group metals?", options: [
            ["Flotation", "Correct: air bubbles carry sulphide grains to the froth."],
            ["Magnetic separation", "These ores are not mainly magnetic."],
            ["Panning", "Panning is for coarse heavy grains."],
            ["Cutting", "Cutting is for gems."],
          ], answer: "A", explanation: "Flotation concentrates sulphide ores." }),
          P.short({ label: "(iii)", marks: 1, stem: "Name the process of heating a concentrate so that metal and slag separate.", accepted: ["smelting", "smelt"], explanation: "Smelting." }),
          P.fib({
            label: "(iv)", marks: 2, stem: "Complete the statement.",
            template: "The state body that markets most minerals is the {{blank:a}}, and rough diamonds are sold under the {{blank:b}} Process.",
            blanks: [
              { id: "a", accepted: ["MMCZ"], choices: ["MMCZ", "EMA", "ZINWA"] },
              { id: "b", accepted: ["Kimberley"], choices: ["Kimberley", "Lancaster", "Beira"] },
            ],
            explanation: "MMCZ; Kimberley Process.",
          }),
        ],
      }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which the plant could reduce the gold lost in its tailings.",
        points: [
          "Grind the ore finer or leach for longer so that more gold is freed and dissolved.",
          "Improve control of the leaching chemistry and monitor the tailings regularly, or re-treat the tailings.",
        ],
        modelAnswer: "Grind the ore finer or leach for longer so more gold is freed and dissolved, and monitor the tailings regularly, controlling the leaching chemistry or re-treating the tailings.",
        explanation: "Finer grinding, longer leaching and monitoring." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the case for processing more minerals in Zimbabwe before they are exported.",
        points: [
          "Processed products earn more per tonne than raw ore, which raises export earnings.",
          "Processing creates jobs and skills in plants and services.",
          "Concentrating and smelting cut the mass to be transported and the transport cost per unit of metal.",
          "Plants need reliable electricity and water, which may be unavailable.",
          "Processing needs capital, skilled workers and sometimes imported equipment.",
          "Buyers and prices change, so processed products face market risk.",
          "Policies on the export of raw ore can encourage processing, but may cut short-term sales if plants are not ready (verify against current law).",
          "Judgement: processing adds value if power, capital and markets are secure; otherwise a step-by-step approach is more realistic.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Processed products earn more per tonne than raw ore, which raises export earnings, and processing creates jobs and skills. Concentrating and smelting also cut the mass to be transported. However, plants need reliable electricity and water, capital and skilled workers, and processed products face changing prices and buyers. Policies restricting the export of raw ore can encourage processing but may cut sales in the short term if plants are not ready. I conclude that processing adds value if power, capital and markets are secure; otherwise a step-by-step approach is more realistic.",
        explanation: "Weigh extra value against power, capital and market risk and judge." }),
    ]),
    explanation: "Calculate gold recovery and value, explain processing and evaluate local processing.",
  });

  // ============================================================ Item 3: industry
  b.struct({
    ...BASE(EXAM.ZIM_STRUCT25, "Paper 2"),
    concepts: ["ageo.industry.location-linkages", "ageo.industry.smes-hightech"],
    hints: ["Cost = tonnes carried × distance × rate.", "Average cost = fixed cost ÷ output + variable cost per unit."],
    stem: "A smelter uses 3 t of ore to make 1 t of metal. The ore deposit (R) and the market (M) are 80 km apart, and transport costs US\\$0.12 per tonne per kilometre. The smelter has fixed costs of US\\$900 000 a year and variable costs of US\\$5 per unit of metal (illustrative data).",
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Weber's least-cost theory.",
        parts: [
          P.num({ label: "(i)", marks: 1, stem: "State the material index.", value: 3, wrong: [0.33, 80],
            explanation: "3 t of ore ÷ 1 t of metal = 3." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the transport cost per tonne of metal if the smelter is built at R, in US\\$.", value: cR, unit: "US$", wrong: [28.8, 80],
            explanation: "Only the metal travels 80 km: 1 × 80 × 0.12 = US\\$9.60." }),
          P.num({ label: "(iii)", marks: 2, stem: "Calculate the transport cost per tonne of metal if it is built at M, in US\\$.", value: cM, unit: "US$", wrong: [9.6, 38.4],
            explanation: "The ore (3 t) travels 80 km: 3 × 80 × 0.12 = US\\$28.80." }),
          P.mcq({ label: "(iv)", marks: 1, stem: "Where does Weber's theory predict the smelter will locate?", options: [
            ["Near the ore deposit", "Correct: the material index is above 1."],
            ["At the market", "That fits an index below 1."],
            ["Halfway between R and M", "Halfway costs more than R."],
            ["Anywhere, because cost is the same", "Costs differ."],
          ], answer: "A", explanation: "Weight-losing industries locate at the raw material." }),
        ],
      }),
      P.manual({ label: "(b)", marks: 4, stem: "Explain why a smelter might be built away from the least-transport-cost site.",
        points: [
          "A town offers cheaper labour or skilled workers, and the saving is larger than the extra transport cost (the critical isodapane).",
          "Reliable electricity and water are available at the other site, which smelting needs in large amounts.",
          "Government incentives, special economic zones or cheaper land reduce costs elsewhere.",
          "Clustering with suppliers and services (agglomeration) lowers costs and risk.",
        ],
        modelAnswer: "A town may offer cheaper or more skilled labour, and if the saving exceeds the extra transport cost the firm moves. Reliable electricity and water may be available elsewhere, government incentives or special economic zones may cut costs, and clustering with suppliers and services lowers costs and risk.",
        explanation: "Labour, power, incentives and agglomeration." }),
      P.group({
        label: "(c)", stem: "Economies of scale.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the average cost per unit at an output of 150 000 units, in US\\$.", value: avgLow, unit: "US$", wrong: [6, 5],
            explanation: "900 000 ÷ 150 000 = 6; 6 + 5 = US\\$11." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage fall in average cost when output rises to 450 000 units (average cost US\\$7), to 1 decimal place.", value: avgFall, dp: 1, unit: "%", wrong: [57.1, 4],
            explanation: "(11 − 7) ÷ 11 × 100 = 36.4%." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "What is meant by diseconomies of scale?", options: [
            ["Average cost per unit rising because the firm has grown too large", "Correct: poor management and congestion raise costs."],
            ["Average cost falling as output rises", "That is an economy of scale."],
            ["Firms clustering in one industrial estate", "That is agglomeration."],
            ["A firm buying from its suppliers", "That is a backward linkage."],
          ], answer: "A", explanation: "Diseconomies are rising average costs at very large size." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 2, stem: "State two forward linkages of a metal smelter.",
        points: [
          "Sale of metal to factories that make machinery, wire, tools or vehicle parts.",
          "Sale of slag or by-products to cement or road builders, or of metal to engineering workshops.",
        ],
        modelAnswer: "The metal is sold to factories that make machinery, wire, tools or vehicle parts, and slag or by-products can be sold to cement or road builders.",
        explanation: "Users of the smelter's products." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Assess the importance of small and medium enterprises to the development of Zimbabwe.",
        points: [
          "SMEs provide jobs for many people, including young people and women.",
          "They give income to households where formal jobs are scarce.",
          "They use local materials and skills and supply affordable goods.",
          "They supply parts and services to large firms and train people in business skills.",
          "Many are informal and pay little tax, so the contribution to public revenue is small.",
          "Productivity and pay are low because of weak finance, power, skills and premises.",
          "Support such as microfinance, training and simpler rules can raise growth.",
          "Judgement: SMEs are essential for jobs and income, but their contribution to growth is limited unless constraints are reduced.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "SMEs provide jobs for many people, including young people and women, and give income to households where formal jobs are scarce. They use local materials and skills, supply affordable goods, supply large firms and train people in business skills. However, many are informal and pay little tax, and productivity and pay are low because of weak finance, power, skills and premises. Microfinance, training and simpler rules can raise growth. I conclude that SMEs are essential for jobs and income, but their contribution to growth is limited unless constraints are reduced.",
        explanation: "Weigh jobs and income against low productivity and constraints." }),
    ]),
    explanation: "Apply Weber's theory and economies of scale and assess the importance of SMEs.",
  });

  // ============================================================ Item 4: transport and trade
  b.struct({
    ...BASE(EXAM.ZIM_STRUCT25, "Paper 2"),
    concepts: ["ageo.transport.distribution-factors", "ageo.trade.global-flows-balance"],
    hints: ["Share = part ÷ total × 100.", "Balance of trade = exports − imports."],
    stem: `A traffic count was made on the road to a border post for one hour at four times of the day, and the country's visible trade for a year is also shown (data invented for this exercise).\n\n${CT}\n\n${TR}`,
    parts: checkExam(EXAM.ZIM_STRUCT25, [
      P.group({
        label: "(a)", stem: "Use the traffic count.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean number of vehicles per hour, to 1 decimal place.", value: tMean, dp: 1, wrong: [870, 200],
            explanation: "Hourly totals 200, 250, 240, 180; total 870; mean 870 ÷ 4 = 217.5." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage of vehicles that were trucks, to 1 decimal place.", value: truckPct, dp: 1, unit: "%", wrong: [470, 33],
            explanation: "470 ÷ 870 × 100 = 54.0%." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "What does the high share of trucks suggest about the road?", options: [
            ["It carries a large amount of freight to and from the border", "Correct: trucks carry goods."],
            ["It is used only by tourists", "Tourists use cars and buses."],
            ["It has no cars on it", "Cars were counted."],
            ["It is a railway crossing", "It is a road."],
          ], answer: "A", explanation: "Many trucks show freight movement." }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Use the trade figures.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the balance of trade, in US\\$ million (negative for a deficit).", value: trBal, unit: "US$ million", wrong: [800, 8800],
            explanation: "4 000 − 4 800 = −800 (deficit of US\\$800 million)." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the percentage of imports paid for by exports, to 1 decimal place.", value: trCover, dp: 1, unit: "%", wrong: [120, 16.7],
            explanation: "4 000 ÷ 4 800 × 100 = 83.3%." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "Which is an example of invisible trade?", options: [
            ["Foreign tourists staying in hotels", "Correct: tourism is a service export."],
            ["A shipment of tobacco", "That is visible trade."],
            ["Imports of fuel", "That is visible trade."],
            ["Exports of platinum", "That is visible trade."],
          ], answer: "A", explanation: "Services such as tourism are invisible trade." }),
        ],
      }),
      P.manual({ label: "(c)", marks: 4, stem: "Explain why road transport carries most freight within Zimbabwe.",
        points: [
          "Roads reach almost every town, farm and mine, giving door-to-door service.",
          "Trucks are flexible in route, timing and load size, and are suitable for small and urgent loads.",
          "Rail capacity and reliability are limited by the condition of locomotives and track.",
          "Road transport needs less fixed infrastructure on the user's side and is easy to start for small firms.",
        ],
        modelAnswer: "Roads reach almost every town, farm and mine and give door-to-door service. Trucks are flexible in route, timing and load size, so they suit small and urgent loads, while rail is limited by the condition of locomotives and track. Small firms can start road transport easily because little fixed infrastructure is needed on the user's side.",
        explanation: "Coverage, flexibility, rail limits and ease of entry." }),
      P.manual({ label: "(d)", marks: 3, stem: "Suggest three ways of improving the balance of trade shown.",
        points: [
          "Process minerals and farm products to earn more per tonne exported.",
          "Expand exports within SADC and COMESA, and produce some goods locally to replace imports.",
          "Improve power supply, border procedures and investment so that exporters are more competitive.",
        ],
        modelAnswer: "Process minerals and farm products to earn more per tonne exported, expand exports within SADC and COMESA while producing some goods locally to replace imports, and improve power supply, border procedures and investment so that exporters are more competitive.",
        explanation: "Value addition, regional markets and import substitution." }),
      P.manual({ label: "(e)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Discuss how improved transport could contribute to trade and development in Zimbabwe.",
        points: [
          "Better roads and rail lower freight costs for exporters and importers.",
          "Faster border crossings and reliable links to ports help exports and imports, which matters for a landlocked country.",
          "Farmers get produce to markets with less loss, which raises incomes.",
          "Routes to Victoria Falls and Kariba support tourism and jobs.",
          "Mines and industries can reach markets and obtain supplies more cheaply.",
          "Rural clinics and schools become easier to reach.",
          "Improvements are costly and need maintenance, and benefits depend on power, finance and skills as well.",
          "Judgement: transport is an essential support for trade and development, but not enough alone.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "Better roads and rail lower freight costs for exporters and importers, and faster border crossings and reliable links to ports help trade, which matters for a landlocked country. Farmers get produce to market with less loss, routes to Victoria Falls and Kariba support tourism, and mines and industries obtain supplies and reach markets more cheaply. Rural clinics and schools also become easier to reach. However, improvements are costly and need maintenance, and benefits depend on power, finance and skills. I conclude that transport is an essential support for trade and development, but it is not enough alone.",
        explanation: "Cover costs, ports, farmers, tourism and services, then judge." }),
    ]),
    explanation: "Analyse traffic and trade data, explain road transport and discuss transport and development.",
  });

  // ============================================================ Item 5: ZIM_P3 research techniques (human)
  b.struct({
    ...BASE(EXAM.ZIM_P3, "Paper 3"),
    concepts: ["ageo.skills.research-techniques", "ageo.stats.correlation-regression"],
    hints: ["Sampling interval = population ÷ sample size.", "Spearman: rs = 1 − 6Σd² ÷ (n³ − n); compare |rs| with the critical value."],
    stem: `A student investigates the hypothesis that "households farther from a rural growth point visit its market less often". There are 600 households in the district. Eight villages were chosen, and 60 households were sampled by taking every tenth name from the council list (data invented for this exercise).\n\n${VT}\n\nThe student uses Spearman's rank correlation coefficient, rs = 1 − 6Σd² ÷ (n³ − n), with Σd² = 164. The critical value of rs at the 5% significance level for n = 8 is 0.738.`,
    parts: checkExam(EXAM.ZIM_P3, [
      P.group({
        label: "(a)", stem: "Planning the enquiry.",
        parts: [
          P.mcq({ label: "(i)", marks: 1, stem: "Which is the correct null hypothesis for the enquiry?", options: [
            ["There is no relationship between distance from the growth point and the number of market visits", "Correct: the null hypothesis states no relationship."],
            ["Households farther away visit the market less often", "That is the research (alternative) hypothesis."],
            ["Households closer to the growth point are richer", "That tests a different idea."],
            ["Every household visits the market every day", "This is not testable here."],
          ], answer: "A", explanation: "The null hypothesis states that there is no relationship." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "What kind of sampling was used to select the 60 households?", options: [
            ["Systematic sampling", "Correct: every tenth name from a list."],
            ["Random sampling by lottery", "A lottery would pick names at random."],
            ["Stratified sampling by income", "No strata were used."],
            ["Quota sampling in the market", "Households were selected from a list."],
          ], answer: "A", explanation: "Selecting every tenth name is systematic sampling." }),
          P.num({ label: "(iii)", marks: 1, stem: "Calculate the sampling interval.", value: interval, wrong: [60, 540],
            explanation: "600 ÷ 60 = every 10th household." }),
          P.fib({
            label: "(iv)", marks: 2, stem: "Complete the statement.",
            template: "Before the main survey the student should test the questionnaire in a {{blank:a}} survey with a few households. The questions should be {{blank:b}}, so that every respondent understands them.",
            blanks: [
              { id: "a", accepted: ["pilot"], choices: ["pilot", "final", "secret"] },
              { id: "b", accepted: ["clear"], choices: ["clear", "long", "leading"] },
            ],
            explanation: "A pilot survey tests the questions; they should be clear.",
          }),
        ],
      }),
      P.group({
        label: "(b)", stem: "Analysing the results in the table.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the mean number of visits per household per month for the eight villages.", value: visitMean, wrong: [44, 9],
            explanation: "(9 + 7 + 8 + 6 + 4 + 5 + 3 + 2) ÷ 8 = 44 ÷ 8 = 5.5." }),
          P.num({ label: "(ii)", marks: 3, stem: "Calculate Spearman's rank correlation coefficient, to 3 decimal places.", value: rs, dp: 3, wrong: [0.952, 2.952, -0.048],
            explanation: "rs = 1 − (6 × 164) ÷ (8³ − 8) = 1 − 984 ÷ 504 = 1 − 1.952 = −0.952." }),
          P.mcq({ label: "(iii)", marks: 1, stem: "What is the correct conclusion?", options: [
            ["There is a significant negative correlation, so reject the null hypothesis", "Correct: |−0.952| is greater than 0.738."],
            ["There is a significant positive correlation, so accept the null hypothesis", "The sign is negative and the null is rejected."],
            ["There is no significant correlation because rs is below 1", "Significance depends on the critical value."],
            ["The test cannot be used with eight villages", "n = 8 is within the table."],
          ], answer: "A", explanation: "The value exceeds the critical value in size, and the sign is negative." }),
          P.short({ label: "(iv)", marks: 1, stem: "Name the type of graph best suited to show the relationship between two numerical variables such as distance and visits.", accepted: ["scatter graph", "scatter diagram", "scattergraph", "scatter plot", "scattergram"], explanation: "A scatter graph." }),
          P.manual({ label: "(v)", marks: 2, stem: "Describe how the data would be shown on the graph and what pattern you would expect.",
            points: [
              "Distance on the horizontal axis and visits on the vertical axis, with one point for each village.",
              "The points would slope downwards from left to right, and a line of best fit would show the negative relationship.",
            ],
            modelAnswer: "Distance goes on the horizontal axis and visits on the vertical axis, with a point for each village. The points slope downwards from left to right, and a line of best fit shows the negative relationship.",
            explanation: "Axes, points and a downward trend." }),
        ],
      }),
      P.group({
        label: "(c)", stem: "Evaluating the method.",
        parts: [
          P.num({ label: "(i)", marks: 2, stem: "Only 54 of the 60 questionnaires were completed. Calculate the response rate, as a percentage.", value: returned, unit: "%", wrong: [10, 111],
            explanation: "54 ÷ 60 × 100 = 90%." }),
          P.mcq({ label: "(ii)", marks: 1, stem: "Which is the most likely source of bias in a questionnaire survey on market visits?", options: [
            ["Respondents may estimate or forget how often they visit", "Correct: recall errors affect the data."],
            ["The sampling interval is exactly 10", "A fixed interval is acceptable."],
            ["There are 600 households in the district", "Population size is not a bias."],
            ["The table has eight villages", "Eight villages are enough for the test."],
          ], answer: "A", explanation: "Self-reported frequency is open to recall error." }),
        ],
      }),
      P.manual({ label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", stem: "Evaluate the extent to which the enquiry shows that distance explains the use of the growth point's market, and suggest improvements.",
        points: [
          "The correlation (rs = −0.952) is strong and exceeds the critical value, so distance is closely linked to visits.",
          "Correlation does not prove cause: transport cost, income and road quality may also change with distance.",
          "Only eight villages were used, which is a small sample for a district.",
          "Self-reported visits may be inaccurate, and a 90% response rate leaves some bias.",
          "Data were collected in one season, but markets vary with harvest and school terms.",
          "Improvement: add questions on income, transport and reasons for visiting, and use more villages.",
          "Improvement: repeat the survey in different seasons and check visits with market counts.",
          "Judgement: distance is an important influence, but the enquiry shows association, not full explanation.",
        ],
        levels: geographyLevels(8), wordLimit: { max: 350 },
        modelAnswer: "The correlation is strong (rs = −0.952) and exceeds the critical value of 0.738, so distance is closely linked to the number of market visits. However, correlation does not prove cause: transport costs, income and road quality may also change with distance. Only eight villages were used, visits were self-reported and may be inaccurate, the response rate of 90% leaves some bias, and the data were collected in one season. The enquiry could be improved by adding questions on income, transport and reasons for visiting, using more villages, repeating the survey in different seasons and checking visits against market counts. I conclude that distance is an important influence, but the enquiry shows association, not a full explanation.",
        explanation: "Evaluate the strength and the limits of the evidence and suggest improvements." }),
    ]),
    explanation: "Plan, analyse and evaluate a human geography enquiry using Spearman's rank correlation.",
  });
});
