---
{
  "key": "company.share-issue",
  "title": "Issue of shares at par or at a premium",
  "summary": "Record an issue of ordinary shares at par or at a premium through bank, application and allotment, share capital and share premium accounts, handle oversubscription and refunds, and show the effect on the statements and gearing.",
  "concepts": [
    "aacc.company.share-issue"
  ],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

Rusape Tools Ltd makes hoes, ploughs and tool handles for farmers. The company wants US\$260,000 to buy a new forge, and the directors decide to invite the public to buy 200,000 new shares. Shares are not usually paid for in one amount. The company asks for part of the price with the **application**, and the rest when the shares are **allotted**. If more people apply than there are shares, the company must decide whom to allot to and send the rest their money back.

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
Rusape Tools Ltd issued 200,000 ordinary shares of US\$1 each at US\$1.30. The terms were US\$0.50 on application and US\$0.80 on allotment (including the premium). Applications were received for 300,000 shares. The directors allotted 200,000 shares, rejected the other 100,000 applications and refunded the money. All allotment money was received. Prepare the journal and the ledger accounts.

**Journal**

| Date | Details | Debit US\$ | Credit US\$ |
| --- | --- | ---: | ---: |
| Jan | Bank | 150,000 |  |
|  | Application and allotment |  | 150,000 |
|  | *Application money received on 300,000 shares at US\$0.50* |  |  |
| Jan | Application and allotment | 50,000 |  |
|  | Bank |  | 50,000 |
|  | *Refund to applicants for 100,000 shares not allotted* |  |  |
| Feb | Application and allotment | 260,000 |  |
|  | Ordinary share capital |  | 200,000 |
|  | Share premium |  | 60,000 |
|  | *Allotment of 200,000 shares at US\$1.30 (par US\$1)* |  |  |
| Feb | Bank | 160,000 |  |
|  | Application and allotment |  | 160,000 |
|  | *Allotment money received at US\$0.80* |  |  |

**Bank account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| Jan | Application and allotment (application money) | 150,000 | Jan | Application and allotment (refund) | 50,000 |
| Feb | Application and allotment (allotment money) | 160,000 | 28 Feb | Balance c/d | 260,000 |
|  |  | **310,000** |  |  | **310,000** |
| 1 Mar | Balance b/d | 260,000 |  |  |  |

**Application and allotment account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| Jan | Bank (refund of rejected applications) | 50,000 | Jan | Bank (application money, 300,000 shares) | 150,000 |
| Feb | Ordinary share capital | 200,000 | Feb | Bank (allotment money, 200,000 shares) | 160,000 |
| Feb | Share premium | 60,000 |  |  |  |
|  |  | **310,000** |  |  | **310,000** |

**Ordinary share capital account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 28 Feb | Balance c/d | 200,000 | Feb | Application and allotment | 200,000 |
|  |  | **200,000** |  |  | **200,000** |
|  |  |  | 1 Mar | Balance b/d | 200,000 |

**Share premium account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 28 Feb | Balance c/d | 60,000 | Feb | Application and allotment | 60,000 |
|  |  | **60,000** |  |  | **60,000** |
|  |  |  | 1 Mar | Balance b/d | 60,000 |

Proceeds are US\$260,000, which equals 200,000 shares × US\$1.30. The share premium is US\$60,000, equal to 200,000 × US\$0.30.
:::

**If the company does not refund.** Suppose the directors scale down the applications instead. The surplus application money of US\$50,000 (100,000 × US\$0.50) is then kept and credited against the allotment due. The allotment money received is US\$110,000, instead of US\$160,000, and there is no refund entry. The total received is still US\$260,000.

## Share premium and its uses

The premium is credited to a separate account because it is not part of the nominal capital. It is a capital reserve and cannot be paid out as a dividend. A company may use it to issue fully paid **bonus shares** to its shareholders, to write off the costs of the issue, and (ZIMSEC detail) to provide the premium payable on the redemption of shares. It is not used to pay ordinary dividends.

:::worked-solution[Example 2: effect of a share issue on equity and gearing]
Zvimba Dairy Ltd issues 100,000 ordinary shares of US\$0.50 each at US\$0.80, all payable on application, and the issue is fully subscribed. Before the issue it had 600,000 shares of US\$0.50 (US\$300,000 capital), share premium of US\$20,000, retained earnings of US\$180,000, 8% loan notes of US\$150,000 and cash of US\$60,000. Record the issue and show its effect on gearing.

**Bank account (issue proceeds)**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
| 1 Jul | Applications for 100,000 shares at US\$0.80 | 80,000 |  |  |  |

**Ordinary share capital account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
|  |  |  | 1 Jul | Bank: 100,000 shares at US\$0.50 | 50,000 |

**Share premium account**

| Date | Details | US\$ | Date | Details | US\$ |
| --- | --- | ---: | --- | --- | ---: |
|  |  |  | 1 Jul | Bank: 100,000 shares × US\$0.30 | 30,000 |

**Extracts from the statement of financial position (US\$)**

|  | Before the issue | After the issue |
| --- | ---: | ---: |
| Cash and cash equivalents | 60,000 | 140,000 |
| Ordinary share capital (US\$0.50 shares) | 300,000 | 350,000 |
| Share premium | 20,000 | 50,000 |
| Retained earnings | 180,000 | 180,000 |
| **Total equity** | 500,000 | 580,000 |
| Loan notes (non-current) | 150,000 | 150,000 |
| **Capital employed** | 650,000 | 730,000 |

Gearing before the issue was 23.1% (150,000 ÷ 650,000). After the issue the loan notes are the same, but capital employed has risen to US\$730,000, so gearing is 20.5%. The cash from the issue is also the reason for the better liquidity. The company has no new fixed interest to pay, but the earnings are now shared among more shares.
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
