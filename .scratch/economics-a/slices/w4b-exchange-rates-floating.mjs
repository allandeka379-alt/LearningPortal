// W4b: exchange rates and the determination of a floating rate (both boards; ZIMSEC Form 6, Cambridge AS Level).
import { concept, P, chk, table, schedule, pctChange, roundTo } from "../lib.mjs";
import { mc, LV8, LV6 } from "../tables/w4b-kit.mjs";

concept("aecon.trade.exchange-rates-floating", { file: "trade/exchange-rates-floating", keyPrefix: "trade.exchange-rates-floating" }, (b) => {
  mc(b, [2, "RECALL"], "A floating exchange rate is determined by",
    ["market demand for and supply of the currency", "Correct: market forces set the price."],
    [["the central bank, which sets a fixed target each year", "That describes a fixed rate."],
     ["the government's tariff policy on imports", "Tariffs do not set the rate."],
     ["the level of the country's foreign reserves", "Reserves may be used to influence a managed rate."]],
    "In a pure float, the rate adjusts until demand equals supply.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which change would cause a country's currency to appreciate, other things equal?",
    ["A rise in interest rates relative to those abroad", "Correct: capital flows in, raising demand for the currency."],
    [["A rise in the country's rate of inflation relative to others", "Exports are dearer, so demand falls."],
     ["A rise in spending on imports", "More of the currency is supplied."],
     ["A loss of confidence by foreign investors", "Capital flows out and the currency falls."]],
    "Higher relative interest rates attract funds and raise demand for the currency.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "The demand curve for a country's currency slopes downward because",
    ["a higher price of the currency makes the country's goods dearer for foreigners", "Correct: foreigners buy less of its goods and so less of the currency."],
    [["a higher price of the currency makes imports dearer for residents who buy abroad", "A higher price makes imports cheaper."],
     ["residents want to hold more of the currency at a higher price", "That does not explain demand from foreigners."],
     ["the central bank sells more currency as its price rises", "That relates to supply."]],
    "At a higher price of the currency, foreigners' purchases of the country's goods and assets fall.");

  mc(b, [2, "APPLICATION"], "The exchange rate changes from US\\$1 = R18 to US\\$1 = R20. This means that the",
    ["rand has depreciated against the dollar", "Correct: more rand are needed to buy US\\$1."],
    [["rand has appreciated against the dollar", "The rand has become less valuable."],
     ["dollar has depreciated against the rand", "The dollar buys more rand."],
     ["both currencies have appreciated", "One rises as the other falls."]],
    "A dollar now buys more rand, so the dollar has appreciated and the rand has depreciated.", { daily: true });

  mc(b, [3, "ANALYSIS"], "An increase in the number of foreign tourists visiting a country, other things equal, will most likely",
    ["shift the demand for the currency to the right and cause an appreciation", "Correct: tourists must buy the currency."],
    [["shift the supply of the currency to the right and cause a depreciation", "Tourists do not supply the currency."],
     ["shift the demand for the currency to the left and cause a depreciation", "Demand rises."],
     ["not affect the exchange rate because tourism is a service", "Services trade creates demand for currency."]],
    "Tourist spending increases the demand for the currency.", { hints: ["Who must buy the local currency?"] });

  mc(b, [3, "ANALYSIS"], "The currency of a country depreciates under a floating system. Which is the most likely effect on prices at home?",
    ["Import prices rise, adding to cost-push inflation", "Correct: imports cost more in the home currency."],
    [["Import prices fall, reducing inflation and the cost of living in the home economy", "A depreciation makes imports dearer."],
     ["Export prices rise for foreign buyers", "Export prices fall for foreign buyers."],
     ["There is no effect on prices", "Prices of imports and imported inputs rise."]],
    "A weaker currency raises the home-currency price of imports.", { hints: ["How many units of the home currency does a unit of foreign currency now cost?"] });

  mc(b, [4, "ANALYSIS"], "Speculators expect a country's currency to fall in value and sell it. The likely effect is",
    ["a depreciation, which may confirm their expectations", "Correct: increased supply lowers the price."],
    [["an appreciation, because selling attracts buyers", "More selling lowers the price."],
     ["no change, because speculation affects only shares", "Speculation affects currencies."],
     ["a fall in imported inflation", "A depreciation raises import prices."]],
    "Speculation can be self-fulfilling.", { hints: ["What happens to the supply of the currency?"] });

  {
    const pctRand = pctChange(1 / 20, 1 / 16);
    mc(b, [4, "APPLICATION"], "The exchange rate moves from US\\$1 = R20 to US\\$1 = R16. The rand's value in dollars has",
      ["risen by 25%", "Correct: R1 rises from US\\$0.05 to US\\$0.0625."],
      [["risen by 20%", "That is the fall in the number of rand per dollar, which measures the dollar's depreciation."],
       ["fallen by 25%", "The rand has strengthened."],
       ["fallen by 20%", "The rand has strengthened."]],
      "R1 = US\\$0.05 and then US\\$0.0625: rise of 25%. The dollar has depreciated by 20%.", { hints: ["Convert both rates into dollars per rand."] });
    chk(roundTo(pctRand, 6), 25);
  }

  {
    const c1 = 320 * 16; chk(c1, 5120);
    b.num({ d: 2, skill: "APPLICATION", kind: "plain", value: c1, unit: "units", dp: 0, tol: 0.5, daily: true,
      stem: "The exchange rate is US\\$1 = R16. Calculate how many rand US\\$320 buys.",
      wrong: [20, 5000, 160], explanation: "320 × 16 = R5,120." });
    const c2 = 3060 / 17; chk(c2, 180);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: c2,
      stem: "The exchange rate is US\\$1 = R17. Calculate the value in US dollars of R3,060.",
      wrong: [52020, 17, 3043], explanation: "3,060 ÷ 17 = US\\$180." });
    const dep = pctChange(20, 16); chk(roundTo(dep, 6), -20);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: roundTo(dep, 6), unit: "%", hints: ["Percentage change = change ÷ original × 100; a fall is negative."],
      stem: "The exchange rate moves from US\\$1 = R20 to US\\$1 = R16. Calculate the percentage change in the value of the US dollar in terms of rand (a fall is negative), to one decimal place.",
      wrong: [20, -25, 25], explanation: "(16 − 20) ÷ 20 × 100 = −20.0%: the dollar depreciated by 20%." });
    const ap = pctChange(1 / 20, 1 / 16); chk(roundTo(ap, 6), 25);
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: roundTo(ap, 6), unit: "%", calculator: true, hints: ["Find the dollar value of R1 before and after."],
      stem: "The exchange rate moves from US\\$1 = R20 to US\\$1 = R16. Calculate the percentage change in the value of the rand in terms of US dollars, to one decimal place.",
      wrong: [20, -20, 4], explanation: "1. Before: R1 = 1 ÷ 20 = US\\$0.0500.\n2. After: R1 = 1 ÷ 16 = US\\$0.0625.\n3. Change = (0.0625 − 0.0500) ÷ 0.0500 × 100 = +25.0%: the rand appreciated by 25%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false, stem: "If a currency depreciates under a floating rate, the country's exports become dearer for foreign buyers.",
    explanation: "A depreciation makes exports cheaper in foreign currency." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each event with its likely effect on a country's floating exchange rate.",
    pairs: [["Interest rates rise relative to other countries", "Appreciation"], ["Inflation rises faster than in competitor countries", "Depreciation"], ["Foreign firms invest heavily in new mines", "Appreciation"], ["Households spend more on imported goods", "Depreciation"]],
    explanation: "Capital inflows and export demand raise demand for the currency; rising imports and relative inflation lower its value." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A rise in the value of a currency under a floating system is an {{blank:a}}. In a fixed system a deliberate fall in value is called a {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["appreciation"], choices: ["appreciation", "depreciation", "devaluation"] }, { id: "b", accepted: ["devaluation"], choices: ["devaluation", "revaluation", "depreciation"] }],
    explanation: "Floating: appreciation or depreciation; fixed: revaluation or devaluation." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes a fall in the value of a currency under a floating exchange rate system?",
    accepted: ["depreciation", "a depreciation"], wrong: ["devaluation"],
    explanation: "A fall under a floating system is a depreciation; devaluation is a deliberate fall under a fixed or managed system." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define an exchange rate.",
    points: ["The price of one currency", "expressed in terms of another currency"],
    modelAnswer: "An exchange rate is the price of one currency expressed in terms of another currency.",
    explanation: "Price of one currency in another." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Consider capital flows and the return on assets."],
    stem: "Explain how a rise in a country's interest rate relative to other countries may affect its exchange rate.",
    points: ["A higher interest rate gives a higher return on deposits and bonds in that country.", "Foreign investors buy the currency to invest there, raising demand for the currency.", "The demand curve for the currency shifts to the right.", "So the exchange rate appreciates."],
    modelAnswer: "A higher interest rate gives a higher return on deposits and bonds held in the country, so foreign investors buy its currency to invest there. The demand curve for the currency shifts to the right, which raises its price: the exchange rate appreciates.",
    explanation: "Higher return, more demand, shift, appreciation." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Trace both exporters' prices and importers' prices."],
    stem: "Analyse the likely effects of a depreciation of the currency on a country's exporters and consumers.",
    points: ["Export prices fall in foreign currency.", "So the quantity of exports demanded rises and exporters' sales increase.", "Import prices rise in the home currency.", "Consumers pay more for imported goods and firms for imported inputs.", "Cost-push inflation and a fall in living standards may follow."],
    modelAnswer: "A depreciation makes exports cheaper in foreign currency, so foreign demand and exporters' sales rise. Imports become dearer in the home currency, so consumers pay more for imported goods and firms pay more for imported inputs, which can cause cost-push inflation and reduce living standards.",
    explanation: "Exporters gain; import prices rise; inflation." });

  {
    const prices = [20, 24, 28, 32, 36], qd = [900, 800, 700, 600, 500], qs = [400, 550, 700, 850, 1000], qs2 = qs.map((v) => v + 250);
    const s1 = schedule({ prices, qd, qs, requireEquilibrium: true, priceHeader: "Price of 1 zandi (US cents)", qdHeader: "Demand for zandi (millions)", qsHeader: "Supply before (millions)", extra: [{ header: "Supply after (millions)", values: qs2 }] });
    const s2 = schedule({ prices, qd, qs: qs2, requireEquilibrium: true });
    chk(s1.equilibrium.price, 28); chk(s2.equilibrium.price, 24); chk(s2.equilibrium.quantity, 800);
    const dep = pctChange(28, 24);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Find the price where demand equals supply, before and after the shift."],
      stem: "**The currency market for the zandi (fictional, illustrative)**\n\nThe zandi is the currency of Zandia, which floats. The table shows demand for and supply of zandis. A boom in Zandia's imports of machinery shifts the supply of zandis to the right (the last column).\n\n" + s1.md,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: s1.equilibrium.price, unit: "units", dp: 0, tol: 0.5, stem: "State the equilibrium price of the zandi before the change, in US cents.", wrong: [24, 700, 32], explanation: "Demand equals supply (700) at 28 US cents." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: s2.equilibrium.price, unit: "units", dp: 0, tol: 0.5, stem: "State the new equilibrium price of the zandi after the change, in US cents.", wrong: [28, 800, 20], explanation: "Demand equals the new supply (800) at 24 US cents." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: roundTo(dep, 6), unit: "%", stem: "Calculate the percentage change in the value of the zandi (a fall is negative), to one decimal place.", wrong: [14.3, -16.7, -4], explanation: "(24 − 28) ÷ 28 × 100 = −14.3%: a depreciation." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain how the boom in imports of machinery caused the change in the exchange rate.",
          points: ["Importers sell zandis to buy foreign currency to pay for machinery.", "The supply of zandis increases, shifting the supply curve to the right.", "At the old price supply exceeds demand (950 against 700).", "The price of the zandi falls until demand equals supply at 24 cents."],
          modelAnswer: "Importers sell zandis to buy the foreign currency they need to pay for the machinery, so the supply of zandis increases and the supply curve shifts to the right. At the old price of 28 cents supply (950) exceeds demand (700), so the price of the zandi falls until demand equals the new supply at 24 cents." }),
      ],
      explanation: "Equilibrium 28 cents, then 24 cents; depreciation of 14.3%; more supply of zandis from higher imports." });
  }
  {
    const lodgeBefore = 3000 / 20, lodgeAfter = 3000 / 25; chk(lodgeBefore, 150); chk(lodgeAfter, 120);
    const val = pctChange(1 / 20, 1 / 25); chk(roundTo(val, 6), -20);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Dollar price = price in Mbiran currency ÷ rate.", "In (d) consider exporters, importers, inflation and competitiveness."],
      stem: "**Exchange rate changes in Mbira (fictional, illustrative)**\n\nMbira floats its currency (MC). In year 1 the rate was US\\$1 = MC20. In year 2 it was US\\$1 = MC25 after foreign investors sold Mbiran bonds when interest rates abroad rose. Mbira exports tobacco and lodge holidays priced in its own currency, and imports machinery and fuel priced in US dollars.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: lodgeAfter, stem: "A lodge holiday costs MC3,000. Calculate its price in US dollars in year 2.", wrong: [150, 75000, 125], explanation: "3,000 ÷ 25 = US\\$120 (it was US\\$150 in year 1)." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: roundTo(val, 6), unit: "%", stem: "Calculate the percentage change in the value of the Mbiran currency in US dollars between year 1 and year 2 (a fall is negative), to one decimal place.", wrong: [25, -25, 20], explanation: "MC1 = US\\$0.0500 then US\\$0.0400: (0.04 − 0.05) ÷ 0.05 × 100 = −20.0%." }),
        P.mcq({ label: "(c)", marks: 2, stem: "Which statement describes the likely effect of the change on Mbira's trade?", options: [["Exports are cheaper for foreign buyers and imports are dearer for Mbirans", "Correct: a depreciation changes relative prices."], ["Exports are dearer for foreign buyers and imports are cheaper for Mbirans", "That describes an appreciation."], ["Export and import prices are unaffected", "Prices in foreign currency change."], ["Imports are cheaper in MC while exports are dearer in US dollars", "The reverse is true."]], answer: "A", explanation: "The lodge costs fewer dollars and the dollar-priced machinery costs more MC." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 250 }, levels: LV6,
          stem: "Assess the likely effects of the depreciation on the Mbiran economy.",
          points: ["Lodges and tobacco cost foreign buyers less, so export sales and tourism rise, creating jobs.", "Imports of machinery and fuel cost more MC, raising costs and inflation.", "Firms that use imported inputs face higher costs, offsetting some of the gain.", "Effect on the trade balance depends on elasticities and time lags.", "Foreign debts priced in dollars become dearer to repay in MC.", "Judgement: gains to exporters, costs to importers and consumers; net effect depends on elasticities."],
          modelAnswer: "The depreciation makes lodge holidays and tobacco cheaper for foreign buyers, so tourism and export sales may rise and create jobs. However, machinery and fuel priced in dollars cost more Mbiran currency, which raises costs and prices at home, and firms using imported inputs lose part of the gain. Whether the trade balance improves depends on how elastic the demands are and on time lags, and debts priced in dollars become dearer to repay. Overall exporters gain but importers and consumers lose, and the net effect is positive only if foreign demand for exports is sufficiently responsive." }),
      ],
      explanation: "Lodge US\\$120 in year 2; MC down 20.0%; exports cheaper, imports dearer; assess gains and costs." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider flexibility, volatility and effects on inflation."],
    stem: "Assess the advantages and disadvantages of a floating exchange rate for a small open economy.",
    points: ["The rate adjusts automatically to a deficit or surplus.", "Little need for large reserves and the central bank can pursue domestic aims with interest rates.", "Cushions the economy against external shocks such as a fall in export prices.", "Volatility creates uncertainty for traders and investors.", "Depreciation raises import prices and inflation.", "Speculation can push the rate away from fundamentals.", "Weak if demand is inelastic: automatic adjustment may be slow.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A floating rate adjusts automatically: a current account deficit weakens the currency and makes exports cheaper, so the central bank needs few reserves and can use interest rates for domestic aims. The exchange rate also cushions the economy against shocks such as a fall in export prices. However, the rate can be volatile, creating uncertainty for exporters, importers and investors, and speculation may move it away from the level justified by trade. A depreciation raises the price of imports and may cause inflation, particularly in a small economy that imports fuel and food, and if the demands for exports and imports are inelastic the automatic adjustment may be slow. Overall a float gives flexibility but with costs from volatility and imported inflation.",
    explanation: "Weigh automatic adjustment and flexibility against volatility, speculation and inflation." });

  b.card("DEFINITION", "Define an **exchange rate**.", "The price of one currency expressed in terms of another.");
  b.card("DEFINITION", "Define a **floating exchange rate**.", "A rate determined by the demand for and supply of the currency in the foreign exchange market.");
  b.card("DEFINITION", "What is an **appreciation**?", "A rise in the value of a currency relative to another under a floating system.");
  b.card("CONCEPT", "Why does a higher interest rate usually raise a currency?", "It attracts foreign funds, increasing the demand for the currency.");
  b.card("CONCEPT", "Why does higher inflation tend to lower a currency?", "Exports become dearer and imports cheaper, so demand falls and supply rises.");
  b.card("CONCEPT", "Who supplies a country's currency to the foreign exchange market?", "Residents buying imports, investing abroad or travelling abroad.");
  b.card("FACT", "If US\\$1 = R18 changes to US\\$1 = R16.20, which currency has appreciated?", "The rand (the dollar buys fewer rand).");
  b.card("CONCEPT", "Two effects of a depreciation?", "Cheaper exports for foreign buyers and dearer imports at home (possible cost-push inflation).");
  b.card("CONCEPT", "Why is a floating rate not always stable?", "Speculation, capital flows and shocks can make it volatile.");
});
