// Lesson generator: cost.job-batch
import { t, table, check, chk, r2, statement, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

// Example 1: job cost sheet
const vinyl = 14 * 18, board = 96, des = 6 * 12, fit = 10 * 9, crane = 120;
const prime = vinyl + board + des + fit + crane;
chk(prime, 630);
const prodOH = 16 * 6;
const prodCost = prime + prodOH;
chk(prodCost, 726);
const adminOH = 150;
const total = prodCost + adminOH;
chk(total, 876);
const priceMarkup = total * 1.25;
chk(priceMarkup, 1095);
const priceMargin = total / 0.75;
chk(priceMargin, 1168);
const sheet = statement("Job cost sheet: Job 117, signboard for a Mutare bottle store", [
  ["Direct materials: vinyl 14 m² × US\\$18.00", vinyl],
  ["Direct materials: board", board],
  ["Direct labour: designer 6 hours × US\\$12.00", des],
  ["Direct labour: fitter 10 hours × US\\$9.00", fit],
  ["Direct expenses: crane hire", crane],
  ["**Prime cost**", null, prime],
  ["Production overhead: 16 direct labour hours × US\\$6.00", null, prodOH],
  ["**Production cost**", null, prodCost],
  ["Selling and administration overhead (allocated to the job)", null, adminOH],
  ["**Total cost**", null, total],
], { cols: ["US\\$", "US\\$"], checks: [["prime", vinyl + board + des + fit + crane, prime], ["prod", prime + prodOH, prodCost], ["total", prodCost + adminOH, total]] });
const priceTab = table(["Method", "Working", "Profit US\\$", "Selling price US\\$"], [
  ["Mark-up of 25% on total cost", "876 × 1.25", priceMarkup - total, priceMarkup],
  ["Profit margin of 25% on selling price", "876 ÷ 0.75", priceMargin - total, priceMargin],
], ["l", "l", "r", "r"]);

// Example 2: batch
const batch = 2500;
const bdm = 1420, bdl = 160 * 5, setup = 150, boh = 160 * 3;
const btotal = bdm + bdl + setup + boh;
chk(btotal, 2850);
const perUnit = btotal / batch;
chk(perUnit, 1.14);
const sellUnit = perUnit * 1.5;
chk(sellUnit, 1.71);
const bsheet = statement("Batch cost sheet: Batch B22, 2,500 packets of biscuits (Gweru Biscuits)", [
  ["Direct materials (flour, sugar and packets)", bdm],
  ["Direct labour: 160 hours × US\\$5.00", bdl],
  ["Direct expense: machine set-up for the batch", setup],
  ["**Prime cost**", null, bdm + bdl + setup],
  ["Production overhead: 160 hours × US\\$3.00", null, boh],
  ["**Total cost of the batch**", null, btotal],
  ["Cost per packet: 2,850 ÷ 2,500", null, perUnit],
  ["Selling price per packet with a mark-up of 50%", null, sellUnit],
], { cols: ["US\\$", "US\\$"], checks: [["total", bdm + bdl + setup + boh, btotal]] });

// service job
const parts = 85, hrs = 4, lrate = 7.5, ohr = 4;
const lab = hrs * lrate;
const ohc = hrs * ohr;
const garage = parts + lab + ohc;
chk(garage, 131);
const svc = table(["Repair job at a Harare garage", "US\\$"], [["Spare parts", parts], ["Mechanic's labour: 4 hours × 7.50", lab], ["Overhead absorbed: 4 hours × 4.00", ohc], ["**Cost of the job**", garage], ["Profit at a margin of 20% on the price: 131 ÷ 0.80 - 131", garage / 0.8 - garage], ["**Price charged**", garage / 0.8]], ["l", "r"]);
chk(garage / 0.8, 163.75);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Job cost sheet; batch cost sheet", "Job cost; batch cost (cost card or cost sheet)"],
  ["Profit mark-up on cost; profit margin on selling price", "Mark-up on cost; margin on selling price"],
  ["Job and batch costing (contract and process costing are not examined)", "Job, batch and unit costing (contract and process costing are not examined)"],
], ["l", "l"]);

const body = t`
## Introduction

Rudo Banda runs a small printing and signwriting shop in Mutare. Each customer wants something different: a signboard for a bottle store, a wedding programme, 500 church leaflets. She cannot use one cost per unit for all her work, so she records the cost of each order separately and adds a profit to find the price. This is **job costing**. If many identical items are made together, the same record is kept for the **batch**, and the cost of one item is the batch cost divided by the number of items. Job and batch costing is examined in ZIMSEC Papers 2 and 3 and Cambridge Paper 2 question 4, often as the last stage of an overhead absorption question.

You should be able to calculate prime cost and an overhead absorption rate.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Contract costing and process costing are **not examined** by either board.
:::

## Key definitions

:::definition{term="Job costing"}
A costing method for work done to a customer's order, in which materials, labour, expenses and overheads are recorded and charged to each job on a job cost sheet.
:::

:::definition{term="Batch costing"}
A method used when a quantity of identical units is made together. The cost of the batch is divided by the number of good units to give a cost per unit.
:::

:::definition{term="Unit costing"}
A method for a business producing a single, standard product, in which total costs for the period are divided by the number of units produced.
:::

:::definition{term="Mark-up and margin"}
Mark-up is profit as a percentage of cost; margin is profit as a percentage of selling price. A 25% mark-up on cost is a 20% margin on price.
:::

## The cost sheet

A job (or batch) cost sheet gathers, in order:

1. **Direct materials**, from the requisitions for the job.
2. **Direct labour**, from the time sheets, at the rate for each grade of worker.
3. **Direct expenses**, such as the hire of equipment for the job or a set-up cost for a batch.
4. The **prime cost** (the total of 1 to 3).
5. **Production overhead**, absorbed at the pre-determined rate on the basis stated (for example, per direct labour hour).
6. The **production cost** and, if non-production overheads are charged to jobs, **selling and administration overhead**.
7. The **total cost**, to which the profit is added.

The selling price comes from the cost-plus method: add a mark-up on cost, or a margin on the selling price.

:::worked-solution[Example 1: a job cost sheet and two ways of adding profit]
Rudo's shop quotes for Job 117, a signboard for a Mutare bottle store. The job uses 14 m² of vinyl at US\$18.00 a square metre and board costing US\$96. The designer worked 6 hours at US\$12.00 an hour and the fitter 10 hours at US\$9.00. Crane hire for the job cost US\$120. Production overhead is absorbed at US\$6.00 per direct labour hour, and US\$150 of selling and administration overhead is allocated to the job.

${sheet}

The total cost is US\$876. The price depends on the way the profit is added.

${priceTab}

A mark-up of 25% gives a profit of US\$219 and a price of US\$1,095. A margin of 25% needs a higher price of US\$1,168 because the profit is 25% of the price, which equals a mark-up of 33.3% on cost. State which method the question uses.
:::

## Batch costing and unit costing

For a batch, the cost sheet is the same but the last step is to find the **cost per unit** by dividing the total cost by the units made. Items that were spoiled and cannot be sold should not be counted if the question says the batch has good units only. Some costs are batch costs rather than unit costs: a machine set-up is the same whether the batch is 500 or 5,000 units, so the larger the batch, the lower the set-up cost per unit.

:::worked-solution[Example 2: batch cost per packet]
Gweru Biscuits bakes Batch B22 of 2,500 packets. The materials cost US\$1,420. Direct labour was 160 hours at US\$5.00 an hour. Setting up the packing machine for the batch cost US\$150. Overhead is absorbed at US\$3.00 per direct labour hour.

${bsheet}

The cost of each packet is US\$1.14. A mark-up of 50% gives a selling price of US\$1.71. If the set-up were shared over a batch of 5,000 packets the set-up cost per packet would be halved, from US\$0.06 to US\$0.03.
:::

## Job costing in service businesses

Service businesses such as garages, accountants and hairdressers also use job costing. The "materials" are the parts or supplies used, the "labour" is the hours of staff time and the overhead is absorbed per hour of labour. Often the business charges a rate per hour that includes the overhead and profit.

${svc}

A **unit costing** business, such as a cement works making one grade of cement, divides the total cost for the period by the tonnes produced. If total costs were US\$96,000 and 12,000 tonnes were made, the cost is US\$8.00 a tonne.

## Common mistakes

:::mistake{title="Applying the overhead rate to the wrong base"}
If the rate is per direct labour hour, multiply by hours, not by the labour cost. Check the base in the question.
:::

:::mistake{title="Confusing mark-up and margin"}
A mark-up uses cost as the base: price = cost × (1 + mark-up). A margin uses the price as the base: price = cost ÷ (1 - margin).
:::

:::mistake{title="Dividing the batch cost by the wrong number of units"}
Use the units produced (or good units if stated). A batch cost per unit uses the whole batch cost, including the set-up.
:::

:::mistake{title="Leaving out direct expenses"}
Costs traced to the job, such as equipment hire, belong to the prime cost, not to overhead.
:::

## Exam tips

:::exam-tip
Job and batch costing is examined in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4. For *prepare* a cost sheet, use the sequence prime cost, production cost, total cost and show each rate and working. For *calculate* the price, say whether the profit is a mark-up on cost or a margin on selling price.
:::

:::exam-tip
For *evaluate* or *advise*, comment on whether the price is competitive, how much of the cost is overhead and which part (for example the set-up) can be reduced by making larger batches. Add a non-financial factor such as the quality of the customer's work or the chance of repeat orders.
:::

## Summary

:::summary
- A cost sheet records direct materials, direct labour and direct expenses (prime cost), then absorbed overheads, to find the total cost of a job or batch.
- Cost per unit of a batch = total batch cost ÷ units produced; set-up costs fall per unit as the batch grows.
- Selling price = cost + mark-up (on cost) or cost ÷ (1 - margin) (on price).
- Service businesses use the same method with parts as materials and staff time as labour.
- Contract costing and process costing are not examined.
:::
`;
writeLesson("cost/job-batch.md", front("cost.job-batch", "Job, batch and unit costing", "Prepare job and batch cost sheets with prime cost, absorbed overheads and total cost, find the cost per unit of a batch, and set a selling price using a mark-up or a margin.", "aacc.cost.job-batch", 50), body);
void check; void r2;
