// Slice EG2: sentences, clauses and phrases.
import { concept } from "../lib.mjs";

concept("eng.grammar.sentence-types", { file: "grammar/sentence-types", keyPrefix: "grammar.sentence-types" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **simple** sentence?",
    options: [
      ["The thirsty cattle drank at the dam.", "Correct: it has only one clause (one subject, cattle, and one verb, drank)."],
      ["The cattle drank, and the boys swam.", "Two main clauses joined by and make a compound sentence."],
      ["When the cattle drank, the boys swam.", "A main clause plus a subordinate clause (when ...) makes a complex sentence."],
      ["The cattle drank because they were thirsty.", "Because they were thirsty is a subordinate clause, so this is complex."],
    ],
    answer: "A",
    explanation: "A **simple sentence** has one main clause: one subject–verb unit. Adjectives and phrases (*thirsty*, *at the dam*) do not add clauses.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A compound sentence contains two or more main clauses joined by a co-ordinating conjunction such as *and*, *but* or *so*.",
    answer: true,
    explanation: "True. *The bus was full, **so** we waited.* Each clause could stand alone as a sentence.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What kind of sentence is this?\n\n*Tariro washed the dishes while her brother swept the yard.*",
    options: [
      ["complex", "Correct: while her brother swept the yard is a subordinate clause attached to a main clause."],
      ["simple", "There are two verbs with their own subjects (Tariro washed, her brother swept), so it is not simple."],
      ["compound", "While is a subordinating conjunction, not a co-ordinating one, so the clauses are not equal."],
      ["a fragment", "It has a complete main clause, so it is a full sentence."],
    ],
    answer: "A",
    explanation: "A **complex sentence** has one main clause and at least one subordinate clause, introduced by a word such as *while, when, because, although, if, who, which, that*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **phrase**, not a clause?",
    options: [
      ["under the old msasa tree", "Correct: it has no subject and no finite verb, so it is a phrase."],
      ["when the sun set", "It has a subject (the sun) and a verb (set): a clause."],
      ["because she was late", "It has a subject (she) and a verb (was): a clause."],
      ["the dog barked loudly", "It has a subject (the dog) and a verb (barked): a clause."],
    ],
    answer: "A",
    explanation: "A **clause** contains a subject and a finite verb. A **phrase** is a group of words without that subject–verb pair: *under the tree, in the morning, running fast*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part is the **main clause**?\n\n*When the bell rang, the pupils ran out of the classroom.*",
    options: [
      ["the pupils ran out of the classroom", "Correct: it makes complete sense on its own."],
      ["When the bell rang", "This clause depends on the rest of the sentence: it is subordinate."],
      ["the bell rang", "These words belong to the subordinate clause that begins with when."],
      ["When the bell rang, the pupils", "This joins the subordinate clause to the subject of the main clause; it has no main verb and is not a clause."],
    ],
    answer: "A",
    explanation: "The **main clause** can stand alone as a sentence. *When the bell rang* cannot: it leaves the reader waiting for more.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What kind of clause is in bold?\n\n*Everyone knows **that Farai will pass the examination**.*",
    options: [
      ["noun clause", "Correct: it is the object of knows (knows what?), so it does the work of a noun."],
      ["adjectival clause", "An adjectival clause describes a noun (the boy who ...); this one is the object of the verb."],
      ["adverbial clause", "An adverbial clause tells when, where, why or how; this one answers what."],
      ["main clause", "It begins with that and cannot stand alone in this sentence."],
    ],
    answer: "A",
    hints: ["Ask: Everyone knows *what*?"],
    explanation: "A **noun clause** does the job of a noun: subject or object. Test: replace it with *it* or *something* (*Everyone knows something*).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What kind of clause is in bold?\n\n*The boy **who won the hundred metres** is my cousin.*",
    options: [
      ["adjectival (relative) clause", "Correct: it describes the noun boy, telling us which boy."],
      ["noun clause (as subject)", "The subject of is is the whole phrase the boy who won ...; the clause itself only describes boy."],
      ["adverbial clause of manner", "It does not tell how something was done; it tells which boy."],
      ["main clause", "It cannot stand alone; it depends on the noun boy."],
    ],
    answer: "A",
    hints: ["Which noun does the clause give more information about?"],
    explanation: "An **adjectival (relative) clause** describes a noun and usually begins with *who, whom, whose, which, that, where* or *when*.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "What kind of clause is in bold?\n\n*We left the stadium **before the rain started**.*",
    options: [
      ["adverbial clause of time", "Correct: it tells us when we left."],
      ["adverbial clause of reason", "A reason clause tells why (because, as, since)."],
      ["adjectival clause", "It describes the verb left, not a noun."],
      ["noun clause", "It is not the subject or object of the verb."],
    ],
    answer: "A",
    hints: ["Which question does the clause answer: what, which one, or when?"],
    explanation: "**Adverbial clauses** modify the verb of the main clause and tell when, where, why, how, on what condition or with what result.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with its type.",
    pairs: [
      ["The kombi stopped suddenly.", "simple sentence"],
      ["The kombi stopped, and everyone got out.", "compound sentence"],
      ["The kombi stopped because a goat ran across the road.", "complex sentence"],
      ["Because a goat ran across the road.", "fragment (not a full sentence)"],
    ],
    explanation: "Simple = one main clause; compound = two main clauses joined by a co-ordinating conjunction; complex = main clause + subordinate clause; a subordinate clause on its own is a fragment.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct relative pronoun for each gap.",
    template: "The woman {{blank:a}} sells tomatoes at the gate is my aunt. The bicycle {{blank:b}} I bought last year already has a flat tyre.",
    blanks: [
      { id: "a", accepted: ["who"], choices: ["who", "which", "whose", "whom"] },
      { id: "b", accepted: ["which"], choices: ["which", "who", "whose", "whom"] },
    ],
    explanation: "**who** for people as the subject of the clause (*who sells*); **which** (or *that*) for things (*the bicycle which I bought*).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which of these is a **sentence fragment**?",
    options: [
      ["Because the road to Binga was flooded.", "Correct: it is a subordinate clause with no main clause."],
      ["The road to Binga was flooded.", "This has a subject and verb and makes complete sense."],
      ["The road to Binga was flooded, so we waited.", "Two main clauses joined by so: a full compound sentence."],
      ["We waited because the road was flooded.", "A main clause with a subordinate clause: a full complex sentence."],
    ],
    answer: "A",
    hints: ["Which one leaves you waiting for the rest of the idea?"],
    explanation: "A **fragment** is a group of words punctuated as a sentence but lacking a main clause. Fix it by joining it to a main clause: *We waited because the road was flooded.*",
  });
  b.short({
    d: 3,
    stem: "How many **clauses** are in this sentence? Write the number.\n\n*The dog barked when the visitors arrived, but nobody came out of the house.*",
    accepted: ["3", "three"],
    wrong: ["2", "4"],
    hints: ["Count the finite verbs, each with its own subject."],
    explanation: "Three clauses: *The dog barked* (main), *when the visitors arrived* (subordinate) and *nobody came out of the house* (main, joined by *but*). Each has its own subject and verb.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which of these is a **compound** sentence?",
    options: [
      ["The bus was full, so we waited for the next one.", "Correct: two main clauses joined by the co-ordinating conjunction so."],
      ["We waited for the next bus at the rank.", "One clause only: a simple sentence."],
      ["Because the bus was full, we waited.", "Because begins a subordinate clause, so this is complex."],
      ["We waited until the next bus arrived.", "Until begins a subordinate clause, so this is complex."],
    ],
    answer: "A",
    explanation: "**Compound** = main clause + co-ordinating conjunction (*for, and, nor, but, or, yet, so*) + main clause.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "A phrase always contains its own subject and finite verb.",
    answer: false,
    explanation: "False. That describes a **clause**. A phrase has no subject–finite verb pair: *in the morning*, *the tall old man*, *having finished*.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which sentence has the **same meaning** as the original?\n\n*As soon as Rudo arrived, the meeting began.*",
    options: [
      ["No sooner had Rudo arrived than the meeting began.", "Correct: the order of events is kept and the structure is correct."],
      ["Rudo arrived as soon as the meeting began.", "This reverses the order: now the meeting began first."],
      ["No sooner had the meeting begun than Rudo arrived.", "This also reverses the order of events."],
      ["No sooner Rudo had arrived than the meeting began.", "After no sooner, the helping verb must come before the subject: had Rudo."],
    ],
    answer: "A",
    hints: ["Which event happened first in the original?", "Check the word order after *No sooner*."],
    explanation: "Transforming a sentence must keep the meaning and the order of events. *No sooner **had Rudo arrived** than ...* uses inversion after *no sooner* and the partner word *than*.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Join the two sentences, beginning with the words given. Do not change the meaning.\n\n*The nurse treated my brother. She works at Parirenyatwa Hospital.*\n\nBegin: **The nurse who ...**",
    accepted: ["The nurse who treated my brother works at Parirenyatwa Hospital.", "The nurse who works at Parirenyatwa Hospital treated my brother."],
    patterns: ["^the nurse who treated my brother works at parirenyatwa hospital$", "^the nurse who works at parirenyatwa hospital treated my brother$"],
    wrong: ["The nurse who treated my brother she works at Parirenyatwa Hospital.", "The nurse who treated my brother who works at Parirenyatwa Hospital."],
    hints: ["*Who* takes the place of *She*, so *she* must not appear again.", "One fact goes into the *who* clause; the other becomes the main verb."],
    explanation: "*The nurse **who treated my brother** works at Parirenyatwa Hospital* (or *The nurse **who works at Parirenyatwa Hospital** treated my brother*). One fact goes into the relative clause and the other stays as the main verb. Do not add *she*, and do not turn both facts into *who* clauses, or the sentence has no main verb.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Join the two sentences, beginning with the words given. Do not change the meaning.\n\n*I spoke to a farmer. His cattle had been stolen during the night.*\n\nBegin: **I spoke to a farmer whose ...**",
    accepted: ["I spoke to a farmer whose cattle had been stolen during the night."],
    patterns: ["^i spoke to a farmer whose cattle had been stolen during the night$"],
    wrong: ["I spoke to a farmer whose his cattle had been stolen during the night.", "I spoke to a farmer whose cattle were stolen."],
    hints: ["*Whose* replaces *His*."],
    explanation: "*whose* replaces the possessive *his*: *a farmer **whose cattle** had been stolen*. Do not keep *his* as well.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Rewrite the two sentences as one, beginning with the words given. Do not change the meaning.\n\n*The hikers were very tired. They could not walk any further.*\n\nBegin: **The hikers were too ...**",
    accepted: ["The hikers were too tired to walk any further."],
    patterns: ["^the hikers were too tired to walk any (further|farther)$"],
    wrong: ["The hikers were too tired that they could not walk any further.", "The hikers were too tired to not walk any further."],
    hints: ["*too* + adjective is followed by *to* + verb.", "The negative meaning is already in *too*."],
    explanation: "*too + adjective + to-infinitive* already carries the negative result: *too tired **to walk** any further* (= so tired that they could not walk). Do not use *that* after *too*, and do not add *not*.",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "Rewrite the two sentences as one, beginning with the words given. Do not change the meaning.\n\n*Farai finished his homework. Then he went out to play football.*\n\nBegin: **Having finished ...**",
    accepted: ["Having finished his homework, Farai went out to play football."],
    patterns: ["^having finished his homework (farai|he) (then )?went out to play football$"],
    wrong: ["Having finished his homework, football was played by Farai.", "Having finished his homework, Farai goes out to play football."],
    hints: ["*Having finished his homework* is a participle phrase: it has no subject of its own.", "The subject of the main clause must be the person who finished the homework."],
    explanation: "***Having finished his homework**, Farai went out to play football.* The participle phrase shows the earlier action; the main clause must begin with the person who did it (Farai) and keep the past tense. Otherwise the phrase 'dangles': *football* did not finish the homework.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 2,
    stem: "Combine the three simple sentences into **one complex sentence**. Keep all the information.\n\n*The rain stopped. We went outside. We played football on the school field.*",
    points: [
      "Keeps all three facts (rain stopped, went outside, played football on the school field) with nothing added or lost.",
      "Uses at least one subordinating conjunction or relative word (for example *when, after, as soon as*) to make one complex sentence that is correctly punctuated.",
    ],
    modelAnswer: "As soon as the rain stopped, we went outside and played football on the school field.",
    hints: ["Which event happened first? Turn it into a time clause."],
    explanation: "Turning the first event into a time clause gives a complex sentence: ***When the rain stopped**, we went outside and played football on the school field.*",
  });

  b.card("DEFINITION", "What is a **clause**?", "A group of words containing a subject and a finite verb.", "the dog barked; when the visitors arrived.");
  b.card("DEFINITION", "What is a **phrase**?", "A group of words without its own subject–finite verb pair, working as one unit.", "under the msasa tree; the tall old man; in the morning.");
  b.card("CONCEPT", "Simple, compound, complex", "Simple: one main clause. Compound: two main clauses + co-ordinating conjunction. Complex: main clause + one or more subordinate clauses.", "The bus was full (simple). The bus was full, so we waited (compound). Because the bus was full, we waited (complex).");
  b.card("DEFINITION", "Main and subordinate clause", "A main clause makes sense alone; a subordinate clause depends on a main clause and begins with a word such as when, because, who or that.", undefined);
  b.card("FACT", "Noun clause", "A clause that acts as a noun (subject or object), often beginning with that, what, whether, how.", "I know that he will pass. What she said surprised us.");
  b.card("FACT", "Adjectival (relative) clause", "A clause that describes a noun, beginning with who, whom, whose, which, that, where or when.", "The boy who won the race is my cousin.");
  b.card("FACT", "Adverbial clause", "A clause that tells when, where, why, how, on what condition, despite what, for what purpose or with what result.", "We left before the rain started.");
  b.card("DEFINITION", "Sentence fragment", "A group of words punctuated as a sentence but lacking a main clause.", "'Because the road was flooded.' Fix: We waited because the road was flooded.");
  b.card("CONCEPT", "Transforming sentences", "Change the structure but keep the meaning, the tense logic and the order of events; follow the given words exactly.", "too tired to walk = so tired that they could not walk.");
});
