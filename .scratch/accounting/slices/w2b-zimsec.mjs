// W2b: ZIMSEC Paper 2 exam-format items (20 marks): (1) suspense account, journal corrections and corrected net
// profit; (2) updated cash book and bank reconciliation statement.
import { concept, P, money, tAccount, journal, balanceOf, sum, r2, check, ZIM } from "../lib.mjs";
import { table, suspense, correctedProfit, bankRec } from "../tables/w2b-lib.mjs";

concept("acc.verification.suspense-account", { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ---------------------------------------------------------------------------------------------------------------
  // Item 1: Rudo Chikore, Kwekwe hardware: suspense, journal, corrected net profit
  const draftNP = 13742;
  const errs = [
    { t: "The sales journal was undercast by US\\$1,100.", j: [["Suspense", 1100, null], ["Sales", null, 1100]], n: "Sales journal undercast", np: 1100, np_l: "Sales journal undercast" },
    { t: "Repairs to the delivery van, US\\$386, were debited to the motor vehicles account.", j: [["Motor repairs", 386, null], ["Motor vehicles", null, 386]], n: "Repairs wrongly debited to motor vehicles", np: -386, np_l: "Motor repairs" },
    { t: "Discount received of US\\$157 in the cash book was not posted to the discount received account.", j: [["Suspense", 157, null], ["Discount received", null, 157]], n: "Discount received not posted", np: 157, np_l: "Discount received omitted" },
    { t: "Wages of US\\$1,245 paid by bank were posted to the wages account as US\\$1,425.", j: [["Suspense", 180, null], ["Wages", null, 180]], n: "Wages over-posted (1,425 instead of 1,245)", np: 180, np_l: "Wages overstated" },
    { t: "A cheque for US\\$694 received from Mlambo, a debtor, was credited to his account as US\\$649.", j: [["Suspense", 45, null], ["Mlambo", null, 45]], n: "Receipt from Mlambo under-posted", np: 0 },
    { t: "Goods of US\\$238 returned to Zhou, a creditor, were correctly debited to Zhou's account and also debited to the returns outwards account.", j: [["Suspense", 476, null], ["Returns outwards", null, 476]], n: "Returns outwards debited instead of credited", np: 476, np_l: "Returns outwards understated" },
  ];
  const sDr = errs.flatMap((e) => e.j.filter((l) => l[0] === "Suspense" && l[1]).map((l) => ["30 Jun", e.j.find((x) => x[0] !== "Suspense")[0], l[1]]));
  const sCr = errs.flatMap((e) => e.j.filter((l) => l[0] === "Suspense" && l[2]).map((l) => ["30 Jun", e.j.find((x) => x[0] !== "Suspense")[0], l[2]]));
  const diff = r2(sum(sDr.map((x) => x[2])) - sum(sCr.map((x) => x[2])));
  check("diff", diff, 1958);
  const sMd = suspense("Suspense account", sDr, [["30 Jun", "Difference in books", diff], ...sCr]);
  const jMd = journal(errs.map((e) => ({ date: "30 Jun", lines: e.j, narrative: e.n })));
  const cp = correctedProfit("Rudo Chikore: Statement of corrected net profit for the year ended 30 June 2025", draftNP, errs.filter((e) => e.np).map((e) => [e.np_l, e.np]), { draftLabel: "Net profit as per draft income statement", finalLabel: "Corrected net profit" });
  check("np", cp.corrected, 15269);

  b.struct({
    d: 5, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.verification.suspense-account", "acc.verification.correcting-errors", "acc.verification.errors-effect-on-profit"],
    stem: `Rudo Chikore owns a hardware shop in Kwekwe. Her trial balance at 30 June 2025 did not agree and the difference was entered in a suspense account. Her draft income statement showed a net profit of ${money(draftNP)}. The following errors were then found:\n\n` + table(["No.", "Error"], errs.map((e, i) => [String(i + 1), e.t])),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which error did **not** affect the agreement of the trial balance?",
        options: [["Error 2", "Correct: an error of principle with equal debit and credit."], ["Error 4", "Wages were debited 180 too much: the totals disagreed."], ["Error 5", "Mlambo was credited 45 too little: the totals disagreed."], ["Error 6", "Two debits and no credit: the totals disagreed."]],
        answer: "A", explanation: "Error 2 put the right amount on each side, in the wrong class of account.",
      }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: diff, wrong: [r2(diff - 238), r2(diff - 2 * 180)], stem: "Calculate the difference in books that was entered in the suspense account. (It was entered on the credit side.)", explanation: `Suspense entries needed: debit 1,100 (sales) + 157 (discount received) + 180 (wages) + 45 (Mlambo) + 476 (returns outwards, twice 238) = ${diff.toLocaleString("en-GB")}. No suspense entries are credits, so the account was opened with a credit of ${diff.toLocaleString("en-GB")}: the debit side of the trial balance was larger. Using 238 instead of 476 for error 6 gives ${r2(diff - 238).toLocaleString("en-GB")}.` }),
      P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare journal entries to correct errors 1, 2, 3, 4 and 6. Narratives are not required.", points: ["Error 1: debit suspense 1,100; credit sales 1,100", "Error 2: debit motor repairs 386; credit motor vehicles 386", "Error 3: debit suspense 157; credit discount received 157", "Error 4: debit suspense 180; credit wages 180", "Error 6: debit suspense 476; credit returns outwards 476"], modelAnswer: jMd, explanation: "One side to the wrong account, the other to suspense (except error 2)." }),
      P.fib({
        label: "(d)", stem: "Complete the journal entry to correct error 5, and the amount of the correction for error 6.",
        template: "Error 5: debit {{blank:a}} US\\$45; credit {{blank:b}} US\\$45. Error 6: returns outwards is credited with US\\$ {{blank:c}}.",
        blanks: [{ id: "a", accepted: ["Suspense"], choices: ["Suspense", "Mlambo", "Bank", "Sales"] }, { id: "b", accepted: ["Mlambo"], choices: ["Suspense", "Mlambo", "Bank", "Sales"] }, { id: "c", accepted: ["476"], choices: ["238", "476", "714"] }],
        explanation: "Mlambo was credited 649 instead of 694: credit Mlambo 45 more; the other side is suspense. Returns outwards was debited 238 instead of credited, so it needs a credit of $2 \\times 238 = 476$.",
      }),
      P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the suspense account, showing the difference in books.", points: [`Difference in books ${diff.toLocaleString("en-GB")} on the credit side`, "Sales 1,100, Discount received 157, Wages 180, Mlambo 45 and Returns outwards 476 on the debit side", `Totals ${diff.toLocaleString("en-GB")} on each side; no balance remains`], modelAnswer: sMd, explanation: "The account clears once all suspense errors are corrected." }),
      P.num({ label: "(f)", marks: 5, kind: "money", value: cp.corrected, wrong: [r2(cp.corrected + 2 * 386), r2(cp.corrected - 238)], stem: "Calculate Rudo's corrected net profit for the year ended 30 June 2025.", explanation: `13,742 + 1,100 (sales) + 157 (discount received) + 180 (wages) + 476 (returns outwards) − 386 (motor repairs) = ${cp.corrected.toLocaleString("en-GB")}. Error 5 has no effect on profit.` }),
    ],
    hints: ["For each error write: done, should have been, correction.", "Suspense takes the other side whenever only one side was wrong."],
    explanation: "This item tests the suspense account, journal corrections and the corrected net profit (ZIMSEC Paper 2 style).",
  });
  check("item1 marks", 1 + 3 + 5 + 3 + 3 + 5, 20);

  // ---------------------------------------------------------------------------------------------------------------
  // Item 2: Sipho Dube, Bulawayo printing: updated cash book and bank reconciliation
  const open = 3184;
  const cDr = [["30 Nov", "Balance b/d", open], ["30 Nov", "Lobengula School (credit transfer)", 1860], ["30 Nov", "Ncube Paper (error: 592 − 529)", 63], ["30 Nov", "Interest received", 19]];
  const cCr = [["30 Nov", "Bank charges", 57], ["30 Nov", "Rent (standing order)", 725], ["30 Nov", "N. Sibanda (dishonoured cheque)", 412], ["30 Nov", "Insurance (direct debit)", 136]];
  const ub = balanceOf(cDr, cCr);
  check("ub", ub.amount, 3796);
  const cbMd = tAccount("Cash book (bank columns) of Sipho Dube", cDr, cCr, { cdDate: "30 Nov", bdDate: "1 Dec" });
  const stmt = r2(ub.amount + 1147 + 388 - 2265 + 240);
  check("stmt", stmt, 3306);
  const rec = bankRec("Sipho Dube: Bank reconciliation statement at 30 November 2025", { start: ub.amount, add: [["Unpresented cheque: Mzilikazi Inks", 1147], ["Unpresented cheque: Tshabalala Motors", 388], ["Bank error: deposit of another customer", 240]], less: [["Uncredited deposit", 2265]], statement: stmt });
  b.struct({
    d: 4, secs: 1260, examStyle: true, skill: "APPLICATION", calculator: true,
    concepts: ["acc.verification.updating-cash-book", "acc.verification.bank-reconciliation"],
    stem: `Sipho Dube runs a printing business in Bulawayo. On 30 November 2025 his cash book showed a debit bank balance of ${money(open)}. When he received his bank statement for November he found:\n\n` + table(["No.", "Item"], [
      ["1", "Bank charges of US\\$57 had not been entered in the cash book"],
      ["2", "A standing order for rent of US\\$725 had not been entered in the cash book"],
      ["3", "Lobengula School, a debtor, had paid US\\$1,860 directly into the bank by credit transfer"],
      ["4", "A cheque for US\\$412 from N. Sibanda, a debtor, had been dishonoured"],
      ["5", "A direct debit of US\\$136 for insurance had not been entered in the cash book"],
      ["6", "A cheque for US\\$529 paid to Ncube Paper had been entered in the cash book as US\\$592"],
      ["7", "Interest of US\\$19 had been added to the account by the bank"],
      ["8", "Cheques to Mzilikazi Inks (US\\$1,147) and Tshabalala Motors (US\\$388) had not been presented for payment"],
      ["9", "Takings of US\\$2,265 deposited on 30 November did not appear on the statement"],
      ["10", "The bank had credited Sipho's account with a deposit of US\\$240 belonging to another customer"],
    ]),
    parts: [
      P.mcq({
        label: "(a)", stem: "Which items are **not** entered in the updated cash book?",
        options: [["Items 8, 9 and 10", "Correct: timing differences and a bank error belong in the reconciliation."], ["Items 1, 2 and 5", "Charges, standing orders and direct debits must be entered."], ["Items 3, 4 and 7", "These were unknown to Sipho and must be entered."], ["Items 6, 9 and 10", "Item 6 is Sipho's own error and must be corrected in the cash book."]],
        answer: "A", explanation: "Only items the business did not know about and its own errors are entered in the cash book.",
      }),
      P.num({ label: "(b)", marks: 5, kind: "money", value: ub.amount, wrong: [r2(ub.amount - 2 * 63), r2(ub.amount - 1147 - 388 + 2265)], stem: "Calculate the updated cash book balance at 30 November 2025.", explanation: `Item 6: the payment was overstated by 592 − 529 = 63, so 63 is debited. Debits: 3,184 + 1,860 + 63 + 19 = 5,126. Credits: 57 + 725 + 412 + 136 = 1,330. Balance = 5,126 − 1,330 = ${ub.amount.toLocaleString("en-GB")} debit.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Sipho's updated cash book (bank columns) and bring down the balance on 1 December 2025.", points: ["Balance b/d 3,184, credit transfer 1,860, error 63 and interest 19 on the debit side", "Bank charges 57, rent 725, dishonoured cheque 412 and insurance 136 on the credit side", "Balance c/d 3,796 dated 30 Nov; totals 5,126 on both sides", "Balance b/d 3,796 on the debit side dated 1 Dec"], modelAnswer: cbMd, explanation: "Items 8 to 10 are left for the reconciliation." }),
      P.num({ label: "(d)", marks: 4, kind: "money", value: stmt, wrong: [r2(ub.amount + 1147 + 388 - 2265 - 240), r2(ub.amount - 1147 - 388 + 2265 + 240)], stem: "Calculate the balance shown on the bank statement at 30 November 2025.", explanation: `3,796 + 1,147 + 388 (unpresented cheques) − 2,265 (uncredited deposit) + 240 (bank error: the bank shows more than it should) = ${stmt.toLocaleString("en-GB")}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Sipho's bank reconciliation statement at 30 November 2025, starting with the updated cash book balance.", points: ["Heading and starting balance 3,796", "Add unpresented cheques 1,147 and 388", "Add bank error 240; less uncredited deposit 2,265", `Balance as per bank statement ${stmt.toLocaleString("en-GB")}`], modelAnswer: rec.md, explanation: "Every remaining difference is explained." }),
      P.manual({ label: "(f)", marks: 2, stem: "State **two** reasons why Sipho should prepare a bank reconciliation statement every month.", points: ["One reason: to check the cash book balance is correct / detect errors by the business or the bank", "Second reason: to detect fraud / identify old unpresented cheques / keep records up to date"], modelAnswer: "To check that his cash book balance is correct and find errors (such as the bank's 240 error), and to detect fraud or cheques that have been unpresented for a long time.", explanation: "Purposes of bank reconciliation." }),
    ],
    hints: ["Update the cash book first; leave timing differences and bank errors for the reconciliation."],
    explanation: "This item tests the updated cash book and the bank reconciliation statement (ZIMSEC Paper 2 style).",
  });
  check("item2 marks", 1 + 5 + 4 + 4 + 4 + 2, 20);
});
