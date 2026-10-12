// W4b: budget.purpose-behaviour
import { concept, P, table, chk, r2, costing } from "../lib.mjs";
import { mc, F, usd, p2 } from "../tables/w4b-lib.mjs";

concept("aacc.budget.purpose-behaviour", { file: "budget/purpose-behaviour", keyPrefix: "budget.purpose-behaviour" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which purpose of budgeting is served by comparing actual results with the budget each month?",
    ok: ["Control", "Correct: variances show where action is needed."],
    bad: [["Authorisation", "Authorisation gives permission to spend, before the spending."], ["Communication", "Communication tells managers what is expected."], ["Forecasting", "A forecast predicts; it is not the monthly comparison."]],
    explanation: "Budgetary control compares actual with budget and acts on the variances.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a limiting (principal budget) factor?",
    ok: ["A resource or demand that restricts what the business can do", "Correct: it limits all other budgets."],
    bad: [["The largest single expense in the budget for the whole financial year", "The size of an expense does not make it a limit."], ["A rule that sets the date of the budget", "It is not a rule about timing."], ["The difference between actual and budget", "That is a variance."]],
    explanation: "The limiting factor, for example demand or machine hours, is identified first.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of participative budgeting?",
    ok: ["Managers are more committed to targets they helped to set", "Correct: involvement improves motivation."],
    bad: [["It removes all budget slack", "Participation can actually encourage slack."], ["It is the fastest method of preparing a budget for the whole firm", "Consultation takes longer than imposing figures."], ["It means the owner need not approve the budget", "Senior approval is still needed."]],
    explanation: "Participation brings knowledge and commitment, though it may increase slack and take longer.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A depot manager adds a safety margin to his cost estimate so that the budget is easy to meet. What is this called?",
    ok: ["Budget slack", "Correct: padding the budget."],
    bad: [["Budget variance", "A variance is the difference between actual and budget."], ["A flexible budget", "A flexible budget changes with activity level."], ["The master budget", "The master budget combines the operating budgets."]],
    hints: ["The word describes a deliberate cushion."],
    explanation: "Slack is the deliberate overstatement of costs (or understatement of sales) in a budget.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A tailor in Gweru can sell 6,500 shirts but has materials for only 3,800 and machine time for 5,200. Which factor limits the production budget?",
    ok: ["Materials", "Correct: it allows the fewest shirts (3,800)."],
    bad: [["Sales demand", "Demand is 6,500, higher than the other limits."], ["Machine time", "Machines can make 5,200, more than the materials allow."], ["No factor limits the budget", "Materials limit production to 3,800 shirts."]],
    hints: ["The lowest figure is the limit."],
    explanation: "The smallest quantity (3,800 shirts, from materials) limits the plan.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "A cold-storage business fixes a budget in January for the whole year. Prices then rise sharply in March. Which limitation of budgets does this show?",
    ok: ["A budget can become out of date when conditions change", "Correct: rigid annual budgets may not match the new conditions."],
    bad: [["Budgets cannot be prepared on spreadsheets or other software", "Spreadsheets can be used for budgeting."], ["A budget cannot be used for control", "Budgets can be used, but they must be updated."], ["Budgets are only prepared by accountants", "Managers prepare budgets with accountants."]],
    hints: ["Conditions changed after the plan was made."],
    explanation: "A fixed annual budget may be unrealistic if prices or demand change; a revised or rolling budget may be needed.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Managers are paid a bonus if their department spends less than budget. What is the most likely behavioural effect?",
    ok: ["Managers may overstate their cost estimates to create slack", "Correct: padded budgets are easier to beat."],
    bad: [["Managers will understate their cost estimates to look careful", "Understating makes the bonus harder to win."], ["Budgets will become more accurate", "The bonus rewards low spending against the budget, not accuracy."], ["The budget will no longer be needed", "The bonus depends on the budget."]],
    hints: ["Think about how to make a target easy to meet."],
    explanation: "When rewards depend on beating the budget, managers have an incentive to pad it.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The sales budget is always the first budget prepared, whatever the business.", answer: false, explanation: "False. The first budget is the one for the limiting factor, which is often sales but may be machine hours, materials or cash." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A budget may give a manager authority to spend up to an agreed limit.", answer: true, explanation: "True. Authorisation is one of the purposes of a budget." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each purpose of a budget to the example.",
    pairs: ["Co-ordination", "Communication", "Motivation", "Authorisation"],
    right: ["Production budget agrees with the sales budget and stores capacity", "Managers learn the targets for the year", "A bonus is paid for meeting an achievable target", "The depot may spend up to its approved limit"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each purpose describes a different way a budget helps management.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Budgets that are too {{blank:a}} to achieve can demotivate staff, while budgets that are too {{blank:b}} give no incentive to improve.",
    blanks: [{ id: "a", accepted: ["tight"], choices: ["tight", "easy"] }, { id: "b", accepted: ["easy"], choices: ["tight", "easy"] }],
    explanation: "Targets should be demanding but achievable.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the process of comparing actual results with the budget and taking action on the differences.", accepted: ["budgetary control", "budget control"], explanation: "It is budgetary control." });

  {
    const need = 30000, req = 34500;
    const slack = req - need, pct = (slack / need) * 100;
    chk(pct, 15, 1e-9);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: pct, calculator: true, wrong: [(slack / req) * 100, slack],
      stem: `A department needs ${usd(need)} to operate for the year but its manager asks for a budget of ${usd(req)}. Calculate the budget slack as a percentage of the realistic need, to one decimal place.`,
      hints: ["Slack = requested - needed."],
      explanation: `Slack = ${F(req)} - ${F(need)} = ${F(slack)}. As a percentage of the need: ${F(slack)} ÷ ${F(need)} × 100 = ${pct.toFixed(1)}%. Using the requested amount as the base gives ${((slack / req) * 100).toFixed(1)}%.` });
  }
  {
    const u = 1200, h = 3.5, avail = 3800;
    const need = u * h, short = need - avail;
    chk(short, 400);
    b.num({ d: 3, skill: "APPLICATION", kind: "hours", value: short, dp: 0, wrong: [need, avail], calculator: true,
      stem: `A Masvingo engineering shop expects to sell ${F(u)} units, each needing 3.5 machine hours. ${F(avail)} machine hours are available. By how many hours does the requirement exceed the machine hours available?`,
      hints: ["Hours needed = units × hours per unit."],
      explanation: `Needed = ${F(u)} × 3.5 = ${F(need)} hours. Available ${F(avail)}. Shortfall = ${F(short)} hours. The total needed (${F(need)}) is not the shortfall.` });
  }
  {
    const kg = 9000, per = 2.5;
    const max = kg / per;
    chk(max, 3600);
    b.num({ d: 3, skill: "APPLICATION", kind: "units", value: max, calculator: true, wrong: [kg, kg * per],
      stem: `A bakery in Bulawayo has only ${F(kg)} kg of flour available for the period and each tray of rolls needs 2.5 kg. If flour is the limiting factor, what is the maximum number of trays that can be budgeted?`,
      hints: ["Divide the resource by the use per tray."],
      explanation: `${F(kg)} ÷ 2.5 = ${F(max)} trays. Multiplying instead of dividing gives ${F(kg * per)}.` });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three purposes of a budget.",
    points: ["Planning the activities of the business", "Controlling by comparing actual results with the budget", "Co-ordinating, communicating or motivating (any one with a reason)"],
    modelAnswer: "A budget plans activities, controls them by comparing actual with budget, and co-ordinates departments.",
    explanation: "One mark for each purpose.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 4,
    stem: "Explain one advantage and one disadvantage of allowing managers to take part in setting their own budgets.",
    points: ["Advantage: managers know their area and accept targets they helped to set", "Developed: this improves motivation and the accuracy of the figures", "Disadvantage: managers may build in slack to make the targets easy", "Developed: this wastes resources and makes the budget a poor control"],
    modelAnswer: "Managers know their own area and are more committed to targets they have agreed, which improves accuracy and motivation. However, they may build in slack, which wastes resources and weakens control.",
    hints: ["Give each point and then explain its effect."],
    explanation: "One mark for each point and one mark for each development.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate whether a small market-stall business should prepare a detailed annual budget.",
    points: ["A budget gives planning and control, for example showing cash shortages early", "A small business has limited time and may not need detailed budgets for every item", "Conditions change quickly for a small stall, so a rigid budget goes out of date", "Judgement: prepare a simple budget, especially a cash budget, and review it frequently"],
    modelAnswer: "A budget helps planning and shows cash problems early, but a detailed annual budget costs time and may be out of date quickly. A simple budget, with a cash budget reviewed often, is the best compromise.",
    hints: ["Weigh the benefit against the cost and rigidity."],
    explanation: "One mark for each point.",
  });

  // Struct 1 (10 marks)
  {
    const wallets = { d: 1800, h: 0.5, c: 3 }, belts = { d: 1200, h: 1, c: 4.5 }, avail = 1900;
    const needed = wallets.d * wallets.h + belts.d * belts.h;
    chk(needed, 2100);
    const ranked = costing.rankByLimitingFactor([{ name: "wallet", contributionPerUnit: wallets.c, resourcePerUnit: wallets.h }, { name: "belt", contributionPerUnit: belts.c, resourcePerUnit: belts.h }]);
    chk(ranked[0].name === "wallet" ? 1 : 0, 1);
    const wHrs = wallets.d * wallets.h, left = avail - wHrs;
    const beltUnits = left / belts.h;
    chk(beltUnits, 1000);
    const contrib = wallets.d * wallets.c + beltUnits * belts.c;
    chk(contrib, 9900);
    b.struct({
      d: 4, skill: "APPLICATION", calculator: true,
      stem: `Rudo Leather Works in Gweru expects demand of ${F(wallets.d)} wallets and ${F(belts.d)} belts. A wallet needs 0.5 labour hours and earns a contribution of US\\$3.00; a belt needs 1 hour and earns US\\$4.50. Only ${F(avail)} labour hours are available.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "hours", value: needed, dp: 0, wrong: [avail, wallets.d + belts.d], stem: "Calculate the labour hours needed to meet all the demand.", explanation: `${F(wallets.d)} × 0.5 + ${F(belts.d)} × 1 = ${F(wHrs)} + ${F(belts.d)} = ${F(needed)} hours.` }),
        P.mcq({ label: "(b)", marks: 1, stem: "The limiting factor is:", options: [["labour hours", "Correct: 2,100 hours are needed but 1,900 are available."], ["sales demand", "All of the demand cannot be met, so demand is not the limit."], ["contribution", "Contribution is a result, not a resource."], ["there is no limiting factor", "Hours are short."]], answer: "A", explanation: "Requirements exceed the labour hours available." }),
        P.num({ label: "(c)", marks: 2, kind: "units", value: beltUnits, wrong: [belts.d, left], stem: "The wallets earn the higher contribution per hour, so all wallets are made first. How many belts can then be made with the remaining hours?", explanation: `Wallets use ${F(wHrs)} hours. Remaining ${F(avail)} - ${F(wHrs)} = ${F(left)} hours, so ${F(beltUnits)} belts (1 hour each).` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: contrib, wrong: [wallets.d * wallets.c + belts.d * belts.c, wallets.d * wallets.c], stem: "Calculate the total budgeted contribution.", explanation: `Wallets ${F(wallets.d)} × 3.00 = ${F(wallets.d * wallets.c)}; belts ${F(beltUnits)} × 4.50 = ${F(beltUnits * belts.c)}; total ${usd(contrib)}.` }),
        P.manual({ label: "(e)", marks: 3, stem: "Suggest two ways in which the business might overcome the shortage of labour hours.", points: ["Pay overtime or recruit extra workers", "Subcontract some of the belts to another leatherworker", "Raise the price of belts to reduce demand to what can be made"], modelAnswer: "The business could pay overtime or hire workers, subcontract some belts to another maker, or raise the belt price so that demand falls.", explanation: "One mark for each way, up to 3." }),
      ],
      hints: ["Compare hours needed with hours available.", "Make the product with the higher contribution per hour first."],
      explanation: "This item identifies a limiting factor and adjusts the production budget.",
    });
  }

  // Struct 2 (8 marks)
  {
    const need = 18000, req = 21600, actual = 18900;
    const slack = req - need, vS = req - actual, vR = need - actual;
    chk(slack, 3600); chk(vS, 2700); chk(vR, -900);
    b.struct({
      d: 4, skill: "ANALYSIS", calculator: true,
      stem: `The manager of a school hostel in Chinhoyi needs ${usd(need)} to run the hostel for a term but submits a budget request for ${usd(req)}, which the school accepts. Actual costs for the term are ${usd(actual)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "money", value: slack, wrong: [req, actual - need], stem: "Calculate the budget slack.", explanation: `${F(req)} - ${F(need)} = ${usd(slack)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: vS, wrong: [vR, slack], stem: "Calculate the favourable variance reported against the accepted budget (amount only).", explanation: `${F(req)} - ${F(actual)} = ${usd(vS)} favourable.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: Math.abs(vR), wrong: [vS, slack], stem: "Calculate the adverse variance that would have been reported against the realistic budget (amount only).", explanation: `${F(need)} - ${F(actual)} = -${F(Math.abs(vR))}: ${usd(Math.abs(vR))} adverse.` }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why budget slack is a problem for the school.", points: ["The report hides the real overspending, so control is weak", "Resources are tied up in the hostel that other activities could use"], modelAnswer: "The favourable variance hides a real overspend, so the school wrongly thinks the hostel is well run, and money is tied up that other departments could use.", explanation: "One mark for each point." }),
      ],
      hints: ["Slack = requested - realistic."],
      explanation: "This item shows how slack distorts a variance report.",
    });
  }

  b.card("DEFINITION", "Budget", "A quantified plan for a future period, prepared in advance and used for planning, co-ordination and control.");
  b.card("DEFINITION", "Budgetary control", "Comparing actual results with the budget, calculating variances and taking action.");
  b.card("DEFINITION", "Limiting (principal budget) factor", "The resource or demand that restricts the business's plans; its budget is prepared first.");
  b.card("CONCEPT", "Purposes of budgeting", "Planning, co-ordination, communication, control, motivation, authorisation.");
  b.card("DEFINITION", "Budget slack", "Deliberately overstating costs or understating sales so that the budget is easy to meet.");
  b.card("CONCEPT", "Participative budgeting", "Managers help set their own budgets: better commitment and information, but more risk of slack.");
  b.card("CONCEPT", "Imposed budgeting", "Senior managers set the figures: quick and consistent but may be rejected by managers.");
  b.card("CONCEPT", "Disadvantages of budgets", "Time and cost, rigidity when conditions change, slack, conflict between departments, spending up to the limit.");
  b.card("CONCEPT", "Spreadsheet budgets", "Quick to build and good for what-if questions, but formula errors and weak assumptions remain a risk.");
});
void table; void r2; void p2;
