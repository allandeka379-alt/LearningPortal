// W2a: statements.adjustments
import { concept, P, table, trialBalance, check, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc, etb } from "../tables/w2a-lib.mjs";

concept("aacc.statements.adjustments", { file: "statements/adjustments", keyPrefix: "statements.adjustments" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which accounting concept requires revenue and expenses to be recorded in the period in which they arise, whether or not cash has moved?",
    ok: ["Matching (accruals)", "Correct: costs and revenue are assigned to the period they belong to."],
    bad: [["Historical cost", "Historical cost concerns the amount at which assets are first recorded."], ["Business entity", "The entity concept separates the owner from the business."], ["Going concern", "Going concern assumes the business will continue; it does not time revenue and costs."]],
    explanation: "Adjustments for accruals, prepayments and depreciation all apply the matching (accruals) concept.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Goods costing US\\$250 are taken by the owner for personal use. Which entry is made?",
    ok: ["Debit drawings; credit purchases", "Correct: drawings rise by the cost and purchases fall by the same amount."],
    bad: [["Debit purchases; credit drawings", "This reverses the correct entry."], ["Debit drawings; credit sales", "The goods were not sold, so no revenue arises."], ["Debit drawings; credit closing inventory", "Closing inventory is counted, so it is not changed."]],
    explanation: "The goods are removed from purchases at cost and charged to the owner as drawings.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which year-end adjustment increases profit for the year?",
    ok: ["Insurance paid in advance", "Correct: part of the premium belongs to next year, so this year's expense falls."],
    bad: [["Wages owing", "An accrual raises expenses and reduces profit."], ["Depreciation of equipment", "Depreciation is an expense, so profit falls."], ["An increase in the allowance for irrecoverable debts", "The increase is an expense, so profit falls."]],
    explanation: "A prepayment reduces the expense of the year, so profit rises.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Depreciation of equipment has not been charged. What is the effect on the draft financial statements?",
    ok: ["Profit and the carrying amount of equipment are both overstated", "Correct: the expense is missing and the asset has not been reduced."],
    bad: [["Profit is overstated and the carrying amount of equipment is understated", "Without the charge the carrying amount is too high, not too low."], ["Profit is understated and the carrying amount is overstated", "Missing an expense overstates profit."], ["Profit is understated and the carrying amount is understated", "Both are overstated when depreciation is missing."]],
    explanation: "Depreciation is an expense and reduces the asset's carrying amount, so omitting it overstates both.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A computer costing US\\$1,200 was bought in the year and debited to repairs. No depreciation is yet charged on it. What is the effect on the draft profit before depreciation is considered?",
    ok: ["Profit is understated by US\\$1,200 and non-current assets are understated by US\\$1,200", "Correct: the expense was too high and the asset was omitted."],
    bad: [["Profit is overstated by US\\$1,200 and non-current assets are overstated by US\\$1,200", "Charging the cost as an expense lowered profit, not raised it."], ["Profit is understated by US\\$1,200 and current assets are overstated", "No current asset is involved."], ["Profit is correct but non-current assets are understated", "Profit is understated too because repairs are overcharged."]],
    hints: ["Was an expense overstated or understated?"],
    explanation: "A capital item charged as an expense understates profit and leaves the asset out of the statement of financial position.",
  });
  const rec = 24000;
  const wo = 1000;
  const rem = r2(rec - wo);
  const alw = r2(rem * 0.05);
  const alwOpen = 900;
  const alwInc = r2(alw - alwOpen);
  const idExp = r2(wo + alwInc);
  chk(idExp, 1250);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Trade receivables were ${money(rec)} before a write-off of ${money(wo)}. The allowance for irrecoverable debts is to be 5% of the remaining receivables. The allowance was ${money(alwOpen)} at the start of the year. What is the total charge for irrecoverable debts in the statement of profit or loss?`,
    ok: [money(idExp), "Correct: 1,000 + (1,150 - 900) = 1,250."],
    bad: [[money(r2(wo + alw)), "The whole allowance has been charged instead of its increase."], [money(alw), "This is the allowance required, not the charge."], [money(alwInc), "The write-off has been left out."]],
    hints: ["Find the receivables remaining, then the allowance, then its change."],
    explanation: "Remaining receivables 23,000; allowance 5% = 1,150; increase 250; charge 1,000 + 250 = 1,250.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "In an extended trial balance, the profit for the year is the balancing figure. Where is it entered?",
    ok: ["Debit side of the profit or loss columns and credit side of the financial position columns", "Correct: it clears the profit and loss account and increases capital."],
    bad: [["Credit side of both pairs of columns", "Profit cannot be credited in both pairs."], ["Debit side of both pairs of columns", "The financial position columns need a credit for capital."], ["Credit side of the profit or loss columns and debit side of the financial position columns", "This would be the entry for a loss."]],
    hints: ["Income exceeds expenses in the profit or loss columns."],
    explanation: "Credits exceed debits in the profit or loss columns, so profit is added to the debit side; the same amount is a credit in the financial position columns (capital).",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A trader took goods costing US\\$500 for personal use but debited drawings and credited sales with their selling price of US\\$650. What is the effect on profit for the year?",
    ok: ["Overstated by US\\$150", "Correct: sales are 650 higher but purchases should only be 500 lower."],
    bad: [["Understated by US\\$150", "Revenue was increased, so profit is not understated."], ["Overstated by US\\$650", "Part of the credit (500) is the correct reduction in cost; only the difference is the error."], ["Overstated by US\\$500", "500 is the correct reduction in purchases, not the error."]],
    hints: ["Compare the credit made with the credit that should have been made."],
    explanation: "The correct credit is purchases 500; the credit made was sales 650. Profit is 150 too high.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "An increase in the allowance for irrecoverable debts reduces profit for the year.",
    answer: true,
    explanation: "True. The increase is charged as an expense. A decrease in the allowance is added back and raises profit.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Goods taken by the owner for personal use must be deducted from the closing inventory figure.",
    answer: false,
    hints: ["Closing inventory is counted at the year end."],
    explanation: "False. The closing inventory is counted physically, so goods already taken are not in it. The entry reduces purchases and increases drawings.",
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each adjustment to its double entry.",
    pairs: ["Wages owing at the year end", "Insurance prepaid", "Annual depreciation charge", "Goods taken by the owner"],
    right: ["Debit wages; credit other payables", "Debit other receivables; credit insurance", "Debit depreciation expense; credit accumulated depreciation", "Debit drawings; credit purchases"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each entry pairs a statement of profit or loss account with a statement of financial position account (drawings affect capital).",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentence on accrued wages.",
    template: "Wages owing at the year end {{blank:a}} profit and are shown within {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["reduce"], choices: ["reduce", "increase"] },
      { id: "b", accepted: ["current liabilities"], choices: ["current assets", "current liabilities", "capital"] },
    ],
    explanation: "An accrued expense is added to the expense, which reduces profit, and the unpaid amount is a current liability.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the account credited, other than the asset account, when a fixed charge for depreciation is recorded in the books.",
    accepted: ["accumulated depreciation", "provision for depreciation", "allowance for depreciation"],
    explanation: "The charge is debited to the depreciation expense account and credited to accumulated depreciation (provision for depreciation).",
  });

  // numerical
  const d1 = 18200;
  const n1 = r2(d1 - 430 + 270 - 1650 + 85);
  chk(n1, 16475);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: n1, calculator: true, wrong: [r2(d1 + 430 - 270 + 1650 - 85), r2(d1 - 430 - 270 - 1650 + 85)],
    stem: `Draft profit for the year was ${money(d1)}. Rent owing of ${money(430)} and depreciation of ${money(1650)} were not recorded, and insurance prepaid of ${money(270)} and commission receivable of ${money(85)} were also omitted. Calculate the corrected profit for the year.`,
    explanation: "18,200 - 430 (rent owing) + 270 (prepayment) - 1,650 (depreciation) + 85 (commission earned) = 16,475. The first wrong answer reverses every sign.",
  });
  const rec2 = 40000;
  const wo2 = 2000;
  const alw2 = r2((rec2 - wo2) * 0.04);
  const open2 = 2100;
  const exp2 = r2(wo2 + (alw2 - open2));
  chk(alw2, 1520);
  chk(exp2, 1420);
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: exp2, calculator: true, wrong: [r2(wo2 + alw2), alw2, r2(wo2 + open2 - alw2 + 2 * 0)],
    stem: `Trade receivables were ${money(rec2)} before an irrecoverable debt of ${money(wo2)} was written off. The allowance for irrecoverable debts is to be 4% of the remaining receivables; it stood at ${money(open2)} at the start of the year. Calculate the net charge for irrecoverable debts in the statement of profit or loss.`,
    hints: ["The allowance falls, so part of the write-off is offset."],
    explanation: "Remaining receivables 38,000; allowance 4% = 1,520; decrease 2,100 - 1,520 = 580. Net charge = 2,000 - 580 = 1,420.",
  });
  const d3 = 12400;
  const own = 180;
  const cap = 1500;
  const capDep = r2(cap * 0.1);
  const n3 = r2(d3 + own + cap - capDep);
  chk(n3, 13930);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: n3, calculator: true, wrong: [r2(d3 + own + cap), r2(d3 - own + cap - capDep)],
    stem: `Draft profit for the year was ${money(d3)}. Later it was found that (i) goods costing ${money(own)} had been taken by the owner and no entry made, and (ii) a machine costing ${money(cap)} had been debited to repairs; it is to be depreciated at 10% for the year. Calculate the corrected profit.`,
    hints: ["Which adjustments raise profit?"],
    explanation: "12,400 + 180 (purchases reduced) + 1,500 (repairs overstated) - 150 (depreciation 10% of 1,500) = 13,930. Forgetting the depreciation gives 14,080.",
  });
  const open4 = 24000;
  const prof4 = r2(15000 - 700 + 240 - 1800);
  const draw4 = 5200;
  const own4 = 350;
  const close4 = r2(open4 + prof4 + own4 - draw4 - own4);
  chk(prof4, 12740);
  chk(close4, 31540);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: close4, calculator: true, wrong: [r2(open4 + prof4 - draw4 - own4), r2(open4 + 15000 - draw4)],
    stem: `Draft profit was ${money(15000)}. Wages owing ${money(700)}, rent prepaid ${money(240)} and depreciation ${money(1800)} had not been recorded, and goods costing ${money(own4)} taken by the owner had not been recorded (they were bought in the year and are in purchases). Opening capital was ${money(open4)} and the owner's drawings in cash were ${money(draw4)}. Calculate the closing capital.`,
    hints: ["Correct the profit first; own-use goods raise profit and are also drawings."],
    explanation: "Corrected profit = 15,000 - 700 + 240 - 1,800 + 350 = 13,090; closing capital = 24,000 + 13,090 - 5,200 - 350 = 31,540. Omitting the 350 added to profit gives 31,190; using the draft profit gives 33,800.",
  });
  // fix: corrected profit includes own use
  // (computed above as prof4 without own-use; the closing figure includes it through +own4 and -own4)

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why every year-end adjustment must be entered twice.",
    points: ["Double entry: each adjustment changes a statement of profit or loss account and a statement of financial position account (or capital)", "Entering it once would leave profit or the financial position wrong and the statement of financial position out of balance"],
    modelAnswer: "Under double entry every change has two sides. An accrual, for example, raises an expense and creates a liability. If only one side is entered the statement of financial position will not balance and profit or net assets will be misstated.",
    explanation: "One mark for the two-sided nature, one for the consequence of a one-sided entry.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain how the prudence concept affects the allowance for irrecoverable debts.",
    points: ["Receivables should not be shown at more than the amount expected to be collected", "An allowance is deducted from receivables and the increase is charged as an expense", "Profit is therefore not overstated by debts that are unlikely to be paid"],
    modelAnswer: "Prudence says assets and profit should not be overstated. The business estimates the receivables it will not collect and deducts an allowance, and the increase in the allowance is charged to the statement of profit or loss, so profit is not inflated by doubtful debts.",
    hints: ["Think of what happens to the profit if no allowance is made."],
    explanation: "Link prudence to the lower profit and lower receivables figure.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Before applying for a bank loan, Nyasha proposes reducing the depreciation rate on her vehicles from 20% to 10% so that profit looks higher. Evaluate her proposal.",
    points: ["A lower rate raises profit and the carrying amount, which may impress the bank", "A rate change is acceptable only if the useful life has genuinely changed, otherwise profit is overstated (breach of prudence and neutrality)", "Consistency: methods should not change simply to improve results; the bank may detect this and lose trust", "Judgement: reject unless the vehicles' real useful life has lengthened, and disclose any change"],
    modelAnswer: "The change would raise profit and the carrying amount of the vehicles, which might help the application. But depreciation should reflect real use, so a lower rate is justified only if the vehicles will last longer. Otherwise profit is overstated, the accounts are not neutral and the bank may lose trust if it finds out. I would reject the proposal unless the useful life has truly changed, and disclose any change.",
    hints: ["Who uses the statements, and are the estimates honest?"],
    explanation: "One mark per reasoned point; the last mark is for a supported judgement.",
  });

  // Structured 1 (10 marks)
  const dp = 22600;
  const eq = 36000;
  const dep = r2(eq * 0.125);
  const recv = 21000;
  const wo5 = 800;
  const alw5 = r2((recv - wo5) * 0.03);
  const open5 = 450;
  const inc5 = r2(alw5 - open5);
  const prof5 = r2(dp - dep - wo5 - inc5 - 350);
  chk(dep, 4500);
  chk(alw5, 606);
  chk(inc5, 156);
  chk(prof5, 16794);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Tatenda owns a hardware shop in Mutare. The draft profit for the year ended 31 December 2025 was ${money(dp)}. These adjustments have not been made:\n\n` + table(["No.", "Adjustment"], [
      ["1", `Equipment costing ${money(eq)} is to be depreciated at 12.5% of cost.`],
      ["2", `An irrecoverable debt of ${money(wo5)} is to be written off from trade receivables of ${money(recv)}.`],
      ["3", `The allowance for irrecoverable debts is to be 3% of the remaining trade receivables; the allowance is ${money(open5)} at present.`],
      ["4", `Rent of ${money(350)} was received in advance for next year but credited to rent received for this year.`],
    ], ["l", "l"]),
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: dep, wrong: [r2(eq * 0.125 * 2)], stem: "Calculate the depreciation charge for the year.", explanation: "12.5% × 36,000 = 4,500." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: inc5, wrong: [alw5], stem: "Calculate the increase in the allowance for irrecoverable debts.", explanation: "Remaining receivables 21,000 - 800 = 20,200; allowance 3% = 606; increase 606 - 450 = 156." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: prof5, wrong: [r2(dp - dep - wo5 - inc5 + 350), r2(dp - dep - wo5 - alw5 - 350)], stem: "Calculate the corrected profit for the year.", explanation: "22,600 - 4,500 - 800 - 156 - 350 = 16,794. The rent received in advance must be deducted from this year's income." }),
      P.mcq({ label: "(d)", marks: 2, stem: "Where is the rent received in advance shown in the statement of financial position?", options: [["Current liabilities", "Correct: the business owes the tenant the use of the premises."], ["Current assets", "It is not an amount due to the business."], ["Non-current assets", "It is neither non-current nor an asset."], ["Capital", "It is not the owner's investment."]], answer: "A", explanation: "Income received in advance is a current liability." }),
    ],
    hints: ["Remember that the rent received in advance is deducted from profit, not added.", "Calculate the allowance after the write-off."],
    explanation: "This item tests depreciation, the allowance for irrecoverable debts and income received in advance.",
  });
  // fix the arithmetic in (c): 22,600 - 4,500 - 800 - 156 - 350 = 16,794
  void prof5;

  // Structured 2 (16 marks)
  const V = { eq: 32000, ad: 7500, inv0: 8900, pur: 70600, sal: 121400, wag: 16100, rent: 5100, ins: 2160, rec: 15200, alw: 540, bank: 5900, pay: 8300, dr: 8400 };
  const tbRows = [
    ["Equipment at cost", V.eq, null],
    ["Accumulated depreciation", null, V.ad],
    ["Inventory at 1 January 2025", V.inv0, null],
    ["Purchases", V.pur, null],
    ["Sales", null, V.sal],
    ["Wages", V.wag, null],
    ["Rent", V.rent, null],
    ["Insurance", V.ins, null],
    ["Trade receivables", V.rec, null],
    ["Allowance for irrecoverable debts", null, V.alw],
    ["Bank", V.bank, null],
    ["Trade payables", null, V.pay],
    ["Drawings", V.dr, null],
  ];
  const capital6 = r2(sum(tbRows.map((x) => x[1])) - sum(tbRows.map((x) => x[2])));
  const tb = trialBalance("Trial balance at 31 December 2025", [...tbRows, ["Capital at 1 January 2025", null, capital6]]);
  const cl6 = 12300;
  const wAcc = 1260;
  const iPre = 540;
  const dep6 = r2(V.eq * 0.1);
  const wo6 = 690;
  const alw6 = r2((V.rec - wo6) * 0.04);
  const inc6 = r2(alw6 - V.alw);
  const own6 = 360;
  const e = etb({
    accounts: [
      { name: "Equipment at cost", kind: "SFP", dr: V.eq }, { name: "Accumulated depreciation", kind: "SFP", cr: V.ad },
      { name: "Inventory at 1 January", kind: "PL", dr: V.inv0 }, { name: "Purchases", kind: "PL", dr: V.pur }, { name: "Sales", kind: "PL", cr: V.sal },
      { name: "Wages", kind: "PL", dr: V.wag }, { name: "Rent", kind: "PL", dr: V.rent }, { name: "Insurance", kind: "PL", dr: V.ins },
      { name: "Trade receivables", kind: "SFP", dr: V.rec }, { name: "Allowance", kind: "SFP", cr: V.alw }, { name: "Bank", kind: "SFP", dr: V.bank },
      { name: "Trade payables", kind: "SFP", cr: V.pay }, { name: "Drawings", kind: "SFP", dr: V.dr }, { name: "Capital", kind: "SFP", cr: capital6 },
    ],
    adjustments: [
      { label: "1", lines: [["Inventory at 31 December", cl6, null, "SFP"], ["Closing inventory", null, cl6, "PL"]] },
      { label: "2", lines: [["Wages", wAcc, null], ["Accruals", null, wAcc, "SFP"]] },
      { label: "3", lines: [["Prepayments", iPre, null, "SFP"], ["Insurance", null, iPre]] },
      { label: "4", lines: [["Depreciation", dep6, null, "PL"], ["Accumulated depreciation", null, dep6]] },
      { label: "5", lines: [["Irrecoverable debts", wo6, null, "PL"], ["Trade receivables", null, wo6]] },
      { label: "6", lines: [["Irrecoverable debts", inc6, null], ["Allowance", null, inc6]] },
      { label: "7", lines: [["Drawings", own6, null], ["Purchases", null, own6]] },
    ],
  });
  const profit6 = e.profit;
  const cos6 = r2(V.inv0 + V.pur - own6 - cl6);
  const gp6 = r2(V.sal - cos6);
  const wages6 = r2(V.wag + wAcc);
  const ins6 = r2(V.ins - iPre);
  const exp6 = r2(wages6 + V.rent + ins6 + dep6 + wo6 + inc6);
  chk(profit6, r2(gp6 - exp6), 0.001, "profit6");
  const draw6 = r2(V.dr + own6);
  const cap6 = r2(capital6 + profit6 - draw6);
  const ca6 = r2(cl6 + (V.rec - wo6 - alw6) + iPre + V.bank);
  const cl6tot = r2(V.pay + wAcc);
  const nca6 = r2(V.eq - V.ad - dep6);
  check("sfp6", nca6 + ca6, cap6 + cl6tot);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `The trial balance of Chipo Mutasa's trading business in Masvingo is below. The statements are for internal use.\n\n${tb.md}\n\nAdjustments at 31 December 2025:\n\n` + table(["No.", "Adjustment"], [
      ["1", `Closing inventory is ${money(cl6)}.`],
      ["2", `Wages owing are ${money(wAcc)}.`],
      ["3", `Insurance prepaid is ${money(iPre)}.`],
      ["4", "Depreciate the equipment at 10% of cost."],
      ["5", `Write off an irrecoverable debt of ${money(wo6)}.`],
      ["6", "The allowance is to be 4% of the remaining trade receivables."],
      ["7", `The owner took goods costing ${money(own6)}; no entry has been made.`],
    ], ["l", "l"]),
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: cos6, wrong: [r2(V.inv0 + V.pur - cl6), r2(V.inv0 + V.pur + own6 - cl6)], stem: "Calculate the cost of sales.", explanation: `Opening inventory ${fmt(V.inv0)} + purchases (${fmt(V.pur)} - ${fmt(own6)} = ${fmt(V.pur - own6)}) - closing inventory ${fmt(cl6)} = ${fmt(cos6)}. Forgetting the goods taken gives ${fmt(r2(V.inv0 + V.pur - cl6))}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: r2(wo6 + inc6), wrong: [alw6, wo6], stem: "Calculate the total charge for irrecoverable debts.", explanation: `Remaining receivables ${fmt(V.rec - wo6)}; allowance 4% = ${fmt(alw6)}; increase ${fmt(alw6)} - ${fmt(V.alw)} = ${fmt(inc6)}; charge ${fmt(wo6)} + ${fmt(inc6)} = ${fmt(r2(wo6 + inc6))}.` }),
      P.num({ label: "(c)", marks: 4, kind: "money", value: profit6, wrong: [r2(profit6 - own6), r2(profit6 + dep6)], stem: "Calculate the profit for the year.", explanation: `Gross profit ${fmt(V.sal)} - ${fmt(cos6)} = ${fmt(gp6)}. Expenses: wages ${fmt(wages6)}, rent ${fmt(V.rent)}, insurance ${fmt(ins6)}, depreciation ${fmt(dep6)}, irrecoverable debts ${fmt(r2(wo6 + inc6))} = ${fmt(exp6)}. Profit ${fmt(profit6)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: cap6, wrong: [r2(capital6 + profit6 - V.dr), r2(capital6 + profit6)], stem: "Calculate the capital at 31 December 2025 (opening capital + profit - total drawings).", explanation: `Drawings are ${fmt(V.dr)} + ${fmt(own6)} = ${fmt(draw6)}; capital = ${fmt(capital6)} + ${fmt(profit6)} - ${fmt(draw6)} = ${fmt(cap6)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Explain why the profit would be misstated if the owner's goods were not recorded as drawings.", points: ["Purchases would stay too high, so cost of sales is overstated and profit understated", "Drawings and therefore the deduction from capital would be understated", "Capital in the statement of financial position would be overstated"], modelAnswer: "If the goods are left in purchases, cost of sales is too high and profit is understated by the cost of the goods. Drawings are also understated, so capital in the statement of financial position is overstated.", explanation: "One mark for each effect." }),
    ],
    hints: ["Reduce purchases for the goods taken before finding cost of sales.", "Apply the 4% after the write-off.", "Drawings include the goods taken."],
    explanation: "This item tests a trial balance with seven adjustments, profit and capital.",
  });

  b.card("DEFINITION", "What is an **adjustment** at the year end?", "An entry that corrects trial balance figures so that profit and the statement of financial position reflect the period; every adjustment has two sides.");
  b.card("CONCEPT", "Which concept supports year-end adjustments?", "Matching (accruals): revenue and costs belong to the period in which they arise, not when cash moves.");
  b.card("FORMULA", "Charge for irrecoverable debts in the statement of profit or loss", "Debts written off + increase (or - decrease) in the allowance. The allowance is calculated on receivables after the write-off.");
  b.card("FACT", "Entry for goods taken by the owner", "Debit drawings, credit purchases, at cost. Closing inventory is not changed.");
  b.card("FACT", "Which adjustments reduce profit?", "Accrued expenses, depreciation, irrecoverable debts and increases in the allowance, and income received in advance.");
  b.card("FACT", "Which adjustments increase profit?", "Prepaid expenses, accrued income, goods taken by the owner and capital items wrongly charged as expenses.");
  b.card("DEFINITION", "What is an **extended trial balance**?", "A worksheet adding adjustment, profit or loss and financial position columns to the trial balance so the statements can be prepared directly.");
  b.card("CONCEPT", "Profit as the balancing figure in the extended trial balance", "Debit side of the profit or loss columns and credit side of the financial position columns; a loss is the reverse.");
  b.card("FACT", "Effect of a capital item charged as an expense", "Expenses overstated and profit understated; the asset is missing. Correct it by capitalising and depreciating it.");
});
