// W3a: the role of marketing and the marketing concepts.
import { concept, P, COM } from "../lib.mjs";

concept("bus.marketing.role-concepts", { file: "marketing/role-concepts", keyPrefix: "marketing.role-concepts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes marketing?",
    options: [
      ["Identifying and satisfying customer needs profitably", "Correct: marketing starts and ends with the customer."],
      ["Advertising products on radio and television", "Advertising is only one part of marketing."],
      ["Producing goods as cheaply as possible", "That is the production concept."],
      ["Recording sales and costs in the accounts", "That is a finance task."],
    ],
    answer: "A",
    explanation: "**Marketing** is the process of identifying, anticipating and satisfying customers' needs profitably.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which marketing concept focuses on producing large quantities at low cost?",
    options: [
      ["Production concept", "Correct: efficiency and low cost are the focus."],
      ["Product concept", "The product concept focuses on quality and features."],
      ["Selling concept", "The selling concept focuses on persuasion."],
      ["Marketing concept", "The marketing concept focuses on customer needs."],
    ],
    answer: "A",
    explanation: "The **production concept** assumes customers want cheap, widely available products.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A shoe factory asks customers which styles and sizes they want before deciding what to make. Which concept is it following?",
    options: [
      ["Marketing concept", "Correct: customer needs come first."],
      ["Production concept", "It is not just making cheap shoes in bulk."],
      ["Selling concept", "It is not pushing stock already made."],
      ["Product concept", "It is not just making the shoe it thinks is best."],
    ],
    answer: "A",
    explanation: "Researching customer needs before producing is the **marketing concept** (market orientation).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is a role of marketing?",
    options: [
      ["Building customer loyalty", "Correct: keeping customers coming back is a key role."],
      ["Paying employees' wages", "That is a finance and human resources task."],
      ["Calculating the depreciation of machines", "That is an accounting task."],
      ["Recruiting new machine operators", "That is a human resources task."],
    ],
    answer: "A",
    explanation: "Marketing identifies and satisfies needs, builds loyalty and relationships and anticipates change.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A furniture maker has a large stock of unsold beds and hires door-to-door sales staff with large discounts to clear them. Which concept is this?",
    options: [
      ["Selling concept", "Correct: pushing products already made."],
      ["Marketing concept", "Customer needs were not researched first."],
      ["Product concept", "The focus is on persuasion, not product quality."],
      ["Production concept", "The focus is not on low-cost mass output."],
    ],
    answer: "A",
    explanation: "The **selling concept** relies on persuasion to sell what has already been produced.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is the marketing concept more suitable than the production concept in a highly competitive market?",
    options: [
      ["Customers can easily switch to rivals who meet their needs better", "Correct: competition gives customers choice."],
      ["Customers will buy anything that is available", "That is only true when demand exceeds supply."],
      ["Production costs do not matter in competitive markets", "Costs always matter."],
      ["Competitive markets have no customer loyalty to win", "Loyalty matters more when there is choice."],
    ],
    answer: "A",
    hints: ["What can customers do when there are many sellers?"],
    explanation: "With many rivals, the business that best satisfies customer needs keeps its customers.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A mobile-phone shop notices that customers increasingly pay by mobile money and starts accepting it before its rivals. Which role of marketing is shown?",
    options: [
      ["Anticipating changes in customer needs", "Correct: it spotted a trend early."],
      ["Reducing production costs", "No cost reduction is described."],
      ["Using the selling concept", "No pressure selling is described."],
      ["Increasing the price of its products", "Price is not mentioned."],
    ],
    answer: "A",
    hints: ["The shop acted before its rivals did."],
    explanation: "Spotting trends and adapting early is **anticipating change**, which keeps the business ahead.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: COM,
    stem: "Which marketing concept would lead a business to keep adding features to its product without asking customers what they want?",
    options: [
      ["Product concept", "Correct: focus on the product as the business sees it."],
      ["Marketing concept", "The marketing concept starts by asking customers."],
      ["Selling concept", "The selling concept is about persuasion."],
      ["Production concept", "The production concept is about low-cost volume."],
    ],
    answer: "A",
    explanation: "The **product concept** assumes customers want the best product, with the most features.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Marketing is the same thing as advertising.",
    answer: false,
    explanation: "False. Advertising is one form of promotion; marketing also includes research, product, price and place.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Keeping existing customers loyal is usually cheaper than finding new customers.",
    answer: true,
    explanation: "True. Loyal customers make repeat purchases and recommend the business without extra promotion costs.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each concept with its main focus.",
    pairs: [
      ["Production concept", "Large output at low cost"],
      ["Product concept", "Highest quality and most features"],
      ["Selling concept", "Persuading customers to buy"],
      ["Marketing concept", "Finding and satisfying customer needs"],
    ],
    explanation: "Each concept puts something different at the centre: output, product, persuasion or the customer.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "A business that finds out what customers want before it makes a product is {{blank:a}} orientated. A business that makes what it is good at and then looks for customers is {{blank:b}} orientated.",
    blanks: [
      { id: "a", accepted: ["market"], choices: ["market", "product", "production"] },
      { id: "b", accepted: ["product"], choices: ["market", "product", "production"] },
    ],
    explanation: "Market orientation starts with customers; product orientation starts with the product.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the term for customers continuing to buy from the same business instead of switching to competitors.",
    accepted: ["customer loyalty", "brand loyalty", "loyalty"],
    wrong: ["market share"],
    explanation: "**Customer loyalty** brings repeat sales.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** roles of marketing for a small restaurant.",
    points: [
      "Identify customer needs, e.g. research the meals and prices customers want.",
      "So the menu sells / less waste.",
      "Build loyalty / relationships, e.g. loyalty card, friendly service, social media.",
      "So customers return and recommend the restaurant / higher revenue.",
    ],
    hints: ["Think about finding out what customers want and keeping them."],
    modelAnswer: "Marketing helps the restaurant find out which meals and prices customers want, so its menu sells well and food is not wasted. It also builds loyalty, for example with a loyalty card and messages about specials, so customers return and recommend it to friends.",
    explanation: "Identify and satisfy needs, keep loyalty, build relationships, anticipate change.",
  });
  b.manualShort({
    d: 4, marks: 6, skill: "EVALUATION", applies: COM,
    stem: "A maize-meal mill has always followed the production concept. Discuss whether it should change to the marketing concept.",
    points: [
      "Production concept: low cost, cheap product; works when demand exceeds supply.",
      "Maize meal is a basic product; price is important to customers.",
      "Marketing concept: research needs (pack sizes, fortified meal, brands).",
      "Benefits: loyalty, competitive advantage, less unsold stock.",
      "Costs: research, product changes; may raise costs and prices.",
      "Justified conclusion (e.g. keep low costs but listen to customers on pack sizes).",
    ],
    hints: ["Is price still the most important thing for maize-meal buyers?"],
    modelAnswer: "The production concept keeps the mill's costs and prices low, which matters because maize meal is a basic food bought by price-sensitive customers. However, competition among mills means customers can switch, and the marketing concept would show whether they want smaller packs, fortified meal or better availability in rural shops. Meeting these needs builds loyalty and reduces unsold stock. Research and new pack sizes cost money, which could raise prices. The mill should adopt the marketing concept while still controlling costs: find out what customers want, but keep efficiency so prices stay competitive.",
    explanation: "Weigh low cost against customer satisfaction in a competitive market.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Sipho makes leather school shoes in Bulawayo. He believes his shoes are the best quality in the city and keeps adding features, such as double stitching and padded insoles, which raise his price. Sales are falling. A rival sells cheaper shoes in the sizes and styles that schools require and gives a discount card to returning parents.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which concept is Sipho following?",
        options: [["Product concept", "Correct: he focuses on the product's quality and features."], ["Marketing concept", "He has not researched what parents want."], ["Selling concept", "He is not using pressure selling."], ["Production concept", "He is not focusing on cheap mass output."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 3,
        stem: "Explain how the rival is using marketing to build customer loyalty.",
        points: ["Discount card for returning parents.", "Gives a reason to buy again from the same shop.", "Meets needs (school styles, sizes, low price), so parents are satisfied and return."],
        modelAnswer: "The rival gives returning parents a discount card, so they have a reason to come back. It also sells the styles and sizes schools require at lower prices, so parents are satisfied and return each year.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Recommend whether Sipho should adopt the marketing concept. Justify your answer.",
        points: [
          "Falling sales show customers' needs are not met.",
          "Parents want school-approved styles, sizes and affordable prices.",
          "Research with parents and schools would show what to make.",
          "His quality is a strength; a durable shoe at a lower price could be a selling point.",
          "Costs of research / dropping features; risk of losing quality image.",
          "Justified recommendation.",
        ],
        modelAnswer: "Sipho's falling sales show that parents do not value extra features enough to pay his higher prices. Parents want shoes in school-approved styles and sizes at affordable prices, which his rival offers. If Sipho researched parents' and schools' needs, he could drop costly features, keep the durable leather that is his strength and price the shoes competitively, perhaps with his own loyalty offer. Research costs time and money, but continuing to lose sales is more costly. He should adopt the marketing concept.",
      }),
    ],
    hints: ["(a) What does Sipho focus on?", "(c) Use the falling sales and the rival's success."],
    explanation: "The product concept can fail when customers want something else; the marketing concept starts from customer needs.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Tendai and Rudo have set up a small business in Gweru making washing powder. They have spent most of their capital on equipment and plan to sell the powder in large 5 kg bags because that is cheapest to produce. They have not spoken to any shops or customers. Rudo says, \"If we produce cheaply, it will sell.\" Tendai wants to spend some money on market research first.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Identify the marketing concept Rudo is following and give **one** piece of evidence from the case.",
        points: ["Production concept.", "Evidence: large 5 kg bags because cheapest to produce / \"if we produce cheaply, it will sell\" / no contact with customers."],
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** risks of Rudo's approach.",
        points: [
          "Customers may want smaller, affordable packs.",
          "So the 5 kg bags may not sell / unsold stock.",
          "Shops may not stock an unknown brand without promotion.",
          "Cash tied up; with little capital left, the business may fail.",
        ],
        modelAnswer: "Many customers may only afford small packets, so the 5 kg bags may not sell, leaving unsold stock. Shops may also refuse to stock an unknown brand, and with most of their capital already spent, Tendai and Rudo could run out of cash.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Tendai is right to spend money on market research before production starts.",
        points: [
          "Research shows pack sizes, prices, where customers buy.",
          "Reduces risk of unsold stock and wasted capital.",
          "Builds relationships with shops / retailers.",
          "Cost of research when capital is low; delay to production.",
          "Cheap methods possible (asking shops, a simple survey at markets).",
          "Justified conclusion.",
        ],
        modelAnswer: "Research would show which pack sizes and prices customers want and which shops would stock the powder, reducing the risk that their limited capital is tied up in bags that do not sell. Talking to shopkeepers also starts relationships with retailers. Research costs money and delays production, and their capital is low. However, they can use cheap methods, such as asking shopkeepers and surveying shoppers at markets. Tendai is right: a small amount spent on research now is much less than the cost of producing the wrong product.",
      }),
    ],
    hints: ["(a) What does Rudo think makes the powder sell?", "(c) Can research be done cheaply?"],
    explanation: "Producing cheaply without knowing customer needs is risky; simple research reduces that risk.",
  });
  b.card("DEFINITION", "What is **marketing**?", "The process of identifying, anticipating and satisfying customers' needs profitably.");
  b.card("FACT", "Five roles of marketing?", "Identify needs, satisfy needs, maintain loyalty, build relationships, anticipate changes in needs.");
  b.card("CONCEPT", "Production concept?", "Belief that customers want cheap, available products: focus on large, low-cost output.");
  b.card("CONCEPT", "Product concept?", "Belief that customers want the best quality and features: focus on improving the product.");
  b.card("CONCEPT", "Selling concept?", "Belief that customers must be persuaded: focus on advertising and sales techniques.");
  b.card("CONCEPT", "Marketing concept?", "Find out what customers want first, then satisfy those needs better than competitors.");
  b.card("CONCEPT", "Market or product orientation?", "Market orientated: research customers first. Product orientated: make the product, then find customers.");
  b.card("CONCEPT", "Why follow the marketing concept today?", "Strong competition, informed customers, fast-changing tastes, value of loyal customers.");
});
