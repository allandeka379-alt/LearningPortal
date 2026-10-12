// Lesson generator: partnership.retirement
import { fmt, chk, check, r2, table, sum, goodwill } from "../lib.mjs";
import { writeLesson, colLedger, tAcct } from "./w2a-lib.mjs";

const before = { premises: 75000, equipment: 25000, inventory: 17500, receivables: 12500, bank: 20000, payables: 32500, T: 58200, R: 36800, F: 22500 };
const aB = sum([before.premises, before.equipment, before.inventory, before.receivables, before.bank]);
check("before", aB, before.payables + before.T + before.R + before.F);
const G = r2(12000 - 3000 - 1500);
chk(G, 7500);
const gw = 36000;
const reT = tAcct(
  "Revaluation account",
  [["31 Dec", "Equipment", 3000], ["31 Dec", "Inventory", 1500], ["31 Dec", "Capital: Tendai (3/6)", r2(G * 0.5)], ["31 Dec", "Capital: Rudo (2/6)", r2((G * 2) / 6)], ["31 Dec", "Capital: Farai (1/6)", r2(G / 6)]],
  [["31 Dec", "Premises", 12000]],
  null,
);
const cash = 12000;
const fBal = r2(before.F + G / 6 + gw / 6);
chk(fBal, 29750);
const loan = r2(fBal - cash);
const led = colLedger(
  "Partners' capital accounts (capital and current balances combined)",
  ["Tendai", "Rudo", "Farai"],
  [["Goodwill eliminated (1 : 1)", r2(gw / 2), r2(gw / 2), null], ["Bank (cash paid)", null, null, cash], ["Loan account", null, null, loan]],
  [["Balance b/d", before.T, before.R, before.F], ["Revaluation profit (3 : 2 : 1)", r2(G / 2), r2((G * 2) / 6), r2(G / 6)], ["Goodwill created (3 : 2 : 1)", r2(gw / 2), r2(gw / 3), r2(gw / 6)]],
  { cdDate: "31 Dec", bdDate: "1 Jan" },
);
chk(led.closing[0], 61950);
chk(led.closing[1], 33300);
chk(led.closing[2], 0);
const rows = [
  ["Premises", before.premises, 12000, before.premises + 12000],
  ["Equipment", before.equipment, -3000, before.equipment - 3000],
  ["Inventory", before.inventory, -1500, before.inventory - 1500],
  ["Trade receivables", before.receivables, "", before.receivables],
  ["Bank", before.bank, -cash, before.bank - cash],
];
const aA = sum(rows.map((r) => r[3]));
const liabA = r2(before.payables + loan);
check("after", aA, led.closing[0] + led.closing[1] + liabA);
const sfp = table(
  ["Statement of financial position", "Before", "Changes", "After"],
  [
    ...rows.map((r) => [r[0], r[1], r[2], r[3]]),
    ["**Total assets**", aB, r2(aA - aB), aA],
    ["Capital: Tendai", before.T, r2(led.closing[0] - before.T), led.closing[0]],
    ["Capital: Rudo", before.R, r2(led.closing[1] - before.R), led.closing[1]],
    ["Capital: Farai", before.F, -before.F, 0],
    ["Loan from Farai", "", loan, loan],
    ["Trade payables", before.payables, "", before.payables],
    ["**Total capital and liabilities**", aB, r2(aA - aB), aA],
  ],
  ["l", "r", "r", "r"],
);
const gs = goodwill.gainSacrifice([3, 2, 1], [1, 1, 0]);
chk(gs[0], 0, 1e-9);
chk(gs[1], 1 / 6, 1e-9);
chk(gs[2], -1 / 6, 1e-9);

// ---- Example 2: purchase by continuing partners
const buyBalance = 29750;

// ---- Example 3: death
const deathProfit = r2(48000 * 3 / 12);
const deathInterest = r2(50000 * 0.06 * 3 / 12);
chk(deathProfit, 12000);
const estateRows = table(
  ["Death of a partner on 31 March 2026 (year end 31 December)", "US\\$"],
  [
    ["Capital account at 1 January 2026", 44000],
    ["Current account at 1 January 2026", 3200],
    ["Share of profit to 31 March (1/3 of 3/12 of the year's profit 48,000)", r2(48000 * 3 / 12 / 3)],
    ["Interest on capital to 31 March (6% of 44,000 for 3 months)", r2(44000 * 0.06 * 3 / 12)],
    ["Less: drawings to 31 March", -2600],
    ["Share of goodwill (1/3 of 27,000)", 9000],
    ["**Amount due to the estate**", r2(44000 + 3200 + 4000 + 660 - 2600 + 9000)],
  ],
  ["l", "r"],
);
chk(r2(44000 + 3200 + 4000 + 660 - 2600 + 9000), 58260);
void deathInterest;

const body = `## Introduction

Farai has been a partner in Tendai and Rudo's printing business in Gweru for ten years. He is retiring at the end of 2026 and wants his money. The business cannot simply give him his capital account: the premises are worth more than the books show, the business has built up goodwill and he is entitled to a one-sixth share of both. Paying him in cash may leave the business short, so he might accept part of the amount as a loan to be repaid over time. The remaining partners must also decide how they will share profit in future.

This lesson explains how to settle a retiring or deceased partner's balances, how to deal with revaluation and goodwill, the three ways of paying, and how to prepare the capital accounts and the statement of financial position after the retirement. It builds on the lessons on goodwill, revaluation and the admission of a new partner.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Retirement of a partner; death of a partner | Retirement of a partner; death of a partner |
| Gaining ratio | Gaining ratio |
| Net book value | Carrying amount |
| Loan account (retiring partner) | Loan from a former partner |

Both boards examine retirement (ZIMSEC in Form 5; Cambridge at A Level only). Piecemeal realisation and dissolution are separate topics. The death of a partner is treated in the same way as retirement, with the estate as the creditor.
:::

## Key definitions

:::definition{term="Retirement of a partner"}
A partner leaves the business. The partnership's books are closed for the old firm, the partner's share of assets, goodwill and profit is calculated, and the amount due is paid or converted to a loan.
:::

:::definition{term="Gaining ratio"}
The ratio in which the continuing partners take over the retiring partner's profit share: new share less old share for each continuing partner.
:::

:::definition{term="Amount due to a retiring partner"}
His or her capital and current account balances, plus a share of any revaluation profit and goodwill, plus profit and interest to the date of retirement, less drawings.
:::

## Steps for a retirement

1. **Bring the accounts up to the date of retirement**: share profit for the period to date, credit interest on capital and salary to date, and debit drawings to date.
2. **Revalue the assets** if the question requires it. The profit or loss is shared in the old ratio, including the retiring partner.
3. **Create goodwill** in the old ratio (credit all the old partners), then **eliminate it** in the new ratio among the continuing partners only (debit them). The retiring partner keeps his or her share.
4. **Calculate the amount due** to the retiring partner (the balance of the capital account).
5. **Settle it** by cash, by transfer to a loan account, or by the continuing partners buying the share privately.
6. **Prepare the statement of financial position** after retirement.

Whichever way the partner is paid, the retiring partner's capital account must be closed.

:::worked-solution[Example 1: retirement paid by cash and a loan]
Tendai, Rudo and Farai share profits 3 : 2 : 1. Farai retires on 31 December 2026; Tendai and Rudo will share equally. Statement of financial position before retirement: premises US\\$75,000, equipment US\\$25,000, inventory US\\$17,500, trade receivables US\\$12,500, bank US\\$20,000, trade payables US\\$32,500 and capital and current balances of Tendai US\\$58,200, Rudo US\\$36,800 and Farai US\\$22,500. Premises are revalued to US\\$87,000, equipment to US\\$22,000 and inventory to US\\$16,000. Goodwill is valued at US\\$${fmt(gw)} and is not to remain in the books. Farai is paid US\\$${fmt(cash)} in cash and the balance is a loan.

Gaining ratio: Tendai 1/2 - 1/2 = nil; Rudo 1/2 - 1/3 = 1/6 gained; Farai gives up 1/6. Rudo is the only partner who gains, so he alone bears the extra goodwill (net 6,000).

${reT}

${led.md}

Farai is due ${fmt(fBal)}: capital 22,500, revaluation profit 1,250 and goodwill 6,000. He receives ${fmt(cash)} in cash and ${fmt(loan)} is transferred to a loan account.

${sfp}

The statement of financial position balances at ${fmt(aA)}.
:::

## Purchase by the continuing partners

Instead of paying from the firm's resources, the continuing partners may buy the retiring partner's share personally. The business pays nothing. The retiring partner's capital account is debited with the balance due, and the continuing partners' accounts are **credited** in the proportion in which they acquire the share. The continuing partners settle with him from their private money.

:::worked-solution[Example 2: Rudo buys Farai's share]
Using the figures above, suppose Rudo buys Farai's whole share. Farai's balance after revaluation and goodwill is US\\$${fmt(buyBalance)}. The entry is:

| Account | Debit US\\$ | Credit US\\$ |
| --- | ---: | ---: |
| Capital: Farai | ${fmt(buyBalance)} |  |
| Capital: Rudo |  | ${fmt(buyBalance)} |

The business pays no cash and has no new loan. Rudo's capital account increases by ${fmt(buyBalance)} before any goodwill elimination. If the question says the goodwill is eliminated, the elimination is made in the new ratio.
:::

## Death of a partner

The same method is used. The deceased partner's share is calculated to the date of death, including profit, interest and salary to that date, less drawings, plus share of goodwill and revaluation. The amount due is credited to the estate, which is a creditor of the firm until it is paid or becomes a loan.

:::worked-solution[Example 3: amount due to the estate]
A partner with a one-third share dies on 31 March 2026. The year's profit is expected to be US\\$48,000. His capital was US\\$44,000 and his current account US\\$3,200. Interest on capital is 6%. Drawings to date were US\\$2,600, and his share of goodwill (US\\$27,000) is US\\$9,000.

${estateRows}

The estate is a creditor for ${fmt(58260)}. Profit is time-apportioned: 3/12 of the year.
:::

## Common mistakes

:::mistake{title="Eliminating goodwill among all three partners"}
When a partner retires, goodwill is created for all the old partners in the old ratio, but eliminated only among the continuing partners in their new ratio.
:::

:::mistake{title="Forgetting the retiring partner's share of the revaluation"}
The revaluation profit is shared in the old ratio by all the partners, including the one retiring.
:::

:::mistake{title="Leaving a balance in the retiring partner's account"}
The account must be closed by cash, a loan, or a transfer to the continuing partners.
:::

:::mistake{title="Treating a loan to the retired partner as capital"}
The balance converted to a loan is a liability of the business, shown separately from capital, and it earns interest if the agreement says so.
:::

## Exam tips

:::exam-tip
Retirement is examined in ZIMSEC Paper 2 and Paper 3 and Cambridge Paper 3 (A Level), often as a 25 mark question with goodwill, revaluation, a loan and a statement of financial position. For *prepare the capital accounts*, show each adjustment on its own line with the ratio. For *calculate the amount due*, add up the capital, revaluation share and goodwill share. For *explain* a loan arrangement, say that the business lacks cash to settle at once and that the loan is a liability.
:::

:::exam-tip
Show the gaining ratio calculation as new share less old share. The sum of the gains equals the retiring partner's old share.
:::

## Summary

:::summary
- Bring the accounts to the date of retirement, then revalue, create goodwill in the old ratio and eliminate it in the new ratio among the continuing partners.
- The amount due to the retiring partner is his or her capital, current account, share of revaluation and goodwill, plus profit to date, less drawings.
- Settle by cash, a loan account or private purchase by the continuing partners.
- The gaining ratio is the continuing partners' new share less old share; gains total the retiring partner's old share.
- On death the same method applies, with the estate as creditor.
- Always check that the statement of financial position balances after retirement.
:::
`;

writeLesson(
  "partnership/retirement.md",
  {
    key: "partnership.retirement",
    title: "Retirement or death of a partner",
    summary: "Calculate the amount due to a retiring or deceased partner, deal with goodwill and revaluation, settle by cash, a loan or purchase by the continuing partners, and prepare the capital accounts and statement of financial position after retirement.",
    concepts: ["aacc.partnership.retirement"],
    estimatedMinutes: 65,
    level: "core",
  },
  body,
);
