---
{
  "key": "ds.graphs-dictionaries",
  "title": "Graphs, dictionaries and implementing ADTs",
  "summary": "A graph as an abstract data type with vertices, edges, directed and weighted forms, adjacency matrix and adjacency list representations, the key features of a dictionary and its hash-table implementation, and how an ADT can be implemented from built-in types or another ADT.",
  "concepts": ["acs.ds.graphs-dictionaries"],
  "estimatedMinutes": 55,
  "level": "core"
}
---
## Introduction

A map of a bus network and a school's register of names with marks look very different, yet both are collections of data with rules for how they are used. The map is best modelled as a **graph**: places joined by links. The register is a **dictionary**: a name is used to find a mark directly. Programmers usually think about such structures by what they do, before deciding how to store them. A description of a data structure by its behaviour, without saying how it is stored, is an **abstract data type (ADT)**.

This lesson describes a **graph** and two ways of storing it, the **dictionary** and its implementation as a **hash table**, and shows how one ADT can be built from a built-in type or from another ADT. Every table and output here was produced by code. You are not asked to write code for graphs.

You should already know arrays, records, and the stack, queue and linked list ADTs.

## Key definitions

:::definition{term="Abstract data type (ADT)"}
A collection of data together with the operations that can be performed on it, defined without saying how it is stored.
:::

:::definition{term="Graph"}
An ADT made of vertices (nodes) joined by edges. In a directed graph an edge goes from one vertex to another only; in a weighted graph each edge has a value such as a distance or a cost.
:::

:::definition{term="Dictionary"}
An ADT that stores pairs of a key and a value, so that a value can be added, found or removed using its key. Each key appears once.
:::

:::definition{term="Hash table"}
A way of implementing a dictionary: a hashing function turns the key into the index of a position in an array, where the pair is stored.
:::

## Graphs

A graph models roads, networks, friendships, links between web pages and many other systems. Its main features are its **vertices**, its **edges**, whether the edges are **directed** (a one-way street) and whether they are **weighted**. This weighted graph has five vertices:

{{edgesList}}

### Adjacency matrix

An **adjacency matrix** is a two-dimensional array with a row and a column for each vertex. The cell in row X and column Y holds the weight of the edge from X to Y (a dash means there is no edge).

{{matrix}}

The matrix is symmetrical because the graph is undirected. It needs {{cells}} cells for 5 vertices (n × n), however few the edges, but it tells you at once whether an edge exists, in one array access.

### Adjacency list

An **adjacency list** stores, for each vertex, a list of its neighbours with the weights.

{{list}}

This uses {{entries}} entries for these 5 edges (each undirected edge appears twice). For a graph with few edges, and many vertices, a list takes far less memory than a matrix, but finding whether one particular edge exists means searching the list.

:::worked-solution{title="A directed graph"}
Suppose the edges are one-way: A to B (4), B to D (5), C to A (2) and D to E (3).

{{dMatrix}}

{{dList}}

1. The matrix is no longer symmetrical: row C, column A holds 2, but row A, column C holds nothing.
2. In the list, each directed edge appears once, under its starting vertex.
3. E has no outgoing edges, so its list is empty.
:::

## Dictionaries

A dictionary is used when you need to find a value from a key quickly, such as a student's mark from a name, or a price from a product code. Its key operations are **add** a pair, **look up** a value by key, **change** a value, **remove** a pair, and **test** whether a key is present. Keys must be unique.

{{pyCode}}

The output of this program is:

{{pyOut}}

### Implementation as a hash table

A hash table stores the pairs in an array. A **hashing function** works out the index from the key. Here the function adds the ASCII codes of the characters and takes the remainder when divided by 7 (the size of the array).

{{hashRows}}

Tendai and Chipo both give index 2: this is a **collision**. Two common ways of dealing with collisions are:

- **Linear probing:** if the slot is taken, try the next slot (wrapping round) until one is empty. Using the keys in the order Tendai, Rudo, Farai, Chipo, Nyasha gives:

{{probe}}

Chipo is placed in slot 3 (one probe further), and Nyasha, whose index 3 is taken, goes to slot 5 after trying 3 and 4. To look up a key, start at its hash index and follow the same probes until the key is found or an empty slot is reached.

- **Chaining:** each slot holds a list of all the keys that hash to it.

{{chain}}

A good hashing function spreads the keys evenly so that the chains stay short, and then adding and looking up take about the same time however many pairs are stored.

## Implementing one ADT with another

An ADT says what is done, not how, so it can be implemented using a built-in type or another ADT.

- A **stack** can be implemented with an **array** and a top pointer: push adds at the next position and pop removes the item at the pointer.

{{stack}}

- A **queue** can be implemented with a **linked list** that has a head pointer and a tail pointer: enqueue adds at the tail and dequeue removes from the head.

{{queue}}

The program that uses the stack or queue does not change if the implementation is changed from an array to a linked list, because it uses only the operations.

:::keyfact{title="ZIMSEC and Cambridge"}
Graphs, dictionaries and the implementation of ADTs are Cambridge A Level content (topic 19). ZIMSEC covers arrays and binary trees as static and dynamic structures but not graphs or dictionaries. Writing code for a graph is not required.
:::

## Common mistakes

:::mistake{title="Saying the adjacency matrix is smaller than the list"}
A matrix always uses n × n cells. A list uses only as many entries as there are edges, so it is smaller for a graph with few edges.
:::

:::mistake{title="Forgetting that keys must be unique"}
A dictionary cannot hold two different values for the same key. Adding a pair with an existing key changes the value.
:::

:::mistake{title="Thinking a collision is an error"}
A collision is expected. It is handled by probing or chaining, and a lookup follows the same rule used to store the key.
:::

:::mistake{title="Describing an ADT by how it is stored"}
An ADT is described by its operations. How it is stored (array, linked list) is the implementation.
:::

## Exam tips

:::exam-tip
Cambridge **Paper 3** may ask you to **draw or complete** an adjacency matrix or list for a given graph, to **describe** a dictionary, to **work out** hash values and show where keys are stored, and to **explain** how a stack or queue can be implemented. Work in a table and show the hash calculation.
:::

:::exam-tip
"**Compare** an adjacency matrix with an adjacency list": matrix gives instant edge look-up but uses n × n memory; list uses less memory for few edges but needs searching.
:::

## Summary

:::summary
- A graph is an ADT of vertices and edges; edges may be directed and weighted.
- An adjacency matrix is an n × n array of weights; an adjacency list stores each vertex's neighbours.
- A dictionary stores unique key-value pairs and is searched by key.
- A hash table implements a dictionary by turning the key into an array index; collisions are handled by probing or chaining.
- An ADT can be implemented using a built-in type or another ADT, such as a stack in an array or a queue in a linked list.
:::
