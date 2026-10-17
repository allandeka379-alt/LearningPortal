---
{
  "key": "network.devices",
  "title": "Networking devices: NICs, switches and routers",
  "summary": "The network interface card; hubs, switches, bridges, routers and modems and the job each does; how a router forwards data, assigns IP addresses and connects a local network to the internet; and designing a simple network.",
  "concepts": ["comp.network.devices"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Tendai's school in Gweru has just opened a computer room. The technician has unpacked thirty computers, a box of cables, a switch, a wireless access point and a router supplied by the internet service provider. Each box does a different job, and the network only works if each device is in the right place.

Cambridge 0478 (topic 3.4) asks why a computer needs a **network interface card**, and what a **router** does. ZIMSEC Form 4 goes further: you must explain the functions of hubs, switches, bridges, routers and modems and be able to design a simple network. Exam questions often describe a device's job and ask you to name it, or ask why one device is better than another.

## Key definitions

:::definition{term="Network interface card (NIC)"}
The hardware that allows a device to connect to a network, by cable or wirelessly. It is given a unique MAC address when it is manufactured.
:::

:::definition{term="Switch"}
A device that connects the devices on a LAN and sends each packet only to the device it is addressed to, using the MAC addresses of the devices.
:::

:::definition{term="Router"}
A device that connects networks together, such as a LAN to the internet, and forwards each packet towards its destination using the IP address in the packet.
:::

:::definition{term="Modem"}
A device that converts digital data from a computer into a signal that can travel along a telephone line or cable (modulation), and converts incoming signals back into digital data (demodulation).
:::

## The network interface card

A computer cannot join a network on its own. It needs a **NIC**: a circuit (built into the motherboard in most modern computers) with a port for a cable, or a radio for wireless (a wireless NIC). The NIC:

- prepares data into the form the network uses and sends and receives it;
- carries the device's **MAC address**, given at manufacture, which identifies the device on the local network.

## Devices that join computers on a LAN

### Hub

A hub connects devices in a star. When a packet arrives, the hub sends it out to **every** other device, and each device checks whether the packet is addressed to it. This creates unnecessary traffic, data collisions and a security risk, because every device sees every packet. Hubs have now largely been replaced by switches.

### Switch

A switch also connects devices in a star, but it is "intelligent". It learns the MAC address of the device on each of its ports and keeps a table of them. When a packet arrives, the switch reads the destination MAC address and sends the packet **only** to the port where that device is connected.

- Less traffic and fewer collisions, so the network is faster.
- More secure, because other devices do not receive the packet.

### Bridge

A bridge joins **two segments of a LAN** that use the same protocol, for example two parts of an office, into one network. It checks the MAC address on each packet and only passes it across if the destination is on the other segment, which keeps local traffic on its own side.

## Devices that connect networks

### Router

A router joins **different networks**: most often, a school or home LAN to the internet through the internet service provider. It:

1. reads the **destination IP address** of each packet;
2. looks it up in its **routing table** to choose the best next step (the next router) towards the destination;
3. forwards the packet; the next router repeats the process until the packet arrives;
4. on a home or school network, **assigns IP addresses** to devices as they join (using DHCP), so each device has an address on the local network;
5. connects the local network to the internet, so every device can share one connection.

Many home routers combine a router, a switch, a wireless access point and a modem in one box.

### Modem

Computers work with digital data, but some links (such as an old telephone line) carry analogue signals. A **mo**dulator-**dem**odulator converts between the two. A modem is needed at each end of such a link. Fibre and cable connections use their own termination devices that do a similar conversion job.

### Wireless access point

A **wireless access point** (WAP) lets wireless devices join a wired LAN. It is usually connected to a switch by a cable.

![Path of a web page request from a school computer: the NIC sends packets, the switch uses the MAC address to pass them only to the router, the router uses the IP address to forward them towards the ISP, and a modem converts the signal if the line is analogue](media:diagrams/lan-devices-request-path.png "Figure: the devices a web request passes through, from computer to internet")

:::worked-solution[Following a packet through a school network]
Rudo, in the school computer room, opens a website. Trace the devices her request passes through.

1. Her computer's **NIC** sends the request as packets onto the cable.
2. The **switch** reads the destination MAC address (the router's) and sends the packets only to the router's port.
3. The **router** reads the destination IP address of the web server, checks its routing table and forwards the packets out to the internet service provider.
4. If the line to the provider carries analogue signals, the **modem** converts the digital data into a signal for the line.
5. Routers across the internet forward the packets, each choosing the next step, until they reach the web server; the reply returns the same way in reverse, and the switch delivers it only to Rudo's computer.
:::

:::example
**Designing a simple network (ZIMSEC).** A small library in Masvingo has 8 desktop computers, a printer and a few visitors with laptops. It wants every device on the internet.

- Fit each desktop with a NIC (built in) and run a twisted pair cable from each to a **switch** with at least 12 ports, leaving room to grow.
- Connect the **printer** to the switch so that everyone can share it.
- Connect a **wireless access point** to the switch for visitors' laptops and phones.
- Connect the switch to a **router**, which joins the LAN to the provider's line (with a modem if the line needs one) and gives each device an IP address.
- The result is a star LAN with the switch at the centre and one shared internet connection.
:::

## Common mistakes

:::mistake{title="Saying a switch and a hub do the same job"}
Both connect devices in a star, but a hub sends every packet to every device, while a switch uses MAC addresses to send each packet only to its destination.
:::

:::mistake{title="Saying a router sends data using MAC addresses"}
A switch works with MAC addresses inside a LAN. A router forwards packets between networks using **IP addresses**.
:::

:::mistake{title="Calling the modem the device that gives out IP addresses"}
It is the router that assigns IP addresses to devices on the local network. The modem only converts signals.
:::

## Exam tips

:::exam-tip
For "describe the role of a router", give three ideas: it forwards data to a specific destination using the IP address (and a routing table), it can assign IP addresses to devices, and it connects the local network to the internet.
:::

:::exam-tip
If a question asks why a switch is better than a hub, give the reason **and** the effect: "it sends data only to the device it is meant for, so there is less traffic / fewer collisions / better security".
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 examines the NIC, MAC and IP addresses and the role of the router. ZIMSEC also examines hubs, switches, bridges and modems, and asks you to design and configure a simple network.
:::

## Summary

:::summary
- A NIC lets a device connect to a network and holds its MAC address.
- A hub sends packets to every device; a switch sends them only to the device with the destination MAC address.
- A bridge joins two segments of a LAN that use the same protocol.
- A router joins networks, forwards packets using IP addresses and a routing table, assigns local IP addresses and connects a LAN to the internet.
- A modem converts digital data to and from a signal that a line can carry.
:::
