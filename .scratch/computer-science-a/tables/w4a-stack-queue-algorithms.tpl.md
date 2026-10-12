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

{{stackPseudo}}

`Push` returns TRUE if the item was stored and FALSE on overflow. `Pop` returns -1 on underflow, since the stack in this example holds only non-negative integers.

:::worked-solution{title="Tracing push and pop with the top pointer"}
The operations on an empty stack of 5 places are: push 40, push 25, push 60, pop, pop, push 15, pop, pop, pop. Removed items are shown as empty places because they are no longer part of the stack.

{{stackTable}}

The pops return 60, 25, 15 and 40, in the reverse order of the pushes that are still on the stack. After the eighth operation the stack is empty (`TopPointer` = 0), so the last pop fails: `IsEmpty()` is TRUE and `Pop` returns -1 without changing the pointer.
:::

The same stack as a Python class. Python counts from 0, so `top` is the number of items and also the index of the next free place; the program was run for real:

{{stackPy}}

{{stackOut}}

The fourth push failed because the stack, of size 3, was full, and the pops returned the most recent pages first.

:::worked-solution{title="Reversing a word with a stack"}
A stack reverses the order of items: push every letter, then pop them all.

{{revPy}}

{{revOut}}

The letters of KARIBA are pushed in the order K, A, R, I, B, A and popped in the order A, B, I, R, A, K.
:::

## A queue in an array

A linear queue in an array has a problem. Each dequeue moves `Front` along, but the places before `Front` are never used again, and `Rear` can reach the end of the array while there is space at the start.

{{linearTable}}

The last enqueue fails although two places are empty. The **circular queue** solves this by wrapping `Rear` and `Front` round to place 1 and by using a count of the items to decide when the queue is full or empty.

{{queuePseudo}}

:::worked-solution{title="Tracing a circular queue with wrap-around"}
The queue has 5 places. `FrontPointer` starts at 1, `RearPointer` at 0 and `Count` at 0. The operations are: enqueue Rudo, Sipho, Tatenda and Chipo; dequeue twice; enqueue Farai, Nyasha, Thandeka and Blessing.

{{queueTable}}

The dequeues return Rudo and Sipho, in the order of arrival. Farai takes place 5. For Nyasha, `RearPointer` is 5, and `MOD(5, 5) + 1` = 1, so Nyasha uses the place freed by Rudo. Thandeka takes place 2 and the queue is then full (`Count` = 5). The last enqueue, Blessing, finds `Count = QueueSize` and returns FALSE without changing anything.
:::

The same queue in Python, again with indexes from 0 (so `rear` starts at -1 and wraps with `% self.size`):

{{queuePy}}

{{queueOut}}

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
