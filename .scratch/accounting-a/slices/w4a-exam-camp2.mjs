// W4a exam-format items: Cambridge Paper 2 question 4 (CAM_P2_COST, 30 marks, AS cost and management accounting), six items:
// (1) materials, labour and JIT; (2) absorption and over/under absorption; (3) marginal costing and reconciliation;
// (4) break-even and a special-order decision; (5) limiting factor; (6) job and batch cost sheet.
import { concept, P, EXAM, checkExam, CAM, chk, r2, table, statement, inventory, tAccount, cvp, costing } from "../lib.mjs";
import { F, usd, p1, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.materials-labour-jit", { file: "exam/w4a-camp2", keyPrefix: "exam.w4a-camp2", applies: CAM }, (b) => {
  const Z = EXAM.CAM_P2_COST;
  const base = { d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true, paper: "Cambridge Paper 2" };

  // ===================================================================================================
  // Item 1: materials, labour and JIT (Harare Furniture Works)
  {
    const txs = [{ type: "receipt", qty: 300, unitCost: 6.4 }, { type: "issue", qty: 260 }, { type: "receipt", qty: 220, unitCost: 6.9 }, { type: "issue", qty: 300 }];
    const inv = inventory.fifoPerpetual(txs, { qty: 120, unitCost: 6 });
    chk(inv.issues[0].cost, 1616); chk(inv.issues[1].cost, 1990); chk(inv.closingValue, 552);
    const rate = 6.5, bh = 40, oh = 8, idle = 3;
    const gross = bh * rate + oh * rate * 1.5;
    chk(gross, 338);
    const ded = r2(gross * 0.1), net = r2(gross - ded);
    chk(net, 304.2);
    const dlCost = (bh - idle + oh) * rate;
    chk(dlCost, 292.5);
    const overhead = oh * rate * 0.5 + idle * rate;
    chk(overhead, 45.5);
    chk(dlCost + overhead, gross);
    b.struct({
      ...base, concepts: ["aacc.cost.materials-labour-jit"],
      stem: `Harare Furniture Works makes tables and chairs. It values timber boards using FIFO. The inventory records for March 2026 were:\n\n${table(["Date", "Movement"], [["1 March", "Opening inventory: 120 boards at US\\$6.00 each"], ["5 March", "Received 300 boards at US\\$6.40 each"], ["12 March", "Issued 260 boards to production"], ["20 March", "Received 220 boards at US\\$6.90 each"], ["28 March", "Issued 300 boards to production"]], ["l", "l"])}\n\nOne carpenter's week: basic week of ${bh} hours at ${usd(rate)} an hour; ${oh} hours of overtime paid at time and a half; idle for ${idle} hours of the basic week because of a power cut. Deductions of 10% of gross wages are made for income tax and pension.`,
      parts: checkExam(Z, [
        P.group({ label: "(a)", stem: "Using FIFO, calculate the cost of the boards issued on:", parts: [
          P.num({ label: "(i)", marks: 3, kind: "money", value: inv.issues[0].cost, wrong: [260 * 6.4, 260 * 6], stem: "12 March", explanation: `120 boards at ${usd(6)} = ${usd(720)} plus 140 boards at ${usd(6.4)} = ${usd(896)}; total ${usd(inv.issues[0].cost)}.` }),
          P.num({ label: "(ii)", marks: 3, kind: "money", value: inv.issues[1].cost, wrong: [300 * 6.9, 300 * 6.4], stem: "28 March", explanation: `160 boards at ${usd(6.4)} = ${usd(1024)} plus 140 boards at ${usd(6.9)} = ${usd(966)}; total ${usd(inv.issues[1].cost)}.` }),
        ] }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: inv.closingValue, wrong: [80 * 6.4, 80 * 6], stem: "Calculate the value of the boards in inventory at 31 March.", explanation: `${inv.closingQty} boards at ${usd(6.9)} = ${usd(inv.closingValue)}.` }),
        P.group({ label: "(c)", stem: "Calculate the carpenter's:", parts: [
          P.num({ label: "(i)", marks: 3, kind: "money", value: gross, wrong: [bh * rate, (bh + oh) * rate], stem: "gross wages", explanation: `${bh} × ${rate} = ${F(bh * rate)}; overtime ${oh} × ${F(rate * 1.5)} = ${F(oh * rate * 1.5)}; gross ${usd(gross)}.` }),
          P.num({ label: "(ii)", marks: 3, kind: "money", value: net, dp: 2, wrong: [ded, gross * 0.9 + 10], stem: "net wages", explanation: `Deductions ${usd(ded)}; net = ${F(gross)} - ${F(ded)} = ${usd(net)}.` }),
        ] }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: dlCost, wrong: [gross, (bh + oh) * rate], stem: "Calculate the direct labour cost, using the productive hours at the basic rate.", explanation: `Productive hours = ${bh} - ${idle} + ${oh} = ${bh - idle + oh}; × ${rate} = ${usd(dlCost)}.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: overhead, wrong: [oh * rate * 0.5, idle * rate], stem: "Calculate the part of the gross wages that is treated as production overhead.", explanation: `Overtime premium ${oh} × ${F(rate * 0.5)} = ${F(oh * rate * 0.5)} plus idle time ${idle} × ${rate} = ${F(idle * rate)}; total ${usd(overhead)}.` }),
        P.manual({ label: "(f)", marks: 4, stem: "Explain why idle time and the overtime premium are treated as overheads and not as direct labour.", points: ["Idle time is not productive, so it cannot be traced to a unit or a job", "The overtime premium is the extra over the normal rate and is caused by general pressure of work, not one job", "Direct labour is only the productive time at the normal rate", "Charging them to one job would give that job an unfair, higher cost"], modelAnswer: "Idle time produces nothing and the overtime premium is not caused by one job, so both are spread over all production as overhead. Direct labour is the productive time at the basic rate.", explanation: "One mark for each point." }),
        P.manual({ label: "(g)", marks: 6, stem: "The owner is considering a just-in-time system for timber. Evaluate this proposal for the workshop, which has frequent power cuts and unreliable transport.", points: ["JIT would reduce inventory of timber and the cash tied up", "It would cut storage costs and the risk of damage", "But a late delivery would stop production immediately and the workers would be idle, adding to the idle time cost", "The unreliable transport and power cuts make late delivery likely", "Alternative: keep a safety stock and set reorder levels; or adopt JIT only for reliable suppliers", "Recommendation: do not adopt JIT fully until supply is reliable; keep a safety stock"], modelAnswer: "JIT would release cash and cut storage costs. However, unreliable transport and power cuts make late deliveries likely, and each delay would stop production and increase idle time. The workshop should keep a safety stock and use reorder levels, adopting JIT only if its suppliers become reliable.", hints: ["Give benefits, risks in the context and a recommendation."], explanation: "One mark for each point, up to 6." }),
      ]),
      hints: ["FIFO issues the oldest boards first.", "Idle time and overtime premium are overheads."],
      explanation: "This Cambridge Paper 2 question 4 style item tests FIFO stores records, wages, the direct/overhead split of labour and an evaluation of JIT.",
    });
  }

  // ===================================================================================================
  // Item 2: absorption rates and over/under absorption (Kadoma Furniture)
  {
    const cut = { oh: 51000, mh: 8500, aMh: 9100, aOh: 53300 };
    const asm = { oh: 35000, dlh: 14000, aDlh: 13300, aOh: 34100 };
    const cr = cut.oh / cut.mh, ar = asm.oh / asm.dlh;
    chk(cr, 6); chk(ar, 2.5);
    const cAbs = cut.aMh * cr, aAbs = asm.aDlh * ar;
    chk(cAbs, 54600); chk(aAbs, 33250);
    const cDiff = cAbs - cut.aOh, aDiff = aAbs - asm.aOh;
    chk(cDiff, 1300); chk(aDiff, -850);
    const net = cDiff + aDiff;
    chk(net, 450);
    const job = 560 + 36 * 5.5 + 12 * cr + 36 * ar;
    chk(job, 920);
    const actualT = cut.aOh + asm.aOh, absT = cAbs + aAbs;
    const ctl = tAccount("Production overhead control account", [["31 Dec", "Various (actual overheads)", actualT]], [["31 Dec", "Work in progress (absorbed)", absT]], { cdDate: "31 Dec", cd: "Statement of profit or loss (over-absorbed)" }).split("\n").slice(0, -1).join("\n");
    b.struct({
      ...base, concepts: ["aacc.cost.overhead-absorption", "aacc.cost.over-under-absorption", "aacc.cost.job-batch"],
      stem: `Kadoma Furniture Ltd has a Cutting department (overheads absorbed on machine hours) and an Assembly department (absorbed on direct labour hours). Information for the year ended 31 December 2026:\n\n${table(["", "Cutting", "Assembly"], [["Budgeted overhead US\\$", cut.oh, asm.oh], ["Budgeted activity", `${F(cut.mh)} machine hours`, `${F(asm.dlh)} labour hours`], ["Actual activity", `${F(cut.aMh)} machine hours`, `${F(asm.aDlh)} labour hours`], ["Actual overhead US\\$", cut.aOh, asm.aOh]], ["l", "r", "r"])}\n\nJob K40 used direct materials of US\\$560, 36 direct labour hours paid at US\\$5.50 an hour (all in Assembly) and 12 machine hours in Cutting.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: cr, wrong: [cut.oh / asm.dlh, cut.aOh / cut.aMh], stem: "Calculate the absorption rate for Cutting, per machine hour.", explanation: `${F(cut.oh)} ÷ ${F(cut.mh)} = ${usd(cr)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: ar, wrong: [asm.oh / cut.mh, asm.aOh / asm.aDlh], stem: "Calculate the absorption rate for Assembly, per direct labour hour.", explanation: `${F(asm.oh)} ÷ ${F(asm.dlh)} = ${usd(ar)}.` }),
        P.num({ label: "(c)", marks: 2, kind: "money", value: cAbs, wrong: [cut.aOh, cut.mh * cr], stem: "Calculate the overhead absorbed by Cutting during the year.", explanation: `${F(cut.aMh)} × ${cr} = ${usd(cAbs)}.` }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: cDiff, wrong: [cut.aOh - cut.oh, -cDiff], stem: "Calculate the over-absorbed overhead of Cutting (give the amount only).", explanation: `${F(cAbs)} - ${F(cut.aOh)} = ${usd(cDiff)} over-absorbed.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: aAbs, wrong: [asm.aOh, asm.dlh * ar], stem: "Calculate the overhead absorbed by Assembly during the year.", explanation: `${F(asm.aDlh)} × ${ar} = ${usd(aAbs)}.` }),
        P.num({ label: "(f)", marks: 3, kind: "money", value: Math.abs(aDiff), wrong: [asm.aOh - asm.oh, aAbs], stem: "Calculate the under-absorbed overhead of Assembly (give the amount only).", explanation: `${F(asm.aOh)} - ${F(aAbs)} = ${usd(Math.abs(aDiff))} under-absorbed.` }),
        P.num({ label: "(g)", marks: 2, kind: "money", value: net, wrong: [cDiff + Math.abs(aDiff), cDiff], stem: "Calculate the net over-absorption for the factory as a whole (give the amount only).", explanation: `${F(cDiff)} over - ${F(Math.abs(aDiff))} under = ${usd(net)} over-absorbed.` }),
        P.num({ label: "(h)", marks: 3, kind: "money", value: job, wrong: [560 + 198, 560 + 198 + 36 * cr], stem: "Calculate the total production cost of Job K40.", explanation: `Prime cost ${F(560 + 198)}; Cutting overhead 12 × ${cr} = ${F(12 * cr)}; Assembly overhead 36 × ${ar} = ${F(36 * ar)}; total ${usd(job)}.` }),
        P.manual({ label: "(i)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare the production overhead control account for the year, clearing the balance to the statement of profit or loss.", points: [`Debit: actual overheads ${F(actualT)}`, `Credit: work in progress, overhead absorbed ${F(absT)}`, `Over-absorbed ${F(net)} transferred to the statement of profit or loss`, `Both sides total ${F(absT)}`, "Correct account title and dates"], modelAnswer: ctl, explanation: "One mark for each point." }),
        P.manual({ label: "(j)", marks: 6, stem: "Explain the causes of the over-absorption in Cutting and the under-absorption in Assembly, and advise management on what to do.", points: [`Cutting worked ${F(cut.aMh - cut.mh)} more machine hours than budgeted, which absorbed ${F((cut.aMh - cut.mh) * cr)} extra`, `Cutting overspent its budget by ${F(cut.aOh - cut.oh)}, so the over-absorption was only ${F(cDiff)}`, `Assembly worked ${F(asm.dlh - asm.aDlh)} fewer hours than budgeted, absorbing ${F((asm.dlh - asm.aDlh) * ar)} less`, `Assembly spent ${F(asm.oh - asm.aOh)} less than budget, which reduced the shortfall`, "Advice: revise the budgeted hours and rates to reflect actual activity, or control the overspending in Cutting", "Advice: the net difference is small, so the rates are acceptable overall but review the departmental forecasts"], modelAnswer: "Cutting worked 600 more hours than budgeted but spent 2,300 more than budget, giving over-absorption of 1,300. Assembly worked 700 fewer hours, absorbing 1,750 less, partly offset by spending 900 less than budget, giving under-absorption of 850. Management should revise the forecasts of hours and control the overspending in Cutting.", hints: ["Separate the effect of activity from the effect of spending in each department."], explanation: "One mark for each point, up to 6." }),
      ]),
      hints: ["Rate = budgeted overhead ÷ budgeted activity.", "Over-absorbed = absorbed - actual."],
      explanation: "This Cambridge Paper 2 question 4 style item tests departmental absorption rates, over- and under-absorption, the control account and a job cost.",
    });
  }

  // ===================================================================================================
  // Item 3: marginal costing and reconciliation (Rusape Soap Works)
  {
    const price = 15, dm = 4.2, dl = 2.6, vo = 1, vs = 0.6, fixB = 42000, bud = 10500, adm = 22000;
    const rate = fixB / bud;
    chk(rate, 4);
    const vpc = dm + dl + vo;
    const cpu = price - vpc - vs;
    chk(cpu, 6.6);
    const open = 1300, prod = 10500, sold = 9800, close = open + prod - sold;
    chk(close, 2000);
    const contrib = sold * cpu;
    const mProfit = contrib - fixB - adm;
    chk(mProfit, 680);
    const full = vpc + rate;
    const sales = sold * price;
    const aProfit = sales - sold * full - sold * vs - adm;
    chk(aProfit, 3480);
    const diff = costing.profitDifference(open, close, rate);
    chk(diff, 2800);
    chk(aProfit - mProfit, diff);
    const prod2 = 9800;
    const under2 = fixB - prod2 * rate;
    const aProfit2 = sales - sold * full - under2 - sold * vs - adm;
    chk(aProfit2, 680);
    const rec = statement("Reconciliation of profits", [["Profit under marginal costing", mProfit], [`Add: increase in inventory (${F(close - open)} units) × US\\$4.00`, diff], ["**Profit under absorption costing**", aProfit]], { cols: ["US\\$"], checks: [["rec", mProfit + diff, aProfit]] });
    b.struct({
      ...base, concepts: ["aacc.cost.marginal-costing", "aacc.cost.absorption-statements", "aacc.cost.profit-reconciliation"],
      stem: `Rusape Soap Works makes bars of soap. For 2026 the selling price was ${usd(price)}. Variable costs per bar: direct materials ${usd(dm)}, direct labour ${usd(dl)}, variable production overhead ${usd(vo)}, variable selling cost ${usd(vs)}. Fixed production overhead is absorbed at ${usd(rate)} a bar (budget ${usd(fixB)} for ${F(bud)} bars; actual fixed overhead equalled the budget). Administration expenses were ${usd(adm)}. Opening inventory was ${F(open)} bars (valued at full production cost), production ${F(prod)} bars and sales ${F(sold)} bars.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: cpu, wrong: [price - vpc, price - dm - dl], stem: "Calculate the contribution per bar.", explanation: `${price} - ${vpc} - ${vs} = ${usd(cpu)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: contrib, wrong: [prod * cpu, sold * price], stem: "Calculate the total contribution for the year.", explanation: `${F(sold)} × ${cpu} = ${usd(contrib)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: mProfit, wrong: [contrib, contrib - fixB], stem: "Calculate the profit for the year under marginal costing.", explanation: `${F(contrib)} - ${F(fixB)} - ${F(adm)} = ${usd(mProfit)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: close * vpc, wrong: [close * full, close * price], stem: "Calculate the value of closing inventory under marginal costing.", explanation: `Closing bars = ${F(open)} + ${F(prod)} - ${F(sold)} = ${F(close)}; × ${vpc} = ${usd(close * vpc)}.` }),
        P.num({ label: "(e)", marks: 4, kind: "money", value: aProfit, wrong: [mProfit, aProfit + adm], stem: "Calculate the profit for the year under absorption costing.", explanation: `Sales ${F(sales)} - cost of sales ${F(sold * full)} (full cost ${full}) - selling ${F(sold * vs)} - administration ${F(adm)} = ${usd(aProfit)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: diff, wrong: [close * rate, fixB], stem: "Calculate the difference between the two profits using the change in inventory.", explanation: `(${F(close)} - ${F(open)}) × ${rate} = ${usd(diff)}.` }),
        P.mcq({ label: "(g)", marks: 2, stem: "Which method must be used to value inventory in the published financial statements, in accordance with IAS 2?", options: [["Absorption costing", "Correct: inventory includes production overhead."], ["Marginal costing", "It leaves out fixed production overhead."], ["Selling price less margin", "Inventory is valued at cost or net realisable value."], ["Direct labour cost only", "It leaves out materials and overheads."]], answer: "A", explanation: "IAS 2 requires inventory to be valued at cost including production overhead, which is absorption costing." }),
        P.num({ label: "(h)", marks: 3, kind: "money", value: aProfit2, wrong: [aProfit, mProfit + under2], stem: "Suppose production had been 9,800 bars (so that closing inventory equalled opening inventory) and actual fixed overhead was unchanged. Calculate the profit under absorption costing, charging the under-absorbed overhead to profit.", explanation: `Absorbed ${F(prod2 * rate)}, under-absorbed ${F(under2)}. Profit = ${F(sales)} - ${F(sold * full)} - ${F(under2)} - ${F(sold * vs)} - ${F(adm)} = ${usd(aProfit2)}, which equals the marginal profit because inventory is unchanged.` }),
        P.manual({ label: "(i)", marks: 5, type: "EXTENDED_RESPONSE", stem: "Prepare a statement reconciling the profit under marginal costing with the profit under absorption costing, and explain the difference.", points: [`Start with marginal profit ${F(mProfit)}`, `Add the increase in inventory of ${F(close - open)} bars × US\\$4.00 = ${F(diff)}`.replace("US$", "US\\$"), `Arrive at absorption profit ${F(aProfit)}`, "Inventory rose, so fixed overhead is carried forward in closing inventory under absorption costing", "Marginal costing charges all of the year's fixed overhead"], modelAnswer: rec, explanation: "One mark for each point." }),
        P.manual({ label: "(j)", marks: 5, stem: "The sales manager is paid a bonus on absorption costing profit. Evaluate whether this is a good basis for her bonus.", points: ["Absorption profit can be raised by producing more than is sold, because fixed overhead is deferred in inventory", "This does not improve real performance and ties up cash in unsold soap", "A bonus based on marginal profit or contribution depends on sales and avoids this", "Absorption profit is required for the published accounts, but need not be used for the bonus", "Judgement: use contribution or sales targets for the bonus"], modelAnswer: "Absorption profit rises if inventory is built up, so the bonus could reward overproduction and tie up cash. A bonus based on contribution or sales depends only on units sold. Absorption costing remains correct for the published accounts, but the bonus should use contribution or sales.", hints: ["Think about incentives."], explanation: "One mark for each point." }),
      ]),
      hints: ["Contribution per bar first.", "Closing inventory = opening + production - sales."],
      explanation: "This Cambridge Paper 2 question 4 style item tests marginal and absorption costing profits, their reconciliation and an evaluation.",
    });
  }

  // ===================================================================================================
  // Item 4: break-even and a special order (Gweru Pottery)
  {
    const price = 19, vc = 12, fixed = 63000, budget = 11000, target = 28000;
    const m = cvp({ price, variable: vc, fixed });
    chk(m.breakEvenUnits, 9000); chk(m.breakEvenRevenue, 171000);
    const mosPct = m.marginOfSafetyPct(budget);
    chk(mosPct, 18.181818, 1e-4);
    chk(m.unitsForProfit(target), 13000);
    const budProfit = m.profitAt(budget);
    chk(budProfit, 14000);
    const oQty = 1600, oPrice = 15, oFixed = 1100;
    const gain = (oPrice - vc) * oQty - oFixed;
    chk(gain, 3700);
    b.struct({
      ...base, concepts: ["aacc.cost.break-even", "aacc.cost.decisions"],
      stem: `Gweru Pottery makes clay pots. The selling price is ${usd(price)} a pot and the variable cost (including variable selling cost) is ${usd(vc)} a pot. Fixed costs are ${usd(fixed)} a year and budgeted sales are ${F(budget)} pots. The factory has spare capacity for ${F(2500)} pots.\n\nA hotel group offers ${usd(oPrice)} a pot for ${F(oQty)} pots. The order would need a new design mould costing ${usd(oFixed)}. The hotel would not know the price paid by other customers.\n\nGive percentages to one decimal place.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "units", value: m.breakEvenUnits, wrong: [fixed / price, fixed / vc], stem: "Calculate the break-even point in pots.", explanation: `${F(fixed)} ÷ ${price - vc} = ${F(m.breakEvenUnits)} pots.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: m.breakEvenRevenue, wrong: [fixed, m.breakEvenUnits * vc], stem: "Calculate the break-even point in sales revenue.", explanation: `${F(m.breakEvenUnits)} × ${price} = ${usd(m.breakEvenRevenue)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "pct", value: mosPct, dp: 1, wrong: [((budget - m.breakEvenUnits) / m.breakEvenUnits) * 100, (m.breakEvenUnits / budget) * 100], stem: "Calculate the margin of safety as a percentage of budgeted sales.", explanation: `(${F(budget)} - ${F(m.breakEvenUnits)}) ÷ ${F(budget)} × 100 = ${p1(mosPct)}%.` }),
        P.num({ label: "(d)", marks: 3, kind: "units", value: m.unitsForProfit(target), wrong: [target / (price - vc), m.breakEvenUnits + target], stem: `Calculate the number of pots that must be sold to earn a profit of ${usd(target)}.`, explanation: `(${F(fixed)} + ${F(target)}) ÷ ${price - vc} = ${F(m.unitsForProfit(target))} pots.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: budProfit, wrong: [budget * (price - vc), budget * price - fixed], stem: "Calculate the profit at the budgeted sales.", explanation: `${F(budget)} × ${price - vc} - ${F(fixed)} = ${usd(budProfit)}.` }),
        P.num({ label: "(f)", marks: 4, kind: "money", value: gain, wrong: [(oPrice - vc) * oQty, (oPrice - (vc + 4)) * oQty - oFixed], stem: "Calculate the gain in profit from accepting the hotel's order.", explanation: `(${oPrice} - ${vc}) × ${F(oQty)} = ${F((oPrice - vc) * oQty)}; less the mould ${F(oFixed)} = ${usd(gain)}.` }),
        P.mcq({ label: "(g)", marks: 2, stem: "Which cost should be ignored when deciding whether to accept the order?", options: [["The factory rent already in fixed costs", "Correct: it is paid whether or not the order is accepted."], ["The new design mould costing US\\$1,100 for the order", "Relevant: it arises only if the order is accepted."], ["The materials needed for the extra 1,600 pots", "Relevant: they arise only if the order is accepted."], ["The labour hired for making the extra pots", "Relevant: it arises only if the order is accepted."]], answer: "A", explanation: "Only costs that change with the order are relevant; the existing rent does not." }),
        P.manual({ label: "(h)", marks: 6, stem: "Advise the owner whether to accept the hotel's order. Refer to your calculations and to non-financial factors.", points: [`The order adds ${F(gain)} to profit on relevant costs`, "The price of 15 exceeds the variable cost of 12, so each pot adds 3 of contribution", "The mould is a fixed cost caused by the order and is deducted", "There is spare capacity (2,500 pots) so no regular sales are lost", "Non-financial: regular customers may demand the same price if they learn of it", "Recommendation: accept, with the order priced as a one-off and the price kept confidential"], modelAnswer: `Accept the order: the contribution of ${F((oPrice - vc) * oQty)} exceeds the mould cost of ${F(oFixed)}, adding ${F(gain)} to profit, and there is spare capacity. The main risk is that regular customers hear of the low price, so the owner should treat it as a one-off.`, hints: ["Use relevant costs only."], explanation: "One mark for each point, up to 6." }),
        P.manual({ label: "(i)", marks: 6, stem: "Evaluate the usefulness and limitations of break-even analysis for the owner of Gweru Pottery.", points: ["It shows the sales needed to cover fixed costs, and the margin of safety shows the risk", "It is quick for what-if changes in price and cost", "It assumes a constant selling price and variable cost per unit, which may not hold with discounts", "It assumes fixed costs stay fixed, but they may step up at higher output", "It is based on forecasts and a constant sales mix", "Judgement: useful for planning, but supported by other information (cash budget, market research)"], modelAnswer: "Break-even analysis shows how many pots must be sold and how far sales can fall, and it is quick to use for what-if changes. However, it assumes constant prices, costs and mix, and relies on forecasts. It is a useful guide but should be supported by a cash budget and market information.", hints: ["Give uses, limitations and a judgement."], explanation: "One mark for each point, up to 6." }),
      ]),
      hints: ["Contribution per pot = price - variable cost.", "Fixed overhead already included in the fixed costs does not change."],
      explanation: "This Cambridge Paper 2 question 4 style item tests break-even calculations, a special-order decision and an evaluation of break-even analysis.",
    });
  }

  // ===================================================================================================
  // Item 5: limiting factor (Bindura Metal Goods)
  {
    const items = [
      { name: "M", contributionPerUnit: 17, resourcePerUnit: 2, demand: 330 },
      { name: "N", contributionPerUnit: 28, resourcePerUnit: 4, demand: 210 },
      { name: "O", contributionPerUnit: 15, resourcePerUnit: 1.5, demand: 440 },
    ];
    const hoursAvail = 1520;
    const rk = costing.rankByLimitingFactor(items);
    chk(rk[0].perResource, 10); chk(rk[1].perResource, 8.5); chk(rk[2].perResource, 7);
    let left = hoursAvail;
    const plan = [];
    for (const r of rk) {
      const hrs = Math.min(left, r.demand * r.resourcePerUnit);
      plan.push({ name: r.name, u: hrs / r.resourcePerUnit, hrs, c: (hrs / r.resourcePerUnit) * r.contributionPerUnit });
      left -= hrs;
    }
    const total = plan.reduce((s, p) => s + p.c, 0);
    chk(plan[2].u, 50); chk(total, 13610);
    const fixedC = 9500;
    const profit = total - fixedC;
    chk(profit, 4110);
    const planModel = table(["Product", "Units", "Hours used", "Contribution US\\$"], [...plan.map((p) => [p.name, F(p.u), F(p.hrs), p.c]), ["**Total**", "", F(plan.reduce((s, p) => s + p.hrs, 0)), total]], ["l", "r", "r", "r"]);
    b.struct({
      ...base, concepts: ["aacc.cost.decisions"],
      stem: `Bindura Metal Goods makes three products from sheet steel using skilled labour, of which only ${F(hoursAvail)} hours a month are available. Fixed costs are ${usd(fixedC)} a month.\n\n${table(["Product", "Contribution per unit US\\$", "Labour hours per unit", "Maximum monthly demand (units)"], items.map((x) => [x.name, x.contributionPerUnit, x.resourcePerUnit, F(x.demand)]), ["l", "r", "r", "r"])}`,
      parts: checkExam(Z, [
        P.group({ label: "(a)", stem: "Calculate the contribution per labour hour of:", parts: [
          P.num({ label: "(i)", marks: 1, kind: "money", value: 8.5, wrong: [17, 4.25], stem: "Product M", explanation: "17 ÷ 2 = US\\$8.50." }),
          P.num({ label: "(ii)", marks: 1, kind: "money", value: 7, wrong: [28, 4], stem: "Product N", explanation: "28 ÷ 4 = US\\$7." }),
          P.num({ label: "(iii)", marks: 1, kind: "money", value: 10, wrong: [15, 5], stem: "Product O", explanation: "15 ÷ 1.5 = US\\$10." }),
        ] }),
        P.mcq({ label: "(b)", marks: 2, stem: "Which product should be made first?", options: [["Product O", "Correct: it has the highest contribution per labour hour."], ["Product N", "It has the highest contribution per unit but the lowest per hour."], ["Product M", "It ranks second."], ["All three equally", "The ranking determines the order."]], answer: "A", explanation: "O earns US\\$10 an hour, M US\\$8.50 and N US\\$7. Rank by contribution per hour." }),
        P.num({ label: "(c)", marks: 3, kind: "units", value: 50, wrong: [210, 100], stem: "Calculate the number of units of N that can be made after meeting the full demand for O and M.", explanation: "O uses 660 hours and M 660 hours; 1,520 - 1,320 = 200 hours; 200 ÷ 4 = 50 units of N." }),
        P.num({ label: "(d)", marks: 3, kind: "money", value: total, wrong: [440 * 15 + 330 * 17 + 210 * 28, 6600 + 5610], stem: "Calculate the maximum monthly contribution.", explanation: `O 440 × 15 = 6,600; M 330 × 17 = 5,610; N 50 × 28 = 1,400; total ${usd(total)}.` }),
        P.num({ label: "(e)", marks: 2, kind: "money", value: profit, wrong: [total, total + fixedC], stem: "Calculate the monthly profit.", explanation: `${F(total)} - ${F(fixedC)} = ${usd(profit)}.` }),
        P.num({ label: "(f)", marks: 3, kind: "money", value: 7, wrong: [28, 4], stem: "Calculate the contribution earned by one extra labour hour, if more hours were available and N is the next product to be made.", explanation: "An extra hour would be used on N, which earns 28 ÷ 4 = US\\$7 an hour." }),
        P.manual({ label: "(g)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare a production plan showing the units of each product, the hours used and the contribution.", points: ["Product O: 440 units, 660 hours, contribution 6,600", "Product M: 330 units, 660 hours, contribution 5,610", "Product N: 50 units, 200 hours, contribution 1,400", "Total hours used 1,520", "Total contribution 13,610", "Products listed in order of contribution per labour hour"], modelAnswer: planModel, explanation: "One mark for each line, up to 6." }),
        P.manual({ label: "(h)", marks: 8, stem: "The workers offer to work 200 extra hours a month if paid an extra US\\$4 an hour. Evaluate this offer and advise the owner, referring to the limiting factor and to non-financial factors.".replace("US$", "US\\$"), points: ["The extra hours would be used to make more N, which earns 7 per hour", "Net gain per extra hour is 7 - 4 = 3", "200 extra hours would make 50 more units of N and add 600 to profit (1,400 contribution less 800 extra wages)", "The extra 50 units are within the remaining demand for N (160 units)", "Recommend accepting the offer", "Non-financial: overtime may cause fatigue, errors and lower quality", "Non-financial: it may be hard to reduce hours later, or may make workers expect higher pay", "Judgement: accept as a temporary measure, monitor quality and consider hiring more workers"], modelAnswer: "Extra hours would be used on N, which earns US\\$7 an hour; after paying US\\$4 extra the business gains US\\$3 an hour, or US\\$600 for 200 hours (50 units of N earning 1,400 less 800 of extra wages). The owner should accept, but watch fatigue and quality, and treat it as temporary while considering more workers.", hints: ["Compare the contribution per hour of N with the extra pay."], explanation: "One mark for each point, up to 8." }),
      ]),
      hints: ["Rank by contribution per labour hour.", "Respect the maximum demand for each product."],
      explanation: "This Cambridge Paper 2 question 4 style item tests a limiting factor plan and an evaluation of extra hours.",
    });
  }

  // ===================================================================================================
  // Item 6: job and batch cost sheet (Mutare Printers)
  {
    const dm = 640, op = 18 * 8, fin = 7 * 6, plate = 90, ohr = 4, lh = 25, admin = 134, n = 5000;
    const prime = dm + op + fin + plate;
    chk(prime, 916);
    const oh = lh * ohr;
    chk(oh, 100);
    const total = prime + oh + admin;
    chk(total, 1150);
    const unit = total / n;
    chk(unit, 0.23);
    const priceM = total / 0.8, priceU = total * 1.2;
    chk(priceM, 1437.5); chk(priceU, 1380);
    const sheet = statement("Batch cost sheet: 5,000 leaflets for a church (Mutare Printers)", [
      ["Direct materials: paper and ink", dm],
      ["Direct labour: machine operator 18 hours × US\\$8.00", op],
      ["Direct labour: finisher 7 hours × US\\$6.00", fin],
      ["Direct expense: plate making", plate],
      ["**Prime cost**", null, prime],
      ["Production overhead: 25 hours × US\\$4.00", null, oh],
      ["Selling and administration overhead", null, admin],
      ["**Total cost**", null, total],
      ["Cost per leaflet", null, unit],
    ], { cols: ["US\\$", "US\\$"], checks: [["prime", dm + op + fin + plate, prime], ["total", prime + oh + admin, total]] });
    b.struct({
      ...base, concepts: ["aacc.cost.job-batch", "aacc.cost.overhead-absorption"],
      stem: `Mutare Printers has been asked to print a batch of ${F(n)} leaflets for a church. The job needs paper and ink costing ${usd(dm)}, ${18} hours of the machine operator's time at ${usd(8)} an hour, ${7} hours of the finisher's time at ${usd(6)} an hour and plate making costing ${usd(plate)}. Production overhead is absorbed at ${usd(ohr)} per direct labour hour. A further ${usd(admin)} of selling and administration overhead is charged to the job.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 3, kind: "money", value: prime, wrong: [dm + op + fin, total], stem: "Calculate the prime cost of the batch.", explanation: `${F(dm)} + ${F(op)} + ${F(fin)} + ${F(plate)} = ${usd(prime)}. The plate making is a direct expense.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: oh, wrong: [18 * ohr, (op + fin) * ohr], stem: "Calculate the production overhead absorbed by the batch.", explanation: `${lh} hours × ${ohr} = ${usd(oh)}.` }),
        P.num({ label: "(c)", marks: 3, kind: "money", value: total, wrong: [prime + oh, prime + admin], stem: "Calculate the total cost of the batch.", explanation: `${F(prime)} + ${F(oh)} + ${F(admin)} = ${usd(total)}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: unit, dp: 2, wrong: [prime / n, total / 1000], stem: "Calculate the cost of one leaflet, to the nearest cent.", explanation: `${F(total)} ÷ ${F(n)} = ${usd(unit)}.` }),
        P.num({ label: "(e)", marks: 3, kind: "money", value: priceM, dp: 2, wrong: [total * 1.2, total * 0.8], stem: "The firm wants a profit margin of 20% on the selling price. Calculate the price to charge for the batch.", explanation: `${F(total)} ÷ 0.80 = ${usd(priceM)}.` }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: priceU, wrong: [priceM, total * 0.2], stem: "Calculate the price if the firm adds a mark-up of 20% on total cost instead.", explanation: `${F(total)} × 1.20 = ${usd(priceU)}.` }),
        P.mcq({ label: "(g)", marks: 2, stem: "If the batch were doubled to 10,000 leaflets, which cost per leaflet would fall most?", options: [["Plate making", "Correct: the plates are needed once per batch, so the cost is shared by more leaflets."], ["Paper and ink", "These rise in proportion to the number of leaflets."], ["Machine operator's wages", "These rise with the hours, roughly in proportion to the leaflets."], ["Finisher's wages", "These also rise with the number of leaflets."]], answer: "A", explanation: "Plate making is a once-per-batch cost, so its cost per leaflet halves when the batch doubles." }),
        P.manual({ label: "(h)", marks: 6, type: "EXTENDED_RESPONSE", stem: "Prepare the batch cost sheet.", points: ["Direct materials, labour and the direct expense listed with workings", "Prime cost 916", "Production overhead absorbed 100", "Selling and administration overhead 134", "Total cost 1,150", "Cost per leaflet 0.23"], modelAnswer: sheet, explanation: "One mark for each point, allowing follow-through." }),
        P.manual({ label: "(i)", marks: 7, stem: "A rival printer quotes US\\$1,350 for the same job. Evaluate whether Mutare Printers should reduce its price to match, referring to your calculations and to non-financial factors.".replace("US$", "US\\$"), points: [`The rival's price of 1,350 is above the total cost of ${F(total)}, so matching it still earns ${F(1350 - total)}`, `The profit would be ${p1(((1350 - total) / 1350) * 100)}% of the price, below the 20% target margin`, "The overhead of 134 for selling and administration and the 100 production overhead may continue anyway, so the extra profit from the job on relevant costs is higher", "Matching the price wins the work if the firm has spare capacity", "Non-financial: the church may place regular orders, or recommend the firm", "Non-financial: reducing prices may encourage other customers to ask for discounts", "Recommendation: match the price if there is spare capacity and the church is likely to give repeat business, otherwise hold the price"], modelAnswer: `Matching US\\$1,350 still covers the full cost of ${F(total)} and earns ${F(1350 - total)}, though the margin of ${p1(((1350 - total) / 1350) * 100)}% is below the 20% target. If there is spare capacity and the church may order again, the firm should match; otherwise it should keep its price and risk losing the job.`.replace(/US\\$/g, "US\\$"), hints: ["Compare the rival's price with your total cost and the target price."], explanation: "One mark for each point, up to 7." }),
      ]),
      hints: ["Prime cost includes the plate making.", "Margin is a percentage of the selling price."],
      explanation: "This Cambridge Paper 2 question 4 style item tests a batch cost sheet, the cost per unit, pricing methods and an evaluation of a competitor's quote.",
    });
  }
});
void p1; void p2; void statement; void tAccount; void cvp; void costing;
