// Slice EG1: auxiliary and modal verbs.
import { concept } from "../lib.mjs";

concept("eng.grammar.modals", { file: "grammar/modals", keyPrefix: "grammar.modals" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which sentence is correct?",
    options: [
      ["My sister can play the mbira.", "Correct: a modal is followed by the base form of the verb."],
      ["My sister can plays the mbira.", "Modals are followed by the base form; play takes no -s after can."],
      ["My sister cans play the mbira.", "Modal verbs never add -s, even with he, she or it."],
      ["My sister can to play the mbira.", "Can is not followed by to."],
    ],
    answer: "A",
    explanation: "Modal verbs are followed by the **base form** without *to* (*can play*, *must go*), and never add *-s*.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word is a modal verb?",
    options: [
      ["might", "Correct: might is a modal verb expressing possibility."],
      ["seem", "Seem is an ordinary linking verb; it takes -s (it seems)."],
      ["want", "Want is an ordinary verb; it takes to and -s (she wants to go)."],
      ["try", "Try is an ordinary verb with forms such as tries and trying."],
    ],
    answer: "A",
    explanation: "The modals are *can, could, may, might, must, shall, should, will, would* and *ought to* (and sometimes *need* and *dare*). They have no *-s*, *-ing* or past participle forms.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct word.\n\n*The road was closed, so we ___ take a longer route to Masvingo.*",
    options: [
      ["had to", "Correct: had to expresses an obligation in the past."],
      ["must", "Must has no past form, so it cannot describe a past obligation."],
      ["should", "Should gives advice; the sentence describes something they were forced to do."],
      ["may", "May expresses permission or possibility, not a past necessity."],
    ],
    answer: "A",
    explanation: "*Must* has no past tense. For an obligation in the past, use **had to**: *We had to take a longer route.*",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which sentence means that something is **not necessary**?",
    options: [
      ["You don't have to bring a packed lunch.", "Correct: don't have to means it is not necessary, though you may if you want."],
      ["You mustn't bring a packed lunch.", "Mustn't means it is forbidden, not that it is unnecessary."],
      ["You must bring a packed lunch.", "Must means it is necessary."],
      ["You have to bring a packed lunch.", "Have to means it is necessary."],
    ],
    answer: "A",
    explanation: "**mustn't** = it is forbidden. **don't have to / needn't** = it is not necessary. They look alike but mean very different things.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the most suitable modal for a polite request in a formal letter.\n\n*___ you please send us a copy of the tournament rules?*",
    options: [
      ["Could", "Correct: could makes a request polite and suits a formal letter."],
      ["Must", "Must in a question asks whether something is necessary; it is not a request."],
      ["Should", "Should you ... sounds like a condition (if you should), not a request."],
      ["Might", "Might you ... is very unusual and does not work as a request here."],
    ],
    answer: "A",
    explanation: "**Could you ...?** and **Would you ...?** are the standard polite requests. In formal letters you can also write *We would be grateful if you could ...*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct auxiliary.\n\n*___ your brother work at the hospital in Gweru?*",
    options: [
      ["Does", "Correct: a present simple question with a singular subject uses does."],
      ["Do", "Do goes with plural subjects and with I and you."],
      ["Is", "Is would need work to become working (Is your brother working ...?)."],
      ["Has", "Has would need a past participle such as worked."],
    ],
    answer: "A",
    explanation: "The auxiliary **do/does/did** forms questions and negatives in the simple tenses: *Does he work? Do they work? Did she work?* The main verb stays in the base form.",
  });
  b.fib({
    d: 2,
    stem: "Choose the modal that fits each meaning.",
    template: "{{blank:a}} I borrow your dictionary, please? (asking permission formally) Look at those dark clouds: it {{blank:b}} rain later. (possibility)",
    blanks: [
      { id: "a", accepted: ["May"], choices: ["May", "Must", "Shall", "Ought"] },
      { id: "b", accepted: ["might"], choices: ["might", "mustn't", "ought", "shall"] },
    ],
    explanation: "**May I ...?** is the formal way to ask permission. **might** expresses possibility. (*Ought* needs *to*; *mustn't* means it is forbidden.)",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Should of* is the correct written form of *should've*.",
    answer: false,
    explanation: "False. *Should've* is short for *should **have***. *Should of*, *could of* and *must of* are always wrong in writing.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "In *You must be tired after your long journey*, the word *must* expresses a deduction, not an order.",
    answer: true,
    explanation: "True. The speaker is not ordering anyone to be tired; they are concluding from evidence (the long journey) that the person is almost certainly tired.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each sentence with the meaning of its modal verb.",
    pairs: [
      ["Grandpa can still ride a bicycle at eighty.", "ability"],
      ["You may use a calculator in this paper.", "permission"],
      ["You should drink more water in this heat.", "advice"],
      ["All visitors must sign in at reception.", "obligation"],
    ],
    explanation: "*can* = ability; *may* = permission; *should* = advice; *must* = obligation (here a rule).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Choose the correct modal.\n\n*Kuda has been training every day for months. He ___ be very fit by now.*",
    options: [
      ["must", "Correct: must expresses a confident deduction from strong evidence."],
      ["can't", "Can't would mean he is certainly not fit, which contradicts the evidence."],
      ["needn't", "Needn't means something is not necessary; it cannot express a conclusion."],
      ["ought", "Ought needs to before the verb (ought to be)."],
    ],
    answer: "A",
    hints: ["The speaker is drawing a conclusion from evidence. Which modal shows near certainty?"],
    explanation: "For deductions: **must** = I am almost sure it is true; **can't** = I am almost sure it is not true; **might/may/could** = it is possible.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct form.\n\n*The ground is wet and there are puddles everywhere. It ___ during the night.*",
    options: [
      ["must have rained", "Correct: must have + past participle is a confident deduction about the past."],
      ["must rain", "Must rain would be a present obligation or deduction, but the rain happened in the night."],
      ["can't have rained", "This would mean it certainly did not rain, which contradicts the evidence."],
      ["should rain", "Should rain gives an expectation about the future, not a conclusion about the past."],
    ],
    answer: "A",
    hints: ["The evidence is now, but the rain was in the past."],
    explanation: "For deductions about the past, use modal + **have** + past participle: *must have rained*, *can't have seen*, *might have left*.",
  });
  b.short({
    d: 3,
    stem: "The sentence contains one error. Write the correct form of the words in bold.\n\n*I **should of** checked the time before I left home.*",
    accepted: ["should have", "should've"],
    wrong: ["should of"],
    hints: ["What does the contraction should've stand for?"],
    explanation: "The correct form is **should have** + past participle (*should have checked*). *Should of* comes from mishearing *should've*.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 2,
    stem: "A notice at the library says: *Pupils mustn't eat in the library. Pupils don't have to return books on Saturdays.* Explain what each sentence tells pupils.",
    points: [
      "Mustn't: eating in the library is forbidden (not allowed).",
      "Don't have to: returning books on Saturday is not necessary (pupils may choose to, but it is not required).",
    ],
    modelAnswer: "The first sentence means eating in the library is not allowed. The second means pupils are not required to return books on Saturdays, although they can if they want.",
    hints: ["One sentence is a ban; the other removes a requirement."],
    explanation: "**mustn't** forbids; **don't have to** removes an obligation.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "These sentences come from a letter of complaint to a bus company. Choose the most suitable word for each gap.",
    template: "Last Friday the bus broke down near Chivhu, and passengers {{blank:a}} wait four hours for a replacement. I would be grateful if you {{blank:b}} explain why the vehicle had not been checked. Your company {{blank:c}} have warned us about the delay.",
    blanks: [
      { id: "a", accepted: ["had to"], choices: ["had to", "must", "should", "might"] },
      { id: "b", accepted: ["could"], choices: ["could", "must", "shall", "ought"] },
      { id: "c", accepted: ["should"], choices: ["should", "must", "can", "will"] },
    ],
    hints: ["The first gap is a past obligation.", "The last gap criticises something the company did not do."],
    explanation: "**had to** (past obligation; *must* has no past form). **could** (polite request after *I would be grateful if you*). **should have warned** (criticism of a past failure).",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "Rewrite the sentence from a club notice, using **needn't** in place of the words in bold, without changing the meaning. Write the whole sentence.\n\n*Members **do not have to** pay the subscription until March.*",
    accepted: [
      "Members needn't pay the subscription until March.",
      "Members need not pay the subscription until March.",
    ],
    wrong: ["Members needn't to pay the subscription until March."],
    hints: ["Needn't, used as a modal, is followed by the base form without to."],
    explanation: "As a modal, **needn't** (need not) means 'it is not necessary' and is followed by the base form: *Members needn't pay ...* Adding *to* (*needn't to pay*) is wrong.",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "ANALYSIS", marks: 2,
    stem: "Read this sentence from an article about water shortages in a town.\n\n*Unless the council acts now, residents could soon find their taps completely dry.*\n\nWhat does the writer's choice of the modal *could* show, and why might the writer have avoided *will*?",
    points: [
      "Could shows possibility: the writer presents the dry taps as a real risk, not a certainty.",
      "Avoiding will makes the claim cautious and reasonable (harder to dispute) while still warning the council.",
    ],
    modelAnswer: "Could shows that dry taps are a real possibility rather than a certainty. By not using will, the writer avoids overstating the danger, so the warning sounds reasonable and believable while still urging the council to act.",
    hints: ["How sure is the writer?", "What would will claim that could does not?"],
    explanation: "Modals show the writer's degree of certainty. Cautious modals (*could, may, might*) make an argument sound measured; *will* or *must* sound more certain and forceful.",
  });

  b.card("DEFINITION", "What is a **modal verb**?", "A helping verb that adds meaning such as ability, permission, possibility, obligation or advice.", "can, could, may, might, must, shall, should, will, would, ought to (need, dare)");
  b.card("FACT", "Three rules for modals", "Base form after them (no to, except ought to); no -s; questions and negatives without do.", "She can swim. Can she swim? She cannot swim.");
  b.card("CONCEPT", "mustn't vs don't have to", "mustn't = it is forbidden; don't have to / needn't = it is not necessary.", undefined);
  b.card("CONCEPT", "Deduction with must and can't", "must = almost sure it is true; can't = almost sure it is not. Past: must have / can't have + past participle.", "He must have left. She can't have seen us.");
  b.card("FACT", "Past of must (obligation)", "had to.", "We had to walk home.");
  b.card("FACT", "should have + past participle", "Criticism or regret about the past: something was right to do but did not happen.", "You should have told me.");
  b.card("FACT", "Polite requests", "Could you ...? Would you ...? I would be grateful if you could ...", "Suitable for formal letters.");
  b.card("DEFINITION", "Primary auxiliaries", "be (continuous tenses, passive), have (perfect tenses), do (questions, negatives, emphasis).", undefined);
  b.card("FACT", "could of / should of", "Always wrong in writing: the forms are could have, should have, must have.", undefined);
});
