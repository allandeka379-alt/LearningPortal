// Lesson generator: cost.overhead-absorption
import { t, table, check, chk, r2, costing, fmt } from "../lib.mjs";
import { writeLesson, front } from "./w4a-lib.mjs";

// Example 1: Bulawayo Metal Fabricators, departmental rates
const mOH = 48000, mHrs = 8000, fOH = 30000, fHrs = 12000;
const mRate = costing.oar(mOH, mHrs);
const fRate = costing.oar(fOH, fHrs);
chk(mRate, 6); chk(fRate, 2.5);
const jm = 14, jf = 30;
const absM = jm * mRate, absF = jf * fRate;
chk(absM, 84); chk(absF, 75);
const dm = 520, dl = 30 * 4.0;
const prime = dm + dl;
const total = prime + absM + absF;
chk(total, 520 + 120 + 84 + 75);
const rates = table(["Department", "Budgeted overhead US\\$", "Budgeted activity", "Absorption rate"], [
  ["Machining", mOH, "8,000 machine hours", "US\\$6.00 per machine hour"],
  ["Fitting", fOH, "12,000 direct labour hours", "US\\$2.50 per direct labour hour"],
], ["l", "r", "l", "l"]);
const jobTab = table(["Job J201 (a set of grain-store doors)", "Working", "US\\$"], [
  ["Direct materials", "", dm],
  ["Direct labour: 30 hours at US\\$4.00", "30 × 4.00", dl],
  ["**Prime cost**", "", prime],
  ["Machining overhead", "14 machine hours × 6.00", absM],
  ["Fitting overhead", "30 labour hours × 2.50", absF],
  ["**Total production cost**", "", total],
], ["l", "l", "r"]);
const single = costing.oar(mOH + fOH, 20000);
chk(single, 3.9);

// Example 2: effect of the basis
const budOH = 90000;
const bases = [
  ["Direct labour hours", "15,000 hours", costing.oar(budOH, 15000), "per hour"],
  ["Machine hours", "9,000 hours", costing.oar(budOH, 9000), "per hour"],
  ["Direct labour cost", "US\\$60,000", (budOH / 60000) * 100, "% of direct labour cost"],
  ["Prime cost", "US\\$150,000", (budOH / 150000) * 100, "% of prime cost"],
  ["Units produced", "7,500 units", costing.oar(budOH, 7500), "per unit"],
];
chk(bases[0][2], 6); chk(bases[1][2], 10); chk(bases[2][2], 150); chk(bases[3][2], 60); chk(bases[4][2], 12);
const baseTab = table(["Basis", "Budgeted activity", "Rate", "Unit"], bases.map((b) => [b[0], b[1], b[2], b[3]]), ["l", "l", "r", "l"]);
const A = { dm: 400, dl: 80, dlh: 20, mh: 4 };
const B = { dm: 300, dl: 20, dlh: 5, mh: 18 };
const ohA = [A.dlh * 6, A.mh * 10, A.dl * 1.5, (A.dm + A.dl) * 0.6];
const ohB = [B.dlh * 6, B.mh * 10, B.dl * 1.5, (B.dm + B.dl) * 0.6];
chk(ohA[0], 120); chk(ohA[1], 40); chk(ohA[2], 120); chk(ohA[3], 288);
chk(ohB[0], 30); chk(ohB[1], 180); chk(ohB[2], 30); chk(ohB[3], 192);
const effect = table(["Overhead absorbed", "Job A US\\$", "Job B US\\$"], [
  ["Direct labour hours at US\\$6.00", ohA[0], ohB[0]],
  ["Machine hours at US\\$10.00", ohA[1], ohB[1]],
  ["Direct labour cost at 150%", ohA[2], ohB[2]],
  ["Prime cost at 60%", ohA[3], ohB[3]],
], ["l", "r", "r"]);

const terms = table(["ZIMSEC (syllabus and common usage)", "Cambridge 9706"], [
  ["Overhead absorption rate (OAR); recovery rate", "Overhead absorption rate (OAR)"],
  ["Direct labour hour rate; machine hour rate", "Direct labour hour rate; machine hour rate"],
  ["Percentage on direct labour cost or on prime cost", "Percentage of direct labour cost or prime cost"],
], ["l", "l"]);

const body = t`
## Introduction

After the overheads have been allocated, apportioned and reapportioned, Bulawayo Metal Fabricators knows that the machining department will cost US\$48,000 next year and the fitting department US\$30,000. The owner, Farai Dube, must now decide how much of this to add to the cost of a set of doors that passes through both departments. He cannot wait for the year to end, because he must quote a price now. The answer is a **pre-determined overhead absorption rate**. Absorption rates are tested in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4, and they lead directly to over- and under-absorption.

You should know how overheads are shared among departments and how to calculate a prime cost.

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

Both boards examine all five bases. The question normally gives the base to use; you may be asked to justify a choice.
:::

## Key definitions

:::definition{term="Overhead absorption rate (OAR)"}
A rate, calculated in advance, used to charge production overheads to cost units. OAR = budgeted overhead ÷ budgeted activity.
:::

:::definition{term="Absorption"}
Adding overhead to the cost of a unit, job or batch by multiplying the activity of the unit by the OAR.
:::

:::definition{term="Absorption base"}
The measure of activity used for the OAR, such as direct labour hours, machine hours, direct labour cost, prime cost or units produced.
:::

## Why a pre-determined rate?

Actual overheads are known only after the end of the period, but selling prices and quotations are needed now. A **budgeted** rate smooths seasonal swings in cost (for example the electricity bill is heavier in winter), so a job done in a busy month does not carry more overhead than the same job in a quiet month. The cost of using budgets is that the amount absorbed will differ from the actual overhead; the difference is dealt with in the next lesson.

## Choosing the base

The best base reflects what causes the overhead to be incurred.

| Base | Suits |
| --- | --- |
| Units produced | One product, or identical units |
| Direct labour hours | Labour-intensive departments |
| Machine hours | Machine-intensive departments |
| Percentage of direct labour cost | Labour-intensive with similar wage rates |
| Percentage of prime cost | Rarely best: it assumes overhead follows materials as well as labour |

A **departmental rate** for each production department is more accurate than a single factory rate because the departments may use different amounts of labour and machine time. A job is charged with each department's rate multiplied by the time it spends there.

:::worked-solution[Example 1: departmental rates and a job cost for Bulawayo Metal Fabricators]
After reapportionment the budgeted overheads and activity for the year are as follows.

${rates}

Job J201 needs 14 machine hours in Machining and 30 direct labour hours in Fitting. Direct materials are US\$520 and labour is paid at US\$4.00 an hour.

${jobTab}

Suppose Farai used one factory rate on direct labour hours instead, with total budgeted direct labour hours of 20,000 in both departments. The rate would be (48,000 + 30,000) ÷ 20,000 = US\$3.90 an hour, giving 30 × 3.90 = US\$117 of overhead to J201 instead of US\$159. Using the machine-based rate for the machine-intensive department gives a fairer cost for a job that uses a lot of machine time.
:::

## Applying the rate

Once the rate is known, absorption is a multiplication. A rate of US\$6.00 per machine hour applied to a job that uses 14 machine hours gives US\$84. A percentage rate is applied to the matching cost: with direct labour cost of US\$80 and a rate of 150% of direct labour cost the overhead is US\$120. A rate per unit (overhead ÷ units produced) is the simplest of all and suits a business making one standard product, such as a bakery making one type of loaf. Whatever the base, the rate should be reviewed when budgets are revised, because a rate based on a forecast that proves wrong will under- or over-recover the factory cost.

## How the base changes the cost

Different bases give different costs for jobs that use resources in different proportions. The factory budgets overhead of US\$90,000. The activity is 15,000 direct labour hours, 9,000 machine hours, direct labour cost of US\$60,000, prime cost of US\$150,000 and 7,500 units.

${baseTab}

:::worked-solution[Example 2: two jobs and four bases]
Job A uses US\$400 of materials, 20 labour hours (labour cost US\$80) and 4 machine hours. Job B uses US\$300 of materials, 5 labour hours (US\$20) and 18 machine hours.

${effect}

Under the labour hour and labour cost bases, Job A (labour-intensive) carries US\$120 and Job B only US\$30. Under the machine hour basis the position reverses: A carries US\$40 and B US\$180. The prime cost basis falls between the two. The same factory overhead of US\$90,000 is spread differently, so the same job can be quoted at very different prices depending on the base. An examiner expects you to name the base that best matches how the overhead is caused and to comment on the effect on cost.
:::

## Common mistakes

:::mistake{title="Using actual overhead and actual activity"}
The rate is calculated from the budgeted overhead and the budgeted activity. Using actual figures is used only to find the under- or over-absorption afterwards.
:::

:::mistake{title="Mixing a rate in dollars per hour with a percentage"}
A labour hour rate is applied to hours. A percentage rate is applied to the cost of labour (or prime cost). Check the units before multiplying.
:::

:::mistake{title="Applying a factory-wide rate when departments are given"}
If the question gives departmental overheads and activities, calculate a rate for each department and charge the job for the time spent in each.
:::

:::mistake{title="Adding overhead to the non-production costs"}
The rate absorbs production overhead only. Selling and administration costs are added later, if at all, as a mark-up or are treated as period costs.
:::

## Exam tips

:::exam-tip
Absorption rates feature in ZIMSEC Papers 2 and 3 and in Cambridge Paper 2 question 4. For *calculate* the rate, write budgeted overhead ÷ budgeted activity, give the unit (US\$ per direct labour hour or % of direct labour cost) and round as instructed. For *prepare* a job or unit cost, show prime cost, overheads absorbed by department and total.
:::

:::exam-tip
For *explain* the choice of a base, link the base to the cause: machine hours for a machine-intensive department, labour hours for labour-intensive work. For *evaluate*, state that the rate is based on forecasts and that a different base changes the price quoted to customers.
:::

## Summary

:::summary
- OAR = budgeted overhead ÷ budgeted activity, calculated before the period starts.
- Bases: direct labour hours, machine hours, direct labour cost, prime cost, units produced.
- A departmental rate multiplied by the job's time in each department gives a fairer cost than one factory rate.
- Overhead absorbed = OAR × actual activity of the unit, job or batch.
- The base changes how a fixed total overhead is spread, so it changes unit costs and prices.
:::
`;
writeLesson("cost/overhead-absorption.md", front("cost.overhead-absorption", "Overhead absorption rates", "Calculate pre-determined absorption rates on labour hours, machine hours, labour cost, prime cost or units, absorb overhead into jobs and units, and explain how the choice of base changes cost.", "aacc.cost.overhead-absorption", 50), body);
