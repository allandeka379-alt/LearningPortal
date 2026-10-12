// W2a: market structures: features, barriers to entry and contestable markets (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, concentrationRatio, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.firms.structures-features", { file: "firms/structures-features", keyPrefix: "firms.structures-features" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const shares = [28, 22, 15, 12, 8, 5, 4, 3, 3];
  chk(shares.reduce((s, x) => s + x, 0), 100);
  chk(concentrationRatio(shares, 3), 65, 1e-9); chk(concentrationRatio(shares, 4), 77, 1e-9);

  mc({ d: 1, skill: "RECALL", stem: "Which feature is a characteristic of perfect competition?",
    explanation: "In perfect competition all firms sell an identical (homogeneous) product, so buyers have no reason to prefer one seller." },
    ["Firms sell identical products", "Correct."], [["There are only a few firms", "That describes oligopoly."], ["Firms are protected by barriers to entry", "Perfect competition has free entry and exit."], ["Each firm sets its own price", "Firms are price-takers."]]);

  mc({ d: 1, skill: "RECALL", stem: "A market with a single seller of a product with no close substitutes is a",
    explanation: "A monopoly has one seller, protected by barriers to entry." },
    ["monopoly", "Correct."], [["perfectly competitive market", "This has very many sellers."], ["monopolistic competition", "This has many sellers of differentiated products."], ["oligopoly", "This has a few large sellers."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which of the following is a legal barrier to entry?",
    explanation: "A patent gives the holder the sole right to produce an invention for a period, so rivals cannot enter legally." },
    ["A patent on a new drug", "Correct."], [["Heavy advertising spending by existing firms", "This is a market (strategic) barrier."], ["Large economies of scale", "This is a cost barrier."], ["Ownership of the only source of a raw material", "This is a resource (physical) barrier."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A market is described as contestable if",
    explanation: "A contestable market has free entry and costless exit, with low sunk costs, so the threat of entry restrains existing firms." },
    ["entry is easy and exit is costless", "Correct."], [["there are many firms in the market", "Contestability concerns entry, not the number of firms."], ["the product of each firm is identical", "This is a feature of perfect competition, not of contestability."], ["firms make only normal profit at present", "Profit may be normal because of the threat of entry, but it is not the definition."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "An n-firm concentration ratio measures the",
    explanation: "It is the combined market share of the n largest firms in the industry." },
    ["combined market share of the largest n firms", "Correct."], [["profit of the largest n firms", "Concentration ratios use market shares, not profit."], ["number of firms needed to supply the whole market", "This is not what is measured."], ["market share of the smallest n firms", "The largest firms are used."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Think about product, number of firms and entry."],
    stem: "Many hair salons in a town offer different styles and services, and new salons can open easily. This market is best described as",
    explanation: "Many firms, differentiated products and easy entry are the features of monopolistic competition." },
    ["monopolistic competition", "Correct."], [["perfect competition", "Salons are not identical."], ["oligopoly", "There are many salons, not a few."], ["monopoly", "There are many sellers."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Which costs cannot be recovered on leaving?"],
    stem: "Which of the following is a sunk cost for a firm that leaves a market?",
    explanation: "Money spent on advertising a brand cannot be recovered when the firm exits; premises and vehicles can be sold." },
    ["Money already spent on advertising", "Correct: it cannot be recovered."], [["The resale value of a delivery van", "The van can be sold, so its cost is recoverable."], ["Rent on a shop that can be sublet", "This can be recovered by subletting."], ["Stock that can be sold to another firm", "Stock can be resold."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Think about the threat of entry."],
    stem: "A single firm operates a market that is highly contestable. Compared with a monopolist protected by barriers, it is likely to",
    explanation: "The threat of hit-and-run entry makes the firm keep price close to average cost and avoid supernormal profit." },
    ["keep its price close to average cost", "Correct."], [["charge a much higher price", "That would attract entrants."], ["earn large supernormal profit for many years", "Entry would erode it."], ["restrict output to the monopoly level", "A contestable market disciplines the firm."]]);

  {
    const v = concentrationRatio(shares, 3);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: v, dp: 0, unit: "%", wrong: [28, 77, 22],
      stem: "The market shares of the largest firms in a fictional soft-drinks market are 28%, 22% and 15%. Calculate the three-firm concentration ratio.",
      explanation: "28 + 22 + 15 = 65%." });
  }
  {
    const v = concentrationRatio([450, 300, 150, 60, 40], 2);
    chk(v, 75, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: v, dp: 0, unit: "%", hints: ["Convert sales into shares of total sales first."],
      wrong: [45, 30, 25],
      stem: "Five firms in a fictional market have sales of US\\$450 million, US\\$300 million, US\\$150 million, US\\$60 million and US\\$40 million. Calculate the two-firm concentration ratio.",
      explanation: "Total sales = 1,000. The two largest firms sell 450 + 300 = 750, which is 750 ÷ 1,000 × 100 = 75%. The figure 45% is the share of one firm." });
  }
  {
    const v = 1000000 / 250000;
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: v, unit: "units", hints: ["Market size divided by minimum efficient scale."],
      wrong: [0.25, 250000, 5],
      stem: "A fictional cement market has demand of 1,000,000 tonnes a year. The minimum efficient scale of a plant is 250,000 tonnes a year. What is the maximum number of plants that can all operate at minimum average cost?",
      explanation: "1,000,000 ÷ 250,000 = 4." });
  }
  {
    const v = (50000 / 1000000) * 100;
    b.num({ d: 3, skill: "ANALYSIS", kind: "pct", value: v, dp: 0, unit: "%", hints: ["Share = output ÷ market size × 100."],
      wrong: [20, 0.5, 5000],
      stem: "A new firm plans to produce 50,000 tonnes a year in the cement market of 1,000,000 tonnes. Calculate its planned market share.",
      explanation: "50,000 ÷ 1,000,000 × 100 = 5%. A firm this small is at a cost disadvantage if the minimum efficient scale is 250,000 tonnes." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A market with only one firm cannot be contestable.", answer: false,
    explanation: "False. If entry is easy and exit is costless, even a single firm is disciplined by the threat of entry." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each market structure with its description.",
    pairs: [["Perfect competition", "Very many sellers of an identical product with free entry"], ["Monopolistic competition", "Many sellers of differentiated products with easy entry"], ["Oligopoly", "A few large firms whose decisions are interdependent"], ["Monopoly", "A single seller protected by barriers to entry"]],
    extraRight: ["A single buyer of labour"],
    explanation: "The last statement describes a monopsony, not a market structure for products." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "Costs that cannot be {{blank:a}} when a firm leaves a market are called {{blank:b}} costs, and they make a market less contestable.",
    blanks: [{ id: "a", accepted: ["recovered"], choices: ["recovered", "avoided", "measured"] }, { id: "b", accepted: ["sunk"], choices: ["sunk", "fixed", "marginal"] }],
    explanation: "Sunk costs are irrecoverable on exit." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the market structure in which a few large firms dominate and each takes account of its rivals' reactions.",
    accepted: ["oligopoly"], wrong: ["monopoly"],
    explanation: "Oligopoly is characterised by a few dominant firms and interdependence." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define barriers to entry.",
    points: ["Obstacles that make it difficult for new firms to enter a market.", "They protect existing firms from competition (and allow supernormal profit to persist)."],
    modelAnswer: "Barriers to entry are obstacles, such as patents, economies of scale or brand loyalty, that make it difficult for new firms to enter a market and compete with existing firms.", explanation: "Obstacles to new firms." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each barrier and say how it stops entry."],
    stem: "Explain **two** barriers to entry that could protect a firm in a manufacturing industry.",
    points: ["First barrier identified (for example economies of scale).", "Explained: a new small firm would have higher average costs than the large firm and could not compete on price.", "Second barrier identified (for example a patent, a brand or control of a resource).", "Explained: rivals are legally prevented or must spend heavily to match the established brand."],
    modelAnswer: "Economies of scale: a large established firm has low average costs, so a new firm producing a small output would have higher costs and could not compete on price. Patents: the law gives the holder the sole right to use a process or invention, so rivals cannot legally copy it and cannot enter that market.",
    explanation: "Two barriers, each explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Contestable markets and sunk costs."],
    stem: "Explain why a market with only one or two firms may still be competitive if it is contestable.",
    points: ["A contestable market has no or low barriers to entry.", "Exit is costless, because sunk costs are low.", "Potential entrants can enter, take profits and leave (hit-and-run).", "Existing firms therefore keep prices close to average cost to avoid attracting entrants.", "Supernormal profit is limited, as in a more competitive market."],
    modelAnswer: "In a contestable market a new firm can enter easily and leave without losing money, because sunk costs are low. If the existing firms charged high prices and earned supernormal profit, new firms could enter, take some of the profit and leave. To avoid this, existing firms keep prices close to average cost, so the market is competitive in behaviour even with only one or two firms.",
    explanation: "The threat of entry disciplines behaviour." });

  {
    const sh = [32, 25, 18, 12, 8, 5];
    chk(sh.reduce((s, x) => s + x, 0), 100);
    const md = table(["Firm", "Market share (%)"], sh.map((s, i) => [String.fromCharCode(65 + i), s]));
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Add the shares of the largest firms."],
      stem: `The table shows the market shares of six firms in a fictional mobile-data market (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: concentrationRatio(sh, 3), dp: 0, unit: "%", stem: "Calculate the three-firm concentration ratio.", wrong: [32, 57, 100], explanation: "32 + 25 + 18 = 75%." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: concentrationRatio(sh, 2), dp: 0, unit: "%", stem: "Calculate the two-firm concentration ratio.", wrong: [25, 43, 75], explanation: "32 + 25 = 57%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The data suggest that the market is best described as", options: [["an oligopoly", "Correct: three firms hold 75% of the market."], ["perfect competition", "Perfect competition has very many small firms."], ["a monopoly", "No firm has the whole market."], ["monopolistic competition", "A high concentration ratio points to a few dominant firms."]], answer: "A", explanation: "A high concentration ratio indicates oligopoly." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** limitation of using concentration ratios to judge how competitive a market is.", points: ["A limitation identified (for example they hide competition between the leaders, ignore imports, or depend on the market definition).", "Explained.", "Link to judging competitiveness."],
          modelAnswer: "A concentration ratio does not show how fiercely the leading firms compete, so a market with a high ratio may still have price wars. It also ignores competition from imports and potential entrants, so it can overstate the lack of competition." }),
      ],
      explanation: "CR3 = 75%, CR2 = 57%; high concentration suggests oligopoly, though ratios have limitations." });
  }
  {
    const f = (50000 / 1000000) * 100;
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Market size ÷ minimum efficient scale gives the number of efficient firms."],
      stem: "A fictional cement market demands 1,000 thousand tonnes a year. A plant reaches the minimum average cost at 250 thousand tonnes a year, and building one needs a large amount of capital. The two existing producers each hold about half of the market. A new firm is considering entry with a plant of 50 thousand tonnes.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 4, unit: "units", stem: "How many plants could operate at the minimum efficient scale in this market?", wrong: [5, 20, 250], explanation: "1,000 ÷ 250 = 4." }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: f, dp: 0, unit: "%", stem: "Calculate the planned market share of the new firm.", wrong: [20, 50, 0.5], explanation: "50 ÷ 1,000 × 100 = 5%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The main barrier to entry in this example is", options: [["economies of scale", "Correct: the minimum efficient scale is large relative to what a new firm can sell."], ["a legal monopoly", "No legal restriction is mentioned."], ["product differentiation", "Cement is a similar product across firms."], ["a patent", "No patent is mentioned."]], answer: "A", explanation: "A plant of 50 thousand tonnes is far below the 250 thousand tonnes needed for lowest cost." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why economies of scale make it difficult for the new firm to compete.", points: ["The new firm would be far below minimum efficient scale.", "Its average cost per tonne would be higher than that of the established firms.", "It could not match their prices without making a loss."],
          modelAnswer: "The new firm's output is only a fifth of the minimum efficient scale, so its average cost is much higher than that of the established producers. If it tried to match their price it would make a loss, so it is unable to compete." }),
        P.manual({ label: "(e)", marks: 4, stem: "Assess whether this market is likely to be contestable.", points: ["Large capital costs mean high sunk costs if the firm leaves.", "Plants are specialised and cannot easily be sold, making exit costly.", "Low contestability: existing firms are not strongly disciplined by the threat of entry.", "Judgement: entry is unlikely unless the market grows, so the two firms may keep prices above cost."],
          modelAnswer: "The market is unlikely to be contestable. The capital cost of a plant is high and a cement plant is specialised, so most of the cost cannot be recovered on leaving: these are large sunk costs. A rival cannot enter and leave quickly, so the threat of entry does little to restrain the two existing firms, who may keep prices above cost." }),
      ],
      explanation: "Four efficient plants fit the market; the entrant would have a 5% share and high costs; sunk costs make the market non-contestable." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Think about contestability and rivalry."],
    stem: "Assess whether a market with only a few firms is necessarily uncompetitive.",
    points: ["A small number of firms with high barriers can restrict output and raise price (collusion, supernormal profit).", "Concentration ratios show the market structure, not behaviour.", "Few firms may compete fiercely through price wars, advertising and innovation.", "If the market is contestable, the threat of entry keeps prices close to cost.", "Import competition may discipline domestic firms.", "Economies of scale may justify few firms and lower costs.", "Competition law and regulation may restrain behaviour.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A market with few firms and high barriers can be uncompetitive: the firms may collude, restrict output and earn supernormal profit. But the number of firms alone does not decide behaviour. Rival firms may compete fiercely through price cuts, advertising and innovation. If the market is contestable, with low sunk costs, the threat of entry keeps prices close to cost, and imports may also limit domestic firms' power. Competition law can restrain abuse. A few firms may also be needed to gain economies of scale. Overall, a market with few firms is not necessarily uncompetitive: it depends on the barriers, the sunk costs and the rivalry between the firms.",
    explanation: "The degree of competition depends on behaviour and contestability, not only on numbers." });

  b.card("DEFINITION", "Define **barriers to entry**.", "Obstacles that make it difficult for new firms to enter a market and compete with existing firms.");
  b.card("DEFINITION", "What is a **contestable market**?", "A market with free entry and costless exit (low sunk costs), so the threat of entry disciplines existing firms.");
  b.card("DEFINITION", "What is a **sunk cost**?", "A cost that cannot be recovered when a firm leaves the market, such as past advertising or specialised equipment.");
  b.card("FORMULA", "How is an n-firm concentration ratio calculated?", "Add the market shares (%) of the n largest firms.");
  b.card("CONCEPT", "Four kinds of barriers to entry?", "Legal (patents, licences), market (brands, advertising, limit pricing), cost (economies of scale), physical or resource (control of key inputs).");
  b.card("CONCEPT", "What is a natural monopoly?", "A market where economies of scale are so large that one firm can supply the whole market at lowest average cost.");
  b.card("FACT", "How does a contestable market affect a monopolist's behaviour?", "It keeps price close to average cost and limits supernormal profit, for fear of hit-and-run entry.");
  b.card("CONCEPT", "Features of monopolistic competition?", "Many firms, differentiated products, easy entry and exit, some price control.");
  b.card("CONCEPT", "Limitation of concentration ratios?", "They hide the distribution among leaders, depend on market definition, ignore imports and say nothing about barriers or behaviour.");
});
