// Slice A1: nouns and pronouns.
import { concept, P } from "../lib.mjs";

concept("eng.grammar.nouns", { file: "grammar/nouns", keyPrefix: "grammar.nouns" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which word in this sentence is an **abstract noun**?\n\n*Rudo's kindness surprised the new pupils at the school.*",
    options: [
      ["kindness", "Correct: kindness is a quality. You cannot see or touch it, so it is an abstract noun."],
      ["pupils", "Pupils are people you can see: a common (concrete) noun."],
      ["school", "A school is a building or institution you can see: a common noun."],
      ["Rudo's", "Rudo is the name of a particular person: a proper noun (here in the possessive form)."],
    ],
    answer: "A",
    explanation: "An abstract noun names an idea, quality or feeling that cannot be seen or touched, such as *kindness*, *honesty*, *fear* or *freedom*.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct collective noun: *a ___ of cattle*.",
    options: [
      ["herd", "Correct: cattle, goats and elephants move in herds."],
      ["flock", "A flock is used for sheep and birds."],
      ["swarm", "A swarm is used for bees and other insects."],
      ["pack", "A pack is used for wolves, wild dogs and cards."],
    ],
    answer: "A",
    explanation: "Collective nouns name a group: a **herd** of cattle, a **flock** of sheep, a **swarm** of bees, a **pack** of wild dogs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct plural to complete the sentence.\n\n*Two ___ stopped to help the old man who had fallen.*",
    options: [
      ["passers-by", "Correct: in a compound noun the main word (passer) takes the plural ending."],
      ["passer-bys", "The plural ending goes on the main noun, passer, not on by."],
      ["passers-bys", "Only the main noun is made plural; by never changes."],
      ["passer-by's", "An apostrophe shows possession, not a plural."],
    ],
    answer: "A",
    explanation: "Compound nouns make the **main noun** plural: passers-by, mothers-in-law, commanders-in-chief.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is the plural of **crisis**?",
    options: [
      ["crises", "Correct: nouns from Greek ending in -is change to -es: crisis, crises; analysis, analyses."],
      ["crisises", "This adds -es to the whole word; the Greek plural replaces -is with -es."],
      ["crisis", "Crisis is singular; it has a different plural form."],
      ["crisi", "There is no such form; -i is a Latin plural for some nouns ending in -us (cactus, cacti)."],
    ],
    answer: "A",
    explanation: "Some nouns keep their Greek or Latin plurals: crisis → crises, basis → bases, phenomenon → phenomena, criterion → criteria.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION", daily: true,
    stem: "Which sentence is correct?",
    options: [
      ["The furniture for the new staff room was delivered on Monday.", "Correct: furniture is uncountable, so it takes a singular verb and has no plural form."],
      ["The furnitures for the new staff room were delivered on Monday.", "Furniture is uncountable: it has no plural form."],
      ["A furniture for the new staff room was delivered on Monday.", "Uncountable nouns do not take a or an: say a piece of furniture."],
      ["Many furnitures for the new staff room were delivered on Monday.", "Furniture is uncountable, so use much furniture or many pieces of furniture."],
    ],
    answer: "A",
    explanation: "**Uncountable nouns** (furniture, equipment, information, advice, luggage, news) have no plural form, take a singular verb and are not used with *a/an*. To count them, use a unit: *a piece of furniture*, *two items of equipment*.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word.",
    template: "Before the examination, our teacher gave us some very useful {{blank:a}}.",
    blanks: [{ id: "a", accepted: ["advice"], choices: ["advice", "advices", "advise", "advises"] }],
    explanation: "*Advice* is an uncountable noun (no plural). *Advise* is the verb: *I advise you to revise early.*",
  });
  b.fib({
    d: 2,
    stem: "Write the plural of each noun in brackets.",
    template: "We bought two {{blank:a}} (knife) and a bag of {{blank:b}} (potato) at Mbare Musika.",
    blanks: [
      { id: "a", accepted: ["knives"], wrong: "knifes" },
      { id: "b", accepted: ["potatoes"], wrong: "potatos" },
    ],
    explanation: "Many nouns ending in *-f* or *-fe* change to *-ves* (knife → knives, leaf → leaves, wife → wives). Some nouns ending in *-o* add *-es* (potato → potatoes, tomato → tomatoes, hero → heroes).",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the feminine form of **nephew**?",
    options: [
      ["niece", "Correct: your brother's or sister's son is your nephew; their daughter is your niece."],
      ["nephewess", "There is no such word."],
      ["aunt", "An aunt is your parent's sister; the masculine is uncle."],
      ["cousin", "Cousin is used for both males and females."],
    ],
    answer: "A",
    explanation: "Gender pairs to know: nephew/niece, uncle/aunt, host/hostess, heir/heiress, bridegroom/bride, bull/cow, cock/hen.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Information* is an uncountable noun, so we say *a piece of information*, not *an information*.",
    answer: true,
    explanation: "True. *Information* has no plural and is not used with *a/an*. Say *some information* or *a piece of information*.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each noun with its type.",
    pairs: [["Harare", "proper noun"], ["team", "collective noun"], ["honesty", "abstract noun"], ["chair", "common (concrete) noun"]],
    explanation: "*Harare* names a particular place (proper, so it has a capital letter); *team* names a group (collective); *honesty* names a quality (abstract); *chair* names an ordinary object you can touch (common, concrete).",
  });
  b.short({
    d: 2,
    stem: "Write the noun formed from the verb **decide** to complete the sentence.\n\n*The committee's ___ was announced on Friday.*",
    accepted: ["decision"],
    wrong: ["deciding", "decide"],
    explanation: "decide → **decision** (the -de becomes -sion, as in divide → division, explode → explosion).",
  });
  b.short({
    d: 2,
    stem: "Write the noun formed from the adjective **proud** to complete the sentence.\n\n*The villagers watched with great ___ as their team lifted the cup.*",
    accepted: ["pride"],
    wrong: ["proudness", "proud"],
    explanation: "proud → **pride**. Not every abstract noun is formed with a suffix: some, like *pride*, *truth* (true) and *width* (wide), change the word itself.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is the correct plural of **mother-in-law**?",
    options: [
      ["mothers-in-law", "Correct: the main noun, mother, takes the plural."],
      ["mother-in-laws", "The plural ending goes on mother, the main noun."],
      ["mothers-in-laws", "Only the main noun becomes plural."],
      ["mother-ins-law", "In is a preposition; it never takes a plural ending."],
    ],
    answer: "A",
    explanation: "In compound nouns joined by hyphens, the most important noun becomes plural: mothers-in-law, sons-in-law, maids-of-honour.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Choose the correct collective noun: *a ___ of bees*.",
    options: [
      ["swarm", "Correct."],
      ["herd", "Herd is used for cattle and other large animals."],
      ["choir", "A choir is a group of singers."],
      ["fleet", "A fleet is a group of ships or vehicles."],
    ],
    answer: "A",
    explanation: "A **swarm** of bees (or locusts); a **choir** of singers; a **fleet** of buses or ships.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which word is **not** a collective noun?",
    options: [
      ["teacher", "Correct: a teacher is one person, a common noun."],
      ["jury", "A jury is a group of people who decide a court case: a collective noun."],
      ["choir", "A choir is a group of singers: a collective noun."],
      ["flock", "A flock is a group of birds or sheep: a collective noun."],
    ],
    answer: "A",
    explanation: "A collective noun names a group as one unit (jury, choir, flock, team, committee, audience). *Teacher* names one person.",
  });
  b.fib({
    d: 3,
    stem: "Write the correct form of the word in brackets. Watch for possessives.",
    template: "The {{blank:a}} (child) books were left in the classroom, but the {{blank:b}} (teacher) bag was taken to the office.",
    blanks: [
      { id: "a", accepted: ["children's"], normalise: ["trim", "collapse_whitespace"], wrong: "childrens" },
      { id: "b", accepted: ["teacher's", "teachers'"], normalise: ["trim", "collapse_whitespace"], wrong: "teachers" },
    ],
    hints: ["Both nouns show possession, so both need an apostrophe.", "Child has an irregular plural. Add 's to a plural that does not end in s."],
    explanation: "The books belong to the children: **children's** (an irregular plural takes *'s*). The bag belongs to a teacher: **teacher's** (one teacher); *teachers'* is also accepted if it belongs to several teachers.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Write the correct form of each word in brackets to complete the passage.",
    template: "The {{blank:a}} (decide) to build a clinic at the business centre brought great {{blank:b}} (happy) to the {{blank:c}} (villager), who had walked long distances for treatment.",
    blanks: [
      { id: "a", accepted: ["decision"], wrong: "deciding" },
      { id: "b", accepted: ["happiness"], wrong: "happy" },
      { id: "c", accepted: ["villagers"], wrong: "villager" },
    ],
    hints: ["After *The* and before *to build* you need a noun.", "After *great* you need a noun; *who had walked* shows that more than one person is meant."],
    explanation: "**decision** (noun from *decide*), **happiness** (abstract noun from *happy*: y → i + -ness) and **villagers** (plural, because *who had walked long distances* refers to many people).",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which sentence uses the noun in bold correctly?",
    options: [
      ["She packed her **luggage** the night before the trip to Kariba.", "Correct: luggage is uncountable and used without a plural."],
      ["She packed her **luggages** the night before the trip to Kariba.", "Luggage has no plural form."],
      ["She packed a **luggage** the night before the trip to Kariba.", "Uncountable nouns are not used with a: say a bag or a piece of luggage."],
      ["She packed her **luggage's** the night before the trip to Kariba.", "An apostrophe shows possession and cannot make a plural."],
    ],
    answer: "A",
    hints: ["Is luggage countable or uncountable?"],
    explanation: "*Luggage* (like *baggage*, *equipment* and *furniture*) is uncountable: no plural, no *a/an*.",
  });
  b.short({
    d: 3,
    stem: "The sentence below contains one error in a noun. Write the noun correctly.\n\n*The two thiefs were caught by the security guards at the bus terminus.*",
    accepted: ["thieves"],
    wrong: ["thiefs", "theives"],
    hints: ["Look at the plural that ends in -fs."],
    explanation: "*Thief* becomes **thieves** (f → ves), like *wolf → wolves* and *shelf → shelves*. Note the spelling: *ie*, not *ei*.",
  });

  b.card("DEFINITION", "What is a **proper noun**?", "The name of a particular person, place, organisation, day or month; it always starts with a capital letter.", "Examples: Chipo, Gweru, ZIMSEC, Monday, December.");
  b.card("DEFINITION", "What is a **collective noun**?", "A noun that names a group of people, animals or things as one unit.", "Team, committee, jury, herd, flock, swarm, fleet, bunch.");
  b.card("DEFINITION", "What is an **abstract noun**?", "A noun that names an idea, quality, feeling or state that cannot be seen or touched.", "Kindness, freedom, fear, honesty, childhood, wisdom.");
  b.card("CONCEPT", "Countable vs uncountable nouns", "Countable nouns have plurals and take a/an (a book, two books). Uncountable nouns have no plural and no a/an (advice, furniture, information, luggage, equipment, news).", "Count uncountables with a unit: a piece of advice, an item of news.");
  b.card("FACT", "Plurals of nouns ending in -f or -fe", "Many change to -ves: knife → knives, leaf → leaves, wife → wives, thief → thieves, half → halves.", "Exceptions add -s: roofs, chiefs, cliffs, beliefs.");
  b.card("FACT", "Irregular plurals to learn", "child → children, man → men, woman → women, tooth → teeth, foot → feet, mouse → mice, ox → oxen.", "Some stay the same: sheep, deer, fish (usually), aircraft.");
  b.card("FACT", "Greek and Latin plurals", "crisis → crises, analysis → analyses, phenomenon → phenomena, criterion → criteria, cactus → cacti, medium → media.", undefined);
  b.card("FACT", "Plural of compound nouns", "The main noun takes the plural: mothers-in-law, passers-by, commanders-in-chief.", undefined);
  b.card("FACT", "Nouns that are always plural", "scissors, trousers, spectacles, pliers, clothes, police, cattle, people: they take plural verbs.", "The police are investigating; my trousers are torn.");
  b.card("VOCABULARY", "Masculine and feminine pairs", "nephew/niece, uncle/aunt, host/hostess, heir/heiress, bridegroom/bride, widower/widow, bull/cow, cock/hen.", undefined);
});

concept("eng.grammar.pronouns", { file: "grammar/pronouns", keyPrefix: "grammar.pronouns" }, (b) => {
  b.mcq({
    d: 1, skill: "UNDERSTANDING",
    stem: "Choose the correct pronoun.\n\n*Farai and ___ walked to school together.*",
    options: [
      ["I", "Correct: Farai and I are the subject of the verb walked, so the subject pronoun I is needed."],
      ["me", "Me is an object pronoun; test it: you would not say 'me walked to school'."],
      ["myself", "Myself is reflexive and needs I or me earlier in the same sentence."],
      ["mine", "Mine is a possessive pronoun meaning 'belonging to me'."],
    ],
    answer: "A",
    explanation: "Remove the other person to test: *I walked to school* (not *me walked*). So: **Farai and I** walked to school.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct pronoun.\n\n*The headmaster congratulated Chipo and ___ on our results.*",
    options: [
      ["me", "Correct: Chipo and me are the object of congratulated."],
      ["I", "I is a subject pronoun; test it: 'The headmaster congratulated I' is wrong."],
      ["myself", "Myself is only used when the subject is also I."],
      ["mine", "Mine means 'belonging to me'."],
    ],
    answer: "A",
    explanation: "After a verb (or a preposition) use the object form: *congratulated **me***, so *congratulated Chipo and **me***.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct pronoun.\n\n*Between you and ___, I do not think the plan will work.*",
    options: [
      ["me", "Correct: between is a preposition, so it takes the object form."],
      ["I", "After a preposition such as between, use the object pronoun."],
      ["myself", "Myself is reflexive; there is no I earlier in this phrase for it to refer back to."],
      ["mine", "Mine is possessive."],
    ],
    answer: "A",
    explanation: "Prepositions (*between, for, with, to, from*) are followed by object pronouns: *between you and **me***, *for him and **me***.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Choose the correct reflexive pronoun.\n\n*The girls prepared the whole meal by ___.*",
    options: [
      ["themselves", "Correct: the reflexive pronoun for they is themselves."],
      ["theirselves", "Theirselves is not standard English."],
      ["themself", "Themself is not used for a plural group such as the girls."],
      ["them", "By them would mean someone else did it for them; the sense here is 'without help'."],
    ],
    answer: "A",
    explanation: "Reflexive pronouns: myself, yourself, himself, herself, itself, ourselves, yourselves, **themselves**. *By themselves* means without help.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct relative pronoun.\n\n*This is the farmer ___ tractor was stolen last week.*",
    options: [
      ["whose", "Correct: whose shows possession (the farmer's tractor)."],
      ["who", "Who replaces a person as subject; here we need the possessive form."],
      ["whom", "Whom is an object form for people."],
      ["which", "Which is used for things and animals, and does not show possession here."],
    ],
    answer: "A",
    explanation: "**Whose** is the possessive relative pronoun: *the farmer **whose** tractor was stolen* = the farmer; his tractor was stolen.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the most suitable pronoun for formal writing.\n\n*The candidate ___ the examiners interviewed was from Gweru.*",
    options: [
      ["whom", "Correct: the candidate is the object of interviewed (the examiners interviewed him or her)."],
      ["whose", "Whose shows possession."],
      ["which", "Which is used for things, not people."],
      ["what", "What cannot be used as a relative pronoun after a noun."],
    ],
    answer: "A",
    hints: ["Who did the interviewing? Who was interviewed?", "Use whom when the person is the object of the verb in the relative clause."],
    explanation: "Inside the clause the examiners are the subject and the candidate is the object, so formal English uses **whom**. (In everyday speech *who* or *that* is common, but *whom* is correct in formal writing.)",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct word.",
    template: "The dog wagged {{blank:a}} tail when it saw the children.",
    blanks: [{ id: "a", accepted: ["its"], choices: ["its", "it's", "its'", "their"] }],
    explanation: "**Its** (no apostrophe) is the possessive. *It's* means *it is* or *it has*. *Its'* does not exist.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct possessive pronoun.\n\n*That bag is not yours; it is ___.*",
    options: [
      ["hers", "Correct: possessive pronouns never take an apostrophe."],
      ["her's", "Possessive pronouns (hers, yours, ours, theirs, its) have no apostrophe."],
      ["she's", "She's means she is or she has."],
      ["her", "Her must be followed by a noun (her bag); on its own use hers."],
    ],
    answer: "A",
    explanation: "Possessive pronouns stand alone and have **no apostrophe**: mine, yours, his, **hers**, ours, theirs.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "*Myself* can be the subject of a sentence, as in *Myself and Tendai went to the market.*",
    answer: false,
    explanation: "False. A reflexive pronoun cannot be the subject. Write *Tendai and I went to the market.*",
  });
  b.short({
    d: 2,
    stem: "Rewrite the sentence, replacing the words in bold with **one** pronoun.\n\n***Nyasha and Tafadzwa** cleaned the classroom.*",
    accepted: ["They cleaned the classroom.", "They cleaned the classroom"],
    wrong: ["Them cleaned the classroom.", "Their cleaned the classroom."],
    explanation: "*Nyasha and Tafadzwa* are the subject, so use the subject pronoun **they**: *They cleaned the classroom.*",
  });
  b.fib({
    d: 2,
    stem: "Complete each sentence with a suitable relative pronoun.",
    template: "The book {{blank:a}} I borrowed from the library is overdue. The nurse {{blank:b}} treated me was very kind.",
    blanks: [
      { id: "a", accepted: ["that", "which"], wrong: "who" },
      { id: "b", accepted: ["who", "that"], wrong: "which" },
    ],
    explanation: "Use **which** or **that** for things (the book) and **who** or **that** for people (the nurse).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct pronoun.\n\n*___ students organised the clean-up campaign at the clinic.*",
    options: [
      ["We", "Correct: the phrase is the subject of organised; test it by removing students: We organised..."],
      ["Us", "Us is an object pronoun: 'Us organised' is wrong."],
      ["Our", "Our students would mean students who belong to us, which changes the meaning."],
      ["Ours", "Ours stands alone and cannot come before a noun."],
    ],
    answer: "A",
    hints: ["Remove the word students and read the sentence again."],
    explanation: "Remove the noun to test: *We organised* (not *Us organised*). So **We students** organised the campaign. After a verb or preposition it would be *us students* (*The head thanked us students*).",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Choose the correct pronoun.\n\n*Thandeka is taller than ___ am.*",
    options: [
      ["I", "Correct: the full clause is 'than I am', and I is the subject of am."],
      ["me", "'Me am' is wrong: the pronoun is the subject of am."],
      ["myself", "A reflexive pronoun cannot be the subject of am."],
      ["mine", "Mine is possessive."],
    ],
    answer: "A",
    hints: ["Which pronoun can be the subject of the verb am?"],
    explanation: "After *than*, complete the clause in your head: *taller than **I am***. Because *am* follows, the subject pronoun **I** is required.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each pronoun with its type.",
    pairs: [["who", "relative"], ["herself", "reflexive"], ["theirs", "possessive"], ["those", "demonstrative"], ["somebody", "indefinite"]],
    explanation: "Relative pronouns introduce a clause (who, whom, whose, which, that); reflexive pronouns end in -self/-selves; possessive pronouns show ownership (mine, theirs); demonstratives point (this, that, these, those); indefinite pronouns do not name a particular person (somebody, anyone, everything).",
  });
  b.short({
    d: 3,
    stem: "One pronoun in this sentence is wrong. Write the pronoun that should replace it.\n\n*The prize was shared between Rudo and I.*",
    accepted: ["me"],
    wrong: ["I", "myself"],
    hints: ["Between is a preposition."],
    explanation: "After the preposition *between*, use the object pronoun: *between Rudo and **me***.",
  });
  b.fib({
    d: 3, examStyle: true,
    stem: "Choose the correct pronoun for each gap.",
    template: "Mrs Moyo, {{blank:a}} son plays for the national team, told {{blank:b}} that {{blank:c}} had travelled to Bulawayo to watch him.",
    blanks: [
      { id: "a", accepted: ["whose"], choices: ["who", "whom", "whose", "which"] },
      { id: "b", accepted: ["us"], choices: ["we", "us", "our", "ourselves"] },
      { id: "c", accepted: ["she"], choices: ["she", "her", "herself", "hers"] },
    ],
    hints: ["The son belongs to Mrs Moyo.", "She told someone: that person is the object of told."],
    explanation: "**whose** shows possession (her son); **us** is the object of *told*; **she** is the subject of *had travelled*.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Choose the correct demonstrative.\n\n*___ mangoes over there on the far tree are ripe.*",
    options: [
      ["Those", "Correct: those is plural and points to things far away."],
      ["These", "These points to things near the speaker; over there shows they are far."],
      ["That", "That is singular; mangoes is plural."],
      ["This", "This is singular and points to something near."],
    ],
    answer: "A",
    explanation: "this/these = near (singular/plural); that/those = far (singular/plural). *Mangoes* is plural and *over there* shows distance, so **Those**.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "In which sentence is the pronoun **unclear**, so that the reader cannot tell who is meant?",
    options: [
      ["Tendai told Farai that he had passed the examination.", "Correct: he could mean Tendai or Farai, so the reference is ambiguous."],
      ["Tendai told Farai that she had passed the examination.", "If Farai and Tendai are both boys, she clearly refers to someone else already mentioned."],
      ["Tendai told his sister that she had passed the examination.", "She can only mean his sister."],
      ["Tendai told Farai, 'I have passed the examination.'", "Direct speech makes it clear that Tendai passed."],
    ],
    answer: "A",
    hints: ["Could the pronoun refer to more than one person in the sentence?"],
    explanation: "A pronoun must refer clearly to one noun. In *Tendai told Farai that he had passed*, *he* could be either boy. Fix it by naming the person or using direct speech.",
  });

  b.card("DEFINITION", "What is a **pronoun**?", "A word used instead of a noun, to avoid repeating it.", "Rudo is late because **she** missed the bus.");
  b.card("FACT", "Subject and object pronouns", "Subject: I, you, he, she, it, we, they. Object: me, you, him, her, it, us, them.", "Test pairs by removing the other person: 'Farai and I went' (I went); 'He thanked Farai and me' (thanked me).");
  b.card("FACT", "Possessive pronouns", "mine, yours, his, hers, its, ours, theirs: never with an apostrophe.", "It's = it is / it has.");
  b.card("FACT", "Reflexive pronouns", "myself, yourself, himself, herself, itself, ourselves, yourselves, themselves.", "Used when the subject and object are the same: She hurt herself. Never 'theirselves' or 'hisself'.");
  b.card("FACT", "Relative pronouns", "who (people, subject), whom (people, object), whose (possession), which (things), that (people or things).", "The nurse who helped me; the book which/that I read; the farmer whose tractor was stolen.");
  b.card("CONCEPT", "Who or whom?", "Use who where he/she would fit; use whom where him/her would fit.", "Who called? (He called.) To whom did you write? (I wrote to him.)");
  b.card("FACT", "Demonstrative pronouns", "this and these (near), that and those (far).", "These books here; those trees over there.");
  b.card("FACT", "Pronouns after prepositions", "Use object pronouns after prepositions: between you and me, for him and me, with us.", "'Between you and I' is a common error.");
});
