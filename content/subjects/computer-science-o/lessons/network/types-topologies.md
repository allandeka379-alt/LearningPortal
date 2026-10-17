---
{
  "key": "network.types-topologies",
  "title": "Computer networks: types and topologies",
  "summary": "What a computer network is and why organisations use one; LAN, WAN, PAN and MAN; client-server and peer-to-peer networks; and the star, ring, bus and mesh topologies with their advantages and disadvantages.",
  "concepts": ["comp.network.types-topologies"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

At Mutare Hills Secondary School (a fictional school), the thirty computers in the laboratory share one printer, one internet connection and a server that stores every learner's work. A learner can log in at any computer and still find her files. None of this would be possible if the computers stood alone: they are joined into a **network**.

ZIMSEC introduces networks in Form 1 (what a network is, LAN and WAN, the four topologies) and returns to them in Form 2 (PAN and MAN). Paper 2 often gives a short scenario, such as a school, a bank or a farm, and asks you to name the type of network, describe a topology or explain why one layout suits the situation better than another.

## Key definitions

:::definition{term="Computer network"}
Two or more computers or devices connected together, by cables or wirelessly, so that they can communicate and share data, software and hardware.
:::

:::definition{term="Network topology"}
The layout of a network: how the computers and other devices (the nodes) are connected to one another.
:::

:::definition{term="Node"}
Any device connected to a network, such as a computer, printer, server or switch.
:::

:::definition{term="Server"}
A computer on a network that provides a service to other computers, for example storing files, managing printing or controlling user logins.
:::

## Why use a network?

- **Share hardware**: one printer or scanner serves many users.
- **Share data and software**: files are stored centrally, so everyone works on the latest copy; software can be installed once on a server.
- **Share an internet connection** among many users.
- **Communicate**: email, messaging and video calls between users.
- **Central management**: backups, security updates and user accounts are handled in one place.

Networks also bring risks: a virus can spread from one computer to all the others, a fault in a central device can stop everyone working, and a network needs extra hardware and a skilled person to manage it.

## Types of network by size

| Type | Covers | Typical example |
|:--|:--|:--|
| **PAN** (personal area network) | A few metres around one person | A phone linked to wireless earphones and a smartwatch by Bluetooth |
| **LAN** (local area network) | One building or a group of nearby buildings | A school laboratory or an office floor |
| **MAN** (metropolitan area network) | A town or city | A city council linking its offices across Bulawayo |
| **WAN** (wide area network) | A country or the world | A bank linking its branches in Harare, Gweru and Masvingo; the internet is the largest WAN |

A LAN is usually owned by the organisation that uses it. A WAN normally uses communication links (cables, microwave or satellite) rented from telecommunication companies.

## Client-server and peer-to-peer

In a **client-server** network, one or more servers hold the files and control access; the other computers (clients) request services from them. It is easier to back up and secure, but the server costs money, needs a network manager, and if it fails nobody can reach the shared files.

In a **peer-to-peer** network, every computer has equal status and shares its own files and printer with the others. It is cheap and simple for a few computers, such as a small shop, but there is no central backup or security, and a file may be stored on a computer that has been switched off.

## Network topologies

![Four topologies with five computers each: star (5 cables to a central switch), bus (one backbone with a terminator at each end), ring (each computer linked to two neighbours, data in one direction) and full mesh (every pair linked, 10 cables)](media:diagrams/network-topologies-five-computers.png "Figure: star, bus, ring and full mesh topologies for five computers")

### Star topology

Every node has its own cable to a central device, usually a **switch**.

- Advantages: if one cable or computer fails, the rest keep working; new nodes are easy to add; there are few data collisions because the switch sends data only to the computer it is meant for.
- Disadvantages: if the central switch fails the whole network stops; more cable is needed than for a bus.

### Bus topology

All nodes are connected to a single main cable (the **backbone**), with a **terminator** at each end to stop signals reflecting back.

- Advantages: cheap and easy to install; uses the least cable.
- Disadvantages: if the backbone breaks, the whole network fails; performance drops as more nodes are added because only one node can transmit at a time and data collisions increase; faults are hard to find.

### Ring topology

Each node is connected to exactly two others, forming a closed loop. Data travels round the ring in one direction, passing through each node until it reaches its destination.

- Advantages: no data collisions, because data flows in one direction; performance stays steady under heavy load.
- Disadvantages: a break in the ring, or one failed node, can stop the whole network; adding a node means breaking the ring.

### Mesh topology

Every node is connected to several others. In a **full mesh**, every node has a direct link to every other node.

- Advantages: if one link fails, data takes another route, so the network is very reliable; data can travel on many paths at once.
- Disadvantages: expensive, with a great deal of cabling; difficult to install and manage.

The internet behaves like a partial mesh: routers have several links, so data can be re-routed round a fault.

:::worked-solution[Counting the cables for each topology]
A small office in Gweru has 5 computers. How many cables are needed for a star (with a switch) and for a full mesh?

1. Star: each computer has one cable to the switch, so 5 cables are needed.
2. Full mesh: each of the 5 computers links to the other 4, giving 5 × 4 = 20 link ends.
3. Each cable joins two computers, so it has been counted twice: 20 ÷ 2 = 10 cables.
4. The full mesh needs twice as many cables as the star here, and the gap grows quickly: with 10 computers a full mesh needs 45 cables, a star only 10.
:::

:::example
**Choosing a topology.** Rudo's family runs a farm supplies shop in Masvingo with eight computers: four at the tills, three in the office and one in the store room. The tills must keep working even if an office computer breaks.

A **star** network suits the shop. Each computer has its own cable to a switch, so a fault on an office computer or its cable does not affect the tills. Adding a ninth computer later just needs one more cable to the switch. The risk is the switch itself, so the shop should keep a spare switch. A bus would be cheaper, but one broken backbone cable would stop all the tills; a full mesh would be far too expensive for eight computers.
:::

## Common mistakes

:::mistake{title="Confusing network type with topology"}
LAN, WAN, PAN and MAN describe the **size** (area covered) of a network; star, bus, ring and mesh describe its **layout**. A LAN can be a star or a bus.
:::

:::mistake{title="Saying a WAN is just a big LAN in one building"}
A WAN covers a large geographical area, such as several towns or countries, and usually uses links rented from telecommunication companies. Size alone in one building is still a LAN.
:::

:::mistake{title="Writing that a star network fails if one computer fails"}
In a star network only the **central device** is a single point of failure. A broken computer or cable affects that computer alone.
:::

## Exam tips

:::exam-tip
For "describe" a topology, say how the nodes are connected (central switch, single backbone with terminators, closed loop, multiple links). For "explain an advantage", add the reason: "if one cable fails only that computer is affected, **because** each node has its own cable to the switch".
:::

:::exam-tip
When a scenario asks you to recommend a topology, link your choice to the scenario's own words (reliability needed, small budget, easy expansion). An answer that would fit any scenario earns little credit.
:::

## Summary

:::summary
- A network joins computers so they can share hardware, data, software and an internet connection, and communicate.
- PAN, LAN, MAN and WAN describe the area a network covers; the internet is the largest WAN.
- Client-server networks have central servers; peer-to-peer networks have equal computers sharing their own resources.
- Star: central switch, reliable and easy to expand, but the switch is a single point of failure. Bus: one backbone, cheap, but one break stops everything.
- Ring: closed loop with one-way data flow and no collisions. Mesh: many links, very reliable, but expensive.
:::
