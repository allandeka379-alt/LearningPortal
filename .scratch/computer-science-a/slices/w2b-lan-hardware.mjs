// Slice w2b: LAN hardware, routers and Ethernet (acs.network.lan-hardware, Cambridge only).
import { concept, P, chk, same } from "../lib.mjs";
import { mc, pm } from "../tables/w2b-q.mjs";
import { switchSim, switchMd } from "../tables/w2b-lan-hardware.mjs";

// five-port switch: Rudo on 1, Farai on 2, Chipo on 3, Sipho on 4, Printer on 5
const ports = { Rudo: 1, Farai: 2, Chipo: 3, Sipho: 4, Printer: 5 };
const frames = [["Farai", "Printer"], ["Printer", "Farai"], ["Rudo", "Farai"], ["Sipho", "Rudo"], ["Farai", "Sipho"]];
const sim = switchSim(ports, frames);
same(sim.map((r) => r.action), ["flooded to ports 1, 3, 4, 5", "forwarded to port 2", "forwarded to port 2", "forwarded to port 1", "forwarded to port 4"]);
const frameList = frames.map((f, i) => `${i + 1}. ${f[0]} sends to ${f[1]}`).join("\n");
const actions = ["flooded to every other port", "forwarded to port 2 only", "forwarded to port 4 only", "discarded"];

concept("acs.network.lan-hardware", { file: "network/lan-hardware", keyPrefix: "network.lan-hardware" }, (b) => {
  mc(b, 1, "RECALL", "What is the main job of a network interface card (NIC)?",
    ["It connects a computer to the network medium", "Correct: it sends and receives the signals."],
    [["It stores the files shared on the network", "File storage is the job of a server."], ["It joins two different networks together", "That is the job of a router."], ["It strengthens a signal that has become weak", "That is the job of a repeater."]],
    "A NIC connects a device to the network and holds its MAC address.");
  mc(b, 2, "UNDERSTANDING", "What does a repeater do?",
    ["It regenerates a weakened signal so that it can travel further", "Correct: it overcomes attenuation."],
    [["It joins a LAN to the internet using IP addresses", "That is a router."], ["It forwards a frame only to the port of its destination", "That is a switch."], ["It converts a digital signal into radio waves for a laptop or phone", "That is a wireless NIC or access point."]],
    "A repeater receives a weak signal and sends out a fresh copy.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the purpose of a wireless access point in a school LAN?",
    ["To connect wireless devices to the wired network", "Correct: it links radio to cable."],
    [["To give each device a MAC address", "The MAC address is set in the NIC."], ["To store the user accounts", "That is the server."], ["To translate private addresses into a public address", "That is NAT, done by a router."]],
    "A WAP is the point where radio devices reach the wired LAN.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is a default gateway?",
    ["The router address to which a device sends packets for other networks", "Correct."],
    [["The first computer to start up on a LAN", "A gateway is a router address, not a computer start order."], ["The MAC address of the switch", "The gateway is an IP address of a router."], ["The cable that joins the switch to the file server in the computer lab", "It is an address, not a cable."]],
    "Packets for addresses outside the LAN go to the default gateway.");
  mc(b, 3, "ANALYSIS", "Why does a switch usually give better performance than a hub?",
    ["It sends each frame only to the port of the destination", "Correct: other devices are not disturbed."],
    [["It increases the speed of every cable", "A switch does not change the speed of the cables."], ["It removes the need for a MAC address", "Switches use MAC addresses to forward frames."], ["It broadcasts every frame to every port, whether or not it is needed", "That is what a hub does."]],
    "A hub repeats every frame to all ports, so devices share the capacity; a switch forwards selectively.", { hints: ["Compare where the frame is sent in each device."] });
  mc(b, 3, "UNDERSTANDING", "In CSMA/CD, what happens straight after a device detects a collision?",
    ["It sends a jam signal and stops transmitting", "Correct: then it waits a random time."],
    [["It resends the frame at once", "Resending immediately would cause another collision."], ["It sends the frame to the default gateway of the network", "The gateway is not involved in a collision on the LAN."], ["It switches to a wireless connection", "CSMA/CD does not change the medium."]],
    "After a collision: jam, stop, random back-off, listen, retry.", { hints: ["Recall the five steps in order."] });
  mc(b, 4, "ANALYSIS", "A technician replaces a hub with a switch and finds that collisions almost disappear. Which statement best explains this?",
    ["Each device has its own link to a switch port, so frames are not sharing a cable", "Correct: no shared medium means no collisions on the link."],
    [["The switch increases the random back-off time that devices must wait after a collision", "The back-off is set by the Ethernet method, not by the switch."], ["The switch encrypts all frames", "Encryption does not prevent collisions."], ["The switch gives each computer a new MAC address", "MAC addresses do not change."]],
    "A switched, full-duplex link is not shared, so two devices cannot collide on it.", { hints: ["What was shared when a hub was used?"] });
  b.tf({ d: 2, skill: "RECALL", stem: "A router connects different networks and forwards packets using IP addresses.", answer: true, explanation: "True. A router reads the destination IP address and uses its routing table." });
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "A switch sends every frame to every port in the same way as a hub.", answer: false, explanation: "False. A switch forwards a frame to the destination port only, once it has learnt where the destination is." });
  b.tf({ d: 3, skill: "UNDERSTANDING", hints: ["Which address is fixed in the card?"], stem: "The MAC address of a device changes when it is moved to a different network.", answer: false, explanation: "False. The MAC address is fixed in the network card. The IP address is the one that changes." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each device to its purpose.",
    pairs: [["Switch", "Forwards frames to the destination port using MAC addresses"], ["Router", "Joins different networks and forwards packets using IP addresses"], ["Repeater", "Regenerates a weakened signal"], ["Bridge", "Joins two LAN segments and passes only the frames that need to cross"], ["Wireless access point", "Lets wireless devices join the wired LAN"]],
    explanation: "Each device works at a different level of the network." });
  b.fib({ d: 3, skill: "UNDERSTANDING", stem: "Put the steps of CSMA/CD in order by completing the sentences.",
    template: "A device first {{blank:a}} to the medium. If it is idle the device {{blank:b}}. If it detects a collision it sends a {{blank:c}} signal and then waits a {{blank:d}} time before trying again.",
    blanks: [
      { id: "a", accepted: ["listens"], choices: ["listens", "transmits", "jams", "waits"] },
      { id: "b", accepted: ["transmits"], choices: ["transmits", "listens", "waits", "stops"] },
      { id: "c", accepted: ["jam"], choices: ["jam", "reset", "routing", "carrier"] },
      { id: "d", accepted: ["random"], choices: ["random", "fixed", "zero", "longest"] },
    ], hints: ["Listen, send, detect, jam, wait."], explanation: "Listen, transmit, detect, jam, random wait." });
  b.fib({ d: 3, skill: "APPLICATION", hints: ["Learn the sender's port first, then check the destination.", "The table starts empty."],
    stem: `A five-port switch has Rudo on port 1, Farai on port 2, Chipo on port 3, Sipho on port 4 and a printer on port 5. Its address table starts empty. Frames arrive in this order:\n\n${frameList}\n\nChoose the action the switch takes for frames 1 to 3.`,
    template: "Frame 1: {{blank:f1}}\n\nFrame 2: {{blank:f2}}\n\nFrame 3: {{blank:f3}}",
    blanks: [
      { id: "f1", accepted: [actions[0]], choices: actions },
      { id: "f2", accepted: [actions[1]], choices: actions },
      { id: "f3", accepted: [actions[1]], choices: actions },
    ], wrong: [[actions[3], actions[0], actions[2]]],
    explanation: "Frame 1: the printer is unknown, so the frame is flooded. Frame 2: Farai was learnt on port 2, so the reply goes to port 2 only. Frame 3: Farai is known on port 2, so forwarded to port 2." });
  b.num({ d: 3, skill: "APPLICATION", hints: ["Flooding goes to every port except the one the frame arrived on."],
    stem: "A 24-port switch has an empty address table. A frame arrives on port 6 for a device it has not learnt. To how many ports is the frame sent?",
    value: 23, wrong: [24, 1], workedSolution: "1. The destination is unknown, so the frame is flooded.\n2. It is sent to every port except port 6.\n3. 24 − 1 = 23.", explanation: "Flooded to 23 ports." });
  b.num({ d: 2, skill: "APPLICATION", daily: true, hints: ["Count the entries after the frames have been learnt."],
    stem: `After frames 1 to 5 below have arrived at the switch (table initially empty), how many devices are in its address table?\n\n${frameList}`,
    value: Object.keys(Object.fromEntries(frames.map((f) => [f[0], 1]))).length, wrong: [5, 2],
    workedSolution: "1. The table learns the sender of each frame: Farai, Printer, Rudo, Sipho.\n2. Farai appears twice but is stored once.\n3. There are 4 entries.", explanation: "Senders: Farai, Printer, Rudo and Sipho = 4 devices." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 4, hints: ["Four marks: the sequence."],
    stem: "Describe how Ethernet uses CSMA/CD when two devices send at the same time. [4]",
    points: ["Each device listens to check that the medium is idle before it transmits", "Both transmit and the signals collide; the devices detect the collision", "Each sends a jam signal and stops transmitting", "Each waits a random time before listening and trying again"],
    modelAnswer: "Each device listens until the medium is idle and then transmits. If two transmit together there is a collision, which both detect. They each send a jam signal and stop, wait a random time and try again.",
    explanation: "Listen, transmit, detect, jam, random wait." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["What does the router do with an outside address?"],
    stem: "A laptop on a school LAN sends a request to a web server on the internet. Explain the role of the default gateway. [3]",
    points: ["The destination is outside the laptop's own network", "So the laptop sends the packet to the default gateway, which is the address of the router", "The router forwards the packet towards the destination network"],
    modelAnswer: "The web server is outside the LAN, so the laptop sends the packet to its default gateway, which is the router. The router forwards it towards the destination network.",
    explanation: "Outside address, to the gateway, forwarded by the router." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Mention the table of MAC addresses."],
    stem: "Explain how a switch decides where to send a frame. [3]",
    points: ["It reads the destination MAC address in the frame", "It looks the address up in its table of MAC addresses and ports", "It forwards to that port only, or floods to all other ports if the address is not in the table"],
    modelAnswer: "The switch reads the destination MAC address and looks it up in its table. If it is there, the frame goes to that port only. If not, it is sent to all other ports.",
    explanation: "Read, look up, forward or flood." });
  b.manualShort({ d: 2, skill: "RECALL", marks: 2, hints: ["One mark for what the router replaces, one for the benefit."],
    stem: "Outline what network address translation (NAT) does. [2]",
    points: ["The router replaces the private source address of an outgoing packet with its public address", "This allows many devices to share one public address / the replies are sent back to the right device"],
    modelAnswer: "The router replaces the private source address with its own public address, so many devices can share one public address and replies reach the right device.",
    explanation: "Private to public and sharing." });
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["Update the table for each frame before choosing the action.", "Flood when the destination is not in the table."],
    explanation: "Run the table from empty; the switch learns the sender each time.",
    stem: `A four-port switch connects Nyasha's PC (port 1), Thandeka's PC (port 2), a file server (port 3) and a printer (port 4). The address table is empty. Frames arrive in this order:\n\n1. Nyasha's PC sends to the server\n2. The server sends to Nyasha's PC\n3. Thandeka's PC sends to the printer\n4. The printer sends to Thandeka's PC`,
    parts: (() => {
      const s = switchSim({ Nyasha: 1, Thandeka: 2, Server: 3, Printer: 4 }, [["Nyasha", "Server"], ["Server", "Nyasha"], ["Thandeka", "Printer"], ["Printer", "Thandeka"]]);
      same(s.map((r) => r.action), ["flooded to ports 2, 3, 4", "forwarded to port 1", "flooded to ports 1, 3, 4", "forwarded to port 2"]);
      return [
        pm("(a)", "What does the switch do with frame 1?", ["Floods it to ports 2, 3 and 4", "Correct: the server is not in the table yet."], [["Sends it to port 3 only", "The server's port has not been learnt."], ["Discards it", "Frames to unknown destinations are flooded, not discarded."], ["Sends it to port 1", "Port 1 is where it came from."]], "Unknown destination, flooded."),
        pm("(b)", "What does the switch do with frame 2?", ["Forwards it to port 1 only", "Correct: Nyasha was learnt on port 1."], [["Floods it to ports 1, 2 and 4", "Nyasha's port is known."], ["Sends it to port 3", "Port 3 is where it came from."], ["Discards it", "It is for another port."]], "The destination is in the table."),
        P.num({ label: "(c)", marks: 2, stem: "To how many ports is frame 3 sent?", value: 3, wrong: [1, 4], workedSolution: "1. The printer has not yet been learnt, so frame 3 is flooded.\n2. It is sent to all ports except port 2: ports 1, 3 and 4.", explanation: "Flooded to 3 ports." }),
        P.manual({ label: "(d)", marks: 2, stem: "Explain why frame 4 is sent to port 2 only.", points: ["The switch learnt Thandeka's address on port 2 when frame 3 arrived", "The destination is in the table, so the frame is forwarded to that port only"], modelAnswer: "The switch learnt that Thandeka's PC is on port 2 from frame 3, so it forwards the frame to that port only.", explanation: "Learning from the source address." }),
      ];
    })() });
  b.struct({ d: 3, skill: "ANALYSIS", examStyle: true, hints: ["Think about which device does each job."],
    explanation: "Switch inside the LAN, router to the internet, wireless access point for laptops, repeater to extend the cable.",
    stem: "A guest lodge near Victoria Falls has 20 rooms in a long single-storey building. The reception computer and a server are connected by cable to a switch. Guests use their own laptops and phones. The lodge also has a link to an internet service provider.",
    parts: [
      P.manual({ label: "(a)", marks: 2, stem: "Name the device that lets the guests' laptops join the wired network and state what it does.", points: ["Wireless access point", "It sends and receives radio signals and passes data to the wired network"], modelAnswer: "A wireless access point. It sends and receives radio signals and connects the guests' devices to the wired network.", explanation: "WAP." }),
      P.manual({ label: "(b)", marks: 2, stem: "Name the device that connects the lodge LAN to the internet and state one thing it does with a packet.", points: ["Router", "It reads the destination IP address and forwards the packet towards the internet / replaces the private address (NAT)"], modelAnswer: "A router. It reads the destination IP address and forwards the packet towards the internet.", explanation: "Router." }),
      P.manual({ label: "(c)", marks: 2, stem: "The cable to the last room is longer than the limit and the signal is weak. State the device that can be added and what it does.", points: ["A repeater", "It regenerates the weak signal so it can travel further"], modelAnswer: "A repeater regenerates the weak signal so it can travel further.", explanation: "Repeater." }),
    ] });
  b.card("DEFINITION", "Network interface card (NIC)", "Connects a device to a network medium and holds its MAC address.");
  b.card("DEFINITION", "MAC address", "A unique hardware address set in a NIC; used to identify the device on a LAN.");
  b.card("CONCEPT", "Switch", "Learns the MAC address behind each port and forwards a frame only to the destination port; floods if the address is unknown.");
  b.card("CONCEPT", "Router", "Connects different networks and forwards packets by IP address; its LAN address is the default gateway.");
  b.card("CONCEPT", "Repeater and bridge", "Repeater regenerates a weak signal. Bridge joins two LAN segments and passes only the frames that must cross.");
  b.card("DEFINITION", "Default gateway", "The router address to which a device sends packets whose destination is outside its own network.");
  b.card("CONCEPT", "NAT", "A router replaces private source addresses with its public address so many devices share one public address.");
  b.card("CONCEPT", "CSMA/CD", "Listen; transmit if idle; detect a collision; send a jam signal; wait a random back-off; retry.");
});
