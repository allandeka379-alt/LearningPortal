// W4b: social and ethical implications of gene technology (ZIMSEC only, Form 6).
import { concept, P, t, chk, table, dpStr } from "../lib.mjs";

concept("abio.genetech.ethics", { file: "genetech/ethics", keyPrefix: "genetech.ethics" }, (b) => {
  b.mcq({
    d: 1, skill: "RECALL",
    stem: "What is meant by informed consent?",
    options: [
      ["Free agreement by someone who understands the risks", "Correct."],
      ["Agreement signed by a doctor on behalf of a patient", "Consent must come from the person (or a guardian)."],
      ["Permission given by a court for genetic testing", "This is not informed consent."],
      ["A promise by a company to keep genetic data for ever", "This is about data storage, not consent."],
    ],
    answer: "A",
    explanation: "Informed consent: freely given, with understanding of what is involved, risks and alternatives.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "Why do some people argue that genetic test results should be kept from insurance companies?",
    options: [
      ["People could be refused cover for a mere risk", "Correct: risk of discrimination."],
      ["Insurance companies are not able to read DNA sequences", "Not the reason."],
      ["Test results are always wrong for insurance purposes", "Tests are generally accurate."],
      ["Insurers would offer cheaper cover to everyone", "This is not the concern."],
    ],
    answer: "A",
    explanation: "A high-risk allele indicates risk, not certainty; using it to refuse cover would be discrimination.",
  });
  b.mcq({
    d: 2, skill: "UNDERSTANDING",
    stem: "Why do patents on GM seed concern some small-scale farmers?",
    options: [
      ["They may have to buy new seed every season", "Correct."],
      ["Patented seed cannot germinate in any type of soil", "Patents do not affect germination."],
      ["Patents make the seed illegal to grow in every country", "Patents control use and sale, not legality everywhere."],
      ["Patented seed always produces lower yields than local seed", "Patents do not lower yields."],
    ],
    answer: "A",
    explanation: "Licence terms may forbid saving seed, adding costs and dependence on seed companies.",
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Which concern about forensic DNA databases relates to people who have not committed a crime?",
    options: [
      ["Profiles of people never convicted may be kept", "Correct: privacy and consent."],
      ["DNA profiles can never distinguish two unrelated people", "Profiles from many loci are almost unique."],
      ["DNA databases cannot help to exclude innocent suspects", "They can exclude suspects."],
      ["Crime-scene samples never contain enough DNA", "PCR amplifies small samples."],
    ],
    answer: "A",
    explanation: "Keeping profiles of innocent people raises privacy and consent issues; relatives may also be traced.",
    hints: ["Whose DNA is stored?"],
  });
  b.mcq({
    d: 3, skill: "APPLICATION",
    stem: "A couple uses pre-implantation genetic diagnosis to choose an embryo free of a serious disease. Which group is most likely to object on ethical grounds?",
    options: [
      ["Those who give embryos full moral status", "Correct: unused embryos are discarded."],
      ["Those who believe medical treatment should be available to all", "This group might support the couple's access."],
      ["Those who believe parents should avoid serious disease in children", "This group would support the choice."],
      ["Those who believe that genetic tests are always reliable", "Reliability is not an ethical objection here."],
    ],
    answer: "A",
    explanation: "PGD involves discarding affected embryos, which some religious and other groups oppose.",
    hints: ["What happens to embryos that are not chosen?"],
  });
  b.mcq({
    d: 3, skill: "UNDERSTANDING",
    stem: "Why is germ-line gene therapy considered ethically different from somatic gene therapy?",
    options: [
      ["Its changes pass to descendants who cannot consent", "Correct."],
      ["It uses no vector to deliver the gene", "Vectors may still be used."],
      ["It changes only the body cells of the treated patient", "That describes somatic therapy."],
      ["It is cheaper and quicker than somatic therapy", "Cost is not the ethical distinction."],
    ],
    answer: "A",
    explanation: "Germ-line changes are inherited, so descendants are affected without consent.",
    hints: ["Who inherits the change?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "Which is the strongest argument against a specific GM crop?",
    options: [
      ["Trials showed its transgene reaching a wild relative", "Correct: specific and evidence-based."],
      ["It is unnatural to move genes between different species", "\"Unnatural\" alone is a weak, unspecific reason."],
      ["People in some countries have not heard of it", "Not a reason about the crop itself."],
      ["New technologies are always dangerous", "An unsupported generalisation."],
    ],
    answer: "A",
    explanation: "Strong arguments identify a specific risk with evidence; vague appeals are weak.",
    hints: ["Which argument rests on evidence?"],
  });
  b.mcq({
    d: 4, skill: "EVALUATION",
    stem: "A newborn screening programme for sickle cell anaemia is proposed. Which condition would most strengthen the case for it?",
    options: [
      ["Treatment and counselling are available", "Correct: screening helps only if action can follow."],
      ["The test can identify the baby's eye colour as well", "Irrelevant to the case."],
      ["Results are shared freely with employers of the parents", "This would raise concerns."],
      ["Parents are not told the results", "Withholding results undermines the purpose."],
    ],
    answer: "A",
    explanation: "Screening is most justified when early treatment, support and confidentiality are provided.",
    hints: ["What happens after a positive result?"],
  });

  b.tf({
    d: 1, skill: "RECALL",
    stem: "A good answer to a 'discuss' question on gene technology presents arguments on both sides and reaches a conclusion.",
    answer: true,
    explanation: "True. Discuss means weigh up both sides.",
  });
  b.tf({
    d: 2, skill: "UNDERSTANDING", daily: true,
    stem: "A person's genetic test result can reveal information about their relatives.",
    answer: true,
    explanation: "True. Relatives share alleles, so one person's result has implications for others who have not consented.",
  });

  b.match({
    d: 2, skill: "UNDERSTANDING",
    stem: "Match each use of gene technology with an ethical or social concern it raises.",
    pairs: [
      ["Forensic DNA database", "Storing profiles of innocent people"],
      ["Patented GM seed", "Farmers unable to save seed"],
      ["Embryo screening", "Selection of non-medical traits"],
      ["Genetic testing for insurance", "Discrimination by insurers"],
      ["GM salmon", "Welfare of modified animals"],
    ],
    explanation: "Each technology raises a characteristic concern.",
  });
  b.fib({
    d: 2,
    stem: "Choose the correct words.",
    template: "Genetic test results should be kept {{blank:a}} so that people are not treated unfairly, which is called {{blank:b}}. Changes made to the {{blank:c}} line would be inherited.",
    blanks: [
      { id: "a", accepted: ["confidential"], choices: ["confidential", "public", "patented"] },
      { id: "b", accepted: ["discrimination"], choices: ["discrimination", "consent", "selection"] },
      { id: "c", accepted: ["germ"], choices: ["germ", "somatic", "cell"] },
    ],
    explanation: "Confidential; discrimination; germ line.",
  });
  b.short({
    d: 2, skill: "RECALL",
    stem: "Give the popular term for a baby whose embryo was selected or altered for non-medical traits such as eye colour.",
    accepted: ["designer baby", "designer babies", "a designer baby"],
    wrong: ["test-tube baby"],
    explanation: "A **designer baby**.",
  });

  // Numerical: illustrative class survey
  const yes = 27, total = 40;
  const pct = (yes / total) * 100;
  b.num({
    d: 2, skill: "APPLICATION",
    stem: `In an illustrative class survey, ${yes} of ${total} students said that GM food should be labelled. Calculate the percentage who supported labelling.`,
    value: pct, unit: "%", wrong: [Math.round(((total - yes) / total) * 1000) / 10],
    explanation: `${yes} ÷ ${total} × 100 = ${dpStr(pct, 1)}%. ${dpStr(((total - yes) / total) * 100, 1)}% is the percentage who did not.`,
  });

  b.manualShort({
    d: 3, skill: "EVALUATION", marks: 4,
    stem: "Discuss the use of forensic DNA databases.",
    points: [
      "For: help identify offenders by matching crime-scene DNA / solve old cases",
      "For: exclude innocent suspects / have freed wrongly convicted people",
      "Against: privacy and consent, especially keeping profiles of people not convicted / tracing relatives",
      "Against: risk of contamination, errors or misinterpretation; a match shows presence, not guilt / need for safeguards",
    ],
    modelAnswer: "DNA databases help police match crime-scene samples to offenders and solve old cases, and they can also exclude innocent suspects and have freed wrongly convicted people. However, keeping profiles of people who were never convicted raises privacy and consent concerns, and relatives can be traced through a profile. Contamination or misinterpretation could lead to injustice, and a match shows only that a person's DNA was present. Clear legal safeguards are therefore needed.",
    explanation: "Two benefits and two concerns.",
    hints: ["Who benefits, and whose rights are affected?"],
  });
  b.manualShort({
    d: 3, skill: "UNDERSTANDING", marks: 4,
    stem: "Outline four ethical or social issues raised by the use of GM crops in food production.",
    points: [
      "Food safety and the right of consumers to choose / labelling",
      "Environmental risks: gene flow to wild relatives / resistance / non-target species",
      "Patents and farmers' rights / dependence on seed companies / cost to small-scale farmers",
      "Food security debate / religious or cultural objections to altering organisms",
    ],
    modelAnswer: "Consumers raise questions about food safety and want labelling so they can choose. There are environmental concerns about gene flow to wild relatives, resistance in pests and weeds, and harm to non-target species. Patents can make farmers dependent on seed companies and unable to save seed. Supporters stress food security, while some religious and cultural groups object to altering organisms.",
    explanation: "Any four distinct issues.",
    hints: ["Consumers, environment, farmers, beliefs."],
  });
  b.manualShort({
    d: 4, skill: "EVALUATION", marks: 4,
    stem: "Evaluate the statement: \"Genetic screening of embryos should be allowed for any trait parents choose.\"",
    points: [
      "Screening to avoid serious inherited disease is widely supported: reduces suffering",
      "Selecting non-medical traits treats children as products / designer babies",
      "Could increase inequality (only the wealthy can pay) and stigmatise people with disabilities",
      "Conclusion: most societies limit screening to serious medical conditions; some religious groups oppose embryo selection entirely",
    ],
    modelAnswer: "Screening embryos to avoid serious inherited disease is widely supported because it prevents suffering. Extending it to any trait, such as height or eye colour, would treat children as products, could widen inequality because only wealthy parents could afford it, and could stigmatise people with disabilities. Some religious groups oppose embryo selection altogether. The statement goes too far: most societies allow screening only for serious medical conditions.",
    explanation: "Weigh medical and non-medical uses, then conclude.",
    hints: ["Distinguish disease from non-medical traits."],
  });

  // Practice structured items
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "Nyasha's family has a history of Huntington's disease. Her father has the condition. A genetic test can show whether she has inherited the allele. Her employer offers health insurance.",
    parts: [
      P.num({
        label: "(a)", marks: 1, stem: "Her father is heterozygous and her mother does not carry the allele. What is the percentage chance that Nyasha has inherited it?",
        value: 50, unit: "%", wrong: [25],
        explanation: "$Hh$ × $hh$: half the children are $Hh$, so 50%.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Discuss the arguments for and against Nyasha taking the test.",
        points: ["For: certainty allows planning (career, finances, family) / relief if negative", "For: if positive, could use PGD or prenatal testing to avoid passing it on", "Against: no cure, so a positive result may cause great distress / she may prefer not to know; counselling needed"],
        modelAnswer: "Taking the test would remove uncertainty, letting her plan her life, and a negative result would bring relief. If positive, she could use PGD or prenatal testing so that her children do not inherit the allele. Against this, there is no cure, so a positive result could cause great distress, and she may prefer not to know; she should have genetic counselling before deciding.",
      }),
      P.manual({
        label: "(c)", marks: 2, stem: "Explain why many people believe her employer and insurer should not be given the result.",
        points: ["She could face discrimination: refused insurance or employment", "The result is private medical information; she should control who knows it (confidentiality)"],
        modelAnswer: "If her employer or insurer knew of a positive result, she might be refused cover or employment for a disease that may not affect her for many years. The result is private medical information, and she should control who sees it.",
      }),
      P.manual({
        label: "(d)", marks: 2, stem: "Explain why her result could affect her brothers and sisters.",
        points: ["Siblings have the same 50% risk from the same father", "Her result may cause them anxiety / pressure them to test, although they have not consented"],
        modelAnswer: "Her brothers and sisters each have the same 50% risk. Her result, especially if positive, may cause them anxiety or pressure them to be tested, even though they have not chosen to find out.",
      }),
    ],
    explanation: "Personal, family and social dimensions of a genetic test.",
    hints: ["Think about Nyasha, her family and outsiders."],
  });
  b.struct({
    d: 4, skill: "EVALUATION",
    stem: "A biotechnology company plans to sell drought-tolerant GM sorghum seed to farmers in a dry district. The seed is patented and costs more than local seed.",
    parts: [
      P.manual({
        label: "(a)", marks: 2, stem: "Suggest two possible benefits for farmers.",
        points: ["Higher, more reliable yields in drought years", "Better food security / more income from sales"],
        modelAnswer: "The farmers could get higher and more reliable yields in dry years, improving their household food security and income.",
      }),
      P.manual({
        label: "(b)", marks: 3, stem: "Discuss two economic or social concerns and one environmental concern.",
        points: ["Economic: seed must be bought each season / farmers cannot save seed (patent)", "Social: poorer farmers may be unable to afford it, increasing inequality / dependence on one company", "Environmental: transgene could spread to wild or traditional sorghum by cross-pollination / loss of traditional varieties"],
        modelAnswer: "Because the seed is patented, farmers may have to buy it every season rather than saving their own, and poorer farmers may be unable to afford it, increasing inequality and dependence on one company. Environmentally, the transgene could spread by pollen to wild relatives or traditional varieties, and traditional varieties might be abandoned, reducing genetic diversity.",
      }),
      P.manual({
        label: "(c)", marks: 1, stem: "Suggest one condition under which the introduction could be considered acceptable.",
        points: ["Approval by the national regulator after safety and environmental testing / affordable seed or seed-saving allowed / labelling and farmers' informed choice"],
        modelAnswer: "If it were approved by the national biotechnology regulator after safety and environmental testing, and farmers could choose freely with affordable seed.",
      }),
    ],
    explanation: "Balanced evaluation of a GM crop introduction.",
    hints: ["Benefits, costs, environment, regulation."],
  });

  b.card("DEFINITION", "Define **informed consent**.", "Agreement given freely by someone who understands the procedure or data use, its risks and alternatives.");
  b.card("CONCEPT", "Ethics framework", "Benefits; risks; rights and consent; justice and access; values and beliefs.");
  b.card("CONCEPT", "Medical ethical issues of gene technology", "Screening anxiety, embryo selection, designer babies, gene therapy risk and cost, genetic privacy and discrimination.");
  b.card("CONCEPT", "Agricultural ethical issues", "Food safety and labelling, gene flow and resistance, patents and farmers' rights, food security, animal welfare.");
  b.card("CONCEPT", "Forensic DNA databases: for and against", "For: solve crimes, exclude the innocent. Against: privacy, consent, keeping innocent people's profiles, errors.");
  b.card("FACT", "Religious viewpoints (examples)", "Some see gene alteration as 'playing God' or oppose embryo destruction; others see healing through medicine as a duty.");
  b.card("CONCEPT", "How to answer a 'discuss' question", "Biology first; benefits; concerns; attribute views to groups; reasoned conclusion.");
  b.card("DEFINITION", "Define **patent** (biotechnology).", "A time-limited legal right controlling the use and sale of an invention such as a GM seed.");
});
