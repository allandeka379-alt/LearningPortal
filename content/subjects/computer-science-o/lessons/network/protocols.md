---
{
  "key": "network.protocols",
  "title": "Network protocols, TCP/IP and the OSI model",
  "summary": "What a protocol is and why networks need protocols; the layers of the TCP/IP protocol suite; the seven layers of the OSI model in outline; and the common protocols HTTP, HTTPS, FTP, SMTP, POP3 and IMAP and what each does.",
  "concepts": ["comp.network.protocols"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

When Sipho in Bulawayo emails his cousin in London, the message passes through computers made by different companies, running different operating systems, joined by copper, fibre and radio links owned by many organisations. It still arrives intact, because every device involved follows the same agreed rules for communication. These rules are called **protocols**.

ZIMSEC Form 4 asks you to explain network protocols, including TCP/IP and the OSI model. Paper 2 questions typically ask you to define a protocol, name the protocol used for a task (sending email, transferring files, viewing web pages securely) or describe what happens at a layer.

## Key definitions

:::definition{term="Protocol"}
A set of rules that governs how data is transmitted between devices on a network, covering the format of the data, how it is addressed, how errors are handled and the order of messages.
:::

:::definition{term="Protocol suite (stack)"}
A group of protocols that work together, each layer doing one job and passing the data to the layer above or below it.
:::

:::definition{term="TCP/IP"}
The protocol suite used by the internet, named after its two main protocols: the Transmission Control Protocol and the Internet Protocol.
:::

:::definition{term="OSI model"}
The Open Systems Interconnection reference model: a seven-layer model that describes the stages of network communication, used to design and explain protocols.
:::

## Why protocols are needed

- Devices from **different manufacturers**, with different hardware and software, can communicate because they follow the same rules.
- Both ends agree on the **format** of the data (how it is split into packets, what goes in each header).
- They agree on **addressing**, so data reaches the right device.
- They agree on **error checking** and what to do if data is lost or damaged.
- They agree on the **speed and order** of transmission (who sends when, how the end of a message is signalled).

Without agreed protocols, a message sent from one system would be meaningless to another, just as two people cannot talk if each speaks a language the other does not know.

## The TCP/IP protocol suite

TCP/IP is organised in four layers. When data is sent, it passes **down** the layers at the sender, each layer adding its own information (a header), across the network, and then **up** the layers at the receiver, each layer removing its header.

| Layer | Job | Examples of protocols |
|:--|:--|:--|
| 4. Application | Provides network services to applications, such as web browsing and email | HTTP, HTTPS, FTP, SMTP, POP3, IMAP |
| 3. Transport | Splits data into packets, numbers them, checks they all arrive and resends lost ones; reassembles them in order | TCP |
| 2. Internet (network) | Adds source and destination IP addresses and routes packets across networks | IP |
| 1. Link (network access) | Sends the data as signals over the physical medium within the local network, using MAC addresses | Ethernet, Wi-Fi |

**TCP** makes communication reliable: the receiver acknowledges the packets it receives, and missing packets are sent again. **IP** deals with addressing and routing: each packet is delivered independently, possibly by a different route.

:::worked-solution[Sending a web page request through the TCP/IP layers]
Tatenda types the address of a school's website into a browser. Describe what each layer does at his computer.

1. **Application layer**: the browser forms an HTTP (or HTTPS) request for the page.
2. **Transport layer**: TCP splits the request into packets, numbers each one and adds port information so the reply reaches the browser.
3. **Internet layer**: IP adds the source IP address (Tatenda's computer) and the destination IP address (the web server) to each packet.
4. **Link layer**: the NIC sends the packets as signals over the cable or Wi-Fi to the router.
5. At the web server the packets go **up** the layers: the link layer receives them, IP checks the address, TCP reassembles them in order and requests any missing ones, and the web server software reads the HTTP request.
:::

## The OSI model

The OSI model has seven layers. You need them in outline; a common way to remember them from layer 7 down is "All People Seem To Need Data Processing".

| Layer | Name | Outline of its job |
|:-:|:--|:--|
| 7 | Application | Network services for the user's programs (web, email, file transfer) |
| 6 | Presentation | Translates data formats, and handles encryption and compression |
| 5 | Session | Sets up, manages and ends a communication session between two devices |
| 4 | Transport | Reliable delivery: splits data into segments, checks for errors and lost data |
| 3 | Network | Logical addressing (IP addresses) and routing between networks |
| 2 | Data link | Physical (MAC) addressing on the local network; detects errors in frames |
| 1 | Physical | Sends raw bits as electrical, light or radio signals over the medium |

The TCP/IP application layer covers OSI layers 5 to 7, and the TCP/IP link layer covers OSI layers 1 and 2. Devices can be placed on the model too: a hub works at the physical layer, a switch at the data link layer and a router at the network layer.

## Common application protocols

| Protocol | Full name | What it does |
|:--|:--|:--|
| HTTP | Hypertext Transfer Protocol | Transfers web pages from a web server to a browser |
| HTTPS | HTTP Secure | HTTP with the data encrypted (using SSL/TLS), for logins and payments |
| FTP | File Transfer Protocol | Uploads and downloads files between computers, for example a web designer uploading a site to a server |
| SMTP | Simple Mail Transfer Protocol | Sends email from a client to a mail server and between mail servers |
| POP3 | Post Office Protocol 3 | Downloads email from the server to one device, usually deleting it from the server |
| IMAP | Internet Message Access Protocol | Reads email while it stays on the server, so it stays in step on several devices |

:::example
**Which protocol?** Chipo runs an online clothing shop from Mutare.

- She uploads new product pages to her web host: **FTP**.
- Customers browse the shop: **HTTP**; they log in and pay: **HTTPS**, so card and login details are encrypted.
- Order confirmations are sent to customers by email: **SMTP**.
- Chipo reads her business email on both her phone and her laptop, and wants each to show the same messages: **IMAP**, because the mail stays on the server. With POP3, a message downloaded to the laptop might not appear on the phone.
:::

## Common mistakes

:::mistake{title="Calling a protocol a piece of hardware"}
A protocol is a set of **rules**. Hardware such as routers and NICs follows protocols but is not a protocol.
:::

:::mistake{title="Saying SMTP is used to read email"}
SMTP **sends** email. POP3 and IMAP are used to **receive** (read) it.
:::

:::mistake{title="Mixing up TCP and IP"}
TCP splits data into packets and makes sure they all arrive in order; IP addresses and routes each packet.
:::

## Exam tips

:::exam-tip
When defining a protocol, say "a set of rules" **and** give an example of what the rules cover: data format, addressing, error checking or the speed of transmission.
:::

:::exam-tip
Learn the four TCP/IP layers in order (application, transport, internet, link) and the seven OSI layers in order. A question may give a job and ask which layer does it.
:::

## Summary

:::summary
- A protocol is a set of rules for communication covering format, addressing, error checking and timing; it lets different devices communicate.
- TCP/IP has four layers: application, transport (TCP), internet (IP) and link.
- The OSI model has seven layers: physical, data link, network, transport, session, presentation and application.
- HTTP and HTTPS transfer web pages (HTTPS encrypted); FTP transfers files.
- SMTP sends email; POP3 downloads it to one device; IMAP keeps it on the server for several devices.
:::
