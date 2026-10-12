// Lesson: acquisition.merger-statements
import { money, fmt, chk, r2, sum, statement, table } from "../lib.mjs";
import { writeLesson, U } from "./w2b-lib.mjs";

// Example 1: two sole traders merge into a partnership
const T = { prem: [45000, 52000], eq: [12000, 10000], veh: [0, 0], inv: [8000, 7000], rec: [5500, 5000], bank: [2500, 2500], pay: [7000, 7000] }; // [book, agreed]
const N = { prem: [0, 0], eq: [18000, 16000], veh: [15000, 15000], inv: [11000, 11000], rec: [6500, 6500], bank: [1000, 1000], pay: [9500, 9500] };
const net = (X, i) => X.prem[i] + X.eq[i] + X.veh[i] + X.inv[i] + X.rec[i] + X.bank[i] - X.pay[i];
const tBook = chk(net(T, 0), 66000), tAgreed = chk(net(T, 1), 69500), nBook = chk(net(N, 0), 42000), nAgreed = chk(net(N, 1), 40000);
const item = (label, k) => [label, T[k][1], N[k][1], T[k][1] + N[k][1]];
const totAssets = (X) => X.prem[1] + X.eq[1] + X.veh[1] + X.inv[1] + X.rec[1] + X.bank[1];
const allAssets = totAssets(T) + totAssets(N);
const allPay = T.pay[1] + N.pay[1];
const sofp1 = statement("Opening statement of financial position of Banda and Dube at 1 January 2026", [
  ["Non-current assets", null, null, null],
  item("Premises", "prem"), item("Equipment", "eq"), item("Vehicles", "veh"),
  ["Current assets", null, null, null],
  item("Inventory", "inv"), item("Trade receivables", "rec"), item("Bank", "bank"),
  ["Total assets", totAssets(T), totAssets(N), allAssets],
  ["Current liabilities: trade payables", T.pay[1], N.pay[1], allPay],
  ["Net assets", tAgreed, nAgreed, tAgreed + nAgreed],
  ["Capital: Tendai Banda", tAgreed, null, tAgreed],
  ["Capital: Nyasha Dube", null, nAgreed, nAgreed],
  ["Total capital", tAgreed, nAgreed, tAgreed + nAgreed],
], { cols: ["Tendai " + U, "Nyasha " + U, "Partnership " + U], checks: [["net assets", allAssets - allPay, tAgreed + nAgreed], ["T", totAssets(T) - T.pay[1], tAgreed], ["N", totAssets(N) - N.pay[1], nAgreed]] });
const reval = table(["", `Tendai ${U}`, `Nyasha ${U}`], [
  ["Capital at book values", tBook, nBook],
  ["Premises revalued (45,000 → 52,000)", 7000, null], ["Equipment revalued", -2000, -2000], ["Inventory written down (slow-moving)", -1000, null], ["Allowance for irrecoverable debts", -500, null],
  ["**Capital in the partnership**", `**${fmt(tAgreed)}**`, `**${fmt(nAgreed)}**`],
], ["l", "r", "r"]);
chk(tBook + 7000 - 2000 - 1000 - 500, tAgreed); chk(nBook - 2000, nAgreed);

// Example 2: a company absorbs a partnership
const co = { prem: 120000, eq: 45000, inv: 30000, rec: 22000, bank: 28000, pay: 40000, sc: 100000, sp: 20000, re: 85000 };
const pa = { prem: 60000, eq: 18000, inv: 12000, rec: 8000, pay: 11000 };
chk(co.prem + co.eq + co.inv + co.rec + co.bank, 245000); chk(co.sc + co.sp + co.re + co.pay, 245000);
const na = chk(pa.prem + pa.eq + pa.inv + pa.rec - pa.pay, 87000);
const nShares = 40000, price = 1.8, notes = 22000;
const cons = chk(nShares * price + notes, 94000);
const gw = chk(cons - na, 7000);
const aft = {
  prem: co.prem + pa.prem, eq: co.eq + pa.eq, inv: co.inv + pa.inv, rec: co.rec + pa.rec, bank: co.bank, pay: co.pay + pa.pay,
  sc: co.sc + nShares, sp: co.sp + nShares * (price - 1), re: co.re,
};
const totalAft = aft.prem + aft.eq + gw + aft.inv + aft.rec + aft.bank;
const totEqLiab = aft.sc + aft.sp + aft.re + notes + aft.pay;
chk(totalAft, 350000); chk(totEqLiab, 350000);
const col3 = (label, bef, ch) => [label, bef, ch, bef + ch];
const sofp2 = statement("Statement of financial position of Gweru Plastics Ltd before and after the acquisition", [
  col3("Premises", co.prem, pa.prem), col3("Equipment", co.eq, pa.eq), col3("Goodwill", 0, gw),
  col3("Inventory", co.inv, pa.inv), col3("Trade receivables", co.rec, pa.rec), col3("Bank", co.bank, 0),
  ["**Total assets**", 245000, totalAft - 245000, totalAft],
  col3("Ordinary share capital (US\\$1 shares)", co.sc, nShares), col3("Share premium", co.sp, nShares * (price - 1)), col3("Retained earnings", co.re, 0),
  col3("Loan notes", 0, notes), col3("Trade payables", co.pay, pa.pay),
  ["**Total equity and liabilities**", 245000, totEqLiab - 245000, totEqLiab],
], { cols: [`Before ${U}`, `Change ${U}`, `After ${U}`], checks: [["total assets", totalAft, totEqLiab]] });
chk(98000 + gw, totalAft - 245000);

const body = `
## Introduction

Tendai Banda sells hardware and Nyasha Dube supplies paint, both from small shops in Chinhoyi. They decide to join forces: one shop, one set of suppliers, shared staff and shared rent. This is a **merger**. Elsewhere, a growing company such as Gweru Plastics Ltd may prefer to **absorb** a small partnership by issuing it shares. In both cases the first task is to prepare the **opening statement of financial position** of the combined business and, after trading begins, to show profits that belong to the new owners.

This lesson is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). Consolidated accounts are not examined. You should already know the partnership capital accounts and the purchase of a business by a company.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **merger**, **takeover**, **debtors**, **creditors**, **income statement**. Cambridge: **merger**, **acquisition**, **trade receivables**, **trade payables**, **statement of profit or loss**. The advantages and disadvantages of mergers and acquisitions are Cambridge detail; ZIMSEC asks mainly for the statements.
:::

## Key definitions

:::definition{term="Merger"}
Two or more businesses join to form a new business or partnership, usually by agreement, with the owners of each becoming owners of the combined business.
:::

:::definition{term="Acquisition (takeover)"}
One business buys another, normally by paying cash, shares or loan notes, so that the buyer controls the assets and operations of the other.
:::

:::definition{term="Opening statement of financial position"}
The statement that shows the assets, liabilities and capital of the new or enlarged business on the first day after the merger or purchase, at agreed values.
:::

## Merging sole traders into a partnership

Each trader keeps an **agreed value** for each contribution: premises are revalued to market value, obsolete inventory is written down and doubtful receivables are reduced. Each trader's capital in the new partnership is the **net assets at agreed values**. The revaluation gain or loss belongs to the contributing owner. The new statement adds the agreed values of the two sets of assets and liabilities, line by line.

:::worked-solution[Example 1: two sole traders form a partnership]
On 1 January 2026 Tendai Banda and Nyasha Dube combine their businesses as Banda and Dube. Tendai's book values are premises ${money(45000)}, equipment ${money(12000)}, inventory ${money(8000)}, trade receivables ${money(5500)}, bank ${money(2500)} and trade payables ${money(7000)}. Nyasha's are equipment ${money(18000)}, vehicles ${money(15000)}, inventory ${money(11000)}, trade receivables ${money(6500)}, bank ${money(1000)} and trade payables ${money(9500)}. They agree the following: Tendai's premises are worth ${money(52000)}, his equipment ${money(10000)}, his inventory ${money(7000)} and his receivables ${money(5000)} (an allowance of 500); Nyasha's equipment is worth ${money(16000)}. All other items are accepted at book value.

1. Tendai's capital at book value 66,000 becomes 69,500 after the revaluations. Nyasha's 42,000 becomes 40,000.

${reval}

2. The opening statement adds the agreed values.

${sofp1}

Capital: Tendai ${money(69500)} and Nyasha ${money(40000)}. The partnership agreement, not the capital figures, decides how profits are shared.
:::

## A company absorbing a partnership

A company that buys a partnership records the assets taken over at agreed values and issues shares and loan notes (see the previous lesson). The effect is shown by adding the acquired items to the company's own statement of financial position, line by line, and recording goodwill and the new share capital, premium and loan notes.

:::worked-solution[Example 2: Gweru Plastics Ltd absorbs Moyo and Sons]
Gweru Plastics Ltd's statement of financial position before the purchase shows premises ${money(120000)}, equipment ${money(45000)}, inventory ${money(30000)}, trade receivables ${money(22000)}, bank ${money(28000)}; ordinary share capital ${money(100000)}, share premium ${money(20000)}, retained earnings ${money(85000)} and trade payables ${money(40000)}. It buys Moyo and Sons: premises ${money(60000)}, equipment ${money(18000)}, inventory ${money(12000)} and trade receivables ${money(8000)} at agreed values, taking over trade payables of ${money(11000)}. The price is 40,000 ordinary shares of US\\$1 issued at US\\$1.80 and ${money(22000)} of loan notes. The partnership's bank balance is not taken over.

1. Net assets acquired: 98,000 − 11,000 = 87,000.
2. Consideration: 40,000 × 1.80 + 22,000 = 94,000.
3. Goodwill: 94,000 − 87,000 = 7,000.
4. Share capital rises by 40,000; share premium by 32,000.

${sofp2}

Total assets rise by 105,000 (assets taken over 98,000 plus goodwill 7,000), financed by shares 72,000, loan notes 22,000 and the payables taken over 11,000.
:::

## Profits after the merger

Only profits earned **after** the date of the merger or purchase belong to the new business. A statement of profit or loss for the first year of a company that has acquired a business therefore includes the trading results of the acquired business from the acquisition date only; profit before that date is part of the vendor's result. A new partnership prepares its first accounts from the day it begins trading.

## Advantages and disadvantages (Cambridge)

| | Merger or acquisition | Staying separate |
| --- | --- | --- |
| Advantages | Larger market share and customer base; economies of scale in buying and administration; combined skills; removal of a competitor | Control stays with the existing owners; no integration problems; no price paid for goodwill |
| Disadvantages | Price may be too high; staff may leave or resist change; different ways of working are hard to combine; borrowing or share dilution may be needed | Higher unit costs; limited growth; competitors may become stronger |

## Common mistakes

:::mistake{title="Adding book values instead of agreed values"}
The combined statement uses the values the traders agreed, so the capital of each partner changes when assets are revalued.
:::

:::mistake{title="Taking over the bank balance when it is excluded"}
Add only the assets and liabilities named in the agreement.
:::

:::mistake{title="Forgetting goodwill in the company's new statement"}
When the price exceeds the net assets, goodwill is a new asset in the enlarged company.
:::

:::mistake{title="Including pre-merger profit in the new business"}
Profit earned before the acquisition date belongs to the vendor, not to the buyer.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic. With **prepare**, lay out the combined statement of financial position line by line, with sub-totals, and check that total assets equal capital plus liabilities. With **calculate**, show the revaluation of each owner's capital. With **evaluate** (Cambridge), give a balanced view of advantages and disadvantages tied to the case and reach a conclusion.
:::

## Summary

:::summary
- A merger joins businesses; an acquisition is a purchase. Consolidated accounts are not examined.
- The new statement uses agreed values; each owner's capital is the agreed net assets contributed.
- A company absorbing a partnership adds the assets and liabilities taken over, goodwill, share capital, premium and loan notes.
- Total assets of the enlarged company rise by the assets acquired plus goodwill.
- Only profit earned after the date of the merger or purchase belongs to the new business.
- Cambridge adds the advantages and disadvantages of mergers and acquisitions.
:::
`;

writeLesson("acquisition/merger-statements", {
  key: "acquisition.merger-statements",
  title: "Mergers and statements of financial position after a purchase",
  summary: "Prepare the opening statement of financial position when businesses merge or a company absorbs a partnership, and weigh the advantages and disadvantages of a merger.",
  concepts: ["aacc.acquisition.merger-statements"],
  estimatedMinutes: 45,
}, body);
