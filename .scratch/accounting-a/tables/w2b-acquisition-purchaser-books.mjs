// Lesson: acquisition.purchaser-books
import { money, fmt, chk, r2, sum, journal, tAccount, statement } from "../lib.mjs";
import { writeLesson, U } from "./w2b-lib.mjs";

// Example 1
const A = { prem: 80000, eq: 26000, inv: 15500, rec: 9500, pay: 11000 };
const na1 = chk(A.prem + A.eq + A.inv + A.rec - A.pay, 120000);
const cash1 = 30000, n1 = 40000, price1 = 1.5, notes1 = 45000;
const cons1 = chk(cash1 + n1 * price1 + notes1, 135000);
const gw1 = chk(cons1 - na1, 15000);
const j1 = journal([
  { date: "1 Jul", lines: [["Premises", A.prem, null], ["Equipment", A.eq, null], ["Inventory", A.inv, null], ["Trade receivables", A.rec, null], ["Goodwill", gw1, null], ["Trade payables", null, A.pay], ["Business purchase account", null, cons1]], narrative: "Assets and liabilities of Mapfumo and Sons taken over at agreed values, with goodwill" },
  { date: "1 Jul", lines: [["Business purchase account", cons1, null], ["Bank", null, cash1], ["Ordinary share capital", null, n1], ["Share premium", null, n1 * (price1 - 1)], ["Loan notes", null, notes1]], narrative: "Settlement of the purchase consideration" },
], { title: "Journal of Masvingo Agro Ltd" });
const bp1 = tAccount("Business purchase account",
  [["1 Jul", "Bank", cash1], ["1 Jul", "Ordinary share capital", n1], ["1 Jul", "Share premium", n1 * (price1 - 1)], ["1 Jul", "Loan notes", notes1]],
  [["1 Jul", "Assets, liabilities and goodwill (journal)", cons1]]);

// Example 2: bargain purchase
const B = { prem: 50000, veh: 14000, inv: 18000, rec: 8000, pay: 20000 };
const na2 = chk(B.prem + B.veh + B.inv + B.rec - B.pay, 70000);
const cash2 = 25000, n2 = 20000, price2 = 1.25, notes2 = 15000;
const cons2 = chk(cash2 + n2 * price2 + notes2, 65000);
const gain2 = chk(na2 - cons2, 5000);
const j2 = journal([
  { date: "31 Oct", lines: [["Premises", B.prem, null], ["Vehicles", B.veh, null], ["Inventory", B.inv, null], ["Trade receivables", B.rec, null], ["Trade payables", null, B.pay], ["Business purchase account", null, cons2], ["Gain on bargain purchase", null, gain2]], narrative: "Net assets of Tatenda Transport taken over at agreed values for less than their value" },
  { date: "31 Oct", lines: [["Business purchase account", cons2, null], ["Bank", null, cash2], ["Ordinary share capital", null, n2], ["Share premium", null, n2 * (price2 - 1)], ["Loan notes", null, notes2]], narrative: "Settlement of the purchase consideration" },
], { title: "Journal of Harare Haulage Ltd" });

// Effect on the statement of financial position (equity and non-current liabilities), example 1
const before = { sc: 200000, sp: 40000, re: 85000, ln: 60000 };
const ext = statement("Extract from the statement of financial position: equity and non-current liabilities", [
  ["Ordinary share capital (US\\$1 shares)", before.sc, n1, before.sc + n1],
  ["Share premium", before.sp, n1 * (price1 - 1), before.sp + n1 * (price1 - 1)],
  ["Retained earnings", before.re, 0, before.re],
  ["Total equity", before.sc + before.sp + before.re, n1 + n1 * (price1 - 1), before.sc + before.sp + before.re + n1 * price1],
  ["Loan notes", before.ln, notes1, before.ln + notes1],
], { cols: [`Before ${U}`, `Change ${U}`, `After ${U}`], checks: [["equity after", 325000 + 60000, 385000]] });

const body = `
## Introduction

Masvingo Agro Ltd has agreed to buy the business of Mapfumo and Sons, a partnership that mills maize in Masvingo. The agreement fixes the values of the assets and liabilities and the price. The accountant of the company must now record the purchase in the company's books so that the assets, the liabilities, the goodwill and the shares and loan notes issued are all shown correctly. The seller's books were covered in the previous lesson; this lesson is the buyer's side.

The topic is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should already know how to find the purchase consideration and goodwill and how a company issues shares at a premium.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **business purchase account**, **debtors**, **creditors**, **loan notes**. Cambridge: **business purchase account**, **trade receivables**, **trade payables**, **loan notes / debentures**. Preference shares as consideration: ZIMSEC only. Consolidated accounts are not examined.
:::

## Key definitions

:::definition{term="Business purchase account"}
A temporary ledger account that is credited with the purchase consideration when a business is taken over and debited when the consideration is settled. It clears to nil.
:::

:::definition{term="Agreed (fair) values"}
The amounts at which the purchaser records the assets and liabilities it takes over; they may differ from the seller's book values.
:::

:::definition{term="Share premium"}
The amount received on issuing a share above its nominal value. It is a non-distributable reserve in equity.
:::

## The two journals

The purchase needs two journal entries.

1. **Take over the business.** Debit each asset at its agreed value and **goodwill** (if the consideration is greater than the net assets); credit each liability taken over and credit the **business purchase account** with the total consideration. If the price is below the net assets, credit **gain on bargain purchase** with the difference.
2. **Settle the consideration.** Debit the business purchase account with the total; credit bank (cash), ordinary share capital (nominal value of shares issued), share premium (the excess over nominal value) and loan notes (a non-current liability).

:::keyfact
Total debits of journal 1 = total credits of journal 1. After journal 2 the business purchase account has no balance.
:::

:::worked-solution[Example 1: a company buys a partnership and issues shares and loan notes]
On 1 July Masvingo Agro Ltd buys Mapfumo and Sons. The agreed values are premises ${money(80000)}, equipment ${money(26000)}, inventory ${money(15500)} and trade receivables ${money(9500)}; the company takes over trade payables of ${money(11000)}. The consideration is ${money(30000)} in cash, 40,000 ordinary shares of US\\$1 issued at US\\$1.50 and ${money(45000)} of loan notes.

1. Net assets at agreed values: 131,000 − 11,000 = 120,000.
2. Consideration: 30,000 + 60,000 + 45,000 = 135,000. Share capital 40,000 and share premium 20,000.
3. Goodwill: 135,000 − 120,000 = 15,000.

${j1}

${bp1}
:::

## Effect on the statement of financial position

The purchase increases the company's assets (including the new intangible asset, goodwill) and its liabilities, and increases share capital and share premium by the shares issued. It does **not** change retained earnings, because no profit has been made yet. The following extract uses the issued capital of Masvingo Agro Ltd before the purchase.

${ext}

Cash falls by 30,000 and the loan notes add 45,000 to non-current liabilities, increasing gearing. Total equity rises by the full value of the shares issued, 60,000.

## A bargain purchase

When the consideration is less than the net assets at agreed values, no goodwill exists. In outline, the buyer re-checks that all the assets and liabilities have been identified and valued fairly. If the difference remains, the gain is recorded in the statement of profit or loss as a gain on bargain purchase.

:::worked-solution[Example 2: a purchase below the value of the net assets]
On 31 October Harare Haulage Ltd buys Tatenda Transport. The agreed values are premises ${money(50000)}, vehicles ${money(14000)}, inventory ${money(18000)} and trade receivables ${money(8000)}, and the company takes over trade payables of ${money(20000)}. It pays ${money(25000)} in cash, issues 20,000 ordinary shares of US\\$1 at US\\$1.25 and gives ${money(15000)} of loan notes.

1. Net assets: 90,000 − 20,000 = 70,000.
2. Consideration: 25,000 + 25,000 + 15,000 = 65,000.
3. The consideration is 5,000 below the net assets: a gain on bargain purchase of 5,000.

${j2}
:::

## Common mistakes

:::mistake{title="Recording assets at the seller's book values"}
The purchaser's books use the agreed values, so goodwill and the asset figures follow the agreement, not the seller's accounts.
:::

:::mistake{title="Crediting the whole share issue to share capital"}
Only the nominal value goes to share capital. The excess is share premium.
:::

:::mistake{title="Debiting goodwill when the consideration is lower"}
If the price is below the net assets, credit a gain on a bargain purchase. Goodwill is always a debit.
:::

:::mistake{title="Forgetting to clear the business purchase account"}
The second journal settles the consideration. A balance left on the account means a share, premium, loan note or cash entry is missing.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic. With **prepare**, give both journals with narratives and a balancing check (debits equal credits, business purchase account cleared). With **calculate**, show the consideration and net assets before the goodwill. With **explain**, link the effect to the statement of financial position: more assets and goodwill, more share capital and premium, more loan notes, less cash.
:::

## Summary

:::summary
- Journal 1 debits the assets at agreed values (and goodwill) and credits the liabilities and the business purchase account.
- Journal 2 clears the business purchase account: cash, share capital, share premium and loan notes.
- Shares are split: nominal value to share capital, the excess to share premium.
- A consideration below the net assets gives a gain on a bargain purchase, not negative goodwill.
- The purchase leaves retained earnings unchanged; equity rises by the value of the shares issued.
- Loan notes and cash affect gearing and liquidity.
:::
`;

writeLesson("acquisition/purchaser-books", {
  key: "acquisition.purchaser-books",
  title: "Recording a business purchase in the purchaser's books",
  summary: "Journalise the purchase of a business by a company: assets at agreed values, goodwill, the business purchase account and settlement by cash, shares and loan notes.",
  concepts: ["aacc.acquisition.purchaser-books"],
  estimatedMinutes: 45,
}, body);
