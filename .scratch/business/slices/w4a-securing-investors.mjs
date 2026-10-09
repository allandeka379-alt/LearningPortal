// W4a: securing investors (BES Form 4).
import { concept, P, money, fmt, r2, round } from "../lib.mjs";

concept("bus.finance.securing-investors", { file: "finance/securing-investors", keyPrefix: "finance.securing-investors" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is corporate governance?",
    options: [
      ["The system by which an organisation is directed and controlled", "Correct: rules and practices for honest, accountable management."],
      ["The government department that registers companies", "That is a registry, not governance."],
      ["The tax an enterprise pays on its profits", "That is corporate tax."],
      ["The advertising an enterprise uses to build its brand and reputation", "That is promotion."],
    ],
    answer: "A",
    explanation: "Governance covers records, transparency, accountability and compliance.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which document sets out an enterprise's market, operations and financial forecasts for an investor?",
    options: [
      ["A business plan", "Correct: it explains how the enterprise will succeed."],
      ["A delivery note", "A delivery note accompanies goods."],
      ["A bank statement", "It shows past transactions on one account."],
      ["A receipt", "A receipt proves a payment."],
    ],
    answer: "A",
    explanation: "Investors read the business plan to judge risk and return.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does keeping the owner's personal money separate from the business's money attract investors?",
    options: [
      ["Investors can see the enterprise's true performance", "Correct: clear records show real profits and cash."],
      ["It allows the owner to avoid paying tax", "Separation is about accurate records, not avoiding tax."],
      ["It guarantees the business will make a profit", "Nothing guarantees profit."],
      ["It means investors never need to see the accounts", "Investors still need accounts."],
    ],
    answer: "A",
    explanation: "Separate, accurate records are part of good governance and build trust.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does an enterprise's track record show an investor?",
    options: [
      ["Its past performance in sales, profits and repayments", "Correct: past behaviour signals future reliability."],
      ["The routes its delivery vehicles take", "Not what track record means."],
      ["The number of competitors in its market", "That is market research."],
      ["The policy interest rate set by the Reserve Bank of Zimbabwe", "That is a policy rate."],
    ],
    answer: "A",
    explanation: "A record of profitable trading and repaid loans lowers the perceived risk.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is part of a favourable policy environment for investors?",
    options: [
      ["Stable tax rules and courts that enforce contracts", "Correct: predictability reduces investors' risk."],
      ["Frequent sudden changes to business regulations", "Uncertainty discourages investment."],
      ["Long delays in registering a business", "Delays raise costs and discourage investors."],
      ["Weak protection of property rights", "Weak rights increase risk."],
    ],
    answer: "A",
    explanation: "Investors prefer stable, predictable and supportive policies.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A new enterprise has no track record. Which action would **best** build investor confidence?",
    options: [
      ["Preparing a detailed business plan with market research", "Correct: it shows demand and how money will be used."],
      ["Promising investors a guaranteed return of double their money", "Unrealistic promises reduce credibility."],
      ["Refusing to share any financial information", "Secrecy lowers trust."],
      ["Mixing business and personal spending to save time", "This makes records unreliable."],
    ],
    answer: "A",
    explanation: "Without a history, a well-researched plan is the best evidence of potential.",
    hints: ["What can a new enterprise show instead of past results?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "How does a strong brand reputation reduce risk for investors?",
    options: [
      ["Loyal customers make future sales steadier", "Correct: predictable demand lowers risk."],
      ["It removes the need to keep financial records", "Records are still needed."],
      ["It guarantees government grants", "Grants depend on other criteria."],
      ["It allows the enterprise to ignore competitors", "Competitors remain a threat."],
    ],
    answer: "A",
    explanation: "Reputation brings repeat customers and steadier revenue.",
    hints: ["Think about customers who come back."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Apart from money, what else might an experienced investor bring to an enterprise?",
    options: [
      ["Skills, advice and business contacts", "Correct: investors often help manage and grow the enterprise."],
      ["Exemption from all taxes", "Investors cannot grant tax exemptions."],
      ["A guarantee that prices will rise", "No one can guarantee prices."],
      ["Ownership of the enterprise's customers", "Customers are not owned."],
    ],
    answer: "A",
    explanation: "Investors can add expertise and networks as well as finance.",
  });
  const put = 6000, sharePct = 25, profit = 18400;
  const ret = r2((profit * sharePct) / 100);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "pct", value: (ret / put) * 100, calculator: true,
    stem: `An investor puts ${money(put)} into a poultry enterprise in return for ${sharePct}% of its annual profit. This year the profit is ${money(profit)}. Calculate the investor's return as a percentage of the amount invested, to one decimal place.`,
    wrong: [sharePct, round((profit / put) * 100, 1)],
    explanation: `Investor's share = ${sharePct}% × ${fmt(profit)} = ${money(ret)}; return = ${fmt(ret)} ÷ ${fmt(put)} × 100 = ${round((ret / put) * 100, 1)}%.`,
    workedSolution: `1. Investor's share of profit = ${sharePct}% × ${fmt(profit)} = ${fmt(ret)}.\n2. Return = ${fmt(ret)} ÷ ${fmt(put)} × 100 = ${round((ret / put) * 100, 1)}%.`,
    hints: ["First find the investor's share of the profit.", "Then compare it with the amount invested."],
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2((9200 * 30) / 100),
    stem: `An enterprise promises an investor 30% of its profit. If profit is ${money(9200)}, how much does the investor receive?`,
    wrong: [9200 - r2((9200 * 30) / 100)],
    explanation: `30% × ${fmt(9200)} = ${money(r2((9200 * 30) / 100))}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Investors are more willing to invest in enterprises that keep accurate, up-to-date records.",
    answer: true,
    explanation: "True. Records let investors judge performance and reduce uncertainty.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A single enterprise can change the national policy environment on its own.",
    answer: false,
    explanation: "False. Government sets policy; an enterprise can choose favourable sectors, use incentives and comply with rules.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each way of attracting investors with how it builds confidence.",
    pairs: [
      ["Audited accounts", "Investors trust that the figures are accurate"],
      ["Business plan with market research", "Shows there is demand and how funds will be used"],
      ["Record of repaying loans on time", "Shows the owners keep their promises"],
      ["Strong brand reputation", "Loyal customers make sales steadier"],
    ],
    explanation: "Each method reduces a different part of the investor's uncertainty.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Being open with investors about results and problems is called {{blank:a}}. An enterprise's history of past performance is its {{blank:b}} record.",
    blanks: [
      { id: "a", accepted: ["transparency"], choices: ["transparency", "diversification", "integration", "specialisation"] },
      { id: "b", accepted: ["track"], choices: ["track", "bank", "sales", "brand"] },
    ],
    explanation: "Transparency and a track record build trust.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What term describes the system of rules and practices by which a business is directed and controlled?",
    accepted: ["corporate governance", "governance", "good corporate governance"],
    wrong: ["management"],
    explanation: "Corporate governance.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** features of good corporate governance that attract investors.",
    points: [
      "Feature, e.g. accurate, audited records (1)",
      "Explained: investors can trust reported profits and judge performance (1)",
      "Feature, e.g. transparency / accountability / compliance / defined management roles (1)",
      "Explained, e.g. regular honest reports mean investors are not surprised by hidden problems (1)",
    ],
    modelAnswer: "Good governance means keeping accurate, audited records, so investors can trust the profits reported. It also means transparency: managers report regularly and honestly, including problems, so investors are not surprised by hidden losses.",
    explanation: "Name each feature and link it to investor confidence.",
    hints: ["What do investors need to see and trust?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** sections of a business plan that are most important to an investor, and why.",
    points: [
      "Section, e.g. financial forecasts (1)",
      "Why: shows expected profit, cash flow and return on the investment (1)",
      "Section, e.g. market research / management team / use of funds (1)",
      "Why, e.g. proves customers want the product / shows managers can deliver (1)",
    ],
    modelAnswer: "Financial forecasts matter most because they show expected sales, profit and cash flow, so the investor can judge the likely return. Market research is also vital because it shows that customers want the product, which reduces the risk of failure.",
    explanation: "Investors focus on return and risk.",
    hints: ["Which sections answer 'Will I get my money back?'"],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Chipo and Nyasha run a small enterprise in Gweru that makes school uniforms. They sell to three schools and want to buy four industrial sewing machines to supply more schools. They keep sales in a notebook, mix business and household money, and have no written plan. A local investor has asked to see \"proper information\" before deciding.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** things the investor will look for before investing.",
        points: ["Expected return / profit (1)", "Risk / management ability / growth potential / accurate records (1)"],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** weaknesses in the enterprise that may discourage the investor.",
        points: ["Records only in a notebook (1)", "Investor cannot verify sales or profit (1)", "Business and household money mixed / no business plan (1)", "True performance unclear; no evidence of how money will be used (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how a business plan could help them secure the investment.",
        points: ["Shows demand from schools (market research) (1)", "Forecasts sales, costs and profit from the new machines (1)", "Explains use of funds and investor's return (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Recommend the **two** most important steps Chipo and Nyasha should take first. Justify your choice.",
        points: ["Step: separate bank account and proper records (1)", "Step: written business plan with forecasts (1)", "Justification: these address the investor's request for proper information (1)", "Justification: they build on their existing track record with three schools (1)"],
      }),
    ],
    explanation: "Investors want return, low risk and reliable information; proper records, separate accounts and a business plan address the weaknesses.",
    hints: ["What does 'proper information' mean to an investor?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660,
    stem: "A government has introduced tax relief for new manufacturing enterprises, simplified business registration and set up a special economic zone near Bulawayo. Sipho plans a small furniture factory and needs investors.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** features of a favourable policy environment in the scenario.",
        points: ["Tax relief for manufacturing (1)", "Simplified registration / special economic zone (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how these policies may help Sipho attract investors.",
        points: ["Lower taxes raise expected profit and return (1)", "Easier registration reduces start-up costs and delays (1)", "Stable support signals lower risk / confidence (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** other way Sipho could make his enterprise attractive to investors.",
        points: ["Way, e.g. good governance / brand / track record / security (1)", "Explained (1)", "Linked to lower risk or higher return (1)"],
      }),
    ],
    explanation: "Supportive policies raise returns and lower risk; Sipho should add good governance and a strong plan.",
    hints: ["How do taxes affect an investor's return?"],
  });
  b.card("DEFINITION", "Investor", "Person or organisation that provides money expecting a return (profit share, dividends, interest, growth).");
  b.card("CONCEPT", "What investors look for", "Return, safety, growth potential, capable management, accurate information, a way to exit.");
  b.card("DEFINITION", "Corporate governance", "Rules and practices by which an organisation is directed and controlled: records, transparency, accountability, compliance.");
  b.card("CONCEPT", "Favourable policy environment", "Stable tax and rules, enforceable contracts, property rights, easy registration, incentives such as tax relief or economic zones.");
  b.card("DEFINITION", "Track record", "Past performance: sales, profits, repayments and promises kept.");
  b.card("CONCEPT", "Business plan for investors", "Summary, objectives, market research, operations, management, financial forecasts, use of funds and return.");
  b.card("CONCEPT", "Ways to secure investors", "Policy environment, good governance, reputable brand, sound business plan, track record, security, networking.");
  b.card("FORMULA", "Investor's return %", "Investor's share of profit ÷ amount invested × 100.");
});
