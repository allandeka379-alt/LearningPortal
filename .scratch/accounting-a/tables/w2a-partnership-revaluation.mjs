// Lesson generator: partnership.revaluation
import { fmt, chk, check, r2, table, sum, journal } from "../lib.mjs";
import { writeLesson, colLedger, tAcct } from "./w2a-lib.mjs";

const names = ["Tendai", "Rudo"];
// Balances before
const before = { premises: 80000, equipment: 24000, inventory: 15500, receivables: 12300, bank: 9200, payables: 13000, capT: 78000, capR: 50000 };
const assetsB = sum([before.premises, before.equipment, before.inventory, before.receivables, before.bank]);
check("before balance", assetsB, before.payables + before.capT + before.capR);
// Revaluation
const ch = { premises: 15000, equipment: -3500, inventory: -1500, allowance: -400 };
const gain = r2(ch.premises + ch.equipment + ch.inventory + ch.allowance);
chk(gain, 9600);
const shareT = r2(gain * 0.6);
const shareR = r2(gain * 0.4);
chk(shareT, 5760);
chk(shareR, 3840);
const reval = tAcct(
  "Revaluation account",
  [["1 Jan", "Equipment (decrease)", 3500], ["1 Jan", "Inventory (decrease)", 1500], ["1 Jan", "Allowance for irrecoverable debts", 400], ["1 Jan", "Capital: Tendai (3/5)", shareT], ["1 Jan", "Capital: Rudo (2/5)", shareR]],
  [["1 Jan", "Premises (increase)", 15000]],
  null,
);
const j = journal([
  { date: "1 Jan", lines: [["Premises", 15000, null], ["Revaluation", null, 15000]], narrative: "Premises increased to 95,000" },
  { date: "1 Jan", lines: [["Revaluation", 5400, null], ["Equipment", null, 3500], ["Inventory", null, 1500], ["Allowance for irrecoverable debts", null, 400]], narrative: "Equipment, inventory and receivables restated downwards" },
  { date: "1 Jan", lines: [["Revaluation", shareT + shareR, null], ["Capital: Tendai", null, shareT], ["Capital: Rudo", null, shareR]], narrative: "Revaluation profit shared in the old ratio 3 : 2" },
], { title: "Journal" });
const afterRows = [
  ["Premises", before.premises, ch.premises, before.premises + ch.premises],
  ["Equipment", before.equipment, ch.equipment, before.equipment + ch.equipment],
  ["Inventory", before.inventory, ch.inventory, before.inventory + ch.inventory],
  ["Trade receivables (net of allowance)", before.receivables, ch.allowance, before.receivables + ch.allowance],
  ["Bank", before.bank, 0, before.bank],
];
const assetsA = sum(afterRows.map((r) => r[3]));
chk(assetsA, assetsB + gain);
const capTA = before.capT + shareT;
const capRA = before.capR + shareR;
check("after balance", assetsA, before.payables + capTA + capRA);
const sfpBA = table(
  ["Statement of financial position", "Before", "Revaluation", "After"],
  [
    ...afterRows.map((r) => [r[0], r[1], r[2] === 0 ? "" : r[2], r[3]]),
    ["**Total assets**", assetsB, gain, assetsA],
    ["Capital: Tendai", before.capT, shareT, capTA],
    ["Capital: Rudo", before.capR, shareR, capRA],
    ["Trade payables", before.payables, "", before.payables],
    ["**Total capital and liabilities**", assetsB, gain, assetsA],
  ],
  ["l", "r", "r", "r"],
);

// ---- Example 2: admission of Farai; assets stay at old values
const caps2 = colLedger(
  "Partners' capital accounts: revaluation then reversal",
  ["Tendai", "Rudo", "Farai"],
  [["Reversal of revaluation (2 : 2 : 1)", r2(gain * 0.4), r2(gain * 0.4), r2(gain * 0.2)]],
  [["Balance b/d", before.capT, before.capR, null], ["Revaluation profit (3 : 2)", shareT, shareR, null], ["Cash introduced", null, null, 30000]],
  { cdDate: "1 Jul", bdDate: "1 Jul" },
);
const sacrifice = r2(gain * 0.2);
chk(caps2.closing[0], 78000 + 5760 - 3840);
chk(caps2.closing[1], 50000 + 3840 - 3840);
chk(caps2.closing[2], 30000 - 1920);

const body = `## Introduction

Tendai and Rudo bought their premises in Gweru ten years ago. Land has risen in value and the shop equipment has worn out. The books still show the original figures, but when a new partner joins, the old partners' capital accounts must reflect the real value of the business. If the premises are worth US\\$15,000 more than the books show and a new partner is admitted at the book value, the new partner would gain a share of value that the old partners built. The solution is to **revalue** the assets and liabilities at the date of the change and credit or debit the gain or loss to the old partners in their old profit-sharing ratio.

This lesson shows how to prepare the revaluation account, post its result to the capital accounts and restate the statement of financial position. It also covers the case in which the partners decide not to change the book values. Goodwill is the previous lesson, and the full treatment of a new partner is the next.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Revaluation account | Revaluation account |
| Net book value | Carrying amount |
| Bad debts provision | Allowance for irrecoverable debts |
| Statement of financial position | Statement of financial position |

Revaluation on a change in a partnership is examined by ZIMSEC in Form 5 and by Cambridge at A Level only (Paper 3). The question gives the new values.
:::

## Key definitions

:::definition{term="Revaluation account"}
A temporary account opened when a partnership changes, to record the increases and decreases in the values of assets and liabilities, so that the net gain or loss can be shared by the old partners.
:::

:::definition{term="Revaluation profit or loss"}
The net result of restating assets and liabilities to their current values. It belongs to the old partners and is shared in the old profit-sharing ratio.
:::

## Preparing the revaluation account

1. **Debit** the revaluation account with decreases in the value of assets and increases in liabilities (losses). **Credit** it with increases in assets and decreases in liabilities (gains).
2. Make the matching entry in each asset or liability account so that the books show the new value.
3. The balance on the revaluation account is a profit (credit balance) or a loss (debit balance). Transfer it to the old partners' capital accounts in the **old** ratio.
4. Prepare the statement of financial position after the revaluation. Total assets rise by the profit (or fall by the loss) and the partners' capital changes by the same amount.

The allowance for irrecoverable debts and accruals are also revalued, since they are estimates of amounts the business will collect or pay. An increase in the allowance is a loss.

:::worked-solution[Example 1: revaluation and the statement of financial position]
Tendai and Rudo share profits 3 : 2. On 1 January 2026 their statement of financial position shows premises US\\$80,000, equipment US\\$24,000, inventory US\\$15,500, trade receivables US\\$12,300, bank US\\$9,200, trade payables US\\$13,000 and capital accounts of US\\$78,000 (Tendai) and US\\$50,000 (Rudo). The assets are revalued: premises to US\\$95,000, equipment to US\\$20,500, inventory to US\\$14,000, and the allowance for irrecoverable debts is to be increased by US\\$400.

${reval}

The credit side is 15,000 and the debit side before the profit is 5,400, so the profit is ${fmt(gain)}, shared 3 : 2.

${j}

${sfpBA}
:::

## Admission with the assets left at their old values

Sometimes the partners agree that the books will continue to show the old values, perhaps for simplicity or because the assets will be revalued later. The new partner is still entitled to a fair share, so the profit is first credited to the old partners in the old ratio, as before, and then **reversed** by debiting all the partners (including the new partner) in the *new* ratio. The reversal restores the book values. The net effect on each partner's capital is the profit multiplied by (old share - new share).

:::worked-solution[Example 2: assets not restated]
Farai joins on 1 July 2026, bringing US\\$30,000. The new ratio is Tendai 2/5, Rudo 2/5, Farai 1/5. The revaluation results are as in Example 1, but the assets remain at old values in the books.

${caps2.md}

Tendai's net gain is ${fmt(shareT)} - ${fmt(r2(gain * 0.4))} = ${fmt(r2(shareT - gain * 0.4))}, which equals his sacrifice of 1/5 × ${fmt(gain)}. Rudo's net is nil (3,840 - 3,840). Farai bears 1/5 of the revaluation gain: ${fmt(sacrifice)}, which is a transfer from his capital to Tendai's. The statement of financial position still shows the old values, with Farai's capital of ${fmt(caps2.closing[2])}.
:::

## Which method to use

Use the first method when the question says that assets are to be shown at the new values; the statement of financial position then shows the new values. Use the second when it says they will remain at the old values. Read the instruction before you start. The ledger entries differ, but in both cases the old partners receive the benefit of the revaluation.

## Common mistakes

:::mistake{title="Sharing the profit in the new ratio"}
The revaluation profit or loss belongs to the old partners and is shared in the old ratio. Only the reversal uses the new ratio.
:::

:::mistake{title="Reversing the debits and credits for liabilities"}
An increase in a liability is a loss (debit); a decrease is a gain (credit). Treat assets and liabilities as opposites.
:::

:::mistake{title="Forgetting the allowance and accruals"}
Changes in the allowance for irrecoverable debts, accruals and prepayments are revaluation entries too.
:::

:::mistake{title="Not checking the statement of financial position"}
Total assets after the revaluation must equal the total of the capital and liabilities. Check both sides before you finish.
:::

## Exam tips

:::exam-tip
Revaluation is examined in ZIMSEC Paper 2 and Paper 3 and Cambridge Paper 3 with admission, retirement or a change of ratio. For *prepare a revaluation account*, list each increase and decrease with a label, then the balancing profit or loss shared in the old ratio. For *prepare the statement of financial position*, show the revised asset values or, if instructed, the old values. For *explain*, say that the old partners are credited because the gain arose while they owned the business.
:::

:::exam-tip
Where a question asks for the effect on a partner's capital when assets are not restated, state the net effect: profit × (old share - new share).
:::

## Summary

:::summary
- A revaluation account records increases and decreases in the values of assets and liabilities at the date of a change.
- Losses (decreases in assets, increases in liabilities) are debited; gains are credited.
- The net profit or loss belongs to the old partners and is shared in the old ratio.
- If the assets stay at old values, the profit is reversed in the new ratio; the net effect is profit × (old share - new share).
- Total assets after revaluation change by the profit or loss, and capital changes by the same amount.
- Always check that the statement of financial position balances.
:::
`;

writeLesson(
  "partnership/revaluation.md",
  {
    key: "partnership.revaluation",
    title: "Revaluation of assets on a change in partnership",
    summary: "Prepare a revaluation account, share the profit or loss in the old ratio, post it to capital accounts, show the statement of financial position before and after, and treat assets left at old values.",
    concepts: ["aacc.partnership.revaluation"],
    estimatedMinutes: 50,
    level: "core",
  },
  body,
);
