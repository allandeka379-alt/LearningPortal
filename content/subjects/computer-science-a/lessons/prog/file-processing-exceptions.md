---
{
  "key": "prog.file-processing-exceptions",
  "title": "File processing and exception handling",
  "summary": "Opening, reading, writing and appending text files, serial, sequential and random files with SEEK, GETRECORD and PUTRECORD (struct in Python), and handling exceptions with TRY, EXCEPT and FINALLY, with every program run.",
  "concepts": [
    "acs.prog.file-processing-exceptions"
  ],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

When a school computer is switched off, everything in its variables is lost. Marks, accounts and stock levels survive only if the program saves them in a **file** on backing storage. Files are also where programs get data from: a list of learners, a log of mobile-money payments, or a table of results. But files are less predictable than keyboard input. They may not exist, may be locked or may contain a bad line, and a program that crashes because of this is a poor program. **Exception handling** lets a program deal with such problems in a controlled way.

This lesson covers opening files in read, write and append mode, reading and writing text files, the serial, sequential and random organisations, random access with `SEEK`, `GETRECORD` and `PUTRECORD`, and writing code that handles exceptions with `TRY ... EXCEPT` (Python `try/except/finally`). All programs were run and the outputs are real. You should know loops, strings and procedures, and the lesson on file organisation.

## Key definitions

:::definition{term="Text file"}
A file of characters organised in lines, which a program reads or writes one line (or item) at a time. In 9618 pseudocode a line is read with `READFILE` and written with `WRITEFILE`.
:::

:::definition{term="Serial file"}
A file in which the records are stored in the order in which they were added, with no ordering on any field.
:::

:::definition{term="Sequential file"}
A file in which the records are stored in order of a key field, so that they can be processed in that order.
:::

:::definition{term="Random file"}
A file of fixed-length records in which any record can be read or written directly, by moving to its position, without reading the records before it.
:::

:::definition{term="Exception"}
An event that occurs while a program runs and disrupts its normal flow, such as a missing file, an invalid conversion or a division by zero. If it is not handled, the program stops with an error.
:::

## Opening, reading, writing and closing

| Mode | Pseudocode | Python | Effect |
|:-:|:-:|:-:|:-:|
| Read | `OPENFILE ... FOR READ` | `open(name, "r")` | File must exist; can only be read |
| Write | `OPENFILE ... FOR WRITE` | `open(name, "w")` | Creates the file, or empties an existing file |
| Append | `OPENFILE ... FOR APPEND` | `open(name, "a")` | New data is added at the end; existing data is kept |
| Random | `OPENFILE ... FOR RANDOM` | `open(name, "r+b")` | Records can be read and written at any position |

A file must be opened before use and closed afterwards, because data written may stay in a buffer until the file is closed. The pseudocode names the file in each statement:

```
OPENFILE "Marks.txt" FOR WRITE
WRITEFILE "Marks.txt", "Tendai,72"
WRITEFILE "Marks.txt", "Rudo,58"
CLOSEFILE "Marks.txt"

OPENFILE "Marks.txt" FOR READ
WHILE NOT EOF("Marks.txt") DO
    READFILE "Marks.txt", Line
    OUTPUT Line
ENDWHILE
CLOSEFILE "Marks.txt"
```

`EOF` is TRUE when there are no more lines to read, so reading uses a pre-condition loop. Writing in `WRITE` mode **overwrites** any existing contents; `APPEND` adds to the end. In Python the `with` statement closes the file automatically, even if an error occurs.

:::worked-solution{title="Writing and then reading a serial file"}
```python
learners = [("Tendai", 72), ("Rudo", 58), ("Farai", 91)]
with open("marks.txt", "w") as f:
    for name, mark in learners:
        print(name + "," + str(mark), file=f)

total = 0
count = 0
with open("marks.txt", "r") as f:
    for line in f:
        name, mark = line.strip().split(",")
        total = total + int(mark)
        count = count + 1
print(count, total)
```

Output:

```
3 221
```

Each record was written as one line with the fields separated by a comma. On reading, `strip()` removes the end-of-line character and `split(",")` separates the name and the mark. The marks of three learners (72, 58 and 91) total 221. The records are in serial order: the order in which they were written.
:::

:::worked-solution{title="Appending a record"}
```python
with open("marks.txt", "w") as f:
    print("Tendai,72", file=f)
    print("Rudo,58", file=f)
    print("Farai,91", file=f)

with open("marks.txt", "a") as f:
    print("Chipo,66", file=f)

with open("marks.txt", "r") as f:
    lines = f.readlines()
print(len(lines))
print(lines[-1].strip())
```

Output:

```
4
Chipo,66
```

Append mode kept the three existing lines and added the new record at the end, giving four lines. Opening the file again in write mode would have removed them.
:::

## Serial, sequential and random files

| File organisation | How the records are stored | How a record is found | Typical use |
|:-:|:-:|:-:|:-:|
| Serial | In the order in which they were added, with no key order | Read from the start until found (or the whole file) | Log files, transaction files, temporary data |
| Sequential | In order of a key field | Read from the start in key order; stops early when the key is passed | Master files, such as payroll |
| Random (direct access) | At a position calculated from the record number or a key | Jump straight to the position with SEEK | Large files with quick lookup, such as bank accounts |

A text file is normally processed serially or sequentially: to find one record you read from the beginning. A **random** (direct-access) file avoids this by using fixed-length records, so the position of a record is its record number multiplied by the record size. The 9618 pseudocode declares the record with `TYPE` and uses `SEEK`, `GETRECORD` and `PUTRECORD`:

```
TYPE LearnerRecord
    DECLARE Name : STRING
    DECLARE Mark : INTEGER
ENDTYPE

DECLARE Learner : LearnerRecord
OPENFILE "Marks.dat" FOR RANDOM
SEEK "Marks.dat", 2
GETRECORD "Marks.dat", Learner
OUTPUT Learner.Name, Learner.Mark
CLOSEFILE "Marks.dat"
```

`SEEK` moves to the address of a record, and `GETRECORD` reads the record there; `PUTRECORD` writes one. In Python, the `struct` module packs a record into a fixed number of bytes (JSON is an alternative for variable-length records).

:::worked-solution{title="Random access to one record"}
Each record is a 10-byte name and a 2-byte whole number, so every record is 12 bytes. The record with index 1 (the second record, counting from 0) starts at byte 12.

```python
import struct
RECORD = struct.Struct("<10sH")
learners = [("Tendai", 72), ("Rudo", 58), ("Farai", 91)]

with open("marks.dat", "wb") as f:
    for name, mark in learners:
        f.write(RECORD.pack(name.encode(), mark))

with open("marks.dat", "rb") as f:
    f.seek(1 * RECORD.size)
    name, mark = RECORD.unpack(f.read(RECORD.size))
    print(name.decode().strip(chr(0)), mark, RECORD.size)
```

Output:

```
Rudo 58 12
```

`seek(1 * RECORD.size)` jumped straight to byte 12 without reading the first record, and the record read was Rudo's, with the mark 58. The size of each record is 12 bytes, as the last value shows. Changing a mark would use `seek` to the same position and then `write`.
:::

## Exceptions

Without handling, the statement `int("abc")` stops a program with a `ValueError`, and `open("missing.txt")` stops it with a `FileNotFoundError`. Handling uses three parts: the **try** block holds the code that might fail; each **except** block says what to do for a named kind of exception; and the **finally** block runs whatever happens, which makes it the place for clean-up such as closing a file.

```
TRY
    OPENFILE "Marks.txt" FOR READ
    READFILE "Marks.txt", Line
    Mark ← STR_TO_NUM(Line)
EXCEPT
    OUTPUT "The file cannot be read"
FINALLY
    CLOSEFILE "Marks.txt"
ENDTRY
```

:::worked-solution{title="Handling a missing file and a bad line"}
The function below is called twice: once for a file that does not exist and once for a file whose second line is not a number.

```python
def read_marks(filename):
    marks = []
    try:
        with open(filename) as f:
            for line in f:
                marks.append(int(line))
    except FileNotFoundError:
        print("File not found")
    except ValueError:
        print("A line is not a whole number")
    finally:
        print("Finished reading", filename)
    return marks

with open("bad.txt", "w") as f:
    print(40, file=f)
    print("abc", file=f)

read_marks("missing.txt")
read_marks("bad.txt")
```

Output:

```
File not found
Finished reading missing.txt
A line is not a whole number
Finished reading bad.txt
```

For `missing.txt`, `open` raised `FileNotFoundError` and the matching handler ran. For `bad.txt`, the first line (40) was converted, then `int("abc")` raised `ValueError`. In both cases the `finally` message was printed, and the program carried on instead of stopping.
:::

Exceptions should be used for events outside the programmer's control (files, user input, networks), not as a replacement for a simple test such as `IF Count > 0`. Catching a specific exception is better than catching every one, because a general handler can hide faults in the program.

```python
def average(total, count):
    try:
        return total / count
    except ZeroDivisionError:
        return 0

print(average(221, 3))
print(average(0, 0))
```

Output:

```
73.66666666666667
0
```

Here a division by zero is turned into a harmless result of 0 instead of a crash.

:::keyfact{title="Cambridge only"}
File processing and exception handling are A Level topics for Cambridge (Papers 3 and 4); they are not in the ZIMSEC topic list, whose project work uses files informally. The statements `OPENFILE`, `READFILE`, `WRITEFILE`, `CLOSEFILE`, `EOF`, `SEEK`, `GETRECORD` and `PUTRECORD` follow the 9618 pseudocode guide; the exact exception-handling keywords are given in the paper if needed.
:::

## Common mistakes

:::mistake{title="Opening in write mode to add data"}
`WRITE` mode empties the file. To add to the end, use `APPEND`.
:::

:::mistake{title="Forgetting to close the file"}
Data may not be saved until the file is closed. Use `CLOSEFILE`, or `with` in Python, or close in a `FINALLY` block.
:::

:::mistake{title="Reading past the end of the file"}
Test `EOF` before every `READFILE`, or the program fails on the last read.
:::

:::mistake{title="Catching every exception silently"}
An empty handler that hides all errors makes faults impossible to find. Catch the specific exception and give a message.
:::

## Exam tips

:::exam-tip
Cambridge Paper 4 and Paper 3 ask you to **write** code that reads or writes a text file with a loop and `EOF`, **complete** a random-file routine with `SEEK`, **state** the effect of a file mode, **explain** why exception handling is used and **trace** code with a `TRY` block. For an "explain" question give the cause (for example a missing file) and the effect (the program continues with a message instead of crashing).
:::

:::exam-tip
In a file program always show: opening with the right mode, a loop that tests `EOF`, the processing, and closing the file.
:::

## Summary

:::summary
- Files store data permanently; open in READ, WRITE (overwrites) or APPEND mode and always close the file.
- Text files are read with a loop that tests `EOF`; a serial file is in order of arrival, a sequential file in key order.
- A random file has fixed-length records, so `SEEK`, `GETRECORD` and `PUTRECORD` reach any record directly.
- An exception disrupts normal flow; `TRY ... EXCEPT ... FINALLY` (Python `try/except/finally`) handles it so the program continues.
- Use exceptions for events outside the program's control, and catch specific exceptions.
:::
