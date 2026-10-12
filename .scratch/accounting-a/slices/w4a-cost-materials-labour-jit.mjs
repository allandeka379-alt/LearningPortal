// W4a: cost.materials-labour-jit (Cambridge AS Level only; tagged to Cambridge automatically)
import { concept, P, table, chk, r2, inventory } from "../lib.mjs";
import { mc, F, usd, p2 } from "../tables/w4a-lib.mjs";

concept("aacc.cost.materials-labour-jit", { file: "cost/materials-labour-jit", keyPrefix: "cost.materials-labour-jit" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which document authorises the issue of materials from the stores to production?",
    ok: ["Materials requisition", "Correct: the storekeeper issues only against a signed requisition."],
    bad: [["Goods received note", "That records materials arriving from a supplier."], ["Purchase order", "That is sent to a supplier to buy materials."], ["Credit note", "That reduces an amount owed; it is not an authority to issue."]],
    explanation: "A materials requisition is the authority for the stores to issue materials and the source for charging the cost to a job.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A welder is paid overtime at time and a half for a rush of orders that are not linked to one job. How is the premium (the extra half) treated?",
    ok: ["As a production overhead shared by all jobs", "Correct: the overtime is a general cost of the factory."],
    bad: [["As a direct labour cost of the last job completed", "The overtime was not caused by that job."], ["As a period cost of selling", "It is a production cost, not a selling cost."], ["As a reduction in the basic wage", "The premium is an addition, not a deduction."]],
    explanation: "The premium is an overhead unless the overtime is caused by a specific job. Only the normal rate for the hours worked is direct labour.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of the following is a benefit of just-in-time inventory management?",
    ok: ["Lower costs of storing inventory", "Correct: very little stock is held, so storage and handling costs fall."],
    bad: [["Protection against late deliveries by suppliers", "JIT makes the business more exposed to late deliveries."], ["Larger discounts for buying in bulk", "JIT usually means small, frequent orders without bulk discounts."], ["A higher reorder level for every material", "JIT aims to remove the need for stock."]],
    explanation: "JIT reduces the stock held, so less cash is tied up and storage and obsolescence costs are lower. Its risk is the dependence on supplier delivery.",
  });
  const inv = inventory.fifoPerpetual([{ type: "receipt", qty: 120, unitCost: 8.5 }, { type: "issue", qty: 100 }], { qty: 50, unitCost: 8 });
  chk(inv.costOfIssues, 825);
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The stores have 50 bags of cement at US\\$8.00 each. Then 120 bags at US\\$8.50 are received and 100 bags are issued to a job. Using FIFO, what is the cost of the issue?",
    ok: [usd(inv.costOfIssues), "Correct: 50 at 8.00 + 50 at 8.50."],
    bad: [[usd(100 * 8.5), "This prices the whole issue at the latest cost; FIFO uses the oldest stock first."], [usd(100 * 8), "This prices the whole issue at the opening price although only 50 bags were held at that price."], [usd(r2(100 * (50 * 8 + 120 * 8.5) / 170)), "This uses the weighted average cost, which is a different valuation method from FIFO."]],
    hints: ["Issue the oldest bags first."],
    explanation: `Under FIFO: 50 × 8.00 = ${usd(400)} plus 50 × 8.50 = ${usd(425)}, so ${usd(inv.costOfIssues)}.`,
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which level is calculated as the reorder level plus the reorder quantity less the minimum usage during the minimum lead time?",
    ok: ["Maximum level", "Correct: it is the highest stock expected if usage and delivery are at their extremes."],
    bad: [["Minimum level", "That is the reorder level less average usage during average lead time."], ["Reorder level", "That is the maximum usage multiplied by the maximum lead time."], ["Safety stock", "That is not defined by this formula."]],
    hints: ["The maximum level warns of over-stocking."],
    explanation: "Maximum level = reorder level + reorder quantity - (minimum usage × minimum lead time).",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "A bakery in a town with frequent power cuts and unreliable transport is considering a JIT system for flour. Which statement is the best advice?",
    ok: ["JIT is risky, so a safety stock of flour should be kept", "Correct: a late delivery or power cut would stop baking, so the benefits depend on reliable deliveries."],
    bad: [["JIT is always best because it removes all the storage costs of flour", "It cuts storage costs but exposes the business to supply failures."], ["JIT is unsuitable only because flour is a material and not a finished product", "The suitability depends on supplier reliability, not the type of material."], ["JIT should be adopted because larger orders of flour earn discounts", "JIT means small frequent orders, which tend to lose bulk discounts."]],
    hints: ["Think about what happens when a delivery is late."],
    explanation: "JIT reduces holding costs but needs reliable suppliers. With unreliable supply a safety stock protects production.",
  });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Idle time is charged to the job being worked on, because the worker is paid during it.", answer: false, explanation: "False. Idle time is non-productive; its cost is treated as an overhead, not charged to a job." });
  b.tf({ d: 3, skill: "UNDERSTANDING", stem: "Tax and pension deductions reduce the net wages paid to the worker but do not reduce the gross wages cost recorded by the employer.", answer: true, hints: ["Which figure is the employer's cost?"], explanation: "True. The employer's labour cost is the gross wage; the deductions are paid over to the authorities." });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its meaning.",
    pairs: ["Gross wages", "Net wages", "Piece rate", "Reorder level"],
    right: ["Wages earned before deductions", "Wages paid to the worker after deductions", "Pay for each unit produced", "The stock level at which a new order is placed"],
    rightIndex: [0, 1, 2, 3],
    explanation: "Gross wages are before deductions and net wages after them. Piece rate pays by output and the reorder level triggers an order.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the sentences.",
    template: "Under a time rate system a worker is paid according to the {{blank:a}} worked. The extra paid for overtime above the normal rate is called the overtime {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["hours"], choices: ["hours", "units", "orders"] }, { id: "b", accepted: ["premium"], choices: ["premium", "discount", "deduction"] }],
    explanation: "Time rate pays for hours worked; the extra above the normal rate is the overtime premium.",
  });
  b.short({ d: 1, skill: "RECALL", stem: "Name the record kept for each type of material showing quantities and values received, issued and held.", accepted: ["stores ledger", "stores ledger card", "stock ledger"], explanation: "It is the stores ledger (card)." });

  // numerical
  const rl = 25 * 6;
  const minL = rl - 16 * 4, maxL = rl + 240 - 10 * 2;
  chk(rl, 150); chk(minL, 86); chk(maxL, 370);
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: rl, daily: true, wrong: [16 * 4, 25 * 4],
    stem: "A depot uses between 10 and 25 bags of cement a day (average 16). Lead time is between 2 and 6 days (average 4). The reorder quantity is 240 bags. Calculate the reorder level in bags.",
    hints: ["Use the highest usage and the longest lead time."],
    explanation: `Reorder level = maximum usage × maximum lead time = 25 × 6 = ${rl} bags. Using the average usage and lead time gives only ${16 * 4} bags, which risks running out.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "units", value: maxL, wrong: [minL, rl + 240],
    stem: "Using the information in the previous question, calculate the maximum level in bags.",
    hints: ["Subtract the minimum usage during the minimum lead time."],
    explanation: `Maximum level = ${rl} + 240 - (10 × 2) = ${maxL} bags. Forgetting the deduction gives ${rl + 240}.`,
  });
  const rate = 5.5, bh = 40, oh = 8;
  const gross = bh * rate + oh * rate * 2;
  const tax = r2(gross * 0.1), pen = r2(gross * 0.03), net = r2(gross - tax - pen);
  chk(gross, 308); chk(net, 267.96);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: gross, calculator: true, wrong: [bh * rate, (bh + oh) * rate],
    stem: `A machinist is paid ${usd(rate)} an hour for a 40-hour week. In one week she also worked ${oh} hours of overtime, paid at double time. Calculate her gross wages.`,
    hints: ["Overtime at double time is paid at twice the hourly rate."],
    explanation: `Basic pay 40 × ${p2(rate)} = ${usd(bh * rate)}; overtime ${oh} × ${p2(rate * 2)} = ${usd(oh * rate * 2)}; gross wages = ${usd(gross)}. Paying the overtime at the basic rate would give ${usd((bh + oh) * rate)}.`,
  });
  b.calc({
    d: 4, skill: "APPLICATION", kind: "money", value: net, dp: 2, calculator: true, wrong: [gross - tax, gross - pen],
    stem: `The business deducts income tax at 10% of gross wages and a pension contribution of 3% of gross wages (assumed rates). Calculate the net wages paid to the machinist whose gross wages were ${usd(gross)}.`,
    hints: ["Calculate both deductions from the gross figure."],
    explanation: `Income tax = ${usd(tax)}; pension = ${usd(pen)}. Net wages = ${F(gross)} - ${F(tax)} - ${F(pen)} = ${usd(net)}.`,
  });
  const dl = 1260, un = 840;
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: dl / un, dp: 2, calculator: true, wrong: [1260 / 1000, 1500 / 840],
    stem: `Direct labour cost for the month was ${usd(dl)} and ${F(un)} chairs were completed. Idle time cost of ${usd(240)} and the overtime premium of ${usd(180)} are treated as overheads. Calculate the direct labour cost per chair.`,
    hints: ["Overheads are not part of the direct labour cost."],
    explanation: `Direct labour per chair = ${F(dl)} ÷ ${F(un)} = ${usd(dl / un)}. Idle time and overtime premium are overheads, so they are excluded.`,
  });

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain three possible reasons why the quantity in the stores differs from the balance on the stores ledger card.",
    points: ["Theft or pilfering of materials", "Damage, evaporation or deterioration not recorded", "Clerical errors, such as an issue or receipt not entered or entered wrongly"],
    modelAnswer: "Materials may have been stolen or damaged, or the clerk may have failed to record a receipt or issue, so the card and the physical count disagree.",
    explanation: "One mark for each reason.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain two advantages and two disadvantages of a just-in-time system for a clothing factory in Harare.",
    points: ["Advantage: less cash tied up in stock of cloth and finished goods", "Advantage: lower storage costs and less waste from damaged or out-of-fashion stock", "Disadvantage: a late delivery stops production immediately", "Disadvantage: loses discounts for buying in bulk and depends on a few suppliers"],
    modelAnswer: "JIT frees cash and cuts storage and obsolescence costs. However, a late delivery of cloth would stop the machines and bulk discounts would be lost.",
    hints: ["Give two on each side."],
    explanation: "One mark for each advantage and disadvantage, with a brief explanation.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "A workshop pays its welders by time rate and a rival pays by piece rate with a guaranteed minimum. Evaluate the two methods for the workshop owner.",
    points: ["Time rate: simple to calculate and the worker is paid for the hours worked", "Time rate: no direct incentive to work faster, so closer supervision is needed", "Piece rate: encourages output and links pay to production", "Piece rate: risk of poor quality and the guarantee still costs the employer when output is low", "Judgement: time rate suits skilled or quality-critical work; piece rate suits repetitive work with easy measurement"],
    modelAnswer: "Time rate is simple but gives no incentive to produce more, so supervision is needed. Piece rate rewards output but may reduce quality, and the guaranteed minimum is paid even when output is low. Time rate suits skilled welding where quality matters; piece rate suits repetitive work.",
    hints: ["Give a point for each method and a judgement."],
    explanation: "One mark for each of the five points.",
  });

  // Structured 1 (10 marks): stores card FIFO
  const op = { qty: 80, unitCost: 4 };
  const t1 = [{ type: "receipt", qty: 200, unitCost: 4.5 }, { type: "issue", qty: 150 }, { type: "receipt", qty: 100, unitCost: 5 }, { type: "issue", qty: 180 }];
  const r1 = inventory.fifoPerpetual(t1, op);
  chk(r1.issues[0].cost, 80 * 4 + 70 * 4.5);
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `Rudo's Hardware in Gweru keeps a stores ledger for roofing sheets, valued using FIFO. At 1 May there were ${op.qty} sheets in stock at ${usd(op.unitCost)} each.\n\n${table(["Date", "Movement"], [["6 May", "Received 200 sheets at US\\$4.50 each"], ["10 May", "Issued 150 sheets to a job"], ["18 May", "Received 100 sheets at US\\$5.00 each"], ["25 May", "Issued 180 sheets to a job"]], ["l", "l"])}`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: r1.issues[0].cost, wrong: [150 * 4.5, 150 * 4], stem: "Calculate the cost of the issue on 10 May.", explanation: `80 sheets at ${usd(4)} = ${usd(320)} plus 70 sheets at ${usd(4.5)} = ${usd(315)}; total ${usd(r1.issues[0].cost)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: r1.issues[1].cost, wrong: [180 * 5, 180 * 4.5], stem: "Calculate the cost of the issue on 25 May.", explanation: `130 sheets at ${usd(4.5)} = ${usd(585)} plus 50 sheets at ${usd(5)} = ${usd(250)}; total ${usd(r1.issues[1].cost)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "units", value: r1.closingQty, wrong: [50, 130], stem: "Calculate the number of sheets in stock at 31 May.", explanation: `80 + 200 - 150 + 100 - 180 = ${r1.closingQty} sheets.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: r1.closingValue, wrong: [r1.closingQty * 4.5, r1.closingQty * 4], stem: "Calculate the value of the stock at 31 May.", explanation: `The ${r1.closingQty} sheets left are from the 18 May delivery at ${usd(5)}: ${usd(r1.closingValue)}.` }),
      P.manual({ label: "(e)", marks: 2, stem: "State two reasons why a physical count of the roofing sheets might differ from the stores ledger.", points: ["Theft or damage not recorded", "Recording errors such as an issue not entered"], modelAnswer: "Sheets may have been stolen or damaged, or an issue may not have been recorded.", explanation: "One mark for each reason." }),
    ],
    hints: ["Issue the oldest sheets first.", "Check the closing value: opening + receipts - issues."],
    explanation: "This item tests a FIFO stores ledger with two issues and a closing value.",
  });
  chk(r1.closingValue, 80 * 4 + 200 * 4.5 + 100 * 5 - r1.costOfIssues);

  // Structured 2 (12 marks): wages and JIT
  const rate2 = 7, bh2 = 40, oh2 = 5, idle2 = 4, units2 = 190;
  const gross2 = bh2 * rate2 + oh2 * rate2 * 1.5;
  const direct2 = (bh2 - idle2 + oh2) * rate2;
  const prem2 = oh2 * rate2 * 0.5, idleC = idle2 * rate2;
  chk(direct2 + prem2 + idleC, gross2);
  const net2 = r2(gross2 * (1 - 0.15));
  b.struct({
    d: 4, skill: "ANALYSIS", calculator: true,
    stem: `Thandeka Moyo is employed by a Mutare furniture maker. Her basic week is ${bh2} hours at ${usd(rate2)} an hour. Overtime of ${oh2} hours is paid at time and a half. In the basic week she was idle for ${idle2} hours because of a shortage of timber. Deductions for tax and pension total 15% of gross wages (assumed). She made ${units2} stools.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: gross2, wrong: [bh2 * rate2, (bh2 + oh2) * rate2], stem: "Calculate her gross wages for the week.", explanation: `${bh2} × ${rate2} = ${F(bh2 * rate2)}; overtime ${oh2} × ${F(rate2 * 1.5)} = ${F(oh2 * rate2 * 1.5)}; gross ${usd(gross2)}.` }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: net2, dp: 2, wrong: [gross2 * 0.15, gross2], stem: "Calculate her net wages.", explanation: `Deductions 15% of ${F(gross2)} = ${usd(r2(gross2 * 0.15))}; net wages = ${usd(net2)}.` }),
      P.num({ label: "(c)", marks: 2, kind: "money", value: direct2, wrong: [gross2, (bh2 + oh2) * rate2], stem: "Calculate the direct labour cost (productive hours at the basic rate).", explanation: `Productive hours = ${bh2} - ${idle2} + ${oh2} = ${bh2 - idle2 + oh2}; × ${rate2} = ${usd(direct2)}.` }),
      P.num({ label: "(d)", marks: 2, kind: "money", value: prem2 + idleC, wrong: [idleC, prem2], stem: "Calculate the amount of her wages treated as overheads.", explanation: `Overtime premium ${oh2} × ${F(rate2 * 0.5)} = ${F(prem2)} plus idle time ${idle2} × ${rate2} = ${F(idleC)}; total ${usd(prem2 + idleC)}.` }),
      P.manual({ label: "(e)", marks: 4, stem: "The owner is considering a just-in-time system for timber to avoid the idle time. Evaluate this proposal.", points: ["JIT would reduce stock of timber held, saving storage cost and cash", "But the idle time was caused by a shortage of timber, and JIT makes the business more exposed to shortages", "Reliability of the timber supplier decides whether JIT would work", "Recommendation: improve reorder levels or keep safety stock rather than adopt JIT unless the supplier is reliable"], modelAnswer: "JIT would cut stock but it would not solve a shortage of timber; it could make idle time worse if deliveries are late. Unless the supplier is reliable, the owner should set reorder levels and keep a safety stock.", hints: ["The problem is a shortage, not excess stock."], explanation: "One mark for each point." }),
    ],
    hints: ["Idle time and the overtime premium are overheads.", "Net wages = gross wages less deductions."],
    explanation: "This item tests wage calculation, the direct/overhead split of labour and an evaluation of JIT.",
  });

  b.card("DEFINITION", "Stores ledger", "A record for each material of quantities and values received, issued and held, used to cost issues to jobs.");
  b.card("FORMULA", "Reorder level", "Maximum usage × maximum lead time.");
  b.card("FORMULA", "Minimum level", "Reorder level - (average usage × average lead time).");
  b.card("FORMULA", "Maximum level", "Reorder level + reorder quantity - (minimum usage × minimum lead time).");
  b.card("CONCEPT", "FIFO issues", "The oldest stock is issued first, so one issue may use two or more prices; the closing stock is valued at the latest prices.");
  b.card("FORMULA", "Gross and net wages", "Gross wages = basic pay + overtime. Net wages = gross wages - tax and pension deductions.");
  b.card("CONCEPT", "Idle time and overtime premium", "Idle time and, usually, the overtime premium are treated as production overheads, not direct labour.");
  b.card("DEFINITION", "Just-in-time (JIT)", "Materials arrive when needed and goods are made to order, so stock is kept very low.");
  b.card("CONCEPT", "JIT benefits and risks", "Benefits: lower storage costs, less cash tied up, less waste. Risks: late deliveries stop production; no bulk discounts; reliance on suppliers.");
});
