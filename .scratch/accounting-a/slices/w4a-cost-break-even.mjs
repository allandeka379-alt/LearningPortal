// W4a: cost.break-even
import { concept, P, table, chk, r2, cvp } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.break-even", { file: "cost/break-even", keyPrefix: "cost.break-even" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is the break-even point?",
    ok: ["The sales level at which total revenue equals total cost", "Correct: there is neither profit nor loss."],
    bad: [["The sales level at which fixed costs equal variable costs", "These two are not compared in the definition."], ["The sales level at which profit is at its highest", "Profit is nil at break-even."], ["The sales level at which contribution equals revenue", "Contribution is always less than revenue when there are variable costs."]],
    explanation: "At the break-even point, total revenue equals total cost, so contribution exactly covers fixed costs and profit is nil.",
  });
  mc(b, {
    d: 2, skill: "RECALL", daily: true,
    stem: "How is the contribution to sales (C/S) ratio calculated?",
    ok: ["Contribution ÷ sales revenue", "Correct: the share of each dollar of sales that is contribution."],
    bad: [["Fixed costs ÷ sales revenue", "That is the fixed cost share of revenue."], ["Profit ÷ sales revenue", "That is the profit margin."], ["Variable costs ÷ sales revenue", "That is the variable cost share, which is 100% less the C/S ratio."]],
    explanation: "C/S ratio = contribution ÷ sales revenue (equal to contribution per unit ÷ selling price per unit).",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the margin of safety show?",
    ok: ["How far sales can fall before a loss is made", "Correct: it is actual sales less break-even sales."],
    bad: [["The profit earned at the break-even point", "Profit at break-even is nil."], ["The fixed costs that are safe to incur", "Margin of safety is a measure of sales, not of cost."], ["The level of sales needed for a target profit", "That is a target profit calculation."]],
    explanation: "The margin of safety is the excess of actual or budgeted sales over break-even sales.",
  });
  const fx = 18000, pr = 14, vcc = 8;
  const bep = cvp({ price: pr, variable: vcc, fixed: fx });
  chk(bep.breakEvenUnits, 3000);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A business has fixed costs of ${usd(fx)}, a selling price of ${usd(pr)} a unit and variable costs of ${usd(vcc)} a unit. What is the break-even point in units?`,
    ok: [F(bep.breakEvenUnits) + " units", "Correct: 18,000 ÷ (14 - 8)."],
    bad: [[F(Math.round(fx / pr)) + " units", "This divides fixed costs by the selling price instead of the contribution."], [F(Math.round(fx / vcc)) + " units", "This divides fixed costs by the variable cost."], [F(Math.round(fx / (pr + vcc))) + " units", "This adds price and variable cost."]],
    hints: ["Contribution per unit first."],
    explanation: `Contribution per unit = ${pr} - ${vcc} = ${pr - vcc}. Break-even = ${F(fx)} ÷ ${pr - vcc} = ${F(bep.breakEvenUnits)} units.`,
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Fixed costs rise while price and variable cost per unit stay the same. What happens to the break-even point and to the margin of safety at the same sales?",
    ok: ["The break-even point rises and the margin of safety falls", "Correct: more units are needed to cover higher fixed costs."],
    bad: [["The break-even point falls and the margin of safety rises", "The reverse of the effect of higher fixed costs."], ["The break-even point rises and the margin of safety rises", "Higher break-even sales leave a smaller margin."], ["Neither changes, because the contribution per unit is unchanged", "Fixed costs are in the formula for break-even."]],
    hints: ["Break-even = fixed costs ÷ contribution per unit."],
    explanation: "A larger numerator raises the break-even point, so for the same actual sales the margin of safety falls.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is an assumption of simple break-even analysis?",
    ok: ["The sales mix does not change", "Correct: the analysis assumes a constant mix of products."],
    bad: [["Selling prices fall as output rises", "A constant price per unit is assumed."], ["Fixed costs rise in proportion to output", "Fixed costs are assumed constant in the relevant range."], ["Variable cost per unit falls with output", "Variable cost per unit is assumed constant."]],
    hints: ["The model is linear."],
    explanation: "Break-even analysis assumes constant prices, constant variable cost per unit, fixed costs that stay fixed and a constant sales mix.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A business plans to cut its price by 10% and expects sales volume to rise by 10%. All else is equal and contribution per unit was previously 25% of the price. What is the likely effect on profit?",
    ok: ["Profit falls, because the contribution per unit falls by more than the volume rises", "Correct: contribution per unit falls by 40%."],
    bad: [["Profit rises, because volume rises by the same percentage as the price falls", "Contribution per unit falls by much more than 10%."], ["Profit is unchanged, because revenue is unchanged", "Revenue changes and costs rise with volume."], ["Profit rises, because fixed costs are spread over more units", "Fixed costs do not change in total; the contribution falls."]],
    hints: ["Work with a price of 100 and a contribution of 25."],
    explanation: "With price 100 and contribution 25, a 10% price cut gives price 90 and contribution 15 (a fall of 40%). Volume rises by only 10%, so total contribution falls (15 × 1.1 = 16.5 against 25 per 100 sold).",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "At the break-even point the total contribution equals the fixed costs.", answer: true, explanation: "True. Break-even is where contribution just covers fixed costs, so profit is nil." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "A higher selling price with no change in costs always raises the break-even point.", answer: false, hints: ["What happens to the contribution per unit?"], explanation: "False. A higher price raises the contribution per unit, so the break-even point falls (before any effect on demand)." });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each measure to its formula.",
    pairs: ["Break-even point in units", "Break-even point in revenue", "Margin of safety (%)", "Units for a target profit"],
    right: ["Fixed costs ÷ contribution per unit", "Fixed costs ÷ C/S ratio", "(Actual sales - break-even sales) ÷ actual sales × 100", "(Fixed costs + target profit) ÷ contribution per unit"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each formula follows from the idea that total contribution must equal fixed costs, plus any target profit.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "A rise in the selling price, with no change in costs, {{blank:a}} the break-even point. A rise in fixed costs {{blank:b}} the break-even point.",
    blanks: [{ id: "a", accepted: ["lowers"], choices: ["lowers", "raises", "does not change"] }, { id: "b", accepted: ["raises"], choices: ["lowers", "raises", "does not change"] }],
    explanation: "A higher price raises the contribution per unit and lowers break-even; higher fixed costs raise it.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the measure of how far sales can fall before a loss is made.", accepted: ["margin of safety"], explanation: "It is the margin of safety." });

  const K = { price: 25, vc: 15, fixed: 42000, actual: 6000 };
  const k = cvp({ price: K.price, variable: K.vc, fixed: K.fixed });
  chk(k.breakEvenUnits, 4200); chk(k.breakEvenRevenue, 105000); chk(k.marginOfSafetyPct(K.actual), 30);
  chk(k.unitsForProfit(30000), 7200); chk(k.profitAt(K.actual), 18000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: k.breakEvenUnits, calculator: true, daily: true, wrong: [K.fixed / K.price, K.fixed / K.vc],
    stem: `A Marondera craft business sells baskets for ${usd(K.price)} each. Variable cost is ${usd(K.vc)} a basket and fixed costs are ${usd(K.fixed)} a year. Calculate the break-even point in baskets.`,
    explanation: `Contribution per basket = ${K.price} - ${K.vc} = ${K.price - K.vc}. Break-even = ${F(K.fixed)} ÷ ${K.price - K.vc} = ${F(k.breakEvenUnits)} baskets. Dividing by the selling price gives ${F(K.fixed / K.price)}, which is wrong.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: k.breakEvenRevenue, calculator: true, wrong: [K.fixed, k.breakEvenUnits * K.vc],
    stem: "Using the same data, calculate the break-even point in sales revenue, using the contribution to sales ratio.",
    hints: ["C/S ratio = contribution per unit ÷ selling price."],
    explanation: `C/S ratio = ${K.price - K.vc} ÷ ${K.price} = 40%. Break-even revenue = ${F(K.fixed)} ÷ 0.40 = ${usd(k.breakEvenRevenue)}. This equals ${F(k.breakEvenUnits)} baskets × ${K.price}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "pct", value: k.marginOfSafetyPct(K.actual), dp: 1, calculator: true, wrong: [((K.actual - k.breakEvenUnits) / k.breakEvenUnits) * 100, (k.breakEvenUnits / K.actual) * 100],
    stem: `Actual sales in the year were ${F(K.actual)} baskets. Calculate the margin of safety as a percentage of actual sales, to one decimal place.`,
    hints: ["Use actual sales as the base."],
    explanation: `Margin of safety = ${F(K.actual)} - ${F(k.breakEvenUnits)} = ${F(K.actual - k.breakEvenUnits)} baskets; ${F(K.actual - k.breakEvenUnits)} ÷ ${F(K.actual)} × 100 = ${p1(k.marginOfSafetyPct(K.actual))}%. Using break-even sales as the base would give ${p1(((K.actual - k.breakEvenUnits) / k.breakEvenUnits) * 100)}%.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: k.unitsForProfit(30000), calculator: true, wrong: [30000 / (K.price - K.vc), K.fixed / (K.price - K.vc) + 30000],
    stem: `The owner wants a profit of ${usd(30000)}. Calculate the number of baskets that must be sold.`,
    hints: ["Add the target profit to the fixed costs."],
    explanation: `(${F(K.fixed)} + ${F(30000)}) ÷ ${K.price - K.vc} = ${F(k.unitsForProfit(30000))} baskets.`,
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: cvp({ price: K.price, variable: K.vc + 2, fixed: K.fixed }).profitAt(K.actual), calculator: true, wrong: [k.profitAt(K.actual), K.actual * 2],
    stem: `The cost of raw materials rises, so the variable cost rises by ${usd(2)} a basket. Selling price and fixed costs are unchanged and ${F(K.actual)} baskets are sold. Calculate the profit.`,
    hints: ["Recalculate the contribution per basket."],
    explanation: `New contribution = ${K.price} - ${K.vc + 2} = ${K.price - K.vc - 2}. Profit = ${F(K.actual)} × ${K.price - K.vc - 2} - ${F(K.fixed)} = ${usd(K.actual * (K.price - K.vc - 2) - K.fixed)}. The profit was ${usd(k.profitAt(K.actual))} before the cost increase.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three assumptions made in break-even analysis.",
    points: ["Costs can be separated into fixed and variable and variable cost per unit is constant", "The selling price per unit is constant and the sales mix does not change", "All units produced are sold and fixed costs stay fixed in the relevant range"],
    modelAnswer: "Variable cost per unit and the selling price are constant, the sales mix is constant, and fixed costs stay the same within the range of output considered.",
    explanation: "One mark for each assumption.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what a large margin of safety tells the owner of a small business.",
    points: ["Sales can fall by a large amount before a loss is made", "The business is less risky and better able to survive a downturn", "A large margin also means a high proportion of sales is earning profit above fixed costs"],
    modelAnswer: "A large margin means sales could fall a long way before a loss. The business is less risky and a high proportion of sales contributes to profit.",
    hints: ["Think of risk."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the usefulness of break-even analysis to a bakery thinking of opening a second shop.",
    points: ["It shows how many sales are needed to cover the extra fixed costs of the new shop", "It is quick and easy to use for what-if changes in price and cost", "It assumes constant prices, costs and sales mix, which may not hold for a new shop", "Judgement: useful as a first screening tool, to be supported by a cash budget and market research"],
    modelAnswer: "It shows the sales needed to cover the new shop's fixed costs and is quick for what-if changes. However, it assumes constant prices, costs and mix. The bakery should use it first, then check with a cash budget and market research.",
    hints: ["Give a use, a limit and a judgement."],
    explanation: "One mark for each point.",
  });

  // Structured 1 (10)
  const G = { price: 4, vc: 2.6, fixed: 33600, actual: 30000, target: 12600 };
  const g = cvp({ price: G.price, variable: G.vc, fixed: G.fixed });
  chk(g.csRatio, 0.35); chk(g.breakEvenUnits, 24000); chk(g.marginOfSafetyPct(G.actual), 20); chk(g.unitsForProfit(G.target), 33000);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Harare Greeting Cards sells cards at ${usd(G.price)} each. The variable cost is ${usd(G.vc)} a card and fixed costs are ${usd(G.fixed)} a year. Budgeted sales are ${F(G.actual)} cards. Give percentages to one decimal place.`,
    parts: [
      P.num({ label: "(a)", marks: 1, kind: "money", value: g.contribution, wrong: [G.vc, G.price + G.vc], stem: "Calculate the contribution per card.", explanation: `${G.price} - ${G.vc} = ${usd(g.contribution)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: g.csRatio * 100, dp: 1, wrong: [(G.vc / G.price) * 100, g.contribution], stem: "Calculate the contribution to sales ratio.", explanation: `${g.contribution} ÷ ${G.price} × 100 = 35.0%.` }),
      P.num({ label: "(c)", marks: 2, kind: "units", value: g.breakEvenUnits, wrong: [G.fixed / G.price, G.fixed / G.vc], stem: "Calculate the break-even point in cards.", explanation: `${F(G.fixed)} ÷ ${g.contribution} = ${F(g.breakEvenUnits)} cards.` }),
      P.num({ label: "(d)", marks: 2, kind: "pct", value: g.marginOfSafetyPct(G.actual), dp: 1, wrong: [((G.actual - g.breakEvenUnits) / g.breakEvenUnits) * 100, 80], stem: "Calculate the margin of safety as a percentage of budgeted sales.", explanation: `(${F(G.actual)} - ${F(g.breakEvenUnits)}) ÷ ${F(G.actual)} × 100 = 20.0%.` }),
      P.num({ label: "(e)", marks: 3, kind: "units", value: g.unitsForProfit(G.target), wrong: [G.target / g.contribution, g.breakEvenUnits + G.target], stem: `Calculate the number of cards that must be sold to earn a profit of ${usd(G.target)}.`, explanation: `(${F(G.fixed)} + ${F(G.target)}) ÷ ${g.contribution} = ${F(g.unitsForProfit(G.target))} cards.` }),
    ],
    hints: ["Contribution per card = price - variable cost.", "Margin of safety uses the budgeted sales as the base."],
    explanation: "This item tests the main break-even measures for one product.",
  });

  // Structured 2 (16)
  const M = { price: 80, vc: 50, fixed: 90000, planned: 4200 };
  const m0 = cvp({ price: M.price, variable: M.vc, fixed: M.fixed });
  const profit0 = m0.profitAt(M.planned);
  chk(m0.breakEvenUnits, 3000); chk(profit0, 36000);
  const pa = cvp({ price: 88, variable: 50, fixed: M.fixed }).profitAt(3800);
  const pb = cvp({ price: 80, variable: 46, fixed: M.fixed }).profitAt(M.planned);
  const pc = cvp({ price: 80, variable: 50, fixed: M.fixed + 12000 }).profitAt(4700);
  chk(pa, 54400); chk(pb, 52800); chk(pc, 39000);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Mutare Mattresses sells mattresses at ${usd(M.price)}. Variable cost is ${usd(M.vc)} each and fixed costs ${usd(M.fixed)} a year. Planned sales are ${F(M.planned)} mattresses. The owner is considering three separate plans:\n\n- Plan A: raise the price to ${usd(88)}; sales are expected to fall to ${F(3800)}.\n- Plan B: use cheaper foam which cuts variable cost by ${usd(4)}; sales stay at ${F(M.planned)}, but some customers may complain about quality.\n- Plan C: spend an extra ${usd(12000)} a year on advertising; sales are expected to rise to ${F(4700)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "units", value: m0.breakEvenUnits, wrong: [M.fixed / M.price, M.fixed / M.vc], stem: "Calculate the present break-even point in mattresses.", explanation: `${F(M.fixed)} ÷ ${M.price - M.vc} = ${F(m0.breakEvenUnits)}.` }),
      P.num({ label: "(b)", marks: 3, kind: "money", value: pa, wrong: [3800 * 30 - M.fixed, profit0], stem: "Calculate the profit under plan A.", explanation: `Contribution = 88 - 50 = 38; ${F(3800)} × 38 = ${F(3800 * 38)}; less ${F(M.fixed)} = ${usd(pa)}.` }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: pb, wrong: [profit0, M.planned * 4 - M.fixed], stem: "Calculate the profit under plan B.", explanation: `Contribution = 80 - 46 = 34; ${F(M.planned)} × 34 = ${F(M.planned * 34)}; less ${F(M.fixed)} = ${usd(pb)}.` }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: pc, wrong: [4700 * 30 - M.fixed, profit0], stem: "Calculate the profit under plan C.", explanation: `${F(4700)} × 30 = ${F(4700 * 30)}; fixed costs ${F(M.fixed + 12000)}; profit ${usd(pc)}.` }),
      P.manual({ label: "(e)", marks: 5, stem: "Advise the owner which plan to choose. Refer to the profit under each plan (the present profit is US\\$36,000) and to non-financial factors.".replace(/US\\$/g, "US\\$"), points: [`Plan A gives ${F(pa)}, the highest profit`, `Plan B gives ${F(pb)} and plan C gives ${F(pc)}, both above the present ${F(profit0)}`, "Plan A depends on customers accepting the higher price; the forecast fall in sales could be larger", "Plan B risks quality complaints and damage to reputation", "Recommend plan A (or B), with a reason such as the sales forecast being the most reliable, and note that plan C gives the smallest gain for the extra spending"], modelAnswer: `Plan A gives the highest profit (${F(pa)}), then B (${F(pb)}) and C (${F(pc)}). However, A relies on customers accepting the higher price and B risks quality complaints. A is recommended if the price rise is credible; C adds the least profit for the extra advertising.`, hints: ["Compare each plan with the present profit."], explanation: "One mark for each point." }),
    ],
    hints: ["Recalculate the contribution per mattress for each plan.", "Plan C changes the fixed costs."],
    explanation: "This item compares three plans using contribution and break-even analysis and asks for a recommendation.",
  });

  b.card("FORMULA", "Break-even point (units)", "Fixed costs ÷ contribution per unit.");
  b.card("FORMULA", "Break-even point (revenue)", "Fixed costs ÷ contribution to sales ratio.");
  b.card("FORMULA", "Contribution to sales (C/S) ratio", "Contribution ÷ sales revenue (= contribution per unit ÷ selling price).");
  b.card("FORMULA", "Margin of safety", "Actual (or budgeted) sales - break-even sales; as a percentage: margin of safety ÷ actual sales × 100.");
  b.card("FORMULA", "Sales for a target profit", "(Fixed costs + target profit) ÷ contribution per unit.");
  b.card("CONCEPT", "Effect of a price rise", "Contribution per unit rises, so the break-even point falls (before any effect on demand).");
  b.card("CONCEPT", "Sales mix", "For several products, find the contribution of one pack in the sales ratio and divide fixed costs by it.");
  b.card("FACT", "Assumptions of break-even analysis", "Constant price and variable cost per unit, fixed costs fixed in the range, constant sales mix, production equals sales.");
  b.card("CONCEPT", "Interpreting a break-even chart", "Revenue and total cost lines cross at break-even; the gap to the right is profit; the horizontal gap from break-even to actual sales is the margin of safety.");
  b.card("CONCEPT", "Limitations of break-even analysis", "Linear assumptions, a single period, step costs and discounts ignored; best as a quick planning guide.");
});
void r2; void table;
