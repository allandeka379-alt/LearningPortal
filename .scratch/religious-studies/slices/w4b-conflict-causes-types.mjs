// W4b: Conflict: meaning, types and causes (Topic 15.1).
// Reviewer notes: Genesis 13:1-12 (Abram and Lot) is paraphrased; the family inheritance example refers to widows' and
// orphans' rights in general terms (check against current inheritance law before adding detail). All sources are fictional.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.conflict.causes-types", { file: "conflict/causes-types", keyPrefix: "conflict.causes-types" }, (b) => {
  mc(b, 1, "RECALL", "What is **conflict**?",
    ["A struggle between groups with opposing needs or beliefs", "Correct: conflict may be spoken, hidden or violent."],
    [["A friendly meeting at which all people hold exactly the same view", "That describes agreement, not conflict."],
     ["A law passed by Parliament about the punishment of crimes", "That describes legislation."],
     ["A religious ceremony held when a person has died in the family", "That describes a funeral rite."]],
    "**Conflict** is a disagreement or struggle between people or groups with opposing needs, interests, beliefs or values.");
  mc(b, 1, "RECALL", "What is a conflict within one person called?",
    ["Intrapersonal conflict", "Correct: intra means within."],
    [["Interpersonal conflict", "Interpersonal conflict is between individuals."],
     ["Ethnic conflict", "Ethnic conflict is between ethnic groups."],
     ["International conflict", "International conflict is between countries."]],
    "A conflict within a person is **intrapersonal**.");
  mc(b, 2, "UNDERSTANDING", "Which example is an interpersonal conflict?",
    ["Two friends fall out over a rumour", "Correct: it is between two individuals."],
    [["A pupil cannot decide whether to tell the truth or to stay silent", "That is a conflict within one person."],
     ["Two countries disagree about where their border should be drawn", "That is an international conflict."],
     ["Rival parties refuse to accept the result of an election", "That is a political conflict."]],
    "A quarrel between two friends is an **interpersonal** conflict.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Two villages quarrel over a water point during a drought. What is the main cause of this conflict?",
    ["Competition for a scarce resource", "Correct: water is scarce during a drought."],
    [["A dispute about who should inherit a deceased person's estate", "No inheritance is involved."],
     ["A difference in belief about the right way to worship", "No worship dispute is described."],
     ["A conflict within one person about which choice to make", "The quarrel is between two villages."]],
    "The main cause is **competition for a scarce resource** (water).", { daily: true });
  mc(b, 2, "UNDERSTANDING", "In Genesis 13:1-12, what caused the quarrel between the herders of Abram and of Lot?",
    ["The land could not support the flocks of both", "Correct: there was not enough grazing land for both."],
    [["A disagreement about the tax to be paid to a foreign king", "The passage concerns grazing."],
     ["A dispute about whether a marriage between families was valid", "The passage concerns grazing."],
     ["A difference of opinion over the day of rest in the week", "The passage concerns grazing."]],
    "Genesis 13 describes a quarrel over **grazing land** that could not support both flocks.");
  mc(b, 3, "APPLICATION", "After a man dies, his brothers tell his widow to leave the homestead and say the property is theirs. Which causes of conflict are shown?",
    ["An inheritance dispute and unfair treatment of a widow", "Correct: property is disputed and the widow's rights are ignored."],
    [["A struggle between two countries over a river and its water", "No countries are involved."],
     ["A conflict within one person about a difficult decision", "The conflict is between people."],
     ["A misunderstanding between two schools about a sports match", "No schools are involved."]],
    "The example shows an **inheritance dispute** and **injustice** towards the widow.",
    { hints: ["Think about the property and about the widow's rights."] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a fictional school magazine, Gweru, 2026",
    "Two Form 2 classes stopped speaking to each other after a rumour spread that one of them had broken a window in the library. In fact the window had been broken by a storm. When the head asked each class to talk to the other, the rumour was found to be untrue and the classes apologised.") + "\n\nWhat was the main cause of the conflict in Source A?",
    ["Misunderstanding caused by a rumour", "Correct: the rumour was untrue."],
    [["A dispute over the inheritance of a family field and cattle", "No inheritance is involved."],
     ["Competition between the classes for limited water supplies", "No water dispute is described."],
     ["A disagreement over religious beliefs among the pupils", "No religious difference is described."]],
    "The conflict was caused by **misunderstanding**, as the rumour was untrue.",
    { hints: ["Look at what was untrue in the source."] });
  mc(b, 4, "EVALUATION", "Which statement about conflict is best supported?",
    ["It can be destructive or constructive, depending on how it is handled", "Correct: the outcome depends on the response."],
    [["It is always violent and always ends in the loss of life", "Many conflicts are settled without violence."],
     ["It is never useful and should always be ignored by everyone", "Conflict can bring change and understanding."],
     ["It occurs only between countries and never in homes, schools or villages", "Conflict occurs at every level."]],
    "Conflict can be **destructive or constructive**, depending on how people respond.",
    { hints: ["Choose the answer that gives both possibilities."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "All conflicts are violent.",
    answer: false,
    explanation: "False. Conflict is a disagreement; violence is only one harmful way of responding. Many conflicts are settled without violence.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Handled well, conflict can lead to change that corrects an injustice.",
    answer: true,
    explanation: "True. Conflict can bring problems into the open so that unfair systems or laws are changed.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each type of conflict with an example.",
    pairs: [
      ["Intrapersonal", "A pupil is unsure whether to tell the truth"],
      ["Family", "Brothers disagree about their father's estate"],
      ["Community", "Two villages dispute a water point"],
      ["International", "Two countries disagree about a border"],
    ],
    explanation: "Each example belongs to a different level of conflict.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A conflict within one person is called {{blank:a}} conflict, and a conflict between two countries is called {{blank:b}} conflict.",
    blanks: [
      { id: "a", accepted: ["intrapersonal"], choices: ["intrapersonal", "interpersonal", "community", "ethnic"] },
      { id: "b", accepted: ["international"], choices: ["international", "family", "religious", "intrapersonal"] },
    ],
    hints: ["Think of the meaning of intra and inter."],
    explanation: "**Intrapersonal** (within a person) and **international** (between countries).",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "In which book of the Bible do Abram and Lot quarrel over grazing land?",
    accepted: ["Genesis", "Genesis 13", "Gen"],
    wrong: ["Exodus"],
    explanation: "The quarrel is described in **Genesis 13**.",
  });

  ms(b, 1, "RECALL", 3, "State **three** causes of conflict.",
    ["Competition for resources such as land and water", "Struggles for power or leadership", "Misunderstanding, injustice, differences in beliefs or inheritance disputes"],
    "Competition for resources such as land and water, struggles for power or leadership, and misunderstanding or injustice.",
    "One mark for each cause.");
  ms(b, 3, "UNDERSTANDING", 4, "Describe **two** types of conflict, giving an example of each.",
    ["Family conflict: between members of a family", "Example: brothers disagree over an inheritance", "Community conflict: between groups in a village, school or town", "Example: two villages dispute grazing land or a water point"],
    "Family conflict is between members of a family, for example brothers who disagree over an inheritance. Community conflict is between groups in a village, school or town, for example two villages that dispute a water point.",
    "One mark for each type and one for each example; credit any two types in the lesson.",
    ["Give the meaning and then an example for each type."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** ways in which conflict can have good results.",
    [["It brings problems into the open", 1], ["Developed: once a problem is spoken about it can be solved, such as a fence dispute or an unfair rule", 2],
     ["It can lead to change", 1], ["Developed: an unjust law or practice may be corrected, and people learn to listen and negotiate", 2]],
    "Conflict brings problems into the open, and once a problem is spoken about it can be solved, such as a fence dispute or an unfair rule. It can also lead to change, because an unjust law or practice may be corrected and people learn to listen and negotiate.",
    "Two ways, each stated and developed.",
    ["Think of what conflict reveals and what it can change."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional local newspaper, Hwange, 2026",
      "Two neighbouring villages have been arguing over the use of a river pool for cattle and washing. The dry season has made the pool smaller. Elders from both villages say that the other side has taken more than its share, and young men have exchanged insults. The headman has called a meeting for next week.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "What type of conflict is described in Source A?",
        ["A community conflict", "Correct: it is between two villages."],
        [["An intrapersonal conflict", "That is within one person."],
         ["An international conflict", "That is between countries."],
         ["A political conflict between parties", "No parties are involved."]],
        "A dispute between two villages is a community conflict."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** facts about the dispute.",
        points: ["The two villages argue over the use of a river pool for cattle and washing", "The dry season has made the pool smaller", "Each side says the other has taken more than its share, and the headman has called a meeting"],
        modelAnswer: "The two villages argue over the use of a river pool for cattle and washing, the dry season has made the pool smaller, and each side says the other has taken more than its share while the headman has called a meeting.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why conflicts over resources become more serious in a dry season.",
        points: [["Water becomes scarcer, so each group fears losing what it needs for people and animals", 2], ["Need is greater and tempers rise, and insults and accusations can lead to violence unless leaders step in", 2]],
        modelAnswer: "Water becomes scarcer, so each group fears losing what it needs for people and animals. Need is greater and tempers rise, and insults and accusations can lead to violence unless leaders step in.",
      }),
    ],
    hints: ["In (c) link scarcity to fear and to anger."],
    explanation: "The source shows a conflict caused by competition for a scarce resource.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Sipho says: \"Conflict is always harmful, and a peaceful society has none.\" Thandeka says: \"Conflict is natural, and what matters is how people respond to it.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** causes of conflict in families.",
        points: [["Disagreements over inheritance or property", 2], ["Misunderstanding, poor communication or unfair treatment of some family members", 2]],
        modelAnswer: "Disagreements over inheritance or property cause conflict in families. Misunderstanding, poor communication or unfair treatment of some family members also cause conflict.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** destructive effect of conflict on a community.",
        points: [["Relationships are broken and trust is lost", 1], ["Developed: neighbours stop helping one another and the community is divided", 1], ["Property is damaged or lives are lost", 1], ["Developed: families become poorer, children miss school and people may be displaced", 1]],
        modelAnswer: "Relationships are broken and trust is lost, so neighbours stop helping one another and the community is divided. Property may also be damaged or lives lost, so families become poorer, children miss school and people may be displaced.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that conflict is always harmful to a community.",
        points: [["For: hurt, fear, loss of life and property, broken relationships and poverty", 2], ["Against: conflict can bring problems into the open, correct injustice and lead to better understanding", 2], ["The outcome depends on how people respond: through violence and insults, or through listening, fair solutions and forgiveness", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Conflict can be very harmful. It can cause hurt and fear, loss of life and property, broken relationships and poverty. However, conflict can also bring problems into the open, correct an injustice and lead to better understanding, as when a family agrees on a fair plan for an inheritance. The result depends on how people respond: with violence and insults, or with listening, fair solutions and forgiveness. I conclude that conflict is not always harmful; it becomes harmful when it is handled badly and can be an opportunity for change when it is handled well.",
      }),
    ],
    hints: ["Give both harmful and helpful results in (c), and explain what makes the difference."],
    explanation: "A strong answer shows both sides of conflict and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is **conflict**?", "A disagreement or struggle between people or groups with opposing needs, interests, beliefs or values.");
  b.card("DEFINITION", "What is the difference between conflict and violence?", "Conflict is a disagreement; violence is the use of force or threat to harm, one harmful way of responding.");
  b.card("FACT", "List eight types of conflict.", "Intrapersonal, interpersonal, family, community, religious, ethnic, political and international.");
  b.card("FACT", "Which Bible passage describes a quarrel over grazing land settled by agreement?", "Genesis 13:1-12 (Abram and Lot).");
  b.card("CONCEPT", "Name six causes of conflict.", "Scarce resources, struggles for power, differences in beliefs and values, misunderstanding, injustice, inheritance disputes.");
  b.card("CONCEPT", "Why does a dry season make conflicts over water more serious?", "Water becomes scarcer, need is greater and tempers rise.");
  b.card("CONCEPT", "Give two destructive effects of conflict.", "Hurt and loss of life or property; broken relationships and poverty.");
  b.card("CONCEPT", "How can conflict be an opportunity?", "It brings problems into the open and can lead to change, such as correcting an injustice, and to better understanding.");
});
