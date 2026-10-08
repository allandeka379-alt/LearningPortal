// Slice EG2: conjunctions and discourse markers.
import { concept } from "../lib.mjs";

concept("eng.grammar.conjunctions", { file: "grammar/conjunctions", keyPrefix: "grammar.conjunctions" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word in this sentence is a **conjunction**?\n\n*Tendai wanted to play outside, but it was raining.*",
    options: [
      ["but", "Correct: but joins the two clauses and shows a contrast."],
      ["wanted", "Wanted is a verb."],
      ["outside", "Outside is an adverb of place."],
      ["raining", "Raining is part of the verb was raining."],
    ],
    answer: "A",
    explanation: "A **conjunction** joins words, phrases or clauses: *and, but, or, so, because, although, when, if, unless*.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is a **co-ordinating** conjunction?",
    options: [
      ["or", "Correct: or is one of the seven co-ordinating conjunctions (for, and, nor, but, or, yet, so)."],
      ["although", "Although begins a subordinate clause: it is subordinating."],
      ["because", "Because begins a subordinate clause of reason: it is subordinating."],
      ["unless", "Unless begins a subordinate clause of condition: it is subordinating."],
    ],
    answer: "A",
    explanation: "The co-ordinating conjunctions join clauses of **equal** weight. Remember **FANBOYS**: *for, and, nor, but, or, yet, so*. Subordinating conjunctions (*because, although, if, unless, when, while, since*) join a less important clause to a main clause.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the best conjunction.\n\n*I was very tired, ___ I finished my homework before going to bed.*",
    options: [
      ["but", "Correct: finishing the homework is a contrast with being tired."],
      ["so", "So shows a result; being tired is not a reason to finish homework."],
      ["because", "Because would make tiredness the reason for finishing the homework."],
      ["or", "Or offers a choice between two possibilities."],
    ],
    answer: "A",
    explanation: "Choose the conjunction by the **relationship** between the ideas: *and* (addition), *but/yet* (contrast), *so* (result), *because* (reason), *or* (choice).",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct word.\n\n*___ Rudo nor her sister came to the wedding.*",
    options: [
      ["Neither", "Correct: nor pairs with neither."],
      ["Either", "Either pairs with or, not nor."],
      ["Both", "Both pairs with and."],
      ["Not only", "Not only pairs with but also."],
    ],
    answer: "A",
    explanation: "**Correlative conjunctions** work in pairs: *either ... or*, *neither ... nor*, *both ... and*, *not only ... but also*, *whether ... or*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct words.\n\n*Our headmistress is not only strict ___ very fair.*",
    options: [
      ["but also", "Correct: not only is paired with but also."],
      ["and also", "Not only must be completed by but also, not and also."],
      ["as well as", "As well as cannot complete a not only ... structure."],
      ["but too", "But too is not a standard pair; use but also."],
    ],
    answer: "A",
    explanation: "*not only ... **but also***: *She is not only strict but also very fair.* Both parts should be followed by the same kind of word (here two adjectives).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence is correctly joined and punctuated?",
    options: [
      ["The bus broke down; however, we arrived on time.", "Correct: however is a linking adverb, so it follows a semicolon (or a full stop) and is followed by a comma."],
      ["The bus broke down, however we arrived on time.", "A comma alone cannot join two main clauses with however."],
      ["The bus broke down however, we arrived on time.", "There must be a semicolon or full stop before however."],
      ["The bus broke down, however, we arrived on time.", "Commas on both sides still leave two sentences joined only by commas."],
    ],
    answer: "A",
    hints: ["Is *however* a conjunction like *but*, or a linking adverb?"],
    explanation: "*However, therefore, moreover* and *nevertheless* are **linking adverbs**, not conjunctions. They cannot join two clauses with a comma: use a semicolon before them (or start a new sentence) and a comma after them.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence is correct?",
    options: [
      ["Although he trained every day, he did not win the race.", "Correct: although introduces the contrast on its own."],
      ["Although he trained every day, but he did not win the race.", "Although and but both show contrast; use only one."],
      ["Despite he trained every day, he did not win the race.", "Despite is a preposition and needs a noun or -ing form (despite training)."],
      ["In spite he trained every day, he did not win the race.", "The phrase is in spite of, and it needs a noun or -ing form."],
    ],
    answer: "A",
    hints: ["Count the words that show contrast in each sentence."],
    explanation: "Use **one** contrast word: *Although he trained, he did not win* or *He trained, but he did not win*. *Despite/In spite of* need a noun or -ing form: *Despite training every day, ...*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does **moreover** signal to the reader?",
    options: [
      ["An extra point is being added.", "Correct: moreover adds a further, often stronger, point."],
      ["A contrast is coming next.", "Contrast markers are however, nevertheless, on the other hand."],
      ["A result is being stated.", "Result markers are therefore, consequently, as a result."],
      ["An example will follow it.", "Example markers are for example, for instance, such as."],
    ],
    answer: "A",
    explanation: "**Discourse markers** signpost the writer's argument: addition (*moreover, furthermore, in addition*), contrast (*however, nevertheless*), result (*therefore, consequently*), example (*for instance*), conclusion (*in conclusion, to sum up*).",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each discourse marker with its function.",
    pairs: [["however", "contrast"], ["therefore", "result"], ["furthermore", "addition"], ["for instance", "example"], ["in conclusion", "summing up"]],
    explanation: "Writers of argumentative and discursive compositions use these markers to show how each point relates to the last.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct conjunction for each gap.",
    template: "Take an umbrella {{blank:a}} it rains this afternoon. {{blank:b}} you revise regularly, you will struggle in the examination.",
    blanks: [
      { id: "a", accepted: ["in case"], choices: ["in case", "unless", "although", "so that"] },
      { id: "b", accepted: ["Unless"], choices: ["Unless", "If", "Although", "Because"] },
    ],
    explanation: "**in case** = as a precaution against something that might happen. **Unless** = if ... not: *Unless you revise* = *If you do not revise*.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Because* is a subordinating conjunction: the clause it begins cannot stand alone as a sentence.",
    answer: true,
    explanation: "True. *Because it was raining* is incomplete on its own; it must be joined to a main clause: *We stayed indoors because it was raining.*",
  });
  b.short({
    d: 2,
    stem: "Write **one** conjunction that means *if ... not*.\n\n*___ you water the seedlings, they will die.*",
    accepted: ["unless"],
    wrong: ["if", "although"],
    explanation: "**Unless** = *if ... not*: *Unless you water the seedlings* = *If you do not water the seedlings*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the best conjunction.\n\n*We sheltered under the bus shelter ___ the storm had passed.*",
    options: [
      ["until", "Correct: until shows that the sheltering continued up to the moment the storm passed."],
      ["unless", "Unless means if not, which makes no sense here."],
      ["although", "Although shows a contrast; there is none here."],
      ["or", "Or offers a choice between two things."],
    ],
    answer: "A",
    explanation: "Conjunctions of **time**: *when, while, as, before, after, until, as soon as, since*.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "In which sentence does **since** mean *because*?",
    options: [
      ["Since you are here, you can help me carry these bags.", "Correct: since gives the reason why you can help."],
      ["I have lived in Gweru since 2015.", "Here since gives a starting point in time."],
      ["She has been much happier since she moved schools.", "Here since means from the time when."],
      ["Nobody has seen the dog since the storm ended.", "Here since means from the time when."],
    ],
    answer: "A",
    hints: ["Try replacing *since* with *because* in each sentence."],
    explanation: "*Since* can show **time** (*since 2015*, *since she moved*) or **reason** (*Since you are here* = *Because you are here*). Test by substituting *because*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the discourse marker that best fills the gap.\n\n*Solar lamps are cheap to run because sunlight is free. ___, they do not give off harmful smoke as paraffin lamps do.*",
    options: [
      ["Furthermore", "Correct: the second sentence adds another advantage."],
      ["However", "However introduces a contrast, but both sentences praise solar lamps."],
      ["Therefore", "Therefore introduces a result; the lack of smoke does not result from free sunlight."],
      ["Otherwise", "Otherwise means if not, which does not fit."],
    ],
    answer: "A",
    hints: ["Is the second sentence adding, contrasting or concluding?"],
    explanation: "Both sentences give advantages, so the link is **addition**: *Furthermore / Moreover / In addition*.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Join the two sentences into one, beginning with the word given. Do not change the meaning.\n\n*You must hurry. If you do not, you will miss the last bus to Chitungwiza.*\n\nBegin: **Unless ...**",
    accepted: ["Unless you hurry, you will miss the last bus to Chitungwiza."],
    patterns: ["^unless you hurry (up )?you will miss the last bus to chitungwiza$"],
    wrong: ["Unless you do not hurry, you will miss the last bus to Chitungwiza.", "Unless you hurry, you will not miss the last bus to Chitungwiza."],
    hints: ["*Unless* already contains the meaning *not*."],
    explanation: "***Unless you hurry**, you will miss the last bus.* Do not add *not* after *unless*: *Unless you do not hurry* means the opposite.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Join the two sentences into one, beginning with the word given. Do not change the meaning.\n\n*The pupils were exhausted. They continued to dig the school garden.*\n\nBegin: **Although ...**",
    accepted: [
      "Although the pupils were exhausted, they continued to dig the school garden.",
      "Although they were exhausted, the pupils continued to dig the school garden.",
    ],
    patterns: [
      "^although the pupils were exhausted they (still )?continued to dig the school garden$",
      "^although they were exhausted the pupils (still )?continued to dig the school garden$",
    ],
    wrong: ["Although the pupils were exhausted, but they continued to dig the school garden.", "Although the pupils were exhausted, so they continued to dig the school garden."],
    hints: ["*Although* shows the contrast by itself; do not add another joining word."],
    explanation: "***Although the pupils were exhausted, they continued** to dig the school garden.* *Although* already shows contrast, so *but* or *yet* must not be added to the main clause.",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "Join the two sentences into one, beginning with the words given. Do not change the meaning.\n\n*Chipo sings in the school choir. She also plays netball for the province.*\n\nBegin: **Chipo not only ...**",
    accepted: ["Chipo not only sings in the school choir but also plays netball for the province."],
    patterns: ["^chipo not only sings in the school choir but (she )?also plays netball for the province$"],
    wrong: ["Chipo not only sings in the school choir and also plays netball for the province.", "Chipo not only sings in the school choir but plays netball for the province."],
    hints: ["*Not only* has a fixed partner.", "Keep the same structure on both sides: *sings ... plays ...*."],
    explanation: "*Chipo **not only** sings in the school choir **but also** plays netball for the province.* The pair is *not only ... but also*, and each part is followed by a verb (*sings*, *plays*).",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", examStyle: true, marks: 2,
    stem: "Join the two sentences using **therefore**, punctuating your answer correctly.\n\n*The bridge over the river was washed away. The pupils could not reach school for a week.*",
    points: [
      "Uses *therefore* to introduce the result (the pupils could not reach school), not the cause.",
      "Punctuates correctly: a semicolon before *therefore* and a comma after it, or a full stop and *Therefore,* at the start of a new sentence (a comma alone before *therefore* is wrong).",
    ],
    modelAnswer: "The bridge over the river was washed away; therefore, the pupils could not reach school for a week.",
    hints: ["Which event is the result?", "*Therefore* is a linking adverb, not a conjunction like *so*."],
    explanation: "*The bridge was washed away; **therefore,** the pupils could not reach school.* A linking adverb needs a semicolon (or full stop) before it. Compare the conjunction *so*: *The bridge was washed away, so the pupils could not reach school.*",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 2,
    stem: "Write **one** sentence that uses **whereas** to contrast life in a city with life in a rural area.",
    points: [
      "Uses *whereas* to join two clauses, each with its own subject and verb.",
      "The two clauses make a genuine contrast between city life and rural life.",
    ],
    modelAnswer: "In Harare most families buy their maize meal from supermarkets, whereas in rural Gutu many families grow and grind their own.",
    hints: ["*Whereas* joins two balanced statements that differ."],
    explanation: "**Whereas** (like *while*) introduces a direct contrast between two facts: *City people buy their food, whereas rural families often grow theirs.*",
  });

  b.card("DEFINITION", "What is a **conjunction**?", "A word that joins words, phrases or clauses and shows how the ideas relate.", "and, but, so, because, although, unless, when.");
  b.card("FACT", "Co-ordinating conjunctions (FANBOYS)", "for, and, nor, but, or, yet, so: they join clauses of equal importance.", "I was tired, but I finished.");
  b.card("FACT", "Subordinating conjunctions", "because, although, if, unless, when, while, until, since, as soon as, so that: they begin a clause that cannot stand alone.", undefined);
  b.card("FACT", "Correlative conjunctions", "either ... or, neither ... nor, both ... and, not only ... but also, whether ... or.", "Neither Rudo nor her sister came.");
  b.card("CONCEPT", "Linking adverbs are not conjunctions", "however, therefore, moreover, nevertheless need a semicolon or full stop before them and usually a comma after them.", "The bus was late; however, we arrived on time.");
  b.card("CONCEPT", "One contrast word only", "Although ... (no but); Despite / In spite of + noun or -ing form.", "Although he trained, he lost. Despite training, he lost.");
  b.card("VOCABULARY", "Discourse markers by function", "Addition: moreover, furthermore, in addition. Contrast: however, nevertheless, on the other hand. Result: therefore, consequently. Example: for instance. Conclusion: in conclusion, to sum up.", undefined);
  b.card("FACT", "Unless", "unless = if ... not. Never add not after it.", "Unless you hurry, you will miss the bus.");
  b.card("FACT", "In case", "in case = as a precaution against something that may happen.", "Take an umbrella in case it rains.");
});
