// W4a: finance.cost-types (both ZIMSEC syllabi and Cambridge AS)
// Conventions: total cost = fixed + variable; average cost = total cost / output; marginal cost = change in total cost / change in output.
import { concept, P, table, money, chk, r2 } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

const schedule = (fixed, vcFn, outputs, stepFn = () => 0) => {
  let prev = null;
  const rows = outputs.map((q) => {
    const f = fixed + stepFn(q);
    const v = r2(vcFn(q));
    const tc = r2(f + v);
    const ac = q ? r2(tc / q) : null;
    const mcost = prev === null || q === 0 ? null : r2((tc - prev.tc) / (q - prev.q));
    prev = { q, tc };
    return { q, f, v, tc, ac, mc: mcost };
  });
  return rows;
};

concept("abus.finance.cost-types", { file: "finance/cost-types", keyPrefix: "finance.cost-types" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a **fixed cost** for a bakery?",
    ok: ["Monthly rent of the building", "Correct: the rent is the same whatever the output."],
    bad: [["Flour used in the loaves each day", "Flour changes with the number of loaves, so it is variable."], ["Packaging used for each loaf", "Packaging is variable."], ["Gas used for each batch", "Gas used rises with the number of batches."]],
    explanation: "Fixed costs do not change with output in the short run. Rent is one; materials and packaging are variable.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a **direct cost**?",
    ok: ["A cost traced to one product", "Correct: for example the leather used in a pair of shoes."],
    bad: [["A cost that never changes at all", "That describes a fixed cost."], ["A cost shared by all the products", "That describes an indirect cost."], ["A cost always paid in cash", "The way of paying does not make a cost direct."]],
    hints: ["Can the cost be linked to one product?"],
    explanation: "A direct cost can be identified with a particular product or job; an indirect cost is shared.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "As a business increases output, what usually happens to **fixed cost per unit**?",
    ok: ["It falls", "Correct: the same fixed cost is spread over more units."],
    bad: [["It rises", "More units share the fixed cost, so each bears less."], ["It stays the same", "Total fixed cost is constant, but per-unit cost changes."], ["It becomes variable", "A cost does not change its type with output."]],
    hints: ["Divide a constant fixed cost by a larger output."],
    explanation: "Fixed cost per unit = fixed cost ÷ output, so it falls as output rises.",
  });
  const tcA = 4800 + 200 * 30;
  chk(tcA, 10800);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional furniture workshop in Gweru has fixed costs of US\\$4,800 a month and variable costs of US\\$30 a chair. What is the total cost of making 200 chairs?",
    ok: [money(tcA), "Correct: 4,800 + (200 × 30)."],
    bad: [[money(6000), "That is the variable cost only; the fixed cost has been left out."], [money(4830), "That adds the cost of one chair to the fixed cost."], [money(54), "That is the average cost per chair, not the total."]],
    hints: ["Total cost = fixed cost + variable cost."],
    explanation: "Variable cost = 200 × 30 = 6,000. Total cost = 4,800 + 6,000 = US\\$10,800. Dividing by 200 gives the average cost, US\\$54.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional photocopying shop in Harare pays US\\$25 a month for its phone line plus US\\$0.04 a minute of calls. What type of cost is the phone bill?",
    ok: ["Semi-variable", "Correct: it has a fixed part and a part that varies with use."],
    bad: [["Entirely fixed", "The bill rises with the minutes used, so it is not wholly fixed."], ["Wholly direct", "Direct or indirect depends on whether it can be traced to a product."], ["Revenue earned", "The phone bill is a cost, not income."]],
    hints: ["Does the bill have a fixed part and a part that rises with use?"],
    explanation: "A charge made up of a fixed amount plus an amount per unit used is semi-variable.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional bottling plant in Mutare finds that its average cost per bottle falls as output rises from 10,000 to 20,000 bottles a week. Which is the **most likely** reason?",
    ok: ["The fixed costs are spread over more bottles", "Correct: the same fixed costs are shared by a larger output."],
    bad: [["The variable cost of each bottle has fallen to zero", "Variable cost per bottle does not fall to zero."], ["Total costs have fallen", "Total costs normally rise with output."], ["Fixed costs have increased in proportion to output", "Fixed costs do not rise with output in the short run."]],
    hints: ["What happens to fixed cost per bottle when output doubles?"],
    explanation: "With constant fixed costs and variable cost per unit, average cost falls as the fixed costs are shared over more units.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional tailoring business is asked to make 100 extra shirts. Its average cost is US\\$12 a shirt, but the extra shirts would cost only US\\$7 each in materials and labour. Why is the average cost **misleading** for this decision?",
    ok: ["The fixed costs are already covered", "Correct: only the extra (marginal) cost matters for the extra order."],
    bad: [["Average cost is always lower than marginal cost", "Average cost can be higher or lower than marginal cost."], ["Extra shirts have no cost at all", "Extra shirts cost US\\$7 each in materials and labour."], ["Average cost is calculated from sales", "Average cost is calculated from costs and output."]],
    hints: ["Which costs change if the order is accepted?"],
    explanation: "Fixed costs are incurred whether or not the extra order is made, so the relevant cost of the order is the marginal cost.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "A cost that is direct is always also a variable cost.",
    answer: false,
    hints: ["Think of a salary paid to the person who makes one product."],
    explanation: "False. A cost can be direct and fixed, for example the monthly salary of a worker who makes only one product.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each cost to its type.",
    pairs: [["Factory rent", "Fixed and indirect"], ["Timber used in a table", "Variable and direct"], ["Electricity with a standing charge and a charge per unit", "Semi-variable"], ["Extra cost of making one more unit", "Marginal cost"]],
    explanation: "Costs are classified by how they behave with output and whether they can be traced to a product.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Total cost equals {{blank:a}} cost plus variable cost. A cost shared by many products and not traced to one is called an {{blank:b}} cost.",
    blanks: [
      { id: "a", accepted: ["fixed"], choices: ["fixed", "marginal", "average"] },
      { id: "b", accepted: ["indirect"], choices: ["indirect", "direct", "variable"] },
    ],
    explanation: "Total cost = fixed + variable. Overheads are indirect costs.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** reason why a business needs accurate cost information.",
    accepted: ["to set prices", "to set the right price", "to price products correctly", "to control costs", "to make a profit", "to decide whether to accept an order", "to measure performance", "to decide whether to continue a product", "to avoid losses", "to plan", "to compare with budgets", "to monitor spending"],
    explanation: "Accept: pricing, cost control, special order decisions, measuring performance, deciding whether to continue a product, planning.",
  });

  const ac2 = r2(10800 / 200);
  chk(ac2, 54);
  const fpu = r2(4800 / 300);
  chk(fpu, 16);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: fpu, calculator: true, daily: true, wrong: [4800, 30],
    stem: "A fictional furniture workshop has fixed costs of US\\$4,800 a month. Calculate the fixed cost per chair if it makes 300 chairs in the month.",
    hints: ["Fixed cost ÷ output."],
    explanation: "4,800 ÷ 300 = US\\$16 per chair. The total fixed cost does not change, but the cost per chair falls as output rises.",
  });
  const mcost = r2((8150 - 7250) / (600 - 500));
  chk(mcost, 9);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: mcost, calculator: true, wrong: [13.58, 900],
    stem: "A fictional school-uniform maker in Chinhoyi has a total cost of US\\$7,250 for 500 uniforms and US\\$8,150 for 600 uniforms. Calculate the marginal cost per uniform for the extra 100 uniforms.",
    hints: ["Change in total cost ÷ change in output."],
    explanation: "Change in total cost = 8,150 - 7,250 = 900. Marginal cost = 900 ÷ 100 = US\\$9. The average cost at 600 uniforms is 13.58, which is not the marginal cost.",
  });
  const phone = r2(25 + 0.04 * 1200);
  chk(phone, 73);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: phone, calculator: true, wrong: [48, 25],
    stem: "A fictional photocopying shop pays US\\$25 a month for a phone line plus US\\$0.04 a minute. Calculate the bill for a month with 1,200 minutes of calls.",
    hints: ["Fixed part plus variable part."],
    explanation: "Variable part = 1,200 × 0.04 = 48. Bill = 25 + 48 = US\\$73. The figure 48 leaves out the fixed charge.",
  });
  const rowsA = schedule(1800, (q) => q * 0.7 + (q > 2500 ? (q - 2500) * 0.3 : 0), [1000, 2400, 3400]);
  chk(rowsA[1].tc, 3480); chk(rowsA[2].tc, 4450); chk(rowsA[2].mc, 0.97);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: rowsA[2].mc, calculator: true, wrong: [rowsA[2].ac, 0.7],
    stem: "A fictional soap maker in Bulawayo has fixed costs of US\\$1,800 a month. Variable costs are US\\$0.70 a bar for the first 2,500 bars and US\\$1.00 a bar for each bar after that (overtime). Calculate the marginal cost per bar when output rises from 2,400 to 3,400 bars.",
    hints: ["Work out the total cost at 2,400 and at 3,400 bars, then find the change per bar."],
    explanation: "At 2,400 bars: variable 1,680, total 3,480. At 3,400 bars: variable 2,500 × 0.70 + 900 × 1.00 = 1,750 + 900 = 2,650, total 4,450. Marginal cost = (4,450 - 3,480) ÷ 1,000 = US\\$0.97 a bar. The average cost at 3,400 bars (US\\$1.31) is not the marginal cost.",
    workedSolution: "1. Total cost at 2,400 bars = 1,800 + 2,400 × 0.70 = 3,480.\n2. Total cost at 3,400 bars = 1,800 + 2,500 × 0.70 + 900 × 1.00 = 1,800 + 1,750 + 900 = 4,450.\n3. Marginal cost = (4,450 - 3,480) ÷ (3,400 - 2,400) = US\\$0.97.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Distinguish between fixed and variable costs.",
    points: ["Fixed costs do not change with output in the short run", "Variable costs change directly with output", "Example: rent is fixed; materials are variable"],
    modelAnswer: "Fixed costs do not change when output changes in the short run, for example rent. Variable costs change directly with output, for example materials.",
    hints: ["Compare how each behaves when output rises."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional minibus operator in Masvingo has fuel, drivers' salaries, insurance and tyres as costs. Explain which of these are fixed and which are variable.",
    points: ["Insurance and drivers' monthly salaries are fixed because they do not change with kilometres travelled", "Application: they must be paid even if a bus stays in the depot", "Fuel and tyres are variable because they rise with kilometres travelled", "Application: more routes in a month mean more fuel and tyre wear"],
    modelAnswer: "Insurance and drivers' monthly salaries are fixed, because they are paid even if a bus stays in the depot. Fuel and tyres are variable, because more routes in a month mean more fuel used and more tyre wear.",
    hints: ["Ask whether each cost changes with distance."],
    explanation: "Costs classified with a reason for each.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why average cost usually falls as a business increases output.",
    points: ["Fixed costs are the same in total whatever the output", "As output rises, each unit bears a smaller share of fixed cost", "Variable cost per unit stays about the same", "So the average of fixed and variable cost per unit falls"],
    modelAnswer: "Fixed costs are the same in total whatever the output, so each unit bears a smaller share as output rises. Variable cost per unit stays about the same, so the average of fixed and variable cost per unit falls.",
    hints: ["Think about what is spread over more units."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bakery's manager says: 'We should use average cost to decide whether to accept extra orders.' Assess this view.",
    points: ["Average cost includes fixed costs that are already paid", "Marginal cost shows the real extra cost of an extra order", "Using average cost may lead to refusing orders that would add to profit", "Average cost is useful for pricing the whole range in the long run", "Counter-argument: if the extra order needs new fixed costs, average cost matters", "Judgement with a reason, for example use marginal cost for a one-off order with spare capacity and average cost for regular prices"],
    modelAnswer: "Average cost includes fixed costs that are already paid, whereas marginal cost shows the real extra cost of an extra order, so average cost may lead the bakery to refuse orders that would add to profit. Average cost is useful for setting regular prices in the long run, and if the order needs new fixed costs it matters more. The manager should use marginal cost for a one-off order when there is spare capacity, and average cost for regular prices.",
    hints: ["Which costs change if the order is accepted?"],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const sch = schedule(3600, (q) => q * 3, [0, 1500, 2400]);
  chk(sch[1].tc, 8100); chk(sch[1].ac, 5.4); chk(sch[2].ac, 4.5);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional poultry project in Gweru has fixed costs of US\\$3,600 a month and variable costs of US\\$3 for each crate of eggs sold. It sells 1,500 crates in June.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 8100, wrong: [4500, 3600], stem: "Calculate the total cost for June.", explanation: "Variable cost = 1,500 × 3 = 4,500. Total = 3,600 + 4,500 = US\\$8,100." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 5.4, wrong: [3, 2.4], stem: "Calculate the average cost per crate for June.", explanation: "8,100 ÷ 1,500 = US\\$5.40 per crate." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain why the average cost per crate would fall if the project sold 2,400 crates in July.", points: ["Fixed costs stay at US\\$3,600", "At 2,400 crates the fixed cost per crate is US\\$1.50 instead of US\\$2.40", "Variable cost per crate stays at US\\$3", "So the average cost falls to US\\$4.50", "More units share the same fixed cost"], modelAnswer: "The fixed costs stay at US\\$3,600, so at 2,400 crates the fixed cost per crate is US\\$1.50 instead of US\\$2.40. The variable cost per crate stays at US\\$3, so the average cost falls to US\\$4.50 because more units share the same fixed cost.", explanation: "Shows the effect on fixed cost per unit with figures." }),
    ],
    hints: ["Total cost = fixed + variable.", "Average cost = total cost ÷ output."],
    explanation: "Total cost US\\$8,100; average cost US\\$5.40; spreading fixed cost lowers the average to US\\$4.50 at 2,400 crates.",
  });

  // Practice structured 2 (14 marks): cost schedule with a step in fixed cost
  const rows = schedule(4500, (q) => q * 42, [0, 50, 100, 150, 200, 250], (q) => (q > 150 ? 2400 : 0));
  const R = (q) => rows.find((r) => r.q === q);
  chk(R(150).tc, 10800); chk(R(200).tc, 15300); chk(R(250).tc, 17400); chk(R(150).ac, 72); chk(R(200).mc, 90); chk(R(250).mc, 42); chk(R(200).ac, 76.5); chk(R(250).ac, 69.6);
  const tbl = table(["Output (chairs)", "Fixed cost (US\\$)", "Variable cost (US\\$)", "Total cost (US\\$)"], rows.map((r) => [String(r.q), r.f, r.v, r.tc]), ["r", "r", "r", "r"]);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional chair maker in Bulawayo makes hand-finished chairs and has the following monthly cost schedule. At output above 150 chairs it must rent a second workshop, which adds to fixed costs.\n\n${tbl}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: R(150).ac, wrong: [R(150).tc, 42], stem: "Calculate the average cost per chair at 150 chairs.", explanation: "10,800 ÷ 150 = US\\$72." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: R(200).mc, wrong: [R(200).ac, 42], stem: "Calculate the marginal cost per chair when output rises from 150 to 200 chairs.", explanation: "Change in total cost = 15,300 - 10,800 = 4,500 over 50 chairs = US\\$90 a chair.", workedSolution: "1. Total cost at 150 chairs = 4,500 + 6,300 = 10,800.\n2. Total cost at 200 chairs = 6,900 + 8,400 = 15,300.\n3. Marginal cost = (15,300 - 10,800) ÷ 50 = US\\$90." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain why the marginal cost between 150 and 200 chairs is higher than between 100 and 150 chairs.", points: ["The second workshop adds US\\$2,400 of fixed cost", "This raises the extra cost of the 50 additional chairs from US\\$42 to US\\$90 each"], modelAnswer: "The second workshop adds US\\$2,400 of fixed cost, which raises the extra cost of the 50 additional chairs from US\\$42 to US\\$90 each.", explanation: "A step in fixed cost raises marginal cost for that range of output." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate whether the chair maker should expand output above 150 chairs.", points: ["Average cost rises from US\\$72 at 150 chairs to US\\$76.50 at 200 because of the new fixed cost", "At 250 chairs the average cost falls to US\\$69.60 as the new fixed cost is spread", "The first 50 extra chairs cost US\\$90 each at the margin, but the next 50 only US\\$42 each", "Expansion pays only if the price exceeds the marginal cost and demand for the extra chairs exists", "The second workshop is a commitment that is hard to reverse if demand falls", "Counter-argument: if demand is certain to reach 250 chairs, the lower average cost is a clear gain", "Judgement with a reason, for example expand only if demand for at least 250 chairs is secure"], levels: [[3, 5, 7, "Costs used with the case; marginal and average cost compared with price and demand; a justified judgement"], [2, 3, 4, "Some use of costs and some weighing; judgement weakly supported"], [1, 1, 2, "General statements about expansion"]], modelAnswer: "Average cost rises from US\\$72 at 150 chairs to US\\$76.50 at 200 because of the new fixed cost, but falls to US\\$69.60 at 250 as it is spread. The first 50 extra chairs cost US\\$90 each at the margin and the next 50 only US\\$40, so expansion pays if the price is above these costs and demand exists. The second workshop is hard to reverse if demand falls. The chair maker should expand only if demand for at least 250 chairs is secure.", hints: ["Compare the average and marginal costs with the price and with demand."], explanation: "Compares average and marginal cost with price and demand." }),
    ],
    hints: ["Fixed cost steps up above 150 chairs.", "Marginal cost uses the change in total cost."],
    explanation: "Average cost at 150 is US\\$72; marginal cost between 150 and 200 is US\\$90 because of the new fixed cost.",
  });
  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional tour company in Victoria Falls runs sunset river cruises. Each month it pays US\\$6,000 for the boat loan, the licence and the manager's salary. Each passenger costs US\\$14 for food, fuel and the guide. The usual price is US\\$30. A hotel offers to book 300 passengers a month at US\\$20 each, and the boat has room for 300 more passengers a month. The company now carries 500 passengers a month at the usual price.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Identify one fixed cost and two variable costs in the case.", points: ["Fixed: the boat loan, the licence or the manager's salary", "Variable: food", "Variable: fuel or the guide"], modelAnswer: "A fixed cost is the boat loan. Variable costs are food and fuel.", explanation: "One mark each." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse whether the hotel's offer of US\\$20 a passenger is above the cost of carrying the extra passengers.", points: ["The extra cost of each passenger is US\\$14 (marginal cost)", "Application: US\\$20 is US\\$6 above this, so each extra passenger adds US\\$6", "For 300 passengers the extra profit is 300 × 6 = US\\$1,800", "The fixed costs of US\\$6,000 are already paid, so they do not change"], modelAnswer: "The extra cost of each passenger is US\\$14, so a price of US\\$20 is US\\$6 above it and each extra passenger adds US\\$6. For 300 passengers the extra profit is US\\$1,800. The fixed costs are already paid, so they do not change.", explanation: "Uses marginal cost to test the offer." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the company should accept the hotel's offer.", points: [["Current average cost = (6,000 + 500 × 14) ÷ 500 = US\\$26, so US\\$20 looks below average cost", 2], ["But the marginal cost is only US\\$14, so the offer adds US\\$1,800 to profit", 2], ["There is spare capacity (300 places), so no new fixed costs are needed", 1], ["Existing customers at US\\$30 may demand a discount if they learn of the price, or switch to the hotel's booking", 2], ["Judgement with a reason: accept if the hotel passengers would not have booked at US\\$30 and the lower price is kept separate", 1]], levels: [[3, 6, 8, "Average and marginal cost used with the case; the risk to existing sales weighed; a justified judgement"], [2, 3, 5, "Some use of costs with some weighing; judgement weakly supported"], [1, 1, 2, "General statements about accepting offers"]], modelAnswer: "The current average cost is US\\$26 a passenger, so a price of US\\$20 looks too low. But the extra cost of each passenger is only US\\$14, so the offer adds 300 × US\\$6 = US\\$1,800 to profit, and there is spare capacity so no new fixed costs are needed. The risk is that existing customers at US\\$30 may ask for a discount or book through the hotel instead. The company should accept if the hotel's passengers would not have booked at US\\$30 and the lower price is kept separate from its regular sales.", hints: ["Compare the price with average cost and with marginal cost, then think about existing customers."], explanation: "Marginal cost justifies the offer; the risk is to existing sales." }),
    ],
    hints: ["Marginal cost is the extra cost of one more passenger.", "The fixed costs are already covered."],
    explanation: "Average cost US\\$26; marginal cost US\\$14; the offer adds US\\$1,800 but may affect existing sales.",
  });

  b.card("DEFINITION", "Fixed cost", "A cost that does not change with output in the short run (rent, insurance, salaries, loan repayments).");
  b.card("DEFINITION", "Variable cost", "A cost that changes directly with output (materials, packaging, wages paid per item).");
  b.card("DEFINITION", "Direct and indirect costs", "A direct cost can be traced to a product or job; an indirect cost (overhead) is shared by many products.");
  b.card("DEFINITION", "Semi-variable cost", "A cost with a fixed part and a variable part, such as electricity with a standing charge plus a charge per unit.");
  b.card("FORMULA", "Total cost", "Total cost = fixed cost + variable cost.");
  b.card("FORMULA", "Average cost", "Average (unit) cost = total cost ÷ output.");
  b.card("FORMULA", "Marginal cost", "Marginal cost = change in total cost ÷ change in output; the extra cost of one more unit.");
  b.card("CONCEPT", "Why average cost falls", "Fixed cost is spread over more units, so fixed cost per unit falls as output rises.");
  b.card("CONCEPT", "Uses of cost information", "Pricing, special orders, cost control, performance measurement and deciding whether to continue a product.");
});
