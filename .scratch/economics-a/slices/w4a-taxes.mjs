// W4a: taxation (both boards; ZIMSEC Form 6, Cambridge AS). Canons of taxation are ZIMSEC detail.
import { concept, P, chk, table, fmt, tax, money, roundTo, ZIM } from "../lib.mjs";
import { mc, LV8, LV12 } from "../tables/w4a-kit.mjs";

const bands2 = [[4000, 0], [10000, 15], [Infinity, 30]];
const LV5 = [
  [3, 4, 5, "Two-sided, developed and applied to the data, with a supported judgement."],
  [2, 2, 3, "Some development of one side or limited use of the data."],
  [1, 1, 1, "A simple statement."],
];

concept("aecon.policy.taxes", { file: "policy/taxes", keyPrefix: "policy.taxes" }, (b) => {
  mc(b, [2, "RECALL"], "Which of the following is an indirect tax?",
    ["Value added tax on goods and services", "Correct: it is charged on spending and collected by the seller."],
    [["Income tax on wages", "This is charged on income, so it is direct."],
     ["Corporation tax on company profits", "This is charged on profits, so it is direct."],
     ["Capital gains tax on the sale of shares", "This is charged on wealth gains, so it is direct."]],
    "Taxes on spending (VAT, customs and excise duties) are indirect; taxes on income, profit and wealth are direct.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "A tax is progressive when",
    ["the average rate of tax rises as income rises", "Correct: higher incomes pay a larger percentage."],
    [["the amount of tax paid falls as income rises", "That describes a very unusual tax; progression is about the percentage."],
     ["the same percentage of income is taken at every income level", "This is a proportional tax."],
     ["the average rate of tax falls as income rises", "This is a regressive tax."]],
    "Progressive means a rising average rate. A falling average rate is regressive and a constant average rate is proportional.", { daily: true });

  {
    const avg = (t, y) => (t / y) * 100;
    chk(avg(150, 1200), 12.5);
    mc(b, [2, "APPLICATION"], "A worker earns US\\$1,200 a month and pays US\\$150 in income tax. A colleague earns US\\$3,000 and pays US\\$450. This tax is",
      ["progressive, because the average rate rises from 12.5% to 15%", "Correct: 150 ÷ 1,200 = 12.5% and 450 ÷ 3,000 = 15%."],
      [["regressive, because the colleague pays more dollars of tax", "The test is the percentage of income, not the dollars paid."],
       ["proportional, because both pay a similar amount in percentage terms", "The two average rates are different."],
       ["regressive, because the average rate falls from 15% to 12.5%", "The rate rises with income, so it is not regressive."]],
      "Average rates are 12.5% and 15%. A rising average rate means the tax is progressive.", { hints: ["Work out tax ÷ income for each worker."] });
  }

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a reason for placing a high excise duty on cigarettes?",
    ["To discourage consumption of a demerit good", "Correct: it raises the price and reduces demand for a harmful good."],
    [["To make cigarettes more affordable for poor households", "A tax raises the price, it does not lower it."],
     ["To reduce the average rate of tax paid by smokers", "An excise duty does not lower anyone's tax rate."],
     ["To increase the supply of cigarettes in the economy", "A tax raises costs and tends to reduce supply."]],
    "Excise duties on tobacco raise price, discourage consumption of a demerit good and raise revenue.");

  mc(b, [3, "ANALYSIS"], "The marginal rate of tax is 30% and the average rate of tax is 18%. A pay rise will",
    ["raise the average rate of tax, because the extra income is taxed above the average", "Correct: a marginal rate above the average pulls the average up."],
    [["lower the average rate of tax, because the extra income is taxed below the average", "30% is above 18%, not below."],
     ["leave the average rate unchanged, because only the marginal rate applies", "Both rates are affected; the extra income changes the overall average."],
     ["raise the marginal rate to the level of the average rate", "The marginal rate is set by the band and does not move towards the average."]],
    "When the marginal rate exceeds the average rate, each extra dollar is taxed more heavily than the average, so the average rate rises.", { hints: ["Compare the rate on the extra income with the existing average."] });

  mc(b, [3, "APPLICATION"], "Which feature makes a tax regressive?",
    ["It takes a smaller percentage of income from higher-income households", "Correct: the average rate falls as income rises."],
    [["It takes a larger percentage of income from higher-income households", "This describes a progressive tax."],
     ["It is collected only from companies and not from households", "Who pays it does not decide whether it is regressive."],
     ["It is paid directly to the tax authority and not through a seller", "This describes a direct tax, which can be progressive."]],
    "The test is the percentage of income taken: a falling percentage as income rises is regressive.", { hints: ["Look at the percentage of income, not the dollars."] });

  mc(b, [2, "RECALL"], "Which canon of taxation says that a taxpayer should know when, how and how much to pay?",
    ["Certainty", "Correct: the tax should be clear and not arbitrary."],
    [["Equity", "This means the tax should be fair and related to ability to pay."],
     ["Economy", "This means the tax should be cheap to collect."],
     ["Convenience", "This means it should be easy to pay at a suitable time."]],
    "The four canons are equity, certainty, convenience and economy.", { applies: ZIM });

  mc(b, [4, "EVALUATION"], "A government with a large informal sector relies mainly on VAT and customs duties rather than income tax. The best economic reason is that these taxes",
    ["are easier to collect where earnings are hard to record", "Correct: tax is collected at the point of sale or import."],
    [["are always more equitable than any form of income tax", "Indirect taxes are often regressive, so this is not true."],
     ["cannot be avoided by anyone, including large importers", "Avoidance and evasion of customs duties do occur."],
     ["never change the prices that consumers pay in shops", "They raise prices, which is why they can be regressive."]],
    "Informal earnings are hard to measure, so taxes on spending and imports are administratively easier, although they may be regressive.", { hints: ["Think about the cost and ease of collecting each type of tax."] });

  {
    const t14 = tax.banded(14000, bands2); chk(t14, 2100);
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "money", value: t14, calculator: true, hints: ["Tax each band separately and add."],
      stem: "An income tax charges 0% on the first US\\$4,000 of annual income, 15% on income from US\\$4,001 to US\\$10,000 and 30% on income above US\\$10,000. Calculate the tax paid on an income of US\\$14,000, in US\\$.",
      wrong: [4200, 1500, 900], explanation: "Tax = 0 + (6,000 × 15%) + (4,000 × 30%) = 900 + 1,200 = US\\$2,100. Charging 30% on all US\\$14,000 gives 4,200." });
    const t20 = tax.banded(20000, bands2); chk(t20, 3900);
    const avg = tax.averageRate(t20, 20000); chk(avg, 19.5);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: avg, dp: 1, unit: "%", calculator: true, hints: ["Average rate = tax ÷ income × 100."],
      stem: "Using the tax bands in the previous question (0% to US\\$4,000, 15% to US\\$10,000, 30% above), calculate the average rate of tax on an income of US\\$20,000, as a percentage.",
      wrong: [30, 15, 25], explanation: "Tax = 0 + 6,000 × 15% + 10,000 × 30% = 900 + 3,000 = US\\$3,900, so the average rate = 3,900 ÷ 20,000 × 100 = 19.5%." });
    const t9 = tax.banded(9000, bands2); chk(t9, 750);
    const t16 = tax.banded(16000, bands2); chk(t16, 2700);
    const marg = ((t16 - t9) / (16000 - 9000)) * 100; chk(roundTo(marg, 1), 27.9);
    b.calc({ d: 4, skill: "APPLICATION", kind: "pct", value: marg, dp: 1, unit: "%", calculator: true, hints: ["Find the tax at each income, then divide the change in tax by the change in income."],
      stem: "Using the same bands (0% to US\\$4,000, 15% to US\\$10,000, 30% above), a worker's income rises from US\\$9,000 to US\\$16,000. Calculate the marginal rate of tax over this range, as a percentage.",
      wrong: [30, 15, 16.9], explanation: "1. Tax on US\\$9,000 = 5,000 × 15% = US\\$750.\n2. Tax on US\\$16,000 = 900 + 6,000 × 30% = 900 + 1,800 = US\\$2,700.\n3. Change in tax = 1,950; change in income = 7,000.\n4. Marginal rate = 1,950 ÷ 7,000 × 100 = 27.9%." });
  }

  b.tf({ d: 2, skill: "UNDERSTANDING", answer: false,
    stem: "True or false: a tax that takes the same number of dollars from every household must be a proportional tax.",
    feedbackFalse: "A fixed sum is a larger share of a small income than of a large one, so it is regressive.",
    explanation: "A flat amount takes a smaller percentage of income as income rises, so it is regressive. A proportional tax takes the same percentage." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each tax with its type.",
    pairs: [["Income tax on wages", "Direct tax"], ["Value added tax", "Indirect tax"], ["Excise duty on alcohol", "Indirect tax on a demerit good"], ["Corporation tax", "Direct tax on firms' profits"]],
    explanation: "Taxes on income and profit are direct; taxes on spending are indirect." });

  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.",
    template: "A tax whose average rate rises with income is {{blank:a}}. The tax paid on an extra dollar of income, as a percentage of that dollar, is the {{blank:b}} rate.",
    blanks: [{ id: "a", accepted: ["progressive"], choices: ["progressive", "regressive", "proportional"] }, { id: "b", accepted: ["marginal"], choices: ["marginal", "average", "nominal"] }],
    explanation: "A rising average rate is progressive; the rate on an extra dollar of income is the marginal rate." });

  b.short({ d: 2, skill: "RECALL", stem: "Name the type of tax, direct or indirect, that is collected by sellers when goods are bought.",
    accepted: ["indirect", "indirect tax", "an indirect tax"], wrong: ["direct"],
    explanation: "Taxes on spending are indirect: the seller collects them and passes them to the authority." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Mention the base on which each is charged."],
    stem: "Distinguish between a direct tax and an indirect tax.",
    points: ["A direct tax is charged on income or wealth and paid straight to the tax authority by the person or firm taxed.", "An indirect tax is charged on spending on goods and services and collected by the seller."],
    modelAnswer: "A direct tax, such as income tax, is charged on income or wealth and is paid straight to the tax authority by the person or firm that is taxed. An indirect tax, such as VAT, is charged on spending and is collected by the seller and passed to the authority.",
    explanation: "Direct taxes are on income or wealth; indirect taxes are on spending." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Give two reasons and explain each."],
    stem: "Explain two reasons why a government taxes its citizens.",
    points: ["To raise revenue to pay for public goods and services such as roads and schools.", "Which would not be provided at all, or not enough, by private firms.", "To redistribute income, by taxing higher incomes at higher rates.", "And spending the money on services or benefits for poorer households."],
    modelAnswer: "A government taxes to raise revenue so that it can pay for public goods and services such as roads and schools, which the private sector would not provide at all or would provide in too small a quantity. It also taxes to redistribute income: a progressive income tax takes a larger share of higher incomes, and the revenue is spent on services and benefits for poorer households.",
    explanation: "Revenue for public provision; redistribution. Other valid reasons: discouraging demerit goods, managing demand, protecting industry." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 5, hints: ["Think about incentives, avoidance and the level of the rates."],
    stem: "Analyse how a high marginal rate of income tax might affect a worker's behaviour.",
    points: ["The marginal rate is the share of each extra dollar that is taxed away.", "A higher marginal rate cuts the take-home reward for extra work or overtime.", "Some workers may therefore work fewer hours or turn down promotion (the substitution effect).", "Some may try to avoid or evade tax, or move into the informal sector.", "So revenue may rise by less than expected, although some workers may work more to keep their income (the income effect)."],
    modelAnswer: "The marginal rate is the share of each extra dollar of income that is taxed away. When it is high, the take-home reward for working an extra hour or taking a promotion falls, so some workers may choose to work fewer hours, which is the substitution effect. Others may try to avoid or evade tax or move into the informal sector. As a result the revenue raised may rise by less than expected, although some people might work longer to keep their income up, which is the income effect.",
    explanation: "Incentive, substitution effect, avoidance, income effect, revenue." });

  {
    const hh = [[400, 20], [1000, 80], [2500, 300]];
    const rate = hh.map(([y, tx]) => (tx / y) * 100); chk(rate[0], 5); chk(rate[1], 8); chk(rate[2], 12);
    const mr = ((300 - 80) / (2500 - 1000)) * 100; chk(roundTo(mr, 1), 14.7);
    const t1 = table(["Household", "Monthly income (US\\$)", "Income tax paid (US\\$)"], [["A", 400, 20], ["B", 1000, 80], ["C", 2500, 300]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Average rate = tax ÷ income × 100.", "Marginal rate = change in tax ÷ change in income × 100."],
      stem: `**Income tax in a fictional town (illustrative)**\n\nThe table shows the income tax paid by three households in one month.\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: rate[2], dp: 1, unit: "%", stem: "Calculate the average rate of tax paid by household C, as a percentage.", wrong: [8, 12.5, 300], explanation: "Average rate = 300 ÷ 2,500 × 100 = 12%." }),
        P.mcq({ label: "(b)", marks: 1, stem: "The data show that the tax is",
          options: [["progressive", "Correct: the average rate rises from 5% to 8% to 12%."], ["regressive", "The average rate rises, it does not fall."], ["proportional", "The average rates differ."], ["a lump-sum tax", "A lump-sum tax would take the same dollars from each household."]], answer: "A",
          explanation: "The average rates are 5%, 8% and 12%, so the tax is progressive." }),
        P.num({ label: "(c)", marks: 2, kind: "pct", value: mr, dp: 1, unit: "%", stem: "Calculate the marginal rate of tax between household B and household C, to one decimal place.", wrong: [12, 8, 14.5], explanation: "Change in tax = 300 − 80 = 220; change in income = 2,500 − 1,000 = 1,500. Marginal rate = 220 ÷ 1,500 × 100 = 14.7%." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain one reason why a government might use a progressive income tax.",
          points: ["To reduce inequality in disposable income.", "Higher-income households pay a larger share of income and have a greater ability to pay.", "The revenue can be used to fund services or benefits that help poorer households."],
          modelAnswer: "A government might use a progressive income tax to reduce inequality. Higher-income households pay a larger share of their income, which fits their greater ability to pay, and the revenue can be spent on services and benefits that help poorer households." }),
      ],
      explanation: "C pays 12%; average rates 5%, 8% and 12% show a progressive tax; the marginal rate from B to C is 14.7%." });
  }
  {
    const src = [["Income tax", 380], ["Corporation tax", 160], ["Value added tax", 410], ["Customs and excise duties", 250]];
    const totalRev = src.reduce((s, x) => s + x[1], 0); chk(totalRev, 1200);
    const indirectShare = ((410 + 250) / totalRev) * 100; chk(indirectShare, 55);
    const t1 = table(["Source of tax revenue", "Revenue (US\\$ million)"], [...src, ["**Total**", `**${fmt(totalRev)}**`]]);
    b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, calculator: true, hints: ["Indirect taxes are VAT and customs and excise duties.", "In (d) weigh the gain in revenue against the effect on poorer households."],
      stem: `**Tax reform in Zandia (a fictional economy)**\n\nMost workers in Zandia earn their living in the informal sector, where incomes are irregular and few records are kept. Officials find it hard to collect income tax from these workers. The Ministry of Finance proposes to raise the rate of VAT and to cut the top rate of income tax. Supporters argue that VAT is easy to collect and that lower income tax will encourage formal employment. Critics argue that poor households spend most of their income on taxed goods.\n\n**Tax revenue last year (illustrative)**\n\n${t1}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: indirectShare, dp: 1, unit: "%", stem: "Calculate the share of total tax revenue that comes from indirect taxes, as a percentage.", wrong: [45, 34, 660], explanation: "Indirect = 410 + 250 = 660; 660 ÷ 1,200 × 100 = 55%." }),
        P.manual({ label: "(b)", marks: 2, stem: "Define a regressive tax.", points: ["A tax that takes a smaller percentage of income as income rises.", "The average rate of tax falls as income rises."], modelAnswer: "A regressive tax is a tax that takes a smaller percentage of income as income rises, so that its average rate falls as income rises." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why a rise in the rate of VAT could be regressive in Zandia.",
          points: ["Poor households spend most or all of their income on goods and services, many of which are taxed.", "So the VAT paid is a larger percentage of a poor household's income than of a rich household's, which saves more.", "The average rate of tax therefore falls as income rises."],
          modelAnswer: "Poor households spend most of their income on goods and services that carry VAT, whereas richer households save a larger share of theirs. The VAT paid is therefore a larger percentage of a poor household's income than of a rich household's, so the average rate falls as income rises and the tax is regressive." }),
        P.manual({ label: "(d)", marks: 5, type: "EXTENDED_RESPONSE", wordLimit: { min: 90, max: 250 }, levels: LV5,
          stem: "Assess whether the proposed change in taxes is a good way of raising revenue in Zandia.",
          points: ["VAT is easy and cheap to collect from a large informal sector, so revenue is likely to rise.", "VAT already provides US\\$410 million, about a third of revenue, so a higher rate raises substantial sums.", "A lower top rate of income tax may reduce avoidance and encourage formal work.", "A rise in VAT is regressive and cuts the real income of poor households.", "Justified judgement, for example that the plan raises revenue but should be accompanied by exemptions on basic foods."],
          modelAnswer: "A higher VAT rate should raise a lot of revenue cheaply, because VAT is collected at the point of sale and the informal sector finds it hard to avoid. VAT already provides US\\$410 million, about a third of total revenue, so a rise would be substantial, and a lower top rate of income tax might reduce avoidance and encourage formal work. However, VAT is regressive, since poor households spend most of their income on taxed goods, so the change would reduce their real incomes and make the tax system less equitable. Overall the plan is a practical way of raising revenue, but it would be fairer if basic foods were exempt or if some of the revenue were used to help poorer households." }),
      ],
      explanation: "Indirect taxes provide 55% of revenue; VAT is cheap to collect but regressive; the judgement weighs revenue against equity." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Compare direct and indirect taxes on equity, collection and incentives."],
    stem: "Discuss whether a government should rely more on direct taxes than on indirect taxes.",
    points: ["Direct taxes can be progressive and related to ability to pay, so they reduce inequality (equity).", "Indirect taxes are often regressive, falling most heavily on the poor.", "Indirect taxes are cheap and convenient to collect and difficult to avoid, which matters where the informal sector is large (economy).", "Direct taxes may reduce incentives to work, save and invest, and are easier to avoid.", "Indirect taxes can be aimed at demerit goods and externalities.", "Indirect taxes raise prices and can add to inflation.", "A mix is usual, depending on the economy's structure.", "A justified judgement."],
    levels: LV8, wordLimit: { min: 100, max: 300 },
    modelAnswer: "Direct taxes such as income tax can be progressive and linked to ability to pay, so they are more equitable and reduce inequality, whereas indirect taxes are often regressive and fall most heavily on poorer households. However, indirect taxes are cheap to collect and hard to avoid, which matters in an economy with a large informal sector where income tax is difficult to collect, and they can be aimed at demerit goods and goods with negative externalities. Direct taxes may reduce the incentive to work, save and invest, and are easier to avoid, while indirect taxes raise prices and may add to inflation. Most governments use a mix. A heavier reliance on direct taxes is desirable where income can be measured and enforcement is strong, but where it is not, indirect taxes will remain important and equity can be protected by exempting basic goods.",
    explanation: "Equity and incentives against collection costs, avoidance and effects on prices, with a judgement." });

  b.card("DEFINITION", "Define a **direct tax**.", "A tax charged on income or wealth and paid straight to the tax authority by the person or firm taxed, for example income tax.");
  b.card("DEFINITION", "Define an **indirect tax**.", "A tax charged on spending on goods and services, collected by the seller and passed to the tax authority, for example VAT.");
  b.card("DEFINITION", "Progressive, regressive and proportional taxes?", "Progressive: the average rate rises with income. Regressive: it falls with income. Proportional: it is constant.");
  b.card("FORMULA", "Average rate of tax?", "Tax paid ÷ income × 100.");
  b.card("FORMULA", "Marginal rate of tax?", "Change in tax paid ÷ change in income × 100.");
  b.card("CONCEPT", "In a banded income tax, to which income does each rate apply?", "Only to the income inside that band, not to all income.");
  b.card("CONCEPT", "Give four reasons why governments tax.", "Raise revenue, redistribute income, discourage demerit goods and externalities, influence demand or protect industry.");
  b.card("FACT", "What are the four canons of taxation?", "Equity, certainty, convenience and economy.", "ZIMSEC checklist.", { applies: ZIM });
  b.card("CONCEPT", "Why do many developing economies rely on indirect taxes?", "They are easier and cheaper to collect than income tax where much activity is informal and records are scarce.");
});
