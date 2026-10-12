// W2a: monopolistic competition (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Firm with demand P = a - 2Q, constant marginal cost c and fixed cost F: MR = a - 4Q = c.
const firm = (a, c, F) => {
  const q = (a - c) / 4;
  const p = a - 2 * q;
  const tr = p * q;
  const tc = F + c * q;
  return { q, p, tr, tc, profit: tr - tc, atc: tc / q };
};

concept("aecon.firms.monopolistic-competition", { file: "firms/monopolistic-competition", keyPrefix: "firms.monopolistic-competition" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const sr = firm(38, 10, 72);
  chk(sr.q, 7); chk(sr.p, 24); chk(sr.profit, 26, 1e-9);
  const lr = firm(34, 10, 72);
  chk(lr.q, 6); chk(lr.p, 22); chk(lr.profit, 0, 1e-9); chk(lr.atc, 22, 1e-9);
  // tangency: slope of ATC = -F/q^2 equals the slope of demand (-2) at the long-run output
  chk(-72 / (lr.q * lr.q), -2, 1e-9 + 0.5);
  const s1 = firm(46, 14, 72);
  chk(s1.q, 8); chk(s1.p, 30); chk(s1.profit, 56, 1e-9);
  const l1 = firm(38, 14, 72);
  chk(l1.q, 6); chk(l1.p, 26); chk(l1.profit, 0, 1e-9);
  const ad = firm(42, 14, 96);
  chk(ad.q, 7); chk(ad.p, 28); chk(ad.tr, 196); chk(ad.tc, 194); chk(ad.profit, 2, 1e-9);

  mc({ d: 1, skill: "RECALL", stem: "Which of the following is a feature of monopolistic competition?",
    explanation: "Monopolistic competition has many firms selling differentiated products with easy entry and exit." },
    ["Many firms selling differentiated products", "Correct."], [["A single firm protected by barriers to entry", "That is monopoly."], ["A few firms that depend on one another's decisions", "That is oligopoly."], ["Identical products sold by very many firms", "That is perfect competition."]]);

  mc({ d: 1, skill: "RECALL", stem: "Product differentiation means that",
    explanation: "Differentiation makes a firm's product different, in real or perceived ways, from those of rivals, so buyers do not see them as perfect substitutes." },
    ["buyers see each firm's product as different from rivals' products", "Correct."], [["all firms sell the same product at the same price", "That describes perfect competition."], ["firms differ only in the size of their output and workforce", "Size is not product differentiation."], ["the government sets the quality of the product", "Differentiation is a firm's own choice."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which of the following is an example of non-price competition?",
    explanation: "Advertising, branding and service quality compete for customers without cutting the price." },
    ["A salon offers free braiding lessons and a loyalty card", "Correct."], [["A salon cuts its price by half to attract more customers", "This is price competition."], ["A salon raises its price to cover costs", "This is a price change, not non-price competition."], ["A salon closes for the day because of low sales", "This is not a competitive strategy."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In the short run a firm in monopolistic competition",
    explanation: "It faces a downward-sloping demand curve and can earn supernormal profit or a loss, depending on demand and costs." },
    ["can earn supernormal profit", "Correct."], [["always earns normal profit", "Normal profit is the long-run result."], ["is a price-taker", "It has some control over price because its product is differentiated."], ["cannot make a loss", "It can make a loss if demand is weak."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In long-run equilibrium a monopolistically competitive firm",
    explanation: "Entry removes supernormal profit, so the demand curve is tangent to ATC at the output where MC = MR: price equals ATC and profit is normal." },
    ["earns normal profit, with price equal to average total cost", "Correct."], [["earns supernormal profit, because its product is unique", "Free entry removes it."], ["produces at the lowest point of average cost", "The tangency is on the falling part of ATC."], ["has a price equal to marginal cost", "Price is above marginal cost."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["What does entry do to each existing firm's customers?"],
    stem: "New salons enter a market where existing salons earn supernormal profit. For an existing salon, the demand curve will",
    explanation: "New firms offer close substitutes and take customers away, so each existing firm's demand falls (shifts left) and becomes more elastic." },
    ["shift to the left and become more elastic", "Correct."], [["shift to the right and become much less price elastic", "This would happen if demand for the product rose."], ["become perfectly inelastic", "More substitutes make demand more elastic."], ["stay unchanged because entry has no effect", "Entry takes away customers."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Compare the output chosen with the output at which ATC is lowest."],
    stem: "Excess capacity in monopolistic competition means that",
    explanation: "In long-run equilibrium the firm produces on the falling part of ATC, below the output at which average cost is lowest." },
    ["firms produce less than the output at which average cost is lowest", "Correct."], [["firms produce more than they can sell at the going price", "The firm sells what it produces."], ["firms earn supernormal profit in the long run because of unused capacity", "Profit is normal in the long run."], ["firms employ too many workers for their output", "The concept concerns unused productive capacity."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about costs as well as demand."],
    stem: "A firm in monopolistic competition spends heavily on advertising. Compared with no advertising, the most likely immediate effect is a",
    explanation: "Advertising is a fixed cost that raises ATC; if it shifts demand to the right and makes it less elastic, the firm may sell more or charge more." },
    ["rise in average total cost and, if successful, a rightward shift of demand", "Correct."], [["fall in average total cost and a leftward shift of demand", "Advertising costs money and aims to raise demand."], ["rise in marginal cost to the level of price", "Advertising is mostly a fixed cost and does not set MC equal to price."], ["fall in the number of firms in the industry", "Advertising does not by itself change entry."]]);

  {
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: sr.q, unit: "units", hints: ["Set MR equal to MC."],
      wrong: [14, 24, 5],
      stem: "A fictional salon faces the demand curve P = 38 − 2Q (price in US\\$, Q = customers a day), so MR = 38 − 4Q. Its marginal cost is a constant US\\$10. Calculate its profit-maximising output.",
      explanation: "38 − 4Q = 10, so Q = 7 customers a day." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: sr.p, hints: ["Read the price from the demand curve."],
      wrong: [10, 38, 14],
      stem: "The salon above produces 7 customers a day. Calculate the price it charges, in US\\$.",
      explanation: "P = 38 − 2 × 7 = US\\$24 (not MC = 10, and not MR = 10)." });
  }
  {
    b.calc({ d: 4, skill: "APPLICATION", calculator: true, kind: "money", value: sr.profit, hints: ["Total fixed cost is US\\$72 a day."],
      wrong: [168, 142, 98],
      stem: "The salon sells 7 customers a day at US\\$24. Its marginal cost is US\\$10 and its total fixed cost is US\\$72 a day. Calculate its profit, in US\\$.",
      explanation: "1. TR = 24 × 7 = 168.\n2. TC = 72 + 10 × 7 = 142.\n3. Profit = 168 − 142 = US\\$26 a day, which is supernormal." });
  }
  {
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: lr.p, hints: ["After entry the demand curve is P = 34 − 2Q."],
      wrong: [24, 10, 34],
      stem: "Entry shifts the salon's demand curve to P = 34 − 2Q (MR = 34 − 4Q). Marginal cost is US\\$10 and total fixed cost is US\\$72. Calculate the price in the new equilibrium, in US\\$ (the firm now earns normal profit).",
      explanation: "34 − 4Q = 10 gives Q = 6; P = 34 − 12 = US\\$22. Check: ATC = (72 + 60) ÷ 6 = US\\$22, so profit is zero." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In long-run equilibrium a monopolistically competitive firm charges a price equal to its marginal cost.", answer: false,
    explanation: "False. Price equals average total cost (normal profit) and is above marginal cost, so there is allocative inefficiency." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each market structure with the statement that fits its long-run position.",
    pairs: [["Perfect competition", "Price equals minimum ATC and marginal cost"], ["Monopolistic competition", "Price equals ATC, above marginal cost; excess capacity"], ["Monopoly", "Supernormal profit can persist because entry is blocked"]],
    extraRight: ["Price is set by the government"],
    explanation: "Entry removes supernormal profit in the first two structures; in monopoly, barriers prevent it." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "Supernormal profit in monopolistic competition attracts {{blank:a}}, which shifts each firm's demand curve to the {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["entry"], choices: ["entry", "exit", "subsidies"] }, { id: "b", accepted: ["left"], choices: ["left", "right", "top"] }],
    explanation: "New firms take customers away, so demand shifts left." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the long-run position of a monopolistically competitive firm in which the demand curve just touches the average total cost curve.",
    accepted: ["tangency", "tangency solution", "the tangency solution", "tangent"], wrong: ["shutdown"],
    explanation: "The tangency solution: price equals ATC at the output where MC = MR." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "State **three** features of monopolistic competition.",
    points: ["Many firms.", "Differentiated products.", "Easy entry and exit (no significant barriers)."],
    modelAnswer: "There are many firms, each sells a differentiated product, and there is easy entry into and exit from the market.", explanation: "Three features." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Start with the supernormal profit."],
    stem: "Explain why firms in monopolistic competition earn only normal profit in the long run.",
    points: ["Supernormal profit attracts new firms because entry is easy.", "New firms offer close substitutes, taking customers from existing firms.", "Each firm's demand curve shifts left and becomes more elastic.", "Entry continues until price equals ATC and supernormal profit disappears."],
    modelAnswer: "Supernormal profit attracts new firms because there are no barriers to entry. The new firms offer similar products and take customers from existing firms, so each firm's demand curve shifts to the left and becomes more elastic. This continues until the demand curve touches the average total cost curve, so that price equals average cost and only normal profit is earned.",
    explanation: "Entry competes away profit." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Allocative efficiency, productive efficiency and variety."],
    stem: "Assess the efficiency of monopolistic competition in the long run.",
    points: ["Not allocatively efficient: price is above marginal cost.", "Not productively efficient: excess capacity, with output below the lowest-cost level.", "Consumers gain variety and choice.", "Judgement: some inefficiency, but variety may justify it."],
    modelAnswer: "In the long run price is above marginal cost, so the market is not allocatively efficient, and firms operate with excess capacity, so it is not productively efficient. But consumers gain from a variety of differentiated products and from services tailored to their tastes, and the loss of efficiency is small compared with that of monopoly. On balance the inefficiency is modest and may be worth the choice it brings.",
    explanation: "Weigh the inefficiency against variety." });

  {
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["MR = 46 − 4Q.", "TC = fixed cost + MC × output."],
      stem: "A fictional restaurant in Mutare faces the demand curve P = 46 − 2Q (price in US\\$, Q = meals in tens per day), so MR = 46 − 4Q. Its marginal cost is a constant US\\$14 and its total fixed cost is US\\$72 a day (illustrative data).",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: s1.q, unit: "units", stem: "Calculate the profit-maximising output.", wrong: [16, 23, 5], explanation: "46 − 4Q = 14 gives Q = 8." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: s1.p, stem: "Calculate the price charged, in US\\$.", wrong: [14, 46, 22], explanation: "P = 46 − 2 × 8 = US\\$30." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s1.profit, stem: "Calculate the restaurant's profit, in US\\$.", wrong: [240, 184, 7], explanation: "TR = 30 × 8 = 240; TC = 72 + 14 × 8 = 184; profit = US\\$56." }),
        P.mcq({ label: "(d)", marks: 1, stem: "What is likely to happen in the long run?", options: [["New restaurants enter and demand for this restaurant shifts left", "Correct: supernormal profit attracts entry."], ["Existing restaurants leave and demand shifts right", "Exit follows losses, not supernormal profit."], ["The restaurant becomes a price-taker", "Differentiation keeps some control over price."], ["Profit rises further as costs fall", "Entry reduces profit."]], answer: "A", explanation: "Supernormal profit attracts new firms." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **two** ways in which the restaurant might compete without cutting its price.", points: ["A valid non-price method (quality, menu variety, location, service, advertising).", "A second valid method."],
          modelAnswer: "It could advertise and build a brand, and improve the quality and variety of its food and the speed of service." }),
      ],
      explanation: "Output 8, price US\\$30, profit US\\$56; entry will shift demand left and reduce profit." });
  }
  {
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["MR = a − 4Q for demand P = a − 2Q.", "Advertising adds to fixed cost."],
      stem: "After entry the restaurant's demand curve is P = 38 − 2Q (MR = 38 − 4Q). Marginal cost is US\\$14 and fixed cost is US\\$72. The owner then spends an extra US\\$24 a day on advertising, so total fixed cost is US\\$96, and demand shifts to P = 42 − 2Q (MR = 42 − 4Q).",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: l1.q, unit: "units", stem: "Calculate the profit-maximising output before the advertising.", wrong: [12, 24, 7], explanation: "38 − 4Q = 14 gives Q = 6." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: l1.profit, stem: "Calculate profit before the advertising, in US\\$.", wrong: [156, 72, 26], explanation: "P = 26; TR = 156; TC = 72 + 14 × 6 = 156; profit = 0 (normal profit)." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: ad.q, unit: "units", stem: "Calculate the profit-maximising output after the advertising.", wrong: [6, 14, 8], explanation: "42 − 4Q = 14 gives Q = 7." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: ad.profit, stem: "Calculate profit after the advertising, in US\\$.", wrong: [196, 26, 24], explanation: "P = 42 − 14 = 28; TR = 196; TC = 96 + 14 × 7 = 194; profit = US\\$2." }),
        P.manual({ label: "(e)", marks: 3, stem: "Explain how advertising can change a firm's position in monopolistic competition.", points: ["It aims to shift the demand curve to the right (more customers).", "It may make demand less elastic by building brand loyalty.", "It adds to fixed cost, so it raises average total cost."],
          modelAnswer: "Advertising aims to attract more customers, shifting demand to the right, and to build brand loyalty, which makes demand less elastic. But it is an extra fixed cost, so average total cost rises, and the benefit depends on the extra revenue exceeding that cost." }),
        P.manual({ label: "(f)", marks: 2, stem: "State why the supernormal profit from the advertising may not last.", points: ["Rivals can copy the strategy or advertise too.", "New firms may enter, shifting demand back to the left."],
          modelAnswer: "Rival restaurants can advertise too, and any supernormal profit would attract new entrants, so demand would shift back to the left." }),
      ],
      explanation: "Advertising raises output from 6 to 7 and profit from 0 to US\\$2, but at a higher fixed cost and only until rivals respond." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare with perfect competition and monopoly."],
    stem: "Assess whether monopolistic competition is a good market structure for consumers.",
    points: ["Consumers benefit from variety and choice.", "Competition between many firms and easy entry keep profits at normal in the long run.", "Firms compete on quality and service, not only price.", "Price is above marginal cost: allocative inefficiency.", "Excess capacity means productive inefficiency.", "Advertising raises costs and prices, though it may inform consumers.", "The loss is small compared with monopoly.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Monopolistic competition gives consumers a wide variety of products and services, and easy entry keeps profit at the normal level in the long run, so it is not exploitative. Firms compete on quality and service as well as on price. But price is above marginal cost, so it is not allocatively efficient, and firms operate with excess capacity, so it is not productively efficient. Advertising adds to cost, although it may also inform consumers. The loss of efficiency is small compared with monopoly. Overall, the market is good for consumers when they value variety and entry is free, although the prices are somewhat higher than in perfect competition.",
    explanation: "Variety and free entry against excess capacity and higher price." });

  b.card("DEFINITION", "Define **monopolistic competition**.", "A market structure with many firms selling differentiated products, with easy entry and exit; some price-making power but only normal profit in the long run.");
  b.card("DEFINITION", "What is **product differentiation**?", "Making a product different from rivals' in real or perceived ways (quality, design, location, brand), so it is not a perfect substitute.");
  b.card("CONCEPT", "Short-run equilibrium of a monopolistically competitive firm?", "Output where MC = MR; price from the demand curve; supernormal profit or loss.");
  b.card("CONCEPT", "Long-run equilibrium of a monopolistically competitive firm?", "Demand (AR) is tangent to ATC at the output where MC = MR: price = ATC, normal profit.");
  b.card("CONCEPT", "What does entry do to a firm's demand curve?", "Shifts it left and makes it more elastic, as new firms offer close substitutes.");
  b.card("DEFINITION", "What is **excess capacity**?", "Producing less than the output at which average cost is lowest; unused capacity because demand per firm is too small.");
  b.card("CONCEPT", "Examples of non-price competition?", "Advertising, branding, quality, location, customer service, loyalty schemes, delivery.");
  b.card("FACT", "Is monopolistic competition allocatively efficient?", "No: price is above marginal cost, though consumers gain variety.");
  b.card("CONCEPT", "Examples of monopolistic competition?", "Hair salons, restaurants, small retail shops, tailors.");
});
