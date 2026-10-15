// W4a lesson generator: trade.protectionism. Run: node .scratch/economics-a/tables/w4a-protectionism.mjs
import { tariffEffect, chk, table, fmt, roundTo } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const te = tariffEffect({ a: 120, b: 1, c: 20, d: 1, pw: 50, tariff: 10 });
chk(te.free.qd, 70); chk(te.free.qs, 30); chk(te.importsFree, 40);
chk(te.tariff.price, 60); chk(te.tariff.qd, 60); chk(te.tariff.qs, 40); chk(te.importsTariff, 20);
chk(te.revenue, 200); chk(te.consumerLoss, 650); chk(te.producerGain, 350); chk(te.productionLoss, 50); chk(te.consumptionLoss, 50); chk(te.welfareLoss, 100); chk(te.check, 0);
// quota of 20 units: domestic price where Qd = Qs + 20
const pq = 60; chk(120 - pq, (pq - 20) + 20); const rent = (pq - 50) * 20; chk(rent, 200);
const t1 = table(["", "Free trade (world price)", "With a US\\$10 tariff"], [
  ["Price paid by consumers (US\\$)", 50, 60],
  ["Quantity demanded (units)", 70, 60],
  ["Quantity supplied by home firms (units)", 30, 40],
  ["Imports (units)", 40, 20],
  ["Tariff revenue (US\\$)", 0, 200],
]);
const t2 = table(["Effect of the tariff", "US\\$"], [
  ["Loss of consumer surplus (price rise on the 60 units still bought, plus the units no longer bought)", 650],
  ["Gain in producer surplus", 350],
  ["Tariff revenue to the government", 200],
  ["Welfare loss from higher-cost home production (½ × 10 × 10)", 50],
  ["Welfare loss from lower consumption (½ × 10 × 10)", 50],
  ["**Net welfare loss** (650 − 350 − 200)", "**100**"],
]);
const sub = 5 * 300; chk(sub, 1500);

const body = String.raw`
## Introduction

If imported goods are cheaper or better than local ones, why do governments restrict imports? Often the answer is to protect local firms and jobs, to raise revenue or to give a new industry time to grow. **Protectionism** is the use of measures to shield domestic producers from foreign competition. It is a long-standing policy: Zimbabwe, like many countries, uses import duties, licences and other measures at various times. The effects of these measures are not always what governments intend, and economists often disagree about whether they do more harm than good.

This lesson explains the tools of protection, analyses a tariff with numbers, and reviews the arguments for and against. You should know the case for free trade (previous lesson), supply and demand and consumer and producer surplus.

## Key definitions

:::definition{term="Protectionism"}
Government policies that restrict imports, or favour domestic producers, in order to protect them from foreign competition.
:::

:::definition{term="Tariff"}
A tax on imported goods, which raises their price in the home market and raises revenue for the government.
:::

:::definition{term="Import quota"}
A limit on the quantity of a good that may be imported in a period.
:::

:::definition{term="Export subsidy"}
A payment by the government to domestic firms for each unit of a good they export, which lowers the price at which they can sell abroad.
:::

:::definition{term="Embargo"}
An official ban on trade with a particular country or on trade in particular goods.
:::

## The tools of protection

| Tool | How it works | Main effects |
| --- | --- | --- |
| Tariff | Tax on imports | Higher price, less imports, more home output; revenue to government |
| Quota | Limit on imports | Higher price, fewer imports; the extra revenue goes to importers or licence holders unless licences are sold |
| Export subsidy | Payment per unit exported | Lower export price, more exports; cost to taxpayers; risk of retaliation |
| Embargo | Ban on trade with a country or in a good | Complete loss of the trade; used for political reasons or in disputes |
| Administrative barriers | Licences, standards, customs delays, paperwork, "buy local" rules | Raise the cost and delay of imports; less transparent than tariffs |

## Analysing a tariff

Suppose a small country faces a world price of US\$50 for a good. Demand is P = 120 − Q and home supply is P = 20 + Q. A tariff of US\$10 per unit raises the domestic price to US\$60.

${t1}

:::worked-solution{title="The effects of the tariff"}
1. Free trade: at US\$50, Qd = 70 and Qs = 30, so imports are **40**. With the tariff the price is US\$60, Qd = 60, Qs = 40, and imports fall to **20**.
2. Tariff revenue = tariff × imports = 10 × 20 = **US\$200**.
3. Loss of consumer surplus = the average of the old and new quantities times the price rise = (70 + 60) ÷ 2 × 10 = **US\$650**.
4. Gain in producer surplus = (30 + 40) ÷ 2 × 10 = **US\$350**.
5. The consumers' loss of US\$650 equals the producers' gain (350), the government's revenue (200) and two welfare-loss triangles: ½ × 10 × (40 − 30) = **US\$50** (home firms produce units at a higher cost than the world price) and ½ × 10 × (70 − 60) = **US\$50** (consumers lose units that they would have bought).
6. The **net welfare loss** is 50 + 50 = **US\$100**. The tariff gains some groups at the expense of others, and the whole economy loses.
:::

${t2}

:::worked-solution{title="An import quota"}
The government instead limits imports to 20 units.
1. The domestic price must rise until Qd = Qs + 20: 120 − P = (P − 20) + 20, so **P = US\$60**, the same as under the tariff.
2. Importers who can bring in goods at US\$50 and sell at US\$60 earn (60 − 50) × 20 = **US\$200** (the "quota rent").
3. Unlike a tariff, the government gets no revenue unless it sells the import licences; the rent goes to importers or foreign exporters.
:::

:::worked-solution{title="Cost of an export subsidy"}
A government pays a subsidy of US\$5 per unit on 300 units exported.
1. Cost to taxpayers = 5 × 300 = **US\$1,500**.
2. The exporters can sell at a lower price abroad, so their sales rise, but the gain to producers is partly offset by the cost to taxpayers, and foreign governments may retaliate with duties.
:::

## Arguments for protection

1. **Infant industries.** New industries may need temporary protection until they have grown enough to achieve economies of scale and compete.
2. **Strategic industries.** Food, energy, defence and communications may be protected for national security.
3. **Dumping.** Duties can offset the unfair advantage of goods sold below cost.
4. **Balance of payments.** Reducing imports can reduce a trade deficit (in the short run).
5. **Employment.** Protection can keep jobs in industries that would otherwise decline, giving time to adjust.
6. **Revenue.** Tariffs are easy to collect, which matters when other taxes are hard to collect.
7. **Diversification.** Protection can help a country that depends on a few exports to develop other industries.

## Arguments against protection

1. **Inefficiency.** Without competition, protected firms may have little incentive to cut costs or innovate.
2. **Higher prices and less choice** for consumers; the welfare loss shown above.
3. **Retaliation.** Other countries may impose their own barriers, so exporters lose markets and everyone's trade falls (a trade war).
4. **Higher costs for firms** that use imported inputs, which reduces the competitiveness of exports.
5. **Rent-seeking and corruption.** Firms may spend resources lobbying for protection, and licences can be misused. High tariffs encourage smuggling.
6. **Protected industries rarely "grow up".** Temporary protection often becomes permanent.
7. **Costs of preventing job losses may exceed the benefits.** The higher prices paid by consumers may be greater than the wages saved.

:::example{title="Evaluation paragraph"}
For a developing country the infant industry argument is the strongest, because new industries cannot compete with established foreign firms and may need time to build skills and scale. However, protection works only if it is temporary, targeted at industries with a real prospect of competing, and linked to a clear plan. Otherwise it raises prices for consumers, protects inefficient firms and invites retaliation. A country that relies on tariffs for revenue may also find that high duties encourage smuggling and informal trade across borders. It is generally better to use alternatives, such as support for training or technology, that do not distort prices as much as tariffs.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the tools of protection, a tariff diagram with its effects on price, quantity, revenue and welfare, the arguments for and against, and an evaluation. ZIMSEC (Form 5) lists embargoes and administrative barriers; Cambridge (AS) concentrates on tariffs, quotas and subsidies and the evaluation of the arguments, including for developing countries.
:::

## Common mistakes

:::mistake{title="Forgetting who pays a tariff"}
A tariff raises the price paid by home consumers. The government collects revenue, home producers gain, but consumers pay and the economy suffers a net welfare loss.
:::

:::mistake{title="Treating tariff revenue as a net gain"}
Revenue is a transfer from consumers to the government. The true loss is the two welfare triangles.
:::

:::mistake{title="Listing arguments without evaluating them"}
For each argument say whether it is likely to work. Infant industry protection should be temporary; protection for employment is costly; retaliation can leave everyone worse off.
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 1 and Paper 2 test the tools and effects of a tariff, including calculations; Paper 3 essays ask whether protection is justified. Cambridge Paper 1 tests the tools and effects; Paper 2 data responses and essays ask you to assess the arguments for protection.
:::

:::exam-tip{title="Command words"}
*Calculate*: tariff × imports for revenue; use the quantities at the world price and with the tariff. *Explain*: link the tariff to the price, quantity demanded and supplied and imports. *Evaluate*: weigh the arguments for against the costs (higher prices, retaliation) and say when protection is most justified.
:::

## Summary

:::summary
- Protection uses tariffs, quotas, export subsidies, embargoes and administrative barriers to shield home producers.
- A tariff raises the home price, reduces imports and consumption, increases home output and raises revenue; it causes a net welfare loss.
- A quota has similar price effects, but the extra revenue goes to importers unless licences are sold.
- Arguments for: infant industries, strategic industries, dumping, balance of payments, employment and revenue.
- Arguments against: inefficiency, higher prices, retaliation and rent-seeking; protection should be temporary and targeted.
:::
`;

writeLesson("trade.protectionism", {
  title: "Protectionism: tools, impacts and arguments",
  summary: "Describe tariffs, quotas, export subsidies, embargoes and administrative barriers, calculate the effects of a tariff on price, quantity, revenue and welfare, and evaluate the arguments for and against protection, especially for developing countries.",
  concepts: ["aecon.trade.protectionism"],
  estimatedMinutes: 55,
}, body);
