---
{
  "key": "network.topologies-media",
  "title": "Network topologies and transmission media",
  "summary": "The bus, star, mesh and hybrid topologies (data flow, failures, cost and performance), wired against wireless networks, and the characteristics of copper cable, fibre-optic cable, radio waves, microwaves and satellite links.",
  "concepts": ["acs.network.topologies-media"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

When the technician at a new clinic in Hwange decides where to put the cables, she is choosing a **topology**: the layout of the devices and the links between them. When she decides whether to use copper cable, fibre or WiFi, she is choosing a **transmission medium**. Both choices decide how much the network costs, how fast it is, and what happens when something breaks.

This lesson describes the bus, star, mesh and hybrid topologies, compares wired and wireless networks, and then looks at the media used to carry signals. You should already know what a LAN is and what a switch does.

## Key definitions

:::definition{term="Network topology"}
The arrangement of the devices (nodes) and the links between them in a network, either as the physical layout of the cables or as the logical way data flows.
:::

:::definition{term="Transmission medium"}
The physical path, such as a cable or radio waves, that carries the signals from one device to another.
:::

:::definition{term="Attenuation"}
The weakening of a signal as it travels along a medium, which limits how far it can go before it must be boosted or regenerated.
:::

## Topologies

**Bus.** All devices are joined to a single main cable, the backbone, which has a terminator at each end to stop signals bouncing back. Data sent by one device travels along the whole backbone and is received by the device it is addressed to; the others ignore it.
- Uses little cable and is cheap to install.
- Only one device can send at a time, so collisions occur and performance falls as more devices are added.
- A break in the backbone splits the network or stops it altogether.

![Four network topologies: bus (devices on one backbone), star (each device cabled to a central switch), full mesh (4 devices need 6 links) and hybrid (two stars whose switches are joined by a backbone)](media:diagrams/network-topologies.png "Figure: bus, star, mesh and hybrid topologies")

**Star.** Each device has its own cable to a central **switch** (or hub). Data goes from the sender to the switch, which forwards it to the receiver.
- A broken cable affects only one device.
- Devices are easy to add or remove, and a switch sends data only to the receiver, so performance stays good.
- More cable is needed than for a bus.
- If the central switch fails, the whole network stops.

**Mesh.** Devices are connected by many links. In a **full mesh** every device is directly joined to every other one; in a **partial mesh** only some are. Data can follow several routes.
- If a link or device fails, data takes another route.
- It is very expensive: a full mesh of n devices needs n(n − 1) ÷ 2 links, and each device needs n − 1 ports.
- Used where reliability is vital, for example between the routers of a WAN or the internet backbone, and in wireless mesh systems that cover a large building.

| Devices | Links in a full mesh | Cable ports on each device |
|:-:|:-:|:-:|
| 4 | 6 | 3 |
| 5 | 10 | 4 |
| 6 | 15 | 5 |
| 8 | 28 | 7 |
| 10 | 45 | 9 |

**Hybrid.** A network that combines two or more topologies. A common example is several stars (one for each classroom block) whose switches are linked by a backbone, which gives a star in each room with a fast link between rooms. A hybrid network can grow as the organisation does, but it is more complex to design and manage.

:::worked-solution{title="Comparing cable for a star and a bus"}
A computer room has 8 computers. The distances from each computer to the position of the switch are 3 m, 5 m, 6 m, 8 m, 9 m, 11 m, 12 m and 14 m.

1. In a **star**, each computer has its own cable to the switch: 3 + 5 + 6 + 8 + 9 + 11 + 12 + 14 = 68 m.
2. In a **bus** with a 20 m backbone and a drop cable of 1 m to each computer, the cable is 20 + 8 × 1 = 28 m.
3. The bus uses 40 m less cable, which makes it cheaper to install.
4. However, a break in the 20 m backbone affects the whole room, whereas in the star a break affects one computer. For a classroom where reliability matters, the extra 40 m of cable is usually worth paying for.
:::

## Wired and wireless networks

| Feature | Wired | Wireless |
|---|---|---|
| Speed | Generally higher and steadier | Generally lower and varies |
| Range | Limited by the length of the cable, but cables can be joined | Limited by the signal strength; walls reduce it |
| Mobility | Devices stay where the cable reaches | Devices can move around |
| Security | Harder to intercept; a person must connect to a cable | Signals can be picked up by anyone within range unless encrypted |
| Interference | Little (fibre has none from electrical sources) | Affected by walls, other networks and devices |
| Installation | Cables must be fitted, which costs time and money | No cables between devices, only access points |
| Reliability | Steady; cable can be damaged | Signal may drop |

## Transmission media

**Copper cable.** Twisted pair (used for Ethernet in most LANs) and coaxial cable carry electrical signals. It is cheap and easy to install. Signals weaken after about 100 m in an Ethernet twisted-pair cable, and the signal can be disturbed by electromagnetic interference from motors and power cables.

**Fibre-optic cable.** Carries pulses of light along glass or plastic strands. It has a very high bandwidth, very low attenuation so it can cover long distances, and is not affected by electromagnetic interference. It is harder to tap, but it costs more and is harder to install and to repair.

**Radio waves.** Used in WiFi and in mobile networks. They pass through walls and let devices move around within the range of an access point, but they can suffer interference, slow down with distance, and be intercepted unless the transmission is encrypted. WiFi has a range of tens of metres indoors.

**Microwaves.** Higher-frequency radio waves sent in a narrow beam between two dishes, which must be in line of sight (nothing blocking the path). They give a high bandwidth over tens of kilometres without laying cable, so they link towns or hilltop masts. Heavy rain can weaken them.

**Satellite.** A signal is sent up to a satellite in orbit and back down to a receiver. It covers a very wide area, including remote places with no cable or masts, but it has a longer delay because of the distance, the equipment is expensive, and bad weather can interrupt the signal.

| Medium | Bandwidth | Range | Attenuation | Relative cost |
|---|---|---|---|---|
| Copper (twisted pair) | Medium | Up to about 100 m per cable | High | Low |
| Fibre-optic | Very high | Kilometres | Very low | High |
| Radio (WiFi) | Medium | Tens of metres | Falls quickly with distance | Low |
| Microwave | High | Tens of kilometres, line of sight | Medium | Medium |
| Satellite | Medium | Covers a continent | High delay | Very high |

:::worked-solution{title="Choosing a medium"}
A school in Mutare wants to join its library to the science block, 300 m apart, across a sports field. The link must be fast and unaffected by the lightning that is common in the rainy season.

1. Twisted pair works up to about 100 m, so a single cable is too short. Repeaters would be needed.
2. Fibre-optic cable carries light, so lightning does not induce a current in it. It has low attenuation so 300 m is no difficulty, and its bandwidth is high.
3. Choose **fibre-optic cable**, accepting its higher cost.
4. If a trench cannot be dug, a **microwave** link between the two buildings is a second choice, since they are in line of sight.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (AS Level, Paper 1). Cambridge asks you to justify a topology for a situation, to compare wired and wireless networks and to describe the media above. Questions usually give a short scenario, so refer to it.
:::

## Common mistakes

:::mistake{title="Saying data in a star goes to every device"}
A switch forwards the data to the destination only. A hub (or a bus) sends it everywhere. Name the central device correctly.
:::

:::mistake{title="Forgetting the failure point of a star"}
A cable fault affects one device, but the failure of the central switch stops the whole network. Mention both.
:::

:::mistake{title="Saying that wireless is always slower and always less secure"}
Wireless is generally slower and exposes signals more easily, but a well-configured network with encryption can be secure enough. Say "generally" and give the reason.
:::

:::mistake{title="Confusing bandwidth and range"}
Bandwidth is how much data can be sent each second. Range is how far the signal can travel. Fibre is high in both; WiFi is moderate in bandwidth and short in range.
:::

## Exam tips

:::exam-tip
"**Justify** a topology" needs the scenario's features (number of devices, importance of reliability, budget) linked to one or two features of the topology, plus a drawback you accept. Cambridge Paper 1 often asks about star and mesh.
:::

:::exam-tip
"**Compare** wired and wireless": make matching pairs of points (speed, mobility, security, installation). Do not describe one medium and leave the other implied.
:::

:::exam-tip
For the number of links in a full mesh, write the formula n(n − 1) ÷ 2, substitute, and give the answer. No calculator is allowed in Cambridge papers, so the numbers are small.
:::

## Summary

:::summary
- A bus uses one backbone: cheap, but collisions and a backbone fault affects everything. A star uses a central switch: a cable fault affects one device, but the switch is a single point of failure.
- A full mesh joins every pair of devices, needs n(n − 1) ÷ 2 links, and gives the best reliability at the highest cost; a hybrid combines topologies.
- Wired networks are faster, steadier and harder to intercept; wireless networks give mobility and easy installation but weaker signals and more risk of interception.
- Copper is cheap with high attenuation, fibre has very high bandwidth and low attenuation, radio waves give mobility, microwaves need a line of sight, and satellite covers remote areas with a long delay.
- Justify a choice by linking the features of the scenario to the features of the topology or medium.
:::
