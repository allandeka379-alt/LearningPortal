---
{
  "key": "sdlc.software-architecture",
  "title": "Software architecture design",
  "summary": "Designing the architecture of a system from its user requirements: layered (presentation, logic, data), client-server and three-tier styles, components and their interfaces, choosing an architecture for a scenario and documenting it as a diagram described in words and a table.",
  "concepts": ["acs.sdlc.software-architecture"],
  "estimatedMinutes": 50,
  "level": "core"
}
---
## Introduction

A group of schools in Matabeleland wants a web portal where parents can see their children's results. On the first day of the term, thousands of parents will log in within the same hour. Where will the marks be stored? Who checks that a parent can see only their own child? What happens when one computer cannot cope? These questions are not about individual lines of code. They are about how the whole system is put together, which is its **software architecture**.

This lesson shows how an architect turns user requirements into a plan of **components** and **layers**, how the common styles (**layered**, **client-server** and **three-tier**) work, how to choose between them for a scenario and how to document the choice.

You should know how a network connects clients and servers, what a database is and the stages of the development cycle.

## Key definitions

:::definition{term="Software architecture"}
The overall structure of a system: its main components, what each is responsible for, how they are arranged in layers or tiers and how they communicate.
:::

:::definition{term="Component"}
A part of a system that does one job and hides how it does it, such as a results service or a database.
:::

:::definition{term="Interface"}
The set of operations that a component offers to the others, including what it needs to be given and what it returns. Other components use the interface and need not know how the component works inside.
:::

:::definition{term="Tier"}
A layer of a system that is deployed on its own computer or group of computers.
:::

## Layered architecture

In a **layered** design the system is divided into layers, and each layer uses only the layer immediately beneath it. The three layers most often used are:

{{layers}}

Each layer has one responsibility. Because the presentation layer never touches the database directly, the storage can change from one database to another without changing the web pages. This is called **separation of concerns**.

The small program below has the same three layers: a data layer that stores the marks, a logic layer that calculates the average, and a presentation layer that prints the result. The function `get_marks` is the data layer, `average_mark` is the logic layer and `show_result` is the presentation layer. Each function calls only the one below it.

{{code}}

{{out}}

## Client-server and three-tier

In a **client-server** architecture the **client** asks for a service and the **server** provides it. A browser is a client; a web server is a server.

- **Two-tier**: the client program holds the presentation and the logic, and connects directly to a database server. It is simple and suits a small office network, but every client needs the program installed, a change to the logic must be installed on every client, and every client has direct access to the database.
- **Three-tier**: the presentation tier (client), the application tier (a server running the logic) and the data tier (database server) are separate. The client talks only to the application server, which talks to the database.

The steps of one request in a three-tier results portal are as follows.

{{steps}}

**Benefits of three tiers:** the logic is kept in one place and changed without touching the clients; the database is not exposed to the clients, which is more secure; each tier can be scaled separately (more application servers for more users); and each tier can be developed by a different team. **Drawbacks:** more computers to buy and manage; each request travels between tiers, which adds delay; and it is more complex to design.

:::worked-solution{title="How many application servers are needed?"}
At the busiest time the portal receives {{peak}} requests per second. Each request takes 0.05 seconds of an application server's processing time.
1. One server can process 1 ÷ 0.05 = {{perServer}} requests per second.
2. The number of servers needed = {{peak}} ÷ {{perServer}} = 4.5, which is rounded **up** to {{servers}} servers.
3. Capacity = {{servers}} × {{perServer}} = 100 requests per second, so there is room for {{spare}} more requests per second.
4. Because the application tier is separate, only this tier needs more computers; the database and the web pages do not change.
:::

## Components and interfaces

The architect lists the components of the system, gives each a single responsibility and defines its **interface**. The results portal can be documented as a table.

{{comps}}

A well-defined interface lets a component be replaced without changing the others: if the school changes the database, only the "Marks database" component and the way the Results service sends its queries change. It also lets components be built and tested separately by different people.

## From requirements to an architecture

1. **List the requirements** that affect the structure: number of users, security, availability, where the users are, how often the system will change.
2. **Identify the components** and group them by responsibility: what is presented, what is calculated, what is stored.
3. **Choose the style**: a single computer, two-tier, three-tier.
4. **Define the interfaces** between components.
5. **Document** the architecture as a diagram (boxes for components, arrows for the calls) and a table of components. Check it against the requirements.

| Requirement | Effect on the architecture |
|---|---|
| Thousands of users at the same time | Separate application tier that can use several servers |
| Personal data must be protected | Database not reachable from the clients; access control in the application tier |
| Users in different towns | Client-server over the internet, with the browser as the client |
| Logic will change often | Logic in one tier, so a change is made in one place |
| Only a few users in one office | Two-tier or a single computer is enough |

:::example{title="A clinic with one office"}
A clinic with three computers in one building needs only a few users to access patient records. A two-tier design, with the program on each computer and the database on a small server, meets the need at a low cost. A three-tier design would add hardware and complexity without benefit.
:::

:::keyfact{title="ZIMSEC only"}
This lesson is ZIMSEC only (Form 6). It expects the choice and justification of an architecture for a scenario, the three tiers, client-server, and documentation as a diagram described in words with a table of components. Cambridge covers the client-server model within networking.
:::

## Common mistakes

:::mistake{title="Letting the presentation layer use the database directly"}
This breaks the layering. The presentation layer calls the logic layer, which calls the data layer.
:::

:::mistake{title="Confusing tiers with layers"}
A **layer** is a logical division of the design. A **tier** is a layer placed on its own computer. Several layers can run on one machine.
:::

:::mistake{title="Rounding the number of servers down"}
4.5 servers means 5: you cannot buy half a server, and 4 would not cope with the peak.
:::

:::mistake{title="Choosing the biggest architecture for every project"}
Choose the simplest architecture that meets the requirements. Three tiers for a three-computer office is wasteful.
:::

## Exam tips

:::exam-tip
In ZIMSEC Paper 1 and Paper 2 you may be asked to "**design** an architecture for the following requirements". Name the style, list the components in a table with their tier and responsibility, describe the arrows ("the browser sends a request to the application server") and justify each choice with a requirement from the scenario.
:::

:::exam-tip
For a comparison of two-tier and three-tier, give a benefit **and** a cost of each: for example "three-tier lets the logic change in one place, but needs more servers".
:::

## Summary

:::summary
- Software architecture is the structure of the system: components, layers or tiers, and how they communicate.
- Layered designs separate presentation, logic and data; each layer uses only the one below.
- Client-server: a client requests, a server provides; three-tier separates client, application server and database server.
- Components offer interfaces; other components use the interface and not the inside.
- Choose the style from the requirements (users, security, location, change); document it as a described diagram and a table.
:::
