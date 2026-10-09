---
{
  "key": "transmission.packets",
  "title": "Packets and packet switching",
  "summary": "Why data is split into packets before it is sent across a network, what the header, payload and trailer of a packet contain, and how packet switching sends packets by different routes and reassembles them at the destination.",
  "concepts": ["comp.transmission.packets"],
  "estimatedMinutes": 25,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

When Rudo in Bulawayo sends a photo to her cousin in Harare, the photo does not travel as one large block. Her phone cuts it into hundreds of small pieces called **packets**. Each packet finds its own way across the internet, passing through routers in different towns, and her cousin's phone puts the pieces back together. The photo appears complete, and neither of them notices the journey.

Packets are how almost all data crosses the internet: web pages, voice notes, video calls and emails. In the Cambridge Paper 1 you must describe the structure of a packet and explain the steps of packet switching. These are reliable marks if you learn the correct terms.

## Key definitions

:::definition{term="Packet"}
A small unit of data sent across a network. A large file or message is broken into many packets, each sent separately.
:::

:::definition{term="Packet header"}
The first part of a packet. It holds the destination address, the originator's (sender's) address and the packet number.
:::

:::definition{term="Payload"}
The part of a packet that carries the actual data: one piece of the file or message being sent.
:::

:::definition{term="Trailer"}
The last part of a packet. It marks the end of the packet and usually holds error-checking data, such as a checksum value.
:::

:::definition{term="Packet switching"}
A method of sending data in which a message is broken into packets that travel independently across the network, possibly by different routes, and are reassembled in the correct order at the destination.
:::

:::definition{term="Router"}
A network device that reads the destination address in a packet's header and decides which way to send the packet next.
:::

## Why data is broken into packets

- **Sharing the network.** Small packets from many users can be interleaved on the same cables, so one large download does not block everyone else.
- **Faster recovery from errors.** If a packet is damaged, only that small packet needs to be sent again, not the whole file.
- **Avoiding busy or broken links.** Each packet can take whichever route is free at that moment, so traffic flows around congestion and faults.

## The structure of a packet

| Part | What it contains | Why it is needed |
|:--|:--|:--|
| Header | Destination address; originator's address; packet number | Routers use the destination address to forward the packet; the receiver uses the packet number to put packets in order and the originator's address to reply or request a resend |
| Payload | The actual data (one piece of the message) | This is what the user wants to send |
| Trailer | A marker for the end of the packet; error-checking data such as a checksum | The receiver can check that the packet arrived without errors |

The addresses in the header are **IP addresses**. The header may also hold the total number of packets in the message, so the receiver knows when the last one has arrived.

## Packet switching step by step

1. The sending device breaks the data into packets and gives each a **header** (with the packet number and both addresses) and a **trailer**.
2. Each packet is sent onto the network separately.
3. At every **router**, the destination address is read and the router chooses the next hop. It picks the best route available at that moment, so packets from the same message **may take different routes**.
4. Because routes differ in length and traffic, packets **may arrive out of order**, and some may be delayed or lost.
5. The receiving device checks each packet (using the trailer) and waits for all the packets to arrive.
6. Once the last packet has arrived, the packets are **reordered using their packet numbers** and the payloads are joined to rebuild the original data. Any missing or damaged packet can be requested again.

## Worked examples

:::worked-solution[How many packets?]
A school in Gweru uploads a 3 000-byte timetable file. In this network each payload carries at most 1 000 bytes.

1. Number of packets = file size ÷ payload size = $3\,000 \div 1\,000 = 3$.
2. Each of the three packets has its own header, with packet numbers 1, 2 and 3, the school's address as originator and the server's address as destination.
3. If the size does not divide exactly, one extra packet carries the remainder, so always round **up**.
:::

:::example
**Packets arriving out of order.** Farai streams a lesson video. Packets 1, 2 and 4 travel through a router in Masvingo, but packet 3 is sent via Mutare because the Masvingo link became busy. Packet 3 arrives last. Farai's device does not play the packets in the order they arrived; it uses the packet numbers in the headers to put them back as 1, 2, 3, 4 before rebuilding the data.

The example shows why the **packet number** is essential: without it, the receiver could not reassemble data that arrived out of order.
:::

:::example
**A lost packet.** On a long journey a packet may be dropped by a router that is overloaded. The receiver notices that one packet number is missing, or the error check in the trailer of a damaged packet fails. It can then ask the sender to resend just that packet, using the originator's address from the header. This is far quicker than resending the whole file.
:::

## Advantages and disadvantages of packet switching

| Advantages | Disadvantages |
|:--|:--|
| Packets avoid busy or broken routes, so data still arrives if one link fails | Packets can arrive out of order and must be reassembled, which takes processing time |
| Only lost or damaged packets need resending | Packets can be delayed or lost when the network is busy |
| Many users share the same lines efficiently | Real-time data (calls, video) can stutter if packets arrive late |

## Common mistakes

:::mistake{title="Putting the data in the header"}
The header holds addresses and the packet number. The data itself is the **payload**.
:::

:::mistake{title="Saying all packets follow the same route"}
In packet switching each packet is routed separately, so packets of one message may take different routes.
:::

:::mistake{title="Saying packets are put in order by the router"}
Routers only forward packets. Reordering happens at the **destination**, using the packet numbers, once the last packet has arrived.
:::

## Exam tips

:::exam-tip
For "**describe** the structure of a packet", name all three parts and give one item for each: header (destination address, originator's address, packet number), payload (the data), trailer (error check / end of packet).
:::

:::exam-tip
For "**describe** packet switching", use a sequence: data broken into packets, each packet sent separately, routers choose the route, packets may take different routes and arrive out of order, packets reordered using packet numbers when the last one arrives.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Packets and packet switching are named in the Cambridge 0478 syllabus (topic 2.1). The ZIMSEC syllabus does not list them, but they help explain how networks and the internet move data.
:::

## Summary

:::summary
- Data is broken into packets so networks can be shared, errors fixed quickly and busy links avoided.
- A packet has a header (destination address, originator's address, packet number), a payload (the data) and a trailer (end marker and error check).
- Routers read the destination address and send each packet by the best route at that moment.
- Packets may take different routes and arrive out of order; the receiver reorders them using packet numbers.
- Only lost or damaged packets need to be resent.
:::
