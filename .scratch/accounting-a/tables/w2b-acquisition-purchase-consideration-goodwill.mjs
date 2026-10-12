// Lesson: acquisition.purchase-consideration-goodwill
import { money, fmt, chk, r2, sum, table, statement } from "../lib.mjs";
import { writeLesson, U } from "./w2b-lib.mjs";

// Example 1: Maposa Traders bought by Zambezi Builders Ltd
const items = [
  ["Premises", 70000, 85000], ["Equipment", 24000, 20000], ["Inventory", 18000, 17000], ["Trade receivables (net of allowance)", 12000, 11000], ["Trade payables", -9000, -9000],
];
const bookNet = sum(items.map((x) => x[1]));
const agreedNet = chk(sum(items.map((x) => x[2])), 124000);
const t1 = table(["Item", `Book value ${U}`, `Agreed value ${U}`], [...items.map((x) => [x[0], x[1], x[2]]), ["**Net assets taken over**", `**${fmt(bookNet)}**`, `**${fmt(agreedNet)}**`]], ["l", "r", "r"]);
const cash1 = 40000, shares1 = { n: 30000, par: 1, price: 1.5 }, notes1 = 50000;
const shareVal1 = chk(shares1.n * shares1.price, 45000);
const consid1 = chk(cash1 + shareVal1 + notes1, 135000);
const gw1 = chk(consid1 - agreedNet, 11000);
const t2 = statement("Purchase consideration and goodwill", [
  ["Cash", cash1], [`30,000 ordinary shares of US\\$1 issued at US\\$1.50`, shareVal1], ["Loan notes", notes1], ["Purchase consideration", consid1], ["Less net assets taken over at agreed values", -agreedNet], ["Goodwill", gw1],
], { cols: [U], checks: [["consideration", cash1 + shareVal1 + notes1, consid1], ["goodwill", consid1 - agreedNet, gw1]] });

// Example 2: effect of the share value; bargain purchase
const na2 = 82000, sh2 = 20000, notes2 = 24000;
const consA = sh2 * 2.6 + notes2, consB = sh2 * 3.1 + notes2;
const rA = chk(na2 - consA, 6000); // gain
const rB = chk(consB - na2, 4000); // goodwill
const t3 = table(["", `Shares valued at US\\$2.60 (${U})`, `Shares valued at US\\$3.10 (${U})`], [
  ["20,000 ordinary shares", sh2 * 2.6, sh2 * 3.1], ["Loan notes", notes2, notes2], ["Purchase consideration", consA, consB], ["Net assets taken over at agreed values", na2, na2],
  ["**Result**", `**Gain on bargain purchase ${fmt(rA)}**`, `**Goodwill ${fmt(rB)}**`],
], ["l", "r", "r"]);

const body = `
## Introduction

Masvingo Agro Ltd, a limited company, wants to grow its poultry feed business. Instead of building a new mill, its directors offer to buy Maposa Traders, a feed business in the same town with a loyal group of customers, trained staff and a good site. They must decide what the business is worth, what to pay and in what form. This lesson covers how the price is built up and how the goodwill is found. The next lessons record the purchase in the books of the seller and of the buyer.

The topic is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should already know how to find the net assets of a business and how a company issues shares at a premium.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **purchase consideration**, **goodwill**, **loan notes**, **debtors**, **creditors**. Cambridge: **purchase consideration**, **goodwill**, **debentures / loan notes**, **trade receivables**, **trade payables**. Preference shares as consideration: ZIMSEC only. The calculation is the same on both papers.
:::

## Key definitions

:::definition{term="Purchase consideration"}
The total value given by the buyer for the business taken over: cash, shares, loan notes or a mixture, measured at the values at the date of acquisition.
:::

:::definition{term="Net assets acquired"}
The assets taken over at their agreed (fair) values, less the liabilities taken over.
:::

:::definition{term="Purchased goodwill"}
The amount by which the purchase consideration exceeds the net assets acquired. It is recorded as an intangible asset because it was bought.
:::

## Why businesses acquire others

- **Growth and market share:** a larger share of the market is obtained at once instead of over several years.
- **New markets or products:** the buyer gains customers or products it does not have.
- **Skills and experience:** trained staff and managers come with the business.
- **Economies of scale:** buying and production costs per unit fall as volumes increase.
- **Removing a competitor:** the number of rivals falls.

The risks include paying too much, losing key staff after the takeover and the cost of combining two ways of working.

## Buying a business or buying assets

A buyer may buy the **whole business** or just chosen **individual assets**. Buying the business as a going concern brings customers, staff, the trading name and, if the price is high enough, goodwill, but also all the liabilities agreed in the deal. Buying individual assets lets the buyer choose what it needs and avoid liabilities, but no goodwill is bought and customers, staff and contracts do not transfer. Only a business bought as a whole can have purchased goodwill in its books.

## The purchase consideration

The consideration may be paid in:

| Form | What the buyer records | Effect on the buyer |
| --- | --- | --- |
| Cash | Bank reduced | Reduces liquidity |
| Shares | Share capital at par and share premium for the excess | Dilutes existing owners, no cash leaves |
| Loan notes | Non-current liability | Interest must be paid; borrowing rises |
| A mixture | Each element as above | Balances cash, control and borrowing |

Shares are valued at the **price at which they are issued** (or their market value at the date of acquisition, as the question states), not at their par value. If 30,000 shares of US\\$1 are issued at US\\$1.50, the consideration is 45,000, of which 30,000 is share capital and 15,000 share premium.

## Net assets and goodwill

The buyer values each asset and liability at an **agreed (fair) value**, which can differ from the seller's book value: premises may be worth more, obsolete inventory less, doubtful receivables are reduced. Cash is often left with the seller. Then:

:::keyfact
Goodwill = purchase consideration − net assets acquired at agreed values. If the consideration is **less** than the net assets, the difference is a gain on a bargain purchase.
:::

:::worked-solution[Example 1: consideration and goodwill for Maposa Traders]
Masvingo Agro Ltd buys the business of Maposa Traders. The company takes over the premises, equipment, inventory, receivables and payables, but not the bank balance. The agreed values are:

${t1}

Masvingo Agro Ltd pays ${money(cash1)} in cash, issues 30,000 ordinary shares of US\\$1 at US\\$1.50 and gives ${money(notes1)} of loan notes.

1. Shares: 30,000 × 1.50 = 45,000 (share capital 30,000; share premium 15,000).
2. Consideration: 40,000 + 45,000 + 50,000 = 135,000.
3. Net assets at agreed values: 124,000.
4. Goodwill: 135,000 − 124,000 = 11,000.

${t2}

The book values of the seller (net assets 115,000) are irrelevant to the buyer's goodwill; only the agreed values count.
:::

## The value of the shares matters

When shares are part of the consideration, their value at the date of the acquisition changes the answer: the same deal looks cheaper or dearer to the seller depending on what the shares are worth.

:::worked-solution[Example 2: the same deal with different share values]
A company takes over the net assets of a hardware business with agreed values of ${money(na2)}. It pays 20,000 ordinary shares and ${money(notes2)} of loan notes. Compare two values for the shares.

${t3}

1. At US\\$2.60: consideration 52,000 + 24,000 = 76,000, which is below the net assets of 82,000. The difference of 6,000 is a **gain on a bargain purchase**. In outline, the buyer first checks that all assets and liabilities have been identified and valued correctly; only then is the gain recorded in profit.
2. At US\\$3.10: consideration 62,000 + 24,000 = 86,000, which is above the net assets by 4,000. That is **goodwill**.
:::

## Goodwill in the buyer's statements

Purchased goodwill is an intangible non-current asset. It is shown in the statement of financial position at cost less any impairment. Under IAS 38 (intangible assets) internally generated goodwill, such as a good reputation the business built itself, is **never** recorded; only purchased goodwill is. A review for impairment (IAS 36) is made at least once a year; an impairment loss is an expense in the statement of profit or loss and reduces the carrying amount.

## Common mistakes

:::mistake{title="Using book values of the seller"}
Goodwill is found from the **agreed** values of the assets and liabilities, not from the seller's book values.
:::

:::mistake{title="Valuing shares at par"}
Shares issued above par are worth their issue price. Using the nominal value understates the consideration and the goodwill.
:::

:::mistake{title="Including the bank balance when it is left with the seller"}
Only the assets and liabilities that the buyer takes over are part of the net assets acquired.
:::

:::mistake{title="Recording internally generated goodwill"}
Only goodwill that has been **bought** is recognised. A business may not put its own good name in its statement of financial position.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic. With **calculate**, build the consideration line by line, the net assets at agreed values and then the difference. With **explain** or **advise**, give reasons for the acquisition and a risk (price, staff, borrowing) and tie the answer to the figures. With **evaluate**, compare how each form of payment affects the buyer's cash, control and gearing.
:::

## Summary

:::summary
- Purchase consideration is the value of cash, shares and loan notes given; shares are valued at their issue price.
- Net assets acquired are the assets and liabilities taken over, at agreed values.
- Goodwill = consideration − net assets acquired; a negative result is a gain on a bargain purchase.
- Buying a business as a whole brings goodwill and its liabilities; buying individual assets does not.
- Only purchased goodwill is recorded (IAS 38); it is reviewed for impairment (IAS 36).
- Reasons for acquisition: growth, markets, skills, economies of scale and removing a competitor.
:::
`;

writeLesson("acquisition/purchase-consideration-goodwill", {
  key: "acquisition.purchase-consideration-goodwill",
  title: "Business purchase: consideration and goodwill",
  summary: "Work out the purchase consideration for a business taken over, value the net assets at agreed values and calculate goodwill or a gain on a bargain purchase.",
  concepts: ["aacc.acquisition.purchase-consideration-goodwill"],
  estimatedMinutes: 45,
}, body);
