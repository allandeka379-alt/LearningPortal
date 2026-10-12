// Lesson generator: company.redemption-shares (W3b)
import { writeLesson, front, F } from "./w3b-lib.mjs";
import { table, journal, statement, chk, r2 } from "../lib.mjs";

// Example 1: redemption wholly out of distributable profits
const E1 = { nca: 520000, inv: 90000, rec: 70000, bank: 140000, ord: 300000, pref: 100000, sp: 30000, gr: 40000, re: 190000, pay: 160000 };
const assets1 = r2(E1.nca + E1.inv + E1.rec + E1.bank);
const eqpref1 = r2(E1.ord + E1.pref + E1.sp + E1.gr + E1.re);
chk(assets1, eqpref1 + E1.pay);
const red = E1.pref;
const A1 = { ...E1, bank: E1.bank - red, pref: 0, re: E1.re - red, crr: red };
const assets2 = r2(A1.nca + A1.inv + A1.rec + A1.bank);
const eq2 = r2(A1.ord + A1.sp + A1.gr + A1.re + A1.crr);
chk(assets2, eq2 + A1.pay);
const j1 = journal([
  { date: "30 Jun", lines: [["7% redeemable preference share capital", red, null], ["Bank", null, red]], narrative: "Redemption of 100,000 preference shares of US\\$1 at par" },
  { date: "30 Jun", lines: [["Retained earnings", red, null], ["Capital redemption reserve", null, red]], narrative: "Transfer to the capital redemption reserve to replace the capital redeemed from profits" },
], { title: "Journal" });
const sofp1 = statement("Statement of financial position extracts at 30 June 2026 (US\\$)", [
  ["Property, plant and equipment", E1.nca, A1.nca], ["Inventory", E1.inv, A1.inv], ["Trade receivables", E1.rec, A1.rec], ["Cash and cash equivalents", E1.bank, A1.bank], ["**Total assets**", assets1, assets2],
  ["Ordinary share capital", E1.ord, A1.ord], ["7% redeemable preference shares", E1.pref, 0], ["Share premium", E1.sp, A1.sp], ["General reserve", E1.gr, A1.gr], ["Capital redemption reserve", 0, A1.crr], ["Retained earnings", E1.re, A1.re], ["**Total equity**", eqpref1, eq2],
  ["Trade payables and other current liabilities", E1.pay, A1.pay], ["**Total equity and liabilities**", r2(eqpref1 + E1.pay), r2(eq2 + A1.pay)],
], { cols: ["Before", "After"], checks: [["before", assets1, eqpref1 + E1.pay], ["after", assets2, eq2 + A1.pay]] });
const divSaved = r2(red * 0.07);

// Example 2: part from a fresh issue
const P2 = { pref: 80000, newOrd: 30000 };
const crr2 = r2(P2.pref - P2.newOrd);
chk(crr2, 50000);
const cashOut = r2(P2.pref - P2.newOrd);
const j2 = journal([
  { date: "1 Oct", lines: [["Bank", P2.newOrd, null], ["Ordinary share capital", null, P2.newOrd]], narrative: "Fresh issue of 30,000 ordinary shares of US\\$1 at par to finance the redemption" },
  { date: "1 Oct", lines: [["8% redeemable preference share capital", P2.pref, null], ["Bank", null, P2.pref]], narrative: "Redemption of 80,000 preference shares of US\\$1 at par" },
  { date: "1 Oct", lines: [["Retained earnings", crr2, null], ["Capital redemption reserve", null, crr2]], narrative: "Transfer of the nominal value redeemed (80,000) less the new shares issued (30,000)" },
], { title: "Journal" });
const R2 = { ordB: 250000, prefB: 80000, spB: 20000, reB: 150000 };
const ordA = R2.ordB + P2.newOrd, reA = R2.reB - crr2;
const eqB = r2(R2.ordB + R2.prefB + R2.spB + R2.reB), eqA = r2(ordA + R2.spB + reA + crr2);
chk(eqB - eqA, cashOut);
const eq2T = statement("Equity before and after (US\\$)", [
  ["Ordinary share capital", R2.ordB, ordA], ["8% redeemable preference shares", R2.prefB, 0], ["Share premium", R2.spB, R2.spB], ["Capital redemption reserve", 0, crr2], ["Retained earnings", R2.reB, reA], ["**Total**", eqB, eqA],
], { cols: ["Before", "After"], checks: [["total falls by net cash paid", eqA, eqB - cashOut]] });
const prem = table(["Redemption at a premium (outline)", "Entry"], [["Premium payable = redemption price - nominal value", "Debit share premium (if the law and the balance allow) or retained earnings; credit Bank"], ["Capital redemption reserve", "Based on the nominal value redeemed, not on the premium"]], ["l", "l"]);

const body = `
## Introduction

Farai Chitsiga runs Mutare Joinery Ltd, which raised US\\$100,000 five years ago by issuing 7% redeemable preference shares to a group of investors. The shares carry a promise: on 30 June 2026 the company will buy them back. The company now has plenty of cash and wants to keep the business in the hands of the ordinary shareholders. The accounting question is how to pay back the capital without weakening the creditors, who relied on that capital when they gave credit.

You know that a limited company's capital is protected, and that only distributable profits can be paid out as dividends. This lesson shows how the same principle governs the **redemption** of shares. **This lesson is ZIMSEC only (Form 6). Cambridge does not examine it.**

:::keyfact{title="ZIMSEC terms"}
| ZIMSEC (syllabus and common usage) | Notes |
| --- | --- |
| Redemption of shares; redeemable preference shares | The shares are issued on terms that they will be bought back |
| Purchase of own shares; buy-back | A company buys its own ordinary shares from shareholders |
| Capital redemption reserve (CRR) | A non-distributable reserve created when shares are redeemed from profits |
:::

## Key definitions

:::definition{term="Redemption of shares"}
The repayment by a company of the money paid for redeemable shares, on the date or terms stated when they were issued. The shares are cancelled.
:::

:::definition{term="Purchase of own shares"}
A company buying its own shares from a shareholder, often to reduce the number of shares or to return surplus cash. For the accounts it is treated like a redemption.
:::

:::definition{term="Capital redemption reserve (CRR)"}
A non-distributable reserve credited when shares are redeemed or bought back out of distributable profits, so that the capital protecting creditors is not reduced.
:::

## Why capital must be maintained

The creditors of a limited company cannot ask the shareholders to pay their debts personally. They rely on the company's capital as a cushion. If the company hands money back to shareholders by redeeming shares, that cushion shrinks. The law therefore allows a company to redeem shares only out of **distributable profits** or out of the proceeds of a **fresh issue** of shares made for the purpose. Where distributable profits are used, an amount equal to the nominal value redeemed (less the proceeds of any fresh issue) is moved from retained earnings to the **capital redemption reserve**. The total of capital plus non-distributable reserves is then the same as before.

:::keyfact{title="The rule"}
Capital redemption reserve = nominal value of shares redeemed - proceeds (nominal value) of the new shares issued for the redemption. If the redemption is paid entirely from a fresh issue, no CRR is needed. If it is paid entirely from profits, the CRR equals the nominal value redeemed.
:::

The CRR cannot be paid out as a dividend. It may be used to issue fully paid bonus shares.

## The entries

1. If there is a fresh issue: debit Bank, credit Ordinary share capital (and share premium if there is one).
2. Redemption: debit Preference (or other redeemed) share capital, credit Bank.
3. Transfer to the CRR: debit Retained earnings (or another distributable reserve), credit Capital redemption reserve.

:::worked-solution[Example 1: redemption wholly out of profits]
On 30 June 2026 Mutare Joinery Ltd redeems all of its ${F(red)} 7% redeemable preference shares of US\\$1 each at par, paying cash. No new shares are issued. Prepare the journal and show the statement of financial position before and after the redemption.

${j1}

${sofp1}

Cash falls by US\\$${F(red)} and the preference share capital disappears. The CRR of US\\$${F(red)} is created out of retained earnings, which fall from US\\$${F(E1.re)} to US\\$${F(A1.re)}. Total equity falls by US\\$${F(red)}, the amount of cash paid out. The company also saves the preference dividend of 7% × ${F(red)} = US\\$${F(divSaved)} a year, so its future profits available to ordinary shareholders rise. The distributable reserves fall from US\\$${F(E1.gr + E1.re)} to US\\$${F(A1.gr + A1.re)}, so it can pay smaller dividends than before.
:::

## Redemption partly from a fresh issue

A company that wishes to keep its cash can issue new shares and use the proceeds for the redemption. Only the shortfall is paid from profits, and the CRR covers only that shortfall.

:::worked-solution[Example 2: redemption partly financed by a new share issue]
Nyanga Furniture Ltd has ${F(R2.ordB)} ordinary shares of US\\$1, ${F(R2.prefB)} 8% redeemable preference shares of US\\$1, share premium of US\\$${F(R2.spB)} and retained earnings of US\\$${F(R2.reB)}. On 1 October 2026 it issues ${F(P2.newOrd)} ordinary shares of US\\$1 at par and uses the proceeds, with cash, to redeem all the preference shares at par. Prepare the journal and show the equity before and after.

${j2}

Capital redemption reserve = ${F(P2.pref)} - ${F(P2.newOrd)} = US\\$${F(crr2)}.

${eq2T}

The net cash paid out is US\\$${F(cashOut)} (the redemption of ${F(P2.pref)} less the ${F(P2.newOrd)} received), and equity falls by exactly that amount. Capital protection is kept: ordinary shares of US\\$${F(ordA)} plus the CRR of US\\$${F(crr2)} equal US\\$${F(ordA + crr2)}, the same as the ordinary and preference capital of US\\$${F(R2.ordB + R2.prefB)} before the redemption.
:::

## Premium on redemption (outline)

Sometimes the shares are redeemed above nominal value. The premium paid is not part of the capital to be protected, so it is charged to the share premium account (as far as the law allows) or otherwise to retained earnings. The CRR is still based on the **nominal value** redeemed.

${prem}

## Effects on the statements and the shareholders

Redemption reduces cash, share capital and distributable reserves. It does not change the total of share capital and capital reserves, because the CRR replaces what is redeemed. For the ordinary shareholders, redeeming preference shares saves the fixed preference dividend and removes a claim that ranks ahead of them. Gearing is affected if the preference shares were counted as fixed-cost capital: it falls when they are redeemed with cash. The risk is on liquidity: the company has less cash after paying out.

## Common mistakes

:::mistake{title="Forgetting the transfer to the capital redemption reserve"}
When shares are redeemed from profits the amount must be moved from retained earnings to the CRR. Without it, capital falls and creditors are less protected.
:::

:::mistake{title="Calculating the CRR on the cash paid"}
The CRR is based on the nominal value redeemed, less the nominal value of any new shares issued, not on the cash paid.
:::

:::mistake{title="Debiting the CRR in a redemption"}
The CRR is credited. A debit would reduce a reserve that exists to protect creditors.
:::

:::mistake{title="Paying a dividend out of the capital redemption reserve"}
The CRR is non-distributable. It can only be used for a bonus issue of fully paid shares.
:::

## Exam tips

:::exam-tip
Redemption of shares is tested in ZIMSEC Paper 2 and Paper 3. For *prepare the journal*, show the fresh issue (if any), the redemption and the transfer, each with a narrative. For *prepare the statement of financial position*, show cash reduced, the preference shares removed and the CRR added. For *explain*, say that the CRR keeps capital in the company to protect creditors.
:::

:::exam-tip
For *calculate the CRR*, show nominal value redeemed less nominal value of the new issue. For *evaluate* a redemption, mention the saving of the preference dividend and the loss of cash. Cambridge does not examine this concept; do not mention it in Cambridge answers.
:::

## Summary

:::summary
- A company may redeem shares only out of distributable profits or from a fresh issue of shares made for the purpose.
- CRR = nominal value redeemed - nominal value of the fresh issue (the whole nominal value if no fresh issue).
- Entries: debit redeemed share capital and credit bank; debit retained earnings and credit the CRR.
- The CRR is non-distributable and may be used for fully paid bonus shares.
- Redemption cuts cash and distributable reserves but saves the preference dividend; ZIMSEC only.
:::
`;
writeLesson("company/redemption-shares.md", front("company.redemption-shares", "Redemption and purchase of own shares; capital redemption reserve", "Explain why and how a company redeems preference shares or buys back its shares from profits or a fresh issue, create the capital redemption reserve and show the effect on the statement of financial position (ZIMSEC only).", ["aacc.company.redemption-shares"], 55), body);
