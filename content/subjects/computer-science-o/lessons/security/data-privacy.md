---
{
  "key": "security.data-privacy",
  "title": "Data privacy and data integrity",
  "summary": "Keeping personal data private through data protection principles, consent and user accounts with access levels; keeping data accurate, complete and consistent (data integrity); and the threats to privacy and integrity with the measures that reduce them.",
  "concepts": ["comp.security.data-privacy"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

A clinic in Mutare keeps records of thousands of patients: names, phone numbers, addresses, illnesses and test results. If a receptionist reads a neighbour's HIV test result out of curiosity, the patient's **privacy** has been broken. If a clerk types a blood group wrongly, or two copies of a record disagree, the data has lost its **integrity**, and a doctor could make a dangerous decision.

Every organisation that holds personal data (schools, banks, mobile networks, shops with loyalty cards) has to protect both. ZIMSEC Form 3 asks you to apply data privacy measures. Paper 2 questions describe an organisation and ask you to explain the difference between privacy and integrity, state data protection principles, and suggest measures such as access levels, passwords and encryption.

## Key definitions

:::definition{term="Personal data"}
Any information that relates to an identifiable living person, such as a name, ID number, address, phone number, photograph, medical record or exam result.
:::

:::definition{term="Data privacy"}
The right of individuals to control how their personal data is collected, used and shared, and the duty of organisations to keep that data away from unauthorised people.
:::

:::definition{term="Data integrity"}
The accuracy, completeness and consistency of data over its whole life, so that it can be trusted.
:::

:::definition{term="Consent"}
Clear permission given freely by a person for their personal data to be collected and used for a stated purpose.
:::

:::definition{term="Access level (access rights)"}
The permissions given to a user account that decide which data the user may see and whether they may read only, add, change or delete it.
:::

## Privacy and integrity are different

| | Data privacy | Data integrity |
|:--|:--|:--|
| Question it answers | Who is allowed to see and use the data? | Is the data correct and complete? |
| Example of a failure | A clerk sells customers' phone numbers to an advertiser | A learner's mark is typed as 18 instead of 81 |
| Main measures | Access levels, passwords, encryption, data protection policies | Validation, verification, backups, access controls, audit trails |

Data can be private but wrong (a secure but inaccurate record), or accurate but not private (correct data leaked to the public). Both must be protected.

## Principles of data protection

Data protection laws set out principles that organisations must follow. In Zimbabwe, the **Cyber and Data Protection Act [Chapter 12:07] (2021)** sets out such principles in outline and gives the Postal and Telecommunications Regulatory Authority (POTRAZ) the role of data protection authority. The usual principles are that personal data must be:

1. collected and processed **fairly and lawfully**, with the person's **consent** or another lawful reason;
2. used only for the **stated purpose** for which it was collected;
3. **adequate, relevant and not excessive** (collect only what is needed);
4. **accurate** and kept up to date;
5. **not kept longer than necessary**;
6. processed in line with the person's **rights** (for example to see their data and have errors corrected);
7. kept **secure** against unauthorised access, loss or damage;
8. not transferred to another country without adequate protection.

## Measures that protect privacy

- **User accounts with passwords**: each user has a unique ID and a strong password, so actions can be traced to a person.
- **Access levels**: users see only what their job needs. A receptionist may read appointment times but not test results; only a doctor may edit a diagnosis.
- **File permissions**: read-only, read/write or no access set on files and folders.
- **Encryption**: data is scrambled so that stolen files or intercepted messages cannot be understood without the key.
- **Firewalls and anti-malware**: keep intruders and spyware out of the system.
- **Privacy policies and staff training**: staff know the rules; the public knows how its data is used.
- **Physical security**: locked server rooms, screens that lock automatically, shredding printed records.

:::example{title="Setting access levels in a school system"}
Gweru Heights Academy (fictional) stores learners' details and marks in one database.

| User | Personal details | Marks | Fees |
|:--|:--|:--|:--|
| Class teacher | Read | Read and edit (own classes only) | No access |
| Bursar | Read | No access | Read and edit |
| Head | Read | Read | Read |
| Learner | Read own record | Read own marks | Read own balance |

Each user logs in with a unique ID and password. The bursar cannot see marks, and teachers cannot see fee balances, because their jobs do not require it. Only the people responsible may change data, which also protects integrity.
:::

## Threats to privacy and integrity

| Threat | Effect on privacy | Effect on integrity |
|:--|:--|:--|
| Hacking and malware | Data stolen and published or sold | Data changed or deleted |
| Staff misuse (insiders) | Records viewed or shared without reason | Records altered dishonestly |
| Human error in data entry | — | Wrong or incomplete data |
| Hardware failure, power cuts, fire | — | Data lost or corrupted |
| Lost or stolen laptops and flash drives | Data exposed | Data lost |
| Transmission errors | Interception if not encrypted | Data corrupted in transit |

**Measures that protect integrity** include **validation** (the computer checks that input is sensible), **verification** (checking that data has been copied or entered accurately), **regular backups**, access controls that stop unauthorised changes, and **audit trails** that record who changed what and when.

:::example{title="Privacy or integrity?"}
Decide whether each incident is mainly a breach of privacy or a loss of integrity.

1. A bank clerk tells a friend the balance of a customer's account: **privacy** (an unauthorised person has seen the data).
2. A power cut while saving corrupts a stock file so quantities are wrong: **integrity** (the data is no longer accurate).
3. A hacker changes exam marks in a school database: **both**. Unauthorised access breaks privacy, and the altered marks are no longer accurate.
:::

## Common mistakes

:::mistake{title="Using privacy and security as the same word"}
Privacy is the **right** to control personal data. Security means the **measures** (passwords, encryption, firewalls) used to protect data. Security measures help to keep data private.
:::

:::mistake{title="Saying validation guarantees correct data"}
Validation only checks that data is **sensible** (in range, right type). A wrong but sensible value, such as 18 instead of 81, still passes. Verification and careful checking are also needed.
:::

## Exam tips

:::exam-tip
When asked to "suggest measures" for a scenario, name the measure **and** say what it protects against: "access levels, so the receptionist cannot view test results".
:::

:::exam-tip
Learn four or five data protection principles in your own words. A principle states what the organisation must **do** with the data (collect only what is needed, keep it accurate, keep it secure, do not keep it longer than necessary).
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Data privacy and integrity are examined by ZIMSEC only. Validation and verification, which protect integrity during input, are examined by both boards and have their own lesson.
:::

## Summary

:::summary
- Personal data identifies a living person; privacy is the right to control its use, and integrity is its accuracy, completeness and consistency.
- Data protection principles: lawful and fair with consent, stated purpose only, not excessive, accurate, not kept too long, respect rights, secure, safe transfers. In Zimbabwe: Cyber and Data Protection Act [Chapter 12:07].
- Privacy measures: user accounts and strong passwords, access levels, file permissions, encryption, firewalls, policies, training and physical security.
- Integrity measures: validation, verification, backups, access controls and audit trails.
- Threats include hacking, insiders, human error, hardware failure and lost devices.
:::
