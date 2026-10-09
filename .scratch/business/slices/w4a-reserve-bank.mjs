// W4a: the Reserve Bank of Zimbabwe and central banking (COM Form 3).
import { concept, P } from "../lib.mjs";

concept("bus.finance.reserve-bank", { file: "finance/reserve-bank", keyPrefix: "finance.reserve-bank" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which institution issues Zimbabwe's notes and coins?",
    options: [
      ["The Reserve Bank of Zimbabwe", "Correct: the central bank is the sole issuer of currency."],
      ["Any licensed commercial bank", "Commercial banks cannot issue currency."],
      ["The Zimbabwe Revenue Authority", "ZIMRA collects taxes."],
      ["The Zimbabwe Stock Exchange", "The ZSE is a market for shares."],
    ],
    answer: "A",
    explanation: "Issuing currency is a central bank function.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who are the main customers of the central bank?",
    options: [
      ["The government and the commercial banks", "Correct: it is banker to both."],
      ["Small traders and households", "They bank with commercial banks."],
      ["Foreign tourists visiting the country", "Tourists use commercial banks and bureaux."],
      ["Listed companies issuing shares", "Companies use merchant banks and brokers."],
    ],
    answer: "A",
    explanation: "The central bank keeps accounts for the government and for the banks.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A commercial bank faces sudden heavy withdrawals and cannot borrow from other banks. The central bank lends to it. Which function is this?",
    options: [
      ["Lender of last resort", "Correct: it lends when no one else will."],
      ["Banker to the government", "This involves the government's accounts."],
      ["Issuing notes and coins", "No new currency issue is described."],
      ["Managing foreign reserves", "No foreign currency is involved."],
    ],
    answer: "A",
    explanation: "Lending to banks short of cash protects depositors and the banking system.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main aim of a central bank?",
    options: [
      ["Stable prices and a sound banking system", "Correct: it serves the economy, not shareholders."],
      ["Maximum profit for its shareholders", "That is a commercial bank's aim."],
      ["Collecting as much tax as possible", "Tax collection is ZIMRA's role."],
      ["Lending to as many households as possible", "It does not lend to households."],
    ],
    answer: "A",
    explanation: "Central banks pursue price stability and financial stability.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Prices are rising fast. What is the central bank most likely to do?",
    options: [
      ["Raise its policy interest rate", "Correct: dearer borrowing cuts spending and slows price rises."],
      ["Lower reserve requirements for banks", "That would let banks lend more and add to inflation."],
      ["Buy government securities from banks", "Buying puts more money into banks."],
      ["Print more notes for circulation", "More money would make inflation worse."],
    ],
    answer: "A",
    explanation: "Tight monetary policy raises rates or reduces lending to slow inflation.",
    hints: ["Which action makes borrowing more expensive?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "The central bank sells treasury bills to commercial banks. What is the likely effect?",
    options: [
      ["Banks have less money to lend", "Correct: money moves from the banks to the central bank."],
      ["Banks have more money to lend", "That happens when the central bank buys securities."],
      ["The government's tax revenue rises", "Selling bills is borrowing, not tax."],
      ["Commercial banks may issue their own notes", "Banks cannot issue notes."],
    ],
    answer: "A",
    explanation: "Selling securities in open market operations reduces bank liquidity and lending.",
    hints: ["Banks pay for the bills with their cash reserves."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why does the central bank license and inspect banks?",
    options: [
      ["To protect depositors and confidence in banking", "Correct: badly run banks put savings at risk."],
      ["To set the prices that banks' customers charge", "It does not set retail prices."],
      ["To collect banks' profits for the government", "Profits belong to banks' owners."],
      ["To choose which customers receive loans", "Banks make their own lending decisions within the rules."],
    ],
    answer: "A",
    explanation: "Supervision keeps banks sound so that depositors' money is safe.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which function involves the central bank holding gold and foreign currencies?",
    options: [
      ["Managing foreign reserves", "Correct: reserves pay for imports and debts abroad."],
      ["Lender of last resort", "That concerns lending to banks short of cash."],
      ["Clearing cheques between banks", "Clearing settles local payments."],
      ["Issuing treasury bills", "Treasury bills are government borrowing."],
    ],
    answer: "A",
    explanation: "Foreign reserves support external payments and the currency.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The central bank keeps the government's bank accounts.",
    answer: true,
    explanation: "True. It is banker to the government.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A higher bank rate makes overdrafts cheaper for businesses.",
    answer: false,
    explanation: "False. Commercial banks pass on the higher rate, so overdrafts and loans become dearer.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Banks settle the amounts they owe one another through their accounts at the central bank.",
    answer: true,
    explanation: "True. The central bank is banker to the banks and runs the clearing and settlement systems.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tool of monetary policy with how it works.",
    pairs: [
      ["Bank (policy) rate", "Interest rate at which the central bank lends to banks"],
      ["Reserve requirement", "Share of deposits banks must keep and not lend"],
      ["Open market operations", "Buying or selling government securities"],
      ["Moral suasion", "Persuading banks to limit certain lending"],
    ],
    explanation: "Each tool changes the cost or amount of bank lending.",
  });
  b.fib({
    d: 2,
    stem: "Complete the chain.",
    template: "To reduce inflation the central bank {{blank:a}} its policy rate. Loans become dearer, so borrowing and spending {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["raises"], choices: ["raises", "lowers", "fixes", "removes"] },
      { id: "b", accepted: ["fall"], choices: ["fall", "rise", "double", "stay the same"] },
    ],
    explanation: "Higher rates reduce borrowing and spending, slowing price rises.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Write the abbreviation commonly used for the Reserve Bank of Zimbabwe.",
    accepted: ["RBZ", "rbz"],
    wrong: ["ZIMRA"],
    explanation: "RBZ.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** functions of the Reserve Bank of Zimbabwe as banker to the government.",
    points: [
      "Keeps the government's accounts / receives revenue (1)",
      "Explained: tax revenue paid in; payments made for ministries (1)",
      "Lends to government / manages government borrowing through treasury bills and bonds / advises (1)",
      "Explained, e.g. covers short-term gaps between spending and revenue (1)",
    ],
    modelAnswer: "The Reserve Bank keeps the government's accounts, receiving tax revenue and making payments for ministries. It also manages government borrowing by issuing treasury bills, which covers short-term gaps between spending and revenue.",
    explanation: "Name each function and explain how it helps the government.",
    hints: ["Think of what any bank does for a customer."],
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Distinguish between a central bank and a commercial bank (two differences).",
    points: [
      "Aim: central bank stability; commercial bank profit (1)",
      "Contrast made (1)",
      "Customers: government and banks versus the public / issues currency versus cannot / supervises versus is supervised (1)",
      "Contrast made (1)",
    ],
    modelAnswer: "A central bank aims at stable prices and a sound banking system, whereas a commercial bank aims to make a profit for its shareholders. The central bank's customers are the government and the banks, while commercial banks serve the public and businesses.",
    explanation: "Each difference must compare both banks.",
    hints: ["Compare aims, customers and powers."],
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "News report (fictional): \"Prices of basic goods have risen every month this year. The central bank has announced a higher policy rate and has warned two banks whose lending has grown too fast. One small bank was helped last week when depositors queued to withdraw their savings.\"",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Helping the small bank when depositors queued to withdraw is an example of the central bank acting as:",
        options: [["Lender of last resort", "Correct: it lent to a bank short of cash."], ["Banker to the government", "The government's accounts are not involved."], ["Issuer of currency", "No new currency is issued."], ["Manager of foreign reserves", "No foreign currency is involved."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how a higher policy rate should slow down rising prices.",
        points: ["Banks raise interest on loans and overdrafts (1)", "Households and firms borrow and spend less (1)", "Lower demand reduces pressure on prices (1)"],
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "State **two** other tools the central bank could use to reduce bank lending.",
        points: ["Raise reserve requirements (1)", "Sell government securities (open market operations) / directives or moral suasion (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Discuss the effects of the higher policy rate on small businesses.",
        points: ["Dearer overdrafts and loans raise costs (1)", "Expansion plans postponed / less investment (1)", "Customers borrow and spend less, so sales may fall (1)", "But stable prices make planning and pricing easier in the long run; conclusion (1)"],
      }),
    ],
    explanation: "Lender of last resort; higher rates reduce borrowing and demand; other tools: reserve requirements, open market sales, directives; small firms face dearer credit but benefit from stable prices.",
    hints: ["Follow the chain from the policy rate to spending.", "Consider costs and sales."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "A Form 3 class visits the Reserve Bank of Zimbabwe in Harare. The guide explains that the bank does not open accounts for members of the public.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** groups for which the Reserve Bank acts as banker.",
        points: ["The government (1)", "Commercial banks (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why the Reserve Bank controls the issue of notes and coins.",
        points: ["Sole issuer gives one trusted national currency (1)", "Too much money in circulation causes inflation (1)", "Security features protect against forgery / replaces worn notes (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how the supervision of banks protects ordinary savers.",
        points: ["Only licensed institutions may take deposits (1)", "Inspections and capital rules keep banks sound (1)", "Savers' deposits are safer and confidence is maintained (1)"],
      }),
    ],
    explanation: "The central bank serves government and banks, controls currency to prevent inflation and forgery, and supervises banks to protect depositors.",
    hints: ["Who would lose if a bank failed?"],
  });
  b.card("DEFINITION", "Central bank", "The bank at the head of the banking system: issues currency, banker to government and banks, controls money and credit, supervises banks.");
  b.card("CONCEPT", "Functions of the Reserve Bank of Zimbabwe", "Issue notes and coins; banker to government; banker to banks; lender of last resort; monetary policy; supervise banks; manage foreign reserves.");
  b.card("DEFINITION", "Lender of last resort", "The central bank lends to banks short of cash when no one else will, preventing failures and panic.");
  b.card("DEFINITION", "Monetary policy", "Central bank action on money, credit and interest rates to keep prices stable and support growth.");
  b.card("CONCEPT", "Tools of monetary policy", "Policy (bank) rate, reserve requirements, open market operations, directives and moral suasion.");
  b.card("CONCEPT", "Higher policy rate chain", "Higher rate → dearer loans → less borrowing and spending → slower price rises.");
  b.card("CONCEPT", "Central versus commercial bank", "Central: stability, serves government and banks, issues currency, supervises. Commercial: profit, serves public, supervised.");
  b.card("DEFINITION", "Foreign reserves", "Foreign currency, gold and other assets held by the central bank to pay for imports and debts and support the currency.");
});
