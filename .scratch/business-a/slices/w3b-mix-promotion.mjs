// W3b: mix.promotion
import { concept, P, chk, money, table, pctChange, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.mix.promotion", { file: "mix/promotion", keyPrefix: "mix.promotion" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of a **sales promotion**?",
    ok: ["A buy-one-get-one-free offer for one week", "Correct: a short-term offer to encourage buying."],
    bad: [["A radio advertisement that runs for a year", "Paid media messages are advertising."], ["A salesperson visiting a business customer", "That is personal selling."], ["A news story about the firm in a newspaper", "Unpaid coverage is publicity, part of public relations."]],
    explanation: "Sales promotion means short-term offers such as discounts, coupons and free samples.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "The main purpose of branding is to",
    ok: ["make a product easy to recognise and tell apart from rivals", "Correct: a brand identifies the product and builds loyalty."],
    bad: [["reduce the variable cost of making the product", "Branding does not lower production cost."], ["make sure that the product is always sold at the lowest price", "Strong brands often support higher prices."], ["avoid the need for any other promotion", "Branding works with other methods; it does not replace them."]],
    explanation: "A brand gives identity, which helps customers to recognise and prefer the product.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A firm sets its promotion budget at 4% of last year's sales. A weakness of this method is that",
    ok: ["spending falls when sales fall, just when promotion is needed", "Correct: the budget follows sales instead of leading them."],
    bad: [["it ignores the past sales of the firm when it sets the budget", "Past sales are the basis of the budget."], ["it needs the firm to know the cost of every media option", "That is the objective-and-task method."], ["it makes the budget the same as the largest rival's", "That is competitive parity."]],
    explanation: "A percentage of sales is simple but cuts spending when sales fall.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method is **most** suitable for selling an expensive machine to a few business customers?",
    ok: ["Personal selling", "Correct: the customer needs a demonstration and explanation, and there are few buyers."],
    bad: [["Free samples handed out in the street", "A machine cannot be given as a sample, and the buyers are few."], ["Sponsorship of a sports team", "That reaches a wide audience, not a small group of business buyers."], ["Coupons in a newspaper", "Coupons suit low-priced consumer goods."]],
    explanation: "For technical products and business customers, personal selling is usually the best method.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional shop in Mutare sells school uniforms. Its owner places notices on school gates and gives a 10% discount to parents who buy the full set in January. Which methods are used?",
    ok: ["Advertising and sales promotion", "Correct: notices are advertising and a discount is sales promotion."],
    bad: [["Sponsorship and personal selling", "Neither a notice nor a discount is sponsorship or a sales visit."], ["Public relations and direct marketing", "No unpaid coverage or personal messages to named customers are used."], ["Branding and packaging", "The case describes neither a brand design nor a pack."]],
    hints: ["Which method is a paid message and which is a short-term offer?"],
    explanation: "The notice is paid advertising and the discount for the full set is a sales promotion.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional bakery gives away free samples of a new bread for one week. Sales that week rise sharply but fall to the old level the week after. What does this suggest?",
    ok: ["The samples attracted trial but not repeat buying", "Correct: the effect was short-lived."],
    bad: [["The promotion was a long-term success for the business", "Sales returned to the old level, so there is no lasting gain."], ["The bread was priced too low to cover its cost", "The case says nothing about the price."], ["Advertising is always better than free samples", "One result cannot show that."]],
    hints: ["Compare sales during the week with the week after."],
    explanation: "Sales rose only while the samples were available, so the effect was short-term.",
  });
  mc(b, {
    d: 3, skill: "UNDERSTANDING",
    stem: "Why might a small firm choose publicity rather than television advertising?",
    ok: ["It costs little and a news story may be trusted more", "Correct: low cost and credibility suit a small budget."],
    bad: [["The firm controls exactly what is said", "With publicity the firm does not control what is written."], ["It always reaches more people than a television advertisement", "Television normally reaches a larger audience."], ["It can be repeated every day at no cost", "Publicity depends on media interest and cannot be ordered."]],
    hints: ["Think about cost and about who controls the message."],
    explanation: "Publicity is cheap and credible, but the firm cannot control the message or its timing.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which conclusion is the **best-supported judgement** on the success of a promotional campaign?",
    ok: ["It succeeded if the extra contribution exceeded the cost", "Correct: a judgement tied to a measurable condition."],
    bad: [["It succeeded because many people saw the advertisement", "Reach does not show that the campaign raised profit."], ["It failed because sales did not double", "Doubling is an arbitrary standard."], ["It cannot be judged because promotion is never measurable at all", "Sales, enquiries and costs can be compared."]],
    hints: ["Compare the extra contribution with the cost."],
    explanation: "The best test is whether extra contribution exceeds cost, after allowing for other causes.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Publicity is a message the business pays to place in the media.",
    answer: false,
    explanation: "False. Paid messages are advertising. Publicity is coverage the media give without being paid, so the firm does not control it.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Under the objective-and-task method, the promotion budget is found by costing the actions needed to achieve a stated objective.",
    answer: true,
    explanation: "True. The firm sets an objective, lists the tasks, costs them and adds the costs to give the budget.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each promotion method to the example.",
    pairs: [["Advertising", "A paid poster on a roadside board"], ["Personal selling", "A salesperson demonstrating a water pump to a farmer"], ["Sponsorship", "Paying for the name of a school netball tournament"], ["Direct marketing", "A text message sent to customers on the shop's customer list"]],
    explanation: "Each example matches one method of promotion.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "A discount offered for one week is a {{blank:a}} promotion, while a story in the newspaper that the firm did not pay for is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["sales"], choices: ["sales", "direct", "personal"] },
      { id: "b", accepted: ["publicity"], choices: ["advertising", "publicity", "sponsorship"] },
    ],
    explanation: "Discounts are sales promotion; unpaid coverage is publicity.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** factor that affects the size of a firm's promotional budget.",
    accepted: ["objectives", "the objectives of the promotion", "rivals' spending", "competitors' spending", "profit", "size of the firm", "cost of media", "stage of the product life cycle", "sales", "the firm's finances", "what the firm can afford"],
    explanation: "Objectives, size and profit of the firm, rivals' spending, the product's life cycle stage and media costs all affect the budget.",
  });

  {
    const sales = 350000, pct = 4;
    const bud = (sales * pct) / 100;
    chk(bud, 14000);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional furniture company in Harare expects sales of ${money(sales)} next year and sets its promotional budget at ${pct}% of expected sales. What is the budget?`,
      kind: "money", value: bud, wrong: [sales * 0.004, sales / 4],
      explanation: `Budget = 4% × 350,000 = US\\$14,000. Dividing by 4 instead of taking 4% gives US\\$87,500.`,
    });
  }
  {
    const before = 6400, during = 7552;
    const g = pctChange(before, during);
    chk(g, 18, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional cooking-oil brand sold ${before.toLocaleString("en-GB")} bottles a month before a radio campaign and ${during.toLocaleString("en-GB")} bottles in the campaign month. Calculate the percentage increase in sales. Give your answer to one decimal place.`,
      kind: "pct", value: g, wrong: [pctChange(during, before), (during / before) * 100],
      explanation: "Increase = 7,552 − 6,400 = 1,152. 1,152 ÷ 6,400 × 100 = 18.0%. Dividing by the later figure gives 15.3% and 118.0% forgets to subtract the starting sales.",
    });
  }
  {
    const before = 2500, during = 3100, price = 12, vc = 7.5, cost = 1800;
    const extra = during - before;
    const net = extra * (price - vc) - cost;
    chk(net, 900);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional paint shop in Gweru runs a discount campaign costing ${money(cost)}. A tin sells for ${money(price)} and its variable cost is ${money(vc)}. Sales rise from ${before.toLocaleString("en-GB")} tins in a normal month to ${during.toLocaleString("en-GB")} tins in the campaign month. Calculate the net gain from the campaign, ignoring any other effects.`,
      kind: "money", value: net, wrong: [extra * price - cost, extra * (price - vc)],
      hints: ["Use the contribution on the extra tins, not the revenue."],
      workedSolution: "1. Extra tins = 3,100 − 2,500 = 600.\n2. Contribution per tin = 12.00 − 7.50 = US\\$4.50.\n3. Extra contribution = 600 × 4.50 = US\\$2,700.\n4. Net gain = 2,700 − 1,800 = US\\$900.",
      explanation: "The extra contribution of US\\$2,700 less the campaign cost of US\\$1,800 gives US\\$900. Using revenue instead of contribution gives US\\$5,400, and forgetting the cost gives US\\$2,700.",
    });
  }
  {
    const cost = 2160, extra = 900;
    const cpe = cost / extra;
    chk(cpe, 2.4);
    b.num({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional soap maker spent ${money(cost)} on a campaign and sold ${extra} extra bars as a result. Calculate the cost of promotion for each extra bar sold.`,
      kind: "money", value: cpe, wrong: [extra / cost, cost - extra],
      hints: ["Divide the cost by the extra bars sold."],
      explanation: "Cost per extra bar = 2,160 ÷ 900 = US\\$2.40. Dividing the other way gives 0.42, which is bars per dollar.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** way in which good packaging can act as promotion.",
    points: ["It attracts attention to the product on the shelf", "It gives information and an image of quality that persuades customers to buy"],
    modelAnswer: "A well-designed pack attracts attention on a crowded shelf. It also shows information and gives an image of quality, which persuades customers to choose the product.",
    explanation: "One mark for attracting attention and one for persuading with information or image.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Farai runs a fictional hardware shop in Chinhoyi and wants to attract builders to buy cement and tools. Explain **two** promotion methods he could use.",
    points: ["Personal selling or direct marketing: visits or messages to building contractors", "Application: contractors buy in large amounts, so a few contacts can bring large orders", "Sales promotion: discounts on bulk orders or loyalty cards for contractors", "Application: builders who return regularly to claim the discount help to build repeat sales"],
    modelAnswer: "Farai could visit or send messages to building contractors directly, because each contractor buys in large amounts and a few contacts can bring large orders. He could also offer a discount on bulk orders or a loyalty card, which encourages builders to return regularly and build repeat sales.",
    hints: ["Think about how to reach a small group of big buyers."],
    explanation: "Two methods, each developed using builders.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse why the effect of a promotional campaign on sales may be difficult to measure.",
    points: ["Other factors, such as season, rivals or price changes, also affect sales", "It is hard to separate how much of the change was caused by the campaign", "Some effects, such as brand image, appear only later", "Sales may only have been brought forward, so later sales fall"],
    modelAnswer: "Sales are influenced by other things such as the season or rivals' actions, so it is hard to say how much of a rise is due to the campaign. Some effects such as brand image appear only later, and customers may only have bought sooner, so sales after the campaign fall.",
    hints: ["Think about other causes of change in sales, and about timing."],
    explanation: "Four reasons are linked to the difficulty of isolating the effect.",
  });

  {
    const media = [["Radio", 900, 45000], ["Posters", 400, 8000], ["Newspaper", 1200, 20000]];
    const cpp = media.map(([, c, r]) => c / r);
    chk(cpp[2] * 100, 6);
    chk(cpp[0] * 100, 2);
    const tbl = table(["Medium", "Cost (US\\$)", "People reached"], media, ["l", "r", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `Chipo owns a fictional school-supplies shop in Masvingo. She has a budget of ${money(1500)} for one promotion and compares three media for the start-of-term campaign.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the cost per person reached by the newspaper, in cents.", kind: "cents", dp: 1, value: cpp[2] * 100, wrong: [cpp[0] * 100, cpp[1] * 100], explanation: "1,200 ÷ 20,000 = US\\$0.06 = 6.0 cents. Radio costs 2 cents and posters 5 cents per person." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which medium has the lowest cost per person reached?", options: [["Radio", "Correct: 900 ÷ 45,000 = 2 cents."], ["Posters", "5 cents per person, higher than radio."], ["Newspaper", "6 cents per person, the highest."], ["They are all the same", "The costs per person differ."]], answer: "A", explanation: "Radio costs 2 cents per person, posters 5 and the newspaper 6." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the cheapest medium per person reached may not be the best choice.", points: ["The people reached may not be the shop's target customers", "Application: parents of school children may be better reached by posters near schools", "Reach is not the same as sales, so a message must persuade as well as be seen"], modelAnswer: "The cheapest medium may reach many people who are not parents of school children, so a lot of the audience is wasted. Posters near schools reach fewer people but more of the right ones. Reaching people does not guarantee sales unless the message persuades them.", hints: ["Think about who the target customers are."], explanation: "Target audience, application, and reach versus sales." }),
        P.manual({ label: "(d)", marks: 3, stem: "Recommend a medium for the campaign and justify your choice.", points: ["Choice of a medium that fits the target market and the budget of US\\$1,500", "Reason using cost per person or the type of customer reached", "A condition or limit, for example the message must be seen near term start"], modelAnswer: "Radio is the best choice if its audience includes parents, because it reaches the most people for US\\$900, well within the budget, at 2 cents per person. The message should run just before term starts, and posters at the school gate could be added with the remaining money.", hints: ["Use the cost per person and the budget."], explanation: "A choice with a reason from the figures and a condition." }),
      ],
      hints: ["Divide the cost of each medium by the number of people reached."],
      explanation: "Radio is cheapest per person (2 cents); the newspaper costs 6 cents. The best choice also depends on who is reached.",
    });
  }
  {
    const sales = 480000, pct = 2.5;
    const bud = (sales * pct) / 100;
    chk(bud, 12000);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Tafara Juices is a fictional business in Harare that sells fruit juice to shops and schools. Yearly sales are ${money(sales)} and the owner sets a promotional budget of ${pct}% of sales. A new mango flavour is about to be launched. The owner is choosing between a month-long radio advertising campaign costing ${money(5000)}, and a sales promotion giving free samples to schools, costing ${money(3200)}. A rival has just launched a cheaper mango juice.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the promotional budget for the year.", kind: "money", value: bud, wrong: [sales / 25, sales * 0.25], explanation: "2.5% × 480,000 = US\\$12,000. Dividing by 25 gives US\\$19,200." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** disadvantage of setting the budget as a percentage of sales for a business that is launching a new flavour.", points: ["The budget depends on past or expected sales, not on what the launch needs", "A new product may need heavy spending before its sales exist", "The rival's launch may require more spending than the percentage allows", "A fixed budget could leave the launch under-funded and weaken the new flavour's sales"], modelAnswer: "The budget is based on sales rather than on what the launch needs, but a new flavour needs heavy spending before its own sales appear. With the rival's cheaper mango juice, US\\$12,000 may not be enough, so the launch could be under-funded and sales of the new flavour may be weak.", hints: ["Think about when a new product needs promotion most."], explanation: "A chain from a fixed percentage to under-funding the launch." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate which promotion method Tafara Juices should use to launch the mango flavour.", points: ["Radio reaches many people and builds awareness of the new flavour", "Radio costs more (US\\$5,000) and its effect is hard to measure", "Free samples let customers taste the flavour; this is useful because trying is the barrier", "Samples at schools reach children and, through them, families, at a lower cost (US\\$3,200)", "Samples may only produce short-term sales and do not build the brand on their own", "The rival's cheaper juice means price-sensitive buyers may not switch even after tasting", ["Judgement with a reason, for example: samples first because they cost less and let customers test the flavour", 1], ["Condition or time-frame, for example: add radio later if samples show that customers like the flavour", 1]], levels: [[1, 1, 3, "General points on promotion with little use of the case."], [2, 4, 6, "Reasons for and against each method applied to the launch and the costs."], [3, 7, 8, "Balanced evaluation of both methods in the case with a justified judgement and a condition."]], modelAnswer: "Radio would build awareness of the mango flavour among many people, but it costs US\\$5,000 and its effect on sales is difficult to measure. Free samples at schools cost US\\$3,200 and let customers taste the flavour, which is the main barrier to buying a new juice, and they reach families through children. However, samples may give only short-term sales and the rival's cheaper juice could still win price-sensitive buyers. Tafara should begin with the samples because they cost less and test whether customers like the flavour, and add radio later if the results show that the flavour is liked.", hints: ["Compare cost, reach and the effect on sales for each method."], explanation: "Both methods weighed against the case, with a judgement that names a condition." }),
      ],
      hints: ["Convert the percentage into dollars first."],
      explanation: "The budget is US\\$12,000. The choice of method depends on cost, reach and the barrier of trying the new flavour.",
    });
  }

  b.card("DEFINITION", "Promotion", "All the methods used to inform customers, persuade them to buy and remind them of the product.");
  b.card("CONCEPT", "Advertising and sales promotion", "Advertising is a paid message in the media. Sales promotion is a short-term offer such as a discount, coupon or free sample.");
  b.card("CONCEPT", "Personal selling and direct marketing", "Personal selling is face-to-face selling, suited to costly or technical goods. Direct marketing sends messages straight to chosen customers.");
  b.card("CONCEPT", "Public relations, publicity and sponsorship", "PR builds good relations. Publicity is unpaid media coverage the firm cannot control. Sponsorship pays to link the brand with an event or person.");
  b.card("DEFINITION", "Branding", "Giving a product a name, symbol or design that makes it recognisable and different, to build loyalty.");
  b.card("FACT", "Promotional budget methods", "Percentage of sales; objective and task; competitive parity; affordable. Each has a weakness: for example the percentage of sales method cuts spending when sales fall.");
  b.card("FACT", "Choosing the promotion mix", "Depends on the product, market, budget, stage of the life cycle, objective and rivals' promotion.");
  b.card("FORMULA", "Net gain from a campaign", "Net gain = extra units × contribution per unit − cost of the campaign. Cost per extra unit sold = cost ÷ extra units.");
  b.card("CONCEPT", "Measuring a campaign", "Compare sales before, during and after, allowing for other causes such as season, price and rivals. Also count enquiries and coupons used.");
});
