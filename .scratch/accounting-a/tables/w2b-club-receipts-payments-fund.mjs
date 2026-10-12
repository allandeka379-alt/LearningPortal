// Lesson: club.receipts-payments-fund
import { money, fmt, chk, r2, sum, table, tAccount, statement } from "../lib.mjs";
import { writeLesson, U, subs } from "./w2b-lib.mjs";

// Opening statement of affairs
const open = { equip: 6400, furn: 3200, bank: 1850, cash: 140, arrears: 360, inv: 280, accrued: 190, advance: 150 };
const openAssets = chk(open.equip + open.furn + open.bank + open.cash + open.arrears + open.inv, 12230);
const openLiab = open.accrued + open.advance;
const fund0 = chk(openAssets - openLiab, 11890);
const soa = statement("Statement of affairs of Chinhoyi Netball Club at 1 January 2025", [
  ["Sports equipment", open.equip], ["Clubhouse furniture", open.furn], ["Subscriptions in arrears", open.arrears], ["Inventory of refreshments", open.inv], ["Bank", open.bank], ["Cash in hand", open.cash], ["Total assets", openAssets],
  ["Less liabilities", null], ["Hall hire owing", -open.accrued], ["Subscriptions received in advance", -open.advance], ["Total liabilities", -openLiab], ["**Accumulated fund**", fund0],
], { cols: [U], checks: [["fund", openAssets - openLiab, fund0]] });

// Receipts and payments
const rec = [["Subscriptions", 8460], ["Donations", 500], ["Proceeds of raffle", 1200], ["Bank interest", 60]];
const pay = [["Hall hire", 2400], ["Coach fees", 3000], ["Equipment purchased", 1500], ["Refreshments", 600], ["Administration", 800]];
const open0 = open.bank + open.cash;
const totRec = sum(rec.map((x) => x[1]));
const totPay = sum(pay.map((x) => x[1]));
const closeBC = chk(open0 + totRec - totPay, 3910);
const rp = tAccount("Receipts and payments account for the year ended 31 December 2025",
  [["1 Jan", "Balance b/d (bank and cash)", open0], ...rec.map(([l, a]) => ["", l, a])],
  [...pay.map(([l, a]) => ["", l, a])], { cdDate: "31 Dec", bdDate: "1 Jan 2026" });

// Conversion to income and expenditure
const c = { arrears: 480, advance: 210, accrued: 240, inv: 330 };
const s = subs({ o: { arrears: open.arrears, advance: open.advance }, c: { arrears: c.arrears, advance: c.advance }, received: 8460 });
chk(s.income, 8520);
const hall = chk(2400 - open.accrued + c.accrued, 2450);
const refr = chk(open.inv + 600 - c.inv, 550);
const depEq = chk((open.equip + 1500) * 0.1, 790), depFu = chk(open.furn * 0.1, 320);
const dep = depEq + depFu;
const conv = table(["Item", `Per receipts and payments ${U}`, "Adjustment", `Income or expense ${U}`], [
  ["Subscriptions (income)", 8460, "+ arrears 480 − arrears 360 + advance 150 − advance 210", s.income],
  ["Donations (income)", 500, "none", 500], ["Raffle (income)", 1200, "none", 1200], ["Bank interest (income)", 60, "none", 60],
  ["Hall hire (expense)", 2400, "− owing at start 190 + owing at end 240", hall], ["Coach fees (expense)", 3000, "none", 3000],
  ["Refreshments (expense)", 600, "+ inventory at start 280 − inventory at end 330", refr], ["Administration (expense)", 800, "none", 800],
  ["Equipment purchased", 1500, "capital: not an expense", "nil"], ["Depreciation (expense)", "none", "10% × (6,400 + 1,500) + 10% × 3,200", dep],
], ["l", "r", "l", "r"]);
const incomeTotal = chk(s.income + 500 + 1200 + 60, 10280);
const expTotal = chk(hall + 3000 + refr + 800 + dep, 7910);
const surplus = chk(incomeTotal - expTotal, 2370);
// Closing check
const assetsC = (open.equip + 1500 - depEq) + (open.furn - depFu) + c.inv + c.arrears + closeBC;
const liabC = c.accrued + c.advance;
chk(assetsC - liabC, fund0 + surplus);
const fundC = chk(fund0 + surplus, 14260);

const body = `
## Introduction

Chinhoyi Netball Club has 140 members, a part-time coach and a small hall that it hires for practice. The treasurer, a volunteer, keeps a cash book. At the end of the year the members expect a report, but a club does not set out to make a profit, so its accounts differ from a trader's. The first report is a **receipts and payments account**: a summary of the cash book. A fuller view comes later, with an income and expenditure account. This lesson explains what the receipts and payments account shows (and what it does not), how to find the club's **accumulated fund**, and how to convert the cash summary into the figures for the full accounts.

Clubs and societies are a ZIMSEC Form 5 topic (not-for-profit organisations) and, for Cambridge, A Level only (Paper 3). The receipts and payments account is Cambridge detail; ZIMSEC asks mainly for the accumulated fund. You should know double entry and accruals and prepayments.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **not-for-profit (non-profit making) organisations**, **accumulated fund**, **income and expenditure account**. Cambridge: **clubs and societies**, **accumulated fund**, **income and expenditure account**, **receipts and payments account**. A surplus is a surplus of income over expenditure; a loss is a deficit.
:::

## Key definitions

:::definition{term="Receipts and payments account"}
A summary of the cash book for a period: all money received on the debit side and all money paid on the credit side, with the opening and closing balances of cash and bank.
:::

:::definition{term="Accumulated fund"}
The net assets of the club at a point in time: its assets less its liabilities. It is the club's equivalent of the owner's capital, and grows with each surplus.
:::

:::definition{term="Statement of affairs"}
A list of the assets and liabilities of the club at a date, used to calculate the accumulated fund when there is no ledger balance for it.
:::

## What the receipts and payments account shows

- It records **cash movements only**: money received and money paid in the period, whether the item relates to this year or not.
- It includes **capital items** (equipment bought) and **revenue items** together, and does not separate them.
- It does not show accruals, prepayments, depreciation, inventories, arrears or fixed assets, so it gives no surplus or deficit and no measure of the club's wealth.

For these reasons a club also prepares an **income and expenditure account**, which is the club's version of a statement of profit or loss.

## The accumulated fund

When the opening accumulated fund is not given, it is found from a statement of affairs at the start of the year: **accumulated fund = assets − liabilities**. The assets include the bank and cash, and all equipment, inventories and subscriptions in arrears; the liabilities include accrued expenses and subscriptions received in advance.

:::worked-solution[Example 1: finding the opening accumulated fund]
At 1 January 2025 Chinhoyi Netball Club owned sports equipment ${money(open.equip)}, clubhouse furniture ${money(open.furn)}, bank ${money(open.bank)}, cash ${money(open.cash)}, subscriptions in arrears ${money(open.arrears)} and refreshment inventory ${money(open.inv)}. It owed ${money(open.accrued)} for hall hire and had received subscriptions of ${money(open.advance)} in advance.

1. Total assets: 6,400 + 3,200 + 360 + 280 + 1,850 + 140 = 12,230.
2. Total liabilities: 190 + 150 = 340.
3. Accumulated fund: 12,230 − 340 = 11,890.

${soa}
:::

## From cash to income and expenditure

Each item in the receipts and payments account is adjusted to the amount that belongs to the year:

- **Income** = cash received + closing arrears − opening arrears + opening advance − closing advance (subscriptions).
- **Expense** = cash paid − opening accrual + closing accrual (and the opposite for prepayments).
- **Capital items** such as equipment bought are not expenses; instead depreciation is charged.
- **Inventories** used = opening inventory + cash paid − closing inventory.

:::worked-solution[Example 2: converting a receipts and payments account]
During 2025 the club's cash book summarised as follows (the opening bank and cash were 1,850 + 140 = 1,990).

${rp}

At 31 December 2025: subscriptions in arrears ${money(c.arrears)} and in advance ${money(c.advance)}; hall hire owing ${money(c.accrued)}; refreshment inventory ${money(c.inv)}. Equipment is depreciated at 10% on the carrying amount at the end before depreciation, and furniture at 10% of ${money(open.furn)}.

1. Convert each item.

${conv}

2. Total income 8,520 + 500 + 1,200 + 60 = 10,280. Total expenditure 2,450 + 3,000 + 550 + 800 + 1,110 = 7,910. Surplus 2,370.
3. Check: closing assets are equipment 7,110, furniture 2,880, inventory 330, arrears 480 and bank and cash 3,910 = 14,710; liabilities are hall hire 240 and subscriptions in advance 210 = 450. Net assets 14,260 = opening fund 11,890 + surplus 2,370.

The accumulated fund at 31 December 2025 is ${money(fundC)}.
:::

## Why a club also needs the full accounts

The receipts and payments account tells members where the cash went. The income and expenditure account tells them whether the activities of the year were covered by the income of the year, and the statement of financial position shows what the club owns and owes. Members, donors and any sponsor need these to judge whether the club is run well.

## Common mistakes

:::mistake{title="Treating the receipts and payments account as a profit statement"}
It has no accruals, prepayments or depreciation. Its closing balance is cash, not a surplus.
:::

:::mistake{title="Including equipment purchases as expenses"}
Equipment bought is a capital item. Only the depreciation is an expense in the income and expenditure account.
:::

:::mistake{title="Leaving out the liabilities when finding the accumulated fund"}
The fund is assets less liabilities. Accruals and subscriptions received in advance are liabilities.
:::

:::mistake{title="Using the closing balances of the cash book as the accumulated fund"}
The fund includes all assets, not just cash.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic. With **calculate** the accumulated fund, set out the statement of affairs with all assets and all liabilities. With **prepare** a receipts and payments account, put the opening balance on the debit side and bring down the closing balance. With **explain**, say that cash accounts ignore accruals and capital items.
:::

## Summary

:::summary
- A receipts and payments account is a summary of the cash book; it shows cash only.
- It does not show accruals, prepayments, depreciation, inventory, arrears or fixed assets.
- Accumulated fund = assets − liabilities at a date (from a statement of affairs).
- Convert cash items to the year's income and expenditure by adjusting for opening and closing accruals, prepayments, arrears and advances.
- Capital items are not expenses; depreciation is charged instead.
- Closing accumulated fund = opening fund + surplus (or − deficit).
:::
`;

writeLesson("club/receipts-payments-fund", {
  key: "club.receipts-payments-fund",
  title: "Receipts and payments account and the accumulated fund",
  summary: "Prepare and interpret a club's receipts and payments account, calculate the accumulated fund from a statement of affairs and convert cash figures to income and expenditure.",
  concepts: ["aacc.club.receipts-payments-fund"],
  estimatedMinutes: 50,
}, body);
