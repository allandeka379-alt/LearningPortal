// Lesson generator: ratios.investment (W3b)
import { writeLesson, front, F } from "./w3b-lib.mjs";
import { table, ratios, chk } from "../lib.mjs";

const p1 = (v) => v.toFixed(1);
const p2 = (v) => v.toFixed(2);
const inv = ({ profit, shares, dividend, price }) => {
  const eps = ratios.earningsPerShare(profit, shares) * 100; // cents
  const dps = ratios.dividendPerShare(dividend, shares) * 100; // cents
  return { eps, dps, pe: ratios.priceEarnings(price * 100, eps), yld: ratios.dividendYield(dps, price * 100), cover: ratios.dividendCover(profit, dividend), ey: ratios.earningsYield(eps, price * 100) };
};
const A = { profit: 65000, shares: 500000, dividend: 30000, price: 1.95 };
const B = { profit: 78000, shares: 500000, dividend: 35000, price: 2.4 };
const a = inv(A), b = inv(B);
const t1 = table(["Ratio", "Formula", "2024 working", "2025 working", "2024", "2025"], [
  ["Earnings per share", "profit for the year ÷ number of ordinary shares", `${F(A.profit)} ÷ ${F(A.shares)}`, `${F(B.profit)} ÷ ${F(B.shares)}`, p1(a.eps) + " cents", p1(b.eps) + " cents"],
  ["Price/earnings ratio", "market price ÷ earnings per share", `${(A.price * 100).toFixed(0)} ÷ ${p1(a.eps)}`, `${(B.price * 100).toFixed(0)} ÷ ${p1(b.eps)}`, p1(a.pe) + " times", p1(b.pe) + " times"],
  ["Dividend per share", "ordinary dividend ÷ number of ordinary shares", `${F(A.dividend)} ÷ ${F(A.shares)}`, `${F(B.dividend)} ÷ ${F(B.shares)}`, p1(a.dps) + " cents", p1(b.dps) + " cents"],
  ["Dividend yield", "dividend per share ÷ market price × 100", `${p1(a.dps)} ÷ ${(A.price * 100).toFixed(0)} × 100`, `${p1(b.dps)} ÷ ${(B.price * 100).toFixed(0)} × 100`, p1(a.yld) + "%", p1(b.yld) + "%"],
  ["Dividend cover", "profit for the year ÷ ordinary dividend", `${F(A.profit)} ÷ ${F(A.dividend)}`, `${F(B.profit)} ÷ ${F(B.dividend)}`, p1(a.cover) + " times", p1(b.cover) + " times"],
  ["Earnings yield (ZIMSEC)", "earnings per share ÷ market price × 100", `${p1(a.eps)} ÷ ${(A.price * 100).toFixed(0)} × 100`, `${p1(b.eps)} ÷ ${(B.price * 100).toFixed(0)} × 100`, p1(a.ey) + "%", p1(b.ey) + "%"],
], ["l", "l", "l", "l", "r", "r"]);

const X = { profit: 60000, shares: 250000, dividend: 20000, price: 3.6 };
const Y = { profit: 72000, shares: 400000, dividend: 48000, price: 1.35 };
const x = inv(X), y = inv(Y);
const t2 = table(["Ratio", "Company X", "Company Y"], [
  ["Earnings per share (cents)", p1(x.eps), p1(y.eps)],
  ["Price/earnings ratio (times)", p1(x.pe), p1(y.pe)],
  ["Dividend per share (cents)", p1(x.dps), p1(y.dps)],
  ["Dividend yield (%)", p1(x.yld), p1(y.yld)],
  ["Dividend cover (times)", p1(x.cover), p1(y.cover)],
]);
const bonusShares = (X.shares * 1) / 5;
const newShares = X.shares + bonusShares;
const epsAfter = (X.profit / newShares) * 100;
chk(epsAfter, 20, 1e-9);

const body = `
## Introduction

Farai Mutasa has saved US\\$2,000 and wants to buy shares on the Victoria Falls Stock Exchange. She has shortlisted two companies and wants to know which gives the better return for the price. Directors, lenders and shareholders judge a company on its profit and its safety; **investment ratios** (also called stock exchange ratios) add the investor's view: what does one share earn, what does it pay and how much does the market charge for it?

These ratios use figures per share. You should be able to prepare a company statement of profit or loss and statement of changes in equity and to describe the different kinds of share. The calculations in this lesson use **ordinary shares only**. This lesson is Cambridge A Level (Paper 3) and ZIMSEC Form 6 content.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 (A Level) |
| --- | --- |
| Earnings per share (EPS) | Earnings per share = profit for the year ÷ number of ordinary shares in issue |
| Price/earnings ratio (P/E) | Price/earnings ratio = market price ÷ earnings per share |
| Dividend per share; dividend yield; dividend cover | The same names and formulae |
| Earnings yield | Not in the Cambridge appendix |
:::

**ZIMSEC detail:** earnings yield. When a ZIMSEC question includes preference shares, EPS is based on profit after the preference dividend; Cambridge sets no questions on preference shares, so all profit for the year belongs to the ordinary shareholders in this lesson.

## Key definitions

:::definition{term="Earnings per share (EPS)"}
The profit for the year that belongs to each ordinary share, found by dividing profit for the year by the number of ordinary shares in issue. It is normally quoted in cents.
:::

:::definition{term="Price/earnings ratio"}
The market price of a share divided by its earnings per share. It shows how many years of current earnings investors are paying for.
:::

:::definition{term="Dividend yield"}
The dividend per share as a percentage of the market price of the share. It is the cash return on the price paid.
:::

:::definition{term="Dividend cover"}
The number of times the profit for the year covers the ordinary dividend. It shows how safe the dividend is and how much profit is kept.
:::

## The formulae

:::keyfact{title="Investment ratio formulae"}
- Earnings per share = profit for the year ÷ number of ordinary shares in issue
- Price/earnings ratio = market price per share ÷ earnings per share (both in the same units)
- Dividend per share = annual ordinary dividend ÷ number of ordinary shares in issue
- Dividend yield = dividend per share ÷ market price per share × 100
- Dividend cover = profit for the year ÷ annual ordinary dividend
- Earnings yield (ZIMSEC) = earnings per share ÷ market price per share × 100
:::

Keep the units straight. Convert the market price from dollars to cents before dividing by an EPS in cents (US\\$1.95 is 195 cents), or convert both to dollars. The **number of shares** is the number issued, not the nominal amount in dollars: 500,000 shares of US\\$1 each is 500,000 shares, but 500,000 shares of 50 cents each is still 500,000 shares and the nominal capital is half as much. Use the **annual** dividend: interim plus final for the year.

:::worked-solution[Example 1: Nyanga Orchards Ltd, two years]
Nyanga Orchards Ltd has 500,000 ordinary shares in issue. The profit for the year was US\\$${F(A.profit)} in 2024 and US\\$${F(B.profit)} in 2025. Ordinary dividends for the year were US\\$${F(A.dividend)} and US\\$${F(B.dividend)}. The market price of a share at the year end was US\\$${A.price.toFixed(2)} in 2024 and US\\$${B.price.toFixed(2)} in 2025. Calculate the investment ratios and comment.

${t1}
:::

Earnings per share rose by ${p1(((b.eps - a.eps) / a.eps) * 100)}% and the dividend per share by ${p1(((b.dps - a.dps) / a.dps) * 100)}%. The market price rose faster than earnings, from ${p1(a.pe)} to ${p1(b.pe)} times earnings, so investors are paying a little more for each cent of profit. They expect growth to continue or regard the company as safer. The dividend yield stayed near 3%: an investor in the shares is relying on growth in the price, not on the dividend, for most of the return. Dividend cover of about ${p1(b.cover)} times means the company keeps more than half of its profit for expansion.

:::worked-solution[Example 2: choosing between two companies, and a bonus issue]
Company X has ${F(X.shares)} ordinary shares, profit for the year of US\\$${F(X.profit)}, ordinary dividends of US\\$${F(X.dividend)} and a share price of US\\$${X.price.toFixed(2)}. Company Y has ${F(Y.shares)} ordinary shares, profit for the year of US\\$${F(Y.profit)}, ordinary dividends of US\\$${F(Y.dividend)} and a share price of US\\$${Y.price.toFixed(2)}. Calculate the ratios, advise Farai, and show the effect on Company X's EPS of a bonus issue of one new share for every five held.

${t2}

Y pays out ${p1((Y.dividend / Y.profit) * 100)}% of its profit and offers a yield of ${p1(y.yld)}%, against ${p1(x.yld)}% for X. For an investor who wants income, Y is better. However, its cover of only ${p1(y.cover)} times leaves little margin if profit falls, and the low P/E of ${p1(y.pe)} times shows that the market is cautious about its future. X retains two-thirds of its profit, has a higher P/E (the market expects growth) and a safer dividend. For an investor who wants growth and a safe dividend, X is better. The choice depends on what Farai wants.

**Bonus issue.** One new share for every five held creates ${F(bonusShares)} new shares, so X would have ${F(newShares)} shares. Profit is unchanged, so EPS falls from ${p1(x.eps)} cents to ${p1(epsAfter)} cents, a fall of one-sixth. Nothing has been lost: each shareholder holds six shares in place of five, the market price should fall in proportion and the earlier year's EPS is restated on the same basis so that the years can still be compared.
:::

## Reading the ratios

- **EPS** is a measure of performance. A rise means more profit per share, but compare it with the earlier year on a consistent number of shares. EPS alone says nothing about the price paid.
- **P/E** is a measure of confidence. A high P/E means investors expect growth or low risk; a low P/E means they expect little or see high risk. Compare companies in the same industry.
- **Dividend yield** is the cash return. Growing companies often pay a low yield because they keep profit to expand.
- **Dividend cover** shows safety. High cover means the dividend is well covered and most of the profit is kept. Cover below 1 means the dividend is paid out of past profits.
- **Earnings yield** (ZIMSEC) is the inverse view of the P/E: the profit earned for each dollar of market price.

Every ratio is limited. Market prices change daily and can be affected by rumours; EPS can be changed by accounting policies; the ratios say nothing about the quality of management, and a high dividend can be a sign of trouble if it cannot be kept up. Use them with the other ratios and with the context.

## Common mistakes

:::mistake{title="Mixing cents and dollars"}
If EPS is in cents the market price must also be in cents before calculating the P/E. A P/E of 0.15 or 1,500 shows that the units differ.
:::

:::mistake{title="Using the nominal capital instead of the number of shares"}
EPS divides by the **number** of shares in issue. A company with US\\$250,000 of 50-cent shares has 500,000 shares.
:::

:::mistake{title="Using total dividends in the yield"}
Dividend yield uses the dividend per share. Divide the ordinary dividend by the number of shares first.
:::

:::mistake{title="Calling a high P/E good or bad without context"}
A high P/E shows market confidence, but also means the shares are expensive. Say what it suggests and what it costs the buyer.
:::

## Exam tips

:::exam-tip
Investment ratios appear in Cambridge Paper 3 and ZIMSEC Papers 2 and 3. For *calculate*, give the formula, the figures and the answer in the right unit (cents, times or %). For *comment*, say what the ratio means to an investor, give the direction of change and a likely cause.
:::

:::exam-tip
For *advise an investor*, ask what the investor wants. Income points to dividend yield and cover; growth points to EPS growth and P/E. Support the advice with two or three figures and mention a limit such as the use of one year's market price.
:::

## Summary

:::summary
- EPS = profit for the year ÷ ordinary shares in issue; P/E = market price ÷ EPS in the same units.
- Dividend per share = ordinary dividend ÷ shares; yield = dividend per share ÷ market price × 100; cover = profit ÷ ordinary dividend.
- Earnings yield (EPS ÷ market price × 100) is ZIMSEC detail.
- High P/E shows confidence in growth; high yield with low cover shows risk to the dividend.
- A bonus issue lowers EPS but does not lower the shareholders' wealth; restate earlier EPS for comparison.
:::
`;
writeLesson("ratios/investment.md", front("ratios.investment", "Investment ratios for shareholders", "Calculate earnings per share, price/earnings, dividend per share, dividend yield and dividend cover (and the ZIMSEC earnings yield), advise investors and see the effect of a bonus issue on EPS.", ["aacc.ratios.investment"], 50), body);
void ratios;
