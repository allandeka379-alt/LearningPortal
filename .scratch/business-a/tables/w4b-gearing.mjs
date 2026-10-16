// Writes lessons/ratios/gearing-investor.md from checked figures.
import { ratios, table, chk, r2, fmt } from "../lib.mjs";
import { lesson, D } from "./w4b-lib.mjs";

// Example 1: Kariba Lodges Ltd
const shares = 250000, reserves = 190000, ncl = 160000, nOrd = 500000, pfy = 90000, div = 40000, price = 1.6;
const ce = ratios.capitalEmployed(shares, reserves, ncl);
const gear = ratios.gearing(ncl, ce);
const dps = ratios.dividendPerShare(div, nOrd), eps = ratios.earningsPerShare(pfy, nOrd);
const dy = ratios.dividendYield(dps, price), dc = ratios.dividendCover(pfy, div), pe = ratios.priceEarnings(price, eps);
chk(ce, 600000); chk(gear, 26.6667, 1e-3); chk(dps, 0.08, 1e-9); chk(eps, 0.18, 1e-9); chk(dy, 5, 1e-9); chk(dc, 2.25, 1e-9); chk(pe, 8.8889, 1e-3);
const dataT = table(["Item", "Amount"], [["Issued shares (500,000 ordinary shares)", `${D}250,000`], ["Reserves", `${D}190,000`], ["Non-current liabilities", `${D}160,000`], ["Profit for the year", `${D}90,000`], ["Dividends for the year", `${D}40,000`], ["Market price per share", `${D}1.60`]], ["l", "r"]);
const res = table(["Ratio", "Working", "Result"], [
  ["Capital employed", "250,000 + 190,000 + 160,000", `${D}600,000`],
  ["Gearing", "160,000 ÷ 600,000 × 100", `${gear.toFixed(1)}%`],
  ["Dividend per share", "40,000 ÷ 500,000", "8 cents"],
  ["Earnings per share (ZIMSEC)", "90,000 ÷ 500,000", "18 cents"],
  ["Dividend yield", "0.08 ÷ 1.60 × 100", `${dy.toFixed(1)}%`],
  ["Dividend cover", "90,000 ÷ 40,000", `${dc.toFixed(2)} times`],
  ["Price/earnings", "1.60 ÷ 0.18", `${pe.toFixed(1)}`],
], ["l", "l", "r"]);
// Example 2: raising 100,000 by loan or shares
const gDebt = ratios.gearing(ncl + 100000, ce + 100000), gEq = ratios.gearing(ncl, ce + 100000);
chk(gDebt, 37.1429, 1e-3); chk(gEq, 22.8571, 1e-3);
const interest = 0.12 * 100000;
chk(interest, 12000);
const opts = table(["", "Raise US\\$100,000 by loan", "Raise US\\$100,000 by new shares"], [
  ["Issued shares (US\\$)", 250000, 350000], ["Reserves (US\\$)", 190000, 190000], ["Non-current liabilities (US\\$)", 260000, 160000], ["Capital employed (US\\$)", 700000, 700000],
  ["Gearing (%)", gDebt.toFixed(1), gEq.toFixed(1)], ["Extra annual cost", `${D}12,000 interest at 12%`, "Dividends on new shares (not compulsory)"],
], ["l", "r", "r"]);

const body = `
## Introduction

Kariba Lodges Ltd is a fictional company that owns a tourist lodge near Binga. The directors want to build ten more rooms and cannot decide between a bank loan and a new issue of shares. The bank manager asks, "How much of your capital is already borrowed?" Shareholders ask, "What do we earn on our shares, and how safe is the dividend?" **Gearing** answers the lender's question; the **investor ratios** answer the shareholders'.

This lesson is tested in ZIMSEC Business Studies and Business Enterprise Skills (Form 6) and in Cambridge **A Level** Paper 3 and Paper 4. You should know capital employed from the profitability lesson and the difference between debt and equity finance. The formulae below are those of the Cambridge appendix; ratios are not printed in question papers.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC | Cambridge |
| --- | --- |
| Capital structure ratio (BES); gearing; earnings per share (EPS); dividend yield; dividend cover; price/earnings ratio | Gearing ratio; dividend yield; dividend cover; price/earnings ratio (EPS is not in the Cambridge appendix) |

**Earnings per share is ZIMSEC detail.** The Cambridge price/earnings ratio is market price ÷ earnings per share, so the earnings per share are normally given or calculated as profit for the year ÷ number of ordinary shares.
:::

## Key definitions

:::definition{term="Gearing"}
The proportion of a company's capital employed that is provided by long-term borrowing.
:::

:::definition{term="Dividend yield"}
The annual dividend per share as a percentage of the current market price of the share.
:::

:::definition{term="Dividend cover"}
The number of times that the dividend could have been paid from the profit for the year.
:::

:::definition{term="Price/earnings ratio"}
The market price of a share divided by the earnings per share, showing how many years of current earnings investors are paying for.
:::

## The formulae

:::keyfact{title="Gearing and investor ratios"}
- Gearing (%) = non-current liabilities ÷ capital employed × 100, where capital employed = issued shares + reserves + non-current liabilities
- Earnings per share = profit for the year ÷ number of ordinary shares (ZIMSEC)
- Dividend per share = total dividend ÷ number of ordinary shares
- Dividend yield (%) = dividend per share ÷ market price per share × 100
- Dividend cover = profit for the year ÷ annual dividend (times)
- Price/earnings ratio = market price per share ÷ earnings per share
:::

## Gearing

A **highly geared** company (often described as above about 50%, though this varies) depends mainly on borrowing. Borrowing must be repaid with interest whatever the profit. **Advantages of high gearing:** loans do not dilute the owners' control; interest is a cost before tax; in a good year, shareholders keep all the profit above the interest. **Disadvantages:** interest must be paid even in a poor year; lenders may refuse more loans or demand security; a fall in profit may bring the company close to failure.

**Low gearing** is safer but may be less profitable for shareholders and may mean that the company is not using cheap finance for growth. Gearing is **improved** (lowered) by repaying loans, issuing shares, or keeping more profit as reserves; it is raised by borrowing, buying back shares or paying out more profit. Gearing is also changed by the choice between debt and equity for new projects.

## Investor ratios

Shareholders receive a return in two ways: **dividends** and a rise in the **share price**. The **dividend yield** compares the cash return with the price paid. The **dividend cover** shows how safe the dividend is: a cover of 2 means profit was twice the dividend; a cover below 1 means the company paid out more than it earned. A **high P/E** ratio means that the market expects growth or sees the company as low risk; a **low P/E** may mean that investors expect little growth, or see higher risk. A P/E has to be compared with the same industry and with the company's own history.

Investor return can be **improved** by raising profit, raising the dividend (which lowers the cover), raising confidence so the share price rises, or by a buy-back of shares. Each has a cost: a higher dividend leaves less for growth.

:::worked-solution[Example 1: calculating gearing and investor ratios]
**Context.** Data for Kariba Lodges Ltd (a fictional company) are below.

${dataT}

${res}

1. **Interpretation of gearing.** At ${gear.toFixed(1)}% the company is lower geared: about a quarter of its long-term capital is borrowed. It could borrow more without much risk.
2. **Interpretation of investor ratios.** A dividend yield of ${dy.toFixed(1)}% is the cash return on the price paid. Dividend cover of ${dc.toFixed(2)} times means the dividend is safe and about ${D}50,000 of profit was kept in the business. A P/E of ${pe.toFixed(1)} means investors are paying about 8.9 years of current earnings for a share.
3. **Judgement.** The dividend is well covered, so the directors could raise it, but the planned ten rooms need finance, so keeping profits may be better. The results come from one year and a share price that changes daily.
:::

:::worked-solution[Example 2: case analysis, debt or equity for the extension]
**Context.** The directors need ${D}100,000 and can borrow it at 12% or issue new shares. The table shows capital employed after each option (using the figures of Example 1).

${opts}

**Point.** Borrowing raises gearing from ${gear.toFixed(1)}% to ${gDebt.toFixed(1)}%, while a share issue lowers it to ${gEq.toFixed(1)}%.

**Application.** The loan adds ${D}12,000 of compulsory interest each year, and gearing would still be below 50%. The share issue adds no compulsory cost, but profit is shared among more shareholders, so earnings per share fall unless profit rises.

**Analysis.** The loan keeps the existing owners in control and earns them more per share if the extension earns more than 12% on the money. But the lodge's income depends on tourists, and in a poor season the ${D}12,000 must still be paid. The share issue is safer but dilutes earnings per share and ownership.

**Judgement.** With gearing at ${gDebt.toFixed(1)}% after the loan, borrowing is acceptable if the lodge expects stable bookings. If the tourist trade is unpredictable, a mix of the two, for example half by loan, would reduce risk. The decision depends on the forecast return, the owners' wish to keep control and the lender's terms.
:::

## Common mistakes

:::mistake{title="Using the wrong denominator for gearing"}
Gearing divides non-current liabilities by **capital employed** (shares + reserves + non-current liabilities), not by equity alone and not by total assets.
:::

:::mistake{title="Confusing dividend yield with dividend cover"}
Yield compares the dividend per share with the **market price**; cover compares the **profit** with the total dividend. They answer different questions.
:::

:::mistake{title="Assuming high gearing is always bad"}
High gearing raises risk but can raise returns to shareholders when profit is good. Judge it by the stability of profit, the interest rate and the company's cash flow.
:::

## Exam tips

:::exam-tip
ZIMSEC Business Studies Papers 1 and 2 and Business Enterprise Skills Papers 1 and 2 ask you to *calculate*, *state* and *discuss* gearing (capital structure) and the investor ratios; Cambridge Papers 3 and 4 ask you to *calculate*, *analyse*, *evaluate* and *advise*. Write the formula, show the working and round as asked. In evaluation, give both sides of high gearing and of changing the dividend, refer to the trend and to the type of business, and make a judgement with a condition.
:::

## Summary

:::summary
- Gearing = non-current liabilities ÷ capital employed × 100; it shows how much of the capital is borrowed.
- High gearing raises risk because interest is compulsory; low gearing is safer but may reduce growth or shareholders' returns.
- Dividend yield = dividend per share ÷ market price × 100; dividend cover = profit for the year ÷ dividend; P/E = price ÷ earnings per share (EPS is ZIMSEC detail).
- Gearing falls by repaying loans or issuing shares and rises by borrowing, with consequences for risk and control.
- Investor return can be improved by higher profit, a higher dividend (less cover) or higher confidence, each with a cost.
- Compare ratios with earlier years, rivals and the type of business before judging.
:::
`;
lesson("ratios/gearing-investor", { key: "ratios.gearing-investor", title: "Gearing and investor ratios: gearing, dividend yield, dividend cover and price/earnings", summary: "Calculating and interpreting gearing (capital structure), dividend yield, dividend cover, earnings per share and the price/earnings ratio, and judging ways of improving gearing and investor return.", concept: "abus.ratios.gearing-investor", minutes: 55 }, body);
