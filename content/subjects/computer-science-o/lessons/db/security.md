---
{
  "key": "db.security",
  "title": "Keeping a database secure",
  "summary": "How a database is protected: user accounts and passwords, access rights and views that limit what each user can see and do, encryption of stored and transmitted data, backups and restoring, and audit trails that record every change.",
  "concepts": ["comp.db.security"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A secondary school in Bulawayo keeps learners' marks, fees, medical notes and staff salaries in one database. A learner who could change marks, a visitor who could read medical notes, or a power cut that wiped a term's records would all be serious problems. The data is also personal: under Zimbabwe's Cyber and Data Protection Act [Chapter 12:07], organisations that hold personal information are expected to keep it secure and use it only for proper purposes.

Database security means protecting data from being seen, changed or destroyed by the wrong people, whether by accident or on purpose, and being able to recover it if something goes wrong. ZIMSEC asks you to apply security controls to databases in Forms 2, 3 and 4. In the theory paper you must name each control, describe how it works and explain which threat it reduces.

## Key definitions

:::definition{term="User account"}
A record of an authorised user, with a unique username and a password, which the database checks before allowing access.
:::

:::definition{term="Access rights"}
The permissions given to a user or group, stating which tables, queries, forms or reports they may use and whether they may only read data or also add, change and delete it.
:::

:::definition{term="View"}
A saved query that shows users only selected fields and records of a table, so that the rest of the data is hidden from them.
:::

:::definition{term="Encryption"}
Scrambling data with a key so that it cannot be understood without the matching key to decrypt it.
:::

:::definition{term="Backup"}
A copy of the database stored separately, so that the data can be restored if the original is lost or damaged.
:::

:::definition{term="Audit trail"}
A log that automatically records who accessed or changed data, what was changed and when.
:::

## Controlling who gets in: accounts and passwords

Every user has a **user account** with a unique username and a password. The database refuses anyone who cannot give a valid pair. Good practice:

- passwords that are long and hard to guess, changed if they may have been seen, and never shared;
- the account locked after a few failed attempts, which stops someone trying password after password;
- separate accounts for each person, so that every action can be traced to one user;
- accounts of people who have left removed promptly.

## Controlling what users can do: access rights

Once a user is in, **access rights** decide what they may do. Rights are usually given to groups (roles), so that every teacher gets the same permissions without setting them one by one.

| Role | Learners table | Marks table | Fees table | Database design |
|:--|:--|:--|:--|:--|
| Teacher | read only | read and edit | no access | no access |
| Bursar | read only | no access | read and edit | no access |
| Database administrator | full | full | full | full |
| Learner (portal) | own record only | own marks, read only | own balance, read only | no access |

This follows the **principle of least privilege**: each user gets only the rights needed for their job. Read-only access lets a user look but not change; edit rights allow changes; only the administrator can change the structure of tables or delete objects.

## Views: hiding fields and records

A **view** is a saved query that users are given **instead of** the table. They can see only what the view selects.

:::worked-solution[A view that hides salaries]
The school's `Staff` table holds a salary for every member of staff.

| StaffID | StaffName | Department | Extension | Salary |
|:-:|:-:|:-:|:-:|:-:|
| ST-A | R. Mutasa | Science | 214 | 910 |
| ST-B | T. Ncube | Languages | 207 | 870 |
| ST-C | C. Mpofu | Science | 219 | 940 |
| ST-D | F. Banda | Bursary | 230 | 820 |

Every teacher needs to look up telephone extensions, but salaries must stay private. The administrator creates a view:

```
CREATE VIEW StaffDirectory AS
SELECT StaffName, Department, Extension
FROM Staff;
```

Teachers are given read access to `StaffDirectory` and no access to `Staff`. When they open the view they see:

| StaffName | Department | Extension |
|:-:|:-:|:-:|
| R. Mutasa | Science | 214 |
| T. Ncube | Languages | 207 |
| C. Mpofu | Science | 219 |
| F. Banda | Bursary | 230 |

1. StaffID and Salary are not selected, so they never appear.
2. A WHERE clause could also hide records, for example `WHERE Department = 'Science'` for a head of science.
3. The view holds no copy of the data: it always shows the current values in `Staff`.
:::

## Encryption

Encryption protects data that is stolen or intercepted. **Encryption at rest** scrambles the database file, so a stolen laptop or backup drive is useless without the key. **Encryption in transit** scrambles data travelling over a network, for example between a web form and the server. Passwords themselves should be stored only in a scrambled one-way form (hashed), never as plain text, so that even the administrator cannot read them.

## Backups and recovery

Security also means being able to recover. A **full backup** copies the whole database; an **incremental backup** copies only the data changed since the previous backup, which is quicker and smaller. Good practice is to back up regularly and automatically, keep at least one copy **off-site** or in the cloud (so a fire or theft does not destroy both), encrypt the copies, and test from time to time that a backup really can be restored.

:::example{title="Restoring after a failure"}
The school makes a full backup every Sunday night and an incremental backup every other night of the week. On Thursday afternoon the server's disk fails.

- First restore the full backup from Sunday night.
- Then apply the incremental backups from Monday, Tuesday and Wednesday nights, in that order. Each holds only one day's changes, so none can be skipped.
- That is 4 backups in all. Work entered on Thursday, before the failure, is lost and must be re-entered from paper records or the audit trail.
:::

## Audit trails

An **audit trail** records each login and each change: the user, the date and time, the record, and the old and new values. It does not stop a change happening, but it deters misuse (users know their actions are recorded), shows who made a wrong change, and allows the old value to be put back.

## Common mistakes

:::mistake{title="Saying a backup prevents data loss"}
A backup does not stop data being lost or damaged; it allows the data to be **restored** afterwards.
:::

:::mistake{title="Confusing access rights with passwords"}
A password checks **who** the user is. Access rights decide **what** that user may see and do once logged in.
:::

:::mistake{title="Thinking encryption stops data being stolen"}
Encrypted data can still be copied; encryption makes it **unreadable** to anyone without the key.
:::

## Exam tips

:::exam-tip
Match the control to the threat: passwords stop unauthorised access, access rights and views stop authorised users seeing or changing too much, encryption protects stolen or intercepted data, backups allow recovery, and an audit trail traces who changed what.
:::

:::exam-tip
For *describe* questions, say how the control works, not just its name: "a view shows only the name, department and extension fields, so salaries are hidden" earns more than "use a view".
:::

## Summary

:::summary
- User accounts with strong, unshared passwords control who can log in.
- Access rights, given by role, control what each user can read, edit or delete (least privilege).
- Views show users only selected fields and records, hiding the rest.
- Encryption makes stored or transmitted data unreadable without the key; passwords are stored hashed.
- Regular full and incremental backups, kept off-site and tested, allow recovery; audit trails record who changed what and when.
:::
