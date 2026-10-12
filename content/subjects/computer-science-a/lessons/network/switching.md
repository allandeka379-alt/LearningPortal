---
{
  "key": "network.switching",
  "title": "Circuit switching and packet switching",
  "summary": "How circuit switching sets up a dedicated path before communication and how packet switching splits a message into packets with a header, payload and trailer that are routed independently and reassembled, with the benefits, drawbacks and uses of each, and the role of routers, routing tables and hop counts.",
  "concepts": ["acs.network.switching"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A phone call and a WhatsApp-style message look similar to the user, but the network handles them in different ways. For a traditional phone call, the network reserves a path between the two telephones for as long as the call lasts. A message sent over the internet is broken up into small pieces that find their own way through the network and are put back together at the other end.

These are the two switching methods: **circuit switching** and **packet switching**. This lesson explains both, compares them, and describes how routers move packets across a network such as the internet. You should already know the role of a router and what an IP address is.

## Key definitions

:::definition{term="Circuit switching"}
A method in which a dedicated communication path between the sender and receiver is set up before any data is sent, and is kept for the whole communication, so the full bandwidth of the path is reserved for those two users.
:::

:::definition{term="Packet switching"}
A method in which a message is divided into packets, each of which is sent separately, possibly by a different route, across a network and reassembled in order at the destination.
:::

:::definition{term="Hop"}
One step of a packet from one router to the next. The hop count is the number of routers a packet passes through, or links it crosses, between source and destination.
:::

## Circuit switching

1. **Set-up.** A path of links and switches between the two ends is established and reserved.
2. **Transfer.** Data flows along the path as a steady stream, in order, with a constant bandwidth and a small, fixed delay.
3. **Release.** When the communication ends, the path is released for others.

**Benefits.** The bandwidth is guaranteed; data arrives in order and with little delay; no reassembly is needed. This suits a real-time conversation. **Drawbacks.** The path must be set up before anything is sent. The reserved capacity is wasted when nobody is talking or sending, and it cannot be used by others. If a link on the path fails the call is lost. **Uses.** Traditional telephone calls over the telephone network.

## Packet switching

1. The message is divided into **packets**. Each packet has three parts:
   - a **header**: the source and destination addresses, the packet number (so that the message can be put in order) and a time-to-live count;
   - the **payload**: the piece of the data;
   - a **trailer**: a marker for the end and an error check.
2. Each packet is sent into the network. At each router the destination address is read, and the packet is sent to the next router (the **next hop**) that leads towards the destination. Packets from the same message can take different routes.
3. At the destination the packets are checked, put in the order of their numbers and reassembled. A missing or damaged packet can be requested again.

**Benefits.** Links are shared by many users, so capacity is used efficiently. There is no set-up, and if a link fails the packets are sent by another route. **Drawbacks.** Packets may arrive out of order, with different delays, or be lost, so the receiver must reorder and sometimes ask again. The headers add extra data. The delay is variable, which can affect a live call. **Uses.** The internet, email and web pages, and voice calls over the internet.

| Feature | Circuit switching | Packet switching |
|---|---|---|
| Path | Dedicated, set up first | No set-up; packets routed separately |
| Bandwidth | Reserved for the whole call | Shared; used only when packets are sent |
| Order of data | In order | May arrive out of order; reassembled |
| Delay | Constant and small | Variable |
| If a link fails | The connection is lost | Packets are routed another way |
| Efficiency | Wasted when idle | Efficient |

:::worked-solution{title="Splitting a message into packets"}
A message of 4500 bytes is sent. Each packet carries at most 1000 bytes of payload, plus a header of 20 bytes and a trailer of 4 bytes.

| Packet | Payload (bytes) | Size with header and trailer (bytes) |
|:-:|:-:|:-:|
| 1 | 1000 | 1024 |
| 2 | 1000 | 1024 |
| 3 | 1000 | 1024 |
| 4 | 1000 | 1024 |
| 5 | 500 | 524 |

1. 4500 ÷ 1000 = 4.5, so 5 packets are needed (the last has 500 bytes).
2. Each packet adds 20 + 4 = 24 bytes.
3. Total sent = 4500 + 5 × 24 = 4620 bytes.
4. If the packets arrive in the order 2, 1, 3, 5, 4, the receiver uses the packet numbers to put them back in the order 1, 2, 3, 4, 5.
:::

:::worked-solution{title="Wasted capacity in a circuit"}
A telephone call lasts 10 minutes on a circuit that reserves 64 kbit/s. For 40% of the call nobody is speaking.

1. The call lasts 10 × 60 = 600 s.
2. Capacity reserved = 64 × 600 = 38 400 kbit.
3. Capacity not used during silence = 40% of 38 400 = 15 360 kbit.
4. This reserved capacity could not be used by anyone else. In packet switching no packets are sent in silence, so the capacity is available to other users.
:::

## Routers and routing tables

A **router** reads the destination address in each packet and decides where to send it next using a **routing table**. The table lists networks and the next hop towards each, and a default route for all other addresses.

| Destination network | Next hop |
|---|---|
| 172.16.8.0/24 | Router B |
| 192.168.40.0/24 | Router C |
| 10.0.0.0/8 | Router D |
| Anything else | Default gateway |

A packet for `172.16.8.9` matches the first row and is sent to Router B. A packet for `8.8.8.8` matches no row and goes to the default gateway.

Each packet has a **time-to-live (TTL)** value. Every router reduces it by 1, and a packet whose TTL reaches 0 is discarded. This stops packets from circulating forever if there is a routing error. The number of hops is how many routers a packet passes through.

The routers share information about the network, so the tables are updated if a link fails (the protocols RIP and OSPF, in a later lesson, do this).

:::example{title="Crossing the internet"}
Chipo in Bulawayo opens a web page stored in another country. Her request is divided into packets. Each goes through her school router, her ISP's routers and several routers belonging to other companies before reaching the server. If a cable under the sea is damaged, routers send the packets another way, and Chipo sees only a slight delay. A circuit-switched connection would have been cut.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (A Level, Paper 3). ZIMSEC studies how routers choose routes in the lesson on RIP and OSPF. For Cambridge learn the differences in the table above and be able to describe the header, payload and trailer of a packet.
:::

## Common mistakes

:::mistake{title="Saying that all packets take the same route"}
Packets of one message can be sent by different routes, which is why they may arrive out of order.
:::

:::mistake{title="Saying that circuit switching is not used any more"}
The idea of a reserved path is still used for traditional telephone calls and some dedicated lines. Say that it is used for calls on the telephone network.
:::

:::mistake{title="Confusing the header and the payload"}
The header holds control information (addresses, packet number, TTL). The payload is the data being carried.
:::

:::mistake{title="Saying that the router reassembles the message"}
Reassembly is done at the destination. A router only forwards packets.
:::

## Exam tips

:::exam-tip
"**Describe** packet switching": the message is split into packets with header, payload and trailer; each is routed separately by routers using the destination address; they may arrive out of order and are reassembled at the destination.
:::

:::exam-tip
"**Compare**" circuit and packet switching in matching pairs: path, bandwidth, delay, order, efficiency, effect of failure. Do not just list features of each.
:::

:::exam-tip
In calculations of packets, divide the message by the payload size and round up, then add the header and trailer to every packet.
:::

## Summary

:::summary
- Circuit switching sets up a dedicated path before communication and reserves its bandwidth until the end; it gives steady, in-order delivery but wastes capacity when idle (telephone calls).
- Packet switching divides a message into packets with a header, payload and trailer; each is routed independently and reassembled in order at the destination.
- Packet switching uses links efficiently and can route around failures, but packets can arrive late, out of order or be lost, and headers add extra data.
- A router reads the destination address, consults its routing table and forwards the packet to the next hop; a TTL value stops packets circulating for ever.
- The internet uses packet switching; the traditional telephone network uses circuit switching.
:::
