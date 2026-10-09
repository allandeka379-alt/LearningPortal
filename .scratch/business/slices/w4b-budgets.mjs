// W4b: budgeting and budgets (BES 7.5.9, Form 4).
import { concept, P, money, fmt, r2, sum, table, check } from "../lib.mjs";

concept("bus.finance.budgets", { file: "finance/budgets", keyPrefix: "finance.budgets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **budget**?",
    options: [
      ["A financial plan for a future period", "Correct: a budget sets out expected income, spending or output in advance."],
      ["A record of last year's sales and costs", "That is a set of accounts, which records the past."],
      ["A loan given by a bank to a new enterprise", "A loan is a source of finance, not a plan."],
      ["A list of the assets owned by the business", "That is part of a statement of financial position."],
    ],
    answer: "A",
    explanation: "A budget is a plan, in money or units, for a future period.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which budget is usually prepared **first**?",
    options: [
      ["The sales budget", "Correct: planned sales decide how much to produce and buy."],
      ["The purchases budget", "Purchases depend on how much will be produced, which depends on sales."],
      ["The production budget", "Production depends on planned sales, so sales come first."],
      ["The cash budget", "The cash budget uses figures from all the other budgets."],
    ],
    answer: "A",
    explanation: "Sales drive everything else: production, purchases and cash all depend on how much the enterprise expects to sell.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Actual spending on electricity was lower than the budgeted amount. What type of variance is this?",
    options: [
      ["Favourable", "Correct: lower costs than planned increase profit."],
      ["Adverse", "Adverse variances reduce profit, such as costs above budget."],
      ["Fixed", "Fixed is a type of cost, not a variance."],
      ["Negative", "The boards describe variances as favourable or adverse."],
    ],
    answer: "A",
    explanation: "A cost below budget raises profit, so the variance is favourable.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which budget shows the quantity and cost of raw materials an enterprise plans to buy?",
    options: [
      ["Purchases budget", "Correct: it plans the materials or goods to be bought."],
      ["Sales budget", "The sales budget plans units sold and revenue."],
      ["Production budget", "It plans the units to make, not the materials to buy."],
      ["Personal budget", "A personal budget plans a household's income and spending."],
    ],
    answer: "A",
    explanation: "The purchases budget follows from the production budget and shows what must be bought.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A sales team is given a target far higher than it could ever reach. What is the **most** likely effect?",
    options: [
      ["Staff become demotivated and stop trying to reach it", "Correct: unrealistic targets demotivate."],
      ["Sales rise because staff always work harder for big targets", "Targets that cannot be reached usually reduce effort."],
      ["The enterprise's costs automatically fall", "A sales target does not change costs by itself."],
      ["The budget becomes more accurate than before", "An unrealistic figure makes the budget less accurate."],
    ],
    answer: "A",
    explanation: "Budgets motivate only when targets are challenging but achievable.",
    hints: ["How would you feel about a target you could never meet?"],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "A shop's advertising spending was US\\$80 below budget, but its sales revenue was US\\$900 below budget. What is the **best** comment?",
    options: [
      ["The saving on advertising may have helped cause the fall in sales", "Correct: a favourable cost variance can lead to an adverse revenue variance."],
      ["Both variances are favourable, so the shop is doing well", "Revenue below budget is an adverse variance."],
      ["The shop should cut advertising even further next month", "Cutting advertising further could reduce sales more."],
      ["Variances on costs never have any link with sales revenue", "Variances are often linked, as here."],
    ],
    answer: "A",
    explanation: "Spending less on advertising looks favourable, but if it reduced sales the overall effect on profit is harmful.",
    hints: ["Is every favourable variance good news?"],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **limitation** of budgeting?",
    options: [
      ["Budgets are based on forecasts that may turn out to be wrong", "Correct: unexpected changes in prices or demand make budgets inaccurate."],
      ["Budgets give managers clear targets to work towards", "That is a benefit of budgeting."],
      ["Budgets help an enterprise to spot cash shortages early", "That is a benefit of budgeting."],
      ["Banks often ask to see budgets before lending money", "Being able to show a budget helps an enterprise raise finance."],
    ],
    answer: "A",
    explanation: "Budgets are estimates; when conditions change they may be unrealistic.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A budget holder is the person responsible for keeping to a particular budget.",
    answer: true,
    explanation: "True. For example, the production manager is the holder of the production budget.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If actual sales revenue is higher than the budgeted sales revenue, the variance is adverse.",
    answer: false,
    explanation: "False. Revenue above budget increases profit, so the variance is favourable.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each budget with what it shows.",
    pairs: [
      ["Sales budget", "Expected units sold and sales revenue each month"],
      ["Production budget", "The number of units to be made each month"],
      ["Purchases budget", "The materials or goods to be bought and their cost"],
      ["Cash budget", "Expected cash inflows, outflows and balances each month"],
    ],
    explanation: "Sales → production → purchases → cash: each budget answers a different planning question.",
  });
  b.fib({
    d: 2,
    stem: "Complete the formula for the production budget.",
    template: "Units to produce = planned sales + planned {{blank:a}} inventory − {{blank:b}} inventory",
    blanks: [
      { id: "a", accepted: ["closing"], choices: ["closing", "opening", "average", "minimum"] },
      { id: "b", accepted: ["opening"], choices: ["opening", "closing", "maximum", "average"] },
    ],
    explanation: "Make enough for planned sales plus the stock wanted at the end, less what is already in store at the start.",
  });
  const s1 = [250, 280, 310], p1 = 4;
  const r1 = s1.map((u) => u * p1);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: sum(r1), daily: true,
    stem: `A poultry project plans to sell ${s1[0]} trays of eggs in April, ${s1[1]} in May and ${s1[2]} in June at ${money(p1)} a tray. Calculate the total budgeted sales revenue for the three months.`,
    wrong: [sum(s1), r1[2]],
    explanation: `${sum(s1)} trays × ${money(p1)} = ${money(sum(r1))}.`,
  });
  const ps = 180, pc = 35, po = 25;
  const prod = ps + pc - po;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "units", value: prod,
    stem: `A sandal maker plans to sell ${ps} pairs in October. It has ${po} pairs in store at the start of October and wants ${pc} pairs in store at the end. Calculate how many pairs it must make in October.`,
    wrong: [ps + po - pc, ps],
    explanation: `${ps} + ${pc} − ${po} = ${prod} pairs.`,
    workedSolution: `1. Units to produce = planned sales + closing inventory − opening inventory.\n2. = ${ps} + ${pc} − ${po} = ${prod} pairs.`,
    hints: ["Add the stock wanted at the end.", "Subtract the stock already held at the start."],
  });
  const bud = 2800, act = 3150;
  b.calc({
    d: 2, skill: "APPLICATION", kind: "money", value: act - bud,
    stem: `A welding workshop budgeted ${money(bud)} for steel in May but actually spent ${money(act)}. Calculate the variance in US dollars.`,
    wrong: [act + bud],
    explanation: `${fmt(act)} − ${fmt(bud)} = ${money(act - bud)}. Spending above budget is an adverse variance.`,
    workedSolution: `1. Variance = actual − budget = ${fmt(act)} − ${fmt(bud)} = ${money(act - bud)}.\n2. Cost is above budget, so the variance is adverse.`,
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** benefits to a small enterprise of preparing budgets.",
    points: [
      "Benefit 1, e.g. planning / spotting cash shortages early (1)",
      "Explained: owner can arrange an overdraft or delay spending before the problem happens (1)",
      "Benefit 2, e.g. control / targets / raising finance (1)",
      "Explained: comparing actual with budget shows overspending; bank sees the plan is realistic (1)",
    ],
    modelAnswer: "Budgets help the owner plan, because a cash budget shows months when cash will be short, so an overdraft can be arranged in advance. They also help control, because comparing actual costs with the budget shows where money is being overspent.",
    explanation: "Planning, control, targets, coordination and raising finance are the main benefits.",
    hints: ["What can the owner do before and after the period?"],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manager says: \"Our budget is fixed for the year. If something is not in the budget, we will not spend money on it.\" Explain **one** benefit and **one** problem of this approach.",
    points: [
      "Benefit: firm control of spending / costs kept within plan (1)",
      "Developed: avoids waste and protects cash and profit (1)",
      "Problem: inflexible / cannot respond to changes or opportunities (1)",
      "Developed, e.g. a cheap bulk-buying offer or urgent repair is refused, losing sales or profit (1)",
    ],
    modelAnswer: "Keeping strictly to the budget controls spending, so money is not wasted and cash stays within plan. But it is inflexible: if a machine breaks down or a supplier offers a cheap bulk deal, the firm may refuse sensible spending and lose sales or profit.",
    explanation: "Budgets should guide decisions but be reviewed when conditions change.",
    hints: ["What happens when conditions change during the year?"],
  });
  // Structured 1: sales and production budgets for a peanut butter co-operative.
  const months = ["July", "August", "September"];
  const sales = [600, 640, 700], open = [80, 90, 100], close = [90, 100, 70], price = 3;
  for (let i = 1; i < 3; i += 1) check("chain", open[i], close[i - 1]);
  const prodN = sales.map((s, i) => s + close[i] - open[i]);
  const tbl = table(["Jars", ...months], [["Planned sales", ...sales], ["Planned closing inventory", ...close], ["Opening inventory", ...open]]);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `A women's co-operative in Masvingo makes peanut butter. It sells each jar for ${money(price)}. These are its plans for the next quarter.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, type: "CALCULATION", kind: "money", value: sum(sales.map((s) => s * price)), stem: "Calculate the budgeted sales revenue for the quarter.", wrong: [sum(prodN.map((x) => x * price))], explanation: `${sum(sales)} jars × ${money(price)} = ${money(sum(sales) * price)}.` }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", kind: "units", value: prodN[0], stem: "Calculate the number of jars to be produced in July.", wrong: [sales[0] + open[0] - close[0]], explanation: `${sales[0]} + ${close[0]} − ${open[0]} = ${prodN[0]}.` }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "units", value: prodN[2], stem: "Calculate the number of jars to be produced in September.", wrong: [sales[2] + open[2] - close[2]], explanation: `${sales[2]} + ${close[2]} − ${open[2]} = ${prodN[2]}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain how the production budget helps the person who buys the groundnuts.", points: ["It shows how many jars will be made each month (1)", "So the right quantity of groundnuts can be bought at the right time: no shortages or waste (1)"] }),
      P.manual({
        label: "(e)", marks: 4, stem: "Discuss whether the co-operative should rely on these budgets when planning for the quarter.",
        points: ["Yes: gives targets and coordinates sales, production and buying (1)", "Helps plan cash and borrowing (1)", "But forecasts may be wrong, e.g. groundnut prices or demand change (1)", "Conclusion: use them but review monthly against actual results (1)"],
      }),
    ],
    explanation: `Revenue ${money(sum(sales) * price)}; July production ${prodN[0]}; September ${prodN[2]}. Budgets coordinate buying and production but must be reviewed.`,
    hints: ["Revenue = units × price.", "Production = sales + closing inventory − opening inventory."],
  });
  // Structured 2: variances.
  const vrows = [["Sales revenue", 9000, 9800], ["Cost of materials", 3600, 4100], ["Wages", 2000, 2000], ["Transport", 500, 420]];
  const vtbl = table(["Item", "Budget US\\$", "Actual US\\$"], vrows);
  const vbP = (9000 - 3600 - 2000 - 500), vaP = (9800 - 4100 - 2000 - 420);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780, calculator: true,
    stem: `Tendai runs a small brick-making business near Chinhoyi. He compares his budget with the actual results for March.\n\n${vtbl}`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: 9800 - 9000, stem: "Calculate the sales revenue variance.", wrong: [9800 + 9000], explanation: "9,800 − 9,000 = 800 (favourable)." }),
      P.mcq({ label: "(b)", marks: 1, stem: "The variance on the cost of materials is:", options: [["US\\$500 adverse", "Correct: actual cost is 500 above budget."], ["US\\$500 favourable", "Higher costs reduce profit, so it is adverse."], ["US\\$7,700 adverse", "That adds the two figures instead of finding the difference."], ["Nil", "Actual and budget differ."]], answer: "A" }),
      P.num({ label: "(c)", marks: 2, type: "CALCULATION", kind: "money", value: vaP - vbP, stem: "Using all four items, calculate how much higher the actual profit was than the budgeted profit.", wrong: [9800 - 9000], explanation: `Budgeted profit ${fmt(vbP)}; actual profit ${fmt(vaP)}; difference ${money(vaP - vbP)}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **two** possible reasons for the variance on materials.", points: ["Price of cement / sand rose (1)", "More bricks were made to meet higher sales / wastage (1)"] }),
      P.manual({ label: "(e)", marks: 4, stem: "Tendai says the material variance shows his supplier is too expensive and he should change supplier. Evaluate this view.", points: ["Higher sales means more materials were needed, so part of the variance is expected (1)", "Check the price per unit against other suppliers before changing (1)", "Changing supplier risks quality / reliability (1)", "Justified judgement (1)"] }),
    ],
    explanation: `Sales variance US\\$800 favourable; materials US\\$500 adverse; transport US\\$80 favourable; profit ${money(vaP - vbP)} above budget.`,
    hints: ["Variance = difference between actual and budget.", "Profit = revenue − costs."],
  });
  b.card("DEFINITION", "Budget", "A financial plan for a future period, in money or units, of expected income, spending or output.");
  b.card("CONCEPT", "Types of budget", "Sales (units and revenue), production (units to make), purchases (materials to buy), cash (inflows, outflows, balances).");
  b.card("FORMULA", "Production budget", "Units to produce = planned sales + planned closing inventory − opening inventory.");
  b.card("DEFINITION", "Variance", "The difference between a budgeted figure and the actual figure.");
  b.card("CONCEPT", "Favourable and adverse variances", "Favourable: revenue above budget or costs below budget. Adverse: revenue below budget or costs above budget.");
  b.card("CONCEPT", "Benefits of budgeting", "Planning, control, targets and motivation, coordination of departments, support when raising finance.");
  b.card("CONCEPT", "Limits of budgeting", "Based on forecasts that may be wrong; time-consuming; inflexible; unrealistic targets demotivate.");
  b.card("DEFINITION", "Budget holder", "The person responsible for keeping to a particular budget.");
});
