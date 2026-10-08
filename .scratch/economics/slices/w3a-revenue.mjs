// W3a: econ.costs.revenue — total and average revenue (both boards), marginal revenue (ZIMSEC), how sales affect revenue.
import { concept, P, table, revenueTable, pctChange, check, fmt, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.costs.revenue", { file: "costs/revenue", keyPrefix: "costs.revenue" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by a firm's **total revenue**?",
    options: [
      ["The income from selling its output: price × quantity sold", "Correct: TR = P × Q."],
      ["The income from sales minus the costs of production", "That is profit, not revenue."],
      ["The amount the firm spends on all its factors of production", "That is total cost."],
      ["The income from selling one more unit of its output", "That is marginal revenue."],
    ],
    answer: "A",
    explanation: "Total revenue is all the income from sales in a period: price multiplied by quantity sold.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When every unit is sold at the same price, **average revenue** is equal to…",
    options: [
      ["the price of the product", "Correct: AR = TR ÷ Q = (P × Q) ÷ Q = P."],
      ["total revenue minus total cost", "That is profit."],
      ["the quantity sold", "Quantity is not a revenue per unit."],
      ["total cost divided by output", "That is average total cost."],
    ],
    answer: "A",
    explanation: "AR = TR ÷ Q = (P × Q) ÷ Q = P, so the AR curve is the firm's demand curve.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "How is **marginal revenue** calculated?",
    options: [
      ["Change in total revenue ÷ change in quantity sold", "Correct: the extra revenue from one more unit."],
      ["Total revenue ÷ the total quantity of units sold", "That is average revenue."],
      ["Change in total cost ÷ change in quantity produced", "That is marginal cost."],
      ["Total revenue − total cost at the current output", "That is profit."],
    ],
    answer: "A",
    explanation: "MR = ΔTR ÷ ΔQ: the addition to total revenue from selling one more unit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm's sales rise from 400 to 500 units while its price stays at US\\$6. What happens to its revenue?",
    options: [
      ["Total revenue rises by US\\$600 and average revenue stays at US\\$6", "Correct: 100 more units × US\\$6; AR = price."],
      ["Total revenue rises by US\\$600 and average revenue rises to US\\$7.50", "AR equals the unchanged price."],
      ["Total revenue rises by US\\$100 and average revenue stays at US\\$6", "US\\$100 is the change in units, not dollars."],
      ["Total revenue is unchanged because the price has not changed", "More units at the same price raise TR."],
    ],
    answer: "A",
    explanation: "TR rises from 6 × 400 = US\\$2,400 to 6 × 500 = US\\$3,000, a rise of US\\$600. AR = price = US\\$6.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A firm cuts its price by 10% and the quantity it sells rises by 25%. What happens to its total revenue, and why?",
    options: [
      ["It rises, because demand is price elastic", "Correct: the % rise in sales is bigger than the % fall in price."],
      ["It falls, because demand is price inelastic", "A 25% rise in sales from a 10% cut shows elastic demand."],
      ["It falls, because the firm earns less on every unit", "The extra units more than make up for this."],
      ["It stays the same, because price and sales move in opposite directions", "Only true if the percentage changes are equal."],
    ],
    answer: "A",
    hints: ["Compare the percentage change in quantity with the percentage change in price."],
    explanation: "New TR = 0.9 × 1.25 = 1.125 times the old TR, a 12.5% rise. Demand is elastic (25% > 10%), so a price cut raises revenue.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS", applies: ZIM,
    stem: "A firm can sell more only by lowering its price on all the units it sells. Which statement is correct?",
    options: [
      ["Marginal revenue is less than average revenue", "Correct: the price cut on earlier units reduces the gain from the extra unit."],
      ["Marginal revenue is equal to average revenue at every output", "That is true only for a price taker."],
      ["Marginal revenue is greater than average revenue", "MR cannot exceed the price when the price must fall."],
      ["Average revenue rises as more units are sold", "AR is the price, which falls."],
    ],
    answer: "A",
    hints: ["The extra customer pays the new price, but what happens to the price paid by the others?"],
    explanation: "The extra unit earns its price, but every earlier unit now sells for less, so MR < AR (price).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A small tomato grower sells in a market with many sellers and takes the market price as given. Which is true for this grower?",
    options: [
      ["Price = average revenue = marginal revenue", "Correct: every extra crate earns the same market price."],
      ["Marginal revenue falls as more crates are sold", "That happens only if the price must fall to sell more."],
      ["Average revenue is greater than the market price", "AR equals the price."],
      ["Total revenue stays the same when sales rise", "TR rises with every crate sold."],
    ],
    answer: "A",
    explanation: "A price taker sells each unit at the same market price, so AR and MR both equal the price.",
  });

  // Price-taker TR.
  {
    const p = 3.5, q = 640, tr = p * q;
    check("tr", tr, 2240);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: tr, daily: true,
      stem: `A fictional honey producer near Chimanimani sells ${q} jars a month at US\\$${p.toFixed(2)} each. Calculate its total revenue for the month.`,
      wrong: [q / p, q + p],
      explanation: `TR = P × Q = ${p.toFixed(2)} × ${q} = **US\\$${fmt(tr)}**.`,
    });
  }
  // AR from TR.
  {
    const tr = 4350, q = 290, ar = tr / q;
    check("ar", ar, 15);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: ar, daily: true,
      stem: `A fictional tailoring business earns total revenue of US\\$${fmt(tr)} from selling ${q} school uniforms. Calculate its average revenue per uniform.`,
      wrong: [tr * q],
      explanation: `AR = TR ÷ Q = ${fmt(tr)} ÷ ${q} = **US\\$${ar}**, which is also the price of each uniform.`,
    });
  }
  // MR table (ZIM).
  const q = [0, 10, 20, 30, 40, 50], p = [20, 18, 16, 14, 12, 10];
  const R = revenueTable({ quantity: q, price: p, marginal: true });
  const tQ = table(["Quantity sold (units per day)", "Price (US\\$)"], q.map((x, i) => [x, p[i]]));
  check("tr30", R.rows[3].tr, 420); check("mr30", R.rows[3].mr, 10);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: R.rows[3].mr, applies: ZIM,
    stem: `A fictional bicycle-hire business in Victoria Falls faces the demand schedule below.\n\n${tQ}\n\nCalculate the marginal revenue per unit when sales rise from 20 to 30 units per day.`,
    wrong: [R.rows[3].tr - R.rows[2].tr, p[3]],
    hints: ["Find TR at 20 and at 30 units first.", "Divide the change in TR by the change in quantity."],
    explanation: `1. TR at 20 units = 16 × 20 = US\\$${R.rows[2].tr}.\n2. TR at 30 units = 14 × 30 = US\\$${R.rows[3].tr}.\n3. Change in TR = ${R.rows[3].tr} − ${R.rows[2].tr} = US\\$${R.rows[3].tr - R.rows[2].tr}.\n4. MR = ${R.rows[3].tr - R.rows[2].tr} ÷ 10 = **US\\$${R.rows[3].mr}** per unit.\n5. US\\$${R.rows[3].tr - R.rows[2].tr} forgets to divide by the 10 extra units; US\\$${p[3]} is the price (AR), which is above MR.`,
  });
  {
    const tr0 = 1250, tr1 = 1410, q0 = 50, q1 = 60, mr = (tr1 - tr0) / (q1 - q0);
    check("mrB", mr, 16);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: mr, applies: ZIM,
      stem: `When a fictional printing firm raises its weekly sales of posters from ${q0} to ${q1}, its total revenue rises from US\\$${fmt(tr0)} to US\\$${fmt(tr1)}. Calculate the marginal revenue per poster.`,
      wrong: [tr1 - tr0, tr1 / q1],
      explanation: `MR = ΔTR ÷ ΔQ = (${fmt(tr1)} − ${fmt(tr0)}) ÷ (${q1} − ${q0}) = ${tr1 - tr0} ÷ ${q1 - q0} = **US\\$${mr}** per poster. US\\$${tr1 - tr0} is the change in TR before dividing by the 10 extra posters; ${fmt(tr1)} ÷ ${q1} = US\\$${fmt(tr1 / q1)} is average revenue.`,
    });
  }
  // Price change and TR (both).
  {
    const p0 = 5, p1 = 4, q0 = 1200, q1 = 1440, tr0 = p0 * q0, tr1 = p1 * q1;
    check("tr0", tr0, 6000); check("tr1", tr1, 5760);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "money", value: tr1 - tr0,
      stem: `A fictional bus company in Gweru cuts its fare from US\\$${p0} to US\\$${p1}. Weekly passengers rise from ${fmt(q0)} to ${fmt(q1)}. Calculate the change in its weekly total revenue. Give a fall as a negative number.`,
      wrong: [tr0 - tr1, (q1 - q0) * p1],
      hints: ["Work out TR before and after the fare cut."],
      explanation: `1. TR before = ${p0} × ${fmt(q0)} = US\\$${fmt(tr0)}.\n2. TR after = ${p1} × ${fmt(q1)} = US\\$${fmt(tr1)}.\n3. Change = ${fmt(tr1)} − ${fmt(tr0)} = **−US\\$${fmt(tr0 - tr1)}** (a fall).\n4. Passengers rose by ${fmt(pctChange(q0, q1))}% but the fare fell by ${fmt(-pctChange(p0, p1))}%, so demand is price inelastic and revenue falls. Counting only the new passengers' fares (US\\$${fmt((q1 - q0) * p1)}) ignores the lower fare paid by everyone.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A firm with high total revenue must be making a profit.",
    answer: false,
    explanation: "False. Profit = total revenue − total cost. If costs are higher than revenue, the firm makes a loss.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If demand for a product is price inelastic, a rise in its price will increase the firm's total revenue.",
    answer: true,
    explanation: "True. With inelastic demand the percentage fall in sales is smaller than the percentage rise in price, so TR rises.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Total revenue is price {{blank:a}} quantity sold. Average revenue is total revenue {{blank:b}} quantity sold, so it is equal to the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["multiplied by"], choices: ["multiplied by", "divided by", "minus"] },
      { id: "b", accepted: ["divided by"], choices: ["multiplied by", "divided by", "minus"] },
      { id: "c", accepted: ["price"], choices: ["price", "profit", "cost"] },
    ],
    explanation: "TR = P × Q; AR = TR ÷ Q = P.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each event with its most likely effect on a firm's total revenue.",
    pairs: [
      ["A successful advertising campaign at an unchanged price", "TR rises because more units are sold"],
      ["A price cut when demand is price inelastic", "TR falls because sales rise only a little"],
      ["A new rival opens next door and takes customers", "TR falls because demand shifts left"],
      ["A price cut when demand is price elastic", "TR rises because sales rise a lot"],
    ],
    explanation: "Revenue depends on price and quantity; the effect of a price change depends on price elasticity of demand.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "A fictional cinema in Bulawayo is thinking of cutting its ticket price to raise its revenue. Explain **two** factors that will decide whether its revenue rises.",
    points: [
      "Price elasticity of demand for tickets.",
      "If demand is elastic, the % rise in tickets sold exceeds the % price cut, so TR rises (inelastic: TR falls).",
      "Availability of substitutes / reaction of rivals (e.g. other entertainment, streaming, a rival cinema cutting its price).",
      "If rivals also cut prices, or if seats are already nearly full (capacity), sales may not rise enough to raise TR.",
    ],
    modelAnswer: "First, the price elasticity of demand: if demand for tickets is elastic, the percentage rise in tickets sold will be bigger than the percentage cut in price, so revenue rises; if it is inelastic, revenue falls. Second, the reaction of rivals and capacity: if other entertainment providers cut their prices too, or if the cinema is already nearly full, it will not sell many more tickets, so revenue may fall.",
    hints: ["What decides how much sales rise when the price falls?"],
    explanation: "One mark for each factor and one for explaining its effect on revenue.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, applies: ZIM,
    stem: `Chipo runs a fictional sewing business in Mutare. To sell more dresses each week she must lower her price.\n\n${table(["Dresses sold per week", "Price per dress (US\\$)"], [[0, 30], [1, 28], [2, 26], [3, 24], [4, 22], [5, 20]])}`,
    parts: (() => {
      const qq = [0, 1, 2, 3, 4, 5], pp = [30, 28, 26, 24, 22, 20];
      const RR = revenueTable({ quantity: qq, price: pp, marginal: true }).rows;
      check("tr3", RR[3].tr, 72); check("mr4", RR[4].mr, 16); check("mr5", RR[5].mr, 12);
      return [
        P.num({ label: "(a)", marks: 1, kind: "money", value: RR[3].tr, stem: "Calculate total revenue when 3 dresses are sold.", wrong: [24 + 3], explanation: "TR = 24 × 3 = US\\$72." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: RR[3].ar, stem: "State average revenue when 3 dresses are sold.", wrong: [RR[3].mr], explanation: "AR = 72 ÷ 3 = US\\$24, the price." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: RR[4].mr, stem: "Calculate the marginal revenue of the 4th dress.", wrong: [22], explanation: `TR at 4 = 88; TR at 3 = 72; MR = 88 − 72 = US\\$${RR[4].mr}.` }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain why the marginal revenue of the 4th dress is less than its price.", points: ["The 4th dress sells for US\\$22, adding US\\$22.", "But to sell it the price of the first 3 dresses falls from US\\$24 to US\\$22.", "So US\\$2 × 3 = US\\$6 of revenue is lost on the earlier dresses.", "MR = 22 − 6 = US\\$16, less than the price of US\\$22."], modelAnswer: "The 4th dress brings in its price of US\\$22. But to sell 4 dresses Chipo must cut the price of all of them from US\\$24 to US\\$22, so she loses US\\$2 on each of the first three, US\\$6 in all. Her revenue therefore rises by only 22 − 6 = US\\$16, which is less than the price." }),
        P.manual({ label: "(e)", marks: 4, stem: "Describe how total revenue and marginal revenue change as sales rise from 1 to 5 dresses, and explain what would happen to total revenue if marginal revenue became negative.", points: ["TR rises: 28, 52, 72, 88, 100.", "But by smaller amounts: MR falls 28, 24, 20, 16, 12.", "If MR became negative, selling another dress would reduce TR.", "So TR is at its maximum where MR = 0."], modelAnswer: "Total revenue rises from US\\$28 to US\\$52, 72, 88 and 100, but by smaller and smaller amounts, because MR falls from 28 to 24, 20, 16 and 12. If MR became negative, the loss on the earlier dresses would be bigger than the price of the extra one, so total revenue would fall; TR is highest where MR is zero." }),
      ];
    })(),
    explanation: "(a) US\\$72. (b) US\\$24. (c) US\\$16. (d) The price cut on earlier units. (e) TR rises by less as MR falls; negative MR reduces TR.",
    hints: ["TR = price × quantity at each row.", "MR = change in TR."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional mobile network company in a southern African country is considering a 20% cut in the price of its data bundles to increase its revenue. Two other networks sell similar bundles.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Define **average revenue**.", points: ["Total revenue divided by the quantity sold.", "Equal to the price when all units are sold at one price."], modelAnswer: "Average revenue is total revenue divided by the number of units sold; when every unit is sold at the same price it equals the price." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the price cut will increase the company's total revenue.",
        points: [
          "Yes: if demand is price elastic (close substitutes from two rival networks), sales rise by more than 20%, so TR rises.",
          "Yes: may attract customers from rivals and new users; more data use per customer.",
          "No: rivals may match the cut, so few customers switch; sales rise little and TR falls.",
          "No: if demand is inelastic (customers locked in to their number / few alternatives), TR falls.",
          "Other factors: network capacity / quality, consumers' incomes, time for customers to respond.",
          "Justified conclusion.",
        ],
        hints: ["What will the other two networks do?"],
        modelAnswer: "If demand for this network's data is price elastic because two rivals sell similar bundles, a 20% price cut could raise sales by more than 20% as customers switch and existing users buy more data, so total revenue would rise. However, the rivals are likely to match the cut, in which case few customers switch, sales rise only a little and revenue falls. Some customers may also be reluctant to change their number, making demand less elastic. Revenue is likely to rise only in the short run, before rivals respond; unless the company has a quality advantage that keeps customers after rivals cut their prices, the cut is risky.",
      }),
    ],
    explanation: "(a) TR ÷ quantity = price. (b) Elasticity and rivals' reactions decide the effect on revenue.",
    hints: ["Link the result to price elasticity of demand."],
  });

  b.card("DEFINITION", "Total revenue (TR)", "The income from sales: price × quantity sold.");
  b.card("DEFINITION", "Average revenue (AR)", "TR ÷ quantity sold; equal to the price when all units sell at one price.");
  b.card("DEFINITION", "Marginal revenue (MR)", "The change in TR from selling one more unit: ΔTR ÷ ΔQ.", null, { applies: ZIM });
  b.card("FACT", "Revenue of a price taker", "Price = AR = MR at every output; TR rises in a straight line from the origin.", null, { applies: ZIM });
  b.card("CONCEPT", "Why is MR below price when a firm must cut its price to sell more?", "The lower price applies to all units, so revenue is lost on the earlier units.", null, { applies: ZIM });
  b.card("FACT", "What happens to total revenue when price falls and demand is elastic?", "TR rises: the percentage rise in sales is bigger than the percentage fall in price.");
  b.card("FACT", "What happens to total revenue when price rises and demand is inelastic?", "TR rises: sales fall by a smaller percentage than the price rises.");
  b.card("CONCEPT", "Revenue versus profit", "Revenue is income from sales; profit = total revenue − total cost.");
  b.card("CONCEPT", "How sales influence revenue", "More sales at the same price raise TR; advertising, quality, new markets and rising incomes can raise sales.");
});
