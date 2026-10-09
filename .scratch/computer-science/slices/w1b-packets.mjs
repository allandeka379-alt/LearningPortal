// Slice w1b: packets and packet switching (comp.transmission.packets, Cambridge only).
import { concept, P } from "../lib.mjs";

const packets = (size, payload) => Math.ceil(size / payload);

concept("comp.transmission.packets", { file: "transmission/packets", keyPrefix: "transmission.packets" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which part of a packet carries the actual data being sent?",
    options: [["Payload", "Correct: the payload is the piece of the message itself."], ["Header", "The header carries addresses and the packet number, not the data."], ["Trailer", "The trailer marks the end of the packet and holds error-checking data."], ["Router", "A router is a network device, not part of a packet."]],
    answer: "A",
    explanation: "A packet has a header (control information), a payload (the data) and a trailer (end marker and error check).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which item is stored in the **header** of a packet?",
    options: [["The packet number", "Correct: the header holds the packet number and the two addresses."], ["The checksum used for error checking", "Error-checking data is usually in the trailer."], ["The section of the file being sent", "That is the payload."], ["The route the packet must take", "Routes are chosen by routers as the packet travels; they are not fixed in the header."]],
    answer: "A",
    explanation: "The header holds the destination address, the originator's address and the packet number.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why does each packet's header contain a packet number?",
    options: [["So the packets can be put back in order at the destination", "Correct: packets may arrive out of order and are reordered using their numbers."], ["So routers can choose the shortest route for it", "Routers use the destination address, not the packet number."], ["So the receiver can check the data for errors", "Error checking uses data in the trailer, such as a checksum."], ["So the sender knows which router to use first", "The packet number is not used to choose routers."]],
    answer: "A",
    explanation: "In packet switching, packets can take different routes and arrive out of order. The packet number lets the receiver reassemble them correctly.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "In packet switching, which device decides the route that a packet takes across a network?",
    options: [["Router", "Correct: each router reads the destination address and chooses the next hop."], ["Sending computer", "The sender only sends packets onto the network; it does not plan the route."], ["Receiving computer", "The receiver reassembles packets; it does not route them."], ["Web browser", "A browser requests and displays pages; it does not route packets."]],
    answer: "A",
    explanation: "Routers read the destination address in the header and forward each packet along the best route available at that moment.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Packets 1 to 5 of a voice note are sent from Mutare to Harare. Packet 4 arrives before packet 3. What is the most likely reason?",
    options: [["Packet 3 took a different, slower route", "Correct: packets are routed separately, so one may take a longer or busier route."], ["Packet 3 had a larger header than packet 4", "Header sizes are the same; this would not delay one packet noticeably."], ["The routers sorted the packets into a new order", "Routers forward packets; they do not deliberately reorder them."], ["Packet 4 had a higher priority in its trailer", "The trailer holds an end marker and error check, not a priority."]],
    answer: "A",
    hints: ["Do all packets of one message follow the same route?"],
    explanation: "Each packet is routed independently. If packet 3 is sent along a longer or more congested route, packet 4 can overtake it. The receiver reorders them using packet numbers.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which is a **disadvantage** of packet switching?",
    options: [["Packets may arrive out of order and must be reassembled", "Correct: reordering takes time, and late packets can delay real-time data."], ["A single broken link stops the whole message arriving", "Packets can be routed around a broken link: that is an advantage."], ["The whole file must be resent if one packet is lost", "Only the lost packet needs to be resent."], ["Only one user can use a line at a time", "Packet switching lets many users share lines."]],
    answer: "A",
    hints: ["Three of these describe things packet switching actually avoids."],
    explanation: "Packet switching avoids broken links and only resends lost packets, and lets many users share lines. Its drawbacks are out-of-order arrival, reassembly time and possible delays or losses.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "When does the receiving device reassemble the data from the packets?",
    options: [["Once the last packet has arrived", "Correct: all packets are needed before the data can be rebuilt in order."], ["As soon as the first packet has arrived", "The first packet alone cannot rebuild the data."], ["At each router along the route", "Routers only forward packets."], ["Before the packets leave the sending device", "The sender splits the data; it does not reassemble it."]],
    answer: "A",
    explanation: "Once the last packet has arrived, the packets are ordered by packet number and the payloads joined.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "All the packets of one message must travel by the same route.",
    answer: false, daily: true,
    explanation: "False. In packet switching each packet is routed separately, so packets of one message can take different routes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If one packet is damaged during transmission, only that packet needs to be sent again.",
    answer: true,
    explanation: "True. This is one reason data is broken into packets: resending a small packet is much quicker than resending the whole file.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a packet to what it contains.",
    pairs: [["Header", "Destination address, originator's address and packet number"], ["Payload", "A piece of the data being sent"], ["Trailer", "End-of-packet marker and error-checking data"]],
    explanation: "Header: control information. Payload: the data. Trailer: end marker and error check.",
  });
  b.calc({
    d: 2, skill: "APPLICATION", calculator: false,
    stem: `A file of 4 800 bytes is sent across a network in which each packet's payload can carry at most 600 bytes. How many packets are needed?`,
    value: packets(4800, 600),
    wrong: [packets(4800, 600) - 1],
    explanation: `$4\\,800 \\div 600 = ${packets(4800, 600)}$ packets.`,
    workedSolution: `1. Divide the file size by the payload size: $4\\,800 \\div 600 = ${4800 / 600}$.\n2. It divides exactly, so ${packets(4800, 600)} packets are needed.`,
  });
  b.calc({
    d: 3, skill: "APPLICATION", calculator: false,
    stem: `A 2 500-byte message is split into packets whose payloads carry at most 1 000 bytes each. How many packets are needed?`,
    value: packets(2500, 1000),
    wrong: [2],
    hints: ["What happens to the bytes left over after the full packets?"],
    explanation: `$2\\,500 \\div 1\\,000 = 2.5$, so two full packets and one more for the remaining 500 bytes: ${packets(2500, 1000)} packets.`,
    workedSolution: `1. $2\\,500 \\div 1\\,000 = 2.5$.\n2. A packet cannot be half-sent, so round up: ${packets(2500, 1000)} packets (the last payload holds 500 bytes).`,
  });
  b.fib({
    d: 2, skill: "UNDERSTANDING",
    stem: "Complete the description of packet switching.",
    template: "The data is broken into packets. A {{blank:a}} reads the destination address in each packet's {{blank:b}} and chooses the next part of the route. Packets may arrive out of order, so the receiver puts them back in order using the packet {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["router"], choices: ["router", "browser", "server", "printer"] },
      { id: "b", accepted: ["header"], choices: ["header", "payload", "trailer"] },
      { id: "c", accepted: ["number"], choices: ["number", "size", "address", "trailer"] },
    ],
    explanation: "Routers read the header's destination address; the receiver reorders packets by packet number.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the part of a packet that usually contains error-checking data such as a checksum.",
    accepted: ["trailer", "the trailer", "packet trailer"],
    wrong: ["header", "payload"],
    explanation: "The trailer marks the end of the packet and holds error-checking data.",
  });
  b.manualShort({
    d: 4, skill: "UNDERSTANDING", marks: 3,
    hints: ["Think about sharing, errors and broken links."],
    stem: "Explain **three** reasons why data is broken into packets before it is transmitted across the internet. [3]",
    points: ["Lines can be shared by many users: packets from different users are interleaved", "If an error occurs, only the affected packet needs to be resent", "Packets can be routed around busy or broken links, so data still arrives"],
    modelAnswer: "Packets from many users can share the same lines, so one large transfer does not block others. If a packet is damaged, only that packet is resent. Each packet can take any available route, avoiding congestion and failed links.",
    explanation: "Sharing, quick error recovery and flexible routing are the main reasons.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What would the receiver not be able to do without it?"],
    stem: "Explain why the header of a packet includes the originator's address. [2]",
    points: ["So the receiver knows who sent the packet", "So it can reply / send an acknowledgement / request that a lost or damaged packet be resent"],
    modelAnswer: "The originator's address tells the receiver where the packet came from, so it can send an acknowledgement or ask for a damaged or missing packet to be resent.",
    explanation: "Replies and resend requests are sent to the originator's address.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Use the terms header, payload, trailer, router and packet number.", "Describe the steps in order."],
    stem: "Nyasha uploads a 7 200-byte assignment to her school's server. The network splits the file into packets with a payload of at most 900 bytes.",
    parts: [
      P.num({ label: "(a)", stem: "Calculate how many packets are needed.", value: packets(7200, 900), type: "CALCULATION", explanation: `$7\\,200 \\div 900 = ${packets(7200, 900)}$.`, workedSolution: `1. $7\\,200 \\div 900 = ${7200 / 900}$, exactly, so ${packets(7200, 900)} packets.` }),
      P.manual({ label: "(b)", marks: 3, stem: "State **three** items of data in the header of each packet.", points: ["Destination address (IP address of the server)", "Originator's address (IP address of Nyasha's device)", "Packet number"], modelAnswer: "Destination IP address, originator's IP address, packet number." }),
      P.manual({ label: "(c)", marks: 4, stem: "Describe how the packets travel to the server and how the file is rebuilt.", points: ["Each packet is sent separately and routers read the destination address", "Each packet may take a different route (the best available at the time)", "Packets may arrive out of order", "When the last packet arrives, they are reordered using the packet numbers and the payloads joined"], modelAnswer: "Each packet is sent independently. Routers read the destination address and forward it by the best route available, so packets may take different routes and arrive out of order. When the last packet arrives the server reorders them by packet number and rebuilds the file." }),
    ],
    explanation: "Packet switching: split, route independently, reorder by packet number at the destination.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true,
    hints: ["Think about what happens when a link is busy or broken.", "Think about the effect of late packets on a live call."],
    stem: "A company in Harare holds daily video meetings with its branch in Bulawayo over the internet, which uses packet switching.",
    parts: [
      P.mcq({ label: "(a)", stem: "Which part of a packet do routers read to forward it?", options: [["The destination address in the header", "Correct."], ["The packet number in the header", "The packet number is for reassembly."], ["The error check in the trailer", "The trailer is checked by the receiver."], ["The data in the payload", "Routers do not need to read the data."]], answer: "A", explanation: "Routers use the destination address." }),
      P.manual({ label: "(b)", marks: 2, stem: "Give **two** benefits of packet switching for the company.", points: ["If one link fails or is busy, packets are routed another way, so the meeting can continue", "Only lost or damaged packets are resent / the lines are shared efficiently"], modelAnswer: "Packets can avoid a broken or congested link, and only lost packets need resending." }),
      P.manual({ label: "(c)", marks: 2, stem: "Explain **one** drawback of packet switching for a live video meeting.", points: ["Packets may take different routes and arrive late or out of order", "so the video or sound may freeze or stutter while packets are reordered / waited for"], modelAnswer: "Packets can arrive late or out of order because they take different routes, so the picture may freeze or the sound break up while the receiver waits for them." }),
    ],
    explanation: "Packet switching is robust but can cause delays for real-time data.",
  });

  b.card("DEFINITION", "What is a **packet**?", "A small unit of data sent across a network; large files are split into many packets.");
  b.card("FACT", "Three items in a packet header", "Destination address, originator's address and packet number.");
  b.card("DEFINITION", "What is the **payload** of a packet?", "The actual data being carried: one piece of the file or message.");
  b.card("DEFINITION", "What does the **trailer** of a packet contain?", "An end-of-packet marker and error-checking data (for example a checksum).");
  b.card("DEFINITION", "What is **packet switching**?", "Sending data as packets that travel independently, possibly by different routes, and are reassembled in order at the destination.");
  b.card("CONCEPT", "Role of a router in packet switching", "Reads the destination address and forwards the packet along the best route available at that moment.");
  b.card("CONCEPT", "Why can packets arrive out of order?", "Each takes its own route; some routes are longer or busier than others.");
  b.card("CONCEPT", "How is the data rebuilt?", "When the last packet arrives, the packets are reordered by packet number and the payloads joined.");
  b.card("FACT", "Two advantages of packet switching", "Routes around busy or broken links; only lost or damaged packets are resent (and lines are shared).");
});
