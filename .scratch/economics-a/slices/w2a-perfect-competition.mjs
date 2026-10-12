// W2a: perfect competition (both boards; ZIMSEC Form 5, Cambridge A Level).
import { concept, P, chk, fmt, dpStr, costTable } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.firms.perfect-competition", { file: "firms/perfect-competition", keyPrefix: "firms.perfect-competition" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const ct = costTable({ output: [0, 1, 2, 3, 4, 5, 6, 7, 8], fc: 40, vc: [0, 30, 52, 66, 81, 100, 130, 172, 226], marginal: true });
  const R = ct.rows;
  const best = (price) => R.slice(1).map((r) => ({ q: r.q, profit: price * r.q - r.tc, avc: r.avc, atc: r.atc })).reduce((m, r) => (r.profit > m.profit ? r : m));
  chk(best(36).q, 6); chk(best(36).profit, 46, 1e-9);
  chk(best(28).q, 5); chk(best(28).profit, 0, 1e-9);
  chk(best(24).q, 5); chk(best(24).profit, -20, 1e-9);
  chk(best(18).q, 4); chk(best(18).profit, -49, 1e-9);
  chk(Math.min(...R.slice(1).map((r) => r.atc)), 28, 1e-9); chk(Math.min(...R.slice(1).map((r) => r.avc)), 20, 1e-9);

  mc({ d: 1, skill: "RECALL", stem: "In perfect competition, an individual firm is a price-taker because",
    explanation: "Each firm is so small relative to the market, and sells an identical product, that it cannot affect the market price." },
    ["it is too small to influence the market price", "Correct."], [["the government sets the price", "In perfect competition the market sets the price."], ["it has no costs of production", "Firms have costs like any other."], ["it faces a downward-sloping demand curve", "A price-taker's demand curve is horizontal."]]);

  mc({ d: 1, skill: "RECALL", stem: "The demand curve facing an individual firm in perfect competition is",
    explanation: "The firm can sell any quantity at the market price, so its demand curve is horizontal at that price." },
    ["horizontal at the market price", "Correct."], [["vertical at the market quantity", "A vertical curve shows a fixed quantity regardless of price."], ["downward sloping", "This applies to firms with market power."], ["upward sloping", "Demand curves do not slope upward."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A perfectly competitive firm maximises profit by producing the output at which",
    explanation: "Because MR equals the price, the firm produces where price equals marginal cost, with MC rising." },
    ["price equals marginal cost", "Correct: P = MR = MC."], [["price equals average fixed cost", "Fixed cost is not the profit-maximising rule."], ["marginal revenue equals zero", "Marginal revenue equals price here, which is positive."], ["average cost is at a maximum", "Average cost has a minimum, not a maximum."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The short-run supply curve of a perfectly competitive firm is the part of its marginal cost curve",
    explanation: "The firm supplies where P = MC, but only if price covers average variable cost, so supply is MC above minimum AVC." },
    ["above the minimum of average variable cost", "Correct."], [["below the minimum of average variable cost", "At these prices the firm would shut down."], ["below the minimum of average total cost", "The short-run test uses AVC, not ATC."], ["above the maximum of average fixed cost", "AFC does not determine the supply curve."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "In the long run, supernormal profit in a perfectly competitive industry leads to",
    explanation: "Supernormal profit attracts new firms, supply shifts right and the price falls until only normal profit is earned." },
    ["entry of new firms and a fall in the market price", "Correct."], [["exit of existing firms and a rise in the price", "That follows losses."], ["a permanent increase in profit", "Free entry removes supernormal profit."], ["a rise in the price as demand shifts right", "Entry raises supply and lowers price."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Which two types of efficiency are achieved?"],
    stem: "In long-run equilibrium a perfectly competitive firm is productively efficient because",
    explanation: "Productive efficiency means producing at the lowest possible average cost: in long-run equilibrium P = minimum ATC." },
    ["it produces at the minimum point of average total cost", "Correct."], [["price is above marginal cost and output is below the competitive level", "That would be allocative inefficiency."], ["it earns supernormal profit that attracts entrants", "In the long run only normal profit is earned."], ["it can set its own price", "A price-taker cannot set price."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare price with AVC and ATC."],
    stem: "A perfectly competitive firm finds that the price is below average total cost but above average variable cost. In the short run it should",
    explanation: "Price covers variable cost and makes a contribution to fixed cost, so the loss is smaller than if it closed." },
    ["continue to produce where price equals marginal cost", "Correct."], [["shut down at once and leave the industry for good", "That is correct only if price is below AVC."], ["raise its price until it covers average total cost", "A price-taker cannot choose price."], ["increase output until average cost equals price", "Output is set by P = MC; it cannot remove the loss."]]);

  mc({ d: 4, skill: "ANALYSIS", hints: ["Think about a rise in demand and the speed of entry."],
    stem: "Demand for a good produced in a perfectly competitive market rises. Compared with the short-run position, in the long run the market price will",
    explanation: "A rise in demand raises price and creates supernormal profit in the short run; entry increases supply and brings the price back towards the minimum ATC (with constant costs)." },
    ["be lower than in the short run", "Correct: entry increases supply."], [["be higher than in the short run", "Entry lowers the price."], ["stay the same as in the short run", "Supernormal profit is competed away in the long run."], ["rise to the monopoly price", "Free entry prevents this."]]);

  {
    const e = best(36);
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: e.q, unit: "units", hints: ["Produce while marginal cost is below the price."],
      wrong: [7, 5, 36],
      stem: "A price-taking farm faces a market price of US\\$36. Its marginal cost is US\\$30 for the sixth unit and US\\$42 for the seventh. How many units does it produce?",
      explanation: "It produces 6 units: MC of the sixth (30) is below the price; MC of the seventh (42) is above it." });
  }
  {
    const e = best(36);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: e.profit, hints: ["TR = price × output."],
      wrong: [216, 170, 36],
      stem: "At a price of US\\$36 the farm produces 6 units and its total cost is US\\$170. Calculate its profit, in US\\$.",
      explanation: "TR = 36 × 6 = 216; profit = 216 − 170 = US\\$46." });
  }
  {
    const e = best(24);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: e.profit, hints: ["A loss is negative."],
      wrong: [20, 120, 140],
      stem: "At a price of US\\$24 the farm produces 5 units, with total cost of US\\$140. Calculate its profit (a loss is negative), in US\\$.",
      explanation: "TR = 24 × 5 = 120; profit = 120 − 140 = −US\\$20, a loss of US\\$20 (smaller than the fixed cost of US\\$40)." });
  }
  {
    const v = 600 / 5;
    b.num({ d: 4, skill: "APPLICATION", kind: "plain", value: v, unit: "units", hints: ["Industry output ÷ output per firm."],
      wrong: [3000, 5, 100],
      stem: "In long-run equilibrium each firm produces 5 tonnes. At the long-run price the market demands 600 tonnes. How many firms are in the industry?",
      explanation: "600 ÷ 5 = 120 firms." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In long-run equilibrium a perfectly competitive firm earns supernormal profit.", answer: false,
    explanation: "False. Entry removes supernormal profit, leaving normal profit with price equal to minimum average total cost." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each situation in perfect competition with the firm's response.",
    pairs: [["Price above average total cost", "Supernormal profit, so new firms enter"], ["Price equal to minimum average total cost", "Normal profit: long-run equilibrium"], ["Price below ATC but above AVC", "Loss in the short run, but keep producing"], ["Price below AVC", "Shut down"]],
    extraRight: ["Raise price to cover costs"],
    explanation: "A price-taker cannot raise price; it compares the market price with ATC and AVC." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "In perfect competition, price equals average revenue and equals {{blank:a}} revenue, because each firm is a price-{{blank:b}}.",
    blanks: [{ id: "a", accepted: ["marginal"], choices: ["marginal", "total", "average fixed"] }, { id: "b", accepted: ["taker"], choices: ["taker", "maker", "setter"] }],
    explanation: "P = AR = MR for a price-taker." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of efficiency that is achieved when price equals marginal cost.",
    accepted: ["allocative efficiency", "allocative"], wrong: ["productive efficiency"],
    explanation: "Allocative efficiency: P = MC means resources are allocated to match consumers' valuations." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 3, stem: "State **three** assumptions of perfect competition.",
    points: ["Very many buyers and sellers (each a price-taker).", "Identical (homogeneous) products.", "Freedom of entry and exit (and perfect information)."],
    modelAnswer: "There are very many buyers and sellers, each too small to affect the price; the product is identical across firms; there is freedom of entry and exit, and everyone has perfect information.", explanation: "Three of the standard assumptions." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Describe each step from profit to long-run equilibrium."],
    stem: "Explain how a perfectly competitive industry returns to long-run equilibrium after a rise in demand has created supernormal profit.",
    points: ["Supernormal profit attracts new firms (free entry).", "Industry supply shifts to the right.", "The market price falls.", "Entry stops when price equals minimum ATC and only normal profit is earned."],
    modelAnswer: "Supernormal profit attracts new firms because entry is free. As they enter, industry supply shifts to the right and the market price falls. Each firm's profit falls until price equals the minimum of average total cost. At that point only normal profit is earned and there is no incentive for more firms to enter.",
    explanation: "Entry, falling price, normal profit." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Productive and allocative efficiency, then dynamic limits."],
    stem: "Assess the efficiency of perfect competition in the long run.",
    points: ["Productively efficient: output where ATC is at its minimum.", "Allocatively efficient: price equals marginal cost.", "Only normal profit, so no abuse of market power.", "Limit: little supernormal profit for research, so dynamic efficiency may be low (and the assumptions are unrealistic)."],
    modelAnswer: "In the long run a perfectly competitive firm produces at the minimum of average total cost, so it is productively efficient, and price equals marginal cost, so it is allocatively efficient. Firms earn only normal profit. However, there is no supernormal profit to pay for research and innovation, so dynamic efficiency may be weak, and the assumptions are rarely met in the real world.",
    explanation: "Static efficiency high; dynamic efficiency doubtful." });

  {
    const e = best(36);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Produce where MC is just below the price.", "Profit = TR − TC."],
      stem: `The costs of a fictional price-taking maize farm are shown below (illustrative data; output in tonnes). The market price is US\\$36 per tonne.\n\n${ct.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: e.q, unit: "units", stem: "State the profit-maximising output.", wrong: [7, 5, 8], explanation: "MC of the sixth tonne (30) is below the price; MC of the seventh (42) is above it." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: e.profit, stem: "Calculate the farm's profit.", wrong: [216, 170, 7.67], explanation: "TR = 216; TC = 170; profit = US\\$46." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The farm is earning", options: [["supernormal profit", "Correct: price (36) exceeds ATC (28.33)."], ["normal profit", "Normal profit needs price to equal ATC."], ["a loss covering only fixed cost", "Revenue exceeds total cost."], ["subnormal profit", "Revenue exceeds total cost."]], answer: "A", explanation: "AR (36) is above ATC (28.33)." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain what will happen to this farm's profit in the long run.", points: ["Supernormal profit attracts new farms (free entry).", "Industry supply rises and the market price falls.", "Profit falls to normal profit when price reaches the minimum ATC (US\\$28)."],
          modelAnswer: "The supernormal profit attracts new farmers, because entry is free. Industry supply rises and the market price falls. Entry continues until the price falls to the minimum average total cost, US\\$28 per tonne, at which point the farm earns only normal profit." }),
      ],
      explanation: "Output 6 tonnes; profit US\\$46 (supernormal); entry reduces the price towards US\\$28 and profit to normal." });
  }
  {
    const e = best(18);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Compare the loss from producing with the loss from closing."],
      stem: `After a bumper harvest the market price of maize in the fictional market falls to US\\$18 per tonne. The farm's costs are in the table below (fixed cost US\\$40).\n\n${ct.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: e.q, unit: "units", stem: "If the farm produces, what output minimises its loss?", wrong: [5, 3, 6], explanation: "MC of the fourth tonne (15) is below US\\$18; MC of the fifth (19) is above it." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: e.profit, stem: "Calculate its profit at that output (a loss is negative).", wrong: [-40, 72, 121], explanation: "TR = 18 × 4 = 72; TC = 121; profit = −US\\$49." }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: -40, stem: "Calculate its profit if it shuts down (a loss is negative).", wrong: [40, 0, -49], explanation: "Only the fixed cost of US\\$40 is paid." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain whether the farm should continue to produce in the short run.", points: ["Price (18) is below average variable cost at 4 tonnes (20.25).", "Producing loses US\\$49 against US\\$40 if it shuts down.", "So it should shut down in the short run."],
          modelAnswer: "The price of US\\$18 is below the average variable cost of US\\$20.25, so each tonne fails to cover its variable cost. Producing would lose US\\$49, while shutting down loses only the fixed cost of US\\$40, so the farm should shut down in the short run." }),
        P.manual({ label: "(e)", marks: 4, stem: "Explain what will happen to the number of farms and the price in the long run if many farms make losses.", points: ["Price below ATC means subnormal profit or losses.", "Some farms leave the industry.", "Industry supply shifts to the left, so the price rises.", "Exit stops when the price returns to minimum ATC and farms earn normal profit."],
          modelAnswer: "Because the price is below average total cost, farms make losses and some leave the industry. Industry supply shifts to the left and the price rises. Exit continues until the price is back at the minimum average total cost, when the remaining farms earn normal profit." }),
      ],
      explanation: "Producing loses US\\$49; closing loses US\\$40; price is below AVC so shut down; exit eventually raises the price." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare the assumptions with a real market."],
    stem: "Assess the usefulness of the model of perfect competition for understanding a real market such as a town's market for tomatoes.",
    points: ["Many sellers of similar produce and price-taking behaviour fit the market reasonably well.", "Easy entry for small growers.", "But products are not perfectly identical (quality, freshness) and information is imperfect.", "Weather, perishability and bulk buyers can distort the market.", "The model predicts price changes after shifts in supply and demand quite well.", "It gives a benchmark for efficiency (P = MC, minimum ATC).", "Real markets have transport costs and some sellers with market power.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "A town market for tomatoes has many small sellers, similar produce and easy entry, so sellers behave much like price-takers and the model predicts well how price changes when supply or demand shifts. But tomatoes differ in quality and freshness, buyers and sellers do not have perfect information, and perishability, weather and large buyers can weaken the model's assumptions. The model also gives a useful benchmark: price equal to marginal cost and to minimum average cost. Overall, the model is a useful approximation for understanding price changes and efficiency in such a market, but its assumptions are not exactly met.",
    explanation: "Judge how well the assumptions fit and what the model explains." });

  b.card("DEFINITION", "Define **perfect competition**.", "A market with very many buyers and sellers of an identical product, perfect information and freedom of entry and exit, so each firm is a price-taker.");
  b.card("CONCEPT", "Revenue curves of a perfectly competitive firm?", "P = AR = MR: a horizontal demand curve at the market price.");
  b.card("CONCEPT", "Profit-maximising rule in perfect competition?", "Produce where MC = MR = P, with MC rising.");
  b.card("CONCEPT", "What is the firm's short-run supply curve?", "The part of its marginal cost curve above minimum average variable cost.");
  b.card("CONCEPT", "Long-run equilibrium condition?", "P = MR = MC = minimum ATC: normal profit and no entry or exit.");
  b.card("CONCEPT", "What happens when firms earn supernormal profit?", "New firms enter, industry supply rises, price falls until only normal profit remains.");
  b.card("FACT", "Productive and allocative efficiency in the long run?", "Productively efficient (minimum ATC) and allocatively efficient (P = MC).");
  b.card("CONCEPT", "Short-run shutdown price?", "Any price below minimum average variable cost.");
  b.card("CONCEPT", "Weakness of perfect competition as a model?", "Assumptions rarely hold; no supernormal profit for innovation, so dynamic efficiency may be low.");
});
