---
{
  "key": "network.lan-hardware",
  "title": "LAN hardware, routers and Ethernet",
  "summary": "The purpose of switches, servers, network interface cards, wireless access points, bridges, repeaters and routers in a LAN, the role of the default gateway and NAT, and how Ethernet uses CSMA/CD to share a medium and why switches avoid collisions.",
  "concepts": ["acs.network.lan-hardware"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A computer lab at a school in Kwekwe has 30 computers and one cable to the outside world. Each computer needs a card to plug into the network, the cables have to meet at a device that sends each message to the right computer, and something has to connect the whole lab to the internet. Each of these jobs is done by a piece of **network hardware**.

This lesson describes the hardware that supports a LAN, explains the role of a router, and then looks at **Ethernet**: how computers sharing a cable avoid sending at the same time, and how a switch removes the problem. You should already know the star and bus topologies and the difference between a LAN and a WAN.

## Key definitions

:::definition{term="Network interface card (NIC)"}
A circuit board or chip in a device that allows it to connect to a network. It has a unique hardware address, the MAC address, and sends and receives data on the network medium.
:::

:::definition{term="MAC address"}
A unique address set in a network interface card by its manufacturer, used to identify the device on a LAN. It is written as six pairs of hexadecimal digits.
:::

:::definition{term="Default gateway"}
The address of the router on a LAN to which a device sends every packet whose destination is outside its own network.
:::

:::definition{term="CSMA/CD"}
Carrier Sense Multiple Access with Collision Detection: the method used on shared Ethernet in which a device listens before sending, and detects and recovers from collisions.
:::

## Hardware in a LAN

| Device | Purpose |
|---|---|
| **Switch** | Connects the devices in a star. It remembers the MAC address of the device on each port and forwards a frame only to the port of its destination. |
| **Server** | A computer that provides a service to the LAN, such as file storage, printing, email or authentication. |
| **Network interface card (NIC)** | Connects a computer to the cable. Converts data into signals for the medium and has the MAC address. |
| **Wireless NIC** | Does the same for radio waves, so a laptop or phone can join a wireless network. |
| **Wireless access point (WAP)** | Connects wireless devices to the wired LAN. It sends and receives radio signals and passes the data to a switch. |
| **Cabling** | The copper or fibre links between the devices. |
| **Bridge** | Joins two LAN segments so that they behave as one network. It reads MAC addresses and passes only the frames that need to cross, which reduces traffic. |
| **Repeater** | Receives a weakened signal and regenerates it, extending the distance a signal can travel. |
| **Router** | Connects different networks and forwards packets between them using IP addresses. |

A **hub** repeats every incoming signal to every other port. It has been replaced in most LANs by the switch, which sends a frame only where it is needed.

## How a switch learns

A switch keeps a table of MAC addresses and ports. When a frame arrives, the switch records the sender's address against the port it arrived on. If the destination is in the table, the frame is forwarded to that port only. If it is not, the frame is **flooded** to every port except the one it arrived on.

:::worked-solution{title="A switch table being built"}
A switch has four ports. Computers A, B, C and D are on ports 1, 2, 3 and 4. The table starts empty. Four frames arrive in order.

| Frame | Arrives on port | Table after learning | Action |
|:-:|:-:|:-:|:-:|
| A to B | 1 | A:1 | flooded to ports 2, 3, 4 |
| B to A | 2 | A:1 B:2 | forwarded to port 1 |
| C to A | 3 | A:1 B:2 C:3 | forwarded to port 1 |
| A to C | 1 | A:1 B:2 C:3 | forwarded to port 3 |

1. The first frame is from A, so the switch learns A is on port 1. B is not in the table, so the frame is flooded.
2. B replies. The switch learns B is on port 2 and, since A is known, forwards the frame to port 1 only.
3. C is learnt from its frame to A, which is forwarded to port 1 only.
4. When A sends to C, the destination is known, so only port 3 receives the frame. D never sees any of the traffic that is not meant for it, except the first flooded frame.
:::

## Routers, the default gateway and NAT

A router has a connection (an interface) to each of the networks it joins. It looks at the destination **IP address** of each packet and decides which interface to forward it to, using a routing table.

On a LAN every computer is configured with the address of a **default gateway**, which is the LAN interface of the router. When a computer wants to send to an address outside its network, it sends the packet to the default gateway and the router forwards it. Traffic inside the LAN stays inside and does not go to the router.

Many LANs use private IP addresses that cannot be used on the internet. The router carries out **network address translation (NAT)**: it replaces the private source address of an outgoing packet with its own public address and keeps a note, so that the reply can be sent back to the right computer. As a result several devices share a single public address.

## Ethernet and CSMA/CD

**Ethernet** is the standard for wired LANs. On an older shared cable or hub, only one device can send at a time, or the signals collide and are corrupted. A **collision** happens when two devices transmit together. Ethernet uses CSMA/CD:

1. **Listen** to the medium (carrier sense).
2. If it is idle, **transmit**. If it is busy, wait until it is idle.
3. While sending, keep listening. If another signal is detected, a **collision** has occurred.
4. Send a short **jam signal** so that all devices know, and stop transmitting.
5. Each device waits a **random back-off** time and then goes back to step 1. The randomness makes it unlikely that both wait the same time and collide again.

:::worked-solution{title="Two stations and a collision"}
Stations P and Q share a cable and both have a frame to send.

1. P listens and finds the cable idle, so it starts transmitting.
2. Q also listens just before P's signal reaches it, finds the cable idle and starts transmitting.
3. The signals meet and are corrupted. Both stations detect the collision.
4. Each sends a jam signal and stops.
5. P picks a random wait that is shorter than Q's, so P listens again first, finds the cable idle and sends its frame successfully.
6. Q waits for its longer time, finds the cable busy until P has finished, then transmits.
:::

On a **switched** network each device has its own cable to a port, and a link can send and receive at once (full duplex). Frames are not shared along a cable, so there are no collisions on the link and CSMA/CD is hardly needed. This is why switches have replaced hubs in modern LANs.

:::example{title="Why the technician replaced the hub"}
The computer room at a college in Gweru used a hub, and printing a large file made everything slow. Every frame went to all 25 ports, and collisions grew as more students logged on. After the hub was replaced by a switch, each frame went only to its destination, and the slowdown stopped.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (AS Level, Paper 1). ZIMSEC covers routers in the context of the routing protocols (RIP and OSPF) and IP addressing. For Cambridge, learn the purpose of each device above and the five steps of CSMA/CD.
:::

## Common mistakes

:::mistake{title="Saying that a switch broadcasts to all computers"}
A hub does that. A switch sends a frame only to the destination port once it knows it. Only an unknown destination is flooded.
:::

:::mistake{title="Using the router to connect devices inside a LAN"}
A switch connects devices in the same LAN. A router connects different networks, such as a LAN to the internet.
:::

:::mistake{title="Confusing the MAC address and the IP address"}
The MAC address is fixed in the NIC and is used on the local network. The IP address is given by the network and used to route packets between networks.
:::

:::mistake{title="Omitting the jam signal or the random wait"}
The steps are: listen, transmit, detect, jam, random back-off, try again. Without a random wait, two devices that collided would collide again.
:::

## Exam tips

:::exam-tip
"**State the purpose**" of a device: give a verb and its job: "a repeater regenerates a weakened signal to extend the distance", "a switch forwards frames only to the destination port". One sentence is enough for 1 or 2 marks.
:::

:::exam-tip
"**Describe** CSMA/CD" is marked for the sequence: listen; send if idle; detect collision; jam; wait a random time; retry. Use the words in order.
:::

:::exam-tip
For a switch-table question, update the table for each frame before deciding the action. Learn the source first, then look up the destination.
:::

## Summary

:::summary
- A switch learns MAC addresses and forwards each frame to the destination port; an unknown destination is flooded to the other ports.
- A NIC connects a device to the network and holds its MAC address; a wireless access point joins wireless devices to the wired LAN.
- A repeater regenerates a signal; a bridge joins two LAN segments; a router connects different networks using IP addresses.
- The default gateway is the router address to which a device sends packets for other networks; NAT lets many private addresses share one public address.
- CSMA/CD: listen, transmit if idle, detect a collision, send a jam signal, wait a random back-off and try again; a switched network avoids collisions.
:::
