// Slice w3a: network protocols, TCP/IP and the OSI model (comp.network.protocols, ZIMSEC only).
import { concept, P } from "../lib.mjs";

const OSI = ["Physical", "Data link", "Network", "Transport", "Session", "Presentation", "Application"];
const TCPIP = ["Link", "Internet", "Transport", "Application"];

concept("comp.network.protocols", { file: "network/protocols", keyPrefix: "network.protocols" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a network **protocol**?",
    options: [
      ["A set of rules for how data is transmitted between devices", "Correct: protocols are agreed rules."],
      ["A device that forwards packets between networks", "That is a router."],
      ["A cable that carries data between two computers", "That is a transmission medium."],
      ["A program that removes viruses from a network", "That is anti-malware software."],
    ],
    answer: "A",
    explanation: "A protocol is a set of rules covering the format, addressing, error checking and timing of data transmission.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which protocol is used to **send** an email from a mail client to a mail server?",
    options: [
      ["SMTP", "Correct: the Simple Mail Transfer Protocol sends email."],
      ["POP3", "POP3 downloads (receives) email."],
      ["IMAP", "IMAP reads email kept on the server."],
      ["FTP", "FTP transfers files."],
    ],
    answer: "A",
    explanation: "SMTP sends email; POP3 and IMAP are used to receive it.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A web designer in Harare uploads the files of a new website from her laptop to the web server. Which protocol is designed for this?",
    options: [
      ["FTP", "Correct: the File Transfer Protocol moves files between computers."],
      ["SMTP", "SMTP sends email."],
      ["IMAP", "IMAP is for reading email."],
      ["POP3", "POP3 downloads email."],
    ],
    answer: "A",
    explanation: "FTP uploads and downloads files between a client and a server.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why should an online shop use HTTPS rather than HTTP on its payment page?",
    options: [
      ["HTTPS encrypts the data sent between browser and server", "Correct: card and login details cannot be read if intercepted."],
      ["HTTPS makes web pages load without any server", "Pages still come from a web server."],
      ["HTTPS sends the shop's emails to customers", "Email is sent with SMTP."],
      ["HTTPS compresses images so pages load faster", "Its purpose is security, not compression."],
    ],
    answer: "A",
    explanation: "HTTPS is HTTP with encryption (SSL/TLS), so intercepted data is unreadable.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which TCP/IP layer splits data into packets and checks they all arrive?"],
    stem: "In the TCP/IP suite, which layer splits data into packets, numbers them and resends any that are lost?",
    options: [
      ["Transport layer", "Correct: TCP works at the transport layer."],
      ["Application layer", "The application layer provides services such as HTTP and SMTP."],
      ["Internet layer", "The internet layer adds IP addresses and routes packets."],
      ["Link layer", "The link layer sends signals over the local medium."],
    ],
    answer: "A",
    explanation: "TCP, at the transport layer, splits data into numbered packets, checks delivery and resends lost packets.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Count up from the physical layer."],
    stem: "Which OSI layer is responsible for logical (IP) addressing and routing packets between networks?",
    options: [
      ["Layer 3, network", "Correct: routers work at the network layer."],
      ["Layer 2, data link", "The data link layer uses MAC addresses within a local network."],
      ["Layer 4, transport", "The transport layer ensures reliable delivery."],
      ["Layer 6, presentation", "The presentation layer translates, encrypts and compresses data."],
    ],
    answer: "A",
    explanation: "OSI layer 3 (network) handles IP addressing and routing.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    hints: ["Which protocol leaves the mail on the server?"],
    stem: "Nyasha reads her email on a phone, a tablet and a laptop and wants all three to show the same messages and folders. Which protocol should her mail app use?",
    options: [
      ["IMAP", "Correct: mail stays on the server and stays in step on every device."],
      ["POP3", "POP3 usually downloads mail to one device and removes it from the server."],
      ["SMTP", "SMTP only sends email."],
      ["FTP", "FTP transfers files, not email."],
    ],
    answer: "A",
    explanation: "IMAP keeps messages on the server, so every device shows the same mailbox.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which layer encrypts or translates data formats?"],
    stem: "In the OSI model, at which layer would data be encrypted and compressed before it is sent?",
    options: [
      ["Presentation", "Correct: layer 6 translates formats and handles encryption and compression."],
      ["Session", "Layer 5 sets up and ends sessions."],
      ["Physical", "Layer 1 sends raw bits as signals."],
      ["Network", "Layer 3 handles addressing and routing."],
    ],
    answer: "A",
    explanation: "The presentation layer (6) translates data formats and deals with encryption and compression.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Protocols allow devices made by different manufacturers to communicate with each other.",
    answer: true,
    explanation: "True. Because every device follows the same agreed rules, the make of the device does not matter.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "The OSI model has four layers and the TCP/IP suite has seven.",
    answer: false,
    explanation: "False. It is the other way round: OSI has seven layers and TCP/IP has four.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each protocol to what it does.",
    pairs: [
      ["HTTP", "Transfers web pages from a server to a browser"],
      ["FTP", "Uploads and downloads files between computers"],
      ["SMTP", "Sends email to a mail server"],
      ["POP3", "Downloads email from the server to one device"],
    ],
    explanation: "HTTP: web pages. FTP: files. SMTP: sending email. POP3: downloading email.",
  });
  b.match({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Work up from the cable to the user's program."],
    stem: "Match each TCP/IP layer to its job.",
    pairs: [
      ["Application", "Provides services such as web browsing and email to programs"],
      ["Transport", "Splits data into numbered packets and checks they all arrive"],
      ["Internet", "Adds IP addresses and routes packets across networks"],
      ["Link", "Sends signals over the local network medium"],
    ],
    explanation: "Application: services. Transport: TCP packets. Internet: IP routing. Link: physical transmission.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    hints: ["Layer 1 is closest to the cable."],
    stem: "Complete the list of OSI layers, from layer 1 upwards.",
    template: `1 ${OSI[0]}, 2 {{blank:a}}, 3 ${OSI[2]}, 4 {{blank:b}}, 5 ${OSI[4]}, 6 {{blank:c}}, 7 ${OSI[6]}`,
    blanks: [
      { id: "a", accepted: [OSI[1]], choices: [OSI[1], OSI[3], OSI[5], "Internet"] },
      { id: "b", accepted: [OSI[3]], choices: [OSI[1], OSI[3], OSI[5], "Internet"] },
      { id: "c", accepted: [OSI[5]], choices: [OSI[1], OSI[3], OSI[5], "Internet"] },
    ],
    explanation: `OSI from layer 1: ${OSI.join(", ")}.`,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the protocol, from the TCP/IP suite, that adds the source and destination addresses to each packet and routes it across networks.",
    accepted: ["IP", "internet protocol", "the internet protocol"],
    wrong: ["TCP"],
    explanation: "IP (the Internet Protocol) handles addressing and routing.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["What must sender and receiver agree on?"],
    stem: "Explain why protocols are needed when data is sent across a network.",
    points: [
      "So that devices from different manufacturers / with different software can communicate",
      "Both ends agree on the format of the data / packets and on addressing",
      "Both ends agree on error checking and the speed or order of transmission",
    ],
    explanation: "Protocols are shared rules; without them, a receiver could not interpret the data sent.",
    modelAnswer: "Protocols give every device the same rules, so a phone and a server made by different companies can still communicate. Both ends agree how the data is formatted into packets and addressed, how errors are detected and corrected, and how fast and in what order data is sent.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Down the layers at the sender, up the layers at the receiver."],
    stem: "Describe how an email is passed through the four layers of TCP/IP at the sender's computer.",
    points: [
      "Application layer: the email program uses SMTP to prepare the message for sending",
      "Transport layer: TCP splits the message into numbered packets",
      "Internet layer: IP adds the source and destination IP addresses (for routing)",
      "Link layer: the packets are sent as signals over the cable or wireless link (using the NIC/MAC addresses)",
    ],
    explanation: "Data passes down the layers at the sender, each adding its own header.",
    modelAnswer: "The email program, at the application layer, uses SMTP to hand over the message. At the transport layer TCP splits it into numbered packets. At the internet layer IP adds the sender's and the mail server's IP addresses. At the link layer the NIC sends the packets as signals over the network to the router.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true,
    hints: ["Sending and receiving email use different protocols.", "Which protocol encrypts web data?"],
    stem: "Tendai runs a small travel agency in Victoria Falls. Customers book tours on the agency's website and receive confirmations by email.",
    parts: [
      P.short({
        label: "(a)", stem: "Name the protocol that should be used for the booking pages, where customers enter their payment details.",
        accepted: ["HTTPS", "hypertext transfer protocol secure", "HTTP secure"], wrong: ["HTTP"],
        explanation: "HTTPS encrypts the data.",
      }),
      P.mcq({
        label: "(b)", stem: "Which protocol sends the confirmation emails?",
        options: [
          ["SMTP", "Correct: SMTP sends email."],
          ["IMAP", "IMAP reads email on the server."],
          ["FTP", "FTP transfers files."],
          ["HTTP", "HTTP transfers web pages."],
        ],
        answer: "A", explanation: "SMTP sends email.",
      }),
      P.tf({
        label: "(c)", stem: "If one packet of a booking is lost, TCP arranges for it to be sent again.",
        answer: true, explanation: "True. TCP checks delivery and resends lost packets.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Tendai's web designer updates the website by uploading new pages. Name the protocol and explain why it is used.",
        points: [
          "FTP (File Transfer Protocol)",
          "It is designed to transfer (upload and download) whole files between a computer and a server",
        ],
        modelAnswer: "FTP, because it is the protocol designed for uploading and downloading files between the designer's computer and the web server.",
      }),
    ],
    explanation: "(a) HTTPS (b) SMTP (c) true.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["Hubs, switches and routers work at different OSI layers.", "Compare the number of layers and how they map."],
    stem: "A Form 4 class is comparing the OSI model with the TCP/IP suite.",
    parts: [
      P.num({
        label: "(a)", stem: "How many layers does the OSI model have?",
        value: OSI.length, wrong: [TCPIP.length],
        explanation: `The OSI model has ${OSI.length} layers.`,
        workedSolution: `1. List them: ${OSI.join(", ")}.\n2. That is ${OSI.length} layers.`,
      }),
      P.match({
        label: "(b)", stem: "Match each device to the OSI layer at which it mainly works.",
        pairs: [
          ["Hub", "Physical (layer 1)"],
          ["Switch", "Data link (layer 2)"],
          ["Router", "Network (layer 3)"],
        ],
        explanation: "Hub: physical signals. Switch: MAC addresses (data link). Router: IP addresses (network).",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Describe how the layers of the TCP/IP suite relate to the layers of the OSI model.",
        points: [
          "The TCP/IP application layer covers the OSI application, presentation and session layers (5-7)",
          "The TCP/IP transport layer matches the OSI transport layer (4)",
          "The TCP/IP internet layer matches the OSI network layer (3)",
          "The TCP/IP link layer covers the OSI data link and physical layers (1-2)",
        ],
        modelAnswer: "TCP/IP squeezes seven layers into four: its application layer does the work of OSI layers 5 to 7, its transport and internet layers match OSI transport and network, and its link layer covers OSI data link and physical.",
      }),
    ],
    explanation: `(a) ${OSI.length} (b) hub physical, switch data link, router network.`,
  });

  b.card("DEFINITION", "What is a **protocol**?", "A set of rules for transmitting data between devices: data format, addressing, error checking and timing.");
  b.card("FACT", "The four layers of TCP/IP (top to bottom)?", "Application, transport, internet, link.");
  b.card("FACT", "The seven OSI layers (1 to 7)?", "Physical, data link, network, transport, session, presentation, application.", "Memory aid from layer 7 down: All People Seem To Need Data Processing.");
  b.card("CONCEPT", "TCP compared with IP?", "TCP splits data into numbered packets and makes sure all arrive in order (resending lost ones); IP addresses and routes each packet.");
  b.card("FACT", "HTTP and HTTPS?", "Transfer web pages between server and browser; HTTPS encrypts the data (SSL/TLS).");
  b.card("FACT", "What is FTP used for?", "Transferring (uploading and downloading) files between computers, e.g. uploading a website to a server.");
  b.card("CONCEPT", "SMTP, POP3 and IMAP?", "SMTP sends email. POP3 downloads email to one device. IMAP keeps email on the server so several devices stay in step.");
  b.card("CONCEPT", "Why are protocols needed?", "So that devices from different manufacturers can communicate, by agreeing on format, addressing, error checking and timing.");
  b.card("FACT", "Which OSI layer handles encryption and compression?", "Layer 6, the presentation layer.");
});
