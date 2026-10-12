// Slice w2b: IP addressing (acs.network.ip-addressing, both boards).
import { concept, P, chk, same, subnet, ipBinary, ipv6Abbrev, toBase, mdTable, intToIp, ipToInt } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";

const sn = subnet("10.4.9.130", 27);
same([sn.network, sn.broadcast, sn.hosts], ["10.4.9.128", "10.4.9.159", 30]);
const sn2 = subnet("172.24.7.20", 28);
same([sn2.network, sn2.broadcast, sn2.first, sn2.last, sn2.hosts], ["172.24.7.16", "172.24.7.31", "172.24.7.17", "172.24.7.30", 14]);
const v6 = ipv6Abbrev("2001:0db8:0000:0000:0000:0000:00c1:0007");
same(v6, "2001:db8::c1:7");

concept("acs.network.ip-addressing", { file: "network/ip-addressing", keyPrefix: "network.ip-addressing" }, (b) => {
  mc(b, 1, "RECALL", "How many bits are in an IPv4 address?",
    ["32", "Correct: four octets of 8 bits."],
    [["16", "16 bits would give only 65 536 addresses."], ["64", "IPv4 does not use 64 bits."], ["128", "128 bits is the length of an IPv6 address."]],
    "IPv4 has four octets of 8 bits = 32 bits.");
  mc(b, 2, "UNDERSTANDING", "Which is a valid IPv4 address?",
    ["172.16.254.3", "Correct: four octets, each between 0 and 255."],
    [["192.168.300.1", "300 is greater than 255."], ["10.0.0", "Only three octets are given."], ["10.0.0.1.5", "Five octets are too many."]],
    "A valid IPv4 address has four octets in the range 0 to 255.", { daily: true });
  mc(b, 2, "RECALL", "How is an IPv6 address written?",
    ["Eight groups of four hexadecimal digits separated by colons", "Correct."],
    [["Four numbers from 0 to 255 separated by dots", "This is IPv4."], ["Eight groups of eight bits separated by dots", "IPv6 is written in hexadecimal with colons."], ["Six pairs of hexadecimal digits separated by hyphens or colons", "This is the format of a MAC address."]],
    "IPv6 uses 128 bits as eight hexadecimal groups.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why was IPv6 introduced?",
    ["IPv4 does not have enough addresses for all the devices", "Correct: the IPv4 address space has run out."],
    [["IPv4 addresses cannot be used on wireless networks", "IPv4 works on wireless networks."], ["IPv6 removes the need for any router", "Routers are still needed."], ["IPv4 addresses are written in binary which is hard to read", "Readability was not the reason."]],
    "IPv4 has 2^32 addresses; IPv6 has 2^128.");
  mc(b, 3, "APPLICATION", "Which of these is a private IP address?",
    ["172.20.35.200", "Correct: 172.16.0.0 to 172.31.255.255 is a private range."],
    [["172.32.0.1", "The private range stops at 172.31.255.255."], ["192.169.1.1", "Only 192.168.x.x is private."], ["11.0.0.5", "The private range is 10.x.x.x, not 11.x.x.x."]],
    "The three private ranges are 10.x.x.x, 172.16.x.x to 172.31.x.x and 192.168.x.x.", { hints: ["Recall the three private ranges."] });
  mc(b, 3, "APPLICATION", "A school network has a file server, a printer and 80 student laptops. Which arrangement of addresses is the most suitable?",
    ["Static addresses for the server and printer, and DHCP for the laptops", "Correct: devices that must be found at a fixed address are static."],
    [["DHCP for the server and printer, and static addresses for all of the laptops", "The server and printer must keep the same address, and 80 laptops would be hard to set up by hand."], ["Static addresses for all devices", "Setting 80 laptops by hand is slow and risks clashes."], ["DHCP for all devices, including the server and printer", "The address of the server or printer could change, and other devices would not find them."]],
    "Servers and printers need fixed addresses; laptops can be given addresses automatically.", { hints: ["Which devices must always be found at the same address?"] });
  mc(b, 4, "EVALUATION", "A student says: \"My laptop uses a private address, so it cannot be attacked from the internet.\" Which statement is the best response?",
    ["It is harder to reach directly, but it is not a replacement for a firewall", "Correct: NAT hides the device but does not stop all attacks."],
    [["Correct, a private address makes a device completely safe", "Devices can still be attacked through connections they open themselves, such as malicious downloads."], ["Wrong, private addresses can be reached directly from the whole of the internet", "Routers do not forward packets to private addresses."], ["Wrong, a private address is the same as a public address", "They are different ranges with different uses."]],
    "NAT gives some protection by hiding the device, but other protection is still needed.", { hints: ["Can an outside user start a connection to a private address?"] });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A usable host address can be the same as the network address of its subnet.", answer: false, explanation: "False. The network address identifies the subnet itself and cannot be given to a device." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In an IPv6 address, the double colon :: may be used only once.", answer: true, explanation: "True. If it were used twice, it would be impossible to tell how many zero groups each stood for." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [["Subnet mask", "Marks which bits of an address are the network portion"], ["DHCP", "Gives a device an address automatically for a period of time"], ["NAT", "Replaces a private source address with a public one"], ["Static address", "An address set by hand that does not change"], ["Broadcast address", "The address with all host bits set to 1"]],
    explanation: "Each term has one clear role in addressing." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Complete the rules for shortening an IPv6 address.",
    template: "{{blank:a}} zeros in a group may be dropped. A run of groups that are all zeros may be replaced by {{blank:b}}, but this can be done only {{blank:c}} in an address.",
    blanks: [
      { id: "a", accepted: ["leading"], choices: ["leading", "trailing", "all", "middle"] },
      { id: "b", accepted: ["::"], choices: ["::", ":", "0", "..."] },
      { id: "c", accepted: ["once"], choices: ["once", "twice", "four times", "never"] },
    ], hints: ["Which zeros can be dropped without changing the value?"], explanation: "Leading zeros are dropped; one run of zero groups becomes ::." });
  b.bits({ d: 2, skill: "APPLICATION", value: 230, width: 8, stem: "Write the octet 230 in 8-bit binary.", acceptUnpadded: false,
    explanation: `230 = 128 + 64 + 32 + 4 + 2 = ${toBase(230, 2, 8)}.`, wrong: ["11100111"] });
  chk(2 ** 5 - 2, 30);
  b.num({ d: 2, skill: "APPLICATION", daily: true, unit: "hosts", calculator: false, hints: ["Host bits = 32 − prefix length."],
    stem: "A subnet has the prefix length /27. How many usable host addresses does it have?",
    value: 30, wrong: [32, 224], workedSolution: "1. Host bits = 32 − 27 = 5.\n2. Usable hosts = 2^5 − 2 = 30.", explanation: "2^5 − 2 = 30 usable hosts." });
  chk(2 ** 12 - 2, 4094);
  b.num({ d: 3, skill: "APPLICATION", unit: "hosts", calculator: false, hints: ["A /20 network has 12 host bits."],
    stem: "A network has the prefix /20. How many usable host addresses does it have?",
    value: 4094, wrong: [4096, 2046], workedSolution: "1. Host bits = 32 − 20 = 12.\n2. 2^12 = 4096.\n3. Usable hosts = 4096 − 2 = 4094.", explanation: "2^12 − 2 = 4094." });
  chk(2 ** 9 - 2, 510);
  b.num({ d: 4, skill: "ANALYSIS", calculator: false, hints: ["Find the smallest number of host bits h with 2^h − 2 at least 400.", "Prefix = 32 − h."],
    stem: "A college in Masvingo needs a subnet for 400 devices. What is the longest prefix length (the largest number after the slash) that can still provide 400 usable host addresses?",
    value: 23, wrong: [22, 24], workedSolution: "1. 2^8 − 2 = 254 is too small.\n2. 2^9 − 2 = 510 is enough, so 9 host bits are needed.\n3. Prefix = 32 − 9 = 23.", explanation: "9 host bits give 510 hosts, so the prefix is /23." });
  b.short({ d: 3, skill: "APPLICATION", hints: ["AND the address with the mask, octet by octet."],
    stem: "A device has the address 10.4.9.130 and its subnet has the prefix length /27. Write the network address of its subnet.",
    accepted: [sn.network], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["10.4.9.0"], explanation: `The last octet 130 = 10000010 and the mask octet 224 = 11100000. AND = 10000000 = 128, so the network address is ${sn.network}.` });
  b.short({ d: 3, skill: "APPLICATION", hints: ["Write the abbreviated form: drop leading zeros and use :: once."],
    stem: "Write the IPv6 address 2001:0db8:0000:0000:0000:0000:00c1:0007 in its shortest form.",
    accepted: [v6, v6.toUpperCase()], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["2001:db8:0:0:0:0:c1:7"],
    explanation: `Drop the leading zeros, then replace the run of four zero groups by ::, giving ${v6}.` });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about uniqueness, routing and NAT."],
    stem: "Describe the difference between a public IP address and a private IP address. [3]",
    points: ["A public address is unique on the internet and can be reached from outside", "A private address is from a reserved range, used inside a local network and not routed across the internet", "A router uses NAT to translate between the private addresses and its public address"],
    modelAnswer: "A public address is unique on the internet and can be reached from outside. A private address is from a reserved range used only inside a local network and is not routed over the internet. A router uses NAT to translate between them.",
    explanation: "Unique against reusable; routed against not routed; NAT." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about traffic, security and administration."],
    stem: "State three benefits of dividing a large network into subnets. [3]",
    points: ["It reduces broadcast traffic, so there is less congestion", "Departments can be separated, so security rules can be applied between them", "A fault or problem can be limited to one subnet / the network is easier to manage"],
    modelAnswer: "Broadcast traffic is limited to each subnet, which reduces congestion. Departments can be separated so security rules can be applied between them, and a fault is limited to one subnet.",
    explanation: "Traffic, security, management." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Two points for each type of address."],
    stem: "Explain the difference between a static IP address and a dynamic IP address and give a device that suits each. [4]",
    points: ["A static address is set by hand and stays the same", "A static address suits a server or printer, which others must find at the same address", "A dynamic address is leased automatically by a DHCP server and may change", "A dynamic address suits a laptop or phone that joins and leaves the network"],
    modelAnswer: "A static address is set by hand and does not change, so it suits a server or printer. A dynamic address is leased by a DHCP server and may change, so it suits laptops and phones.",
    explanation: "Method, stability and suitable devices." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, calculator: false, hints: ["Write the last octet in binary.", "Set all host bits to 1 for the broadcast address."],
    explanation: "/28 leaves 4 host bits: 14 usable hosts; network 172.24.7.16, broadcast 172.24.7.31.",
    stem: "A computer in a school laboratory has the IP address 172.24.7.20 in a subnet with the prefix length /28.",
    parts: [
      P.short({ label: "(a)", marks: 1, stem: "Write the subnet mask in dotted decimal form.", accepted: ["255.255.255.240"], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["255.255.255.248"], explanation: "/28 means 28 one-bits: 255.255.255 is 24 bits and the last octet has 4 ones, 11110000 = 240." }),
      P.bits({ label: "(b)", marks: 2, stem: "Write the last octet of the address (20) in 8-bit binary.", value: 20, width: 8, explanation: "20 = 16 + 4 = 00010100." }),
      P.short({ label: "(c)", marks: 2, stem: "Write the network address.", accepted: [sn2.network], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["172.24.7.0"], explanation: `The last octet 00010100 AND 11110000 = 00010000 = 16, so the network address is ${sn2.network}.` }),
      P.short({ label: "(d)", marks: 1, stem: "Write the broadcast address.", accepted: [sn2.broadcast], normalise: ["trim", "lowercase", "remove_whitespace"], wrong: ["172.24.7.255"], explanation: `The four host bits are all 1: 00011111 = 31, so ${sn2.broadcast}.` }),
      P.num({ label: "(e)", marks: 2, stem: "Calculate the number of usable host addresses in this subnet.", value: 14, unit: "hosts", wrong: [16, 15], workedSolution: "1. Host bits = 4.\n2. 2^4 − 2 = 14.", explanation: "16 − 2 = 14 usable hosts." }),
    ] });
  b.struct({ d: 3, skill: "UNDERSTANDING", examStyle: true, hints: ["Relate each decision to the scenario."],
    explanation: "Private addresses and NAT, DHCP for the visitors' devices, static for the server, IPv6 for the address shortage.",
    stem: "A small hotel in Victoria Falls has a booking server, a receipt printer, five office computers and Wi-Fi for guests. All devices use private IPv4 addresses and the router has one public address.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Explain how the guests' phones can use the internet although they have private addresses.", points: ["The router replaces the private source address of each outgoing packet with its public address (NAT)", "It keeps a record so that the reply is sent back to the correct phone"], modelAnswer: "The router uses NAT: it replaces the private source address with its public address and records which phone sent the request so the reply goes to the correct phone.", explanation: "NAT." }),
      P.manual({ label: "(b)", marks: 2, stem: "State which devices should have static addresses and give one reason.", points: ["The booking server and the receipt printer", "Other devices must always find them at the same address"], modelAnswer: "The booking server and the printer should have static addresses because the office computers must always find them at the same address.", explanation: "Fixed addresses for services." }),
      P.manual({ label: "(c)", marks: 2, stem: "Give two reasons why the hotel's guest phones should use DHCP.", points: ["Phones join and leave all the time, so addresses are given automatically", "It avoids setting addresses by hand and two phones using the same address"], modelAnswer: "Phones join and leave all the time, so a DHCP server gives them addresses automatically, which avoids setting them by hand and avoids two devices having the same address.", explanation: "Automatic and no clashes." }),
    ] });
  b.card("FACT", "IPv4 address", "32 bits in four octets (0-255) written with dots; 2^32 = 4 294 967 296 addresses.");
  b.card("FACT", "IPv6 address", "128 bits as eight groups of four hexadecimal digits; drop leading zeros, replace one run of zero groups with ::.");
  b.card("FORMULA", "Usable hosts in a subnet", "2^h − 2, where h = host bits = 32 − prefix length.");
  b.card("FORMULA", "Network and broadcast address", "Network = address AND mask; broadcast = network with all host bits set to 1.");
  b.card("FACT", "Private ranges", "10.0.0.0/8, 172.16.0.0 to 172.31.255.255, 192.168.0.0/16; not routed on the internet; translated by NAT.");
  b.card("CONCEPT", "Static against dynamic address", "Static: set by hand, for servers and printers. Dynamic: leased by DHCP, for laptops and phones.");
  b.card("DEFINITION", "DHCP", "Gives a device an IP address (and other settings) automatically for a period of time.");
  b.card("CONCEPT", "Why IPv6", "IPv4 addresses (2^32) ran out; IPv6 has 2^128 addresses.");
});
