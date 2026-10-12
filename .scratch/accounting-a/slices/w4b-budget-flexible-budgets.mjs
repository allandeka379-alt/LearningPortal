// W4b: budget.flexible-budgets
import { concept, P, table, chk, r2, sum, costing } from "../lib.mjs";
import { mc, F, usd } from "../tables/w4b-lib.mjs";

concept("aacc.budget.flexible-budgets", { file: "budget/flexible-budgets", keyPrefix: "budget.flexible-budgets" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a flexible (flexed) budget?",
    ok: ["A budget recalculated for the actual level of activity", "Correct: it shows what the costs should have been at the actual activity."],
    bad: [["A budget that is not changed even when activity differs", "That is a fixed budget."], ["A budget that includes only fixed costs", "A flexed budget also includes variable costs."], ["A budget prepared by the owner without managers", "That is an imposed budget."]],
    explanation: "A flexed budget adjusts the variable costs to the actual output so that a fair comparison can be made.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a budget is flexed upwards for higher output, which cost normally stays the same?",
    ok: ["Rent of the factory", "Correct: a fixed cost within the relevant range."],
    bad: [["Raw materials used", "Materials rise with output."], ["Piece-rate wages", "Piece rates rise with output."], ["Packaging for each unit", "Packaging rises with output."]],
    explanation: "Fixed costs do not change with output within the relevant range.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why should actual costs be compared with the flexed budget rather than the original budget?",
    ok: ["It shows what costs should have been at the actual activity", "Correct: it removes the effect of the change in volume."],
    bad: [["The original budget is always wrong", "The original budget is the plan; it is not necessarily wrong."], ["The flexed budget always shows lower costs than the original budget", "It may be higher or lower."], ["It is illegal to use the original budget", "There is no such rule."]],
    explanation: "The flexed budget compares like with like.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A telephone bill is US\\$300 a month plus US\\$0.10 a minute. What is the flexed budget at 4,000 minutes?",
    ok: ["US\\$700", "Correct: 300 + 0.10 × 4,000."],
    bad: [["US\\$400", "That is the variable part only."], ["US\\$300", "That is the fixed part only."], ["US\\$1,200", "The fixed part has been multiplied by 4."]],
    hints: ["Fixed part plus variable rate × activity."],
    explanation: "300 + 4,000 × 0.10 = US\\$700.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Sales revenue for the actual number of units is flexed using:",
    ok: ["The budgeted selling price × actual units", "Correct: the price is the standard, the volume is actual."],
    bad: [["The actual selling price × budgeted units", "Budgeted units are not the actual activity."], ["The actual selling price × actual units", "That is the actual revenue."], ["The budgeted revenue unchanged", "Revenue changes with volume."]],
    hints: ["Which price and which units?"],
    explanation: "Flexed revenue = budgeted price × actual units; the difference from actual revenue is the price effect.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "The actual profit is higher than the original budgeted profit but lower than the flexed budgeted profit. What does this suggest?",
    ok: ["Volume helped, but costs or prices were worse than they should have been", "Correct: the flexed budget shows the performance gap."],
    bad: [["The business performed perfectly", "Actual profit was below what the volume should have produced."], ["The flexed budget has been prepared wrongly and should be ignored altogether", "The result is possible and informative."], ["Sales volume must have fallen", "Volume must have risen for the flexed profit to be above the original."]],
    hints: ["Compare with both budgets."],
    explanation: "Profit above the original budget may be due only to higher volume; the gap to the flexed budget shows the efficiency or price problem.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager's actual output is 30% above budget and fixed costs have not been flexed. What is the effect on the variances?",
    ok: ["Fixed cost variances are correct, but unflexed variable costs give misleading variances", "Correct: only variable and semi-variable costs should be flexed."],
    bad: [["All the variances are correct, because fixed costs are always the largest part of total costs", "Unflexed variable costs would give misleading variances."], ["All the variances are favourable", "Not flexing variable costs gives adverse variances."], ["Nothing changes, because output does not affect any of the costs", "Output changes the variable costs."]],
    hints: ["Which costs should be flexed?"],
    explanation: "Variable costs must be flexed; fixed costs must not be.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "When output rises within the relevant range, total fixed costs in the flexed budget stay the same.", answer: true, explanation: "True. Fixed costs are unaffected by activity within the relevant range." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A favourable difference between the flexed budget and the original budget in total cost shows good cost control.", answer: false, hints: ["What explains the difference between those two budgets?"], explanation: "False. The difference between the flexed and the original budget is only the effect of the change in volume. Control is judged by actual against flexed." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cost to how it appears in a flexed budget when output rises.",
    pairs: ["Direct materials", "Factory rent", "Telephone bill with a standing charge and a charge per call", "Administration salaries"],
    right: ["Rises in proportion to output", "Stays the same", "Fixed part stays, variable part rises", "Stays the same"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Variable costs rise with activity; fixed costs do not; semi-variable costs are split.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A flexed budget is compared with {{blank:a}} results to find {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["actual"], choices: ["actual", "last year's", "forecast"] }, { id: "b", accepted: ["variances"], choices: ["variances", "dividends", "tax"] }],
    explanation: "The comparison of flexed budget and actual results gives the variances.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the type of budget that is not changed even when actual activity differs from the plan.", accepted: ["fixed budget", "a fixed budget", "static budget"], explanation: "It is a fixed (static) budget." });

  {
    const rate = 4.3, act = 2900;
    const v = r2(rate * act);
    chk(v, 12470);
    b.num({ d: 2, skill: "APPLICATION", kind: "money", value: v, calculator: true, wrong: [r2(rate * 2500), 4.3 + act],
      stem: `A Masvingo carpenter budgeted 2,500 chairs with materials of US\\$4.30 a chair. The actual output was ${F(act)} chairs. Calculate the flexed budget for materials.`,
      explanation: `US\\$4.30 × ${F(act)} = ${usd(v)}. Using the budgeted 2,500 chairs gives ${usd(rate * 2500)}.` });
  }
  {
    const fixed = 2000, rate = 0.45, act = 3600;
    const v = r2(fixed + rate * act);
    chk(v, 3620);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v, calculator: true, wrong: [r2(rate * act), r2((fixed + rate * act) * 1.2)],
      stem: `A department's power cost is budgeted at ${usd(fixed)} plus US\\$0.45 per machine hour. Calculate the flexed budget for ${F(act)} machine hours.`,
      hints: ["Fixed part plus variable rate × hours."],
      explanation: `${F(fixed)} + 0.45 × ${F(act)} = ${F(fixed)} + ${F(rate * act)} = ${usd(v)}. The variable part alone is ${usd(rate * act)}.` });
  }
  {
    const price = 9, vc = 5.5, fixed = 11000, au = 5600;
    const prof = r2(au * (price - vc) - fixed);
    chk(prof, 8600);
    b.calc({ d: 4, skill: "APPLICATION", kind: "money", value: prof, calculator: true, wrong: [r2(5000 * (price - vc) - fixed), r2(au * (price - vc))],
      stem: `A Harare stall budgets for 5,000 units at US\\\$${price} each, with variable costs of US\\$5.50 a unit and fixed costs of ${usd(fixed)}. Actual sales are ${F(au)} units. Calculate the flexed budgeted profit.`,
      hints: ["Contribution per unit × actual units - fixed costs."],
      explanation: `Contribution = 9.00 - 5.50 = US\\$3.50. ${F(au)} × 3.50 = ${F(au * 3.5)}; less fixed costs ${F(fixed)} = ${usd(prof)}. The original budgeted profit at 5,000 units would be ${usd(5000 * 3.5 - fixed)}.` });
  }
  {
    const flex = 18240, act = 17460;
    const v = flex - act;
    chk(v, 780);
    b.num({ d: 3, skill: "APPLICATION", kind: "money", value: v, calculator: true, wrong: [act, flex],
      stem: `The flexed budget for labour is ${usd(flex)} and the actual labour cost is ${usd(act)}. Calculate the labour cost variance (the amount only, favourable).`,
      hints: ["Flexed budget less actual cost."],
      explanation: `${F(flex)} - ${F(act)} = ${usd(v)} favourable, because actual cost is below the flexed budget.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three benefits of using a flexible budget.",
    points: ["It compares actual results with what costs should have been at the actual activity", "It separates the effect of volume from the efficiency of cost control", "It makes targets fairer and more motivating for managers"],
    modelAnswer: "It shows what costs should have been at the actual activity, separates volume from efficiency effects, and gives managers a fair target.",
    explanation: "One mark for each benefit.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain how a semi-variable cost is treated when a budget is flexed.",
    points: ["Split it into a fixed part and a variable part", "Keep the fixed part unchanged", "Multiply the variable rate by the actual activity", "Add the two parts to get the flexed budget"],
    modelAnswer: "The cost is split into its fixed and variable elements. The fixed part stays the same and the variable rate is multiplied by actual activity; the two are added.",
    hints: ["Think of a bill with a standing charge."],
    explanation: "One mark for each step.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the use of flexible budgets for a business whose costs are mostly fixed.",
    points: ["Flexing adds little if most costs are fixed, because the flexed budget is close to the original budget", "Control then depends on controlling fixed spending against the budget", "Revenue and the small variable costs still need flexing to measure volume and price effects", "Judgement: the benefit is smaller, but flexing revenue and variable costs still helps explain the profit variance"],
    modelAnswer: "If most costs are fixed, the flexed budget is close to the original, so flexing adds little for costs. It is still useful for revenue and variable costs to explain the profit variance, but control must focus on fixed spending.",
    hints: ["What changes when most costs are fixed?"],
    explanation: "One mark for each point.",
  });

  // Struct 1 (12 marks)
  {
    const bu = 4000, au = 4500, price = 15;
    const lines = [
      { name: "Materials", perUnit: 4.5, act: 20900 }, { name: "Labour", perUnit: 3.2, act: 14650 },
      { name: "Power", fixed: 1200, perUnit: 0.4, act: 3050 }, { name: "Fixed overhead", fixed: 14400, act: 14800 },
    ];
    const fl = costing.flex(lines, au);
    const costF = sum(fl.map((x) => x.amount)), costA = sum(lines.map((x) => x.act));
    const revF = au * price, revA = 66150;
    const profF = r2(revF - costF), profA = r2(revA - costA);
    chk(fl[2].amount, 3000); chk(costF, 52050); chk(profF, 15450); chk(profA, 12750); chk(profF - profA, 2700);
    const rowsM = [["Revenue", revF, revA, `${F(revF - revA)} A`], ...lines.map((l, i) => [l.name, fl[i].amount, l.act, `${F(Math.abs(fl[i].amount - l.act))} ${fl[i].amount - l.act > 0 ? "F" : "A"}`]), ["**Profit**", profF, profA, `${F(profF - profA)} A`]];
    const model = table(["US\\$", "Flexed budget", "Actual", "Variance"], rowsM, ["l", "r", "r", "r"]);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Tatenda Printers in Harare budgeted to make ${F(bu)} units at a selling price of US\\$15. The budget costs were: materials US\\$4.50 a unit; labour US\\$3.20 a unit; power US\\$1,200 plus US\\$0.40 a unit; fixed overhead ${usd(14400)}. The business made and sold ${F(au)} units. Actual results: revenue ${usd(revA)}; materials ${usd(20900)}; labour ${usd(14650)}; power ${usd(3050)}; fixed overhead ${usd(14800)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: fl[2].amount, wrong: [r2(0.4 * au), 1200 + 0.4 * bu], stem: "Calculate the flexed budget for power.", explanation: `1,200 + 0.40 × ${F(au)} = ${usd(fl[2].amount)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: costF, wrong: [r2(costF - 1200), r2(bu * 4.5 + bu * 3.2 + 1200 + 0.4 * bu + 14400)], stem: "Calculate the total flexed budget costs.", explanation: `Materials ${F(fl[0].amount)} + labour ${F(fl[1].amount)} + power ${F(fl[2].amount)} + fixed overhead ${F(fl[3].amount)} = ${usd(costF)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: profF, wrong: [r2(revA - costF), r2(bu * price - costF)], stem: "Calculate the flexed budgeted profit.", explanation: `Flexed revenue ${F(revF)} - flexed costs ${F(costF)} = ${usd(profF)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: profF - profA, wrong: [r2(profF - (bu * price - (4000 * 4.5 + 4000 * 3.2 + 1200 + 1600 + 14400))), r2(costA - costF)], stem: "Calculate the profit variance between the flexed budget and the actual result (the amount only).", explanation: `Actual profit = ${F(revA)} - ${F(costA)} = ${F(profA)}. Variance = ${F(profF)} - ${F(profA)} = ${usd(profF - profA)} adverse.` }),
        P.mcq({ label: "(e)", marks: 1, stem: "Which item has the largest adverse variance?", options: [["Revenue", "Correct: US\\$1,350 adverse."], ["Materials", "US\\$650 adverse, smaller than revenue."], ["Fixed overhead", "US\\$400 adverse, smaller than revenue."], ["Power", "US\\$50 adverse, the smallest."]], answer: "A", explanation: "Revenue is US\\$1,350 below the flexed budget, the largest difference." }),
        P.manual({ label: "(f)", marks: 3, type: "EXTENDED_RESPONSE", stem: "Prepare the flexed budget comparison statement with the variance for each line.", points: ["Flexed budget column with revenue 67,500 and the four costs flexed correctly", "Actual column with revenue 66,150 and the four actual costs", "Variances with F or A for each line and profit variance 2,700 A"], modelAnswer: model, explanation: "One mark for each column or group of lines." }),
      ],
      hints: ["Flex the variable costs and the variable part of power.", "Keep fixed overhead as budgeted."],
      explanation: "This item prepares and uses a flexed budget statement.",
    });
  }

  // Struct 2 (10 marks)
  {
    const per = { mat: 6, lab: 4, voh: 2 }, fixed = 7500, bu = 1500, au = 1800;
    const act = { mat: 11300, lab: 7000, voh: 3500, fix: 7200 };
    const fl = { mat: au * per.mat, lab: au * per.lab, voh: au * per.voh, fix: fixed };
    const flexCost = sum(Object.values(fl)), actCost = sum(Object.values(act));
    chk(flexCost, 29100); chk(actCost, 29000);
    const origCost = r2(bu * 12 + fixed);
    chk(origCost, 25500);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `Kuda Welding in Mutare budgeted the cost of producing ${F(bu)} gates as follows: materials US\\$6 a gate; labour US\\$4 a gate; variable overhead US\\$2 a gate; fixed overhead ${usd(fixed)}. The workshop produced ${F(au)} gates. Actual costs were: materials ${usd(act.mat)}; labour ${usd(act.lab)}; variable overhead ${usd(act.voh)}; fixed overhead ${usd(act.fix)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: flexCost, wrong: [origCost, actCost], stem: "Calculate the flexed budgeted cost of production.", explanation: `${F(au)} × (6 + 4 + 2) = ${F(au * 12)}; plus fixed overhead ${F(fixed)} = ${usd(flexCost)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: act.mat - fl.mat, wrong: [r2(act.mat - bu * per.mat), fl.mat], stem: "Calculate the materials variance against the flexed budget (the amount only; it is adverse).", explanation: `Flexed materials = ${F(au)} × 6 = ${F(fl.mat)}. Actual ${F(act.mat)}. Variance = ${usd(act.mat - fl.mat)} adverse.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: flexCost - actCost, wrong: [actCost - origCost, 0], stem: "Calculate the net total cost variance between the flexed budget and actual cost (the amount only; it is favourable).", explanation: `${F(flexCost)} - ${F(actCost)} = ${usd(flexCost - actCost)} favourable.` }),
        P.manual({ label: "(d)", marks: 4, stem: "Comment on the result, explaining why comparing actual cost with the original budget would be misleading.", points: ["Total costs are US\\$100 below the flexed budget, a small favourable variance", "But the materials are US\\$500 over, which hides behind favourable labour, variable overhead and fixed overhead variances", "The original budget (US\\$25,500) ignores the 300 extra gates, so actual cost of US\\$29,000 would appear to be US\\$3,500 over", "Recommend investigating the materials usage or price"], modelAnswer: "Against the flexed budget total cost is US\\$100 favourable, but materials are US\\$500 over. Against the original budget of US\\$25,500 cost looks US\\$3,500 over, but this is only the effect of 300 extra gates. The materials should be investigated.", hints: ["Which budget allows for the extra output?"], explanation: "One mark for each point." }),
      ],
      hints: ["Flex materials, labour and variable overhead by the actual output."],
      explanation: "This item reconciles flexed budgeted cost of production with actual cost.",
    });
  }

  b.card("DEFINITION", "Fixed budget", "A budget for a single level of activity; it is not changed if the actual activity differs.");
  b.card("DEFINITION", "Flexible (flexed) budget", "A budget recalculated for the actual level of activity so that a fair comparison with actual results can be made.");
  b.card("FORMULA", "Flexed variable cost", "Budgeted cost per unit × actual activity.");
  b.card("FORMULA", "Flexed semi-variable cost", "Fixed part + (variable rate per unit × actual activity).");
  b.card("CONCEPT", "Fixed cost in a flexed budget", "Unchanged within the relevant range; do not multiply by the activity.");
  b.card("FORMULA", "Flexed revenue", "Budgeted selling price × actual units; the difference from actual revenue is the price effect.");
  b.card("CONCEPT", "Original v flexed budget difference", "The difference between the original and flexed budgets is the effect of volume only; control is judged against the flexed budget.");
  b.card("CONCEPT", "Cost reconciliation", "Flexed budgeted cost of production + adverse - favourable differences = actual cost of production.");
  b.card("CONCEPT", "Using flexed variances", "Investigate the largest controllable differences first, give causes, recommend action and consider non-financial factors.");
});
