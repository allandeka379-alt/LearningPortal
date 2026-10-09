---
{
  "key": "security.cyber-attacks",
  "title": "Cyber attacks and computer crime",
  "summary": "How brute-force attacks, data interception (sniffing), distributed denial of service, hacking, phishing, pharming, social engineering, spoofing and online fraud are carried out, what attackers aim to achieve, and the effects on people and organisations.",
  "concepts": ["comp.security.cyber-attacks"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Nyasha receives a message that appears to come from her bank: "Your account will be suspended. Click here to confirm your details." The link opens a page that looks exactly like the bank's login page. If she types her password there, a criminal will have it within seconds. This is **phishing**, one of many ways criminals attack people and organisations through computers and networks.

Cambridge 0478 (topic 5.3) asks you to describe how a range of cyber security threats are carried out and what they aim to do: brute-force attacks, data interception, distributed denial of service, hacking, malware, pharming, phishing and social engineering. ZIMSEC Form 2 covers computer crime and its effects, and Form 3 asks you to identify online crimes such as spoofing, sniffing, fraud and hacking. Malware has its own lesson; this lesson covers the other attacks.

## Key definitions

:::definition{term="Cyber attack"}
A deliberate attempt to gain unauthorised access to, damage, disrupt or steal data from a computer system or network.
:::

:::definition{term="Hacking"}
Gaining unauthorised access to a computer system or network, usually by exploiting a weakness in its security.
:::

:::definition{term="Phishing"}
Sending fake messages, usually emails, that appear to come from a trusted organisation, to trick people into clicking a link to a fake website and entering personal details.
:::

:::definition{term="Pharming"}
Malicious code, installed on the user's computer or on a DNS server, that redirects the user to a fake website even when the correct web address is typed.
:::

:::definition{term="Social engineering"}
Manipulating people, rather than technology, into giving away confidential information or breaking security procedures.
:::

## How the attacks are carried out

### Brute-force attack

The attacker tries to find a password by **trial and error**: first common passwords and dictionary words, then every possible combination, using software that makes thousands of guesses a second. **Aim**: to obtain a password and gain access to an account or system.

:::worked-solution[Why short PINs are weak]
A phone is protected by a 4-digit PIN. How many possible PINs are there, and what does that mean for a brute-force attack?

1. Each digit can be 0 to 9: 10 choices.
2. Four digits: 10 × 10 × 10 × 10 = 10 000 possible PINs.
3. Software trying several guesses a second could test them all in hours.
4. This is why devices lock or wipe after a few wrong attempts: with only 3 tries allowed, the chance of guessing is 3 in 10 000.
5. Longer passwords that mix upper case, lower case, digits and symbols give vastly more combinations, so a brute-force attack would take far too long.
:::

### Data interception (sniffing)

The attacker **intercepts** data as it travels across a network. A **packet sniffer** captures packets on a wired network; on wireless networks an eavesdropper within range picks up the signals, for example on unsecured public Wi-Fi. **Aim**: to steal data such as passwords, card numbers or messages. Encryption protects against this, because intercepted data cannot be read without the key.

### Distributed denial of service (DDoS)

The attacker infects many computers with malware, turning them into a **botnet** under his control. On command, all of them send huge numbers of requests to one web server at the same time. The server cannot cope with the flood, slows down or crashes, and genuine users cannot reach the website. **Aim**: to disrupt a service, for example an online shop or a bank's website, sometimes to demand money to stop the attack. No data is usually stolen, but the organisation loses business and reputation.

### Hacking

A hacker gains unauthorised access by exploiting weaknesses: unpatched software, weak passwords, poorly configured firewalls. Once inside, a malicious hacker may steal, change or delete data, install malware or use the system to attack others. **Ethical hackers**, by contrast, are employed with permission to find weaknesses so they can be fixed.

### Phishing

Fake emails or messages appear to come from a bank, a mobile network or a well-known shop. They usually create urgency ("your account will be closed"), and contain a link to a fake website where the victim types their login or card details. **Aim**: to steal personal and financial details for fraud or identity theft. The user must **click the link** for phishing to work.

### Pharming

Malicious code is installed on the user's computer (often by a Trojan) or a **DNS server** is corrupted, so that when the user types the genuine web address, they are **redirected** to a fake site. **Aim**: the same as phishing, to collect personal details, but it is harder to spot, because the user has not clicked any suspicious link.

### Social engineering

The attacker exploits human trust, fear or curiosity: a phone call from someone pretending to be from IT support asking for a password; a USB stick labelled "salaries" left in a car park (baiting); someone watching over a shoulder as a PIN is typed (shoulder surfing). **Aim**: to obtain confidential information or access by tricking people.

### Spoofing and online fraud

**Spoofing** means disguising a message or device as coming from a trusted source: a forged email sender address, a faked caller ID, or a faked IP address. It is used in phishing and other attacks. **Online fraud** is any crime that uses the internet to deceive people for money: fake online shops, fake investment offers, scams that ask for an "advance fee", and the use of stolen card details.

:::example
**Phishing or pharming?**

- Tendai receives an email saying "Your mobile money wallet is locked" with a link. He clicks it and enters his PIN on a convincing page. This is **phishing**: a fake message and a link he chose to click.
- Rudo types her bank's correct address into her browser, but malicious code on her laptop silently sends her to a copy of the site, where she logs in. This is **pharming**: she did nothing wrong except have infected software; the redirection happened without a link.
:::

## Effects of cyber attacks

- **On individuals**: money stolen, identity theft, loss of personal photos and documents, embarrassment, stress.
- **On organisations**: financial loss, loss of customers' trust and reputation, lost business while systems are down, cost of repairing systems, and legal penalties for failing to protect personal data. In Zimbabwe, the Cyber and Data Protection Act sets out offences such as unlawful access to computer systems and requires organisations to protect personal data.

## Common mistakes

:::mistake{title="Confusing phishing and pharming"}
Phishing needs the user to click a link in a fake message. Pharming redirects the user even when they type the correct address.
:::

:::mistake{title="Saying a DDoS attack steals data"}
A DDoS attack floods a server with requests to stop genuine users reaching it. Its aim is disruption, not theft.
:::

:::mistake{title="Saying encryption stops interception"}
Data can still be intercepted; encryption makes the intercepted data **unreadable** without the key.
:::

## Exam tips

:::exam-tip
Cambridge asks for the **process** and the **aim**. For each threat, learn one or two sentences on how it is carried out and one on what the attacker wants: "A DDoS attack uses a botnet to flood a server with requests (process) so that genuine users cannot access the website (aim)."
:::

:::exam-tip
If a question describes an incident, look for the clue words: "trial and error" (brute force), "flood of requests" (DDoS), "email with a link" (phishing), "typed the correct address" (pharming), "phone call pretending to be" (social engineering).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge names brute-force attacks, data interception, DDoS, hacking, phishing, pharming and social engineering, and asks for the process and the aim of each. ZIMSEC uses the terms sniffing (for data interception), spoofing and online fraud as well, and asks about the effects of computer crime.
:::

## Summary

:::summary
- Brute force: trial-and-error guessing of passwords. Data interception: capturing data in transit with a packet sniffer or by eavesdropping on wireless.
- DDoS: a botnet floods a server so genuine users cannot reach it. Hacking: unauthorised access by exploiting weaknesses.
- Phishing: fake messages with links to fake sites. Pharming: malicious code or a corrupted DNS server redirects users to a fake site.
- Social engineering tricks people; spoofing disguises a message or device as trusted; online fraud deceives people for money.
- Effects include financial loss, identity theft, lost reputation, downtime and legal penalties.
:::
