// W4b: fixed, managed and floating exchange rate systems (Cambridge A Level; ZIMSEC Form 6).
import { concept, P, chk, table, fmt, pctChange, tradeWeightedIndex, realExchangeIndex, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.exchange-rate-systems", { file: "trade/exchange-rate-systems", keyPrefix: "trade.exchange-rate-systems" }, (b) => {
  mc(b, [2, "RECALL"], "Under a fixed exchange rate system the central bank maintains the rate mainly by",
    ["using its reserves and adjusting interest rates", "Correct: it intervenes in the market."],
    [["leaving the rate to be determined by demand and supply", "That is a floating rate."],
     ["banning all imports and exports", "That is not how a peg is held."],
     ["setting the rate each day by the government's budget", "The budget does not set a peg."]],
    "A peg is defended by intervention and interest rate changes.");

  mc(b, [2, "UNDERSTANDING"], "A deliberate fall in the official value of a currency under a fixed system is called a",
    ["devaluation", "Correct: an official, deliberate fall."],
    [["depreciation", "That is a market-determined fall under a float."],
     ["revaluation", "That is a deliberate rise."],
     ["appreciation", "That is a market-determined rise."]],
    "Devaluation and revaluation are official changes; depreciation and appreciation are market movements.", { daily: true });

  mc(b, [3, "APPLICATION"], "A currency is pegged above its equilibrium value. To maintain the peg the central bank must",
    ["buy its own currency using foreign exchange reserves", "Correct: it must absorb the excess supply."],
    [["sell its own currency for foreign currency", "That would lower the rate further."],
     ["lower the interest rate to attract capital", "A lower rate reduces demand for the currency."],
     ["allow the price of the currency to rise", "That would break the peg."]],
    "At an overvalued peg supply exceeds demand, so the central bank buys the excess using reserves.", { hints: ["Is there excess demand or excess supply of the currency at the peg?"] });

  mc(b, [2, "UNDERSTANDING"], "Which is an advantage of a fixed exchange rate?",
    ["It gives certainty to traders and investors", "Correct: the rate is stable."],
    [["It requires no foreign exchange reserves", "Reserves are needed to defend it."],
     ["It leaves interest rates free for domestic aims", "Interest rates may have to defend the peg."],
     ["It automatically corrects a current account deficit", "That describes a float."]],
    "A peg reduces exchange rate risk.", { daily: true });

  mc(b, [3, "ANALYSIS"], "A country with a currency peg raises its interest rate to defend the rate. The most likely cost is",
    ["slower growth and higher unemployment at home", "Correct: higher rates reduce spending and investment."],
    [["a rise in the demand for imports", "Higher rates reduce spending."],
     ["a fall in the supply of the currency from importers", "That is not the main cost."],
     ["a fall in the exchange rate", "Higher rates support the currency."]],
    "Defending the rate may require domestic policy to be tightened.", { hints: ["What does a high interest rate do to spending and investment?"] });

  mc(b, [3, "ANALYSIS"], "A country's nominal exchange rate is unchanged but its inflation is higher than that of its trading partners. Its real exchange rate",
    ["appreciates, reducing competitiveness", "Correct: its prices rise relative to those abroad."],
    [["depreciates, improving competitiveness", "Higher relative prices mean the opposite."],
     ["is unchanged, because nominal rates are unchanged", "The real rate includes prices."],
     ["falls, because exports become cheaper", "Exports become dearer."]],
    "Real exchange rate = nominal rate adjusted for relative prices.", { hints: ["Compare home and foreign price levels."] });

  mc(b, [4, "EVALUATION"], "A country abandons its own currency and adopts the US dollar. Which is the most likely disadvantage?",
    ["It can no longer use its own interest rate and exchange rate to respond to shocks", "Correct: it loses its monetary independence."],
    [["Inflation is likely to rise because the central bank can print more money whenever it wants", "It cannot print dollars."],
     ["Exchange rate risk against the dollar increases", "That risk disappears."],
     ["Export prices will always fall", "Prices depend on other factors."]],
    "Using a foreign currency gives credibility but removes monetary policy tools.", { hints: ["What can the central bank no longer do?"] });

  mc(b, [2, "UNDERSTANDING"], "A managed floating exchange rate system is one in which",
    ["the market sets the rate but the central bank sometimes intervenes", "Correct: it combines market determination with intervention."],
    [["the rate is fixed permanently by law and never changes", "That is a fixed rate."],
     ["the government has no influence on the exchange rate", "That is a free float."],
     ["the country uses a foreign currency as its own money", "That is dollarisation."]],
    "A managed float allows occasional intervention.");

  {
    const exc = 1000 - 500, res = exc * 0.36; chk(res, 180);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: res, unit: "US$ million", dp: 0, tol: 0.5, daily: true, hints: ["Excess supply × the pegged price of each unit of currency."],
      stem: "A currency is pegged at 36 US cents per unit. At that price demand is 500 million units and supply is 1,000 million units a period. Calculate the cost to the central bank, in US\\$ million, of buying the excess supply with its reserves.",
      wrong: [500, 360, 270], explanation: "Excess supply = 1,000 − 500 = 500 million units; cost = 500 × US\\$0.36 = US\\$180 million." });
    const items = [{ weight: 40, index: 120 }, { weight: 35, index: 90 }, { weight: 25, index: 100 }];
    const twi = tradeWeightedIndex(items); chk(twi, 104.5);
    b.calc({ d: 3, skill: "APPLICATION", kind: "index", value: twi, hints: ["Sum of weight × index, divided by the sum of weights."],
      stem: "A country trades 40% with partner A, 35% with partner B and 25% with partner C. Its currency indices (base year = 100) against the three are 120, 90 and 100. Calculate the trade-weighted exchange rate index, to one decimal place.",
      wrong: [103.3, 310, 100], explanation: "1. 40% × 120 = 48.0.\n2. 35% × 90 = 31.5.\n3. 25% × 100 = 25.0.\n4. Total = 104.5." });
    const real = realExchangeIndex({ nominal: 98, homePrices: 130, foreignPrices: 104 }); chk(real, 122.5);
    b.calc({ d: 4, skill: "APPLICATION", kind: "index", value: real, calculator: true, hints: ["Real index = nominal index × home prices ÷ foreign prices."],
      stem: "A country's nominal exchange rate index is 98 (base year = 100). Its price index is 130 and that of its trading partners is 104 (base year = 100). Calculate the real exchange rate index, to one decimal place.",
      wrong: [78.4, 98, 122.4],
      explanation: "1. Relative prices = 130 ÷ 104 = 1.25.\n2. Real index = 98 × 1.25 = 122.5.\n3. The currency has appreciated in real terms, reducing competitiveness." });
    const dv = pctChange(1 / 8, 1 / 10); chk(roundTo(dv, 6), -20);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: roundTo(dv, 6), unit: "%", hints: ["Convert each rate into the value of one unit of the home currency."],
      stem: "A currency is devalued from US\\$1 = M8 to US\\$1 = M10. Calculate the percentage change in the value of M in US dollars (a fall is negative), to one decimal place.",
      wrong: [25, -25, 20], explanation: "M1 = US\\$0.125 then US\\$0.10: (0.10 − 0.125) ÷ 0.125 × 100 = −20.0%. (The number of M per dollar rose by 25%, which is not the same.)" });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "A country that pegs its currency does not need foreign exchange reserves.",
    explanation: "Reserves are needed to buy and sell currency to defend the peg." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each exchange rate system with its description.",
    pairs: [["Fixed (pegged) rate", "The central bank commits to a set value against another currency"], ["Free float", "The rate is set entirely by demand and supply"], ["Managed float", "The market sets the rate but the central bank intervenes at times"], ["Dollarisation", "A foreign currency replaces the national currency"]],
    explanation: "The systems differ in who determines the rate." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A central bank defending an overvalued peg must {{blank:a}} its own currency and so its reserves {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["buy"], choices: ["buy", "sell"] }, { id: "b", accepted: ["fall"], choices: ["fall", "rise"] }],
    explanation: "It buys the excess supply with reserves, so the reserves fall." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of exchange rate system in which the market sets the rate but the central bank sometimes intervenes.",
    accepted: ["managed float", "managed floating", "managed floating exchange rate", "managed float system", "dirty float"], wrong: ["fixed"],
    explanation: "A managed (or dirty) float combines market determination with intervention." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Distinguish between a devaluation and a depreciation.",
    points: ["A devaluation is a deliberate official reduction in the value of a currency under a fixed or managed system", "A depreciation is a fall in the value of a currency caused by market forces under a floating system"],
    modelAnswer: "A devaluation is a deliberate, official reduction in the value of a currency under a fixed or managed system. A depreciation is a fall in the value of a currency caused by market forces under a floating system.",
    explanation: "Official action against market movement." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about reserves and interest rates."],
    stem: "Explain two problems a government faces in maintaining a fixed exchange rate.",
    points: ["It needs large reserves to buy its currency when there is excess supply.", "Reserves are finite and may run out, forcing a devaluation.", "Interest rates may have to be raised to defend the rate.", "This reduces spending, growth and employment at home."],
    modelAnswer: "A government needs large reserves to buy its own currency when there is excess supply at the fixed rate, but reserves are finite and may run out, forcing a devaluation. It may also have to raise interest rates to defend the rate, which reduces spending, growth and employment at home.",
    explanation: "Reserves and interest rates." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Consider both the gains and the losses."],
    stem: "Analyse the likely effects on a country's economy of using a foreign currency in place of its own.",
    points: ["The central bank cannot print money, which can end high inflation and builds credibility.", "There is no exchange rate risk against the currency used, which helps trade and investment.", "The country loses its own monetary policy (interest rates).", "It cannot use the exchange rate to restore competitiveness or the central bank as lender of last resort.", "It depends on inflows of the foreign currency from exports and remittances, and may face a shortage of liquidity."],
    modelAnswer: "Using a foreign currency means that the central bank cannot print money, which can end high inflation and builds credibility, and there is no exchange rate risk against that currency, which helps trade and investment. However, the country loses its own monetary policy and cannot use the exchange rate to restore competitiveness, and the central bank cannot act as lender of last resort. The country also depends on inflows of the foreign currency from exports and remittances, and may face a shortage of liquidity if they fall.",
    explanation: "Credibility and stability against loss of tools and liquidity risk." });

  {
    const items = [{ weight: 45, index: 104 }, { weight: 35, index: 112 }, { weight: 20, index: 90 }];
    const twi = tradeWeightedIndex(items); chk(twi, 104);
    const real = realExchangeIndex({ nominal: twi, homePrices: 118, foreignPrices: 107 }); chk(roundTo(real, 1), 114.7);
    const t1 = table(["Trading partner", "Share of trade (%)", "Currency index (base year = 100)"], [["Partner A", 45, 104], ["Partner B", 35, 112], ["Partner C", 20, 90]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Trade-weighted index = sum of weight × index ÷ 100.", "Real index = nominal index × home prices ÷ foreign prices."],
      stem: "**Competitiveness in Tamba (fictional, illustrative)**\n\nTamba's trade is mainly with three partners. Table 1 shows the indices of Tamba's currency against each partner (base year = 100) and the share of Tamba's trade with each.\n\n" + t1 + "\n\nTamba's price index is 118 and the average price index of its partners is 107 (base year = 100).",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "index", value: twi, stem: "Calculate the trade-weighted exchange rate index, to one decimal place.", wrong: [102.0, 306, 110], explanation: "0.45 × 104 + 0.35 × 112 + 0.20 × 90 = 46.8 + 39.2 + 18.0 = 104.0." }),
        P.num({ label: "(b)", marks: 2, kind: "index", value: real, stem: "Using your answer to (a) as the nominal index, calculate the real exchange rate index, to one decimal place.", wrong: [104.0, 94.3, 114.0], explanation: "104.0 × (118 ÷ 107) = 114.7." }),
        P.fib({ label: "(c)", marks: 1, stem: "Complete the sentence.", template: "The rise in the real index means that Tamba's competitiveness has {{blank:a}}.", blanks: [{ id: "a", accepted: ["fallen"], choices: ["fallen", "improved"] }], explanation: "A real appreciation makes exports dearer and imports cheaper." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain how the change in the real exchange rate might affect Tamba's exporters.",
          points: ["The real appreciation makes Tamba's goods dearer relative to those of its partners.", "Foreign demand for Tamba's exports falls (more if elastic).", "Export revenue and output fall, so jobs may be lost."],
          modelAnswer: "The real appreciation makes Tamba's goods dearer relative to those of its partners, so foreign demand for its exports falls, particularly if demand is elastic. Export revenue and output fall, so jobs may be lost." }),
      ],
      explanation: "Trade-weighted index 104.0; real index 114.7; competitiveness has fallen; exporters lose sales." });
  }
  {
    const t = table(["Price of 1 unit of currency (US cents)", "Demand (millions)", "Supply (millions)"], [[28, 700, 700], [32, 600, 850], [36, 500, 1000]]);
    const exc = 1000 - 500, res = exc * 0.36; chk(res, 180);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Excess supply = supply − demand at the peg.", "Cost = excess supply × the pegged price.", "In (d) weigh a devaluation against continuing to defend the peg."],
      stem: "**A currency peg in Kavala (fictional, illustrative)**\n\nKavala pegs its currency at 36 US cents per unit, above the floating equilibrium of 28 cents. The market schedule is shown below. The central bank holds foreign exchange reserves of US\\$150 million. Exporters complain that the peg makes their goods too dear abroad, and importers benefit from cheap foreign goods. The government is considering a devaluation.\n\n" + t,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: exc, unit: "units", dp: 0, tol: 0.5, stem: "Calculate the excess supply of the currency at the peg, in millions of units.", wrong: [500 + 1000, 1000, 300], explanation: "1,000 − 500 = 500 million units." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: res, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the amount of foreign exchange the central bank needs to buy the excess supply, in US\\$ million.", wrong: [500, 150, 140], explanation: "500 million units × US\\$0.36 = US\\$180 million, more than the US\\$150 million of reserves." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain two actions, other than using reserves, that the central bank could take to support the peg.",
          points: ["Raise interest rates to attract foreign funds and raise demand for the currency.", "Reduce imports (tariffs, controls, or cutting government spending) to reduce the supply of the currency.", "Introduce capital controls to restrict the sale of the currency."].map((p, i) => [p, i === 0 ? 1 : i === 1 ? 1 : 1]),
          modelAnswer: "The central bank could raise interest rates to attract foreign funds, which raises demand for the currency. It could also reduce the supply of the currency by cutting imports, for example through tariffs or lower government spending, or restrict sales of the currency through capital controls." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess whether Kavala should devalue its currency or defend the peg.",
          points: ["The peg needs US\\$180 million for one period, more than the reserves of US\\$150 million, so it cannot be defended for long.", "A devaluation would make exports cheaper and imports dearer, helping exporters and the current account.", "It raises import prices and may cause inflation, and the effect depends on elasticities.", "Defending the peg by high interest rates would harm growth and jobs.", "The peg gives stability and certainty, but its credibility is already weak.", "Judgement: devaluation is likely to be better unless the reasons for the imbalance can be removed."],
          modelAnswer: "Buying the excess supply would cost US\\$180 million in one period, more than the US\\$150 million of reserves, so the peg cannot be defended for long. Defending it by raising interest rates would harm growth and employment. A devaluation would make exports cheaper and imports dearer, helping exporters and the current account, though it would raise import prices and might cause inflation, and its success depends on elasticities. The peg gives stability, but its credibility is already weak because reserves are inadequate. Overall a devaluation, possibly combined with measures to control inflation, is probably better than trying to defend the peg." }),
      ],
      explanation: "Excess supply 500 million units; cost US\\$180 million against reserves of US\\$150 million; other support measures; assess devaluation against defending the peg." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare stability with policy freedom."],
    stem: "Assess whether a developing country would be better served by a fixed or a floating exchange rate.",
    points: ["A fixed rate gives certainty for trade and investment and disciplines inflation.", "It needs large reserves and may require high interest rates to defend it.", "Overvaluation harms exporters and risks a speculative attack.", "A floating rate adjusts automatically and leaves monetary policy free.", "But it may be volatile and a depreciation raises import prices.", "Weak financial markets and a narrow export base increase volatility.", "Many countries choose a managed float.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A fixed rate gives certainty to traders and investors and imposes discipline on inflation, which can be valuable where past inflation has been high. However, the country needs large reserves and may have to raise interest rates to defend the rate, and if the rate is overvalued exporters suffer and speculators may attack the currency. A floating rate adjusts automatically to imbalances and leaves interest rates free for domestic aims, but a developing economy with thin financial markets and a narrow export base may find it volatile, and depreciation raises the price of imports. Many countries therefore choose a managed float, which gives some stability with flexibility. Overall the better system depends on the size of reserves, the credibility of the central bank and the country's vulnerability to shocks.",
    explanation: "Weigh certainty and discipline against reserves, rigidity and volatility." });

  b.card("DEFINITION", "Define a **fixed (pegged) exchange rate**.", "A rate the central bank commits to maintain against another currency or basket, using reserves and interest rates.");
  b.card("DEFINITION", "Define a **managed floating** exchange rate.", "A rate mainly set by the market with occasional central bank intervention.");
  b.card("DEFINITION", "Devaluation or depreciation: which is deliberate?", "Devaluation (official change under a fixed or managed system); depreciation is a market movement.");
  b.card("CONCEPT", "What must a central bank do to defend an overvalued peg?", "Buy its own currency with reserves (and/or raise interest rates).");
  b.card("FORMULA", "Trade-weighted exchange rate index?", "Sum of (trade share × currency index) ÷ sum of shares.");
  b.card("FORMULA", "Real exchange rate index?", "Nominal index × (home price index ÷ foreign price index).");
  b.card("CONCEPT", "Main advantage of a fixed rate?", "Certainty for traders and investors, and discipline on inflation.");
  b.card("CONCEPT", "Main disadvantage of a fixed rate?", "Needs large reserves and limits interest rate policy; risk of overvaluation and a speculative attack.");
  b.card("CONCEPT", "Main cost of using a foreign currency?", "Loss of monetary policy and the exchange rate as tools, and dependence on inflows of the foreign currency.");
});
