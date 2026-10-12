// Lesson generator: company.profit-or-loss
import { fmt, chk, check, r2, sum, table } from "../lib.mjs";
import { writeLesson, front } from "./w3a-lib.mjs";
import { coModel } from "./w3a-models.mjs";

export const d1 = {
  name: "Chirundu Hardware Ltd", sc: 60000, genRes: 20000, loan: 50000, loanLabel: "8% loan notes",
  ppe: [{ label: "Land", cost: 90000, accDep: 0, rate: 0 }, { label: "Delivery vehicles", cost: 45000, accDep: 18000, rate: 20, group: "dist" }, { label: "Equipment", cost: 36000, accDep: 10800, rate: 10 }],
  openInv: 18400, closeInv: 21900, sales: 458600, returnsIn: 6200, purchases: 268500, carriageIn: 3100, returnsOut: 4700,
  income: [{ label: "Rent received", tb: 7200, adv: 1800 }, { label: "Discount received", tb: 1450 }],
  expenses: [{ label: "Wages", tb: 61300, acc: 2400 }, { label: "Directors' remuneration", tb: 36000 }, { label: "Delivery expenses", tb: 11800, group: "dist" }, { label: "Insurance", tb: 5600, pre: 900 }, { label: "Electricity", tb: 7350, acc: 650 }, { label: "Loan note interest", tb: 2000, acc: 2000, group: "fin" }, { label: "General expenses", tb: 9850 }, { label: "Discount allowed", tb: 2230 }],
  recv: 42800, writeOff: 1300, allowPct: 5, allowOpen: 1900, retOpen: 30000, cash: 1200, payables: 27400, tax: 14500, intDiv: 10000, toGeneral: 5000,
};
const m = coModel(d1);
chk(m.cos, 263400); chk(m.gp, 189000); chk(m.pbt, 41495); chk(m.profit, 26995);
const cosTable = table(["", "US\\$"], [["Opening inventory", d1.openInv], ["Purchases", d1.purchases], ["Carriage inwards", d1.carriageIn], ["Less: returns outwards", -d1.returnsOut], ["Less: closing inventory", -d1.closeInv], ["**Cost of sales**", m.cos]]);
const wages = m.exps[0].amt, ins = m.exps[3].amt, elec = m.exps[4].amt;
chk(wages, 63700); chk(ins, 4700); chk(elec, 8000);
chk(m.allowNew, 2075); chk(m.irrCharge, 1475);

// Example 2 (tax, other comprehensive income, retained earnings)
const pbt2 = 86400, taxYear = 21600, prevEst = 18200, prevSettled = 18950;
const under = r2(prevSettled - prevEst); chk(under, 750);
const taxExp = r2(taxYear + under); chk(taxExp, 22350);
const profit2 = r2(pbt2 - taxExp); chk(profit2, 64050);
const reval2 = 12000, tci2 = r2(profit2 + reval2); chk(tci2, 76050);
const retOpen2 = 118300, interim2 = 15000, final2 = 20000, trf2 = 10000;
const retClose2 = r2(retOpen2 + profit2 - interim2 - final2 - trf2); chk(retClose2, 137350);
const gm = r2((m.gp / m.revenue) * 100), pm = r2((m.profit / m.revenue) * 100);

const body = `## Introduction

Chirundu Hardware Ltd is owned by shareholders but run by directors, so its owners rely on one document to see how the year went: the **statement of profit or loss**. A company's statement looks like a sole trader's up to gross profit, then it changes. It has directors' pay to show, a finance cost for its loan notes, and an **income tax** charge. Dividends are the shareholders' share of the profit, and they do not appear in it at all.

You already know how to adjust a trial balance for inventory, accruals, prepayments, depreciation and irrecoverable debts. This lesson applies those skills in the format of IAS 1. The statement of changes in equity and the statement of financial position are in the next two lessons.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Statement of profit and loss and other comprehensive income; income statement | Statement of profit or loss (other comprehensive income shown where a revaluation arises) |
| Net profit after tax; retained profits | Profit for the year; retained earnings |
| Debtors; creditors; stock | Trade receivables; trade payables; inventory |
| Proposed dividend | Final dividend declared |

Both boards examine this layout. Company statements for ZIMSEC are for internal use, not for publication.
:::

## Key definitions

:::definition{term="Statement of profit or loss"}
The statement that reports the revenue, expenses and profit of a business for a period. For a company it ends with the profit for the year after income tax.
:::

:::definition{term="Income tax expense"}
The tax charge for the profits of the year, together with any under- or over-provision on the previous year's estimate. The unpaid part at the year end is a current liability.
:::

:::definition{term="Other comprehensive income"}
Gains that IAS 1 requires to be reported outside profit or loss, such as a gain on revaluing land. Profit for the year plus other comprehensive income is total comprehensive income.
:::

:::definition{term="Directors' remuneration"}
Salaries and fees paid to directors for their services. It is an expense of the company, shown in administrative expenses. Dividends paid to a director as a shareholder are not remuneration.
:::

## The layout of a company statement

:::keyfact{title="Order of the statement"}
Revenue, less cost of sales, gives gross profit. Add other income. Deduct distribution costs, administrative expenses and finance costs to reach profit before tax. Deduct income tax expense to reach profit for the year. Other comprehensive income, if any, follows on a second line.
:::

Distribution costs are the costs of getting goods to customers: delivery expenses, depreciation of delivery vehicles and carriage outwards. Administrative expenses cover running the business: wages, directors' remuneration, insurance, electricity, general expenses, depreciation of the equipment and irrecoverable debts. Finance costs are the interest on loan notes, including interest that is owing.

Three items need care.

1. **Income tax.** The charge for the year is given in the question. If last year's estimate was too low, the shortfall (an **under-provision**) is added to this year's charge. If it was too high, the excess (an **over-provision**) is deducted.
2. **Dividends.** An interim or final dividend is a distribution of profit, not an expense. It is deducted in the statement of changes in equity, never in the statement of profit or loss. A final dividend recommended after the year end is not a liability at the year end. It is disclosed in a note.
3. **Transfers to reserves.** Moving profit to a general reserve is not an expense. It changes the reserves within equity.

:::worked-solution[Example 1: statement of profit or loss from a trial balance]
Chirundu Hardware Ltd, Gweru, has the trial balance below at 31 December 2025. The statements are for internal use. Prepare the statement of profit or loss.

${m.tb.md}

${m.notesMd}

Workings.

1. Revenue: sales ${fmt(d1.sales)} - returns inwards ${fmt(d1.returnsIn)} = ${fmt(m.revenue)}.
2. Cost of sales: ${fmt(d1.openInv)} + ${fmt(d1.purchases)} + ${fmt(d1.carriageIn)} - ${fmt(d1.returnsOut)} - ${fmt(d1.closeInv)} = ${fmt(m.cos)}, so gross profit is ${fmt(m.gp)}.
3. Wages ${fmt(61300)} + ${fmt(2400)} = ${fmt(wages)}; insurance ${fmt(5600)} - ${fmt(900)} = ${fmt(ins)}; electricity ${fmt(7350)} + ${fmt(650)} = ${fmt(elec)}; loan note interest 8% × ${fmt(50000)} = ${fmt(4000)}; rent received ${fmt(7200)} - ${fmt(1800)} = ${fmt(5400)}.
4. Depreciation: delivery vehicles 20% × ${fmt(45000)} = ${fmt(9000)}; equipment 10% × ${fmt(36000)} = ${fmt(3600)}. Land is not depreciated.
5. Irrecoverable debts: receivables after the write-off are ${fmt(m.irrNet)}; the allowance is 5% of that, ${fmt(m.allowNew)}; the increase over ${fmt(1900)} is ${fmt(r2(m.allowNew - 1900))}; the charge is ${fmt(1300)} + ${fmt(r2(m.allowNew - 1900))} = ${fmt(m.irrCharge)}.

${cosTable}

${m.spl}

Total comprehensive income equals profit for the year because there is no revaluation.
:::

## Tax, dividends and other comprehensive income

Many questions start from profit before tax and ask you to complete the appropriation of profit. In ZIMSEC papers, a revaluation gain also appears under the title *statement of profit and loss and other comprehensive income*. Cambridge candidates must know that a revaluation gain is reported as other comprehensive income, not as a profit.

:::worked-solution[Example 2: tax, other comprehensive income and retained earnings]
Kariba Fisheries Ltd made a profit before tax of US\\$${fmt(pbt2)} in the year ended 31 December 2025. The directors estimate the tax for the year at US\\$${fmt(taxYear)}. Last year's tax was estimated at US\\$${fmt(prevEst)} but settled at US\\$${fmt(prevSettled)}. Land was revalued upwards by US\\$${fmt(reval2)}. Retained earnings at 1 January 2025 were US\\$${fmt(retOpen2)}. An interim dividend of US\\$${fmt(interim2)} was paid, a final dividend of US\\$${fmt(final2)} was declared before the year end and US\\$${fmt(trf2)} was transferred to the general reserve. Calculate the income tax expense, the profit for the year, total comprehensive income and closing retained earnings.

1. Under-provision: ${fmt(prevSettled)} - ${fmt(prevEst)} = ${fmt(under)}.
2. Income tax expense: ${fmt(taxYear)} + ${fmt(under)} = ${fmt(taxExp)}.
3. Profit for the year: ${fmt(pbt2)} - ${fmt(taxExp)} = ${fmt(profit2)}.
4. Total comprehensive income: ${fmt(profit2)} + ${fmt(reval2)} = ${fmt(tci2)}. The revaluation gain goes to the revaluation reserve, not to retained earnings.
5. Retained earnings: ${fmt(retOpen2)} + ${fmt(profit2)} - ${fmt(interim2)} - ${fmt(final2)} - ${fmt(trf2)} = ${fmt(retClose2)}.

${table(["Statement of profit or loss (extract)", "US\\$"], [["Profit before tax", pbt2], ["Income tax expense", -taxExp], ["**Profit for the year**", profit2], ["Other comprehensive income: revaluation gain on land", reval2], ["**Total comprehensive income**", tci2]])}
:::

## Using the statement

The statement answers questions that shareholders ask. Gross profit as a percentage of revenue shows the margin on trading; profit for the year as a percentage of revenue shows what is left after every cost, tax included. In Example 1 the gross margin is ${gm}% and the profit margin ${pm}%. Interest cover (profit from operations divided by interest) shows whether the loan notes are safe. Dividends, taxes and transfers to reserves are decided after the profit is known, which is why they belong in the statement of changes in equity.

## Common mistakes

:::mistake{title="Deducting dividends in the statement of profit or loss"}
Dividends are distributions of profit to shareholders. They reduce retained earnings in the statement of changes in equity. Only income tax is deducted between profit before tax and profit for the year.
:::

:::mistake{title="Treating directors' remuneration as drawings"}
Directors are employees of the company. Their salaries are an administrative expense. A company has no drawings.
:::

:::mistake{title="Leaving out the under- or over-provision of tax"}
Add an under-provision to this year's tax charge and deduct an over-provision. Ignoring it misstates profit for the year.
:::

:::mistake{title="Putting a revaluation gain into profit"}
A gain on revaluing land is other comprehensive income and goes to the revaluation reserve. It does not increase profit for the year.
:::

:::mistake{title="Depreciating land or leaving out accrued loan interest"}
Land is not depreciated. Loan note interest for the whole year is a finance cost, including any part still owing.
:::

## Exam tips

:::exam-tip
The statement is tested in ZIMSEC Papers 2 and 3 and in Cambridge Papers 1, 2 and 3. For *prepare*, give a three-line heading, show workings for cost of sales and adjusted expenses, and group expenses under IAS 1 headings. For *calculate*, show each step so that own-figure marks can follow. For *explain* why a dividend is not an expense, say it is a distribution of profit to owners.
:::

:::exam-tip
After you finish, check the statement: gross profit minus all expenses and income tax must equal the profit for the year, and that figure must be the one used in the statement of changes in equity. If the question asks you to *comment*, use the profit margin and the proportion of profit paid out as dividends.
:::

## Summary

:::summary
- A company statement runs from revenue and cost of sales to profit before tax, then income tax gives profit for the year.
- Directors' remuneration and depreciation of equipment are administrative expenses; delivery costs and van depreciation are distribution costs; loan note interest is a finance cost.
- Income tax expense = the charge for the year + an under-provision (or - an over-provision) from last year.
- Dividends and transfers to reserves are not expenses; they appear in the statement of changes in equity.
- A revaluation gain is other comprehensive income (ZIMSEC title: statement of profit and loss and other comprehensive income).
:::
`;
writeLesson("company/profit-or-loss.md", front("company.profit-or-loss", "Company statement of profit or loss", "Prepare a company's statement of profit or loss in IAS 1 format, with directors' remuneration, finance costs, income tax, dividends and other comprehensive income.", ["aacc.company.profit-or-loss"], 55), body);
