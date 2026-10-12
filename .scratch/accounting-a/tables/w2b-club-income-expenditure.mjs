// Lesson: club.income-expenditure
import { money, fmt, chk, r2, sum, table, statement, tAccount } from "../lib.mjs";
import { writeLesson, U, subs } from "./w2b-lib.mjs";

const o = { prem: 40000, eq: 8500, bank: 3200, arr: 400, adv: 200, acc: 300 };
const fund0 = chk(o.prem + o.eq + o.bank + o.arr - o.adv - o.acc, 51600);
const r = { subs: 12300, ent: 600, don: 750, pav: 2000, life: 1500, fete: 1800 };
const p = { gr: 6000, ut: 1900, eqb: 2400, ins: 900, adm: 1300 };
const totR = chk(Object.values(r).reduce((a, b) => a + b, 0), 18950);
const totP = chk(Object.values(p).reduce((a, b) => a + b, 0), 12500);
const bankC = chk(o.bank + totR - totP, 9650);
const c = { arr: 550, adv: 260, acc: 350, pre: 150 };
const s = subs({ date0: "1 Jan 2025", date1: "31 Dec 2025", o: { arrears: o.arr, advance: o.adv }, c: { arrears: c.arr, advance: c.adv }, received: r.subs, title: "Subscriptions account" });
chk(s.income, 12390);
const gr = chk(p.gr - o.acc + c.acc, 6050);
const ins = chk(p.ins - c.pre, 750);
const dep = chk((o.eq + p.eqb) * 0.1, 1090);
const lifeIncome = chk(r.life / 10, 150);
const lifeDeferred = r.life - lifeIncome;
const income = chk(s.income + r.ent + r.don + r.fete + lifeIncome, 15690);
const expd = chk(gr + p.ut + ins + p.adm + dep, 11090);
const surplus = chk(income - expd, 4600);
const ie = statement("Gweru Sports Club: income and expenditure account for the year ended 31 December 2025", [
  ["Income", null, null], ["Subscriptions", s.income, null], ["Entrance fees", r.ent, null], ["General donations", r.don, null], ["Net proceeds of the annual fete", r.fete, null], ["Life membership fees (1/10 of 1,500)", lifeIncome, null], ["Total income", null, income],
  ["Expenditure", null, null], ["Groundsman's wages", gr, null], ["Utilities", p.ut, null], ["Insurance", ins, null], ["Administration", p.adm, null], ["Depreciation of equipment", dep, null], ["Total expenditure", null, -expd],
  ["**Surplus for the year**", null, surplus],
], { cols: [U, U], checks: [["surplus", surplus, income - expd]] });
const eqC = o.eq + p.eqb - dep;
const nca = o.prem + eqC;
const ca = c.arr + c.pre + bankC;
const cl = c.adv + c.acc;
const net = chk(nca + ca - cl - lifeDeferred, 58200);
const fundC = fund0 + surplus;
chk(fundC + r.pav, net);
const sofp = statement("Gweru Sports Club: statement of financial position at 31 December 2025", [
  ["Non-current assets", null, null], ["Premises", o.prem, null], ["Equipment (8,500 + 2,400 − 1,090)", eqC, null], ["", null, nca],
  ["Current assets", null, null], ["Subscriptions in arrears", c.arr, null], ["Insurance prepaid", c.pre, null], ["Bank", bankC, null], ["", null, ca],
  ["Current liabilities", null, null], ["Subscriptions received in advance", -c.adv, null], ["Groundsman's wages owing", -c.acc, null], ["", null, -cl],
  ["Life membership fees (deferred income)", null, -lifeDeferred], ["**Net assets**", null, net],
  ["Accumulated fund at 1 January 2025", null, fund0], ["Add surplus for the year", null, surplus], ["Accumulated fund at 31 December 2025", null, fundC], ["Pavilion fund (specific donation)", null, r.pav], ["**Total funds**", null, fundC + r.pav],
], { cols: [U, U], checks: [["net", net, fundC + r.pav]] });
const donations = table(["Type of donation", "Treatment"], [
  ["General donation for the club's use", "Income in the income and expenditure account"],
  ["Donation for a capital purpose (for example a pavilion)", "Credited to a separate fund in the statement of financial position; not income of the year"],
  ["Donation of an asset (for example equipment)", "Asset recorded at its value, with the same amount credited to the fund"],
  ["Donation for a revenue purpose (for example a coach)", "Income as the money is spent; unspent part held as a liability or fund"],
], ["l", "l"]);

// Example 1: donations and life membership
const d1 = { gen: 400, bus: 3000, comp: 900, lifeN: 4, lifeFee: 250, years: 5 };
const lifeTot = d1.lifeN * d1.lifeFee;
const lifeInc = chk(lifeTot / d1.years, 200);
const lifeDef = lifeTot - lifeInc;
const t1 = table(["Item", `Amount ${U}`, "Income and expenditure account", "Statement of financial position"], [
  ["General donation", d1.gen, `Income ${fmt(d1.gen)}`, "Included in the accumulated fund through the surplus"],
  ["Donation for a new bus", d1.bus, "Not income", `Bus fund ${fmt(d1.bus)} (with the bank balance held for it)`],
  ["Donated computer (value 900)", d1.comp, "Not income", `Computer ${fmt(d1.comp)} as an asset; capital fund ${fmt(d1.comp)}`],
  ["Life membership: 4 × 250 over 5 years", lifeTot, `Income ${fmt(lifeInc)} (1/5)`, `Deferred income ${fmt(lifeDef)}`],
], ["l", "r", "l", "l"]);
chk(lifeInc + lifeDef, lifeTot);

const body = `
## Introduction

Gweru Sports Club's committee meets for its annual general meeting. The members want to know whether the club covered its running costs, whether the pavilion appeal is on track and what the club owns. The treasurer answers with two statements: the **income and expenditure account**, which compares the income of the year with the expenditure of the year, and the **statement of financial position**, which shows the assets, liabilities and the accumulated fund. These are the club's equivalents of a trader's statement of profit or loss and statement of financial position.

Clubs and societies are ZIMSEC Form 5 and, for Cambridge, A Level only (Paper 3). You should know the receipts and payments account, the accumulated fund, subscriptions and club activities.

:::keyfact{title="ZIMSEC and Cambridge terms"}
ZIMSEC: **not-for-profit organisations**, **income and expenditure account**, **accumulated fund**. Cambridge: **clubs and societies**, **income and expenditure account**, **accumulated fund**, **statement of financial position**. The accounting treatment of different types of donation is part of both syllabi.
:::

## Key definitions

:::definition{term="Income and expenditure account"}
A statement of the income earned and the expenditure incurred in a period, on the accruals basis. The excess of income over expenditure is a surplus; the excess of expenditure over income is a deficit.
:::

:::definition{term="Life membership fee"}
A single payment that gives a member membership for life. It is usually spread over a number of years, or taken straight to the accumulated fund if the club decides.
:::

:::definition{term="Specific-purpose fund"}
A fund for money given for a stated purpose (for example a pavilion). It is shown separately in the statement of financial position until it is spent.
:::

## Preparing the income and expenditure account

1. Start from the **receipts and payments account** and the notes (arrears, advances, accruals, prepayments, depreciation).
2. Show **income** first: subscriptions (from the subscriptions account), entrance fees, general donations, profit on activities (bar, events), life membership instalments and sundry income.
3. Show **expenditure** next: each cost adjusted for accruals and prepayments, with depreciation. **Capital payments** (equipment, buildings) are not expenditure.
4. The balance is the surplus or deficit. A **surplus** is added to the accumulated fund; a **deficit** is deducted.

The statement of financial position follows the usual order: non-current assets at carrying amount, current assets, liabilities, and the funds.

## Donations and life membership

The treatment depends on the purpose of the donation.

${donations}

**Life membership** can be treated in two ways. The first is to spread the fee over the expected life of the membership (for example ten years): each year one tenth is credited to income and the rest is held as deferred income in the statement of financial position. The second is to credit the whole fee to the accumulated fund, which is simpler but gives no income in later years. The question states which method to use.

:::worked-solution[Example 1: donations and life membership fees]
A club receives these items in the year: a general donation of ${money(d1.gen)}; ${money(d1.bus)} for a new minibus (specific purpose); a computer valued at ${money(d1.comp)} given by a supporter; and life membership fees from 4 members at ${money(d1.lifeFee)} each, to be credited to income over 5 years.

1. The general donation is income for the year.
2. The minibus donation and the computer are capital gifts: they increase a specific fund and the assets, not the surplus.
3. Life membership: total 1,000; one fifth (200) is income this year and 800 is deferred income.

${t1}
:::

:::worked-solution[Example 2: income and expenditure account and statement of financial position]
At 1 January 2025 Gweru Sports Club had premises ${money(o.prem)}, equipment ${money(o.eq)}, bank ${money(o.bank)} and subscriptions in arrears ${money(o.arr)}; it had received ${money(o.adv)} of subscriptions in advance and owed ${money(o.acc)} to the groundsman. The accumulated fund was therefore ${money(fund0)}.

Receipts in 2025: subscriptions ${money(r.subs)}, entrance fees ${money(r.ent)}, general donations ${money(r.don)}, a donation of ${money(r.pav)} for a new pavilion, life membership fees ${money(r.life)} (five members at 300) and net proceeds of the annual fete ${money(r.fete)}. Payments: groundsman ${money(p.gr)}, utilities ${money(p.ut)}, new equipment ${money(p.eqb)}, insurance ${money(p.ins)}, administration ${money(p.adm)}.

At 31 December 2025: subscriptions in arrears ${money(c.arr)}; in advance ${money(c.adv)}; groundsman owed ${money(c.acc)}; insurance prepaid ${money(c.pre)}. Equipment is depreciated at 10% on cost of 8,500 + 2,400. Life membership fees are credited to income over ten years (one tenth this year). The pavilion donation is held in a separate fund.

1. Subscriptions income: 12,300 + 550 + 200 − 400 − 260 = 12,390.
2. Groundsman: 6,000 − 300 + 350 = 6,050. Insurance: 900 − 150 = 750. Depreciation: 10% × 10,900 = 1,090.
3. Life membership income: 1,500 ÷ 10 = 150; deferred 1,350.
4. Surplus: income 15,690 − expenditure 11,090 = 4,600.
5. Bank at the end: 3,200 + 18,950 − 12,500 = 9,650.

${ie}

${sofp}

The net assets (58,200) equal the accumulated fund of 56,200 plus the pavilion fund of 2,000.
:::

## Reading the statements

A surplus of 4,600 means the income of the year covered the running costs, but 1,800 of it came from the fete and 750 from donations, which may not recur. The pavilion fund of 2,000 is cash that cannot be used for running costs. The committee should plan how to raise the rest of the money for the pavilion.

## Common mistakes

:::mistake{title="Treating equipment purchases as expenditure"}
New equipment is a capital payment. Charge only depreciation in the income and expenditure account.
:::

:::mistake{title="Putting a capital donation in the income"}
A donation for a pavilion is credited to a specific fund. It is not income of the year.
:::

:::mistake{title="Forgetting the deferred part of life membership"}
If the fee is spread over ten years, only one tenth is income this year. The rest is a liability.
:::

:::mistake{title="Adding the surplus to the wrong fund"}
The surplus goes to the accumulated fund. The pavilion fund changes only through donations and spending.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 2 and 3 and Cambridge Paper 3 test this topic as a full question. With **prepare**, show the heading, income and expenditure sections with sub-totals, the surplus or deficit, and then the statement of financial position. With **calculate**, show each adjustment. With **explain**, justify the treatment of a donation by its purpose. With **evaluate**, comment on the reliability of income such as fundraising.
:::

## Summary

:::summary
- The income and expenditure account compares the income and expenditure of the year (accruals basis); the result is a surplus or deficit.
- Capital payments are not expenditure; depreciation is.
- A surplus is added to the accumulated fund and a deficit deducted.
- General donations are income; capital donations go to a specific fund.
- Life membership fees are spread over a stated number of years or credited to the fund.
- The statement of financial position shows net assets equal to the accumulated fund and other funds.
:::
`;

writeLesson("club/income-expenditure", {
  key: "club.income-expenditure",
  title: "Income and expenditure account and the club's statement of financial position",
  summary: "Prepare a club's income and expenditure account and statement of financial position, treating donations, life membership fees and year-end adjustments correctly.",
  concepts: ["aacc.club.income-expenditure"],
  estimatedMinutes: 55,
}, body);
