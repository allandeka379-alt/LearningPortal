---
{
  "key": "systems.computerised",
  "title": "Computerised accounting systems: use, advantages, disadvantages and data security",
  "summary": "How a computerised system records and reports transactions, its advantages and disadvantages against a manual system, and the controls that keep accounting data secure.",
  "concepts": [
    "aacc.systems.computerised"
  ],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

Chipo's tuck shop in Masvingo used to record every sale in a notebook. As her business grew to supply three nearby schools, she began to use accounting software on a laptop. The programme posts each sale to the ledgers automatically, produces a trial balance in seconds and calculates her ratios. It also brings new risks: a power cut, a virus or a dishonest employee can damage her data very quickly.

This lesson is for Cambridge Paper 1 and Paper 2 candidates. No specific software is examined. You should already know the manual double-entry system and the books of prime entry.

:::keyfact{title="ZIMSEC and Cambridge terms"}
**Cambridge only (AS Level).** ZIMSEC lists information and communication technology only as a teaching resource, so this topic is not examined by ZIMSEC. Cambridge uses **books of prime entry**, **trade receivables** and **trade payables**; the questions ask about any computerised accounting system without naming a product.
:::

## Key definitions

:::definition{term="Computerised accounting system"}
A system in which software records transactions, posts them to the ledgers and produces reports such as a trial balance, financial statements and ratios.
:::

:::definition{term="Access levels"}
Different rights given to different users (for example enter data, approve, view only) so that each person can do only the tasks that match their job.
:::

:::definition{term="Backup"}
A copy of the data stored separately so that the business can recover if the original is lost or damaged.
:::

:::definition{term="Audit trail"}
A record kept by the system of who entered or changed each item, when it was done and what the old and new values were.
:::

## How a computerised system works

1. Transactions are keyed in once from source documents (invoices, receipts, cheques), usually into the equivalent of the books of prime entry.
2. The software checks each entry (for example that debits equal credits, or that the customer account exists).
3. It posts to the sales, purchases and general ledgers automatically.
4. At any time it produces the trial balance, statements, ageing reports for receivables and payables, and ratios.

### Controls over data entry

The software can check what is typed in. A **range check** rejects an invoice date outside the current period, a **type check** refuses letters in an amount, and a **presence check** insists that a customer code is entered. Batch totals (the total of a group of invoices worked out by hand) are compared with the total in the system after entry. These checks reduce keying errors, but they cannot tell whether a correct-looking amount is the right amount, so source documents must still be checked by a person.

## Advantages and disadvantages against a manual system

| Advantages | Disadvantages |
| --- | --- |
| Speed: posting, balancing and reports are produced almost at once | Cost of hardware, software, licences and upgrades |
| Accuracy: arithmetic errors and one-sided entries are prevented by the software | Training staff, and resistance to change |
| Reports and ratios are available whenever they are needed | Dependence on electricity and equipment; system failure stops work |
| Data can be stored and searched easily | Hacking, viruses and unauthorised access |
| Fewer staff may be needed for routine tasks | Data entry errors are still possible and are posted quickly (garbage in, garbage out) |

:::worked-solution[Example 1: comparing the cost of a manual and a computerised system]
Chipo employs two bookkeepers on a manual system. She is considering a computer with accounting software and one bookkeeper. The estimates are illustrative.

| Annual cost | US\$ |
| --- | ---: |
| **Manual system** |  |
| Two bookkeepers (US\$300 a month each) | 7,200 |
| Ledgers, stationery and storage | 240 |
| Total manual | 7,440 |
| **Computerised system** |  |
| One bookkeeper (US\$300 a month) | 3,600 |
| Depreciation of computer (US\$2,400 over 3 years) | 800 |
| Software licence for the year | 360 |
| Backup storage | 120 |
| Training (US\$450 spread over 3 years) | 150 |
| Electricity and internet | 480 |
| Total computerised | 5,510 |
| Annual saving from computerising | 1,930 |

1. The computerised system is estimated to save US\$1,930 a year.
2. Non-financial factors favour the computer: faster reports and fewer arithmetic errors.
3. Against this, the shop must find a way to keep working during power cuts, protect the data, and train the remaining bookkeeper. A decision should consider these risks and not only the saving.
:::

## Keeping data secure

| Risk | Control |
| --- | --- |
| Unauthorised access | Passwords, changed regularly; access levels; log-off after use |
| Loss of data (hardware failure, fire, theft) | Regular backups kept in another place; physical security of the equipment |
| Interception of data | Encryption of stored and transmitted data |
| Hackers and malicious software | Firewall and anti-virus software kept up to date |
| Fraud or unauthorised changes | Audit trail; segregation of duties through access levels |

:::worked-solution[Example 2: access levels and segregation of duties]
The shop has four users with these rights.

| User | Can enter transactions | Can approve payments | Can change supplier bank details | Can view all reports |
| --- | --- | --- | --- | --- |
| Bookkeeper | Yes | No | No | No |
| Accounts supervisor | No | Yes | No | Yes |
| Finance manager | No | Yes | Yes | Yes |
| Owner | No | Yes | No | Yes |

1. The bookkeeper can enter invoices but cannot approve payments or change supplier details, so one person cannot create a false invoice and pay it.
2. Only the finance manager can change supplier bank details, a high-risk action.
3. The owner can approve payments and view reports but cannot enter data, which separates approval from recording.
:::

:::worked-solution[Example 3: using an audit trail to find a fraud risk]
A part of the system's audit trail shows these entries.

| Time | User | Action | Old value | New value |
| --- | --- | --- | --- | --- |
| Tue 16:05 | Bookkeeper | Entered supplier invoice AB-1042 | - | US\$4,850 |
| Tue 22:45 | Bookkeeper | Changed bank details of supplier AB | Mutare Bank | A new bank account |
| Wed 08:10 | Finance manager | Approved payment of invoice AB-1042 | - | US\$4,850 |
| Wed 08:12 | System | Payment sent to bank account on file | - | US\$4,850 |

1. The bookkeeper changed the bank details of a supplier at 22:45, outside working hours, a few hours before a payment was approved.
2. The payment of US\$4,850 was sent to the new account, not to the supplier's usual bank.
3. The audit trail shows who made the change and when, which allows the business to investigate. It also shows a control failure: the bookkeeper should not have had access to change bank details. The access levels must be reviewed.
:::

## Backups

A good backup plan has more than one copy, kept on different media, with at least one copy away from the premises. Backups should be made regularly (for example daily), and tested by restoring a file occasionally to check that the copy works. Passwords, backups and access levels should be reviewed when staff join or leave.

## Common mistakes

:::mistake{title="Saying a computer eliminates all errors"}
The software prevents arithmetic errors, but incorrect data keyed in is posted accurately. Errors of principle, omission and original entry remain possible.
:::

:::mistake{title="Naming a product"}
Questions are about any computerised system. Describe features, not brand names.
:::

:::mistake{title="Listing security measures without saying what they protect against"}
Link each control to a risk: backups protect against loss; passwords protect against unauthorised access.
:::

:::mistake{title="Forgetting the costs"}
An evaluation should weigh hardware, software, training and security costs as well as the benefits.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 asks for a definition or one advantage or disadvantage. Paper 2 asks you to **explain** or **evaluate** the use of a computerised system, usually for a small business described in the stem. Give a benefit, a risk and a recommendation tied to the business.
:::

:::exam-tip
When asked for **security measures**, give at least two, each with the risk it deals with. Passwords and access levels, backups, encryption, firewalls and anti-virus software, audit trails and physical security are the standard list.
:::

## Summary

:::summary
- A computerised system records transactions once, posts to the ledgers automatically and produces reports on demand.
- Advantages: speed, accuracy, available reports; disadvantages: cost, training, dependence, hacking, system failure.
- Data is protected by passwords and access levels, backups, encryption, firewalls, anti-virus software, audit trails and physical security.
- An audit trail records who changed what and when, and helps to detect fraud.
- Evaluations weigh the benefits against the costs and risks for the particular business.
:::
