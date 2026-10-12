// W2a: oligopoly: interdependence, concentration and pricing behaviour (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, concentrationRatio, pctChange, elasticity, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Kinked demand through (q0, p0): the demand line above the kink passes through (qUp, pUp); the line below through (qDown, pDown).
const kink = ({ q0, p0, qUp, pUp, qDown, pDown }) => {
  const sUp = (pUp - p0) / (qUp - q0); // slope of the upper segment
  const sDn = (pDown - p0) / (qDown - q0);
  // P = p0 + s (Q - q0); MR = p0 + s (2Q - q0) - s Q ... derived: TR = Q (p0 + s(Q - q0)), MR = p0 + s(2Q - q0)
  const mr = (s) => p0 + s * (2 * q0 - q0);
  return { pedUp: elasticity.ped({ p1: p0, p2: pUp, q1: q0, q2: qUp }), pedDown: elasticity.ped({ p1: p0, p2: pDown, q1: q0, q2: qDown }), mrUp: mr(sUp), mrDown: mr(sDn) };
};

concept("aecon.firms.oligopoly", { file: "firms/oligopoly", keyPrefix: "firms.oligopoly" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const k1 = kink({ q0: 100, p0: 10, qUp: 60, pUp: 11, qDown: 115, pDown: 9 });
  chk(k1.pedUp, -4, 1e-9); chk(k1.pedDown, -1.5, 1e-9); chk(k1.mrUp, 7.5, 1e-9); chk(k1.mrDown, 10 + (-1 / 15) * 100, 1e-9);
  chk(k1.mrDown, 10 / 3, 1e-9);
  const k2 = kink({ q0: 200, p0: 20, qUp: 140, pUp: 22, qDown: 225, pDown: 18 });
  chk(k2.pedUp, -3, 1e-9); chk(k2.pedDown, -1.25, 1e-9); chk(k2.mrUp, 20 + (-1 / 30) * 200, 1e-9); chk(k2.mrUp, 40 / 3, 1e-9); chk(k2.mrDown, 4, 1e-9);
  const sh = [30, 25, 20, 10, 8, 7];
  chk(sh.reduce((s, x) => s + x, 0), 100);

  mc({ d: 1, skill: "RECALL", stem: "The key feature that distinguishes oligopoly from other market structures is",
    explanation: "In oligopoly a few firms dominate, so each firm's decisions depend on how its rivals will react: interdependence." },
    ["interdependence between a few large firms", "Correct."], [["a very large number of small firms", "That describes perfect competition or monopolistic competition."], ["a single seller", "That is monopoly."], ["identical products sold at the market price", "That describes perfect competition."]]);

  mc({ d: 1, skill: "RECALL", stem: "In the kinked demand curve model, demand above the kink is",
    explanation: "Rivals are assumed not to follow a price rise, so the firm loses many customers: demand is elastic above the kink." },
    ["price elastic", "Correct."], [["price inelastic", "That describes the section below the kink."], ["perfectly inelastic", "Quantity does respond to price above the kink."], ["unrelated to price", "Demand always depends on price."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Oligopolists often prefer non-price competition to price competition mainly because",
    explanation: "A price cut is quickly matched by rivals, so it lowers everyone's revenue without raising the firm's market share." },
    ["a price cut is likely to be matched by rivals", "Correct."], [["price competition is illegal in all countries", "Price competition is legal."], ["demand is perfectly inelastic", "Demand is not perfectly inelastic."], ["costs fall when prices are cut", "Costs do not depend on price in this way."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Price leadership occurs when",
    explanation: "A dominant firm sets the price and the other firms follow, avoiding price competition without a formal agreement." },
    ["one firm sets the price and the others follow", "Correct."], [["firms meet and agree on a common price", "That is overt collusion (a cartel)."], ["a firm sets price below cost to drive out a rival", "That is predatory pricing."], ["the government fixes the price", "That is a price control."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A firm sets a price low enough to discourage new firms from entering. This is called",
    explanation: "Limit pricing: a price above the competitive level but low enough to make entry unprofitable." },
    ["limit pricing", "Correct."], [["predatory pricing", "Predatory pricing drives out existing rivals with prices below cost."], ["price discrimination", "This charges different prices to different customers."], ["price leadership", "This is where one firm's price is followed by others."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Compare with limit pricing."],
    stem: "Predatory pricing involves",
    explanation: "A firm sets price below cost for a time to drive out a rival or deter entry, intending to raise the price afterwards." },
    ["setting price below cost to force rivals out of the market", "Correct."], [["setting a price that all rivals follow", "That is price leadership."], ["charging different prices for the same product", "That is price discrimination."], ["setting a price that just prevents entry but still earns profit", "That is limit pricing."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Where must MC cut the MR curve?"],
    stem: "In the kinked demand model, a firm's marginal cost rises but the price stays the same. This is possible because",
    explanation: "The MR curve has a vertical gap at the kink. If MC still passes through the gap, the profit-maximising output and price are unchanged." },
    ["marginal cost still passes through the gap in the marginal revenue curve", "Correct."], [["demand has become perfectly elastic at the current price", "Demand is kinked, not horizontal."], ["average fixed cost has fallen because output has risen", "Fixed cost does not affect the best output."], ["rivals have all left the industry and firms no longer react to each other", "Interdependence is the basis of the model."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["What does a concentration ratio measure and not measure?"],
    stem: "The four-firm concentration ratio in a market is 90%. This shows that",
    explanation: "The ratio measures the market share of the leaders. It shows the market is concentrated but not whether the firms compete, collude or face the threat of entry." },
    ["the market is highly concentrated, but not whether the firms collude", "Correct."], [["the firms are colluding to fix prices with one another", "Concentration alone does not show collusion."], ["each firm has a 90% share of the whole market", "The ratio is a combined share."], ["entry to the market is impossible for any new firm in the whole industry", "Barriers are not measured by the ratio."]]);

  {
    const v = concentrationRatio(sh, 3);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: v, dp: 0, unit: "%", wrong: [30, 55, 100],
      stem: "Six firms in a fictional market have shares of 30%, 25%, 20%, 10%, 8% and 7%. Calculate the three-firm concentration ratio.",
      explanation: "30 + 25 + 20 = 75%." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "elasticity", value: k2.pedUp, dp: 2, hints: ["Percentage change in quantity ÷ percentage change in price; include the minus sign."],
      wrong: [3, -0.33, 60],
      stem: "A firm sells 200 units at US\\$20. If it raises its price to US\\$22 rivals do not follow and it sells 140 units. Calculate price elasticity of demand above the kink. Include the minus sign.",
      explanation: "% change in price = +10%; % change in quantity = −30%; PED = −30 ÷ 10 = −3.00 (elastic)." });
  }
  {
    b.num({ d: 4, skill: "APPLICATION", calculator: true, kind: "elasticity", value: k2.pedDown, dp: 2, hints: ["The base is the original price and quantity."],
      wrong: [-0.8, 1.25, -3],
      stem: "If the same firm cuts its price from US\\$20 to US\\$18 its rivals follow, and it sells 225 units. Calculate price elasticity of demand below the kink. Include the minus sign.",
      explanation: "% change in price = −10%; % change in quantity = +12.5%; PED = 12.5 ÷ (−10) = −1.25: less elastic than above the kink." });
  }
  {
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: k2.mrUp, dp: 2, hints: ["The demand line above the kink is P = 26.67 − Q/30, so MR = 26.67 − Q/15."],
      wrong: [4, 20, 26.67],
      stem: "Above the kink the demand curve is P = 80/3 − Q/30, so marginal revenue is MR = 80/3 − Q/15. Calculate marginal revenue at the kink (Q = 200), in US\\$, to two decimal places.",
      explanation: "MR = 26.67 − 200 ÷ 15 = 26.67 − 13.33 = US\\$13.33. Below the kink MR drops to US\\$4, so the gap runs from US\\$4 to US\\$13.33." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In the kinked demand curve model, demand is more elastic above the kink than below it.", answer: true,
    explanation: "True. Rivals ignore a price rise, so the firm loses many customers; they match a price cut, so it gains few." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each pricing behaviour with its description.",
    pairs: [["Price leadership", "One firm sets the price and the others follow"], ["Limit pricing", "Price set low enough to deter entry"], ["Predatory pricing", "Price below cost to drive out a rival"], ["Cartel", "Formal agreement on price or output"]],
    extraRight: ["Different prices for different groups"],
    explanation: "The last item is price discrimination." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "In the kinked demand model the marginal revenue curve has a vertical {{blank:a}}, so a change in marginal cost within it leaves the {{blank:b}} unchanged.",
    blanks: [{ id: "a", accepted: ["gap"], choices: ["gap", "peak", "intercept"] }, { id: "b", accepted: ["price"], choices: ["price", "demand", "kink"] }],
    explanation: "A gap in MR explains price rigidity." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the situation in oligopoly in which each firm's best decision depends on how its rivals react?",
    accepted: ["interdependence", "mutual interdependence", "interdependent"], wrong: ["competition"],
    explanation: "Interdependence is the defining feature of oligopoly." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "State **three** features of an oligopoly.",
    points: ["A few large firms dominate the market (high concentration).", "Significant barriers to entry.", "Interdependence: firms take rivals' reactions into account (and often use non-price competition)."],
    modelAnswer: "A few large firms dominate the market, so concentration is high; there are significant barriers to entry; and the firms are interdependent, so each must consider how its rivals will react.", explanation: "Three features." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Assumptions about rivals' reactions."],
    stem: "Explain how the kinked demand curve model accounts for price rigidity in oligopoly.",
    points: ["If the firm raises its price rivals do not follow, so demand above the kink is elastic and revenue falls.", "If it cuts its price rivals follow, so demand below the kink is less elastic and revenue gains are small.", "The kink causes a gap in the marginal revenue curve.", "Marginal cost can change within the gap without changing the profit-maximising price or output."],
    modelAnswer: "The model assumes that rivals will not follow a price rise but will match a price cut. Demand is therefore elastic above the current price and less elastic below it, giving a kink. The marginal revenue curve has a gap beneath the kink, and as long as marginal cost passes through this gap the best output and price do not change, so prices tend to stay stable.",
    explanation: "Kink, gap, stability." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Is oligopoly good or bad for consumers?"],
    stem: "Assess whether oligopoly is likely to benefit consumers.",
    points: ["Prices above marginal cost and supernormal profit can persist (high barriers).", "Possible collusion raises prices.", "But large firms may have economies of scale and invest in innovation.", "Rivalry in non-price competition can improve quality; contestability limits power. Judgement."],
    modelAnswer: "Oligopolists may charge prices above marginal cost, earn supernormal profit behind barriers to entry and may collude, all of which harm consumers. But they may have economies of scale, use their profit to invest in innovation and compete through quality and service, and the threat of entry can limit their power. Overall, the effect depends on whether the firms compete or collude and how easy entry is.",
    explanation: "Two-sided assessment." });

  {
    const md = table(["Event", "Price (US\\$)", "Quantity sold (units)"], [["Current position", 10, 100], ["Price raised, rivals do not follow", 11, 60], ["Price cut, rivals follow", 9, 115]]);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Percentage changes use the original price and quantity.", "Include the minus sign in elasticities."],
      stem: `A fictional bakery chain is one of three firms in an oligopoly (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "elasticity", value: k1.pedUp, dp: 2, stem: "Calculate price elasticity of demand if the firm raises its price from US\\$10 to US\\$11 (include the minus sign).", wrong: [4, -0.25, -40], explanation: "% change in price = +10%; % change in quantity = −40%; PED = −4.00." }),
        P.num({ label: "(b)", marks: 2, kind: "elasticity", value: k1.pedDown, dp: 2, stem: "Calculate price elasticity of demand if the firm cuts its price from US\\$10 to US\\$9 (include the minus sign).", wrong: [1.5, -0.67, -15], explanation: "% change in price = −10%; % change in quantity = +15%; PED = −1.50." }),
        P.mcq({ label: "(c)", marks: 1, stem: "These results are consistent with the assumption that rivals", options: [["match a price cut but ignore a price rise", "Correct: demand is less elastic below the current price."], ["match a price rise but ignore a price cut", "That would make demand elastic below and inelastic above."], ["match both price rises and price cuts", "Then demand would be similar on both sides."], ["ignore both price rises and price cuts", "Then demand would be elastic on both sides."]], answer: "A", explanation: "Demand is elastic (−4.0) for a rise and less elastic (−1.5) for a cut." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the bakery chain may keep its price at US\\$10 even if its costs rise slightly.", points: ["The kinked demand curve gives a gap in marginal revenue (US\\$3.33 to US\\$7.50).", "If marginal cost stays within the gap, output and price do not change.", "A price rise would lose many customers because rivals would not follow."],
          modelAnswer: "Because of the kink in demand, the marginal revenue curve has a gap, from about US\\$3.33 to US\\$7.50 at 100 units. If the rise in marginal cost is small and stays within this gap, the profit-maximising output and price do not change. Raising the price would lose many customers, since rivals would not follow, so the chain keeps the price at US\\$10." }),
      ],
      explanation: "PED above the kink −4.00 and below −1.50; the MR gap explains why the price is stable for small cost changes." });
  }
  {
    const sh2 = [38, 29, 17, 9, 4, 3];
    chk(sh2.reduce((s, x) => s + x, 0), 100);
    const md = table(["Network", "Market share (%)"], sh2.map((s, i) => [`Network ${String.fromCharCode(65 + i)}`, s]));
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Add the shares of the largest firms."],
      stem: `The table shows the shares of six mobile networks in a fictional country (illustrative data). The two largest networks compete mainly through advertising, handset deals and customer service rather than price. Last year Network C cut its prices by 20%; Networks A and B matched the cut within a week.\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: concentrationRatio(sh2, 2), dp: 0, unit: "%", stem: "Calculate the two-firm concentration ratio.", wrong: [38, 84, 29], explanation: "38 + 29 = 67%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: concentrationRatio(sh2, 3), dp: 0, unit: "%", stem: "Calculate the three-firm concentration ratio.", wrong: [67, 17, 100], explanation: "38 + 29 + 17 = 84%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The behaviour of the networks shows", options: [["interdependence", "Correct: rivals matched the price cut."], ["perfect competition", "A few firms, not very many price-takers."], ["price discrimination", "No different prices for different groups are described."], ["monopoly power", "There are several firms."]], answer: "A", explanation: "Networks A and B reacted to Network C's price cut." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why Network C's price cut may not have increased its market share.", points: ["Rivals matched the price cut.", "So the relative price difference disappeared.", "Total revenue of all networks fell without gaining customers from one another."],
          modelAnswer: "Networks A and B matched the price cut within a week, so Network C no longer had a price advantage and attracted few extra customers. All three networks were then earning less revenue per customer, with little change in market shares." }),
        P.manual({ label: "(e)", marks: 5, stem: "Assess whether non-price competition is better for consumers than price competition in this market.", points: ["Price cuts lower prices directly, but are matched, so benefits may be short-lived.", "Price wars may also lower profit and quality, or drive out smaller networks.", "Non-price competition (service, coverage, handsets) can improve quality and choice.", "But advertising adds to costs and may keep prices high.", "Judgement."],
          modelAnswer: "Price competition lowers prices directly, which benefits consumers, but rivals match cuts quickly so the gain may be short-lived, and price wars may squeeze profit, quality or investment. Non-price competition can improve service, coverage and the range of handsets, though advertising adds to costs and may keep prices higher. Overall, consumers gain most when firms compete on both price and quality; in a concentrated market, non-price competition alone may leave prices higher than they need to be." }),
      ],
      explanation: "CR2 = 67%, CR3 = 84%; the networks are interdependent; the price cut was matched." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider competition and collusion."],
    stem: "Discuss whether firms in an oligopoly are likely to compete on price.",
    points: ["Interdependence: a price cut is likely to be matched by rivals.", "The kinked demand curve model explains stable prices.", "Price wars reduce profit for all, so firms prefer non-price competition.", "Price leadership and tacit collusion avoid price competition.", "Competition law and the threat of entry may encourage price competition.", "Where products are close substitutes and demand is price elastic, price competition may be strong.", "Firms with lower costs may start price wars to gain share or deter entry (predatory or limit pricing).", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Because oligopolists are interdependent, a price cut is likely to be matched by rivals, so it brings little extra market share and lowers everyone's revenue. The kinked demand curve model suggests that prices will therefore tend to be stable, and firms usually prefer non-price competition, such as advertising and quality, or price leadership and tacit collusion. However, price competition does occur: where the products are close substitutes and demand is elastic, firms may fight price wars, and a lower-cost firm may cut prices to gain market share or deter entry, as with limit or predatory pricing. Competition law and the threat of entry can also push prices down. Overall, firms are more likely to avoid price competition, but it may happen when costs differ or when new entrants appear.",
    explanation: "Interdependence usually discourages price competition, but exceptions exist." });

  b.card("DEFINITION", "Define **oligopoly**.", "A market dominated by a few large firms, with barriers to entry and interdependence in decision making.");
  b.card("DEFINITION", "What is **interdependence**?", "Each firm's best decision on price or output depends on how its rivals will react.");
  b.card("FORMULA", "How is an n-firm concentration ratio calculated?", "Add the market shares (%) of the n largest firms.");
  b.card("CONCEPT", "What is assumed in the kinked demand curve?", "Rivals ignore a price rise (demand elastic above the kink) but match a price cut (demand less elastic below).");
  b.card("CONCEPT", "What does the gap in the MR curve explain?", "Price rigidity: if MC changes within the gap the profit-maximising price and output stay the same.");
  b.card("DEFINITION", "What is **price leadership**?", "A dominant firm sets the price and the other firms follow, avoiding price competition without a formal agreement.");
  b.card("DEFINITION", "What is **limit pricing**?", "Setting a price low enough to make entry unprofitable for new firms.");
  b.card("DEFINITION", "What is **predatory pricing**?", "Setting price below cost for a time to force rivals out of the market or deter entry.");
  b.card("CONCEPT", "Why do oligopolists prefer non-price competition?", "A price cut would be matched by rivals, lowering all revenues without gaining market share.");
});
