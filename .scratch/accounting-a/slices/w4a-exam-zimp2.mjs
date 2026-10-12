// W4a exam-format items: ZIMSEC Paper 2 (ZIM_P2_STRUCT, 25 marks): (1) absorption costing statement; (2) break-even and margin of safety.
import { concept, P, EXAM, checkExam, ZIM, chk, r2, table, statement } from "../lib.mjs";
import { F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.absorption-statements", { file: "exam/w4a-zimp2", keyPrefix: "exam.w4a-zimp2", applies: ZIM }, (b) => {
  const Z = EXAM.ZIM_P2_STRUCT;

  // ===================================================================================================
  // Item 1: Kariba Kapenta Packers, absorption costing profit statement
  {
    const price = 14, dm = 2.7, dl = 1.9, vpo = 0.4, vsell = 0.7, fixB = 45000, bud = 10000, adm = 19000;
    const fixAct = 46200;
    const rate = fixB / bud;
    chk(rate, 4.5);
    const full = dm + dl + vpo + rate;
    chk(full, 9.5);
    const open = 1000, prod = 9400, sold = 9900;
    const close = open + prod - sold;
    chk(close, 500);
    const absorbed = prod * rate;
    const under = fixAct - absorbed;
    chk(under, 3900);
    const sales = sold * price;
    const cos = open * full + prod * full - close * full;
    chk(cos, 94050);
    const gp = sales - cos - under;
    const sellC = sold * vsell;
    const profit = gp - sellC - adm;
    chk(profit, 14720);
    const mContrib = sold * (price - dm - dl - vpo - vsell);
    const mProfit = mContrib - fixAct - adm;
    chk(mProfit, 16970);
    chk(profit - mProfit, (close - open) * rate);
    const model = statement("Kariba Kapenta Packers: absorption costing profit statement", [
      [`Sales (${F(sold)} × US\\$14.00)`, null, sales],
      ["Opening inventory (1,000 × US\\$9.50)", open * full],
      [`Production cost (${F(prod)} × US\\$9.50)`, prod * full],
      ["Closing inventory (500 × US\\$9.50)", -close * full],
      ["Cost of sales", null, -cos],
      ["Under-absorbed fixed production overhead", null, -under],
      ["**Gross profit**", null, gp],
      [`Selling costs (${F(sold)} × US\\$0.70)`, null, -sellC],
      ["Administration expenses", null, -adm],
      ["**Profit**", null, profit],
    ], { cols: ["US\\$", "US\\$"], checks: [["cos", open * full + prod * full - close * full, cos], ["gp", sales - cos - under, gp], ["profit", gp - sellC - adm, profit]] });
    b.struct({
      d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.cost.absorption-statements", "aacc.cost.over-under-absorption", "aacc.cost.profit-reconciliation"],
      stem: `Kariba Kapenta Packers dries and packs kapenta for supermarkets. For 2026 the budget was to produce ${F(bud)} packs and the budgeted fixed production overhead was ${usd(fixB)}. The business absorbs fixed production overhead on the budgeted number of packs. Other information:\n\n${table(["Item", "US\\$"], [["Selling price per pack", price], ["Direct materials per pack", dm], ["Direct labour per pack", dl], ["Variable production overhead per pack", vpo], ["Variable selling cost per pack sold", vsell], ["Actual fixed production overhead for the year", fixAct], ["Administration expenses for the year", adm]])}\n\nOpening inventory was ${F(open)} packs, valued at the same full production cost per pack as in 2026. Actual production was ${F(prod)} packs and sales were ${F(sold)} packs.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: rate, wrong: [fixAct / prod, fixB / prod], stem: "Calculate the fixed production overhead absorbed per pack.", explanation: `${F(fixB)} ÷ ${F(bud)} = ${usd(rate)} a pack. Using the actual output or the actual overhead gives a rate that is not pre-determined.` }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: full, wrong: [dm + dl + vpo, full + vsell], stem: "Calculate the full production cost per pack.", explanation: `${dm} + ${dl} + ${vpo} + ${rate} = ${usd(full)}. Selling cost is not a production cost.` }),
        P.num({ label: "(c)", marks: 1, kind: "units", value: close, wrong: [sold - prod, open], stem: "Calculate the number of packs in closing inventory.", explanation: `${F(open)} + ${F(prod)} - ${F(sold)} = ${close}.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: absorbed, wrong: [fixAct, bud * rate], stem: "Calculate the fixed production overhead absorbed during the year.", explanation: `${F(prod)} × ${rate} = ${usd(absorbed)}.` }),
        P.group({ label: "(e)", stem: "Compare the overhead absorbed with the actual fixed production overhead.", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: under, wrong: [fixAct - fixB, absorbed - fixAct + 1], stem: "Calculate the amount of the difference.", explanation: `${F(fixAct)} - ${F(absorbed)} = ${usd(under)}.` }),
          P.mcq({ label: "(ii)", marks: 1, stem: "The difference is:", options: [["under-absorbed, so it is deducted from profit", "Correct: absorbed overhead is less than actual."], ["over-absorbed, so it is added to profit", "Absorbed overhead is less than actual."], ["under-absorbed, so it is added to profit", "Under-absorption is a charge against profit."], ["over-absorbed, so it is deducted from profit", "Absorbed overhead is less than actual."]], answer: "A", explanation: "The overhead absorbed is less than the overhead incurred, so it is under-absorbed and reduces profit." }),
        ] }),
        P.num({ label: "(f)", marks: 2, kind: "money", value: close * full, wrong: [close * (dm + dl + vpo), close * price], stem: "Calculate the value of the closing inventory.", explanation: `${close} × ${full} = ${usd(close * full)}.` }),
        P.manual({ label: "(g)", marks: 7, type: "EXTENDED_RESPONSE", stem: "Prepare the absorption costing profit statement for the year ended 31 December 2026.", points: ["Correct heading with the date", `Sales ${F(sales)} (own figure)`, `Cost of sales ${F(cos)}: opening inventory plus production less closing inventory at the full cost`, `Under-absorbed overhead ${F(under)} deducted`, `Gross profit ${F(gp)} (own figure)`, `Selling costs ${F(sellC)} and administration expenses ${F(adm)} deducted`, `Profit ${F(profit)} (own figure)`], modelAnswer: model, explanation: "One mark for each line or group of lines; allow follow-through." }),
        P.num({ label: "(h)", marks: 2, kind: "money", value: profit, wrong: [gp, sales - cos - sellC - adm], stem: "State the profit for the year under absorption costing.", explanation: `Gross profit ${F(gp)} - selling ${F(sellC)} - administration ${F(adm)} = ${usd(profit)}.` }),
        P.manual({ label: "(i)", marks: 4, stem: "A manager prefers marginal costing. Calculate the profit under marginal costing and explain the difference from your answer to (h).", points: [`Contribution ${F(mContrib)} (9,900 × US\\$8.30)`.replace("US$", "US\\$"), `Profit ${F(mProfit)} after fixed costs of ${F(fixAct + adm)}`, `The difference is ${F(mProfit - profit)}, equal to the fall in inventory (500 packs) × US\\$4.50`.replace("US$", "US\\$"), "Marginal profit is higher because inventory fell, so absorption costing charged fixed overhead from the opening inventory"], modelAnswer: `Contribution ${F(mContrib)} less fixed costs ${F(fixAct + adm)} gives a profit of ${F(mProfit)}. This is ${F(mProfit - profit)} higher than the absorption profit because inventory fell by 500 packs, each carrying US\\$4.50 of fixed overhead, which absorption costing released into cost of sales.`, hints: ["Variable costs are 2.70 + 1.90 + 0.40 + 0.70 a pack."], explanation: "One mark for each point." }),
      ]),
      hints: ["Rate = budgeted overhead ÷ budgeted output.", "Closing inventory = opening + production - sales."],
      explanation: "This ZIMSEC Paper 2 style question tests the absorption rate, inventory, under-absorption and the absorption costing profit statement, with a comparison with marginal costing.",
    });
  }

  // ===================================================================================================
  // Item 2: Chinhoyi Dairy, break-even and margin of safety
  {
    const price = 3.5, vc = 2.1, fixed = 56000, budget = 50000;
    const cpu = price - vc;
    chk(cpu, 1.4);
    const bep = fixed / cpu;
    chk(bep, 40000);
    const cs = (cpu / price) * 100;
    chk(cs, 40);
    const bepRev = fixed / (cpu / price);
    chk(bepRev, 140000);
    const mosU = budget - bep;
    chk(mosU, 10000);
    const mosPct = (mosU / budget) * 100;
    chk(mosPct, 20);
    const target = 28000;
    const tUnits = (fixed + target) / cpu;
    chk(tUnits, 60000);
    const budProfit = budget * cpu - fixed;
    chk(budProfit, 14000);
    const price2 = 3.2, sales2 = 62000;
    const cpu2 = price2 - vc;
    const profit2 = sales2 * cpu2 - fixed;
    chk(profit2, 12200);
    const levels = [0, 20000, 40000, 60000];
    const chartTab = table(["Output (tubs)", "Revenue US\\$", "Total cost US\\$", "Profit or (loss) US\\$"], levels.map((u) => [F(u), u * price, u * vc + fixed, u * price - u * vc - fixed]));
    b.struct({
      d: 4, examStyle: true, skill: Z.skill, secs: Z.secs, applies: Z.applies, calculator: true,
      paper: "ZIMSEC Paper 2", concepts: ["aacc.cost.break-even", "aacc.cost.behaviour", "aacc.cost.decisions"],
      stem: `Chinhoyi Dairy makes tubs of yoghurt. The selling price is ${usd(price)} a tub. Variable costs are ${usd(vc)} a tub (including variable selling costs) and fixed costs are ${usd(fixed)} a year. Budgeted sales for 2026 are ${F(budget)} tubs. The following table was prepared for the owner:\n\n${chartTab}\n\nGive percentages to one decimal place.`,
      parts: checkExam(Z, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: cpu, wrong: [vc, price], stem: "Calculate the contribution per tub.", explanation: `${price} - ${vc} = ${usd(cpu)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: cs, dp: 1, wrong: [(vc / price) * 100, cpu], stem: "Calculate the contribution to sales ratio, as a percentage.", explanation: `${cpu} ÷ ${price} × 100 = ${p1(cs)}%.` }),
        P.num({ label: "(c)", marks: 3, kind: "units", value: bep, wrong: [fixed / price, fixed / vc], stem: "Calculate the break-even point in tubs.", explanation: `${F(fixed)} ÷ ${cpu} = ${F(bep)} tubs.` }),
        P.num({ label: "(d)", marks: 2, kind: "money", value: bepRev, wrong: [fixed, bep * vc], stem: "Calculate the break-even point in sales revenue.", explanation: `${F(bep)} × ${price} = ${usd(bepRev)}; or ${F(fixed)} ÷ 0.40.` }),
        P.num({ label: "(e)", marks: 2, kind: "units", value: mosU, wrong: [bep, budget], stem: "Calculate the margin of safety in tubs.", explanation: `${F(budget)} - ${F(bep)} = ${F(mosU)} tubs.` }),
        P.num({ label: "(f)", marks: 2, kind: "pct", value: mosPct, dp: 1, wrong: [(mosU / bep) * 100, (bep / budget) * 100], stem: "Calculate the margin of safety as a percentage of budgeted sales.", explanation: `${F(mosU)} ÷ ${F(budget)} × 100 = ${p1(mosPct)}%.` }),
        P.num({ label: "(g)", marks: 3, kind: "units", value: tUnits, wrong: [target / cpu, bep + target], stem: `Calculate the number of tubs that must be sold to earn a profit of ${usd(target)}.`, explanation: `(${F(fixed)} + ${F(target)}) ÷ ${cpu} = ${F(tUnits)} tubs.` }),
        P.mcq({ label: "(h)", marks: 2, stem: "Using the table, at which output do revenue and total cost become equal?", options: [["40,000 tubs", "Correct: the profit is nil."], ["20,000 tubs", "There is a loss of US\\$28,000 at this output."], ["60,000 tubs", "A profit of US\\$28,000 is made at this output."], ["0 tubs", "At nil output the loss equals the fixed costs."]], answer: "A", explanation: "Revenue equals total cost (profit nil) at 40,000 tubs." }),
        P.num({ label: "(i)", marks: 2, kind: "money", value: profit2, wrong: [sales2 * cpu - fixed, budProfit], stem: `The owner proposes to cut the price to ${usd(price2)} so that sales rise to ${F(sales2)} tubs. Costs are unchanged. Calculate the profit under this proposal.`, explanation: `Contribution = ${price2} - ${vc} = ${cpu2.toFixed(2)}; ${F(sales2)} × ${cpu2.toFixed(2)} = ${F(sales2 * cpu2)}; less ${F(fixed)} = ${usd(profit2)}.` }),
        P.manual({ label: "(j)", marks: 5, stem: `Advise the owner whether to cut the price. The budgeted profit at ${usd(price)} is ${usd(budProfit)}. Refer to your figures and give one non-financial factor and one limitation of the analysis.`, points: [`The proposal gives ${F(profit2)}, which is less than the budgeted ${F(budProfit)}`, "The lower price cuts the contribution per tub from 1.40 to 1.10, and the extra sales do not make up for it", "Recommend not cutting the price (keep the present price)", "Non-financial: a lower price may harm the image of the brand, or the extra volume may not be achievable", "Limitation: break-even analysis assumes constant costs and sales forecasts that may not be achieved"], modelAnswer: `The price cut gives a profit of ${F(profit2)} against the budget of ${F(budProfit)}, because the contribution falls to US\\$1.10 a tub. The owner should keep the present price. A lower price may also damage the brand, and the sales forecast of 62,000 tubs may not be reached.`, hints: ["Compare both profits."], explanation: "One mark for each point." }),
      ]),
      hints: ["Contribution per tub first.", "Margin of safety uses budgeted sales as the base."],
      explanation: "This ZIMSEC Paper 2 style question tests break-even, margin of safety, target profit and an evaluation of a price change.",
    });
  }
});
void r2;
