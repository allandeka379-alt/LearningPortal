// W1b: consumer rights, responsibilities and the need for protection.
import { concept, P } from "../lib.mjs";

concept("bus.consumer.rights", { file: "consumer/rights", keyPrefix: "consumer.rights" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who is a consumer?",
    options: [
      ["A person who buys goods or services for his or her own use", "Correct: a consumer uses what he or she buys rather than reselling it."],
      ["A trader who buys goods to resell at a profit", "A trader buying stock to resell is not acting as a consumer of that stock."],
      ["A manufacturer who turns raw materials into finished goods for sale", "A manufacturer is a producer."],
      ["A government official who inspects shops", "An inspector enforces consumer laws; that is not what makes someone a consumer."],
    ],
    answer: "A",
    explanation: "A **consumer** buys or uses goods and services to satisfy his or her own wants, not to resell them.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A vendor sells bags labelled \"2 kg\" that contain only 1.7 kg of rice. How is the consumer being exploited?",
    options: [
      ["Short measure", "Correct: the consumer receives less than the quantity paid for."],
      ["Counterfeiting", "Counterfeiting means making fake copies of branded goods."],
      ["Unsafe goods", "Nothing in the stem suggests the rice is dangerous."],
      ["Unfair credit terms", "The rice is not sold on credit."],
    ],
    answer: "A",
    explanation: "Selling less than the stated weight is a **short measure** (short weight). Weights and measures laws and inspectors exist to stop it.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A phone charger bought at a market overheats and melts on its first use. Which consumer right has been broken?",
    options: [
      ["The right to safety", "Correct: consumers are entitled to goods that are not dangerous to health or life."],
      ["The right to choose", "The problem is danger, not a lack of variety."],
      ["The right to be heard", "This right concerns consumers' views in decision-making."],
      ["The right to a healthy environment", "The fault is in the product itself, which is a safety issue."],
    ],
    answer: "A",
    explanation: "A product that overheats and melts endangers life and property: the **right to safety** has been broken. The consumer also has the **right to redress** (a refund or safe replacement).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do consumers need protection when buying electrical goods?",
    options: [
      ["They usually cannot test quality or safety before buying", "Correct: the seller knows far more about the product than the buyer does."],
      ["Electrical goods are always more expensive than other goods", "Price alone is not the reason; the problem is unequal knowledge about quality and safety."],
      ["Sellers are never allowed to give guarantees", "Sellers can and often do give guarantees."],
      ["Consumers cannot legally return any goods", "Consumers can return faulty goods."],
    ],
    answer: "A",
    explanation: "**Unequal knowledge** is a key reason for protection: consumers cannot check the wiring or safety of a product in a shop, so they rely on honest descriptions and standards.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an example of responsible consumer behaviour?",
    options: [
      ["Keeping the receipt and guarantee card after buying a radio", "Correct: they are proof of purchase if a claim or complaint is needed."],
      ["Buying the first product seen without comparing prices", "Responsible consumers compare prices and quality."],
      ["Ignoring the expiry date on a packet of biscuits", "Responsible consumers check date marks."],
      ["Signing a credit agreement without reading it", "Contracts should be read and understood before signing."],
    ],
    answer: "A",
    explanation: "Responsible consumers check goods, compare prices, read labels and contracts, keep receipts and complain through the proper channels.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A shop advertises \"Half price!\" on blankets that were never sold at the higher price. Which right is most directly affected?",
    options: [
      ["The right to be informed", "Correct: consumers are given false information about the price."],
      ["The right to safety", "The blankets are not dangerous."],
      ["The right to basic needs", "The issue is misleading information, not access to essentials."],
      ["The right to consumer education", "The issue is a false claim by the seller, not a lack of education."],
    ],
    answer: "A",
    hints: ["What is false in the advertisement?"],
    explanation: "A false \"was\" price misleads consumers about the bargain they are getting: the **right to be informed** (accurate information) is broken.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "How does consumer protection benefit **honest** businesses?",
    options: [
      ["Dishonest rivals cannot win customers by cheating", "Correct: protection stops unfair competition and builds trust in the market."],
      ["Honest businesses pay no taxes", "Consumer protection has nothing to do with tax exemptions."],
      ["Honest businesses can charge any price they wish", "Protection does not remove competition or price rules."],
      ["Honest businesses no longer need to give receipts", "Receipts remain important."],
    ],
    answer: "A",
    hints: ["Think about competition between honest and dishonest sellers."],
    explanation: "When short measures, false claims and unsafe goods are stopped, honest firms are not undercut by cheats, and consumers buy with more confidence.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Consumer rights include the right to redress, which means a fair settlement of genuine complaints.",
    answer: true,
    explanation: "True. Redress may be a repair, a replacement, a refund or compensation.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A tuck-shop owner buying crates of drinks to resell is acting as a consumer of those drinks.",
    answer: false,
    explanation: "False. Buying stock to resell is trading. A consumer buys for his or her own use.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each situation with the way the consumer is being exploited.",
    pairs: [
      ["\"Pure honey\" that is mixed with sugar syrup", "False description"],
      ["Tins of fish sold after their use-by date", "Expired goods"],
      ["Fake branded batteries that leak", "Counterfeit goods"],
      ["Prices doubled overnight during a shortage", "Overpricing"],
    ],
    explanation: "False descriptions, expired goods, counterfeits and overpricing are all forms of consumer exploitation.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "The right to be {{blank:a}} means consumers should get accurate information about goods. The right to {{blank:b}} means consumers may get a refund, repair or replacement for faulty goods.",
    blanks: [
      { id: "a", accepted: ["informed"], choices: ["informed", "heard", "safe", "educated"] },
      { id: "b", accepted: ["redress"], choices: ["redress", "choose", "safety", "basic needs"] },
    ],
    explanation: "The right to be **informed** concerns accurate information; the right to **redress** concerns fair settlement of complaints.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the consumer right that protects people from goods that are dangerous to health or life.",
    accepted: ["right to safety", "the right to safety", "safety", "right to be safe"],
    wrong: ["right to choose", "right to be heard"],
    explanation: "The **right to safety**.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** reasons why consumers need protection.",
    points: [
      "Unequal knowledge between sellers and consumers.",
      "Explains: consumers cannot test quality, contents or safety, so they rely on what sellers say.",
      "Persuasive or misleading advertising / unequal bargaining power / unsafe goods / vulnerable consumers.",
      "Explains the second reason, e.g. adverts persuade people to buy goods they do not need or that do not work.",
    ],
    hints: ["Who knows more about the product, the seller or the buyer?"],
    modelAnswer: "Sellers know far more about their goods than consumers, who cannot test the safety or contents of products such as medicines or electrical goods, so they depend on honest descriptions. Advertising can also mislead, persuading people to buy goods that do not work as claimed.",
    explanation: "One mark for each reason and one for explaining it.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Describe **four** things a responsible consumer should do before buying a second-hand refrigerator.",
    points: [
      "Inspect the fridge and test that it works / cools.",
      "Compare prices and condition at several sellers.",
      "Ask for a receipt and any guarantee and keep them.",
      "Read and understand any agreement before signing / check the seller is reputable / ask about its age and energy use.",
    ],
    hints: ["Think about checking, comparing and keeping proof."],
    modelAnswer: "Test the fridge to make sure it cools properly, compare its price and condition with fridges at other sellers, ask for a receipt and a written guarantee and keep them, and read any agreement fully before signing.",
    explanation: "Responsible behaviour before buying: check, compare, read, get proof of purchase, buy from reputable sellers.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Nyasha bought a pair of school shoes for her son from a shop in Mutare. The box said \"genuine leather\". After three weeks the soles came off and she saw that the uppers were plastic. The shop refused to help, pointing to a sign: \"No refunds, no exchanges\".",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which form of exploitation is shown by the label \"genuine leather\"?",
        options: [["False description", "Correct: the goods are not what the label claims."], ["Short measure", "Short measure concerns quantity, not material."], ["Overpricing", "Nothing is said about the price being unfair."], ["Unsafe or dangerous goods", "Plastic uppers are not dangerous."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Identify **two** consumer rights that have been broken. Explain how each was broken.",
        points: [
          "Right to be informed.",
          "The label gave false information about the material.",
          "Right to redress.",
          "The shop refused a refund, repair or replacement for faulty goods.",
        ],
        modelAnswer: "The right to be informed was broken because the box falsely said the shoes were genuine leather. The right to redress was broken because the shop refused to refund or replace shoes that fell apart after three weeks.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Explain what Nyasha should do next, and discuss how likely she is to get a fair outcome.",
        points: [
          "Keep the shoes, box, receipt and evidence (photographs).",
          "Return to the shop / write to the manager or owner calmly, stating the fault and the remedy wanted.",
          "Take the complaint to a consumer protection body if refused.",
          "The sign does not remove her right to redress for faulty, falsely described goods.",
          "Limitation: she may not have a receipt / time and travel costs / body may only negotiate.",
          "Reasoned judgement on likely outcome.",
        ],
        modelAnswer: "Nyasha should keep the shoes, the box with its label and her receipt, and take photographs. She should ask to see the manager or write to the owner, explaining the fault and asking for a refund or replacement. If the shop still refuses, she should take her evidence to a consumer protection body, which can contact the shop. A \"no refunds\" sign does not remove her right to redress when goods are faulty and falsely described, so with a receipt and the labelled box she has a good chance of a fair outcome. Without a receipt it will be harder, and the process may cost her time and travel.",
      }),
    ],
    hints: ["(b) One right about information, one about complaints.", "(c) Evidence first, then the seller, then a protection body."],
    explanation: "(a) False description. (b) Right to be informed; right to redress. (c) Gather evidence, complain to the seller, then a consumer protection body; her evidence decides how likely redress is.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "A newspaper article says: \"Consumers in rural areas are exploited more often than consumers in towns.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** reasons why rural consumers may be more easily exploited.",
        points: [
          "Few shops / little competition.",
          "So sellers can overcharge or sell poor goods without losing customers.",
          "Far from consumer protection offices and inspectors / less information.",
          "So unfair practices are less likely to be reported or punished.",
        ],
        modelAnswer: "Rural areas often have only one or two shops, so sellers face little competition and can overcharge or sell poor-quality goods. Consumer protection offices and inspectors are mostly in towns, so cheating is less likely to be reported or punished.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss whether consumers themselves, rather than the government, should be mainly responsible for protecting their interests.",
        points: [
          "Consumers can check goods, compare prices, read labels and keep receipts.",
          "Self-protection is cheap and immediate.",
          "But consumers lack knowledge to test safety (medicines, electrical goods).",
          "Only government can pass and enforce laws, set standards and punish offenders.",
          "Vulnerable consumers (children, elderly, those who cannot read) cannot fully protect themselves.",
          "Justified conclusion (both needed; government provides the framework, consumers act responsibly).",
        ],
        modelAnswer: "Consumers can do a great deal to protect themselves: checking weights and dates, comparing prices, reading labels and keeping receipts costs little and works at once. However, ordinary consumers cannot test the safety of medicines or electrical wiring, and vulnerable people such as children and those who cannot read are easily misled. Only government can make laws, set standards, inspect scales and punish offenders. So responsibility should be shared: government should provide and enforce the rules, while consumers act responsibly within them.",
      }),
    ],
    hints: ["(b) What can consumers do alone, and what needs the law?"],
    explanation: "Rural consumers face less competition and fewer enforcement services. Protection needs both responsible consumers and government laws and enforcement.",
  });
  b.card("DEFINITION", "Who is a **consumer**?", "A person who buys or uses goods and services for his or her own use, not to resell.");
  b.card("DEFINITION", "What is **consumer protection**?", "Measures by government, organisations and consumers to stop consumers being cheated, harmed or treated unfairly.");
  b.card("FACT", "Five ways consumers are exploited?", "Short measures, false descriptions, unsafe goods, expired goods, overpricing, misleading adverts, counterfeits, unfair credit (any five).");
  b.card("FACT", "Name six consumer rights.", "Safety, information, choice, being heard, redress, consumer education, basic needs, healthy environment (any six).");
  b.card("DEFINITION", "Right to **redress**?", "The right to a fair settlement of genuine complaints: repair, replacement, refund or compensation.");
  b.card("CONCEPT", "Why do consumers need protection?", "Unequal knowledge and power, misleading advertising, unsafe goods, vulnerable consumers, complex contracts.");
  b.card("FACT", "Four responsibilities of a consumer?", "Check goods and dates; compare prices; read labels and contracts; keep receipts; complain properly; report offences (any four).");
  b.card("CONCEPT", "How does consumer protection help honest businesses?", "It stops dishonest rivals cheating customers and builds trust, so consumers buy with confidence.");
});
