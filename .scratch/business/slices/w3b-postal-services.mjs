// W3b: postal and courier services (ZIMSEC Commerce).
import { concept, P, money, r2 } from "../lib.mjs";

// Franking: postage for a mailing.
const letters = 450, rate = 0.35;
const postage = r2(letters * rate); // 157.50
// Courier vs post comparison.
const parcels = 24, courier = 8.5, post = 3.25;
const extraCost = r2(parcels * (courier - post)); // 126

concept("bus.communication.postal-services", { file: "communication/postal-services", keyPrefix: "communication.postal-services" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which postal service lets a business pay for its customers' replies, using reply cards it supplies?",
    options: [
      ["Business reply service", "Correct: customers post the pre-printed card free."],
      ["Poste restante", "Poste restante holds mail for collection."],
      ["Registered mail", "Registered mail records valuable items."],
      ["Cash on delivery", "Cash on delivery collects payment for goods."],
    ],
    answer: "A",
    explanation: "With **business reply service**, the business supplies pre-printed cards or envelopes and pays the postage when they are returned.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is poste restante?",
    options: [
      ["Mail held at a post office until the receiver collects it", "Correct: used by travellers."],
      ["A machine that prints the postage on a firm's envelopes", "That is a franking machine."],
      ["A service that collects payment on delivery", "That is cash on delivery."],
      ["Priority delivery of letters for an extra charge", "That is express mail."],
    ],
    answer: "A",
    explanation: "Poste restante: mail is kept at a named post office for collection, useful for people without a fixed address.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A business sells goods to a new customer it does not know and wants to be sure of payment. Which service should it use?",
    options: [
      ["Cash on delivery", "Correct: payment is collected before the goods are handed over."],
      ["Freepost", "Freepost is for customers' replies."],
      ["Poste restante", "This holds mail for collection; it does not collect payment."],
      ["A franking machine", "Franking prints postage."],
    ],
    answer: "A",
    explanation: "With cash on delivery the agent collects payment from the buyer on delivery.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why would a business send a signed contract by registered mail rather than ordinary post?",
    options: [
      ["It is recorded, signed for and compensated if lost", "Correct."],
      ["It is always cheaper than ordinary post", "Registered mail costs more."],
      ["It allows the receiver to reply free of charge", "That is business reply."],
      ["It is collected from the post office by travellers", "That is poste restante."],
    ],
    answer: "A",
    explanation: "Registered mail gives security, proof of delivery and compensation for valuable or important items.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the main advantage of a franking machine to a business that sends many letters?",
    options: [
      ["It saves buying and sticking stamps and controls postage costs", "Correct."],
      ["It delivers the letters directly to customers' doors", "Franking prints postage; delivery is still by the post."],
      ["It guarantees full compensation if any letters are lost", "That is registered mail."],
      ["It lets customers reply without paying postage", "That is business reply or freepost."],
    ],
    answer: "A",
    explanation: "A franking machine prints postage on envelopes; the business pays in advance and keeps a record of postage used.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A firm in Harare must deliver tender documents to an office in Bulawayo by tomorrow morning. Which service is most suitable?",
    options: [
      ["A courier service", "Correct: fast, door to door, tracked."],
      ["Ordinary letter post", "Too slow and not tracked."],
      ["Poste restante", "Mail would wait for collection."],
      ["Business reply service", "This is for customers' replies."],
    ],
    answer: "A",
    hints: ["Which service is fastest and delivers to the door?"],
    explanation: "Courier services suit urgent, important items between towns, despite their higher cost.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why do many businesses in rural areas use a PO Box address?",
    options: [
      ["There may be no street delivery, and a box gives a secure address", "Correct."],
      ["PO Boxes deliver parcels and letters to the door", "Mail must be collected from the box."],
      ["PO Boxes are a free service at every post office", "Boxes are usually rented."],
      ["Couriers are not allowed to deliver to any of the rural areas", "Couriers may not cover remote areas, but they are not banned."],
    ],
    answer: "A",
    hints: ["Think about where mail is delivered."],
    explanation: "A post office box gives a fixed, secure address where there is no delivery to premises.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of postal services compared with email?",
    options: [
      ["They are slower and feedback takes days", "Correct."],
      ["They cannot carry goods or parcels", "Postal services carry parcels."],
      ["They give no proof of delivery for any item", "Registered and recorded services give proof."],
      ["They do not reach rural areas at all", "The national postal service reaches many rural areas."],
    ],
    answer: "A",
    explanation: "Post is slower and gives no instant feedback; email is instant but cannot carry goods.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Courier companies usually collect and deliver items door to door.",
    answer: true,
    explanation: "True. This is one of their main advantages over ordinary post.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Recorded delivery pays full compensation if a valuable item is lost.",
    answer: false,
    explanation: "False. Recorded delivery mainly proves posting and delivery; **registered mail** gives compensation for loss.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business need with the most suitable postal service.",
    pairs: [
      ["Sending a certificate that must not be lost", "Registered mail"],
      ["Encouraging customers to return a survey form free of charge", "Business reply service"],
      ["Receiving letters while travelling between towns", "Poste restante"],
      ["Sending 500 letters without sticking stamps on each", "Franking machine"],
      ["Selling goods by post to a new customer", "Cash on delivery"],
    ],
    explanation: "Each service meets a particular business need.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "With {{blank:a}}, a customer writes to a special address without using a stamp, and the business pays the postage. With {{blank:b}} mail, items get faster priority delivery for an extra charge.",
    blanks: [
      { id: "a", accepted: ["freepost", "free post"], wrong: "poste restante" },
      { id: "b", accepted: ["express", "speed", "priority"], wrong: "ordinary" },
    ],
    explanation: "Freepost and express mail are services for businesses.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the private businesses that deliver documents and parcels quickly door to door, often with tracking.",
    accepted: ["courier companies", "couriers", "courier services", "courier", "courier service", "courier firms", "courier company"],
    wrong: ["post office"],
    explanation: "**Courier companies** offer fast, tracked, door-to-door delivery.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A firm's franking machine records ${letters} letters posted at ${money(rate)} each. Calculate the total postage.`,
    kind: "money", value: postage, wrong: [letters + rate, r2(letters * 0.53)],
    explanation: `${letters} × ${money(rate)} = ${money(postage)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `An online seller sends ${parcels} parcels a month. Courier delivery costs ${money(courier)} a parcel and parcel post costs ${money(post)}. Calculate how much more the seller pays each month by using the courier for all parcels.`,
    kind: "money", value: extraCost, wrong: [r2(courier - post), r2(parcels * courier)],
    hints: ["Find the difference per parcel, then multiply by the number of parcels."],
    explanation: `Difference per parcel = ${money(courier)} − ${money(post)} = ${money(r2(courier - post))}. × ${parcels} = ${money(extraCost)}.`,
    workedSolution: `1. Extra per parcel = ${courier.toFixed(2)} − ${post.toFixed(2)} = ${r2(courier - post).toFixed(2)}.\n2. Extra per month = ${r2(courier - post).toFixed(2)} × ${parcels} = ${money(extraCost)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** reasons why postal services are still important to businesses even though email is widely used.",
    points: [
      "Goods / parcels must be physically delivered.",
      "Online orders still need delivery to customers.",
      "Original signed documents / certificates / reaching people without internet.",
      "Explained: email cannot carry originals; some rural customers have no internet but have a PO Box.",
    ],
    hints: ["What can email not carry?"],
    modelAnswer: "Email cannot carry goods, so businesses that sell online still need parcel post or couriers to deliver orders. Original signed contracts and certificates must also be sent physically, and some customers in rural areas can only be reached through a post office box.",
    explanation: "Physical delivery, originals and reach to people without internet keep postal services important.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780, calculator: true,
    stem: "Thandeka runs a mail-order business in Bulawayo selling seeds to small-scale farmers across Zimbabwe. Farmers find her through radio adverts and order by post or by phone. Many farmers live far from towns and collect mail from post offices at rural service centres.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which service would let farmers send order forms to Thandeka without paying postage, using envelopes she supplies?",
        options: [["Business reply service", "Correct."], ["Poste restante", "This holds mail for collection."], ["Recorded delivery", "This proves delivery."], ["Express mail", "This is faster delivery for a fee."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why the national postal service may suit Thandeka better than a courier company for most deliveries.",
        points: ["Wide network reaching rural service centres.", "Couriers may not deliver to remote areas.", "Lower cost per parcel.", "Seeds are light and not usually urgent, so speed matters less."],
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain how cash on delivery could help Thandeka's business.",
        points: ["Farmers pay when the seeds are delivered / collected.", "Thandeka is sure of payment, no bad debts.", "Farmers trust ordering from a distant seller they have not met, so more orders."],
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Discuss **one** problem Thandeka may face from relying on postal services, and how she could reduce it.",
        points: ["Problem identified, e.g. delays during the planting season / loss or damage.", "Effect: seeds arrive too late to plant, complaints, lost customers.", "Solution, e.g. send early / registered or tracked parcels / courier for urgent orders.", "Judgement on how far the solution works (cost)."],
      }),
    ],
    hints: ["(b) Compare coverage and cost.", "(d) Think about timing in the farming season."],
    explanation: "The postal network reaches rural farmers cheaply; COD secures payment; delays and losses must be managed.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720,
    stem: "Some people say that the national postal service will soon disappear because people now communicate by email and messaging apps.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** services, other than delivering letters, offered by a post office.", points: ["One service, e.g. PO Box / private bag.", "Another, e.g. parcel post / money transfer / registered mail / express mail / poste restante."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** ways in which email and messaging have affected postal services.",
        points: ["Fewer letters posted.", "So lower revenue from letter post / fewer post offices or staff.", "More online shopping.", "So more parcels to deliver / growth of courier and parcel services."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether postal services will disappear.",
        points: ["Letter volumes are falling as people use email and messaging.", "Couriers compete for parcels.", "But online shopping increases parcel deliveries.", "Rural areas and people without internet still rely on post.", "Original documents and goods must still be carried; post offices can add new services.", "Justified conclusion."],
        modelAnswer: "Letter post has fallen sharply as people use email and messaging, and couriers compete for urgent parcels. However, online shopping has created more parcels to deliver, and many people in rural areas without internet still rely on post offices and PO Boxes. Goods and original documents cannot be emailed. Postal services are therefore unlikely to disappear, but they must change, focusing on parcels, payment services and rural coverage rather than letters.",
      }),
    ],
    hints: ["(b) Consider letters and parcels separately.", "(c) Weigh falling letters against growing parcels and rural needs."],
    explanation: "Electronic communication has reduced letters but online trade has increased parcels; postal services are changing rather than disappearing.",
  });
  b.card("DEFINITION", "Courier service?", "A private business that collects and delivers documents and parcels quickly door to door, often with tracking and proof of delivery.");
  b.card("DEFINITION", "Registered mail?", "Item recorded at each stage, signed for on delivery, with compensation if lost.");
  b.card("DEFINITION", "Recorded delivery?", "Proof of posting and a signature on delivery; little or no compensation.");
  b.card("DEFINITION", "Cash on delivery (COD)?", "The postal or courier agent collects payment from the buyer on delivery and passes it to the seller.");
  b.card("DEFINITION", "Poste restante?", "Mail kept at a named post office until the receiver collects it; used by travellers.");
  b.card("CONCEPT", "Business reply vs freepost?", "Business reply: pre-printed card or envelope supplied by the business. Freepost: special address on any envelope. Both: the business pays.");
  b.card("DEFINITION", "Franking machine?", "Prints postage on envelopes; postage is paid to the post office in advance, saving stamps.");
  b.card("CONCEPT", "Importance of postal services?", "Deliver goods and original documents, wide rural coverage, proof of delivery, payment services, low cost.");
  b.card("CONCEPT", "Drawbacks of postal services?", "Slower than electronic methods, risk of loss or delay, no instant feedback, limited home delivery, courier costs.");
});
