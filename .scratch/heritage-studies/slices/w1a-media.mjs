// W1a: the media in socialisation and its responsible use (her.socialisation.media).
import { concept, P, source, levels } from "../lib.mjs";

concept("her.socialisation.media", { file: "socialisation/media", keyPrefix: "socialisation.media" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of these is an example of **print** media?",
    options: [
      ["A magazine", "Correct: magazines, newspapers, books and posters are print media."],
      ["A radio broadcast", "Radio is electronic (broadcast) media."],
      ["A television drama", "Television is electronic (broadcast) media."],
      ["A video-sharing site", "Video-sharing sites are social or digital media."],
    ],
    answer: "A",
    explanation: "Print media are printed on paper: newspapers, magazines, books, newsletters and posters.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why is radio especially important as a medium in rural Zimbabwe?",
    options: [
      ["It reaches remote areas in local languages and listeners need not read", "Correct: radio needs no reading skills and can work on batteries."],
      ["It is the only medium that is allowed to broadcast news in the country", "Newspapers, television and online outlets also carry news."],
      ["It shows moving pictures that help people understand the news better", "Radio carries sound only; television shows moving pictures."],
      ["It allows every listener to publish their own content to the nation", "That describes social media, not radio."],
    ],
    answer: "A",
    explanation: "Radio reaches remote areas, works without mains electricity, needs no reading skills and broadcasts in many languages.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A television advert shows a famous footballer drinking a sugary fizzy drink. Which effect of the media does this **mainly** show?",
    options: [
      ["Advertising creating wants through a role model", "Correct: the advert uses a role model to make people want the product."],
      ["Educating viewers about healthy eating", "The advert promotes a sugary product rather than teaching healthy eating."],
      ["Informing viewers about a national emergency", "No emergency information is given."],
      ["Promoting an indigenous language", "Nothing in the advert concerns language."],
    ],
    answer: "A",
    explanation: "Adverts often use famous people as role models to create wants, sometimes for unhealthy products.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "What is a **stereotype**?",
    options: [
      ["A fixed, oversimplified idea about a group of people", "Correct: for example, that only men can be engineers."],
      ["A sound system used to play music at gatherings", "That is a stereo, not a stereotype."],
      ["A true report that has been checked by several sources", "A stereotype is a generalisation, not a checked report."],
      ["A rule that sets the age rating of films", "Age ratings are classifications, not stereotypes."],
    ],
    answer: "A",
    explanation: "Stereotypes are oversimplified ideas about groups, such as gender, ethnic or disability stereotypes. The media can spread or challenge them.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai receives a forwarded message with no author claiming that a common food causes a disease. What should he do **first**?",
    options: [
      ["Check whether a reliable source such as the Ministry of Health reports it", "Correct: checking the source is the first step of responsible media use."],
      ["Forward it to all his contacts so that they can be warned in time", "Forwarding unchecked claims can spread false information."],
      ["Stop eating the food immediately and tell all his family to do the same thing", "Acting on an unchecked claim may be unnecessary and harmful."],
      ["Reply to the sender with an angry message about the false claims", "He does not yet know whether it is false; he should check first."],
    ],
    answer: "A",
    hints: ["Who wrote the message? How could he find out whether it is true?"],
    explanation: "Responsible users check the source, the date and other reliable reports before believing or sharing a message.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which is the **best** example of the media helping to preserve indigenous heritage?",
    options: [
      ["A community radio station broadcasting folk tales in Tonga", "Correct: it keeps a language and its oral tradition alive."],
      ["A foreign music channel that is popular with teenagers in Harare", "Foreign music may compete with, rather than preserve, local heritage."],
      ["An online shop advertising imported fashion", "Advertising imported fashion does not preserve indigenous heritage."],
      ["A video game with an age rating of 18", "A video game rating has nothing to do with indigenous heritage."],
    ],
    answer: "A",
    hints: ["Which option involves a local language and oral tradition?"],
    explanation: "Media in local languages and programmes about culture help to preserve heritage; foreign content can weaken it if it replaces local content.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement gives the **most** balanced view of the media as an agent of socialisation?",
    options: [
      ["Their effect depends on what is watched and how critically it is used", "Correct: the same media can educate or harm, depending on content and use."],
      ["They are harmful and young people should never be allowed to use them", "This ignores the educational and informative role of the media."],
      ["They are always educational because programmes are carefully checked", "Not all content is checked; false and harmful content exists."],
      ["They have no effect, because people only believe what their family says", "The media clearly influence dress, speech and opinions."],
    ],
    answer: "A",
    hints: ["Avoid answers that say 'always', 'never' or 'no effect'."],
    explanation: "A balanced view recognises both benefits and dangers and stresses responsible, critical use.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Television and radio are examples of electronic (broadcast) media.",
    answer: true,
    explanation: "True. Radio, television and film are electronic media; newspapers and magazines are print media.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "If a message is shared by many people, it must be true.",
    answer: false,
    explanation: "False. False information often spreads faster than the truth. Check the source, the date and reliable reports.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each media example with the role it mainly plays.",
    pairs: [
      ["A school radio lesson in Mathematics", "Educating"],
      ["A weather warning about a cyclone", "Informing"],
      ["A comedy show on Saturday night", "Entertaining"],
      ["An advert for a new phone", "Advertising (creating wants)"],
    ],
    explanation: "The media inform, educate, entertain and advertise; many programmes do more than one.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "False information shared by someone who believes it is {{blank:a}}. False information spread on purpose to deceive is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["misinformation"], choices: ["misinformation", "disinformation", "advertising", "a stereotype"] },
      { id: "b", accepted: ["disinformation"], choices: ["misinformation", "disinformation", "advertising", "a stereotype"] },
    ],
    hints: ["The difference is whether the person sharing it intends to deceive."],
    explanation: "Misinformation is shared in error; disinformation is spread deliberately to deceive.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "Give the term for the ability to find, question and judge media messages and to share content responsibly.",
    accepted: ["media literacy"],
    wrong: ["socialisation", "advertising"],
    explanation: "**Media literacy** includes checking sources, recognising false information and using media responsibly.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** types of media, one from each group: print, electronic and social media.",
    points: ["Print: e.g. newspaper, magazine, book, poster", "Electronic: e.g. radio, television, film", "Social/digital: e.g. social networking site, messaging group, video-sharing site"],
    modelAnswer: "A newspaper, radio and a social networking site.",
    explanation: "One mark per correct example from each group.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** disadvantages of the media as an agent of socialisation.",
    points: [
      "Identifies e.g. exposure to violent or explicit content",
      "Develops: young people may copy harmful behaviour",
      "Identifies e.g. foreign values / stereotypes / false information",
      "Develops: e.g. weakens respect for indigenous culture, or causes prejudice or panic",
    ],
    modelAnswer: "The media can expose young people to violent or explicit content, which they may copy in their own behaviour. They can also spread foreign values that weaken respect for indigenous culture, for example disrespect towards elders shown as funny in some programmes.",
    hints: ["Name the problem, then explain how it affects behaviour or values."],
    explanation: "Two marks per disadvantage: identify, then develop.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Suggest **two** ways in which parents can help their children use the media responsibly.",
    points: [
      "Suggests e.g. setting time limits / screen-free times",
      "Explains: leaves time for study, sleep, family and exercise",
      "Suggests e.g. watching together and discussing, or choosing age-appropriate content",
      "Explains: children learn to question messages and avoid harmful content",
    ],
    modelAnswer: "Parents can agree time limits, such as no television during homework or after 21:00, so children still have time for study, sleep and family. They can also watch programmes with their children and discuss them, which teaches children to question what they see and to choose age-appropriate content.",
    hints: ["Think of both how much and what children watch."],
    explanation: "Credit realistic suggestions, each explained.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a poster of the kind displayed in a school library, described in words", "The poster shows a phone screen with a message that reads \"SHOCKING NEWS!!! Share before it's deleted!\" Beside it are four boxes: WHO wrote it? WHEN was it written? WHERE else is it reported? WHY was it made? At the bottom: \"Think before you share.\"", { described: true }) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "What is the main message of the poster?",
        options: [
          ["Check messages before believing or sharing them", "Correct: the four questions are checks to make before sharing."],
          ["Delete all news messages as soon as they arrive", "The poster asks readers to check, not to delete everything."],
          ["Share shocking messages quickly before they disappear", "That is what the false message says; the poster warns against it."],
          ["Only read news in printed newspapers", "The poster does not tell readers to avoid digital media."],
        ],
        answer: "A",
        explanation: "The poster teaches media literacy: who, when, where else and why.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** features of the message on the phone that suggest it may be false.",
        points: ["Exaggerated language / capitals and exclamation marks ('SHOCKING')", "Urgent pressure to share ('before it's deleted') / no author or source"],
        modelAnswer: "It uses capitals and exclamation marks to shock, and it pressures people to share quickly without giving a source.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why spreading false information can be harmful to a community.",
        points: ["It can cause fear or panic (e.g. false health or security alerts)", "It can damage the reputation of innocent people or groups / cause conflict", "People may make harmful decisions (e.g. avoid treatment) or stop trusting real warnings"],
        modelAnswer: "False information can cause panic, for example a false alert about a disease. It can damage the reputation of innocent people and cause conflict between groups. People may also make harmful decisions, such as refusing proper treatment, and later ignore real warnings.",
      }),
    ],
    hints: ["In (b), look at how the message is written and what it asks readers to do."],
    explanation: "A described poster used as a stimulus on responsible media use.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on the role of the media in socialisation.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Define **mass media**.",
        points: ["Channels of communication", "that reach a very large audience at the same time"],
        modelAnswer: "Channels of communication, such as national radio and television, that reach a very large audience at once.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **two** ways in which the media provide role models for young people.",
        points: ["Musicians, athletes or actors are admired", "young people copy their dress, hairstyles or speech", "Characters in dramas show ways of behaving", "young people copy their attitudes, good or bad (e.g. hard work, or disrespect)"],
        modelAnswer: "Famous musicians and athletes appear on television and social media, and young people copy their dress, hairstyles and ways of speaking. Characters in dramas also show ways of behaving, and young people may copy their attitudes, such as hard work and kindness, or disrespect and violence.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE",
        stem: "\"The advantages of the media as an agent of socialisation outweigh the disadvantages.\" How far do you agree?",
        points: [
          ["Advantages: inform quickly (warnings, health), educate (school broadcasts), promote heritage and languages", 2],
          ["Disadvantages: false information, harmful content, stereotypes, foreign values, advertising", 2],
          ["Supported judgement, e.g. depends on responsible use and media literacy", 2],
        ],
        levels: levels(6),
        modelAnswer: "The media have important advantages. They give fast warnings about storms and disease outbreaks, educate through school broadcasts and documentaries, and community radio helps preserve local languages and music.\n\nHowever, they also spread false information, expose children to violent or explicit content, repeat stereotypes and promote foreign values and unhealthy products.\n\nOn balance the advantages can outweigh the disadvantages, but only when people use the media critically: checking sources, choosing suitable content and limiting time. Without media literacy, the disadvantages can be serious.",
      }),
    ],
    hints: ["In (c), give advantages and disadvantages, then say what decides the balance."],
    explanation: "Define (a), describe (b) and evaluate (c) the media as a socialising agent.",
  });

  b.card("DEFINITION", "Media", "Channels that communicate information, ideas and entertainment to many people at once: print, electronic and social media.");
  b.card("DEFINITION", "Stereotype", "A fixed, oversimplified idea about a group of people, e.g. that only men can be engineers.");
  b.card("DEFINITION", "Media literacy", "The ability to find, understand, question and judge media messages, and to share content responsibly.");
  b.card("DEFINITION", "Misinformation vs disinformation", "Misinformation: false content shared in error. Disinformation: false content spread on purpose to deceive.");
  b.card("CONCEPT", "Name the three groups of media with an example of each.", "Print (newspaper), electronic/broadcast (radio, television), social/digital (social networking site).");
  b.card("CONCEPT", "Name five roles of the media in socialisation.", "Informing, educating, entertaining, providing role models, spreading values, advertising, shaping opinions.");
  b.card("CONCEPT", "Four questions to ask before sharing a message?", "Who made it? When? Where else is it reported? Why was it made?");
  b.card("CONCEPT", "Why is radio important in rural areas?", "It reaches remote places in local languages, needs no reading skills and can run on batteries.");
  b.card("CONCEPT", "Give three disadvantages of the media as a socialising agent.", "False information, harmful (violent or explicit) content, stereotypes, foreign values, wasteful advertising.");
});
