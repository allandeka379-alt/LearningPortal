---
{
  "key": "network.application-protocols",
  "title": "Application-layer protocols: HTTP, FTP, SMTP, POP3, IMAP and BitTorrent",
  "summary": "The purpose of HTTP and HTTPS, FTP, SMTP, POP3 and IMAP, how an email travels from sender to recipient, how BitTorrent shares files between peers using a tracker, a swarm and pieces, and how to choose a protocol for a task.",
  "concepts": ["acs.network.application-protocols"],
  "estimatedMinutes": 50,
  "level": "core",
  "freePreview": true
}
---
## Introduction

When you open a web page, send an email, download a large file or fetch an app update, your device follows a set of rules that both ends understand. These are **application-layer protocols**: they sit at the top of the TCP/IP stack and define how a program asks for a service and how the other side replies. Different jobs need different rules, so there are different protocols for fetching web pages, for moving files, for sending email and for reading it.

This lesson describes HTTP and HTTPS, FTP, SMTP, POP3 and IMAP, follows an email from one person to another, explains how the BitTorrent protocol shares a large file between many computers, and shows how to choose the right protocol for a task. You should already know the TCP/IP layers and the idea of a client and a server.

## Key definitions

:::definition{term="Application-layer protocol"}
A protocol in the top layer of the TCP/IP stack that defines the messages exchanged between a client program and a server program for a particular service, such as fetching web pages or sending email.
:::

:::definition{term="Peer-to-peer file sharing"}
A method of distributing a file in which the computers taking part (peers) download pieces from each other and also upload pieces to each other, instead of every computer downloading from one server.
:::

## The protocols

| Protocol | Purpose | Typical port |
|---|---|---|
| **HTTP** (Hypertext Transfer Protocol) | A client (browser) requests a web page or other resource and a web server sends it back | 80 |
| **HTTPS** | HTTP carried over an encrypted TLS connection, so that data cannot be read or changed on the way | 443 |
| **FTP** (File Transfer Protocol) | Transfers files between a client and a server; the user logs in and can upload, download and manage files on the server | 21 |
| **SMTP** (Simple Mail Transfer Protocol) | **Sends** email from a client to a mail server and **between** mail servers | 25 |
| **POP3** (Post Office Protocol) | A client **downloads** email from its mailbox on the server, normally removing it from the server | 110 |
| **IMAP** (Internet Message Access Protocol) | A client **reads and manages** email while it stays on the server, so several devices see the same mailbox | 143 |

**HTTP and HTTPS.** HTTP works by request and response. The browser sends a request that names the resource and the method (such as getting a page), and the server returns a status and the content. HTTP does not keep information about the earlier requests. HTTPS adds encryption, so it is used wherever passwords or payments are sent, such as online banking.

**FTP.** Suited to moving large files or many files, for example a web designer uploading a site to a server, or a school downloading a software package. Plain FTP sends the password unencrypted, so secure versions are used where privacy matters.

## How an email travels

SMTP pushes email forward; POP3 and IMAP let the recipient pull it from the server.

| Stage | What happens | Protocol |
|:-:|---|---|
| 1 | Tendai writes a message in his email program and sends it to his mail server | SMTP |
| 2 | Tendai's mail server finds the recipient's mail server (using DNS) and sends the message to it | SMTP |
| 3 | The message waits in Nyasha's mailbox on her mail server | |
| 4 | Nyasha's email program fetches the message from the server | POP3 or IMAP |

:::worked-solution{title="POP3 against IMAP"}
Nyasha reads her email on a laptop at school and on her phone at home.

1. With **POP3** the laptop downloads the message and normally deletes it from the server. The phone would find the mailbox empty and could not see the message.
2. With **IMAP** the message stays on the server. The laptop and phone both show it, and if she deletes it or marks it as read on one device, the other device is updated.
3. Nyasha should use **IMAP**. POP3 suits a single computer with limited storage on the server, because messages are kept on the device.
:::

## BitTorrent

BitTorrent distributes large files without every user downloading from one server.

- A **.torrent** file (or a magnet link) describes the file: its name, size, the size and checks of its **pieces**, and the address of a **tracker**.
- The file is divided into **pieces**. A user's torrent program asks the **tracker**, a server that keeps a list of the peers, for the addresses of others who share the file.
- The group of peers sharing the same file is the **swarm**. A **seeder** has the complete file and uploads it. A **leecher** is still downloading and has only some pieces, but it uploads those pieces to other peers.
- A client downloads different pieces from different peers at the same time, checks each piece against its check value, and assembles the file. As soon as a piece has been downloaded it is offered to others.

**Advantages.** Downloads are fast when many peers are sharing, the load on the original server is low, and the file can still be fetched if one peer disappears. **Disadvantages.** Speed depends on the number of seeders. Peers can see each other's IP addresses. Files from unknown sources may contain malware. It is also widely used to share copyright files without permission, which is illegal.

**Legal and ethical uses.** Distributing free and open-source software, operating-system images, public-domain material and large datasets, and files that the owner has allowed to be shared.

:::worked-solution{title="How BitTorrent shortens a download"}
A school downloads a 600 MB file of teaching material. Take 1 MB = 1 000 000 bytes. The file is divided into pieces of 2 MB. Each connection supplies 4 Mbit/s.

1. Pieces = 600 ÷ 2 = 300 pieces.
2. File size in megabits = 600 × 8 = 4800 Mbit.
3. From a single server at 4 Mbit/s: 4800 ÷ 4 = 1200 s (20 minutes).
4. From three peers at 4 Mbit/s each, taking different pieces at the same time, the rate is 3 × 4 = 12 Mbit/s: 4800 ÷ 12 = 400 s (about 6.7 minutes).
5. Using several sources at once makes the download three times faster. The limit is then the school's own connection speed.
:::

## Choosing a protocol

| Task | Protocol | Reason |
|---|---|---|
| View a web page | HTTP or HTTPS | Request and response for web resources |
| Pay for goods or log in | HTTPS | The data is encrypted |
| Upload a website to a server | FTP | Designed for moving files to and from a server |
| Send an email | SMTP | Used to send mail to and between servers |
| Keep email on the server and read it on several devices | IMAP | Messages stay on the server |
| Download email to one computer | POP3 | Messages are fetched and stored locally |
| Share a very large file with many users | BitTorrent | Load is shared between peers |

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (A Level, Paper 3). Learn the purpose of each protocol, the order of SMTP, POP3 and IMAP in the delivery of email, and the BitTorrent terms tracker, swarm, seeder, leecher and piece. The port numbers above are standard; Cambridge asks mainly for the purpose, not the port.
:::

## Common mistakes

:::mistake{title="Saying that SMTP is used to receive email"}
SMTP sends email, from a client to a server and between servers. Receiving by the user is done with POP3 or IMAP.
:::

:::mistake{title="Confusing POP3 and IMAP"}
POP3 downloads the messages and usually removes them from the server. IMAP leaves them on the server and keeps all devices in step.
:::

:::mistake{title="Saying that BitTorrent is illegal"}
The protocol is legal. It is illegal to use it to share material without the owner's permission. Many legal uses exist.
:::

:::mistake{title="Using FTP as the protocol for web pages"}
Web pages are fetched with HTTP or HTTPS. FTP is for transferring files to and from a server.
:::

## Exam tips

:::exam-tip
"**Describe how an email is sent and received**": sender's client to the sender's server with SMTP; server to server with SMTP; recipient's client from the server with POP3 or IMAP. Name the protocol at each stage.
:::

:::exam-tip
For BitTorrent, use the terms: the file is split into pieces, a tracker gives peers' addresses, peers in a swarm download pieces from each other at the same time, seeders have the whole file, and leechers upload the pieces they already have.
:::

:::exam-tip
"**Justify the protocol**": name it, give the property that fits the task (encrypted, designed for files, leaves mail on the server) and relate it to the scenario.
:::

## Summary

:::summary
- HTTP fetches web pages by request and response; HTTPS does the same over an encrypted TLS connection.
- FTP transfers files between a client and a server; SMTP sends email; POP3 downloads email to one device; IMAP manages email on the server so that all devices see the same mailbox.
- An email goes client to server and server to server by SMTP, then the recipient collects it using POP3 or IMAP.
- BitTorrent splits a file into pieces, uses a tracker to find peers, and shares pieces between seeders and leechers in a swarm.
- BitTorrent is fast and spreads the load, but the speed depends on the swarm and it can be used to share files illegally.
:::
