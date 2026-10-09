---
{
  "key": "security.backup-recovery",
  "title": "Backups and disaster recovery",
  "summary": "Why and how files are backed up (full and incremental backups; on-site, off-site and cloud storage), how data is restored with recovery tools, and what a disaster recovery plan contains.",
  "concepts": ["comp.security.backup-recovery"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

On a Thursday morning, the server at a hardware wholesaler in Gweru will not start: its hard disk has failed. Every invoice, customer account and stock record is on that disk. If the business has a recent backup and a plan for what to do, it can be trading again by lunchtime. If not, it may never recover its records of who owes it money.

Data can be lost through hardware failure, power surges, malware such as ransomware, theft, fire, floods and simple mistakes like deleting the wrong folder. ZIMSEC Form 4 asks you to back up files, formulate a disaster recovery plan and use data recovery tools. Paper 2 questions often give an organisation and ask you to recommend a backup method, explain where backups should be stored, or list the contents of a disaster recovery plan.

## Key definitions

:::definition{term="Backup"}
A copy of data (and sometimes programs and settings) kept separately from the original so that the data can be restored if the original is lost or damaged.
:::

:::definition{term="Full backup"}
A backup that copies all the selected files every time it runs, whether or not they have changed.
:::

:::definition{term="Incremental backup"}
A backup that copies only the files that have changed since the last backup of any type.
:::

:::definition{term="Data recovery"}
Restoring lost, deleted or damaged data, either from a backup or by using recovery software on the damaged storage device.
:::

:::definition{term="Disaster recovery plan"}
A written, tested plan that states how an organisation will protect its data and systems and how it will restore them and continue working after a disaster.
:::

## Backup methods

| | Full backup | Incremental backup |
|:--|:--|:--|
| What is copied | Every selected file | Only files changed since the last backup |
| Time to back up | Longest | Short |
| Storage needed | Most | Least |
| Time to restore | Quickest: one backup set | Slower: the last full backup **plus every incremental since**, in order |

Most organisations combine them: a **full backup weekly** and an **incremental backup every day**. Backups should be scheduled to run automatically (often at night, when the system is not busy) and should be **tested** by restoring a sample of files, because a backup that cannot be restored is useless.

:::worked-solution[Which backups are needed to restore?]
A school office makes a full backup every Friday evening and an incremental backup every Monday to Thursday evening. The server fails on Thursday afternoon, before Thursday's backup has run. Which backups must be restored, and in what order?

1. Start from the most recent full backup: Friday's.
2. Then restore each incremental backup made after it, oldest first: Monday's, Tuesday's, Wednesday's.
3. Total: 1 full + 3 incremental = 4 backup sets.
4. Work done on Thursday before the failure is lost, because it had not yet been backed up.
:::

## Where backups are kept

| Location | Examples | Advantages | Disadvantages |
|:--|:--|:--|:--|
| On-site | External hard disk or NAS in the same building | Fast to back up and restore; no internet needed | Destroyed or stolen with the original in a fire, flood or burglary |
| Off-site | Disks taken to another branch or a fireproof safe elsewhere | Survives a disaster at the main site | Takes time to fetch; media must be moved securely |
| Cloud | An online backup service's servers | Automatic; off-site; accessible from anywhere; storage can grow | Needs reliable internet; subscription cost; data held by a third party (encrypt it) |

A widely used rule is to keep **three** copies of important data, on **two** different types of media, with **one** copy off-site. Backups containing personal data should be **encrypted** and stored securely, because a stolen backup is as damaging as a stolen original.

## Restoring data with recovery tools

- **Restore from backup**: backup software copies the backed-up files back to the original or a new device.
- **Recycle bin / trash**: recently deleted files can be restored if the bin has not been emptied.
- **File recovery software**: when a file is deleted, the operating system usually marks its space as free but does not wipe it. Recovery software scans the disk and rebuilds files whose data has not yet been overwritten, so the device should **not be used** until recovery is attempted.
- **System restore points / version history**: return system settings or a document to an earlier saved state.
- **Disk repair utilities**: check a disk for errors and repair the file system.
- **Professional data recovery services**: for physically damaged drives.

## The disaster recovery plan

A disaster recovery plan typically contains:

1. **Risk assessment**: the threats (fire, flood, theft, power cuts, malware, hardware failure) and how likely and serious each is.
2. **Critical systems and data**: which systems must be restored first.
3. **Backup policy**: what is backed up, how often, by which method, and where copies are stored.
4. **Recovery procedures**: step-by-step instructions for restoring systems and data, and the target time for each.
5. **Roles and contacts**: who is responsible for each task, with phone numbers of staff, suppliers and the backup provider.
6. **Alternative arrangements**: standby equipment, a backup site, a generator or UPS.
7. **Testing and review**: how often the plan is rehearsed and updated.

:::example{title="A plan for a small business"}
Rudo's Print Shop (fictional) in Mutare designs posters for clients.

- **Risks:** frequent power cuts, ransomware from email attachments, theft of laptops.
- **Prevention:** a UPS and a generator; anti-malware and staff training; locked office.
- **Backups:** automatic incremental backups every night to an external disk, a full backup every Saturday, and an encrypted copy in a cloud backup service.
- **Recovery:** if ransomware strikes, disconnect the computers, wipe and reinstall them, then restore Saturday's full backup and the incrementals since, from the cloud copy (the external disk may also be infected).
- **Roles:** Rudo leads recovery; her technician restores the systems; client contact numbers are kept on paper as well.
- **Testing:** restore a sample folder every month and review the plan every six months.
:::

## Common mistakes

:::mistake{title="Keeping the only backup next to the computer"}
A backup in the same room is destroyed by the same fire or taken by the same thief. At least one copy must be off-site or in the cloud.
:::

:::mistake{title="Mixing up incremental and full restores"}
To restore from incremental backups you need the last **full** backup **and every incremental** made after it, not just the latest incremental.
:::

:::mistake{title="Confusing backup with archive"}
A backup is a copy kept in case of loss; an archive moves old data that is no longer in daily use to separate storage, often removing it from the main system.
:::

## Exam tips

:::exam-tip
When recommending a backup strategy, cover **what** (method), **when** (frequency), **where** (off-site or cloud) and **how it is checked** (test restores).
:::

:::exam-tip
For "contents of a disaster recovery plan", list headings such as risk assessment, backup policy, recovery procedures, responsibilities and testing, and add a short explanation of each.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
Backups and disaster recovery are examined by ZIMSEC only. Cambridge 0478 mentions backups briefly as a way to protect data from loss within cyber security.
:::

## Summary

:::summary
- A backup is a separate copy of data used to restore it after loss.
- Full backups copy everything (slow to make, quick to restore); incremental backups copy only changes since the last backup (quick to make, slower to restore).
- Store backups on-site for speed and off-site or in the cloud for safety; encrypt them and test restores.
- Recovery tools: restore from backup, recycle bin, file recovery software, restore points, disk utilities.
- A disaster recovery plan covers risks, critical systems, backup policy, recovery steps, roles, alternative arrangements and testing.
:::
