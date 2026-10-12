// Lesson: ledger.nca-disposal
import { t, money, fmt, check, chk, r2, sum, tAccount, statement, table, journal } from "../lib.mjs";
import { writeLesson, U } from "./w1b-lib.mjs";

// Example 1: machine sold for cash, monthly depreciation
const c1 = 28000, rate1 = 15, proc1 = 15500;
const perMonth = chk((c1 * rate1) / 100 / 12, 350);
const months = 10 + 12 + 12 + 6;
const dep1 = chk(perMonth * months, 14000);
const nbv1 = c1 - dep1;
const res1 = chk(proc1 - nbv1, 1500);
const depTable1 = table(["Year", "Months owned", `Depreciation ${U}`], [
  ["2022 (1 March to 31 December)", 10, perMonth * 10], ["2023", 12, perMonth * 12], ["2024", 12, perMonth * 12], ["2025 (1 January to 30 June)", 6, perMonth * 6], ["**Total**", months, dep1],
], ["l", "r", "r"]);
const disp1 = tAccount("Disposal of machinery account",
  [["30 Jun 2025", "Machinery", c1], ["31 Dec 2025", "Statement of profit or loss (profit)", res1]],
  [["30 Jun 2025", "Provision for depreciation: machinery", dep1], ["30 Jun 2025", "Bank", proc1]]);

// Example 2: part-exchange, vehicles (full year in year of purchase, none in year of sale, 25% straight line)
const vans = [["A", 26000, 2022], ["B", 24000, 2023], ["C", 28000, 2024]];
const cost0 = sum(vans.map((v) => v[1]));
const prov0 = sum(vans.map((v) => ((2025 - v[2]) * v[1]) / 4));
check("prov0", prov0, 38500);
const soldCost = 26000, soldDep = 19500, allowance = 9000, newCost = 34000, cash2 = newCost - allowance;
const nbv2 = soldCost - soldDep;
const res2 = chk(allowance - nbv2, 2500);
const costClose = cost0 - soldCost + newCost;
const charge2 = chk((costClose * 25) / 100, 21500);
const provClose = prov0 - soldDep + charge2;
const veh = tAccount("Motor vehicles at cost account",
  [["1 Jan 2025", "Balance b/d", cost0], ["31 Oct 2025", "Disposal (part-exchange allowance)", allowance], ["31 Oct 2025", "Bank", cash2]],
  [["31 Oct 2025", "Disposal of van A", soldCost]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
const prov2 = tAccount("Provision for depreciation: motor vehicles account",
  [["31 Oct 2025", "Disposal of van A", soldDep]],
  [["1 Jan 2025", "Balance b/d", prov0], ["31 Dec 2025", "Statement of profit or loss", charge2]], { cdDate: "31 Dec 2025", bdDate: "1 Jan 2026" });
const disp2 = tAccount("Disposal of van A account",
  [["31 Oct 2025", "Motor vehicles at cost", soldCost], ["31 Dec 2025", "Statement of profit or loss (profit)", res2]],
  [["31 Oct 2025", "Provision for depreciation", soldDep], ["31 Oct 2025", "Motor vehicles (allowance)", allowance]]);
const ext2 = statement("Extracts for the year ended 31 December 2025", [
  ["Statement of profit or loss", null, null],
  ["Profit on disposal of van (other income)", null, res2],
  ["Depreciation: motor vehicles (expense)", null, charge2],
  ["Statement of financial position at 31 December 2025", null, null],
  ["Motor vehicles at cost", null, costClose],
  ["Less accumulated depreciation", null, -provClose],
  ["Carrying amount", null, costClose - provClose],
], { cols: [U, U], checks: [["carrying amount", costClose - provClose, 45500]] });

// Example 3: sold on credit, new asset bought on credit
const tCost = 45000, tDep = 36000, tProc = 11000, tNew = 60000;
const res3 = chk(tProc - (tCost - tDep), 2000);
const j3 = journal([
  { date: "30 Sep", lines: [["Disposal of tractor", tCost, null], ["Tractors at cost", null, tCost]], narrative: "Cost of the tractor sold" },
  { date: "30 Sep", lines: [["Provision for depreciation: tractors", tDep, null], ["Disposal of tractor", null, tDep]], narrative: "Depreciation on the tractor sold" },
  { date: "30 Sep", lines: [["Mr Moyo (other receivable)", tProc, null], ["Disposal of tractor", null, tProc]], narrative: "Proceeds due from Mr Moyo in 30 days" },
  { date: "30 Sep", lines: [["Tractors at cost", tNew, null], ["Agro Supplies (other payable)", null, tNew]], narrative: "New tractor bought on credit" },
  { date: "31 Dec", lines: [["Disposal of tractor", res3, null], ["Statement of profit or loss", null, res3]], narrative: "Profit on disposal of the tractor" },
]);
const disp3 = tAccount("Disposal of tractor account",
  [["30 Sep", "Tractors at cost", tCost], ["31 Dec", "Statement of profit or loss (profit)", res3]],
  [["30 Sep", "Provision for depreciation", tDep], ["30 Sep", "Mr Moyo", tProc]]);

const body = t`
## Introduction

Nyasha's brickworks in Chinhoyi has used the same moulding machine for over three years. A neighbouring builder offers to buy it, and Nyasha will use the money to help pay for a faster one. The machine must now leave the books: its cost comes out of the machinery account, its accumulated depreciation comes out of the provision account, and the business must find out whether it received more or less than the carrying amount.

Disposals appear in Cambridge Paper 2 and in ZIMSEC Papers 2 and 3, often inside a longer question on non-current assets or final accounts. You should already know how depreciation is calculated and how the asset and provision accounts work.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **disposal account**, **provision for depreciation**, **net book value**, **income statement**. Cambridge: **disposal account**, **accumulated depreciation**, **carrying amount**, **statement of profit or loss**. The result on disposal is called profit or loss on disposal (Cambridge sometimes "gain or loss"). The method is identical.
:::

## Key definitions

:::definition{term="Disposal of a non-current asset"}
Removing a non-current asset from the books because it is sold, traded in or scrapped.
:::

:::definition{term="Disposal account"}
A ledger account in which the cost, the accumulated depreciation and the proceeds of the asset are brought together so that the profit or loss on disposal is the balancing figure.
:::

:::definition{term="Profit or loss on disposal"}
Proceeds less the carrying amount at the date of disposal. Proceeds above the carrying amount give a profit.
:::

:::definition{term="Part-exchange (trade-in) allowance"}
The amount a supplier deducts from the price of a new asset in return for the old one. For the old asset it is the proceeds; for the new asset it is part of the cost.
:::

## The four steps of the disposal account

| Step | Debit | Credit | Amount |
| --- | --- | --- | --- |
| 1 Cost | Disposal | Asset at cost | Cost of the asset sold only |
| 2 Depreciation | Provision for depreciation | Disposal | Accumulated depreciation on that asset only, up to the date of sale |
| 3 Proceeds | Bank, receivable or new asset | Disposal | Cash, amount due or part-exchange allowance |
| 4 Result | Disposal (profit) or statement of profit or loss (loss) | Statement of profit or loss (profit) or disposal (loss) | Balancing figure |

Other assets of the same class stay in the asset and provision accounts. Only the asset sold is removed. Check the balancing figure with a quick sum: proceeds − (cost − accumulated depreciation).

## Depreciation up to the date of sale

The accumulated depreciation on the asset sold must include any depreciation for the year of sale that the question's policy requires. Read the policy carefully: "a full year in the year of purchase and none in the year of sale", or "on a monthly basis". Count the months, or the years, that the asset was charged.

:::worked-solution[Example 1: sale for cash with monthly depreciation]
Nyasha bought a moulding machine on 1 March 2022 for US\$28,000. Machinery is depreciated at 15% per annum on cost, straight line, on a monthly basis. On 30 June 2025 she sold the machine for US\$15,500 by bank transfer.

1. Depreciation per month: 28,000 × 15% ÷ 12 = 350.
2. Months owned: 10 (2022) + 12 + 12 + 6 (2025 to the date of sale) = 40.

${depTable1}

3. Carrying amount at 30 June 2025: 28,000 − 14,000 = 14,000.
4. Profit on disposal: 15,500 − 14,000 = 1,500.

${disp1}

The profit of 1,500 is other income in the statement of profit or loss for 2025.
:::

## Part-exchange

When an old asset is traded in, the allowance is the proceeds of the old asset, and the new asset is recorded at its **full cost**: allowance plus any cash paid. The ledger shows the allowance as a debit in the asset account and a credit in the disposal account.

:::worked-solution[Example 2: part-exchange with the full set of ledger accounts]
Rudo's bakery in Mutare owns three vans, depreciated at 25% per annum on cost, with a full year's charge in the year of purchase and none in the year of sale.

| Van | Cost US\$ | Bought |
| --- | ---: | --- |
| A | 26,000 | 1 January 2022 |
| B | 24,000 | 1 January 2023 |
| C | 28,000 | 1 January 2024 |

1. Accumulated depreciation at 1 January 2025: van A 3 years × 6,500 = 19,500; van B 2 × 6,000 = 12,000; van C 1 × 7,000 = 7,000; total 38,500.
2. On 31 October 2025 Rudo traded in van A for a new van costing 34,000. The dealer allowed 9,000 and Rudo paid the balance of 25,000 by bank transfer.
3. Carrying amount of van A: 26,000 − 19,500 = 6,500. Profit on disposal: 9,000 − 6,500 = 2,500.
4. Depreciation for 2025 is on the vans owned at the year end (B, C and the new van), because none is charged on van A: 25% × 86,000 = 21,500.

${veh}

${prov2}

${disp2}

${ext2}
:::

## Assets bought and sold on credit

The proceeds may not be paid at once. If the buyer has not paid, debit the buyer's account (an other receivable, not a trade receivable) instead of bank. A new asset bought on credit is credited to the supplier's account (an other payable). The disposal account is unchanged.

:::worked-solution[Example 3: tractor sold on credit]
Farai sold a tractor with a cost of US\$45,000 and accumulated depreciation of US\$36,000 to Mr Moyo for US\$11,000, payable in 30 days. On the same day he bought a new tractor for US\$60,000 on credit from Agro Supplies.

1. Carrying amount: 45,000 − 36,000 = 9,000.
2. Profit on disposal: 11,000 − 9,000 = 2,000.
3. Journal entries:

${j3}

${disp3}
:::

## Where the result appears

- A **profit on disposal** is added as other income in the statement of profit or loss. It is not part of revenue or gross profit.
- A **loss on disposal** is an expense. It is not part of cost of sales.
- A result on disposal is a correction of depreciation in earlier years. A profit means too much depreciation was charged, a loss means too little. The bank proceeds appear as an investing inflow in a cash flow statement.
- After the disposal the asset and its accumulated depreciation are gone from the statement of financial position. The disposal account has no balance.

## Common mistakes

:::mistake{title="Transferring the whole provision"}
Only the accumulated depreciation on the asset sold goes to the disposal account. The depreciation on the other assets stays in the provision.
:::

:::mistake{title="Forgetting the depreciation of the year of sale"}
If the policy is monthly, depreciation up to the sale date must be charged before the carrying amount is found. If the policy is "none in the year of sale", do not charge it.
:::

:::mistake{title="Using the proceeds as the cost of the new asset"}
In a part-exchange the new asset is debited with the full price: allowance plus cash.
:::

:::mistake{title="Putting profit and loss on the wrong side"}
On the disposal account a profit is a debit balancing figure; a loss is a credit balancing figure.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Papers 1 and 2 test disposals. With **calculate**, show the depreciation to date, the carrying amount and then proceeds − carrying amount. With **prepare**, give all three accounts when asked, with narratives and dates, and finish with the transfer to the statement of profit or loss.
:::

:::exam-tip
With **explain** or **evaluate**, say that the result is the difference between the proceeds and the carrying amount and that it corrects earlier depreciation. A loss does not mean the business made a bad decision to sell.
:::

## Summary

:::summary
- Debit disposal with the cost; credit disposal with accumulated depreciation and the proceeds.
- Profit or loss on disposal = proceeds − carrying amount; it is the balancing figure.
- Include depreciation to the date of sale as the policy requires, and only for the asset sold.
- In a part-exchange the allowance is the proceeds and the new asset is recorded at allowance plus cash.
- If the asset is sold on credit, debit the buyer instead of bank; a new asset on credit is credited to the supplier.
- A profit is other income and a loss is an expense in the statement of profit or loss.
:::
`;

writeLesson("ledger/nca-disposal", {
  key: "ledger.nca-disposal",
  title: "Disposal of non-current assets: profit, loss and part-exchange",
  summary: "Record the sale, trade-in or credit sale of a non-current asset through the disposal account, find the profit or loss on disposal and show it in the financial statements.",
  concepts: ["aacc.ledger.nca-disposal"],
  estimatedMinutes: 45,
}, body);
