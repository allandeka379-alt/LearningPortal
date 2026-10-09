---
{
  "key": "software.operating-systems",
  "title": "Operating systems and their functions",
  "summary": "The role of an operating system and its functions: managing files, memory, peripherals and drivers, multitasking, interrupts, user accounts and security, providing an interface and a platform for applications; personal computer and mobile operating systems compared.",
  "concepts": ["comp.software.operating-systems"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

When Thandeka switches on the computer in her school library in Bulawayo, she sees a login screen, types her username and password, and then sees her own desktop with her own files. She opens a browser and a word processor at the same time, prints a page and saves her work to a flash drive. Every one of those steps is handled by one program she never thinks about: the **operating system** (OS).

The operating system is the most important piece of system software. Cambridge 0478 asks you to describe its role and its basic functions; ZIMSEC Form 3 asks you to explain its functions and to compare personal computer and mobile operating systems. Exam questions often name a situation ("a user plugs in a printer", "two programs are open") and ask which OS function is being used.

## Key definitions

:::definition{term="Operating system (OS)"}
System software that manages the computer's hardware and software resources, provides an interface for the user and provides a platform on which application software runs.
:::

:::definition{term="Multitasking"}
The ability of the operating system to run more than one program (process) apparently at the same time, by sharing the processor's time and the memory between them.
:::

:::definition{term="User interface"}
The means by which the user and the computer communicate, for example a graphical user interface with windows, icons, menus and a pointer, or a command line interface where commands are typed.
:::

:::definition{term="Peripheral"}
A hardware device connected to the computer, such as a printer, keyboard, scanner or external drive.
:::

## Why a computer needs an operating system

Without an OS, every application would need to contain its own instructions to drive the screen, read the keyboard, store files on the disk and share memory with other programs. The OS does these jobs once, for everyone. Applications ask the OS for a service ("save this file", "print this page") and the OS carries it out on the hardware. This is why the OS is described as providing a **platform for running applications**.

## Functions of an operating system

| Function | What the OS does |
|:--|:--|
| Managing files | Organises files in folders (directories); lets users create, open, save, copy, move, rename and delete files; keeps track of where each file is stored on the storage device |
| Managing memory | Allocates parts of RAM to each running program and frees them when a program closes; keeps programs from using each other's memory; moves data between RAM and secondary storage (virtual memory) when RAM is full |
| Managing peripherals and drivers | Communicates with input, output and storage devices through their device drivers; detects new devices (plug and play); queues print jobs in a buffer |
| Managing multitasking | Shares processor time between running programs (processes), switching rapidly between them so that they all appear to run at once, and decides which process runs next |
| Handling interrupts | Responds to signals from hardware or software that need attention (a key press, a full print buffer, an error), pausing the current task and dealing with the event |
| Providing an interface | Lets the user give commands and see results, through a graphical user interface (GUI) or a command line interface (CLI) |
| Providing a platform for applications | Gives applications a standard way to use the hardware, so they do not have to control it directly |
| Providing system security | Requires passwords or other authentication, controls access rights to files, applies security updates and may include a firewall |
| Managing user accounts | Lets several people use one computer with their own username, password, files and settings, and gives different users different access rights |

### Interfaces

A **graphical user interface** (GUI) uses windows, icons, menus and a pointer; it is easy to learn, needs little typing and suits most users, but uses more memory and processing power. A **command line interface** (CLI) requires the user to type commands; it uses fewer resources and gives an expert direct control, but the commands must be learned exactly. Touch-screen phones use a GUI controlled by taps and swipes.

### Two functions in more detail

**Memory management.** When Thandeka opens a program, the OS finds a free area of RAM, loads the program into it and records which area belongs to which program. If a program tried to write into another program's area, the OS would stop it, so one faulty program cannot corrupt the others. When she closes the program, its memory is freed for re-use. If RAM fills up, the OS can move parts of programs that are not being used to secondary storage (**virtual memory**), although this slows the computer down.

**Peripheral management.** A printer is much slower than the processor. The OS places each document in a queue (a print spool) and sends it to the printer's buffer a section at a time, so the user can carry on working while printing continues.

## Personal computer and mobile operating systems

:::keyfact{title="ZIMSEC and Cambridge"}
Cambridge 0478 lists the functions in the table above and does not ask you to compare kinds of operating system. ZIMSEC Form 3 also asks you to **compare personal computer and mobile operating systems**, described generically below.
:::

| Feature | Personal computer (desktop or laptop) OS | Mobile (smartphone or tablet) OS |
|:--|:--|:--|
| Interface | Windows, mouse and keyboard; some touch | Touch screen, gestures, voice assistant |
| Applications | Installed from many sources; large programs such as design and programming tools | Apps installed mostly from an app store; smaller apps |
| Multitasking | Many windows open side by side | Usually one or two apps on screen; background apps are paused to save power |
| Power management | Less strict (often mains-powered) | Strict, to make the battery last |
| Connectivity | Wired network, Wi-Fi, USB devices | Mobile data, Wi-Fi, Bluetooth, GPS built in |
| Hardware | Wide range of hardware and peripherals | Designed for the phone's own hardware (camera, sensors, telephone) |
| Security | User accounts, anti-malware, firewall | App permissions, screen lock (PIN, fingerprint, face), remote wipe |

:::example
**Identifying OS functions.** Tendai uses the school computer. Which OS function deals with each event?

1. He types his username and password: **managing user accounts** and **system security** (authentication).
2. He opens a spreadsheet and a browser and switches between them: **multitasking** (processor time shared) and **managing memory** (each program is given its own area of RAM).
3. He plugs in a new printer and it works after a few seconds: **managing peripherals and drivers** (the device is detected and its driver loaded).
4. He saves his work in a folder called *Projects*: **managing files**.
5. He presses a key while the spreadsheet is recalculating, and the letter still appears: **handling interrupts**.
:::

:::example
**Comparing operating systems.** Nyasha uses a laptop at school and a smartphone at home. She notices that the phone closes apps she has not used for a while, but the laptop keeps them running.

1. The phone's OS is a **mobile OS** that manages memory and power strictly, because the phone has limited RAM and runs on a battery.
2. Pausing or closing background apps frees memory and reduces battery use.
3. The laptop's OS assumes more memory and often a mains supply, so it keeps many programs open in separate windows.
4. Both still carry out the same core functions: file, memory, peripheral, process, security and user management.
:::

## Common mistakes

:::mistake{title="Saying the OS 'stores the files'"}
Files are stored on secondary storage. The OS **manages** them: it keeps track of where they are and lets users organise them.
:::

:::mistake{title="Saying multitasking means doing two things at exactly the same time"}
A single processor core switches between processes very quickly, so they **appear** to run at the same time.
:::

:::mistake{title="Listing applications as OS functions"}
"Browsing the internet" and "typing letters" are tasks of applications. The OS provides the platform they run on.
:::

## Exam tips

:::exam-tip
For "**describe** the functions of an OS", name each function and add what it involves: "manages memory: allocates RAM to each program and stops programs overwriting each other's data". A bare list of names usually earns fewer marks.
:::

:::exam-tip
In scenario questions, link the event to the function: plugging in a device → peripherals and drivers; logging in → user accounts and security; two programs open → multitasking and memory.
:::

## Summary

:::summary
- The operating system manages hardware and software resources, provides an interface and a platform for applications.
- Functions: managing files, memory, peripherals and drivers, multitasking, interrupts, user accounts and security; providing an interface and a platform.
- A GUI is easy to use but resource-hungry; a CLI is efficient but needs commands to be learned.
- Mobile operating systems are touch-based, app-store-based and strict about power and memory; PC operating systems run larger software and more windows.
:::
