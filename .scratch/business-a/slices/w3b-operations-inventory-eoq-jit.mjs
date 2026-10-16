// W3b: operations.inventory-eoq-jit
import { concept, P, chk, money, table, operations, ZIM, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.inventory-eoq-jit", { file: "operations/inventory-eoq-jit", keyPrefix: "operations.inventory-eoq-jit" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "In a just-in-time (JIT) system, materials are",
    ok: ["delivered only when they are needed for production", "Correct: stock is kept to a minimum."],
    bad: [["bought in large quantities to avoid running out", "That is a just-in-case approach."], ["stored for a year before they are used", "That would build up large stocks."], ["ordered only after the product has been sold twice", "JIT depends on timing, not on a number of sales."]],
    explanation: "JIT means that materials arrive just as they are needed.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A firm holds large stocks of materials as a safeguard against late deliveries. This approach is called",
    ok: ["just-in-case", "Correct: stock is held in case something goes wrong."],
    bad: [["just-in-time", "JIT keeps stock to a minimum."], ["economic order quantity", "EOQ is a way of finding the best order size."], ["kaizen", "Kaizen is continuous improvement."]],
    explanation: "Just-in-case (JIC) holds large stocks as insurance.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the main **risk** of a JIT system?",
    ok: ["Production stops if a supplier delivers late", "Correct: there is no buffer stock to fall back on."],
    bad: [["Large amounts of cash are tied up in stock", "That is a cost of just-in-case, not JIT."], ["Storage space is wasted on unused materials", "JIT reduces the need for storage."], ["Stock is likely to go out of date in the store", "JIT holds little stock, so this risk is small."]],
    explanation: "JIT depends on reliable deliveries; a late delivery can stop production.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery in Harare receives fresh dough ingredients each morning from a supplier next door and keeps no stock overnight. Which is a **benefit** to the bakery?",
    ok: ["Lower storage and holding costs and less waste", "Correct: little stock is held and nothing spoils."],
    bad: [["Protection against a late delivery from the supplier", "With no stock, a late delivery stops baking."], ["Discounts for buying in very large quantities", "Large bulk orders are not used in JIT."], ["No dependence on the supplier at all", "JIT increases dependence on the supplier."]],
    hints: ["What does the bakery avoid paying for if it holds no stock?"],
    explanation: "JIT lowers storage cost, ties up less cash and reduces waste.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "At the economic order quantity (EOQ), the yearly ordering cost is",
    ok: ["equal to the yearly holding cost", "Correct: the lowest total cost is where the two are equal."],
    bad: [["double the yearly holding cost", "The two are equal, not in a ratio of 2:1."], ["zero, because large orders avoid ordering", "Ordering cost is never zero if orders are placed."], ["lower than the yearly holding cost at every order size", "They are equal at the EOQ, and one or the other is larger elsewhere."]],
    explanation: "Total cost is lowest where ordering cost equals holding cost.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS", applies: ZIM,
    stem: "If the cost of holding one unit of stock for a year rises, with demand and the cost per order unchanged, the EOQ will",
    ok: ["fall, so smaller orders are placed more often", "Correct: higher holding cost makes large stocks more costly."],
    bad: [["rise, so larger orders are placed less often", "Higher holding cost discourages large orders."], ["stay the same, because holding cost is not in the formula", "Holding cost is the denominator of the formula."], ["become zero, because no stock is held", "The EOQ falls but does not become zero."]],
    hints: ["H is the denominator in √(2DS ÷ H)."],
    explanation: "A larger H gives a smaller EOQ: smaller, more frequent orders.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a firm should adopt JIT?",
    ok: ["It depends on how reliable its suppliers are and the cost of a stoppage", "Correct: the choice turns on supply risk against saved holding costs."],
    bad: [["Yes, because JIT removes all costs of holding materials", "Delivery and risk costs remain, so the claim is too strong."], ["No, because holding stock is always cheaper than ordering", "Holding stock costs money, so this is false."], ["Yes, because suppliers never deliver late", "Late deliveries do occur, so the claim is unsupported."]],
    hints: ["Weigh the saving against the risk of a stoppage."],
    explanation: "A reasoned judgement compares savings with the risk and cost of supply failure.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Moving to a JIT system usually releases cash that was previously tied up in stock.",
    answer: true,
    explanation: "True. Smaller stocks mean less money is tied up, so cash is freed for other uses.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    stem: "The EOQ model assumes that demand is steady and that suppliers deliver without delay.",
    answer: true,
    explanation: "True. The EOQ assumes constant demand, a fixed ordering cost, a constant holding cost, no discounts and no delay in delivery.",
    hints: ["Think about what has to be constant for the formula to work."],
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each statement to the approach it describes.",
    pairs: [["Just-in-time", "Very low stock and frequent small deliveries"], ["Just-in-case", "High stock held as a safeguard"], ["Benefit of just-in-time", "Less cash tied up in stock"], ["Risk of just-in-time", "A late delivery can stop production"]],
    explanation: "Each description matches either the approach or one of its main effects.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Under just-in-{{blank:a}} a firm holds very little stock, whereas just-in-{{blank:b}} keeps large stocks as a safeguard.",
    blanks: [
      { id: "a", accepted: ["time"], choices: ["time", "case", "order"] },
      { id: "b", accepted: ["case"], choices: ["time", "case", "order"] },
    ],
    explanation: "JIT = just-in-time (little stock); JIC = just-in-case (large stock).",
  });

  b.short({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "State **one** assumption of the economic order quantity (EOQ) model.",
    accepted: ["constant demand", "steady demand", "demand is constant", "fixed ordering cost", "constant holding cost", "no bulk discounts", "no discounts", "no delay in delivery", "no delays", "immediate delivery", "demand is steady", "ordering cost is fixed"],
    explanation: "EOQ assumes constant demand, a fixed ordering cost, a constant holding cost, no discounts and no delay in delivery.",
  });

  {
    const D = 2250, S = 20, H = 1;
    const e = operations.eoq(D, S, H);
    chk(e, 300, 1e-9);
    b.num({
      d: 3, skill: "APPLICATION", applies: ZIM, calculator: true, daily: true,
      stem: `A fictional school supplier sells ${D.toLocaleString("en-GB")} exercise books a year. Each order costs ${money(S)} to place and it costs ${money(H)} to hold one book in stock for a year. Using EOQ = √(2DS ÷ H), calculate the economic order quantity.`,
      kind: "units", value: e, wrong: [Math.sqrt((2 * D * H) / S), (2 * D * S) / H],
      hints: ["Multiply 2, the demand and the cost per order, divide by the holding cost, then take the square root."],
      explanation: "EOQ = √(2 × 2,250 × 20 ÷ 1) = √90,000 = 300 books. Forgetting the square root gives 90,000.",
    });
  }
  {
    const D = 9600, S = 75, H = 3;
    const e = operations.eoq(D, S, H);
    chk(e, 692.82, 0.01);
    b.calc({
      d: 3, skill: "APPLICATION", applies: ZIM, calculator: true,
      stem: `A fictional spare-parts importer needs ${D.toLocaleString("en-GB")} units a year. Each order costs ${money(S)} and holding one unit for a year costs ${money(H)}. Calculate the economic order quantity, to the nearest whole unit.`,
      kind: "units", value: e, wrong: [(2 * D * S) / H, Math.sqrt((2 * D * H) / S)],
      hints: ["Use EOQ = √(2DS ÷ H)."],
      workedSolution: "1. 2 × 9,600 × 75 = 1,440,000.\n2. 1,440,000 ÷ 3 = 480,000.\n3. √480,000 = 692.8, which is 693 units to the nearest whole unit.",
      explanation: "EOQ = √480,000 = 692.8, or 693 units. Swapping S and H in the formula gives 160.",
    });
  }
  {
    const D = 4800, S = 60, H = 2, Q = 500;
    const tc = operations.annualInventoryCost(D, S, H, Q);
    chk(tc, 1076, 1e-9);
    b.calc({
      d: 3, skill: "APPLICATION", applies: ZIM, calculator: true,
      stem: `A fictional garage uses ${D.toLocaleString("en-GB")} filters a year. Each order costs ${money(S)} and holding a filter costs ${money(H)} a year. Calculate the total yearly cost of ordering and holding stock if it orders ${Q} filters at a time.`,
      kind: "money", value: tc, wrong: [(D / Q) * S, (Q / 2) * H],
      hints: ["Total cost = (D ÷ Q) × S + (Q ÷ 2) × H."],
      workedSolution: "1. Orders a year = 4,800 ÷ 500 = 9.6.\n2. Ordering cost = 9.6 × 60 = US\\$576.\n3. Holding cost = (500 ÷ 2) × 2 = US\\$500.\n4. Total = 576 + 500 = US\\$1,076.",
      explanation: "Ordering cost US\\$576 plus holding cost US\\$500 gives US\\$1,076. Counting the whole order size as average stock gives holding cost US\\$1,000.",
    });
  }
  {
    const before = 60000, after = 15000, rate = 12;
    const sv = ((before - after) * rate) / 100;
    chk(sv, 5400);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional clothing factory cuts its average stock from ${money(before)} to ${money(after)} by adopting JIT. Holding costs are ${rate}% of the value of average stock a year. How much does it save each year in holding costs?`,
      kind: "money", value: sv, wrong: [(before * rate) / 100, (after * rate) / 100],
      explanation: "Saving = (60,000 − 15,000) × 12% = US\\$5,400. The holding cost before was US\\$7,200 and after US\\$1,800.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** benefit of adopting JIT inventory management.",
    points: ["Less stock is held, so storage and holding costs are lower", "Less cash is tied up in stock, so it can be used elsewhere in the business"],
    modelAnswer: "With JIT very little stock is held, so storage and holding costs are lower. Less cash is tied up in stock, so the money can be used elsewhere in the business.",
    explanation: "One mark for the benefit and one for its effect.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Sipho owns a fictional furniture factory in Mutare that buys timber from a supplier whose lorries are often late. Explain **two** problems of using JIT for the timber.",
    points: ["Production stops if the timber does not arrive", "Application: workers and machines stand idle, so wages and overheads are paid for no output", "Orders may be late, so customers may cancel", "Application: lost sales and a damaged reputation for delivery"],
    modelAnswer: "If the timber is late, production stops, so workers and machines stand idle while wages and overheads still have to be paid. Customers' orders are then delivered late, so some may cancel, and Sipho's reputation for delivery suffers.",
    hints: ["Think about what happens with no stock and a late lorry."],
    explanation: "Two problems, each developed with the factory.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why the EOQ may not be the best order size in practice.",
    points: ["A supplier may give a discount for larger orders, so a bigger order could cost less in total", "Demand is rarely constant, so the yearly demand figure may be wrong", "Delivery may be late, so extra stock may be needed as a buffer", "Storage space or shelf life may limit the size of order"],
    modelAnswer: "A supplier may give a discount for larger orders, which could make a bigger order cheaper in total. Demand is rarely constant, and late deliveries may mean extra buffer stock is needed. Storage space or shelf life may also limit the order size.",
    hints: ["Think about the assumptions of the model."],
    explanation: "Four reasons linked to the assumptions of the EOQ model.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional pharmacy chain in Harare is considering JIT for its medicines. Assess whether JIT is suitable.",
    points: ["JIT would lower holding cost and reduce expiry losses", "Medicines are essential, so a stock-out could harm patients and lose customers", "Reliable suppliers close by make JIT more workable", "Unreliable supply or sudden demand makes it risky", "Judgement with a condition, for example: use JIT for common items from reliable suppliers but hold a buffer for essential medicines"],
    modelAnswer: "JIT would lower holding costs and reduce losses from medicines passing their expiry date. But medicines are essential, so a stock-out could harm patients and lose customers. The pharmacy should use JIT for common items that are supplied reliably and hold a buffer of essential medicines.",
    hints: ["Weigh the saving against the risk of a stock-out for essential goods."],
    explanation: "Both sides, then a conditional judgement.",
  });

  {
    const D = 5000, S = 100, H = 4, price = 20, disc = 2;
    const e = operations.eoq(D, S, H);
    chk(e, 500, 1e-9);
    const tcE = operations.annualInventoryCost(D, S, H, 500), tc1000 = operations.annualInventoryCost(D, S, H, 1000);
    chk(tcE, 2000); chk(tc1000, 2500);
    const saving = D * price * (disc / 100);
    chk(saving, 2000);
    const tbl = table(["Item", "Figure"], [["Yearly demand (units)", D], ["Cost of placing one order (US\\$)", S], ["Cost of holding one unit for a year (US\\$)", H], ["Price per unit (US\\$)", price]], ["l", "r"]);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, applies: ZIM,
      stem: `A fictional distributor of school desks in Gweru records the following. A supplier has offered a ${disc}% discount on the price of every unit for orders of 1,000 units or more.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the economic order quantity, using EOQ = √(2DS ÷ H).", kind: "units", value: e, calculator: true, wrong: [(2 * D * S) / H, Math.sqrt((2 * D * H) / S)], explanation: "√(2 × 5,000 × 100 ÷ 4) = √250,000 = 500 units." }),
        P.num({ label: "(b)", marks: 2, stem: "Calculate the total yearly cost of ordering and holding if orders of 1,000 units are placed.", kind: "money", value: tc1000, calculator: true, wrong: [tcE, (D / 1000) * S], explanation: "Orders = 5. Ordering cost = 5 × 100 = 500. Holding cost = 500 × 4 = 2,000. Total = US\\$2,500. At the EOQ the total is only US\\$2,000." }),
        P.manual({ label: "(c)", marks: 2, stem: "State **two** assumptions made by the EOQ model.", points: ["Demand is constant (steady)", "The ordering cost and holding cost per unit are constant, with no discounts or delays in delivery"], modelAnswer: "Demand is constant, and the cost of ordering and holding is constant per unit, with no discounts or delays in delivery.", explanation: "One mark for each assumption." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the distributor should accept the supplier's discount.", points: ["Orders of 1,000 raise the yearly ordering and holding cost by US\\$500 (2,500 − 2,000)", "The 2% discount on 5,000 units at US\\$20 saves US\\$2,000 a year", "Judgement: accept, since the saving of US\\$2,000 exceeds the extra cost of US\\$500, if there is space and cash to hold the larger stock"], modelAnswer: "Orders of 1,000 raise the ordering and holding cost by US\\$500 a year, from US\\$2,000 to US\\$2,500. The discount saves 2% × 5,000 × US\\$20 = US\\$2,000 a year, so the distributor gains US\\$1,500. It should accept if it has space and cash to hold the larger stock.", hints: ["Compare the extra inventory cost with the discount saved."], explanation: "Extra cost 500, saving 2,000, net gain 1,500, with a condition." }),
      ],
      hints: ["Use EOQ = √(2DS ÷ H) and total cost = (D ÷ Q) × S + (Q ÷ 2) × H."],
      explanation: "EOQ 500; total cost at 1,000 units is US\\$2,500; the discount saves US\\$2,000, so accepting gains US\\$1,500 a year.",
    });
  }
  {
    const before = 30000, after = 6000, rate = 12, extra = 1100, stopDays = 3, contr = 900;
    const sv = ((before - after) * rate) / 100;
    chk(sv, 2880);
    const net = sv - extra;
    chk(net, 1780);
    chk(stopDays * contr, 2700);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Mhofu Metal Works is a fictional manufacturer of steel gates in Bulawayo. It holds an average stock of steel worth ${money(before)}. The owner is considering JIT, which would cut average stock to ${money(after)}. Holding costs are ${rate}% of the value of average stock a year. More frequent deliveries would add ${money(extra)} a year in transport. The only steel supplier is 300 km away, and last year its deliveries were late twice. A late delivery would stop production for ${stopDays} days, costing ${money(contr)} a day in lost contribution.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the yearly saving in holding costs under JIT, before the extra transport costs.", kind: "money", value: sv, wrong: [(before * rate) / 100, (after * rate) / 100], explanation: "(30,000 − 6,000) × 12% = US\\$2,880." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** problem for Mhofu Metal Works of using JIT with a supplier 300 km away.", points: ["Deliveries over a long distance are more likely to be late", "Application: the supplier was late twice last year", "With little stock, a late delivery stops production", "Lost output costs US\\$900 a day, so a stoppage could exceed the savings from JIT"], modelAnswer: "Deliveries from 300 km away are more likely to be late, and this supplier was late twice last year. With little stock held, each late delivery stops production at a cost of US\\$900 a day, and a three-day stoppage costs US\\$2,700, more than the yearly saving.", hints: ["Use the distance and last year's late deliveries."], explanation: "A chain from distance to stoppage and cost." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Mhofu Metal Works should adopt JIT.", points: ["Holding cost saving of US\\$2,880 less extra transport US\\$1,100 gives a net saving of US\\$1,780 a year", "US\\$24,000 of cash would be released from stock", "Storage space would be freed", "A three-day stoppage costs 3 × US\\$900 = US\\$2,700, more than the net saving", "The supplier was late twice last year, so two stoppages would cost US\\$5,400", "A buffer stock or a second supplier could reduce the risk", ["Judgement with a reason, for example: not with this supplier, because the risk outweighs the saving", 1], ["Condition or time-frame, for example: adopt a partial JIT if a closer supplier is found", 1]], levels: [[1, 1, 3, "General points on JIT with little use of the case."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the net saving and the cost of a stoppage, with a justified judgement and a condition."]], modelAnswer: "JIT would save US\\$2,880 in holding costs, or US\\$1,780 after the extra transport, and would release US\\$24,000 of cash and free space. But the only supplier is 300 km away and was late twice last year; a three-day stoppage costs US\\$2,700, and two would cost US\\$5,400, more than three years of net saving. Mhofu should not adopt full JIT with this supplier. It should keep a buffer stock of steel, look for a closer second supplier, and move to JIT only when deliveries are reliable.", hints: ["Compare the net saving with the cost of a stoppage, and count the late deliveries last year."], explanation: "Net saving US\\$1,780 against stoppage cost US\\$2,700 each. With two late deliveries last year the risk outweighs the saving." }),
      ],
      hints: ["Saving = reduction in average stock × holding cost rate."],
      explanation: "Holding cost saving is US\\$2,880 (net US\\$1,780 after transport). A three-day stoppage costs US\\$2,700, so reliability of the supplier decides.",
    });
  }

  b.card("DEFINITION", "Just-in-time (JIT)", "Materials and parts are delivered only as they are needed, so stock is kept to a minimum.");
  b.card("DEFINITION", "Just-in-case (JIC)", "Large stocks are held as a safeguard against late deliveries, rising demand or price rises.");
  b.card("FACT", "Benefits of JIT", "Lower storage and holding costs, less cash tied up, less waste, more space, quick response to change.");
  b.card("FACT", "Risks of JIT", "A late delivery stops production; needs reliable suppliers; frequent deliveries may cost more; little buffer for sudden demand.");
  b.card("FORMULA", "Economic order quantity (EOQ)", "EOQ = √(2DS ÷ H): D yearly demand, S cost per order, H yearly holding cost of one unit.", undefined, { applies: ZIM });
  b.card("FORMULA", "Total yearly inventory cost", "Total cost = (D ÷ Q) × S + (Q ÷ 2) × H. Average stock is half the order size.", undefined, { applies: ZIM });
  b.card("CONCEPT", "At the EOQ", "Yearly ordering cost equals yearly holding cost, and total cost is at its lowest.", undefined, { applies: ZIM });
  b.card("FACT", "Assumptions of the EOQ model", "Constant demand, fixed ordering cost, constant holding cost, no discounts, no delivery delay.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Choosing between JIT and JIC", "JIT suits predictable demand and reliable nearby suppliers; JIC suits uncertain supply or demand.");
});
