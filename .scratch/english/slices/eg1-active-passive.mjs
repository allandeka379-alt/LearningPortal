// Slice EG1: active and passive voice.
import { concept } from "../lib.mjs";

concept("eng.grammar.active-passive", { file: "grammar/active-passive", keyPrefix: "grammar.active-passive" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Which sentence is in the **passive** voice?",
    options: [
      ["The maize was harvested in April.", "Correct: the subject (the maize) receives the action; the verb is was + past participle."],
      ["The farmers harvested the maize in April.", "The subject (the farmers) does the action: active voice."],
      ["The farmers were harvesting in April.", "Were harvesting is past continuous active; the farmers do the action."],
      ["The farmers had harvested by April.", "Had harvested is past perfect active."],
    ],
    answer: "A",
    explanation: "In the **passive**, the subject receives the action and the verb is *be* + past participle: *was harvested*.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct passive form.\n\n*Active: The prefects ring the bell at seven o'clock.*",
    options: [
      ["The bell is rung at seven o'clock.", "Correct: present simple active becomes is + past participle (rung)."],
      ["The bell was rung at seven o'clock.", "Was changes the tense to the past; the active is present simple."],
      ["The bell is rang at seven o'clock.", "Rang is the past simple; the passive needs the past participle rung."],
      ["The bell has rung at seven o'clock.", "Has rung is present perfect active, not passive."],
    ],
    answer: "A",
    explanation: "Keep the tense: present simple → *is/are* + past participle. *Ring, rang, **rung***.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Choose the correct passive form.\n\n*Active: Workers are building a new clinic in Murewa.*",
    options: [
      ["A new clinic is being built in Murewa.", "Correct: present continuous passive = is/are being + past participle."],
      ["A new clinic is built in Murewa.", "This is present simple passive and loses the idea that the work is in progress."],
      ["A new clinic was being built in Murewa.", "Was changes the tense to the past."],
      ["A new clinic has been built in Murewa.", "Has been built means the work is finished; the active says it is in progress."],
    ],
    answer: "A",
    explanation: "Present continuous active (*are building*) → present continuous passive (**is being built**).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct passive form.\n\n*Active: You must hand in the forms by Friday.*",
    options: [
      ["The forms must be handed in by Friday.", "Correct: modal + be + past participle."],
      ["The forms must handed in by Friday.", "The passive with a modal needs be before the participle."],
      ["The forms must been handed in by Friday.", "Must is followed by the base form be, not been."],
      ["The forms must be hand in by Friday.", "The main verb must be a past participle: handed."],
    ],
    answer: "A",
    explanation: "With a modal, the passive is **modal + be + past participle**: *must be handed in*, *can be seen*, *will be announced*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which sentence **cannot** be changed into the passive?",
    options: [
      ["The old man died last year.", "Correct: die has no object (it is intransitive), so there is nothing to become the passive subject."],
      ["The dog bit the postman.", "Passive: The postman was bitten by the dog."],
      ["Chipo baked a cake for the party.", "Passive: A cake was baked for the party by Chipo."],
      ["The storm destroyed the bridge.", "Passive: The bridge was destroyed by the storm."],
    ],
    answer: "A",
    explanation: "Only **transitive** verbs (verbs with an object) can be made passive. *Die, arrive, happen, sleep* and *fall* have no object.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct form for each gap to make the sentences passive.",
    template: "The results {{blank:a}} announced next week. The new library {{blank:b}} opened last month.",
    blanks: [
      { id: "a", accepted: ["will be"], choices: ["will be", "will", "are being", "have been"] },
      { id: "b", accepted: ["was"], choices: ["was", "is", "has", "will be"] },
    ],
    explanation: "*Next week* → future passive: **will be** announced. *Last month* → past simple passive: **was** opened.",
  });
  b.fib({
    d: 2,
    stem: "Write the past participle of the verb in brackets to complete each passive sentence.",
    template: "The letter was {{blank:a}} (write) by the class secretary. Two windows have been {{blank:b}} (break) by the wind.",
    blanks: [
      { id: "a", accepted: ["written"], wrong: "wrote" },
      { id: "b", accepted: ["broken"], wrong: "broke" },
    ],
    explanation: "The passive always uses the **past participle**: write → wrote → **written**; break → broke → **broken**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the passive voice, the tense of the sentence is shown by the form of the verb *be*.",
    answer: true,
    explanation: "True. The main verb is always the past participle; *be* changes for the tense: *is cleaned, was cleaned, has been cleaned, will be cleaned*.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*The thief was arrested* is incomplete and wrong because it does not say who arrested him.",
    answer: false,
    explanation: "False. The agent is often left out when it is obvious (the police), unknown or unimportant. *The thief was arrested* is complete and correct.",
  });
  b.match({
    d: 3, skill: "APPLICATION",
    stem: "Match each active verb with its passive form (subject: *the room*).",
    pairs: [
      ["They clean the room.", "The room is cleaned."],
      ["They are cleaning the room.", "The room is being cleaned."],
      ["They have cleaned the room.", "The room has been cleaned."],
      ["They had cleaned the room.", "The room had been cleaned."],
      ["They will clean the room.", "The room will be cleaned."],
    ],
    hints: ["Keep the tense of each active verb; only be changes."],
    explanation: "Each passive keeps the tense of the active: present simple *is cleaned*; present continuous *is being cleaned*; present perfect *has been cleaned*; past perfect *had been cleaned*; future *will be cleaned*.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct passive form.\n\n*Active: The judges gave us a certificate.*\n\nBegin: *We ...*",
    options: [
      ["We were given a certificate by the judges.", "Correct: us becomes we; past simple passive were given."],
      ["We were gave a certificate by the judges.", "Gave is the past simple; the passive needs the participle given."],
      ["Us were given a certificate by the judges.", "As the subject, the pronoun must change from us to we."],
      ["We are given a certificate by the judges.", "Are changes the tense to the present; the active is past."],
    ],
    answer: "A",
    hints: ["Which form of the pronoun is used as a subject?", "Keep the past tense."],
    explanation: "When an object pronoun becomes the subject, it changes case: *us → we, him → he, them → they*. With two-object verbs (*give, send, award*) the person usually becomes the subject: *We were given a certificate.*",
  });
  b.short({
    d: 3,
    stem: "Change the passive sentence into the active voice. Begin with *The referee*.\n\n*The match was stopped by the referee because of lightning.*",
    accepted: ["The referee stopped the match because of lightning."],
    patterns: ["^the referee stopped the match because of (the )?lightning$"],
    wrong: ["The referee was stopped the match because of lightning."],
    hints: ["Make the agent (after by) the subject and keep the past tense."],
    explanation: "The agent *the referee* becomes the subject; *was stopped* (past simple passive) becomes *stopped* (past simple active): ***The referee stopped the match because of lightning.***",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 2,
    stem: "A pupil wrote this in a story: *The door was suddenly flung open and a scream was heard.* Rewrite the sentence in the active voice, and explain why the active might be better in a story.",
    points: [
      "Gives a correct active version with a suitable subject, e.g. Someone suddenly flung the door open and we heard a scream.",
      "Explains that the active is more direct, lively or dramatic, and shows who acts.",
    ],
    modelAnswer: "Someone suddenly flung the door open and we heard a scream. The active voice is more direct and dramatic, which keeps a story moving.",
    hints: ["Who could have flung the door open? Use someone if the doer is unknown."],
    explanation: "Stories usually work better in the active voice because it names the doer and moves quickly. The passive suits reports, where the action matters more than the doer.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "This sentence comes from a newspaper report about a flood. Rewrite it in the passive voice, beginning with the words given. Do not include an agent.\n\n*Rescue workers have moved two hundred families to higher ground.*\n\nBegin: *Two hundred families ...*",
    accepted: [
      "Two hundred families have been moved to higher ground.",
    ],
    patterns: ["^two hundred families have been moved to higher ground( by rescue workers)?$"],
    wrong: ["Two hundred families were moved to higher ground."],
    hints: ["The active verb is present perfect: have moved.", "Families is plural."],
    explanation: "Present perfect active (*have moved*) → present perfect passive (**have been moved**). *Families* is plural, so *have*, not *has*.",
  });
  b.short({
    d: 4, examStyle: true,
    stem: "This sentence comes from a pupil's report on a school project. Rewrite it in the passive voice, beginning with the words given.\n\n*The Form 3 pupils should have watered the seedlings during the holiday.*\n\nBegin: *The seedlings ...*",
    accepted: [
      "The seedlings should have been watered by the Form 3 pupils during the holiday.",
      "The seedlings should have been watered during the holiday by the Form 3 pupils.",
      "The seedlings should have been watered during the holiday.",
    ],
    patterns: ["^the seedlings should have been watered( by the form 3 pupils)? during the holiday( by the form 3 pupils)?$"],
    model: "The seedlings should have been watered by the Form 3 pupils during the holiday.",
    wrong: ["The seedlings should have watered by the Form 3 pupils during the holiday."],
    hints: ["Modal perfect passive: modal + have been + past participle."],
    explanation: "*Should have watered* → **should have been watered**. The agent *by the Form 3 pupils* may be kept or dropped.",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "APPLICATION", marks: 3,
    stem: "The following notes come from the minutes of a school meeting. Rewrite each sentence in the passive voice, leaving out the agent.\n\n1. *The committee discussed the price of uniforms.*\n2. *The secretary will send a letter to all parents.*\n3. *The treasurer is checking the accounts.*",
    points: [
      "The price of uniforms was discussed.",
      "A letter will be sent to all parents.",
      "The accounts are being checked.",
    ],
    modelAnswer: "1. The price of uniforms was discussed. 2. A letter will be sent to all parents. (All parents will be sent a letter is also correct.) 3. The accounts are being checked.",
    hints: ["Keep each tense: past simple, future, present continuous.", "Accounts is plural."],
    explanation: "Minutes and reports use the passive because the decisions matter more than who made them. Keep each tense and make *be* agree with the new subject.",
  });

  b.card("DEFINITION", "What is the **passive voice**?", "A sentence form in which the subject receives the action: be + past participle.", "The road was repaired (by the council).");
  b.card("DEFINITION", "What is the **agent**?", "The doer of the action in a passive sentence, introduced by by.", "... by the council");
  b.card("FACT", "Passive with a modal", "modal + be + past participle; modal perfect: modal + have been + past participle.", "must be done; should have been done");
  b.card("FACT", "Passive continuous forms", "is/are being + participle (present); was/were being + participle (past).", "The hall is being painted.");
  b.card("FACT", "Passive perfect forms", "has/have been + participle; had been + participle.", "The results have been released.");
  b.card("CONCEPT", "When to drop the agent", "When the doer is unknown, obvious, unimportant or people in general.", "My bag has been stolen.");
  b.card("FACT", "Which verbs cannot be passive?", "Intransitive verbs (no object): die, arrive, happen, sleep, fall.", "Not: The accident was happened.");
  b.card("CONCEPT", "Choosing the voice", "Passive suits reports, minutes and science; active suits stories and friendly letters.", undefined);
  b.card("FACT", "Pronouns in the passive", "Object pronouns become subject pronouns: us → we, them → they, him → he, me → I.", "They praised us → We were praised.");
});
