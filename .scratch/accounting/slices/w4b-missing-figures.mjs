// W4b: calculating missing figures from incomplete records.
import { concept, P, money } from "../lib.mjs";
import { receivablesAccount, payablesAccount, expenseAccount, tAccount, table, fmt, r2, sum, check } from "../tables/w4b-lib.mjs";

concept("acc.incomplete.missing-figures", { file: "incomplete/missing-figures", keyPrefix: "incomplete.missing-figures" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which account is reconstructed to find a trader's **credit sales** for the year?",
    options: [
      ["Total trade receivables account", "Correct: credit sales are debited to this account."],
      ["Total trade payables account", "This account gives credit purchases."],
      ["Capital account", "The capital account records the owner's investment, profit and drawings."],
      ["Sales returns account", "This records goods returned by customers only."],
    ],
    answer: "A",
    explanation: "Credit sales increase what customers owe, so they are the missing debit in the total trade receivables account.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a total trade payables account, on which side is **discount received** entered?",
    options: [
      ["Debit, because it reduces the amount owed to suppliers", "Correct: it lowers the liability."],
      ["Credit, because it is income of the business", "In the discount received account it is a credit; in the payables account it is a debit."],
      ["Debit, because it increases purchases", "Discount received does not change purchases."],
      ["It is not entered in the trade payables account", "It reduces the suppliers' balances, so it must appear."],
    ],
    answer: "A",
    explanation: "Discount received reduces the amount owed to suppliers, so the payables account is debited and discount received credited.",
  });
  {
    const op = 2870, rec = 35640, da = 410, cl = 3150;
    const cs = r2(rec + da + cl - op);
    check("mf mcq1", cs, 36330);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Trade receivables were ${money(op)} on 1 January 2025 and ${money(cl)} on 31 December 2025. Customers paid ${money(rec)} and were allowed discounts of ${money(da)}. What were the credit sales?`,
      options: [
        [money(cs), "Correct: 35,640 + 410 + 3,150 − 2,870."],
        [money(r2(rec + da + op - cl)), "The opening and closing balances have been swapped."],
        [money(r2(rec - da + cl - op)), "The discount has been deducted instead of added."],
        [money(rec), "Cash received is not the same as credit sales."],
      ],
      answer: "A",
      explanation: `Credit sales = receipts + discount allowed + closing − opening = ${fmt(rec)} + ${fmt(da)} + ${fmt(cl)} − ${fmt(op)} = ${fmt(cs)}.`,
    });
  }
  {
    const op = 4120, pay = 52300, dr = 720, ret = 1140, cl = 3780;
    const cp = r2(pay + dr + ret + cl - op);
    check("mf mcq2", cp, 53820);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Trade payables: 1 January ${money(op)}; 31 December ${money(cl)}. Paid to suppliers ${money(pay)}; discount received ${money(dr)}; purchases returns ${money(ret)}. What were the credit purchases?`,
      options: [
        [money(cp), "Correct: 52,300 + 720 + 1,140 + 3,780 − 4,120."],
        [money(r2(pay + dr - ret + cl - op)), "Purchases returns have been deducted instead of added."],
        [money(r2(pay + cl - op)), "Discount received and returns have been left out."],
        [money(r2(pay + dr + ret + op - cl)), "The opening and closing balances have been swapped."],
      ],
      answer: "A",
      hints: ["Everything on the debit side of the payables account is added; the opening balance is deducted."],
      explanation: `Credit purchases = ${fmt(pay)} + ${fmt(dr)} + ${fmt(ret)} + ${fmt(cl)} − ${fmt(op)} = ${fmt(cp)}.`,
    });
  }
  {
    const paid = 2760, oa = 180, ca = 230;
    const ch = r2(paid - oa + ca);
    check("mf mcq3", ch, 2810);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `During 2025 Rudo paid ${money(paid)} for electricity. At 1 January ${money(oa)} was owing and at 31 December ${money(ca)} was owing. What is the electricity expense for 2025?`,
      options: [
        [money(ch), "Correct: 2,760 − 180 + 230."],
        [money(r2(paid + oa + ca)), "The opening accrual belongs to 2024 and must be deducted."],
        [money(r2(paid + oa - ca)), "The accruals have been treated the wrong way round."],
        [money(paid), "The amount paid has not been adjusted for accruals."],
      ],
      answer: "A",
      explanation: `Expense = paid − opening accrual + closing accrual = ${fmt(paid)} − ${fmt(oa)} + ${fmt(ca)} = ${fmt(ch)}.`,
    });
  }
  {
    const paid = 4800, op = 400, cp = 600;
    const ch = r2(paid + op - cp);
    check("mf mcq4", ch, 4600);
    b.mcq({
      d: 3, skill: "APPLICATION",
      stem: `Insurance paid during 2025 was ${money(paid)}. Insurance prepaid was ${money(op)} at 1 January and ${money(cp)} at 31 December. What is the insurance expense for 2025?`,
      options: [
        [money(ch), "Correct: 4,800 + 400 − 600."],
        [money(r2(paid - op + cp)), "The prepayments have been treated as accruals."],
        [money(r2(paid + op + cp)), "The closing prepayment belongs to 2026 and must be deducted."],
        [money(r2(paid - op - cp)), "The opening prepayment was used in 2025 and must be added."],
      ],
      answer: "A",
      hints: ["An opening prepayment is used up this year; a closing prepayment belongs to next year."],
      explanation: `Expense = ${fmt(paid)} + ${fmt(op)} − ${fmt(cp)} = ${fmt(ch)}.`,
    });
  }
  {
    const ob = 1240, rec = 27400, pay = 24960, cb = 980;
    const dr = r2(ob + rec - pay - cb);
    check("mf mcq5", dr, 2700);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `Sipho's bank balance was ${money(ob)} at the start of the year and ${money(cb)} at the end. Receipts were ${money(rec)} and business payments ${money(pay)}. All other withdrawals were drawings. How much did he draw?`,
      options: [
        [money(dr), "Correct: 1,240 + 27,400 − 24,960 − 980."],
        [money(r2(rec - pay)), "The opening and closing balances have been ignored."],
        [money(r2(ob + rec - pay + cb)), "The closing balance has been added instead of deducted."],
        [money(r2(rec - pay - cb)), "The opening balance has been left out."],
      ],
      answer: "A",
      explanation: `Money available ${fmt(ob + rec)}; less payments ${fmt(pay)} and closing balance ${fmt(cb)} leaves drawings of ${fmt(dr)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A trader paid her rent for January 2026 in December 2025. Ignoring this when finding the 2025 rent expense from the bank summary would …",
    options: [
      ["overstate the rent expense and understate profit", "Correct: next year's rent would be charged to 2025."],
      ["understate the rent expense and overstate profit", "The extra payment increases the expense if not adjusted."],
      ["have no effect on profit, only on the bank balance", "The expense, and so the profit, would be wrong."],
      ["overstate both the rent expense and the profit", "A larger expense lowers profit."],
    ],
    answer: "A",
    hints: ["The January 2026 rent is a closing prepayment."],
    explanation: "The payment in advance is a closing prepayment. Unless it is deducted, the 2025 expense is too high and the profit too low.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item is entered on the **credit** side of a total trade receivables account?",
    options: [
      ["Irrecoverable debts written off", "Correct: they reduce the amount customers owe."],
      ["Credit sales", "Credit sales are debited: they increase what customers owe."],
      ["Opening balance of trade receivables", "The opening balance is a debit balance b/d."],
      ["Cheque from a customer dishonoured", "A dishonoured cheque restores the debt, so it is debited."],
    ],
    answer: "A",
    explanation: "Receipts, discount allowed, sales returns, irrecoverable debts and contras reduce receivables and are credits.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Total revenue for the year is cash sales plus credit sales.",
    answer: true,
    explanation: "True. The receivables account gives credit sales only; cash sales are added to give total revenue.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The amount received from credit customers during the year is always equal to credit sales for the year.",
    answer: false,
    explanation: "False. Receipts include payment for last year's sales and exclude sales still unpaid at the year end, discounts and returns.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each missing figure with the account usually reconstructed to find it.",
    right: ["Total trade receivables account", "Total trade payables account", "Cash or bank summary", "The expense account"],
    pairs: ["Credit sales", "Credit purchases", "Drawings", "Rent charged in the income statement", "Closing trade receivables", "Cash sales (takings not banked in full)"],
    rightIndex: [0, 1, 2, 3, 0, 2],
    explanation: "Each figure is the missing entry in the account it would have been posted to.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the formula for credit purchases.",
    template: "Credit purchases = payments to suppliers + discount received + purchases returns + {{blank:a}} trade payables − {{blank:b}} trade payables.",
    blanks: [
      { id: "a", accepted: ["closing"], choices: ["closing", "opening"] },
      { id: "b", accepted: ["opening"], choices: ["closing", "opening"] },
    ],
    explanation: "Closing payables are the balance c/d on the debit side; the opening balance b/d on the credit side is deducted.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const op = 5260, rec = 61480, da = 870, sr = 1320, bd = 640, cl = 6040, cash = 9350;
    const cs = r2(rec + da + sr + bd + cl - op);
    const rev = r2(cs + cash);
    check("mf num1", cs, 65090);
    b.calc({
      d: 4, kind: "money", value: rev, calculator: true, wrong: [cs, r2(rec + cash)],
      stem: `Farai's hardware shop in Gweru: trade receivables ${money(op)} at 1 January 2025 and ${money(cl)} at 31 December 2025. During 2025 customers paid ${money(rec)}; discount allowed was ${money(da)}; sales returns ${money(sr)}; irrecoverable debts written off ${money(bd)}. Cash sales were ${money(cash)}. Calculate the total revenue (sales) for 2025.`,
      hints: ["Find credit sales from the receivables account first.", "Then add the cash sales."],
      explanation: `Credit sales = ${fmt(rec)} + ${fmt(da)} + ${fmt(sr)} + ${fmt(bd)} + ${fmt(cl)} − ${fmt(op)} = ${fmt(cs)}. Revenue = ${fmt(cs)} + ${fmt(cash)} = ${fmt(rev)}. Forgetting the cash sales gives ${fmt(cs)}; using receipts as credit sales gives ${fmt(r2(rec + cash))}.`,
    });
  }
  {
    const op = 2380, cp = 28740, pay = 27150, dr = 450, cl = null;
    const close = r2(op + cp - pay - dr);
    check("mf num2", close, 3520);
    b.num({
      d: 3, kind: "money", value: close, calculator: true, wrong: [r2(op + cp - pay)],
      stem: `Nyasha's trade payables were ${money(op)} on 1 January 2025. Credit purchases for the year were ${money(cp)}, she paid suppliers ${money(pay)} and received discounts of ${money(dr)}. Calculate her trade payables at 31 December 2025.`,
      hints: ["This time the balance c/d is the missing figure."],
      explanation: `Closing payables = ${fmt(op)} + ${fmt(cp)} − ${fmt(pay)} − ${fmt(dr)} = ${fmt(close)}. Forgetting the discount gives ${fmt(r2(op + cp - pay))}.`,
    });
    void cl;
  }
  {
    const banked = 31600, wagesTill = 2880, drTill = 1500, oc = 160, cc = 245;
    const cashSales = r2(banked + wagesTill + drTill + cc - oc);
    check("mf num3", cashSales, 36065);
    b.calc({
      d: 4, kind: "money", value: cashSales, calculator: true, wrong: [banked, r2(banked + wagesTill + drTill)],
      stem: `Chipo runs a market stall in Mbare. All her sales are for cash. During 2025 she banked ${money(banked)} of takings, paid a helper's wages of ${money(wagesTill)} out of the takings and took ${money(drTill)} from the takings for herself. Cash in hand was ${money(oc)} at 1 January and ${money(cc)} at 31 December 2025. Calculate her cash sales for 2025.`,
      hints: ["Cash sales are the missing receipt in a cash summary.", "Everything paid out of the takings, plus the closing cash, came from opening cash and sales."],
      explanation: `Cash sales = banked ${fmt(banked)} + wages ${fmt(wagesTill)} + drawings ${fmt(drTill)} + closing cash ${fmt(cc)} − opening cash ${fmt(oc)} = ${fmt(cashSales)}. Using only the amount banked (${fmt(banked)}) ignores everything spent from the till.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the amount paid for rent during the year may differ from the rent expense in the income statement.",
    points: ["Some rent may be owing (accrued) or paid in advance (prepaid) at the start or end of the year", "The expense must match the rent for the year's use only (accruals/matching concept)"],
    modelAnswer: "Part of the payments may cover next year (a prepayment) or last year's arrears, and rent for this year may still be owing. The income statement must show only the rent for the period used this year.",
    explanation: "Accruals concept: expenses are matched to the period they relate to.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "A trader's total trade receivables account gives credit sales of US\\$40,000, but she has forgotten to tell her accountant about irrecoverable debts of US\\$700. State and explain the effect on the credit sales calculated.",
    points: ["Credit sales are understated by US\\$700", "Irrecoverable debts are a credit in the account; leaving them out makes the missing debit (credit sales) too small"],
    modelAnswer: "Credit sales will be understated by US\\$700 (they should be US\\$40,700), because the debts written off are a credit entry and the missing figure on the debit side has to cover them.",
    hints: ["Which side are irrecoverable debts on, and which side is the missing figure on?"],
    explanation: "Every credit omitted reduces the calculated debit missing figure by the same amount.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const ra = receivablesAccount({ opening: 4730, receipts: 58210, discounts: 940, returns: 1180, irrecoverable: 560, closing: 5160 });
    const pa = payablesAccount({ opening: 3860, payments: 41270, discounts: 610, returns: 820, closing: 4390 });
    const cashSales = 7400;
    const rev = r2(ra.creditSales + cashSales);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Tendai Chikore sells building materials in Masvingo. He does not keep a sales ledger or a purchases ledger. For 2025:\n\n${table(["Item", "US\\$"], [["Trade receivables at 1 January 2025", 4730], ["Trade receivables at 31 December 2025", 5160], ["Received from credit customers", 58210], ["Discount allowed", 940], ["Sales returns", 1180], ["Irrecoverable debts written off", 560], ["Trade payables at 1 January 2025", 3860], ["Trade payables at 31 December 2025", 4390], ["Paid to credit suppliers", 41270], ["Discount received", 610], ["Purchases returns", 820], ["Cash sales", 7400]])}`,
      parts: [
        P.manual({ label: "(a)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the total trade receivables account for 2025, showing the credit sales.", points: ["Balance b/d 4,730 on the debit side", "Receipts 58,210 and discount allowed 940 credited", "Sales returns 1,180 and irrecoverable debts 560 credited; balance c/d 5,160", `Credit sales ${fmt(ra.creditSales)} as the balancing (debit) figure; totals agree`], modelAnswer: ra.md, explanation: "Credit sales are the missing debit." }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: ra.creditSales, stem: "State the credit sales for 2025.", explanation: `${fmt(ra.creditSales)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: rev, wrong: [ra.creditSales], stem: "Calculate the total revenue for 2025.", explanation: `${fmt(ra.creditSales)} + ${fmt(cashSales)} = ${fmt(rev)}.` }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: pa.creditPurchases, wrong: [r2(pa.creditPurchases - 2 * 820), r2(41270 + 3860 - 4390 + 610 + 820)], stem: "Calculate the credit purchases for 2025.", explanation: `41,270 + 610 + 820 + 4,390 − 3,860 = ${fmt(pa.creditPurchases)}.` }),
        P.mcq({ label: "(e)", stem: "Which concept requires the irrecoverable debts to be written off rather than kept as trade receivables?", options: [["Prudence", "Correct: assets must not be overstated."], ["Consistency", "Consistency is about using the same methods each year."], ["Going concern", "Going concern assumes the business will continue."], ["Duality", "Duality is the two-sided effect of every transaction."]], answer: "A", explanation: "Debts that will not be collected are not assets; prudence requires them to be written off." }),
      ],
      hints: ["Put each item on the side that increases or decreases the balance owed."],
      explanation: `Model answers:\n\n${ra.md}\n\n${pa.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (bank summary + expenses)
  {
    const dr = [["1 Jan", "Balance b/d", 2640], ["31 Dec", "Receipts from trade receivables", 47320], ["31 Dec", "Cash sales banked", 12860]];
    const known = [["31 Dec", "Payments to trade payables", 38410], ["31 Dec", "Wages", 8640], ["31 Dec", "Insurance", 1560], ["31 Dec", "General expenses", 2290]];
    const close = 3090;
    const drawings = r2(sum(dr.map((x) => x[2])) - sum(known.map((x) => x[2])) - close);
    check("mf s2 drawings", drawings, 8830);
    const bank = tAccount("Bank account (summary)", dr, [...known, ["31 Dec", "Drawings (missing figure)", drawings]], { cdDate: "31 Dec", bdDate: "1 Jan" });
    const ins = expenseAccount({ title: "Insurance account", openPrepaid: 320, paid: 1560, closePrepaid: 435 });
    const wages = expenseAccount({ title: "Wages account", openAccrued: 260, paid: 8640, closeAccrued: 375 });
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Rudo Sibanda runs a hair-products shop in Harare. Her bank statements for 2025 show:\n\n${table(["Item", "US\\$"], [["Balance at 1 January 2025", 2640], ["Receipts from credit customers", 47320], ["Cash sales banked", 12860], ["Payments to credit suppliers", 38410], ["Wages", 8640], ["Insurance", 1560], ["General expenses", 2290], ["Balance at 31 December 2025", 3090]])}\n\nAll other payments from the bank were drawings. Insurance prepaid was ${money(320)} at 1 January 2025 and ${money(435)} at 31 December 2025. Wages owing were ${money(260)} at 1 January 2025 and ${money(375)} at 31 December 2025.`,
      parts: [
        P.num({ label: "(a)", marks: 3, kind: "money", value: drawings, wrong: [r2(drawings + 2 * close), r2(drawings - 2640)], stem: "Calculate Rudo's drawings for 2025.", explanation: `Receipts and opening balance ${fmt(sum(dr.map((x) => x[2])))}; known payments ${fmt(sum(known.map((x) => x[2])))}; closing balance ${fmt(close)}. Drawings = ${fmt(drawings)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: ins.charge, wrong: [r2(1560 - 320 + 435)], stem: "Calculate the insurance expense for 2025.", explanation: `1,560 + 320 − 435 = ${fmt(ins.charge)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: wages.charge, wrong: [r2(8640 + 260 - 375)], stem: "Calculate the wages expense for 2025.", explanation: `8,640 − 260 + 375 = ${fmt(wages.charge)}.` }),
        P.manual({ label: "(d)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the insurance account for 2025, showing the transfer to the income statement.", points: ["Opening prepayment 320 debited (balance b/d) and bank 1,560 debited", `Income statement ${fmt(ins.charge)} credited`, "Closing prepayment 435 credited as balance c/d and brought down on the debit side"], modelAnswer: ins.md, explanation: "A prepayment is a debit balance." }),
        P.manual({ label: "(e)", marks: 2, stem: "State where the closing balances on the insurance and wages accounts appear in the statement of financial position.", points: ["Insurance prepaid 435: current asset (other receivables)", "Wages owing 375: current liability (other payables)"], modelAnswer: "The prepaid insurance of US\\$435 is a current asset; the wages owing of US\\$375 are a current liability.", explanation: "Prepayments are assets; accruals are liabilities." }),
      ],
      hints: ["Build a bank summary: drawings are the missing payment.", "Expense = paid + opening prepaid − closing prepaid; or paid − opening accrual + closing accrual."],
      explanation: `Model answers:\n\n${bank}\n\n${ins.md}\n\n${wages.md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("FORMULA", "Credit sales (from the receivables account)", "Receipts + discount allowed + sales returns + irrecoverable debts + closing receivables − opening receivables.");
  b.card("FORMULA", "Credit purchases (from the payables account)", "Payments + discount received + purchases returns + closing payables − opening payables.");
  b.card("FORMULA", "Expense for the year", "Paid − opening accrual + closing accrual + opening prepayment − closing prepayment.");
  b.card("FORMULA", "Cash sales when takings are not all banked", "Cash banked + payments from the till + drawings from the till + closing cash − opening cash.");
  b.card("FACT", "Total revenue from incomplete records", "Cash sales + credit sales.");
  b.card("CONCEPT", "Why can a missing figure be calculated?", "Every account must balance, so if all entries but one are known, the missing one is the balancing figure.");
  b.card("FACT", "Side of the missing figure", "Credit sales: debit of the receivables account. Credit purchases: credit of the payables account. Drawings: credit of the bank summary.");
  b.card("DEFINITION", "Cash and bank summary", "A summary of all receipts and payments for the year built from bank statements and slips, used to find a missing receipt or payment.");
  b.card("FACT", "Items credited in a total trade receivables account", "Receipts, discount allowed, sales returns, irrecoverable debts, contra entries and the closing balance c/d.");
});
