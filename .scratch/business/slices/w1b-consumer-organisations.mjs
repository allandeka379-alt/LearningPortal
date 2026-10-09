// W1b: consumer protection organisations (CCZ, SAZ and others).
import { concept, P } from "../lib.mjs";

concept("bus.consumer.organisations", { file: "consumer/organisations", keyPrefix: "consumer.organisations" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which body develops standards for products and certifies goods that meet them?",
    options: [
      ["The Standards Association of Zimbabwe", "Correct: SAZ develops standards, tests products and awards a standards mark."],
      ["The Consumer Council of Zimbabwe", "The consumer council educates consumers and handles complaints; standards are SAZ's work."],
      ["The Zimbabwe Stock Exchange", "The stock exchange is a market for shares."],
      ["The National Social Security Authority", "NSSA provides social security for workers."],
    ],
    answer: "A",
    explanation: "The **Standards Association of Zimbabwe (SAZ)** develops standards, tests products in laboratories and certifies those that meet a standard.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A consumer council publishes the prices of basic goods in different shops each month. How does this help consumers?",
    options: [
      ["They can compare prices and avoid overcharging", "Correct: price surveys show where goods are cheapest and expose overpricing."],
      ["Shops must then sell at the published prices", "A survey informs; it does not set legal prices."],
      ["It guarantees that goods are safe", "Price surveys say nothing about safety."],
      ["It removes the need to keep receipts", "Receipts are still needed as proof of purchase."],
    ],
    answer: "A",
    explanation: "Price monitoring informs consumers and puts pressure on shops that overcharge.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a standards mark on a product tell a consumer?",
    options: [
      ["The product has been tested against an agreed standard", "Correct: the mark shows certification by the standards body."],
      ["The product is the cheapest of its kind", "A standards mark is about quality and safety, not price."],
      ["The product was made by a government factory", "Private firms' products carry the mark if they meet the standard."],
      ["The product can never become faulty", "No mark guarantees that a product will never fail."],
    ],
    answer: "A",
    explanation: "A **mark of conformity** shows that the product (or its production process) has been tested and meets a published standard.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A shop refuses to repair a radio that broke within its guarantee period. Where should the buyer take her complaint if the shop still refuses?",
    options: [
      ["The consumer council", "Correct: it handles consumer complaints and negotiates with businesses."],
      ["The Standards Association", "The standards body sets and certifies standards; it does not handle shop complaints."],
      ["The radio manufacturer's shareholders", "Shareholders do not handle customer complaints."],
      ["The Reserve Bank", "The central bank deals with money and banking, not consumer complaints."],
    ],
    answer: "A",
    explanation: "After trying the seller, a consumer takes the complaint, with evidence, to the national consumer protection body.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is a limitation of consumer protection bodies in Zimbabwe?",
    options: [
      ["Many rural consumers do not know about them or cannot reach their offices", "Correct: low awareness and urban offices limit their reach."],
      ["They are not allowed to give consumers any advice or information", "Advice and education are among their main roles."],
      ["They exist to help businesses win more customers, not consumers", "Their purpose is to protect consumers."],
      ["They handle complaints only about imported goods", "They deal with local and imported goods alike."],
    ],
    answer: "A",
    hints: ["Think about who can actually use them."],
    explanation: "Limits include low awareness, offices mainly in towns, limited funds and staff, limited power to enforce, and informal traders who are hard to trace.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Local authority health inspectors protect consumers mainly by:",
    options: [
      ["checking that food premises are clean and food is fit to eat", "Correct: they inspect restaurants, butcheries and food shops."],
      ["setting national standards for building materials", "That is the work of the standards body."],
      ["publishing monthly price surveys of basic goods", "That is a consumer council activity."],
      ["insuring consumers against faulty goods", "Inspectors do not provide insurance."],
    ],
    answer: "A",
    hints: ["What do health inspectors inspect?"],
    explanation: "Local authority health inspectors check hygiene in food premises and can close places that endanger health.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why might a consumer council **lobby** the government?",
    options: [
      ["To press for stronger consumer protection laws", "Correct: lobbying aims to influence laws and policies in consumers' interests."],
      ["To obtain a licence to sell goods", "Consumer councils do not sell goods."],
      ["To borrow money for a business", "A consumer council is not seeking business loans."],
      ["To set the prices that every shop must charge", "Councils monitor prices; they do not fix them."],
    ],
    answer: "A",
    hints: ["Lobbying means trying to influence decision-makers."],
    explanation: "Consumer councils represent consumers to government and lobby for new or stronger laws and better enforcement.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Consumer protection bodies educate consumers about their rights and responsibilities.",
    answer: true,
    explanation: "True. Education through radio, newspapers, social media, workshops and school clubs is a main role.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A consumer with a faulty product should go to the consumer council before contacting the seller.",
    answer: false,
    explanation: "False. The consumer should first return to the seller with the receipt and explain the problem. The council helps if the seller refuses.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each body with one of its roles.",
    pairs: [
      ["Consumer council", "Handles complaints and negotiates with traders"],
      ["Standards Association of Zimbabwe", "Tests products and awards a standards mark"],
      ["Local authority health inspectors", "Inspect food premises for hygiene"],
      ["The courts", "Decide legal cases and punish offenders"],
    ],
    explanation: "Each body protects consumers in its own way: complaints and education, standards, hygiene inspection, and enforcement of the law.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "The letters SAZ stand for the Standards {{blank:a}} of Zimbabwe.",
    blanks: [{ id: "a", accepted: ["Association"], wrong: "Authority" }],
    explanation: "SAZ is the **Standards Association of Zimbabwe**.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for an agreed set of requirements that a product must meet, for example for safety or quality.",
    accepted: ["standard", "a standard", "product standard"],
    wrong: ["guarantee", "warranty"],
    explanation: "A **standard** sets out agreed requirements for a product, service or process.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** roles of the Consumer Council of Zimbabwe.",
    points: [
      "Handles complaints from consumers.",
      "Investigates and negotiates with the business for a refund, repair or replacement.",
      "Educates consumers / monitors prices / represents consumers to government / warns about dangerous products.",
      "Explains how the second role protects consumers.",
    ],
    hints: ["Name the role, then say how it protects consumers."],
    modelAnswer: "It handles complaints: it investigates and negotiates with the trader so the consumer gets a refund or replacement. It educates consumers about their rights through the media, so they are less easily cheated.",
    explanation: "One mark for each role and one for explaining how it helps consumers.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Describe the steps a consumer should take to get help from a consumer protection body after buying faulty goods.",
    points: [
      "Return to the seller first with the goods and receipt.",
      "Gather evidence: receipt, guarantee, photographs, dates and names.",
      "Contact the body (visit, phone, email) and complete a complaint form.",
      "Follow up while the body investigates / negotiates / refers the case.",
    ],
    hints: ["Start with the seller."],
    modelAnswer: "First return the goods to the seller with the receipt. If refused, gather evidence such as the receipt, guarantee and photographs and note dates and names. Then contact the consumer protection body and fill in a complaint form, and follow up while it investigates.",
    explanation: "Steps in order earn the marks: seller, evidence, contact the body, follow up.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Sipho runs a small factory in Bulawayo making electric kettles. A large retailer will stock his kettles only if they carry the standards mark of the Standards Association of Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "State **three** roles of the Standards Association of Zimbabwe.",
        points: ["Develops standards for products and services.", "Tests products in its laboratories.", "Certifies products (standards mark) / certifies management systems / trains and advises businesses."],
        modelAnswer: "It develops standards, tests products and certifies those that meet a standard with its mark.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** benefits to **consumers** of buying kettles with the standards mark.",
        points: [
          "Tested for electrical safety.",
          "So less risk of shocks or fire in the home.",
          "Meets quality requirements.",
          "So kettles last longer and give value for money / easier choice between brands.",
        ],
        modelAnswer: "The kettles have been tested for electrical safety, so there is less risk of shocks or fires. They also meet quality requirements, so they are likely to last and give value for money.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Discuss whether it is worth Sipho's while to have his kettles certified.",
        points: [
          "Benefit: access to the large retailer and more sales.",
          "Benefit: consumer confidence / reputation / possible exports.",
          "Cost: testing and certification fees.",
          "Cost: may need to improve materials or processes, raising costs and prices.",
          "Weighs costs against the extra sales and reputation.",
          "Justified conclusion.",
        ],
        modelAnswer: "Certification would let Sipho sell through the large retailer, greatly increasing his sales, and the mark would build consumer confidence and his reputation, perhaps helping him export. However, he must pay testing and certification fees and may have to improve materials or production, raising his costs and prices. Because the retailer will not stock uncertified kettles and safety matters so much for electrical goods, the extra sales and reputation are likely to outweigh the costs, so certification is worth it.",
      }),
    ],
    hints: ["(c) Weigh the cost of certification against the sales it opens up."],
    explanation: "SAZ develops standards, tests and certifies. Certification reassures consumers about safety and quality and opens markets, at a cost to the producer.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 840,
    stem: "A consumer council receives many complaints each month about short measures at market stalls and faulty electrical goods sold by informal traders.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** ways in which the consumer council could reduce these problems.",
        points: [
          "Consumer education campaigns (radio, social media, markets).",
          "So consumers check weights and buy tested goods, and know where to complain.",
          "Work with local authorities / inspectors / police to check scales and seize unsafe goods.",
          "So offenders are caught and others are deterred; or publish warnings about dangerous products.",
        ],
        modelAnswer: "It could run education campaigns at markets and on radio, teaching consumers to check weights and look for standards marks. It could also work with local authority inspectors and the police to check scales and seize unsafe goods, so offenders are caught and others deterred.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss the difficulties the council faces in protecting customers of informal traders.",
        points: [
          "Informal traders have no fixed premises and are hard to trace.",
          "Often no receipts, so little evidence for complaints.",
          "Limited staff and funds to inspect many markets.",
          "Council may advise and negotiate but cannot always enforce.",
          "Consumers may not know about the council / offices far away.",
          "Conclusion on how far the council can succeed (e.g. partly, with education and cooperation).",
        ],
        modelAnswer: "Informal traders often have no fixed premises, so they are hard to trace after a sale, and they rarely give receipts, so consumers have little evidence. The council has limited staff and funds to visit many markets, and it can advise and negotiate but cannot always force a trader to pay. Many customers do not know about the council or cannot reach its offices. The council can therefore only partly protect these consumers; education and cooperation with local authorities are its best tools.",
      }),
    ],
    hints: ["(b) Think about evidence, tracing traders and resources."],
    explanation: "Consumer bodies combine education, complaints handling and cooperation with enforcement authorities, but face limits with informal trade.",
  });
  b.card("DEFINITION", "What is a **consumer protection body**?", "An organisation that protects and promotes consumers' interests: education, complaints, monitoring and influencing laws.");
  b.card("FACT", "Five roles of a national consumer council?", "Educating consumers, handling complaints, price and quality monitoring, research and testing, representing consumers, lobbying, warning the public (any five).");
  b.card("FACT", "Roles of the Standards Association of Zimbabwe?", "Develops standards, tests products, certifies them with a standards mark, certifies management systems, trains businesses.");
  b.card("DEFINITION", "What is a **standard**?", "An agreed set of requirements a product, service or process must meet (safety, quality, size, composition).");
  b.card("CONCEPT", "What does a standards mark tell consumers?", "The product has been tested and meets a published standard.");
  b.card("FACT", "Other bodies that protect consumers?", "Local authority inspectors, regulators and ministries, police and courts, trade associations, the media.");
  b.card("CONCEPT", "First step when goods are faulty?", "Return to the seller with the goods and receipt; go to a protection body only if the seller refuses.");
  b.card("FACT", "Limitations of consumer protection bodies?", "Low awareness, urban offices, limited funds and staff, limited enforcement power, informal traders hard to trace.");
});
