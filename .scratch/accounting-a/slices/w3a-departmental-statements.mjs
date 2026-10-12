// W3a: departmental.statements (ZIMSEC only: tagged automatically)
import { concept, P, table, sum, r2, fmt, money, chk } from "../lib.mjs";
import { mc } from "../tables/w3a-lib.mjs";
import { deptModel } from "../tables/w3a-models.mjs";

const pct = (a, c) => Math.round((a / c) * 1000) / 10;

concept("aacc.departmental.statements", { file: "departmental/statements", keyPrefix: "departmental.statements" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a departmental statement of profit or loss, what is shown in the total column?",
    ok: ["The sum of all the departments' figures", "Correct: it gives the result of the whole business."],
    bad: [["The figures for the largest department only", "The total includes every department."], ["The average of all the departments' figures", "Totals are added, not averaged."], ["The owner's drawings and capital figures", "The owner's drawings are not part of the statement."]],
    explanation: "Each row of the total column equals the sum of the departmental columns, and the total net profit is the profit of the whole business.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How many statements of financial position does a business with three departments normally prepare?",
    ok: ["One for the business as a whole", "Correct: assets and liabilities are not split by department."],
    bad: [["Three, one for each department", "Only the profit is split between departments."], ["Two, one for trading and one for apportioned items", "No such split exists."], ["None, because departments do not have assets", "The business still has a statement of financial position."]],
    explanation: "Profit is analysed by department, but the business has one statement of financial position.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "How is the gross profit margin of a department calculated?",
    ok: ["Gross profit ÷ its revenue × 100", "Correct: it shows the profit per dollar of sales."],
    bad: [["Net profit ÷ total revenue of the business × 100", "That is a net profit percentage for the business."], ["Gross profit ÷ cost of sales of the department × 100", "That is the mark-up."], ["Revenue ÷ gross profit × 100", "The ratio is upside down."]],
    explanation: "The gross profit margin is gross profit as a percentage of the department's revenue.",
  });
  const rev = 70400, cos = 48900;
  const gp = r2(rev - cos);
  chk(gp, 21500);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A department had sales of ${money(74000)} and returns inwards of ${money(3600)}. Its cost of sales was ${money(cos)}. What was its gross profit?`,
    ok: [money(gp), "Correct: revenue 70,400 - 48,900."],
    bad: [[money(r2(74000 - cos)), "Returns inwards have not been deducted."], [money(r2(74000 + 3600 - cos)), "Returns inwards have been added."], [money(r2(rev + cos)), "The cost of sales has been added."]],
    hints: ["Revenue = sales - returns inwards."],
    explanation: "Revenue = 74,000 - 3,600 = 70,400; gross profit = 70,400 - 48,900 = 21,500.",
  });
  const g = 21650, cm = 640, own = 5350, appo = 9300;
  const np = r2(g + cm - own - appo);
  chk(np, 7640);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A department has gross profit of ${money(g)} and a share of commission received of ${money(cm)}. Its own wages are ${money(own)} and the common expenses apportioned to it are ${money(appo)}. What is its net profit?`,
    ok: [money(np), "Correct: 21,650 + 640 - 5,350 - 9,300."],
    bad: [[money(r2(g - own - appo)), "The commission received has been left out."], [money(r2(g + cm - appo)), "The department's own wages have been left out."], [money(r2(g - cm - own - appo)), "The commission has been deducted instead of added."]],
    hints: ["Income is added, expenses are deducted."],
    explanation: "21,650 + 640 - 5,350 - 9,300 = 7,640.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A department shows a small net loss after apportioned expenses but a positive gross profit. What should the manager consider first before closing it?",
    ok: ["Its contribution after avoidable costs only", "Correct: apportioned costs may continue."],
    bad: [["The net loss, because the loss is the only relevant figure", "The loss includes costs that would continue."], ["The department's sales as a share of total sales only", "Share of sales does not show profitability."], ["The owner's drawings", "Drawings are unrelated to the decision."]],
    hints: ["Which costs disappear if the department closes?"],
    explanation: "The decision depends on the contribution: the extra profit the department earns after the costs that would be saved by closing it.",
  });
  const gpx = 7500, ownx = 3650, ap = 6200;
  const netx = r2(gpx - ownx - ap);
  const contr = r2(gpx - ownx);
  chk(netx, -2350);
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: `A department shows a net loss of ${money(-netx)} after charging ${money(ap)} of common costs that would continue if it closed. Its gross profit is ${money(gpx)} and its own costs are ${money(ownx)}. If it closed, total net profit of the business would:`,
    ok: [`fall by ${money(contr)}`, "Correct: contribution 7,500 - 3,650 = 3,850 is lost."],
    bad: [[`rise by ${money(-netx)}`, "The loss includes costs that would continue."], [`rise by ${money(ap)}`, "The common costs do not disappear."], [`fall by ${money(-netx)}`, "The fall is the contribution, not the net loss."]],
    hints: ["Closing removes the contribution but not the common costs."],
    explanation: "The department contributes 3,850 towards the common costs, so closing it reduces total profit by 3,850.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which comment is most reasonable when departmental net profits are compared?",
    ok: ["They depend on the bases used, so use with care", "Correct: different bases give different results."],
    bad: [["They are exact measures of each department's real efficiency", "Apportioned costs depend on judgement."], ["They show which department should always be closed first", "The decision needs the contribution."], ["They are of no use to management because they are not audited", "Departmental results help management even if bases are judgemental."]],
    hints: ["Think about how the common costs are shared."],
    explanation: "Because apportionment is a judgement, departmental net profits are indicative only and should be used with contributions.",
  });

  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "The total net profit in the total column of a departmental statement equals the sum of the net profits and losses of the departments.", answer: true, explanation: "True. Every row of the total column is the sum of the departmental columns." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A department with a net loss should always be closed, because it reduces the profit of the business.", answer: false, hints: ["Which costs would continue after closure?"], explanation: "False. If the department has a positive contribution, closing it reduces total profit because common costs continue." });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each item to the way it is treated in the departmental statement of profit or loss.",
    pairs: ["Wages of the staff of one department", "Rent of the whole shop", "Commission received by the whole business", "Closing inventory of a department"],
    right: ["Allocated directly to that department", "Apportioned on floor area", "Apportioned on sales", "Deducted in that department's cost of sales"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Own costs are allocated; common costs and ancillary income are apportioned; each department has its own inventory figures.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences about the statements.",
    template: "A business with departments prepares {{blank:a}} statement of financial position. The gross profit margin is gross profit divided by {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["one"], choices: ["one", "a separate", "two"] },
      { id: "b", accepted: ["revenue"], choices: ["revenue", "cost of sales", "net profit"] },
    ],
    explanation: "There is one statement of financial position; the margin uses the department's revenue.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the figure that measures the extra profit that a department earns after deducting only the costs that would be saved if it closed.",
    accepted: ["contribution", "the contribution", "departmental contribution"],
    explanation: "The contribution is the profit the department adds after its avoidable costs.",
  });

  // numerical
  const gpA = 18600, revA = 52000;
  const gm = pct(gpA, revA);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: gm, daily: true, calculator: true, wrong: [pct(gpA, revA - gpA), pct(revA - gpA, revA)],
    stem: `A department had revenue of ${money(revA)} and gross profit of ${money(gpA)}. Calculate its gross profit margin as a percentage to one decimal place.`,
    explanation: "18,600 ÷ 52,000 × 100 = 35.8%. Dividing by cost of sales gives the mark-up of 55.7%.",
  });
  const rv = 40800, np2 = -1360;
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: pct(np2, rv), calculator: true, wrong: [pct(-np2, rv), pct(np2, rv + 5000)],
    stem: `A department had revenue of ${money(rv)} and a net loss of ${money(1360)}. Calculate its net profit percentage (net profit ÷ revenue × 100) to one decimal place. Enter a loss as a negative number.`,
    hints: ["A loss gives a negative percentage."],
    explanation: "-1,360 ÷ 40,800 × 100 = -3.3%.",
  });
  const gp3 = 12400, cm3 = 380, ow3 = 5200;
  const ct = r2(gp3 + cm3 - ow3);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: ct, calculator: true, wrong: [r2(gp3 - ow3), r2(gp3 + cm3)],
    stem: `A department has gross profit of ${money(gp3)} and a share of commission received of ${money(cm3)}. Its own wages of ${money(ow3)} would be saved if it closed, but its apportioned common costs would continue. Calculate the amount by which the total net profit of the business would fall if it closed.`,
    hints: ["Contribution = gross profit + income - avoidable costs."],
    explanation: "12,400 + 380 - 5,200 = 7,580. The apportioned costs are ignored because they continue.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "State two uses of departmental accounts to the owner of a business.",
    points: ["To compare the gross and net profit of departments and find the most and least profitable", "To help decisions such as expanding, cutting costs or closing a department"],
    modelAnswer: "They show which departments are most and least profitable, and they help decisions about expansion, cost cutting or closure.",
    explanation: "One mark for each use.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why the total net profit of the business is not changed by the choice of basis for apportioning rent.",
    points: ["The total rent is fixed and is shared out in full among the departments", "A different basis changes how much each department bears", "The sum of the departmental charges is still the total rent, so total profit is the same"],
    modelAnswer: "The same total rent is shared in full whichever basis is used. A different basis changes only each department's share. The sum of the shares equals the rent, so total profit is unchanged.",
    hints: ["Does the total rent change?"],
    explanation: "One mark each for the fixed total, the changed shares and the unchanged total profit.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why gross profit margins are compared between departments.",
    points: ["The margin shows the gross profit earned on each dollar of sales", "Departments of different sizes can be compared on a common basis", "A low margin may indicate high costs of purchase or low selling prices, so management can investigate"],
    modelAnswer: "The margin shows the gross profit per dollar of sales, so departments of different sizes can be compared. A low margin suggests high purchase costs or low prices, and management can investigate.",
    hints: ["Why use a percentage rather than the gross profit in dollars?"],
    explanation: "One mark each for the measure, the comparison and the reason to investigate.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A department with a net loss of US\\$2,400 has a positive contribution of US\\$5,100. The owner proposes to close it and says that profit will rise by US\\$2,400. Evaluate her claim.",
    points: ["The loss of US\\$2,400 is after charging common costs that will continue after closure", "Closing the department would lose the contribution of US\\$5,100 and total net profit would fall by that amount", "The owner's claim is wrong; she would be worse off by US\\$5,100", "Better options: improve the department's margin, reduce its floor area, or replace it with a more profitable line"],
    modelAnswer: "The loss includes common costs that continue, so closing would lose the contribution of US\\$5,100. Total profit would fall, not rise. She should try to improve the department's margin, reduce its space or replace it with a more profitable line.",
    hints: ["Which costs would still be paid after closure?"],
    explanation: "One mark each for the common costs, the lost contribution, the verdict and an alternative.",
  });

  // Structured 1 (10 marks): closure
  const L = { gp: 9750, cm: 520, own: 4300, rent: 3400, gen: 2600, dep: 950, adv: 760 };
  const netL = r2(L.gp + L.cm - L.own - L.rent - L.gen - L.dep - L.adv);
  const conL = r2(L.gp + L.cm - L.own);
  chk(netL, -1740);
  chk(conL, 5970);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Mbare Linens is one department of Murewa Household Store. For the year its results were: gross profit US\\$${fmt(L.gp)}; share of commission received US\\$${fmt(L.cm)}; wages of the department's own staff US\\$${fmt(L.own)}; apportioned rent US\\$${fmt(L.rent)}; apportioned general wages US\\$${fmt(L.gen)}; apportioned depreciation US\\$${fmt(L.dep)}; apportioned advertising US\\$${fmt(L.adv)}. If the department closed, only its own wages would be saved.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: netL, wrong: [conL, r2(L.gp - L.own - L.rent - L.gen - L.dep - L.adv)], stem: "Calculate the net profit or loss of the department. Enter a loss as a negative number.", explanation: `${fmt(L.gp)} + ${fmt(L.cm)} - ${fmt(L.own)} - ${fmt(L.rent)} - ${fmt(L.gen)} - ${fmt(L.dep)} - ${fmt(L.adv)} = ${fmt(netL)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: conL, wrong: [-netL, L.gp], stem: "Calculate the contribution of the department.", explanation: `${fmt(L.gp)} + ${fmt(L.cm)} - ${fmt(L.own)} = ${fmt(conL)}.` }),
      P.mcq({ label: "(c)", marks: 1, stem: "What would happen to the total net profit of the business if the department closed?", options: [[`It would fall by US\\$${fmt(conL)}`, "Correct: the contribution would be lost."], [`It would rise by US\\$${fmt(-netL)}`, "The loss includes costs that would continue."], ["It would not change", "The department adds a contribution."], [`It would fall by US\\$${fmt(-netL)}`, "The fall equals the contribution."]], answer: "A", explanation: "Closing the department removes its contribution but not the common costs." }),
      P.manual({ label: "(d)", marks: 4, stem: "Advise the owner whether to close the department.", points: ["The department shows a net loss, but it earns a positive contribution towards the common costs", "The apportioned costs would continue if it closed, so total profit would fall", "Possible improvements: raise prices or the margin, reduce the floor area used or cut stock", "Recommendation: keep the department unless a better use of the space is found"], modelAnswer: `The net loss of US\\$${fmt(-netL)} arises after apportioned costs that would continue. Closing the department would reduce total profit by its contribution of US\\$${fmt(conL)}. The owner should keep it, try to raise its margin or reduce its space, and close it only if the space can earn more elsewhere.`, explanation: "One mark each for the contribution, the continuing costs, an improvement and a recommendation." }),
    ],
    hints: ["Include only avoidable costs in the contribution.", "The loss is after apportioned costs."],
    explanation: "This item tests a department's net result, its contribution and the closure decision.",
  });

  // Structured 2 (16 marks)
  const dm = deptModel({
    name: "Tendai's Trading Post", year: 2025,
    depts: [
      { name: "Clothing", sales: 84000, openInv: 9200, purchases: 51600, closeInv: 10800, direct: [{ label: "Departmental wages", amt: 8600 }] },
      { name: "Electrical", sales: 62000, openInv: 14400, purchases: 38900, closeInv: 13700, direct: [{ label: "Departmental wages", amt: 7100 }] },
    ],
    common: [
      { label: "Rent", total: 12480, basis: "floor", basisText: "Floor area (160 : 80 m²)", shares: [160, 80] },
      { label: "General wages", total: 9600, basis: "staff", basisText: "Staff (3 : 2)", shares: [3, 2] },
      { label: "Advertising", total: 3650, basis: "sales" },
    ],
    income: [{ label: "Commission received", total: 1460, basis: "sales" }],
  });
  const gmE = pct(dm.dep[1].gp, dm.dep[1].revenue);
  b.struct({
    d: 5, skill: "ANALYSIS", calculator: true,
    stem: `Tendai's Trading Post in Gweru has two departments. The figures for the year ended 31 December 2025 are below. Departmental wages are allocated directly.\n\n${table(["", "Clothing US$", "Electrical US$"], [["Sales", 84000, 62000], ["Opening inventory", 9200, 14400], ["Purchases", 51600, 38900], ["Closing inventory", 10800, 13700], ["Departmental wages", 8600, 7100]], ["l", "r", "r"]).split("US$").join("US\\$")}\n\nCommon expenses: rent US\\$${fmt(12480)} (floor area 160 m² and 80 m²); general wages US\\$${fmt(9600)} (staff 3 and 2); advertising US\\$${fmt(3650)} (sales). Commission received US\\$${fmt(1460)} is shared on sales.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: dm.dep[0].cos, wrong: [r2(dm.dep[0].cos + 9200), r2(9200 + 51600)], stem: "Calculate the cost of sales of the clothing department.", explanation: `${fmt(9200)} + ${fmt(51600)} - ${fmt(10800)} = ${fmt(dm.dep[0].cos)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: dm.dep[1].gp, wrong: [dm.dep[1].cos, r2(dm.dep[1].gp + 13700)], stem: "Calculate the gross profit of the electrical department.", explanation: `${fmt(62000)} - cost of sales ${fmt(dm.dep[1].cos)} = ${fmt(dm.dep[1].gp)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: dm.net[0], wrong: [r2(dm.net[0] - dm.income[0].parts[0]), dm.dep[0].gp], stem: "Calculate the net profit of the clothing department.", explanation: `Gross profit ${fmt(dm.dep[0].gp)} + commission ${fmt(dm.income[0].parts[0])} - wages ${fmt(8600)} - rent ${fmt(dm.common[0].parts[0])} - general wages ${fmt(dm.common[1].parts[0])} - advertising ${fmt(dm.common[2].parts[0])} = ${fmt(dm.net[0])}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: dm.net[1], wrong: [r2(dm.net[1] - dm.income[0].parts[1]), dm.dep[1].gp], stem: "Calculate the net profit of the electrical department.", explanation: `Gross profit ${fmt(dm.dep[1].gp)} + commission ${fmt(dm.income[0].parts[1])} - wages ${fmt(7100)} - rent ${fmt(dm.common[0].parts[1])} - general wages ${fmt(dm.common[1].parts[1])} - advertising ${fmt(dm.common[2].parts[1])} = ${fmt(dm.net[1])}.` }),
      P.num({ label: "(e)", marks: 2, kind: "money", value: dm.totals.net, wrong: [dm.totals.gp, r2(dm.net[0] - dm.net[1])], stem: "Calculate the total net profit of the business.", explanation: `${fmt(dm.net[0])} + ${fmt(dm.net[1])} = ${fmt(dm.totals.net)}.` }),
      P.num({ label: "(f)", marks: 2, kind: "pct", value: gmE, wrong: [pct(dm.dep[1].gp, dm.dep[1].cos), pct(dm.net[1], dm.dep[1].revenue)], stem: "Calculate the gross profit margin of the electrical department, as a percentage to one decimal place.", explanation: `${fmt(dm.dep[1].gp)} ÷ ${fmt(dm.dep[1].revenue)} × 100 = ${fmt(gmE)}%.` }),
      P.manual({ label: "(g)", marks: 2, stem: "Compare the performance of the two departments and suggest one reason for the difference.", points: [`Clothing earns net profit ${fmt(dm.net[0])} on revenue ${fmt(dm.dep[0].revenue)}; electrical earns ${fmt(dm.net[1])} on revenue ${fmt(dm.dep[1].revenue)}, so clothing is more profitable in dollars and as a percentage`, "Reason: electrical goods may carry a lower margin or occupy more of the shared costs; compare the gross profit margins and the floor area used"], modelAnswer: `Clothing earns net profit of ${fmt(dm.net[0])} and electrical ${fmt(dm.net[1])}. Clothing has the higher margin, and electrical may use more floor area and staff for its sales.`, explanation: "One mark for the comparison with figures and one for a reasoned explanation." }),
    ],
    hints: ["Cost of sales = opening inventory + purchases - closing inventory.", "Commission is shared on sales."],
    explanation: "This item tests a two-department statement of profit or loss with apportionment and a comparison of the results.",
  });
  void sum;

  b.card("DEFINITION", "What is a **departmental statement of profit or loss**?", "A statement with a column for each department and a total column, from revenue to net profit.");
  b.card("FACT", "Rows of the total column", "Each row of the total column is the sum of the departmental columns.");
  b.card("FORMULA", "Gross profit margin of a department", "Gross profit ÷ revenue of the department × 100.");
  b.card("FACT", "Statement of financial position for a business with departments", "One statement for the whole business; only the profit is analysed by department.");
  b.card("DEFINITION", "What is the **contribution** of a department?", "Gross profit and other income earned by the department less the costs that would be saved if it closed.");
  b.card("CONCEPT", "Closing a loss-making department", "Compare its contribution: common costs continue after closure, so closing a department with a positive contribution reduces total profit.");
  b.card("FACT", "Treatment of expenses", "Own (departmental) expenses are allocated; common expenses and ancillary income are apportioned.");
  b.card("CONCEPT", "Limits of departmental results", "They depend on the bases chosen to apportion common costs, so they are indicative only.");
  b.card("FORMULA", "Net profit of a department", "Gross profit + share of ancillary income - allocated expenses - apportioned common expenses.");
});
