// W3b: operations.inventory-control
import { concept, P, chk, money, table, operations, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.operations.inventory-control", { file: "operations/inventory-control", keyPrefix: "operations.inventory-control" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The minimum quantity of stock kept as a safety margin against late deliveries or sudden demand is called",
    ok: ["buffer inventory", "Correct: the safety margin that should not normally be used."],
    bad: [["maximum stock level", "That is the highest level of stock the firm plans to hold."], ["lead time", "That is the time between ordering and delivery."], ["work in progress", "That is partly finished goods."]],
    explanation: "Buffer inventory (stock) is the safety margin held to avoid running out.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The time between placing an order with a supplier and receiving the goods is the",
    ok: ["lead time", "Correct: the delay before delivery."],
    bad: [["re-order level", "That is the stock level at which the order is placed."], ["buffer stock", "That is the safety quantity."], ["re-order quantity", "That is the amount ordered."]],
    explanation: "Lead time is the time from ordering to delivery.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a **cost** of holding a large amount of inventory?",
    ok: ["Cash is tied up that could be used elsewhere", "Correct: money in stock cannot be used for other purposes."],
    bad: [["The firm can meet sudden rises in demand", "That is a benefit of holding inventory."], ["The firm is protected against late deliveries", "That is a benefit of holding inventory."], ["The firm can buy in bulk at a discount", "That is a benefit of holding inventory."]],
    explanation: "Holding stock ties up cash and adds storage, insurance and damage costs.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "On an inventory control chart, a new order is placed when stock falls to the",
    ok: ["re-order level", "Correct: it is the trigger for ordering."],
    bad: [["maximum stock level", "Stock is at its highest just after delivery."], ["buffer level", "The re-order level is above the buffer, so there is stock during the lead time."], ["level of zero stock", "Waiting until stock is zero would cause a stock-out."]],
    explanation: "An order is placed at the re-order level so that delivery arrives before the buffer is used.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional shop sells 20 sacks of rice a day. The supplier takes 5 days to deliver and the shop keeps a buffer of 40 sacks. What is the re-order level?",
    ok: ["140 sacks", "Correct: 20 × 5 + 40."],
    bad: [["100 sacks", "This is usage in lead time only, with no buffer."], ["60 sacks", "This is usage per day plus buffer, forgetting the lead time."], ["200 sacks", "No correct step produces this figure."]],
    hints: ["Usage in the lead time plus the buffer."],
    explanation: "Re-order level = (20 × 5) + 40 = 140 sacks.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery's flour supplier becomes unreliable and often delivers late. What is the **best** response in inventory management?",
    ok: ["Raise the buffer and re-order earlier", "Correct: more safety stock protects against late deliveries."],
    bad: [["Cut the buffer stock to save storage cost", "That makes stock-outs more likely."], ["Order only when the stock has reached zero", "That guarantees a stock-out when the delivery is late."], ["Stop keeping any records of the stock levels", "Records are needed to control stock."]],
    hints: ["What protects the bakery from a delivery that does not arrive on time?"],
    explanation: "A bigger buffer and an earlier order protect against an unreliable supplier, at a higher holding cost.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on whether a pharmacy should hold a larger stock of tablets?",
    ok: ["Yes, if holding more costs less than the sales lost by running out", "Correct: a conditional judgement based on costs and benefits."],
    bad: [["Yes, because stock is always an asset that raises profit", "Stock is a cost until it is sold, and some goods expire."], ["No, because holding stock is always a waste of money", "Stock-outs can cost more than holding stock."], ["It makes no difference since stock levels never affect sales", "Lack of stock can cause lost sales."]],
    hints: ["Compare the cost of holding with the cost of running out."],
    explanation: "A strong judgement compares the holding cost with the cost of lost sales and names the condition.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "The re-order level is always set at the same level as the buffer stock.",
    answer: false,
    explanation: "False. The re-order level is above the buffer. It equals usage during the lead time plus the buffer, so that the delivery arrives before the buffer is used.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Good supply chain management can reduce the amount of inventory a firm needs to hold.",
    answer: true,
    explanation: "True. Reliable suppliers and shorter lead times allow smaller stocks and a smaller buffer.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each term to its meaning on an inventory control chart.",
    pairs: [["Re-order level", "The stock level at which an order is placed"], ["Lead time", "The time from placing the order to delivery"], ["Buffer stock", "The minimum safety stock"], ["Maximum stock level", "The highest level of stock the firm plans to hold"]],
    explanation: "Each term describes a feature of the chart.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Raw materials, {{blank:a}} in progress and finished goods are the three types of inventory. Holding too much inventory ties up {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["work"], choices: ["work", "money", "labour"] },
      { id: "b", accepted: ["cash"], choices: ["cash", "labour", "profit"] },
    ],
    explanation: "The three types are raw materials, work in progress and finished goods; stock ties up cash.",
  });


  {
    const use = 45, lead = 6, buffer = 90;
    const rol = operations.reorderLevel({ usagePerDay: use, leadTimeDays: lead, buffer });
    chk(rol, 360);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional supermarket sells ${use} cartons of milk powder a day. The lead time is ${lead} days and the buffer stock is ${buffer} cartons. Calculate the re-order level.`,
      kind: "units", value: rol, wrong: [use * lead, use + buffer],
      explanation: "Re-order level = 45 × 6 + 90 = 270 + 90 = 360 cartons. Leaving out the buffer gives 270.",
    });
  }
  {
    const buffer = 70, qty = 350;
    const max = buffer + qty;
    chk(max, 420);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional garage keeps a buffer stock of ${buffer} batteries and orders ${qty} batteries each time. Assuming delivery arrives just as stock reaches the buffer, what is its maximum stock level?`,
      kind: "units", value: max, wrong: [qty, qty - buffer],
      explanation: "Maximum stock = buffer + order quantity = 70 + 350 = 420 batteries.",
    });
  }
  {
    const use = 40, lead = 4, buffer = 80, qty = 400;
    const rol = operations.reorderLevel({ usagePerDay: use, leadTimeDays: lead, buffer });
    const max = buffer + qty;
    const days = (max - rol) / use;
    chk(rol, 240); chk(days, 6);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional spare-parts shop uses ${use} filters a day. The lead time is ${lead} days, the buffer stock is ${buffer} filters and each order is for ${qty} filters. Starting from the maximum stock level just after a delivery, after how many days is a new order placed?`,
      kind: "days", value: days, wrong: [lead, max / use],
      hints: ["Find the re-order level and the maximum stock level first."],
      workedSolution: "1. Re-order level = 40 × 4 + 80 = 240 filters.\n2. Maximum stock = 80 + 400 = 480 filters.\n3. Stock must fall by 480 − 240 = 240 filters.\n4. Days = 240 ÷ 40 = 6 days.",
      explanation: "The order is placed after 6 days, when stock falls from 480 to 240. Dividing the maximum stock by daily use gives 12 days, which is when stock would run out.",
    });
  }
  {
    const buffer = 80, use = 40, late = 3;
    const short = late * use - buffer;
    chk(short, 40);
    b.num({
      d: 3, skill: "ANALYSIS",
      stem: `The spare-parts shop's supplier delivers ${late} days later than planned. Daily use is ${use} filters and the buffer stock is ${buffer}. How many filters is the shop short of when the delivery finally arrives?`,
      kind: "units", value: short, wrong: [late * use, buffer - late],
      hints: ["Find how much is used in the extra days and subtract the buffer."],
      explanation: "Use during the delay = 3 × 40 = 120 filters. The buffer covers 80, so the shop is 40 filters short. The 120 is the use, not the shortage.",
    });
  }
  {
    const maxS = 480, buf = 80, cost = 6, rate = 10;
    const avg = (maxS + buf) / 2, hold = avg * cost * (rate / 100);
    chk(avg, 280); chk(hold, 168);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional shop holds a maximum stock of ${maxS} filters and a buffer of ${buf}. Each filter costs ${money(cost)} and holding costs are ${rate}% a year of the value of the average stock held. Using average stock = (maximum + buffer) ÷ 2, calculate the yearly holding cost.`,
      kind: "money", value: hold, wrong: [maxS * cost * (rate / 100), avg * cost],
      hints: ["Find the average stock, then its value, then 10% of that value."],
      workedSolution: "1. Average stock = (480 + 80) ÷ 2 = 280 filters.\n2. Value of average stock = 280 × US\\$6 = US\\$1,680.\n3. Holding cost = 10% × 1,680 = US\\$168 a year.",
      explanation: "Average stock is 280 filters, worth US\\$1,680, so the holding cost is US\\$168 a year. Using the maximum stock gives US\\$288.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a business holds buffer inventory.",
    points: ["To avoid running out if demand rises unexpectedly", "To protect against late delivery from suppliers, so that production or sales are not stopped"],
    modelAnswer: "Buffer inventory prevents the firm running out if demand rises unexpectedly. It also protects against late deliveries, so that production or sales are not stopped.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Nyasha owns a fictional bakery in Mutare. Explain **two** costs to her of holding too much flour.",
    points: ["Cash is tied up in flour that could be used to buy equipment or pay bills", "Application: money spent on extra sacks leaves less cash for wages and fuel", "Flour may become stale, damp or infested during storage", "Application: spoiled flour cannot be used for bread, so money is wasted"],
    modelAnswer: "Cash is tied up in extra sacks of flour, leaving less money to pay for wages and fuel. Flour stored for a long time may become damp or infested, and spoiled flour cannot be used for bread, so money is wasted.",
    hints: ["Think about cash and about the condition of the flour."],
    explanation: "Two costs, each developed for the bakery.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a long lead time affects the level of inventory a firm needs to hold.",
    points: ["A longer lead time means more stock is used while waiting for delivery", "The re-order level must therefore be higher", "A larger buffer may be needed because longer lead times are more likely to be delayed", "This raises average stock and holding cost"],
    modelAnswer: "A longer lead time means more stock is used while waiting for delivery, so the re-order level must be higher. Long lead times are also more likely to be delayed, so a larger buffer may be needed, which raises average stock and holding cost.",
    hints: ["Use the formula for the re-order level."],
    explanation: "A chain from lead time to the re-order level and to cost.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A fictional pharmacy is considering cutting its buffer stock of medicines to save storage cost. Assess whether it should do this.",
    points: ["A smaller buffer lowers holding cost and frees cash", "A shortage of medicine may harm patients and cause lost sales", "Some medicines expire, which makes large stocks wasteful", "The supplier's reliability decides how much buffer is needed", "Judgement with a condition, for example: cut the buffer only if the supplier is reliable and delivers quickly"],
    modelAnswer: "A smaller buffer lowers holding cost and frees cash, and some medicines expire so large stocks are wasteful. But a shortage could harm patients and lose sales and trust. The pharmacy should cut the buffer only if its supplier is reliable and delivers quickly, and it should keep a larger buffer for essential medicines.",
    hints: ["Compare the saving with the cost of running out."],
    explanation: "Both sides, then a conditional judgement.",
  });

  {
    const use = 25, lead = 3, buffer = 50, qty = 200;
    const rol = operations.reorderLevel({ usagePerDay: use, leadTimeDays: lead, buffer });
    chk(rol, 125); chk(buffer + qty, 250);
    const tbl = table(["Item", "Figure"], [["Daily sales (boxes)", use], ["Lead time (days)", lead], ["Buffer stock (boxes)", buffer], ["Order quantity (boxes)", qty], ["Holding cost per box per year (US\\$)", "1.20"], ["Contribution lost on each box not sold (US\\$)", "1.50"]], ["l", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `Tendai runs a fictional pharmacy in Gweru. The table shows information about one product.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the re-order level.", kind: "units", value: rol, wrong: [use * lead, buffer + qty], explanation: "25 × 3 + 50 = 75 + 50 = 125 boxes. Leaving out the buffer gives 75." }),
        P.mcq({ label: "(b)", marks: 1, stem: "What is the maximum stock level?", options: [["250 boxes", "Correct: buffer 50 + order quantity 200."], ["200 boxes", "This is the order quantity only."], ["125 boxes", "This is the re-order level."], ["75 boxes", "This is usage during the lead time."]], answer: "A", explanation: "Maximum stock = 50 + 200 = 250 boxes." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why Tendai keeps a buffer stock.", points: ["The supplier may deliver late", "Application: if delivery is a day late, 25 boxes more would be sold before it arrives", "Without a buffer, customers would leave without the medicine and sales would be lost"], modelAnswer: "The supplier may deliver late. If delivery is a day late, a further 25 boxes would be sold before it arrives, and without a buffer customers would leave without the medicine and the sales would be lost.", hints: ["What happens if the delivery is a day late?"], explanation: "Reason, application and effect on sales." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether Tendai should reduce the buffer by 20 boxes to save holding cost.", points: ["Saving of 20 × US\\$1.20 = US\\$24 a year in holding cost", "A stock-out of even a few days could lose 25 × 1.50 = US\\$37.50 contribution a day", "Judgement with a condition, for example: do not cut it if deliveries are sometimes late"], modelAnswer: "The saving would be only 20 × US\\$1.20 = US\\$24 a year. A single day without stock would lose 25 × US\\$1.50 = US\\$37.50 of contribution, more than the saving, so Tendai should not cut the buffer if deliveries are sometimes late.", hints: ["Compare the yearly saving with the loss on one day of stock-out."], explanation: "Saving, loss and a conditional judgement." }),
      ],
      hints: ["Re-order level = usage in the lead time + buffer."],
      explanation: "Re-order level 125 boxes, maximum stock 250. The small saving from a lower buffer is less than the loss from one stock-out day.",
    });
    chk(20 * 1.2, 24); chk(25 * 1.5, 37.5);
  }
  {
    const use = 60, lead = 3, buffer = 120, cost = 4, rate = 15, days = 8, contr = 1.2;
    const rol = operations.reorderLevel({ usagePerDay: use, leadTimeDays: lead, buffer });
    chk(rol, 300);
    const extraHold = 120 * cost * (rate / 100), lost = days * use * contr;
    chk(extraHold, 72); chk(lost, 576);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Zambezi Cold Stores is a fictional distributor of frozen fish in Harare. It sells ${use} kg of fish a day. The supplier's lead time is normally ${lead} days, but deliveries were late on several occasions last year and the store ran out of fish on ${days} days. The store keeps a buffer stock of ${buffer} kg. Fish costs ${money(cost)} a kilogram and holding costs (freezer power and some spoilage) are ${rate}% of the value of stock held each year. The contribution on each kilogram sold is ${money(contr)}. The owner is considering doubling the buffer to 240 kg. The freezer has space but electricity cuts are frequent.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the present re-order level.", kind: "units", value: rol, wrong: [use * lead, use + buffer], explanation: "60 × 3 + 120 = 180 + 120 = 300 kg. Leaving out the buffer gives 180." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** problem for Zambezi Cold Stores of an unreliable supplier.", points: ["Late deliveries mean the buffer may be used up", "Application: the store ran out of fish on 8 days last year", "Lost sales and unhappy customers who may buy from rivals", "Lower revenue and a damaged reputation"], modelAnswer: "Late deliveries use up the buffer, and the store ran out of fish on 8 days last year. Customers who cannot buy fish may go to rivals, so revenue is lost and the store's reputation is damaged.", hints: ["Use the stock-outs in the case."], explanation: "A chain from late delivery to lost sales." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Zambezi Cold Stores should double its buffer stock to 240 kg.", points: ["Extra holding cost is 120 kg × US\\$4 × 15% = US\\$72 a year", "Contribution lost on the 8 stock-out days was 8 × 60 × US\\$1.20 = US\\$576", "The extra cost is far smaller than the sales it could protect", "A larger buffer also keeps customers loyal", "Electricity cuts risk spoiling a larger stock of fish, which would waste money", "An alternative is to find a more reliable supplier or order earlier", ["Judgement with a reason, for example: raise the buffer because the saving is eight times the cost", 1], ["Condition or time-frame, for example: provided the freezer power is secure, and review after a season", 1]], levels: [[1, 1, 3, "General points about buffer stock with little use of the figures."], [2, 4, 6, "Reasons for and against using the figures in the case."], [3, 7, 8, "Balanced evaluation using the cost and lost-sales figures, with a justified judgement and a condition."]], modelAnswer: "Doubling the buffer would cost an extra 120 kg × US\\$4 × 15% = US\\$72 a year in holding costs, while the 8 days without stock lost 8 × 60 × US\\$1.20 = US\\$576 of contribution, eight times as much. A bigger buffer would also keep customers loyal. However, frequent electricity cuts could spoil a larger stock of fish, and a more reliable supplier would be a better long-term solution. The store should raise the buffer, as long as the freezer power can be secured, for example by a generator or solar backup, and review the position after a season.", hints: ["Compare the extra holding cost with the contribution lost by stock-outs."], explanation: "Extra holding cost US\\$72 against lost contribution US\\$576. The risk of spoilage is the main argument against." }),
      ],
      hints: ["Re-order level = usage in the lead time + buffer."],
      explanation: "The re-order level is 300 kg. A larger buffer costs US\\$72 a year but could protect US\\$576 of contribution; the judgement should deal with the risk of spoilage.",
    });
  }

  b.card("DEFINITION", "Inventory (stock)", "The materials, work in progress and finished goods a business holds to support production and sales.");
  b.card("DEFINITION", "Buffer inventory", "The minimum stock held as a safety margin against late deliveries or sudden rises in demand.");
  b.card("DEFINITION", "Lead time", "The time between placing an order and receiving the goods.");
  b.card("FORMULA", "Re-order level", "Re-order level = (usage per day × lead time in days) + buffer stock.");
  b.card("FORMULA", "Maximum stock level", "Maximum stock level = buffer stock + re-order quantity (steady usage).");
  b.card("FACT", "Costs of holding inventory", "Cash tied up, storage, insurance and security, damage, theft, going out of date.");
  b.card("FACT", "Benefits of holding inventory", "Production and sales continue; bulk discounts; meets sudden demand; protects against late delivery.");
  b.card("FACT", "Factors that decide stock level", "Reliability and speed of delivery, rate of use, shelf life, storage cost, cost of running out, discounts, cash available.");
  b.card("CONCEPT", "Supply chain management", "Managing suppliers, production, transport and retailers so that goods flow smoothly; it lowers stock costs and stock-outs.");
});
