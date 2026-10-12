// W1a: file organisation, access and hashing. Cambridge A Level only.
import { concept, P, mdTable, hashMod, asciiSum, chk, same } from "../lib.mjs";

function fill(keys, size) {
  const slots = Array(size).fill(null);
  const log = [];
  for (const k of keys) {
    const home = hashMod(k, size);
    let pos = home;
    while (slots[pos] !== null) pos = (pos + 1) % size;
    slots[pos] = k;
    log.push({ k, home, pos });
  }
  return { slots, log };
}
function reads(slots, key) {
  let p = hashMod(key, slots.length);
  let n = 0;
  for (;;) {
    n++;
    if (slots[p] === key) return n;
    if (slots[p] === null) return n;
    p = (p + 1) % slots.length;
  }
}

concept("acs.data.file-organisation", { file: "data/file-organisation", keyPrefix: "data.file-organisation" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which file organisation stores the records in order of their key field?",
    options: [
      ["Sequential", "Correct: a sequential file is ordered on the key field."],
      ["Serial", "A serial file is stored in the order in which the records arrived."],
      ["Random", "A random file places records at addresses calculated from the key."],
      ["Indexed hash", "This is not one of the three organisations in the syllabus."],
    ],
    answer: "A",
    explanation: "Serial: order of arrival. Sequential: ordered on the key field. Random: placed by a calculation on the key.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A shop in Chinhoyi appends each till transaction to a file during the day. The file is read through once, from start to finish, at closing time. Which organisation and access method are most suitable?",
    options: [
      ["Serial file with sequential access", "Correct: records are added at the end as they arrive and every record is read in turn."],
      ["Random file with direct access", "Direct access is for finding single records quickly; here every record is read."],
      ["Sequential file with direct access", "Keeping the file ordered on a key would slow the adding of each transaction."],
      ["Random file with sequential access", "A random file is arranged for direct access, not for being read in order."],
    ],
    answer: "A",
    hints: ["Are records looked up one at a time, or are they all processed?"],
    explanation: "Appending records as they arrive is the simplest with a serial file, and reading every record in turn is what sequential access is for.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A random file can be searched for a single record without reading the records before it.",
    answer: true,
    feedbackTrue: "Correct: the address is calculated from the key, so the record is reached directly.",
    feedbackFalse: "In a random file the address of a record is calculated, so access is direct, not by reading through the file.",
    explanation: "Direct access using the calculated address is the advantage of a random file.",
  });
  {
    const k = 5836, n = 7;
    b.num({
      d: 2, skill: "APPLICATION", daily: true, calculator: false,
      stem: `A random file has ${n} slots numbered 0 to ${n - 1}. The hashing algorithm is key MOD ${n}. In which slot is the record with key **${k}** stored (if there is no collision)?`,
      value: k % n,
      workedSolution: `1. Divide ${k} by ${n}: ${Math.floor(k / n)} × ${n} = ${Math.floor(k / n) * n}.\n2. The remainder is ${k} − ${Math.floor(k / n) * n} = ${k % n}.`,
      explanation: `${k} MOD ${n} = ${k % n}.`,
    });
  }
  {
    const name = "RUDO", size = 10;
    const codes = [...name].map((c) => c.charCodeAt(0));
    const sum = asciiSum(name);
    b.calc({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `A hashing algorithm adds the ASCII codes of the characters of a text key and finds the remainder after dividing by ${size}. The codes for the key **${name}** are ${codes.join(", ")}. Calculate the slot number for ${name}.`,
      value: sum % size,
      hints: ["Add the four codes first.", "The slot number is the remainder when the total is divided by 10, i.e. the last digit."],
      explanation: `${codes.join(" + ")} = ${sum}. ${sum} MOD ${size} = ${sum % size}.`,
    });
  }
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which file application is best suited to a random file organisation?",
    options: [
      ["An airline booking system that must fetch one booking at once", "Correct: single records are needed quickly, which is what direct access gives."],
      ["Monthly payroll that processes every employee in order", "Every record is processed in turn, so a sequential file is more suitable."],
      ["A backup copy of every customer record", "A backup copies every record in sequence, so a serial file is enough."],
      ["A log that records events as they happen", "A log is appended to in order, so a serial file suits it."],
    ],
    answer: "A",
    hints: ["Which application needs to find one record at a time?"],
    explanation: "Random files give direct access, so they suit systems that look up individual records at once. Applications that process every record suit serial or sequential files.",
  });
  {
    const keys = [3125, 4871, 2093, 5917, 6244], size = 8;
    const { slots, log } = fill(keys, size);
    chk(slots[0], 5917);
    b.fib({
      d: 4, skill: "APPLICATION", calculator: false,
      stem: `A random file has ${size} slots (0 to ${size - 1}). The hash is key MOD ${size}. A collision is resolved by using the next free slot, going back to slot 0 after slot ${size - 1}. The keys are stored in this order: ${keys.join(", ")}. Give the key held in each slot below (write the key, or "empty").`,
      template: slots.map((_, i) => `Slot ${i}: {{blank:s${i}}}`).join("\n\n"),
      blanks: slots.map((s, i) => ({ id: `s${i}`, accepted: [s === null ? "empty" : String(s)] })),
      hints: ["Work through the keys in the order given.", "Remember that the search for a free slot wraps from the last slot to slot 0."],
      explanation: log.map((r) => `${r.k} MOD ${size} = ${r.home}${r.home !== r.pos ? `, taken, so slot ${r.pos}` : ""}`).join("; ") + ".",
    });
    const keys2 = [6215, 8329, 1457, 9035, 3719], size2 = 6;
    const f2 = fill(keys2, size2);
    const k = keys2.slice().sort((x, y) => reads(f2.slots, y) - reads(f2.slots, x))[0];
    chk(reads(f2.slots, k) >= 3 ? 1 : 0, 1);
    b.num({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `Records with keys ${keys2.join(", ")} are stored, in that order, in a random file of ${size2} slots (0 to ${size2 - 1}) using key MOD ${size2} and the next free slot (wrapping round). How many slots must be read to find the record with key **${k}**, including the last slot read?`,
      value: reads(f2.slots, k),
      hints: ["Fill the slots in the order given, then follow the search steps for the key."],
      workedSolution: `1. Slots after storing all the records: ${f2.slots.map((v, i) => `${i}: ${v ?? "empty"}`).join("; ")}.
2. ${k} MOD ${size2} = ${hashMod(k, size2)}, so the search starts at slot ${hashMod(k, size2)}.
3. It steps on until the key is found: ${reads(f2.slots, k)} reads.`,
      explanation: `The home slot is ${hashMod(k, size2)}, but collisions moved the record on, so ${reads(f2.slots, k)} reads are needed.`,
    });
  }
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A sequential file is kept in order of student number. Which statement about adding a new student record is correct?",
    options: [
      ["It must go in the correct position, so the file is usually rewritten", "Correct: to keep the order the file is usually rewritten with the record in place."],
      ["It can always be written straight on to the end of the file", "That would break the ordering on the key field."],
      ["It is placed at a slot calculated from its key by hashing", "Calculating the slot is how a random file works."],
      ["It needs no key field because the whole file is ordered", "The ordering is on the key field, so every record needs one."],
    ],
    answer: "A",
    hints: ["What property must a sequential file keep?"],
    explanation: "A sequential file must stay ordered on the key. Adding a record therefore means inserting it at the right place, which usually means rewriting or merging the file.",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each term to its description.",
    pairs: [
      ["Serial file", "Records stored in the order in which they were added"],
      ["Sequential file", "Records stored in order of the key field"],
      ["Random file", "Each record placed at an address calculated from its key"],
      ["Collision", "Two keys that give the same hash value"],
    ],
    explanation: "These are the basic terms of file organisation.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a collision in a hashed (random) file?",
    options: [
      ["Two different keys produce the same hash value", "Correct: both records are directed to the same address."],
      ["A record is deleted by mistake", "That is data loss, not a collision."],
      ["The file is too large to open", "A collision concerns two keys, not the size of the file."],
      ["Two programs open the file at the same time", "That is a file-sharing conflict, not a collision."],
    ],
    answer: "A",
    explanation: "A hash function maps many possible keys to fewer addresses, so two keys can map to the same address.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name the calculation that turns the key field of a record into the address at which it is stored in a random file.",
    accepted: ["hashing", "hash", "hashing algorithm", "hash function", "hash algorithm"],
    wrong: ["sorting"],
    explanation: "A hashing algorithm, for example the remainder of a division, calculates the address from the key.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "A hashed file uses an overflow area. What is stored there?",
    options: [
      ["Records whose calculated address was already taken", "Correct: colliding records go to the next free place in the overflow area."],
      ["A second copy of every record, for backup", "Backups are separate files and are not the overflow area."],
      ["Records that have been deleted from the file", "Deleted records are not kept in the overflow area."],
      ["The index that lists every key and address", "An index is a separate structure used for sequential files."],
    ],
    answer: "A",
    hints: ["What happens to a record when its calculated slot is full?"],
    explanation: "An overflow area is a separate part of the file that holds records that collided.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 3,
    stem: "A bank in Harare must be able to find a customer's account record immediately when the customer reaches a teller. Justify the choice of a random file with direct access.",
    points: [
      "Direct access goes straight to the account record without reading other records.",
      "The address is calculated from the account number by a hashing algorithm, so it is quick.",
      "A sequential or serial file would have to be read from the start, which is too slow for a large number of accounts.",
    ],
    modelAnswer: "A random file lets the system calculate the address of a customer's record from the account number and read it directly, so the teller gets the record at once. With a sequential or serial file the program would have to read through many records one by one, which would be too slow for a large bank.",
    hints: ["Explain both how the record is found and why other methods are slower."],
    explanation: "Justification needs the link between the scenario (single records needed quickly) and direct access.",
  });
  b.manualShort({
    d: 3, skill: "ANALYSIS", marks: 3,
    stem: "Compare serial and sequential file organisation.",
    points: [
      "Serial files hold records in the order they arrived; sequential files hold them in order of the key field.",
      "Adding a record to a serial file is quick (add at the end); adding to a sequential file needs the order to be kept.",
      "A sequential file is more efficient to search or merge because it is ordered; a serial file has to be read in full.",
    ],
    modelAnswer: "A serial file stores records in the order they were added, so adding is quick but there is no order to help searching. A sequential file is ordered on the key, which makes processing and searching for a key easier but means adding a record needs the order to be maintained.",
    hints: ["Compare the order of records, adding a record and searching."],
    explanation: "The key difference is whether the records are ordered on the key field.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 3,
    stem: "Describe how a new record is added to a random file when its calculated address is already in use (using the next free slot method).",
    points: [
      "Calculate the address by hashing the key.",
      "If the slot is already occupied, move on to the next slot (wrapping round at the end) until an empty slot is found.",
      "Write the record in the empty slot.",
    ],
    modelAnswer: "Hash the key to get the address. If a record is already stored there, check the next slot, and the next, going back to the start of the file if the end is reached, until an empty slot is found. Write the new record in that slot.",
    hints: ["Think about what must be checked when the calculated slot is already full."],
    explanation: "A search for the record later repeats the same steps.",
  });
  b.manualShort({
    d: 2, skill: "UNDERSTANDING", marks: 2,
    stem: "Explain why a random file is usually made larger than the number of records it must hold.",
    points: ["A larger file has more slots, so fewer different keys hash to the same address.", "Fewer collisions means records are found more quickly."],
    modelAnswer: "If the file is nearly full, many keys will collide and records will be moved to other slots. A bigger file has more slots, so there are fewer collisions and searches are faster.",
    explanation: "The more crowded the file, the more collisions occur.",
  });
  {
    const k1 = 4618, k2 = 3952, size = 9;
    chk(k2 % size, k1 % size);
    b.struct({
      d: 3, skill: "APPLICATION", examStyle: true, secs: 480, calculator: false,
      stem: `A clinic in Mutare stores patient records in a random file with ${size} slots (0 to ${size - 1}). The hashing algorithm is the patient number MOD ${size}.`,
      parts: [
        P.num({ label: "(a)", marks: 1, type: "CALCULATION", stem: `Calculate the slot for patient number ${k1}.`, value: k1 % size, explanation: `${k1} MOD ${size} = ${k1 % size}.` }),
        P.num({ label: "(b)", marks: 1, type: "CALCULATION", stem: `Calculate the slot for patient number ${k2}.`, value: k2 % size, explanation: `${k2} MOD ${size} = ${k2 % size}.` }),
        P.mcq({ label: "(c)", marks: 1, stem: "What is the name of the problem shown by your answers to (a) and (b)?", options: [["A collision", "Correct: two keys give the same slot."], ["Underflow", "Underflow is a floating-point error."], ["A parity error", "Parity is used to detect transmission errors."], ["Fragmentation", "Fragmentation is about files on a disk."]], answer: "A", explanation: "Two different patient numbers hashed to the same slot." }),
        P.manual({ label: "(d)", marks: 3, stem: "Describe one method the clinic could use to store both records.", points: ["Store the second record in the next free slot.", "Wrap round to slot 0 if the end of the file is reached.", "When searching, check each following slot until the key matches (or an empty slot is found)."], modelAnswer: "Use the next free slot method: the second record is stored in the next empty slot after the calculated one, wrapping to slot 0 at the end. When searching, check the calculated slot and then each following slot until the key is found or an empty slot shows it is not there." }),
      ],
      hints: ["Divide by 9 and find the remainder.", "Think about what happens when a slot is already full."],
      explanation: `Both ${k1} and ${k2} give slot ${k1 % size}. This is a collision, resolved by the next free slot.`,
    });
  }
  {
    const keys = [7203, 1546, 8890, 3317], size = 6;
    const { slots, log } = fill(keys, size);
    const target = 3317;
    b.struct({
      d: 4, skill: "ANALYSIS", examStyle: true, secs: 600, calculator: false,
      stem: `A school library in Gweru uses a random file of ${size} slots (0 to ${size - 1}), hashing the member number with key MOD ${size} and resolving collisions with the next free slot (wrapping round). Four member records are stored in this order: ${keys.join(", ")}.`,
      parts: [
        P.group({ label: "(a)", stem: "Give the slot in which each record is stored.", parts: keys.map((k, i) => P.num({ label: `(${["i", "ii", "iii", "iv"][i]})`, marks: 1, type: "CALCULATION", stem: `Member ${k}`, value: log[i].pos, explanation: `${k} MOD ${size} = ${log[i].home}${log[i].home !== log[i].pos ? `; that slot is taken, so slot ${log[i].pos}` : ""}.` })) }),
        P.num({ label: "(b)", marks: 2, type: "CALCULATION", stem: `How many slots are read to find member ${target}?`, value: reads(slots, target), explanation: `${target} MOD ${size} = ${hashMod(target, size)}; the record is at slot ${log[3].pos}, after ${reads(slots, target)} reads.` }),
        P.manual({ label: "(c)", marks: 2, stem: "State two ways in which the librarian could reduce the number of collisions.", points: ["Make the file larger (more slots) so there is more space for each key.", "Use a different hashing algorithm that spreads the keys more evenly."], modelAnswer: "Increase the number of slots in the file, or use a better hashing algorithm that spreads the member numbers evenly across the slots." }),
      ],
      hints: ["Fill the slots one record at a time, in order.", "Count the first slot you read as read number 1."],
      explanation: `Slots: ${log.map((r) => `${r.k} → ${r.pos}`).join(", ")}. Member ${target} needs ${reads(slots, target)} reads.`,
    });
  }

  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which method resolves a collision in a hashed file by keeping colliding records in a separate part of the file?",
    options: [
      ["An overflow area", "Correct: colliding records are placed in the next free position of the overflow area."],
      ["Next free slot", "This stores the record in the main file, in the following empty slot."],
      ["Folding", "Folding is a way of calculating the hash, not of resolving collisions."],
      ["Sequential access", "This is a way of reading a file, not of storing records."],
    ],
    answer: "A",
    explanation: "An overflow area holds records whose calculated address was already in use.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is an advantage of a serial file?",
    options: [
      ["New records can be added quickly at the end of the file", "Correct: no ordering has to be maintained."],
      ["Any record can be found directly from its key", "Direct access needs a random file or an index."],
      ["The records are always in order of the key field", "That describes a sequential file."],
      ["Collisions can never happen", "Collisions only apply to hashed (random) files; this is not a particular advantage."],
    ],
    answer: "A",
    explanation: "A serial file stores records in order of arrival, so adding a record is just appending it.",
  });
  {
    const key = 453, size = 20;
    b.mcq({
      d: 3, skill: "APPLICATION", calculator: false,
      stem: `A hashed file has ${size} slots (0 to ${size - 1}). The hash is key MOD ${size}. In which slot is the record with key ${key} stored, if there is no collision?`,
      options: [
        [String(key % size), `Correct: ${key} = ${Math.floor(key / size)} × ${size} + ${key % size}.`],
        [String(Math.floor(key / size)), "This is the quotient, not the remainder."],
        [String((key % size) + 1), "The remainder is not increased by one."],
        [String(key % 10), "This uses 10 slots instead of 20."],
      ],
      answer: "A",
      hints: ["Divide by the number of slots and keep the remainder."],
      explanation: `${key} MOD ${size} = ${key % size}.`,
    });
  }

  b.card("DEFINITION", "Serial file", "Records stored in the order in which they were added; no ordering on a field.");
  b.card("DEFINITION", "Sequential file", "Records stored in order of the key field.");
  b.card("DEFINITION", "Random file", "Each record is stored at an address calculated from its key (hashing), so it can be accessed directly.");
  b.card("CONCEPT", "Sequential access versus direct access", "Sequential access reads records from the start in order. Direct access goes straight to a record's address.");
  b.card("CONCEPT", "Choosing an organisation", "Processing every record in turn: serial or sequential. Quick access to single records: random with direct access.");
  b.card("CONCEPT", "Hashing by modulo division", "Divide the key by the number of slots; the remainder is the slot number. For text keys, add the character codes first (folding).");
  b.card("DEFINITION", "Collision", "Two different keys produce the same hash value and so the same address.");
  b.card("CONCEPT", "Ways to resolve a collision", "Use the next free slot (wrapping round), or put the record in an overflow area.");
  b.card("FACT", "How is a hashed record searched for?", "Calculate the slot; if its key does not match, continue to the next slot (or the overflow area) until the key is found or an empty slot is reached.");
});
