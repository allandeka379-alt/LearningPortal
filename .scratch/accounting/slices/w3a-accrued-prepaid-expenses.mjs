// W3a: accrued and prepaid expenses.
import { concept, P, money, check, sum, r2, tAccount, statement } from "../lib.mjs";
import { table, U } from "../tables/w3a-lib.mjs";

const f = (v) => v.toLocaleString("en-GB", { maximumFractionDigits: 2, minimumFractionDigits: Number.isInteger(v) ? 0 : 2 });

concept("acc.adjustments.accrued-prepaid-expenses", { file: "adjustments/accrued-prepaid-expenses", keyPrefix: "adjustments.accrued-prepaid-expenses" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is an **accrued expense**?",
    options: [
      ["An expense of the current year not yet paid at the year end", "Correct: it is owed, so it is a current liability."],
      ["An expense paid during this year that belongs to next year", "That is a prepaid expense."],
      ["Income earned but not yet received", "That is accrued income."],
      ["An expense that will never be paid", "Accrued expenses are expected to be paid soon."],
    ],
    answer: "A",
    explanation: "An accrual is an expense incurred in the year but still owing at the year end.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How is a prepaid expense shown in the statement of financial position?",
    options: [
      ["As a current asset (other receivables)", "Correct: the business is owed a service."],
      ["As a current liability (other payables)", "Accrued expenses are liabilities, not prepayments."],
      ["As a non-current asset", "The benefit is used within the next year."],
      ["It is not shown", "It is an asset at the year end and must be shown."],
    ],
    answer: "A",
    explanation: "A prepayment is a current asset: the business has paid for a service it will receive next year.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which accounting concept requires accruals and prepayments to be adjusted at the year end?",
    options: [
      ["Matching (accruals)", "Correct: expenses belong to the period in which they are incurred."],
      ["Consistency", "Consistency means using the same methods each year."],
      ["Business entity", "Business entity separates the owner from the business."],
      ["Money measurement", "Money measurement limits records to items with a money value."],
    ],
    answer: "A",
    explanation: "The matching concept matches expenses to the period they relate to, not the period of payment.",
  });
  const w = { paid: 7820, acc: 690 };
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Wages paid during the year were US\\$7,820. At the year end wages of US\\$690 were owing. What is the wages expense for the year?",
    options: [
      [money(r2(w.paid + w.acc)), "Correct: amount paid plus the amount owing."],
      [money(r2(w.paid - w.acc)), "The accrual was subtracted instead of added."],
      [money(w.paid), "This ignores the wages owing."],
      [money(w.acc), "This is only the accrual."],
    ],
    answer: "A",
    explanation: `7,820 + 690 = ${f(r2(w.paid + w.acc))}.`,
  });
  const ins = { paid: 2160, months: 12, date: "1 September 2025" };
  const insPre = r2((ins.paid * 8) / 12);
  b.mcq({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "On 1 September 2025 a business paid insurance of US\\$2,160 for the year to 31 August 2026. Its year ends on 31 December 2025. What is the prepayment at 31 December 2025?",
    options: [
      [money(insPre), "Correct: January to August 2026 is 8 months."],
      [money(r2((ins.paid * 4) / 12)), "This is the part that belongs to 2025 (4 months)."],
      [money(ins.paid), "Not all of it is prepaid; 4 months belong to 2025."],
      [money(r2((ins.paid * 9) / 12)), "This counts 9 months; January to August is 8."],
    ],
    answer: "A",
    hints: ["Count the months after 31 December 2025 that have been paid for."],
    explanation: `2,160 ÷ 12 = 180 a month; 8 months prepaid: ${f(insPre)}. The expense for 2025 is 4 × 180 = 720.`,
  });
  check("insPre", insPre, 1440);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A trader forgets to record a closing accrual for electricity of US\\$260. What is the effect on the financial statements?",
    options: [
      ["Profit is overstated by US\\$260 and current liabilities understated by US\\$260", "Correct: the expense is too low and the amount owing is missing."],
      ["Profit is understated by US\\$260 and current assets overstated by US\\$260", "Missing an accrual makes the expense too low, so profit is too high."],
      ["Profit is overstated by US\\$260 and current assets understated by US\\$260", "An accrual is a liability, not an asset."],
      ["Profit is correct, but current liabilities are understated by US\\$260", "The expense is understated, so profit is affected."],
    ],
    answer: "A",
    hints: ["An accrual adds to the expense and is a liability."],
    explanation: "Without the accrual the expense is 260 too low (profit 260 too high) and other payables are 260 too low.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "On which side of an expense account is a **closing prepayment** carried down (c/d)?",
    options: [
      ["Credit side, then brought down on the debit side", "Correct: the balance b/d is a debit (an asset)."],
      ["Debit side, then brought down on the credit side", "That is how a closing accrual is carried down."],
      ["Credit side, then brought down on the credit side", "A balance carried down on one side is brought down on the other."],
      ["It is not carried down; it goes straight to the income statement", "The prepayment is next year's expense, so it stays in the account."],
    ],
    answer: "A",
    hints: ["A prepayment is an asset at the start of next year."],
    explanation: "The prepaid c/d is on the credit side and the prepaid b/d on the debit side.",
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A closing prepayment reduces the expense shown in the income statement.",
    answer: true,
    explanation: "True. Part of the amount paid belongs to next year, so it is deducted.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An opening accrual increases the expense for the current year.",
    answer: false,
    explanation: "False. The opening accrual was last year's expense; when paid this year it is deducted from the amount paid.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its effect on this year's expense.",
    pairs: ["Closing accrual", "Closing prepayment", "Opening accrual", "Opening prepayment"],
    right: ["Added to the amount paid", "Deducted from the amount paid"],
    rightIndex: [0, 1, 1, 0],
    explanation: "Expense = paid − opening accrual + opening prepayment + closing accrual − closing prepayment.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the year-end journal entry for rent owing of US\\$350.",
    template: "Debit {{blank:a}} US\\$350; credit {{blank:b}} US\\$350.",
    blanks: [
      { id: "a", accepted: ["Rent"], choices: ["Rent", "Other payables", "Other receivables", "Bank"] },
      { id: "b", accepted: ["Other payables"], choices: ["Other payables", "Rent", "Other receivables", "Bank"] },
    ],
    explanation: "An accrual increases the expense (debit) and creates a liability (credit other payables).",
  });

  const e1 = { oAcc: 245, paid: 4380, cAcc: 310 };
  const e1v = r2(e1.paid - e1.oAcc + e1.cAcc);
  b.num({
    d: 2, kind: "money", value: e1v, daily: true, wrong: [r2(e1.paid + e1.oAcc + e1.cAcc), r2(e1.paid + e1.cAcc)],
    stem: "Telephone charges owing at 1 January 2025 were US\\$245. During 2025 US\\$4,380 was paid. At 31 December 2025 US\\$310 was owing. Calculate the telephone expense for 2025.",
    explanation: `4,380 − 245 + 310 = ${f(e1v)}. Adding the opening accrual gives 4,935; ignoring it gives 4,690.`,
  });
  check("e1v", e1v, 4445);
  const e2 = { oPre: 520, paid: 6240, cPre: 780, cAcc: 0 };
  const e2v = r2(e2.oPre + e2.paid - e2.cPre);
  b.calc({
    d: 3, kind: "money", value: e2v, calculator: true, wrong: [r2(e2.paid - e2.oPre - e2.cPre), r2(e2.paid + e2.cPre - e2.oPre)],
    stem: "Rudo's business rates were prepaid by US\\$520 on 1 January 2025. During 2025 she paid US\\$6,240 for rates. At 31 December 2025 rates of US\\$780 were prepaid. Calculate the rates expense for 2025.",
    hints: ["Opening prepayment: paid last year for this year.", "Closing prepayment: paid this year for next year."],
    explanation: `520 + 6,240 − 780 = ${f(e2v)}. Treating the opening prepayment as an accrual gives 4,940; reversing the closing prepayment gives 6,500.`,
  });
  check("e2v", e2v, 5980);
  const e3 = { monthly: 395, paid: 3950 };
  const e3v = r2(e3.monthly * 12 - e3.paid);
  b.calc({
    d: 3, kind: "money", value: e3v, calculator: true, wrong: [r2(e3.monthly * 12)],
    stem: "Sipho pays rent of US\\$395 a month for his workshop. By 31 December 2025 he had paid US\\$3,950 rent for 2025. There were no balances at 1 January 2025. Calculate the rent accrued at 31 December 2025.",
    hints: ["Rent due for the year: 12 months."],
    explanation: `Due 395 × 12 = 4,740; paid 3,950; accrued ${f(e3v)} (2 months). Giving the rent due for the year (4,740) is the common slip.`,
  });
  check("e3v", e3v, 790);

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a prepaid expense is shown as a current asset.",
    points: ["The business has paid for a service it has not yet received / will receive next period", "So it is owed a benefit within the next 12 months (other receivables)"],
    modelAnswer: "The business has paid in advance for a service it will receive next year, so it is owed that benefit; it will be used within twelve months, making it a current asset.",
    explanation: "A prepayment is a short-term right to receive a service.",
  });

  // Practice structured 1: ledger with opening/closing balances
  const g = { oAcc: 420, paid: 5160, cPre: 360 };
  const gExp = r2(g.paid - g.oAcc - g.cPre);
  check("gExp", gExp, 4380);
  const gMd = tAccount("Advertising account", [["Various", "Bank", g.paid]], [["1 Jan 2025", "Accrued b/d", g.oAcc], ["31 Dec 2025", "Income statement", gExp]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026", cd: "Prepaid c/d", bd: "Prepaid b/d" });
  const k = { oPre: 175, paid: 2940, cAcc: 265 };
  const kExp = r2(k.oPre + k.paid + k.cAcc);
  check("kExp", kExp, 3380);
  const kMd = tAccount("Water account", [["1 Jan 2025", "Prepaid b/d", k.oPre], ["Various", "Bank", k.paid], ["31 Dec 2025", "Accrued c/d", k.cAcc]], [["31 Dec 2025", "Income statement", kExp]]);
  b.struct({
    d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Chipo runs a guest house in Victoria Falls. Her year end is 31 December.\n\n" +
      table(["Expense", `1 January 2025 ${U}`, `Paid in 2025 ${U}`, `31 December 2025 ${U}`], [["Advertising", "420 accrued", g.paid, "360 prepaid"], ["Water", "175 prepaid", k.paid, "265 accrued"]]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: gExp, wrong: [r2(g.paid + g.oAcc - g.cPre)], stem: "Calculate the advertising expense for 2025.", explanation: `5,160 − 420 − 360 = ${f(gExp)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: kExp, wrong: [r2(k.paid - k.oPre + k.cAcc)], stem: "Calculate the water expense for 2025.", explanation: `175 + 2,940 + 265 = ${f(kExp)}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the advertising account for 2025, bringing down the balance on 1 January 2026.", points: ["Accrued b/d 420 on the credit side", "Bank 5,160 on the debit side", "Income statement 4,380 (own figure) on the credit side", "Prepaid c/d 360, totals 5,160 and prepaid b/d 360 on the debit side"], modelAnswer: gMd, explanation: "The opening accrual is a credit balance; the closing prepayment is carried down on the credit side." }),
      P.manual({ label: "(d)", marks: 2, stem: "State how the closing balances on the two accounts appear in the statement of financial position at 31 December 2025.", points: ["Advertising prepaid 360: current asset (other receivables)", "Water accrued 265: current liability (other payables)"], modelAnswer: "Advertising prepaid US\\$360 is a current asset (other receivables); water accrued US\\$265 is a current liability (other payables).", explanation: "Prepayments are assets; accruals are liabilities." }),
    ],
    hints: ["Write the formula: paid − opening accrual + opening prepayment + closing accrual − closing prepayment."],
    explanation: `Water account for reference:\n\n${kMd}\n\n(the accrued b/d of 265 is brought down on the credit side on 1 January 2026).`,
  });

  // Practice structured 2: adjustments from a trial balance, effect on profit
  const tb = { gp: 48600, wages: 14250, wAcc: 680, rent: 9100, rPre: 700, ins: 1980, iPre: 495, other: 6340 };
  const wE = r2(tb.wages + tb.wAcc), rE = r2(tb.rent - tb.rPre), iE = r2(tb.ins - tb.iPre);
  const totE = sum([wE, rE, iE, tb.other]);
  const np = r2(tb.gp - totE);
  const npUnadj = r2(tb.gp - sum([tb.wages, tb.rent, tb.ins, tb.other]));
  check("np", np, 17445);
  const isMd = statement("for the year ended 31 December 2025", [["Gross profit", null, tb.gp], ["Less: Expenses", null, null], ["Wages (14,250 + 680)", wE, null], ["Rent (9,100 − 700)", rE, null], ["Insurance (1,980 − 495)", iE, null], ["Other expenses", tb.other, null], [null, null, -totE], ["**Net profit**", null, `**${f(np)}**`]], { checks: [["totE", totE, 31155], ["np", r2(tb.gp - totE), np]] });
  b.struct({
    d: 5, examStyle: true, skill: "APPLICATION", calculator: true,
    stem: "Farai runs a furniture shop in Gweru. For the year ended 31 December 2025 his gross profit was US\\$48,600. His trial balance included the following expenses (amounts paid):\n\n" +
      table(["Expense", U], [["Wages", tb.wages], ["Rent", tb.rent], ["Insurance", tb.ins], ["Other expenses", tb.other]]) +
      "\n\nAt 31 December 2025: wages of US\\$680 were owing; rent of US\\$700 had been paid in advance; insurance of US\\$495 had been paid in advance.",
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: wE, stem: "Calculate the wages expense for the year.", explanation: "14,250 + 680 = 14,930." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: np, wrong: [npUnadj], stem: "Calculate the net profit (profit for the year).", explanation: `Expenses 14,930 + 8,400 + 1,485 + 6,340 = ${f(totE)}. Net profit 48,600 − ${f(totE)} = ${f(np)}. Without the adjustments: ${f(npUnadj)}.` }),
      P.manual({ label: "(c)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare an extract of the income statement (statement of profit or loss) from gross profit to net profit.", points: ["Heading with the year end", "Wages 14,930 and rent 8,400", "Insurance 1,485 and other expenses 6,340; total expenses 31,155", "Net profit 17,445"], modelAnswer: `**Farai's Furniture**\n\n**Income statement (extract)**\n\n${isMd}`, explanation: "Each adjustment changes one expense line." }),
      P.num({ label: "(d)", marks: 1, kind: "money", value: r2(tb.rPre + tb.iPre), stem: "Calculate the total of other receivables (prepayments) at 31 December 2025.", explanation: "700 + 495 = 1,195." }),
      P.manual({ label: "(e)", marks: 2, stem: "Farai asks why his profit differs from the figure he got by using the amounts paid. Explain.", points: ["Profit must show the expenses incurred in the year, not the cash paid (matching)", `The adjustments add 680 and deduct 1,195, so profit is 515 higher than the unadjusted ${f(npUnadj)}`], modelAnswer: `The income statement uses expenses incurred in 2025 (matching). Owing wages add 680 to expenses and prepayments of 1,195 belong to 2026, so profit is 515 higher than ${f(npUnadj)}.`, explanation: "Adjustments move expenses to the period they belong to." }),
    ],
    hints: ["Add accruals; deduct prepayments."],
    explanation: "This item practises adjusting expenses in an income statement.",
  });
  check("diff", r2(np - npUnadj), 515);

  b.short({
    d: 2, skill: "RECALL",
    stem: "Under which heading in the statement of financial position is an accrued expense shown? (Two words.)",
    accepted: ["current liabilities", "other payables"],
    rejected: ["current assets", "other receivables"],
    explanation: "An accrued expense is a current liability, described as other payables.",
  });

  b.card("DEFINITION", "Accrued expense", "An expense of this year still unpaid at the year end; a current liability (other payables).");
  b.card("DEFINITION", "Prepaid expense", "An amount paid this year for next year's service; a current asset (other receivables).");
  b.card("FORMULA", "Expense for the year", "Paid − opening accrual + opening prepayment + closing accrual − closing prepayment.");
  b.card("FACT", "Accrual in the ledger", "Accrued c/d on the debit side; accrued b/d on the credit side.");
  b.card("FACT", "Prepayment in the ledger", "Prepaid c/d on the credit side; prepaid b/d on the debit side.");
  b.card("CONCEPT", "Effect of a closing accrual on profit", "Increases the expense, so reduces profit; increases current liabilities.");
  b.card("CONCEPT", "Effect of a closing prepayment on profit", "Reduces the expense, so increases profit; increases current assets.");
  b.card("FACT", "Journal for a prepayment", "Dr Other receivables; Cr Expense account.");
  b.card("FACT", "Journal for an accrual", "Dr Expense account; Cr Other payables.");
});
