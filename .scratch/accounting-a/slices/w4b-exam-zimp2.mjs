// W4b exam-format items: ZIMSEC Paper 2 (ZIM_P2_STRUCT, 25 marks): (1) cash budget; (2) standard cost variances and reconciliation.
import { concept, P, EXAM, checkExam, ZIM, chk, r2, sum, table, variances } from "../lib.mjs";
import { F, usd } from "../tables/w4b-lib.mjs";

concept("aacc.budget.cash-budget", { file: "exam/w4b-zimp2", keyPrefix: "exam.w4b-zimp2", applies: ZIM }, (b) => {
  const Z = EXAM.ZIM_P2_STRUCT;

  // ===================================================================================================
  // Item 1: Mapfumo Wholesalers, Gweru: cash budget for May to July
  {
    const sales = { Apr: 41500, May: 45500, Jun: 49000, Jul: 53500 };
    const pur = { Apr: 23500, May: 27000, Jun: 29500 };
    const cashPct = 0.4, wages = 5200, rent = 2400, gen = 1850, dep = 1300, draw = 2500, van = 14200, loanRep = 11500, open = 4150;
    const months = ["May", "June", "July"];
    const recCash = [sales.May, sales.Jun, sales.Jul].map((s) => cashPct * s);
    const recCred = [sales.Apr, sales.May, sales.Jun].map((s) => (1 - cashPct) * s);
    const rec = recCash.map((c, i) => c + recCred[i]);
    const purPay = [pur.Apr, pur.May, pur.Jun];
    const other = wages + rent + gen + draw;
    const vanA = [0, van, 0], loanA = [0, loanRep, 0];
    const pay = purPay.map((p, i) => p + other + vanA[i] + loanA[i]);
    const net = rec.map((r, i) => r - pay[i]);
    const bal = [];
    let c = open;
    net.forEach((n) => { c += n; bal.push(c); });
    chk(rec[0], 43100); chk(rec[1], 46900); chk(rec[2], 50800);
    chk(pay[1], 64650); chk(bal[0], 11800); chk(bal[1], -5950); chk(bal[2], 3400);
    const fm = (x) => (x < 0 ? `(${F(-x)})` : F(x));
    const L = (label, arr) => [label, ...arr.map((x) => (x === 0 ? "-" : F(x))), F(sum(arr))];
    const model = table(["Cash budget (US\\$)", ...months, "Total"], [
      L("Cash sales (40%)", recCash), L("Debtors paying (60% of previous month)", recCred),
      ["**Total receipts**", ...rec.map((x) => `**${F(x)}**`), `**${F(sum(rec))}**`],
      L("Creditors paid (previous month's purchases)", purPay), L("Wages", [wages, wages, wages]), L("Rent", [rent, rent, rent]), L("General expenses", [gen, gen, gen]), L("Drawings", [draw, draw, draw]),
      L("Delivery van", vanA), L("Loan repayment", loanA),
      ["**Total payments**", ...pay.map((x) => `**${F(x)}**`), `**${F(sum(pay))}**`],
      ["**Net cash flow**", ...net.map((x) => `**${fm(x)}**`), `**${fm(sum(net))}**`],
      ["Opening bank balance", fm(open), fm(bal[0]), fm(bal[1]), fm(open)],
      ["**Closing bank balance**", ...bal.map((x) => `**${fm(x)}**`), `**${fm(bal[2])}**`],
    ]);
    b.struct({
      d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.budget.cash-budget", "aacc.budget.operating-budgets"],
      stem: `Mapfumo Wholesalers in Gweru is preparing its cash budget for May, June and July.\n\n${table(["Month", "Sales US\\$", "Purchases US\\$"], [["April", sales.Apr, pur.Apr], ["May", sales.May, pur.May], ["June", sales.Jun, pur.Jun], ["July", sales.Jul, "-"]])}\n\n- 40% of sales are for cash. The other 60% are on credit and debtors pay in the month after the sale.\n- Purchases are on credit and creditors are paid in the month after the purchase.\n- Wages ${usd(wages)}, rent ${usd(rent)} and general expenses ${usd(gen)} are paid in cash each month. Depreciation of ${usd(dep)} a month is included in the general ledger expenses.\n- Drawings are ${usd(draw)} a month.\n- A delivery van costing ${usd(van)} will be bought and paid for in June.\n- A loan repayment of ${usd(loanRep)} will be made in June.\n- The bank balance on 1 May is ${usd(open)}.`,
      parts: checkExam(Z, [
        P.manual({ label: "(a)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Prepare the cash budget for May, June and July.", points: ["Heading and a column for each month", `Cash sales ${F(recCash[0])}, ${F(recCash[1])}, ${F(recCash[2])}`, `Debtors' receipts ${F(recCred[0])}, ${F(recCred[1])}, ${F(recCred[2])} (previous month's credit sales)`, `Creditors paid: previous month's purchases (${purPay.map(F).join("; ")})`, "Wages, rent, general expenses and drawings each month, with depreciation excluded", "Van and loan repayment shown in June", "Net cash flow and opening and closing balances carried forward correctly"], modelAnswer: model, explanation: "One mark for each group of lines. Depreciation must not appear in the cash budget." }),
        P.group({ label: "(b)", stem: "Calculate the bank balance at the end of:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: bal[0], wrong: [bal[0] - open, r2(bal[0] + dep)], stem: "May", explanation: `${F(open)} + receipts ${F(rec[0])} - payments ${F(pay[0])} = ${usd(bal[0])}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: Math.abs(bal[1]), wrong: [Math.abs(net[1]), bal[0]], stem: "June (the amount of any overdraft; amount only)", explanation: `${F(bal[0])} + ${F(rec[1])} - ${F(pay[1])} = -${F(Math.abs(bal[1]))}: an overdraft of ${usd(Math.abs(bal[1]))}.` }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: bal[2], wrong: [net[2], r2(bal[2] + dep * 3)], stem: "July", explanation: `-${F(Math.abs(bal[1]))} + ${F(rec[2])} - ${F(pay[2])} = ${usd(bal[2])}.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: rec[1], wrong: [sales.Jun, recCash[1]], stem: "the cash received from customers in June", explanation: `Cash sales 40% × ${F(sales.Jun)} = ${F(recCash[1])}; May credit sales 60% × ${F(sales.May)} = ${F(recCred[1])}; total ${usd(rec[1])}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: pay[2], wrong: [r2(pay[2] + dep), purPay[2]], stem: "the total payments in July", explanation: `Creditors ${F(purPay[2])} + wages ${F(wages)} + rent ${F(rent)} + general expenses ${F(gen)} + drawings ${F(draw)} = ${usd(pay[2])}.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: sum(rec), wrong: [sum(rec) - recCred[0], sales.May + sales.Jun + sales.Jul], stem: "Calculate the total cash received from customers in the three months.", explanation: `${F(rec[0])} + ${F(rec[1])} + ${F(rec[2])} = ${usd(sum(rec))}.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which item is NOT included in the cash budget?", options: [["Depreciation of US\\$1,300 a month", "Correct: no cash is paid."], ["The loan repayment of US\\$11,500 in June", "Cash is paid in June."], ["The drawings", "Cash is taken out each month."], ["The delivery van", "Cash is paid in June."]], answer: "A", explanation: "Depreciation is a non-cash expense." }),
        P.manual({ label: "(f)", marks: 4, stem: "The owner will ask the bank for an overdraft for June. Advise Mapfumo Wholesalers on how it could reduce or avoid the overdraft.", points: [`The overdraft of ${usd(Math.abs(bal[1]))} arises in June because the van and the loan repayment fall in the same month`, "Delay the van or the loan repayment, or buy the van on instalments or lease it", "Reduce drawings or ask debtors to pay sooner (discounts) or creditors for longer credit", "The overdraft is short, as July restores a positive balance, so a short-term overdraft arranged in advance is a reasonable option"], modelAnswer: `The overdraft of ${usd(Math.abs(bal[1]))} arises because the van and the loan repayment both fall in June. The business could delay one of them, lease the van, reduce drawings or collect from debtors sooner. As July returns to a positive balance, a short overdraft arranged in advance is also reasonable.`, explanation: "One mark for each point." }),
      ]),
      hints: ["Debtors pay a month later; creditors are paid a month later.", "Leave depreciation out.", "Carry each closing balance forward."],
      explanation: "This ZIMSEC Paper 2 style question prepares a three-month cash budget, calculates balances and gives advice on an overdraft.",
    });
  }

  // ===================================================================================================
  // Item 2: Chipo Garments, Mutare: standard cost variances
  {
    const price = 18.5, mQ = 1.6, mP = 4.25, lH = 0.75, lR = 4.8, bu = 3100, fixB = 9600;
    const au = 3250, ap = 18.2, mQa = 5400, mCost = 23490, lHa = 2520, lCost = 12474, fixA = 9900;
    const contr = r2(price - (mQ * mP + lH * lR));
    chk(contr, 8.1);
    const budP = r2(bu * contr - fixB);
    const rev = r2(au * ap), actP = r2(rev - mCost - lCost - fixA);
    chk(budP, 15510); chk(actP, 13286);
    const mPa = mCost / mQa, lRa = lCost / lHa;
    chk(mPa, 4.35, 1e-9); chk(lRa, 4.95, 1e-9);
    const sv = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: contr });
    const sp = variances.salesPrice({ stdPrice: price, actualPrice: ap, actualUnits: au });
    const mp = variances.materialPrice({ stdPrice: mP, actualPrice: mPa, actualQty: mQa });
    const mu = variances.materialUsage({ stdQtyForActualOutput: mQ * au, actualQty: mQa, stdPrice: mP });
    const lr = variances.labourRate({ stdRate: lR, actualRate: lRa, actualHours: lHa });
    const le = variances.labourEfficiency({ stdHoursForActualOutput: lH * au, actualHours: lHa, stdRate: lR });
    const fx = r2(fixB - fixA);
    chk(sv.value, 1215); chk(sp.value, -975); chk(mp.value, -540); chk(mu.value, -850); chk(lr.value, -378); chk(le.value, -396); chk(fx, -300);
    const net = r2(sv.value + sp.value + mp.value + mu.value + lr.value + le.value + fx);
    chk(budP + net, actP);
    const adverse = r2(sp.amount + mp.amount + mu.amount + lr.amount + le.amount + Math.abs(fx));
    const model = table(["Reconciliation of budgeted and actual profit", "Favourable US\\$", "Adverse US\\$", "US\\$"], [
      ["Budgeted profit", "", "", budP], ["Sales volume variance", sv.amount, "", ""], ["Sales price variance", "", sp.amount, ""], ["Material price variance", "", mp.amount, ""], ["Material usage variance", "", mu.amount, ""],
      ["Labour rate variance", "", lr.amount, ""], ["Labour efficiency variance", "", le.amount, ""], ["Fixed costs spent over budget", "", Math.abs(fx), ""],
      ["Net variance (adverse)", sv.amount, adverse, net], ["**Actual profit**", "", "", `**${F(actP)}**`],
    ], ["l", "r", "r", "r"]);
    b.struct({
      d: 5, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.cost.variances-direct", "aacc.cost.variances-sales", "aacc.cost.variances-analysis", "aacc.cost.standards-basics"],
      stem: `Chipo Garments in Mutare makes school shirts. The standard cost and selling price of one shirt, and the budget for the month, are:\n\n${table(["Standard for one shirt", "US\\$"], [["Cloth: 1.6 metres at US\\$4.25 a metre", 6.8], ["Labour: 0.75 hours at US\\$4.80 an hour", 3.6], ["Selling price", price]], ["l", "r"])}\n\nBudget: ${F(bu)} shirts sold and fixed costs of ${usd(fixB)}. Fixed costs are not absorbed into the standard cost.\n\nActual results for the month:\n\n${table(["Actual", "Amount"], [["Shirts made and sold", F(au)], ["Average selling price", usd(ap)], ["Cloth used", `${F(mQa)} metres, cost ${usd(mCost)}`], ["Labour", `${F(lHa)} hours, cost ${usd(lCost)}`], ["Fixed costs", usd(fixA)]], ["l", "r"])}\n\nUse the contribution per shirt for the sales volume variance. Label every variance F (favourable) or A (adverse).`,
      parts: checkExam(Z, [
        P.group({ label: "(a)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: contr, dp: 2, wrong: [price - 6.8, price - 3.6], stem: "the standard contribution per shirt", explanation: `18.50 - 6.80 - 3.60 = ${usd(contr)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: budP, wrong: [bu * contr, r2(bu * price - fixB)], stem: "the budgeted profit", explanation: `${F(bu)} × 8.10 = ${F(bu * contr)}; less fixed costs ${F(fixB)} = ${usd(budP)}.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate the following variances (amount only; you will state F or A in part (e)):", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: mp.amount, wrong: [mu.amount, 0.1], stem: "the cloth price variance", explanation: `Actual price = ${F(mCost)} ÷ ${F(mQa)} = US\\$4.35. (4.25 - 4.35) × ${F(mQa)} = ${usd(mp.amount)} A.` }),
          P.num({ label: "(ii)", marks: 3, kind: "money", value: mu.amount, wrong: [r2((mQa - mQ * bu) * mP), r2((mQ * au - mQa) * mPa)], stem: "the cloth usage variance", explanation: `Standard cloth = ${F(au)} × 1.6 = ${F(mQ * au)} metres. Used ${F(mQa)}, 200 too many. 200 × US\\$4.25 = ${usd(mu.amount)} A.` }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: lr.amount, wrong: [le.amount, 0.15], stem: "the labour rate variance", explanation: `Actual rate = ${F(lCost)} ÷ ${F(lHa)} = US\\$4.95. (4.80 - 4.95) × ${F(lHa)} = ${usd(lr.amount)} A.` }),
          P.num({ label: "(iv)", marks: 3, kind: "money", value: le.amount, wrong: [r2((lH * au - lHa) * lRa), lr.amount], stem: "the labour efficiency variance", explanation: `Standard hours = ${F(au)} × 0.75 = ${F(lH * au)}. Worked ${F(lHa)}, which is 82.5 hours more. 82.5 × US\\$4.80 = ${usd(le.amount)} A.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: sp.amount, wrong: [r2(0.3 * bu), sv.amount], stem: "the sales price variance (amount only)", explanation: `(18.20 - 18.50) × ${F(au)} = ${usd(sp.amount)} A.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: sv.amount, wrong: [r2(150 * price), sp.amount], stem: "the sales volume variance (amount only)", explanation: `(${F(au)} - ${F(bu)}) × 8.10 = ${usd(sv.amount)} F.` }),
        ] }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare a reconciliation of budgeted profit and actual profit, showing each variance as favourable or adverse.", points: [`Budgeted profit ${usd(budP)}`, `Sales volume ${usd(sv.amount)} F and sales price ${usd(sp.amount)} A`, "Material price US\\$540 A and usage US\\$850 A", "Labour rate US\\$378 A, labour efficiency US\\$396 A and fixed costs US\\$300 A", "Actual profit of US\\$13,286 agreeing with the actual figures"], modelAnswer: model, explanation: "One mark for each group of lines. Actual profit = 59,150 - 23,490 - 12,474 - 9,900 = 13,286." }),
        P.manual({ label: "(e)", marks: 2, stem: "State whether the two labour variances are favourable or adverse, and suggest one likely cause for them.", points: ["Both labour variances are adverse", "A realistic cause: overtime or a wage rise (rate); untrained workers, poor cloth or machine breakdowns (efficiency)"], modelAnswer: "Both labour variances are adverse. The rate variance may come from overtime or a wage rise, and the efficiency variance from untrained workers, poor cloth or machine breakdowns.", explanation: "One mark for each point." }),
      ]),
      hints: ["Standard quantity and hours are for the actual output of 3,250 shirts.", "Actual price = cost ÷ quantity.", "The reconciliation must end at the actual profit."],
      explanation: "This ZIMSEC Paper 2 style question calculates the direct and sales variances and reconciles budgeted profit with actual profit.",
    });
  }
});
