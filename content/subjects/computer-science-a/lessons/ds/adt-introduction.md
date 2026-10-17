---
{
  "key": "ds.adt-introduction",
  "title": "Abstract data types: stack, queue and linked list",
  "summary": "An abstract data type as data plus operations, the key features of a stack, a queue (including the circular queue) and a linked list, justifying each for a situation, adding, editing and deleting items by hand-tracing, and implementing each with arrays.",
  "concepts": ["acs.ds.adt-introduction"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

At a clinic in Kariba, patients take a numbered ticket and are called in order of arrival: the first to arrive is the first to be seen. In a word processor, pressing "undo" reverses the most recent change first, then the one before it. A school keeps an alphabetical list of pupils on which names are often added and removed. Each of these has its own rule for how items are added and removed: first in, first out; last in, first out; and "insert anywhere in order".

Programmers capture such rules in **abstract data types (ADTs)**. This lesson introduces the **stack**, the **queue** and the **linked list**, and shows how to trace them by hand and store them in arrays. All tables were produced by code that simulates the operations. You should already know arrays and pointers.

## Key definitions

:::definition{term="Abstract data type (ADT)"}
A collection of data together with the operations that can be performed on it, defined by what it does and not by how it is stored.
:::

:::definition{term="Stack"}
A last in, first out (LIFO) structure. Items are added (pushed) and removed (popped) at the same end, the top, which a stack pointer identifies. Peek reads the top item without removing it.
:::

:::definition{term="Queue"}
A first in, first out (FIFO) structure. Items are added (enqueued) at the rear and removed (dequeued) from the front. A front pointer and a rear pointer identify the two ends.
:::

:::definition{term="Linked list"}
A structure of nodes, each holding a data item and a pointer to the next node, with a start pointer to the first node. The last node's pointer is null.
:::

:::definition{term="Circular queue"}
A queue stored in an array in which the rear pointer wraps round to the first place after the last, so that places freed at the front can be reused.
:::

## Stack

Only the top of a stack is accessible. To push, the stack pointer moves up one place and the item is stored; to pop, the item at the pointer is returned and the pointer moves down. Pushing onto a full stack and popping an empty stack are errors that must be tested for.

![Stack of six places after push 12, push 7, push 20, pop, push 5, pop, pop: the pops return 20, 5 and 7 (last in, first out) and the stack finally holds only 12 with Top = 1](media:diagrams/ds-stack-trace.png "Figure: the stack after each of seven push and pop operations")


:::worked-solution{title="Tracing a stack of six places"}
The operations are push 12, push 7, push 20, pop, push 5, pop, pop. `Top` is the stack pointer (0 when the stack is empty). A removed item is no longer part of the stack, so its place is shown empty.

| Operation | Top | [1] | [2] | [3] | [4] | [5] | [6] | Result |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| push 12 | 1 | 12 |  |  |  |  |  |  |
| push 7 | 2 | 12 | 7 |  |  |  |  |  |
| push 20 | 3 | 12 | 7 | 20 |  |  |  |  |
| pop | 2 | 12 | 7 |  |  |  |  | returns 20 |
| push 5 | 3 | 12 | 7 | 5 |  |  |  |  |
| pop | 2 | 12 | 7 |  |  |  |  | returns 5 |
| pop | 1 | 12 |  |  |  |  |  | returns 7 |

Pop returns the **last** item pushed: 20, then 5, then 7. The stack finally holds one item, 12, with `Top` = 1. In Python a list works as a stack, using `append` to push and `pop` to remove the top; the program was run for real:

```python
stack = []
stack.append(12)
stack.append(7)
stack.append(20)
print(stack.pop())
stack.append(5)
print(stack[-1])
print(stack)
```

```
20
5
[12, 7, 5]
```
:::

Uses: the **undo** feature, the back button of a browser, checking brackets in an expression, and the **call stack** that holds the return addresses and local variables of subroutine calls.

## Queue

A queue has a front pointer (where the next item leaves) and a rear pointer (where the last item arrived). In a simple array the rear moves along and places before the front are wasted. A **circular queue** avoids this: when the rear passes the last place it wraps to place 1 using `Rear ← MOD(Rear, Size) + 1`, and the front wraps in the same way. A count of the items tells whether the queue is full (`Count = Size`) or empty (`Count = 0`).

![Circular queue of five places after the lesson's operations: places 1 to 5 hold T6, T7, T3, T4 and T5, Front = 3 and Rear = 2, Count = 5 so it is full, and T6 and T7 reused the places emptied by T1 and T2](media:diagrams/ds-circular-queue.png "Figure: the final state of the circular queue, with Front and Rear")


:::worked-solution{title="Tracing a circular queue of five places"}
The queue starts empty with `Front` = 1, `Rear` = 0 and `Count` = 0. The operations are enqueue T1, T2 and T3; dequeue; enqueue T4, T5 and T6; dequeue; enqueue T7.

| Operation | Front | Rear | Count | [1] | [2] | [3] | [4] | [5] | Result |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| enqueue T1 | 1 | 1 | 1 | T1 |  |  |  |  |  |
| enqueue T2 | 1 | 2 | 2 | T1 | T2 |  |  |  |  |
| enqueue T3 | 1 | 3 | 3 | T1 | T2 | T3 |  |  |  |
| dequeue | 2 | 3 | 2 |  | T2 | T3 |  |  | returns T1 |
| enqueue T4 | 2 | 4 | 3 |  | T2 | T3 | T4 |  |  |
| enqueue T5 | 2 | 5 | 4 |  | T2 | T3 | T4 | T5 |  |
| enqueue T6 | 2 | 1 | 5 | T6 | T2 | T3 | T4 | T5 |  |
| dequeue | 3 | 1 | 4 | T6 |  | T3 | T4 | T5 | returns T2 |
| enqueue T7 | 3 | 2 | 5 | T6 | T7 | T3 | T4 | T5 |  |

T1 leaves first, then T2, which is the order of arrival (FIFO). When T6 is enqueued, `Rear` was 5, the last place, so it wraps to 1 and T6 uses the place left empty by T1. After the final operation the queue is full (`Count` = 5) with `Front` = 3 and `Rear` = 2: the rear is just behind the front. Python can use a list with `append` to enqueue and `pop(0)` to dequeue (a real run):

```python
queue = []
queue.append("T1")
queue.append("T2")
queue.append("T3")
print(queue.pop(0))
queue.append("T4")
print(queue)
```

```
T1
['T2', 'T3', 'T4']
```
:::

Uses: a **print queue**, customers waiting for service, and a keyboard buffer.

## Linked list

A linked list stores the order of the items in pointers, not in the positions of the array. Two arrays are used: `Data` holds the items and `Next` holds the index of the next node (0 means null). `Start` is the index of the first node. The unused nodes are linked together in a **free list**, whose first node is identified by `Free`. To add an item, take a node from the free list, store the item and change the pointers so that the node is in the right place; to delete, change one pointer so the node is skipped and put the node back on the free list. No items have to be moved.

:::worked-solution{title="Adding and deleting in an alphabetical linked list"}
The list holds four names in alphabetical order. The names are stored in the order they arrived (so the nodes are not in order in the array), and nodes 5 and 6 are free.

| Index | Data | Next |
|:-:|:-:|:-:|
| 1 | Nyasha | 3 |
| 2 | Chipo | 4 |
| 3 | Tatenda | 0 |
| 4 | Farai | 1 |
| 5 | (unused) | 6 |
| 6 | (unused) | 0 |

Start = 2, Free = 5

Following the pointers from `Start` = 2 gives Chipo (2) → Farai (4) → Nyasha (1) → Tatenda (3) → null (0).

**Add Rudo.** The first free node is 5. Rudo comes after Nyasha (node 1) and before Tatenda (node 3), so `Data[5]` is set to Rudo, `Next[5]` is set to 3 and `Next[1]` is changed from 3 to 5. `Free` becomes 6.

![Linked list after adding Rudo: following Next from Start = 2 gives Chipo, Farai, Nyasha, Rudo, Tatenda, null; only Next1 changed from 3 to 5 and Rudo's Next is 3, so no items moved](media:diagrams/ds-linked-list-add-rudo.png "Figure: the names in alphabetical order; Nyasha and Rudo (amber) are the nodes whose pointers changed")


| Index | Data | Next |
|:-:|:-:|:-:|
| 1 | Nyasha | 5 |
| 2 | Chipo | 4 |
| 3 | Tatenda | 0 |
| 4 | Farai | 1 |
| 5 | Rudo | 3 |
| 6 | (unused) | 0 |

Start = 2, Free = 6

**Delete Farai.** Farai is node 4 and the node before it in the list is Chipo (node 2). `Next[2]` is changed from 4 to Farai's pointer, 1, so Chipo now points to Nyasha. Node 4 is put at the front of the free list: `Next[4]` is set to the old `Free` (6) and `Free` becomes 4.

| Index | Data | Next |
|:-:|:-:|:-:|
| 1 | Nyasha | 5 |
| 2 | Chipo | 1 |
| 3 | Tatenda | 0 |
| 4 | Farai | 6 |
| 5 | Rudo | 3 |
| 6 | (unused) | 0 |

Start = 2, Free = 4

Following the pointers now gives Chipo → Nyasha → Rudo → Tatenda. Only two pointers changed in each operation, and no data was moved. To **edit** an item, find it by following the pointers and replace its data (and move it if its alphabetical position changes).
:::

## Choosing a structure

| Structure | Rule | Operations | Typical use |
|:-:|:-:|:-:|:-:|
| Stack | last in, first out (LIFO) | push, pop, peek | undo, the back button, calls of subroutines |
| Queue | first in, first out (FIFO) | enqueue, dequeue | print jobs, customers waiting, keyboard buffer |
| Linked list | items linked by pointers; order is by the pointers, not the positions | add, find, delete (no shifting) | a sorted list with frequent additions and deletions |

## Static and dynamic implementations

The three structures above were implemented with fixed-size arrays, which is a **static** implementation: the size is chosen in advance and memory for the unused places is wasted, and an attempt to add to a full structure fails. A **dynamic** implementation obtains memory for each node only when an item is added (linked nodes created as needed) and returns it when the item is removed, so the structure can grow and shrink up to the memory available.

:::keyfact{title="ZIMSEC and Cambridge"}
Both boards examine stacks, queues and linked lists as ADTs: their features, hand-tracing adds, edits and deletes, array implementations and the choice of structure for a situation (ZIMSEC Form 5 data structures; Cambridge AS Level topic 10.3). Pseudocode to implement them is not required at AS Level; Cambridge A Level requires it, which is covered in the later lessons on stack, queue and linked list algorithms.
:::

## Common mistakes

:::mistake{title="Mixing up LIFO and FIFO"}
A stack is last in, first out; a queue is first in, first out. Check the order in which items leave.
:::

:::mistake{title="Forgetting to move the pointer"}
Push moves the stack pointer up and pop moves it down. A dequeue moves the front pointer along, and an enqueue moves the rear pointer.
:::

:::mistake{title="Not wrapping the pointers of a circular queue"}
After place 5 of a five-place queue the next place is 1, not 6. Use `MOD` to wrap.
:::

:::mistake{title="Deleting from a linked list by erasing the node"}
The usual deletion changes the previous node's pointer to skip the node, and returns it to the free list. The data need not be erased.
:::

## Exam tips

:::exam-tip
Cambridge Paper 1 and ZIMSEC Paper 1 give a stack, queue or linked list as a table and a list of operations and ask you to **complete** the table (values and pointers) or **state** what is returned. Update the pointers on every row, and in a linked list follow the pointers, never the array order.
:::

:::exam-tip
"**Justify** the use of a stack (or queue)" needs the rule (LIFO or FIFO) linked to the situation in the question: "the last page visited must be the first one returned to, so a stack is suitable".
:::

## Summary

:::summary
- An abstract data type is data with its operations, defined without saying how it is stored.
- A stack is LIFO with a top pointer (push, pop, peek); a queue is FIFO with front and rear pointers (enqueue, dequeue).
- A circular queue wraps its pointers with `MOD` so freed places are reused; a count tells whether it is full or empty.
- A linked list uses data and pointer arrays, a start pointer and a free list; insertion and deletion change pointers without moving data.
- Array implementations are static (fixed size); dynamic implementations create and release nodes as needed.
:::
