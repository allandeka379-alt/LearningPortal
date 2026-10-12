// W4a: cost.decisions
import { concept, P, table, chk, r2, costing } from "../lib.mjs";
import { mc, F, usd, p1 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.decisions", { file: "cost/decisions", keyPrefix: "cost.decisions" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "What is a limiting factor?",
    ok: ["A scarce resource that restricts output", "Correct: for example labour hours or a key material."],
    bad: [["A cost that cannot be reduced by management", "A limiting factor is a resource, not a cost that is fixed."], ["The highest price customers will pay for a product", "That is a market limit on price, not a resource shortage."], ["A fixed cost that is the same at every output", "Limiting factors concern resources, not cost behaviour."]],
    explanation: "A limiting factor is any scarce resource (labour, materials, machine time) that stops the business making all it could sell.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A business with spare capacity is deciding whether to accept a special order. Which cost should be ignored?",
    ok: ["A share of the existing factory rent", "Correct: the rent is paid whether or not the order is accepted."],
    bad: [["Extra materials that are needed for this order only", "This is a relevant cost: it arises only if the order is accepted."], ["Overtime that would be paid only because of the order", "This is a relevant cost caused by the decision."], ["Special packaging that is bought just for this order", "This is a relevant cost of the order."]],
    explanation: "Relevant costs change with the decision. An apportioned share of existing rent does not, so it is ignored.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When labour hours are the limiting factor, how should products be ranked?",
    ok: ["By contribution per labour hour", "Correct: the scarce resource is the labour hour."],
    bad: [["By contribution per unit of product", "This ignores the amount of the scarce resource used by each product."], ["By selling price per unit", "Price alone does not show profitability per scarce hour."], ["By total fixed cost of each product", "Fixed costs are not used to rank products."]],
    explanation: "With a single limiting factor, rank products by contribution per unit of the scarce resource and make the highest-ranked first.",
  });
  const normal = 30, vcv = 18, qty = 900, op = 21, ex = 450;
  chk((op - vcv) * qty - ex, 2250);
  const cN = { price: 12, vc: 7, qty: 600, offer: 9, ex: 240 };
  const cGain = (cN.offer - cN.vc) * cN.qty - cN.ex;
  chk(cGain, 960);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: `A candle maker normally sells at ${usd(cN.price)} with a variable cost of ${usd(cN.vc)}. It has spare capacity. A shop offers ${usd(cN.offer)} each for ${cN.qty} candles, which need extra delivery costing ${usd(cN.ex)}. What is the gain from accepting?`,
    ok: [usd(cGain), "Correct: (9 - 7) × 600 - 240."],
    bad: [[usd((cN.offer - cN.vc) * cN.qty), "This leaves out the extra delivery cost."], [usd((cN.price - cN.vc) * cN.qty), "This uses the normal price instead of the offer price."], [usd((cN.offer - cN.vc) * cN.qty + cN.ex), "The delivery cost has been added instead of deducted."]],
    hints: ["Only variable and extra costs count."],
    explanation: `Contribution = (${cN.offer} - ${cN.vc}) × ${cN.qty} = ${F((cN.offer - cN.vc) * cN.qty)}; less extra delivery ${cN.ex} = ${usd(cGain)}.`,
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A product line has a contribution of US\\$8,000 and avoidable fixed costs of US\\$9,500. After apportioned fixed costs it shows a loss of US\\$14,000. What is the effect of closing the line?",
    ok: ["Profit rises by US\\$1,500", "Correct: avoidable costs saved exceed the contribution lost by 1,500."],
    bad: [["Profit rises by US\\$14,000", "The loss includes apportioned costs that continue after closure."], ["Profit falls by US\\$8,000", "This ignores the avoidable fixed costs saved."], ["Profit is unchanged", "The contribution lost and the costs saved are different amounts."]],
    hints: ["Compare the contribution lost with the avoidable costs saved."],
    explanation: "Closing loses contribution of 8,000 but saves avoidable fixed costs of 9,500, so profit rises by 1,500. Apportioned costs that continue do not matter.",
  });
  mc(b, {
    d: 3, skill: "EVALUATION",
    stem: "Making a component is cheaper than buying it. Which non-financial factor could still justify buying?",
    ok: ["The freed workers could earn more elsewhere", "Correct: the freed capacity may earn more."],
    bad: [["The component is cheaper to make in the workshop", "That is the financial case for making it."], ["Making it uses the existing fixed costs of the workshop", "That is a financial point and suggests making it."], ["The cost of buying the component is higher", "That is also a financial point."]],
    hints: ["Think about reliability, quality and the use of capacity."],
    explanation: "Non-financial factors include supplier reliability, quality and the alternative use of the freed capacity and labour.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A manager refuses a one-off order because its price is below full absorption cost, although the business has spare capacity. What is the best criticism of this decision?",
    ok: ["Fixed costs continue anyway, so a price above variable cost adds to profit", "Correct: the manager has used the wrong measure."],
    bad: [["The manager should always accept every order that is offered", "A price below variable cost would reduce profit."], ["The manager should have used the apportioned fixed cost in the analysis", "Apportioned fixed cost is irrelevant."], ["The order was refused for a non-financial reason only", "The reason given was a financial one."]],
    hints: ["Which costs change if the order is accepted?"],
    explanation: "The decision should compare the price with the extra costs only. Fixed costs are incurred anyway, so a price above the variable cost adds to profit.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A department that shows a loss after apportioned fixed costs should always be closed.", answer: false, explanation: "False. Compare its contribution with the avoidable fixed costs; if contribution is higher, it adds to profit and should be kept." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "In a make-or-buy decision, an avoidable fixed cost of making is a relevant cost.", answer: true, hints: ["Would the cost stop if the item were bought?"], explanation: "True. If the fixed cost would stop when the item is bought, it is saved by buying and is therefore relevant." });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each decision to the key comparison.",
    pairs: ["Special order with spare capacity", "Make or buy", "Closure of a department", "Limiting factor"],
    right: ["Price against extra variable and extra fixed costs", "Variable plus avoidable fixed cost of making against the purchase price", "Contribution lost against avoidable fixed costs saved", "Contribution per unit of the scarce resource"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Each decision compares only the relevant revenues and costs that differ between the options.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "In a decision, {{blank:a}} costs, which have already been spent, are ignored. A fixed cost that would stop if a product were closed is an {{blank:b}} fixed cost.",
    blanks: [{ id: "a", accepted: ["sunk"], choices: ["sunk", "variable", "avoidable"] }, { id: "b", accepted: ["avoidable"], choices: ["sunk", "avoidable", "apportioned"] }],
    explanation: "Sunk costs are ignored; avoidable fixed costs are relevant.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the resource-based ranking measure used when one input is scarce: contribution per unit of the ______ .", accepted: ["limiting factor", "scarce resource"], explanation: "Contribution per unit of the limiting factor (scarce resource)." });

  const nUnits = 2400, mv = 6, af = 3000, bp = 8;
  const mk = nUnits * mv + af, by = nUnits * bp;
  chk(mk, 17400); chk(by, 19200);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: (op - vcv) * qty - ex, calculator: true, daily: true, wrong: [(op - vcv) * qty, (op - (vcv + 8)) * qty],
    stem: `A uniform maker has spare capacity. Variable cost is ${usd(vcv)} a uniform. A school offers ${usd(op)} each for ${qty} uniforms and the order needs extra delivery of ${usd(ex)}. Calculate the gain from accepting the order.`,
    hints: ["Contribution of the order less the extra cost."],
    explanation: `(${op} - ${vcv}) × ${qty} = ${F((op - vcv) * qty)}; less ${F(ex)} = ${usd((op - vcv) * qty - ex)}. Using a full cost that includes fixed overhead would wrongly show a loss.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: mk, calculator: true, wrong: [nUnits * mv, by],
    stem: `A bakery makes ${F(nUnits)} boxes a year at a variable cost of ${usd(mv)} a box. Making them also needs a supervisor costing ${usd(af)} a year that could be avoided if the boxes were bought. Calculate the relevant cost of making the boxes.`,
    hints: ["Include the avoidable fixed cost."],
    explanation: `${F(nUnits)} × ${mv} = ${F(nUnits * mv)}; plus ${F(af)} avoidable fixed cost = ${usd(mk)}. Leaving out the avoidable fixed cost gives ${usd(nUnits * mv)}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: by - mk, calculator: true, wrong: [nUnits * (bp - mv), mk - by],
    stem: `A supplier offers the boxes at ${usd(bp)} each. By how much is it cheaper to make the boxes than to buy them?`,
    hints: ["Compare total relevant costs."],
    explanation: `Buying costs ${F(nUnits)} × ${bp} = ${F(by)}. Making costs ${F(mk)}. Saving from making = ${usd(by - mk)}.`,
  });
  const items = [
    { name: "X", contributionPerUnit: 18, resourcePerUnit: 3, demand: 180 },
    { name: "Y", contributionPerUnit: 14, resourcePerUnit: 2, demand: 240 },
    { name: "Z", contributionPerUnit: 9, resourcePerUnit: 1, demand: 320 },
  ];
  const rk = costing.rankByLimitingFactor(items);
  chk(rk[0].perResource, 9); chk(rk[1].perResource, 7); chk(rk[2].perResource, 6);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: 14 / 2, calculator: true, wrong: [14, 14 / 3],
    stem: "Machine time is the limiting factor. Product Y has a contribution of US\\$14 a unit and uses 2 machine hours a unit. Calculate its contribution per machine hour.",
    hints: ["Divide the contribution by the hours used."],
    explanation: "14 ÷ 2 = US\\$7 per machine hour.",
  });
  let left = 1040;
  const plan = [];
  for (const r of rk) {
    const hrs = Math.min(left, r.demand * r.resourcePerUnit);
    plan.push({ name: r.name, u: hrs / r.resourcePerUnit, c: (hrs / r.resourcePerUnit) * r.contributionPerUnit });
    left -= hrs;
  }
  const totalC = plan.reduce((s, p) => s + p.c, 0);
  chk(totalC, 7680); chk(plan[2].u, 80);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: totalC, calculator: true, wrong: [180 * 18 + 240 * 14 + 320 * 9, 320 * 9 + 240 * 14],
    stem: "A workshop has 1,040 machine hours. Products have: X contribution US\\$18, 3 hours a unit, demand 180 units; Y contribution US\\$14, 2 hours a unit, demand 240 units; Z contribution US\\$9, 1 hour a unit, demand 320 units. Calculate the maximum total contribution.",
    hints: ["Rank by contribution per hour: Z, Y, then X.", "Use the hours left for X."],
    explanation: `Z: 320 units use 320 hours (US\\$2,880); Y: 240 units use 480 hours (US\\$3,360); 240 hours remain for X: 80 units (US\\$1,440). Total = ${usd(totalC)}.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "State three non-financial factors that should be considered before accepting a special order at a low price.",
    points: ["The effect on regular customers who may demand the same lower price", "Whether there is genuine spare capacity and no loss of normal sales", "The effect on staff morale, quality and the reputation of the business"],
    modelAnswer: "Regular customers may demand the same price; the business must have spare capacity; and quality and staff morale may be affected.",
    explanation: "One mark for each factor.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain why a department showing a loss may still be worth keeping.",
    points: ["A department's loss includes apportioned fixed costs that continue after closure", "Its contribution still helps to cover those costs", "Closing it loses the contribution but saves only the avoidable fixed costs, so profit may fall"],
    modelAnswer: "The loss includes shared fixed costs that would continue if it closed. Its contribution still helps to cover them, so closing it loses contribution and may reduce profit.",
    hints: ["Which costs would stop if the department closed?"],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A manager decides to produce only the product with the highest contribution per unit, although labour hours are scarce. Evaluate this decision.",
    points: ["The scarce resource is labour hours, so contribution per labour hour is the right measure", "The product with the highest contribution per unit may use many hours and give a lower contribution per hour", "Total contribution is then lower than if products were ranked per hour", "Demand limits for each product must also be respected", "Judgement: the plan should be revised to rank by contribution per hour, with non-financial factors such as customer contracts considered"],
    modelAnswer: "With labour hours scarce, products should be ranked by contribution per hour, not per unit. The highest contribution per unit may use many hours and give less in total. The plan should be revised, respecting demand limits and contracts.",
    hints: ["Think about the scarce resource."],
    explanation: "One mark for each of the five points.",
  });

  // Structured 1 (14)
  const Z = { normal: 22, vc: 13, full: 17, qty: 1200, offer: 16, deliv: 700, lic: 350, cap: 1500 };
  const zGain = (Z.offer - Z.vc) * Z.qty - Z.deliv - Z.lic;
  chk(zGain, 2550);
  const zUnits = 4000, zv = 1, zaf = 1200, zbuy = 1.45;
  const zMake = zUnits * zv + zaf, zBuy = zUnits * zbuy;
  chk(zMake, 5200); chk(zBuy, 5800);
  b.struct({
    d: 4, skill: "EVALUATION", calculator: true,
    stem: `Masvingo Bags makes leather bags. The normal price is ${usd(Z.normal)}, the variable cost ${usd(Z.vc)} and the full cost ${usd(Z.full)} (including fixed overhead absorbed). The workshop has spare capacity of ${F(Z.cap)} bags. A shop offers ${usd(Z.offer)} a bag for ${F(Z.qty)} bags; the order needs extra delivery costing ${usd(Z.deliv)} and a design licence costing ${usd(Z.lic)}.\n\nThe workshop also makes ${F(zUnits)} zip fasteners a year at a variable cost of ${usd(zv)} each. Making them needs tooling costing ${usd(zaf)} a year that would be avoided if they were bought. A supplier offers them at ${usd(zbuy)} each.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", value: zGain, wrong: [(Z.offer - Z.full) * Z.qty, (Z.offer - Z.vc) * Z.qty], stem: "Calculate the gain from accepting the shop's order.", explanation: `(${Z.offer} - ${Z.vc}) × ${F(Z.qty)} = ${F((Z.offer - Z.vc) * Z.qty)}; less ${F(Z.deliv)} and ${F(Z.lic)} = ${usd(zGain)}.` }),
      P.mcq({ label: "(b)", marks: 1, stem: "Which cost is ignored in the decision on the order?", options: [["The fixed overhead of US\\$4 a bag", "Correct: it is incurred whether or not the order is accepted."], ["The delivery cost of US\\$700 for the order", "This is relevant: it arises only if the order is accepted."], ["The design licence costing US\\$350 for the order", "This is relevant: it arises only if the order is accepted."], ["The variable cost of US\\$13 a bag for the order", "This is relevant: it is caused by making the extra bags."]], answer: "A", explanation: "Fixed overhead absorbed does not change with the order." }),
      P.manual({ label: "(c)", marks: 4, stem: "Advise whether the order should be accepted, giving one assumption and one non-financial factor.", points: [`The order adds ${usd(zGain)} to profit on relevant costs`, "Fixed overhead is incurred anyway, so the full cost is not the test", "Assumption: the spare capacity of 1,500 bags is genuine and no normal sales are lost", "Non-financial: other customers may demand the lower price, or goodwill with the shop"], modelAnswer: `Accept: the order adds ${usd(zGain)} because the price exceeds the variable and extra costs. The assumption is that spare capacity exists. The business should watch for regular customers demanding the same price.`, hints: ["Use the relevant costs only."], explanation: "One mark for each point." }),
      P.num({ label: "(d)", marks: 3, kind: "money", value: zMake, wrong: [zUnits * zv, zBuy], stem: "Calculate the relevant cost of making the zip fasteners.", explanation: `${F(zUnits)} × ${zv} = ${F(zUnits * zv)}; plus tooling ${F(zaf)} = ${usd(zMake)}.` }),
      P.manual({ label: "(e)", marks: 3, stem: "Advise whether to make or buy the zip fasteners.", points: [`Making costs ${usd(zMake)} against ${usd(zBuy)} to buy, a saving of ${usd(zBuy - zMake)}`, "Recommend making them", "Non-financial: buy if the supplier is reliable and the freed workers earn more elsewhere; or keep quality control in the workshop"], modelAnswer: `Making is cheaper by ${usd(zBuy - zMake)} (${F(zMake)} against ${F(zBuy)}), so continue to make the zips. Quality control and the alternative use of the workers should be considered.`, explanation: "One mark for each point." }),
    ],
    hints: ["Full cost includes fixed overhead that does not change.", "Include avoidable fixed costs in the cost of making."],
    explanation: "This item tests a special order and a make-or-buy decision with advice.",
  });

  // Structured 2 (16)
  const LF = [
    { name: "P", contributionPerUnit: 24, resourcePerUnit: 4, demand: 150 },
    { name: "Q", contributionPerUnit: 20, resourcePerUnit: 2, demand: 260 },
    { name: "R", contributionPerUnit: 11, resourcePerUnit: 1, demand: 280 },
  ];
  const lfr = costing.rankByLimitingFactor(LF);
  chk(lfr[0].perResource, 11); chk(lfr[1].perResource, 10); chk(lfr[2].perResource, 6);
  let hrsLeft = 1000;
  const lfPlan = [];
  for (const r of lfr) {
    const hrs = Math.min(hrsLeft, r.demand * r.resourcePerUnit);
    lfPlan.push({ name: r.name, u: hrs / r.resourcePerUnit, c: (hrs / r.resourcePerUnit) * r.contributionPerUnit });
    hrsLeft -= hrs;
  }
  const lfTotal = lfPlan.reduce((s, p) => s + p.c, 0);
  chk(lfTotal, 9480); chk(lfPlan[2].u, 50);
  b.struct({
    d: 5, skill: "EVALUATION", calculator: true,
    stem: `Bulawayo Enamelware has 1,000 machine hours available each month. The three products it makes are:\n\n${table(["Product", "Contribution per unit US\\$", "Machine hours per unit", "Maximum monthly demand (units)"], LF.map((x) => [x.name, x.contributionPerUnit, x.resourcePerUnit, F(x.demand)]), ["l", "r", "r", "r"])}`,
    parts: [
      P.group({ label: "(a)", stem: "Calculate the contribution per machine hour of:", parts: [
        P.num({ label: "(i)", marks: 1, kind: "money", value: 6, wrong: [24, 4], stem: "Product P", explanation: "24 ÷ 4 = US\\$6." }),
        P.num({ label: "(ii)", marks: 1, kind: "money", value: 10, wrong: [20, 5], stem: "Product Q", explanation: "20 ÷ 2 = US\\$10." }),
        P.num({ label: "(iii)", marks: 1, kind: "money", value: 11, wrong: [1, 20], stem: "Product R", explanation: "11 ÷ 1 = US\\$11." }),
      ] }),
      P.num({ label: "(b)", marks: 3, kind: "units", value: 50, wrong: [100, 150], stem: "After making the full demand for R and Q, calculate the number of units of P that can be made with the hours left.", explanation: "R uses 280 hours and Q 520 hours; 1,000 - 800 = 200 hours; 200 ÷ 4 = 50 units of P." }),
      P.num({ label: "(c)", marks: 3, kind: "money", value: lfTotal, wrong: [150 * 24 + 260 * 20 + 280 * 11, 280 * 11 + 260 * 20], stem: "Calculate the maximum monthly contribution.", explanation: `R 280 × 11 = 3,080; Q 260 × 20 = 5,200; P 50 × 24 = 1,200; total ${usd(lfTotal)}.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why ranking the products by contribution per unit would give a lower total contribution.", points: ["P has the highest contribution per unit but earns only US\\$6 per machine hour", "Machine time is scarce, so the contribution per hour is what matters", "Making P first would use up the hours that R and Q use more profitably"], modelAnswer: "P earns the most per unit but only US\\$6 an hour. Since hours are scarce, products earning more per hour should come first.", explanation: "One mark for each point." }),
      P.manual({ label: "(e)", marks: 4, stem: "The owner is asked to supply 100 extra units of P to a regular customer, which would reduce the production of Q. Advise, using figures and non-financial factors.", points: ["100 units of P use 400 hours, which would replace 200 units of Q", "That would lose 200 × 20 = 4,000 of contribution and gain only 100 × 24 = 2,400", "On contribution alone the extra P reduces profit by 1,600", "Non-financial: the customer is a regular one and goodwill may justify the loss, or other capacity could be hired"], modelAnswer: "The 400 hours for 100 units of P would replace 200 units of Q. The business would gain 2,400 but lose 4,000, a net loss of 1,600. It should accept only if goodwill with the regular customer or extra capacity makes up for it.", hints: ["Compare the contribution gained with the contribution lost."], explanation: "One mark for each point." }),
    ],
    hints: ["Rank by contribution per machine hour.", "Respect the demand limits."],
    explanation: "This item tests limiting factor ranking, a plan and an evaluation of a change.",
  });

  b.card("DEFINITION", "Relevant cost", "A future cash cost that changes because of a decision; ignore sunk costs and unchanged apportioned overheads.");
  b.card("CONCEPT", "Special order rule", "Accept if the price exceeds the extra variable and extra fixed costs and there is spare capacity.");
  b.card("CONCEPT", "Make or buy", "Compare variable plus avoidable fixed cost of making with the purchase price; add non-financial factors.");
  b.card("CONCEPT", "Closing a department", "Close only if contribution lost is less than avoidable fixed costs saved.");
  b.card("DEFINITION", "Limiting factor", "A scarce resource that restricts output; rank products by contribution per unit of that resource.");
  b.card("FORMULA", "Contribution per unit of scarce resource", "Contribution per unit ÷ units of the scarce resource used per unit of product.");
  b.card("FACT", "Non-financial factors", "Quality, reliability of supply, jobs and morale, reputation, effect on regular customers, ethics.");
  b.card("CONCEPT", "Why full cost misleads", "Full cost includes fixed overhead that does not change with a short-run decision, so it can lead to rejecting a profitable order.");
  b.card("CONCEPT", "Making a recommendation", "State the decision, quote the figures, name an assumption and a non-financial factor.");
});
void p1; void r2;
