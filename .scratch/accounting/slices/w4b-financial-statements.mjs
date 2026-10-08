// W4b: financial statements from incomplete records (trading businesses; mark-up, margin, inventory turnover).
import { concept, P, money } from "../lib.mjs";
import { incomeStatement, financialPosition, statementOfAffairs, receivablesAccount, payablesAccount, table, TERMS, fmt, r2, sum, check } from "../tables/w4b-lib.mjs";

concept("acc.incomplete.financial-statements", { file: "incomplete/financial-statements", keyPrefix: "incomplete.financial-statements" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When preparing statements from incomplete records, the **opening capital** is usually found from …",
    options: [
      ["the opening statement of affairs", "Correct: opening assets less opening liabilities."],
      ["the summary of the bank account for the year", "The bank summary gives receipts, payments and the closing bank balance."],
      ["the total trade receivables account", "This gives credit sales."],
      ["the income statement for the year", "The income statement gives profit, not capital."],
    ],
    answer: "A",
    explanation: "With no capital account, opening capital = opening assets − opening liabilities.",
  });
  {
    const rev = 36000, mu = 20;
    const gp = r2((rev * mu) / (100 + mu));
    check("fs mcq1", gp, 6000);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `A trader's revenue was ${money(rev)}. All goods are sold at a mark-up of ${mu}% on cost. What was the gross profit?`,
      options: [
        [money(gp), "Correct: 36,000 × 20/120."],
        [money(r2((rev * mu) / 100)), "This treats the mark-up as a margin (20% of selling price)."],
        [money(r2(rev - gp)), "This is the cost of sales, not the gross profit."],
        [money(r2((rev * mu) / 80)), "This divides by 80, as if the figure were a 20% margin converted the wrong way."],
      ],
      answer: "A",
      explanation: `With a 20% mark-up, selling price = 120% of cost, so gross profit = ${fmt(rev)} × 20/120 = ${fmt(gp)}.`,
    });
  }
  {
    const rev = 54000, margin = 30;
    const cos = r2((rev * (100 - margin)) / 100);
    check("fs mcq2", cos, 37800);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `Revenue was ${money(rev)} and the gross profit margin is ${margin}%. What was the cost of sales?`,
      options: [
        [money(cos), "Correct: 54,000 × 70/100."],
        [money(r2((rev * margin) / 100)), "This is the gross profit."],
        [money(r2((rev * 100) / 130)), "This treats 30% as a mark-up on cost."],
        [money(r2(rev * 1.3)), "Cost of sales cannot be more than revenue when there is a gross profit."],
      ],
      answer: "A",
      explanation: `Margin is a percentage of revenue: gross profit ${fmt(r2(rev * 0.3))}, cost of sales ${fmt(cos)}.`,
    });
  }
  {
    const cos = 42000, turn = 6, oi = 6400;
    const avg = r2(cos / turn);
    const ci = r2(2 * avg - oi);
    check("fs mcq3", ci, 7600);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Cost of sales was ${money(cos)} and the rate of inventory turnover was ${turn} times. Opening inventory was ${money(oi)}. What was the closing inventory?`,
      options: [
        [money(ci), "Correct: average 7,000; closing = 2 × 7,000 − 6,400."],
        [money(avg), "This is the average inventory, not the closing inventory."],
        [money(r2(avg - oi / 2)), "Half the opening inventory has been deducted from the average instead of using 2 × average − opening."],
        [money(r2(2 * avg + oi)), "Opening inventory has been added instead of deducted."],
      ],
      answer: "A",
      hints: ["Average inventory = cost of sales ÷ turnover.", "Average = (opening + closing) ÷ 2."],
      explanation: `Average inventory = ${fmt(cos)} ÷ ${turn} = ${fmt(avg)}. Opening + closing = ${fmt(2 * avg)}, so closing = ${fmt(2 * avg)} − ${fmt(oi)} = ${fmt(ci)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The bank summary of a trader with incomplete records shows a payment of US\\$3,500 for a new display cabinet. How is it treated?",
    options: [
      ["Added to the cost of non-current assets", "Correct: it is capital expenditure."],
      ["Charged as an expense in the income statement", "Only depreciation on the cabinet is an expense."],
      ["Deducted from capital as drawings", "The cabinet is for the business, not the owner."],
      ["Added to purchases in cost of sales", "Purchases are goods for resale; the cabinet is not for resale."],
    ],
    answer: "A",
    explanation: "A payment for a non-current asset is capital expenditure; it is depreciated over its life.",
  });
  {
    const rev = 25000, mu = 25, oi = 3100, pu = 21600, counted = 3800;
    const cos = r2((rev * 100) / (100 + mu));
    const ci = r2(oi + pu - cos);
    const lost = r2(ci - counted);
    check("fs mcq4", lost, 900);
    b.mcq({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `A flood damaged part of Tatenda's inventory on 31 December 2025. Revenue for 2025 was ${money(rev)}; goods are sold at a mark-up of ${mu}%. Opening inventory was ${money(oi)} and purchases ${money(pu)}. Undamaged inventory was valued at ${money(counted)}. What was the cost of the inventory destroyed?`,
      options: [
        [money(lost), "Correct: cost of sales 20,000; closing inventory should be 4,700; 4,700 − 3,800."],
        [money(r2(oi + pu - rev * 0.75 - counted)), "This uses a 25% margin (cost of sales 18,750) instead of a 25% mark-up."],
        [money(ci), "This is the closing inventory that should be held, not the amount destroyed."],
        [money(counted), "This is the undamaged inventory left, not the inventory destroyed."],
      ],
      answer: "A",
      hints: ["Cost of sales = revenue × 100/125."],
      explanation: `Cost of sales = ${fmt(rev)} × 100/125 = ${fmt(cos)}. Expected closing inventory = ${fmt(oi)} + ${fmt(pu)} − ${fmt(cos)} = ${fmt(ci)}. Destroyed = ${fmt(ci)} − ${fmt(counted)} = ${fmt(lost)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A student's statement of financial position prepared from incomplete records does not balance: net assets are US\\$4,200 lower than closing capital. Which omission could explain this?",
    options: [
      ["Drawings of US\\$4,200 left out of the capital section", "Correct: capital is overstated by the drawings omitted."],
      ["A trade payable of US\\$4,200 left out of current liabilities", "This would make net assets too high, not too low."],
      ["Capital introduced of US\\$4,200 left out of the capital section", "This would make closing capital too low, not too high."],
      ["Cash sales of US\\$4,200 left out of revenue", "Leaving out revenue would make capital lower, not higher."],
    ],
    answer: "A",
    hints: ["Which side of the statement is too large?"],
    explanation: "Closing capital = opening capital + profit − drawings. Forgetting drawings makes capital too high by exactly the drawings.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Expenses owing at the year end that were found when reconstructing an expense account appear in the statement of financial position as …",
    options: [
      ["a current liability", "Correct: they are amounts the business still owes (other payables)."],
      ["a current asset", "Prepaid expenses are current assets; amounts owing are liabilities."],
      ["a deduction from capital", "Capital is changed only through profit, drawings and capital introduced."],
      ["a non-current liability", "Expenses owing are payable within a year."],
    ],
    answer: "A",
    explanation: "Accrued expenses are current liabilities; prepaid expenses are current assets.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A mark-up of 25% on cost is the same as a gross profit margin of 20% on selling price.",
    answer: true,
    explanation: "True. Cost 100, gross profit 25, selling price 125: 25/125 = 20%.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "Cambridge 0452 examines the preparation of financial statements from incomplete records for service and manufacturing businesses as well as trading businesses.",
    answer: false,
    applies: ["cambridge/igcse/accounting"],
    explanation: "False. The Cambridge syllabus restricts incomplete records to trading businesses.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "UNDERSTANDING",
    stem: "Match each figure needed for the statements with the working that provides it.",
    right: ["Opening statement of affairs", "Bank summary", "Total trade receivables account", "Total trade payables account", "Mark-up applied to cost of sales"],
    pairs: ["Opening capital", "Closing bank balance", "Credit sales", "Credit purchases", "Revenue when sales records are lost"],
    rightIndex: [0, 1, 2, 3, 4],
    hints: ["Think about which account each figure would have been posted to."],
    explanation: "Each working supplies one missing figure; together they give everything needed for both statements.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Complete the statements for a trader whose mark-up is 50%.",
    template: "If cost of sales is US\\$30,000, gross profit is US\\$ {{blank:a}} and revenue is US\\$ {{blank:b}}. The gross profit margin is {{blank:c}} %.",
    blanks: [
      { id: "a", accepted: ["15000", "15,000"] },
      { id: "b", accepted: ["45000", "45,000"] },
      { id: "c", accepted: ["33.3", "33.33", "33 1/3"] },
    ],
    hints: ["Mark-up is on cost; margin is on selling price."],
    explanation: "Gross profit = 50% × 30,000 = 15,000; revenue = 45,000; margin = 15,000 ÷ 45,000 = 33.3%.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const oi = 4850, cp = 39200, cashP = 1600, ci = 5350, mu = 40;
    const cos = r2(oi + cp + cashP - ci);
    const rev = r2((cos * (100 + mu)) / 100);
    check("fs num1", rev, 56420);
    b.calc({
      d: 3, kind: "money", value: rev, calculator: true, wrong: [r2(cos / 0.6), r2(cos * 1.4 - cashP * 1.4)],
      stem: `Sipho sells all goods at a mark-up of ${mu}%. Opening inventory was ${money(oi)}, credit purchases ${money(cp)}, cash purchases ${money(cashP)} and closing inventory ${money(ci)}. Calculate his revenue for the year.`,
      hints: ["Find cost of sales first, then add the mark-up."],
      explanation: `Cost of sales = ${fmt(oi)} + ${fmt(cp)} + ${fmt(cashP)} − ${fmt(ci)} = ${fmt(cos)}. Revenue = ${fmt(cos)} × 140/100 = ${fmt(rev)}. Treating 40% as a margin gives ${fmt(r2(cos / 0.6))}.`,
    });
  }
  {
    const rev = 72500, margin = 28, oi = 8900, ci = 7650;
    const cos = r2((rev * (100 - margin)) / 100);
    const pu = r2(cos + ci - oi);
    check("fs num2", pu, 50950);
    b.calc({
      d: 4, kind: "money", value: pu, calculator: true, wrong: [cos, r2(cos - ci + oi)],
      stem: `Thandeka's revenue for 2025 was ${money(rev)} and her gross profit margin was ${margin}%. Inventory was ${money(oi)} at 1 January 2025 and ${money(ci)} at 31 December 2025. Calculate her purchases for 2025.`,
      hints: ["Cost of sales = opening inventory + purchases − closing inventory. Rearrange for purchases."],
      explanation: `Cost of sales = ${fmt(rev)} × 72% = ${fmt(cos)}. Purchases = ${fmt(cos)} + ${fmt(ci)} − ${fmt(oi)} = ${fmt(pu)}. Getting the inventories the wrong way round gives ${fmt(r2(cos - ci + oi))}.`,
    });
  }
  {
    const cost = 12500, addition = 3000, rate = 20;
    const dep = r2(((cost + addition) * rate) / 100);
    b.num({
      d: 2, kind: "money", value: dep, wrong: [r2((cost * rate) / 100)],
      stem: `At 1 January 2025 a trader's fixtures cost ${money(cost)}. During the year the bank summary shows a payment of ${money(addition)} for more fixtures. Depreciation is 20% of the cost of fixtures held at 31 December. Calculate the depreciation for 2025.`,
      explanation: `(${fmt(cost)} + ${fmt(addition)}) × 20% = ${fmt(dep)}. Forgetting the new fixtures gives ${fmt(r2((cost * rate) / 100))}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a trader's bank manager may want a full income statement rather than just a profit figure found from the change in capital.",
    points: ["The income statement shows revenue, gross profit and each expense", "So the manager can judge how the profit was made / whether it is sustainable / the ability to repay a loan"],
    modelAnswer: "A profit figure alone does not show where it came from. The income statement shows sales, gross profit and expenses, so the manager can judge whether the business earns enough, steadily, to repay a loan.",
    explanation: "Lenders need detail to assess risk.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Farai always sells at a mark-up of 30%. His actual gross profit this year is lower than 30% of cost of sales would give. Suggest **three** possible reasons.",
    points: ["Theft or loss of inventory / cash takings", "Goods taken for own use not recorded as drawings", "Goods sold at reduced prices (discounts, damaged or old stock) / cost prices rose without selling prices changing / errors in inventory count"],
    modelAnswer: "Goods or cash may have been stolen; Farai may have taken goods for his family without recording them; or some goods were sold at reduced prices because they were damaged or slow-moving.",
    hints: ["Anything that reduces revenue or increases cost of sales without being recorded."],
    explanation: "A shortfall against a fixed mark-up points to losses, unrecorded drawings or price changes.",
  });

  // ---------------------------------------------------------------- Practice structured (full statements)
  {
    const soa = statementOfAffairs({ name: "Tatenda Ncube", date: "1 January 2025", nca: [["Fixtures and fittings", 6400]], ca: [["Inventory", 4920], ["Trade receivables", 1870], ["Bank", 2460]], cl: [["Trade payables", 2730], ["Electricity owing", 110]] });
    const bankClose = r2(2460 + 44850 + 9450 - 37940 - 5400 - 2880 - 1340 - 5350);
    check("fs s1 bank", bankClose, 3850);
    const ra = receivablesAccount({ opening: 1870, receipts: 44850, closing: 2310 });
    const pa = payablesAccount({ opening: 2730, payments: 37940, closing: 3060 });
    const elec = r2(1340 - 110 + 150);
    const dep = r2(6400 * 0.15);
    const is = incomeStatement({ name: "Tatenda Ncube", terms: TERMS.BOTH, revenue: r2(ra.creditSales + 9450), openInv: 4920, cos: [["Purchases", pa.creditPurchases]], closeInv: 5580, otherIncome: [], expenses: [["Wages", 5400], ["Rent", 2880], ["Electricity (1,340 − 110 + 150)", elec], ["Depreciation: fixtures and fittings", dep]] });
    const fp = financialPosition({ name: "Tatenda Ncube", terms: TERMS.BOTH, nca: [["Fixtures and fittings", 6400, dep]], ca: [["Inventory", 5580], ["Trade receivables", 2310], ["Bank", bankClose]], cl: [["Trade payables", 3060], ["Other payables (electricity owing)", 150]], openCap: soa.capital, profit: is.np, drawings: 5350 });
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Tatenda Ncube owns a small hardware shop in Kwekwe. He does not keep full records.\n\nAt 1 January 2025: fixtures and fittings ${money(6400)} (bought on 1 January 2025), inventory ${money(4920)}, trade receivables ${money(1870)}, bank ${money(2460)}, trade payables ${money(2730)}, electricity owing ${money(110)}.\n\nSummary of the bank account for 2025:\n\n${table(["Receipts", "US\\$", "Payments", "US\\$"], [["From credit customers", 44850, "To credit suppliers", 37940], ["Cash sales (all banked)", 9450, "Wages", 5400], ["", "", "Rent", 2880], ["", "", "Electricity", 1340], ["", "", "Drawings", 5350]])}\n\nAt 31 December 2025: inventory ${money(5580)}, trade receivables ${money(2310)}, trade payables ${money(3060)}, electricity owing ${money(150)}. Fixtures and fittings are depreciated at 15% per annum on cost.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: soa.capital, wrong: [r2(soa.capital + 110)], stem: "Calculate Tatenda's capital at 1 January 2025.", explanation: `Assets ${fmt(soa.assets)} − liabilities ${fmt(soa.liabs)} = ${fmt(soa.capital)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: bankClose, stem: "Calculate the bank balance at 31 December 2025.", explanation: `2,460 + 44,850 + 9,450 − 37,940 − 5,400 − 2,880 − 1,340 − 5,350 = ${fmt(bankClose)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: is.netRev, wrong: [ra.creditSales, r2(44850 + 9450)], stem: "Calculate the revenue for 2025.", explanation: `Credit sales 44,850 + 2,310 − 1,870 = ${fmt(ra.creditSales)}; plus cash sales 9,450 = ${fmt(is.netRev)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: pa.creditPurchases, wrong: [r2(37940 + 2730 - 3060)], stem: "Calculate the purchases for 2025.", explanation: `37,940 + 3,060 − 2,730 = ${fmt(pa.creditPurchases)}.` }),
        P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare Tatenda's income statement (statement of profit or loss) for the year ended 31 December 2025.", points: ["Correct heading", `Cost of sales 4,920 + ${fmt(pa.creditPurchases)} − 5,580 = ${fmt(is.cos)}`, `Gross profit ${fmt(is.gp)} (own figures)`, `Electricity ${fmt(elec)} and depreciation ${fmt(dep)}`, `Wages and rent; profit for the year ${fmt(is.np)}`], modelAnswer: is.md, explanation: "Use your workings from (c) and (d)." }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: fp.closing, wrong: [r2(fp.closing + 5350)], stem: "Calculate Tatenda's capital at 31 December 2025.", explanation: `${fmt(soa.capital)} + ${fmt(is.np)} − 5,350 = ${fmt(fp.closing)}; this equals net assets ${fmt(fp.netAssets)}.` }),
      ],
      hints: ["Start with the opening statement of affairs.", "Electricity: paid − opening owing + closing owing."],
      explanation: `Model answers:\n\n${soa.md}\n\n${is.md}\n\n${fp.md}`,
    });
  }
  {
    // Practice structured 2: mark-up to find revenue, then theft of cash
    const oi = 3640, pu = 28460, ci = 4100, mu = 35, banked = 33290, expTill = 1450;
    const cos = r2(oi + pu - ci);
    const rev = r2((cos * (100 + mu)) / 100);
    const missing = r2(rev - banked - expTill);
    check("fs s2", missing, 3060);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Chipo runs a cash-only stationery kiosk in Masvingo and sells everything at a mark-up of ${mu}%. For 2025: inventory at 1 January ${money(oi)}; purchases ${money(pu)}; inventory at 31 December ${money(ci)}. She banked ${money(banked)} of takings and paid ${money(expTill)} of expenses in cash from the takings. She took no drawings. She suspects that an assistant has been taking cash.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: cos, wrong: [r2(oi + pu + ci)], stem: "Calculate the cost of sales.", explanation: `${fmt(oi)} + ${fmt(pu)} − ${fmt(ci)} = ${fmt(cos)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: rev, wrong: [r2(cos / 0.65)], stem: "Calculate the revenue Chipo should have received.", explanation: `${fmt(cos)} × 135/100 = ${fmt(rev)}. Treating 35% as a margin gives ${fmt(r2(cos / 0.65))}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: missing, wrong: [r2(rev - banked)], stem: "Calculate the cash that appears to be missing.", explanation: `${fmt(rev)} − banked ${fmt(banked)} − expenses paid ${fmt(expTill)} = ${fmt(missing)}.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Suggest **three** controls Chipo could introduce to reduce the risk of cash going missing.", points: ["Bank all takings daily / intact", "Use a till or numbered receipts for every sale and check them against cash", "Pay expenses by bank transfer or petty cash imprest, not from takings; surprise cash counts / separate duties"], modelAnswer: "Bank the takings every day without paying anything out of them; issue a numbered receipt for every sale and reconcile receipts with cash each evening; pay expenses from a separate petty cash float.", explanation: "Controls should make every sale recorded and every dollar traceable." }),
      ],
      hints: ["Revenue = cost of sales × (100 + mark-up)/100."],
      explanation: `Cost of sales ${fmt(cos)}; expected revenue ${fmt(rev)}; accounted for ${fmt(r2(banked + expTill))}; missing ${fmt(missing)}.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("FACT", "Order of work for incomplete-records statements", "Opening statement of affairs → bank summary → receivables and payables accounts → expense accounts → depreciation → income statement → statement of financial position.");
  b.card("FORMULA", "Gross profit from revenue and mark-up m%", "Gross profit = revenue × m ÷ (100 + m).");
  b.card("FORMULA", "Cost of sales from revenue and margin g%", "Cost of sales = revenue × (100 − g) ÷ 100.");
  b.card("FORMULA", "Closing inventory from the rate of inventory turnover", "Average inventory = cost of sales ÷ turnover; closing inventory = 2 × average − opening inventory.");
  b.card("FORMULA", "Inventory lost (fire or theft)", "Opening inventory + purchases − cost of sales (from mark-up) − inventory actually left.");
  b.card("CONCEPT", "Payment for a non-current asset in the bank summary", "Capital expenditure: add it to the asset's cost and depreciate it; never charge it as an expense.");
  b.card("FACT", "Check that the reconstruction is right", "Net assets in the statement of financial position must equal opening capital + profit − drawings (+ capital introduced).");
  b.card("FACT", "Cambridge restriction on incomplete records", "Cambridge 0452 examines incomplete records for trading businesses only, not service or manufacturing businesses.", null, { applies: ["cambridge/igcse/accounting"] });
});
