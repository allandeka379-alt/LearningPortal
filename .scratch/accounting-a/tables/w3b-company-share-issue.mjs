// Lesson generator: company.share-issue (W3b)
import { writeLesson, front, F, U } from "./w3b-lib.mjs";
import { table, tAccount, journal, statement, chk, check, r2, ratios } from "../lib.mjs";

// Example 1: application and allotment, oversubscribed
const issued = 200000, par = 1, price = 1.3, appPer = 0.5, allotPer = 0.8, applied = 300000;
chk(appPer + allotPer, price);
const refundShares = applied - issued;
const appCash = r2(applied * appPer);
const refund = r2(refundShares * appPer);
const allotCash = r2(issued * allotPer);
const cap = r2(issued * par), prem = r2(issued * (price - par));
const dueOnAllot = r2(issued * price);
chk(cap + prem, dueOnAllot);
const bankT = tAccount("Bank account", [["Jan", "Application and allotment (application money)", appCash], ["Feb", "Application and allotment (allotment money)", allotCash]], [["Jan", "Application and allotment (refund)", refund]], { cdDate: "28 Feb", bdDate: "1 Mar" });
const aaT = tAccount("Application and allotment account", [["Jan", "Bank (refund of rejected applications)", refund], ["Feb", "Ordinary share capital", cap], ["Feb", "Share premium", prem]], [["Jan", "Bank (application money, 300,000 shares)", appCash], ["Feb", "Bank (allotment money, 200,000 shares)", allotCash]]);
const capT = tAccount("Ordinary share capital account", [], [["Feb", "Application and allotment", cap]], { balance: "auto", cdDate: "28 Feb", bdDate: "1 Mar" });
const premT = tAccount("Share premium account", [], [["Feb", "Application and allotment", prem]], { balance: "auto", cdDate: "28 Feb", bdDate: "1 Mar" });
const jr = journal([
  { date: "Jan", lines: [["Bank", appCash, null], ["Application and allotment", null, appCash]], narrative: "Application money received on 300,000 shares at US\\$0.50" },
  { date: "Jan", lines: [["Application and allotment", refund, null], ["Bank", null, refund]], narrative: "Refund to applicants for 100,000 shares not allotted" },
  { date: "Feb", lines: [["Application and allotment", dueOnAllot, null], ["Ordinary share capital", null, cap], ["Share premium", null, prem]], narrative: "Allotment of 200,000 shares at US\\$1.30 (par US\\$1)" },
  { date: "Feb", lines: [["Bank", allotCash, null], ["Application and allotment", null, allotCash]], narrative: "Allotment money received at US\\$0.80" },
], { title: "Journal" });
const aaDr = refund + dueOnAllot, aaCr = appCash + allotCash;
check("A&A balances", aaDr, aaCr);

// Excess application money carried to allotment (instead of refund)
const excess = r2(applied * appPer - issued * appPer);
const allotCashNet = r2(allotCash - excess);

// Example 2: issue at premium in full, effect on position and gearing
const sh = 100000, par2 = 0.5, price2 = 0.8;
const cap2 = r2(sh * par2), prem2 = r2(sh * (price2 - par2)), cash2 = r2(sh * price2);
const before = { sc: 300000, sp: 20000, re: 180000, loan: 150000, bank: 60000, other: 650000 - 60000 + 0 };
const e0 = r2(before.sc + before.sp + before.re);
const ce0 = r2(e0 + before.loan);
const after = { sc: before.sc + cap2, sp: before.sp + prem2, re: before.re, loan: before.loan, bank: before.bank + cash2 };
const ce1 = r2(after.sc + after.sp + after.re + after.loan);
const g0 = ratios.gearing(before.loan, before.sc + before.sp, before.re);
const g1 = ratios.gearing(after.loan, after.sc + after.sp, after.re);
chk(ce0, 650000);
chk(ce1, 650000 + cash2);
const sofp2 = statement("Extracts from the statement of financial position (US\\$)", [
  ["Cash and cash equivalents", before.bank, after.bank],
  ["Ordinary share capital (US\\$0.50 shares)", before.sc, after.sc],
  ["Share premium", before.sp, after.sp],
  ["Retained earnings", before.re, after.re],
  ["**Total equity**", e0, r2(after.sc + after.sp + after.re)],
  ["Loan notes (non-current)", before.loan, after.loan],
  ["**Capital employed**", ce0, ce1],
], { cols: ["Before the issue", "After the issue"], checks: [["ce1", ce1, ce0 + cash2]] });
const bank2 = tAccount("Bank account (issue proceeds)", [["1 Jul", "Applications for 100,000 shares at US\\$0.80", cash2]], [], { balance: false });
const cap2T = tAccount("Ordinary share capital account", [], [["1 Jul", "Bank: 100,000 shares at US\\$0.50", cap2]], { balance: false });
const prem2T = tAccount("Share premium account", [], [["1 Jul", "Bank: 100,000 shares × US\\$0.30", prem2]], { balance: false });

const body = `
## Introduction

Rusape Tools Ltd makes hoes, ploughs and tool handles for farmers. The company wants US\\$260,000 to buy a new forge, and the directors decide to invite the public to buy 200,000 new shares. Shares are not usually paid for in one amount. The company asks for part of the price with the **application**, and the rest when the shares are **allotted**. If more people apply than there are shares, the company must decide whom to allot to and send the rest their money back.

You know the equity section of the statement of financial position and the idea of share premium. This lesson shows how the ledger records the issue, how oversubscription and refunds are handled, what share premium may be used for and how the issue changes the statements and the gearing.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 (AS) |
| --- | --- |
| Share issue; applications and allotments | Issue of shares at par or at a premium |
| Oversubscription; scaling down | Oversubscribed issue; refund of application money |
| Application and allotment account | Application and allotment account (used when the question gives the instalments) |
:::

Both boards test this lesson. When a question gives the issue price in a single sum, use the bank, share capital and share premium accounts only.

## Key definitions

:::definition{term="Share premium"}
The amount by which the issue price of a share exceeds its nominal value. It is a capital reserve, credited when the shares are allotted.
:::

:::definition{term="Application and allotment"}
The two stages of an issue: the applicants send an application with a part of the price; the company then allots shares to the successful applicants, who pay the allotment money. One account usually records both.
:::

:::definition{term="Oversubscription"}
Applications for more shares than are on offer. The company allots the shares it chose and either refunds the unsuccessful applicants or uses the extra money against the allotment instalment.
:::

## The ledger entries

Work in order, and follow the money.

1. **Application money received:** debit Bank, credit Application and allotment account.
2. **Refund of rejected applications:** debit Application and allotment account, credit Bank.
3. **Allotment:** debit Application and allotment account with the total issue price of the shares allotted; credit Ordinary share capital with the nominal value and credit Share premium with the premium.
4. **Allotment money received:** debit Bank, credit Application and allotment account.

The Application and allotment account must balance after step 4. If it does not, a figure is wrong.

:::keyfact{title="Check"}
Total cash received from successful applicants = number of shares allotted × issue price = share capital + share premium.
:::

:::worked-solution[Example 1: an oversubscribed issue]
Rusape Tools Ltd issued ${F(issued)} ordinary shares of US\\$1 each at US\\$1.30. The terms were US\\$0.50 on application and US\\$0.80 on allotment (including the premium). Applications were received for ${F(applied)} shares. The directors allotted ${F(issued)} shares, rejected the other ${F(refundShares)} applications and refunded the money. All allotment money was received. Prepare the journal and the ledger accounts.

${jr}

${bankT}

${aaT}

${capT}

${premT}

Proceeds are US\\$${F(appCash - refund + allotCash)}, which equals ${F(issued)} shares × US\\$1.30. The share premium is US\\$${F(prem)}, equal to ${F(issued)} × US\\$0.30.
:::

**If the company does not refund.** Suppose the directors scale down the applications instead. The surplus application money of US\\$${F(excess)} (${F(refundShares)} × US\\$0.50) is then kept and credited against the allotment due. The allotment money received is US\\$${F(allotCashNet)}, instead of US\\$${F(allotCash)}, and there is no refund entry. The total received is still US\\$${F(dueOnAllot)}.

## Share premium and its uses

The premium is credited to a separate account because it is not part of the nominal capital. It is a capital reserve and cannot be paid out as a dividend. A company may use it to issue fully paid **bonus shares** to its shareholders, to write off the costs of the issue, and (ZIMSEC detail) to provide the premium payable on the redemption of shares. It is not used to pay ordinary dividends.

:::worked-solution[Example 2: effect of a share issue on equity and gearing]
Zvimba Dairy Ltd issues ${F(sh)} ordinary shares of US\\$0.50 each at US\\$0.80, all payable on application, and the issue is fully subscribed. Before the issue it had 600,000 shares of US\\$0.50 (US\\$${F(before.sc)} capital), share premium of US\\$${F(before.sp)}, retained earnings of US\\$${F(before.re)}, 8% loan notes of US\\$${F(before.loan)} and cash of US\\$${F(before.bank)}. Record the issue and show its effect on gearing.

${bank2}

${cap2T}

${prem2T}

${sofp2}

Gearing before the issue was ${g0.toFixed(1)}% (${F(before.loan)} ÷ ${F(ce0)}). After the issue the loan notes are the same, but capital employed has risen to US\\$${F(ce1)}, so gearing is ${g1.toFixed(1)}%. The cash from the issue is also the reason for the better liquidity. The company has no new fixed interest to pay, but the earnings are now shared among more shares.
:::

## Effect of a share issue

A share issue raises cash, share capital and, if it is at a premium, share premium. It has no effect on profit in the year of issue. It lowers gearing, because it adds to equity and not to debt, and it improves liquidity. It dilutes earnings per share, because the same profit is shared among more shares, unless the money earns a return. Compared with loan notes there is no fixed interest to pay and no repayment date.

## Common mistakes

:::mistake{title="Crediting all the proceeds to share capital"}
Only the nominal value goes to share capital. The amount above nominal value is share premium.
:::

:::mistake{title="Debiting the refund to share capital"}
The refund of rejected applications is debited to the Application and allotment account. Share capital is credited only for the shares allotted.
:::

:::mistake{title="Using all applications in the allotment entry"}
The allotment entry uses the shares allotted, not the shares applied for. Rejected applications never become shares.
:::

:::mistake{title="Treating share premium as profit"}
The premium is a capital reserve. It is not in the statement of profit or loss and cannot be paid as a dividend.
:::

## Exam tips

:::exam-tip
Share issue entries are tested in ZIMSEC Paper 2 and in Cambridge Papers 1 and 2. For *prepare the ledger accounts*, show the date or narrative of each entry and the balancing figure; check that the Application and allotment account balances. For *calculate*, state the shares allotted, the issue price and the premium per share.
:::

:::exam-tip
For *explain the effect of the issue*, name the changes: cash up, share capital up by the nominal value, share premium up by the premium, retained earnings unchanged, gearing down. For *evaluate* a share issue against loan notes, mention the lack of fixed interest and repayment, but also dilution of control and earnings per share.
:::

## Summary

:::summary
- Application money is debited to Bank and credited to Application and allotment; refunds reverse the entry for rejected applications.
- At allotment, debit Application and allotment with the full issue price and credit share capital (nominal) and share premium (excess).
- The Application and allotment account balances when all money due has been received.
- Share premium is a capital reserve; it can fund bonus shares and issue costs but not ordinary dividends.
- An issue raises cash and equity, lowers gearing and dilutes earnings per share.
:::
`;
writeLesson("company/share-issue.md", front("company.share-issue", "Issue of shares at par or at a premium", "Record an issue of ordinary shares at par or at a premium through bank, application and allotment, share capital and share premium accounts, handle oversubscription and refunds, and show the effect on the statements and gearing.", ["aacc.company.share-issue"], 55), body);
void table;
