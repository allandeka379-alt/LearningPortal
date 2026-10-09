// W2a: econ.money.banking — commercial banks, merchant banks, building societies, the central bank (RBZ).
import { concept, P, table, money, pct, check, ZIM } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.money.banking", { file: "money/banking", keyPrefix: "money.banking" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a function of a **central bank** but not of a commercial bank?",
    options: [
      ["Acting as lender of last resort to the banking system", "Correct: only the central bank does this."],
      ["Accepting savings deposits from households and firms", "Commercial banks accept deposits from the public."],
      ["Making loans to small businesses", "Lending to firms is a commercial bank function."],
      ["Providing debit cards to customers", "Payment cards are provided by commercial banks."],
    ],
    answer: "A",
    explanation: "The central bank lends to banks in difficulty; commercial banks serve households and firms.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the main source of a commercial bank's profit?",
    options: [
      ["Charging more interest on loans than it pays on deposits", "Correct: the interest margin."],
      ["Printing new banknotes for its customers", "Only the central bank issues currency."],
      ["Setting the country's official rate of interest each month", "The central bank sets the policy rate."],
      ["Collecting taxes on behalf of the government", "Tax collection is not a bank's main business."],
    ],
    answer: "A",
    explanation: "Banks pay a lower rate to depositors than they charge borrowers; the difference covers costs and provides profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The government's accounts are held, and its payments made, by the central bank. This is the central bank's role as",
    options: [
      ["banker to the government.", "Correct: it manages the government's accounts and borrowing."],
      ["lender of last resort.", "This refers to lending to commercial banks in difficulty."],
      ["issuer of the currency.", "This refers to notes and coins."],
      ["supervisor of commercial banks.", "This refers to licensing and inspecting banks."],
    ],
    answer: "A",
    explanation: "As banker to the government, the central bank holds its accounts, handles its receipts and payments and manages its debt.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do commercial banks keep part of their deposits as cash and liquid reserves?",
    options: [
      ["To be able to pay customers who withdraw money", "Correct: liquidity protects against a run on the bank."],
      ["Because cash earns more interest than loans", "Cash earns no interest; loans are more profitable."],
      ["Because the law forbids banks to make any loans", "Banks are allowed, and expected, to lend."],
      ["To increase the amount of credit they can create", "Holding more reserves reduces credit creation."],
    ],
    answer: "A",
    explanation: "A bank must meet withdrawals; holding reserves sacrifices some profit for liquidity.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which financial institution mainly lends to people buying or building houses?",
    options: [
      ["A building society", "Correct: it takes savings and lends mortgages."],
      ["A merchant bank", "Merchant banks mainly serve firms."],
      ["The central bank", "The central bank does not lend to the public."],
      ["A stock exchange", "A stock exchange is a market for shares."],
    ],
    answer: "A",
    explanation: "Building societies specialise in savings accounts and mortgages.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "A firm wants to issue new shares and needs advice and a guarantee that all the shares will be sold. Which institution is most likely to help?",
    options: [
      ["A merchant bank", "Correct: merchant banks advise on and underwrite share issues."],
      ["A building society", "Building societies deal mainly in savings and mortgages."],
      ["The central bank", "The central bank does not underwrite firms' share issues."],
      ["A microfinance institution", "Microfinance lends small sums to small borrowers."],
    ],
    answer: "A",
    hints: ["Which bank specialises in services to firms?"],
    explanation: "Merchant banks underwrite share issues (agreeing to buy unsold shares) and advise firms on finance.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Rumours cause many depositors to withdraw money from a sound bank at once. How does the central bank's role as lender of last resort help?",
    options: [
      ["It lends the bank cash so it can pay everyone, which calms the panic", "Correct: the bank can meet withdrawals and confidence returns."],
      ["It prints extra notes and gives them to the depositors directly", "The central bank lends to banks, not to depositors."],
      ["It closes the bank so that no more money can be withdrawn", "Closing a sound bank would spread panic."],
      ["It raises the reserve ratio so the bank can lend more money", "A higher reserve ratio reduces lending."],
    ],
    answer: "A",
    hints: ["Why can't even a sound bank repay all deposits at once?"],
    explanation: "Most deposits have been lent out, so the bank lacks cash. A loan from the central bank lets it pay depositors, which ends the panic and stops it spreading.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Banks keep 25% of new deposits as reserves and lend the rest. A customer deposits US\\$3,600 of new cash. What is the maximum total of bank deposits that can result?",
    options: [
      ["US\\$14,400", "Correct: 3,600 ÷ 0.25 = 14,400."],
      ["US\\$900", "This is the reserve kept from the first deposit."],
      ["US\\$2,700", "This is the first loan only."],
      ["US\\$10,800", "This is the maximum of new loans, not total deposits."],
    ],
    answer: "A",
    hints: ["Maximum deposits = initial deposit ÷ reserve ratio."],
    explanation: "Maximum deposits = 3,600 ÷ 0.25 = **US\\$14,400** (a credit multiplier of 4). New loans at most = 14,400 − 3,600 = US\\$10,800.",
  });
  check("cm", 3600 / 0.25, 14400);
  const loan = 6500, rate = 0.145;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: loan * rate, daily: true,
    stem: `A small business borrows US\\$${loan.toLocaleString("en-GB")} from a bank for one year at 14.5% simple interest. Calculate the interest it must pay.`,
    wrong: [loan * (1 + rate), loan * 0.145 * 2],
    explanation: `Interest = ${loan.toLocaleString("en-GB")} × 0.145 = **${money(loan * rate)}**. ${money(loan * (1 + rate))} is the total repayment (loan plus interest), not the interest.`,
  });
  const dep = 3150000, dr = 0.035, ln = 2600000, lr = 0.12;
  const margin = ln * lr - dep * dr;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: margin, calculator: true,
    stem: `A fictional bank holds deposits of US\\$${dep.toLocaleString("en-GB")}, paying 3.5% interest a year. It lends US\\$${ln.toLocaleString("en-GB")} at 12% a year. Calculate its net interest income for the year.`,
    wrong: [ln * lr, (lr - dr) * dep],
    hints: ["Interest received on loans − interest paid on deposits."],
    explanation: `1. Interest received = ${ln.toLocaleString("en-GB")} × 0.12 = ${money(ln * lr)}.\n2. Interest paid = ${dep.toLocaleString("en-GB")} × 0.035 = ${money(dep * dr)}.\n3. Net interest income = **${money(margin)}**.\n4. Multiplying the rate difference (8.5%) by deposits ignores that only US\\$${ln.toLocaleString("en-GB")} is lent.`,
  });
  check("margin", margin, 312000 - 110250);
  const rr = 0.125, init = 8000;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: init / rr - init,
    stem: `Banks keep 12.5% of every new deposit as reserves. New cash deposits of US\\$${init.toLocaleString("en-GB")} are made. What is the maximum amount of **new loans** the banking system can create?`,
    wrong: [init / rr, init * (1 - rr)],
    hints: ["Maximum deposits = initial deposit ÷ reserve ratio.", "New loans = maximum deposits − initial deposit."],
    explanation: `Maximum deposits = ${init.toLocaleString("en-GB")} ÷ 0.125 = ${money(init / rr)}. New loans = ${money(init / rr)} − ${money(init)} = **${money(init / rr - init)}**. ${money(init * (1 - rr))} is only the first bank's loan.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In Zimbabwe, the Reserve Bank of Zimbabwe is the central bank.",
    answer: true,
    explanation: "True. The RBZ issues the currency, supervises banks and conducts monetary policy.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A higher reserve ratio allows commercial banks to create more credit.",
    answer: false,
    explanation: "False. If banks must keep more of each deposit as reserves, they can lend less, so the credit multiplier (1 ÷ reserve ratio) is smaller.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each institution with a typical activity.",
    pairs: [
      ["Commercial bank", "Provides current accounts and overdrafts to the public"],
      ["Central bank", "Issues the national currency and sets the policy interest rate"],
      ["Merchant bank", "Underwrites share issues for large firms"],
      ["Building society", "Lends mortgages to home buyers"],
    ],
    explanation: "Commercial banks serve the public; the central bank manages money and banks; merchant banks serve firms; building societies finance housing.",
    applies: ZIM,
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "A commercial bank faces a conflict between {{blank:a}}, which needs cash to meet withdrawals, and {{blank:b}}, which comes from making loans. The central bank lends to banks short of cash as the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["liquidity"], choices: ["liquidity", "profitability", "lender of last resort"] },
      { id: "b", accepted: ["profitability"], choices: ["liquidity", "profitability", "lender of last resort"] },
      { id: "c", accepted: ["lender of last resort"], choices: ["liquidity", "profitability", "lender of last resort"] },
    ],
    wrong: [["profitability", "liquidity", "liquidity"]],
    explanation: "Liquidity (cash for withdrawals) versus profitability (interest on loans); lender of last resort is a central-bank role.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** ways in which commercial banks are important to an economy.",
    points: [
      "Identifies channelling savings into loans / investment.",
      "Explains: firms borrow to buy machinery and expand, raising output, jobs and growth.",
      "Identifies providing a safe, quick payment system.",
      "Explains: transfers, cards and links to mobile money make trade easier and reduce the risks of carrying cash.",
    ],
    modelAnswer: "Banks collect the savings of households and lend them to firms, which use the loans to buy machinery and expand, raising output, jobs and growth. They also run the payment system: transfers, cards and links to mobile money let people pay quickly and safely without carrying large amounts of cash, which makes trade easier.",
    hints: ["Think about savings and investment, and about payments."],
    explanation: "Each way: identify (1) and explain its effect on the economy (1).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of the Reserve Bank of Zimbabwe.",
    points: [
      "Identifies a function (for example issuing the currency).",
      "Explains it (sole issuer of notes and coins, controlling their supply and maintaining confidence).",
      "Identifies a second function (for example lender of last resort / monetary policy / supervision / foreign reserves / banker to government or banks).",
      "Explains it (for example sets the policy interest rate to control inflation; licenses and inspects banks to protect depositors).",
    ],
    modelAnswer: "The RBZ issues the national currency: only it may put notes and coins into circulation, which lets it control their supply and protect confidence in the currency. It also supervises banks: it licenses them, sets rules on how much they must hold in reserves and capital, and inspects them, which protects depositors from bank failures.",
    hints: ["Name the function, then say what it involves and why it matters."],
    explanation: "One mark for each function, one for each explanation.",
  });

  // Structured 1: a bank's balance of liquidity and profitability.
  const assets = [["Cash and balance at the central bank", 410], ["Short-term government bills", 520], ["Loans to households and firms", 3070]];
  const tot = assets.reduce((s, a) => s + a[1], 0);
  check("tot", tot, 4000);
  const T = table(["Asset", "Value (US\\$ million)"], [...assets, ["**Total**", `**${tot.toLocaleString("en-GB")}**`]]);
  const cashShare = (410 / tot) * 100, loanShare = (3070 / tot) * 100;
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
    stem: `The table shows the assets of a fictional commercial bank. Its customers' deposits total US\\$3,600 million.\n\n${T}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: loanShare, stem: "Calculate loans as a percentage of total assets. Give your answer to one decimal place.", wrong: [(3070 / 3600) * 100], explanation: `3,070 ÷ ${tot.toLocaleString("en-GB")} × 100 = ${pct(loanShare, 1)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: (410 / 3600) * 100, stem: "Calculate cash and balances at the central bank as a percentage of deposits. Give your answer to one decimal place.", wrong: [cashShare], explanation: `410 ÷ 3,600 × 100 = ${pct((410 / 3600) * 100, 1)} of deposits are held as cash.` }),
      P.mcq({
        label: "(c)", marks: 2,
        stem: "Which asset is the most profitable but the least liquid?",
        options: [
          ["Loans to households and firms", "Correct: they earn the highest interest but cannot be turned into cash quickly."],
          ["Cash and balance at the central bank", "Cash is the most liquid and earns little or nothing."],
          ["Short-term government bills", "Bills earn some interest and can be sold quickly."],
          ["Customers' deposits", "Deposits are what the bank owes, not one of its assets."],
        ],
        answer: "A",
        explanation: "Loans earn the most but are tied up until repaid.",
      }),
      P.manual({
        label: "(d)", marks: 6, levels: LV(6),
        stem: "The bank's managers want to raise profits by turning most of the government bills into new loans. Discuss whether they should do so.",
        points: [
          "For: loans earn higher interest than bills, so profit rises.",
          "For: more loans support firms and households (investment, growth) and credit creation.",
          "Against: liquidity falls: bills can be sold quickly for cash, loans cannot; risk of being unable to meet withdrawals.",
          "Against: more loans may mean riskier borrowers and more bad debts; the central bank may require minimum liquid reserves.",
          "Considers the size of cash reserves (about 11% of deposits) and the chance of large withdrawals.",
          "Justified conclusion.",
        ],
        modelAnswer: "Loans earn more interest than government bills, so moving funds into loans would raise profits, and extra lending helps firms invest. However, bills are a safe store of liquidity that can be sold quickly if many depositors withdraw at once; cash covers only about 11% of deposits, so without the bills the bank could run short. New loans may also go to riskier borrowers, raising bad debts, and the central bank may require the bank to hold liquid assets. The managers should move only part of the bills into carefully chosen loans, keeping enough liquidity to survive a run of withdrawals.",
        explanation: "Weigh profitability against liquidity and risk; conclude with a balanced proportion.",
      }),
    ],
    hints: ["Percentage = part ÷ whole × 100: check which total is asked for.", "Liquidity means how quickly an asset can become cash without loss."],
    explanation: `Loans are ${pct(loanShare, 1)} of assets; cash is ${pct((410 / 3600) * 100, 1)} of deposits. The bank trades off profitability (loans) against liquidity (cash, bills).`,
  });

  // Structured 2: central bank evaluation.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "In a fictional country, prices have been rising quickly. The central bank is considering raising its policy interest rate, and it has also warned that some commercial banks have made too many risky loans.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify **two** functions of a central bank shown in this information.",
        points: ["Monetary policy (setting the policy interest rate to control inflation).", "Supervision / regulation of commercial banks."],
        modelAnswer: "Carrying out monetary policy by setting the policy interest rate, and supervising commercial banks.",
        explanation: "Interest rates → monetary policy; warnings about risky loans → supervision.",
      }),
      P.manual({
        label: "(b)", marks: 6, levels: LV(6),
        stem: "Discuss whether the central bank should rescue a commercial bank that fails because of risky loans.",
        points: [
          "For: protects depositors' savings and prevents panic spreading to other banks (lender of last resort).",
          "For: keeps the payment system and lending to firms working; avoids a fall in spending and jobs.",
          "Against: moral hazard: banks may take more risks if they expect to be rescued.",
          "Against: cost to the central bank / taxpayers; rewards poor management.",
          "Alternative: protect depositors (deposit insurance) but let shareholders and managers lose; stronger supervision.",
          "Justified conclusion.",
        ],
        modelAnswer: "A rescue would protect ordinary depositors and stop panic spreading to sound banks, keeping payments and lending working so that firms and jobs are not harmed. However, if banks know they will be saved, they may keep making risky loans, and the cost falls on the central bank and ultimately taxpayers, rewarding bad management. A better approach is to protect depositors but let the bank's owners and managers bear the losses, and to strengthen supervision so risky lending is stopped earlier. The central bank should act as lender of last resort to prevent a wider crisis, but on terms that punish the failed bank's owners.",
        explanation: "Financial stability versus moral hazard and cost; conclude with conditions.",
      }),
    ],
    hints: ["Which roles of a central bank are mentioned?", "Who gains and who pays if the bank is rescued?"],
    explanation: "The central bank conducts monetary policy and supervises banks; rescues protect stability but create moral hazard.",
  });

  b.card("DEFINITION", "Define a **commercial bank**.", "A profit-seeking bank that accepts deposits, makes loans and provides payment services to households and firms.");
  b.card("CONCEPT", "Three main functions of commercial banks?", "Accept deposits; make loans and overdrafts; provide payment services (transfers, cards, cheques). Also foreign exchange, safe custody, advice.");
  b.card("DEFINITION", "Define a **central bank**.", "The bank that issues the currency, is banker to the government and to banks, acts as lender of last resort, runs monetary policy and supervises banks (Zimbabwe: the RBZ).");
  b.card("DEFINITION", "What is a **lender of last resort**?", "The central bank lending to banks short of cash when no one else will, to stop a bank failing and a panic spreading.");
  b.card("FORMULA", "Maximum deposits from credit creation?", "Initial deposit ÷ reserve ratio (as a decimal). Credit multiplier = 1 ÷ reserve ratio.");
  b.card("CONCEPT", "What is the liquidity-profitability conflict?", "Loans are profitable but illiquid; cash is liquid but earns nothing. Banks must hold enough cash to meet withdrawals.");
  b.card("DEFINITION", "What do merchant banks do?", "Serve firms: arrange finance, underwrite share issues, advise on mergers, accept bills of exchange.", undefined, { applies: ZIM });
  b.card("DEFINITION", "What do building societies do?", "Take savings from the public and lend mainly for house purchase (mortgages).", undefined, { applies: ZIM });
  b.card("CONCEPT", "Why can't a sound bank repay all deposits at once?", "Most deposits have been lent out; only a fraction is held as cash reserves.");
});
