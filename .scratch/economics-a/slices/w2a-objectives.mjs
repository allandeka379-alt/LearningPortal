// W2a: objectives of firms (both boards; ZIMSEC Form 5, Cambridge A Level; principal-agent problem is Cambridge detail).
import { concept, P, chk, fmt, dpStr, profitSchedule, pctChange, CAM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.firms.objectives", { file: "firms/objectives", keyPrefix: "firms.objectives" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const ob = profitSchedule({ output: [0, 1, 2, 3, 4, 5, 6, 7, 8], price: [20, 18, 16, 14, 12, 10, 8, 6, 4], fc: 10, vc: [0, 6, 10, 13, 17, 22, 30, 42, 60] });
  const R = ob.rows;
  chk(ob.best.q, 4); chk(ob.best.profit, 21);
  const maxTR = Math.max(...R.map((r) => r.tr));
  chk(maxTR, 50); chk(R.find((r) => r.tr === maxTR).q, 5);
  // sales maximisation with a profit floor of zero: largest q with profit >= 0
  chk(R.filter((r) => r.profit >= 0).slice(-1)[0].q, 6);

  mc({ d: 1, skill: "RECALL", stem: "A firm that maximises profit produces the output at which",
    explanation: "Profit is greatest where marginal cost equals marginal revenue, with marginal cost rising." },
    ["marginal cost equals marginal revenue", "Correct."], [["marginal revenue equals zero", "This is the revenue-maximising output."], ["average cost equals average revenue", "This gives normal profit."], ["total cost is as low as possible", "The lowest total cost is at zero output."]]);

  mc({ d: 1, skill: "RECALL", stem: "A firm that maximises total revenue produces the output at which",
    explanation: "Total revenue is greatest where marginal revenue falls to zero." },
    ["marginal revenue is zero", "Correct."], [["marginal cost equals marginal revenue", "That output maximises profit."], ["price is at its highest", "The price is highest at a very small output."], ["average revenue equals average cost", "That gives normal profit."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A firm that aims for a satisfactory level of profit rather than the maximum is said to be",
    explanation: "Satisficing means meeting acceptable targets (profit, sales, quality) instead of maximising any one." },
    ["satisficing", "Correct."], [["profit maximising", "This aims for the highest possible profit."], ["sales maximising", "This aims at the largest revenue or sales volume."], ["cost minimising", "This aims at the lowest cost of an output."]]);

  mc({ d: 2, skill: "UNDERSTANDING", applies: CAM, stem: "The principal-agent problem arises in large companies because",
    explanation: "Shareholders (principals) hire managers (agents) who may pursue their own aims, and shareholders cannot monitor them fully." },
    ["managers may pursue aims different from those of the shareholders", "Correct."], [["shareholders manage the firm directly", "That would remove the separation of ownership and control."], ["all firms must maximise profit by law", "No such law exists."], ["managers always know less about the firm than shareholders do", "Managers usually know more."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Compared with a profit-maximising firm, a sales-maximising firm will usually",
    explanation: "It extends output beyond MC = MR (to the limit set by a minimum acceptable profit), so output is higher and the price lower." },
    ["produce more and charge a lower price", "Correct."], [["produce less and charge a higher price", "That describes a firm restricting output."], ["produce the same output at a lower price", "A lower price on the same demand curve means a larger output."], ["produce more and charge a higher price", "Along a downward-sloping demand curve more output means a lower price."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Compare MR and MC at each output."],
    stem: "At 4 units a firm has MR of US\\$6 and MC of US\\$4. At 5 units MR is US\\$2 and MC is US\\$5. The profit-maximising output is",
    explanation: "The fourth unit adds more to revenue than to cost (6 > 4), the fifth adds less (2 < 5): output is 4." },
    ["4 units", "Correct."], [["5 units", "At 5 units MC exceeds MR."], ["3 units", "At 4 units MR still exceeds MC."], ["6 units", "MR is below MC beyond 4 units."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Think about why managers may favour size."],
    stem: "Which of the following is most likely to lead the managers of a large company to pursue growth rather than maximum profit?",
    explanation: "When managers' pay and status rise with the size of the firm and shareholders cannot monitor them closely, growth serves the managers' own interests." },
    ["Managers' pay and prestige rise with the size of the firm", "Correct."], [["The firm is owned and run by one person", "An owner-manager has no conflict of aims."], ["Competition forces the firm to cut its costs and its prices to survive", "Competition tends to push firms towards profit."], ["The firm has only one product and one production line", "This has no direct link to growth objectives."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["Which owner-manager conditions support profit maximisation?"],
    stem: "In which market is a firm most likely to be forced to pursue profit maximisation in order to survive?",
    explanation: "In a highly competitive market with no supernormal profit, a firm that fails to keep costs low and profit high is driven out; a firm with market power can afford to satisfice." },
    ["A highly competitive market with many rivals", "Correct: survival depends on efficiency."], [["A monopoly protected by legal barriers", "A monopolist can afford to be less efficient."], ["A state-owned enterprise funded by the government", "Subsidies reduce the pressure to maximise profit."], ["A firm with large cash reserves and no rivals", "No rivals means no pressure from competitors."]]);

  {
    const v = ob.best.profit;
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: v, wrong: [48, 27, 6],
      stem: "At the profit-maximising output of 4 units a firm has total revenue of US\\$48 and total cost of US\\$27. Calculate its profit, in US\\$.",
      explanation: "Profit = TR − TC = 48 − 27 = US\\$21." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 5, unit: "units", hints: ["Total revenue is price × quantity at each output."],
      wrong: [4, 6, 50],
      stem: "A firm faces these prices: 1 unit at US\\$18, 2 at US\\$16, 3 at US\\$14, 4 at US\\$12, 5 at US\\$10, 6 at US\\$8. What output maximises its total revenue?",
      explanation: "TR = 18, 32, 42, 48, 50, 48. The maximum, US\\$50, is at 5 units." });
  }
  {
    const g = pctChange(21, 18);
    const lost = ((21 - 18) / 21) * 100;
    chk(lost, 14.285714285714286, 1e-9);
    b.calc({ d: 4, skill: "ANALYSIS", calculator: true, kind: "pct", value: lost, dp: 1, unit: "%", hints: ["Profit given up as a percentage of maximum profit."],
      wrong: [16.7, 3, 85.7],
      stem: "A firm could earn a maximum profit of US\\$21 at 4 units. By choosing to maximise revenue it produces 5 units and earns US\\$18. Calculate the profit it gives up as a percentage of the maximum profit, to one decimal place.",
      explanation: "1. Profit given up = 21 − 18 = US\\$3.\n2. As a percentage of maximum profit = 3 ÷ 21 × 100 = 14.3%." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 6, unit: "units", hints: ["Profits by output are 2, 12, 19, 21, 18, 8, −10 for 1 to 7 units."],
      wrong: [4, 5, 7],
      stem: "A sales-maximising firm will accept any output that earns a profit of at least zero. Its profit is US\\$18 at 5 units, US\\$8 at 6 units and −US\\$10 at 7 units. What output does it choose?",
      explanation: "It extends output as far as profit stays non-negative: 6 units (profit US\\$8). At 7 units the firm makes a loss." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A revenue-maximising firm produces at the output where marginal cost equals marginal revenue.", answer: false,
    explanation: "False. Revenue is maximised where marginal revenue is zero; MC = MR is the condition for maximum profit." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each objective with the condition that describes it.",
    pairs: [["Profit maximisation", "MC = MR with MC rising"], ["Revenue maximisation", "MR = 0"], ["Satisficing", "Meeting acceptable targets for several aims"], ["Survival", "Staying in business, often with low profit"]],
    extraRight: ["P = MC at the minimum of ATC"],
    explanation: "The last statement describes the long-run outcome of perfect competition." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the statement.",
    template: "A firm that maximises sales (subject to a minimum profit) produces {{blank:a}} output and charges a {{blank:b}} price than a profit maximiser.",
    blanks: [{ id: "a", accepted: ["more"], choices: ["more", "less", "the same"] }, { id: "b", accepted: ["lower"], choices: ["lower", "higher", "the same"] }],
    explanation: "Along a downward-sloping demand curve, extra output means a lower price." });

  b.short({ d: 3, skill: "RECALL", applies: CAM, hints: ["Shareholders and managers."], stem: "Name the problem that arises when managers (agents) do not act in the interests of the shareholders (principals).",
    accepted: ["principal-agent problem", "principal agent problem", "the principal-agent problem", "principal-agent"], wrong: ["monopoly power"],
    explanation: "The principal-agent problem results from the separation of ownership and control." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Explain what is meant by satisficing.",
    points: ["Aiming for a satisfactory (acceptable) level of profit or other targets.", "Rather than the maximum possible profit."],
    modelAnswer: "Satisficing means a firm aims for an acceptable level of profit and other targets, such as sales or quality, rather than trying to make the highest profit possible.", explanation: "Acceptable rather than maximum." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about benefits to the firm and to its managers."],
    stem: "Explain **two** reasons why a firm might pursue growth rather than maximum profit.",
    points: ["Growth may bring economies of scale and so lower average costs.", "Explained: for example lower cost per unit in the long run.", "Larger firms have more market power over suppliers and rivals (or managers' pay and prestige rise with size).", "Explained: for example the ability to raise price or to secure better terms from suppliers."],
    modelAnswer: "Growth can bring economies of scale, which lower average cost in the long run, so a firm may sacrifice some profit now to gain a lower cost later. A larger firm also has more market power: it can negotiate better terms with suppliers and has more influence over price. Managers may also favour growth because their pay and status rise with the size of the firm.",
    explanation: "Two reasons, each explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, applies: CAM, hints: ["Who are the principals and who are the agents?"],
    stem: "Analyse how the separation of ownership and control may cause a company to move away from profit maximisation.",
    points: ["Shareholders (principals) own the firm; managers (agents) run it.", "Managers have different aims, such as higher pay, status, a large staff or growth.", "Managers know more about the firm than shareholders (asymmetric information) and monitoring is costly.", "So the firm may pursue sales or growth, or satisfice, and make less than maximum profit."],
    modelAnswer: "In a large company the owners, who want high profit and share prices, employ managers to run the firm. Managers may care more about their own pay, status or the size of the firm, and because they know more about the business and are costly to monitor, they can pursue these aims. The company may therefore aim for sales or growth, or settle for a satisfactory profit, rather than maximum profit.",
    explanation: "Principal-agent problem." });

  {
    const sc = profitSchedule({ output: [0, 1, 2, 3, 4, 5, 6, 7], price: [24, 22, 20, 18, 16, 14, 12, 10], fc: 12, vc: [0, 10, 18, 24, 30, 38, 48, 62] });
    const S = sc.rows;
    chk(sc.best.q, 4); chk(sc.best.profit, 22);
    const mtr = Math.max(...S.map((r) => r.tr));
    chk(mtr, 72); chk(S.find((r) => r.tr === mtr).q, 6);
    chk(S.filter((r) => r.profit >= 15).slice(-1)[0].q, 5);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Read profit and total revenue from the table.", "A sales maximiser extends output until the minimum profit would be breached."],
      stem: `A fictional furniture maker faces the demand and costs below (illustrative data; fixed cost US\\$12).\n\n${sc.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 4, unit: "units", stem: "State the output that maximises profit.", wrong: [5, 6, 3], explanation: "At 4 units MR (10) exceeds MC (6); at 5 units MR (6) is below MC (8). Profit is US\\$22." }),
        P.num({ label: "(b)", marks: 1, kind: "plain", value: 6, unit: "units", stem: "State the output that maximises total revenue.", wrong: [4, 5, 7], explanation: "TR is 64, 70, 72, 70 for 4 to 7 units: the maximum is at 6 units." }),
        P.num({ label: "(c)", marks: 2, kind: "plain", value: 5, unit: "units", stem: "A firm wants to sell as many units as possible while earning a profit of at least US\\$15. What output does it choose?", wrong: [4, 6, 7], explanation: "Profit is 22 at 4 units, 20 at 5 units and 12 at 6 units. Profit stays above US\\$15 up to 5 units." }),
        P.mcq({ label: "(d)", marks: 1, stem: "Compared with the profit-maximising output, the output in (c) has", options: [["a higher output and a lower price", "Correct: 5 units at US\\$14 instead of 4 units at US\\$16."], ["a lower output and a higher price", "Output is higher, not lower."], ["a higher output and a higher price", "More output means a lower price along this demand curve."], ["the same output and price", "The two objectives give different outputs."]], answer: "A", explanation: "Profit maximiser: 4 units at US\\$16. The firm in (c): 5 units at US\\$14." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **two** reasons why a manager might prefer the output in (c) to the profit-maximising output.", points: ["Pay, bonus or status linked to sales.", "Larger market share, or a bigger firm to manage."],
          modelAnswer: "The manager's bonus or status may be linked to sales, and a larger output gives the firm a bigger market share and makes the firm larger to run." }),
      ],
      explanation: "Profit maximum at 4 units (US\\$22); revenue maximum at 6 units; the sales maximiser with a US\\$15 profit floor chooses 5 units." });
  }
  {
    const sc = profitSchedule({ output: [0, 1, 2, 3, 4, 5, 6, 7], price: [24, 22, 20, 18, 16, 14, 12, 10], fc: 12, vc: [0, 10, 18, 24, 30, 38, 48, 62] });
    const S = sc.rows;
    chk(0.05 * S[4].tr, 3.2, 1e-9); chk(0.05 * S[6].tr, 3.6, 1e-9);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, applies: CAM, hints: ["Compare what the manager and the shareholders gain at each output."],
      stem: `The managing director of a fictional furniture company receives a bonus equal to 5% of the company's total revenue. The company can produce 4 units (total revenue US\\$64, profit US\\$22) or 6 units (total revenue US\\$72, profit US\\$12), as in the schedule below.\n\n${sc.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: 3.2, dp: 2, stem: "Calculate the manager's bonus if the company produces 4 units.", wrong: [64, 1.1, 0.64], explanation: "5% of 64 = US\\$3.20." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: 3.6, dp: 2, stem: "Calculate the manager's bonus if the company produces 6 units.", wrong: [72, 0.6, 3.2], explanation: "5% of 72 = US\\$3.60." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how this information illustrates the principal-agent problem.", points: ["Shareholders (principals) gain most from the 4-unit output (profit US\\$22 against US\\$12).", "The manager (agent) gains more from 6 units, because the bonus is linked to revenue.", "The agent therefore has an incentive to act against the principals' interest."],
          modelAnswer: "Shareholders earn the larger profit (US\\$22) at 4 units, but the manager's bonus is higher at 6 units (US\\$3.60 against US\\$3.20), so the manager has an incentive to choose the output that benefits him or her rather than the shareholders. This conflict of interest between agent and principal is the principal-agent problem." }),
        P.manual({ label: "(d)", marks: 3, stem: "Suggest **one** way shareholders could reduce the problem, and explain how it works.", points: ["A valid method (bonus linked to profit or share price, share options, monitoring, independent directors).", "Explains how it aligns the manager's interest with the shareholders'.", "Applies it to this case (a bonus on profit would favour 4 units)."],
          modelAnswer: "The bonus could be based on profit instead of revenue. The manager would then earn more at 4 units (profit US\\$22) than at 6 units (US\\$12), so the manager's interest would be the same as the shareholders'." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **two** reasons why shareholders find it difficult to monitor managers.", points: ["Managers have more information about the firm (asymmetric information).", "Shareholders are many and dispersed, and monitoring is costly."],
          modelAnswer: "Managers know much more about the running of the firm than shareholders, and the shareholders are numerous and spread out, so checking on managers is costly for any one of them." }),
      ],
      explanation: "A revenue bonus gives the manager US\\$3.60 at 6 units against US\\$3.20 at 4 units, though shareholders prefer 4 units; linking pay to profit reduces the problem." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider different types of firm and market."],
    stem: "Assess whether profit maximisation is a realistic assumption about the behaviour of firms.",
    points: ["Profit maximisation gives a clear rule (MC = MR) and clear predictions.", "It is realistic for owner-managed firms in competitive markets, where survival requires efficiency.", "In large companies, ownership is separated from control and managers may pursue growth or sales (principal-agent problem).", "Firms with market power may satisfice because competition does not force them to maximise.", "Some firms have social or ethical aims (cooperatives, state-owned enterprises, social enterprises).", "Firms often lack the information on MC and MR to find the exact maximum.", "Long-run profit and survival may require sacrificing short-run profit.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Profit maximisation gives a clear rule, MC = MR, and clear predictions about output and price. It is realistic for owner-managed firms in competitive markets, where a firm that does not keep its costs low and profit high is driven out. But in large companies the separation of ownership and control lets managers pursue growth or sales, and a firm with market power may be content with a satisfactory profit. Cooperatives, state-owned enterprises and social enterprises have other aims, and many firms do not have the information to find the exact point where MC equals MR. Sacrificing profit today for survival or growth may also make sense in the long run. Overall, the assumption is a useful simplification that works best for small competitive firms and is less reliable for large firms with market power.",
    explanation: "A reasoned judgement about when the assumption fits." });

  b.card("DEFINITION", "Define **satisficing**.", "Aiming for a satisfactory level of profit and other targets rather than the maximum possible.");
  b.card("CONCEPT", "Output rule for profit maximisation?", "Produce where MC = MR, with MC rising.");
  b.card("CONCEPT", "Output rule for revenue maximisation?", "Produce where MR = 0.");
  b.card("CONCEPT", "Effect of sales maximisation on price and output?", "Higher output and a lower price than profit maximisation, subject to a minimum acceptable profit.");
  b.card("DEFINITION", "What is the **principal-agent problem**?", "Managers (agents) may pursue aims different from those of the owners (principals) because ownership is separated from control and monitoring is costly.", undefined, { applies: CAM });
  b.card("CONCEPT", "Name five objectives of firms.", "Profit maximisation, survival, growth, revenue or sales maximisation, satisficing (also social and ethical aims).");
  b.card("CONCEPT", "Why might a firm pursue growth?", "Economies of scale, market power, and higher pay or status for managers.");
  b.card("CONCEPT", "How can the principal-agent problem be reduced?", "Link pay to profit or share price, monitor managers, use independent directors, threat of takeover.", undefined, { applies: CAM });
  b.card("FACT", "Which firms most nearly maximise profit?", "Owner-managed firms in highly competitive markets, where survival requires efficiency.");
});
