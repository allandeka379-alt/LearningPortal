// W3a: company.cash-flow-statement
import { concept, P, table, check, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc, grid, heading } from "../tables/w3a-lib.mjs";
import { cfModel } from "../tables/w3a-models.mjs";

concept("aacc.company.cash-flow-statement", { file: "company/cash-flow-statement", keyPrefix: "company.cash-flow-statement" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In which section of the statement of cash flows is the purchase of a new delivery vehicle shown?",
    ok: ["Investing activities", "Correct: buying non-current assets is investing."],
    bad: [["Operating activities", "Operating activities arise from the normal trading of the business."], ["Financing activities", "Financing relates to shares, loans and dividends."], ["It is not shown, because it is not an expense", "All cash flows are shown, whether or not they are expenses."]],
    explanation: "Purchases of property, plant and equipment are cash outflows from investing activities.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Dividends paid to shareholders are shown in the statement of cash flows under:",
    ok: ["financing activities", "Correct: they are a return to the providers of finance."],
    bad: [["operating activities", "Dividends are not part of operating cash flow in this syllabus."], ["investing activities", "Dividends paid are not an investment."], ["cash generated from operations", "Dividends are not deducted in arriving at operating cash."]],
    explanation: "Dividends paid are a financing outflow. Dividends received on investments are an investing inflow.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "A company issues ordinary shares of US\\$1 for cash at a premium. What is shown in financing activities?",
    ok: ["The total cash received, including the premium", "Correct: the premium is also cash from shareholders."],
    bad: [["The nominal value only", "The premium is also received in cash."], ["The premium only", "The nominal value is also received."], ["Nothing, because shares are not a cash flow", "A share issue for cash is a financing inflow."]],
    explanation: "Proceeds of a share issue are nominal value plus premium.",
  });
  const oc = 210800, cc = 262300, dc = 25400;
  const buy = r2(cc - oc + dc);
  chk(buy, 76900);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `The cost of property, plant and equipment was ${money(oc)} at the start of the year and ${money(cc)} at the end. Equipment which cost ${money(dc)} was sold during the year. What was the cash paid for new property, plant and equipment, assuming all purchases were for cash?`,
    ok: [money(buy), "Correct: 262,300 - 210,800 + 25,400."],
    bad: [[money(r2(cc - oc)), "The cost of the equipment sold was not added back."], [money(r2(cc - oc - dc)), "The cost of the equipment sold was deducted a second time."], [money(r2(cc + dc)), "The opening cost was ignored."]],
    hints: ["Closing cost = opening cost + purchases - cost of disposals."],
    explanation: "Purchases = 262,300 - 210,800 + 25,400 = 76,900.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "How is a bank overdraft that is repayable on demand treated in the statement of cash flows?",
    ok: ["As a negative part of cash and equivalents", "Correct: it is netted with cash and bank."],
    bad: [["As an inflow from financing activities", "An overdraft is part of cash equivalents."], ["As an expense of the operating activities", "The overdraft balance is not an expense."], ["As an outflow from investing activities", "It has nothing to do with investing."]],
    hints: ["Which total does the statement reconcile?"],
    explanation: "Under IAS 7 an overdraft repayable on demand forms part of cash and cash equivalents.",
  });
  const op = 41300, inv = -52600, fin = 18200;
  const net = r2(op + inv + fin);
  chk(net, 6900);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Net cash from operating activities was ${money(op)}, net cash used in investing activities ${money(52600)} and net cash from financing activities ${money(fin)}. What was the net change in cash and cash equivalents?`,
    ok: ["An increase of US\\$6,900", "Correct: 41,300 - 52,600 + 18,200."],
    bad: [["A decrease of US\\$6,900", "The signs of the three totals have been reversed."], ["An increase of US\\$11,300", "The investing outflow was added the wrong way."], ["A decrease of US\\$29,500", "The financing inflow was deducted."]],
    hints: ["Add the three net totals, with the investing total negative."],
    explanation: "41,300 + (52,600 outflow) + 18,200 = an increase of 6,900.",
  });
  mc(b, {
    d: 4, skill: "APPLICATION", calculator: true,
    stem: "A company issued 36,000 ordinary shares of US\\$1 at US\\$1.60 each. It also repaid loan notes of US\\$25,000 at par. What is the net cash flow from these two financing items?",
    ok: ["An inflow of US\\$32,600", "Correct: 57,600 received less 25,000 repaid."],
    bad: [["An inflow of US\\$57,600", "The cash paid to repay the loan notes has been ignored."], ["An inflow of US\\$36,000", "Only the nominal value of the new shares has been counted."], ["An outflow of US\\$25,000", "The cash received from the new issue has been ignored."]],
    hints: ["Work out the inflow and the outflow separately."],
    explanation: "Received 36,000 × 1.60 = 57,600; repaid 25,000; net inflow 32,600.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Which statement about the statement of cash flows of a sole proprietor is correct?",
    ok: ["Drawings are shown in financing activities and there is no tax", "Correct: the owner's withdrawals replace dividends."],
    bad: [["Drawings are deducted in operating activities", "Drawings are withdrawals of capital, not operating costs."], ["Income tax paid is shown in operating activities", "A sole proprietor's business pays no income tax."], ["There is no financing section", "Loans and drawings are financing items."]],
    hints: ["What replaces dividends for a sole proprietor?"],
    explanation: "A sole proprietor's business has no income tax and no dividends; drawings and capital introduced are financing flows.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Interest received is shown in investing activities.", answer: true, explanation: "True. Interest and dividends received are returns on investments and are shown as investing inflows." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "The closing figure in the statement of cash flows must equal the bank and cash balances in the closing statement of financial position, taking account of any overdraft.", answer: true, hints: ["What does the statement reconcile?"], explanation: "True. The statement explains the change in cash and cash equivalents, so the closing figure must agree with the statement of financial position." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each cash flow to its section of the statement of cash flows.",
    pairs: ["Proceeds of sale of a machine", "Repayment of loan notes", "Income tax paid", "Dividends paid"],
    right: ["Investing activities", "Financing activities", "Operating activities (below cash generated)", "Financing activities (equity holders)"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Sale of assets is investing; loan repayment and dividends are financing; tax paid is deducted in operating activities.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the statement.",
    template: "Net cash from operating, investing and financing activities gives the net {{blank:a}} in cash and cash equivalents. Adding the {{blank:b}} balance gives the closing balance.",
    blanks: [
      { id: "a", accepted: ["change"], choices: ["change", "profit", "capital"] },
      { id: "b", accepted: ["opening"], choices: ["opening", "closing"] },
    ],
    explanation: "The three net totals give the net change, which is added to the opening balance to find the closing balance.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State the section of the statement of cash flows in which interest paid on loan notes is deducted (under the syllabus convention used in this course).",
    accepted: ["operating activities", "operating", "net cash from operating activities", "operations"],
    explanation: "Interest paid and tax paid are deducted after cash generated from operations in operating activities.",
  });

  // numerical
  const ro = 18900, rc2 = 29450, prof = 21200;
  const dv = r2(ro + prof - rc2);
  chk(dv, 10650);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: dv, calculator: true, wrong: [r2(rc2 - ro), r2(prof - (rc2 - ro) + 1000)],
    stem: `Retained earnings were ${money(ro)} at the start of the year and ${money(rc2)} at the end. The profit for the year was ${money(prof)}. There were no transfers to other reserves. Calculate the dividends paid in the year (no dividends were payable at either date).`,
    hints: ["Opening + profit - dividends = closing."],
    explanation: "Dividends = 18,900 + 21,200 - 29,450 = 10,650.",
  });
  const t0 = 4600, t1 = 5300, tch = 12700;
  const tpaid = r2(t0 + tch - t1);
  chk(tpaid, 12000);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: tpaid, calculator: true, wrong: [tch, r2(t0 + tch + t1)],
    stem: `Income tax payable was ${money(t0)} at the start of the year and ${money(t1)} at the end. The income tax charge in the statement of profit or loss was ${money(tch)}. Calculate the tax paid shown in the statement of cash flows.`,
    hints: ["Build the tax payable account: opening + charge - paid = closing."],
    explanation: "Tax paid = 4,600 + 12,700 - 5,300 = 12,000. Using the charge gives 12,700.",
  });
  const cb = r2(8750 + 26400 - 37900 + 13150);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: cb, calculator: true, wrong: [r2(8750 + 26400 + 37900 + 13150), r2(8750 - 26400 + 37900 - 13150)],
    stem: `Cash and cash equivalents were ${money(8750)} at the start of the year. Net cash from operating activities was ${money(26400)}, net cash used in investing activities ${money(37900)} and net cash from financing activities ${money(13150)}. Calculate the cash and cash equivalents at the end of the year.`,
    explanation: "8,750 + 26,400 - 37,900 + 13,150 = 10,400.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two reasons why a business that makes a profit may still have a net decrease in cash.",
    points: ["Cash was spent on non-current assets, loan repayments, tax or dividends, which do not reduce profit before tax", "Profit was tied up in higher inventory and trade receivables"],
    modelAnswer: "Cash may be spent on new assets, loans, tax and dividends. Profit may also be tied up in inventory and receivables.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the cash flow statement is useful to the bank manager who is considering a loan to a company.",
    points: ["It shows whether operations generate enough cash to pay interest and repay a loan", "It shows how the company finances investment, from operating cash or from borrowing", "Unlike profit, cash flows cannot be affected by accounting policies such as depreciation"],
    modelAnswer: "The bank manager can see whether the operations produce enough cash to pay interest and repay a loan. The statement also shows how investment is financed, and cash is less open to accounting choices than profit.",
    hints: ["Which of the three sections matters most to a lender?"],
    explanation: "One mark each for servicing the loan, the source of finance and reliability of cash.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A company had net cash from operating activities of US\\$18,000, net cash used in investing activities of US\\$55,000 and net cash from financing activities of US\\$41,000. Evaluate its position and advise the directors.",
    points: ["Operating cash is positive but small compared with the US\\$55,000 spent on investing, so the investment is mostly financed from outside", "Financing of US\\$41,000 (loans or shares) covers the gap, which increases the company's debt or ownership", "The investment may raise future operating cash, which would make the position acceptable", "Advice: check the return on the new assets, and keep borrowing at a level that operating cash can service"],
    modelAnswer: "Operating cash of US\\$18,000 pays for only a third of the US\\$55,000 investment, so the company depends on US\\$41,000 of new finance. That is acceptable only if the new assets raise operating cash. The directors should check the returns and avoid excessive borrowing.",
    hints: ["Compare operating cash with the investing outflow."],
    explanation: "One mark each for the comparison, the reliance on financing, a balancing point and advice.",
  });

  // Structured 1 (12 marks): sole proprietor
  const S = { cost: 64000, acc: 22800, inv: 7500, rec: 5200, bank: 3100, pay: 6900, loan: 15000 };
  const Y = { profit: 18400, dep: 5200, intr: 1350, drawings: 11200, add: 12500, dInv: -800, dRec: 1600, dPay: 900, repay: 3000 };
  const sBw = r2(Y.profit + Y.dep + Y.intr);
  const sWc = r2(-Y.dInv - Y.dRec + Y.dPay);
  const sCg = r2(sBw + sWc);
  const sOp = r2(sCg - Y.intr);
  const sFin = r2(-Y.repay - Y.drawings);
  const sNet = r2(sOp - Y.add + sFin);
  const sClose = r2(S.bank + sNet);
  const capO = r2(S.cost - S.acc + S.inv + S.rec + S.bank - S.pay - S.loan);
  const capC = r2(capO + Y.profit - Y.drawings);
  const nbvC = r2(S.cost + Y.add - S.acc - Y.dep);
  check("sole trader A closes", nbvC + (S.inv + Y.dInv) + (S.rec + Y.dRec) + sClose - (S.pay + Y.dPay) - (S.loan - Y.repay), capC);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Chipo Ncube runs a bakery in Chinhoyi as a sole proprietor. At 1 January 2025 she had: property, plant and equipment at cost US\\$${fmt(S.cost)} with accumulated depreciation US\\$${fmt(S.acc)}; inventory US\\$${fmt(S.inv)}; trade receivables US\\$${fmt(S.rec)}; bank US\\$${fmt(S.bank)}; trade payables US\\$${fmt(S.pay)}; a loan US\\$${fmt(S.loan)}. In 2025 her net profit was US\\$${fmt(Y.profit)} after charging depreciation of US\\$${fmt(Y.dep)} and loan interest of US\\$${fmt(Y.intr)} (paid in full). She bought equipment for US\\$${fmt(Y.add)} cash, repaid US\\$${fmt(Y.repay)} of the loan and withdrew US\\$${fmt(Y.drawings)}. Inventory fell by US\\$${fmt(-Y.dInv)}, trade receivables rose by US\\$${fmt(Y.dRec)} and trade payables rose by US\\$${fmt(Y.dPay)}.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: sCg, wrong: [sBw, r2(sBw - sWc)], stem: "Calculate the cash generated from operations.", explanation: `${fmt(Y.profit)} + ${fmt(Y.dep)} + ${fmt(Y.intr)} = ${fmt(sBw)}; working capital +${fmt(-Y.dInv)} - ${fmt(Y.dRec)} + ${fmt(Y.dPay)} = ${fmt(sWc)}; total ${fmt(sCg)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: sOp, wrong: [sCg, r2(sCg + Y.intr)], stem: "Calculate the net cash from operating activities.", explanation: `${fmt(sCg)} - interest paid ${fmt(Y.intr)} = ${fmt(sOp)}. A sole proprietor pays no income tax.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: sFin, wrong: [-Y.repay, r2(-Y.drawings)], stem: "Calculate the net cash used in financing activities. Enter an outflow as a negative number.", explanation: `Loan repayment ${fmt(Y.repay)} + drawings ${fmt(Y.drawings)} = ${fmt(-sFin)} outflow.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: sClose, wrong: [r2(S.bank + sOp), r2(sNet)], stem: "Calculate the cash and cash equivalents at 31 December 2025.", explanation: `${fmt(S.bank)} + ${fmt(sOp)} - ${fmt(Y.add)} + (${fmt(sFin)}) = ${fmt(sClose)}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "Explain why drawings are shown in financing activities and not in operating activities.", points: ["Drawings are withdrawals of capital by the owner, not a cost of running the business", "They are a payment to the provider of finance, like a dividend to shareholders"], modelAnswer: "Drawings are the owner taking back capital, not an expense of trading. They are a return to the provider of finance, so they belong in financing.", explanation: "One mark for each reason." }),
    ],
    hints: ["Add back the interest, then deduct it as interest paid.", "No tax is paid by a sole proprietor."],
    explanation: "This item tests a sole proprietor's statement of cash flows.",
  });

  // Structured 2 (16 marks): company
  const dB = {
    name: "Hwange Stone Ltd",
    open: { cost: 260000, accDep: 91000, inv: 32400, rec: 27600, bank: 14200, pay: 21800, taxPay: 8150, sc: 100000, prem: 14200, loan: 70000 },
    y: { pbt: 61800, intExp: 6300, dep: 22400, disp: { cost: 34000, accDep: 27600, proceeds: 4300 }, add: 56500, dInv: -2900, dRec: 6200, dPay: -2100, tax: 16100, taxPaid: 14700, divPaid: 11500, issue: { nominal: 25000, premium: 10000 }, loanChange: 16500 },
  };
  const mB = cfModel(dB);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `The statements of financial position of Hwange Stone Ltd at 31 December 2024 and 31 December 2025 are below.\n\n${mB.sofpOpen}\n\n${mB.sofpClose}\n\nFurther information.\n\n- Property, plant and equipment at cost was US\\$${fmt(dB.open.cost)} at 31 December 2024 and US\\$${fmt(mB.c.cost)} at 31 December 2025.\n- Equipment which cost US\\$${fmt(34000)} and had accumulated depreciation of US\\$${fmt(27600)} was sold for US\\$${fmt(4300)}. Depreciation charged for the year was US\\$${fmt(dB.y.dep)}.\n- Profit before tax was US\\$${fmt(dB.y.pbt)} after finance costs of US\\$${fmt(dB.y.intExp)}, which were paid in full. Income tax paid was US\\$${fmt(dB.y.taxPaid)} and dividends paid US\\$${fmt(dB.y.divPaid)}.\n- Loan notes of US\\$${fmt(dB.y.loanChange)} were issued during the year.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: dB.y.add, wrong: [r2(mB.c.cost - dB.open.cost), r2(dB.y.add - 34000)], stem: "Calculate the cash paid for new property, plant and equipment.", explanation: `${fmt(mB.c.cost)} - ${fmt(dB.open.cost)} + ${fmt(34000)} = ${fmt(dB.y.add)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 35000, wrong: [25000, 10000], stem: "Calculate the cash received from the issue of shares.", explanation: "Share capital rose by 25,000 and share premium by 10,000: total 35,000." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: mB.cashGen, wrong: [mB.beforeWc, r2(mB.cashGen - 2 * Math.abs(mB.wc))], stem: "Calculate the cash generated from operations.", explanation: `Profit before tax ${fmt(dB.y.pbt)} + depreciation ${fmt(dB.y.dep)} + loss on disposal ${fmt(-mB.dispProfit)} + finance costs ${fmt(dB.y.intExp)} = ${fmt(mB.beforeWc)}; working capital ${fmt(mB.wc)}; total ${fmt(mB.cashGen)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: mB.netInv, wrong: [-dB.y.add, r2(-dB.y.add - 4300)], stem: "Calculate the net cash used in investing activities. Enter an outflow as a negative number.", explanation: `${fmt(-dB.y.add)} + proceeds ${fmt(4300)} = ${fmt(mB.netInv)}.` }),
      P.manual({ label: "(e)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the statement of cash flows for the year ended 31 December 2025.", points: ["Operating section: profit before tax adjusted for depreciation, loss on disposal and finance costs", "Working capital changes in the correct direction, cash generated from operations, then interest and tax paid", "Investing section: purchases and proceeds, with the net total", "Financing section: share issue, loan notes issued and dividends paid, with the net total", `Net change ${fmt(mB.net)}, opening cash ${fmt(dB.open.bank)} and closing cash ${fmt(mB.bankClose)} which agrees with the statement of financial position`], modelAnswer: mB.cf, explanation: "One mark for each section; allow follow-through." }),
      P.manual({ label: "(f)", marks: 2, stem: "Comment on how the company financed its purchases of property, plant and equipment.", points: [`Net cash from operating activities was ${fmt(mB.netOp)} against payments of ${fmt(dB.y.add)} for new equipment, so operating cash covered part of the cost`, `The rest came from new shares (${fmt(35000)}) and loan notes (${fmt(dB.y.loanChange)}), so ownership and debt both rose`], modelAnswer: `Operating cash of ${fmt(mB.netOp)} paid for part of the ${fmt(dB.y.add)} of equipment. The company raised ${fmt(35000)} from shares and ${fmt(dB.y.loanChange)} from loan notes for the rest.`, explanation: "One mark for the comparison with figures and one for the sources of finance." }),
    ],
    hints: ["Dividends paid and loan notes issued are in financing.", "Check that the closing cash agrees with the statement of financial position."],
    explanation: "This item tests a full company statement of cash flows from two statements of financial position.",
  });
  chk(mB.netInv, -dB.y.add + 4300);
  void check; void sum; void table; void heading; void grid;

  b.card("DEFINITION", "What are **investing activities**?", "Buying and selling non-current assets and other long-term investments, plus interest and dividends received.");
  b.card("DEFINITION", "What are **financing activities**?", "Cash flows with providers of finance: shares issued, loan notes issued or repaid and dividends paid (drawings for sole proprietors).");
  b.card("FORMULA", "Cash paid for new property, plant and equipment", "Closing cost - opening cost + cost of equipment sold.");
  b.card("FORMULA", "Proceeds of a share issue", "Nominal value + share premium, i.e. the total cash received.");
  b.card("FORMULA", "Closing cash and cash equivalents", "Opening cash and cash equivalents + net cash from operating, investing and financing activities.");
  b.card("FACT", "How is an overdraft treated?", "A bank overdraft repayable on demand is a negative part of cash and cash equivalents, not a financing flow.");
  b.card("FACT", "Sole proprietor's statement of cash flows", "Start from net profit; no income tax or share issues; drawings are a financing outflow.");
  b.card("FORMULA", "Dividends paid", "Opening retained earnings + profit for the year - closing retained earnings (allowing for dividends payable and transfers).");
  b.card("CONCEPT", "Using the statement", "Compare the three sections: is investment financed from operating cash or from borrowing and new shares?");
});

