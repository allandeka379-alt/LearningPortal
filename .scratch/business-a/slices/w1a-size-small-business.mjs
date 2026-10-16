// W1a: size.small-business
import { concept, P, ZIM, table, r2, money, chk } from "../lib.mjs";
import { mc } from "../tables/w1a-lib.mjs";

concept("abus.size.small-business", { file: "size/small-business", keyPrefix: "size.small-business" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an **advantage** of being a small business?",
    ok: ["It can respond quickly to changes in customers' wants", "Correct: flexibility is a main strength of small firms."],
    bad: [["It can buy raw materials at the largest bulk discounts", "Large firms get the biggest discounts."], ["It has unlimited access to bank finance", "Small firms usually find finance hard to obtain."], ["It never depends on the owner's health", "Many small firms depend heavily on the owner."]],
    explanation: "Small firms can make decisions and change products quickly.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which is a typical **disadvantage** of being a small business?",
    ok: ["It has weak buying power", "Correct: small orders earn few discounts, so unit costs are higher."],
    bad: [["It offers no personal service", "Personal service is a strength."], ["It has too many layers of management", "Small firms have few layers."], ["It is slow to make decisions", "Small firms usually decide quickly."]],
    explanation: "Weak buying power raises unit costs compared with large rivals.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why are small firms important to an economy?",
    ok: ["They provide jobs and local services", "Correct: they employ many people and serve local demand."],
    bad: [["They always produce more than large firms", "Large firms often produce far more."], ["They pay no taxes at all to anyone", "Many small firms pay some taxes."], ["They prevent any competition in markets", "Small firms increase competition."]],
    explanation: "Employment, innovation, competition and local service are key roles.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of the following is a typical weakness of a family business?",
    ok: ["Family disputes can affect decisions", "Correct: personal conflicts can spill into the firm."],
    bad: [["Family members never trust each other", "Trust is usually a strength."], ["It cannot employ non-family workers", "Non-family workers may be employed."], ["It never has any long-term view", "Family firms often take a long-term view."]],
    explanation: "Disputes, favouritism and succession problems are common weaknesses.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional bakery owner in Gweru buys 20 bags of flour a month at US\\$18 a bag. A large rival buys 600 bags a month and gets a 10% discount. What price per bag does the rival pay?",
    ok: ["US\\$16.20", "Correct: 18 × 0.90 = 16.20."],
    bad: [["US\\$17.90", "This subtracts US\\$0.10 rather than 10 per cent."], ["US\\$1.80", "This is the discount amount, not the price paid."], ["US\\$19.80", "This adds 10% instead of subtracting it."]],
    hints: ["Reduce 18 by 10%."],
    explanation: "10% of 18 is 1.80, so the price is 18 − 1.80 = US\\$16.20.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION", applies: ZIM,
    stem: "A fictional SME in Mutare cannot get a bank loan because it has no property to offer as security. Which solution is most suitable?",
    ok: ["Apply to a microfinance lender or savings group", "Correct: these lenders may lend without property security."],
    bad: [["Stop trading at once and close", "Closing is not a solution to the problem."], ["Ask the bank to lend without any checks", "Banks will not usually lend without checks."], ["Raise prices to above the competitors'", "Higher prices do not solve a lack of security."]],
    hints: ["Which lenders do not demand property as security?"],
    explanation: "Microfinance and savings groups can lend to SMEs without conventional security.",
  });
  mc(b, {
    d: 4, skill: "ANALYSIS",
    stem: "Why might a small shop find it hard to compete on price with a large supermarket chain?",
    ok: ["The chain buys in bulk and gets lower unit costs", "Correct: it can cut prices and still make a profit."],
    bad: [["The shop has more bargaining power with suppliers", "A small shop has less bargaining power."], ["The chain has fewer customers than the shop", "Chains normally have more customers."], ["Small shops must always sell at higher quality", "No rule requires this."]],
    hints: ["Think about the unit cost of each firm."],
    explanation: "Bulk-buying discounts give large chains lower unit costs.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best judgement about whether a small firm should try to grow quickly?",
    ok: ["It depends on whether it can finance growth", "Correct: names the conditions on which success depends."],
    bad: [["It should always grow, because bigger is always better", "Growth brings risks and costs."], ["It should never grow, because small is always better", "Growth may bring economies of scale."], ["It makes no difference whether it grows or not", "Growth changes finance, risk and control."]],
    hints: ["Look for the answer that gives a condition."],
    explanation: "Growth helps only if finance and management can cope.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Small firms can often give more personal service to customers than large firms.",
    answer: true,
    explanation: "True. Staff in small firms often know customers personally and can respond to their needs.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Government rules such as registration and licensing never affect small firms.",
    answer: false,
    explanation: "False. Rules can raise costs, and compliance costs fall more heavily on small firms.",
    applies: ZIM,
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each problem of SMEs to a suitable solution.",
    pairs: [["Lack of finance", "Microfinance or an SME loan scheme"], ["Weak record keeping", "Training and mentoring"], ["Unreliable power", "Alternative energy such as solar"], ["Small local market", "Joining an association to reach larger buyers"]],
    explanation: "Each problem has a matching remedy.",
    applies: ZIM,
  });

  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "Small firms are good at {{blank:a}} service, but they often have weak {{blank:b}} power with suppliers.",
    blanks: [
      { id: "a", accepted: ["personal"], choices: ["personal", "impersonal"] },
      { id: "b", accepted: ["buying"], choices: ["buying", "selling", "voting"] },
    ],
    explanation: "Small firms give personal service but cannot buy in bulk.",
  });

  const small = 8, disc = 0.12;
  const lp = r2(small * (1 - disc));
  chk(lp, 7.04);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: lp, calculator: true, daily: true, wrong: [r2(small * disc), r2(small * (1 + disc))],
    stem: "A fictional corner shop in Bulawayo buys a case of cooking oil at US\\$8.00. A large wholesaler gets a 12% bulk discount on the same case. Calculate the price per case paid by the wholesaler.",
    hints: ["Take 12% off the price."],
    explanation: "8.00 × (1 − 0.12) = 8.00 × 0.88 = US\\$7.04. US\\$0.96 is the discount, and US\\$8.96 adds the percentage.",
  });
  const sell = 10;
  const mSmall = ((sell - small) / sell) * 100, mLarge = ((sell - lp) / sell) * 100;
  chk(mSmall, 20, 0.0001);
  chk(mLarge, 29.6, 0.0001);
  b.num({
    d: 4, skill: "ANALYSIS", kind: "pct", value: mLarge - mSmall, calculator: true, wrong: [29.6, r2((sell - lp) - (sell - small))],
    stem: "Both firms above sell a case of cooking oil for US\\$10.00. The corner shop pays US\\$8.00 and the wholesaler pays US\\$7.04. Calculate how many percentage points higher the wholesaler's profit margin is (profit ÷ selling price × 100), to one decimal place.",
    hints: ["Find each firm's margin as a percentage of the selling price."],
    explanation: "Corner shop: (10 − 8) ÷ 10 × 100 = 20.0%. Wholesaler: (10 − 7.04) ÷ 10 × 100 = 29.6%. Difference = 9.6 percentage points. The profit difference of US\\$0.96 per case is a different measure.",
  });
  const loan = 6000, ci = 0.15, si = 0.09;
  chk(loan * ci - loan * si, 360);
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: loan * ci - loan * si, calculator: true, wrong: [loan * ci, loan * si],
    stem: "A fictional dressmaker in Chinhoyi needs a loan of US\\$6,000. A commercial bank would charge 15% interest a year; an SME support scheme would charge 9% a year (both rates are assumptions for this question). How much interest would she save in one year under the scheme?",
    hints: ["Calculate interest under each rate and subtract."],
    explanation: "Bank interest = 6,000 × 0.15 = 900. Scheme interest = 6,000 × 0.09 = 540. Saving = 900 − 540 = US\\$360 a year.",
    applies: ZIM,
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** advantage of being a small business.",
    accepted: ["flexibility", "personal service", "quick decisions", "owner control", "low overheads", "serves niche markets", "close contact with customers", "flexible", "personal contact", "serves local market"],
    explanation: "Accept flexibility, personal service, quick decisions, owner control, low overheads or serving niche markets.",
  });

  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Explain **one** advantage and **one** disadvantage of a family business.",
    points: ["Advantage: trust and commitment among family members", "Disadvantage: family disputes may harm business decisions", "Development: for example succession problems or employing relatives who are not the most capable"],
    modelAnswer: "A family business benefits from the trust and commitment of relatives who care about its success. However, disputes in the family can spill into business decisions, and employing relatives who are not the most capable can reduce efficiency or cause succession problems.",
    hints: ["Think about trust and conflict."],
    explanation: "An advantage and a developed disadvantage.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Chipo owns a fictional tailoring business in Masvingo. She cannot get a bank loan because she has no security. Explain **two** ways in which she might overcome her financial problem.",
    points: ["Apply to a microfinance lender or savings group", "Application: such lenders lend smaller sums to small traders without conventional security", "Save from profits or ask suppliers for credit", "Application: buying cloth on 30 days' credit reduces the cash she needs at the start"],
    modelAnswer: "She could apply to a microfinance lender or savings group, which lends small sums to traders without conventional security. She could also ask her cloth suppliers for 30 days' credit, which reduces the cash she needs to start each order.",
    hints: ["Think about lenders and suppliers."],
    explanation: "Two solutions, each applied.",
    applies: ZIM,
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why small firms might help an economy to be more innovative.",
    points: ["Small firms can try new ideas quickly because they have few layers of decision-making", "Owners have a personal stake in success, which encourages them to look for new methods", "New firms enter markets with new products, forcing existing firms to improve", "Successful ideas may later be taken up by larger firms or lead to growth"],
    modelAnswer: "Small firms can try new ideas quickly because decisions are made by the owner. Owners have a personal stake in success, so they look for new methods. New entrants with new products force existing firms to improve, and successful ideas may spread to larger firms.",
    hints: ["Follow the chain from flexibility to competition."],
    explanation: "A chain of cause and effect.",
  });
  b.manualShort({
    d: 5, skill: "EVALUATION", marks: 6,
    stem: "Evaluate whether state assistance is the most important solution to the problems faced by SMEs.",
    points: ["State help (training, finance, workspace) addresses problems small firms cannot solve alone", "State help may be limited, slow or poorly targeted", "SMEs can help themselves by forming associations and buying groups", "Better management and record keeping can improve access to finance", "Counter-argument: rules and taxes may also constrain SMEs", "Judgement with a condition, e.g. help works when combined with the owners' own efforts"],
    modelAnswer: "State assistance with training, finance and workspace tackles problems that small firms cannot solve alone. However, help may be slow or poorly targeted, and rules and taxes may add costs. SMEs can also help themselves through associations and buying groups, and by keeping better records so lenders trust them. State help is most effective when it is combined with the owners' own efforts.",
    hints: ["Compare state help with self-help and give a condition."],
    explanation: "Both sides and a conditional judgement.",
    applies: ZIM,
  });

  const rev = 96000, cost = 78000;
  b.struct({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A fictional family business, Moyo Poultry, in Chinhoyi has annual revenue of ${money(rev)} and total costs of ${money(cost)}. It buys feed at US\\$14.00 a bag. A large competitor buys feed at a 20% discount. Moyo Poultry uses 1,500 bags a year.`,
    parts: [
      P.num({ label: "(a)", marks: 2, kind: "money", value: rev - cost, stem: "Calculate Moyo Poultry's profit.", wrong: [rev, cost], explanation: "96,000 − 78,000 = US\\$18,000." }),
      P.num({ label: "(b)", marks: 2, kind: "money", value: 1500 * 14 * 0.2, stem: "Calculate how much Moyo Poultry would save in a year if it received the same 20% discount on its feed.", wrong: [1500 * 14, 1500 * 2.8 * 0.2], explanation: "Feed cost = 1,500 × 14 = 21,000. 20% of 21,000 = US\\$4,200." }),
      P.manual({ label: "(c)", marks: 3, stem: "Suggest and explain **one** way in which Moyo Poultry could reduce its feed costs.", points: ["Join with other small poultry farmers to buy feed in bulk", "The larger combined order could earn a discount", "Lower costs would raise profit above US\\$18,000"], modelAnswer: "It could join other small poultry farmers to place a combined order for feed. The larger order could earn a bulk discount, which would reduce its feed cost and raise profit above US\\$18,000.", explanation: "A suggestion, explained." }),
    ],
    hints: ["Find the cost of feed first."],
    explanation: "Profit US\\$18,000; a 20% discount saves US\\$4,200.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional government is considering two ways to help SMEs: (1) a training programme in record keeping and marketing and (2) loans at a low interest rate. A group of fictional SME owners in Mutare say that their main problems are lack of finance, poor roads to markets and complicated registration of their businesses.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain **two** reasons why SMEs are important to a country's economy.", points: ["They provide jobs and incomes", "They supply local goods and services", "They bring innovation and competition"], modelAnswer: "SMEs provide many jobs and incomes, especially in places large firms do not reach. They supply local goods and services and bring innovation and competition.", explanation: "Two reasons developed." }),
      P.manual({ label: "(b)", marks: 6, stem: "Evaluate which of the two forms of help would benefit the SME owners more.", points: ["Loans address the lack of finance, which the owners name", "Low interest reduces costs and improves survival", "Training improves records, which helps access to finance and management", "Neither tackles poor roads or complicated registration", "Loans may fail if skills are weak and the borrower cannot repay", "Judgement and reason"], modelAnswer: "Loans address the finance problem the owners name, and low interest lowers costs. Training improves records and management, which helps firms to repay and to attract lenders. Neither option solves the poor roads or registration, and loans may fail if skills are weak. On balance a combination would help most, but if only one is available, loans with some basic training attached would benefit most owners, since finance is their stated need.", hints: ["Use the owners' stated problems as criteria."], explanation: "Two options judged against the case." }),
    ],
    hints: ["Which problems does each option solve?"],
    explanation: "Finance is the named need, but skills are needed to use loans well.",
    applies: ZIM,
  });

  b.card("DEFINITION", "Small and medium-sized enterprise (SME)", "A business below set limits of size (employees, turnover) that governments treat as a group for support and rules.");
  b.card("FACT", "Advantages of being small", "Flexibility, personal service, owner control, low overheads and the ability to serve niche markets.");
  b.card("FACT", "Disadvantages of being small", "Limited finance, weak buying power, dependence on the owner, few resources in a bad period and limited skills.");
  b.card("FACT", "Strengths of family businesses", "Trust, commitment, flexibility and a long-term outlook.");
  b.card("FACT", "Weaknesses of family businesses", "Family disputes, favouritism, mixing family and business money, and succession problems.");
  b.card("FACT", "Importance of small firms", "Jobs, innovation, competition, local service, supply to large firms and the start of growth.");
  b.card("FACT", "Problems faced by SMEs in Zimbabwe", "Finance, markets, skills, infrastructure and regulation.", undefined, { applies: ZIM });
  b.card("FACT", "State help for SMEs", "Training, advice, easier finance, workspace and simplified registration; the state also constrains through taxes, licences and rules.", undefined, { applies: ZIM });
  b.card("CONCEPT", "Why small shops cannot win on price", "Large rivals buy in bulk at lower unit costs; small shops compete on service, flexibility and convenience.");
});
