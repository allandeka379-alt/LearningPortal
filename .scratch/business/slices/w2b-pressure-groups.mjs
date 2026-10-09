// W2b: pressure groups (Cambridge only).
import { concept, P, money, f, round } from "../lib.mjs";

const bSales0 = 42000, bSales1 = 34440;
const bFall = ((bSales0 - bSales1) / bSales0) * 100; // 18
const cRev = 310000, cCost = 262000, cChange = 17500, cLoss = 46500;

concept("bus.economy.pressure-groups", { file: "economy/pressure-groups", keyPrefix: "economy.pressure-groups" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a pressure group?",
    options: [
      ["A group that tries to influence decisions without seeking to form a government", "Correct: it uses publicity, boycotts and lobbying."],
      ["A government department that inspects businesses and enforces the law on them", "Government departments have legal powers; pressure groups do not."],
      ["A group of businesses that merge to form one company", "That is a merger."],
      ["The board of directors of a company", "Directors run a company; they are not a pressure group."],
    ],
    answer: "A",
    explanation: "A **pressure group** has a common interest and tries to influence businesses, government or the public.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a consumer boycott?",
    options: [
      ["Customers refusing to buy a business's products to force change", "Correct: it reduces the business's sales."],
      ["A business refusing to sell its products to certain customers", "That is a refusal to supply."],
      ["A government ban on imported goods", "That is a trade restriction."],
      ["Customers complaining to a shop manager", "A complaint is not a boycott."],
    ],
    answer: "A",
    explanation: "A **boycott** hits sales revenue directly, which is why businesses take it seriously.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is lobbying?",
    options: [
      ["Trying to persuade government officials to change laws or policies", "Correct: it works through the government."],
      ["A business paying for advertisements on national radio stations", "That is promotion by a business, not lobbying."],
      ["Refusing to buy a product", "That is a boycott."],
      ["Taking a business to court", "That is legal action."],
    ],
    answer: "A",
    explanation: "**Lobbying** aims to persuade the government to act, for example by passing stricter laws.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In which situation is a pressure group's boycott most likely to succeed?",
    options: [
      ["Customers can easily buy a similar product from rivals", "Correct: switching is easy, so sales fall quickly."],
      ["The product is essential and has no substitutes", "Customers cannot easily stop buying it."],
      ["The business sells only to other businesses, far from the public", "Ordinary consumers have little influence."],
      ["The media ignore the campaign", "Without publicity few customers hear of it."],
    ],
    answer: "A",
    hints: ["What do customers need to be able to do for a boycott to work?"],
    explanation: "Boycotts work when customers can **switch easily** and the campaign gets **wide publicity**.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "An environmental group publishes photographs of a company's waste in a river on social media. Which method is it using?",
    options: [
      ["Publicity", "Correct: it is drawing public attention to the problem."],
      ["Lobbying", "Lobbying targets government officials directly."],
      ["Legal action", "No court case is mentioned."],
      ["A merger", "This is not a pressure group method."],
    ],
    answer: "A",
    explanation: "**Publicity** campaigns damage a business's reputation and can lead to boycotts and government action.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "What is the main risk to a business of ignoring a well-supported pressure group?",
    options: [
      ["Falling sales and the possibility of stricter laws", "Correct: boycotts and lobbying can follow."],
      ["An immediate rise in its tax on profits", "Pressure groups cannot set taxes."],
      ["Its directors being replaced by members of the group", "A pressure group cannot appoint directors."],
      ["Its products becoming cheaper to make", "Ignoring a campaign does not lower costs."],
    ],
    answer: "A",
    hints: ["Think about customers and government."],
    explanation: "Ignoring a strong campaign risks **bad publicity, boycotts and new laws**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage of pressure groups for businesses?",
    options: [
      ["They warn businesses early about public concerns", "Correct: a business can change before problems grow."],
      ["They always reduce businesses' costs", "Their demands often raise costs."],
      ["They guarantee higher sales", "Campaigns may reduce sales."],
      ["They pay for businesses' new pollution-control equipment", "Pressure groups do not usually fund businesses."],
    ],
    answer: "A",
    explanation: "Pressure groups can act as an **early warning** of what customers and the public care about.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Residents form a group to oppose a nightclub opening in their street. What type of pressure group is this?",
    options: [
      ["A community (residents') group", "Correct: it protects a local area."],
      ["A business (employers') group", "Business groups represent businesses."],
      ["An animal welfare group", "Animals are not the issue."],
      ["A trade union", "Trade unions represent workers."],
    ],
    answer: "A",
    explanation: "**Community groups** campaign on local issues such as noise, traffic and developments.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Pressure groups have the legal power to close a business.",
    answer: false,
    explanation: "False. They influence through customers, the media and government; only the authorities or courts can close a business.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Media coverage makes a pressure group's campaign more effective.",
    answer: true,
    explanation: "True. Coverage spreads the message to customers, investors and officials.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pressure-group method with its description.",
    pairs: [
      ["Boycott", "Urging customers not to buy the product"],
      ["Lobbying", "Persuading officials to change laws"],
      ["Petition", "Collecting signatures to show public support"],
      ["Legal action", "Taking the business to court"],
    ],
    explanation: "Pressure groups use several methods, often together.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "When customers refuse to buy a product to force change, this is a {{blank:a}}. Trying to persuade government to change a law is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["boycott"], choices: ["boycott", "merger", "lobby", "tariff"] },
      { id: "b", accepted: ["lobbying"], choices: ["lobbying", "boycotting", "advertising", "auditing"] },
    ],
    explanation: "**Boycott**; **lobbying**.",
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `After a pressure group campaign, a bakery's monthly sales fall from ${money(bSales0)} to ${money(bSales1)}. Calculate the percentage fall in sales to one decimal place.`,
    kind: "pct", value: bFall, wrong: [round(((bSales0 - bSales1) / bSales1) * 100, 1)],
    hints: ["Divide the fall by the original sales."],
    explanation: `Fall = ${money(bSales0 - bSales1)}; ${(bSales0 - bSales1).toLocaleString("en-GB")} ÷ ${bSales0.toLocaleString("en-GB")} × 100 = ${bFall.toFixed(1)}%.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** methods a pressure group could use to influence a mining company.",
    points: [
      "Publicity / media campaign.",
      "Damages reputation; investors and customers react.",
      "Lobbying / protests / legal action / boycotts of the company's buyers.",
      "Explains how it pressures the company (stricter licence conditions, court orders).",
    ],
    hints: ["Mining companies sell to other businesses: think about government and publicity."],
    modelAnswer: "The group could run a media campaign showing pollution near the mine, damaging the company's reputation with investors and buyers. It could also lobby the government to enforce environmental laws or attach stricter conditions to the mining licence.",
    explanation: "Methods: publicity, boycotts, lobbying, protests, legal action.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** factors that make a pressure group more likely to succeed.",
    points: [
      "Large membership / strong public support.",
      "Business cannot ignore so many customers or voters.",
      "Media coverage / evidence / easy for customers to switch / government support.",
      "Explains why it increases pressure on the business.",
    ],
    hints: ["Think about support, publicity and customers' choices."],
    modelAnswer: "A group with strong public support is hard to ignore, because many of its supporters are the business's customers. If customers can easily switch to a rival's product, a boycott quickly reduces sales, so the business is more likely to change.",
    explanation: "Success depends on support, media coverage, evidence, ease of switching and government sympathy.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, calculator: true, secs: 960,
    stem: `Sunrise Poultry (a fictional business) runs a large chicken farm near Bulawayo. An animal welfare group says the chickens are kept in overcrowded cages and has started a social-media campaign urging people to stop buying its eggs. Sunrise's annual revenue is ${money(cRev)} and its total costs are ${money(cCost)}. Giving the chickens more space would add ${money(cChange)} a year to costs. The marketing manager estimates that if the boycott continues, revenue could fall by ${money(cLoss)} a year.`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate Sunrise Poultry's current annual profit.", kind: "money", value: f.profit(cRev, cCost), wrong: [cRev] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate Sunrise Poultry's annual profit if it gives the chickens more space and revenue does not change.", kind: "money", value: f.profit(cRev, cCost + cChange), wrong: [f.profit(cRev, cCost) + cChange] }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate Sunrise Poultry's annual profit if it makes no change and the boycott reduces revenue as estimated.", kind: "money", value: f.profit(cRev - cLoss, cCost), wrong: [f.profit(cRev, cCost)] }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Should Sunrise Poultry give in to the pressure group? Justify your answer.",
        points: [
          `Uses (b) and (c): changing leaves ${money(f.profit(cRev, cCost + cChange))}; ignoring could leave ${money(f.profit(cRev - cLoss, cCost))}.`,
          "Estimate of boycott losses may be wrong / campaign may fade.",
          "Reputation damage may last; customers can easily switch to other eggs.",
          "Changing may win new customers; could advertise better welfare.",
          "Could negotiate / phase in changes.",
          "Justified decision.",
        ],
        modelAnswer: `If Sunrise gives the chickens more space, its profit falls from ${money(f.profit(cRev, cCost))} to ${money(f.profit(cRev, cCost + cChange))}. If it ignores the campaign and the boycott works as estimated, profit could fall to ${money(f.profit(cRev - cLoss, cCost))}. The estimate may be too high and the campaign may fade, but eggs are easy to buy from other farms, so customers can switch with no effort, and bad publicity on social media spreads fast. Sunrise should give in, announce the change publicly and use \"more space for our hens\" in its marketing, because the cost of changing is much smaller than the risk of a lasting fall in sales.`,
      }),
    ],
    hints: ["(a)(b)(c) Profit = revenue − total costs.", "(d) Compare the two profits and consider how reliable the estimate is."],
    explanation: `(a) ${money(f.profit(cRev, cCost))}. (b) ${money(f.profit(cRev, cCost + cChange))}. (c) ${money(f.profit(cRev - cLoss, cCost))}. (d) Compare the cost of changing with the risk of the boycott.`,
    workedSolution: `1. Current profit = ${cRev.toLocaleString("en-GB")} − ${cCost.toLocaleString("en-GB")} = ${f.profit(cRev, cCost).toLocaleString("en-GB")}.\n2. With more space: ${cRev.toLocaleString("en-GB")} − ${(cCost + cChange).toLocaleString("en-GB")} = ${f.profit(cRev, cCost + cChange).toLocaleString("en-GB")}.\n3. With the boycott: ${(cRev - cLoss).toLocaleString("en-GB")} − ${cCost.toLocaleString("en-GB")} = ${f.profit(cRev - cLoss, cCost).toLocaleString("en-GB")}.`,
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A residents' association in Mutare is campaigning against a company's plan to build a timber-processing plant near a residential area. The residents fear noise, dust and heavy lorries. The company says the plant will create 150 jobs. The association has collected 4,000 signatures and is lobbying the town council to refuse planning permission.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** reasons why the residents' association may succeed.",
        points: [
          "Strong local support (4,000 signatures).",
          "Shows officials that many voters oppose the plan.",
          "Lobbying the council, which decides planning permission.",
          "The council has power to refuse / attach conditions; evidence of noise and dust.",
        ],
        modelAnswer: "The association has strong support, shown by 4,000 signatures, so councillors know many local voters oppose the plan. It is lobbying the council, which has the power to refuse planning permission, so its pressure is aimed directly at the decision-maker.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Evaluate how the company should respond to the campaign.",
        points: [
          "Ignore: risky, council may refuse permission.",
          "Accept: build elsewhere; extra cost / delay; may lose the best site.",
          "Negotiate: noise barriers, limited hours, a separate lorry route, local jobs.",
          "Counter-campaign: publicise the 150 jobs and benefits to the town.",
          "Considers cost and likelihood of success of each response.",
          "Justified recommendation.",
        ],
        modelAnswer: "Ignoring the campaign is risky because the council may refuse permission. Moving elsewhere would avoid conflict but might mean a worse, more expensive site and delays. The best response is to negotiate: offer noise barriers, limited working hours, a lorry route away from homes and a promise to hire local people, while publicising the 150 jobs the plant brings. This reduces the residents' main concerns and shows the council the benefits, giving the company the best chance of permission at a reasonable cost.",
      }),
    ],
    hints: ["(b) Consider ignoring, accepting, negotiating and counter-campaigning."],
    explanation: "Local groups with strong support and access to decision-makers can be powerful; negotiating usually offers the best balance.",
  });
  b.card("DEFINITION", "What is a **pressure group**?", "A group with a common interest that tries to influence businesses, governments or the public without seeking to form a government.");
  b.card("FACT", "Methods used by pressure groups?", "Publicity and media campaigns, petitions, consumer boycotts, lobbying, protests, legal action.");
  b.card("DEFINITION", "**Consumer boycott**?", "Customers refusing to buy a business's products to force it to change.");
  b.card("DEFINITION", "**Lobbying**?", "Persuading government officials and legislators to change laws or policies.");
  b.card("CONCEPT", "When are pressure groups most effective?", "Large support, media coverage, evidence, customers can easily switch, sympathetic government, finance.");
  b.card("CONCEPT", "How can businesses respond to pressure groups?", "Accept the demands, negotiate a compromise, ignore, or counter-campaign.");
  b.card("CONCEPT", "Advantages of pressure groups for business?", "Early warning of public concerns; push towards practices customers value; help avoid future legal problems.");
  b.card("FACT", "Types of pressure groups?", "Environmental, consumer, community/residents', human rights and labour, animal welfare, business groups.");
});
