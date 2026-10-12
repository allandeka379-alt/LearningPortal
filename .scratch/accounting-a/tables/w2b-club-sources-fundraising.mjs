// Lesson: club.sources-fundraising
import { money, fmt, chk, r2, sum, table } from "../lib.mjs";
import { writeLesson, U } from "./w2b-lib.mjs";

// Example 1: three fundraising events compared
const ev = [
  { n: "Raffle", inc: 800, cost: 250, hrs: 15 },
  { n: "Quiz night", inc: 580, cost: 190, hrs: 8 },
  { n: "Sponsored walk", inc: 1450, cost: 120, hrs: 40 },
];
const rows = ev.map((e) => {
  const net = e.inc - e.cost;
  return [e.n, e.inc, e.cost, net, e.hrs, r2(net / e.hrs), r2(net / e.cost)];
});
chk(rows[0][3], 550); chk(rows[1][3], 390); chk(rows[2][3], 1330);
chk(rows[0][5], 36.67); chk(rows[1][5], 48.75); chk(rows[2][5], 33.25);
const t1 = table(["Event", `Income ${U}`, `Costs ${U}`, `Net proceeds ${U}`, "Volunteer hours", `Net per hour ${U}`, "Net per dollar of cost"], rows.map((r) => [r[0], r[1], r[2], r[3], r[4], fmt(r[5]), fmt(r[6])]), ["l", "r", "r", "r", "r", "r", "r"]);

// Example 2: financing a minibus
const cost = 15000, rate = 0.12, years = 3;
const instalment = cost / years;
let bal = cost; let totalInt = 0; const sched = [];
for (let y = 1; y <= years; y += 1) { const int = bal * rate; totalInt += int; sched.push([`Year ${y}`, bal, instalment, int, instalment + int]); bal -= instalment; }
chk(totalInt, 3600);
chk(cost + totalInt, 18600);
const t2 = table(["Year", `Balance at start ${U}`, `Capital repaid ${U}`, `Interest at 12% ${U}`, `Total paid ${U}`], [...sched, ["**Total**", "", cost, totalInt, cost + totalInt]], ["l", "r", "r", "r", "r"]);
const mix = { grant: 5000, donations: 4000, fund: 6000 };
chk(mix.grant + mix.donations + mix.fund, cost);

const body = `
## Introduction

Chinhoyi High School's debating society wants a minibus to travel to competitions in Harare and Bulawayo. The bus costs ${money(cost)}. The society has a small bank balance and annual subscriptions that barely cover its running costs. How can it raise the money? A club or society has many possible sources of income, each with strengths and weaknesses. The committee must choose a method that matches the purpose, the time available and the risk. This lesson looks at the sources of income of clubs and societies, how to evaluate fundraising methods and how to recommend one, with only simple calculations.

The topic is ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). It builds on the income and expenditure account and club activities.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **not-for-profit (non-profit making) organisations**, **sources of capital**. Cambridge: **clubs and societies**, **sources of finance**. Both syllabi ask students to evaluate and recommend; very little calculation is needed.
:::

## Key definitions

:::definition{term="Fundraising"}
Activities organised to collect money for a particular purpose, such as raffles, sponsored events and appeals.
:::

:::definition{term="Grant"}
Money given by an organisation, such as a government body, church or company, to support a stated purpose. It is usually not repaid but may have conditions.
:::

:::definition{term="Sponsorship"}
Money or goods given by a business in exchange for publicity, for example a company name on the team's shirts.
:::

## Sources of income

| Source | Advantages | Disadvantages |
| --- | --- | --- |
| Subscriptions | Regular and predictable; members feel ownership | Limited by what members can afford; late payment |
| Entrance fees | Immediate income from new members | One-off; may discourage joining |
| Donations | No cost to raise; may be large | Unpredictable; may be restricted to a purpose |
| Grants | Large sums for projects; no repayment | Applications take time; conditions and reporting |
| Fundraising events (raffles, quizzes, walks) | Raises money and involves members; flexible | Needs volunteers and time; income uncertain; costs to cover |
| Trading activities (bar, canteen, tuck shop) | Regular income and a service to members | Needs inventory and staff; risk of losses; licensing |
| Investment income (interest) | Low effort | Small amounts unless savings are large |
| Hiring out facilities | Uses assets that would sit idle | Wear and tear; clashes with members' use |
| Loans | Gives the money at once | Interest must be paid; must be repaid |

## Evaluating fundraising methods

Judge each method against criteria related to the case:

- **Net proceeds:** how much is left after costs? Compare in total and per hour of volunteer time.
- **Certainty:** is the income predictable, or does it depend on the weather, attendance or generosity?
- **Time:** can the money be raised before it is needed?
- **Cost and risk:** does the method need money first (hire of venue, prizes), and what if too few people come?
- **Non-financial effects:** does the event build community, recruit members or damage the club's reputation?

:::worked-solution[Example 1: comparing three fundraising events]
A society tries three events. A raffle takes in ${money(800)} with costs of ${money(250)} and needs 15 volunteer hours. A quiz night takes in ${money(580)} (tickets and food) with costs of ${money(190)} and needs 8 hours. A sponsored walk collects ${money(1450)} with costs of ${money(120)} and needs 40 hours.

1. Net proceeds: raffle 550; quiz night 390; walk 1,330.
2. Net per volunteer hour: raffle 550 ÷ 15 = 36.67; quiz 390 ÷ 8 = 48.75; walk 1,330 ÷ 40 = 33.25.
3. Net per dollar of cost: raffle 2.20; quiz 2.05; walk 11.08.

${t1}

The walk raises the most in total and needs the least outlay, but takes the most time per dollar raised. The quiz night is the best use of volunteers' time. A sensible plan is to hold the walk for the main target and a quiz night to add to it, taking the weather and attendance risks into account.
:::

## Sources of finance for a large purchase

A large purchase can be financed by **borrowing**, by **fundraising**, by **grants and donations**, or by a mixture. Borrowing gives the money now but increases the total cost by the interest. Fundraising costs only time, but cannot be relied on to reach the target quickly.

:::worked-solution[Example 2: choosing how to pay for a minibus]
The debating society needs ${money(cost)} for a minibus. Option A is a bank loan of ${money(cost)} at 12% a year on the balance outstanding, repaid in three equal annual instalments of capital. Option B is a plan combining a church grant of ${money(mix.grant)}, donations of ${money(mix.donations)} and fundraising events expected to raise ${money(mix.fund)}.

1. The loan: interest in year 1 is 12% × 15,000 = 1,800; year 2 12% × 10,000 = 1,200; year 3 12% × 5,000 = 600. Total interest 3,600 and total repaid 18,600.
2. Option B: grant + donations + fundraising = 15,000, with no interest.

${t2}

3. The loan allows the society to buy the bus now, but costs ${money(totalInt)} more than the price. Option B costs nothing extra, but depends on the grant being approved and on the events reaching their targets, so the bus may be delayed.

Recommendation: apply for the grant and donations and start fundraising immediately (Option B). If the society needs the bus before the money is raised, it could take a smaller short-term loan to cover only the shortfall.
:::

## Making a recommendation

Good answers state the **purpose and deadline**, compare **two or three** methods using figures from the case, and end with a clear **recommendation** and a reason. Mention a non-financial factor such as reputation or volunteer fatigue. A recommendation without a reason, or an answer that lists methods without applying them to the case, earns little credit.

## Common mistakes

:::mistake{title="Listing sources without applying them"}
Name a source and then say why it suits (or does not suit) the club, the amount needed and the deadline.
:::

:::mistake{title="Ignoring the cost of fundraising"}
An event with high takings may have costs that make the net proceeds small. Compare net proceeds, not takings.
:::

:::mistake{title="Forgetting that donations may be restricted"}
A donation for a stated purpose cannot be used for general costs.
:::

:::mistake{title="Not making a recommendation"}
Evaluation questions need a decision. State which method you recommend and why.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Papers 3 test this topic with a short case. With **suggest** or **identify**, name a suitable source and link it to the club. With **evaluate** or **advise**, compare two methods using a figure from the case (net proceeds, interest cost, time) and finish with a recommendation and a risk. With **calculate**, show net proceeds or interest clearly.
:::

## Summary

:::summary
- Clubs raise income from subscriptions, entrance fees, donations, grants, fundraising, trading, investments and hiring out facilities.
- Each source has advantages and disadvantages: certainty, cost, time, effort and conditions.
- Evaluate methods by net proceeds, certainty, speed, risk and non-financial effects.
- Borrowing gives the money now but adds interest; fundraising costs time but is uncertain.
- Compare options with figures from the case and make a clear recommendation.
- Zimbabwean examples include school clubs, savings clubs, churches and sports clubs.
:::
`;

writeLesson("club/sources-fundraising", {
  key: "club.sources-fundraising",
  title: "Sources of income and fundraising for non-profit organisations",
  summary: "Identify the sources of income of clubs and societies, compare fundraising methods and sources of finance for a purpose, and recommend one with reasons.",
  concepts: ["aacc.club.sources-fundraising"],
  estimatedMinutes: 40,
}, body);
