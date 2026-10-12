---
{
  "key": "network.internet-hardware-streaming",
  "title": "The internet, the World Wide Web and streaming",
  "summary": "The difference between the internet and the World Wide Web, the hardware that gives internet access (modem, PSTN, dedicated lines, the cell phone network and the ISP), real-time and on-demand bit streaming, and calculations of download time from file size and bit rate.",
  "concepts": ["acs.network.internet-hardware-streaming"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

Tatenda in Mutare opens a web page, sends a WhatsApp-style message, and watches a recorded lesson, all over the same connection. People often say "the internet" for all of these, but not everything is the World Wide Web, and the way the lesson reaches the screen depends on the connection and on how fast bits arrive.

This lesson separates the **internet** from the **World Wide Web**, describes the hardware used to get on to the internet, and explains **bit streaming** and why the **bit rate** matters. You should already know what a network is and the idea of a data rate in bits per second.

## Key definitions

:::definition{term="Internet"}
A worldwide network of networks: the cables, routers, servers and other hardware that join millions of smaller networks, together with the protocols that let them exchange data.
:::

:::definition{term="World Wide Web (WWW)"}
A collection of web pages and other resources, identified by URLs and transferred using HTTP, that are accessed with a web browser. It is one service that runs on the internet.
:::

:::definition{term="Internet service provider (ISP)"}
A company that provides customers with a connection to the internet, usually giving each connection an IP address and often other services such as email.
:::

:::definition{term="Bit rate"}
The number of bits transmitted (or consumed) each second, measured in bits per second (bit/s), megabits per second (Mbit/s) and so on.
:::

## The internet and the World Wide Web

The internet is the infrastructure. The web is a service that uses it. Email, file transfer, online games, voice calls and the web all travel over the internet, and only web pages fetched by a browser using HTTP are part of the web.

| Internet | World Wide Web |
|---|---|
| A network of networks, made of hardware and cables | A collection of web pages and resources |
| Carries many services | One of the services carried |
| Joined by routers and the protocols that carry packets | Uses URLs, HTTP and web browsers |
| Existed before the web | Built on top of the internet |

## Hardware for internet access

- **Modem.** Short for modulator-demodulator. It converts digital data from a computer into a form that can travel over a telephone line (modulation) and converts the received signal back to digital (demodulation). A broadband modem or a router with a modem built in is used for lines such as ADSL.
- **PSTN (public switched telephone network).** The telephone network that links homes and businesses with copper lines and exchanges. A modem lets the PSTN carry data as well as voice.
- **Dedicated (leased) line.** A permanent connection rented from a carrier, used by a business or school that needs a constant, reliable and fast connection. It does not share its capacity with other customers, but it costs more.
- **Cell phone network.** A phone or a mobile router uses radio waves to connect to the nearest mast, which is linked to the carrier's network and then to the internet. It gives access almost anywhere there is a signal, with a speed that depends on the signal and the number of users.
- **Router.** Connects the local network to the ISP and forwards packets.
- **ISP.** The provider through which the connection is made. Without an ISP, a customer cannot reach the rest of the internet.

:::example{title="Choosing a connection"}
A secondary school near Gweru needs the whole computer room to reach the internet all day. A dial-up connection through a modem is too slow and ties up the telephone line. A dedicated line is fast and always available but is costly. A mobile router using the cell phone network is cheaper and quick to set up where there is a good signal. The school compares speed, reliability and cost against its budget, and the answer depends on all three.
:::

## Bit streaming

**Streaming** sends audio or video as a continuous flow of bits, which the receiver plays while it is still arriving instead of waiting for the whole file. The data is held briefly in a **buffer** so that short delays do not make the playback stutter.

**Real-time streaming.** Content is captured and sent as it happens, such as a live football match or a live lesson. There is no complete file stored in advance, so the viewer cannot skip ahead, and a short delay to the playback is added so that the buffer can fill.

**On-demand streaming.** A stored file is sent when the user asks for it, for example a recorded lecture or a music track. The viewer can pause, rewind and skip, and the server can send ahead of the point being played.

| | Real-time | On-demand |
|---|---|---|
| Source | Captured live | Stored file |
| Pause or rewind | Not usually possible | Possible |
| Usual examples | Live match, live lesson | Recorded lesson, music |
| Needs | A constant, reliable bit rate | A bit rate at or above the file's playback rate |

The **bit rate** at which the data arrives must be at least the bit rate at which the content is played. If it is lower, the buffer empties and playback stops to **buffer**. A higher video bit rate gives a better picture (resolution and quality) but needs a faster connection. A connection's speed is its **broadband speed**, the rate at which data can be sent and received.

## Download time and streaming calculations

Download time in seconds = size in bits ÷ bit rate in bits per second. Sizes are in bytes, so multiply by 8 to get bits. In these calculations transmission rates are decimal (1 Mbit/s = 1 000 000 bit/s) and a megabyte is 1 000 000 bytes.

:::worked-solution{title="Download time"}
A recorded lesson file is 90 MB. It is downloaded on a connection with a rate of 12 Mbit/s.

1. Size in megabits = 90 × 8 = 720 Mbit.
2. Time = 720 ÷ 12 = 60 seconds.
3. The file takes 60 s, or 1 minute, to download.
:::

| Rate (Mbit/s) | Time to download 90 MB (s) |
|:-:|:-:|
| 2 | 360 |
| 4 | 180 |
| 6 | 120 |
| 12 | 60 |
| 18 | 40 |

Doubling the rate halves the time.

:::worked-solution{title="Data used by a stream"}
A video is streamed at 2.5 Mbit/s for one hour.

1. One hour = 3600 s.
2. Bits = 2.5 × 3600 = 9000 Mbit.
3. In megabytes = 9000 ÷ 8 = 1125 MB.
:::

:::worked-solution{title="Will the video stall?"}
A 10-minute video is streamed at 4 Mbit/s but the connection provides only 3 Mbit/s.

1. The video lasts 10 × 60 = 600 s, so it needs 4 × 600 = 2400 Mbit.
2. At 3 Mbit/s the data takes 2400 ÷ 3 = 800 s to arrive.
3. The data arrives 800 − 600 = 200 s slower than it is played, so the video will stall repeatedly.
4. To avoid stalling, the player would have to buffer for about 200 s before starting, or the video would have to be played at a lower bit rate.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
This concept is Cambridge only (AS Level, Paper 1). Be ready to define the internet and the WWW, name hardware and the purpose of each, compare real-time and on-demand streaming, and do a simple time calculation. State your assumption when converting between bytes and bits.
:::

## Common mistakes

:::mistake{title="Using internet and World Wide Web as the same thing"}
The internet is the network; the web is a service that runs on it. Email is on the internet but is not part of the web.
:::

:::mistake{title="Forgetting to convert bytes to bits"}
File sizes are in bytes but rates are in bits per second. Multiply the size by 8 before dividing by the rate.
:::

:::mistake{title="Mixing megabits and megabytes"}
Mbit/s is megabits per second; MB is megabytes. 12 Mbit/s moves 1.5 MB each second.
:::

:::mistake{title="Saying that a modem connects to the ISP"}
A modem converts between digital data and the signal on the line. The connection through the line reaches the ISP, but the modem is the conversion device.
:::

## Exam tips

:::exam-tip
"**Describe the difference** between the internet and the WWW": give the internet as the network of networks (infrastructure) and the WWW as a collection of pages accessed by a browser using HTTP, which is one service on the internet.
:::

:::exam-tip
In a download-time question, write the steps: bytes × 8 for bits, divide by the rate, state the unit. The numbers in the paper are chosen to divide evenly, so check your answer is sensible.
:::

:::exam-tip
For streaming, link a low bit rate or a slow connection to buffering, and a higher bit rate to better quality but a need for a faster connection. Use the words buffer, bit rate and resolution.
:::

## Summary

:::summary
- The internet is the worldwide network of networks; the WWW is a service on it, made of pages fetched by browsers using HTTP.
- A modem converts between digital data and the signal on a telephone line (PSTN); a dedicated line is a permanent leased connection; the cell phone network gives wireless access; the ISP provides the connection.
- Real-time streaming sends live content that cannot normally be paused; on-demand streaming sends a stored file that can be paused and skipped.
- Streaming needs a bit rate at least equal to the playback rate, or the buffer empties and the video stalls.
- Download time = (size in bytes × 8) ÷ bit rate in bit/s.
:::
