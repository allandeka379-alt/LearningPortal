// W4a: Religion and HIV and AIDS. Health facts follow Ministry of Health and Child Care / WHO public messages; no statistics.
import { concept, P, source, levels, ref } from "../lib.mjs";

concept("frs.ethics.hiv-aids", { file: "ethics/hiv-aids", keyPrefix: "ethics.hiv-aids" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What does the letter A in AIDS stand for?",
    options: [
      ["Acquired", "Correct: Acquired Immune Deficiency Syndrome."],
      ["Active", "Not part of the name."],
      ["Adult", "Not part of the name."],
      ["Ancestral", "Not part of the name."],
    ],
    answer: "A",
    explanation: "AIDS stands for **Acquired** Immune Deficiency Syndrome, the advanced stage of HIV infection.",
  });
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which of the following can spread HIV?",
    options: [
      ["Unprotected sex with a person who has HIV", "Correct: one of the main ways."],
      ["Sharing a plate of food with a person who has HIV", "HIV is not spread by sharing food."],
      ["Shaking hands with a person who has HIV", "HIV is not spread by shaking hands."],
      ["Being bitten by a mosquito in a village", "HIV is not spread by mosquitoes."],
    ],
    answer: "A",
    explanation: "HIV is spread by **unprotected sex**, by blood and from mother to child, not by everyday contact.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "What does antiretroviral therapy (ART) do for a person living with HIV?",
    options: [
      ["It reduces the virus so the person can stay healthy for many years", "Correct: ART controls the virus."],
      ["It removes the virus completely so no further medicine is ever needed", "ART does not cure HIV; it must be taken as directed."],
      ["It prevents the person from ever passing the virus to a baby", "Treatment in pregnancy reduces the risk greatly but health workers' advice must be followed."],
      ["It is needed only when a person has no symptoms of illness at all", "ART is taken daily as advised by a health worker."],
    ],
    answer: "A",
    explanation: "ART reduces the amount of virus so people stay healthy. It does **not cure** HIV and must be taken as the health worker directs.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which Bible passage teaches that visiting the sick is service to Jesus himself?",
    options: [
      [ref("Matthew", 25, "35-40"), "Correct: 'whatever you did for the least of these'."],
      [ref("Deuteronomy", 6, "4-9"), "This passage is the Shema."],
      [ref("Acts", 2), "This chapter describes Pentecost."],
      [ref("Exodus", 20), "This chapter contains the Ten Commandments."],
    ],
    answer: "A",
    explanation: `**${ref("Matthew", 25, "35-40")}** teaches that care for the sick, hungry and imprisoned is service to Jesus.`,
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Which value in Indigenous Religion supports care for orphans and the sick by the extended family?",
    options: [
      ["Unhu/ubuntu", "Correct: a person is a person through other people."],
      ["Mukwerera", "Mukwerera is a rain-making ceremony."],
      ["Mutupo (the totem)", "Mutupo is the totem."],
      ["Chisi", "Chisi is a rest day."],
    ],
    answer: "A",
    explanation: "**Unhu/ubuntu** teaches that people belong to one another, so the extended family cares for the sick and orphans.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Farai's friend, who is living with HIV, says that the pastor told him to stop taking ART because he has been prayed for. What is the best advice, according to health workers and most religious leaders?",
    options: [
      ["Continue ART and pray too, since prayer and medicine belong together", "Correct: this is the advice of health workers and most leaders."],
      ["Stop the medicine at once, because the pastor's word is more important", "Stopping ART can seriously harm his health."],
      ["Take the medicine only when he feels weak and sick", "ART must be taken as directed, every day."],
      ["Keep the status secret from everyone, including the nurse", "The health worker needs to know and support him."],
    ],
    answer: "A",
    hints: ["Remember what religious leaders say about prayer and medicine."],
    explanation: "Health workers and most religious leaders say that **prayer and medicine belong together**, and that people must not stop ART without advice from a health worker.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which statement about religious views on condoms is accurate?",
    options: [
      ["The Catholic Church teaches abstinence and fidelity; many others accept condoms", "Correct: views differ."],
      ["All religions forbid the use of condoms in every circumstance and in every country", "Many religious teachers accept condom use for protection."],
      ["All religions require the use of condoms before marriage as a religious duty", "Religions teach abstinence before marriage."],
      ["No religion has said anything about HIV prevention or care for the sick at all", "Religious bodies have been active in prevention."],
    ],
    answer: "A",
    hints: ["Look for the answer that says views differ."],
    explanation: "Views on condoms **differ**: the Catholic Church teaches abstinence and fidelity, while many Protestant, Muslim and Jewish teachers accept condoms for protection.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "Why does stigma make the HIV epidemic worse?",
    options: [
      ["People who fear rejection avoid testing and treatment, so the virus may spread", "Correct: fear stops people seeking care."],
      ["Stigma makes people more likely to follow health advice given by clinics and nurses", "Stigma has the opposite effect."],
      ["Stigma has no effect on whether a person goes for a test", "Fear of rejection stops many people."],
      ["Stigma is a way that religions protect the community from infection", "Religions teach compassion; stigma does not protect anyone."],
    ],
    answer: "A",
    hints: ["Think about what a person fears when deciding whether to visit the clinic."],
    explanation: "**Stigma** leads to fear of rejection, so people delay testing and treatment, which allows the virus to spread and harms health.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "HIV can be spread by shaking hands or by sharing a plate of food.",
    answer: false,
    explanation: "False. HIV is not spread by shaking hands, hugging, sharing plates, toilets or mosquitoes.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "HIV testing should be voluntary and confidential.",
    answer: true,
    explanation: "True. Health workers insist that testing is voluntary and confidential, with counselling.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each source or idea with the religion it comes from.",
    pairs: [["Unhu/ubuntu and kinship care", "Indigenous Religion"], ["Bikur cholim (visiting the sick)", "Judaism"], ["James 1:27 (care for orphans and widows)", "Christianity"], ["Qur'an 93:9 (do not oppress the orphan)", "Islam"]],
    explanation: "Unhu: Indigenous Religion. Bikur cholim: Judaism. James 1:27: Christianity. Qur'an 93:9: Islam.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A mark of shame attached to a person is called {{blank:a}}; the medicine that lets a person with HIV stay healthy is called {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["stigma"], choices: ["stigma", "tithe", "taboo", "totem"] },
      { id: "b", accepted: ["ART"], choices: ["ART", "ORS", "BCG", "PEP"] },
    ],
    explanation: "**Stigma** is a mark of shame; **ART** (antiretroviral therapy) is the daily medicine.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What word describes the way you refer to a person with HIV in non-stigmatising language: people living with ___ ?",
    accepted: ["HIV"],
    wrong: ["AIDS", "sin"],
    explanation: "We say **people living with HIV**. This language avoids blame and shame.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "Identify **three** ways in which a church or mosque can respond to HIV and AIDS in its community.",
    points: ["Teaching prevention messages", "Running or supporting clinics, testing or home-based care", "Caring for orphans and speaking out against stigma"],
    modelAnswer: "A church or mosque can teach prevention messages, run or support clinics, testing and home-based care, and care for orphans while speaking out against stigma.",
    explanation: "One mark for each response.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** harmful effects of stigma on a person living with HIV.",
    points: [
      ["A first effect, such as rejection by family or friends", 1],
      ["Developed: the person may lose support and feel shame", 1],
      ["A second effect, such as delay in testing and treatment", 1],
      ["Developed: the person's health may worsen and the virus may be passed on", 1],
    ],
    modelAnswer: "Stigma may lead to rejection by family or friends, so the person loses support and feels shame. It may also delay testing and treatment, so the person's health may worsen and the virus may be passed on.",
    hints: ["Think about relationships and about health."],
    explanation: "One mark for each effect and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "ANALYSIS", marks: 6,
    stem: "Explain **two** ways in which religious teaching can help to reduce stigma against people living with HIV.",
    points: [
      ["Teaching of compassion and care for the sick", 1],
      ["Developed: for example Matthew 25:35-40, bikur cholim or unhu teach that the sick should be visited and supported", 2],
      ["Teaching that every person has dignity", 1],
      ["Developed: leaders can preach that HIV is a health condition and not a measure of a person's worth, so members welcome people living with HIV", 2],
    ],
    modelAnswer: "Religion teaches compassion and care for the sick. Matthew 25:35-40, bikur cholim and unhu teach that the sick should be visited and supported, so members are encouraged to care. Religions also teach that every person has dignity. Leaders can preach that HIV is a health condition and not a measure of a person's worth, so members welcome people living with HIV.",
    hints: ["Give one teaching about compassion and one about dignity."],
    explanation: "Two ways, each stated (1) and developed (2).",
  });
  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "a notice from a fictional church in Marondera, 2026",
      "Our congregation will hold a health day on Saturday. A nurse from the local clinic will explain how HIV is spread and prevented and will offer free, confidential testing for those who wish. Our volunteers will visit the sick in their homes every week, and our school-fees fund will help children who have lost a parent. People living with HIV are welcome in our support group. Please come, and bring a friend."
    ) + "\n\nStudy Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)", stem: "According to Source A, who will explain how HIV is spread and prevented?",
        options: [
          ["A nurse from the local clinic", "Correct: the source names the nurse."],
          ["The pastor of the local church", "The source does not say this."],
          ["A traditional healer", "The source does not say this."],
          ["A teacher from the school", "The source does not say this."],
        ],
        answer: "A", explanation: "The notice says a nurse from the local clinic will explain.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "State **three** ways in which the congregation in Source A is helping its community.",
        points: ["Holding a health day with information and free, confidential testing", "Volunteers visiting the sick in their homes", "A school-fees fund for children who have lost a parent, and a support group"],
        modelAnswer: "The congregation holds a health day with information and free, confidential testing, volunteers visit the sick at home, and a school-fees fund helps children who have lost a parent.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain how the activities in Source A put Christian teaching into practice.",
        points: [["Visiting the sick follows Matthew 25:35-40", 1], ["Supporting orphans follows James 1:27", 1], ["Offering testing and information shows care for life", 1], ["Welcoming people living with HIV challenges stigma", 1]],
        modelAnswer: "Visiting the sick follows Matthew 25:35-40, and supporting children who have lost a parent follows James 1:27. Offering testing and information shows care for life, and welcoming people living with HIV challenges stigma.",
      }),
    ],
    hints: ["In (c) link each activity to a Bible passage or a Christian value."],
    explanation: "The source shows prevention, care and support working together.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Chipo says: \"Religious bodies have done more to help people living with HIV than to harm them.\" Themba says: \"Some religious attitudes have made stigma worse.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which religious bodies have helped people affected by HIV and AIDS.",
        points: [["A first way", 2, ["Home-based care for the sick", "Support for orphans, such as school fees", "Clinics and testing", "Support groups"]], ["A second way", 2]],
        modelAnswer: "Churches and mosques have organised home-based care, where volunteers visit the sick and help with food. They have also supported orphans with school fees and food.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 220 },
        stem: "Discuss the views of Chipo and Themba.",
        points: [
          ["Chipo: religious bodies have run clinics, care and support groups and cared for orphans", 2],
          ["Developed: the teaching of compassion (Matthew 25:35-40, unhu) motivates volunteers", 1],
          ["Themba: some leaders have blamed the sick or taught that prayer replaces ART, and stigma has delayed testing", 2],
          ["Developed: other leaders now speak against stigma and urge members to attend the clinic", 1],
          ["A supported conclusion", 2],
        ],
        levels: levels(8),
        modelAnswer: "Chipo is right that religious bodies have done a great deal: churches and mosques run clinics and home-based care, support orphans and host support groups. Their teaching of compassion, such as Matthew 25:35-40 and unhu, motivates volunteers.\n\nThemba is also right that some leaders have blamed the sick or taught that prayer replaces ART, and this has delayed testing and increased stigma. However, many leaders now speak against stigma and urge members to attend the clinic. I think the help has been greater than the harm, but the harm shows why religious teaching must go hand in hand with accurate health information.",
        explanation: "Level marking: both views developed, with examples, and a supported conclusion.",
      }),
    ],
    hints: ["In (b) give examples of help and of harm before judging."],
    explanation: "Practice question on the religious response to HIV and AIDS.",
  });

  b.card("DEFINITION", "What is HIV?", "The Human Immunodeficiency Virus, which attacks the body's immune system.");
  b.card("DEFINITION", "What is AIDS?", "Acquired Immune Deficiency Syndrome, the advanced stage of HIV infection when the immune system is badly damaged.");
  b.card("FACT", "Name the three main ways HIV is transmitted.", "Unprotected sex, blood, and from mother to child in pregnancy, birth or breastfeeding.");
  b.card("FACT", "What does ART do?", "It reduces the virus so a person living with HIV stays healthy; it is not a cure.");
  b.card("FACT", "Which Bible passage teaches that visiting the sick is service to Jesus?", "Matthew 25:35-40.", "James 1:27 teaches care for orphans and widows.");
  b.card("CONCEPT", "Why does stigma make the HIV epidemic worse?", "It stops people from testing and getting treatment because they fear rejection.");
  b.card("CONCEPT", "What do most religious leaders and health workers say about prayer and ART?", "Prayer and medicine belong together; people should not stop ART.");
  b.card("CONCEPT", "Name two ways religious bodies respond to HIV.", "Home-based care and support for orphans (also clinics, prevention messages, support groups).");
});
