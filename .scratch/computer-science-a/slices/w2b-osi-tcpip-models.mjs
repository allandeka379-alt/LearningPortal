// Slice w2b: OSI and TCP/IP models (acs.network.osi-tcpip-models, both boards; the seven OSI layers are ZIMSEC detail).
import { concept, P, chk, same, ZIM, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { encapsulate, HDR } from "../tables/w2b-osi-tcpip-models.mjs";

const enc = encapsulate(2500, 1000);
const totalFrames = enc.reduce((a, x) => a + x.frame, 0);
chk(enc.length, 3);
chk(totalFrames, 2674);
chk(HDR.tcp + HDR.ip + HDR.eth, 58);
const encTable = mdTable(["Segment", "Data (bytes)", "Frame (bytes)"], enc.map((x) => [x.n, x.payload, x.frame]));

concept("acs.network.osi-tcpip-models", { file: "network/osi-tcpip-models", keyPrefix: "network.osi-tcpip-models" }, (b) => {
  mc(b, 1, "RECALL", "Which layer of the TCP/IP stack is responsible for adding the IP addresses of the sender and the receiver?",
    ["Internet", "Correct: the internet layer makes packets with IP addresses."],
    [["Application", "The application layer produces the data and follows rules such as HTTP."], ["Transport", "The transport layer adds port numbers."], ["Link", "The link layer adds MAC addresses."]],
    "Packets carry IP addresses, so this is the internet layer.");
  mc(b, 2, "RECALL", "What does the transport layer of the TCP/IP stack add to the data?",
    ["Port numbers and a sequence number", "Correct: these form the segment header."],
    [["The IP addresses of the sender and receiver", "These are added by the internet layer."], ["The MAC addresses of the two ends of the link", "These are added by the link layer."], ["Encryption keys", "Keys are not a transport header."]],
    "Segments carry port numbers and sequence numbers.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the name of the unit of data created at the link layer?",
    ["Frame", "Correct."],
    [["Segment", "A segment is made at the transport layer."], ["Packet", "A packet is made at the internet layer."], ["Message", "A message is data at the application layer."]],
    "Data, segment, packet, frame.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why are network protocols arranged in layers?",
    ["Each layer does one job and can be changed without affecting the others", "Correct."],
    [["It makes all networks use the same cable", "Layers do not decide the cable."], ["It makes the data travel faster along the cables and wires of the whole network", "Layers organise the work; they do not speed up signals."], ["It removes the need for addresses", "Addresses are still needed in the layers."]],
    "Layering simplifies design and allows layers to be replaced.");
  mc(b, 3, "ANALYSIS", "A router forwards a packet to the next network. Up to which TCP/IP layer does the router need to process the packet?",
    ["The internet layer", "Correct: it reads the destination IP address."],
    [["The application layer", "A router does not need to read the application data."], ["The transport layer", "A router does not need the port numbers to route a packet."], ["No layer at all", "It must at least read the IP address to forward the packet."]],
    "A router unpacks a frame as far as the packet and uses the IP address.", { hints: ["Which header holds the destination IP address?"] });
  mc(b, 3, "UNDERSTANDING", "Which describes the main difference between TCP and UDP?",
    ["TCP checks that data arrives complete and in order; UDP does not", "Correct."],
    [["UDP is used at the link layer and TCP is used at the application layer", "Both are transport layer protocols."], ["TCP uses IP addresses and UDP uses MAC addresses", "Both use ports; addresses are handled by lower layers."], ["UDP resends every lost segment", "UDP does not resend lost data."]],
    "TCP is reliable and ordered; UDP is faster and leaves recovery to the application.", { hints: ["Which protocol resends lost segments?"] });
  mc(b, 3, "UNDERSTANDING", "In the OSI model, which layer formats the data, for example by converting character codes or encrypting it?",
    ["Presentation", "Correct: layer 6.", ],
    [["Session", "The session layer manages the conversation."], ["Network", "The network layer routes packets."], ["Data link", "The data link layer makes frames."]],
    "The presentation layer handles formats, compression and encryption.", { applies: ZIM, hints: ["Which layer sits between application and session?"] });
  mc(b, 4, "ANALYSIS", "A website's pages load, but the browser reports that one image failed and the connection was reset. A technician finds that the fault is that segments are not being numbered and re-ordered. Which layer is most likely at fault?",
    ["Transport", "Correct: sequencing and error recovery are done by TCP at the transport layer."],
    [["Link", "The link layer sends frames on a single link."], ["Internet", "The internet layer routes packets but does not number segments."], ["Application", "The application layer sets the rules for web requests, not the numbering of segments."]],
    "Segment numbering and re-ordering belong to the transport layer.", { hints: ["Which layer makes segments?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "Each layer of the stack adds its own header to the data it receives from the layer above.", answer: true, explanation: "True. This is encapsulation." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A port number identifies a computer on the internet.", answer: false, explanation: "False. A port number identifies a program or service on the host; the IP address identifies the host." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each TCP/IP layer to what it handles.",
    pairs: [["Application", "Rules for a service such as HTTP or SMTP"], ["Transport", "Port numbers, segments and reliable delivery"], ["Internet", "IP addresses and routing of packets"], ["Link", "MAC addresses, frames and the physical medium"]],
    explanation: "Each layer deals with one kind of address or unit." });
  b.match({ d: 3, skill: "UNDERSTANDING", applies: ZIM, stem: "Match each OSI layer to its function.",
    pairs: [["Session", "Starts, manages and ends a conversation between programs"], ["Network", "Logical addressing and routing"], ["Data link", "Frames and MAC addresses on one link"], ["Physical", "Sends the bits as signals over the medium"], ["Presentation", "Formats the data, including compression and encryption"]],
    hints: ["Number the layers from 7 down to 1."], explanation: "Layers 5, 3, 2, 1 and 6 of the OSI model." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the names of the units of data as a message goes down the TCP/IP stack.",
    template: "The transport layer makes a {{blank:a}}, the internet layer makes a {{blank:b}} and the link layer makes a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["segment"], choices: ["segment", "packet", "frame", "message"] },
      { id: "b", accepted: ["packet"], choices: ["packet", "segment", "frame", "bit"] },
      { id: "c", accepted: ["frame"], choices: ["frame", "packet", "segment", "port"] },
    ], explanation: "Segment, packet, frame." });
  b.fib({ d: 3, skill: "UNDERSTANDING", applies: ZIM, stem: "Complete the mapping of the OSI model to the TCP/IP model.",
    template: "OSI layers 5, 6 and 7 map to the TCP/IP {{blank:a}} layer. OSI layer 3 maps to the {{blank:b}} layer. OSI layers 1 and 2 map to the {{blank:c}} layer.",
    blanks: [
      { id: "a", accepted: ["application"], choices: ["application", "transport", "internet", "link"] },
      { id: "b", accepted: ["internet"], choices: ["internet", "transport", "link", "application"] },
      { id: "c", accepted: ["link"], choices: ["link", "internet", "transport", "application"] },
    ], hints: ["OSI layer 4 maps to transport."], explanation: "5-7 application; 3 internet; 1-2 link." });
  b.num({ d: 3, skill: "APPLICATION", unit: "bytes", calculator: false, hints: ["Add the TCP header, the IP header and the Ethernet header and trailer."],
    stem: "A TCP header is 20 bytes, an IP header is 20 bytes and an Ethernet frame adds 14 bytes of header and 4 bytes of trailer. How many bytes are added to each segment's data to make a frame?",
    value: 58, wrong: [40, 54], workedSolution: "1. 20 + 20 = 40.\n2. 14 + 4 = 18.\n3. 40 + 18 = 58.", explanation: "58 bytes are added to each piece of data." });
  b.num({ d: 4, skill: "ANALYSIS", unit: "bytes", hints: ["Each frame adds 58 bytes.", "Three segments are sent."],
    stem: `The message of 2500 bytes is sent in three frames, as shown.\n\n${encTable}\n\nHeaders per frame are 58 bytes. Calculate the total number of bytes sent over the link.`,
    value: totalFrames, wrong: [2500, 2558], workedSolution: `1. Three frames are sent.\n2. Total = ${enc.map((x) => x.frame).join(" + ")} = ${totalFrames}.`, explanation: `Total bytes sent = 2500 + 3 × 58 = ${totalFrames}.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Name each layer and its job."],
    stem: "Describe the purpose of the transport layer and the internet layer in the TCP/IP stack. [4]",
    points: ["The transport layer delivers data between the correct programs on the two hosts using port numbers", "It splits data into numbered segments (TCP also checks that all arrive and in order)", "The internet layer adds the source and destination IP addresses to make packets", "It routes the packets across networks to the destination"],
    modelAnswer: "The transport layer splits data into numbered segments and delivers them to the correct program using port numbers; TCP also checks that all arrive and in order. The internet layer adds the source and destination IP addresses to make packets and routes them across networks.",
    explanation: "Ports and segments; addresses and routing." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Mention reuse of one layer by another."],
    stem: "Give three advantages of using a layered protocol stack. [3]",
    points: ["Each layer has one job, so it is easier to design and test", "A layer can be changed or replaced without affecting the other layers", "Hardware and software from different makers work together because the interfaces are standard"],
    modelAnswer: "Each layer has one job, which makes it easier to design and test. A layer can be replaced without changing the others, and equipment from different makers works together because the interfaces are standard.",
    explanation: "Simplicity, replaceability, compatibility." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Describe the sender, the network and the receiver."],
    stem: "Describe what happens to a message as it is sent from one host to another using the TCP/IP stack. [4]",
    points: ["At the sender, each layer adds its own header as the message passes down (encapsulation)", "The message becomes segments, then packets with IP addresses, then frames with MAC addresses", "Routers on the way read the destination IP address and forward the packet", "At the receiver, each layer removes its header as the message passes up to the application"],
    modelAnswer: "At the sender each layer adds a header as the message passes down: segments, then packets with IP addresses, then frames with MAC addresses. Routers read the destination IP address and forward the packets. At the receiver each layer removes its header as the message passes up to the application.",
    explanation: "Encapsulation, forwarding, decapsulation." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 3, hints: ["Compare number of layers, origin and use."], applies: ZIM,
    stem: "Compare the OSI model with the TCP/IP model. [3]",
    points: ["OSI has seven layers whereas TCP/IP has four", "OSI is a reference model for describing networks, but TCP/IP is the set of protocols that the internet actually uses", "OSI splits application services into application, presentation and session layers; TCP/IP has a single application layer"],
    modelAnswer: "OSI has seven layers and TCP/IP has four. OSI is a reference model but TCP/IP is the set of protocols that the internet uses. OSI splits application services into three layers, where TCP/IP has one.",
    explanation: "Layers, purpose, application layer." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Think of the header each layer adds.", "A router reads IP addresses."],
    explanation: "Application (HTTP request), transport (port and segments), internet (IP addresses), link (MAC addresses, frame).",
    stem: "Chipo in Bulawayo sends a request to a web server in Harare over the internet. The browser uses the TCP/IP stack.",
    parts: [
      pm("(a)", "Which layer produces the HTTP request?", ["Application", "Correct."], [["Transport", "The transport layer splits and numbers the data."], ["Internet", "The internet layer adds IP addresses."], ["Link", "The link layer creates frames."]], "HTTP is an application layer protocol."),
      pm("(b)", "Which layer adds the port number 443?", ["Transport", "Correct."], [["Internet", "The internet layer adds IP addresses."], ["Link", "The link layer adds MAC addresses."], ["Application", "The application layer produces the request."]], "Port numbers are in the segment header."),
      P.manual({ label: "(c)", marks: 2, stem: "State what the internet layer adds to the segment and why.", points: ["The source and destination IP addresses", "So that routers can send the packet to the correct network and host"], modelAnswer: "It adds the source and destination IP addresses so that routers can send the packet to the correct network and host.", explanation: "IP addresses for routing." }),
      P.manual({ label: "(d)", marks: 2, stem: "Explain why the MAC address in the frame changes at each router while the IP address stays the same.", points: ["The MAC address identifies the devices at the two ends of one link only", "The IP address identifies the final destination, so it stays the same across all the links"], modelAnswer: "A MAC address only identifies the devices at the two ends of one link, so a new frame is made for each link. The IP address identifies the final destination, so it stays the same.", explanation: "Link addressing against end-to-end addressing." }),
    ] });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, applies: ZIM, hints: ["Use the OSI layer numbers."],
    explanation: "Application 7, presentation 6, session 5; network 3; data link 2; physical 1.",
    stem: "A school in Gweru uses a secure web page to submit exam entries. The data is encrypted, sent in packets and carried over a copper cable.",
    parts: [
      P.fib({ label: "(a)", marks: 3, stem: "Complete the layer names.",
        template: "The encryption of the data is done by the {{blank:a}} layer. The routing of packets using IP addresses is done by the {{blank:b}} layer. The signals on the copper cable are sent by the {{blank:c}} layer.",
        blanks: [
          { id: "a", accepted: ["presentation"], choices: ["presentation", "session", "network", "physical"] },
          { id: "b", accepted: ["network"], choices: ["network", "presentation", "data link", "session"] },
          { id: "c", accepted: ["physical"], choices: ["physical", "data link", "network", "transport"] },
        ], explanation: "Presentation (layer 6), network (layer 3), physical (layer 1)." }),
      P.num({ label: "(b)", marks: 1, stem: "State the number of the OSI layer that makes frames with MAC addresses.", value: 2, wrong: [1, 3], workedSolution: "1. Frames and MAC addresses belong to the data link layer.\n2. The data link layer is layer 2.", explanation: "The data link layer is layer 2." }),
      P.manual({ label: "(c)", marks: 2, stem: "State which TCP/IP layer includes the OSI session layer and which TCP/IP layer includes the OSI data link layer.", points: ["Session layer: the application layer", "Data link layer: the link layer"], modelAnswer: "The OSI session layer is part of the TCP/IP application layer and the data link layer is part of the TCP/IP link layer.", explanation: "Mapping." }),
    ] });
  b.card("DEFINITION", "Protocol", "A set of rules for communication between devices.");
  b.card("FACT", "TCP/IP layers", "Application, Transport, Internet, Link (from the top).");
  b.card("FACT", "OSI layers", "7 Application, 6 Presentation, 5 Session, 4 Transport, 3 Network, 2 Data link, 1 Physical.", undefined, { applies: ZIM });
  b.card("DEFINITION", "Encapsulation", "Each layer adds its own header (and a trailer at the link layer) to the data from the layer above: data, segment, packet, frame.");
  b.card("CONCEPT", "Transport layer", "Port numbers, segments, and (TCP) reliable, ordered delivery; UDP is faster but not reliable.");
  b.card("CONCEPT", "Internet layer", "Adds source and destination IP addresses to make packets, and routes them between networks.");
  b.card("CONCEPT", "Link layer", "Makes frames with MAC addresses for one link and sends the bits over the medium.");
  b.card("CONCEPT", "OSI to TCP/IP", "OSI 5-7 = Application; 4 = Transport; 3 = Internet; 1-2 = Link.", undefined, { applies: ZIM });
});
