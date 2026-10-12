// Slice w2b: circuit switching and packet switching (acs.network.switching, Cambridge only).
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { packetise, lookup, HDR, TRL } from "../tables/w2b-switching.mjs";

const pk = packetise(3200, 800);
chk(pk.length, 4);
chk(pk.reduce((a, x) => a + x.size, 0), 3296);
const mdOf = (t) => mdTable(["Destination network", "Next hop"], [...t.map((r) => [`${r[0]}/${r[1]}`, r[2]]), ["Anything else", "Default gateway"]]);
const t1 = [["10.30.0.0", 16, "Router P"], ["198.51.100.0", 23, "Router Q"], ["172.28.80.0", 20, "Router R"]];
const t2 = [["172.20.0.0", 18, "Router X"], ["203.0.113.128", 25, "Router Y"], ["10.50.4.0", 22, "Router Z"]];
const t3 = [["10.70.16.0", 21, "Router M"], ["172.30.16.0", 20, "Router N"], ["192.0.2.0", 25, "Router O"]];
same(lookup(t1, "172.28.90.9"), "Router R");
same(lookup(t2, "41.57.3.1"), "default gateway");
same(lookup(t3, "192.0.2.77"), "Router O");
same(lookup(t3, "45.60.2.9"), "default gateway");
const md1 = mdOf(t1), md2 = mdOf(t2), md3 = mdOf(t3);

concept("acs.network.switching", { file: "network/switching", keyPrefix: "network.switching" }, (b) => {
  mc(b, 1, "RECALL", "In circuit switching, when is the path between the two users set up?",
    ["Before any data is sent", "Correct: the circuit is established first."],
    [["After the first packet arrives", "Circuit switching does not use packets."], ["Separately for each packet", "That describes packet switching."], ["Only when the call ends", "The path is released at the end."]],
    "A dedicated path is set up first, used, then released.");
  mc(b, 2, "UNDERSTANDING", "Which statement is true of packet switching?",
    ["The packets of one message can take different routes", "Correct."],
    [["A dedicated path is reserved before the message is sent", "That describes circuit switching."], ["Packets always arrive in the order in which they were sent", "They may arrive out of order and are reassembled."], ["The router reassembles the message", "Reassembly is done at the destination."]],
    "Each packet is routed independently.", { daily: true });
  mc(b, 2, "RECALL", "Which part of a packet holds the packet number and the destination address?",
    ["The header", "Correct."],
    [["The payload", "The payload holds the data."], ["The trailer", "The trailer holds the end marker and error check."], ["The router", "A router is a device, not part of a packet."]],
    "The header carries control information.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which network is a typical use of circuit switching?",
    ["A traditional telephone call", "Correct."],
    [["Loading a web page", "The web uses packet switching."], ["Sending an email", "Email is carried in packets."], ["Downloading a file from a web server", "Downloads are carried in packets."]],
    "The traditional telephone network reserves a circuit for each call.");
  mc(b, 3, "ANALYSIS", "Why is packet switching more efficient than circuit switching for web browsing?",
    ["Capacity is used only when packets are sent, so it can be shared", "Correct: no capacity is reserved while the user is reading."],
    [["Every user has a reserved path for the whole length of the session", "Reserved paths belong to circuit switching."], ["Packets are never lost", "Packets can be lost or delayed."], ["No headers are needed", "Packets need headers."]],
    "Browsing sends data in bursts; packet switching lets others use the gaps.", { hints: ["What happens to a reserved circuit while the user reads a page?"] });
  mc(b, 3, "UNDERSTANDING", "What is the purpose of the time-to-live (TTL) value in a packet?",
    ["To stop packets circulating for ever in the network", "Correct: a packet is discarded when it reaches zero."],
    [["To hold the number of the packet in the whole message", "That is the packet number."], ["To encrypt the payload", "TTL does not encrypt."], ["To show how many bytes the payload contains", "TTL does not hold the length."]],
    "Each router reduces TTL by 1 and discards the packet at 0.", { hints: ["What does each router do to the TTL?"] });
  mc(b, 4, "EVALUATION", "A cable on one route across the country is cut during a live video call over the internet. Which statement describes the likely effect?",
    ["Routers send the packets another way, so there is a short break but the call continues", "Correct: packet switching can reroute."],
    [["The call is lost for the whole time of the cut because the circuit is broken and cannot be rebuilt", "A reserved circuit is a feature of circuit switching."], ["All the packets are delivered with no delay", "The change of route can cause delay and some loss."], ["The packets are repeated until the cable is repaired", "Routers do not wait for a repair; they use another route if one exists."]],
    "Packet-switched networks can route around a failure.", { hints: ["Is there a fixed path for each packet?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "In circuit switching the bandwidth of the path is reserved for the whole call.", answer: true, explanation: "True. The capacity cannot be used by others, even in silence." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "The packets of a message must travel through the network in the order in which they were numbered.", answer: false, explanation: "False. They can take different routes and arrive out of order; the destination puts them in order using the packet numbers." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each feature to circuit switching or packet switching.",
    pairs: ["A dedicated path is set up first", "The message is split into packets", "Capacity is wasted during silence", "Packets can be sent by a different route if a link fails"], right: ["Circuit switching", "Packet switching"], rightIndex: [0, 1, 0, 1],
    explanation: "Dedicated and wasted: circuit. Split and rerouted: packet." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the description of a packet.",
    template: "The {{blank:a}} contains the source and destination addresses and the packet number. The {{blank:b}} contains the data. The {{blank:c}} marks the end of the packet and holds an error check.",
    blanks: [
      { id: "a", accepted: ["header"], choices: ["header", "payload", "trailer", "router"] },
      { id: "b", accepted: ["payload"], choices: ["payload", "header", "trailer", "gateway"] },
      { id: "c", accepted: ["trailer"], choices: ["trailer", "header", "payload", "frame"] },
    ], explanation: "Header, payload, trailer." });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Divide the message by the payload size and round up."],
    stem: "A message of 3200 bytes is sent with a payload of at most 800 bytes in each packet. How many packets are needed?",
    value: 4, wrong: [3, 5], workedSolution: "1. 3200 ÷ 800 = 4.\n2. 4 packets are needed.", explanation: "3200 ÷ 800 = 4 packets." });
  b.num({ d: 3, skill: "APPLICATION", unit: "bytes", calculator: false, hints: ["Each packet adds a 20-byte header and a 4-byte trailer."],
    stem: "Each packet in the message above also has a header of 20 bytes and a trailer of 4 bytes. Calculate the total number of bytes sent.",
    value: 3296, wrong: [3200, 3220], workedSolution: "1. Each packet adds 20 + 4 = 24 bytes.\n2. 4 packets add 4 × 24 = 96 bytes.\n3. Total = 3200 + 96 = 3296 bytes.", explanation: "3200 + 4 × 24 = 3296 bytes." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Find the row whose network contains the address."], normalise: ["trim", "lowercase", "collapse_whitespace"],
    stem: `A router has this routing table.\n\n${md1}\n\nWhich next hop is used for a packet addressed to 172.28.90.9? (172.28.80.0/20 covers 172.28.80.0 to 172.28.95.255.)`,
    accepted: ["Router R", "R"], wrong: ["Router P"], explanation: "172.28.90.9 lies between 172.28.80.0 and 172.28.95.255, so the next hop is Router R." });
  b.mcq({ d: 3, skill: "APPLICATION", hints: ["Does any row of the table include this address?"],
    stem: `A router has this routing table.\n\n${md2}\n\nWhere is a packet addressed to 41.57.3.1 sent?`,
    options: [["The default gateway", "Correct: no row matches the address."], ["Router X", "Router X handles only addresses beginning 172.20.0.0 to 172.20.63.255."], ["Router Y", "Router Y handles only 203.0.113.128 to 203.0.113.255."], ["The packet is discarded at once", "Without a matching row the router uses its default route."]], answer: "A",
    explanation: "The address matches none of the listed networks, so the default route is used." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four steps from splitting to reassembly."],
    stem: "Describe how a message is sent across a network using packet switching. [4]",
    points: ["The message is divided into packets, each with a header, payload and trailer", "Each packet contains the destination address and a packet number", "Routers read the destination address and forward each packet to the next hop; packets may take different routes", "At the destination the packets are put in order using the packet numbers and reassembled"],
    modelAnswer: "The message is divided into packets, each with a header, payload and trailer. The header has the destination address and a packet number. Routers read the destination address and forward each packet to the next hop, and packets may take different routes. At the destination the packets are put in order using their numbers and reassembled.",
    explanation: "Split, label, route, reassemble." });
  b.manualShort({ d: 3, skill: "ANALYSIS", marks: 4, hints: ["Two benefits and two drawbacks of circuit switching."],
    stem: "Discuss the benefits and drawbacks of circuit switching for a telephone call. [4]",
    points: ["Benefit: the bandwidth is guaranteed, so the voice is steady", "Benefit: data arrives in order with a constant, small delay", "Drawback: the circuit must be set up before the call begins", "Drawback: the reserved capacity is wasted when nobody is speaking"],
    modelAnswer: "The bandwidth is guaranteed, so the voice is steady and arrives in order with a small, constant delay. However, the circuit must be set up before the call and the reserved capacity is wasted when nobody is speaking.",
    explanation: "Two benefits and two drawbacks." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What does a router read and what does it consult?"],
    stem: "Explain the role of a router in packet switching. [3]",
    points: ["It reads the destination address in the header of each packet", "It looks up the address in its routing table to find the next hop", "It forwards the packet to the next router towards the destination"],
    modelAnswer: "The router reads the destination address in each packet's header, looks it up in its routing table to find the next hop, and forwards the packet to the next router towards the destination.",
    explanation: "Read, look up, forward." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["Think about what could go wrong in a network."],
    stem: "Explain why the packets of a message may arrive in a different order from the one in which they were sent. [2]",
    points: ["The packets may be sent by different routes", "Some routes are slower or more crowded, so a later packet can arrive before an earlier one"],
    modelAnswer: "The packets can take different routes, and some routes are slower or more crowded, so a later packet can arrive before an earlier one.",
    explanation: "Different routes cause different delays." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Round up the number of packets.", "Every packet has the same header and trailer."],
    explanation: "A 5 500 byte message with 1 000 byte payloads needs 6 packets; with 24 bytes of overhead each the total is 5 644 bytes.",
    stem: "A rural clinic in Hwange sends a 5500 byte patient record to the central hospital in Harare. The network uses packet switching. Each packet carries at most 1000 bytes of payload, a 20-byte header and a 4-byte trailer.",
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "Calculate the number of packets needed.", value: 6, wrong: [5, 5.5], workedSolution: "1. 5500 ÷ 1000 = 5.5.\n2. Round up: 6 packets.", explanation: "Five full packets and one of 500 bytes: 6." }),
      P.num({ label: "(b)", marks: 2, stem: "Calculate the total number of bytes sent.", value: 5644, unit: "bytes", wrong: [5500, 5524], workedSolution: "1. Each packet adds 24 bytes.\n2. 6 × 24 = 144.\n3. 5500 + 144 = 5644.", explanation: "5500 + 6 × 24 = 5644 bytes." }),
      P.manual({ label: "(c)", marks: 2, stem: "The packets arrive in the order 3, 1, 2, 5, 6, 4. Explain how the hospital's computer produces the complete record.", points: ["It uses the packet number in each header to put the packets in order", "It joins the payloads in order 1 to 6 to rebuild the record"], modelAnswer: "It uses the packet numbers in the headers to put the packets in the order 1 to 6, and then joins the payloads to rebuild the record.", explanation: "Reassembly using the packet numbers." }),
      P.manual({ label: "(d)", marks: 2, stem: "Give two reasons why the clinic's network uses packet switching and not circuit switching.", points: ["The capacity of the links is shared with other users and only used when packets are sent", "If a link fails, the packets can be sent by another route"], modelAnswer: "The links are shared and used only when packets are sent, so capacity is not wasted, and if a link fails the packets can be sent by another route.", explanation: "Efficiency and resilience." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Look for the matching row of the table."],
    explanation: "Packet to 192.0.2.77 goes to Router O; an unmatched address goes to the default gateway.",
    stem: `A router at a school in Gweru has this routing table.\n\n${md3}`,
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "State the next hop for a packet addressed to 192.0.2.77.", accepted: ["Router O", "O"], wrong: ["Router M"], explanation: "The address lies in 192.0.2.0/25, which covers 192.0.2.0 to 192.0.2.127." }),
      P.short({ label: "(b)", marks: 1, stem: "State the next hop for a packet addressed to 45.60.2.9.", accepted: ["default gateway", "the default gateway"], wrong: ["Router M"], explanation: "No row matches, so the default route is used." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain what happens to a packet whose TTL has been reduced to 0.", points: ["The router discards the packet", "This stops a packet circulating for ever when there is a routing loop or fault"], modelAnswer: "The router discards the packet. This stops a packet circulating for ever if there is a routing loop.", explanation: "TTL." }),
    ] });
  b.card("DEFINITION", "Circuit switching", "A dedicated path is set up before communication and its bandwidth is reserved until the end (telephone calls).");
  b.card("DEFINITION", "Packet switching", "A message is split into packets that are routed separately and reassembled in order at the destination (the internet).");
  b.card("CONCEPT", "Parts of a packet", "Header: addresses, packet number, TTL. Payload: the data. Trailer: end marker and error check.");
  b.card("CONCEPT", "Circuit switching advantages and drawbacks", "Guaranteed bandwidth, in-order delivery, constant delay; set-up needed, capacity wasted when idle, lost if a link fails.");
  b.card("CONCEPT", "Packet switching advantages and drawbacks", "Efficient sharing, reroutes around failures; packets may arrive late, out of order or be lost; header overhead.");
  b.card("DEFINITION", "Routing table", "A router's list of networks and the next hop towards each, with a default route for other addresses.");
  b.card("DEFINITION", "Time to live (TTL)", "A count in each packet reduced by 1 at every router; the packet is discarded at 0.");
  b.card("DEFINITION", "Hop", "One step of a packet from one router to the next; the hop count is the number of routers passed.");
});
