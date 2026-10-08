// W4a: financial statements of limited companies.
import { concept, P, money, r2, sum, check } from "../lib.mjs";
import { soce, companyIncome, headed, table, fmt, U } from "../tables/w4a-lib.mjs";

concept("acc.companies.financial-statements", { file: "companies/financial-statements", keyPrefix: "companies.financial-statements" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where are **dividends paid** by a limited company recorded?",
    options: [
      ["Statement of changes in equity", "Correct: they reduce retained earnings."],
      ["Income statement, as an expense", "Dividends are distributions to owners, not expenses."],
      ["Current liabilities", "Dividends already paid are no longer owed."],
      ["Non-current liabilities", "Dividends are not loans."],
    ],
    answer: "A",
    explanation: "Dividends paid are deducted from retained earnings in the statement of changes in equity.",
  });
  {
    const deb = 75000, rate = 8, paid = 3750;
    const charge = r2(deb * rate / 100);
    const owing = r2(charge - paid);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `A company has had ${money(deb)} of ${rate}% debentures in issue all year. Debenture interest paid during the year was ${money(paid)}. How much debenture interest is shown as a current liability at the year end?`,
      options: [
        [money(owing), "Correct: full charge 6,000 − paid 3,750."],
        [money(charge), "This is the full year's charge, not the amount owing."],
        [money(paid), "This is the amount already paid."],
        [money(r2(charge + paid)), "The amount paid has been added instead of deducted."],
      ],
      answer: "A",
      explanation: `Charge ${fmt(deb)} × ${rate}% = ${fmt(charge)}; paid ${fmt(paid)}; owing ${fmt(owing)} (other payables).`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The directors transfer US\\$20,000 from retained earnings to the general reserve. What is the effect on **total** equity?",
    options: [
      ["No change", "Correct: one reserve rises and another falls by the same amount."],
      ["It falls by US\\$20,000", "Nothing leaves the company; profit is only moved between reserves."],
      ["It rises by US\\$20,000", "No new equity is created."],
      ["It falls by US\\$40,000", "The amount is moved once; total equity is unchanged."],
    ],
    answer: "A",
    explanation: "A transfer to reserve changes the make-up of equity, not its total.",
  });
  {
    const open = 46300, profit = 71250, divs = 38000, tr = 12000;
    const close = r2(open + profit - divs - tr);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Retained earnings at 1 January 2025 were ${money(open)}. Profit for the year ${money(profit)}; dividends paid ${money(divs)}; transfer to general reserve ${money(tr)}. What are the retained earnings at 31 December 2025?`,
      options: [
        [money(close), "Correct: 46,300 + 71,250 − 38,000 − 12,000."],
        [money(r2(open + profit - divs)), "The transfer to general reserve has been left out."],
        [money(r2(open + profit - divs + tr)), "The transfer has been added instead of deducted."],
        [money(r2(profit - divs - tr)), "The opening balance has been left out."],
      ],
      answer: "A",
      hints: ["Which items take profit out of the retained earnings column?"],
      explanation: `${fmt(open)} + ${fmt(profit)} − ${fmt(divs)} − ${fmt(tr)} = ${fmt(close)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How are **directors' fees** treated in a limited company's accounts?",
    options: [
      ["As an expense in the income statement", "Correct: directors are employees of the company."],
      ["As an appropriation in the statement of changes in equity", "Only dividends and transfers are shown there."],
      ["As drawings deducted from share capital", "Companies have no drawings."],
      ["As a finance cost after profit from operations", "Finance costs are interest on borrowings."],
    ],
    answer: "A",
    explanation: "Directors' fees and salaries are operating expenses, unlike partners' salaries, which are appropriations.",
  });
  {
    const gp = 182400, exp = 109650, fin = 7200;
    const pfo = r2(gp - exp);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Gross profit ${money(gp)}; operating expenses ${money(exp)}; debenture interest ${money(fin)}. What is the **profit from operations**?`,
      options: [
        [money(pfo), "Correct: gross profit less operating expenses, before finance costs."],
        [money(r2(pfo - fin)), "This is the profit for the year, after finance costs."],
        [money(r2(pfo + fin)), "Finance costs are not added."],
        [money(gp), "This is the gross profit."],
      ],
      answer: "A",
      explanation: `${fmt(gp)} − ${fmt(exp)} = ${fmt(pfo)}. The profit for the year is ${fmt(r2(pfo - fin))} after the debenture interest.`,
    });
  }
  {
    const oldN = 300000, newN = 100000, dps = 0.05;
    const div = r2(oldN * dps);
    b.mcq({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A company had 300,000 ordinary shares in issue. It paid a final dividend of US\\$0.05 per share in **March 2025**, and issued another 100,000 shares in **June 2025**. What was the amount of that final dividend?`,
      options: [
        [money(div), "Correct: only the 300,000 shares in issue in March receive it."],
        [money(r2((oldN + newN) * dps)), "The new shares were not in issue when the dividend was paid."],
        [money(r2(newN * dps)), "This uses only the new shares."],
        [money(r2(oldN * dps / 2)), "The dividend per share is not halved."],
      ],
      answer: "A",
      hints: ["Which shares existed on the date the dividend was paid?"],
      explanation: `300,000 × US\\$0.05 = ${fmt(div)}. The 100,000 shares issued in June cannot receive a dividend paid in March.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "At 31 December 2025 the directors **propose** a final dividend that will be paid in April 2026. How is it treated in the 2025 financial statements?",
    options: [
      ["It is not deducted; it may be shown in a note", "Correct: only dividends paid in the year are deducted."],
      ["It is deducted from retained earnings for 2025", "Proposed dividends are not yet paid, so they are not deducted."],
      ["It is shown as an expense for 2025", "Dividends are never expenses."],
      ["It is added to the general reserve", "A dividend is not a reserve."],
    ],
    answer: "A",
    hints: ["Has the company paid, or become committed to, anything at the year end?"],
    explanation: "The statement of changes in equity deducts dividends paid during the year; a proposed final dividend appears in the following year's statement when it is paid.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A company's statement of changes in equity includes a column for retained earnings.",
    answer: true,
    explanation: "True. It has columns for each class of share capital, each reserve, retained earnings and a total.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Debenture interest is deducted from retained earnings in the statement of changes in equity.",
    answer: false,
    explanation: "False. Debenture interest is a finance cost in the income statement, deducted before the profit for the year.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with the statement in which it first appears.",
    right: ["Income statement", "Statement of changes in equity", "Statement of financial position only"],
    pairs: ["Debenture interest for the year", "Interim dividend paid", "Directors' fees", "Transfer to general reserve", "Trade payables", "Issue of ordinary shares for cash"],
    rightIndex: [0, 1, 0, 1, 2, 1],
    explanation: "Expenses and finance costs go to the income statement; share issues, dividends and transfers to the statement of changes in equity; payables only to the statement of financial position.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the statements.",
    template: "Profit for the year is added to {{blank:a}}. Debenture interest owing at the year end is a {{blank:b}} liability. Equity at the year end is taken from the closing balances of the {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["retained earnings"], choices: ["retained earnings", "share capital", "general reserve"] },
      { id: "b", accepted: ["current"], choices: ["current", "non-current"] },
      { id: "c", accepted: ["statement of changes in equity"], choices: ["statement of changes in equity", "income statement", "trial balance"] },
    ],
    explanation: "Profit goes to retained earnings; unpaid interest is a current liability; equity totals come from the statement of changes in equity.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const s = soce("x", ["Share capital", "General reserve", "Retained earnings"], [150000, 16500, 27450], [["Issue of shares", [55000, null, null]], ["Profit for the year", [null, null, 49600]], ["Dividends paid", [null, null, -22500]], ["Transfer", [null, 10000, -10000]]]);
    b.calc({
      d: 3, kind: "money", value: s.totalClose, calculator: true, wrong: [r2(s.totalClose - 55000), r2(s.totalClose - 10000)],
      stem: `At 1 January 2025 a company's equity was: share capital ${money(150000)}, general reserve ${money(16500)}, retained earnings ${money(27450)}. During 2025 it issued shares for ${money(55000)} at par, made a profit of ${money(49600)}, paid dividends of ${money(22500)} and transferred ${money(10000)} to the general reserve. Calculate total equity at 31 December 2025.`,
      hints: ["The transfer does not change total equity."],
      explanation: `${fmt(s.totalOpen)} + ${fmt(55000)} + ${fmt(49600)} − ${fmt(22500)} = ${fmt(s.totalClose)}. Deducting the transfer as well gives ${fmt(r2(s.totalClose - 10000))}.`,
    });
  }
  {
    const pfo = 58340, deb = 40000, rate = 9;
    const profit = r2(pfo - deb * rate / 100);
    b.num({
      d: 2, kind: "money", value: profit, calculator: true, wrong: [pfo],
      stem: `A company's profit from operations was ${money(pfo)}. It had ${money(deb)} of ${rate}% debentures in issue all year. Calculate the profit for the year.`,
      explanation: `Debenture interest ${fmt(deb)} × ${rate}% = ${fmt(r2(deb * 0.09))}; ${fmt(pfo)} − ${fmt(r2(deb * 0.09))} = ${fmt(profit)}.`,
    });
  }
  {
    const close = 64180, open = 39520, divs = 26000, tr = 8000;
    const profit = r2(close - open + divs + tr);
    b.calc({
      d: 4, kind: "money", value: profit, calculator: true, wrong: [r2(close - open + divs), r2(close - open)],
      stem: `Retained earnings rose from ${money(open)} at 1 January 2025 to ${money(close)} at 31 December 2025. During the year dividends of ${money(divs)} were paid and ${money(tr)} was transferred to the general reserve. Calculate the profit for the year.`,
      hints: ["Work backwards through the retained earnings column."],
      explanation: `Profit = ${fmt(close)} − ${fmt(open)} + ${fmt(divs)} + ${fmt(tr)} = ${fmt(profit)}. Forgetting the transfer gives ${fmt(r2(close - open + divs))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a limited company has no drawings account.",
    points: ["The company is a separate legal entity; shareholders cannot take money out as they wish", "Owners receive their share of profit as dividends declared by the directors"],
    modelAnswer: "A company is separate from its shareholders, so they cannot simply withdraw cash. They are rewarded by dividends, which the directors declare out of profits.",
    explanation: "Dividends replace drawings for company owners.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A shareholder in Masvingo Dairies Limited complains that the directors transferred US\\$30,000 to the general reserve instead of paying it as dividends. Explain **one** reason for the transfer and **one** disadvantage to the shareholder, and give a conclusion.",
    points: ["Reason: keeps profits in the business for expansion / replacing assets / to strengthen the company", "Disadvantage: lower dividends now (less income for the shareholder)", "Conclusion, e.g. the shareholder may gain later through growth and higher future dividends"],
    modelAnswer: "The transfer keeps resources in the company to finance growth or replace machinery without borrowing. The shareholder receives less dividend this year. However, if the money is used well, profits and future dividends should rise, so the transfer may benefit the shareholder in the long run.",
    hints: ["Think short term and long term."],
    explanation: "Retention trades current dividends for future growth.",
  });

  // ---------------------------------------------------------------- Practice structured 1: statement of changes in equity
  {
    const open = [300000, 36000, 52700];
    const issueShares = 120000; // 480,000 shares of 25 cents
    const oldShares = 1200000, newShares = 480000;
    const finalDiv = r2(oldShares * 0.02), interim = r2((oldShares + newShares) * 0.015);
    const profit = 84960, tr = 20000;
    const s = soce("Gweru Steel Fabricators Limited", ["Ordinary share capital", "General reserve", "Retained earnings"], open, [["Issue of ordinary shares", [issueShares, null, null]], ["Profit for the year", [null, null, profit]], ["Dividends paid", [null, null, -r2(finalDiv + interim)]], ["Transfer to general reserve", [null, tr, -tr]]]);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Gweru Steel Fabricators Limited had the following equity at 1 January 2025: ordinary shares of US\\$0.25 each ${money(open[0])} (1,200,000 shares); general reserve ${money(open[1])}; retained earnings ${money(open[2])}.\n\nDuring the year ended 31 December 2025:\n\n1. On 1 May 2025, 480,000 ordinary shares of US\\$0.25 each were issued at par for cash.\n2. On 15 March 2025 the final dividend for 2024 of US\\$0.02 per share was paid.\n3. On 30 September 2025 an interim dividend of US\\$0.015 per share was paid.\n4. The profit for the year was ${money(profit)}.\n5. The directors transferred ${money(tr)} to the general reserve.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: issueShares, wrong: [480000], stem: "Calculate the amount received from the share issue.", explanation: `480,000 × US\\$0.25 = ${fmt(issueShares)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: r2(finalDiv + interim), wrong: [r2((oldShares + newShares) * 0.035)], stem: "Calculate the total dividends paid in 2025.", explanation: `Final: 1,200,000 × 0.02 = ${fmt(finalDiv)} (the new shares did not exist in March). Interim: 1,680,000 × 0.015 = ${fmt(interim)}. Total ${fmt(r2(finalDiv + interim))}. Paying both on 1,680,000 shares gives ${fmt(r2((oldShares + newShares) * 0.035))}.` }),
        P.manual({ label: "(c)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of changes in equity for the year ended 31 December 2025.", points: ["Heading and columns for share capital, general reserve, retained earnings and total", "Opening balances", `Share issue ${fmt(issueShares)} in the share capital column`, `Profit ${fmt(profit)} in retained earnings`, `Dividends (${fmt(r2(finalDiv + interim))}) in retained earnings (own figure)`, `Transfer: + ${fmt(tr)} general reserve, (${fmt(tr)}) retained earnings`, `Closing balances ${fmt(s.closing[0])}, ${fmt(s.closing[1])}, ${fmt(s.closing[2])}; total ${fmt(s.totalClose)}`], modelAnswer: s.md, explanation: "Each change goes in its own column; the transfer nets to nil in the total." }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: s.closing[2], wrong: [r2(s.closing[2] + tr)], stem: "State the retained earnings at 31 December 2025.", explanation: `${fmt(open[2])} + ${fmt(profit)} − ${fmt(r2(finalDiv + interim))} − ${fmt(tr)} = ${fmt(s.closing[2])}.` }),
      ],
      hints: ["Each dividend is paid on the shares in issue on its payment date."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2: income statement with finance costs and an extract (ZIM wording)
  {
    const deb = 42000, rate = 10, paid = 2500;
    const charge = r2(deb * rate / 100);
    const owing = r2(charge - paid);
    const dirFees = 24000;
    const is = companyIncome({ name: "Kwekwe Paints Limited", terms: "ZIM", revenue: 296500, cos: 171240, expenses: [["Directors' fees", dirFees], ["Wages", 38760], ["Rent and rates", 12400], ["Depreciation", 9850]], finance: [["Debenture interest", charge]] });
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true, applies: ["zimsec"],
      stem: `The following balances were extracted from the books of Kwekwe Paints Limited for the year ended 31 December 2025:\n\n${table(["", U], [["Revenue", 296500], ["Cost of sales", 171240], ["Directors' fees", dirFees], ["Wages", 38760], ["Rent and rates", 12400], ["Depreciation for the year", 9850], ["Debenture interest paid", paid], [`${rate}% debentures (repayable 2032)`, deb], ["Interim dividend paid", 14000]])}\n\nThe debentures were in issue for the whole year.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: owing, wrong: [paid, charge], stem: "Calculate the debenture interest owing at 31 December 2025.", explanation: `Charge ${fmt(deb)} × ${rate}% = ${fmt(charge)}; paid ${fmt(paid)}; owing ${fmt(owing)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: is.pfo, wrong: [r2(is.pfo + dirFees)], stem: "Calculate the profit from operations.", explanation: `Gross profit ${fmt(is.gp)} − expenses ${fmt(is.totExp)} = ${fmt(is.pfo)}. Directors' fees are an expense.` }),
        P.manual({ label: "(c)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the income statement for the year ended 31 December 2025.", points: [`Revenue, cost of sales and gross profit ${fmt(is.gp)}`, "Expenses including directors' fees and depreciation", `Profit from operations ${fmt(is.pfo)}`, `Debenture interest ${fmt(charge)} (full year)`, `Net profit ${fmt(is.profit)}; dividend NOT deducted`], modelAnswer: is.md, explanation: "Full-year interest is charged; the dividend goes to the statement of changes in equity." }),
        P.mcq({ label: "(d)", stem: "Where is the interim dividend of US\\$14,000 recorded?", options: [["Statement of changes in equity, reducing retained profits", "Correct: dividends are distributions of profit."], ["Income statement, as an expense", "Dividends are not expenses."], ["Current liabilities", "It has been paid, so nothing is owed."], ["Statement of financial position, as a non-current asset", "A dividend paid is not an asset."]], answer: "A", explanation: "Dividends paid are deducted from retained profits in the statement of changes in equity." }),
      ],
      hints: ["Charge the full year's debenture interest, not the amount paid."],
      explanation: `Model answer:\n\n${is.md}\n\nDebenture interest owing of ${fmt(owing)} is a current liability.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("DEFINITION", "Statement of changes in equity", "Shows the opening balance, the changes (share issues, profit, dividends paid, transfers) and the closing balance of each part of equity.");
  b.card("FACT", "Where do dividends paid go?", "Statement of changes in equity, deducted from retained earnings (retained profits). Never in the income statement.");
  b.card("FACT", "Where does debenture interest go?", "Income statement, as a finance cost after profit from operations; any unpaid amount is a current liability.");
  b.card("FORMULA", "Closing retained earnings", "Opening retained earnings + profit for the year − dividends paid − transfers to reserves.");
  b.card("CONCEPT", "Effect of a transfer to the general reserve", "Moves profit from retained earnings to the general reserve; total equity is unchanged.");
  b.card("FACT", "Directors' fees", "An expense in the income statement (directors are employees), unlike partners' salaries.");
  b.card("FACT", "Proposed final dividend at the year end", "Not deducted in this year's statements; it is deducted in the year it is paid.");
  b.card("DEFINITION", "Profit from operations", "Gross profit (plus other income) less operating expenses, before finance costs.");
});
