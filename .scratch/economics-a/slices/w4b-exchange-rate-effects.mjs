// W4b: effects of exchange rate changes, Marshall-Lerner and the J-curve (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, marshallLerner, roundTo, CAM } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.exchange-rate-effects", { file: "trade/exchange-rate-effects", keyPrefix: "trade.exchange-rate-effects" }, (b) => {
  mc(b, [2, "UNDERSTANDING"], "Other things equal, a depreciation of a country's currency will most likely",
    ["lower the foreign-currency price of its exports and raise the home price of its imports", "Correct: relative prices change."],
    [["raise the foreign-currency price of its exports and lower the home price of its imports", "That describes an appreciation."],
     ["leave both export and import prices unchanged", "Prices in the other currency change."],
     ["lower the home-currency price of its imports", "Imports become dearer."]],
    "A weaker currency makes exports cheaper abroad and imports dearer at home.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A depreciation increases net exports. In the AD/AS model this will, other things equal,",
    ["shift aggregate demand to the right", "Correct: net exports are part of AD."],
    [["shift aggregate demand to the left", "Net exports rise."],
     ["shift long-run aggregate supply to the right", "Productive capacity is unchanged."],
     ["shift short-run aggregate supply to the right", "Dearer imported inputs shift SRAS left."]],
    "AD = C + I + G + (X − M); a rise in X − M shifts AD right.", { hints: ["Which component of AD changes?"] });

  mc(b, [3, "ANALYSIS"], "A depreciation raises the cost of imported raw materials used by manufacturers. This is likely to",
    ["shift short-run aggregate supply to the left", "Correct: costs of production rise."],
    [["shift short-run aggregate supply to the right", "Higher costs reduce supply."],
     ["shift aggregate demand to the left", "The cost effect is on supply."],
     ["have no effect, because exports are cheaper", "Costs and prices are affected."]],
    "Higher input costs reduce supply at each price level.", { hints: ["What happens to firms' costs?"] });

  mc(b, [2, "UNDERSTANDING"], "An appreciation of the currency is most likely to",
    ["make imported goods cheaper in the home currency", "Correct: each unit of foreign currency costs less."],
    [["make exports cheaper for foreign buyers", "Exports become dearer."],
     ["raise the price of imported fuel", "Import prices fall."],
     ["increase net exports in the short run", "Net exports tend to fall."]],
    "A stronger currency reduces the home-currency price of imports.");

  mc(b, [3, "UNDERSTANDING"], "The Marshall-Lerner condition states that a depreciation will improve the trade balance if",
    ["the sum of the elasticities for exports and imports exceeds 1", "Correct: |PEDx| + |PEDm| > 1."],
    [["the price elasticity of demand for exports is greater than 1", "Both elasticities matter."],
     ["the price elasticity of demand for imports is less than 1", "That works against the condition."],
     ["the sum of the elasticities of the two is less than 1", "The balance would worsen."]],
    "The sum of the absolute values must exceed 1.", { applies: CAM, hints: ["Both elasticities are added."] });

  mc(b, [3, "UNDERSTANDING"], "The J-curve describes a trade balance that",
    ["worsens soon after a depreciation and improves later", "Correct: quantities adjust slowly."],
    [["improves at once after a depreciation and then worsens", "That is the reverse."],
     ["falls steadily after an appreciation", "That is not the J-curve."],
     ["is unchanged for several years after a depreciation", "It changes in the short run."]],
    "Elasticities are low in the short run, so the price effect dominates at first.", { applies: CAM, hints: ["Think about short-run elasticities."] });

  mc(b, [4, "EVALUATION"], "A government wants a depreciation to improve the trade balance. Which condition makes success most likely?",
    ["Spare capacity exists and the demands for exports and imports are elastic", "Correct: output can expand and quantities respond strongly."],
    [["The economy is at full capacity and imports are mainly essentials", "Demand is inelastic and capacity limited."],
     ["Exports are mainly primary goods sold at world prices in dollars", "Export volumes respond little to the home exchange rate."],
     ["Trading partners also devalue their currencies by the same amount at the same time", "The competitive gain would disappear."]],
    "Elasticities and spare capacity determine how far the trade balance improves.", { hints: ["When can output and quantities respond?"] });

  mc(b, [3, "ANALYSIS"], "Which is a likely drawback of a deliberate depreciation of the currency?",
    ["Imported inflation and heavier foreign-currency debts", "Correct: imports and dollar debts cost more."],
    [["A fall in the price of imported fuel and machinery", "Imports become dearer."],
     ["A fall in the competitiveness of the country's exports", "Exports become more competitive."],
     ["A fall in the burden of debt held in dollars", "The home-currency cost rises."]],
    "Dearer imports raise costs and prices, and foreign debts cost more in home currency.", { hints: ["What happens to prices paid in foreign currency?"] });

  {
    const dq = -1.5 * -8; chk(dq, 12);
    b.num({ d: 2, skill: "APPLICATION", kind: "pct", value: dq, unit: "%", daily: true,
      stem: "A depreciation lowers the foreign-currency price of a country's exports by 8%. The price elasticity of demand for exports is −1.5. Calculate the percentage change in the quantity of exports demanded (a rise is positive), to one decimal place.",
      wrong: [-12, 5.3, 8], explanation: "%ΔQ = PED × %ΔP = −1.5 × (−8) = +12.0%." });
    const ml = 0.9 + 0.7; chk(ml, 1.6);
    b.num({ d: 2, skill: "APPLICATION", kind: "elasticity", value: ml, applies: CAM, hints: ["Add the absolute values."],
      stem: "The price elasticity of demand for a country's exports is −0.9 and for its imports −0.7. Calculate the sum of the absolute values of the elasticities, to two decimal places.",
      wrong: [0.2, -1.6, 0.63], explanation: "|−0.9| + |−0.7| = 1.60. Since the sum is greater than 1 the Marshall-Lerner condition is met." });
    const X = 2000 * 1.08, M = 2000 * 1.10 * 0.97; chk(X, 2160); chk(roundTo(M, 6), 2134);
    b.calc({ d: 4, skill: "APPLICATION", kind: "plain", value: X - M, unit: "US$ million", dp: 0, tol: 0.5, calculator: true, hints: ["Export revenue and import spending are both measured in the home currency.", "Import spending = old spending × (1 + price change) × (1 + quantity change)."],
      stem: "Exports and imports are each worth US\\$2,000 million, so the trade balance is zero. A depreciation raises the home-currency price of imports by 10% and the quantity of imports demanded falls by 3%. Export prices in home currency are unchanged and the quantity of exports demanded rises by 8%. Calculate the new trade balance, in US\\$ million.",
      wrong: [160, -26, 60],
      explanation: "1. Exports = 2,000 × 1.08 = 2,160.\n2. Imports = 2,000 × 1.10 × 0.97 = 2,134.\n3. Balance = 2,160 − 2,134 = +US\\$26 million, an improvement." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: true, applies: CAM, stem: "According to the Marshall-Lerner condition a depreciation worsens the trade balance if the sum of the absolute price elasticities of demand for exports and imports is less than 1.",
    explanation: "If the sum is less than 1, quantities respond too little to offset the price effects." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each event with its likely effect on the home economy.",
    pairs: [["Depreciation", "Net exports rise and import prices rise"], ["Appreciation", "Imports become cheaper and exporters lose competitiveness"], ["Depreciation when demands are inelastic", "The trade balance may worsen"], ["Fall in imported input prices after an appreciation", "Short-run aggregate supply shifts right"]],
    explanation: "Relative prices and costs change with the exchange rate." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A depreciation shifts aggregate demand to the {{blank:a}} because net exports rise. It shifts short-run aggregate supply to the {{blank:b}} because imported inputs become dearer.",
    blanks: [{ id: "a", accepted: ["right"], choices: ["right", "left"] }, { id: "b", accepted: ["left"], choices: ["left", "right"] }],
    explanation: "AD rises with net exports; SRAS falls with higher costs." });

  b.short({ d: 2, skill: "RECALL", applies: CAM, stem: "What name is given to the pattern in which a trade balance worsens soon after a depreciation and improves later?",
    accepted: ["J-curve", "the J-curve", "j curve", "J curve effect", "the J curve", "j-curve effect"], wrong: ["Laffer curve"],
    explanation: "The J-curve effect." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, applies: CAM, stem: "State the Marshall-Lerner condition.",
    points: ["A depreciation improves the trade balance only if", "the sum of the price elasticities of demand for exports and imports (absolute values) is greater than 1"],
    modelAnswer: "A depreciation will improve the trade balance only if the sum of the absolute values of the price elasticities of demand for exports and imports is greater than 1.",
    explanation: "The sum of the two elasticities must exceed 1." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Trace the price change, quantity change and effect on AD."],
    stem: "Explain how a depreciation of the currency may increase aggregate demand.",
    points: ["The foreign-currency price of exports falls and the home price of imports rises.", "Export volumes rise and import volumes fall (more so if demand is elastic).", "Net exports (X − M) increase.", "Aggregate demand shifts to the right."],
    modelAnswer: "A depreciation lowers the foreign-currency price of exports and raises the home price of imports. If demand is elastic, export volumes rise and import volumes fall, so net exports increase, and since net exports are a component of aggregate demand the AD curve shifts to the right.",
    explanation: "Prices, quantities, net exports, AD." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider imported raw materials and the price level."],
    stem: "Analyse how a depreciation may cause inflation.",
    points: ["Imports become dearer in the home currency.", "Firms that use imported raw materials, fuel and components face higher costs.", "SRAS shifts to the left, raising the price level (cost-push).", "Net exports raise aggregate demand, adding demand-pull pressure, especially near full capacity.", "Workers may demand higher wages to compensate for dearer imported goods."],
    modelAnswer: "A depreciation makes imports dearer in the home currency, so firms that use imported raw materials, fuel and components face higher costs and SRAS shifts to the left, raising the price level. The rise in net exports increases aggregate demand, adding demand-pull pressure, particularly when the economy is near full capacity, and workers may demand higher wages to compensate for dearer imports.",
    explanation: "Cost-push and demand-pull routes." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, applies: CAM, hints: ["Why are short-run elasticities low?"],
    stem: "Explain why the trade balance may worsen immediately after a depreciation.",
    points: ["In the short run demand for exports and imports is price inelastic.", "Contracts and habits mean that quantities adjust slowly.", "Import spending rises because prices are higher while volumes hardly change.", "Export revenue rises little, so the balance worsens before improving (the J-curve)."],
    modelAnswer: "In the short run demand for exports and imports is price inelastic, because of contracts and habits, so quantities adjust slowly. Import prices rise but volumes hardly change, so import spending rises, while export revenue rises little, so the balance worsens before it improves.",
    explanation: "Low short-run elasticities give the J-curve." });

  {
    const X0 = 1500, M0 = 1500;
    const qx = -0.9 * -10, qm = -0.5 * 10; chk(qx, 9); chk(qm, -5);
    const X1 = X0 * 1.09, M1 = M0 * 1.10 * 0.95; chk(X1, 1635); chk(M1, 1567.5);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, applies: CAM, hints: ["%ΔQ = PED × %ΔP.", "Import spending = old spending × 1.10 × (1 + %ΔQ)."],
      stem: "**A depreciation in Zandia (fictional, illustrative)**\n\nZandia's exports and imports are each worth US\\$1,500 million a year, so its trade balance is zero. Its currency depreciates, lowering the foreign price of its exports by 10% and raising the home price of imports by 10%. The price elasticity of demand for exports is −0.9 and for imports is −0.5. Export prices in Zandia's currency are unchanged.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: qx, unit: "%", stem: "Calculate the percentage change in the quantity of exports (a rise is positive), to one decimal place.", wrong: [-9, 10, 1.9], explanation: "−0.9 × (−10) = +9.0%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: qm, unit: "%", stem: "Calculate the percentage change in the quantity of imports (a fall is negative), to one decimal place.", wrong: [5, -10, -15], explanation: "−0.5 × 10 = −5.0%." }),
        P.num({ label: "(c)", marks: 3, kind: "plain", value: X1 - M1, unit: "US$ million", dp: 1, stem: "Calculate the new trade balance, in US\\$ million to one decimal place.", wrong: [0, 67.5 + 100, -67.5], explanation: "Exports = 1,500 × 1.09 = 1,635. Imports = 1,500 × 1.10 × 0.95 = 1,567.5. Balance = +US\\$67.5 million." }),
        P.manual({ label: "(d)", marks: 3, stem: "Use the Marshall-Lerner condition to explain why the trade balance improved.",
          points: ["The sum of the elasticities is 0.9 + 0.5 = 1.4.", "This is greater than 1, so the Marshall-Lerner condition is met.", "The fall in the quantity of imports and rise in exports outweigh the price effect on the import bill."],
          modelAnswer: "The sum of the absolute values of the elasticities is 0.9 + 0.5 = 1.4, which is greater than 1, so the Marshall-Lerner condition is met. The rise in the quantity of exports and the fall in the quantity of imports outweigh the higher price of imports, so the trade balance improves." }),
      ],
      explanation: "Exports +9.0%; imports −5.0%; balance +US\\$67.5 million; elasticities sum to 1.4 > 1." });
  }
  {
    const M0 = 1200, M1 = M0 * 1.15 * 0.94; chk(roundTo(M1, 6), 1297.2);
    const qm = -0.4 * 15; chk(qm, -6);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["%ΔQ = PED × %ΔP.", "In (d) think about AD, SRAS, inflation and spare capacity."],
      stem: "**A weaker currency in Kavala (fictional, illustrative)**\n\nKavala's currency depreciates by 15%. The country imports US\\$1,200 million of fuel, machinery and components each year, much of it used by manufacturers. The home-currency price of imports rises by 15% and the price elasticity of demand for imports is −0.4. Kavala's exports of vegetables and clothing become cheaper abroad. There is high unemployment and a lot of spare capacity.",
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: qm, unit: "%", stem: "Calculate the percentage change in the quantity of imports demanded (a fall is negative), to one decimal place.", wrong: [6, -15, -37.5], explanation: "−0.4 × 15 = −6.0%." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: M1, unit: "US$ million", dp: 1, stem: "Calculate the new value of import spending, in US\\$ million to one decimal place.", wrong: [1128, 1380, 1200], explanation: "1,200 × 1.15 × 0.94 = US\\$1,297.2 million, so import spending rises by US\\$97.2 million." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the depreciation may shift both aggregate demand and short-run aggregate supply.",
          points: ["Cheaper exports and dearer imports raise net exports, shifting AD to the right.", "Imported fuel and components cost more, raising firms' costs.", "SRAS shifts to the left."],
          modelAnswer: "Cheaper exports and dearer imports raise net exports, so aggregate demand shifts to the right. At the same time imported fuel and components cost more, which raises firms' costs and shifts short-run aggregate supply to the left." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether the depreciation is likely to benefit the Kavalan economy.",
          points: ["Cheaper exports raise sales, output and employment in export industries; spare capacity allows output to rise.", "Import spending rises, since demand for imports is inelastic (PED −0.4).", "Higher costs for manufacturers reduce the gain and may cause cost-push inflation.", "The net effect depends on the elasticity of export demand; it takes time (J-curve).", "Possible retaliation, and the burden of foreign debts.", "Judgement."],
          modelAnswer: "The depreciation makes vegetables and clothing cheaper abroad, which should raise export sales, output and employment, and with high unemployment and spare capacity output can rise without much inflation. However, demand for imports is inelastic, so import spending rises by US\\$97.2 million, and manufacturers face higher costs for fuel and components, which shifts SRAS left and may cause cost-push inflation. The trade balance may worsen at first because quantities adjust slowly, and whether it improves overall depends on how elastic export demand is. Overall the depreciation is likely to benefit Kavala through higher exports and employment given spare capacity, but the gain will be reduced by higher import costs." }),
      ],
      explanation: "Import quantity −6.0%; import spending US\\$1,297.2 million; AD right and SRAS left; assess export gains against import costs." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider elasticities, spare capacity, imported inflation and time."],
    stem: "Assess whether a depreciation of the currency is an effective way to improve a country's trade balance.",
    points: ["Exports become cheaper abroad and imports dearer, so net exports rise if demands are elastic.", "Marshall-Lerner: the sum of elasticities must exceed 1.", "In the short run elasticities are low and the balance may worsen first (J-curve).", "Spare capacity is needed for output to rise.", "Imported inflation and dearer inputs offset the gain.", "Gains may be eroded by inflation unless productivity improves.", "Retaliation, higher foreign debt burden.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A depreciation lowers the price of exports abroad and raises the price of imports, so net exports rise if demands are elastic enough: the sum of the elasticities must exceed 1 (the Marshall-Lerner condition). In the short run, though, elasticities are low and the balance may worsen first (the J-curve). Output will rise only if there is spare capacity, and dearer imported inputs raise costs and prices, which can erode the competitive gain unless productivity improves. Retaliation and a heavier burden of foreign debt are further costs. Overall a depreciation can improve the trade balance in the longer run when demands are elastic and there is spare capacity, but it is not effective alone.",
    explanation: "Weigh relative price changes against low elasticities, time lags, imported inflation and capacity." });

  b.card("DEFINITION", "State the **Marshall-Lerner condition**.", "A depreciation improves the trade balance if |PEDx| + |PEDm| > 1.", "Cambridge A Level extension.", { applies: CAM });
  b.card("DEFINITION", "Define the **J-curve effect**.", "The trade balance worsens at first after a depreciation and improves later as quantities adjust.", "Cambridge A Level extension.", { applies: CAM });
  b.card("CONCEPT", "Effect of a depreciation on AD?", "Net exports rise, so AD shifts right.");
  b.card("CONCEPT", "Effect of a depreciation on SRAS?", "Imported inputs are dearer, so SRAS shifts left.");
  b.card("CONCEPT", "Effect of a depreciation on the price level?", "It tends to rise: imported inflation and extra demand.");
  b.card("CONCEPT", "Effect of an appreciation on exporters?", "Exports become dearer abroad, so sales and competitiveness fall.");
  b.card("CONCEPT", "Why can a depreciation fail to improve the trade balance?", "Low elasticities (Marshall-Lerner not met), time lags, imported inflation and retaliation.");
  b.card("FORMULA", "Change in quantity from a price change?", "%ΔQ = PED × %ΔP.");
  b.card("CONCEPT", "Why is exchange rate policy not a substitute for supply-side policy?", "Any competitive gain is eroded by inflation unless productivity improves.");
});
