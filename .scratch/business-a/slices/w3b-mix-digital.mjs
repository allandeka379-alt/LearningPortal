// W3b: mix.digital
import { concept, P, chk, money, table, r2 } from "../lib.mjs";
import { mc } from "../tables/w3b-lib.mjs";

concept("abus.mix.digital", { file: "mix/digital", keyPrefix: "mix.digital" }, (b) => {
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "A business that sells goods directly to the final customer over the internet uses which e-commerce model?",
    ok: ["B2C (business to consumer)", "Correct: the buyer is the final consumer."],
    bad: [["B2B (business to business)", "In B2B the buyer is another business."], ["B2G (business to government)", "In B2G the buyer is a government body."], ["C2C (consumer to consumer)", "In C2C individuals sell to each other."]],
    explanation: "Selling to the final customer online is B2C.",
  });
  mc(b, {
    d: 1, skill: "RECALL",
    stem: "Which term describes the percentage of visitors to a website who go on to buy?",
    ok: ["Conversion rate", "Correct: visitors converted into customers."],
    bad: [["Market share", "Market share compares the firm's sales with the whole market."], ["Profit margin", "Profit margin compares profit with revenue."], ["Capacity utilisation", "Capacity utilisation compares actual output with maximum output."]],
    explanation: "Conversion rate = orders ÷ visitors × 100.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement correctly separates e-business from e-commerce?",
    ok: ["E-business covers all electronic activity, e-commerce only buying and selling", "Correct: e-commerce is one part of e-business."],
    bad: [["E-commerce covers all electronic activity while e-business covers only selling", "This reverses the two terms."], ["E-business is trading only between consumers, e-commerce only between firms", "Neither term is limited to those groups."], ["E-business and e-commerce are legal words that only banks are allowed to use", "They are general business terms used in all sectors."]],
    explanation: "E-commerce (buying and selling online) is part of the wider e-business.",
  });
  mc(b, {
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **risk** of selling physical goods online?",
    ok: ["Delivery may be slow or costly and goods cannot be inspected", "Correct: logistics and trust are real problems for physical goods."],
    bad: [["The shop must stay open 24 hours with staff on duty all night", "An online shop can run without staff on duty at night."], ["The firm can only reach customers who live in the same town", "Online selling can reach customers far away."], ["The firm has no way of recording what the customers look at", "Online data allow firms to record what customers view and buy."]],
    explanation: "Delivery and lack of physical inspection are the usual risks for physical goods.",
  });
  mc(b, {
    d: 3, skill: "APPLICATION",
    stem: "A fictional seed supplier in Gweru takes orders from farm shops through its website and delivers by truck. This is an example of",
    ok: ["B2B e-commerce with physical delivery", "Correct: the customers are businesses and the goods are delivered by road."],
    bad: [["C2C e-commerce with digital distribution", "The seller is a business, not a consumer, and seeds cannot be downloaded."], ["B2G e-commerce with digital distribution", "The customers are farm shops, not government, and seeds are physical."], ["B2C e-commerce with digital distribution", "The customers are shops, not consumers, and seeds are physical."]],
    hints: ["Who are the buyers, and can the product be delivered electronically?"],
    explanation: "The buyers are farm shops (B2B) and seeds need transport, so distribution is physical.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "A fictional furniture maker finds that its website has many visitors but a very low conversion rate. Which is the **most likely** explanation?",
    ok: ["The visitors are not target customers or the site is poor", "Correct: poor targeting or a weak site stops visitors becoming buyers."],
    bad: [["The firm has too many customers to deal with at one time", "A low conversion rate means few visitors buy, not too many."], ["The firm's website has no cost of operation at all each month", "Cost of operation does not explain why visitors do not buy."], ["The visitors have all already bought from the firm before", "Repeat buyers would raise conversion, not lower it."]],
    hints: ["Think about who visits and how easy it is to order."],
    explanation: "A low conversion rate suggests wrong audience, high price, poor site design or lack of trust.",
  });
  mc(b, {
    d: 3, skill: "ANALYSIS",
    stem: "Why can heavy reliance on social media promotion be a **risk** for a small business?",
    ok: ["Complaints spread fast in public and the page needs care", "Correct: negative comments are visible to all and replies take staff time."],
    bad: [["Social media can never be used to target particular customers", "Targeting is one of its main benefits."], ["Social media messages cannot be measured in any way at all", "They can usually be measured."], ["The cost per customer reached is always higher than television", "Social media is usually cheaper per customer than television."]],
    hints: ["Think about who can see what customers write."],
    explanation: "Public complaints and the time needed for replies are real risks; the other statements are untrue.",
  });
  mc(b, {
    d: 4, skill: "EVALUATION",
    stem: "Which is the **best-supported judgement** on whether a rural craft business with poor internet access should rely mainly on online sales?",
    ok: ["Not mainly, unless customers can order and pay reliably and delivery is affordable", "Correct: the judgement depends on named conditions in the case."],
    bad: [["Yes, because every business always benefits from selling online, whatever its customers", "The claim is general and ignores the limited access in the case."], ["No, because online sales never increase the demand for any product", "Online sales can raise demand when access is good."], ["Yes, because online selling needs no investment in systems or delivery", "A website, security and delivery all need investment."]],
    hints: ["A good judgement uses the conditions in the case."],
    explanation: "A reasoned answer weighs reach against poor access, delivery cost and trust.",
  });

  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In the B2G e-commerce model, a business sells to a government body.",
    answer: true,
    explanation: "True. B2G stands for business to government, for example supplying a ministry through an online tender.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A website with a very high number of visitors must have a high conversion rate.",
    answer: false,
    explanation: "False. Conversion rate is the percentage of visitors who buy. Many visitors with few orders gives a low conversion rate.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each e-commerce model to the example.",
    pairs: [["B2C", "A bakery sells cakes to individual customers on its website"], ["B2B", "A wholesaler takes online orders from small shops"], ["B2G", "A firm supplies a school board after an online tender"], ["C2C", "A person sells a used bicycle on an online notice board"]],
    explanation: "The model depends on who sells and who buys.",
  });

  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct word for each gap.",
    template: "Selling a downloadable training course is an example of {{blank:a}} distribution, whereas delivering a parcel of baskets by courier is {{blank:b}} distribution.",
    blanks: [
      { id: "a", accepted: ["digital"], choices: ["digital", "physical", "retail"] },
      { id: "b", accepted: ["physical"], choices: ["digital", "physical", "wholesale"] },
    ],
    explanation: "Digital goods are delivered electronically; physical goods must be transported.",
  });

  b.short({
    d: 2, skill: "RECALL",
    stem: "State **one** digital method a business can use to promote its products.",
    accepted: ["website", "social media", "email", "email marketing", "search marketing", "search engine marketing", "mobile marketing", "text messages", "influencers", "influencer marketing", "online advertising", "mobile messages"],
    explanation: "Websites, social media, search, email, mobile messages and influencers are digital promotion methods.",
  });

  {
    const v = 8000, o = 240;
    const c = (o / v) * 100;
    chk(c, 3, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION", daily: true,
      stem: `A fictional furniture website had ${v.toLocaleString("en-GB")} visitors in a month and received ${o} orders. Calculate the conversion rate as a percentage to one decimal place.`,
      kind: "pct", value: c, wrong: [(v / o) * 100, (o / (v + o)) * 100],
      explanation: "Conversion rate = 240 ÷ 8,000 × 100 = 3.0%. Turning the fraction upside down gives 3,333.3%.",
    });
  }
  {
    const spend = 1260, orders = 420;
    const c = spend / orders;
    chk(c, 3, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional online shop spent ${money(spend)} on social media adverts in a month and received ${orders} orders from them. Calculate the advertising cost for each order.`,
      kind: "money", value: c, wrong: [orders / spend, spend - orders],
      explanation: "Cost per order = 1,260 ÷ 420 = US\\$3.00. Dividing orders by cost gives 0.33 orders per dollar.",
    });
  }
  {
    const online = 18000, total = 72000;
    const s = (online / total) * 100;
    chk(s, 25, 1e-9);
    b.num({
      d: 2, skill: "APPLICATION",
      stem: `A fictional bookshop in Bulawayo had yearly sales of ${money(total)}, of which ${money(online)} were made online. What percentage of sales were online? Give your answer to one decimal place.`,
      kind: "pct", value: s, wrong: [(online / (total - online)) * 100, (total / online) * 100],
      explanation: "Online share = 18,000 ÷ 72,000 × 100 = 25.0%. Dividing by the shop sales (54,000) gives 33.3%.",
    });
  }
  {
    const orders = 150, profit = 9.5, spend = 1050;
    const net = orders * profit - spend;
    chk(net, 375);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: true,
      stem: `A fictional online shop earns a profit of ${money(profit)} on each order before the cost of advertising. An advertising campaign costing ${money(spend)} brings ${orders} orders. Calculate the net gain from the campaign.`,
      kind: "money", value: net, wrong: [orders * profit, spend / orders],
      hints: ["Find the profit on all the orders and subtract the cost of the campaign."],
      workedSolution: "1. Profit on the orders before advertising = 150 × 9.50 = US\\$1,425.\n2. Less the cost of the campaign US\\$1,050.\n3. Net gain = US\\$375.",
      explanation: "The orders earn US\\$1,425 before advertising, so the net gain is 1,425 − 1,050 = US\\$375. Forgetting the cost gives US\\$1,425.",
    });
  }

  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain **one** benefit to a small firm of selling its products online.",
    points: ["It can reach customers outside its town or country", "It can sell at any time and at a lower cost than opening more shops"],
    modelAnswer: "A small firm can reach customers far outside its own town. It can also sell at any time of day at a lower cost than opening more shops.",
    explanation: "One mark for the benefit and one for the development.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 4,
    stem: "Thandeka sells baskets online to customers in other countries. Explain **two** problems she may face.",
    points: ["Delivery may be slow or costly for a bulky item", "Application: baskets need protective packing and international courier fees reduce her profit", "Customers cannot see the product, so the item may look different from the photograph", "Application: returns or complaints cost money and may damage her reputation online"],
    modelAnswer: "Delivery of bulky baskets is slow and costly, and courier fees reduce her profit. Customers cannot see the basket before buying, so it may look different from the photograph, which leads to returns and complaints that can damage her reputation online.",
    hints: ["Think about delivery and about customers not seeing the product."],
    explanation: "Two problems, each developed with baskets.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    stem: "Analyse how the collection of customer data online can benefit a business, and one risk this creates.",
    points: ["The firm can see what customers view and buy", "It can use the data to target offers and improve products", "Risk: the data must be protected from theft or misuse", "A data breach would lose customers' trust and could cost the firm money"],
    modelAnswer: "The firm can see what customers view and buy, which lets it target offers and improve products. But the data must be kept secure; if they are stolen or misused customers lose trust, and the firm may lose sales and face costs.",
    hints: ["One benefit chain and one risk chain."],
    explanation: "A benefit chain and a risk chain, each with an effect.",
  });

  {
    const ch = [["Email", 300, 6000, 150], ["Mobile messages", 450, 5000, 100]];
    const conv = ch.map(([, , v, o]) => (o / v) * 100);
    const cpo = ch.map(([, s, , o]) => s / o);
    chk(conv[0], 2.5, 1e-9); chk(cpo[0], 2, 1e-9); chk(cpo[1], 4.5, 1e-9);
    const tbl = table(["Channel", "Spend (US\\$)", "Visitors", "Orders"], ch, ["l", "r", "r", "r"]);
    b.struct({
      d: 3, skill: "ANALYSIS", examStyle: true,
      stem: `A fictional bakery in Masvingo promotes its cakes by email and by mobile messages. The results for one month are shown.\n\n${tbl}`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the conversion rate for email, as a percentage to one decimal place.", kind: "pct", value: conv[0], wrong: [(6000 / 150) * 100, cpo[0]], explanation: "150 ÷ 6,000 × 100 = 2.5%. Mobile messages convert 100 ÷ 5,000 × 100 = 2.0%." }),
        P.mcq({ label: "(b)", marks: 1, stem: "Which channel has the lower cost per order?", options: [["Email", "Correct: US\\$2.00 an order compared with US\\$4.50."], ["Mobile messages", "Cost per order is US\\$4.50, the higher."], ["They are equal", "The costs per order differ."], ["It cannot be calculated", "Spend divided by orders gives the cost."]], answer: "A", explanation: "Email: 300 ÷ 150 = US\\$2.00. Mobile: 450 ÷ 100 = US\\$4.50." }),
        P.manual({ label: "(c)", marks: 3, stem: "Explain why the bakery's choice of channel should not depend only on cost per order.", points: ["A channel may reach a different type of customer, such as new customers", "Application: mobile messages may reach people who are not on the email list", "Repeat sales and the average order value also matter"], modelAnswer: "A cheaper channel may reach only customers who already buy, whereas mobile messages might reach new customers who are not on the email list. The size of each order and whether customers return also affect profit, not only the cost of getting an order.", hints: ["Think about who is reached and about what each order is worth."], explanation: "Reach, application, and order value." }),
        P.manual({ label: "(d)", marks: 3, stem: "Assess whether the bakery should stop using mobile messages.", points: ["They cost more per order (US\\$4.50 against US\\$2.00)", "They still bring 100 orders, which are extra sales", "Judgement with a condition, for example: stop only if the profit per order is below US\\$4.50"], modelAnswer: "Mobile messages cost US\\$4.50 an order, more than email, but they still bring 100 orders. The bakery should stop them only if the profit on an order is less than US\\$4.50; otherwise they add to profit.", hints: ["Compare the cost per order with the profit on an order."], explanation: "Cost, benefit and a conditional judgement." }),
      ],
      hints: ["Use orders divided by visitors, and spend divided by orders."],
      explanation: "Email converts 2.5% at US\\$2.00 an order; mobile messages convert 2.0% at US\\$4.50. The decision depends on profit per order.",
    });
  }
  {
    const total = 1500, online = 360;
    const s = (online / total) * 100;
    chk(s, 24, 1e-9);
    b.struct({
      d: 5, skill: "EVALUATION", examStyle: true,
      stem: `Nhamo Seeds is a fictional supplier in Chinhoyi that sells seed and fertiliser to farm shops. Last year it received ${total.toLocaleString("en-GB")} orders, of which ${online} were placed through its website and the rest by telephone and visits. Many farm shops are in areas with weak mobile signal and power cuts, and the owner is considering a new system that would take all orders online and arrange delivery by courier. The system would cost ${money(18000)} to set up. Some customers have said they prefer to speak to a salesperson about the right seed.`,
      parts: [
        P.num({ label: "(a)", marks: 2, stem: "Calculate the percentage of last year's orders placed online.", kind: "pct", value: s, wrong: [(online / (total - online)) * 100, (total / online) * 100], explanation: "360 ÷ 1,500 × 100 = 24.0%. Dividing by the other orders (1,140) gives 31.6%." }),
        P.manual({ label: "(b)", marks: 4, stem: "Analyse **one** risk to Nhamo Seeds of moving all orders online.", points: ["Customers in areas with weak signal and power cuts may not be able to order", "Orders and sales may be lost to rival suppliers who still take telephone orders", "Customers who want advice from a salesperson may be lost", "Lower sales would make it harder to repay the cost of the system"], modelAnswer: "Many farm shops have a weak signal and power cuts, so they may be unable to order online and would switch to rival suppliers who still take telephone orders. Lost sales would make it harder for Nhamo Seeds to recover the cost of the new system.", hints: ["Use the weak signal and customers' wish for advice."], explanation: "A chain from the case to lost sales and cost recovery." }),
        P.manual({ label: "(c)", marks: 8, stem: "Evaluate whether Nhamo Seeds should take all its orders online.", points: ["For: lower cost of taking orders and less staff time on telephones", "For: records of orders and customer data help planning", "For: orders can be placed at any time, helping busy farmers", "Against: only 24% of orders are online now, so many customers may not be ready", "Against: weak signal and power cuts limit access; the set-up cost is US\\$18,000", "Against: customers want advice from a salesperson", ["Alternative, for example: keep telephone orders and encourage online orders gradually", 1], ["Judgement with a reason or condition", 1]], levels: [[1, 1, 3, "General points on online selling with little use of the case."], [2, 4, 6, "Reasons for and against applied to the case and its figures."], [3, 7, 8, "Balanced evaluation of the case, with an alternative, a justified judgement and a condition."]], modelAnswer: "Online ordering would lower the cost of taking orders and give useful records, and farmers could order at any time. However, only 24% of orders are online now, many customers have a weak signal and power cuts, some want to speak to a salesperson, and the system costs US\\$18,000. Nhamo Seeds should not force all orders online. It should keep telephone orders and encourage the online system gradually, moving fully online only if the share of online orders grows and signal improves.", hints: ["Use the 24% and the access problems in your answer."], explanation: "Both sides applied to the case, an alternative, and a judgement with a condition." }),
      ],
      hints: ["Divide online orders by total orders."],
      explanation: "24% of orders are online. The case against a full move includes weak signal, customer preference for advice and the set-up cost.",
    });
  }

  b.card("DEFINITION", "E-commerce", "The buying and selling of goods and services over electronic networks, especially the internet.");
  b.card("DEFINITION", "E-business", "All business activities done using electronic networks, including ordering from suppliers and customer service, not only selling.");
  b.card("CONCEPT", "E-commerce models", "B2C: business to consumer. B2B: business to business. B2G: business to government. C2C: consumer to consumer.");
  b.card("CONCEPT", "Digital promotion methods", "Websites, social media, search marketing, email and mobile messages, and influencers. Most can be targeted and measured.");
  b.card("FORMULA", "Conversion rate", "Conversion rate (%) = orders ÷ visitors × 100.");
  b.card("FORMULA", "Cost per order", "Cost per order = promotion cost ÷ number of orders.");
  b.card("FACT", "Benefits of online trading", "Wider reach, open all hours, lower costs, customer data, easy to measure promotion.");
  b.card("FACT", "Risks of online trading", "Security and fraud, delivery cost and delay, customer trust, returns, unequal access to internet and power.");
  b.card("CONCEPT", "Digital and physical distribution", "Digital goods are delivered electronically at once. Physical goods still need warehouses, transport and delivery.");
});
