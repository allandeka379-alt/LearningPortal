// W2a: collusion, cartels, game theory and the Prisoner's Dilemma (both boards; game theory is Cambridge detail, cartels both).
import { concept, P, chk, fmt, dpStr, game2x2, table, pctChange, CAM } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one side, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

// Duopoly with market demand P = a - Q and constant marginal cost c. Each firm keeps to a quota (half the monopoly output) or cheats by producing a third more.
const duopoly = (a, c) => {
  const quota = (a - c) / 4;
  const cheat = (quota * 4) / 3;
  const profit = (mine, theirs) => (a - (mine + theirs) - c) * mine;
  return {
    quota, cheat,
    cc: profit(quota, quota), cheatVsKeep: profit(cheat, quota), keepVsCheat: profit(quota, cheat), bothCheat: profit(cheat, cheat),
    pCartel: a - 2 * quota, pBoth: a - 2 * cheat,
  };
};

concept("aecon.firms.collusion-game-theory", { file: "firms/collusion-game-theory", keyPrefix: "firms.collusion-game-theory" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });
  const d1 = duopoly(90, 30);
  chk(d1.quota, 15); chk(d1.cheat, 20); chk(d1.cc, 450); chk(d1.cheatVsKeep, 500); chk(d1.keepVsCheat, 375); chk(d1.bothCheat, 400); chk(d1.pCartel, 60); chk(d1.pBoth, 50);
  const g1 = game2x2({ rowStrategies: ["Keep to quota", "Cheat"], colStrategies: ["Keep to quota", "Cheat"], payoffs: [[[450, 450], [375, 500]], [[500, 375], [400, 400]]] });
  chk(g1.equilibria.length, 1); chk(g1.equilibria[0][0], 1); chk(g1.equilibria[0][1], 1);
  const d2 = duopoly(102, 30);
  chk(d2.quota, 18); chk(d2.cheat, 24); chk(d2.cc, 648); chk(d2.cheatVsKeep, 720); chk(d2.keepVsCheat, 540); chk(d2.bothCheat, 576);
  const g2 = game2x2({ rowStrategies: ["Keep to quota (18)", "Cheat (24)"], colStrategies: ["Keep to quota (18)", "Cheat (24)"], payoffs: [[[648, 648], [540, 720]], [[720, 540], [576, 576]]] });
  chk(g2.equilibria.length, 1); chk(g2.equilibria[0][0], 1);
  const adv = game2x2({ rowName: "Firm X", colName: "Firm Y", rowStrategies: ["Advertise", "Do not advertise"], colStrategies: ["Advertise", "Do not advertise"], payoffs: [[[6, 6], [10, 2]], [[2, 10], [8, 8]]] });
  chk(adv.equilibria.length, 1); chk(adv.equilibria[0][0], 0); chk(adv.equilibria[0][1], 0);

  mc({ d: 1, skill: "RECALL", stem: "A cartel is",
    explanation: "A cartel is a formal agreement among firms (or countries) to control price or output, usually through quotas." },
    ["a formal agreement among firms to control price or output", "Correct."], [["an unspoken understanding to follow a price leader", "That is tacit collusion."], ["a single seller protected by barriers to entry", "That is monopoly."], ["a merger of two firms into one", "A merger creates one firm; a cartel keeps separate firms."]]);

  mc({ d: 1, skill: "RECALL", stem: "Tacit collusion occurs when firms",
    explanation: "Tacit collusion is coordination without a formal agreement, for example by following a price leader." },
    ["coordinate behaviour without any formal agreement", "Correct."], [["sign a written agreement on prices and output", "That is overt collusion."], ["merge to form a single larger firm in the industry", "That is a merger."], ["compete fiercely on price whatever their rivals do", "That is not collusion."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "Which condition makes a cartel more likely to be effective?",
    explanation: "A homogeneous product and few firms make it easy to agree on a single price and to monitor members." },
    ["There are few firms selling a similar product", "Correct."], [["Barriers to entry are low", "Outsiders could then undercut the cartel."], ["The firms have very different costs", "Members would want different prices."], ["Demand is highly elastic", "A higher price would then lower revenue."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The main reason why cartels often break down is that",
    explanation: "Each member can gain by secretly producing more than its quota, but if all do, the price falls and the cartel collapses." },
    ["each member can gain by cheating on the agreement", "Correct."], [["cartels always make losses", "Cartels can be very profitable while they last."], ["demand for the product is always unit elastic", "Elasticity does not explain the breakdown."], ["customers refuse to buy from cartels", "Customers usually have no alternative."]]);

  mc({ d: 2, skill: "UNDERSTANDING", applies: CAM, stem: "A dominant strategy is one that",
    explanation: "A dominant strategy gives a player the highest pay-off whatever the other player does." },
    ["gives the highest pay-off whatever the rival does", "Correct."], [["gives the highest total pay-off to both players", "That describes the best joint outcome."], ["is chosen only when the rival keeps to an agreement", "A dominant strategy does not depend on the rival's choice."], ["always results in cooperation", "Dominant strategies often lead to non-cooperation."]]);

  mc({ d: 3, skill: "APPLICATION", applies: CAM, hints: ["Test each firm's best reply to each choice of its rival."],
    stem: `Two firms each choose to advertise or not. The pay-offs (profit, US\\$ million; Firm X first) are shown.\n\n${adv.md}\n\nThe Nash equilibrium is`,
    explanation: "If Y advertises, X gets 6 by advertising and 2 by not; if Y does not, X gets 10 by advertising and 8 by not. Advertising is dominant for X, and by symmetry for Y. The equilibrium is (Advertise, Advertise), with 6 each, although both would prefer (not, not) with 8 each." },
    ["both firms advertise", "Correct: each firm's best reply."], [["neither firm advertises", "This gives 8 each, but each firm has an incentive to switch to advertising."], ["only Firm X advertises", "Firm Y would then switch to advertising to raise its pay-off from 2 to 6."], ["only Firm Y advertises", "Firm X would then switch to advertising to raise its pay-off from 2 to 6."]]);

  mc({ d: 3, skill: "UNDERSTANDING", hints: ["Compare price and output with competition."],
    stem: "Compared with a competitive market, collusion between firms is likely to lead to",
    explanation: "Restricting output raises price, increases profit for the colluding firms and reduces consumer surplus." },
    ["higher prices and lower output", "Correct."], [["lower prices and higher output", "That is the competitive outcome."], ["lower prices and lower output", "Output is restricted to raise price."], ["higher prices and higher output", "Higher prices reduce the quantity demanded."]]);

  mc({ d: 4, skill: "EVALUATION", hints: ["What threatens a cartel from outside?"],
    stem: "Which development is most likely to cause a cartel to break down?",
    explanation: "An outsider that expands output or a new entrant undercuts the cartel price and takes its customers." },
    ["a large non-member expands its output and sells at a lower price", "Correct."], [["demand for the product becomes more inelastic", "Inelastic demand helps cartels."], ["all members agree to share information on output", "Monitoring helps a cartel."], ["a government supports the cartel with import controls", "Protection from outside competition helps a cartel."]]);

  {
    b.num({ d: 3, skill: "APPLICATION", kind: "plain", value: 30, unit: "units", hints: ["A cartel acts like a monopolist: MR = MC."],
      wrong: [60, 15, 90],
      stem: "Two firms form a cartel in a market with demand P = 90 − Q (so MR = 90 − 2Q) and constant marginal cost of US\\$30 for each firm. Calculate the total output that maximises the cartel's profit, in thousand units.",
      explanation: "90 − 2Q = 30, so Q = 30 thousand units in total (15 for each firm)." });
  }
  {
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: d1.pCartel, hints: ["Read the price from the demand curve."],
      wrong: [30, 90, 45],
      stem: "The cartel in the question above produces a total of 30 thousand units. Calculate the price on the demand curve P = 90 − Q, in US\\$.",
      explanation: "P = 90 − 30 = US\\$60." });
  }
  {
    b.calc({ d: 4, skill: "ANALYSIS", calculator: true, kind: "money", value: d1.cheatVsKeep, hints: ["Total output rises to 35, so the price falls."],
      wrong: [450, 400, 375],
      stem: "Each firm's quota is 15 thousand units. Firm A secretly produces 20 thousand units while Firm B keeps to its quota of 15 thousand. Demand is P = 90 − Q and marginal cost is US\\$30. Calculate Firm A's profit, in US\\$ thousand.",
      explanation: "1. Total output = 20 + 15 = 35, so P = 90 − 35 = US\\$55.\n2. Profit per unit = 55 − 30 = 25.\n3. Firm A's profit = 25 × 20 = US\\$500 thousand (against 450 for keeping to the quota)." });
  }
  {
    const v = ((500 - 450) / 450) * 100;
    b.num({ d: 4, skill: "ANALYSIS", calculator: true, kind: "pct", value: v, dp: 1, unit: "%", hints: ["Gain from cheating ÷ profit from keeping to quota."],
      wrong: [10, 50, 12.5],
      stem: "A firm's profit is US\\$450 thousand if it keeps to its quota and US\\$500 thousand if it cheats while its partner keeps to the quota. Calculate the percentage gain from cheating, to one decimal place.",
      explanation: "(500 − 450) ÷ 450 × 100 = 11.1%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", applies: CAM, stem: "A Nash equilibrium is always the outcome that gives the highest total pay-off to the players.", answer: false,
    explanation: "False. It is the outcome in which neither player can gain by changing strategy alone; in the Prisoner's Dilemma it is worse for both than cooperation." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Overt collusion", "A formal agreement among firms"], ["Tacit collusion", "Coordination without a formal agreement"], ["Cartel", "Agreed output quotas or a common price"], ["Competition law", "Rules that prohibit price-fixing and market sharing"]],
    extraRight: ["A merger between two firms"],
    explanation: "The last item is a merger, which is a different thing." });

  b.fib({ d: 2, skill: "UNDERSTANDING", applies: CAM, stem: "Complete the statement.",
    template: "In the Prisoner's Dilemma each player has a {{blank:a}} strategy to cheat, so the Nash equilibrium is {{blank:b}} for both players than cooperation.",
    blanks: [{ id: "a", accepted: ["dominant"], choices: ["dominant", "weak", "random"] }, { id: "b", accepted: ["worse"], choices: ["worse", "better", "identical"] }],
    explanation: "Cheating is dominant, and the result is worse for both." });

  b.short({ d: 2, skill: "RECALL", applies: CAM, stem: "Name the outcome in a game in which each player's strategy is the best response to the other's strategy.",
    accepted: ["nash equilibrium", "the nash equilibrium", "nash"], wrong: ["dominant strategy"],
    explanation: "A Nash equilibrium: no player can improve by changing strategy alone." });

  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Think about number of firms, product, entry and monitoring."],
    stem: "Explain **two** conditions that make a cartel more likely to succeed.",
    points: ["First condition identified (for example few firms).", "Explained: easier to agree and to monitor.", "Second condition identified (for example high barriers to entry or inelastic demand).", "Explained: outsiders cannot undercut the cartel, or a higher price raises revenue."],
    modelAnswer: "Few firms: with only a few members it is easier to agree on prices and quotas and to spot cheating. High barriers to entry: new firms cannot enter and undercut the cartel price, so the members keep their supernormal profit.",
    explanation: "Two conditions, each explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Who gains by cheating?"],
    stem: "Explain why members of a cartel have an incentive to cheat on the agreement.",
    points: ["The cartel price is well above marginal cost, so each unit sold earns a high profit.", "A member that produces more than its quota gains extra profit if the others keep to theirs.", "If all members cheat, output rises, the price falls and the cartel collapses.", "Each member expects the others to cheat, so none wants to be left keeping to the quota."],
    modelAnswer: "Because the cartel price is well above marginal cost, each extra unit sold earns a high profit, so a member that secretly produces more than its quota gains while the others hold back. But every member sees the same gain, so if all cheat, output rises and the price falls. Each member expects the others to cheat, so none is willing to keep to the quota, and the cartel breaks down.",
    explanation: "Gain from cheating; collapse when all cheat." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Benefits and problems of competition law."],
    stem: "Assess the effectiveness of competition law in controlling cartels.",
    points: ["It prohibits price-fixing and market sharing, and fines deter firms.", "Leniency for a member that reports the cartel helps detection.", "But evidence is secret and hard to find; tacit collusion is hard to prove.", "Enforcement needs resources and the penalties must exceed the profit; judgement."],
    modelAnswer: "Competition law prohibits price-fixing and market sharing, and heavy fines and leniency for a member that reports the cartel can deter and expose collusion. But cartels meet in secret, evidence is hard to gather and tacit collusion is difficult to prove. Enforcement also needs resources, and fines must be larger than the profit gained. It helps, but it is not fully effective.",
    explanation: "Two-sided assessment." });

  {
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, applies: CAM, hints: ["Use P = 102 − Q and a marginal cost of US\\$30.", "Profit per unit = price − 30."],
      stem: `Two firms in a fictional market face the demand curve P = 102 − Q (price in US\\$, Q in thousand units). Each has a constant marginal cost of US\\$30. They agree to produce 18 thousand units each. A firm that cheats produces 24 thousand units. The pay-offs (profits in US\\$ thousand, Firm A first) are:\n\n${g2.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: d2.cc, stem: "Calculate each firm's profit if both keep to the quota, in US\\$ thousand.", wrong: [576, 36, 1296], explanation: "Total 36; P = 66; profit = (66 − 30) × 18 = US\\$648 thousand." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: d2.cheatVsKeep, stem: "Calculate the profit of a firm that cheats while the other keeps to the quota, in US\\$ thousand.", wrong: [648, 540, 576], explanation: "Total 42; P = 60; profit = (60 − 30) × 24 = US\\$720 thousand." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The Nash equilibrium of this game is", options: [["both firms cheat", "Correct: each firm earns more by cheating whatever the other does."], ["both firms keep to the quota", "Each would gain by cheating."], ["Firm A cheats and Firm B keeps to the quota", "Firm B would gain by cheating."], ["Firm B cheats and Firm A keeps to the quota", "Firm A would gain by cheating."]], answer: "A", explanation: "720 > 648 and 576 > 540: cheating is dominant. Equilibrium pay-offs are 576 each." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why this game is an example of the Prisoner's Dilemma.", points: ["Each firm has a dominant strategy to cheat.", "The Nash equilibrium (576 each) is reached by both cheating.", "Both would be better off at the cartel outcome (648 each) but cannot trust each other."],
          modelAnswer: "Cheating is the dominant strategy for each firm, because it gives more profit whatever the other does, so both end at the Nash equilibrium with 576 each. Both would have earned 648 each by keeping to the quota, but neither can trust the other to do so: the rational choice of each leads to an outcome worse for both." }),
      ],
      explanation: "Cartel profit 648 each; the cheater earns 720; the Nash equilibrium is both cheating with 576 each." });
  }
  {
    const quota = [40, 30, 20, 10];
    const actual = [40, 36, 24, 10];
    chk(quota.reduce((s, x) => s + x, 0), 100); chk(actual.reduce((s, x) => s + x, 0), 110);
    const pQ = 50, pA = 46;
    const md = table(["Member", "Quota (thousand tonnes)", "Actual output (thousand tonnes)"], quota.map((q, i) => [`Member ${String.fromCharCode(65 + i)}`, q, actual[i]]));
    const dp = pctChange(pQ, pA), gainB = 36 * pA - 30 * pQ, lossA = 40 * pA - 40 * pQ;
    chk(dp, -8, 1e-9); chk(gainB, 156); chk(lossA, -160);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Revenue = price × quantity.", "Use the original price as the base for percentage changes."],
      stem: `Four producers in a fictional metal cartel agree quotas that give a market price of US\\$50 per tonne. In one year members B and C exceed their quotas, so the total output rises and the price falls to US\\$46 per tonne (illustrative data).\n\n${md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: dp, dp: 0, unit: "%", stem: "Calculate the percentage change in the price (include the minus sign).", wrong: [8, -4, -8.7], explanation: "(46 − 50) ÷ 50 × 100 = −8%." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: gainB, stem: "Calculate the change in Member B's revenue, in US\\$ thousand (output 36 at US\\$46 compared with its quota of 30 at US\\$50).", wrong: [1656, 1500, -156], explanation: "Revenue now = 36 × 46 = 1,656; at quota = 30 × 50 = 1,500; change = +US\\$156 thousand." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: lossA, stem: "Calculate the change in Member A's revenue, in US\\$ thousand (output 40, price falls from US\\$50 to US\\$46; include the minus sign).", wrong: [160, 1840, 2000], explanation: "Revenue now = 40 × 46 = 1,840; at quota = 40 × 50 = 2,000; change = −US\\$160 thousand." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why Members B and C had an incentive to exceed their quotas.", points: ["Extra output earns extra revenue at a price far above cost.", "A member that cheats gains if others keep to their quotas (B's revenue rises).", "Each member expects the others to cheat, so none wants to hold back."],
          modelAnswer: "Extra output earns extra revenue at a price well above marginal cost, and Member B's revenue rose by US\\$156 thousand. A member that cheats gains most when the others keep to their quotas, and each member expects the others to cheat, so none wants to hold back." }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest **one** way the cartel might try to prevent cheating and assess how effective it would be.", points: ["A method identified (for example monitoring output, penalties or sharing information).", "Explained how it deters cheating.", "A limitation (for example detection is hard or the penalty is difficult to enforce)."],
          modelAnswer: "The members could publish output figures and check them independently, with fines for those who exceed their quotas. This makes cheating easier to detect and less profitable. But output can be hidden, and a cartel has no legal power to enforce fines, so the method is only partly effective." }),
      ],
      explanation: "Price fell 8%; B gained US\\$156 thousand and A lost US\\$160 thousand; cheating is attractive but collapses the cartel price." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Look for conditions that help and hinder a cartel."],
    stem: "Discuss whether collusion between firms in an oligopoly is likely to last.",
    points: ["Collusion raises profit, so firms have an incentive to collude.", "Each member can gain by cheating, as the Prisoner's Dilemma shows.", "Few firms, similar products and high barriers make agreement and monitoring easier.", "Outsiders and new entrants may undercut the cartel price.", "Demand and cost changes affect the stability of the agreement.", "Repeated dealing and threats of punishment (price wars) can sustain tacit collusion.", "Competition law makes overt cartels illegal and risky.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Collusion raises the profits of the firms, so they have an incentive to agree. But the Prisoner's Dilemma shows that each member can gain by cheating whatever the others do, and if all cheat, output rises, the price falls and the agreement collapses. Collusion is more likely to last if there are few firms with similar products and high barriers to entry, because cheating is easier to spot and outsiders cannot undercut the price. Repeated dealing and the threat of a price war can also sustain tacit collusion, but competition law makes overt cartels illegal. Overall, collusion tends to be unstable unless the firms can monitor each other and keep out entrants.",
    explanation: "Incentive to collude against the incentive to cheat." });

  b.card("DEFINITION", "Define **collusion**.", "An agreement or understanding between firms to restrict competition by fixing prices, limiting output or sharing markets.");
  b.card("DEFINITION", "Overt versus tacit collusion?", "Overt: formal, open agreement (a cartel). Tacit: coordination without an agreement, for example following a price leader.");
  b.card("CONCEPT", "Conditions for an effective cartel?", "Few firms, homogeneous product, high barriers to entry, inelastic demand, similar costs, ability to monitor and punish cheats.");
  b.card("CONCEPT", "Why do cartels tend to break down?", "Each member gains by cheating (producing above quota); if all cheat, price falls.");
  b.card("DEFINITION", "Define **dominant strategy**. (Cambridge)", "A strategy that gives a player a higher pay-off than any other, whatever the rival does.", undefined, { applies: CAM });
  b.card("DEFINITION", "Define **Nash equilibrium**. (Cambridge)", "An outcome in which each player's strategy is the best response to the others' strategies, so no player gains by changing alone.", undefined, { applies: CAM });
  b.card("CONCEPT", "What is the Prisoner's Dilemma? (Cambridge)", "A game in which each player's dominant strategy leads to an outcome worse for both than cooperation.", undefined, { applies: CAM });
  b.card("FACT", "Effect of collusion on consumers?", "Higher prices, lower output and choice, and a welfare loss.");
  b.card("CONCEPT", "What does competition law do about cartels?", "Prohibits price-fixing and market sharing, fines firms, may offer leniency to members who report; enforcement is difficult.");
});
