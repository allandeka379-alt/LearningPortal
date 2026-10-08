// W4b: econ.forex.exchange-rates — definition, reasons for buying and selling currencies, floating rates set by demand
// and supply, appreciation and depreciation, causes of fluctuations, effects on exports and imports, conversions.
// Fictional currencies only; figures differ from the lesson's worked examples.
import { concept, P, ZIM, schedule, forex, pctChange, fmt, pct, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.forex.exchange-rates", { file: "forex/exchange-rates", keyPrefix: "forex.exchange-rates" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a foreign exchange rate?",
    options: [
      ["The price of one currency in terms of another currency", "Correct."],
      ["The rate of interest paid on deposits of foreign currency", "That is an interest rate, not an exchange rate."],
      ["The amount of foreign currency held by the central bank", "Those are the foreign currency reserves."],
      ["The difference between a country's exports and its imports", "That is the balance of trade."],
    ],
    answer: "A",
    explanation: "An exchange rate is the price of one currency expressed in another, for example US\\$1 = 40 mara.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The exchange rate of the mara, a fictional currency, changes from US\\$1 = 40 mara to US\\$1 = 50 mara. What has happened?",
    options: [
      ["The mara has depreciated against the US dollar", "Correct: more mara are needed to buy one dollar."],
      ["The mara has appreciated against the US dollar", "A bigger number of mara per dollar means the mara is weaker."],
      ["The US dollar has depreciated against the mara", "The dollar now buys more mara, so the dollar has risen."],
      ["The value of the mara is unchanged", "The rate has changed by 25%."],
    ],
    answer: "A",
    explanation: "Each dollar now buys 50 mara instead of 40, so the dollar has risen and the mara has fallen (depreciated).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under a floating exchange rate, which change is most likely to cause a country's currency to **appreciate**?",
    options: [
      ["A rise in the country's interest rates compared with other countries", "Correct: foreign savers buy the currency to deposit it."],
      ["A rise in the country's spending on imports", "Residents sell more of the currency to buy foreign currency, so it depreciates."],
      ["Higher inflation in the country than in its trading partners", "Its exports become less competitive, so demand for the currency falls."],
      ["Expectations among dealers that the currency will fall", "Speculators would sell the currency."],
    ],
    answer: "A",
    explanation: "Higher interest rates attract deposits from abroad, increasing demand for the currency, so its price rises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which transaction **supplies** a country's currency to the foreign exchange market?",
    options: [
      ["A local firm buying machinery from abroad", "Correct: it sells local currency to obtain foreign currency."],
      ["A foreign tourist paying for a holiday in the country", "The tourist buys (demands) the local currency."],
      ["A foreign company building a factory in the country", "Foreign investment demands the local currency."],
      ["A foreign buyer purchasing the country's tobacco", "Paying for exports demands the local currency."],
    ],
    answer: "A",
    explanation: "Residents supply their currency when they pay for imports, travel or invest abroad; foreigners demand it to pay for the country's exports or invest in it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A country's currency appreciates. What is the most likely effect on its exporters and importers?",
    options: [
      ["Exports become dearer abroad and imports cheaper at home", "Correct: a strong currency makes imports cheap and exports dear."],
      ["Exports become cheaper abroad and imports dearer at home", "This is the effect of a depreciation."],
      ["Exports and imports both become cheaper", "Exports become dearer for foreign buyers."],
      ["Exports and imports are unaffected because prices are set in local currency", "Foreign buyers pay in their own currency, so the price they face changes."],
    ],
    answer: "A",
    hints: ["How much foreign currency does a buyer need to pay a fixed local price after an appreciation?"],
    explanation: "After appreciation each unit of local currency costs more foreign currency, so exports become dearer for foreigners; and each unit buys more foreign currency, so imports are cheaper.",
  });
  {
    const price = 9000, rate = 36, usd = price / rate;
    check("usd", usd, 250);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `A hotel in a fictional country charges 9,000 mara a night. The exchange rate is US\\$1 = ${rate} mara. What does a night cost a visitor paying in US dollars?`,
      options: [
        [`US\\$${usd}`, `Correct: 9,000 ÷ ${rate} = ${usd}.`],
        ["US\\$324,000", `This multiplies by ${rate} instead of dividing.`],
        ["US\\$8,964", `This subtracts ${rate} from the price.`],
        ["US\\$25", "This divides by 360, not 36."],
      ],
      answer: "A",
      hints: ["To turn mara into dollars, divide by the number of mara per dollar."],
      explanation: `Dollars = mara ÷ mara per dollar = 9,000 ÷ ${rate} = US\\$${usd}.`,
    });
  }
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A country's currency depreciates, but demand for its imports of fuel and medicines is price inelastic. What happens to its spending on these imports, measured in its own currency?",
    options: [
      ["It rises, because prices rise more than the quantity bought falls", "Correct: with inelastic demand, spending rises when price rises."],
      ["It falls, because people buy much less of the dearer imports", "Inelastic demand means quantity falls only a little."],
      ["It is unchanged, because the depreciation affects only exports", "Depreciation also raises import prices in local currency."],
      ["It falls, because imports become cheaper after a depreciation", "Depreciation makes imports dearer, not cheaper."],
    ],
    answer: "A",
    hints: ["Depreciation raises the local-currency price of imports.", "What happens to total spending on a good with inelastic demand when its price rises?"],
    explanation: "Depreciation raises the local price of imports. With price inelastic demand the quantity falls by a smaller percentage than the price rises, so total spending on imports rises; the current account may worsen at first.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Remittances sent home by a fictional country's citizens working abroad increase sharply. On a diagram with the price of the currency on the vertical axis and the quantity of the currency on the horizontal axis, what happens?",
    options: [
      ["The demand curve shifts to the right and the currency appreciates", "Correct: more foreign currency is converted into the local currency."],
      ["The supply curve shifts to the right and the currency depreciates", "Remittances coming in raise demand, not supply."],
      ["The demand curve shifts to the left and the currency depreciates", "Demand rises, not falls."],
      ["There is a movement along the supply curve with no change in the rate", "A change in remittances shifts a curve and changes the rate."],
    ],
    answer: "A",
    hints: ["When the money is converted, which currency is being bought?"],
    explanation: "When remittances are converted, foreign currency is sold and the local currency is bought: demand for it rises, the demand curve shifts right and the exchange rate rises.",
  });

  // Numericals.
  {
    const usd = 350, rate = 18, local = forex.convert(usd, rate);
    check("local", local, 6300);
    b.num({
      d: 2, skill: "APPLICATION", kind: "plain", value: local, daily: true,
      stem: `A fictional country's currency is the sefa. The exchange rate is US\\$1 = ${rate} sefa. A trader imports a generator priced at US\\$${usd}. Calculate its cost in sefa.`,
      wrong: [usd / rate, usd + rate],
      explanation: `To convert dollars into sefa, multiply: ${usd} × ${rate} = **${fmt(local)} sefa**. Dividing (${fmt(usd / rate, 2)}) converts the wrong way.`,
    });
  }
  {
    const r0 = 2.5, r1 = 3, ch = forex.change(r0, r1);
    check("ch", ch, 20);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "pct", value: ch,
      stem: "The price of the mara, a fictional currency, rises from 2.5 US cents to 3.0 US cents. Calculate the percentage appreciation of the mara. Give your answer to one decimal place.",
      wrong: [pctChange(r1, r0) * -1, r1 - r0],
      hints: ["Percentage change = change ÷ original value × 100."],
      explanation: `1. Change = 3.0 − 2.5 = 0.5 cents.\n2. Appreciation = 0.5 ÷ 2.5 × 100 = **${pct(ch, 1)}**.\n3. Using the new price as the base gives ${pct(-pctChange(r1, r0), 1)}, which is wrong.`,
    });
  }
  {
    const sales = 5000, r0 = 12, r1 = 15, l0 = sales * r0, l1 = sales * r1, gain = l1 - l0;
    check("gain", gain, 15000);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "plain", value: gain,
      stem: `A craft exporter in a fictional country sells goods worth US\\$${fmt(sales)} a month abroad. The exchange rate changes from US\\$1 = ${r0} lumo to US\\$1 = ${r1} lumo, and the dollar price of the goods does not change. By how many lumo do the exporter's monthly earnings in local currency rise?`,
      wrong: [l1, sales * (r1 - r0) / r0],
      hints: ["Convert the dollar earnings at each rate.", "Subtract."],
      explanation: `1. Before: ${fmt(sales)} × ${r0} = ${fmt(l0)} lumo.\n2. After: ${fmt(sales)} × ${r1} = ${fmt(l1)} lumo.\n3. Rise = **${fmt(gain)} lumo**. The lumo has depreciated, so each dollar earned is worth more local currency.`,
    });
  }
  {
    const prices = [10, 12, 14, 16, 18], qd = [640, 600, 560, 520, 480], qs = [480, 520, 560, 600, 640];
    const s = schedule({ prices, qd, qs, priceHeader: "Price of 1 tana (US cents)", qdHeader: "Tana demanded (million)", qsHeader: "Tana supplied (million)", requireEquilibrium: true });
    const qs2 = qs.map((q) => q + 80);
    const s2 = schedule({ prices, qd, qs: qs2, requireEquilibrium: true });
    check("e1", s.equilibrium.price, 14); check("e2", s2.equilibrium.price, 12);
    b.num({
      d: 4, skill: "ANALYSIS", kind: "plain", value: s2.equilibrium.price,
      stem: `The table shows the foreign exchange market for the tana, the currency of a fictional country.\n\n${s.md}\n\nResidents of the country increase their spending on imports, so the quantity of tana supplied rises by 80 million at every price. What is the new equilibrium price of the tana, in US cents?`,
      wrong: [s.equilibrium.price, 16],
      hints: ["Add 80 million to every figure in the supply column.", "Find the price at which demand equals the new supply."],
      explanation: `The supply curve shifts to the right. New supply: ${qs2.join(", ")} million. At 12 cents demand (600) equals the new supply (600), so the price falls from ${s.equilibrium.price} to **${s2.equilibrium.price} cents**: the tana depreciates.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Under a floating exchange rate system, the exchange rate is set by the demand for and supply of the currency.",
    answer: true,
    explanation: "True. The government or central bank does not fix the rate; market forces do.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A depreciation of a country's currency makes its imports cheaper for its own residents.",
    answer: false,
    explanation: "False. After a depreciation each unit of local currency buys less foreign currency, so imports cost more in local currency.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each event with its most likely effect on the exchange rate of a fictional country's floating currency.",
    pairs: [
      ["World demand for its exports rises", "Demand for the currency rises: appreciation"],
      ["Its residents buy more imported cars", "Supply of the currency rises: depreciation"],
      ["Dealers expect the currency to fall", "Speculative selling: depreciation"],
      ["A foreign firm builds a large mine there", "Inward investment raises demand: appreciation"],
    ],
    hints: ["Who is buying and who is selling the currency in each case?"],
    explanation: "Foreign purchases of exports and assets raise demand for the currency; residents' purchases of imports raise its supply; expectations of a fall cause selling.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct words.",
    template: "When a currency depreciates, the country's exports become {{blank:a}} for foreign buyers and its imports become {{blank:b}} at home, so the cost of imported fuel {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["cheaper"], choices: ["cheaper", "dearer"] },
      { id: "b", accepted: ["dearer"], choices: ["cheaper", "dearer"] },
      { id: "c", accepted: ["rises"], choices: ["rises", "falls"] },
    ],
    wrong: [["dearer", "cheaper", "falls"]],
    hints: ["A weak currency: imports dear, exports cheap."],
    explanation: "Depreciation lowers the foreign-currency price of exports and raises the local-currency price of imports, including fuel.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why foreigners buy a country's currency.",
    points: [
      "To pay for the country's exports of goods and services (including tourism)…",
      "…because its exporters want to be paid in their own currency.",
      "To invest in the country (build factories or mines, buy shares) / to save in its banks to earn interest / to speculate…",
      "…which requires converting their money into the local currency.",
    ],
    modelAnswer: "First, foreigners need the currency to pay for the country's exports, such as tobacco, minerals and holidays, because the country's producers want to be paid in their own currency. Second, foreign firms and savers buy the currency to invest in the country, for example to build a mine or to deposit money in its banks if its interest rates are high; speculators may also buy it if they expect it to rise.",
    hints: ["Think about trade, investment, saving and speculation."],
    explanation: "Two marks for each reason: identify + explain.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4, applies: ZIM,
    stem: "Explain how a fall in the value of the Zimbabwean currency against the US dollar affects (i) tobacco farmers who export and (ii) households that buy imported goods.",
    points: [
      "Farmers: each US dollar earned from exports is worth more local currency…",
      "…so their local incomes rise / they can lower their foreign prices and sell more.",
      "Households: imported goods (fuel, food, medicines) cost more in local currency…",
      "…so their real incomes fall and inflation may rise.",
    ],
    modelAnswer: "Tobacco farmers who are paid in US dollars receive more local currency for each dollar they earn, so their incomes in local currency rise; alternatively, they could lower their dollar prices and sell more abroad. Households that buy imported goods such as fuel, cooking oil and medicines must pay more local currency for them, so their real incomes fall, and dearer imports can push up the general price level.",
    hints: ["Exports are paid for in dollars; imports must be bought with dollars."],
    explanation: "Two marks for each group: effect + explanation.",
  });

  // Structured 1 (8 marks).
  {
    const r0 = 20, r1 = 16, fert = 650, l0 = fert * r0, l1 = fert * r1, ch = pctChange(l0, l1);
    check("l0", l0, 13000); check("l1", l1, 10400); check("ch", ch, -20);
    const kPrice = 4800, us0 = kPrice / r0, us1 = kPrice / r1;
    check("us0", us0, 240); check("us1", us1, 300);
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `The doro is the currency of a fictional country. After a rise in its central bank's interest rate, the exchange rate moved from US\\$1 = ${r0} doro to US\\$1 = ${r1} doro.`,
      parts: [
        P.mcq({
          label: "(a)", marks: 1,
          stem: "What happened to the doro?",
          options: [["It appreciated", "Correct: fewer doro are needed to buy a dollar."], ["It depreciated", "A smaller number of doro per dollar means the doro is stronger."], ["It was devalued by the government", "The rate floats; it was not fixed by the government."], ["Its value did not change", "The rate changed by 20%."]],
          answer: "A",
          explanation: `From ${r0} to ${r1} doro per dollar: each doro buys more dollars.`,
        }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: l1, stem: `A farmer imports fertiliser priced at US\\$${fert}. Calculate its cost in doro after the change.`, wrong: [l0, fert / r1], explanation: `${fert} × ${r1} = ${fmt(l1)} doro (it cost ${fmt(l0)} doro before).` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: us1, stem: `A safari lodge charges ${fmt(kPrice)} doro a night. Calculate the price for a visitor paying in US dollars after the change.`, wrong: [us0, kPrice * r1], explanation: `${fmt(kPrice)} ÷ ${r1} = US\\$${us1} (it was US\\$${us0} before).` }),
        P.manual({
          label: "(d)", marks: 3, levels: LV(3),
          stem: "Discuss whether the change in the exchange rate is good for the country.",
          points: [
            "Good: imports (fertiliser, fuel, machinery) cheaper, lowering costs and inflation; foreign debts cheaper to repay.",
            "Bad: exports and tourism dearer for foreigners (the lodge now costs more in dollars), so sales and jobs in export industries may fall; current account may worsen.",
            "Justified conclusion, depending on the elasticity of demand for exports and on whether inflation was a bigger problem.",
          ],
          modelAnswer: `The appreciation makes imports cheaper: fertiliser now costs ${fmt(l1)} doro instead of ${fmt(l0)}, which lowers farmers' costs and helps to reduce inflation. However, exports become dearer: a night at the lodge now costs US\\$${us1} instead of US\\$${us0}, so fewer tourists may come, and exporters may lose sales and cut jobs, worsening the current account. If the country's main problem is inflation, the change is helpful, but if it depends heavily on exports and tourism with price elastic demand, it is harmful.`,
          explanation: "Cheaper imports versus dearer exports; conclude.",
        }),
      ],
      hints: ["Dollars into doro: multiply. Doro into dollars: divide."],
      explanation: `The doro appreciated; fertiliser costs ${fmt(l1)} doro and the lodge US\\$${us1} a night.`,
    });
  }
  // Structured 2 (12 marks).
  {
    const prices = [20, 25, 30, 35, 40], qd = [380, 340, 300, 260, 220], qs = [220, 260, 300, 340, 380];
    const s = schedule({ prices, qd, qs, priceHeader: "Price of 1 rima (US cents)", qdHeader: "Rima demanded (million)", qsHeader: "Rima supplied (million)", requireEquilibrium: true });
    const qd2 = qd.map((q) => q - 80);
    const s2 = schedule({ prices, qd: qd2, qs, requireEquilibrium: true });
    check("e1", s.equilibrium.price, 30); check("e2", s2.equilibrium.price, 25);
    const dep = pctChange(s.equilibrium.price, s2.equilibrium.price);
    check("dep", dep, -16.667, 0.001);
    const surplus = qs[2] - qd2[2];
    check("surplus", surplus, 80);
    b.struct({
      d: 5, skill: "ANALYSIS", examStyle: true, calculator: true,
      stem: `The rima is the floating currency of a fictional country that exports copper. The table shows the foreign exchange market for the rima.\n\n${s.md}\n\nIn 2026 the world price of copper fell sharply, and foreign buyers' demand for rima fell by 80 million at every price.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "plain", value: s.equilibrium.price, stem: "State the equilibrium price of the rima before the fall in demand, in US cents.", wrong: [s2.equilibrium.price], explanation: `Demand = supply = 300 million at ${s.equilibrium.price} cents.` }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: surplus, stem: "After the fall in demand, calculate the excess supply of rima at the old equilibrium price, in million.", wrong: [qd2[2]], explanation: `New demand at 30 cents = ${qd2[2]}; supply = ${qs[2]}; excess supply = ${surplus} million.` }),
        P.num({ label: "(c)", marks: 1, kind: "plain", value: s2.equilibrium.price, stem: "Calculate the new equilibrium price of the rima, in US cents.", wrong: [s.equilibrium.price, 20], explanation: `New demand: ${qd2.join(", ")}. At 25 cents demand (260) = supply (260).` }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: dep, stem: "Calculate the percentage change in the value of the rima. Give a fall as a negative number, to one decimal place.", wrong: [-dep, pctChange(25, 30) * -1], explanation: `(25 − 30) ÷ 30 × 100 = ${fmt(dep, 1)}%.` }),
        P.manual({
          label: "(e)", marks: 3,
          stem: "Describe the diagram you would use to show this change in the market for the rima.",
          points: [
            "Axes: price of the rima (US cents) on the vertical axis, quantity of rima on the horizontal axis; downward-sloping demand, upward-sloping supply.",
            "The demand curve shifts to the left, from D1 to D2.",
            "The equilibrium moves from 30 cents / 300 million to 25 cents / 260 million: depreciation.",
          ],
          modelAnswer: "The price of the rima in US cents goes on the vertical axis and the quantity of rima on the horizontal axis. The demand curve slopes down and the supply curve slopes up, crossing at 30 cents and 300 million rima. The fall in demand for copper shifts the demand curve to the left, from D1 to D2, so the new equilibrium is at 25 cents and 260 million rima: the rima depreciates.",
          explanation: "Axes and curves, the shift, the old and new equilibrium.",
        }),
        P.manual({
          label: "(f)", marks: 4, levels: LV(4),
          stem: "Discuss whether the depreciation of the rima will help the country's economy.",
          points: [
            "Help: exports and tourism cheaper for foreigners; exporters get more rima per dollar; dearer imports make residents switch to local goods, helping jobs and the current account.",
            "Harm: dearer imported fuel, machinery and food → cost-push inflation, lower real incomes; foreign debts dearer to repay.",
            "Depends: price elasticity of demand for exports and imports; copper demand is weak, so lower prices may not raise sales much.",
            "Justified conclusion.",
          ],
          modelAnswer: "The depreciation makes the country's exports cheaper for foreign buyers and its tourism more attractive, and exporters receive more rima for each dollar, which may protect their incomes and jobs after the copper price fall. Imports become dearer, so residents may switch to locally made goods, helping domestic firms and the current account. On the other hand, imported fuel, machinery and food will cost more, raising firms' costs and causing inflation that lowers real incomes, and any debts owed in dollars become more expensive to repay. The benefits depend on price elasticity: if world demand for copper is weak, lower prices may not raise sales much, while demand for essential imports is inelastic. The depreciation cushions the shock, but on its own it is unlikely to restore the economy fully, and the risk of inflation means its effects are mixed.",
          explanation: "Export and import effects, inflation and debt, elasticity; conclude.",
        }),
      ],
      hints: ["Subtract 80 million from every figure in the demand column.", "Find the price where demand equals supply."],
      explanation: `Equilibrium falls from ${s.equilibrium.price} to ${s2.equilibrium.price} US cents per rima, a depreciation of ${fmt(-dep, 1)}%.`,
    });
  }

  b.card("DEFINITION", "Define a **foreign exchange rate**.", "The price of one currency in terms of another currency.");
  b.card("DEFINITION", "What is a **floating exchange rate**?", "A rate determined by the demand for and supply of the currency, without government fixing.");
  b.card("DEFINITION", "Define **appreciation** and **depreciation**.", "Appreciation: a rise in a floating currency's value (it buys more foreign currency). Depreciation: a fall in its value.");
  b.card("CONCEPT", "Why do foreigners demand a country's currency?", "To buy its exports (including tourism), to invest, to save in its banks, to speculate.");
  b.card("CONCEPT", "Why do residents supply their currency?", "To buy imports, travel abroad, invest or save abroad, send money abroad.");
  b.card("FACT", "Effect of an appreciation on exports and imports?", "Exports dearer for foreigners; imports cheaper at home (strong currency: imports cheap, exports dear).");
  b.card("FORMULA", "The rate is US\\$1 = 25 kora. How do you convert between the two currencies?", "Dollars → kora: multiply by 25. Kora → dollars: divide by 25.");
  b.card("CONCEPT", "Give four causes of exchange rate fluctuations.", "Changes in exports and imports; relative interest rates; speculation; relative inflation; investment flows and remittances.");
  b.card("FACT", "What currency did the Reserve Bank of Zimbabwe introduce in April 2024?", "The Zimbabwe Gold (ZiG).", undefined, { applies: ZIM });
});
