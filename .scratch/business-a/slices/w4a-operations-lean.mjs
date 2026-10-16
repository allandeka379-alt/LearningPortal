// W4a: operations.lean (ZIMSEC Business Studies Form 6 and Cambridge A Level; not BES)
import { concept, P, table, money, chk, r2, rd, pctChange, operations } from "../lib.mjs";
import { mc } from "../tables/w4a-lib.mjs";

concept("abus.operations.lean", { file: "operations/lean", keyPrefix: "operations.lean" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "**Kaizen** is best described as",
    ok: ["continuous improvement in small steps", "Correct: every employee looks constantly for small improvements."],
    bad: [["a once-a-year review by managers", "Kaizen is constant and involves all employees, not an annual review by managers."], ["a way of delivering materials on time", "That describes just-in-time, not kaizen."], ["a team that makes a whole product", "That describes cell production."]],
    explanation: "Kaizen is the Japanese word for continuous improvement, achieved by many small changes suggested by workers.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In **cell production**, workers are organised so that",
    ok: ["a small team makes a whole product or part", "Correct: the team takes responsibility for the whole job and for its quality."],
    bad: [["each worker repeats one task all day", "That describes a conventional flow line, which cells replace."], ["products are made only after orders arrive", "That describes just-in-time production rather than cells."], ["design and production happen at the same time", "That describes simultaneous engineering."]],
    explanation: "A cell is a small team making a complete product or component, so faults are found sooner and workers take responsibility.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which effect on **inventory** is most directly linked to just-in-time manufacturing?",
    ok: ["Stock of materials is kept very low", "Correct: materials arrive when they are needed, so little is stored."],
    bad: [["Larger buffer stocks protect against delay", "That is the opposite of JIT, which removes buffer stock."], ["Stock is checked once a year", "JIT depends on constant, close control of stock, not an annual check."], ["Finished goods are made in advance of orders", "JIT makes goods to meet orders rather than for stock."]],
    hints: ["JIT means materials arrive only when needed."],
    explanation: "JIT keeps stock of materials and finished goods to a minimum, which cuts storage cost and frees cash.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional furniture maker in Bulawayo changes to JIT delivery of timber. Which problem is **most likely** to cause production to stop?",
    ok: ["A supplier's delivery arrives late", "Correct: with no buffer stock, a late delivery leaves workers without timber."],
    bad: [["Too much timber is stored in the yard", "JIT removes large stores, so this is unlikely."], ["Workers make suggestions for improvement", "Suggestions do not stop production."], ["The factory has too many finished chairs", "JIT makes goods to order, so a pile of finished chairs is unlikely."]],
    hints: ["What protects the firm when something goes wrong with supply?"],
    explanation: "JIT removes the buffer of stock, so the business depends on reliable suppliers. A late delivery can stop production.",
  });
  const lpB = operations.labourProductivity(9000, 30), lpA = operations.labourProductivity(11250, 30);
  chk(pctChange(lpB, lpA), 25);
  mc(b, {
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional bakery in Masvingo employs 30 bakers. After introducing cell production its output rises from 9,000 loaves a month to 11,250 loaves a month with the same number of bakers. By what percentage has output per worker risen?",
    ok: ["25%", "Correct: output per worker rose from 300 to 375, an increase of 75 on 300."],
    bad: [["20%", "That takes the rise of 2,250 as a percentage of the new output (11,250)."], ["375%", "That is the new output per worker, not the percentage change."], ["2,250%", "That is the rise in loaves, not a percentage."]],
    hints: ["Work out the output per worker before and after."],
    explanation: `Output per worker = 9,000 ÷ 30 = ${lpB} before and 11,250 ÷ 30 = ${lpA} after. Percentage rise = (375 - 300) ÷ 300 × 100 = 25%. Using the new figure as the base gives 20%.`,
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "A fictional small shop in Chinhoyi sells bread whose demand is very uneven from day to day, and its flour supplier is unreliable. Which is the best reason why full JIT is **unlikely to suit it**?",
    ok: ["Uneven demand and unreliable supply", "Correct: with no buffer stock, either factor could leave the shop without bread to sell."],
    bad: [["Lean production always raises costs", "Lean production normally lowers costs; the problem is the shop's conditions."], ["Workers cannot make suggestions in a shop", "Workers can make suggestions in any business."], ["JIT works only for large businesses", "Size alone does not decide whether JIT is suitable."]],
    hints: ["JIT depends on forecasting demand and receiving supplies on time."],
    explanation: "JIT works best where demand is steady and suppliers are reliable. The shop has neither, so removing stock would risk lost sales.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A quality circle is a group of workers who meet to find solutions to quality problems.",
    answer: true,
    explanation: "True. Quality circles are small groups from one work area who identify the causes of problems and suggest solutions to management.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Lean production always increases a business's capacity to meet a sudden rise in demand.",
    answer: false,
    explanation: "False. Lean production removes spare capacity and buffer stock, so it can make it harder to meet a sudden rise in demand.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each technique to its description.",
    pairs: [["Kaizen", "Continuous improvement through small steps"], ["Quality circle", "A group of workers who meet to solve quality problems"], ["Cell production", "A small team makes a whole product"], ["Simultaneous engineering", "Design and production work at the same time"]],
    explanation: "Each technique is a different part of lean production.",
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Lean production aims to remove {{blank:a}} while keeping quality. Just-in-time manufacturing keeps {{blank:b}} to a minimum.",
    blanks: [
      { id: "a", accepted: ["waste"], choices: ["waste", "workers", "profit"] },
      { id: "b", accepted: ["stock"], choices: ["stock", "prices", "wages"] },
    ],
    explanation: "Lean production removes waste; JIT keeps stock low.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** risk of using just-in-time manufacturing.",
    accepted: ["late deliveries stop production", "supplier delay", "supplier delays", "depends on reliable suppliers", "no buffer stock", "cannot meet sudden demand", "stock outs", "stockouts", "production may stop", "supplier failure", "unreliable suppliers", "shortage of materials", "delays in delivery"],
    explanation: "Accept any risk caused by having no buffer stock: late or failed deliveries, stoppage of production or inability to meet a sudden rise in orders.",
  });

  chk(rd((180 / 15000) * 100, 1), 1.2);
  b.num({
    d: 2, skill: "APPLICATION", kind: "pct", value: (180 / 15000) * 100, calculator: true, daily: true, wrong: [83.3, 12],
    stem: "A fictional garment factory in Gweru made 15,000 garments in a month, of which 180 were defective after it introduced quality circles. Calculate the defect rate, to one decimal place. (Defect rate = defective garments ÷ output × 100.)",
    hints: ["Divide the defective garments by the total output."],
    explanation: "180 ÷ 15,000 × 100 = 1.2%. Dividing output by the defects (15,000 ÷ 180) turns the fraction upside down and gives 83.3; 12% comes from dropping a zero.",
  });
  const saveStock = (30000 - 11000) * 0.15;
  chk(saveStock, 2850);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: saveStock, calculator: true, wrong: [19000, 4500],
    stem: "A fictional hardware shop in Harare reduces its average stock from US\\$30,000 to US\\$11,000 after adopting just-in-time ordering. It assumes that holding stock costs 15% of its value each year. Calculate the annual saving in holding costs.",
    hints: ["Find the fall in stock first, then take 15% of it."],
    explanation: "Fall in stock = 30,000 - 11,000 = US\\$19,000. Saving = 19,000 × 15% = US\\$2,850 a year. The US\\$19,000 itself is cash released, not an annual saving.",
    workedSolution: "1. Fall in average stock = 30,000 - 11,000 = US\\$19,000.\n2. Annual holding-cost saving = 19,000 × 0.15 = US\\$2,850.",
  });
  const unitB = r2(24000 / 800), unitA = r2(21000 / 840);
  chk(unitB, 30); chk(unitA, 25);
  b.calc({
    d: 4, skill: "ANALYSIS", kind: "money", value: unitB - unitA, calculator: true, wrong: [3000, 4.5],
    stem: "A fictional furniture workshop in Mutare spent US\\$24,000 on labour and materials in a month and made 800 chairs. After a kaizen programme it spent US\\$21,000 and made 840 chairs. Calculate the fall in cost per chair.",
    hints: ["Cost per chair = total cost ÷ number of chairs, before and after."],
    explanation: "Before: 24,000 ÷ 800 = US\\$30. After: 21,000 ÷ 840 = US\\$25. The fall is US\\$5 per chair. The fall in total cost (US\\$3,000) is not the fall per chair.",
    workedSolution: "1. Cost per chair before = 24,000 ÷ 800 = US\\$30.\n2. Cost per chair after = 21,000 ÷ 840 = US\\$25.\n3. Fall = 30 - 25 = US\\$5.",
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain what is meant by waste in lean production.",
    points: ["Anything that uses resources but adds no value the customer would pay for", "Examples: excess stock, waiting time, defects or overproduction", "Lean production aims to find and remove it"],
    modelAnswer: "Waste is anything that uses resources but adds no value the customer would pay for, such as excess stock, waiting time, defects or overproduction. Lean production aims to find and remove it.",
    hints: ["Think of what the customer is willing to pay for."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "A fictional tuck-shop supplier in Masvingo introduces a quality circle among its packers. Explain two benefits to the business.",
    points: ["Packers know the job and can spot the causes of errors", "Application: fewer wrong or damaged orders reach the shops", "Workers are more involved and motivated by being listened to", "Application: lower labour turnover or better teamwork among the packers"],
    modelAnswer: "The packers know the job well and can spot why orders are wrong or damaged, so fewer faulty orders reach the shops. Being listened to also motivates the packers, which can reduce labour turnover and improve teamwork.",
    hints: ["Link each benefit to the packers or the shops."],
    explanation: "Two benefits, each developed in context.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how cell production might affect the employees of a clothing factory.",
    points: ["Workers become multi-skilled because they do many tasks in the cell", "Teamwork and responsibility for quality increase", "Possible motivation gain from a more varied job", "Training costs and worries about job loss or stress may arise"],
    modelAnswer: "In a cell, workers become multi-skilled because they carry out many tasks, and they share responsibility for quality. This can be more motivating than one repeated task. However, workers need training, and some may worry about job loss or feel more stress from team targets.",
    hints: ["Consider both positive and negative effects for the workers."],
    explanation: "One point per mark.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "A fictional bakery chain in Bulawayo wants to adopt lean production in all its bakeries. Assess whether this is a good decision.",
    points: ["Waste, defects and stock can be reduced, which lowers cost", "Kaizen and quality circles use the bakers' ideas and improve motivation", "JIT needs reliable flour deliveries; late deliveries could stop baking", "Demand for bread may rise sharply at certain times, and lean production leaves little spare capacity", "Counter-argument: parts of lean production, such as kaizen, carry little risk and can be adopted anyway", "Judgement with a reason, for example adopt kaizen now and JIT only where suppliers are reliable"],
    modelAnswer: "Lean production could lower costs by cutting waste, defects and stock, and kaizen and quality circles would use the bakers' ideas and improve motivation. However, JIT depends on reliable flour deliveries, and a late delivery would stop baking, while sudden peaks in demand are harder to meet when there is little spare capacity. Kaizen carries little risk and could be adopted everywhere. The chain should adopt kaizen now and introduce JIT only in bakeries with reliable suppliers.",
    hints: ["Separate the techniques: some carry little risk, others a lot."],
    explanation: "One point per mark; a judgement needs a reason.",
  });

  // Practice structured 1 (9 marks)
  const out1 = 7200, out2 = 8640, w = 24;
  const pr1 = operations.labourProductivity(out1, w), pr2 = operations.labourProductivity(out2, w);
  chk(pr1, 300); chk(pr2, 360);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: "A fictional shoe factory in Gweru employs 24 workers. Before it introduced cell production it made 7,200 pairs of shoes a month. After the change, with the same workers, it made 8,640 pairs a month. Workers in each cell now check each pair for faults before passing it on.",
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "plain", unit: "pairs per worker", value: pr1, wrong: [7200, 24], stem: "Calculate output per worker before the change.", explanation: "7,200 ÷ 24 = 300 pairs per worker." }),
      P.num({ label: "(b)", marks: 2, kind: "pct", value: pctChange(pr1, pr2), wrong: [16.7, 1440], stem: "Calculate the percentage rise in output per worker after the change, to one decimal place.", explanation: "After = 8,640 ÷ 24 = 360. Rise = (360 - 300) ÷ 300 × 100 = 20.0%. Using the new figure as the base gives 16.7%." }),
      P.manual({ label: "(c)", marks: 5, stem: "Explain two ways in which cell production could help the factory to improve quality.", points: ["Each cell checks its own work, so faults are found at once", "Application: faulty shoes are corrected before they pass to the next stage", "Workers take responsibility for the whole product", "Application: a cell that makes a faulty pair can see its own mistakes, so it has a reason to avoid them", "Fewer defective shoes reach customers, protecting the factory's reputation"], modelAnswer: "Each cell checks its own work, so a faulty pair of shoes is found and corrected at once before it moves on. The workers also take responsibility for the whole pair, so they have a reason to avoid mistakes. Fewer defective shoes reach customers, which protects the factory's reputation.", explanation: "Two ways, developed with the shoe factory." }),
    ],
    hints: ["Productivity = output ÷ workers.", "Percentage change uses the old figure as the base."],
    explanation: "Productivity 300 to 360 pairs per worker, a rise of 20.0%; cells improve quality by quick checking and shared responsibility.",
  });

  // Practice structured 2 (14 marks)
  const sB = 36000, sA = 14000, holding = 0.2;
  const saving = (sB - sA) * holding;
  chk(saving, 4400);
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `A fictional mining-supplies manufacturer in Bulawayo introduced just-in-time delivery of steel and a kaizen scheme. Its average stock of steel fell from ${money(sB)} to ${money(sA)}. It assumes that holding stock costs ${holding * 100}% of its value a year. The change cost ${money(6000)} in training and new storage racks, paid in the first year. In the second year a lorry strike delayed deliveries and production stopped for three days.`,
    parts: [
      P.num({ label: "(a)", marks: 3, kind: "money", type: "CALCULATION", value: saving, wrong: [sB - sA, sA * holding], stem: "Calculate the annual saving in holding costs.", explanation: "Fall in stock = 36,000 - 14,000 = 22,000. Saving = 22,000 × 20% = US\\$4,400.", workedSolution: "1. Fall in average stock = 36,000 - 14,000 = US\\$22,000.\n2. Saving = 22,000 × 0.20 = US\\$4,400 a year." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r2(6000 - saving), wrong: [saving, 10400], stem: "Calculate by how much the first-year cost of the change exceeds the first-year saving.", explanation: "6,000 - 4,400 = US\\$1,600, so the change makes a net loss of US\\$1,600 in the first year." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain one reason why a lorry strike creates a problem for a business using just-in-time delivery.", points: ["There is no buffer stock of steel", "Application: production stopped for three days", "Workers are idle and orders may be late, so customers may be lost"], modelAnswer: "The factory holds no buffer stock of steel, so when deliveries stopped production stopped for three days. Workers were idle and orders were late, so customers might look elsewhere.", explanation: "A reason developed using the case." }),
      P.manual({ label: "(d)", marks: 6, stem: "Evaluate whether the manufacturer was right to introduce just-in-time delivery.", points: ["Holding costs fall by US\\$4,400 a year and cash is released", "The first-year cost of US\\$6,000 means it takes more than one year to recover", "Risk: the three-day stoppage cost output and goodwill", "Kaizen may reduce waste and improve quality in addition", "Counter-argument: a small buffer stock could protect against the strike without losing most of the saving", "Judgement with a reason, for example worthwhile over several years if some stock is held as a safeguard"], modelAnswer: "The change saves US\\$4,400 a year and releases US\\$22,000 of cash, but its first-year cost of US\\$6,000 means the manufacturer takes more than a year to recover the outlay. The three-day stoppage shows the risk of holding no buffer. Kaizen may add savings by reducing waste. Overall the decision was right over several years, provided the firm now holds a small safety stock of steel to protect against strikes and late deliveries.", hints: ["Compare the saving, the cost and the risk."], explanation: "Weighs the saving, the cost and the risk of stoppage to a judgement." }),
    ],
    hints: ["Holding-cost saving = fall in stock × the percentage.", "A negative net result is a loss."],
    explanation: "Saving US\\$4,400 a year; first-year net loss US\\$1,600; JIT risks stoppage without a buffer.",
  });

  // Practice structured 3 (15 marks)
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional school production unit near Harare makes uniforms. Orders are steady during the school terms and very low during holidays. It buys cloth from two suppliers in Harare who always deliver within a day. The head of the unit is considering lean production: cell production for sewing, JIT delivery of cloth and a monthly kaizen meeting with all staff. There are 12 staff, most of them pupils on work experience who join for one term.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Define the term 'just-in-time'.", points: ["A system where materials arrive only when needed for production", "Finished goods are made to meet orders", "So that very little stock is held"], modelAnswer: "Just-in-time is a system in which materials arrive only when they are needed and goods are made to meet orders, so that very little stock is held.", explanation: "One point per mark." }),
      P.manual({ label: "(b)", marks: 4, stem: "Analyse one reason why JIT could suit the unit.", points: ["Suppliers are reliable and deliver within a day", "Stock of cloth can be cut, so storage space and cash tied up fall", "Application: orders are steady in term, so cloth needs can be forecast", "Waste from cloth that is not used falls or spoils"], modelAnswer: "The two suppliers deliver within a day, so the unit can safely order cloth when it is needed. Orders are steady during term, so the amount of cloth needed can be forecast, and cutting stock frees storage space and cash.", explanation: "One reason, analysed in context." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether the unit should adopt lean production.", points: [["JIT and cell production suit steady orders and reliable suppliers", 2], ["Kaizen needs trained staff who stay long enough to suggest and test ideas; pupils stay for one term only", 2], ["Low demand in holidays means little need for spare capacity, so lean working carries little risk", 1], ["Training and reorganising the sewing room cost money and time for a small unit", 1], ["Counter-argument: pupils' fresh ideas may help and the method is a useful lesson in business", 1], ["Judgement with a reason: adopt JIT and cells, and make the kaizen meeting simple", 1]], levels: [[3, 6, 8, "Techniques linked to the unit's conditions, both benefits and limits weighed, and a justified judgement"], [2, 3, 5, "Benefits and limits with some application; judgement weakly supported"], [1, 1, 2, "Describes lean techniques with little application"]], modelAnswer: "The unit has steady orders in term and suppliers that deliver within a day, so JIT and cell production suit it well and would cut stock and waste. The weaker point is kaizen, which relies on staff who know the job well, whereas most of the 12 staff are pupils who stay for one term. Low demand in holidays means that the lack of spare capacity matters little. Training and re-arranging the sewing room cost money and time, but the unit is small. On balance the unit should adopt JIT and cell production, and use a simple monthly kaizen meeting where the permanent staff record the pupils' suggestions so they are not lost each term.", hints: ["Compare the unit's conditions with the conditions that make lean production work.", "Notice who the workforce is."], explanation: "Uses the case facts - steady orders, reliable suppliers, short-stay staff - to judge." }),
    ],
    hints: ["Use the facts in the extract about orders, suppliers and staff."],
    explanation: "JIT and cell suit the unit; kaizen is harder with short-stay staff; a justified judgement is needed.",
  });

  b.card("DEFINITION", "Lean production", "Producing goods or services with the least waste of materials, time, stock, space and effort while keeping quality.");
  b.card("DEFINITION", "Kaizen", "Continuous improvement: all employees constantly suggest and make small improvements to the way work is done.");
  b.card("DEFINITION", "Just-in-time (JIT) manufacturing", "Materials arrive only when needed and goods are made to meet orders, so very little stock is held.");
  b.card("DEFINITION", "Cell production", "A small team of workers makes a whole product or part, taking responsibility for its quality.");
  b.card("DEFINITION", "Quality circle", "A small group of workers who meet regularly to find causes of quality problems and suggest solutions.");
  b.card("DEFINITION", "Simultaneous engineering", "Design, production, marketing and purchasing work on a new product at the same time instead of in sequence.");
  b.card("FACT", "Limitations of lean production", "Needs reliable suppliers, leaves little spare capacity, costs money to introduce and may meet resistance from workers.");
  b.card("CONCEPT", "When lean production is appropriate", "Steady demand, reliable local suppliers and trained, stable staff favour it; unpredictable demand and unreliable supply make JIT risky.");
  b.card("FACT", "Forms of waste", "Overproduction, waiting, unnecessary movement, excess stock, over-processing, defects and under-used skills.");
});
