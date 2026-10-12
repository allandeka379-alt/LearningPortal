// Lesson generator: partnership.new-partner
import { fmt, chk, check, r2, table, sum, journal, goodwill } from "../lib.mjs";
import { writeLesson, colLedger, tAcct } from "./w2a-lib.mjs";

// ---- Example 1: admission with premium for goodwill (no goodwill account, no revaluation)
const gwP = 40000;
const prem = r2(gwP / 5);
const jP = journal([
  { date: "1 Apr", lines: [["Bank", 38000, null], ["Capital: Farai", null, 30000], ["Capital: Tendai", null, prem]], narrative: "Farai admitted: capital of 30,000 and premium for goodwill of 8,000 (Tendai sacrifices 1/5, so receives the whole premium)" },
], { title: "Journal" });
const cap1 = colLedger(
  "Partners' capital accounts",
  ["Tendai", "Rudo", "Farai"],
  [],
  [["Balance b/d", 50000, 35000, null], ["Cash introduced", null, null, 30000], ["Premium for goodwill", prem, null, null]],
  { cdDate: "1 Apr", bdDate: "1 Apr" },
);
chk(cap1.closing[0], 58000);

// ---- Example 2: revaluation, goodwill created and eliminated, new partner brings cash
const before = { premises: 90000, equipment: 30000, inventory: 18000, receivables: 14600, bank: 12400, payables: 15000, capT: 90000, capR: 60000 };
const aB = sum([before.premises, before.equipment, before.inventory, before.receivables, before.bank]);
check("before", aB, before.payables + before.capT + before.capR);
const dP = 18000;
const dE = -4500;
const dI = -1500;
const G = r2(dP + dE + dI);
chk(G, 12000);
const gw = 30000;
const cash = 40000;
const revT = tAcct(
  "Revaluation account",
  [["1 Jul", "Equipment", 4500], ["1 Jul", "Inventory", 1500], ["1 Jul", "Capital: Tendai (3/5)", r2(G * 0.6)], ["1 Jul", "Capital: Rudo (2/5)", r2(G * 0.4)]],
  [["1 Jul", "Premises", 18000]],
  null,
);
const caps = colLedger(
  "Partners' capital accounts",
  ["Tendai", "Rudo", "Farai"],
  [["Goodwill eliminated (2 : 2 : 1)", r2(gw * 0.4), r2(gw * 0.4), r2(gw * 0.2)]],
  [["Balance b/d", before.capT, before.capR, null], ["Revaluation profit (3 : 2)", r2(G * 0.6), r2(G * 0.4), null], ["Goodwill created (3 : 2)", r2(gw * 0.6), r2(gw * 0.4), null], ["Cash introduced", null, null, cash]],
  { cdDate: "1 Jul", bdDate: "1 Jul" },
);
chk(caps.closing[0], 103200);
chk(caps.closing[1], 64800);
chk(caps.closing[2], 34000);
const afterRows = [
  ["Premises", before.premises, dP, before.premises + dP],
  ["Equipment", before.equipment, dE, before.equipment + dE],
  ["Inventory", before.inventory, dI, before.inventory + dI],
  ["Trade receivables", before.receivables, "", before.receivables],
  ["Bank", before.bank, cash, before.bank + cash],
];
const aA = sum(afterRows.map((r) => r[3]));
const capSum = sum(caps.closing);
check("after", aA, before.payables + capSum);
const sfp = table(
  ["Statement of financial position", "Before", "Changes", "After"],
  [
    ...afterRows.map((r) => [r[0], r[1], r[2], r[3]]),
    ["**Total assets**", aB, r2(aA - aB), aA],
    ["Capital: Tendai", before.capT, r2(caps.closing[0] - before.capT), caps.closing[0]],
    ["Capital: Rudo", before.capR, r2(caps.closing[1] - before.capR), caps.closing[1]],
    ["Capital: Farai", "", cash - 6000, caps.closing[2]],
    ["Trade payables", before.payables, "", before.payables],
    ["**Total capital and liabilities**", aB, r2(aA - aB), aA],
  ],
  ["l", "r", "r", "r"],
);
const gs = goodwill.gainSacrifice([3, 2, 0], [2, 2, 1]);
chk(gs[2], 0.2, 1e-9);

const body = `## Introduction

Tendai and Rudo's printing business in Gweru has outgrown its machines. They need US\\$30,000 for a new press and a manager to run the sales side. Farai has the money and the skills, and they agree to admit him as a third partner. Before he joins, the partners must settle three questions: what share of the profit will each of them have, how much will Farai pay for the right to a share of the business's goodwill and assets, and how will the new position be recorded.

This lesson brings together the sacrificing and gaining ratios, goodwill and revaluation in the admission of a new partner. It covers the capital accounts, a premium for goodwill and the statement of financial position after admission. Retirement is the next lesson; changes part-way through the year follow it.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Admission of a new partner; change of profit-sharing ratio | Admission of a new partner; change in profit-sharing ratio |
| Premium for goodwill | Goodwill adjustment (premium) |
| Net book value | Carrying amount |

Both boards examine the admission of a partner (ZIMSEC in Form 5; Cambridge at A Level only, Paper 3). The question states whether goodwill is kept in the books and whether assets are restated.
:::

## Key definitions

:::definition{term="Admission of a partner"}
The joining of a new partner, who brings capital in cash or assets and takes a share of future profits. The old partnership is treated as closing for accounting purposes and a new one begins.
:::

:::definition{term="Premium for goodwill"}
Cash paid by the incoming partner, in addition to his or her capital, for a share of the existing goodwill. It is credited to the sacrificing partners' capital accounts, in the sacrificing ratio.
:::

:::definition{term="Sacrifice"}
The reduction in a continuing partner's share of profit when the ratio changes. The new partner's share comes from the sacrifices of the old partners.
:::

## Reasons for a change

Partners change the ratio or admit a new partner to raise capital, to bring in skills, to replace a retiring partner or to share the workload. On any change the old partners are entitled to be compensated for the profit share they give up. Three adjustments may be needed: **goodwill** (previous lesson), **revaluation** (previous lesson) and the **new partner's capital**.

## The new partner's contribution

The incoming partner may bring:

- **cash** as capital only (goodwill is handled through the capital accounts, as in the goodwill lesson);
- **cash including a premium**, where the capital is credited to his or her account and the premium is credited to the old partners in the sacrificing ratio; or
- **assets** other than cash, at an agreed value, debited to the asset accounts and credited to his or her capital account.

If the partners want the capital accounts to be in proportion to the new profit shares, the old partners adjust their capitals by paying cash into or withdrawing it from the business. The question states the required proportions.

:::worked-solution[Example 1: premium for goodwill]
Tendai and Rudo share profits 3 : 2. Their capital accounts are US\\$50,000 and US\\$35,000. On 1 April 2026 they admit Farai, who will have a one-fifth share. The new ratio is Tendai 2/5, Rudo 2/5, Farai 1/5. Goodwill is valued at US\\$${fmt(gwP)}. Farai pays US\\$30,000 as capital and a premium for his share of goodwill in cash. The goodwill is not to be kept in the books.

1. Farai's share of goodwill = 1/5 × ${fmt(gwP)} = ${fmt(prem)}, paid as a premium.
2. Sacrifice: Tendai 3/5 - 2/5 = 1/5; Rudo 2/5 - 2/5 = nil. The premium is credited to Tendai, the only partner who sacrifices.

${jP}

${cap1.md}

Tendai's capital rises to ${fmt(cap1.closing[0])}. Farai's capital is ${fmt(cap1.closing[2])}, as agreed. The bank balance increases by 38,000.
:::

:::worked-solution[Example 2: revaluation, goodwill and a new partner]
Before the admission the statement of financial position of Tendai and Rudo shows premises US\\$90,000, equipment US\\$30,000, inventory US\\$18,000, trade receivables US\\$14,600, bank US\\$12,400, trade payables US\\$15,000 and capital US\\$90,000 (Tendai) and US\\$60,000 (Rudo). On 1 July 2026 they admit Farai, who brings US\\$40,000 of cash. The new ratio is 2 : 2 : 1. The premises are revalued to US\\$108,000, equipment to US\\$25,500 and inventory to US\\$16,500. Goodwill of US\\$${fmt(gw)} is created and eliminated. Prepare the revaluation account, the capital accounts and the statement of financial position after admission.

${revT}

The revaluation profit is ${fmt(G)}, shared 3 : 2.

${caps.md}

${sfp}

Check: total assets of ${fmt(aA)} equal capital of ${fmt(capSum)} plus trade payables of ${fmt(before.payables)}. Farai's capital of ${fmt(caps.closing[2])} is his cash less his one-fifth share of goodwill (6,000), which is transferred to Tendai.
:::

## Matching capital to profit shares

Some agreements require the capital accounts to stand in the profit-sharing ratio. The method is to decide a base: usually the new partner's capital divided by his share gives the total capital, from which each partner's required capital follows. The old partners then pay in or withdraw cash for the difference. For example, if Farai's capital of 34,000 is one-fifth, total capital should be 170,000 and Tendai and Rudo should each hold 68,000: Tendai would withdraw 35,200 and Rudo would pay in 3,200.

## Common mistakes

:::mistake{title="Crediting the premium in the new ratio or the old ratio"}
The premium belongs to the sacrificing partners and is shared in the sacrificing ratio. If only one partner sacrifices, he or she takes it all.
:::

:::mistake{title="Debiting the new partner's cash twice"}
The cash introduced increases the bank and the new partner's capital; goodwill adjustments are between capital accounts only.
:::

:::mistake{title="Forgetting the revaluation when the question gives new values"}
Prepare the revaluation account first, share its profit in the old ratio, then deal with goodwill and the new partner's cash.
:::

:::mistake{title="A statement of financial position that does not balance"}
Total assets rise by the revaluation profit and by the cash introduced. Capital rises by the same two items. Check every figure.
:::

## Exam tips

:::exam-tip
Admission of a partner is set in ZIMSEC Paper 2 and Paper 3 and in Cambridge Paper 3 (Cambridge A Level only), often as a 25 mark question with revaluation, goodwill and a statement of financial position. For *prepare the capital accounts*, show every adjustment on a separate line with the ratio in brackets. For *calculate the sacrifice*, show old share - new share for each partner. For *explain*, link the premium to the sacrificing partner's loss of future profit.
:::

:::exam-tip
When a question says "goodwill is not to be shown in the books" or "assets are to remain at old values", state the second entry (elimination or reversal) clearly so that the marks for each step can be awarded.
:::

## Summary

:::summary
- Admitting a partner involves three adjustments: revaluation, goodwill and the new partner's capital contribution.
- The revaluation profit is shared by the old partners in the old ratio; goodwill is created in the old ratio and eliminated in the new ratio.
- A premium paid in cash for goodwill is credited to the sacrificing partners in the sacrificing ratio.
- Total assets after admission = old assets + revaluation profit + cash introduced; capital changes by the same amounts.
- Capital accounts may be adjusted to match the new profit shares by cash paid in or withdrawn.
- Always check that the statement of financial position balances.
:::
`;

writeLesson(
  "partnership/new-partner.md",
  {
    key: "partnership.new-partner",
    title: "Change of ratio and admission of a new partner",
    summary: "Calculate sacrifice and gain, account for the admission of a partner with cash, a premium for goodwill and revaluation, write up the capital accounts and prepare the statement of financial position after admission.",
    concepts: ["aacc.partnership.new-partner"],
    estimatedMinutes: 65,
    level: "core",
  },
  body,
);
