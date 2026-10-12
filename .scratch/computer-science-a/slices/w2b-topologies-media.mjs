// Slice w2b: topologies and transmission media (acs.network.topologies-media, Cambridge only).
import { concept, P, chk } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { links } from "../tables/w2b-topologies-media.mjs";

concept("acs.network.topologies-media", { file: "network/topologies-media", keyPrefix: "network.topologies-media" }, (b) => {
  mc(b, 1, "RECALL", "In which topology does every device connect to a central switch?",
    ["Star", "Correct: each device has its own cable to the central device."],
    [["Bus", "A bus uses one shared backbone cable."], ["Full mesh", "A full mesh joins every device to every other device."], ["Ring", "A ring joins each device to two neighbours; it is not the layout described."]],
    "A star has a central switch with a cable to each device.");
  mc(b, 2, "UNDERSTANDING", "What is the effect of one cable breaking in a star network?",
    ["Only the device on that cable loses its connection", "Correct: the other cables are independent."],
    [["The whole network stops", "That happens when the central switch fails, not when one cable breaks."], ["Data is sent through another route automatically by the switch", "A star has only one route to the switch for each device."], ["All the devices slow down", "The other devices keep working at their normal speed."]],
    "Each device has its own cable, so the fault is limited to one device.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why is the terminator fitted at each end of a bus backbone?",
    ["To stop signals reflecting back along the cable", "Correct: reflections would corrupt later signals."],
    [["To connect the backbone to the internet or to a router", "A terminator does not connect to anything."], ["To make the signal stronger", "A terminator absorbs signals; it does not amplify them."], ["To give each device an address", "Addresses are given by network software and cards."]],
    "A terminator absorbs the signal at the end so that it does not bounce back.", { daily: true });
  mc(b, 2, "RECALL", "Which transmission medium is not affected by electromagnetic interference?",
    ["Fibre-optic cable", "Correct: it carries light, not electricity."],
    [["Twisted-pair cable", "Copper cable can pick up interference from motors and power cables."], ["WiFi radio waves", "Radio is affected by interference from other devices."], ["Coaxial cable", "Coaxial cable carries electrical signals and is less affected than twisted pair, but it is not immune."]],
    "Light in a glass fibre is not disturbed by electromagnetic fields.");
  mc(b, 3, "APPLICATION", "A hospital in Harare needs its main routers to keep communicating even when one link is cut. Which topology gives the best protection?",
    ["Mesh", "Correct: several routes exist between devices."],
    [["Bus", "A cut in the backbone can stop the network."], ["Star", "The central switch and its single cables are points of failure."], ["A single long fibre cable", "One cable is a single point of failure whatever it is made of."]],
    "A mesh gives data several routes to follow.", { hints: ["Which topology offers more than one route?"] });
  mc(b, 3, "ANALYSIS", "Which statement explains why a full mesh is rarely used in a small office network?",
    ["The number of links grows quickly as devices are added", "Correct: n(n − 1) ÷ 2 links is expensive."],
    [["Data cannot find a route to its destination across the network", "A mesh has many routes."], ["Every device would need to be a server", "Devices do not become servers in a mesh."], ["Wireless devices cannot be joined to it", "A wireless mesh is possible."]],
    "The cost of links and ports rises sharply with the number of devices.", { hints: ["Work out the links for 4 devices and for 10."] });
  mc(b, 4, "EVALUATION", "A farm in Chinhoyi needs to link an office to a pump house 40 km away across open land. Which medium is the most suitable?",
    ["A microwave link between two masts", "Correct: a long line-of-sight link without laying cable."],
    [["Twisted-pair cable", "Twisted pair attenuates over about 100 m."], ["WiFi from a single access point", "WiFi range is tens of metres."], ["Coaxial cable", "Coaxial cable also attenuates quickly over 40 km and would be costly to lay."]],
    "Microwaves span tens of kilometres in line of sight without a cable.", { hints: ["Which media can cover tens of kilometres without laying cable?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a star network, the failure of the central switch stops communication between all the devices.", answer: true, explanation: "True. All traffic passes through the switch." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A bus topology normally uses more cable than a star topology.", answer: false, explanation: "False. A bus uses a single backbone and short drop cables, so it normally needs less cable than a star." });
  b.tf({ d: 2, skill: "RECALL", stem: "Satellite links cover remote areas but have a longer delay than a cable link.", answer: true, explanation: "True. The signal travels to the satellite and back, which takes longer." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each medium to a feature.",
    pairs: [["Fibre-optic cable", "Carries pulses of light with very low attenuation"], ["Twisted-pair cable", "Cheap copper cable used in LANs, up to about 100 m"], ["Microwave link", "Narrow beam between two dishes in line of sight"], ["Satellite link", "Covers remote areas but with a longer delay"], ["WiFi", "Radio waves that allow devices to move around"]],
    explanation: "Each medium has a characteristic range, cost and signal." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about wired and wireless networks.",
    template: "A wireless network gives better {{blank:a}} because devices can move. A wired network is usually {{blank:b}} secure because signals are harder to intercept. The weakening of a signal along a cable is called {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["mobility"], choices: ["mobility", "attenuation", "bandwidth", "interference"] },
      { id: "b", accepted: ["more"], choices: ["more", "less", "equally", "never"] },
      { id: "c", accepted: ["attenuation"], choices: ["attenuation", "mobility", "encryption", "latency"] },
    ], explanation: "Wireless gives mobility; wired is harder to intercept; the weakening of a signal is attenuation." });
  chk(links(7), 21);
  b.num({ d: 2, skill: "APPLICATION", daily: true, hints: ["Use n(n − 1) ÷ 2."],
    stem: "How many links are needed to join 7 devices in a full mesh?",
    value: 21, wrong: [42, 7], workedSolution: "1. Links = n(n − 1) ÷ 2.\n2. = 7 × 6 ÷ 2 = 21.", explanation: "7 × 6 ÷ 2 = 21 links." });
  chk(links(12), 66);
  b.num({ d: 3, skill: "APPLICATION", hints: ["A full mesh of n devices needs n(n − 1) ÷ 2 links."],
    stem: "A research centre joins 12 computers in a full mesh. How many links does it need?",
    value: 66, wrong: [132, 144], workedSolution: "1. Links = 12 × 11 ÷ 2.\n2. = 132 ÷ 2 = 66.", explanation: "12 × 11 ÷ 2 = 66 links." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Each device connects to every other device."],
    stem: "In a full mesh of 9 devices, how many cable ports does each device need?",
    value: 8, wrong: [9, 36], workedSolution: "1. Each device is joined to the 8 others.\n2. So each needs 8 ports.", explanation: "n − 1 = 8 ports." });
  const star = [4, 7, 9, 10, 15, 20].reduce((a, c) => a + c, 0);
  chk(star, 65);
  b.num({ d: 3, skill: "APPLICATION", unit: undefined, hints: ["Add the six cable lengths."],
    stem: "Six computers in a Gweru office are connected in a star. The cable lengths from the switch are 4 m, 7 m, 9 m, 10 m, 15 m and 20 m. Calculate the total length of cable in metres.",
    value: 65, wrong: [20, 30], workedSolution: "1. Add the lengths.\n2. 4 + 7 + 9 + 10 + 15 + 20 = 65 m.", explanation: "Total 65 m." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two points about each topology."],
    stem: "Compare a bus topology with a star topology. [4]",
    points: ["A bus uses a single shared backbone whereas a star has a cable from each device to a central switch", "A bus needs less cable / is cheaper", "A fault in the backbone can affect the whole bus network but a broken cable in a star affects one device", "Performance falls as devices are added to a bus (collisions) but a switch sends data only to the receiver in a star"],
    modelAnswer: "A bus uses one shared backbone but a star has a separate cable from each device to a switch. A bus needs less cable, but a fault in the backbone can stop the whole network, while a broken cable in a star affects one device. A bus slows as devices are added because of collisions, whereas the switch in a star sends data only to the receiver.",
    explanation: "Layout, cable, failure and performance; any four creditworthy differences." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 3, hints: ["Compare the speed, range and interference of each medium."],
    stem: "A school in Masvingo wants to connect two buildings 250 m apart. Give two reasons why fibre-optic cable is a better choice than twisted-pair cable. [3]",
    points: ["Twisted-pair cable loses signal strength (attenuation) after about 100 m but fibre can cover 250 m easily", "Fibre is not affected by electromagnetic interference, for example from lightning or motors", "Fibre has a higher bandwidth"],
    modelAnswer: "Twisted pair is limited to about 100 m, while fibre has low attenuation and covers 250 m. Fibre is also unaffected by electromagnetic interference such as lightning, and it has a higher bandwidth.",
    explanation: "Distance, interference, bandwidth." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Compare mobility, security, speed, installation."],
    stem: "Discuss the advantages and disadvantages of using a wireless network instead of a wired network in a hotel. [4]",
    points: ["Guests can move around and connect without being limited by cable length (mobility)", "No cables need to be installed through the walls, so installation is easier", "Signals may be intercepted by anyone in range unless they are encrypted", "Speed is generally lower and can be affected by walls and interference"],
    modelAnswer: "Guests can move around the hotel and connect from any room, and no cabling is needed through the walls. However, signals can be intercepted unless encrypted, and the speed is generally lower and affected by walls and interference.",
    explanation: "Two advantages and two disadvantages." });
  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["Think about what is in line of sight."],
    stem: "State two limitations of a microwave link. [2]",
    points: ["The transmitter and receiver must be in line of sight", "Heavy rain or obstacles can weaken or block the signal"],
    modelAnswer: "The two dishes must be in line of sight, and heavy rain or obstacles can weaken the signal.",
    explanation: "Line of sight and weather." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Read the layout carefully before answering.", "Think about what a failure affects."],
    explanation: "A hybrid of two stars joined by a backbone; a cable fault affects one device, a switch fault affects its room, a backbone fault splits the two rooms.",
    stem: "A school in Bulawayo has two computer rooms. In each room every computer has its own cable to a switch. The two switches are joined by one fibre-optic backbone cable.",
    parts: [
      pm("(a)", "What is the name of the combined topology used by the school?", ["Hybrid", "Correct: two stars joined by a backbone."], [["Full mesh", "Not every device is joined to every other."], ["Bus", "A bus has one shared cable for all devices."], ["Satellite", "A satellite is a type of link, not a topology."]], "Stars joined together form a hybrid."),
      P.manual({ label: "(b)", marks: 2, stem: "State what happens if the cable between one computer and its switch is cut.", points: ["Only that computer loses its connection", "The other computers in both rooms continue to work"], modelAnswer: "Only that computer is disconnected; the others continue to work.", explanation: "Cable fault in a star." }),
      P.manual({ label: "(c)", marks: 2, stem: "State what happens if the fibre-optic backbone is cut.", points: ["The two rooms can no longer communicate with each other", "Computers in the same room can still communicate / the network in each room still works"], modelAnswer: "The two rooms cannot communicate with each other, but computers in the same room still can.", explanation: "Backbone fault." }),
      pm("(d)", "Which feature of fibre-optic cable makes it suitable for the backbone between the rooms?", ["It carries a high bandwidth with very little attenuation", "Correct: it can carry the traffic of both rooms."], [["It is cheaper than twisted pair", "Fibre costs more than twisted pair."], ["It uses radio waves, so no cable is needed between the two rooms", "Fibre carries light in a cable."], ["It can only carry data in one direction", "Fibre links can carry data both ways."]], "High bandwidth and low attenuation."),
    ] });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Use numbers from the stem.", "Link each answer to the scenario."],
    explanation: "A full mesh of 5 branches needs 10 links; a star needs 5; the mesh is more reliable but costs more.",
    stem: "A bank has five branches in Harare, Mutare, Gweru, Bulawayo and Masvingo. Its managers compare joining the branches in a full mesh with joining each branch to the head office in Harare in a star.",
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "How many links are needed to join the five branches in a full mesh?", value: links(5), wrong: [5, 20], workedSolution: "1. 5 × 4 ÷ 2 = 10.", explanation: "5 × 4 ÷ 2 = 10 links." }),
      P.num({ label: "(b)", marks: 1, stem: "How many links are needed if each of the four other branches is joined to the head office only?", value: 4, wrong: [5, 10], workedSolution: "1. Four branches each have one link to the head office = 4 links.", explanation: "One link per other branch." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give one advantage of the mesh over the star for the bank.", points: ["If a link fails, data can be sent by another route", "The branches can still communicate when the head office link or device fails"], modelAnswer: "If a link fails, data can use another route, so the branches can still communicate.", explanation: "Redundancy." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give one disadvantage of the mesh over the star.", points: ["More links are needed, so the installation and rental costs are higher", "Each branch needs more ports and the network is more complex to manage"], modelAnswer: "It needs 10 links instead of 4, so it costs more, and each branch needs more equipment.", explanation: "Cost and complexity." }),
    ] });
  b.card("DEFINITION", "Network topology", "The arrangement of nodes and links in a network.");
  b.card("CONCEPT", "Bus topology", "All devices share one backbone with a terminator at each end; cheap, but collisions and a backbone fault affects everything.");
  b.card("CONCEPT", "Star topology", "Each device has its own cable to a central switch; one cable fault affects one device, a switch fault affects all.");
  b.card("FORMULA", "Links in a full mesh", "Links = n(n − 1) ÷ 2; each device needs n − 1 ports.");
  b.card("CONCEPT", "Hybrid topology", "A combination of topologies, for example stars linked by a backbone.");
  b.card("DEFINITION", "Attenuation", "The weakening of a signal as it travels along a medium.");
  b.card("FACT", "Fibre-optic cable", "Pulses of light; very high bandwidth; very low attenuation; immune to electromagnetic interference; costly.");
  b.card("FACT", "Microwave and satellite", "Microwave: narrow beam in line of sight over tens of kilometres. Satellite: wide coverage, remote areas, longer delay, costly.");
});
