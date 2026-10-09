// W3b: pricing methods.
import { concept, P, COM, CAM, f, money, round, r2 } from "../lib.mjs";

// q: simple cost-plus.
const c1 = 8, mu1 = 30;
const p1 = r2(c1 * (1 + mu1 / 100)); // 10.40
// q: cost-plus from total costs.
const fx = 2400, vc = 6, q = 800, mu2 = 25;
const tc = f.totalCost(fx, f.totalVariableCost(vc, q)); // 7200
const ac = f.averageCost(tc, q); // 9
const p2 = r2(ac * (1 + mu2 / 100)); // 11.25
// q: margin from mark-up (COM).
const mu3 = 50;
const mg3 = f.marginFromMarkUp(mu3); // 33.33
// q: what if output falls.
const qLow = 600;
const acLow = f.averageCost(f.totalCost(fx, f.totalVariableCost(vc, qLow)), qLow); // 10
const profitPerUnitLow = r2(p2 - acLow); // 1.25
// Structured: penetration vs cost-plus for a juice.
const jFx = 1500, jVc = 0.45, jQ = 5000, jMu = 40;
const jAc = f.averageCost(f.totalCost(jFx, f.totalVariableCost(jVc, jQ)), jQ); // 0.75
const jPrice = r2(jAc * (1 + jMu / 100)); // 1.05
const rival = 0.9;
const jPen = 0.8;
const jProfitPen = r2((jPen - jAc) * jQ); // 250

concept("bus.marketing.price", { file: "marketing/price", keyPrefix: "marketing.price" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which pricing method sets a low price at launch to win market share quickly?",
    options: [
      ["Penetration pricing", "Correct: a low launch price attracts customers fast."],
      ["Price skimming", "Skimming sets a high launch price."],
      ["Cost-plus pricing", "Cost-plus adds a mark-up to cost."],
      ["Dynamic pricing", "Dynamic pricing changes with demand."],
    ],
    answer: "A",
    explanation: "**Penetration pricing**: low price at launch to build market share, raised later.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is cost-plus pricing?",
    options: [
      ["Adding a percentage mark-up to the cost per unit", "Correct."],
      ["Charging the same price as competitors", "That is competitive pricing."],
      ["Changing prices according to demand", "That is dynamic pricing."],
      ["Charging a high price for a new product at its launch", "That is skimming."],
    ],
    answer: "A",
    explanation: "Cost-plus: price = cost per unit + mark-up (a percentage of cost).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A bus company charges higher fares on the Friday before a public holiday and lower fares on quiet weekdays. Which pricing method is this?",
    options: [
      ["Dynamic pricing", "Correct: fares change with demand."],
      ["Penetration pricing", "Penetration is a low launch price."],
      ["Cost-plus pricing", "Costs do not change by day."],
      ["Price skimming", "Skimming is a high launch price for a new product."],
    ],
    answer: "A",
    explanation: "**Dynamic pricing** raises prices when demand is high and lowers them when it is low.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which product is most suited to price skimming?",
    options: [
      ["A new, patented water purifier that no rival sells", "Correct: unique products suit a high launch price."],
      ["A loaf of white bread from a local bakery", "Many similar rivals: competitive pricing."],
      ["A 2 kg bag of sugar", "A basic product with many sellers."],
      ["A bar of laundry soap sold in every tuck shop", "Customers can easily switch brands."],
    ],
    answer: "A",
    explanation: "Skimming works when a product is **new and unique**, so early buyers will pay a premium.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is a disadvantage of competitive pricing?",
    options: [
      ["The price may not cover the business's own costs", "Correct: rivals' prices ignore your costs."],
      ["Customers are likely to switch to rivals", "Matching rivals' prices reduces switching."],
      ["It is very difficult to find rivals' prices", "Prices of similar goods are usually easy to find."],
      ["It always starts a price war", "Matching prices does not always start a price war."],
    ],
    answer: "A",
    explanation: "Competitive pricing keeps customers, but a firm with higher costs may make a loss at rivals' prices.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A new brand of cooking oil is launched in a market dominated by well-known brands. Which pricing method is most likely to help it win customers?",
    options: [
      ["Penetration pricing", "Correct: a low launch price encourages customers to try it."],
      ["Price skimming", "A high price would not attract buyers from known brands."],
      ["Dynamic pricing", "Demand for cooking oil does not change sharply by the hour."],
      ["A high cost-plus mark-up", "A high price would discourage trial."],
    ],
    answer: "A",
    hints: ["Customers are loyal to existing brands: how can the new brand get them to try it?"],
    explanation: "Penetration pricing tempts customers to try an unknown brand in a crowded market.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why can the profit from cost-plus pricing be lower than planned?",
    options: [
      ["Fewer units are sold, so fixed costs are spread over fewer units", "Correct: average cost rises when output falls."],
      ["The mark-up is added to the cost of each unit", "That is how cost-plus works."],
      ["Variable costs are included in the cost", "They should be."],
      ["The price is always set below rivals' prices for the product", "Cost-plus ignores rivals; the price may be above or below."],
    ],
    hints: ["Think about what happens to the average cost when output falls."],
    answer: "A",
    explanation: "The cost per unit assumes a planned output. If fewer units are sold, the average cost rises and the planned profit per unit shrinks.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: COM,
    stem: "A trader buys goods for US\\$40 and sells them for US\\$50. What is the mark-up?",
    options: [
      ["25%", "Correct: 10 ÷ 40 × 100 = 25%."],
      ["20%", "20% is the margin (10 ÷ 50 × 100)."],
      ["10%", "US\\$10 is the profit, not a percentage."],
      ["80%", "40 ÷ 50 × 100 = 80% is cost as a share of selling price."],
    ],
    answer: "A",
    explanation: "Mark-up = gross profit ÷ cost × 100 = 10 ÷ 40 × 100 = 25%. Margin = 10 ÷ 50 × 100 = 20%.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Price skimming means setting a high price when a new product is launched.",
    answer: true,
    explanation: "True. The price is lowered later as competitors arrive.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Penetration pricing usually gives a business high profits per unit straight after launch.",
    answer: false,
    explanation: "False. The low launch price means low profit per unit (or a loss) at first; the aim is market share.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the most suitable pricing method.",
    pairs: [
      ["A unique new smartphone with features no rival has", "Price skimming"],
      ["A new brand of soap entering a crowded market", "Penetration pricing"],
      ["A kombi operator on a route where all fares are the same", "Competitive pricing"],
      ["A hotel at Victoria Falls with rates that rise in the holiday season", "Dynamic pricing"],
      ["A carpenter who adds 30% to the cost of each table", "Cost-plus pricing"],
    ],
    explanation: "Each situation points to the method that suits the product and the market.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula for cost-plus pricing.",
    template: "Price = cost per {{blank:a}} plus a {{blank:b}}, which is a percentage of cost.",
    blanks: [
      { id: "a", accepted: ["unit", "item"], wrong: "month" },
      { id: "b", accepted: ["mark-up", "markup", "mark up"], wrong: "margin" },
    ],
    explanation: "Price = cost per unit + mark-up.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true, daily: true,
    stem: `A dressmaker's cost of making a dress is ${money(c1)}. She adds a mark-up of ${mu1}%. Calculate the selling price.`,
    kind: "money", value: p1, wrong: [c1 + mu1, r2(c1 * mu1 / 100)],
    explanation: `Mark-up = ${mu1}% × ${money(c1)} = ${money(r2(c1 * mu1 / 100))}; price = ${money(c1)} + ${money(r2(c1 * mu1 / 100))} = ${money(p1)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A workshop expects to make ${q} pairs of sandals a month. Fixed costs are ${money(fx)} a month and the variable cost is ${money(vc)} a pair. It uses cost-plus pricing with a ${mu2}% mark-up. Calculate the selling price of one pair.`,
    kind: "money", value: p2, wrong: [r2(vc * (1 + mu2 / 100)), r2((fx / q) * (1 + mu2 / 100))],
    hints: ["Find total cost, then average cost, then add the mark-up."],
    explanation: `Total cost = ${money(fx)} + ${money(vc)} × ${q} = ${money(tc)}. Average cost = ${money(tc)} ÷ ${q} = ${money(ac)}. Price = ${money(ac)} × 1.${mu2} = ${money(p2)}.`,
    workedSolution: `1. Total variable cost = ${vc} × ${q} = ${(vc * q).toLocaleString("en-GB")}.\n2. Total cost = ${fx.toLocaleString("en-GB")} + ${(vc * q).toLocaleString("en-GB")} = ${tc.toLocaleString("en-GB")}.\n3. Average cost = ${tc.toLocaleString("en-GB")} ÷ ${q} = ${ac.toFixed(2)}.\n4. Mark-up = ${mu2}% × ${ac.toFixed(2)} = ${r2(ac * mu2 / 100).toFixed(2)}.\n5. Price = ${ac.toFixed(2)} + ${r2(ac * mu2 / 100).toFixed(2)} = ${money(p2)}.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `The workshop in the previous question keeps its price at ${money(p2)}, but sells only ${qLow} pairs in a month (fixed costs ${money(fx)}, variable cost ${money(vc)} a pair). Calculate the profit it now makes on each pair.`,
    kind: "money", value: profitPerUnitLow, wrong: [r2(p2 - ac), r2(p2 - vc)],
    hints: ["Work out the new average cost at the lower output."],
    explanation: `New total cost = ${money(fx)} + ${money(vc)} × ${qLow} = ${money(f.totalCost(fx, vc * qLow))}. Average cost = ${money(acLow)}. Profit per pair = ${money(p2)} − ${money(acLow)} = ${money(profitPerUnitLow)}, instead of the planned ${money(r2(p2 - ac))}.`,
    workedSolution: `1. Total cost = ${fx.toLocaleString("en-GB")} + ${vc} × ${qLow} = ${f.totalCost(fx, vc * qLow).toLocaleString("en-GB")}.\n2. Average cost = ${f.totalCost(fx, vc * qLow).toLocaleString("en-GB")} ÷ ${qLow} = ${acLow.toFixed(2)}.\n3. Profit per pair = ${p2.toFixed(2)} − ${acLow.toFixed(2)} = ${money(profitPerUnitLow)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: true, applies: COM,
    stem: `A retailer uses a mark-up of ${mu3}% on cost. Calculate the equivalent margin (gross profit as a percentage of selling price), to one decimal place.`,
    kind: "pct", value: mg3, wrong: [mu3, round(100 - mu3, 1)],
    hints: ["Assume a cost of US\\$100 and find the selling price."],
    explanation: `Cost US\\$100, mark-up US\\$${mu3}, selling price US\\$${100 + mu3}. Margin = ${mu3} ÷ ${100 + mu3} × 100 = ${round(mg3, 1)}%.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **one** advantage and **one** disadvantage of price skimming for a business launching a new product.",
    points: [
      "Advantage: high profit per unit / recovers development costs quickly.",
      "Explained: early buyers keen to be first will pay more; high price also supports a quality image.",
      "Disadvantage: high profits attract competitors / limits sales to few customers.",
      "Explained: rivals launch similar cheaper products, so price must be cut / market share stays low.",
    ],
    hints: ["Consider profit per unit and the reaction of competitors."],
    modelAnswer: "Skimming gives a high profit on each unit, so the business recovers its research costs quickly from customers who want the product first. However, the high profit attracts competitors who launch cheaper copies, forcing the business to cut its price sooner than planned.",
    explanation: "Skimming trades high early profit against limited sales and attracting rivals.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Chipo is launching a new mango juice in 300 ml bottles in Mutare. She expects to sell ${jQ.toLocaleString("en-GB")} bottles a month. Fixed costs are ${money(jFx)} a month and the variable cost is ${money(jVc)} a bottle. The best-known rival juice sells for ${money(rival)}.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, stem: "Calculate the average cost of one bottle.",
        kind: "money", value: jAc, wrong: [jVc, r2(jFx / jQ)],
        explanation: `(${money(jFx)} + ${money(jVc)} × ${jQ.toLocaleString("en-GB")}) ÷ ${jQ.toLocaleString("en-GB")} = ${money(jAc)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, stem: `Calculate the price Chipo would charge using cost-plus pricing with a ${jMu}% mark-up.`,
        kind: "money", value: jPrice, wrong: [r2(jVc * (1 + jMu / 100)), r2(jAc + jMu / 100)],
        explanation: `${money(jAc)} × 1.${jMu} = ${money(jPrice)}.`,
      }),
      P.num({
        label: "(c)", marks: 2, stem: `Chipo's friend suggests a penetration price of ${money(jPen)}. Calculate Chipo's monthly profit at this price if she sells ${jQ.toLocaleString("en-GB")} bottles.`,
        kind: "money", value: jProfitPen, wrong: [r2(jPen * jQ), r2((jPen - jVc) * jQ)],
        explanation: `Profit per bottle = ${money(jPen)} − ${money(jAc)} = ${money(r2(jPen - jAc))}; × ${jQ.toLocaleString("en-GB")} = ${money(jProfitPen)}.`,
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend whether Chipo should use cost-plus pricing or penetration pricing. Justify your answer.",
        points: [`Cost-plus price ${money(jPrice)} is above the rival's ${money(rival)}.`, "So customers loyal to the known brand are unlikely to try an unknown juice.", `Penetration at ${money(jPen)} is below the rival, still covers average cost (profit ${money(jProfitPen)} a month if sales target met).`, "Risk: if sales are below target, average cost rises and a loss is possible; customers may resist later price rises.", "Considers raising price gradually / quality and brand.", "Justified recommendation."],
        modelAnswer: `At ${money(jPrice)}, the cost-plus price is well above the rival's ${money(rival)}, so few customers would try a new, unknown juice. A penetration price of ${money(jPen)} undercuts the rival and still covers her average cost of ${money(jAc)}, giving ${money(jProfitPen)} profit a month if she reaches ${jQ.toLocaleString("en-GB")} bottles. The risk is that she sells fewer, so her average cost rises, and that customers resist later price rises. Chipo should use penetration pricing to win customers, then raise the price gradually towards ${money(rival)} once the brand is known.`,
      }),
    ],
    hints: ["(a) Total cost ÷ number of bottles.", "(c) Profit per bottle × number of bottles."],
    explanation: `(a) ${money(jAc)}. (b) ${money(jPrice)}. (c) ${money(jProfitPen)}. (d) Penetration pricing is likely to suit a new brand against a cheaper known rival.`,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, applies: CAM,
    stem: "Nyasha owns a small guest house in Victoria Falls with 12 rooms. She charges the same price per night all year. Her rooms are full in the tourist high season and the school holidays, but often half empty at other times. A friend suggests she use dynamic pricing through an online booking site.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain what is meant by *dynamic pricing*.", points: ["Prices change frequently / often automatically.", "According to demand at the time (higher when demand is high)."] }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** benefits to Nyasha of using dynamic pricing.",
        points: ["Higher prices in high season when rooms are full anyway.", "So more revenue per room without losing guests.", "Lower prices in quiet months.", "So more rooms filled, revenue covers fixed costs."],
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Nyasha should introduce dynamic pricing.",
        points: ["Revenue gains in both seasons (as in (b)).", "Fits a business with fixed capacity and seasonal demand.", "Drawback: regular guests may feel prices are unfair / lose loyalty.", "Drawback: booking-site fees / need to manage prices and technology.", "Compares with a simpler alternative, e.g. two fixed seasonal rates.", "Justified conclusion."],
        modelAnswer: "Dynamic pricing suits a guest house with a fixed number of rooms and strongly seasonal demand. Nyasha could charge more in the high season, when rooms fill anyway, and less in quiet months to fill empty rooms, raising total revenue. However, regular guests may feel prices are unfair, and online booking sites charge fees and need someone to manage them. A simpler alternative is two published rates, high season and low season. Because her demand pattern is predictable, Nyasha should start with seasonal rates and move to full dynamic pricing only if the booking site brings in many new guests.",
      }),
    ],
    hints: ["(b) Consider high season and low season separately.", "(c) Weigh revenue gains against customer reactions and costs."],
    explanation: "Dynamic pricing raises revenue when capacity is fixed and demand varies, but may seem unfair.",
  });
  b.card("DEFINITION", "Cost-plus pricing?", "Price = cost per unit + a percentage mark-up on cost.");
  b.card("DEFINITION", "Competitive pricing?", "Charging a price similar to, or slightly below, competitors' prices.");
  b.card("DEFINITION", "Penetration pricing?", "A low price at launch to win market share quickly, raised later.");
  b.card("DEFINITION", "Price skimming?", "A high price at launch for a new, unique product, lowered later as rivals arrive.");
  b.card("DEFINITION", "Dynamic pricing?", "Prices that change frequently with demand at the time, often online (fares, hotel rooms).");
  b.card("FORMULA", "Average cost per unit?", "Total cost ÷ output, where total cost = fixed costs + variable costs.");
  b.card("FORMULA", "Mark-up and margin?", "Mark-up = gross profit ÷ cost × 100. Margin = gross profit ÷ selling price × 100.", "ZIMSEC Commerce.", { applies: COM });
  b.card("CONCEPT", "Choosing a pricing method?", "Consider how new and unique the product is, competitors, costs, customers' incomes and whether demand varies by time.");
  b.card("CONCEPT", "Main drawback of cost-plus pricing?", "Ignores competitors' prices and what customers will pay; if fewer units sell, average cost rises.");
});
