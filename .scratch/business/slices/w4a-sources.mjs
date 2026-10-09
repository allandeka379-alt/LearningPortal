// W4a: sources of finance and choosing a source (COM Form 3; BES Form 1; CAM 5.1.2).
import { concept, P, money, fmt, r2 } from "../lib.mjs";

concept("bus.finance.sources", { file: "finance/sources", keyPrefix: "finance.sources" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an internal source of finance?",
    options: [
      ["Retained profit", "Correct: profit kept within the business."],
      ["A bank loan", "Loans come from outside the business."],
      ["Trade credit", "Trade credit is given by suppliers."],
      ["A government grant", "Grants come from the government."],
    ],
    answer: "A",
    explanation: "Internal sources come from within the business: retained profit, sale of assets, owners' savings.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which source of finance lets a business pay its suppliers some weeks after receiving goods?",
    options: [
      ["Trade credit", "Correct: suppliers allow payment later, often 30 days."],
      ["Leasing", "Leasing rents an asset."],
      ["Debentures", "Debentures are long-term loans to companies."],
      ["Venture capital", "Venture capital buys a share of a growing business."],
    ],
    answer: "A",
    explanation: "Trade credit is short-term finance from suppliers.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why can a sole trader **not** raise finance by selling shares?",
    options: [
      ["Only limited companies can issue shares", "Correct: shares are units of ownership in a company."],
      ["Banks do not allow sole traders to sell shares", "It is a legal matter, not a bank rule."],
      ["Sole traders have no assets to sell", "Many sole traders own assets."],
      ["Shares are too cheap for sole traders", "Price is not the issue."],
    ],
    answer: "A",
    explanation: "Share capital is available only to limited companies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of leasing a vehicle rather than buying it?",
    options: [
      ["The business never owns the vehicle", "Correct: it is returned at the end of the lease."],
      ["A large payment is needed at the start", "Leasing avoids a large initial outlay."],
      ["Maintenance is never included", "Maintenance is often included."],
      ["It cannot be used for a business", "Businesses lease vehicles widely."],
    ],
    answer: "A",
    explanation: "Leasing saves cash now but the asset is never owned.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main advantage of retained profit as a source of finance?",
    options: [
      ["No interest is paid and nothing has to be repaid", "Correct: it is the owners' own money."],
      ["It is available to every new business", "New businesses have no retained profit yet."],
      ["It can always raise very large sums", "It may be too small."],
      ["It increases the dividends paid to owners", "Retaining profit means less is paid out."],
    ],
    answer: "A",
    explanation: "Retained profit costs no interest and causes no loss of control.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A family-owned private limited company wants a large sum for a new factory but the family does not want to lose control. Which source best meets this aim?",
    options: [
      ["A long-term bank loan", "Correct: lenders take no share of ownership."],
      ["Selling new shares to outside investors", "This dilutes the family's control."],
      ["Venture capital", "Venture capitalists take a share of ownership."],
      ["A bank overdraft", "An overdraft is short-term and unsuitable for a factory."],
    ],
    answer: "A",
    explanation: "Debt finance keeps control with the owners, though interest must be paid.",
    hints: ["Which sources give outsiders a share of ownership?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A new technology business with no profits and no collateral has a promising product. Which source is it most likely to obtain?",
    options: [
      ["Venture capital", "Correct: venture capitalists back risky, high-potential start-ups."],
      ["Retained profit", "It has no profits yet."],
      ["Debentures", "Debentures are for established companies."],
      ["A large secured bank loan", "It has no collateral."],
    ],
    answer: "A",
    explanation: "Venture capital funds risky ventures in return for a share of ownership.",
    hints: ["What does the business lack that banks want?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why might a business with large existing loans be refused another loan?",
    options: [
      ["Lenders see a high risk that it cannot repay", "Correct: more debt raises the risk of default."],
      ["The law allows only one loan per business", "No such law exists."],
      ["Banks lend only to new businesses", "Banks lend to established firms too."],
      ["Loans must be repaid before trade credit is used", "There is no such rule."],
    ],
    answer: "A",
    explanation: "Existing debt and interest commitments make further lending risky.",
    hints: ["Think about the business's interest payments."],
  });
  const L = 8000, rate = 10, yrs = 3;
  const tot = r2(L + (L * rate * yrs) / 100);
  const inst = r2(tot / (yrs * 12));
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: inst, calculator: true,
    stem: `A business borrows ${money(L)}. Assume flat interest of ${rate}% a year for ${yrs} years, with the total repaid in ${yrs * 12} equal monthly instalments. Calculate each instalment, to the nearest cent.`,
    wrong: [r2(L / (yrs * 12)), r2((L + (L * rate) / 100) / (yrs * 12))],
    explanation: `Interest = ${rate}% × ${fmt(L)} × ${yrs} = ${money(r2((L * rate * yrs) / 100))}; total ${money(tot)}; ÷ ${yrs * 12} = ${money(inst)}.`,
    workedSolution: `1. Interest per year = ${rate}% × ${fmt(L)} = ${fmt((L * rate) / 100)}.\n2. Interest for ${yrs} years = ${fmt((L * rate * yrs) / 100)}.\n3. Total = ${fmt(L)} + ${fmt((L * rate * yrs) / 100)} = ${fmt(tot)}.\n4. Instalment = ${fmt(tot)} ÷ ${yrs * 12} = ${money(inst)}.`,
    hints: ["Interest is charged for every year of the loan.", "Divide by the number of months."],
  });
  const dep = 1500, hpI = 310, n = 24, lease = 330;
  const hp = dep + hpI * n, ls = lease * n;
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: hp - ls, calculator: true,
    stem: `A firm can lease a machine for ${n} monthly payments of ${money(lease)}, or buy it on hire purchase with a deposit of ${money(dep)} and ${n} monthly payments of ${money(hpI)}. By how much is the total hire purchase cost greater than the total leasing cost?`,
    wrong: [hpI * n - ls, hp],
    explanation: `HP = ${fmt(dep)} + ${n} × ${fmt(hpI)} = ${money(hp)}; lease = ${n} × ${fmt(lease)} = ${money(ls)}; difference = ${money(hp - ls)}.`,
    workedSolution: `1. Hire purchase total = ${fmt(dep)} + ${n} × ${fmt(hpI)} = ${fmt(hp)}.\n2. Leasing total = ${n} × ${fmt(lease)} = ${fmt(ls)}.\n3. Difference = ${fmt(hp)} − ${fmt(ls)} = ${money(hp - ls)}.`,
    hints: ["Do not forget the HP deposit."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Share capital never has to be repaid to shareholders while the company continues trading.",
    answer: true,
    explanation: "True. Shareholders can sell their shares to others but the company does not repay the capital while it trades.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bank overdraft is the most suitable source of finance for buying a new building.",
    answer: false,
    explanation: "False. A building is a long-term need; an overdraft is short-term and can be withdrawn at short notice.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the most suitable source of finance.",
    pairs: [
      ["A tuck shop needs stock now and pays the wholesaler next month", "Trade credit"],
      ["A public limited company raises a large sum for a new mine", "Issue of shares"],
      ["A taxi operator wants a car but cannot pay the full price now", "Hire purchase"],
      ["A shop covers a short cash shortage before school opens", "Bank overdraft"],
    ],
    explanation: "Match the period, amount and legal form to the source.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "Raising money from many people online, each giving a small amount, is called {{blank:a}}. Renting equipment for an agreed period without ever owning it is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["crowdfunding"], choices: ["crowdfunding", "factoring", "leasing", "trade credit"] },
      { id: "b", accepted: ["leasing"], choices: ["crowdfunding", "factoring", "leasing", "trade credit"] },
    ],
    explanation: "Crowdfunding uses many small contributors; leasing gives use without ownership.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the internal source of finance that is profit kept in the business rather than paid to the owners.",
    accepted: ["retained profit", "retained profits", "retained earnings", "ploughed-back profit", "ploughed back profit"],
    wrong: ["dividend"],
    explanation: "Retained profit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors a business should consider when choosing a source of finance.",
    points: [
      "Factor, e.g. purpose / time period (1)",
      "Explained: long-term assets need long-term finance so repayments match the asset's life (1)",
      "Factor, e.g. legal form / amount / cost / control / risk / security (1)",
      "Explained, e.g. a sole trader cannot issue shares; selling shares dilutes control (1)",
    ],
    modelAnswer: "The business should consider the purpose of the finance: a machine used for years should be financed by a long-term loan, not an overdraft. It should also consider its legal form, because only companies can issue shares, so a sole trader must use savings, loans or family.",
    explanation: "Any two factors, each explained.",
    hints: ["What is the money for?", "What kind of business is it?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage to a limited company of issuing new shares rather than taking a bank loan.",
    points: [
      "Advantage: no interest / never repaid (1)",
      "Explained: no fixed payments, so less pressure on cash flow in a bad year (1)",
      "Disadvantage: control diluted / dividends expected / issue costs (1)",
      "Explained: new shareholders get votes and share future profits (1)",
    ],
    modelAnswer: "New shares do not have to be repaid and carry no interest, so the company has no fixed payments in a poor year. However, new shareholders gain votes and a share of future profits, so the existing owners lose some control.",
    explanation: "Equity avoids debt pressure but dilutes control.",
    hints: ["Compare interest and control."],
  });
  const cash = 3200, cost = 12000;
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900, calculator: true,
    stem: `Chipo is a sole trader who runs a successful bakery in Chinhoyi. She wants a delivery van costing ${money(cost)} so that she can supply schools and shops. She has ${money(cash)} of retained profit but needs it as working capital. Her bank has offered a three-year loan; a vehicle dealer offers hire purchase; and her brother-in-law offers to invest in return for a share of the business and a say in decisions.`,
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which of Chipo's options is an internal source of finance?",
        options: [["Retained profit", "Correct: it comes from within the business."], ["The bank loan", "External."], ["Hire purchase", "External."], ["Her brother-in-law's investment", "External."]],
        answer: "A",
      }),
      P.num({
        label: "(b)", marks: 1, kind: "money", value: cost - cash,
        stem: "If Chipo used all her retained profit towards the van, how much more finance would she need?",
        wrong: [cost + cash],
        explanation: `${fmt(cost)} − ${fmt(cash)} = ${money(cost - cash)}.`,
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** reasons why Chipo should not use all of her retained profit for the van.",
        points: ["It is needed as working capital (1)", "Without it she may not pay for flour or wages, causing cash-flow problems (1)", "It is not enough on its own (1)", "She would still need external finance, and leave no reserve for emergencies (1)"],
      }),
      P.manual({
        label: "(d)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "Recommend which source Chipo should use for the van: the bank loan, hire purchase or her brother-in-law's investment. Justify your answer.",
        points: [
          "Bank loan: van owned at once; no loss of control; but interest and collateral (1)",
          "Hire purchase: van is the security; deposit and instalments; costs more than cash price; repossession risk (1)",
          "Brother-in-law: no interest; but loses control and shares profits; family disputes (1)",
          "Van is a long-term asset that earns income from new contracts (1)",
          "Recommendation (1)",
          "Justified by comparison with at least one alternative (1)",
        ],
        levels: [[3, 5, 6, "Balanced comparison of the options applied to Chipo, with a justified recommendation."], [2, 3, 4, "Some comparison applied to the case; weak justification."], [1, 1, 2, "Simple points on the options, little application."]],
        modelAnswer: "A bank loan would give Chipo the van at once and she keeps full control, but she must pay interest and may need collateral. Hire purchase uses the van itself as security, which suits a small business without other assets, but it costs more than the cash price and the van could be repossessed. Her brother-in-law's money carries no interest, but he would share her profits and have a say in decisions, which could cause family disputes. Because the van is a long-term asset that will earn income from the new school contracts, and Chipo wants to keep control of a successful business, I recommend hire purchase if the bank requires collateral she does not have; otherwise the bank loan, which is usually cheaper than HP.",
      }),
    ],
    explanation: `Retained profit is internal; ${money(cost - cash)} more is needed even if all of it were used. A long-term source that keeps control suits a sole trader buying a van.`,
    hints: ["Which source comes from inside the business?", "Consider cost, control and security for each option."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 660,
    stem: "Masvingo Granite Ltd (a fictional public limited company) plans to open a new quarry costing several million dollars. It already has large bank loans.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** external long-term sources of finance available to a public limited company.",
        points: ["Issue of new shares (1)", "Debentures / long-term loans (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the company may find it difficult to obtain another bank loan.",
        points: ["Already has large loans (1)", "High interest payments add to risk of default (1)", "Bank may refuse or charge higher interest / need more collateral (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** advantage and **one** disadvantage of issuing new shares for the quarry.",
        points: ["Advantage: no interest / never repaid / large sums (1)", "Explained: does not add to the existing debt burden (1)", "Disadvantage: control diluted / dividends expected / issue costs (1)"],
      }),
    ],
    explanation: "Public companies can issue shares and debentures; existing debt makes more loans risky; shares avoid debt but dilute control.",
    hints: ["What can a plc do that a sole trader cannot?"],
  });
  b.card("DEFINITION", "Internal source of finance", "Finance from within the business: owners' savings, retained profit, sale of assets, working capital.");
  b.card("DEFINITION", "External source of finance", "Finance from outside: loans, overdrafts, trade credit, leasing, HP, shares, debentures, grants, venture capital, crowdfunding.");
  b.card("DEFINITION", "Retained profit", "Profit kept in the business after tax and owners' payments; no interest, no loss of control.");
  b.card("CONCEPT", "Overdraft versus loan", "Overdraft: flexible, short-term, interest on amount used, can be recalled. Loan: fixed sum and repayments, longer term, often secured.");
  b.card("CONCEPT", "Leasing versus hire purchase", "Leasing: use without ownership, low outlay. HP: deposit and instalments, owned after last payment, costs more than cash price.");
  b.card("DEFINITION", "Venture capital", "Finance for risky, high-potential businesses in return for a share of ownership.");
  b.card("CONCEPT", "Factors in choosing a source", "Purpose and period, amount, legal form, size and age, cost, control, risk and existing debt, security.");
  b.card("CONCEPT", "How to recommend a source", "Name it, apply to the purpose and business, weigh pros and cons, compare with an alternative, conclude.");
  b.card("DEFINITION", "Crowdfunding", "Raising finance from many people each giving a small amount, usually online.");
});
