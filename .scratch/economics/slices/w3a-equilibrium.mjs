// W3a: econ.structures.equilibrium (ZIMSEC only) — short-run and long-run equilibrium in perfect competition,
// monopolistic competition and monopoly, MR = MC and AR against ATC with tables, comparing the structures.
import { concept, P, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.structures.equilibrium", { file: "structures/equilibrium", keyPrefix: "structures.equilibrium" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In every market structure, a profit-maximising firm produces the output at which…",
    options: [
      ["marginal revenue equals marginal cost", "Correct: MR = MC."],
      ["average revenue equals average total cost", "That is break-even (normal profit)."],
      ["total revenue is at its highest", "Highest revenue is not highest profit."],
      ["average total cost is at its lowest", "That is productive efficiency."],
    ],
    answer: "A",
    explanation: "Profit is maximised where MR = MC in every market structure.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the long run, a firm in perfect competition earns…",
    options: [
      ["normal profit, producing at the lowest average total cost", "Correct: entry removes abnormal profit."],
      ["abnormal profit, protected by high barriers to entry", "There are no barriers in perfect competition."],
      ["a loss, because the price is below average cost", "Loss-makers leave until losses disappear."],
      ["normal profit, with spare (excess) capacity", "Excess capacity is a feature of monopolistic competition."],
    ],
    answer: "A",
    explanation: "Free entry and exit push the price to the lowest point of ATC: normal profit and productive efficiency.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a monopoly earn abnormal profit in the **long run**?",
    options: [
      ["Barriers stop new firms from entering", "Correct: no entry to compete the profit away."],
      ["Its marginal cost is always equal to zero", "MC is not zero."],
      ["It produces at the lowest point of its ATC curve", "Monopolies usually do not."],
      ["Its demand curve is perfectly elastic", "A monopoly faces the downward-sloping market demand curve."],
    ],
    answer: "A",
    explanation: "Without entry, nothing pushes the price down to ATC.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In long-run equilibrium, a firm in monopolistic competition…",
    options: [
      ["earns normal profit but has excess capacity", "Correct: AR = ATC to the left of the lowest point of ATC."],
      ["earns abnormal profit because its product is branded", "Entry removes abnormal profit in the long run."],
      ["produces at the lowest point of its ATC curve", "That happens in perfect competition."],
      ["sets price equal to marginal cost", "Price is above MC."],
    ],
    answer: "A",
    hints: ["Entry is easy, but each firm faces a downward-sloping demand curve."],
    explanation: "Entry shifts each firm's demand left until AR = ATC, which happens on the falling part of ATC: normal profit with excess capacity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A monopoly maximises profit at an output of 300 units, where MR = MC = US\\$12. Its AR at that output is US\\$20 and its ATC is US\\$15. What price does it charge?",
    options: [
      ["US\\$20", "Correct: the price is read from the AR (demand) curve."],
      ["US\\$12", "That is MR and MC, not the price."],
      ["US\\$15", "That is ATC."],
      ["US\\$5", "That is profit per unit (20 − 15)."],
    ],
    answer: "A",
    hints: ["Output comes from MR = MC; where does the price come from?"],
    explanation: "Output is set where MR = MC; the price is what consumers will pay for that output: AR = US\\$20. Abnormal profit = (20 − 15) × 300 = US\\$1,500.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Firms in a perfectly competitive industry are making losses. What happens in the long run?",
    options: [
      ["Firms leave, so supply falls and the price rises", "Correct: exit continues until normal profit is earned."],
      ["New firms enter, supply rises and the price falls further", "Losses drive firms out, not in."],
      ["The remaining firms raise their prices above the market price", "Price takers cannot do this."],
      ["Every firm in the industry closes down for good", "Exit stops once the price covers ATC."],
    ],
    answer: "A",
    hints: ["Losses are the opposite signal to abnormal profit."],
    explanation: "Losses cause exit; the fall in market supply raises the price until the remaining firms cover their costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which market structure, in long-run equilibrium, achieves both productive and allocative efficiency?",
    options: [
      ["Perfect competition", "Correct: P = MC = minimum ATC."],
      ["Monopolistic competition", "It has excess capacity and P > MC."],
      ["Monopoly", "P > MC and usually not at the lowest ATC."],
      ["Oligopoly", "Prices are usually above MC."],
    ],
    answer: "A",
    explanation: "Only perfect competition gives P = MC (allocative) and production at minimum ATC (productive) in the long run.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In the short run a firm's price is US\\$9, its ATC is US\\$11 and its AVC is US\\$7. What should it do?",
    options: [
      ["Keep producing: it covers its variable costs", "Correct: AR > AVC, so part of the fixed costs is also covered."],
      ["Close at once: it cannot cover its variable costs", "AR (9) is above AVC (7)."],
      ["Keep producing: it is earning abnormal profit", "AR < ATC: it is making a loss."],
      ["Raise its price to US\\$11 to break even", "A price taker cannot raise its price."],
    ],
    answer: "A",
    hints: ["Compare price with AVC, not only with ATC."],
    explanation: "Each unit earns US\\$2 above variable cost towards fixed costs, so producing loses less than closing in the short run.",
  });

  // Perfect competition cost schedule (different from the lesson).
  {
    const q = [0, 1, 2, 3, 4, 5, 6, 7], tc = [23, 39, 47, 55, 65, 78, 94, 115];
    const mc = tc.map((c, i) => (i ? c - tc[i - 1] : null));
    const best = (p) => { const pr = q.map((x, i) => p * x - tc[i]); const i = pr.indexOf(Math.max(...pr)); return { q: i, pr: pr[i] }; };
    const s = best(17);
    check("q", s.q, 6); check("pr", s.pr, 8);
    const atc6 = tc[6] / 6;
    check("atc6", atc6, 94 / 6);
    const tT = table(["Output (units)", "Total cost (US\\$)"], q.map((x, i) => [x, tc[i]]));
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "plain", value: s.q,
      stem: `A fictional firm in a perfectly competitive market sells at the market price of US\\$17. Its total costs are shown below.\n\n${tT}\n\nWhat is its profit-maximising output, in units?`,
      wrong: [7, 5],
      hints: ["MR = price = 17.", "Find MC for each unit and keep producing while MC ≤ 17."],
      explanation: `1. MR = price = US\\$17.\n2. MC: ${mc.slice(1).join(", ")}.\n3. The 6th unit costs ${mc[6]} (< 17), so it adds to profit; the 7th costs ${mc[7]} (> 17), so it would reduce profit.\n4. Output = **${s.q} units**; profit = 17 × 6 − ${tc[6]} = US\\$${s.pr}. AR (17) > ATC (${fmt(atc6, 2)}): abnormal profit, which will attract new firms.`,
    });
  }
  {
    const ar = 27, atc = 22.5, q = 80, pr = (ar - atc) * q;
    check("pr", pr, 360);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: pr, daily: true,
      stem: `At its profit-maximising output of ${q} units, a fictional monopoly has average revenue of US\\$${ar} and average total cost of US\\$${atc.toFixed(2)}. Calculate its abnormal profit.`,
      wrong: [ar - atc, ar * q],
      explanation: `Abnormal profit = (AR − ATC) × Q = (${ar} − ${atc.toFixed(2)}) × ${q} = ${(ar - atc).toFixed(2)} × ${q} = **US\\$${pr}**.`,
    });
  }
  {
    const p = 12, minAtc = 9.5;
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: minAtc, dp: 2, daily: true,
      stem: `Firms in a perfectly competitive industry are earning abnormal profit at a market price of US\\$${p}. The lowest point of each firm's average total cost curve is US\\$${minAtc.toFixed(2)}. Assuming costs do not change, what will the market price be in the long run? Give your answer in US\\$ to two decimal places.`,
      wrong: [p],
      explanation: `New firms enter until the price has fallen to the lowest point of ATC, so the long-run price is **US\\$${minAtc.toFixed(2)}**, where firms earn normal profit.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In monopolistic competition, firms can earn abnormal profit in the short run.",
    answer: true,
    explanation: "True. A new or popular product can earn abnormal profit until new firms enter and take customers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A monopoly always produces at the lowest point of its average total cost curve.",
    answer: false,
    explanation: "False. A monopoly produces where MR = MC, which is usually not at the lowest ATC, so it is usually productively inefficient.",
  });
  b.match({
    d: 4, skill: "ANALYSIS",
    stem: "Match each market structure with its long-run equilibrium.",
    pairs: [
      ["Perfect competition", "Normal profit at the lowest point of ATC"],
      ["Monopolistic competition", "Normal profit with excess capacity"],
      ["Monopoly", "Abnormal profit protected by barriers to entry"],
    ],
    extraRight: ["A loss that continues for ever"],
    hints: ["Which structures have free entry?"],
    explanation: "Free entry gives normal profit in the long run; only a monopoly keeps abnormal profit. No firm accepts losses for ever.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A firm chooses its output where MR equals {{blank:a}}. It reads its price from the {{blank:b}} curve. If AR is greater than ATC at that output, it earns {{blank:c}} profit.",
    blanks: [
      { id: "a", accepted: ["MC"], choices: ["MC", "ATC", "AR"] },
      { id: "b", accepted: ["AR"], choices: ["AR", "MC", "ATC"] },
      { id: "c", accepted: ["abnormal"], choices: ["abnormal", "normal"] },
    ],
    explanation: "MR = MC sets output; AR gives price; AR against ATC gives the type of profit.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a perfectly competitive industry moves from short-run abnormal profit to long-run equilibrium.",
    points: [
      "Abnormal profit (AR > ATC) attracts new firms; there are no barriers to entry.",
      "Market supply increases.",
      "The market price falls, so each firm's AR = MR falls.",
      "Entry stops when the price equals the lowest ATC: normal profit only.",
    ],
    modelAnswer: "When firms earn abnormal profit, new firms are attracted and, with no barriers, they enter. Market supply increases, so the market price falls, and each price-taking firm's AR and MR fall with it. Entry continues until the price has fallen to the lowest point of ATC, where firms earn only normal profit.",
    hints: ["Start with the signal that abnormal profit sends."],
    explanation: "Entry, higher supply, lower price, normal profit.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 14,
    stem: `A fictional firm is the only supplier of a medicine protected by a patent. The table shows its weekly figures.\n\n${table(["Output (boxes)", "Price (US\\$)", "Total cost (US\\$)"], [[0, 64, 50], [1, 60, 74], [2, 56, 92], [3, 52, 106], [4, 48, 122], [5, 44, 152], [6, 40, 186]])}`,
    parts: (() => {
      const q = [0, 1, 2, 3, 4, 5, 6], p = [64, 60, 56, 52, 48, 44, 40], tc = [50, 74, 92, 106, 122, 152, 186];
      const tr = q.map((x, i) => x * p[i]), mr = tr.map((t, i) => (i ? t - tr[i - 1] : null)), mc = tc.map((c, i) => (i ? c - tc[i - 1] : null));
      const prof = tr.map((t, i) => t - tc[i]), best = prof.indexOf(Math.max(...prof));
      check("best", best, 4); check("prof", prof[4], 70); check("mr4", mr[4], 36); check("mc4", mc[4], 16); check("mr5", mr[5], 28); check("mc5", mc[5], 30);
      const atc4 = tc[4] / 4, ab = (p[4] - atc4) * 4;
      check("atc4", atc4, 30.5); check("ab", ab, prof[4]);
      return [
        P.num({ label: "(a)", marks: 1, kind: "money", value: tc[0], stem: "State the firm's total fixed cost per week.", wrong: [0], explanation: "TC at zero output = US\\$50." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: mr[4], stem: "Calculate the marginal revenue of the 4th box.", wrong: [p[4]], explanation: `TR(4) = 48 × 4 = ${tr[4]}; TR(3) = 52 × 3 = ${tr[3]}; MR = ${tr[4]} − ${tr[3]} = US\\$${mr[4]}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: mc[4], stem: "Calculate the marginal cost of the 4th box.", wrong: [atc4], explanation: `${tc[4]} − ${tc[3]} = US\\$${mc[4]}.` }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: best, stem: "Identify the profit-maximising output, in boxes per week.", wrong: [5, 3], explanation: `MR > MC up to the 4th box (${mr[4]} > ${mc[4]}); for the 5th MR = ${mr[5]} < MC = ${mc[5]}. Output = ${best} boxes.` }),
        P.num({ label: "(e)", marks: 1, kind: "money", value: p[4], stem: "State the price the firm charges at this output.", wrong: [mc[4], mr[4]], explanation: "Price is read from the AR (price) column at 4 boxes: US\\$48." }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: ab, stem: "Calculate the firm's abnormal profit, using average revenue and average total cost.", wrong: [p[4] - atc4], explanation: `ATC = ${tc[4]} ÷ 4 = US\\$${fmt(atc4, 2)}; abnormal profit = (48 − ${fmt(atc4, 2)}) × 4 = US\\$${ab}.` }),
        P.manual({
          label: "(g)", marks: 5,
          stem: "Explain why the firm can keep this abnormal profit in the long run, and why its output is not allocatively efficient.",
          points: [
            "The patent is a legal barrier to entry.",
            "No other firm can produce the medicine, so no new supply enters the market.",
            "So the price is not pushed down to ATC: abnormal profit continues.",
            "Price (US\\$48) is far above marginal cost (US\\$16).",
            "So consumers value extra boxes more than they cost to make, but they are not produced: output is restricted / allocative inefficiency.",
          ],
          modelAnswer: "The patent is a legal barrier to entry: no other firm may produce the medicine, so no new supply enters the market to push the price down to average cost, and the abnormal profit of US\\$70 a week can continue. The output is not allocatively efficient because the price of US\\$48 is far above the marginal cost of US\\$16: patients value extra boxes more than they cost to produce, but the firm restricts output to keep the price high.",
        }),
      ];
    })(),
    explanation: "(a) US\\$50. (b) US\\$36. (c) US\\$16. (d) 4 boxes. (e) US\\$48. (f) US\\$70. (g) The patent blocks entry; P > MC means restricted output.",
    hints: ["MR and MC are changes from one row to the next.", "The price comes from the price (AR) column."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "The government of a fictional country is considering whether to allow a single company to supply all the country's bread, or to keep the present market of many independent bakeries.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe the long-run equilibrium of a firm in a market with many bakeries and free entry.", points: ["New bakeries enter when there is abnormal profit (and leave when there are losses).", "So in the long run each bakery earns normal profit (AR = ATC)."], modelAnswer: "If bakeries earn abnormal profit, new bakeries enter and take customers, and if they make losses some leave; in the long run each bakery earns normal profit, with AR equal to ATC." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether consumers would be better off with a single bread company than with many bakeries.",
        points: [
          "Single firm: economies of scale (large ovens, bulk flour) could lower ATC and allow lower prices.",
          "Single firm: may fund research / consistent quality; no duplication.",
          "Single firm: monopoly sets output where MR = MC with P > MC; higher price, less output, abnormal profit kept in the long run.",
          "Single firm: less choice and variety; little pressure to be efficient or improve quality.",
          "Many bakeries: normal profit in the long run, wide choice; but higher costs and possible excess capacity.",
          "Justified conclusion (e.g. depends on scale economies and regulation; for bread, many bakeries are probably better).",
        ],
        modelAnswer: "A single bread company could gain economies of scale from large ovens and bulk buying of flour, so its average cost could be lower, and it might offer consistent quality. But as a monopoly it would choose the output where MR = MC and set a price above marginal cost, so consumers would pay more and buy less, and barriers would let it keep abnormal profit in the long run; there would also be less choice and little pressure to improve. With many bakeries, competition and free entry keep profits normal and choice wide, although small bakeries may have higher costs and some spare capacity. Because bread does not need a very large scale to be produced cheaply, consumers are likely to be better off with many bakeries; a single firm would be acceptable only if strictly regulated.",
      }),
    ],
    explanation: "(a) Entry and exit give normal profit. (b) Economies of scale against monopoly pricing, restricted output and less choice.",
    hints: ["Compare long-run profit, price and choice in the two structures."],
  });

  b.card("DEFINITION", "Equilibrium of the firm", "The output where MR = MC, so the firm cannot raise profit by changing output.");
  b.card("CONCEPT", "Finding price and profit from a table", "Output where MR = MC; price from the AR column; profit type from AR against ATC.");
  b.card("CONCEPT", "Perfect competition: short run and long run", "Short run: abnormal profit, normal profit or loss. Long run: entry or exit gives normal profit at minimum ATC, P = MC.");
  b.card("CONCEPT", "Monopolistic competition: long run", "Normal profit (AR = ATC) with excess capacity; price above MC.");
  b.card("CONCEPT", "Monopoly: long run", "Abnormal profit can persist because barriers block entry; P > MC; usually not at minimum ATC.");
  b.card("FACT", "When does a loss-making firm keep producing in the short run?", "When price (AR) covers average variable cost and contributes to fixed costs.");
  b.card("FACT", "Which structure is productively and allocatively efficient in the long run?", "Perfect competition: P = MC = minimum ATC.");
  b.card("CONCEPT", "Role of entry and exit", "Abnormal profit attracts entry (supply up, price down); losses cause exit (supply down, price up).");
});
