// Slice w2a: memory management (acs.os.memory-management, Cambridge A Level).
import { concept, P, chk, same, CAM, pageReplace, mdTable } from "../lib.mjs";
import { mc } from "../tables/w2a-q.mjs";

const refTable = (refs, frames, algo) => {
  const r = pageReplace(refs, frames, algo);
  return mdTable(["Page requested", ...Array.from({ length: frames }, (_, i) => `Frame ${i + 1}`), "Page fault?"], r.rows.map((x) => [x.ref, ...Array.from({ length: frames }, (_, i) => x.frames[i] ?? "–"), x.fault ? "yes" : "no"]));
};

concept("acs.os.memory-management", { file: "os/memory-management", keyPrefix: "os.memory-management", applies: CAM }, (b) => {
  const R = [4, 1, 2, 4, 5, 1, 4, 2, 5, 3, 2, 1];
  const f3 = pageReplace(R, 3, "FIFO"), l3 = pageReplace(R, 3, "LRU"), o3 = pageReplace(R, 3, "OPT");
  const f4 = pageReplace(R, 4, "FIFO"), l4 = pageReplace(R, 4, "LRU");
  chk(f3.faults, 8); chk(l3.faults, 9); chk(o3.faults, 6);
  const R2 = [4, 1, 4, 2, 5, 1, 4, 3];
  const f2 = pageReplace(R2, 3, "FIFO"), l2 = pageReplace(R2, 3, "LRU"), o2 = pageReplace(R2, 3, "OPT");
  // page table: page size 512
  const size = 512;
  const table = { 0: 6, 1: 3, 2: 8, 3: 1 };
  const tr = (la) => { const page = Math.floor(la / size), off = la % size; return { page, off, frame: table[page], pa: table[page] * size + off }; };
  const t1 = tr(1300), t2 = tr(700);
  chk(t1.page, 2); chk(t1.off, 276); chk(t1.pa, 8 * 512 + 276);
  chk(t2.page, 1); chk(t2.off, 188); chk(t2.pa, 3 * 512 + 188);
  const ptab = mdTable(["Page", "Frame"], Object.entries(table));
  // 20 KiB program, 4 KiB pages
  chk(Math.ceil(21 / 4), 6);

  // ---- multiple choice
  mc(b, 2, "RECALL", "In a paged memory system, what is a frame?",
    ["A fixed-size block of main memory that can hold one page", "Correct."],
    [["A section of a program that has a logical meaning", "That is a segment."], ["A page that is held on the disk", "A page on the disk is not in a frame."], ["A row of the page table", "A row of the page table is an entry."]],
    "Main memory is divided into frames of the same size as the pages.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "What is the main difference between a page and a segment?",
    ["Pages have a fixed size; segments vary and follow the program's logic", "Correct."],
    [["A page is stored on the disk and a segment is stored only in main memory", "Both can be in memory or on the disk."], ["A segment is always smaller than a page in the same system", "A segment can be any size."], ["A page is created by the programmer and a segment by the OS", "Pages are created by the OS; segments follow the program's structure."]],
    "Pages are equal-sized physical divisions; segments are logical divisions of unequal size.");
  mc(b, 2, "UNDERSTANDING", "What is virtual memory?",
    ["Part of the disk used as an extension of main memory", "Correct."],
    [["Memory that is created by the graphics card", "Virtual memory is not on the graphics card."], ["A faster form of cache between the processor and RAM", "That is cache memory."], ["Memory that cannot be used by programs", "Programs use it as if it were main memory."]],
    "Pages not in use are kept on the disk.", { daily: true });
  mc(b, 3, "UNDERSTANDING", "What causes a page fault?",
    ["A program uses a page that is not in a frame of main memory", "Correct."],
    [["A page is damaged on the hard disk", "A fault is not a hardware error."], ["Two programs use the same page at the same time", "That is a different problem."], ["The page table is larger than the page", "The size of the table is not the cause."]],
    "The page must be loaded from the disk.", { hints: ["Think about where the missing page is."] });
  mc(b, 3, "APPLICATION", "Pages 4, 7, 4, 7 are requested in this order when four frames are empty. How many page faults occur?",
    ["2", "Correct: pages 4 and 7 each cause a fault the first time only."],
    [["4", "The second requests are hits."], ["0", "Empty frames mean the first requests are faults."], ["1", "There are two different pages."]],
    "Only the first request for each page is a fault.", { hints: ["A page already in a frame is a hit."], calculator: false });
  mc(b, 3, "ANALYSIS", "Why is the optimal page replacement algorithm not used in a real operating system?",
    ["It needs to know which pages will be used in the future", "Correct: the future requests are not known."],
    [["It causes more page faults than any other algorithm", "It causes the fewest."], ["It cannot be used when there is more than one process running at once", "The number of processes is not the issue."], ["It writes every page to the disk each time", "It is not about writing pages."]],
    "Optimal is used as a yardstick, not as a working algorithm.", { hints: ["What does the algorithm have to know?"] });
  mc(b, 3, "UNDERSTANDING", "Which describes disk thrashing?",
    ["Most of the time goes on swapping pages, with little executing", "Correct."],
    [["The disk is damaged by too many writes over time", "Thrashing is a performance problem, not damage."], ["The disk is too full for any more files to be saved on it", "That is a full disk."], ["Several processes write to the same file at the same time", "That is a file sharing problem."]],
    "Constant swapping of pages makes everything slow.", { hints: ["Think about what the processor is doing most of the time."] });
  mc(b, 4, "ANALYSIS", "A computer is thrashing. Which action is most likely to reduce the problem?",
    ["Close some programs, or add more main memory", "Correct: each process then keeps more of its pages in frames."],
    [["Increase the number of programs that are running", "That would make it worse."], ["Reduce the size of the page table to zero", "That is not possible."], ["Replace the optimal algorithm by FIFO", "The cause is a shortage of frames, not the algorithm."]],
    "More frames per process means fewer page faults.", { hints: ["What does each process lack?"] });

  // ---- true / false, matching, fill in the blank
  b.tf({ d: 2, skill: "UNDERSTANDING", stem: "In FIFO page replacement, a hit on a page makes it the newest page in memory.", answer: false,
    explanation: "False. In FIFO the order depends only on when the page was loaded; a hit changes nothing." });
  b.tf({ d: 2, skill: "UNDERSTANDING", daily: true, stem: "A paged system has no need to find one large block of free memory for a program.", answer: true,
    explanation: "True. The pages can be put into any free frames, wherever they are." });
  b.match({ d: 2, skill: "UNDERSTANDING", stem: "Match each term to its description.",
    pairs: [["Page table", "Records the frame that holds each page"], ["Segment", "A logical part of a program with its own base and limit"], ["Page fault", "A request for a page that is not in main memory"], ["Swapping", "Moving pages between main memory and the disk"], ["Thrashing", "Constant swapping that leaves little time for useful work"]],
    explanation: "Each term belongs to paging or virtual memory." });
  b.fib({ d: 3, skill: "UNDERSTANDING", hints: ["Offset is the remainder; frame comes from the table."],
    stem: "Complete the steps for finding a physical address.",
    template: "Divide the logical address by the page size to get the page {{blank:a}}. The remainder is the {{blank:b}}. The page {{blank:c}} gives the frame. The physical address is frame × page size + offset.",
    blanks: [
      { id: "a", accepted: ["number"], choices: ["number", "fault", "table", "limit"] },
      { id: "b", accepted: ["offset"], choices: ["offset", "frame", "segment", "base"] },
      { id: "c", accepted: ["table"], choices: ["table", "fault", "number", "address"] },
    ], explanation: "Page number, offset, page table." });

  // ---- numerical
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Mark each request as a hit or a fault; the first three pages fill the empty frames."],
    stem: "A process has three frames, all empty at the start. Its pages are requested in this order: " + R.join(", ") + ". Using FIFO replacement, how many page faults occur?",
    value: f3.faults, wrong: [f3.faults + 2, 12], workedSolution: "1. Trace the table below (the oldest page is listed first).\n\n" + refTable(R, 3, "FIFO") + `\n\n2. There are ${f3.faults} faults.`, explanation: `FIFO gives ${f3.faults} page faults.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["In LRU, replace the page that was used longest ago."],
    stem: "For the same requests (" + R.join(", ") + ") and three empty frames, how many page faults occur with LRU replacement?",
    value: l3.faults, wrong: [f3.faults, 12], workedSolution: "1. Trace the table below.\n\n" + refTable(R, 3, "LRU") + `\n\n2. There are ${l3.faults} faults.`, explanation: `LRU gives ${l3.faults} page faults.` });
  b.num({ d: 4, skill: "APPLICATION", calculator: false, hints: ["At each fault, replace the page whose next request is furthest away (or never)."],
    stem: "For the same requests (" + R.join(", ") + ") and three empty frames, how many page faults occur with the optimal algorithm?",
    value: o3.faults, wrong: [f3.faults, 3], workedSolution: "1. Trace the table below.\n\n" + refTable(R, 3, "OPT") + `\n\n2. There are ${o3.faults} faults.`, explanation: `The optimal algorithm gives ${o3.faults} page faults.` });
  b.num({ d: 3, skill: "APPLICATION", calculator: false, hints: ["Divide the logical address by the page size; use the page table for the frame."],
    stem: "Pages are 512 bytes. The page table is:\n\n" + ptab + "\n\nWhat physical address corresponds to the logical address 1300?",
    value: t1.pa, wrong: [1300, 276], workedSolution: `1. 1300 ÷ 512 = 2 remainder 276: page 2, offset 276.\n2. Page 2 is in frame 8.\n3. Physical address = 8 × 512 + 276 = ${t1.pa}.`, explanation: `Frame 8, offset 276: ${t1.pa}.` });
  b.num({ d: 2, skill: "APPLICATION", calculator: false, stem: "A program needs 21 KiB of memory and the page size is 4 KiB. How many pages does it need?",
    value: 6, wrong: [5, 21], workedSolution: "1. 21 ÷ 4 = 5.25.\n2. The last page is only part-full but still needs a page: 6 pages.", explanation: "Round up to the next whole page: 6." });

  // ---- self-marked
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Describe what is in memory and what is on the disk."],
    stem: "Explain how virtual memory allows a program that is larger than main memory to run. [3]",
    points: ["The program is divided into pages and only some are in main memory at any time", "The rest are kept on the disk", "When a page that is not in memory is needed (page fault) it is loaded, replacing another page if the frames are full"],
    modelAnswer: "The program is divided into pages and only some of them are in main memory at a time, the rest being kept on the disk. When a page that is not in memory is needed, it is loaded from the disk, replacing another page if all the frames are full.",
    explanation: "Pages, disk, page fault." });
  b.manualShort({ d: 3, skill: "UNDERSTANDING", marks: 3, hints: ["Mention the size of the divisions and what each division represents."],
    stem: "Describe two differences between paging and segmentation. [3 marks: one for each difference, one for naming the other]",
    points: ["Pages are all the same size; segments vary in size", "Pages are chosen by the OS / physical; segments follow the logical parts of the program, such as code and data", "Paging uses a page table; segmentation uses a segment table with a base and limit for each segment"],
    modelAnswer: "Pages are all the same size but segments vary in size. Pages are physical divisions made by the OS, while segments follow the logical parts of the program, such as the code and the data. Paging uses a page table of frames, segmentation a table of bases and limits.",
    explanation: "Any three differences." });
  b.manualShort({ d: 4, skill: "ANALYSIS", marks: 4, hints: ["Say what the processor and disk are doing, and what could be done."],
    stem: "A computer with little main memory becomes very slow when many programs are open and the disk light is on constantly. Explain what is happening and one way to improve it. [4]",
    points: ["The computer is thrashing", "Pages are continually swapped between main memory and the disk because there are too few frames for the pages needed", "The processor spends most of its time waiting for the swapping, so little useful work is done", "Improve by closing programs or adding more RAM"],
    modelAnswer: "The computer is thrashing: pages are being swapped continually between memory and disk because there are too few frames for the pages that are needed. The processor spends most of its time waiting and does little useful work. It can be improved by closing some programs or adding more RAM.",
    explanation: "Name, cause, effect, remedy." });

  // ---- structured practice
  b.struct({ d: 4, skill: "APPLICATION", examStyle: true, hints: ["The first three requests fill the empty frames.", "FIFO replaces the page loaded first."],
    explanation: "FIFO, LRU and optimal on the same reference string.",
    stem: "A process has three frames of memory, all empty at the start. The pages it requests are: " + R2.join(", ") + ".\n\nFIFO replacement is used. The table shows the state of the frames after each request (the oldest page is listed first).\n\n" + refTable(R2, 3, "FIFO"),
    parts: [
      P.num({ label: "(a)", marks: 1, stem: "State the number of page faults with FIFO.", value: f2.faults, wrong: [8, 4], workedSolution: "Count the rows with a fault: " + f2.faults + ".", explanation: `FIFO gives ${f2.faults} faults.` }),
      P.num({ label: "(b)", marks: 2, stem: "Work out the number of page faults if LRU replacement is used on the same requests.", value: l2.faults, wrong: [f2.faults + 1, 3], workedSolution: "Trace:\n\n" + refTable(R2, 3, "LRU") + `\n\nThere are ${l2.faults} faults.`, explanation: `LRU gives ${l2.faults} faults.` }),
      P.num({ label: "(c)", marks: 2, stem: "Work out the number of page faults with the optimal algorithm.", value: o2.faults, wrong: [f2.faults, 3], workedSolution: "Trace:\n\n" + refTable(R2, 3, "OPT") + `\n\nThere are ${o2.faults} faults.`, explanation: `Optimal gives ${o2.faults} faults.` }),
      P.manual({ label: "(d)", marks: 3, stem: "Explain why the optimal algorithm cannot be used in practice but is still useful.", points: ["It needs to know which pages will be requested in the future", "The future is not known to the OS", "It is useful as a standard to compare the other algorithms against (it gives the fewest faults)"], modelAnswer: "It needs to know which pages will be requested in future, which the OS cannot know, but it is useful as a yardstick because it gives the fewest page faults.", explanation: "Needs the future; a benchmark." }),
    ] });
  b.struct({ d: 3, skill: "APPLICATION", examStyle: true, hints: ["Split the logical address into page and offset."],
    explanation: "Page number and offset, then the frame from the page table.",
    stem: "A computer uses paging with a page size of 512 bytes. Part of the page table for a process is:\n\n" + ptab,
    parts: [
      P.fib({ label: "(a)", marks: 2, stem: "The logical address 700 is used. State the page number and the offset.", template: "Page number: {{blank:p}}\n\nOffset: {{blank:o}}", blanks: [{ id: "p", accepted: [String(t2.page)], input: "number" }, { id: "o", accepted: [String(t2.off)], input: "number" }], wrong: [["0", "700"]], explanation: "700 ÷ 512 = 1 remainder 188." }),
      P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: "Calculate the physical address for the logical address 700.", value: t2.pa, wrong: [188, 700], workedSolution: `1. Page 1 is in frame 3.\n2. 3 × 512 + 188 = ${t2.pa}.`, explanation: `Frame 3, offset 188: ${t2.pa}.` }),
      P.manual({ label: "(c)", marks: 2, stem: "Give two reasons why paging is used in a multi-tasking operating system.", points: ["Pages can be put into any free frames, so a large block of free memory is not needed", "Only the pages being used need to be in memory, so more processes can run / supports virtual memory"], modelAnswer: "Pages can go into any free frames, so no large block of free memory is needed, and only the pages in use need to be in memory, so more processes can run.", explanation: "Flexible placement; virtual memory." }),
    ] });

  // ---- flashcards
  b.card("DEFINITION", "Paging", "Dividing a program into fixed-size pages and memory into frames of the same size; any page can go in any frame.");
  b.card("DEFINITION", "Page table", "Records the frame that holds each page of a process.");
  b.card("DEFINITION", "Segmentation", "Dividing a program into logical segments of different sizes, each with a base address and a limit.");
  b.card("DEFINITION", "Virtual memory", "Using the disk as an extension of main memory so a program can be larger than the RAM.");
  b.card("DEFINITION", "Page fault", "A request for a page that is not in main memory; the page is loaded from the disk.");
  b.card("FORMULA", "Physical address", "Frame number × page size + offset; page = logical address ÷ page size, offset = the remainder.");
  b.card("CONCEPT", "FIFO, LRU and optimal", "FIFO replaces the oldest page, LRU the least recently used, optimal the page needed furthest in the future (not possible in practice).");
  b.card("CONCEPT", "Thrashing", "Constant swapping of pages between disk and memory with very little useful work; reduced by closing programs or adding RAM.");
  b.card("CONCEPT", "Paging against segmentation", "Pages: equal size, physical. Segments: unequal size, logical, with base and limit.");
});
