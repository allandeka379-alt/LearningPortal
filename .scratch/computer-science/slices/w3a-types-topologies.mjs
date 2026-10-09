// Slice w3a: network types and topologies (comp.network.types-topologies, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const mesh = (n) => (n * (n - 1)) / 2;
const meshN = 6;
const meshCables = mesh(meshN);
const ringN = 7;

concept("comp.network.types-topologies", { file: "network/types-topologies", keyPrefix: "network.types-topologies" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which statement best describes a **local area network** (LAN)?",
    options: [
      ["A network covering one building or a group of nearby buildings", "Correct: a LAN covers a small area such as a school or office."],
      ["A network linking devices within a few metres of one person", "That is a personal area network (PAN)."],
      ["A network linking offices in different towns or countries", "That is a wide area network (WAN)."],
      ["A network covering most of one town or city", "That is a metropolitan area network (MAN)."],
    ],
    answer: "A",
    explanation: "A LAN covers a small geographical area, such as one building or a campus, and is usually owned by the organisation that uses it.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Tatenda's phone is linked by Bluetooth to his wireless earphones and his fitness watch. What type of network is this?",
    options: [
      ["Personal area network", "Correct: a PAN links devices around one person, over a few metres."],
      ["Local area network", "A LAN covers a building, not just one person's devices."],
      ["Metropolitan area network", "A MAN covers a town or city."],
      ["Wide area network", "A WAN covers a country or the world."],
    ],
    answer: "A",
    explanation: "A PAN connects a person's own devices over a few metres, often using Bluetooth.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A building society links the computers in its branches in Harare, Kwekwe and Masvingo so that customer accounts can be updated from any branch. What type of network links the branches?",
    options: [
      ["Wide area network", "Correct: the branches are in different towns, so the network covers a large area."],
      ["Local area network", "Each branch may have a LAN, but the link between towns is a WAN."],
      ["Personal area network", "A PAN covers only a few metres."],
      ["Peer-to-peer network", "This describes how computers share resources, not the area covered."],
    ],
    answer: "A",
    explanation: "A network that spans several towns is a WAN; it normally uses links rented from telecommunication companies.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In a star topology, which failure stops **every** computer on the network from communicating?",
    options: [
      ["Failure of the central switch", "Correct: every node depends on the central device."],
      ["Failure of one computer's network cable", "Only that computer loses its connection."],
      ["Failure of one workstation", "The other nodes keep working because each has its own cable."],
      ["Failure of the network printer", "Only printing is affected; computers still communicate."],
    ],
    answer: "A",
    explanation: "In a star network the central switch (or hub) is the single point of failure; a fault on one cable or node affects only that node.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Think about what happens to a signal when it reaches the open end of a cable."],
    stem: "Why is a **terminator** fitted at each end of the backbone cable in a bus network?",
    options: [
      ["To absorb signals so that they do not reflect back along the cable", "Correct: reflected signals would collide with new data."],
      ["To send data only to the computer it is addressed to", "That is what a switch does in a star network."],
      ["To boost the signal so that it can travel further along the backbone cable", "That is the job of a repeater."],
      ["To connect the bus network to the internet", "A router connects a LAN to the internet."],
    ],
    answer: "A",
    explanation: "A terminator absorbs the signal at the end of the backbone; without it the signal would bounce back and corrupt other data.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["In a ring, data passes through every node in turn."],
    stem: "Which is a **disadvantage** of a ring topology?",
    options: [
      ["A break in the ring or one failed node can stop the whole network", "Correct: data must pass round the loop through every node."],
      ["Data collisions increase sharply as more nodes are added", "Data flows one way round a ring, so there are no collisions; collisions are a bus problem."],
      ["It needs a direct cable between every pair of nodes", "That describes a full mesh."],
      ["Every node needs its own cable to a central switch", "That describes a star."],
    ],
    answer: "A",
    explanation: "Because data travels round the loop through each node, one break or one failed node can stop all communication; adding a node also means breaking the ring.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["What happens to data in a mesh if one link is cut?"],
    stem: "Why is a mesh topology very reliable?",
    options: [
      ["If one link fails, data can travel by a different route", "Correct: there are many paths between nodes."],
      ["All data passes through a single central device", "That describes a star, and the central device is a weak point."],
      ["It uses less cable than any other topology", "A mesh uses the most cable; the bus uses the least."],
      ["Data travels round the network in one direction only", "That describes a ring."],
    ],
    answer: "A",
    explanation: "Each node in a mesh has several links, so data is re-routed when one link fails. The cost is the large amount of cabling.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which network type has no central computer to look after files and backups?"],
    stem: "Chipo runs a hair salon with three computers. She wants each computer to share its files and the one printer, with no extra hardware to buy and no network manager. Which arrangement suits her best?",
    options: [
      ["A peer-to-peer network", "Correct: equal computers share their own files and printer cheaply."],
      ["A client-server network with a dedicated file server", "It would work, but the server and its management cost money she does not need to spend."],
      ["A metropolitan area network", "A MAN covers a whole town; the salon is one room."],
      ["A full mesh with a cable between every pair of computers", "Mesh layout is about cabling, and it is costly; it does not decide how files are shared."],
    ],
    answer: "A",
    explanation: "Peer-to-peer suits a few computers on a small budget: each computer shares its own resources. Its drawbacks (no central backup or security) matter little for three computers.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "In a star network, if the cable to one computer breaks, every computer on the network loses its connection.",
    answer: false,
    explanation: "False. Each computer in a star has its own cable to the switch, so only the computer with the broken cable is affected.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "The internet is an example of a wide area network.",
    answer: true,
    explanation: "True. The internet links networks all over the world; it is the largest WAN.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each topology to its description.",
    pairs: [
      ["Star", "Each node has its own cable to a central switch"],
      ["Bus", "All nodes share one backbone cable with a terminator at each end"],
      ["Ring", "Each node connects to exactly two others in a closed loop"],
      ["Mesh", "Nodes have several links, so data can take different routes"],
    ],
    explanation: "Star: central switch. Bus: shared backbone. Ring: closed loop. Mesh: multiple links between nodes.",
  });
  b.match({
    d: 2, skill: "APPLICATION",
    stem: "Match each network to its type.",
    pairs: [
      ["A laptop, phone and wireless mouse used by one person at a desk", "PAN"],
      ["The thirty computers in one school laboratory", "LAN"],
      ["A city council's offices linked across Bulawayo", "MAN"],
      ["A supermarket chain's tills in towns across Zimbabwe", "WAN"],
    ],
    explanation: "Area covered: one person (PAN), one building (LAN), one city (MAN), many towns or countries (WAN).",
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Each computer links to every other computer.", "Each cable joins two computers, so do not count it twice."],
    stem: `A testing centre wants a **full mesh** network joining ${meshN} computers, with a direct cable between every pair of computers. How many cables are needed?`,
    value: meshCables,
    wrong: [meshN * (meshN - 1), meshN],
    explanation: `Each of the ${meshN} computers links to ${meshN - 1} others: ${meshN} × ${meshN - 1} = ${meshN * (meshN - 1)} cable ends, and each cable has two ends, so ${meshN * (meshN - 1)} ÷ 2 = ${meshCables} cables.`,
    workedSolution: `1. Each computer needs a link to ${meshN - 1} others.\n2. ${meshN} × ${meshN - 1} = ${meshN * (meshN - 1)} counts every cable twice.\n3. ${meshN * (meshN - 1)} ÷ 2 = ${meshCables} cables.`,
  });
  b.num({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `A star network has ${ringN} computers connected to one switch. How many cables run from computers to the switch?`,
    value: ringN,
    wrong: [mesh(ringN)],
    explanation: `In a star each computer has one cable to the central switch, so ${ringN} computers need ${ringN} cables.`,
    workedSolution: `1. In a star, each computer has exactly one cable to the switch.\n2. ${ringN} computers × 1 cable = ${ringN} cables.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the description of a bus network.",
    template: "All the nodes are connected to one main cable called the {{blank:a}}. A {{blank:b}} is fitted at each end of it. Only one node can transmit at a time, so as more nodes are added the number of data {{blank:c}} rises.",
    blanks: [
      { id: "a", accepted: ["backbone"], choices: ["backbone", "switch", "router", "ring"] },
      { id: "b", accepted: ["terminator"], choices: ["terminator", "repeater", "switch", "modem"] },
      { id: "c", accepted: ["collisions"], choices: ["collisions", "addresses", "protocols", "terminators"] },
    ],
    explanation: "A bus uses a single backbone with terminators at the ends; because nodes share the cable, collisions increase with more nodes.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the topology in which each node is connected to exactly two other nodes to form a closed loop.",
    accepted: ["ring", "ring topology", "a ring", "ring network"],
    wrong: ["bus"],
    explanation: "In a ring topology the nodes form a closed loop and data travels round it in one direction.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think of hardware and of files."],
    stem: "Explain **two** advantages to a school of connecting its computers in a network rather than leaving them stand-alone.",
    points: [
      "Hardware such as printers (or one internet connection) can be shared, so fewer devices need to be bought",
      "Files are stored centrally, so learners can log in at any computer to reach their work / backups and updates are done centrally",
    ],
    explanation: "Networks let users share hardware, software, data and an internet connection, and allow central storage, backup and management.",
    modelAnswer: "One printer and one internet connection can be shared by every computer, which saves money. Learners' work is stored on the server, so they can log in at any computer and their files are backed up centrally.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 3,
    hints: ["Consider security, backup and cost."],
    stem: "A secondary school has 120 computers used by learners and staff. Explain why a **client-server** network is more suitable for it than a peer-to-peer network.",
    points: [
      "A server stores files centrally, so they can be backed up in one place",
      "Security is managed centrally: user logins/accounts and access rights control who sees which files",
      "Learners can reach their files from any computer, and with 120 computers a peer-to-peer network would be too hard to manage (files spread over many machines)",
    ],
    explanation: "Client-server networks give central storage, backup and security, which matter for a large number of users; peer-to-peer suits only a few computers.",
    modelAnswer: "With a server, all work is stored and backed up in one place, and the network manager can set up user accounts so that learners cannot open staff files. A learner can log in at any of the 120 computers and find her files, whereas in a peer-to-peer network files would be scattered over many computers that might be switched off.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Which device is the single point of failure in a star?", "Relate each advantage to the clinic's needs."],
    stem: "A clinic in Chinhoyi has ten computers in one building: six in the consulting rooms and four at reception. It wants the computers to share patient records stored on one server and to use one printer.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which type of network does the clinic need?",
        options: [
          ["LAN", "Correct: all the computers are in one building."],
          ["WAN", "A WAN covers several towns or countries."],
          ["PAN", "A PAN covers one person's devices."],
          ["MAN", "A MAN covers a town or city."],
        ],
        answer: "A", explanation: "One building: a local area network.",
      }),
      P.short({
        label: "(b)", stem: "The clinic chooses a star topology. Name the central device to which every computer is connected.",
        accepted: ["switch", "a switch", "network switch", "hub", "a hub"],
        wrong: ["router"],
        explanation: "A star has a switch (or, in older networks, a hub) at the centre.",
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain **one** advantage of the star topology for the clinic.",
        points: [
          "If one computer or cable fails, the other computers keep working",
          "because each computer has its own cable to the switch (so reception can keep booking patients)",
        ],
        modelAnswer: "If a consulting-room computer or its cable develops a fault, reception can still use the records, because each computer has its own separate cable to the switch.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Describe **one** risk of the star topology for the clinic and suggest how the clinic could reduce it.",
        points: [
          "If the central switch fails, no computer can reach the server or printer",
          "Keep a spare switch / use a good-quality switch with a backup power supply",
        ],
        modelAnswer: "If the switch fails the whole network stops and nobody can open patient records, so the clinic should keep a spare switch ready and protect it with a backup power supply.",
      }),
    ],
    explanation: "(a) LAN (b) switch.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["A bus shares one cable; a ring sends data one way round a loop.", "Compare cost, reliability and expansion."],
    stem: "Farai is setting up a network for a small accounting firm in Bulawayo. He is choosing between a **bus** and a **ring** topology for its five computers.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which statement about a bus network is correct?",
        options: [
          ["It uses less cable than a star with the same computers", "Correct: one backbone with short drop cables."],
          ["Data travels in one direction through every node", "That describes a ring."],
          ["Each computer has a direct cable to every other", "That describes a full mesh."],
          ["It continues working if the backbone is cut", "A cut backbone stops the whole bus network."],
        ],
        answer: "A", explanation: "A bus uses the least cable of the topologies.",
      }),
      P.tf({
        label: "(b)", stem: "In a ring network, data collisions are frequent because all nodes transmit on the same cable at once.",
        answer: false, explanation: "False. Data flows one way round a ring, so there are no collisions.",
      }),
      P.num({
        label: "(c)", stem: "How many cables are needed to join the five computers in a ring?",
        value: 5, wrong: [mesh(5)],
        explanation: "In a ring each computer connects to the next and the last connects back to the first: five computers need five cables.",
        workedSolution: "1. Each computer is joined to the next one round the loop.\n2. The last computer joins back to the first, closing the ring.\n3. Five computers need 5 cables.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Describe **two** disadvantages of the bus topology for the firm.",
        points: [
          "If the backbone cable breaks, the whole network stops",
          "Performance falls as traffic grows because only one computer can transmit at a time (collisions) / faults are hard to find",
        ],
        modelAnswer: "A single break in the backbone stops every computer, and because the computers share one cable, data collisions slow the network down when several staff send data at once.",
      }),
      P.manual({
        label: "(e)", marks: 3,
        stem: "The firm expects to grow to twelve computers. Recommend a topology for the firm and justify your choice.",
        points: [
          "Recommends a star (or another topology with a valid justification)",
          "New computers are added easily with one cable each to the switch, without stopping the network",
          "One faulty cable or computer does not stop the others / fewer collisions because the switch sends data only to its destination",
        ],
        modelAnswer: "A star. Each new computer is added with one cable to the switch without breaking the network, a faulty cable affects only one computer, and the switch sends data only to the right computer, so performance stays good as the firm grows.",
      }),
    ],
    explanation: "(a) uses less cable (b) false (c) 5.",
  });

  b.card("DEFINITION", "What is a **computer network**?", "Two or more computers or devices connected so that they can communicate and share data, software and hardware.");
  b.card("DEFINITION", "What is a **network topology**?", "The layout of a network: how its nodes are connected to one another.");
  b.card("FACT", "PAN, LAN, MAN, WAN: what area does each cover?", "PAN: a few metres around one person. LAN: one building or site. MAN: a town or city. WAN: a country or the world.");
  b.card("CONCEPT", "Star topology: main advantage and main disadvantage?", "One failed cable or computer affects only that node; but if the central switch fails the whole network stops.");
  b.card("CONCEPT", "Bus topology: main advantage and main disadvantage?", "Cheap, uses the least cable; but a break in the backbone stops the whole network and collisions rise with more nodes.");
  b.card("CONCEPT", "Ring topology: how does data travel?", "In one direction round a closed loop, through each node in turn; no collisions, but one break can stop the network.");
  b.card("CONCEPT", "Why is a mesh network reliable?", "Nodes have several links, so if one link fails data takes another route.", "A full mesh of n nodes needs n(n − 1) ÷ 2 cables, so it is expensive.");
  b.card("CONCEPT", "Client-server compared with peer-to-peer?", "Client-server: central servers hold files and control security and backups. Peer-to-peer: equal computers share their own resources; cheap but no central control.");
  b.card("FACT", "What does a terminator do in a bus network?", "It absorbs the signal at the end of the backbone so it does not reflect back and corrupt data.");
});
