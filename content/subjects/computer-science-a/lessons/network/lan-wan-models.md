---
{
  "key": "network.lan-wan-models",
  "title": "LANs, WANs, client-server and peer-to-peer networks",
  "summary": "What separates a LAN from a WAN, how the client-server and peer-to-peer models work, how to justify a model for a given situation, the difference between thin and thick clients, and how a packet crosses a network between two hosts.",
  "concepts": ["acs.network.lan-wan-models"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A bank in Bulawayo has a branch in Mutare. Inside each branch the cashiers' computers, printers and the branch file server are joined by cables and a few switches. Between the two branches the bank rents a connection from a telecommunications company. These are two very different kinds of network. The first covers one building and belongs entirely to the bank. The second crosses hundreds of kilometres and relies on equipment the bank does not own.

This lesson explains the difference between a **local area network (LAN)** and a **wide area network (WAN)**, compares the **client-server** and **peer-to-peer** models, looks at **thin-client** and **thick-client** computing, and follows a packet between two hosts. You should already know what a network is and why computers are connected (sharing files, printers and an internet connection).

## Key definitions

:::definition{term="Local area network (LAN)"}
A network that connects computers and devices over a small geographical area, such as a room, a building or a school site, using infrastructure owned and managed by one organisation.
:::

:::definition{term="Wide area network (WAN)"}
A network that connects computers or LANs over a large geographical area, such as between towns or countries, usually using transmission links leased from telecommunications providers. The internet is the largest WAN.
:::

:::definition{term="Client-server model"}
A network model in which one or more dedicated computers (servers) provide services such as file storage, printing, email or authentication, and other computers (clients) request those services.
:::

:::definition{term="Peer-to-peer model"}
A network model in which every computer has equal status and can act as both a client and a server, sharing its own files and devices directly with the others, with no dedicated server.
:::

## LAN and WAN compared

| Feature | LAN | WAN |
|---|---|---|
| Area covered | One room, building or site | Towns, countries, the world |
| Ownership | One organisation owns the cabling and equipment | Links are usually leased from carriers, or shared (the internet) |
| Typical data rate | High | Lower for the cost, and often shared with other users |
| Cost of setting up | Lower | Higher, and there are rental charges |
| Error rate and delay | Few errors, very small delay | More errors and a longer delay, because signals travel further and pass through more equipment |
| Typical media | Twisted-pair cable, fibre, WiFi | Fibre, microwave and satellite links, leased lines |

A school computer room is a LAN. The link between the school and the education office in the provincial capital is part of a WAN. A WAN is often made by joining LANs through **routers**.

## Client-server networks

In a client-server network the roles are fixed. The **server** is a powerful, always-on computer. Depending on its job it may be a file server, a print server, a web server, an email server or an authentication server that checks user names and passwords. A **client** is a user's computer that asks the server for a service, and the server replies.

**Benefits**
- Files, user accounts and security are managed centrally, so one administrator can control who may access what.
- Backups are made from the server, so data is not scattered over many computers.
- The server can be made reliable (extra power supply, mirrored disks) and more clients can be added without re-organising the network.

**Drawbacks**
- The server and its software cost money, and a skilled technician is needed to run it.
- If the server fails, every service it provides stops for all clients.
- A heavily used server slows down for all users.

## Peer-to-peer networks

In a peer-to-peer network each computer stores its own files and may share some of them or a printer. There is no central control and no dedicated server.

**Benefits**
- Cheap and simple to set up: no server hardware and no network administrator.
- If one computer fails the others still work with each other.

**Drawbacks**
- Security is weak: each user decides what to share, and there is no central list of accounts.
- Backing up means copying files from every computer.
- A computer that shares its files is slowed down when others use them.
- It becomes hard to manage when there are many computers.

:::worked-solution{title="Choosing a model for two situations"}
**Situation 1.** A hair salon in Gweru has four computers that print on one shared printer and exchange customers' booking lists.

1. Four computers is a small number, and there are no confidential records that need different access levels.
2. A server and an administrator would cost more than the benefit.
3. Choose **peer-to-peer**: it is cheap, simple, and a failure on one computer does not stop the others.

**Situation 2.** A school in Masvingo has 120 student computers, and each student must log in with their own account and save work in a private folder that is backed up each night.

1. Many users each need a private folder and a controlled login, which needs central management.
2. One backup from a server is easier than 120 separate ones.
3. Choose **client-server**: accounts, folders and backups are centrally managed.

State the situation's features first, then link each feature to a benefit of the chosen model. A list of general advantages without reference to the situation does not earn the marks.
:::

## Thin-client and thick-client computing

A **thick client** (fat client) is a full computer with its own processor, memory, storage and installed software. It does most of the processing itself and can work when the network is down. A **thin client** has little processing power and often no local storage. Programs run on a server and the thin client displays the screen and passes on keyboard and mouse input.

| | Thin client | Thick client |
|---|---|---|
| Processing | Mostly done on the server | Mostly done on the client |
| Local storage and software | Little or none | Own storage and installed software |
| Hardware cost per client | Low | Higher |
| Maintenance | Software is updated once, on the server | Each computer must be updated |
| Works without the network | No | Yes, for local work |
| Load on the server and network | High | Lower |
| Security | Data stays on the server, so it is not lost if the device is stolen | Data on each device is at risk |

A thin client suits a school computer room where every machine needs the same software. A thick client suits a surveyor working in the field who needs the program even without a connection.

## How a packet travels between two hosts

A host is any computer or device on a network. Data is broken into **packets** and each packet is forwarded from device to device. Inside a LAN a **switch** passes it on to the right port. To leave the LAN it must reach a **router**, which sends it towards the destination network over the WAN link.

![Two bank branches: laptops L1 and L2 join SwitchA (links 1 and 2), SwitchA joins RouterA (3), the WAN link 4 joins RouterA and RouterB, RouterB joins SwitchB (5), and SwitchB joins PC P1 (6) and Server S1 (7); the path from L1 to S1 uses links 1, 3, 4, 5 and 7](media:diagrams/network-bank-path.png "Figure: the bank network with the path from Laptop L1 to Server S1 highlighted")

Consider a bank with two branches. The table lists the links.

| Link | Joins |
|:-:|:-:|
| 1 | Laptop L1 and SwitchA |
| 2 | Laptop L2 and SwitchA |
| 3 | SwitchA and RouterA |
| 4 | RouterA and RouterB |
| 5 | RouterB and SwitchB |
| 6 | SwitchB and PC P1 |
| 7 | SwitchB and Server S1 |

:::worked-solution{title="The path from Laptop L1 to Server S1"}
1. L1 is only joined to SwitchA (link 1), so the packet goes there first.
2. SwitchA is joined to RouterA (link 3). L2 is no help because it is a dead end.
3. RouterA is joined to RouterB (link 4), which is the WAN link between the two branches.
4. RouterB is joined to SwitchB (link 5), and SwitchB is joined to Server S1 (link 7).
5. The path is Laptop L1 → SwitchA → RouterA → RouterB → SwitchB → Server S1.
6. This uses 5 links and passes through 4 intermediate devices.
:::

If link 4 failed, the two branches could not communicate, because there is no other route in this table. This is why larger organisations add a second WAN link.

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (AS Level, Paper 1): LAN, WAN, the client-server and peer-to-peer models, and thin-client and thick-client computing. The ZIMSEC syllabus does not list it as a separate item, though the ideas support its networking topics.
:::

## Common mistakes

:::mistake{title="Saying that a WAN is simply a big LAN"}
A LAN is owned and managed by one organisation over a small area. A WAN covers a wide area and normally uses links belonging to other companies. Size alone does not define the difference; ownership and geography do.
:::

:::mistake{title="Giving advantages without linking to the situation"}
"It is cheaper" scores nothing without saying why: "no server is needed for four computers". Use the numbers and uses in the question.
:::

:::mistake{title="Believing that a thin client has no processor"}
A thin client still has a processor and memory. It is the heavy processing and storage that happen on the server.
:::

:::mistake{title="Saying that peer-to-peer computers do not use servers at all"}
A computer in a peer-to-peer network acts as a server whenever another computer asks for a file it shares. What is missing is a dedicated server that controls the network.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 asks you to **justify** a model or **compare** two. Pick one model, give two or three reasons that refer to the scenario (number of users, security, cost, who will administer it), and mention the drawback you accept.
:::

:::exam-tip
For a path question (Cambridge Paper 1, or ZIMSEC Paper 1 and 2) name the devices in order, starting at the source. Count links, not devices, when the question says "hops" between hosts, and read the wording carefully.
:::

:::exam-tip
"**State**" a difference between a LAN and a WAN with a pair of comparative points (area, ownership, speed, cost). A single word such as "bigger" is too vague.
:::

## Summary

:::summary
- A LAN covers a small area and is owned by one organisation; a WAN covers a wide area and normally uses leased or shared links, the internet being the largest.
- Client-server networks have dedicated servers that give central control, security and backups, but cost more and depend on the server.
- Peer-to-peer networks are cheap and simple, with no dedicated server, but have weak security and are hard to manage when large.
- A thin client relies on the server for processing and storage; a thick client does its own processing and works offline.
- A packet moves device by device (switch, router, router, switch) between two hosts; a missing link on the only route breaks the connection.
:::
