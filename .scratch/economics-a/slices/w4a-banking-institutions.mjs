// W4a: banks and the central bank (both boards; ZIMSEC Form 5, Cambridge A Level). Building societies and merchant banks are ZIMSEC detail.
import { concept, P, chk, table, fmt, roundTo, ZIM } from "../lib.mjs";
import { mc, LV8 } from "../tables/w4a-kit.mjs";

const LV4 = [
  [3, 4, 4, "Two-sided, applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.money.banking-institutions", { file: "money/banking-institutions", keyPrefix: "money.banking-institutions" }, (b) => {
  mc(b, [2, "RECALL"], "Which of the following is a function of a central bank?",
    ["Acting as the lender of last resort to banks", "Correct: it supports sound banks that are short of cash."],
    [["Accepting savings deposits from households and many small firms", "This is a function of commercial banks."],
     ["Selling insurance policies to the general public and to companies", "This is the business of insurance companies."],
     ["Providing mortgages to buyers of private houses and flats", "This is the main business of building societies."]],
    "Central banks are bankers to the government and banks, lenders of last resort, note issuers and supervisors.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "In the balance sheet of a commercial bank, customers' deposits are",
    ["a liability, because the bank owes the money", "Correct: deposits must be repaid."],
    [["an asset, because the bank holds the money in its own vaults", "Deposits are owed, so they are liabilities; the cash held is the asset."],
     ["capital, because customers own part of the whole business", "Capital belongs to shareholders, not depositors."],
     ["a reserve, because the bank must hold all of them as cash balances", "Only a fraction is held as reserves."]],
    "Deposits are liabilities; loans and reserves are assets.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following assets of a commercial bank is the most liquid?",
    ["Cash and balances at the central bank", "Correct: it is already money and can meet withdrawals at once."],
    [["Loans repayable over five years", "Loans are the least liquid."],
     ["Buildings and equipment owned by the bank", "These cannot be turned into cash quickly."],
     ["Long-term investments in company shares", "These are less liquid than cash and may fall in value."]],
    "Cash is perfectly liquid; loans and fixed assets are the least liquid.");

  mc(b, [3, "ANALYSIS"], "A commercial bank sells some Treasury bills and uses the cash to make more loans. This is likely to",
    ["raise profitability but reduce liquidity", "Correct: loans earn more but cannot be turned into cash quickly."],
    [["reduce profitability and raise liquidity at the same time", "Loans earn more interest than Treasury bills, so profit rises."],
     ["raise both profitability and liquidity together", "Loans are less liquid than bills."],
     ["leave both profitability and liquidity unchanged in total", "The mix of assets has changed."]],
    "Moving from liquid bills to less liquid loans raises expected profit but reduces liquidity and security.", { hints: ["Which asset earns more and which is easier to turn into cash?"] });

  mc(b, [2, "UNDERSTANDING"], "A bank does not lend all of its deposits mainly because it",
    ["must be able to repay customers who withdraw money", "Correct: it must keep liquid assets."],
    [["wishes to avoid earning too much profit", "Banks seek profit."],
     ["is forbidden by law from making any loans", "Lending is a main business of banks."],
     ["wants to hold its deposits as shares in other banks", "This is not the main reason."]],
    "Banks keep reserves and liquid assets to meet withdrawals, and regulators require them.");

  mc(b, [2, "RECALL"], "A building society mainly",
    ["takes savings and lends mainly for house purchase", "Correct: this is its specialised business."],
    [["issues the notes and coins used in the whole economy", "This is a central bank function."],
     ["acts as the banker to the government and to banks", "This is a central bank function."],
     ["advises companies on mergers, takeovers and share issues", "This is a merchant bank activity."]],
    "Building societies specialise in mortgage lending financed by savings.", { applies: ZIM });

  mc(b, [4, "EVALUATION"], "A central bank's promise to lend to banks in trouble may encourage some banks to take greater risks. This problem is called",
    ["moral hazard", "Correct: protection from losses changes behaviour."],
    [["liquidity preference", "This is a theory of the demand for money."],
     ["crowding out", "This is about government borrowing and private investment."],
     ["adverse selection", "This is a problem of information before a contract is made."]],
    "If banks expect to be rescued, they may take more risk: moral hazard.", { hints: ["What happens to behaviour when the cost of failure is borne by someone else?"] });

  {
    const r = (45 / 300) * 100; chk(r, 15);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "pct", value: r, dp: 1, unit: "%", hints: ["Reserve ratio = cash and central bank balances ÷ deposits × 100."],
      stem: "A bank holds US\\$45 million in cash and balances at the central bank. Its customers' deposits are US\\$300 million. Calculate its reserve ratio, as a percentage.",
      wrong: [6.7, 85, 0.15], explanation: "Reserve ratio = 45 ÷ 300 × 100 = 15%." });
    const l = (560 / 800) * 100; chk(l, 70);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: l, dp: 1, unit: "%", hints: ["Loan-to-deposit ratio = loans ÷ deposits × 100."],
      stem: "A bank has made loans of US\\$560 million and has customers' deposits of US\\$800 million. Calculate its loan-to-deposit ratio, as a percentage.",
      wrong: [30, 142.9, 7], explanation: "Loan-to-deposit ratio = 560 ÷ 800 × 100 = 70%." });
    const c = (80 / 1250) * 100; chk(c, 6.4);
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: c, dp: 1, unit: "%", hints: ["Capital ratio = capital ÷ total assets × 100."],
      stem: "A bank has total assets of US\\$1,250 million and shareholders' capital of US\\$80 million. Calculate the capital ratio, as a percentage.",
      wrong: [15.6, 94, 0.064], explanation: "1. Capital ratio = capital ÷ total assets.\n2. = 80 ÷ 1,250 × 100 = 6.4%. Dividing total assets by capital gives 15.6." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: a loan made by a commercial bank is a liability of the bank.",
    feedbackFalse: "A loan is owed to the bank, so it is an asset.",
    explanation: "Loans are assets; customers' deposits are liabilities." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each role with the institution that performs it.",
    pairs: [["Accepts deposits and makes loans to customers", "Commercial bank"], ["Lender of last resort to banks", "Central bank"], ["Specialises in lending for house purchase", "Building society"], ["Arranges finance for trade and advises companies", "Merchant bank"]],
    applies: ZIM, explanation: "Each institution has a distinct main business." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "The ease with which an asset can be turned into cash without loss of value is its {{blank:a}}. A bank's loans are its least {{blank:b}} assets.",
    blanks: [{ id: "a", accepted: ["liquidity"], choices: ["liquidity", "security", "profitability"] }, { id: "b", accepted: ["liquid"], choices: ["liquid", "risky", "valuable"] }],
    explanation: "Liquidity is convertibility into cash; loans are the least liquid of the bank's main assets." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes the central bank's role of lending to banks that cannot find funds elsewhere?",
    accepted: ["lender of last resort", "the lender of last resort", "last resort lender"], wrong: ["banker to the government"],
    explanation: "The lender of last resort prevents a shortage of cash from becoming a bank failure." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Think of deposits and loans."],
    stem: "State two functions of a commercial bank.",
    points: ["Accepting deposits (current and savings accounts).", "Making loans and overdrafts (or providing payment services such as transfers and cards)."],
    modelAnswer: "A commercial bank accepts deposits from customers and makes loans and overdrafts; it also provides payment services such as transfers and cards.",
    explanation: "Deposits, loans and payments." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name the aims and say why they conflict."],
    stem: "Explain why a commercial bank cannot be both highly liquid and highly profitable.",
    points: ["The most profitable assets are loans, which earn interest.", "Loans are not easily turned into cash, so they are illiquid.", "The most liquid assets (cash and balances at the central bank) earn little or nothing.", "So holding more liquid assets raises liquidity but reduces profit, and the bank must find a balance."],
    modelAnswer: "The most profitable assets are loans, which earn interest, but they cannot be turned into cash quickly, so they are illiquid. The most liquid assets, cash and balances at the central bank, earn little or nothing. Holding more liquid assets therefore makes the bank more liquid but less profitable, so it must find a balance between the two.",
    explanation: "Profit comes from illiquid loans; liquid assets earn little." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think of what happens if depositors lose trust."],
    stem: "Explain how a lender of last resort helps to prevent a bank run.",
    points: ["A bank run occurs when many depositors withdraw their money at the same time.", "The central bank lends cash to a sound bank that is short of liquid assets.", "Depositors know that they can be repaid, so they do not panic and the run is prevented."],
    modelAnswer: "A bank run occurs when many depositors try to withdraw their money at the same time. The central bank lends cash to a sound bank that is short of liquid assets, so depositors know that they can be repaid and have no reason to panic, which stops the run.",
    explanation: "Run, lending, confidence." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Think of what the capital absorbs."],
    stem: "Analyse why central banks set minimum capital ratios for commercial banks.",
    points: ["Capital is the shareholders' money that absorbs losses on assets such as bad loans.", "A bank with little capital will become insolvent after small losses.", "Insolvency means depositors may lose their money.", "A minimum ratio makes banks hold a cushion and gives owners more to lose, so they take less risk.", "This protects depositors and the stability of the whole banking system."],
    modelAnswer: "Capital is the shareholders' money, and it absorbs losses on assets such as bad loans. A bank with little capital becomes insolvent after small losses, and then depositors may lose their money. A minimum capital ratio makes banks hold a cushion and gives owners more to lose, so they are likely to take fewer risks. This protects depositors and the stability of the whole banking system.",
    explanation: "Loss absorption; insolvency; incentives; stability." });

  {
    const assets = [["Cash and balances at the central bank", 120], ["Money at call and short notice", 80], ["Treasury bills", 200], ["Loans and advances", 560], ["Buildings and equipment", 40]];
    const A = assets.reduce((s, x) => s + x[1], 0); chk(A, 1000);
    const dep = 850, cap = 150; chk(dep + cap, 1000);
    const liquid = ((120 + 80 + 200) / dep) * 100; chk(Math.round(liquid * 10) / 10, 47.1);
    const cr = (cap / A) * 100; chk(cr, 15);
    const tA = table(["Assets", "US\\$ million"], [...assets, ["**Total**", `**${fmt(A)}**`]]);
    const tL = table(["Liabilities and capital", "US\\$ million"], [["Customers' deposits", dep], ["Shareholders' capital", cap], ["**Total**", `**${fmt(dep + cap)}**`]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Liquid assets = cash + call money + Treasury bills.", "Capital ratio = capital ÷ total assets × 100."],
      stem: `**The balance sheet of a bank in Zandia (fictional, illustrative)**\n\n${tA}\n\n${tL}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: liquid, dp: 1, unit: "%", stem: "Calculate liquid assets (cash, money at call and Treasury bills) as a percentage of deposits, to one decimal place.", wrong: [40, 14.1, 66], explanation: "Liquid assets = 120 + 80 + 200 = 400. 400 ÷ 850 × 100 = 47.1%." }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: cr, dp: 1, unit: "%", stem: "Calculate the capital ratio (capital as a percentage of total assets).", wrong: [17.6, 85, 5.7], explanation: "150 ÷ 1,000 × 100 = 15%." }),
        P.mcq({ label: "(c)", marks: 1, stem: "Which of the bank's assets is likely to be the most profitable but the least liquid?",
          options: [["Loans and advances", "Correct: they earn the most interest and cannot easily be turned into cash."], ["Cash and balances at the central bank", "These earn little and are perfectly liquid."], ["Treasury bills", "These are liquid and earn only a modest return."], ["Money at call and short notice", "This is repayable at short notice, so it is very liquid."]], answer: "A",
          explanation: "Loans earn the highest return but are illiquid and carry default risk." }),
        P.manual({ label: "(d)", marks: 4, stem: "Explain the conflict between liquidity and profitability facing the bank.",
          points: ["The bank earns most from loans, which are 56% of assets.", "Loans cannot be turned into cash quickly if depositors withdraw their money.", "Holding more cash and Treasury bills would make it more able to meet withdrawals.", "But those assets earn little, so profit falls; the bank must balance the two."],
          modelAnswer: "The bank earns most from its loans, which are 56% of its assets, but loans cannot be turned into cash quickly if depositors withdraw their money. Holding more cash and Treasury bills would make the bank better able to meet withdrawals, but those assets earn little, so profit would fall. The bank must therefore balance the two aims." }),
      ],
      explanation: "Liquid assets are 47.1% of deposits; the capital ratio is 15%; loans are profitable but illiquid." });
  }
  {
    const dep = 600, res = 72, w1 = 45, w2 = 85;
    chk(res / dep, 0.12);
    const short = w1 + w2 - res; chk(short, 58);
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Shortfall = total withdrawals − cash available.", "In (d) think about the effects on bank behaviour as well as on stability."],
      stem: "**A run on a savings bank in Mbira (a fictional economy, illustrative)**\n\nMbira Savings Bank has customers' deposits of US\\$600 million. It holds US\\$72 million in cash and balances at the central bank; most of its other assets are loans to farmers and small firms, repayable over several years. A rumour spreads on social media that the bank is in trouble, and customers rush to withdraw their money: US\\$45 million on the first day and US\\$85 million on the second day. The bank is financially sound, but it cannot quickly sell its loans. The central bank says that it will lend to the bank if it needs cash.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: short, unit: "US$ million", dp: 0, tol: 0.5, stem: "Calculate the shortfall of cash after two days, in US\\$ million, if the bank cannot get any more funds.", wrong: [130, 72, 18], explanation: "Withdrawals = 45 + 85 = 130. Shortfall = 130 − 72 = US\\$58 million." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain why the bank cannot easily meet the withdrawals even though it is financially sound.",
          points: ["Most of its assets are loans, which are illiquid.", "The loans are repayable over several years, so they cannot be turned into cash quickly.", "Its cash holdings (12% of deposits) are only a small fraction of its deposits."],
          modelAnswer: "Most of the bank's assets are loans, which are illiquid and are repayable over several years, so they cannot be turned into cash quickly. Its cash holdings are only 12% of deposits, so it cannot pay out more than a small fraction of deposits on demand." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain how the central bank, as lender of last resort, can prevent the bank from failing.",
          points: ["It lends the shortfall of cash to the bank against its good loans.", "Depositors see that cash is available, so the panic ends.", "The bank does not have to sell its loans at a loss, and sound business continues."],
          modelAnswer: "The central bank can lend the shortfall in cash to the bank, using its good loans as security. Depositors see that cash is available, so the panic ends, and the bank does not have to sell its loans at a loss." }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", wordLimit: { min: 80, max: 220 }, levels: LV4,
          stem: "Assess whether it is a good policy for a central bank to act as lender of last resort.",
          points: ["It prevents panics from turning a sound bank into a failed one and spreading through the banking system.", "It protects depositors and the payment system, as in Mbira.", "It may cause moral hazard: banks may take greater risks if they expect rescue.", "Judgement: valuable if combined with supervision, penalty rates and capital requirements."],
          modelAnswer: "A lender of last resort prevents a panic from turning a sound bank into a failed one and from spreading through the banking system, and it protects depositors and the payment system, as in Mbira. However, it may cause moral hazard, since banks may take greater risks if they expect to be rescued. It is therefore valuable if it is combined with careful supervision, a penalty rate of interest and minimum capital requirements." }),
      ],
      explanation: "Shortfall US\\$58 million; loans are illiquid; lender of last resort restores confidence but risks moral hazard." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Consider stability, price stability, support for government and the risks."],
    stem: "Assess the importance of the central bank to the stability of an economy.",
    points: ["As lender of last resort it prevents bank runs and protects the payment system.", "Supervision and capital and liquidity requirements reduce excessive risk-taking.", "Monetary policy controls inflation and so keeps prices stable.", "As banker to the government it helps to manage public debt and payments.", "Control of the note issue limits excessive money creation.", "But it may create moral hazard and cannot prevent every crisis.", "Independence and credibility matter: it can be pressed to finance the government.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "The central bank is important for stability in several ways. As lender of last resort it prevents bank runs and protects the payment system, and its supervision and capital and liquidity requirements reduce excessive risk-taking by banks. Through monetary policy it controls inflation and so keeps prices stable, and its control of note issue limits excessive money creation. As banker to the government it helps to manage public debt and payments. However, its rescue role may create moral hazard, and it cannot prevent every crisis. Its effectiveness also depends on independence, because a central bank pressed to finance government spending by creating money may cause inflation. Overall the central bank is essential to stability, provided it has the independence and the supervisory powers to match its responsibilities.",
    explanation: "Weigh the stabilising functions against moral hazard and the need for independence." });

  b.card("DEFINITION", "What is a **commercial bank**?", "A profit-seeking institution that accepts deposits, makes loans and provides payment services.");
  b.card("DEFINITION", "What is a **central bank**?", "The institution at the centre of the banking system that issues currency, is banker to the government and banks, supervises banks and runs monetary policy.");
  b.card("CONCEPT", "Which are a bank's assets and which its liabilities?", "Assets: cash, bills, loans, buildings. Liabilities: customers' deposits and capital (owed to shareholders).");
  b.card("CONCEPT", "Define liquidity, security and profitability for a bank.", "Liquidity: ease of turning assets into cash. Security: safety of assets. Profitability: return earned.");
  b.card("CONCEPT", "Why do liquidity and profitability conflict?", "The most profitable assets (loans) are the least liquid; the most liquid (cash) earn little.");
  b.card("DEFINITION", "What is the **lender of last resort**?", "The central bank's role of lending to sound banks short of cash to prevent a loss of confidence.");
  b.card("CONCEPT", "List five roles of a central bank.", "Banker to government, banker to banks, lender of last resort, note issue, monetary policy and supervision.");
  b.card("FORMULA", "Capital ratio of a bank?", "Capital ÷ total assets × 100.");
  b.card("DEFINITION", "What is **moral hazard** in banking?", "Banks take more risk if they expect to be rescued, because someone else bears the cost of failure.");
});
