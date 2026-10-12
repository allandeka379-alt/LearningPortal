// W2a: Cambridge exam-format items: one Paper 4 Section A data response (3 + 5 + 5 + 7 marks) and two Paper 4 microeconomics essays (20 marks).
import { concept, P, chk, fmt, profitSchedule, EXAM, checkExam, CAM } from "../lib.mjs";

const A = (k) => `aecon.${k}`;
const P4D = { skill: EXAM.CAM_P4_DATA.skill, secs: EXAM.CAM_P4_DATA.secs, applies: EXAM.CAM_P4_DATA.applies, examStyle: true, paper: "Paper 4" };
const P4E = { skill: EXAM.CAM_P4_ESSAY.skill, secs: EXAM.CAM_P4_ESSAY.secs, applies: EXAM.CAM_P4_ESSAY.applies, examStyle: true, paper: "Paper 4" };

const LV20 = [
  [3, 14, 20, "Developed, two-sided analysis, well applied, with evaluation and a justified judgement that answers the question."],
  [2, 7, 13, "Some analysis and some application; evaluation limited or not supported; judgement partial."],
  [1, 1, 6, "Simple, undeveloped points; little analysis or evaluation."],
];
const LV7 = [
  [3, 5, 7, "Developed analysis of both sides, applied to the data, with a supported judgement."],
  [2, 3, 4, "Some analysis, limited use of the data or an unsupported judgement."],
  [1, 1, 2, "Simple, undeveloped statements."],
];

concept(A("firms.monopoly"), { file: "exam/w2a-cambridge", keyPrefix: "exam.w2a-cambridge", applies: CAM }, (b) => {
  // ------------------------------------------------------------------ Paper 4 Section A: an ice factory with market power
  const out = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const price = [40, 36, 32, 28, 24, 20, 16, 12, 8];
  const vc = [0, 20, 32, 42, 53, 68, 88, 114, 146];
  const ps = profitSchedule({ output: out, price, fc: 30, vc });
  const R = ps.rows;
  chk(ps.best.q, 4); chk(ps.best.profit, 13); chk(R[4].tr, 96); chk(R[5].mr, 4); chk(R[4].mr, 12); chk(R[4].mc, 11); chk(R[5].mc, 15);
  const maxTR = Math.max(...R.map((r) => r.tr));
  chk(maxTR, 100); chk(R.find((r) => r.tr === maxTR).q, 5); chk(R[5].profit, 2);

  b.struct({
    ...P4D, d: 5, calculator: true,
    concepts: [A("costs.revenue-curves"), A("costs.profit-types"), A("firms.monopoly"), A("firms.objectives")],
    hints: ["MR is the change in total revenue; profit is TR − TC.", "In (d) use the data on price and profit and weigh both sides."],
    stem: `**Lakeshore Ice** (a fictional business)\n\nLakeshore Ice is the only factory that makes block ice on a stretch of lakeshore in a fictional country. Fishing cooperatives need ice every morning to keep their catch fresh on the journey to the market in the nearest city. The nearest rival factory is 300 km away, and the high cost of insulated trucks makes it uneconomic to bring ice from there. Building a second factory would require a large investment in freezing equipment, and the local market is small: experts estimate that it could not support two factories at a profit.\n\nThe owner, Rudo, knows that if she lowers her price the cooperatives will buy more ice, because they can then keep more fish for sale, but she has to charge the same price to every customer. Her variable costs are mainly electricity, water and labour, and she finds that as output rises each extra tonne costs more to produce because the freezing room is limited in size. Her fixed costs (the building, the loan on the equipment and a licence) are US\\$30 a day.\n\nThe cooperatives have complained that the price is too high. They say that the factory earns supernormal profit and should be regulated. Rudo replies that her profit is needed to repay the loan and to replace the equipment, and that a price cap would force her to close the factory, leaving fishers with no ice at all. The factory manager, whose bonus depends on the value of ice sold, has suggested that she should aim to sell as much ice as possible in terms of revenue.\n\n**Table 1: daily revenue and costs of Lakeshore Ice** (illustrative data; output in tonnes of ice)\n\n${ps.md}`,
    parts: checkExam(EXAM.CAM_P4_DATA, [
      P.group({ label: "(a)", stem: "Use Table 1.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: R[4].tr, stem: "State the total revenue when 4 tonnes are sold, in US\\$.", wrong: [24, 12, 83], explanation: "TR = 24 × 4 = US\\$96." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: R[5].mr, stem: "Calculate the marginal revenue of the fifth tonne, in US\\$.", wrong: [20, 100, 15], explanation: "TR at 5 tonnes = 100; TR at 4 tonnes = 96; MR = US\\$4." }),
      ] }),
      P.group({ label: "(b)", stem: "The factory is a profit maximiser.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "plain", value: 4, unit: "units", stem: "State the profit-maximising output, in tonnes.", wrong: [3, 5, 6], explanation: "At 4 tonnes MR (12) exceeds MC (11); at 5 tonnes MR (4) is below MC (15)." }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: ps.best.profit, stem: "State the profit at that output, in US\\$.", wrong: [96, 83, 2], explanation: "TR 96 − TC 83 = US\\$13." }),
        P.manual({ label: "(iii)", marks: 3, stem: "Explain, using the data, why profit is lower at 5 tonnes than at 4 tonnes.", points: ["The fifth tonne adds US\\$4 to revenue (MR).", "It adds US\\$15 to cost (MC).", "So profit falls by US\\$11, from US\\$13 to US\\$2."],
          modelAnswer: "The fifth tonne brings in only US\\$4 of extra revenue because the price has to fall to US\\$20 on all tonnes, but it adds US\\$15 to cost. Marginal cost exceeds marginal revenue, so profit falls by US\\$11, from US\\$13 to US\\$2." }),
      ] }),
      P.group({ label: "(c)", stem: "The manager suggests aiming to maximise revenue.", parts: [
        P.num({ label: "(i)", marks: 1, kind: "plain", value: 5, unit: "units", stem: "State the output that maximises total revenue, in tonnes.", wrong: [4, 6, 3], explanation: "TR is 96, 100, 96 at 4, 5 and 6 tonnes: the maximum is at 5." }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: R[5].profit, stem: "State the profit at that output, in US\\$.", wrong: [100, 13, 98], explanation: "TR 100 − TC 98 = US\\$2." }),
        P.manual({ label: "(iii)", marks: 3, stem: "Explain why the manager might prefer revenue maximisation to profit maximisation.", points: ["The manager's bonus depends on the value of ice sold, not profit.", "Managers and owners have different aims (principal-agent problem).", "Revenue maximisation gives a larger output and market share at the cost of lower profit."],
          modelAnswer: "The manager's bonus depends on the value of sales, so he gains from the larger revenue even though the owner's profit falls from US\\$13 to US\\$2. This is a principal-agent problem: the manager (agent) has a different aim from the owner (principal), and because the owner cannot easily monitor him, he may press for a larger output." }),
      ] }),
      P.manual({ label: "(d)", marks: 7, type: "EXTENDED_RESPONSE", wordLimit: { min: 120, max: 350 }, levels: LV7,
        stem: "Evaluate whether the government should regulate the price charged by Lakeshore Ice.",
        points: ["The price (US\\$24) is well above marginal cost (US\\$11): output is lower than the efficient level and consumers lose.", "Supernormal profit: ATC at 4 tonnes is US\\$20.75 against a price of US\\$24.", "Barriers (small market, high investment) mean that entry is unlikely, so profit will persist.", "A price cap could raise output and lower the price for the cooperatives.", "But a cap set too low would make a loss and the factory could close, leaving no ice (natural monopoly).", "The regulator lacks information about true costs; regulation costs money.", "Judgement: regulation could be justified, with a cap set above average cost."],
        modelAnswer: "The price of US\\$24 is far above the marginal cost of US\\$11, so output is lower than it would be in a competitive market and the cooperatives pay more than they need to. The average total cost at 4 tonnes is US\\$20.75, so the factory earns a supernormal profit, and because the market is small and entry needs heavy investment, that profit is unlikely to be competed away. A price cap would lower the price and raise output. However, Rudo is right that the profit pays for the equipment, and this is a natural monopoly: two factories could not both survive, so competition is not a solution. A cap below average cost would force her to close, leaving the fishers with no ice, and the regulator would need good information about her costs. A cap set above average total cost, so that she still earns normal profit, would help the cooperatives without threatening the factory. On balance, regulation is justified if it is set carefully, because the cooperatives have no alternative supplier." }),
    ]),
    explanation: "TR at 4 tonnes US\\$96; MR of the fifth tonne US\\$4; profit maximised at 4 tonnes (US\\$13); revenue is maximised at 5 tonnes (profit US\\$2); regulation depends on how the cap compares with average cost.",
  });

  // ------------------------------------------------------------------ Paper 4 essays (microeconomics)
  b.essay({
    ...P4E, d: 5, marks: 20,
    concepts: [A("firms.monopoly"), A("firms.structures-features")],
    hints: ["Weigh the costs of monopoly against economies of scale, innovation and regulation.", "Reach a judgement on when breaking up a monopoly is justified."],
    stem: "'Monopolies should always be broken up into smaller firms.' Discuss.",
    points: [
      ["Defines monopoly: a single seller with barriers to entry, a price-maker.", 2],
      ["Monopoly equilibrium: MC = MR, price above marginal cost, output lower than in competition.", 3, ["MC = MR", "P > MC"]],
      ["Welfare loss / allocative inefficiency and transfer of surplus to the firm (supernormal profit).", 3],
      ["X-inefficiency and little incentive to innovate or control costs without competition.", 2],
      ["Breaking up may increase competition, lower prices and raise output.", 2],
      ["Economies of scale: many small firms may have higher average costs than one large firm.", 2],
      ["Natural monopoly: competition would duplicate networks; regulation may be better than breaking up.", 2],
      ["Monopoly profit may fund research, development and investment (dynamic efficiency).", 1],
      ["Regulation (price caps, average-cost pricing) and contestability can discipline a monopolist.", 1],
      ["Costs and difficulty of breaking up (transition costs, loss of scale, enforcement).", 1],
      ["Judgement: depends on size of economies of scale and the possibility of competition or regulation.", 1],
    ],
    levels: LV20, wordLimit: { min: 300, max: 900 },
    modelAnswer: "A monopoly is the only seller of a product and is protected by barriers to entry, so it is a price-maker. It maximises profit where marginal cost equals marginal revenue, which gives a lower output and a higher price than a competitive market would: price is above marginal cost, so the market is allocatively inefficient, there is a deadweight loss, and surplus is transferred from consumers to the firm as supernormal profit. Without rivals the firm may also be X-inefficient and have little reason to improve. These arguments suggest that breaking up the monopoly into competing firms could lower prices and raise output. But the case for breaking it up is not always strong. If there are large economies of scale, several small firms would have a higher average cost than one large firm, so breaking up the monopoly could raise the cost of production and possibly the price as well. In a natural monopoly, such as an electricity or water network, competition would duplicate the network at great cost, so regulation is usually preferred, for example price caps, or pricing at average cost, which gives the firm normal profit while lowering price. Monopoly profit can also fund research and investment, so dynamic efficiency may be higher than in a competitive market, and if the market is contestable the firm may keep its price close to cost anyway. Breaking up a firm is also costly and difficult to enforce. Overall, a monopoly should not always be broken up. Where there are no major economies of scale and the market can support rivals, breaking it up is likely to benefit consumers; where economies of scale are large, regulation is the better way to protect consumers." ,
    explanation: "Monopoly harms consumers through P > MC, but economies of scale, natural monopoly and regulation mean that breaking up is not always best.",
  });

  b.essay({
    ...P4E, d: 5, marks: 20,
    concepts: [A("firms.oligopoly"), A("firms.collusion-game-theory"), A("firms.structures-features")],
    hints: ["Consider both competition between the few firms and the chance of collusion.", "Use contestability and concentration ratios in your evaluation."],
    stem: "Assess whether a market with only a few large firms must lead to higher prices for consumers.",
    points: [
      ["Defines oligopoly and the concentration ratio; barriers to entry and interdependence.", 2],
      ["Higher prices: firms with market power may price above marginal cost and earn supernormal profit.", 2],
      ["Collusion (overt or tacit) lets firms behave like a monopolist; cartels raise price and cut output.", 3],
      ["Collusion is unstable: the Prisoner's Dilemma, the incentive to cheat and the need for few firms, similar products and high barriers.", 3, ["dominant strategy", "Nash equilibrium"]],
      ["Competition between rivals: price wars and non-price competition (quality, service) may benefit consumers.", 3],
      ["Interdependence and kinked demand: prices may be stable but not necessarily high.", 1],
      ["Economies of scale: a few large firms may have lower costs than many small firms, allowing lower prices.", 2],
      ["Contestability: low sunk costs and the threat of entry restrain prices even with few firms.", 2],
      ["Competition law, regulation and import competition limit abuse.", 1],
      ["Evaluation: the effect depends on the behaviour of the firms and on barriers; a concentration ratio alone does not show price levels.", 1],
    ],
    levels: LV20, wordLimit: { min: 300, max: 900 },
    modelAnswer: "In an oligopoly a few large firms supply most of the market, entry is difficult and the firms are interdependent. With market power they may charge prices above marginal cost and earn supernormal profit, and if they collude, either openly in a cartel or tacitly by following a price leader, they can restrict output and raise prices as a monopolist would, at the expense of consumers. However, collusion is not certain, and often does not last. The Prisoner's Dilemma shows that each firm can gain by cheating whatever the others do, so if all cheat the agreed price collapses. Collusion is easier when there are few firms, similar products and high barriers to entry, and is illegal in most countries. Where rivals compete, consumers may benefit from price wars and from non-price competition, such as better quality and service, though the kinked demand curve suggests that firms prefer to avoid price cuts. Moreover, a few large firms may have large economies of scale, which allow them to produce at lower cost than many small firms and to pass on some of the saving. If the market is contestable, with low sunk costs, the threat of entry can restrain prices, and imports and competition law may also limit what firms can do. A concentration ratio alone says little about price levels, because it does not show whether the firms compete. Overall, a market with few firms does not have to lead to higher prices: prices are likely to be high where the firms collude and barriers are high, and lower where they compete, where costs are lower because of scale, or where entry is easy.",
    explanation: "The outcome depends on whether the few firms compete or collude, on economies of scale and on contestability.",
  });
});
