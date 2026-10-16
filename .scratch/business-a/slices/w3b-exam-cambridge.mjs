// W3b exam-format items (Cambridge): CAM_SHORT5 x2, CAM_DATA30 x1, CAM_ESSAY20 x2, CAM_P3_8 x2, CAM_P3_16 x1, CAM_P3_12 x1
import { concept, P, EXAM, checkExam, CAM, chk, r2, money, table, pctChange, operations, costing, sum } from "../lib.mjs";

const C = (k) => `abus.${k}`;
const common = (plan, paper) => ({ examStyle: true, skill: plan.skill, secs: plan.secs, applies: CAM, paper });

concept(C("mix.pricing"), { file: "exam/w3b-cambridge", keyPrefix: "exam.w3b-cambridge" }, (b) => {
  // ---------------- CAM_SHORT5 x2 (Paper 1 section A, AS)
  {
    const price = costing.priceFromMarkUp(32, 45);
    chk(price, 46.4);
    b.struct({
      d: 2, ...common(EXAM.CAM_SHORT5, "Cambridge Paper 1"), calculator: true, concepts: [C("mix.pricing")],
      stem: `A fictional furniture shop in Lusaka buys a chair for ${money(32)} and sets its selling price by adding a mark-up of 45% to this cost.`,
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "money", value: price, wrong: [32 / 0.55, 32 * 1.045], stem: "Calculate the selling price of the chair.", explanation: "32 × 1.45 = US\\$46.40. Treating 45% as a margin on price gives US\\$58.18." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain one limitation of the shop's method of pricing.", points: ["Cost-plus pricing ignores what customers are willing to pay", "Application: if rival shops sell similar chairs for less, the shop may lose sales at US\\$46.40", "The price is based on cost only, so it may be too low if customers would pay more"], modelAnswer: "Cost-plus pricing ignores what customers are willing to pay. If rival shops sell similar chairs for less than US\\$46.40, the shop may lose sales, and if customers would pay more the price is too low and profit is lost.", explanation: "One limitation, developed in context." }),
      ]),
      hints: ["Add the mark-up to the cost."], explanation: "Price US\\$46.40; cost-plus ignores demand and competition.",
    });
  }
  {
    const rol = operations.reorderLevel({ usagePerDay: 35, leadTimeDays: 4, buffer: 70 });
    chk(rol, 210);
    b.struct({
      d: 2, ...common(EXAM.CAM_SHORT5, "Cambridge Paper 1"), calculator: true, concepts: [C("operations.inventory-control")],
      stem: "A fictional hardware shop in Francistown sells 35 bags of cement a day. The supplier takes 4 days to deliver, and the shop keeps a buffer stock of 70 bags.",
      parts: checkExam(EXAM.CAM_SHORT5, [
        P.num({ label: "(a)", marks: 2, kind: "units", value: rol, wrong: [35 * 4, 35 + 70], stem: "Calculate the re-order level.", explanation: "35 × 4 + 70 = 140 + 70 = 210 bags. Leaving out the buffer gives 140." }),
        P.manual({ label: "(b)", marks: 3, stem: "Explain one benefit to the shop of holding buffer inventory.", points: ["It protects against late deliveries, so the shop does not run out", "Application: if the lorry is two days late, the shop can still sell 70 bags", "Builders who need cement can still be served, so sales and loyalty are protected"], modelAnswer: "A buffer protects the shop against late deliveries. If the lorry is two days late, the shop can still sell the 70 bags in its buffer, so builders who need cement are served and sales and loyalty are protected.", explanation: "One benefit, developed in context." }),
      ]),
      hints: ["Re-order level = usage in the lead time + buffer."], explanation: "Re-order level 210 bags; the buffer protects against late delivery.",
    });
  }

  // ---------------- CAM_DATA30 (Paper 2, AS)
  {
    const y1 = { out: 9600, emp: 48, lab: 230400, price: 180, promo: 19200 };
    const y2 = { out: 10800, emp: 48, lab: 226800, price: 175, promo: 27000 };
    const max = 14400, vc = 112;
    const util2 = operations.capacityUtilisation(y2.out, max), lp2 = operations.labourProductivity(y2.out, y2.emp);
    chk(util2, 75, 1e-9); chk(lp2, 225, 1e-9);
    const u1 = operations.unitLabourCost(y1.lab, y1.out), u2 = operations.unitLabourCost(y2.lab, y2.out);
    chk(u1, 24); chk(u2, 21);
    const chg = pctChange(u1, u2);
    chk(chg, -12.5, 1e-9);
    const spare = max - y2.out;
    chk(spare, 3600);
    const contr = 152 - vc, extra = 2400 * contr;
    chk(contr, 40); chk(extra, 96000);
    const inH = 5.1 * 10800 + 28000, outS = 6.5 * 10800;
    chk(inH, 83080, 1e-6); chk(outS, 70200, 1e-6); chk(inH - outS, 12880, 1e-6);
    const tbl = table(["", "Year 1", "Year 2"], [
      ["Bicycles assembled and sold", y1.out, y2.out],
      ["Maximum capacity (bicycles a year)", max, max],
      ["Employees", y1.emp, y2.emp],
      ["Labour cost (US\\$)", y1.lab, y2.lab],
      ["Selling price per bicycle (US\\$)", y1.price, y2.price],
      ["Promotion spending (US\\$)", y1.promo, y2.promo],
    ]);
    b.struct({
      d: 4, ...common(EXAM.CAM_DATA30, "Cambridge Paper 2"), calculator: true,
      concepts: [C("operations.productivity"), C("operations.capacity-outsourcing"), C("mix.pricing"), C("mix.promotion")],
      stem: `Savanna Cycles is a fictional bicycle assembler in Johannesburg. In Year 2 it cut its price slightly and increased promotion, and sales rose. The painting of the frames is done in the company's own paint shop, which has fixed costs of ${money(28000)} a year, with a variable cost of ${money(5.1)} a bicycle. A specialist painting company has offered to paint all frames at ${money(6.5)} a bicycle. A large retailer has also asked to buy 2,400 extra bicycles in Year 3 at ${money(152)} each; the variable cost of materials and assembly is ${money(vc)} a bicycle, and the other costs would not change. Some managers fear that the retailer's low price would make other retailers ask for the same.\n\n${tbl}\n\nUnit labour cost = labour cost ÷ output.`,
      parts: checkExam(EXAM.CAM_DATA30, [
        P.fib({ label: "(a)", marks: 2, stem: "Complete the sentences.", template: "Output divided by the number of employees is {{blank:a}}, while actual output as a percentage of maximum output is {{blank:b}}.", blanks: [{ id: "a", accepted: ["labour productivity"], choices: ["labour productivity", "capacity utilisation", "unit labour cost"] }, { id: "b", accepted: ["capacity utilisation"], choices: ["labour productivity", "capacity utilisation", "unit labour cost"] }], explanation: "Output per employee is labour productivity; actual output over maximum output is capacity utilisation." }),
        P.group({ label: "(b)", stem: "For Year 2, calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "pct", value: util2, wrong: [r2((14400 / 10800) * 100), 25], stem: "the capacity utilisation, to one decimal place;", explanation: "10,800 ÷ 14,400 × 100 = 75.0%." }),
          P.num({ label: "(ii)", marks: 2, kind: "plain", unit: "bicycles per employee", value: lp2, wrong: [r2(14400 / 48), r2(226800 / 10800)], stem: "the labour productivity, in bicycles per employee.", explanation: "10,800 ÷ 48 = 225 bicycles per employee." }),
        ] }),
        P.group({ label: "(c)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: u2, wrong: [lp2, 226800 / 14400], stem: "the unit labour cost in Year 2;", explanation: "226,800 ÷ 10,800 = US\\$21.00." }),
          P.num({ label: "(ii)", marks: 2, kind: "pct", value: chg, wrong: [r2(pctChange(21, 24)), 21 / 24 * 100], stem: "the percentage change in unit labour cost between Year 1 (US\\$24.00) and Year 2, to one decimal place (give a fall as a negative number).", explanation: "(21.00 − 24.00) ÷ 24.00 × 100 = −12.5%." }),
        ] }),
        P.manual({ label: "(d)", marks: 5, stem: "Explain two effects on Savanna Cycles of operating at 75% capacity utilisation.", points: ["Fixed costs are spread over fewer bicycles than the plant could make, so unit costs are higher", "Application: the paint shop's fixed costs of US\\$28,000 are shared by 10,800 bicycles instead of 14,400", "Spare capacity of 3,600 bicycles allows the company to accept extra orders without new investment", "Application: the retailer's request for 2,400 bicycles can be met within the spare capacity", ["Idle workers or machines may reduce morale and the efficiency of the business", 1]], modelAnswer: "At 75% capacity the fixed costs, such as the paint shop's US\\$28,000, are spread over 10,800 bicycles rather than 14,400, so the cost of each bicycle is higher. On the other hand, there is spare capacity of 3,600 bicycles, so the company can accept the retailer's request for 2,400 bicycles without new investment. Idle workers or machines may also reduce morale and efficiency.", hints: ["Think about costs per unit and about the retailer's order."], explanation: "Two effects, one adverse and one favourable, developed in context." }),
        P.manual({ label: "(e)", marks: 7, stem: "Analyse the advantages and disadvantages to Savanna Cycles of outsourcing the painting of frames.", points: ["In-house painting costs 5.10 × 10,800 + 28,000 = US\\$83,080 a year", "Outsourcing costs 6.50 × 10,800 = US\\$70,200, a saving of US\\$12,880 a year", "The saving arises because the paint shop's fixed costs of US\\$28,000 are removed", "The specialist may provide better quality painting and allow Savanna to focus on assembly", "Savanna has less control over quality and delivery times of painted frames", "The company becomes dependent on one supplier, which could raise its price later", "Painters may lose their jobs, damaging morale among remaining staff"], modelAnswer: "Painting in-house costs 5.10 × 10,800 + 28,000 = US\\$83,080 a year, while outsourcing costs 6.50 × 10,800 = US\\$70,200, a saving of US\\$12,880, because the fixed costs of US\\$28,000 are removed. The specialist may also provide a better finish and let Savanna focus on assembly. However, the company would have less control over the quality and delivery of frames, would depend on one supplier that could raise its price later, and the painters could lose their jobs, which would damage morale among the remaining staff.", hints: ["Compare the in-house cost with the outsourced cost first."], explanation: "Cost comparison plus control, dependence and morale." }),
        P.manual({ label: "(f)", marks: 8, stem: "Evaluate whether Savanna Cycles should accept the retailer's request to buy 2,400 extra bicycles at US\\$152 each.", points: ["The contribution on each bicycle is 152 − 112 = US\\$40", "The extra contribution is 2,400 × 40 = US\\$96,000, because other costs would not change", "Spare capacity is 3,600 bicycles, enough for the extra 2,400", "Utilisation would rise from 75.0% to 91.7%, reducing fixed cost per bicycle", "The price of US\\$152 is below the normal price of US\\$175, and other retailers may ask for the same", "Higher utilisation leaves less room for breakdowns or late deliveries", ["Judgement with a reason, for example: accept, because the contribution is large", 1], ["Condition or time-frame, for example: if the order can be kept separate from other retailers", 1]], levels: [[3, 6, 8, "Balanced evaluation using the figures, with a justified judgement and a condition"], [2, 3, 5, "Reasons for and against using some figures"], [1, 1, 2, "General points with little use of the case"]], modelAnswer: "The contribution on each bicycle is 152 − 112 = US\\$40, so the 2,400 extra bicycles add US\\$96,000, because other costs would not change. Spare capacity is 3,600, so the order can be met, and utilisation would rise from 75.0% to 91.7%, which spreads fixed costs over more bicycles. On the other hand, the price of US\\$152 is below the normal US\\$175, so other retailers may ask for the same, and higher utilisation leaves less room for breakdowns. Savanna should accept, because the contribution is large, as long as the order is clearly separate from its normal sales; if other retailers demand the same price, the gain could be lost.", hints: ["Calculate the contribution on the extra order first."], explanation: "Contribution of US\\$96,000 weighed against the risk of price cuts to other retailers." }),
      ]),
      hints: ["Capacity utilisation = output ÷ maximum capacity × 100.", "Contribution = price − variable cost."],
      explanation: "Utilisation 75.0%, productivity 225, unit labour cost down 12.5%; outsourcing saves US\\$12,880; the order adds US\\$96,000 contribution.",
    });
  }

  // ---------------- CAM_ESSAY20 AS (Paper 1 section B)
  b.struct({
    d: 5, ...common(EXAM.CAM_ESSAY20, "Cambridge Paper 1"), concepts: [C("mix.digital"), C("mix.promotion")],
    stem: "Essay. A fictional clothing retailer in Harare has two shops and promotes itself through posters and radio. The owner is considering moving most of the promotion to social media and the company's own website.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 300 }, stem: "Analyse two benefits to the retailer of using digital marketing. [8 marks]", points: ["Social media can target particular groups, such as young shoppers", "Application: adverts can be shown to people interested in fashion in Harare", "Targeting wastes less money on people unlikely to buy", "Results can be measured, such as clicks, visits and orders", "Application: the owner can see which posts bring customers into the shops or onto the website", "The owner can then spend more on what works and less on what does not", "A website lets customers see and order clothes at any time", "Application: customers outside Harare could buy, widening the market"], levels: [[3, 6, 8, "Two benefits analysed with developed chains and application to the retailer"], [2, 3, 5, "Two benefits explained with some application"], [1, 1, 2, "Benefits stated with little development"]], modelAnswer: "Social media can target particular groups such as young shoppers interested in fashion, so less money is wasted on people who are unlikely to buy. The results can also be measured, for example by the clicks and orders each post produces, so the owner can spend more on what works and less on what does not. A website would also let customers outside Harare see and order clothes at any time, which widens the market.", explanation: "Two benefits with chains of analysis." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 200, max: 500 }, stem: "Evaluate whether the retailer should rely mainly on digital promotion rather than posters and radio. [12 marks]", points: ["Digital promotion is cheaper per customer reached and can be targeted", "Results can be measured, helping the owner to improve", "Customers outside Harare can be reached, widening the market", "Posters and radio reach customers who do not use the internet or have little data", "Application: in-shop customers in Harare may respond more to local radio and posters", "Radio and posters build local awareness and trust in the brand", "Digital marketing needs skills, time and constant attention, and complaints are public", "Delivery, security and trust matter if the website sells online", "A mix of methods spreads risk and reaches different customer groups", "The best balance depends on the retailer's customers and budget", "Judgement with a reason, for example: digital for young customers and radio for others", "Condition or time-frame, for example: test for six months and compare sales by method"], levels: [[3, 9, 12, "Balanced evaluation of both approaches using the retailer's customers, with a justified judgement and a condition"], [2, 5, 8, "Reasons for and against with some application and a judgement"], [1, 1, 4, "General points on promotion with little application"]], modelAnswer: "Digital promotion is cheaper per customer reached and can be targeted at particular groups, and the results can be measured, so the owner can see what works. A website could also reach customers outside Harare. However, posters and radio reach customers who do not use the internet or have limited data, and they build local trust in the brand. Digital marketing also needs skills and constant attention, and public complaints can harm a small brand. The owner should not rely mainly on digital promotion until she knows how her customers find her shops. A sensible choice is digital promotion for younger customers and radio for others, tested for six months and judged by the sales each method produces.", explanation: "Both approaches weighed with a judgement and a condition." }),
    ]),
    hints: ["Link the benefits to the retailer's shops and customers."],
    explanation: "Digital marketing offers targeting and measurement; the choice depends on the retailer's customers and on testing the results.",
  });

  // ---------------- CAM_ESSAY20 A Level (Paper 4)
  b.struct({
    d: 5, ...common(EXAM.CAM_ESSAY20, "Cambridge Paper 4"), concepts: [C("operations.quality")],
    stem: "Essay. Marula Ceramics is a fictional maker of plates and bowls in Gaborone. About 6% of its products are found faulty at final inspection, and last year customers returned a further 3%. The owner is considering introducing total quality management (TQM), which would cost money for training and for meetings of quality circles, and would involve all 120 employees. Some supervisors say that inspection should simply be made stricter.",
    parts: checkExam(EXAM.CAM_ESSAY20, [
      P.manual({ label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { min: 100, max: 300 }, stem: "Analyse two benefits to Marula Ceramics of introducing TQM. [8 marks]", points: ["TQM makes every employee responsible for quality at every stage", "Application: faults would be found at the stage where they arise, not at final inspection", "Fewer faulty plates are made, so waste and rework fall", "Application: the 6% of products found faulty is a cost that TQM aims to reduce", "Quality circles use workers' knowledge to solve problems", "Involvement raises motivation and care", "Fewer returns (now 3%) protect the company's reputation", "Application: better reputation helps to win repeat orders and allows higher prices"], levels: [[3, 6, 8, "Two benefits analysed with developed chains and application to Marula Ceramics"], [2, 3, 5, "Two benefits explained with some application"], [1, 1, 2, "Benefits stated with little development"]], modelAnswer: "TQM makes every employee responsible for quality, so faults are found at the stage where they arise rather than at final inspection. Fewer faulty plates are made, so waste and rework fall, and this reduces the cost of the 6% of products that are now found faulty. Quality circles use the workers' knowledge to solve problems and raise motivation. Fewer returns, now 3%, would also protect the company's reputation and help it to win repeat orders and charge higher prices.", explanation: "Two benefits with chains of analysis." }),
      P.manual({ label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { min: 200, max: 500 }, stem: "Evaluate whether introducing TQM is the best way for Marula Ceramics to improve quality. [12 marks]", points: ["TQM tackles the causes of faults rather than only finding them", "Stricter inspection would find more faulty plates before they are sold, but would not stop them being made", "Application: 6% faulty at inspection is wasted material and labour even if they are never sold", "Inspection adds the cost of inspectors and cannot find every fault, as returns of 3% show", "TQM needs training, time and meetings, which cost money and output", "Success depends on the commitment of all 120 employees and managers", "Some supervisors resist, so change may be slow", "Benefits come over time, not at once", "Benchmarking against the best firm could set targets", "A combination of TQM with some inspection checks results", "Judgement with a reason, for example: TQM is better in the long run for the number of faults", "Condition or time-frame, for example: if staff are committed and results are measured over a year"], levels: [[3, 9, 12, "Balanced evaluation using the company's data, with a justified judgement and a condition"], [2, 5, 8, "Reasons for and against with some application and a judgement"], [1, 1, 4, "General points on quality with little application"]], modelAnswer: "TQM tackles the causes of faults, so fewer faulty plates are made, whereas stricter inspection only finds more of them after the material and labour have been wasted: 6% of production is already faulty at inspection, and the 3% returned shows that inspection misses some faults. Against TQM, training and quality circles cost money and time, the benefits come slowly, and success depends on the commitment of all 120 employees, while some supervisors are already resistant. A combination, with TQM supported by some inspection and a benchmark against the best firm, is more likely to work than either alone. TQM is the better way to improve quality in the long run, provided that staff are committed and results are measured over a year.", explanation: "TQM compared with stricter inspection, with a judgement and a condition." }),
    ]),
    hints: ["Compare preventing faults with finding them."],
    explanation: "TQM prevents faults but needs commitment and time; inspection finds faults only after they are made.",
  });

  // ---------------- CAM_P3_8 x2
  {
    const rows = [[25000, 175000], [60000, 330000], [120000, 744000]];
    const u = rows.map(([q, c]) => c / q);
    chk(u[0], 7); chk(u[1], 5.5); chk(u[2], 6.2);
    const ch = pctChange(u[0], u[1]);
    chk(ch, -21.4286, 1e-3);
    const tbl = table(["Output (units)", "Total cost (US\\$)"], rows, ["l", "r"]);
    b.struct({
      d: 3, ...common(EXAM.CAM_P3_8, "Cambridge Paper 3"), calculator: true, concepts: [C("operations.location-scale")],
      stem: `Botswana Beverages is a fictional bottler that has expanded its output in two stages. The table shows total costs at three output levels.\n\n${tbl}`,
      parts: checkExam(EXAM.CAM_P3_8, [
        P.num({ label: "(a)", marks: 3, type: "CALCULATION", kind: "pct", value: ch, calculator: true, wrong: [r2(pctChange(5.5, 7)), r2((5.5 / 7) * 100)], stem: "Calculate the percentage change in average cost per unit when output rises from 25,000 to 60,000 units, to one decimal place (give a fall as a negative number).", explanation: "Average cost at 25,000 = 175,000 ÷ 25,000 = US\\$7.00. At 60,000 = 330,000 ÷ 60,000 = US\\$5.50. Change = −1.50 ÷ 7.00 × 100 = −21.4%.", workedSolution: "1. Average cost at 25,000 units = 175,000 ÷ 25,000 = US\\$7.00.\n2. Average cost at 60,000 units = 330,000 ÷ 60,000 = US\\$5.50.\n3. Percentage change = (5.50 − 7.00) ÷ 7.00 × 100 = −21.4%." }),
        P.manual({ label: "(b)", marks: 5, stem: "Analyse why average cost per unit rose when output increased from 60,000 to 120,000 units.", points: ["Average cost rose from US\\$5.50 to US\\$6.20 per unit", "Diseconomies of scale: the company has become too large to manage efficiently", "Communication is slower and decisions take longer", "Workers feel less involved and motivation and productivity fall", "Total cost more than doubled while output only doubled, so cost per unit rose"], modelAnswer: "Average cost rose from US\\$5.50 to US\\$6.20 a unit. This suggests diseconomies of scale: the company has become too large to manage efficiently, so communication and decisions are slower. Workers may feel less involved, so motivation and productivity fall. Total cost rose from US\\$330,000 to US\\$744,000, more than doubling, while output only doubled, so the cost of each unit rose.", hints: ["Compare how fast total cost and output have risen."], explanation: "Diseconomies of scale explained, with the figures." }),
      ]),
      hints: ["Average cost = total cost ÷ output."], explanation: "Average cost falls 21.4% to 60,000 units, then rises to US\\$6.20 at 120,000: economies, then diseconomies of scale.",
    });
  }
  {
    const out = 40000, r0 = 5, r1 = 2, cost = 4.5;
    const sv = ((r0 - r1) / 100) * out * cost;
    chk(sv, 5400, 1e-6);
    b.struct({
      d: 3, ...common(EXAM.CAM_P3_8, "Cambridge Paper 3"), calculator: true, concepts: [C("operations.quality")],
      stem: `Marula Ceramics is a fictional maker of plates in Gaborone that produces ${out.toLocaleString("en-GB")} plates a year. At present ${r0}% of plates are defective, each costing ${money(cost)} in scrap and lost materials. The company expects total quality management (TQM) to cut the defect rate to ${r1}%.`,
      parts: checkExam(EXAM.CAM_P3_8, [
        P.num({ label: "(a)", marks: 4, type: "CALCULATION", kind: "money", value: sv, calculator: true, wrong: [out * (r0 / 100) * cost, out * (r1 / 100) * cost], stem: "Calculate the yearly saving from the expected fall in the defect rate.", explanation: "Defects now = 5% × 40,000 = 2,000, costing US\\$9,000. After TQM = 2% × 40,000 = 800, costing US\\$3,600. Saving = US\\$5,400.", workedSolution: "1. Defects now = 5% × 40,000 = 2,000; cost = 2,000 × US\\$4.50 = US\\$9,000.\n2. Defects after TQM = 2% × 40,000 = 800; cost = 800 × US\\$4.50 = US\\$3,600.\n3. Saving = 9,000 − 3,600 = US\\$5,400 a year." }),
        P.manual({ label: "(b)", marks: 4, stem: "Explain one way in which TQM could reduce the defect rate.", points: ["TQM makes every worker responsible for checking quality at their own stage", "Application: a worker who finds a fault in a plate stops it from moving on, so faults are found early", "Training and quality circles help workers to find the causes of faults and remove them", "Fewer faults are made at the source, so waste and the 5% defect rate fall"], modelAnswer: "TQM makes every worker responsible for checking quality at their own stage, so a worker who finds a fault in a plate stops it from moving on and faults are found early. Training and quality circles help workers to find the causes of faults and remove them, so fewer faults are made and the defect rate falls.", hints: ["Think about who checks quality under TQM."], explanation: "One way, developed with a chain to the defect rate." }),
      ]),
      hints: ["Find the cost of defects before and after TQM."], explanation: "Defects cost US\\$9,000 now and US\\$3,600 after TQM, a saving of US\\$5,400; TQM reduces faults at source.",
    });
  }

  // ---------------- CAM_P3_16
  {
    const cur = { rent: 96000, lab: 310000, tr: 51000 }, nw = { rent: 60000, lab: 270000, tr: 72000 }, move = 135000;
    const tc = sum([cur.rent, cur.lab, cur.tr]), tn = sum([nw.rent, nw.lab, nw.tr]);
    chk(tc, 457000); chk(tn, 402000);
    const saving = tc - tn;
    chk(saving, 55000);
    const pb = move / saving;
    chk(pb, 2.4545, 1e-3);
    const tbl = table(["Yearly cost (US\\$)", "Present site (Johannesburg)", "Proposed site"], [["Rent", cur.rent, nw.rent], ["Labour", cur.lab, nw.lab], ["Transport", cur.tr, nw.tr]]);
    b.struct({
      d: 4, ...common(EXAM.CAM_P3_16, "Cambridge Paper 3"), calculator: true, concepts: [C("operations.location-scale")],
      stem: `Baobab Packaging is a fictional maker of cartons based in Johannesburg. Its main customers are within 30 km of its factory. The owner is considering moving to a town 400 km away, where rent and labour are cheaper but transport costs to customers would be higher. The move would cost ${money(move)}. About 40% of the experienced staff say they would not move. The factory building is old and the lease will end in two years.\n\n${tbl}`,
      parts: checkExam(EXAM.CAM_P3_16, [
        P.group({ label: "(a)", stem: "Calculate:", parts: [
          P.num({ label: "(i)", marks: 2, kind: "money", value: tn, wrong: [tc, nw.rent + nw.lab], stem: "the total yearly cost of the proposed site;", explanation: "60,000 + 270,000 + 72,000 = US\\$402,000." }),
          P.num({ label: "(ii)", marks: 2, kind: "money", value: saving, wrong: [tn, move], stem: "the yearly saving from moving.", explanation: "Present total = 96,000 + 310,000 + 51,000 = US\\$457,000. Saving = 457,000 − 402,000 = US\\$55,000." }),
        ] }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse one qualitative factor that Baobab Packaging should consider before moving.", points: ["Loss of experienced staff: about 40% would not move", "Application: new staff must be recruited and trained, so output and quality may fall at first", "Distance from customers: 400 km from the present customers", "Application: delivery would take longer and cost more, which could lose orders to local rivals"], modelAnswer: "About 40% of the experienced staff would not move, so new staff must be recruited and trained, and output and quality may fall at first. The new site is also 400 km from the present customers, so delivery would take longer and could lose orders to local rivals.", hints: ["Use the staff and customer information in the case."], explanation: "One factor, analysed with the case." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Baobab Packaging should move to the proposed site.", points: ["Yearly cost falls by US\\$55,000 (from US\\$457,000 to US\\$402,000), a saving of 12.0%", "The move costs US\\$135,000, which the saving repays in about 2.5 years (135,000 ÷ 55,000)", "The lease on the present building ends in two years, so a decision is needed anyway", "Higher transport costs of US\\$72,000 could rise further if fuel costs rise or customers move", "The loss of 40% of the experienced staff may reduce quality and productivity", "Customers 400 km away may switch to local rivals, which the cost figures do not show", ["Judgement with a reason, for example: move, since the saving repays the cost quickly", 1], ["Condition or time-frame, for example: if key customers will stay and enough staff can be recruited", 1]], levels: [[3, 6, 8, "Balanced evaluation using the cost figures and qualitative factors, with a justified judgement and a condition"], [2, 3, 5, "Reasons for and against with some use of figures"], [1, 1, 2, "General points on relocation with little use of the case"]], modelAnswer: "The proposed site would cut yearly costs by US\\$55,000, from US\\$457,000 to US\\$402,000, and the US\\$135,000 cost of moving would be repaid in about 2.5 years. The present lease ends in two years, so the company must decide anyway. Against this, transport costs rise to US\\$72,000 and could rise further, 40% of the experienced staff would not move, and customers 400 km away may switch to local rivals, which the figures do not show. The company should move only if its main customers will stay with it and enough skilled workers can be recruited; otherwise it should look for a cheaper site nearer Johannesburg.", hints: ["Use the payback period and the risks to customers and staff."], explanation: "Saving of US\\$55,000 and payback of 2.5 years against the loss of staff and customers." }),
      ]),
      hints: ["Add rent, labour and transport for each site."], explanation: "The proposed site saves US\\$55,000 a year and repays the move in 2.5 years, but staff and customers are at risk.",
    });
  }

  // ---------------- CAM_P3_12 (extended response)
  {
    const home = 7.4, off = 6.1, ship = 0.9, duty = 0.6, dOff = 6, dHome = 2, dc = 8;
    const offTot = off + ship + duty, effOff = offTot + (dOff / 100) * dc, effHome = home + (dHome / 100) * dc;
    chk(offTot, 7.6); chk(effOff, 8.08, 1e-9); chk(effHome, 7.56, 1e-9);
    b.ext({
      d: 5, ...common(EXAM.CAM_P3_12, "Cambridge Paper 3"), concepts: [C("operations.location-scale")], marks: 12, calculator: true,
      stem: `Kgosi Garments is a fictional clothing company in Gaborone. Three years ago it offshored its sewing to a country with lower wages. The cost of making a garment there is now ${money(off)}, plus ${money(ship)} for shipping and ${money(duty)} import duty, a total of ${money(offTot)}. Making the garment in Gaborone would cost ${money(home)}. About ${dOff}% of the garments made overseas are defective, against ${dHome}% if made at home, and each defective garment costs ${money(dc)} to replace. Delivery now takes eight weeks, and retailers have started to complain about late deliveries. The company's former employees in Gaborone have mostly found other work, so restarting production would need new training. Evaluate whether Kgosi Garments should reshore its sewing to Gaborone.`,
      points: ["Production abroad now costs US\\$7.60 a garment including shipping and duty, close to US\\$7.40 at home", "Allowing for defects (6% × US\\$8 = US\\$0.48), the overseas cost is US\\$8.08", "Defects at home (2% × US\\$8 = US\\$0.16) give a cost of US\\$7.56, so home production is cheaper by about US\\$0.52", "Delivery of eight weeks is slow and has led to complaints from retailers", "Reshoring would shorten the supply chain and give more control over quality", "Quality would improve, with defects falling from 6% to 2%", "The workers in Gaborone have gone, so new staff would need training and output may fall at first", "Setting up production again requires investment and time", "The cost advantage of overseas wages has gone, but wages and shipping costs may change again", "Reshoring supports local jobs and may be seen favourably by customers", "A partial approach (some production at home for quick-turn orders) reduces the risk", "Judgement with a reason and a condition, for example reshore if the savings repay the set-up cost within a few years"],
      levels: [[4, 10, 12, "Balanced evaluation using the cost and defect figures and the delivery and training issues; considers a partial approach; a justified judgement with a condition"], [3, 7, 9, "Analyses costs and problems with application; some evaluation; judgement supported"], [2, 4, 6, "Explains benefits or problems with some application; limited judgement"], [1, 1, 3, "Describes reshoring with little application"]],
      wordLimit: { min: 250, max: 600 },
      modelAnswer: "Production overseas now costs US\\$7.60 a garment including shipping and duty, close to the US\\$7.40 it would cost at home. When defects are included, 6% × US\\$8 = US\\$0.48 raises the overseas cost to US\\$8.08, while 2% defects at home add US\\$0.16, giving US\\$7.56, so home production is cheaper by about US\\$0.52 a garment. Delivery of eight weeks has also led to complaints, and a shorter supply chain would give more control over quality. Against reshoring, the former employees have mostly left, so new staff would have to be trained and output may fall at first, and restarting production requires investment. Wages and shipping costs may also change again. Overall, reshoring appears justified: it is cheaper on the figures and improves delivery and quality. A sensible approach is to reshore in stages, keeping some overseas production for large orders, and to go ahead fully only if the savings repay the set-up cost within about three years.",
      hints: ["Include defects in the cost comparison."],
      explanation: "Overseas cost with defects US\\$8.08 against US\\$7.56 at home; delivery and quality favour reshoring, while retraining and set-up cost are risks.",
    });
  }
});
