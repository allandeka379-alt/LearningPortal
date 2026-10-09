// W4a: taxation and ZIMRA (COM Form 2). Rates are always stated as assumptions.
import { concept, P, money, fmt, r2 } from "../lib.mjs";

concept("bus.finance.taxation", { file: "finance/taxation", keyPrefix: "finance.taxation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a direct tax?",
    options: [
      ["Corporate tax on company profits", "Correct: charged on profit and paid directly by the company."],
      ["Value added tax", "VAT is charged on spending: an indirect tax."],
      ["Customs duty on imports", "Duties on goods are indirect taxes."],
      ["Excise duty on fuel", "Excise duty is charged on goods: indirect."],
    ],
    answer: "A",
    explanation: "Direct taxes fall on income, profit or wealth; corporate tax is one.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body collects taxes and customs duties in Zimbabwe?",
    options: [
      ["The Zimbabwe Revenue Authority", "Correct: ZIMRA assesses and collects taxes and duties."],
      ["The Reserve Bank of Zimbabwe", "The central bank manages money and banks, not tax collection."],
      ["The Consumer Council of Zimbabwe", "It protects consumers."],
      ["The Zimbabwe Stock Exchange", "It is a market for shares."],
    ],
    answer: "A",
    explanation: "ZIMRA is responsible for collecting revenue for the government.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is VAT described as an indirect tax?",
    options: [
      ["It is collected by sellers and passed on in prices", "Correct: consumers pay it through the price, not directly."],
      ["It is charged only on company profits", "That describes corporate tax."],
      ["It is paid only by people with high incomes", "Everyone who buys taxed goods pays VAT."],
      ["It is deducted from wages by employers", "That describes income tax deducted at source."],
    ],
    answer: "A",
    explanation: "Indirect taxes are on spending; the seller collects and pays them over.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which canon of taxation is met when income tax is deducted from wages each payday?",
    options: [
      ["Convenience", "Correct: it is collected at a convenient time for the taxpayer."],
      ["Flexibility", "Flexibility is about changing rates when needed."],
      ["Equity", "Equity is about fairness and ability to pay."],
      ["Economy", "Economy is about a low cost of collection."],
    ],
    answer: "A",
    explanation: "Deduction at source collects tax when the worker has the money: convenience.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A government raises the excise duty on cigarettes. What is the **most** likely main aim?",
    options: [
      ["To reduce consumption of a harmful product", "Correct: higher prices discourage smoking."],
      ["To protect local cigarette factories from imports", "Excise duty falls on local goods too; customs duty protects."],
      ["To reduce the cost of collecting taxes", "The duty change does not affect collection cost."],
      ["To make the tax system more progressive", "Duties on cigarettes take a larger share from poorer smokers."],
    ],
    answer: "A",
    explanation: "Taxes on harmful goods raise their price and discourage use, as well as raising revenue.",
    hints: ["Excise duty falls on goods made locally as well as imports."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", daily: true,
    stem: "Why are indirect taxes said to be regressive?",
    options: [
      ["Poor people pay a larger share of their income in them", "Correct: everyone pays the same tax on a product whatever their income."],
      ["They are charged at higher rates on higher incomes", "That describes a progressive tax."],
      ["They reduce the profits of large companies", "That is not what regressive means."],
      ["They are collected only once a year", "Indirect taxes are collected whenever goods are bought."],
    ],
    answer: "A",
    explanation: "Equal tax on a loaf takes a bigger fraction of a low income than of a high income.",
    hints: ["Compare the tax on one loaf of bread with two different incomes."],
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a function of ZIMRA at border posts?",
    options: [
      ["Preventing smuggling and collecting customs duty", "Correct: ZIMRA controls goods crossing borders."],
      ["Issuing bank notes and coins", "That is the central bank's role."],
      ["Fixing the prices of goods in shops", "ZIMRA does not set retail prices."],
      ["Insuring goods against loss in transit", "Insurance companies do this."],
    ],
    answer: "A",
    explanation: "At borders ZIMRA checks declarations, collects duty and prevents smuggling.",
  });
  const pre1 = 380, vat1 = 15;
  const v1 = r2((pre1 * vat1) / 100);
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2(pre1 + v1), daily: true,
    stem: `A solar panel costs ${money(pre1)} before VAT. Assume a VAT rate of ${vat1}%. Calculate the price including VAT.`,
    wrong: [v1, r2(pre1 - v1)],
    explanation: `VAT = ${vat1}% × ${fmt(pre1)} = ${money(v1)}; price = ${money(r2(pre1 + v1))}.`,
    workedSolution: `1. VAT = 0.15 × ${fmt(pre1)} = ${fmt(v1)}.\n2. Price including VAT = ${fmt(pre1)} + ${fmt(v1)} = ${money(r2(pre1 + v1))}.`,
  });
  const sal2 = 850, free2 = 150, rate2 = 25;
  const tax2 = r2(((sal2 - free2) * rate2) / 100);
  b.calc({
    d: 3, skill: "APPLICATION", kind: "money", value: tax2, calculator: true,
    stem: `Tendai earns ${money(sal2)} a month. Assume the first ${money(free2)} is tax-free and the rest is taxed at ${rate2}%. Calculate his monthly income tax.`,
    wrong: [r2((sal2 * rate2) / 100), r2(sal2 - tax2)],
    explanation: `Taxable income = ${fmt(sal2)} − ${fmt(free2)} = ${fmt(sal2 - free2)}; tax = ${rate2}% × ${fmt(sal2 - free2)} = ${money(tax2)}.`,
    workedSolution: `1. Taxable income = ${fmt(sal2)} − ${fmt(free2)} = ${fmt(sal2 - free2)}.\n2. Tax = ${rate2}% × ${fmt(sal2 - free2)} = ${money(tax2)}.`,
    hints: ["Take off the tax-free amount first.", "Apply the rate only to taxable income."],
  });
  const val3 = 3600, duty3 = 40;
  b.num({
    d: 2, skill: "APPLICATION", kind: "money", value: r2((val3 * duty3) / 100),
    stem: `A trader imports goods valued at ${money(val3)}. Assume customs duty of ${duty3}% of the value. How much duty is payable?`,
    wrong: [r2(val3 * 1.4)],
    explanation: `${duty3}% × ${fmt(val3)} = ${money(r2((val3 * duty3) / 100))}.`,
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Customs duty is charged on goods imported into a country.",
    answer: true,
    explanation: "True. Customs duty is an indirect tax on imports (and sometimes exports).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Paying tax is voluntary for small businesses that make little profit.",
    answer: false,
    explanation: "False. Paying tax due is a legal obligation; businesses must register, keep records and file returns.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each tax with what it is charged on.",
    pairs: [
      ["Income tax", "Wages, salaries and other personal income"],
      ["Corporate tax", "The profits of companies"],
      ["Value added tax", "Spending on most goods and services"],
      ["Excise duty", "Certain locally produced goods such as fuel and alcohol"],
    ],
    explanation: "Direct taxes are on income and profit; indirect taxes are on spending and goods.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A tax on income, profit or wealth is a {{blank:a}} tax. Illegally hiding income to avoid tax is called tax {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["direct"], choices: ["direct", "indirect", "regressive", "excise"] },
      { id: "b", accepted: ["evasion"], choices: ["evasion", "avoidance", "allowance", "relief"] },
    ],
    explanation: "Direct taxes fall on income, profit and wealth. Tax evasion is illegal non-payment.",
  });
  b.short({
    d: 1, skill: "RECALL",
    stem: "Write the abbreviation of the authority that collects taxes in Zimbabwe.",
    accepted: ["ZIMRA", "zimra"],
    wrong: ["RBZ"],
    explanation: "ZIMRA, the Zimbabwe Revenue Authority.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why a government collects taxes.",
    points: [
      "Revenue for public services (1)",
      "Developed, e.g. pays for schools, clinics and roads that people could not provide alone (1)",
      "Second reason, e.g. redistribute income / discourage harmful goods / protect local industry / control inflation (1)",
      "Developed, e.g. duty on imports makes them dearer so local firms can compete (1)",
    ],
    modelAnswer: "Governments tax to raise revenue for services such as schools, clinics and roads, which individuals could not provide alone. They also tax imports to protect local industries, because customs duty makes imported goods dearer and helps local firms compete.",
    explanation: "Any two purposes, each developed.",
    hints: ["Think about spending and about influencing behaviour."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Explain **one** advantage and **one** disadvantage of indirect taxes.",
    points: [
      "Advantage, e.g. difficult to evade / can target harmful goods / everyone who spends contributes (1)",
      "Explained, e.g. tax is in the price, so it is paid automatically when goods are bought (1)",
      "Disadvantage, e.g. regressive / raises prices / may cause inflation (1)",
      "Explained, e.g. poor households pay a larger share of their income on the same purchases (1)",
    ],
    modelAnswer: "Indirect taxes are hard to evade because they are part of the price, so anyone who buys goods pays them. However, they are regressive: a poor family pays the same tax on a bag of maize meal as a rich family, which is a larger share of its income.",
    explanation: "Indirect taxes are efficient to collect but fall more heavily on the poor.",
    hints: ["How is the tax paid?", "Who bears it most heavily?"],
  });
  const p1 = 520, p2 = 1300, vatR = 15;
  const vatSale = r2((p2 * vatR) / 100), vatBuy = r2((p1 * vatR) / 100);
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 840, calculator: true,
    stem: `Sipho runs a registered furniture workshop in Bulawayo. Assume a VAT rate of ${vatR}%. He buys timber for ${money(p1)} plus VAT and sells a wardrobe made from it for ${money(p2)} plus VAT. Each month his employees' income tax is deducted from their wages and paid to ZIMRA. A friend suggests he could avoid VAT by selling for cash without receipts.`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "money", value: vatSale, type: "CALCULATION",
        stem: "Calculate the VAT Sipho charges on the wardrobe.",
        wrong: [r2(p2 + vatSale)],
        explanation: `${vatR}% × ${fmt(p2)} = ${money(vatSale)}.`,
      }),
      P.num({
        label: "(b)", marks: 2, kind: "money", value: r2(vatSale - vatBuy), type: "CALCULATION",
        stem: "VAT is charged on the value added. Calculate the VAT Sipho pays over to ZIMRA after deducting the VAT he paid on the timber.",
        wrong: [vatSale, vatBuy],
        explanation: `${fmt(vatSale)} − ${fmt(vatBuy)} = ${money(r2(vatSale - vatBuy))}, which is ${vatR}% of the value added (${fmt(p2 - p1)}).`,
      }),
      P.mcq({
        label: "(c)", marks: 1,
        stem: "Deducting employees' income tax from wages each month meets which canon of taxation?",
        options: [["Convenience", "Correct: tax is collected when wages are paid."], ["Equity", "Equity is about ability to pay."], ["Flexibility", "Flexibility is about changing rates."], ["Certainty", "Certainty is about knowing what to pay."]],
        answer: "A",
      }),
      P.manual({
        label: "(d)", marks: 5,
        stem: "Discuss whether Sipho should follow his friend's suggestion.",
        points: [
          "Not charging VAT due is tax evasion: illegal (1)",
          "Penalties: fines, interest, possible closure or prosecution after a ZIMRA audit (1)",
          "Cash sales without receipts mean poor records; he cannot prove his costs or apply for loans (1)",
          "Reduces revenue for public services / unfair to honest competitors (1)",
          "Justified conclusion: he should not; keep records and pay VAT due (1)",
        ],
      }),
    ],
    explanation: `VAT on the sale ${money(vatSale)}; less VAT on timber ${money(vatBuy)} = ${money(r2(vatSale - vatBuy))} paid over. Evasion is illegal and risky.`,
    hints: ["VAT = rate × price before VAT.", "Subtract the VAT already paid on inputs."],
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: "Nyasha is a cross-border trader who imports kitchenware from a neighbouring country to sell in Mutare.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** taxes or duties that Nyasha's business may have to pay.",
        points: ["Customs duty on imports (1)", "VAT / income tax on profits (1)"],
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain **three** functions ZIMRA performs when Nyasha crosses the border.",
        points: ["Checks her declaration of goods and their value (1)", "Calculates and collects customs duty / VAT (1)", "Searches for and seizes smuggled or prohibited goods (1)"],
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how customs duty affects the price Nyasha charges and her customers.",
        points: ["Duty is added to her cost of goods (1)", "She raises her selling price to keep her profit (1)", "Customers pay more / may buy local substitutes instead (1)"],
      }),
    ],
    explanation: "Importers pay customs duty and VAT; ZIMRA checks, collects and prevents smuggling; duty raises prices to consumers.",
    hints: ["Think about what happens at the border post."],
  });
  b.card("DEFINITION", "Tax", "A compulsory payment to the government by individuals and businesses, with no direct service in return.");
  b.card("CONCEPT", "Direct and indirect taxes", "Direct: on income, profit, wealth (income tax, corporate tax). Indirect: on spending (VAT, customs duty, excise duty).");
  b.card("CONCEPT", "Reasons for taxation", "Revenue for services, redistribute income, discourage harmful goods, protect industries, manage the economy and balance of payments.");
  b.card("CONCEPT", "Canons of a good tax", "Equity, certainty, convenience, economy (cheap to collect), flexibility.");
  b.card("FORMULA", "VAT on a price", "VAT = rate × price before VAT; price including VAT = price + VAT.");
  b.card("FORMULA", "Income tax with a tax-free amount", "Tax = rate × (income − tax-free amount).");
  b.card("FACT", "Roles of ZIMRA", "Assess and collect taxes; collect customs and excise duties; control goods at borders and prevent smuggling; register and audit taxpayers.");
  b.card("DEFINITION", "Tax evasion", "Illegally not paying tax due, e.g. hiding income or smuggling goods; punished by fines, seizure and prosecution.");
  b.card("CONCEPT", "Regressive indirect taxes", "The same tax on a product takes a larger share of a poor person's income than a rich person's.");
});
