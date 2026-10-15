// W4b: trade.global-flows-balance (both boards). All trade values are illustrative (labelled); no published statistics are quoted.
// Computed: balance 5 200 - 6 000 = -800; cover 86.7%; needed rise 15.4%; terms of trade 120/150 = 80, 1.25x; export table shares;
// terms of trade 2015 81.8, 2020 70, extra exports 42.9%.
import { concept, P, geographyLevels, chk, rnd, sum, ZIM } from "../lib.mjs";
import { mc, tbl } from "../tables/w4b-_q.mjs";

const bal = chk(5200 - 6000, -800);
const cover = rnd((5200 / 6000) * 100, 1, 86.7, "cover");
const rise = rnd((800 / 5200) * 100, 1, 15.4, "rise");
const tot = chk(120 / 150 * 100, 80, 1e-9);
const timesMore = chk(100 / tot, 1.25, 1e-9);
const EX = [["Minerals", 3100], ["Tobacco", 900], ["Sugar and other farm products", 600], ["Manufactures", 600]];
const IM = [["Fuel", 1500], ["Machinery and vehicles", 1800], ["Chemicals and fertiliser", 1200], ["Food", 900], ["Other manufactures", 600]];
const exT = chk(sum(EX.map((e) => e[1])), 5200);
const imT = chk(sum(IM.map((e) => e[1])), 6000);
const minShare = rnd((3100 / exT) * 100, 1, 59.6, "minShare");
const fuelShare = chk((1500 / imT) * 100, 25, 1e-9);
const fmt = (n) => n.toLocaleString("en").replace(/,/g, " ");
const TT = tbl(["Exports", "US\\$ million"], [...EX.map((e) => [e[0], fmt(e[1])]), ["Total exports", fmt(exT)]]) + "\n\n" + tbl(["Imports", "US\\$ million"], [...IM.map((e) => [e[0], fmt(e[1])]), ["Total imports", fmt(imT)]]);
const X15 = [95, 110], X20 = [90, 120];
const tot15 = rnd((X15[0] / X15[1]) * 100, 1, 86.4, "tot15");
const tot20 = chk((X20[0] / X20[1]) * 100, 75, 1e-9);
const more20 = rnd((100 / tot20 - 1) * 100, 1, 33.3, "more20");
const TI = tbl(["Year", "Export price index", "Import price index"], [[2010, 100, 100], [2015, 95, 110], [2020, 90, 120]]);

concept("ageo.trade.global-flows-balance", { file: "trade/global-flows-balance", keyPrefix: "trade.global-flows-balance" }, (b) => {
  mc(b, 1, "RECALL", "What is visible trade?", [
    ["The export and import of physical goods", "Correct: visible trade is trade in goods."],
    ["The export and import of services such as tourism", "That is invisible trade."],
    ["Trade that is carried out only by the government", "Visible trade is not limited to the state."],
    ["Trade that takes place only at night", "Time of day is irrelevant."],
  ], "**Visible trade** is trade in goods.");
  mc(b, 2, "UNDERSTANDING", "Which is an example of invisible trade?", [
    ["A tourist from Europe staying in a hotel in Victoria Falls", "Correct: tourism is a service export."],
    ["A shipment of platinum concentrate sent to a refinery", "That is visible trade."],
    ["A truck of fertiliser imported from South Africa into Zimbabwe", "That is visible trade."],
    ["An export of raw tobacco to Asia", "That is visible trade."],
  ], "Tourism is **invisible** trade because it is a service.");
  mc(b, 2, "UNDERSTANDING", "What does a trade deficit mean?", [
    ["The value of imports is greater than the value of exports", "Correct: more is spent on imports than earned from exports."],
    ["The value of exports is greater than the value of imports", "That is a surplus."],
    ["The country has stopped all trade with others", "A deficit does not mean no trade."],
    ["The country has joined a trade bloc", "Joining a bloc is different."],
  ], "A **deficit** means imports exceed exports.");
  mc(b, 3, "APPLICATION", "A country's terms of trade fall from 100 to 80. What does this show?", [
    ["It must export more to buy the same quantity of imports", "Correct: export prices have fallen relative to import prices."],
    ["It can buy more imports for each unit of exports", "That would be an improvement."],
    ["Its exports have become more expensive than its imports overall", "That is an improvement."],
    ["Its trade balance must have moved into surplus", "Terms of trade do not show the balance."],
  ], "Falling terms of trade mean **more exports are needed** to pay for imports.", { hints: ["Terms of trade compare export prices with import prices."] });
  mc(b, 3, "ANALYSIS", "Why are narrow sea passages such as Suez and Malacca called choke points?", [
    ["Many ships pass through them, so blockage delays trade and costs", "Correct: they are narrow with heavy traffic."],
    ["Ships are not allowed to pass through them at any time", "They are open to shipping."],
    ["They are lakes with no connection to the ocean", "They connect seas and oceans."],
    ["They carry only air traffic between countries", "They are sea routes."],
  ], "A **choke point** is a narrow route that handles much traffic.", { hints: ["Think about what happens when a narrow channel is blocked."] });
  mc(b, 4, "EVALUATION", "A country gets 70% of export earnings from one mineral. Which risk is most serious?", [
    ["A fall in the world price of that mineral would cut earnings sharply", "Correct: dependence on one commodity makes earnings unstable."],
    ["The country will have too many different exports", "It has few exports."],
    ["The mineral will become cheaper to produce as prices fall", "Costs do not fall with prices."],
    ["Other countries will refuse to buy any goods at all", "This is not implied."],
  ], "Dependence on one commodity makes **earnings unstable**.", { hints: ["Think about what happens if the world price falls."] });
  b.tf({ d: 1, skill: "RECALL", stem: "Most world trade in goods is carried by sea.", answer: true,
    feedbackTrue: "Correct: ships, especially container ships, carry most goods by volume.",
    feedbackFalse: "Not so: sea transport carries most goods by volume.",
    explanation: "Sea transport is cheapest for bulk and container goods." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Manufactured goods usually have a higher value per tonne than primary commodities.", answer: true,
    feedbackTrue: "Correct: manufactured goods carry more value per tonne.",
    feedbackFalse: "Not so: manufactures are generally worth more per tonne than raw materials.",
    explanation: "Processing and design add value." });
  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct term for each blank.",
    template: "Balance of trade = {{blank:a}} − imports. The African Continental Free Trade Area is intended to raise trade between {{blank:b}} countries.",
    blanks: [
      { id: "a", accepted: ["exports"], choices: ["exports", "profits", "taxes"] },
      { id: "b", accepted: ["African"], choices: ["African", "Asian", "European"] },
    ], explanation: "**Exports** − imports; **African** countries." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its meaning.",
    pairs: [
      ["Visible trade", "Trade in goods"],
      ["Invisible trade", "Trade in services"],
      ["Trade bloc", "Group of countries with reduced barriers between them"],
      ["Choke point", "Narrow route through which much shipping passes"],
    ], explanation: "Each term is a key idea of world trade." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, calculator: true, unit: "US$ million",
    stem: "A country's visible exports were US\\$5 200 million and visible imports US\\$6 000 million. Calculate the balance of trade, in US\\$ million (use a negative sign for a deficit).",
    hints: ["Balance = exports − imports."],
    value: bal, wrong: [800, 11200],
    explanation: "5 200 − 6 000 = **−800**, a deficit of US\\$800 million. The value 800 leaves out the sign." });
  b.num({ d: 3, skill: "APPLICATION", calculator: true, unit: "%", dp: 1,
    stem: "Using the same figures, calculate the percentage of imports paid for by exports, to 1 decimal place.",
    hints: ["Exports ÷ imports × 100."],
    value: cover, wrong: [115.4, 13.3],
    explanation: "5 200 ÷ 6 000 × 100 = **86.7%**. The value 115.4 divides imports by exports." });
  b.calc({ d: 3, skill: "APPLICATION", calculator: true, unit: "times",
    stem: "A country's export price index is 120 and its import price index is 150. Calculate its terms of trade, and then how many times as much it must export to buy the same imports as in the base year (index 100).",
    hints: ["Terms of trade = export index ÷ import index × 100.", "Divide 100 by the terms of trade."],
    value: timesMore, wrong: [0.8, 80],
    explanation: "1. Terms of trade = 120 ÷ 150 × 100 = 80.\n2. Exports needed = 100 ÷ 80 = **1.25 times** (25% more)." });
  b.short({ d: 1, skill: "RECALL", stem: "Name the canal that links the Mediterranean Sea and the Red Sea and shortens the route between Europe and Asia.",
    accepted: ["Suez Canal", "Suez", "the Suez Canal"], wrong: ["Panama Canal"],
    explanation: "The **Suez Canal**." });
  b.short({ d: 2, skill: "RECALL", daily: true, stem: "What is the term for trade in services such as tourism, banking and shipping?",
    accepted: ["invisible trade", "invisibles", "trade in services", "invisible exports", "services trade"], wrong: ["visible trade"],
    explanation: "**Invisible trade**." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why countries that export mainly primary commodities often earn less from trade than countries that export manufactures.",
    hints: ["Think of price per tonne, price changes and processing."],
    points: [
      "Primary commodities have a low value per tonne compared with manufactured goods.",
      "Their prices change widely on world markets, so earnings are unstable.",
      "Processing and design, which add most value, are done in the countries that make manufactures.",
      "Prices of imported manufactures tend to rise relative to commodity prices, so terms of trade may worsen.",
    ],
    modelAnswer: "Primary commodities have a low value per tonne compared with manufactured goods, and their prices change widely on world markets, so earnings are unstable. Processing and design, which add most value, are done where manufactures are made, and import prices may rise relative to commodity prices, worsening the terms of trade.",
    explanation: "Low value, unstable prices, processing elsewhere and terms of trade." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe the main flows of manufactured goods in world trade.",
    hints: ["Name the regions that export and import them."],
    points: [
      "East Asia (China, Japan, South Korea) is a major exporter of manufactured goods.",
      "Large flows go to Europe and North America, which have big consumer markets.",
      "Manufactures also flow between Europe, North America and Asia and within trade blocs, while Africa takes in more than it sends out.",
    ],
    modelAnswer: "East Asia, including China, Japan and South Korea, is a major exporter of manufactured goods, with large flows going to Europe and North America. Manufactures also flow between those regions and within trade blocs, while Africa takes in more than it sends out.",
    explanation: "Name exporting and importing regions." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Suggest four ways in which Zimbabwe could improve its balance of trade.",
    hints: ["Think about value addition, diversification, regional trade and imports."],
    points: [
      "Process minerals and farm products before export to earn more per tonne.",
      "Diversify exports, for example into horticulture, manufactures and services such as tourism.",
      "Expand trade within SADC, COMESA and the African Continental Free Trade Area.",
      "Produce some goods locally to replace imports, and improve power, transport and border procedures.",
    ],
    modelAnswer: "Process minerals and farm products before export to earn more per tonne, diversify exports into horticulture, manufactures and services such as tourism, expand trade within SADC, COMESA and the African Continental Free Trade Area, and produce some goods locally to replace imports while improving power, transport and border procedures.",
    explanation: "Value addition, diversification, regional markets and import substitution." });

  b.struct({ d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: `The table shows visible trade of a southern African country in one year (data invented for this exercise).\n\n${TT}`,
    hints: ["Share = part ÷ total × 100.", "Balance = exports − imports."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of export earnings from minerals, to 1 decimal place.", value: minShare, dp: 1, unit: "%", wrong: [51.7, 3100],
        explanation: "3 100 ÷ 5 200 × 100 = 59.6%." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the balance of trade, in US\\$ million.", value: bal, unit: "US$ million", wrong: [800, 11200],
        explanation: "5 200 − 6 000 = −800, a deficit of US\\$800 million." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain one risk of depending on minerals for most export earnings.",
        points: [
          "World prices of minerals change often, so export earnings can fall sharply.",
          "A fall in earnings reduces foreign currency for imports and tax revenue for the government.",
        ],
        modelAnswer: "World prices of minerals change often, so export earnings can fall sharply, which reduces the foreign currency available for imports and the government's tax revenue.",
        explanation: "Price instability affects currency and revenue." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways of reducing the dependence on minerals.",
        points: [
          "Process minerals and farm products to add value.",
          "Develop other exports such as horticulture, manufactures and tourism services.",
        ],
        modelAnswer: "Process minerals and farm products to add value, and develop other exports such as horticulture, manufactures and tourism services.",
        explanation: "Value addition and diversification." }),
    ], explanation: "Analyse an export and import table." });

  b.struct({ d: 4, skill: "EVALUATION",
    stem: `A country exports mainly a primary commodity. Its price indices (base year 2010 = 100) are shown (illustrative data).\n\n${TI}`,
    hints: ["Terms of trade = export index ÷ import index × 100.", "Extra exports needed = (100 ÷ terms of trade − 1) × 100."],
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the terms of trade for 2015, to 1 decimal place.", value: tot15, dp: 1, wrong: [115.8, 95],
        explanation: "95 ÷ 110 × 100 = 86.4." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the terms of trade for 2020.", value: tot20, wrong: [133, 90],
        explanation: "90 ÷ 120 × 100 = 75." }),
      P.num({ label: "(c)", marks: 2, stem: "By what percentage must the country increase its exports in 2020 to buy the same quantity of imports as in 2010, to 1 decimal place?", value: more20, dp: 1, unit: "%", wrong: [25, 75],
        explanation: "100 ÷ 75 = 1.3333, so 33.3% more." }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the terms of trade of countries exporting primary commodities often worsen over time.",
        points: [
          "Prices of raw materials and crops are unstable and often fall when supply rises.",
          "Prices of imported manufactures and fuel tend to rise steadily.",
          "Demand for many commodities grows slowly, whereas manufactured goods add value.",
        ],
        modelAnswer: "Prices of raw materials and crops are unstable and often fall when supply rises, while prices of imported manufactures and fuel tend to rise steadily. Demand for many commodities grows slowly, whereas manufactured goods add more value.",
        explanation: "Unstable commodity prices and rising manufacture prices." }),
      P.manual({ label: "(e)", marks: 3, stem: "Suggest three ways in which the country could reduce the effects of worsening terms of trade.",
        points: [
          "Process the commodity to export higher-value goods.",
          "Diversify into other products and services.",
          "Build reserves in good years and use trade agreements to secure stable markets.",
        ],
        modelAnswer: "Process the commodity to export higher-value goods, diversify into other products and services, and build reserves in good years while using trade agreements to secure stable markets.",
        explanation: "Value addition, diversification and stability." }),
    ], explanation: "Calculate terms of trade and explain how to cope with worsening terms." });

  b.ext({ d: 4, skill: "EVALUATION", marks: 8,
    stem: "Assess the impact of dependence on primary commodity exports on the development of a country.",
    hints: ["Use evidence such as price instability and terms of trade.", "Reach a judgement."],
    points: [
      "Primary exports can earn foreign currency and tax revenue and employ many people.",
      "Prices are unstable, so earnings, budgets and exchange rates are unpredictable.",
      "A long-term fall in terms of trade means more exports are needed to buy the same imports.",
      "Dependence on one commodity makes the economy vulnerable to price falls, bad weather or pests.",
      "Low value per tonne limits earnings compared with manufactured exports.",
      "Processing and diversification add value but need investment, power and skills.",
      "Resource wealth does not guarantee development unless income is invested well.",
      "Judgement: dependence brings income but also instability, so development needs diversification and value addition.",
    ],
    levels: geographyLevels(8),
    modelAnswer: "Primary exports can earn foreign currency and tax revenue and employ many people. However, prices are unstable, so earnings, budgets and exchange rates are unpredictable, and a long-term fall in the terms of trade means more exports are needed to buy the same imports. Dependence on one commodity makes the economy vulnerable to price falls, bad weather or pests, and low value per tonne limits earnings compared with manufactured exports. Processing and diversification add value but need investment, power and skills, and resource wealth does not guarantee development unless income is invested well. I conclude that dependence brings income but also instability, so development needs diversification and value addition.",
    wordLimit: { max: 300 }, explanation: "Weigh income against instability and judge." });

  b.card("DEFINITION", "Visible and invisible trade", "Visible trade is in goods; invisible trade is in services such as tourism, banking, insurance and shipping.");
  b.card("FORMULA", "Balance of trade", "Balance of trade = value of visible exports − value of visible imports; negative is a deficit.");
  b.card("FORMULA", "Terms of trade", "Terms of trade = (export price index ÷ import price index) × 100; below 100 means worsening.");
  b.card("CONCEPT", "Primary commodities versus manufactures", "Commodities have low, unstable value per tonne; manufactures have higher and steadier value.");
  b.card("CONCEPT", "Trade blocs", "Groups such as the EU, USMCA, ASEAN, SADC and COMESA that reduce trade barriers between members.");
  b.card("FACT", "Choke points", "Narrow sea passages such as Suez, Malacca, Hormuz and Bab-el-Mandeb where blockage delays world trade.");
  b.card("FACT", "Zimbabwe's main exports and imports", "Exports: minerals and tobacco. Imports: fuel, machinery, vehicles, chemicals and food. Quote ZimStat figures with the year.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Improving Zimbabwe's trade balance", "Value addition, export diversification, regional trade (SADC, COMESA, AfCFTA), import substitution and better power and border procedures.", undefined, { applies: ZIM });
  b.card("FACT", "African Continental Free Trade Area", "A free trade area that began trading in 2021 to raise trade between African countries.");
});
