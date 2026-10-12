// W4b exam-format items: COST25 (25 marks; ZIMSEC Paper 3 cost question and Cambridge Paper 4):
// (1) variances and reconciliation of budgeted to actual profit; (2) sales and fixed overhead variances (Cambridge A Level);
// (3) master budget; (4) flexible budget reconciliation; (5) investment appraisal with NPV and IRR; (6) payback, ARR and a recommendation.
import { concept, P, EXAM, checkExam, CAM, chk, r2, sum, table, variances, costing, invest, ratios } from "../lib.mjs";
import { F, usd } from "../tables/w4b-lib.mjs";
import { masterBudget, masterStatements } from "../tables/w4b-master.mjs";

const p1 = (v) => (Math.round((v + Number.EPSILON) * 10) / 10).toFixed(1);
const p2 = (v) => (Math.round((v + Number.EPSILON) * 100) / 100).toFixed(2);
const PAPER = "ZIMSEC P3 / Cambridge P4";

concept("aacc.cost.variances-analysis", { file: "exam/w4b-cost", keyPrefix: "exam.w4b-cost" }, (b) => {
  const C = EXAM.COST25;

  // ===================================================================================================
  // Item 1: Bulawayo Brick Works, variances and reconciliation
  {
    const price = 52, cQ = 3.2, cP = 7.5, lH = 1.75, lR = 6.4, bu = 1850, fixB = 17400;
    const au = 1950, ap = 50.8, cQa = 6420, cCost = 49434, lHa = 3490, lCost = 23732, fixA = 18050;
    const contr = r2(price - (cQ * cP + lH * lR));
    chk(contr, 16.8);
    const budP = r2(bu * contr - fixB);
    const rev = r2(au * ap), actP = r2(rev - cCost - lCost - fixA);
    chk(budP, 13680); chk(actP, 7844);
    const cPa = cCost / cQa, lRa = lCost / lHa;
    chk(cPa, 7.7, 1e-9); chk(lRa, 6.8, 1e-9);
    const sv = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: contr });
    const sp = variances.salesPrice({ stdPrice: price, actualPrice: ap, actualUnits: au });
    const mp = variances.materialPrice({ stdPrice: cP, actualPrice: cPa, actualQty: cQa });
    const mu = variances.materialUsage({ stdQtyForActualOutput: cQ * au, actualQty: cQa, stdPrice: cP });
    const lr = variances.labourRate({ stdRate: lR, actualRate: lRa, actualHours: lHa });
    const le = variances.labourEfficiency({ stdHoursForActualOutput: lH * au, actualHours: lHa, stdRate: lR });
    const fx = r2(fixB - fixA);
    chk(sv.value, 1680); chk(sp.value, -2340); chk(mp.value, -1284); chk(mu.value, -1350); chk(lr.value, -1396); chk(le.value, -496); chk(fx, -650);
    const net = r2(sv.value + sp.value + mp.value + mu.value + lr.value + le.value + fx);
    chk(budP + net, actP); chk(net, -5836);
    const adverse = r2(sp.amount + mp.amount + mu.amount + lr.amount + le.amount + Math.abs(fx));
    const model = table(["Reconciliation of budgeted and actual profit", "Favourable US\\$", "Adverse US\\$", "US\\$"], [
      ["Budgeted profit", "", "", budP], ["Sales volume variance", sv.amount, "", ""], ["Sales price variance", "", sp.amount, ""], ["Material price variance", "", mp.amount, ""], ["Material usage variance", "", mu.amount, ""],
      ["Labour rate variance", "", lr.amount, ""], ["Labour efficiency variance", "", le.amount, ""], ["Fixed costs over budget", "", Math.abs(fx), ""],
      ["Net variance (adverse)", sv.amount, adverse, net], ["**Actual profit**", "", "", `**${F(actP)}**`],
    ], ["l", "r", "r", "r"]);
    b.struct({
      d: 5, examStyle: true, skill: C.skill, secs: C.secs, calculator: true,
      paper: PAPER, concepts: ["aacc.cost.variances-direct", "aacc.cost.variances-sales", "aacc.cost.variances-analysis"],
      stem: `Bulawayo Brick Works makes pallets of bricks. The standard cost card for one pallet and the budget for the month are:\n\n${table(["Standard for one pallet", "US\\$"], [["Clay: 3.2 tonnes at US\\$7.50 a tonne", 24], ["Labour: 1.75 hours at US\\$6.40 an hour", 11.2], ["Standard selling price", price]], ["l", "r"])}\n\nBudget: ${F(bu)} pallets and fixed costs of ${usd(fixB)}, which are not absorbed into the standard cost.\n\nActual results for the month:\n\n${table(["Actual", "Amount"], [["Pallets made and sold", F(au)], ["Average selling price", usd(ap)], ["Clay used", `${F(cQa)} tonnes costing ${usd(cCost)}`], ["Labour", `${F(lHa)} hours costing ${usd(lCost)}`], ["Fixed costs", usd(fixA)]], ["l", "r"])}\n\nA positive variance is favourable (F) and a negative variance is adverse (A). The sales volume variance is valued at the standard contribution per pallet.`,
      parts: checkExam(C, [
        P.group({ label: "(a)", stem: "Calculate the clay variances (amounts only):", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: mp.amount, wrong: [mu.amount, 0.2], stem: "price", explanation: `Actual price = ${F(cCost)} ÷ ${F(cQa)} = US\\$7.70. (7.50 - 7.70) × ${F(cQa)} = ${usd(mp.amount)} A.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: mu.amount, wrong: [r2((cQa - cQ * bu) * cP), r2(180 * cPa)], stem: "usage", explanation: `Standard clay = ${F(au)} × 3.2 = ${F(cQ * au)} tonnes. Used ${F(cQa)}, 180 more. 180 × US\\$7.50 = ${usd(mu.amount)} A.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate the labour variances (amounts only):", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: lr.amount, wrong: [le.amount, 0.4], stem: "rate", explanation: `Actual rate = ${F(lCost)} ÷ ${F(lHa)} = US\\$6.80. (6.40 - 6.80) × ${F(lHa)} = ${usd(lr.amount)} A.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: le.amount, wrong: [r2((lH * au - lHa) * lRa), lr.amount], stem: "efficiency", explanation: `Standard hours = ${F(au)} × 1.75 = ${F(lH * au)}. Worked ${F(lHa)}, 77.5 more. 77.5 × US\\$6.40 = ${usd(le.amount)} A.` }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate the sales variances (amounts only):", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: sp.amount, wrong: [r2(1.2 * bu), sv.amount], stem: "price", explanation: `(50.80 - 52.00) × ${F(au)} = ${usd(sp.amount)} A.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: sv.amount, wrong: [r2(100 * price), sp.amount], stem: "volume", explanation: `Standard contribution = 52.00 - 24.00 - 11.20 = US\\$16.80. (${F(au)} - ${F(bu)}) × 16.80 = ${usd(sv.amount)} F.` }),
        ] }),
        P.manual({ label: "(d)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare a reconciliation of budgeted profit with actual profit.", points: [`Budgeted profit US\\\$${F(budP)} (${F(bu)} × 16.80 less fixed costs ${F(fixB)})`, `Sales variances: volume ${F(sv.amount)} F and price ${F(sp.amount)} A`, `Material variances: price ${F(mp.amount)} A and usage ${F(mu.amount)} A`, `Labour variances: rate ${F(lr.amount)} A and efficiency ${F(le.amount)} A`, `Fixed costs ${F(Math.abs(fx))} A`, `Net variance ${F(Math.abs(net))} A and actual profit US\\\$${F(actP)}`], modelAnswer: model, explanation: "One mark for each group of lines." }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: actP, wrong: [budP, r2(rev - cCost - lCost)], stem: "Calculate the actual profit from the actual results, as a check on the reconciliation.", explanation: `Revenue ${F(rev)} - clay ${F(cCost)} - labour ${F(lCost)} - fixed costs ${F(fixA)} = ${usd(actP)}.` }),
        P.manual({ label: "(f)", marks: 5, stem: "Evaluate the performance of the business for the month and recommend action.", points: [`Profit was US\\\$${F(Math.abs(net))} below budget even though 100 more pallets were sold than budgeted`, "The price cut (US\\$2,340 A) cost more than the extra volume gained (US\\$1,680 F)", "All cost variances are adverse; clay (price and usage) and labour rate are the largest: investigate supplier price, waste and wage rates", "Linked causes: poor-quality clay may explain both usage and labour efficiency", "Recommendation with a non-financial factor, for example review pricing, find a cheaper supplier or train workers without lowering quality or delivery"], modelAnswer: `Profit was US\\\$${F(Math.abs(net))} below budget. The price cut cost more than the volume gain, and every cost variance was adverse, mainly clay price and usage and labour rate. The business should review its pricing, check the clay supplier and the waste, and train workers, while protecting quality and delivery.`, hints: ["Use two or three of the largest variances.", "Link variances, suggest action and mention a non-financial factor."], explanation: "One mark for each point." }),
      ]),
      hints: ["Standard quantity and hours are for 1,950 pallets.", "Standard contribution = selling price less clay and labour.", "The reconciliation must agree with the actual profit."],
      explanation: "This COST25 item calculates direct and sales variances, reconciles budgeted and actual profit and asks for an evaluation with a recommendation.",
    });
  }

  // ===================================================================================================
  // Item 2: Masvingo Mills, sales variances and fixed overhead variances (Cambridge A Level)
  {
    const sp0 = 21, vc = 14.2, fo = 2.4, hrsPer = 0.4, bu = 8000, boh = 19200;
    const au = 7500, ap = 21.6, ah = 3150, aoh = 19900;
    const stdProfit = r2(sp0 - vc - fo);
    chk(stdProfit, 4.4);
    const budH = bu * hrsPer, rateH = boh / budH, rateU = boh / bu, stdH = au * hrsPer;
    chk(budH, 3200); chk(rateH, 6); chk(rateU, 2.4); chk(stdH, 3000);
    const prc = variances.salesPrice({ stdPrice: sp0, actualPrice: ap, actualUnits: au });
    const vol = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: stdProfit });
    const ex = variances.fixedOverheadExpenditure({ budgetedOverhead: boh, actualOverhead: aoh });
    const vo = variances.fixedOverheadVolume({ budgetedUnits: bu, actualUnits: au, ratePerUnit: rateU });
    const ca = variances.fixedOverheadCapacity({ budgetedHours: budH, actualHours: ah, ratePerHour: rateH });
    const ef = variances.fixedOverheadEfficiency({ stdHoursForActualOutput: stdH, actualHours: ah, ratePerHour: rateH });
    chk(prc.value, 4500); chk(vol.value, -2200); chk(ex.value, -700); chk(vo.value, -1200); chk(ca.value, -300); chk(ef.value, -900);
    chk(ca.value + ef.value, vo.value);
    const absorbed = r2(au * rateU), under = r2(absorbed - aoh);
    chk(absorbed, 18000); chk(under, -1900); chk(ex.value + vo.value, under);
    const model = table(["Fixed overhead account (US\\$)", "US\\$"], [
      [`Overhead absorbed (${F(au)} bags × US\\$2.40)`, absorbed], ["Actual fixed overhead", aoh], ["Under-absorbed overhead (adverse)", -Math.abs(under)],
      ["Explained by: expenditure variance (adverse)", -Math.abs(ex.value)], ["Volume variance (adverse)", -Math.abs(vo.value)], ["Of which: capacity (adverse)", -Math.abs(ca.value)], ["Of which: efficiency (adverse)", -Math.abs(ef.value)],
    ], ["l", "r"]);
    b.struct({
      d: 5, examStyle: true, skill: C.skill, secs: C.secs, applies: CAM, calculator: true,
      paper: "Cambridge Paper 4", concepts: ["aacc.cost.variances-fixed-overhead", "aacc.cost.variances-sales", "aacc.cost.variances-analysis"],
      stem: `Masvingo Mills grinds maize meal and sells it in bags. It uses absorption costing and absorbs fixed overhead on direct labour hours. The standard cost and budget are:\n\n${table(["Standard for one bag", "US\\$"], [["Selling price", sp0], ["Variable cost", vc], ["Fixed overhead absorbed (0.4 labour hours at US\\$6.00 an hour)", fo], ["Standard profit", stdProfit]], ["l", "r"])}\n\nBudget for the year: ${F(bu)} bags (${F(budH)} labour hours) and fixed overhead of ${usd(boh)}.\n\nActual results: ${F(au)} bags were made and sold at an average price of US\\$21.60; ${F(ah)} labour hours were worked; fixed overhead was ${usd(aoh)}.\n\nA positive variance is favourable (F); a negative variance is adverse (A).`,
      parts: checkExam(C, [
        P.group({ label: "(a)", stem: "Calculate the sales variances (amounts only):", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: prc.amount, wrong: [r2(0.6 * bu), vol.amount], stem: "price", explanation: `(21.60 - 21.00) × ${F(au)} = ${usd(prc.amount)} F.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: vol.amount, wrong: [r2(500 * sp0), r2(500 * 5.7)], stem: "volume, at standard profit per bag", explanation: `(${F(au)} - ${F(bu)}) × 4.40 = ${usd(vol.amount)} A.` }),
        ] }),
        P.group({ label: "(b)", stem: "Calculate the fixed overhead variances (amounts only):", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: rateU, dp: 2, wrong: [rateH, boh / au], stem: "the standard fixed overhead absorption rate per bag", explanation: `${F(boh)} ÷ ${F(bu)} = ${usd(rateU)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: ex.amount, wrong: [vo.amount, under * -1 + 0], stem: "expenditure", explanation: `${F(boh)} - ${F(aoh)} = ${usd(ex.amount)} A.` }),
          P.num({ label: "(iii)", marks: 2, kind: "money", value: vo.amount, wrong: [ex.amount, r2(500 * rateH)], stem: "volume", explanation: `(${F(au)} - ${F(bu)}) × 2.40 = ${usd(vo.amount)} A.` }),
          P.num({ label: "(iv)", marks: 3, kind: "money", value: ca.amount, wrong: [ef.amount, r2((ah - stdH) * rateH)], stem: "capacity", explanation: `(${F(ah)} - ${F(budH)}) × 6.00 = ${usd(ca.amount)} A.` }),
          P.num({ label: "(v)", marks: 3, kind: "money", value: ef.amount, wrong: [ca.amount, r2((ah - budH) * rateH * -1 + 100)], stem: "efficiency", explanation: `Standard hours = ${F(au)} × 0.4 = ${F(stdH)}. (${F(stdH)} - ${F(ah)}) × 6.00 = ${usd(ef.amount)} A.` }),
        ] }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(under), wrong: [Math.abs(ex.value), Math.abs(vo.value)], stem: "Calculate the total under-absorption of fixed overhead (amount only).", explanation: `Absorbed ${F(absorbed)} - actual ${F(aoh)} = ${usd(Math.abs(under))} under-absorbed. Check: expenditure ${F(Math.abs(ex.value))} + volume ${F(Math.abs(vo.value))}.` }),
        P.manual({ label: "(d)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare a statement showing the overhead absorbed, the actual overhead and how the under-absorption is explained by the variances.", points: ["Overhead absorbed US\\$18,000 (7,500 × 2.40) and actual overhead US\\$19,900", "Under-absorption US\\$1,900 adverse", "Expenditure US\\$700 A and volume US\\$1,200 A", "Volume split into capacity US\\$300 A and efficiency US\\$900 A"], modelAnswer: model, explanation: "One mark for each group of lines." }),
        P.manual({ label: "(e)", marks: 4, stem: "Evaluate the performance of the mill, using the sales and fixed overhead variances, and recommend action.", points: ["Sales price is favourable (US\\$4,500) but volume is adverse (US\\$2,200): fewer bags were sold at a higher price, which suggests a price rise that lost customers", "Fixed overhead is under-absorbed by US\\$1,900, of which US\\$900 is efficiency: the work took 150 hours more than the standard", "Capacity is adverse (US\\$300) because fewer hours were worked than budgeted, and expenditure is US\\$700 over budget", "Recommendation: investigate the slow working and the overspending on fixed costs; consider whether the higher price should be kept, and one non-financial factor such as customer loyalty"], modelAnswer: "The higher price gave US\\$4,500 more but 500 fewer bags were sold (US\\$2,200 adverse). Fixed overhead was under-absorbed by US\\$1,900, mainly because work took 150 hours longer than the standard. The mill should investigate the slow working and the fixed cost overspend and review whether the price rise cost it customers.", hints: ["Link price and volume; split the volume variance."], explanation: "One mark for each point." }),
      ]),
      hints: ["Standard hours are for the actual output.", "Capacity + efficiency should equal volume.", "Expenditure + volume should equal the total under-absorption."],
      explanation: "This COST25 item for Cambridge A Level calculates sales and fixed overhead variances and asks for an evaluation.",
    });
  }

  // ===================================================================================================
  // Item 3: Thandeka Furniture Ltd, master budget
  {
    const m = masterBudget({
      units: 2350, price: 86, openFGUnits: 130, closeFGUnits: 170, matUnit: 33, labUnit: 12, vohUnit: 4,
      fixedOverhead: 35400, depreciation: 8600, admin: 20700, interest: 1350, dividend: 5200, equipment: 24300,
      openRec: 21400, closeRec: 38600, openPay: 15700, closePay: 20900, openBank: 8100,
      ncaCost: 176000, ncaDep: 52000, shareCapital: 82000, openRE: 48670, loan: 13500,
    });
    chk(m.production, 2390); chk(m.cos, 115150); chk(m.profit, 29500); chk(m.collections, 184900); chk(m.closeBank, 2740); chk(m.assets1, 189370);
    const { pl } = masterStatements(m, "Thandeka Furniture Ltd", "30 June");
    const ca = m.closeFG + m.closeRec + m.closeBank;
    const gm = ratios.grossMargin(m.gp, m.sales), cr = ratios.current(ca, m.closePay), at = ratios.acidTest(ca, m.closeFG, m.closePay);
    const ce = m.shareCapital + m.re1 + m.loan, roce = ratios.roce(m.pbit, ce);
    b.struct({
      d: 5, examStyle: true, skill: C.skill, secs: C.secs, calculator: true,
      paper: PAPER, concepts: ["aacc.budget.master-budget", "aacc.budget.operating-budgets", "aacc.budget.cash-budget"],
      stem: `Thandeka Furniture Ltd in Bulawayo is preparing its master budget for the quarter ending 30 June. It plans to sell ${F(m.units)} chairs, all on credit, at US\\$86 each. Finished goods are valued at the variable cost of US\\$49 a chair (materials US\\$33, labour US\\$12, variable overhead US\\$4); there is no other inventory. Finished goods inventory is ${F(m.openFGUnits)} chairs at the start and ${F(m.closeFGUnits)} chairs at the end. Fixed production overhead is ${usd(m.fixedOverhead)} (including depreciation of ${usd(m.depreciation)}), administration and selling expenses ${usd(m.admin)} and loan interest ${usd(m.interest)}. Materials are bought on credit; labour and other costs are paid as incurred. A dividend of ${usd(m.dividend)} will be paid and equipment costing ${usd(m.equipment)} will be bought for cash.\n\n${table(["Balances at the start of the quarter", "US\\$"], [["Non-current assets at cost", m.ncaCost], ["Accumulated depreciation", m.ncaDep], ["Finished goods inventory", m.openFG], ["Trade receivables", m.openRec], ["Cash and bank", m.openBank], ["Trade payables (materials only)", m.openPay], ["Share capital", m.shareCapital], ["Loan (non-current)", m.loan]])}\n\nTrade receivables are budgeted to be ${usd(m.closeRec)} and trade payables ${usd(m.closePay)} at the end of the quarter.`,
      parts: checkExam(C, [
        P.num({ label: "(a)", marks: 2, kind: "units", value: m.production, wrong: [m.units, m.units - 40], stem: "Calculate the number of chairs to be produced.", explanation: `${F(m.units)} + ${F(m.closeFGUnits)} - ${F(m.openFGUnits)} = ${F(m.production)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.cos, wrong: [m.prodCost, r2(m.units * 33)], stem: "Calculate the budgeted cost of sales.", explanation: `Opening ${F(m.openFG)} + production ${F(m.prodCost)} - closing ${F(m.closeFG)} = ${usd(m.cos)} (${F(m.units)} × US\\$49).` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: m.profit, wrong: [m.pbit, m.gp], stem: "Calculate the budgeted profit for the quarter.", explanation: `Gross profit ${F(m.gp)} - fixed overhead ${F(m.fixedOverhead)} - administration ${F(m.admin)} = ${F(m.pbit)}; less interest ${F(m.interest)} = ${usd(m.profit)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: m.collections, wrong: [m.sales, r2(m.openRec + m.sales + m.closeRec)], stem: "Calculate the budgeted cash received from customers.", explanation: `${F(m.openRec)} + ${F(m.sales)} - ${F(m.closeRec)} = ${usd(m.collections)}.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: m.closeBank, wrong: [r2(m.closeBank + m.depreciation), r2(m.closeBank - m.depreciation)], stem: "Calculate the budgeted cash and bank balance at the end of the quarter.", explanation: `Payments: suppliers ${F(m.toSuppliers)} (${F(m.materials)} + ${F(m.openPay)} - ${F(m.closePay)}), labour ${F(m.labour)}, variable overhead ${F(m.voh)}, fixed overhead paid ${F(m.fixedCash)}, administration ${F(m.admin)}, interest ${F(m.interest)}, dividend ${F(m.dividend)}, equipment ${F(m.equipment)} = ${F(m.payments)}. Closing bank = ${F(m.openBank)} + ${F(m.collections)} - ${F(m.payments)} = ${usd(m.closeBank)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: m.assets1, wrong: [m.assets0, r2(m.assets1 + m.depreciation)], stem: "Calculate the total assets at the end of the quarter.", explanation: `Non-current assets ${F(m.nca)} + inventory ${F(m.closeFG)} + receivables ${F(m.closeRec)} + bank ${F(m.closeBank)} = ${usd(m.assets1)}.` }),
        P.manual({ label: "(g)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the budgeted statement of profit or loss for the quarter.", points: ["Heading with the name, statement and period", `Revenue ${F(m.sales)} and cost of sales ${F(m.cos)}`, `Gross profit ${F(m.gp)}`, `Fixed production overhead ${F(m.fixedOverhead)} and administration ${F(m.admin)}, giving profit from operations ${F(m.pbit)}`, `Finance costs ${F(m.interest)} and profit for the period ${F(m.profit)}`], modelAnswer: pl, explanation: "One mark for each group of lines." }),
        P.manual({ label: "(h)", marks: 6, stem: "Assess whether the plan is satisfactory. Use ratios from the budgeted statements and make a recommendation.", points: [`Gross profit margin is ${p1(gm)}% and profit from operations gives an ROCE of ${p1(roce)}% on capital employed of ${F(ce)}`, `The current ratio is ${p2(cr)} : 1 and the acid test ${p2(at)} : 1: liquidity looks healthy on paper`, `But the budgeted bank balance is only ${usd(m.closeBank)}, because ${usd(m.closeRec)} is tied up in receivables and cash is used for equipment and the dividend`, "A fall in sales or slower collection would create an overdraft; recommend arranging an overdraft in advance, collecting faster or reducing the dividend", "Non-financial factor, for example customer relationships when chasing payment, or the need for the new equipment", "A judgement: acceptable if the cash risk is managed"], modelAnswer: `Profitability is good (gross margin ${p1(gm)}%, ROCE ${p1(roce)}%) and the current ratio of ${p2(cr)} : 1 is healthy. However the bank balance is only ${usd(m.closeBank)} because receivables are ${usd(m.closeRec)} and cash is spent on equipment and the dividend. An overdraft should be arranged in advance, collection speeded up or the dividend reduced; the plan is acceptable if the cash risk is managed.`, hints: ["Quote two ratios and the cash balance."], explanation: "One mark for each point." }),
      ]),
      hints: ["Cost of sales = 2,350 chairs at the variable cost.", "Depreciation is not a cash payment.", "The statement of financial position must balance."],
      explanation: "This COST25 item builds the main figures of a master budget and asks the student to assess the plan.",
    });
  }

  // ===================================================================================================
  // Item 4: Hatfield Printers, flexed budget
  {
    const bu = 6000, au = 6700, price = 24.5, revA = 160100;
    const lines = [
      { name: "Materials", perUnit: 5.8, act: 40100 }, { name: "Labour", perUnit: 4.1, act: 28300 }, { name: "Variable overhead", perUnit: 1.3, act: 8950 },
      { name: "Maintenance (semi-variable)", fixed: 1800, perUnit: 0.45, act: 4950 }, { name: "Fixed production overhead", fixed: 15600, act: 15900 }, { name: "Administration", fixed: 8400, act: 8250 },
    ];
    const fl = costing.flex(lines, au);
    const costF = r2(sum(fl.map((x) => x.amount))), costA = sum(lines.map((x) => x.act));
    const revF = r2(au * price);
    const profF = r2(revF - costF), profA = r2(revA - costA);
    chk(fl[0].amount, 38860, 1e-6); chk(fl[3].amount, 4815, 1e-6); chk(profF, 60295); chk(profA, 53650); chk(profF - profA, 6645);
    const origCost = r2(sum(costing.flex(lines, bu).map((x) => x.amount)));
    chk(bu * price - origCost, 51300);
    const vrow = (flex, act, rev) => { const v = rev ? act - flex : flex - act; return `${F(Math.abs(r2(v)))} ${v > 0 ? "F" : "A"}`; };
    const model = table(["US\\$", "Flexed budget", "Actual", "Variance"], [
      ["Revenue", revF, revA, vrow(revF, revA, true)],
      ...lines.map((l, i) => [l.name, r2(fl[i].amount), l.act, vrow(fl[i].amount, l.act, false)]),
      ["**Profit**", profF, profA, vrow(profF, profA, true)],
    ], ["l", "r", "r", "r"]);
    b.struct({
      d: 5, examStyle: true, skill: C.skill, secs: C.secs, calculator: true,
      paper: PAPER, concepts: ["aacc.budget.flexible-budgets", "aacc.budget.purpose-behaviour"],
      stem: `Hatfield Printers in Harare budgeted to print ${F(bu)} jobs in the month at an average price of US\\$24.50 a job. The budgeted costs were: materials US\\$5.80 a job; labour US\\$4.10 a job; variable overhead US\\$1.30 a job; maintenance US\\$1,800 plus US\\$0.45 a job; fixed production overhead ${usd(15600)}; administration ${usd(8400)}.\n\nThe business printed ${F(au)} jobs. Actual results were:\n\n${table(["Actual", "US\\$"], [["Revenue", revA], ...lines.map((l) => [l.name, l.act])], ["l", "r"])}`,
      parts: checkExam(C, [
        P.group({ label: "(a)", stem: "Calculate the flexed budget for:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: fl[0].amount, wrong: [r2(5.8 * bu), r2(4.1 * au)], stem: "materials", explanation: `${F(au)} × 5.80 = ${usd(fl[0].amount)}.` }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: fl[3].amount, wrong: [r2(0.45 * au), r2(1800 + 0.45 * bu)], stem: "maintenance", explanation: `1,800 + 0.45 × ${F(au)} = ${usd(fl[3].amount)}.` }),
        ] }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: profF, wrong: [r2(bu * price - origCost), r2(revA - costF)], stem: "Calculate the flexed budgeted profit.", explanation: `Flexed revenue ${F(revF)} - flexed costs ${F(costF)} = ${usd(profF)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: profA, wrong: [profF, r2(revA - costA + 1000)], stem: "Calculate the actual profit.", explanation: `${F(revA)} - ${F(costA)} = ${usd(profA)}.` }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: profF - profA, wrong: [r2(profA - (bu * price - origCost)), r2(costA - costF)], stem: "Calculate the difference between the flexed budgeted profit and the actual profit (amount only).", explanation: `${F(profF)} - ${F(profA)} = ${usd(profF - profA)} adverse.` }),
        P.manual({ label: "(e)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare a statement comparing the flexed budget with the actual results, showing the variance on each line as favourable (F) or adverse (A).", points: ["Flexed revenue 164,150 and actual revenue 160,100 with variance 4,050 A", "Flexed materials 38,860, labour 27,470 and variable overhead 8,710 with their variances (all adverse)", "Maintenance flexed at 1,800 plus 0.45 per job (4,815) with variance 135 A", "Fixed production overhead and administration not flexed, variances 300 A and 150 F", "Total costs and profit with the profit variance 6,645 A", "Clear column headings and variances labelled F or A"], modelAnswer: model, explanation: "One mark for each group of lines." }),
        P.mcq({ label: "(f)", marks: 1, stem: "Which line has the largest adverse variance against the flexed budget?", options: [["Revenue", "Correct: US\\$4,050 adverse."], ["Materials", "US\\$1,240 adverse, smaller than revenue."], ["Labour", "US\\$830 adverse, smaller than revenue."], ["Administration", "Favourable by US\\$150."]], answer: "A", explanation: "Revenue is US\\$4,050 below the flexed budget." }),
        P.manual({ label: "(g)", marks: 6, stem: "Evaluate the month's performance and recommend action. Explain why the flexed budget is a better yardstick than the original budget.", points: ["Actual profit (US\\$53,650) is above the original budget (US\\$51,300) but US\\$6,645 below the flexed budget", "The original budget ignores the extra 700 jobs, so it flatters the performance; the flexed budget compares like with like", "Average price per job was only US\\$23.90 (against US\\$24.50), which explains the revenue variance of US\\$4,050", "All variable costs exceeded the flexed budget, especially materials (US\\$1,240) and labour (US\\$830): investigate waste, supplier prices and overtime", "Administration is the only favourable item, but it is small", "Recommendation, and a non-financial factor such as quality or customer relations when changing prices or suppliers"], modelAnswer: "Profit looks better than the original budget only because 700 extra jobs were printed. Against the flexed budget it is US\\$6,645 lower. The average price was US\\$23.90 instead of US\\$24.50 and materials and labour cost more than they should have. The business should review its discounting, the supplier prices and waste, and overtime, while protecting quality and customer relations.", hints: ["Use two or three of the largest variances.", "Explain the choice of yardstick."], explanation: "One mark for each point." }),
      ]),
      hints: ["Flex the variable and semi-variable costs only.", "Revenue is flexed at the budgeted price."],
      explanation: "This COST25 item prepares a flexed budget comparison and evaluates the result.",
    });
  }

  // ===================================================================================================
  // Item 5: Chipo Poultry, NPV and IRR
  {
    const out = 120000, fl = [36000, 43000, 48000, 39000], lo = 13, hi = 17;
    const pvL = fl.map((f, i) => r2(f * invest.df(lo, i + 1, 3))), pvH = fl.map((f, i) => r2(f * invest.df(hi, i + 1, 3)));
    const npvL = invest.npv(lo, out, fl), npvH = invest.npv(hi, out, fl);
    chk(pvL[2], 33264); chk(npvL, 2700); chk(sum(pvH), 112991); chk(npvH, -7009);
    const irr = invest.irrInterpolated(lo, hi, npvL, npvH);
    const margin = (npvL / sum(pvL)) * 100;
    const dft = table(["Year", `Factor at ${lo}%`, `Factor at ${hi}%`], [1, 2, 3, 4].map((y) => [`${y}`, invest.df(lo, y, 3).toFixed(3), invest.df(hi, y, 3).toFixed(3)]), ["l", "r", "r"]);
    b.struct({
      d: 5, examStyle: true, skill: C.skill, secs: C.secs, calculator: true,
      paper: PAPER, concepts: ["aacc.invest.npv-irr", "aacc.invest.evaluation"],
      stem: `Chipo Poultry in Chinhoyi is considering a new broiler house costing ${usd(out)}. The expected net cash inflows are ${fl.map(usd).join(", ")} at the end of years 1 to 4. There is no residual value. The cost of capital is ${lo}%. Discount factors:\n\n${dft}`,
      parts: checkExam(C, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: pvL[2], wrong: [fl[2], pvL[1]], stem: `Calculate the present value of the year 3 inflow at ${lo}%.`, explanation: `${F(fl[2])} × 0.693 = ${usd(pvL[2])}.` }),
        P.num({ label: "(b)", marks: 3, kind: "money", value: npvL, wrong: [sum(pvL), sum(fl) - out], stem: `Calculate the net present value at ${lo}%.`, explanation: `${F(pvL[0])} + ${F(pvL[1])} + ${F(pvL[2])} + ${F(pvL[3])} = ${F(sum(pvL))}; less ${F(out)} = ${usd(npvL)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: Math.abs(npvH), wrong: [sum(pvH), npvL], stem: `Calculate the amount by which the net present value at ${hi}% is below zero (amount only).`, explanation: `Present values at ${hi}%: ${F(pvH[0])} + ${F(pvH[1])} + ${F(pvH[2])} + ${F(pvH[3])} = ${F(sum(pvH))}; less ${F(out)} = -${F(Math.abs(npvH))}.` }),
        P.num({ label: "(d)", marks: 3, kind: "pct", value: irr, wrong: [(lo + hi) / 2, lo + (7009 / 9709) * 4], stem: "Estimate the internal rate of return by interpolation, to one decimal place.", explanation: `IRR = 13 + [${F(npvL)} ÷ (${F(npvL)} + ${F(Math.abs(npvH))})] × (17 - 13) = 13 + 0.278 × 4 = ${irr.toFixed(1)}%.` }),
        P.num({ label: "(e)", marks: 2, kind: "pct", value: margin, wrong: [(npvL / out) * 100, 13], stem: "Calculate the percentage fall in all inflows that would make the NPV at 13% zero, to one decimal place.", explanation: `${F(npvL)} ÷ ${F(sum(pvL))} × 100 = ${margin.toFixed(1)}%.` }),
        P.mcq({ label: "(f)", marks: 1, stem: "On the NPV rule alone the broiler house should be:", options: [["accepted, because the NPV is positive", "Correct."], ["rejected, because the IRR is above 13%", "An IRR above the cost of capital means accept."], ["rejected, because the NPV at 17% is negative", "The relevant NPV is at the cost of capital, 13%."], ["accepted, because total inflows exceed the outlay", "Undiscounted totals are not the NPV rule."]], answer: "A", explanation: "NPV at the cost of capital is positive, so accept." }),
        P.manual({ label: "(g)", marks: 7, stem: "Evaluate the project and make a recommendation, using the results of this question and referring to risk and one non-financial factor.", points: ["NPV at 13% is US\\$2,700 positive and the IRR of 14.1% is above the 13% cost of capital: accept on both methods", "The margin is very small: a fall of only 2.2% in the inflows would remove the NPV", "Poultry prices, feed costs and disease make the forecasts uncertain, especially in later years", "The IRR is an interpolated estimate and the NPV depends on the cost of capital chosen", "A higher cost of capital (17%) gives a negative NPV, so the decision is sensitive to the rate", "Non-financial factor, for example employment and supply of chicks to local markets, biosecurity or the fit with the farm's strategy", "A clear recommendation with conditions, for example proceed only if buyers' contracts reduce the risk, or seek further evidence"], modelAnswer: "The NPV is positive at 13% and the IRR of 14.1% exceeds the cost of capital, so the project passes both tests. However the margin is tiny (2.2%), the forecasts are uncertain (prices, feed, disease) and at 17% the NPV is negative. The farm should proceed only if buyers' contracts reduce the risk, and should also consider biosecurity, employment and fit with its strategy.", hints: ["Quote the NPV and IRR, the margin of safety, risk, a non-financial factor and a decision."], explanation: "One mark for each point, up to 7." }),
        P.manual({ label: "(h)", marks: 4, stem: "State two limitations of using net present value to appraise this project.", points: ["It depends on forecasts of inflows that are uncertain, especially in later years", "The result depends on the cost of capital chosen, which is an estimate", "Non-financial factors are ignored", "It is harder for managers to understand than payback"], modelAnswer: "NPV depends on uncertain forecasts of inflows and on an estimated cost of capital. It also ignores non-financial factors.", explanation: "Two limitations, each with a brief explanation: 2 marks each." }),
      ]),
      hints: ["Multiply each inflow by its factor.", "The NPV at 13% is the decision measure; the IRR is interpolated between 13% and 17%."],
      explanation: "This COST25 item calculates NPVs at two rates, estimates the IRR, tests sensitivity and asks for a recommendation.",
    });
  }

  // ===================================================================================================
  // Item 6: Mutare Bakery, payback, ARR and recommendation
  {
    const out = 94000, Pf = [27500, 35500, 41500, 29000], Qf = [50500, 37500, 24500];
    const pbP = invest.payback(out, Pf), pbQ = invest.payback(out, Qf), arrP = invest.arr(out, Pf), arrQ = invest.arr(out, Qf);
    chk(pbP, 2 + 31000 / 41500); chk(pbQ, 2 + 6000 / 24500); chk(arrP, (39500 / 4 / 47000) * 100); chk(arrQ, (18500 / 3 / 47000) * 100);
    const profitP = sum(Pf) - out, profitQ = sum(Qf) - out;
    chk(profitP, 39500); chk(profitQ, 18500);
    const months = (pbP - 2) * 12;
    b.struct({
      d: 5, examStyle: true, skill: C.skill, secs: C.secs, calculator: true,
      paper: PAPER, concepts: ["aacc.invest.payback-arr", "aacc.invest.evaluation"],
      stem: `Mutare Bakery can buy one of two machines, Machine P or Machine Q. Each costs ${usd(out)} and has no residual value. Net cash inflows arise evenly during each year.\n\n${table(["Net cash inflows (US\\$)", "Machine P", "Machine Q"], [["Year 1", Pf[0], Qf[0]], ["Year 2", Pf[1], Qf[1]], ["Year 3", Pf[2], Qf[2]], ["Year 4", Pf[3], "-"]])}\n\nThe bakery requires a payback of at most 2.5 years and an accounting rate of return (ARR) of at least 15%.`,
      parts: checkExam(C, [
        P.num({ label: "(a)", marks: 2, kind: "years", value: pbP, wrong: [3, 2 + 31000 / 35500], stem: "Calculate the payback period of Machine P, in years to two decimal places.", explanation: `After 2 years ${F(63000)} is recovered; ${F(31000)} remains. ${F(31000)} ÷ ${F(41500)} = 0.75. Payback = ${pbP.toFixed(2)} years.` }),
        P.num({ label: "(b)", marks: 2, kind: "years", value: pbQ, wrong: [3, 2 + 6000 / 37500], stem: "Calculate the payback period of Machine Q, in years to two decimal places.", explanation: `After 2 years ${F(88000)} is recovered; ${F(6000)} remains. ${F(6000)} ÷ ${F(24500)} = 0.24. Payback = ${pbQ.toFixed(2)} years.` }),
        P.num({ label: "(c)", marks: 2, kind: "months", value: months, dp: 0, wrong: [(pbP - 2) * 100, 12 - months], stem: "Machine P pays back in 2 years and some months. How many months after the 2 full years (to the nearest month)?", explanation: `0.747 of a year × 12 = ${months.toFixed(1)}, so 9 months. Payback is 2 years 9 months.` }),
        P.num({ label: "(d)", marks: 3, kind: "pct", value: arrP, wrong: [(9875 / out) * 100, (39500 / 47000) * 100], stem: "Calculate the ARR of Machine P, to one decimal place.", explanation: `Total profit = ${F(sum(Pf))} - ${F(out)} = ${F(profitP)}; average = ${F(profitP / 4)}; average investment = ${F(out / 2)}. ARR = ${arrP.toFixed(1)}%.` }),
        P.num({ label: "(e)", marks: 3, kind: "pct", value: arrQ, wrong: [(18500 / out) * 100, (18500 / 47000) * 100], stem: "Calculate the ARR of Machine Q, to one decimal place.", explanation: `Total profit = ${F(sum(Qf))} - ${F(out)} = ${F(profitQ)}; average over 3 years = ${F(profitQ / 3)}; average investment ${F(out / 2)}. ARR = ${arrQ.toFixed(1)}%.` }),
        P.group({ label: "(f)", stem: "Calculate the total profit over the life of:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: profitP, wrong: [sum(Pf), out], stem: "Machine P", explanation: `${F(sum(Pf))} - ${F(out)} = ${usd(profitP)}.` }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: profitQ, wrong: [sum(Qf), out], stem: "Machine Q", explanation: `${F(sum(Qf))} - ${F(out)} = ${usd(profitQ)}.` }),
        ] }),
        P.mcq({ label: "(g)", marks: 1, stem: "Which statement about the two machines is correct?", options: [["Q meets payback but not ARR; P meets ARR but not payback", "Correct."], ["Both machines meet both requirements", "P's payback is 2.75 years, above 2.5, and Q's ARR is 13.1%, below 15%."], ["Neither machine meets either requirement", "P's ARR and Q's payback both meet their requirements."], ["P meets the payback requirement and Q the ARR requirement", "It is the other way round."]], answer: "A", explanation: "P: payback fails, ARR passes. Q: payback passes, ARR fails." }),
        P.manual({ label: "(h)", marks: 7, stem: "Evaluate the two machines and recommend which to buy.", points: ["Q pays back faster (2.24 against 2.75 years) and meets the 2.5-year requirement; P does not", "P has the higher ARR (21.0% against 13.1%) and earns more than twice the total profit (US\\$39,500 against US\\$18,500); Q fails the ARR target", "Neither machine meets both targets, so the choice depends on priorities: liquidity and risk favour Q; total return favours P", "Payback ignores cash flows after the payback point and the time value of money, and ARR uses profits and ignores timing", "P's longer life means later flows are less certain; Q's profits are lower in total", "A discounted measure such as NPV would give a better comparison; the cost of capital is needed", "A clear recommendation with a non-financial factor, for example reliability of the machine or the effect on staff"], modelAnswer: "Machine Q pays back within 2.5 years but earns only 13.1%; Machine P earns 21.0% and more than twice the total profit but pays back in 2.75 years. Neither meets both targets. If cash is short and risk matters, Q is safer; if the bakery can wait, P earns more. NPV would give a better comparison. On these figures Machine P is the better investment unless the bakery is short of cash, subject to reliability.", hints: ["Compare each machine with both requirements.", "Mention the weaknesses of the methods."], explanation: "One mark for each point, up to 7." }),
        P.manual({ label: "(i)", marks: 3, stem: "Explain why the payback method is useful to a business with little cash.", points: ["It shows how quickly the outlay is recovered", "A short payback reduces the time the cash is at risk", "The recovered cash can be reinvested or used to repay loans sooner"], modelAnswer: "Payback shows how soon the cash comes back, which reduces risk and frees money for other uses when cash is short.", explanation: "One mark for each point." }),
      ]),
      hints: ["Use cumulative inflows for payback.", "ARR = average profit ÷ (outlay ÷ 2)."],
      explanation: "This COST25 item calculates payback and ARR for two machines and asks for an evaluation against targets.",
    });
  }
});
