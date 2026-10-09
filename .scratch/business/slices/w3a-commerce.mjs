// W3a: ZIMSEC Commerce Paper 2 exam-format items: 2 × 7-mark and 1 × 6-mark Section A structured questions and
// 2 × 20-mark Section B essays. Mark splits within items are ours (the syllabus does not print them).
import { concept, P, money, fmt, round, sum, table, check, COM } from "../lib.mjs";

const L8 = [[3, 6, 8, "Well-developed explanation of several relevant points, applied with examples."], [2, 3, 5, "Some explanation of relevant points; limited examples."], [1, 1, 2, "Points listed with little or no explanation."]];
const L10 = [[3, 7, 10, "Detailed, accurate explanation of a full range of points, each developed with examples."], [2, 4, 6, "Several relevant points with some development."], [1, 1, 3, "A few points listed, little development."]];
const L12 = [[3, 9, 12, "Balanced discussion of both sides, well developed, with a justified conclusion."], [2, 5, 8, "Some discussion of both sides, or one side well developed; weak conclusion."], [1, 1, 4, "Simple points on one side, little explanation, no conclusion."]];

concept("bus.people.management-functions", { file: "exam/w3a-commerce", keyPrefix: "exam.w3a-commerce", applies: COM }, (b) => {
  // 7 marks: management functions and delegation.
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, paper: "Paper 2",
    concepts: ["bus.people.management-functions"],
    stem: "Tatenda manages a wholesale business in Masvingo. Each Monday she sets weekly sales targets, arranges which staff will work in the warehouse and which will make deliveries, and on Friday she compares actual sales with the targets. She does all the stock ordering herself and often works until late at night.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which function of management is Tatenda carrying out when she compares actual sales with the targets?",
        options: [["Controlling", "Correct: checking results against the plan."], ["Planning", "Planning set the targets."], ["Organising", "Organising arranged the staff."], ["Coordinating", "Coordinating links departments."]],
        answer: "A",
      }),
      P.fib({
        label: "(b)", marks: 2,
        stem: "Complete the sentences.",
        template: "Setting weekly sales targets is {{blank:a}}. Arranging which staff work in the warehouse and which make deliveries is {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["planning"], choices: ["planning", "organising", "controlling", "commanding"] },
          { id: "b", accepted: ["organising"], choices: ["planning", "organising", "controlling", "commanding"] },
        ],
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** advantages to Tatenda of delegating the stock ordering to an assistant.",
        points: [
          "More time for planning / controlling / other important tasks (1)",
          "Less stress / shorter working hours, so better decisions (1)",
          "Assistant motivated / develops skills (1)",
          "Faster ordering by someone close to the warehouse / prepares a deputy (1)",
        ],
        modelAnswer: "Delegating ordering would give Tatenda more time to plan and control the business, and she would no longer work so late, reducing stress. The assistant would feel trusted and develop new skills, which motivates and prepares a deputy.",
      }),
    ],
    explanation: "(a) Controlling. (b) Planning; organising. (c) Delegation frees the manager and develops the subordinate.",
    hints: ["Match each activity with a function: plan, organise, command, coordinate, control.", "Think of benefits to Tatenda and to the assistant."],
  });

  // 7 marks: segmentation and niche marketing with data.
  const seg = [["School buns", 18000], ["Wholemeal rolls", 9000], ["Standard loaves", 33000]];
  const total = sum(seg.map(([, v]) => v));
  check("total", total, 60000);
  const pctBuns = (seg[0][1] / total) * 100;
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: true, paper: "Paper 2",
    concepts: ["bus.marketing.segmentation", "bus.marketing.mass-niche"],
    stem: `Chipo's bakery in Chinhoyi sells three products, each aimed at a different group of customers. Her sales last term were:\n\n${table(["Product", "Sales US\\$"], [...seg, ["Total", total]])}`,
    parts: [
      P.num({
        label: "(a)", marks: 2, kind: "pct", value: pctBuns, type: "CALCULATION",
        stem: "Calculate the percentage of Chipo's total sales that came from school buns (to one decimal place).",
        wrong: [round((seg[0][1] / seg[2][1]) * 100, 1)],
        explanation: `${fmt(seg[0][1])} ÷ ${fmt(total)} × 100 = ${round(pctBuns, 1)}%.`,
        workedSolution: `1. Total sales = ${money(total)}.\n2. ${fmt(seg[0][1])} ÷ ${fmt(total)} × 100 = ${round(pctBuns, 1)}%.`,
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Selling school buns to pupils is segmentation by:",
        options: [["Age", "Correct: the buns are aimed at schoolchildren."], ["Gender", "Not aimed at men or women."], ["Location", "The basis is the customers' age group."], ["Religion", "Not relevant here."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** advantages to Chipo of dividing her market into segments.",
        points: [
          "Products meet each group's needs (1)",
          "So higher sales / customer loyalty (1)",
          "Promotion targeted at each group, e.g. schools (1)",
          "So less money wasted on advertising / risk spread over several groups (1)",
        ],
        modelAnswer: "Each product is designed for one group, such as buns for pupils and wholemeal rolls for health-conscious buyers, so needs are met and sales and loyalty rise. Chipo can also promote each product where its customers are, such as at schools, wasting less money on advertising.",
      }),
    ],
    explanation: `School buns were ${round(pctBuns, 1)}% of sales. Segmenting by age, lifestyle and income lets Chipo meet needs and target promotion.`,
    hints: ["Divide the product's sales by the total and multiply by 100.", "Who are school buns aimed at?"],
  });

  // 6 marks: physical and virtual markets.
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 420, paper: "Paper 2",
    concepts: ["bus.marketing.types-of-markets"],
    stem: "Sipho sells mobile-phone accessories from a stall in a Harare market. He is considering also selling through a social-media page, with buyers paying by mobile money and collecting their goods or receiving them by courier.",
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "Name the type of market in which Sipho's stall operates (physical or virtual).",
        accepted: ["physical", "physical market", "a physical market"],
        wrong: ["virtual"],
      }),
      P.mcq({
        label: "(b)", marks: 1,
        stem: "Which is an advantage to buyers of the virtual market Sipho is considering?",
        options: [["They can order at any time of day", "Correct: virtual markets are always open."], ["They can test the accessories before paying", "That is an advantage of the stall."], ["There is no risk of fraud", "Fraud is a risk online."], ["Delivery is always free", "Courier delivery has a cost."]],
        answer: "A",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Explain **two** disadvantages to Sipho of selling through the virtual market.",
        points: [
          "Customers cannot inspect goods / may return items (1)",
          "So returns and complaints cost time and money (1)",
          "Delivery costs and delays / risk of fraudulent payments / need for data and time online (1)",
          "So lower profit per sale / possible losses (1)",
        ],
        modelAnswer: "Customers cannot inspect accessories before paying, so some will return items they dislike, costing Sipho time and money. Courier costs and delays reduce his profit per sale, and he must watch for fake mobile-money payments.",
      }),
    ],
    explanation: "The stall is a physical market. Virtual markets are open all day but bring returns, delivery costs and fraud risk.",
    hints: ["Does Sipho meet his buyers face to face?", "Think about inspection, delivery and payments."],
  });

  // Essay 1 (20 marks): the role of marketing and the marketing concepts.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.marketing.role-concepts"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe the production, product, selling and marketing concepts.",
        points: [
          ["Production concept: customers want cheap, available products; focus on large, efficient, low-cost output", 2],
          ["Product concept: customers want the best quality and features; focus on improving the product", 2],
          ["Selling concept: customers must be persuaded; focus on advertising and sales techniques to sell what is made", 2],
          ["Marketing concept: find out customers' needs first, then produce to satisfy them better than rivals", 2],
        ],
        levels: L8,
        modelAnswer: "Under the production concept a business believes customers want products that are cheap and easy to obtain, so it concentrates on producing large quantities efficiently at low cost; this works when demand is greater than supply, as with a basic food. Under the product concept the business believes customers want the highest quality and most features, so it keeps improving the product, sometimes making it too expensive or adding features customers do not want. The selling concept assumes customers will not buy enough unless persuaded, so the business uses heavy advertising, sales staff and discounts to sell what it has already made. The marketing concept starts with the customer: the business researches what customers need and want and then designs, prices, promotes and distributes products to satisfy those needs better than competitors, aiming for loyal customers and long-term profit.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 500 },
        stem: "\"Every business, however small, needs marketing.\" Discuss.",
        points: [
          "For: identifies customer needs, so the right products are made (1)",
          "For: less unsold stock / waste (1)",
          "For: builds loyalty and repeat sales (1)",
          "For: informs customers that the business and its products exist (1)",
          "For: anticipates changes in tastes and competition (1)",
          "For: helps set prices customers accept / compete with larger firms (1)",
          "Against: small firms have little money for research and advertising (1)",
          "Against: a vendor may know customers personally / demand may exceed supply (1)",
          "Against: some products (basic necessities) sell without much promotion (1)",
          "Marketing need not be costly: simple research, word of mouth, social media (1)",
          ["Justified conclusion", 2],
        ],
        levels: L12,
        modelAnswer: "Marketing helps any business find out what customers want, so it makes the right products and is not left with unsold stock. A small tuck-shop owner who notices that customers want airtime and small packs of sugar sells more than one who stocks only what she likes. Marketing also builds loyalty through good service and relationships, makes customers aware that the business exists, and helps it notice changes in tastes or new competitors early. It guides pricing so that customers accept the price. Against this, small businesses have little money for formal research or advertising, a village vendor may already know every customer personally, and when demand is greater than supply, as with some basic goods, products sell with little effort. However, marketing does not need to be expensive: asking customers, watching rivals, offering good service and using word of mouth or social media are all marketing. In conclusion, the statement is true: every business needs marketing, but small businesses should use simple, low-cost methods suited to their size.",
      }),
    ],
    explanation: "(a) Four concepts, each with its focus. (b) Marketing identifies needs, builds loyalty and anticipates change; small firms can market cheaply; justified conclusion.",
    hints: ["(a) For each concept, say what the business believes and what it focuses on.", "(b) Arguments for, arguments against, then judge."],
  });

  // Essay 2 (20 marks): segmentation and mass/niche marketing.
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.marketing.segmentation", "bus.marketing.mass-niche"],
    stem: "Answer both parts.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Explain **five** ways in which a business may segment its market.",
        points: [
          ["Age: e.g. children, teenagers, adults, elderly, with products and promotion for each", 2],
          ["Income: e.g. small cheap packs for low-income, premium ranges for high-income", 2],
          ["Location: e.g. rural / urban, province, climate", 2],
          ["Gender: e.g. separate toiletries or clothing ranges", 2],
          ["Lifestyle / interests: e.g. health-conscious, busy workers, sports fans, anglers", 2],
        ],
        levels: L10,
        modelAnswer: "A business can segment by age, for example a cereal maker targeting children with bright packets and adults with high-fibre cereals. It can segment by income: detergent sold in small, cheap sachets for low-income buyers and large boxes or premium brands for higher-income households. It can segment by location, marketing seed and fertiliser in rural farming areas and blankets in cold highland areas. It can segment by gender, with separate ranges of toiletries and clothing for men and women. Finally, it can segment by lifestyle or interests, such as ready meals for busy office workers or fishing equipment for anglers at Kariba. In each case the business adapts the product, price, promotion and place to the group.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 400 },
        stem: "Discuss whether a small food processor in Zimbabwe should use mass marketing or niche marketing.",
        points: [
          "Mass: large volume, economies of scale (1)",
          "Mass: but strong competition from large firms and imports on price (1)",
          "Mass: high costs of advertising and wide distribution a small firm cannot afford (1)",
          "Niche: less competition; large firms often ignore small segments (1)",
          "Niche: higher prices and margins; loyal customers (1)",
          "Niche: targeted, cheap promotion suits limited capital (1)",
          "Niche: small market; higher unit costs; risk if tastes change (1)",
          "Niche: success may attract large competitors (1)",
          ["Justified conclusion", 2],
        ],
        levels: L10,
        modelAnswer: "Mass marketing offers very large sales, and producing in volume gives economies of scale. However, a small food processor would compete on price with large firms and imports that already have low costs, and it could not afford national advertising or nationwide distribution. Niche marketing would let it serve a small group with particular needs, such as customers wanting sugar-free jams or traditional grains, where large firms are less active. Such customers pay higher prices and stay loyal, and promotion through health shops and social media is cheap. The risks are that the niche is small, unit costs are higher, sales depend on one group, and if the niche becomes profitable large firms may copy the product. On balance, a small processor should choose niche marketing, building a strong brand in its niche, and consider wider markets only once it has grown.",
      }),
    ],
    explanation: "(a) Age, income, location, gender, lifestyle/interests, each with an example. (b) Mass gives scale but fierce competition; niche suits a small firm's resources; justified conclusion.",
    hints: ["(a) Name the basis, give the groups and an example.", "(b) Consider the firm's size and the competition."],
  });
});
