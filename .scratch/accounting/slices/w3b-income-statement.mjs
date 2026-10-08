// W3b: the income statement (statement of profit or loss) of a sole trader.
import { concept, P, money, check, r2, sum, ZIM, CAM } from "../lib.mjs";
import { incomeStatement, TERMS, table, U, fmt } from "../tables/w3b-lib.mjs";

concept("acc.statements.income-statement", { file: "statements/income-statement", keyPrefix: "statements.income-statement" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which item is shown in the **trading section** of the income statement (statement of profit or loss)?",
    options: [
      ["Carriage inwards", "Correct: the cost of bringing purchases in is part of cost of sales."],
      ["Carriage outwards", "Delivering goods to customers is a selling expense below gross profit."],
      ["Discount allowed", "Discount allowed is an expense in the profit and loss section."],
      ["Rent received", "Rent received is other income, added after gross profit."],
    ],
    answer: "A",
    explanation: "The trading section holds revenue, sales returns and the cost of sales items: inventories, purchases, purchases returns and carriage inwards.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "The inventory figure shown in a trial balance prepared at the year end is the …",
    options: [
      ["inventory at the start of the year", "Correct: the closing count is made after the ledger is balanced and is given as a note."],
      ["inventory at the end of the year", "Closing inventory is not yet in the ledger when the trial balance is drawn up."],
      ["average inventory held during the year", "Average inventory is used in ratio analysis, not in the trial balance."],
      ["goods bought during the year", "Goods bought during the year are purchases."],
    ],
    answer: "A",
    explanation: "Inventory in the trial balance is opening inventory; closing inventory is a note below it.",
  });
  {
    const rev = 64200, sr = 900, oi = 5300, pu = 41800, ci = 6100;
    const cos = r2(oi + pu - ci);
    const gp = r2(rev - sr - cos);
    check("is mcq1", gp, 22300);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Nyasha's revenue was ${money(rev)} and sales returns were ${money(sr)}. Opening inventory was ${money(oi)}, purchases ${money(pu)} and closing inventory ${money(ci)}. What was her gross profit?`,
      options: [
        [money(gp), `Correct: (${fmt(rev)} − ${fmt(sr)}) − (${fmt(oi)} + ${fmt(pu)} − ${fmt(ci)}).`],
        [money(r2(rev - cos)), "This forgets to deduct the sales returns from revenue."],
        [money(r2(rev - sr - (oi + pu + ci))), "This adds closing inventory instead of deducting it."],
        [money(r2(rev - sr - pu)), "This uses purchases as cost of sales and ignores both inventories."],
      ],
      answer: "A",
      explanation: `Cost of sales = ${fmt(oi)} + ${fmt(pu)} − ${fmt(ci)} = ${fmt(cos)}. Gross profit = ${fmt(rev - sr)} − ${fmt(cos)} = ${fmt(gp)}.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "How is **discount received** treated in the income statement?",
    options: [
      ["Added to gross profit as other income", "Correct: it is a gain from paying suppliers promptly."],
      ["Deducted from purchases in cost of sales", "Cash discount is a finance gain, not a reduction in the cost of goods; trade discount is never recorded."],
      ["Deducted from gross profit as an expense", "That is the treatment of discount allowed."],
      ["Deducted from revenue with the sales returns", "Only sales returns are deducted from revenue."],
    ],
    answer: "A",
    explanation: "Discount received is other income; discount allowed is an expense.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which item does **not** appear in the income statement of a sole trader?",
    options: [
      ["Drawings of cash by the owner", "Correct: drawings reduce capital in the statement of financial position."],
      ["Depreciation of the delivery van", "Depreciation is an expense of the year."],
      ["Purchases returns", "They are deducted from purchases in cost of sales."],
      ["Commission received", "Commission received is other income."],
    ],
    answer: "A",
    explanation: "Drawings are a withdrawal of capital by the owner, not an expense of earning income.",
  });
  {
    const oi = 4600, pu = 38900, ci = 5250, cin = 720, pr = 640;
    const cos = r2(oi + pu + cin - pr - ci);
    check("is mcq cos", cos, 38330);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Opening inventory ${money(oi)}; purchases ${money(pu)}; carriage inwards ${money(cin)}; purchases returns ${money(pr)}; closing inventory ${money(ci)}. What is the cost of sales?`,
      options: [
        [money(cos), "Correct: 4,600 + 38,900 + 720 − 640 − 5,250."],
        [money(r2(oi + pu - cin - pr - ci)), "Carriage inwards has been deducted instead of added."],
        [money(r2(oi + pu + cin + pr - ci)), "Purchases returns have been added instead of deducted."],
        [money(r2(oi + pu + cin - pr)), "Closing inventory has not been deducted: this is the cost of goods available for sale."],
      ],
      answer: "A",
      hints: ["Returns reduce purchases; carriage inwards increases them."],
      explanation: `Cost of sales = ${fmt(oi)} + ${fmt(pu)} + ${fmt(cin)} − ${fmt(pr)} − ${fmt(ci)} = ${fmt(cos)}.`,
    });
  }
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Closing inventory was **overstated** by US\\$500. What is the effect on the income statement?",
    options: [
      ["Cost of sales is understated, so gross profit is overstated by US\\$500", "Correct: a larger deduction makes cost of sales too small."],
      ["Cost of sales is overstated, so gross profit is understated by US\\$500", "This is the effect of understating closing inventory."],
      ["Revenue is overstated by US\\$500, so gross profit rises", "Inventory does not affect revenue."],
      ["Gross profit is correct, but expenses are overstated by US\\$500", "Inventory is in the trading section, not among the expenses."],
    ],
    answer: "A",
    hints: ["Closing inventory is deducted in cost of sales."],
    explanation: "Closing inventory is subtracted to find cost of sales; subtracting too much makes cost of sales too low and gross profit (and profit for the year) too high.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which business would prepare an income statement **without** a trading section?",
    options: [
      ["A taxi operator in Bulawayo", "Correct: it sells a service, so it has no cost of goods sold."],
      ["A tuck shop at a school in Gweru", "A tuck shop buys and resells goods."],
      ["A wholesaler of maize meal in Harare", "A wholesaler buys and resells goods."],
      ["A hardware shop in Chinhoyi", "A hardware shop buys and resells goods."],
    ],
    answer: "A",
    explanation: "Service businesses earn fees; they have no purchases of goods for resale and so no gross profit.",
  });
  {
    const gp = 27400, other = 1350, exp = 18900;
    const np = r2(gp + other - exp);
    check("np mcq", np, 9850);
    b.mcq({
      d: 2, skill: "APPLICATION",
      stem: `Gross profit was ${money(gp)}, discount received ${money(other)} and total expenses ${money(exp)}. What was the profit for the year (net profit)?`,
      options: [
        [money(np), "Correct: 27,400 + 1,350 − 18,900."],
        [money(r2(gp - other - exp)), "Discount received has been treated as an expense."],
        [money(r2(gp - exp)), "Discount received has been left out."],
        [money(r2(gp + other + exp)), "Expenses have been added instead of deducted."],
      ],
      answer: "A",
      explanation: `Profit for the year = gross profit + other income − expenses = ${fmt(gp)} + ${fmt(other)} − ${fmt(exp)} = ${fmt(np)}.`,
    });
  }

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "RECALL", daily: true,
    stem: "Carriage outwards is added to purchases in the cost of sales calculation.",
    answer: false,
    explanation: "False. Carriage outwards is the cost of delivering goods to customers: a selling expense. Only carriage inwards is added to purchases.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The heading of an income statement should read \"for the year ended 31 December 2025\", not \"at 31 December 2025\".",
    answer: true,
    explanation: "True. The income statement covers a period; \"at\" is used for the statement of financial position, which shows one date.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item with its treatment in the income statement.",
    right: ["Deducted from revenue", "Added to purchases", "Deducted from purchases", "Added to gross profit", "Deducted from gross profit"],
    pairs: ["Sales returns", "Carriage inwards", "Purchases returns", "Discount received", "Carriage outwards"],
    rightIndex: [0, 1, 2, 3, 4],
    explanation: "Returns inwards reduce revenue; carriage inwards and returns outwards adjust purchases; discount received is other income; carriage outwards is an expense.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the formulas.",
    template: "Cost of sales = opening inventory + purchases + carriage inwards − purchases returns − {{blank:a}}. Gross profit = revenue − sales returns − {{blank:b}}. Profit for the year = gross profit + {{blank:c}} − expenses.",
    blanks: [
      { id: "a", accepted: ["closing inventory"], choices: ["closing inventory", "opening inventory", "carriage outwards"] },
      { id: "b", accepted: ["cost of sales"], choices: ["cost of sales", "expenses", "purchases"] },
      { id: "c", accepted: ["other income"], choices: ["other income", "drawings", "capital"] },
    ],
    explanation: "These three lines are the skeleton of every trading business's income statement.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const rev = 52700, sr = 1150, cos = 33480;
    const gp = r2(rev - sr - cos);
    b.num({
      d: 2, kind: "money", value: gp, daily: true, wrong: [r2(rev - cos)],
      stem: `Revenue ${money(rev)}; sales returns ${money(sr)}; cost of sales ${money(cos)}. Calculate the gross profit.`,
      explanation: `${fmt(rev)} − ${fmt(sr)} − ${fmt(cos)} = ${fmt(gp)}. Forgetting the sales returns gives ${fmt(r2(rev - cos))}.`,
    });
  }
  {
    const gp = 15600, rentRec = 2400, comm = 380, exps = [6200, 3600, 1450, 980, 720, 2650];
    const np = r2(gp + rentRec + comm - sum(exps));
    check("calc np", np, 2780);
    b.calc({
      d: 3, kind: "money", value: np, calculator: true, wrong: [r2(gp - rentRec - comm - sum(exps)), r2(gp - sum(exps))],
      stem: `Farai's transport business had gross profit of ${money(gp)}. Other income: rent received ${money(rentRec)}, commission received ${money(comm)}. Expenses: wages ${money(6200)}, insurance ${money(3600)}, fuel ${money(1450)}, licences ${money(980)}, telephone ${money(720)}, repairs ${money(2650)}. Calculate the profit for the year (net profit).`,
      hints: ["Add the other income to gross profit before deducting the total expenses."],
      explanation: `Total other income ${fmt(rentRec + comm)}; total expenses ${fmt(sum(exps))}. Profit = ${fmt(gp)} + ${fmt(rentRec + comm)} − ${fmt(sum(exps))} = ${fmt(np)}. Treating the income as expenses gives ${fmt(r2(gp - rentRec - comm - sum(exps)))} (a loss).`,
    });
  }
  {
    // missing closing inventory
    const oi = 6800, pu = 47300, cos = 45950;
    const ci = r2(oi + pu - cos);
    check("ci", ci, 8150);
    b.calc({
      d: 4, kind: "money", value: ci, calculator: true, wrong: [r2(cos - pu + oi)],
      stem: `Rudo's cost of sales for 2025 was ${money(cos)}. Her opening inventory was ${money(oi)} and purchases were ${money(pu)}. Calculate her closing inventory.`,
      hints: ["Cost of sales = opening inventory + purchases − closing inventory. Rearrange."],
      explanation: `Closing inventory = ${fmt(oi)} + ${fmt(pu)} − ${fmt(cos)} = ${fmt(ci)}. Getting the signs of the inventories the wrong way round gives ${fmt(r2(cos - pu + oi))}.`,
    });
  }
  {
    const fees = 28700, exp = 31250;
    const loss = r2(exp - fees);
    b.num({
      d: 2, kind: "money", value: loss, wrong: [r2(fees + exp)],
      stem: `A driving school earned fees of ${money(fees)} and had expenses of ${money(exp)}. Calculate the loss for the year (enter the amount without a minus sign).`,
      explanation: `${fmt(exp)} − ${fmt(fees)} = ${fmt(loss)} loss: expenses were greater than income.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why closing inventory is deducted when calculating cost of sales.",
    points: ["Closing inventory is goods bought (or held) but not yet sold", "Cost of sales must include only the cost of goods actually sold in the year (matching)"],
    modelAnswer: "The goods still in the shop at the year end have not been sold, so their cost belongs to next year. Deducting them leaves only the cost of the goods sold, which is matched with this year's revenue.",
    explanation: "Matching: the cost of unsold goods is carried forward to the next period.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Thandeka's gross profit rose this year but her profit for the year fell. Suggest **three** possible reasons.",
    points: ["Expenses rose (e.g. higher wages, rent or electricity)", "Other income fell (e.g. less rent or commission received)", "A new or larger non-cash expense, e.g. more depreciation / irrecoverable debts"],
    modelAnswer: "Her running expenses such as wages or rent may have risen faster than gross profit; she may have earned less other income such as rent received; and she may have had larger charges such as depreciation on new equipment or irrecoverable debts.",
    hints: ["Profit for the year = gross profit + other income − expenses."],
    explanation: "Anything below gross profit can explain the difference.",
  });

  // ---------------------------------------------------------------- Practice structured 1 (trading)
  {
    const d = {
      name: "Sipho Ndlovu", terms: TERMS.BOTH, revenue: 74900, salesReturns: 1260, openInv: 8340,
      cos: [["Purchases", 46150], ["Add: Carriage inwards", 590], ["Less: Purchases returns", -870]], closeInv: 9480,
      otherIncome: [["Discount received", 615]],
      expenses: [["Wages", 11400], ["Rent", 3900], ["Electricity", 1260], ["Carriage outwards", 830], ["Discount allowed", 455], ["Insurance", 1180]],
    };
    const s = incomeStatement(d);
    const stim = table(["Balance at 31 December 2025", U], [["Revenue", 74900], ["Sales returns", 1260], ["Inventory at 1 January 2025", 8340], ["Purchases", 46150], ["Carriage inwards", 590], ["Purchases returns", 870], ["Discount received", 615], ["Wages", 11400], ["Rent", 3900], ["Electricity", 1260], ["Carriage outwards", 830], ["Discount allowed", 455], ["Insurance", 1180]]);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Sipho Ndlovu sells school uniforms in Bulawayo. The following balances were taken from his books:\n\n${stim}\n\nInventory at 31 December 2025 was valued at ${money(9480)}.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "money", value: s.netRev, wrong: [74900], stem: "Calculate the net revenue (revenue less sales returns).", explanation: `74,900 − 1,260 = ${fmt(s.netRev)}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: s.cos, wrong: [r2(s.cos - 2 * 590), r2(s.cos + 9480 - 8340)], stem: "Calculate the cost of sales.", explanation: `8,340 + 46,150 + 590 − 870 = ${fmt(s.available)}; less closing inventory 9,480 = ${fmt(s.cos)}.` }),
        P.num({ label: "(c)", marks: 1, kind: "money", value: s.gp, stem: "Calculate the gross profit.", explanation: `${fmt(s.netRev)} − ${fmt(s.cos)} = ${fmt(s.gp)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: s.np, wrong: [r2(s.np - 2 * 615)], stem: "Calculate the profit for the year (net profit).", explanation: `${fmt(s.gp)} + 615 − ${fmt(s.totExp)} = ${fmt(s.np)}.` }),
        P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare Sipho's income statement (statement of profit or loss) for the year ended 31 December 2025.", points: ["Correct three-line heading", `Revenue less sales returns ${fmt(s.netRev)}`, `Cost of sales section with purchases, carriage inwards, returns and both inventories: ${fmt(s.cos)}`, `Gross profit ${fmt(s.gp)} and discount received added`, `Six expenses listed, total ${fmt(s.totExp)}; profit for the year ${fmt(s.np)}`], modelAnswer: s.md, explanation: "Two money columns; deductions in brackets." }),
      ],
      hints: ["Carriage inwards belongs to cost of sales; carriage outwards is an expense."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (service + loss interpretation)
  {
    const d = {
      name: "Tatenda Moyo Transport", terms: TERMS.ZIM, service: true, revenueLabel: "Fares received", revenue: 46800,
      otherIncome: [["Rent received (parking bay)", 1200]],
      expenses: [["Drivers' wages", 18600], ["Fuel", 14250], ["Repairs to minibuses", 4380], ["Insurance and licences", 3960], ["Depreciation: minibuses", 7500]],
    };
    const s = incomeStatement(d);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true, applies: ZIM,
      stem: `Tatenda Moyo runs two commuter minibuses between Masvingo and Mashava. For the year ended 31 December 2025: fares received ${money(46800)}; rent received for a parking bay ${money(1200)}; drivers' wages ${money(18600)}; fuel ${money(14250)}; repairs to minibuses ${money(4380)}; insurance and licences ${money(3960)}; depreciation of minibuses ${money(7500)}.`,
      parts: [
        P.mcq({ label: "(a)", stem: "Why does Tatenda's income statement have no gross profit?", options: [["He sells a service, so there is no cost of goods sold", "Correct."], ["His expenses are greater than his income for the year", "A loss does not remove the trading section."], ["Depreciation is shown instead of purchases", "Depreciation is an expense of any business."], ["Minibus operators do not need to keep any records", "All businesses need records."]], answer: "A", explanation: "A transport operator sells a service: there are no goods bought for resale." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: s.totExp, stem: "Calculate Tatenda's total expenses.", explanation: `18,600 + 14,250 + 4,380 + 3,960 + 7,500 = ${fmt(s.totExp)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: -s.np, wrong: [r2(-s.np + 2 * 1200)], stem: "Calculate the net loss for the year (enter the amount without a minus sign).", explanation: `Income 46,800 + 1,200 = ${fmt(48000)}; expenses ${fmt(s.totExp)}; net loss ${fmt(-s.np)}.` }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare Tatenda's income statement for the year ended 31 December 2025.", points: ["Correct heading", `Fares received and rent received (total ${fmt(r2(46800 + 1200))})`, `Five expenses listed and totalled ${fmt(s.totExp)}`, `Net loss (${fmt(-s.np)}) correctly labelled`], modelAnswer: s.md, explanation: "A service business starts with its fees." }),
        P.manual({ label: "(e)", marks: 2, stem: "Tatenda says the business is \"losing money every day\" and should close. Give **one** reason why he may be wrong.", points: ["Depreciation of 7,500 is a non-cash expense: income exceeded the cash expenses", "So the business still generates cash / a small increase in fares or cut in fuel cost would give a profit"], modelAnswer: `The loss of ${fmt(-s.np)} is after depreciation of 7,500, which is not a cash payment; before depreciation the business made a surplus of ${fmt(r2(s.np + 7500))}, and a small fare increase would turn the loss into a profit.`, explanation: "Separate cash flows from profit." }),
      ],
      hints: ["There is no cost of sales in a service business.", "A loss is shown in brackets and labelled net loss."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 3 (find missing items, CAM wording)
  {
    const d = {
      name: "Rudo's Fabrics", terms: TERMS.CAM, revenue: 58300, salesReturns: 0, openInv: 4920,
      cos: [["Purchases", 37600], ["Add: Carriage inwards", 410]], closeInv: 5730,
      otherIncome: [["Discount received", 290]],
      expenses: [["Wages", 7800], ["Rent", 3600], ["Advertising", 940], ["Carriage outwards", 515], ["General expenses", 865]],
    };
    const s = incomeStatement(d);
    const gpm = r2((s.gp / d.revenue) * 100);
    b.struct({
      d: 4, examStyle: true, skill: "APPLICATION", calculator: true, applies: CAM,
      stem: `Rudo sells fabrics in Mutare. For the year ended 31 December 2025: revenue ${money(58300)}; inventory 1 January 2025 ${money(4920)}; purchases ${money(37600)}; carriage inwards ${money(410)}; inventory 31 December 2025 ${money(5730)}; discount received ${money(290)}; wages ${money(7800)}; rent ${money(3600)}; advertising ${money(940)}; carriage outwards ${money(515)}; general expenses ${money(865)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: s.cos, wrong: [r2(s.cos + 515)], stem: "Calculate the cost of sales.", explanation: `4,920 + 37,600 + 410 − 5,730 = ${fmt(s.cos)}.` }),
        P.num({ label: "(b)", marks: 1, kind: "money", value: s.gp, stem: "Calculate the gross profit.", explanation: `58,300 − ${fmt(s.cos)} = ${fmt(s.gp)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: (s.gp / d.revenue) * 100, wrong: [r2((s.gp / s.cos) * 100)], stem: "Calculate the gross profit margin to one decimal place.", explanation: `${fmt(s.gp)} ÷ 58,300 × 100 = ${gpm.toFixed(1)}%. Dividing by cost of sales gives the mark-up instead.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: s.np, stem: "Calculate the profit for the year.", explanation: `${fmt(s.gp)} + 290 − ${fmt(s.totExp)} = ${fmt(s.np)}.` }),
        P.manual({ label: "(e)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of profit or loss for the year ended 31 December 2025, from gross profit to profit for the year.", points: ["Gross profit and discount received added", `Five expenses listed, total ${fmt(s.totExp)}`, `Profit for the year ${fmt(s.np)} correctly labelled`], modelAnswer: s.md, explanation: "The full statement is shown; only the part below gross profit was required." }),
      ],
      hints: ["Gross profit margin = gross profit ÷ revenue × 100."],
      explanation: `Model answer:\n\n${s.md}`,
    });
  }

  // ---------------------------------------------------------------- Cards
  b.card("DEFINITION", "What is the **income statement** (statement of profit or loss)?", "A statement of revenue, cost of sales, gross profit, other income, expenses and profit (or loss) for a period.");
  b.card("FORMULA", "Cost of sales", "Opening inventory + purchases + carriage inwards − purchases returns − closing inventory.");
  b.card("FORMULA", "Gross profit", "(Revenue − sales returns) − cost of sales.");
  b.card("FORMULA", "Profit for the year (net profit)", "Gross profit + other income − expenses.");
  b.card("FACT", "Where does carriage inwards go? Carriage outwards?", "Carriage inwards: added to purchases (cost of sales). Carriage outwards: an expense.");
  b.card("FACT", "Discount received vs discount allowed", "Discount received: other income (added). Discount allowed: an expense (deducted).");
  b.card("FACT", "Inventory in the trial balance", "Always the OPENING inventory. Closing inventory is given as a note.");
  b.card("CONCEPT", "Why does a service business have no gross profit?", "It sells services, not goods, so there is no cost of sales; it starts with fees and deducts expenses.");
  b.card("FACT", "Heading of an income statement", "Business name; Income statement (statement of profit or loss); for the year ended 31 December 2025.");
});
