// W1a: ledger.accruals-prepayments
import { concept, P, table, check, sum, r2, fmt, money } from "../lib.mjs";
import { mc, tAcct } from "../tables/w1a-lib.mjs";

concept("aacc.ledger.accruals-prepayments", { file: "ledger/accruals-prepayments", keyPrefix: "ledger.accruals-prepayments" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "An **accrued expense** at the year end is:",
    ok: ["an expense incurred but not yet paid, shown as a current liability", "Correct: the service has been used and the business owes the money."],
    bad: [["an expense paid in advance, shown as a current asset", "That describes a prepaid expense."], ["income earned but not yet received, shown as a current asset", "That describes accrued income."], ["cash received for a future period, shown as a liability", "That describes income received in advance."]],
    explanation: "Accrued expenses are owed at the year end and appear in other payables under current liabilities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Where is a **prepayment** of insurance shown in the statement of financial position?",
    ok: ["As other receivables within current assets", "Correct: the business has a right to future benefit."],
    bad: [["As other payables within current liabilities", "A prepayment is not owed to anyone."], ["As a deduction from capital", "Prepayments do not affect capital directly; they affect profit."], ["As a non-current asset", "The benefit lasts less than twelve months, so it is current."]],
    explanation: "A prepayment is an asset because it represents a service already paid for but not yet received.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which accounting concept requires expenses to be recorded in the period in which they are used up, whether or not they have been paid?",
    ok: ["Matching (accruals)", "Correct: expenses are matched with the revenue they help to earn in the same period."],
    bad: [["Historical cost", "Historical cost concerns the value at which assets are recorded."], ["Business entity", "The entity concept separates the owner from the business."], ["Money measurement", "Money measurement limits recording to items measurable in money."]],
    explanation: "Matching, also called the accruals concept, ties expenses to the period of benefit.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "At 31 December 2025 Tendai forgot to record wages owing to staff. What is the effect?",
    ok: ["Profit is overstated and current liabilities are understated", "Correct: expenses are too low, so profit is too high, and the debt is missing."],
    bad: [["Profit is understated and current liabilities are overstated", "The effect is the reverse of this."], ["Profit is overstated and current assets are understated", "No asset is involved; the omission is of a liability."], ["Profit and liabilities are both understated", "Omitting an expense raises profit."]],
    hints: ["Omitting an expense makes profit higher or lower?"],
    explanation: "An omitted accrual understates expenses (so profit is overstated) and understates liabilities.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "In an expense account, where is the closing balance for a **prepayment** carried down?",
    ok: ["On the credit side (balance c/d), then brought down on the debit side", "Correct: the account has more debits than the year's expense, so the balancing figure goes on the credit side."],
    bad: [["On the debit side, then brought down on the credit side", "This is the layout for an accrual."], ["On the credit side, then brought down on the credit side", "A balance brought down is always on the opposite side."], ["It is not carried down; it is written off to profit", "The prepayment is an asset still to be used next year."]],
    hints: ["Cash paid is on the debit side; the expense for the year is on the credit side."],
    explanation: "The prepayment is the part of the debit total not used up. It is entered as c/d on the credit side and b/d on the debit side.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Commission earned by Chipo's business in December 2025 but received in January 2026 is:",
    ok: ["accrued income, a current asset", "Correct: earned but not yet received."],
    bad: [["income received in advance, a current liability", "That is cash received before it is earned."], ["a prepaid expense, a current asset", "Commission earned is income, not an expense."], ["not recognised until received", "Revenue is recognised when earned, not when cash arrives."]],
    explanation: "Income belongs to the period in which it is earned. The amount not yet received is a receivable.",
  });
  const draft = 18400;
  const accr = 700;
  const prep = 450;
  const corrected = r2(draft - accr + prep);
  check("corrected", corrected, 18150);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A draft profit for the year of ${money(draft)} was prepared before two year-end adjustments: expenses accrued ${money(accr)} and expenses prepaid ${money(prep)}, both not yet recorded. What is the correct profit for the year?`,
    ok: [`${money(corrected)}`, "Correct: 18,400 - 700 + 450."],
    bad: [[money(r2(draft + accr - prep)), "The signs are reversed: an accrual reduces profit and a prepayment increases it."], [money(r2(draft + accr + prep)), "Both adjustments have been added."], [money(r2(draft - accr - prep)), "A prepayment has been deducted instead of added."]],
    hints: ["Accrued expenses reduce profit; prepaid expenses increase it."],
    explanation: "Profit = 18,400 - 700 (accrual) + 450 (prepayment) = 18,150.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Gokwe Stores received rent of US\\$2,800 during 2025, but US\\$650 of this relates to 2026. At the start of the year US\\$400 of rent received related to 2025. Which statement is correct?",
    ok: ["Rent income for 2025 is US\\$2,550 and US\\$650 is a current liability at the year end", "Correct: 2,800 + 400 - 650 = 2,550, and the 650 is unearned."],
    bad: [["Rent income for 2025 is US\\$2,800 and US\\$650 is a current asset", "The money received in advance is owed in service, so it is a liability."], ["Rent income for 2025 is US\\$3,050 and US\\$650 is a current liability", "The 650 has been added instead of deducted."], ["Rent income for 2025 is US\\$2,150 and US\\$400 is a current asset", "The opening balance has been deducted and misclassified."]],
    hints: ["Opening income received in advance belongs to this year."],
    explanation: "Income for the year = received + opening received in advance - closing received in advance.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A prepaid expense is a current liability.",
    answer: false,
    explanation: "False. It is a current asset (other receivables) because the business has paid for a future benefit.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Income received in advance reduces the income recognised in the current year.",
    answer: true,
    hints: ["Is the cash for this year's service or next year's?"],
    explanation: "True. The amount relates to the next period, so it is deducted from the income of the current year and shown as a liability.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Classify each item at the year end.",
    pairs: ["Wages for the last week of the year, unpaid", "Insurance premium paid for the following year", "Commission earned but not yet received", "Rent received for the following year"],
    right: ["Accrued expense", "Prepaid expense", "Accrued income", "Income received in advance"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Expenses owed are accruals; expenses paid early are prepayments; income earned but unpaid is accrued income; cash received early is income received in advance.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the formula for an expense account.",
    template: "Expense for the year = cash paid {{blank:a}} opening accrual {{blank:b}} closing accrual.",
    blanks: [
      { id: "a", accepted: ["minus"], choices: ["plus", "minus"] },
      { id: "b", accepted: ["plus"], choices: ["plus", "minus"] },
    ],
    explanation: "The opening accrual belongs to last year, so it is deducted; the closing accrual belongs to this year, so it is added.",
  });

  const e1 = r2(5360 - 410 + 530);
  check("e1", e1, 5480);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: e1, daily: true, calculator: true, wrong: [r2(5360 + 410 - 530), r2(5360 - 410 - 530)],
    stem: "Electricity paid during 2025 was US\\$5,360. At 1 January 2025 US\\$410 was owing and at 31 December 2025 US\\$530 was owing. Calculate the electricity expense for the year.",
    explanation: "5,360 - 410 + 530 = 5,480. Adding the opening accrual instead gives 5,240 and deducting both gives 4,420.",
  });
  const insClose = r2((3000 * 8) / 12);
  const insExp = r2(790 + 3000 - insClose);
  check("insExp", insExp, 1790);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: insExp, calculator: true, wrong: [r2(3000 - insClose), r2(790 + 3000)],
    stem: "On 1 September 2025 Rudo paid an insurance premium of US\\$3,000 for twelve months. At 1 January 2025 US\\$790 was prepaid from the previous premium. Calculate the insurance expense for the year ended 31 December 2025.",
    hints: ["Find the months of the new premium that fall after 31 December.", "Add the opening prepayment."],
    explanation: `Closing prepayment: 3,000 × 8/12 = ${fmt(insClose)}. Expense: 790 + 3,000 - ${fmt(insClose)} = ${fmt(insExp)}. Forgetting the opening prepayment gives ${fmt(r2(3000 - insClose))}.`,
  });
  const rentInc = r2(6400 + 500 - 750);
  check("rentInc", rentInc, 6150);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: rentInc, calculator: true, wrong: [r2(6400 - 500 + 750), 6400],
    stem: "A landlord received rent of US\\$6,400 during 2025. At 1 January 2025 rent of US\\$500 had been received in advance; at 31 December 2025 rent of US\\$750 had been received in advance. Calculate the rent income for 2025.",
    hints: ["Opening income received in advance is earned this year."],
    explanation: `6,400 + 500 - 750 = ${fmt(rentInc)}. Reversing the signs gives ${fmt(r2(6400 - 500 + 750))}.`,
  });
  const intAcc = r2(20000 * 0.09 * (10 / 12) - 1000);
  check("intAcc", intAcc, 500);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: intAcc, calculator: true, wrong: [1500, 1000],
    stem: "On 1 March 2025 Thandeka's business took a bank loan of US\\$20,000 at 9% interest a year. Interest of US\\$1,000 was paid on 30 September 2025. Calculate the interest accrued at 31 December 2025.",
    hints: ["Work out the interest for ten months first."],
    explanation: `Interest for 10 months: 20,000 × 9% × 10/12 = 1,500. Less paid 1,000, accrued ${fmt(intAcc)}. The 1,500 is the full charge, not the accrual.`,
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State the heading under which accrued expenses are shown in the statement of financial position.",
    accepted: ["current liabilities", "other payables", "current liability", "accruals", "other payables under current liabilities"],
    explanation: "Accrued expenses are current liabilities (other payables).",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Distinguish between accrued income and income received in advance.",
    points: ["Accrued income: income earned in the period but not yet received (a current asset)", "Income received in advance: cash received for a future period (a current liability)"],
    modelAnswer: "Accrued income has been earned but the cash has not arrived, so it is a current asset. Income received in advance is cash received before it is earned, so it is a current liability.",
    explanation: "One mark for each term correctly defined.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the matching concept applies to wages that have been earned in December but are paid in January.",
    points: ["Wages belong to the period in which the staff worked, not the period of payment", "An accrual is added to the wages expense of the year ended in December", "It is shown as a current liability, so profit is not overstated"],
    modelAnswer: "The staff worked in December, so the cost belongs to that year even though the cash is paid in January. The unpaid wages are added to the expense and shown as a current liability, so the profit is matched with the cost of earning it.",
    hints: ["Which period did the work help to earn revenue?"],
    explanation: "Link the cost to the period of benefit, then describe the accounting.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Nyasha says: 'Prepayments should be ignored, because the cash has already left the bank.' Evaluate her view.",
    points: ["Cash paid is not the same as expense: part of the payment relates to the next period", "Ignoring the prepayment would overstate expenses and understate profit and assets", "A prepayment is only an asset if the benefit will actually be received, so it must be checked"],
    modelAnswer: "Her view is wrong. Part of the payment buys a service in the next year, so charging it all now overstates expenses and understates profit and current assets. The prepayment should be recorded provided the benefit will really be received.",
    hints: ["Compare cash paid with the expense of the year."],
    explanation: "A judgement supported by the effect on profit and assets earns the marks.",
  });

  // Structured 1: ten marks
  const rows = [
    ["Electricity (expense)", 4180, 360, 420],
    ["Insurance (expense)", 2250, 540, 640],
    ["Rent received (income)", 3900, 320, 450],
  ];
  const elec = r2(4180 - 360 + 420);
  const insur = r2(2250 + 540 - 640);
  const rentIn = r2(3900 + 320 - 450);
  check("elec", elec, 4240);
  check("insur", insur, 2150);
  check("rentIn", rentIn, 3770);
  const payables = r2(420 + 450);
  const elecT = tAcct(
    "Electricity account",
    [["Various", "Bank", 4180], ["31 Dec", "Accrued c/d", 420]],
    [["1 Jan", "Accrued b/d", 360], ["31 Dec", "Statement of profit or loss", elec]],
    { side: "cr", date: "1 Jan", details: "Accrued b/d", amount: 420 },
  );
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "Farai owns a pharmacy in Masvingo. For the year ended 31 December 2025:\n\n" + table(["Item", "Paid or received in 2025 (US\\$)", "Opening balance (US\\$)", "Closing balance (US\\$)"], [
      ["Electricity", 4180, "360 owing", "420 owing"],
      ["Insurance", 2250, "540 prepaid", "640 prepaid"],
      ["Rent received", 3900, "320 received in advance", "450 received in advance"],
    ]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: elec, wrong: [r2(4180 + 360 - 420)], stem: "Calculate the electricity expense for 2025.", explanation: "4,180 - 360 + 420 = 4,240." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: insur, wrong: [r2(2250 - 540 + 640)], stem: "Calculate the insurance expense for 2025.", explanation: "2,250 + 540 - 640 = 2,150." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: rentIn, wrong: [r2(3900 - 320 + 450)], stem: "Calculate the rent income for 2025.", explanation: "3,900 + 320 - 450 = 3,770." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: payables, wrong: [r2(payables + 640)], stem: "Calculate the total of other payables at 31 December 2025 arising from these items.", explanation: "Accrued electricity 420 + rent received in advance 450 = 870. The prepaid insurance is an asset." }),
      P.manual({ label: "(e)", marks: 2, type: "EXTENDED_RESPONSE", stem: "Prepare the electricity account for 2025 in the ledger, balanced and with the balance brought down.", points: ["Debit side: Bank 4,180 and balance c/d 420; credit side: balance b/d 360 and statement of profit or loss 4,240", "Totals 4,600 each side and balance b/d 420 brought down on the credit side"], modelAnswer: elecT, explanation: "The accrual is carried down on the debit side and brought down on the credit side." }),
    ],
    hints: ["Opening accruals are deducted, closing accruals are added.", "Prepaid insurance is an asset, not a payable."],
    explanation: "This item tests expense and income adjustments and their effect in the statement of financial position.",
  });

  // Structured 2: 14 marks
  const draftProfit = 24600;
  const notes = [
    ["Wages of 830 for the last week of December unpaid and unrecorded", "Accrued expense"],
    ["Insurance of 475 paid for January to March 2026, charged as an expense", "Prepaid expense"],
    ["Commission received includes 260 earned in 2026", "Income received in advance"],
    ["Interest of 190 earned on a deposit, not yet received or recorded", "Accrued income"],
  ];
  const fixedProfit = r2(draftProfit - 830 + 475 - 260 + 190);
  check("fixed", fixedProfit, 24175);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Draft profit for the year ended 31 December 2025 for Sipho's electrical shop in Chinhoyi was ${money(draftProfit)}. The following items had not been adjusted:\n\n` + table(["Note", "Description"], notes.map((n, i) => [String(i + 1), n[0]]), ["l", "l"]),
    parts: [
      P.match({ label: "(a)", stem: "Classify each note.", pairs: ["Note 1", "Note 2", "Note 3", "Note 4"], right: ["Accrued expense", "Prepaid expense", "Income received in advance", "Accrued income"], rightIndex: [0, 1, 2, 3], explanation: "Unpaid wages are an accrued expense; insurance for 2026 is prepaid; commission earned in 2026 is income received in advance; interest earned but not received is accrued income." }),
      P.num({ label: "(b)", marks: 4, kind: "money", value: fixedProfit, wrong: [r2(draftProfit + 830 - 475 + 260 - 190), r2(draftProfit - 830 - 475 - 260 - 190)], stem: "Calculate the correct profit for the year.", explanation: "24,600 - 830 + 475 - 260 + 190 = 24,175." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(475 + 190), wrong: [r2(830 + 260)], stem: "Calculate the amount by which current assets increase when the adjustments are made.", explanation: "Prepaid insurance 475 + accrued interest 190 = 665." }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r2(830 + 260), wrong: [r2(475 + 190)], stem: "Calculate the amount by which current liabilities increase when the adjustments are made.", explanation: "Accrued wages 830 + commission received in advance 260 = 1,090." }),
      P.manual({ label: "(e)", marks: 2, stem: "Sipho says that adjustments for accruals and prepayments are unnecessary because the bank statement shows what has been paid. Evaluate his view.", points: ["Cash paid and received does not match the period's costs and revenue, so profit based on cash alone would be misstated (here by 425 on the draft)", "Users need profit matched to the period, and the statement of financial position needs the assets and liabilities that arise"], modelAnswer: "He is wrong. The bank statement shows cash movements, not the costs and revenues of the year. Without the adjustments profit would differ by US\\$425 and the statement of financial position would omit assets and liabilities.", explanation: "Matching requires adjustments for amounts that relate to other periods." }),
    ],
    hints: ["Accrued expenses and income received in advance reduce profit.", "Prepaid expenses and accrued income increase profit."],
    explanation: "This item tests the classification and effect of year-end adjustments.",
  });

  b.card("DEFINITION", "What is an **accrued expense**?", "An expense incurred in the period but not yet paid at the year end; a current liability (other payables).");
  b.card("DEFINITION", "What is a **prepaid expense**?", "Payment made in the period for a benefit that belongs to a later period; a current asset (other receivables).");
  b.card("DEFINITION", "What is **accrued income**?", "Income earned in the period but not yet received; a current asset.");
  b.card("DEFINITION", "What is **income received in advance**?", "Cash received for a future period; a current liability.");
  b.card("FORMULA", "Expense for the year", "Cash paid + opening prepayment + closing accrual - opening accrual - closing prepayment.");
  b.card("FORMULA", "Income for the year", "Cash received + opening income received in advance + closing accrued income - opening accrued income - closing income received in advance.");
  b.card("CONCEPT", "Which concept supports accruals and prepayments?", "Matching (accruals): costs and revenue belong to the period in which they arise, not when cash moves.");
  b.card("FACT", "Effect on profit of an omitted accrued expense", "Expenses understated, profit overstated and liabilities understated.");
  b.card("FACT", "Where does a closing prepayment sit in an expense account?", "Balance c/d on the credit side; brought down on the debit side as an asset.");
});
