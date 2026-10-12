// Lesson generator: company.bonus-rights (W3b)
import { writeLesson, front, F } from "./w3b-lib.mjs";
import { table, journal, statement, chk, r2 } from "../lib.mjs";

// Example 1: bonus issue 1 for 5
const held = 500000, newPerOld = [1, 5];
const newShares = (held * newPerOld[0]) / newPerOld[1];
const bonusAmt = r2(newShares * 1);
const b0 = { sc: 500000, sp: 50000, rv: 30000, gr: 60000, re: 140000 };
const fromGR = 60000, fromSP = r2(bonusAmt - fromGR);
chk(fromSP, 40000);
const b1 = { sc: b0.sc + bonusAmt, sp: b0.sp - fromSP, rv: b0.rv, gr: b0.gr - fromGR, re: b0.re };
const eq0 = r2(b0.sc + b0.sp + b0.rv + b0.gr + b0.re), eq1 = r2(b1.sc + b1.sp + b1.rv + b1.gr + b1.re);
chk(eq0, eq1);
const jBonus = journal([{ date: "30 Jun", lines: [["General reserve", fromGR, null], ["Share premium", fromSP, null], ["Ordinary share capital", null, bonusAmt]], narrative: "Bonus issue of 100,000 shares of US\\$1 (one for every five held) from reserves" }], { title: "Journal" });
const eqT = statement("Equity before and after the bonus issue (US\\$)", [
  ["Ordinary share capital", b0.sc, b1.sc], ["Share premium", b0.sp, b1.sp], ["Revaluation reserve", b0.rv, b1.rv], ["General reserve", b0.gr, b1.gr], ["Retained earnings", b0.re, b1.re], ["**Total equity**", eq0, eq1],
], { cols: ["Before", "After"], checks: [["total equity unchanged", eq0, eq1]] });
const shareholderHeld = 5000, shareholderNew = shareholderHeld / 5;
const priceBefore = 3.0;
const priceAfter = r2((priceBefore * held) / (held + newShares));
chk(priceAfter, 2.5);

// Example 2: rights issue 1 for 4 at 1.60
const r0 = { sc: 400000, sp: 80000, re: 220000, bank: 90000 };
const rShares = (r0.sc * 1) / 4;
const rPrice = 1.6;
const rCap = r2(rShares * 1), rPrem = r2(rShares * (rPrice - 1)), rCash = r2(rShares * rPrice);
const r1 = { sc: r0.sc + rCap, sp: r0.sp + rPrem, re: r0.re, bank: r0.bank + rCash };
const req0 = r2(r0.sc + r0.sp + r0.re), req1 = r2(r1.sc + r1.sp + r1.re);
chk(req1 - req0, rCash);
const jRights = journal([{ date: "1 Sep", lines: [["Bank", rCash, null], ["Ordinary share capital", null, rCap], ["Share premium", null, rPrem]], narrative: "Rights issue of 100,000 shares of US\\$1 at US\\$1.60 (one for every four held), fully paid" }], { title: "Journal" });
const reT = statement("Effect of the rights issue (US\\$)", [
  ["Cash and cash equivalents", r0.bank, r1.bank], ["Ordinary share capital", r0.sc, r1.sc], ["Share premium", r0.sp, r1.sp], ["Retained earnings", r0.re, r1.re], ["**Total equity**", req0, req1],
], { cols: ["Before", "After"], checks: [["equity up by cash", req1, req0 + rCash]] });
const hold = 4000, takeUp = hold / 4, cost = r2(takeUp * rPrice);
const pctBefore = (hold / r0.sc) * 100, pctAfter = (hold / (r0.sc + rShares)) * 100;
const comp = table(["Feature", "Bonus issue", "Rights issue"], [
  ["Who receives the shares", "Existing shareholders, in proportion to their holding", "Existing shareholders, with the first right to buy"],
  ["Does the shareholder pay?", "No", "Yes, a price below the market price"],
  ["Cash received by the company", "None", "Yes, shares × issue price"],
  ["Source of the entry", "Reserves are turned into share capital", "Bank is debited; capital and premium credited"],
  ["Effect on total equity", "None", "Rises by the cash received"],
  ["Effect on the number of shares", "Rises", "Rises"],
  ["Effect on the market price per share", "Falls in proportion, with no other change", "Tends to fall, since more shares share the assets"],
], ["l", "l", "l"]);

const body = `
## Introduction

Hwange Quarry Ltd has made good profits for years and has built up large reserves. Its share price has risen so much that each share costs US\\$3.00, and small investors find the shares expensive. The directors consider two ways of changing the number of shares: giving the shareholders free extra shares, called a **bonus issue**, and offering them the first chance to buy new shares below the market price, a **rights issue**. The first raises no cash; the second does.

You know the equity section and the ledger entries for an ordinary share issue. This lesson covers the two special issues, their entries and effects, and why a company chooses one or the other. Both boards examine the lesson; the theoretical ex-rights price is not required.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 (AS) |
| --- | --- |
| Bonus issue; capitalisation issue; scrip issue | Bonus issue (capitalisation of reserves) |
| Rights issue | Rights issue to existing shareholders |
| Reserves that may be used: share premium, general reserve, retained profits | Same; the revaluation reserve is not used in Cambridge questions |
:::

## Key definitions

:::definition{term="Bonus issue"}
An issue of fully paid shares to existing shareholders, in proportion to their holdings, paid for by converting reserves into share capital. The company receives no cash.
:::

:::definition{term="Rights issue"}
An offer of new shares to existing shareholders, in proportion to their holdings, at a price below the market price. The shareholders pay, so the company receives cash.
:::

:::definition{term="Capitalisation of reserves"}
The transfer of reserves to share capital to pay for the bonus shares.
:::

## Bonus issues

A bonus issue is expressed as a ratio: "one for every five held" gives one new share for each five held. The company has not received anything and has not given anything away. The reserves belong to the shareholders already, and the issue only changes their label from reserves to share capital. Total equity and the cash are unchanged. The reasons for doing it are to bring the share capital closer to the real capital employed of the business, to lower the share price to make the shares easier to trade, and to show confidence without paying cash.

The reserves that may be used are the **distributable** reserves (retained earnings, general reserve) and the **share premium**. In Cambridge questions the revaluation reserve is not used. The reserves used first are usually those the question names; a sensible order is the general reserve, then the share premium and then retained earnings.

:::worked-solution[Example 1: a bonus issue of one for five]
Hwange Quarry Ltd has ${F(held)} ordinary shares of US\\$1 each. It makes a bonus issue of one new share for every five held, using the general reserve first and the share premium for the rest. Prepare the journal and show equity before and after the issue.

New shares = ${F(held)} ÷ 5 = ${F(newShares)}; amount capitalised = ${F(newShares)} × US\\$1 = US\\$${F(bonusAmt)}.

${jBonus}

${eqT}

Total equity is US\\$${F(eq1)} both before and after. The share capital rises by US\\$${F(bonusAmt)} and the reserves fall by the same amount. A shareholder with ${F(shareholderHeld)} shares receives ${F(shareholderNew)} more and holds ${F(shareholderHeld + shareholderNew)}. If the market price before the issue was US\\$${priceBefore.toFixed(2)}, the value of the holding was US\\$${F(shareholderHeld * priceBefore)}; the price after should fall to about US\\$${priceAfter.toFixed(2)} (${F(held)} × ${priceBefore.toFixed(2)} ÷ ${F(held + newShares)}), so the value of the ${F(shareholderHeld + shareholderNew)} shares is again about US\\$${F((shareholderHeld + shareholderNew) * priceAfter)}. The shareholder is no better off, only holds more shares.
:::

## Rights issues

In a rights issue the company needs cash. Existing shareholders have the first option to buy new shares in proportion to their holdings, at a price below the market price so that they are attracted to take them up. A shareholder who does not want to buy can usually sell the right to someone else. The entries are the same as for any issue: debit Bank with the cash, credit share capital with the nominal value and share premium with the excess.

:::worked-solution[Example 2: a rights issue of one for four]
Kadoma Boats Ltd has ${F(r0.sc)} ordinary shares of US\\$1 each, share premium of US\\$${F(r0.sp)}, retained earnings of US\\$${F(r0.re)} and cash of US\\$${F(r0.bank)}. On 1 September it makes a rights issue of one new share for every four held at US\\$${rPrice.toFixed(2)} per share, and all the rights are taken up. Prepare the journal, show the effect on equity and cash, and describe the position of a shareholder with ${F(hold)} shares.

New shares = ${F(r0.sc)} ÷ 4 = ${F(rShares)}.

${jRights}

${reT}

Equity and cash both rise by US\\$${F(rCash)}. The shareholder with ${F(hold)} shares has the right to buy ${F(takeUp)} new shares for ${F(takeUp)} × US\\$${rPrice.toFixed(2)} = US\\$${F(cost)}. If the shareholder takes up the right, the holding rises to ${F(hold + takeUp)} shares, which is the same ${pctBefore.toFixed(2)}% of the company as before. If the right is not taken up, the holding stays at ${F(hold)} shares but is now ${pctAfter.toFixed(2)}% of the company, because the company has ${F(r0.sc + rShares)} shares. The shareholder may sell the right and keep the money.
:::

## Comparing the two issues

${comp}

Both issues increase the number of shares, so the earnings per share falls unless profit rises. A bonus issue lowers the market price per share as a matter of arithmetic; a rights issue also lowers it, but the company gains cash that it can invest, which may increase future profit.

## Advantages and disadvantages

**For the company:** a bonus issue costs no cash and keeps the reserves in the business, while making the shares easier to trade. A rights issue raises cash more cheaply than a public offer, because it goes to people who already know the company, and it keeps control with the present owners. A rights issue costs the dividends on the extra shares, and the issue takes time to arrange.

**For the shareholders:** a bonus issue gives them more shares but no more value. A rights issue lets them buy shares at a discount and keep their percentage of ownership, but it asks them for cash. A shareholder who cannot or will not take up the rights is diluted, though selling the rights offsets the loss.

## Common mistakes

:::mistake{title="Debiting bank for a bonus issue"}
A bonus issue brings in no cash. Debit the reserves and credit share capital.
:::

:::mistake{title="Using the revaluation reserve"}
The revaluation reserve is an unrealised gain and is not used for a bonus issue in Cambridge questions. Use the share premium or the revenue reserves.
:::

:::mistake{title="Saying that a bonus issue makes shareholders richer"}
The number of shares rises and the price per share falls. The total value of the holding is unchanged.
:::

:::mistake{title="Crediting the whole rights proceeds to share capital"}
Share capital is credited at nominal value only. The excess of the rights price over nominal value is share premium.
:::

## Exam tips

:::exam-tip
Bonus and rights issues are tested in ZIMSEC Paper 2 and Cambridge Papers 1 and 2. For *prepare the journal*, give the accounts debited and credited, the amounts and a narrative. For *show the effect*, give equity before and after, and say whether total equity changes. For *distinguish*, state whether cash is received.
:::

:::exam-tip
For *evaluate*, give one benefit and one cost to each party. For example, a bonus issue costs the company nothing but brings no funds; a rights issue brings funds but asks shareholders for cash. For effects on earnings per share, say that the number of shares rises, so the EPS falls unless profit grows.
:::

## Summary

:::summary
- A bonus issue converts reserves into share capital for no cash: debit reserves, credit share capital; total equity is unchanged.
- A rights issue offers new shares to existing shareholders below the market price: debit bank, credit share capital and share premium.
- Reserves used for a bonus issue are the share premium and distributable reserves, not the revaluation reserve (Cambridge).
- Both issues increase the number of shares and reduce the earnings per share and the market price per share.
- A shareholder who does not take up rights is diluted; the right may be sold.
:::
`;
writeLesson("company/bonus-rights.md", front("company.bonus-rights", "Bonus issues and rights issues", "Record a bonus (capitalisation) issue from reserves and a rights issue for cash, show their effect on share capital, reserves, the number of shares and the position of shareholders, and distinguish and evaluate the two.", ["aacc.company.bonus-rights"], 55), body);
