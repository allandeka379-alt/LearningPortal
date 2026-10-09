// Slice w3a: MAC and IP addresses (comp.network.addressing). All conversions are computed.
import { concept, P, toBase, fromBase, group } from "../lib.mjs";

const mac = "A4:5E:60:C2:17:3F";
const macParts = mac.split(":");
const maker = macParts.slice(0, 3).join(":");
const serial = macParts.slice(3).join(":");
const macBits = macParts.length * 8;
const pairHex = macParts[3]; // C2
const pairVal = fromBase(pairHex, 16);
const ip = [172, 16, 5, 130];
const ip2 = [100, 72, 9, 14];
const mac2 = "6C:3F:A2:58:0B:D4";
const serial2 = mac2.split(":").slice(3).join(":");
const maker2 = mac2.split(":").slice(0, 3).join(":");
const lastOctet = ip[3];
const octetDen = 77;
const ipv6Groups = 128 / 16;
const ipv6HexDigits = 128 / 4;
const ipv4Max = 2 ** 8 - 1;

// IPv6 shortening, computed.
function shorten(full) {
  const groups = full.split(":").map((g) => g.replace(/^0+(?=.)/, ""));
  // longest run of "0" groups (length >= 2)
  let best = [-1, 0];
  for (let i = 0; i < groups.length; ) {
    if (groups[i] !== "0") { i++; continue; }
    let j = i;
    while (j < groups.length && groups[j] === "0") j++;
    if (j - i > best[1] && j - i >= 2) best = [i, j - i];
    i = j;
  }
  if (best[0] < 0) return groups.join(":");
  const left = groups.slice(0, best[0]).join(":");
  const right = groups.slice(best[0] + best[1]).join(":");
  return `${left}::${right}`;
}
const v6 = "FE80:0000:0000:0000:02A1:00FF:0000:7C3B";
const v6s = shorten(v6);
if (v6s !== "FE80::2A1:FF:0:7C3B") throw new Error(`unexpected ${v6s}`);
const v6b = "2001:0DB8:0000:0000:0000:0000:0000:0001";
const v6bs = shorten(v6b);
if (v6bs !== "2001:DB8::1") throw new Error(`unexpected ${v6bs}`);

concept("comp.network.addressing", { file: "network/addressing", keyPrefix: "network.addressing" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "When is a device's MAC address assigned?",
    options: [
      ["When its network interface card is manufactured", "Correct: the MAC address is set at manufacture."],
      ["Each time the device connects to a network", "That describes a dynamic IP address."],
      ["When the user first registers the device online", "The MAC address exists before the device is sold."],
      ["When the internet service provider installs a line", "ISPs deal with IP addresses, not MAC addresses."],
    ],
    answer: "A",
    explanation: "A MAC address is given to the NIC at the point of manufacture and normally does not change.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: `The MAC address of a printer's network card is \`${mac}\`. What does \`${maker}\` identify?`,
    options: [
      ["The manufacturer of the network card", "Correct: the first half is the manufacturer code."],
      ["The serial number of the card", "The serial number is the second half."],
      ["The network the printer is connected to", "MAC addresses do not identify networks; IP addresses are used for that."],
      ["The printer's IP address in hexadecimal", "The MAC and IP addresses are separate addresses."],
    ],
    answer: "A",
    explanation: `The first six hex digits (${maker}) are the manufacturer code; the last six (${serial}) are the card's serial number.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which statement about IP addresses is correct?",
    options: [
      ["An IP address is allocated by the network the device joins", "Correct: a device gets its IP address from the network."],
      ["An IP address is fixed when the device is manufactured", "That describes a MAC address."],
      ["Every IPv4 address is written in hexadecimal", "IPv4 is written as four denary numbers."],
      ["An IP address is the same on every network a laptop joins", "A laptop usually gets a different IP address on each network."],
    ],
    answer: "A",
    explanation: "IP addresses are allocated by the network, static or dynamic; MAC addresses are set at manufacture.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which of these is a valid IPv4 address?",
    options: [
      ["10.45.200.7", "Correct: four denary numbers, each between 0 and 255."],
      ["192.168.256.4", "256 is too big: each part is 8 bits, so the largest value is 255."],
      ["172.16.5", "An IPv4 address has four numbers, not three."],
      ["2001:DB8::1", "This is written in the IPv6 format."],
    ],
    answer: "A",
    explanation: `An IPv4 address is four numbers from 0 to ${ipv4Max}, separated by full stops.`,
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Which kind of address never changes?"],
    stem: "A school's file server must always be found at the same address by every computer. Which type of address should it use?",
    options: [
      ["A static IP address", "Correct: a static address does not change."],
      ["A dynamic IP address", "A dynamic address may change each time the server connects."],
      ["A new MAC address each day", "MAC addresses are fixed; they are not reassigned."],
      ["No address, because servers are found by name only", "Names are translated into IP addresses, so the server still needs one."],
    ],
    answer: "A",
    explanation: "Servers, printers and other devices that must always be found at the same address are given static IP addresses.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    hints: ["Count the bits in each version."],
    stem: "Why was IPv6 introduced?",
    options: [
      ["IPv4's 32 bits do not give enough addresses for every device", "Correct: 128-bit IPv6 provides vastly more addresses."],
      ["IPv4 addresses cannot be used by routers", "Routers use IPv4 addresses all the time."],
      ["IPv6 addresses are shorter and easier to remember", "IPv6 addresses are much longer."],
      ["IPv4 addresses are given at manufacture", "IP addresses are allocated by the network."],
    ],
    answer: "A",
    explanation: "IPv4 gives about 4.3 billion addresses, which is not enough for the number of connected devices; IPv6 uses 128 bits.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    hints: ["Leading zeros may be dropped in each group.", "`::` replaces one run of zero groups."],
    stem: `Which is a correct shortened form of the IPv6 address \`${v6}\`?`,
    options: [
      [`\`${v6s}\``, "Correct: leading zeros dropped and the run of three zero groups replaced by ::."],
      ["`FE80::2A1:FF::7C3B`", "`::` may be used only once in an address."],
      ["`FE8::2A1:FF:0:7C3B`", "Only leading zeros may be dropped; the trailing zero of FE80 must stay."],
      ["`FE80:2A1:FF:0:7C3B`", "The zero groups have been removed without ::, so the address has too few groups."],
    ],
    answer: "A",
    explanation: `Drop leading zeros (02A1 → 2A1, 00FF → FF, 0000 → 0), then replace the longest run of zero groups with :: once: ${v6s}.`,
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A laptop keeps the same MAC address when it moves from a home network to a school network.",
    answer: true,
    explanation: "True. The MAC address is fixed in the NIC; it is the IP address that normally changes.",
  });
  b.tf({
    d: 2, skill: "RECALL",
    stem: "An IPv6 address is 64 bits long.",
    answer: false,
    explanation: "False. IPv6 addresses are 128 bits; IPv4 addresses are 32 bits.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each address feature to the address it describes.",
    pairs: ["Set when the NIC is manufactured", "32 bits written as four denary numbers", "128 bits written as eight groups of hexadecimal digits", "Made of a manufacturer code and a serial number"],
    right: ["MAC address", "IPv4 address", "IPv6 address"],
    rightIndex: [0, 1, 2, 0],
    explanation: "MAC: set at manufacture, manufacturer code + serial number. IPv4: 32-bit denary. IPv6: 128-bit hexadecimal.",
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Convert each hex digit to four bits."],
    stem: `The fourth pair of the MAC address \`${mac}\` is \`${pairHex}\`. Write this pair as an 8-bit binary number.`,
    value: pairVal, width: 8,
    explanation: `${pairHex[0]} = ${toBase(fromBase(pairHex[0], 16), 2, 4)} and ${pairHex[1]} = ${toBase(fromBase(pairHex[1], 16), 2, 4)}, so ${pairHex} = ${group(toBase(pairVal, 2, 8))}.`,
  });
  b.num({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Hex digit × 16 plus the second digit."],
    stem: `Convert the MAC address pair \`${pairHex}\` to denary.`,
    value: pairVal,
    wrong: [fromBase(pairHex[0], 16) + fromBase(pairHex[1], 16)],
    explanation: `${pairHex[0]} = ${fromBase(pairHex[0], 16)}, so ${fromBase(pairHex[0], 16)} × 16 + ${fromBase(pairHex[1], 16)} = ${pairVal}.`,
    workedSolution: `1. ${pairHex[0]} = ${fromBase(pairHex[0], 16)} and ${pairHex[1]} = ${fromBase(pairHex[1], 16)}.\n2. ${fromBase(pairHex[0], 16)} × 16 = ${fromBase(pairHex[0], 16) * 16}.\n3. ${fromBase(pairHex[0], 16) * 16} + ${fromBase(pairHex[1], 16)} = ${pairVal}.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Use the place values 128, 64, 32, 16, 8, 4, 2, 1."],
    stem: `A computer has the IPv4 address \`${ip.join(".")}\`. Write the last number, ${lastOctet}, as an 8-bit binary number.`,
    value: lastOctet, width: 8,
    explanation: `${lastOctet} = 128 + 2, so the binary is ${group(toBase(lastOctet, 2, 8))}.`,
  });
  b.bits({
    d: 3, skill: "APPLICATION", calculator: false,
    hints: ["Write 77 as a sum of place values."],
    stem: `An IPv4 address contains the number ${octetDen}. Write it as an 8-bit binary number.`,
    value: octetDen, width: 8,
    explanation: `${octetDen} = 64 + 8 + 4 + 1, so the binary is ${group(toBase(octetDen, 2, 8))}.`,
  });
  b.num({
    d: 2, skill: "RECALL", calculator: false,
    stem: "How many hexadecimal digits are there in a full IPv6 address written without any shortening?",
    value: ipv6HexDigits,
    wrong: [ipv6Groups],
    explanation: `128 bits ÷ 4 bits per hex digit = ${ipv6HexDigits} digits (${ipv6Groups} groups of 4).`,
    workedSolution: `1. Each hex digit stands for 4 bits.\n2. 128 ÷ 4 = ${ipv6HexDigits} hex digits.`,
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences about MAC addresses.",
    template: `A MAC address is {{blank:a}} bits long and is usually written as 12 {{blank:b}} digits. The second half of the address is the device's {{blank:c}} number.`,
    blanks: [
      { id: "a", accepted: [String(macBits)], choices: ["32", String(macBits), "64", "128"] },
      { id: "b", accepted: ["hexadecimal"], choices: ["hexadecimal", "denary", "binary", "octal"] },
      { id: "c", accepted: ["serial"], choices: ["serial", "manufacturer", "IP", "port"] },
    ],
    explanation: `${macBits} bits, written as 12 hexadecimal digits; first half manufacturer code, second half serial number.`,
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    hints: ["Think about how addresses are handed out and reused."],
    stem: "Explain **one** advantage of dynamic IP addresses for a school network with many learners' devices.",
    points: [
      "Addresses are assigned automatically (by the router) when a device connects, so no one has to set each device up by hand",
      "Addresses are reused when devices leave, so fewer addresses are needed / no two devices are given the same address by mistake",
    ],
    explanation: "Dynamic addressing is automatic and reuses a pool of addresses.",
    modelAnswer: "The router gives each learner's device an address automatically when it joins, so the technician does not configure hundreds of devices, and addresses are reused when learners leave.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 4,
    hints: ["Give a matching fact for each version: length, format, number of addresses."],
    stem: "Compare IPv4 and IPv6 addresses.",
    points: [
      "IPv4 is 32 bits; IPv6 is 128 bits",
      "IPv4 is written as four denary numbers (0-255) separated by full stops",
      "IPv6 is written as eight groups of four hexadecimal digits separated by colons (zeros can be shortened with ::)",
      "IPv6 gives far more possible addresses than IPv4 (about 4.3 billion)",
    ],
    explanation: "The comparison covers length, written format and the number of addresses.",
    modelAnswer: "IPv4 addresses are 32 bits, written as four denary numbers from 0 to 255 separated by full stops, such as 10.4.8.200. IPv6 addresses are 128 bits, written as eight groups of four hex digits separated by colons, and can be shortened with ::. IPv4 allows only about 4.3 billion addresses, while IPv6 allows vastly more.",
  });
  b.struct({
    d: 4, skill: "ANALYSIS", examStyle: true, calculator: false,
    hints: ["Each hex digit is four bits.", "MAC: fixed in hardware; IP: from the network."],
    stem: `Rudo's tablet has the MAC address \`${mac2}\`. At school it is given the IPv4 address \`${ip2.join(".")}\`.`,
    parts: [
      P.short({
        label: "(a)", stem: "Write down the part of the MAC address that is the serial number.",
        accepted: [serial2, serial2.replace(/:/g, ""), serial2.replace(/:/g, "-")],
        normalise: ["trim", "lowercase", "remove_whitespace"],
        wrong: [maker2],
        explanation: `The last six hex digits, ${serial2}, are the serial number.`,
      }),
      P.num({
        label: "(b)", stem: "How many bits are in the MAC address?",
        value: macBits, wrong: [32],
        explanation: `6 pairs × 8 bits = ${macBits} bits.`,
        workedSolution: `1. There are 6 pairs of hex digits.\n2. Each pair is 8 bits: 6 × 8 = ${macBits} bits.`,
      }),
      P.bits({
        label: "(c)", stem: `Convert the second number of the IP address, ${ip2[1]}, into an 8-bit binary number.`,
        value: ip2[1], width: 8,
        explanation: `${ip2[1]} = 64 + 8, so ${group(toBase(ip2[1], 2, 8))}.`,
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Rudo takes her tablet home. Explain what happens to its MAC address and to its IP address.",
        points: [
          "The MAC address stays the same, because it is fixed in the NIC at manufacture",
          "The IP address changes, because the home network/router allocates a new (dynamic) address",
        ],
        modelAnswer: "The MAC address does not change, because it was set in the tablet's NIC when it was made, but the home router gives the tablet a different IP address because IP addresses are allocated by each network.",
      }),
    ],
    explanation: `(a) ${serial2} (b) ${macBits} (c) ${group(toBase(ip2[1], 2, 8))}.`,
  });
  b.struct({
    d: 5, skill: "ANALYSIS", examStyle: true, calculator: false,
    hints: ["Drop leading zeros, then replace one run of zero groups with ::.", "Which devices must always be found at the same address?"],
    stem: `A web hosting company in Harare is moving its servers to IPv6. One server's full address is \`${v6b}\`.`,
    parts: [
      P.num({
        label: "(a)", stem: "How many bits are in an IPv6 address?",
        value: 128, wrong: [32],
        explanation: "IPv6 addresses are 128 bits (eight groups of 16 bits).",
        workedSolution: "1. There are 8 groups of 4 hex digits.\n2. 8 × 4 × 4 bits = 128 bits.",
      }),
      P.short({
        label: "(b)", stem: "Write the server's address in its shortest form.",
        accepted: [v6bs],
        normalise: ["trim", "lowercase", "remove_whitespace"],
        wrong: ["2001:DB8:0:0:0:0:0:1"],
        explanation: `Leading zeros go (0DB8 → DB8) and the run of six zero groups becomes ::, giving ${v6bs}.`,
      }),
      P.manual({
        label: "(c)", marks: 2,
        stem: "Explain why the company's web servers are given static IP addresses.",
        points: [
          "A static address does not change",
          "so browsers (through DNS) can always find the server at the same address / the domain name always points to it",
        ],
        modelAnswer: "A static address never changes, so the domain names of the hosted websites always point to the right server and visitors can always reach it.",
      }),
      P.manual({
        label: "(d)", marks: 2,
        stem: "Explain why IPv6 is replacing IPv4.",
        points: [
          "IPv4 uses 32 bits, giving only about 4.3 billion addresses, which is not enough for all connected devices",
          "IPv6 uses 128 bits, giving vastly more addresses",
        ],
        modelAnswer: "IPv4's 32 bits allow only about 4.3 billion addresses, too few for every phone, computer and device online, whereas IPv6's 128 bits allow vastly more.",
      }),
    ],
    explanation: `(a) 128 (b) ${v6bs}.`,
  });

  b.card("DEFINITION", "What is a **MAC address**?", "A unique identifier given to a device's NIC at manufacture, used to identify the device on a network.");
  b.card("FACT", "Structure of a MAC address?", "48 bits, written as 12 hex digits in six pairs: first half manufacturer code, second half serial number.");
  b.card("DEFINITION", "What is an **IP address**?", "An address allocated to a device by the network it joins, used to identify it and route data to it across networks.");
  b.card("CONCEPT", "Static compared with dynamic IP address?", "Static: permanently assigned, never changes (servers, printers). Dynamic: assigned each time a device connects, may change.");
  b.card("FACT", "IPv4 address format?", "32 bits, four denary numbers from 0 to 255 separated by full stops, e.g. 10.4.8.200.");
  b.card("FACT", "IPv6 address format?", "128 bits, eight groups of four hex digits separated by colons; leading zeros and one run of zero groups (::) can be omitted.");
  b.card("CONCEPT", "Why was IPv6 introduced?", "IPv4 gives only about 4.3 billion addresses, too few for all connected devices; IPv6 gives vastly more.");
  b.card("FACT", "Why can't an IPv4 number be 300?", "Each number is 8 bits, so the largest value is 255.");
  b.card("CONCEPT", "Which address changes when a laptop moves to a new network?", "The IP address (allocated by each network); the MAC address stays the same.");
});
