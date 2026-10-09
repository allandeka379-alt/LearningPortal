---
{
  "key": "prog.file-handling",
  "title": "File handling: reading and writing text files",
  "summary": "Why programs store data in files, and how to open a file for reading or writing, read and write single items and lines of text, and close the file, using OPENFILE, READFILE, WRITEFILE and CLOSEFILE in pseudocode.",
  "concepts": ["comp.prog.file-handling"],
  "estimatedMinutes": 40,
  "level": "core"
}
---
## Introduction

A chess club in Gweru uses a small program to record its members and their ratings. On the first day, the secretary types in every member's name. The next week she opens the program again and finds the list empty: everything was held in variables and arrays in main memory (RAM), and it vanished when the program closed.

To keep data between runs, a program must save it in a **file** on secondary storage, such as a hard disk or flash drive, and read it back next time. Cambridge 0478 asks you to *explain* why programs store data in files and to *write* pseudocode that opens a file, reads from or writes to it, and closes it. These statements are short, so marks are lost mainly through small slips: the wrong mode, a missing CLOSEFILE, or a file name without quotes.

## Key definitions

:::definition{term="File"}
A named collection of data stored on secondary storage, which keeps the data after the program has stopped and the computer has been switched off.
:::

:::definition{term="File mode"}
The way a file is opened: READ to take data from an existing file, or WRITE to create a new file and put data into it.
:::

:::definition{term="Text file"}
A file that stores data as lines of characters, which a program reads or writes one item or one line at a time.
:::

## Why programs store data in files

- Data in variables and arrays is lost when the program ends; data in a file is kept permanently, so it can be used the next time the program runs.
- A file can be read by another program, copied, backed up, or sent to another computer.
- Data can be prepared in advance (for example a list of products) and loaded by the program, so it does not have to be typed in every time.
- Results such as reports and logs can be stored for people to read later.

## The four file statements

```
OPENFILE "members.txt" FOR WRITE
WRITEFILE "members.txt", MemberName
CLOSEFILE "members.txt"

OPENFILE "members.txt" FOR READ
READFILE "members.txt", MemberName
CLOSEFILE "members.txt"
```

- `OPENFILE <name> FOR READ` opens an existing file so data can be read from it.
- `OPENFILE <name> FOR WRITE` creates a new file. **Any data already in a file with that name is lost.**
- `READFILE <name>, <variable>` reads the next data item (one line) from the file into the variable.
- `WRITEFILE <name>, <variable or value>` writes the data to the file as the next line.
- `CLOSEFILE <name>` closes the file when it is no longer needed, so the data is saved properly and the file is released for other programs.

The file name is a string, so it is written in double quotes (or held in a STRING variable). A file is opened in only one mode at a time: to read back a file you have just written, close it and open it again FOR READ.

## Reading and writing several lines

Each READFILE takes the **next** line, and each WRITEFILE adds a **new** line after the last one written. A loop therefore reads or writes many lines. The 0478 pseudocode guide does not define an end-of-file test, so questions tell you how many lines a file holds, or the file uses a final line as a terminator (such as `"END"`).

:::worked-solution[Saving an array to a file]
The array `Members[1:4]` holds four names. The program saves them, one per line.

```
DECLARE Index : INTEGER
OPENFILE "members.txt" FOR WRITE
FOR Index ← 1 TO 4
    WRITEFILE "members.txt", Members[Index]
NEXT Index
CLOSEFILE "members.txt"
```

If `Members` holds Tatenda, Chipo, Farai and Thandeka, the file contains:

| Line | Contents of members.txt |
|:-:|:-:|
| 1 | Tatenda |
| 2 | Chipo |
| 3 | Farai |
| 4 | Thandeka |

1. The file is opened once, **before** the loop. Opening it FOR WRITE inside the loop would create a new, empty file on every pass, leaving only the last name.
2. Each WRITEFILE adds the next line.
3. To load the names back next week, open the file FOR READ and use `READFILE "members.txt", Members[Index]` in the same kind of loop.
:::

:::worked-solution[Copying selected lines to a new file]
The file `marks.txt` holds five marks, one per line: 63, 41, 77, 50, 38. The program copies the passing marks (50 or more) into `pass.txt` and counts them.

```
DECLARE Mark : INTEGER
DECLARE Passes : INTEGER
DECLARE Count : INTEGER
Passes ← 0
OPENFILE "marks.txt" FOR READ
OPENFILE "pass.txt" FOR WRITE
FOR Count ← 1 TO 5
    READFILE "marks.txt", Mark
    IF Mark >= 50
        THEN
            WRITEFILE "pass.txt", Mark
            Passes ← Passes + 1
    ENDIF
NEXT Count
CLOSEFILE "marks.txt"
CLOSEFILE "pass.txt"
OUTPUT Passes, " marks copied"
```

| Count | Mark | Passes | Written to pass.txt |
|:-:|:-:|:-:|:-:|
|  |  | 0 |  |
| 1 | 63 | 1 | 63 |
| 2 | 41 |  |  |
| 3 | 77 | 2 | 77 |
| 4 | 50 | 3 | 50 |
| 5 | 38 |  |  |

1. Two files are open at once, each in its own mode.
2. Every pass reads one line, whether or not it is copied; only marks of 50 or more are written.
3. `pass.txt` ends with three lines (63, 77, 50) and the output is `3 marks copied`. Both files are closed before the program ends.
:::

:::example{title="Keeping a high score"}
A quiz game in a computer club stores the best score so far in `best.txt`, a file with one line.

```
DECLARE BestScore : INTEGER
OPENFILE "best.txt" FOR READ
READFILE "best.txt", BestScore
CLOSEFILE "best.txt"
IF Score > BestScore
    THEN
        OUTPUT "New high score!"
        OPENFILE "best.txt" FOR WRITE
        WRITEFILE "best.txt", Score
        CLOSEFILE "best.txt"
ENDIF
```

The file is read, closed, and only reopened FOR WRITE when the new score must replace the old one. Opening it FOR WRITE first would wipe the old high score before it could be read.
:::

## Common mistakes

:::mistake{title="Opening FOR WRITE when the data is needed"}
WRITE mode starts a new, empty file. If the old contents are needed, read them first (or write to a different file).
:::

:::mistake{title="Forgetting CLOSEFILE"}
Every file that is opened should be closed when the program has finished with it. Examiners often award a mark for closing the file.
:::

:::mistake{title="Opening the file inside the loop"}
Open before the loop and close after it. Opening FOR WRITE on every pass keeps only the last item written.
:::

:::mistake{title="Reading from a file opened for writing"}
READFILE needs the file to have been opened FOR READ. Close it and reopen it in the other mode.
:::

## Exam tips

:::exam-tip
For "explain why the program stores the data in a file", say that data in a file is **kept after the program closes** (or the computer is switched off) so it can be used again later, and add a second reason such as sharing it with another program.
:::

:::exam-tip
In a written algorithm, follow the order open → read or write (often in a loop) → close, and write the file name in quotes every time. Use the exact file name given in the question.
:::

:::keyfact{title="ZIMSEC and Cambridge"}
File handling with OPENFILE, READFILE, WRITEFILE and CLOSEFILE is a Cambridge 0478 topic (8.3). The ZIMSEC syllabus does not list file handling as a separate objective; the ZIMSEC Form 4 project is built on a relational database rather than on text files.
:::

## Summary

:::summary
- Programs store data in files so it is kept after the program ends and can be reused or shared.
- `OPENFILE "name" FOR READ` or `FOR WRITE`; WRITE creates a new file and loses any existing contents.
- `READFILE "name", Variable` reads the next line; `WRITEFILE "name", Value` writes a new line.
- `CLOSEFILE "name"` when finished; open before a loop and close after it.
- 0478 pseudocode has no end-of-file test, so the number of lines is given or a terminator line is used.
:::
