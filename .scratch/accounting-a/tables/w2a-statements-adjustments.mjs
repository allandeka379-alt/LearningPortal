// Lesson generator: statements.adjustments
import { table, journal, check, sum, r2, chk, fmt } from "../lib.mjs";
import { writeLesson, etb, heading } from "./w2a-lib.mjs";

// ---- Example 1: bridge from draft profit to corrected profit (Mwenda Traders)
const draft = 31500;
const accrWages = 640;
const prepIns = 310;
const equipCost = 28000;
const dep = r2(equipCost * 0.1);
const written = 480;
const recvBefore = 18400;
const recvAfter = r2(recvBefore - written);
const allow = r2(recvAfter * 0.05);
const allowOpen = 700;
const allowInc = r2(allow - allowOpen);
const commAdv = 150;
const ownUse = 220;
const printer = 900;
const printerDep = r2(printer * 0.2);
const corrected = r2(draft - accrWages + prepIns - dep - written - allowInc - commAdv + ownUse + printer - printerDep);
chk(allow, 896);
chk(allowInc, 196);
chk(dep, 2800);
chk(printerDep, 180);
chk(corrected, 28484, 0.001, "corrected profit");
const bridge = table(
  ["Step", "Effect on profit", "Running profit"],
  (() => {
    let p = draft;
    const out = [["Draft profit for the year", "", p]];
    const step = (label, v) => {
      p = r2(p + v);
      out.push([label, v < 0 ? `(${fmt(-v)})` : `+${fmt(v)}`, p]);
    };
    step("Wages owing at the year end", -accrWages);
    step("Insurance prepaid", prepIns);
    step("Depreciation of equipment: 10% of 28,000", -dep);
    step("Irrecoverable debt written off", -written);
    step("Increase in allowance: 5% of 17,920 = 896, less 700", -allowInc);
    step("Commission received in advance", -commAdv);
    step("Goods taken by the owner for own use (cost 220)", ownUse);
    step("Printer bought for 900 charged to office expenses", printer);
    step("Depreciation of the printer: 20% of 900", -printerDep);
    out.push(["**Corrected profit for the year**", "", corrected]);
    check("bridge end", p, corrected);
    return out;
  })(),
  ["l", "r", "r"],
);
const effectTable = table(
  ["Adjustment", "Profit", "Assets", "Liabilities or capital"],
  [
    ["Expense accrued", "Down", "No change", "Current liabilities up"],
    ["Expense prepaid", "Up", "Current assets up", "No change"],
    ["Income earned, not received", "Up", "Current assets up", "No change"],
    ["Income received in advance", "Down", "No change", "Current liabilities up"],
    ["Depreciation charge", "Down", "Carrying amount down", "No change"],
    ["Irrecoverable debt written off", "Down", "Trade receivables down", "No change"],
    ["Increase in allowance", "Down", "Trade receivables (net) down", "No change"],
    ["Goods taken by the owner", "Up (cost of sales falls)", "No change", "Drawings up, capital down"],
    ["Capital item charged as an expense", "Up", "Non-current assets up", "No change"],
  ],
  ["l", "l", "l", "l"],
);
const ownJ = journal([{ date: "31 Dec", lines: [["Drawings", ownUse, null], ["Purchases", null, ownUse]], narrative: "Goods taken by the owner for personal use, at cost" }]);
const printJ = journal([{ date: "31 Dec", lines: [["Equipment (printer)", printer, null], ["Office expenses", null, printer]], narrative: "Printer wrongly charged as an expense; capitalised" }]);

// ---- Example 2: extended trial balance (Rudo Stationers)
const D = {
  equip: 20000, inv0: 7200, purch: 61500, wages: 14800, rent: 3600, ins: 1640, sundry: 2150, recv: 9600, bank: 5350, drawings: 6000,
};
const C = { sales: 98400, accDep: 4000, allow: 300, payables: 6100 };
const dTot = sum(Object.values(D));
const capital = r2(dTot - sum(Object.values(C)));
const cl = 8100;
const wAcc = 900;
const iPre = 400;
const depE = r2(D.equip * 0.1);
const wo = 650;
const recvAfterE = r2(D.recv - wo);
const allowE = r2(recvAfterE * 0.04);
const allowIncE = r2(allowE - C.allow);
const own2 = 250;
chk(allowE, 358);
chk(allowIncE, 58);
const accounts = [
  { name: "Equipment at cost", kind: "SFP", dr: D.equip },
  { name: "Inventory at 1 January", kind: "PL", dr: D.inv0 },
  { name: "Purchases", kind: "PL", dr: D.purch },
  { name: "Wages", kind: "PL", dr: D.wages },
  { name: "Rent", kind: "PL", dr: D.rent },
  { name: "Insurance", kind: "PL", dr: D.ins },
  { name: "Sundry expenses", kind: "PL", dr: D.sundry },
  { name: "Trade receivables", kind: "SFP", dr: D.recv },
  { name: "Bank", kind: "SFP", dr: D.bank },
  { name: "Drawings", kind: "SFP", dr: D.drawings },
  { name: "Sales", kind: "PL", cr: C.sales },
  { name: "Accumulated depreciation", kind: "SFP", cr: C.accDep },
  { name: "Allowance for irrecoverable debts", kind: "SFP", cr: C.allow },
  { name: "Trade payables", kind: "SFP", cr: C.payables },
  { name: "Capital at 1 January", kind: "SFP", cr: capital },
];
const adjustments = [
  { label: "1", lines: [["Inventory at 31 December", cl, null, "SFP"], ["Closing inventory", null, cl, "PL"]] },
  { label: "2", lines: [["Wages", wAcc, null], ["Accruals", null, wAcc, "SFP"]] },
  { label: "3", lines: [["Prepayments", iPre, null, "SFP"], ["Insurance", null, iPre]] },
  { label: "4", lines: [["Depreciation", depE, null, "PL"], ["Accumulated depreciation", null, depE]] },
  { label: "5", lines: [["Irrecoverable debts", wo, null, "PL"], ["Trade receivables", null, wo]] },
  { label: "6", lines: [["Irrecoverable debts", allowIncE, null], ["Allowance for irrecoverable debts", null, allowIncE]] },
  { label: "7", lines: [["Drawings", own2, null], ["Purchases", null, own2]] },
];
const e = etb({ accounts, adjustments });
const profitCheck = r2(C.sales + cl - (D.inv0 + D.purch - own2) - (D.wages + wAcc) - D.rent - (D.ins - iPre) - D.sundry - depE - wo - allowIncE);
chk(e.profit, profitCheck, 0.001, "etb profit");
const notes = table(
  ["No.", "Adjustment at 31 December"],
  [
    ["1", `Closing inventory was valued at US\\$${fmt(cl)}.`],
    ["2", `Wages owing: US\\$${fmt(wAcc)}.`],
    ["3", `Insurance prepaid: US\\$${fmt(iPre)}.`],
    ["4", "Depreciate the equipment at 10% of cost."],
    ["5", `Write off an irrecoverable debt of US\\$${fmt(wo)}.`],
    ["6", "Make the allowance for irrecoverable debts 4% of the remaining trade receivables."],
    ["7", `The owner took goods costing US\\$${fmt(own2)} for personal use; no entry has been made.`],
  ],
  ["l", "l"],
);
console.error("ETB profit", e.profit, "capital", capital);

const body = `## Introduction

A trial balance is only a draft. When Rudo Moyo, who runs a stationery shop in Gweru, extracts a trial balance at 31 December, it shows what has been paid and received during the year, not what the year really cost or earned. Her staff have worked a week for which they are unpaid, her insurance is paid until March, a customer will never pay and the owner has taken goods home. Each of these must be corrected before profit can be calculated.

This lesson shows how every year-end adjustment changes the profit and the statement of financial position, and how the **extended trial balance** (worksheet) organises the work. You should already know double entry, accruals and prepayments, depreciation and irrecoverable debts from the ledger lessons. The complete layout of the final statements is the next lesson (final accounts of a sole trader).

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (common usage) | Cambridge 9706 |
| --- | --- |
| Income statement; net profit | Statement of profit or loss; profit for the year |
| Bad debts; allowance for doubtful debts | Irrecoverable debts; allowance for irrecoverable debts |
| Debtors; creditors | Trade receivables; trade payables |
| Provision for depreciation | Accumulated depreciation |

Both boards examine every adjustment in this lesson. The extended trial balance is a method, not a required layout: examiners accept any clear working that applies each adjustment twice.
:::

## Key definitions

:::definition{term="Matching (accruals) concept"}
Revenue and the expenses incurred in earning it are recorded in the period to which they belong, whether or not cash has been received or paid in that period.
:::

:::definition{term="Adjustment"}
A year-end entry that corrects the balances of the trial balance so that profit and the statement of financial position reflect the period fairly. Every adjustment has two sides: one in the statement of profit or loss and one in the statement of financial position.
:::

:::definition{term="Extended trial balance"}
A worksheet that adds columns for the adjustments, the statement of profit or loss and the statement of financial position to the trial balance, so that the final statements can be prepared directly from it.
:::

:::definition{term="Goods taken by the owner"}
Inventory the owner takes for personal use. It is recorded at cost as drawings and removed from purchases, because it was not bought to be sold to customers.
:::

## The effect of each adjustment

The rule that prevents most errors is: **use every adjustment twice**. If profit changes, an asset, a liability or the owner's capital must change by the same amount. Study the effects before you attempt the calculations.

${effectTable}

Three further points are examined regularly.

- **Closing inventory** is deducted in the cost of sales and shown as a current asset. It is usually given as a note, not in the trial balance.
- **Goods taken by the owner** reduce purchases (at cost) and increase drawings. They do not reduce inventory, because the closing inventory is counted physically.
- **Errors found after the trial balance** are corrected as adjustments. The most common is a capital item charged as an expense (see the lesson on capital and revenue expenditure): add it back to profit, record the asset and depreciate it. Other errors, such as a suspense account difference, are in the verification lessons.

## Applying adjustments in a calculation

Examiners often give a draft profit and a list of omissions and ask for the corrected profit. Work down the list, ask "does this raise or lower profit?" and keep a running total. The allowance for irrecoverable debts is the trap: the charge is the **change** in the allowance, not the allowance itself, and it is calculated on the receivables remaining after the debt has been written off.

:::worked-solution[Example 1: from draft profit to corrected profit]
Mwenda Traders, Mutare, calculated a draft profit for the year ended 31 December 2025 of US\\$31,500. The following had not been recorded: wages owing US\\$640; insurance prepaid US\\$310; depreciation of equipment costing US\\$28,000 at 10% a year straight line; an irrecoverable debt of US\\$480 to be written off from trade receivables of US\\$18,400, with the allowance for irrecoverable debts to be 5% of the remaining receivables (the allowance was US\\$700 at 1 January); commission received in advance US\\$150; goods costing US\\$220 taken by the owner; and a printer bought for US\\$900 that was charged to office expenses (depreciate at 20% for the year).

1. Trade receivables after the write-off: 18,400 - 480 = 17,920. Allowance required: 5% × 17,920 = 896. Increase in the allowance: 896 - 700 = 196.
2. Depreciation of the equipment: 10% × 28,000 = 2,800. Printer: 20% × 900 = 180.
3. Goods for own use are cost of sales that was never incurred, so profit rises by 220.
4. The printer charged to expenses overstated expenses by 900, so profit rises by 900, then falls by the 180 depreciation.

${bridge}

The two entries that change the statement of financial position as well as profit are:

${ownJ}

${printJ}

Corrected profit for the year: US\\$${fmt(corrected)}. The statement of financial position gains the printer (carrying amount 720), prepaid insurance and loses receivables of 480; capital falls by the drawings of 220.
:::

## The extended trial balance

1. List every account from the trial balance in the first two columns (debit and credit) and check that they agree.
2. Enter each adjustment as a balanced entry in the adjustment columns. Create new accounts (accruals, prepayments, depreciation, closing inventory) where an account does not already exist. Total the adjustment columns: they must agree.
3. Carry each account's adjusted balance across: income and expense accounts into the statement of profit or loss columns, assets, liabilities, capital and drawings into the statement of financial position columns.
4. Total the statement of profit or loss columns. The difference is the profit (or loss) for the year; enter it as the balancing figure in both pairs of columns, on the debit side of the profit and loss columns for a profit, and on the credit side of the financial position columns.
5. Both pairs of columns must now agree. If they do not, one adjustment was entered on one side only.

:::worked-solution[Example 2: an extended trial balance]
Rudo Stationers, Gweru, has the adjustments listed below at 31 December 2025. Its trial balance forms the first two columns of the worksheet (capital of US\\$${fmt(capital)} is the balancing figure).

${notes}

Extended trial balance:

${e.md}

Reading the result: the profit for the year is US\\$${fmt(e.profit)}. Wages become ${fmt(D.wages)} + ${fmt(wAcc)} = ${fmt(D.wages + wAcc)}; insurance becomes ${fmt(D.ins)} - ${fmt(iPre)} = ${fmt(D.ins - iPre)}; purchases become ${fmt(D.purch)} - ${fmt(own2)} = ${fmt(D.purch - own2)}. Capital in the statement of financial position is the opening ${fmt(capital)} plus profit ${fmt(e.profit)} less drawings of ${fmt(D.drawings + own2)} (6,000 + 250). Both pairs of columns agree, so no adjustment has been entered on one side only.
:::

## Matching and prudence in judgement

Adjustments rest on estimates: the useful life behind depreciation, the percentage allowance and the stage at which a debt is judged irrecoverable. Prudence asks for care so that profit and assets are not overstated, while neutrality warns against the opposite error of understating profit to avoid tax. In an *evaluate* question, say that the estimate should be based on evidence (past experience, the asset's condition) and applied consistently.

## Common mistakes

:::mistake{title="Charging the whole allowance"}
Only the increase (or decrease) in the allowance goes to the statement of profit or loss. A fall in the allowance is a credit that increases profit.
:::

:::mistake{title="Calculating the allowance before the write-off"}
Deduct the debt to be written off first, then apply the percentage to the receivables that remain.
:::

:::mistake{title="One-sided adjustments"}
Correcting profit but forgetting the asset or liability leaves the statement of financial position out of balance. Tick each adjustment off in both statements.
:::

:::mistake{title="Deducting goods for own use from inventory"}
Closing inventory is counted, so goods already taken are not in it. Reduce purchases (or cost of sales) and increase drawings.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 2 and Paper 3 and Cambridge Papers 1, 2 and 3 all test adjustments, usually as a draft profit to correct or as notes to a trial balance. For *calculate the corrected profit*, set out a running total with a one-line reason for each item so that follow-through marks are available. For *explain the effect on the statement of financial position*, name the heading (other payables, other receivables, carrying amount) and the direction of the change.
:::

:::exam-tip
When asked to *state* the effect of an error on profit, give the direction and the amount ("profit is overstated by US\\$900"), and mention the second effect on assets or liabilities. For *advise* or *evaluate* questions about estimates, give one reason from the figures and one judgement about whether the estimate is prudent.
:::

## Summary

:::summary
- Each adjustment is used twice: once in the statement of profit or loss and once in the statement of financial position.
- Accruals of expenses, depreciation, irrecoverable debts and income received in advance reduce profit; prepayments, accrued income and goods taken by the owner raise it.
- The allowance for irrecoverable debts is calculated after the write-off, and only its change is charged.
- A capital item charged as an expense is added back to profit, recorded as an asset and depreciated.
- The extended trial balance applies adjustments in balanced entries and carries balances to the two statements; its columns must agree.
- Estimates must be prudent and consistent; examiners reward the reason as well as the figure.
:::
`;

writeLesson(
  "statements/adjustments.md",
  {
    key: "statements.adjustments",
    title: "Year-end adjustments to the draft financial statements",
    summary: "Apply accruals, prepayments, depreciation, irrecoverable debts, closing inventory, goods taken by the owner and error corrections to a trial balance, show their effect on profit and on the statement of financial position, and use an extended trial balance.",
    concepts: ["aacc.statements.adjustments"],
    estimatedMinutes: 55,
    level: "core",
  },
  body,
);
