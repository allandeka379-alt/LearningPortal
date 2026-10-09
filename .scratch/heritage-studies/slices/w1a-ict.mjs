// W1a: ICT in socialisation (her.socialisation.ict).
import { concept, P, source, table, levels } from "../lib.mjs";

concept("her.socialisation.ict", { file: "socialisation/ict", keyPrefix: "socialisation.ict" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is **cyberbullying**?",
    options: [
      ["Using phones or the internet to threaten or insult someone", "Correct: bullying carried out through digital technology."],
      ["Stealing someone's phone or laptop computer during school hours", "That is theft of a device, not cyberbullying."],
      ["Spending too many hours on social media every day", "That is overuse or addiction, a different problem."],
      ["Sending a school assignment to a teacher by email", "This is a normal, responsible use of ICT."],
    ],
    answer: "A",
    explanation: "Cyberbullying uses phones or the internet to threaten, insult, embarrass, exclude or spread rumours about someone.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What is a person's **digital footprint**?",
    options: [
      ["The lasting record of what they post, share and search online", "Correct: it can be found by others long afterwards."],
      ["The number of steps counted by an app on their phone", "That is a step counter, not a digital footprint."],
      ["The amount of electricity used each day to charge all of their devices", "That is energy use, not a digital footprint."],
      ["The password they use to unlock their phone screen", "A password protects a device; it is not a footprint."],
    ],
    answer: "A",
    explanation: "Everything a person posts, likes, shares or searches leaves a digital footprint, which may affect their reputation later.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which is a **positive** effect of ICT on family life?",
    options: [
      ["Parents working far away can keep guiding their children by video call", "Correct: ICT keeps family bonds and guidance going across distance."],
      ["Family members eat meals in silence while each looks at a phone", "This reduces family interaction: a negative effect."],
      ["Children learn to ignore their elders' advice in favour of online trends", "This weakens family values: a negative effect."],
      ["Young people share family photos with strangers online", "This creates privacy and safety risks."],
    ],
    answer: "A",
    explanation: "Voice and video calls help families separated by work or migration to stay close and keep socialising their children.",
  });
  b.mcq({
    d: 2, skill: "APPLICATION",
    stem: "A stranger online asks Tafadzwa for her school name and home address so he can \"send a gift\". What should she do?",
    options: [
      ["Refuse, stop the chat and tell a trusted adult", "Correct: never share personal details with strangers; report it."],
      ["Send only her school name, which is less private", "Any identifying detail can help a stranger find her."],
      ["Ask him for his own address before she replies", "Continuing to engage with a stranger is risky."],
      ["Agree to meet him in a public place instead", "Meeting an online stranger is dangerous, even in public."],
    ],
    answer: "A",
    explanation: "Personal information (address, school, location, ID number) must never be shared with online strangers. Tell a trusted adult and report the account.",
  });
  b.mcq({
    d: 3, skill: "ANALYSIS",
    stem: "Why is ICT described as an especially **powerful** agent of socialisation?",
    options: [
      ["One device brings together family, peers, media, learning and worship", "Correct: a phone combines many agents and is used for many hours a day."],
      ["Only government bodies can publish content on the internet", "Anyone can publish online; that is one of its risks."],
      ["It is used only by adults, who then teach their children", "Young people are among the heaviest users of ICT."],
      ["It completely replaces the need for the family and the school in society", "ICT adds to these agents; it does not replace them."],
    ],
    answer: "A",
    hints: ["Think of all the things a young person does on one phone in a day."],
    explanation: "ICT combines the influence of many agents and is constantly available, so its effect on values and behaviour is strong.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "During school closures, many learners used phones, radio and the internet to continue their studies. Which positive effect of ICT does this show?",
    options: [
      ["Access to learning when schools cannot open", "Correct: online and broadcast lessons kept learning going."],
      ["Promotion of indigenous ceremonies", "Online lessons are about schoolwork, not ceremonies."],
      ["Protection from all false information", "ICT does not protect people from false information."],
      ["Reduction of screen time for learners", "Online learning increased screen time."],
    ],
    answer: "A",
    hints: ["What did learners need when they could not go to school?"],
    explanation: "ICT allows distance learning, for example when schools close during a pandemic.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which argument **best** shows that ICT can help preserve indigenous values rather than only threaten them?",
    options: [
      ["Elders' voice notes of folk tales and totem praises reach relatives far away", "Correct: ICT records and spreads heritage to young people who live far from home."],
      ["Young people copy fashions from foreign music videos", "This is an argument that ICT spreads foreign values."],
      ["Many teenagers now spend far more time online than with their own grandparents", "This supports the view that ICT threatens indigenous values."],
      ["Group chats often use slang instead of indigenous languages", "This also supports the threat argument."],
    ],
    answer: "A",
    hints: ["Which option shows heritage being passed on through ICT?"],
    explanation: "ICT can record and share oral traditions, language and history, so its effect on indigenous values depends on how it is used.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "A message deleted from social media can never be found again, so careless posts have no lasting effect.",
    answer: false,
    explanation: "False. Others may have saved, copied or shared it. Posts form a lasting digital footprint.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING",
    stem: "Mobile money and online selling can help young people learn enterprise skills.",
    answer: true,
    explanation: "True. ICT gives young people tools to run small businesses, which is one of its positive effects.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each ICT problem with a responsible action.",
    pairs: [
      ["A classmate is being insulted in a group chat", "Keep evidence and report it to a trusted adult"],
      ["A message asks you to send a code from your phone", "Do not share it; it may be a scam"],
      ["You spend hours online and your marks are falling", "Set screen-time limits and phone-free study times"],
      ["A stranger asks for your location", "Refuse, block and report the account"],
    ],
    explanation: "Safe ICT use means reporting abuse, protecting codes and personal details, and managing screen time.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentence.",
    template: "Mobile phones, computers and the internet are examples of {{blank:a}}, which became important in socialisation because one device combines many {{blank:b}} of socialisation.",
    blanks: [
      { id: "a", accepted: ["ICT"], choices: ["ICT", "print media", "folklore", "totems"] },
      { id: "b", accepted: ["agents"], choices: ["agents", "totems", "sanctions", "courts"] },
    ],
    explanation: "ICT (Information and Communication Technologies) combines family, peers, media, learning and more in one device.",
  });
  b.short({
    d: 2, skill: "RECALL", daily: true,
    stem: "What does the abbreviation **ICT** stand for?",
    accepted: ["Information and Communication Technologies", "Information and Communication Technology", "Information and Communications Technology", "Information and Communications Technologies", "Information Communication Technology", "Information Communication Technologies"],
    wrong: ["Internet Communication Tools"],
    explanation: "ICT stands for **Information and Communication Technologies**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** ways of staying safe online.",
    points: ["Keep personal information (address, location, ID number) private", "Use strong, secret passwords / privacy settings", "Any one of: do not meet online strangers, report abuse, check links before clicking, think before posting"],
    modelAnswer: "Keep personal details private, use strong passwords and privacy settings, and never meet an online stranger.",
    explanation: "One mark per correct safety measure.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** negative effects of ICT on the socialisation of young people.",
    points: [
      "Identifies e.g. addiction / long screen time",
      "Develops: less study, sleep, exercise and family time",
      "Identifies e.g. cyberbullying / harmful content / loss of indigenous values",
      "Develops: e.g. distress and dropping out, copying violent behaviour, disrespect for elders",
    ],
    modelAnswer: "Young people can become addicted to their phones, spending hours online instead of studying, sleeping or talking with family. They may also be cyberbullied, which causes distress and can make them stay away from school.",
    hints: ["Name the effect, then explain the harm to the young person."],
    explanation: "Two marks per effect: identify, then develop.",
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Suggest **two** measures a school could take to reduce cyberbullying among its learners.",
    points: [
      "Suggests e.g. a clear code of conduct on online behaviour with sanctions",
      "Explains: learners know that online bullying has consequences",
      "Suggests e.g. lessons on online respect, peer support or a confidential reporting system",
      "Explains: victims and bystanders report it early and learners understand its harm",
    ],
    modelAnswer: "The school could include online behaviour in its code of conduct, with sanctions for cyberbullying, so learners know it has consequences. It could also set up a confidential way to report bullying and teach lessons on online respect, so victims and bystanders speak up early.",
    hints: ["Think of rules, education and reporting."],
    explanation: "Credit realistic measures, each explained (problem solving).",
  });
  b.struct({
    d: 3, skill: "ANALYSIS",
    stem: "A fictional youth club in Mutare asked 50 members aged 15-17 how many hours a day they spend on their phones outside school. The results are invented for this question.\n\n" +
      table(["Hours a day", "Number of members"], [["Less than 1", 6], ["1 to 3", 19], ["More than 3 up to 5", 15], ["More than 5", 10]]),
    parts: [
      P.fib({
        label: "(a)",
        stem: "Use the table.",
        template: "The number of members who spend more than 3 hours a day on their phones is {{blank:a}}.",
        blanks: [{ id: "a", accepted: ["25"], wrong: "15" }],
        explanation: "15 + 10 = 25 members spend more than 3 hours a day.",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Suggest **two** ways in which members spending more than 5 hours a day may be affected.",
        points: ["Less time for study / homework, so results may fall", "Any one of: less sleep, less exercise, less family time, risk of addiction"],
        modelAnswer: "They may have less time for homework, so their results fall, and they may sleep too little.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Describe **three** things the youth club could do to encourage balanced phone use.",
        points: ["Organise offline activities (sport, drama, clean-ups)", "Run a session on screen-time limits / digital well-being", "Encourage useful online activities (revision, skills) or phone-free times"],
        modelAnswer: "The club could organise more sport and drama, run a session on setting screen-time limits, and encourage members to use phones for revision and skills rather than only entertainment.",
      }),
    ],
    hints: ["In (a), add the two rows above 3 hours."],
    explanation: "Invented survey data used to analyse screen time and suggest solutions.",
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Answer the questions on ICT and socialisation.",
    parts: [
      P.manual({
        label: "(a)", marks: 2,
        stem: "Give **two** examples of ICT used by young people.",
        points: ["One device or tool, e.g. mobile phone, computer, tablet", "Another, e.g. the internet, social networking, messaging apps, email"],
        modelAnswer: "Mobile phones and social networking platforms.",
      }),
      P.manual({
        label: "(b)", marks: 4,
        stem: "Describe **two** positive effects of ICT on the socialisation of young people.",
        points: ["Access to information and learning", "e.g. revision videos, online classes during school closures", "Communication with family and friends / enterprise / sharing heritage", "e.g. video calls with parents working away; mobile money; folk tales in indigenous languages"],
        modelAnswer: "ICT gives young people access to information and learning, such as revision videos and online lessons during school closures. It also keeps them in touch with family, for example through video calls with parents who work in another town, so family guidance continues.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"ICT has done more harm than good to the socialisation of young Zimbabweans.\" Discuss.",
        points: [
          ["Harm: cyberbullying, addiction, harmful content and false information", 2],
          ["Harm: foreign trends and less time with elders weaken indigenous values; privacy risks and digital footprint", 2],
          ["Good: learning, family communication, enterprise skills, sharing heritage and participation", 2],
          ["Supported judgement, e.g. effect depends on guidance, rules and media literacy", 2],
        ],
        levels: levels(8),
        modelAnswer: "ICT has caused real harm. Cyberbullying hurts many young people, long hours online reduce study and sleep, and harmful content and false information spread easily. Some young people copy foreign trends and spend less time learning from elders, which weakens values such as respect.\n\nHowever, ICT has also done much good. It gives access to information and lessons, keeps families in touch when parents work far away, teaches digital and business skills through mobile money and online selling, and allows elders' stories and music in indigenous languages to reach young people.\n\nOverall, ICT itself is neither good nor bad. Where families, schools and communities set rules and teach safe, critical use, the good outweighs the harm; without that guidance, the harm can be greater.",
      }),
    ],
    hints: ["In (c), give at least two points on each side and a clear conclusion."],
    explanation: "Recall (a), describe (b) and discuss (c) the effects of ICT.",
  });

  b.card("DEFINITION", "ICT", "Information and Communication Technologies: phones, computers, the internet, email, messaging and social networking.");
  b.card("DEFINITION", "Cyberbullying", "Using phones or the internet to threaten, insult, embarrass, exclude or spread rumours about someone.");
  b.card("DEFINITION", "Digital footprint", "The lasting record of everything a person posts, shares, likes or searches online.");
  b.card("DEFINITION", "Online safety", "Protecting yourself and others online: private details, strong passwords, no meeting strangers, reporting abuse.");
  b.card("CONCEPT", "Why is ICT a powerful agent of socialisation?", "One device combines family, peers, media, learning and worship, and is used for many hours a day.");
  b.card("CONCEPT", "Name three positive effects of ICT on socialisation.", "Access to learning; communication with distant family; enterprise skills; sharing heritage; participation.");
  b.card("CONCEPT", "Name three negative effects of ICT on socialisation.", "Cyberbullying; addiction; harmful content; false information; loss of indigenous values; privacy risks.");
  b.card("CONCEPT", "What should you do if you are cyberbullied?", "Do not reply with abuse; keep evidence; block and report; tell a trusted adult.");
  b.card("CONCEPT", "How can ICT help preserve heritage?", "By recording and sharing folk tales, totem praises, music and history in indigenous languages.");
});
