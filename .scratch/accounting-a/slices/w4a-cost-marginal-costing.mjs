// W4a: cost.marginal-costing
import { concept, P, table, chk, r2, statement } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.marginal-costing", { file: "cost/marginal-costing", keyPrefix: "cost.marginal-costing" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is contribution?",
    ok: ["Sales revenue less variable costs", "Correct: it is what is left to cover fixed costs and give a profit."],
    bad: [["Sales revenue less all costs, fixed and variable", "That is profit."], ["Sales revenue less cost of sales only", "That is gross profit, which deducts fixed production overhead."], ["Fixed costs less variable costs", "That has no meaning in costing."]],
    explanation: "Contribution = sales revenue - variable costs. It is the amount available to cover fixed costs and then provide profit.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "At what cost is closing inventory valued under marginal costing?",
    ok: ["Variable production cost per unit", "Correct: no fixed overhead is included."],
    bad: [["Full production cost per unit", "That is absorption costing."], ["Prime cost plus selling costs", "Selling costs are not part of inventory cost."], ["Selling price per unit", "Inventory is valued at cost."]],
    explanation: "Marginal costing values inventory at variable production cost only; fixed costs are written off in the period.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How are fixed costs treated in a marginal costing profit statement?",
    ok: ["Deducted in full in the period", "Correct: they are period costs."],
    bad: [["Divided among all the units produced", "That is absorption costing."], ["Carried forward in the closing inventory", "No fixed cost is carried in inventory under marginal costing."], ["Added to the cost of each unit sold", "Fixed costs are not charged to units."]],
    explanation: "Fixed costs are charged in full to the period in which they arise.",
  });
  const price = 25, dmU = 8, dlU = 5, vpoU = 1.5, vsU = 2;
  chk(price - dmU - dlU - vpoU - vsU, 8.5);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A product sells for ${usd(price)}. Variable costs per unit are direct materials ${usd(dmU)}, direct labour ${usd(dlU)}, variable production overhead ${usd(vpoU)} and variable selling cost ${usd(vsU)}. What is the contribution per unit?`,
    ok: [usd(price - dmU - dlU - vpoU - vsU), "Correct: 25 - 8 - 5 - 1.50 - 2."],
    bad: [[usd(price - dmU - dlU - vpoU), "This leaves out the variable selling cost."], [usd(price - dmU - dlU), "This deducts prime cost only."], [usd(dmU + dlU + vpoU + vsU), "This is the variable cost per unit, not the contribution."]],
    hints: ["Deduct every variable cost, including selling."],
    explanation: `Contribution per unit = ${price} - ${dmU} - ${dlU} - ${vpoU} - ${vsU} = ${usd(price - dmU - dlU - vpoU - vsU)}.`,
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "Contribution per unit is US\\$6. Fixed costs are unchanged. Sales rise by 500 units. By how much does profit rise?",
    ok: ["US\\$3,000", "Correct: 500 × 6."],
    bad: [["US\\$500", "This is the number of units, not the extra profit."], ["US\\$6", "This is the contribution per unit."], ["Nil, because fixed costs are unchanged", "Extra contribution is extra profit when fixed costs do not change."]],
    hints: ["Extra profit = extra units × contribution per unit."],
    explanation: "Fixed costs do not change, so the whole extra contribution is extra profit: 500 × 6 = US\\$3,000.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Production rises by 1,000 units but sales and all costs per unit stay the same. What happens to profit under marginal costing?",
    ok: ["It stays the same, because fixed costs are charged in full each period", "Correct: profit depends on units sold."],
    bad: [["It rises, because more fixed overhead is carried forward in inventory", "Inventory carries variable cost only."], ["It falls, because more variable cost is charged", "Variable cost of the extra units goes into inventory."], ["It rises, because production adds contribution", "Contribution arises only on units sold."]],
    hints: ["Which units earn contribution?"],
    explanation: "Under marginal costing the extra output is held in inventory at variable cost. Profit depends on sales, contribution per unit and fixed costs.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is a valid criticism of marginal costing?",
    ok: ["Inventory is undervalued compared with the requirements of IAS 2", "Correct: IAS 2 needs inventory at full production cost."],
    bad: [["It cannot be used to find the effect of extra sales", "It is particularly useful for this."], ["It charges fixed costs twice", "Fixed costs are charged once, in the period."], ["It depends on arbitrary apportionment of overheads", "That is a limitation of absorption costing."]],
    hints: ["Think about published financial statements."],
    explanation: "Marginal costing excludes fixed production overhead from inventory, which conflicts with IAS 2 for published statements.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Under marginal costing, profit depends on the number of units sold, not on the number produced.", answer: true, explanation: "True. Fixed costs are charged in full each period and inventory carries variable cost only." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Contribution per unit is the same as profit per unit.", answer: false, hints: ["Has fixed cost been deducted?"], explanation: "False. Contribution is before fixed costs. Profit per unit would also deduct a share of fixed costs." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each item to its treatment in a marginal costing statement.",
    pairs: ["Direct materials of units sold", "Closing inventory", "Rent of the factory", "Contribution"],
    right: ["Deducted as a variable cost", "Valued at variable production cost", "Deducted in full as a fixed cost", "Sales less variable costs"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Variable costs are deducted from sales; inventory carries variable cost; fixed costs are charged in the period; contribution is sales less variable costs.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Total contribution less {{blank:a}} costs gives profit. Contribution per unit equals selling price less {{blank:b}} cost per unit.",
    blanks: [{ id: "a", accepted: ["fixed"], choices: ["fixed", "variable", "marginal"] }, { id: "b", accepted: ["variable"], choices: ["fixed", "variable", "prime"] }],
    explanation: "Profit = contribution - fixed costs. Contribution per unit = price - variable cost per unit.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the cost of producing one extra unit, consisting of variable costs only.", accepted: ["marginal cost"], explanation: "It is the marginal cost." });

  // numerical, fresh data: Gweru honey
  const hp = 14, hdm = 4.5, hdl = 2, hvpo = 0.5, hvs = 0.6, hfp = 36000, hfo = 22000;
  const hcpu = hp - hdm - hdl - hvpo - hvs;
  chk(hcpu, 6.4);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: hcpu, calculator: true, daily: true, wrong: [hp - hdm - hdl - hvpo, hp - hdm - hdl],
    stem: `A Gweru honey farm sells jars at ${usd(hp)}. Variable costs per jar are direct materials ${usd(hdm)}, direct labour ${usd(hdl)}, variable production overhead ${usd(hvpo)} and variable selling cost ${usd(hvs)}. Calculate the contribution per jar.`,
    explanation: `${hp} - ${hdm} - ${hdl} - ${hvpo} - ${hvs} = ${usd(hcpu)}. Leaving out the selling cost gives ${usd(hp - hdm - hdl - hvpo)}.`,
  });
  const hs = 11500;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: hs * hcpu, calculator: true, wrong: [hs * hp, hs * (hp - hdm - hdl - hvpo)],
    stem: `The farm sells ${F(hs)} jars in the year. Calculate the total contribution.`,
    hints: ["Total contribution = units sold × contribution per jar."],
    explanation: `${F(hs)} × ${hcpu} = ${usd(hs * hcpu)}.`,
  });
  const hprofit = hs * hcpu - hfp - hfo;
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: hprofit, calculator: true, wrong: [hs * hcpu, hs * hcpu - hfp],
    stem: `Fixed production overhead is ${usd(hfp)} and fixed selling and administration costs are ${usd(hfo)}. Using your total contribution, calculate the profit for the year.`,
    hints: ["Deduct all fixed costs."],
    explanation: `Profit = ${F(hs * hcpu)} - ${F(hfp)} - ${F(hfo)} = ${usd(hprofit)}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: 900 * hcpu, calculator: true, wrong: [900 * hp, 900 * (hcpu + 1)],
    stem: "A restaurant orders 900 extra jars at the normal price. Fixed costs do not change. Calculate the extra profit.",
    hints: ["Only the contribution is extra."],
    explanation: `900 × ${hcpu} = ${usd(900 * hcpu)}. The extra sales revenue is ${usd(900 * hp)}, but the variable costs of the jars must be deducted.`,
  });
  const vopen = 600, vprod = 12000, vsold = 11500;
  const vclose = vopen + vprod - vsold;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: vclose * (hdm + hdl + hvpo), calculator: true, wrong: [vclose * (hdm + hdl + hvpo + hfp / vprod), vclose * hp],
    stem: `Opening inventory was ${vopen} jars and ${F(vprod)} jars were produced. ${F(vsold)} jars were sold. Variable production cost is ${usd(hdm + hdl + hvpo)} a jar and fixed production overhead is ${usd(hfp)}. Using marginal costing, calculate the value of the closing inventory.`,
    hints: ["Closing units first, then variable production cost."],
    explanation: `Closing jars = ${vopen} + ${F(vprod)} - ${F(vsold)} = ${F(vclose)}. Value = ${F(vclose)} × ${usd(hdm + hdl + hvpo)} = ${usd(vclose * (hdm + hdl + hvpo))}. Adding fixed overhead per jar would be absorption costing.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why fixed costs are not included in the valuation of inventory under marginal costing.",
    points: ["Fixed costs are incurred with the passing of time and do not change with output", "They are therefore charged in full to the period in which they arise"],
    modelAnswer: "Fixed costs depend on time, not on the units made, so they are written off in the period and inventory carries only variable cost.",
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain three advantages of marginal costing for a manager who must decide whether to accept a special order.",
    points: ["It shows the contribution of the order directly", "It avoids the arbitrary sharing of fixed overheads that do not change with the order", "Profit is not distorted by changes in inventory"],
    modelAnswer: "The manager sees the contribution of the order directly, is not misled by shares of fixed overhead which do not change, and is not affected by inventory movements.",
    hints: ["Which costs change with the order?"],
    explanation: "One mark for each advantage.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "A manager uses contribution per unit to price all her products at just above variable cost. Evaluate this policy.",
    points: ["Every sale at a price above variable cost adds to contribution, which helps fixed costs", "But in the long run the fixed costs must be covered by total contribution", "If all products are priced near variable cost, total contribution may be less than fixed costs, giving a loss", "Judgement: acceptable for one-off orders using spare capacity, not as a general pricing policy"],
    modelAnswer: "Selling above variable cost adds some contribution. But fixed costs are real and must be covered in the long run; pricing everything near variable cost risks a loss. It may be used for special orders with spare capacity only.",
    hints: ["Think about the long run and fixed costs."],
    explanation: "One mark for each point.",
  });

  // Structured 1 (12)
  const S = { price: 40, dm: 12, dl: 8, vpo: 2, vs: 3, fixP: 40000, fixO: 20000, open: 400, prod: 5200, sold: 5000 };
  const vpc = S.dm + S.dl + S.vpo;
  const cl = S.open + S.prod - S.sold;
  const cpu = S.price - vpc - S.vs;
  const sales = S.sold * S.price, vcos = S.sold * vpc, vsell = S.sold * S.vs, contrib = sales - vcos - vsell;
  const profit = contrib - S.fixP - S.fixO;
  chk(profit, 15000); chk(cpu, 15);
  const model = statement("Mutare Leather Goods: marginal costing profit statement", [
    [`Sales (${F(S.sold)} × US\\$40)`, null, sales],
    ["Opening inventory (400 × US\\$22)", S.open * vpc],
    [`Production (${F(S.prod)} × US\\$22)`, S.prod * vpc],
    ["Closing inventory (600 × US\\$22)", -cl * vpc],
    ["Variable cost of sales", null, -vcos],
    [`Variable selling cost (${F(S.sold)} × US\\$3)`, null, -vsell],
    ["**Contribution**", null, contrib],
    ["Fixed production overhead", null, -S.fixP],
    ["Fixed selling and administration costs", null, -S.fixO],
    ["**Profit**", null, profit],
  ], { cols: ["US\\$", "US\\$"], checks: [["vcos", S.open * vpc + S.prod * vpc - cl * vpc, vcos], ["contrib", sales - vcos - vsell, contrib], ["profit", contrib - S.fixP - S.fixO, profit]] });
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Mutare Leather Goods makes belts. Per belt: selling price ${usd(S.price)}, direct materials ${usd(S.dm)}, direct labour ${usd(S.dl)}, variable production overhead ${usd(S.vpo)}, variable selling cost ${usd(S.vs)}. Fixed production overhead is ${usd(S.fixP)} a year and fixed selling and administration costs ${usd(S.fixO)}. Opening inventory was ${S.open} belts, production ${F(S.prod)} and sales ${F(S.sold)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: cpu, wrong: [S.price - vpc, S.price - S.dm - S.dl], stem: "Calculate the contribution per belt.", explanation: `${S.price} - ${vpc} - ${S.vs} = ${usd(cpu)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: contrib, wrong: [sales - vcos, S.prod * cpu], stem: "Calculate the total contribution.", explanation: `${F(S.sold)} × ${cpu} = ${usd(contrib)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: cl * vpc, wrong: [cl * (vpc + S.fixP / S.prod), cl * S.price], stem: "Calculate the value of the closing inventory under marginal costing.", explanation: `Closing belts = ${S.open} + ${F(S.prod)} - ${F(S.sold)} = ${cl}; ${cl} × ${vpc} = ${usd(cl * vpc)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: profit, wrong: [contrib, contrib - S.fixP], stem: "Calculate the profit for the year.", explanation: `${F(contrib)} - ${F(S.fixP)} - ${F(S.fixO)} = ${usd(profit)}.` }),
      P.manual({ label: "(e)", marks: 4, type: "EXTENDED_RESPONSE", stem: "Prepare the marginal costing profit statement for the year.", points: [`Sales ${F(sales)}`, `Variable cost of sales ${F(vcos)} with opening and closing inventory at ${usd(vpc)}`, `Contribution ${F(contrib)} after variable selling cost`, `Fixed costs ${F(S.fixP + S.fixO)} deducted; profit ${F(profit)}`], modelAnswer: model, explanation: "One mark for each group of lines." }),
    ],
    hints: ["Variable production cost per belt is 22.", "Closing units = opening + production - sales."],
    explanation: "This item tests contribution, inventory valuation and a marginal costing profit statement.",
  });

  // Structured 2 (14): what-if, a different business
  const T = { price: 12, vc: 6.5, vs: 0.5, fixed: 48000, sold: 12000 };
  const tcpu = T.price - T.vc - T.vs;
  chk(tcpu, 5);
  const baseProfit = T.sold * tcpu - T.fixed;
  chk(baseProfit, 12000);
  const sA = T.sold * 1.1, profA = sA * tcpu - T.fixed;
  chk(profA, 18000);
  const cpu2 = tcpu - 1, sB = 16000, profB = sB * cpu2 - T.fixed;
  chk(profB, 16000);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Bindura Soap Co sells bars at ${usd(T.price)}. Variable production cost is ${usd(T.vc)} a bar and variable selling cost ${usd(T.vs)}. Fixed costs are ${usd(T.fixed)} a year. Last year ${F(T.sold)} bars were sold. The owner is considering two plans: (A) sales up by 10% at the normal price; (B) price cut by US\\$1.00 with sales rising to ${F(sB)} bars.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: profA, wrong: [baseProfit, profA - T.fixed * 0.1], stem: "Calculate the profit under plan A.", explanation: `Sales ${F(sA)} × ${tcpu} = ${F(sA * tcpu)} less fixed costs ${F(T.fixed)} = ${usd(profA)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: profB, wrong: [sB * tcpu - T.fixed, baseProfit], stem: "Calculate the profit under plan B.", explanation: `New contribution per bar = ${cpu2}; ${F(sB)} × ${cpu2} = ${F(sB * cpu2)}; less ${F(T.fixed)} = ${usd(profB)}.` }),
      P.mcq({ label: "(c)", marks: 2, stem: "The soap works made 1,000 more bars than it sold last year. Under marginal costing, how does this affect last year's profit?", options: [["No effect: the extra bars are held in inventory at variable cost", "Correct."], ["Profit rises by the fixed cost carried forward", "Marginal costing carries no fixed cost forward."], ["Profit falls by the variable cost of the extra bars", "That cost is carried in inventory."], ["Profit rises by the contribution on 1,000 bars", "Contribution arises on units sold."]], answer: "A", explanation: "Profit depends on sales; unsold units are carried at variable cost." }),
      P.manual({ label: "(d)", marks: 4, stem: "Advise the owner which plan to adopt, referring to your figures and one non-financial factor.", points: [`Plan A gives profit of ${F(profA)}, higher than plan B (${F(profB)}) and last year (${F(baseProfit)})`, "Plan B earns less contribution per bar and relies on a large rise in sales", "Recommend plan A if sales can really increase at the normal price", "Non-financial: a lower price may harm the brand image or start a price war; plan A needs a marketing effort"], modelAnswer: `Plan A gives the higher profit (${F(profA)} against ${F(profB)}) and does not depend on a lower price. Plan B needs a large increase in sales and may harm the brand. The owner should adopt plan A if the extra sales are realistic.`, hints: ["Compare both plans with last year."], explanation: "One mark for each point." }),
      P.manual({ label: "(e)", marks: 3, stem: "State three assumptions made in these calculations.", points: ["Variable cost per unit is constant", "Fixed costs do not change within the range of sales considered", "All units produced are sold, or the effect of inventory is ignored"], modelAnswer: "Variable cost per bar is constant, fixed costs stay at the same level, and the sales forecasts will be reached.", explanation: "One mark for each assumption." }),
    ],
    hints: ["Contribution per bar first.", "Fixed costs do not change."],
    explanation: "This item uses contribution for what-if profit calculations and a recommendation.",
  });

  b.card("DEFINITION", "Contribution", "Sales revenue less variable costs. Contribution per unit = selling price - variable cost per unit.");
  b.card("FORMULA", "Profit under marginal costing", "Total contribution - total fixed costs.");
  b.card("CONCEPT", "Inventory under marginal costing", "Valued at variable production cost only; no fixed overhead is carried forward.");
  b.card("CONCEPT", "Treatment of fixed costs", "Fixed costs are period costs, deducted in full from contribution in the period.");
  b.card("CONCEPT", "Effect of extra sales", "Extra profit = extra units sold × contribution per unit, when fixed costs do not change.");
  b.card("CONCEPT", "Profit and production", "Under marginal costing, profit depends on units sold, not units produced.");
  b.card("DEFINITION", "Marginal cost", "The variable cost of one extra unit.");
  b.card("FACT", "Uses of marginal costing", "Pricing and special orders, product mix, break-even analysis, profit not distorted by inventory changes.");
  b.card("FACT", "Limitations of marginal costing", "Not accepted by IAS 2 for published accounts; assumes constant variable cost per unit; may encourage prices that do not cover fixed costs.");
});
void p1; void r2; void table;
