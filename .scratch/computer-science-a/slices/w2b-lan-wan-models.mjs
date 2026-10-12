// Slice w2b: LANs, WANs and network models (acs.network.lan-wan-models, Cambridge only).
import { concept, P, chk, same, mdTable } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { path } from "../tables/w2b-util.mjs";

const links = [["Nurse PC N1", "SwitchC"], ["Nurse PC N2", "SwitchC"], ["SwitchC", "RouterC"], ["RouterC", "RouterD"], ["RouterC", "RouterE"], ["RouterE", "RouterD"], ["RouterD", "SwitchD"], ["SwitchD", "Records Server"], ["SwitchD", "Pharmacy PC"]];
const table = mdTable(["Link", "Joins"], links.map((l, i) => [i + 1, `${l[0]} and ${l[1]}`]));
const p1 = path(links, "Nurse PC N1", "Records Server");
chk(p1.length - 1, 5);
const withoutDirect = links.filter((l) => !(l[0] === "RouterC" && l[1] === "RouterD"));
const p2 = path(withoutDirect, "Nurse PC N1", "Records Server");
chk(p2.length - 1, 6);
same(p2.slice(1, -1), ["SwitchC", "RouterC", "RouterE", "RouterD", "SwitchD"]);

concept("acs.network.lan-wan-models", { file: "network/lan-wan-models", keyPrefix: "network.lan-wan-models" }, (b) => {
  mc(b, 1, "RECALL", "Which description fits a local area network (LAN)?",
    ["Computers joined over a small area using cabling owned by one organisation", "Correct: small area, one owner."],
    [["Computers joined across several countries using links leased from carriers", "This describes a wide area network."], ["One computer that holds all the files for a network", "This describes a server, not a type of network."], ["A network in which every computer shares the same user account", "The size and ownership of a network do not depend on the account used."]],
    "A LAN covers a small area such as a room or building and belongs to one organisation.");
  mc(b, 2, "UNDERSTANDING", "Which is an advantage of a client-server network over a peer-to-peer network?",
    ["User accounts and file access are controlled from one place", "Correct: central management is the main strength."],
    [["It costs less because no extra computer is needed", "A client-server network needs a server, so it costs more."], ["It keeps working normally when the server is switched off", "If the server fails, the services it provides stop."], ["Each user decides which of their files other users may open", "That describes peer-to-peer sharing."]],
    "A server gives central control of accounts, access rights and backups.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Which is a drawback of a peer-to-peer network?",
    ["Backups must be made from each computer separately", "Correct: there is no central store."],
    [["It needs a skilled administrator to run a dedicated server", "A peer-to-peer network has no dedicated server to administer."], ["A single failure stops every computer", "A failure on one computer does not stop the others."], ["Every file must be saved on one central disk", "In peer-to-peer, files are stored on the individual computers."]],
    "With no central server, files are spread over many computers and security is left to each user.", { daily: true });
  mc(b, 2, "RECALL", "What does a thin client rely on for most of its processing?",
    ["A server", "Correct: the programs run on the server."],
    [["Its own hard disk", "A thin client has little or no local storage."], ["A second thin client", "Thin clients do not share processing with each other."], ["A printer", "A printer produces output; it does not process for the client."]],
    "A thin client displays the screen and sends input; the server does the processing.");
  mc(b, 3, "APPLICATION", "A small tuck shop in Kariba has three computers that share one printer. Nobody is employed to manage the network and there are no confidential records. Which model is the most suitable?",
    ["Peer-to-peer, because it is cheap and needs no administrator", "Correct: it matches the size and the lack of an administrator."],
    [["Client-server, because only a server can share a printer", "A printer can be shared in a peer-to-peer network."], ["Client-server, because three computers need a central backup server", "Three computers do not justify the cost of a server."], ["A WAN, because the shop is far from the main town", "The computers are in one shop, which is a LAN."]],
    "A tiny network with no administrator suits peer-to-peer.", { hints: ["How many computers are there, and who would run a server?"] });
  mc(b, 3, "ANALYSIS", "A school replaces its 40 thick-client computers with thin clients. Which is a likely effect?",
    ["Software is updated once, on the server", "Correct: this is a main benefit of thin clients."],
    [["The students can work as before if the server fails", "A thin client cannot work without the server."], ["The load on the network falls", "More data travels between the server and the clients, so the load rises."], ["Each computer needs a faster processor", "Thin clients need little processing power."]],
    "Thin clients are updated and managed centrally; they depend on the server and the network.", { hints: ["Where do the programs run in a thin-client system?"] });
  mc(b, 4, "EVALUATION", "A surveying firm in Hwange works in areas with no network signal, and surveyors must edit large plans on site. Which statement gives the best reason for thick clients?",
    ["A thick client can run its own software when it has no connection", "Correct: local software works offline."],
    [["Thick clients are updated centrally from the server", "Each thick client needs its own updates."], ["Thick clients put a heavy load on the server for every task they do", "Thick clients process locally, so they load the server less."], ["Thick clients are cheaper because they need no processor", "Thick clients have full processors and cost more than thin clients."]],
    "Without a connection a thin client cannot work, so a thick client is needed.", { hints: ["What happens to a thin client when there is no signal?"] });
  b.tf({ d: 2, skill: "RECALL", daily: true, stem: "The internet is the largest example of a wide area network.", answer: true, explanation: "True. The internet joins networks over the whole world." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In a WAN the connecting links are normally owned by the organisation using it.", answer: false, explanation: "False. WAN links are normally leased from telecommunications providers or shared, as on the internet." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A computer in a peer-to-peer network can act as both a client and a server.", answer: true, explanation: "True. It asks for files from others and also serves its own shared files." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [["LAN", "A network on one site owned by one organisation"], ["WAN", "A network over a wide area using leased or shared links"], ["Server", "A computer that provides a service to other computers"], ["Thick client", "A computer that does its own processing and can work offline"], ["Thin client", "A computer that shows output while the server does the processing"]],
    explanation: "LAN is local, WAN is wide; a server provides a service; thick clients process locally, thin clients depend on the server." });
  b.fib({ d: 2, skill: "UNDERSTANDING", stem: "Complete the sentences about network models.",
    template: "A network in which dedicated computers provide services is called a {{blank:a}} network. In a {{blank:b}} network every computer has equal status. A {{blank:c}} client has little processing power and relies on the server.",
    blanks: [
      { id: "a", accepted: ["client-server"], choices: ["client-server", "peer-to-peer", "thin-client", "wide area"] },
      { id: "b", accepted: ["peer-to-peer"], choices: ["peer-to-peer", "client-server", "wide area", "mesh"] },
      { id: "c", accepted: ["thin"], choices: ["thin", "thick", "fat", "peer"] },
    ], explanation: "Client-server has dedicated servers; peer-to-peer has equals; a thin client has little power." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Follow the links from the source; count the links, not the devices."],
    stem: `A clinic chain uses the network below. Two sites each have a LAN and the routers are joined as shown.\n\n${table}\n\nHow many links does a packet use on the shortest route from Nurse PC N1 to the Records Server?`,
    value: p1.length - 1, wrong: [4, 6], workedSolution: `1. The route is ${p1.join(" → ")}.\n2. That is ${p1.length - 1} links.`, explanation: `${p1.join(" → ")}: ${p1.length - 1} links.` });
  b.num({ d: 4, skill: "ANALYSIS", hints: ["Remove link 4 from the table and find the new shortest route."],
    stem: `Use the table of links below.\n\n${table}\n\nLink 4 (RouterC and RouterD) fails. How many links does a packet from Nurse PC N1 to the Records Server now use?`,
    value: p2.length - 1, wrong: [5, 7], workedSolution: `1. Without link 4, RouterC must use RouterE.\n2. The route is ${p2.join(" → ")}.\n3. That is ${p2.length - 1} links.`, explanation: `The route through RouterE uses ${p2.length - 1} links.` });
  b.manualShort({ d: 2, skill: "UNDERSTANDING", marks: 4, hints: ["Use pairs of comparative points: area, ownership, speed, cost."],
    stem: "Describe two differences between a LAN and a WAN. [4]",
    points: ["A LAN covers a small area such as one building", "A WAN covers a wide area such as several towns or countries", "A LAN is owned and managed by one organisation", "A WAN uses links leased from other companies or is shared, such as the internet"],
    modelAnswer: "A LAN covers a small area such as one building whereas a WAN covers a wide area such as several towns. A LAN is owned and managed by one organisation, but a WAN uses links leased from other companies or shared like the internet.",
    explanation: "Area and ownership are the clearest differences; speed and cost are also accepted." });
  b.manualShort({ d: 3, skill: "EVALUATION", marks: 4, hints: ["Link each benefit to the number of users and the need for security."],
    stem: "A technical college in Bulawayo has 300 student computers and staff who store confidential marks. Justify the use of a client-server network. [4]",
    points: ["A server holds the marks centrally so access can be controlled by user account", "Central backups protect the data from loss", "Software and updates can be managed from one place for 300 computers", "Peer-to-peer would be hard to manage and insecure with this many computers"],
    modelAnswer: "A server can hold the confidential marks and control who may open them using user accounts. It can be backed up centrally, and software can be managed from one place for 300 computers. A peer-to-peer network would be insecure and hard to manage at this size.",
    explanation: "Each point links a benefit of the model to the scenario." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Think about where the processing and the software are."],
    stem: "Explain the difference between a thin client and a thick client. [3]",
    points: ["A thick client has its own processor, storage and software and does the processing", "A thin client has little processing power or storage and the server does the processing", "A thin client cannot be used without a connection to the server, but a thick client can work offline"],
    modelAnswer: "A thick client has its own processor, storage and software and does its own processing. A thin client has little power or storage, and the server does the processing, so it cannot work without a connection to the server.",
    explanation: "Where the processing happens, and the effect on offline use." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 2, hints: ["What happens to a client's request?"],
    stem: "State two drawbacks of a client-server network. [2]",
    points: ["It is more expensive because a server and software are needed", "If the server fails the services stop for all users"],
    modelAnswer: "It costs more because a server is needed, and if the server fails all the clients lose the services it provides.",
    explanation: "Cost and dependence on the server." });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Read the table of links carefully.", "A failed link removes a route."],
    explanation: "The shortest route uses 5 links; if link 4 fails the route through RouterE has 6 links; a second route gives resilience.",
    stem: `A clinic chain in Mutare and Gweru uses this network.\n\n${table}`,
    parts: [
      P.num({ label: "(a)", marks: 2, stem: "State the number of links on the shortest route from Pharmacy PC to Nurse PC N2.", value: path(links, "Pharmacy PC", "Nurse PC N2").length - 1, wrong: [4, 7],
        workedSolution: `1. The route is ${path(links, "Pharmacy PC", "Nurse PC N2").join(" → ")}.\n2. Count the links.`, explanation: "Pharmacy PC → SwitchD → RouterD → RouterC → SwitchC → Nurse PC N2: 5 links." }),
      pm("(b)", "Which device is the WAN link between the two sites joined to at the Gweru site?", ["RouterD", "Correct: RouterC and RouterD are joined by the WAN link."], [["SwitchD", "A switch only connects devices inside the LAN."], ["Records Server", "The server is inside the LAN."], ["Pharmacy PC", "This is a client computer."]], "The routers connect the LANs through the WAN."),
      P.manual({ label: "(c)", marks: 3, stem: "Explain why the chain added the extra link between RouterC and RouterE and between RouterE and RouterD.", points: ["It provides a second route between the two sites", "If the direct link fails, packets can be sent through RouterE", "The network stays in use, though the route is longer"], modelAnswer: "It gives a second route between the sites. If the direct link fails the packets go through RouterE, so the network stays in use even though the route is longer.", explanation: "Redundancy." }),
    ] });
  b.struct({ d: 4, skill: "EVALUATION", examStyle: true, hints: ["Refer to the numbers in the scenario in (b)."],
    explanation: "Thin clients suit the room because software is managed centrally; each choice is linked to the scenario.",
    stem: "A secondary school in Masvingo plans a new computer room with 30 identical computers used by students. All computers need the same software, students must log in with their own accounts, and the school has one part-time technician. Power cuts are frequent, but the school has a generator for the server room only.",
    parts: [
      P.mcq({ label: "(a)", marks: 1, stem: "Which network model is most suitable for the 30 computers?", options: [["Client-server", "Correct: central accounts and software."], ["Peer-to-peer", "30 computers each with accounts are hard to manage with no server."], ["A WAN", "The computers are in one room, so this is a LAN."], ["A bus", "A bus is a topology, not a network model."]], answer: "A", explanation: "Client-server." }),
      P.manual({ label: "(b)", marks: 3, stem: "Justify your answer to (a) using details from the scenario.", points: ["Student accounts are stored and checked on the server", "The technician can install and update software once on the server rather than on 30 computers", "The generator in the server room keeps the server running, and files are stored centrally"], modelAnswer: "Students log in with accounts held on the server. The part-time technician installs and updates software once instead of on 30 computers, and the generator keeps the server and the files available.", explanation: "Accounts, maintenance, server power." }),
      P.manual({ label: "(c)", marks: 2, stem: "State two disadvantages of using thin clients in this room.", points: ["They cannot work if the server or the network fails", "A load of 30 users on the server and network may slow it down"], modelAnswer: "They cannot be used if the server or network fails, and all 30 users together put a heavy load on the server and network.", explanation: "Dependence on the server and the load." }),
      P.manual({ label: "(d)", marks: 2, stem: "The school wants to share the marks with the education office in the provincial capital. State the type of network that is needed and one device it requires.", points: ["A WAN", "A router at each end / a modem or a leased line"], modelAnswer: "A WAN is needed. A router is needed at each end.", explanation: "WAN and a router." }),
    ] });
  b.card("DEFINITION", "Local area network (LAN)", "A network over a small area, such as a building, owned and managed by one organisation.");
  b.card("DEFINITION", "Wide area network (WAN)", "A network over a large area, usually using links leased from carriers; the internet is the largest.");
  b.card("DEFINITION", "Client-server network", "Dedicated servers provide services (files, print, email, login) to client computers; managed centrally.");
  b.card("DEFINITION", "Peer-to-peer network", "Computers have equal status and each can be both client and server; no dedicated server.");
  b.card("CONCEPT", "Client-server advantages", "Central security and backups; easy to manage many users. Drawbacks: server cost, a skilled administrator, and a single point of failure.");
  b.card("CONCEPT", "Peer-to-peer advantages", "Cheap and simple; no administrator. Drawbacks: weak security, no central backup, hard to manage when large.");
  b.card("DEFINITION", "Thin client", "A computer with little processing power or storage that relies on a server for processing; needs a connection.");
  b.card("DEFINITION", "Thick client", "A full computer with its own processor, storage and software; does its own processing and works offline.");
});
