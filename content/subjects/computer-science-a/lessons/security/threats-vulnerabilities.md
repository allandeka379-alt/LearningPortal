---
{
  "key": "security.threats-vulnerabilities",
  "title": "Threats and vulnerabilities to computer systems",
  "summary": "Malware, hacking, phishing, pharming, social engineering, denial of service, interception and insider threats, and the software weaknesses that let attacks succeed, such as unpatched software, weak passwords and SQL injection, for a stand-alone PC and a network.",
  "concepts": ["acs.security.threats-vulnerabilities"],
  "estimatedMinutes": 55,
  "level": "core",
  "freePreview": true
}
---
## Introduction

Tendai runs a small business in Mutare that sells airtime and pays suppliers by mobile money. One morning every file on the shop computer is locked and a message demands payment. Rudo, a teacher in Gweru, receives an email that looks like it came from her bank and asks her to "confirm" her password. Both are attacks on computer systems and data. To defend against them you must first be able to name the **threats** and understand the **vulnerabilities** that let them succeed.

A **threat** is something that could cause harm, such as malware or a hacker. A **vulnerability** is a weakness in a system that a threat can exploit, such as software that has not been updated. A **risk** is the chance that a threat uses a vulnerability and the harm that follows. This lesson names the main threats and vulnerabilities and shows their effect on a stand-alone PC and on a network. The defences are in the next lesson. You should know the difference between data security, privacy and integrity.

## Key definitions

:::definition{term="Threat"}
Any event, person or program that could cause loss, damage or unauthorised access to a computer system or its data.
:::

:::definition{term="Vulnerability"}
A weakness in hardware, software, configuration or human behaviour that a threat can exploit.
:::

:::definition{term="Malware"}
Malicious software designed to damage a system, steal data or give an attacker control. Examples are viruses, worms, trojans, ransomware and spyware.
:::

:::definition{term="Hacking"}
Gaining unauthorised access to a computer system or data, for example by guessing a password or exploiting a software weakness.
:::

:::definition{term="Phishing"}
Sending fake emails, messages or web pages that look genuine in order to trick people into revealing passwords, card numbers or other private data.
:::

:::definition{term="Pharming"}
Redirecting users from a genuine web site to a fake one, without their knowledge, by changing the DNS records or the settings of the computer, so that they enter details on the fake site.
:::

## Threats

| Threat | What it does |
|---|---|
| **Virus** | Attaches itself to a file or program and copies itself when the host is run; it needs a user to run the infected file. |
| **Worm** | Copies itself across a network on its own without a host file, using up bandwidth and often carrying other malware. |
| **Trojan** | Looks like useful software but contains hidden harmful code; it does not copy itself. |
| **Ransomware** | Encrypts the victim's files and demands payment for the key. |
| **Spyware / keylogger** | Secretly records what the user does, such as keystrokes and web sites visited, and sends it to the attacker. |
| **Hacking** | Unauthorised access, for example by guessing or stealing a password, to read, copy, change or delete data. |
| **Phishing** | A fake message that tricks the user into giving away details. |
| **Pharming** | Fake web site reached even when the correct address is typed. |
| **Social engineering** | Manipulating people rather than machines, for example a caller who pretends to be from IT support and asks for a password. |
| **Denial of service (DoS)** | Floods a server or network with requests so genuine users cannot get through; a distributed attack (DDoS) uses many infected computers. |
| **Interception** | Reading data as it travels, for example on an unprotected public wireless network. |
| **Insider threat** | An employee or learner who misuses their legitimate access, deliberately or by mistake. |
| **Accidental loss** | Deleting files, spilling a drink, a power surge or theft of a laptop. |

## Vulnerabilities and their sources

- **Unpatched software.** Makers release updates to fix weaknesses. A computer that is never updated keeps the weakness that attackers know how to exploit.
- **Weak or default passwords.** Passwords such as "1234" or the factory password of a router are tried first by attackers.
- **Weak configuration.** Services that are not needed left switched on, file shares open to everyone, user accounts with more rights than the user needs.
- **Programming flaws.** A *buffer overflow* happens when a program writes more data into a memory area than it can hold, overwriting neighbouring memory so that an attacker can run their own code. *SQL injection* happens when a program builds a database query by joining text typed by the user, so that a user can type SQL commands as input.
- **People.** Trusting a fake message, using the same password everywhere, leaving a screen unlocked.
- **Unprotected networks.** Open wireless networks and unencrypted connections let others read the data.

### Why a password is a vulnerability: how many guesses?

A program that tries every combination is a **brute-force attack**. The number of combinations is the number of characters to choose from, raised to the power of the length.

:::worked-solution{title="Time to try every password"}
Assume an attacker's program tries 1 000 000 000 guesses per second.

| Password type | Characters to choose from | Length | Combinations | Time to try all at 1 000 000 000 guesses per second |
|:-:|:-:|:-:|:-:|:-:|
| 4-digit PIN | 10 | 4 | 10,000 | 10 microseconds |
| 6 lower-case letters | 26 | 6 | 308,915,776 | 0.309 seconds |
| 8 lower-case letters | 26 | 8 | 208,827,064,576 | 3.48 minutes |
| 8 letters (both cases) and digits | 62 | 8 | 218,340,105,584,896 | 2.53 days |
| 12 letters (both cases) and digits | 62 | 12 | 3,226,266,762,397,899,821,056 | 100,000 years |

1. Combinations = characters^length, for example 26^8 = 208,827,064,576.
2. Time = combinations ÷ guesses per second = 208,827,064,576 ÷ 1 000 000 000 ≈ 209 seconds ≈ 3.48 minutes.
3. Every extra character multiplies the work by the size of the character set; a longer password helps far more than an unusual one.
:::

### SQL injection: a real run

A login function builds its query by joining the typed text into the SQL command. The program below also has a safe version that passes the typed text as parameters, so it is always treated as data.

```python
import sqlite3

db = sqlite3.connect(":memory:")
db.execute("CREATE TABLE users (name TEXT, password TEXT, role TEXT)")
db.executemany("INSERT INTO users VALUES (?, ?, ?)",
               [("tendai", "maroon7", "student"),
                ("rudo", "kudu2024", "teacher"),
                ("admin", "Zx9!qLm4", "admin")])


def login_unsafe(name, password):
    query = "SELECT name, role FROM users WHERE name = '" + name + "' AND password = '" + password + "'"
    return db.execute(query).fetchall()


def login_safe(name, password):
    return db.execute("SELECT name, role FROM users WHERE name = ? AND password = ?",
                      (name, password)).fetchall()


print(login_unsafe("tendai", "wrong"))
print(login_unsafe("tendai", "' OR '1'='1"))
print(login_safe("tendai", "' OR '1'='1"))
```

```
[]
[('tendai', 'student'), ('rudo', 'teacher'), ('admin', 'admin')]
[]
```

:::worked-solution{title="Reading the injection"}
1. A wrong password finds no row, so the first output is the empty list.
2. The typed password `' OR '1'='1` changes the query to `... AND password = '' OR '1'='1'`. The condition `'1'='1'` is always true, and AND is evaluated before OR, so every row is selected: the attacker is "logged in" and sees all three users, including the administrator.
3. The safe version treats the typed text as a value to compare with the password column, so nothing matches and the result is the empty list.
4. The fix is to use parameters (prepared statements) and to check the input, never to join user text into a command.
:::

## Effects on a stand-alone PC and on a network

| | Stand-alone PC | Network |
|---|---|---|
| Malware spreads by | Infected USB drives and downloads | Shared folders, email and the network itself; one infected machine can reach the rest |
| Hacking | Needs physical access or an internet connection | Remote attempts through the network; a successful attacker may reach the servers |
| Data loss | Affects one user | Affects everyone who relies on the shared server |
| Denial of service | Rarely relevant | A server or the internet link can be overwhelmed |

:::example{title="A denial of service on a school server"}
A school server can answer 200 requests every second and genuine users send about 150. A criminal controls 50 infected computers, each sending 40 requests per second: 50 × 40 = 2,000 requests per second. The server now receives 2,150 requests per second but can answer only 200, so only about 9 in every 100 requests are answered, and most genuine users see time-out errors. No data is stolen, yet the service is unavailable.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the threats above and the risk each poses to a stand-alone PC and a network. Cambridge names malware (virus, spyware), hackers, phishing and pharming; ZIMSEC adds sources of vulnerability and the tools used to remove them. Buffer overflow and SQL injection are needed in outline only, never as code.
:::

## Common mistakes

:::mistake{title="Confusing a virus, a worm and a trojan"}
A virus needs a host file and a user to run it; a worm spreads by itself across networks; a trojan pretends to be useful and does not copy itself.
:::

:::mistake{title="Mixing up phishing and pharming"}
Phishing tricks the user with a fake message; pharming sends the user to a fake web site even when the correct address is typed.
:::

:::mistake{title="Saying that a denial of service steals data"}
A denial of service makes a service unavailable. It does not need to read or change any data.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Papers 1 and 3 ask you to *name* or *describe* threats and *explain* the risk they pose. Name the threat, say how it works in one sentence, and say what harm it does (data lost, stolen or changed, service unavailable). When the question says *stand-alone PC* or *network*, state which one your point applies to. A *calculate* question on passwords uses combinations = characters^length. Do not write brand names of malware or products.
:::

## Summary

:::summary
- A threat can cause harm; a vulnerability is the weakness it exploits; a risk is the chance and the effect of an attack succeeding.
- Malware includes viruses, worms, trojans, ransomware and spyware; other threats are hacking, phishing, pharming, social engineering, denial of service, interception, insiders and accidents.
- Vulnerabilities come from unpatched software, weak or default passwords, poor configuration, programming flaws such as buffer overflow and SQL injection, and human behaviour.
- A longer password gives far more combinations than a short one: characters^length.
- On a network an attack can spread and affect everyone, while on a stand-alone PC it usually affects one user.
:::
