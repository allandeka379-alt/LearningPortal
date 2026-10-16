// W4a: operations.strategy-flexibility (Cambridge A Level only; auto-tagged to Cambridge)
import { concept, P, money, chk, r2, rd, pctChange, operations } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.operations.strategy-flexibility", { file: "operations/strategy-flexibility", keyPrefix: "operations.strategy-flexibility" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is a type of operational **flexibility**?",
    ok: ["Flexibility in volume", "Correct: volume, delivery time and specification are the three types."],
    bad: [["Flexibility in profit", "Profit is a result of operations, not a type of operational flexibility."], ["Flexibility in ownership", "Ownership is not an operations concept."], ["Flexibility in taxation", "Tax rules are set by government, not by the business's operations."]],
    explanation: "Operations can be flexible in the volume produced, the delivery time and the specification of the product.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A fictional carpentry workshop in Bulawayo changes the size and design of a table to suit each customer. Which type of flexibility is this?",
    ok: ["Specification", "Correct: the features of the product are changed to suit the customer."],
    bad: [["Volume", "Volume flexibility is about producing more or fewer units."], ["Delivery time", "Delivery flexibility is about the speed of response to an order."], ["Location", "Location is not one of the three types of flexibility."]],
    hints: ["What is being changed: how many, how soon or what features?"],
    explanation: "Changing a product to suit each customer is flexibility in specification.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which method gives an operation more **volume flexibility**?",
    ok: ["Using temporary staff in busy periods", "Correct: the workforce can be increased and reduced as demand changes."],
    bad: [["Fixing output at the same level all year", "Fixed output is the opposite of volume flexibility."], ["Making only one standard product", "A single product does not make the volume flexible."], ["Buying the largest possible machine", "A large machine adds fixed capacity but not the ability to adjust it."]],
    hints: ["Think of how output can go up and down."],
    explanation: "Temporary staff, overtime, subcontracting and leased equipment allow output to rise and fall with demand.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "A fictional courier business in Johannesburg uses artificial intelligence to plan delivery routes. Which is the most direct benefit?",
    ok: ["Shorter routes and lower fuel cost", "Correct: AI can compare many possible routes and choose short ones."],
    bad: [["Fewer vehicles needed for the same output", "A fall in vehicles is a possible later result, not the direct benefit of better routes."], ["Higher prices for customers", "Better routes lower cost; they do not raise prices."], ["No need for any drivers", "Routing software helps drivers; it does not replace them."]],
    hints: ["What does routing software change first?"],
    explanation: "AI routing finds efficient routes, cutting distance, time and fuel. This is the first and most direct effect.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional dairy in Gweru has low cash reserves and demand that rises in the dry season. Which operations decision is most consistent with its **finance resources**?",
    ok: ["Lease cooling equipment for the busy season", "Correct: leasing gives extra capacity without a large purchase."],
    bad: [["Buy a large plant to cover every peak", "A large purchase is difficult to afford with low cash."], ["Ignore the rise in demand and hope it passes", "Ignoring demand would lose sales."], ["Cut quality to save money on ingredients", "Cutting quality does not match the cash constraint and would harm sales."]],
    hints: ["Think about a cheaper way to get capacity for a short time."],
    explanation: "Leasing or hiring equipment matches a limited budget and a seasonal peak. Buying for the peak would tie up cash.",
  });
  const cu = operations.capacityUtilisation(9600, 8000);
  chk(cu, 120);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional printer in Gweru can print 8,000 flyers a week. During the election season it receives orders for 9,600 flyers a week. At what percentage of capacity would it have to operate to meet these orders?",
    ok: ["120%", "Correct: 9,600 ÷ 8,000 × 100."],
    bad: [["83.3%", "That divides capacity by demand, the wrong way round."], ["20%", "That is the excess over capacity as a percentage, not the capacity use."], ["1,600%", "That is the extra number of flyers, not a percentage."]],
    hints: ["Capacity utilisation = output ÷ capacity × 100."],
    explanation: `Capacity utilisation = 9,600 ÷ 8,000 × 100 = ${cu}%. A figure above 100% means the business cannot meet the order from its present capacity.`,
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional tailoring business promises same-day delivery in its adverts, but its workers can only make suits one at a time and its stock of cloth is small. What is the main problem?",
    ok: ["Promises that operations cannot meet", "Correct: delivery flexibility is missing, so customers will be disappointed."],
    bad: [["Too much finance is available", "The problem is not an excess of finance."], ["Specification flexibility is too high", "The problem concerns delivery speed, not product features."], ["Process innovation is being used too much", "No process innovation is described."]],
    hints: ["Compare what marketing promises with what operations can do."],
    explanation: "The marketing and operations areas are not aligned: the business promises a speed its production and stock cannot deliver.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional small bakery in Masvingo is thinking of buying an expensive automated oven that can switch quickly between products. Which factor is **most important** in judging the purchase?",
    ok: ["Whether customers want varied products", "Correct: flexibility pays only if demand for variety is large enough to use it."],
    bad: [["Whether the oven looks modern to visitors", "Appearance does not decide whether the investment pays."], ["Whether competitors also own similar ovens", "Copying competitors does not show that the oven is worth its cost."], ["Whether the bakery has a good name", "A good name helps sales but does not decide the value of this purchase."]],
    hints: ["When does flexibility earn a return?"],
    explanation: "The oven only pays if there is enough demand for varied products to cover its cost; otherwise the flexibility is wasted.",
  });

  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Flexible operations always have lower unit costs than inflexible operations.",
    answer: false,
    hints: ["Think about the cost of spare capacity and multi-skilled staff."],
    explanation: "False. Flexibility can leave equipment and staff under-used and may need higher-paid, multi-skilled workers, which can raise unit costs.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning.",
    pairs: [["Volume flexibility", "Ability to raise or lower the quantity produced"], ["Delivery flexibility", "Ability to change how fast orders are met"], ["Specification flexibility", "Ability to change the features of the product"], ["Process innovation", "Changing the way goods or services are produced"]],
    explanation: "The three flexibilities are volume, delivery time and specification; process innovation changes the production process.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Operations strategy is the {{blank:a}}-term plan for using resources. Changing the way a good is made, for example with a new machine, is called process {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["long"], choices: ["long", "short", "one-day"] },
      { id: "b", accepted: ["innovation"], choices: ["innovation", "inflation", "inspection"] },
    ],
    explanation: "Operations strategy is a long-term plan; process innovation changes how things are produced.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which artificial intelligence can help operations management.",
    accepted: ["forecast demand", "forecasting demand", "predict demand", "plan delivery routes", "route planning", "predict machine failure", "predictive maintenance", "check quality", "quality checking", "inspect products for faults", "reduce waste", "improve scheduling", "plan production", "schedule production", "manage stock", "control stock"],
    explanation: "Accept: forecasting demand, planning routes, predicting machine breakdowns, checking quality, scheduling production or controlling stock.",
  });

  const extraF = 1600, ot = r2(extraF * (0.02 * 1.5 + 0.03)), sub = r2(extraF * 0.07);
  chk(ot, 96); chk(sub, 112);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: ot, calculator: true, wrong: [sub, r2(extraF * 0.05)],
    stem: "A fictional printer in Gweru must print 1,600 extra flyers in a busy week. Labour costs US\\$0.02 a flyer and materials US\\$0.03 a flyer. Overtime is paid at one and a half times the normal labour rate. Calculate the extra cost of printing the 1,600 flyers using overtime.",
    hints: ["Overtime applies to the labour cost only."],
    explanation: "Labour in overtime = 0.02 × 1.5 = US\\$0.03; plus materials 0.03 = US\\$0.06 a flyer. 1,600 × 0.06 = US\\$96. Using the normal labour rate gives US\\$80 (0.05 × 1,600).",
    workedSolution: "1. Overtime labour per flyer = 0.02 × 1.5 = US\\$0.03.\n2. Cost per flyer = 0.03 + 0.03 = US\\$0.06.\n3. Extra cost = 1,600 × 0.06 = US\\$96.",
  });
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: r2(sub - ot), calculator: true, wrong: [112, 16.5],
    stem: "The printer could instead subcontract the 1,600 extra flyers at US\\$0.07 each. Calculate how much cheaper overtime is than subcontracting. (Overtime costs US\\$0.06 a flyer.)",
    hints: ["Find each total cost and subtract."],
    explanation: "Subcontracting = 1,600 × 0.07 = US\\$112. Overtime = 1,600 × 0.06 = US\\$96. Overtime is cheaper by US\\$16. The subcontract total alone (US\\$112) is not the difference.",
    workedSolution: "1. Subcontract = 1,600 × 0.07 = US\\$112.\n2. Overtime = 1,600 × 0.06 = US\\$96.\n3. Difference = 112 - 96 = US\\$16.",
  });
  const sp = operations.spareCapacity(9000, 12000);
  chk(sp, 3000);
  b.num({
    d: 2, skill: "APPLICATION", kind: "units", value: sp, wrong: [9000, 75],
    stem: "A fictional bottling plant in Mutare can fill 12,000 bottles a day but is filling 9,000 a day. Calculate its spare capacity in bottles a day.",
    hints: ["Spare capacity = maximum capacity - actual output."],
    explanation: "12,000 - 9,000 = 3,000 bottles a day. The figure 75 is the capacity utilisation as a percentage.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by flexibility in operations.",
    points: ["The ability to change operations quickly in response to customer demands", "In terms of volume, delivery time or specification", "Without a large rise in cost or loss of quality"],
    modelAnswer: "Flexibility is the ability of operations to change quickly when customers' needs change, in the volume made, the speed of delivery or the specification of the product, without a large rise in cost or loss of quality.",
    hints: ["Name the three things that can be changed."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional safari lodge near Victoria Falls has guests who arrive in large numbers in July and August. Explain two ways in which the lodge could achieve volume flexibility.",
    points: ["Employ seasonal or part-time staff for the busy months", "Application: extra guides and housekeeping staff in July and August", "Lease extra equipment or outsource laundry rather than buy", "Application: the lodge pays for laundry only when it has guests"],
    modelAnswer: "The lodge could employ seasonal staff, so there are extra guides and housekeeping staff in July and August but no wages in quiet months. It could also outsource laundry to a laundry business, so it pays only when it has guests.",
    hints: ["Link each way to the lodge's busy season."],
    explanation: "Two ways, each applied to the lodge.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how limited finance might restrict the operations strategy of a small manufacturer.",
    points: ["It cannot buy new machinery, so capacity and productivity stay low", "It cannot hold large stocks, so it may run out and delay deliveries", "It may rely on cheaper labour-intensive methods", "As a result unit costs may remain higher and the business less able to compete or grow"],
    modelAnswer: "Limited finance means the manufacturer cannot afford new machinery, so capacity and productivity stay low. It cannot hold large stocks and may run out and delay deliveries. It may rely on labour-intensive methods that cost more per unit, which makes it harder to compete or grow.",
    hints: ["Follow the chain from limited finance to lower competitiveness."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional furniture maker in Harare plans to replace its hand tools with computer-controlled machines. Assess whether this process innovation is likely to be worthwhile.",
    points: ["The machines can raise productivity and consistency of quality", "They allow quick changes in specification, helping custom orders", "The purchase and training cost a large sum and can be a heavy burden", "Skilled workers may resist or need retraining; production may be disrupted at first", "Counter-argument: the machines are worthwhile only if orders are large enough to use them", "Judgement with a reason, for example worthwhile if demand is growing and finance is available; otherwise lease or phase the change"],
    modelAnswer: "Computer-controlled machines could raise productivity and the consistency of quality, and let the firm change specifications quickly for custom orders. But they cost a lot to buy and to train staff for, and production may be disrupted when they are introduced. The change is worthwhile only if orders are large enough to use the machines. If demand is growing and finance is available, the firm should go ahead; otherwise it should lease the machines or introduce them gradually.",
    hints: ["Consider benefit, cost and the condition that decides."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const cuS = operations.capacityUtilisation(5400, 6000);
  chk(cuS, 90);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional furniture maker in Mutare can make 6,000 chairs a year and made 5,400 last year. A hotel chain has asked for 1,800 chairs in a special design that the workers have never made. The owner has US\\$4,000 in cash.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: cuS, wrong: [111.1, 10], stem: "Calculate last year's capacity utilisation, to one decimal place.", explanation: "5,400 ÷ 6,000 × 100 = 90.0%." }),
      P.num({ label: "(b)", marks: 2, kind: "units", value: 600, wrong: [1800, 1200], stem: "How many of the 1,800 chairs could be made with the spare capacity?", explanation: "Spare capacity = 6,000 - 5,400 = 600 chairs; the rest of the order (1,200) is beyond capacity." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain two problems the owner might face in accepting the order.", points: ["The order is larger than the spare capacity", "Application: only 600 chairs could be made without extra capacity", "The workers have not made the design, so training or retraining is needed", "Application: this takes time and may delay delivery", "Limited cash of US\\$4,000 restricts investment in extra machines or materials"], modelAnswer: "The order of 1,800 chairs is larger than the spare capacity of 600, so the maker would need more workers or machines. The workers have never made the design, so they would need training, which could delay delivery. With only US\\$4,000 in cash the owner may not be able to pay for extra materials or equipment.", explanation: "Two problems, applied." }),
    ],
    hints: ["Capacity utilisation = output ÷ capacity × 100.", "Compare the order with the spare capacity."],
    explanation: "Utilisation 90.0%; spare capacity 600 chairs; the order exceeds it and needs new skills and cash.",
  });

  // Practice structured 2 (14 marks): AI routing
  const perB = 4.2, perA = 3.5, deliveries = 180, days = 300;
  const annualSave = r2((perB - perA) * deliveries * days);
  chk(annualSave, 37800);
  const fall = (perB - perA) / perB * 100;
  const firstYear = r2(annualSave - 18000 - 3000);
  chk(firstYear, 16800);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional courier business in Johannesburg makes ${deliveries} deliveries a day and works ${days} days a year. Before using artificial intelligence (AI) to plan routes, the cost of each delivery was ${money(perB)}; after, it is ${money(perA)}. The AI software cost ${money(18000)} to install and has a licence fee of ${money(3000)} a year, paid in the first year. Some drivers say they feel watched, and in the first month the software sent a van down a road closed for repairs.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "pct", value: fall, wrong: [20, 16.7], stem: "Calculate the percentage fall in the cost of each delivery, to one decimal place.", explanation: "(4.20 - 3.50) ÷ 4.20 × 100 = 16.7%. Using the new cost as the base gives 20.0%." }),
      P.num({ label: "(b)", marks: 3, kind: "money", type: "CALCULATION", value: annualSave, wrong: [r2(0.7 * deliveries), r2(perA * deliveries * days)], stem: "Calculate the annual saving in delivery costs.", explanation: "Saving per delivery = 4.20 - 3.50 = US\\$0.70. 0.70 × 180 × 300 = US\\$37,800.", workedSolution: "1. Saving per delivery = 4.20 - 3.50 = US\\$0.70.\n2. Deliveries a year = 180 × 300 = 54,000.\n3. Annual saving = 54,000 × 0.70 = US\\$37,800." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: firstYear, wrong: [annualSave, r2(annualSave - 18000)], stem: "Calculate the net gain in the first year after the installation cost and the licence fee.", explanation: "37,800 - 18,000 - 3,000 = US\\$16,800." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate whether the introduction of AI route planning was a good decision.", points: ["Delivery cost falls 16.7% and the first-year net gain is US\\$16,800", "The saving of US\\$37,800 a year recurs, while the installation cost is paid once", "Risk: poor data caused a van to take a closed road, so some deliveries were late", "Drivers' feelings of being watched may reduce morale and increase labour turnover", "Software failure or the licence fee rising could reduce the benefit", "Counter-argument: drivers can be consulted and routes checked by a manager to correct errors", "Judgement with a reason, for example good decision, provided the business trains staff and checks the routes"], levels: [[3, 5, 7, "Savings calculated and set against the risks in the case; a justified judgement"], [2, 3, 4, "Some benefits and risks with some use of the figures; judgement weakly supported"], [1, 1, 2, "Statements about AI with little use of the case"]], modelAnswer: "The decision looks good. Delivery cost falls by 16.7% and the first-year net gain is US\\$16,800, with a saving of US\\$37,800 a year to follow, while the installation cost is paid once. There are risks: the software sent a van down a closed road, which can delay deliveries, and drivers feel watched, which may hurt morale and raise labour turnover. The business could reduce these risks by consulting drivers and checking the routes. Overall it was a good decision, provided staff are trained and the software's routes are checked.", hints: ["Use the savings figures and the problems described in the extract."], explanation: "Weighs the savings against the risks in the case." }),
    ],
    hints: ["Percentage change uses the old figure as the base.", "Annual deliveries = deliveries a day × days."],
    explanation: "Delivery cost falls 16.7%; annual saving US\\$37,800; first-year net gain US\\$16,800; evaluation weighs savings against risks.",
  });

  // Practice structured 3 (18 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional tourism lodge near Victoria Falls has a restaurant that serves guests from 12 rooms. Bookings are heavy from June to September and light for the rest of the year. Guests increasingly ask for vegetarian meals and for breakfast served earlier for sunrise trips. The lodge has 10 permanent kitchen staff, little cash and a bank overdraft. A supplier is offering a computer system that predicts bookings and orders food automatically for a monthly fee.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain what is meant by flexibility in specification.", points: ["The ability to change the features of a product or service", "To suit different customers' wishes", "Application: for the lodge, offering vegetarian meals as well as the standard menu"], modelAnswer: "Flexibility in specification means being able to change the features of what is made or provided to suit different customers. For the lodge it means being able to offer vegetarian meals as well as the standard menu.", explanation: "Definition and one application." }),
      P.manual({ label: "(b)", marks: 6, stem: "Analyse two ways in which the lodge could increase the flexibility of its kitchen operations.", points: ["Train permanent kitchen staff in several tasks so they can switch to vegetarian dishes or early breakfast", "Application: staff can serve sunrise breakfast without hiring more", "Use seasonal or part-time staff in June to September", "Application: the lodge pays extra wages only when bookings are high", "Flexibility reduces lost bookings and complaints", "It raises costs through training and lower use of staff in the quiet months"], modelAnswer: "The lodge could train its permanent kitchen staff in several tasks, so they can prepare vegetarian dishes and serve early breakfast without extra hiring. It could also employ seasonal staff from June to September, so it pays extra wages only when bookings are high. Both ways reduce lost bookings and complaints, but training costs money and staff are under-used in the quiet months.", explanation: "Two ways analysed in context." }),
      P.manual({ label: "(c)", marks: 9, stem: "Evaluate whether the lodge should adopt the computer system.", points: [["It can predict bookings and order food, reducing waste and shortages", 2], ["It can help with seasonal peaks by planning orders in advance", 1], ["A monthly fee adds to cost for a lodge with little cash and an overdraft", 2], ["The system depends on good booking data, which may be poor for a small lodge", 1], ["Staff must learn the system, and it may fail or give wrong forecasts", 1], ["Counter-argument: savings from less waste may cover the fee", 1], ["Judgement with a reason: try it for one season or adopt it if the fee is lower than the likely savings", 1]], levels: [[3, 7, 9, "Benefits and costs weighed using the lodge's cash, seasonal bookings and staff; a justified judgement"], [2, 4, 6, "Benefits and costs with some application; judgement weakly supported"], [1, 1, 3, "General statements about technology with little application"]], modelAnswer: "The system could reduce food waste and shortages by predicting bookings, which is useful where demand varies a great deal between June to September and the rest of the year. However, the lodge has little cash and an overdraft, so a monthly fee is a burden, and the forecasts depend on good booking data that a small lodge may not have. Staff must also learn the system, and it may give wrong forecasts. If the savings from less waste cover the fee, it is worthwhile. The lodge should try the system for one season, compare the fee with the savings, and then decide whether to continue.", hints: ["Use the details in the extract: cash, overdraft, seasons, number of rooms."], explanation: "Weighs the savings against the fee and the lodge's finances." }),
    ],
    hints: ["Use the facts in the extract in each part."],
    explanation: "Specification flexibility; two ways of increasing flexibility; a judgement on the computer system.",
  });

  b.card("DEFINITION", "Operations strategy", "A long-term plan for using people, equipment, materials, money and technology to produce goods or services in line with the business's aims.");
  b.card("DEFINITION", "Flexibility (operations)", "The ability of operations to change quickly and cheaply in volume, delivery time or specification as customers' needs change.");
  b.card("CONCEPT", "Volume, delivery and specification flexibility", "Volume = how much is made; delivery time = how fast orders are met; specification = what features the product has.");
  b.card("DEFINITION", "Process innovation", "Changing the way goods or services are produced or delivered, by improving current processes or adopting new ways of working.");
  b.card("CONCEPT", "Resources that limit operations", "Human resources (numbers and skills), marketing (demand and promises made) and finance (cash for equipment and stock).");
  b.card("FACT", "AI in operations", "Can forecast demand, plan delivery routes, predict machine failure and check quality; costs money, needs data and skilled staff.");
  b.card("FACT", "Ways to gain volume flexibility", "Temporary or part-time staff, overtime, subcontracting, leased equipment and spare capacity.");
  b.card("FACT", "Cost of flexibility", "Spare capacity, multi-skilled workers and flexible equipment raise unit costs when they are not fully used.");
  b.card("CONCEPT", "Evaluating flexibility", "Judge it against demand for variety or seasonal change, the cash available and the skills of the workforce.");
});
