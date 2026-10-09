// Slice w3a: networking devices (comp.network.devices). Hub, switch, bridge, modem and design items are ZIMSEC only.
import { concept, P, ZIM } from "../lib.mjs";

concept("comp.network.devices", { file: "network/devices", keyPrefix: "network.devices" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which hardware component does a computer need in order to connect to a network?",
    options: [
      ["Network interface card", "Correct: the NIC connects the device to the network."],
      ["Graphics card", "A graphics card produces the display."],
      ["Sound card", "A sound card handles audio."],
      ["Solid-state drive", "An SSD is storage, not a network connection."],
    ],
    answer: "A",
    explanation: "A network interface card (wired or wireless) is needed to connect a device to a network.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which address does a router use to decide where to forward a packet?",
    options: [
      ["The destination IP address", "Correct: routers forward packets between networks using IP addresses."],
      ["The source MAC address", "MAC addresses are used by switches within a LAN."],
      ["The web page's URL", "A URL is first turned into an IP address by DNS."],
      ["The packet's sequence number", "The sequence number is for reassembling packets in order."],
    ],
    answer: "A",
    explanation: "A router reads the destination IP address and uses its routing table to choose where to send the packet next.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a role of a router on a home network?",
    options: [
      ["Assigning IP addresses to devices as they join", "Correct: routers can give each device a local IP address."],
      ["Giving each device its MAC address", "MAC addresses are set at manufacture."],
      ["Storing the files of every user", "That is a file server's job."],
      ["Converting the screen output to a printed copy", "That is a printer."],
    ],
    answer: "A",
    explanation: "A router forwards data, assigns IP addresses to devices on the local network and connects the network to the internet.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "What does a **hub** do with a packet it receives?",
    options: [
      ["Sends it to every other device connected to it", "Correct: a hub broadcasts to all ports."],
      ["Sends it only to the device with the matching MAC address", "That is what a switch does."],
      ["Forwards it to another network using its IP address", "That is a router's job."],
      ["Converts it into an analogue signal", "That is a modem's job."],
    ],
    answer: "A",
    explanation: "A hub repeats each packet to every port; each device checks whether the packet is for it.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS", applies: ZIM,
    hints: ["Think about where each packet goes."],
    stem: "A school replaces the hub in its computer room with a switch. Why does the network become faster?",
    options: [
      ["Packets go only to their destination, so there is less traffic", "Correct: fewer packets on each link and fewer collisions."],
      ["The switch makes every cable carry light instead of electricity", "Switches do not change the medium."],
      ["The switch gives the computers faster processors", "Processor speed is unaffected by the switch."],
      ["The switch converts packets into analogue signals", "That is a modem, and it would not speed up a LAN."],
    ],
    answer: "A",
    explanation: "A switch uses MAC addresses to send each packet only to the right port, reducing traffic and collisions.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING", applies: ZIM,
    hints: ["Modem is short for two words."],
    stem: "Why is a modem needed when a computer connects to the internet over a telephone line that carries analogue signals?",
    options: [
      ["To convert between digital data and the line's signal", "Correct: it modulates and demodulates."],
      ["To give the computer a MAC address", "The NIC has the MAC address."],
      ["To join two segments of the same local area network", "That is a bridge."],
      ["To block harmful websites", "That is a firewall or proxy server."],
    ],
    answer: "A",
    explanation: "A modem modulates digital data into a signal the line can carry and demodulates incoming signals back into digital data.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION", applies: ZIM,
    hints: ["Both parts of the office use the same protocol and form one network."],
    stem: "An office has two LAN segments on different floors, both using the same protocol. Which device joins them into one network while keeping each floor's local traffic on its own side?",
    options: [
      ["Bridge", "Correct: a bridge joins LAN segments and filters traffic using MAC addresses."],
      ["Modem", "A modem converts signals for a line."],
      ["Network interface card", "A NIC connects one device."],
      ["Wireless access point", "A WAP lets wireless devices join a LAN."],
    ],
    answer: "A",
    explanation: "A bridge connects two segments of a LAN and passes a packet across only when its destination is on the other side.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Which device works between networks rather than within one?"],
    stem: "A packet travels from a laptop in Bulawayo to a web server in another country. Which devices choose the path the packet takes across the internet?",
    options: [
      ["Routers", "Correct: each router forwards the packet to the next router towards the destination."],
      ["Switches", "Switches deliver packets within a LAN."],
      ["Network interface cards", "NICs only send and receive data for their own device."],
      ["Wireless access points", "WAPs connect wireless devices to a LAN."],
    ],
    answer: "A",
    explanation: "Routers use routing tables and destination IP addresses to forward each packet hop by hop across the internet.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A switch sends each packet only to the device whose MAC address matches the destination address.",
    answer: true,
    explanation: "True. A switch learns which MAC address is on each port and forwards packets only to the right port.",
    applies: ZIM,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A router connects a local network to the internet.",
    answer: true,
    explanation: "True. A router joins networks, for example a school LAN to the internet service provider.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A computer can join a network without any network interface card, as long as it has an IP address.",
    answer: false,
    explanation: "False. The NIC is the hardware that actually connects the device to the network; an IP address alone cannot do that.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING", applies: ZIM,
    stem: "Match each device to its function.",
    pairs: [
      ["Hub", "Sends every packet to all connected devices"],
      ["Switch", "Sends each packet only to its destination device on the LAN"],
      ["Router", "Forwards packets between networks using IP addresses"],
      ["Modem", "Converts between digital data and the signal on a line"],
      ["Bridge", "Joins two segments of a LAN that use the same protocol"],
    ],
    explanation: "Hub: broadcast. Switch: MAC-based delivery. Router: IP-based forwarding between networks. Modem: signal conversion. Bridge: joins LAN segments.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Switches work inside a LAN; routers work between networks."],
    stem: "Complete the sentences.",
    template: "A switch delivers packets inside a LAN using {{blank:a}} addresses. A router forwards packets between networks using {{blank:b}} addresses, which it looks up in its routing {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["MAC"], choices: ["MAC", "IP", "email", "web"] },
      { id: "b", accepted: ["IP"], choices: ["MAC", "IP", "email", "web"] },
      { id: "c", accepted: ["table"], choices: ["table", "card", "cable", "port"] },
    ],
    explanation: "Switch: MAC addresses. Router: IP addresses and a routing table.",
    applies: ZIM,
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the device that lets laptops and phones join a wired LAN without a cable.",
    accepted: ["wireless access point", "access point", "WAP", "a wireless access point", "an access point"],
    wrong: ["switch"],
    explanation: "A wireless access point connects wireless devices to the wired LAN.",
    applies: ZIM,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    hints: ["There are three ideas in the role of a router."],
    stem: "Describe the role of a router in a school network that is connected to the internet.",
    points: [
      "It forwards (sends) data packets to a specific destination, using the IP address / a routing table",
      "It can assign IP addresses to devices on the school network",
      "It connects the school's local network to the internet (so all devices share one connection)",
    ],
    explanation: "A router forwards packets using IP addresses, assigns local IP addresses and joins the LAN to the internet.",
    modelAnswer: "The router reads the destination IP address of each packet and forwards it towards its destination using its routing table. It gives each computer on the school network an IP address as it joins, and it connects the whole school LAN to the internet through the provider.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["What is stored on the NIC at manufacture?"],
    stem: "Explain why a computer needs a network interface card (NIC) to access a network.",
    points: [
      "The NIC provides the physical connection (port or wireless radio) and sends and receives data on the network",
      "It holds the device's unique MAC address, so the device can be identified on the network",
    ],
    explanation: "The NIC is the hardware link to the network and carries the MAC address that identifies the device.",
    modelAnswer: "The NIC is the hardware that physically connects the computer to the network and sends and receives its data, and it holds the computer's unique MAC address so that data can be delivered to it.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, applies: ZIM,
    hints: ["Start at the centre of the star.", "Which device connects the LAN to the provider?"],
    stem: "Nyasha is designing a network for a new internet café in Gweru with 12 desktop computers, a shared printer and Wi-Fi for customers' phones.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which device should be at the centre of the star network?",
        options: [
          ["Switch", "Correct: it sends packets only to their destination."],
          ["Modem", "A modem converts signals for the provider's line."],
          ["Bridge", "A bridge joins LAN segments."],
          ["Hub", "A hub works but floods every port with every packet."],
        ],
        answer: "A", explanation: "A switch at the centre of the star.",
      }),
      P.short({
        label: "(b)", stem: "Name the device that connects the café's LAN to the internet service provider.",
        accepted: ["router", "a router"], wrong: ["switch"],
        explanation: "A router joins the LAN to the provider's network.",
      }),
      P.short({
        label: "(c)", stem: "Name the device needed so that customers' phones can join the network.",
        accepted: ["wireless access point", "access point", "WAP", "a wireless access point"], wrong: ["hub"],
        explanation: "A wireless access point connected to the switch.",
      }),
      P.manual({
        label: "(d)", marks: 3,
        stem: "Describe how the café's devices should be connected.",
        points: [
          "Each computer (with its NIC) and the printer is cabled to the switch",
          "The wireless access point is cabled to the switch",
          "The switch is connected to the router, which connects to the provider's line (through a modem if needed)",
        ],
        modelAnswer: "Run a twisted pair cable from each computer's NIC and from the printer to a switch. Connect a wireless access point to the switch for customers' phones. Connect the switch to the router, which links to the provider's line, using a modem if the line needs one.",
      }),
    ],
    explanation: "(a) switch (b) router (c) wireless access point.",
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true,
    hints: ["The NIC holds the MAC address.", "A router reads IP addresses and uses a routing table."],
    stem: "Farai's home has a laptop, two phones and a smart TV connected wirelessly to a router supplied by the internet service provider.",
    parts: [
      P.tf({
        label: "(a)", stem: "Each of Farai's devices has its own network interface card.",
        answer: true, explanation: "True. Every device that joins a network needs a NIC, wired or wireless.",
      }),
      P.mcq({
        label: "(b)", stem: "When Farai's laptop joins the home network, which device gives it an IP address?",
        options: [
          ["The router", "Correct: the router assigns local IP addresses."],
          ["The laptop's NIC", "The NIC holds the MAC address, not the IP address it is given."],
          ["The web server", "Web servers do not assign home addresses."],
          ["The smart TV", "Devices on the network do not give each other addresses."],
        ],
        answer: "A", explanation: "The router assigns an IP address to each device as it joins.",
      }),
      P.manual({
        label: "(c)", marks: 4,
        stem: "Farai streams a film on the smart TV. Describe how the router handles the data travelling between the internet and the TV.",
        points: [
          "Packets arrive from the internet addressed to the home network",
          "The router reads the destination IP address of each packet",
          "It forwards each packet to the TV (the correct device on the local network)",
          "Requests from the TV are forwarded out to the internet, the router choosing the next step using its routing table",
        ],
        modelAnswer: "The TV's requests go to the router, which reads the destination IP address of each packet and uses its routing table to forward it to the internet. Packets of the film arrive back at the router, which reads their destination address and forwards each one to the TV on the home network.",
      }),
    ],
    explanation: "(a) true (b) the router.",
  });

  b.card("DEFINITION", "What is a **network interface card** (NIC)?", "The hardware that connects a device to a network (by cable or wirelessly); it holds the device's MAC address.");
  b.card("CONCEPT", "Three roles of a router?", "Forwards packets to a destination using IP addresses (routing table); assigns IP addresses to local devices; connects a LAN to the internet.");
  b.card("CONCEPT", "Hub compared with switch?", "A hub sends every packet to all devices; a switch uses MAC addresses to send it only to the destination device.", "A switch gives less traffic, fewer collisions and better security.", { applies: ZIM });
  b.card("DEFINITION", "What does a **bridge** do?", "Joins two segments of a LAN that use the same protocol, passing packets across only when needed.", undefined, { applies: ZIM });
  b.card("DEFINITION", "What does a **modem** do?", "Modulates digital data into a signal a line can carry and demodulates incoming signals back to digital.", undefined, { applies: ZIM });
  b.card("FACT", "Which address does a switch use, and which does a router use?", "Switch: MAC address (inside a LAN). Router: IP address (between networks).", undefined, { applies: ZIM });
  b.card("DEFINITION", "What is a **wireless access point**?", "A device, usually cabled to a switch, that lets wireless devices join a wired LAN.", undefined, { applies: ZIM });
  b.card("DEFINITION", "What is a **routing table**?", "A table inside a router that tells it where to send packets next for each destination network.");
  b.card("CONCEPT", "Designing a small LAN: which devices in order?", "NIC in each device → cables to a switch (plus a wireless access point) → router → provider's line (modem if needed).", undefined, { applies: ZIM });
});
