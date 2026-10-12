// W4b: cost.variances-analysis
import { concept, P, table, chk, r2, variances } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";

concept("aacc.cost.variances-analysis", { file: "cost/variances-analysis", keyPrefix: "cost.variances-analysis" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What does a reconciliation of budgeted profit and actual profit show?",
    ok: ["How each variance moves profit from the budget to the actual figure", "Correct: it explains the whole difference."],
    bad: [["The profit to be earned next year", "It looks back at the period just ended."], ["The cash balance at the end of the period and the bank interest earned", "It deals with profit, not cash."], ["The amount of tax payable on profit", "Tax is not part of a variance reconciliation."]],
    explanation: "The statement starts with budgeted profit, adds favourable variances and deducts adverse ones to reach actual profit.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a reconciliation of standard cost to actual cost, how is an adverse variance treated?",
    ok: ["It is added to the standard cost", "Correct: adverse means the actual cost was higher."],
    bad: [["It is deducted from the standard cost", "That is how a favourable variance is treated."], ["It is ignored because it is a loss", "All variances are included to reach the actual cost."], ["It is added to the selling price", "Variances do not change prices."]],
    explanation: "Actual cost = standard cost + adverse variances - favourable variances.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which term describes investigating only the large variances and leaving normal performance alone?",
    ok: ["Management by exception", "Correct: attention goes to the exceptions."],
    bad: [["Zero-based budgeting method", "That is a budgeting approach, not variance investigation."], ["Absorption costing", "That is a way of valuing products."], ["Marginal costing", "That is a way of valuing products."]],
    explanation: "Management by exception saves time by concentrating on significant variances.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A bakery's variance report shows a favourable labour rate variance and an adverse labour efficiency variance. What is the most likely link?",
    ok: ["Cheaper, less experienced workers were used and they took longer", "Correct: low-paid workers are often slower."],
    bad: [["More skilled workers were used and they were paid more per hour", "Higher pay would give an adverse rate variance."], ["The bakery paid overtime to all workers", "Overtime raises the rate (adverse)."], ["The selling price was raised", "Selling prices do not affect labour variances."]],
    hints: ["Think about who is paid less."],
    explanation: "A lower grade of worker lowers the rate but may increase the time taken.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "A business switches to a cheaper supplier and shows a favourable material price variance. Which is the most important question to ask before praising the buyer?",
    ok: ["Did the cheaper material cause waste or poor quality products?", "Correct: the usage variance and quality may offset the saving."],
    bad: [["Did the supplier use a larger delivery van to bring the material?", "That is irrelevant to the variance."], ["Was the standard price written in blue ink?", "That is irrelevant."], ["Did the factory also sell more units?", "That belongs to the sales variances, not the link to material price."]],
    hints: ["Cheaper does not always mean better."],
    explanation: "A price saving may be cancelled by adverse usage and efficiency variances or by lost customers.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which adverse variance is the production manager least able to control?",
    ok: ["A material price rise imposed by all suppliers in the country", "Correct: it is outside the manager's control."],
    bad: [["Waste caused by careless cutting of cloth", "The production manager controls how carefully work is done."], ["Idle time because the workers were not scheduled well by the supervisor", "Scheduling is within the manager's control."], ["Extra hours worked because of poor supervision", "Supervision is within the manager's control."]],
    hints: ["Controllable and uncontrollable causes."],
    explanation: "Only a variance with an external cause is uncontrollable; the others arise inside the factory.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "After the review of variances, the owner of a furniture workshop sees that overtime has reduced the delivery time but caused adverse labour rate variances. Which factor should she also consider?",
    ok: ["The effect of overtime on worker morale and on customer satisfaction", "Correct: non-financial factors affect long-term success."],
    bad: [["Only the amount of the labour rate variance and nothing else in the report", "A financial figure alone ignores the benefit to customers."], ["Only the profit of the previous year", "Last year's profit does not help decide about overtime now."], ["Only the size of the workshop building", "Building size is unrelated to the decision."]],
    hints: ["Think beyond the figures."],
    explanation: "Cost control should be balanced with morale, safety, quality and delivery.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In a reconciliation of budgeted profit to actual profit, favourable variances are added to budgeted profit.", answer: true, explanation: "True. A favourable variance increases profit, so it is added." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "If the reconciliation total does not agree with the actual profit calculated from the actual figures, the most likely explanation is that one or more variances are wrong.", answer: true, hints: ["The variances should explain the whole difference."], explanation: "True. The variances must explain the entire difference, so a mismatch means an error in a variance or an omitted one." });
  b.match({
    d: 3, skill: "ANALYSIS",
    stem: "Match each pair of variances to its most likely common cause.",
    pairs: ["Favourable material price and adverse material usage", "Adverse sales price and favourable sales volume", "Favourable labour rate and adverse labour efficiency", "Adverse labour rate and favourable labour efficiency"],
    right: ["Cheaper, poorer quality material that is wasted", "A discount given to win extra sales", "Lower-paid, less experienced workers who are slow", "Highly paid skilled workers who work faster"],
    rightIndex: [0, 1, 2, 3],
    hints: ["Ask what single decision could cause both."],
    explanation: "Each pair has one cause that moves both variances in opposite directions.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the formula for actual profit.",
    template: "Actual profit = budgeted profit + {{blank:a}} variances - {{blank:b}} variances.",
    blanks: [{ id: "a", accepted: ["favourable"], choices: ["favourable", "adverse"] }, { id: "b", accepted: ["adverse"], choices: ["favourable", "adverse"] }],
    explanation: "Favourable variances add to profit; adverse variances reduce it.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the statement that lists variances in columns to move from budgeted profit to actual profit.", accepted: ["operating statement", "reconciliation statement", "reconciliation of budgeted and actual profit", "reconciliation"], explanation: "It is the operating (reconciliation) statement." });

  {
    const bud = 8500, fav = [1150, 350], adv = [2050, 590];
    const act = r2(bud + fav[0] + fav[1] - adv[0] - adv[1]);
    chk(act, 7360);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: act, calculator: true, wrong: [bud + 1500 + 2640, bud - 2640],
      stem: `A Mutare printer's budgeted profit for May was ${usd(bud)}. The favourable variances were ${usd(fav[0])} and ${usd(fav[1])} and the adverse variances were ${usd(adv[0])} and ${usd(adv[1])}. Calculate the actual profit.`,
      hints: ["Add favourable and deduct adverse variances."],
      explanation: `${F(bud)} + ${F(fav[0] + fav[1])} - ${F(adv[0] + adv[1])} = ${usd(act)}. Adding the adverse variances instead gives ${usd(bud + 1500 + 2640)}.` });
  }
  {
    const std = 24600, fav = 1350, adv = 2100;
    const act = r2(std - fav + adv);
    chk(act, 25350);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: act, calculator: true, wrong: [std + fav - adv, std + fav + adv],
      stem: `The standard direct cost of a month's output at a Gweru shoe factory was ${usd(std)}. The favourable cost variances totalled ${usd(fav)} and the adverse cost variances totalled ${usd(adv)}. Calculate the actual direct cost.`,
      hints: ["Adverse variances raise the cost."],
      explanation: `${F(std)} - ${F(fav)} + ${F(adv)} = ${usd(act)}. Swapping the signs gives ${usd(std + fav - adv)}.` });
  }
  {
    const bud = 15000, act = 13400, sv = 1700, sp = 2500, mu = 600;
    const miss = r2(act - bud - (sv - sp - mu));
    chk(miss, -200);
    b.calc({ d: 4, skill: "ANALYSIS", kind: "money", value: Math.abs(miss), calculator: true, wrong: [bud - act, 1600],
      stem: `A company's budgeted profit was ${usd(bud)} and its actual profit ${usd(act)}. The reconciliation shows three variances: sales volume ${usd(sv)} favourable, sales price ${usd(sp)} adverse and material usage ${usd(mu)} adverse. One more variance is missing from the list. Calculate its amount (state only the amount).`,
      hints: ["Total variance = actual profit - budgeted profit."],
      explanation: `Total variance = ${F(act)} - ${F(bud)} = -1,600. Known variances = ${F(sv)} - ${F(sp)} - ${F(mu)} = -1,400. Missing = -1,600 - (-1,400) = -${F(Math.abs(miss))}, so ${usd(Math.abs(miss))} adverse.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three actions a manager might take after finding a large adverse material usage variance.",
    points: ["Investigate the cause (waste, quality, machines, training)", "Improve supervision, training or machine maintenance", "Change the supplier or tighten quality control of material"],
    modelAnswer: "Investigate whether the cause is waste, poor material or faulty machines, then train workers, repair machines or change the supplier.",
    explanation: "One mark for each action.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain why a favourable variance may not always be good news.",
    points: ["It may have been caused by a quality problem, such as cheaper poorer material", "It may be linked to an adverse variance elsewhere that is larger", "It may show that the standard was too easy or out of date", "It may harm customer satisfaction or future sales"],
    modelAnswer: "A favourable variance may come from cheaper material that causes waste, which shows up as an adverse usage variance. It may also mean the standard was too loose or that quality and customer satisfaction are suffering.",
    hints: ["Think of what else may have changed."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate whether standard costing variances should be the only measure used to judge a production manager.",
    points: ["Variances give an objective, quantified measure of cost control", "Some variances are outside the manager's control, so judging only on them is unfair", "Cost cutting may harm quality, safety, delivery or morale, which variances do not show", "Judgement: use variances together with non-financial measures such as quality and on-time delivery"],
    modelAnswer: "Variances are objective, but some are outside the manager's control and cost cutting can harm quality and morale. The manager should be judged on variances together with measures such as quality and delivery.",
    hints: ["Consider controllability and non-financial measures."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (14 marks)
  {
    const price = 30, mQ = 2, mP = 5, lH = 0.5, lR = 8;
    const contr = price - (mQ * mP + lH * lR);
    chk(contr, 16);
    const bu = 2000, fixB = 12000, au = 2150, ap = 29, mQa = 4420, mPa = 5.2, lHa = 1120, lRa = 8.2, fixA = 12300;
    const mCost = r2(mQa * mPa), lCost = r2(lHa * lRa), rev = r2(au * ap);
    chk(mCost, 22984); chk(lCost, 9184); chk(rev, 62350);
    const budP = r2(bu * contr - fixB);
    const actP = r2(rev - mCost - lCost - fixA);
    chk(budP, 20000); chk(actP, 17882);
    const sv = variances.salesVolume({ budgetUnits: bu, actualUnits: au, stdProfitPerUnit: contr });
    const sp = variances.salesPrice({ stdPrice: price, actualPrice: ap, actualUnits: au });
    const mp = variances.materialPrice({ stdPrice: mP, actualPrice: mPa, actualQty: mQa });
    const mu = variances.materialUsage({ stdQtyForActualOutput: mQ * au, actualQty: mQa, stdPrice: mP });
    const lr = variances.labourRate({ stdRate: lR, actualRate: lRa, actualHours: lHa });
    const le = variances.labourEfficiency({ stdHoursForActualOutput: lH * au, actualHours: lHa, stdRate: lR });
    const fx = r2(fixB - fixA);
    chk(sv.value, 2400); chk(sp.value, -2150); chk(mp.value, -884); chk(mu.value, -600); chk(lr.value, -224); chk(le.value, -360); chk(fx, -300);
    const net = r2(sv.value + sp.value + mp.value + mu.value + lr.value + le.value + fx);
    chk(budP + net, actP);
    const model = table(["Reconciliation", "Favourable US\\$", "Adverse US\\$", "US\\$"], [
      ["Budgeted profit", "", "", budP], ["Sales volume variance", sv.amount, "", ""], ["Sales price variance", "", sp.amount, ""], ["Material price variance", "", mp.amount, ""], ["Material usage variance", "", mu.amount, ""],
      ["Labour rate variance", "", lr.amount, ""], ["Labour efficiency variance", "", le.amount, ""], ["Fixed cost variance", "", Math.abs(fx), ""],
      ["Net adverse variance", sv.amount, r2(sp.amount + mp.amount + mu.amount + lr.amount + le.amount + Math.abs(fx)), net], ["**Actual profit**", "", "", `**${F(actP)}**`],
    ], ["l", "r", "r", "r"]);
    b.struct({
      d: 5, skill: "ANALYSIS", calculator: true,
      stem: `Tatenda Paints in Harare makes paint. The standard for one tin is: selling price US\\$30; 2 litres of materials at US\\$5.00; 0.5 labour hours at US\\$8.00. Budgeted sales were ${F(bu)} tins and budgeted fixed costs ${usd(fixB)}. Actual results for the month: ${F(au)} tins sold at US\\$29.00; ${F(mQa)} litres of materials bought and used at a total cost of ${usd(mCost)}; ${F(lHa)} labour hours paid at a total cost of ${usd(lCost)}; fixed costs ${usd(fixA)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: budP, wrong: [bu * 30 - fixB, bu * contr], stem: "Calculate the budgeted profit.", explanation: `Contribution = 30 - 10 - 4 = US\\$16. ${F(bu)} × 16 - ${F(fixB)} = ${usd(budP)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: actP, wrong: [rev - mCost - lCost, budP], stem: "Calculate the actual profit.", explanation: `Revenue ${F(rev)} - materials ${F(mCost)} - labour ${F(lCost)} - fixed costs ${F(fixA)} = ${usd(actP)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(net), wrong: [sv.amount, r2(sp.amount + mp.amount)], stem: "Calculate the net total of all the variances (amount only).", explanation: `${F(actP)} - ${F(budP)} = -${F(Math.abs(net))}: ${usd(Math.abs(net))} adverse in total.` }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare a reconciliation of budgeted and actual profit with favourable and adverse columns.", points: ["Budgeted profit US\\$20,000 at the top", "Sales volume US\\$2,400 favourable and sales price US\\$2,150 adverse", "Material price US\\$884 adverse and usage US\\$600 adverse", "Labour rate US\\$224 adverse, efficiency US\\$360 adverse and fixed cost US\\$300 adverse", "Totals and actual profit US\\$17,882 agree with part (b)"], modelAnswer: model, explanation: "One mark for each group of lines and one for the agreement with the actual profit." }),
        P.manual({ label: "(e)", marks: 3, stem: "Comment on the performance for the month.", points: ["Sales volume was above budget but the price cut was larger in effect, so net sales margin fell", "All the cost variances were adverse, with material price the largest", "Profit was well below budget; the usage and efficiency variances should be investigated and prices reviewed"], modelAnswer: "More tins were sold, but the lower selling price cost more than the extra volume gained. All cost variances were adverse, especially material price, so profit fell US\\$2,118 below budget. Buying and the price policy should be reviewed.", explanation: "One mark for each point." }),
      ],
      hints: ["Contribution per tin = 30 - (2 × 5) - (0.5 × 8).", "The reconciliation must end at the actual profit."],
      explanation: "This item prepares and interprets a full reconciliation of budgeted and actual profit.",
    });
  }

  // Struct 2 (10 marks): missing variance in a cost reconciliation
  {
    const std = 52800, act = 54900;
    const mp = 1350, mu = 900, lr = 700;
    const net = act - std;
    const le = r2(net - mp - mu + lr);
    chk(le, 550);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A Gweru clothing factory has a standard direct cost of ${usd(std)} for the month's output. The actual direct cost was ${usd(act)}. The variance report shows: material price ${usd(mp)} adverse; material usage ${usd(mu)} adverse; labour rate ${usd(lr)} favourable; the labour efficiency variance has not yet been calculated.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: net, wrong: [std, act - std + 500], stem: "Calculate the total direct cost variance (the amount only).", explanation: `${F(act)} - ${F(std)} = ${usd(net)} adverse.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: le, wrong: [net - mp - mu - lr, net], stem: "Calculate the labour efficiency variance (the amount only).", explanation: `${F(mp)} + ${F(mu)} - ${F(lr)} + efficiency = ${F(net)}. Efficiency = ${F(net)} - ${F(mp + mu - lr)} = ${usd(le)} adverse.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "The efficiency variance in (b) is:", options: [["adverse, because it adds to the cost", "Correct."], ["favourable, because it adds to the cost", "A variance that raises cost is adverse."], ["favourable, because labour rate is favourable", "The two labour variances are independent in sign."], ["nil, because it is the balancing figure", "It is a balancing figure, but its value is not zero."]], answer: "A", explanation: "Extra cost is adverse." }),
        P.manual({ label: "(d)", marks: 2, stem: "Suggest one link between the labour rate and labour efficiency variances.", points: ["The favourable rate suggests lower-paid (less skilled) workers were used", "They probably took longer than the standard, giving the adverse efficiency variance"], modelAnswer: "Lower-paid, less experienced workers were probably used, which lowered the average rate but made the work slower.", explanation: "One mark for each point." }),
        P.manual({ label: "(e)", marks: 3, stem: "Advise the managers which variances to investigate first, giving reasons.", points: ["Material price (US\\$1,350) is the largest: check the supplier prices or the standard", "Material usage and labour efficiency are controllable inside the factory and may be linked (waste, training)", "Investigate before changing workers, because the saving on rate may be cancelled by the time lost"], modelAnswer: "Start with the largest, the material price variance, to see whether the supplier or the standard is at fault. Then look at usage and efficiency, which the factory controls and which are probably linked to the lower-grade labour.", explanation: "One mark for each point." }),
      ],
      hints: ["Total variance = actual cost - standard cost.", "Favourable variances reduce the total."],
      explanation: "This item uses a cost reconciliation to find a missing variance and interpret the pattern.",
    });
  }

  b.card("DEFINITION", "Reconciliation statement", "Starts with budgeted profit (or standard cost), shows each variance and ends at actual profit (or actual cost).");
  b.card("FORMULA", "Actual profit from budget", "Budgeted profit + favourable variances - adverse variances.");
  b.card("FORMULA", "Actual cost from standard", "Standard cost of actual output + adverse variances - favourable variances.");
  b.card("CONCEPT", "Prove the reconciliation", "Calculate actual profit from the actual revenue and costs; the reconciliation must end at the same figure.");
  b.card("CONCEPT", "Interrelated variances", "Cheap material (favourable price) with adverse usage; cheap labour (favourable rate) with adverse efficiency.");
  b.card("CONCEPT", "Controllable v uncontrollable", "Managers should be judged on variances they can influence; a national price rise is outside their control.");
  b.card("CONCEPT", "Management by exception", "Investigate only the significant variances so that attention goes where it matters.");
  b.card("CONCEPT", "Non-financial factors", "Quality, delivery time, supplier reliability, worker morale and customer satisfaction can matter more than a small cost saving.");
  b.card("FACT", "Board coverage", "Standard costing: Form 6 (ZIMSEC) and A Level only (Cambridge Paper 4). Fixed overhead variances: Cambridge only.");
});
