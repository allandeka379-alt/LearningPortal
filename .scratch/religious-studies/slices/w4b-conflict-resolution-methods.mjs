// W4b: Methods of managing and resolving conflict (Topic 15.3).
// Reviewer notes: Constitution sections 56, 69 and 282 are cited in outline (check numbering and the wording on chiefs' functions);
// Matthew 18:15-17 is paraphrased; ngozi compensation is described in outline and the old practice of giving a girl is stated
// as harmful and unlawful. Terms vatete (paternal aunt) and sekuru (maternal uncle) should be checked by a Shona speaker.
import { concept, P, source, levels } from "../lib.mjs";
import { mc, pmc, ms } from "../tables/w4b-helpers.mjs";

concept("frs.conflict.resolution-methods", { file: "conflict/resolution-methods", keyPrefix: "conflict.resolution-methods" }, (b) => {
  mc(b, 1, "RECALL", "Who helps the parties in a dispute to find their own agreement without imposing a decision?",
    ["A mediator", "Correct: a mediator is a neutral helper."],
    [["An arbitrator", "An arbitrator makes a decision that the parties accept."],
     ["A prosecutor", "A prosecutor presents a case against an accused person."],
     ["A witness", "A witness gives evidence of what he or she knows."]],
    "A **mediator** helps the parties to agree but does not impose a decision.");
  mc(b, 1, "RECALL", "What is the Ndebele name for the traditional gathering where elders hear a dispute?",
    ["Inkundla", "Correct: inkundla (Shona: dare)."],
    [["Umbuyiso", "Umbuyiso is the bringing-home ceremony for a dead person's spirit."],
     ["Isibongo", "Isibongo is a clan praise name."],
     ["Ilima", "Ilima is a work party."]],
    "The traditional gathering is the **inkundla** (Shona: *dare*).");
  mc(b, 2, "UNDERSTANDING", "Which method involves a neutral person who hears both sides and whose decision the parties agree in advance to accept?",
    ["Arbitration", "Correct: the arbitrator decides."],
    [["Dialogue", "Dialogue is open conversation between the parties."],
     ["Forgiveness", "Forgiveness is letting go of anger."],
     ["Negotiation", "Negotiation is direct bargaining between the parties."]],
    "In **arbitration** a neutral person decides and the parties accept the decision.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "According to Matthew 18, what is the first step when a believer has wronged another?",
    ["Speak to the person privately", "Correct: the first step is a private conversation."],
    [["Bring the matter before the whole congregation at once", "This is the last step, not the first."],
     ["Take the matter directly to a court of law", "The passage does not begin with a court."],
     ["Avoid the person and speak of the matter to no one", "The passage urges speaking to the person."]],
    "The first step is to **speak to the person privately**.", { daily: true });
  mc(b, 2, "UNDERSTANDING", "Why are aunts and uncles respected as mediators in family disputes?",
    ["They are trusted by both families and restore relationships", "Correct: they are neutral and respected."],
    [["They hold the power to punish people under the criminal law", "They have no such power."],
     ["They are paid by the state to decide every family quarrel", "They are not state officials for this purpose."],
     ["They never take part in family matters of any kind", "They often take part in family matters."]],
    "Aunts and uncles are **trusted by both sides** and work to restore relationships.");
  mc(b, 3, "APPLICATION", "Nokuthula and Farai both want the school computer. They talk directly, with no one else involved, and agree to take turns. Which method have they used?",
    ["Negotiation", "Correct: the parties bargained directly."],
    [["Mediation by a neutral person", "No third person helped them."],
     ["Arbitration by a panel of elders", "No one decided for them."],
     ["A case heard in a court of law", "No court was involved."]],
    "The pupils used **negotiation**, reaching a compromise directly.",
    { hints: ["Was anyone else involved in the discussion?"] });
  mc(b, 3, "ANALYSIS", "Study Source A.\n\n" + source("Source A", "an extract from a fictional district newspaper, Lupane, 2026",
    "At the inkundla, the two families each spoke and the elders asked questions about the old marker stones. The headman proposed a boundary and both families agreed. Afterwards the families shared a meal. One elder said that the neighbours would live side by side long after the dispute was forgotten.") + "\n\nWhich aim of the traditional method is shown most clearly in Source A?",
    ["Restoring the relationship as well as settling the dispute", "Correct: the families shared a meal after the agreement."],
    [["Punishing the family that was found to be in the wrong", "No punishment is described."],
     ["Avoiding any discussion of the facts of the dispute among the families", "The elders asked questions about the marker stones."],
     ["Passing the case to the high court for a final judgement", "The matter was settled at the inkundla."]],
    "The inkundla settled the dispute and also **restored the relationship** through an agreement and a shared meal.",
    { hints: ["Look at what the families did after the agreement."] });
  mc(b, 4, "EVALUATION", "Which judgement about traditional methods and the courts is best supported?",
    ["Each has strengths, and they often work best together", "Correct: traditional methods restore relationships; courts protect rights by law."],
    [["Traditional methods are always better than every other method", "Courts protect rights where traditional methods may not."],
     ["Courts are always better than every other method of settlement", "Traditional methods often restore relationships better."],
     ["Neither method has any value in settling a dispute today", "Both are used and valued."]],
    "Traditional methods **restore relationships** and the courts **protect rights under the law**, so they often work best together.",
    { hints: ["Choose the answer that recognises strengths on both sides."] });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "In arbitration, the parties agree in advance to accept the arbitrator's decision.",
    answer: true,
    explanation: "True. In arbitration a neutral person decides and the parties accept the decision.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A court of law should always be the first method tried when two people quarrel.",
    answer: false,
    explanation: "False. Gentler methods such as dialogue, negotiation and mediation are tried first; courts are usually a last resort.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each method with its meaning.",
    pairs: [
      ["Dialogue", "Open conversation in which each side speaks and listens"],
      ["Mediation", "A neutral person helps the parties find their own agreement"],
      ["Arbitration", "A neutral person decides and the parties accept"],
      ["Reconciliation", "Restoring the relationship after the dispute is settled"],
    ],
    explanation: "Each method plays a different part in managing or resolving conflict.",
  });
  b.fib({
    d: 3, skill: "RECALL",
    stem: "Choose the correct words.",
    template: "A {{blank:a}} helps the parties reach their own agreement, while an {{blank:b}} makes a decision that the parties accept.",
    blanks: [
      { id: "a", accepted: ["mediator"], choices: ["mediator", "witness", "prosecutor", "headmaster"] },
      { id: "b", accepted: ["arbitrator"], choices: ["arbitrator", "mediator", "witness", "pastor"] },
    ],
    hints: ["Think about who decides and who only helps."],
    explanation: "A **mediator** helps; an **arbitrator** decides.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the Shona word for the traditional gathering at which elders hear both sides of a dispute.",
    accepted: ["dare", "the dare", "dare remusha"],
    wrong: ["bira"],
    explanation: "It is the **dare** (Ndebele: *inkundla*).",
  });

  ms(b, 1, "RECALL", 3, "State **three** methods of resolving conflict.",
    ["Dialogue", "Negotiation or mediation", "Arbitration, reconciliation or forgiveness"],
    "Dialogue, negotiation or mediation, and arbitration, reconciliation or forgiveness.",
    "One mark for each method.");
  ms(b, 3, "UNDERSTANDING", 4, "Explain the difference between mediation and arbitration.",
    ["In mediation a neutral person helps the parties to talk", "The parties make their own agreement and the mediator does not impose a decision", "In arbitration a neutral person hears both sides", "The arbitrator makes a decision that the parties agreed in advance to accept"],
    "In mediation a neutral person helps the parties to talk, and the parties make their own agreement because the mediator does not impose a decision. In arbitration a neutral person hears both sides and makes a decision that the parties agreed in advance to accept.",
    "One mark for each point.",
    ["Say who decides in each method."]);
  ms(b, 4, "ANALYSIS", 6, "Explain **two** reasons why traditional methods such as the dare/inkundla are still valued.",
    [["They aim to restore relationships and not only to decide who is right", 1], ["Developed: neighbours and relatives will live together afterwards, so a settlement that restores respect lasts longer", 2],
     ["They are close to the people, with elders who know the families and the customs", 1], ["Developed: they are quick and cheaper than court cases, and people understand and trust the process", 2]],
    "They aim to restore relationships and not only to decide who is right, so neighbours and relatives who will live together afterwards reach a settlement that lasts longer. They are also close to the people, with elders who know the families and customs, so they are quick and cheaper than court cases and people understand and trust the process.",
    "Two reasons, each stated and developed.",
    ["Think of relationships and of cost and trust."]);

  b.struct({
    d: 3, skill: "APPLICATION", examStyle: true, secs: 600,
    stem: source("Source A", "an extract from a fictional church magazine, Chinhoyi, 2026",
      "Our church has set up a reconciliation committee of three elders. When two members quarrel, one of the elders first speaks to each person privately. If the problem remains, two elders meet them together and help them to talk. Only when everything else has failed is the matter taken to the church council. Last year the committee helped two families to end a dispute over a loan.") + "\n\nStudy Source A and answer the questions.",
    parts: [
      pmc("(a)", "Which Bible passage does the committee's method follow?",
        ["Matthew 18:15-17", "Correct: private talk first, then others, then the congregation."],
        [["Deuteronomy 6:4-9", "This passage is the Shema."],
         ["Exodus 20:8-11", "This is the commandment about the Sabbath."],
         ["Acts 2:1-4", "This describes the day of Pentecost."]],
        "The method follows Matthew 18:15-17."),
      P.manual({
        label: "(b)", marks: 3, stem: "Using Source A, identify **three** steps used by the committee.",
        points: ["An elder speaks to each person privately", "If the problem remains, two elders meet them together and help them to talk", "Only if everything else fails is the matter taken to the church council"],
        modelAnswer: "An elder speaks to each person privately. If the problem remains, two elders meet them together and help them to talk. Only if everything else fails is the matter taken to the church council.",
      }),
      P.manual({
        label: "(c)", marks: 4, stem: "Explain why it is better to use gentle steps before a formal hearing.",
        points: [["Private talks keep the matter small and avoid public shame, so people are more willing to listen", 2], ["Gentler methods are more likely to restore the relationship, while formal hearings can leave one side feeling defeated", 2]],
        modelAnswer: "Private talks keep the matter small and avoid public shame, so people are more willing to listen. Gentler methods are more likely to restore the relationship, while formal hearings can leave one side feeling defeated.",
      }),
    ],
    hints: ["In (c) think of shame and of relationships."],
    explanation: "The source shows a religious community using stages of mediation.",
  });
  b.struct({
    d: 5, skill: "EVALUATION", examStyle: true, secs: 1200,
    stem: "Two fictional students disagree. Themba says: \"Traditional methods are better than the courts because they restore relationships.\" Chipo says: \"The courts are better because they apply the law equally and protect rights.\"",
    parts: [
      P.manual({
        label: "(a)", marks: 4, stem: "Outline **two** ways in which religious institutions act as peacemakers.",
        points: [["Churches use steps such as those in Matthew 18:15-17 and counsel couples and hold reconciliation services", 2], ["Mosques and imams encourage sulh, and interfaith councils bring leaders of different religions together", 2]],
        modelAnswer: "Churches use steps such as those in Matthew 18:15-17, counsel couples and hold reconciliation services. Mosques and imams encourage sulh, and interfaith councils bring leaders of different religions together.",
      }),
      P.manual({
        label: "(b)", marks: 4, stem: "Explain **one** strength of the courts in resolving conflict.",
        points: [["Courts apply the law to everyone equally", 1], ["Developed: they protect the rights of the weak, such as widows and children, even against powerful people", 1], ["Court judgements can be enforced", 1], ["Developed: a party who refuses to obey can be made to comply, which brings finality", 1]],
        modelAnswer: "Courts apply the law to everyone equally, so they protect the rights of the weak, such as widows and children, even against powerful people. Court judgements can also be enforced, so a party who refuses to obey can be made to comply, which brings finality.",
      }),
      P.manual({
        label: "(c)", marks: 8, type: "EXTENDED_RESPONSE", wordLimit: { max: 280 },
        stem: "Assess whether traditional methods of resolving conflict are more effective than the courts.",
        points: [["For traditional methods: they restore relationships, are quick, cheap and close to the people, and use elders, aunts and uncles whom people trust", 2], ["For courts: they apply written law equally, protect rights (including those of women and children) and can enforce decisions", 2], ["Limits of each: traditional methods may favour the powerful or allow harmful customs; courts can be slow, costly and leave a winner and a loser", 2], ["A supported judgement", 2]],
        levels: levels(8),
        modelAnswer: "Traditional methods have strong points. They restore relationships, are quick and cheap, and are close to the people, using elders, aunts and uncles whom people trust. Courts apply written law equally, protect the rights of everyone, including women and children, and can enforce decisions. Each has limits: traditional methods may favour the powerful or allow harmful customs, while courts can be slow and costly and leave a winner and a loser. I conclude that neither is always more effective; the best system uses traditional methods and mediation first for many disputes and the courts where rights or serious harm are at stake.",
      }),
    ],
    hints: ["Give the strengths and limits of both, then decide."],
    explanation: "A strong answer weighs traditional methods against the courts and reaches a supported judgement.",
  });

  b.card("DEFINITION", "What is **mediation**?", "Help from a neutral person who helps the parties to find their own agreement without imposing a decision.");
  b.card("DEFINITION", "What is **arbitration**?", "A neutral person hears both sides and makes a decision that the parties agreed in advance to accept.");
  b.card("FACT", "What are the Shona and Ndebele names for the traditional gathering where elders hear disputes?", "Dare (Shona) and inkundla (Ndebele).");
  b.card("FACT", "What are the steps in Matthew 18:15-17?", "Speak privately to the person, then take one or two others, and only then bring the matter to the congregation.");
  b.card("FACT", "What is sulh?", "Reconciliation or settlement between disputing parties in Islam.");
  b.card("CONCEPT", "Name six methods of resolving conflict.", "Dialogue, negotiation, mediation, arbitration, reconciliation and forgiveness.");
  b.card("CONCEPT", "Why are traditional methods such as the dare valued?", "They restore relationships, are close to the people, quick and use trusted elders, aunts and uncles.");
  b.card("CONCEPT", "Why are courts usually a last resort?", "They are slower and costlier and may leave a winner and a loser, though they protect rights and enforce decisions.");
  b.card("CONCEPT", "Name some skills for resolving conflict at school.", "Listen, speak calmly, use I-statements, look for win-win solutions, apologise and forgive, and ask for help.");
});
