---
{
  "key": "security.network-defences",
  "title": "Firewalls, proxy servers, SSL and safe habits",
  "summary": "How firewalls and proxy servers protect a network; the secure socket layer (SSL) protocol and digital certificates; automatic software updates; checking URLs, spelling and tone to spot attacks; and matching each solution to the threats it counters.",
  "concepts": ["comp.security.network-defences"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A secondary school in Harare connects 200 computers to the internet. Every minute, data flows in and out: learners' searches, teachers' emails, software updates, and also unwanted traffic, from automated attacks probing for weaknesses to links in fake emails. The school cannot rely on one defence. It uses a **firewall** at the edge of its network, a **proxy server** that filters websites, **SSL** to protect logins, **automatic updates** to close security holes, and training so that staff recognise a suspicious message.

Cambridge 0478 (topic 5.3) lists these solutions and asks how each one helps keep data safe. ZIMSEC Form 3 asks you to set up a firewall and apply network security measures such as proxy servers, digital signatures and certificates. Exam questions often give a threat and ask which solution counters it, and how.

## Key definitions

:::definition{term="Firewall"}
Hardware or software that sits between a network or computer and the internet, examines incoming and outgoing traffic, and allows or blocks it according to a set of rules.
:::

:::definition{term="Proxy server"}
A server that acts as an intermediary between users' computers and the internet: requests go to the proxy, which fetches the web pages on the users' behalf.
:::

:::definition{term="Secure socket layer (SSL)"}
A security protocol that encrypts the data sent between a browser and a web server and uses a digital certificate to confirm the server's identity. Its modern successor is TLS, but the term SSL is still widely used.
:::

:::definition{term="Digital certificate"}
An electronic document issued by a trusted certificate authority that confirms a website's identity and contains its public key.
:::

## Firewalls

A firewall can be software on one computer or a hardware device protecting a whole network. It:

1. examines each packet of incoming and outgoing traffic;
2. compares it with a set of **rules** (criteria) set by the administrator, for example allowed IP addresses, ports or websites;
3. **allows** traffic that meets the rules and **blocks** traffic that does not;
4. can block particular websites, IP addresses or programs, and stop unauthorised programs on the inside from sending data out;
5. keeps a **log** of traffic and alerts the administrator to suspicious attempts.

A firewall helps against hacking, some malware spreading across the network and unwanted connections. It cannot stop a user from opening an infected attachment that arrives through allowed traffic, and it cannot stop attacks from someone already inside the network.

## Proxy servers

All web requests from the school go to the proxy server first. The proxy then requests the page from the web server and passes it back. This means:

- the outside web server sees only the proxy's IP address, so the **internal addresses are hidden** from attackers;
- the proxy can **filter** requests, blocking unsuitable or dangerous websites;
- it can **cache** frequently used pages, so they load faster and less internet bandwidth is used;
- it can include a firewall and absorb some attacks, such as part of a DDoS flood, before they reach the internal network.

## SSL and digital certificates

When a browser connects to a website that uses SSL, the address starts `https` and a **padlock** appears. The process, in outline:

1. The browser asks the web server to identify itself.
2. The server sends a copy of its **digital certificate**, which includes its public key.
3. The browser checks that the certificate is valid and was issued by a trusted **certificate authority**.
4. If it is, the browser and server agree an encryption key for the session, and an encrypted connection begins.
5. All data sent in that session, such as passwords and card numbers, is **encrypted**, so intercepted data cannot be read.

SSL protects data in transit against **interception**, and the certificate helps the user check that the site is genuine. A **digital signature** works in a similar way for documents and messages: it proves who sent them and that they have not been altered.

## Other solutions

- **Automating software updates**: operating systems and applications are updated automatically as soon as fixes are released. Updates patch the security weaknesses that hackers and malware exploit, and update anti-malware databases.
- **Checking the URL attached to a link**: hovering over a link shows its true address. A link that says "Bank login" but leads to an odd address, or a near-copy of the bank's name with one letter changed or added, is a sign of phishing.
- **Checking the spelling and tone of communications**: phishing messages often contain spelling and grammar mistakes, a generic greeting ("Dear customer"), an urgent or threatening tone ("your account will be closed today") and requests for personal details that a real bank never makes.
- **Anti-malware, access levels, authentication and privacy settings** are covered in their own lessons and complete the set.

:::example
**Matching solutions to threats.** The school's technician lists the main threats and the defences against each.

| Threat | Solution | How it helps |
|:--|:--|:--|
| Hacking from the internet | Firewall | Blocks unauthorised incoming connections that break its rules |
| Learners visiting harmful websites | Proxy server | Filters requests and blocks listed sites |
| Interception of passwords on Wi-Fi | SSL (https) | Encrypts the data, so intercepted data is unreadable |
| Malware exploiting an old operating system | Automatic updates | Patches the weakness before it can be used |
| Phishing emails | Checking URL, spelling and tone | Users recognise the fake message and do not click |
| DDoS flooding the school website | Proxy server and firewall | Filter and absorb some of the unwanted traffic |
:::

:::example
**Spotting a fake message.** Sipho receives this email: "Dear Costomer, we detected unusal activity. Verify your account within 2 hours or it will be BLOCKED. Click here." Hovering over "Click here" shows an address that is not the bank's. Three warning signs: spelling mistakes ("Costomer", "unusal"), an urgent, threatening tone, and a URL that does not match the bank. Sipho deletes the message and phones the bank using the number on his card.
:::

## Common mistakes

:::mistake{title="Saying a firewall removes viruses"}
A firewall filters traffic; it does not scan files for malware or remove it. That is the job of anti-malware software.
:::

:::mistake{title="Saying https means a site is honest"}
The padlock means the connection is encrypted and the certificate matches the site's address. A criminal can also get a certificate for a fake site, so the URL must still be checked.
:::

:::mistake{title="Describing a proxy server as 'a firewall'"}
A proxy can include firewall features, but its defining job is to act as an intermediary: it makes requests on behalf of users, hiding their addresses and filtering and caching pages.
:::

## Exam tips

:::exam-tip
For "explain how a firewall helps keep data safe", give the process: it monitors incoming and outgoing traffic, checks it against set rules, and blocks traffic that does not meet them.
:::

:::exam-tip
For SSL, mention both **encryption** of data in transit and the **digital certificate** that authenticates the server; full marks usually need both.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge asks how each solution helps keep data safe from the threats in its list. ZIMSEC asks you to set up a firewall and apply measures such as proxy servers, digital signatures and certificates, so learn what a digital signature proves as well.
:::

## Summary

:::summary
- A firewall checks incoming and outgoing traffic against rules, blocking what does not meet them, and logs attempts.
- A proxy server makes requests on users' behalf, hiding internal IP addresses, filtering websites and caching pages.
- SSL encrypts data between browser and server, and a digital certificate from a certificate authority confirms the server's identity (https and padlock).
- Automatic updates patch security weaknesses; checking URLs, spelling and tone helps users spot phishing.
- Each threat needs a matching defence, and several layers together give the best protection.
:::
