// W3b: sole trader financial statements with year-end adjustments.
import { concept, P, money, check, r2, sum, ZIM, CAM } from "../lib.mjs";
import { soleTrader, TERMS, table, U, fmt } from "../tables/w3b-lib.mjs";

const withCapital = (rows, label = "Capital") => {
  const d = sum(rows.map((r) => r[1] ?? 0));
  const c = sum(rows.map((r) => r[2] ?? 0));
  if (d - c <= 0) throw new Error("capital would be negative");
  return [...rows, [label, null, r2(d - c), "capital"]];
};

concept("acc.statements.adjusted-statements", { file: "statements/adjusted-statements", keyPrefix: "statements.adjusted-statements" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Electricity of US\\$240 is owing at the year end. How is it shown?",
    options: [
      ["Added to electricity expense and shown as a current liability", "Correct: the expense belongs to this year and is still owed."],
      ["Deducted from electricity expense and shown as a current asset", "That is the treatment of a prepayment."],
      ["Added to electricity expense and shown as a current asset", "An amount owed is a liability, not an asset."],
      ["Shown as a current liability only, with no change to the expense", "The expense must include the amount owing (matching)."],
    ],
    answer: "A",
    explanation: "An accrued expense increases the expense and is an other payable (current liability).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rent received includes US\\$400 paid by a tenant for next year. How is the US\\$400 treated?",
    options: [
      ["Deducted from rent received and shown as a current liability", "Correct: it is income in advance, owed back as a service."],
      ["Added to rent received and shown as a current asset", "That is the treatment of income due (accrued income)."],
      ["Deducted from rent received and shown as a current asset", "Money received for next year is a liability."],
      ["Left in rent received because the cash has been received", "Income is matched to the period it relates to, not the date of receipt."],
    ],
    answer: "A",
    explanation: "Income received in advance reduces this year's income and is an other payable.",
  });
  {
    const old = 470, recv = 12700, wo = 300, pct = 5;
    const neu = r2(((recv - wo) * pct) / 100);
    const ch = r2(neu - old);
    check("allow mcq", ch, 150);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Trade receivables are ${money(recv)} before writing off an irrecoverable debt of ${money(wo)}. The allowance for irrecoverable debts is to be ${pct}% of the remaining receivables; it was ${money(old)}. What amount for the allowance appears in the income statement?`,
      options: [
        [`${money(ch)} increase (expense)`, `Correct: new allowance ${fmt(neu)} less old allowance ${fmt(old)}.`],
        [`${money(neu)} increase (expense)`, "This charges the whole new allowance instead of the change."],
        [`${money(r2((recv * pct) / 100 - old))} increase (expense)`, "This calculates the allowance before the write-off."],
        [`${money(ch)} decrease (income)`, `The allowance rose from ${fmt(old)} to ${fmt(neu)}: it is an increase.`],
      ],
      answer: "A",
      hints: ["Write off the debt first, then take the percentage."],
      explanation: `New allowance ${pct}% × (${fmt(recv)} − ${fmt(wo)}) = ${fmt(neu)}; increase ${fmt(neu)} − ${fmt(old)} = ${fmt(ch)}.`,
    });
  }
  {
    const cost = 32000, acc = 12800, rate = 20;
    const dep = r2(((cost - acc) * rate) / 100);
    check("rb dep", dep, 3840);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `The trial balance shows motor vehicles at cost ${money(cost)} and provision for depreciation ${money(acc)}. Depreciation is 20% per annum on the reducing balance. What is the depreciation charge for the year?`,
      options: [
        [money(dep), "Correct: 20% × (32,000 − 12,800)."],
        [money(r2(cost * 0.2)), "This is 20% of cost: the straight-line answer."],
        [money(r2(acc * 0.2)), "This takes 20% of the provision instead of the net book value."],
        [money(r2(cost - acc - dep)), "This is the net book value after the charge."],
      ],
      answer: "A",
      explanation: `Reducing balance: 20% × net book value ${fmt(cost - acc)} = ${fmt(dep)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "An accrual for wages of US\\$300 was **omitted** from the financial statements. What is the effect?",
    options: [
      ["Profit overstated by US\\$300; working capital overstated by US\\$300", "Correct: the expense is too low and a current liability is missing."],
      ["Profit understated by US\\$300; working capital understated by US\\$300", "Leaving out an expense makes profit too high, not too low."],
      ["Profit overstated by US\\$300; working capital unaffected", "The missing other payable is a current liability, so working capital is affected."],
      ["Profit unaffected; current liabilities understated by US\\$300", "The wages expense is understated, so profit is affected."],
    ],
    answer: "A",
    hints: ["Trace both effects of the accrual."],
    explanation: "Omitting the accrual understates wages (profit too high) and understates current liabilities (working capital too high).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Closing inventory was **understated** by US\\$700. Which figures are understated as a result?",
    options: [
      ["Gross profit, profit for the year, current assets and closing capital", "Correct: cost of sales is overstated, so all four are too low."],
      ["Cost of sales and current liabilities", "Cost of sales is overstated; liabilities are not affected."],
      ["Revenue and gross profit only", "Revenue is not affected by inventory."],
      ["Current assets and capital only; profit is not affected at all", "Closing inventory is deducted in cost of sales, so profit is affected."],
    ],
    answer: "A",
    hints: ["Closing inventory appears in both statements."],
    explanation: "A lower closing inventory raises cost of sales, cutting gross profit, profit and capital, and lowers current assets.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Insurance paid of US\\$2,160 covers the 12 months to 31 March 2026. The year end is 31 December 2025. Which is correct?",
    options: [
      ["Insurance expense US\\$1,620; prepayment US\\$540", "Correct: 9 months belong to 2025 and 3 months to 2026."],
      ["Insurance expense US\\$2,160; no prepayment", "Three months relate to 2026 and must be carried forward."],
      ["Insurance expense US\\$540; prepayment US\\$1,620", "The months have been swapped."],
      ["Insurance expense US\\$1,620; accrual US\\$540", "Money paid in advance is a prepayment (asset), not an accrual."],
    ],
    answer: "A",
    explanation: "2,160 ÷ 12 = 180 a month. April–December 2025 = 9 months = 1,620; January–March 2026 = 540 prepaid.",
  });
  check("ins", 2160 / 12 * 9, 1620);
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The allowance for irrecoverable debts falls from US\\$620 to US\\$500. How is this shown in the income statement?",
    options: [
      ["US\\$120 added as other income", "Correct: a decrease in the allowance increases profit."],
      ["US\\$120 deducted as an expense", "An expense arises only when the allowance increases."],
      ["US\\$500 deducted as an expense", "Only the change appears in the income statement."],
      ["Nothing; the allowance appears only in the statement of financial position", "The change in the allowance always passes through the income statement."],
    ],
    answer: "A",
    explanation: "A decrease in the allowance of 620 − 500 = 120 is added to gross profit as other income.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A prepaid expense is deducted from the expense in the income statement and shown as a current asset.",
    answer: true,
    explanation: "True. It is an other receivable: the business has paid for a service it has not yet used.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Depreciation for the year is deducted from the cash balance in the statement of financial position.",
    answer: false,
    explanation: "False. Depreciation is a non-cash expense; it is added to accumulated depreciation and deducted from the cost of the asset.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each adjustment with its effect in the statement of financial position.",
    right: ["Current liability", "Current asset", "Deducted from trade receivables", "Added to accumulated depreciation", "Added to drawings"],
    pairs: ["Wages owing", "Insurance paid in advance", "New allowance for irrecoverable debts", "Depreciation for the year", "Goods taken by the owner"],
    rightIndex: [0, 1, 2, 3, 4],
    hints: ["Each adjustment also has an effect in the income statement; here match only the statement of financial position."],
    explanation: "Accruals are other payables; prepayments other receivables; the allowance reduces receivables; depreciation builds up the provision; goods taken are drawings.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the adjusted figures.",
    template: "Wages in the trial balance US\\$15,200; wages owing US\\$380. Wages expense = US\\$ {{blank:a}}. Rent paid US\\$6,000 includes US\\$500 for next year. Rent expense = US\\$ {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["15580", "15,580"] },
      { id: "b", accepted: ["5500", "5,500"] },
    ],
    explanation: "Accrual: 15,200 + 380 = 15,580. Prepayment: 6,000 − 500 = 5,500.",
  });
  check("fib", 15200 + 380, 15580);

  // ---------------------------------------------------------------- Numerical
  {
    const draft = 14650, accr = 520, prep = 360, dep = 2400, inc = 90;
    const adj = r2(draft - accr + prep - dep - inc);
    b.calc({
      d: 3, kind: "money", value: adj, calculator: true, wrong: [r2(draft + accr - prep - dep - inc), r2(draft - accr + prep - dep)],
      stem: `Tatenda's draft profit, before any year-end adjustments, was ${money(draft)}. Adjustments: electricity owing ${money(accr)}; rates prepaid ${money(prep)}; depreciation ${money(dep)}; increase in the allowance for irrecoverable debts ${money(inc)}. Calculate the adjusted profit for the year.`,
      hints: ["Accruals and expenses reduce profit; prepayments increase it."],
      explanation: `${fmt(draft)} − ${fmt(accr)} + ${fmt(prep)} − ${fmt(dep)} − ${fmt(inc)} = ${fmt(adj)}. Reversing the accrual and prepayment gives ${fmt(r2(draft + accr - prep - dep - inc))}.`,
    });
  }
  {
    const tbRates = 3240, prep = 270, owe = 0;
    const comm = 1150, due = 230;
    const v = r2(comm + due);
    b.num({
      d: 2, kind: "money", value: v, wrong: [r2(comm - due)],
      stem: `Commission received in the trial balance is ${money(comm)}. A further ${money(due)} of commission for December 2025 had not yet been received. Calculate the commission received shown in the income statement for 2025.`,
      explanation: `Income due is added: ${fmt(comm)} + ${fmt(due)} = ${fmt(v)}. It is also a current asset (other receivable).`,
    });
  }
  {
    const ca = [8350, 6120, 420, 1990, 175], cl = [5480, 660];
    const wc = r2(sum(ca) - sum(cl));
    b.calc({
      d: 3, kind: "money", value: wc, calculator: true, wrong: [r2(sum(ca) - 5480)],
      stem: `After adjustments, a business has: inventory ${money(8350)}; trade receivables less allowance ${money(6120)}; prepaid rent ${money(420)}; bank ${money(1990)}; cash ${money(175)}; trade payables ${money(5480)}; accrued wages ${money(660)}. Calculate the working capital.`,
      hints: ["Prepayments are current assets; accruals are current liabilities."],
      explanation: `Current assets ${fmt(sum(ca))} − current liabilities ${fmt(sum(cl))} = ${fmt(wc)}. Forgetting the accrued wages gives ${fmt(r2(sum(ca) - 5480))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why the closing inventory, accruals and prepayments must be shown in **both** financial statements.",
    points: ["Each adjustment changes an income or expense figure (matching), affecting profit", "and leaves an asset or liability at the year end, so the statement of financial position must show it to balance (double entry)"],
    modelAnswer: "Adjustments match income and expenses to the year, changing profit; the other half of each entry is an asset or liability still held or owed at the year end, so it must appear in the statement of financial position, otherwise it would not balance.",
    hints: ["Think of the double entry behind each adjustment."],
    explanation: "Every adjustment is a double entry with one side in each statement.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 3,
    stem: "Farai wants to reduce his allowance for irrecoverable debts from 5% to 1% of trade receivables \"to show a better profit for the bank\". Advise him.",
    points: ["Reducing the allowance would raise profit (the decrease is other income)", "but would break the prudence concept / overstate receivables if debts are still doubtful", "Advice: the allowance should be a realistic estimate based on past experience; misleading the bank is unethical"],
    modelAnswer: "Lowering the allowance would increase profit, but if as many customers are still likely to default, receivables and profit would be overstated, breaking the prudence concept. He should keep a realistic allowance; showing the bank a misleading profit is unethical and could lead to a loan he cannot repay.",
    hints: ["Which concept guides the size of the allowance?"],
    explanation: "Profit must not be inflated by an unrealistic estimate.",
  });

  // ---------------------------------------------------------------- Practice structured 1 (full, smaller TB)
  {
    const rows = withCapital([
      ["Revenue", null, 68400, "revenue"], ["Purchases", 42150, null, "purchases"], ["Inventory at 1 January 2025", 5870, null, "openInv"],
      ["Wages", 9300, null, "expense"], ["Rent", 4500, null, "expense"], ["Insurance", 1440, null, "expense"], ["General expenses", 1085, null, "expense"],
      ["Shop fittings", 15000, null, "nca"], ["Provision for depreciation: shop fittings", null, 4500, "accdep:Shop fittings"],
      ["Trade receivables", 5600, null, "receivables"], ["Allowance for irrecoverable debts", null, 180, "allowance"],
      ["Bank", 2765, null, "current"], ["Trade payables", null, 4930, "payables"], ["Drawings", 7800, null, "drawings"],
    ]);
    const st = soleTrader({ name: "Chipo Mlambo", terms: TERMS.BOTH, rows, adj: { closeInv: 6340, dep: { "Shop fittings": 1500 }, accrued: [["Wages", 380]], prepaid: [["Rent", 500]], allowance: r2(5600 * 0.05) } });
    const tbRows = rows.map(([a, d, c]) => [a, d, c]);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Chipo Mlambo runs a household goods shop in Chinhoyi. Her trial balance at 31 December 2025 was:\n\n${st.tb.md}\n\nNotes at 31 December 2025:\n\n1. Inventory was valued at ${money(6340)}.\n2. Shop fittings are depreciated at 10% per annum on cost.\n3. Wages of ${money(380)} were owing.\n4. Rent of ${money(500)} was prepaid.\n5. The allowance for irrecoverable debts is to be 5% of trade receivables.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: st.is.gp, wrong: [r2(68400 - 42150)], stem: "Calculate the gross profit.", explanation: `Cost of sales 5,870 + 42,150 − 6,340 = ${fmt(st.is.cos)}; gross profit 68,400 − ${fmt(st.is.cos)} = ${fmt(st.is.gp)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: st.figures.allowChange, wrong: [st.figures.newAllow], stem: "Calculate the increase in the allowance for irrecoverable debts.", explanation: `5% × 5,600 = ${fmt(st.figures.newAllow)}; increase ${fmt(st.figures.newAllow)} − 180 = ${fmt(st.figures.allowChange)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: st.is.np, wrong: [r2(st.is.np + 380 + 500), r2(st.is.np + st.figures.allowChange - st.figures.newAllow)], stem: "Calculate the profit for the year (net profit).", explanation: `Expenses: wages 9,680, rent 4,000, insurance 1,440, general 1,085, allowance increase ${fmt(st.figures.allowChange)}, depreciation 1,500; total ${fmt(st.is.totExp)}. Profit ${fmt(st.is.gp)} − ${fmt(st.is.totExp)} = ${fmt(st.is.np)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: st.sofp.wc, wrong: [r2(st.sofp.wc + 380)], stem: "Calculate the working capital at 31 December 2025.", explanation: `Current assets ${fmt(st.sofp.totCA)} − current liabilities ${fmt(st.sofp.totCL)} = ${fmt(st.sofp.wc)}.` }),
        P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare Chipo's statement of financial position at 31 December 2025.", points: ["Correct heading", `Shop fittings 15,000 less 6,000 = 9,000`, `Inventory 6,340; receivables 5,600 less allowance ${fmt(st.figures.newAllow)} = ${fmt(r2(5600 - st.figures.newAllow))}`, "Prepaid rent 500 and bank 2,765 as current assets", `Trade payables 4,930 and accrued wages 380; working capital ${fmt(st.sofp.wc)}`, `Capital ${fmt(rows.at(-1)[2])} + profit ${fmt(st.is.np)} − drawings 7,800 = ${fmt(st.sofp.closing)}`], modelAnswer: st.sofp.md, explanation: "Each note is used once in each statement." }),
      ],
      hints: ["Tick each note twice: once in each statement.", "Only the increase in the allowance is an expense."],
      explanation: `Model answers:\n\n${st.is.md}\n\n${st.sofp.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (effects of adjustments; ZIM terms)
  {
    const np0 = 17420;
    const effects = [
      ["Closing inventory was overvalued by US\\$650", -650],
      ["Rates prepaid of US\\$420 were treated as an expense of the year", 420],
      ["Depreciation of US\\$1,250 on fixtures was omitted", -1250],
      ["Commission receivable of US\\$360 was not recorded", 360],
    ];
    const np1 = r2(np0 + sum(effects.map((e) => e[1])));
    check("np1 text", np1, np0 - 650 + 420 - 1250 + 360);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true, applies: ZIM,
      stem: `Nyasha Dube's draft net profit for the year ended 31 December 2025 was ${money(np0)}. Her accountant then found:\n\n` + table(["No.", "Item"], effects.map((e, i) => [String(i + 1), e[0]])),
      parts: [
        P.mcq({ label: "(a)", stem: "Which item **reduces** the net profit by the largest amount when it is corrected?", options: [["Item 3", "Correct: the omitted depreciation of 1,250 is an extra expense."], ["Item 1", "Reducing closing inventory lowers profit, but only by 650."], ["Item 2", "Removing a prepaid amount from the expense raises profit."], ["Item 4", "Recording income due raises profit."]], answer: "A", explanation: "Items 1 and 3 reduce profit (by 650 and 1,250); items 2 and 4 increase it." }),
        P.num({ label: "(b)", marks: 4, kind: "money", value: np1, wrong: [r2(np0 + 650 - 420 + 1250 - 360), r2(np0 - 650 + 420 - 1250)], stem: "Calculate the corrected net profit.", explanation: `${fmt(np0)} − 650 + 420 − 1,250 + 360 = ${fmt(np1)}.` }),
        P.fib({ label: "(c)", stem: "Complete the effect of each correction on the statement of financial position.", template: "Item 1: current assets {{blank:a}} by US\\$650. Item 2: current assets {{blank:b}} by US\\$420. Item 4: current assets {{blank:c}} by US\\$360.", blanks: [{ id: "a", accepted: ["decrease"], choices: ["increase", "decrease", "do not change"] }, { id: "b", accepted: ["increase"], choices: ["increase", "decrease", "do not change"] }, { id: "c", accepted: ["increase"], choices: ["increase", "decrease", "do not change"] }], explanation: "Inventory falls; a prepayment and income due are new current assets." }),
        P.manual({ label: "(d)", marks: 2, stem: "State the effect of item 3 on the statement of financial position.", points: ["Provision for depreciation (accumulated depreciation) on fixtures increases by 1,250", "so the net book value of non-current assets / capital (through lower profit) falls by 1,250"], modelAnswer: "The provision for depreciation on fixtures rises by 1,250, reducing their net book value by 1,250; closing capital falls by the same amount through the lower profit.", explanation: "Depreciation reduces both NBV and profit." }),
        P.manual({ label: "(e)", marks: 2, stem: "Name the concept that requires items 2 and 4 to be adjusted, and explain it briefly.", points: ["Matching (accruals) concept", "Income and expenses are recorded in the period they relate to, not when cash is paid or received"], modelAnswer: "The matching (accruals) concept: income and expenses belong to the year in which they are earned or incurred, whatever the date of payment.", explanation: "Prepayments and income due follow matching." }),
      ],
      hints: ["For each item ask: does profit go up or down, and by how much?"],
      explanation: `Corrected net profit ${fmt(np1)}.`,
    });
  }

  // ---------------------------------------------------------------- Cards
  b.card("FACT", "The two-effect rule", "Every year-end adjustment appears once in the income statement and once in the statement of financial position.");
  b.card("FACT", "Accrued expense", "Add to the expense; show as a current liability (other payable).");
  b.card("FACT", "Prepaid expense", "Deduct from the expense; show as a current asset (other receivable).");
  b.card("FACT", "Income due / income in advance", "Income due: add to income, current asset. Income in advance: deduct from income, current liability.");
  b.card("FORMULA", "Change in the allowance for irrecoverable debts", "New allowance (on receivables after write-offs) − old allowance. Increase = expense; decrease = other income.");
  b.card("FACT", "Trade receivables in the statement of financial position", "Receivables after write-offs, less the full new allowance.");
  b.card("FACT", "Goods taken by the owner", "Deduct from purchases (at cost); add to drawings.");
  b.card("FACT", "Depreciation in the statements", "Expense in the income statement; added to the provision (accumulated depreciation) in the statement of financial position.");
  b.card("CONCEPT", "If closing inventory is overstated…", "Cost of sales understated → gross profit, profit, current assets and capital overstated.");
});
