// Slice w3a: Cambridge 0478 Paper 1 exam-format items (STRUCTURED, 15 marks, ANALYSIS, Cambridge only).
import { concept, P, CAM, toBase, fromBase, group } from "../lib.mjs";

const C = (k) => `comp.${k}`;
const mac = "3C:A0:67:5D:12:F8";
const macParts = mac.split(":");
const maker = macParts.slice(0, 3).join(":");
const pairHex = macParts[3];
const pairVal = fromBase(pairHex, 16);

concept(C("network.devices"), { file: "exam/w3a-cambridge", keyPrefix: "exam.w3a-cambridge", applies: CAM }, (b) => {
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("network.devices"), C("network.addressing"), C("network.cloud")],
    hints: ["The first half of a MAC address is the manufacturer code.", "Each hex digit is four bits."],
    stem: `A graphic design company in Bulawayo has 20 computers connected to a router. One computer's network interface card (NIC) has the MAC address \`${mac}\`.`,
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Explain why each computer needs a NIC to access the network.",
        points: [
          "The NIC is the hardware that connects the computer to the network (by cable or wirelessly) and sends/receives its data",
          "It is given a unique MAC address at manufacture, which identifies the computer on the network",
        ],
        modelAnswer: "Without a NIC the computer has no hardware to connect to the network and send or receive data, and the NIC carries the unique MAC address that identifies the computer on the network.",
      }),
      P.short({
        label: "(b)", stem: "Write down the part of the MAC address that is the manufacturer code.",
        accepted: [maker, maker.replace(/:/g, ""), maker.replace(/:/g, "-")],
        normalise: ["trim", "lowercase", "remove_whitespace"],
        wrong: [macParts.slice(3).join(":")],
        explanation: `The first six hex digits, ${maker}, identify the manufacturer.`,
      }),
      P.bits({
        label: "(c)", stem: `Convert the pair \`${pairHex}\` from the MAC address into an 8-bit binary number.`,
        value: pairVal, width: 8,
        explanation: `${pairHex[0]} = ${toBase(fromBase(pairHex[0], 16), 2, 4)}, ${pairHex[1]} = ${toBase(fromBase(pairHex[1], 16), 2, 4)}: ${group(toBase(pairVal, 2, 8))}.`,
      }),
      P.mcq({
        label: "(d)", stem: "Which statement about the computers' IP addresses is correct?",
        options: [
          ["They are allocated by the network and may be static or dynamic", "Correct."],
          ["They are set when the NIC is manufactured", "That is the MAC address."],
          ["They are always written in hexadecimal pairs", "That describes a MAC address; IPv4 uses denary."],
          ["They never change once the computer is switched on", "Dynamic addresses can change on each connection."],
        ],
        answer: "A", explanation: "IP addresses are allocated by the network, static or dynamic.",
      }),
      P.match({
        label: "(e)", stem: "The company's router supports IPv4 and IPv6. Classify each feature as IPv4 or IPv6.",
        pairs: ["32 bits long", "128 bits long", "Four denary numbers separated by full stops", "Eight groups of hexadecimal digits separated by colons"],
        right: ["IPv4", "IPv6"],
        rightIndex: [0, 1, 0, 1],
        explanation: "IPv4: 32-bit, denary with full stops. IPv6: 128-bit, hex with colons.",
      }),
      P.manual({
        label: "(f)", marks: 3,
        stem: "Describe the role of the router in the company's network.",
        points: [
          "It sends/forwards data to a specific destination, using the IP address (routing table)",
          "It assigns IP addresses to the computers on the network (dynamic addresses)",
          "It connects the company's local network to the internet",
        ],
        modelAnswer: "The router reads the destination IP address of each packet and forwards it towards that destination. It gives each of the 20 computers an IP address when it connects, and it connects the company's LAN to the internet.",
      }),
      P.tf({
        label: "(g)", stem: "The company is considering cloud storage. Cloud storage keeps data on physical servers owned by the cloud provider.",
        answer: true, explanation: "True. Cloud storage needs physical servers and storage devices.",
      }),
      P.manual({
        label: "(h)", marks: 2,
        stem: "The company's design files are very large. Give **one** advantage and **one** disadvantage to the company of storing them in the cloud rather than locally.",
        points: [
          "Advantage: designers can open files remotely from any device / easy to share with clients / provider backs them up / no hardware to buy",
          "Disadvantage: large files are slow to upload/download and need a reliable internet connection / security of data held by a third party / ongoing cost",
        ],
        modelAnswer: "Designers could open and share the files from anywhere, but uploading and downloading such large files would be slow and impossible when the internet connection is down.",
      }),
    ],
    explanation: `(b) ${maker} (c) ${group(toBase(pairVal, 2, 8))} (d) allocated by the network (e) IPv4, IPv6, IPv4, IPv6 (g) true.`,
  });

  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, paper: "Paper 1", secs: 1350, calculator: false,
    concepts: [C("security.malware"), C("security.cyber-attacks"), C("security.authentication-access"), C("security.network-defences")],
    hints: ["Look for the clue in each description: trial and error, flood, redirect, trick.", "SSL uses a certificate and encryption."],
    stem: "An online shop based in Harare sells school uniforms. Its owner, Tatenda, is worried about cyber security threats.",
    parts: [
      P.match({
        label: "(a)", stem: "Match each description to the threat.",
        pairs: [
          ["Software tries thousands of possible passwords for the admin account", "Brute-force attack"],
          ["A botnet floods the shop's web server with requests", "DDoS attack"],
          ["Customers who type the shop's correct address are sent to a fake copy of it", "Pharming"],
          ["A caller pretending to be from the bank persuades a worker to reveal a code", "Social engineering"],
        ],
        extraRight: ["Phishing"],
        explanation: "Trial and error: brute force. Flood: DDoS. Redirect on the correct address: pharming. Tricking a person: social engineering.",
      }),
      P.mcq({
        label: "(b)", stem: "A worker installs a free \"invoice generator\" that secretly opens a back door for an attacker. What type of malware is this?",
        options: [
          ["Trojan horse", "Correct: disguised as useful software."],
          ["Worm", "A worm spreads itself and is not disguised as a wanted program."],
          ["Adware", "Adware shows adverts."],
          ["Ransomware", "Ransomware encrypts files for payment."],
        ],
        answer: "A", explanation: "A Trojan horse.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Describe how a phishing attack on the shop's customers would be carried out, and its aim.",
        points: [
          "The criminal sends emails/messages that appear to come from the shop (a trusted source)",
          "The email contains a link to a fake website that looks like the shop's",
          "Aim: customers enter login or payment details, which are stolen for fraud / identity theft",
        ],
        modelAnswer: "The criminal sends customers emails that look as if they come from the shop, often with an urgent offer or warning, and a link to a fake copy of the website. Customers who click and log in or pay give their account and card details to the criminal, who uses them for fraud.",
      }),
      P.fib({
        label: "(d)", stem: "Complete the description of how SSL protects customers on the shop's website.",
        template: "The shop's web server sends its digital {{blank:a}} to the browser, which checks it. The data sent between them is then {{blank:b}}.",
        blanks: [
          { id: "a", accepted: ["certificate"], choices: ["certificate", "password", "firewall", "cookie"] },
          { id: "b", accepted: ["encrypted"], choices: ["encrypted", "compressed", "cached", "deleted"] },
        ],
        explanation: "Certificate checked, then data encrypted.",
      }),
      P.manual({
        label: "(e)", marks: 2,
        stem: "Explain how two-step verification would protect the shop's admin account from the brute-force attack.",
        points: [
          "Even if the password is guessed, the attacker also needs a one-time code",
          "The code is sent to / generated on the owner's own device, which the attacker does not have",
        ],
        modelAnswer: "Even if the software guesses the password, it still cannot log in, because it also needs the one-time code sent to Tatenda's phone, which the attacker does not have.",
      }),
      P.manual({
        label: "(f)", marks: 2,
        stem: "Explain how a firewall helps to keep the shop's data safe.",
        points: [
          "It monitors incoming and outgoing traffic and checks it against set rules/criteria",
          "It blocks traffic that does not meet the rules, e.g. unauthorised access attempts (hacking)",
        ],
        modelAnswer: "The firewall checks all traffic entering and leaving the shop's network against rules set by the owner, and blocks any that break them, such as a hacker trying to connect to the server.",
      }),
      P.tf({
        label: "(g)", stem: "Automating software updates helps protect the shop because updates patch security weaknesses that attackers could exploit.",
        answer: true, explanation: "True. Updates close known security holes.",
      }),
    ],
    explanation: "(a) brute force, DDoS, pharming, social engineering (b) Trojan horse (d) certificate, encrypted (g) true.",
  });
});
