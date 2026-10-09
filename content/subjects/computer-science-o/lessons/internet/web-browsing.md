---
{
  "key": "internet.web-browsing",
  "title": "The internet, the web, URLs, HTTP(S), browsers and DNS",
  "summary": "The difference between the internet and the world wide web, the parts of a URL, what HTTP and HTTPS do, the functions of a web browser, and how a web page is located, retrieved and displayed using DNS, IP addresses and a web server.",
  "concepts": ["comp.internet.web-browsing"],
  "estimatedMinutes": 35,
  "freePreview": true,
  "level": "core"
}
---
## Introduction

Thandeka types the address of her school's revision site into her phone's browser in Bulawayo. Less than a second later the page appears, although the server holding it may be in another city or another country. In that second, her phone has asked a directory for an address, sent a request across the internet and received a page of code that it turned into text, pictures and links.

This lesson explains each step. It also clears up a confusion that costs marks every year: the **internet** and the **world wide web** are not the same thing.

## Key definitions

:::definition{term="Internet"}
The worldwide infrastructure of interconnected networks: the cables, routers, servers and other hardware that link computers across the world.
:::

:::definition{term="World wide web (WWW)"}
The collection of websites and web pages that are stored on web servers and accessed using the internet.
:::

:::definition{term="Uniform resource locator (URL)"}
A text-based address for a web page or file. It can contain the protocol, the domain name and the path or file name of the page.
:::

:::definition{term="HTTP"}
Hypertext transfer protocol: the set of rules for requesting and sending web pages between a browser and a web server.
:::

:::definition{term="HTTPS"}
Hypertext transfer protocol secure: HTTP with the data encrypted (using SSL/TLS) so that it cannot be read if intercepted.
:::

:::definition{term="Web browser"}
Software whose main purpose is to request web pages, render the HTML they are written in, and display them to the user.
:::

:::definition{term="Domain name server (DNS)"}
A server that holds a directory of domain names and their matching IP addresses, and finds the IP address for a domain name when asked.
:::

## The internet and the world wide web

The **internet** is the hardware and the connections: like the roads of Zimbabwe. The **world wide web** is one service that runs on it: the web pages, like the shops you reach using the roads. Email, online games, video calls and file transfers also use the internet without being part of the web.

## The parts of a URL

:::worked-solution[Splitting a URL into its parts]
The URL is `https://www.greenvalleyschool.ac.zw/notes/physics.html` (a fictional school).

| Part | In this URL | Meaning |
|:--|:--|:--|
| Protocol | `https` | The rules used to transfer the page (secure HTTP) |
| Domain name | `www.greenvalleyschool.ac.zw` | The name of the web server that holds the site; `.zw` is the country code for Zimbabwe |
| Path / file name | `/notes/physics.html` | The folder (`notes`) and the page file (`physics.html`) on that server |

1. The protocol is everything before `://`.
2. The domain name runs from after `://` to the first single `/`.
3. Everything after that is the path to the folder and the file name.
:::

URLs are used because they are easy for people to remember; computers actually locate servers by **IP address**, which is a set of numbers.

## HTTP and HTTPS

HTTP sets the rules for how a browser **requests** a page and how the web server **responds**. With plain HTTP the data travels as plaintext, so anyone who intercepts it can read it.

HTTPS adds **encryption** using a security protocol called SSL/TLS. The browser checks the website's **digital certificate** to confirm that the site is genuine, and then the data passing between them is encrypted. Browsers show a padlock symbol beside an HTTPS address. Any site that handles passwords, payments or personal details should use HTTPS.

## What a web browser does

The main purpose of a browser is to **render HTML** and display web pages. Its other functions include:

- an **address bar** for typing URLs (often also used for searches);
- **navigation tools**: back, forward, refresh and home buttons;
- **tabs**, so several pages can be open at once;
- **bookmarks** or favourites, to save addresses for later;
- a **history** of pages visited;
- **storing cookies** sent by websites;
- running scripts and showing the padlock and certificate details for HTTPS sites.

## How a web page is located, retrieved and displayed

1. The user types a URL into the browser's address bar (or clicks a link).
2. The browser sends the **domain name** to a **DNS** server.
3. The DNS server looks up the matching **IP address**. If it does not hold that domain name, it asks another DNS server, and so on, until the address is found.
4. The IP address is returned to the browser.
5. The browser sends an **HTTP (or HTTPS) request** to the **web server** at that IP address, asking for the page.
6. The web server finds the page and sends it back, as **HTML** with any images and other files the page needs.
7. The browser **renders** the HTML and displays the page.

:::example
**Following one request.** Farai, in Mutare, clicks a link to `https://www.tafaraweather.co.zw/today.html` (a fictional site). His browser asks a DNS server for the IP address of `www.tafaraweather.co.zw`. The DNS server replies with the server's IP address. Because the URL starts with `https`, the browser first checks the site's certificate, then sends an encrypted request for `today.html`. The web server returns the HTML file and the weather images, and the browser renders them as the page Farai sees.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 (topic 5.1) examines all of this lesson. The ZIMSEC syllabus does not name URLs, HTTP or DNS, but they underpin its network protocols (TCP/IP) and internet services, so learn them at the same depth.
:::

## Common mistakes

:::mistake{title="Using \"internet\" and \"web\" as the same thing"}
The internet is the infrastructure; the web is the collection of pages accessed over it.
:::

:::mistake{title="Saying the DNS sends the web page"}
The DNS server only returns the IP address. The **web server** sends the page.
:::

:::mistake{title="Saying HTTPS stops data being intercepted"}
HTTPS encrypts the data, so intercepted data cannot be read; it does not stop interception.
:::

## Exam tips

:::exam-tip
For "**describe** how a web page is located and displayed", name all four players: the **browser**, the **DNS** (domain name to IP address), the **web server** and the **HTML** that the browser renders.
:::

:::exam-tip
"**State** the main purpose of a web browser": render HTML and display web pages. Functions such as bookmarks and tabs are separate marks.
:::

## Summary

:::summary
- The internet is the network infrastructure; the world wide web is the web pages accessed using it.
- A URL contains the protocol, the domain name and the path or file name.
- HTTP transfers web pages; HTTPS does so with encryption and checks the site's certificate.
- A browser renders HTML and offers an address bar, navigation, tabs, bookmarks, history and cookie storage.
- To load a page: the DNS turns the domain name into an IP address; the browser requests the page from the web server, which sends HTML for the browser to render.
:::
