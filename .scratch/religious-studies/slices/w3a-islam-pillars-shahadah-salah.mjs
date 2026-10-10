// W3a: The Five Pillars, Shahadah and Salah.
import { concept, P, source, levels } from "../lib.mjs";

concept("frs.islam.pillars-shahadah-salah", { file: "islam/pillars-shahadah-salah", keyPrefix: "islam.pillars-shahadah-salah" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "How many times a day do Muslims perform the obligatory prayer (Salah)?",
    options: [
      ["Five", "Correct: Fajr, Dhuhr, Asr, Maghrib and Isha."],
      ["Three", "Three is not the number of daily prayers."],
      ["Seven", "Seven is the number of times pilgrims walk around the Ka'bah."],
      ["Once", "Salah is not a single weekly or daily act."],
    ],
    answer: "A",
    explanation: "Muslims pray **five** times a day: Fajr, Dhuhr, Asr, Maghrib and Isha.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is the name of the declaration of faith, the first Pillar of Islam?",
    options: [
      ["Shahadah", "Correct: the declaration of faith."],
      ["Salah", "Salah is the second Pillar, prayer."],
      ["Sawm", "Sawm is fasting in Ramadan."],
      ["Zakat", "Zakat is obligatory giving."],
    ],
    answer: "A",
    explanation: "The **Shahadah** is the first Pillar. The order is Shahadah, Salah, Zakat, Sawm and Hajj.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is the **qiblah**?",
    options: [
      ["The direction of the Ka'bah, faced in prayer", "Correct: all Muslims face the same direction."],
      ["The ritual washing performed before prayer begins", "That is wudu."],
      ["The call to prayer given from the mosque", "That is the adhan."],
      ["The Friday sermon given by the imam", "That is the khutbah."],
    ],
    answer: "A",
    explanation: "The **qiblah** is the direction of the Ka'bah; wudu is the washing, the adhan the call and the khutbah the sermon.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Who gives the adhan, the call to prayer?",
    options: [
      ["The muezzin", "Correct: the first muezzin was Bilal."],
      ["The imam", "The imam leads the prayer, though in some places he may also give the call."],
      ["The hafiz", "A hafiz is one who has memorised the Qur'an."],
      ["The hajji", "A hajji is one who has made the Hajj."],
    ],
    answer: "A",
    explanation: "The **muezzin** gives the adhan. The imam leads the prayer.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which part of the body touches the ground in prostration (sujud)?",
    options: [
      ["Forehead, nose, hands, knees and toes", "Correct: the forehead on the ground is the position of greatest humility."],
      ["The back, lying flat on the prayer mat", "Prostration is on the forehead, not the back."],
      ["The shoulders, bent right over the knees", "Not part of the form of prayer."],
      ["The elbows only, with the head held up", "Not part of the form of prayer."],
    ],
    answer: "A",
    explanation: "In **prostration** the forehead, nose, hands, knees and toes touch the ground, showing humility before God.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka sees Yusuf wash his hands, mouth, face, arms and feet before praying at school. What is he doing?",
    options: [
      ["Performing wudu, the washing before prayer", "Correct: this prepares him for Salah."],
      ["Performing the ihram rites of the Hajj", "Ihram belongs to the Hajj."],
      ["Giving the call to prayer to the other students", "The call is spoken aloud by the muezzin."],
      ["Reciting the Shahadah to join the Muslim community", "The Shahadah is spoken, not a washing."],
    ],
    answer: "A",
    hints: ["Think of what must be done before standing to pray."],
    explanation: "**Wudu** is the ritual washing performed before prayer.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Which feature of Salah best shows the equality of Muslims?",
    options: [
      ["Rich and poor stand side by side in the same rows", "Correct: no one has a special place by wealth or status."],
      ["Men and women lead the prayer in turn for all present", "This is not a feature of ordinary congregational prayer."],
      ["Each worshipper chooses a different direction to face", "All face the qiblah."],
      ["Only the chief of the community may stand in the front row", "Rows are open to all."],
    ],
    answer: "A",
    hints: ["Think of how worshippers stand together."],
    explanation: "In congregational prayer **rich and poor, young and old stand shoulder to shoulder**, facing the same direction.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Which statement best explains why Muslims face the Ka'bah in prayer?",
    options: [
      ["It unites Muslims in one direction while they worship God alone", "Correct: the Ka'bah is a direction, not an object of worship."],
      ["It shows that Muslims worship the Ka'bah itself as a holy object", "Muslims worship God alone."],
      ["It shows that the Ka'bah is the home of God on earth", "Muslims do not teach that God lives in a building."],
      ["It allows each person to choose a favourite point on the horizon", "All face the same qiblah."],
    ],
    answer: "A",
    hints: ["Remember the difference between a direction and an object of worship."],
    explanation: "The **qiblah** unites Muslims; the Ka'bah is built for the worship of the one God but is not itself worshipped.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Jumu'ah is the congregational prayer held on Friday at midday.",
    answer: true,
    explanation: "True. Jumu'ah includes a sermon (khutbah) and replaces the midday prayer on Friday.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Muslims pray to the Ka'bah, because it is the home of God.",
    answer: false,
    explanation: "False. Muslims pray to God alone; the Ka'bah is only the direction they face.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each daily prayer with its time.",
    pairs: [["Fajr", "at dawn, before sunrise"], ["Dhuhr", "at midday"], ["Maghrib", "just after sunset"], ["Isha", "at night"]],
    explanation: "Fajr: dawn. Dhuhr: midday. Maghrib: after sunset. Isha: night. Asr is the afternoon prayer.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "The first Pillar is the {{blank:a}} and the second Pillar is {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["Shahadah"], choices: ["Shahadah", "Zakat", "Sawm", "Hajj"] },
      { id: "b", accepted: ["Salah"], choices: ["Salah", "Zakat", "Sawm", "Hajj"] },
    ],
    explanation: "The Pillars in order are **Shahadah**, **Salah**, Zakat, Sawm and Hajj.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the Arabic name for the ritual washing performed before prayer?",
    accepted: ["Wudu", "Wudhu", "Wudoo", "Ablution", "Wuzu"],
    wrong: ["Hajj", "Zakat"],
    explanation: "**Wudu** (ablution) is the washing before prayer.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State the names of **three** of the five daily prayers.",
    points: ["Fajr (dawn)", "Dhuhr (midday) or Asr (afternoon)", "Maghrib (sunset) or Isha (night)"],
    modelAnswer: "Fajr at dawn, Dhuhr at midday and Maghrib at sunset (the others are Asr and Isha).",
    explanation: "One mark for each correct prayer.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Describe how a Muslim prepares for Salah.",
    points: [["Makes sure the body, clothes and place are clean", 1], ["Performs wudu, washing hands, mouth, face, arms and feet", 1], ["Faces the qiblah, often on a prayer mat", 1], ["Hears the adhan, or says the call before the prayer", 1]],
    modelAnswer: "A Muslim makes sure the body, clothes and place are clean and performs wudu, washing the hands, mouth, face, arms and feet. The worshipper then faces the qiblah, often on a prayer mat, after the adhan has been given.",
    hints: ["Think of cleanness, washing, direction and the call."],
    explanation: "One mark for each point.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** reasons why Salah is important to Muslims.",
    points: [
      ["It is a Pillar and a command of God", 1],
      ["Developed: Muslims pray five times a day in obedience to God, which keeps God in mind throughout the day", 2],
      ["It builds unity and equality", 1],
      ["Developed: all Muslims face the same direction and stand shoulder to shoulder, whatever their wealth or race", 2],
    ],
    modelAnswer: "Salah is a Pillar and a command of God. Muslims pray five times a day in obedience to God, which keeps God in mind throughout the day. It also builds unity and equality, since all Muslims face the same direction and stand shoulder to shoulder, whatever their wealth or race.",
    hints: ["Give one reason about obedience and one about unity."],
    explanation: "Two reasons, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a description (in words) of a Friday at a fictional mosque in Masvingo, 2026",
      "At midday, men and women arrive at the mosque. Many remove their shoes and wash at the taps outside. Inside the prayer hall, the worshippers stand in straight rows facing the wall that points towards Makkah. The imam gives a short sermon in English and Arabic about honesty in business. Then everyone stands, bows and kneels with their foreheads on the carpet.",
      { described: true }
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, what do worshippers do at the taps outside the prayer hall?",
        options: [
          ["They wash before praying", "Correct: this is wudu."],
          ["They collect water for the Hajj", "The source does not say this."],
          ["They buy food for the poor", "The source does not say this."],
          ["They practise the call to prayer", "The source does not say this."],
        ],
        answer: "A", explanation: "Worshippers wash at the taps before they pray; this is wudu.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, state **three** features of the Friday prayer.",
        points: ["Worshippers stand in straight rows facing the direction of Makkah", "The imam gives a sermon", "They stand, bow and place their foreheads on the ground"],
        modelAnswer: "Worshippers stand in straight rows facing the direction of Makkah, the imam gives a sermon, and they stand, bow and place their foreheads on the ground.",
      }),
      P.manual({
        label: "(c)", marks: 3, stem: "Explain why the Friday prayer is important to the Muslim community.",
        points: [["It brings Muslims together as a community every week", 1], ["The sermon gives guidance on faith and daily life", 1], ["Rich and poor stand side by side, which shows equality", 1]],
        modelAnswer: "The Friday prayer brings Muslims together as a community every week. The sermon gives guidance on faith and daily life, and rich and poor stand side by side, which shows equality.",
      }),
    ],
    hints: ["In (c) give reasons about community, guidance and equality."],
    explanation: "The source shows wudu, the qiblah, the sermon and the postures of prayer.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Chipo says: \"Praying five times a day is too much for a busy student.\" Ibrahim answers: \"The prayers take a few minutes each and give structure to the day.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** parts of the Shahadah.",
        points: [["That there is no god but the one God (Allah)", 2], ["That Muhammad is the messenger of God", 2]],
        modelAnswer: "The first part declares that there is no god but the one God, Allah. The second declares that Muhammad is the messenger of God.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain why wudu is performed before Salah.",
        points: [["It is cleansing of the body in preparation to meet God in prayer", 2], ["It reminds Muslims to approach prayer with respect and a pure intention", 2]],
        modelAnswer: "Wudu cleanses the body in preparation to meet God in prayer. It reminds Muslims to approach prayer with respect and a pure intention.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess the view that praying five times a day is the best way for Muslims to stay close to God.",
        points: [["For: regular prayer keeps God in mind through the day and builds discipline", 2], ["For: it unites Muslims in one form", 2], ["Against or limits: other Pillars, such as Zakat, Sawm and good conduct, also express faith; sincerity matters more than frequency", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Praying five times a day keeps God in mind through the day, builds discipline and unites Muslims in one form of worship. However, other Pillars such as Zakat and Sawm, and good conduct towards others, also express faith, and many Muslims stress that sincerity matters more than the number of prayers. I conclude that Salah is a central way to stay close to God, but it works together with the other Pillars.",
      }),
    ],
    hints: ["Give reasons for Salah, then reasons that other acts matter too."],
    explanation: "A strong answer weighs Salah against the other Pillars and sincerity.",
  });

  b.card("DEFINITION", "What is the **Shahadah**?", "The declaration of faith: there is no god but God, and Muhammad is God's messenger.");
  b.card("FACT", "What are the Five Pillars of Islam?", "Shahadah, Salah, Zakat, Sawm and Hajj.");
  b.card("FACT", "What are the five daily prayers?", "Fajr (dawn), Dhuhr (midday), Asr (afternoon), Maghrib (sunset) and Isha (night).");
  b.card("DEFINITION", "What is **wudu**?", "The ritual washing performed before prayer.");
  b.card("DEFINITION", "What is the **qiblah**?", "The direction of the Ka'bah in Makkah, faced during prayer.");
  b.card("DEFINITION", "What is the **adhan**?", "The call to prayer, given by the muezzin.", "The first muezzin was Bilal.");
  b.card("DEFINITION", "What is **Jumu'ah**?", "The Friday congregational prayer at midday, with a sermon (khutbah).");
  b.card("FACT", "Which position in prayer shows the greatest humility?", "Prostration (sujud), with the forehead on the ground.");
  b.card("CONCEPT", "Why is Salah important to Muslims?", "It obeys a command of God, keeps God in mind through the day, builds discipline and unites Muslims who face the same direction.");
});
