// Writes lessons/accounts/cash-flow-statement.md from checked figures.
import { positionStatement, cashFlowIndirect, cashFlowDirect, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

// Example 1 data set
const s24 = positionStatement({ business: "Gokwe Agro Ltd", date: "31 December 2024", nonCurrentAssets: [["Equipment", 120000]], currentAssets: [["Inventories", 31000], ["Trade receivables", 24500], ["Cash", 9800]], currentLiabilities: [["Trade payables", 20300]], nonCurrentLiabilities: [["Bank loan", 50000]], equity: [["Issued shares", 80000], ["Reserves", 35000]] });
const s25 = positionStatement({ business: "Gokwe Agro Ltd", date: "31 December 2025", nonCurrentAssets: [["Equipment", 145000]], currentAssets: [["Inventories", 38000], ["Trade receivables", 29000], ["Cash", 43500]], currentLiabilities: [["Trade payables", 23500]], nonCurrentLiabilities: [["Bank loan", 80000]], equity: [["Issued shares", 80000], ["Reserves", 72000]] });
chk(s24.netAssets, 115000); chk(s25.netAssets, 152000);
chk(120000 + 48000 - 5000 - 18000, 145000);
chk(35000 + (62000 - 11000) - 14000, 72000);
const revenue = 540000, pbt = 62000, dep = 18000, fin = 6000, tax = 11000;
const costs = revenue - pbt - dep - fin;
chk(costs, 454000);
const recvChg = 29000 - 24500, invChg = 38000 - 31000, payChg = 23500 - 20300;
chk(recvChg, 4500); chk(invChg, 7000); chk(payChg, 3200);
const receipts = revenue - recvChg, paid = costs + invChg - payChg;
chk(receipts, 535500); chk(paid, 457800);
const ind = cashFlowIndirect({ business: "Gokwe Agro Ltd (a fictional company)", period: "31 December 2025", profitBeforeTax: pbt, adjustments: [["Depreciation", dep], ["Finance costs added back", fin], ["Increase in inventories", -invChg], ["Increase in trade receivables", -recvChg], ["Increase in trade payables", payChg]], taxPaid: tax, interestPaid: fin, investing: [["Purchase of equipment", -48000], ["Proceeds from sale of old equipment", 5000]], financing: [["New bank loan received", 30000], ["Dividends paid", -14000]], openingCash: 9800, closingCash: 43500 });
chk(ind.operating, 60700); chk(ind.investing, -43000); chk(ind.financing, 16000); chk(ind.net, 33700);
const dir = cashFlowDirect({ business: "Gokwe Agro Ltd (a fictional company)", period: "31 December 2025", receipts: [["Cash received from customers", receipts]], payments: [["Cash paid to suppliers and employees", paid], ["Interest paid", fin], ["Tax paid", tax]], investing: [["Purchase of equipment", -48000], ["Proceeds from sale of old equipment", 5000]], financing: [["New bank loan received", 30000], ["Dividends paid", -14000]], openingCash: 9800, closingCash: 43500 });
chk(dir.operating, 60700);
const cmp = table(["US\\$", "2024", "2025", "Change"], [["Inventories", 31000, 38000, 7000], ["Trade receivables", 24500, 29000, 4500], ["Trade payables", 20300, 23500, 3200], ["Equipment (net book value)", 120000, 145000, 25000], ["Bank loan", 50000, 80000, 30000], ["Cash", 9800, 43500, 33700]]);

// Example 2
const b2 = cashFlowIndirect({ business: "Sibanda Furniture Ltd (a fictional company)", period: "30 June 2026", profitBeforeTax: 40000, adjustments: [["Depreciation", 10000], ["Increase in inventories", -25000], ["Increase in trade receivables", -18000], ["Increase in trade payables", 4000]], taxPaid: 8000, interestPaid: 0, investing: [["Purchase of equipment", -20000]], financing: [], openingCash: 12000, closingCash: -5000 });
chk(b2.operating, 3000); chk(b2.net, -17000);

const body = `
## Introduction

Gokwe Agro Ltd, a fictional company, made a profit of ${D}51,000 after tax in 2025, and the owners were pleased. But the manager of Sibanda Furniture Ltd, another fictional company, reported a profit of ${D}32,000 and then asked the bank for an overdraft. How can a profitable business run short of cash? Profit is not cash: it includes sales not yet paid for, deducts depreciation that costs no cash, and ignores the purchase of equipment, the repayment of loans and the payment of dividends. The **statement of cash flows** shows where cash came from and where it went during the year, and it explains the change in the cash balance.

This lesson is **ZIMSEC detail** (Business Studies, Form 6). It is **not examined in Cambridge 9609**, where the cash flow forecast (a different document) is studied. You should know the statements of profit or loss and financial position, and the idea of working capital.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Statement of cash flows (cash flow statement); operating, investing and financing activities; direct and indirect methods | Not examined; the cash flow **forecast** (future cash) is a different topic |

The statement of cash flows looks at the **past year**; the cash flow forecast looks at the **future**.
:::

## Key definitions

:::definition{term="Statement of cash flows"}
A statement that shows the cash received and paid by a business during a period, grouped into operating, investing and financing activities, and reconciles opening cash with closing cash.
:::

:::definition{term="Operating activities"}
The day-to-day trading activities of the business, such as receipts from customers and payments to suppliers, employees, interest and tax.
:::

:::definition{term="Investing activities"}
The buying and selling of non-current assets and other long-term investments.
:::

:::definition{term="Financing activities"}
Cash raised from or repaid to owners and lenders, such as issuing shares, taking or repaying loans and paying dividends.
:::

## Layout and the two methods

:::keyfact{title="Structure"}
Net cash from **operating** activities + net cash from **investing** activities + net cash from **financing** activities = **net increase (decrease) in cash**.
Opening cash + net increase (decrease) = **closing cash** (which must agree with the statement of financial position).
:::

- **Direct method:** list the actual cash received from customers and cash paid to suppliers and employees, then interest and tax.
- **Indirect method:** start from **profit before tax** and adjust for non-cash items and changes in working capital:
  - **add back** depreciation and finance costs (which are shown separately);
  - **increase** in inventories or receivables is **deducted** (cash tied up);
  - **decrease** in inventories or receivables is **added**;
  - **increase** in payables is **added** (suppliers financed the business); a decrease is deducted;
  - then deduct **interest paid** and **tax paid**.

Both methods give the same net cash from operating activities. Investing and financing sections are the same in both. Other items: purchase of equipment is a cash **outflow** from investing; proceeds of a sale are an **inflow**; a new loan is an **inflow** from financing; **dividends paid** and loan repayments are **outflows**.

### Uses

Managers, lenders and investors use the statement to see whether the business generates enough cash from trading to pay its debts and dividends and to finance its investment, whether it relies on borrowing, and why cash changed when profit did not.

:::worked-solution[Example 1: the same statement by the indirect and direct methods]
**Context.** For Gokwe Agro Ltd (a fictional company) the changes in the statement of financial position between 2024 and 2025 are shown below. Profit before tax was ${D}62,000, depreciation ${D}18,000, finance costs (all paid) ${D}6,000, tax paid ${D}11,000, revenue ${D}540,000. Old equipment was sold for ${D}5,000 (its book value) and new equipment bought for ${D}48,000. A new loan of ${D}30,000 was received and dividends of ${D}14,000 were paid.

${cmp}

${ind.md}

${dir.md}

1. Cash from operating activities is ${D}60,700 by both methods. The direct method shows ${D}535,500 received from customers (revenue 540,000 less the ${D}4,500 increase in receivables).
2. Investing activities used ${D}43,000 and financing provided ${D}16,000.
3. Net increase in cash = 60,700 − 43,000 + 16,000 = ${D}33,700, which agrees with the rise in cash from ${D}9,800 to ${D}43,500 in the statements of financial position.
4. **Interpretation.** The company generated ${D}60,700 from trading, more than its profit after tax (${D}51,000) because depreciation is not a cash cost. It spent ${D}43,000 on equipment, borrowed ${D}30,000 and paid ${D}14,000 in dividends. Cash is strong.
5. **Judgement.** The business is liquid and could repay part of the loan. A lender would note that ${D}30,000 of the cash rise came from borrowing; the real test is whether operating cash stays at this level in future.
:::

:::worked-solution[Example 2: case analysis, profit without cash]
**Context.** Sibanda Furniture Ltd (a fictional company) made a profit before tax of ${D}40,000, with depreciation of ${D}10,000. Inventories rose by ${D}25,000 and receivables by ${D}18,000; payables rose by ${D}4,000. Tax paid was ${D}8,000 and equipment of ${D}20,000 was bought. Cash at the start was ${D}12,000.

${b2.md}

**Point.** A profit of ${D}40,000 before tax has produced only ${D}3,000 of cash from operations.

**Application.** Inventories and receivables absorbed ${D}43,000 of cash, only partly offset by the ${D}10,000 depreciation add-back and ${D}4,000 more owed to suppliers. After tax and the purchase of equipment, cash falls by ${D}17,000, from ${D}12,000 to an overdraft of ${D}5,000.

**Analysis.** The company is growing quickly: it has stocked up and given customers credit, so the profit is tied up in working capital. Without borrowing, it cannot fund the equipment, and it needs an overdraft.

**Judgement.** The business is profitable but short of cash, so the overdraft is a sensible short-term solution. The directors should review credit control and inventory levels, as the cash shortage comes from the working capital and not from losses.
:::

## Common mistakes

:::mistake{title="Adding depreciation as a source of cash"}
Depreciation is added back only because it was deducted in arriving at profit but did not use cash. It is not a source of cash.
:::

:::mistake{title="Getting the sign of working capital changes wrong"}
An **increase** in inventories or receivables is a **deduction** (cash is tied up); an **increase** in payables is an **addition**. Check each sign against the logic.
:::

:::mistake{title="Not agreeing the closing cash"}
The statement must end with the cash figure in the statement of financial position. If it does not, an item or a sign is wrong.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 ask you to *state* the purpose and sections, *prepare* a statement by the direct or indirect method from data and *discuss* what it shows. Lay out the three sections in order, show the adjustments to profit with their signs, check that opening cash plus the net change equals closing cash, and in discussion explain why cash and profit differ and what the lender or manager should do. Cambridge candidates do not need this topic.
:::

## Summary

:::summary
- The statement of cash flows reports the cash received and paid in a period in three sections: operating, investing and financing.
- Net increase (decrease) in cash plus opening cash must equal closing cash in the statement of financial position.
- The direct method lists cash received and paid; the indirect method adjusts profit before tax for non-cash items and working capital.
- Add back depreciation; deduct increases in inventories and receivables; add increases in payables.
- Profit is not cash: a growing profitable business can still run short of cash.
- The statement shows liquidity, reliance on borrowing and the capacity to pay dividends and invest.
:::
`;
lesson("accounts/cash-flow-statement", { key: "accounts.cash-flow-statement", title: "The statement of cash flows (direct and indirect methods)", summary: "The purpose and layout of the statement of cash flows (ZIMSEC), preparing it by the direct and indirect methods from data that agree to the change in cash, and using it to explain why profit and cash differ.", concept: "abus.accounts.cash-flow-statement", minutes: 60 }, body);
