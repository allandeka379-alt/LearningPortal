// W3b exam-format items, ZIMSEC Commerce: Paper 2 Section A (7 marks) and Section B essays (20 marks).
// Mark splits of the essay parts and of the 7-mark question are ours (the syllabus does not print them).
import { concept, P, COM, money, r2 } from "../lib.mjs";

const L8 = [
  [3, 6, 8, "Well-developed description of relevant points, each applied with an example."],
  [2, 3, 5, "Some description of relevant points; limited development or examples."],
  [1, 1, 2, "Points identified or listed with little or no description."],
];
const L10 = [
  [3, 8, 10, "A range of relevant points, each explained and illustrated with examples."],
  [2, 4, 7, "Relevant points with some explanation; development uneven."],
  [1, 1, 3, "Points listed or described with little explanation."],
];
const L12 = [
  [3, 9, 12, "Balanced discussion, developed with examples, and a justified conclusion."],
  [2, 5, 8, "Some discussion, mostly one-sided or not fully developed; weak or unsupported conclusion."],
  [1, 1, 4, "Simple points with little explanation and no judgement."],
];

// 7-mark: cooking oil through the chain of distribution.
const ex = 2.4, wMu = 10, rMu = 25;
const wPrice = r2(ex * (1 + wMu / 100)); // 2.64
const rPrice = r2(wPrice * (1 + rMu / 100)); // 3.30

concept("bus.marketing.place", { file: "exam/w3b-commerce", keyPrefix: "exam.w3b-commerce", applies: COM }, (b) => {
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 480, paper: "Paper 2", calculator: true,
    concepts: ["bus.marketing.place", "bus.marketing.price"],
    stem: `A manufacturer in Harare sells 750 ml bottles of cooking oil to wholesalers for ${money(ex)} each. A wholesaler adds a mark-up of ${wMu}% and sells to small retailers in rural areas, who add a mark-up of ${rMu}% before selling to consumers.`,
    parts: [
      P.short({
        label: "(a)", marks: 1,
        stem: "State the channel of distribution described.",
        accepted: ["manufacturer wholesaler retailer consumer", "producer wholesaler retailer consumer", "manufacturer to wholesaler to retailer to consumer", "producer to wholesaler to retailer to consumer", "manufacturer wholesaler retailer consumers", "producer wholesaler retailer consumers"],
        wrong: ["manufacturer consumer"],
      }),
      P.num({
        label: "(b)", marks: 2,
        stem: "Calculate the price a consumer pays for one bottle.",
        kind: "money", value: rPrice, wrong: [r2(ex * (1 + (wMu + rMu) / 100)), wPrice],
        explanation: `Wholesale price = ${money(ex)} × 1.${wMu} = ${money(wPrice)}; retail price = ${money(wPrice)} × 1.${rMu} = ${money(rPrice)}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain **one** reason why the manufacturer uses wholesalers to reach rural consumers.",
        points: ["Reason, e.g. wholesalers break bulk / have transport and storage / reach many small scattered shops.", "Explained: the manufacturer could not afford to deliver small quantities to every rural shop itself."],
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain **one** disadvantage to consumers of this long chain of distribution.",
        points: ["Identifies: each intermediary adds a mark-up / goods take longer to arrive.", `Explained: the consumer pays ${money(rPrice)} for oil that left the factory at ${money(ex)} / higher price for rural households.`],
      }),
    ],
    hints: ["(b) Apply the wholesaler's mark-up first, then the retailer's to the wholesale price."],
    explanation: `(a) Manufacturer → wholesaler → retailer → consumer. (b) ${money(rPrice)}. (c) Wholesalers break bulk and reach scattered shops. (d) Two mark-ups raise the price.`,
    workedSolution: `1. Wholesale price = ${ex.toFixed(2)} × 1.${wMu} = ${wPrice.toFixed(2)}.\n2. Retail price = ${wPrice.toFixed(2)} × 1.${rMu} = ${money(rPrice)}.`,
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.marketing.promotion", "bus.marketing.product-life-cycle"],
    stem: "Manufacturers and retailers spend large sums on promoting their products.",
    parts: [
      P.manual({
        label: "(a)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 350 },
        stem: "Describe **four** methods of sales promotion that a retailer may use.",
        points: [
          ["Price reductions / special offers (e.g. buy one, get one free), with purpose (quick sales, clearing stock).", 2],
          ["Coupons / vouchers or loyalty cards, with purpose (repeat buying).", 2],
          ["Free samples / tasting or gifts with purchase, with purpose (encourage trial).", 2],
          ["Competitions or point-of-sale displays, with purpose (excitement / impulse buying).", 2],
        ],
        levels: L8,
        modelAnswer: "A retailer may cut prices or run **special offers**, such as \"buy two, get one free\", to raise sales quickly or clear old stock. It may issue **loyalty cards** on which customers collect points that are exchanged for goods, encouraging them to return. **Free samples and tastings**, for example of a new biscuit at the shop entrance, let customers try a product before buying it. Finally, a retailer may set up eye-catching **point-of-sale displays** near the till, so that customers buy sweets or airtime on impulse while they wait to pay.",
      }),
      P.manual({
        label: "(b)", marks: 12, type: "EXTENDED_RESPONSE", wordLimit: { max: 550 },
        stem: "Discuss how a manufacturer should change its promotion as a product passes through the stages of its life cycle.",
        points: [
          ["Introduction: informative advertising to make customers aware; free samples to encourage trial; heavy spending.", 2],
          ["Growth: persuasive advertising to build brand loyalty against new rivals; wider media.", 2],
          ["Maturity: reminder advertising; sales promotion (offers, competitions) as part of extension strategies.", 2],
          ["Decline: cut promotion spending / clearance offers, or relaunch if extended.", 2],
          ["Recognises limits: budget, competitors' actions, type of product affect the choice; cost must be covered by extra sales.", 2],
          ["Justified conclusion (e.g. promotion must match the stage, with most spent at launch and in maturity).", 2],
        ],
        levels: L12,
        modelAnswer: "At **introduction** customers do not know the product, so the manufacturer should use informative advertising, for example radio adverts explaining what a new detergent does, and free samples to encourage people to try it. Spending is high and sales are low. In **growth**, rivals appear, so persuasive advertising should build the brand and loyalty, and the product can be advertised more widely. In **maturity**, sales level off; reminder advertising keeps the brand in customers' minds, and sales promotions such as competitions or special packs can form part of an extension strategy. In **decline**, the manufacturer should reduce promotion and perhaps use clearance offers, unless it relaunches the product. However, the right promotion also depends on the budget, competitors' actions and the type of product, and every campaign must earn more extra gross profit than it costs. Overall, promotion should change with the stage of the life cycle, with heavy informative spending at launch and carefully targeted reminder and sales promotion in maturity, when most profit is earned.",
      }),
    ],
    hints: ["(a) Name each method and say what it is for.", "(b) Take each stage in turn, then judge."],
    explanation: "(a) Offers, coupons and loyalty schemes, samples and gifts, competitions and displays. (b) Inform at introduction, persuade in growth, remind and promote in maturity, reduce in decline.",
  });

  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 1500, paper: "Paper 2",
    concepts: ["bus.communication.postal-services", "bus.communication.telecommunications", "bus.communication.formal-informal-trends"],
    stem: "Postal and telecommunication services are important aids to trade.",
    parts: [
      P.manual({
        label: "(a)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Describe **five** services offered to businesses by postal and courier agents.",
        points: [
          ["Registered mail: recorded, signed for, compensation if lost (valuable items).", 2],
          ["Cash on delivery: payment collected from the buyer on delivery.", 2],
          ["Business reply service or freepost: customers reply free; business pays.", 2],
          ["Franking machine or PO Box / private bag: postage printed / secure address.", 2],
          ["Courier or express mail / poste restante / parcel post: fast door-to-door delivery / mail held for collection.", 2],
        ],
        levels: L10,
        modelAnswer: "**Registered mail** records an item at every stage; the receiver signs for it and compensation is paid if it is lost, so businesses use it for contracts and certificates. With **cash on delivery**, the agent collects payment from the buyer when goods are delivered, so a seller is sure of payment from a new customer. A **business reply service** lets customers return pre-printed cards without paying postage, which encourages replies to surveys and order forms. A **franking machine** prints postage on a firm's envelopes, saving the time of buying and sticking stamps and recording postage costs. Finally, **courier services** collect documents and parcels and deliver them door to door, often the next day, with tracking, which suits urgent tenders and spare parts.",
      }),
      P.manual({
        label: "(b)", marks: 10, type: "EXTENDED_RESPONSE", wordLimit: { max: 450 },
        stem: "Discuss whether modern telecommunications have made postal services unnecessary for businesses.",
        points: [
          ["Telecommunications (email, messaging, video calls) are faster and cheaper for messages and documents.", 2],
          ["Letters, faxes and many postal services have declined; formal letters often sent by email.", 2],
          ["But goods and parcels, including online orders, must still be delivered physically.", 2],
          ["Original signed documents; rural customers without internet rely on post offices; network and power problems.", 2],
          ["Justified conclusion: postal services have changed role rather than become unnecessary.", 2],
        ],
        levels: L10,
        modelAnswer: "Email, instant messaging and video calls have replaced many letters, memos and faxes. They are faster and cheaper, give instant feedback and, in the case of email, a written record, so most routine communication between businesses no longer uses the post. However, telecommunications cannot carry goods. As online selling grows, more parcels must be delivered by post or courier, and services such as cash on delivery support this trade. Original signed contracts and certificates still travel physically, and many customers in rural areas without reliable internet or power depend on post offices and PO Boxes. Postal services are therefore not unnecessary: they have moved from carrying letters towards delivering parcels and providing payment and rural services, while telecommunications handle most messages.",
      }),
    ],
    hints: ["(a) Name each service, then say how it helps a business.", "(b) Separate messages from goods, then judge."],
    explanation: "(a) Registered mail, COD, business reply/freepost, franking/PO Box, courier/express. (b) Telecommunications replace messages, but goods, originals and rural customers still need postal services.",
  });
});
