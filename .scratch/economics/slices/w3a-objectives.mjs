// W3a: econ.firms.objectives (Cambridge only) — survival, social welfare, profit maximisation, growth; why they differ.
import { concept, P, table, check, fmt, pctChange } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.objectives", { file: "firms/objectives", keyPrefix: "firms.objectives" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "A newly opened shop is mainly trying to cover its costs and stay open for its first year. Which objective is this?",
    options: [
      ["Survival", "Correct: staying in business is the first aim of many new firms."],
      ["Growth", "Growth means getting bigger, not just staying open."],
      ["Profit maximisation", "The shop is aiming to stay open, not for the largest profit."],
      ["Social welfare", "Its aim is about its own future, not benefits to society."],
    ],
    answer: "A",
    explanation: "Survival means staying in business; it is typical of new firms and of firms in a crisis.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which objective means aiming for the greatest possible difference between total revenue and total cost?",
    options: [
      ["Profit maximisation", "Correct: profit = TR − TC, made as large as possible."],
      ["Growth", "Growth is about size: sales, output or market share."],
      ["Survival", "Survival only needs costs to be covered."],
      ["Social welfare", "Social welfare puts benefits to society first."],
    ],
    answer: "A",
    explanation: "Profit maximisation means making TR − TC as large as possible.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which firm is **most likely** to have social welfare as its main objective?",
    options: [
      ["A state-owned water supplier that must serve every household", "Correct: public-sector firms often aim to provide essential services to all."],
      ["A private mobile phone retailer owned by a group of shareholders", "Private firms owned by shareholders usually aim for profit."],
      ["A new hair salon that opened two months ago", "A new firm is likely to aim for survival."],
      ["A large private company planning to take over its rivals", "Taking over rivals is a sign of a growth objective."],
    ],
    answer: "A",
    explanation: "Public-sector firms are usually expected to provide affordable services to everyone, even where this makes a loss.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action is the clearest sign that a firm's objective is **growth**?",
    options: [
      ["Opening new branches to increase its market share", "Correct: increasing size and market share."],
      ["Cutting all spending to avoid running out of cash", "This suggests survival."],
      ["Raising prices where demand is price inelastic", "This aims to raise profit."],
      ["Paying above-market prices to local farmers it buys from", "This suggests a social welfare aim."],
    ],
    answer: "A",
    explanation: "Growth is about increasing size: sales, output, outlets or market share.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why might the managers of a large company prefer **growth** to profit maximisation?",
    options: [
      ["Their pay, status and job security often rise with the firm's size", "Correct: managers' rewards are often linked to size, not profit."],
      ["Growth always gives the firm the highest possible profit", "Growth can reduce profit, for example through price cuts."],
      ["Managers receive all of the firm's profits as dividends", "Dividends go to shareholders, not managers."],
      ["Larger firms never have to worry about their costs", "Large firms can still suffer from high costs."],
    ],
    answer: "A",
    hints: ["Who makes the decisions in a large company, and what do they gain from size?"],
    explanation: "Where managers control the firm, they may pursue size because it brings them higher salaries, status and security, even if profit is lower.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A firm installs equipment to stop waste from its factory polluting a river, although the law does not require it. Which conflict between objectives does this show?",
    options: [
      ["Social welfare against profit, because costs rise", "Correct: the extra cost cuts profit but benefits the community."],
      ["Growth against survival, because the firm expands too fast", "Installing equipment is not rapid expansion."],
      ["Survival against social welfare, because the firm will close", "Nothing suggests the firm will close."],
      ["Profit against growth, because sales will fall", "The issue is extra cost, not lost sales."],
    ],
    answer: "A",
    hints: ["Who benefits from the equipment and who pays for it?"],
    explanation: "The equipment raises costs (lower profit) to benefit people downstream (social welfare).",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "During a recession demand for a firm's products falls sharply. Which change in objective is most likely?",
    options: [
      ["From growth to survival", "Correct: with falling sales the firm focuses on staying in business."],
      ["From survival to growth", "A recession makes expansion harder, not easier."],
      ["From social welfare to growth", "Recessions do not usually lead firms to expand."],
      ["From survival to profit maximisation", "Falling demand makes survival more, not less, important."],
    ],
    answer: "A",
    hints: ["What happens to the firm's revenue and cash in a recession?"],
    explanation: "Falling revenue makes it harder to cover costs, so firms cut spending, delay expansion and focus on survival.",
  });

  // Numeric: profit versus growth (different figures from the lesson).
  {
    const pA = 12, qA = 3000, atcA = 9, pB = 10, qB = 4500, atcB = 8.2;
    const prA = (pA - atcA) * qA, prB = (pB - atcB) * qB;
    check("prA", prA, 9000); check("prB", prB, 8100);
    const tT = table(["Plan", "Price (US\\$)", "Units sold per month", "Average total cost (US\\$)"], [["Plan 1", pA, qA, atcA], ["Plan 2", pB, qB, atcB]]);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: prA - prB,
      stem: `A fictional firm making school bags in Bulawayo is choosing between two pricing plans.\n\n${tT}\n\nCalculate how much more monthly profit Plan 1 earns than Plan 2.`,
      wrong: [pB * qB - pA * qA, prA],
      hints: ["Profit = (price − ATC) × units sold."],
      explanation: `1. Plan 1: (${pA} − ${atcA}) × ${fmt(qA)} = US\\$${fmt(prA)}.\n2. Plan 2: (${pB} − ${fmt(atcB)}) × ${fmt(qB)} = US\\$${fmt(prB)}.\n3. Difference: ${fmt(prA)} − ${fmt(prB)} = **US\\$${fmt(prA - prB)}**.\n4. Plan 2 has the higher revenue (US\\$${fmt(pB * qB)} against US\\$${fmt(pA * qA)}), so a firm aiming for growth might still choose it. ${fmt(pB * qB - pA * qA)} is the difference in revenue, not profit.`,
    });
  }
  {
    const qA = 2400, qB = 3300;
    const g = pctChange(qA, qB);
    check("g", g, 37.5);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: g, daily: true,
      stem: `A fictional firm could raise its monthly sales from ${fmt(qA)} to ${fmt(qB)} units by cutting its price. Calculate the percentage increase in units sold, to one decimal place.`,
      wrong: [((qB - qA) / qB) * 100, qB - qA],
      explanation: `(${fmt(qB)} − ${fmt(qA)}) ÷ ${fmt(qA)} × 100 = **${fmt(g, 1)}%**. Dividing by the new figure (${fmt(qB)}) gives ${fmt(((qB - qA) / qB) * 100, 1)}%, the wrong base.`,
    });
  }
  {
    const firm = 4800, market = 32000, share = (firm / market) * 100;
    check("share", share, 15);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: share, daily: true,
      stem: `A fictional dairy sells ${fmt(firm)} litres of milk a day in a town where total sales are ${fmt(market)} litres a day. Calculate its market share, to one decimal place.`,
      wrong: [(market / firm) * 100],
      explanation: `Market share = ${fmt(firm)} ÷ ${fmt(market)} × 100 = **${fmt(share, 1)}%**. A rising market share is one measure of growth.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "All firms have profit maximisation as their main objective.",
    answer: false,
    explanation: "False. New firms often aim to survive, public-sector firms often aim for social welfare and many large firms aim for growth.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm can increase its sales revenue while its profit falls.",
    answer: true,
    explanation: "True. Cutting prices or spending on expansion can raise sales and revenue while costs rise faster, so profit falls.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each firm's situation with its most likely objective.",
    pairs: [
      ["A vendor who started selling airtime last week", "Survival"],
      ["A government-owned bus company serving rural routes at low fares", "Social welfare"],
      ["A shareholder-owned company with a strong brand and stable sales", "Profit maximisation"],
      ["A supermarket chain opening five new stores this year", "Growth"],
    ],
    explanation: "Age, ownership and the firm's actions show its likely objective.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a firm's objectives may change over time.",
    points: [
      "Stage of the firm: new firms aim to survive; once established they aim for profit or growth.",
      "Explains with a development (e.g. after building a customer base it can expand).",
      "Economic conditions: a recession / rising costs / new competitors make survival the priority.",
      "Change of ownership / control (e.g. privatisation puts more weight on profit).",
    ],
    modelAnswer: "First, as a firm develops its aims change: a new firm aims to survive until it has regular customers, and once it is established it can aim for higher profit or growth. Second, economic conditions change: in a recession, or when a new competitor enters, sales fall and the firm may switch to survival. A change of ownership, such as privatisation, can also shift the aim from social welfare to profit.",
    hints: ["Think about the firm's age and about the economy."],
    explanation: "Two reasons, each identified and explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: "Farai and Tendai started a fictional delivery business in Harare two years ago with one motorbike. They now have six motorbikes and a contract with a pharmacy chain. A large logistics company has offered to buy the business. Farai wants to sell and use the money elsewhere; Tendai wants to borrow to buy ten more motorbikes and expand to Bulawayo.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which objective is Tendai pursuing?",
        options: [["Growth", "Correct: expanding the fleet and entering a new city."], ["Survival", "The business is established and expanding."], ["Social welfare", "Nothing in the plan is aimed at benefiting society."], ["Profit maximisation", "The plan is about size; it may lower profit at first."]],
        answer: "A",
        explanation: "Buying ten more motorbikes and entering Bulawayo is growth.",
      }),
      P.manual({ label: "(b)", marks: 3, stem: "Explain why the business's objective two years ago was probably survival.", points: ["It was new, with one motorbike and few regular customers.", "It had start-up costs and little cash / no reputation.", "So its first aim was to cover costs and stay in business."], modelAnswer: "Two years ago the business was new, with one motorbike and few regular customers. It had start-up costs and little cash, so its first aim was to earn enough to cover its costs and stay in business." }),
      P.manual({ label: "(c)", marks: 4, stem: "Analyse how borrowing to expand could conflict with the objective of survival.", points: ["Borrowing creates interest and repayments that must be paid.", "If new contracts / customers in Bulawayo do not arrive quickly, revenue may not cover the extra costs.", "Cash may run short, so the business cannot pay its bills.", "So rapid growth could threaten survival."], modelAnswer: "Borrowing to buy ten motorbikes means interest and repayments every month. If demand in Bulawayo grows slowly, revenue will not cover these extra costs and the business may run short of cash. A firm that cannot pay its bills may have to close, so expanding too fast could threaten the survival the owners worked for." }),
      P.manual({
        label: "(d)", marks: 4, levels: LV(4),
        stem: "Discuss whether the owners should expand the business rather than sell it.",
        points: [
          "Expand: growing demand / contract with a pharmacy chain; economies of scale; higher future profit.",
          "Sell: certain sum now; avoids the risk of debt; money can be used elsewhere.",
          "Depends on the evidence of demand in Bulawayo and the interest rate / offer price.",
          "Justified conclusion.",
        ],
        modelAnswer: "Expanding could bring higher profits in future: the business already has a contract with a pharmacy chain, and a bigger fleet may lower costs per delivery. However, the borrowing is risky, and selling gives the owners a certain sum now that they can use elsewhere. If they have firm evidence of demand in Bulawayo and can borrow at a reasonable rate, they should expand, perhaps more gradually; if not, the offer is the safer choice.",
      }),
    ],
    explanation: "(a) Growth. (b) A new firm aims to survive. (c) Borrowing to grow raises costs and risk. (d) Weigh growth prospects against risk and the certain sale price.",
    hints: ["Consider the stage of the business and the risks of debt."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional private company runs a chain of clinics in a southern African country. Its shareholders want higher profits, but the company has been asked by the government to open clinics in poorer rural areas where fees must be low.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Identify **two** objectives that could conflict in this case.", points: ["Profit maximisation (shareholders).", "Social welfare (affordable rural health care)."], modelAnswer: "Profit maximisation, which the shareholders want, and social welfare, providing affordable health care in rural areas." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the company should open clinics in the rural areas.",
        points: [
          "For: improves health / welfare; good reputation attracts customers and staff.",
          "For: may gain government support, contracts or subsidies; long-run growth in new markets.",
          "Against: low fees and high costs (transport, staff) mean losses; lower dividends.",
          "Against: shareholders may sell shares / replace managers; may threaten profit-making clinics.",
          "Possible compromise: open a few, with government subsidy or cross-subsidy from urban clinics.",
          "Justified conclusion.",
        ],
        modelAnswer: "Opening rural clinics would improve the health of people with little access to care, and the company's reputation would rise, which may attract urban patients and good staff. The government may also offer contracts or subsidies, and rural areas could become a source of growth. However, with low fees and higher costs of staffing and supplies, the clinics are likely to make losses, reducing the dividends shareholders expect, and shareholders may object. A sensible compromise is to open a small number of clinics if the government contributes to costs; without such support, the conflict with profit is too great for a shareholder-owned company.",
      }),
    ],
    explanation: "(a) Profit versus social welfare. (b) Benefits and reputation against losses and shareholder pressure.",
    hints: ["Who owns the company and what do they expect?"],
  });

  b.card("DEFINITION", "Survival (objective)", "Staying in business by covering costs; typical of new firms and firms in a crisis.");
  b.card("DEFINITION", "Social welfare (objective)", "Aiming to benefit society, e.g. affordable services, jobs or a cleaner environment, even at the cost of profit.");
  b.card("DEFINITION", "Profit maximisation", "Aiming for the largest possible difference between total revenue and total cost.");
  b.card("DEFINITION", "Growth (objective)", "Aiming to increase the firm's size: sales, output, market share, outlets or workforce.");
  b.card("CONCEPT", "Why might managers prefer growth to profit?", "Their salaries, status and job security often rise with the size of the firm.");
  b.card("CONCEPT", "Profit versus growth", "Price cuts and expansion raise sales and market share but can reduce profit now.");
  b.card("CONCEPT", "Why objectives differ between firms", "Size and age, ownership (private, public, co-operative), who controls the firm, and the level of competition.");
  b.card("CONCEPT", "Why objectives change over time", "The firm moves from start-up to established; recessions, new rivals or a change of ownership change its aims.");
  b.card("FACT", "Which firms usually aim for social welfare?", "Public-sector firms providing essential services, co-operatives and social enterprises.");
});
