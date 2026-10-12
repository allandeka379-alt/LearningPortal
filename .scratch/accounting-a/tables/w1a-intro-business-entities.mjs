// Lesson generator: intro.business-entities
import { table, check, r2, fmt, statement, t } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

const cmp = table(
  ["Feature", "Sole trader", "Partnership", "Private limited company", "Public limited company"],
  [
    ["Legal form", "Not separate from the owner", "Not separate from the partners", "Separate legal person", "Separate legal person"],
    ["Owners", "One person", "Two or more partners", "Shareholders (private)", "Shareholders (any number)"],
    ["Liability for debts", "Unlimited", "Unlimited (usually joint)", "Limited to share capital unpaid", "Limited to share capital unpaid"],
    ["Control", "The owner alone", "Partners, by agreement", "Directors appointed by shareholders", "Directors; large shareholders have influence"],
    ["Continuity", "Ends with the owner", "Ends if a partner leaves unless agreed", "Continues (perpetual succession)", "Continues"],
    ["Raising capital", "Owner's savings and loans", "Partners' capital and loans", "Share issues to a small group; loans", "Public share issues, listing; loans"],
    ["Profits and tax", "Owner is taxed on the profit", "Partners taxed on their shares", "Company taxed on profit; shareholders on dividends", "Same as private"],
    ["Disclosure", "Little: for tax and the bank", "Little: for partners, bank and tax", "Statements filed; not usually public to all", "Full published accounts"],
  ],
  ["l", "l", "l", "l", "l"],
);

// Example 1: liability on failure
const capital = 12000;
const assetsRealised = 25000;
const debts = 40000;
const shortfall = r2(debts - assetsRealised);
check("shortfall", shortfall, 15000);
// partners 3:2
const pa = r2((shortfall * 3) / 5);
const pb = r2((shortfall * 2) / 5);
check("partners", pa + pb, shortfall);
const liab = table(
  ["", "Sole trader", "Partnership (3 : 2)", "Limited company (all shares fully paid)"],
  [
    ["Assets realised", assetsRealised, assetsRealised, assetsRealised],
    ["Debts owed", debts, debts, debts],
    ["Shortfall", shortfall, shortfall, shortfall],
    ["Paid from the owners' private assets", shortfall, `${fmt(pa)} and ${fmt(pb)}`, "nil"],
    ["Loss borne by creditors", "nil", "nil", shortfall],
  ],
  ["l", "r", "r", "r"],
);

// Example 2: small business choice, rows
const choose = table(
  ["Business", "Suitable form", "Reason"],
  [
    ["A market vendor selling vegetables in Mutare", "Sole trader", "Low cost, full control, no need for outside capital"],
    ["Two qualified electricians who will share work and workload", "Partnership", "Pool skills and capital; they trust each other"],
    ["A bakery wanting to raise US\$80,000 from five relatives and protect their savings", "Private limited company", "Limited liability, shares to a small group"],
    ["A large manufacturer needing millions for a new plant", "Public limited company", "Access to large amounts of capital through share issues"],
  ],
  ["l", "l", "l"],
).replace(/US\$80,000/g, "US\\$80,000");

// Informal vs formal (ZIMSEC)
const fi = table(
  ["", "Formal organisation", "Informal (non-formal) organisation"],
  [
    ["Registration", "Registered with the Registrar and the tax authority", "Not registered or only partly so"],
    ["Records", "Books and statements kept; may be audited", "Often limited or none"],
    ["Access to finance", "Easier: banks lend against records and security", "Harder: depends on savings and informal lenders"],
    ["Examples", "Registered companies, large retailers", "Street vendors, small home-based producers"],
  ],
  ["l", "l", "l"],
);

const terms = table(
  ["ZIMSEC (common usage)", "Cambridge 9706"],
  [
    ["Private limited company (Pvt) Ltd", "Private limited company"],
    ["Public limited company (Ltd)", "Public limited company (plc)"],
    ["Formal and non-formal (informal) organisations; SMEs", "Not examined as such"],
  ],
  ["l", "l"],
);

const body = t`
## Introduction

Rudo and Farai want to start a poultry business near Kariba. Should they trade as partners, each putting in savings, or register a company? The choice decides who is responsible for the debts, who controls the business, how it can raise money, how much of its accounts the public can see and who pays tax on the profit. Accountants must prepare the right statements for each form, so you need to know the differences before you study partnership and company accounts later in the course.

This lesson compares the sole trader, the partnership, the private limited company and the public limited company. Sources of finance are covered in the capital lessons. **Limited liability partnerships are not examined.**

:::keyfact{title="ZIMSEC and Cambridge terms"}
${terms}

ZIMSEC also asks about formal and non-formal organisations and about small to medium enterprises (SMEs) in Zimbabwe. Cambridge expects the four forms of business and an application to a described business.
:::

## Key definitions

:::definition{term="Sole trader"}
A business owned and usually run by one person who is personally responsible for all its debts.
:::

:::definition{term="Partnership"}
A business owned by two or more people who share the profits and are personally liable for the debts, usually according to a partnership agreement.
:::

:::definition{term="Limited liability"}
The liability of shareholders for a company's debts is limited to the amount they have agreed to pay for their shares.
:::

:::definition{term="Private limited company and public limited company"}
Separate legal entities owned by shareholders. A private company's shares are not offered to the general public. A public company may offer its shares to the public and have them listed on a stock exchange.
:::

## Comparing the forms of business

${cmp}

The sole trader and partnership are **not separate legal persons**. Contracts are made in the owner's or partners' names and their personal assets can be used to pay the business's debts. A company can own property, sue and be sued, and continues if a shareholder dies or sells their shares.

:::worked-solution[Example 1: what happens when a business fails]
Three businesses fail. Each has assets that realise US\$25,000 and debts of US\$40,000. The owners each invested US\$12,000. The partners share losses in the ratio 3 : 2. The company's shares are fully paid.

${liab}

1. The shortfall is 40,000 - 25,000 = 15,000.
2. The sole trader must pay the whole 15,000 from private assets, if he has them.
3. The partners are each liable, in practice for the whole debt, and share it 9,000 and 6,000; if one cannot pay the other must.
4. The company's shareholders do not pay more: their loss is the 12,000 they put in. The 15,000 shortfall falls on the creditors.
:::

:::worked-solution[Example 2: choosing a form for a described business]
${choose}

1. State the form first and then give the reason in terms of the business described.
2. A strong answer weighs the advantage (for example limited liability) against a cost (for example disclosure and a legal process).
:::

:::worked-solution[Example 3: formal and informal organisations (ZIMSEC)]
Chipo sells maize meal from a stall in Gweru and keeps no records. Her cousin runs a registered milling company in Harare.

${fi}

1. Chipo's business is informal: no registration and no records, so she cannot show the bank her income and finds a loan hard to get.
2. The milling company is formal: it keeps records, can be audited and borrows against its assets.
3. Both can be SMEs; the size of the business and the form of ownership are separate ideas.
:::

## Ownership, control and the effect on the accounts

In a small business the owner or partners are also the managers, so they see the records daily. In a large company thousands of shareholders own the business but a few directors run it. This **separation of ownership and control** is why companies must produce statements for outsiders, and why shareholders appoint auditors to check that the directors report fairly.

The form also decides the shape of the accounts. A sole trader's statement of financial position shows one capital account and drawings. A partnership adds a capital account and a current account for each partner and an appropriation account. A company shows share capital, reserves, dividends and tax. Later lessons build these statements; here it is enough to see that the legal form decides the headings.

Tax follows the form too, although this course does not use real tax rates. The owner of a sole trader business or the partners pay tax on their own share of the profit. A company pays tax on its own profit, and shareholders may pay tax on the dividends they receive.

## Advantages and disadvantages

| Form | Main advantages | Main disadvantages |
| --- | --- | --- |
| Sole trader | Simple, cheap, owner keeps all profit, quick decisions, privacy | Unlimited liability, limited capital, ends with the owner, long hours |
| Partnership | More capital and skills, shared workload and risk | Unlimited liability, disagreements, a partner's mistakes bind all, profits shared |
| Private limited company | Limited liability, separate entity, easier to raise capital, continuity | Formation costs and legal duties, accounts filed, shares cannot be sold freely |
| Public limited company | Very large capital, shares easily traded, continuity, status | Strict legal requirements, high cost, public disclosure, takeover risk, separation of owners and managers |

From the viewpoint of **other stakeholders**: lenders may prefer security from a sole trader's personal assets; customers and suppliers see more stability in a company that continues; employees see greater job security in a large company; the government gets more information from a company.

## Common mistakes

:::mistake{title="Saying a company is owned by the directors"}
A company is owned by its shareholders. Directors manage it. In a small private company the same people may be both, but the roles are different.
:::

:::mistake{title="Saying limited liability means creditors are never repaid"}
Limited liability protects the owners' private assets. The company's own assets are still available to creditors.
:::

:::mistake{title="Describing only advantages"}
A choice-of-form answer needs a reason for the recommended form and a cost or limit of it.
:::

:::mistake{title="Mixing up private and public"}
A private company cannot offer shares to the public; a public company can. 'Public' does not mean owned by the government.
:::

## Exam tips

:::exam-tip
ZIMSEC Papers 1 and 2 and Cambridge Papers 1 and 2 ask you to *state*, *compare* and *advise*. For *advise* on a form, give the form, two reasons linked to the business described and one drawback. For *compare*, use a point-by-point statement such as "a sole trader has unlimited liability whereas shareholders of a company have limited liability"; two separate lists earn fewer marks.
:::

:::exam-tip
When a stem gives numbers for a business failure, show the shortfall and who bears it. Marks are usually for the shortfall, for who pays and for the effect of limited liability.
:::

## Summary

:::summary
- A sole trader and a partnership are not separate from their owners; the owners have unlimited liability.
- A limited company is a separate legal person; shareholders' liability is limited to their share capital.
- Private companies sell shares to a small group; public companies may offer shares to the public and must publish full accounts.
- Companies continue when owners change; sole traders and partnerships may not.
- ZIMSEC also tests formal and informal organisations and SMEs.
- A good recommendation gives the form, a reason from the business described and a drawback.
:::
`;

writeLesson(
  "intro/business-entities.md",
  {
    key: "intro.business-entities",
    title: "Types of business organisation: sole trader, partnership, company",
    summary: "Compare sole traders, partnerships, private and public limited companies on liability, control, continuity, capital, tax and disclosure, and choose a suitable form for a described business.",
    concepts: ["aacc.intro.business-entities"],
    estimatedMinutes: 40,
    level: "core",
  },
  body,
);
