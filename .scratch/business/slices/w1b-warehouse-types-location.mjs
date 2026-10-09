// W1b: types of warehouse (private, public, bonded) and warehouse location.
import { concept, P } from "../lib.mjs";

concept("bus.trade.warehouse-types-location", { file: "trade/warehouse-types-location", keyPrefix: "trade.warehouse-types-location" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which type of warehouse are imported goods stored before customs duty has been paid?",
    options: [
      ["A bonded warehouse", "Correct: goods stay under customs control until duty is paid or they are re-exported."],
      ["A retailer's warehouse", "A retailer's warehouse holds goods for its own branches; duty has already been paid on imports in it."],
      ["A cold storage warehouse", "Cold storage describes the conditions in a store, not its customs status."],
      ["A manufacturer's warehouse", "A manufacturer's warehouse holds its raw materials and finished goods."],
    ],
    answer: "A",
    explanation: "A **bonded warehouse** is approved and supervised by the customs authority (ZIMRA). Imports are held there until the duty is paid or the goods are re-exported.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What makes a warehouse a **public** warehouse?",
    options: [
      ["Anyone may store goods in it on payment of a fee", "Correct: public refers to who may use it, for a storage charge."],
      ["It must be owned by the government", "Many public warehouses are run by private businesses; ownership is not the test."],
      ["It stores only goods for export", "Public warehouses store all kinds of goods for many users."],
      ["It is open to shoppers who buy goods there", "A public warehouse rents storage space; it is not a shop."],
    ],
    answer: "A",
    explanation: "A public warehouse rents space and services to any business or person that pays. It may be privately or publicly owned.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is an advantage to an importer of using a bonded warehouse?",
    options: [
      ["Duty is paid only on the goods taken out each time", "Correct: paying duty in stages as goods are released helps the importer's cash flow."],
      ["Goods sold in Zimbabwe never pay any import duty", "Duty is delayed, not removed, for goods sold in the home market."],
      ["Customs officials cannot inspect the goods", "Bonded goods are under customs supervision and can be inspected."],
      ["Storage in bond is always free of charge", "The importer pays rent to the bonded warehouse operator."],
    ],
    answer: "A",
    explanation: "In bond, duty is paid only when goods are released for home consumption, a part at a time, so the importer does not have to find the whole duty at once. Re-exports from bond pay no Zimbabwean import duty.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A supermarket group delivers goods from one central store in Gweru to its branches in four towns. What type of warehouse is the central store?",
    options: [
      ["A retailer's warehouse", "Correct: a large retailer's distribution centre is a private warehouse supplying its own branches."],
      ["A public warehouse", "The store is used only by the group for its own goods, so it is private."],
      ["A bonded warehouse", "Nothing suggests imports held before duty is paid."],
      ["A wholesaler's warehouse", "The group is a retailer: it sells to consumers through its branches."],
    ],
    answer: "A",
    explanation: "Large retailers run **distribution centres**, private warehouses that receive goods in bulk and supply each branch.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A trader in Mutare grows and dries chillies, and needs extra storage for only two months after each harvest. Which option is most suitable?",
    options: [
      ["Renting space in a public warehouse", "Correct: she pays only for the space and time she needs."],
      ["Building her own private warehouse", "A private warehouse would stand empty for ten months of the year."],
      ["Using a bonded warehouse", "Bonded warehouses are for imports held before duty is paid."],
      ["Storing the chillies in the open", "This exposes the crop to rain, theft and pests."],
    ],
    answer: "A",
    hints: ["Which option avoids paying for space she does not use most of the year?"],
    explanation: "Public warehouses suit small firms and seasonal users: they pay a fee only for the space and period needed, without the cost of building and running a store.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which factor is **most** important when choosing the site for a cold store for fresh meat?",
    options: [
      ["A reliable electricity supply", "Correct: cold rooms must run all day and night or the meat spoils."],
      ["Being in the city centre", "City-centre sites are costly and hard for lorries; nearness can be achieved without them."],
      ["Being far from any main road", "A cold store needs good road access for fast deliveries."],
      ["Low rainfall in the area", "Rainfall does not matter much to a closed, refrigerated building."],
    ],
    answer: "A",
    hints: ["What does a cold room need all the time?"],
    explanation: "For a cold store, a reliable power supply is critical: refrigeration must run continuously. Good road access and nearness to customers matter too.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Goods re-exported from a bonded warehouse in Zimbabwe to Zambia:",
    options: [
      ["do not pay Zimbabwean import duty", "Correct: duty is charged only on goods released for use in Zimbabwe."],
      ["pay Zimbabwean duty twice", "Duty is not charged twice; goods sent on from bond pay no Zimbabwean import duty."],
      ["must first be released and the duty refunded", "Re-exports leave directly from bond, so no duty is paid and none needs refunding."],
      ["cannot be re-exported once in bond", "Re-export from bond is one of its main advantages."],
    ],
    answer: "A",
    hints: ["Import duty is a tax on goods used in the importing country."],
    explanation: "Import duty is charged on goods released for **home consumption**. Goods re-exported from bond never enter the home market, so no Zimbabwean import duty is payable on them.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A manufacturer's warehouse may store both raw materials and finished goods.",
    answer: true,
    explanation: "True. Manufacturers store raw materials so production does not stop, and finished goods until they are sold.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A bonded warehouse is controlled by the customs authority, so the importer cannot repack or label the goods while they are in bond.",
    answer: false,
    explanation: "False. Under customs supervision, goods in bond can be blended, sorted, repacked and labelled. The importer simply cannot remove them for home use without paying the duty.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each user with the most suitable type of warehouse.",
    pairs: [
      ["A small firm that needs storage only after harvest", "Public warehouse"],
      ["An importer who wants to pay duty in stages", "Bonded warehouse"],
      ["A shoe factory storing leather and finished shoes", "Manufacturer's warehouse"],
      ["A cash-and-carry business selling to tuck shops", "Wholesaler's warehouse"],
    ],
    explanation: "Public warehouses rent space for short periods; bonded warehouses delay duty; manufacturers store materials and output; wholesalers store bulk goods and break bulk for retailers.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentences.",
    template: "A warehouse owned by a business for its own goods is a {{blank:a}} warehouse. Goods in a bonded warehouse are supervised by the {{blank:b}} authority.",
    blanks: [
      { id: "a", accepted: ["private"], choices: ["private", "public", "bonded", "free"] },
      { id: "b", accepted: ["customs"], choices: ["customs", "local", "standards", "transport"] },
    ],
    explanation: "Private warehouses store the owner's own goods. Bonded warehouses are licensed and supervised by the **customs** authority (ZIMRA in Zimbabwe).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the term for the guarantee given to the customs authority that duty will be paid before goods leave a bonded warehouse for the home market.",
    accepted: ["bond", "a bond", "customs bond"],
    wrong: ["warrant", "duty"],
    explanation: "The **bond** is the owner's guarantee to customs that duty will be paid; this is why the store is called a bonded warehouse.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** advantages to a business of owning a private warehouse rather than renting space in a public warehouse.",
    points: [
      "Full control over the warehouse: access at any time.",
      "So goods are available whenever needed / no waiting for the public warehouse.",
      "It can be designed for the goods (cold rooms, racks, security).",
      "So goods are kept in the right conditions and damage is reduced.",
    ],
    hints: ["Think about control and design."],
    modelAnswer: "The business controls its own warehouse and can use it at any time, so goods are available whenever needed. It can design the building for its goods, for example with cold rooms, so the goods stay in good condition.",
    explanation: "Each advantage: one mark for the point and one for its benefit to the business.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "A wholesaler of building materials wants to open a new warehouse to supply hardware shops in the Midlands. Explain **two** factors it should consider when choosing the site.",
    points: [
      "Transport links: good roads / rail siding / access for heavy lorries.",
      "Because cement and steel are heavy and bulky, and deliveries must be cheap and quick.",
      "Nearness to customers: central to the hardware shops (e.g. Gweru or Kwekwe).",
      "Shorter, cheaper deliveries and faster service; also accept cost of land, space, security with explanation.",
    ],
    hints: ["Building materials are heavy. Who are the customers and where are they?"],
    modelAnswer: "The site needs good road (or rail) links with access for heavy lorries, because cement and steel are bulky and must be delivered cheaply. It should be central to the hardware shops in the Midlands, so deliveries are short and quick.",
    explanation: "Credit any two relevant factors (transport links, nearness to customers, cost of land, space for lorries and expansion, security, regulations), each applied to building materials.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Sipho imports agricultural machinery and spare parts. Each shipment is large, and he sells the goods to farmers over several months. Some parts are sold on to dealers in Zambia and Mozambique. At present he pays all the import duty when each shipment arrives, which leaves him short of cash.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of warehouse would best solve Sipho's cash problem?",
        options: [["A bonded warehouse", "Correct: duty is paid only as goods are released."], ["A retailer's warehouse", "Retailers' warehouses supply their own branches and do not delay duty."], ["A manufacturer's warehouse", "Sipho is an importer, not a manufacturer."], ["A cold storage depot", "Cold storage is for perishables and does not delay duty."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways in which this type of warehouse would help Sipho's business.",
        points: [
          "Duty is paid only on the goods taken out each time.",
          "So he does not have to find all the duty when a shipment arrives, improving his cash flow.",
          "Parts re-exported to Zambia and Mozambique pay no Zimbabwean import duty.",
          "So his costs on those sales are lower and his prices to dealers more competitive.",
        ],
        modelAnswer: "In a bonded warehouse Sipho pays duty only on the machinery and parts he takes out to sell, so he does not need to pay all the duty when the shipment arrives and his cash flow improves. Parts he sends on to dealers in Zambia and Mozambique leave from bond without Zimbabwean import duty, which lowers his costs on those sales.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Sipho is choosing between a site near the border post and a site in Harare, close to most of his farmer customers. Recommend which site he should choose. Justify your answer.",
        points: [
          "Border site: close to customs, suits goods in bond and re-exports.",
          "Border site: drawback, far from farmers, so delivery costs and time for local sales.",
          "Harare site: near customers, faster service, farmers can inspect machinery.",
          "Harare site: drawback, re-exports travel further / customs arrangements further from the border.",
          "Weighs the two using the case (proportion of local sales versus re-exports).",
          "Justified recommendation.",
        ],
        modelAnswer: "A site near the border would suit goods held in bond and make re-exports to Zambia and Mozambique quick, but most of his customers are farmers who buy in Zimbabwe, so every local sale would need a long, costly delivery. A Harare site is close to most farmers: they can inspect machinery and get spare parts quickly, which matters when a tractor breaks down in the planting season. Since most of his sales are local and fast supply of parts wins customers, I recommend Harare, using a bonded store there if customs approval can be obtained, and sending the smaller re-export orders by road.",
      }),
    ],
    hints: ["(a) Which warehouse delays the payment of duty?", "(c) Compare each site's advantage and drawback for this business, then decide."],
    explanation: "(a) Bonded warehouse. (b) Duty in stages improves cash flow; re-exports pay no import duty. (c) A justified choice weighing nearness to customers against nearness to the border.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 720,
    stem: "Rudo runs a small business making peanut butter in Masvingo. She stores her jars at the back of her workshop, which is now full. She is considering renting space in a public warehouse in the town.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "State **two** services, other than storage space, that a public warehouse may offer Rudo.",
        points: ["One service, e.g. packing / labelling / grading.", "A second service, e.g. insurance cover / arranging transport / a warehouse warrant usable as loan security."],
        modelAnswer: "Packing and labelling; arranging transport to customers.",
      }),
      P.manual({
        label: "(b)", marks: 8,
        stem: "Discuss whether Rudo should rent space in the public warehouse or build her own store.",
        points: [
          "Public warehouse: no building cost, pays only for space used.",
          "Flexible: can rent more or less as sales change.",
          "Extra services (security, insurance, transport).",
          "Own store: full control, access at any time, next to her workshop.",
          "Own store: high building and running costs; space may be idle.",
          "Public warehouse drawbacks: rent is a continuing cost; less control, may not suit food hygiene; travel between workshop and warehouse.",
          "Applies to a small business with limited capital.",
          "Justified recommendation.",
        ],
        modelAnswer: "Renting public warehouse space means Rudo avoids the cost of building, pays only for the space she needs and can rent more as sales grow. The warehouse may also provide security and arrange transport. However, rent is a continuing cost, she has less control over access and hygiene, and she must carry jars between her workshop and the warehouse. Building her own store gives full control and keeps stock next to production, but it needs capital a small business may not have, and space may be idle. As a small, growing business, Rudo should rent public warehouse space for now and consider her own store once sales are large and steady.",
      }),
    ],
    hints: ["(b) Consider cost, control, flexibility and convenience for a small business, then decide."],
    explanation: "Public warehouses suit small and growing firms: low commitment and extra services, at the cost of rent and less control. A private store suits steady, large volumes.",
  });
  b.card("DEFINITION", "What is a **public warehouse**?", "A warehouse that stores goods for anyone who pays a storage charge; it may be privately or publicly owned.");
  b.card("DEFINITION", "What is a **bonded warehouse**?", "A customs-approved warehouse where imports are stored before import duty is paid.");
  b.card("CONCEPT", "Name three types of **private** warehouse.", "Manufacturers', wholesalers' and retailers' warehouses (distribution centres).");
  b.card("FACT", "Give three advantages of a bonded warehouse to an importer.", "Duty paid in stages as goods are released; no import duty on re-exports; goods can be repacked or blended and inspected in bond.");
  b.card("CONCEPT", "Who benefits most from public warehouses?", "Small firms that cannot afford their own store and firms needing extra space only at peak times.");
  b.card("FACT", "List five factors in locating a warehouse.", "Nearness to customers, nearness to suppliers, transport links, cost of land, services (power, water), labour, security, space, regulations (any five).");
  b.card("CONCEPT", "Is duty on bonded goods removed or delayed?", "**Delayed** for goods sold in the home market; only re-exports avoid the import duty.");
  b.card("CONCEPT", "What does a retailer's distribution centre do?", "Receives goods in bulk from suppliers and supplies each of the retailer's branches as needed.");
});
