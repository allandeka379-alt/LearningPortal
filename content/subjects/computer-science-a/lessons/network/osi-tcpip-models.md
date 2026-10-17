---
{
  "key": "network.osi-tcpip-models",
  "title": "The OSI model and the TCP/IP protocol stack",
  "summary": "Why protocols are layered, the four layers of the TCP/IP stack and what each does as a message passes between hosts, encapsulation into segments, packets and frames, the seven OSI layers, and how the two models map to each other and compare.",
  "concepts": ["acs.network.osi-tcpip-models"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

When Rudo in Harare sends a photo to Farai in Mutare, thousands of different pieces of hardware and software take part: her messaging app, the operating system, the phone's wireless chip, a router at the ISP, optical fibres, and the same chain in reverse at Farai's end. These pieces were made by different companies. They work together because they follow agreed rules called **protocols**.

Protocols are arranged in **layers**. Each layer does one job and relies on the layer below it, so the designer of a messaging app need not know how radio signals work. This lesson describes the TCP/IP stack (four layers) and the OSI model (seven layers), how data is wrapped as it moves down the layers, and how the two models compare. You should already know what an IP address and a MAC address are.

## Key definitions

:::definition{term="Protocol"}
A set of rules that two devices follow to communicate, for example the format of messages, the order in which they are sent and how errors are handled.
:::

:::definition{term="Protocol stack (suite)"}
A set of protocols organised in layers, in which each layer uses the services of the layer below it and provides services to the layer above.
:::

:::definition{term="Encapsulation"}
The process in which each layer adds its own header (and sometimes a trailer) to the data received from the layer above before passing it down.
:::

## Why use layers

- Each layer has one job, so it is simpler to design, test and replace without changing the others (the same web browser works over cable, WiFi or fibre).
- Different manufacturers can build hardware and software that work together, because the rules between layers are standard.
- Faults can be traced to the layer where they happen.

## The four TCP/IP layers

| Layer | Purpose | Examples |
|---|---|---|
| **Application** | Provides network services to programs: the rules for requesting a web page, sending email or looking up a name | HTTP, HTTPS, SMTP, FTP, DNS |
| **Transport** | Delivers data between the correct programs on the two hosts using port numbers. TCP splits data into numbered segments, checks that all arrive, resends lost ones and puts them in order; UDP is faster and does not guarantee delivery | TCP, UDP |
| **Internet** | Gives each packet the source and destination IP addresses and routes it across networks | IP, routers |
| **Link** | Sends frames across one physical link using the MAC addresses of the devices at the two ends; includes the hardware and the medium | Ethernet, WiFi, network card, switch |

**Encapsulation.** As the message is passed down the sender's stack, each layer wraps it:

1. The application layer produces **data**.
2. The transport layer breaks it into pieces and adds a header with the source and destination **port** numbers and sequence number: a **segment**.
3. The internet layer adds a header with the source and destination **IP addresses**: a **packet**.
4. The link layer adds a header with the **MAC addresses** and a trailer for error checking: a **frame**, sent as bits.

![Encapsulation of the first 1460-byte piece of a file: TCP adds a 20-byte header (segment 1480 bytes), IP adds 20 bytes (packet 1500 bytes) and the link layer adds a 14-byte header and 4-byte trailer (frame 1518 bytes)](media:diagrams/network-encapsulation.png "Figure: each layer wraps the data in its own header, giving a segment, a packet and a frame")

At the receiving host the process is reversed (**decapsulation**): each layer strips its header and passes the contents up. A router on the way only goes as far up as the internet layer to read the destination IP address.

Typical minimum header sizes are 20 bytes for TCP, 20 bytes for IPv4 and 14 bytes of header plus a 4-byte trailer for an Ethernet frame.

:::worked-solution{title="Encapsulating a file"}
An application sends 4000 bytes of data. TCP carries at most 1460 bytes of data in each segment. Use the header sizes above.

| Segment | Data (bytes) | Segment (bytes) | Packet (bytes) | Frame (bytes) |
|:-:|:-:|:-:|:-:|:-:|
| 1 | 1460 | 1480 | 1500 | 1518 |
| 2 | 1460 | 1480 | 1500 | 1518 |
| 3 | 1080 | 1100 | 1120 | 1138 |

1. 4000 ÷ 1460 = 2.74, so 3 segments are needed (1460 + 1460 + 1080 = 4000).
2. The TCP header adds 20 bytes, the IP header another 20 bytes, and the frame header and trailer 18 bytes. So 58 bytes are added to each piece.
3. Total sent = 1518 + 1518 + 1138 = 4174 bytes.
4. Overhead = 4174 − 4000 = 174 bytes, which is 4.2% of what is sent.
:::

## The seven OSI layers

The **OSI model** (Open Systems Interconnection) is a reference model that divides networking into seven layers. It describes what each layer does without being tied to one set of protocols.

| Number | Layer | Function |
|:-:|---|---|
| 7 | Application | The interface between the network and the user's application programs |
| 6 | Presentation | Formats the data so both ends understand it: character codes, compression and encryption |
| 5 | Session | Starts, manages and ends a conversation between two programs, and keeps the exchange in step |
| 4 | Transport | End-to-end delivery between programs: segments, ports, error recovery |
| 3 | Network | Logical (IP) addressing and routing of packets between networks |
| 2 | Data link | Framing, MAC addressing and error detection on one link |
| 1 | Physical | Sends the bits as electrical, light or radio signals over the medium |

A common way to remember the order, from the top, is Application, Presentation, Session, Transport, Network, Data link, Physical.

## Mapping OSI to TCP/IP

| OSI layers | TCP/IP layer |
|---|---|
| 7 Application, 6 Presentation, 5 Session | Application |
| 4 Transport | Transport |
| 3 Network | Internet |
| 2 Data link, 1 Physical | Link |

| | OSI model | TCP/IP |
|---|---|---|
| Layers | 7 | 4 |
| Origin | A reference model, developed as a standard | The protocols that the internet actually uses |
| Use | Teaching and describing networks | The working protocol suite |
| Application services | Split into three layers | In one layer |

:::worked-solution{title="A web page request through the layers"}
Tatenda opens a web page in Gweru. Identify the layer that does each job.

1. The browser forms an HTTP request: **application layer** (OSI 7).
2. The request is split, numbered and given port 443 for the web server: **transport layer** (OSI 4).
3. The destination IP address of the server is added: **internet layer** (OSI 3).
4. A frame with the MAC address of the next device (the router) is made and sent as signals over WiFi: **link layer** (OSI 2 and 1).
5. At each router on the way the frame is unpacked as far as the packet, a new frame is made for the next link, and the packet is forwarded. At the server the headers are removed in reverse order.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
ZIMSEC requires the seven OSI layers and the TCP/IP model, with a mapping between them. Cambridge requires the four TCP/IP layers (Application, Transport, Internet, Link) and the idea of a protocol stack as an A Level topic; the seven OSI layers are ZIMSEC detail. Both examine the purpose of each layer.
:::

## Common mistakes

:::mistake{title="Mixing up the order of the layers"}
In TCP/IP, from the top: Application, Transport, Internet, Link. In OSI, from the top: Application, Presentation, Session, Transport, Network, Data link, Physical.
:::

:::mistake{title="Saying that a router works at the application layer"}
A router works up to the internet (network) layer. It reads IP addresses but does not look at the application data.
:::

:::mistake{title="Confusing port numbers with IP addresses"}
The IP address identifies the host. The port number identifies the program (service) on that host.
:::

:::mistake{title="Treating the stack as separate devices"}
The layers are not separate machines. They are parts of the software and hardware of each host, each doing its own job.
:::

## Exam tips

:::exam-tip
"**State the purpose**" of a layer: give the job and the key item it handles (transport: ports and segments; internet: IP addresses and routing; link: MAC addresses and frames; physical: bits as signals).
:::

:::exam-tip
In a mapping question (ZIMSEC Paper 1 and 2), list the OSI layers with their numbers, then the TCP/IP layer that holds them: layers 5, 6 and 7 together map to Application; 1 and 2 together map to Link.
:::

:::exam-tip
"**Describe** how data is sent": go down the sender's layers (adding headers), across the network (routers read the IP address), and up the receiver's layers (removing headers). Use segment, packet and frame correctly.
:::

## Summary

:::summary
- A protocol stack splits networking into layers, each with one job, so layers can be changed and devices from many makers work together.
- TCP/IP layers: Application, Transport (ports, segments, TCP and UDP), Internet (IP addresses, packets, routing) and Link (MAC addresses, frames, the medium).
- Encapsulation adds a header at each layer on the way down: data, segment, packet, frame; the receiver removes them in reverse.
- OSI layers: 7 Application, 6 Presentation, 5 Session, 4 Transport, 3 Network, 2 Data link, 1 Physical.
- OSI layers 5 to 7 map to TCP/IP Application, 4 to Transport, 3 to Internet and 1 to 2 to Link; OSI is a reference model, TCP/IP is what the internet uses.
:::
