// Lesson generator: incomplete.missing-figures
import { fmt, chk, check, r2, sum, ratios } from "../lib.mjs";
import { writeLesson, tAcct } from "./w2a-lib.mjs";

// ---- Example 1: total accounts
const recv = { open: 3860, close: 4415, bank: 41230, disc: 485, ret: 910, bad: 270 };
const credSales = r2(recv.close + recv.bank + recv.disc + recv.ret + recv.bad - recv.open);
chk(credSales, 43450);
const recvT = tAcct(
  "Total trade receivables account",
  [["1 Jan", "Balance b/d", recv.open], ["31 Dec", "Credit sales (balancing figure)", credSales]],
  [["31 Dec", "Bank", recv.bank], ["31 Dec", "Discount allowed", recv.disc], ["31 Dec", "Returns inwards", recv.ret], ["31 Dec", "Irrecoverable debts", recv.bad], ["31 Dec", "Balance c/d", recv.close]],
  { side: "dr", date: "1 Jan", details: "Balance b/d", amount: recv.close },
);
const pay = { open: 5120, close: 4785, bank: 29640, disc: 390, ret: 705 };
const credPurch = r2(pay.close + pay.bank + pay.disc + pay.ret - pay.open);
chk(credPurch, 30400);
const payT = tAcct(
  "Total trade payables account",
  [["31 Dec", "Bank", pay.bank], ["31 Dec", "Discount received", pay.disc], ["31 Dec", "Returns outwards", pay.ret], ["31 Dec", "Balance c/d", pay.close]],
  [["1 Jan", "Balance b/d", pay.open], ["31 Dec", "Credit purchases (balancing figure)", credPurch]],
  { side: "cr", date: "1 Jan", details: "Balance b/d", amount: pay.close },
);
const cashSales = 6320;
const totalSales = r2(credSales + cashSales);

// ---- Example 2: bank summary with drawings as the balancing figure; expenses with accrual
const b = { open: 2140, cust: 27840, banked: 11260, supp: 19375, rent: 4800, wages: 9240, elec: 1960, close: 3415 };
const drawings = r2(b.open + b.cust + b.banked - b.supp - b.rent - b.wages - b.elec - b.close);
chk(drawings, 2450);
const bankT = tAcct(
  "Bank summary for the year",
  [["1 Jan", "Balance b/d", b.open], ["Various", "Customers", b.cust], ["Various", "Cash banked", b.banked]],
  [["Various", "Suppliers", b.supp], ["Various", "Rent", b.rent], ["Various", "Wages", b.wages], ["Various", "Electricity", b.elec], ["31 Dec", "Drawings (balancing figure)", drawings], ["31 Dec", "Balance c/d", b.close]],
  { side: "dr", date: "1 Jan", details: "Balance b/d", amount: b.close },
);
const cash = { open: 180, takings: 14720, banked: b.banked, paidOut: 1340, close: 215 };
const stolen = r2(cash.open + cash.takings - cash.banked - cash.paidOut - cash.close);
chk(stolen, 2085);
const cashT = tAcct(
  "Cash in hand summary for the year",
  [["1 Jan", "Balance b/d", cash.open], ["Various", "Cash takings from sales", cash.takings]],
  [["Various", "Cash banked", cash.banked], ["Various", "Expenses paid from the till", cash.paidOut], ["Various", "Cash stolen (balancing figure)", stolen], ["31 Dec", "Balance c/d", cash.close]],
  { side: "dr", date: "1 Jan", details: "Balance b/d", amount: cash.close },
);
const elecOpen = 220;
const elecClose = 310;
const elecExp = r2(b.elec + elecClose - elecOpen);
chk(elecExp, 2050);

// ---- Example 3: margin, mark-up and a fire
const inv0 = 18640;
const purch = 61380;
const retOut = 1240;
const sales = 82500;
const retIn = 1500;
const margin = 25;
const rev = r2(sales - retIn);
const cos = r2(rev * (100 - margin) / 100);
const invFire = r2(inv0 + purch - retOut - cos);
const salvage = 2600;
const lossFire = r2(invFire - salvage);
chk(cos, 60750);
chk(invFire, 18030);
chk(lossFire, 15430);
const markUp = ratios.markUpFromMargin(margin);
chk(markUp, 33.3333, 0.001);
const mu40 = ratios.marginFromMarkUp(40);
chk(mu40, 28.5714, 0.001);

const body = `## Introduction

Shamu Stores in Gokwe is a hardware shop that banks its takings, pays most bills by cheque and keeps a file of invoices, but has no sales ledger or cash book. At the end of the year the accountant has the bank statements, the till rolls, the invoice files and the balances at the start and end of the year. The task is to rebuild the missing totals so that the statement of profit or loss can be prepared.

This lesson shows the tools: **total accounts** for receivables and payables, **summaries** of cash and bank, and **gross profit margin and mark-up** to find sales, cost of sales or inventory when information is missing. The profit estimation method from the previous lesson gives a single figure; these techniques give the detail. The next lesson uses them to build full financial statements.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (common usage) | Cambridge 9706 |
| --- | --- |
| Debtors control account; creditors control account | Trade receivables and trade payables total accounts |
| Bad debts | Irrecoverable debts |
| Stock | Inventory |
| Profit estimation | Profit from the accounting equation |

Both boards examine total accounts, cash and bank summaries, margin and mark-up and inventory destroyed by fire or theft. Margin and mark-up as ratios are in the ratio lessons; here they are used as tools.
:::

## Key definitions

:::definition{term="Total account"}
A ledger-style account built for all receivables (or all payables) together, from opening and closing balances and the known totals of cash, discounts, returns and write-offs. The unknown total, credit sales or credit purchases, is the balancing figure.
:::

:::definition{term="Gross profit margin"}
Gross profit as a percentage of revenue. A margin of 25% means US\\$25 of gross profit in every US\\$100 of sales.
:::

:::definition{term="Mark-up"}
Gross profit as a percentage of the cost of sales. A mark-up of 40% means US\\$40 is added to each US\\$100 of cost.
:::

## Total accounts for credit sales and purchases

Credit sales are the one total the owner cannot read from a bank statement. Enter the known items into a total receivables account: the balance at the start and the credit sales on the debit side, cash received, discount allowed, returns inwards, irrecoverable debts and the closing balance on the credit side. Credit sales is the figure that makes the sides equal. Add cash sales, known from the till roll, to obtain total sales. The payables account works the same way on the opposite sides: purchases on credit are the balancing figure.

:::worked-solution[Example 1: credit sales and credit purchases]
Shamu Stores had trade receivables of US\\$3,860 on 1 January and US\\$4,415 on 31 December. During the year customers paid US\\$41,230 by cheque, US\\$485 of discount was allowed, goods worth US\\$910 were returned and US\\$270 of debts were written off. Cash sales (from the till rolls) were US\\$6,320. Trade payables were US\\$5,120 at 1 January and US\\$4,785 at 31 December; suppliers were paid US\\$29,640 by cheque, discount received was US\\$390 and returns outwards were US\\$705.

${recvT}

Credit sales are ${fmt(credSales)}; with cash sales of ${fmt(cashSales)}, total sales are ${fmt(totalSales)}.

${payT}

Credit purchases are ${fmt(credPurch)}.
:::

## Cash and bank summaries

A summary of the bank statement, with the opening and closing balances, shows the cash drawn out by the owner as the balancing figure when all other payments are known. A summary of cash in hand works the same way: if the till is missing money, cash stolen is the balancing figure, but only after the owner has confirmed all other receipts and payments. Where drawings are known, the balancing figure is the unrecorded item.

Expenses are then adjusted for accruals and prepayments exactly as in the ledger lessons: expense for the year = cash paid - opening accrual + closing accrual (and the reverse for prepayments).

:::worked-solution[Example 2: bank and cash summaries]
Tinashe Dube's tuck shop in Mutare had US\\$2,140 in the bank at 1 January and US\\$3,415 at 31 December. Receipts: customers' cheques US\\$27,840 and cash banked US\\$11,260. Payments: suppliers US\\$19,375, rent US\\$4,800, wages US\\$9,240 and electricity US\\$1,960. All other payments were drawings. Cash in hand was US\\$180 at 1 January and US\\$215 at 31 December; the till rolls show cash takings of US\\$14,720; US\\$1,340 was paid out of the till for expenses; the only other movement was cash banked and the loss of takings in a break-in. Electricity owing was US\\$220 at 1 January and US\\$310 at 31 December.

${bankT}

${cashT}

Drawings are ${fmt(drawings)} and cash stolen is ${fmt(stolen)}. The electricity expense is 1,960 - 220 + 310 = ${fmt(elecExp)}.
:::

## Margin and mark-up as tools

When sales and the margin are known, cost of sales is revenue × (100 - margin) ÷ 100. When cost of sales and mark-up are known, sales are cost × (100 + mark-up) ÷ 100. Purchases then follow from the cost of sales formula, and inventory destroyed by fire or theft is the balancing figure of the inventory account.

:::keyfact{title="Margin and mark-up"}
Margin = gross profit ÷ revenue × 100. Mark-up = gross profit ÷ cost of sales × 100.

A margin of 25% is the same as a mark-up of 33⅓%, because gross profit of 25 on sales of 100 is 25 on cost of 75. A mark-up of 40% is a margin of ${fmt(r2(mu40))}%. Always say which base you are using.
:::

:::worked-solution[Example 3: inventory lost in a fire]
A fire destroyed the stock room of Chipo's boutique in Harare on 12 October. The records show inventory at 1 January of US\\$18,640, purchases to 12 October of US\\$61,380, returns outwards of US\\$1,240, sales to 12 October of US\\$82,500 and returns inwards of US\\$1,500. The business earns a gross profit margin of 25% on revenue. Salvaged goods are worth US\\$2,600. Calculate the loss to be claimed from the insurer.

1. Revenue: 82,500 - 1,500 = ${fmt(rev)}.
2. Cost of sales: 75% × ${fmt(rev)} = ${fmt(cos)}.
3. Estimated inventory before the fire: 18,640 + 61,380 - 1,240 - ${fmt(cos)} = ${fmt(invFire)}.
4. Loss: ${fmt(invFire)} - 2,600 = ${fmt(lossFire)}.

The calculation assumes that the margin was constant and that prices and mix did not change. If a part of the stock was sold at a discount, the loss is overstated.
:::

## Choosing the method

Read the question for what is missing. Missing credit sales or purchases: total accounts. Missing drawings or cash lost: a cash or bank summary. Missing sales, cost of sales or closing inventory: margin or mark-up. Missing profit only: the statement of affairs. Always show each working as a labelled account or a short calculation; examiners award the working marks even when later figures are wrong.

## Common mistakes

:::mistake{title="Using the wrong side for the balancing figure"}
Credit sales is a debit in the receivables account. Credit purchases is a credit in the payables account. Draw the account and put each item on the correct side before totalling.
:::

:::mistake{title="Confusing margin and mark-up"}
Margin uses revenue as the base, mark-up uses cost of sales. A 25% margin is not a 25% mark-up.
:::

:::mistake{title="Forgetting cash sales or the returns"}
Total sales = credit sales + cash sales. Revenue deducts returns inwards. Cost of sales uses purchases net of returns outwards.
:::

:::mistake{title="Treating the balancing figure as certain"}
Drawings, cash stolen and inventory lost are estimates: they absorb any unrecorded item. State that the figure assumes all other items are complete.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 2 and Paper 3 and Cambridge Papers 1, 2 and 3 set missing-figure work at the front of incomplete-records questions. For *calculate* or *prepare*, show the account with its balancing figure and labelled items, then use the answers in the statements. For *state* or *explain* the assumption behind a margin calculation, say that the margin was constant throughout the period.
:::

:::exam-tip
For *advise* or *comment* on stolen or missing cash, point to the lack of records and recommend regular banking, a till reconciliation and double-entry books with a cash book.
:::

## Summary

:::summary
- A total receivables or payables account gives credit sales or credit purchases as the balancing figure.
- Total sales = credit sales + cash sales; revenue deducts returns inwards.
- Bank and cash summaries yield drawings or cash stolen as the balancing figure once all other items are known.
- Margin is a percentage of revenue and mark-up a percentage of cost; a 25% margin equals a 33⅓% mark-up.
- Inventory lost in a fire = opening inventory + net purchases - cost of sales (from margin), less any salvage.
- Show every account and calculation; the balancing figures are estimates that assume the other items are complete.
:::
`;

writeLesson(
  "incomplete/missing-figures.md",
  {
    key: "incomplete.missing-figures",
    title: "Missing figures: total accounts, cash summaries, margin and mark-up",
    summary: "Reconstruct missing credit sales, credit purchases, drawings, cash lost and inventory lost using total accounts, cash and bank summaries and gross profit margin and mark-up.",
    concepts: ["aacc.incomplete.missing-figures"],
    estimatedMinutes: 55,
    level: "core",
  },
  body,
);
