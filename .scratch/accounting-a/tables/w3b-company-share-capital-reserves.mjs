// Lesson generator: company.share-capital-reserves (W3b)
import { writeLesson, front, F, U } from "./w3b-lib.mjs";
import { table, statement, check, sum, r2, chk } from "../lib.mjs";

// Example 1: classification and the equity section
const auth = 600000, issued = 400000, sp = 60000, rev = 45000, gen = 30000, re = 95000;
const equity1 = r2(issued + sp + rev + gen + re);
chk(equity1, 630000);
const nonDist1 = r2(sp + rev); // capital reserves here
const dist1 = r2(gen + re);
const classif = table(["Item", "Type", "Distributable as a dividend?"], [
  ["Ordinary share capital US\\$" + F(issued), "Share capital", "No"],
  ["Share premium US\\$" + F(sp), "Capital reserve", "No"],
  ["Revaluation reserve US\\$" + F(rev), "Capital reserve (unrealised gain)", "No"],
  ["General reserve US\\$" + F(gen), "Revenue reserve", "Yes"],
  ["Retained earnings US\\$" + F(re), "Revenue reserve", "Yes"],
], ["l", "l", "l"]);
const eqMd = statement("Equity section of the statement of financial position at 31 December 2025", [
  ["Ordinary shares of US\\$1 each, fully paid", issued],
  ["Share premium", sp],
  ["Revaluation reserve", rev],
  ["General reserve", gen],
  ["Retained earnings", re],
  ["**Total equity**", equity1],
], { cols: [U], checks: [["equity", equity1, issued + sp + rev + gen + re]] });

// Example 2: movements in 2026
const profit = 82000, toGen = 10000, interimPerShare = 0.04, finalAmt = 20000;
const interim = r2(issued * interimPerShare);
chk(interim, 16000);
const reClose = r2(re + profit - toGen - interim - finalAmt);
chk(reClose, 131000);
const genClose = r2(gen + toGen);
const totalClose = r2(issued + sp + rev + genClose + reClose);
const sce = statement("Statement of changes in equity for the year ended 31 December 2026 (US\\$)", [
  ["Balance at 1 January 2026", issued, sp, rev, gen, re, equity1],
  ["Profit for the year", null, null, null, null, profit, profit],
  ["Transfer to general reserve", null, null, null, toGen, -toGen, 0],
  ["Interim dividend paid (4 cents per share)", null, null, null, null, -interim, -interim],
  ["Final dividend declared (before 31 December)", null, null, null, null, -finalAmt, -finalAmt],
  ["**Balance at 31 December 2026**", issued, sp, rev, genClose, reClose, totalClose],
], { cols: ["Share capital", "Share premium", "Revaluation reserve", "General reserve", "Retained earnings", "Total"], checks: [["closing total", totalClose, equity1 + profit - interim - finalAmt]] });
const dist2 = r2(genClose + reClose);

const body = `
## Introduction

Chipo and four friends form Karoi Tobacco Equipment Ltd to sell drying barns and spare parts to farmers around Karoi. They each pay in cash for shares, the company later earns profits, and some of the profits are paid out to the shareholders while the rest is kept in the business. The statement of financial position must show who provided the money and what the owners are entitled to. This part is called **equity**: the share capital together with the reserves.

You already know that a company is a separate legal entity and that its statement of profit or loss ends with profit for the year. This lesson explains the classes of shares and reserves and the rules for dividends. It leads into the issue of shares, bonus and rights issues and the redemption of shares.

:::keyfact{title="ZIMSEC and Cambridge terms"}
| ZIMSEC (syllabus and common usage) | Cambridge 9706 |
| --- | --- |
| Ordinary and preference shares | Ordinary shares (preference shares are not examined in Cambridge questions) |
| Retained profits; profit and loss account balance | Retained earnings |
| Called-up capital; issued capital | Issued share capital |
| Proposed dividend | Final dividend declared (a liability only if declared before the year end) |
:::

**Preference shares are ZIMSEC detail.** They carry a fixed rate of dividend that is paid before any ordinary dividend; cumulative preference shares carry forward any unpaid dividend. Cambridge items use only ordinary shares.

## Key definitions

:::definition{term="Authorised share capital"}
The maximum nominal value of shares that a company is allowed to issue under its constitution.
:::

:::definition{term="Issued share capital"}
The nominal value of the shares that have actually been issued to shareholders. When all the money has been received the shares are **fully paid**; the amount asked for from shareholders is the called-up capital.
:::

:::definition{term="Nominal (par) value"}
The fixed value printed on each share, such as US\\$1. It is not the market price and not the price at which the shares were sold if a premium was charged.
:::

:::definition{term="Reserve"}
A part of equity other than share capital. Capital reserves (such as share premium and the revaluation reserve) arise from capital transactions and cannot be paid out as dividends. Revenue reserves (such as the general reserve and retained earnings) come from retained profits and may be distributed.
:::

## Share capital

A company's constitution fixes the authorised capital. The directors issue shares up to that limit, and only the issued shares appear in the statement of financial position, with the authorised capital shown in a note. The nominal value of a share is fixed, but the market price rises and falls with the company's prospects. The shareholders own the company, receive dividends when the directors declare them and may vote at meetings. Ordinary shareholders have the last claim on the assets if the company closes, so their return is uncertain but unlimited.

## Dividends

An **interim dividend** is paid part-way through the year, usually on the strength of the profit to date. A **final dividend** is recommended by the directors after the year end and approved by the shareholders at the annual general meeting. A dividend is a distribution of profit, not an expense, and it is shown in the statement of changes in equity, not in the statement of profit or loss.

A dividend is a liability only when it has been declared. An interim dividend that has been paid is deducted from retained earnings. A final dividend that is declared before the year end but unpaid is shown as a current liability. A final dividend recommended after the year end is not a liability at the year end and is only disclosed in a note.

## Capital and revenue reserves

:::worked-solution[Example 1: classification and the equity section]
Karoi Tobacco Equipment Ltd has an authorised share capital of ${F(auth)} ordinary shares of US\\$1 each, of which ${F(issued)} have been issued and are fully paid. At 31 December 2025 it also has a share premium of US\\$${F(sp)}, a revaluation reserve of US\\$${F(rev)}, a general reserve of US\\$${F(gen)} and retained earnings of US\\$${F(re)}. Classify each item and prepare the equity section of the statement of financial position.

${classif}

${eqMd}

The distributable reserves (revenue reserves) are US\\$${F(dist1)} (general reserve plus retained earnings). The share premium and the revaluation reserve, US\\$${F(nonDist1)} in total, cannot be paid out as dividends. Authorised capital of ${F(auth)} shares is a note; only ${F(issued)} shares are in the statement.
:::

Retained earnings are the profits kept in the business since it began. A **general reserve** is an amount the directors transfer out of retained earnings, to show that it is kept for expansion. The transfer does not move any cash: it only changes the label. Other reserves are created by events: **share premium** when shares are sold above nominal value; the **revaluation reserve** when non-current assets are revalued above their carrying amount; and the **capital redemption reserve** when a company redeems shares from profits (the redemption lesson).

:::worked-solution[Example 2: movements in reserves and the statement of changes in equity]
In 2026 Karoi Tobacco Equipment Ltd made a profit for the year of US\\$${F(profit)}. The directors transferred US\\$${F(toGen)} to the general reserve, paid an interim dividend of 4 cents per share on ${F(issued)} shares and declared a final dividend of US\\$${F(finalAmt)} before the year end. The final dividend was unpaid at 31 December 2026. Prepare the statement of changes in equity and state the amount available for distribution.

${sce}

Retained earnings fall to US\\$${F(reClose)}: ${F(re)} + ${F(profit)} - ${F(toGen)} - ${F(interim)} - ${F(finalAmt)}. The final dividend of US\\$${F(finalAmt)} is a current liability at 31 December 2026. Distributable reserves are US\\$${F(dist2)} (general reserve ${F(genClose)} plus retained earnings ${F(reClose)}). Share capital, share premium and the revaluation reserve do not change.
:::

## Distributable and non-distributable reserves

Only distributable reserves may be paid out as dividends. This protects the creditors of a limited company: the capital contributed by the shareholders and unrealised gains such as a revaluation cannot be handed back to the owners while the company still owes money. A company that pays a dividend larger than its distributable profits is breaking this rule. Notice that the revaluation reserve is a gain on paper: the asset has not been sold, so there is no cash to pay it out.

## Common mistakes

:::mistake{title="Deducting dividends in the statement of profit or loss"}
Dividends are a share of profit, not an expense. They reduce retained earnings in the statement of changes in equity.
:::

:::mistake{title="Including authorised capital in the equity section"}
Only issued shares are part of equity. Authorised share capital is a note, because it is only a limit on what may be issued.
:::

:::mistake{title="Treating a transfer to the general reserve as a cash outflow"}
A transfer moves an amount from retained earnings to another reserve. No cash leaves the business and total equity does not change.
:::

:::mistake{title="Treating a proposed dividend after the year end as a liability"}
A dividend is a liability only when it has been declared before the year end. Otherwise it is disclosed in a note.
:::

## Exam tips

:::exam-tip
Share capital and reserves are tested in ZIMSEC Papers 1 and 2 and in Cambridge Papers 1 and 2 (AS content). For *prepare* the equity section, list the share capital, then the reserves, and total them; check that the total ties to the net assets. For *classify* or *explain*, say whether a reserve is capital or revenue and whether it is distributable.
:::

:::exam-tip
For *calculate* a dividend, say which shares and which rate you used (for example 4 cents on 400,000 shares). For *explain why a company cannot pay a dividend from the revaluation reserve*, say the gain is unrealised and the reserve protects creditors. Preference shares are for ZIMSEC only; do not mention them for Cambridge answers.
:::

## Summary

:::summary
- Equity is share capital plus reserves; only issued shares are in the statement, authorised capital is a note.
- Capital reserves (share premium, revaluation reserve) are not distributable; revenue reserves (general reserve, retained earnings) are.
- Dividends reduce retained earnings; a final dividend is a liability only if declared before the year end.
- A transfer to a general reserve changes the label of equity, not the total or the cash.
- Preference shares, with a fixed dividend paid before the ordinary dividend, are ZIMSEC detail.
:::
`;
writeLesson("company/share-capital-reserves.md", front("company.share-capital-reserves", "Share capital, dividends and reserves", "Distinguish classes of shares and the terms authorised, issued and par value, treat interim and final dividends, classify capital and revenue reserves, and prepare the equity section and statement of changes in equity.", ["aacc.company.share-capital-reserves"], 50), body);
void check; void sum;
