// W2b exam-format items: four ZIMSEC Paper 2 section C items (Networking, 30 marks each).
import { concept, P, EXAM, checkExam, ZIM, chk, same, subnet, mdTable, dijkstra, pathTo } from "../lib.mjs";
import { ttlSim } from "../tables/w2b-url-dns.mjs";

const Z = { skill: EXAM.ZIM_P2_NET.skill, secs: EXAM.ZIM_P2_NET.secs, examStyle: true, applies: ZIM };
const C = (k) => `acs.${k}`;

concept(C("network.osi-tcpip-models"), { file: "exam/w2b-zimsec", keyPrefix: "exam.w2b-zimsec", applies: ZIM }, (b) => {
  // ------------------------------------------------------------------ 1. OSI and TCP/IP mapping
  {
    chk(5000 / 1000, 5);
    chk(5000 + 5 * 58, 5290);
    const layers = ["application", "presentation", "session", "transport", "network", "data link", "physical"];
    const lc = ["application", "presentation", "session", "transport", "network", "data link", "physical"];
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section C",
      concepts: [C("network.osi-tcpip-models")],
      stem: "Tendai, a Form 5 student in Masvingo, downloads a 5000-byte results report from his school's web server using HTTPS. The request and the reply pass through the layers of the OSI model on each computer. For the calculation in part (c): each segment carries at most 1000 bytes of data, and the TCP header, IP header and the Ethernet frame header and trailer together add 58 bytes to each segment's data.",
      parts: checkExam(EXAM.ZIM_P2_NET, [
        P.fib({ label: "(a)", marks: 6, stem: "Name the OSI layer that carries out each job.",
          template: "The data is encrypted so that it cannot be read on the way: {{blank:a}}.\n\nThe conversation between the browser and the server is started, kept in step and ended: {{blank:b}}.\n\nThe data is split into numbered segments with port numbers: {{blank:c}}.\n\nThe IP addresses are added and the packet is routed: {{blank:d}}.\n\nFrames with MAC addresses are made: {{blank:e}}.\n\nThe bits are sent as electrical, light or radio signals: {{blank:f}}.",
          blanks: [
            { id: "a", accepted: ["presentation"], choices: lc },
            { id: "b", accepted: ["session"], choices: lc },
            { id: "c", accepted: ["transport"], choices: lc },
            { id: "d", accepted: ["network"], choices: lc },
            { id: "e", accepted: ["data link"], choices: lc },
            { id: "f", accepted: ["physical"], choices: lc },
          ], wrong: [["application", "application", "application", "application", "application", "application"]],
          explanation: "Presentation (6), session (5), transport (4), network (3), data link (2), physical (1)." }),
        P.match({ label: "(b)", marks: 4, stem: "Match each OSI layer to the TCP/IP layer that includes it.",
          pairs: ["Presentation", "Session", "Network", "Data link"], right: ["Application", "Internet", "Link"], rightIndex: [0, 0, 1, 2],
          explanation: "OSI layers 5 to 7 map to the TCP/IP application layer, 3 to internet and 1 to 2 to link." }),
        P.group({ label: "(c)", stem: "Calculate the data sent for the report.", parts: [
          P.num({ label: "(i)", marks: 1, stem: "How many segments are needed?", value: 5, wrong: [4, 6], workedSolution: "1. 5000 ÷ 1000 = 5.", explanation: "5 segments." }),
          P.num({ label: "(ii)", marks: 2, type: "CALCULATION", unit: "bytes", stem: "Calculate the total number of bytes sent over the link.", value: 5290, wrong: [5058, 5000], workedSolution: "1. Added bytes = 5 × 58 = 290.\n2. Total = 5000 + 290 = 5290.", explanation: "5000 + 5 × 58 = 5290 bytes." }),
        ] }),
        P.manual({ label: "(d)", marks: 6, stem: "Using the layers of the TCP/IP model, describe what happens to the request on Tendai's computer and on the web server.", points: ["The application layer forms the HTTPS request", "The transport layer splits the data into segments and adds the port numbers (443 for the server)", "The internet layer adds the source and destination IP addresses to make packets", "The link layer adds the MAC addresses to make frames and sends the bits over the medium", "Routers on the way read the destination IP address and forward the packet", "At the server each layer removes its header in the reverse order and passes the data up to the web server program"], modelAnswer: "The application layer forms the HTTPS request. The transport layer splits it into segments and adds port numbers (443 for the server). The internet layer adds the source and destination IP addresses to make packets, and the link layer adds MAC addresses to make frames and sends the bits. Routers read the destination IP address and forward the packet. At the server each layer removes its header in the reverse order and passes the data up to the web server program.", explanation: "Encapsulation and decapsulation." }),
        P.manual({ label: "(e)", marks: 5, stem: "Compare the OSI model with the TCP/IP model.", points: ["OSI has seven layers whereas TCP/IP has four", "OSI is a reference model used to describe and teach networking", "TCP/IP is the set of protocols that the internet actually uses", "OSI separates the application, presentation and session layers, which TCP/IP combines into one application layer", "OSI's physical and data link layers correspond to the TCP/IP link layer"], modelAnswer: "OSI has seven layers and TCP/IP has four. OSI is a reference model used to describe and teach networking, but TCP/IP is the set of protocols the internet actually uses. OSI separates the application, presentation and session layers, which TCP/IP combines into one application layer, and the OSI physical and data link layers correspond to the TCP/IP link layer.", explanation: "Layers, purpose, mapping." }),
        P.manual({ label: "(f)", marks: 6, stem: "Explain how a switch and a router differ in the address they use, the layer they work at and the type of network they connect.", points: ["A switch forwards frames using MAC addresses", "A switch works at the data link layer (OSI layer 2)", "A switch connects devices within one LAN", "A router forwards packets using IP addresses", "A router works at the network layer (OSI layer 3)", "A router connects different networks, such as the school LAN and the internet"], modelAnswer: "A switch forwards frames using MAC addresses and works at the data link layer (layer 2) to connect devices within one LAN. A router forwards packets using IP addresses and works at the network layer (layer 3) to connect different networks, such as the school LAN and the internet.", explanation: "Switch: layer 2, MAC, one LAN. Router: layer 3, IP, different networks." }),
      ]),
      hints: ["Use the OSI layer numbers 7 to 1.", "Every segment adds 58 bytes."],
      explanation: "Layers named in (a); mapping in (b); 5 segments and 5290 bytes in (c); encapsulation, comparison and switch against router described in (d) to (f).",
    });
  }
  // ------------------------------------------------------------------ 2. IP addressing and subnets
  {
    const s1 = subnet("172.22.40.77", 26);
    same([s1.network, s1.broadcast, s1.hosts], ["172.22.40.64", "172.22.40.127", 62]);
    const s3 = subnet("172.22.40.129", 26);
    const s2 = subnet("172.22.40.65", 26);
    same([s3.first, s2.last], ["172.22.40.129", "172.22.40.126"]);
    const nr = ["trim", "lowercase", "remove_whitespace"];
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section C",
      concepts: [C("network.ip-addressing")],
      stem: "A technical college in Bulawayo is given the private network 172.22.40.0 (the addresses 172.22.40.0 to 172.22.40.255) and wants to divide it into four equal subnets for the departments of the college: Administration, Computing, Engineering and the Library. A computer in the Computing department has the IP address 172.22.40.77 in a subnet with the prefix length /26.",
      parts: checkExam(EXAM.ZIM_P2_NET, [
        P.fib({ label: "(a)", marks: 4, stem: "Complete the sentences about IP addresses.",
          template: "An IPv4 address has {{blank:a}} bits. An IPv6 address has {{blank:b}} bits, written as {{blank:c}} groups of {{blank:d}} digits.",
          blanks: [
            { id: "a", accepted: ["32"], input: "number" },
            { id: "b", accepted: ["128"], input: "number" },
            { id: "c", accepted: ["eight"], choices: ["four", "six", "eight", "sixteen"] },
            { id: "d", accepted: ["hexadecimal"], choices: ["binary", "denary", "hexadecimal", "octal"] },
          ], explanation: "IPv4 has 32 bits; IPv6 has 128 bits as eight groups of hexadecimal digits." }),
        P.group({ label: "(b)", stem: "For the computer 172.22.40.77 with the prefix length /26:", parts: [
          P.short({ label: "(i)", marks: 1, stem: "Write the subnet mask in dotted decimal form.", accepted: ["255.255.255.192"], normalise: nr, wrong: ["255.255.255.128"], explanation: "/26 means 26 one-bits: 255.255.255 is 24 bits and 11000000 = 192." }),
          P.short({ label: "(ii)", marks: 2, stem: "Write the network address.", accepted: [s1.network], normalise: nr, wrong: ["172.22.40.0"], explanation: `77 = 01001101 and 192 = 11000000. AND = 01000000 = 64, so ${s1.network}.` }),
          P.short({ label: "(iii)", marks: 2, stem: "Write the broadcast address.", accepted: [s1.broadcast], normalise: nr, wrong: ["172.22.40.255"], explanation: `The six host bits are all 1: 01111111 = 127, so ${s1.broadcast}.` }),
          P.num({ label: "(iv)", marks: 1, stem: "Calculate the number of usable host addresses in the subnet.", value: 62, unit: "hosts", wrong: [64, 63], workedSolution: "1. 2^6 − 2 = 62.", explanation: "2^6 − 2 = 62." }),
        ] }),
        P.group({ label: "(c)", stem: "The four subnets are 172.22.40.0/26, 172.22.40.64/26, 172.22.40.128/26 and 172.22.40.192/26, numbered 1 to 4.", parts: [
          P.short({ label: "(i)", marks: 2, stem: "Write the first usable host address in subnet 3.", accepted: [s3.first], normalise: nr, wrong: ["172.22.40.128"], explanation: `Subnet 3 starts at 172.22.40.128, so the first host is ${s3.first}.` }),
          P.short({ label: "(ii)", marks: 2, stem: "Write the last usable host address in subnet 2.", accepted: [s2.last], normalise: nr, wrong: ["172.22.40.127"], explanation: `The broadcast address of subnet 2 is 172.22.40.127, so the last host is ${s2.last}.` }),
          P.num({ label: "(iii)", marks: 2, stem: "How many host bits of the original network were used as extra network bits to make four subnets?", value: 2, wrong: [4, 26], workedSolution: "1. Four subnets need 2 bits (2^2 = 4).\n2. 24 + 2 = 26.", explanation: "2 bits: 2^2 = 4 subnets, giving /26." }),
        ] }),
        P.manual({ label: "(d)", marks: 4, stem: "The college's router has one public address. Explain how the computers with private addresses can use the internet.", points: ["The router uses network address translation (NAT)", "It replaces the private source address of an outgoing packet with its own public address", "It keeps a record of which computer sent the request", "When the reply arrives, it sends it back to the correct private address"], modelAnswer: "The router uses NAT. It replaces the private source address of each outgoing packet with its own public address and keeps a record of which computer sent the request. When the reply arrives it sends it to the correct private address.", explanation: "NAT." }),
        P.manual({ label: "(e)", marks: 4, stem: "The Library has a file server, a network printer and 30 student computers. State which should have static addresses and which should use DHCP, giving a reason for each.", points: ["The file server and the printer should have static addresses", "Other devices must always find them at the same address", "The student computers should use DHCP", "Addresses are given automatically to computers that join and leave, which avoids setting them by hand and address clashes"], modelAnswer: "The file server and the printer should have static addresses, because other devices must always find them at the same address. The student computers should use DHCP, so that addresses are given automatically as they join and leave, which avoids setting them by hand and address clashes.", explanation: "Static for services, DHCP for clients." }),
        P.manual({ label: "(f)", marks: 6, stem: "Explain why IPv6 was introduced and state two differences between an IPv6 address and an IPv4 address.", points: ["IPv4 has only 2^32 (about 4.3 billion) addresses", "The addresses have run out as more devices connect to the internet", "NAT and private addresses delayed the problem but did not solve it", "IPv6 has 128-bit addresses, giving 2^128 addresses", "An IPv6 address is written as eight groups of hexadecimal digits, but an IPv4 address as four decimal numbers (octets)", "An IPv6 address can be shortened by dropping leading zeros and using :: once"], modelAnswer: "IPv4 has only 2^32 addresses and they have run out as more devices connect. NAT and private addresses delayed the problem but did not solve it. IPv6 has 128-bit addresses, giving 2^128 addresses. An IPv6 address is written as eight groups of hexadecimal digits instead of four decimal octets, and it can be shortened by dropping leading zeros and using :: once.", explanation: "Reason and two differences." }),
      ]),
      hints: ["AND the last octet of the address with 192.", "Subnet 3 starts at 172.22.40.128."],
      explanation: "/26; network 172.22.40.64; broadcast 172.22.40.127; 62 hosts; subnet 3 first host 172.22.40.129; subnet 2 last host 172.22.40.126; 2 extra bits.",
    });
  }
  // ------------------------------------------------------------------ 3. DNS and public/private addresses
  {
    const sim = ttlSim(900, [0, 500, 1000]);
    same(sim.map((r) => r.result), ["full lookup", "answered from cache", "full lookup"]);
    const dnsTable = mdTable(["Name", "IP address", "TTL (seconds)"], [
      ["portal.chinhoyi-high.co.zw", "203.0.113.25", 900],
      ["mail.chinhoyi-high.co.zw", "203.0.113.26", 3600],
      ["www.chinhoyi-high.co.zw", "203.0.113.25", 900],
      ["library.chinhoyi-high.co.zw", "198.51.100.8", 600],
    ]);
    const devTable = mdTable(["Device", "IP address"], [["Bursar's PC", "192.168.1.20"], ["Teacher's laptop", "10.12.4.9"], ["Network printer", "172.18.0.5"], ["Visitor's phone", "172.40.3.2"]]);
    const pubChoices = ["private", "public"];
    const nr = ["trim", "lowercase", "remove_whitespace"];
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section C",
      concepts: [C("network.url-dns"), C("network.ip-addressing")],
      stem: `Chinhoyi High School has a web portal and an email server. A DNS resolver at its internet service provider holds the following records for the school's domain.\n\n${dnsTable}\n\nThe school network uses these devices.\n\n${devTable}`,
      parts: checkExam(EXAM.ZIM_P2_NET, [
        P.group({ label: "(a)", stem: "Use the DNS records.", parts: [
          P.short({ label: "(i)", marks: 2, stem: "Write the IP address of mail.chinhoyi-high.co.zw.", accepted: ["203.0.113.26"], normalise: nr, wrong: ["203.0.113.25"], explanation: "The record for mail.chinhoyi-high.co.zw is 203.0.113.26." }),
          P.num({ label: "(ii)", marks: 2, stem: "State the TTL, in seconds, of the record for library.chinhoyi-high.co.zw.", value: 600, wrong: [900, 3600], explanation: "The TTL of the library record is 600 seconds.", workedSolution: "1. Find the row for library.chinhoyi-high.co.zw in the table.\n2. Its TTL is 600 seconds." }),
        ] }),
        P.fib({ label: "(b)", marks: 4, stem: "For each device, state whether its IP address is private or public.",
          template: "Bursar's PC: {{blank:a}}\n\nTeacher's laptop: {{blank:b}}\n\nNetwork printer: {{blank:c}}\n\nVisitor's phone: {{blank:d}}",
          blanks: [
            { id: "a", accepted: ["private"], choices: pubChoices },
            { id: "b", accepted: ["private"], choices: pubChoices },
            { id: "c", accepted: ["private"], choices: pubChoices },
            { id: "d", accepted: ["public"], choices: pubChoices },
          ], explanation: "192.168.x.x, 10.x.x.x and 172.16 to 172.31.x.x are private. 172.40.3.2 is outside the private range 172.16.0.0 to 172.31.255.255, so it is public." }),
        P.group({ label: "(c)", stem: "The resolver caches the record for www.chinhoyi-high.co.zw (TTL 900 s). The name is requested at 0 s, 500 s and 1000 s.", parts: [
          P.num({ label: "(i)", marks: 2, stem: "How many of the three requests need a full lookup?", value: 2, wrong: [1, 3], workedSolution: "1. 0 s: full lookup (valid until 900 s).\n2. 500 s: cached.\n3. 1000 s: expired, full lookup.", explanation: "Requests at 0 s and 1000 s need a full lookup." }),
          P.num({ label: "(ii)", marks: 2, stem: "At what time, in seconds, does the record stored at 1000 s expire?", value: 1900, wrong: [900, 1000], workedSolution: "1. Expiry = 1000 + 900 = 1900 s.", explanation: "1000 + 900 = 1900 s." }),
        ] }),
        P.manual({ label: "(d)", marks: 6, stem: "Describe how the resolver finds the IP address of library.chinhoyi-high.co.zw when it has no cached record.", points: ["The user's computer first checks its own cache and then sends the request to the resolver", "The resolver asks a root server", "The root server replies with the address of the server for the top-level domain (zw)", "The resolver asks the TLD server, which replies with the address of the authoritative name server for the domain", "The resolver asks the authoritative server, which returns the IP address", "The resolver stores the record for its TTL and returns the address to the user's computer"], modelAnswer: "The user's computer checks its own cache and then sends the request to the resolver. The resolver asks a root server, which replies with the address of the TLD server for zw. The resolver asks the TLD server, which gives the address of the authoritative name server for the domain. The authoritative server returns the IP address. The resolver stores the record for its TTL and returns the address to the user's computer.", explanation: "Root, TLD, authoritative, cache." }),
        P.manual({ label: "(e)", marks: 6, stem: "The school's router has one public address. Explain how public and private addresses are used by the school, and the effect on security.", points: ["Devices inside the school use private addresses, which are only valid inside the local network", "Private addresses are not routed on the internet, so they can be reused in every network", "The router has a public address that is unique on the internet", "The router uses NAT to replace the private source address with the public address for outgoing packets", "Outside users cannot start a connection to a private address directly, which gives some protection", "A firewall is still needed because the devices can be attacked through connections that they open themselves"], modelAnswer: "Devices inside the school use private addresses that are only valid inside the local network and are not routed on the internet, so they can be reused in every network. The router has a public address that is unique on the internet and uses NAT to replace the private source address of outgoing packets. Outside users cannot start a connection directly to a private address, which gives some protection, but a firewall is still needed because devices can be attacked through connections they open themselves.", explanation: "Private, public, NAT, security." }),
        P.manual({ label: "(f)", marks: 6, stem: "Describe how DNS cache poisoning could send students to a false copy of the school's web portal, and suggest two precautions the ISP could take.", points: ["The attacker places a false record in the resolver's cache", "The false record links the portal's domain name to the attacker's IP address", "A student who types the correct name is sent to the attacker's copy of the site", "The copy looks like the portal, so the student may enter their login details, which the attacker collects", "Precaution: keep the DNS software updated", "Precaution: use secure DNS options that check that the answers are genuine, and limit the TTL"], modelAnswer: "The attacker places a false record in the resolver's cache that links the portal's domain name to the attacker's IP address. A student who types the correct name is sent to the attacker's copy, which looks like the portal, and may enter login details that the attacker collects. The ISP should keep its DNS software updated and use secure DNS options that check answers are genuine.", explanation: "Poisoning and precautions." }),
      ]),
      hints: ["The private ranges are 10.x.x.x, 172.16 to 172.31 and 192.168.x.x.", "A record is cached from the moment it is fetched until the TTL runs out."],
      explanation: "mail record 203.0.113.26; TTL 600; three private and one public address; 2 full lookups and expiry at 1900 s; DNS steps, NAT and poisoning described.",
    });
  }
  // ------------------------------------------------------------------ 4. Routing and cloud service choice
  {
    const edges = [["R1", "R2", 20], ["R2", "R6", 30], ["R1", "R4", 10], ["R4", "R5", 15], ["R5", "R6", 10], ["R2", "R3", 20], ["R3", "R6", 20]];
    const mk = (cost) => { const g = {}; for (const [x, y, w] of edges) { (g[x] ??= {})[y] = cost ? w : 1; (g[y] ??= {})[x] = cost ? w : 1; } return g; };
    const rip = dijkstra(mk(false), "R1");
    const ospf = dijkstra(mk(true), "R1");
    same(pathTo(rip.prev, "R1", "R6"), ["R1", "R2", "R6"]);
    chk(rip.dist.R6, 2);
    same(pathTo(ospf.prev, "R1", "R6"), ["R1", "R4", "R5", "R6"]);
    chk(ospf.dist.R6, 35);
    chk(20 + 30, 50);
    chk(20 + 20 + 20, 60);
    const linkTable = mdTable(["Link", "OSPF cost"], edges.map((e) => [`${e[0]} - ${e[1]}`, e[2]]));
    b.struct({
      ...Z, d: 4, paper: "ZIMSEC Paper 2 Section C",
      concepts: [C("network.routing-protocols"), C("network.cloud-computing")],
      stem: `A college has campuses in six towns joined by routers R1 to R6. The links and their OSPF costs are:\n\n${linkTable}\n\nThe college is also deciding which cloud services to use.`,
      parts: checkExam(EXAM.ZIM_P2_NET, [
        P.group({ label: "(a)", stem: "Routing from R1 to R6 using RIP:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "State the number of hops on the route that RIP chooses.", value: 2, wrong: [3, 35], workedSolution: "1. R1-R2-R6 has 2 hops.\n2. The other routes have 3 hops.", explanation: "R1-R2-R6 has the fewest hops: 2." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the total OSPF cost of the route that RIP chooses.", value: 50, wrong: [2, 35], workedSolution: "1. R1-R2 costs 20 and R2-R6 costs 30.\n2. 20 + 30 = 50.", explanation: "20 + 30 = 50." }),
        ] }),
        P.group({ label: "(b)", stem: "Routing from R1 to R6 using OSPF:", parts: [
          P.num({ label: "(i)", marks: 2, stem: "Calculate the cost of the route R1-R4-R5-R6.", value: 35, wrong: [3, 50], workedSolution: "1. 10 + 15 + 10 = 35.", explanation: "10 + 15 + 10 = 35." }),
          P.num({ label: "(ii)", marks: 2, stem: "Calculate the cost of the route R1-R2-R3-R6.", value: 60, wrong: [50, 35], workedSolution: "1. 20 + 20 + 20 = 60.", explanation: "20 + 20 + 20 = 60." }),
          P.mcq({ label: "(iii)", marks: 2, stem: "Which route does OSPF choose?", options: [["R1-R4-R5-R6", "Correct: its cost of 35 is the lowest."], ["R1-R2-R6", "This route has the fewest hops (RIP's choice) but a cost of 50."], ["R1-R2-R3-R6", "This route has a cost of 60, the highest."], ["Any route, because they all cost the same", "The costs are different."]], answer: "A", explanation: "OSPF chooses the lowest total cost: R1-R4-R5-R6." }),
        ] }),
        P.fib({ label: "(c)", marks: 4, stem: "Complete the sentences about routing protocols.",
          template: "RIP is a {{blank:a}} protocol. Its metric is the {{blank:b}} count and the maximum is {{blank:c}} hops. OSPF is a {{blank:d}} protocol.",
          blanks: [
            { id: "a", accepted: ["distance-vector"], choices: ["distance-vector", "link-state", "static", "application-layer"] },
            { id: "b", accepted: ["hop"], choices: ["hop", "cost", "port", "packet"] },
            { id: "c", accepted: ["15"], input: "number" },
            { id: "d", accepted: ["link-state"], choices: ["link-state", "distance-vector", "static", "default"] },
          ], explanation: "RIP: distance-vector, hop count, 15 hops. OSPF: link-state." }),
        P.manual({ label: "(d)", marks: 6, stem: "Compare RIP and OSPF as routing protocols for the college network.", points: ["RIP chooses the route with the fewest hops, but OSPF chooses the route with the lowest cost", "RIP ignores the speed of the links, so it can choose a route over slow links", "OSPF builds a map of the network (link-state database) and calculates the shortest path", "RIP sends its whole table to its neighbours every 30 seconds, but OSPF sends updates only when something changes", "OSPF adjusts faster after a link fails", "RIP is simpler and needs less router power, but is limited to 15 hops, so OSPF is better for a large network"], modelAnswer: "RIP chooses the route with the fewest hops, but OSPF chooses the route with the lowest cost, so RIP can choose a route over slow links. OSPF builds a map of the network and calculates the shortest path. RIP sends its whole table every 30 seconds, but OSPF sends updates only when something changes, so it adjusts faster after a link fails. RIP is simpler and needs less router power but is limited to 15 hops, so OSPF is better for a large network.", explanation: "Metric, map, updates, size." }),
        P.match({ label: "(e)", marks: 4, stem: "Match each need of the college to the most suitable cloud service or cloud type.",
          pairs: [["Staff use web-based email that the provider looks after", "Software as a Service"], ["Developers build and run a student-records application without managing servers", "Platform as a Service"], ["The IT team rents virtual servers and installs its own operating system", "Infrastructure as a Service"], ["Confidential marks are kept in a cloud used only by the college", "Private cloud"]],
          explanation: "Web email is SaaS; a development platform is PaaS; virtual servers are IaaS; a cloud for one organisation is private." }),
        P.manual({ label: "(f)", marks: 6, stem: "The college considers keeping all its student records in a public cloud. Evaluate this proposal.", points: ["Benefit: the college does not have to buy and maintain its own servers", "Benefit: storage can be increased easily and the records can be reached from any campus", "Benefit: the provider makes backups, so the records can be recovered after a disaster", "Drawback: the records are held on the provider's servers, so security and privacy are a concern", "Drawback: the records cannot be reached when the internet connection fails, for example during power cuts", "Conclusion: a reasoned judgement, such as using the cloud for backup and keeping confidential marks in a private cloud"], modelAnswer: "The college would not need to buy and maintain servers, storage can be increased easily, the records can be reached from any campus and the provider makes backups. However, the records are held on the provider's servers, so security and privacy are a concern, and they cannot be reached when the connection fails. A sensible judgement is to use the cloud for backup and keep confidential marks in a private cloud.", explanation: "Benefits, drawbacks, judgement." }),
      ]),
      hints: ["RIP counts hops; OSPF adds the costs.", "Add the costs of each link on the route."],
      explanation: "RIP chooses R1-R2-R6 (2 hops, cost 50); OSPF chooses R1-R4-R5-R6 (cost 35); protocols compared; cloud models matched; the proposal evaluated.",
    });
  }
});
