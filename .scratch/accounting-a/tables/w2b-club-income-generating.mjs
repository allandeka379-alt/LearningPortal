// Lesson: club.income-generating
import { money, fmt, chk, r2, sum, tAccount, statement } from "../lib.mjs";
import { writeLesson, U } from "./w2b-lib.mjs";

// Example 1: bar
const bar = { sales: 14800, invO: 1250, invC: 1420, paid: 9600, payO: 800, payC: 1150, wagesPaid: 2100, wagesAccC: 140 };
const purchases = chk(bar.paid + bar.payC - bar.payO, 9950);
const cos = chk(bar.invO + purchases - bar.invC, 9780);
const gp = chk(bar.sales - cos, 5020);
const wages = chk(bar.wagesPaid + bar.wagesAccC, 2240);
const profit = chk(gp - wages, 2780);
const creditors = tAccount("Bar suppliers (trade payables) account",
  [["31 Dec", "Bank: payments to suppliers", bar.paid], ["31 Dec", "Balance c/d", bar.payC]],
  [["1 Jan", "Balance b/d", bar.payO], ["31 Dec", "Bar purchases (balancing figure)", purchases]], { balance: false });
chk(bar.paid + bar.payC, bar.payO + purchases);
const barMd = statement("Bar trading account for the year ended 31 December 2025", [
  ["Bar takings", null, bar.sales], ["Opening bar inventory", bar.invO, null], ["Purchases (from the suppliers account)", purchases, null], ["Goods available for sale", bar.invO + purchases, null], ["Less closing bar inventory", -bar.invC, null],
  ["Cost of sales", null, -cos], ["**Gross profit on the bar**", null, gp], ["Bar wages (2,100 paid + 140 owing)", null, -wages], ["**Profit on the bar, transferred to the income and expenditure account**", null, profit],
], { cols: [U, U], checks: [["gp", gp, bar.sales - cos], ["profit", profit, gp - wages]] });
const credMd = (() => {
  // two-sided display with totals
  const total = bar.paid + bar.payC;
  return `**Bar suppliers (trade payables) account**\n\n| Date | Details | ${U} | Date | Details | ${U} |\n| --- | --- | ---: | --- | --- | ---: |\n| 31 Dec | Bank: payments to suppliers | ${fmt(bar.paid)} | 1 Jan | Balance b/d | ${fmt(bar.payO)} |\n| 31 Dec | Balance c/d | ${fmt(bar.payC)} | 31 Dec | Purchases (balancing figure) | ${fmt(purchases)} |\n|  |  | **${fmt(total)}** |  |  | **${fmt(total)}** |`;
})();

// Example 2: dinner dance and raffle
const dd = { tickets: 120, price: 15, catering: 1150, band: 400, deco: 90 };
const ddInc = chk(dd.tickets * dd.price, 1800);
const ddProfit = chk(ddInc - dd.catering - dd.band - dd.deco, 160);
const rf = { tickets: 600, prizes: 220, printing: 30 };
const rfProfit = chk(rf.tickets - rf.prizes - rf.printing, 350);
const ddMd = statement("Dinner dance: income and expenditure for the event", [
  ["Ticket sales (120 × 15)", null, ddInc], ["Catering", dd.catering, null], ["Hire of band", dd.band, null], ["Decorations", dd.deco, null], ["Total costs", null, -(dd.catering + dd.band + dd.deco)], ["**Profit on the dinner dance**", null, ddProfit],
], { cols: [U, U] });
const rfMd = statement("Raffle: income and expenditure for the event", [
  ["Ticket sales", null, rf.tickets], ["Prizes", rf.prizes, null], ["Printing of tickets", rf.printing, null], ["Total costs", null, -(rf.prizes + rf.printing)], ["**Profit on the raffle**", null, rfProfit],
], { cols: [U, U] });
const lossMd = statement("Sports day refreshment stall: a loss", [
  ["Sales", null, 540], ["Cost of food and drinks used", 410, null], ["Hire of tables", 160, null], ["Total costs", null, -570], ["**Loss on the stall**", null, -30],
], { cols: [U, U], checks: [["loss", 540 - 570, -30]] });

const body = `
## Introduction

Harare Golf Club has a bar open on weekends, an annual dinner dance and a raffle at the prize-giving. None of these exists to make a profit for owners, but each should at least cover its costs, and the committee wants to know which activities pay their way. Subscriptions alone rarely cover the running costs of a club, so the **profit or loss on each activity** is calculated in a small account of its own, and only the net result is carried to the income and expenditure account. This keeps the main account clear and shows exactly how well each activity performed.

Clubs and societies are ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should already know the trading account of a business, accruals and the subscriptions account.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **not-for-profit organisations**, **trading account of the bar**, **creditors**. Cambridge: **clubs and societies**, **bar trading account**, **trade payables**. The method is identical.
:::

## Key definitions

:::definition{term="Income-generating activity"}
A club activity that earns income to support the club's purposes, such as a bar, a canteen, a dinner dance or a raffle.
:::

:::definition{term="Profit or loss on an activity"}
The income of the activity less its direct costs. A profit is added to the income of the income and expenditure account; a loss is shown as an expense.
:::

:::definition{term="Cost of sales (club trading)"}
Opening inventory plus purchases less closing inventory, used for activities that buy and sell goods such as a bar or tuck shop.
:::

## Trading activities: the bar

For a bar, canteen or tuck shop the income statement is a small trading account.

1. **Purchases** are often not given. They are found from the cash paid to suppliers, adjusted for the suppliers owing at the start and at the end: purchases = payments + suppliers owing at the end − suppliers owing at the start.
2. **Cost of sales** = opening inventory + purchases − closing inventory.
3. **Gross profit** = takings − cost of sales.
4. Deduct the direct expenses of the bar, such as bar wages (adjusted for accruals), and the result is the **profit on the bar**.

:::keyfact
Purchases = cash paid to suppliers + suppliers owing at the end − suppliers owing at the start. Profit on an activity = income − cost of sales − direct expenses.
:::

:::worked-solution[Example 1: the bar]
Harare Golf Club's bar takings for 2025 were ${money(bar.sales)}. Bar inventory was ${money(bar.invO)} at 1 January and ${money(bar.invC)} at 31 December. The club paid ${money(bar.paid)} to bar suppliers during the year; it owed them ${money(bar.payO)} at the start and ${money(bar.payC)} at the end. Bar wages paid were ${money(bar.wagesPaid)} and ${money(bar.wagesAccC)} was owing at the year end (nothing at the start).

1. Purchases: 9,600 + 1,150 − 800 = 9,950.
2. Cost of sales: 1,250 + 9,950 − 1,420 = 9,780.
3. Gross profit: 14,800 − 9,780 = 5,020.
4. Bar wages for the year: 2,100 + 140 = 2,240. Profit on the bar: 5,020 − 2,240 = 2,780.

${credMd}

${barMd}

The profit of 2,780 is shown as income in the club's income and expenditure account.
:::

## Fundraising events

A dinner dance, a raffle or a sports day does not buy and sell inventory in the same way. The account is simply **income less costs of the event**. Be careful to include only the costs of the event; the club's general expenses are not charged to an event. A **loss** on an event is shown as an expense in the income and expenditure account.

:::worked-solution[Example 2: a dinner dance, a raffle and a loss-making stall]
The club's committee reports on three events.

1. Dinner dance: 120 tickets at ${money(15)} were sold. Costs were catering ${money(dd.catering)}, hire of the band ${money(dd.band)} and decorations ${money(dd.deco)}.
2. Raffle: ticket sales ${money(rf.tickets)}; prizes ${money(rf.prizes)}; printing ${money(rf.printing)}.
3. Sports day refreshment stall: sales ${money(540)}; food and drinks used ${money(410)}; hire of tables ${money(160)}.

${ddMd}

${rfMd}

${lossMd}

The profits of 160 and 350 are added to income and the loss of 30 is shown as an expense in the income and expenditure account. The committee may decide to stop the stall or to change its prices.
:::

## Using the results

A profit shows that the activity supports the club. A loss does not always mean it should stop: an event such as a sports day may help recruit members and bring in subscriptions. The committee should compare the result of each activity with the effort and the risk involved, for example the number of volunteers needed.

## Common mistakes

:::mistake{title="Using payments as purchases"}
Cash paid to suppliers is not the same as purchases. Adjust for the amounts owing at the start and at the end.
:::

:::mistake{title="Adding the general expenses of the club to the bar"}
Only the direct costs of the bar, such as bar wages, are charged to the bar account. General expenses belong in the income and expenditure account.
:::

:::mistake{title="Treating a loss on an event as income"}
A loss is an expense. Put it in the expenditure section.
:::

:::mistake{title="Ignoring accrued bar wages"}
The wages for the year are those paid plus those owing at the end (less those owing at the start).
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic with a full club question. With **prepare**, show the suppliers account first when purchases are not given, then the trading account to the profit on the bar. With **calculate**, show every adjustment. With **advise** or **evaluate**, use the profit or loss of each activity and also non-financial benefits such as recruiting members.
:::

## Summary

:::summary
- Activities such as a bar or an event have their own account; only the net result goes to the income and expenditure account.
- For a bar: purchases from payments and amounts owing; cost of sales; gross profit; direct expenses; profit on the bar.
- For an event: income less its costs.
- A profit is income; a loss is an expense in the income and expenditure account.
- Charge only the direct costs of the activity.
- Judge activities on financial and non-financial benefits.
:::
`;

writeLesson("club/income-generating", {
  key: "club.income-generating",
  title: "Trading and income-generating activities of clubs",
  summary: "Calculate the profit or loss on a club's bar, canteen and events, find purchases from payments and amounts owing, and transfer the result to the income and expenditure account.",
  concepts: ["aacc.club.income-generating"],
  estimatedMinutes: 40,
}, body);
