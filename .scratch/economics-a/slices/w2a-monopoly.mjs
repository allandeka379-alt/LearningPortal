// W2a: monopoly and natural monopoly (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, monopolyLinear, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.firms.monopoly", { file: "firms/monopoly", keyPrefix: "firms.monopoly" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const m = monopolyLinear({ a: 80, b: 2, c: 20 });
  chk(m.monopoly.quantity, 15); chk(m.monopoly.price, 50); chk(m.monopoly.profitOverMC, 450); chk(m.competitive.quantity, 30); chk(m.competitive.price, 20); chk(m.welfareLoss, 225);
  const m2 = monopolyLinear({ a: 90, b: 3, c: 30 });
  chk(m2.monopoly.quantity, 10); chk(m2.monopoly.price, 60); chk(m2.monopoly.profitOverMC, 300); chk(m2.competitive.quantity, 20); chk(m2.competitive.price, 30); chk(m2.welfareLoss, 150);
  // regulated natural monopoly: ATC = 20 + 250/Q against P = 80 - 2Q gives Q = 25 or 5
  chk(20 + 250 / 25, 80 - 2 * 25); chk(20 + 250 / 5, 80 - 2 * 5);

  mc({ d: 1, skill: "RECALL", stem: "A pure monopolist is",
    explanation: "A monopoly is the single seller of a good with no close substitutes, protected by barriers to entry." },
    ["the only seller of a product with no close substitutes", "Correct."], [["one of many sellers of an identical product", "That describes perfect competition."], ["a firm that makes only normal profit", "A monopolist can earn supernormal profit."], ["a firm that sells to only one buyer", "That is a monopsony."]]);

  mc({ d: 1, skill: "RECALL", stem: "A natural monopoly arises mainly because of",
    explanation: "Large economies of scale make it cheapest for one firm to supply the whole market." },
    ["very large economies of scale", "Correct."], [["a government ban on imports", "This is a legal barrier, not the cause of natural monopoly."], ["high product differentiation", "This is a feature of monopolistic competition."], ["a large number of buyers", "Buyer numbers do not create natural monopoly."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A profit-maximising monopolist sets its price",
    explanation: "It finds the output where MC = MR, then reads the price from the demand curve at that output." },
    ["from the demand curve at the output where MC = MR", "Correct."], [["equal to marginal cost at the profit-maximising output", "That is the competitive rule."], ["equal to marginal revenue at the output chosen", "Price exceeds MR for a monopolist."], ["at the lowest point of average cost", "That is not the profit-maximising rule."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Compared with a perfectly competitive industry with the same costs, a monopoly will usually charge",
    explanation: "The monopolist restricts output to raise price above marginal cost." },
    ["a higher price and produce a lower output", "Correct."], [["a lower price and produce a higher output", "That is the competitive outcome."], ["a higher price and produce a higher output", "Higher price means less is demanded."], ["the same price and a lower output", "The price is higher because output is restricted."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "X-inefficiency in a monopoly refers to",
    explanation: "Without competition the firm has little pressure to control costs, so actual costs exceed the minimum possible." },
    ["costs above the minimum because of weak competition", "Correct."], [["lower costs from economies of scale as the firm grows", "That is an advantage, not X-inefficiency."], ["profit that is above normal profit in the long run", "That is supernormal profit."], ["a price equal to marginal cost at the output sold", "That is allocative efficiency."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Use MR = MC to find the output."],
    stem: "A monopolist faces the demand curve P = 80 − 2Q, so MR = 80 − 4Q, and has a constant marginal cost of US\\$20. Its profit-maximising price is",
    explanation: "MR = MC: 80 − 4Q = 20 gives Q = 15; P = 80 − 2 × 15 = US\\$50." },
    ["US\\$50", "Correct."], [["US\\$20", "This is marginal cost."], ["US\\$30", "This is the price at Q = 25 on the demand curve."], ["US\\$60", "This is the price at Q = 10."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Consider average-cost pricing."],
    stem: "A regulator wants a natural monopoly to earn only normal profit. It should set a price equal to",
    explanation: "Where price equals average total cost, the firm earns only normal profit, which keeps it in business without a subsidy." },
    ["average total cost", "Correct."], [["marginal cost, with no subsidy", "With falling average cost, MC is below ATC and the firm makes a loss."], ["marginal revenue", "This is the monopolist's own rule, not a regulator's."], ["average revenue at monopoly output", "This is the unregulated price."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Weigh costs and benefits."],
    stem: "Which of the following would best support the view that a monopoly may benefit consumers?",
    explanation: "Large economies of scale and funds for innovation can lower costs and prices or bring new products, which may outweigh the higher mark-up." },
    ["It has large economies of scale that lower its costs", "Correct."], [["It faces no threat of entry from new firms at all", "Absence of competition is a disadvantage."], ["It charges a price above marginal cost", "This is a cost to consumers."], ["It produces less than a competitive industry would", "This is a cost to consumers."]]);

  {
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: m.monopoly.quantity, unit: "units", hints: ["Set MR equal to MC."],
      wrong: [30, 20, 60],
      stem: "A monopolist faces P = 80 − 2Q (MR = 80 − 4Q) and has a constant marginal cost of US\\$20. Calculate its profit-maximising output, in thousand units.",
      explanation: "80 − 4Q = 20, so Q = 15 thousand units. (Q = 30 is the competitive output where P = MC.)" });
  }
  {
    const v = m.monopoly.profitOverMC - 250;
    chk(v, 200);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: v, hints: ["Revenue less cost at the monopoly output."],
      wrong: [450, 750, 300],
      stem: "At the monopoly output of 15 thousand units the price is US\\$50, marginal cost is a constant US\\$20 and total fixed cost is US\\$250 thousand. Calculate the supernormal profit, in US\\$ thousand.",
      explanation: "1. TR = 50 × 15 = 750.\n2. TC = 250 + 20 × 15 = 550.\n3. Profit = 750 − 550 = US\\$200 thousand. (450 is the profit before fixed cost.)" });
  }
  {
    b.num({ d: 4, skill: "ANALYSIS", kind: "money", value: m.welfareLoss, hints: ["The loss is a triangle: ½ × change in output × (price − MC)."],
      wrong: [450, 112.5, 225 * 2],
      stem: "A monopolist produces 15 thousand units at US\\$50 with marginal cost of US\\$20. The competitive output would be 30 thousand units at US\\$20. Calculate the deadweight (welfare) loss, in US\\$ thousand.",
      explanation: "Welfare loss = ½ × (30 − 15) × (50 − 20) = ½ × 15 × 30 = US\\$225 thousand." });
  }
  {
    b.num({ d: 4, skill: "APPLICATION", kind: "money", value: 30, hints: ["Put 80 − 2 × 25 into the demand curve."],
      wrong: [20, 50, 25],
      stem: "A regulator makes the natural monopoly price at average cost, which gives an output of 25 thousand units on the demand curve P = 80 − 2Q. Calculate the regulated price, in US\\$.",
      explanation: "P = 80 − 2 × 25 = US\\$30. Check: ATC = 20 + 250 ÷ 25 = 30." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A monopolist can choose any price and any quantity independently of each other.", answer: false,
    explanation: "False. It can choose price or quantity, but demand then decides the other: a higher price means a lower quantity sold." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each source of monopoly power with an example.",
    pairs: [["Legal barrier", "A patent on a new medicine"], ["Control of a key resource", "Ownership of the only mine of a mineral"], ["Economies of scale", "One firm can supply a whole electricity network at lowest cost"], ["Strategic barrier", "Aggressive advertising and price cuts to deter entrants"]],
    extraRight: ["Many buyers with equal bargaining power"],
    explanation: "The last statement is not a source of monopoly power." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "A monopolist produces where MC = {{blank:a}}, and the price it charges is {{blank:b}} marginal cost.",
    blanks: [{ id: "a", accepted: ["MR"], choices: ["MR", "AR", "ATC"] }, { id: "b", accepted: ["above"], choices: ["above", "equal to", "below"] }],
    explanation: "MC = MR gives the output; the demand curve gives a price above MC." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes a monopoly that arises because one firm can supply the whole market at lower average cost than two or more firms?",
    accepted: ["natural monopoly", "a natural monopoly"], wrong: ["pure monopoly"],
    explanation: "Natural monopoly: the LRAC curve is still falling at the output demanded by the whole market." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "Explain **two** sources of monopoly power.",
    points: ["A source identified (for example a patent or a licence).", "Explained: it stops rivals entering.", "A second source identified and explained (for example economies of scale or control of a resource)."],
    modelAnswer: "A patent gives the holder the legal right to be the only producer for a time, so rivals cannot enter. Economies of scale can also create monopoly power, because a very large firm has such low average costs that a new, small firm cannot compete on price.", explanation: "Two sources, with an explanation." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Compare output and price with perfect competition."],
    stem: "Explain why a monopoly may be allocatively inefficient.",
    points: ["Allocative efficiency requires price equal to marginal cost.", "The monopolist maximises profit where MC = MR, and MR is below price.", "So price is above marginal cost and output is lower than the competitive output.", "Some consumers who value the good above its cost go without: a deadweight loss."],
    modelAnswer: "Allocative efficiency needs price to equal marginal cost. A monopolist sets MC equal to MR, and because MR is below price, the price it charges is above marginal cost and output is lower than in competition. Consumers who would be willing to pay more than the cost of producing the good do not get it, which is a deadweight loss.",
    explanation: "P > MC causes a deadweight loss." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 5, hints: ["Think about price caps and average-cost pricing."],
    stem: "Evaluate **one** method a government could use to regulate a natural monopoly.",
    points: ["Method identified (for example a price cap, average-cost pricing, a subsidy with marginal-cost pricing or public ownership).", "Explains how it lowers price or raises output.", "Advantage (for example lower price and a more efficient output).", "Disadvantage (for example the regulator lacks information on costs, or the subsidy costs taxpayers).", "Judgement."],
    modelAnswer: "A regulator could limit the price to average cost. The firm then earns only normal profit and output is higher and price lower than under unregulated monopoly. But the regulator knows less about the firm's true costs than the firm does, so the firm may exaggerate its costs and the price may be set too high, and it has little incentive to cut costs. On balance average-cost pricing improves on unregulated monopoly if the regulator has reliable information.",
    explanation: "Method, effect, advantage, disadvantage, judgement." });

  {
    const md = table(["Output Q (thousand units)", "Price (US\\$)", "MR (US\\$)"], [5, 10, 15, 20, 25].map((q) => [q, 90 - 3 * q, 90 - 6 * q]));
    const mm = m2.monopoly;
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["MR = MC gives the output; the demand curve gives the price.", "Total fixed cost is US\\$100 thousand."],
      stem: `A fictional company has a monopoly over a mineral in one district. Demand is P = 90 − 3Q (price in US\\$, Q in thousand tonnes), so MR = 90 − 6Q. Marginal cost is constant at US\\$30 and total fixed cost is US\\$100 thousand (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: mm.quantity, unit: "units", stem: "Calculate the profit-maximising output, in thousand tonnes.", wrong: [20, 15, 30], explanation: "90 − 6Q = 30 gives Q = 10." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: mm.price, stem: "Calculate the price the monopolist charges, in US\\$.", wrong: [30, 90, 40], explanation: "P = 90 − 3 × 10 = US\\$60." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: mm.profitOverMC - 100, stem: "Calculate the supernormal profit, in US\\$ thousand.", wrong: [300, 600, 100], explanation: "TR = 600; TC = 100 + 30 × 10 = 400; profit = US\\$200 thousand." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: m2.welfareLoss, stem: "In a competitive industry output would be 20 thousand tonnes at US\\$30. Calculate the deadweight loss of the monopoly, in US\\$ thousand.", wrong: [300, 75, 450], explanation: "½ × (20 − 10) × (60 − 30) = US\\$150 thousand." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain why the monopolist's output is lower and its price higher than in a competitive industry.", points: ["Marginal revenue is below price for a monopolist.", "It equates MC with MR, which gives a lower output than P = MC.", "The price is read from the demand curve at that lower output, so it is higher.", "Entry is blocked, so supernormal profit is not competed away."],
          modelAnswer: "A monopolist faces a downward-sloping demand curve, so its marginal revenue is below the price. It produces where MC equals MR, which is a smaller output than the competitive output where price equals MC. The demand curve then gives a higher price for that smaller output. Barriers to entry prevent new firms from competing the supernormal profit away." }),
      ],
      explanation: "Output 10, price US\\$60, supernormal profit US\\$200 thousand and a deadweight loss of US\\$150 thousand." });
  }
  {
    const lo = 20 + 250 / 25;
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Average-cost pricing gives P = ATC.", "Marginal-cost pricing gives P = MC."],
      stem: "A fictional water network is a natural monopoly. Demand is P = 80 − 2Q (price in US\\$, Q in thousand units), marginal cost is a constant US\\$20 and total fixed cost is US\\$250 thousand. Unregulated, the firm produces 15 thousand units at a price of US\\$50 and earns a supernormal profit of US\\$200 thousand.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 30, unit: "units", stem: "Calculate the output if the regulator forces price to equal marginal cost, in thousand units.", wrong: [15, 25, 20], explanation: "80 − 2Q = 20 gives Q = 30." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: -250, stem: "Calculate the firm's profit at that price and output, in US\\$ thousand (a loss is negative).", wrong: [250, 0, -600], explanation: "Price = MC, so revenue only covers variable cost: profit = −fixed cost = −US\\$250 thousand." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: lo, stem: "A regulator sets the price equal to average total cost, giving an output of 25 thousand units. Calculate the average total cost at that output, in US\\$.", wrong: [20, 10, 50], explanation: "ATC = 20 + 250 ÷ 25 = US\\$30." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the regulator cannot set a price equal to marginal cost without a subsidy.", points: ["With large fixed costs, average cost is above marginal cost at every output.", "Price = MC does not cover the fixed cost.", "The firm makes a loss (US\\$250 thousand) and would leave unless subsidised."],
          modelAnswer: "A natural monopoly has high fixed costs, so its average total cost is always above marginal cost. If price equals marginal cost, revenue covers only variable cost and the firm loses its whole fixed cost, US\\$250 thousand, so it would close unless the government paid a subsidy." }),
        P.manual({ label: "(e)", marks: 4, stem: "Assess whether average-cost pricing is better than leaving the monopoly unregulated.", points: ["Lower price (US\\$30 against US\\$50) and higher output (25 against 15).", "Firm earns normal profit only, so no subsidy is needed.", "But the regulator needs reliable cost information and the firm may have less incentive to cut costs.", "Judgement: better for consumers if the regulator is well informed."],
          modelAnswer: "Average-cost pricing cuts the price from US\\$50 to US\\$30 and raises output from 15 to 25 thousand units, and because the firm still earns normal profit no subsidy is required. However, the regulator needs reliable information about the firm's costs and the firm may have less reason to keep costs down. Overall it is better for consumers than leaving the monopoly alone, provided the regulator is well informed." }),
      ],
      explanation: "Marginal-cost pricing gives Q = 30 but a loss of US\\$250 thousand; average-cost pricing gives Q = 25 and P = US\\$30 with normal profit." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider both the costs and the possible benefits of monopoly."],
    stem: "Assess whether monopoly is always against the interests of consumers.",
    points: ["A monopoly charges a price above marginal cost and restricts output, causing a deadweight loss.", "Supernormal profit transfers income from consumers to shareholders.", "X-inefficiency and little incentive to innovate or improve service.", "Economies of scale may give lower costs than many small firms could achieve.", "Supernormal profit may fund research, development and investment.", "Natural monopolies make sense, and regulation can protect consumers.", "A contestable market or import competition may limit the firm's power.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A monopolist sets a price above marginal cost and restricts output, which causes a deadweight loss and transfers surplus from consumers to the firm. With no rivals it may become X-inefficient and slow to improve. But a monopoly may enjoy economies of scale that give lower average costs than several small firms could reach, and its supernormal profit can pay for research and investment. In a natural monopoly splitting the firm would raise costs, and regulation can protect consumers by capping the price. If the market is contestable or faces imports, the monopolist's power is also limited. Overall, monopoly is not always against consumers' interests; it depends on the size of the economies of scale, the regulation and the threat of entry.",
    explanation: "Weigh the welfare loss against scale economies and innovation; conclude conditionally." });

  b.card("DEFINITION", "Define **monopoly**.", "A single seller of a product with no close substitutes, protected by barriers to entry, so the firm is a price-maker.");
  b.card("DEFINITION", "Define **natural monopoly**.", "A market where economies of scale are so large that one firm can supply the whole market at lower average cost than several firms.");
  b.card("CONCEPT", "How does a monopolist choose output and price?", "Output where MC = MR (MC rising); price read from the demand curve at that output.");
  b.card("CONCEPT", "Monopoly compared with perfect competition?", "Lower output, higher price (above MC), supernormal profit, deadweight loss.");
  b.card("FORMULA", "Welfare loss triangle (constant MC)?", "½ × (competitive output − monopoly output) × (monopoly price − MC).");
  b.card("DEFINITION", "What is X-inefficiency?", "Higher costs than necessary because weak competition gives managers little pressure to control costs.");
  b.card("CONCEPT", "Name three benefits of monopoly.", "Economies of scale, funds for research and investment, patents rewarding innovation.");
  b.card("CONCEPT", "Ways to regulate a natural monopoly?", "Price caps, average-cost pricing, marginal-cost pricing with subsidy, rate-of-return regulation, franchising, public ownership.");
  b.card("FACT", "Why can marginal-cost pricing not be used alone for a natural monopoly?", "Falling average cost means MC is below ATC; price = MC causes a loss equal to fixed cost, needing a subsidy.");
});
