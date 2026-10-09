---
{
  "key": "software.system-application",
  "title": "System software, application software and utilities",
  "summary": "The difference between system software and application software, with examples, and what the common utility programs (anti-virus, defragmenter, disk clean-up, backup, compression, file manager) do.",
  "concepts": ["comp.software.system-application"],
  "estimatedMinutes": 30,
  "level": "core"
}
---
## Introduction

Nyasha's family shares one laptop in Masvingo. Her brother types his history assignment in a word processor, her mother keeps the accounts of her tuck-shop in a spreadsheet, and Nyasha watches revision videos in a media player. None of these programs could run without other programs that nobody in the family ever opens on purpose: the operating system that starts when the laptop is switched on, the driver that lets the printer work, and the anti-virus program that quietly checks every file that is downloaded.

Computer scientists divide software into two groups: **system software**, which runs and looks after the computer, and **application software**, which does the jobs the user wants done. Both ZIMSEC and Cambridge expect you to classify software into these groups, give examples of each and explain what utility programs do. It is one of the most reliable short-answer topics on Paper 1 and Paper 2.

## Key definitions

:::definition{term="Software"}
The programs (sets of instructions) that tell the hardware of a computer what to do, together with the data they use.
:::

:::definition{term="System software"}
Software that provides the services the computer itself needs in order to run, manage its hardware and support other programs; for example the operating system, utility programs, device drivers and translators.
:::

:::definition{term="Application software"}
Software that provides the services the user needs in order to carry out a task, such as writing a letter, keeping accounts, editing a photo or browsing the web.
:::

:::definition{term="Utility program"}
A small item of system software that performs one maintenance or housekeeping task to keep the computer secure, organised or running efficiently, such as virus checking or backing up.
:::

:::definition{term="Device driver"}
A program that tells the operating system how to communicate with a particular hardware device, such as a printer or a webcam.
:::

## System software

System software sits between the hardware and the user's applications. The user rarely works with it directly, but nothing else runs without it. The main kinds are:

- **Operating system**: manages the hardware, files, memory and users, and provides the interface and a platform on which applications run.
- **Utility programs**: housekeeping tools described below.
- **Device drivers**: translate the operating system's general commands ("print this page") into the exact signals a particular device understands.
- **Translators** (compilers, interpreters and assemblers): convert program code written by a programmer into machine code that the processor can execute.

## Application software

Application software is chosen by the user for a purpose. Typical examples are:

| Application | Typical use |
|:--|:--|
| Word processor | Letters, reports, assignments |
| Spreadsheet | Calculations, budgets, marks, charts |
| Database management software | Storing and searching records, such as a school's pupil records |
| Presentation software | Slide shows for lessons or meetings |
| Web browser | Viewing web pages |
| Graphics and photo editing software | Posters, logos, editing photographs |
| Accounting or payroll software | Invoices, wages, business accounts |
| Games and media players | Entertainment, playing video and music |

A useful test: **if the program does a task the user wants done, it is application software; if it keeps the computer itself running, secure or organised, it is system software.**

## Utility programs

Utilities are part of system software. Each one does a single maintenance job.

| Utility | What it does |
|:--|:--|
| Anti-virus (anti-malware) | Scans files and memory, compares them with known virus signatures and suspicious behaviour, and quarantines or deletes infected files; must be updated regularly |
| Disk defragmenter | Rearranges the parts (fragments) of files on a magnetic hard disk so that each file is stored in one continuous area, so the read-write heads move less and files open faster; also groups the free space together |
| Disk clean-up | Finds and removes unwanted files such as temporary files, old downloads and the contents of the recycle bin, freeing storage space |
| Backup | Copies files to another medium or location (external drive, server, cloud) so that they can be restored if the originals are lost or damaged; can be scheduled to run automatically |
| Compression | Reduces the size of files so that they take less storage space and transfer faster, for example by putting them into a compressed archive |
| File manager | Lets the user create folders, and copy, move, rename, search for and delete files |

Other utilities you may meet include firewalls, screensavers, disk formatting tools and encryption tools.

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 asks you to describe the difference between system and application software with examples, and groups the operating system and utilities as system software. ZIMSEC Form 1 asks you to identify and classify software, and Form 2 adds using utility tools to optimise a system (for example defragmenting, cleaning up and scanning a slow computer).
:::

:::example
**Classifying software.** Tatenda lists the software on the computers in the school laboratory in Gweru: a spreadsheet, the printer driver, a web browser, the operating system, a disk clean-up tool, a programming compiler and a desktop publishing package.

1. Ask of each program: does it do a task the user wants, or does it look after the computer?
2. **Application software:** the spreadsheet, the web browser and the desktop publishing package. Each one helps the user produce or view something.
3. **System software:** the operating system (runs the computer), the printer driver (lets the OS control the printer), the disk clean-up tool (a utility) and the compiler (a translator).
4. Note the compiler: although a programmer uses it deliberately, its job is to convert code into machine code, so it is classified as system software.
:::

:::example
**Choosing utilities for a slow computer.** Mr Moyo's office computer in Bulawayo has a magnetic hard disk that is 96% full, files take a long time to open, and pop-up adverts appear even when the browser is closed.

1. The pop-ups suggest malware: run the **anti-virus** utility, after updating it, and quarantine or delete what it finds.
2. The nearly full disk: run **disk clean-up** to remove temporary files and empty the recycle bin; move old files to an external drive.
3. Before deleting anything important, use the **backup** utility to copy the documents to another device.
4. Files open slowly on a magnetic disk: run the **disk defragmenter** so that each file is stored in one continuous area.
5. Defragmenting is not needed on a solid-state drive (SSD): it has no moving heads, and the extra writing shortens its life.
:::

## Common mistakes

:::mistake{title="Calling the operating system an application"}
The operating system is the most important piece of **system** software. Applications run on top of it.
:::

:::mistake{title="Saying a defragmenter frees up space"}
Defragmenting rearranges files so they are stored together; it does not delete anything. Disk clean-up and compression free up space.
:::

:::mistake{title="Saying anti-virus software 'stops all viruses'"}
Anti-virus software detects known viruses by comparing files with a database of signatures and by watching for suspicious behaviour. It must be updated to recognise new threats.
:::

:::mistake{title="Confusing backup with saving"}
Saving stores the working copy. A backup is a **second copy** kept on a different device or in a different place, so that the data can be restored.
:::

## Exam tips

:::exam-tip
"**Describe** the difference between system and application software" needs both halves: system software provides services the **computer** needs (run and manage the hardware); application software provides services the **user** needs (carry out a task). Add one example of each.
:::

:::exam-tip
When asked what a utility does, give its **action and the benefit**: "a defragmenter moves the parts of each file so they are stored next to each other, so files are read faster".
:::

## Summary

:::summary
- Software is divided into system software (looks after the computer) and application software (does the user's tasks).
- System software includes the operating system, utility programs, device drivers and translators.
- Application software includes word processors, spreadsheets, databases, browsers, graphics and accounting packages.
- Utilities each do one maintenance job: anti-virus, defragmenter, disk clean-up, backup, compression and file manager.
- Defragment only magnetic hard disks; keep anti-virus software updated; keep backups on a separate device.
:::
