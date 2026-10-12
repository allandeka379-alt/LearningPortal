---
{
  "key": "os.memory-management",
  "title": "Memory management: paging, segmentation and virtual memory",
  "summary": "Paging with pages, frames and a page table, segmentation, the difference between them, virtual memory and swapping, page replacement with FIFO, LRU and optimal on a reference string with page faults counted, and disk thrashing.",
  "concepts": ["acs.os.memory-management"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A school computer in Mutare has 4 GiB of main memory, but the student running a spreadsheet, a browser and a video lesson may have programs that together need more than that. The operating system lets all of them run by keeping only the parts in use in main memory and the rest on the disk. This is **virtual memory**, and it depends on dividing programs and memory into pieces: **paging** and **segmentation**.

This lesson explains pages, frames and the page table, segments, the difference between the two, how virtual memory uses the disk, three **page replacement** algorithms that decide which page to remove, and the problem of **thrashing**. The reference strings and counts were produced by code.

You should already know that programs must be in main memory to be executed, and the role of the OS in memory management.

## Key definitions

:::definition{term="Paging"}
A memory management method in which a program is divided into fixed-size pages and main memory into frames of the same size, so that any page can be loaded into any frame.
:::

:::definition{term="Page table"}
A table, kept for each process, that records the frame in which each page is held (or that the page is not in memory).
:::

:::definition{term="Segmentation"}
A memory management method in which a program is divided into logical segments of different sizes, such as the code, the data and the stack, each with a base address and a size.
:::

:::definition{term="Virtual memory"}
The use of secondary storage as an extension of main memory, so that a program can be larger than the memory available; pages not in use are kept on the disk and swapped in when needed.
:::

:::definition{term="Page fault"}
The event that occurs when a program uses a page that is not in main memory, so that the page has to be brought in from the disk.
:::

## Paging

All pages and frames are the same size, for example 1 KiB (1024 bytes). A **logical address** is split into a **page number** and an **offset** within the page: divide by the page size to get the page, and the remainder is the offset. The page table gives the frame, and the physical address is frame × page size + offset.

| Page | Frame |
|:-:|:-:|
| 0 | 5 |
| 1 | 2 |
| 2 | 7 |
| 3 | 0 |
| 4 | 9 |

:::worked-solution{title="Translating addresses (page size 1024 bytes)"}
| Logical address | Page (÷ 1024) | Offset (remainder) | Frame (page table) | Physical address |
|:-:|:-:|:-:|:-:|:-:|
| 4100 | 4 | 4 | 9 | 9 × 1024 + 4 = 9220 |
| 2500 | 2 | 452 | 7 | 7 × 1024 + 452 = 7620 |

1. Logical address 4100 ÷ 1024 gives page 4 and a remainder of 4.
2. The page table shows that page 4 is in frame 9.
3. The physical address is 9 × 1024 + 4 = 9220.
4. The same method gives 7620 for logical address 2500 (page 2, offset 452, frame 7).
:::

Paging avoids the problem of finding one large block of free memory, because pages can go into any free frames. Its drawback is that the last page of a program is rarely full, which wastes a little space (internal fragmentation), and the page table needs memory.

## Segmentation

In **segmentation** the program is divided at logical boundaries, so each segment is a different size. Each has a base address and a limit.

| Segment | Base address | Limit (size) |
|:-:|:-:|:-:|
| Code | 2000 | 800 |
| Data | 5000 | 300 |
| Stack | 9000 | 500 |

A logical address is a segment and an offset within it. The offset is checked against the limit, so an offset of 800 in the Data segment would be rejected, and the physical address is base + offset: offset 120 in Data is at 5000 + 120 = 5120. Segments match the structure of the program and can be shared or protected as units, but because they differ in size the free memory can become broken into small unusable gaps (external fragmentation).

:::keyfact{title="Paging against segmentation"}
Paging: fixed-size, physical divisions, invisible to the programmer, page table, no external fragmentation. Segmentation: variable-size, logical divisions of the program, segment table with base and limit, can suffer external fragmentation.
:::

## Virtual memory and page replacement

With virtual memory only some of a program's pages are in the frames at any time. When a page that is needed is not in a frame (a **page fault**), the OS loads it from the disk. If every frame is full, a page must be chosen to be replaced, and if it has been changed it is first written back to the disk. A good algorithm chooses a page that will not be needed soon.

- **First in first out (FIFO):** replace the page that has been in memory the longest.
- **Least recently used (LRU):** replace the page that has not been used for the longest time.
- **Optimal:** replace the page whose next use is furthest in the future. This cannot be used in practice, because the future is not known, but it is the standard against which others are compared.

### Worked example: three frames

The reference string (the pages requested, in order) is 3, 2, 1, 4, 2, 5, 2, 1, 3, 4, 2, 6. There are three frames. The pages in the frames are listed from the one loaded earliest.

:::worked-solution{title="FIFO"}
| Page requested | Frame 1 | Frame 2 | Frame 3 | Page fault? |
|:-:|:-:|:-:|:-:|:-:|
| 3 | 3 | – | – | yes |
| 2 | 3 | 2 | – | yes |
| 1 | 3 | 2 | 1 | yes |
| 4 | 2 | 1 | 4 | yes |
| 2 | 2 | 1 | 4 | no |
| 5 | 1 | 4 | 5 | yes |
| 2 | 4 | 5 | 2 | yes |
| 1 | 5 | 2 | 1 | yes |
| 3 | 2 | 1 | 3 | yes |
| 4 | 1 | 3 | 4 | yes |
| 2 | 3 | 4 | 2 | yes |
| 6 | 4 | 2 | 6 | yes |

FIFO causes **11** page faults. Page 2 is replaced just before it is needed again, because it was the oldest.
:::

:::worked-solution{title="LRU"}
| Page requested | Frame 1 | Frame 2 | Frame 3 | Page fault? |
|:-:|:-:|:-:|:-:|:-:|
| 3 | 3 | – | – | yes |
| 2 | 3 | 2 | – | yes |
| 1 | 3 | 2 | 1 | yes |
| 4 | 2 | 1 | 4 | yes |
| 2 | 2 | 1 | 4 | no |
| 5 | 2 | 4 | 5 | yes |
| 2 | 2 | 4 | 5 | no |
| 1 | 2 | 5 | 1 | yes |
| 3 | 2 | 1 | 3 | yes |
| 4 | 1 | 3 | 4 | yes |
| 2 | 3 | 4 | 2 | yes |
| 6 | 4 | 2 | 6 | yes |

LRU causes **10** page faults. The second request for page 2 is a hit because page 2 was used more recently than 1 or 4.
:::

:::worked-solution{title="Optimal"}
| Page requested | Frame 1 | Frame 2 | Frame 3 | Page fault? |
|:-:|:-:|:-:|:-:|:-:|
| 3 | 3 | – | – | yes |
| 2 | 3 | 2 | – | yes |
| 1 | 3 | 2 | 1 | yes |
| 4 | 2 | 1 | 4 | yes |
| 2 | 2 | 1 | 4 | no |
| 5 | 2 | 1 | 5 | yes |
| 2 | 2 | 1 | 5 | no |
| 1 | 2 | 1 | 5 | no |
| 3 | 2 | 5 | 3 | yes |
| 4 | 2 | 3 | 4 | yes |
| 2 | 2 | 3 | 4 | no |
| 6 | 3 | 4 | 6 | yes |

The optimal algorithm causes **8** page faults, the fewest possible. At the request for 5 it removes page 4 because page 4 is not needed for the longest time.
:::

| Algorithm | Page faults (3 frames) | Page faults (4 frames) |
|:-:|:-:|:-:|
| FIFO | 11 | 8 |
| LRU | 10 | 8 |
| Optimal | 8 | 7 |

More frames means fewer faults here, because more pages can stay in memory.

## Thrashing

If there are too many processes for the memory, or too few frames for each, the pages that a process needs are removed almost as soon as they are loaded. The processor spends most of its time swapping pages between the disk and memory and very little executing instructions. This is **disk thrashing**; the computer becomes extremely slow although the disk is very busy. It is reduced by closing programs, adding main memory, or reducing the number of processes that are allowed to run together.

:::keyfact{title="ZIMSEC and Cambridge"}
Paging, segmentation, virtual memory and page replacement are Cambridge A Level content (topic 16). The ZIMSEC syllabus does not include them.
:::

## Common mistakes

:::mistake{title="Confusing pages with segments"}
Pages are equal in size and chosen by the OS; segments differ in size and follow the logical parts of the program.
:::

:::mistake{title="Counting the first requests as hits"}
When the frames are empty, each new page requested is a page fault. Count them.
:::

:::mistake{title="Updating the order wrongly in LRU"}
In LRU a hit makes that page the most recently used. In FIFO a hit changes nothing.
:::

:::mistake{title="Saying virtual memory is extra RAM"}
It is part of the disk used as an extension of memory, and it is much slower than RAM.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 3** gives a reference string and a number of frames and asks for the contents of the frames after each request and the number of page faults. Rule a table with a column for each frame and a column for faults, and decide the page to be replaced before you write each row.
:::

:::exam-tip
"**Explain** thrashing": pages are swapped in and out continuously, so little useful processing is done. "**Describe** how a logical address is turned into a physical address": split into page and offset, look up the frame in the page table, combine the frame with the offset.
:::

## Summary

:::summary
- Paging divides programs into equal pages and memory into equal frames; a page table gives the frame for each page.
- Segmentation divides a program into logical parts of different size, each with a base and a limit.
- Virtual memory uses the disk to hold pages that are not in use; a page fault brings a page in.
- FIFO replaces the oldest page, LRU the least recently used, optimal the one needed furthest ahead; faults are counted from the table.
- Thrashing is constant swapping with very little useful work being done.
:::
