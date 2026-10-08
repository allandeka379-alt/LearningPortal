// Slice EVO: synonyms and antonyms.
import { concept } from "../lib.mjs";

concept("eng.vocabulary.synonyms-antonyms", { file: "vocabulary/synonyms-antonyms", keyPrefix: "vocabulary.synonyms-antonyms" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word is a **synonym** of *begin*?",
    options: [
      ["commence", "Correct: commence means begin (it is more formal)."],
      ["conclude", "Conclude means end: it is an antonym of begin."],
      ["continue", "Continue means carry on, not start."],
      ["postpone", "Postpone means put off until later."],
    ],
    answer: "A",
    explanation: "A synonym has the same or nearly the same meaning. *Commence* is a formal synonym of *begin* and *start*.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word is an **antonym** of *ancient*?",
    options: [
      ["modern", "Correct: modern means of the present time, the opposite of very old."],
      ["historic", "Historic means important in history; it is close in meaning to ancient."],
      ["elderly", "Elderly means old (used of people)."],
      ["antique", "Antique means old and valuable."],
    ],
    answer: "A",
    explanation: "An antonym has the opposite meaning: *ancient / modern*, *victory / defeat*, *generous / mean*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the word closest in meaning to the word in bold.\n\n*The villagers were **reluctant** to leave their homes before the floods.*",
    options: [
      ["unwilling", "Correct: reluctant means unwilling or hesitant to do something."],
      ["eager", "Eager means keen: it is an antonym of reluctant."],
      ["unable", "Unable means they could not leave; reluctant means they did not want to."],
      ["afraid", "They may have been afraid, but reluctant does not mean afraid."],
    ],
    answer: "A",
    explanation: "**reluctant** = unwilling, hesitant. Replace the word in the sentence to check: *unwilling to leave their homes* keeps the meaning.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which word means the **opposite** of *generous*?",
    options: [
      ["mean", "Correct: mean (unwilling to give or share) is the opposite of generous."],
      ["kind", "Kind is close in meaning to generous."],
      ["wealthy", "Wealthy means rich; rich people can be generous or mean."],
      ["humble", "Humble means modest, not proud."],
    ],
    answer: "A",
    explanation: "*Generous* means willing to give; its antonym is **mean** (or *stingy*, *miserly*).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which word is the correct antonym of **responsible**?",
    options: [
      ["irresponsible", "Correct: ir- is used before roots that begin with r."],
      ["unresponsible", "Un- is not used with responsible."],
      ["inresponsible", "In- changes to ir- before r."],
      ["disresponsible", "There is no such word."],
    ],
    answer: "A",
    explanation: "Before *r*, the negative prefix is **ir-**: irresponsible, irregular, irrelevant.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the word that best replaces **fair** in this sentence.\n\n*The referee's decision was **fair**, so neither team complained.*",
    options: [
      ["just", "Correct: here fair means just or reasonable."],
      ["light", "Fair can mean light in colour (fair hair), but not in this sentence."],
      ["average", "Fair can mean average (a fair attempt), but a decision nobody complained about was just."],
      ["sunny", "Fair can describe weather, but not a decision."],
    ],
    answer: "A",
    explanation: "Words have several meanings. Choose the synonym that fits **this** sentence: a decision that nobody complained about was **just**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which word gives the most **negative** picture of the man in the sentence?\n\n*Mr Banda was ___ about keeping the old rules.*",
    options: [
      ["stubborn", "Correct: stubborn suggests refusing to listen or change, a negative connotation."],
      ["determined", "Determined has a positive connotation: strong will."],
      ["firm", "Firm is neutral to positive: steady and fixed."],
      ["resolute", "Resolute is positive: admirably purposeful."],
    ],
    answer: "A",
    hints: ["All four words describe someone who will not change.", "Which one would you use to criticise someone?"],
    explanation: "Synonyms can differ in **connotation**. *Determined*, *firm* and *resolute* praise a person's strength of will; **stubborn** criticises it.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the most suitable word for a formal letter.\n\n*I would like to ___ further information about the vacancy advertised in The Herald.*",
    options: [
      ["request", "Correct: request is formal and precise."],
      ["grab", "Grab is informal and means seize roughly."],
      ["get hold of", "Get hold of is informal."],
      ["pick up", "Pick up is informal and suggests collecting something physical."],
    ],
    answer: "A",
    hints: ["Think about register: who is reading the letter?"],
    explanation: "Synonyms differ in **register**. In a formal letter use *request*, *obtain* or *receive* rather than informal phrases such as *get hold of*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the word that best fits the context.\n\n*Exhausted after the thirty-kilometre walk, the hikers ___ into the camp at Mana Pools.*",
    options: [
      ["staggered", "Correct: staggered means walked unsteadily, as tired people do."],
      ["strolled", "Strolled means walked in a relaxed way, which does not fit exhausted."],
      ["marched", "Marched suggests steady, energetic, regular steps."],
      ["skipped", "Skipped suggests light, happy movement."],
    ],
    answer: "A",
    hints: ["Which way of walking matches being exhausted?"],
    explanation: "Precise synonyms of *walked* carry different pictures. Exhausted hikers **stagger**; relaxed visitors *stroll*; soldiers *march*.",
  });
  b.fib({
    d: 2,
    stem: "Choose the antonym of the word in brackets to complete the sentence.",
    template: "Unlike his brother, who was always early, Tonderai was usually {{blank:a}} (punctual) for lessons.",
    blanks: [{ id: "a", accepted: ["late"], choices: ["late", "early", "prompt", "ready"] }],
    explanation: "*Punctual* means on time; *unlike his brother, who was always early* shows we need the opposite: **late**.",
  });
  b.fib({
    d: 3,
    stem: "Choose the synonym that fits each sentence best.",
    template: "The flood caused {{blank:a}} damage to the bridge. The crowd gave the winning team a {{blank:b}} welcome.",
    blanks: [
      { id: "a", accepted: ["severe"], choices: ["severe", "warm", "strict", "stern"] },
      { id: "b", accepted: ["warm"], choices: ["warm", "severe", "strict", "stern"] },
    ],
    hints: ["Think about which words naturally go together (collocation)."],
    explanation: "We say **severe** damage (very serious) and a **warm** welcome (friendly). *Strict* and *stern* describe people or rules, not damage.",
  });
  b.short({
    d: 2, skill: "UNDERSTANDING",
    stem: "Add a prefix to make the antonym of **honest**.",
    accepted: ["dishonest"],
    wrong: ["unhonest", "inhonest"],
    explanation: "honest → **dishonest**. Other *dis-* antonyms: disagree, disloyal, disobey, dislike.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Give **one word** from this sentence that means the **opposite** of *temporary*.\n\n*The family moved from a temporary shelter into a permanent home in Chitungwiza.*",
    accepted: ["permanent"],
    wrong: ["temporary", "home"],
    hints: ["Temporary means lasting only a short time."],
    explanation: "*Temporary* = lasting a short time; **permanent** = lasting for ever or a long time.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*Slim* and *skinny* have the same basic meaning, but *skinny* usually sounds less complimentary.",
    answer: true,
    explanation: "True. They share the meaning *thin*, but differ in **connotation**: *slim* is positive, *skinny* is often negative.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each word with its antonym.",
    pairs: [["victory", "defeat"], ["expand", "contract"], ["accept", "refuse"], ["scarce", "plentiful"], ["optimistic", "pessimistic"]],
    explanation: "Antonym pairs: victory / defeat, expand / contract, accept / refuse, scarce / plentiful, optimistic / pessimistic.",
  });
  b.manualShort({
    d: 3, skill: "CREATION", marks: 3,
    stem: "Rewrite this sentence, replacing each word in bold with a more precise synonym. Keep the meaning.\n\n*The **big** crowd **said** loudly that the referee had made a **bad** decision.*",
    points: [
      "Replaces big with a precise synonym such as huge, enormous or large.",
      "Replaces said with a precise verb such as shouted, protested, complained or insisted.",
      "Replaces bad with a precise synonym such as poor, wrong, unfair or terrible.",
    ],
    modelAnswer: "The huge crowd protested loudly that the referee had made a poor decision.",
    hints: ["Choose words that fit together and keep the same meaning."],
    explanation: "Precise synonyms make writing vivid. Check that each one fits the sentence: a crowd *protests* or *shouts*; a decision is *poor* or *unfair*.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4, examStyle: true,
    stem: "Read the sentence.\n\n*The councillor's **frank** answers and **modest** manner won the respect of the residents.*\n\nGive **one word or short phrase** with the same meaning as each word in bold, as it is used in the sentence, and explain briefly why another meaning of each word would not fit.",
    points: [
      "frank: honest / open / direct.",
      "Explains that frank here describes plain honest speech (not, for example, a name).",
      "modest: humble / not boastful.",
      "Explains that modest here describes manner (humble), not a small amount as in a modest salary.",
    ],
    modelAnswer: "Frank means honest or direct: here it describes the way he answered. Modest means humble: it describes his manner, not 'small' as in a modest income.",
    hints: ["Replace each word with your answer and check the sentence still makes sense."],
    explanation: "In context, *frank* = honest, direct; *modest* = humble. *Modest* can also mean *not large* (a modest sum), which does not fit *manner*.",
  });

  b.card("DEFINITION", "What is a **synonym**?", "A word with the same or nearly the same meaning as another: begin / start, brave / courageous.", undefined);
  b.card("DEFINITION", "What is an **antonym**?", "A word with the opposite meaning: ancient / modern, victory / defeat.", undefined);
  b.card("DEFINITION", "What is **connotation**?", "The positive or negative feeling a word suggests beyond its basic meaning.", "determined (positive) vs stubborn (negative).");
  b.card("CONCEPT", "Four ways synonyms differ", "Strength (warm / scorching), connotation (slim / skinny), register (buy / purchase) and collocation (strong tea, not powerful tea).", undefined);
  b.card("CONCEPT", "Synonyms from a passage", "Give a word of the same word class, with the meaning the word has in that sentence, and test it in the sentence.", undefined);
  b.card("FACT", "Prefixes that form antonyms", "un-, in-, im- (before m, p), il- (before l), ir- (before r), dis-, mis-.", "unkind, inaccurate, impolite, illegible, irresponsible, dishonest.");
  b.card("VOCABULARY", "Precise verbs for said", "replied, whispered, insisted, admitted, complained, announced, protested.", undefined);
  b.card("VOCABULARY", "Precise verbs for walked", "strolled (relaxed), marched (steady), staggered (unsteady), crept (quietly), hurried (fast), wandered (aimlessly).", undefined);
  b.card("VOCABULARY", "Antonym pairs", "scarce / plentiful, expand / contract, optimistic / pessimistic, accept / refuse, generous / mean.", undefined);
});
