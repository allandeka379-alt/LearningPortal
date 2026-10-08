// Builds content/concepts/english-language-o.json and the three English Language syllabus files:
//   content/syllabi/zimsec/o-level/english-language/2015-2022.json
//   content/syllabi/cambridge/igcse/english-language/2027-2029.json          (First Language English 0500)
//   content/syllabi/cambridge/igcse/english-second-language/2027-2029.json   (English as a Second Language 0510)
// Sources (local only, not in git): .scratch/english/sources/zimsec-english-language-syllabus.pdf (+ zimsec-el.txt),
// 0500-2027-2029.pdf (+ .txt), 0510-2027-2029.pdf (+ .txt).
// Run from the repo root: node .scratch/english/build-syllabi.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

// ---------------------------------------------------------------------------------------------------------------------
// Concept registry (one concept ≈ one lesson's worth of learning). Shared by all three syllabi.
const CONCEPTS = [
  // Reading
  ["eng.reading.explicit-meaning", "Finding explicit information: recall, skimming and scanning", "Locating and retrieving facts and details that a text states directly; skimming for the gist and scanning for particular words, names, numbers and dates; answering recall questions briefly and accurately."],
  ["eng.reading.inference", "Inference: implied meanings and attitudes", "Working out what a text suggests but does not state: a character's feelings, a writer's purpose, reasons and consequences, using clues in the wording and supporting the inference with evidence."],
  ["eng.reading.vocabulary-in-context", "Meanings of words and phrases in context", "Working out the meaning of unfamiliar or familiar words and phrases from the surrounding text, choosing the meaning that fits the context, and giving a one-word or short-phrase equivalent."],
  ["eng.reading.own-words", "Answering in your own words (paraphrasing)", "Re-expressing ideas from a passage in your own words without changing the meaning: replacing key words with synonyms, restructuring sentences, and avoiding lifting."],
  ["eng.reading.writers-craft", "Writers' effects: language, imagery and structure", "How writers achieve effects and influence readers: word choice and connotation, imagery and figurative language, sound, sentence length and structure; explaining the effect of a chosen word or phrase in context."],
  ["eng.reading.tone-attitude", "Tone, mood and the writer's attitude", "Identifying the tone of a text or speaker (for example ironic, nostalgic, critical, urgent), the mood it creates and the writer's attitude to the subject, with evidence from the wording."],
  ["eng.reading.fact-opinion-argument", "Facts, opinions, arguments and bias", "Distinguishing facts from opinions; following the development of an argument; telling main points from examples and qualifying details; recognising persuasive techniques, bias and stereotyping; evaluating how convincing a text is."],
  ["eng.reading.text-cohesion", "Following ideas: reference words and linking devices", "How ideas in a text connect: what pronouns and other reference words refer to, and what linking words signal (addition, contrast, cause and effect, time, example)."],
  ["eng.reading.note-making", "Making notes from a text", "Selecting the details a task asks for and recording them as brief notes under headings, without unnecessary words; completing a set of notes from an article."],
  ["eng.reading.multiple-matching", "Reading several texts for specific information", "Reading a set of short texts or sections (for example four or five people's accounts) and deciding which one contains a given piece of information or opinion, including paraphrased ideas."],
  ["eng.reading.extended-response", "Extended response to reading", "Writing in role (as a character or participant) in a letter, report, journal, speech, interview or article, using, developing and interpreting ideas from a reading text."],
  ["eng.reading.fiction", "Reading fiction: character, setting, plot, theme and style", "Reading stories and novels for enjoyment and analysis: major and minor characters, setting in place and time, plot and conflict, themes and the writer's style; writing about a book you have read."],
  ["eng.reading.referencing", "Reference sources and the parts of a book", "Using dictionaries, thesauruses, encyclopaedias, catalogues, journals and the internet responsibly; the parts of a book (title page, contents, preface, index, glossary, appendices) and their purposes."],
  // Summary
  ["eng.summary.selecting-points", "Selecting points for a summary", "Reading the summary question carefully, identifying only the points that answer it, and separating relevant points from examples, repetition and irrelevant detail."],
  ["eng.summary.writing", "Writing a summary in continuous prose", "Turning selected points into a concise paragraph of continuous prose in your own words, within the word limit, linking the points logically."],
  // Composition
  ["eng.composition.planning-paragraphing", "Planning and paragraphing a composition", "Analysing a composition title, planning, writing an introduction, unified paragraphs with topic sentences, linking devices for coherence, and a conclusion; varying sentence types."],
  ["eng.composition.narrative", "Narrative writing", "Writing a story: a clear plot with conflict and resolution, a consistent point of view, convincing characters and dialogue, pace, suspense, flashback and an effective ending."],
  ["eng.composition.descriptive", "Descriptive writing", "Describing a person, place, scene, event or process vividly: sensory detail, precise vocabulary, imagery, a clear structure (spatial, chronological or zoom) and atmosphere."],
  ["eng.composition.argumentative", "Argumentative and persuasive writing", "Taking and defending a position on an issue: a clear stance, reasons supported by evidence and examples, counter-arguments and rebuttal, persuasive devices and a firm conclusion."],
  ["eng.composition.discursive", "Discursive writing", "Discussing an issue from several sides in a balanced way: presenting different viewpoints fairly, weighing them and reaching a reasoned conclusion."],
  ["eng.composition.informative", "Informative and expository writing", "Explaining a topic or process clearly to inform the reader: accurate information, logical order, clear explanation and a neutral tone."],
  // Functional and guided writing
  ["eng.functional.register", "Register, audience and purpose", "Choosing language suited to the audience, purpose and situation: formal, informal and semi-formal registers, tone, and the conventions of different text types."],
  ["eng.functional.formal-letter", "Formal letters", "The layout and language of formal letters (application, complaint, request, enquiry, letter to the editor): addresses, date, salutation, subject line, paragraphs with a clear purpose, polite firm tone, correct closing."],
  ["eng.functional.informal-letter", "Informal letters and emails", "Writing friendly letters and emails to friends and relatives: appropriate greetings and endings, a conversational but correct style, and covering every point the task asks for."],
  ["eng.functional.report", "Reports", "Writing reports for a head, a club or an organisation: a title and recipient, purpose, findings under headings, and conclusions or recommendations in an objective style."],
  ["eng.functional.speech", "Speeches", "Writing a speech for a given occasion and audience: an engaging opening, addressing the audience, clear points, rhetorical devices and a memorable ending."],
  ["eng.functional.article", "Articles", "Writing articles for a school magazine or newspaper: an eye-catching headline, an engaging introduction, informative paragraphs, a lively but appropriate tone and a conclusion."],
  ["eng.functional.memo", "Memoranda (memos)", "The format and style of an internal memo: To, From, Date, Subject, a brief purpose, numbered points or short paragraphs and a clear action required."],
  ["eng.functional.cv-forms", "Curriculum vitae and forms", "Compiling a curriculum vitae (personal details, education, skills, experience, referees) and completing forms accurately following the instructions."],
  ["eng.functional.review", "Reviews", "Writing a review of a film, book, event, restaurant or place for a general audience: describing it and giving and justifying opinions and a recommendation."],
  ["eng.functional.journal-interview", "Journal entries and interviews", "Writing a journal (diary) entry that reflects on events and feelings in the first person, and writing an interview as questions and answers in role."],
  ["eng.functional.directed-writing", "Directed writing from texts", "Using, developing and evaluating the ideas in one or two texts to write a discursive, argumentative or persuasive speech, letter, article or report for a given audience."],
  ["eng.functional.notes-and-data", "Writing from notes, graphs and statistics", "Amplifying notes (pegs) into full sentences and paragraphs, and turning information in tables, graphs, statistics and pictures into continuous writing in a given format."],
  // Grammar (supporting language structures)
  ["eng.grammar.nouns", "Nouns", "Types of nouns (common, proper, collective, abstract, countable and uncountable), regular and irregular plurals, gender nouns, and noun formation."],
  ["eng.grammar.pronouns", "Pronouns", "Personal, possessive, reflexive, relative, demonstrative and indefinite pronouns; choosing the correct case (I/me, who/whom) and making pronouns agree with what they refer to."],
  ["eng.grammar.tenses", "Verb tenses and the sequence of tenses", "Forming and using the present, past and future tenses in their simple, continuous, perfect and perfect continuous forms; irregular verbs; keeping tenses consistent (sequence of tenses)."],
  ["eng.grammar.subject-verb-agreement", "Subject-verb agreement", "Making verbs agree with their subjects, including collective nouns, 'either/neither... or/nor', 'each/every', indefinite pronouns, and subjects separated from their verbs."],
  ["eng.grammar.conditionals", "Conditional sentences", "Zero, first, second and third conditionals and mixed conditionals; unless, provided that, if only and I wish."],
  ["eng.grammar.modals", "Auxiliary and modal verbs", "The auxiliaries be, have and do; modal verbs (can, could, may, might, must, shall, should, will, would, ought to, need, dare) for ability, permission, possibility, obligation and advice."],
  ["eng.grammar.phrasal-verbs", "Phrasal verbs", "Verbs combined with particles (give up, put off, look after, break down, carry out): their meanings in context and their formal equivalents."],
  ["eng.grammar.active-passive", "Active and passive voice", "Changing sentences between the active and passive voice in all common tenses and with modals, and choosing the voice that suits the purpose."],
  ["eng.grammar.adjectives", "Adjectives", "Forming adjectives; comparative and superlative forms (regular and irregular); the order of adjectives before a noun; non-gradable adjectives; participial adjectives (bored/boring)."],
  ["eng.grammar.adverbs", "Adverbs and adverbials", "Forming adverbs; adverbs and adverbial phrases of manner, time, place, frequency, degree and reason; adverbial clauses; position of adverbs."],
  ["eng.grammar.articles-determiners", "Articles and determiners", "Using a, an, the and no article; determiners such as some, any, much, many, few, a few, little, a little, each, every, either, neither."],
  ["eng.grammar.prepositions", "Prepositions", "Prepositions of time, place and movement, and fixed combinations of verbs, adjectives and nouns with prepositions (interested in, different from, on account of)."],
  ["eng.grammar.conjunctions", "Conjunctions and discourse markers", "Co-ordinating and subordinating conjunctions; correlative pairs; discourse markers and sentence modifiers (however, therefore, moreover, in spite of) and joining sentences with them."],
  ["eng.grammar.sentence-types", "Sentences, clauses and phrases", "Simple, compound and complex sentences; main and subordinate clauses (noun, adjectival/relative and adverbial); phrases; combining and transforming sentences without changing the meaning."],
  ["eng.grammar.questions-tags", "Questions, question tags, commands and exclamations", "Forming yes/no and wh- questions, indirect questions, question tags, commands and exclamations, with correct word order and punctuation."],
  ["eng.grammar.reported-speech", "Direct and indirect (reported) speech", "Punctuating direct speech, and changing statements, questions and commands into reported speech (tense back-shift and changes to pronouns and time and place words), and back again."],
  ["eng.grammar.punctuation", "Punctuation", "Full stops, capital letters, commas, question and exclamation marks, apostrophes, colons, semicolons, dashes, brackets and quotation marks, and how punctuation changes meaning."],
  // Vocabulary
  ["eng.vocabulary.word-formation", "Word formation: prefixes and suffixes", "Forming words with prefixes and suffixes; forming nouns, adjectives, verbs and adverbs from a root word; using the correct form of a word in a sentence."],
  ["eng.vocabulary.homophones", "Homonyms, homophones, homographs and confusable words", "Words that sound or look alike but differ in meaning (their/there/they're, stationary/stationery, principal/principle, affect/effect, lead/lead) and choosing the right one."],
  ["eng.vocabulary.synonyms-antonyms", "Synonyms and antonyms", "Words with similar and opposite meanings; choosing the most precise synonym for a context; forming opposites with prefixes."],
  ["eng.vocabulary.idioms", "Idioms, proverbs and collocations", "Common English idioms and proverbs and their meanings, and collocations (words that usually go together, such as make a decision, heavy rain, strong tea)."],
  ["eng.vocabulary.spelling", "Spelling", "Spelling rules (i before e, doubling final consonants, dropping silent e, y to i, -ful, plurals) and commonly misspelt words."],
  ["eng.vocabulary.figures-of-speech", "Figures of speech", "Recognising and using simile, metaphor, personification, hyperbole, alliteration, onomatopoeia, irony, oxymoron, euphemism, rhetorical question and repetition, and their effects."],
  // Oral
  ["eng.oral.listening", "Listening skills", "Listening for gist and detail, following directions and instructions, taking notes and messages from talks, announcements and conversations, and recognising speakers' attitudes."],
  ["eng.oral.pronunciation", "Pronunciation, stress and intonation", "English vowel and consonant sounds, diphthongs, silent letters, word stress (including stress that changes a noun into a verb), sentence stress and rising and falling intonation."],
  ["eng.oral.spoken-interaction", "Conversations, telephone calls and interviews", "Polite and appropriate spoken English for greetings, introductions, requests, invitations, apologies, complaints, condolences, telephone calls, conversations and interviews."],
  ["eng.oral.speeches-debates", "Talks, speeches and debates", "Preparing and giving a short talk or speech, impromptu speaking, and debating: structuring points, supporting them, using discourse markers, and responding to others."],
];
const CONCEPT_KEYS = new Set(CONCEPTS.map(([k]) => k));

// ---------------------------------------------------------------------------------------------------------------------
// Node helpers. Objectives are our own paraphrase; codes add .n to the node code.
const node = (kind, key, code, name, { description, covers = [], objectives = [], components, children } = {}) => {
  const n = { key, code, name, kind };
  if (description) n.description = description;
  if (covers.length) n.covers = covers;
  if (objectives.length) n.objectives = objectives.map((text, i) => ({ code: `${code}.${i + 1}`, text }));
  if (components) n.components = components;
  if (children) n.children = children;
  return n;
};
const section = (key, code, name, opts) => node("SECTION", key, code, name, opts);
const topic = (key, code, name, opts) => node("TOPIC", key, code, name, opts);
const sub = (key, code, name, opts) => node("SUBTOPIC", key, code, name, opts);

const GRAMMAR_ALL = [
  "eng.grammar.nouns", "eng.grammar.pronouns", "eng.grammar.tenses", "eng.grammar.subject-verb-agreement", "eng.grammar.conditionals",
  "eng.grammar.modals", "eng.grammar.phrasal-verbs", "eng.grammar.active-passive", "eng.grammar.adjectives", "eng.grammar.adverbs",
  "eng.grammar.articles-determiners", "eng.grammar.prepositions", "eng.grammar.questions-tags", "eng.grammar.reported-speech",
];

// ---------------------------------------------------------------------------------------------------------------------
// ZIMSEC O-Level English Language, Forms 1-4, 2015-2022
const ZIMSEC_TOPICS = [
  section("listening", "7.1", "Listening and observing", {
    description: "Skill 1 in the scope and sequence (Forms 1 to 4): listening comprehension, oral instructions, conversations and purposeful listening.",
    children: [
      topic("listening.comprehension", "7.1.1", "Listening comprehension, instructions and messages", {
        description: "Forms 1 to 4: questions on stories and narrations, note taking, summary, inference and evaluation; directions, announcements, messages, dialogues, interviews, dictation and directed or selective listening.",
        covers: ["eng.oral.listening"],
        objectives: [
          "Listen to stories, broadcasts and narrations and answer recall, inference and evaluation questions on them.",
          "Take notes and summarise what has been heard, and draw a lesson or moral from a story.",
          "Follow a series of spoken directions and instructions and relay messages and announcements accurately.",
          "Take dictation accurately and report back on a talk or presentation.",
        ],
      }),
    ],
  }),
  section("speaking", "7.2", "Speaking and signing", {
    description: "Skill 2 in the scope and sequence: pronunciation, registers, descriptions, debates and speeches.",
    children: [
      topic("speaking.pronunciation", "7.2.1", "Pronunciation", {
        description: "Forms 1 to 4: vowels, consonant clusters, diphthongs and triphthongs, silent consonants, weak and strong forms, intonation and stress, tone and mood.",
        covers: ["eng.oral.pronunciation"],
        objectives: [
          "Pronounce English vowel and consonant sounds, diphthongs and words with silent letters accurately.",
          "Use word and sentence stress and rising and falling intonation correctly.",
          "Use tone of voice to express emotion and mood.",
        ],
      }),
      topic("speaking.registers", "7.2.2", "Registers and conversations", {
        description: "Forms 1 to 4: introductions, greetings, requests, invitations, apologies and compliments, telephone conversations, gratitude, advice, opinions, complaints, condolences, persuasion and interviews; formal and informal situations.",
        covers: ["eng.oral.spoken-interaction"],
        objectives: [
          "Use polite, appropriate language for greetings, introductions, requests, invitations, apologies, complaints and condolences.",
          "Hold telephone conversations and interviews in formal and informal situations.",
          "Adjust the degree of formality to the listener and the situation.",
        ],
      }),
      topic("speaking.debates-speeches", "7.2.3", "Descriptions, debates and speeches", {
        description: "Forms 1 to 4: describing self, people, scenes, objects, processes and events; debating local, national and international topical issues and cross-cutting themes; prepared and impromptu speeches.",
        covers: ["eng.oral.speeches-debates"],
        objectives: [
          "Describe people, scenes, objects, processes and events clearly in speech.",
          "Present opinions on topical issues and argue for or against a motion, arranging ideas logically with discourse markers.",
          "Plan and deliver prepared speeches and give meaningful impromptu speeches.",
        ],
      }),
    ],
  }),
  section("reading", "7.3", "Reading and signing", {
    description: "Skill 3 in the scope and sequence: intensive reading, extensive reading and referencing.",
    children: [
      topic("reading.intensive", "7.3.1", "Intensive reading", {
        description: "Forms 1 to 4: recall and higher-order questions, skimming and scanning, inference, word meaning, note making, summary, synthesis, paraphrasing and evaluation.",
        children: [
          sub("reading.intensive.recall", "7.3.1.1", "Recall and comprehension questions", {
            description: "Answering recall and comprehension questions; skimming and scanning; paraphrasing.",
            covers: ["eng.reading.explicit-meaning", "eng.reading.own-words"],
            objectives: [
              "Answer recall questions by locating information that a passage states directly.",
              "Skim a text for its general meaning and scan it for specific details.",
              "Paraphrase information from a text in their own words.",
            ],
          }),
          sub("reading.intensive.inference", "7.3.1.2", "Inference, analysis and evaluation", {
            description: "Drawing inferences; following the sequence of events and the development of an argument; how language shows the relationships between ideas; main points and supporting detail; bias and stereotyping.",
            covers: ["eng.reading.inference", "eng.reading.fact-opinion-argument", "eng.reading.text-cohesion"],
            objectives: [
              "Draw inferences about information that a text does not state directly.",
              "Follow the sequence of events in a narrative and the development of an argument or discussion.",
              "Recognise how words and phrases show the relationships between ideas in a text.",
              "Distinguish main ideas from examples and qualifying details, and recognise bias and stereotyping.",
            ],
          }),
          sub("reading.intensive.word-meaning", "7.3.1.3", "Contextual meaning of words and phrases", {
            covers: ["eng.reading.vocabulary-in-context"],
            objectives: ["Work out the meanings of words and phrases from the context in which they are used."],
          }),
          sub("reading.intensive.tone-style", "7.3.1.4", "Tone, mood, style and the writer's attitude", {
            covers: ["eng.reading.tone-attitude", "eng.reading.writers-craft"],
            objectives: [
              "Identify the tone and mood of a text and the writer's attitude to the subject.",
              "Comment on the style of a text and the effect of the writer's choice of words and images.",
            ],
          }),
          sub("reading.intensive.notes", "7.3.1.5", "Note making", {
            covers: ["eng.reading.note-making"],
            objectives: ["Make brief, relevant notes on texts that have been read."],
          }),
          sub("reading.intensive.summary", "7.3.1.6", "Summary writing", {
            covers: ["eng.summary.selecting-points", "eng.summary.writing"],
            objectives: [
              "Select the points in a passage that are relevant to a summary question.",
              "Summarise specific aspects of a text in continuous prose, in their own words and within a word limit.",
            ],
          }),
        ],
      }),
      topic("reading.extensive", "7.3.2", "Extensive reading", {
        description: "Forms 1 to 4: summary, characters and characterisation, setting, plot, themes and style of books read.",
        covers: ["eng.reading.fiction"],
        objectives: [
          "Read a variety of books for knowledge and enjoyment and summarise them.",
          "Describe and compare major and minor characters and describe the setting of a story.",
          "Identify the plot, the themes and the style of a text and the relationships among its themes.",
        ],
      }),
      topic("reading.referencing", "7.3.3", "Referencing", {
        description: "Forms 1 to 4: reference sources, sections of a book, encyclopaedias, journals and the internet.",
        covers: ["eng.reading.referencing"],
        objectives: [
          "Use reference sources such as dictionaries, encyclopaedias, journals and the internet to find information, observing cyber ethics.",
          "Identify the sections of a book and their purposes.",
        ],
      }),
    ],
  }),
  section("writing", "7.4", "Writing and brailing", {
    description: "Skill 4 in the scope and sequence: aspects of composition writing, free compositions and guided compositions.",
    children: [
      topic("writing.aspects", "7.4.1", "Aspects of composition writing", {
        description: "Forms 1 to 4: sentence construction, types of sentences, elements and unity of a paragraph, registers, linking devices and discourse markers, amplification of notes and figurative language.",
        children: [
          sub("writing.aspects.paragraphs", "7.4.1.1", "Sentences, paragraphs and linking devices", {
            covers: ["eng.composition.planning-paragraphing"],
            objectives: [
              "Write a variety of correct sentence types.",
              "Write unified, coherent paragraphs with a clear introduction, body and conclusion.",
              "Link sentences and paragraphs with appropriate discourse markers.",
            ],
          }),
          sub("writing.aspects.registers", "7.4.1.2", "Registers", {
            covers: ["eng.functional.register"],
            objectives: ["Use a register suited to the audience, purpose and situation in letters, speeches, reports and other writing."],
          }),
          sub("writing.aspects.figurative", "7.4.1.3", "Figurative language", {
            covers: ["eng.vocabulary.figures-of-speech"],
            objectives: ["Recognise figures of speech and use figurative language for effect in their own writing."],
          }),
        ],
      }),
      topic("writing.free", "7.4.2", "Free compositions", {
        description: "Forms 1 to 4: narrative, descriptive, informative, argumentative and discursive compositions and creative writing. Examined in Paper 1 Section A.",
        components: ["1"],
        children: [
          sub("writing.free.narrative", "7.4.2.1", "Narrative compositions", {
            covers: ["eng.composition.narrative"],
            objectives: ["Write narrative compositions using techniques such as description, detail, pace, atmosphere, tone and mood, and flashback."],
          }),
          sub("writing.free.descriptive", "7.4.2.2", "Descriptive compositions", {
            covers: ["eng.composition.descriptive"],
            objectives: ["Write detailed descriptions of people, places, scenes, events and processes."],
          }),
          sub("writing.free.informative", "7.4.2.3", "Informative compositions", {
            covers: ["eng.composition.informative"],
            objectives: ["Write informative and expository compositions that explain a subject clearly."],
          }),
          sub("writing.free.argumentative", "7.4.2.4", "Argumentative compositions", {
            covers: ["eng.composition.argumentative"],
            objectives: ["Write persuasive and argumentative compositions that argue logically for a point of view."],
          }),
          sub("writing.free.discursive", "7.4.2.5", "Discursive compositions", {
            covers: ["eng.composition.discursive"],
            objectives: ["Write discursive compositions that consider different sides of an issue."],
          }),
        ],
      }),
      topic("writing.guided", "7.4.3", "Guided compositions", {
        description: "Forms 1 to 4: letters, reports, speeches, memos, articles and curricula vitae; forms; guided composition techniques (register, correct sentences, amplification, format, paragraphing). Examined in Paper 1 Section B.",
        components: ["1"],
        children: [
          sub("writing.guided.letters", "7.4.3.1", "Letters", {
            covers: ["eng.functional.formal-letter", "eng.functional.informal-letter"],
            objectives: ["Write formal and informal letters in the correct format and register."],
          }),
          sub("writing.guided.memos", "7.4.3.2", "Memos", {
            covers: ["eng.functional.memo"],
            objectives: ["Write memoranda in the correct format."],
          }),
          sub("writing.guided.reports", "7.4.3.3", "Reports", {
            covers: ["eng.functional.report"],
            objectives: ["Write reports in the correct format and register."],
          }),
          sub("writing.guided.speeches", "7.4.3.4", "Speeches", {
            covers: ["eng.functional.speech"],
            objectives: ["Write speeches for given occasions and audiences."],
          }),
          sub("writing.guided.articles", "7.4.3.5", "Articles", {
            covers: ["eng.functional.article"],
            objectives: ["Write articles for magazines and newspapers."],
          }),
          sub("writing.guided.cv-forms", "7.4.3.6", "Curriculum vitae and forms", {
            covers: ["eng.functional.cv-forms"],
            objectives: ["Compile a curriculum vitae and complete forms following the instructions given."],
          }),
          sub("writing.guided.amplification", "7.4.3.7", "Amplifying notes and data", {
            covers: ["eng.functional.notes-and-data"],
            objectives: ["Amplify notes (pegs) and write from information given as notes, text, graphs, statistical data or pictures."],
          }),
        ],
      }),
    ],
  }),
  section("structures", "7.5", "Supporting language structures", {
    description: "Topic 5, taught in context from Form 1 to Form 4 across all skills. Examined in Paper 2 Section B in the context of the comprehension passage.",
    children: [
      topic("structures.nouns", "7.5.1", "Nouns", {
        description: "Types of nouns, plural forms, gender, opposites, noun formation, prefixes and suffixes.",
        covers: ["eng.grammar.nouns"],
        objectives: ["Identify types of nouns and use plural and gender forms correctly."],
      }),
      topic("structures.verbs", "7.5.2", "Verbs", {
        description: "Types of tenses, subject-verb agreement, sequence of tenses, auxiliaries and modals, phrasal verbs, active and passive forms.",
        children: [
          sub("structures.verbs.tenses", "7.5.2.1", "Tenses and the sequence of tenses", {
            covers: ["eng.grammar.tenses", "eng.grammar.conditionals"],
            objectives: ["Form and use the tenses correctly and keep the sequence of tenses consistent, including in conditional sentences."],
          }),
          sub("structures.verbs.agreement", "7.5.2.2", "Subject-verb agreement", {
            covers: ["eng.grammar.subject-verb-agreement"],
            objectives: ["Make verbs agree with their subjects."],
          }),
          sub("structures.verbs.modals", "7.5.2.3", "Auxiliaries and modals", {
            covers: ["eng.grammar.modals"],
            objectives: ["Use auxiliary and modal verbs correctly."],
          }),
          sub("structures.verbs.phrasal", "7.5.2.4", "Phrasal verbs", {
            covers: ["eng.grammar.phrasal-verbs"],
            objectives: ["Use phrasal verbs correctly in context."],
          }),
          sub("structures.verbs.voice", "7.5.2.5", "Active and passive forms", {
            covers: ["eng.grammar.active-passive"],
            objectives: ["Change sentences from the active to the passive form and back."],
          }),
        ],
      }),
      topic("structures.pronouns", "7.5.3", "Pronouns", {
        description: "Personal, relative, possessive and reflexive pronouns.",
        covers: ["eng.grammar.pronouns"],
        objectives: ["Use personal, relative, possessive and reflexive pronouns correctly."],
      }),
      topic("structures.adjectives", "7.5.4", "Adjectives", {
        description: "Formation, comparatives and superlatives, opposites, prefixes and suffixes, order when more than one follow each other, non-gradable adjectives.",
        covers: ["eng.grammar.adjectives"],
        objectives: ["Form adjectives, use comparatives and superlatives, and order several adjectives correctly."],
      }),
      topic("structures.adverbs", "7.5.5", "Adverbs", {
        description: "Formation; adverbials of manner, time, place and reason; adverbial phrases and clauses.",
        covers: ["eng.grammar.adverbs"],
        objectives: ["Form adverbs and use adverbials of manner, time, place and reason, and adverbial phrases and clauses."],
      }),
      topic("structures.spelling", "7.5.6", "Spelling and word formation", {
        description: "Consonant-vowel combinations, spelling rules, prefixes and suffixes, derivative words, noun formation, homonyms, homophones and homographs.",
        children: [
          sub("structures.spelling.word-formation", "7.5.6.1", "Prefixes, suffixes and word formation", {
            covers: ["eng.vocabulary.word-formation"],
            objectives: ["Form derivative words with prefixes and suffixes and use the correct word form in a sentence."],
          }),
          sub("structures.spelling.homophones", "7.5.6.2", "Homonyms, homophones and homographs", {
            covers: ["eng.vocabulary.homophones"],
            objectives: ["Distinguish homonyms, homophones and homographs and use them correctly."],
          }),
          sub("structures.spelling.rules", "7.5.6.3", "Spelling rules", {
            covers: ["eng.vocabulary.spelling"],
            objectives: ["Apply spelling rules and spell commonly used words correctly."],
          }),
          sub("structures.spelling.vocabulary", "7.5.6.4", "Opposites, synonyms and idioms", {
            covers: ["eng.vocabulary.synonyms-antonyms", "eng.vocabulary.idioms"],
            objectives: ["Use synonyms, opposites and idioms appropriate to the subject matter."],
          }),
        ],
      }),
      topic("structures.sentences", "7.5.7", "Sentence construction", {
        description: "Simple, compound and complex sentences; conjunctions, phrases and clauses; punctuation; articles, determiners and prepositions; questions, question tags, commands and exclamations; discourse markers and sentence modifiers.",
        children: [
          sub("structures.sentences.types", "7.5.7.1", "Simple, compound and complex sentences", {
            covers: ["eng.grammar.sentence-types"],
            objectives: ["Construct simple, compound and complex sentences and identify phrases and clauses."],
          }),
          sub("structures.sentences.conjunctions", "7.5.7.2", "Conjunctions, discourse markers and sentence modifiers", {
            covers: ["eng.grammar.conjunctions"],
            objectives: ["Join ideas with conjunctions, discourse markers and sentence modifiers."],
          }),
          sub("structures.sentences.determiners", "7.5.7.3", "Articles and determiners", {
            covers: ["eng.grammar.articles-determiners"],
            objectives: ["Use articles and determiners correctly."],
          }),
          sub("structures.sentences.prepositions", "7.5.7.4", "Prepositions", {
            covers: ["eng.grammar.prepositions"],
            objectives: ["Use prepositions correctly."],
          }),
          sub("structures.sentences.punctuation", "7.5.7.5", "Punctuation and meaning", {
            covers: ["eng.grammar.punctuation"],
            objectives: ["Punctuate sentences correctly and explain how punctuation affects meaning."],
          }),
          sub("structures.sentences.questions", "7.5.7.6", "Questions, question tags, commands and exclamations", {
            covers: ["eng.grammar.questions-tags"],
            objectives: ["Form questions, question tags, commands and exclamations correctly."],
          }),
        ],
      }),
      topic("structures.speech", "7.5.8", "Direct and indirect speech", {
        description: "Punctuation and switching between direct and indirect speech.",
        covers: ["eng.grammar.reported-speech"],
        objectives: ["Punctuate direct speech and change direct speech into indirect speech and back."],
      }),
    ],
  }),
];

const zimsec = {
  board: "zimsec",
  qualification: "o-level",
  subject: "english-language",
  versionLabel: "2015-2022",
  family: "english-language-o",
  title: "ZIMSEC O-Level English Language",
  code: null,
  effectiveFrom: "2018-01-01",
  effectiveTo: null,
  publishAs: "CURRENT",
  officialDocument: {
    title: "English Language Syllabus, Forms 1 - 4, 2015 - 2022 (Ministry of Primary and Secondary Education, Curriculum Development and Technical Services), examined by ZIMSEC at O Level",
    url: "https://www.mopsemashwest.gov.zw/files/English%20Language%20Syllabus.pdf",
    publisher: "Ministry of Primary and Secondary Education (Curriculum Development and Technical Services) / Zimbabwe School Examinations Council (ZIMSEC)",
  },
  sourceNote: "Section headings and numbers (7.1 to 7.5) and the aspects and sub-topics under them are transcribed from the scope and sequence (7.0) of the Ministry's English Language Syllabus Forms 1 - 4 (2015 - 2022); the competency matrix (8.0) supplied the content of each aspect. Topic and sub-topic codes below the section numbers (7.1.1, 7.3.1.1, ...) and objective codes are ours, not the board's. Learning-objective statements are our own paraphrase; no syllabus text is reproduced.",
  notes: [
    "Source (read 2026-10-08): the Mashonaland West provincial education office's copy of the Ministry document (http://www.mopsemashwest.gov.zw/files/English%20Language%20Syllabus.pdf, linked from its O-Level syllabus page; the site's https certificate has expired), read through a text rendering. The document is dated 2015 and covers Forms 1 to 4. The text rendering of the scope-and-sequence and competency-matrix tables scrambles some cells, so absence of an item is less certain than its presence. Check every heading and objective against a clean copy from ZIMSEC and record the exact document URL.",
    "Subject code: not printed in the syllabus document. ZIMSEC O-Level English Language is commonly cited as 1122; confirm it (code left null).",
    "Version dates: assumed first examined in November 2018 (effectiveFrom 2018-01-01), as for the other 2015-2022 files. Under the Heritage-Based Curriculum (2024-2030) new syllabi were issued; confirm which syllabus the November 2026 and later O-Level English Language examinations use, set effectiveTo, and create a new version file when a new syllabus replaces this one.",
    "Assessment (9.0) as read: continuous assessment 30% (speaking, listening, reading, writing and a project, Forms 1 to 4) and a summative examination 70%: Paper 1 Composition (1 hour 30 minutes; Section A, 30 marks, one composition from seven topics that may be narrative, descriptive, informative, argumentative or discursive; Section B, 20 marks, one compulsory guided composition from notes, text, graphs, statistical data or pictures: a letter, speech, report, article or memorandum) and Paper 2 Comprehension, Summary and Supporting Language Structures (2 hours; Section A, 40 marks, a prose passage with comprehension questions and a summary question; Section B, 10 marks, questions on language structures set in the context of the passage). The assessment model weights compositions 35% and comprehension with language structures 35% of the whole subject, so the components carry no weightingPercent. The split of the 40 Section A marks between comprehension and summary is not stated.",
    "Paper 2 specification grid as read: simple recall 12%, comprehension and application 80%, analysis, synthesis and evaluation 8%.",
    "Listening, speaking and the project are assessed only in continuous assessment. The platform has no audio, so the listening content is limited to strategies and practice from written transcripts; speaking content covers preparation, conventions and pronunciation knowledge.",
    "The document lists the topics (6.2) as oral work, language structures, comprehension, composition, summary and registers; this tree follows the more detailed scope and sequence (skills 1 to 4 and topic 5) instead, with summary under intensive reading and registers under both speaking and writing.",
  ],
  components: [
    { code: "1", name: "Paper 1: Composition", kind: "WRITTEN", description: "Section A (30 marks): one composition from a choice of seven topics (narrative, descriptive, informative, argumentative or discursive). Section B (20 marks): one compulsory guided composition (letter, speech, report, article or memo) based on notes, text, graphs, statistics or pictures.", durationMinutes: 90, maxMarks: 50 },
    { code: "2", name: "Paper 2: Comprehension, summary and supporting language structures", kind: "WRITTEN", description: "Section A (40 marks): comprehension questions and a summary question on a prose passage. Section B (10 marks): language-structure questions set in the context of the passage.", durationMinutes: 120, maxMarks: 50 },
  ],
  topics: ZIMSEC_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE First Language English 0500, 2027-2029
const C0500_TOPICS = [
  topic("reading", "1", "Reading", {
    description: "AO1 Reading: tested in Paper 1 (80% of its marks) and in Paper 2 Section A and Component 3 (20%). Texts from the twentieth and twenty-first centuries, fiction and non-fiction, including discursive essays, reviews and articles.",
    children: [
      sub("reading.meanings", "1.1", "Explicit and implicit meanings", {
        covers: ["eng.reading.explicit-meaning", "eng.reading.inference", "eng.reading.vocabulary-in-context", "eng.reading.own-words", "eng.reading.text-cohesion"],
        objectives: [
          "Show understanding of what a text states explicitly, and of the words and phrases within it (R1).",
          "Show understanding of implicit meanings and attitudes (R2).",
          "Explain ideas from a text in their own words.",
        ],
      }),
      sub("reading.analysis", "1.2", "Analysing and evaluating facts, ideas and opinions", {
        covers: ["eng.reading.fact-opinion-argument", "eng.reading.tone-attitude"],
        objectives: [
          "Analyse, evaluate and develop facts, ideas and opinions, supporting points with evidence from the text (R3).",
          "Recognise how writers influence readers through facts, ideas, perspectives, opinions and bias.",
        ],
      }),
      sub("reading.effects", "1.3", "How writers achieve effects", {
        covers: ["eng.reading.writers-craft", "eng.vocabulary.figures-of-speech"],
        objectives: [
          "Show understanding of how writers achieve effects and influence readers (R4).",
          "Recognise and respond to linguistic devices, figurative language and imagery, explaining the effect of chosen words and phrases.",
        ],
      }),
      sub("reading.summary", "1.4", "Selecting information: summary", {
        covers: ["eng.summary.selecting-points", "eng.summary.writing", "eng.reading.note-making"],
        objectives: [
          "Select and use information for a specific purpose (R5).",
          "Write a selective summary in continuous prose and in their own words, within a word limit.",
        ],
        components: ["1"],
      }),
      sub("reading.extended", "1.5", "Extended response to reading", {
        covers: ["eng.reading.extended-response"],
        objectives: ["Use, develop and interpret ideas from a text in an extended response written in role as a letter, report, journal, speech, interview or article."],
        components: ["1"],
      }),
      sub("reading.texts", "1.6", "Reading fiction and non-fiction", {
        covers: ["eng.reading.fiction"],
        objectives: ["Read a range of literary and non-literary texts and discuss characters, setting, plot, themes and style."],
      }),
    ],
  }),
  topic("writing", "2", "Writing", {
    description: "AO2 Writing: tested in Paper 2 or Component 3 (80% of their marks) and in Paper 1 (20%). Descriptive, narrative, discursive, argumentative and persuasive writing; letters, reports, articles, journals, speeches, interviews and summaries.",
    children: [
      sub("writing.directed", "2.1", "Directed writing", {
        covers: ["eng.functional.directed-writing", "eng.functional.notes-and-data"],
        objectives: [
          "Use, develop and evaluate information from one or two texts to write a discursive, argumentative or persuasive speech, letter, article or report.",
          "Organise and structure facts, ideas and opinions for deliberate effect (W2).",
        ],
        components: ["2"],
      }),
      sub("writing.text-types", "2.2", "Letters, reports, articles, speeches, journals and interviews", {
        covers: ["eng.functional.formal-letter", "eng.functional.informal-letter", "eng.functional.report", "eng.functional.article", "eng.functional.speech", "eng.functional.journal-interview"],
        objectives: ["Write in the conventions of letters, reports, articles, speeches, journals and interviews for a given audience and purpose."],
      }),
      sub("writing.descriptive", "2.3", "Descriptive writing", {
        covers: ["eng.composition.descriptive"],
        objectives: ["Express what is thought, felt and imagined in descriptive compositions (W1)."],
        components: ["2", "3"],
      }),
      sub("writing.narrative", "2.4", "Narrative writing", {
        covers: ["eng.composition.narrative"],
        objectives: ["Write narrative compositions that are well structured and engage the reader."],
        components: ["2", "3"],
      }),
      sub("writing.argument", "2.5", "Discursive, argumentative and persuasive writing", {
        covers: ["eng.composition.argumentative", "eng.composition.discursive"],
        objectives: ["Write discursive, argumentative and persuasive texts that develop a line of reasoning."],
      }),
      sub("writing.audience", "2.6", "Audience, purpose, structure and register", {
        covers: ["eng.functional.register", "eng.composition.planning-paragraphing"],
        objectives: [
          "Use language appropriate to purpose and engage the audience (W4).",
          "Plan and paragraph writing so that it is coherent and well organised.",
        ],
      }),
      sub("writing.vocabulary", "2.7", "Vocabulary and sentence structures", {
        covers: ["eng.grammar.sentence-types", "eng.grammar.conjunctions", "eng.vocabulary.word-formation", "eng.vocabulary.synonyms-antonyms", "eng.vocabulary.idioms", "eng.vocabulary.homophones"],
        objectives: ["Use a range of vocabulary and sentence structures appropriate to the context (W3)."],
      }),
      sub("writing.accuracy", "2.8", "Spelling, punctuation and grammar", {
        covers: ["eng.vocabulary.spelling", "eng.grammar.punctuation", ...GRAMMAR_ALL],
        objectives: ["Make accurate use of spelling, punctuation and grammar (W5)."],
      }),
    ],
  }),
  topic("speaking", "3", "Speaking and listening", {
    description: "AO3 Speaking and Listening: the optional Component 4 test (individual talk and conversation), separately endorsed with grades 1 to 5.",
    components: ["4"],
    children: [
      sub("speaking.talk", "3.1", "Individual talk", {
        covers: ["eng.oral.speeches-debates", "eng.oral.pronunciation"],
        objectives: [
          "Articulate experience and present facts, ideas and opinions for deliberate effect in a prepared talk (SL1, SL2).",
          "Communicate clearly, purposefully and fluently in a register appropriate to the context (SL3, SL4).",
        ],
      }),
      sub("speaking.conversation", "3.2", "Conversation", {
        covers: ["eng.oral.spoken-interaction", "eng.oral.listening"],
        objectives: ["Listen and respond appropriately in conversation, developing ideas and responding to questions and prompts (SL5)."],
      }),
    ],
  }),
];

const c0500 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "english-language",
  versionLabel: "2027-2029",
  family: "english-language-o",
  title: "Cambridge IGCSE First Language English (0500)",
  code: "0500",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE First Language English 0500 syllabus for 2027, 2028 and 2029",
    url: "https://www.cambridgeinternational.org/Images/718783-2027-2029-syllabus.pdf",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "The syllabus describes its content as skills under Reading, Writing and Speaking and Listening rather than numbered topics. The three topics follow those headings; the sub-topics group the listed skills and the paper tasks in section 4 (Details of the assessment). Topic codes and objective codes are ours; references such as (R1) and (W3) name the syllabus's assessment objectives. Objective statements are our own paraphrase.",
  notes: [
    "Assessment overview as read (2027-2029 syllabus): all candidates take Paper 1 Reading (2 hours, 80 marks, 50%: Question 1 comprehension of Text A, 20 marks; Question 2 summary of Text B, 2(a) a selective summary of no more than 120 words and 2(b) a short answer on attitudes and opinions, 20 marks; Question 3 short-answer questions and a language task of about 200-250 words on Text C, 20 marks; Question 4 an extended response to Text C of about 250-300 words as a letter, report, journal, speech, interview or article, 20 marks) and either Paper 2 Directed Writing and Composition (2 hours, 80 marks, 50%: Section A directed writing based on one or two texts of 550-650 words, 1(a) 5 marks and 1(b) a 250-350 word speech, letter, article or report, 35 marks; Section B one composition of about 350-450 words from four titles, two descriptive and two narrative, 40 marks) or Component 3 Coursework Portfolio (80 marks, 50%, three assignments). Component 4 Speaking and Listening (about 10-12 minutes, 40 marks) is optional and separately endorsed.",
    "This version is examined from 2027. A student sitting the examination in 2026 is examined on the 2024-2026 syllabus, which is not in the repository; the 2027-2029 version is published as the current version because new students now will sit 2027 or later. Check the 2027-2029 changes listed in the syllabus (the Paper 1 marking criteria and Paper 2 Question 1(b) reading marks changed).",
    "The platform cannot run the coursework portfolio or the speaking and listening test; lessons and practice cover the skills they assess, and the mocks simulate Papers 1 and 2 only.",
  ],
  components: [
    { code: "1", name: "Paper 1: Reading", kind: "WRITTEN", description: "Four compulsory questions on three reading texts (about 1400 words in total): comprehension, summary, short answers and a language task, and an extended response.", durationMinutes: 120, maxMarks: 80, weightingPercent: 50 },
    { code: "2", name: "Paper 2: Directed Writing and Composition", kind: "WRITTEN", description: "Section A: directed writing based on one or two texts (40 marks). Section B: one descriptive or narrative composition from a choice of four titles (40 marks).", durationMinutes: 120, maxMarks: 80, weightingPercent: 50 },
    { code: "3", name: "Component 3: Coursework Portfolio", kind: "COURSEWORK", description: "Alternative to Paper 2: three extended writing assignments, internally assessed and externally moderated.", maxMarks: 80, weightingPercent: 50 },
    { code: "4", name: "Component 4: Speaking and Listening Test", kind: "ORAL", description: "Optional: an individual talk and a conversation, separately endorsed (grades 1 to 5).", durationMinutes: 12, maxMarks: 40 },
  ],
  topics: C0500_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Cambridge IGCSE English as a Second Language (Speaking Endorsement) 0510, 2027-2029
const C0510_TOPICS = [
  topic("reading", "1", "Reading", {
    description: "AO1 Reading (35% of the qualification), tested in Component 1 exercises 1 to 4: articles, blogs, reviews, web pages, leaflets, notices and instructions on topics of contemporary interest.",
    components: ["1"],
    children: [
      sub("reading.factual", "1.1", "Factual information, ideas and arguments", {
        covers: ["eng.reading.explicit-meaning", "eng.reading.multiple-matching", "eng.reading.fact-opinion-argument"],
        objectives: [
          "Identify and understand specific factual information in a range of texts (R1).",
          "Identify and understand ideas and arguments in short and longer texts.",
        ],
      }),
      sub("reading.connections", "1.2", "Ideas, opinions and attitudes and the connections between them", {
        covers: ["eng.reading.text-cohesion", "eng.reading.tone-attitude"],
        objectives: [
          "Understand the connections between ideas, opinions and attitudes, including pronoun reference and linking words (R2).",
          "Recognise a writer's opinions and attitudes.",
        ],
      }),
      sub("reading.implied", "1.3", "What is implied but not directly stated", {
        covers: ["eng.reading.inference", "eng.reading.vocabulary-in-context"],
        objectives: [
          "Understand implied meaning, such as the purpose of a text or the writer's general opinion (R4).",
          "Deduce the meaning of an unfamiliar word or phrase from the information around it.",
        ],
      }),
      sub("reading.selecting", "1.4", "Selecting details for a specific purpose", {
        covers: ["eng.reading.note-making"],
        objectives: [
          "Identify and select details for a specific purpose, such as completing notes (R3).",
          "Use skimming, scanning and careful reading as the task requires.",
        ],
      }),
    ],
  }),
  topic("writing", "2", "Writing", {
    description: "AO2 Writing (35% of the qualification), tested in Component 1 exercises 5 and 6: an informal email and a more formal article, report, essay or review, each of 120-160 words.",
    components: ["1"],
    children: [
      sub("writing.communicating", "2.1", "Communicating information, ideas and opinions", {
        covers: ["eng.composition.argumentative", "eng.composition.discursive", "eng.composition.informative"],
        objectives: ["Communicate information, ideas and opinions clearly and with expansion (W1)."],
      }),
      sub("writing.organising", "2.2", "Organising ideas with linking devices", {
        covers: ["eng.composition.planning-paragraphing", "eng.grammar.conjunctions", "eng.grammar.sentence-types"],
        objectives: ["Organise ideas into coherent text with paragraphs and a range of linking devices (W2)."],
      }),
      sub("writing.grammar", "2.3", "Grammatical structures, punctuation and spelling", {
        covers: [...GRAMMAR_ALL, "eng.grammar.punctuation", "eng.vocabulary.spelling"],
        objectives: ["Use a range of appropriate grammatical structures accurately, with correct punctuation and spelling (W3)."],
      }),
      sub("writing.vocabulary", "2.4", "Vocabulary: words, phrasal verbs, collocations and idioms", {
        covers: ["eng.vocabulary.word-formation", "eng.vocabulary.synonyms-antonyms", "eng.vocabulary.idioms", "eng.vocabulary.homophones"],
        objectives: ["Use a range of appropriate vocabulary, including set phrases, collocations and idioms, and avoid repetition by using synonyms (W3)."],
      }),
      sub("writing.register", "2.5", "Register, style and format", {
        covers: ["eng.functional.register", "eng.functional.informal-letter", "eng.functional.formal-letter", "eng.functional.report", "eng.functional.review", "eng.functional.article"],
        objectives: ["Use a register, style and format appropriate to the purpose and audience: informal emails and more formal articles, reports, essays and reviews (W4)."],
      }),
    ],
  }),
  topic("listening", "3", "Listening", {
    description: "AO3 Listening (30% of the qualification), tested in Component 2 (about 50 minutes, 40 marks): five exercises on short and longer recordings.",
    components: ["2"],
    covers: ["eng.oral.listening"],
    objectives: [
      "Understand specific information in a range of spoken contexts (L1).",
      "Understand speakers' ideas, opinions and attitudes and the connections between them (L2, L3).",
      "Understand what is implied but not directly stated (L4).",
    ],
  }),
  topic("speaking", "4", "Speaking", {
    description: "AO4 Speaking, Component 3 (about 10-15 minutes, 40 marks): an interview, a short talk and a discussion, separately endorsed with grades 1 to 5.",
    components: ["3"],
    children: [
      sub("speaking.interaction", "4.1", "Interviews and conversations", {
        covers: ["eng.oral.spoken-interaction"],
        objectives: ["Engage in interviews and conversations, initiating, responding, asking for and giving clarification and taking turns (S3)."],
      }),
      sub("speaking.talk", "4.2", "Short talks and discussions", {
        covers: ["eng.oral.speeches-debates"],
        objectives: ["Communicate a range of ideas, facts and opinions with expansion in a short talk and discussion (S1, S2)."],
      }),
      sub("speaking.pronunciation", "4.3", "Pronunciation and intonation", {
        covers: ["eng.oral.pronunciation"],
        objectives: ["Show control of pronunciation, word and sentence stress and intonation (S4)."],
      }),
    ],
  }),
];

const c0510 = {
  board: "cambridge",
  qualification: "igcse",
  subject: "english-second-language",
  versionLabel: "2027-2029",
  family: "english-language-o",
  title: "Cambridge IGCSE English as a Second Language (Speaking Endorsement) (0510)",
  code: "0510",
  effectiveFrom: "2027-01-01",
  effectiveTo: "2029-12-31",
  publishAs: "CURRENT",
  officialDocument: {
    title: "Cambridge IGCSE English as a Second Language (Speaking Endorsement) 0510 syllabus for 2027, 2028 and 2029",
    url: "https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-igcse-english-as-a-second-language-0510/",
    publisher: "Cambridge University Press & Assessment (Cambridge International Education)",
  },
  sourceNote: "The four topics are the syllabus's skill headings (Reading, Writing, Listening, Speaking) in its subject content, and the sub-topics group the content statements listed under each. Topic codes and objective codes are ours; references such as (R1) and (W3) name the syllabus's assessment objectives. Objective statements are our own paraphrase.",
  notes: [
    "Assessment overview as read (2027-2029 syllabus): Component 1 Reading and Writing (2 hours, 60 marks, 70%): Exercise 1 short answers on a 400-450 word text (8 marks); Exercise 2 multiple matching, nine questions on one text in up to five sections or up to five short texts, about 600-650 words (9 marks); Exercise 3 note completion from a 400-500 word text (7 marks); Exercise 4 six three-option multiple-choice questions on a 550-600 word text (6 marks); Exercise 5 an informal email of 120-160 words (15 marks: 6 content, 9 language); Exercise 6 a more formal article, report, essay or review of 120-160 words (15 marks). Component 2 Listening (about 50 minutes, 40 marks, 30%): five exercises, multiple-choice style. Component 3 Speaking (about 10-15 minutes, 40 marks): interview, short talk and discussion, separately endorsed.",
    "This version is examined from 2027; a 2026 candidate is examined on the previous syllabus, which is not in the repository. It is published as the current version because new students now will sit 2027 or later.",
    "Platform limits: the question engine requires at least four options for a multiple-choice question, so Exercise 4-style practice uses four options instead of the paper's three. There is no audio, so the Listening component cannot be simulated: the listening content covers strategies and practice from written transcripts, and the mock covers Component 1 only.",
  ],
  components: [
    { code: "1", name: "Component 1: Reading and Writing", kind: "WRITTEN", description: "Six exercises: four reading (short answers, multiple matching, note completion, multiple choice) and two writing (an informal email and a more formal piece, each 120-160 words).", durationMinutes: 120, maxMarks: 60, weightingPercent: 70 },
    { code: "2", name: "Component 2: Listening", kind: "LISTENING", description: "Five exercises on short and longer recordings, multiple-choice style.", durationMinutes: 50, maxMarks: 40, weightingPercent: 30 },
    { code: "3", name: "Component 3: Speaking", kind: "ORAL", description: "An interview, a short talk and a discussion, separately endorsed (grades 1 to 5).", durationMinutes: 15, maxMarks: 40 },
  ],
  topics: C0510_TOPICS,
};

// ---------------------------------------------------------------------------------------------------------------------
// Checks: every covered concept exists, each concept is covered at most once per syllabus, and report what each
// syllabus leaves out.
for (const s of [zimsec, c0500, c0510]) {
  const seen = new Map();
  const codes = new Set();
  const walk = (nodes) => {
    for (const n of nodes) {
      for (const c of n.covers ?? []) {
        if (!CONCEPT_KEYS.has(c)) throw new Error(`${s.subject}/${s.versionLabel}: unknown concept ${c} on ${n.key}`);
        if (seen.has(c)) throw new Error(`${s.subject}/${s.versionLabel}: ${c} covered on ${seen.get(c)} and ${n.key}`);
        seen.set(c, n.key);
      }
      for (const o of n.objectives ?? []) {
        if (codes.has(o.code)) throw new Error(`${s.subject}: duplicate objective code ${o.code}`);
        codes.add(o.code);
      }
      walk(n.children ?? []);
    }
  };
  walk(s.topics);
  const missing = [...CONCEPT_KEYS].filter((k) => !seen.has(k));
  console.log(`${s.board}/${s.qualification}/${s.subject}/${s.versionLabel}: ${seen.size} concepts covered, ${codes.size} objectives; not covered: ${missing.join(", ") || "none"}`);
}

const registry = {
  family: "english-language-o",
  name: "English Language (O-Level / IGCSE)",
  level: "O",
  prefix: "eng",
  subjects: ["zimsec/o-level/english-language", "cambridge/igcse/english-language", "cambridge/igcse/english-second-language"],
  concepts: CONCEPTS.map(([key, name, description]) => ({ key, name, description })),
};

const write = (rel, data) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log("wrote", rel);
};
write("content/concepts/english-language-o.json", registry);
write("content/syllabi/zimsec/o-level/english-language/2015-2022.json", zimsec);
write("content/syllabi/cambridge/igcse/english-language/2027-2029.json", c0500);
write("content/syllabi/cambridge/igcse/english-second-language/2027-2029.json", c0510);
