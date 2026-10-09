// W1b: trends in transport (containerisation, toll gates, tracking, e-ticketing, GPS, air cargo, ICT).
import { concept, P } from "../lib.mjs";

concept("bus.transport.trends", { file: "transport/trends", keyPrefix: "transport.trends" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is containerisation?",
    options: [
      ["Carrying goods in standard sealed steel boxes moved between modes", "Correct: the same container moves by ship, train and lorry without the goods being unpacked."],
      ["Packing goods in cardboard cartons for retail sale", "Cartons are retail packaging; containers are large standard transport boxes."],
      ["Storing liquids in large tanks at an inland fuel depot", "That is bulk storage of liquids, not containerisation."],
      ["Charging road users a fee each time they use a highway", "That describes a toll, not containerisation."],
    ],
    answer: "A",
    explanation: "**Containerisation** uses standard-sized steel boxes that cranes, ships, wagons and trailers are all built to handle, so goods move between modes without unpacking.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which is an advantage of containerisation to an importer?",
    options: [
      ["Less theft and damage because goods are sealed", "Correct: goods stay locked in a steel box from the factory to the buyer or customs."],
      ["No customs checks are ever carried out", "Containers can still be opened and inspected by customs."],
      ["No cranes or special vehicles are needed", "Containers need cranes and special trailers, which is a disadvantage."],
      ["Empty containers never need to be returned", "Returning empty containers is a cost of containerisation."],
    ],
    answer: "A",
    explanation: "Containers are sealed and strong, so theft and damage fall, less packaging is needed and loading is fast.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the main purpose of a toll gate?",
    options: [
      ["To raise money for building and maintaining roads", "Correct: toll fees are used for road construction and repairs."],
      ["To check drivers' licences at every gate", "Licence checks are done by the police, not toll gates."],
      ["To collect customs duty on imports", "Customs duty is collected at border posts and bonded warehouses."],
      ["To stop lorries from using main roads", "Toll gates charge lorries for road use; they do not ban them."],
    ],
    answer: "A",
    explanation: "Tolls make road users pay towards road building and maintenance in proportion to their use of the road.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A bus company lets passengers book and pay for seats on their phones and receive a ticket by text message. This is an example of:",
    options: [
      ["e-ticketing", "Correct: booking and paying electronically for an electronic ticket."],
      ["containerisation", "Containerisation concerns moving goods in standard boxes."],
      ["vehicle tracking", "Tracking shows a vehicle's location; it does not sell tickets."],
      ["a toll system", "Tolls charge vehicles for using a road."],
    ],
    answer: "A",
    explanation: "**E-ticketing** replaces paper tickets bought at an office with electronic booking and payment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "How can a vehicle tracking system reduce a haulage firm's costs?",
    options: [
      ["It reveals detours and misuse of fuel by drivers", "Correct: owners see routes and stops, so wasted fuel and unauthorised trips fall."],
      ["It removes the need to insure the lorries", "Lorries must still be insured; tracking may lower premiums, not remove them."],
      ["It makes toll fees unnecessary", "Tolls are still payable whether or not a lorry is tracked."],
      ["It allows lorries to carry heavier loads", "Tracking does not change a lorry's carrying capacity."],
    ],
    answer: "A",
    hints: ["What can the owner see that she could not see before?"],
    explanation: "Tracking shows each lorry's position, speed and stops, so the owner can stop detours and fuel theft, recover stolen vehicles and may get lower insurance premiums.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement correctly distinguishes GPS from a vehicle tracking system?",
    options: [
      ["GPS finds a position; tracking sends it to the owner", "Correct: a tracker uses GPS but also reports the position to someone else."],
      ["GPS is used only by ships; tracking only by lorries", "Both are used by many kinds of vehicles, ships and aircraft."],
      ["GPS needs no satellites; tracking needs satellites", "GPS is itself satellite-based."],
      ["They are two names for exactly the same thing", "They are related but not the same: navigation is not reporting."],
    ],
    answer: "A",
    hints: ["Who sees the position in each case?"],
    explanation: "Satellite positioning (GPS) tells the user where he or she is and helps with navigation. A tracking system uses GPS and a mobile network to report the vehicle's position to the owner.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Which business has gained most from the growth of air cargo?",
    options: [
      ["A farm exporting fresh flowers to Europe", "Correct: air cargo lets perishable produce reach distant markets fresh."],
      ["A quarry selling crushed stone locally", "Crushed stone is heavy, cheap and sold locally: road transport suits it."],
      ["A coal mine supplying a nearby power station", "Coal moves by rail or conveyor, not by air."],
      ["A brickworks supplying builders in the same town", "Bricks are heavy and sold locally."],
    ],
    answer: "A",
    hints: ["Air cargo is fast but expensive."],
    explanation: "Air cargo suits perishable, urgent or valuable goods going long distances, such as flowers and fresh vegetables for export.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Containers can be transferred from a ship to a train and then to a lorry without unpacking the goods.",
    answer: true,
    explanation: "True. This is intermodal transport, the main advantage of standard containers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Toll gates reduce the cost of transport for businesses.",
    answer: false,
    explanation: "False. Tolls add to transport costs, which firms may pass on in prices. Better roads funded by tolls can reduce vehicle wear and journey times, partly offsetting the cost.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each trend in transport with a disadvantage.",
    pairs: [
      ["Containerisation", "Needs expensive cranes and special trailers"],
      ["Toll gates", "Raise the cost of each journey"],
      ["E-ticketing", "Needs a phone, data and electronic money"],
      ["Vehicle tracking", "Monthly subscription costs and needs network coverage"],
    ],
    explanation: "Every trend has costs as well as benefits: equipment for containers, fees for tolls, access to technology for e-ticketing, subscriptions for tracking.",
  });
  b.fib({
    d: 2,
    stem: "Complete the sentence.",
    template: "Using two or more modes of transport for one journey, made easier by containers, is called {{blank:a}} transport.",
    blanks: [{ id: "a", accepted: ["intermodal", "multimodal"], wrong: "mixed" }],
    explanation: "**Intermodal** (multimodal) transport moves the same container by ship, rail and road.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What do the letters **GPS** stand for?",
    accepted: ["Global Positioning System", "global positioning system", "global positioning satellite system"],
    keywords: undefined,
    wrong: ["general positioning system"],
    explanation: "**GPS** = Global Positioning System, a satellite positioning system used for navigation and tracking.",
  });
  b.manualShort({
    d: 3, marks: 4, skill: "UNDERSTANDING",
    stem: "Explain **two** advantages of e-ticketing to a long-distance bus company.",
    points: [
      "Less cash handled at offices.",
      "So less theft and fraud by staff or robbers.",
      "Knows demand in advance from bookings.",
      "So it can plan buses and seats and avoid empty runs (also: fewer ticket clerks / lower costs).",
    ],
    hints: ["Think about cash and about planning."],
    modelAnswer: "Passengers pay electronically, so the company handles less cash and suffers less theft and fraud. It also knows in advance how many seats are booked on each route, so it can plan the number of buses and avoid half-empty trips.",
    explanation: "Each advantage needs a benefit to the company. Other creditworthy points: fewer ticket offices and clerks; customers book from anywhere, increasing sales.",
  });
  b.manualShort({
    d: 3, marks: 3, skill: "UNDERSTANDING",
    stem: "State **three** ways in which ICT is used in transport today.",
    points: ["Online booking and payment of freight or tickets (e-ticketing, mobile money).", "Vehicle tracking and GPS navigation / route planning.", "Electronic transport documents / computerised timetables and fleet management."],
    hints: ["Think about booking, tracking and documents."],
    modelAnswer: "Booking and paying for tickets and freight online; tracking lorries and finding routes with GPS; sending transport documents electronically.",
    explanation: "ICT links many trends: e-ticketing, tracking, GPS, electronic documents and computerised scheduling.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, secs: 840,
    stem: "Chipo owns six lorries that carry groceries from Harare wholesalers to shops in Mashonaland Central. Last year one lorry and its load were stolen, and she suspects some drivers use her lorries for private trips. A supplier offers to fit tracking units to all six lorries for a fitting charge and a monthly fee per lorry.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which technology does a tracking unit use to find the lorry's position?",
        options: [["Satellite positioning (GPS)", "Correct: the unit finds its position by satellite and reports it over a mobile network."], ["E-ticketing", "E-ticketing is for booking and paying for journeys."], ["Containerisation", "Containers are boxes for goods, not positioning technology."], ["Toll collection", "Tolls charge for road use."]],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Explain **two** ways in which tracking would help Chipo's business.",
        points: [
          "Stolen lorries can be located and recovered quickly / theft deterred.",
          "So losses of lorries and loads fall (and insurers may charge lower premiums).",
          "Shows routes and stops, so private trips by drivers can be detected.",
          "So fuel costs and wear on lorries fall; customers can be told accurate arrival times.",
        ],
        modelAnswer: "If a lorry is stolen, its position can be found quickly, so it and its load are more likely to be recovered, and insurers may lower premiums. Chipo can also see each lorry's route and stops, so drivers cannot make private trips without being noticed, cutting fuel costs and wear.",
      }),
      P.manual({
        label: "(c)", marks: 6,
        stem: "Evaluate whether Chipo should accept the offer.",
        points: [
          "Benefit: recovery of stolen lorries and loads (large losses avoided).",
          "Benefit: lower fuel costs / better control of drivers / better customer service.",
          "Cost: fitting charge and monthly fees for six lorries.",
          "Limitation: needs network coverage in rural areas / drivers may resent being watched.",
          "Weighs cost against the size of possible losses (a whole lorry and load).",
          "Justified recommendation.",
        ],
        modelAnswer: "Tracking would help Chipo recover stolen lorries and loads, and would stop private trips, saving fuel and wear. Customers could be given accurate arrival times. Against this, she must pay a fitting charge and monthly fees for six lorries, network coverage may be weak on some rural routes, and drivers may resent being watched. One stolen lorry and load is worth far more than years of tracking fees, so she should accept the offer and explain to her drivers why it is needed.",
      }),
    ],
    hints: ["(c) Compare the fees with the value of one lorry and its load."],
    explanation: "(a) GPS. (b) Recovery of stolen vehicles; control of drivers' use of lorries. (c) The cost is small compared with the losses it prevents, though network coverage and staff relations need managing.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 780,
    stem: "More and more goods imported into Zimbabwe now arrive in containers rather than as loose cargo in sacks, crates and bundles.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Explain **two** advantages of containerisation to a Zimbabwean importer.",
        points: [
          "Sealed containers reduce theft and damage.",
          "So fewer losses and lower insurance and packaging costs.",
          "Fast transfer between ship, rail and road without unpacking.",
          "So goods reach landlocked Zimbabwe faster with less handling at the port.",
        ],
        modelAnswer: "Goods are sealed in a steel box, so theft and damage on the long journey fall, reducing losses and packaging costs. The same container moves from ship to train or lorry by crane, so goods reach Zimbabwe faster with less handling at the port.",
      }),
      P.manual({
        label: "(b)", marks: 6,
        stem: "Discuss the disadvantages of containerisation for Zimbabwe's transport system and workers.",
        points: [
          "Expensive cranes, terminals and special trailers or wagons are needed.",
          "Heavy containers damage roads not built for them.",
          "Fewer jobs for workers who once loaded and unloaded goods by hand.",
          "Empty containers must be returned to the coast, a cost with no revenue.",
          "Small importers may not fill a container / share a container.",
          "Conclusion weighing these against the benefits.",
        ],
        modelAnswer: "Containers need costly cranes, inland terminals and special trailers or wagons. Heavy container lorries damage roads that were not built for them, raising repair costs. Fewer workers are needed to load and unload goods, so some jobs are lost. Empty containers must be returned to the coast, which costs money without earning revenue, and small importers may not have enough goods to fill a container. These costs are real, but the gains in speed and security are large, so containerisation is still worth while if roads and terminals are improved.",
      }),
    ],
    hints: ["(b) Think about equipment, roads, jobs and empty containers."],
    explanation: "Containerisation speeds transfer between modes and reduces theft, but needs heavy investment and reduces manual jobs.",
  });
  b.card("DEFINITION", "What is **containerisation**?", "Carrying goods in standard sealed steel boxes that move between ships, trains and lorries without unpacking.");
  b.card("FACT", "Two advantages of containerisation?", "Fast loading and transfer between modes; less theft and damage; less packaging (any two).");
  b.card("DEFINITION", "What is a **toll gate**?", "A point on a road where users pay a fee used to build and maintain roads.");
  b.card("DEFINITION", "What is **vehicle tracking**?", "A system using GPS and mobile networks to show a vehicle's position, speed and route to its owner.");
  b.card("DEFINITION", "What is **e-ticketing**?", "Booking and paying for a journey electronically and receiving an electronic ticket.");
  b.card("CONCEPT", "GPS versus tracking?", "GPS finds a position for navigation; a tracking system reports that position to the owner.");
  b.card("FACT", "Goods that benefit from the growth of air cargo?", "Perishable and urgent goods: cut flowers, fresh vegetables for export, medicines, spare parts.");
  b.card("CONCEPT", "One disadvantage each: tolls, e-ticketing.", "Tolls raise transport costs; e-ticketing needs a phone, data and electronic payment.");
});
