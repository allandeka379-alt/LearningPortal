// W1a: sources of finance for a business (ZIMSEC only).
import { concept, P, chk, fmt, table } from "../lib.mjs";

const LV8 = [
  [3, 6, 8, "Two-sided, applied and developed, with a justified conclusion."],
  [2, 3, 5, "Some development of one or both sides, limited application or conclusion."],
  [1, 1, 2, "Simple, undeveloped points."],
];

concept("aecon.enterprise.sources-capital", { file: "enterprise/sources-capital", keyPrefix: "enterprise.sources-capital" }, (b) => {
  const mc = (o, correct, wrongs) => b.mcq({ ...o, options: [correct, ...wrongs], answer: "A" });

  mc({ d: 1, skill: "RECALL", stem: "Which of the following is an **internal** source of finance?",
    explanation: "Internal finance comes from within the business or its owners; retained profit is profit kept in the business." },
    ["Retained profit", "Correct."],
    [["A bank loan", "External: from outside the business."],
     ["Hire purchase", "External: from a finance provider."],
     ["A grant from an agency", "External."]]);

  mc({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Which source of finance allows a business to receive goods now and pay the supplier after an agreed period?",
    explanation: "Trade credit lets a business take delivery and pay later, usually within 30 days or so." },
    ["Trade credit", "Correct."],
    [["Share capital", "Shares are bought by investors for ownership."],
     ["Retained profit", "That is money earned and kept."],
     ["A grant", "A grant is money given, not goods supplied on credit."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "What is the main difference between leasing and hire purchase?",
    explanation: "With hire purchase ownership passes to the business after the last instalment; with leasing the business never becomes the owner." },
    ["With hire purchase the business eventually owns the asset; with leasing it does not", "Correct."],
    [["With leasing the business owns the asset from the start and may sell it later", "Ownership stays with the lessor."],
     ["Hire purchase has no interest, leasing does", "Hire purchase includes finance charges."],
     ["Leasing is a source of long-term capital only", "Both can be used for different lengths of time."]]);

  mc({ d: 2, skill: "UNDERSTANDING", stem: "A business raises finance by selling shares. Which statement is correct?",
    explanation: "Shareholders become part-owners and share in profit through dividends; the money is not repaid with interest." },
    ["Investors become part-owners and may share in the profits", "Correct."],
    [["The business must repay the money with interest by a fixed date", "That describes a loan."],
     ["The owners keep full control of the business", "Control is shared with shareholders."],
     ["The money is a grant that need not be repaid or rewarded", "Investors expect a return."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Match the term of the finance to the need."],
    stem: "A fictional street trader needs US\\$150 to buy stock for the coming week and will repay from sales. Which source is the most suitable?",
    explanation: "A short-term need is best met by short-term finance such as trade credit or personal savings; a long loan or share issue would be expensive and unsuitable." },
    ["Trade credit from her supplier", "Correct: short term and usually no interest."],
    [["A 10-year bank loan", "A long loan is a poor match for a one-week need."],
     ["A public issue of shares", "Far too costly and complex for a small amount."],
     ["Hire purchase of a delivery van", "She needs stock, not an asset."]]);

  mc({ d: 3, skill: "APPLICATION", hints: ["Think of what a lender can claim."],
    stem: "A bank asks a farmer for \"collateral\" before it lends. This means the farmer must",
    explanation: "Collateral is an asset the lender can claim if the loan is not repaid." },
    ["offer an asset that the bank can claim if the loan is not repaid", "Correct."],
    [["repay part of the loan to the bank before the bank agrees to hand over the money", "That would make borrowing pointless."],
     ["buy shares in the bank", "Not a requirement."],
     ["pay the interest for the first year in advance", "That is a possible fee but not collateral."]]);

  mc({ d: 3, skill: "ANALYSIS", hints: ["Compare the claims on future profit."],
    stem: "A fictional company needs finance for a new factory. Why might it prefer to issue shares rather than take a large bank loan?",
    explanation: "Shares need no repayment or fixed interest, so there is less risk if profits are low; the cost is shared ownership and control." },
    ["It need not repay the money or pay fixed interest if profits are low", "Correct."],
    [["The existing owners keep full control of the company after the shares are sold", "Control is shared with the new shareholders."],
     ["Shareholders always accept a lower return than banks", "Not necessarily."],
     ["Share capital is cheaper in every circumstance", "It can be more expensive if profits are high."]]);

  mc({ d: 3, skill: "EVALUATION", hints: ["Think of cost and risk."],
    stem: "Which is the main disadvantage of borrowing from a microfinance institution for a small trader?",
    explanation: "Microfinance lenders face high costs and risks, so interest rates are often high and loans are small, though they need little collateral." },
    ["Interest rates are often high and the loan amounts small", "Correct."],
    [["Loans must be repaid only if the business makes a profit", "Loans must be repaid regardless."],
     ["The lender takes part ownership of the business", "That is not how loans work."],
     ["Large amounts of collateral are always needed", "Microfinance usually needs less collateral than banks."]]);

  {
    const P0 = 10000, r = 0.12, yrs = 3, interest = P0 * r * yrs;
    chk(interest, 3600);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: interest, daily: true,
      stem: "A trader borrows US\\$10,000 for 3 years at 12% a year simple interest. Calculate the total interest paid over the 3 years, in US\\$.",
      wrong: [1200, 13600],
      explanation: `Interest each year = 10,000 × 0.12 = US\\$1,200. Over 3 years = 3 × 1,200 = **US\\$${fmt(interest)}**. US\\$1,200 is one year's interest and US\\$13,600 is the total repayment.` });
  }
  {
    const dep = 360, inst = 130, n = 12, total = dep + inst * n, cash = 1800, extra = total - cash, pct = (extra / cash) * 100;
    chk(total, 1920); chk(pct, (120 / 1800) * 100);
    b.calc({ d: 3, skill: "APPLICATION", kind: "pct", value: pct, dp: 1, unit: "%", hints: ["Total hire purchase price = deposit + instalments."],
      stem: "A garage can buy a tyre-fitting machine for a cash price of US\\$1,800 or on hire purchase for a deposit of US\\$360 and 12 monthly instalments of US\\$130. By what percentage does the hire purchase price exceed the cash price? Give your answer to one decimal place.",
      wrong: [(120 / 1920) * 100, 120],
      explanation: `1. Instalments = 12 × 130 = US\\$1,560.\n2. Hire purchase total = 360 + 1,560 = US\\$${fmt(total)}.\n3. Extra over cash = ${total} − ${cash} = US\\$${extra}.\n4. As a percentage of the cash price: ${extra} ÷ ${cash} × 100 = **${fmt(pct, 1)}%**.\n\nDividing by the hire purchase price gives 6.3%, and US\\$120 is the extra in dollars.` });
  }
  {
    const shares = 40000, dps = 0.05, div = shares * dps;
    chk(div, 2000);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: div,
      stem: "A fictional company has issued 40,000 shares. It pays a dividend of US\\$0.05 per share. Calculate the total dividend paid, in US\\$.",
      wrong: [200, 40000],
      explanation: "40,000 × 0.05 = US\\$2,000. Moving the decimal point wrongly gives 200." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Retained profit is an external source of finance.", answer: false,
    explanation: "False. It comes from within the business, so it is internal." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A grant normally does not have to be repaid, but it may have conditions attached.", answer: true,
    explanation: "True. Grants are given for specified purposes and may require reports or the use of funds as agreed." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each source of finance to its description.",
    pairs: [["Retained profit", "Profit kept in the business instead of being paid out"], ["Share capital", "Money from investors who become part-owners"], ["Leasing", "Renting equipment for regular payments without owning it"], ["Overdraft", "Allowing the bank account to go below zero up to a limit"]],
    explanation: "Each source has a distinct form." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "An asset that a lender can claim if a loan is not repaid is called {{blank:a}}. Finance repaid within about a year is {{blank:b}}-term finance.",
    blanks: [{ id: "a", accepted: ["collateral"], choices: ["collateral", "a dividend", "a grant"] }, { id: "b", accepted: ["short"], choices: ["short", "long"] }],
    wrong: [["a grant", "long"]],
    explanation: "Collateral is security; short-term finance is repaid within about a year." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the source of finance in which a business pays a deposit and then regular instalments, with ownership passing at the end.",
    accepted: ["hire purchase", "hp"], wrong: ["leasing"],
    explanation: "Hire purchase." });

  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 3, stem: "Explain **one** advantage and **one** disadvantage of using retained profit to finance expansion.",
    points: ["Advantage stated (no interest to pay or no outside control).", "Disadvantage stated (profit not available to owners, or limited amount).", "At least one point explained in context."],
    modelAnswer: "Retained profit costs no interest and gives outsiders no control. However, there is a limited amount of it, and owners receive less of the profit in the short run.",
    explanation: "One advantage, one disadvantage, one developed." });

  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Compare cost, risk and control."],
    stem: "Analyse **two** reasons why a small trader may find it hard to obtain a bank loan.",
    points: ["Reason 1: lacks collateral.", "Explained: the bank cannot recover its money if the trader fails to repay.", "Reason 2: no record of profit or a business plan.", "Explained: the bank cannot judge the risk of non-payment, so it refuses or charges more."],
    modelAnswer: "A small trader may lack collateral, so the bank has nothing to claim if the loan is not repaid and sees the loan as too risky. She may also have no business plan or record of sales, so the bank cannot judge whether she will repay and may refuse or charge a higher rate.",
    explanation: "Banks lend when risk is acceptable." });

  b.manualShort({ d: 3, skill: "APPLICATION", marks: 3, hints: ["Order the steps."],
    stem: "Describe **three** steps a business should take when applying for a bank loan.",
    points: ["Prepare a business plan showing costs, sales and the amount needed.", "Provide collateral and documents (registration, identification, financial records).", "Apply and negotiate the terms (interest, repayment period) before signing."],
    modelAnswer: "The business should prepare a business plan showing costs, expected sales and the amount needed. It should provide collateral and documents such as registration and financial records. Finally it should apply and agree the interest rate and repayment period before signing.",
    explanation: "Plan, security and documents, application and agreement." });

  // Structured 1: choose finance for a bakery.
  {
    const tab = table(["Source", "Amount available (US\\$)", "Cost of finance", "Repayment"], [["Bank loan", 8000, "14% a year simple interest", "Over 2 years"], ["Sale of shares to a relative", 8000, "A 25% share of future profit", "No repayment"], ["Hire purchase of the equipment", 8000, "US\\$1,200 extra in total", "12 months"]], { align: ["l", "r", "l", "l"] });
    const interest = 8000 * 0.14 * 2, totalLoan = 8000 + interest;
    chk(interest, 2240); chk(totalLoan, 10240);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Interest = amount × rate × years."],
      stem: `Nyasha plans to start a bakery in Gweru and needs US\\$8,000 for equipment. The table shows three sources of finance (illustrative data).\n\n${tab}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: interest, stem: "Calculate the total interest on the bank loan over 2 years, in US\\$.", wrong: [1120, 10240], explanation: "8,000 × 0.14 × 2 = US\\$2,240." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: totalLoan, stem: "Calculate the total amount repaid on the bank loan, in US\\$.", wrong: [2240, 8000], explanation: "8,000 + 2,240 = US\\$10,240." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** advantage and **one** disadvantage of raising the finance by selling a 25% share to a relative.",
          points: ["Advantage: no repayment or fixed interest if the bakery makes little profit.", "Disadvantage: the relative receives 25% of future profit and may want a say in decisions.", "Explained in context (profit grows, so the cost of this finance may be larger than interest)."],
          modelAnswer: "There is no repayment or fixed interest, so Nyasha is not forced to pay if profits are low in the first months. However, the relative will take 25% of all future profits and may want a say, which could cost more than the interest if the bakery is successful." }),
        P.manual({ label: "(d)", marks: 4, stem: "Recommend which source Nyasha should use, giving reasons.",
          points: ["Considers cost (the bank loan costs US\\$2,240 in interest; hire purchase US\\$1,200).", "Considers risk and control.", "Considers the term and the need (equipment suited to hire purchase).", "A reasoned recommendation."],
          modelAnswer: "Hire purchase is the cheapest at US\\$1,200 extra, the equipment is the very asset she needs, and she keeps full control. The bank loan costs US\\$2,240 in interest and requires collateral, and selling a share gives away 25% of profits. She should choose hire purchase, provided she can meet the monthly instalments from early sales." }),
      ],
      explanation: "Loan interest US\\$2,240; total repayment US\\$10,240; compare cost, risk, control and term." });
  }

  // Structured 2: working capital.
  {
    const cost = 400, credit = 30, sales = 520;
    b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Profit = sales − costs."],
      stem: "A fictional hardware shop in Masvingo buys US\\$400 of cement each month on 30 days' trade credit from its supplier. It sells the cement for US\\$520. The owner is thinking of asking the supplier to extend credit to 60 days.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: sales - cost, stem: "Calculate the monthly profit from the cement, in US\\$ (ignore other costs).", wrong: [520, 400], explanation: "520 − 400 = US\\$120." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Trade credit is best described as",
          options: [["short-term external finance", "Correct: supplied by the supplier and repaid within weeks."], ["long-term internal finance", "It comes from outside and is short."], ["share capital", "No ownership is given."], ["a grant", "It must be paid."]],
          answer: "A", explanation: "It is external and short-term." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how trade credit helps the shop's working capital.",
          points: ["The shop receives stock without paying at once.", "It can sell the stock and collect cash before paying the supplier.", "So it needs less of its own money tied up in stock."],
          modelAnswer: "The shop receives the cement without paying at once. It can sell it and receive cash before the supplier is paid, so less of its own money is tied up in stock and working capital is easier to manage." }),
        P.manual({ label: "(d)", marks: 4, stem: "Discuss whether the shop should rely mainly on trade credit to finance its business.",
          points: ["Trade credit is cheap or free over the credit period.", "It is short-term and the supplier may cut off supply if payment is late.", "Cannot finance long-term assets like a new building.", "A conclusion: use it for stock but not for the whole business."],
          modelAnswer: "Trade credit is cheap and useful for stock, but it is short-term, and late payment may lead the supplier to stop supplying. It cannot pay for long-term assets like a building. The shop should use it for stock but combine it with long-term finance for other needs." }),
      ],
      explanation: "Profit US\\$120; trade credit is short-term external finance that eases working capital." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare cost, risk, control and term."],
    stem: "Evaluate whether a small business starting in Zimbabwe should finance itself mainly with a bank loan or with personal savings and retained profit.",
    points: ["A bank loan gives access to larger sums to start or expand quickly.", "The owner keeps full control (no shares sold).", "Interest must be paid and collateral may be lost if the business fails.", "Personal savings and retained profit have no interest and no repayment.", "But the amount is limited, so the business may grow slowly.", "Savings put the owner's own money at risk.", "Small firms may find it hard to obtain loans from banks.", "A justified conclusion linked to the size of the business and its risk."],
    levels: LV8,
    modelAnswer: "A bank loan makes large amounts available at once, so the business can buy equipment and expand quickly, and the owner keeps control. But interest must be paid whatever the profit, and the owner may lose collateral if the business fails; small firms may also find it hard to qualify. Personal savings and retained profit cost no interest and do not need to be repaid, but they limit how fast the firm can grow and put the owner's own money at risk. A sensible small firm would start with savings and retained profit to keep risk low and borrow when it has a record of sales and a good plan. For a business with an urgent opportunity, a loan may be justified despite the cost.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh speed and size of finance against cost and risk." });

  b.card("DEFINITION", "Define **working capital**.", "Finance needed to pay day-to-day costs, such as materials and wages, while waiting for customers to pay.");
  b.card("CONCEPT", "Give **three** internal sources of finance.", "Personal savings of the owner, retained profit and the sale of assets.");
  b.card("CONCEPT", "Give **three** external sources of finance.", "Bank loans, share capital, trade credit, hire purchase, leasing and grants.");
  b.card("DEFINITION", "What is **collateral**?", "An asset offered as security that the lender can claim if the loan is not repaid.");
  b.card("CONCEPT", "Leasing compared with hire purchase", "Leasing: rent equipment and never own it. Hire purchase: pay a deposit and instalments and own it at the end.");
  b.card("FORMULA", "Simple interest", "Interest = amount borrowed × rate × number of years.");
  b.card("CONCEPT", "What four factors help to choose a source of finance?", "Cost, risk, control and term (match the term of finance to the need).");
  b.card("CONCEPT", "What is **trade credit**?", "Short-term finance: a supplier delivers goods now and is paid after an agreed period.");
});
