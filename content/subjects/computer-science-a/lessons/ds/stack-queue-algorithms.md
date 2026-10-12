---
{
  "key": "ds.stack-queue-algorithms",
  "title": "Stack and queue algorithms",
  "summary": "Writing algorithms in pseudocode and Python to implement a stack and a queue with arrays: push, pop, enqueue and dequeue with pointers, full and empty tests and the wrap-around of a circular queue, traced with the pointers shown, with uses such as undo, browser history and print queues.",
  "concepts": ["acs.ds.stack-queue-algorithms"],
  "estimatedMinutes": 60,
  "level": "core",
  "freePreview": true
}
---
## Introduction

A browser keeps the pages you have visited so that the back button can return to the last one first. A school print server holds jobs from teachers' computers and prints them in the order received. The earlier lesson described the stack and the queue as abstract data types. This lesson shows how a programmer **implements** them: the pseudocode and Python that store the items in an array, move the pointers and test for full and empty.

The tables and outputs were produced by code. The pseudocode uses 1 as the first array place, and Python programs use 0, so the pointer values in the Python outputs differ by one. You should already know arrays, functions and the stack and queue as ADTs.

## Key definitions

:::definition{term="Stack pointer (top pointer)"}
A variable holding the position of the top item of a stack in its array; it is 0 (in a 1-based array) when the stack is empty.
:::

:::definition{term="Front pointer and rear pointer"}
Variables holding the position of the first item of a queue (the next to leave) and the position of the last item added.
:::

:::definition{term="Stack overflow and underflow"}
An overflow is an attempt to push onto a full stack; an underflow is an attempt to pop from an empty stack. Both must be tested for.
:::

:::definition{term="Wrap-around"}
Moving a pointer from the last place of an array back to the first. In a circular queue, `MOD(Pointer, Size) + 1` does this.
:::

## A stack in an array

The stack is held in an array, with a pointer `TopPointer` that shows the last place used. **Push** adds one to the pointer and stores the item (after checking that the stack is not full). **Pop** returns the item at the pointer and takes one from the pointer (after checking that the stack is not empty). The item stays in the array, but anything above `TopPointer` is not part of the stack.

```
CONSTANT StackSize ← 5
DECLARE Stack : ARRAY[1:5] OF INTEGER
DECLARE TopPointer : INTEGER

PROCEDURE InitialiseStack()
    TopPointer ← 0
ENDPROCEDURE

FUNCTION IsEmpty() RETURNS BOOLEAN
    RETURN TopPointer = 0
ENDFUNCTION

FUNCTION IsFull() RETURNS BOOLEAN
    RETURN TopPointer = StackSize
ENDFUNCTION

FUNCTION Push(Item : INTEGER) RETURNS BOOLEAN
    IF IsFull() THEN
        RETURN FALSE
    ELSE
        TopPointer ← TopPointer + 1
        Stack[TopPointer] ← Item
        RETURN TRUE
    ENDIF
ENDFUNCTION

FUNCTION Pop() RETURNS INTEGER
    DECLARE Item : INTEGER
    IF IsEmpty() THEN
        RETURN -1        // -1 shows that the stack was empty
    ELSE
        Item ← Stack[TopPointer]
        TopPointer ← TopPointer - 1
        RETURN Item
    ENDIF
ENDFUNCTION
```

`Push` returns TRUE if the item was stored and FALSE on overflow. `Pop` returns -1 on underflow, since the stack in this example holds only non-negative integers.

:::worked-solution{title="Tracing push and pop with the top pointer"}
The operations on an empty stack of 5 places are: push 40, push 25, push 60, pop, pop, push 15, pop, pop, pop. Removed items are shown as empty places because they are no longer part of the stack.

| Operation | Top | [1] | [2] | [3] | [4] | [5] | Result |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| push 40 | 1 | 40 |  |  |  |  |  |
| push 25 | 2 | 40 | 25 |  |  |  |  |
| push 60 | 3 | 40 | 25 | 60 |  |  |  |
| pop | 2 | 40 | 25 |  |  |  | returns 60 |
| pop | 1 | 40 |  |  |  |  | returns 25 |
| push 15 | 2 | 40 | 15 |  |  |  |  |
| pop | 1 | 40 |  |  |  |  | returns 15 |
| pop | 0 |  |  |  |  |  | returns 40 |
| pop | 0 |  |  |  |  |  | stack empty |

The pops return 60, 25, 15 and 40, in the reverse order of the pushes that are still on the stack. After the eighth operation the stack is empty (`TopPointer` = 0), so the last pop fails: `IsEmpty()` is TRUE and `Pop` returns -1 without changing the pointer.
:::

The same stack as a Python class. Python counts from 0, so `top` is the number of items and also the index of the next free place; the program was run for real:

```python
class Stack:
    def __init__(self, size):
        self.items = [None] * size
        self.size = size
        self.top = 0

    def is_empty(self):
        return self.top == 0

    def is_full(self):
        return self.top == self.size

    def push(self, item):
        if self.is_full():
            return False
        self.items[self.top] = item
        self.top = self.top + 1
        return True

    def pop(self):
        if self.is_empty():
            return None
        self.top = self.top - 1
        return self.items[self.top]

pages = Stack(3)
for page in ("Home", "News", "Sport", "Weather"):
    print(page, pages.push(page))
print(pages.pop())
print(pages.pop())
print(pages.is_empty())
```

```
Home True
News True
Sport True
Weather False
Sport
News
False
```

The fourth push failed because the stack, of size 3, was full, and the pops returned the most recent pages first.

:::worked-solution{title="Reversing a word with a stack"}
A stack reverses the order of items: push every letter, then pop them all.

```python
word = "KARIBA"
stack = []
for letter in word:
    stack.append(letter)
reversed_word = ""
while len(stack) > 0:
    reversed_word = reversed_word + stack.pop()
print(reversed_word)
```

```
ABIRAK
```

The letters of KARIBA are pushed in the order K, A, R, I, B, A and popped in the order A, B, I, R, A, K.
:::

## A queue in an array

A linear queue in an array has a problem. Each dequeue moves `Front` along, but the places before `Front` are never used again, and `Rear` can reach the end of the array while there is space at the start.

| Operation | Front | Rear | [1] | [2] | [3] | [4] | Result |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| enqueue A | 1 | 1 | A |  |  |  |  |
| enqueue B | 1 | 2 | A | B |  |  |  |
| enqueue C | 1 | 3 | A | B | C |  |  |
| enqueue D | 1 | 4 | A | B | C | D |  |
| dequeue | 2 | 4 |  | B | C | D | returns A |
| dequeue | 3 | 4 |  |  | C | D | returns B |
| enqueue E | 3 | 4 |  |  | C | D | not stored: Rear is at the last place |

The last enqueue fails although two places are empty. The **circular queue** solves this by wrapping `Rear` and `Front` round to place 1 and by using a count of the items to decide when the queue is full or empty.

```
CONSTANT QueueSize ← 5
DECLARE Queue : ARRAY[1:5] OF STRING
DECLARE FrontPointer, RearPointer, Count : INTEGER

PROCEDURE InitialiseQueue()
    FrontPointer ← 1
    RearPointer ← 0
    Count ← 0
ENDPROCEDURE

FUNCTION Enqueue(Item : STRING) RETURNS BOOLEAN
    IF Count = QueueSize THEN
        RETURN FALSE
    ELSE
        RearPointer ← MOD(RearPointer, QueueSize) + 1
        Queue[RearPointer] ← Item
        Count ← Count + 1
        RETURN TRUE
    ENDIF
ENDFUNCTION

FUNCTION Dequeue() RETURNS STRING
    DECLARE Item : STRING
    IF Count = 0 THEN
        RETURN ""        // an empty string shows that the queue was empty
    ELSE
        Item ← Queue[FrontPointer]
        FrontPointer ← MOD(FrontPointer, QueueSize) + 1
        Count ← Count - 1
        RETURN Item
    ENDIF
ENDFUNCTION
```

:::worked-solution{title="Tracing a circular queue with wrap-around"}
The queue has 5 places. `FrontPointer` starts at 1, `RearPointer` at 0 and `Count` at 0. The operations are: enqueue Rudo, Sipho, Tatenda and Chipo; dequeue twice; enqueue Farai, Nyasha, Thandeka and Blessing.

| Operation | Front | Rear | Count | [1] | [2] | [3] | [4] | [5] | Result |
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| enqueue Rudo | 1 | 1 | 1 | Rudo |  |  |  |  |  |
| enqueue Sipho | 1 | 2 | 2 | Rudo | Sipho |  |  |  |  |
| enqueue Tatenda | 1 | 3 | 3 | Rudo | Sipho | Tatenda |  |  |  |
| enqueue Chipo | 1 | 4 | 4 | Rudo | Sipho | Tatenda | Chipo |  |  |
| dequeue | 2 | 4 | 3 |  | Sipho | Tatenda | Chipo |  | returns Rudo |
| dequeue | 3 | 4 | 2 |  |  | Tatenda | Chipo |  | returns Sipho |
| enqueue Farai | 3 | 5 | 3 |  |  | Tatenda | Chipo | Farai |  |
| enqueue Nyasha | 3 | 1 | 4 | Nyasha |  | Tatenda | Chipo | Farai |  |
| enqueue Thandeka | 3 | 2 | 5 | Nyasha | Thandeka | Tatenda | Chipo | Farai |  |
| enqueue Blessing | 3 | 2 | 5 | Nyasha | Thandeka | Tatenda | Chipo | Farai | queue full: not stored |

The dequeues return Rudo and Sipho, in the order of arrival. Farai takes place 5. For Nyasha, `RearPointer` is 5, and `MOD(5, 5) + 1` = 1, so Nyasha uses the place freed by Rudo. Thandeka takes place 2 and the queue is then full (`Count` = 5). The last enqueue, Blessing, finds `Count = QueueSize` and returns FALSE without changing anything.
:::

The same queue in Python, again with indexes from 0 (so `rear` starts at -1 and wraps with `% self.size`):

```python
class CircularQueue:
    def __init__(self, size):
        self.items = [None] * size
        self.size = size
        self.front = 0
        self.rear = -1
        self.count = 0

    def enqueue(self, item):
        if self.count == self.size:
            return False
        self.rear = (self.rear + 1) % self.size
        self.items[self.rear] = item
        self.count = self.count + 1
        return True

    def dequeue(self):
        if self.count == 0:
            return None
        item = self.items[self.front]
        self.front = (self.front + 1) % self.size
        self.count = self.count - 1
        return item

jobs = CircularQueue(3)
for name in ("J1", "J2", "J3", "J4"):
    print(name, jobs.enqueue(name))
print(jobs.dequeue())
print(jobs.enqueue("J4"))
print(jobs.items, jobs.front, jobs.rear)
```

```
J1 True
J2 True
J3 True
J4 False
J1
True
['J4', 'J2', 'J3'] 1 0
```

The fourth enqueue failed. After J1 left, J4 was stored in the place J1 had used, so the list shows `J4` first. The pointers `front` = 1 and `rear` = 0 show the wrap-around.

## Uses

- **Stack**: undo, the back button of a browser, reversing data, checking that brackets match, evaluating expressions, and the call stack of subroutines.
- **Queue**: the print queue, buffers (keyboard, network) that hold items until they are processed, and the waiting line in simulations of banks or clinics.

:::keyfact{title="ZIMSEC and Cambridge"}
Writing stack and queue algorithms in pseudocode and Python is Cambridge A Level content (topic 19.1, Papers 3 and 4). ZIMSEC covers the ADTs themselves at Form 5 (previous lesson) but does not require the algorithms. The 9618 guide names the pointers as the programmer chooses; the names used here are our own.
:::

## Common mistakes

:::mistake{title="Not testing for full or empty"}
A push on a full stack writes beyond the array, and a pop on an empty stack returns an item that is not there. Test `IsFull()` and `IsEmpty()` first.
:::

:::mistake{title="Changing the pointer in the wrong order"}
For a push, increase the pointer before storing. For a pop, take the item and then decrease the pointer. Doing it the other way round loses or repeats an item.
:::

:::mistake{title="Forgetting to wrap the pointers of a circular queue"}
Without `MOD`, the pointer reaches `QueueSize + 1`, outside the array. Both `Front` and `Rear` must wrap.
:::

:::mistake{title="Deciding full or empty from the pointers alone"}
In a circular queue, `Front` and `Rear` can be next to each other both when the queue is full and when it is empty. Use the count.
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 asks you to **write** the pseudocode for push, pop, enqueue or dequeue (with the full or empty test), and to **trace** the pointers for a list of operations. Give the full or empty test first, then change the pointer and store or return the item, and show the pointer value on every row of a trace.
:::

:::exam-tip
"**Explain** why a circular queue is better than a linear queue" needs: places freed at the front can be reused because the pointer wraps to the start, so the array is not wasted.
:::

## Summary

:::summary
- A stack in an array uses a top pointer: push tests for full, increases the pointer and stores; pop tests for empty, returns the item and decreases the pointer.
- A queue uses front and rear pointers (and a count): enqueue stores at the rear, dequeue returns the item at the front.
- A circular queue wraps both pointers with `MOD(Pointer, Size) + 1` so freed places are reused; the count decides when it is full or empty.
- Pseudocode arrays start at 1 here, Python lists at 0, so pointer values differ by one.
- Stacks are used for undo, history and the call stack; queues for print jobs and buffers.
:::
