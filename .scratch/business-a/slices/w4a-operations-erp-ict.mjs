// W4a: operations.erp-ict (ZIMSEC Business Studies Form 6: CAD/CAM, computerised stock control and costing -> applies ZBS;
// Cambridge A Level: ERP -> applies CAM; general items untagged)
import { concept, P, CAM, ZBS, money, chk, r2, invest, table } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.operations.erp-ict", { file: "operations/erp-ict", keyPrefix: "operations.erp-ict" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL", applies: CAM,
    stem: "What is the main feature of an **enterprise resource planning (ERP)** system?",
    ok: ["A single database shared by all", "Correct: sales, stock, production and finance all use the same up-to-date information."],
    bad: [["A separate record for each department", "Separate records are what ERP replaces."], ["A system that replaces all managers", "ERP provides information to managers; it does not replace them."], ["A way of advertising online", "That describes marketing software, not ERP."]],
    explanation: "ERP links the main functions of the business through a single database so that information is entered once and shared.",
  });
  mc(b, {
    d: 1, skill: "RECALL", applies: ZBS,
    stem: "What does **CAD** stand for in operations?",
    ok: ["Computer-aided design", "Correct: computers are used to create and test designs."],
    bad: [["Computer-aided delivery", "CAD is about design, not delivery."], ["Controlled assembly of designs", "This is not the meaning of CAD."], ["Customer account database", "This is not the meaning of CAD."]],
    explanation: "CAD is computer-aided design. CAM, computer-aided manufacturing, uses computers to control the machines that make the product.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which benefit of computerised **inventory control** is most direct?",
    ok: ["Stock levels are known at once", "Correct: stock is recorded as it moves, so managers can see what is held."],
    bad: [["Stock never needs to be counted", "Occasional counts are still needed to check the records."], ["Suppliers always deliver on time", "A computer system cannot make suppliers deliver on time."], ["Customers pay more for goods", "Prices to customers are not changed by the stock system."]],
    hints: ["Think about what the computer records and when."],
    explanation: "Computerised control records stock as it is received and issued, so levels are always up to date and low stock can be spotted early.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a typical **limitation** of introducing an integrated computer system?",
    ok: ["Staff need training and may resist", "Correct: users must learn new methods, and some staff dislike change."],
    bad: [["Information becomes less accurate", "A good system makes information more accurate, provided the data entered is correct."], ["Costs of every kind fall straight away", "The system itself costs money to buy and install."], ["No electricity is required", "Computer systems depend on power."]],
    hints: ["Think of the people who must use the system."],
    explanation: "Training, resistance and disruption are common costs of a new system, in addition to its price.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", applies: CAM,
    stem: "A fictional hardware wholesaler in Harare uses ERP. When a customer's order is entered, the stock module shows that cement is below its reorder level and a purchase order is raised. Which area of operations does this **most directly** improve?",
    ok: ["Inventory (stock) control", "Correct: the system links sales to stock and triggers ordering before a shortage."],
    bad: [["Product design and testing", "The example is about stock, not designing products."], ["Branding and advertising", "Branding is a marketing matter and is not concerned here."], ["Wage negotiation talks", "Wage negotiation is unrelated to the stock link described."]],
    hints: ["What does the system do once the order is entered?"],
    explanation: "Linking sales and stock lets the business order materials in time, reducing stock-outs and excess stock.",
  });
  const rows = [["Lower stock held", (50000 - 38000) * 0.15], ["Admin time saved", 1200 * 2.5], ["Lost sales avoided", 4200]];
  const tot = r2(rows.reduce((s, r) => s + r[1], 0));
  chk(tot, 9000);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional timber merchant in Mutare estimates that a stock and costing system will lower its stock held from US\\$50,000 to US\\$38,000 (holding cost 15% a year), save 1,200 hours of clerical work at US\\$2.50 an hour and avoid US\\$4,200 of lost sales a year. What are the total annual benefits?",
    ok: [money(tot), "Correct: 1,800 + 3,000 + 4,200."],
    bad: [[money(7200), "That leaves out the holding-cost saving."], [money(19200), "That adds the whole fall in stock (US\\$12,000) instead of the holding-cost saving."], [money(6000), "That leaves out the saving in clerical work."]],
    hints: ["Only the holding cost of the stock saved is a yearly benefit."],
    explanation: `Holding cost saved = 12,000 × 15% = 1,800. Clerical saving = 1,200 × 2.50 = 3,000. Lost sales avoided = 4,200. Total = US\\$${tot.toLocaleString("en-GB")}.`,
  });
  mc(b, {
    d: 4, skill: "ANALYSIS", applies: CAM,
    stem: "A fictional furniture factory has ERP, but its storekeeper often forgets to record issues of timber. What is the most likely effect?",
    ok: ["Wrong stock records mislead decisions", "Correct: the system relies on accurate data, so errors spread to ordering and costing."],
    bad: [["Costs of timber will fall automatically", "Wrong records do not reduce costs; they cause errors."], ["The ERP system will correct the errors itself", "The system cannot know about issues that are never recorded."], ["Suppliers will deliver faster", "Supplier speed is not affected by internal recording."]],
    hints: ["What does an integrated system depend on?"],
    explanation: "ERP is only as good as the data entered. Unrecorded issues make stock records wrong, which leads to wrong orders and wrong job costs.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A fictional small tuck shop with two staff and a single product line is offered a full ERP package at a high price. Which is the best reason for **not** buying it?",
    ok: ["Costs are likely to exceed benefits", "Correct: a very small business would use little of the system and gain little from linking functions."],
    bad: [["Computers cannot hold stock records", "Computers hold stock records well."], ["ERP can only ever be used by large factories", "It is not true that ERP can only be used by large factories; small ones often use parts of it."], ["Customers dislike computer records", "Customers are not concerned with internal records."]],
    hints: ["Compare the cost with the benefits a very small business could gain."],
    explanation: "The benefits of integration grow with size and complexity. For a tiny shop a simple stock program may give most of the benefit at a fraction of the cost.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", applies: ZBS,
    stem: "Computer-aided manufacturing (CAM) uses computers to control the machines that make a product.",
    answer: true,
    explanation: "True. CAM uses computers to control machines and the process of manufacture; CAD is used for the design stage.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A computerised system removes the need for accurate data to be entered by staff.",
    answer: false,
    explanation: "False. The system depends on the data entered. If staff record stock or costs wrongly, the reports will be wrong.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ICT tool or term to its use.",
    pairs: [["Computer-aided design", "Creating and testing product designs on screen"], ["Computer-aided manufacturing", "Controlling machines that make the product"], ["Computerised inventory control", "Recording stock as it is received and issued"], ["Computerised costing", "Recording costs of each job as they arise"]],
    explanation: "Each tool applies computers to a different part of operations.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING", applies: CAM,
    stem: "Choose the correct word for each gap.",
    template: "An ERP system uses a single {{blank:a}} that is shared by all departments, so information needs to be entered only {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["database"], choices: ["database", "telephone", "building"] },
      { id: "b", accepted: ["once"], choices: ["once", "weekly", "twice a year"] },
    ],
    explanation: "ERP stores information in one shared database, entered once and used by every department.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** way in which computerised costing can help a manufacturer.",
    accepted: ["accurate costs", "more accurate costs", "records costs of each job", "helps set prices", "better pricing", "shows cost of each product", "saves time", "reduces errors", "faster calculation", "quicker calculation", "up to date cost information", "helps control costs", "identifies waste"],
    explanation: "Accept: more accurate and up-to-date costs for each job or product, better prices, time saved, fewer errors, or easier cost control.",
  });

  const outlay = 16000 + 3500, benefit = 8200, support = 1300;
  const net = benefit - support;
  const pb = invest.payback(outlay, [net, net, net, net, net]);
  chk(net, 6900); chk(Math.round(pb * 100) / 100, 2.83);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "years", value: pb, calculator: true, wrong: [r2(outlay / benefit), 3.5],
    stem: `A fictional clothing factory in Gweru buys a computerised stock and costing system for ${money(16000)} plus ${money(3500)} for installation and training. It expects annual benefits of ${money(benefit)} and pays a support fee of ${money(support)} a year. Benefits arise evenly through each year. Calculate the payback period in years, to two decimal places.`,
    hints: ["Use the net annual benefit after the support fee."],
    explanation: `Outlay = 16,000 + 3,500 = US\\$19,500. Net annual benefit = 8,200 - 1,300 = US\\$6,900. Payback = 19,500 ÷ 6,900 = 2.83 years. Ignoring the support fee gives 2.38 years.`,
    workedSolution: "1. Outlay = 16,000 + 3,500 = US\\$19,500.\n2. Net annual benefit = 8,200 - 1,300 = US\\$6,900.\n3. Payback = 19,500 ÷ 6,900 = 2.83 years.",
  });
  const st = r2(0.3 * 40000 * 0.15);
  chk(st, 1800);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: st, calculator: true, wrong: [12000, 6000],
    stem: "A fictional bakery chain in Bulawayo holds average stock of US\\$40,000. Its new computerised stock control is expected to cut stock by 30%, and holding stock costs 15% of its value a year. Calculate the annual saving in holding costs.",
    hints: ["Find 30% of the stock first, then 15% of that."],
    explanation: "Stock cut = 40,000 × 30% = US\\$12,000. Saving = 12,000 × 15% = US\\$1,800 a year.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by enterprise resource planning (ERP).",
    points: ["Software that links the main functions of a business", "Through a single database that all departments share", "So that information is entered once and everyone uses up-to-date data"],
    modelAnswer: "ERP is software that links functions such as sales, stock, production and finance through one database shared by all departments, so information is entered once and everyone works with up-to-date data.",
    hints: ["Say what is linked and how."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional bakery in Masvingo has separate stock records for flour, sugar and packaging. Explain two ways in which a computerised stock system could help it.",
    points: ["It records stock as it is used, so levels are always up to date", "Application: the baker knows when flour is low and can order before running out", "It can give a warning when stock reaches the reorder level", "Application: avoids baking being stopped and reduces over-ordering of sugar that may go hard"],
    modelAnswer: "The system records stock as it is used, so the baker always knows how much flour is left and can order before running out. It can also warn when stock reaches the reorder level, which avoids stopping baking and stops over-ordering of sugar that may go hard.",
    hints: ["Link each way to flour, sugar or packaging."],
    explanation: "Two ways, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how better management information from an ERP system could improve pricing decisions.",
    points: ["Costs of each product or job are recorded accurately", "The manager knows the true cost of making each item", "Prices can be set to give the profit wanted and not below cost", "Reports on sales and demand show which items can bear a higher price"],
    modelAnswer: "The system records the costs of each product accurately, so the manager knows the true cost of making each item. Prices can then be set to give the profit wanted and avoid selling below cost. Reports on sales also show which items can bear a higher price.",
    hints: ["Follow the chain from accurate cost to price."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional furniture factory with 35 workers in Bulawayo is considering an ERP system. Evaluate whether it should buy one.",
    points: ["It links orders, stock and production, reducing stock-outs and late deliveries", "Accurate costing helps set better prices", "The cost of buying, installing and training is high for a 35-worker business", "Power failures and poor data can stop the system or mislead managers", "Counter-argument: modules can be introduced one at a time to spread the cost", "Judgement with a reason, for example buy the stock and costing modules first with a back-up power supply"],
    modelAnswer: "An ERP system would link orders, stock and production, reducing stock-outs and late deliveries, and accurate costs would help set better prices. But buying, installing and training staff is expensive for a business with 35 workers, and power failures or poor data could stop the system or mislead managers. The modules can be introduced one at a time. The factory should start with the stock and costing modules and make sure there is a back-up power supply.",
    hints: ["Weigh the benefits against cost and the conditions in which the factory works."],
    explanation: "One point per mark; the judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional building-materials supplier in Chinhoyi spends ${money(5400)} a year on clerical staff to prepare orders and invoices by hand. A computerised system would cut this work by two thirds, but its software costs ${money(7200)} and training ${money(1800)}.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: 3600, wrong: [1800, 5400], stem: "Calculate the annual saving in clerical costs.", explanation: "Two thirds of 5,400 = US\\$3,600." }),
      P.num({ label: "(b)", marks: 2, kind: "years", value: 9000 / 3600, wrong: [1.5, 2.0], stem: "Calculate the payback period in years, to two decimal places, if the only benefit is the saving in clerical costs.", explanation: "Outlay = 7,200 + 1,800 = 9,000. Payback = 9,000 ÷ 3,600 = 2.50 years." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain two benefits other than the saving in cost that the supplier could gain from the system.", points: ["Orders and invoices are produced faster and with fewer errors", "Application: customers receive correct invoices sooner, which may reduce late payments", "Stock records are always up to date", "Application: the supplier knows when cement or paint is low and can order in time", "Better information for managers on sales and stock"], modelAnswer: "Orders and invoices are produced faster and with fewer errors, so customers receive correct invoices sooner and may pay on time. Stock records are always up to date, so the supplier knows when cement or paint is low and can order in time, avoiding lost sales.", explanation: "Two benefits, each applied." }),
    ],
    hints: ["Outlay = software plus training.", "Payback = outlay ÷ annual saving."],
    explanation: "Saving US\\$3,600 a year; payback 2.50 years; benefits include speed, accuracy and stock information.",
  });

  // Practice structured 2 (14 marks)
  const sBefore = 2400, sAfter = 1500, cost = 12.5;
  const lostBefore = 120, lostAfter = 30;
  const profitPer = 8;
  const annualGain = r2((lostBefore - lostAfter) * profitPer * 12);
  chk(annualGain, 8640);
  b.struct({
    d: 4, skill: "ANALYSIS", applies: CAM, calculator: true,
    stem: `A fictional furniture factory in Mutare introduced ERP. Before ERP it recorded ${lostBefore} lost orders a month because materials were out of stock, and each lost order lost ${money(profitPer)} of profit. After ERP, lost orders fell to ${lostAfter} a month. Average stock of materials fell from ${money(36000)} to ${money(24000)}, and holding stock costs 15% of its value a year. The system cost ${money(27500)} and a support fee of ${money(3500)} a year. In the first month, several storekeepers entered receipts wrongly.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", type: "CALCULATION", value: annualGain, wrong: [(lostBefore - lostAfter) * profitPer, lostAfter * profitPer * 12], stem: "Calculate the profit gained in a year from the fall in lost orders.", explanation: "Fall in lost orders = 120 - 30 = 90 a month. Profit gained = 90 × 8 × 12 = US\\$8,640.", workedSolution: "1. Fall in lost orders = 120 - 30 = 90 a month.\n2. Monthly profit = 90 × 8 = US\\$720.\n3. Annual gain = 720 × 12 = US\\$8,640." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2((36000 - 24000) * 0.15), wrong: [12000, 5400], stem: "Calculate the annual saving in holding costs.", explanation: "Fall in stock = 12,000; 15% of 12,000 = US\\$1,800." }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: r2(annualGain + 1800 - 3500), calculator: true, wrong: [annualGain + 1800, annualGain - 3500], stem: "Calculate the net annual benefit after the support fee.", explanation: "8,640 + 1,800 - 3,500 = US\\$6,940." }),
      P.manual({ label: "(d)", marks: 7, stem: "Evaluate whether introducing ERP was a good decision for the factory.", points: ["Net annual benefit of US\\$6,940 against a cost of US\\$27,500: payback of almost four years", "Lost orders fell by three quarters, keeping customers", "Stock held fell, releasing US\\$12,000 of cash", "Early errors by storekeepers show the need for training and accurate data", "Benefits not counted, such as better costing and management information", "Counter-argument: the payback is long and benefits may be overestimated", "Judgement with a reason, for example worthwhile in the long run if staff are trained"], levels: [[3, 5, 7, "Figures used with the case; benefits, costs and risks weighed; a justified judgement"], [2, 3, 4, "Some figures and some weighing; judgement weakly supported"], [1, 1, 2, "General statements about ERP with little use of the case"]], modelAnswer: "The net annual benefit is US\\$6,940 against a cost of US\\$27,500, so payback is almost four years, which is fairly long. However, lost orders fell by three quarters, keeping customers, stock fell and released US\\$12,000 of cash, and benefits such as better costing and information are not counted. The early errors show that staff need training and accurate data entry. Overall the decision was probably worthwhile in the long run, provided the factory trains its storekeepers and the benefits continue.", hints: ["Calculate the payback and set it against the other benefits and risks."], explanation: "Uses the net benefit, the payback and the case facts to reach a judgement." }),
    ],
    hints: ["Annual figures need the monthly figure × 12.", "Subtract the support fee from the benefits."],
    explanation: "Profit gain US\\$8,640; holding-cost saving US\\$1,800; net benefit US\\$6,940; evaluation weighs payback, benefits and risks.",
  });

  // Practice structured 3 (15 marks): ZIMSEC style CAD/CAM
  b.struct({
    d: 4, skill: "ANALYSIS", applies: ZBS,
    stem: `A fictional metal-fabrication workshop in Gweru makes gates and window frames to customers' designs. Each new design is drawn by hand and takes two days; changes mean drawing it again. The cutting machines are set by hand. The owner is considering computer-aided design (CAD) and computer-aided manufacturing (CAM) equipment costing ${money(16000)}.`,
    parts: [
      P.manual({ label: "(a)", marks: 4, stem: "Distinguish between CAD and CAM.", points: ["CAD uses computers to create and test designs", "Application: the workshop could draw and change a gate design on screen", "CAM uses computers to control the machines that make the product", "Application: the cutting machines could cut metal to the design without being set by hand"], modelAnswer: "CAD uses computers to create and test designs, so the workshop could draw and change a gate design on screen. CAM uses computers to control machines, so the cutting machines could cut the metal to the design without being set by hand.", explanation: "Each definition with an application." }),
      P.manual({ label: "(b)", marks: 5, stem: "Outline two advantages to the workshop of CAD and CAM.", points: ["Designs can be changed quickly", "Application: customers' changes need no redrawing by hand", "Cutting is accurate and repeatable", "Application: less metal is wasted and gates fit properly", "Speed of production rises"], modelAnswer: "Designs can be changed quickly on screen, so customers' changes need no redrawing by hand. Machine cutting is accurate and repeatable, so less metal is wasted and gates fit properly.", explanation: "Two advantages in context." }),
      P.manual({ label: "(c)", marks: 6, stem: "Discuss whether the owner should buy the CAD and CAM equipment.", points: ["Faster design and accurate cutting may win more orders", "Lower waste and labour time reduce costs", "The cost of US\\$16,000 may be large for a small workshop", "Workers need training and may fear losing jobs", "Counter-argument: orders may not be large enough to justify the cost", "Judgement with a reason, for example buy if orders are growing; otherwise start with CAD only"], modelAnswer: "Faster design and accurate cutting could win more orders and lower waste and labour costs. However, US\\$16,000 is a lot for a small workshop, and workers need training and may fear losing their jobs. If orders are not large enough the equipment would not pay for itself. The owner should buy it if orders are growing; otherwise he could start with CAD only.", hints: ["Weigh benefits against cost, and say what the decision depends on."], explanation: "A balanced discussion with a reasoned conclusion." }),
    ],
    hints: ["CAD = design, CAM = manufacture.", "Use the workshop's facts in each answer."],
    explanation: "Distinguishes CAD and CAM, gives advantages and discusses the purchase in context.",
  });

  b.card("DEFINITION", "Enterprise resource planning (ERP)", "Software linking sales, purchasing, inventory, production, finance and HR through one shared database.", "Cambridge A Level focus.", { applies: CAM });
  b.card("DEFINITION", "Computer-aided design (CAD)", "Using computers to create, test and change product designs on screen.", "ZIMSEC term.", { applies: ZBS });
  b.card("DEFINITION", "Computer-aided manufacturing (CAM)", "Using computers to control the machines and the process of making a product.", "ZIMSEC term.", { applies: ZBS });
  b.card("FACT", "How ERP improves operations", "Inventory control, costing and pricing, capacity utilisation, response to change, workforce flexibility and management information.", undefined, { applies: CAM });
  b.card("CONCEPT", "Computerised inventory control", "Stock is recorded as it moves, so levels are known at once and low stock can trigger an order.");
  b.card("CONCEPT", "Computerised costing", "Costs of materials, labour and overheads are recorded against each job, giving accurate costs and better prices.");
  b.card("FACT", "Costs and risks of ICT systems", "Purchase, installation, training, support fees, resistance, data errors and dependence on power and the system.");
  b.card("DEFINITION", "Management information system", "A system that collects and processes data into reports for managers to plan and decide.");
  b.card("CONCEPT", "Judging whether to introduce ERP", "Compare benefits and costs for the business's size, data quality, staff skills and power supply; consider phasing modules.", undefined, { applies: CAM });
});
