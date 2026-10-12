---
{
  "key": "network.url-dns",
  "title": "URLs and the Domain Name System",
  "summary": "The parts of a URL, how a URL locates a resource on the World Wide Web, and how the Domain Name System turns a domain name into an IP address through a resolver and the root, top-level domain and authoritative servers, with caching, lookup failures and simple DNS attacks.",
  "concepts": ["acs.network.url-dns"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

You type a web address into a browser, press Enter, and a page appears. Two things have happened that you do not see. The address told the browser **which resource** to ask for and **how** to ask for it. Then the browser needed the IP address of the computer that holds the page, because packets are routed by IP address, not by name. The **Domain Name System (DNS)** finds that address, a little like looking up a phone number from a name in a directory.

This lesson explains the parts of a **URL** and then follows a DNS lookup step by step. You should already know what an IP address is and what a web server and a web browser do.

## Key definitions

:::definition{term="Uniform Resource Locator (URL)"}
The address of a resource on the World Wide Web. It states the protocol to use, the domain name of the server, and the location of the resource on that server, and may include a port, a query string and a fragment.
:::

:::definition{term="Domain name"}
A name, such as the part of a URL between the protocol and the path, that identifies a host on the internet in a form people can remember.
:::

:::definition{term="Domain Name System (DNS)"}
A distributed, hierarchical system of servers that stores the records linking domain names to IP addresses, and answers requests to translate a name into an address.
:::

:::definition{term="DNS resolver"}
A server, often run by the ISP, that receives a request from a user's computer and finds the answer by asking other DNS servers, storing the answer in its cache.
:::

## The parts of a URL

Consider this URL:

`https://www.kariba-fishing-supplies.co.zw:8443/catalogue/nets?type=gill&size=30#prices`

| Part | Example | Meaning |
|---|---|---|
| Protocol (scheme) | `https` | The protocol used to fetch the resource |
| Domain name | `www.kariba-fishing-supplies.co.zw` | The server. `www` is a subdomain, `kariba-fishing-supplies` is the registered name, and `co.zw` ends with the country-code top-level domain `zw` |
| Port | `8443` | The port on the server. If omitted, the default for the protocol is used: 80 for HTTP and 443 for HTTPS |
| Path | `/catalogue/nets` | The location of the resource on the server |
| Query string | `type=gill&size=30` | Name and value pairs sent to the server, joined by `&` |
| Fragment | `prices` | A position within the page, used by the browser and not sent to the server |

A **top-level domain (TLD)** is the last label: generic ones such as `com` and `org`, or country codes such as `zw`.

## How DNS resolves a name

The hierarchy has three levels of server above the user's resolver:

- **Root servers**: know which servers handle each TLD.
- **TLD servers**: know the authoritative servers for each domain under that TLD (for example under `zw`).
- **Authoritative name servers**: hold the actual records for a domain, including its IP address.

In a **recursive** query the computer asks its resolver, and the resolver takes responsibility for returning the final answer. In an **iterative** query a DNS server replies with the address of another server to ask, and the resolver asks each in turn.

| Step | Action |
|:-:|---|
| 1 | The browser checks its own cache and the operating system's cache (and the hosts file). If the address is found, the lookup stops. |
| 2 | The computer sends a recursive request to the resolver. If the resolver has the answer in its cache, it replies at once. |
| 3 | The resolver asks a root server. The root server replies with the address of a `zw` TLD server. |
| 4 | The resolver asks the TLD server. It replies with the address of the authoritative server for the domain. |
| 5 | The resolver asks the authoritative server, which replies with the IP address. |
| 6 | The resolver stores the answer in its cache for its **time to live (TTL)** and returns the address to the computer. |
| 7 | The browser opens a connection to that IP address using the protocol and port in the URL, and requests the path. |

**Caching** stores answers so that repeated requests are answered quickly without asking all the servers again. Each record has a TTL, the time in seconds for which it may be kept. When the TTL runs out the record is discarded and the next request needs a full lookup.

:::worked-solution{title="A resolver cache with a TTL"}
A resolver caches the record for `www.kariba-fishing-supplies.co.zw` for a TTL of 300 s. Four users request the name at 0 s, 120 s, 400 s and 650 s.

| Request at (s) | Result |
|:-:|:-:|
| 0 | full lookup |
| 120 | answered from cache |
| 400 | full lookup |
| 650 | answered from cache |

1. At 0 s nothing is cached, so a full lookup is made. The record is valid until 300 s.
2. At 120 s the record is still valid (180 s left), so the resolver answers from its cache.
3. At 400 s the record expired at 300 s, so a full lookup is made and a new record is valid until 700 s.
4. At 650 s the new record is still valid (50 s left): answered from the cache.
5. Two full lookups were needed for four requests.
:::

## Why a lookup can fail

- The domain name was typed incorrectly or does not exist.
- The domain registration expired, or its records were removed.
- The DNS server (resolver or authoritative) is not working or cannot be reached, for example because of a network fault.
- The user's computer has no network connection or points to the wrong DNS server.
- An old record in the cache points to a server whose address has changed. The page loads again when the TTL runs out.

## DNS and attacks (outline)

Because everything depends on DNS, attackers try to interfere with it. In **DNS cache poisoning** (spoofing) a false record is placed in a resolver's cache, so users who ask for a real site are sent to the attacker's copy. In another attack a flood of requests is sent to a DNS server to make it unable to answer, so that sites become unreachable even though their own servers are working. Defences include keeping DNS software updated and using secure DNS options that check the answers. Pharming is covered with other threats.

:::worked-solution{title="Reading a URL"}
Given the URL `http://clinic-booking.example.co.zw/appointments/new?doctor=3`, identify the parts.

1. Protocol: `http`, so the default port is 80.
2. Domain name: `clinic-booking.example.co.zw`.
3. Path: `/appointments/new`.
4. Query string: `doctor=3` (the name is `doctor` and the value is `3`).
5. There is no port and no fragment in this URL.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine the parts of a URL and the role of DNS. Cambridge asks for the recursive and iterative steps through the root, TLD and authoritative servers, and the effect of caching. ZIMSEC asks for the idea of resolving a domain name to an IP address and reasoning from a given lookup table (in Paper 2 section C).
:::

## Common mistakes

:::mistake{title="Saying that DNS holds the web pages"}
DNS stores only records that link names to addresses. The web server holds the pages.
:::

:::mistake{title="Putting the path before the domain"}
The order is protocol, domain name, port, path, query string, fragment.
:::

:::mistake{title="Saying that the fragment is sent to the server"}
The fragment is used by the browser to scroll to a part of the page and is not sent in the request.
:::

:::mistake{title="Skipping the resolver"}
The user's computer does not ask the root server directly. It asks its resolver, which then asks the root, TLD and authoritative servers.
:::

## Exam tips

:::exam-tip
"**Identify the parts of the URL**": copy each part from the question and name it. Remember the default ports (80 for HTTP, 443 for HTTPS) if no port is given.
:::

:::exam-tip
"**Describe how DNS finds the IP address**": give the steps in order: caches checked, resolver asked, root server gives the TLD server, TLD gives the authoritative server, authoritative gives the IP address, answer cached, browser connects.
:::

:::exam-tip
"**Explain why a DNS lookup might fail**": give two or three distinct causes, such as a mistyped or unregistered name, a server that is down, or no connection.
:::

## Summary

:::summary
- A URL has a protocol, a domain name, an optional port, a path, an optional query string and an optional fragment.
- DNS translates a domain name into an IP address, using the root, TLD and authoritative servers in turn when the resolver has no cached answer.
- In a recursive query the resolver finds the whole answer; in an iterative query each server refers the resolver to the next.
- Caching with a TTL speeds up lookups; an expired record needs a full lookup again.
- Lookups fail because of mistyped or expired names, DNS servers that are down, or a lost connection; cache poisoning sends users to a false site.
:::
