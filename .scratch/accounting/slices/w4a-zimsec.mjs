// W4a: ZIMSEC Paper 2 exam-format items (20 marks): partnership appropriation and current accounts; non-trading
// concern income and expenditure account with subscriptions.
import { concept, P, money, r2, sum, check, ZIM } from "../lib.mjs";
import { appropriation, columnar, subscriptions, activity, incomeExpenditure, fundAtDate, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.partnerships.appropriation", { file: "exam/w4a-zimsec", keyPrefix: "exam.w4a-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------ 1. Partnership: appropriation and current accounts
  {
    const partners = ["Chipo", "Farai"];
    const draft = 46830, loan = 14000, loanRate = 7.5;
    const loanInt = r2(loan * loanRate / 100);
    const np = r2(draft - loanInt);
    const caps = [46000, 35000];
    const ioc = caps.map((c) => r2(c * 0.06));
    const draws = [[12800, 9], [27600, 6]]; // amount, months to year end
    const iod = draws.map(([a, m]) => r2(a * 0.1 * m / 12));
    const a = appropriation({ name: "Chipo and Farai Transport", partners, profit: np, profitLabel: "Net profit for the year", iod, ioc, salary: [0, 8400], ratio: [3, 2] });
    const c = columnar("Current accounts", partners,
      [["1 Jan 2025", "Balance b/d", [null, 1240]], ["31 Dec 2025", "Drawings", draws.map((x) => x[0])], ["31 Dec 2025", "Interest on drawings", iod]],
      [["1 Jan 2025", "Balance b/d", [2150, null]], ["31 Dec 2025", "Interest on capital", ioc], ["31 Dec 2025", "Salary", [null, 8400]], ["31 Dec 2025", "Interest on loan", [null, loanInt]], ["31 Dec 2025", "Share of profit", a.shares]]);
    check("farai debit", c.closing[1] < 0, true);
    check("chipo credit", c.closing[0] > 0, true);
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
      concepts: ["acc.partnerships.appropriation", "acc.partnerships.capital-current-accounts", "acc.partnerships.formation"],
      stem: `Chipo and Farai are in partnership as transport operators in Mutare, sharing profits and losses in the ratio 3 : 2. Their partnership agreement provides for:\n\n- interest on fixed capitals at 6% per annum;\n- interest on drawings at 10% per annum;\n- a salary for Farai of ${money(8400)} per annum;\n- interest at ${loanRate}% per annum on any loan made by a partner.\n\nThe following information is available for the year ended 31 December 2025:\n\n${table(["", `Chipo ${U}`, `Farai ${U}`], [["Capital account (fixed)", caps[0], caps[1]], ["Current account at 1 January 2025", "2,150 Cr", "1,240 Dr"], ["Drawings", draws[0][0], draws[1][0]], ["Date of drawings", "1 April 2025", "1 July 2025"]])}\n\nOn 1 January 2025 Farai lent the partnership ${money(loan)}. The draft net profit for the year was ${money(draft)}. No interest on the loan has been paid or recorded; it is to be credited to Farai's current account.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: np, wrong: [draft, r2(draft + loanInt)], stem: "Calculate the corrected net profit for the year.", explanation: `Loan interest ${fmt(loan)} × ${loanRate}% = ${fmt(loanInt)} is an expense: ${fmt(draft)} − ${fmt(loanInt)} = ${fmt(np)}.` }),
        P.num({ label: "(b)", marks: 4, kind: "money", value: a.residual, wrong: [r2(np - a.iocTot - 8400), r2(draft + a.iodTot - a.iocTot - 8400)], stem: "Calculate the residual profit to be shared in the profit-sharing ratio.", explanation: `Interest on drawings: Chipo ${fmt(draws[0][0])} × 10% × 9/12 = ${fmt(iod[0])}; Farai ${fmt(draws[1][0])} × 10% × 6/12 = ${fmt(iod[1])}; total ${fmt(a.iodTot)}. Interest on capital ${fmt(ioc[0])} + ${fmt(ioc[1])} = ${fmt(a.iocTot)}. Residual = ${fmt(np)} + ${fmt(a.iodTot)} − ${fmt(a.iocTot)} − ${fmt(8400)} = ${fmt(a.residual)}.` }),
        P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the appropriation account for the year ended 31 December 2025.", points: [`Net profit ${fmt(np)} and interest on drawings added (${fmt(iod[0])}, ${fmt(iod[1])})`, `Interest on capital (${fmt(ioc[0])}, ${fmt(ioc[1])}) and Farai's salary ${fmt(8400)} deducted`, `Residual profit ${fmt(a.residual)} (own figure)`, `Shares 3 : 2: Chipo ${fmt(a.shares[0])}, Farai ${fmt(a.shares[1])} (own figure)`], modelAnswer: a.md, explanation: "Loan interest is not in the appropriation account: it was deducted to find the net profit." }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the partners' current accounts in columnar form for the year ended 31 December 2025, bringing down the balances on 1 January 2026.", points: ["Opening balances: Chipo credit 2,150; Farai debit 1,240", "Drawings and interest on drawings debited", "Interest on capital and Farai's salary credited", `Interest on loan ${fmt(loanInt)} credited to Farai`, "Shares of profit credited (own figures)", "Balances c/d on the correct sides and brought down"], modelAnswer: c.md, explanation: "Balance each partner's column separately." }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: c.closing[0], wrong: [r2(c.closing[0] + 2 * iod[0])], stem: "State the balance on Chipo's current account at 31 December 2025 (credit).", explanation: `2,150 + ${fmt(ioc[0])} + ${fmt(a.shares[0])} − ${fmt(draws[0][0])} − ${fmt(iod[0])} = ${fmt(c.closing[0])}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: -c.closing[1], wrong: [r2(-c.closing[1] - 2480), r2(-c.closing[1] + loanInt)], stem: "State the balance on Farai's current account at 31 December 2025. (It is a debit balance; enter the amount.)", explanation: `Credits ${fmt(ioc[1])} + ${fmt(8400)} + ${fmt(loanInt)} + ${fmt(a.shares[1])} = ${fmt(r2(ioc[1] + 8400 + loanInt + a.shares[1]))}; debits 1,240 + ${fmt(draws[1][0])} + ${fmt(iod[1])} = ${fmt(r2(1240 + draws[1][0] + iod[1]))}; balance ${fmt(-c.closing[1])} debit. Leaving out the loan interest gives ${fmt(r2(-c.closing[1] + loanInt))}.` }),
      ],
      hints: ["Loan interest is an expense: correct the net profit first.", "Interest on drawings runs from the date of drawing to 31 December."],
      explanation: `Model answers:\n\n${a.md}\n\n${c.md}`,
    });
  }

  // ------------------------------------------------------------------ 2. Non-trading concern: income and expenditure with subscriptions
  {
    const openA = [["Clubhouse equipment (net book value)", 14600], ["Bar inventory", 1830], ["Subscriptions in arrears", 435], ["Bank", 3065]];
    const openL = [["Subscriptions in advance", 270], ["Bar payables", 1145], ["Rates owing", 380]];
    const f = fundAtDate("Bulawayo Bowling Club", "at 1 January 2025", openA, openL);
    const subsD = { openArrears: 435, openAdvance: 270, received: 12960, closeArrears: 515, closeAdvance: 345 };
    const s = subscriptions(subsD);
    const barPaid = 14370, barCloseP = 1290;
    const purch = r2(barPaid - 1145 + barCloseP);
    const bar = activity({ name: "Bulawayo Bowling Club", title: "Bar trading account", sales: 21470, openInv: 1830, purchases: purch, closeInv: 2015, expenses: [["Barman's wages", 3120]] });
    const rates = r2(2450 - 380 + 395);
    const dep = r2((14600 + 2350) * 0.1);
    const ie = incomeExpenditure({ name: "Bulawayo Bowling Club", income: [["Subscriptions", s.ie], ["Profit on bar", bar.profit], ["Competition fees", 1860]], expenditure: [["Greenkeeper's wages", 9600], ["Rates", rates], ["Repairs to greens", 1725], ["Depreciation of equipment", dep]] });
    b.struct({
      d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
      concepts: ["acc.clubs.income-expenditure", "acc.clubs.subscriptions-activities", "acc.clubs.receipts-payments"],
      stem: `Bulawayo Bowling Club is a non-trading concern. Its assets and liabilities at 1 January 2025 were:\n\n${table(["", U], [...openA, ...openL])}\n\nA summary of its receipts and payments account for the year ended 31 December 2025 showed:\n\n${table(["", U], [["Subscriptions received", subsD.received], ["Bar sales", 21470], ["Competition fees received", 1860], ["Paid to bar suppliers", barPaid], ["Barman's wages", 3120], ["Greenkeeper's wages", 9600], ["Rates", 2450], ["Repairs to greens", 1725], ["New equipment", 2350]])}\n\nAt 31 December 2025: subscriptions in arrears were ${money(subsD.closeArrears)} and in advance ${money(subsD.closeAdvance)}; bar inventory was ${money(2015)}; bar payables were ${money(barCloseP)}; rates owing were ${money(395)}. Equipment is depreciated at 10% per annum on the net book value at 1 January plus additions during the year.`,
      parts: [
        P.num({ label: "(a)", marks: 3, kind: "money", value: f.fund, wrong: [r2(f.fund + 540), r2(f.ta)], stem: "Calculate the accumulated fund at 1 January 2025.", explanation: `Assets ${fmt(f.ta)} − liabilities ${fmt(f.tl)} = ${fmt(f.fund)}. Subscriptions in advance are a liability; treating them as an asset gives ${fmt(r2(f.fund + 540))}.` }),
        P.manual({ label: "(b)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the subscriptions account for the year ended 31 December 2025.", points: ["Opening arrears 435 debit and opening advance 270 credit", `Bank ${fmt(subsD.received)} credit`, `Transfer to income and expenditure ${fmt(s.ie)} (own figure)`, "Closing balances c/d (advance 345 debit, arrears 515 credit) and b/d"], modelAnswer: s.md, explanation: "The transfer is the balancing figure." }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: s.ie, wrong: [subsD.received], stem: "State the subscriptions income for the year.", explanation: `${fmt(subsD.received)} − 435 + 270 + 515 − 345 = ${fmt(s.ie)}.` }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: bar.profit, wrong: [r2(21470 - (1830 + barPaid - 2015) - 3120), bar.gp], stem: "Calculate the profit on the bar.", explanation: `Purchases ${fmt(barPaid)} − 1,145 + ${fmt(barCloseP)} = ${fmt(purch)}. Cost of sales 1,830 + ${fmt(purch)} − 2,015 = ${fmt(bar.cos)}. Gross profit ${fmt(bar.gp)} − barman's wages 3,120 = ${fmt(bar.profit)}.` }),
        P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year ended 31 December 2025.", points: [`Income: subscriptions ${fmt(s.ie)}, profit on bar ${fmt(bar.profit)}, competition fees 1,860`, "Greenkeeper's wages and repairs", `Rates ${fmt(rates)} (2,450 − 380 + 395)`, `Depreciation ${fmt(dep)}; new equipment NOT included`, `Surplus ${fmt(ie.surplus)} (own figure)`], modelAnswer: ie.md, explanation: "Income less expenditure gives the surplus." }),
        P.num({ label: "(f)", marks: 3, kind: "money", value: r2(f.fund + ie.surplus), wrong: [r2(f.fund - ie.surplus)], stem: "Calculate the accumulated fund at 31 December 2025.", explanation: `${fmt(f.fund)} + surplus ${fmt(ie.surplus)} = ${fmt(r2(f.fund + ie.surplus))}.` }),
      ],
      hints: ["Prepare workings for subscriptions, bar purchases, rates and depreciation.", "New equipment is capital expenditure."],
      explanation: `Model answers:\n\n${f.md}\n\n${s.md}\n\n${bar.md}\n\n${ie.md}`,
    });
  }
});
