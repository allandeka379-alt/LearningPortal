---
{
  "key": "security.risk-recovery-policies",
  "title": "Risk management, disaster recovery and security policies",
  "summary": "Identifying risks to computer systems, scoring them by likelihood and impact, the four ways of managing a risk, a disaster recovery plan with backup schedules, off-site copies and hot, warm and cold sites, and what a security policy contains.",
  "concepts": ["acs.security.risk-recovery-policies"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A secondary school in Bulawayo keeps its learner records, fees and examination marks on one office computer. During one term the power fails several times a week, a laptop is stolen from the staffroom and a clerk deletes a folder by mistake. None of this was planned for. A school that has thought about such events in advance can decide which ones matter most, take sensible precautions and know exactly what to do when something goes wrong.

That is the purpose of **risk management** and **disaster recovery**. Risk management decides what could go wrong and what to do about it. A disaster recovery plan describes how to get the system working again after a failure. A **security policy** writes down the rules that staff must follow. You should already know the threats and protection methods from the earlier lessons.

## Key definitions

:::definition{term="Risk"}
The chance that a threat will exploit a vulnerability, together with the harm that would result. It is judged by how likely the event is and how serious its impact would be.
:::

:::definition{term="Risk management"}
Identifying, analysing and deciding what to do about the risks to a system so that the remaining risk is acceptable.
:::

:::definition{term="Disaster recovery plan"}
A documented set of actions to restore the computer systems and data of an organisation after a failure or disaster, and to keep essential work going meanwhile.
:::

:::definition{term="Security policy"}
A written statement of the rules, responsibilities and procedures that an organisation uses to protect its information and systems.
:::

## Identifying and analysing risks

Typical risks to computer systems are fire and flood, power cuts and load-shedding, theft, malware and hackers, equipment failure, and mistakes by staff. A **risk analysis** gives each risk a score for how *likely* it is and how bad its *impact* would be. A simple method uses a scale of 1 to 5 for each and multiplies them. In this lesson, a score of 1 to 5 is Low, 6 to 12 is Medium and 15 to 25 is High.

:::worked-solution{title="Scoring the risks of a school"}
| Risk | Likelihood (1-5) | Impact (1-5) | Score | Level |
|---|---|---|---|---|
| Malware infection | 4 | 4 | 16 | High |
| Power cuts and load-shedding | 5 | 2 | 10 | Medium |
| Staff deleting files by mistake | 4 | 3 | 12 | Medium |
| Theft of a laptop | 3 | 3 | 9 | Medium |
| Flood in the server room | 1 | 4 | 4 | Low |
| Fire | 1 | 5 | 5 | Low |

1. Score = likelihood × impact, for example malware: 4 × 4 = 16.
2. The highest score, malware, is dealt with first.
3. Fire and flood score low because they are unlikely, but their impact is serious, so a backup kept off-site is still sensible: the score decides priority, not whether to ignore a risk.
:::

## Techniques of risk management

| Technique | Meaning | Example |
|---|---|---|
| **Avoid** | Remove the activity that causes the risk | Do not keep the server on the ground floor of a building that floods |
| **Reduce** | Take steps to make the risk less likely or less serious | Install anti-malware software, train staff, add a surge protector |
| **Transfer** | Pass the financial effect to someone else | Insure the equipment, or keep data with a cloud provider that has its own protection |
| **Accept** | Decide the risk is small enough to live with | Accept the very low risk of a flood, with off-site backups as a safety net |

:::worked-solution{title="Is a power protection device worth buying?"}
A shop loses sales of US\$120 for every hour its computer is down. Each power cut stops work for 6 hours and there are 4 cuts a year. An uninterruptible power supply (UPS) costing US\$150 a year in cost and upkeep would prevent 3 of the 4 stoppages.

1. Loss per cut = 120 × 6 = US\$720.
2. Loss per year without a UPS = 720 × 4 = US\$2,880.
3. With a UPS only one cut still stops work: 720 × 1 = US\$720.
4. Saving = 2,880 − 720 = US\$2,160.
5. Net benefit = 2,160 − 150 = US\$2,010 a year, so the risk should be *reduced* with a UPS.
:::

## Disaster recovery

A good plan covers the following.

1. **Backup schedule.** What is copied, how often and by what method. A *full* backup copies everything; an *incremental* backup copies only what has changed since the last backup. Daily incremental backups lose at most a day of work.
2. **Off-site and cloud copies.** A copy kept in another building or town, or with a cloud service, survives a fire, flood or theft at the main site.
3. **Alternative site.** A place to work if the main building cannot be used.
4. **Restore procedure and testing.** Who restores, in what order and how it is tested. A backup that has never been restored may not work.
5. **Roles and contacts.** Who decides, who contacts staff and suppliers.

| Alternative site | Description | Speed of recovery | Cost |
|---|---|---|---|
| **Hot site** | Fully equipped, running and up to date with the data | Fastest | Highest |
| **Warm site** | Has equipment but needs data restored and set-up | Slower | Medium |
| **Cold site** | Only space, power and connections; equipment must be brought in | Slowest | Lowest |

:::worked-solution{title="Planning backups and a restore"}
A school makes a full backup of 40 GB every Sunday and an incremental backup of 2 GB on each of the other six days. It keeps four weeks of backups.

1. Storage = 4 × 40 + 4 × 6 × 2 = 160 + 48 = 208 GB.
2. If a full backup were made every day, 4 × 7 × 40 = 1120 GB would be needed, so the incremental plan saves storage.
3. The disk fails on Thursday morning. To restore, the school needs the Sunday full backup and the incrementals of Monday, Tuesday and Wednesday: 40 + 3 × 2 = 46 GB.
4. Assume 1 GB = 1024 MB and a restore speed of 100 MB per second: 46 × 1024 = 47,104 MB, and 47,104 ÷ 100 = 471.04 seconds, about 7.9 minutes.
5. The most work that can be lost is the work done since Wednesday night, about one day.
:::

## Security policies

A security policy usually contains:

- **Acceptable use**: what staff and learners may and may not do with computers and the internet.
- **Access control**: who may use which systems, password rules and how accounts are created and removed.
- **Data handling**: how personal data is stored, shared and deleted.
- **Backup and recovery**: a reference to the disaster recovery plan.
- **Incident response**: how to report and deal with a security incident.
- **Training and discipline**: staff are trained and told the consequences of breaking the rules.

:::example{title="Applying the ideas to a clinic"}
A rural clinic keeps patient records on one computer. The manager lists the risks (power cuts, theft, malware, staff error), scores them and decides to reduce the high ones with a UPS, an anti-malware tool and weekly training, to transfer the risk of theft by insuring the laptop, and to accept the very low risk of a flood. She writes a disaster plan with a daily incremental backup copied each Friday to a cloud service, and she tests a restore every term. Finally she writes a one-page policy that every member of staff signs.
:::

:::keyfact{title="ZIMSEC only"}
This topic is in the ZIMSEC syllabus (risk management techniques, disaster recovery methods, security policies and securing data at off-site locations). Cambridge does not examine it, though its ideas support the backup and access control points in Cambridge security. The scoring scale and the bands above are a teaching convention: use the scale an exam question gives.
:::

## Common mistakes

:::mistake{title="Treating backup as the whole disaster recovery plan"}
A backup is one part. A plan also needs an alternative site or equipment, a restore procedure that has been tested, and named people with roles.
:::

:::mistake{title="Confusing risk transfer with risk avoidance"}
Insuring a laptop does not remove the chance of theft; it transfers the financial loss. Avoiding the risk means not doing the risky thing.
:::

:::mistake{title="Ignoring low-likelihood events"}
A fire may be unlikely, but its impact is serious, so a copy of the data kept off-site is still needed.
:::

## Exam tips

:::exam-tip
ZIMSEC Paper 1 asks you to *list* risks, *explain* a risk management technique with an example, *describe* the parts of a disaster recovery plan or *state* what a security policy contains. A scenario question wants answers that fit the organisation: name the risk, then the measure and what it achieves. Write "hot, warm and cold" with a difference in speed and cost, not just three names. Calculation parts use the data in the question: show each step.
:::

## Summary

:::summary
- A risk is judged by likelihood and impact; a score such as likelihood × impact ranks the risks.
- Risks are avoided, reduced, transferred or accepted.
- A disaster recovery plan includes backups (full and incremental), off-site or cloud copies, an alternative site, a tested restore procedure and named roles.
- Hot sites recover fastest and cost most; cold sites are cheapest and slowest; warm sites are in between.
- A security policy sets acceptable use, access control, data handling, incident response and staff training.
:::
