// W1b: exchange rates — appreciation, depreciation, effects on importers and exporters; conversions (Commerce only).
import { concept, P, COM, money, f, round, check } from "../lib.mjs";

// Conversions (all rates assumed, never real).
const randRate = 17.5;
const mcqRand = 2100;
const mcqUsd = f.toUsd(mcqRand, randRate); // 120
const pulaRate = 13.6;
const usdToPula = 350;
const pula = f.toForeign(usdToPula, pulaRate); // 4760
const randIn = 5950;
const usdOut = f.toUsd(randIn, randRate); // 340
const item = 25;
const rA = 17;
const rB = 19.5;
const priceA = f.toForeign(item, rA); // 425
const priceB = f.toForeign(item, rB); // 487.5
const rise = round(priceB - priceA, 2); // 62.5
check("rand rise", rise, 62.5);
// Struct: cross-border trader
const trRate = 18.2;
const stockRand = 14560;
const stockUsd = f.toUsd(stockRand, trRate); // 800
const newRate = 20.8;
const stockUsdNew = f.toUsd(stockRand, newRate); // 700
check("trader", stockUsd - stockUsdNew, 100);

concept("bus.economy.exchange-rates", { file: "economy/exchange-rates", keyPrefix: "economy.exchange-rates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by the **appreciation** of a currency?",
    options: [
      ["A rise in its value against another currency", "Correct: after appreciation, one unit buys more of the other currency."],
      ["A fall in its value against another currency", "That is depreciation."],
      ["A rise in the prices of goods within a country", "That is inflation, not appreciation."],
      ["The printing of more notes by a central bank", "That increases the money supply; it is not the meaning of appreciation."],
    ],
    answer: "A",
    explanation: "**Appreciation**: a currency rises in value, so one unit buys more foreign currency. **Depreciation** is the opposite.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The exchange rate changes from US\\$1 = 17 rand to US\\$1 = 19 rand. What has happened?",
    options: [
      ["The US dollar has appreciated against the rand", "Correct: each dollar now buys more rand."],
      ["The US dollar has depreciated against the rand", "A depreciating dollar would buy fewer rand."],
      ["The rand has appreciated against the US dollar", "The rand buys fewer dollars now, so it has depreciated."],
      ["Both currencies have gained value", "When one currency rises against another, the other falls against it."],
    ],
    answer: "A",
    explanation: "One dollar buys 19 rand instead of 17, so the **dollar has appreciated** and the **rand has depreciated** against it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A country's currency appreciates. What is the likely effect on its exporters?",
    options: [
      ["Their goods become dearer for foreign buyers", "Correct: foreign buyers need more of their own currency to buy the same goods."],
      ["Their goods become cheaper for foreign buyers", "That happens when the currency depreciates."],
      ["Their imported raw materials become dearer", "Appreciation makes imports cheaper, not dearer."],
      ["Their foreign sales are certain to rise", "Dearer exports usually mean fewer foreign sales."],
    ],
    answer: "A",
    explanation: "Strong currency: imports cheap, exports dear. Exporters become less competitive abroad.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which business is most likely to **gain** when its home currency depreciates?",
    options: [
      ["A firm that exports most of its output", "Correct: its goods become cheaper for foreign buyers, so sales can rise."],
      ["A shop that sells only imported goods", "Imports become dearer, raising the shop's costs."],
      ["A factory that relies on imported raw materials", "Its input costs rise."],
      ["A firm repaying a loan in foreign currency", "It needs more home currency to repay the loan."],
    ],
    answer: "A",
    explanation: "Depreciation makes exports cheaper abroad (more competitive) and imports dearer at home.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A Zimbabwean shop imports fridges priced in rand. The US dollar appreciates against the rand. Which is the most likely result for the shop?",
    options: [
      ["Its costs in US dollars fall, so it can cut prices or raise its margin", "Correct: each dollar buys more rand, so the fridges cost fewer dollars."],
      ["Its costs in US dollars rise, so it must raise prices", "That would happen if the dollar depreciated."],
      ["Its costs are unchanged because the fridges are priced in rand", "The rand price is unchanged, but the dollar cost changes with the rate."],
      ["It can no longer legally import from South Africa", "Exchange-rate changes do not ban trade."],
    ],
    answer: "A",
    hints: ["After the change, how many rand does one dollar buy?"],
    explanation: "A stronger dollar buys more rand, so goods priced in rand cost fewer dollars: imports become cheaper.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: COM, calculator: true,
    stem: `Assume US\\$1 = ${randRate} rand. A trader buys goods priced at ${mcqRand.toLocaleString("en-GB")} rand. What is their cost in US dollars?`,
    options: [
      [money(mcqUsd), `Correct: ${mcqRand.toLocaleString("en-GB")} ÷ ${randRate} = ${mcqUsd}.`],
      [money(mcqRand * randRate), "This multiplies by the rate; to change rand into dollars, divide."],
      [money(mcqUsd * 10), "Check the division: the answer is ten times too large."],
      [money(mcqUsd / 10), "Check the division: the answer is ten times too small."],
    ],
    answer: "A",
    hints: ["Rand amounts are bigger numbers than dollar amounts at this rate, so divide."],
    explanation: `US\\$ amount = rand ÷ rate = ${mcqRand.toLocaleString("en-GB")} ÷ ${randRate} = ${money(mcqUsd)}.`,
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Why might an appreciation of its currency reduce an exporter's sales only a little?",
    options: [
      ["Foreign buyers value its quality and are not very sensitive to price", "Correct: if demand is price-inelastic, a higher foreign price cuts sales only slightly."],
      ["Appreciation makes its goods cheaper abroad", "Appreciation makes exports dearer abroad."],
      ["Exporters never sell to foreign buyers on price", "Price matters to many buyers; the point is how much."],
      ["Appreciation always lowers the exporter's imported input costs to zero", "Cheaper imported inputs may lower some costs, but never to zero."],
    ],
    answer: "A",
    hints: ["Think about how sensitive buyers are to price."],
    explanation: "The effect depends on price sensitivity. Brand loyalty, quality or lack of substitutes make demand less sensitive, so an appreciation hurts sales less.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "When a currency depreciates, imports into that country become more expensive.",
    answer: true,
    explanation: "True. The weaker currency buys less foreign currency, so imported goods cost more in home currency.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An appreciation of the home currency is good for every business in the country.",
    answer: false,
    explanation: "False. It helps importers (cheaper inputs) but harms exporters (dearer goods abroad) and firms competing with cheaper imports at home.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each change in the home currency with its likely effect.",
    pairs: [
      ["Home currency appreciates: exporters", "Goods dearer abroad, less competitive"],
      ["Home currency appreciates: importers", "Imports cheaper, costs fall"],
      ["Home currency depreciates: exporters", "Goods cheaper abroad, more competitive"],
      ["Home currency depreciates: importers", "Imports dearer, costs rise"],
    ],
    explanation: "Remember: a strong currency makes imports cheap and exports dear; a weak currency does the opposite.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "If one unit of a currency buys fewer units of another currency than before, the currency has {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["depreciated"], choices: ["depreciated", "appreciated", "inflated", "stabilised"] }],
    explanation: "Buying less foreign currency = a fall in value = **depreciation**.",
  });
  b.num({
    d: 2, skill: "APPLICATION", applies: COM, kind: "plain", value: pula, calculator: true,
    stem: `Assume US\\$1 = ${pulaRate} pula. How many pula will a cross-border trader receive for ${money(usdToPula)}?`,
    wrong: [round(usdToPula / pulaRate, 2)],
    explanation: `Foreign amount = US\\$ × rate = ${usdToPula} × ${pulaRate} = ${pula.toLocaleString("en-GB")} pula.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", applies: COM, kind: "money", value: usdOut, calculator: true,
    stem: `Assume US\\$1 = ${randRate} rand. Rudo sells crafts to a tourist for ${randIn.toLocaleString("en-GB")} rand. Calculate the value of the sale in US dollars.`,
    wrong: [randIn * randRate],
    hints: ["Divide the rand amount by the number of rand per dollar."],
    explanation: `${randIn.toLocaleString("en-GB")} ÷ ${randRate} = ${money(usdOut)}.`,
    workedSolution: `1. US\\$ amount = rand ÷ rate.\n2. ${randIn.toLocaleString("en-GB")} ÷ ${randRate} = ${usdOut}.\n3. Check: ${usdOut} × ${randRate} = ${randIn.toLocaleString("en-GB")} rand. The sale is worth ${money(usdOut)}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", applies: COM, kind: "plain", value: rise, dp: 2, calculator: true,
    stem: `A Zimbabwean firm sells a product for ${money(item)} to buyers in South Africa. The exchange rate changes from US\\$1 = ${rA} rand to US\\$1 = ${rB} rand. By how many rand does the price of the product rise for a South African buyer?`,
    wrong: [rB - rA, priceB],
    hints: ["Find the rand price at each rate.", "Subtract the old rand price from the new one."],
    explanation: `Before: ${item} × ${rA} = ${priceA} rand. After: ${item} × ${rB} = ${priceB} rand. Rise: ${priceB} − ${priceA} = ${rise} rand. The dollar has appreciated, so the export is dearer for South African buyers.`,
    workedSolution: `1. Old rand price = ${item} × ${rA} = ${priceA} rand.\n2. New rand price = ${item} × ${rB} = ${priceB} rand.\n3. Rise = ${priceB} − ${priceA} = ${rise} rand.\n4. The product is less competitive in South Africa.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain how a depreciation of the US dollar against the currencies of its suppliers could affect a Harare business that imports most of its stock.",
    points: [
      "Each US dollar buys less foreign currency.",
      "So imported stock costs more in US dollars (higher costs).",
      "The business must raise prices or accept a lower profit margin.",
      "Higher prices may reduce sales / customers switch to local substitutes.",
    ],
    hints: ["Start with what one dollar buys after the change."],
    modelAnswer: "After the depreciation each dollar buys less foreign currency, so the imported stock costs more dollars. The business must either raise its prices, which may reduce sales as customers switch to cheaper local goods, or keep prices and accept a lower profit margin.",
    explanation: "A chain of reasoning earns the marks: weaker currency → dearer imports → higher costs → higher prices or lower margins → effect on sales.",
  });
  b.manualShort({
    d: 3, marks: 3, skill: "UNDERSTANDING",
    stem: "State **three** problems that frequent changes in exchange rates cause for businesses that trade internationally.",
    points: ["Uncertainty: hard to set prices / plan.", "Contracts agreed earlier may become unprofitable.", "Costs of imports or revenue from exports change unexpectedly / hard to budget."],
    hints: ["Think about planning, contracts and budgets."],
    modelAnswer: "It is hard to set prices and plan ahead; contracts agreed months earlier can become unprofitable; and the cost of imports or the value of export earnings changes unexpectedly, making budgeting difficult.",
    explanation: "Exchange-rate changes create uncertainty for prices, contracts, costs and revenues.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900, applies: COM, calculator: true,
    stem: `Tatenda is a cross-border trader from Bulawayo. Each month he buys clothing in Johannesburg priced at ${stockRand.toLocaleString("en-GB")} rand and sells it in Zimbabwe for US dollars. Last month the rate was US\\$1 = ${trRate} rand. This month it is US\\$1 = ${newRate} rand. (These rates are assumed for the question.)`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the US dollar cost of the clothing last month.", kind: "money", value: stockUsd, wrong: [stockRand * trRate] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the US dollar cost of the same clothing this month.", kind: "money", value: stockUsdNew, wrong: [stockRand * newRate] }),
      P.mcq({
        label: "(c)", stem: "What has happened to the US dollar against the rand?",
        options: [["It has appreciated", "Correct: each dollar buys more rand."], ["It has depreciated", "A depreciating dollar would buy fewer rand."], ["It has stayed the same", "The rate has changed."], ["It has been devalued to zero", "Nothing suggests this."]],
        answer: "A",
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Explain **two** ways in which Tatenda could use this change to benefit his business.",
        points: [
          `Lower cost per load (${money(stockUsd - stockUsdNew)} less).`,
          "Keep selling prices and earn a higher profit margin.",
          "Or cut prices to attract more customers / compete with shops.",
          "Or buy more stock for the same dollars, increasing sales.",
        ],
        modelAnswer: `The clothing now costs ${money(stockUsdNew)} instead of ${money(stockUsd)}, saving ${money(stockUsd - stockUsdNew)}. Tatenda could keep his selling prices and earn a bigger profit on each item, or cut his prices to win customers from other traders and shops.`,
      }),
    ],
    hints: ["(a) and (b): divide the rand price by the rate.", "(c) Compare how many rand one dollar buys."],
    explanation: `(a) ${stockRand} ÷ ${trRate} = ${money(stockUsd)}. (b) ${stockRand} ÷ ${newRate} = ${money(stockUsdNew)}. (c) The dollar appreciated. (d) Lower costs allow a higher margin, lower prices or more stock.`,
    workedSolution: `1. Last month: ${stockRand} ÷ ${trRate} = ${stockUsd}.\n2. This month: ${stockRand} ÷ ${newRate} = ${stockUsdNew}.\n3. Saving: ${stockUsd} − ${stockUsdNew} = ${stockUsd - stockUsdNew} dollars.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Farai's company grows macadamia nuts near Chipinge and exports almost all of them. It is paid in US dollars by buyers in several countries, and its main rival exporters are in other African countries whose currencies have depreciated against the US dollar. The company also imports processing machinery.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain how the depreciation of rival exporters' currencies affects Farai's company.",
        points: [
          "Rivals' costs in their own currencies are now worth fewer dollars / rivals can cut dollar prices.",
          "So rivals' nuts become cheaper for foreign buyers.",
          "Farai's nuts become relatively more expensive / less competitive.",
          "Possible loss of orders or pressure to cut prices and profit.",
        ],
        modelAnswer: "Because the rivals' currencies have depreciated, their costs are now worth fewer dollars, so they can offer their nuts at lower dollar prices. Farai's nuts become relatively more expensive, so buyers may switch to rivals, and Farai may lose orders or have to cut prices and profit.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Recommend how the company should respond. Justify your answer.",
        points: [
          "Option: cut prices to stay competitive (effect on profit).",
          "Option: compete on quality, certification, reliability, relationships with buyers.",
          "Option: cut costs / improve efficiency (machinery imports are cheaper with a strong dollar).",
          "Option: find new markets or add value (roasted, packed nuts).",
          "Evaluates which option best fits the situation.",
          "Justified recommendation.",
        ],
        modelAnswer: "The company could cut its prices, but that would reduce profit and rivals could cut further. It could instead compete on quality and reliability, building long-term contracts with buyers who value consistent supply. A strong dollar also makes imported processing machinery cheaper, so it could invest to cut costs and add value by roasting and packing nuts, which earns higher prices and is less sensitive to rivals' price cuts. I recommend investing in efficiency and value addition while protecting relationships with buyers, because price cuts alone would weaken the business, while lower costs and differentiated products improve competitiveness for the long term.",
      }),
    ],
    hints: ["(a) Who becomes cheaper for foreign buyers?", "(b) Compare cutting prices with competing on quality and cost."],
    explanation: "Exchange-rate changes affect competitiveness through relative prices. Responses include cutting costs, adding value and competing on quality rather than price alone.",
  });
  b.card("DEFINITION", "What is an **exchange rate**?", "The price of one currency in terms of another, e.g. US\\$1 = 18 rand (assumed).");
  b.card("DEFINITION", "**Appreciation** of a currency?", "A rise in its value: one unit buys more of another currency.");
  b.card("DEFINITION", "**Depreciation** of a currency?", "A fall in its value: one unit buys less of another currency.");
  b.card("CONCEPT", "Strong home currency: effect on exporters and importers?", "Exports dearer abroad (less competitive); imports cheaper (lower costs).");
  b.card("CONCEPT", "Weak home currency: effect on exporters and importers?", "Exports cheaper abroad (more competitive); imports dearer (higher costs).");
  b.card("FORMULA", "Convert US\\$ to foreign currency (rate: US\\$1 = r units).", "Foreign amount = US\\$ amount × r.", "ZIMSEC Commerce only; Cambridge does not assess exchange-rate calculations.", { applies: COM });
  b.card("FORMULA", "Convert foreign currency to US\\$ (rate: US\\$1 = r units).", "US\\$ amount = foreign amount ÷ r.", "Check: the dollar amount is the smaller number when r is greater than 1.", { applies: COM });
  b.card("FACT", "Memory aid for exchange-rate effects?", "SPICED: Strong currency, Imports Cheap, Exports Dear.");
  b.card("CONCEPT", "Why do exchange-rate changes cause uncertainty?", "Prices, costs, revenues and the profit on contracts change unexpectedly, making planning difficult.");
});
