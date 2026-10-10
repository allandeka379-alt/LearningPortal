// W1b: Inter-dependency of families.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.family.interdependence", { file: "family/interdependence", keyPrefix: "family.interdependence" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **burial society**?",
    options: [
      ["A group whose members pay regular contributions towards funeral costs", "Correct: it supports a bereaved family."],
      ["A group of elders who decide where in the village each person must be buried", "It is a savings group, not a group of elders deciding burial sites."],
      ["A meeting of spirit mediums who bring home the spirit of a person after a year", "That describes a ceremony, not a society."],
      ["A school club that teaches students the history of the cemeteries in the district", "A burial society is a mutual-help group."],
    ],
    answer: "A",
    explanation: "Members of a burial society contribute small amounts so that the society can pay towards funeral costs and support a bereaved family.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is a **mukando**?",
    options: [
      ["A savings or lending club", "Correct: members contribute regularly and take turns to receive the pooled money."],
      ["A rain ceremony held at a sacred place in the Matopo Hills each year", "That is a different practice (mukwerera)."],
      ["A title given to a chief by the elders at his installation", "A mukando is not a title."],
      ["A song sung at a funeral to honour the dead person and comfort the family", "A mukando is a savings club, not a song."],
    ],
    answer: "A",
    explanation: "Mukando is a Shona savings or lending club based on trust and regular contributions.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "How does a marriage create inter-dependency between families?",
    options: [
      ["The two families gain new relatives and duties to one another", "Correct: marriage joins families, not only individuals."],
      ["The two families give up their own names and take the name of the chief", "Marriage does not change family names in this way."],
      ["The two families can no longer visit one another once the wedding is over", "The families remain connected."],
      ["The two families agree to share one house and to have only one head for both", "They do not share one household."],
    ],
    answer: "A",
    explanation: "A marriage alliance brings obligations of hospitality, support and attendance at ceremonies between the two families.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which example shows mutual help at a life event?",
    options: [
      ["Neighbours bring food and firewood to a family that has had a death", "Correct: the community supports the bereaved."],
      ["A family buys a new radio for its own use and does not tell the neighbours", "That is not mutual help."],
      ["A family moves away from the village without telling its relatives where it went", "That reduces contact."],
      ["A family refuses to attend a wedding because of a quarrel over land", "That shows a threat to inter-dependency."],
    ],
    answer: "A",
    explanation: "At funerals, weddings and illness, relatives and neighbours give practical help.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Rudo's father is ill. His brothers take turns to stay with him, neighbours bring food and the church sends two women to cook. Which idea is shown?",
    options: [
      ["Inter-dependency among relatives, neighbours and a religious community", "Correct: several groups give help."],
      ["The decline of family ties because of migration to the towns", "The example shows strong ties."],
      ["The role of a chief in settling a dispute between two clans", "No dispute is mentioned."],
      ["The use of a mukando to raise money for the school fees of the children", "No savings club is mentioned."],
    ],
    answer: "A",
    explanation: "Relatives, neighbours and a church together support a sick family member.",
    hints: ["List the groups who help."],
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which pair correctly links a religion with a teaching on community support?",
    options: [
      ["Christianity: the church is like a body with many parts (1 Corinthians 12:12-27)", "Correct: the parts depend on one another."],
      ["Islam: the church is like a body with many parts (Acts 2:44-45)", "These are Christian references."],
      ["Judaism: believers are brothers and sisters (1 Corinthians 12:12-27)", "That is a Christian reference."],
      ["Christianity: believers are brothers and sisters (Qur'an 49:10)", "Qur'an 49:10 is a Muslim reference."],
    ],
    answer: "A",
    explanation: "Christians cite 1 Corinthians 12 (the body) and Acts 2 (sharing); Muslims cite Qur'an 49:10 (believers are brothers and sisters).",
    hints: ["Check which scripture belongs to each religion."],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which statement is the best-balanced comment on migration and family inter-dependency?",
    options: [
      ["It can weaken daily contact, but money sent home and phones can keep families connected", "Correct: it has both effects."],
      ["It ends all links between families because relatives can no longer reach one another", "Many families remain connected through visits, money and phones."],
      ["It has no effect on family inter-dependency because relatives always live near each other", "Migration changes where relatives live."],
      ["It always strengthens families because everyone earns more money in a different place", "Not every migrant earns more, and distance can weaken ties."],
    ],
    answer: "A",
    explanation: "A balanced answer shows that migration weakens daily contact but can also support families through remittances and communication.",
    hints: ["Avoid 'ends all', 'no effect' and 'always'."],
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Inter-dependency means that people give and receive help.",
    answer: true,
    explanation: "True. Help goes in both directions.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Burial societies are open only to people of one religion.",
    answer: false,
    explanation: "False. Many burial societies include people of different religions and areas.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each threat to inter-dependency with an example.",
    pairs: [["Individualism", "a person puts private success before duties to relatives"], ["Migration", "relatives move to town or abroad and see each other rarely"], ["Conflict", "a quarrel over inheritance divides a family"], ["Poverty", "a household has too little food to share with relatives"]],
    explanation: "Each threat weakens the willingness or ability to help one another.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A group whose members contribute towards funeral costs is a {{blank:a}} society, and a Shona savings club is a {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["burial"], choices: ["burial", "sports", "music", "farming"] },
      { id: "b", accepted: ["mukando"], choices: ["mukando", "nhimbe", "roora", "mutupo"] },
    ],
    explanation: "Burial society; mukando.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct reference.",
    template: "The Qur'an says that believers are brothers and sisters in {{blank:a}}.",
    blanks: [{ id: "a", accepted: [ref("Qur'an", 49, 10)], choices: [ref("Qur'an", 49, 10), ref("Acts", 2, "44-45"), ref("Exodus", 20, 12), ref("1 Corinthians", 12, "12-27")] }],
    explanation: "Qur'an 49:10 (surah Al-Hujurat).",
    hints: ["Only one reference is from the Qur'an."],
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Ndebele word for a work party?",
    accepted: ["ilima"],
    wrong: ["nhimbe"],
    explanation: "A work party is **ilima** in Ndebele and **nhimbe** in Shona.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways in which families depend on one another.",
    points: ["Marriage alliances or kinship networks", "Mutual help at funerals, weddings or in illness", "Burial societies, savings clubs or work parties"],
    modelAnswer: "Through marriage alliances and kinship networks; through mutual help at funerals, weddings and illness; and through burial societies, savings clubs and work parties.",
    explanation: "One mark for each way.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a burial society or savings club helps its members.",
    points: [["Members make small regular contributions", 1], ["The group pays towards funeral costs or gives money to a member in turn", 1], ["No household carries a large cost alone", 1], ["It builds trust and cooperation, sometimes across religions", 1]],
    modelAnswer: "Members make small regular contributions. The group then pays towards funeral costs or gives a member the pooled money in turn, so no household carries a large cost alone. It also builds trust and cooperation among members, who may belong to different religions.",
    hints: ["Say how it works, and what it achieves."],
    explanation: "One mark for each accurate point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain how religion helps families to depend on one another.",
    points: [
      ["Shared rituals bring families together", 1],
      ["Developed: naming, weddings and funerals in IR, and festivals in other religions, make relatives meet and renew their bonds", 1],
      ["Places of worship give a meeting place", 1],
      ["Developed: at church, mosque or synagogue members meet regularly and support the sick and the poor", 1],
      ["Teachings encourage care for others", 1],
      ["Developed: for example, zakat in Islam and the teaching of sharing in the first Christian community encourage believers to help those in need", 1],
    ],
    modelAnswer: "Shared rituals bring families together: naming, weddings and funerals in IR, and festivals in other religions, make relatives meet and renew their bonds. Places of worship give a regular meeting place where members support the sick and the poor. Teachings also encourage care for others; for example, zakat in Islam and the sharing of the first Christian community encourage believers to help those in need.",
    hints: ["Use three points: rituals, meeting places, teachings."],
    explanation: "Three developed points.",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional magazine article, Bulawayo, 2026",
      "When Mr Dube died, his burial society met the cost of the coffin. His wife's brothers travelled from Gwanda to help. The church choir sang at the graveside, and women from the neighbourhood cooked for the guests for three days. 'We could not have done it alone,' his daughter said."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which idea does the daughter's last sentence best express?",
        options: [
          ["Families depend on others in times of need", "Correct: inter-dependency."],
          ["Families should avoid asking for help from any neighbour or relative", "The source shows help being given and welcomed."],
          ["Funerals are best held away from the village where the person lived", "Not suggested in the source."],
          ["Burial societies are expensive and should be avoided by most families", "The source shows the burial society helping."],
        ],
        answer: "A", explanation: "The daughter says the family could not have managed alone.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** groups that helped the family in Source A.",
        points: ["The burial society", "The wife's brothers (relatives)", "The church choir or the neighbourhood women"],
        modelAnswer: "The burial society; the wife's brothers; the church choir and neighbourhood women.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain **two** ways in which the help shown in Source A reflects the role of religion or community in family life.",
        points: [["The church choir shows a religious community supporting a bereaved family with worship and comfort", 2], ["The neighbourhood women and relatives show community responsibility for families in need", 2]],
        modelAnswer: "The church choir sang at the graveside, which shows a religious community supporting the bereaved family with worship and comfort. The neighbourhood women cooked for three days and the wife's brothers travelled to help, which shows the community and relatives sharing responsibility.",
      }),
    ],
    hints: ["Link two details of the source to religion and community."],
    explanation: "The source shows burial society, kin, church and neighbours helping a family.",
  });
  b.struct({
    d: 4, skill: "EVALUATION", examStyle: true, secs: 900,
    stem: "Themba says: \"Families in town do not depend on each other as in the village.\" Nokuthula says: \"They still do, but in different ways.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Give **two** ways in which families in rural areas depend on one another.",
        points: [["Work parties (nhimbe/ilima) help with ploughing and harvesting", 2], ["Relatives and neighbours help at funerals, weddings and illness", 2]],
        modelAnswer: "Neighbours help one another at work parties for ploughing and harvesting. Relatives and neighbours also help at funerals, weddings and in times of illness.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **two** ways in which families in town show inter-dependency.",
        points: [["Burial societies, savings clubs or groups of neighbours pool money for funerals and school fees", 2], ["Churches, mosques and other faith groups visit the sick and support families", 2]],
        modelAnswer: "Town families join burial societies and savings clubs that pool money for funerals and school fees. They also belong to churches, mosques or other faith groups that visit the sick and support families in need.",
      }),
      P.manual({
        label: "(c)", marks: 6, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "To what extent has inter-dependency among families been weakened by modern life?",
        points: [["Weakened: individualism, migration, pressure of work and cost of living, conflicts over inheritance", 2], ["Kept or changed: remittances, phones, burial societies, faith communities", 2], ["A supported judgement", 2]],
        levels: levels(6),
        modelAnswer: "Modern life has weakened some inter-dependency. Migration, long working hours, the cost of living and quarrels over inheritance make it harder to visit relatives and share resources. However, families also use phones, send money home and join burial societies, savings clubs and faith groups that support them. Inter-dependency has therefore changed in form more than it has been lost, though it is under strain in some families.",
      }),
    ],
    hints: ["Give evidence of weakening and of adaptation before judging."],
    explanation: "A balanced answer shows both strain and adaptation.",
  });

  b.card("DEFINITION", "What is **inter-dependency**?", "A relationship in which people or groups depend on one another and each gives and receives help.");
  b.card("DEFINITION", "What is a **burial society**?", "A group whose members pay regular contributions to meet funeral costs and support a bereaved family.");
  b.card("DEFINITION", "What is a **mukando**?", "A Shona savings or lending club in which members contribute regularly and receive the pooled money in turn.");
  b.card("CONCEPT", "How does marriage link two families?", "The families gain new relatives and duties, such as support and attending one another's ceremonies.");
  b.card("FACT", "Which New Testament references show Christian community and sharing?", "1 Corinthians 12:12-27 (the body with many parts) and Acts 2:44-45 (believers shared what they had).");
  b.card("FACT", "Which Qur'an reference says believers are brothers and sisters?", "Qur'an 49:10.");
  b.card("CONCEPT", "Name three threats to inter-dependency.", "Individualism, migration, conflict, poverty (any three).");
  b.card("CONCEPT", "How can religion strengthen inter-dependency?", "Shared rituals, places of worship and teaching about caring for others.");
});
