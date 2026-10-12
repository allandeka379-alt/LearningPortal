// Lesson generator: company.financial-position
import { fmt, chk, check, r2, sum, table, ratios } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";
import { coModel } from "./w3a-models.mjs";

const d = {
  name: "Kwekwe Steel Fabricators Ltd", sc: 60000, prem: 30000, genRes: 25000, loan: 90000, loanLabel: "9% loan notes",
  ppe: [{ label: "Factory premises", cost: 210000, accDep: 42000, rate: 2, group: "admin" }, { label: "Machinery", cost: 124000, accDep: 49600, rate: 10 }, { label: "Delivery vehicles", cost: 56000, accDep: 28000, rate: 25, group: "dist" }],
  openInv: 38400, closeInv: 41250, sales: 724300, returnsIn: 9400, purchases: 372600, carriageIn: 5150, returnsOut: 6320,
  income: [{ label: "Discount received", tb: 3150 }],
  expenses: [{ label: "Wages", tb: 118400, acc: 4600 }, { label: "Directors' remuneration", tb: 54000 }, { label: "Delivery expenses", tb: 16900, group: "dist" }, { label: "Insurance", tb: 9300, pre: 1550 }, { label: "Electricity", tb: 15750, acc: 1380 }, { label: "Loan note interest", tb: 4050, acc: 4050, group: "fin" }, { label: "General expenses", tb: 21300 }],
  recv: 62400, writeOff: 2100, allowPct: 5, allowOpen: 2650, retOpen: 14000, cash: 2200, payables: 41700, tax: 13800, intDiv: 12000, finalDiv: 18000, toGeneral: 6000,
};
export const m = coModel(d);
chk(m.bank, -15130); chk(m.overdraft, 15130); chk(m.profit, 54425); chk(m.assets, 342085);
const ppeRows = m.nca.map((n) => [n.label, n.cost, n.accClose, n.cv]);
const ppeTable = table(["Property, plant and equipment", "Cost US\\$", "Accumulated depreciation US\\$", "Carrying amount US\\$"], [...ppeRows, ["**Total**", sum(m.nca.map((n) => n.cost)), sum(m.nca.map((n) => n.accClose)), m.ppeCv]]);
const cr = ratios.current(m.ca, m.cl);

// Example 2: corrections
const draft = { assets: 412600, equity: 318400, liab: 94200 };
check("draft", draft.assets, draft.equity + draft.liab);
const fixes = [
  ["Inventory included damaged goods at cost US\\$4,800; their net realisable value is US\\$1,500", -3300, -3300, 0, "Profit and inventory fall by 3,300"],
  ["Income tax for the year, US\\$11,200, was not provided", 0, -11200, 11200, "Profit falls by 11,200; tax payable rises"],
  ["A final dividend of US\\$9,000 was declared before the year end but not recorded", 0, -9000, 9000, "Retained earnings fall; dividends payable rises"],
  ["Depreciation of US\\$2,400 on a machine was omitted", -2400, -2400, 0, "Profit and carrying amount fall by 2,400"],
];
const cor = { assets: r2(draft.assets + sum(fixes.map((f) => f[1]))), equity: r2(draft.equity + sum(fixes.map((f) => f[2]))), liab: r2(draft.liab + sum(fixes.map((f) => f[3]))) };
check("corrected balances", cor.assets, cor.equity + cor.liab);
chk(cor.assets, 406900); chk(cor.equity, 292500); chk(cor.liab, 114400);
const fixTable = table(["Correction", "Assets US\\$", "Equity US\\$", "Liabilities US\\$"], [["Draft statement", draft.assets, draft.equity, draft.liab], ...fixes.map((f, i) => [`(${i + 1}) ${f[0]}`, f[1], f[2], f[3]]), ["**Corrected statement**", cor.assets, cor.equity, cor.liab]]);

const body = `## Introduction

Kwekwe Steel Fabricators Ltd must show its bank, its suppliers and its shareholders what it owns and owes at the end of the year. The **statement of financial position** does this at one date. It is the second of the two main statements, and it ties all the adjustments together. If a figure was missed in the statement of profit or loss, it usually shows up as a statement that does not balance.

You already know how to prepare the statement of a sole trader. A company's statement has the same logic, but it lists **equity** by component, adds loan notes, income tax payable and dividends payable, and may include a bank overdraft. For a company, the owner's capital is replaced by share capital and reserves.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Statement of financial position; balance sheet | Statement of financial position |
| Net book value | Carrying amount |
| Stock; debtors; creditors | Inventory; trade receivables; trade payables |
| Capital and reserves; shareholders' funds | Equity |
| Debentures; loan notes | Loan notes (non-current liabilities) |
| Proposed dividend | Final dividend declared (a liability only if declared by the year end) |
:::

## Key definitions

:::definition{term="Statement of financial position"}
A statement that lists the assets, liabilities and equity of a business at a stated date. Total assets equal total equity plus total liabilities.
:::

:::definition{term="Non-current liability"}
An obligation that is not due within twelve months of the reporting date, such as loan notes repayable in five years.
:::

:::definition{term="Current liability"}
An obligation due within twelve months of the reporting date, or one that the business expects to settle in its normal operating cycle: trade payables, accruals, income tax payable, dividends payable and a bank overdraft.
:::

:::definition{term="Carrying amount"}
Cost, or revalued amount, of a non-current asset less accumulated depreciation.
:::

## The IAS 1 layout

:::keyfact{title="Order of the statement"}
1. **Non-current assets:** property, plant and equipment and intangible assets, at carrying amount.
2. **Current assets:** inventory, trade receivables (less the allowance), other receivables such as prepayments, then cash and cash equivalents.
3. **Equity:** share capital, share premium, revaluation reserve, other reserves, retained earnings.
4. **Non-current liabilities:** loan notes and long-term borrowing.
5. **Current liabilities:** trade payables, accruals, dividends payable, income tax payable and the bank overdraft.
:::

A debit balance in the bank account is an asset; a credit balance is an overdraft, which is a current liability. Interest owing is an accrual. Income tax for the year that has not been paid is a current liability. A dividend counts as a liability only if the company declared it before the year end. A dividend proposed afterwards is a note. The statement of changes in equity gives the reserve balances; the retained earnings figure is the same one.

:::worked-solution[Example 1: statement of financial position from a trial balance]
Kwekwe Steel Fabricators Ltd has the trial balance below at 31 December 2025. The statements are for internal use. Prepare the statement of financial position.

${m.tb.md}

${m.notesMd}

Workings.

1. Depreciation: premises 2% × ${fmt(210000)} = ${fmt(m.nca[0].charge)}; machinery 10% × ${fmt(124000)} = ${fmt(m.nca[1].charge)}; vehicles 25% × ${fmt(56000)} = ${fmt(m.nca[2].charge)}.
2. Receivables: ${fmt(62400)} - ${fmt(2100)} = ${fmt(m.irrNet)}; allowance 5% = ${fmt(m.allowNew)}; net receivables ${fmt(m.recvNet)}.
3. Other receivables: insurance prepaid ${fmt(m.prepay)}. Other payables: wages ${fmt(4600)} + electricity ${fmt(1380)} + loan note interest ${fmt(4050)} = ${fmt(m.otherPay)}.
4. Profit for the year ${fmt(m.profit)} (profit before tax ${fmt(m.pbt)} less tax ${fmt(d.tax)}). Retained earnings: ${fmt(m.retOpen)} + ${fmt(m.profit)} - interim dividend ${fmt(d.intDiv)} - final dividend ${fmt(d.finalDiv)} - transfer ${fmt(d.toGeneral)} = ${fmt(m.retClose)}.
5. The trial balance shows a bank overdraft of ${fmt(m.overdraft)}, a current liability. Cash in hand is ${fmt(d.cash)}.

${ppeTable}

${m.sofp}

Check: total assets ${fmt(m.assets)} = equity ${fmt(m.equity)} + non-current liabilities ${fmt(m.ncl)} + current liabilities ${fmt(m.cl)}. The current ratio is ${fmt(m.ca)} ÷ ${fmt(m.cl)} = ${fmt(r2(cr))} : 1.
:::

## Correcting a draft statement

Examiners often give a draft statement and a list of omissions. List each correction against assets, equity and liabilities, then check that the corrected statement still balances. A correction that affects profit changes retained earnings. A dividend declared affects retained earnings but not profit.

:::worked-solution[Example 2: correcting a draft statement of financial position]
The draft statement of financial position of Zvishavane Cement Ltd showed total assets of US\\$${fmt(draft.assets)}, equity of US\\$${fmt(draft.equity)} and liabilities of US\\$${fmt(draft.liab)}. Four items were found at the year end (below). Prepare the corrected totals.

${fixTable}

Check: corrected assets ${fmt(cor.assets)} = equity ${fmt(cor.equity)} + liabilities ${fmt(cor.liab)}. Profit for the year falls by ${fmt(3300 + 11200 + 2400)}; the dividend reduces retained earnings but is not a charge against profit.
:::

## Interpreting the statement

Subtotals matter. Working capital is current assets less current liabilities: in Example 1 it is ${fmt(m.ca)} - ${fmt(m.cl)}, a deficit of ${fmt(r2(m.cl - m.ca))}. The company is relying on its overdraft and its suppliers to finance trading, and the current ratio of ${fmt(r2(cr))} : 1 shows it. The loan notes are long-term, which is a strength, but interest must still be paid. Shareholders also look at equity: the proportion of reserves to share capital tells them how much of their stake has been built from profit.

## Common mistakes

:::mistake{title="Showing the overdraft as a negative asset"}
A credit balance at the bank is a current liability. Do not net it against cash in hand.
:::

:::mistake{title="Including a dividend recommended after the year end"}
Only a dividend declared by the year end is a liability. A later proposal is a note.
:::

:::mistake{title="Forgetting income tax payable"}
The tax charge in the statement of profit or loss is a current liability until it is paid.
:::

:::mistake{title="Using cost instead of carrying amount"}
Property, plant and equipment is shown after deducting accumulated depreciation, including this year's charge.
:::

:::mistake{title="Leaving accrued loan note interest out of liabilities"}
Interest owing is a current liability under other payables. The loan notes themselves stay non-current.
:::

## Exam tips

:::exam-tip
Tested in ZIMSEC Papers 2 and 3 and in Cambridge Papers 1, 2 and 3. For *prepare*, use a three-line heading, show subtotals for non-current assets, current assets, equity and each class of liability, and end with total assets equal to total equity and liabilities. For *calculate* working capital or the current ratio, show current assets and current liabilities separately.
:::

:::exam-tip
If the statement does not balance, check: the allowance deducted from receivables, accruals and prepayments on the right side, the tax payable, dividends declared and the retained earnings figure taken from the statement of changes in equity.
:::

## Summary

:::summary
- The statement lists non-current assets, current assets, equity, non-current liabilities and current liabilities at one date.
- Equity consists of share capital, share premium, reserves and retained earnings.
- A bank overdraft, income tax payable, accruals and a declared dividend are current liabilities; loan notes repayable after a year are non-current.
- Total assets equal total equity plus total liabilities; a correction to profit changes retained earnings.
- Working capital and the current ratio come from the subtotals of current assets and current liabilities.
:::
`;
writeLesson("company/financial-position.md", front("company.financial-position", "Company statement of financial position", "Prepare a company's statement of financial position in IAS 1 format, including equity, loan notes, tax, dividends and an overdraft, and correct a draft statement.", ["aacc.company.financial-position"], 60), body);
