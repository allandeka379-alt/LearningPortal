// Lesson generator: partnership.goodwill
import { fmt, chk, r2, table, journal, goodwill, sum } from "../lib.mjs";
import { writeLesson, colLedger } from "./w2a-lib.mjs";

// ---- Example 1: valuation
const profits = [24600, 27300, 29100];
const avg = sum(profits) / profits.length;
const gwAvg = goodwill.averageProfits(profits, 2);
chk(avg, 27000);
chk(gwAvg, 54000);
const netAssets = 120000;
const normalPct = 15;
const normal = (netAssets * normalPct) / 100;
const superP = avg - normal;
const gwSuper = goodwill.superProfits(avg, netAssets, normalPct, 3);
chk(superP, 9000);
chk(gwSuper, 27000);

// ---- Example 2: change of ratio between A and B, 3:2 to 1:1, goodwill 30,000
const gw2 = 30000;
const names2 = ["Tendai", "Rudo"];
const gs2 = goodwill.gainSacrifice([3, 2], [1, 1]);
chk(gs2[0], -0.1, 1e-9);
chk(gs2[1], 0.1, 1e-9);
const withAcct = colLedger(
  "Partners' capital accounts: goodwill account opened then eliminated",
  names2,
  [["Goodwill eliminated (1 : 1)", 15000, 15000]],
  [["Balance b/d", 40000, 30000], ["Goodwill created (3 : 2)", 18000, 12000]],
  { cdDate: "1 Jan" },
);
const noAcct = colLedger(
  "Partners' capital accounts: no goodwill account",
  names2,
  [["Adjustment for goodwill", null, 3000]],
  [["Balance b/d", 40000, 30000], ["Adjustment for goodwill", 3000, null]],
  { cdDate: "1 Jan" },
);
const j1 = journal([
  { date: "1 Jan", lines: [["Goodwill", gw2, null], ["Capital: Tendai", null, 18000], ["Capital: Rudo", null, 12000]], narrative: "Goodwill created and credited to the old partners in the old ratio 3 : 2" },
  { date: "1 Jan", lines: [["Capital: Tendai", 15000, null], ["Capital: Rudo", 15000, null], ["Goodwill", null, gw2]], narrative: "Goodwill eliminated and charged to the partners in the new ratio 1 : 1" },
], { title: "Journal" });

// ---- Example 3: admission of Farai with goodwill (no cash for goodwill), 3:2 to 2:2:1
const gw3 = 40000;
const names3 = ["Tendai", "Rudo", "Farai"];
const cap3 = [
  ["Balance b/d", 50000, 35000, null],
];
const led3 = colLedger(
  "Partners' capital accounts on admission of Farai",
  names3,
  [["Goodwill eliminated (2 : 2 : 1)", 16000, 16000, 8000]],
  [["Balance b/d", 50000, 35000, null], ["Goodwill created (3 : 2)", 24000, 16000, null], ["Cash introduced by Farai", null, null, 30000]],
  { cdDate: "1 Jul", bdDate: "1 Jul" },
);
const gs3 = goodwill.gainSacrifice([3, 2, 0], [2, 2, 1]);
chk(gs3[0], -0.2, 1e-9);
chk(gs3[1], 0, 1e-9);
chk(gs3[2], 0.2, 1e-9);
chk(led3.closing[0], 58000);
chk(led3.closing[1], 35000);
chk(led3.closing[2], 22000);
void cap3;

const body = `## Introduction

Tendai and Rudo's bakery in Gweru is known for its bread, has loyal customers and a prime location. If it were sold, a buyer would pay more than the value of its ovens, vans and stock because of its reputation and customers. That extra value is **goodwill**. When a partnership changes, whether a new partner joins, the profit shares change or a partner retires, the old partners have built this value and are entitled to be paid for it. If the change took place without recognising goodwill, a new partner could receive a share of the value built by others at no cost.

This lesson explains goodwill, the common methods of valuing it, the accounting treatment on a change in the partnership and the IAS 38 view. Revaluation of other assets is the next lesson; the full treatment of a new partner and of retirement follows.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Goodwill; super profits; sacrificing and gaining ratios | Goodwill; super profits; sacrificing and gaining ratios |
| Net book value | Carrying amount |
| Statement of financial position | Statement of financial position |

Partnership goodwill is examined by ZIMSEC in Form 5 and by Cambridge at A Level only (Paper 3). Both boards give the goodwill figure or the method in the question.
:::

## Key definitions

:::definition{term="Goodwill"}
The amount by which the value of a business as a whole exceeds the fair value of its separately identifiable net assets. It arises from reputation, customer loyalty, location and skilled staff.
:::

:::definition{term="Inherent goodwill"}
Goodwill built up by the business itself over time (self-generated). It is not recorded in the books and not shown in the statement of financial position.
:::

:::definition{term="Purchased goodwill"}
Goodwill paid for when one business buys another. It is the excess of the price paid over the fair value of the net assets acquired, and it is shown as an intangible non-current asset.
:::

:::definition{term="Super profits"}
The amount by which the average annual profit exceeds the normal return expected on the net assets of the business.
:::

:::definition{term="Sacrificing and gaining ratios"}
The sacrifice of a partner is his or her old share less the new share; a negative figure is a gain. Sacrifices and gains total zero.
:::

## Why goodwill arises on a change

On a change in the profit-sharing ratio, admission or retirement, the partner who is giving up a share of future profits (the sacrificing partner) should be compensated by the partner who gains. The measure of this value is the goodwill of the business at the date of the change. The value is agreed by the partners, calculated by a method in the question or given.

## Methods of valuation

| Method | Calculation |
| --- | --- |
| Multiple of average profits | Average annual profit of the past years × the number of years' purchase |
| Super profits | (Average annual profit - normal return on net assets) × years' purchase |

Averages normally use recent profits after adjusting for items that will not recur. Super profits recognise that part of the profit is simply the return on the net assets invested, so only the excess is attributed to goodwill. The number of years' purchase is a judgement, higher where profits are stable and customers loyal.

:::worked-solution[Example 1: valuing goodwill]
Tendai and Rudo's profits for the last three years were US\\$24,600, US\\$27,300 and US\\$29,100. The net assets of the business are US\\$120,000 and a normal return in this trade is 15%.

(a) Two years' purchase of average profits: average = (24,600 + 27,300 + 29,100) ÷ 3 = ${fmt(avg)}. Goodwill = 2 × ${fmt(avg)} = ${fmt(gwAvg)}.

(b) Three years' purchase of super profits: normal return = 15% × 120,000 = ${fmt(normal)}; super profits = ${fmt(avg)} - ${fmt(normal)} = ${fmt(superP)}. Goodwill = 3 × ${fmt(superP)} = ${fmt(gwSuper)}.

The two methods give very different answers. The second is lower because it removes the normal return on the net assets.
:::

## Accounting treatment

There are two ways to deal with goodwill on a change.

**Method 1: open a goodwill account, then eliminate it.** Create goodwill by debiting the goodwill account and crediting the old partners' capital accounts in the *old* ratio. Eliminate it immediately by crediting the goodwill account and debiting the continuing partners' capital accounts in the *new* ratio. Since inherent goodwill may not be shown as an asset, the account is cleared at once so that the statement of financial position after the change shows none.

**Method 2: no goodwill account.** Adjust the capital accounts directly. The partner who gains debits his or her account by the gain × the goodwill and the partner who sacrifices credits his or her account by the sacrifice × the goodwill. The result is the same as the first method.

Under **IAS 38** inherent goodwill is not an asset the business can recognise because it cannot be reliably measured. That is why the account is not retained after a change, unlike purchased goodwill, which is recognised and tested for impairment. If the partners decided to keep goodwill in the books, the question will say so and the account would stay open with a balance in the statement of financial position.

:::worked-solution[Example 2: a change of ratio]
Tendai and Rudo share profits 3 : 2 and decide to share equally from 1 January 2026. Their capital accounts are US\\$40,000 and US\\$30,000. Goodwill is valued at US\\$${fmt(gw2)}.

Sacrifice: Tendai 3/5 - 1/2 = 1/10 sacrificed; Rudo 2/5 - 1/2 = 1/10 gained. Rudo must compensate Tendai for 1/10 of ${fmt(gw2)} = 3,000.

**Method 1** (goodwill account opened and eliminated):

${j1}

${withAcct.md}

**Method 2** (no goodwill account):

${noAcct.md}

Both methods leave Tendai with ${fmt(withAcct.closing[0])} and Rudo with ${fmt(withAcct.closing[1])}. Tendai is credited 18,000 and debited 15,000, a net 3,000 gain; Rudo is credited 12,000 and debited 15,000, a net 3,000 charge.
:::

:::worked-solution[Example 3: admission of a partner]
Tendai and Rudo, sharing 3 : 2, admit Farai on 1 July 2026. The new ratio is Tendai 2/5, Rudo 2/5, Farai 1/5. Capital accounts are Tendai US\\$50,000 and Rudo US\\$35,000; Farai brings in US\\$30,000 of cash. Goodwill is US\\$40,000 and is not to remain in the books.

Sacrifice: Tendai 3/5 - 2/5 = 1/5; Rudo 2/5 - 2/5 = nil; Farai gains 1/5. Farai's share of goodwill is 1/5 × ${fmt(gw3)} = 8,000, which is charged to him in the elimination.

${led3.md}

Tendai's net credit is 24,000 - 16,000 = 8,000, which equals his sacrifice of 1/5 × ${fmt(gw3)}. Rudo's is 16,000 - 16,000 = nil. Farai pays 8,000 for his share of goodwill by a debit to his capital account, so his capital of ${fmt(30000)} is reduced to ${fmt(led3.closing[2])}; the cash is not changed.
:::

## Common mistakes

:::mistake{title="Using the new ratio when creating goodwill"}
Goodwill is created for the *old* partners in the *old* ratio and eliminated in the *new* ratio. Reversing them gives a wrong net effect.
:::

:::mistake{title="Forgetting that sacrifices and gains total zero"}
If your sacrifices and gains do not add to zero, a share is wrong. Convert all shares to a common denominator first.
:::

:::mistake{title="Keeping inherent goodwill in the statement of financial position"}
Unless the question says goodwill remains in the books, eliminate it. Inherent goodwill is not recognised under IAS 38.
:::

:::mistake{title="Using total profit rather than average profit"}
The multiple applies to the average annual profit, not to the total of the years.
:::

## Exam tips

:::exam-tip
Goodwill appears in ZIMSEC Paper 2 and Paper 3 and Cambridge Paper 3 (Cambridge A Level only) with admission, retirement or a change of ratio. For *calculate*, give the average or the super profits as a separate line before applying the multiple. For *prepare capital accounts*, show goodwill created and eliminated as separate entries so that each step earns marks. For *explain*, link the entry to the sacrificing partner being compensated.
:::

:::exam-tip
For *state the treatment of goodwill under IAS 38*, say that inherent goodwill cannot be recognised as an asset, only purchased goodwill can, and so a goodwill account opened on a change is eliminated.
:::

## Summary

:::summary
- Goodwill is the value of a business above its net assets; inherent goodwill is self-built, purchased goodwill is paid for.
- Valuation: average annual profit × years' purchase, or super profits × years' purchase.
- Sacrifice (old share - new share) is compensated by the partner who gains; sacrifices and gains total zero.
- Method 1: debit goodwill, credit old partners (old ratio); then credit goodwill, debit partners (new ratio).
- Method 2 adjusts capital accounts directly by gain or sacrifice × goodwill; both methods give the same result.
- Under IAS 38 inherent goodwill is not recognised, so the goodwill account is eliminated after a change.
:::
`;

writeLesson(
  "partnership/goodwill.md",
  {
    key: "partnership.goodwill",
    title: "Goodwill in partnership accounts",
    summary: "Value goodwill by average profits and super profits, find sacrificing and gaining ratios, account for goodwill on a change by creating and eliminating a goodwill account or by adjusting capital accounts, and apply IAS 38 in outline.",
    concepts: ["aacc.partnership.goodwill"],
    estimatedMinutes: 55,
    level: "core",
  },
  body,
);
