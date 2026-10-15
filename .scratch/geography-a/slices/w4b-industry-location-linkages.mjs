// W4b: industry.location-linkages (ZIMSEC only). All costs are illustrative.
// Computed: smelter MI 4, transport cost at R/mid/M = 10/25/40; critical isodapane 9/0.30 = 30 km; average cost 10 and 6 (-40%);
// cement MI 2, cost at quarry 12, at city 24; clothing average cost 12 and 6 (-50%).
import { concept, P, geographyLevels, chk } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const rate = 0.1;
const costAt = (d, mi = 4, total = 100) => rate * (mi * d + (total - d));
const cR = chk(costAt(0), 10, 1e-9);
const cMid = chk(costAt(50), 25, 1e-9);
const cM = chk(costAt(100), 40, 1e-9);
const crit = chk(9 / 0.3, 30, 1e-9);
const avg100 = chk(600000 / 100000 + 4, 10, 1e-9);
const avg300 = chk(600000 / 300000 + 4, 6, 1e-9);
const avgFall = chk(((avg100 - avg300) / avg100) * 100, 40, 1e-9);
const cemMI = chk(2 / 1, 2, 1e-9);
const cemQ = chk(1 * 150 * 0.08, 12, 1e-9);
const cemC = chk(2 * 150 * 0.08, 24, 1e-9);
const clo50 = chk(450000 / 50000 + 3, 12, 1e-9);
const clo150 = chk(450000 / 150000 + 3, 6, 1e-9);
const cloFall = chk(((clo50 - clo150) / clo50) * 100, 50, 1e-9);
const SITE = tbl(["Site", "Distance from the ore (km)", "Transport cost (US\\$ per tonne of metal)"], [["R (ore)", 0, cR], ["Halfway", 50, cMid], ["M (market)", 100, cM]]);

concept("ageo.industry.location-linkages", { file: "industry/location-linkages", keyPrefix: "industry.location-linkages" }, (b) => {
  mc(b, 1, "RECALL", "According to Weber, where should an industry with a material index greater than 1 be located?", [
    ["Near the source of its raw material", "Correct: the process loses weight, so it is cheaper to ship the product."],
    ["Near its largest market", "That fits an index below 1."],
    ["In the middle of the largest city", "Location depends on the index, not on city size."],
    ["As far away from its suppliers as possible", "This would raise transport costs."],
  ], "A weight-losing industry (index above 1) locates **near the raw material**.");
  mc(b, 2, "UNDERSTANDING", "What is an isodapane in Weber's theory?", [
    ["A line joining places of equal extra transport cost", "Correct: it measures the extra cost of moving away from the least-cost site."],
    ["A line joining places of equal total transport cost", "That is an isotim."],
    ["A line joining places with equal rainfall", "That is an isohyet."],
    ["A line joining places with equal wages", "Wage rates are not shown by isodapanes."],
  ], "An **isodapane** joins places with equal **extra** transport cost.");
  mc(b, 2, "UNDERSTANDING", "Which is an example of a backward linkage for a sugar mill?", [
    ["Buying cane from estates and smallholders", "Correct: this links the mill to its suppliers."],
    ["Selling sugar to soft drink makers", "That is a forward linkage."],
    ["Selling by-products to a sweet factory", "That is a forward linkage."],
    ["Exporting refined sugar to another country", "That is a market, not a supplier link."],
  ], "Suppliers are **backward** linkages; users are **forward** linkages.");
  mc(b, 3, "APPLICATION", "Which benefit of agglomeration is most likely to help a small clothing factory in an industrial estate?", [
    ["Sharing skilled workers and repair services with nearby firms", "Correct: clustering reduces costs and search time."],
    ["Paying lower land rents because so many firms are present in the estate", "Rents often rise in clusters."],
    ["Avoiding all competition from other clothing makers", "Competition is usually greater."],
    ["Needing no roads, power or water supplies", "Services are still needed."],
  ], "Agglomeration offers **shared services, workers and suppliers**.", { hints: ["Think about what firms in a cluster share."] });
  mc(b, 3, "ANALYSIS", "Which assumption of Weber's theory is most likely to be unrealistic in Zimbabwe today?", [
    ["That firms ignore government policy, power supply and existing infrastructure", "Correct: these strongly influence real location."],
    ["That transport costs rise with the weight carried and the distance", "This is broadly true."],
    ["That raw materials are found in fixed places", "Minerals and crops are in fixed places."],
    ["That firms try to keep their costs low", "Firms do seek low costs."],
  ], "Real location depends on **policy, power and infrastructure** that the theory ignores.", { hints: ["Look for what the theory leaves out."] });
  mc(b, 4, "EVALUATION", "A cement works is built beside a limestone quarry 150 km from the main city. Which is the best explanation?", [
    ["Limestone is bulky, so moving it far costs much more than moving the cement", "Correct: the process loses weight."],
    ["Cement is perishable like milk and must be made at the market", "Cement is not perishable in this sense."],
    ["Workers prefer to live far from large cities and from the market", "Labour is not the main reason."],
    ["The quarry owner pays for all transport costs of the finished cement", "Transport costs still exist."],
  ], "A weight-losing process locates **at the raw material**.", { hints: ["Compare the weight of limestone used with the weight of cement made."] });
  b.tf({ d: 1, skill: "RECALL", stem: "An industry that makes a product heavier than its localised raw materials, as in bottling, tends to locate near the market.", answer: true,
    feedbackTrue: "Correct: a material index below 1 favours the market.",
    feedbackFalse: "Not so: when the index is below 1 the market is the least-cost site.",
    explanation: "Weight-gaining industries locate near the market." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Economies of scale and agglomeration economies are the same thing.", answer: false,
    feedbackFalse: "Correct: economies of scale occur inside one firm; agglomeration economies come from being near other firms.",
    feedbackTrue: "Not so: they have different sources.",
    explanation: "Economies of scale are internal to a firm; agglomeration economies are external." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Lines of equal total transport cost in Weber's theory are called {{blank:a}}. Falling average cost as output rises is called {{blank:b}} of scale.",
    blanks: [
      { id: "a", accepted: ["isotims"], choices: ["isotims", "isobars", "isohyets"] },
      { id: "b", accepted: ["economies"], choices: ["economies", "diseconomies", "limits"] },
    ], explanation: "**Isotims** and **economies** of scale." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Material index", "Weight of localised raw materials ÷ weight of product"],
      ["Backward linkage", "A link between a firm and its suppliers"],
      ["Forward linkage", "A link between a firm and those who use its product"],
      ["Diseconomies of scale", "Average cost rising because a firm has grown too large"],
    ], explanation: "Each term is a key idea of the topic." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$",
    stem: "A smelter uses 4 t of ore for each tonne of metal. Transport costs US\\$0.10 per tonne per km, and ore and market are 100 km apart. Calculate the transport cost per tonne of metal if the smelter is built at the market, in US\\$.",
    hints: ["At the market the ore (4 t) must travel 100 km; the metal does not travel."],
    value: cM, wrong: [10, 25, 4],
    explanation: "Ore: 4 × 100 × 0.10 = **US\\$40**. The value 10 is the cost at the ore site, where only the metal is carried." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "km",
    stem: "Moving a plant away from its least-cost site adds US\\$0.30 per tonne of product for each kilometre. A town offers a labour saving of US\\$9 per tonne. How far from the least-cost site is the critical isodapane, in km?",
    hints: ["The critical isodapane is where extra transport cost equals the labour saving."],
    value: crit, wrong: [2.7, 9],
    explanation: "Extra transport cost = 0.30 × d. Set 0.30d = 9, so d = 9 ÷ 0.30 = **30 km**." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "US$",
    stem: "A factory has fixed costs of US\\$600 000 and variable costs of US\\$4 per unit. Calculate the average cost per unit at an output of 300 000 units, in US\\$.",
    hints: ["Average cost = fixed cost ÷ output + variable cost per unit."],
    value: avg300, wrong: [2, 10, 204],
    explanation: "1. Fixed cost per unit = 600 000 ÷ 300 000 = 2.\n2. Add variable cost: 2 + 4 = **US\\$6 per unit**.\n3. The value 2 leaves out the variable cost." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the German economist who developed the least-cost theory of industrial location in 1909.",
    accepted: ["Weber", "Alfred Weber", "Alfred Weber's"], wrong: ["von Thünen"],
    explanation: "**Alfred Weber**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What term describes the clustering of firms in one place so that they share services and workers?",
    accepted: ["agglomeration", "industrial agglomeration", "clustering", "agglomeration economies"], wrong: ["linkage"],
    explanation: "**Agglomeration**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain four reasons why a firm might relocate from the centre of a city to an industrial estate on the edge of town.",
    hints: ["Think about space, rent, transport and services."],
    points: [
      "Land rents and rates are lower on the edge of town.",
      "There is more space for expansion and storage.",
      "Roads on the edge reduce congestion for deliveries, and access to main roads and rail is easier.",
      "Industrial estates provide shared services such as power, water and security, and nearby suppliers and workers.",
    ],
    modelAnswer: "Land rents and rates are lower on the edge of town and there is more space for expansion and storage. Roads on the edge reduce congestion for deliveries and give easier access to main roads and rail, and estates provide shared services such as power, water and security.",
    explanation: "Cost, space, access and services." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Using a named industry in Zimbabwe, describe its backward and forward linkages.",
    hints: ["Choose cotton, sugar, dairy or maize milling and give a chain."],
    points: [
      "Names an industry (for example cotton) and states the chain.",
      "Backward linkages: the ginnery buys seed cotton from growers (and inputs such as seed and fertiliser come from suppliers).",
      "Forward linkages: lint goes to spinners and weavers, then clothing makers, and cottonseed goes to oil crushers.",
    ],
    modelAnswer: "In the cotton industry, ginneries buy seed cotton from growers, who obtain seed and fertiliser from suppliers, so these are backward linkages. Lint goes forward to spinners and weavers, then clothing makers, and cottonseed goes to oil crushers.",
    explanation: "Name the industry and give both directions." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Suggest four reasons why Weber's theory does not fully explain the location of industry in Zimbabwe.",
    hints: ["Think of policy, services, history and the market."],
    points: [
      "Government policy, incentives and special economic zones influence where industry is located.",
      "The supply of electricity, water and rail is uneven and strongly affects decisions.",
      "Historic location and existing infrastructure keep industry in places such as Harare and Bulawayo.",
      "Market size and agglomeration matter more than raw materials for light and service industries.",
    ],
    modelAnswer: "Government policy, incentives and special economic zones influence location. The supply of electricity, water and rail is uneven, and historic location and infrastructure keep industry in Harare and Bulawayo. For light and service industries, market size and agglomeration matter more than raw materials.",
    explanation: "Policy, services, history and market." });

  b.struct({ d: 4, skill: "ANALYSIS",
    stem: "A cement works uses 2 t of local limestone to make 1 t of cement. The limestone quarry (Q) is 150 km from the main city market (C). Transport costs US\\$0.08 per tonne per km (illustrative data).",
    hints: ["Material index = weight of limestone ÷ weight of cement.", "Cost = tonnes carried × distance × rate."],
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the material index.", value: cemMI, wrong: [0.5, 3],
        explanation: "2 ÷ 1 = 2." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the transport cost per tonne of cement if the works is at the quarry, in US\\$.", value: cemQ, unit: "US$", wrong: [24, 150],
        explanation: "Only 1 t of cement is carried 150 km: 1 × 150 × 0.08 = US\\$12." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the transport cost per tonne of cement if the works is in the city, in US\\$.", value: cemC, unit: "US$", wrong: [12, 12.5],
        explanation: "2 t of limestone are carried 150 km: 2 × 150 × 0.08 = US\\$24." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the works is likely to be built at the quarry.",
        points: [
          "The material index is above 1 because the process loses weight (2 t of limestone make 1 t of cement).",
          "Locating at the quarry avoids carrying the waste weight, so transport cost per tonne of cement is only US\\$12 compared with US\\$24.",
          "Weber's theory predicts a location at the raw material for a weight-losing industry.",
        ],
        modelAnswer: "The material index is above 1 because 2 t of limestone make 1 t of cement. Building at the quarry avoids carrying the waste weight, so the transport cost is US\\$12 per tonne of cement compared with US\\$24 in the city. Weber's theory predicts a raw-material location for a weight-losing industry.",
        explanation: "Index above 1 and lower transport cost." }),
    ], explanation: "Apply the material index and transport costs." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: "A clothing factory has fixed costs of US\\$450 000 a year and variable costs of US\\$3 per garment (illustrative data). It is located in an industrial estate in Bulawayo with many clothing and textile firms.",
    hints: ["Average cost = fixed cost ÷ output + variable cost per garment.", "Percentage fall = fall ÷ original × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the average cost per garment at an output of 50 000, in US\\$.", value: clo50, unit: "US$", wrong: [9, 3],
        explanation: "450 000 ÷ 50 000 = 9; 9 + 3 = US\\$12." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the average cost per garment at an output of 150 000, in US\\$.", value: clo150, unit: "US$", wrong: [3, 303],
        explanation: "450 000 ÷ 150 000 = 3; 3 + 3 = US\\$6." }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the percentage fall in average cost when output rises from 50 000 to 150 000.", value: cloFall, unit: "%", wrong: [100, 33.3],
        explanation: "(12 − 6) ÷ 12 × 100 = 50%." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain how the clustering of clothing and textile firms in the estate can lower the factory's costs.",
        points: [
          "Nearby textile mills supply cloth, which reduces transport and storage costs.",
          "A pool of skilled machinists is available, and workers can move between firms.",
          "Repair services, banks and transport firms are close and are shared, and buyers visit to compare suppliers.",
        ],
        modelAnswer: "Nearby textile mills supply cloth, which reduces transport and storage costs. A pool of skilled machinists is available, and repair services, banks and transport firms are close and shared, while buyers visit to compare suppliers.",
        explanation: "Agglomeration brings suppliers, workers and services together." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest three diseconomies the factory could face if it grew very large in the same estate.",
        points: [
          "Congestion on estate roads and rising land rents.",
          "Difficulty in managing and communicating with a large workforce.",
          "Competition for workers and power or water supply, which pushes up costs.",
        ],
        modelAnswer: "Congestion on estate roads and rising land rents, difficulty in managing and communicating with a large workforce, and competition for workers, power and water that pushes up costs.",
        explanation: "Congestion, management and scarce inputs." }),
    ], explanation: "Calculate average cost and discuss agglomeration." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the extent to which Weber's least-cost theory explains the location of industry in Zimbabwe.",
    hints: ["Give examples that fit and examples that do not.", "Reach a judgement."],
    points: [
      "Weber stresses transport costs; weight-losing industries such as sugar milling, cement and mineral processing locate near raw materials.",
      "A material index above 1 explains why bulky ores are processed near mines.",
      "Industries making goods for consumers, such as bottling, bread and clothing, locate near the large markets of Harare and Bulawayo.",
      "Labour costs are rarely decisive because wages are similar across towns and workers are mobile.",
      "Agglomeration explains clusters in industrial estates, but Weber treats it only as a modifier.",
      "Government policy, special economic zones, power and water supply and rail routes strongly influence location but are not in the theory.",
      "Historic location and sunk investment keep industry where it is even when costs change.",
      "Judgement: Weber explains the broad pattern for raw-material industries, but market size, policy and infrastructure explain much of the rest.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Weber stresses transport costs, and this explains why weight-losing industries such as sugar milling, cement and mineral processing locate near raw materials, with a material index above 1. Consumer industries such as bottling, baking and clothing locate near the large markets of Harare and Bulawayo, as the theory predicts for an index below 1. Labour costs are rarely decisive because wages are similar across towns, and agglomeration explains clusters in industrial estates but is only a modifier in the theory. Government policy, special economic zones, power and water supply and rail routes strongly influence location but are not in the theory, and historic location keeps firms where they are. I conclude that Weber explains the broad pattern for raw-material industries, but market size, policy and infrastructure explain much of the rest.",
    wordLimit: { max: 300 }, explanation: "Weigh the theory's fit against policy, markets and infrastructure and judge." });

  b.card("DEFINITION", "Material index", "Weight of localised raw materials ÷ weight of finished product. Above 1: near the raw material. Below 1: near the market.");
  b.card("CONCEPT", "Weber's three factors", "Transport costs first, then labour costs and agglomeration, to find the least-cost location.");
  b.card("DEFINITION", "Isotim and isodapane", "Isotim: line of equal total transport cost. Isodapane: line of equal extra transport cost; the critical isodapane equals the labour saving.");
  b.card("FORMULA", "Average cost", "Average cost = fixed cost ÷ output + variable cost per unit; it falls as output rises (economies of scale).");
  b.card("CONCEPT", "Diseconomies of scale", "Average cost rises when a firm is too large because of poor management, congestion and scarce inputs.");
  b.card("CONCEPT", "Backward and forward linkages", "Backward: links to suppliers. Forward: links to users of the product.");
  b.card("DEFINITION", "Agglomeration", "Clustering of firms so that they share services, workers, suppliers and information.");
  b.card("CONCEPT", "Reasons for industrial relocation", "High rents and congestion, lack of space, new markets, cheaper or more reliable power, incentives, poor infrastructure and loss of suppliers or customers.");
  b.card("CONCEPT", "Limits of Weber in Zimbabwe", "Policy, special economic zones, power and water, rail routes, history and market size shape location as well as transport cost.");
});
