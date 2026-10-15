// W4a lesson generator: policy.taxes. Run: node .scratch/economics-a/tables/w4a-taxes.mjs
import { tax, chk, table, fmt, money, roundTo } from "../lib.mjs";
import { writeLesson } from "./w4a-kit.mjs";

const bands = [[3000, 0], [6000, 20], [12000, 30], [Infinity, 40]];
const incomes = [2000, 5000, 9000, 15000, 24000];
const rows = incomes.map((y) => {
  const tx = tax.banded(y, bands);
  return [money(y), money(tx), `${fmt(roundTo(tax.averageRate(tx, y), 1), 1)}%`];
});
const t1 = table(["Annual income", "Tax paid", "Average rate"], rows);
chk(tax.banded(9000, bands), 1500); chk(roundTo(tax.averageRate(1500, 9000), 1), 16.7);
chk(tax.banded(15000, bands), 3600); chk(tax.averageRate(3600, 15000), 24);
const t11 = tax.banded(11000, bands), t13 = tax.banded(13000, bands);
chk(t11, 2100); chk(t13, 2800);
const marg = ((t13 - t11) / 2000) * 100; chk(marg, 35);
// regressive example: fixed US$20 a month tax on a service
const rA = (20 / 200) * 100, rB = (20 / 1000) * 100; chk(rA, 10); chk(rB, 2);
const t2 = table(["Household", "Monthly income", "Monthly spending on the taxed good", "Tax paid", "Tax as % of income"], [
  ["Low-income", money(200), money(100), money(20), `${rA}%`],
  ["High-income", money(1000), money(100), money(20), `${rB}%`],
]);

const body = String.raw`
## Introduction

Every government has to pay for schools, clinics, roads and the police. In Zimbabwe, the Zimbabwe Revenue Authority (ZIMRA) collects most of the money this requires, through taxes such as income tax on wages and company profits, value added tax (VAT) on goods and services, and customs and excise duties. A tax is not only a way of raising money. It changes what people buy, how hard they work, how much firms invest and how income is shared, so economists judge taxes by their effects as well as by the revenue they raise.

This lesson sets out the types of tax, how to calculate average and marginal rates, why governments tax and how to judge a tax. It prepares you for the lessons on fiscal policy and on the effects of taxes on prices, which cover who actually bears an indirect tax (incidence). You should know what government spending is used for and how to calculate a percentage.

## Key definitions

:::definition{term="Tax"}
A compulsory payment to the government, or to a body acting for it, that does not give the payer a right to a particular good or service in return.
:::

:::definition{term="Direct tax"}
A tax charged on income or wealth that is paid directly to the tax authority by the person or firm on whom it is levied, such as income tax, corporation tax and capital gains tax.
:::

:::definition{term="Indirect tax"}
A tax charged on spending, collected by the seller from the buyer and passed to the tax authority, such as VAT, customs duty and excise duty. The person who pays the tax to the authority is not necessarily the person who finally bears it.
:::

:::definition{term="Progressive, regressive and proportional taxes"}
A **progressive** tax takes a larger percentage of income as income rises (the average rate rises). A **regressive** tax takes a smaller percentage of income as income rises (the average rate falls). A **proportional** tax takes the same percentage of income at every income level (the average rate is constant).
:::

:::definition{term="Average rate and marginal rate of tax"}
The **average rate** is the tax paid as a percentage of total income. The **marginal rate** is the tax paid on an extra unit of income, expressed as a percentage of that extra income.
:::

:::keyfact{title="Formulae"}
Average rate of tax = $\dfrac{\text{tax paid}}{\text{income}} \times 100$

Marginal rate of tax = $\dfrac{\text{change in tax paid}}{\text{change in income}} \times 100$

A tax is progressive if the marginal rate is **above** the average rate, so that the average rate rises with income.
:::

## Direct and indirect taxes

| | Direct taxes | Indirect taxes |
| --- | --- | --- |
| Charged on | Income and wealth | Spending on goods and services |
| Examples | Income tax, corporation tax, capital gains tax | VAT, customs duty, excise duty |
| Usual pattern | Often progressive | Often regressive |
| Strengths | Can be matched to ability to pay; can redistribute income | Harder to avoid; cheap to collect; can be aimed at particular goods |
| Weaknesses | Possible disincentive to work and invest; easier to avoid or evade | Can hit the poor hardest; raise prices and may cause inflation |

Many developing economies depend heavily on indirect taxes because it is hard to collect income tax from the informal sector, where earnings are irregular and records are few. Taxing goods when they are bought, imported or produced is easier to administer.

## Progressive, regressive and proportional taxes

Most income tax systems use **bands**: no tax on the first slice of income, then rising rates on higher slices. Suppose a (fictional, illustrative) income tax system has these bands.

| Annual income band | Rate on income in the band |
| --- | ---: |
| First US\$3,000 | 0% |
| US\$3,001 to US\$6,000 | 20% |
| US\$6,001 to US\$12,000 | 30% |
| Above US\$12,000 | 40% |

The rate on each band applies only to the income *within* that band. Applying the rates produces this table.

${t1}

The average rate rises from 0% to 30% as income rises, so the tax is **progressive**. The marginal rate (20%, 30% or 40%) is always above the average rate once tax is being paid.

:::worked-solution{title="Calculating tax and the average rate"}
A worker earns US\$9,000 a year.
1. First US\$3,000 at 0% = US\$0.
2. Next US\$3,000 (from 3,000 to 6,000) at 20% = US\$600.
3. Remaining US\$3,000 (from 6,000 to 9,000) at 30% = US\$900.
4. Total tax = 0 + 600 + 900 = **US\$1,500**.
5. Average rate = 1,500 ÷ 9,000 × 100 = **16.7%**. The marginal rate on the next dollar is **30%**.
:::

:::worked-solution{title="Marginal rate over a range of income"}
A worker's income rises from US\$11,000 to US\$13,000. Using the bands above:
1. Tax on US\$11,000 = 0 + 600 + 5,000 × 30% = US\$2,100.
2. Tax on US\$13,000 = 0 + 600 + 1,800 + 1,000 × 40% = US\$2,800.
3. Change in tax = US\$700; change in income = US\$2,000.
4. Marginal rate over the range = 700 ÷ 2,000 × 100 = **35%** (a blend of 30% on the first US\$1,000 and 40% on the second).
5. Take-home pay rises by 2,000 − 700 = **US\$1,300**.
:::

A **regressive** tax takes a smaller share of a higher income. A fixed charge, or a tax on a good that rich and poor households buy in similar amounts, is regressive. Suppose a tax adds US\$20 a month to what each household pays for a basic item.

${t2}

The same US\$20 is 10% of the low-income household's income but only 2% of the high-income household's, so the tax is regressive even though both households pay the same amount. A **proportional** (flat) tax, such as 15% of every dollar of taxable income, takes the same percentage from everyone. Note that an indirect tax can be regressive even when rich households pay more dollars in total, as long as it takes a smaller percentage of their income.

## Why governments tax

1. **To raise revenue** to pay for public goods and services, transfer payments and debt interest.
2. **To redistribute income and wealth**, by using progressive taxes and spending the revenue on health, education and benefits.
3. **To discourage demerit goods and correct negative externalities**, for example excise duties on tobacco and alcohol or taxes on pollution.
4. **To influence aggregate demand** as part of fiscal policy: higher taxes reduce spending and lower taxes raise it.
5. **To protect domestic industries**, through tariffs on imports.
6. **To encourage particular behaviour**, such as tax relief on investment in machinery or on pension savings.

## Judging a tax: the canons of taxation

Adam Smith suggested four tests, which the ZIMSEC syllabus names as the canons of taxation and which are useful to any student.

| Canon | Meaning |
| --- | --- |
| Equity | Fair: it should relate to ability to pay |
| Certainty | The taxpayer should know when, how and how much to pay |
| Convenience | Easy to pay, at a suitable time and in a suitable way |
| Economy | Cheap to collect compared with the revenue it raises |

Other desirable features are **flexibility** (revenue can be changed quickly), **neutrality** (not distorting choices without good reason) and **simplicity**. No tax scores well on all of them. An income tax on formal-sector wages is equitable and certain but may be avoided by informal workers; a sales tax is cheap to collect but may be regressive.

## Effects and evaluation

:::example{title="Evaluation paragraph"}
A highly progressive income tax reduces inequality and raises revenue from those most able to pay, which can fund health and education for poorer households. However, very high marginal rates may reduce the reward for extra work or enterprise, encourage avoidance or the movement of earnings into the informal sector, and so reduce the revenue collected. Whether the tax is desirable depends on the level of the rates, how easy the tax is to enforce and how well the revenue is spent. A government might therefore aim for moderate marginal rates on a wide base, backed by good enforcement, rather than very high rates on a narrow base.
:::

Taxes also affect the economy as a whole. Direct taxes reduce disposable income and so consumption. Indirect taxes raise prices and can add to inflation. Taxes on firms' profits may reduce investment. The effect of an indirect tax on the price paid and quantity traded (its incidence) is covered in the lesson on taxes and subsidies in the market.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards expect the types of tax, progressive, regressive and proportional taxes, and the reasons for taxation. ZIMSEC (Form 6) also lists the canons of taxation and expects banded tax calculations with average and marginal rates. Cambridge (AS) expects you to explain the effects of taxes on incentives, income distribution and aggregate demand; the Laffer curve belongs to a later lesson.
:::

## Common mistakes

:::mistake{title="Applying the highest rate to all income"}
In a banded system each rate applies only to the income inside its band. A person in the 40% band does not pay 40% on all their income.
:::

:::mistake{title="Confusing amount with percentage"}
A tax is progressive or regressive according to the **percentage** of income taken, not the dollar amount. A flat charge can take the same dollars from everyone and still be regressive.
:::

:::mistake{title="Saying that all indirect taxes are regressive"}
Indirect taxes are often regressive, but a tax on luxury goods, bought mainly by high-income households, can be progressive. Say "usually" or "often".
:::

## Exam tips

:::exam-tip{title="Where it is tested"}
ZIMSEC Paper 1 and Paper 2 set definitions and banded calculations; Paper 3 essays ask you to discuss the merits of direct and indirect taxes. Cambridge Paper 1 tests the types and the effects of taxes, and Paper 2 uses tax data in a data response.
:::

:::exam-tip{title="Command words"}
*Define*: give the exact meaning. *Calculate*: tax each band separately and add, then divide by total income for the average rate. *Explain*: link the tax to its effect on price, incentives or distribution. *Discuss* or *evaluate*: compare direct and indirect taxes using the canons or the effects on equity, efficiency and revenue, and reach a judgement.
:::

## Summary

:::summary
- Direct taxes are charged on income and wealth; indirect taxes are charged on spending and are collected by sellers.
- A progressive tax has an average rate that rises with income, a regressive tax's average rate falls, and a proportional tax's average rate is constant.
- Average rate = tax ÷ income × 100; marginal rate = change in tax ÷ change in income × 100; in banded systems each rate applies only to income within its band.
- Governments tax to raise revenue, redistribute income, discourage demerit goods, influence demand, protect industry and shape behaviour.
- Taxes are judged by equity, certainty, convenience and economy, and by their effects on incentives and growth.
:::
`;

writeLesson("policy.taxes", {
  title: "Taxation: types, rates and reasons",
  summary: "Distinguish direct and indirect and progressive, regressive and proportional taxes, calculate tax, average and marginal rates from banded schedules, explain why governments tax and judge taxes using the canons of taxation and their economic effects.",
  concepts: ["aecon.policy.taxes"],
  estimatedMinutes: 50,
}, body.replace("${t1}", t1).replace("${t2}", t2));
