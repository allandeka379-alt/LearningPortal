// W1b: choice of transport, transport documents, port authorities and dry ports.
import { concept, P, money, table, sum } from "../lib.mjs";

// Cost comparison for the calculation items (computed, not typed).
const tonnes = 24;
const roadRate = 38;
const railRate = 26;
const railHandling = 2 * 150;
const roadCost = roadRate * tonnes; // 912
const railCost = sum([railRate * tonnes, railHandling]); // 624 + 300 = 924
const saving = Math.abs(roadCost - railCost); // 12
if (!(railCost > roadCost)) throw new Error("transport-choice: wording assumes road is cheaper");

const haulT = 27;
const haulRate = 41;
const haulQ = haulT * haulRate; // 1107

const t2 = 40;
const roadB = 52 * t2; // 2080
const railB = sum([31 * t2, 2 * 210]); // 1240 + 420 = 1660
if (!(railB < roadB)) throw new Error("transport-choice: wording assumes rail is cheaper");

concept("bus.transport.choice-documents", { file: "transport/choice-documents", keyPrefix: "transport.choice-documents" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which transport document is a **document of title** to the goods?",
    options: [
      ["Bill of lading", "Correct: whoever holds the bill of lading can claim the goods, so it can be transferred to a buyer or bank."],
      ["Airway bill", "The airway bill is a receipt and contract of carriage, but not a document of title."],
      ["Delivery note", "A delivery note lists goods delivered; it does not give ownership."],
      ["Consignment note", "A consignment note instructs a road or rail carrier; it is not a document of title."],
    ],
    answer: "A",
    explanation: "The **bill of lading** (sea transport) is a receipt for the goods, evidence of the contract of carriage and a document of title.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Goods are sent from Harare to a customer in Bulawayo by rail. Which document goes with them, describing the goods, the sender and the receiver?",
    options: [
      ["Consignment note", "Correct: the consignment note goes with goods sent by road or rail."],
      ["Bill of lading", "A bill of lading is used for goods sent by sea."],
      ["Airway bill", "An airway bill is used for goods sent by air."],
      ["Cover note", "A cover note is a temporary insurance document."],
    ],
    answer: "A",
    explanation: "A **consignment note** accompanies goods carried by road or rail, giving details of the goods and the parties; the receiver signs it on delivery.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a buyer do with the delivery note when goods arrive?",
    options: [
      ["Checks the goods against it and signs a copy", "Correct: the signed copy is the seller's proof that the goods were delivered."],
      ["Uses it to pay customs duty", "Customs duty is paid using customs documents, not the delivery note."],
      ["Keeps it as proof of ownership for the bank", "A delivery note is not a document of title."],
      ["Returns it with the unwanted goods", "That would be a goods returned note; the delivery note confirms delivery."],
    ],
    answer: "A",
    explanation: "The delivery note lists the goods delivered. The buyer checks the goods, notes any shortages or damage, and signs a copy for the seller.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which factor is **most** important when choosing transport for fresh milk delivered daily to shops in the same town?",
    options: [
      ["Speed and the perishable nature of the milk", "Correct: milk spoils quickly, so it needs fast, refrigerated, door-to-door transport."],
      ["The low cost of moving very large loads", "Daily local milk deliveries are small loads; cheap bulk carriage is not the main issue."],
      ["Being able to carry it over very long distances", "The deliveries are within one town."],
      ["The availability of a document of title", "Documents of title matter for sea freight, not local milk deliveries."],
    ],
    answer: "A",
    explanation: "The **nature of the goods** (perishable) and **speed** decide the mode here: refrigerated road vans deliver door-to-door quickly.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which is a role of a port authority?",
    options: [
      ["Providing berths, cranes and storage at the port", "Correct: port authorities provide and maintain port facilities and handle cargo."],
      ["Setting the exchange rate used by importers and exporters", "Exchange rates are not set by port authorities."],
      ["Issuing insurance policies on cargo", "Cargo insurance is provided by insurers."],
      ["Manufacturing containers for shippers", "Port authorities handle containers; they do not make them."],
    ],
    answer: "A",
    hints: ["Think about what ships need when they arrive at a port."],
    explanation: "Port authorities provide berths, quays, cranes and warehouses, pilotage and towing, cargo handling, security, and cooperation with customs, and they charge port dues.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How does an inland dry port benefit a landlocked country such as Zimbabwe?",
    options: [
      ["Containers can be cleared by customs inland, near importers", "Correct: importers clear and collect goods inland instead of travelling to the coast."],
      ["Ships can sail inland to collect exports", "A dry port has no water access; containers reach it by road or rail."],
      ["No customs duty is charged on any goods that are cleared there", "Duty is still payable; the dry port only changes where clearance happens."],
      ["Goods no longer need to pass through any sea port", "Sea freight still passes through a sea port before reaching the dry port."],
    ],
    answer: "A",
    hints: ["Where does customs clearance take place when there is a dry port?"],
    explanation: "A dry port is an inland terminal linked to a sea port. Sealed containers move to it by rail or road and are cleared inland, reducing congestion at the coast, travel for importers and theft.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A bill of lading notes that several cartons were damaged when loaded. What is this bill of lading called?",
    options: [
      ["A claused (dirty) bill of lading", "Correct: a bill noting damage or shortages is claused."],
      ["A clean (unclaused) bill of lading", "A clean bill states that the goods were received in good condition."],
      ["An airway bill", "An airway bill is for air transport, not sea."],
      ["A consignment note", "A consignment note is for road or rail transport."],
    ],
    answer: "A",
    hints: ["Is the condition of the goods good or not?"],
    explanation: "A **clean** bill of lading shows goods received in good order; a **claused** (dirty) bill records damage or shortages, which matters to the buyer, the bank and the insurer.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An airway bill is used for goods sent by air.",
    answer: true,
    explanation: "True. The airway bill is the receipt and contract of carriage for air freight. Unlike a bill of lading, it is not a document of title.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A business should always choose the cheapest mode of transport.",
    answer: false,
    explanation: "False. Cost is only one factor. Speed, the nature and value of the goods, safety, reliability and accessibility also matter: perishable or urgent goods may need a dearer, faster mode.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each transport document with its main use.",
    pairs: [
      ["Bill of lading", "Receipt and document of title for goods sent by sea"],
      ["Airway bill", "Receipt and contract of carriage for air freight"],
      ["Consignment note", "Instructions and details for goods sent by road or rail"],
      ["Delivery note", "Seller's list of goods delivered, signed by the buyer"],
    ],
    explanation: "Each document belongs to a mode or stage: bill of lading (sea), airway bill (air), consignment note (road and rail), delivery note (delivery to the buyer).",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Zimbabwe has no coastline, so it is a {{blank:a}} country and its sea freight passes through ports such as Beira in {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["landlocked"], choices: ["landlocked", "coastal", "island"] },
      { id: "b", accepted: ["Mozambique"], choices: ["Mozambique", "Zambia", "Botswana"] },
    ],
    explanation: "Landlocked Zimbabwe uses sea ports in neighbouring countries, such as **Beira** in Mozambique and **Durban** in South Africa, with road and rail links.",
  });
  b.num({
    d: 3, skill: "APPLICATION", kind: "money", value: haulQ, calculator: true,
    stem: `A road haulier charges ${money(haulRate)} a tonne to carry goods door to door. Calculate the cost of sending ${haulT} tonnes by road.`,
    wrong: [haulRate + haulT],
    hints: ["Multiply the rate per tonne by the number of tonnes."],
    explanation: `${haulT} × ${haulRate} = ${money(haulQ)}.`,
  });
  b.calc({
    d: 3, skill: "ANALYSIS", kind: "money", value: saving, calculator: true,
    stem: `A business must send ${tonnes} tonnes of goods. Road costs ${money(roadRate)} a tonne, door to door. Rail costs ${money(railRate)} a tonne, plus ${money(150)} for a lorry at each end of the rail journey. Calculate the difference between the total costs of the two modes.`,
    wrong: [roadRate * tonnes - railRate * tonnes, roadCost - (railRate * tonnes + 150)],
    hints: ["Rail needs a lorry at **each** end: count two lorry charges.", "Find both totals, then subtract the smaller from the larger."],
    explanation: `Road: ${tonnes} × ${roadRate} = ${money(roadCost)}. Rail: ${tonnes} × ${railRate} = ${money(railRate * tonnes)}, plus 2 × ${money(150)} = ${money(railHandling)}, total ${money(railCost)}. Difference: ${money(railCost)} − ${money(roadCost)} = ${money(saving)} (road is cheaper here).`,
    workedSolution: `1. Road total = ${tonnes} × ${roadRate} = ${money(roadCost)}.\n2. Rail haulage = ${tonnes} × ${railRate} = ${money(railRate * tonnes)}.\n3. Lorries at both ends = 2 × ${money(150)} = ${money(railHandling)}.\n4. Rail total = ${money(railRate * tonnes)} + ${money(railHandling)} = ${money(railCost)}.\n5. Difference = ${money(railCost)} − ${money(roadCost)} = ${money(saving)}: road is cheaper by ${money(saving)}.`,
  });
  b.manualShort({
    d: 3, marks: 4, skill: "APPLICATION",
    stem: "Explain **two** factors, other than cost, that a jeweller in Harare should consider when choosing how to send gold jewellery to a customer in Victoria Falls.",
    points: [
      "Safety and security / value of the goods.",
      "Jewellery is very valuable, so it needs a mode with low risk of theft (e.g. air or a secure courier).",
      "Speed / reliability.",
      "The customer expects delivery on time; a reliable, fast mode keeps goodwill (or: insurance available for the mode).",
    ],
    hints: ["What is special about jewellery?"],
    modelAnswer: "Security: gold jewellery is valuable and easy to steal, so it should be sent by a secure mode such as air freight or a trusted courier. Reliability: the customer expects it on a certain date, so a mode that keeps to time keeps the customer's goodwill.",
    explanation: "Credit factors applied to jewellery: value, security, speed, reliability, insurance, size (small and light).",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 900, calculator: true,
    stem: `Nyasha's company in Kwekwe must send ${t2} tonnes of steel bars to a customer in Bulawayo within two weeks. The quotations are:\n\n${table(["Mode", "Charge", "Extra costs"], [["Road (door to door)", `${money(52)} per tonne`, "none"], ["Rail", `${money(31)} per tonne`, `${money(210)} for a lorry at each end`]])}`,
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "Calculate the total cost by road.", kind: "money", value: roadB, wrong: [52 + t2] }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total cost by rail.", kind: "money", value: railB, wrong: [31 * t2 + 210, 31 * t2] }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Identify **two** transport documents that could be used for this consignment.",
        points: ["Consignment note.", "Delivery note."],
        modelAnswer: "A consignment note and a delivery note.",
      }),
      P.manual({
        label: "(d)", marks: 6,
        stem: "Recommend which mode Nyasha should use. Justify your answer.",
        points: [
          `Uses the figures: rail is cheaper by ${money(roadB - railB)}.`,
          "Steel bars are heavy and bulky, suited to rail.",
          "Steel is not perishable and the deadline of two weeks allows for rail timetables.",
          "Drawback of rail: extra handling at stations, possible delays / not door-to-door.",
          "Drawback of road: higher cost, but faster and more flexible.",
          "Justified recommendation.",
        ],
        modelAnswer: `Rail costs ${money(railB)} and road ${money(roadB)}, so rail saves ${money(roadB - railB)}. Steel bars are heavy and bulky and not perishable, and two weeks is enough time for rail even with possible delays. Rail does mean extra handling at both stations, but steel is not easily damaged. Road would be faster and door-to-door, but the speed is not needed. Nyasha should use rail.`,
      }),
    ],
    hints: ["(b) Count the lorry charge at both ends.", "(d) Use your figures and the nature of the goods and the deadline."],
    explanation: `(a) ${t2} × 52 = ${money(roadB)}. (b) ${t2} × 31 = ${money(31 * t2)} + 2 × 210 = ${money(railB)}. (c) Consignment note, delivery note. (d) Rail is cheaper and suits bulky, non-perishable steel with a two-week deadline.`,
    workedSolution: `1. Road: ${t2} × 52 = ${money(roadB)}.\n2. Rail haulage: ${t2} × 31 = ${money(31 * t2)}; lorries 2 × 210 = ${money(420)}; total ${money(railB)}.\n3. Saving by rail: ${money(roadB)} − ${money(railB)} = ${money(roadB - railB)}.`,
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "Tendai imports electrical goods from Asia. His containers are shipped to a port in a neighbouring country, then travel by road to Zimbabwe, where he clears them through customs at the border. Delays at the port and the border sometimes hold his goods for two weeks.",
    parts: [
      P.manual({
        label: "(a)", marks: 3,
        stem: "State **three** purposes of the bill of lading for Tendai's goods.",
        points: ["Receipt from the shipping company for the goods loaded.", "Evidence of the contract of carriage.", "Document of title: he (or his bank) must present it to collect the goods."],
        modelAnswer: "It is a receipt for the goods loaded, evidence of the contract with the shipping company, and a document of title that Tendai must present to collect the containers.",
      }),
      P.manual({
        label: "(b)", marks: 8,
        stem: "Tendai could instead have his containers sent by rail to an inland dry port, where they would be cleared by customs. Discuss the advantages and disadvantages of this for his business.",
        points: [
          "Less waiting at the congested sea port.",
          "Customs clearance closer to his business, saving travel and agents' time.",
          "Containers stay sealed until the dry port: less theft and damage.",
          "Rail cheaper for heavy containers over a long distance.",
          "Disadvantage: rail timetables / delays in the rail system.",
          "Disadvantage: road transport still needed from the dry port to his premises; dry port charges.",
          "Weighs the points for this importer of valuable electrical goods.",
          "Justified conclusion.",
        ],
        modelAnswer: "Sending containers to a dry port would cut the time they wait at the busy sea port and let Tendai clear customs inland, saving travel and agents' fees. The containers would stay sealed, reducing theft of valuable electrical goods, and rail is cheaper than road for heavy containers over long distances. However, trains run to timetables and the rail system may have its own delays, he still needs a lorry from the dry port to his shop, and the dry port charges for handling and storage. Because his goods are valuable and current delays already reach two weeks, the security and faster clearance probably outweigh these drawbacks, so the dry port is worth trying.",
      }),
    ],
    hints: ["(a) Receipt, contract, title.", "(b) Think about time, security, cost and convenience, then judge."],
    explanation: "The bill of lading is a receipt, a contract of carriage and a document of title. Dry ports move customs clearance inland, reducing port congestion and theft, at the cost of rail timetables and onward road transport.",
  });
  b.card("FACT", "List six factors that influence the choice of transport.", "Cost, speed, distance, nature of goods, value of goods, safety, reliability, urgency, accessibility (any six).");
  b.card("DEFINITION", "What is a **consignment note**?", "A document sent with goods by road or rail giving the sender, receiver, carrier and goods; signed by the receiver on delivery.");
  b.card("DEFINITION", "What is a **delivery note**?", "The seller's list of goods delivered; the buyer checks the goods and signs a copy as proof of delivery.");
  b.card("CONCEPT", "Three purposes of a **bill of lading**?", "Receipt for goods shipped; evidence of the contract of carriage; document of title.");
  b.card("CONCEPT", "How does an airway bill differ from a bill of lading?", "Both are receipts and contracts of carriage, but the airway bill is **not** a document of title.");
  b.card("DEFINITION", "Clean and claused bills of lading?", "Clean: goods received in good condition. Claused (dirty): damage or shortages noted.");
  b.card("FACT", "Roles of a port authority?", "Berths, cranes and warehouses; pilotage and towing; cargo handling; security; working with customs; charging port dues.");
  b.card("DEFINITION", "What is a **dry port**?", "An inland terminal linked by road or rail to a sea port where containers are cleared by customs and stored.");
  b.card("FACT", "Name two sea ports used by Zimbabwe.", "Beira (Mozambique) and Durban (South Africa).");
});
