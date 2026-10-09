// Slice w3b: intellectual capital, business ethics and marketing (comp.techno.capital-ethics-marketing, ZIMSEC only).
import { concept, P } from "../lib.mjs";

concept("comp.techno.capital-ethics-marketing", { file: "techno/capital-ethics-marketing", keyPrefix: "techno.capital-ethics-marketing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **human capital** in a business?",
    options: [
      ["The knowledge, skills and experience of the people who work there", "Correct: it belongs to the people."],
      ["The money the owners have invested in the business", "That is financial capital."],
      ["The computers and buildings the business owns", "These are physical assets."],
      ["The business's relationships with customers and suppliers", "That is social capital."],
    ],
    answer: "A",
    explanation: "Human capital is the knowledge, skills, experience and creativity of a business's people.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A software company's documented code library and its registered trademark are examples of:",
    options: [
      ["Organisational capital", "Correct: knowledge kept by the business itself."],
      ["Human capital", "Human capital is held by individual people."],
      ["Social capital", "Social capital is relationships and networks."],
      ["Financial capital", "These are not money."],
    ],
    answer: "A",
    explanation: "Organisational (structural) capital is the knowledge that stays in the business: code, procedures, patents, trademarks, brand.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bank regularly recommends a small web-design firm to its business customers. This is an example of the firm's:",
    options: [
      ["Social capital", "Correct: the value of its relationships and networks."],
      ["Human capital", "This is not a skill of the firm's staff."],
      ["Organisational capital", "This is not knowledge stored inside the firm."],
      ["Physical capital", "No equipment is involved."],
    ],
    answer: "A",
    explanation: "Referrals, partnerships and reputation are social (relational) capital.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which action shows the business ethics attribute of **honesty**?",
    options: [
      ["Advertising the real price, including all charges", "Correct: no hidden costs or misleading claims."],
      ["Selling customers' email addresses to advertisers", "This breaks trust and privacy."],
      ["Installing pirated software to save money", "This is illegal and dishonest."],
      ["Claiming a phone repair took longer than it did", "This is dishonest."],
    ],
    answer: "A",
    explanation: "Honest businesses are truthful in their adverts and prices.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which of the 4 Ps answers 'how will customers get it?'"],
    stem: "A Bulawayo technopreneur decides to sell her learning app through an app store and through agents at schools. Which element of the marketing mix is this?",
    options: [
      ["Place", "Correct: how the product reaches customers."],
      ["Price", "Price is how much is charged."],
      ["Promotion", "Promotion is how customers find out about it."],
      ["Product", "Product is what is being sold."],
    ],
    answer: "A",
    explanation: "Place (distribution) is how customers obtain the product.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    hints: ["What happens to human capital when a person leaves?"],
    stem: "Why should a small ICT firm turn its programmers' knowledge into documented procedures and commented code?",
    options: [
      ["So the knowledge stays in the business if a programmer leaves", "Correct: human capital becomes organisational capital."],
      ["So the programmers can be paid lower wages", "Documentation is about keeping knowledge."],
      ["So the firm no longer needs any customers", "Customers are still needed."],
      ["So that the code can never be changed again by anyone in the future", "Documentation makes code easier to change."],
    ],
    answer: "A",
    explanation: "Documenting knowledge converts human capital, which can walk out of the door, into organisational capital the firm keeps.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Who is selling to whom?"],
    stem: "A wholesaler in Harare lets shops across the country order stock through its website. Which type of e-commerce is this?",
    options: [
      ["Business-to-business (B2B)", "Correct: one business sells to other businesses."],
      ["Business-to-consumer (B2C)", "The buyers are shops, not individual consumers."],
      ["Consumer-to-consumer (C2C)", "No private individuals are selling."],
      ["Consumer-to-business (C2B)", "The business is selling, not buying."],
    ],
    answer: "A",
    explanation: "When businesses trade with other businesses online, it is B2B e-commerce.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    hints: ["Which disadvantage applies most in a rural area?"],
    stem: "A craft co-operative near Masvingo plans to sell baskets online. Which is the **most** important challenge for it to plan for?",
    options: [
      ["Reliable delivery and internet access in a rural area", "Correct: without these, orders cannot be received or delivered."],
      ["Opening a large shop in the city centre", "E-commerce reduces the need for a physical shop."],
      ["Being able to open only during office hours", "Online shops can take orders 24 hours a day."],
      ["Customers being unable to see any product information", "Photos and descriptions can be shown online."],
    ],
    answer: "A",
    explanation: "For a rural seller, connectivity and delivery are the biggest practical barriers to e-commerce.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "When a skilled programmer leaves a company, some of the company's human capital leaves with her.",
    answer: true,
    explanation: "True. Human capital is held by people; only knowledge that has been documented or built into the business stays.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Under Unhu/Ubuntu values, a business only has to think about its own profit.",
    answer: false,
    explanation: "False. Unhu/Ubuntu teaches that a business is part of a community and must treat customers, staff and society with respect and care.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each of the 4 Ps to its meaning.",
    pairs: [
      ["Product", "What is being sold and how it is different"],
      ["Price", "How much customers are charged"],
      ["Place", "How customers obtain the product"],
      ["Promotion", "How customers find out about the product"],
    ],
    explanation: "Product: what. Price: how much. Place: where/how obtained. Promotion: how customers learn of it.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    hints: ["People, the business itself, or relationships?"],
    stem: "Classify each asset of a Gweru IT support company.",
    pairs: ["A technician's experience in repairing laptops", "The company's customer database and repair procedures", "Long-term contracts with three local schools", "Staff certificates in networking"],
    right: ["Human capital", "Organisational capital", "Social capital"],
    rightIndex: [0, 1, 2, 0],
    explanation: "Experience and certificates: human. Database and procedures: organisational. Contracts with schools: social.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["Buying and selling online."],
    stem: "Complete the sentences.",
    template: "Buying and selling over the internet is called e-{{blank:a}}. A written plan that describes a business, its market and its finances, used to persuade lenders, is a business {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["commerce"], choices: ["commerce", "mail", "learning", "banking"] },
      { id: "b", accepted: ["plan"], choices: ["plan", "licence", "patent", "report"] },
    ],
    explanation: "E-commerce; business plan.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["Define each form with an example."],
    stem: "Describe human, organisational and social capital, giving an example of each for a mobile app company.",
    points: [
      "Human: skills/knowledge of staff (e.g. developers' coding skills)",
      "Organisational: knowledge kept in the business (e.g. code library, procedures, trademark)",
      "Social: relationships/networks (e.g. loyal clients, partnership with a mobile network)",
    ],
    explanation: "Each form of intellectual capital is a different source of non-physical value.",
    modelAnswer: "Human capital is the skill of the company's developers in writing Android apps. Organisational capital is its reusable code library and documented testing procedures. Social capital is its partnership with a mobile network that promotes its apps.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    hints: ["Effects on customers, reputation and the law."],
    stem: "A phone repair shop secretly copies photos from customers' phones. Explain how this breaks business ethics and the likely consequences for the shop.",
    points: [
      "Breaks respect for privacy / honesty / Unhu/Ubuntu values",
      "Loss of customers' trust / damaged reputation (social capital)",
      "Legal consequences: breach of data protection / cyber laws, fines or prosecution",
      "Loss of business / closure / bad publicity on social media",
    ],
    explanation: "Unethical conduct damages trust and can be illegal.",
    modelAnswer: "Copying customers' photos is dishonest and shows no respect for their privacy, against Unhu/Ubuntu values. If discovered, customers would stop trusting the shop and spread the story on social media, destroying its reputation. The owner could also be prosecuted under the Cyber and Data Protection Act, and the business could close.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, marks: 6,
    hints: ["Use the 4 Ps.", "Who sells to whom?"],
    stem: "Farai and Chipo plan *FarmLink* (fictional), an app that lets small farmers near Chinhoyi sell vegetables directly to households in Harare.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each decision to the element of the marketing mix.",
        pairs: ["Charging farmers 5% of each sale", "Advertising through farmers' WhatsApp groups", "Offering the app on phone app stores"],
        right: ["Price", "Promotion", "Place", "Product"],
        rightIndex: [0, 1, 2],
        explanation: "Commission: price. WhatsApp adverts: promotion. App stores: place.",
      }),
      P.mcq({
        label: "(b)", stem: "Which type of e-commerce is *FarmLink*, where individual farmers sell to households?",
        options: [["Consumer-to-consumer (C2C) marketplace", "Correct: individuals trade with individuals through the platform."], ["Business-to-business (B2B)", "No business is buying stock from another."], ["Government-to-citizen (G2C)", "No government service is involved."], ["Business-to-government (B2G)", "No government buyer."]],
        answer: "A", explanation: "A platform where individuals sell to individuals is C2C.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain **two** ways *FarmLink* can show Unhu/Ubuntu business ethics.",
        points: ["An ethical action (e.g. fair, transparent commission / paying farmers promptly)", "A second action (e.g. protecting users' data / honest descriptions of produce / supporting the community)"],
        modelAnswer: "It can charge a fair commission that is clearly stated to farmers, and pay them promptly, and it can protect buyers' phone numbers and addresses instead of selling them.",
      }),
    ],
    explanation: "(a) Price, promotion, place. (b) C2C.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, marks: 5,
    hints: ["Which sections persuade a lender?"],
    stem: "Thandeka wants a bank loan to start a computer-repair business in Gweru. The bank asks for a business plan.",
    parts: [
      P.tf({ label: "(a)", stem: "A business plan should include market research and an analysis of competitors.", answer: true, explanation: "True: it shows there is demand and how the business will compete." }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **four** other sections Thandeka's business plan should contain and why the bank needs them.",
        points: ["Description of the business and its services", "Marketing plan (4 Ps: prices, location, promotion)", "Financial plan: start-up costs, expected sales and profit, loan needed and how it will be repaid", "Management/staffing or operations plan (equipment, premises, suppliers)"],
        modelAnswer: "It should describe the repair services she will offer, set out a marketing plan with her prices and how she will advertise, give a financial plan showing start-up costs, expected income and how the loan will be repaid, and describe her premises, equipment and staff. The bank needs these to judge whether the business can repay the loan.",
      }),
    ],
    explanation: "(a) True.",
  });

  b.card("DEFINITION", "Technopreneurship", "Starting and running a business built around technology, taking risks to create new products or services for profit.");
  b.card("DEFINITION", "Intellectual capital", "The non-physical value of a business from its knowledge, systems and relationships.");
  b.card("CONCEPT", "Human capital", "Knowledge, skills, experience and creativity of the people; leaves when they leave.");
  b.card("CONCEPT", "Organisational capital", "Knowledge kept in the business: code, databases, procedures, patents, trademarks, brand, culture.");
  b.card("CONCEPT", "Social capital", "Value of relationships: loyal customers, suppliers, partners, investors, reputation and goodwill.");
  b.card("CONCEPT", "Business ethics (Unhu/Ubuntu)", "Honesty, respect, fairness, accountability, legality, care for community and environment, transparency.");
  b.card("CONCEPT", "Marketing mix (4 Ps)", "Product (what), Price (how much), Place (how obtained), Promotion (how customers learn of it).");
  b.card("CONCEPT", "E-commerce types", "B2C: business to consumers. B2B: business to business. C2C: consumers to consumers via a marketplace.");
  b.card("CONCEPT", "Business plan sections", "Executive summary; business description; market research; marketing plan; operations; management; financial plan.");
});
