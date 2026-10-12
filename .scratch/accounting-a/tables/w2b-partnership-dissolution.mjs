// Lesson: partnership.dissolution
import { money, fmt, chk, r2, sum, table } from "../lib.mjs";
import { writeLesson, U, dissolve } from "./w2b-lib.mjs";

// Example 1: two partners, loss on realisation, one asset taken over, discount received
const e1 = dissolve({
  date: "31 Dec 2025",
  partners: [{ name: "Tendai", share: 3, capital: 62000 }, { name: "Rudo", share: 2, capital: 43000 }],
  assets: [
    { name: "Premises", book: 54000, proceeds: 61000 },
    { name: "Equipment", book: 21000, proceeds: 15500 },
    { name: "Inventory", book: 17500, proceeds: 13000 },
    { name: "Trade receivables", book: 12800, proceeds: 12000 },
    { name: "Vehicle", book: 9600, takenBy: "Rudo", value: 8000 },
  ],
  liabilities: [{ name: "Trade payables", book: 14200, paid: 13700 }],
  bank0: 4300, expenses: 1200,
});
chk(e1.result, -6100); chk(e1.resShare[0], -3660); chk(e1.resShare[1], -2440); chk(e1.final[0], 58340); chk(e1.final[1], 32560);
const sofp1 = table(["Assets", U, "Capital and liabilities", U], [
  ["Premises", 54000, "Tendai: capital", 62000], ["Equipment", 21000, "Rudo: capital", 43000], ["Inventory", 17500, "Trade payables", 14200],
  ["Trade receivables", 12800, "", null], ["Vehicle", 9600, "", null], ["Bank", 4300, "", null], ["**Total**", 119200, "**Total**", 119200],
], ["l", "r", "l", "r"]);
chk(54000 + 21000 + 17500 + 12800 + 9600 + 4300, 119200); chk(62000 + 43000 + 14200, 119200);

// Example 2: three partners, partner's loan, a deficiency borne by the others
const e2 = dissolve({
  date: "30 Jun 2026",
  partners: [{ name: "Nyasha", share: 3, capital: 45000 }, { name: "Farai", share: 2, capital: 7000 }, { name: "Chipo", share: 1, capital: 18000, loan: 6000 }],
  assets: [
    { name: "Premises", book: 50000, proceeds: 38000 },
    { name: "Equipment", book: 24000, proceeds: 12000 },
    { name: "Inventory", book: 15000, proceeds: 6500 },
    { name: "Trade receivables", book: 10000, proceeds: 8000 },
  ],
  liabilities: [{ name: "Trade payables", book: 25000, paid: 25000 }],
  bank0: 2000, expenses: 1500,
});
chk(e2.result, -36000); chk(e2.final[0], 23250); chk(e2.final[1], 0); chk(e2.final[2], 10750); chk(e2.defic[1], 5000);

const body = `
## Introduction

Nyasha, Farai and Chipo have run a hardware shop in Gweru for twelve years. Trade has been poor, the lease is ending and the partners agree to close the firm. Someone must sell the assets, pay the creditors and share what is left. The books are closed with a **realisation account**, which finds the profit or loss made on turning the assets into cash, and the partners' capital accounts, which show what each partner finally receives.

Dissolution is a ZIMSEC Form 5 topic and, for Cambridge, A Level only (Paper 3). You should already know the partnership capital and current accounts and how the profit-sharing ratio is applied. Piecemeal realisation (paying out cash in stages) and the rule in Garner v Murray are not examined: in every question here the deficiency of a partner is dealt with as the question states.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **realisation account**, **debtors**, **creditors**, **bank**. Cambridge: **realisation account**, **trade receivables**, **trade payables**, **bank**. The method is identical. Limited liability partnerships are not examined.
:::

## Key definitions

:::definition{term="Dissolution of a partnership"}
The ending of the partnership: the business stops trading, its assets are realised, its liabilities are settled and the partners are paid what is due to them.
:::

:::definition{term="Realisation account"}
A temporary ledger account in which the non-cash assets and the liabilities are collected, together with the cash from selling and settling them and the cost of closing the firm. Its balance is the profit or loss on realisation.
:::

:::definition{term="Deficiency of a partner"}
A debit balance on a partner's capital account after the loss on realisation has been shared. The partner owes the firm that amount.
:::

## The method in five steps

1. **Transfer the assets.** Debit the realisation account and credit each asset account with its book (carrying) amount. The bank balance is **not** transferred; it is needed to pay everyone.
2. **Transfer the liabilities.** Debit each liability account and credit the realisation account with its book amount.
3. **Record the cash side.** Debit bank and credit realisation with the proceeds of assets sold; debit realisation and credit bank with the amounts paid to creditors and the expenses of realisation. A creditor who accepts less than the book amount gives a gain: the realisation account is credited with the full liability but debited with the cash paid.
4. **Assets taken over.** If a partner keeps an asset, debit the partner's capital account and credit realisation with the agreed value. No cash moves.
5. **Share the result.** The balance on the realisation account is shared in the profit-sharing ratio. A profit is credited to the partners' capital accounts; a loss is debited.

Then repay any **loan from a partner** from the bank before the capital accounts are settled: a loan is a liability to that partner, not capital. Finally the bank balance, which must now equal the sum of the capital balances, is paid out and every account closes with a nil balance.

:::keyfact
Check at the end: the bank account must reduce to nil after the final payments. If it does not, an entry has been missed or a figure misread.
:::

## Deficiency of a partner

If a partner's capital account is in debit, the partner is asked to pay in the shortfall. When the question says the partner cannot pay, the loss falls on the other partners and the deficiency is shared **in their profit-sharing ratio** (the question states the basis; use the profit-sharing ratio unless told otherwise). The others' capital accounts are debited and the deficient partner's account is credited, closing it.

:::worked-solution[Example 1: loss on realisation, an asset taken over, discount from a creditor]
Tendai and Rudo share profits and losses 3 : 2 and dissolve their partnership on 31 December 2025. The statement of financial position that day:

${sofp1}

The assets and liabilities were dealt with as follows. Premises sold for ${money(61000)}, equipment for ${money(15500)}, inventory for ${money(13000)}; trade receivables paid ${money(12000)}; Rudo took over the vehicle at an agreed ${money(8000)}; trade payables were settled for ${money(13700)}; the expenses of realisation were ${money(1200)}.

1. Proceeds from sales and collections: 61,000 + 15,500 + 13,000 + 12,000 = 101,500.
2. Debit side of realisation: assets 114,900 + payables settled 13,700 + expenses 1,200 = 129,800.
3. Credit side: payables 14,200 + proceeds 101,500 + vehicle taken over 8,000 = 123,700.
4. Loss on realisation = 129,800 − 123,700 = 6,100, shared 3 : 2: Tendai 3,660; Rudo 2,440.

${e1.realMd}

${e1.capMd}

${e1.bankMd}

The final payments are Tendai ${money(e1.final[0])} and Rudo ${money(e1.final[1])}; the bank account closes at nil. The discount received on payables (500) is not a separate entry: it is inside the balance of the realisation account.
:::

:::worked-solution[Example 2: a partner's loan and a deficiency borne by the others]
Nyasha, Farai and Chipo share profits and losses 3 : 2 : 1. At 30 June 2026 their capital balances were Nyasha ${money(45000)}, Farai ${money(7000)} and Chipo ${money(18000)}; Chipo had also lent the firm ${money(6000)}. The firm had premises (book value 50,000), equipment (24,000), inventory (15,000) and trade receivables (10,000), a bank balance of ${money(2000)} and trade payables of ${money(25000)}. The assets realised ${money(38000)}, ${money(12000)}, ${money(6500)} and ${money(8000)} respectively. Payables were paid in full and expenses of realisation were ${money(1500)}. Farai cannot pay anything in.

1. Debit side: assets 99,000 + payables paid 25,000 + expenses 1,500 = 125,500. Credit side: payables 25,000 + proceeds 64,500 = 89,500. Loss = 36,000.
2. Shares of the loss (3 : 2 : 1): Nyasha 18,000; Farai 12,000; Chipo 6,000.
3. Farai: 7,000 − 12,000 = deficiency of 5,000, borne by Nyasha and Chipo in their ratio 3 : 1: Nyasha 3,750; Chipo 1,250.

${e2.realMd}

${e2.capMd}

${e2.bankMd}

Chipo's loan of 6,000 is repaid first; the remaining bank balance equals the two capital balances still due (23,250 + 10,750). Farai's account closes at nil.
:::

## Reading the result

A loss is normal when assets are sold in a hurry. If the loss is large, a partner whose capital is small may end up owing money. The firm's creditors are always paid before any partner; partners' loans rank before partners' capital.

## Common mistakes

:::mistake{title="Transferring the bank balance to the realisation account"}
Cash is not realised. The bank balance stays in the bank account and is paid out at the end.
:::

:::mistake{title="Using the sale price when transferring assets"}
Assets leave their accounts at **book value**. The sale price is a credit on the realisation account.
:::

:::mistake{title="Treating a partner's loan as capital"}
The loan is repaid in full before the capital accounts are paid. It does not share in the loss.
:::

:::mistake{title="Sharing the loss by capital instead of by the profit-sharing ratio"}
Unless the question says otherwise, the result and any deficiency borne by the others are shared in the profit-sharing ratio.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic. With **prepare**, give all three accounts (realisation, capital, bank) with dates and make the bank close at nil. With **calculate**, show the debit and credit totals of the realisation account before the balancing figure. With **explain** or **advise**, say why the creditors and partner loans are paid before capital.
:::

## Summary

:::summary
- Transfer non-cash assets and liabilities to the realisation account at book value; the bank balance stays.
- Cash from sales is credited to realisation; payments to creditors and expenses are debited; assets taken over are credited and the partner is debited.
- The balance on realisation is shared in the profit-sharing ratio: a profit is credited to capital, a loss debited.
- Repay partners' loans before settling the capital accounts.
- A deficiency of a partner is borne by the others in the profit-sharing ratio when the partner cannot pay.
- The bank account must close at nil.
:::
`;

writeLesson("partnership/dissolution", {
  key: "partnership.dissolution",
  title: "Dissolution of a partnership: the realisation account",
  summary: "Close the books of a partnership that ends: realise the assets, settle creditors and loans, share the profit or loss on realisation and pay the partners.",
  concepts: ["aacc.partnership.dissolution"],
  estimatedMinutes: 50,
}, body);
