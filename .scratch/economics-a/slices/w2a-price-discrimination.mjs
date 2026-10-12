// W2a: price discrimination (both boards; ZIMSEC Form 6, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, thirdDegree, pedPoint, table, pctChange } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Single-price monopoly for two linear markets P = a1 - 2Q and P = a2 - 2Q with constant marginal cost mc (both markets served).
const singlePrice = (a1, a2, mc) => {
  // Q = (a1 - P)/2 + (a2 - P)/2 = (a1 + a2)/2 - P, so P = (a1 + a2)/2 - Q and MR = (a1 + a2)/2 - 2Q
  const k = (a1 + a2) / 2;
  const q = (k - mc) / 2;
  const p = k - q;
  if (p >= Math.min(a1, a2)) throw new Error("single price: the smaller market is not served");
  return { q, p, q1: (a1 - p) / 2, q2: (a2 - p) / 2, profit: (p - mc) * q };
};

concept("aecon.firms.price-discrimination", { file: "firms/price-discrimination", keyPrefix: "firms.price-discrimination" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  // lesson numbers
  const L = thirdDegree({ markets: [{ a: 50, b: 2 }, { a: 34, b: 2 }], mc: 10 });
  chk(L.rows[0].q, 10); chk(L.rows[0].p, 30); chk(L.rows[1].q, 6); chk(L.rows[1].p, 22); chk(L.revenue, 432);
  const Ls = singlePrice(50, 34, 10);
  chk(Ls.q, 16); chk(Ls.p, 26); chk(Ls.profit, 256);
  // question numbers
  const Q = thirdDegree({ markets: [{ a: 58, b: 2 }, { a: 26, b: 2 }], mc: 10 });
  chk(Q.rows[0].q, 12); chk(Q.rows[0].p, 34); chk(Q.rows[1].q, 4); chk(Q.rows[1].p, 18); chk(Q.revenue, 480);
  chk(0.5 * (58 - 10) * ((58 - 10) / 2), 576);
  chk((34 - 10) * 12, 288);
  // struct numbers
  const S = thirdDegree({ markets: [{ a: 46, b: 2 }, { a: 30, b: 2 }], mc: 10 });
  chk(S.rows[0].q, 9); chk(S.rows[0].p, 28); chk(S.rows[1].q, 5); chk(S.rows[1].p, 20); chk(S.revenue, 352);
  const sDisc = (28 - 10) * 9 + (20 - 10) * 5;
  chk(sDisc, 212);
  const Ss = singlePrice(46, 30, 10);
  chk(Ss.q, 14); chk(Ss.p, 24); chk(Ss.profit, 196); chk(Ss.q1, 11); chk(Ss.q2, 3);
  chk(Math.abs(pedPoint({ a: 46, p: 28 })) < Math.abs(pedPoint({ a: 30, p: 20 })) ? 1 : 0, 1);

  mc({ d: 1, skill: "RECALL", stem: "Price discrimination is the practice of",
    explanation: "Price discrimination charges different prices for the same good to different consumers or groups, for reasons not related to cost." },
    ["charging different prices for the same product to different groups", "Correct."], [["charging a price below the cost of production to drive out rivals", "That is predatory pricing."], ["charging different prices to different customers because costs differ", "Cost-related differences are not discrimination."], ["setting the same price for every consumer", "That is a uniform price."]]);

  mc({ d: 1, skill: "RECALL", stem: "First-degree (perfect) price discrimination means that",
    explanation: "Each consumer is charged the maximum price he or she is willing to pay, so all consumer surplus goes to the seller." },
    ["each consumer pays the maximum he or she is willing to pay", "Correct."], [["different groups are charged different prices in separate markets", "That is third-degree discrimination."], ["the price depends on the quantity bought by each customer", "That is second-degree discrimination."], ["the government sets different prices", "That is not price discrimination by a firm."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following is a condition for price discrimination?",
    explanation: "Markets must be separable, so consumers who pay the low price cannot resell to those who would pay the high price." },
    ["The firm can prevent resale between the markets", "Correct."], [["The firm is a price-taker", "A price-taker cannot choose its price."], ["Demand has the same elasticity in all markets", "Different elasticities are needed."], ["Costs are different in each market", "Differences in cost are not required and are not discrimination."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A firm practising third-degree price discrimination will charge the higher price in the market where",
    explanation: "Demand is less elastic there, so a higher price loses fewer customers." },
    ["demand is less price elastic", "Correct."], [["demand is more price elastic", "That market gets the lower price."], ["marginal cost is lower", "Marginal cost is assumed the same in all markets."], ["there are fewer buyers whatever the elasticity", "The number of buyers does not decide the price; elasticity does."]]);

  mc({ d: 2, skill: "APPLICATION", stem: "A bus company charges students a lower fare than other adults, and students must show a card. This is an example of",
    explanation: "Different groups in separate markets are charged different prices: third-degree price discrimination, with the card keeping the markets separate." },
    ["third-degree price discrimination", "Correct."], [["first-degree price discrimination", "That charges each person a different price."], ["second-degree price discrimination", "That varies the price with the quantity bought."], ["predatory pricing", "The fare is not below cost to drive out rivals."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Is the price difference linked to cost?"],
    stem: "An electricity company charges more per unit at peak hours than off peak because it must use costly extra generators at peak hours. This is",
    explanation: "The price difference reflects a difference in the cost of supply, so it is not price discrimination." },
    ["not price discrimination, because the price reflects cost", "Correct."], [["price discrimination, because prices differ over time", "Discrimination requires price differences not based on cost."], ["first-degree price discrimination", "Consumers are not charged their maximum willingness to pay."], ["predatory pricing", "Peak pricing is not aimed at removing rivals."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Which market has the more elastic demand?"],
    stem: "Price elasticity of demand is −1.5 in the adult market and −2.5 in the student market for a theatre. To maximise profit the theatre should",
    explanation: "Demand is more elastic among students, so a lower price there gains many customers; the less elastic adult market is charged more." },
    ["charge students a lower price than adults", "Correct."], [["charge students a higher price than adults", "Demand is more elastic among students."], ["charge both groups the same price", "Different elasticities make discrimination profitable."], ["charge adults a lower price than students", "Adults have the less elastic demand."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about who may be served only because of discrimination."],
    stem: "Price discrimination is most likely to benefit consumers as a whole when it",
    explanation: "If discrimination lets a firm serve a group that a single price would price out, output rises and more consumers are served." },
    ["lets the firm serve consumers who would be priced out at a single price", "Correct."], [["reduces the output of the firm", "Lower output is a cost to consumers."], ["transfers all consumer surplus to the firm in every market", "That harms consumers."], ["is used only against consumers with no alternative", "A captive group is a strong case against discrimination."]]);

  {
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: Q.rows[0].q, unit: "units", hints: ["Set MR = MC in the adult market."],
      wrong: [24, 6, 29],
      stem: "A fictional cinema has a constant marginal cost of US\\$10 per seat. Demand from adults is P = 58 − 2Q (MR = 58 − 4Q), where Q is the number of seats in hundreds. Calculate the profit-maximising number of seats (hundreds) sold to adults.",
      explanation: "58 − 4Q = 10 gives Q = 12 hundred seats." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: Q.rows[1].p, hints: ["Find Q from MR = MC, then read the price from the demand curve."],
      wrong: [10, 26, 4],
      stem: "Student demand for the cinema is P = 26 − 2Q (MR = 26 − 4Q). Marginal cost is US\\$10. Calculate the price charged to students, in US\\$.",
      explanation: "26 − 4Q = 10 gives Q = 4; P = 26 − 2 × 4 = US\\$18." });
  }
  {
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "money", value: Q.revenue, hints: ["Revenue = price × quantity in each market."],
      wrong: [408, 72, 432],
      stem: "The cinema sells 12 hundred seats to adults at US\\$34 and 4 hundred seats to students at US\\$18. Calculate its total revenue, in US\\$ hundred.",
      explanation: "1. Adults: 34 × 12 = 408.\n2. Students: 18 × 4 = 72.\n3. Total revenue = 408 + 72 = US\\$480 hundred." });
  }
  {
    const v = 0.5 * (58 - 10) * ((58 - 10) / 2);
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: v, hints: ["Perfect discrimination: sell until price falls to MC; profit is the triangle between demand and MC."],
      wrong: [288, 408, 1152],
      stem: "If the cinema could practise first-degree price discrimination in the adult market (demand P = 58 − 2Q, marginal cost US\\$10), it would sell until price equals marginal cost. Calculate its profit (before fixed costs) in US\\$ hundred.",
      explanation: "Output: 58 − 2Q = 10 gives Q = 24. Profit is the triangle between the demand curve and MC: ½ × (58 − 10) × 24 = US\\$576 hundred. A single price would give only (34 − 10) × 12 = 288." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A firm that is a price-taker can practise price discrimination.", answer: false,
    explanation: "False. Price discrimination requires market power: the firm must be able to choose its price." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each type of price discrimination with an example.",
    pairs: [["First degree", "Each buyer pays what he or she is willing to pay in an auction or negotiation"], ["Second degree", "A lower unit price for each extra block of electricity used"], ["Third degree", "Cheaper tickets for students and pensioners"]],
    extraRight: ["Higher prices at peak times because of higher costs"],
    explanation: "The last example reflects cost, so it is not discrimination." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "To maximise profit a discriminating firm sets {{blank:a}} equal to marginal cost in {{blank:b}} market.",
    blanks: [{ id: "a", accepted: ["marginal revenue"], choices: ["marginal revenue", "average revenue", "average cost"] }, { id: "b", accepted: ["each"], choices: ["each", "only one", "the combined"] }],
    explanation: "MR = MC in each separate market." });

  b.short({ d: 2, skill: "RECALL", stem: "What word describes the resale of a product by those who buy it at the low price to those in the high-price market?",
    accepted: ["seepage", "resale", "arbitrage", "leakage"], wrong: ["discount"],
    explanation: "Seepage (arbitrage) must be prevented for discrimination to work." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "State **three** conditions necessary for price discrimination.",
    points: ["The firm must have market power (be a price-maker).", "The markets must be separable (no resale between them).", "Price elasticity of demand must differ between the markets."],
    modelAnswer: "The firm must have market power so that it can set its price; the markets must be kept apart so that buyers cannot resell; and the price elasticity of demand must be different in the different markets.", explanation: "Three conditions." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Relate price to elasticity."],
    stem: "Explain why a firm practising third-degree price discrimination charges a lower price in the market with the more elastic demand.",
    points: ["With more elastic demand a price cut raises quantity by a larger percentage.", "So the price cut raises revenue.", "The firm sets MR = MC in each market, which gives a lower price where demand is more elastic.", "Where demand is less elastic a higher price loses fewer customers, so the price is higher."],
    modelAnswer: "In the market with elastic demand, a lower price leads to a larger percentage rise in quantity, so revenue increases. The firm sets marginal revenue equal to marginal cost in each market, which gives a lower price where demand is more elastic. Where demand is inelastic a higher price loses few customers, so the firm charges more.",
    explanation: "MR = MC in each market gives a price that depends on elasticity." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Winners and losers; efficiency; cross-subsidy."],
    stem: "Assess the effects of price discrimination on consumers.",
    points: ["Consumers in the low-price market pay less and some can now buy.", "Consumers in the high-price market pay more.", "The firm gains more consumer surplus; perfect discrimination removes it all.", "Profit may fund a service that would not exist otherwise (cross-subsidy), and output may rise.", "Judgement."],
    modelAnswer: "Consumers in the low-price market, such as students, pay less and some are able to buy who otherwise could not, while consumers in the high-price market pay more. The firm gains consumer surplus, and under perfect discrimination all of it. However, the extra profit may keep a service in operation, such as a rural route, and output may rise if new consumers are served. Overall, discrimination benefits some groups and harms others; it is more favourable to consumers when output rises.",
    explanation: "Winners, losers and judgement." });

  {
    const md = table(["Market", "Demand curve", "Marginal revenue"], [["Adults (A)", "P = 46 − 2Q", "46 − 4Q"], ["Students (B)", "P = 30 − 2Q", "30 − 4Q"]], { align: ["l", "l", "l"] });
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Set MR = 10 in each market.", "Read each price from its own demand curve."],
      stem: `A fictional minibus company in Masvingo serves two groups. Its marginal cost is a constant US\\$10 per passenger. Q is in hundreds of passengers and P in US\\$ (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: S.rows[0].p, stem: "Calculate the fare charged to adults when profit is maximised, in US\\$.", wrong: [10, 18, 46], explanation: "46 − 4Q = 10 gives Q = 9; P = 46 − 18 = US\\$28." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: S.rows[1].q, unit: "units", stem: "Calculate the number of student passengers (in hundreds).", wrong: [4, 10, 3], explanation: "30 − 4Q = 10 gives Q = 5 hundred." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which group has the more price elastic demand at the profit-maximising fares?", options: [["Students", "Correct: PED is about −2.0 for students against about −1.56 for adults."], ["Adults", "Adults are charged the higher fare because their demand is less elastic."], ["Both groups equally", "The fares differ because the elasticities differ."], ["Neither, because demand is a straight line", "Elasticity changes along a straight-line demand curve."]], answer: "A", explanation: "PED = −P ÷ (a − P): adults −28 ÷ 18 = −1.56; students −20 ÷ 10 = −2.00." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **two** conditions that the company needs to maintain this pricing.", points: ["Market power: the company can choose its fares (no close competitors on the route).", "Separation of the markets: students must show a card so adults cannot buy cheap tickets.", "Different elasticities of demand (students are more price sensitive)."],
          modelAnswer: "The company needs market power, so that it can set fares rather than accept a market price. It also needs to keep the markets apart, for example by checking student cards, so that adults cannot buy the cheap tickets." }),
      ],
      explanation: "Adults pay US\\$28 (9 hundred); students pay US\\$20 (5 hundred); students' demand is more elastic." });
  }
  {
    b.struct({ d: 5, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Compare total profit under the two pricing policies.", "Profit before fixed costs = (price − 10) × quantity."],
      stem: "The minibus company in the previous item has two groups: adults (P = 46 − 2Q) and students (P = 30 − 2Q), with marginal cost of US\\$10 and Q in hundreds of passengers. If it charged the same fare to everyone, the combined demand would be P = 38 − Q (for fares below US\\$30), giving MR = 38 − 2Q.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: Ss.p, stem: "Calculate the single fare that maximises profit, in US\\$.", wrong: [10, 28, 38], explanation: "38 − 2Q = 10 gives Q = 14; P = 38 − 14 = US\\$24." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: Ss.profit, stem: "Calculate profit (before fixed costs) at the single fare, in US\\$ hundred.", wrong: [336, 212, 14], explanation: "(24 − 10) × 14 = US\\$196 hundred." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: sDisc, stem: "With separate fares of US\\$28 (9 hundred adults) and US\\$20 (5 hundred students), calculate profit before fixed costs, in US\\$ hundred.", wrong: [352, 196, 18], explanation: "(28 − 10) × 9 + (20 − 10) × 5 = 162 + 50 = US\\$212 hundred." }),
        P.num({ label: "(d)", marks: 2, kind: "pct", value: ((212 - 196) / 196) * 100, dp: 1, unit: "%", stem: "Calculate the percentage increase in profit from discrimination, to one decimal place.", wrong: [16, 7.5, 8.9], explanation: "(212 − 196) ÷ 196 × 100 = 8.2%." }),
        P.manual({ label: "(e)", marks: 4, stem: "Assess who gains and who loses when the company moves from a single fare to separate fares.", points: ["The company gains: profit rises by US\\$16 hundred.", "Adults lose: fare rises from US\\$24 to US\\$28 and passengers fall from 11 to 9 hundred.", "Students gain: fare falls from US\\$24 to US\\$20 and passengers rise from 3 to 5 hundred.", "Total passengers are unchanged at 14 hundred; judgement on overall welfare."],
          modelAnswer: "The company gains because profit rises from US\\$196 hundred to US\\$212 hundred. Adults lose, because their fare rises from US\\$24 to US\\$28 and their numbers fall from 11 to 9 hundred. Students gain, because their fare falls from US\\$24 to US\\$20 and their numbers rise from 3 to 5 hundred. The total number of passengers stays at 14 hundred, so there is no overall gain in output, and whether the change is desirable depends on how society values the benefit to students against the loss to adults." }),
      ],
      explanation: "Single fare US\\$24 gives profit 196; discrimination gives 212 (+8.2%); adults lose, students gain, total passengers unchanged." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider winners and losers, and efficiency."],
    stem: "Assess whether price discrimination is in the interests of consumers.",
    points: ["Consumers in the low-price market pay less and more of them can buy.", "Consumers in the high-price market pay more.", "The firm captures consumer surplus; perfect discrimination removes all of it.", "Output may rise if previously unserved consumers are served.", "Supernormal profit may fund investment or cross-subsidise a loss-making service.", "A firm with market power may use discrimination against groups with no alternative.", "Competition law or regulation may limit the practice.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Price discrimination helps consumers in the low-price market, who pay less and, in some cases, can buy at all, such as students on a bus route. It harms those in the high-price market, who pay more than a single price would require, and the firm captures more of the consumer surplus. If discrimination lets the firm serve consumers who would otherwise be priced out, output rises, and the extra profit can fund investment or keep a loss-making service open. But if the firm charges a higher price to a captive group, such as patients, the effect is harmful. Overall, discrimination is more likely to benefit consumers as a whole when it increases output and when the high-price group has alternatives; otherwise it mainly transfers surplus to the firm.",
    explanation: "Winners, losers and conditions for a favourable outcome." });

  b.card("DEFINITION", "Define **price discrimination**.", "Charging different prices for the same good to different consumers or groups, where the differences do not reflect cost.");
  b.card("CONCEPT", "Three degrees of price discrimination?", "First: each consumer pays their maximum. Second: price varies with quantity bought. Third: different groups in separate markets pay different prices.");
  b.card("CONCEPT", "Three conditions for price discrimination?", "Market power; separable markets (no resale); different price elasticities of demand.");
  b.card("CONCEPT", "Which market gets the higher price?", "The market with less elastic demand; the more elastic market gets the lower price.");
  b.card("FORMULA", "Profit-maximising rule with two markets?", "Set MR = MC in each market and read each price from its own demand curve.");
  b.card("FACT", "Is peak-time pricing based on higher cost price discrimination?", "No: the price difference reflects a cost difference.");
  b.card("CONCEPT", "Effect of perfect discrimination on consumer surplus?", "All consumer surplus is taken by the firm; output rises to where P = MC.");
  b.card("CONCEPT", "How can discrimination help consumers?", "It may let low-income groups buy and may fund a service that would otherwise close (cross-subsidy).");
  b.card("CONCEPT", "Examples of third-degree price discrimination?", "Student and pensioner fares, peak and off-peak tickets, foreign and local visitor prices.");
});
