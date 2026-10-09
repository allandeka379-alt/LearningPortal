// W3b: econ.fiscal.taxation — reasons for taxation, direct and indirect taxes, progressive / proportional / regressive
// taxes (tax paid, average rates), impact of taxation. Figures differ from the lesson's worked examples.
import { concept, P, ZIM, table, tax, pct, fmt, check } from "../lib.mjs";

const LV = (m) => {
  const a = Math.round(m / 3), c = Math.round((2 * m) / 3);
  return [[1, 1, a, "Simple points, little explanation."], [2, a + 1, c, "Some analysis of both sides or one side well developed, limited conclusion."], [3, c + 1, m, "Two-sided analysis, developed, with a justified conclusion."]];
};

concept("econ.fiscal.taxation", { file: "fiscal/taxation", keyPrefix: "fiscal.taxation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which is a **direct** tax?",
    options: [
      ["Income tax on a worker's salary", "Correct: a tax on income paid by the person who earns it."],
      ["Value added tax on a bag of rice", "VAT is a tax on spending, an indirect tax."],
      ["Customs duty on an imported car", "A duty on goods is an indirect tax."],
      ["Excise duty on a litre of fuel", "Excise duty on goods is an indirect tax."],
    ],
    answer: "A",
    explanation: "Direct taxes are on income and wealth; indirect taxes are on spending.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A tax is **progressive** if",
    options: [
      ["the percentage of income paid in tax rises as income rises.", "Correct: the average tax rate increases with income."],
      ["people with higher incomes pay a larger amount of tax.", "Under a proportional tax the rich also pay more dollars."],
      ["everyone pays the same amount of tax.", "An equal amount is a larger share of a low income: regressive."],
      ["it is charged on goods and services.", "That describes an indirect tax."],
    ],
    answer: "A",
    explanation: "Progressive means the average rate (percentage of income) rises with income.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "A value added tax charged as a fixed percentage of the selling price is an example of",
    options: [
      ["an ad valorem tax.", "Correct: ad valorem means 'according to value', a percentage of the price."],
      ["a specific tax.", "A specific tax is a fixed amount per unit."],
      ["a direct tax.", "VAT is a tax on spending, so it is indirect."],
      ["a progressive tax.", "VAT on goods is usually regressive or proportional, not progressive."],
    ],
    answer: "A",
    explanation: "Ad valorem taxes are a percentage of value; specific taxes are a fixed sum per unit.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Under a tax in a fictional country, Rudo earns US\\$500 a month and pays US\\$25 in tax; Sipho earns US\\$2,000 a month and pays US\\$100. What kind of tax is it?",
    options: [
      ["Proportional, because both pay 5% of their income", "Correct: 25 ÷ 500 and 100 ÷ 2,000 are both 5%."],
      ["Progressive, because Sipho pays more tax", "Sipho pays more dollars but the same percentage."],
      ["Regressive, because Rudo's income is much lower than Sipho's", "The share of income paid is the same, so it is not regressive."],
      ["Indirect, because it is a fixed amount", "The amounts differ, and nothing shows it is on spending."],
    ],
    answer: "A",
    hints: ["Calculate tax as a percentage of income for each person."],
    explanation: "Both average rates are 5%, so the tax is proportional.",
  });
  check("prop", (25 / 500) * 100, (100 / 2000) * 100);
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is a tax on basic foods usually **regressive**?",
    options: [
      ["Poorer households spend a larger share of their income on basic foods", "Correct: the tax takes a larger percentage of low incomes."],
      ["Richer households buy more basic foods than poorer households", "Even so, the tax would be a smaller share of their income."],
      ["The tax rate is higher for poorer households", "The rate is the same for every buyer."],
      ["Basic foods are bought only by poor households", "Everyone buys basic foods."],
    ],
    hints: ["Compare the tax paid with each household's income."],
    answer: "A",
    explanation: "Because necessities take a bigger share of a low income, a tax on them takes a bigger percentage of the poor's income.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Tatenda's marginal tax rate is 30% and his average tax rate is 18%. What does this mean?",
    options: [
      ["He pays 30c of each extra dollar earned, and 18% of his total income in tax", "Correct: marginal = rate on extra income; average = total tax ÷ income."],
      ["He pays 30% of his total income in tax and 18c of each extra dollar earned", "This reverses the two rates."],
      ["He pays 48% of his income in tax", "The two rates are not added."],
      ["The tax must be regressive", "A marginal rate above the average rate indicates a progressive tax."],
    ],
    answer: "A",
    hints: ["Marginal means 'on the next dollar'."],
    explanation: "The marginal rate applies to extra income; the average rate is total tax as a share of total income. Marginal > average shows a progressive structure.",
  });
  b.mcq({
    d: 2, skill: "RECALL", applies: ZIM,
    stem: "Which is a **principle (canon) of a good tax**?",
    options: [
      ["Certainty: taxpayers know how much to pay and when", "Correct: a good tax is clear and predictable."],
      ["The tax should cost more to collect than it raises", "A good tax is economical to collect."],
      ["The tax should be changed every month", "Frequent changes reduce certainty."],
      ["The tax should fall mainly on the poorest households", "Equity requires taxing according to ability to pay."],
    ],
    answer: "A",
    explanation: "The canons include equity (ability to pay), certainty, convenience and economy of collection.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A government raises the top rate of income tax from 40% to 60%, but tax revenue from high earners hardly rises. Which is the most likely explanation?",
    options: [
      ["High earners work less, move abroad or avoid and evade the tax", "Correct: higher rates reduce incentives and encourage avoidance."],
      ["The tax change made the income tax system less progressive than before", "Raising the top rate makes the system more progressive."],
      ["High earners' incomes are not taxed by income tax", "Income tax falls on all taxable incomes."],
      ["Indirect taxes were cut at the same time", "Nothing in the stem suggests this."],
    ],
    answer: "A",
    hints: ["How might people respond to keeping only 40c of each extra dollar?"],
    explanation: "Very high marginal rates can reduce work effort and increase avoidance, evasion and emigration, so revenue may rise little.",
  });

  // Numericals.
  {
    const y = 900, t = 54, avg = tax.averageRate(t, y);
    check("avg", avg, 6);
    b.num({
      d: 2, skill: "APPLICATION", kind: "pct", value: avg, daily: true,
      stem: `Nyasha earns US\\$${y} a month and pays US\\$${t} in income tax. Calculate her average tax rate. Give your answer to one decimal place.`,
      wrong: [(y / t)],
      explanation: `Average tax rate = ${t} ÷ ${y} × 100 = **${pct(avg, 1)}**.`,
    });
  }
  {
    const price = 85, rate = 12, vat = (price * rate) / 100;
    check("vat", vat, 10.2);
    b.num({
      d: 2, skill: "APPLICATION", kind: "money", value: price + vat,
      stem: `Suppose VAT is charged at ${rate}% of the price before tax. A pair of school shoes costs US\\$${price} before VAT. Calculate the price the customer pays, including VAT, in US\\$.`,
      wrong: [vat, price * (1 - rate / 100)],
      explanation: `VAT = ${rate}% × ${price} = US\\$${fmt(vat, 2)}; price paid = ${price} + ${fmt(vat, 2)} = **US\\$${fmt(price + vat, 2)}**.`,
    });
  }
  {
    const bands = [[250, 0], [1200, 15], [Infinity, 35]], y = 1800, t = tax.banded(y, bands), avg = tax.averageRate(t, y);
    check("t", t, 352.5);
    b.calc({
      d: 3, skill: "APPLICATION", kind: "money", value: t, calculator: true,
      stem: `In a fictional country, the first US\\$250 of monthly income is tax-free, income from US\\$250 to US\\$1,200 is taxed at 15%, and income above US\\$1,200 is taxed at 35%. Calculate the monthly tax paid by Thandeka, who earns US\\$${fmt(y)} a month, in US\\$.`,
      wrong: [y * 0.35, (y - 250) * 0.35, (y - 250) * 0.15],
      hints: ["Split the income into slices: 0-250, 250-1,200 and above 1,200.", "Apply each rate only to its own slice."],
      explanation: `1. First US\\$250: 0.\n2. 250 to 1,200: 15% × 950 = ${fmt(0.15 * 950, 2)}.\n3. Above 1,200: 35% × ${y - 1200} = ${fmt(0.35 * (y - 1200), 2)}.\n4. Total tax = **US\\$${fmt(t, 2)}** (average rate ${pct(avg, 1)}). Applying 35% to the whole income (${fmt(y * 0.35, 2)}) is wrong.`,
    });
    const bands2 = [[300, 0], [1000, 15], [Infinity, 30]], y2 = 3000, t2 = tax.banded(y2, bands2), avg2 = tax.averageRate(t2, y2);
    check("t2", t2, 705);
    b.calc({
      d: 4, skill: "ANALYSIS", kind: "pct", value: avg2, calculator: true,
      stem: `In another fictional country, the first US\\$300 of monthly income is tax-free, income from US\\$300 to US\\$1,000 is taxed at 15%, and income above US\\$1,000 is taxed at 30%. Calculate the average tax rate for a person earning US\\$${fmt(y2)} a month. Give your answer to one decimal place.`,
      wrong: [30, (0.3 * (y2 - 1000) / y2) * 100],
      hints: ["Find the total tax first, slice by slice.", "Average rate = total tax ÷ income × 100."],
      explanation: `1. Tax = 0 + 15% × 700 + 30% × ${fmt(y2 - 1000)} = ${fmt(0.15 * 700)} + ${fmt(0.3 * (y2 - 1000))} = US\\$${fmt(t2)}.\n2. Average rate = ${fmt(t2)} ÷ ${fmt(y2)} × 100 = **${pct(avg2, 1)}**.\n3. 30% is the marginal rate, not the average rate: the average is lower because the first slices of income are taxed at 0% and 15%.`,
    });
  }

  b.tf({
    d: 1, skill: "RECALL",
    stem: "Customs duty on imported goods is an indirect tax.",
    answer: true,
    explanation: "True. It is a tax on goods, collected when they are imported and passed on in prices.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under a proportional income tax, a person earning US\\$2,400 pays the same amount of tax as a person earning US\\$600.",
    answer: false,
    explanation: "False. Both pay the same percentage, so the higher earner pays four times as much tax.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tax with its description.",
    pairs: [
      ["PAYE income tax", "Direct tax, usually progressive"],
      ["VAT", "Indirect ad valorem tax"],
      ["A fixed duty of US\\$0.25 per litre of fuel", "Indirect specific tax"],
      ["Corporate (company) tax", "Direct tax on firms' profits"],
    ],
    explanation: "Direct taxes fall on income and profits; indirect taxes fall on spending, as a percentage (ad valorem) or a fixed sum (specific).",
  });
  b.fib({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct words.",
    template: "A tax that takes 3% of a low income and 1% of a high income is {{blank:a}}. A rise in income tax is likely to {{blank:b}} consumer spending and {{blank:c}} the government's budget deficit.",
    blanks: [
      { id: "a", accepted: ["regressive"], choices: ["progressive", "proportional", "regressive"] },
      { id: "b", accepted: ["reduce"], choices: ["increase", "reduce"] },
      { id: "c", accepted: ["reduce"], choices: ["increase", "reduce"] },
    ],
    wrong: [["progressive", "increase", "increase"]],
    hints: ["Compare the percentages, not the amounts."],
    explanation: "A falling percentage as income rises means regressive. Higher income tax lowers disposable income and raises revenue.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why governments impose taxes.",
    points: [
      "Identifies: to raise revenue.",
      "Explains: to finance public services such as schools, clinics and roads.",
      "Identifies a second reason: redistribute income / discourage demerit goods / correct externalities / protect industries / manage demand.",
      "Explains it, e.g. excise duty raises the price of cigarettes so fewer are bought.",
    ],
    modelAnswer: "First, taxes raise revenue so the government can pay for public services such as schools, clinics, roads and the police. Second, taxes can discourage harmful goods: an excise duty on cigarettes raises their price, so people buy fewer and health improves.",
    hints: ["Think about what taxes pay for and how they change behaviour."],
    explanation: "Identify (1) + explain (1) for each reason.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how an increase in corporate (company) tax could affect firms and the wider economy.",
    points: [
      "Reduces firms' profits after tax.",
      "Less retained profit for investment in machinery and expansion.",
      "Lower investment slows growth and job creation; may discourage foreign firms from setting up.",
      "But raises government revenue, which could fund spending or reduce the deficit.",
    ],
    modelAnswer: "A higher corporate tax reduces firms' profits after tax, leaving less retained profit for buying machinery or opening new branches. Lower investment slows the growth of productive capacity and of jobs, and foreign firms may choose to invest in other countries with lower taxes. On the other hand, the government gains revenue that it could use for infrastructure or to cut its deficit.",
    hints: ["Profits → investment → growth and jobs."],
    explanation: "A chain from profit to investment to growth, with the revenue effect.",
  });

  // Structured 1: comparing two tax systems.
  {
    const incomes = [400, 1500, 4000];
    const bands = [[300, 0], [1500, 20], [Infinity, 40]];
    const tProg = incomes.map((y) => tax.banded(y, bands)), aProg = incomes.map((y, k) => tax.averageRate(tProg[k], y));
    const flat = 18, tFlat = incomes.map((y) => (y * flat) / 100);
    check("tProg", tProg[2], 1240); check("a1", aProg[1], 16);
    const T = table(["Monthly income (US\\$)", "Tax under System A (US\\$)", "Tax under System B (US\\$)"], incomes.map((y, k) => [y, tProg[k], tFlat[k]]));
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, marks: 12, calculator: true,
      stem: `A fictional government is choosing between two income tax systems. System A: the first US\\$300 a month is tax-free, income from US\\$300 to US\\$1,500 is taxed at 20%, and income above US\\$1,500 at 40%. System B: a flat rate of ${flat}% on all income. The table shows the tax paid at three incomes.\n\n${T}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: aProg[0], stem: "Calculate the average tax rate under System A for an income of US\\$400. Give your answer to one decimal place.", wrong: [20], explanation: `Tax = 20% × 100 = US\\$${tProg[0]}; ${tProg[0]} ÷ 400 × 100 = ${pct(aProg[0], 1)}.` }),
        P.num({ label: "(b)", marks: 2, kind: "pct", value: aProg[2], stem: "Calculate the average tax rate under System A for an income of US\\$4,000. Give your answer to one decimal place.", wrong: [40], explanation: `Tax = 20% × 1,200 + 40% × 2,500 = 240 + 1,000 = US\\$${fmt(tProg[2])}; ${fmt(tProg[2])} ÷ 4,000 × 100 = ${pct(aProg[2], 1)}.` }),
        P.fib({
          label: "(c)", marks: 2,
          stem: "Complete the sentence.",
          template: "System A is {{blank:a}} and System B is {{blank:b}}.",
          blanks: [
            { id: "a", accepted: ["progressive"], choices: ["progressive", "proportional", "regressive"] },
            { id: "b", accepted: ["proportional"], choices: ["progressive", "proportional", "regressive"] },
          ],
          wrong: [["proportional", "regressive"]],
          explanation: `System A's average rate rises from ${pct(aProg[0], 1)} to ${pct(aProg[2], 1)}; System B is ${flat}% at every income.`,
        }),
        P.manual({
          label: "(d)", marks: 2,
          stem: "Explain which system is better for a worker earning US\\$400 a month.",
          points: [`System A: tax US\\$${tProg[0]} (${pct(aProg[0], 1)}) against US\\$${tFlat[0]} (${flat}%) under System B.`, "The tax-free allowance protects low incomes, leaving more disposable income for necessities."],
          modelAnswer: `System A is better: the worker pays US\\$${tProg[0]} (${pct(aProg[0], 1)}) instead of US\\$${tFlat[0]}, because the first US\\$300 is tax-free, so more income is left for food, rent and transport.`,
          explanation: "Compare the amounts and explain the tax-free allowance.",
        }),
        P.manual({
          label: "(e)", marks: 4, levels: LV(4),
          stem: "Discuss whether the government should choose System A rather than System B.",
          points: [
            "For A: based on ability to pay; reduces inequality; protects the poor; raises revenue from high earners.",
            "Against A: 40% marginal rate may reduce incentives to work, invest and declare income; avoidance, emigration of skilled workers.",
            "B: simple, cheap to collect, fewer disincentives; but takes 18% from the poorest and widens inequality.",
            "Justified conclusion.",
          ],
          modelAnswer: `System A taxes according to ability to pay: the person on US\\$400 pays only ${pct(aProg[0], 1)} while the person on US\\$4,000 pays ${pct(aProg[2], 1)}, so it reduces inequality and protects the poor. However, its 40% top marginal rate may discourage high earners from working more, investing or declaring all their income, and skilled workers might emigrate. System B is simpler and cheaper to collect and keeps incentives stronger, but it takes ${flat}% even from the poorest workers. Because a fair tax should protect low incomes, System A is better, provided the top rate is not so high that avoidance reduces revenue.`,
          explanation: "Equity versus incentives and simplicity; conclude.",
        }),
      ],
      hints: ["Apply each rate only to its own slice of income.", "Average rate = tax ÷ income × 100."],
      explanation: `System A average rates: ${incomes.map((y, k) => `${pct(aProg[k], 1)} at US\\$${fmt(y)}`).join(", ")}: progressive. System B: ${flat}% at every income: proportional.`,
    });
  }
  // Structured 2: raising VAT.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, marks: 8,
    stem: "A fictional government needs more revenue to pay for new clinics. It is considering raising the rate of VAT on all goods and services, including basic foods, rather than raising income tax.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "VAT is best described as",
        options: [
          ["an indirect tax on spending.", "Correct: VAT is collected by sellers on goods and services."],
          ["a direct tax on income.", "Income tax is the direct tax."],
          ["a tax on firms' profits and dividends.", "That is corporate tax."],
          ["a tax on imports only.", "VAT applies to most goods and services, not only imports."],
        ],
        answer: "A",
        explanation: "VAT is an indirect, ad valorem tax on spending.",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain why a higher VAT rate on all goods, including basic foods, may increase inequality.",
        points: ["Poorer households spend a larger share of income (save little) and spend much of it on basic foods.", "So the extra VAT is a larger percentage of their income: regressive.", "Their real income falls proportionately more than that of rich households."],
        modelAnswer: "Poorer households spend almost all their income, much of it on basic foods, while richer households save part of theirs. A higher VAT rate therefore takes a larger percentage of poor households' incomes, so the tax is regressive and their real incomes fall proportionately more than those of the rich, increasing inequality.",
        explanation: "Spending share → regressive → inequality.",
      }),
      P.manual({
        label: "(c)", marks: 4, levels: LV(4),
        stem: "Discuss whether raising VAT is a better way to fund the clinics than raising income tax.",
        points: [
          "For VAT: hard to evade; collected from the informal sector's purchases too; no direct disincentive to work; raises a lot of revenue.",
          "Against VAT: regressive; raises prices and may add to inflation; reduces spending and sales.",
          "Income tax: progressive and fairer, but many workers are informal so the base is narrow; disincentives; evasion.",
          "Justified conclusion (e.g. VAT with basic foods exempted, or a combination).",
        ],
        modelAnswer: "Raising VAT would bring in a lot of revenue quickly and is hard to evade, because everyone, including people working in the informal sector who pay little income tax, pays it when they buy goods; it also does not directly reduce the reward for working. However, VAT on basic foods is regressive, hitting the poor hardest, and it raises prices, which may add to inflation and reduce firms' sales. Income tax is fairer because it is progressive, but if many workers are informal, few pay it and higher rates may discourage work. A VAT rise is better for raising revenue, but basic foods should be exempted so that the poorest households are protected.",
        explanation: "Revenue and coverage versus fairness; conclude.",
      }),
    ],
    hints: ["Who spends the largest share of income on basic foods?"],
    explanation: "VAT is an indirect tax; on basic foods it is regressive. The choice weighs revenue and coverage against equity.",
  });

  b.card("DEFINITION", "Define a **direct tax**.", "A tax on income or wealth paid directly to the government by the person or firm that bears it, such as income tax or corporate tax.");
  b.card("DEFINITION", "Define an **indirect tax**.", "A tax on spending on goods and services, collected by sellers, such as VAT, excise and customs duties.");
  b.card("DEFINITION", "Define a **progressive tax**.", "A tax whose average rate (percentage of income paid) rises as income rises.");
  b.card("DEFINITION", "Define a **regressive tax**.", "A tax that takes a smaller percentage of income as income rises, falling most heavily on the poor.");
  b.card("DEFINITION", "Define a **proportional tax**.", "A tax that takes the same percentage of income at every income level.");
  b.card("FORMULA", "Average tax rate = ?", "Total tax paid ÷ income × 100");
  b.card("CONCEPT", "What is the difference between an **ad valorem** and a **specific** tax?", "Ad valorem: a percentage of the price (e.g. VAT). Specific: a fixed amount per unit (e.g. US\\$0.25 per litre).");
  b.card("CONCEPT", "Give four reasons for taxation.", "Raise revenue; redistribute income; discourage demerit goods and pollution; protect domestic industries; manage aggregate demand.");
  b.card("CONCEPT", "Name four canons (principles) of a good tax (ZIMSEC).", "Equity (ability to pay), certainty, convenience and economy of collection.", undefined, { applies: ZIM });
});
