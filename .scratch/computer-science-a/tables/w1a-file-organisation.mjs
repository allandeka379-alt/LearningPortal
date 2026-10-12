import { mdTable, hashMod, asciiSum, chk, same } from "../lib.mjs";
import { writeLesson } from "./w1a-lib.mjs";

// Hash table with 11 slots, next free slot (wrapping) for collisions
const size = 11;
const keys = [1472, 2308, 1029, 3514, 2117, 4281];
const slots = Array(size).fill(null);
const log = [];
for (const k of keys) {
  const home = hashMod(k, size);
  let pos = home;
  let tries = 0;
  while (slots[pos] !== null) {
    pos = (pos + 1) % size;
    tries++;
  }
  slots[pos] = k;
  log.push({ k, home, pos, collided: tries > 0 });
}
const insertTable = mdTable(["Key", "Key MOD 11", "Slot used", "Collision?"], log.map((r) => [r.k, r.home, r.pos, r.collided ? "yes" : "no"]));
const slotTable = mdTable(["Slot", ...slots.map((_, i) => i)], [["Key", ...slots.map((s) => (s === null ? "empty" : s))]]);
chk(log.filter((r) => r.collided).length, 2);
// search for 2117
const target = 2117;
const probes = [];
let p = hashMod(target, size);
for (;;) {
  probes.push([p, slots[p]]);
  if (slots[p] === target) break;
  p = (p + 1) % size;
}
same(probes.length, 3, "probes");
// text key folding
const name = "TENDAI";
const sum = asciiSum(name);
const h13 = hashMod(name, 13);
const codes = [...name].map((c) => c.charCodeAt(0));

const body = `
## Introduction

The registrar's office at a university in Bulawayo keeps a file of student records. One program prints every student's results at the end of term; another must find a single student at once when she appears at the counter. These two jobs need the file to be organised differently. How records are arranged in a file (**file organisation**) decides how quickly they can be found and how easily new ones are added. This lesson covers serial, sequential and random organisation, the access methods that go with them, and the hashing calculation that places a record in a random file.

You should already know that a file is made of records and a record of fields, and that one field is the **key field** that identifies the record uniquely (a student number, for example).

## Key definitions

:::definition{term="Serial file organisation"}
Records are stored one after another in the order in which they were added, with no ordering on any field.
:::

:::definition{term="Sequential file organisation"}
Records are stored in order of the key field (for example ascending student number).
:::

:::definition{term="Random file organisation"}
Records are stored at addresses calculated from the key field, usually by a hashing algorithm, so a record can be found directly without reading the others.
:::

:::definition{term="Hashing algorithm"}
A calculation that turns a record's key into the address (or slot number) where the record is stored. The same key always gives the same address.
:::

:::definition{term="Collision"}
The situation in which two different keys give the same hash value, so they are directed to the same address.
:::

## Choosing the organisation and the access method

${mdTable(["Organisation", "Order of records", "Adding a record", "Access methods", "Suited to"], [["Serial", "Order of arrival", "Added at the end: fast", "Sequential access only", "Transaction logs, temporary files, backups"], ["Sequential", "Ordered on the key", "The file must be rewritten (or merged) to keep order", "Sequential access, or direct access using an index", "Batch processing of all records: payroll, end-of-term reports"], ["Random", "Placed by the hash of the key", "Calculate the address and write: fast", "Direct access", "Large files needing quick access to single records: bank accounts, bookings"]])}

Two access methods are used:

- **Sequential access** reads the records from the start, one after another, until the one wanted is reached. It is slow for finding one record, but efficient when every record has to be processed.
- **Direct access** goes straight to the address of the record. It is quick for a single record but needs the address to be known or calculated.

:::keyfact{title="Matching organisation to access"}
Serial and sequential files use sequential access. Sequential files can also use direct access if an index of keys and addresses is kept. Random files use direct access. For a described problem: if every record is processed in turn, choose serial or sequential; if single records must be found quickly, choose random.
:::

## Hashing to find an address

For a random file, the address is calculated from the key. A common method is **modulo division**: divide the key by the number of slots, and use the remainder as the slot number.

\`\`\`
FUNCTION Hash(Key : INTEGER) RETURNS INTEGER
    RETURN MOD(Key, 11)
ENDFUNCTION
\`\`\`

For a text key, **folding** converts the characters to numbers (their character codes) and combines them, usually by adding, before the modulo division.

:::worked-solution{title="Hash the key ${name} into a file of 13 slots"}
1. The character codes of ${name} are ${codes.join(", ")}.
2. Add them: ${codes.join(" + ")} = ${sum}.
3. Apply the modulo: ${sum} MOD 13 = **${h13}**. The record is stored at slot ${h13}.
:::

## Collisions

Two different keys can give the same slot. The record that arrives second cannot be stored where the first one is. Two ways of dealing with a collision are:

- **Next free slot**: step on from the calculated slot to the next empty slot (wrapping back to slot 0 after the last), and store the record there.
- **Overflow area**: keep a separate area of the file for records that collided. The record goes into the next free place in the overflow area.

When a record is searched for, the same steps are followed: calculate the slot, check the key stored there, and if it is not the key wanted, continue to the next slot (or the overflow area) until the key is found or an empty slot shows that the key is not in the file.

:::worked-solution{title="Store six records in a file of 11 slots (0 to 10) using key MOD 11 and the next free slot"}
1. The keys arrive in this order: ${keys.join(", ")}.
2. Calculate the home slot for each key and resolve collisions by moving to the next free slot:

${insertTable}

3. Final contents of the file:

${slotTable}

4. ${log.filter((r) => r.collided).map((r) => `${r.k} collided at slot ${r.home}, so it went to slot ${r.pos}`).join("; ")}.
:::

:::worked-solution{title="Find the record with key ${target} in the file above"}
1. ${target} MOD ${size} = ${hashMod(target, size)}, so start at slot ${hashMod(target, size)}.
2. ${probes.map(([slot, key]) => `Slot ${slot} holds ${key}${key === target ? ", which matches" : ", which does not match, so move on"}`).join(". ")}.
3. The record is found after **${probes.length} reads**. With no collision it would have taken one read.
:::

The more records there are in relation to the slots, the more collisions occur, so random files are made larger than the number of records they hold.

## Reading and writing a random file

Cambridge pseudocode uses \`SEEK\` to move to an address, then \`GETRECORD\` to read or \`PUTRECORD\` to write a whole record:

\`\`\`
OPENFILE "Students.dat" FOR RANDOM
SEEK "Students.dat", Hash(StudentNumber)
GETRECORD "Students.dat", Student
CLOSEFILE "Students.dat"
\`\`\`

The details of file handling in pseudocode and Python are in the programming topic of this course.

:::keyfact{title="ZIMSEC and Cambridge"}
This is Cambridge A Level only (Paper 3). The ZIMSEC syllabus does not name serial, sequential and random file organisation or hashing, so these items are not tagged to ZIMSEC.
:::

## Common mistakes

:::mistake{title="Calling a serial file sorted"}
Serial means in order of arrival. A sequential file is the one that is ordered on the key.
:::

:::mistake{title="Using sequential access to find one record in a large file"}
Sequential access must read through the file to reach the record. Where single records are needed often, a random file with direct access is better.
:::

:::mistake{title="Forgetting that collisions move records"}
When a record is not in its calculated slot, you must continue to check the following slots (or the overflow area) before deciding that it is missing.
:::

:::mistake{title="Giving a hash that is outside the file"}
The remainder of a division by 11 is always from 0 to 10. If the file has more slots, the divisor should match the file size.
:::

## Exam tips

:::exam-tip{title="Which paper tests this"}
Cambridge Paper 3 asks you to choose and justify an organisation and access method for a scenario, to calculate hash addresses (show the division or the sum and the remainder), and to describe how a collision is resolved. Use the words **key field**, **address** and **direct access** accurately. For **justify**, link the choice to what the scenario does (processing all records, or finding single records quickly).
:::

:::exam-tip{title="Show every probe"}
In a search through collided records, list each slot you check and the key you find there.
:::

:::exam-tip{title="Insert in the order given"}
The result depends on which key arrives first, so process the keys in the order the question lists them.
:::

## Summary

:::summary
- Serial files are in order of arrival; sequential files are ordered on the key; random files place each record by a calculation on its key.
- Sequential access reads in order; direct access goes straight to a record's address.
- Hashing: modulo division of a numeric key, or folding the character codes of a text key then modulo.
- Collisions are resolved by the next free slot or an overflow area; searching follows the same rule.
- Choose sequential or serial for processing every record, and random for quick access to single records.
:::
`;
writeLesson({ key: "data.file-organisation", title: "File organisation, access and hashing", summary: "Compare serial, sequential and random file organisation, choose an access method for a scenario, calculate hash addresses and resolve collisions.", concept: "acs.data.file-organisation", minutes: 45, free: true }, body);
