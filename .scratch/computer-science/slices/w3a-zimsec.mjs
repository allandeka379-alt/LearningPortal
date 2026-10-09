// Slice w3a: ZIMSEC Paper 2 exam-format items (STRUCTURED, 10 marks, ANALYSIS, ZIMSEC only).
import { concept, P, ZIM, toBase, group } from "../lib.mjs";

const C = (k) => `comp.${k}`;
const buildings = 4;
const meshLinks = (buildings * (buildings - 1)) / 2;
const ipParts = [10, 0, 200, 9];
const octet = ipParts[2];

concept(C("network.types-topologies"), { file: "exam/w3a-zimsec", keyPrefix: "exam.w3a-zimsec", applies: ZIM }, (b) => {
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("network.types-topologies"), C("network.transmission-media")],
    hints: ["A full mesh needs a link between every pair.", "Match each medium to distance and cost."],
    stem: `A teachers' college in Chinhoyi has ${buildings} buildings on one campus, about 400 m apart, and a second campus in Harare.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "What type of network would link the Chinhoyi campus with the Harare campus?",
        options: [
          ["WAN", "Correct: the campuses are in different towns."],
          ["LAN", "A LAN covers one site."],
          ["PAN", "A PAN covers one person's devices."],
          ["Peer-to-peer", "This describes how resources are shared, not the area covered."],
        ],
        answer: "A", explanation: "Different towns: a wide area network.",
      }),
      P.match({
        label: "(b)", stem: "Match each topology to its description.",
        pairs: [
          ["Star", "All nodes have their own cable to a central switch"],
          ["Bus", "All nodes share one backbone cable with terminators"],
          ["Ring", "Data travels in one direction round a closed loop"],
        ],
        explanation: "Star: central switch. Bus: shared backbone. Ring: closed loop.",
      }),
      P.num({
        label: "(c)", stem: `The college wants a full mesh of cables joining the ${buildings} buildings, with one link between every pair. How many links are needed?`,
        value: meshLinks, wrong: [buildings * (buildings - 1)],
        explanation: `${buildings} × ${buildings - 1} ÷ 2 = ${meshLinks} links.`,
        workedSolution: `1. Each building links to ${buildings - 1} others: ${buildings} × ${buildings - 1} = ${buildings * (buildings - 1)}.\n2. Each link is counted twice: ${buildings * (buildings - 1)} ÷ 2 = ${meshLinks}.`,
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain why fibre-optic cable, rather than twisted pair, should join the buildings.",
        points: [
          "The buildings are about 400 m apart, beyond twisted pair's range (about 100 m), while fibre carries data long distances with little attenuation",
          "Fibre has a higher bandwidth / is immune to electrical interference",
        ],
        modelAnswer: "At 400 m apart the buildings are too far for twisted pair, which is limited to about 100 m, while fibre carries light over long distances without the signal fading, and it also has a much higher bandwidth.",
      }),
      P.manual({
        label: "(e)", marks: 3,
        stem: "Each building has a computer room of 30 computers. Recommend a topology for each room and justify your choice.",
        points: [
          "Recommends star (or another topology with a valid justification)",
          "A fault in one computer or cable affects only that computer",
          "Easy to add computers / fewer collisions because the switch sends data only to the destination",
        ],
        modelAnswer: "A star with a switch in each room. If one learner's computer or cable fails, the other 29 keep working, and more computers can be added with one cable each; the switch also sends data only to the computer it is for, so the room's network stays fast.",
      }),
    ],
    explanation: `(a) WAN (b) star, bus, ring (c) ${meshLinks}.`,
  });

  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("network.protocols"), C("network.addressing"), C("network.devices")],
    hints: ["POP3 and IMAP receive email; SMTP sends it.", "Use place values 128 to 1."],
    stem: `A printing company in Masvingo has a network printer with the IPv4 address \`${ipParts.join(".")}\`. Staff send and receive email and upload files to customers' web servers.`,
    parts: [
      P.mcq({
        label: "(a)", stem: "Which protocol downloads email from the mail server to one computer, usually removing it from the server?",
        options: [
          ["POP3", "Correct: Post Office Protocol 3."],
          ["SMTP", "SMTP sends email."],
          ["IMAP", "IMAP leaves email on the server."],
          ["HTTP", "HTTP transfers web pages."],
        ],
        answer: "A", explanation: "POP3 downloads email to one device.",
      }),
      P.fib({
        label: "(b)", stem: "Complete the description of the TCP/IP layers.",
        template: "The {{blank:a}} layer provides services such as FTP to programs. The {{blank:b}} layer splits data into numbered packets. The {{blank:c}} layer adds IP addresses and routes the packets.",
        blanks: [
          { id: "a", accepted: ["application"], choices: ["application", "transport", "internet", "link"] },
          { id: "b", accepted: ["transport"], choices: ["application", "transport", "internet", "link"] },
          { id: "c", accepted: ["internet"], choices: ["application", "transport", "internet", "link"] },
        ],
        explanation: "Application: services. Transport: TCP packets. Internet: IP addressing and routing.",
      }),
      P.bits({
        label: "(c)", stem: `Convert the third number of the printer's IP address, ${octet}, into an 8-bit binary number.`,
        value: octet, width: 8,
        explanation: `${octet} = 128 + 64 + 8, so ${group(toBase(octet, 2, 8))}.`,
      }),
      P.tf({
        label: "(d)", stem: "The printer's MAC address will change if it is moved to a different network.",
        answer: false, explanation: "False. The MAC address is fixed in the NIC at manufacture; the IP address may change.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Explain why protocols are needed when the company's computers communicate with customers' servers.",
        points: [
          "The computers and servers are made by different manufacturers / run different software",
          "Protocols are agreed rules (data format, addressing, error checking), so both ends can understand the data",
        ],
        modelAnswer: "The company's computers and the customers' servers are different makes running different software, and only by following the same agreed rules for formatting, addressing and checking data can they understand each other.",
      }),
      P.manual({
        label: "(f)", marks: 2,
        stem: "Explain why the network printer should have a static IP address rather than a dynamic one.",
        points: [
          "A static address does not change",
          "so every computer can always find the printer at the same address (print jobs would fail if it changed)",
        ],
        modelAnswer: "A static address never changes, so all the computers can always send their print jobs to the same address; with a dynamic address the printer might get a new address and the computers could no longer find it.",
      }),
    ],
    explanation: `(a) POP3 (b) application, transport, internet (c) ${group(toBase(octet, 2, 8))} (d) false.`,
  });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 2", secs: 900,
    concepts: [C("security.malware"), C("security.cyber-attacks"), C("security.authentication-access"), C("security.network-defences")],
    hints: ["Look for the clue words in each incident.", "A proxy acts on behalf of the users."],
    stem: "A mining supplies company in Kwekwe has suffered several computer crimes in one year.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each incident to the computer crime.",
        pairs: [
          ["Someone outside the company got into the accounts server without permission", "Hacking"],
          ["Emails forged to look as if they came from the managing director", "Spoofing"],
          ["Passwords were captured from data travelling over the company's Wi-Fi", "Sniffing"],
        ],
        extraRight: ["Pharming"],
        explanation: "Unauthorised access: hacking. Forged sender: spoofing. Captured packets: sniffing.",
      }),
      P.mcq({
        label: "(b)", stem: "Every file on the stores computer was encrypted and a message demanded payment. Which malware was this?",
        options: [
          ["Ransomware", "Correct: it encrypts files and demands payment."],
          ["Adware", "Adware shows adverts."],
          ["Worm", "A worm spreads itself; it does not demand payment."],
          ["Spyware", "Spyware secretly collects data."],
        ],
        answer: "A", explanation: "Ransomware.",
      }),
      P.short({
        label: "(c)", stem: "Name the hardware or software that checks traffic entering and leaving the network against a set of rules.",
        accepted: ["firewall", "a firewall"], wrong: ["proxy server"],
        explanation: "A firewall.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "State **two** rules for staff passwords that would make the hacking less likely.",
        points: [
          "Long (at least 8 characters) and a mix of upper and lower case, digits and symbols",
          "Not a name/birthday/dictionary word / not shared or reused / changed if seen / account locks after failed attempts",
        ],
        modelAnswer: "Passwords must be at least 10 characters with upper and lower case, digits and symbols, and must never be names, birthdays or passwords used elsewhere.",
      }),
      P.manual({
        label: "(e)", marks: 3,
        stem: "Explain how a proxy server would help protect the company's network.",
        points: [
          "Requests go to the proxy, which fetches pages on the users' behalf, so internal IP addresses are hidden from outside",
          "It filters requests, blocking dangerous or unsuitable websites",
          "It can act as a firewall / absorb attacks before they reach the network (and caches pages)",
        ],
        modelAnswer: "Staff computers send their web requests to the proxy, which fetches the pages itself, so outsiders only ever see the proxy's address, not the company's computers. The proxy blocks requests to dangerous websites, and it can filter incoming traffic like a firewall before it reaches the internal network.",
      }),
    ],
    explanation: "(a) hacking, spoofing, sniffing (b) ransomware (c) firewall.",
  });
});
