// Slice EG1: questions, question tags, commands and exclamations.
import { concept } from "../lib.mjs";

concept("eng.grammar.questions-tags", { file: "grammar/questions-tags", keyPrefix: "grammar.questions-tags" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which question is correct?",
    options: [
      ["Where do you buy your vegetables?", "Correct: question word + do + subject + base verb."],
      ["Where you buy your vegetables?", "The auxiliary do is missing before the subject."],
      ["Where do you buys your vegetables?", "After do, use the base form buy, with no -s."],
      ["Where you do buy your vegetables?", "The auxiliary must come before the subject, not after it."],
    ],
    answer: "A",
    explanation: "A *wh-* question in the present simple: **question word + do/does + subject + base verb**: *Where do you buy ...?*",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct question tag.\n\n*You are in Form 4, ___?*",
    options: [
      ["aren't you", "Correct: positive statement with are, so the tag is negative aren't + you."],
      ["are you", "A positive statement takes a negative tag."],
      ["don't you", "The statement uses are, so the tag must use are, not do."],
      ["isn't it", "The subject is you, so the tag must use you, and the verb are."],
    ],
    answer: "A",
    explanation: "Tags repeat the **same auxiliary** with a **pronoun**. A positive statement takes a negative tag: *You are ..., aren't you?*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct question tag.\n\n*Your brother plays for the district team, ___?*",
    options: [
      ["doesn't he", "Correct: no auxiliary in the statement, so use does (present, singular) in the negative."],
      ["isn't he", "The statement has no be verb; plays needs does in the tag."],
      ["didn't he", "Did is past; plays is present."],
      ["isn't it", "The subject is your brother, so the pronoun must be he."],
    ],
    answer: "A",
    explanation: "When the statement has no auxiliary, the tag uses **do/does/did**: *He plays ..., doesn't he? They played ..., didn't they?*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct question tag.\n\n*Nobody saw the accident, ___?*",
    options: [
      ["did they", "Correct: nobody makes the statement negative, so the tag is positive; nobody is referred to with they."],
      ["didn't they", "Nobody makes the statement negative, so the tag must be positive."],
      ["did he", "Nobody is referred to with they in a tag, not he."],
      ["didn't it", "Nobody refers to people, so it cannot be the pronoun."],
    ],
    answer: "A",
    explanation: "Words such as **nobody, nothing, never, hardly, no one** make a statement negative, so the tag is **positive**: *Nobody saw it, did they?*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the correct exclamation?",
    options: [
      ["What a long queue there is at the bank!", "Correct: What + a + adjective + singular noun."],
      ["How a long queue there is at the bank!", "How is followed by an adjective or adverb alone, not by a + noun."],
      ["What long queue there is at the bank!", "A singular countable noun needs a after What."],
      ["How long queue there is at the bank!", "How + adjective cannot be followed directly by a noun."],
    ],
    answer: "A",
    explanation: "Exclamations: **What (a/an) + adjective + noun!** (*What a long queue!*) or **How + adjective/adverb!** (*How long the queue is!*).",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word to complete each question.",
    template: "{{blank:a}} your parents know about the meeting? {{blank:b}} the new teacher arrived yet?",
    blanks: [
      { id: "a", accepted: ["Do"], choices: ["Do", "Does", "Are", "Have"] },
      { id: "b", accepted: ["Has"], choices: ["Has", "Have", "Did", "Is"] },
    ],
    explanation: "*Know* has no auxiliary, so add **Do** (plural subject *your parents*). *Arrived ... yet* is present perfect with a singular subject: **Has**.",
  });
  b.fib({
    d: 3,
    stem: "Write the question tag for each statement.",
    template: "Let's start the meeting, {{blank:a}}? I am on the list, {{blank:b}}?",
    blanks: [
      { id: "a", accepted: ["shall we"], wrong: "let's we" },
      { id: "b", accepted: ["aren't I", "am I not"], wrong: "amn't I" },
    ],
    hints: ["Both are special tags that do not follow the usual pattern."],
    explanation: "After *Let's ...*, the tag is **shall we**. After *I am ...*, the tag is **aren't I** (formal: *am I not*); *amn't I* is not standard English.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "An exclamation ends with an exclamation mark, and a command can end with a full stop.",
    answer: true,
    explanation: "True. *What a surprise!* ends with an exclamation mark. Most commands end with a full stop (*Please sit down.*); an urgent one may take an exclamation mark (*Stop!*).",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*You like football, isn't it?* is correct because *isn't it* can be used after any statement.",
    answer: false,
    explanation: "False. The tag must match the statement's verb and subject: *You like football, **don't you**?* Using *isn't it* for every tag is a common error.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence with its type.",
    pairs: [
      ["Please switch off your phones.", "command"],
      ["How beautiful the Chimanimani mountains are!", "exclamation"],
      ["Did you hear the thunder last night?", "yes/no question"],
      ["Why was the bus late?", "wh- question"],
    ],
    explanation: "Commands use the base verb with no subject; exclamations show strong feeling (What/How ...!); yes/no questions begin with an auxiliary; wh- questions begin with a question word.",
  });
  b.short({
    d: 2,
    stem: "Write the question tag.\n\n*The children haven't eaten yet, ___?*",
    accepted: ["have they"],
    wrong: ["haven't they"],
    explanation: "Negative statement (*haven't*) → positive tag with the same auxiliary: **have they?**",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which question asks about the **subject** of the action?\n\n*Mr Phiri repaired the borehole.*",
    options: [
      ["Who repaired the borehole?", "Correct: who is the subject, so there is no did and no inversion."],
      ["Who did repair the borehole?", "In a subject question, do/did is not added (except for emphasis)."],
      ["What did Mr Phiri repair?", "This asks about the object (the borehole), not the subject."],
      ["Who did Mr Phiri repair?", "This asks about a person who was repaired, which makes no sense."],
    ],
    answer: "A",
    hints: ["The answer to the question should be Mr Phiri."],
    explanation: "When *who* or *what* is the **subject**, use statement order without *do/did*: *Who repaired the borehole?* When it is the object, add the auxiliary: *What did Mr Phiri repair?*",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct polite (indirect) question.",
    options: [
      ["Could you tell me where the examination room is?", "Correct: statement word order (the examination room is) after the polite opening."],
      ["Could you tell me where is the examination room?", "Inside an indirect question, use statement order: subject before verb."],
      ["Could you tell me where the examination room is.", "The sentence begins with a question (Could you ...), so it ends with a question mark."],
      ["Could you tell me where does the examination room is?", "Indirect questions drop do/does, and does is never followed by is."],
    ],
    answer: "A",
    hints: ["In an indirect question, does the verb come before or after the subject?"],
    explanation: "Indirect questions use **statement word order** and drop *do/does/did*: *Could you tell me where the examination room is?*",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "This sentence comes from a dialogue in a story about a cattle sale. Supply the correct question tag.\n\n*\"Your uncle sold the black cow last week, ___?\" asked the dip attendant.*",
    accepted: ["didn't he", "did he not"],
    wrong: ["didn't she", "hasn't he", "isn't it"],
    hints: ["Find the tense of sold. Is there an auxiliary?", "Which pronoun replaces your uncle?"],
    explanation: "*Sold* is past simple with no auxiliary, so the tag uses *did*; the statement is positive, so the tag is negative; *your uncle* becomes *he*: **didn't he?**",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "This sentence comes from an article giving advice to new pupils. Rewrite the question politely, beginning with the words given.\n\n*\"When does the library open on Saturdays?\"*\n\nBegin: *Could you tell me ...*",
    accepted: [
      "Could you tell me when the library opens on Saturdays?",
    ],
    patterns: ["^could you (please )?tell me when the library opens on saturdays( please)?$"],
    wrong: ["Could you tell me when does the library open on Saturdays?"],
    hints: ["Drop does and put the verb after the subject.", "The main verb now needs the -s ending."],
    explanation: "An indirect question uses statement order and drops *does*, so the main verb takes the *-s*: *Could you tell me when the library **opens** on Saturdays?*",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "APPLICATION", marks: 3,
    stem: "The following sentences come from a pupil's speech. Each contains one error in a question, tag or exclamation. Rewrite each sentence correctly.\n\n1. *Why we must keep our school clean?*\n2. *Litter attracts flies, isn't it?*\n3. *How a difference a clean classroom makes!*",
    points: [
      "Why must we keep our school clean? (auxiliary must before the subject we)",
      "Litter attracts flies, doesn't it? (tag uses does with it)",
      "What a difference a clean classroom makes! (What a + noun, not How a)",
    ],
    modelAnswer: "1. Why must we keep our school clean? 2. Litter attracts flies, doesn't it? 3. What a difference a clean classroom makes!",
    hints: ["Check the word order in 1, the auxiliary in 2 and the exclamation word in 3."],
    explanation: "Questions put the auxiliary before the subject; tags match the verb (*attracts* → *doesn't it*); *What a* comes before a noun, *How* before an adjective.",
  });

  b.card("CONCEPT", "Forming a yes/no question", "Put the auxiliary before the subject; if there is none, add do/does/did and use the base verb.", "Does she live here? Did they win?");
  b.card("CONCEPT", "Forming a wh- question", "Question word + auxiliary + subject + verb.", "Where are you going? Why did he leave?");
  b.card("FACT", "Subject questions", "When who/what is the subject, use no do/did and statement order.", "Who broke the window?");
  b.card("DEFINITION", "What is a **question tag**?", "A short question at the end of a statement, made with the same auxiliary and a pronoun.", "It's hot, isn't it?");
  b.card("FACT", "Tag polarity", "Positive statement → negative tag; negative statement (including nobody, never, hardly) → positive tag.", "You aren't tired, are you?");
  b.card("FACT", "Special tags", "I am ..., aren't I? / Let's ..., shall we? / There is ..., isn't there? / Everyone ..., aren't they?", undefined);
  b.card("CONCEPT", "Indirect questions", "Polite opening + statement word order, no do/does/did.", "Could you tell me where the bank is?");
  b.card("FACT", "Exclamation patterns", "What (a/an) + adjective + noun! / How + adjective or adverb!", "What a game! How fast she runs!");
  b.card("DEFINITION", "What is a **command** (imperative)?", "A sentence that tells someone to do something, using the base verb with no subject.", "Close the gate. Don't be late.");
});
