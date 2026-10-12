// W4b: cost.standards-basics
import { concept, P, table, chk, r2, sum } from "../lib.mjs";
import { mc, F, usd, p2 } from "../tables/w4b-lib.mjs";

concept("aacc.cost.standards-basics", { file: "cost/standards-basics", keyPrefix: "cost.standards-basics" }, (b) => {
  // Chinhoyi leather belts
  const lines = [
    ["Leather", 0.8, 6.5],
    ["Buckle", 1, 0.9],
    ["Direct labour", 0.5, 3.8],
    ["Variable production overhead", 0.5, 0.8],
    ["Fixed production overhead", 0.5, 1.6],
  ];
  const amt = lines.map((l) => r2(l[1] * l[2]));
  const std = sum(amt);
  chk(std, 9.2);
  const direct = r2(amt[0] + amt[1] + amt[2]);
  chk(direct, 8);
  const sp = 14;
  const prof = r2(sp - std);
  chk(prof, 4.8);
  const cardTab = table(["Element", "Quantity", "Standard price or rate US\\$", "Cost per belt US\\$"], lines.map((l, i) => [l[0], String(l[1]), p2(l[2]), p2(amt[i])]), ["l", "r", "r", "r"]);
  const budgetU = 2000, actualU = 2400, actualDirect = 19950;
  const stdActual = r2(direct * actualU);
  chk(stdActual, 19200);
  const tv = r2(stdActual - actualDirect);
  chk(tv, -750);

  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a standard cost?",
    ok: ["A predetermined cost of one unit based on expected quantities and prices", "Correct: it is planned in advance and used as a yardstick."],
    bad: [["The cost recorded in the ledger after production has been completed and sold", "That is the actual cost."], ["The average cost of the last five orders", "A standard is planned, not a historic average."], ["The cost that a competitor charges", "A standard cost is internal, not a market price."]],
    explanation: "A standard cost is the planned cost per unit built from standard quantities, prices and rates.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which type of standard assumes perfect conditions with no waste or idle time?",
    ok: ["Ideal", "Correct: ideal standards allow for no inefficiency at all."],
    bad: [["Attainable", "Attainable standards allow for normal waste and breaks."], ["Current", "Current standards reflect present conditions, including present inefficiency."], ["Basic", "A basic standard is simply left unchanged for a long time."]],
    explanation: "An ideal standard assumes the best possible prices and efficiency, so adverse variances are almost certain.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A standard that is efficient but allows for normal waste and rest periods is called:",
    ok: ["attainable", "Correct: it can be reached with effort."],
    bad: [["ideal", "An ideal standard allows no waste."], ["basic", "A basic standard is kept unchanged for years."], ["historic", "Historic costs are past actuals, not a type of standard."]],
    explanation: "Attainable standards are demanding but achievable, so they motivate.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A bakery in Gweru has a standard of 0.6 kg of flour at US\\$1.50 a kilogram, 0.2 hours of labour at US\\$4 an hour and fixed overhead of US\\$0.30 a loaf for each loaf. What is the total standard cost of a loaf?`,
    ok: [usd(0.6 * 1.5 + 0.2 * 4 + 0.3), "Correct: 0.90 + 0.80 + 0.30."],
    bad: [[usd(0.6 * 1.5 + 0.2 * 4), "This leaves out the fixed overhead."], [usd(1.5 + 4 + 0.3), "Unit prices have been added without multiplying by the standard quantities."], [usd(0.6 + 0.2 + 0.3), "Quantities alone have been added; each must be multiplied by its price or rate."]],
    hints: ["Quantity × price for each element, then add."],
    explanation: "Flour 0.6 × 1.50 = 0.90; labour 0.2 × 4 = 0.80; overhead 0.30. Total US\\$2.00.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A manager planned to make 500 units but made 640. Why must the standard cost be flexed to 640 units before variances are found?",
    ok: ["Otherwise the difference would mostly show the extra units, not efficiency", "Correct: like must be compared with like."],
    bad: [["Because standard costs only apply to units that have been sold to customers", "Standard cost applies to units produced."], ["Because the budget is always wrong", "The budget may be sound; it is simply for a different output."], ["Because actual cost is always lower than the budget", "Actual cost may be higher or lower."]],
    hints: ["Think about what the comparison with the original budget would show."],
    explanation: "The standard cost allowed for the actual output is the fair yardstick for the actual cost incurred.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement describes management by exception in standard costing?",
    ok: ["Only large or unusual variances are investigated by managers", "Correct: time is spent where the variances are significant."],
    bad: [["Every variance, however small, is investigated by the manager concerned", "That would waste time and is not management by exception."], ["Only favourable variances are reported", "Both favourable and adverse variances are reported."], ["Variances are reported once a year", "Reports should be timely so that action can be taken."]],
    hints: ["The word exception means something unusual."],
    explanation: "Management by exception directs attention to significant variances and leaves normal performance alone.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A tuck-shop supplier has used the same basic standard for materials for six years while prices have risen steadily. What will the price variance probably show?",
    ok: ["Large adverse variances that reflect the age of the standard, not buying", "Correct: the standard is out of date."],
    bad: [["Large favourable variances because the standard is lower than the price now paid", "Actual prices above standard give adverse variances."], ["No variance, because a basic standard adjusts itself to price changes", "A basic standard is not updated, which is the problem."], ["A usage variance, because price changes affect quantity", "Price changes affect price variances, not usage."]],
    hints: ["Actual prices have risen above an unchanged standard."],
    explanation: "An unchanged standard against rising actual prices gives adverse price variances that say little about the buyer's performance.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Ideal standards are usually the most motivating because they set the highest target.", answer: false, explanation: "False. Ideal standards are rarely reached, so workers see them as impossible and are discouraged. Attainable standards motivate better." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Standard costing suits businesses that make large numbers of identical units better than businesses that make one-off jobs.", answer: true, explanation: "True. Standards can be set reliably and used repeatedly when production is repetitive." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of standard to its description.",
    pairs: ["Ideal", "Attainable", "Current", "Basic"],
    right: ["Assumes perfect efficiency and lowest prices", "Allows for normal waste and breaks", "Based on present conditions and prices", "Left unchanged for a long period"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each type is defined by the conditions it assumes.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about standard costing.",
    template: "A standard cost card shows the standard {{blank:a}} and price of each material and the standard {{blank:b}} and rate of labour.",
    blanks: [{ id: "a", accepted: ["quantity"], choices: ["quantity", "profit", "variance"] }, { id: "b", accepted: ["hours"], choices: ["hours", "output", "inventory"] }],
    explanation: "Materials are described by standard quantity and price; labour by standard hours and rate.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the document that lists the standard cost of every element of one unit of product.", accepted: ["standard cost card", "cost card", "standard costing card"], explanation: "It is the standard cost card." });

  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: std, calculator: true, wrong: [direct, r2(std - amt[4])],
    stem: `Chinhoyi Leather Works sets these standards for one belt.\n\n${cardTab}\n\nCalculate the total standard cost of one belt.`,
    hints: ["Add the cost of all five elements."],
    explanation: `0.8 × 6.50 = 5.20; 1 × 0.90 = 0.90; 0.5 × 3.80 = 1.90; 0.5 × 0.80 = 0.40; 0.5 × 1.60 = 0.80. Total = ${usd(std)}. Using only the direct elements gives ${usd(direct)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: prof, calculator: true, wrong: [sp - direct, sp],
    stem: `Using the standard cost of US\\$9.20 a belt and a standard selling price of US\\\$${sp}, calculate the standard profit on one belt.`,
    hints: ["Selling price less total standard cost."],
    explanation: `${usd(sp)} - ${usd(std)} = ${usd(prof)}. Deducting only the direct cost would overstate the profit.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: stdActual, calculator: true, daily: false, wrong: [direct * budgetU, std * actualU],
    stem: `The business budgeted to make ${F(budgetU)} belts but made ${F(actualU)}. The standard direct cost (leather, buckle and labour) is US\\$8.00 a belt. Calculate the standard direct cost allowed for the actual output.`,
    hints: ["Use the actual output, not the budget."],
    explanation: `${F(actualU)} × ${usd(direct)} = ${usd(stdActual)}. Using the budgeted ${F(budgetU)} belts gives ${usd(direct * budgetU)}, and including overheads would give ${usd(std * actualU)}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: Math.abs(tv), calculator: true, wrong: [direct * budgetU - actualDirect + 0, actualDirect - direct * budgetU],
    stem: `Actual direct costs for the ${F(actualU)} belts were ${usd(actualDirect)}. Calculate the total direct cost variance (the amount only; you do not need to say whether it is favourable or adverse here).`,
    hints: ["Compare actual cost with the standard cost of 2,400 belts."],
    explanation: `Standard direct cost of ${F(actualU)} belts = ${usd(stdActual)}. Actual = ${usd(actualDirect)}. The variance is ${usd(Math.abs(tv))}, and it is adverse because actual cost is higher. Comparing with the budgeted output of ${F(budgetU)} belts (${usd(direct * budgetU)}) would give ${usd(actualDirect - direct * budgetU)}, which ignores the 400 extra belts.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three uses of a standard costing system.",
    points: ["Planning and budgeting (standards feed the budget and selling prices)", "Control by comparing actual with standard and investigating variances", "Measuring the performance of managers and workers"],
    modelAnswer: "A standard costing system helps with planning and pricing, with control by investigating variances, and with judging the performance of managers.",
    explanation: "One mark for each use. Motivation and simpler inventory valuation are also acceptable.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Explain two reasons why a business might prefer attainable standards to ideal standards.",
    points: ["Attainable standards can be reached with normal effort, so they motivate staff", "Ideal standards produce permanent adverse variances, which hide real problems", "Attainable standards give more realistic budgets and selling prices", "Ideal standards may be ignored because staff see them as impossible"],
    modelAnswer: "Attainable standards can be met with normal effort, so workers are motivated to try. Ideal standards give adverse variances every month, which hides real problems and makes budgets unrealistic.",
    hints: ["Think of the effect on staff and on the variance report."],
    explanation: "Two reasons, each with a developed explanation, for 4 marks.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manufacturer in Bulawayo is thinking of introducing standard costing for a product made in small, varied batches. Evaluate whether the system is suitable.",
    points: ["Standards are easier to set and more reliable for repetitive, uniform output", "Varied batches need many standards, so the cost of setting and updating them is high", "Variances are less meaningful when the product keeps changing", "A judgement: probably not suitable unless the batches are similar, or use job costing and budgets instead"],
    modelAnswer: "Standard costing works best for repetitive output. With small, varied batches the business would need many standards and would update them often, which is costly, and variances would be hard to interpret. It is probably not suitable unless the batches are similar.",
    hints: ["Consider the cost of setting standards against their benefit."],
    explanation: "One mark each for the four points.",
  });

  // Struct 1: 10 marks, standard cost card
  {
    const L = [["Maize meal", 25, 0.45], ["Packaging", 1, 0.3], ["Labour", 0.05, 4.8], ["Variable overhead", 0.05, 1.2]];
    const A = L.map((l) => r2(l[1] * l[2]));
    const tot = sum(A);
    chk(tot, 11.25 + 0.3 + 0.24 + 0.06);
    const spp = 14;
    const pp = r2(spp - tot);
    const out = 3000;
    b.struct({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `Chipo Ndlovu packs maize meal in 25 kg bags in Masvingo. The standard for one bag is: maize meal 25 kg at US\\$0.45 a kilogram, one packaging bag at US\\$0.30, 3 minutes (0.05 hours) of labour at US\\$4.80 an hour and variable overhead of US\\$1.20 for each labour hour. The standard selling price is US\\\$${spp} a bag. There is no fixed overhead in the standard. The budget is ${F(out)} bags.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: A[0], wrong: [25 + 0.45, A[0] + A[1]], stem: "Calculate the standard cost of maize meal for one bag.", explanation: `25 × US\\$0.45 = ${usd(A[0])}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: r2(A[2] + A[3]), wrong: [A[2], 4.8 + 1.2], stem: "Calculate the standard cost of labour and variable overhead together for one bag.", explanation: `0.05 × 4.80 = ${usd(A[2])}; 0.05 × 1.20 = ${usd(A[3])}; together ${usd(A[2] + A[3])}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: tot, wrong: [A[0] + A[1], tot + 1], stem: "Calculate the total standard cost of one bag.", explanation: `${usd(A[0])} + ${usd(A[1])} + ${usd(A[2])} + ${usd(A[3])} = ${usd(tot)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: r2(pp * out), wrong: [r2(spp * out), r2(tot * out)], stem: "Calculate the budgeted profit for the year at the standard.", explanation: `Standard profit ${usd(spp)} - ${usd(tot)} = ${usd(pp)} a bag; × ${F(out)} = ${usd(pp * out)}.` }),
        P.manual({ label: "(e)", marks: 2, stem: "State two people whose advice should be used when setting the standard for maize meal and labour.", points: ["Purchasing manager or buyer (for the price of maize meal), or supplier quotations", "Production manager or supervisor (for labour time and waste), or time study results"], modelAnswer: "The purchasing manager for the price of maize meal and the production supervisor for the labour time and the waste allowed.", explanation: "One mark for each suitable person with a reason." }),
      ],
      hints: ["Multiply quantity by price for each element before adding.", "Standard profit is price less total standard cost."],
      explanation: "This item builds a standard cost card and the standard profit.",
    });
  }

  // Struct 2: 8 marks, flexed comparison
  {
    const dMat = 6.4, dLab = 9.6;
    const dir = r2(dMat + dLab);
    const out = 900;
    const stdAct = r2(dir * out);
    const act = 15180;
    const v = r2(stdAct - act);
    chk(stdAct, 14400);
    chk(v, -780);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `A school uniform maker in Harare has a standard direct cost of ${usd(dMat)} for materials and ${usd(dLab)} for labour on each blazer. The budget was 800 blazers. The tailors made ${F(out)} blazers and the actual direct costs (materials and labour) were ${usd(act)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: stdAct, wrong: [r2(dir * 800), act], stem: "Calculate the standard direct cost allowed for the actual output.", explanation: `${usd(dMat)} + ${usd(dLab)} = ${usd(dir)}; × ${F(out)} = ${usd(stdAct)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: Math.abs(v), wrong: [r2(act - dir * 800), act - stdAct + 1000], stem: "Calculate the total direct cost variance (the amount only).", explanation: `${usd(act)} - ${usd(stdAct)} = ${usd(Math.abs(v))}.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "The variance in (b) is:", options: [["adverse, because actual cost is above the standard allowed", "Correct."], ["favourable, because more blazers were made than were budgeted", "Making more blazers is allowed for in the standard cost of the actual output."], ["favourable, because the figure is larger than the budget", "Size alone does not decide the label."], ["adverse, because the budget was 800 blazers", "The budget is not the yardstick; the standard for 900 blazers is."]], answer: "A", explanation: "Actual cost is higher than the standard cost allowed for 900 blazers, so the variance is adverse." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain why the manager should investigate before blaming the tailors for the variance.", points: ["The total variance combines price and efficiency effects and does not show the cause", "Material prices may have risen or the standard may be out of date", "A further analysis into price, usage, rate and efficiency is needed"], modelAnswer: "The total variance does not show whether the cause was price or efficiency. Cloth prices may have risen or the standards may be out of date, so the variance should be split before anyone is blamed.", explanation: "One mark for each point." }),
      ],
      hints: ["Flex the standard to 900 blazers.", "An adverse variance means actual cost is greater than standard."],
      explanation: "This item compares actual cost with the standard cost of the actual output.",
    });
  }

  b.card("DEFINITION", "Standard cost", "The predetermined cost of one unit, built from standard quantities and standard prices or rates.");
  b.card("DEFINITION", "Standard costing", "A costing system that compares actual cost with standard cost and reports the variances for investigation.");
  b.card("DEFINITION", "Standard cost card", "A record of the standard quantity, price and cost of each element of one unit, with the standard selling price and profit.");
  b.card("CONCEPT", "Ideal standard", "Assumes perfect conditions: no waste, idle time or breakdowns. Usually gives adverse variances and demotivates.");
  b.card("CONCEPT", "Attainable standard", "An efficient but achievable standard that allows for normal waste and rest. Usually the most motivating.");
  b.card("CONCEPT", "Current and basic standards", "A current standard reflects present conditions and prices. A basic standard is left unchanged for a long time and shows trends.");
  b.card("FORMULA", "Standard cost per unit", "Σ (standard quantity × standard price) for materials + standard hours × standard rate for labour + overhead absorbed per unit.");
  b.card("CONCEPT", "Flex to actual output", "Compare actual cost with the standard cost of the actual output, not with the original budget.");
  b.card("CONCEPT", "Management by exception", "Only significant variances are investigated, so management time is spent where it matters.");
});
