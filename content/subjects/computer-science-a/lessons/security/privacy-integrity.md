---
{
  "key": "security.privacy-integrity",
  "title": "Data security, privacy and integrity",
  "summary": "The difference between the security, privacy and integrity of data, the difference between data security and computer-system security, why each matters, the data protection principles in outline and how a checksum shows that data has changed.",
  "concepts": ["acs.security.privacy-integrity"],
  "estimatedMinutes": 45,
  "level": "core"
}
---
## Introduction

A school keeps names, addresses, health notes and examination marks for every learner. A clinic in Kariba keeps patient histories. A mobile-money agent's system holds balances and transaction records. If these records are stolen, shown to the wrong people or quietly changed, real people are harmed: a learner may be bullied, a patient embarrassed, an account emptied. Computer scientists use three words for three different kinds of protection: **security**, **privacy** and **integrity**. They are often mixed up in answers, and examiners reward candidates who keep them apart.

This lesson explains the three terms, the difference between protecting the *data* and protecting the *computer system*, the main principles of data protection, and one simple way to detect that data has changed. You should already know that data is stored in files and databases and sent over networks. The threats themselves are in the next lesson, the protection methods after that, and validation and verification have their own lesson.

## Key definitions

:::definition{term="Data security"}
The protection of data from accidental or deliberate loss, damage, destruction and unauthorised access, so that it stays available to the people entitled to use it.
:::

:::definition{term="Data privacy"}
The right of an individual or organisation to control who can see their personal or confidential data and how it is collected, used and shared.
:::

:::definition{term="Data integrity"}
The accuracy, completeness and consistency of data throughout its life: it is correct when it is entered and it is not changed by error or by an unauthorised person afterwards.
:::

:::definition{term="Computer-system security"}
The protection of the hardware, software and network that store and process data, so that they keep working and cannot be misused or taken over.
:::

:::keyfact{title="One-line distinction"}
Security is about keeping data safe, privacy is about who may see it, and integrity is about whether it is still correct.
:::

## Telling the three apart

Take a school's results database.

- If a hacker copies all the marks, **privacy** has been breached: people saw data they were not allowed to see. The marks are still correct.
- If a teacher's account is used to raise a learner's mark, **integrity** has been breached: the data is now wrong. Nobody necessarily saw anything.
- If a flood destroys the server and the only copy, **security** (availability) has failed: the data is lost. Privacy and integrity were not attacked.

Security is the wider term. Good security measures such as passwords, encryption and backups are the tools used to achieve both privacy and integrity. Privacy is mainly about people and what they are entitled to: a learner's home address is private even if the school's computers are perfectly secure, if the school hands it to a company that should not have it. Integrity is also lost by honest mistakes: a typing error or a transmission fault damages the data just as much as an attacker would.

## Data security and computer-system security

The two are linked but not the same.

| | Data security | Computer-system security |
|---|---|---|
| Protects | The data itself, wherever it is kept or sent | The hardware, operating system, software and network |
| Typical measures | Encryption, access rights, backups, validation, shredding paper copies | Firewalls, anti-malware, software updates, physical locks, secure configuration |
| Example failure | A stolen laptop whose disk is not encrypted exposes every file | A server infected with ransomware stops all staff working |

Both are needed. A system can be well defended while the data on it is left readable by everyone, and well-encrypted data is still lost if the only copy sits on a failed disk.

## Principles of data protection

Laws and codes of practice about personal data, including the law on cyber and data protection in Zimbabwe described in outline, rest on a few common principles. An organisation holding personal data should:

1. collect it **lawfully and fairly**, and tell people why it is being collected;
2. use it only for the **stated purpose**;
3. collect only what is **needed** and no more;
4. keep it **accurate** and up to date;
5. keep it **no longer than necessary**;
6. protect it with suitable **security safeguards**;
7. let people see their own data and ask for mistakes to be corrected.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards need the three definitions, the data-security against system-security distinction and the examples. Cambridge asks for them in Paper 1 as short explanations. ZIMSEC links them to the legal frameworks in Form 5, so know the principles above in outline; neither board asks you to quote a law or a section number.
:::

## How security measures protect privacy and integrity

| Measure | Protects privacy | Protects integrity |
|---|---|---|
| Passwords and access rights (read-only, edit) | Only authorised users can open the data | Only authorised users can change it |
| Encryption | A thief cannot read stolen or intercepted data | A tampered cipher text fails to decrypt properly |
| Backups | Not directly | Damaged data can be restored to a correct state |
| Validation and verification | Not directly | Wrong data is rejected or caught at entry and transfer |
| Audit log of who changed what | Shows who viewed records | Shows who changed records |

## Detecting changed data with a checksum

One simple integrity check adds up the data. Before a file of marks is sent, the sender calculates a **checksum**: the sum of the byte values, kept to the range 0 to 255 by taking the remainder after dividing by 256. The receiver recalculates it from the data it received and compares the two values.

:::worked-solution{title="A checksum for eight marks"}
Eight marks are sent as bytes: 64, 78, 91, 55, 83, 100, 47, 69.

1. Add them: 64 + 78 + 91 + 55 + 83 + 100 + 47 + 69 = 587.
2. Divide by 256: 587 = 2 × 256 + 75.
3. The checksum is the remainder, **75**, and it is sent with the data.
4. During transmission the fourth value arrives as 56 instead of 55. The receiver adds the received values: the total is 588 and 588 − 512 = 76.
5. 76 is not 75, so the receiver knows the data has been damaged and asks for it to be sent again.
:::

:::worked-solution{title="When a checksum misses an error"}
Suppose instead the second value arrives as 79 (one too high) and the sixth as 99 (one too low).

1. The total is still 587, so the checksum is still 75.
2. The receiver cannot tell the data is wrong. Swapping the first two values also leaves the total unchanged.
3. A checksum therefore reveals most accidental errors but not all, and it does not stop someone who changes the data and recalculates the checksum on purpose.
:::

:::example{title="A health centre scenario"}
A rural health centre keeps patient records on a laptop. A nurse leaves the laptop in a car and it is stolen. The disk was not encrypted, so the thief can read every record: this is a failure of **security** that leads to a breach of **privacy**. Later the clinic restores its records from a month-old backup and finds that two visits are missing and one allergy note is out of date: the **integrity** of the restored data is lower than that of the original. The clinic then decides to encrypt the laptops, keep daily backups and keep a record of who opened or changed each file.
:::

## Common mistakes

:::mistake{title="Using the words as if they meant the same thing"}
Writing "privacy means keeping data safe from hackers" describes security. Privacy is about who is entitled to see the data and how it may be used; integrity is about the data being correct.
:::

:::mistake{title="Thinking integrity only concerns attackers"}
Typing mistakes, faulty storage and transmission errors damage integrity. Validation, verification and backups are integrity measures even if nobody ever attacks the system.
:::

:::mistake{title="Saying a checksum proves the data is correct"}
A matching checksum shows only that the sum is unchanged. Two errors can cancel out, so it gives strong evidence, not proof.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 and Cambridge Paper 1 usually ask you to *state* or *explain the difference* between the terms: give a definition of each and, for full marks, a short example that makes the difference clear (the school marks example works for all three). *Describe* a measure by naming it and saying what it protects, privacy or integrity. A *calculate* question on a checksum is answered by adding the values, taking the remainder and comparing with the sent value. Cambridge Paper 3 does not test this topic. ZIMSEC Paper 2 does not test it either, but the project report must show how a system protects its data.
:::

## Summary

:::summary
- Security protects data from loss, damage and unauthorised access; privacy concerns who may see and use personal data; integrity means the data is accurate, complete and consistent.
- Data security protects the data itself; computer-system security protects the hardware, software and network.
- Data protection principles: lawful and fair collection, stated purpose, only what is needed, accuracy, limited retention and safeguards.
- Passwords, access rights and encryption protect privacy and integrity; backups, validation and verification protect integrity.
- A checksum (the sum of the bytes modulo 256) detects most accidental changes, but two errors can cancel out.
:::
