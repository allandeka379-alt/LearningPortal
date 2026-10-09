---
{
  "key": "hardware.maintenance",
  "title": "Hardware and software maintenance and troubleshooting",
  "summary": "The parts of a personal computer and how it is assembled; common faults with software, keyboards, mice, hard drives and memory and how to diagnose and fix them; replacing faulty components safely; and preventive maintenance.",
  "concepts": ["comp.hardware.maintenance"],
  "estimatedMinutes": 35,
  "level": "core"
}
---
## Introduction

In a busy computer laboratory at a school in Marondera, something goes wrong almost every week: a keyboard stops typing, a mouse pointer jumps around, a computer beeps and refuses to start, a program freezes or a hard drive begins to click. The school cannot call an expensive technician for every fault. A pupil who understands how a computer is built and how to troubleshoot it can solve most of these problems safely in minutes.

ZIMSEC Form 4 asks you to replace malfunctioning hardware components and to troubleshoot and fix common problems with software, keyboards, mice, hard drives and memory. Paper 2 questions often describe a fault and ask for its likely cause and a solution. You should already know the roles of the CPU, RAM and secondary storage.

## Key definitions

:::definition{term="Troubleshooting"}
A systematic process of finding the cause of a fault and fixing it, checking the simplest and most likely causes first.
:::

:::definition{term="Preventive maintenance"}
Regular tasks carried out to keep a computer working well and to stop faults from happening, such as cleaning, updating software and backing up data.
:::

:::definition{term="Electrostatic discharge (ESD)"}
A sudden flow of static electricity from a person or object to a component, which can damage sensitive electronic parts.
:::

:::definition{term="Power-on self-test (POST)"}
The checks of the main hardware that the start-up program runs when a computer is switched on; faults are reported by beep codes or messages.
:::

## The parts of a personal computer

| Part | Purpose |
|:--|:--|
| Case (system unit) | Holds and protects the components; has fans for cooling |
| Power supply unit (PSU) | Converts mains electricity into the low voltages the components need |
| Motherboard | Main circuit board that connects all the components together |
| CPU with heat sink and fan | Processes instructions; the heat sink and fan stop it overheating |
| RAM modules | Hold the programs and data in use; fitted into slots on the motherboard |
| Hard disk drive or SSD | Stores the operating system, programs and files permanently |
| Graphics card (or built-in graphics) | Produces the image sent to the monitor |
| Expansion cards | Add features such as extra ports or a network card |
| Cables | Power cables from the PSU; data cables to drives |

### Assembling a PC (outline)

1. Prepare a clean, dry, well-lit work surface and wear an **anti-static wrist strap**.
2. Fit the **CPU** into its socket on the motherboard (matching the marked corner), apply thermal paste and attach the **heat sink and fan**.
3. Push the **RAM modules** into their slots until the clips lock.
4. Fix the **motherboard** into the case on its stand-offs.
5. Install the **PSU**, then the **storage drives**, then any **expansion cards**.
6. Connect the **power and data cables**, and the front-panel connectors (power button, lights, USB).
7. Check every connection, close the case, connect the monitor, keyboard and mouse, then switch on and watch the POST.

## Working safely

- **Switch off and unplug** the computer before opening the case; press the power button once more to drain stored charge.
- Wear an **anti-static wrist strap** or touch an unpainted metal part of the case to discharge static.
- Hold components by their **edges**; do not touch the gold contacts or chips.
- Keep new parts in their **anti-static bags** until they are fitted.
- **Never open the PSU or a monitor**: they hold dangerous charges even when unplugged.
- Keep drinks away and do not force connectors.

## The troubleshooting process

1. **Identify the problem**: ask the user what happened, what changed recently and whether there are error messages or beeps.
2. **Check the simple causes first**: power, cables, switches, batteries.
3. **Test one possible cause at a time**, so you know which change fixed the fault.
4. **Fix** the fault (repair, replace, reinstall or update).
5. **Test** that the whole system works.
6. **Record** the fault and the solution in a log, which helps with future faults.

## Common faults and solutions

| Component | Symptoms | Likely causes | Solutions |
|:--|:--|:--|:--|
| Software | Program freezes or crashes; error messages; computer very slow | Bug, corrupted files, too many programs open, malware | Close the program (Task Manager), restart, install updates, reinstall the program, run an antivirus scan |
| Keyboard | Keys do not respond; wrong characters; sticky keys | Loose or unplugged cable, flat batteries (wireless), dirt or spilled liquid, wrong language setting or driver | Check the connection or batteries, clean it, check the keyboard layout setting, try another port, replace the keyboard |
| Mouse | Pointer does not move or jumps about; buttons do not respond | Dirty sensor, shiny or glass surface, flat batteries, loose connection | Clean the sensor, use a mouse mat, replace batteries, reconnect or try another port, replace the mouse |
| Hard drive | Clicking or grinding noise; very slow; files missing or corrupted; "no boot device" message | Loose cable, bad sectors, failing mechanism, damaged by a knock | Check data and power cables, run a disk-checking utility, **back up immediately**, replace the drive and restore from the backup |
| Memory (RAM) | Beeps at start-up; computer will not boot; random crashes or "blue screen" errors | RAM module loose or faulty | Switch off, reseat the module firmly, run a memory diagnostic, test modules one at a time, replace the faulty module |

:::example
**A computer that beeps and will not start.** Tendai switches on a laboratory PC; it gives a series of beeps and nothing appears on screen. A beep pattern at POST often points to a **memory** fault.

1. He switches off, unplugs the computer and puts on an anti-static wrist strap.
2. He opens the case and removes the RAM module, holding it by its edges.
3. He checks the contacts are clean, pushes the module firmly back into its slot until both clips lock (reseating) and closes the case.
4. He switches on: the beeps stop and the computer starts. If it had still beeped, he would try the module in another slot, or a known working module, to find out whether the module or the slot was faulty.
5. He records the fault and the fix in the laboratory log.
:::

:::example
**A hard drive that clicks.** Chipo's office computer makes a clicking noise and takes a long time to open files; some files are reported as corrupted. These are warning signs that the hard disk is **failing**.

- First priority: **back up** the important files to another drive or to cloud storage at once, before the drive fails completely.
- Run a disk-checking utility to find and mark bad sectors.
- Replace the drive with a new HDD or SSD, reinstall the operating system and programs and restore the files from the backup.

Waiting would risk losing all of the data.
:::

## Preventive maintenance

- **Clean** dust from fans, vents, keyboards and mice regularly; dust causes overheating.
- Keep computers in a **cool, dry, ventilated** place, and use **surge protectors** and a **UPS** to protect against power surges and cuts during load-shedding.
- Install **operating system and software updates** and keep **antivirus** software up to date.
- Make regular **backups** and test that they can be restored.
- Use **disk clean-up** to remove temporary files, and **defragment** hard disk drives (not SSDs) to keep them quick.
- Shut computers down properly; do not switch off at the wall while they are running.
- Manage cables so they are not pulled or tripped over.

## Common mistakes

:::mistake{title="Replacing parts before checking the simple causes"}
Most faults are loose cables, flat batteries or a setting. Check these first.
:::

:::mistake{title="Opening a computer while it is plugged in"}
Always switch off and unplug first, and protect components from static electricity.
:::

:::mistake{title="Replacing a failing hard drive without backing up"}
Back up first; once the drive fails the data may be impossible to recover.
:::

## Exam tips

:::exam-tip
For "**suggest** a cause and a solution", pair them: "the RAM module may be loose (cause); switch off, unplug and reseat it (solution)".
:::

:::exam-tip
For "**state** safety precautions", give specific actions: unplug the computer, wear an anti-static wrist strap, hold components by the edges, never open the power supply.
:::

## Summary

:::summary
- A PC contains a case, PSU, motherboard, CPU with heat sink and fan, RAM, storage, graphics and cables, assembled in a logical order.
- Work safely: switch off and unplug, prevent static, handle parts by the edges, never open the PSU.
- Troubleshoot systematically: identify, check simple causes, test one change at a time, fix, test and record.
- Know the symptoms, causes and fixes for software, keyboard, mouse, hard drive and memory faults.
- Preventive maintenance: cleaning, ventilation, surge protection and UPS, updates, antivirus, backups, disk clean-up.
:::
