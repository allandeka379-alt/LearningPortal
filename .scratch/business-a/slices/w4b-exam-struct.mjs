// W4b exam-format items: ZIM_STRUCT10 x3 (ZIMSEC Business Studies Paper 1 section A / Business Enterprise Skills Paper 1 section A)
import { concept, P, EXAM, checkExam, ZIM, ZBS, cvp, ratios, chk, r2, fmt, table } from "../lib.mjs";

const C = (k) => `abus.${k}`;

concept(C("finance.break-even"), { file: "exam/w4b-struct", keyPrefix: "exam.w4b-struct" }, (b) => {
  // 1. Break-even (both ZIMSEC syllabi)
  const be = cvp({ price: 6.4, variable: 4.1, fixed: 13800 });
  chk(be.contribution, 2.3, 1e-9); chk(be.breakEvenUnits, 6000, 1e-6); chk(be.profitAt(7000), 2300, 1e-6); chk(be.marginOfSafetyUnits(7000), 1000, 1e-6);
  b.struct({
    d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
    paper: "ZIMSEC BES Paper 1",
    concepts: [C("finance.break-even")],
    stem: "Tinashe Beekeepers is a fictional honey-packing business in Chimanimani. It sells 500 g jars of honey for US\\$6.40 each. The variable cost of a jar is US\\$4.10 and fixed costs are US\\$13,800 a month. The owner plans to sell 7,000 jars a month.",
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 3, kind: "units", value: be.breakEvenUnits, type: "CALCULATION", wrong: [r2(13800 / 6.4), r2(13800 / 4.1)], stem: "Calculate the break-even output in jars a month.", explanation: "Contribution per jar = 6.40 − 4.10 = 2.30. Break-even output = 13,800 ÷ 2.30 = 6,000 jars.", workedSolution: "1. Contribution per jar = 6.40 − 4.10 = 2.30.\n2. Break-even output = 13,800 ÷ 2.30 = 6,000 jars." }),
      P.group({ label: "(b)", stem: "At the planned output of 7,000 jars, calculate:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "units", value: be.marginOfSafetyUnits(7000), wrong: [7000, 600], stem: "the margin of safety in jars;", explanation: "7,000 − 6,000 = 1,000 jars." }),
        P.num({ label: "(ii)", marks: 2, kind: "money", value: be.profitAt(7000), wrong: [7000 * 2.3, 7000 * 6.4 - 13800], stem: "the monthly profit.", explanation: "7,000 × 2.30 = 16,100; less fixed costs of 13,800 = US\\$2,300." }),
      ] }),
      P.manual({ label: "(c)", marks: 4, stem: "Outline two ways in which the business could reduce its break-even output.", points: ["Raise the selling price per jar, which increases the contribution per jar", "Development: fewer jars are needed to cover the fixed costs", "Reduce the variable cost per jar, for example by buying jars or honey more cheaply", "Development: a larger contribution per jar lowers the break-even output (or reduce the fixed costs such as rent)"], modelAnswer: "The business could raise the selling price per jar, which increases the contribution per jar, so fewer jars are needed to cover the fixed costs. It could also reduce the variable cost per jar, for example by buying jars or honey more cheaply, or cut fixed costs such as rent, which lowers the amount the contribution has to cover.", explanation: "Two ways, each developed." }),
    ]),
    hints: ["Contribution per jar first.", "Margin of safety = planned output − break-even output."],
    explanation: "Break-even 6,000 jars; margin of safety 1,000 jars; profit US\\$2,300; price rise or cost cuts lower break-even.",
  });

  // 2. Ratios (both ZIMSEC syllabi)
  const R = { rev: 531400, cos: 345300, exp: 118700, sh: 148000, res: 112500, ncl: 61000, ca: 119600, inv: 53400, cl: 67200 };
  const gp = R.rev - R.cos, op = gp - R.exp, ce = ratios.capitalEmployed(R.sh, R.res, R.ncl);
  const gm = ratios.grossMargin(gp, R.rev), roce = ratios.roce(op, ce), at = ratios.acidTest(R.ca, R.inv, R.cl);
  chk(gp, 186100); chk(op, 67400); chk(ce, 321500); chk(gm, 35.0207, 1e-3); chk(roce, 20.9642, 1e-3); chk(at, 0.98512, 1e-4);
  if (!(gm > 33 && roce > 18 && at < 1)) throw new Error("targets text no longer matches");
  const tbl = table(["US\\$", "Amount"], [["Revenue", R.rev], ["Cost of sales", R.cos], ["Expenses", R.exp], ["Issued shares", R.sh], ["Reserves", R.res], ["Non-current liabilities", R.ncl], ["Current assets (including inventories of 53,400)", R.ca], ["Current liabilities", R.cl]]);
  b.struct({
    d: 3, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZIM, calculator: true,
    paper: "ZIMSEC Business Studies Paper 1",
    concepts: [C("ratios.profitability"), C("ratios.liquidity")],
    stem: `Gokwe Hardware Ltd is a fictional company. Its figures for the year ended 31 December 2025 are shown. The company's own targets are a gross profit margin of at least 33%, ROCE of at least 18% and an acid test ratio of at least 1 : 1.\n\n${tbl}`,
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: gm, wrong: [r2((R.cos / R.rev) * 100), r2((gp / R.cos) * 100)], stem: "Calculate the gross profit margin, to one decimal place.", explanation: `Gross profit = 531,400 − 345,300 = 186,100. Margin = 186,100 ÷ 531,400 × 100 = ${gm.toFixed(1)}%.` }),
      P.num({ label: "(b)", marks: 3, kind: "pct", value: roce, type: "CALCULATION", wrong: [r2((op / (R.sh + R.res)) * 100), r2((gp / ce) * 100)], stem: "Calculate the return on capital employed (profit from operations ÷ capital employed × 100), to one decimal place.", explanation: `Profit from operations = 186,100 − 118,700 = 67,400. Capital employed = 148,000 + 112,500 + 61,000 = 321,500. ROCE = 67,400 ÷ 321,500 × 100 = ${roce.toFixed(1)}%.`, workedSolution: `1. Profit from operations = 186,100 − 118,700 = 67,400.\n2. Capital employed = 148,000 + 112,500 + 61,000 = 321,500.\n3. ROCE = 67,400 ÷ 321,500 × 100 = ${roce.toFixed(1)}%.` }),
      P.group({ label: "(c)", stem: "Liquidity:", parts: [
        P.num({ label: "(i)", marks: 2, kind: "ratio", value: at, wrong: [r2(R.ca / R.cl), r2(R.inv / R.cl)], stem: "Calculate the acid test ratio, as x : 1 to two decimal places.", explanation: `(119,600 − 53,400) ÷ 67,200 = 66,200 ÷ 67,200 = ${at.toFixed(2)}, so ${at.toFixed(2)} : 1.` }),
        P.manual({ label: "(ii)", marks: 3, stem: "Discuss whether the company has met its three targets.", points: [`Gross profit margin of ${gm.toFixed(1)}% is above the target of 33%`, `ROCE of ${roce.toFixed(1)}% is above the target of 18%`, `The acid test of ${at.toFixed(2)} : 1 is just below the target of 1 : 1, so the liquidity target is narrowly missed`], modelAnswer: `The gross profit margin of ${gm.toFixed(1)}% is above the target of 33% and the ROCE of ${roce.toFixed(1)}% is above the target of 18%. The acid test ratio of ${at.toFixed(2)} : 1 is just below the target of 1 : 1, so two targets are met but the liquidity target is narrowly missed and needs watching.`, explanation: "Compare each result with its target." }),
      ] }),
    ]),
    hints: ["Capital employed = shares + reserves + non-current liabilities.", "The acid test removes inventories."],
    explanation: `Gross margin ${gm.toFixed(1)}%; ROCE ${roce.toFixed(1)}%; acid test ${at.toFixed(2)} : 1; two targets met and liquidity narrowly missed.`,
  });

  // 3. Statement of cash flows (Business Studies only)
  const op3 = 31500 + 9200 - 4100 - 2600 + 1900 - 5400, net3 = op3 - 22000 + 10000 - 6500, close3 = 4800 + net3;
  chk(op3, 30500); chk(net3, 12000); chk(close3, 16800);
  const tbl3 = table(["US\\$", "Amount"], [["Profit before tax", 31500], ["Depreciation", 9200], ["Increase in inventories", 4100], ["Increase in trade receivables", 2600], ["Increase in trade payables", 1900], ["Tax paid", 5400], ["Purchase of a poultry house", 22000], ["New bank loan received", 10000], ["Dividends paid", 6500], ["Cash at the start of the year", 4800]]);
  b.struct({
    d: 4, examStyle: true, skill: EXAM.ZIM_STRUCT10.skill, secs: EXAM.ZIM_STRUCT10.secs, applies: ZBS, calculator: true,
    paper: "ZIMSEC Business Studies Paper 1",
    concepts: [C("accounts.cash-flow-statement")],
    stem: `Lupane Poultry Ltd is a fictional company. The company paid no interest during the year. Data for its statement of cash flows for the year ended 30 June 2026 are given below.\n\n${tbl3}`,
    parts: checkExam(EXAM.ZIM_STRUCT10, [
      P.num({ label: "(a)", marks: 4, kind: "money", value: op3, type: "CALCULATION", wrong: [31500 + 9200, 31500 + 9200 + 4100 + 2600 - 1900 - 5400], stem: "Using the indirect method, calculate the net cash from operating activities.", explanation: "31,500 + 9,200 − 4,100 − 2,600 + 1,900 − 5,400 = US\\$30,500.", workedSolution: "1. 31,500 + 9,200 = 40,700.\n2. 40,700 − 4,100 − 2,600 + 1,900 = 35,900.\n3. 35,900 − 5,400 tax = 30,500." }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: close3, wrong: [net3, 4800 + op3], stem: "Calculate the cash at the end of the year.", explanation: "Investing = −22,000. Financing = +10,000 − 6,500 = +3,500. Net change = 30,500 − 22,000 + 3,500 = 12,000. Closing cash = 4,800 + 12,000 = US\\$16,800." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the cash from operating activities is greater than the profit after tax.", points: ["Depreciation of US\\$9,200 was deducted in arriving at profit but no cash was paid", "So it is added back when finding the cash flow", "The increase in trade payables means that some costs have not yet been paid"], modelAnswer: "Depreciation of US\\$9,200 was deducted in arriving at profit but no cash was paid, so it is added back. In addition, the increase in trade payables means that some costs have not yet been paid in cash.", explanation: "Non-cash expense and credit from suppliers." }),
    ]),
    hints: ["An increase in inventories or receivables reduces cash.", "Dividends paid and a new loan are financing flows."],
    explanation: "Operating cash US\\$30,500; closing cash US\\$16,800; depreciation is a non-cash expense.",
  });
});
