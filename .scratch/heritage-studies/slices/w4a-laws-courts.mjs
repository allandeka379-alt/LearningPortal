// W4a: Rules, laws and the courts of Zimbabwe (her.constitution.laws-courts).
// Reviewer note: courts as listed in section 162 (BRIEF reference list); section 3 (rule of law among the founding
// values) and section 56 (equality before the law) cited from the Constitution. Jurisdictions given in outline only.
import { concept, P, source, levels } from "../lib.mjs";

concept("her.constitution.laws-courts", { file: "constitution/laws-courts", keyPrefix: "constitution.laws-courts" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "Which court is the highest court on **constitutional** matters in Zimbabwe?",
    options: [
      ["the Constitutional Court", "Correct: it decides whether laws and actions are consistent with the Constitution."],
      ["the Administrative Court", "This court hears appeals against decisions of certain public authorities."],
      ["the High Court", "The High Court is below the Supreme Court and the Constitutional Court."],
      ["the Labour Court", "This court deals with employment disputes."],
    ],
    answer: "A",
    explanation: "The Constitutional Court is the highest court in constitutional matters; the Supreme Court is the final court of appeal in other matters.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Which statement best shows the difference between a **rule** and a **law**?",
    options: [
      ["A law applies to everyone and is enforced by the courts; a rule binds one group", "Correct: this is the key difference."],
      ["A rule is always written down in a book, while a law is never written down anywhere at all", "Most laws are written in Acts and the Constitution."],
      ["Rules are made by Parliament and laws by schools", "This reverses who makes them."],
      ["A law can be ignored if the family disagrees with it", "Laws apply whether or not a family agrees."],
    ],
    answer: "A",
    explanation: "Laws are made or recognised by the state, apply to everyone and are enforced by the police and courts; rules apply inside a group such as a family or school.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "A city council makes a rule that dogs must be licensed every year. What type of law is this?",
    options: [
      ["a by-law", "Correct: local authorities make by-laws for their own areas."],
      ["an Act of Parliament", "Acts are passed by Parliament for the whole country."],
      ["customary law", "Customary law comes from community custom, not council decisions."],
      ["a constitutional amendment", "Only Parliament, by a special procedure, can amend the Constitution."],
    ],
    answer: "A",
    explanation: "By-laws are made by urban councils and rural district councils and apply only in their areas.",
  });
  b.mcq({
    d: 2, skill: "RECALL",
    stem: "Which court mainly settles disputes between **employers and employees**?",
    options: [
      ["the Labour Court", "Correct: it specialises in employment disputes."],
      ["the Constitutional Court", "It deals with constitutional questions."],
      ["a customary law court", "These deal with local customary disputes."],
      ["the Administrative Court", "It hears appeals against certain decisions of public authorities."],
    ],
    answer: "A",
    explanation: "The Labour Court hears labour matters such as unfair dismissal.",
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "Tatenda is charged with stealing a bicycle in Masvingo. In which court is his case **most likely** to be heard first?",
    options: [
      ["a magistrates court", "Correct: most everyday criminal cases start there."],
      ["the Constitutional Court", "It hears constitutional questions, not ordinary theft trials."],
      ["the Supreme Court", "It is an appeal court, not where ordinary trials begin."],
      ["the Labour Court", "It deals with employment matters, not crimes."],
    ],
    answer: "A",
    hints: ["Which court handles most everyday criminal cases in towns across the country?"],
    explanation: "Magistrates courts try most everyday criminal cases; serious cases may go to the High Court.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which source of law is made by a **minister** using powers given by an Act of Parliament?",
    options: [
      ["a statutory instrument", "Correct: statutory instruments contain detailed regulations made under an Act."],
      ["common law", "Common law comes from Roman-Dutch law and judges' decisions."],
      ["a by-law", "By-laws are made by local authorities."],
      ["customary law", "Customary law comes from community customs."],
    ],
    answer: "A",
    hints: ["The minister fills in details the Act allows him or her to make."],
    explanation: "An Act may give a minister power to make detailed regulations, which are published as statutory instruments.",
  });
  b.mcq({
    d: 4, skill: "ANALYSIS",
    stem: "A traditional custom in a village says that daughters cannot inherit any property. Why can a court **refuse** to apply this custom?",
    options: [
      ["Customary law applies only where it is consistent with the Constitution", "Correct: the Constitution is supreme and protects equality."],
      ["Customary law has been abolished completely, so no court in Zimbabwe may apply it", "Customary law is still recognised and applied by courts."],
      ["Only the Labour Court may hear inheritance cases", "Labour matters are employment disputes."],
      ["Village customs apply only in towns and cities", "Customs are mainly applied in communities, not only in towns."],
    ],
    answer: "A",
    hints: ["Which law is supreme?", "What does the Constitution say about equality of women and men?"],
    explanation: "The Constitution is supreme (section 2) and protects equality; a custom that discriminates against daughters is inconsistent with it and cannot be enforced.",
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which situation is the **clearest** example of the rule of law being respected?",
    options: [
      ["A court orders a government department to reverse an unlawful decision, and it complies", "Correct: the government itself is under the law and obeys the court."],
      ["A minister orders the punishment of a critic of the government without any charge being brought", "Punishment without a law and a hearing breaks the rule of law."],
      ["Police release a suspect because he is a relative of an official", "Equality before the law is ignored."],
      ["A crowd punishes a suspected thief without taking him to court", "Mob justice replaces the courts."],
    ],
    answer: "A",
    hints: ["Who must obey the law under the rule of law?"],
    explanation: "Under the rule of law, the government and officials are also bound by the law and obey court orders.",
  });
  b.tf({
    d: 1, skill: "RECALL",
    stem: "Section 162 of the Constitution lists the courts of Zimbabwe.",
    answer: true,
    explanation: "True. Section 162, in Chapter 8 (the Judiciary), lists the courts from the Constitutional Court to the customary law courts.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "The courts are the arm of government that passes Acts of Parliament.",
    answer: false,
    explanation: "False. Parliament (the Legislature) passes Acts; the courts (the Judiciary) interpret the law and settle disputes.",
  });
  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each court with the kind of case it mainly deals with.",
    pairs: [
      ["Constitutional Court", "whether a law is consistent with the Constitution"],
      ["Supreme Court", "final appeals in non-constitutional matters"],
      ["Labour Court", "unfair dismissal of a worker"],
      ["customary law court", "a local dispute under custom"],
    ],
    explanation: "Each court has its own jurisdiction; higher courts hear appeals from lower ones.",
  });
  b.fib({
    d: 2, skill: "RECALL",
    stem: "Complete the statements about the law of Zimbabwe.",
    template: "The supreme law of Zimbabwe is the {{blank:a}}. The courts are listed in Chapter {{blank:b}}. A law made by a rural district council is called a {{blank:c}}.",
    blanks: [
      { id: "a", accepted: ["Constitution"], choices: ["Constitution", "Electoral Act", "common law", "Labour Act"] },
      { id: "b", accepted: ["8"], choices: ["8", "4", "12", "14"] },
      { id: "c", accepted: ["by-law"], choices: ["by-law", "statute", "precedent", "treaty"] },
    ],
    explanation: "The Constitution is supreme (section 2); Chapter 8 deals with the judiciary; local authorities make by-laws.",
  });
  b.fib({
    d: 3, skill: "UNDERSTANDING",
    stem: "Complete the path of an appeal.",
    template: "A case decided in a magistrates court may go on appeal to the {{blank:a}}, and from there to the {{blank:b}}.",
    blanks: [
      { id: "a", accepted: ["High Court"], choices: ["High Court", "Labour Court", "customary law court", "Administrative Court"] },
      { id: "b", accepted: ["Supreme Court"], choices: ["Supreme Court", "magistrates court", "Labour Court", "customary law court"] },
    ],
    hints: ["Appeals go up the hierarchy."],
    explanation: "Appeals from magistrates courts go to the High Court, and from the High Court to the Supreme Court.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "What is the name for the power of a court to hear a particular kind of case?",
    accepted: ["jurisdiction"],
    wrong: ["precedent"],
    explanation: "Jurisdiction is the power of a court to hear a type of case, in an area or up to a level of seriousness.",
  });
  b.manualShort({
    d: 2, skill: "RECALL", marks: 3,
    stem: "State **three** sources of law in Zimbabwe.",
    points: [
      "Any one of: the Constitution; Acts of Parliament; statutory instruments; by-laws; customary law; common law / judicial precedent",
      "A second different source",
      "A third different source",
    ],
    modelAnswer: "The Constitution, Acts of Parliament and by-laws made by local authorities.",
    explanation: "One mark per correct source.",
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Explain **two** reasons why the rule of law is important in Zimbabwe.",
    points: [
      "Identifies: it limits the power of leaders and officials",
      "Develops: they must act within the law, so citizens can challenge unlawful actions in court",
      "Identifies: it treats everyone equally before the law (section 56) / it protects rights / keeps peace",
      "Develops: rich and poor face the same law, so people trust the courts and settle disputes peacefully instead of by violence",
    ],
    modelAnswer: "The rule of law limits the power of leaders, because they must act within the law and citizens can go to court to challenge unlawful actions. It also means everyone is equal before the law, so people trust the courts and settle their disputes peacefully instead of by violence.",
    hints: ["Think about leaders, and about ordinary citizens."],
    explanation: "One mark for each reason and one for developing it.",
  });
  b.manualShort({
    d: 4, skill: "APPLICATION", marks: 4,
    stem: "Many young people in a ward in Chinhoyi do not know their rights or which court deals with which matter. Suggest **two** ways the community could improve their knowledge of the law, and explain each.",
    points: [
      "Suggests a legal awareness day / talk at school or the community hall by lawyers, magistrates or legal aid organisations",
      "Explains that young people hear accurate information from experts and can ask questions",
      "Suggests teaching about the courts in clubs, radio programmes or social media in local languages",
      "Explains that information reaches many people in a form they understand, so they know where to seek help",
    ],
    modelAnswer: "The ward could hold a legal awareness day at the community hall where a magistrate or a legal aid lawyer explains the courts, so young people get accurate information and can ask questions. Schools and local radio could also run short programmes in Shona, Ndebele and English, so the information reaches many people in a language they understand and they know where to go for help.",
    hints: ["Who knows the law well, and how can the information reach young people?"],
    explanation: "One mark for each sensible suggestion and one for explaining how it helps.",
  });
  b.struct({
    d: 3, skill: "APPLICATION",
    stem: source("Source A", "a notice in a fictional town council newsletter, Gweru, 2026",
      "From 1 March, vending is allowed only at the three designated markets. Vendors found selling elsewhere may be fined under the council's by-laws. Any vendor who believes a fine was wrongly issued may object at the council offices or defend the matter in court.") +
      "\n\nRead Source A and answer the questions.",
    parts: [
      P.mcq({
        label: "(a)",
        stem: "Which body made the law referred to in the notice?",
        options: [
          ["the town council", "Correct: by-laws are made by local authorities."],
          ["Parliament", "Parliament makes Acts for the whole country."],
          ["the Supreme Court", "Courts interpret law; they do not make by-laws."],
          ["the village headman", "A headman does not make urban by-laws."],
        ],
        answer: "A",
      }),
      P.manual({
        label: "(b)", marks: 2,
        stem: "Give **two** ways the notice shows respect for the rule of law.",
        points: [
          "The rule is made public in advance (from 1 March)",
          "Vendors may object or defend the matter in court / fines are given only under the by-laws",
        ],
        modelAnswer: "The rule is announced in advance, and vendors who think a fine is wrong can object or go to court.",
      }),
      P.manual({
        label: "(c)", marks: 3,
        stem: "Explain why the council's by-laws must not conflict with Acts of Parliament or the Constitution.",
        points: [
          "The Constitution is the supreme law; anything inconsistent with it is invalid",
          "Councils get their power to make by-laws from Acts of Parliament",
          "So a by-law that goes beyond that power or breaks rights can be set aside by the courts",
        ],
        modelAnswer: "The Constitution is the supreme law, so any law that conflicts with it is invalid. Councils only have power to make by-laws because an Act of Parliament gives it to them, so a by-law that goes beyond that power or breaks people's rights can be set aside by a court.",
      }),
    ],
    hints: ["In (c), think about the order of the sources of law."],
    explanation: "A source-based practice item on by-laws and the rule of law.",
  });
  b.struct({
    d: 5, skill: "EVALUATION",
    stem: "This question is about the courts and the rule of law.",
    parts: [
      P.manual({
        label: "(a)", marks: 4,
        stem: "Describe the roles of **two** courts in Zimbabwe.",
        points: [
          "Names a court correctly (e.g. the High Court)",
          "Describes its role (e.g. hears serious criminal and civil cases; hears appeals from magistrates courts)",
          "Names a second court (e.g. the Labour Court)",
          "Describes its role (e.g. settles disputes between employers and employees)",
        ],
        modelAnswer: "The High Court hears serious criminal and civil cases throughout Zimbabwe and hears appeals from magistrates courts. The Labour Court settles disputes between employers and employees, such as claims of unfair dismissal.",
      }),
      P.manual({
        label: "(b)", marks: 8, type: "EXTENDED_RESPONSE",
        stem: "\"Courts are the best protection of citizens' rights.\" How far do you agree?",
        points: [
          ["For: courts are independent; they can strike down unlawful laws and actions and order remedies", 2],
          ["For: anyone, including the poor, can in principle approach the courts; the Constitutional Court decides rights cases", 2],
          ["Against: courts can be costly, slow and far away; many people do not know their rights; other protections matter (Human Rights Commission, Parliament, media, civil society, voters)", 2],
          ["Supported judgement", 2],
        ],
        levels: levels(8),
        modelAnswer: "Courts are a strong protection of rights. The Constitution makes them independent, and they can set aside laws or actions that break the Declaration of Rights and order the state to put things right. Any person may approach the courts, and the Constitutional Court has the final say on rights.\n\nHowever, going to court can be expensive and slow, and courts may be far from rural communities. Many people do not know their rights. Other bodies also protect rights: the Zimbabwe Human Rights Commission investigates complaints, Parliament makes laws, the media expose abuses and citizens use their vote.\n\nI partly agree. Courts are the final and most powerful protection, but they work best when citizens know their rights and other institutions do their work too.",
      }),
    ],
    hints: ["In (b), consider cost, distance and awareness as well as the courts' powers."],
    explanation: "A practice evaluative item on how well the courts protect rights.",
  });

  b.card("DEFINITION", "Law", "A rule made or recognised by the state that applies to everyone and is enforced by the police and the courts.");
  b.card("DEFINITION", "By-law", "A law made by an urban council or rural district council that applies only in its area.");
  b.card("DEFINITION", "Jurisdiction", "The power of a court to hear a particular kind of case, in an area or up to a level of seriousness.");
  b.card("DEFINITION", "Rule of law", "The principle that everyone, including the government, is under the law, laws are known in advance and disputes are settled by independent courts.");
  b.card("FACT", "Which section of the Constitution lists the courts of Zimbabwe?", "Section 162 (in Chapter 8, the Judiciary).");
  b.card("FACT", "Name the courts listed in section 162.", "Constitutional Court, Supreme Court, High Court, Labour Court, Administrative Court, magistrates courts, customary law courts.");
  b.card("FACT", "Name six sources of law in Zimbabwe.", "The Constitution, Acts of Parliament, statutory instruments, by-laws, customary law and common law.");
  b.card("CONCEPT", "Why can a court refuse to apply a custom?", "Customary law applies only where it is consistent with the Constitution, which is supreme and protects equality and rights.");
  b.card("CONCEPT", "Constitutional Court or Supreme Court: what is the difference?", "The Constitutional Court is the highest court on constitutional matters; the Supreme Court is the final court of appeal in other matters.");
});
