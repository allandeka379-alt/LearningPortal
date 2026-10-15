// W4b: terms of trade (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, fmt, termsOfTrade, pctChange, roundTo } from "../lib.mjs";
import { mc, LV8, LV6, LV10 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.terms-of-trade", { file: "trade/terms-of-trade", keyPrefix: "trade.terms-of-trade" }, (b) => {
  mc(b, [1, "RECALL"], "The terms of trade are calculated as",
    ["export price index ÷ import price index × 100", "Correct: the ratio of export prices to import prices."],
    [["import price index ÷ export price index × 100", "That inverts the ratio."],
     ["export volume ÷ import volume × 100", "That compares quantities, not prices."],
     ["value of exports − value of imports", "That is the balance of trade."]],
    "Terms of trade = export price index ÷ import price index × 100.");

  mc(b, [2, "UNDERSTANDING"], "A country's terms of trade improve when",
    ["export prices rise faster than import prices", "Correct: the index rises."],
    [["import prices rise faster than export prices", "That is a deterioration."],
     ["the volume of exports rises faster than the volume of imports", "That concerns quantities."],
     ["the trade deficit narrows", "The balance of trade is a different measure."]],
    "An improvement means a rise in export prices relative to import prices.", { daily: true });

  {
    const t = termsOfTrade(112, 120); chk(roundTo(t, 1), 93.3);
    mc(b, [3, "APPLICATION"], "Between a base year and year 4 the export price index of a country rises to 112 and its import price index rises to 120. Its terms of trade in year 4 are",
      ["93.3", "Correct: 112 ÷ 120 × 100."],
      [["107.1", "That inverts the ratio (120 ÷ 112)."],
       ["8.0", "That subtracts the indices (120 − 112)."],
       ["132.0", "That adds 12% and 20%."]],
      "Terms of trade = 112 ÷ 120 × 100 = 93.3, a deterioration from 100.", { hints: ["Export index divided by import index."], daily: true });
  }

  mc(b, [2, "UNDERSTANDING"], "A fall in a country's terms of trade means that",
    ["more exports must be sold to buy a given quantity of imports", "Correct: export prices have fallen relative to import prices."],
    [["fewer exports are needed to buy a given quantity of imports", "That is an improvement."],
     ["the country must have a deficit on the current account", "The balance depends on volumes and elasticities."],
     ["the exchange rate must have appreciated", "The exchange rate is only one possible cause."]],
    "Each unit of exports buys fewer imports.");

  mc(b, [3, "ANALYSIS"], "A country exports mainly a primary product for which the demand is price inelastic. The world price of the product falls. Its export revenue is likely to",
    ["fall, because quantity rises by less than price falls", "Correct: revenue falls when demand is inelastic."],
    [["rise, because the quantity sold rises by a lot", "The rise in quantity is smaller than the fall in price."],
     ["stay the same, because price and quantity change together", "That applies to unit elasticity."],
     ["rise, because the terms of trade improve at once", "A lower export price worsens the terms of trade."]],
    "With inelastic demand a price fall reduces total revenue.", { hints: ["Use the link between PED and total revenue."] });

  mc(b, [3, "ANALYSIS"], "Which change is most likely to cause a deterioration in the terms of trade of an exporter of copper?",
    ["A fall in the world demand for copper as a major buyer slows down", "Correct: the export price falls."],
    [["A rise in the price of copper because of a mine strike overseas", "That raises the export price."],
     ["A fall in the price of imported fuel and machinery", "That lowers import prices and improves the terms of trade."],
     ["The discovery of new uses for copper", "That raises demand and the price."]],
    "A fall in demand lowers the export price relative to import prices.", { hints: ["Which change lowers export prices or raises import prices?"] });

  mc(b, [4, "ANALYSIS"], "A country's terms of trade improve because its currency has appreciated, and the demand for its exports is price elastic. Which outcome is most likely?",
    ["The volume of exports falls and the current account may worsen", "Correct: exports become dearer abroad and sales fall by proportionally more."],
    [["The current account must improve because the index has risen", "Volumes matter as well as prices."],
     ["The volume of exports rises because the terms of trade are better", "Dearer exports sell less."],
     ["Import volumes fall because imports have become dearer", "Imports become cheaper in home currency after an appreciation."]],
    "An improvement caused by an appreciation makes exports dearer for foreign buyers; with elastic demand, revenue falls.", { hints: ["Think about what an appreciation does to foreign prices of exports."] });

  mc(b, [2, "UNDERSTANDING"], "Which statement about the terms of trade is correct?",
    ["The terms of trade describe prices and not quantities", "Correct: they compare price indices."],
    [["The terms of trade measure the value of trade in goods", "That is the trade balance."],
     ["A terms of trade index above 100 shows a trade surplus", "The index says nothing directly about the balance."],
     ["The terms of trade fall whenever imports rise", "They depend on prices, not volumes."]],
    "The terms of trade are a ratio of two price indices.");

  {
    const t = termsOfTrade(126, 140); chk(t, 90);
    b.num({ d: 2, skill: "APPLICATION", kind: "index", value: t, daily: true,
      stem: "A country's export price index is 126 and its import price index is 140 (same base year). Calculate its terms of trade, to one decimal place.",
      wrong: [111.1, 14, 266], explanation: "Terms of trade = 126 ÷ 140 × 100 = 90.0." });
    const ch = pctChange(80, 92); chk(ch, 15);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: ch, unit: "%", hints: ["Percentage change = change ÷ original × 100."],
      stem: "A country's terms of trade index rises from 80 to 92. Calculate the percentage change in its terms of trade, to one decimal place.",
      wrong: [12, 13.0, 13.04], explanation: "Change = (92 − 80) ÷ 80 × 100 = +15.0%. Dividing by 92 gives 13.0%." });
    const ex = 110 * 120 / 100; chk(ex, 132);
    b.num({ d: 3, skill: "APPLICATION", kind: "index", value: ex, hints: ["Rearrange: export index = terms of trade × import index ÷ 100."],
      stem: "The terms of trade of a country are 110 and its import price index is 120. Calculate its export price index, to one decimal place.",
      wrong: [109.1, 10, 130], explanation: "Export index = 110 × 120 ÷ 100 = 132.0." });
    const t1 = 36000 / 2400, t2 = 36000 / 1800; chk(t1, 15); chk(t2, 20);
    b.calc({ d: 3, skill: "APPLICATION", kind: "plain", value: t2 - t1, unit: "tonnes", hints: ["Tonnes needed = price of machine ÷ price per tonne."],
      stem: "A machine costs US\\$36,000. A country sells cotton at US\\$2,400 a tonne. The world price of cotton then falls to US\\$1,800 a tonne. Calculate how many more tonnes of cotton must be exported to pay for the machine.",
      wrong: [15, 20, 600],
      explanation: "1. Before: 36,000 ÷ 2,400 = 15 tonnes.\n2. After: 36,000 ÷ 1,800 = 20 tonnes.\n3. Extra cotton = 20 − 15 = 5 tonnes." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "If a country's terms of trade improve, its current account balance must also improve.",
    explanation: "The effect on the current account depends on the volumes of exports and imports, which depend on price elasticities." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each event with its effect on the terms of trade of a coffee-exporting country.",
    pairs: [["The world price of coffee rises", "Improve"], ["The price of imported fuel rises sharply", "Deteriorate"], ["Export prices and import prices both rise by 10%", "No change"]],
    extraRight: ["Cannot be determined without volumes"],
    explanation: "Higher export prices improve the terms of trade, higher import prices worsen them, and equal percentage changes leave the index unchanged." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A fall in the terms of trade is called a {{blank:a}}. After such a fall, {{blank:b}} exports are needed to buy the same quantity of imports.",
    blanks: [{ id: "a", accepted: ["deterioration"], choices: ["deterioration", "improvement"] }, { id: "b", accepted: ["more"], choices: ["more", "fewer"] }],
    explanation: "A fall in the index is a deterioration; more exports are needed to buy the same imports." });

  b.short({ d: 2, skill: "RECALL", stem: "State the name of the index that compares the prices a country receives for its exports with the prices it pays for its imports.",
    accepted: ["terms of trade", "the terms of trade"], wrong: ["trade balance"],
    explanation: "The terms of trade compare export prices with import prices." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define the terms of trade.",
    points: ["The relationship between a country's export prices and its import prices (an index of export prices relative to import prices)", "measured as export price index ÷ import price index × 100"],
    modelAnswer: "The terms of trade are an index of the relationship between a country's average export prices and average import prices, calculated as the export price index divided by the import price index, multiplied by 100.",
    explanation: "Relationship between export and import prices; formula." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Use the idea of how many exports must be given up."],
    stem: "Explain how a deterioration in the terms of trade affects the living standards of a country that depends on imports of fuel and machinery.",
    points: ["Export prices fall relative to import prices.", "More exports must be sold to pay for the same quantity of imports.", "So the quantity of imports that national income can buy falls (real income falls).", "Imported inputs are dearer, which raises costs and prices, reducing living standards."],
    modelAnswer: "A deterioration means that export prices have fallen relative to import prices, so the country must sell more exports to buy the same fuel and machinery. The quantity of imports that national income can buy therefore falls, which reduces real income. Dearer imported inputs also raise costs and prices at home, which lowers living standards.",
    explanation: "Relative prices, more exports, lower real income, higher costs." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Combine price elasticity with the change in export revenue."],
    stem: "Explain why a fall in the terms of trade is likely to worsen the current account of a primary-commodity exporter.",
    points: ["Export prices fall.", "The demand for primary products is price inelastic.", "So the rise in quantity sold is proportionally smaller than the fall in price.", "Export revenue falls.", "Import spending falls little (imports of fuel and machinery are essential), so the deficit widens."],
    modelAnswer: "A fall in the terms of trade means that export prices have fallen. Because demand for primary products is price inelastic, the quantity sold rises by proportionally less than the price falls, so export revenue falls. Imports of fuel and machinery are essential, so import spending falls little, and the current account moves towards deficit.",
    explanation: "Price fall, inelastic demand, lower revenue, imports stay, deficit." });

  {
    const t = table(["Year", "Export price index", "Import price index"], [["1", 100, 100], ["2", 112, 108], ["3", 126, 105], ["4", 117, 117]], { align: ["l", "r", "r"] });
    const t2 = termsOfTrade(112, 108), t3 = termsOfTrade(126, 105), t4 = termsOfTrade(117, 117);
    chk(roundTo(t3, 1), 120); chk(t4, 100);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Terms of trade = export index ÷ import index × 100.", "Percentage change = change ÷ original × 100."],
      stem: "**Prices of Zandia's trade (fictional, illustrative)**\n\nZandia exports tobacco and cotton and imports fuel and machinery. Table 1 shows price indices (year 1 = 100).\n\n" + t,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "index", value: t3, stem: "Calculate the terms of trade in year 3, to one decimal place.", wrong: [83.3, 21, 126], explanation: "126 ÷ 105 × 100 = 120.0." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(t3, t4), unit: "%", stem: "Calculate the percentage change in the terms of trade between year 3 and year 4, to one decimal place.", wrong: [20, 16.7, -20], explanation: "Year 4: 117 ÷ 117 × 100 = 100.0. Change = (100 − 120) ÷ 120 × 100 = −16.7%." }),
        P.fib({ label: "(c)", marks: 1, stem: "Complete the sentence.", template: "Between year 3 and year 4 the terms of trade of Zandia {{blank:a}}.", blanks: [{ id: "a", accepted: ["deteriorated"], choices: ["deteriorated", "improved"] }], explanation: "The index fell from 120.0 to 100.0: a deterioration." }),
        P.manual({ label: "(d)", marks: 5, stem: "Explain two possible effects of the change between year 3 and year 4 on Zandia.",
          points: ["Export prices fell relative to import prices, so more exports are needed for the same imports.", "Real income and living standards fall, because national income buys fewer imports.", "Export revenue may fall if demand is inelastic, so the current account tends to worsen.", "Exporters of tobacco and cotton earn less and may cut output and jobs.", "Imported fuel is dearer relative to export prices, so cost-push pressure on prices increases."],
          modelAnswer: "Export prices fell relative to import prices, so Zandia must sell more exports to buy the same imports and its real income falls. Because demand for tobacco and cotton is price inelastic, export revenue may fall, so the current account is likely to worsen. Exporters then earn less and may cut output and jobs, and dearer imported fuel raises costs and prices." }),
      ],
      explanation: "Year 3 terms of trade 120.0; year 4 100.0, a fall of 16.7%; deterioration; effects on real income, current account and jobs." });
  }
  {
    const dq = 20 * 0.5; chk(dq, 10);
    const rev = (0.8 * 1.1 - 1) * 100; chk(roundTo(rev, 1), -12);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["%ΔQ = PED × %ΔP.", "New revenue index = 0.8 × 1.1.", "In (d) weigh the volatility of prices, diversification and other policies."],
      stem: "**Copper in Kavala (fictional, illustrative)**\n\nCopper provides most of Kavala's export earnings. Demand for copper on world markets is price inelastic, with a price elasticity of demand of −0.5. A slowdown in world growth lowers the world price of copper by 20%, while the prices of Kavala's imports of fuel and machinery do not change.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: dq, unit: "%", stem: "Calculate the percentage change in the quantity of copper demanded, to one decimal place (a rise is positive).", wrong: [-10, 40, 0.5], explanation: "%ΔQ = PED × %ΔP = −0.5 × (−20) = +10.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: rev, unit: "%", stem: "Calculate the percentage change in Kavala's export revenue from copper, to one decimal place (a fall is negative), assuming its export volume changes by the same percentage as world demand.", wrong: [-10, -20, 12], explanation: "New revenue = 0.80 × 1.10 = 0.88 of the old: a fall of 12.0%." }),
        P.mcq({ label: "(c)", marks: 2, stem: "Which statement best explains the answer to (b)?", options: [["The percentage fall in price is larger than the percentage rise in quantity", "Correct: demand is inelastic."], ["The percentage rise in quantity is larger than the percentage fall in price", "That happens when demand is elastic."], ["The terms of trade have improved", "A fall in export price worsens them."], ["Import prices have fallen", "Import prices did not change."]], answer: "A", explanation: "With PED of −0.5 the quantity rises by 10% but the price falls by 20%, so revenue falls." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess how far diversification of Kavala's exports would protect the country from changes in the price of copper.",
          points: ["Dependence on one product leaves export revenue and the terms of trade exposed to its price.", "Several exports with prices that do not move together would reduce the swings in total revenue.", "Processing copper into manufactured products adds value and may have more stable prices.", "Diversification takes time, capital and skills, and new products face competition.", "Other measures (saving a share of revenue in good years, financial support) may be needed.", "Judgement."],
          modelAnswer: "Kavala relies on copper, so a fall in its price cuts export revenue sharply and worsens the terms of trade, as the 12% fall in revenue shows. If the country exports several goods whose prices do not move together, a fall in one price would be offset by others, so total revenue would be more stable. Processing copper into manufactured goods adds value and may have steadier prices. However, diversification takes time, capital and skills, and new industries face competition. In the short run the government may also need to save part of the revenue in good years. Diversification would therefore reduce the risk over time but is not an immediate protection." }),
      ],
      explanation: "Quantity rises 10%; revenue falls 12.0%; inelastic demand; assess diversification." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider elasticity, volatility and long-run trends."],
    stem: "Assess whether a deterioration in the terms of trade always harms a country.",
    points: ["It reduces the quantity of imports that exports can buy, lowering real income.", "Export revenue falls if demand is inelastic and the current account worsens.", "Imported inputs may be dearer, adding to cost-push inflation.", "But if caused by higher productivity and lower costs, lower export prices can raise sales volumes and employment.", "If demand is elastic, revenue may rise.", "A depreciation that lowers the index may improve competitiveness.", "The effect depends on the cause, elasticities and how long it lasts.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A deterioration means that export prices fall relative to import prices, so each unit of exports buys fewer imports and real income falls. If demand for exports is inelastic, export revenue falls and the current account worsens, and dearer imported inputs can add to cost-push inflation. However, the effect depends on the cause. If prices fall because productivity has risen and costs are lower, exports become more competitive and sales volumes and employment may rise. If demand is elastic, the rise in quantity may be proportionally larger than the fall in price, so revenue rises. A depreciation may lower the index but improve competitiveness. Overall a deterioration usually reduces living standards in the short run, particularly for commodity exporters, but it is not harmful in every case.",
    explanation: "Weigh lower real income and revenue against productivity-led falls and elastic demand." });

  b.card("DEFINITION", "Define the **terms of trade**.", "An index of the relationship between average export prices and average import prices.");
  b.card("FORMULA", "Terms of trade formula?", "Export price index ÷ import price index × 100.");
  b.card("CONCEPT", "What does a rise in the terms of trade index mean?", "An improvement: a given quantity of exports buys more imports.");
  b.card("CONCEPT", "What does a fall in the index mean?", "A deterioration: more exports are needed to buy the same imports.");
  b.card("CONCEPT", "Why can the terms of trade improve while the current account worsens?", "The terms of trade measure prices only; export volumes may fall if the rise in prices makes exports less competitive.");
  b.card("CONCEPT", "Why are primary-commodity exporters vulnerable to terms of trade changes?", "Prices of primary products are volatile and demand is price inelastic, and exports are concentrated in a few goods.");
  b.card("FACT", "A deterioration of the terms of trade and inelastic export demand: effect on export revenue?", "Export revenue falls, because the rise in quantity sold is proportionally smaller than the fall in price.");
  b.card("CONCEPT", "Name three causes of changes in the terms of trade.", "World demand and supply of traded goods, the exchange rate, relative inflation or productivity.");
  b.card("CONCEPT", "Prebisch-Singer hypothesis in one line?", "Primary product prices tend to fall relative to manufactures over time, so primary exporters' terms of trade deteriorate (the evidence is mixed).");
});
