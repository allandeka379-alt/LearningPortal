// W1b: environment.political-legal
import { concept, P, chk, money } from "../lib.mjs";
import { mc } from "../tables/w1b-lib.mjs";

concept("abus.environment.political-legal", { file: "environment/political-legal", keyPrefix: "environment.political-legal" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which law-related aim is the main purpose of **consumer protection** legislation?",
    ok: ["To protect buyers from unsafe goods and misleading claims", "Correct: it covers safety, honest descriptions and fair terms."],
    bad: [["To protect firms from having to pay any tax on profits", "Tax rules are a separate matter and are not consumer protection."], ["To guarantee that every business makes a profit each year", "No law guarantees a profit to a business."], ["To stop customers returning faulty goods to the shops", "Consumer law normally gives buyers the right to return faulty goods."]],
    explanation: "Consumer protection laws shield buyers from unsafe goods, false descriptions and unfair terms.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A **minimum wage** law is an example of legal control over",
    ok: ["wage levels", "Correct: it sets the lowest pay that may be offered."],
    bad: [["location of businesses", "Planning laws, not wage laws, control location."], ["advertising claims", "Advertising is controlled by marketing laws."], ["mergers and takeovers", "Competition law, not wage law, controls mergers."]],
    explanation: "A minimum wage is a legal control over pay levels.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do governments control mergers and monopolies?",
    ok: ["To stop a dominant firm raising prices or limiting choice", "Correct: competition policy protects consumers from abuse of market power."],
    bad: [["To make sure that small firms never grow into larger firms", "The aim is to protect competition, not to stop growth in general."], ["To increase the profits of the largest firms in an industry", "Competition policy aims to limit, not boost, the power of large firms."], ["To make sure every product in a market has one fixed price", "Competition policy does not fix a single price for all firms."]],
    explanation: "Competition law protects consumers by limiting the abuse of market power.",
  });
  mc(b, {
    d: 2, skill: "APPLICATION",
    stem: "A fictional supermarket in Gweru is told by the authorities to remove a sign saying \"lowest prices in the country\" because it cannot prove the claim. Which type of law is being applied?",
    ok: ["Marketing law on advertising claims", "Correct: advertising claims must be honest and provable."],
    bad: [["Employment law on workers' contracts", "The case is not about workers or their contracts."], ["Location law on planning permission", "Nothing in the case is about where the shop is built."], ["Competition law on mergers and takeovers", "No merger or takeover is involved."]],
    explanation: "Controls on misleading claims are part of marketing law.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "The government of a fictional country doubles the licence fee for selling alcohol. Which business will probably be **most** affected?",
    ok: ["A small roadside bar that sells mostly alcohol to adults only", "Correct: the fee is a large cost compared with its revenue."],
    bad: [["A large bank that does not sell any alcohol at all", "A bank is not subject to the alcohol licence fee."], ["A school with a tuck shop that sells only snacks and sweets", "It does not sell alcohol, so the fee does not apply."], ["A firm that makes safety helmets for mine workers", "It does not sell alcohol and the fee is irrelevant to it."]],
    hints: ["Which firm depends most on the product that the law affects?"],
    explanation: "A law on a particular good hits hardest the firm that depends on that good.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A new law requires all workshops to provide protective clothing for each worker. Which statement best shows why small firms may be affected more than large ones?",
    ok: ["The cost is a bigger share of a small firm's revenue and it has less staff time", "Correct: relative cost and limited management capacity hurt small firms most."],
    bad: [["Small firms are always exempt from legal requirements of this kind", "Small firms are generally covered by safety laws."], ["Large firms do not employ any workers who need such protective clothing", "Large firms usually have many such workers."], ["Protective clothing is cheaper for small firms to buy in small amounts", "Bulk buying favours larger firms, which get discounts."]],
    hints: ["Think about cost compared with revenue and about administrative help."],
    explanation: "Compliance costs weigh more heavily on small firms with limited revenue and staff.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a **benefit** to a business of operating in a politically stable country?",
    ok: ["It can plan investment with more confidence about future rules", "Correct: stability reduces uncertainty."],
    bad: [["It never has to obey any laws on employment, pay or safety", "Stable countries normally enforce laws more consistently, not less."], ["It will always earn higher profit than any firm elsewhere", "Stability does not guarantee profit."], ["It is protected from competition from all other firms in the market", "Stability does not remove competitors."]],
    hints: ["What does stability do to the firm's ability to forecast?"],
    explanation: "Stability lowers uncertainty and makes long-term investment more attractive.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported** judgement on whether tougher employment laws harm business?",
    ok: ["It depends: costs rise at first, but workers may become more productive", "Correct: it recognises costs and benefits and gives a reason."],
    bad: [["Yes, because laws always raise costs and never produce any benefit at all", "Laws can lead to higher productivity, safety and loyalty."], ["No, because laws never have any real effect on what firms do", "Laws change costs and behaviour; the claim is false."], ["Yes, because all workers will stop working once the laws become strict", "No evidence suggests workers would stop working because of such laws."]],
    hints: ["Choose the answer that weighs both sides."],
    explanation: "A judgement should weigh the higher costs against the possible gains in productivity, morale and reputation.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A firm is free to ignore a change in the law if the change makes its costs higher.",
    answer: false,
    explanation: "False. A firm must obey the law. If it does not, it may face fines, closure or loss of reputation, so it must adapt, for example by raising prices or reducing other costs.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "Political instability usually makes businesses more willing to make long-term investments.",
    answer: false,
    explanation: "False. Instability creates uncertainty about future rules, property rights and demand, which makes firms reluctant to commit money for the long term.",
    hints: ["Think of what uncertainty does to planning."],
  });

  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each legal control to the area of business it affects.",
    pairs: [["Planning permission for a new factory", "Location"], ["A rule that limits the working week", "Conditions of work"], ["A rule against false descriptions on labels", "Marketing behaviour"], ["A ban on price-fixing agreements", "Competition"]],
    explanation: "Each legal control is linked to one of the areas a government regulates.",
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct word for each gap.",
    template: "A {{blank:a}} wage law raises the cost of labour, so the firm may have to raise {{blank:b}} or cut other costs.",
    blanks: [
      { id: "a", accepted: ["minimum"], choices: ["minimum", "maximum", "voluntary"] },
      { id: "b", accepted: ["prices"], choices: ["prices", "tax", "interest"] },
    ],
    explanation: "A minimum wage raises the wage bill; the firm may respond by raising prices or cutting other costs.",
  });

  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "State **one** area of business activity that the law controls.",
    accepted: ["employment", "wages", "health and safety", "advertising", "competition", "location", "mergers", "monopolies", "working conditions", "consumer protection", "pricing", "marketing"],
    explanation: "Employment, working conditions, wages, marketing, competition and location are all controlled by law.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** legal requirement for a person starting an enterprise in Zimbabwe.",
    accepted: ["registration", "register the business", "licence", "obtain a licence", "pay tax", "tax registration", "comply with labour law", "follow consumer law"],
    explanation: "Starting an enterprise normally involves registration, licences, tax and compliance with labour and consumer law.",
  });

  {
    const workers = 18, oldW = 200, newW = 230;
    const extra = workers * (newW - oldW) * 12;
    chk(extra, 6480, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional garage employs ${workers} mechanics. The legal minimum pay rises from ${money(oldW)} to ${money(newW)} a month, and all ${workers} are paid the minimum. By how much does the garage's yearly wage bill rise?`,
      kind: "money", value: extra, wrong: [workers * (newW - oldW), (newW - oldW) * 12],
      explanation: `Rise per worker per month = 230 − 200 = US\\$30. Yearly rise = 18 × 30 × 12 = US\\$6,480. Forgetting to multiply by 12 gives US\\$540.`,
    });
  }
  {
    const extra = 6480, profit = 40000;
    const pct = (extra / profit) * 100;
    chk(pct, 16.2, 1e-9);
    b.calc({
      d: 3, skill: "ANALYSIS",
      stem: `Before the pay rise the fictional garage earned a yearly profit of ${money(profit)}. The rise costs it US\\$6,480 a year and nothing else changes. By what percentage does its profit fall? Give your answer to one decimal place.`,
      kind: "pct", value: pct, wrong: [(extra / (profit - extra)) * 100, (profit - extra) / profit * 100],
      hints: ["Percentage change is the fall divided by the original profit."],
      explanation: `Fall in profit = 6,480. Percentage fall = 6,480 ÷ 40,000 × 100 = 16.2%. Dividing by the new profit (33,520) gives 19.3%.`,
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a government makes laws about health and safety at work.",
    points: ["To protect workers from injury and illness", "Because without laws some firms might cut costs by ignoring safety"],
    modelAnswer: "Laws protect workers from injury and illness. Without them, some firms might cut costs by ignoring safety, so the law sets a minimum standard for all.",
    explanation: "A purpose and its reason.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Farai plans to open a fictional food-processing factory in Harare. Explain **two** ways in which the law will affect his decisions.",
    points: ["Planning and location rules decide where he may build", "Application: he may have to build in an industrial zone, which could cost more or be farther from customers", "Marketing and food-safety rules control labels and claims", "Application: he must test products and print accurate labels, which adds cost but builds trust"],
    modelAnswer: "Planning rules control where he can build, so he may have to use an industrial zone that is costlier or farther from his customers. Food laws also control labels and claims, so he must test his products and print accurate labels, which adds cost but builds consumer trust.",
    hints: ["Think of location, safety, employment and labelling laws."],
    explanation: "Two laws, each applied.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how a rise in the legal minimum wage could affect a fictional restaurant that employs mostly low-paid staff.",
    points: ["The wage bill rises", "Profit falls unless prices rise or other costs fall", "A price rise may reduce demand", "The owner might cut staff hours or jobs, affecting service and sales"],
    modelAnswer: "The wage bill rises, so profit falls unless the restaurant raises prices or cuts other costs. A price rise may reduce the number of diners. The owner may cut hours or jobs, which could slow service and cost more sales.",
    hints: ["Follow the chain from the wage bill to profit and customers."],
    explanation: "A chain from cost to profit, price and demand.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 5,
    stem: "Assess whether competition law benefits consumers more than it harms businesses.",
    points: ["It prevents abuse of monopoly power, such as high prices", "It protects choice and encourages innovation", "It can block mergers that would create savings from economies of scale", "It adds legal and compliance costs for firms", "Judgement with a reason or condition"],
    modelAnswer: "Competition law stops a dominant firm from raising prices and keeps choice and innovation alive. It may block a merger that would bring economies of scale and it adds compliance costs. Overall consumers gain more where a market would otherwise be dominated by one firm, but in small markets a merger that creates a viable firm may be worth allowing.",
    hints: ["Weigh the gains for consumers against the costs to firms."],
    explanation: "Both sides and a conditional judgement.",
  });

  b.struct({
    d: 3, skill: "APPLICATION",
    stem: "A fictional business: Mbare Bakeries (Harare) employs 40 workers at the legal minimum of US\\$160 a month. A new law raises the minimum to US\\$176 a month and requires the bakery to install fire extinguishers and train staff in safety. Yearly profit is US\\$24,000.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the rise in the yearly wage bill.", kind: "money", value: 40 * (176 - 160) * 12, wrong: [40 * (176 - 160), 176 * 40 * 12], explanation: "Rise per worker per month = US\\$16. Yearly rise = 40 × 16 × 12 = US\\$7,680." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the new yearly profit if the wage rise is the only change. Give your answer in US dollars.", kind: "money", value: 24000 - 7680, wrong: [24000 + 7680, 7680], explanation: "New profit = 24,000 − 7,680 = US\\$16,320." }),
      P.manual({ label: "(c)", marks: 3, stem: "Explain **one** benefit to the bakery of the safety requirements.", points: ["Fewer accidents and less time lost", "Application: bakers working near ovens are safer", "Result: output is steadier and compensation costs are lower"], modelAnswer: "With extinguishers and training there are fewer accidents near the ovens, so less working time is lost and the bakery faces fewer compensation costs.", explanation: "A benefit with application and result." }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest **one** way in which the bakery could respond to the rise in costs.", points: ["Raise the price of bread slightly", "Application: or improve efficiency, for example by reducing waste of flour, to protect profit"], modelAnswer: "It could raise the price of bread slightly, or reduce waste of flour so that the higher wage bill is partly paid for by savings.", explanation: "A response, applied." }),
    ],
    hints: ["Use the extra monthly pay for the first part."],
    explanation: "The wage-bill and profit effects are calculated, and the benefits of the law and a response are explained.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "A fictional business: Lusaka Fresh Foods (Zambia) exports vegetables to South Africa and sells in local markets. The government introduces a law that requires every pack to show the farm of origin and a pesticide statement, and proposes a ban on selling in open markets after 6 pm. Small farmers who supply Lusaka Fresh say the labelling costs will be heavy, but large supermarkets say they welcome the law.",
    parts: [
      P.manual({ label: "(a)", marks: 3, stem: "Explain why a government might introduce the labelling law.", points: ["To protect consumers by giving information about origin and pesticides", "To build trust in exported produce", "To hold producers responsible for the safety of their goods"], modelAnswer: "The government wants consumers to know where food comes from and whether pesticides were used. This builds trust, including in export markets, and makes producers responsible for the safety of their produce.", explanation: "Reasons linked to consumers and exports." }),
      P.manual({ label: "(b)", marks: 3, stem: "Analyse why small farmers may be affected more than supermarkets.", points: ["Labelling and testing are a fixed cost per pack or batch", "Small farmers have low volumes and less revenue to cover it", "Supermarkets have systems and staff to handle the requirements"], modelAnswer: "Labelling and testing costs are spread over small volumes for small farmers, so they are a large share of revenue. Supermarkets have the systems and staff to comply, so the burden is lighter.", hints: ["Compare cost with revenue and with staff capacity."], explanation: "Relative cost and capacity." }),
      P.manual({ label: "(c)", marks: 8, stem: "Evaluate how Lusaka Fresh Foods should respond to the new laws.", points: ["Comply: obey the labelling law to keep access to the export market", "Support small farmers with training or shared labelling facilities", "Cost: higher costs may reduce profit unless prices rise", "Benefit: reputation for safe food and access to supermarkets", "The 6 pm ban could reduce open-market sales, so shift sales to supermarkets or earlier hours", ["Judgement that recommends a response with a reason", 2], ["A condition or time-frame", 1]], modelAnswer: "Lusaka Fresh must comply with the labelling law, because failure would lose export sales and invite fines. It should help its small farmers by providing training and shared labelling facilities so that they stay as suppliers. The extra costs may reduce profit, but a reputation for safe food helps in supermarkets and in export markets. The 6 pm ban may reduce sales in open markets, so it should shift some sales to earlier hours and to supermarkets. Overall, a strategy of compliance with support for farmers is best, so long as the extra cost can be passed on in prices without losing customers, and it should be reviewed after the first season.", hints: ["Say what the firm should do, weigh costs and benefits, and add a condition."], explanation: "A reasoned response to the law, using the case.", levels: [[1, 1, 3, "Describes the laws with little link to the firm."], [2, 4, 6, "Applies the laws to the firm and weighs costs and benefits."], [3, 7, 8, "A justified response with a condition."]] }),
    ],
    hints: ["Refer to the farmers, the supermarkets and the exports."],
    explanation: "The aim of the law is explained, its uneven effects analysed and a response evaluated.",
  });

  b.card("DEFINITION", "Political and legal environment", "Government policies, laws and regulations, and political stability, that affect how a business operates.");
  b.card("FACT", "Areas of business the law controls", "Employment practices, conditions of work, wages, marketing behaviour, competition, location and particular goods and services.");
  b.card("DEFINITION", "Consumer protection", "Laws and bodies that protect buyers from unsafe goods, false descriptions, misleading advertising and unfair terms.");
  b.card("DEFINITION", "Competition policy", "Government action to prevent monopoly power, price-fixing and mergers that harm consumers.");
  b.card("CONCEPT", "Effect of political stability", "Stability allows firms to plan and invest; instability brings uncertainty and discourages investment.");
  b.card("FACT", "Legal requirements for starting an enterprise", "Registration, licences, tax, labour law and consumer law.");
  b.card("CONCEPT", "Why small firms feel regulation more", "Compliance cost is a larger share of revenue and they have fewer staff to handle it.");
  b.card("CONCEPT", "Ways to respond to legal change", "Monitor proposals, adapt products and processes, train staff, lobby through trade associations, pass costs on in prices.");
});
