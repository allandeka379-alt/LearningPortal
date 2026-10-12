// Slice w3a: acs.enterprise.marketing (ZIMSEC only, Form 5). Money in US dollars; calculators are allowed.
import { concept, P, chk, round, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w3a-q.mjs";

const D = "US\\$";
// Survey: 200 learners
const survey = [["Yes", 90], ["Maybe", 70], ["No", 40]];
const total = survey.reduce((a, [, c]) => a + c, 0);
chk(total, 200);
const surveyMd = mdTable(["Answer", "Number of people"], survey);
chk((90 / 200) * 100, 45);
const survey2 = [["Yes", 100], ["Maybe", 95], ["No", 55]];
chk(survey2.reduce((a, [, c]) => a + c, 0), 250);
const survey2Md = mdTable(["Answer", "Number of people"], survey2);
chk((95 / 250) * 100, 38);
chk((55 / 250) * 100, 22);
// Pricing
const cost = 7.5;
const price = round(cost * 1.3, 2);
chk(price, 9.75);
chk(round(price - cost, 2), 2.25);
// Advert: 5000 views, 150 clicks, 12 sales, advert US$30
const views = 5000;
const clicks = 150;
const sales = 12;
const ad = 30;
chk((clicks / views) * 100, 3);
chk((sales / clicks) * 100, 8);
chk(ad / sales, 2.5);
const revenue = round(sales * price, 2);
chk(revenue, 117);
const profit = round(revenue - sales * cost - ad, 2);
chk(profit, -3);
// Selling price from a target: cost 40 and a mark-up of 25%
chk(40 * 1.25, 50);

concept("acs.enterprise.marketing", { file: "enterprise/marketing", keyPrefix: "enterprise.marketing" }, (b) => {
  mc(b, 1, "RECALL", "What are the 4Ps of the marketing mix?",
    ["Product, price, place and promotion", "Correct."],
    [["People, profit, planning and payment", "These are not the 4Ps."], ["Program, password, printer and power", "These are not the 4Ps."], ["Plan, produce, protect and pay", "These are not the 4Ps."]],
    "The 4Ps are product, price, place and promotion.");
  mc(b, 2, "APPLICATION", "A software firm offers a free one-month trial to schools and advertises at a head teachers' meeting. Which P do these actions mainly belong to?",
    ["Promotion", "Correct: they make customers aware of the product."],
    [["Product design", "The product itself is unchanged."], ["Price", "A trial does not change the price list."], ["Place", "Place is about where and how customers obtain the product."]],
    "Advertising and trials are promotion.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is market research?",
    ["Collecting and analysing information about customers, competitors and the market", "Correct."],
    [["Selling products at a market stall", "That is trading, not research."], ["Printing posters for a product", "That is a promotion activity."], ["Copying a competitor's product and its price exactly in order to sell more to the same customers", "Research is about information."]],
    "Research supports decisions with information.", { daily: true });
  mc(b, 2, "APPLICATION", "A shop adds a mark-up of 20% to the cost of an item. Which pricing method is this?",
    ["Cost-plus pricing", "Correct."],
    [["Copying the competitor's price", "The method here depends on the shop's own cost."], ["Pricing by customer demand only", "The method here depends on cost."], ["Free pricing", "A mark-up is added, so the price is not free."]],
    "Price = cost + mark-up.", { daily: true });
  mc(b, 3, "ANALYSIS", "A questionnaire is given only to learners at one small school. Why might the results mislead a business that plans to sell nationally?",
    ["The sample may not represent all the customers", "Correct."],
    [["Questionnaires cannot be used for research", "They are a standard method."], ["Questionnaires always give the same answers", "Answers vary between samples."], ["A questionnaire must be answered by a single person", "Many people can answer it."]],
    "A sample should represent the market.", { hints: ["Who is missing from the sample?"] });
  mc(b, 3, "UNDERSTANDING", "What does the conversion rate of an online advert measure?",
    ["The share of the people who clicked that went on to buy", "Correct: sales ÷ clicks × 100."],
    [["How many times the advert was shown to the people online", "That is the number of views."], ["The cost of each click", "That is cost per click."], ["The size of the advert's picture", "Picture size is not a conversion measure."]],
    "Conversion rate = sales ÷ clicks × 100.", { hints: ["Which two numbers does it compare?"] });
  mc(b, 3, "APPLICATION", "An innovator in Harare has invented a new device and wants to share the design with a possible partner. Which step best safeguards the idea?",
    ["Sign a confidentiality agreement with the partner before sharing details", "Correct."],
    [["Publish the full design on a public web site first so that people can see it", "Anyone could copy it."], ["Tell everyone the idea at a public meeting", "This gives up secrecy."], ["Wait to see if a competitor builds it", "This leaves the idea unprotected."]],
    "Confidentiality agreements protect ideas that are shared.", { hints: ["How can the partner be bound to keep it secret?"] });
  mc(b, 4, "EVALUATION", "A small firm spends all its marketing money on social media posts but its product is hard to find and costs more than similar products. Which comment is the best evaluation?",
    ["The mix is unbalanced: promotion cannot make up for poor place and price, so all four Ps need attention", "Correct."],
    [["Promotion alone decides success, so the product, price and place do not matter at all", "The four Ps work together."], ["Social media cannot be used for marketing", "Social media is a valid channel."], ["Because the product is new, it needs no price", "A price is part of the mix."]],
    "The mix must fit together.", { hints: ["Which of the Ps are weak?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A survey in which many people say they would buy a product guarantees that they will buy it.", answer: false, explanation: "False. Stated intentions are a guide, but people may not buy when the time comes." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each P to an example for a school software supplier.",
    pairs: [["Product", "Software that records attendance and works on one computer"], ["Price", "A yearly licence fee per school"], ["Place", "Direct sales by visiting schools and payment by mobile money"], ["Promotion", "A demonstration at the district meeting and a free trial"]],
    explanation: "Each P answers a different question." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences.", hints: ["Think about names and measures."],
    template: "The name, logo and reputation that make a product recognisable is its {{blank:a}}. A price found by adding a percentage to the cost is {{blank:b}} pricing. Sales divided by clicks, as a percentage, is the {{blank:c}} rate.",
    blanks: [
      { id: "a", accepted: ["brand"], choices: ["brand", "budget", "survey", "licence"] },
      { id: "b", accepted: ["cost-plus"], choices: ["cost-plus", "free", "random", "auction"] },
      { id: "c", accepted: ["conversion"], choices: ["conversion", "download", "response time", "growth"] },
    ], explanation: "Brand, cost-plus, conversion." });
  b.short({ d: 2, skill: "RECALL", stem: "Name the research method in which many people answer the same set of written questions.",
    accepted: ["questionnaire", "a questionnaire", "survey", "questionnaires"], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["observation"], explanation: "A questionnaire." });
  b.num({ d: 2, skill: "APPLICATION", unit: "%", hints: ["Yes answers ÷ total × 100."],
    stem: `${total} learners were asked whether they would buy a revision app. 90 said yes, 70 said maybe and 40 said no. Calculate the percentage who said yes.`,
    value: 45, wrong: [90, 55], workedSolution: "1. 90 ÷ 200 = 0.45.\n2. 0.45 × 100 = 45%.", explanation: "90 ÷ 200 × 100 = 45%." });
  b.num({ d: 3, skill: "APPLICATION", unit: "US$", hints: ["Mark-up = cost × percentage; price = cost + mark-up."],
    stem: `An item costs ${D}${cost.toFixed(2)} to make. The owner adds a mark-up of 30%. Calculate the selling price, in US dollars.`,
    value: price, wrong: [cost * 0.3, cost + 30], workedSolution: `1. Mark-up = ${cost} × 30 ÷ 100 = ${D}${round(cost * 0.3, 2)}.\n2. Price = ${cost} + ${round(cost * 0.3, 2)} = ${D}${price}.`, explanation: `${cost} × 1.30 = ${price}.` });
  b.num({ d: 3, skill: "APPLICATION", unit: "%", hints: ["Click-through rate = clicks ÷ times shown × 100."],
    stem: `An online advert is shown 8000 times and receives 240 clicks. Calculate the click-through rate.`,
    value: 3, wrong: [240, 30], workedSolution: "1. 240 ÷ 8000 = 0.03.\n2. As a percentage = 3%.", explanation: "240 ÷ 8000 × 100 = 3%." });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Name each P and say what it means for the product."],
    stem: "Explain the 4Ps of the marketing mix for a business that sells a mobile app. [4]",
    points: ["Product: the features of the app that meet the needs of customers", "Price: how much customers pay, for example a one-off fee", "Place: where and how customers get the app, such as an app store or mobile money payment", "Promotion: how customers are told about the app, such as social media, demonstrations or word of mouth"],
    modelAnswer: "Product: the features of the app that meet customers' needs. Price: the fee customers pay, for example a one-off fee. Place: where customers get the app, such as an app store or by mobile money. Promotion: how they are told about it, such as social media, demonstrations or word of mouth.",
    explanation: "One mark for each P applied." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two methods with a strength or use for each."],
    stem: "Describe two methods of market research that a new internet cafe could use. [4]",
    points: ["Questionnaire: ask many people what services they would use and what they would pay", "It gives numbers that can be counted and compared", "Observation or interviews: watch how people use other cafes, or ask a few people for detailed views", "It shows what customers do or think in more detail"],
    modelAnswer: "A questionnaire asks many people what services they would use and what they would pay, giving numbers that can be counted. Interviews or observation show in more detail how people use other cafes or what they think.",
    explanation: "Two methods described." });
  b.manualShort({ d: 4, skill: "CREATION", marks: 6, hints: ["Objective, target market, the four Ps, budget and how success is measured."],
    stem: "A learner plans a small business that repairs phones and tablets for learners at a school in Mutare. Outline a simple marketing plan for it. [6]",
    points: ["An objective, for example to repair 40 devices in the first term", "The target market: learners and teachers at the school", "Product: the repair service and a guarantee", "Price: a fair price for each repair, perhaps with a discount for groups", "Place and promotion: a repair desk at school, mobile money payment, posters and word of mouth", "How success will be measured, for example the number of repairs, customer feedback and profit"],
    modelAnswer: "Objective: repair 40 devices in the first term. Target market: learners and teachers at the school. Product: phone and tablet repairs with a guarantee. Price: a fair price per repair with a group discount. Place and promotion: a repair desk at school with mobile money payment, posters and word of mouth. Success is measured by the number of repairs, customer feedback and profit.",
    explanation: "The parts of a simple plan." });
  b.manualShort({ d: 4, skill: "EVALUATION", marks: 4, hints: ["Compare advantages and disadvantages of digital marketing for a small business."],
    stem: "Evaluate the use of social media advertising by a small business in Zimbabwe. [4]",
    points: ["Advantage: low cost to start and can reach many people", "Advantage: results can be measured, for example clicks and sales", "Disadvantage: customers need data and a smartphone, so some are not reached", "Disadvantage: fake accounts, scams or bad comments can harm the brand; conclusion that it is useful alongside other methods"],
    modelAnswer: "Social media advertising costs little to start, reaches many people and can be measured by clicks and sales. However, customers need data and smartphones, so some are not reached, and scams or bad comments can harm the brand. It is useful alongside other methods such as posters and word of mouth.",
    explanation: "Balanced evaluation." });
  b.struct({ d: 4, skill: "ANALYSIS", examStyle: true, hints: ["Revenue = sales × price; cost of goods = sales × cost.", "Profit = revenue − cost of goods − advert cost."],
    explanation: `The campaign makes a loss of ${D}3 because the revenue is ${D}${revenue}, the goods cost ${D}${sales * cost} and the advert ${D}${ad}.`,
    stem: `A shop in Gweru sells an item for ${D}${price} that costs it ${D}${cost.toFixed(2)}. It pays ${D}${ad} for an online advert that is shown ${views} times. The advert receives ${clicks} clicks and leads to ${sales} sales.`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the conversion rate of the advert.", unit: "%", value: 8, wrong: [12, 0.24], workedSolution: `1. ${sales} ÷ ${clicks} = 0.08.\n2. = 8%.`, explanation: `${sales} ÷ ${clicks} × 100 = 8%.` }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the cost per sale of the advert, in US dollars.", unit: "US$", value: ad / sales, wrong: [ad, 0.4], workedSolution: `1. ${ad} ÷ ${sales} = ${D}${ad / sales}.`, explanation: `${ad} ÷ ${sales} = ${ad / sales}.` }),
      P.num({ label: "(c)", marks: 2, stem: "Calculate the profit or loss of the campaign, in US dollars. Give a loss as a negative number.", unit: "US$", value: profit, wrong: [revenue, 3], workedSolution: `1. Revenue = ${sales} × ${price} = ${D}${revenue}.\n2. Cost of goods = ${sales} × ${cost} = ${D}${sales * cost}.\n3. Profit = ${revenue} − ${sales * cost} − ${ad} = ${D}${profit}, a loss.`, explanation: `${revenue} − ${sales * cost} − ${ad} = ${profit}.` }),
      P.manual({ label: "(d)", marks: 2, stem: "Suggest two ways in which the shop could make the next campaign profitable.", points: ["Improve the advert or target it better so that more of the clicks become sales", "Lower the advert cost, or raise the price, or lower the cost of the item"], modelAnswer: "Target the advert better so that more clicks become sales, and lower the advert cost or raise the price or lower the cost of the item.", explanation: "Raise sales per advert or lower costs." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Relate each P to the product."],
    explanation: "Each P is applied to a laptop repair and sales shop.",
    stem: "Tatenda opens a shop in Bulawayo that sells and repairs second-hand laptops for students.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Describe two market research methods Tatenda could use before opening.", points: ["A questionnaire to students about what they would buy and what they can pay", "Visiting competing shops to compare prices and services (observation)"], modelAnswer: "A questionnaire to students about what they would buy and what they can pay, and visiting competing shops to compare prices and services.", explanation: "Two methods." }),
      P.manual({ label: "(b)", marks: 2, stem: "Explain how he could choose a selling price for a laptop that cost him US\\$150.", points: ["Add a mark-up to the cost, for example 30%, so that all costs are covered and a profit is made", "Compare with competitors' prices and what students can afford, and adjust"], modelAnswer: "Add a mark-up to the cost, for example 30%, to cover costs and make a profit, and compare with competitors' prices and what students can afford.", explanation: "Cost-plus and comparison." }),
      P.manual({ label: "(c)", marks: 2, stem: "Suggest two promotion methods for the shop.", points: ["Posters and demonstrations at colleges and schools", "A social media page or messaging group with photographs and prices"], modelAnswer: "Posters and demonstrations at colleges and schools, and a social media page or messaging group with photographs and prices.", explanation: "Traditional and digital promotion." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Percentage = number ÷ total × 100."],
    explanation: "40% said yes, 38% maybe and 22% no.",
    stem: `A questionnaire about a new learning app was answered by 250 learners.\n\n${survey2Md}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the percentage who answered maybe.", unit: "%", value: 38, wrong: [95, 40], workedSolution: "1. 95 ÷ 250 × 100 = 38%.", explanation: "38%." }),
      P.num({ label: "(b)", marks: 1, stem: "Calculate the percentage who answered no.", unit: "%", value: 22, wrong: [55, 25], workedSolution: "1. 55 ÷ 250 × 100 = 22%.", explanation: "22%." }),
      P.manual({ label: "(c)", marks: 2, stem: "The developer says: \"40% will buy, so I should expect to sell to 40% of all learners.\" Explain two weaknesses in this conclusion.", points: ["Saying yes in a survey does not mean that people will actually buy", "The learners asked may not be a representative sample of all learners"], modelAnswer: "Saying yes in a survey does not mean people will actually buy, and the learners asked may not be representative of all learners.", explanation: "Intention against action, sample." }),
    ] });
  b.card("DEFINITION", "Marketing", "Finding out what customers need and creating, pricing, distributing and promoting a product or service to satisfy them at a profit.");
  b.card("CONCEPT", "The 4Ps", "Product (what), price (how much), place (where and how obtained), promotion (how customers learn of it).");
  b.card("CONCEPT", "Market research methods", "Questionnaires, interviews, observation, focus groups and desk research; the sample should represent the customers.");
  b.card("FORMULA", "Cost-plus pricing", "Selling price = cost + (cost × mark-up %).");
  b.card("FORMULA", "Digital marketing measures", "Click-through rate = clicks ÷ views × 100; conversion rate = sales ÷ clicks × 100; cost per sale = advert cost ÷ sales.");
  b.card("DEFINITION", "Brand", "The name, logo, style and reputation that make a product recognisable and different from competitors.");
  b.card("CONCEPT", "A simple marketing plan", "Objective, target market, the 4Ps, budget, timetable and how success will be measured.");
  b.card("CONCEPT", "Safeguarding an innovation", "Copyright, patents, trademarks, confidentiality agreements and secrecy, with records of who created the work and when.");
});
