---
{
  "key": "ds.linked-list-algorithms",
  "title": "Linked list algorithms",
  "summary": "Implementing a linked list with arrays of data and pointers, the start and free list pointers, algorithms to find, insert at the front, in the middle and at the end, and delete an item with the pointer arrays traced, comparing a linked list with an array, and an object-based list in Python.",
  "concepts": ["acs.ds.linked-list-algorithms"],
  "estimatedMinutes": 60,
  "level": "core"
}
---
## Introduction

A school in Gweru keeps the names of its sports team members in alphabetical order. New members join and others leave all the time. If the names are in an array, adding one in the middle means moving every later name one place along, and removing one leaves a gap that must be closed. A **linked list** avoids this: each name is stored together with a pointer to the next name, so adding or removing a name only changes a pointer.

The earlier lesson explained the linked list as an abstract data type. This lesson gives the algorithms to **find**, **insert** and **delete** in a linked list stored in two arrays, traced with the pointers, and then shows an object-based version in Python. The tables and outputs were produced by code. You should already know arrays, functions and the stack and queue algorithms.

## Key definitions

:::definition{term="Node"}
One item of a linked list: a data value and a pointer to the next node. In an array implementation, node `n` is `Data[n]` with its pointer `Next[n]`.
:::

:::definition{term="Start pointer"}
The index of the first node of the list. It is 0 (null) when the list is empty.
:::

:::definition{term="Free list pointer"}
The index of the first of the unused nodes, which are linked together by their `Next` pointers. It is 0 when no node is free and the list is full.
:::

:::definition{term="Null pointer"}
A pointer value (0 in the array version) meaning that there is no node to point to; it ends the list and the free list.
:::

## The data structure

Two arrays of the same size hold the list: `Data` for the items and `Next` for the pointers. The order of the list is given by the pointers, starting at `StartPointer`, and not by the order of the array. At the start every node is free, so the free list links all the nodes in order: `Next[1]` = 2, `Next[2]` = 3 and so on, and `Next[6]` = 0.

```
CONSTANT ListSize ← 6
DECLARE Data : ARRAY[1:6] OF STRING
DECLARE Next : ARRAY[1:6] OF INTEGER
DECLARE StartPointer, FreePointer : INTEGER

PROCEDURE InitialiseList()
    DECLARE Index : INTEGER
    StartPointer ← 0
    FreePointer ← 1
    FOR Index ← 1 TO ListSize - 1
        Next[Index] ← Index + 1
    NEXT Index
    Next[ListSize] ← 0
ENDPROCEDURE

FUNCTION Find(Item : STRING) RETURNS INTEGER
    DECLARE Current : INTEGER
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] <> Item DO
        Current ← Next[Current]
    ENDWHILE
    RETURN Current        // 0 if the item is not in the list
ENDFUNCTION

FUNCTION Insert(Item : STRING) RETURNS BOOLEAN
    DECLARE NewNode, Previous, Current : INTEGER
    IF FreePointer = 0 THEN
        RETURN FALSE      // no free node: the list is full
    ENDIF
    NewNode ← FreePointer
    FreePointer ← Next[NewNode]
    Data[NewNode] ← Item
    Previous ← 0
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] < Item DO
        Previous ← Current
        Current ← Next[Current]
    ENDWHILE
    Next[NewNode] ← Current
    IF Previous = 0 THEN
        StartPointer ← NewNode
    ELSE
        Next[Previous] ← NewNode
    ENDIF
    RETURN TRUE
ENDFUNCTION

FUNCTION Delete(Item : STRING) RETURNS BOOLEAN
    DECLARE Previous, Current : INTEGER
    Previous ← 0
    Current ← StartPointer
    WHILE Current <> 0 AND Data[Current] <> Item DO
        Previous ← Current
        Current ← Next[Current]
    ENDWHILE
    IF Current = 0 THEN
        RETURN FALSE      // not found
    ENDIF
    IF Previous = 0 THEN
        StartPointer ← Next[Current]
    ELSE
        Next[Previous] ← Next[Current]
    ENDIF
    Next[Current] ← FreePointer
    FreePointer ← Current
    RETURN TRUE
ENDFUNCTION
```

**Finding** an item starts at `StartPointer` and follows the pointers until the item is found or the null pointer is reached. **Inserting** takes the first free node, stores the item in it, finds the right place by walking the list, and then sets the pointers. There are three cases, handled by the same code:

- **at the front**: the new item is smaller than all items, so `Previous` stays 0; the new node's pointer is set to the old start and `StartPointer` becomes the new node;
- **in the middle**: the previous node's pointer is changed to the new node, and the new node points to the node that follows;
- **at the end**: `Current` is 0 when the loop ends, so the new node's pointer is null and the previous node points to it.

**Deleting** finds the item and the node before it, makes the previous node (or `StartPointer`) skip the item, and puts the freed node at the front of the free list.

:::worked-solution{title="Tracing a sequence of operations on a list of six nodes"}
The list starts empty. The operations are: insert Tendai, Farai, Rudo, Anesu and Zodwa; delete Rudo; insert Nyasha. The table gives the pointers and the order of the list after each operation.

| Operation | Start | Free | List order | Free nodes in order | Note |
|:-:|:-:|:-:|:-:|:-:|:-:|
| InitialiseList | 0 | 1 | (empty) | 1, 2, 3, 4, 5, 6 | all six nodes are free |
| Insert "Tendai" | 1 | 2 | Tendai | 2, 3, 4, 5, 6 | node 1 |
| Insert "Farai" | 2 | 3 | Farai, Tendai | 3, 4, 5, 6 | node 2 |
| Insert "Rudo" | 2 | 4 | Farai, Rudo, Tendai | 4, 5, 6 | node 3 |
| Insert "Anesu" | 4 | 5 | Anesu, Farai, Rudo, Tendai | 5, 6 | node 4 |
| Insert "Zodwa" | 4 | 6 | Anesu, Farai, Rudo, Tendai, Zodwa | 6 | node 5 |
| Delete "Rudo" | 4 | 3 | Anesu, Farai, Tendai, Zodwa | 3, 6 | node 3 freed |
| Insert "Nyasha" | 4 | 6 | Anesu, Farai, Nyasha, Tendai, Zodwa | 6 | node 3 |

Tendai goes to node 1 and becomes the start. Farai is smaller than Tendai, so it is inserted at the **front** (node 2, the new start). Rudo goes in the **middle** (node 3), between Farai and Tendai. Anesu is inserted at the **front** (node 4). Zodwa is larger than all, so it goes at the **end** (node 5).

The arrays after the five insertions:

| Index | Data | Next |
|:-:|:-:|:-:|
| 1 | Tendai | 5 |
| 2 | Farai | 3 |
| 3 | Rudo | 1 |
| 4 | Anesu | 2 |
| 5 | Zodwa | 0 |
| 6 | (unused) | 0 |

Start = 4, Free = 6

Following the pointers from `Start` = 4: Anesu (4) → Farai (2) → Rudo (3) → Tendai (1) → Zodwa (5) → null (0).

**Delete Rudo** (node 3). The previous node is Farai (node 2). `Next[2]` is changed from 3 to Rudo's pointer, 1, so Farai now points to Tendai. Node 3 becomes the first free node: `Next[3]` is set to the old `FreePointer` (6) and `FreePointer` becomes 3.

**Insert Nyasha.** The first free node is 3, the node freed by Rudo, so the space is reused. Nyasha goes between Farai and Tendai: `Next[3]` is set to 1 and `Next[2]` to 3.

| Index | Data | Next |
|:-:|:-:|:-:|
| 1 | Tendai | 5 |
| 2 | Farai | 3 |
| 3 | Nyasha | 1 |
| 4 | Anesu | 2 |
| 5 | Zodwa | 0 |
| 6 | (unused) | 0 |

Start = 4, Free = 6

The list is now Anesu, Farai, Nyasha, Tendai, Zodwa. No item was moved in any operation.
:::

:::worked-solution{title="Finding an item by following the pointers"}
To find Tendai in the list above, the algorithm starts at `StartPointer` = 4 and compares `Data[4]` (Anesu), then follows `Next[4]` = 2 to Farai, `Next[2]` = 3 to Nyasha and `Next[3]` = 1 to Tendai. It makes **4 comparisons** and returns 1, the index of the node. A search for an item that is not there, such as Peter, follows all five nodes until the pointer is 0 and returns 0.
:::

## A linked list with objects in Python

Python does not need arrays and a free list: each node is an object that holds its data and a reference to the next node (`None` plays the part of the null pointer), and the interpreter manages the memory. This is a **dynamic** implementation. The program below was run for real:

```python
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.start = None

    def insert(self, item):
        new_node = Node(item)
        previous = None
        current = self.start
        while current is not None and current.data < item:
            previous = current
            current = current.next
        new_node.next = current
        if previous is None:
            self.start = new_node
        else:
            previous.next = new_node

    def delete(self, item):
        previous = None
        current = self.start
        while current is not None and current.data != item:
            previous = current
            current = current.next
        if current is None:
            return False
        if previous is None:
            self.start = current.next
        else:
            previous.next = current.next
        return True

    def to_list(self):
        items = []
        current = self.start
        while current is not None:
            items.append(current.data)
            current = current.next
        return items

names = LinkedList()
for name in ("Tendai", "Farai", "Rudo", "Anesu", "Zodwa"):
    names.insert(name)
print(names.to_list())
print(names.delete("Rudo"))
names.insert("Nyasha")
print(names.to_list())
print(names.delete("Peter"))
```

```
['Anesu', 'Farai', 'Rudo', 'Tendai', 'Zodwa']
True
['Anesu', 'Farai', 'Nyasha', 'Tendai', 'Zodwa']
False
```

The first line shows the five names in alphabetical order. Deleting Rudo returned `True`, Nyasha was inserted in its place in the order, and deleting Peter returned `False` because he was not in the list.

## Linked list or array?

| Feature | Array | Linked list |
|:-:|:-:|:-:|
| Size | fixed when declared | can grow and shrink (in a dynamic version) |
| Insert or delete in the middle | items after the position must be shifted | only pointers change |
| Access to the n-th item | directly, using the index | by following n pointers |
| Binary search | possible if the array is sorted | not possible: items cannot be reached directly |
| Memory per item | the item only | the item and a pointer |

A linked list is better when items are often inserted or deleted in the middle; an array is better when items are read by position or searched with a binary search.

:::keyfact{title="ZIMSEC and Cambridge"}
Linked list algorithms in pseudocode and Python are Cambridge A Level content (topic 19.1, Paper 3 and Paper 4). ZIMSEC covers the linked list as a dynamic structure at Form 5 but does not examine these algorithms. The pointer names above are our own; in an exam the names are given.
:::

## Common mistakes

:::mistake{title="Following the array order instead of the pointers"}
The items in the array are not in list order. Always start at the start pointer and follow `Next`.
:::

:::mistake{title="Changing the pointers in the wrong order"}
When inserting, set the new node's pointer before changing the previous node's pointer. Doing it the other way loses the rest of the list. When deleting, read `Next[Current]` before overwriting it.
:::

:::mistake{title="Forgetting the special case of the front"}
If there is no previous node, the start pointer must change, not a `Next` entry. Updating `Next[0]` is an error.
:::

:::mistake{title="Not returning the deleted node to the free list"}
If the node is not added to the free list its space is lost and the list will seem full before all the nodes are used.
:::

## Exam tips

:::exam-tip
Cambridge Paper 3 gives the `Data` and `Next` arrays, `Start` and `Free`, and asks you to **complete** the table after an insertion or deletion, to **write** or **complete** the algorithm, or to **state** the order of the list. Show every changed pointer, and follow the pointers, not the array order.
:::

:::exam-tip
"**Compare** a linked list with an array" needs a point about insertion (pointers change, no shifting) and one about access (arrays can be reached directly; linked lists must be followed from the start).
:::

## Summary

:::summary
- A linked list in arrays uses `Data` and `Next` arrays, a start pointer for the first node and a free list pointer for the unused nodes; 0 is the null pointer.
- Find follows the pointers from the start until the item is found or the pointer is 0.
- Insert takes the first free node, finds the position and sets two pointers; the front, middle and end cases use the same code.
- Delete makes the previous node skip the item and returns the node to the front of the free list.
- Linked lists make insertion and deletion easy but give no direct access, so a binary search cannot be used.
:::
