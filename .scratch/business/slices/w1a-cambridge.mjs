// W1a: Cambridge IGCSE Business 0264 Paper 1 exam-format item (20 marks: 2 + 4 + 6 + 8) on added value, economic
// sectors, import tariffs and e-commerce. Closed answers are auto-marked; the 6- and 8-mark parts are analysis and
// evaluation (self-marked).
import { concept, P, money, fmt, r2, table, CAM } from "../lib.mjs";

concept("bus.production.value-addition", { file: "exam/w1a-cambridge", keyPrefix: "exam.w1a-cambridge", applies: CAM }, (b) => {
  const price = 3.2, fruit = 0.9, bottle = 0.45, label = 0.15;
  const bought = r2(fruit + bottle + label);
  const av = r2(price - bought);
  const tariffPct = 20;
  const newBottle = r2(bottle * (1 + tariffPct / 100));
  const newAv = r2(price - (fruit + newBottle + label));
  const tbl = table(["Item (per 1-litre bottle)", "US\\$"], [["Selling price", price.toFixed(2)], ["Oranges", fruit.toFixed(2)], ["Imported glass bottle", bottle.toFixed(2)], ["Label and cap", label.toFixed(2)]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1350, calculator: true, paper: "Paper 1",
    concepts: ["bus.production.value-addition", "bus.production.sectors", "bus.trade.protectionism", "bus.marketing.ecommerce"],
    stem: `Mazowe Valley Juice (MVJ) is a fictional family business in Zimbabwe. It grows oranges on its own farm and also buys oranges from neighbouring farmers. It presses the oranges into fresh juice in its small factory and sells it in glass bottles to supermarkets. The bottles are imported. The government has just announced a ${tariffPct}% import tariff on glass bottles to encourage local bottle production. MVJ's managers are also considering selling directly to customers through a website with home delivery in Harare.\n\n${tbl}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: av,
        stem: "Calculate the added value of one bottle of juice.",
        wrong: [r2(price - fruit), bought],
        explanation: `Bought-in materials = ${fmt(fruit)} + ${fmt(bottle)} + ${fmt(label)} = ${fmt(bought)}. Added value = ${fmt(price)} − ${fmt(bought)} = ${money(av)}.`,
        workedSolution: `1. Cost of bought-in materials = ${fmt(fruit)} + ${fmt(bottle)} + ${fmt(label)} = ${fmt(bought)}.\n2. Added value = ${fmt(price)} − ${fmt(bought)} = ${money(av)}.`,
      }),
      P.num({
        label: "(b)", marks: 4, kind: "money", value: newAv,
        stem: `If the full ${tariffPct}% tariff is added to the cost of the imported bottle and MVJ keeps its selling price unchanged, calculate the new added value of one bottle.`,
        wrong: [r2(av - tariffPct / 100), r2(price - (fruit + bottle + label) * 1.2)],
        explanation: `New bottle cost = ${fmt(bottle)} × 1.${tariffPct} = ${fmt(newBottle)}. New bought-in cost = ${fmt(fruit)} + ${fmt(newBottle)} + ${fmt(label)} = ${fmt(r2(fruit + newBottle + label))}. New added value = ${fmt(price)} − ${fmt(r2(fruit + newBottle + label))} = ${money(newAv)}.`,
        workedSolution: `1. Tariff on the bottle = ${tariffPct}% × ${fmt(bottle)} = ${fmt(r2(bottle * tariffPct / 100))}.\n2. New bottle cost = ${fmt(bottle)} + ${fmt(r2(bottle * tariffPct / 100))} = ${fmt(newBottle)}.\n3. New bought-in materials = ${fmt(fruit)} + ${fmt(newBottle)} + ${fmt(label)} = ${fmt(r2(fruit + newBottle + label))}.\n4. New added value = ${fmt(price)} − ${fmt(r2(fruit + newBottle + label))} = ${money(newAv)}.`,
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 250 },
        stem: "Analyse how MVJ's activities depend on the primary, secondary and tertiary sectors.",
        points: [
          "Primary: growing oranges / buying from neighbouring farmers (1)",
          "Analysed: supply and cost of raw material depend on harvests (1)",
          "Secondary: pressing and bottling in its factory; depends on bottle makers (1)",
          "Analysed: e.g. tariff on imported bottles raises costs (1)",
          "Tertiary: supermarkets, transport, banking, website/delivery (1)",
          "Analysed: e.g. supermarkets and transport needed to reach customers (1)",
        ],
        modelAnswer: "MVJ is itself in the primary sector because it grows oranges, and it relies on neighbouring farmers for more, so a poor harvest would cut its supply and raise its costs. Its factory is secondary production: it presses and bottles the juice, and it depends on another secondary business, the overseas bottle maker, whose bottles now cost more because of the tariff. To reach customers it depends on the tertiary sector: transport firms deliver the juice, supermarkets sell it, banks handle payments and, if it sells online, an internet service and delivery firm. A problem in any sector would affect MVJ's costs or sales.",
      }),
      P.manual({
        label: "(d)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "MVJ is considering selling directly to customers through a website with home delivery in Harare. Recommend whether it should do this. Justify your answer.",
        points: [
          "Advantage for MVJ: keeps the supermarket's margin / higher price per bottle (1)",
          "Advantage: reaches customers directly; customer data; 24-hour ordering (1)",
          "Analysis of an advantage in context (e.g. could offset the lower added value after the tariff) (1)",
          "Disadvantage: cost of website and delivery; fresh juice must be delivered quickly and kept cold (1)",
          "Disadvantage: glass bottles are heavy and breakable; customers cannot inspect (1)",
          "Analysis of a disadvantage in context (1)",
          "Recommendation (1)",
          "Justification weighing the points (1)",
        ],
        modelAnswer: `Selling online would let MVJ keep the margin that supermarkets now take, which would help to make up for the fall in added value from ${money(av)} to ${money(newAv)} per bottle caused by the tariff. It could also collect customers' details and offer regular deliveries. However, fresh juice must be delivered quickly and kept cold, and glass bottles are heavy and can break, so delivery costs in Harare could be high. MVJ would also need to pay for a website and staff to manage orders, and supermarkets might reduce their orders if MVJ competes with them. I recommend MVJ starts with a small online service for regular orders in a few Harare suburbs, while keeping its supermarket sales, because this tests whether the extra margin covers delivery costs without risking its main customers.`,
      }),
    ],
    explanation: `Added value ${money(av)} per bottle, falling to ${money(newAv)} with the tariff. MVJ depends on all three sectors; online selling could raise the margin but needs careful delivery planning.`,
    hints: ["Add up all the bought-in costs before subtracting from the price.", "Only the bottle's cost changes with the tariff.", "In (d), weigh margins against delivery costs for a fresh, heavy product."],
  });
});
