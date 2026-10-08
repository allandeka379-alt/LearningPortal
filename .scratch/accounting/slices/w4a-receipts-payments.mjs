// W4a: not-for-profit organisations and the receipts and payments account.
import { concept, P, money, tAccount, r2, sum, check } from "../lib.mjs";
import { fundAtDate, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.clubs.receipts-payments", { file: "clubs/receipts-payments", keyPrefix: "clubs.receipts-payments" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the **accumulated fund** of a club?",
    options: [
      ["Its total assets less total liabilities", "Correct: it is the club's equivalent of capital."],
      ["The cash in hand and at the bank", "That is the closing balance of the receipts and payments account."],
      ["The subscriptions received during the year", "Subscriptions are income, not the club's capital."],
      ["Its income less expenditure for one year", "That is the surplus or deficit for the year."],
    ],
    answer: "A",
    explanation: "Accumulated fund = assets − liabilities. Each year's surplus is added to it and a deficit is deducted.",
  });
  b.mcq({
    d: 2, skill: "RECALL", daily: true,
    stem: "A club's income for the year is greater than its expenditure. What is the difference called?",
    options: [
      ["A surplus", "Correct: the club's equivalent of a profit."],
      ["A deficit", "A deficit is when expenditure exceeds income."],
      ["Net profit", "Not-for-profit organisations do not use the term profit for the whole club."],
      ["The accumulated fund", "The accumulated fund is the club's capital, built up from surpluses."],
    ],
    answer: "A",
    explanation: "Income greater than expenditure gives a surplus; the reverse gives a deficit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about a **receipts and payments account** is correct?",
    options: [
      ["It records only money received and paid", "Correct: it is a summary of the cash book."],
      ["It includes depreciation of club equipment", "Depreciation involves no cash, so it is left out."],
      ["It shows the surplus or deficit for the year", "That is shown in the income and expenditure account."],
      ["It includes subscriptions owing at the year end", "Amounts owing are not cash, so they are left out."],
    ],
    answer: "A",
    explanation: "A receipts and payments account summarises actual cash and bank movements only.",
  });
  {
    const open = 870, rec = [5420, 1300, 940], pay = [3260, 1785, 2150];
    const close = r2(open + sum(rec) - sum(pay));
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `A drama society had ${money(open)} in the bank on 1 January 2025. During the year it received subscriptions ${money(rec[0])}, donations ${money(rec[1])} and concert takings ${money(rec[2])}, and paid hall hire ${money(pay[0])}, costumes ${money(pay[1])} and a new sound system ${money(pay[2])}. What is the closing bank balance?`,
      options: [
        [money(close), "Correct: 870 + 7,660 − 7,195."],
        [money(r2(sum(rec) - sum(pay))), "The opening balance has been left out."],
        [money(r2(open + sum(rec) - pay[0] - pay[1])), "The sound system is a payment too, even though it is a capital item."],
        [money(r2(open + sum(rec))), "The payments have not been deducted."],
      ],
      answer: "A",
      explanation: `${fmt(open)} + ${fmt(sum(rec))} − ${fmt(sum(pay))} = ${fmt(close)}. Every payment, capital or revenue, is included.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How are subscriptions paid **in advance** by members shown in a club's statement of affairs?",
    options: [
      ["As a liability", "Correct: the club owes those members a future period of membership."],
      ["As an asset", "Subscriptions in arrears (owed by members) are an asset; advances are not."],
      ["As income of the current year", "They belong to next year's income."],
      ["They are not shown", "They must be shown because the club owes the service."],
    ],
    answer: "A",
    explanation: "Subscriptions received in advance are a liability; subscriptions in arrears are an asset.",
  });
  {
    const assets = [["Clubhouse furniture", 6200], ["Subscriptions in arrears", 360], ["Bank", 2140]];
    const liabs = [["Subscriptions in advance", 240], ["Electricity owing", 185]];
    const fund = r2(sum(assets.map((x) => x[1])) - sum(liabs.map((x) => x[1])));
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `At 1 January 2025 a chess club had furniture ${money(6200)}, subscriptions in arrears ${money(360)} and a bank balance of ${money(2140)}. Subscriptions paid in advance were ${money(240)} and electricity owing was ${money(185)}. What was the accumulated fund?`,
      options: [
        [money(fund), "Correct: 8,700 − 425."],
        [money(r2(fund + 480)), "Subscriptions in advance have been treated as an asset."],
        [money(r2(fund - 720)), "Subscriptions in arrears have been treated as a liability."],
        [money(8700), "The liabilities have not been deducted."],
      ],
      answer: "A",
      hints: ["Which subscription balance is owed to the club, and which is owed by it?"],
      explanation: `Assets ${fmt(8700)} − liabilities ${fmt(425)} = ${fmt(fund)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **limitation** of a receipts and payments account?",
    options: [
      ["It does not show whether income covered expenses", "Correct: no surplus or deficit is calculated."],
      ["It shows only the payments, not the receipts", "It shows both receipts and payments."],
      ["It cannot show the closing bank balance", "The closing bank balance is its balance c/d."],
      ["It must be prepared by a qualified accountant", "Club treasurers usually prepare it themselves."],
    ],
    answer: "A",
    explanation: "Because it ignores accruals, prepayments, depreciation and the capital/revenue split, it cannot show a surplus or deficit.",
  });
  {
    const close = 2365, rec = 14280, pay = 13910;
    const open = r2(close + pay - rec);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A church youth group's receipts for 2025 totalled ${money(rec)} and its payments ${money(pay)}. Its bank balance at 31 December 2025 was ${money(close)}. What was the bank balance at 1 January 2025?`,
      options: [
        [money(open), "Correct: closing balance + payments − receipts."],
        [money(r2(close + rec - pay)), "Receipts and payments have been swapped."],
        [money(r2(rec - pay)), "This is only the net cash flow for the year."],
        [money(r2(close + pay)), "The receipts have been ignored."],
      ],
      answer: "A",
      hints: ["Opening balance + receipts − payments = closing balance."],
      explanation: `${fmt(close)} + ${fmt(pay)} − ${fmt(rec)} = ${fmt(open)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A club began the year with a bank **overdraft**. Where is the opening balance shown in its receipts and payments account?",
    options: [
      ["As a balance b/d on the payments (credit) side", "Correct: an overdraft is a credit balance in the bank account."],
      ["As a balance b/d on the receipts (debit) side", "Only a positive (debit) balance goes on the receipts side."],
      ["As a receipt called 'loan from bank'", "An overdraft is a balance, not a receipt of the year."],
      ["It is left out until the overdraft is repaid", "The opening balance is always shown."],
    ],
    answer: "A",
    hints: ["Which side does a bank overdraft appear on in a cash book?"],
    explanation: "An opening overdraft is a credit balance, brought down on the payments side.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "ZIMSEC calls clubs and societies 'non-trading concerns'.",
    answer: true,
    explanation: "True. ZIMSEC uses non-trading concerns or not-for-profit making organisations; Cambridge says clubs and societies.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The closing balance of a receipts and payments account is the club's surplus for the year.",
    answer: false,
    explanation: "False. It is the cash and bank balance. The surplus comes from the income and expenditure account.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each club term with its meaning.",
    pairs: [
      ["Subscriptions", "Annual amounts paid by members to belong to the club"],
      ["Donation", "A gift of money to the club"],
      ["Deficit", "Expenditure greater than income for the year"],
      ["Subscriptions in arrears", "Amounts members owe for past periods"],
      ["Entrance fee", "A one-off payment made by a new member on joining"],
    ],
    explanation: "These terms replace the sales, profit and capital language of a trading business.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements about club accounts.",
    template: "A receipts and payments account is a summary of the {{blank:a}}. Opening balance + receipts − payments = {{blank:b}}. A club's capital is called the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["cash book"], choices: ["cash book", "general journal", "sales journal"] },
      { id: "b", accepted: ["closing balance"], choices: ["closing balance", "surplus", "accumulated fund"] },
      { id: "c", accepted: ["accumulated fund"], choices: ["accumulated fund", "general reserve", "surplus"] },
    ],
    explanation: "The account summarises the cash book; its balance is cash, not surplus; capital is the accumulated fund.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const assets = [["Sports equipment", 3750], ["Bar inventory", 620], ["Subscriptions in arrears", 210], ["Cash", 455]];
    const liabs = [["Subscriptions in advance", 90], ["Bar supplier owed", 335]];
    const f = fundAtDate("x", "at 1 January 2025", assets, liabs);
    b.num({
      d: 2, kind: "money", value: f.fund, calculator: true, daily: true, wrong: [r2(f.fund + 180)],
      stem: `On 1 January 2025 a netball club had sports equipment ${money(3750)}, bar inventory ${money(620)}, subscriptions in arrears ${money(210)} and cash ${money(455)}. It owed ${money(335)} to its bar supplier, and members had paid ${money(90)} in advance. Calculate the accumulated fund.`,
      explanation: `Assets ${fmt(f.ta)} − liabilities ${fmt(f.tl)} = ${fmt(f.fund)}. Treating the advance subscriptions as an asset gives ${fmt(r2(f.fund + 180))}.`,
    });
  }
  {
    const open = -415, rec = [3920, 1150, 680], pay = [1260, 2045, 1310];
    const close = r2(open + sum(rec) - sum(pay));
    b.calc({
      d: 3, kind: "money", value: close, calculator: true, wrong: [r2(415 + sum(rec) - sum(pay))],
      stem: `A cycling club started 2025 with a bank **overdraft** of ${money(415)}. It received subscriptions ${money(rec[0])}, sponsorship ${money(rec[1])} and race entry fees ${money(rec[2])}, and paid race prizes ${money(pay[0])}, a new trailer ${money(pay[1])} and insurance ${money(pay[2])}. Calculate the bank balance at 31 December 2025 (a positive balance).`,
      hints: ["An opening overdraft reduces the money available."],
      explanation: `−${fmt(415)} + ${fmt(sum(rec))} − ${fmt(sum(pay))} = ${fmt(close)}. Treating the overdraft as money in the bank gives ${fmt(r2(415 + sum(rec) - sum(pay)))}.`,
    });
    check("pos", close > 0, true);
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State **two** sources of income, other than subscriptions, for a school sports club.",
    points: ["One source, e.g. donations / sponsorship / fundraising events", "A second, e.g. a tuck shop or refreshment bar / gate takings / hire of equipment / competition fees"],
    modelAnswer: "Donations from local businesses, and profits from a tuck shop run at matches.",
    explanation: "Any two realistic sources earn the marks.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "The treasurer of a Bulawayo choir says: \"Our receipts and payments account shows US\\$2,600 in the bank, so the choir made a surplus of US\\$2,600.\" Explain why she may be wrong.",
    points: ["The closing balance is cash, not a surplus; it includes the opening balance", "It ignores amounts owing (e.g. unpaid hall hire) and amounts in arrears or in advance", "It ignores depreciation and includes capital items, so only an income and expenditure account shows the surplus"],
    modelAnswer: "US\\$2,600 is the money in the bank, which includes cash left from previous years. The account ignores bills still owing and subscriptions in advance or arrears, has no depreciation, and mixes in capital items. The surplus must be calculated in an income and expenditure account.",
    hints: ["What does the closing balance actually measure?"],
    explanation: "Cash and surplus are different measures.",
  });

  // ---------------------------------------------------------------- Practice structured 1: prepare a receipts and payments account
  {
    const rec = [["1 Jan 2025", "Balance b/d", 1615], ["", "Subscriptions", 8460], ["", "Entrance fees", 720], ["", "Donations", 2250], ["", "Tuck shop sales", 3380]];
    const pay = [["", "Tuck shop purchases", 2170], ["", "Hire of sports hall", 3600], ["", "Purchase of table tennis tables", 2850], ["", "Transport to tournaments", 1945], ["", "Stationery and printing", 410]];
    const close = r2(sum(rec.map((x) => x[2])) - sum(pay.map((x) => x[2])));
    const rp = tAccount("Receipts and payments account for the year ended 31 December 2025", rec, pay, { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
    const list = table(["Item", U], [["Bank balance, 1 January 2025", 1615], ...rec.slice(1).map((x) => [`Received: ${x[1].toLowerCase()}`, x[2]]), ...pay.map((x) => [`Paid: ${x[1].toLowerCase()}`, x[2]])]);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `The treasurer of Gweru Table Tennis Club gives you this summary of the club's bank transactions for the year ended 31 December 2025:\n\n${list}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: sum(rec.map((x) => x[2])), wrong: [sum(rec.slice(1).map((x) => x[2]))], stem: "Calculate the total of the receipts side, including the opening balance.", explanation: `${rec.map((x) => fmt(x[2])).join(" + ")} = ${fmt(sum(rec.map((x) => x[2])))}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: close, wrong: [r2(close + 2850)], stem: "Calculate the bank balance at 31 December 2025.", explanation: `${fmt(sum(rec.map((x) => x[2])))} − ${fmt(sum(pay.map((x) => x[2])))} = ${fmt(close)}. Leaving out the tables (a capital item) gives ${fmt(r2(close + 2850))}, but every payment is included.` }),
        P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the club's receipts and payments account for the year ended 31 December 2025.", points: ["Heading with the club's name and the period", "Opening balance b/d on the receipts side", "All four receipts on the debit side", "All five payments on the credit side", `Balance c/d ${fmt(close)}, totals and balance b/d on 1 January 2026`], modelAnswer: `**Gweru Table Tennis Club**\n\n${rp}`, explanation: "Receipts on the left, payments on the right, balance c/d to make the totals agree." }),
        P.tf({ label: "(d)", stem: "The receipts and payments account shows that the club made a surplus in 2025.", answer: false, explanation: "False. It shows cash only; a surplus needs an income and expenditure account." }),
      ],
      hints: ["Every amount paid goes in, including equipment bought."],
      explanation: `Model answer:\n\n**Gweru Table Tennis Club**\n\n${rp}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: accumulated fund and limitations
  {
    const assets = [["Clubhouse", 28000], ["Furniture and equipment", 5460], ["Bar inventory", 1280], ["Subscriptions in arrears", 540], ["Bank", 3175]];
    const liabs = [["Subscriptions in advance", 360], ["Bar payables", 905], ["Rates owing", 470]];
    const f = fundAtDate("Chinhoyi Rotaract Social Club", "at 1 January 2025", assets, liabs);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Chinhoyi Rotaract Social Club had the following balances at 1 January 2025:\n\n${table(["", U], [...assets, ...liabs])}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: f.ta, wrong: [r2(f.ta + 360)], stem: "Calculate the club's total assets at 1 January 2025.", explanation: `${assets.map((x) => fmt(x[1])).join(" + ")} = ${fmt(f.ta)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: f.fund, wrong: [r2(f.fund + 720), r2(f.fund - 1080)], stem: "Calculate the accumulated fund at 1 January 2025.", explanation: `${fmt(f.ta)} − (${fmt(360)} + ${fmt(905)} + ${fmt(470)}) = ${fmt(f.fund)}. Treating subscriptions in advance as an asset gives ${fmt(r2(f.fund + 720))}; treating arrears as a liability gives ${fmt(r2(f.fund - 1080))}.` }),
        P.manual({ label: "(c)", marks: 3, stem: "The club's members want to know whether the club is paying its way. Explain **three** reasons why a receipts and payments account alone cannot tell them.", points: ["No adjustment for amounts owing / prepaid / subscriptions in arrears or advance", "Capital items (e.g. equipment bought) are mixed with running costs; no depreciation", "No surplus or deficit and no list of assets and liabilities / accumulated fund"], modelAnswer: "It records only cash, so bills still owing and subscriptions in arrears or in advance are ignored. It treats equipment bought like a running cost and has no depreciation. It therefore gives no surplus or deficit and no statement of what the club owns and owes.", hints: ["Think about what a receipts and payments account leaves out."], explanation: "An income and expenditure account and statement of financial position are needed." }),
      ],
      hints: ["Subscriptions in arrears are owed to the club; subscriptions in advance are owed by it."],
      explanation: `Model answer:\n\n${f.md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Accumulated fund", "A club's capital: total assets − total liabilities. Surpluses are added to it; deficits are deducted.");
  b.card("DEFINITION", "Surplus / deficit", "Surplus: income > expenditure. Deficit: expenditure > income. The club's profit and loss.");
  b.card("DEFINITION", "Receipts and payments account", "A summary of a club's cash book: opening balance + receipts − payments = closing balance.");
  b.card("FACT", "Limitations of a receipts and payments account", "Ignores accruals, prepayments and arrears; mixes capital and revenue items; no depreciation; no surplus or deficit.");
  b.card("FACT", "Subscriptions in arrears vs in advance", "Arrears (owed by members) = asset. Advance (paid early by members) = liability.");
  b.card("FACT", "ZIMSEC and Cambridge names for clubs", "ZIMSEC: non-trading concerns / not-for-profit making organisations. Cambridge: clubs and societies.");
  b.card("CONCEPT", "Sources of income for a club", "Subscriptions, entrance fees, donations, fundraising events, bar or tuck shop profits, gate takings, competition fees, hire charges.");
  b.card("FACT", "Opening overdraft in a receipts and payments account", "Shown as balance b/d on the payments (credit) side.");
});
