// W3b: telecommunication services and service providers (ZIMSEC Commerce).
import { concept, P, money, r2 } from "../lib.mjs";

// Airtime commission.
const airtimeSales = 1250, airComm = 4;
const airEarn = (airtimeSales * airComm) / 100; // 50
// Cost saving from phone orders vs travel.
const trips = 6, fare = 14, phoneCost = 9;
const saving = trips * fare - phoneCost; // 75

concept("bus.communication.telecommunications", { file: "communication/telecommunications", keyPrefix: "communication.telecommunications" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is telecommunication?",
    options: [
      ["Sending information over a distance by electronic means", "Correct."],
      ["Carrying letters and parcels by road and rail", "That is a postal or courier service."],
      ["Talking face to face at a meeting of managers", "That is oral communication without telecommunication."],
      ["Displaying notices on a staff notice board", "That is written communication."],
    ],
    answer: "A",
    explanation: "Telecommunication uses electronic means (phone networks, the internet, satellites) to send information over a distance.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which type of service provider supplies landline telephones through cables to offices?",
    options: [
      ["A fixed-line operator", "Correct."],
      ["A courier company", "Couriers deliver parcels."],
      ["An insurance company", "Insurers provide cover against risk."],
      ["A commercial bank", "Banks provide financial services."],
    ],
    answer: "A",
    explanation: "Fixed-line operators provide landlines, leased lines and fixed broadband.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "A vegetable vendor at Sakubva market receives payment from a customer by phone instead of cash. Which telecommunication service is being used?",
    options: [
      ["Mobile money", "Correct: payment is made through the mobile network."],
      ["Fax", "Fax sends copies of documents."],
      ["Video conferencing", "That is for live video meetings."],
      ["A leased line", "Leased lines connect business premises."],
    ],
    answer: "A",
    explanation: "Mobile money lets customers pay and transfer money using a phone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is the main advantage of email over an ordinary telephone call for confirming an order?",
    options: [
      ["It gives a written record of the order", "Correct: evidence if there is a dispute."],
      ["It always reaches the receiver faster", "A phone call is just as fast."],
      ["It needs no electricity or network", "Email needs both."],
      ["It allows the sender to hear the receiver's voice", "That is a phone call's advantage."],
    ],
    answer: "A",
    explanation: "Email provides a **written record** of orders, quotations and agreements.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a disadvantage of telecommunication for a business in a rural area?",
    options: [
      ["Poor network coverage may stop calls and data", "Correct: coverage is weaker in some rural areas."],
      ["It allows the business to contact suppliers quickly", "That is an advantage."],
      ["It reduces the need to travel to town", "That is an advantage."],
      ["It allows customers to pay by phone", "That is an advantage."],
    ],
    answer: "A",
    explanation: "Coverage, power cuts, costs and fraud are the main drawbacks.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "A wholesaler wants to hold a meeting with branch managers in Bulawayo, Mutare and Masvingo without anyone travelling. Which service is most suitable?",
    options: [
      ["Video conferencing", "Correct: a live meeting with sight and sound."],
      ["Registered mail", "Too slow for a meeting."],
      ["A fax message to each branch", "One-way and no discussion."],
      ["A notice on the head office board", "Branch managers would not see it."],
    ],
    answer: "A",
    hints: ["Which service allows people in different towns to see and talk to each other?"],
    explanation: "Video conferencing allows a live, two-way meeting and saves travel time and cost.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why have messaging apps reduced the use of fax machines by businesses?",
    options: [
      ["Documents and pictures can be sent instantly and cheaply from a phone", "Correct."],
      ["Fax machines cannot send any written documents at all", "Sending documents is what fax does."],
      ["Messaging apps work without any network or data connection", "They need a data connection."],
      ["Fax machines are now illegal for businesses to use", "They are legal, just outdated."],
    ],
    answer: "A",
    hints: ["Compare the cost and convenience of each."],
    explanation: "Phones can photograph or scan documents and send them instantly over data, without a separate machine and phone line.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What does an internet service provider (ISP) mainly sell?",
    options: [
      ["Connection to the internet", "Correct."],
      ["Postage stamps and post boxes", "That is a postal service."],
      ["Mobile phone handsets only", "Handsets are sold by retailers; ISPs sell access."],
      ["Insurance against loss of data", "That is insurance."],
    ],
    answer: "A",
    explanation: "ISPs connect homes and businesses to the internet by fibre, wireless or satellite.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Mobile network operators provide services such as voice calls, SMS and mobile data.",
    answer: true,
    explanation: "True. Many also provide mobile money services.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "An ordinary voice call automatically gives both parties a written record of what was agreed.",
    answer: false,
    explanation: "False. A call leaves no written record unless notes are made or the agreement is confirmed in writing.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each business need with the most suitable telecommunication service.",
    pairs: [
      ["Sending a written quotation with a price list attached", "Email"],
      ["Telling a delivery driver about a change of address immediately", "Mobile phone call"],
      ["Selling goods to customers across the country through a website", "Internet"],
      ["Receiving payment from a customer who has no cash", "Mobile money"],
    ],
    explanation: "Choose the service by the need: record, speed, reach or payment.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Telecommunication service providers in Zimbabwe are licensed and regulated by {{blank:a}}. Businesses that provide calls, SMS and data through masts are called {{blank:b}} network operators.",
    blanks: [
      { id: "a", accepted: ["POTRAZ", "the Postal and Telecommunications Regulatory Authority of Zimbabwe", "Postal and Telecommunications Regulatory Authority"], wrong: "ZIMRA" },
      { id: "b", accepted: ["mobile", "cellular", "mobile phone"], wrong: "fixed" },
    ],
    explanation: "POTRAZ regulates postal and telecommunication providers; mobile network operators run wireless networks.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the service that allows people in different places to hold a live meeting with sound and pictures over the internet.",
    accepted: ["video conferencing", "videoconferencing", "video conference", "video call", "video calling", "video calls", "video conferences"],
    wrong: ["teleconferencing by fax"],
    explanation: "**Video conferencing** saves the time and cost of travelling to meetings.",
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: true,
    stem: `A tuck-shop owner sells ${money(airtimeSales)} of airtime in a month and earns ${airComm}% commission. Calculate her commission for the month.`,
    kind: "money", value: airEarn, wrong: [airtimeSales - airEarn, airComm * 10],
    explanation: `${money(airtimeSales)} × ${airComm} ÷ 100 = ${money(airEarn)}.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: true,
    stem: `A trader used to make ${trips} return trips a month to Harare to place orders, at ${money(fare)} a trip. She now places all her orders by phone, spending ${money(phoneCost)} a month on airtime and data. Calculate her monthly saving.`,
    kind: "money", value: saving, wrong: [trips * fare, fare - phoneCost],
    hints: ["Find the old cost of travelling, then subtract the new cost of phoning."],
    explanation: `Old cost = ${trips} × ${money(fare)} = ${money(trips * fare)}. Saving = ${money(trips * fare)} − ${money(phoneCost)} = ${money(saving)}.`,
    workedSolution: `1. Travel cost = ${trips} × ${fare} = ${trips * fare}.\n2. Saving = ${trips * fare} − ${phoneCost} = ${money(saving)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "ANALYSIS",
    stem: "Explain **two** ways in which mobile phones have helped small traders in Zimbabwe.",
    points: [
      "Way 1, e.g. ordering stock / contacting suppliers without travelling.",
      "Explained: saves time and transport costs; shelves restocked quickly.",
      "Way 2, e.g. receiving payments by mobile money / advertising on messaging groups / selling airtime.",
      "Explained: fewer lost sales when customers lack cash / reaches more customers / extra income.",
    ],
    hints: ["Think about buying stock, selling and getting paid."],
    modelAnswer: "Traders can order stock from suppliers by phone or message, so they no longer travel to town, saving fares and time away from the stall. They can also accept mobile money, so they do not lose sales when customers have no cash.",
    explanation: "Mobile phones help with ordering, payment, advertising and extra income.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 780,
    stem: "Nyasha runs a busy hardware shop in Kwekwe. At present the shop has one landline telephone. Customers complain that the line is often engaged, and Nyasha writes orders from contractors on paper while she talks. She is considering getting an internet connection, an email address and a business mobile phone with a messaging app.",
    parts: [
      P.mcq({
        label: "(a)", marks: 1,
        stem: "Which type of service provider would supply the internet connection?",
        options: [["An internet service provider", "Correct."], ["A courier company", "Couriers deliver parcels."], ["A wholesaler", "Wholesalers sell goods in bulk."], ["The regulator", "The regulator licenses providers; it does not sell connections."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** advantages to Nyasha's shop of using email and a messaging app.",
        points: ["Written record of orders from contractors.", "Fewer mistakes and disputes than orders written down during calls.", "Customers can contact the shop even when the landline is busy / send pictures of parts they need.", "So fewer lost sales and faster service."],
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain **one** problem Nyasha may face with the new services.",
        points: ["Problem identified, e.g. costs of data / power cuts / network problems / scams.", "Explained.", "Applied to the shop, e.g. orders not received during a power cut, losing customers."],
      }),
      P.manual({
        label: "(d)", marks: 4, stem: "Recommend whether Nyasha should keep the landline once the new services are installed. Justify your answer.",
        points: ["Reason to keep: published number customers know / works when mobile network weak.", "Reason to drop: saves line rental; mobile phone and apps do the same job.", "Considers back-up during network or power problems.", "Justified recommendation."],
        modelAnswer: "Many customers already know the landline number, and it gives a back-up if the mobile network is weak. On the other hand, the mobile phone and messaging app can take calls and orders, so the landline's rental may be wasted. Nyasha should keep the landline for at least a few months while customers learn the new contacts, then review how often it is used.",
      }),
    ],
    hints: ["(b) Think about records and the engaged line.", "(d) Weigh cost against reliability and customers' habits."],
    explanation: "Email and messaging give records and more ways to reach the shop, but bring costs and depend on power and networks.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Sipho has a small farm near Chinhoyi and sells vegetables to restaurants in Harare. A friend says that \"with a mobile phone and the internet, Sipho no longer needs to visit his customers at all\".",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "State **two** telecommunication services Sipho could use to sell his vegetables.", points: ["One service, e.g. voice calls / SMS / messaging app / email.", "A second service, e.g. social media page / mobile money / website."] }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** limitations of relying only on telecommunication to deal with his customers.",
        points: ["No personal contact: harder to build trust and relationships.", "Customers may switch to suppliers they know personally.", "Cannot show quality of fresh produce as well as in person / misunderstandings.", "Network or power problems may stop orders arriving."],
      }),
      P.manual({
        label: "(c)", marks: 6, stem: "Discuss whether Sipho's friend is right.",
        points: ["Telecommunication saves travel time and cost; orders and payments can be handled remotely.", "Quick response to orders; photographs of produce can be sent.", "But relationships and trust need some personal contact, especially with new customers.", "Quality complaints and price negotiations may be easier face to face.", "Network and power problems are a risk.", "Justified conclusion (e.g. mostly by phone, with occasional visits)."],
        modelAnswer: "Telecommunication saves Sipho time and money: restaurants can order by message, he can send photographs of the day's produce and receive payment by mobile money. However, restaurant owners buy from suppliers they trust, and occasional visits help him build relationships, deal with complaints and win new customers. Network or power failures could also stop orders. The friend is partly right: Sipho can handle routine orders by phone, but he should still visit customers from time to time, especially new ones.",
      }),
    ],
    hints: ["(b) What does a phone call or message lack compared with a visit?", "(c) Separate routine orders from building relationships."],
    explanation: "Telecommunication handles routine trade efficiently but does not fully replace personal contact.",
  });
  b.card("DEFINITION", "What is **telecommunication**?", "Sending and receiving information (voice, text, pictures, data) over a distance by electronic means.");
  b.card("FACT", "Telecommunication devices and services?", "Landline, mobile phone, internet, email, messaging apps, video conferencing, fax, data services, mobile money.");
  b.card("CONCEPT", "Advantages of telecommunication to trade?", "Speed, distance no barrier, lower travel costs, two-way contact, wider markets, written records (email), quick payments.");
  b.card("CONCEPT", "Disadvantages of telecommunication?", "Costs of equipment and data, poor coverage, power cuts, fraud and hacking, misunderstandings, no record of voice calls.");
  b.card("DEFINITION", "Fixed-line operator?", "Provides landlines, leased lines and fixed broadband through cables.");
  b.card("DEFINITION", "Mobile network operator?", "Provides voice calls, SMS, mobile data and mobile money through a wireless network.");
  b.card("DEFINITION", "Internet service provider?", "Connects customers to the internet by fibre, wireless or satellite, often with email and web hosting.");
  b.card("FACT", "Who regulates telecommunication providers in Zimbabwe?", "POTRAZ: the Postal and Telecommunications Regulatory Authority of Zimbabwe.");
});
