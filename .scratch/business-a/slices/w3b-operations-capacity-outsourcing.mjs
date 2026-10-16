// W3b: operations.capacity-outsourcing
import { concept, P, chk, money, table, operations, costing, r2, CAM } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.capacity-outsourcing", { file: "operations/capacity-outsourcing", keyPrefix: "operations.capacity-outsourcing" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Capacity utilisation is calculated as",
    ok: ["actual output divided by maximum output, multiplied by 100", "Correct: the share of capacity being used."],
    bad: [["maximum output divided by actual output, multiplied by 100", "This turns the fraction upside down."], ["actual output divided by total sales revenue, multiplied by 100", "Revenue is not the measure of capacity."], ["total fixed costs divided by total variable costs, multiplied by 100", "This is a cost ratio, not capacity."]],
    explanation: "Capacity utilisation (%) = actual output ÷ maximum output × 100.",
  });
  mc(b, {
    d: 1, applies: CAM, skill: "RECALL",
    stem: "When a business uses another firm to carry out part of its production or a service, this is called",
    ok: ["outsourcing", "Correct: work is given to an outside supplier."],
    bad: [["rationalisation", "Rationalisation means cutting capacity."], ["lean production", "Lean production aims to reduce waste in the firm's own processes."], ["job production", "Job production is a method of making one-off products."]],
    explanation: "Outsourcing means contracting work to an outside firm.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do unit costs normally rise when a factory operates well below its capacity?",
    ok: ["Fixed costs are spread over fewer units", "Correct: the same fixed cost is shared by a smaller output."],
    bad: [["Variable costs per unit become negative", "Variable costs per unit do not become negative."], ["Fixed costs rise as output falls", "Fixed costs stay the same in the short run."], ["Workers are paid for every unit they do not make", "Wages are not paid for units not made."]],
    explanation: "With low output the fixed cost per unit rises, so the total cost per unit rises.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a likely **problem** of operating above full capacity for a long time?",
    ok: ["More breakdowns and errors as machines and workers tire", "Correct: the system is stretched too far."],
    bad: [["Idle machines and a fall in morale because there is nothing to do", "That is a problem of under-capacity."], ["Higher fixed cost per unit because output is small", "Output is large, so fixed cost per unit is lower."], ["Plenty of room to accept special orders", "Spare capacity is needed for that, and there is none."]],
    explanation: "Running above capacity causes breakdowns, errors and late delivery.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Gweru can bake at most 2,000 loaves a day and is baking 1,500. Which action would **best** use its spare capacity?",
    ok: ["A regular contract to sell bread to a nearby school", "Correct: extra demand fills idle capacity."],
    bad: [["Closing one oven and dismissing the baker who uses it", "That cuts capacity, which is rationalisation, and is not needed when demand can be found."], ["Putting up the price of bread by one half, at once", "A large price rise would probably reduce sales and leave capacity idle."], ["Sub-contracting its baking to another large bakery", "Sub-contracting is used when capacity is too small, not when there is spare capacity."]],
    hints: ["The bakery has spare capacity, so it needs more demand."],
    explanation: "With spare capacity the best response is to find more sales, for example by a regular contract.",
  });
  mc(b, {
    d: 3, applies: CAM, skill: "ANALYSIS",
    stem: "A fictional printer outsources its binding work to a specialist. Which is a likely **risk**?",
    ok: ["Less control over quality and delivery times", "Correct: the supplier decides how the work is done."],
    bad: [["Higher fixed costs because of new binding machines", "Outsourcing avoids buying binding machines."], ["Loss of the supplier's specialist skills", "The firm gains the specialist's skills."], ["No need for any contract or agreement", "A contract is needed to protect quality and price."]],
    hints: ["Think about who controls the work."],
    explanation: "Outsourcing reduces the firm's control over quality and delivery and increases dependence.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a firm that is over capacity should build a new factory?",
    ok: ["It depends on whether the extra demand will last long enough to repay it", "Correct: the decision rests on whether demand continues."],
    bad: [["Yes, because larger factories always have lower costs per unit", "Diseconomies of scale may apply, and demand may fall."], ["No, because a new factory should never be built by any firm", "This ignores possible long-term demand."], ["Yes, because over capacity means that demand will always grow", "A temporary rise in demand may not last."]],
    hints: ["Think about how long the extra demand will last."],
    explanation: "A sound judgement depends on whether the extra demand lasts; sub-contracting is a lower-risk alternative.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Rationalisation means increasing a firm's capacity to meet higher demand.",
    answer: false,
    explanation: "False. Rationalisation means reducing capacity, for example closing a site or machines, to remove spare capacity and cut costs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "If a factory produces 4,500 units and its maximum capacity is 6,000 units, its capacity utilisation is 75%.",
    answer: true,
    explanation: "True. 4,500 ÷ 6,000 × 100 = 75%.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each response to the situation for which it is most suited.",
    pairs: [["Rationalisation", "Demand has fallen permanently and there is spare capacity"], ["Sub-contracting", "A temporary rush of orders exceeds capacity"], ["Promotion and new markets", "There is spare capacity and demand could be raised"], ["Flexible working", "Staff are needed at busy times and not at quiet times"]],
    explanation: "Each response suits a different capacity situation.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Spare capacity is the {{blank:a}} output minus the actual output. When spare capacity is large, the fixed cost per unit is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["maximum"], choices: ["maximum", "average", "minimum"] },
      { id: "b", accepted: ["high"], choices: ["high", "low", "zero"] },
    ],
    explanation: "Spare capacity = maximum − actual output. With low output the fixed cost per unit is high.",
  });


  {
    const act = 7200, max = 9000;
    const u = operations.capacityUtilisation(act, max);
    chk(u, 80, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional furniture factory can make at most ${max.toLocaleString("en-GB")} chairs a month and made ${act.toLocaleString("en-GB")} last month. Calculate its capacity utilisation as a percentage to one decimal place.`,
      kind: "pct", value: u, wrong: [(max / act) * 100, ((max - act) / max) * 100],
      explanation: "Utilisation = 7,200 ÷ 9,000 × 100 = 80.0%. Using the spare capacity (1,800) gives 20.0%.",
    });
  }
  {
    const max = 15000, act = 11400;
    const s = operations.spareCapacity(act, max);
    chk(s, 3600);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional bottling plant has a maximum capacity of ${max.toLocaleString("en-GB")} bottles a day and produces ${act.toLocaleString("en-GB")}. How many bottles of spare capacity does it have each day?`,
      kind: "units", value: s, wrong: [act, (act / max) * 100],
      explanation: "Spare capacity = 15,000 − 11,400 = 3,600 bottles.",
    });
  }
  {
    const max = 12000, pct = 85;
    const act = (max * pct) / 100;
    chk(act, 10200);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional garment factory has a maximum capacity of ${max.toLocaleString("en-GB")} shirts a month and is operating at ${pct}% capacity utilisation. How many shirts does it make in a month?`,
      kind: "units", value: act, wrong: [max - act, max * pct],
      hints: ["Find 85% of the maximum output."],
      explanation: "Output = 85% × 12,000 = 10,200 shirts. Subtracting gives the spare capacity of 1,800.",
    });
  }
  {
    const fixed = 18000, vc = 2.5, q = 6000;
    const u = costing.totalCost(fixed, vc, q) / q;
    chk(u, 5.5);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional factory has fixed costs of ${money(fixed)} a month and variable costs of ${money(vc)} a unit. It makes ${q.toLocaleString("en-GB")} units in a month. Calculate the total cost per unit.`,
      kind: "money", value: u, wrong: [vc, fixed / q],
      hints: ["Fixed cost per unit plus variable cost per unit."],
      workedSolution: "1. Fixed cost per unit = 18,000 ÷ 6,000 = US\\$3.00.\n2. Variable cost per unit = US\\$2.50.\n3. Total cost per unit = 3.00 + 2.50 = US\\$5.50.",
      explanation: "Total cost per unit = 3.00 + 2.50 = US\\$5.50. The fixed cost per unit alone is US\\$3.00.",
    });
  }
  {
    const boxes = 8000, vcIn = 1.25, avoid = 1800, out = 1.4;
    const inCost = boxes * vcIn + avoid, outCost = boxes * out;
    const sv = inCost - outCost;
    chk(sv, 600);
    b.calc({
      d: 4, applies: CAM, skill: "ANALYSIS", calculator: true,
      stem: `A fictional soap maker makes its own boxes. For ${boxes.toLocaleString("en-GB")} boxes a month the variable cost is ${money(vcIn)} a box, and ${money(avoid)} of fixed cost a month would be avoided if it stopped making them. A supplier offers the boxes at ${money(out)} each. How much a month would the soap maker save by outsourcing?`,
      kind: "money", value: sv, wrong: [boxes * (out - vcIn), boxes * vcIn - outCost],
      hints: ["Compare the costs that would disappear with the price paid to the supplier."],
      workedSolution: "1. Avoidable in-house cost = 8,000 × 1.25 + 1,800 = 10,000 + 1,800 = US\\$11,800.\n2. Cost of outsourcing = 8,000 × 1.40 = US\\$11,200.\n3. Saving = 11,800 − 11,200 = US\\$600 a month.",
      explanation: "The avoidable cost of making the boxes is US\\$11,800 against US\\$11,200 to buy them, so outsourcing saves US\\$600 a month. Ignoring the avoidable fixed cost wrongly shows a loss of US\\$1,200.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why operating at a low capacity utilisation may raise a firm's unit costs.",
    points: ["Fixed costs such as rent and machine costs stay the same however much is produced", "They are spread over fewer units, so the cost of each unit is higher"],
    modelAnswer: "Fixed costs such as rent and machine costs stay the same whatever the output. When output is low they are spread over fewer units, so the cost of each unit is higher.",
    explanation: "One mark for fixed costs staying the same, one for the effect on unit cost.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Sipho owns a fictional printing press in Bulawayo with a large order from a school that exceeds his capacity for a month. Explain **two** ways he could cope.",
    points: ["Sub-contract part of the order to another press", "Application: the other press prints some of the school's order, so the delivery date is met", "Work overtime or an extra shift for the month", "Application: overtime lets his own press print more, but it costs more per hour and may cause errors"],
    modelAnswer: "Sipho could sub-contract part of the order to another press, which prints some of the school's work so that the delivery date is met. He could also work overtime or an extra shift for the month, although this costs more per hour and tired workers may make errors.",
    hints: ["Think about doing the extra work himself and about using someone else's capacity."],
    explanation: "Two ways, each developed for the press.",
  });
  b.manualShort({
    d: 4, applies: CAM, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why outsourcing may reduce a firm's control over quality.",
    points: ["The supplier's staff and methods are not managed by the firm", "The firm cannot inspect the work as it is done", "Defects may be found only after delivery", "Faulty parts harm the firm's reputation with its customers"],
    modelAnswer: "The supplier's staff and methods are not managed by the firm, so the firm cannot inspect the work as it is done. Defects may be found only after delivery, and faulty parts harm the firm's reputation with its own customers.",
    hints: ["Who manages the work when it is outsourced?"],
    explanation: "A chain from lack of direct control to damage to reputation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional furniture maker has spare capacity of 30% because demand has fallen. Assess whether it should close one workshop (rationalisation).",
    points: ["Closing a workshop would remove idle capacity and cut fixed costs", "Unit costs would fall as the remaining capacity is used more fully", "Workers would lose their jobs, harming morale and the firm's reputation", "If demand recovers the firm would be unable to meet orders and would have to rebuild capacity", "Judgement with a condition, for example: close it if the fall in demand is likely to be permanent"],
    modelAnswer: "Closing a workshop would remove idle capacity and cut fixed costs, so unit costs fall as the remaining capacity is used more fully. But workers would lose their jobs, and if demand recovers the firm could not meet orders. It should close the workshop only if the fall in demand is likely to be permanent.",
    hints: ["Compare the cost saving with the risk that demand recovers."],
    explanation: "Both sides, then a conditional judgement.",
  });

  {
    const max = 6000, act = 3900, fixed = 21000, vc = 3.5;
    const u = (act / max) * 100;
    chk(u, 65, 1e-9);
    const unit = costing.totalCost(fixed, vc, act) / act;
    chk(unit, 8.8846, 1e-3);
    const unitFull = costing.totalCost(fixed, vc, max) / max;
    chk(unitFull, 7, 1e-9);
    const tbl = table(["Item", "Figure"], [["Maximum capacity (loaves a day)", max], ["Present output (loaves a day)", act], ["Fixed costs a day (US\\$)", fixed / 30], ["Variable cost per loaf (US\\$)", "0.35"]], ["l", "r"]);
    // daily figures: fixed 700, variable 0.35
    const dFixed = 700, dVc = 0.35, dMax = 6000, dAct = 3900;
    const dUnit = costing.totalCost(dFixed, dVc, dAct) / dAct, dUnitMax = costing.totalCost(dFixed, dVc, dMax) / dMax;
    chk(dUnit, 0.5295, 1e-3); chk(dUnitMax, 0.4667, 1e-3);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `Zuva Bakery is a fictional bakery in Mutare. The table shows its position on a typical day.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the bakery's capacity utilisation, as a percentage.", kind: "pct", value: u, wrong: [(max / act) * 100, 100 - u], explanation: "3,900 ÷ 6,000 × 100 = 65.0%." }),
        P.mcq({ label: "(b)", marks: 1, stem: "How many loaves of spare capacity does the bakery have each day?", options: [["2,100", "Correct: 6,000 − 3,900."], ["3,900", "This is present output, not spare capacity."], ["6,000", "This is the maximum capacity."], ["35", "This is the percentage of capacity unused."]], answer: "A", explanation: "Spare capacity = 6,000 − 3,900 = 2,100 loaves." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** problem for the bakery of operating at this level of capacity utilisation.", points: ["Fixed costs are spread over fewer loaves than the bakery could make", "Application: with US\\$700 of fixed cost spread over 3,900 loaves, the cost per loaf is higher than at full output", "Higher unit cost reduces profit or makes prices less competitive"], modelAnswer: "Fixed costs are spread over fewer loaves than the bakery could make. The US\\$700 of daily fixed cost is spread over 3,900 loaves, so the cost per loaf is higher than at full capacity, which reduces profit or makes the bakery's prices less competitive.", hints: ["Think about fixed cost per loaf."], explanation: "Fixed cost spread, application with figures, and the effect." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the bakery should try to raise capacity utilisation by supplying bread to a supermarket at a lower price.", points: ["Extra loaves would use idle capacity and spread the fixed cost", "A lower price may be profitable if it exceeds the variable cost of US\\$0.35 a loaf", "Judgement with a condition, for example: yes, if the supermarket price exceeds US\\$0.35 and does not lower its other prices"], modelAnswer: "Extra loaves would use idle capacity and spread the fixed cost over more loaves. A lower price would add to profit if it is above the variable cost of US\\$0.35 a loaf. The bakery should accept if the price is above US\\$0.35 and does not force it to lower the prices it charges its other customers.", hints: ["Compare the supermarket price with the variable cost."], explanation: "Spread of fixed cost, price against variable cost, and a conditional judgement." }),
      ],
      hints: ["Capacity utilisation = actual output ÷ maximum output × 100."],
      explanation: "Utilisation is 65.0%; spare capacity 2,100 loaves. Filling it at a price above the variable cost adds to profit.",
    });
  }
  {
    const inHouse = 2.2, outsource = 2.05, units = 9000, avoidable = 0.7, jobs = 5;
    // avoidable in-house cost per unit includes only costs that vanish
    const avoidCost = (inHouse - avoidable) * units; // costs that disappear: (2.20 - 0.70 unavoidable) per unit
    const outCost = outsource * units;
    chk(avoidCost, 13500); chk(outCost, 18450);
    // outsourcing is more expensive in true terms
    const diff = outCost - avoidCost;
    chk(diff, 4950);
    b.struct({
      d: 5, applies: CAM, skill: "EVALUATION", examStyle: true,
      stem: `Chipo's Wiring is a fictional manufacturer of electric cable assemblies in Gweru. It makes ${units.toLocaleString("en-GB")} plastic connector sets a month in its own workshop at a full cost of ${money(inHouse)} a set, which includes ${money(avoidable)} a set of fixed costs (rent and supervision) that would continue if it stopped making the connectors. A specialist firm offers the same connector sets at ${money(outsource)} each. The workshop employs ${jobs} people on connectors, who could be moved to cable assembly only if more orders are won. The owner says that outsourcing looks cheaper because ${money(outsource)} is less than ${money(inHouse)}.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the monthly cost of buying 9,000 connector sets from the specialist.", kind: "money", value: outCost, calculator: true, wrong: [inHouse * units, avoidCost], explanation: "9,000 × 2.05 = US\\$18,450." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse why the owner's comparison of US\\$2.05 with US\\$2.20 may be misleading.", points: ["US\\$0.70 of the US\\$2.20 is fixed cost that would continue after outsourcing", "The cost that disappears is only US\\$1.50 per set", "Buying at US\\$2.05 therefore costs more than the US\\$1.50 saved per set", "The real cost of outsourcing would be 9,000 × (2.05 − 1.50) = US\\$4,950 more a month"], modelAnswer: "Of the US\\$2.20 full cost, US\\$0.70 is fixed cost that would continue even if the connectors were bought in. Only US\\$1.50 a set would disappear, so buying at US\\$2.05 would cost US\\$0.55 more for each set, or US\\$4,950 more a month for 9,000 sets.", hints: ["Which part of the US\\$2.20 would disappear if the firm outsourced?"], explanation: "Only avoidable costs are relevant: US\\$1.50 against US\\$2.05." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Chipo's Wiring should outsource the connectors.", points: ["Outsourcing would cost US\\$4,950 a month more on the figures (18,450 against 13,500)", "The continuing fixed cost of US\\$0.70 a set (US\\$6,300 a month) would still have to be paid", "Five workers could lose jobs or need to be redeployed only if orders rise", "The specialist could provide better quality and let the firm focus on cable assembly", "The firm would depend on the supplier, which could raise its price later", "Outsourcing might make sense if the freed space could be used to earn more", ["Judgement with a reason, for example: do not outsource, since it is more costly on the figures", 1], ["Condition or time-frame, for example: reconsider if the supplier lowers its price below US\\$1.50 or the space can earn more", 1]], levels: [[1, 1, 3, "General points on outsourcing with little use of the case."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the avoidable cost comparison, with a justified judgement and a condition."]], modelAnswer: "The avoidable cost of making the connectors is US\\$1.50 a set, or US\\$13,500 for 9,000, against US\\$18,450 to buy them, so outsourcing would cost US\\$4,950 a month more. The US\\$0.70 of fixed cost would continue, and five workers could lose their jobs. The specialist might supply better quality and let the firm focus on cable assembly, but the firm would depend on the supplier and could face price rises. Chipo's Wiring should not outsource at this price. It should reconsider if the supplier's price falls close to US\\$1.50 or if the space and workers released can earn more elsewhere.", hints: ["Compare the cost that disappears with the price offered by the specialist."], explanation: "Avoidable cost US\\$13,500 against US\\$18,450 to buy. Outsourcing is not cheaper once continuing fixed costs are recognised." }),
      ],
      hints: ["Multiply the price per set by the number of sets."],
      explanation: "Buying costs US\\$18,450 a month, but only US\\$13,500 of in-house cost would disappear. Outsourcing costs US\\$4,950 more, so the owner's comparison is misleading.",
    });
  }

  b.card("DEFINITION", "Capacity utilisation", "The proportion of maximum possible output actually produced: actual output ÷ maximum output × 100.");
  b.card("FORMULA", "Spare capacity", "Spare capacity = maximum output − actual output.");
  b.card("CONCEPT", "Effects of under-capacity", "High fixed cost per unit, idle workers and machines, lower morale and profit; but able to accept special orders.");
  b.card("CONCEPT", "Effects of over-capacity", "Breakdowns, tired workers, errors, late deliveries and lost customers; overtime and repair costs.");
  b.card("FACT", "Ways to improve capacity utilisation", "More promotion and new markets, new uses for idle machines, rationalisation, flexible working; for excess demand: expand, sub-contract or raise prices.");
  b.card("DEFINITION", "Rationalisation", "Reducing capacity (closing sites or removing machines) to remove spare capacity and cut costs.");
  b.card("DEFINITION", "Outsourcing", "Using another business to carry out a function or part of production that the firm could do itself.", undefined, { applies: CAM });
  b.card("FACT", "Benefits and problems of outsourcing", "Lower cost, specialist skills, focus on core work, shared risk; but less control over quality, dependence on the supplier and possible job losses.", undefined, { applies: CAM });
  b.card("CONCEPT", "Make or buy: relevant costs", "Compare the price offered with the costs that would really disappear; fixed costs that continue are not a saving.", undefined, { applies: CAM });
});
