// W3a: econ.costs.profit-maximisation (ZIMSEC only) — MC, MR = MC, normal and abnormal profit, break-even, efficiency.
import { concept, P, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.costs.profit-maximisation", { file: "costs/profit-maximisation", keyPrefix: "costs.profit-maximisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by **marginal cost**?",
    options: [
      ["The change in total cost when one more unit is produced", "Correct: MC = ΔTC ÷ ΔQ."],
      ["Total cost divided by the number of units produced", "That is average total cost."],
      ["The cost that has to be paid even when output is zero", "That is fixed cost."],
      ["The extra revenue earned from selling one more unit", "That is marginal revenue."],
    ],
    answer: "A",
    explanation: "Marginal cost is the addition to total cost from producing one more unit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "At its present output a firm's marginal revenue is US\\$15 and its marginal cost is US\\$11. To increase its profit, the firm should…",
    options: [
      ["raise output, because the next unit adds more to revenue than to cost", "Correct: MR > MC, so extra units add to profit."],
      ["cut output, because its marginal cost is still positive", "Positive MC does not matter while MR is greater."],
      ["keep output the same, because it is already making a profit", "Profit can still rise while MR > MC."],
      ["raise its price, because marginal revenue is above marginal cost", "The rule is about output: MR > MC means produce more."],
    ],
    answer: "A",
    explanation: "While MR > MC each extra unit adds to profit, so the firm should expand output until MR = MC.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is meant by **normal profit**?",
    options: [
      ["The minimum profit needed to keep the entrepreneur in the industry", "Correct: it is counted as a cost."],
      ["Any profit earned when total revenue is greater than total cost", "That is abnormal profit."],
      ["The profit a firm earns at its highest level of total revenue", "Highest revenue is not the same as normal profit."],
      ["The average profit earned by all firms in the economy in a year", "Normal profit is an opportunity cost, not an average."],
    ],
    answer: "A",
    explanation: "Normal profit is the return the entrepreneur could earn in the next best use; economists include it in costs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm **breaks even** when…",
    options: [
      ["average revenue is equal to average total cost", "Correct: AR = AC, so only normal profit is earned."],
      ["marginal revenue is equal to marginal cost", "That is the profit-maximising condition."],
      ["average revenue is greater than average total cost", "That gives abnormal profit."],
      ["total revenue is at its highest possible level", "Highest revenue says nothing about costs."],
    ],
    answer: "A",
    explanation: "Break-even: TR = TC (AR = AC). The firm covers all its costs, including normal profit.",
  });
  {
    const ar = 18, atc = 15, q = 100, pr = (ar - atc) * q;
    check("pr", pr, 300);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `At its profit-maximising output of ${q} units a firm has average revenue of US\\$${ar} and average total cost of US\\$${atc}. What is its abnormal profit?`,
      options: [
        [`US\\$${pr}`, `Correct: (${ar} − ${atc}) × ${q}.`],
        [`US\\$${ar * q}`, "That is total revenue."],
        [`US\\$${atc * q}`, "That is total cost."],
        [`US\\$${ar - atc}`, "That is abnormal profit per unit, not the total."],
      ],
      answer: "A",
      hints: ["Abnormal profit = (AR − ATC) × output."],
      explanation: `Abnormal profit = (AR − ATC) × Q = (${ar} − ${atc}) × ${q} = US\\$${pr}.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A firm is **allocatively efficient** when…",
    options: [
      ["price is equal to marginal cost", "Correct: consumers' valuation of the last unit equals its cost."],
      ["average total cost is at its minimum", "That is productive efficiency."],
      ["marginal revenue is equal to marginal cost", "That is profit maximisation."],
      ["average revenue is equal to average total cost", "That is break-even."],
    ],
    answer: "A",
    hints: ["Which condition compares what consumers pay for the last unit with what it costs to make?"],
    explanation: "Allocative efficiency: P = MC, so resources go to the goods consumers value most.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A firm's average total cost is US\\$9.40 at 300 units, US\\$8.10 at 400 units and US\\$8.60 at 500 units. At which output is it closest to **productive efficiency**?",
    options: [
      ["400 units", "Correct: ATC is lowest there."],
      ["300 units", "ATC is higher here."],
      ["500 units", "ATC has started to rise again."],
      ["None of the outputs, because ATC is always above zero", "Productive efficiency means lowest ATC, not zero ATC."],
    ],
    answer: "A",
    hints: ["Productive efficiency means the lowest average cost."],
    explanation: "Productive efficiency is production at the lowest ATC: US\\$8.10 at 400 units.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In the short run a firm makes a loss: its average revenue is US\\$6, its average total cost is US\\$8 and its average variable cost is US\\$5. What should it do in the short run?",
    options: [
      ["Keep producing, because revenue covers variable costs and part of fixed costs", "Correct: AR > AVC, so producing loses less than closing."],
      ["Close at once, because it is making a loss on every unit", "Closing would leave all the fixed costs unpaid: a bigger loss."],
      ["Keep producing, because it is earning abnormal profit", "AR < ATC: it is making a loss."],
      ["Close at once, because average revenue is below average variable cost", "AR (US\\$6) is above AVC (US\\$5)."],
    ],
    answer: "A",
    hints: ["Fixed costs must be paid even if the firm closes.", "Compare AR with AVC."],
    explanation: "Each unit earns US\\$6 against US\\$5 of variable cost, leaving US\\$1 towards fixed costs. Closing would leave all fixed costs unpaid, so in the short run the firm keeps producing; in the long run it leaves unless costs or prices change.",
  });

  {
    const tc0 = 1840, tc1 = 1895, mc = tc1 - tc0;
    check("mc", mc, 55);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: mc, daily: true,
      stem: `When a fictional brewery raises its output from 120 to 121 crates a day, its total cost rises from US\\$${fmt(tc0)} to US\\$${fmt(tc1)}. Calculate the marginal cost of the 121st crate.`,
      wrong: [tc1 / 121],
      explanation: `MC = ${fmt(tc1)} − ${fmt(tc0)} = **US\\$${mc}**. ${fmt(tc1)} ÷ 121 = US\\$${fmt(tc1 / 121)} is average total cost, not marginal cost.`,
    });
  }
  {
    const ar = 7.5, atc = 6.2, q = 400, pr = (ar - atc) * q;
    check("pr2", pr, 520);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: pr, daily: true,
      stem: `A fictional juice maker sells ${q} bottles a day at US\\$${ar.toFixed(2)} each. Its average total cost, including normal profit, is US\\$${atc.toFixed(2)}. Calculate its abnormal profit per day.`,
      wrong: [ar - atc, ar * q],
      explanation: `Abnormal profit = (AR − ATC) × Q = (${ar.toFixed(2)} − ${atc.toFixed(2)}) × ${q} = ${(ar - atc).toFixed(2)} × ${q} = **US\\$${pr}**. US\\$${(ar - atc).toFixed(2)} is the profit per bottle only.`,
    });
  }
  {
    const ar = 14, atc = 16.5, q = 240, pr = (ar - atc) * q;
    check("loss", pr, -600);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: pr,
      stem: `A fictional furniture firm sells ${q} stools a month at US\\$${ar} each. Its average total cost is US\\$${atc.toFixed(2)}. Calculate its profit or loss for the month. Give a loss as a negative number.`,
      wrong: [-pr, ar - atc],
      hints: ["Compare AR with ATC, then multiply by output."],
      explanation: `1. AR − ATC = ${ar} − ${atc.toFixed(2)} = −US\\$${(atc - ar).toFixed(2)} per stool.\n2. × ${q} stools = **−US\\$${fmt(-pr)}**: a loss of US\\$${fmt(-pr)}.\n3. Check: TR = ${ar} × ${q} = US\\$${fmt(ar * q)}; TC = ${atc.toFixed(2)} × ${q} = US\\$${fmt(atc * q)}; TR − TC = −${fmt(-pr)}.\n4. Answering +600 drops the sign: the firm makes a loss because AR < ATC.`,
    });
  }
  // Small table: profit-maximising output (price taker at US$36).
  {
    const q = [0, 1, 2, 3, 4, 5, 6], tc = [50, 80, 100, 115, 135, 165, 205], price = 36;
    const tr = q.map((x) => x * price), prof = tr.map((t, i) => t - tc[i]);
    const best = prof.indexOf(Math.max(...prof));
    check("best", best, 5); check("pmax", prof[best], 15);
    const mc = tc.map((c, i) => (i ? c - tc[i - 1] : null));
    const tT = table(["Output (units per day)", "Total cost (US\\$)"], q.map((x, i) => [x, tc[i]]));
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "plain", value: best,
      stem: `A fictional honey-packing firm sells every jar at the market price of US\\$${price}. Its daily costs are shown below.\n\n${tT}\n\nUsing marginal revenue and marginal cost, find the profit-maximising output (in units per day).`,
      wrong: [6, 3],
      hints: ["For a price taker MR = price.", "MC = change in TC; produce every unit with MR > MC."],
      explanation: `1. MR = price = US\\$${price} for every unit.\n2. MC: ${mc.slice(1).join(", ")}.\n3. MR > MC for units 1 to 5 (the 5th costs ${mc[5]} < ${price}); the 6th costs ${mc[6]} > ${price}, so it would cut profit.\n4. Profit-maximising output = **${best} units**, profit = ${tr[best]} − ${tc[best]} = US\\$${prof[best]}.\n5. 6 units maximises revenue, not profit; 3 units is where MC is lowest.`,
    });
  }
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm that earns only normal profit should leave the industry.",
    answer: false,
    explanation: "False. Normal profit is enough to keep the entrepreneur in the industry, because it equals what they could earn elsewhere.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Producing the output at which total revenue is highest always maximises a firm's profit.",
    answer: false,
    explanation: "False. Profit depends on costs too. Profit is maximised where MR = MC, which is usually below the revenue-maximising output.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "If marginal revenue is greater than marginal cost, a profit-maximising firm should {{blank:a}} output. If average revenue is less than average total cost, the firm makes {{blank:b}}. If average revenue equals average total cost, it earns {{blank:c}} profit.",
    blanks: [
      { id: "a", accepted: ["increase"], choices: ["increase", "reduce", "keep the same"] },
      { id: "b", accepted: ["a loss"], choices: ["a loss", "abnormal profit", "normal profit"] },
      { id: "c", accepted: ["normal"], choices: ["normal", "abnormal", "no"] },
    ],
    explanation: "MR > MC: expand. AR < ATC: loss. AR = ATC: normal profit only (break-even).",
  });
  b.match({
    d: 4, skill: "ANALYSIS",
    stem: "Match each condition with what it shows about the firm.",
    pairs: [
      ["MR = MC", "Profit is maximised"],
      ["AR > ATC", "Abnormal profit is earned"],
      ["AR = ATC", "The firm breaks even"],
      ["Price = MC", "Allocative efficiency"],
      ["Output at the lowest point of ATC", "Productive efficiency"],
    ],
    hints: ["Marginal conditions decide output; average conditions decide the type of profit."],
    explanation: "MR = MC chooses output; AR against ATC shows the kind of profit; P = MC and minimum ATC are the two efficiency conditions.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain why a firm maximises its profit where marginal revenue equals marginal cost.",
    points: [
      "If MR > MC, producing the extra unit adds more to revenue than to cost, so profit rises.",
      "So the firm should expand output while MR > MC.",
      "If MR < MC, the extra unit adds more to cost than to revenue, so profit falls; the firm should cut output.",
      "Profit cannot be raised further when MR = MC: this is the profit-maximising output.",
    ],
    modelAnswer: "If the next unit brings in more extra revenue than it costs (MR > MC), making it adds to profit, so the firm should expand. If it costs more than it brings in (MR < MC), it reduces profit, so the firm should cut back. Profit can no longer be increased by changing output when MR = MC, so this is where profit is greatest.",
    hints: ["Consider the cases MR > MC and MR < MC."],
    explanation: "Two marks for each side of the argument.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 14,
    stem: `Nyasha runs a fictional brick-making firm near Gweru. She must lower her price to sell more. The table shows her daily figures.\n\n${table(["Output (pallets)", "Price (US\\$)", "Total cost (US\\$)"], [[0, 75, 60], [1, 71, 90], [2, 67, 116], [3, 63, 146], [4, 59, 187], [5, 55, 232], [6, 51, 289]])}`,
    parts: (() => {
      const q = [0, 1, 2, 3, 4, 5, 6], p = [75, 71, 67, 63, 59, 55, 51], tc = [60, 90, 116, 146, 187, 232, 289];
      const tr = q.map((x, i) => x * p[i]), mr = tr.map((t, i) => (i ? t - tr[i - 1] : null)), mc = tc.map((c, i) => (i ? c - tc[i - 1] : null));
      const prof = tr.map((t, i) => t - tc[i]), best = prof.indexOf(Math.max(...prof));
      check("best", best, 4); check("prof", prof[4], 49); check("mr4", mr[4], 47); check("mc4", mc[4], 41); check("mr5", mr[5], 39); check("mc5", mc[5], 45);
      const atc4 = tc[4] / 4;
      check("atc4", atc4, 46.75);
      return [
        P.num({ label: "(a)", marks: 1, kind: "money", value: tc[0], stem: "State Nyasha's total fixed cost per day.", wrong: [0], explanation: "TFC = TC at zero output = US\\$60." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: mr[4], stem: "Calculate the marginal revenue of the 4th pallet.", wrong: [p[4], tr[4]], explanation: `TR(4) = 59 × 4 = ${tr[4]}; TR(3) = 63 × 3 = ${tr[3]}; MR = ${tr[4]} − ${tr[3]} = US\\$${mr[4]}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: mc[4], stem: "Calculate the marginal cost of the 4th pallet.", wrong: [atc4], explanation: `MC = ${tc[4]} − ${tc[3]} = US\\$${mc[4]}.` }),
        P.num({ label: "(d)", marks: 2, kind: "plain", value: best, stem: "Identify the profit-maximising output, in pallets per day.", wrong: [5, 6], explanation: `MR > MC up to the 4th pallet (${mr[4]} > ${mc[4]}); for the 5th MR = ${mr[5]} < MC = ${mc[5]}. Best output = ${best} pallets.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: prof[best], stem: "Calculate the profit at the profit-maximising output.", wrong: [tr[best]], explanation: `TR = 59 × 4 = ${tr[best]}; TC = ${tc[best]}; profit = ${tr[best]} − ${tc[best]} = US\\$${prof[best]}.` }),
        P.manual({ label: "(f)", marks: 2, stem: "At this output, is Nyasha earning abnormal profit, normal profit or a loss? Explain using AR and ATC.", points: [`AR = US\\$59; ATC = ${tc[4]} ÷ 4 = US\\$${fmt(atc4)}.`, "AR > ATC, so she earns abnormal (supernormal) profit."], modelAnswer: `Average revenue is the price, US\\$59, and average total cost is ${tc[4]} ÷ 4 = US\\$${fmt(atc4)}. Because AR is greater than ATC, she earns abnormal profit of (59 − ${fmt(atc4)}) × 4 = US\\$${prof[4]} a day.` }),
        P.manual({ label: "(g)", marks: 4, stem: "Explain what is likely to happen to Nyasha's abnormal profit in the long run if new firms can easily start making bricks in the area.", points: ["Abnormal profit acts as a signal that attracts new firms.", "New firms increase supply of bricks in the area / take some of her customers.", "The price she can charge falls (her AR falls).", "Entry continues until only normal profit is earned (AR = ATC)."], modelAnswer: "The abnormal profit signals that brick-making is more profitable than other uses of capital, so new firms enter. They increase the supply of bricks and take some of Nyasha's customers, so the price she can charge falls. New firms keep entering until the price has fallen to average total cost and only normal profit is earned." }),
      ];
    })(),
    explanation: "(a) US\\$60. (b) US\\$47. (c) US\\$41. (d) 4 pallets. (e) US\\$49. (f) AR 59 > ATC 46.75: abnormal profit. (g) Entry competes the abnormal profit away to normal profit.",
    hints: ["MR and MC are the changes in TR and TC from one row to the next.", "TR = price × output."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional cement company is the only producer in a small country. It earns large abnormal profits. It sells at a price well above its marginal cost and produces at an output below the lowest point of its average total cost curve.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between productive efficiency and allocative efficiency.", points: ["Productive efficiency: producing at the lowest average total cost.", "Allocative efficiency: price = marginal cost, so output matches what consumers value."], modelAnswer: "Productive efficiency means producing at the lowest possible average total cost. Allocative efficiency means producing where price equals marginal cost, so the value consumers place on the last unit equals the cost of making it." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the company's abnormal profits are harmful to the economy.",
        points: [
          "Harmful: price above MC means allocative inefficiency: too little cement is produced and consumers pay more.",
          "Harmful: output below minimum ATC means productive inefficiency: resources are wasted.",
          "Harmful: higher building costs for households and firms; income transferred from consumers to owners.",
          "Not harmful: profits may be reinvested in new plant, research or lower costs (economies of scale) in future.",
          "Not harmful: profits are taxed; firm may need high profits to cover large risks / fixed costs.",
          "Justified conclusion (e.g. depends on whether profit is reinvested and on regulation / imports).",
        ],
        hints: ["Use both efficiency terms in your answer.", "What might the profits be used for?"],
        modelAnswer: "Because the price is well above marginal cost, consumers value extra cement more than it costs to make, yet it is not produced: the firm is allocatively inefficient, and building costs are higher for households and firms. Producing below the lowest point of ATC also means it is productively inefficient, wasting resources. The abnormal profits are a transfer from consumers to the owners. On the other hand, the profits may be reinvested in modern kilns that lower costs, the company pays tax on them, and cement plants have very large fixed costs that need high returns. Overall the profits are harmful if they come from restricting output with no competition; they are less harmful if they are reinvested and the government allows imports or regulates prices.",
      }),
    ],
    explanation: "(a) Lowest ATC versus P = MC. (b) Inefficiency and high prices against reinvestment and tax.",
    hints: ["Compare price with MC and output with minimum ATC."],
  });

  b.card("DEFINITION", "Marginal cost (MC)", "The change in total cost when one more unit is produced: ΔTC ÷ ΔQ.");
  b.card("FORMULA", "Profit-maximising rule", "Produce where MR = MC: every unit with MR > MC adds to profit; any unit with MR < MC reduces it.");
  b.card("DEFINITION", "Normal profit", "The minimum profit needed to keep the entrepreneur in the industry; counted as a cost (AR = ATC).");
  b.card("DEFINITION", "Abnormal (supernormal) profit", "Profit above normal profit: AR > ATC; total = (AR − ATC) × output.");
  b.card("FORMULA", "Break-even condition", "AR = AC (TR = TC): the firm earns normal profit only.");
  b.card("DEFINITION", "Productive efficiency", "Producing at the lowest possible average total cost.");
  b.card("DEFINITION", "Allocative efficiency", "Producing where price = marginal cost, so resources match what consumers value.");
  b.card("CONCEPT", "Why might a loss-making firm keep producing in the short run?", "If AR covers AVC it pays something towards fixed costs, which must be paid even if it closes.");
  b.card("CONCEPT", "Abnormal profit as a signal", "Where entry is free, abnormal profit attracts new firms; supply rises and price falls until only normal profit remains.");
});
