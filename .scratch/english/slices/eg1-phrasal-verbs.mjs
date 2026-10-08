// Slice EG1: phrasal verbs.
import { concept } from "../lib.mjs";

concept("eng.grammar.phrasal-verbs", { file: "grammar/phrasal-verbs", keyPrefix: "grammar.phrasal-verbs" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "What does the phrasal verb in bold mean?\n\n*The netball match was **called off** because the court was flooded.*",
    options: [
      ["cancelled", "Correct: to call off an event is to cancel it."],
      ["announced", "To announce is to call out or declare, not to cancel."],
      ["started", "The flooded court suggests the match did not take place."],
      ["shortened", "Called off means it did not happen at all, not that it was shortened."],
    ],
    answer: "A",
    explanation: "**call off** = cancel. *The strike was called off after the talks succeeded.*",
  });
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "What does the phrasal verb in bold mean?\n\n*While cleaning the storeroom, Rumbi **came across** her grandfather's old letters.*",
    options: [
      ["found by chance", "Correct: to come across something is to find it without looking for it."],
      ["walked over", "This is a literal reading; the phrasal verb has an idiomatic meaning."],
      ["threw away", "That would be throw away or throw out."],
      ["read aloud", "Nothing in come across refers to reading."],
    ],
    answer: "A",
    explanation: "**come across** = find or meet by chance. *I came across a useful website while revising.*",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Choose the correct particle.\n\n*Our car broke ___ on the way to Nyanga, so we had to call a mechanic.*",
    options: [
      ["down", "Correct: break down means stop working (for a vehicle or machine)."],
      ["out", "Break out means start suddenly, used for fires, wars or diseases."],
      ["into", "Break into means enter by force, as thieves do."],
      ["up", "Break up means end a relationship or fall into pieces."],
    ],
    answer: "A",
    explanation: "One verb, many particles: **break down** (stop working), **break out** (start suddenly), **break into** (enter by force), **break up** (end a relationship).",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "Which single word could replace the phrasal verb in bold in a formal report?\n\n*The health workers **carried out** a survey of all the boreholes in the ward.*",
    options: [
      ["conducted", "Correct: carry out = conduct or perform."],
      ["transported", "Carried out does not mean physically carried here."],
      ["removed", "Removed would mean taken away, which does not fit a survey."],
      ["completed", "A survey can be carried out without being completed; conducted is the exact equivalent."],
    ],
    answer: "A",
    explanation: "**carry out** a survey, an experiment, an investigation or a plan = **conduct** or **perform** it.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence is correct?",
    options: [
      ["The radio was too loud, so I turned it down.", "Correct: a pronoun object goes between the verb and the particle."],
      ["The radio was too loud, so I turned down it.", "A pronoun object cannot follow the particle."],
      ["The radio was too loud, so I turned it off down.", "Two particles are not used together here."],
      ["The radio was too loud, so I down turned it.", "The particle comes after the verb, not before it."],
    ],
    answer: "A",
    explanation: "With a separable phrasal verb, a **pronoun** object must go in the middle: *turn it down*, *switch it off*, *pick them up*.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct particle for each gap.",
    template: "My grandmother looks {{blank:a}} my little brother while my parents are at work. She says he takes {{blank:b}} our father: he has the same laugh.",
    blanks: [
      { id: "a", accepted: ["after"], choices: ["after", "for", "into", "up"] },
      { id: "b", accepted: ["after"], choices: ["after", "over", "off", "in"] },
    ],
    explanation: "**look after** = take care of. **take after** = resemble an older relative. (*Look for* = search for; *look into* = investigate; *take over* = take control.)",
  });
  b.fib({
    d: 2,
    stem: "Write one word to complete each phrasal verb.",
    template: "We have run {{blank:a}} of sugar, so I will buy some at the shops. The noise is terrible, but we have to put up {{blank:b}} it until the road works end.",
    blanks: [
      { id: "a", accepted: ["out"], wrong: "off" },
      { id: "b", accepted: ["with"], wrong: "for" },
    ],
    explanation: "**run out of** = have none left. **put up with** = tolerate. Both are three-word phrasal verbs that are never separated.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "In the phrasal verb *give up*, the meaning can be worked out by adding the meanings of *give* and *up*.",
    answer: false,
    explanation: "False. *Give up* is **idiomatic**: it means *stop* or *abandon*, which has nothing to do with giving or upward movement.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "*I look forward to hearing from you* is correct, because the *to* in *look forward to* is a preposition.",
    answer: true,
    explanation: "True. After the preposition *to* in *look forward to*, use a noun or an *-ing* form: *I look forward to hearing from you / to the holidays.*",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each phrasal verb with its formal one-word equivalent.",
    pairs: [
      ["put off", "postpone"],
      ["look into", "investigate"],
      ["turn down", "reject"],
      ["set up", "establish"],
      ["find out", "discover"],
    ],
    explanation: "Formal writing often replaces a phrasal verb with one word: put off → postpone; look into → investigate; turn down → reject; set up → establish; find out → discover.",
  });
  b.short({
    d: 2,
    stem: "Write a phrasal verb with **up** that means *invent* (a story or an excuse), in the past tense, to complete the sentence.\n\n*Tonderai ___ a story about a lion to explain why he was late.*",
    accepted: ["made up"],
    wrong: ["make up", "took up"],
    explanation: "**make up** = invent (a story, an excuse). Past tense: **made up**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In which sentence does **took off** mean *became successful*?",
    options: [
      ["After the radio advert, her catering business really took off.", "Correct: a business that takes off suddenly becomes successful."],
      ["The small plane took off from Charles Prince Airport at dawn.", "Here took off means left the ground."],
      ["He took off his muddy boots before entering the kitchen.", "Here took off means removed."],
      ["The thief took off down the road when he saw the guard.", "Here took off means left quickly, ran away."],
    ],
    answer: "A",
    hints: ["Which subject can grow or become popular?"],
    explanation: "Many phrasal verbs have several meanings. **take off** can mean leave the ground (a plane), remove (clothes), leave suddenly, or become successful (a business, a song, an idea). Context decides.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the phrasal verb that best replaces the word in bold.\n\n*The coach said the team must **continue** training even during the holidays.*",
    options: [
      ["go on", "Correct: go on means continue."],
      ["go off", "Go off means explode, ring (an alarm) or go bad (food)."],
      ["go over", "Go over means examine or revise carefully."],
      ["go through", "Go through means experience something difficult or examine in detail."],
    ],
    answer: "A",
    hints: ["Think about the particle that suggests moving forward without stopping."],
    explanation: "**go on** = continue. *Go on (with) training* keeps the same meaning as *continue training*.",
  });
  b.manualShort({
    d: 3, skill: "APPLICATION", marks: 2,
    stem: "Rewrite this informal sentence in a formal style for a report to the school board, replacing **both** phrasal verbs with single words.\n\n*The committee looked into the complaints and came up with three recommendations.*",
    points: [
      "Replaces looked into with investigated (or examined).",
      "Replaces came up with with devised, proposed, produced or made, keeping the past tense.",
    ],
    modelAnswer: "The committee investigated the complaints and proposed three recommendations.",
    hints: ["Keep the past tense in both replacements."],
    explanation: "**look into** = investigate or examine; **come up with** = devise, propose or produce. Formal one-word verbs suit reports.",
  });
  b.short({
    d: 3, examStyle: true,
    stem: "Read the sentence from a passage about a rural clinic.\n\n*For years the nurses had **put up with** a leaking roof, but when the rains came they could bear it no longer.*\n\nGive **one word** that has the same meaning as *put up with* as used here. Write it in the same tense.",
    accepted: ["tolerated", "endured", "accepted", "suffered", "borne", "stood"],
    model: "tolerated",
    wrong: ["tolerate", "built"],
    hints: ["The nurses lived with a problem without being able to fix it.", "Use the past participle because the passage has had ..."],
    explanation: "**put up with** = **tolerate** or **endure**. After *had*, the replacement must be a past participle: *had tolerated*, *had endured*.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "These sentences come from a short story. Write the particle that completes each phrasal verb.",
    template: "The fire broke {{blank:a}} late at night. The villagers rushed to put it {{blank:b}} with buckets of water, and by dawn they had found {{blank:c}} that a candle had started it.",
    blanks: [
      { id: "a", accepted: ["out"], wrong: "down" },
      { id: "b", accepted: ["out"], wrong: "off" },
      { id: "c", accepted: ["out"], wrong: "up" },
    ],
    hints: ["The same particle completes all three phrasal verbs."],
    explanation: "**break out** (start suddenly), **put out** (extinguish a fire), **find out** (discover). The particle *out* has a different meaning in each.",
  });
  b.manualShort({
    d: 4, examStyle: true, skill: "ANALYSIS", marks: 2,
    stem: "Read this sentence from an article.\n\n*When the youth club's funding was cut, the members did not give up; instead they set up a car wash to raise the money themselves.*\n\nExplain what **give up** and **set up** mean as used in the sentence.",
    points: [
      "Give up: stop trying or abandon (their efforts / the club).",
      "Set up: start, establish or organise (a car wash business).",
    ],
    modelAnswer: "'Did not give up' means they did not stop trying or abandon the club. 'Set up' means they started or organised a car wash.",
    hints: ["Think about what the members did after losing their funding."],
    explanation: "**give up** = stop trying, abandon; **set up** = establish, start. Explain meanings that fit the sentence, not just any dictionary meaning.",
  });

  b.card("DEFINITION", "What is a **phrasal verb**?", "A verb + particle (adverb or preposition) that together have their own meaning.", "give up, look after, put up with");
  b.card("CONCEPT", "Pronoun objects with phrasal verbs", "A pronoun goes between the verb and the particle: turn it off, pick them up, call it off.", "Never: turn off it.");
  b.card("VOCABULARY", "break + particle", "break down (stop working), break into (enter by force), break out (start suddenly), break up (end a relationship).", undefined);
  b.card("VOCABULARY", "Formal equivalents (1)", "call off = cancel; put off = postpone; carry out = conduct; look into = investigate.", undefined);
  b.card("VOCABULARY", "Formal equivalents (2)", "turn down = reject; set up = establish; find out = discover; put up with = tolerate; go on = continue.", undefined);
  b.card("VOCABULARY", "look + particle", "look after (care for), look into (investigate), look up to (admire), look for (search for), look forward to (anticipate with pleasure).", undefined);
  b.card("FACT", "look forward to + ?", "A noun or an -ing form: I look forward to hearing from you.", "The to is a preposition.");
  b.card("VOCABULARY", "take + particle", "take after (resemble), take off (leave the ground; remove; become successful), take over (gain control), take up (start a hobby).", undefined);
  b.card("FACT", "fill in vs fill up", "fill in (or out) a form; fill up a container or tank.", undefined);
});
