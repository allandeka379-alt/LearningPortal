// W4b: interpreting financial statements and ratios.
import { concept, P, money } from "../lib.mjs";
import { ratios, table, fmt, r2, sum, check, d1, d2 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.interpretation", { file: "analysis/interpretation", keyPrefix: "analysis.interpretation" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A trader's revenue rose by 15% but her gross profit margin fell. Which is the most likely cause?",
    options: [
      ["She cut her selling prices to win sales", "Correct: lower prices raise volume but cut the margin."],
      ["Her wages bill increased", "Wages are below gross profit and do not affect the margin."],
      ["She received more rent from a sub-tenant", "Rent received is other income, not part of gross profit."],
      ["She took more drawings", "Drawings do not appear in the income statement."],
    ],
    answer: "A",
    explanation: "Only selling prices, buying prices, sales mix and inventory losses change the gross profit margin.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following would **reduce profit for the year** but leave the gross profit unchanged?",
    options: [
      ["More irrecoverable debts written off", "Correct: they are an expense below gross profit."],
      ["A fall in the selling prices of goods", "This reduces gross profit."],
      ["An increase in carriage inwards", "Carriage inwards is part of cost of sales, so gross profit falls."],
      ["Closing inventory being understated", "This raises cost of sales and lowers gross profit."],
    ],
    answer: "A",
    explanation: "Items in the profit and loss section (expenses and other income) change profit for the year without changing gross profit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A shop's closing inventory was overstated by US\\$1,200 this year. What is the effect on this year's gross profit and on **next** year's gross profit?",
    options: [
      ["This year overstated; next year understated", "Correct: next year's opening inventory is too high, so next year's cost of sales is too high."],
      ["This year understated; next year overstated", "Overstated closing inventory lowers cost of sales, raising this year's gross profit."],
      ["This year overstated; next year unaffected", "The same figure becomes next year's opening inventory."],
      ["Both years overstated", "The error reverses in the following year."],
    ],
    answer: "A",
    hints: ["Closing inventory this year is opening inventory next year."],
    explanation: "Too high a closing inventory lowers this year's cost of sales; as next year's opening inventory it raises next year's cost of sales.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A profitable business has a falling bank balance. Which of these could explain it?",
    options: [
      ["It paid cash for new equipment", "Correct: capital expenditure uses cash but only depreciation reduces profit."],
      ["It charged more depreciation", "Depreciation uses no cash."],
      ["It received a long-term loan", "A loan increases the bank balance."],
      ["Its trade payables increased", "Owing suppliers more keeps cash in the bank for longer."],
    ],
    answer: "A",
    explanation: "Buying non-current assets, drawings, and building up inventory or receivables all use cash without reducing profit by the same amount.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which action would improve a business's **liquidity** but **reduce** its profit for the year?",
    options: [
      ["Selling surplus inventory below cost for cash", "Correct: cash comes in, but the loss on the goods reduces gross profit."],
      ["Raising selling prices", "Higher prices would raise profit if sales hold up."],
      ["Taking a long-term loan with no interest for a year", "This improves liquidity without reducing profit in that year."],
      ["Paying a supplier from the bank", "This uses cash; it does not improve the bank position or change profit."],
    ],
    answer: "A",
    hints: ["Look for the option that brings in cash but at a loss."],
    explanation: "Clearance sales turn inventory into cash quickly, but selling below cost reduces gross profit.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "The profit margin fell from 14% to 10% while the gross profit margin stayed at 32%. What should the owner investigate first?",
    options: [
      ["The expenses in the profit and loss section", "Correct: with a steady gross margin, the fall comes from expenses or other income."],
      ["The selling prices of goods", "Selling prices would change the gross margin."],
      ["The cost of goods bought", "Buying prices would change the gross margin."],
      ["The valuation of closing inventory", "Inventory valuation affects gross profit, which is unchanged."],
    ],
    answer: "A",
    explanation: "The gap between gross margin and profit margin is expenses less other income as a share of revenue: it has widened from 18% to 22%.",
  });
  {
    const old = 1.4, now = 0.7;
    b.mcq({
      d: 3, skill: "ANALYSIS",
      stem: `A trader's current ratio stayed at 2.1 : 1 but her acid test ratio fell from ${old} : 1 to ${now} : 1. What has most likely happened?`,
      options: [
        ["More of the current assets are inventory", "Correct: only inventory separates the two ratios."],
        ["Trade payables have increased sharply", "That would lower both ratios."],
        ["The business has made a loss for the year", "Profit is not measured by these ratios."],
        ["The bank overdraft has been repaid", "Repaying an overdraft would change both ratios."],
      ],
      answer: "A",
      hints: ["What is the only difference between the two formulas?"],
      explanation: "If the current ratio is unchanged but the acid test falls, more of the current assets are inventory and less is cash or receivables.",
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which suggestion would improve a trader's **working capital**?",
    options: [
      ["Introducing more capital into the business bank account", "Correct: current assets rise with no rise in current liabilities."],
      ["Buying a delivery van from the bank account", "This turns a current asset into a non-current asset, reducing working capital."],
      ["Increasing drawings", "Drawings reduce cash and working capital."],
      ["Replacing a long-term loan with a bank overdraft", "This increases current liabilities, reducing working capital."],
    ],
    answer: "A",
    explanation: "Working capital = current assets − current liabilities. New capital or long-term finance paid into the bank increases it.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Depreciation reduces profit for the year but does not reduce the bank balance in that year.",
    answer: true,
    explanation: "True. Depreciation is a non-cash expense; the cash was spent when the asset was bought.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If revenue increases, profit for the year must also increase.",
    answer: false,
    explanation: "False. Lower margins or higher expenses can mean lower profit even on higher sales.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each change with the ratio it would most directly worsen.",
    right: ["Gross profit margin", "Profit margin only (gross margin unchanged)", "Acid test ratio", "Rate of inventory turnover"],
    pairs: ["Supplier raises prices; selling prices unchanged", "Rent of the shop doubles", "Customers take longer to pay and the bank goes overdrawn", "Large purchases of slow-selling goods"],
    rightIndex: [0, 1, 2, 3],
    hints: ["Decide whether each change affects trading, expenses, cash or inventory."],
    explanation: "Buying prices affect the gross margin; expenses affect the profit margin; an overdraft lowers the acid test; excess inventory slows turnover.",
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Drawings reduce the bank balance but are not an {{blank:a}}. Buying a non-current asset is {{blank:b}} expenditure, so only its {{blank:c}} appears in the income statement.",
    blanks: [
      { id: "a", accepted: ["expense"], choices: ["expense", "asset", "liability"] },
      { id: "b", accepted: ["capital"], choices: ["capital", "revenue", "current"] },
      { id: "c", accepted: ["depreciation"], choices: ["depreciation", "cost", "residual value"] },
    ],
    explanation: "These are two of the main reasons why profit and cash differ.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const items = [["Profit for the year", 15400], ["Depreciation", 3100], ["New equipment bought", -11800], ["Drawings", -7200], ["Increase in inventory", -1900], ["Decrease in trade receivables", 850], ["Decrease in trade payables", -1450]];
    const change = sum(items.map((x) => x[1]));
    check("int num1", change, -3000);
    b.calc({
      d: 4, kind: "money", value: Math.abs(change), calculator: true, wrong: [r2(15400 - 11800 - 7200 - 1900 + 850 - 1450), r2(Math.abs(change) - 2 * 850)],
      stem: `Sipho's profit for 2025 was ${money(15400)} after depreciation of ${money(3100)}. During the year he bought equipment for ${money(11800)} from the bank and took drawings of ${money(7200)}. Inventory increased by ${money(1900)}, trade receivables decreased by ${money(850)} and trade payables decreased by ${money(1450)}. By how much did his bank balance fall? (Enter the amount without a minus sign.)`,
      hints: ["Add back depreciation.", "More inventory uses cash; fewer receivables brings cash in; fewer payables means cash was paid out."],
      explanation: `15,400 + 3,100 − 11,800 − 7,200 − 1,900 + 850 − 1,450 = ${fmt(change)}, a fall of ${fmt(Math.abs(change))}. Forgetting to add back depreciation gives a fall of ${fmt(Math.abs(r2(15400 - 11800 - 7200 - 1900 + 850 - 1450)))}.`,
    });
  }
  {
    const y1 = 46500, y2 = 54870;
    const pct = ((y2 - y1) / y1) * 100;
    b.num({
      d: 2, kind: "pct", value: pct, wrong: [d1(((y2 - y1) / y2) * 100)],
      stem: `Revenue rose from ${money(y1)} in 2024 to ${money(y2)} in 2025. Calculate the percentage increase, to one decimal place.`,
      explanation: `(${fmt(y2)} − ${fmt(y1)}) ÷ ${fmt(y1)} × 100 = ${d1(pct)}%. Dividing by the new figure gives ${d1(((y2 - y1) / y2) * 100)}%.`,
    });
  }
  {
    const rev = 80000, gpm1 = 30, gpm2 = 27;
    const fall = r2((rev * (gpm1 - gpm2)) / 100);
    check("int num3", fall, 2400);
    b.num({
      d: 3, kind: "money", value: fall, wrong: [r2(rev * 0.27)],
      stem: `A shop's revenue was ${money(rev)} in both 2024 and 2025. Its gross profit margin fell from ${gpm1}% to ${gpm2}%. By how much did gross profit fall?`,
      hints: ["Find gross profit in each year."],
      explanation: `2024: 30% × 80,000 = 24,000; 2025: 27% × 80,000 = 21,600; fall = ${fmt(fall)}.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "Suggest **three** ways in which a hardware shop could improve its gross profit margin.",
    points: ["Raise selling prices (where customers will accept)", "Buy more cheaply: new suppliers, bulk or trade discounts", "Sell more high-margin lines / reduce theft, damage and waste of inventory"],
    modelAnswer: "The owner could raise prices on items where competitors charge more, negotiate bulk discounts or find cheaper suppliers, and promote higher-margin lines such as tools while tightening security to cut losses of stock.",
    hints: ["Gross profit depends on selling prices, buying prices and inventory losses."],
    explanation: "Each suggestion must act on revenue or cost of sales.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **two** reasons why a business that made a profit may not have enough cash to pay its suppliers.",
    points: ["Cash spent on non-current assets / drawings, which do not reduce profit (or not fully)", "Cash tied up in inventory or in trade receivables who have not paid yet"],
    modelAnswer: "It may have used its cash to buy equipment, which reduces profit only through depreciation, and much of its profit may be in unsold inventory or in sales to customers who have not yet paid.",
    explanation: "Profit is not the same as cash.",
  });

  // ---------------------------------------------------------------- Practice structured 1 (two-year comparison)
  {
    const Y = [
      { rev: 96000, cos: 62400, exp: 21120, ca: 21600, inv: 9600, cl: 12400, oi: 8400 },
      { rev: 92000, cos: 62560, exp: 22540, ca: 24900, inv: 15600, cl: 15500, oi: 9600 },
    ];
    const R = Y.map((y) => {
      const gp = y.rev - y.cos, np = gp - y.exp;
      return { gp, np, gpm: ratios.grossMargin(gp, y.rev), pm: ratios.profitMargin(np, y.rev), cr: ratios.current(y.ca, y.cl), at: ratios.acidTest(y.ca, y.inv, y.cl), it: ratios.inventoryTurnover(y.cos, y.oi, y.inv) };
    });
    const stim = table(["", "2024 US\\$", "2025 US\\$"], [["Revenue", 96000, 92000], ["Cost of sales", 62400, 62560], ["Expenses", 21120, 22540], ["Inventory at 1 January", 8400, 9600], ["Inventory at 31 December", 9600, 15600], ["Current assets at 31 December", 21600, 24900], ["Current liabilities at 31 December", 12400, 15500]]);
    const ratioTable = table(["Ratio", "2024", "2025"], [["Gross profit margin", `${d1(R[0].gpm)}%`, "(a)"], ["Profit margin (net profit percentage)", `${d1(R[0].pm)}%`, "(b)"], ["Current ratio", `${d2(R[0].cr)} : 1`, `${d2(R[1].cr)} : 1`], ["Acid test (quick) ratio", `${d2(R[0].at)} : 1`, "(c)"], ["Rate of inventory turnover", `${d1(R[0].it)} times`, `${d1(R[1].it)} times`]]);
    b.struct({
      d: 4, examStyle: true, skill: "EVALUATION", calculator: true,
      stem: `Chipo Marufu owns a clothing shop in Masvingo. Extracts from her statements:\n\n${stim}\n\nSome ratios have been calculated:\n\n${ratioTable}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: R[1].gpm, stem: "Calculate the gross profit margin for 2025, to one decimal place.", explanation: `Gross profit ${fmt(R[1].gp)} ÷ 92,000 × 100 = ${d1(R[1].gpm)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: R[1].pm, stem: "Calculate the profit margin (net profit percentage) for 2025, to one decimal place.", explanation: `Profit ${fmt(R[1].np)} ÷ 92,000 × 100 = ${d1(R[1].pm)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "ratio", value: R[1].at, wrong: [d2(R[1].cr)], stem: "Calculate the acid test (quick) ratio for 2025, as x : 1 to two decimal places.", explanation: `(24,900 − 15,600) ÷ 15,500 = ${d2(R[1].at)} : 1.` }),
        P.manual({ label: "(d)", marks: 3, stem: "Comment on Chipo's profitability in 2025 compared with 2024.", points: [`Gross margin fell from ${d1(R[0].gpm)}% to ${d1(R[1].gpm)}%: lower prices / higher buying costs`, `Profit margin fell from ${d1(R[0].pm)}% to ${d1(R[1].pm)}%: expenses rose while revenue fell`, `Profit for the year fell from ${fmt(R[0].np)} to ${fmt(R[1].np)}`], modelAnswer: `Profitability has worsened. Revenue fell by US\\$4,000 while cost of sales rose slightly, so the gross margin fell from ${d1(R[0].gpm)}% to ${d1(R[1].gpm)}%, suggesting price cuts or dearer stock. Expenses rose by US\\$1,420, so the profit margin fell from ${d1(R[0].pm)}% to ${d1(R[1].pm)}% and profit fell from US\\$${fmt(R[0].np)} to US\\$${fmt(R[1].np)}.`, explanation: "Direction, size, cause." }),
        P.manual({ label: "(e)", marks: 3, stem: "Comment on Chipo's liquidity and inventory management, and suggest **two** improvements.", points: [`Acid test fell from ${d2(R[0].at)} : 1 to ${d2(R[1].at)} : 1 (below 1 : 1) although the current ratio is still ${d2(R[1].cr)} : 1`, `Closing inventory rose from 9,600 to 15,600 and turnover slowed from ${d1(R[0].it)} to ${d1(R[1].it)} times: cash is tied up in clothes`, "Two improvements, e.g. clearance sale of old stock; buy smaller quantities; chase receivables; long-term finance"], modelAnswer: `Her current ratio still looks safe at ${d2(R[1].cr)} : 1, but the acid test has fallen to ${d2(R[1].at)} : 1 because inventory has risen by US\\$6,000 and the rate of turnover has slowed to ${d1(R[1].it)} times. She should hold a sale to clear old stock and order smaller quantities more often.`, explanation: "Link efficiency to liquidity." }),
      ],
      hints: ["Gross profit = revenue − cost of sales; profit = gross profit − expenses."],
      explanation: `2025: gross margin ${d1(R[1].gpm)}%, profit margin ${d1(R[1].pm)}%, acid test ${d2(R[1].at)} : 1.`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (profit v cash)
  {
    const np = 18600, dep = 2400, nca = 14500, dr = 9600, incInv = 3200, incRec = 2150, incPay = 1800, loan = 5000;
    const change = r2(np + dep - nca - dr - incInv - incRec + incPay + loan);
    check("int s2", change, -1650);
    b.struct({
      d: 3, examStyle: true, skill: "ANALYSIS", calculator: true,
      stem: `Farai Moyo's transport business made a profit for the year of ${money(np)} in 2025, yet his bank balance fell. During 2025: depreciation charged was ${money(dep)}; he bought a second-hand truck for ${money(nca)} from the bank; he received a long-term loan of ${money(loan)}; drawings were ${money(dr)}; inventory of spares and fuel rose by ${money(incInv)}; trade receivables rose by ${money(incRec)}; trade payables rose by ${money(incPay)}.`,
      parts: [
        P.num({ label: "(a)", marks: 4, kind: "money", value: Math.abs(change), wrong: [Math.abs(r2(change - dep)), Math.abs(r2(change - loan))], stem: "Calculate the decrease in Farai's bank balance during 2025. (Enter the amount without a minus sign.)", explanation: `${fmt(np)} + ${fmt(dep)} − ${fmt(nca)} + ${fmt(loan)} − ${fmt(dr)} − ${fmt(incInv)} − ${fmt(incRec)} + ${fmt(incPay)} = ${fmt(change)}.` }),
        P.mcq({ label: "(b)", stem: "Which item used the most cash in 2025?", options: [["Buying the truck", "Correct: 14,500, the largest outflow."], ["Drawings", "Drawings were 9,600, less than the truck."], ["The increase in inventory", "This used 3,200."], ["Depreciation", "Depreciation uses no cash."]], answer: "A", explanation: "Capital expenditure on the truck was the largest single use of cash." }),
        P.manual({ label: "(c)", marks: 2, stem: "Explain why depreciation is added back when explaining the difference between profit and the change in the bank balance.", points: ["Depreciation is an expense that reduced profit", "But no cash was paid for it in the year (the cash went when the asset was bought)"], modelAnswer: "Depreciation was deducted to find profit, but it is not a payment; the cash left the business when the vehicles were bought. Adding it back removes a deduction that did not affect the bank.", explanation: "Non-cash expense." }),
        P.manual({ label: "(d)", marks: 2, stem: "Advise Farai on **two** ways to protect his bank balance in 2026.", points: ["Reduce drawings", "Collect receivables faster / hold less inventory / finance future vehicles with long-term loans or hire purchase rather than cash"], modelAnswer: "He should take smaller drawings and chase his customers to pay within the agreed time, and finance any further vehicles with a long-term loan rather than cash.", explanation: "Advice must link to the causes found." }),
      ],
      hints: ["Start from profit; add back depreciation; then deal with each cash item."],
      explanation: `Change in bank: ${fmt(change)}.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("CONCEPT", "Three parts of a good ratio comment", "Direction and size (with figures), a likely cause, and the effect or advice.");
  b.card("FACT", "What changes the gross profit margin?", "Selling prices, buying prices, sales mix, theft or damage of inventory, and errors in inventory valuation.");
  b.card("FACT", "What changes profit for the year but not gross profit?", "Expenses (wages, rent, depreciation, irrecoverable debts, interest) and other income (rent received, commission, discount received).");
  b.card("FACT", "Why profit and cash differ", "Capital expenditure, depreciation, drawings, changes in inventory, receivables and payables, loans and capital introduced.");
  b.card("FACT", "Ways to improve liquidity and working capital", "More capital or long-term loans, less inventory, faster collection from customers, longer credit from suppliers, sell unused assets, cut drawings.");
  b.card("FACT", "Ways to improve profitability", "Raise prices, buy more cheaply, sell higher-margin lines, reduce losses of inventory, control expenses.");
  b.card("CONCEPT", "Closing inventory overstated", "This year's gross profit is overstated; next year's is understated (opening inventory too high).");
  b.card("CONCEPT", "Current ratio steady, acid test falling", "Inventory has become a bigger share of current assets.");
});
