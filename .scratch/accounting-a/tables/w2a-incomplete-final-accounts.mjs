// Lesson generator: incomplete.final-accounts
import { fmt, chk, r2 } from "../lib.mjs";
import { writeLesson, colLedger } from "./w2a-lib.mjs";
import { incompleteModel } from "./w2a-incomplete.mjs";

// ---- Example 1: sole trader
const s1 = {
  biz: "Gift Mhlanga General Dealer",
  openNca: [{ label: "Equipment", cost: 12400, accDep: 3100, rate: 10, added: 1600 }],
  openInv: 6945, closeInv: 7810,
  recv: { open: 2860, close: 3425, cust: 41290, disc: 410, ret: 760, bad: 235 },
  pay: { open: 3970, close: 4325, supp: 25640, disc: 355, ret: 520 },
  cashSales: 8430, bank: { open: 1715, close: 2360 },
  expenses: [
    { label: "Wages", paid: 9870, openAcc: 340, closeAcc: 410 },
    { label: "Rent", paid: 3900, openPre: 300, closePre: 450 },
    { label: "Electricity", paid: 1486, openAcc: 126, closeAcc: 164 },
    { label: "Sundry expenses", paid: 2215 },
  ],
  allowOpen: 150, allowPct: 4,
};
const m1 = incompleteModel(s1);
chk(m1.model.profit, 6339);

// ---- Example 2: partnership
const s2 = {
  biz: "Moyo and Ncube, hardware",
  openNca: [{ label: "Equipment", cost: 18000, accDep: 4500, rate: 10 }, { label: "Delivery van", cost: 22000, accDep: 8800, rate: 20 }],
  openInv: 12480, closeInv: 13915,
  recv: { open: 5230, close: 6120, cust: 96450, disc: 640, ret: 1130, bad: 360 },
  pay: { open: 7410, close: 6985, supp: 68380, disc: 590, ret: 870 },
  cashSales: 14260, bank: { open: 3175 },
  expenses: [
    { label: "Wages", paid: 11420, openAcc: 380, closeAcc: 460 },
    { label: "Rent", paid: 6000, openPre: 500, closePre: 500 },
    { label: "Motor expenses", paid: 2345, closeAcc: 215 },
    { label: "General expenses", paid: 2899 },
  ],
  allowOpen: 220, allowPct: 5,
  partners: [
    { name: "Moyo", capital: 21000, currentOpen: 2410, drawings: 8200, salary: 0, intCapPct: 5, share: 3 },
    { name: "Ncube", capital: 14000, currentOpen: undefined, drawings: 6350, salary: 4000, intCapPct: 5, share: 2 },
  ],
};
const m2 = incompleteModel(s2);
const pr = m2.model.partnerResults;
chk(m2.model.profit, 15835);
const cur = colLedger(
  "Partners' current accounts",
  ["Moyo", "Ncube"],
  [["Drawings", pr[0].drawings, pr[1].drawings]],
  [["Balance b/d", pr[0].currentOpen, pr[1].currentOpen], ["Salary", null, 4000], ["Interest on capital", 1050, 700], ["Share of residual profit", m2.model.appro.calc.lines[0].residualShare, m2.model.appro.calc.lines[1].residualShare]],
  { cdDate: "31 Dec", bdDate: "1 Jan" },
);
chk(cur.closing[0], pr[0].currentClose);
chk(cur.closing[1], pr[1].currentClose);

const body = `## Introduction

Gift Mhlanga's general dealer shop in Masvingo has no ledger. He keeps invoices, bank statements and till rolls, and he can tell you what the shop owned and owed on 1 January. The bank asks for a statement of profit or loss and a statement of financial position for the year. To prepare them you must rebuild each missing figure in turn, then assemble the statements and check that the statement of financial position balances.

This lesson brings together the statement of affairs and the missing-figure techniques. You should already know total accounts, bank and cash summaries, accruals and prepayments, depreciation and the allowance for irrecoverable debts. The same method is used for a partnership; only the final stage, the appropriation account and the partners' accounts, changes.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (common usage) | Cambridge 9706 |
| --- | --- |
| Income statement; net profit | Statement of profit or loss; profit for the year |
| Debtors; creditors; stock | Trade receivables; trade payables; inventory |
| Bad debts; provision for doubtful debts | Irrecoverable debts; allowance for irrecoverable debts |
| Profit and loss appropriation account | Appropriation account |

Both boards set final accounts from incomplete records for a sole trader and for a partnership. The cross-check in this lesson (opening capital from the reconstruction must equal the opening statement of affairs) is a method, not a syllabus term.
:::

## Key definitions

:::definition{term="Incomplete records final accounts"}
Financial statements prepared when the ledger is missing, by rebuilding credit sales, purchases, expenses, drawings and opening capital from the information that survives, and then applying the usual year-end adjustments.
:::

:::definition{term="Reconstruction"}
The step-by-step recovery of missing figures, each shown as a labelled account or calculation, so that the statements can be traced back to the original information.
:::

## A method for any question

1. **Opening statement of affairs.** List the assets and liabilities at the start; the balancing figure is the opening capital (for a partnership, the partners' capital and current accounts).
2. **Total accounts.** Credit sales from the receivables account; credit purchases from the payables account. Add cash sales for total sales.
3. **Bank (and cash) summary.** Enter every known receipt and payment; drawings (or cash lost) is the balancing figure unless the drawings are given.
4. **Expenses for the year.** For each expense: cash paid - opening accrual + closing accrual + opening prepayment - closing prepayment. The same logic applies to income.
5. **Adjustments.** Depreciation, irrecoverable debts written off, the change in the allowance and closing inventory.
6. **Statements.** Build the statement of profit or loss, then the statement of financial position: opening capital + profit - drawings = closing capital, and total assets must equal capital plus liabilities.

:::worked-solution[Example 1: a sole trader]
Gift Mhlanga's information for the year ended 31 December 2025 is below.

- 1 January 2025: equipment at cost US\\$12,400 with accumulated depreciation US\\$3,100; inventory US\\$6,945; trade receivables US\\$2,860 and an allowance for irrecoverable debts of US\\$150; prepaid rent US\\$300; bank US\\$1,715; trade payables US\\$3,970; wages owing US\\$340; electricity owing US\\$126.
- 31 December 2025: inventory US\\$7,810; trade receivables US\\$3,425; trade payables US\\$4,325; bank US\\$2,360; wages owing US\\$410; rent prepaid US\\$450; electricity owing US\\$164.
- Customers paid US\\$41,290; discount allowed US\\$410; returns inwards US\\$760; irrecoverable debts written off US\\$235. Cash sales of US\\$8,430 were banked in full.
- Suppliers were paid US\\$25,640; discount received US\\$355; returns outwards US\\$520.
- Other payments from the bank: wages 9,870; rent 3,900; electricity 1,486; sundry expenses 2,215; and a new freezer for US\\$1,600 (added to equipment). All other withdrawals were drawings.
- Depreciation is 10% of the cost of equipment held at the year end; the allowance is to be 4% of trade receivables.

**Step 1: opening statement of affairs**

${m1.soa.md}

**Step 2: total accounts**

${m1.recvT}

${m1.payT}

Credit sales ${fmt(m1.creditSales)} + cash sales 8,430 give total sales of ${fmt(m1.sales)}; credit purchases are ${fmt(m1.purchases)}.

**Step 3: bank summary**

${m1.bankT}

**Step 4: expenses**

${m1.expTable}

**Step 5: statements**

${m1.model.spl.md}

${m1.model.sfp.md}

Check: opening capital of ${fmt(m1.model.capOpen)} agrees with the opening statement of affairs, and total assets of ${fmt(m1.model.assets)} equal capital of ${fmt(m1.model.capClose)} plus current liabilities of ${fmt(m1.model.clTotal)}. Depreciation is 10% × 14,000 = 1,400; the allowance falls from 150 to 4% × 3,425 = 137.
:::

## Partnerships from incomplete records

The method does not change, but three points need care. The opening statement of affairs gives the partners' total funds, which are split between fixed capital accounts and current accounts; the current account of one partner may be the balancing figure. Drawings of each partner are usually given. After the statement of profit or loss, the profit is shared in the appropriation account (salaries, interest on capital, then the residual in the profit-sharing ratio) and each partner's current account is updated.

:::worked-solution[Example 2: a partnership]
Moyo and Ncube trade in Chinhoyi, sharing profits 3 : 2. Capital accounts are fixed at US\\$21,000 (Moyo) and US\\$14,000 (Ncube). Ncube receives a salary of US\\$4,000 and each partner is allowed 5% interest on capital. Drawings were US\\$8,200 (Moyo) and US\\$6,350 (Ncube). The opening position was: equipment cost 18,000, accumulated depreciation 4,500; delivery van cost 22,000, accumulated depreciation 8,800; inventory 12,480; trade receivables 5,230 with an allowance of 220; prepaid rent 500; bank 3,175; trade payables 7,410; wages owing 380; Moyo's current account 2,410 credit. At the year end: inventory 13,915; trade receivables 6,120; trade payables 6,985; wages owing 460; rent prepaid 500; motor expenses owing 215. Customers paid 96,450; discount allowed 640; returns inwards 1,130; irrecoverable debts 360; cash sales banked 14,260. Suppliers were paid 68,380; discount received 590; returns outwards 870. Payments: wages 11,420; rent 6,000; motor expenses 2,345; general expenses 2,899; drawings as above. Equipment is depreciated at 10% and the van at 20% of cost; the allowance is to be 5% of receivables.

Working: opening current account of Ncube. Opening net assets are ${fmt(m2.soa.capital)}; less capital accounts 35,000 and Moyo's current account 2,410 leaves Ncube's current account of ${fmt(m2.lastCurrentFromSoa)}. Credit sales are ${fmt(m2.creditSales)}, credit purchases ${fmt(m2.purchases)}, the closing bank balance ${fmt(m2.bankClose)}.

${m2.model.spl.md}

${m2.model.appro.md}

${cur.md}

${m2.model.sfp.md}

Profit for the year of ${fmt(m2.model.profit)} is shared after Ncube's salary of 4,000 and interest on capital of 1,050 and 700. The statement of financial position balances at ${fmt(m2.model.assets)}.
:::

## Checking and presenting the answer

Examiners award method marks for each working. Label every figure ("Credit sales: total receivables account"), carry the workings to the statements and finish with a check. A statement of financial position that fails to balance after the workings means a figure was left out: recheck the bank summary, the accruals and the allowance.

## Common mistakes

:::mistake{title="Using cash paid as the expense for the year"}
Adjust each expense for opening and closing accruals and prepayments. Forgetting an opening balance is the most frequent loss of marks.
:::

:::mistake{title="Leaving out the opening accumulated depreciation or the allowance"}
The opening statement of affairs shows non-current assets at carrying amount and receivables after the allowance. The statement of financial position needs the totals to date.
:::

:::mistake{title="Missing a new non-current asset"}
A payment for equipment is not an expense. Add it to the cost of equipment and depreciate it according to the question's rule.
:::

:::mistake{title="Sharing profit before appropriation items"}
In a partnership, deduct salaries and interest on capital from profit first and share only the residual in the ratio.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 2 and Paper 3 and Cambridge Papers 2 and 3 give this as a 15 to 30 mark question. State each working with a heading; mark schemes award a mark per figure (credit sales, purchases, drawings, each expense) and own-figure follow-through marks into the statements. Show the check that capital and liabilities equal assets.
:::

:::exam-tip
For an *evaluate* or *advise* part, point out the unreliability of figures that were estimated or derived as balancing items, and recommend that the owner keeps double-entry records.
:::

## Summary

:::summary
- Start with the opening statement of affairs, then reconstruct credit sales, purchases, expenses and drawings.
- Expense for the year = cash paid adjusted for opening and closing accruals and prepayments.
- A purchase of equipment is added to cost, not expensed; depreciation, irrecoverable debts and the allowance are added as adjustments.
- Closing capital = opening capital + profit - drawings, and total assets must equal capital plus liabilities.
- For a partnership, appropriate the profit (salaries, interest, then the residual) and update the current accounts before the statement of financial position.
- Show every working and finish with a check; balancing items are estimates.
:::
`;

writeLesson(
  "incomplete/final-accounts.md",
  {
    key: "incomplete.final-accounts",
    title: "Final accounts from incomplete records",
    summary: "Rebuild the missing figures and prepare the statement of profit or loss, appropriation account and statement of financial position of a sole trader or partnership from incomplete records.",
    concepts: ["aacc.incomplete.final-accounts"],
    estimatedMinutes: 65,
    level: "core",
  },
  body,
);
