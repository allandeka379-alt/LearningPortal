// W3b: mix.pricing
import { concept, P, chk, money, costing, ratios, table, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.mix.pricing", { file: "mix/pricing", keyPrefix: "mix.pricing" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A firm launches a new product at a high price to earn a large profit on each unit from buyers who will pay more. This is",
    ok: ["price skimming", "Correct: a high launch price aimed at early buyers."],
    bad: [["penetration pricing", "Penetration uses a low launch price to win share."], ["cost-plus pricing", "Cost-plus adds a mark-up to unit cost; it is not defined by a high launch price."], ["psychological pricing", "Psychological pricing uses figures such as 4.95, not a high launch price."]],
    explanation: "Skimming sets a high price at launch and lowers it later.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "Which of these is a pricing method that sets the price by adding a percentage to the cost of each unit?",
    ok: ["Cost-plus pricing", "Correct: unit cost plus a mark-up."],
    bad: [["Competitive pricing", "Competitive pricing follows rivals' prices."], ["Dynamic pricing", "Dynamic pricing changes prices quickly with demand."], ["Price discrimination", "Discrimination charges different groups different prices."]],
    explanation: "Cost-plus (mark-up) pricing starts from the cost per unit.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is the **best** example of price discrimination?",
    ok: ["A cinema charges students less than adults for the same seat", "Correct: the same product is sold at different prices to different groups."],
    bad: [["A shop lowers all its prices to clear stock before the new season", "A general sale is the same price to everyone; it is not discrimination."], ["A baker charges more for a larger loaf than for a small loaf", "A larger loaf is a different product with different costs."], ["A shop sets a price of US\\$4.95 instead of US\\$5.00", "That is psychological pricing, not discrimination."]],
    explanation: "Price discrimination means different prices for the same product for different groups or times.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Why might a business choose penetration pricing for a new brand of soap?",
    ok: ["To win a large share of the market quickly", "Correct: a low launch price attracts many buyers and builds the customer base."],
    bad: [["To earn the highest possible profit on each bar", "A low price means a lower profit per unit."], ["To give the brand an exclusive, luxury image", "A luxury image is linked to a high price."], ["To discourage buyers who are not sensitive to price", "Penetration pricing is aimed at price-sensitive buyers, not away from them."]],
    explanation: "Penetration trades low profit per unit for market share.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional shop in Gweru has a full cost of US\\$8 on a pair of school shoes and adds a mark-up of 25%. Its profit margin on the selling price is",
    ok: ["20%", "Correct: profit 2 ÷ price 10 × 100."],
    bad: [["25%", "That is the mark-up, based on cost, not the margin."], ["80%", "That is cost as a percentage of price."], ["30%", "No step produces 30%."]],
    hints: ["Find the selling price first: cost plus the mark-up."],
    explanation: "Price = 8 × 1.25 = 10. Profit = 2. Margin = 2 ÷ 10 × 100 = 20%.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Demand for a fictional brand of cooking oil is price elastic. Which statement about a price rise follows?",
    ok: ["Total revenue is likely to fall, because sales fall by a greater percentage", "Correct: with elastic demand quantity responds more than price."],
    bad: [["Total revenue is likely to rise, because customers do not respond to prices", "That would describe inelastic demand."], ["Total revenue will stay the same whatever the size of the rise", "Revenue changes unless elasticity is exactly 1."], ["Profit is certain to rise because the price per unit is higher", "Fewer sales and fixed costs may lower profit."]],
    hints: ["Compare the percentage fall in sales with the percentage rise in price."],
    explanation: "When demand is elastic, a price rise cuts quantity by a larger percentage, so revenue falls.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional airline uses dynamic pricing online. Which is the **most likely disadvantage** for the firm?",
    ok: ["Customers may distrust prices that keep changing", "Correct: unpredictable prices can reduce trust and loyalty."],
    bad: [["The firm cannot respond to rivals' price changes", "Dynamic pricing allows quick reaction to rivals."], ["The price must always equal the cost of the seat", "Dynamic pricing is not linked to a fixed mark-up."], ["Prices can only be changed once a year", "It allows frequent changes."]],
    hints: ["Think about how a customer feels when a price changes between two visits."],
    explanation: "Frequent changes can damage trust. The other statements describe the opposite of dynamic pricing.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional firm sells a unique, patented garden tool. Which is the **best-supported judgement** about its launch price?",
    ok: ["Skimming is likely to suit it if buyers value the feature and rivals cannot copy", "Correct: it names the conditions that make a high price work."],
    bad: [["Penetration is always better because it increases the sales of a firm", "More sales do not always mean more profit; the claim ignores the unique feature."], ["The price should equal that of the cheapest rival, whatever the cost", "A price below cost could cause losses and ignores the unique feature."], ["Price makes no difference to the profit made on a patented product", "Price strongly affects both revenue and profit."]],
    hints: ["A strong judgement names the condition under which the method works."],
    explanation: "Skimming works where the product is hard to copy and some buyers will pay a premium.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A mark-up of 40% on cost gives a profit margin of 40% on the selling price.",
    answer: false,
    explanation: "False. A 40% mark-up gives a margin of 40 ÷ 140 × 100 = 28.6%. The margin is smaller because it is a percentage of the higher selling price.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In penetration pricing the price is usually set low at launch and raised later.",
    answer: true,
    explanation: "True. Penetration pricing begins with a low price to win share and may raise the price once the product is established.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pricing method to its description.",
    pairs: [["Cost-plus", "Add a percentage mark-up to the cost per unit"], ["Competitive", "Set a price close to rivals' prices"], ["Psychological", "Use a price such as US\\$4.95 rather than US\\$5.00"], ["Dynamic", "Change the price quickly as demand or stock changes"]],
    explanation: "Each method has a distinct rule for setting the price.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Mark-up is profit as a percentage of {{blank:a}}, while profit margin is profit as a percentage of {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["cost"], choices: ["cost", "selling price", "revenue"] },
      { id: "b", accepted: ["selling price"], choices: ["cost", "selling price", "overheads"] },
    ],
    explanation: "Mark-up is based on cost; margin is based on the selling price.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** factor that a business should consider when deciding its price.",
    accepted: ["cost", "costs", "competition", "competitors", "demand", "market conditions", "objectives", "business objectives", "cost of production", "prices of rivals", "customers' ability to pay"],
    explanation: "Costs, competition, demand, market conditions and the firm's objectives all influence price.",
  });

  {
    const cost = 6.8, markup = 25;
    const price = costing.priceFromMarkUp(cost, markup);
    chk(price, 8.5);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional craft shop in Victoria Falls pays ${money(cost)} for each carved bowl and adds a mark-up of ${markup}% on cost. What is the selling price of a bowl?`,
      kind: "money", value: price, wrong: [cost / (1 - markup / 100), cost + markup / 100],
      explanation: `Price = 6.80 × 1.25 = US\\$8.50. Treating 25% as a margin on price gives US\\$9.07, and adding 0.25 to the cost gives US\\$7.05.`,
    });
  }
  {
    const markup = 60;
    const margin = ratios.marginFromMarkUp(markup);
    chk(margin, 37.5, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION",
      stem: "A fictional wholesaler uses a mark-up of 60% on cost. What profit margin on the selling price does this give? Give your answer as a percentage to one decimal place.",
      kind: "pct", value: margin, wrong: [60, 62.5],
      hints: ["Take a cost of 100, find the price and then the profit as a share of that price."],
      explanation: "If cost is 100, the price is 160 and the profit is 60. Margin = 60 ÷ 160 × 100 = 37.5%. Using 60% repeats the mark-up, and 62.5% is cost as a share of price (100 ÷ 160).",
    });
  }
  {
    const direct = 2.1, oh = 9000, out = 5000, markup = 30;
    const unitOh = oh / out;
    const full = costing.fullCostPerUnit(direct, oh, out);
    const price = costing.priceFromMarkUp(full, markup);
    chk(unitOh, 1.8); chk(full, 3.9); chk(price, 5.07);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional furniture workshop in Bulawayo makes ${out.toLocaleString("en-GB")} stools a month. Direct costs are ${money(direct)} a stool and monthly overheads are ${money(oh)}, shared equally between the stools. The owner adds a 30% mark-up on full cost. Calculate the selling price of a stool.`,
      kind: "money", value: price, wrong: [direct * 1.3, full + 0.3],
      hints: ["Share the overheads over the stools to find the full cost per stool first."],
      workedSolution: "1. Overheads per stool = 9,000 ÷ 5,000 = US\\$1.80.\n2. Full cost = 2.10 + 1.80 = US\\$3.90.\n3. Price = 3.90 × 1.30 = US\\$5.07.",
      explanation: "Full cost is US\\$3.90 and the 30% mark-up gives US\\$5.07. Leaving out overheads gives US\\$2.73, and adding 30 cents instead of 30% gives US\\$4.20.",
    });
  }
  {
    const p0 = 4, p1 = 3.6, q0 = 5000, q1 = 5900;
    const r0 = elasticityRevenue(p0, q0), r1 = elasticityRevenue(p1, q1);
    chk(r0, 20000); chk(r1, 21240);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional dairy cuts the price of a litre of milk from ${money(p0)} to ${money(p1)}. Weekly sales rise from ${q0.toLocaleString("en-GB")} litres to ${q1.toLocaleString("en-GB")} litres. By how much does weekly revenue increase?`,
      kind: "money", value: r1 - r0, wrong: [r1, (p0 - p1) * q1],
      hints: ["Work out revenue before and after: price × quantity."],
      workedSolution: "1. Revenue before = 4.00 × 5,000 = US\\$20,000.\n2. Revenue after = 3.60 × 5,900 = US\\$21,240.\n3. Increase = 21,240 − 20,000 = US\\$1,240.",
      explanation: "Revenue rises by US\\$1,240, which suggests demand is elastic over this range. US\\$21,240 is the new revenue, not the increase.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** advantage of cost-plus pricing.",
    points: ["It is simple and quick to calculate from known costs", "It ensures that each unit sold covers its cost and a planned profit (if sales reach the expected level)"],
    modelAnswer: "Cost-plus pricing is simple and quick because the manager only needs the cost per unit and a percentage. It also builds a planned profit into every unit, provided the expected number of units is sold.",
    explanation: "One mark for the reason and one for developing it.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Chipo owns a fictional shop that sells school uniforms in Masvingo. A rival opens next door and charges less for the same items. Explain **two** ways in which Chipo could respond using pricing.",
    points: ["Match the rival's prices to keep her customers", "Application: matching reduces her margin on the uniforms, so she must check that she still covers her costs", "Offer a discount or a price promotion on selected items, such as a bundle of shirt and trousers", "Application: parents may buy the full uniform from her, raising sales without lowering every price"],
    modelAnswer: "Chipo could match the rival's prices to keep her customers, but this reduces her margin on uniforms, so she must check that costs are still covered. She could instead give a discount on a bundle of shirt and trousers, so parents buy the full uniform from her without every item being cheaper.",
    hints: ["Think about matching the price and about a targeted discount."],
    explanation: "Two responses, each developed with the shop.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why a business may find it difficult to raise a price after using penetration pricing.",
    points: ["Customers have become used to the low price and see it as the normal price", "A rise may make buyers switch to rivals", "The original buyers were price-sensitive, so sales may fall sharply", "Lost sales reduce revenue and may prevent the firm from covering the cost of its launch"],
    modelAnswer: "Customers come to expect the low price, so a rise may seem unfair. Because the first buyers were attracted by price, many may switch to rivals, and the fall in sales may offset the higher price, leaving revenue and profit lower than expected.",
    hints: ["Think of the customers that penetration pricing attracts."],
    explanation: "A chain from customer expectation to lower sales and revenue.",
  });

  {
    const peak = 1.2, offp = 0.8, qp = 300, qo = 180;
    const revP = peak * qp, revO = offp * qo, tot = revP + revO;
    chk(tot, 504);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true,
      stem: `A fictional minibus operator in Gweru charges a fare of ${money(peak)} in the morning and evening peaks and ${money(offp)} at other times for the same journey. On a typical day ${qp} passengers travel in the peaks and ${qo} at other times. The owner says the lower fare fills seats that would otherwise be empty.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the operator's total daily revenue from fares.", kind: "money", value: tot, wrong: [revP, (peak + offp) * (qp + qo)], explanation: "Peak revenue = 1.20 × 300 = 360. Other times = 0.80 × 180 = 144. Total = US\\$504." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which pricing method is the operator using?", options: [["Price discrimination", "Correct: the same journey is sold at different prices at different times."], ["Penetration pricing", "The fares are not a low launch price to win share."], ["Cost-plus pricing", "The fares are not set by adding a mark-up to the cost of each trip."], ["Price skimming", "The fares are not a high launch price for a new product."]], answer: "A", explanation: "Different fares for the same journey at different times is price discrimination." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** benefit to the operator of charging a lower fare outside the peaks.", points: ["Seats that would be empty bring in some revenue", "Application: the 180 off-peak passengers add US\\$144 to daily revenue", "The cost of running the bus is largely fixed, so extra passengers add little cost and raise profit"], modelAnswer: "Off-peak seats would otherwise be empty, so the 180 passengers add US\\$144 a day. Because most of the cost of running the bus is fixed, the extra revenue adds a lot to profit.", hints: ["Think about what the extra passengers cost the operator."], explanation: "A benefit, applied with the figure, and its effect on profit." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the operator should reduce the off-peak fare further.", points: ["A lower fare may attract more passengers, raising revenue if demand is elastic", "It may also draw peak passengers into off-peak times, which lowers revenue", "Judgement with a reason, for example: only if the extra off-peak passengers outweigh the loss of income per passenger"], modelAnswer: "A lower off-peak fare could bring more passengers if they are price sensitive, and the buses have spare seats. But some peak travellers might change their travel time, which would reduce income. A further cut is worthwhile only if the extra passengers increase total revenue.", hints: ["Weigh extra passengers against the lower fare for everyone."], explanation: "An argument for, an argument against and a conditional judgement." }),
      ],
      hints: ["Revenue is the fare multiplied by the passengers at each fare."],
      explanation: "Total daily revenue is US\\$504; the method is price discrimination; its benefit comes from filling spare seats.",
    });
  }
  {
    const direct = 5.5, oh = 12000, out = 4000, markup = 40;
    const full = costing.fullCostPerUnit(direct, oh, out);
    const cp = costing.priceFromMarkUp(full, markup);
    chk(full, 8.5); chk(cp, 11.9); chk(1500 * (18 - direct) - oh, 6750); chk(4000 * (cp - direct) - oh, 13600);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Tendai Naturals is a fictional business in Harare launching a new herbal skin cream, with no close rival. It plans to make ${out.toLocaleString("en-GB")} jars a month. Direct costs are ${money(direct)} a jar and monthly overheads are ${money(oh)}. The owner is considering either a cost-plus price using a 40% mark-up on full cost, or a skimming price of US\\$18 a jar for the first six months. Market research suggests that about 1,500 customers would buy at US\\$18 and about 4,000 at the cost-plus price.`,
      parts: [
        P.num({ label: "(a)", marks: 3, stem: "Calculate the cost-plus selling price of a jar. Assume the overheads are shared over 4,000 jars.", kind: "money", value: cp, type: "CALCULATION", calculator: true, wrong: [direct * 1.4, full + 0.4], explanation: "Overheads per jar = 12,000 ÷ 4,000 = 3.00. Full cost = 5.50 + 3.00 = 8.50. Price = 8.50 × 1.40 = US\\$11.90.", workedSolution: "1. Overheads per jar = 12,000 ÷ 4,000 = US\\$3.00.\n2. Full cost = 5.50 + 3.00 = US\\$8.50.\n3. Price = 8.50 × 1.40 = US\\$11.90." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain why skimming may suit this product.", points: ["The cream has no close rival, so buyers have little alternative", "Application: some customers will pay US\\$18 for a natural product", "A high price earns a large profit per jar early, helping cash flow"], modelAnswer: "There is no close rival, so buyers have little alternative and some will pay US\\$18 for a natural product. The high price earns a large profit on each jar early on, which helps cash flow after the launch.", hints: ["Use 'no close rival' from the case."], explanation: "Reason, application and effect." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate which price Tendai Naturals should choose for the launch.", points: ["Skimming earns more on each jar: 18 − 5.50 = US\\$12.50 compared with 11.90 − 5.50 = US\\$6.40", "Total monthly profit after the US\\$12,000 overheads: skimming 1,500 × 12.50 − 12,000 = US\\$6,750; cost-plus 4,000 × 6.40 − 12,000 = US\\$13,600", "Cost-plus reaches more customers and builds a larger market share", "Skimming protects the premium image of a natural product with no close rival", "Skimming sells to fewer buyers and may attract rivals who see the high profit", "Cost-plus may undervalue the product, and a later rise could be hard", ["Judgement with a reason, for example: on these figures cost-plus gives twice the profit", 1], ["Condition or time-frame, for example: re-test the demand at a higher price after six months", 1]], levels: [[1, 1, 3, "Points on pricing with little reference to the case."], [2, 4, 6, "Reasons for each price using the case and some figures."], [3, 7, 8, "Balanced evaluation using the profit figures, with a justified judgement and a condition."]], modelAnswer: "Skimming earns US\\$12.50 on each jar but only 1,500 customers would buy, so profit after overheads is 1,500 × 12.50 − 12,000 = US\\$6,750. At US\\$11.90 each jar earns US\\$6.40 and 4,000 would be sold, giving 4,000 × 6.40 − 12,000 = US\\$13,600, about twice as much. Skimming protects the premium image and suits a product with no close rival, but it reaches fewer customers and may attract rivals. Tendai should choose the cost-plus price for the launch because it gives the higher profit and a larger customer base, and then test a higher price after six months once the brand is known.", hints: ["Calculate the profit after overheads for each price using the research figures."], explanation: "Skimming profit after overheads is US\\$6,750 and cost-plus is US\\$13,600, so the figures favour cost-plus; the judgement should name a condition such as re-testing the demand." }),
      ],
      hints: ["Share the overheads over the jars first."],
      explanation: "Cost-plus price US\\$11.90. On the research figures skimming earns US\\$6,750 a month after overheads and cost-plus earns US\\$13,600.",
    });
  }

  b.card("DEFINITION", "Cost-plus pricing", "Setting the price by adding a mark-up (a percentage of cost) to the cost per unit.");
  b.card("FORMULA", "Mark-up and profit margin", "Mark-up (%) = profit ÷ cost × 100. Profit margin (%) = profit ÷ selling price × 100. The margin is smaller than the mark-up.");
  b.card("DEFINITION", "Price skimming", "A high price at launch to earn a large profit per unit from early buyers; the price is usually lowered later.");
  b.card("DEFINITION", "Penetration pricing", "A low price at launch to win market share quickly; the price may be raised later.");
  b.card("DEFINITION", "Price discrimination", "Charging different prices to different customers or at different times for the same product.");
  b.card("DEFINITION", "Dynamic pricing", "Changing the price quickly as demand, stock or rivals' prices change, common in online sales and transport.");
  b.card("DEFINITION", "Psychological pricing", "Setting prices such as US\\$4.95 instead of US\\$5.00 because buyers may see them as lower.");
  b.card("FACT", "Factors that decide price", "Costs, competition, demand and customers' sensitivity to price, market conditions and the firm's objectives.");
  b.card("CONCEPT", "Price and elasticity", "If demand is elastic a price cut raises revenue; if inelastic a price rise raises revenue.");
});

function elasticityRevenue(p, q) {
  return p * q;
}
