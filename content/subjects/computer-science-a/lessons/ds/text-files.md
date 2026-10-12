---
{
  "key": "ds.text-files",
  "title": "Text files",
  "summary": "Why files are needed, opening a text file for read, write or append, reading and writing lines in pseudocode (OPENFILE, READFILE, WRITEFILE, CLOSEFILE, EOF) and Python, processing a file until the end, and writing results back.",
  "concepts": ["acs.ds.text-files"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A teacher in Mutare types the marks of a test into a program, and the program works out the average. When the computer is switched off, all the marks are gone, because variables and arrays live in memory and memory is cleared when the power is lost. If the teacher wants to use the marks tomorrow, they must be saved somewhere permanent. A **file** stored on a disk does this. Programs save data in files so that it **persists**, can be used by different programs and can be sent to other people.

This lesson explains how a program writes to and reads from a **text file** (a file of lines of characters), in pseudocode and in Python. All the outputs were produced by running the Python code in a temporary folder. You should already know loops, strings and variables.

## Key definitions

:::definition{term="File"}
A named collection of data stored on a secondary storage device such as a disk, so that the data is kept after the program ends.
:::

:::definition{term="Text file"}
A file that stores data as lines of characters. Each line ends with an end-of-line marker, and the file ends with an end-of-file marker.
:::

:::definition{term="End of file (EOF)"}
The point at which there is no more data to read. The function `EOF(filename)` is TRUE when every line has been read.
:::

:::definition{term="Persistence"}
Data staying available after a program ends or a computer is switched off, because it is stored in a file rather than only in memory.
:::

## The three steps

Every program that uses a file follows the same steps:

1. **Open** the file, stating what it will be used for (read, write or append).
2. **Process** the file: read lines one at a time, or write lines.
3. **Close** the file, so that all the data is saved and the file is released for other programs.

| Mode | Pseudocode | Python | Effect |
|:-:|:-:|:-:|:-:|
| Read | `OPENFILE f FOR READ` | `open(name, "r")` | reads existing contents from the start; the file must exist |
| Write | `OPENFILE f FOR WRITE` | `open(name, "w")` | creates the file, or erases the old contents first |
| Append | `OPENFILE f FOR APPEND` | `open(name, "a")` | adds new lines at the end and keeps the old contents |

Opening an existing file for **write** erases what it held, so use **append** to add to it. Opening a file for **read** that does not exist is an error, so a careful program checks that the file is there.

## Writing to a file

:::worked-solution{title="Writing six marks to a file"}
The pseudocode inputs six marks and writes each on its own line of `marks.txt`:

```
DECLARE Mark : INTEGER
OPENFILE "marks.txt" FOR WRITE
FOR Count ← 1 TO 6
    INPUT Mark
    WRITEFILE "marks.txt", NUM_TO_STR(Mark)
NEXT Count
CLOSEFILE "marks.txt"
```

`WRITEFILE` accepts a string, so `NUM_TO_STR` turns each number into text. In Python, `print(text, file=file)` writes a line and ends it with the end-of-line marker. (The method `file.write(text)` writes exactly the characters given, so a program that uses it must add the end-of-line marker itself.) The program then reads the file back with `read()` to show what was stored:

```python
marks = [58, 47, 71, 63, 39, 80]
file = open("marks.txt", "w")
for mark in marks:
    print(mark, file=file)
file.close()
file = open("marks.txt", "r")
print(file.read())
file.close()
```

The real output is the six lines of the file:

```
58
47
71
63
39
80
```
:::

## Reading a file until the end

The number of lines is often not known in advance, so the program reads until `EOF` becomes TRUE. Each `READFILE` reads the next line into a variable, as a string.

:::worked-solution{title="Reading a file and calculating the average"}
```
DECLARE Line : STRING
DECLARE Total, Count : INTEGER
Total ← 0
Count ← 0
OPENFILE "marks.txt" FOR READ
WHILE NOT EOF("marks.txt") DO
    READFILE "marks.txt", Line
    Total ← Total + STR_TO_NUM(Line)
    Count ← Count + 1
ENDWHILE
CLOSEFILE "marks.txt"
OUTPUT "Marks read: ", Count
OUTPUT "Total: ", Total
OUTPUT "Average: ", Total / Count
```

`STR_TO_NUM` converts each line from a string to a number before it is added. Python can loop directly over the file, one line at a time, and `with` closes the file automatically when the block ends:

```python
with open("marks.txt", "w") as file:
    for mark in [58, 47, 71, 63, 39, 80]:
        print(mark, file=file)

total = 0
count = 0
with open("marks.txt", "r") as file:
    for line in file:
        total = total + int(line)
        count = count + 1
print("Marks read:", count)
print("Total:", total)
print("Average:", round(total / count, 2))
```

The real output is:

```
Marks read: 6
Total: 358
Average: 59.67
```

The six marks add up to 358 and 358 ÷ 6 = 59.666…, which `round(…, 2)` displays as 59.67.
:::

In Python, `readline()` reads one line (including the end-of-line character, which `strip()` removes) and `read()` reads everything that is left:

```python
with open("names.txt", "w") as file:
    print("Rudo", file=file)
    print("Sipho", file=file)
    print("Thandeka", file=file)
with open("names.txt", "r") as file:
    first = file.readline()
    rest = file.read()
print(first.strip())
print(rest.split())
```

```
Rudo
['Sipho', 'Thandeka']
```

## Appending and overwriting

The next program writes two lines, appends a third and shows the file, then opens the file for write again, which erases it.

```python
with open("log.txt", "w") as file:
    print("Monday", file=file)
    print("Tuesday", file=file)
with open("log.txt", "a") as file:
    print("Wednesday", file=file)
with open("log.txt", "r") as file:
    print(file.read())
with open("log.txt", "w") as file:
    print("Thursday", file=file)
with open("log.txt", "r") as file:
    print(file.read())
```

```
Monday
Tuesday
Wednesday

Thursday
```

The first listing shows all three days, because append kept the first two lines. After the file was opened for writing again, only the new line `Thursday` was left. (The blank lines in the output come from `print`, which adds its own line break after the final one in the file.)

## Writing results back

A common pattern is to read data from one file, process it and write the results to another file (or the same file after it has been closed): read each line, calculate, and use `WRITEFILE` for each result. Writing the results of the calculation above would need one more `OPENFILE … FOR WRITE` for an output file and a `WRITEFILE` of `NUM_TO_STR(Total / Count)` before closing both files.

## Why close a file?

Data written to a file may be held in a buffer in memory and only copied to the disk when the file is closed. A file that is not closed may lose data, and it may stay locked so that another program cannot open it. In Python the `with` statement closes the file automatically.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine reading and writing text files in pseudocode and a language. Cambridge uses `OPENFILE`, `READFILE`, `WRITEFILE`, `CLOSEFILE` and `EOF` (the pseudocode guide also has `APPEND` and, for random files, `SEEK`, `GETRECORD` and `PUTRECORD`, which belong to a later lesson). In an exam the file name in `OPENFILE` is written as a string such as `"marks.txt"`.
:::

## Common mistakes

:::mistake{title="Opening for write when append is meant"}
Opening an existing file for write deletes its contents. Use append to keep the old data.
:::

:::mistake{title="Forgetting to close the file"}
Always finish with `CLOSEFILE`, or use `with` in Python. Data may otherwise not be saved.
:::

:::mistake{title="Reading numbers without converting them"}
A line read from a text file is a string. Adding `"58"` to a total needs `STR_TO_NUM` in pseudocode or `int()` in Python first.
:::

:::mistake{title="Reading past the end of the file"}
Test `NOT EOF(filename)` before every `READFILE`. Reading when there is no data left is an error.
:::

## Exam tips

:::exam-tip
Cambridge Paper 2 and ZIMSEC Paper 2 ask you to **write** pseudocode that opens a file, reads every line with an `EOF` loop, processes it (total, count, search) and closes it, or that **writes** data to a file. State the mode in `OPENFILE`, use a loop condition `NOT EOF(…)`, and close the file at the end.
:::

:::exam-tip
"**Explain** why files are used" needs persistence: data in variables is lost when the program ends or the power is off, whereas data in a file is kept on secondary storage and can be reused or shared.
:::

## Summary

:::summary
- Files store data on secondary storage so that it persists after the program ends.
- Every file is opened (read, write or append), processed and closed; write erases old contents, append adds to the end.
- Pseudocode uses `OPENFILE`, `READFILE`, `WRITEFILE`, `CLOSEFILE` and `EOF`; Python uses `open`, `read`, `readline`, `write`, `close` and `with`.
- A file of unknown length is read in a loop that continues while `NOT EOF`.
- Lines read from a text file are strings and must be converted before arithmetic.
:::
