// W4a: the banking system and commercial banks (COM Form 2; BES Form 3).
import { concept, P, money, fmt, r2, table, COM } from "../lib.mjs";

concept("bus.finance.commercial-banks", { file: "finance/commercial-banks", keyPrefix: "finance.commercial-banks" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which account is mainly used for everyday payments by cheque, card and transfer?",
    options: [
      ["A current account", "Correct: it is designed for frequent payments."],
      ["A savings account", "Savings accounts are for money not needed immediately."],
      ["A fixed deposit", "A fixed deposit is locked for an agreed period."],
      ["A pension account", "Pensions build up funds for retirement."],
    ],
    answer: "A",
    explanation: "Current accounts are payment accounts; they may have an overdraft facility.",
  });
  b.mcq({
    d: 1, skill: "RECALL", applies: COM,
    stem: "On a cheque, who is the payee?",
    options: [
      ["The person to whom the money is paid", "Correct: the payee receives the money."],
      ["The account holder who signs the cheque", "That is the drawer."],
      ["The bank on which the cheque is drawn", "That is the drawee."],
      ["The person who witnesses the signature", "Cheques do not need a witness."],
    ],
    answer: "A",
    explanation: "Drawer writes it, drawee (the bank) pays, payee receives.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A landlord is paid the same rent on the first day of every month from a tenant's account, on the tenant's instruction. Which service is used?",
    options: [
      ["A standing order", "Correct: a fixed amount paid regularly on the customer's instruction."],
      ["A debit order", "With a debit order the payee collects amounts that may vary."],
      ["A crossed cheque", "A cheque must be written each time."],
      ["A night safe", "A night safe is for depositing takings after hours."],
    ],
    answer: "A",
    explanation: "Standing orders are set up by the customer for fixed, regular payments.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Why is a crossed cheque safer than an open cheque?",
    options: [
      ["It must be paid into a bank account", "Correct: it cannot be cashed over the counter, so the payee can be traced."],
      ["It cannot be written for a large amount", "Crossing does not limit the amount."],
      ["It is guaranteed by the central bank", "Crossing gives no guarantee of payment."],
      ["It can be used without a signature", "Every cheque needs the drawer's signature."],
    ],
    answer: "A",
    explanation: "A crossed cheque must go through a bank account, which protects against theft.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which system transfers large payments between accounts at different banks immediately?",
    options: [
      ["RTGS", "Correct: real-time gross settlement moves funds at once, one payment at a time."],
      ["A standing order", "Standing orders are regular fixed payments, not instant settlement."],
      ["A deposit slip", "A deposit slip records money paid in."],
      ["A bank statement", "A statement records past transactions."],
    ],
    answer: "A",
    explanation: "RTGS settles each payment in real time between banks.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A shop's sales are low for a few weeks each year before school fees are due. Which bank facility best suits this short-term need?",
    options: [
      ["An overdraft", "Correct: flexible, used only when needed, interest on the amount overdrawn."],
      ["A twenty-year mortgage", "Mortgages finance property over many years."],
      ["A fixed deposit", "That is a way of saving, not borrowing."],
      ["Safe custody", "Safe custody stores valuables."],
    ],
    answer: "A",
    explanation: "Overdrafts match short, uneven cash shortages.",
    hints: ["The need is short-term and the amount varies."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "How do commercial banks help the economy grow?",
    options: [
      ["They lend savers' deposits to businesses for investment", "Correct: deposits are channelled into productive loans."],
      ["They issue the country's notes and coins", "The central bank issues currency."],
      ["They set the rates of income tax", "Tax rates are set by government."],
      ["They guarantee every business against making trading losses", "Banks do not guarantee businesses."],
    ],
    answer: "A",
    explanation: "Banks act as intermediaries, turning savings into loans for investment.",
    hints: ["Where does the money that banks lend come from?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which service lets a shop deposit its day's takings after the bank has closed?",
    options: [
      ["Night safe", "Correct: takings are placed in a secure safe in the bank wall."],
      ["Safe custody", "Safe custody keeps documents and valuables for long periods."],
      ["Standing order", "A standing order is a payment instruction."],
      ["Letter of credit", "This guarantees payment in foreign trade."],
    ],
    answer: "A",
    explanation: "Night safes reduce the risk of keeping cash on the premises overnight.",
  });
  // Bank statement (figures differ from the lesson).
  const open = 1240, dep = 560, chq = 980, so = 210, ch = 18;
  const close = r2(open + dep - chq - so - ch);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: close, applies: COM,
    stem: `Chipo's current account opens the month with ${money(open)}. During the month she deposits ${money(dep)}, a cheque for ${money(chq)} is paid out, a standing order of ${money(so)} is paid, and bank charges of ${money(ch)} are deducted. Calculate her closing balance.`,
    wrong: [r2(open + dep), r2(open - dep - chq - so - ch)],
    explanation: `${fmt(open)} + ${fmt(dep)} − ${fmt(chq)} − ${fmt(so)} − ${fmt(ch)} = ${money(close)}.`,
    workedSolution: `1. After the deposit: ${fmt(open)} + ${fmt(dep)} = ${fmt(open + dep)}.\n2. Less the cheque, standing order and charges: ${fmt(open + dep)} − ${fmt(chq + so + ch)} = ${money(close)}.`,
    hints: ["Deposits are credits (add); payments and charges are debits (subtract)."],
  });
  const bal2 = 420, pay2 = 1100, int2 = 3;
  const od2 = pay2 - bal2;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: r2((od2 * int2) / 100), calculator: true,
    stem: `Farai has ${money(bal2)} in his current account and an overdraft limit of ${money(1000)}. He pays a supplier ${money(pay2)}. Assume overdraft interest of ${int2}% a month on the amount overdrawn. Calculate one month's interest.`,
    wrong: [r2((pay2 * int2) / 100), r2((1000 * int2) / 100)],
    explanation: `Overdrawn = ${fmt(pay2)} − ${fmt(bal2)} = ${fmt(od2)}; interest = ${int2}% × ${fmt(od2)} = ${money(r2((od2 * int2) / 100))}.`,
    workedSolution: `1. Amount overdrawn = ${fmt(pay2)} − ${fmt(bal2)} = ${fmt(od2)}.\n2. Interest = ${int2}% × ${fmt(od2)} = ${money(r2((od2 * int2) / 100))}.`,
    hints: ["Interest is on the overdrawn amount, not the limit."],
  });
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: 135 + 4 * 50 + 6 * 20, daily: true, applies: COM,
    stem: `Sipho pays into his account a cheque for ${money(135)}, four US\\$50 notes and six US\\$20 notes. What total should he write on the deposit slip?`,
    wrong: [135 + 4 + 6],
    explanation: `${fmt(135)} + 4 × 50 + 6 × 20 = ${fmt(135)} + ${fmt(4 * 50)} + ${fmt(6 * 20)} = ${money(135 + 4 * 50 + 6 * 20)}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Savings accounts normally earn interest.",
    answer: true,
    explanation: "True. Interest rewards the saver for leaving money with the bank.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "On a bank statement, a credit entry reduces the customer's balance.",
    answer: false,
    explanation: "False. A credit (money paid in) increases the balance; a debit reduces it.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each bank service with its use.",
    pairs: [
      ["Safe custody", "Keeping title deeds and valuables secure"],
      ["Letter of credit", "Guaranteeing an importer's payment to a foreign supplier"],
      ["Debit card", "Paying at a shop with money taken straight from the account"],
      ["Mortgage", "Long-term loan to buy a house, secured on the property"],
    ],
    explanation: "Banks provide storage, trade, payment and lending services.",
  });
  b.fib({
    d: 2, applies: COM,
    stem: "Complete the sentences about a cheque.",
    template: "The account holder who writes and signs a cheque is the {{blank:a}}. The bank that must pay it is the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["drawer"], choices: ["drawer", "drawee", "payee", "endorser"] },
      { id: "b", accepted: ["drawee"], choices: ["drawer", "drawee", "payee", "endorser"] },
    ],
    explanation: "Drawer, drawee and payee are the three parties to a cheque.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the machine from which bank customers can withdraw cash at any time using a card and PIN.",
    accepted: ["ATM", "automated teller machine", "an ATM", "cash machine", "automatic teller machine"],
    wrong: ["POS"],
    explanation: "An automated teller machine (ATM).",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Distinguish between a current account and a savings account (two differences).",
    points: [
      "Purpose: current for everyday payments; savings for money not needed now (1)",
      "Contrast made clearly (1)",
      "Interest: little or none on current; paid on savings / cheque book and overdraft on current only (1)",
      "Contrast made clearly (1)",
    ],
    modelAnswer: "A current account is used for everyday payments by cheque, card and transfer, whereas a savings account holds money not needed immediately. A current account earns little or no interest but can have an overdraft, while a savings account earns interest and has no cheque book or overdraft.",
    explanation: "Each difference must refer to both accounts.",
    hints: ["Compare purpose, interest, cheques and overdrafts."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **two** benefits to a small business of paying suppliers electronically instead of in cash.",
    points: [
      "Safety: less cash kept or carried, lower risk of theft (1)",
      "Developed: losses avoided / insurance costs lower (1)",
      "Speed and convenience / record of every payment on the statement (1)",
      "Developed: suppliers paid on time without travel; easier bookkeeping and proof of payment (1)",
    ],
    modelAnswer: "Electronic payments mean the owner does not carry large sums of cash, so the risk of theft is much lower. Every payment also appears on the bank statement, which gives proof of payment and makes keeping records easier.",
    explanation: "Electronic payments are safer, faster and leave a record.",
    hints: ["Think about theft and about records."],
  });
  const tx = [["1 May", "Balance brought forward", null, null, 640], ["3 May", "Cash deposit", null, 1150], ["8 May", "RTGS transfer to supplier", 1420, null], ["20 May", "Debit order: electricity", 86, null], ["31 May", "Bank charges", 14, null]];
  let bal = 640;
  const rows = tx.map(([d, det, dr, cr, b0]) => {
    if (b0 === undefined) bal = r2(bal - (dr ?? 0) + (cr ?? 0));
    return [d, det, dr ?? "", cr ?? "", b0 === undefined ? (d === "8 May" ? "?" : bal) : b0];
  });
  const after8 = r2(640 + 1150 - 1420);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true, applies: COM,
    stem: `Tatenda runs a small engineering workshop in Gweru. Part of his bank statement for May is shown.\n\n${table(["Date", "Details", "Debit US\\$", "Credit US\\$", "Balance US\\$"], rows, { align: ["l", "l", "r", "r", "r"] })}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: after8, type: "CALCULATION",
        stem: "Calculate the missing balance on 8 May.",
        wrong: [r2(640 - 1420), r2(1150 - 1420 + 86)],
        explanation: `640 + 1,150 − 1,420 = ${money(after8)}.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which entry was collected by the payee rather than set up as a fixed payment by Tatenda?",
        options: [["The debit order for electricity", "Correct: the payee collects amounts that may vary."], ["The cash deposit", "That is money paid in."], ["The bank charges", "Charges are made by the bank itself."], ["The balance brought forward", "That is the opening balance."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **one** advantage and **one** disadvantage to Tatenda of using RTGS to pay his supplier.",
        points: ["Advantage: immediate, safe payment / no cash carried (1)", "Developed: supplier delivers sooner / proof of payment on the statement (1)", "Disadvantage: bank charges for each transfer / errors hard to reverse / system downtime (1)"],
      }),
      P.manual({
        label: "(d)", marks: 4,
        stem: "Tatenda's balance is low at the end of the month. Recommend whether he should arrange an overdraft or a bank loan to cover short gaps in cash. Justify your answer.",
        points: ["Overdraft: flexible, interest only on the amount used (1)", "Loan: fixed sum and instalments; interest on the whole sum even when not needed (1)", "Gaps are short and uneven, so an overdraft matches the need (1)", "Justified recommendation (1)"],
      }),
    ],
    explanation: `Balance on 8 May = ${money(after8)}. Debit orders are collected by the payee. For short, varying gaps an overdraft is usually more suitable than a loan.`,
    hints: ["Credits add, debits subtract.", "Who controls the amount of a debit order?"],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Thandeka has just opened a bakery in Chinhoyi. She needs a bank account to receive card payments from customers and to pay her suppliers and staff.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** types of bank in Zimbabwe's banking system other than commercial banks.",
        points: ["Central bank (Reserve Bank) / merchant bank (1)", "Building society / savings bank / microfinance or development institution (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Identify the most suitable type of account for Thandeka's business and give **two** reasons.",
        points: ["Current account (1)", "Allows frequent payments by card, transfer and cheque (1)", "Overdraft available for shortages / POS card payments paid into it (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain **three** other services the bank could provide to her business.",
        points: ["POS machine for card payments (1)", "Payroll / electronic transfers to staff and suppliers (1)", "Loans or overdraft / night safe / advice (1)"],
      }),
    ],
    explanation: "The banking system includes central, merchant, savings and other banks; a current account with POS, transfers and an overdraft suits a new bakery.",
    hints: ["Which account allows many payments?"],
  });
  b.card("DEFINITION", "Commercial bank", "A profit-making company that accepts deposits, lends money and provides payment services.");
  b.card("CONCEPT", "Current versus savings account", "Current: everyday payments, cheques, cards, overdraft, little interest. Savings: interest, no cheques, money not needed now.");
  b.card("DEFINITION", "Overdraft", "Permission to withdraw more than the balance in a current account, up to a limit; interest on the amount overdrawn.");
  b.card("CONCEPT", "Standing order versus debit order", "Standing order: customer instructs fixed regular payments. Debit order: payee collects amounts that may vary.");
  b.card("DEFINITION", "RTGS", "Real-time gross settlement: immediate electronic transfer of funds between banks, one payment at a time.", undefined, { applies: COM });
  b.card("CONCEPT", "Parties to a cheque", "Drawer (writes and signs), drawee (the bank), payee (receives the money).", undefined, { applies: COM });
  b.card("DEFINITION", "Crossed cheque", "A cheque with two parallel lines that must be paid into a bank account, not cashed over the counter.", undefined, { applies: COM });
  b.card("CONCEPT", "Other bank services", "Safe custody, night safe, foreign exchange, letters of credit, advice, statements and references, payroll.");
  b.card("CONCEPT", "Classification of banks", "Central bank, commercial banks, merchant banks, building societies, savings banks, development and microfinance institutions.");
});
