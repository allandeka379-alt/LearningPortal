// W2a: From kingdom to diaspora.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.judaism.kingdom-diaspora", { file: "judaism/kingdom-diaspora", keyPrefix: "judaism.kingdom-diaspora" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Who built the First Temple in Jerusalem?",
    options: [
      ["Solomon", "Correct: the First Temple was built under King Solomon."],
      ["Saul", "Saul was the first king of Israel but did not build the Temple."],
      ["Nehemiah", "Nehemiah belongs to the period after the exile, long after Solomon."],
      ["Joshua", "Joshua led the entry into Canaan; the Temple was built centuries later."],
    ],
    answer: "A",
    explanation: "**Solomon**, the son of David, built the First Temple in Jerusalem.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year did the Romans destroy the Second Temple?",
    options: [
      ["70 CE", "Correct: the Romans destroyed Jerusalem and the Temple in 70 CE."],
      ["586 BCE", "586 BCE is the year the Babylonians destroyed the First Temple."],
      ["1948", "1948 is the year the State of Israel was proclaimed."],
      ["313", "313 is the date of the Edict of Milan in Christian history."],
    ],
    answer: "A",
    explanation: "The Second Temple was destroyed by the Romans in **70 CE**.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does the word **diaspora** mean?",
    options: [
      ["The scattering of Jews outside the land of Israel", "Correct: it also names the Jewish communities that live there."],
      ["A festival that remembers the destruction of the Temple", "Diaspora is not a festival."],
      ["The title given to a rabbi who leads a large congregation", "Diaspora is not a title of a leader."],
      ["A scroll that lists the laws given to Moses at Mount Sinai", "Diaspora is not a scroll or a book."],
    ],
    answer: "A",
    explanation: "**Diaspora** means \"scattering\": Jews living outside the land of Israel, and their communities.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What happened to Jerusalem in 586 BCE?",
    options: [
      ["The Babylonians destroyed it and the First Temple, and many were exiled", "Correct: this began the Babylonian exile."],
      ["The Romans destroyed it and the Second Temple after a Jewish revolt against Rome", "That happened in 70 CE."],
      ["King David made it the capital of the united kingdom of Israel", "That happened earlier, in David's reign."],
      ["The State of Israel was proclaimed there after the Second World War", "That happened in 1948."],
    ],
    answer: "A",
    explanation: "In 586 BCE Babylon destroyed Jerusalem and the First Temple, and many people of Judah were taken into exile.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What did the prophets such as Amos and Isaiah call on the people to do?",
    options: [
      ["Worship one God and practise justice", "Correct: the prophets linked faith to fair treatment of others."],
      ["Build a larger Temple before they would speak to the rulers", "The prophets did not make their message depend on buildings."],
      ["Leave the land of Canaan and settle in Egypt for safety", "They called for faithfulness in the land, not departure."],
      ["Give up the Sabbath and festivals during times of danger", "The prophets did not call for giving up worship."],
    ],
    answer: "A",
    explanation: "The prophets spoke in God's name, calling for the worship of one God and for justice for the poor and the weak.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Miriam explains that after the Temple was destroyed, Jews could no longer offer sacrifices, so prayer, study and the synagogue became central. Which development is she describing?",
    options: [
      ["The rise of rabbinic Judaism", "Correct: rabbis taught a Judaism that did not depend on the Temple."],
      ["The building of the First Temple under Solomon", "That happened before; it is the opposite direction."],
      ["The crossing of the sea in the Exodus from Egypt", "That event belongs to Moses' time, long before."],
      ["The proclamation of the State of Israel in 1948", "That belongs to modern history."],
    ],
    answer: "A",
    hints: ["Which group of teachers led Judaism after 70 CE?"],
    explanation: "After 70 CE, **rabbis** developed a Judaism based on prayer, study and the synagogue; their teaching was gathered in the Mishnah and Talmud.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which statement about the Lemba (Remba) tradition of Jewish ancestry is the most accurate way to write it in an examination?",
    options: [
      ["It is a claim that scholars have studied, with varied conclusions", "Correct: it is presented as a claim studied by scholars."],
      ["It has been proved by science and is accepted by every scholar who has studied it", "Scholars have reached varied conclusions."],
      ["It has been disproved, so the Lemba have no connection to Judaism", "The claim is not described as disproved."],
      ["It applies to all peoples of Zimbabwe, who share a Jewish ancestry", "The tradition belongs to the Lemba, not to all peoples."],
    ],
    answer: "A",
    hints: ["The syllabus approach is to describe beliefs and claims without taking sides."],
    explanation: "Write that the Lemba **claim** Jewish ancestry, and that scholars have studied it and not all agree.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which comparison of the two Temples is correct?",
    options: [
      ["The First Temple was destroyed by Babylon in 586 BCE; the Second by Rome in 70 CE", "Correct: two different empires and two different dates."],
      ["The First Temple was destroyed by Rome in 70 CE; the Second by Babylon in 586 BCE", "The empires and dates are reversed."],
      ["Both were destroyed by Babylon in the same year, 586 BCE, as part of one attack", "Only the First Temple fell to Babylon."],
      ["Neither was destroyed, but both were closed when the diaspora began in 70 CE", "Both were destroyed."],
    ],
    answer: "A",
    hints: ["Link the earlier Temple with the earlier date."],
    explanation: "First Temple: built under Solomon, destroyed by **Babylon** in **586 BCE**. Second Temple: rebuilt after the exile, destroyed by **Rome** in **70 CE**.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "King David made Jerusalem the capital of Israel.",
    answer: true,
    explanation: "True. David united the tribes and made Jerusalem his capital.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The Holocaust was the murder of about six million Jews by the Nazi regime during the Second World War.",
    answer: true,
    explanation: "True. About six million Jewish men, women and children were murdered. It is also called the Shoah.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each date with the event.",
    pairs: [["586 BCE", "Babylon destroys Jerusalem and the First Temple"], ["70 CE", "Rome destroys the Second Temple"], ["1941-45", "The Holocaust, the mass murder of Jews"], ["14 May 1948", "The State of Israel is proclaimed"]],
    explanation: "Learn these four dates in order: 586 BCE, 70 CE, 1941-45 and 14 May 1948.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "After Solomon the kingdom divided into {{blank:a}} in the north and {{blank:b}} in the south.",
    blanks: [
      { id: "a", accepted: ["Israel"], choices: ["Israel", "Judah", "Egypt", "Babylon"] },
      { id: "b", accepted: ["Judah"], choices: ["Judah", "Israel", "Moab", "Assyria"] },
    ],
    explanation: "The northern kingdom was **Israel** and the southern kingdom was **Judah** (with Jerusalem).",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Choose the correct words.",
    template: "The first king of Israel was {{blank:a}}; his successor {{blank:b}} made Jerusalem the capital.",
    blanks: [
      { id: "a", accepted: ["Saul"], choices: ["Saul", "David", "Solomon", "Joshua"] },
      { id: "b", accepted: ["David"], choices: ["David", "Saul", "Moses", "Jeroboam"] },
    ],
    hints: ["The kings in order were Saul, David and Solomon."],
    explanation: "Saul was the first king; David united the tribes and made Jerusalem the capital; Solomon built the Temple.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What name do Jews give to the Holocaust, a word meaning catastrophe in Hebrew?",
    accepted: ["Shoah", "The Shoah", "Shoa"],
    wrong: ["Pesach", "Exodus"],
    explanation: "The Hebrew name is the **Shoah**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** kings of ancient Israel and one thing for which each is remembered.",
    points: ["Saul: the first king of Israel", "David: united the tribes and made Jerusalem his capital", "Solomon: built the First Temple"],
    modelAnswer: "Saul was the first king of Israel. David united the tribes and made Jerusalem his capital. Solomon built the First Temple.",
    explanation: "One mark for each king with a correct detail.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe what happened in the Babylonian exile and how it affected Jewish worship.",
    points: [
      ["Babylon destroyed Jerusalem and the First Temple in 586 BCE", 1],
      ["Many people were taken to Babylon, far from the Temple", 1],
      ["The exiles kept their faith through prayer, study and the Sabbath", 1],
      ["These practices later shaped the synagogue; many returned and built the Second Temple", 1],
    ],
    modelAnswer: "In 586 BCE Babylon destroyed Jerusalem and the First Temple, and many people were taken to Babylon. Far from the Temple the exiles kept their faith through prayer, study and the Sabbath, practices that later shaped the synagogue. Many later returned and built the Second Temple.",
    hints: ["Say what was lost, where people went, and how they kept their faith."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which the destruction of the Second Temple in 70 CE changed Judaism.",
    points: [
      ["Sacrifices could no longer be offered because the Temple was gone", 1],
      ["Developed: worship moved to prayer and the synagogue, which could be held anywhere", 2],
      ["Rabbis became the leaders and teachers, replacing the priests", 1],
      ["Developed: their teaching, gathered in the Mishnah and Talmud, guided Jews in the diaspora", 2],
    ],
    modelAnswer: "Without the Temple sacrifices could no longer be offered, so worship moved to prayer and the synagogue, which could be held anywhere. Rabbis also became the leaders and teachers, replacing the priests, and their teaching, gathered in the Mishnah and Talmud, guided Jews living in the diaspora.",
    hints: ["Give one change in worship and one in leadership; develop each."],
    explanation: "Two ways, each stated (1) and developed (2 across the way).",
  });

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional school history project by a student in Bulawayo, 2026",
      "The Babylonians destroyed the Temple that Solomon had built, and many Jews were taken to Babylon. Centuries later the Romans destroyed the second Temple. After that, Jews lived in many countries. Today there are Jewish congregations in Harare and Bulawayo, and a people called the Lemba say that their ancestors were Jewish."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "Which word describes Jews living in many countries outside the land of Israel?",
        options: [
          ["Diaspora", "Correct: the scattering of Jews outside the land."],
          ["Exodus", "The Exodus was the departure from Egypt."],
          ["Covenant", "A covenant is a solemn agreement with God."],
          ["Sabbath", "The Sabbath is the weekly day of rest."],
        ],
        answer: "A", explanation: "The Jewish communities outside the land are called the diaspora.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** facts about the history of Judaism.",
        points: ["Babylon destroyed Solomon's Temple in 586 BCE and many were taken to Babylon", "Rome destroyed the Second Temple in 70 CE", "Jews then lived in many countries; there are congregations in Harare and Bulawayo"],
        modelAnswer: "Babylon destroyed Solomon's Temple in 586 BCE; Rome destroyed the Second Temple in 70 CE; Jews then lived in many countries, including Zimbabwe.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "How should the claim of the Lemba be presented in a Religious Studies answer? Give reasons.",
        points: [["As a tradition or claim of Jewish ancestry", 1], ["Scholars have studied it and have reached varied conclusions", 1], ["It should not be written as a proved fact or as disproved", 1]],
        modelAnswer: "It should be presented as a tradition or claim of Jewish ancestry that scholars have studied with varied conclusions. It should not be written as a proved fact or as disproved.",
      }),
    ],
    hints: ["In (c) use the word claim and say that scholars disagree."],
    explanation: "The source names two destructions, the diaspora and the Lemba claim.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two students discuss Jewish history. Tendai says: \"The destruction of the Temple in 70 CE ended Judaism as a religion.\" Rachel replies: \"It changed Judaism, but Judaism continued in a new form.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "State **four** facts about the Holocaust or the history of the Jews in the twentieth century.",
        points: ["About six million Jews were murdered", "It was carried out by the Nazi regime", "It took place between 1941 and 1945 during the Second World War", "It is also called the Shoah and is remembered each year"],
        modelAnswer: "About six million Jews were murdered by the Nazi regime between 1941 and 1945, during the Second World War. It is called the Shoah and is remembered each year.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why synagogues are important in the diaspora.",
        points: [["They are places of prayer, study and community that do not depend on the Temple", 2], ["They help Jews far from the land of Israel to keep their identity, language and festivals", 2]],
        modelAnswer: "Synagogues are places of prayer, study and community that do not depend on the Temple, so Jews can worship wherever they live. They also help Jews far from the land to keep their identity, their language and their festivals.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that Judaism ended when the Second Temple was destroyed.",
        points: [["For: sacrifice, priests and the central place of worship were lost", 2], ["Against: Judaism continued through prayer, study and the synagogue led by rabbis, and survived in the diaspora", 2], ["Evidence of continuity: the Mishnah and Talmud, Sabbath and festivals still kept", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "There is some truth in the view, because sacrifice, the priests and the central place of worship were all lost. However, Judaism did not end. Rabbis developed a Judaism based on prayer, study and the synagogue, gathered their teaching in the Mishnah and Talmud, and Jews kept the Sabbath and festivals in the diaspora. Today Judaism is a living religion, so the destruction changed it greatly but did not end it.",
      }),
    ],
    hints: ["Weigh what was lost against what continued before you judge."],
    explanation: "A strong answer explains both loss and continuity and judges which is stronger.",
  });

  b.card("FACT", "Who built the First Temple?", "King Solomon, in Jerusalem.");
  b.card("FACT", "Which Temple was destroyed in 586 BCE, and by whom?", "The First Temple, by the Babylonians.");
  b.card("FACT", "Which Temple was destroyed in 70 CE, and by whom?", "The Second Temple, by the Romans.");
  b.card("DEFINITION", "What is the **diaspora**?", "The scattering of Jews outside the land of Israel, and the communities that live there.");
  b.card("DEFINITION", "What is **rabbinic Judaism**?", "Judaism centred on the synagogue, prayer, Torah study and the teaching of rabbis, developed after the Second Temple fell.");
  b.card("FACT", "What was the Babylonian exile?", "The removal of many people of Judah to Babylon after 586 BCE.", "Many later returned and built the Second Temple.");
  b.card("FACT", "What is the Holocaust (Shoah)?", "The murder of about six million Jews by the Nazi regime, 1941-45.");
  b.card("FACT", "When was the State of Israel proclaimed?", "14 May 1948.");
  b.card("CONCEPT", "How should the Lemba claim of Jewish ancestry be presented?", "As a tradition or claim studied by scholars with varied conclusions; not as proved or disproved.");
});
