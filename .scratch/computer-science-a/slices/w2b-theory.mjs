// W2b exam-format items: four THEORY10 and three THEORY5 (Paper 1 / Paper 3 style) on networks and encryption.
import { concept, P, EXAM, checkExam, CAM, chk, same, subnet, caesar } from "../lib.mjs";
import { pm } from "../tables/w2b-q.mjs";
import { encapsulate } from "../tables/w2b-osi-tcpip-models.mjs";
import { packetise } from "../tables/w2b-switching.mjs";
import { links } from "../tables/w2b-topologies-media.mjs";

const TH10 = { skill: EXAM.THEORY10.skill, secs: EXAM.THEORY10.secs, examStyle: true };
const TH5 = { skill: EXAM.THEORY5.skill, secs: EXAM.THEORY5.secs, examStyle: true };
const C = (k) => `acs.${k}`;

concept(C("network.ip-addressing"), { file: "exam/w2b-theory", keyPrefix: "exam.w2b-theory" }, (b) => {
  // ------------------------------------------------------------------ 1. IP addressing and subnets (both)
  {
    const s = subnet("172.20.8.150", 26);
    same([s.network, s.broadcast, s.hosts], ["172.20.8.128", "172.20.8.191", 62]);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P1",
      concepts: [C("network.ip-addressing")],
      stem: "A school in Gweru uses the private network 172.20.8.0 and divides it into subnets for the administration offices and the computer laboratories. A laboratory computer has the IP address 172.20.8.150 in a subnet with the prefix length /26.",
      parts: checkExam(EXAM.THEORY10, [
        P.short({ label: "(a)", marks: 1, stem: "Write the subnet mask in dotted decimal form.", accepted: ["255.255.255.192"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["255.255.255.128"], explanation: "/26 means 26 one-bits: three octets of 255 (24 bits) and 11000000 = 192." }),
        P.short({ label: "(b)", marks: 2, stem: "Write the network address of the subnet.", accepted: [s.network], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["172.20.8.0"], explanation: `150 = 10010110 and 192 = 11000000. AND = 10000000 = 128, so ${s.network}.` }),
        P.short({ label: "(c)", marks: 1, stem: "Write the broadcast address of the subnet.", accepted: [s.broadcast], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["172.20.8.255"], explanation: `The six host bits are all 1: 10111111 = 191, so ${s.broadcast}.` }),
        P.num({ label: "(d)", marks: 2, stem: "Calculate the number of usable host addresses in the subnet.", value: 62, unit: "hosts", wrong: [64, 63], workedSolution: "1. Host bits = 32 − 26 = 6.\n2. 2^6 − 2 = 62.", explanation: "64 addresses less the network and broadcast addresses: 62." }),
        P.manual({ label: "(e)", marks: 2, stem: "Give two benefits of dividing the school network into subnets.", points: ["Broadcast traffic is limited to each subnet, which reduces congestion", "Departments can be separated, so security rules can be applied between them"], modelAnswer: "Broadcast traffic is limited to each subnet, which reduces congestion, and departments can be separated so security rules can be applied between them.", explanation: "Traffic and security." }),
        P.manual({ label: "(f)", marks: 2, stem: "The laboratory file server has a static IP address and the students' laptops use DHCP. Explain why.", points: ["The server must be found at the same address every time, so its address is set by hand and does not change", "Laptops join and leave, so DHCP gives them addresses automatically, avoiding manual set-up and clashes"], modelAnswer: "The server must always be found at the same address, so it has a fixed address. Laptops come and go, so DHCP gives them addresses automatically, which avoids manual set-up and address clashes.", explanation: "Static for services, dynamic for clients." }),
      ]),
      hints: ["AND the last octet of the address with the last octet of the mask.", "Usable hosts = 2^h − 2."],
      explanation: "255.255.255.192; network 172.20.8.128; broadcast 172.20.8.191; 62 usable hosts.",
    });
  }
  // ------------------------------------------------------------------ 2. OSI and TCP/IP layering (both)
  {
    const enc = encapsulate(3000, 1000);
    const total = enc.reduce((a, x) => a + x.frame, 0);
    chk(enc.length, 3);
    chk(total, 3174);
    b.struct({
      ...TH10, d: 3, paper: "ZIMSEC P1 / Cambridge P3",
      concepts: [C("network.osi-tcpip-models")],
      stem: "A student in Mutare sends a 3000-byte report to a teacher in Harare by email. The data passes down the layers of the TCP/IP stack on the student's computer. Each segment carries at most 1000 bytes of data. The TCP header, the IP header and the Ethernet frame header and trailer together add 58 bytes to each segment's data.",
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which TCP/IP layer adds the source and destination IP addresses?", ["Internet", "Correct."], [["Application", "The application layer produces the data."], ["Transport", "The transport layer adds port numbers."], ["Link", "The link layer adds MAC addresses."]], "The internet layer makes packets with IP addresses."),
        P.match({ label: "(b)", marks: 3, stem: "Match each layer to its purpose.", pairs: [["Application", "Provides the rules for the email service"], ["Transport", "Splits the data into numbered segments and uses port numbers"], ["Link", "Adds MAC addresses and sends the frame over the medium"]], explanation: "Application: the service. Transport: segments and ports. Link: frames and MAC addresses." }),
        P.num({ label: "(c)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the total number of bytes sent over the link, including the 58 bytes added to each segment's data.", value: total, wrong: [3058, 3000], workedSolution: `1. 3000 ÷ 1000 = 3 segments.\n2. Added bytes = 3 × 58 = 174.\n3. Total = 3000 + 174 = ${total}.`, explanation: `3 segments each add 58 bytes: 3000 + 174 = ${total}.` }),
        P.manual({ label: "(d)", marks: 2, stem: "The MAC addresses in the frame change at each router but the IP addresses do not. Explain why.", points: ["A MAC address identifies the devices at the two ends of one link only, so a new frame is made for each link", "The IP address identifies the final destination, so it stays the same on the whole journey"], modelAnswer: "A MAC address only identifies the devices at the two ends of one link, so a new frame is made for each link. The IP address identifies the final destination, so it stays the same.", explanation: "Link addressing and end-to-end addressing." }),
        P.manual({ label: "(e)", marks: 2, stem: "Describe what the teacher's computer does with the frames it receives.", points: ["Each layer removes its own header as the data passes up the stack", "The transport layer puts the segments in order, so that the application receives the complete report"], modelAnswer: "Each layer removes its header as the data passes up the stack. The transport layer puts the segments in order, so the application receives the complete report.", explanation: "Decapsulation and reassembly." }),
      ]),
      hints: ["Divide 3000 by 1000 to find the number of segments.", "Every segment adds 58 bytes."],
      explanation: `3 segments; 3000 + 3 × 58 = ${total} bytes; each layer removes its header at the receiver.`,
    });
  }
  // ------------------------------------------------------------------ 3. Encryption and certificates (CAM)
  {
    const cipher = caesar("PAY NOW", 3);
    same(cipher, "SDB QRZ");
    b.struct({
      ...TH10, d: 3, paper: "Cambridge Paper 3", applies: CAM,
      concepts: [C("security.encryption"), C("security.ssl-tls-certificates")],
      stem: "A farmer in Chinhoyi pays for seed on the web site of a supplier. The browser shows the address begins with `https` and the web server presents a digital certificate that was issued by a certificate authority (CA). Data is sent with symmetric encryption once the session has been set up.",
      parts: checkExam(EXAM.THEORY10, [
        pm("(a)", "Which key does the browser use to encrypt the session key before sending it to the web server?", ["The server's public key", "Correct."], [["The server's private key", "The browser does not have this key."], ["The farmer's password", "A password is not a key for the session key."], ["The CA's private key", "This key is used to sign certificates."]], "The session key is encrypted with the server's public key."),
        P.short({ label: "(b)", marks: 2, stem: "A simple Caesar cipher with key 3 is used to encrypt the plain text PAY NOW. Write the cipher text, keeping the space.", accepted: [cipher], normalise: ["trim", "lowercase", "collapse_whitespace"], wrong: ["MXV KLT"], explanation: "P → S, A → D, Y → B; N → Q, O → R, W → Z: SDB QRZ." }),
        P.fib({ label: "(c)", marks: 3, stem: "Complete the description of the session.",
          template: "The browser checks that the certificate was signed by a trusted {{blank:a}}, that its {{blank:b}} are current and that the domain name matches. Once the session key has been sent, the data is encrypted using {{blank:c}} encryption.",
          blanks: [
            { id: "a", accepted: ["certificate authority"], choices: ["certificate authority", "ISP", "router", "web server"] },
            { id: "b", accepted: ["dates"], choices: ["dates", "passwords", "ports", "keys"] },
            { id: "c", accepted: ["symmetric"], choices: ["symmetric", "asymmetric", "quantum", "no"] },
          ], explanation: "A trusted certificate authority, current dates, then symmetric encryption." }),
        P.manual({ label: "(d)", marks: 2, stem: "State two items of information held in a digital certificate.", points: ["The owner's name or domain name", "The owner's public key / the issuing CA / the validity dates"], modelAnswer: "The domain name of the owner and the owner's public key.", explanation: "Any two items." }),
        P.manual({ label: "(e)", marks: 2, stem: "Explain why the Caesar cipher in (b) would not be suitable for protecting the farmer's payment.", points: ["There are only 25 possible keys, so every key can be tried quickly", "Letter frequencies are unchanged, so frequency analysis reveals the key"], modelAnswer: "There are only 25 possible keys, so they can all be tried quickly, and the frequency of letters is unchanged, so frequency analysis reveals the key.", explanation: "Weak cipher." }),
      ]),
      hints: ["Which key can only the server use?", "Move each letter 3 places on."],
      explanation: "Server's public key; SDB QRZ; trusted CA, dates, symmetric; certificate contents; Caesar weaknesses.",
    });
  }
  // ------------------------------------------------------------------ 4. Topologies, media and LAN hardware (CAM)
  {
    chk(links(6), 15);
    b.struct({
      ...TH10, d: 3, paper: "Cambridge Paper 1", applies: CAM,
      concepts: [C("network.topologies-media"), C("network.lan-hardware")],
      stem: "A clinic in Kariba has six computers in one building. The manager is choosing between a star network with a central switch and a full mesh network. Later she wants to add a wireless access point for visiting nurses.",
      parts: checkExam(EXAM.THEORY10, [
        P.num({ label: "(a)", marks: 1, stem: "Calculate the number of links needed to join the six computers in a full mesh.", value: 15, wrong: [6, 30], workedSolution: "1. 6 × 5 ÷ 2 = 15.", explanation: "n(n − 1) ÷ 2 = 15." }),
        pm("(b)", "Which device forwards each frame only to the port of its destination?", ["A switch", "Correct."], [["A repeater", "A repeater regenerates a signal and sends it on."], ["A hub", "A hub sends every frame to every port."], ["A modem", "A modem converts signals for a telephone line."]], "A switch uses MAC addresses to forward frames to one port."),
        P.match({ label: "(c)", marks: 3, stem: "Match each device to its purpose.", pairs: [["Wireless access point", "Lets wireless devices join the wired network"], ["Router", "Joins the LAN to other networks using IP addresses"], ["Repeater", "Regenerates a weakened signal"]], explanation: "Each device has one main purpose." }),
        P.manual({ label: "(d)", marks: 3, stem: "Justify the choice of a star network and not a full mesh for the clinic.", points: ["A star needs only 6 cables compared with 15 links, so it costs less", "A failed cable affects only one computer, which is acceptable for six computers", "It is simple to add another computer by connecting it to the switch"], modelAnswer: "A star needs only 6 cables compared with 15 links for a mesh, so it costs less. A failed cable affects only one computer, and another computer can be added simply by connecting it to the switch.", explanation: "Cost, failures, expansion." }),
        P.manual({ label: "(e)", marks: 2, stem: "The clinic's old hub is replaced by a switch. Explain why there are fewer collisions.", points: ["A hub sends every frame to all ports, so devices share the capacity and collide", "A switch sends each frame only to the port of the destination, so each link carries only its own traffic"], modelAnswer: "A hub sends every frame to all ports, so devices share the capacity and collide. A switch sends each frame only to the destination port, so each link carries only its own traffic.", explanation: "Shared against separate links." }),
      ]),
      hints: ["Links in a full mesh = n(n − 1) ÷ 2.", "A star needs one cable for each computer."],
      explanation: "15 links in a mesh against 6 cables in a star; the switch removes shared collisions.",
    });
  }
  // ------------------------------------------------------------------ THEORY5 (5): URL and DNS (both)
  b.struct({
    ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
    concepts: [C("network.url-dns")],
    stem: "A student types `https://library.mutare-school.co.zw/books/search?topic=physics` into a browser.",
    parts: checkExam(EXAM.THEORY5, [
      P.short({ label: "(a)", marks: 1, stem: "Write the path in the URL.", accepted: ["/books/search"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["topic=physics"], explanation: "The path follows the domain name: /books/search." }),
      pm("(b)", "What does the Domain Name System do for the browser?", ["It finds the IP address that belongs to the domain name", "Correct."], [["It stores the pages of the web site on a server that the school owns", "Pages are stored on the web server."], ["It encrypts the connection between the browser and the web server", "Encryption is done by TLS."], ["It gives the computer a MAC address", "MAC addresses are set in the network card."]], "DNS translates a name into an IP address."),
      P.manual({ label: "(c)", marks: 3, stem: "Describe how the resolver finds the IP address when it has no cached answer.", points: ["It asks a root server, which gives the address of the TLD server", "It asks the TLD server, which gives the address of the authoritative server", "It asks the authoritative server, which returns the IP address, and the resolver caches the answer"], modelAnswer: "The resolver asks a root server, which gives the address of the TLD server. The TLD server gives the address of the authoritative server, which returns the IP address. The resolver caches the answer.", explanation: "Root, TLD, authoritative." }),
    ]),
    hints: ["The path comes after the domain name."],
    explanation: "Path /books/search; DNS translates names to addresses; root, TLD, authoritative.",
  });
  // ------------------------------------------------------------------ THEORY5 (5): cloud computing (both)
  b.struct({
    ...TH5, d: 2, paper: "ZIMSEC P1 / Cambridge P1",
    concepts: [C("network.cloud-computing")],
    stem: "A school in Bulawayo is considering storing its records and using web-based software supplied by a provider through the internet.",
    parts: checkExam(EXAM.THEORY5, [
      pm("(a)", "Staff will use web-based email that is installed and maintained by the provider. Which service model is this?", ["Software as a Service", "Correct."], [["Platform as a Service", "PaaS is for building applications."], ["Infrastructure as a Service", "IaaS provides virtual servers."], ["A private cloud", "This is a type of cloud, not a service model."]], "SaaS."),
      P.match({ label: "(b)", marks: 2, stem: "Match each type of cloud to its description.", pairs: [["Public cloud", "Hardware shared between many customers"], ["Private cloud", "Used by one organisation only"]], explanation: "Public: shared. Private: one organisation." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two drawbacks to the school of storing its records in the cloud.", points: ["The records cannot be reached when the internet connection fails", "The records are held on the provider's servers, so security and privacy are a concern"], modelAnswer: "The records cannot be reached when the connection fails, and they are held on the provider's servers, so security and privacy are a concern.", explanation: "Connectivity and security." }),
    ]),
    hints: ["Which model is a finished application?"],
    explanation: "SaaS; public is shared and private is one organisation; connectivity and security.",
  });
  // ------------------------------------------------------------------ THEORY5 (5): protocols and packet switching (CAM)
  {
    const pk = packetise(2600, 1000);
    chk(pk.length, 3);
    b.struct({
      ...TH5, d: 2, paper: "Cambridge Paper 3", applies: CAM,
      concepts: [C("network.application-protocols"), C("network.switching")],
      stem: "A clerk at a bank in Masvingo emails a 2600-byte report to the head office. The network uses packet switching and each packet carries at most 1000 bytes of data.",
      parts: checkExam(EXAM.THEORY5, [
        pm("(a)", "Which protocol is used to send the email from the clerk's program to the mail server?", ["SMTP", "Correct."], [["POP3", "POP3 downloads email."], ["FTP", "FTP transfers files."], ["IMAP", "IMAP manages a mailbox on the server."]], "SMTP sends email."),
        P.num({ label: "(b)", marks: 1, stem: "Calculate the number of packets needed for the report.", value: 3, wrong: [2, 4], workedSolution: "1. 2600 ÷ 1000 = 2.6.\n2. Round up to 3 packets.", explanation: "3 packets." }),
        P.manual({ label: "(c)", marks: 3, stem: "Describe how the packets reach the head office and the report is rebuilt.", points: ["Each packet has a header with the destination address and a packet number", "Routers read the address and forward each packet, which may take a different route", "At the destination the packets are put in order using their numbers and reassembled"], modelAnswer: "Each packet has a header with the destination address and a packet number. Routers forward each packet, possibly by different routes. At the destination the packets are put in order using their numbers and reassembled.", explanation: "Header, routing, reassembly." }),
      ]),
      hints: ["Round the number of packets up."],
      explanation: "SMTP; 3 packets; headers, routing, reassembly.",
    });
  }
});
