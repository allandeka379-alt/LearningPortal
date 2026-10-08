// W3a: econ.firms.sources-of-finance (ZIMSEC only) — shares, debentures, loans, overdrafts, leasing, hire purchase,
// retained profits, grants; choosing between them.
import { concept, P, table, check, fmt } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.firms.sources-of-finance", { file: "firms/sources-of-finance", keyPrefix: "firms.sources-of-finance" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is an **internal** source of finance?",
    options: [
      ["Retained profits", "Correct: money from within the business."],
      ["A bank loan", "Provided by a bank outside the firm."],
      ["An issue of new shares", "Provided by outside investors."],
      ["A government grant", "Provided by the government."],
    ],
    answer: "A",
    explanation: "Retained profit is profit kept in the business; the other sources come from outside.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **debenture**?",
    options: [
      ["A long-term loan to a company that pays a fixed rate of interest", "Correct: debenture holders are lenders."],
      ["A share that gives its holder a vote and a share of the profits", "That is an ordinary share."],
      ["An agreement to rent equipment without ever owning it", "That is leasing."],
      ["Permission to take more money out of an account than is in it", "That is an overdraft."],
    ],
    answer: "A",
    explanation: "A debenture is long-term loan capital with fixed interest; holders are creditors, not owners.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main difference between **hire purchase** and **leasing**?",
    options: [
      ["With hire purchase the firm owns the asset after the last payment", "Correct: with leasing it never owns it."],
      ["With leasing the firm owns the asset after the last payment", "This reverses the two."],
      ["Hire purchase needs no payments until the asset is fully paid for", "HP involves a deposit and instalments."],
      ["Leasing is available only to public limited companies", "Any business can lease equipment."],
    ],
    answer: "A",
    explanation: "Hire purchase ends in ownership; leasing is renting for an agreed period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A shop needs money for two months to pay for extra stock before the festive season. Which source is most suitable?",
    options: [
      ["A bank overdraft", "Correct: flexible short-term finance, repaid when the stock is sold."],
      ["An issue of debentures", "Debentures are long-term."],
      ["An issue of ordinary shares", "Long-term and would give away ownership."],
      ["A ten-year bank loan", "Far longer than the two months needed."],
    ],
    answer: "A",
    explanation: "Short-term needs for working capital suit an overdraft (or trade credit); long-term sources would be costly and unnecessary.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why can a sole trader **not** raise finance by issuing shares?",
    options: [
      ["Only limited companies can issue shares", "Correct: a sole trader is not a company."],
      ["Banks do not allow sole traders to borrow money", "Sole traders can borrow."],
      ["Sole traders are not allowed to make profits", "They keep all the profit."],
      ["Shares can only be issued by the government", "Companies issue shares."],
    ],
    answer: "A",
    explanation: "Shares are units of ownership in a company; sole traders and partnerships are not companies.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "The owners of a private limited company want to raise a large sum without losing control of the company. Which source is most suitable?",
    options: [
      ["A long-term bank loan or debentures", "Correct: lenders get interest but no vote."],
      ["Selling ordinary shares to new investors", "New ordinary shareholders get votes and dilute control."],
      ["A bank overdraft renewed every month", "An overdraft is short-term and costly for large sums."],
      ["Trade credit from its suppliers", "Trade credit is short-term and limited in size."],
    ],
    answer: "A",
    hints: ["Which providers of finance get a vote?"],
    explanation: "Loans and debentures do not give the lender any ownership or vote, so control is kept; but interest must be paid.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why might a firm whose profits vary a lot from year to year prefer to raise finance by issuing shares rather than debentures?",
    options: [
      ["Dividends can be cut in a bad year; debenture interest cannot", "Correct: shares carry no fixed obligation."],
      ["Shares must be repaid to investors sooner than debentures", "Shares are never repaid."],
      ["Shareholders have no right to any of the company's profits", "Shareholders receive dividends from profits."],
      ["Issuing shares never changes who controls the company", "New ordinary shares can dilute control."],
    ],
    answer: "A",
    hints: ["Which one creates a fixed payment every year?"],
    explanation: "Debenture interest is a fixed commitment; dividends depend on profit, so shares are less risky for a firm with uncertain profits.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a feature of **preference shares**?",
    options: [
      ["A fixed dividend paid before any ordinary dividend", "Correct."],
      ["A vote on every decision at shareholders' meetings", "Preference shareholders usually have no vote."],
      ["Interest paid even when the company makes a loss", "That describes debentures."],
      ["Repayment of the full amount to holders after one year", "Shares are not repaid in this way."],
    ],
    answer: "A",
    explanation: "Preference shares usually pay a fixed dividend ahead of ordinary shares but carry no vote.",
  });

  {
    const n = 3000, v = 100, r = 8, amt = n * v, int = (amt * r) / 100;
    check("int", int, 24000);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: int, daily: true,
      stem: `A fictional company issues ${fmt(n)} debentures of US\\$${v} each at ${r}% interest a year. Calculate the interest it must pay each year.`,
      wrong: [amt, (n * r) / 100],
      explanation: `Amount raised = ${fmt(n)} × ${v} = US\\$${fmt(amt)}. Interest = ${fmt(amt)} × ${r} ÷ 100 = **US\\$${fmt(int)}** a year, payable even in a loss-making year.`,
    });
  }
  {
    const cash = 2400, dep = 480, inst = 95, nI = 24, total = dep + inst * nI, extra = total - cash;
    check("total", total, 2760); check("extra", extra, 360);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: extra,
      stem: `A fictional bakery buys an oven on hire purchase. The cash price is US\\$${fmt(cash)}. It pays a deposit of US\\$${dep} and ${nI} monthly instalments of US\\$${inst}. How much more does it pay than the cash price?`,
      wrong: [total, inst * nI - cash],
      hints: ["Total paid = deposit + all instalments."],
      explanation: `1. Instalments: ${nI} × ${inst} = US\\$${fmt(inst * nI)}.\n2. Total paid = ${dep} + ${fmt(inst * nI)} = US\\$${fmt(total)}.\n3. Extra cost = ${fmt(total)} − ${fmt(cash)} = **US\\$${extra}**.\n4. US\\$${fmt(total)} is the total paid, not the extra; leaving out the deposit gives US\\$${inst * nI - cash}.`,
    });
  }
  {
    const p = 5000, r = 15, yrs = 2, int = (p * r * yrs) / 100;
    check("int", int, 1500);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: p + int, daily: true,
      stem: `A fictional tailor borrows US\\$${fmt(p)} from a microfinance institution at ${r}% simple interest a year for ${yrs} years. Calculate the total amount she must repay.`,
      wrong: [int, p + int / yrs],
      explanation: `Interest = ${fmt(p)} × ${r} ÷ 100 × ${yrs} = US\\$${fmt(int)}. Total repaid = ${fmt(p)} + ${fmt(int)} = **US\\$${fmt(p + int)}**. US\\$${fmt(int)} is the interest only.`,
    });
  }
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Debenture holders are part-owners of the company.",
    answer: false,
    explanation: "False. Debenture holders are lenders (creditors); shareholders are the owners.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Retained profit has no interest cost but still has an opportunity cost.",
    answer: true,
    explanation: "True. The owners give up dividends now, and the money could have earned a return elsewhere.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source of finance with its description.",
    pairs: [
      ["Overdraft", "Borrowing on a current account up to an agreed limit"],
      ["Trade credit", "Receiving goods now and paying the supplier later"],
      ["Leasing", "Renting equipment without ever owning it"],
      ["Ordinary shares", "Units of ownership with a vote and a variable dividend"],
      ["Grant", "Money from government or an agency that is not repaid"],
    ],
    explanation: "Each source differs in time period, cost, repayment and effect on control.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Buying a new factory needs {{blank:a}}-term finance. Paying wages while waiting for customers to pay needs {{blank:b}}-term finance. A bank usually asks for {{blank:c}} before it makes a large loan.",
    blanks: [
      { id: "a", accepted: ["long"], choices: ["long", "short"] },
      { id: "b", accepted: ["short"], choices: ["long", "short"] },
      { id: "c", accepted: ["collateral"], choices: ["collateral", "dividends", "shares"] },
    ],
    explanation: "Match the length of finance to its use; lenders want security (collateral).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** factors a firm should consider when choosing a source of finance.",
    points: [
      "Identifies a factor, e.g. cost (interest rate / issue costs).",
      "Explains it: higher cost reduces profit / must be paid even in bad years.",
      "Identifies a second factor, e.g. control / time period / amount / legal form / risk.",
      "Explains it: e.g. issuing ordinary shares gives new owners votes, so the original owners lose some control.",
    ],
    modelAnswer: "First, cost: a loan with a high interest rate raises the firm's costs and must be paid even when profit falls, so cheaper sources are preferred. Second, control: issuing ordinary shares brings in new owners with votes, so the original owners lose some control, whereas a loan does not affect control.",
    hints: ["Think about cost, control, time period and the legal form of the business."],
    explanation: "Two factors, each identified and explained.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12,
    stem: `Thandeka runs a fictional printing business as a sole trader in Mutare. She needs a new printing machine with a cash price of US\\$9,000. She is comparing three offers.\n\n${table(["Offer", "Terms"], [["Bank loan", "US\\$9,000 at 12% simple interest a year for 2 years; collateral required"], ["Hire purchase", "Deposit of US\\$1,800 and 24 monthly instalments of US\\$380"], ["Leasing", "24 monthly payments of US\\$260; machine returned at the end"]], { align: ["l", "l"] })}`,
    parts: (() => {
      const loanT = 9000 + (9000 * 12 * 2) / 100, hpT = 1800 + 24 * 380, lT = 24 * 260;
      check("loan", loanT, 11160); check("hp", hpT, 10920); check("lease", lT, 6240);
      return [
        P.num({ label: "(a)", marks: 2, kind: "money", value: loanT, stem: "Calculate the total amount repaid on the bank loan.", wrong: [(9000 * 12 * 2) / 100], explanation: `Interest = 9,000 × 12 ÷ 100 × 2 = 2,160; total = 9,000 + 2,160 = US\\$${fmt(loanT)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: hpT, stem: "Calculate the total amount paid under hire purchase.", wrong: [24 * 380], explanation: `1,800 + 24 × 380 = 1,800 + 9,120 = US\\$${fmt(hpT)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: lT, stem: "Calculate the total amount paid under leasing.", wrong: [260], explanation: `24 × 260 = US\\$${fmt(lT)}.` }),
        P.mcq({ label: "(d)", marks: 1, stem: "Which offer leaves Thandeka owning the machine at the lowest total cost?", options: [["Hire purchase", `Correct: US\\$${fmt(hpT)}, below the loan's US\\$${fmt(loanT)}.`], ["Bank loan", `It costs US\\$${fmt(loanT)} in total.`], ["Leasing", "She would not own the machine."], ["All three cost the same", "The totals differ."]], answer: "A", explanation: "Of the two offers that end in ownership, hire purchase costs less here." }),
        P.manual({
          label: "(e)", marks: 6, levels: LV(6),
          stem: "Using your answers and the information, discuss which offer Thandeka should choose.",
          points: [
            "Hire purchase: owns the machine at the lowest cost of the ownership options; no extra collateral; but deposit of US\\$1,800 needed now.",
            "Bank loan: most expensive (US\\$11,160) and needs collateral, which a sole trader may lack (unlimited liability risk).",
            "Leasing: lowest payments (US\\$6,240) and maintenance may be included, but no machine at the end; better if technology changes fast.",
            "Considers cash flow: monthly payments compared (HP US\\$380, lease US\\$260).",
            "Considers how long she needs the machine / its useful life.",
            "Justified conclusion.",
          ],
          modelAnswer: "Hire purchase leaves her owning the machine for US\\$10,920, less than the US\\$11,160 repaid on the loan, and the machine itself secures the deal, whereas the bank wants collateral that a sole trader may have to provide from personal assets. However, she needs a deposit of US\\$1,800 now and monthly payments of US\\$380. Leasing costs only US\\$6,240 over two years with lower monthly payments of US\\$260, but she would have no machine at the end and would need to keep paying. If the machine will be useful for many years, hire purchase is the best choice; if printing technology changes quickly or cash is very tight, leasing is better.",
        }),
      ];
    })(),
    explanation: "(a) US\\$11,160. (b) US\\$10,920. (c) US\\$6,240. (d) Hire purchase. (e) Weigh total cost, ownership, collateral and cash flow.",
    hints: ["Simple interest = principal × rate × years ÷ 100.", "Total HP cost = deposit + instalments."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional public limited company that makes cooking oil plans to build a new US\\$5 million refinery. It is choosing between issuing new ordinary shares and issuing debentures at 10% interest a year.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Distinguish between a shareholder and a debenture holder.", points: ["A shareholder is a part-owner, receives dividends (and a vote with ordinary shares).", "A debenture holder is a lender (creditor) who receives fixed interest and has no vote."], modelAnswer: "A shareholder owns part of the company and receives a dividend from profit, with a vote if the shares are ordinary shares; a debenture holder has lent money to the company, receives fixed interest and has no vote." }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the company should issue shares or debentures to finance the refinery.",
        points: [
          "Shares: never repaid; no fixed interest; dividends can be cut if profits fall.",
          "Shares: but dilute control and share future profits; issue costs; risk of takeover.",
          "Debentures: control kept; fixed cost (US\\$500,000 a year) makes planning easier; profits above interest go to existing shareholders.",
          "Debentures: interest must be paid even in bad years; must be repaid; adds to risk if already heavily in debt.",
          "Depends on expected profits and their stability, existing debt, and owners' wish for control.",
          "Justified conclusion.",
        ],
        modelAnswer: "Issuing shares means the US\\$5 million never has to be repaid and there is no fixed interest, so if the refinery's profits are disappointing dividends can be reduced. However, new shareholders would share future profits and votes, and a large issue costs money and could expose the company to a takeover. Debentures keep control with the existing shareholders, and if the refinery is profitable they keep all profit above the US\\$500,000 annual interest. But the interest must be paid every year even if profits fall, and the debentures must be repaid, which adds to risk. If the company already has little debt and expects steady demand for cooking oil, debentures are the better choice; if profits are uncertain or it is already heavily borrowed, shares are safer.",
      }),
    ],
    explanation: "(a) Owner versus lender. (b) No repayment and flexible dividends against loss of control; fixed interest and repayment against keeping control.",
    hints: ["Annual interest = 10% of US\\$5 million."],
  });

  b.card("DEFINITION", "Internal finance", "Money from within the business: retained profits, owner's savings, sale of unwanted assets.");
  b.card("DEFINITION", "Ordinary shares", "Units of ownership in a company with a vote and a dividend that depends on profit; never repaid.");
  b.card("DEFINITION", "Preference shares", "Shares with a fixed dividend paid before ordinary dividends; usually no vote.");
  b.card("DEFINITION", "Debenture", "A long-term loan to a company at fixed interest; holders are creditors with no vote.");
  b.card("DEFINITION", "Overdraft", "Short-term borrowing on a current account up to an agreed limit; interest only on the amount overdrawn.");
  b.card("CONCEPT", "Hire purchase versus leasing", "HP: deposit and instalments, owns the asset after the last payment. Leasing: renting, never owns it.");
  b.card("CONCEPT", "Factors in choosing finance", "Purpose and time period, amount, cost, control, risk, collateral and the legal form of the business.");
  b.card("FACT", "Why might owners prefer a loan to issuing ordinary shares?", "Lenders get interest but no vote, so the owners keep control.");
  b.card("DEFINITION", "Trade credit", "Suppliers deliver goods now and allow payment later, e.g. after 30 days.");
});
