// W2a: Gender-based violence and gender advocacy (her.rights.gender-based-violence).
// Reviewer note: Domestic Violence Act 2007 features given in outline (wide definition, protection orders from a
// magistrates court, Anti-Domestic Violence Council). No helpline numbers or statistics are given.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.rights.gender-based-violence", { file: "rights/gender-based-violence", keyPrefix: "rights.gender-based-violence" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "In which year was Zimbabwe's Domestic Violence Act passed?",
    options: [
      ["2007", "Correct: the Domestic Violence Act dates from 2007."],
      ["1982", "1982 is the Legal Age of Majority Act."],
      ["2013", "2013 is the year of the present Constitution."],
      ["1987", "1987 is the year of the Unity Accord."],
    ],
    answer: "A",
    explanation: "The Domestic Violence Act was passed in 2007.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Taking a partner's wages and refusing her money for food as a punishment is which type of gender-based violence?",
    options: [
      ["economic abuse", "Correct: controlling or taking money is economic abuse."],
      ["physical abuse", "Physical abuse involves force that injures the body."],
      ["sexual abuse", "Sexual abuse involves sexual acts without consent."],
      ["a gender stereotype", "A stereotype is a belief, not an act of abuse."],
    ],
    answer: "A",
    explanation: "Economic abuse includes taking a person's earnings or withholding money to control or punish them.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "What is a **protection order** under the Domestic Violence Act?",
    options: [
      ["A court order telling an abuser to stop the abuse and stay away", "Correct: a magistrates court can grant one."],
      ["A certificate that registers a customary marriage", "Marriage registration is a different matter."],
      ["A police permit allowing a person to carry a weapon", "This has nothing to do with protection orders."],
      ["An order that transfers all of the abuser's property to the local chief", "Protection orders do not transfer property to chiefs."],
    ],
    answer: "A",
    explanation: "A person who is being abused can apply to a magistrates court for a protection order that orders the abuser to stop.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which organisation works mainly with **men and boys** to promote gender equality and prevent gender-based violence?",
    options: [
      ["Padare/Enkundleni Men's Forum on Gender", "Correct: it engages men in gender equality."],
      ["Zimbabwe Electoral Commission (ZEC)", "ZEC runs elections."],
      ["Environmental Management Agency (EMA)", "EMA protects the environment."],
      ["Grain Marketing Board", "The GMB manages grain reserves."],
    ],
    answer: "A",
    explanation: "Padare/Enkundleni Men's Forum on Gender works with men and boys to challenge harmful ideas of masculinity.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Thandeka's boyfriend constantly insults her, checks her phone and stops her from seeing her friends. Which type of abuse is this?",
    options: [
      ["emotional or psychological abuse", "Correct: insults, control and isolation are emotional abuse."],
      ["economic abuse of a partner", "There is no mention of money or property."],
      ["physical abuse", "There is no mention of force or injury."],
      ["a lawful expression of love and care", "Control and insults are abuse, not love."],
    ],
    answer: "A",
    hints: ["Is the harm to her body, her money or her mind and freedom?"],
    explanation: "Insults, controlling behaviour and isolating a person from friends are emotional or psychological abuse.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which police unit deals with cases involving women and children in a private and sensitive way?",
    options: [
      ["the Victim Friendly Unit", "Correct: it handles cases involving women and children sensitively."],
      ["the Traffic Section", "This unit deals with roads and vehicles."],
      ["the Support Unit", "This unit is not the one that handles such cases."],
      ["the Border Control and Immigration Unit", "This unit deals with borders."],
    ],
    answer: "A",
    hints: ["Its name describes how it treats victims."],
    explanation: "The police Victim Friendly Unit handles cases involving women and children privately and sensitively.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does **economic dependence** make it harder for some survivors to escape abuse?",
    options: [
      ["They may have no income or home of their own to go to", "Correct: without money or shelter, leaving is very hard."],
      ["The law forbids survivors who have no income from reporting abuse", "No such law exists; anyone can report."],
      ["Economic dependence makes abuse legal under the Act", "Abuse is unlawful whatever a person's income."],
      ["Courts accept cases only from people who own land", "Courts do not require land ownership."],
    ],
    answer: "A",
    hints: ["What does a person need in order to leave?"],
    explanation: "A survivor who depends on the abuser for money and shelter may fear having nowhere to go, which is why shelters and economic support matter.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the **most valid** weakness of gender advocacy organisations?",
    options: [
      ["Many depend on donor funding and reach remote areas less easily", "Correct: funding and reach are real limits."],
      ["They have had no effect on any law", "Wrong: advocacy contributed to laws such as the Domestic Violence Act."],
      ["They refuse to help survivors of any kind", "Wrong: many offer counselling, shelter and legal aid."],
      ["They work only with men and boys, and never with women or girls", "Wrong: most support women and girls."],
    ],
    answer: "A",
    hints: ["Choose the weakness supported by evidence."],
    explanation: "Advocacy has achieved a great deal, but dependence on donors and difficulty reaching remote areas limit it.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Gender-based violence can take emotional and economic forms as well as physical ones.",
    answer: true,
    explanation: "True. GBV may be physical, sexual, emotional or economic.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Only women and girls can experience gender-based violence.",
    answer: false,
    explanation: "False. Most survivors are women and girls, but men and boys can also experience GBV.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each example with the type of gender-based violence.",
    pairs: [
      ["slapping and kicking a partner", "physical abuse"],
      ["threatening and humiliating a partner", "emotional abuse"],
      ["taking a partner's salary every month", "economic abuse"],
      ["forcing a girl into marriage", "sexual abuse and a harmful practice"],
    ],
    explanation: "Physical abuse uses force; emotional abuse uses threats and humiliation; economic abuse controls money; forced child marriage is sexual abuse and an illegal harmful practice.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the sentences.",
    template: "The 16 Days of Activism against Gender-Based Violence run each year from 25 November to {{blank:a}}. The Domestic Violence Act set up the Anti-Domestic Violence {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["10 December"], choices: ["10 December", "22 December", "18 April", "25 May"] },
      { id: "b", accepted: ["Council"], choices: ["Council", "Commission", "Court", "Bank"] },
    ],
    explanation: "The 16 Days run from 25 November to 10 December; the Act set up the Anti-Domestic Violence Council. 22 December is Unity Day; 18 April Independence Day; 25 May Africa Day.",
  });
  b.fib({
    d: 3, skill: "APPLICATION",
    stem: "Read the scenario and complete the sentence.",
    template: "Rudo's husband beats her and threatens to do so again. She can apply to the {{blank:a}} court for a protection order and report the assault to the police {{blank:b}} Unit.",
    blanks: [
      { id: "a", accepted: ["magistrates"], choices: ["magistrates", "Constitutional", "Labour", "Administrative"] },
      { id: "b", accepted: ["Victim Friendly"], choices: ["Victim Friendly", "Traffic", "Border Control", "Tourism"] },
    ],
    hints: ["Which court deals with protection orders in her area?"],
    explanation: "Protection orders are granted by magistrates courts; the police Victim Friendly Unit handles such cases sensitively.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Name **one** organisation in Zimbabwe that supports survivors of gender-based violence or advocates for gender equality.",
    accepted: ["Msasa Project", "Musasa Project", "Msasa", "Musasa", "Padare", "Enkundleni", "Padare/Enkundleni Men's Forum on Gender", "Padare Men's Forum on Gender", "Zimbabwe Women Lawyers Association", "ZWLA"],
    wrong: ["ZEC", "Grain Marketing Board"],
    explanation: "Examples: **Msasa Project**, **Padare/Enkundleni Men's Forum on Gender**, the **Zimbabwe Women Lawyers Association**.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 4,
    stem: "State **four** causes of gender-based violence.",
    points: [
      "Any one of: unequal power between men and women, cultural attitudes/stereotypes, alcohol and drug abuse, poverty/economic dependence, stress/unemployment, jealousy, lack of awareness of rights and the law, learned behaviour",
      "A second cause",
      "A third cause",
      "A fourth cause",
    ],
    modelAnswer: "Unequal power between men and women, alcohol abuse, poverty and lack of awareness of the law.",
    explanation: "One mark per correct cause.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** effects of gender-based violence on children in the family.",
    points: [
      "Identifies fear, trauma or poor mental health",
      "Explains that children who live with violence may become anxious or depressed and struggle at school",
      "Identifies learned behaviour / dropping out of school / loss of family income",
      "Explains, e.g. children may repeat violence as adults / family breakdown reduces money for fees",
    ],
    modelAnswer: "Children who live with violence are often frightened and anxious, which makes it hard to concentrate, so their schoolwork suffers. They may also learn that violence is normal and repeat it in their own relationships later.",
    hints: ["Think of children's feelings now and their behaviour later."],
    explanation: "One mark for each effect and one for its explanation.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "A friend tells you that she is being abused at home. Suggest **two** things you should do, and explain why.",
    points: [
      "Suggests listening calmly, believing her and not blaming her",
      "Explains that this helps her feel safe and more likely to seek help",
      "Suggests encouraging her to tell a trusted adult (teacher, counsellor, parent) or helping her contact the police Victim Friendly Unit or a support organisation",
      "Explains that trained adults and services can protect her; a young person cannot handle it alone",
    ],
    modelAnswer: "I should listen calmly, believe her and not blame her, so she feels safe and is more willing to seek help. I should then encourage her to tell a trusted adult such as a teacher or school counsellor, or help her contact the police Victim Friendly Unit or a support organisation, because trained adults can protect her in ways that I cannot.",
    hints: ["Think of what she needs from you now and who can protect her."],
    explanation: "Credit supportive, safe actions (1 each) with explanations (1 each). Never suggest confronting the abuser.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a poster of the kind used in campaigns against gender-based violence, described in words",
      "The poster shows a woman standing in a doorway, her face turned away. Above her are the words: \"Abuse is not only bruises.\" Beneath are three small pictures: a man shouting, a hand taking banknotes from a purse, and a phone screen full of angry messages. At the bottom it reads: \"Speak to someone you trust. Visit a clinic. Contact the police Victim Friendly Unit.\"", { described: true }) +
      "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "What is the **main** message of the poster?",
        options: [
          ["Abuse includes emotional and economic harm as well as physical harm", "Correct: 'not only bruises' with pictures of shouting, money and messages."],
          ["Abuse happens only when a person is physically injured", "The poster says the opposite."],
          ["Women should avoid using mobile phones and social media altogether", "The phone picture shows abusive messages, not advice to avoid phones."],
          ["Abuse should be kept secret within the family", "The poster urges people to speak out."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Identify **two** types of gender-based violence shown in the small pictures.",
        points: ["Emotional/verbal abuse (shouting, angry messages)", "Economic abuse (taking money from a purse)"],
        modelAnswer: "Emotional abuse, shown by shouting and angry messages, and economic abuse, shown by taking money from a purse.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain how a poster like this could help to reduce gender-based violence.",
        points: [
          "It raises awareness that non-physical abuse is also abuse",
          "It tells survivors where to get help (trusted person, clinic, Victim Friendly Unit)",
          "It encourages people to speak out, reducing silence and stigma / may make abusers aware their behaviour is wrong",
        ],
        modelAnswer: "The poster shows that shouting, controlling money and abusive messages are also abuse, which raises awareness. It tells survivors where to get help: a trusted person, a clinic or the Victim Friendly Unit. It encourages people to speak out, reducing silence and stigma, and may make abusers realise that their behaviour is wrong.",
      }),
    ],
    hints: ["Read the words on the poster carefully."],
    explanation: "A source-based practice item on types of GBV and advocacy.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about gender advocacy in Zimbabwe.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the work of **two** organisations that advocate for gender equality or support survivors of gender-based violence.",
        points: [
          ["Msasa Project: counselling, shelter, legal information for survivors; campaigns against GBV", 2],
          ["Padare/Enkundleni Men's Forum on Gender: works with men and boys to change harmful attitudes / or Zimbabwe Women Lawyers Association: legal aid and law reform", 2],
        ],
        modelAnswer: "Msasa Project supports survivors of gender-based violence with counselling, shelter and legal information, and campaigns to raise awareness. Padare/Enkundleni Men's Forum on Gender works with men and boys to challenge harmful ideas of masculinity and encourage them to support gender equality.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Gender advocacy has been effective in reducing gender-based violence in Zimbabwe.\" How far do you agree?",
        points: [
          ["For: raised awareness; contributed to the Domestic Violence Act and protection orders; services for survivors", 2],
          ["For: involving men and boys; 16 Days of Activism; more people know where to report", 2],
          ["Against: GBV continues; attitudes change slowly; donor dependence; weaker reach in rural areas; fear and stigma stop reporting; weak enforcement", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "There is evidence that advocacy has been effective. Organisations such as Msasa Project and the Zimbabwe Women Lawyers Association raised awareness and contributed to the Domestic Violence Act, which allows protection orders. Survivors can now get counselling, shelter and legal help, and campaigns such as the 16 Days of Activism tell people where to report. Men's forums such as Padare/Enkundleni help change attitudes among men.\n\nHowever, gender-based violence remains a serious problem. Attitudes change slowly, and many survivors still fear stigma or depend on their abusers financially. Many organisations rely on donor funding and reach rural areas less easily, and laws and protection orders are not always enforced.\n\nI agree only partly. Advocacy has been effective in changing the law, raising awareness and supporting survivors, but it has not yet greatly reduced GBV; that needs stronger enforcement, economic empowerment and continued change in attitudes.",
      }),
    ],
    hints: ["In (b), separate awareness and law from actual reduction in violence."],
    explanation: "A practice evaluative item on the effectiveness of gender advocacy.",
  });

  b.card("DEFINITION", "Gender-based violence", "Physical, sexual, emotional or economic harm done to a person because of their sex or gender, or arising from unequal power.");
  b.card("FACT", "Name the four main types of gender-based violence.", "Physical, sexual, emotional (psychological) and economic.");
  b.card("FACT", "What does the Domestic Violence Act (2007) allow a person who is being abused to do?", "Apply to a magistrates court for a protection order, and report the abuse to the police as a crime.");
  b.card("FACT", "Which body did the Domestic Violence Act set up?", "The Anti-Domestic Violence Council.");
  b.card("FACT", "Name three organisations working against GBV or for gender equality.", "Msasa Project; Padare/Enkundleni Men's Forum on Gender; Zimbabwe Women Lawyers Association.");
  b.card("CONCEPT", "Where can a survivor of GBV get help?", "A trusted adult, the police Victim Friendly Unit, a clinic, the magistrates court, the Department of Social Welfare, support organisations.");
  b.card("DEFINITION", "Advocacy", "Speaking up and campaigning publicly to change laws, policies, attitudes or practices.");
  b.card("CONCEPT", "Give two strengths and two weaknesses of gender advocacy.", "Strengths: raises awareness, contributed to law reform (and supports survivors). Weaknesses: donor dependence, weaker rural reach (and slow change in attitudes).");
  b.card("FACT", "When are the 16 Days of Activism against Gender-Based Violence?", "25 November to 10 December each year.");
});
