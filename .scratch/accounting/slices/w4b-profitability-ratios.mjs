// W4b: profitability ratios (gross profit margin, mark-up, profit margin / net profit percentage, ROCE for Cambridge).
import { concept, P, money, CAM, ZIM } from "../lib.mjs";
import { incomeStatement, ratios, table, TERMS, fmt, r2, check, d1 } from "../tables/w4b-lib.mjs";

concept("acc.analysis.profitability-ratios", { file: "analysis/profitability-ratios", keyPrefix: "analysis.profitability-ratios" }, (b) => {
  // ---------------------------------------------------------------- MCQs
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which formula gives the **mark-up**?",
    options: [
      ["Gross profit ÷ cost of sales × 100", "Correct: mark-up is calculated on cost."],
      ["Gross profit ÷ revenue × 100", "This is the gross profit margin."],
      ["Profit for the year ÷ revenue × 100", "This is the profit margin (net profit percentage)."],
      ["Cost of sales ÷ revenue × 100", "This shows cost as a share of sales, not mark-up."],
    ],
    answer: "A",
    explanation: "Mark-up = gross profit ÷ cost of sales × 100; margin uses revenue as the denominator.",
  });
  {
    const rev = 64000, gp = 19200;
    const v = ratios.grossMargin(gp, rev);
    check("pr mcq1", v, 30);
    b.mcq({
      d: 2, skill: "APPLICATION", daily: true, calculator: true,
      stem: `Revenue was ${money(rev)} and gross profit was ${money(gp)}. What was the gross profit margin?`,
      options: [
        ["30.0%", "Correct: 19,200 ÷ 64,000 × 100."],
        [`${d1(ratios.markUp(gp, rev - gp))}%`, "This is the mark-up: gross profit has been divided by cost of sales."],
        ["70.0%", "This is cost of sales as a percentage of revenue."],
        [`${d1((rev / gp) * 100)}%`, "Revenue has been divided by gross profit, the formula upside down."],
      ],
      answer: "A",
      explanation: `${fmt(gp)} ÷ ${fmt(rev)} × 100 = ${d1(v)}%.`,
    });
  }
  {
    const gp = 15300, cos = 45000;
    const v = ratios.markUp(gp, cos);
    check("pr mcq2", v, 34);
    b.mcq({
      d: 2, skill: "APPLICATION", calculator: true,
      stem: `Cost of sales was ${money(cos)} and gross profit was ${money(gp)}. What was the mark-up?`,
      options: [
        ["34.0%", "Correct: 15,300 ÷ 45,000 × 100."],
        [`${d1(ratios.grossMargin(gp, cos + gp))}%`, "This is the margin: gross profit has been divided by revenue."],
        ["66.0%", "This is 100% minus the mark-up, which has no meaning here."],
        [`${d1((cos / (cos + gp)) * 100)}%`, "This is cost of sales as a percentage of revenue."],
      ],
      answer: "A",
      explanation: `Mark-up = ${fmt(gp)} ÷ ${fmt(cos)} × 100 = ${d1(v)}%.`,
    });
  }
  {
    const rev = 88000, sr = 3000, np = 10200;
    const v = ratios.profitMargin(np, rev - sr);
    check("pr mcq3", v, 12);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A business had sales of ${money(rev)}, sales returns of ${money(sr)} and a profit for the year of ${money(np)}. What was the profit margin (net profit percentage)?`,
      options: [
        ["12.0%", "Correct: 10,200 ÷ 85,000 × 100."],
        [`${d1(ratios.profitMargin(np, rev))}%`, "Sales returns have not been deducted from revenue."],
        [`${d1(ratios.profitMargin(np, rev + sr))}%`, "Sales returns have been added to revenue instead of deducted."],
        ["88.0%", "This is 100% minus the profit margin."],
      ],
      answer: "A",
      hints: ["Use revenue less sales returns."],
      explanation: `Net revenue = ${fmt(rev)} − ${fmt(sr)} = ${fmt(rev - sr)}. Profit margin = ${fmt(np)} ÷ ${fmt(rev - sr)} × 100 = ${d1(v)}%.`,
    });
  }
  {
    const shares = 150000, reserves = 42000, loan = 48000, profit = 26400, interest = 3600;
    const ce = shares + reserves + loan;
    const v = ratios.roce(profit + interest, ce);
    check("pr mcq4", v, 12.5);
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: true, applies: CAM,
      stem: `A company has issued shares of ${money(shares)}, reserves of ${money(reserves)} and a long-term loan of ${money(loan)}. Profit for the year after loan interest of ${money(interest)} was ${money(profit)}. What is the return on capital employed?`,
      options: [
        ["12.5%", "Correct: 30,000 ÷ 240,000 × 100."],
        [`${d1(ratios.roce(profit, ce))}%`, "Profit after interest has been used; interest must be added back."],
        [`${d1(ratios.roce(profit + interest, shares + reserves))}%`, "The loan has been left out of capital employed."],
        [`${d1(ratios.roce(profit + interest, shares))}%`, "Only issued shares have been used; reserves and the loan are part of capital employed."],
      ],
      answer: "A",
      hints: ["Capital employed = issued shares + reserves + non-current liabilities."],
      explanation: `Profit before interest = ${fmt(profit)} + ${fmt(interest)} = ${fmt(profit + interest)}. Capital employed = ${fmt(ce)}. ROCE = ${d1(v)}%.`,
    });
  }
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A trader's gross profit margin stayed the same but her profit margin fell. What is the most likely reason?",
    options: [
      ["Her expenses rose faster than her sales", "Correct: only items below gross profit have changed."],
      ["Her suppliers raised their prices", "Higher buying prices would reduce the gross profit margin too."],
      ["She cut her selling prices", "Lower selling prices would reduce the gross profit margin."],
      ["Some inventory was stolen", "Theft raises cost of sales and lowers the gross profit margin."],
    ],
    answer: "A",
    explanation: "With a steady gross margin, the fall must come from expenses (or lower other income).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which change would **increase** a shop's gross profit margin, all else being equal?",
    options: [
      ["Buying goods in bulk at a lower unit cost", "Correct: lower cost of sales for the same revenue raises gross profit."],
      ["Paying the shop assistant a higher wage", "Wages are an expense below gross profit."],
      ["Giving customers a larger discount on selling prices", "Lower selling prices reduce the margin."],
      ["Spending more on advertising", "Advertising is an expense below gross profit."],
    ],
    answer: "A",
    hints: ["Only revenue and cost of sales affect gross profit."],
    explanation: "Gross profit margin depends only on selling prices and the cost of goods sold.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: CAM,
    stem: "In the Cambridge formula for ROCE, capital employed is …",
    options: [
      ["issued shares + reserves + non-current liabilities", "Correct: the long-term finance of the company."],
      ["total assets less all non-current liabilities", "This is equity, which leaves out the loans."],
      ["current assets less current liabilities at the year end", "This is working capital."],
      ["issued shares plus reserves plus current liabilities", "Current liabilities are short-term finance, not capital employed."],
    ],
    answer: "A",
    explanation: "The syllabus prints capital employed as issued shares + reserves + non-current liabilities.",
  });

  // ---------------------------------------------------------------- TF
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "For any business making a gross profit, the mark-up is always a higher percentage than the gross profit margin.",
    answer: true,
    explanation: "True. Both use the same gross profit, but cost of sales is smaller than revenue, so dividing by it gives a larger percentage.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rent received by a trader is included in revenue when calculating the gross profit margin.",
    answer: false,
    explanation: "False. Revenue is sales of goods (net of returns). Rent received is other income, added after gross profit.",
  });
  b.tf({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "In ZIMSEC questions, the net profit percentage is net profit divided by sales, multiplied by 100.",
    answer: true,
    explanation: "True. It is the same ratio Cambridge calls the profit margin.",
  });

  // ---------------------------------------------------------------- Match
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each ratio with the figure it is divided by.",
    pairs: [["Gross profit margin", "Revenue"], ["Mark-up", "Cost of sales"], ["Return on capital employed", "Capital employed"]],
    extraRight: ["Average inventory"],
    explanation: "Margin and profit margin divide by revenue; mark-up by cost of sales; ROCE by capital employed. Average inventory is used for inventory turnover.",
    applies: CAM,
  });

  // ---------------------------------------------------------------- FIB
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "Complete the sentence.",
    template: "A margin of 30% means that every US\\$100 of sales gives US\\$ {{blank:a}} of gross profit and has a cost of sales of US\\$ {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["30"] },
      { id: "b", accepted: ["70"] },
    ],
    explanation: "Margin is a percentage of selling price: 30 of every 100 is gross profit, 70 is cost.",
  });

  // ---------------------------------------------------------------- Numerical
  {
    const rev = 146500, sr = 2300, gp = 41860;
    const v = ratios.grossMargin(gp, rev - sr);
    b.num({
      d: 2, kind: "pct", value: v, calculator: true, wrong: [d1(ratios.grossMargin(gp, rev))],
      stem: `Sales ${money(rev)}; sales returns ${money(sr)}; gross profit ${money(gp)}. Calculate the gross profit margin, to one decimal place.`,
      explanation: `${fmt(gp)} ÷ ${fmt(rev - sr)} × 100 = ${d1(v)}%. Using sales before returns gives ${d1(ratios.grossMargin(gp, rev))}%.`,
    });
  }
  {
    const rev = 78400, cos = 53900;
    const gp = rev - cos;
    const v = ratios.markUp(gp, cos);
    b.calc({
      d: 3, kind: "pct", value: v, calculator: true, wrong: [d1(ratios.grossMargin(gp, rev))],
      stem: `Thandeka's revenue was ${money(rev)} and her cost of sales ${money(cos)}. Calculate her mark-up, to one decimal place.`,
      hints: ["Find gross profit first."],
      explanation: `Gross profit = ${fmt(rev)} − ${fmt(cos)} = ${fmt(gp)}. Mark-up = ${fmt(gp)} ÷ ${fmt(cos)} × 100 = ${d1(v)}%. Dividing by revenue gives the margin, ${d1(ratios.grossMargin(gp, rev))}%.`,
    });
  }
  {
    const cap = 58000, loan = 12000, np = 9850, int = 960;
    const v = ratios.roce(np + int, cap + loan);
    b.calc({
      d: 4, kind: "pct", value: v, calculator: true, applies: CAM, wrong: [d1(ratios.roce(np, cap + loan)), d1(ratios.roce(np + int, cap))],
      stem: `Sipho is a sole trader. At 31 December 2025 his capital was ${money(cap)} and he had a bank loan of ${money(loan)} repayable in 2029. His profit for the year was ${money(np)} after loan interest of ${money(int)}. Calculate his return on capital employed, to one decimal place.`,
      hints: ["For a sole trader, capital employed = owner's capital + non-current liabilities.", "Add the interest back to profit."],
      explanation: `Profit before interest = ${fmt(np)} + ${fmt(int)} = ${fmt(np + int)}. Capital employed = ${fmt(cap)} + ${fmt(loan)} = ${fmt(cap + loan)}. ROCE = ${d1(v)}%. Using profit after interest gives ${d1(ratios.roce(np, cap + loan))}%; leaving out the loan gives ${d1(ratios.roce(np + int, cap))}%.`,
    });
  }

  // ---------------------------------------------------------------- manual short
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 2,
    stem: "Rudo's gross profit margin fell from 35.0% to 31.0%. Suggest **two** reasons for the fall.",
    points: ["Cost prices rose and were not passed on to customers", "Selling prices were reduced / more discounts / theft or damage of inventory / change to lower-margin goods"],
    modelAnswer: "Her suppliers may have raised prices without her raising her own, or she cut her selling prices to attract customers.",
    hints: ["Think only about revenue and cost of sales."],
    explanation: "The gross margin depends only on buying and selling prices and inventory losses.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2, applies: CAM, hints: ["Compare the return with what the money could earn elsewhere at lower risk."],
    stem: "A sole trader's ROCE is 4.5%. A bank fixed deposit pays 7%. Advise the owner what this comparison suggests.",
    points: ["The business earns less than a risk-free deposit would", "So the owner should improve profitability or consider whether the capital would be better invested elsewhere (allowing for non-financial reasons)"],
    modelAnswer: "Her money earns only 4.5% in the business, less than the 7% it could earn safely in the bank. She should look for ways to raise profit, or consider whether the business is worth the risk.",
    explanation: "ROCE is compared with the return on alternative, lower-risk investments.",
  });

  // ---------------------------------------------------------------- Practice structured 1
  {
    const is = incomeStatement({ name: "Nyasha Moyo", terms: TERMS.BOTH, revenue: 92600, salesReturns: 1600, openInv: 7400, cos: [["Purchases", 62950]], closeInv: 8650, otherIncome: [["Commission received", 900]], expenses: [["Wages", 10800], ["Rent", 4200], ["Electricity", 1650], ["Insurance", 1240], ["Depreciation", 2310]] });
    const gpm = ratios.grossMargin(is.gp, is.netRev), mu = ratios.markUp(is.gp, is.cos), pm = ratios.profitMargin(is.np, is.netRev);
    b.struct({
      d: 3, examStyle: true, skill: "APPLICATION", calculator: true,
      stem: `Nyasha Moyo sells kitchen goods in Mutare. Her income statement (statement of profit or loss) for 2025 is:\n\n${is.md}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: gpm, wrong: [d1(ratios.grossMargin(is.gp, 92600))], stem: "Calculate the gross profit margin, to one decimal place.", explanation: `${fmt(is.gp)} ÷ ${fmt(is.netRev)} × 100 = ${d1(gpm)}%.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: mu, wrong: [d1(gpm)], stem: "Calculate the mark-up, to one decimal place.", explanation: `${fmt(is.gp)} ÷ ${fmt(is.cos)} × 100 = ${d1(mu)}%.` }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: pm, wrong: [d1(ratios.profitMargin(is.np - 900, is.netRev))], stem: "Calculate the profit margin (net profit percentage), to one decimal place.", explanation: `${fmt(is.np)} ÷ ${fmt(is.netRev)} × 100 = ${d1(pm)}%.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain the difference between what the gross profit margin and the profit margin show.", points: ["Gross profit margin shows profit from buying and selling (prices and cost of goods) per dollar of sales", "Profit margin shows what is left per dollar of sales after all expenses (and other income), so it reflects control of expenses"], modelAnswer: "The gross margin shows how much of each dollar of sales is left after the cost of the goods, so it reflects pricing and buying. The profit margin shows what remains after all running expenses, so it also reflects how well expenses are controlled.", explanation: "The gap between the two margins is the expenses (less other income) as a share of sales." }),
      ],
      hints: ["Use revenue after sales returns."],
      explanation: `Gross profit margin ${d1(gpm)}%; mark-up ${d1(mu)}%; profit margin ${d1(pm)}%.`,
    });
  }

  // ---------------------------------------------------------------- Practice structured 2 (Cambridge, ROCE and comparison)
  {
    const y = [
      { yr: "2024", rev: 210000, gp: 67200, np: 23100, int: 2400, shares: 120000, res: 38000, loan: 30000 },
      { yr: "2025", rev: 248000, gp: 74400, np: 22320, int: 4800, shares: 120000, res: 51000, loan: 60000 },
    ];
    const r = y.map((o) => ({ gpm: ratios.grossMargin(o.gp, o.rev), pm: ratios.profitMargin(o.np, o.rev), roce: ratios.roce(o.np + o.int, o.shares + o.res + o.loan) }));
    const growth = ((y[1].rev - y[0].rev) / y[0].rev) * 100;
    const ceUp = y[1].shares + y[1].res + y[1].loan - (y[0].shares + y[0].res + y[0].loan);
    const pbiUp = y[1].np + y[1].int - (y[0].np + y[0].int);
    const stim = table(["", "2024 US\\$", "2025 US\\$"], [["Revenue", 210000, 248000], ["Gross profit", 67200, 74400], ["Profit for the year", 23100, 22320], ["Loan interest (included in expenses)", 2400, 4800], ["Issued ordinary shares", 120000, 120000], ["Reserves", 38000, 51000], ["Non-current liabilities: loan", 30000, 60000]]);
    b.struct({
      d: 4, examStyle: true, skill: "ANALYSIS", calculator: true, applies: CAM,
      stem: `Chinhoyi Feeds Ltd extended its warehouse in 2025, financed by an additional loan. Extracts from its financial statements:\n\n${stim}\n\nIn 2024 the gross profit margin was ${d1(r[0].gpm)}%, the profit margin ${d1(r[0].pm)}% and the ROCE ${d1(r[0].roce)}%.`,
      parts: [
        P.num({ label: "(a)", marks: 1, kind: "pct", value: r[1].gpm, stem: "Calculate the gross profit margin for 2025, to one decimal place.", explanation: `74,400 ÷ 248,000 × 100 = ${d1(r[1].gpm)}%.` }),
        P.num({ label: "(b)", marks: 1, kind: "pct", value: r[1].pm, stem: "Calculate the profit margin for 2025, to one decimal place.", explanation: `22,320 ÷ 248,000 × 100 = ${d1(r[1].pm)}%.` }),
        P.num({ label: "(c)", marks: 3, kind: "pct", value: r[1].roce, wrong: [d1(ratios.roce(22320, 231000)), d1(ratios.roce(27120, 171000))], stem: "Calculate the return on capital employed for 2025, to one decimal place.", explanation: `Profit before interest 22,320 + 4,800 = 27,120; capital employed 120,000 + 51,000 + 60,000 = 231,000; ROCE ${d1(r[1].roce)}%.` }),
        P.manual({ label: "(d)", marks: 4, stem: "Comment on the changes in the three ratios between 2024 and 2025 and evaluate whether the warehouse extension has been worthwhile so far.", points: [`Gross margin fell (${d1(r[0].gpm)}% to ${d1(r[1].gpm)}%): lower selling prices or higher costs`, `Profit margin fell (${d1(r[0].pm)}% to ${d1(r[1].pm)}%): expenses including the doubled interest grew faster than sales`, `ROCE fell (${d1(r[0].roce)}% to ${d1(r[1].roce)}%): the extra capital has not yet earned a matching return`, `Evaluation: revenue grew ${d1(growth)}%, so the extension may pay off later; so far it has not been worthwhile on these figures`], modelAnswer: `All three ratios fell. The gross margin dropped from ${d1(r[0].gpm)}% to ${d1(r[1].gpm)}%, suggesting cheaper selling prices or higher feed costs. The profit margin fell from ${d1(r[0].pm)}% to ${d1(r[1].pm)}% because expenses, including twice as much interest, rose faster than sales. ROCE fell from ${d1(r[0].roce)}% to ${d1(r[1].roce)}% because capital employed rose by ${money(ceUp)} while profit before interest rose by only ${money(pbiUp)}. Revenue grew by ${d1(growth)}%, so the warehouse may pay off as sales grow, but so far it has reduced profitability.`, explanation: "Comment on direction, likely cause, and reach a conclusion." }),
      ],
      hints: ["Capital employed = issued shares + reserves + non-current liabilities.", "Add the interest back for ROCE."],
      explanation: `2025: gross margin ${d1(r[1].gpm)}%, profit margin ${d1(r[1].pm)}%, ROCE ${d1(r[1].roce)}%.`,
    });
  }

  // ---------------------------------------------------------------- Flashcards
  b.card("FORMULA", "Gross profit margin", "Gross profit ÷ revenue × 100.");
  b.card("FORMULA", "Mark-up", "Gross profit ÷ cost of sales × 100.");
  b.card("FORMULA", "Profit margin (net profit percentage)", "Profit for the year ÷ revenue × 100.");
  b.card("FORMULA", "Return on capital employed (ROCE)", "Profit for the year before interest ÷ capital employed × 100.", null, { applies: CAM });
  b.card("FORMULA", "Capital employed", "Issued shares + reserves + non-current liabilities (sole trader: capital + non-current liabilities).", null, { applies: CAM });
  b.card("CONCEPT", "Gross margin steady, profit margin down", "Expenses have risen faster than sales (or other income has fallen).");
  b.card("CONCEPT", "Why mark-up is always bigger than margin", "Both use the same gross profit, but cost of sales is smaller than revenue.");
  b.card("FACT", "Causes of a lower gross profit margin", "Higher buying prices not passed on, lower selling prices or discounts, theft or damage of inventory, a shift to lower-margin goods.");
  b.card("FACT", "ZIMSEC name for the profit margin", "Net profit percentage: net profit ÷ sales × 100.", null, { applies: ZIM });
});
