// Slice ERD: reading skills — reference sources and the parts of a book (ZIMSEC only, so tagged ZIM).
import { concept, P, ZIM } from "../lib.mjs";

const BOOK = `Study the extracts from a school textbook, *Growing Food at Home and School* (a fictional title), and answer the questions.

**Contents**

| Chapter | Title | Page |
| --- | --- | --- |
| | Preface | v |
| 1 | Planning a garden | 1 |
| 2 | Soil and compost | 14 |
| 3 | Water: wells, tanks and drip lines | 29 |
| 4 | Vegetables for every season | 41 |
| 5 | Keeping pests away without poison | 63 |
| 6 | Selling what you grow | 78 |
| | Appendix A: Planting calendar | 91 |
| | Appendix B: Sample garden budget | 94 |
| | Glossary | 97 |
| | Index | 101 |

**From the index**

> **compost**, making 18–22; using in seedbeds 45 · **covo** 47, 52 · **drip irrigation** 33–36 · **mulch** 24, 38 · **pests**: aphids 66; cutworms 68–69; *see also* companion planting · **tomatoes**, staking 50; diseases 71`;

concept("eng.reading.referencing", { file: "reading/referencing", keyPrefix: "reading.referencing", applies: ZIM }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Where would you look to find a **synonym** for *happy*?",
    options: [
      ["a thesaurus", "Correct: a thesaurus lists synonyms and antonyms."],
      ["an atlas", "An atlas contains maps."],
      ["an encyclopaedia", "An encyclopaedia gives topic articles, not lists of synonyms."],
      ["a library catalogue", "A catalogue lists the books a library holds."],
    ],
    answer: "A",
    explanation: "A **thesaurus** groups words of similar and opposite meaning: *happy* → jubilant, elated, delighted, content.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which part of a book is an **alphabetical list of topics with the pages on which they appear**?",
    options: [
      ["the index", "Correct: the index is alphabetical and gives page numbers."],
      ["the contents", "The contents lists chapters in the order they appear."],
      ["the glossary", "The glossary explains meanings of words."],
      ["the preface", "The preface explains the book's purpose."],
    ],
    answer: "A",
    explanation: "**Index** (back, alphabetical, page numbers) vs **contents** (front, in book order, chapters).",
  });
  b.match({
    d: 2, skill: "RECALL",
    stem: "Match each part of a book with its purpose.",
    pairs: [
      ["contents", "lists chapters in order with page numbers"],
      ["glossary", "explains difficult or specialised words"],
      ["appendix", "gives extra material such as tables or data"],
      ["preface", "explains why the book was written"],
      ["bibliography", "lists the sources the author used"],
    ],
    explanation: "Front of the book: contents, preface. Back: appendices, glossary, bibliography, index.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each need with the best source.",
    pairs: [
      ["how to pronounce *hyperbole*", "dictionary"],
      ["a general account of the Mutapa state", "encyclopaedia"],
      ["where Lake Kariba is", "atlas"],
      ["whether the library has books on beekeeping", "library catalogue"],
    ],
    explanation: "Dictionary = words; encyclopaedia = topic overviews; atlas = maps; catalogue = what the library holds.",
  });
  b.fib({
    d: 2, skill: "APPLICATION",
    stem: "A dictionary page has the **guide words** *mango* and *market*. Decide whether each word would be on that page.",
    template: "*manner*: {{blank:a}}. *maize*: {{blank:b}}. *map*: {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["on the page"], choices: ["on the page", "on an earlier page", "on a later page"] },
      { id: "b", accepted: ["on an earlier page"], choices: ["on the page", "on an earlier page", "on a later page"] },
      { id: "c", accepted: ["on the page"], choices: ["on the page", "on an earlier page", "on a later page"] },
    ],
    hints: ["Compare letter by letter: m-a-n-g, m-a-r-k."],
    explanation: "Guide words show the first and last words on a page. *manner* (m-a-n-n) and *map* (m-a-p) fall between *mango* and *market*; *maize* (m-a-i) comes before *mango* (m-a-n), so it is on an earlier page.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "True or false: a **glossary** tells you on which pages a word appears.",
    answer: false,
    explanation: "False. A glossary gives the **meanings** of words. The **index** gives the pages.",
  });
  b.mcq({
    d: 3, skill: "EVALUATION",
    stem: "Which website is likely to be the **most reliable** source on malaria prevention?",
    options: [
      ["A health ministry page, dated last year, citing research", "Correct: known author, recent, sources given."],
      ["An anonymous page selling a tea that cures malaria in a day", "No author, a product to sell, and an unsupported claim."],
      ["A social media post shared thousands of times last week", "Popularity does not prove accuracy."],
      ["A personal blog with no date and no named author", "Unknown author and date make it hard to trust."],
    ],
    answer: "A",
    hints: ["Ask: who wrote it, why, when, and can it be checked?"],
    explanation: "Judge reliability by **who** (qualified, named), **why** (to inform, not to sell), **when** (current), **checkability** (sources) and **presentation**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which of these is **plagiarism**?",
    options: [
      ["Copying a paragraph from a website into your project as your own", "Correct: presenting someone else's words as yours."],
      ["Quoting a short sentence in quotation marks and naming the source", "This acknowledges the source correctly."],
      ["Making notes in your own words and listing your sources", "This is responsible use of sources."],
      ["Asking a librarian to help you find a reliable book", "Getting help to find sources is not plagiarism."],
    ],
    answer: "A",
    explanation: "**Plagiarism** = presenting others' words or ideas as your own. Use quotation marks, acknowledge sources and take notes in your own words.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Which part of a book, found on the back of the title page, gives the date of publication, the edition and the ISBN? (Give the name of the page.)",
    accepted: ["imprint page", "copyright page", "imprint", "the imprint page", "the copyright page", "imprint or copyright page"],
    model: "imprint page",
    wrong: ["index"],
    explanation: "The **imprint** (or copyright) page is on the back of the title page.",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 720,
    stem: BOOK,
    parts: [
      P.short({
        label: "(a)",
        stem: "On which page does the chapter on selling produce begin?",
        accepted: ["78", "page 78", "p 78", "p78"],
        model: "78",
        wrong: ["63"],
        explanation: "Chapter 6, *Selling what you grow*, begins on page 78.",
      }),
      P.short({
        label: "(b)",
        stem: "Which pages would you read to learn how to **make** compost? Give the page range.",
        accepted: ["18-22", "18–22", "18 to 22", "pages 18-22", "pages 18 to 22", "1822", "18 22"],
        model: "18-22",
        normalise: ["trim", "lowercase", "collapse_whitespace"],
        wrong: ["45"],
        explanation: "Index: *compost, making 18–22*. Page 45 is about using compost in seedbeds.",
      }),
      P.mcq({
        label: "(c)",
        stem: "Where would you find what the word *mulch* means?",
        options: [
          ["the glossary on page 97", "Correct: the glossary explains specialised words."],
          ["the preface on page v", "The preface explains the book's purpose."],
          ["Appendix B on page 94", "Appendix B is a sample budget."],
          ["the contents at the front", "The contents lists chapters only."],
        ],
        answer: "A",
        explanation: "Meanings → **glossary**. The index would only tell you the pages (24, 38) where mulch is mentioned.",
      }),
      P.short({
        label: "(d)",
        stem: "Which appendix would help you decide when to plant vegetables? Give its letter.",
        accepted: ["A", "Appendix A", "appendix a"],
        model: "A",
        wrong: ["B"],
        explanation: "Appendix A is the *Planting calendar*.",
      }),
      P.short({
        label: "(e)",
        stem: "On which page is information about **cutworms** first given?",
        accepted: ["68", "page 68", "p 68"],
        model: "68",
        wrong: ["66"],
        explanation: "Index: *pests: … cutworms 68–69*. Page 66 is about aphids.",
      }),
      P.mcq({
        label: "(f)",
        stem: "In the index, what does *see also companion planting* tell you?",
        options: [
          ["Related information is listed under another heading", "Correct: a cross-reference to a connected entry."],
          ["Companion planting is a type of insect pest", "It is a growing method, not a pest."],
          ["The book does not cover companion planting", "The cross-reference shows it is covered elsewhere."],
          ["You should read the whole of the book from the start", "A cross-reference points to one other entry."],
        ],
        answer: "A",
        explanation: "*See also* is a **cross-reference**: more on the topic appears under another index entry.",
      }),
      P.manual({
        label: "(g)",
        marks: 2,
        stem: "A friend wants to know whether the book is suitable for a school garden club. Name **two** parts of the book she should look at first, and say why.",
        points: [
          "The preface (or contents): to see who the book is for / why it was written / what it covers",
          "A second part with a reason, e.g. the contents to see the topics; Appendix B to see costs; the index for specific topics",
        ],
        modelAnswer: "The preface, to see who the book is written for, and the contents, to check that it covers the topics the club needs.",
      }),
      P.short({
        label: "(h)",
        stem: "Which chapter number deals with water supply?",
        accepted: ["3", "three", "chapter 3", "chapter three"],
        model: "3",
        wrong: ["2"],
        explanation: "Chapter 3: *Water: wells, tanks and drip lines*.",
      }),
    ],
    hints: ["Contents = chapters in book order; index = topics in alphabetical order with exact pages."],
    explanation: "Use the **contents** for chapters and the overall plan, the **index** for exact pages on specific topics, the **glossary** for meanings and the **appendices** for extra material.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "You want every page in a History textbook that mentions **Great Zimbabwe**. Which part should you use?",
    options: [
      ["the index, because it lists every page for each topic", "Correct: the index gives all page references alphabetically."],
      ["the contents, because it lists every topic in the book", "The contents lists chapters, not every mention of a topic."],
      ["the glossary, because it explains historical terms", "A glossary explains words but does not list pages."],
      ["the preface, because it summarises the whole book", "The preface explains purpose, not page references."],
    ],
    answer: "A",
    hints: ["Which part gives page numbers for specific names?"],
    explanation: "For every mention of a specific name or topic, use the **index**.",
  });
  b.manualShort({
    d: 3, skill: "EVALUATION",
    stem: "A website claims: *Drinking lemon water every morning will make you pass all your examinations.* Give **two** reasons why a careful reader should doubt this source.",
    marks: 2,
    points: [
      "The claim is exaggerated / unsupported / gives no evidence or research",
      "Another warning sign: e.g. likely selling something, unknown author, cannot be checked against reliable sources",
    ],
    modelAnswer: "The claim is wildly exaggerated and offers no evidence, and the site does not say who wrote it or whether experts agree.",
    hints: ["Use the reliability questions: who, why, when, can it be checked?"],
    explanation: "Extraordinary claims without evidence, unknown authors and commercial motives are all signs of an unreliable source.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What does a **library catalogue** help you do?",
    options: [
      ["find which books the library holds and where they are shelved", "Correct: search by title, author or subject."],
      ["find the meaning and pronunciation of a word", "That is a dictionary."],
      ["find synonyms for words you use too often", "That is a thesaurus."],
      ["find maps of countries and the names of all their capital cities", "That is an atlas."],
    ],
    answer: "A",
    explanation: "A **catalogue** (card or computer) lists a library's holdings by title, author and subject, with shelf locations.",
  });
  b.tf({
    d: 3, skill: "UNDERSTANDING",
    stem: "True or false: the first result in an internet search is always the most reliable source.",
    answer: false,
    hints: ["What decides the order of search results?"],
    explanation: "False. Search results are ordered by many factors, including popularity and advertising. Always check who wrote a page, why and when.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION",
    stem: "You are preparing a project on **water conservation in Zimbabwe**. Name **three** different reference sources you would use and explain what each would give you.",
    marks: 3,
    points: [
      "First source with a fitting purpose (e.g. encyclopaedia: general background on water and rainfall)",
      "Second, different source with a fitting purpose (e.g. atlas: maps of rivers and dams; newspaper/journal: recent reports)",
      "Third, different source with a fitting purpose (e.g. reliable website such as a government or university page; library catalogue to find books)",
    ],
    modelAnswer: "An encyclopaedia for background on rainfall and water use; an atlas to locate major dams and rivers; a recent newspaper or a government website for current reports on water shortages.",
    hints: ["Think about background, maps, and current information."],
    explanation: "Match each source to a need: overview (encyclopaedia), location (atlas), recent information (newspaper, journal, reliable website), finding books (catalogue).",
  });

  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In a dictionary entry, what does the abbreviation **adj.** tell you?",
    options: [
      ["the word's part of speech: an adjective", "Correct: n. = noun, v. = verb, adj. = adjective, adv. = adverb."],
      ["how the word is pronounced", "Pronunciation is shown separately, often with symbols."],
      ["the language the word came from", "That is the word's origin (etymology)."],
      ["how many meanings the word has", "Meanings are numbered, not shown by adj."],
    ],
    answer: "A",
    explanation: "Dictionary entries give the **part of speech**: *n.* (noun), *v.* (verb), *adj.* (adjective), *adv.* (adverb).",
  });

  b.card("DEFINITION", "Reference source","A book, database or website consulted for particular information rather than read from cover to cover.", undefined);
  b.card("FACT", "Dictionary vs thesaurus", "Dictionary: meaning, spelling, pronunciation, part of speech. Thesaurus: synonyms and antonyms.", undefined);
  b.card("FACT", "Encyclopaedia, atlas, catalogue", "Encyclopaedia: topic overviews. Atlas: maps. Catalogue: books the library holds and where.", undefined);
  b.card("DEFINITION", "Guide words", "The words at the top of a dictionary page showing its first and last entries.", undefined);
  b.card("FACT", "Contents vs index", "Contents: front, chapters in book order. Index: back, alphabetical topics with page numbers.", undefined);
  b.card("FACT", "Glossary and appendix", "Glossary: meanings of specialised words. Appendix: extra material such as tables, data or documents.", undefined);
  b.card("FACT", "Preface and imprint page", "Preface: why the book was written and how to use it. Imprint page: publication date, edition, ISBN.", undefined);
  b.card("CONCEPT", "Five reliability questions", "Who wrote it? Why? When? Can it be checked? How is it presented?", undefined);
  b.card("DEFINITION", "Plagiarism", "Presenting someone else's words or ideas as your own without acknowledgement.", "Use quotation marks and name your sources.");
});
