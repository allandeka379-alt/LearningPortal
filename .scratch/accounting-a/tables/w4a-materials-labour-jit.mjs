// Lesson generator: cost.materials-labour-jit
import { t, table, check, chk, r2, inventory, fmt, sum } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

// Example 1: stores ledger, FIFO
const opening = { qty: 40, unitCost: 25 };
const txs = [
  { type: "receipt", qty: 100, unitCost: 26 },
  { type: "issue", qty: 60 },
  { type: "receipt", qty: 80, unitCost: 27 },
  { type: "issue", qty: 90 },
];
const res = inventory.fifoPerpetual(txs, opening);
chk(res.issues[0].cost, 1520);
chk(res.issues[1].cost, 2350);
chk(res.closingValue, 1890);
check("stores", 1000 + 2600 + 2160 - res.costOfIssues, res.closingValue);
const stores = table(["Date", "Details", "Receipts qty", "Receipts US\\$", "Issues qty", "Issues US\\$", "Balance qty", "Balance US\\$"], [
  ["1 Mar", "Opening balance (40 at 25)", "", "", "", "", 40, 1000],
  ["2 Mar", "Received 100 at 26", 100, 2600, "", "", 140, 3600],
  ["4 Mar", "Issued to job J14: 40 at 25 and 20 at 26", "", "", 60, 1520, 80, 2080],
  ["9 Mar", "Received 80 at 27", 80, 2160, "", "", 160, 4240],
  ["12 Mar", "Issued to job J15: 80 at 26 and 10 at 27", "", "", 90, 2350, 70, 1890],
], ["l", "l", "r", "r", "r", "r", "r", "r"]);

const rol = 60 * 4, minL = rol - 40 * 3, maxL = rol + 180 - 20 * 2;
chk(rol, 240); chk(minL, 120); chk(maxL, 380);
const levels = table(["Level", "Formula", "Working", "Sheets"], [
  ["Reorder level", "Maximum usage × maximum lead time", "60 × 4", 240],
  ["Minimum level", "Reorder level - (average usage × average lead time)", "240 - (40 × 3)", 120],
  ["Maximum level", "Reorder level + reorder quantity - (minimum usage × minimum lead time)", "240 + 180 - (20 × 2)", 380],
], ["l", "l", "l", "r"]);

// Example 2: labour
const rate = 6, basic = 40, idle = 3, ot = 6;
const otPay = ot * rate * 1.5;
const gross = basic * rate + otPay;
chk(gross, 294);
const tax = r2(gross * 0.12), pen = r2(gross * 0.05), net = r2(gross - tax - pen);
chk(net, 244.02);
const prodHours = basic - idle + ot;
const direct = prodHours * rate;
const premium = ot * rate * 0.5;
const idleCost = idle * rate;
chk(direct + premium + idleCost, gross);
const units = 215;
const perUnit = r2(direct / units);
chk(perUnit, 1.2);
const wages = table(["", "US\\$"], [
  ["Basic pay: 40 hours × US\\$6", 240],
  ["Overtime: 6 hours × US\\$6 × 1.5", otPay],
  ["**Gross wages**", gross],
  ["Income tax deducted (12% of gross, assumed)", -tax],
  ["Pension contribution (5% of gross, assumed)", -pen],
  ["**Net wages paid to Tapiwa**", net],
], ["l", "r"]);
const alloc = table(["Charge", "Working", "US\\$"], [
  ["Direct labour", "43 productive hours × 6", direct],
  ["Overtime premium (overhead)", "6 hours × 6 × 0.5", premium],
  ["Idle time (overhead)", "3 hours × 6", idleCost],
  ["**Total gross wages**", "", gross],
], ["l", "l", "r"]);
const piece = table(["", "US\\$"], [["Output 900 units × US\\$0.35", 315], ["Guaranteed minimum", 280], ["**Pay for the week (the higher)**", 315]], ["l", "r"]);

const terms = table(["Topic", "Cambridge AS Level detail"], [
  ["Materials", "Purchase, issue, returns, stores ledger and inventory levels"],
  ["Labour", "Time rate, piece rate, overtime, idle time, gross-to-net wages, labour cost per unit"],
  ["JIT", "Principles, benefits and risks of just-in-time inventory management"],
], ["l", "l"]);

const body = t`
## Introduction

Sipho Dlamini's workshop in Bulawayo fabricates steel gates. Two large costs decide whether a gate is profitable: the steel in store and the wages of the welders. If the stores clerk issues steel without recording it, or pays overtime without noticing idle hours, the cost of a job is wrong. This lesson shows how materials and labour costs are recorded and controlled, and why some businesses hold almost no stock under **just-in-time (JIT)** purchasing.

**This lesson is Cambridge only (AS Level).** The ZIMSEC syllabus does not name stores ledgers, wage calculations or JIT, although the costs themselves are the same. Valuation formulae (FIFO and AVCO) are in the inventory valuation lesson; here we apply FIFO to a stores record.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

ZIMSEC candidates can skip this lesson. The cost terms and the absorption of labour and material in later lessons apply to both boards.
:::

## Key definitions

:::definition{term="Stores ledger"}
A record, kept for each type of material, of quantities and values received, issued and held, so that the cost of each issue can be charged to a job or cost centre.
:::

:::definition{term="Reorder level"}
The inventory level at which a new order is placed. It is set so that stock lasts until the delivery arrives, even at maximum usage and the longest lead time.
:::

:::definition{term="Idle time"}
Paid hours when workers cannot work because of a breakdown, a shortage of materials or waiting for instructions. It is not charged to a job but treated as an overhead.
:::

:::definition{term="Just-in-time (JIT)"}
A system in which materials are delivered to production only when they are needed, and finished goods are made only to meet orders, so that inventory is kept as low as possible.
:::

## Accounting for materials

Materials are **purchased** (debit inventory of materials, credit payables or bank), **issued** to production (debit work in progress for direct materials, debit production overheads for indirect materials, credit inventory of materials) and sometimes **returned**: to the supplier (credit inventory, debit payables) or from production to the stores (the reverse of the issue, at the issue price). A **goods received note** and a **materials requisition** support each movement, so that each entry can be traced.

The **stores ledger** records every movement with quantity and value. The balance of each card is checked against a physical count at least once a year; the difference is a loss (theft, damage or recording error) to be investigated.

:::worked-solution[Example 1: a stores ledger card and inventory levels]
Sipho's workshop uses steel sheets. At 1 March there are 40 sheets in stock, valued at US\$25 each. Receipts and issues in March are shown below, using FIFO.

${stores}

Total issues are 1,520 + 2,350 = US\$3,870 and the closing stock of 70 sheets at US\$27 is US\$1,890. As a check: 1,000 + 2,600 + 2,160 - 3,870 = 1,890.

Inventory levels help the storekeeper to decide when and how much to order. Weekly usage of steel sheets is between 20 and 60 (average 40), the lead time between 2 and 4 weeks (average 3) and the reorder quantity 180 sheets.

${levels}

An order is placed when stock falls to 240 sheets. The minimum level of 120 is a warning that the supplier is late; the maximum of 380 warns of over-stocking.
:::

## Accounting for labour

Labour cost starts with **gross wages**: the wages earned before deductions. The two main methods of payment are:

- **Time rate:** hours worked × rate per hour. Overtime is paid at a higher rate; the **premium** (the extra over the normal rate) is usually treated as an overhead unless the overtime was caused by one particular job, in which case it is charged to that job.
- **Piece rate:** units produced × rate per unit, often with a guaranteed minimum wage.

From gross wages the employer deducts income tax and employee pension or social security contributions and pays them to the authorities; the worker receives **net wages**. The deductions are part of the gross cost, not an extra cost to the employer in the cost record. The employer's own contributions are a further labour cost.

**Direct labour** is the productive time of workers on the cost unit; **indirect labour** (supervisors, cleaners, storekeepers) and non-productive time such as idle time are overheads. **Labour cost per unit** is the direct labour cost divided by the units produced.

:::worked-solution[Example 2: wages, deductions and labour cost per unit]
Tapiwa Gumbo is a welder. His basic week is 40 hours at US\$6 an hour. He also worked 6 hours of overtime paid at time and a half. Because of a power cut he was idle for 3 hours of the basic week. The business deducts income tax of 12% and a pension contribution of 5% of gross wages (assumptions for this example). He welded 215 gates.

${wages}

The wages are charged to cost records as follows.

${alloc}

Direct labour cost per gate = 258 ÷ 215 = US\$1.20. The idle time and the overtime premium are overheads of the workshop. A piece rate worker, Nyasha, is paid US\$0.35 for each unit with a guaranteed minimum of US\$280 a week. She made 900 units.

${piece}
:::

## Just-in-time

Under JIT, the business agrees with suppliers to deliver small quantities frequently, so stock of materials, work in progress and finished goods is close to zero.

**Benefits:** lower storage costs and less cash tied up in stock, less waste from damage and obsolescence, faster response to customer orders and improved quality through close supplier relationships.

**Risks:** a late delivery stops production at once; the business depends heavily on a few reliable suppliers; there is no buffer for a sudden rise in demand; and suppliers may charge more for frequent small deliveries or the buyer may lose bulk discounts. JIT suits businesses with reliable suppliers close by, which may be difficult where roads or power supplies are uncertain.

## Common mistakes

:::mistake{title="Using the wrong price for issues under FIFO"}
Under FIFO the oldest layer is issued first, so an issue may use two prices. Issuing the whole quantity at the latest price overstates cost and understates the closing stock.
:::

:::mistake{title="Charging idle time and the overtime premium to the job"}
Idle time is not productive. The premium is usually general overhead. Only the normal-rate cost of productive hours is direct labour.
:::

:::mistake{title="Confusing reorder, minimum and maximum levels"}
Reorder level uses the highest usage and longest lead time. Minimum level subtracts the average usage over the average lead time. Maximum level uses the lowest usage and shortest lead time.
:::

:::mistake{title="Calling deductions an extra cost to the employer"}
Tax and pension deductions come out of gross wages. The employer's cost is the gross wage (plus any employer contribution).
:::

## Exam tips

:::exam-tip
This lesson is for Cambridge Paper 1 and Paper 2 question 4 only. For *calculate* a stores balance, show quantities and values and check with opening + receipts - issues. For *calculate* wages, show basic pay, overtime and the deductions separately and give gross and net wages. For *explain* the JIT system, give a benefit and a risk with a context.
:::

:::exam-tip
For *evaluate* or *advise* on JIT, give a reasoned judgement: "JIT is suitable only if supplier delivery is reliable. Where power cuts or road delays are common, a safety stock is needed." Use the context of the question in your answer.
:::

## Summary

:::summary
- Stores ledgers record quantity and value of receipts, issues and balances; FIFO issues the oldest stock first.
- Reorder level = maximum usage × maximum lead time; minimum and maximum levels warn of delay and over-stocking.
- Wages: time rate or piece rate; gross wages less tax and pension give net wages; overtime premium and idle time are overheads.
- Direct labour cost per unit = direct labour cost ÷ units produced.
- JIT cuts stock costs but depends on reliable suppliers; late delivery stops production.
:::
`;
writeLesson("cost/materials-labour-jit.md", front("cost.materials-labour-jit", "Accounting for materials and labour; just in time", "Record material receipts and issues in a stores ledger, set inventory levels, calculate gross and net wages and labour cost per unit, and evaluate just-in-time inventory management (Cambridge AS Level).", "aacc.cost.materials-labour-jit", 55), body);
