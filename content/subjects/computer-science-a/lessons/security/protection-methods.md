---
{
  "key": "security.protection-methods",
  "title": "Protecting systems and data: accounts, authentication and defences",
  "summary": "User accounts and access rights, password policies, authentication techniques (two-factor, biometrics, digital signatures), firewalls, anti-malware, updates, secure configuration, physical security and backups, and which measure restricts which threat.",
  "concepts": ["acs.security.protection-methods"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A school computer laboratory in Masvingo holds learners' coursework, the examination marks and the school's accounts. The head of ICT cannot stop every attack, but she can make attacks harder, limit the damage when one succeeds, and recover quickly afterwards. That is what **protection methods** do. No single method is enough, so security uses several layers: if one fails, another still protects the system.

This lesson covers how users are identified and given limited rights, how passwords and other authentication techniques work, the software and hardware defences, and basic security administration. You should already know the threats from the previous lesson. Encryption has its own lesson.

## Key definitions

:::definition{term="Authentication"}
Proving that a user, device or message is who or what it claims to be before access is given.
:::

:::definition{term="Access rights"}
The permissions given to a user or group for each resource, such as read-only, read and write, or no access.
:::

:::definition{term="Firewall"}
Hardware or software placed between a network and another network (such as the internet) that examines incoming and outgoing traffic and allows or blocks it using a set of rules.
:::

:::definition{term="Two-factor authentication"}
Authentication that needs two different kinds of evidence, for example something the user knows (a password) and something the user has (a phone that receives a one-time code).
:::

:::definition{term="Patch"}
A small update to software that fixes a weakness or a fault.
:::

## User accounts and access rights

Each user has an **account** with a user name and a way to prove identity. The administrator gives the account only the rights that the person's job needs: the **principle of least privilege**.

| Resource | Learner | Teacher | Administrator |
|---|---|---|---|
| Own coursework folder | Read and write | Read and write | Full control |
| Class marks spreadsheet | No access | Read and write | Full control |
| System settings | No access | No access | Full control |

Groups make this easier: the administrator puts users in groups (learners, teachers) and gives rights to the group. When someone leaves, the account is disabled at once. Access rights protect **privacy** (who may read) and **integrity** (who may change).

## Passwords and password policy

A good password policy asks for a minimum length, a mix of letters, digits and symbols, no personal words, a different password for each account, and a change only when there is a reason. It also **locks an account after a few wrong attempts**.

:::worked-solution{title="What a lock-out achieves"}
A four-digit PIN has 10^4 = 10,000 possible values. An attacker guesses at random.

1. With no limit, the attacker needs on average 10,000 ÷ 2 = 5,000 attempts, which a program does in moments.
2. If the account locks after 3 wrong attempts, the attacker has 3 chances in 10,000.
3. The probability of success is 3 ÷ 10,000 = 0.0003 = 0.03%.
4. The lock-out turns a weak PIN into a much harder target, though the administrator must have a safe way to unlock genuine users.
:::

## Authentication techniques

| Technique | How it works | Strength | Weakness |
|---|---|---|---|
| Password or PIN | Something the user **knows** | Cheap and simple | Can be guessed, shared or stolen |
| Token or phone | Something the user **has**, for example a device that shows a one-time code | Stolen password alone is useless | Can be lost or stolen |
| Biometrics | Something the user **is**: fingerprint, face or voice | Cannot be forgotten or shared | Can reject a genuine user or, rarely, accept the wrong one; cannot be changed if copied |
| Digital signature | The sender signs a message with their private key; anyone can check it with the public key | Shows who sent it and that it was not altered | Needs a trusted way to know the public key |
| Two-factor | Two different kinds from the above | Much stronger than one | Slower to use |

## Technical and physical defences

- **Firewall.** Checks packets against rules and blocks the rest.
- **Anti-virus and anti-spyware software.** Scans files and programs for known malware and suspicious behaviour, and removes or quarantines what it finds. Its list of known malware must be kept up to date.
- **Updates and patches.** Close the weaknesses that attackers exploit.
- **Secure configuration.** Change default passwords, switch off services that are not needed and remove unused accounts.
- **Encryption.** Makes stored and transmitted data unreadable to others.
- **Backup.** A copy of the data kept separately, ideally off-site, so that damaged or lost data can be restored.
- **Physical security.** Locked server rooms, cable locks, keeping screens out of sight and a logged visitors' book.
- **Staff and learner training.** The people are part of the defence.

:::worked-solution{title="How a firewall applies its rules"}
A school firewall checks the rules in order and the first rule that matches decides what happens.

| Rule | Action | Destination port | Source address |
|:-:|:-:|:-:|:-:|
| 1 | ALLOW | 443 | any |
| 2 | ALLOW | 80 | any |
| 3 | ALLOW | 22 | starts with 10.0.0. |
| 4 | BLOCK | any | any |

Five packets arrive.

| Packet | Source address | Destination port | First matching rule | Result |
|:-:|:-:|:-:|:-:|:-:|
| 1 | 41.57.9.3 | 443 | 1 | ALLOW |
| 2 | 10.0.0.15 | 22 | 3 | ALLOW |
| 3 | 41.57.9.3 | 22 | 4 | BLOCK |
| 4 | 196.2.4.8 | 23 | 4 | BLOCK |
| 5 | 196.2.4.8 | 80 | 2 | ALLOW |

1. Packet 2 reaches port 22 from inside the school (10.0.0.x), so rule 3 allows it.
2. Packet 3 uses the same port from outside, so rules 1 to 3 do not match and rule 4 blocks it.
3. Rule 4 is a "deny everything else" rule: anything not listed is blocked.
:::

## Which measure restricts which threat?

| Threat | Measures that restrict it |
|---|---|
| Malware | Anti-virus software, updates, firewall, not opening unknown attachments, backups |
| Hacking | Strong passwords, lock-out, two-factor authentication, firewall, updates |
| Phishing and pharming | Training, checking the address, anti-phishing filters, two-factor authentication |
| Interception | Encryption, secure connections, not using open wireless networks |
| Denial of service | Firewall rules, filtering and extra capacity from the internet provider |
| Insider threat | Least privilege, logging, separation of duties |
| Accidental loss and theft | Backups, access rights, locks, disk encryption |

:::example{title="Security administration in a small school"}
Nyasha is the new network administrator. In her first week she (1) changes the router's default password, (2) creates a "Learners" group with access only to the shared learning folder, (3) sets the marks spreadsheet so that only teachers can edit it, (4) turns on automatic updates, (5) switches the firewall to deny everything not listed and (6) arranges a weekly backup that is kept in another building. Each step removes a specific vulnerability from the last lesson.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the measures above and the ability to say which threat each restricts, from a stand-alone PC to a network. ZIMSEC also asks for security administration tasks such as creating accounts and setting permissions, and for tools that remove vulnerabilities; Cambridge names digital signatures and biometrics. Exact products are never needed.
:::

## Common mistakes

:::mistake{title="Saying a firewall removes viruses"}
A firewall filters network traffic. Anti-virus software finds and removes malware that is already on the computer.
:::

:::mistake{title="Giving every user full access"}
Full access for everyone breaks the principle of least privilege: one mistake or one stolen account can damage everything.
:::

:::mistake{title="Calling a second password two-factor authentication"}
Two-factor authentication needs two different kinds of evidence. Two passwords are both something the user knows.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Papers 1 and 3 give a scenario and ask you to *describe* or *explain* measures. Name the measure, say how it works and link it to the threat, because "install a firewall" alone earns little. In a *compare* or *evaluate* question give a strength and a weakness. ZIMSEC coursework and the project may ask you to carry out administration tasks, so practise creating an account and setting permissions.
:::

## Summary

:::summary
- Give each user an account with only the access rights they need, and lock accounts after repeated wrong attempts.
- Authentication uses something known, held or inherent; two-factor authentication combines two different kinds.
- A firewall applies rules in order to allow or block traffic; anti-virus and anti-spyware software find and remove malware.
- Updates, secure configuration, encryption, backups, physical security and training close vulnerabilities and limit damage.
- Match each measure to the threat it restricts and use several layers together.
:::
