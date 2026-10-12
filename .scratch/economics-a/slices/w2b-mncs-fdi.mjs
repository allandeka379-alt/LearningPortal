// W2b: multinational companies and foreign direct investment (both boards; Cambridge A Level only, ZIMSEC Form 6).
import { concept, P, chk, table } from "../lib.mjs";
import { mc, LV8 } from "../tables/w2b-kit.mjs";

concept("aecon.dev.mncs-fdi", { file: "dev/mncs-fdi", keyPrefix: "dev.mncs-fdi" }, (b) => {
  mc(b, [1, "RECALL"], "A multinational company is a firm that",
    ["owns or controls operations in more than one country", "Correct: it operates across borders."],
    [["sells only to customers in other countries", "A firm that only exports is not necessarily a multinational."],
     ["is owned by the government of its home country", "Ownership by the state is not part of the definition."],
     ["buys shares in foreign firms without controlling them", "That describes portfolio investment."]],
    "The defining feature is ownership or control of production or service operations in more than one country.");

  mc(b, [2, "UNDERSTANDING"], "Which of the following is foreign direct investment in Zimbabwe?",
    ["A foreign company builds a new processing plant in Zimbabwe", "Correct: it gives lasting control of a business."],
    [["A foreign investor buys a few shares through the stock exchange", "This is portfolio investment without control."],
     ["A foreign government lends money to the Ministry of Finance", "This is a loan, not an ownership stake."],
     ["A Zimbabwean firm exports tobacco to a foreign buyer", "This is trade, not investment."]],
    "FDI means a lasting interest and control, such as building or buying a business.");

  mc(b, [2, "UNDERSTANDING"], "Which is a reason why a firm might set up production in another country?",
    ["To avoid import duties in that market", "Correct: producing locally avoids tariffs."],
    [["To make its goods dearer for local customers", "Firms do not invest abroad to raise their own costs."],
     ["To reduce the size of the market it can serve", "The aim is usually to gain, not lose, market access."],
     ["To be further from its raw materials", "Firms often locate close to raw materials."]],
    "Avoiding tariffs and being close to customers or materials are common motives for FDI.", { daily: true });

  mc(b, [2, "UNDERSTANDING"], "Which of the following is a benefit of FDI to the host country?",
    ["Workers may learn new skills and methods", "Correct: technology and skills transfer."],
    [["Profits are always kept entirely in the host country", "Some are repatriated."],
     ["Local firms never face any competition", "FDI usually increases competition."],
     ["The investment must be repaid with interest", "FDI is ownership, not a loan."]],
    "Technology and skills transfer is a main benefit; the other options are false.");

  mc(b, [3, "APPLICATION"], "Profit sent by a foreign-owned mine to its home country is recorded in the host country's balance of payments as",
    ["an outflow of primary income", "Correct: income paid to foreign owners is a debit."],
    [["an increase in exports of goods", "Profit payments are not goods exports."],
     ["a capital inflow to the financial account", "The profit leaving is an outflow, not an inflow."],
     ["a rise in the host's government revenue", "Tax is revenue; repatriated profit is not."]],
    "Repatriated profit is income paid abroad and is a debit under primary income in the current account.", { hints: ["Is the money entering or leaving the country?"] });

  mc(b, [3, "UNDERSTANDING"], "Transfer pricing by a multinational company refers to",
    ["setting prices for trade between its branches", "Correct: it can shift profit to low-tax countries."],
    [["moving workers between countries each year", "That is labour mobility, not pricing."],
     ["charging customers different prices in each market", "That is price discrimination."],
     ["paying a government a fee to build a factory", "That is a charge, not transfer pricing."]],
    "Transfer prices between branches can be set to show profit where tax is lowest.", { hints: ["Who trades with whom?"] });

  mc(b, [3, "ANALYSIS"], "A large foreign supermarket chain opens in a town and many small local shops close. This illustrates",
    ["local firms being crowded out", "Correct: large firms can drive out small ones."],
    [["technology transfer to local firms", "Closure of shops is not technology transfer."],
     ["a benefit of portfolio investment", "The chain is making direct investment."],
     ["an improvement in the balance of trade", "Nothing in the example affects trade directly."]],
    "Crowding out is a cost of FDI when large MNCs drive out local producers.", { hints: ["What happens to local shops?"] });

  mc(b, [4, "EVALUATION"], "A government wants an MNC to benefit local suppliers. Which policy most directly increases local linkages?",
    ["Requiring some inputs to be bought from local firms", "Correct: it raises local purchases."],
    [["Allowing the MNC to import all its inputs duty-free", "Imports would replace local purchases."],
     ["Exempting the MNC from all tax for twenty years", "Tax breaks do not create local linkages."],
     ["Letting the MNC decide the price of all local inputs", "That could reduce local supplier gains."]],
    "A local-content requirement links the MNC to domestic suppliers, though it may raise costs and deter some investors.", { hints: ["Which option changes where the inputs are bought?"] });

  {
    const local = 9 + 14 + 11;
    chk(9 + 14 + 11 + 21 + 25, 80, 0);
    b.num({ d: 3, skill: "APPLICATION", kind: "pct", value: (local / 80) * 100, dp: 1, hints: ["Add wages, local purchases and tax; then divide by revenue."],
      stem: "A fictional foreign-owned factory has revenue of US\\$80 million. It pays US\\$9 million in wages to local workers, US\\$14 million to local suppliers and US\\$11 million in tax, spends US\\$21 million on imported inputs and sends US\\$25 million of profit abroad. What percentage of revenue stays in the host economy? Give your answer to one decimal place.",
      wrong: [31.3, 57.5, 56.3],
      explanation: "Value retained = 9 + 14 + 11 = US\\$34 million. 34 ÷ 80 × 100 = 42.5%. Adding the imports and profit (the money that leaves) gives the wrong answer." });
  }
  {
    const y = 90 / 18;
    b.num({ d: 2, skill: "APPLICATION", daily: true, kind: "plain", value: y, unit: "years",
      stem: "A fictional mine cost US\\$90 million to build and sends US\\$18 million of profit abroad each year. How many years of repatriated profit equal the original investment?",
      wrong: [0.2, 108, 72],
      explanation: "90 ÷ 18 = 5 years." });
  }
  {
    const p = (0.36 / 8) * 100;
    b.num({ d: 3, skill: "APPLICATION", calculator: true, kind: "pct", value: p, dp: 1, hints: ["Put both figures in the same units."],
      stem: "A fictional economy has GDP of US\\$8 billion and receives FDI inflows of US\\$0.36 billion in a year. Calculate the FDI inflow as a percentage of GDP.",
      wrong: [22.2, 0.5, 45],
      explanation: "0.36 ÷ 8 × 100 = 4.5%." });
  }

  b.tf({ d: 1, skill: "RECALL", stem: "Foreign direct investment must be repaid to the investor with interest.", answer: false,
    explanation: "False. FDI is an ownership stake; investors earn profits rather than receiving repayment of a loan." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "Portfolio investment is usually easier to reverse than foreign direct investment.", answer: true,
    explanation: "True. Shares can be sold quickly, whereas a factory or mine cannot." });

  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term with its meaning.",
    pairs: [["Profit repatriation", "Sending profits back to the home country of the investor"], ["Greenfield investment", "Building a new plant in the host country"], ["Portfolio investment", "Buying shares without control of the business"], ["Transfer pricing", "Setting prices of trade between branches of the same firm"]],
    explanation: "Each term is a distinct idea used in assessing FDI." });

  b.fib({ d: 2, skill: "RECALL", stem: "Choose the correct terms.",
    template: "A firm that owns operations in several countries is called a {{blank:a}} company, and the money it invests to gain lasting control abroad is {{blank:b}}.",
    blanks: [{ id: "a", accepted: ["multinational"], choices: ["multinational", "domestic", "informal"] }, { id: "b", accepted: ["foreign direct investment"], choices: ["foreign direct investment", "aid", "portfolio investment"] }],
    explanation: "An MNC makes foreign direct investment (FDI)." });

  b.short({ d: 2, skill: "RECALL", stem: "What term describes profits earned in the host country being sent back to the multinational's home country?",
    accepted: ["profit repatriation", "repatriation of profits", "repatriation", "repatriation of profit"], wrong: ["tax avoidance"],
    explanation: "Profit repatriation is the transfer of profits to the home country." });

  b.manualShort({ d: 2, skill: "RECALL", marks: 2, stem: "Define foreign direct investment.",
    points: ["Investment by a firm or person in a business in another country.", "It gives a lasting interest or control over the business."],
    modelAnswer: "Foreign direct investment is investment by a firm or individual in a business in another country, such as building a plant or buying a firm, that gives lasting interest and control.",
    explanation: "One mark for cross-border investment and one for lasting control." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each reason and say how it helps the firm."],
    stem: "Explain **two** reasons why a multinational company might invest in a developing country.",
    points: ["Reason 1 identified (for example, access to a growing market or to raw materials).", "Reason 1 explained: it can sell to local customers without transport costs or tariffs, or extract minerals close to the source.", "Reason 2 identified (for example, lower labour costs or incentives).", "Reason 2 explained: lower wages or tax holidays reduce costs and raise profit."],
    modelAnswer: "A multinational may want access to a growing market: producing locally avoids transport costs and import duties and puts it close to customers. It may also find lower labour costs and tax incentives, which reduce its costs and raise profit.",
    explanation: "Two reasons, each identified and explained." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Think about where profits and decisions end up."],
    stem: "Analyse **two** possible costs to a host country of hosting a multinational company.",
    points: ["Cost 1 identified (for example, profit repatriation).", "Cost 1 developed: profits are sent abroad, so less of the gain stays in the host economy.", "Cost 2 identified (for example, environmental damage or crowding out of local firms).", "Cost 2 developed: pollution or the closure of local producers reduces welfare and employment."],
    modelAnswer: "A large share of the multinational's profit may be repatriated, so the host economy keeps less of the gain from production. It may also cause environmental damage, such as pollution of water, and drive out local firms that cannot compete, reducing local employment and welfare.",
    explanation: "Two costs, each identified and developed." });

  {
    const rows = [["Wages paid to local workers", 7], ["Purchases from local suppliers", 12], ["Taxes and royalties paid to the government", 9], ["Imported equipment and services", 14], ["Profit sent abroad", 18]];
    chk(7 + 12 + 9 + 14 + 18, 60, 0);
    const tbl = table(["Use of revenue", "US\\$ million"], [...rows, ["**Total revenue**", "**60**"]]);
    b.struct({ d: 3, skill: "APPLICATION", examStyle: true, calculator: true, hints: ["Add the three items that stay in the host economy.", "Average wage = wage bill ÷ number of workers."],
      stem: `**A foreign-owned telecoms firm in Zandia (illustrative data)**\n\nThe table shows how a fictional foreign-owned telecoms company used its annual revenue. It employs 700 local workers.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "pct", value: ((7 + 12 + 9) / 60) * 100, dp: 1, stem: "Calculate the percentage of revenue that stays in the host economy (wages, local purchases and tax), to one decimal place.", wrong: [53.3, 30, 28], explanation: "7 + 12 + 9 = US\\$28 million. 28 ÷ 60 × 100 = 46.7%." }),
        P.num({ label: "(b)", marks: 2, kind: "money", value: (7 * 1e6) / 700, stem: "Calculate the average annual wage per worker, in US\\$.", wrong: [100, 7000, 1000], explanation: "7,000,000 ÷ 700 = US\\$10,000." }),
        P.mcq({ label: "(c)", marks: 1, stem: "The US\\$18 million sent abroad is an example of", options: [["profit repatriation", "Correct: profit sent to the home country."], ["portfolio investment", "It is income, not an investment."], ["foreign aid", "Aid is a transfer from a government or agency."], ["a local tax payment", "It is paid to the owners, not to the government."]], answer: "A", explanation: "Profit sent back to the owners abroad is repatriation." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** benefit of the firm's presence for Zandia.",
          points: ["It creates jobs and pays wages to 700 workers.", "The wages and local purchases raise incomes and demand for local goods.", "The tax paid gives the government revenue for public services."],
          modelAnswer: "The firm employs 700 local workers and pays them US\\$7 million, raising household incomes and demand for local goods. It also buys from local suppliers and pays US\\$9 million in tax, giving the government revenue for public services." }),
      ],
      explanation: "46.7% of revenue stays in Zandia; average wage US\\$10,000; the profit sent abroad is repatriation." });
  }
  {
    b.struct({ d: 4, skill: "EVALUATION", examStyle: true, calculator: true, hints: ["Local share of profit = profit × local percentage.", "Give an argument on each side."],
      stem: "**A local ownership rule (illustrative)**\n\nThe government of the fictional country of Zandia requires that at least 40% of any foreign-owned brewery is owned by local investors. A foreign-owned brewery makes a profit of US\\$36 million a year and pays it all out to its owners.",
      parts: [
        P.num({ label: "(a)", marks: 2, kind: "plain", value: 36 * 0.4, sf: 3, unit: "US$ million", stem: "Calculate the profit paid to the local owners, in US\\$ million.", wrong: [21.6, 40, 14], explanation: "40% of 36 = US\\$14.4 million." }),
        P.num({ label: "(b)", marks: 2, kind: "plain", value: 36 * 0.6, sf: 3, unit: "US$ million", stem: "Calculate the profit that goes to the foreign owners, in US\\$ million.", wrong: [14.4, 36, 24], explanation: "60% of 36 = US\\$21.6 million." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain **one** argument made by supporters of the rule.",
          points: ["Local owners receive part of the profit.", "More of the income stays in the country and is spent or invested locally.", "Local owners gain a say in decisions and can learn from the business."],
          modelAnswer: "Supporters argue that local owners receive US\\$14.4 million of profit, so more income stays in the country to be spent or invested locally, and local owners gain a voice in decisions and learn management skills." }),
        P.manual({ label: "(d)", marks: 3, stem: "Explain **one** argument made by critics of the rule.",
          points: ["Foreign investors may prefer to invest in a country without the requirement.", "Less FDI means less capital, technology and employment.", "Local partners may lack the funds, so projects may be delayed."],
          modelAnswer: "Critics argue that investors may choose another country without such rules. Less FDI would mean less capital, technology and employment for Zandia, and local partners may lack the money to buy their share, delaying projects." }),
        P.manual({ label: "(e)", marks: 2, stem: "State **one** factor that would determine whether the rule benefits Zandia.",
          points: ["How many other countries compete for the same investment (alternatives open to investors).", "How clear, stable and fair the rule is in practice (or how the local share is financed)."],
          modelAnswer: "It depends on how easily investors can go elsewhere and on how clear and stable the rule is, since uncertainty deters investment." }),
      ],
      explanation: "Local owners receive US$14.4 million, foreign owners US$21.6 million; arguments on both sides depend on investors' alternatives and the clarity of the rule." });
  }

  b.ext({ d: 4, skill: "EVALUATION", marks: 8, hints: ["Give benefits and costs.", "Judge using conditions."],
    stem: "Assess whether a developing country benefits from hosting multinational companies.",
    points: ["Capital inflow raises investment.", "Technology and skills transfer improves productivity.", "Jobs, wages and tax revenue.", "Exports and foreign exchange earnings.", "Profit repatriation reduces the gain.", "Transfer pricing and tax avoidance reduce revenue.", "Environmental damage and crowding out of local firms.", "A justified judgement depending on the terms of the investment and the policies of the host government."],
    levels: LV8,
    modelAnswer: "Multinational companies bring capital, technology and skills, create jobs and pay taxes, and those with export markets earn foreign exchange. These gains can raise productivity and incomes. However, a share of profit is repatriated, transfer pricing can reduce tax revenue, and large firms may harm the environment or drive local firms out of business. The outcome depends on the terms on which the investment is allowed: contracts that require local purchases, training and fair taxes keep more of the gains at home. Overall, a developing country is likely to benefit if it bargains well and regulates carefully, but may gain little if the investment is an enclave with few local links.",
    wordLimit: { min: 100, max: 300 },
    explanation: "Weigh benefits against costs and judge on the terms of the investment." });

  b.card("DEFINITION", "Define a **multinational company (MNC)**.", "A firm that owns or controls operations in more than one country, usually with headquarters in a home country and subsidiaries in host countries.");
  b.card("DEFINITION", "Define **foreign direct investment (FDI)**.", "Investment in a business in another country that gives a lasting interest and control, such as building a plant or buying a firm.");
  b.card("CONCEPT", "FDI or portfolio investment: what is the difference?", "FDI gives lasting control (a factory, a controlling share). Portfolio investment is buying shares or bonds without control and is easier to reverse.");
  b.card("CONCEPT", "Give **four** reasons why firms invest abroad.", "Access to markets, avoiding trade barriers, lower costs or resources, and incentives or spreading risk.");
  b.card("CONCEPT", "Give **four** benefits of FDI to a host economy.", "Capital inflow, technology and skills transfer, jobs, tax revenue and exports.");
  b.card("CONCEPT", "Give **four** costs of FDI to a host economy.", "Profit repatriation, dependence, transfer pricing and tax avoidance, environmental damage and crowding out of local firms.");
  b.card("DEFINITION", "What is **profit repatriation**?", "Sending the profits earned in the host country back to the MNC's home country.");
  b.card("DEFINITION", "What is **transfer pricing**?", "Setting the prices of goods and services traded between branches of the same MNC, which can shift profit to low-tax countries.");
  b.card("CONCEPT", "What is the case for and against **local ownership rules**?", "For: more profit and decisions stay local, skills transfer. Against: may deter investment, reducing capital, technology and jobs.");
});
