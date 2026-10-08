// W4a: income and expenditure accounts and the club's statement of financial position.
import { concept, P, money, r2, sum, check } from "../lib.mjs";
import { subscriptions, activity, incomeExpenditure, clubPosition, fundAtDate, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.clubs.income-expenditure", { file: "clubs/income-expenditure", keyPrefix: "clubs.income-expenditure" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "On which basis is a club's income and expenditure account prepared?",
    options: [
      ["The accruals basis", "Correct: it includes income and expenditure belonging to the year, paid or not."],
      ["The cash basis", "That is the basis of the receipts and payments account."],
      ["The going-concern basis only", "Going concern applies to all statements; the key feature here is accruals."],
      ["The basis of the members' votes", "Accounting statements are not prepared by vote."],
    ],
    answer: "A",
    explanation: "Like an income statement, the income and expenditure account follows the accruals (matching) concept.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A club paid US\\$3,400 for a new lawnmower expected to last five years. How is this treated?",
    options: [
      ["As a non-current asset, with depreciation charged", "Correct: it is capital expenditure."],
      ["As expenditure of US\\$3,400 in the income and expenditure account", "Capital items are not charged in full in one year."],
      ["As a deduction from the accumulated fund", "Buying an asset changes the type of asset, not the fund."],
      ["It is left out of the club's accounts", "It is recorded as an asset and in the receipts and payments account."],
    ],
    answer: "A",
    explanation: "Capital expenditure is added to non-current assets; only depreciation is charged as expenditure.",
  });
  {
    const paid = 2760, oOw = 315, cOw = 280;
    const exp = r2(paid - oOw + cOw);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `A club paid ${money(paid)} for electricity in 2025. ${money(oOw)} was owing at the start of the year and ${money(cOw)} at the end. What is the electricity charge in the income and expenditure account?`,
      options: [
        [money(exp), "Correct: 2,760 − 315 + 280."],
        [money(r2(paid + oOw - cOw)), "The opening and closing accruals have been swapped."],
        [money(paid), "This is the cash paid, not the charge for the year."],
        [money(r2(paid + oOw + cOw)), "The opening accrual belongs to last year: deduct it."],
      ],
      answer: "A",
      explanation: `Charge = paid − opening accrual + closing accrual = ${fmt(exp)}.`,
    });
  }
  {
    const open = 38450, surplus = 4675;
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A club's accumulated fund at 1 January 2025 was ${money(open)} and its surplus for 2025 was ${money(surplus)}. What is the accumulated fund at 31 December 2025?`,
      options: [
        [money(r2(open + surplus)), "Correct: opening fund + surplus."],
        [money(r2(open - surplus)), "A surplus is added, not deducted."],
        [money(open), "The surplus has been left out."],
        [money(surplus), "This is only the surplus for the year."],
      ],
      answer: "A",
      explanation: `${fmt(open)} + ${fmt(surplus)} = ${fmt(r2(open + surplus))}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A club's expenditure for the year is greater than its income. What is the effect on the accumulated fund?",
    options: [
      ["It falls by the amount of the deficit", "Correct: a deficit reduces the club's capital."],
      ["It rises by the amount of the deficit", "Only a surplus increases the fund."],
      ["It is unchanged until the bank is overdrawn", "The fund changes whatever the bank balance."],
      ["It falls by the total expenditure", "Only the excess over income is deducted."],
    ],
    answer: "A",
    explanation: "Closing accumulated fund = opening fund − deficit.",
  });
  {
    const cost = 14500, added = 3500, rate = 10;
    const dep = r2((cost + added) * rate / 100);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A club's equipment cost ${money(cost)} at 1 January 2025. It bought more equipment for ${money(added)} during 2025. Depreciation is ${rate}% a year on the cost of equipment held at the year end. What is the depreciation charge for 2025?`,
      options: [
        [money(dep), "Correct: 10% × (14,500 + 3,500)."],
        [money(r2(cost * rate / 100)), "The new equipment has been left out."],
        [money(r2(added * rate / 100)), "Only the new equipment has been depreciated."],
        [money(r2(cost * rate / 100 + added)), "The new equipment has been charged in full instead of depreciated."],
      ],
      answer: "A",
      hints: ["Which equipment is held at the year end?"],
      explanation: `Equipment at 31 December: ${fmt(cost)} + ${fmt(added)} = ${fmt(cost + added)}; × ${rate}% = ${fmt(dep)}.`,
    });
  }
  {
    const inc = [["Subscriptions", 8340], ["Profit on bar", 2915], ["Donations", 650]];
    const exp = [["Rent", 4800], ["Wages", 5100], ["Depreciation", 1180], ["Insurance", 960]];
    const ti = sum(inc.map((x) => x[1])), te = sum(exp.map((x) => x[1]));
    const res = r2(ti - te);
    check("deficit", res < 0, true);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A music society's income for 2025: subscriptions ${money(8340)}, profit on bar ${money(2915)}, donations ${money(650)}. Expenditure: rent ${money(4800)}, wages ${money(5100)}, depreciation ${money(1180)}, insurance ${money(960)}. What is the result for the year?`,
      options: [
        [`Deficit of ${money(-res)}`, "Correct: expenditure 12,040 exceeds income 11,905."],
        [`Surplus of ${money(-res)}`, "Expenditure is larger, so this is a deficit."],
        [`Surplus of ${money(r2(ti - te + 1180))}`, "Depreciation must be included as expenditure."],
        [`Deficit of ${money(r2(-res + 2 * 650))}`, "Donations are income, not expenditure."],
      ],
      answer: "A",
      hints: ["Total each side before comparing."],
      explanation: `Income ${fmt(ti)} − expenditure ${fmt(te)} = (${fmt(-res)}), a deficit.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item would **not** appear in a club's income and expenditure account?",
    options: [
      ["The bank balance at the end of the year", "Correct: it belongs in the statement of financial position."],
      ["Depreciation of the clubhouse", "Depreciation is expenditure."],
      ["Subscriptions for the year", "Subscription income is the main item of income."],
      ["The profit made by the refreshment bar", "Activity profits are income."],
    ],
    answer: "A",
    explanation: "Balances (assets, liabilities) go to the statement of financial position, not the income and expenditure account.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The final figure in an income and expenditure account is a surplus or a deficit.",
    answer: true,
    explanation: "True. Clubs do not use profit and loss for the club as a whole.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rent paid in advance by a club at the year end is shown as a current liability.",
    answer: false,
    explanation: "False. A prepaid expense is a current asset (other receivables); it is deducted from the year's rent expense.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each item with where it appears in a club's final accounts.",
    right: ["Income in the income and expenditure account", "Expenditure in the income and expenditure account", "Current asset", "Current liability"],
    pairs: ["Profit on refreshment bar", "Depreciation of furniture", "Subscriptions in arrears", "Subscriptions in advance", "Insurance prepaid", "Wages owing"],
    rightIndex: [0, 1, 2, 3, 2, 3],
    hints: ["Year-end amounts owed to the club are assets; amounts it owes are liabilities."],
    explanation: "Activity profits are income; depreciation is expenditure; arrears and prepayments are assets; advances and accruals are liabilities.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements.",
    template: "Closing accumulated fund = opening accumulated fund + {{blank:a}}. A club's purchase of new equipment is {{blank:b}} expenditure. An expense owing at the year end is {{blank:c}} to the amount paid.",
    blanks: [
      { id: "a", accepted: ["surplus"], choices: ["surplus", "receipts", "subscriptions"] },
      { id: "b", accepted: ["capital"], choices: ["capital", "revenue"] },
      { id: "c", accepted: ["added"], choices: ["added", "deducted"] },
    ],
    explanation: "Surplus increases the fund; equipment is capital expenditure; accruals are added to the cash paid.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const paid = 4380, oPre = 360, cPre = 405;
    const exp = r2(paid + oPre - cPre);
    b.num({
      d: 3, kind: "money", value: exp, calculator: true, wrong: [r2(paid - oPre + cPre)],
      stem: `A club paid ${money(paid)} for insurance during 2025. At 1 January 2025 insurance of ${money(oPre)} had been prepaid, and at 31 December 2025 ${money(cPre)} was prepaid. Calculate the insurance charge for 2025.`,
      hints: ["The opening prepayment is an expense of this year; the closing prepayment belongs to next year."],
      explanation: `${fmt(paid)} + ${fmt(oPre)} − ${fmt(cPre)} = ${fmt(exp)}.`,
    });
  }
  {
    const assets = [["Pavilion (net book value)", 22500], ["Sports equipment (net book value)", 4160], ["Subscriptions in arrears", 270], ["Rates prepaid", 140], ["Bank", 1935]];
    const liabs = [["Subscriptions in advance", 185], ["Wages owing", 320]];
    const f = fundAtDate("x", "at 1 January 2025", assets, liabs);
    b.calc({
      d: 3, kind: "money", value: f.fund, calculator: true, wrong: [r2(f.fund + 370), r2(f.fund - 540)],
      stem: `At 1 January 2025 a cricket club had: pavilion ${money(22500)}, sports equipment ${money(4160)} (both at net book value), subscriptions in arrears ${money(270)}, rates prepaid ${money(140)}, bank ${money(1935)}, subscriptions in advance ${money(185)} and wages owing ${money(320)}. Calculate the accumulated fund at 1 January 2025.`,
      hints: ["Assets less liabilities. Which subscription balance is a liability?"],
      explanation: `Assets ${fmt(f.ta)} − liabilities ${fmt(f.tl)} = ${fmt(f.fund)}. Treating advances as an asset gives ${fmt(r2(f.fund + 370))}; treating arrears as a liability gives ${fmt(r2(f.fund - 540))}.`,
    });
  }
  {
    const close = 51380, surplus = -2240;
    const open = r2(close - surplus);
    b.num({
      d: 3, kind: "money", value: open, calculator: true, wrong: [r2(close + surplus)],
      stem: `A club's accumulated fund at 31 December 2025 was ${money(close)} after a **deficit** of ${money(-surplus)} for the year. Calculate the accumulated fund at 1 January 2025.`,
      hints: ["A deficit reduced the fund during the year."],
      explanation: `Opening fund − deficit = closing fund, so opening = ${fmt(close)} + ${fmt(-surplus)} = ${fmt(open)}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Give **two** differences between a receipts and payments account and an income and expenditure account.",
    points: ["Receipts and payments: cash basis / records only money received and paid; income and expenditure: accruals basis", "Receipts and payments: includes capital items, no depreciation, ends with a bank balance; income and expenditure: revenue items only, includes depreciation, ends with a surplus or deficit"],
    modelAnswer: "The receipts and payments account records only cash and ends with the bank balance; the income and expenditure account adjusts for accruals and prepayments, excludes capital items, includes depreciation and ends with a surplus or deficit.",
    explanation: "Cash summary versus accruals-based performance statement.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A club made a deficit this year although its bank balance increased. Explain how this is possible and advise the committee on **one** action.",
    points: ["Cash can rise while there is a deficit, e.g. subscriptions received in advance / expenses still owing / depreciation is not a cash payment", "So the deficit shows running costs are not covered by income", "Action, e.g. raise subscriptions / cut costs / run a fundraising activity"],
    modelAnswer: "The bank balance can rise because members paid next year's subscriptions early and some bills are still unpaid, while depreciation reduces the surplus without any cash payment. The deficit shows that income does not cover the true cost of running the club, so the committee should raise subscriptions or start a fundraising activity.",
    hints: ["Which items affect the surplus but not the bank balance, and the reverse?"],
    explanation: "Accruals-based results can differ from cash movements.",
  });

  // ---------------------------------------------------------------- Practice structured 1: income and expenditure account from receipts and payments
  {
    const subs = subscriptions({ openArrears: 240, openAdvance: 120, received: 9740, closeArrears: 360, closeAdvance: 195 });
    const shop = activity({ name: "Gweru Netball Club", title: "Tuck shop trading account", sales: 6240, openInv: 530, purchases: r2(4150 - 290 + 365), closeInv: 610 });
    const rentCharge = r2(3600 + 280 - 430);
    const wages = r2(4320 - 0 + 360);
    const dep = r2((6800 + 1600) * 0.15);
    const ie = incomeExpenditure({ name: "Gweru Netball Club", income: [["Subscriptions", subs.ie], ["Profit on tuck shop", shop.profit], ["Tournament fees", 1480]], expenditure: [["Hall rent", rentCharge], ["Coach's wages", wages], ["Transport", 2275], ["Depreciation: equipment", dep]] });
    b.struct({
      d: 5, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Gweru Netball Club's receipts and payments for the year ended 31 December 2025 included:\n\n${table(["", U], [["Subscriptions received", 9740], ["Tuck shop sales", 6240], ["Tournament fees received", 1480], ["Paid to tuck shop suppliers", 4150], ["Hall rent paid", 3600], ["Coach's wages paid", 4320], ["Transport paid", 2275], ["New equipment bought", 1600]])}\n\nAdditional information:\n\n${table(["", "1 January 2025 " + U, "31 December 2025 " + U], [["Subscriptions in arrears", 240, 360], ["Subscriptions in advance", 120, 195], ["Tuck shop inventory", 530, 610], ["Tuck shop suppliers owed", 290, 365], ["Hall rent prepaid", 280, 430], ["Coach's wages owing", "", 360]])}\n\nEquipment at 1 January 2025 had cost ${money(6800)}. Depreciation is 15% a year on the cost of equipment held at 31 December.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: subs.ie, wrong: [9740], stem: "Calculate the subscription income for 2025.", explanation: `9,740 − 240 + 120 + 360 − 195 = ${fmt(subs.ie)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: shop.profit, wrong: [r2(6240 - (530 + 4150 - 610))], stem: "Calculate the profit on the tuck shop.", explanation: `Purchases 4,150 − 290 + 365 = ${fmt(r2(4150 - 290 + 365))}; cost of sales 530 + ${fmt(r2(4150 - 290 + 365))} − 610 = ${fmt(shop.cos)}; profit 6,240 − ${fmt(shop.cos)} = ${fmt(shop.profit)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: rentCharge, wrong: [r2(3600 - 280 + 430)], stem: "Calculate the hall rent charged for 2025.", explanation: `3,600 + 280 (prepaid last year, used this year) − 430 (prepaid for next year) = ${fmt(rentCharge)}.` }),
        P.num({ label: "(d)", marks: 1, kind: "money", value: dep, wrong: [r2(6800 * 0.15)], stem: "Calculate the depreciation of equipment for 2025.", explanation: `15% × (6,800 + 1,600) = ${fmt(dep)}.` }),
        P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the income and expenditure account for the year ended 31 December 2025.", points: ["Heading", `Subscriptions ${fmt(subs.ie)} (own figure)`, `Profit on tuck shop ${fmt(shop.profit)} and tournament fees ${fmt(1480)}`, `Hall rent ${fmt(rentCharge)} and coach's wages ${fmt(wages)}`, `Transport ${fmt(2275)} and depreciation ${fmt(dep)}; equipment bought NOT included`, `Surplus for the year ${fmt(ie.surplus)} (own figure)`], modelAnswer: ie.md, explanation: "Income less expenditure gives the surplus." }),
      ],
      hints: ["Prepare workings for subscriptions, the tuck shop, rent and wages first.", "The new equipment is capital expenditure."],
      explanation: `Model answer:\n\n${shop.md}\n\n${ie.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: club statement of financial position
  {
    const open = fundAtDate("Masvingo Chess Club", "at 1 January 2025", [["Furniture (net book value)", 3900], ["Chess sets and clocks (net book value)", 1650], ["Subscriptions in arrears", 180], ["Bank", 1245]], [["Subscriptions in advance", 75], ["Hall hire owing", 220]]);
    const surplus = 1365;
    const p = clubPosition({ name: "Masvingo Chess Club", nca: [["Furniture", 5200, 1750], ["Chess sets and clocks", 2900, 1580]], ca: [["Subscriptions in arrears", 135], ["Bank", r2(open.fund + surplus - (5200 - 1750) - (2900 - 1580) - 135 + 90 + 245)]], cl: [["Subscriptions in advance", 90], ["Hall hire owing", 245]], openFund: open.fund, surplus });
    const bank = r2(open.fund + surplus - (5200 - 1750) - (2900 - 1580) - 135 + 90 + 245);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Masvingo Chess Club's assets and liabilities at 1 January 2025 were: furniture (net book value) ${money(3900)}; chess sets and clocks (net book value) ${money(1650)}; subscriptions in arrears ${money(180)}; bank ${money(1245)}; subscriptions in advance ${money(75)}; hall hire owing ${money(220)}.\n\nFor the year ended 31 December 2025 the club's surplus was ${money(surplus)}. At 31 December 2025:\n\n${table(["", U], [["Furniture at cost", 5200], ["Furniture: accumulated depreciation", 1750], ["Chess sets and clocks at cost", 2900], ["Chess sets and clocks: accumulated depreciation", 1580], ["Subscriptions in arrears", 135], ["Bank", bank], ["Subscriptions in advance", 90], ["Hall hire owing", 245]])}`,
      parts: [
        P.num({ label: "(a)", marks: 3, kind: "money", value: open.fund, wrong: [r2(open.fund + 150), r2(open.fund - 360)], stem: "Calculate the accumulated fund at 1 January 2025.", explanation: `Assets ${fmt(open.ta)} − liabilities ${fmt(open.tl)} = ${fmt(open.fund)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: p.closing, wrong: [r2(open.fund - surplus)], stem: "Calculate the accumulated fund at 31 December 2025.", explanation: `${fmt(open.fund)} + ${fmt(surplus)} = ${fmt(p.closing)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: p.wc, wrong: [p.totCA], stem: "Calculate the working capital at 31 December 2025.", explanation: `Current assets ${fmt(p.totCA)} − current liabilities ${fmt(p.totCL)} = ${fmt(p.wc)}.` }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the club's statement of financial position at 31 December 2025.", points: ["Heading with \"at 31 December 2025\"", `Non-current assets at cost less accumulated depreciation: ${fmt(p.totNbv)}`, `Current assets including subscriptions in arrears: ${fmt(p.totCA)}`, `Current liabilities including subscriptions in advance: ${fmt(p.totCL)}`, `Net assets ${fmt(p.netAssets)}`, `Accumulated fund ${fmt(open.fund)} + surplus ${fmt(surplus)} = ${fmt(p.closing)}`], modelAnswer: p.md, explanation: "Net assets equal the closing accumulated fund." }),
      ],
      hints: ["Subscriptions in arrears are an asset; subscriptions in advance are a liability."],
      explanation: `Model answers:\n\n${open.md}\n\n${p.md}`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Income and expenditure account", "A club's income statement on the accruals basis, ending in a surplus or a deficit.");
  b.card("FORMULA", "Closing accumulated fund", "Opening accumulated fund + surplus (or − deficit) for the year.");
  b.card("FORMULA", "Expense charge with accruals", "Cash paid − opening accrual + closing accrual (prepayments: + opening, − closing).");
  b.card("FACT", "Capital items in club accounts", "Equipment bought is a non-current asset; only depreciation goes in the income and expenditure account.");
  b.card("CONCEPT", "Receipts and payments vs income and expenditure", "R&P: cash basis, capital items included, ends with the bank balance. I&E: accruals basis, depreciation, ends with surplus or deficit.");
  b.card("FACT", "Steps from receipts and payments to final accounts", "Opening fund → subscriptions account → activity trading accounts → adjust expenses → remove capital items, add depreciation → I&E → statement of financial position.");
  b.card("CONCEPT", "Why can cash rise while a club has a deficit?", "Advances received, bills unpaid and depreciation (no cash) all separate cash from the surplus or deficit.");
  b.card("FACT", "Subscriptions balances in the statement of financial position", "Arrears: current asset. Advances: current liability.");
});
